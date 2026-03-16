import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-weakref',
  title: '27. WeakRef & Finalization',
  explanation: `## WeakRef & Finalization

WeakRef and FinalizationRegistry let you observe object lifetimes without preventing garbage collection.

\`\`\`javascript
// WeakRef -- a weak reference to an object
let target = { data: 'important' };
const ref = new WeakRef(target);

ref.deref();      // { data: 'important' } -- or undefined if GC'd
target = null;    // now eligible for garbage collection

// FinalizationRegistry -- cleanup callback after GC
const registry = new FinalizationRegistry((heldValue) => {
  console.log(\`Cleaned up: \${heldValue}\`);
});

let obj = { heavy: new ArrayBuffer(1e6) };
registry.register(obj, 'my-resource');
obj = null; // callback fires eventually after GC
\`\`\`

**Warning**: GC timing is non-deterministic. Never rely on WeakRef/FinalizationRegistry for correctness -- only for optimization (caches, resource hints).`,
  exercises: [
    {
      id: 'js-weakref-1',
      title: 'Create a WeakRef',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create a WeakRef and dereference it.',
      skeleton: `let obj = { value: 42 };
const ref = new __BLANK__(obj);
console.log(ref.__BLANK__()); // { value: 42 }`,
      solution: `let obj = { value: 42 };
const ref = new WeakRef(obj);
console.log(ref.deref()); // { value: 42 }`,
      hints: [
        'WeakRef is the constructor for weak references.',
        '.deref() returns the target or undefined if garbage collected.',
        'new WeakRef(obj) and ref.deref().',
      ],
      concepts: ['WeakRef constructor', 'deref'],
    },
    {
      id: 'js-weakref-2',
      title: 'FinalizationRegistry basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create a FinalizationRegistry and register an object.',
      skeleton: `const registry = new __BLANK__((heldValue) => {
  console.log(\`Finalized: \${heldValue}\`);
});

let resource = { data: 'temp' };
registry.__BLANK__(resource, 'my-resource');`,
      solution: `const registry = new FinalizationRegistry((heldValue) => {
  console.log(\`Finalized: \${heldValue}\`);
});

let resource = { data: 'temp' };
registry.register(resource, 'my-resource');`,
      hints: [
        'FinalizationRegistry takes a cleanup callback.',
        'Use .register(target, heldValue) to watch an object.',
        'The heldValue is passed to the callback after GC.',
      ],
      concepts: ['FinalizationRegistry', 'register'],
    },
    {
      id: 'js-weakref-3',
      title: 'Conditional deref access',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to safely access a WeakRef target.',
      skeleton: `const ref = new WeakRef({ name: 'Alice' });

const target = ref.__BLANK__();
if (target __BLANK__ undefined) {
  console.log(target.name);
} else {
  console.log('Object was garbage collected');
}`,
      solution: `const ref = new WeakRef({ name: 'Alice' });

const target = ref.deref();
if (target !== undefined) {
  console.log(target.name);
} else {
  console.log('Object was garbage collected');
}`,
      hints: [
        'deref() returns the object or undefined.',
        'Always check the result before using it.',
        'Compare with !== undefined.',
      ],
      concepts: ['WeakRef safety', 'conditional access'],
    },
    {
      id: 'js-weakref-4',
      title: 'WeakRef vs WeakMap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to show the difference between WeakRef and WeakMap.',
      skeleton: `// WeakRef: holds a weak reference TO a single object
const ref = new __BLANK__({ id: 1 });

// WeakMap: maps objects to values, keys are weakly held
const wm = new __BLANK__();
const key = { id: 2 };
wm.__BLANK__(key, 'data');`,
      solution: `// WeakRef: holds a weak reference TO a single object
const ref = new WeakRef({ id: 1 });

// WeakMap: maps objects to values, keys are weakly held
const wm = new WeakMap();
const key = { id: 2 };
wm.set(key, 'data');`,
      hints: [
        'WeakRef wraps a single object reference.',
        'WeakMap stores key-value pairs with weak object keys.',
        'Both allow garbage collection of unreferenced objects.',
      ],
      concepts: ['WeakRef', 'WeakMap', 'comparison'],
    },
    {
      id: 'js-weakref-5',
      title: 'Unregister from FinalizationRegistry',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to unregister an object from a FinalizationRegistry.',
      skeleton: `const registry = new FinalizationRegistry((id) => {
  console.log(\`Cleaned up \${id}\`);
});

const obj = { data: 'test' };
const token = {};
registry.register(obj, 'resource-1', __BLANK__);

// Later, if we clean up manually:
registry.__BLANK__(token);`,
      solution: `const registry = new FinalizationRegistry((id) => {
  console.log(\`Cleaned up \${id}\`);
});

const obj = { data: 'test' };
const token = {};
registry.register(obj, 'resource-1', token);

// Later, if we clean up manually:
registry.unregister(token);`,
      hints: [
        'The third argument to .register() is an unregister token.',
        'Use .unregister(token) to cancel the finalization callback.',
        'The token must be the same object reference passed to register.',
      ],
      concepts: ['FinalizationRegistry.unregister', 'cleanup token'],
    },
    {
      id: 'js-weakref-6',
      title: 'Predict WeakRef deref behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output of this synchronous WeakRef usage.',
      skeleton: `let obj = { x: 10, y: 20 };
const ref = new WeakRef(obj);

console.log(ref.deref()?.x);
console.log(ref.deref() === obj);

obj = null;
// Note: GC has NOT run yet in this synchronous code
console.log(ref.deref()?.x);`,
      solution: `// Output:
// 10
// true
// 10
// Even after setting obj = null, the object is not immediately GC'd.
// GC is non-deterministic. In synchronous code the ref still resolves.
// The object remains reachable through the WeakRef until GC actually runs.`,
      hints: [
        'Setting obj = null removes the strong reference, but GC is asynchronous.',
        'In synchronous code, deref() still returns the object.',
        'The WeakRef itself keeps the object discoverable (but not strongly held).',
      ],
      concepts: ['GC timing', 'WeakRef lifecycle'],
    },
    {
      id: 'js-weakref-7',
      title: 'Cache with WeakRef',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a makeWeakCache function that caches computed results using WeakRef. If the cached value is GCd, recompute it.',
      skeleton: `// makeWeakCache(computeFn) returns a function that:
// - On first call, runs computeFn(), caches result as WeakRef, returns it
// - On subsequent calls, returns cached result if still alive, otherwise recomputes
// Note: computeFn must return an object (WeakRef requires objects)
`,
      solution: `function makeWeakCache(computeFn) {
  let ref = null;
  return function () {
    if (ref) {
      const cached = ref.deref();
      if (cached !== undefined) {
        return cached;
      }
    }
    const result = computeFn();
    ref = new WeakRef(result);
    return result;
  };
}`,
      hints: [
        'Store a WeakRef to the computed result.',
        'On each call, try deref(). If undefined, recompute.',
        'let ref = null; if (ref) { const cached = ref.deref(); if (cached) return cached; }',
      ],
      concepts: ['WeakRef cache', 'lazy computation'],
    },
    {
      id: 'js-weakref-8',
      title: 'FinalizationRegistry cleanup',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a ResourceTracker class that uses FinalizationRegistry to log when tracked objects are collected.',
      skeleton: `// class ResourceTracker
// constructor() -- sets up a FinalizationRegistry
// track(obj, label) -- registers obj with the given label
// The registry should log: "Resource collected: <label>"
`,
      solution: `class ResourceTracker {
  constructor() {
    this.registry = new FinalizationRegistry((label) => {
      console.log(\`Resource collected: \${label}\`);
    });
  }

  track(obj, label) {
    this.registry.register(obj, label);
  }
}`,
      hints: [
        'Create a FinalizationRegistry in the constructor.',
        'The callback receives the held value (the label).',
        'In track(), call this.registry.register(obj, label).',
      ],
      concepts: ['FinalizationRegistry', 'resource tracking'],
    },
    {
      id: 'js-weakref-9',
      title: 'WeakRef observer pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a WeakObserverList that stores observers as WeakRefs, automatically skipping collected ones when notifying.',
      skeleton: `// class WeakObserverList
// add(observer) -- adds a WeakRef to the observer
// notify(data) -- calls observer.update(data) for each still-alive observer
// compact() -- removes dead WeakRefs from the list
`,
      solution: `class WeakObserverList {
  constructor() {
    this.observers = [];
  }

  add(observer) {
    this.observers.push(new WeakRef(observer));
  }

  notify(data) {
    this.compact();
    for (const ref of this.observers) {
      const observer = ref.deref();
      if (observer) {
        observer.update(data);
      }
    }
  }

  compact() {
    this.observers = this.observers.filter(ref => ref.deref() !== undefined);
  }
}`,
      hints: [
        'Store new WeakRef(observer) in an array.',
        'In notify(), deref each ref and call update() if alive.',
        'In compact(), filter out refs where deref() returns undefined.',
      ],
      concepts: ['WeakRef observer', 'memory-safe patterns'],
    },
    {
      id: 'js-weakref-10',
      title: 'Weak event handler registry',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a WeakHandlerMap that maps event names to WeakRef-wrapped handler objects, preventing memory leaks.',
      skeleton: `// class WeakHandlerMap
// on(event, handlerObj) -- register handlerObj (has .handle(data) method) for event
// emit(event, data) -- call .handle(data) on all live handlers for that event
`,
      solution: `class WeakHandlerMap {
  constructor() {
    this.handlers = new Map();
  }

  on(event, handlerObj) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this.handlers.get(event).push(new WeakRef(handlerObj));
  }

  emit(event, data) {
    const refs = this.handlers.get(event);
    if (!refs) return;
    const alive = [];
    for (const ref of refs) {
      const handler = ref.deref();
      if (handler) {
        handler.handle(data);
        alive.push(ref);
      }
    }
    this.handlers.set(event, alive);
  }
}`,
      hints: [
        'Store WeakRefs to handler objects, grouped by event name in a Map.',
        'On emit, iterate refs, deref each, call handle() if alive.',
        'Filter out dead refs during emit to keep the list clean.',
      ],
      concepts: ['WeakRef', 'event system', 'memory leak prevention'],
    },
    {
      id: 'js-weakref-11',
      title: 'Predict FinalizationRegistry behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict what this synchronous code outputs about FinalizationRegistry.',
      skeleton: `const log = [];
const registry = new FinalizationRegistry((value) => {
  log.push(value);
});

let a = { id: 1 };
let b = { id: 2 };
registry.register(a, 'first');
registry.register(b, 'second');

a = null;
b = null;

console.log(log.length);
console.log('Done');`,
      solution: `// Output:
// 0
// 'Done'
// The finalization callbacks have NOT fired yet.
// FinalizationRegistry callbacks run asynchronously after GC,
// which has not occurred during this synchronous code.
// log is still empty at the time of console.log.`,
      hints: [
        'FinalizationRegistry callbacks are asynchronous.',
        'GC does not run during synchronous execution.',
        'The log array is empty when we check it.',
      ],
      concepts: ['FinalizationRegistry timing', 'async GC'],
    },
    {
      id: 'js-weakref-12',
      title: 'Symbol.dispose basics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the blanks to implement the disposable protocol with Symbol.dispose.',
      skeleton: `class FileHandle {
  constructor(name) {
    this.name = name;
    this.open = true;
  }

  [Symbol.__BLANK__]() {
    this.open = false;
    console.log(\`\${this.name} closed\`);
  }
}

// Manual usage (using declaration is a proposal)
const handle = new FileHandle('log.txt');
// ... use handle ...
handle[Symbol.__BLANK__]();`,
      solution: `class FileHandle {
  constructor(name) {
    this.name = name;
    this.open = true;
  }

  [Symbol.dispose]() {
    this.open = false;
    console.log(\`\${this.name} closed\`);
  }
}

// Manual usage (using declaration is a proposal)
const handle = new FileHandle('log.txt');
// ... use handle ...
handle[Symbol.dispose]();`,
      hints: [
        'Symbol.dispose is the key for synchronous disposal.',
        'Implement it as a computed method: [Symbol.dispose]() { ... }',
        'This is part of the Explicit Resource Management proposal.',
      ],
      concepts: ['Symbol.dispose', 'disposable protocol'],
    },
    {
      id: 'js-weakref-13',
      title: 'Fix the WeakRef cache bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This cache function never recomputes when the weak reference is lost. Fix it.',
      skeleton: `function createCache(factory) {
  let cached = new WeakRef(factory());

  return function get() {
    return cached.deref();
  };
}

// Problem: if deref() returns undefined, we just return undefined forever.`,
      solution: `function createCache(factory) {
  let cached = new WeakRef(factory());

  return function get() {
    let value = cached.deref();
    if (value === undefined) {
      value = factory();
      cached = new WeakRef(value);
    }
    return value;
  };
}`,
      hints: [
        'Check if deref() returns undefined.',
        'If so, call factory() again and create a new WeakRef.',
        'Reassign the cached variable to the new WeakRef.',
      ],
      concepts: ['WeakRef cache', 'recomputation', 'bug fix'],
    },
    {
      id: 'js-weakref-14',
      title: 'Fix the FinalizationRegistry leak',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This code leaks because it never unregisters objects that are manually cleaned up. Fix it.',
      skeleton: `const registry = new FinalizationRegistry((id) => {
  console.log(\`Auto-cleanup: \${id}\`);
  releaseResource(id);
});

const resources = new Map();

function acquire(id) {
  const resource = { id, data: new ArrayBuffer(1024) };
  registry.register(resource, id);
  resources.set(id, resource);
  return resource;
}

function release(id) {
  const resource = resources.get(id);
  if (resource) {
    releaseResource(id);
    resources.delete(id);
  }
  // Bug: FinalizationRegistry will still fire for this object
}

function releaseResource(id) {
  console.log(\`Released: \${id}\`);
}`,
      solution: `const registry = new FinalizationRegistry((id) => {
  console.log(\`Auto-cleanup: \${id}\`);
  releaseResource(id);
});

const resources = new Map();
const tokens = new Map();

function acquire(id) {
  const resource = { id, data: new ArrayBuffer(1024) };
  const token = { id };
  registry.register(resource, id, token);
  resources.set(id, resource);
  tokens.set(id, token);
  return resource;
}

function release(id) {
  const resource = resources.get(id);
  if (resource) {
    releaseResource(id);
    resources.delete(id);
    const token = tokens.get(id);
    if (token) {
      registry.unregister(token);
      tokens.delete(id);
    }
  }
}

function releaseResource(id) {
  console.log(\`Released: \${id}\`);
}`,
      hints: [
        'Pass an unregister token as the third argument to register().',
        'When manually releasing, call registry.unregister(token).',
        'This prevents double-cleanup (manual + finalization).',
      ],
      concepts: ['FinalizationRegistry.unregister', 'double cleanup prevention'],
    },
    {
      id: 'js-weakref-15',
      title: 'Fix Symbol.asyncDispose',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This async disposable class uses the wrong symbol. Fix it.',
      skeleton: `class Connection {
  constructor(url) {
    this.url = url;
    this.connected = true;
  }

  async [Symbol.dispose]() {
    await new Promise(resolve => setTimeout(resolve, 100));
    this.connected = false;
    console.log(\`Disconnected from \${this.url}\`);
  }
}`,
      solution: `class Connection {
  constructor(url) {
    this.url = url;
    this.connected = true;
  }

  async [Symbol.asyncDispose]() {
    await new Promise(resolve => setTimeout(resolve, 100));
    this.connected = false;
    console.log(\`Disconnected from \${this.url}\`);
  }
}`,
      hints: [
        'Async disposal uses Symbol.asyncDispose, not Symbol.dispose.',
        'Symbol.dispose is for synchronous cleanup.',
        'Symbol.asyncDispose allows await inside the disposal method.',
      ],
      concepts: ['Symbol.asyncDispose', 'async disposal'],
    },
    {
      id: 'js-weakref-16',
      title: 'Predict WeakRef in closure',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict what happens with WeakRef inside a closure.',
      skeleton: `function createTracker() {
  const data = { count: 0 };
  const ref = new WeakRef(data);

  return {
    increment() {
      const obj = ref.deref();
      if (obj) obj.count++;
    },
    getCount() {
      const obj = ref.deref();
      return obj ? obj.count : -1;
    },
    getData() {
      return data;
    },
  };
}

const tracker = createTracker();
tracker.increment();
tracker.increment();
console.log(tracker.getCount());
console.log(tracker.getData().count);`,
      solution: `// Output:
// 2
// 2
// The 'data' variable in the closure is a strong reference.
// Since the closure (via getData) still holds a strong ref to data,
// the object can never be garbage collected while tracker exists.
// Both deref() and direct access return the same object.`,
      hints: [
        'The closure variable "data" is a strong reference.',
        'The WeakRef and the closure variable point to the same object.',
        'The object cannot be GCd while the closure holds a strong reference.',
      ],
      concepts: ['WeakRef with closures', 'strong vs weak references'],
    },
    {
      id: 'js-weakref-17',
      title: 'Disposable resource wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a Disposable class that wraps any cleanup function and implements Symbol.dispose.',
      skeleton: `// class Disposable
// constructor(cleanupFn) -- stores the cleanup function
// [Symbol.dispose]() -- calls cleanup once, subsequent calls are no-ops
// disposed (getter) -- returns whether dispose has been called
`,
      solution: `class Disposable {
  #cleanupFn;
  #disposed = false;

  constructor(cleanupFn) {
    this.#cleanupFn = cleanupFn;
  }

  get disposed() {
    return this.#disposed;
  }

  [Symbol.dispose]() {
    if (!this.#disposed) {
      this.#disposed = true;
      this.#cleanupFn();
    }
  }
}`,
      hints: [
        'Store a boolean flag to track if dispose was already called.',
        'In Symbol.dispose, check the flag before calling cleanup.',
        'Use private fields (#) to prevent external mutation.',
      ],
      concepts: ['Symbol.dispose', 'idempotent disposal', 'private fields'],
    },
    {
      id: 'js-weakref-18',
      title: 'WeakRef LRU eviction helper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that creates a cache where evicted entries become WeakRefs instead of being deleted, allowing GC-friendly soft eviction.',
      skeleton: `// class SoftCache
// set(key, value) -- stores the value (value must be an object)
// get(key) -- returns the value if still available (strong or weak)
// evict(key) -- downgrades strong ref to WeakRef (soft eviction)
`,
      solution: `class SoftCache {
  constructor() {
    this.strong = new Map();
    this.weak = new Map();
  }

  set(key, value) {
    this.weak.delete(key);
    this.strong.set(key, value);
  }

  get(key) {
    if (this.strong.has(key)) {
      return this.strong.get(key);
    }
    const ref = this.weak.get(key);
    if (ref) {
      const value = ref.deref();
      if (value === undefined) {
        this.weak.delete(key);
      }
      return value;
    }
    return undefined;
  }

  evict(key) {
    const value = this.strong.get(key);
    if (value !== undefined) {
      this.strong.delete(key);
      this.weak.set(key, new WeakRef(value));
    }
  }
}`,
      hints: [
        'Use two maps: one for strong references, one for WeakRefs.',
        'Evicting moves the entry from strong to weak (as a WeakRef).',
        'On get, check strong first, then try deref on weak.',
      ],
      concepts: ['WeakRef cache', 'soft eviction', 'LRU pattern'],
    },
    {
      id: 'js-weakref-19',
      title: 'Refactor manual cleanup to disposable',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this manual cleanup pattern to use Symbol.dispose.',
      skeleton: `class Timer {
  constructor(ms, callback) {
    this.id = setInterval(callback, ms);
    this.stopped = false;
  }

  stop() {
    if (!this.stopped) {
      clearInterval(this.id);
      this.stopped = true;
    }
  }
}

// Usage:
const timer = new Timer(1000, () => console.log('tick'));
// ... later ...
timer.stop();`,
      solution: `class Timer {
  #id;
  #disposed = false;

  constructor(ms, callback) {
    this.#id = setInterval(callback, ms);
  }

  get disposed() {
    return this.#disposed;
  }

  [Symbol.dispose]() {
    if (!this.#disposed) {
      clearInterval(this.#id);
      this.#disposed = true;
    }
  }
}

// Usage:
const timer = new Timer(1000, () => console.log('tick'));
// ... later ...
timer[Symbol.dispose]();`,
      hints: [
        'Replace stop() with [Symbol.dispose]().',
        'Use private fields for id and disposed state.',
        'This makes Timer compatible with the using declaration proposal.',
      ],
      concepts: ['Symbol.dispose', 'refactoring', 'resource management'],
    },
    {
      id: 'js-weakref-20',
      title: 'Refactor global registry to FinalizationRegistry',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this manual tracking pattern to use FinalizationRegistry for automatic cleanup.',
      skeleton: `const activeConnections = new Set();

function createConnection(url) {
  const conn = { url, active: true };
  activeConnections.add(conn);
  return conn;
}

function closeConnection(conn) {
  conn.active = false;
  activeConnections.delete(conn);
  console.log(\`Closed: \${conn.url}\`);
}

// Problem: if user forgets to call closeConnection, it leaks forever`,
      solution: `const activeConnections = new Set();
const registry = new FinalizationRegistry((url) => {
  console.log(\`Auto-closed: \${url}\`);
  activeConnections.forEach(conn => {
    if (conn.url === url) activeConnections.delete(conn);
  });
});

function createConnection(url) {
  const conn = { url, active: true };
  activeConnections.add(conn);
  registry.register(conn, url);
  return conn;
}

function closeConnection(conn) {
  conn.active = false;
  activeConnections.delete(conn);
  console.log(\`Closed: \${conn.url}\`);
}

// Now if user forgets closeConnection, FinalizationRegistry
// will eventually clean up after GC collects the connection.`,
      hints: [
        'Create a FinalizationRegistry that cleans up the activeConnections set.',
        'Register each new connection with its URL as the held value.',
        'The callback fires after GC if the user forgot to close manually.',
      ],
      concepts: ['FinalizationRegistry', 'automatic cleanup', 'refactoring'],
    },
  ],
};
