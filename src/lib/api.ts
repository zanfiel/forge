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
// Engram runs at http://127.0.0.1:4200 (local Windows primary).
// Forge queries it directly for project context injection and stores
// discoveries, decisions, and notes from AI conversations.
// All calls are best-effort — failure never blocks the UI.

const ENGRAM_URL = 'http://127.0.0.1:4200';

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
    const resp = await fetch(`${ENGRAM_URL}/context`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, budget }),
      signal: AbortSignal.timeout(3000),
    });
    if (!resp.ok) return '';
    const data = await resp.json();

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
    const resp = await fetch(`${ENGRAM_URL}/store`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, category, source: 'forge' }),
      signal: AbortSignal.timeout(5000),
    });
    if (!resp.ok) return null;
    const data = await resp.json();
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
    const resp = await fetch(`${ENGRAM_URL}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, limit }),
      signal: AbortSignal.timeout(3000),
    });
    if (!resp.ok) return [];
    const data = await resp.json();
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

// ─── Utility ────────────────────────────────

export const isWeb = !IS_TAURI;
export const isDesktop = IS_TAURI;
