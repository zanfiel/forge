use serde::{Deserialize, Serialize};
use std::env;
use std::fs;
use std::path::{Path, PathBuf};
use std::sync::Mutex;
use std::time::{Duration, Instant};
use tauri::State;

// ─── State ──────────────────────────────────────────────

struct AppState {
    project_dir: Mutex<String>,
}

// ─── Types ──────────────────────────────────────────────

#[derive(Serialize, Deserialize, Clone)]
struct FileEntry {
    name: String,
    path: String,
    #[serde(rename = "type")]
    entry_type: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    children: Option<Vec<FileEntry>>,
}

#[derive(Serialize, Deserialize)]
struct FileStat {
    size: u64,
    modified: String,
    #[serde(rename = "isDir")]
    is_dir: bool,
}

#[derive(Serialize, Deserialize)]
struct ChatResponse {
    #[serde(skip_serializing_if = "Option::is_none")]
    text: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    error: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    tool_calls: Option<serde_json::Value>,
}

// ─── Ignored directories ────────────────────────────────

const IGNORE_DIRS: &[&str] = &[
    "node_modules", ".git", ".svelte-kit", "dist", "build",
    ".next", ".nuxt", "__pycache__", ".venv", "target",
    ".cargo", ".cache", "coverage", ".turbo",
];

// ─── Remote Endpoints / Failover ─────────────────────────

const SYNAPSE_URL: &str = "http://127.0.0.1:4300";
const ENGRAM_LOCAL: &str = "http://127.0.0.1:4200";

static LAST_PRIMARY_RECHECK: std::sync::OnceLock<Mutex<Option<Instant>>> = std::sync::OnceLock::new();

fn engram_api_key() -> String {
    env::var("ENGRAM_API_KEY")
        .or_else(|_| env::var("FORGE_ENGRAM_API_KEY"))
        .unwrap_or_default()
}

async fn try_engram_post(path: &str, body: serde_json::Value) -> Result<serde_json::Value, String> {
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(5))
        .build()
        .map_err(|e| e.to_string())?;

    let mut urls: Vec<String> = vec![ENGRAM_LOCAL.to_string()];
    if let Ok(fallback) = env::var("ENGRAM_URL") {
        if !fallback.trim().is_empty() && fallback != ENGRAM_LOCAL {
            urls.push(fallback);
        }
    }
    if let Ok(fallback2) = env::var("ENGRAM_FALLBACK_URL") {
        if !fallback2.trim().is_empty() && !urls.contains(&fallback2) {
            urls.push(fallback2);
        }
    }
    let key = engram_api_key();
    let last_check = LAST_PRIMARY_RECHECK.get_or_init(|| Mutex::new(None));

    let should_check = {
        let guard = last_check.lock().unwrap();
        guard.map(|t| t.elapsed() >= Duration::from_secs(60)).unwrap_or(true)
    };
    if should_check {
        {
            let mut guard = last_check.lock().unwrap();
            *guard = Some(Instant::now());
        }
        let _ = client.get(format!("{}/health", ENGRAM_LOCAL)).send().await;
    }

    let mut last_err = String::from("Engram unavailable");
    for base in urls.iter() {
        let mut req = client.post(format!("{}{}", base, path)).json(&body);
        if !key.is_empty() {
            req = req.bearer_auth(&key);
        }
        match req.send().await {
            Ok(resp) if resp.status().is_success() => {
                return resp.json::<serde_json::Value>().await.map_err(|e| e.to_string());
            }
            Ok(resp) => last_err = format!("{} {}", base, resp.status()),
            Err(err) => last_err = format!("{} {}", base, err),
        }
    }
    Err(last_err)
}

// ─── Commands ───────────────────────────────────────────

/// Set the project directory
#[tauri::command]
fn set_project_dir(state: State<AppState>, dir: String) {
    let mut pd = state.project_dir.lock().unwrap();
    *pd = dir;
}

/// Get the project directory
#[tauri::command]
fn get_project_dir(state: State<AppState>) -> String {
    state.project_dir.lock().unwrap().clone()
}

/// Read directory tree recursively
#[tauri::command]
fn read_dir(state: State<AppState>, dir_path: Option<String>) -> Vec<FileEntry> {
    let pd = state.project_dir.lock().unwrap();
    let target = dir_path.unwrap_or_else(|| pd.clone());
    if target.is_empty() {
        return vec![];
    }
    read_dir_recursive(&target, 0)
}

fn read_dir_recursive(dir: &str, depth: usize) -> Vec<FileEntry> {
    if depth > 6 {
        return vec![];
    }

    let path = Path::new(dir);
    let Ok(entries) = fs::read_dir(path) else {
        return vec![];
    };

    let mut items: Vec<(String, PathBuf, bool)> = vec![];
    for entry in entries.flatten() {
        let name = entry.file_name().to_string_lossy().to_string();
        let file_path = entry.path();
        let is_dir = file_path.is_dir();

        // Skip hidden files at root level (except .env)
        if depth == 0 && name.starts_with('.') && name != ".env" {
            continue;
        }
        // Skip ignored directories
        if is_dir && IGNORE_DIRS.contains(&name.as_str()) {
            continue;
        }

        items.push((name, file_path, is_dir));
    }

    // Sort: directories first, then alphabetical
    items.sort_by(|a, b| {
        if a.2 && !b.2 {
            std::cmp::Ordering::Less
        } else if !a.2 && b.2 {
            std::cmp::Ordering::Greater
        } else {
            a.0.to_lowercase().cmp(&b.0.to_lowercase())
        }
    });

    items
        .into_iter()
        .map(|(name, file_path, is_dir)| {
            let path_str = file_path.to_string_lossy().to_string();
            if is_dir {
                FileEntry {
                    name,
                    path: path_str.clone(),
                    entry_type: "directory".to_string(),
                    children: Some(read_dir_recursive(&path_str, depth + 1)),
                }
            } else {
                FileEntry {
                    name,
                    path: path_str,
                    entry_type: "file".to_string(),
                    children: None,
                }
            }
        })
        .collect()
}

/// Read a file's contents
#[tauri::command]
fn read_file(file_path: String) -> Option<String> {
    fs::read_to_string(&file_path).ok()
}

/// Write content to a file
#[tauri::command]
fn write_file(file_path: String, content: String) -> bool {
    fs::write(&file_path, &content).is_ok()
}

/// Get file stats
#[tauri::command]
fn file_stat(file_path: String) -> Option<FileStat> {
    let meta = fs::metadata(&file_path).ok()?;
    let modified = meta
        .modified()
        .ok()?
        .duration_since(std::time::UNIX_EPOCH)
        .ok()?;
    Some(FileStat {
        size: meta.len(),
        modified: format!("{}ms", modified.as_millis()),
        is_dir: meta.is_dir(),
    })
}

/// Chat with Synapse (sync)
#[tauri::command]
async fn ai_chat(message: String, session_id: String) -> ChatResponse {
    let client = reqwest::Client::new();
    let url = format!("{}/v1/chat", SYNAPSE_URL);

    match client
        .post(&url)
        .json(&serde_json::json!({
            "message": message,
            "session_id": session_id,
        }))
        .send()
        .await
    {
        Ok(resp) => match resp.json::<serde_json::Value>().await {
            Ok(val) => ChatResponse {
                text: val.get("text").and_then(|v| v.as_str()).map(String::from),
                error: None,
                tool_calls: val.get("tool_calls").cloned(),
            },
            Err(e) => ChatResponse {
                text: None,
                error: Some(format!("Parse error: {}", e)),
                tool_calls: None,
            },
        },
        Err(e) => ChatResponse {
            text: None,
            error: Some(format!("Connection failed: {}. Make sure Synapse is running.", e)),
            tool_calls: None,
        },
    }
}

/// Chat with Synapse (streaming) — emits events to frontend
#[tauri::command]
async fn ai_chat_stream(
    app: tauri::AppHandle,
    message: String,
    session_id: String,
) -> Result<(), String> {
    use tauri::Emitter;

    let client = reqwest::Client::new();
    let url = format!("{}/v1/chat/stream", SYNAPSE_URL);

    let resp = client
        .post(&url)
        .json(&serde_json::json!({
            "message": message,
            "session_id": session_id,
        }))
        .send()
        .await
        .map_err(|e| format!("Connection failed: {}", e))?;

    let mut stream = resp.bytes_stream();
    use futures_util::StreamExt;
    let mut buffer = String::new();

    while let Some(chunk) = stream.next().await {
        let chunk = chunk.map_err(|e| e.to_string())?;
        buffer.push_str(&String::from_utf8_lossy(&chunk));

        // Parse SSE lines
        while let Some(newline_pos) = buffer.find('\n') {
            let line = buffer[..newline_pos].to_string();
            buffer = buffer[newline_pos + 1..].to_string();

            if let Some(data) = line.strip_prefix("data: ") {
                if data == "[DONE]" {
                    let _ = app.emit("ai:stream-event", serde_json::json!({"type": "done"}));
                    continue;
                }
                if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(data) {
                    let _ = app.emit("ai:stream-event", parsed);
                }
            }
        }
    }

    Ok(())
}

/// Confirm or reject a pending edit
#[tauri::command]
async fn confirm_edit(tool_call_id: String, accepted: bool) -> Result<(), String> {
    let client = reqwest::Client::new();
    client
        .post(format!("{}/v1/chat/confirm", SYNAPSE_URL))
        .json(&serde_json::json!({
            "tool_call_id": tool_call_id,
            "accepted": accepted,
        }))
        .send()
        .await
        .map_err(|e| format!("Confirm failed: {}", e))?;
    Ok(())
}


#[tauri::command]
async fn engram_context(query: String, budget: i32) -> Result<serde_json::Value, String> {
    try_engram_post("/context", serde_json::json!({
        "query": query,
        "budget": budget,
    })).await
}

#[tauri::command]
async fn engram_store(content: String, category: String) -> Result<serde_json::Value, String> {
    try_engram_post("/store", serde_json::json!({
        "content": content,
        "category": category,
        "source": "forge-desktop",
    })).await
}

#[tauri::command]
async fn engram_search(query: String, limit: i32) -> Result<serde_json::Value, String> {
    try_engram_post("/search", serde_json::json!({
        "query": query,
        "limit": limit,
    })).await
}

// ─── App Setup ──────────────────────────────────────────

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .manage(AppState {
            project_dir: Mutex::new(String::new()),
        })
        .invoke_handler(tauri::generate_handler![
            set_project_dir,
            get_project_dir,
            read_dir,
            read_file,
            write_file,
            file_stat,
            ai_chat,
            ai_chat_stream,
            confirm_edit,
            engram_context,
            engram_store,
            engram_search,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
