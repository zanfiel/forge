/**
 * API Layer — Dual-mode: Tauri IPC (desktop) or HTTP (web PWA)
 *
 * Auto-detects environment. Desktop app uses Tauri invoke().
 * Browser PWA uses HTTP to the Forge web server.
 * Auth in web mode is handled by Pangolin (Badger) before traffic reaches us.
 */

// ─── Environment Detection ──────────────────

const IS_TAURI = typeof window !== 'undefined' && !!(window as any).__TAURI_INTERNALS__;

let invoke: any;
let listen: any;
let appWindow: any;
let openDialog: any;
let shellOpen: any;

if (IS_TAURI) {
  import('@tauri-apps/api/core').then(m => { invoke = m.invoke; });
  import('@tauri-apps/api/event').then(m => { listen = m.listen; });
  import('@tauri-apps/api/window').then(m => { appWindow = m.getCurrentWindow(); });
  import('@tauri-apps/plugin-dialog').then(m => { openDialog = m.open; });
  import('@tauri-apps/plugin-shell').then(m => { shellOpen = m.open; });
}

// ─── HTTP helpers (web mode) ────────────────

async function apiFetch(path: string, opts?: RequestInit): Promise<any> {
  const resp = await fetch(`/api${path}`, {
    credentials: 'include',
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...opts?.headers,
    },
  });
  return resp.json();
}

// ─── Window Controls ────────────────────────

export async function minimize() {
  if (!IS_TAURI) return;
  await appWindow?.minimize();
}

export async function maximize() {
  if (!IS_TAURI) return;
  if (await appWindow?.isMaximized()) {
    await appWindow.unmaximize();
  } else {
    await appWindow?.maximize();
  }
}

export async function close() {
  if (!IS_TAURI) { window.close(); return; }
  await appWindow?.close();
}

export async function isMaximized(): Promise<boolean> {
  if (!IS_TAURI) return false;
  return appWindow?.isMaximized() ?? false;
}

// ─── File Dialog ────────────────────────────

export async function openFolder(): Promise<string | null> {
  if (IS_TAURI) {
    const dir = await openDialog({ directory: true, multiple: false });
    if (dir) {
      await invoke('set_project_dir', { dir });
      return dir;
    }
    return null;
  }

  // Web mode — dispatch event for project picker UI
  const data = await apiFetch('/project/list');
  if (!data.dirs?.length) return null;

  return new Promise((resolve) => {
    window.dispatchEvent(new CustomEvent('forge:pick-project', {
      detail: { dirs: data.dirs, resolve },
    }));
    setTimeout(() => resolve(null), 60000);
  });
}

// ─── File System ────────────────────────────

export async function readDir(path?: string): Promise<any[]> {
  if (IS_TAURI) return invoke('read_dir', { dirPath: path || null });
  const params = path ? `?dir=${encodeURIComponent(path)}` : '';
  return apiFetch(`/fs/tree${params}`);
}

export async function readFile(path: string): Promise<string | null> {
  if (IS_TAURI) return invoke('read_file', { filePath: path });
  const data = await apiFetch(`/fs/read?path=${encodeURIComponent(path)}`);
  return data.content ?? null;
}

export async function writeFile(path: string, content: string): Promise<boolean> {
  if (IS_TAURI) return invoke('write_file', { filePath: path, content });
  const data = await apiFetch('/fs/write', {
    method: 'POST',
    body: JSON.stringify({ path, content }),
  });
  return !!data.ok;
}

export async function stat(path: string): Promise<any> {
  if (IS_TAURI) return invoke('file_stat', { filePath: path });
  return apiFetch(`/fs/stat?path=${encodeURIComponent(path)}`);
}

export async function createDir(dirPath: string): Promise<boolean> {
  if (IS_TAURI) return invoke('create_dir', { dirPath });
  const data = await apiFetch('/fs/mkdir', {
    method: 'POST',
    body: JSON.stringify({ path: dirPath }),
  });
  return !!data.ok;
}

export async function deletePath(filePath: string): Promise<boolean> {
  if (IS_TAURI) return invoke('delete_path', { filePath });
  const data = await apiFetch('/fs/delete', {
    method: 'POST',
    body: JSON.stringify({ path: filePath }),
  });
  return !!data.ok;
}

export async function renamePath(oldPath: string, newPath: string): Promise<boolean> {
  if (IS_TAURI) return invoke('rename_path', { oldPath, newPath });
  const data = await apiFetch('/fs/rename', {
    method: 'POST',
    body: JSON.stringify({ oldPath, newPath }),
  });
  return !!data.ok;
}

// ─── AI (Synapse) ───────────────────────────

export async function chat(message: string, sessionId: string): Promise<any> {
  if (IS_TAURI) return invoke('ai_chat', { message, sessionId });
  return apiFetch('/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ message, sessionId }),
  });
}

export async function chatStream(message: string, sessionId: string): Promise<any> {
  if (IS_TAURI) {
    try {
      await invoke('ai_chat_stream', { message, sessionId });
      return { done: true };
    } catch (err: any) {
      return { error: err };
    }
  }

  try {
    const resp = await fetch('/api/ai/chat/stream', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sessionId }),
    });

    if (!resp.body) return { error: 'No stream body' };

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      while (buffer.includes('\n')) {
        const newlinePos = buffer.indexOf('\n');
        const line = buffer.slice(0, newlinePos);
        buffer = buffer.slice(newlinePos + 1);

        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            window.dispatchEvent(new CustomEvent('ai:stream-event', { detail: { type: 'done' } }));
          } else {
            try {
              const parsed = JSON.parse(data);
              window.dispatchEvent(new CustomEvent('ai:stream-event', { detail: parsed }));
            } catch {}
          }
        }
      }
    }
    return { done: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export function onStreamEvent(callback: (event: any) => void): () => void {
  if (IS_TAURI) {
    let unlisten: (() => void) | null = null;
    listen?.('ai:stream-event', (e: any) => callback(e.payload)).then((fn: any) => {
      unlisten = fn;
    });
    return () => unlisten?.();
  }

  const handler = (e: Event) => callback((e as CustomEvent).detail);
  window.addEventListener('ai:stream-event', handler);
  return () => window.removeEventListener('ai:stream-event', handler);
}

// ─── Project ────────────────────────────────

export async function getProjectDir(): Promise<string> {
  if (IS_TAURI) return invoke('get_project_dir');
  const data = await apiFetch('/project/dir').catch(() => ({ dir: '' }));
  return data.dir || '';
}

export async function setProjectDir(dir: string): Promise<void> {
  if (IS_TAURI) { await invoke('set_project_dir', { dir }); return; }
  await apiFetch('/project/dir', {
    method: 'POST',
    body: JSON.stringify({ dir }),
  });
}

export async function openExternal(url: string) {
  if (IS_TAURI) { await shellOpen?.(url); return; }
  window.open(url, '_blank');
}

// ─── Web Auth (Pangolin-backed — always authenticated if you can reach the page) ───

export async function webCheckAuth(): Promise<boolean> {
  return true; // Pangolin Badger handles auth before traffic reaches us
}

export async function webLogout(): Promise<void> {
  // Redirect to Pangolin logout
  window.location.href = '/';
}

/** List available project directories on the server */
export async function listProjects(): Promise<string[]> {
  if (IS_TAURI) return [];
  const data = await apiFetch('/project/list').catch(() => ({ dirs: [] }));
  return data.dirs || [];
}

// ─── Engram — Persistent Memory ─────────────
//
// Web mode uses Forge backend proxy with remote failover.
// Desktop mode uses Tauri commands with local-first failover.
// All calls are best-effort — failure never blocks the UI.

export interface EngramMemory {
  id: number;
  content: string;
  category: string;
  source?: string;
  created_at?: string;
}

/**
 * Get packed context from Engram for a given query + token budget.
 * Returns a formatted string ready to inject into the chat message.
 */
export async function getEngramContext(query: string, budget = 2000): Promise<string> {
  try {
    const data = IS_TAURI
      ? await invoke('engram_context', { query, budget })
      : await apiFetch('/engram/context', {
          method: 'POST',
          body: JSON.stringify({ query, budget }),
        });

    // Prefer pre-packed context string
    if (data.context && typeof data.context === 'string') {
      return data.context;
    }

    // Fall back to section-by-section formatting
    const parts: string[] = [];
    if (data.permanent_facts?.length) {
      parts.push('## Known Facts\n' + data.permanent_facts.map((f: any) => `- ${f.content}`).join('\n'));
    }
    if (data.relevant_memories?.length) {
      parts.push('## Relevant\n' + data.relevant_memories.map((m: any) => `- ${m.content}`).join('\n'));
    }
    if (data.recent_activity?.length) {
      parts.push('## Recent\n' + data.recent_activity.map((m: any) => `- ${m.content}`).join('\n'));
    }
    return parts.join('\n\n');
  } catch {
    return ''; // Engram offline — continue without memory
  }
}

/**
 * Store a memory in Engram. Category: task | discovery | decision | state | issue | reference.
 */
export async function storeMemory(content: string, category: string): Promise<EngramMemory | null> {
  try {
    const data = IS_TAURI
      ? await invoke('engram_store', { content, category })
      : await apiFetch('/engram/store', {
          method: 'POST',
          body: JSON.stringify({ content, category, source: 'forge' }),
        });
    return data.memory ?? data ?? null;
  } catch {
    return null;
  }
}

/**
 * Search Engram memories by query.
 */
export async function searchMemory(query: string, limit = 10): Promise<EngramMemory[]> {
  try {
    const data = IS_TAURI
      ? await invoke('engram_search', { query, limit })
      : await apiFetch('/engram/search', {
          method: 'POST',
          body: JSON.stringify({ query, limit }),
        });
    return data.results ?? data ?? [];
  } catch {
    return [];
  }
}

// ─── Utility ────────────────────────────────

// ─── Synapse Confirm (accept/reject pending edits) ─────

export async function confirmEdit(toolCallId: string, accepted: boolean): Promise<void> {
  if (IS_TAURI) {
    await invoke('confirm_edit', { toolCallId, accepted });
  } else {
    await fetch('/api/ai/confirm', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tool_call_id: toolCallId, accepted }),
    });
  }
}

// ─── Search ─────────────────────────────────

export interface SearchResult {
  matches: Array<{
    file: string;
    relativePath: string;
    line: number;
    column: number;
    lineContent: string;
    matchLength: number;
  }>;
  totalMatches: number;
  totalFiles: number;
}

export async function searchFiles(
  dir: string,
  query: string,
  caseSensitive = false,
  useRegex = false,
  includePattern = '',
  excludePattern = '',
): Promise<SearchResult | null> {
  try {
    if (IS_TAURI) {
      return await invoke('search_files', {
        dir,
        query,
        caseSensitive,
        useRegex,
        includePattern,
        excludePattern,
      });
    }
    const data = await apiFetch('/fs/search', {
      method: 'POST',
      body: JSON.stringify({ dir, query, caseSensitive, useRegex, includePattern, excludePattern }),
    });
    return data;
  } catch {
    return null;
  }
}

// ─── Git ────────────────────────────────────

export interface GitStatus {
  branch: string;
  isRepo: boolean;
  modified: string[];
  staged: string[];
  untracked: string[];
  ahead: number;
  behind: number;
}

export async function gitStatus(dir: string): Promise<GitStatus | null> {
  try {
    if (IS_TAURI) {
      return await invoke('git_status', { dir });
    }
    return await apiFetch(`/git/status?dir=${encodeURIComponent(dir)}`);
  } catch {
    return null;
  }
}

// ─── Utility ────────────────────────────────

export const isWeb = !IS_TAURI;
export const isDesktop = IS_TAURI;
