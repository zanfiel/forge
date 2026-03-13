/**
 * Stores — Shared state for the whole app.
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
  name: string;
  args: string;
  result?: string;
}

export interface PendingEdit {
  toolCallId: string;
  file: string;
  oldContent: string;
  newContent: string;
}

// ─── Checkpoint Types ────────────────────────

export interface Checkpoint {
  id: string;
  timestamp: number;
  description: string;
  files: Map<string, string>; // path → content before change
}

// ─── Instructor Types ───────────────────────

export type ExerciseType = 'fill-blank' | 'write-function' | 'fix-bug' | 'free-write' | 'predict-output' | 'refactor';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  title: string;
  type: ExerciseType;
  difficulty: Difficulty;
  language: string;
  /** What the student needs to do — plain English */
  goal: string;
  /** Starter code loaded into editor. Blanks marked with __BLANK__ */
  skeleton: string;
  /** The correct/expected solution (for validation) */
  solution: string;
  /** 3 progressive hints: nudge → approach → nearly-there */
  hints: [string, string, string];
  /** Concepts this exercise teaches */
  concepts: string[];
  /** Test cases (input → expected output) for validation */
  tests?: { input: string; expected: string }[];
}

export interface LessonSection {
  id: string;
  title: string;
  /** Short explanation before exercises (markdown) */
  explanation: string;
  exercises: Exercise[];
}

export interface Track {
  id: string;
  name: string;
  language: string;
  monacoLang: string;
  icon: string;
  description: string;
  sections: LessonSection[];
}

export interface InstructorState {
  /** Which track is active (null = track selection screen) */
  activeTrackId: string | null;
  /** Current section index within the track */
  sectionIndex: number;
  /** Current exercise index within the section */
  exerciseIndex: number;
  /** How many hints revealed for current exercise (0-3) */
  hintsRevealed: number;
  /** Exercise status: idle, working, submitted, passed, failed */
  status: 'idle' | 'working' | 'submitted' | 'passed' | 'failed';
  /** AI feedback on submission */
  feedback: string;
  /** Completed exercise IDs (persisted) */
  completed: Set<string>;
  /** Number of attempts on current exercise */
  attempts: number;
  /** Whether instructor panel is in chat sub-mode (ask questions) */
  chatMode: boolean;
  /** Instructor chat messages (separate from main chat) */
  chatMessages: ChatMessage[];
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
  pendingEdits = $state<PendingEdit[]>([]);
  tokenUsage = $state({ input: 0, output: 0, cached: 0 });
  /** Which right panel is showing: 'chat' or 'instructor' */
  rightPanel = $state<'chat' | 'instructor'>('chat');
  checkpoints = $state<Checkpoint[]>([]);
  panels = $state({
    fileTree: true,
    chat: true,
    terminal: false,
  });

  instructor = $state<InstructorState>({
    activeTrackId: null,
    sectionIndex: 0,
    exerciseIndex: 0,
    hintsRevealed: 0,
    status: 'idle',
    feedback: '',
    completed: new Set(),
    attempts: 0,
    chatMode: false,
    chatMessages: [],
  });

  get activeTab(): OpenTab | null {
    return this.openTabs[this.activeTabIndex] ?? null;
  }
}

export const store = new AppStore();

// ─── Utility Functions ──────────────────────

export function detectLanguage(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const map: Record<string, string> = {
    ts: 'typescript', tsx: 'typescriptreact',
    js: 'javascript', jsx: 'javascriptreact',
    mjs: 'javascript', cjs: 'javascript',
    mts: 'typescript', cts: 'typescript',
    svelte: 'html', vue: 'html', astro: 'html',
    rs: 'rust', go: 'go', c: 'c', h: 'c',
    cpp: 'cpp', cc: 'cpp', cxx: 'cpp', hpp: 'cpp',
    cs: 'csharp', java: 'java', kt: 'kotlin', scala: 'scala',
    py: 'python', rb: 'ruby', lua: 'lua', pl: 'perl',
    php: 'php', r: 'r', jl: 'julia',
    sh: 'shell', bash: 'shell', zsh: 'shell', fish: 'shell',
    ps1: 'powershell', bat: 'bat', cmd: 'bat',
    html: 'html', htm: 'html', css: 'css', scss: 'scss',
    less: 'less', sass: 'scss',
    json: 'json', jsonc: 'json', yaml: 'yaml', yml: 'yaml',
    toml: 'ini', ini: 'ini', xml: 'xml', svg: 'xml',
    csv: 'plaintext',
    md: 'markdown', mdx: 'markdown', txt: 'plaintext',
    rst: 'restructuredtext',
    sql: 'sql', prisma: 'graphql', graphql: 'graphql', gql: 'graphql',
    dockerfile: 'dockerfile', dockerignore: 'plaintext',
    makefile: 'shell', cmake: 'plaintext',
    dart: 'dart', swift: 'swift', m: 'objective-c',
    zig: 'plaintext', nim: 'plaintext', ex: 'plaintext', exs: 'plaintext',
    elm: 'plaintext', clj: 'clojure', hs: 'plaintext',
    tf: 'plaintext', hcl: 'plaintext',
    proto: 'protobuf',
    lock: 'json', env: 'ini', gitignore: 'plaintext',
  };

  const name = filename.toLowerCase();
  if (name === 'dockerfile') return 'dockerfile';
  if (name === 'makefile' || name === 'gnumakefile') return 'shell';
  if (name === '.gitignore' || name === '.dockerignore') return 'plaintext';
  if (name === '.env' || name.startsWith('.env.')) return 'ini';
  if (name === 'cargo.toml' || name === 'go.mod') return 'ini';

  return map[ext] || 'plaintext';
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}
