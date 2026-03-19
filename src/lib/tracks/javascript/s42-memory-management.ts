import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-memory',
  title: '42. Memory Management',
  explanation: `## Memory Management

JavaScript uses automatic garbage collection, but understanding memory behavior is critical for writing performant applications.

\`\`\`javascript
// Reachability -- the GC only frees objects that are unreachable
let obj = { data: 'hello' };
obj = null; // original object is now unreachable -> eligible for GC

// Mark-and-sweep: the GC starts from roots (global, stack, closures),
// marks everything reachable, then sweeps (frees) the rest.

// Common memory leak sources:
// 1. Forgotten closures capturing large scopes
// 2. Event listeners never removed
// 3. setInterval never cleared
// 4. Detached DOM nodes held by JS references

// WeakRef -- holds a reference that does NOT prevent GC
const weak = new WeakRef(someObject);
weak.deref(); // returns the object or undefined if GC'd

// FinalizationRegistry -- callback when an object is GC'd
const registry = new FinalizationRegistry((value) => {
  console.log('Cleaned up:', value);
});
registry.register(someObject, 'my-resource');
\`\`\`

Memory-efficient patterns include reusing buffers, using typed arrays for numeric data, and favoring \`Map\`/\`Set\` over plain objects for dynamic key collections.`,
  exercises: [
    {
      id: 'js-memory-1',
      title: 'Reachability Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to make the object eligible for garbage collection.',
      skeleton: `let user = { name: 'Alice', age: 30 };
let backup = user;

// Make the original object eligible for GC
user = __BLANK__;
backup = __BLANK__;
// Now no references remain to { name: 'Alice', age: 30 }`,
      solution: `let user = { name: 'Alice', age: 30 };
let backup = user;

// Make the original object eligible for GC
user = null;
backup = null;
// Now no references remain to { name: 'Alice', age: 30 }`,
      hints: [
        'An object is eligible for GC when no references point to it.',
        'Setting a variable to null removes its reference to the object.',
        'Both user AND backup must be nulled since both reference the same object.',
      ],
      concepts: ['garbage collection', 'reachability', 'null reference'],
    },
    {
      id: 'js-memory-2',
      title: 'Mark-and-Sweep Prediction',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict which objects are reachable after the code runs.',
      skeleton: `let a = { id: 1 };
let b = { id: 2 };
let c = { id: 3 };

a.ref = b;
b.ref = c;
c.ref = a; // circular reference

b = null;
c = null;

// Which objects are still reachable from the root?
// Write your answer as a comment: which id values survive?`,
      solution: `let a = { id: 1 };
let b = { id: 2 };
let c = { id: 3 };

a.ref = b;
b.ref = c;
c.ref = a; // circular reference

b = null;
c = null;

// All three objects survive! 'a' is directly reachable.
// a.ref reaches {id:2}, a.ref.ref reaches {id:3}, a.ref.ref.ref circles back to a.
// Answer: 1, 2, 3 -- all survive because they're reachable through the chain from 'a'.`,
      hints: [
        'Mark-and-sweep starts from roots -- variable a is still a root.',
        'From a, follow a.ref to find {id:2}, then {id:2}.ref to find {id:3}.',
        'Even though b and c variables are null, the objects are reachable through the chain from a.',
      ],
      concepts: ['mark-and-sweep', 'reachability', 'circular references', 'garbage collection'],
    },
    {
      id: 'js-memory-3',
      title: 'Closure Memory Leak',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fix the closure that inadvertently retains a huge array, causing a memory leak.',
      skeleton: `// BUG: Each call to createHandler leaks the entire bigData array
function createHandler() {
  const bigData = new Array(1_000_000).fill('x');
  const summary = bigData.length;

  return function handler() {
    console.log('Data size:', summary);
    console.log('First item:', bigData[0]);
  };
}

const handle = createHandler();
// bigData is retained forever because handler closes over it`,
      solution: `// FIX: Only close over what the handler actually needs
function createHandler() {
  const bigData = new Array(1_000_000).fill('x');
  const summary = bigData.length;
  const firstItem = bigData[0];
  // bigData is no longer referenced in the returned closure

  return function handler() {
    console.log('Data size:', summary);
    console.log('First item:', firstItem);
  };
}

const handle = createHandler();
// bigData can now be garbage collected`,
      hints: [
        'The handler references bigData[0] directly, keeping the entire array alive.',
        'Extract the needed values before the closure captures them.',
        'Store bigData[0] in a separate variable like firstItem, then use that in the handler.',
      ],
      concepts: ['closures', 'memory leak', 'scope capture', 'garbage collection'],
    },
    {
      id: 'js-memory-4',
      title: 'Event Listener Leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the component that leaks event listeners by never cleaning them up.',
      skeleton: `// BUG: Every time initWidget is called, a new listener is added
// but never removed, leaking memory
function initWidget(element) {
  const data = fetchExpensiveData();

  window.addEventListener('resize', () => {
    element.style.width = calculateWidth(data);
  });

  element.addEventListener('click', () => {
    console.log('clicked', data.id);
  });

  return { element, data };
}

// Called multiple times during SPA navigation
let widget = initWidget(document.getElementById('widget'));`,
      solution: `// FIX: Store references to listeners and return a cleanup function
function initWidget(element) {
  const data = fetchExpensiveData();

  const onResize = () => {
    element.style.width = calculateWidth(data);
  };
  const onClick = () => {
    console.log('clicked', data.id);
  };

  window.addEventListener('resize', onResize);
  element.addEventListener('click', onClick);

  return {
    element,
    data,
    destroy() {
      window.removeEventListener('resize', onResize);
      element.removeEventListener('click', onClick);
    },
  };
}

// Called multiple times during SPA navigation
let widget = initWidget(document.getElementById('widget'));
// Before re-init: widget.destroy();`,
      hints: [
        'Anonymous arrow functions cannot be removed because you have no reference to them.',
        'Store each listener in a named variable so you can pass the same reference to removeEventListener.',
        'Return a destroy() method that calls removeEventListener for each listener.',
      ],
      concepts: ['event listeners', 'memory leak', 'cleanup', 'removeEventListener'],
    },
    {
      id: 'js-memory-5',
      title: 'Timer Leak',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a createPoller function that starts a setInterval but returns a stop function. The poller should call the callback every intervalMs and properly clean up when stopped.',
      skeleton: `function createPoller(callback, intervalMs) {
  // Start polling with setInterval
  // Return an object with a stop() method that clears the interval
  // and sets a flag so the callback is never invoked after stop



}

// Usage:
// const poller = createPoller(() => console.log('tick'), 1000);
// poller.stop(); // clears the interval`,
      solution: `function createPoller(callback, intervalMs) {
  let stopped = false;
  const id = setInterval(() => {
    if (!stopped) {
      callback();
    }
  }, intervalMs);

  return {
    stop() {
      stopped = true;
      clearInterval(id);
    },
  };
}

// Usage:
// const poller = createPoller(() => console.log('tick'), 1000);
// poller.stop(); // clears the interval`,
      hints: [
        'Use setInterval to start the polling and store the returned ID.',
        'The stop method should call clearInterval with the stored ID.',
        'Add a stopped flag to guard against callbacks firing during the clearInterval call.',
      ],
      concepts: ['setInterval', 'clearInterval', 'memory leak', 'cleanup pattern'],
    },
    {
      id: 'js-memory-6',
      title: 'Detached DOM Nodes',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict whether the DOM node can be garbage collected in each scenario.',
      skeleton: `// Scenario 1
const el1 = document.createElement('div');
document.body.appendChild(el1);
document.body.removeChild(el1);
// Can el1 be GC'd? Why or why not?

// Scenario 2
const el2 = document.createElement('div');
document.body.appendChild(el2);
document.body.removeChild(el2);
const saved = el2;
// Can the DOM node be GC'd? Why or why not?

// Scenario 3
let el3 = document.createElement('div');
document.body.appendChild(el3);
document.body.removeChild(el3);
el3 = null;
// Can the DOM node be GC'd? Why or why not?`,
      solution: `// Scenario 1
const el1 = document.createElement('div');
document.body.appendChild(el1);
document.body.removeChild(el1);
// NO -- el1 still holds a reference to the detached DOM node

// Scenario 2
const el2 = document.createElement('div');
document.body.appendChild(el2);
document.body.removeChild(el2);
const saved = el2;
// NO -- both el2 and saved hold references to the detached node

// Scenario 3
let el3 = document.createElement('div');
document.body.appendChild(el3);
document.body.removeChild(el3);
el3 = null;
// YES -- no JS references remain, the detached node can be GC'd`,
      hints: [
        'A DOM node removed from the tree is "detached" but not GC-eligible if JS still references it.',
        'Even after removeChild, the variable still points to the node in memory.',
        'Setting the variable to null removes the last reference, making it eligible for GC.',
      ],
      concepts: ['detached DOM nodes', 'memory leak', 'garbage collection', 'DOM references'],
    },
    {
      id: 'js-memory-7',
      title: 'WeakRef Basics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the blanks to create a WeakRef and safely dereference it.',
      skeleton: `let target = { name: 'resource', data: [1, 2, 3] };
const weak = new __BLANK__(target);

// Later, safely access the object
const obj = weak.__BLANK__();
if (obj __BLANK__ undefined) {
  console.log('Still alive:', obj.name);
} else {
  console.log('Object was garbage collected');
}`,
      solution: `let target = { name: 'resource', data: [1, 2, 3] };
const weak = new WeakRef(target);

// Later, safely access the object
const obj = weak.deref();
if (obj !== undefined) {
  console.log('Still alive:', obj.name);
} else {
  console.log('Object was garbage collected');
}`,
      hints: [
        'The constructor for a weak reference is WeakRef.',
        'The method to get the underlying object (or undefined) is deref().',
        'Check against undefined with !== to see if the object is still alive.',
      ],
      concepts: ['WeakRef', 'deref', 'garbage collection', 'weak references'],
    },
    {
      id: 'js-memory-8',
      title: 'WeakRef Cache',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a WeakRefCache class that stores values as WeakRefs. It should have get(key) that returns the value or undefined if GC collected it, set(key, value), and has(key) methods.',
      skeleton: `class WeakRefCache {
  #cache = new Map();

  set(key, value) {
    // Store value as a WeakRef


  }

  get(key) {
    // Return the dereferenced value, or undefined
    // Clean up the entry if the value was GC'd


  }

  has(key) {
    // Return true only if key exists AND value is still alive


  }
}

// Usage:
// const cache = new WeakRefCache();
// let obj = { id: 1 };
// cache.set('item', obj);
// cache.get('item'); // { id: 1 }`,
      solution: `class WeakRefCache {
  #cache = new Map();

  set(key, value) {
    this.#cache.set(key, new WeakRef(value));
  }

  get(key) {
    const ref = this.#cache.get(key);
    if (!ref) return undefined;
    const value = ref.deref();
    if (value === undefined) {
      this.#cache.delete(key);
    }
    return value;
  }

  has(key) {
    const ref = this.#cache.get(key);
    if (!ref) return false;
    const alive = ref.deref() !== undefined;
    if (!alive) {
      this.#cache.delete(key);
    }
    return alive;
  }
}

// Usage:
// const cache = new WeakRefCache();
// let obj = { id: 1 };
// cache.set('item', obj);
// cache.get('item'); // { id: 1 }`,
      hints: [
        'In set(), wrap the value in new WeakRef(value) before storing in the Map.',
        'In get(), retrieve the WeakRef, call deref(), and delete the entry if deref() returns undefined.',
        'In has(), do the same check: get the ref, deref it, and clean up if dead.',
      ],
      concepts: ['WeakRef', 'cache', 'garbage collection', 'Map', 'private fields'],
    },
    {
      id: 'js-memory-9',
      title: 'FinalizationRegistry',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a ResourceTracker class that uses FinalizationRegistry to log when tracked objects are garbage collected. It should have track(name, obj) and getTracked() methods.',
      skeleton: `class ResourceTracker {
  #tracked = new Set();
  #registry;

  constructor() {
    // Create a FinalizationRegistry that removes the name
    // from #tracked and logs a message when an object is GC'd


  }

  track(name, obj) {
    // Add name to #tracked set
    // Register obj with the registry using name as the held value


  }

  getTracked() {
    // Return an array of currently tracked names

  }
}

// Usage:
// const tracker = new ResourceTracker();
// let res = { type: 'connection' };
// tracker.track('db-conn', res);
// tracker.getTracked(); // ['db-conn']
// res = null; // Eventually: "Resource GC'd: db-conn"`,
      solution: `class ResourceTracker {
  #tracked = new Set();
  #registry;

  constructor() {
    this.#registry = new FinalizationRegistry((name) => {
      this.#tracked.delete(name);
      console.log(\`Resource GC'd: \${name}\`);
    });
  }

  track(name, obj) {
    this.#tracked.add(name);
    this.#registry.register(obj, name);
  }

  getTracked() {
    return [...this.#tracked];
  }
}

// Usage:
// const tracker = new ResourceTracker();
// let res = { type: 'connection' };
// tracker.track('db-conn', res);
// tracker.getTracked(); // ['db-conn']
// res = null; // Eventually: "Resource GC'd: db-conn"`,
      hints: [
        'FinalizationRegistry takes a callback that receives the "held value" when an object is collected.',
        'Use this.#registry.register(obj, name) to track the object with name as the held value.',
        'In the callback, delete the name from #tracked and log it.',
      ],
      concepts: ['FinalizationRegistry', 'garbage collection', 'resource tracking', 'private fields'],
    },
    {
      id: 'js-memory-10',
      title: 'ArrayBuffer Memory',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the blanks to allocate and work with typed arrays for memory-efficient numeric storage.',
      skeleton: `// Allocate 1KB of raw memory
const buffer = new __BLANK__(1024);

// View it as 32-bit floats (256 floats = 1024 bytes)
const floats = new __BLANK__(buffer);

// Fill with values
for (let i = 0; i < floats.__BLANK__; i++) {
  floats[i] = Math.random();
}

// Check byte size
console.log(buffer.__BLANK__); // 1024`,
      solution: `// Allocate 1KB of raw memory
const buffer = new ArrayBuffer(1024);

// View it as 32-bit floats (256 floats = 1024 bytes)
const floats = new Float32Array(buffer);

// Fill with values
for (let i = 0; i < floats.length; i++) {
  floats[i] = Math.random();
}

// Check byte size
console.log(buffer.byteLength); // 1024`,
      hints: [
        'ArrayBuffer allocates a fixed-size chunk of raw binary memory.',
        'Float32Array is a typed array view that interprets bytes as 32-bit IEEE floats.',
        'Use .length for the number of elements and .byteLength for the byte size.',
      ],
      concepts: ['ArrayBuffer', 'Float32Array', 'typed arrays', 'binary data'],
    },
    {
      id: 'js-memory-11',
      title: 'Circular Reference GC',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict whether modern GC can collect circularly referenced objects.',
      skeleton: `function createCycle() {
  const a = { name: 'A' };
  const b = { name: 'B' };
  a.partner = b;
  b.partner = a;
  return 'done';
}

createCycle();

// After createCycle returns:
// 1. Are a and b reachable from any root?
// 2. Will modern mark-and-sweep GC collect them?
// 3. Would old reference-counting GC collect them?`,
      solution: `function createCycle() {
  const a = { name: 'A' };
  const b = { name: 'B' };
  a.partner = b;
  b.partner = a;
  return 'done';
}

createCycle();

// After createCycle returns:
// 1. No -- a and b are local variables, no references escape the function.
// 2. YES -- mark-and-sweep starts from roots, cannot reach a or b, so both are collected.
// 3. NO -- reference-counting sees a.partner->b and b.partner->a (count=1 each), never reaches 0.`,
      hints: [
        'After createCycle returns, no external variable holds a reference to a or b.',
        'Mark-and-sweep traces from roots -- it does not care about circular references.',
        'Reference counting cannot collect cycles because each object still has a reference count of 1.',
      ],
      concepts: ['circular references', 'mark-and-sweep', 'reference counting', 'garbage collection'],
    },
    {
      id: 'js-memory-12',
      title: 'Memory-Efficient Map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that demonstrates using a Map with numeric keys instead of a sparse array, avoiding wasted memory slots.',
      skeleton: `function createSparseStore() {
  // Instead of: const arr = []; arr[1000000] = 'data';
  // (which wastes memory on empty slots)
  // Use a Map for sparse integer-keyed data

  // Create the store

  // Add entries at indices 0, 1000, 1000000

  // Return an object with get(index), set(index, value), and size()



}

// const store = createSparseStore();
// store.get(1000); // 'item-1000'
// store.size(); // 3`,
      solution: `function createSparseStore() {
  const map = new Map();

  map.set(0, 'item-0');
  map.set(1000, 'item-1000');
  map.set(1_000_000, 'item-1000000');

  return {
    get(index) {
      return map.get(index);
    },
    set(index, value) {
      map.set(index, value);
    },
    size() {
      return map.size;
    },
  };
}

// const store = createSparseStore();
// store.get(1000); // 'item-1000'
// store.size(); // 3`,
      hints: [
        'A sparse array like arr[1000000] = x allocates engine-internal structures for all slots.',
        'Map only stores entries that actually exist, making it memory-efficient for sparse data.',
        'Expose get, set, and size methods that delegate to the internal Map.',
      ],
      concepts: ['Map', 'sparse data', 'memory efficiency', 'data structures'],
    },
    {
      id: 'js-memory-13',
      title: 'WeakMap for Private Data',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that uses a WeakMap to associate private metadata with objects without preventing their garbage collection.',
      skeleton: `const metadata = new WeakMap();

function attachMeta(obj, meta) {
  // Store meta for obj without preventing GC of obj


}

function getMeta(obj) {
  // Retrieve meta for obj, or null if none


}

function hasMeta(obj) {
  // Check if obj has metadata


}

// Usage:
// let user = { name: 'Alice' };
// attachMeta(user, { created: Date.now(), role: 'admin' });
// getMeta(user); // { created: ..., role: 'admin' }
// user = null; // metadata is also eligible for GC`,
      solution: `const metadata = new WeakMap();

function attachMeta(obj, meta) {
  metadata.set(obj, meta);
}

function getMeta(obj) {
  return metadata.get(obj) ?? null;
}

function hasMeta(obj) {
  return metadata.has(obj);
}

// Usage:
// let user = { name: 'Alice' };
// attachMeta(user, { created: Date.now(), role: 'admin' });
// getMeta(user); // { created: ..., role: 'admin' }
// user = null; // metadata is also eligible for GC`,
      hints: [
        'WeakMap keys are held weakly -- when the key object is GC-eligible, the entry is removed.',
        'Use metadata.set(obj, meta) to store, metadata.get(obj) to retrieve.',
        'Return null from getMeta when no entry exists, using ?? null.',
      ],
      concepts: ['WeakMap', 'private data', 'garbage collection', 'metadata'],
    },
    {
      id: 'js-memory-14',
      title: 'Heap Snapshot Concepts',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fill in the blanks about heap snapshot analysis concepts.',
      skeleton: `// In Chrome DevTools Memory panel:

// __BLANK__ size: memory directly held by the object itself
// __BLANK__ size: memory that would be freed if the object were deleted
//   (includes objects only reachable through this object)

// To find leaks:
// 1. Take snapshot before an action
// 2. Perform the action (e.g., open/close a dialog)
// 3. Take snapshot after
// 4. Compare using the "__BLANK__" view to see objects allocated
//    between snapshots that were NOT freed

// The __BLANK__ view shows the shortest path from GC roots
// to any object, helping identify why an object is retained`,
      solution: `// In Chrome DevTools Memory panel:

// Shallow size: memory directly held by the object itself
// Retained size: memory that would be freed if the object were deleted
//   (includes objects only reachable through this object)

// To find leaks:
// 1. Take snapshot before an action
// 2. Perform the action (e.g., open/close a dialog)
// 3. Take snapshot after
// 4. Compare using the "Comparison" view to see objects allocated
//    between snapshots that were NOT freed

// The Retainers view shows the shortest path from GC roots
// to any object, helping identify why an object is retained`,
      hints: [
        'Shallow size is the memory the object itself occupies, not including referenced objects.',
        'Retained size includes all memory that would be freed if the object (and its exclusive tree) were removed.',
        'The Comparison view diffs two snapshots; the Retainers view shows the reference chain from roots.',
      ],
      concepts: ['heap snapshot', 'shallow size', 'retained size', 'memory profiling', 'DevTools'],
    },
    {
      id: 'js-memory-15',
      title: 'Object Pool Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write an ObjectPool class that reuses objects to avoid repeated allocation and GC pressure. It should have acquire() and release(obj) methods.',
      skeleton: `class ObjectPool {
  #pool = [];
  #factory;
  #reset;

  constructor(factory, reset) {
    // factory: () => object -- creates a new object
    // reset: (obj) => void -- resets an object for reuse


  }

  acquire() {
    // Return a recycled object from the pool, or create a new one


  }

  release(obj) {
    // Reset the object and return it to the pool


  }

  get size() {
    // Return the number of available objects in the pool

  }
}

// Usage:
// const pool = new ObjectPool(
//   () => ({ x: 0, y: 0, active: false }),
//   (obj) => { obj.x = 0; obj.y = 0; obj.active = false; }
// );
// const p = pool.acquire();
// p.x = 100; p.y = 200; p.active = true;
// pool.release(p); // resets and recycles`,
      solution: `class ObjectPool {
  #pool = [];
  #factory;
  #reset;

  constructor(factory, reset) {
    this.#factory = factory;
    this.#reset = reset;
  }

  acquire() {
    if (this.#pool.length > 0) {
      return this.#pool.pop();
    }
    return this.#factory();
  }

  release(obj) {
    this.#reset(obj);
    this.#pool.push(obj);
  }

  get size() {
    return this.#pool.length;
  }
}

// Usage:
// const pool = new ObjectPool(
//   () => ({ x: 0, y: 0, active: false }),
//   (obj) => { obj.x = 0; obj.y = 0; obj.active = false; }
// );
// const p = pool.acquire();
// p.x = 100; p.y = 200; p.active = true;
// pool.release(p); // resets and recycles`,
      hints: [
        'Store factory and reset functions in private fields.',
        'acquire() pops from the pool if available, otherwise calls the factory.',
        'release() calls the reset function on the object then pushes it back into the pool.',
      ],
      concepts: ['object pool', 'memory optimization', 'GC pressure', 'reuse pattern'],
    },
    {
      id: 'js-memory-16',
      title: 'Transferable ArrayBuffer',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fill in the blanks to transfer an ArrayBuffer to a worker without copying.',
      skeleton: `const buffer = new ArrayBuffer(1024 * 1024); // 1MB
const view = new Uint8Array(buffer);
view[0] = 42;

// Transfer the buffer to a worker (zero-copy)
worker.postMessage({ data: buffer }, __BLANK__);

// After transfer:
console.log(buffer.__BLANK__); // 0 -- buffer is neutered/detached
// view[0] would throw a TypeError`,
      solution: `const buffer = new ArrayBuffer(1024 * 1024); // 1MB
const view = new Uint8Array(buffer);
view[0] = 42;

// Transfer the buffer to a worker (zero-copy)
worker.postMessage({ data: buffer }, [buffer]);

// After transfer:
console.log(buffer.byteLength); // 0 -- buffer is neutered/detached
// view[0] would throw a TypeError`,
      hints: [
        'The second argument to postMessage is an array of transferable objects.',
        'Pass [buffer] as the transfer list to move ownership to the worker.',
        'After transfer, the buffer is detached -- byteLength becomes 0 and access throws.',
      ],
      concepts: ['Transferable', 'ArrayBuffer', 'postMessage', 'web workers', 'zero-copy'],
    },
    {
      id: 'js-memory-17',
      title: 'Memory Leak in setTimeout',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the recursive setTimeout pattern that leaks because it captures new closures each iteration.',
      skeleton: `// BUG: Each recursive call creates a new closure capturing 'results'
// which grows unbounded
function pollServer(url) {
  const results = [];

  function poll() {
    fetch(url)
      .then(r => r.json())
      .then(data => {
        results.push(data);
        console.log('Total results:', results.length);
        setTimeout(poll, 5000);
      });
  }

  poll();
  return results;
}`,
      solution: `// FIX: Cap the results array and allow external cancellation
function pollServer(url, maxResults = 100) {
  const results = [];
  let timeoutId = null;

  function poll() {
    fetch(url)
      .then(r => r.json())
      .then(data => {
        results.push(data);
        if (results.length > maxResults) {
          results.shift();
        }
        console.log('Total results:', results.length);
        timeoutId = setTimeout(poll, 5000);
      });
  }

  poll();
  return {
    results,
    stop() {
      clearTimeout(timeoutId);
    },
  };
}`,
      hints: [
        'The results array grows forever because nothing limits its size.',
        'Cap the array with a maxResults limit and use shift() to remove old entries.',
        'Return a stop() function so the caller can cancel the polling loop.',
      ],
      concepts: ['setTimeout', 'memory leak', 'unbounded growth', 'cleanup pattern'],
    },
    {
      id: 'js-memory-18',
      title: 'FinalizationRegistry Cleanup',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a ManagedResource class that uses FinalizationRegistry to automatically close file handles (simulated) when the wrapper object is garbage collected.',
      skeleton: `const registry = new FinalizationRegistry((handle) => {
  // Called when ManagedResource is GC'd
  // Close the handle


});

class ManagedResource {
  #handle;

  constructor(filename) {
    this.#handle = openFile(filename); // simulated
    // Register this instance so the handle is closed on GC


  }

  read() {
    return readFile(this.#handle);
  }

  close() {
    closeFile(this.#handle);
    // Unregister so the finalizer doesn't double-close


  }
}

// Simulated file operations
function openFile(name) { return { fd: Math.random(), name }; }
function readFile(handle) { return 'data from ' + handle.name; }
function closeFile(handle) { console.log('Closed:', handle.name); }`,
      solution: `const registry = new FinalizationRegistry((handle) => {
  closeFile(handle);
  console.log('Cleaned up by finalizer:', handle.name);
});

class ManagedResource {
  #handle;
  #token = {};

  constructor(filename) {
    this.#handle = openFile(filename);
    registry.register(this, this.#handle, this.#token);
  }

  read() {
    return readFile(this.#handle);
  }

  close() {
    closeFile(this.#handle);
    registry.unregister(this.#token);
  }
}

// Simulated file operations
function openFile(name) { return { fd: Math.random(), name }; }
function readFile(handle) { return 'data from ' + handle.name; }
function closeFile(handle) { console.log('Closed:', handle.name); }`,
      hints: [
        'register() takes the target object, held value (handle), and an optional unregister token.',
        'Use a private #token object so close() can call registry.unregister(token) to prevent double cleanup.',
        'The finalizer callback receives the held value (handle) and should call closeFile on it.',
      ],
      concepts: ['FinalizationRegistry', 'resource cleanup', 'unregister', 'RAII pattern'],
    },
    {
      id: 'js-memory-19',
      title: 'Struct of Arrays',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor from Array-of-Structs to Struct-of-Arrays for better memory locality and performance with large datasets.',
      skeleton: `// Array of Structs (AoS) -- poor memory locality for bulk operations
const particles = [];
for (let i = 0; i < 10000; i++) {
  particles.push({
    x: Math.random() * 800,
    y: Math.random() * 600,
    vx: (Math.random() - 0.5) * 10,
    vy: (Math.random() - 0.5) * 10,
  });
}

function updateParticles(particles, dt) {
  for (const p of particles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
  }
}`,
      solution: `// Struct of Arrays (SoA) -- better memory locality for bulk operations
const count = 10000;
const particles = {
  x: new Float64Array(count),
  y: new Float64Array(count),
  vx: new Float64Array(count),
  vy: new Float64Array(count),
};

for (let i = 0; i < count; i++) {
  particles.x[i] = Math.random() * 800;
  particles.y[i] = Math.random() * 600;
  particles.vx[i] = (Math.random() - 0.5) * 10;
  particles.vy[i] = (Math.random() - 0.5) * 10;
}

function updateParticles(particles, count, dt) {
  for (let i = 0; i < count; i++) {
    particles.x[i] += particles.vx[i] * dt;
    particles.y[i] += particles.vy[i] * dt;
  }
}`,
      hints: [
        'Struct of Arrays stores each property in its own contiguous array.',
        'Use Float64Array for numeric data -- contiguous memory, no boxing overhead.',
        'Access by index: particles.x[i] instead of particles[i].x.',
      ],
      concepts: ['struct of arrays', 'memory locality', 'typed arrays', 'performance optimization'],
    },
    {
      id: 'js-memory-20',
      title: 'Combined Memory Patterns',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a ResourceManager class that combines WeakRef caching, FinalizationRegistry cleanup, and an object pool for frequently created/destroyed resources.',
      skeleton: `class ResourceManager {
  #cache = new Map();       // key -> WeakRef
  #pool = [];               // recycled resource objects
  #registry;
  #maxPool;

  constructor(maxPool = 50) {
    // Set up FinalizationRegistry to recycle resources back to pool
    // Set maxPool limit


  }

  acquire(key) {
    // 1. Check cache for an existing WeakRef
    // 2. If alive, return it
    // 3. Otherwise, get from pool or create new
    // 4. Cache it and register for finalization


  }

  #createResource(key) {
    // Pop from pool and reinitialize, or create fresh

  }

  #recycle(resource) {
    // Reset and push to pool if under limit

  }

  get poolSize() { return this.#pool.length; }
  get cacheSize() { return this.#cache.size; }
}`,
      solution: `class ResourceManager {
  #cache = new Map();
  #pool = [];
  #registry;
  #maxPool;

  constructor(maxPool = 50) {
    this.#maxPool = maxPool;
    this.#registry = new FinalizationRegistry((resource) => {
      this.#recycle(resource);
    });
  }

  acquire(key) {
    const ref = this.#cache.get(key);
    if (ref) {
      const cached = ref.deref();
      if (cached) return cached;
      this.#cache.delete(key);
    }

    const resource = this.#createResource(key);
    this.#cache.set(key, new WeakRef(resource));
    this.#registry.register(resource, { ...resource });
    return resource;
  }

  #createResource(key) {
    if (this.#pool.length > 0) {
      const recycled = this.#pool.pop();
      recycled.key = key;
      recycled.data = null;
      recycled.active = true;
      return recycled;
    }
    return { key, data: null, active: true };
  }

  #recycle(resource) {
    if (this.#pool.length < this.#maxPool) {
      resource.active = false;
      resource.data = null;
      this.#pool.push(resource);
    }
  }

  get poolSize() { return this.#pool.length; }
  get cacheSize() { return this.#cache.size; }
}`,
      hints: [
        'Combine WeakRef in the cache Map with FinalizationRegistry for automatic cleanup.',
        'The acquire method checks the WeakRef cache first, then falls back to pool or fresh creation.',
        'The FinalizationRegistry callback receives a snapshot of resource data to recycle into the pool.',
      ],
      concepts: ['WeakRef', 'FinalizationRegistry', 'object pool', 'resource management', 'caching'],
    },
  ],
};
