import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-node',
  title: '47. Node.js Basics',
  explanation: `## Node.js Basics

Node.js runs JavaScript outside the browser on the V8 engine. It provides modules for file I/O, networking, child processes, and more.

\`\`\`javascript
// process -- global info about the running Node process
process.argv    // command-line arguments
process.env     // environment variables
process.cwd()   // current working directory
process.exit(0) // exit with code

// fs -- file system
import { readFile, writeFile } from 'node:fs/promises';
const data = await readFile('file.txt', 'utf-8');
await writeFile('out.txt', data);

// path -- cross-platform path manipulation
import path from 'node:path';
path.join('/a', 'b', 'c.txt')  // '/a/b/c.txt'
path.resolve('.')               // absolute path of CWD

// EventEmitter -- pub/sub in Node
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.on('data', (msg) => console.log(msg));
emitter.emit('data', 'hello');

// http -- create a basic server
import http from 'node:http';
http.createServer((req, res) => {
  res.end('Hello World');
}).listen(3000);
\`\`\`

Node uses ESM (\`import/export\`) natively with \`"type": "module"\` in package.json.`,
  exercises: [
    {
      id: 'js-node-1',
      title: 'Node Runtime',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks about the Node.js runtime.',
      skeleton: `// Node.js uses the __BLANK__ JavaScript engine
// Node.js is __BLANK__-threaded for JavaScript execution
// but uses a __BLANK__ pool for I/O operations

// Check Node version
console.log(process.__BLANK__.node);

// Check if running in Node (not browser)
const isNode = typeof __BLANK__ !== 'undefined';`,
      solution: `// Node.js uses the V8 JavaScript engine
// Node.js is single-threaded for JavaScript execution
// but uses a thread pool for I/O operations

// Check Node version
console.log(process.versions.node);

// Check if running in Node (not browser)
const isNode = typeof process !== 'undefined';`,
      hints: [
        'Node.js runs on Google Chrome V8 engine.',
        'JavaScript runs on one thread, but libuv manages I/O threads.',
        'process is a global object unique to Node.js.',
      ],
      concepts: ['Node.js', 'V8', 'single-threaded', 'event loop'],
    },
    {
      id: 'js-node-2',
      title: 'process.argv and env',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a CLI script that reads command-line arguments and environment variables.',
      skeleton: `// Parse CLI: node script.js --name Alice --greeting "Good morning"
function parseArgs(argv) {
  // Skip first two elements (node path and script path)
  // Parse --key value pairs into an object
  // Return: { name: 'Alice', greeting: 'Good morning' }



}

function getConfig() {
  const args = parseArgs(process.argv);
  return {
    name: args.name ?? process.env.USER_NAME ?? 'World',
    greeting: args.greeting ?? 'Hello',
    port: Number(process.env.PORT) || 3000,
  };
}

// const config = getConfig();
// console.log(config.greeting + ', ' + config.name + '!');`,
      solution: `function parseArgs(argv) {
  const args = {};
  const params = argv.slice(2);
  for (let i = 0; i < params.length; i += 2) {
    const key = params[i].replace(/^--/, '');
    const value = params[i + 1];
    args[key] = value;
  }
  return args;
}

function getConfig() {
  const args = parseArgs(process.argv);
  return {
    name: args.name ?? process.env.USER_NAME ?? 'World',
    greeting: args.greeting ?? 'Hello',
    port: Number(process.env.PORT) || 3000,
  };
}

// const config = getConfig();
// console.log(config.greeting + ', ' + config.name + '!');`,
      hints: [
        'process.argv[0] is the node binary, [1] is the script path, [2+] are user args.',
        'Loop in steps of 2: arg[i] is the --key, arg[i+1] is the value.',
        'Use ?? for nullish coalescing to set defaults.',
      ],
      concepts: ['process.argv', 'process.env', 'CLI parsing', 'configuration'],
    },
    {
      id: 'js-node-3',
      title: 'fs Module',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write async functions to read, write, and append to files using the fs/promises module.',
      skeleton: `import { readFile, writeFile, appendFile, stat } from 'node:fs/promises';

async function readJson(filepath) {
  // Read a JSON file and parse it


}

async function writeJson(filepath, data) {
  // Write data as formatted JSON to a file


}

async function appendLog(filepath, message) {
  // Append a timestamped message to a log file


}

async function fileExists(filepath) {
  // Return true if the file exists, false otherwise


}`,
      solution: `import { readFile, writeFile, appendFile, stat } from 'node:fs/promises';

async function readJson(filepath) {
  const content = await readFile(filepath, 'utf-8');
  return JSON.parse(content);
}

async function writeJson(filepath, data) {
  await writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

async function appendLog(filepath, message) {
  const line = \`[\${new Date().toISOString()}] \${message}\\n\`;
  await appendFile(filepath, line, 'utf-8');
}

async function fileExists(filepath) {
  try {
    await stat(filepath);
    return true;
  } catch {
    return false;
  }
}`,
      hints: [
        'readFile returns a string when you specify "utf-8" encoding.',
        'JSON.stringify(data, null, 2) formats with 2-space indentation.',
        'Use stat() in a try/catch to check file existence.',
      ],
      concepts: ['fs/promises', 'readFile', 'writeFile', 'appendFile', 'stat'],
    },
    {
      id: 'js-node-4',
      title: 'path Module',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to use the path module for cross-platform path manipulation.',
      skeleton: `import path from 'node:path';

// Join path segments
const configPath = path.__BLANK__('/home', 'user', '.config', 'app.json');
// '/home/user/.config/app.json'

// Get file extension
const ext = path.__BLANK__('report.pdf');
// '.pdf'

// Get filename without extension
const name = path.__BLANK__('data.json', '.json');
// 'data'

// Get directory name
const dir = path.__BLANK__('/home/user/docs/file.txt');
// '/home/user/docs'

// Resolve to absolute path
const abs = path.__BLANK__('src', 'index.js');
// e.g. '/project/src/index.js'`,
      solution: `import path from 'node:path';

// Join path segments
const configPath = path.join('/home', 'user', '.config', 'app.json');
// '/home/user/.config/app.json'

// Get file extension
const ext = path.extname('report.pdf');
// '.pdf'

// Get filename without extension
const name = path.basename('data.json', '.json');
// 'data'

// Get directory name
const dir = path.dirname('/home/user/docs/file.txt');
// '/home/user/docs'

// Resolve to absolute path
const abs = path.resolve('src', 'index.js');
// e.g. '/project/src/index.js'`,
      hints: [
        'path.join() concatenates segments with the correct separator.',
        'path.extname() returns the extension including the dot.',
        'path.basename() returns the last segment; pass extension to strip it.',
      ],
      concepts: ['path', 'join', 'extname', 'basename', 'dirname', 'resolve'],
    },
    {
      id: 'js-node-5',
      title: 'os Module',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function that collects system information using the os module.',
      skeleton: `import os from 'node:os';

function getSystemInfo() {
  // Return an object with:
  // platform, architecture, hostname, cpuCount, totalMemoryGB, freeMemoryGB, uptime



}

// getSystemInfo()
// => { platform: 'linux', architecture: 'x64', hostname: 'mypc',
//      cpuCount: 8, totalMemoryGB: 16, freeMemoryGB: 8.5, uptime: 3600 }`,
      solution: `import os from 'node:os';

function getSystemInfo() {
  return {
    platform: os.platform(),
    architecture: os.arch(),
    hostname: os.hostname(),
    cpuCount: os.cpus().length,
    totalMemoryGB: +(os.totalmem() / 1024 ** 3).toFixed(1),
    freeMemoryGB: +(os.freemem() / 1024 ** 3).toFixed(1),
    uptime: os.uptime(),
  };
}

// getSystemInfo()
// => { platform: 'linux', architecture: 'x64', hostname: 'mypc',
//      cpuCount: 8, totalMemoryGB: 16, freeMemoryGB: 8.5, uptime: 3600 }`,
      hints: [
        'os.platform() returns "linux", "darwin", "win32", etc.',
        'os.totalmem() returns bytes -- divide by 1024^3 for GB.',
        'os.cpus() returns an array -- use .length for the count.',
      ],
      concepts: ['os module', 'system info', 'memory', 'CPU'],
    },
    {
      id: 'js-node-6',
      title: 'child_process',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that executes a shell command and returns its output, with timeout and error handling.',
      skeleton: `import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

async function runCommand(command, args, options = {}) {
  // Execute command with args
  // Options: timeout (default 10000ms), cwd
  // Return: { stdout, stderr, exitCode }
  // On error: return { stdout: '', stderr: errorMsg, exitCode: 1 }



}

// Test:
// await runCommand('node', ['--version'])
// => { stdout: 'v22.0.0\\n', stderr: '', exitCode: 0 }`,
      solution: `import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

async function runCommand(command, args, options = {}) {
  try {
    const { stdout, stderr } = await execFileAsync(command, args, {
      timeout: options.timeout ?? 10000,
      cwd: options.cwd,
      maxBuffer: 1024 * 1024,
    });
    return { stdout, stderr, exitCode: 0 };
  } catch (error) {
    return {
      stdout: error.stdout ?? '',
      stderr: error.stderr ?? error.message,
      exitCode: error.code ?? 1,
    };
  }
}

// Test:
// await runCommand('node', ['--version'])
// => { stdout: 'v22.0.0\\n', stderr: '', exitCode: 0 }`,
      hints: [
        'Use promisify to convert callback-based execFile to async/await.',
        'Set timeout and maxBuffer in the options for safety.',
        'On error, the error object may contain stdout and stderr from the failed command.',
      ],
      concepts: ['child_process', 'execFile', 'promisify', 'command execution'],
    },
    {
      id: 'js-node-7',
      title: 'EventEmitter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a TaskRunner class that extends EventEmitter and emits events during task execution.',
      skeleton: `import { EventEmitter } from 'node:events';

class TaskRunner extends EventEmitter {
  #tasks = [];

  addTask(name, fn) {
    // Add a task to the queue

  }

  async run() {
    // Run all tasks sequentially
    // Emit: 'start' (no args), 'taskStart' (name), 'taskDone' (name, result),
    //        'taskError' (name, error), 'done' (results array)



  }
}

// Usage:
// const runner = new TaskRunner();
// runner.on('taskDone', (name, result) => console.log(name, result));
// runner.addTask('fetch', async () => 'data');
// await runner.run();`,
      solution: `import { EventEmitter } from 'node:events';

class TaskRunner extends EventEmitter {
  #tasks = [];

  addTask(name, fn) {
    this.#tasks.push({ name, fn });
  }

  async run() {
    this.emit('start');
    const results = [];

    for (const { name, fn } of this.#tasks) {
      this.emit('taskStart', name);
      try {
        const result = await fn();
        results.push({ name, result });
        this.emit('taskDone', name, result);
      } catch (error) {
        results.push({ name, error: error.message });
        this.emit('taskError', name, error);
      }
    }

    this.emit('done', results);
    return results;
  }
}

// Usage:
// const runner = new TaskRunner();
// runner.on('taskDone', (name, result) => console.log(name, result));
// runner.addTask('fetch', async () => 'data');
// await runner.run();`,
      hints: [
        'Extend EventEmitter and use this.emit() to fire events.',
        'Each task is { name, fn } -- run them sequentially with await.',
        'Wrap each task in try/catch to handle errors without stopping the whole run.',
      ],
      concepts: ['EventEmitter', 'inheritance', 'events', 'async tasks'],
    },
    {
      id: 'js-node-8',
      title: 'Buffer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the blanks to work with Node.js Buffers for binary data.',
      skeleton: `// Create a Buffer from a string
const buf1 = Buffer.__BLANK__('Hello, Node!', 'utf-8');

// Create a Buffer of 16 zero bytes
const buf2 = Buffer.__BLANK__(16);

// Convert Buffer to string
const text = buf1.__BLANK__('utf-8');

// Convert to Base64
const b64 = buf1.toString('__BLANK__');

// Get byte length
console.log(buf1.__BLANK__); // number of bytes

// Concatenate buffers
const combined = Buffer.__BLANK__([buf1, buf2]);`,
      solution: `// Create a Buffer from a string
const buf1 = Buffer.from('Hello, Node!', 'utf-8');

// Create a Buffer of 16 zero bytes
const buf2 = Buffer.alloc(16);

// Convert Buffer to string
const text = buf1.toString('utf-8');

// Convert to Base64
const b64 = buf1.toString('base64');

// Get byte length
console.log(buf1.length); // number of bytes

// Concatenate buffers
const combined = Buffer.concat([buf1, buf2]);`,
      hints: [
        'Buffer.from() creates a Buffer from a string or array.',
        'Buffer.alloc(n) creates a zero-filled Buffer of n bytes.',
        'toString("base64") encodes the buffer as a Base64 string.',
      ],
      concepts: ['Buffer', 'binary data', 'encoding', 'base64'],
    },
    {
      id: 'js-node-9',
      title: 'URL and URLSearchParams',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that builds and parses URLs using the URL and URLSearchParams APIs.',
      skeleton: `function buildApiUrl(base, path, params) {
  // Construct a URL from base + path + query parameters
  // Return the full URL string



}

function parseUrl(urlString) {
  // Parse a URL and return its components
  // Return: { protocol, hostname, port, pathname, params (as plain object) }



}

// Test:
// buildApiUrl('https://api.example.com', '/users', { page: 2, limit: 10 })
// => 'https://api.example.com/users?page=2&limit=10'`,
      solution: `function buildApiUrl(base, path, params) {
  const url = new URL(path, base);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

function parseUrl(urlString) {
  const url = new URL(urlString);
  const params = Object.fromEntries(url.searchParams.entries());
  return {
    protocol: url.protocol,
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
    params,
  };
}

// Test:
// buildApiUrl('https://api.example.com', '/users', { page: 2, limit: 10 })
// => 'https://api.example.com/users?page=2&limit=10'`,
      hints: [
        'new URL(path, base) resolves the path against the base URL.',
        'url.searchParams.set(key, value) adds query parameters.',
        'Object.fromEntries(url.searchParams.entries()) converts params to a plain object.',
      ],
      concepts: ['URL', 'URLSearchParams', 'query parameters', 'URL parsing'],
    },
    {
      id: 'js-node-10',
      title: 'crypto Basics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write utility functions for hashing and generating random values using the crypto module.',
      skeleton: `import crypto from 'node:crypto';

function sha256(input) {
  // Return the SHA-256 hash of input as a hex string


}

function randomToken(bytes = 32) {
  // Generate a random token as a hex string


}

function hmac(key, message) {
  // Create an HMAC-SHA256 of message using key, return hex


}

// Test:
// sha256('hello')  // '2cf24dba...'
// randomToken(16)  // '3a1b9c...' (32 hex chars)`,
      solution: `import crypto from 'node:crypto';

function sha256(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

function randomToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString('hex');
}

function hmac(key, message) {
  return crypto.createHmac('sha256', key).update(message).digest('hex');
}

// Test:
// sha256('hello')  // '2cf24dba...'
// randomToken(16)  // '3a1b9c...' (32 hex chars)`,
      hints: [
        'createHash("sha256").update(input).digest("hex") produces a hex hash.',
        'randomBytes(n) generates n cryptographically secure random bytes.',
        'createHmac("sha256", key).update(message).digest("hex") for HMAC.',
      ],
      concepts: ['crypto', 'SHA-256', 'HMAC', 'random bytes', 'hashing'],
    },
    {
      id: 'js-node-11',
      title: 'http.createServer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a basic HTTP server that handles different routes and methods.',
      skeleton: `import http from 'node:http';

function createApp() {
  const routes = new Map();

  function get(path, handler) {
    routes.set('GET:' + path, handler);
  }

  function post(path, handler) {
    routes.set('POST:' + path, handler);
  }

  const server = http.createServer(async (req, res) => {
    // Match route, call handler, handle 404
    // Parse JSON body for POST requests



  });

  return { get, post, listen: (port) => server.listen(port) };
}

// Usage:
// const app = createApp();
// app.get('/health', (req, res) => res.end('ok'));
// app.post('/echo', (req, res, body) => res.end(JSON.stringify(body)));
// app.listen(3000);`,
      solution: `import http from 'node:http';

function createApp() {
  const routes = new Map();

  function get(path, handler) {
    routes.set('GET:' + path, handler);
  }

  function post(path, handler) {
    routes.set('POST:' + path, handler);
  }

  const server = http.createServer(async (req, res) => {
    const key = req.method + ':' + req.url;
    const handler = routes.get(key);

    if (!handler) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found' }));
      return;
    }

    if (req.method === 'POST') {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const body = JSON.parse(Buffer.concat(chunks).toString());
      handler(req, res, body);
    } else {
      handler(req, res);
    }
  });

  return { get, post, listen: (port) => server.listen(port) };
}

// Usage:
// const app = createApp();
// app.get('/health', (req, res) => res.end('ok'));
// app.post('/echo', (req, res, body) => res.end(JSON.stringify(body)));
// app.listen(3000);`,
      hints: [
        'Store routes in a Map keyed by "METHOD:/path".',
        'Parse the request body by collecting chunks with for await...of.',
        'Return 404 for unmatched routes.',
      ],
      concepts: ['http.createServer', 'routing', 'request body', 'HTTP server'],
    },
    {
      id: 'js-node-12',
      title: 'Express Concept',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the response for each request to this Express-like server.',
      skeleton: `// Assume express-like framework
const app = createApp();

app.use((req, res, next) => {
  req.startTime = Date.now();
  next();
});

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'Alice' }]);
});

app.get('/api/users/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'User ' + req.params.id });
});

app.post('/api/users', (req, res) => {
  res.status(201).json({ id: 2, ...req.body });
});

// What response for:
// 1. GET /api/users
// 2. GET /api/users/42
// 3. POST /api/users with body { name: 'Bob' }
// 4. DELETE /api/users/1`,
      solution: `// 1. GET /api/users
//    Middleware runs (sets startTime), then handler responds:
//    Status 200, Body: [{ id: 1, name: 'Alice' }]

// 2. GET /api/users/42
//    Middleware runs, then handler responds:
//    Status 200, Body: { id: '42', name: 'User 42' }
//    (Note: req.params.id is a string '42', not number)

// 3. POST /api/users with body { name: 'Bob' }
//    Middleware runs, then handler responds:
//    Status 201, Body: { id: 2, name: 'Bob' }

// 4. DELETE /api/users/1
//    Middleware runs, but no DELETE route is defined
//    Status 404 (or framework default 'Cannot DELETE /api/users/1')`,
      hints: [
        'Middleware with next() runs before every matched route handler.',
        'Route params like :id are strings in req.params.',
        'Unmatched routes/methods typically return 404.',
      ],
      concepts: ['Express', 'middleware', 'routing', 'route params', 'HTTP methods'],
    },
    {
      id: 'js-node-13',
      title: 'npm / package.json',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks for a valid package.json configuration.',
      skeleton: `{
  "__BLANK__": "my-app",
  "version": "1.0.0",
  "__BLANK__": "module",
  "main": "dist/index.js",
  "scripts": {
    "start": "node dist/index.js",
    "__BLANK__": "tsc && node dist/index.js",
    "test": "vitest"
  },
  "__BLANK__": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "__BLANK__": "^5.0.0",
    "typescript": "^5.4.0"
  }
}`,
      solution: `{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "tsc && node dist/index.js",
    "test": "vitest"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "vitest": "^5.0.0",
    "typescript": "^5.4.0"
  }
}`,
      hints: [
        '"name" identifies the package, "type": "module" enables ESM.',
        '"scripts" defines npm run commands -- "dev" is a common development script.',
        '"dependencies" are production deps, "devDependencies" are for development only.',
      ],
      concepts: ['package.json', 'npm', 'ESM', 'scripts', 'dependencies'],
    },
    {
      id: 'js-node-14',
      title: 'ESM vs CJS in Node',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict which module syntax works in each scenario.',
      skeleton: `// File: app.mjs (ESM by extension)
import fs from 'node:fs';        // Works?
const path = require('path');    // Works?

// File: lib.cjs (CJS by extension)
const fs = require('node:fs');   // Works?
import path from 'node:path';   // Works?

// File: index.js with "type": "module" in package.json
import fs from 'node:fs';        // Works?
const path = require('node:path'); // Works?

// File: index.js WITHOUT "type": "module"
const fs = require('node:fs');   // Works?
import path from 'node:path';   // Works?`,
      solution: `// File: app.mjs (ESM by extension)
import fs from 'node:fs';        // YES -- .mjs is always ESM
const path = require('path');    // NO -- require not available in ESM

// File: lib.cjs (CJS by extension)
const fs = require('node:fs');   // YES -- .cjs is always CJS
import path from 'node:path';   // NO -- import syntax not allowed in CJS files

// File: index.js with "type": "module" in package.json
import fs from 'node:fs';        // YES -- "type": "module" makes .js files ESM
const path = require('node:path'); // NO -- require not available in ESM

// File: index.js WITHOUT "type": "module"
const fs = require('node:fs');   // YES -- default is CJS
import path from 'node:path';   // NO -- import not allowed in CJS context`,
      hints: [
        '.mjs files are always ESM; .cjs files are always CJS regardless of package.json.',
        '"type": "module" makes .js files ESM; without it, .js files are CJS.',
        'require() is not available in ESM; import is not available in CJS (top-level).',
      ],
      concepts: ['ESM', 'CJS', 'CommonJS', 'import', 'require', 'module system'],
    },
    {
      id: 'js-node-15',
      title: 'worker_threads',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that offloads CPU-intensive work to a worker thread.',
      skeleton: `import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';

function runInWorker(fn, data) {
  // Create a worker that executes fn with data
  // Return a promise that resolves with the result
  // The worker should handle errors too



}

// Worker code (same file, using isMainThread check)
if (!isMainThread) {
  // Execute the function and send result back


}

// Usage:
// const result = await runInWorker(
//   (n) => { let sum = 0; for (let i = 0; i < n; i++) sum += i; return sum; },
//   1_000_000
// );`,
      solution: `import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { fileURLToPath } from 'node:url';

function runInWorker(fn, data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(fileURLToPath(import.meta.url), {
      workerData: { fn: fn.toString(), data },
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(\`Worker exited with code \${code}\`));
    });
  });
}

if (!isMainThread) {
  const { fn, data } = workerData;
  const func = new Function('return ' + fn)();
  const result = func(data);
  parentPort.postMessage(result);
}

// Usage:
// const result = await runInWorker(
//   (n) => { let sum = 0; for (let i = 0; i < n; i++) sum += i; return sum; },
//   1_000_000
// );`,
      hints: [
        'Workers run in separate threads -- great for CPU-intensive tasks.',
        'Serialize the function with fn.toString() and recreate it in the worker.',
        'Use parentPort.postMessage() to send results back to the main thread.',
      ],
      concepts: ['worker_threads', 'multi-threading', 'CPU-bound', 'postMessage'],
    },
    {
      id: 'js-node-16',
      title: 'Cluster Module',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fill in the blanks to create a clustered HTTP server that uses all CPU cores.',
      skeleton: `import cluster from 'node:cluster';
import http from 'node:http';
import os from 'node:os';

if (cluster.__BLANK__) {
  const numCPUs = os.__BLANK__().length;
  console.log('Primary process, forking', numCPUs, 'workers');

  for (let i = 0; i < numCPUs; i++) {
    cluster.__BLANK__();
  }

  cluster.on('__BLANK__', (worker, code) => {
    console.log('Worker', worker.process.pid, 'died, restarting...');
    cluster.fork();
  });
} else {
  http.createServer((req, res) => {
    res.end('Handled by worker ' + __BLANK__.pid);
  }).listen(3000);
}`,
      solution: `import cluster from 'node:cluster';
import http from 'node:http';
import os from 'node:os';

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log('Primary process, forking', numCPUs, 'workers');

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    console.log('Worker', worker.process.pid, 'died, restarting...');
    cluster.fork();
  });
} else {
  http.createServer((req, res) => {
    res.end('Handled by worker ' + process.pid);
  }).listen(3000);
}`,
      hints: [
        'cluster.isPrimary (or isMaster in older Node) identifies the main process.',
        'os.cpus() returns an array of CPU core info.',
        'cluster.fork() spawns a worker process.',
      ],
      concepts: ['cluster', 'multi-process', 'load balancing', 'fork'],
    },
    {
      id: 'js-node-17',
      title: 'File Watcher',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a file watcher that monitors a directory for changes and calls a callback.',
      skeleton: `import { watch } from 'node:fs/promises';
import path from 'node:path';

async function watchDirectory(dir, onChange) {
  // Watch directory for file changes
  // Call onChange(eventType, filename) for each change
  // Return an AbortController to stop watching



}

// Usage:
// const controller = await watchDirectory('./src', (event, file) => {
//   console.log(event, file);
// });
// // Later: controller.abort(); to stop watching`,
      solution: `import { watch } from 'node:fs/promises';
import path from 'node:path';

async function watchDirectory(dir, onChange) {
  const ac = new AbortController();

  (async () => {
    try {
      const watcher = watch(dir, {
        recursive: true,
        signal: ac.signal,
      });
      for await (const event of watcher) {
        onChange(event.eventType, event.filename);
      }
    } catch (err) {
      if (err.name !== 'AbortError') throw err;
    }
  })();

  return ac;
}

// Usage:
// const controller = await watchDirectory('./src', (event, file) => {
//   console.log(event, file);
// });
// // Later: controller.abort(); to stop watching`,
      hints: [
        'fs/promises.watch returns an async iterable of file change events.',
        'Use AbortController + signal to cancel the watcher.',
        'Catch AbortError silently -- it just means we intentionally stopped watching.',
      ],
      concepts: ['file watcher', 'AbortController', 'async iteration', 'fs.watch'],
    },
    {
      id: 'js-node-18',
      title: 'Node Streams to Web Streams',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fix the code that incorrectly bridges Node readable streams and Web ReadableStream.',
      skeleton: `import { createReadStream } from 'node:fs';
import { Readable } from 'node:stream';

// BUG: Mixing Node stream and Web stream APIs incorrectly
async function readFileAsWebStream(filepath) {
  const nodeStream = createReadStream(filepath);

  // This doesn't work -- Web ReadableStream and Node Readable are different
  const webStream = new ReadableStream(nodeStream);

  const reader = webStream.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString();
}`,
      solution: `import { createReadStream } from 'node:fs';
import { Readable } from 'node:stream';

// FIX: Use Readable.toWeb() to convert Node stream to Web stream
async function readFileAsWebStream(filepath) {
  const nodeStream = createReadStream(filepath);
  const webStream = Readable.toWeb(nodeStream);

  const reader = webStream.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString();
}`,
      hints: [
        'You cannot pass a Node stream to the ReadableStream constructor.',
        'Use Readable.toWeb(nodeStream) to convert a Node Readable to a Web ReadableStream.',
        'The reverse is Readable.fromWeb(webStream).',
      ],
      concepts: ['Node streams', 'Web streams', 'Readable.toWeb', 'stream conversion'],
    },
    {
      id: 'js-node-19',
      title: 'Practical: CLI Tool',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a simple CLI file search tool that finds files containing a pattern, using Node APIs.',
      skeleton: `import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

async function searchFiles(dir, pattern, options = {}) {
  // Recursively search dir for files containing pattern (string or regex)
  // Options: { extensions: ['.js', '.ts'], maxDepth: 10 }
  // Return: [{ file: relativePath, line: number, text: matchedLine }]



}

// Usage:
// await searchFiles('./src', 'TODO', { extensions: ['.js', '.ts'] })
// => [{ file: 'src/app.js', line: 42, text: '// TODO: fix this' }]`,
      solution: `import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

async function searchFiles(dir, pattern, options = {}) {
  const { extensions = null, maxDepth = 10 } = options;
  const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern, 'i');
  const results = [];

  async function walk(currentDir, depth) {
    if (depth > maxDepth) return;
    const entries = await readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath, depth + 1);
      } else if (entry.isFile()) {
        if (extensions && !extensions.includes(path.extname(entry.name))) {
          continue;
        }
        try {
          const content = await readFile(fullPath, 'utf-8');
          const lines = content.split('\\n');
          for (let i = 0; i < lines.length; i++) {
            if (regex.test(lines[i])) {
              results.push({
                file: path.relative(dir, fullPath),
                line: i + 1,
                text: lines[i].trim(),
              });
            }
          }
        } catch {
          // Skip unreadable files
        }
      }
    }
  }

  await walk(dir, 0);
  return results;
}

// Usage:
// await searchFiles('./src', 'TODO', { extensions: ['.js', '.ts'] })
// => [{ file: 'src/app.js', line: 42, text: '// TODO: fix this' }]`,
      hints: [
        'Use readdir with { withFileTypes: true } to distinguish files from directories.',
        'Recursively walk directories, respecting maxDepth.',
        'Read each file, split into lines, and test each against the regex.',
      ],
      concepts: ['file system', 'recursion', 'regex search', 'CLI tool', 'path'],
    },
    {
      id: 'js-node-20',
      title: 'Combined: Config-Driven Server',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this hardcoded server into a config-driven one using environment variables, CLI args, fs for routes, and proper error handling.',
      skeleton: `import http from 'node:http';

// HARDCODED: port, routes, and config
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Home');
  } else if (req.url === '/about') {
    res.end('About');
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server running on 3000');
});`,
      solution: `import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

async function loadRoutes(routesFile) {
  try {
    const content = await readFile(routesFile, 'utf-8');
    return JSON.parse(content);
  } catch {
    return { '/': 'Home', '/about': 'About' };
  }
}

function parseArgs(argv) {
  const args = {};
  const params = argv.slice(2);
  for (let i = 0; i < params.length; i += 2) {
    args[params[i].replace(/^--/, '')] = params[i + 1];
  }
  return args;
}

async function startServer() {
  const args = parseArgs(process.argv);
  const port = Number(args.port ?? process.env.PORT ?? 3000);
  const routesFile = args.routes ?? process.env.ROUTES_FILE ?? 'routes.json';

  const routes = await loadRoutes(routesFile);

  const server = http.createServer((req, res) => {
    const body = routes[req.url];
    if (body) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(body);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    }
  });

  server.on('error', (err) => {
    console.error('Server error:', err.message);
    process.exit(1);
  });

  server.listen(port, () => {
    console.log(\`Server running on \${port}\`);
  });
}

startServer();`,
      hints: [
        'Read port from CLI args, then env vars, then default.',
        'Load routes from a JSON file for easy configuration.',
        'Add error handling with server.on("error", ...).',
      ],
      concepts: ['configuration', 'environment variables', 'CLI args', 'file-based routes', 'error handling'],
    },
  ],
};
