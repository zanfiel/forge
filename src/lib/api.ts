/**
 * API Layer — Desktop-only Tauri IPC.
 *
 * Forge talks to Synapse via the Tauri Rust backend.
 * Engram support is optional and local-first.
 */

import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { open as openDialog } from '@tauri-apps/plugin-dialog';
import { open as shellOpen } from '@tauri-apps/plugin-shell';

const appWindow = getCurrentWindow();

export async function minimize() { await appWindow.minimize(); }
export async function maximize() {
  if (await appWindow.isMaximized()) await appWindow.unmaximize();
  else await appWindow.maximize();
}
export async function close() { await appWindow.close(); }
export async function isMaximized(): Promise<boolean> { return appWindow.isMaximized(); }

export async function openFolder(): Promise<string | null> {
  const dir = await openDialog({ directory: true, multiple: false });
  if (dir) {
    await invoke('set_project_dir', { dir });
    return dir as string;
  }
  return null;
}

export async function readDir(path?: string): Promise<any[]> { return invoke('read_dir', { dirPath: path || null }); }
export async function readFile(path: string): Promise<string | null> { return invoke('read_file', { filePath: path }); }
export async function writeFile(path: string, content: string): Promise<boolean> { return invoke('write_file', { filePath: path, content }); }
export async function stat(path: string): Promise<any> { return invoke('file_stat', { filePath: path }); }

export async function chat(message: string, sessionId: string): Promise<any> { return invoke('ai_chat', { message, sessionId }); }
export async function chatStream(message: string, sessionId: string): Promise<any> {
  try {
    await invoke('ai_chat_stream', { message, sessionId });
    return { done: true };
  } catch (err: any) {
    return { error: err };
  }
}

export function onStreamEvent(callback: (event: any) => void): () => void {
  let unlisten: (() => void) | null = null;
  listen('ai:stream-event', (e: any) => callback(e.payload)).then((fn: any) => {
    unlisten = fn;
  });
  return () => unlisten?.();
}

export async function getProjectDir(): Promise<string> { return invoke('get_project_dir'); }
export async function setProjectDir(dir: string): Promise<void> { await invoke('set_project_dir', { dir }); }
export async function openExternal(url: string) { await shellOpen(url); }

export interface EngramMemory {
  id: number;
  content: string;
  category: string;
  source?: string;
  created_at?: string;
}

export async function getEngramContext(query: string, budget = 2000): Promise<string> {
  try {
    const data: any = await invoke('engram_context', { query, budget });
    if (data.context && typeof data.context === 'string') return data.context;

    const parts: string[] = [];
    if (data.permanent_facts?.length) parts.push('## Known Facts\n' + data.permanent_facts.map((f: any) => `- ${f.content}`).join('\n'));
    if (data.relevant_memories?.length) parts.push('## Relevant\n' + data.relevant_memories.map((m: any) => `- ${m.content}`).join('\n'));
    if (data.recent_activity?.length) parts.push('## Recent\n' + data.recent_activity.map((m: any) => `- ${m.content}`).join('\n'));
    return parts.join('\n\n');
  } catch {
    return '';
  }
}

export async function storeMemory(content: string, category: string): Promise<EngramMemory | null> {
  try {
    const data: any = await invoke('engram_store', { content, category });
    return data.memory ?? data ?? null;
  } catch {
    return null;
  }
}

export async function searchMemory(query: string, limit = 10): Promise<EngramMemory[]> {
  try {
    const data: any = await invoke('engram_search', { query, limit });
    return data.results ?? data ?? [];
  } catch {
    return [];
  }
}

export async function confirmEdit(toolCallId: string, accepted: boolean): Promise<void> {
  await invoke('confirm_edit', { toolCallId, accepted });
}

export const isWeb = false;
export const isDesktop = true;
