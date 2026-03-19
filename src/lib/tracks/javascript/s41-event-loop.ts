import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-evloop',
  title: '41. Event Loop',
  explanation: `## Event Loop

JavaScript is single-threaded but non-blocking, powered by the event loop. Understanding task scheduling is essential for writing predictable async code.

\`\`\`javascript
// Macrotasks (task queue): setTimeout, setInterval, I/O, UI rendering
setTimeout(() => console.log('macro'), 0);

// Microtasks (higher priority): Promise callbacks, queueMicrotask, MutationObserver
Promise.resolve().then(() => console.log('micro'));
queueMicrotask(() => console.log('micro2'));

// Execution order: synchronous -> microtasks -> macrotasks
console.log('sync');
// Output: sync, micro, micro2, macro

// requestAnimationFrame -- fires before next paint
requestAnimationFrame(() => console.log('rAF'));

// MessageChannel -- macrotask alternative
const ch = new MessageChannel();
ch.port1.onmessage = () => console.log('message');
ch.port2.postMessage(null);
\`\`\`

The event loop drains ALL microtasks (including newly queued ones) before processing the next macrotask. This means microtasks can starve macrotasks if they keep queuing more microtasks.`,
  exercises: [
    {
      id: 'js-evloop-1',
      title: 'setTimeout Zero',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to schedule a callback with zero delay.',
      skeleton: `__BLANK__(() => {
  console.log('delayed');
}, __BLANK__);
console.log('immediate');`,
      solution: `setTimeout(() => {
  console.log('delayed');
}, 0);
console.log('immediate');`,
      hints: [
        'Which function schedules a callback after a delay?',
        'Even a delay of 0 still defers execution to the next macrotask.',
        'Use setTimeout with 0 as the delay.',
      ],
      concepts: ['setTimeout', 'macrotask'],
    },
    {
      id: 'js-evloop-2',
      title: 'queueMicrotask',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blank to queue a microtask.',
      skeleton: `console.log('A');
__BLANK__(() => console.log('B'));
console.log('C');
// Output: A, C, B`,
      solution: `console.log('A');
queueMicrotask(() => console.log('B'));
console.log('C');
// Output: A, C, B`,
      hints: [
        'Microtasks run after synchronous code but before macrotasks.',
        'There is a global function specifically for queuing microtasks.',
        'Use queueMicrotask(callback).',
      ],
      concepts: ['queueMicrotask', 'microtask'],
    },
    {
      id: 'js-evloop-3',
      title: 'Promise Microtask',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create a resolved promise that logs via a microtask.',
      skeleton: `console.log('start');
__BLANK__.resolve('done').__BLANK__(val => console.log(val));
console.log('end');`,
      solution: `console.log('start');
Promise.resolve('done').then(val => console.log(val));
console.log('end');`,
      hints: [
        'A static method on Promise creates an already-resolved promise.',
        'Chaining .then() on a resolved promise queues a microtask.',
        'Use Promise.resolve().then().',
      ],
      concepts: ['Promise.resolve', 'microtask', 'then'],
    },
    {
      id: 'js-evloop-4',
      title: 'Sync Before Async',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output order.',
      skeleton: `console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');`,
      solution: `console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');`,
      expectedOutput: '1\n3\n2',
      hints: [
        'Synchronous code always runs first.',
        'setTimeout with 0 delay still defers to the macrotask queue.',
        'Output: 1, 3, then 2.',
      ],
      concepts: ['execution order', 'synchronous', 'macrotask'],
    },
    {
      id: 'js-evloop-5',
      title: 'Micro Before Macro',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output when both microtasks and macrotasks are queued.',
      skeleton: `setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));
console.log('sync');`,
      solution: `setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));
console.log('sync');`,
      expectedOutput: 'sync\npromise\ntimeout',
      hints: [
        'Synchronous code runs first, before any queued tasks.',
        'Microtasks (promise callbacks) run before macrotasks (setTimeout).',
        'Output: sync, promise, timeout.',
      ],
      concepts: ['microtask', 'macrotask', 'execution order'],
    },
    {
      id: 'js-evloop-6',
      title: 'setInterval Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create a repeating timer that stops after 3 ticks.',
      skeleton: `let count = 0;
const id = __BLANK__(() => {
  count++;
  console.log(count);
  if (count === 3) __BLANK__(id);
}, 100);`,
      solution: `let count = 0;
const id = setInterval(() => {
  count++;
  console.log(count);
  if (count === 3) clearInterval(id);
}, 100);`,
      hints: [
        'Which function repeats a callback at a fixed interval?',
        'You need a companion function to stop the interval.',
        'Use setInterval and clearInterval.',
      ],
      concepts: ['setInterval', 'clearInterval', 'macrotask'],
    },
    {
      id: 'js-evloop-7',
      title: 'clearTimeout',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to schedule a callback and then cancel it before it fires.',
      skeleton: `const timerId = setTimeout(() => {
  console.log('This should not run');
}, 1000);

__BLANK__(timerId);
console.log('Timer cancelled');`,
      solution: `const timerId = setTimeout(() => {
  console.log('This should not run');
}, 1000);

clearTimeout(timerId);
console.log('Timer cancelled');`,
      hints: [
        'setTimeout returns an ID you can use to cancel it.',
        'There is a companion function that takes the timer ID.',
        'Use clearTimeout(timerId).',
      ],
      concepts: ['clearTimeout', 'setTimeout'],
    },
    {
      id: 'js-evloop-8',
      title: 'Nested Microtask Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output when microtasks queue more microtasks.',
      skeleton: `console.log('A');
Promise.resolve().then(() => {
  console.log('B');
  Promise.resolve().then(() => console.log('C'));
});
Promise.resolve().then(() => console.log('D'));
console.log('E');`,
      solution: `console.log('A');
Promise.resolve().then(() => {
  console.log('B');
  Promise.resolve().then(() => console.log('C'));
});
Promise.resolve().then(() => console.log('D'));
console.log('E');`,
      expectedOutput: 'A\nE\nB\nD\nC',
      hints: [
        'Synchronous code runs first (A, E).',
        'Microtasks are processed in FIFO order; B runs before D.',
        'C is queued during B, so it runs after D. Output: A, E, B, D, C.',
      ],
      concepts: ['microtask queue', 'nested microtasks', 'FIFO'],
    },
    {
      id: 'js-evloop-9',
      title: 'Async/Await Scheduling',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that demonstrates async/await resumes as a microtask. The function should log "before", await a resolved promise, then log "after".',
      skeleton: `// Write an async function called demo
// that logs "before", awaits Promise.resolve(),
// then logs "after".
// When called alongside console.log("sync"),
// order should be: before, sync, after`,
      solution: `async function demo() {
  console.log('before');
  await Promise.resolve();
  console.log('after');
}

demo();
console.log('sync');`,
      hints: [
        'An async function pauses at each await.',
        'Code after await resumes as a microtask.',
        'The synchronous console.log runs while the async function is paused.',
      ],
      concepts: ['async/await', 'microtask', 'scheduling'],
    },
    {
      id: 'js-evloop-10',
      title: 'MessageChannel Task',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function postTask that uses MessageChannel to schedule a macrotask callback.',
      skeleton: `// Write a function postTask(callback) that
// uses MessageChannel to schedule callback
// as a macrotask.
function postTask(callback) {
  // your code here
}`,
      solution: `function postTask(callback) {
  const channel = new MessageChannel();
  channel.port1.onmessage = () => callback();
  channel.port2.postMessage(null);
}`,
      hints: [
        'MessageChannel creates two linked ports for message passing.',
        'Assign a handler to port1.onmessage and post from port2.',
        'The onmessage handler fires as a macrotask.',
      ],
      concepts: ['MessageChannel', 'macrotask', 'scheduling'],
    },
    {
      id: 'js-evloop-11',
      title: 'Debounce with setTimeout',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a debounce function that delays invoking fn until ms milliseconds after the last call.',
      skeleton: `// Write a debounce function
// debounce(fn, ms) returns a new function
// that resets the timer on each call
function debounce(fn, ms) {
  // your code here
}`,
      solution: `function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}`,
      hints: [
        'You need to store the timer ID between calls.',
        'Each call should clear the previous timer and set a new one.',
        'Use clearTimeout and setTimeout together in a closure.',
      ],
      concepts: ['debounce', 'setTimeout', 'clearTimeout', 'closure'],
    },
    {
      id: 'js-evloop-12',
      title: 'Throttle with Timestamps',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a throttle function that only invokes fn at most once per ms milliseconds.',
      skeleton: `// Write a throttle function
// throttle(fn, ms) returns a new function
// that invokes fn at most once per ms interval
function throttle(fn, ms) {
  // your code here
}`,
      solution: `function throttle(fn, ms) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      fn(...args);
    }
  };
}`,
      hints: [
        'Track the timestamp of the last invocation.',
        'Compare current time to last invocation time.',
        'Only call fn if enough time has passed.',
      ],
      concepts: ['throttle', 'Date.now', 'closure'],
    },
    {
      id: 'js-evloop-13',
      title: 'Fix: Microtask Starvation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the code that accidentally starves macrotasks by endlessly queuing microtasks.',
      skeleton: `// BUG: This starves the macrotask queue -- setTimeout never fires
let count = 0;

function flood() {
  count++;
  if (count < 10) {
    queueMicrotask(flood);
  }
  // The timeout below never fires because
  // microtasks keep running
}

setTimeout(() => console.log('timeout fired'), 0);
flood();`,
      solution: `// FIXED: Use setTimeout to yield to the macrotask queue
let count = 0;

function flood() {
  count++;
  if (count < 10) {
    setTimeout(flood, 0);
  }
}

setTimeout(() => console.log('timeout fired'), 0);
flood();`,
      hints: [
        'Microtasks are drained completely before any macrotask runs.',
        'To allow macrotasks to interleave, use setTimeout instead.',
        'Replace queueMicrotask(flood) with setTimeout(flood, 0).',
      ],
      concepts: ['microtask starvation', 'queueMicrotask', 'setTimeout'],
    },
    {
      id: 'js-evloop-14',
      title: 'Fix: Lost Timer Reference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the bug where the interval cannot be cleared because the ID is lost.',
      skeleton: `// BUG: Cannot clear the interval
function startPolling(callback, ms) {
  setInterval(callback, ms);
}

function stopPolling() {
  clearInterval(timerId); // timerId is not defined!
}

startPolling(() => console.log('poll'), 1000);
// later...
stopPolling();`,
      solution: `let timerId;

function startPolling(callback, ms) {
  timerId = setInterval(callback, ms);
}

function stopPolling() {
  clearInterval(timerId);
}

startPolling(() => console.log('poll'), 1000);
// later...
stopPolling();`,
      hints: [
        'setInterval returns an ID needed for clearInterval.',
        'The ID must be stored in a shared scope.',
        'Declare timerId outside both functions so both can access it.',
      ],
      concepts: ['setInterval', 'clearInterval', 'scope'],
    },
    {
      id: 'js-evloop-15',
      title: 'requestAnimationFrame Loop',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write an animation loop using requestAnimationFrame that calls a render function with a delta time.',
      skeleton: `// Write a function startLoop(render) that:
// 1. Calls requestAnimationFrame in a loop
// 2. Passes delta time (ms since last frame) to render
// 3. Returns a function to stop the loop
function startLoop(render) {
  // your code here
}`,
      solution: `function startLoop(render) {
  let lastTime = 0;
  let frameId;
  let running = true;

  function loop(timestamp) {
    if (!running) return;
    const delta = lastTime ? timestamp - lastTime : 0;
    lastTime = timestamp;
    render(delta);
    frameId = requestAnimationFrame(loop);
  }

  frameId = requestAnimationFrame(loop);

  return () => {
    running = false;
    cancelAnimationFrame(frameId);
  };
}`,
      hints: [
        'requestAnimationFrame passes a DOMHighResTimeStamp to the callback.',
        'Track the previous timestamp to calculate delta.',
        'Return a cleanup function that calls cancelAnimationFrame.',
      ],
      concepts: ['requestAnimationFrame', 'cancelAnimationFrame', 'animation loop', 'delta time'],
    },
    {
      id: 'js-evloop-16',
      title: 'Scheduler with Priorities',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a simple task scheduler that runs high-priority tasks as microtasks and low-priority tasks as macrotasks.',
      skeleton: `// Write a function schedule(task, priority)
// priority: 'high' -> queueMicrotask
// priority: 'low' -> setTimeout(..., 0)
function schedule(task, priority) {
  // your code here
}`,
      solution: `function schedule(task, priority) {
  if (priority === 'high') {
    queueMicrotask(task);
  } else {
    setTimeout(task, 0);
  }
}`,
      hints: [
        'Use two different scheduling APIs based on priority.',
        'Microtasks have higher priority than macrotasks.',
        'queueMicrotask for high, setTimeout for low.',
      ],
      concepts: ['queueMicrotask', 'setTimeout', 'scheduling', 'priority'],
    },
    {
      id: 'js-evloop-17',
      title: 'Batch DOM Updates',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor the code to batch DOM-like updates using a microtask instead of updating immediately on each call.',
      skeleton: `// Current: updates immediately on every call (wasteful)
const pendingUpdates = [];

function scheduleUpdate(element, value) {
  element.textContent = value; // immediate DOM write
}

// Simulated calls
const el = { textContent: '' };
scheduleUpdate(el, 'A');
scheduleUpdate(el, 'B');
scheduleUpdate(el, 'C');
// Result: 3 DOM writes, only last matters`,
      solution: `const pendingUpdates = new Map();
let scheduled = false;

function scheduleUpdate(element, value) {
  pendingUpdates.set(element, value);
  if (!scheduled) {
    scheduled = true;
    queueMicrotask(() => {
      for (const [el, val] of pendingUpdates) {
        el.textContent = val;
      }
      pendingUpdates.clear();
      scheduled = false;
    });
  }
}

// Simulated calls
const el = { textContent: '' };
scheduleUpdate(el, 'A');
scheduleUpdate(el, 'B');
scheduleUpdate(el, 'C');
// Result: 1 DOM write with final value 'C'`,
      hints: [
        'Collect updates in a data structure and flush them once.',
        'Use queueMicrotask to defer the flush to after all sync code.',
        'A Map from element to value naturally deduplicates updates.',
      ],
      concepts: ['queueMicrotask', 'batching', 'DOM optimization'],
    },
    {
      id: 'js-evloop-18',
      title: 'Fix: Async Ordering Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fix the race condition where setup runs after the code that depends on it.',
      skeleton: `// BUG: "using config" logs before config is ready
let config = null;

setTimeout(() => {
  config = { debug: true };
  console.log('config ready');
}, 0);

// This runs before config is set
console.log('using config:', config);`,
      solution: `let config = null;

async function init() {
  config = await new Promise(resolve => {
    setTimeout(() => {
      const cfg = { debug: true };
      console.log('config ready');
      resolve(cfg);
    }, 0);
  });
  console.log('using config:', config);
}

init();`,
      hints: [
        'The problem is that synchronous code runs before setTimeout.',
        'Wrap the async operation in a Promise so you can await it.',
        'Move the dependent code inside an async function after the await.',
      ],
      concepts: ['race condition', 'async/await', 'Promise', 'setTimeout'],
    },
    {
      id: 'js-evloop-19',
      title: 'Cooperative Scheduling',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function processChunked that processes a large array in chunks, yielding to the event loop between chunks.',
      skeleton: `// Write processChunked(items, processFn, chunkSize)
// Process chunkSize items, then yield via setTimeout
// Returns a promise that resolves when all items are processed
function processChunked(items, processFn, chunkSize) {
  // your code here
}`,
      solution: `function processChunked(items, processFn, chunkSize) {
  return new Promise((resolve) => {
    let index = 0;

    function processChunk() {
      const end = Math.min(index + chunkSize, items.length);
      for (; index < end; index++) {
        processFn(items[index], index);
      }
      if (index < items.length) {
        setTimeout(processChunk, 0);
      } else {
        resolve();
      }
    }

    processChunk();
  });
}`,
      hints: [
        'Process a slice of items, then schedule the next slice.',
        'Use setTimeout(fn, 0) to yield between chunks.',
        'Wrap everything in a Promise and resolve when the last chunk is done.',
      ],
      concepts: ['cooperative scheduling', 'chunking', 'setTimeout', 'Promise'],
    },
    {
      id: 'js-evloop-20',
      title: 'Refactor: Callback Hell to Async',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor deeply nested timer callbacks into clean async/await code.',
      skeleton: `// Ugly nested callbacks
function runSequence(callback) {
  setTimeout(() => {
    console.log('step 1');
    setTimeout(() => {
      console.log('step 2');
      setTimeout(() => {
        console.log('step 3');
        callback('done');
      }, 100);
    }, 100);
  }, 100);
}

runSequence((result) => console.log(result));`,
      solution: `function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runSequence() {
  await delay(100);
  console.log('step 1');
  await delay(100);
  console.log('step 2');
  await delay(100);
  console.log('step 3');
  return 'done';
}

runSequence().then(result => console.log(result));`,
      hints: [
        'Create a helper that wraps setTimeout in a Promise.',
        'Use async/await to flatten the nested structure.',
        'Return the final value from the async function instead of using a callback.',
      ],
      concepts: ['callback hell', 'async/await', 'Promise', 'refactoring'],
    },
  ],
};
