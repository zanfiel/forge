import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-workers',
  title: '35. Web Workers',
  explanation: `## Web Workers

Web Workers run JavaScript in background threads, keeping the main thread responsive.

\`\`\`javascript
// Main thread
const worker = new Worker('worker.js');
worker.postMessage({ type: 'compute', data: [1, 2, 3] });
worker.onmessage = (e) => console.log('Result:', e.data);
worker.terminate();

// worker.js
self.onmessage = (e) => {
  const result = heavyComputation(e.data);
  self.postMessage(result);
};

// Inline worker (from Blob URL)
const code = \`self.onmessage = (e) => self.postMessage(e.data * 2);\`;
const blob = new Blob([code], { type: 'application/javascript' });
const w = new Worker(URL.createObjectURL(blob));

// Transferable objects (zero-copy)
const buffer = new ArrayBuffer(1024);
worker.postMessage(buffer, [buffer]); // buffer is transferred, not copied
\`\`\`

Workers cannot access the DOM. They communicate via postMessage (structured clone). SharedWorker shares state across tabs. Service Workers handle offline/caching.`,
  exercises: [
    {
      id: 'js-workers-1',
      title: 'Create a Worker',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create a worker and communicate with it.',
      skeleton: `const worker = new __BLANK__('worker.js');
worker.__BLANK__({ type: 'hello', payload: 42 });
worker.__BLANK__ = (event) => {
  console.log('Reply:', event.data);
};`,
      solution: `const worker = new Worker('worker.js');
worker.postMessage({ type: 'hello', payload: 42 });
worker.onmessage = (event) => {
  console.log('Reply:', event.data);
};`,
      hints: [
        'new Worker(url) creates a background thread.',
        'postMessage sends data to the worker.',
        'onmessage receives data back from the worker.',
      ],
      concepts: ['Worker constructor', 'postMessage', 'onmessage'],
    },
    {
      id: 'js-workers-2',
      title: 'Worker self.onmessage',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to write the worker-side message handler.',
      skeleton: `// Inside worker.js
__BLANK__.onmessage = (event) => {
  const { type, payload } = event.__BLANK__;
  if (type === 'double') {
    __BLANK__.postMessage(payload * 2);
  }
};`,
      solution: `// Inside worker.js
self.onmessage = (event) => {
  const { type, payload } = event.data;
  if (type === 'double') {
    self.postMessage(payload * 2);
  }
};`,
      hints: [
        'In a worker, "self" refers to the worker global scope.',
        'event.data contains the message sent from the main thread.',
        'self.postMessage sends a reply back.',
      ],
      concepts: ['self', 'event.data', 'worker message handler'],
    },
    {
      id: 'js-workers-3',
      title: 'Terminate a worker',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to handle worker errors and termination.',
      skeleton: `const worker = new Worker('worker.js');

worker.__BLANK__ = (error) => {
  console.error('Worker error:', error.message);
  worker.__BLANK__();
};

// Also works from inside the worker:
// self.__BLANK__();`,
      solution: `const worker = new Worker('worker.js');

worker.onerror = (error) => {
  console.error('Worker error:', error.message);
  worker.terminate();
};

// Also works from inside the worker:
// self.close();`,
      hints: [
        'onerror catches uncaught errors in the worker.',
        'worker.terminate() stops the worker from the main thread.',
        'self.close() stops the worker from inside itself.',
      ],
      concepts: ['onerror', 'terminate', 'close'],
    },
    {
      id: 'js-workers-4',
      title: 'Inline worker from Blob',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create a worker from inline code using a Blob URL.',
      skeleton: `const code = \`
  self.onmessage = (e) => {
    const sum = e.data.reduce((a, b) => a + b, 0);
    self.postMessage(sum);
  };
\`;

const blob = new __BLANK__([code], { type: 'application/javascript' });
const url = URL.__BLANK__(blob);
const worker = new Worker(url);`,
      solution: `const code = \`
  self.onmessage = (e) => {
    const sum = e.data.reduce((a, b) => a + b, 0);
    self.postMessage(sum);
  };
\`;

const blob = new Blob([code], { type: 'application/javascript' });
const url = URL.createObjectURL(blob);
const worker = new Worker(url);`,
      hints: [
        'new Blob([code]) creates a Blob from a string.',
        'URL.createObjectURL(blob) generates a URL for the blob.',
        'Pass the blob URL to the Worker constructor.',
      ],
      concepts: ['Blob', 'URL.createObjectURL', 'inline worker'],
    },
    {
      id: 'js-workers-5',
      title: 'Transferable objects',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to transfer an ArrayBuffer to a worker (zero-copy).',
      skeleton: `const buffer = new ArrayBuffer(1024 * 1024);
console.log(buffer.byteLength); // 1048576

worker.postMessage(buffer, __BLANK__);
console.log(buffer.byteLength); // __BLANK__ (transferred, not copied)`,
      solution: `const buffer = new ArrayBuffer(1024 * 1024);
console.log(buffer.byteLength); // 1048576

worker.postMessage(buffer, [buffer]);
console.log(buffer.byteLength); // 0 (transferred, not copied)`,
      hints: [
        'The second argument to postMessage is a list of transferables.',
        'Transferred objects are moved, not copied.',
        'After transfer, the original buffer is neutered (byteLength = 0).',
      ],
      concepts: ['transferable objects', 'ArrayBuffer transfer'],
    },
    {
      id: 'js-workers-6',
      title: 'Predict worker message order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the message order between main thread and worker.',
      skeleton: `// Main thread
const code = \`
  self.onmessage = () => {
    self.postMessage('worker-1');
    self.postMessage('worker-2');
  };
\`;
const blob = new Blob([code], { type: 'application/javascript' });
const worker = new Worker(URL.createObjectURL(blob));

console.log('main-1');
worker.onmessage = (e) => console.log(e.data);
worker.postMessage('go');
console.log('main-2');`,
      solution: `// Output:
// 'main-1'
// 'main-2'
// 'worker-1'
// 'worker-2'
// Synchronous main thread code runs first.
// Worker messages are received asynchronously.
// Worker responses arrive in order after current synchronous code.`,
      hints: [
        'console.log("main-1") and "main-2" are synchronous.',
        'Worker messages are asynchronous events.',
        'Worker messages arrive after synchronous code completes.',
      ],
      concepts: ['worker async messaging', 'event loop'],
    },
    {
      id: 'js-workers-7',
      title: 'Predict transferable state',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict what happens to an ArrayBuffer after transfer.',
      skeleton: `const buf = new ArrayBuffer(8);
const view = new Uint8Array(buf);
view[0] = 42;
console.log(view[0]);
console.log(buf.byteLength);

worker.postMessage(buf, [buf]);

console.log(buf.byteLength);
try {
  console.log(view[0]);
} catch (e) {
  console.log(e.constructor.name);
}`,
      solution: `// Output:
// 42
// 8
// 0
// 0 (or TypeError in some engines, but usually just 0)
// After transfer, the ArrayBuffer is detached (neutered).
// Its byteLength becomes 0.
// Views on a detached buffer return 0 or throw TypeError.`,
      hints: [
        'Transferring detaches the original ArrayBuffer.',
        'byteLength becomes 0 after transfer.',
        'TypedArray views on detached buffers behave as empty or throw.',
      ],
      concepts: ['ArrayBuffer detachment', 'transferable'],
    },
    {
      id: 'js-workers-8',
      title: 'MessageChannel communication',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that creates a MessageChannel for direct port-based communication between main thread and worker.',
      skeleton: `// setupChannel(worker) -- creates a MessageChannel, sends port2 to worker
// Returns port1 for main thread communication
`,
      solution: `function setupChannel(worker) {
  const channel = new MessageChannel();
  worker.postMessage({ type: 'port' }, [channel.port2]);

  channel.port1.onmessage = (e) => {
    console.log('Received via channel:', e.data);
  };

  return channel.port1;
}

// Worker side:
// self.onmessage = (e) => {
//   if (e.data.type === 'port') {
//     const port = e.ports[0];
//     port.onmessage = (e) => port.postMessage('pong');
//   }
// };`,
      hints: [
        'new MessageChannel() creates port1 and port2.',
        'Transfer port2 to the worker via postMessage.',
        'Both sides use their port for direct communication.',
      ],
      concepts: ['MessageChannel', 'MessagePort', 'port transfer'],
    },
    {
      id: 'js-workers-9',
      title: 'Worker pool pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a simple worker pool that distributes tasks across multiple workers.',
      skeleton: `// createWorkerPool(workerUrl, size) returns { run(data): Promise<result> }
// Distributes tasks round-robin across workers
`,
      solution: `function createWorkerPool(workerUrl, size) {
  const workers = Array.from({ length: size }, () => new Worker(workerUrl));
  let nextWorker = 0;
  const pending = new Map();
  let taskId = 0;

  workers.forEach(worker => {
    worker.onmessage = (e) => {
      const { id, result } = e.data;
      const resolve = pending.get(id);
      if (resolve) {
        resolve(result);
        pending.delete(id);
      }
    };
  });

  return {
    run(data) {
      return new Promise(resolve => {
        const id = taskId++;
        pending.set(id, resolve);
        workers[nextWorker % size].postMessage({ id, data });
        nextWorker++;
      });
    },
    terminate() {
      workers.forEach(w => w.terminate());
    },
  };
}`,
      hints: [
        'Create an array of Worker instances.',
        'Round-robin tasks across workers with a counter.',
        'Use a Map of task IDs to Promises for result routing.',
      ],
      concepts: ['worker pool', 'round-robin', 'task distribution'],
    },
    {
      id: 'js-workers-10',
      title: 'Worker with error handling',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that sends a task to a worker and returns a Promise that rejects on error.',
      skeleton: `// workerTask(worker, data) -- sends data and returns Promise<result>
// Rejects if the worker throws an error
`,
      solution: `function workerTask(worker, data) {
  return new Promise((resolve, reject) => {
    function onMessage(e) {
      cleanup();
      resolve(e.data);
    }
    function onError(e) {
      cleanup();
      reject(new Error(e.message));
    }
    function cleanup() {
      worker.removeEventListener('message', onMessage);
      worker.removeEventListener('error', onError);
    }
    worker.addEventListener('message', onMessage);
    worker.addEventListener('error', onError);
    worker.postMessage(data);
  });
}`,
      hints: [
        'Wrap postMessage/onmessage in a Promise.',
        'Listen for both "message" and "error" events.',
        'Clean up listeners after the Promise settles.',
      ],
      concepts: ['worker Promise wrapper', 'error handling'],
    },
    {
      id: 'js-workers-11',
      title: 'Shared worker RPC',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a simple RPC (remote procedure call) wrapper for worker communication.',
      skeleton: `// createWorkerRPC(worker) returns a proxy-like object
// Calling rpc.methodName(args) sends a message and returns a Promise
`,
      solution: `function createWorkerRPC(worker) {
  let nextId = 0;
  const pending = new Map();

  worker.onmessage = (e) => {
    const { id, result, error } = e.data;
    const handlers = pending.get(id);
    if (handlers) {
      pending.delete(id);
      if (error) handlers.reject(new Error(error));
      else handlers.resolve(result);
    }
  };

  return new Proxy({}, {
    get(_, method) {
      return (...args) => {
        return new Promise((resolve, reject) => {
          const id = nextId++;
          pending.set(id, { resolve, reject });
          worker.postMessage({ id, method, args });
        });
      };
    },
  });
}`,
      hints: [
        'Use a Proxy to intercept property access as method names.',
        'Each call gets a unique ID for matching responses.',
        'The worker processes { id, method, args } and returns { id, result }.',
      ],
      concepts: ['RPC pattern', 'Proxy', 'worker communication'],
    },
    {
      id: 'js-workers-12',
      title: 'Fix the worker scope bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This worker code tries to access the DOM, which is not available in workers. Fix it.',
      skeleton: `// worker.js
self.onmessage = (e) => {
  const element = document.getElementById('output');
  element.textContent = e.data * 2;
  self.postMessage('done');
};`,
      solution: `// worker.js
self.onmessage = (e) => {
  const result = e.data * 2;
  self.postMessage(result);
};

// Main thread handles the DOM:
// worker.onmessage = (e) => {
//   document.getElementById('output').textContent = e.data;
// };`,
      hints: [
        'Workers cannot access the DOM (document, window, etc.).',
        'Do the computation in the worker, return the result.',
        'Update the DOM on the main thread in the onmessage handler.',
      ],
      concepts: ['worker scope', 'no DOM access'],
    },
    {
      id: 'js-workers-13',
      title: 'Fix the worker memory leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code creates workers but never terminates them. Fix it.',
      skeleton: `async function processItems(items) {
  const results = [];
  for (const item of items) {
    const worker = new Worker('process.js');
    const result = await new Promise(resolve => {
      worker.onmessage = (e) => resolve(e.data);
      worker.postMessage(item);
    });
    results.push(result);
    // Bug: worker is never terminated
  }
  return results;
}`,
      solution: `async function processItems(items) {
  const results = [];
  for (const item of items) {
    const worker = new Worker('process.js');
    const result = await new Promise(resolve => {
      worker.onmessage = (e) => {
        resolve(e.data);
        worker.terminate();
      };
      worker.postMessage(item);
    });
    results.push(result);
  }
  return results;
}`,
      hints: [
        'Call worker.terminate() after receiving the result.',
        'Each iteration creates a new worker that must be cleaned up.',
        'Better yet, reuse a single worker for all items.',
      ],
      concepts: ['worker termination', 'memory leak'],
    },
    {
      id: 'js-workers-14',
      title: 'Fix SharedArrayBuffer race condition',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This code has a race condition with SharedArrayBuffer. Fix it using Atomics.',
      skeleton: `// Shared buffer between main thread and worker
const sab = new SharedArrayBuffer(4);
const view = new Int32Array(sab);

// Worker increments view[0] 1000 times:
// for (let i = 0; i < 1000; i++) { view[0]++; }

// Main thread also increments 1000 times:
// for (let i = 0; i < 1000; i++) { view[0]++; }

// Expected: 2000, but race condition gives less`,
      solution: `const sab = new SharedArrayBuffer(4);
const view = new Int32Array(sab);

// Worker increments atomically:
// for (let i = 0; i < 1000; i++) { Atomics.add(view, 0, 1); }

// Main thread increments atomically:
for (let i = 0; i < 1000; i++) {
  Atomics.add(view, 0, 1);
}

// Atomics.add is atomic -- no race condition.
// Result will be exactly 2000.`,
      hints: [
        'view[0]++ is not atomic -- it is read-modify-write.',
        'Atomics.add(view, index, value) is an atomic operation.',
        'Use Atomics for all shared memory operations.',
      ],
      concepts: ['Atomics.add', 'SharedArrayBuffer', 'race condition'],
    },
    {
      id: 'js-workers-15',
      title: 'Predict navigator.hardwareConcurrency',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict how hardwareConcurrency is used for worker pool sizing.',
      skeleton: `const cores = navigator.hardwareConcurrency || 4;
const poolSize = Math.max(1, cores - 1);
console.log(typeof cores);
console.log(poolSize >= 1);
// On an 8-core machine:
console.log(cores);
console.log(poolSize);`,
      solution: `// Output:
// 'number'
// true
// 8 (on an 8-core machine)
// 7
// navigator.hardwareConcurrency returns the number of logical processors.
// We leave 1 core for the main thread, so poolSize = cores - 1.
// The fallback of 4 handles browsers where the API is unavailable.`,
      hints: [
        'hardwareConcurrency returns the number of logical CPU cores.',
        'It is a number, or undefined if not supported.',
        'Leave at least 1 core free for the main thread.',
      ],
      concepts: ['hardwareConcurrency', 'worker pool sizing'],
    },
    {
      id: 'js-workers-16',
      title: 'OffscreenCanvas worker',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write code that transfers a canvas to a worker for off-main-thread rendering.',
      skeleton: `// Main thread: transfer a canvas to a worker
// Worker: draw on the OffscreenCanvas
`,
      solution: `// Main thread:
function setupOffscreenCanvas(canvas, worker) {
  const offscreen = canvas.transferControlToOffscreen();
  worker.postMessage({ type: 'canvas', canvas: offscreen }, [offscreen]);
}

// Worker code (worker.js):
// self.onmessage = (e) => {
//   if (e.data.type === 'canvas') {
//     const canvas = e.data.canvas;
//     const ctx = canvas.getContext('2d');
//     ctx.fillStyle = 'blue';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//   }
// };`,
      hints: [
        'canvas.transferControlToOffscreen() creates an OffscreenCanvas.',
        'Transfer the OffscreenCanvas to the worker via postMessage.',
        'The worker can draw without blocking the main thread.',
      ],
      concepts: ['OffscreenCanvas', 'transferControlToOffscreen'],
    },
    {
      id: 'js-workers-17',
      title: 'Service Worker registration',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that registers a Service Worker and handles the lifecycle events.',
      skeleton: `// registerSW(url) -- registers a service worker and logs lifecycle events
// Returns the registration object
`,
      solution: `async function registerSW(url) {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service Workers not supported');
  }

  const registration = await navigator.serviceWorker.register(url);

  registration.addEventListener('updatefound', () => {
    const newWorker = registration.installing;
    console.log('New service worker installing');

    newWorker.addEventListener('statechange', () => {
      console.log('SW state:', newWorker.state);
    });
  });

  return registration;
}`,
      hints: [
        'navigator.serviceWorker.register(url) returns a Promise.',
        'The updatefound event fires when a new SW is being installed.',
        'SW states: installing, installed, activating, activated, redundant.',
      ],
      concepts: ['Service Worker', 'registration', 'lifecycle'],
    },
    {
      id: 'js-workers-18',
      title: 'Worker module type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write code that creates a Worker using ES module syntax.',
      skeleton: `// Create a worker that uses import/export (module worker)
`,
      solution: `// Main thread:
const worker = new Worker('worker.mjs', { type: 'module' });

worker.postMessage({ action: 'process', data: [1, 2, 3] });
worker.onmessage = (e) => console.log('Result:', e.data);

// worker.mjs:
// import { processData } from './utils.mjs';
//
// self.onmessage = (e) => {
//   const result = processData(e.data.data);
//   self.postMessage(result);
// };`,
      hints: [
        'Pass { type: "module" } as the second argument to Worker.',
        'Module workers can use import/export.',
        'The worker file should have .mjs extension or be served as module.',
      ],
      concepts: ['module worker', 'ES modules in workers'],
    },
    {
      id: 'js-workers-19',
      title: 'Refactor sync computation to worker',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this blocking main-thread computation to use a Web Worker.',
      skeleton: `function findPrimes(max) {
  const primes = [];
  for (let n = 2; n <= max; n++) {
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) { isPrime = false; break; }
    }
    if (isPrime) primes.push(n);
  }
  return primes;
}

// This blocks the UI for large values of max
const result = findPrimes(10000000);
document.getElementById('output').textContent = result.length + ' primes found';`,
      solution: `// Main thread:
async function findPrimesAsync(max) {
  const code = \`
    self.onmessage = (e) => {
      const max = e.data;
      const primes = [];
      for (let n = 2; n <= max; n++) {
        let isPrime = true;
        for (let i = 2; i <= Math.sqrt(n); i++) {
          if (n % i === 0) { isPrime = false; break; }
        }
        if (isPrime) primes.push(n);
      }
      self.postMessage(primes);
    };
  \`;
  const blob = new Blob([code], { type: 'application/javascript' });
  const worker = new Worker(URL.createObjectURL(blob));

  return new Promise((resolve) => {
    worker.onmessage = (e) => {
      resolve(e.data);
      worker.terminate();
      URL.revokeObjectURL(blob);
    };
    worker.postMessage(max);
  });
}

findPrimesAsync(10000000).then(primes => {
  document.getElementById('output').textContent = primes.length + ' primes found';
});`,
      hints: [
        'Move the computation into an inline worker.',
        'Wrap worker communication in a Promise.',
        'The main thread stays responsive while the worker computes.',
      ],
      concepts: ['offloading to worker', 'non-blocking UI'],
    },
    {
      id: 'js-workers-20',
      title: 'Refactor callbacks to worker RPC',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this raw postMessage/onmessage pattern to a clean RPC interface.',
      skeleton: `// Current pattern:
const worker = new Worker('api.js');
let requestId = 0;
const callbacks = {};

worker.onmessage = (e) => {
  const { id, result } = e.data;
  if (callbacks[id]) {
    callbacks[id](result);
    delete callbacks[id];
  }
};

function callWorker(method, args, callback) {
  const id = requestId++;
  callbacks[id] = callback;
  worker.postMessage({ id, method, args });
}

// Usage:
callWorker('add', [1, 2], (result) => console.log(result));`,
      solution: `const worker = new Worker('api.js');
let nextId = 0;
const pending = new Map();

worker.onmessage = (e) => {
  const { id, result, error } = e.data;
  const handlers = pending.get(id);
  if (!handlers) return;
  pending.delete(id);
  if (error) handlers.reject(new Error(error));
  else handlers.resolve(result);
};

function callWorker(method, ...args) {
  return new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    worker.postMessage({ id, method, args });
  });
}

// Usage:
const result = await callWorker('add', 1, 2);
console.log(result);`,
      hints: [
        'Replace callbacks with Promises.',
        'Use a Map instead of a plain object for pending requests.',
        'Handle errors by rejecting the Promise.',
      ],
      concepts: ['Promise-based RPC', 'worker refactoring'],
    },
  ],
};
