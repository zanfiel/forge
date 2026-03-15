/**
 * Stores — Shared state for the whole app.
 * 
 * In Svelte 5, module-level $state exports can't be reassigned from
 * other components. So we wrap everything in a single reactive object.
 * 
 * Usage in components:
 *   import { store } from '../stores/app.svelte.ts';
 *   store.projectDir = '/some/path';   // ✓ works
 *   let x = store.projectDir;          // ✓ reactive
 */

// ─── Types ──────────────────────────────────

export interface FileEntry {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileEntry[];
}

export interface OpenTab {
  path: string;
  name: string;
  content: string;
  modified: boolean;
  language: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  toolCalls?: ToolCall[];
  isStreaming?: boolean;
}

export interface ToolCall {
  id?: string;
  name: string;
  args: string;
  result?: string;
}

// ─── The Store ──────────────────────────────

class AppStore {
  projectDir = $state('');
  fileTree = $state<FileEntry[]>([]);
  openTabs = $state<OpenTab[]>([]);
  activeTabIndex = $state(0);
  chatMessages = $state<ChatMessage[]>([]);
  sessionId = $state(`forge-${Date.now()}`);
  isAiThinking = $state(false);
  panels = $state({
    fileTree: true,
    chat: true,
    terminal: false,
  });

  /** Get the active tab (or null if none open) */
  get activeTab(): OpenTab | null {
    return this.openTabs[this.activeTabIndex] ?? null;
  }
}

export const store = new AppStore();

// ─── Utility Functions ──────────────────────

/** Detect language from file extension (for Monaco syntax highlighting) */
export function detectLanguage(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const map: Record<string, string> = {
    // JavaScript / TypeScript
    ts: 'typescript', tsx: 'typescriptreact',
    js: 'javascript', jsx: 'javascriptreact',
    mjs: 'javascript', cjs: 'javascript',
    mts: 'typescript', cts: 'typescript',
    // Web frameworks
    svelte: 'html', vue: 'html', astro: 'html',
    // Systems
    rs: 'rust', go: 'go', c: 'c', h: 'c',
    cpp: 'cpp', cc: 'cpp', cxx: 'cpp', hpp: 'cpp',
    cs: 'csharp', java: 'java', kt: 'kotlin', scala: 'scala',
    // Scripting
    py: 'python', rb: 'ruby', lua: 'lua', pl: 'perl',
    php: 'php', r: 'r', jl: 'julia',
    // Shell
    sh: 'shell', bash: 'shell', zsh: 'shell', fish: 'shell',
    ps1: 'powershell', bat: 'bat', cmd: 'bat',
    // Web
    html: 'html', htm: 'html', css: 'css', scss: 'scss',
    less: 'less', sass: 'scss',
    // Data
    json: 'json', jsonc: 'json', yaml: 'yaml', yml: 'yaml',
    toml: 'ini', ini: 'ini', xml: 'xml', svg: 'xml',
    csv: 'plaintext',
    // Docs
    md: 'markdown', mdx: 'markdown', txt: 'plaintext',
    rst: 'restructuredtext',
    // Database
    sql: 'sql', prisma: 'graphql', graphql: 'graphql', gql: 'graphql',
    // Config
    dockerfile: 'dockerfile', dockerignore: 'plaintext',
    makefile: 'shell', cmake: 'plaintext',
    // Mobile
    dart: 'dart', swift: 'swift', m: 'objective-c',
    // Other
    zig: 'plaintext', nim: 'plaintext', ex: 'plaintext', exs: 'plaintext',
    elm: 'plaintext', clj: 'clojure', hs: 'plaintext',
    tf: 'plaintext', hcl: 'plaintext',
    proto: 'protobuf',
    // Misc
    lock: 'json', env: 'ini', gitignore: 'plaintext',
  };

  // Handle special filenames
  const name = filename.toLowerCase();
  if (name === 'dockerfile') return 'dockerfile';
  if (name === 'makefile' || name === 'gnumakefile') return 'shell';
  if (name === '.gitignore' || name === '.dockerignore') return 'plaintext';
  if (name === '.env' || name.startsWith('.env.')) return 'ini';
  if (name === 'cargo.toml' || name === 'go.mod') return 'ini';

  return map[ext] || 'plaintext';
}

/** Generate a unique ID */
export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}
