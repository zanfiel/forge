/**
 * languages.ts - Language metadata map
 *
 * Single source of truth for language extensions, Monaco IDs, and display info.
 * Replaces all hardcoded extension/language ternaries throughout the codebase.
 */

export interface LanguageMeta {
  id: string;
  name: string;
  monacoLang: string;
  extension: string;
  icon: string;
}

export const LANGUAGES: Record<string, LanguageMeta> = {
  typescript: { id: 'typescript', name: 'TypeScript', monacoLang: 'typescript', extension: '.ts', icon: '🔷' },
  javascript: { id: 'javascript', name: 'JavaScript', monacoLang: 'javascript', extension: '.js', icon: '🟨' },
  python: { id: 'python', name: 'Python', monacoLang: 'python', extension: '.py', icon: '🐍' },
  rust: { id: 'rust', name: 'Rust', monacoLang: 'rust', extension: '.rs', icon: '🦀' },
  go: { id: 'go', name: 'Go', monacoLang: 'go', extension: '.go', icon: '🔵' },
  c: { id: 'c', name: 'C', monacoLang: 'c', extension: '.c', icon: '⚙️' },
  cpp: { id: 'cpp', name: 'C++', monacoLang: 'cpp', extension: '.cpp', icon: '⚡' },
  java: { id: 'java', name: 'Java', monacoLang: 'java', extension: '.java', icon: '☕' },
  csharp: { id: 'csharp', name: 'C#', monacoLang: 'csharp', extension: '.cs', icon: '🟪' },
  lua: { id: 'lua', name: 'Lua', monacoLang: 'lua', extension: '.lua', icon: '🌙' },
  php: { id: 'php', name: 'PHP', monacoLang: 'php', extension: '.php', icon: '🐘' },
  ruby: { id: 'ruby', name: 'Ruby', monacoLang: 'ruby', extension: '.rb', icon: '💎' },
  kotlin: { id: 'kotlin', name: 'Kotlin', monacoLang: 'kotlin', extension: '.kt', icon: '🟣' },
  swift: { id: 'swift', name: 'Swift', monacoLang: 'swift', extension: '.swift', icon: '🐦' },
  zig: { id: 'zig', name: 'Zig', monacoLang: 'zig', extension: '.zig', icon: '⚡' },
  bash: { id: 'bash', name: 'Bash', monacoLang: 'shell', extension: '.sh', icon: '🖥️' },
};

export function getLangMeta(langId: string): LanguageMeta {
  return LANGUAGES[langId] ?? { id: langId, name: langId, monacoLang: langId, extension: '.txt', icon: '📄' };
}
