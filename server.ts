/**
 * Forge Web Server - Bun + Hono backend for the browser PWA
 * 
 * Mirrors every Tauri command as an HTTP endpoint.
 * Serves the built Svelte frontend as static files.
 * Auth handled by reverse proxy middleware - no app-level auth needed.
 */

import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { cors } from 'hono/cors';
import { readdir, readFile, writeFile, stat, mkdir } from 'fs/promises';
import { join, extname } from 'path';
import { existsSync } from 'fs';

// ─── Config ─────────────────────────────────

const PORT = parseInt(process.env.FORGE_PORT || '4400');
const PROJECT_ROOT = process.env.FORGE_PROJECT_ROOT || process.env.HOME || '/home/user';
const ALLOWED_ROOTS = (process.env.FORGE_ALLOWED_ROOTS || PROJECT_ROOT).split(',').map(s => s.trim());
const SYNAPSE_URL = process.env.FORGE_SYNAPSE_URL || 'http://127.0.0.1:4300';

// Directories to skip in file tree
const IGNORE_DIRS = new Set([
  'node_modules', '.git', '.svelte-kit', 'dist', 'build',
  '.next', '.nuxt', '__pycache__', '.venv', 'target',
  '.cargo', '.cache', 'coverage', '.turbo', '.wine',
]);

// ─── In-memory project dir per client (keyed by auth session) ───

const projectDirs = new Map<string, string>();

function getClientKey(c: any): string {
  // Use auth session cookie or remote IP as client key
  const cookie = c.req.header('cookie') || '';
  const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'anon';
  // Hash the session cookie to get a stable key
  return cookie.includes('p_session') ? cookie : ip;
}

// ─── Path Security ──────────────────────────

function isPathAllowed(targetPath: string): boolean {
  const resolved = join(targetPath);
  return ALLOWED_ROOTS.some(root => resolved.startsWith(root));
}

// ─── File System Helpers ────────────────────

interface FileEntry {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileEntry[];
}

async function readDirRecursive(dir: string, depth = 0): Promise<FileEntry[]> {
  if (depth > 6) return [];
  
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const items: { name: string; path: string; isDir: boolean }[] = [];

  for (const entry of entries) {
    const name = entry.name;
    const fullPath = join(dir, name);
    const isDir = entry.isDirectory();

    if (depth === 0 && name.startsWith('.') && name !== '.env') continue;
    if (isDir && IGNORE_DIRS.has(name)) continue;

    items.push({ name, path: fullPath, isDir });
  }

  items.sort((a, b) => {
    if (a.isDir && !b.isDir) return -1;
    if (!a.isDir && b.isDir) return 1;
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });

  const result: FileEntry[] = [];
  for (const item of items) {
    if (item.isDir) {
      result.push({
        name: item.name,
        path: item.path,
        type: 'directory',
        children: await readDirRecursive(item.path, depth + 1),
      });
    } else {
      result.push({
        name: item.name,
        path: item.path,
        type: 'file',
      });
    }
  }

  return result;
}

// ─── App ────────────────────────────────────

const app = new Hono();

app.use('*', cors({ origin: '*', credentials: true }));

// ─── Auth (reverse proxy handles it - these are just stubs for the frontend) ───

app.post('/api/auth/login', (c) => c.json({ ok: true }));
app.get('/api/auth/check', (c) => c.json({ authenticated: true }));
app.post('/api/auth/logout', (c) => c.json({ ok: true }));

// ─── Project ────────────────────────────────

app.get('/api/project/dir', (c) => {
  const key = getClientKey(c);
  return c.json({ dir: projectDirs.get(key) || '' });
});

app.post('/api/project/dir', async (c) => {
  const { dir } = await c.req.json();
  if (!dir || !isPathAllowed(dir)) {
    return c.json({ error: 'Path not allowed' }, 403);
  }
  const key = getClientKey(c);
  projectDirs.set(key, dir);
  return c.json({ ok: true });
});

app.get('/api/project/list', async (c) => {
  const dirs: string[] = [];
  for (const root of ALLOWED_ROOTS) {
    try {
      const entries = await readdir(root, { withFileTypes: true });
      for (const e of entries) {
        if (e.isDirectory() && !e.name.startsWith('.') && !IGNORE_DIRS.has(e.name)) {
          dirs.push(join(root, e.name));
        }
      }
    } catch {}
  }
  return c.json({ dirs });
});

// ─── File System ────────────────────────────

app.get('/api/fs/tree', async (c) => {
  const dir = c.req.query('dir');
  const key = getClientKey(c);
  const targetDir = dir || projectDirs.get(key);

  if (!targetDir) return c.json([]);
  if (!isPathAllowed(targetDir)) return c.json({ error: 'Path not allowed' }, 403);

  const tree = await readDirRecursive(targetDir);
  return c.json(tree);
});

app.get('/api/fs/read', async (c) => {
  const filePath = c.req.query('path');
  if (!filePath) return c.json({ error: 'Missing path' }, 400);
  if (!isPathAllowed(filePath)) return c.json({ error: 'Path not allowed' }, 403);

  try {
    const content = await readFile(filePath, 'utf-8');
    return c.json({ content });
  } catch (e: any) {
    return c.json({ error: e.message }, 404);
  }
});

app.post('/api/fs/write', async (c) => {
  const { path: filePath, content } = await c.req.json();
  if (!filePath) return c.json({ error: 'Missing path' }, 400);
  if (!isPathAllowed(filePath)) return c.json({ error: 'Path not allowed' }, 403);

  try {
    const dir = filePath.substring(0, filePath.lastIndexOf('/'));
    if (!existsSync(dir)) await mkdir(dir, { recursive: true });
    await writeFile(filePath, content, 'utf-8');
    return c.json({ ok: true });
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

app.get('/api/fs/stat', async (c) => {
  const filePath = c.req.query('path');
  if (!filePath) return c.json({ error: 'Missing path' }, 400);
  if (!isPathAllowed(filePath)) return c.json({ error: 'Path not allowed' }, 403);

  try {
    const s = await stat(filePath);
    return c.json({
      size: s.size,
      modified: `${s.mtimeMs}ms`,
      isDir: s.isDirectory(),
    });
  } catch (e: any) {
    return c.json({ error: e.message }, 404);
  }
});

// ─── AI (Synapse proxy) ────────────────────

app.post('/api/ai/chat', async (c) => {
  const body = await c.req.json();

  try {
    const resp = await fetch(`${SYNAPSE_URL}/v1/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: body.message,
        session_id: body.sessionId || body.session_id,
      }),
    });
    const data = await resp.json();
    return c.json(data);
  } catch (e: any) {
    return c.json({ error: `Synapse unavailable: ${e.message}` }, 502);
  }
});

app.post('/api/ai/chat/stream', async (c) => {
  const body = await c.req.json();

  try {
    const resp = await fetch(`${SYNAPSE_URL}/v1/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: body.message,
        session_id: body.sessionId || body.session_id,
      }),
    });

    return new Response(resp.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (e: any) {
    return c.json({ error: `Synapse unavailable: ${e.message}` }, 502);
  }
});

app.post('/api/ai/confirm', async (c) => {
  const body = await c.req.json();

  try {
    const resp = await fetch(`${SYNAPSE_URL}/v1/chat/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    return c.json(data);
  } catch (e: any) {
    return c.json({ error: `Synapse unavailable: ${e.message}` }, 502);
  }
});

// ─── Engram proxy (for web/PWA mode) ─────────

const ENGRAM_PRIMARY = process.env.FORGE_ENGRAM_URL || 'http://127.0.0.1:4200';
const ENGRAM_FALLBACK = process.env.FORGE_ENGRAM_FALLBACK_URL || '';
const ENGRAM_API_KEY = process.env.ENGRAM_API_KEY || process.env.FORGE_ENGRAM_API_KEY || '';
let activeEngramUrl = ENGRAM_PRIMARY;
let lastPrimaryCheck = 0;
const ENGRAM_RECHECK_MS = 60_000;

async function engramFetch(path: string, body: any, timeoutMs = 5000): Promise<Response> {
  const urls = activeEngramUrl === ENGRAM_PRIMARY ? [ENGRAM_PRIMARY, ENGRAM_FALLBACK] : [activeEngramUrl, ENGRAM_PRIMARY, ENGRAM_FALLBACK];

  if (activeEngramUrl !== ENGRAM_PRIMARY && Date.now() - lastPrimaryCheck > ENGRAM_RECHECK_MS) {
    lastPrimaryCheck = Date.now();
    try {
      const resp = await fetch(`${ENGRAM_PRIMARY}/health`, { signal: AbortSignal.timeout(2000) });
      if (resp.ok) activeEngramUrl = ENGRAM_PRIMARY;
    } catch {}
  }

  let lastErr: any;
  for (const base of urls) {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (ENGRAM_API_KEY) headers['Authorization'] = `Bearer ${ENGRAM_API_KEY}`;
      const resp = await fetch(`${base}${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (resp.ok) {
        activeEngramUrl = base;
        return resp;
      }
      lastErr = new Error(`HTTP ${resp.status}`);
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr || new Error('Engram unavailable');
}

app.post('/api/engram/context', async (c) => {
  const body = await c.req.json();
  try {
    const resp = await engramFetch('/context', body, 4000);
    return c.json(await resp.json());
  } catch {
    return c.json({ context: '' });
  }
});

app.post('/api/engram/store', async (c) => {
  const body = await c.req.json();
  try {
    const resp = await engramFetch('/store', body, 5000);
    return c.json(await resp.json());
  } catch {
    return c.json({ error: 'Engram unavailable' }, 502);
  }
});

app.post('/api/engram/search', async (c) => {
  const body = await c.req.json();
  try {
    const resp = await engramFetch('/search', body, 4000);
    return c.json(await resp.json());
  } catch {
    return c.json({ results: [] });
  }
});

// ─── Static Files (Svelte build) ────────────

app.get('/manifest.json', serveStatic({ root: './dist' }));
app.get('/sw.js', serveStatic({ root: './dist' }));
app.get('/icons/*', serveStatic({ root: './dist' }));
app.get('/assets/*', serveStatic({ root: './dist' }));
app.get('/favicon.svg', serveStatic({ root: './dist' }));

// SPA fallback
app.get('*', async (c) => {
  const path = c.req.path;
  if (path.startsWith('/api/')) return c.notFound();

  const filePath = join('./dist', path);
  if (existsSync(filePath)) {
    try {
      const s = await stat(filePath);
      if (!s.isDirectory()) {
        const content = await readFile(filePath);
        const ext = extname(path);
        const mimeTypes: Record<string, string> = {
          '.html': 'text/html',
          '.js': 'application/javascript',
          '.css': 'text/css',
          '.json': 'application/json',
          '.svg': 'image/svg+xml',
          '.png': 'image/png',
          '.ico': 'image/x-icon',
          '.woff2': 'font/woff2',
          '.woff': 'font/woff',
          '.ttf': 'font/ttf',
        };
        return new Response(content, {
          headers: { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' },
        });
      }
    } catch {}
  }

  try {
    const html = await readFile('./dist/index.html', 'utf-8');
    return c.html(html);
  } catch {
    return c.text('Forge not built. Run: bun run build', 500);
  }
});

// ─── Start ──────────────────────────────────

console.log(`⚒️  Forge Web Server`);
console.log(`   Port: ${PORT}`);
console.log(`   Roots: ${ALLOWED_ROOTS.join(', ')}`);
console.log(`   Synapse: ${SYNAPSE_URL}`);
console.log(`   Auth: reverse proxy`);

export default {
  port: PORT,
  fetch: app.fetch,
};
