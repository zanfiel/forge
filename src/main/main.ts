/**
 * Forge — Electron Main Process
 * 
 * This is the "backend" of the desktop app. It:
 * 1. Creates the browser window
 * 2. Spawns Synapse in headless mode for AI
 * 3. Handles file system operations (read/write/list)
 * 4. Manages the terminal (pty)
 * 5. Exposes everything to the renderer via IPC
 * 
 * Think of it like a local server that only the app talks to.
 */

import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Window ─────────────────────────────────────────────

let mainWindow: BrowserWindow | null = null;
let synapseProcess: ChildProcess | null = null;
let projectDir: string = '';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    minWidth: 900,
    minHeight: 600,
    frame: false,                    // We draw our own title bar (like Antigravity)
    titleBarStyle: 'hidden',
    backgroundColor: '#0a0a0f',      // Dark background so no white flash on load
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,        // Security: renderer can't access Node directly
      contextIsolation: true,        // Security: renderer gets a sandboxed API
      sandbox: false,                // ESM preload requires sandbox off (contextIsolation still protects)
    },
  });

  // In dev, load from Vite dev server. In prod, load built files.
  const isDev = !app.isPackaged;
  if (isDev) {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ─── Synapse Integration ────────────────────────────────

const SYNAPSE_URL = 'http://127.0.0.1:4300';

function startSynapse(workDir: string) {
  // Find synapse binary
  const possiblePaths = [
    path.join(process.env.USERPROFILE || '', 'bin', 'synapse.exe'),
    path.join(process.env.USERPROFILE || '', 'bin', 'synapse-new.exe'),
    'synapse',
  ];

  let synapsePath = '';
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      synapsePath = p;
      break;
    }
  }

  if (!synapsePath) {
    console.error('Synapse binary not found');
    return;
  }

  console.log(`Starting Synapse: ${synapsePath} serve`);
  synapseProcess = spawn(synapsePath, ['serve'], {
    cwd: workDir,
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...process.env },
  });

  synapseProcess.stdout?.on('data', (data: Buffer) => {
    console.log(`[synapse] ${data.toString().trim()}`);
  });

  synapseProcess.stderr?.on('data', (data: Buffer) => {
    console.log(`[synapse:err] ${data.toString().trim()}`);
  });

  synapseProcess.on('exit', (code: number | null) => {
    console.log(`Synapse exited with code ${code}`);
    synapseProcess = null;
  });
}

// ─── IPC Handlers ───────────────────────────────────────
// These are the "API endpoints" that the UI can call.
// The renderer calls: window.api.readFile(path)
// Which triggers: ipcMain.handle('fs:readFile', ...)

function setupIPC() {

  // --- Window controls (custom titlebar) ---
  ipcMain.handle('window:minimize', () => mainWindow?.minimize());
  ipcMain.handle('window:maximize', () => {
    if (mainWindow?.isMaximized()) mainWindow.unmaximize();
    else mainWindow?.maximize();
  });
  ipcMain.handle('window:close', () => mainWindow?.close());
  ipcMain.handle('window:isMaximized', () => mainWindow?.isMaximized());

  // --- Open folder dialog ---
  ipcMain.handle('dialog:openFolder', async () => {
    const result = await dialog.showOpenDialog(mainWindow!, {
      properties: ['openDirectory'],
    });
    if (!result.canceled && result.filePaths[0]) {
      projectDir = result.filePaths[0];
      startSynapse(projectDir);
      return projectDir;
    }
    return null;
  });

  // --- File system ---
  ipcMain.handle('fs:readDir', async (_event, dirPath: string) => {
    const target = dirPath || projectDir;
    if (!target) return [];
    return readDirRecursive(target, target, 0);
  });

  ipcMain.handle('fs:readFile', async (_event, filePath: string) => {
    try {
      return fs.readFileSync(filePath, 'utf-8');
    } catch {
      return null;
    }
  });

  ipcMain.handle('fs:writeFile', async (_event, filePath: string, content: string) => {
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle('fs:stat', async (_event, filePath: string) => {
    try {
      const stat = fs.statSync(filePath);
      return { size: stat.size, modified: stat.mtime.toISOString(), isDir: stat.isDirectory() };
    } catch {
      return null;
    }
  });

  // --- AI Chat (talks to Synapse headless) ---
  ipcMain.handle('ai:chat', async (_event, message: string, sessionId: string) => {
    try {
      const resp = await fetch(`${SYNAPSE_URL}/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, session_id: sessionId }),
      });
      return await resp.json();
    } catch (err: any) {
      return { error: err.message };
    }
  });

  // --- AI Chat (streaming via SSE) ---
  ipcMain.handle('ai:chatStream', async (event, message: string, sessionId: string) => {
    try {
      const resp = await fetch(`${SYNAPSE_URL}/v1/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, session_id: sessionId }),
      });

      if (!resp.body) return { error: 'No response body' };

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            mainWindow?.webContents.send('ai:streamEvent', JSON.parse(data));
          }
        }
      }

      return { done: true };
    } catch (err: any) {
      return { error: err.message };
    }
  });

  // --- Project info ---
  ipcMain.handle('project:getDir', () => projectDir);
  ipcMain.handle('project:openExternal', (_event, url: string) => shell.openExternal(url));
}

// ─── File Tree Builder ──────────────────────────────────

interface FileEntry {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileEntry[];
}

// Folders to skip (keeps the tree clean)
const IGNORE = new Set([
  'node_modules', '.git', '.svelte-kit', 'dist', 'build',
  '.next', '.nuxt', '__pycache__', '.venv', 'target',
  '.cargo', '.cache', 'coverage', '.turbo',
]);

function readDirRecursive(dir: string, root: string, depth: number): FileEntry[] {
  if (depth > 6) return []; // Don't go too deep

  const entries: FileEntry[] = [];

  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    // Sort: directories first, then alphabetical
    items.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

    for (const item of items) {
      if (item.name.startsWith('.') && depth === 0 && item.name !== '.env') continue;
      if (IGNORE.has(item.name)) continue;

      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        entries.push({
          name: item.name,
          path: fullPath,
          type: 'directory',
          children: readDirRecursive(fullPath, root, depth + 1),
        });
      } else {
        entries.push({
          name: item.name,
          path: fullPath,
          type: 'file',
        });
      }
    }
  } catch {
    // Permission denied, etc
  }

  return entries;
}

// ─── App Lifecycle ──────────────────────────────────────

app.whenReady().then(() => {
  setupIPC();
  createWindow();

  // macOS: re-create window when dock icon clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  // Kill Synapse when app closes
  if (synapseProcess) {
    synapseProcess.kill();
  }
  if (process.platform !== 'darwin') app.quit();
});
