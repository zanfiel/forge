import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-perf',
  title: '40. Performance',
  explanation: `## Performance

JavaScript performance optimization involves measuring, understanding bottlenecks, and applying targeted fixes.

\`\`\`javascript
// Timing
performance.now();                        // high-res timestamp
console.time('op'); /* ... */ console.timeEnd('op');

// Performance API marks/measures
performance.mark('start');
/* ... work ... */
performance.mark('end');
performance.measure('duration', 'start', 'end');

// Debounce -- delay until input stops
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// Throttle -- at most once per interval
function throttle(fn, ms) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= ms) { last = now; fn(...args); }
  };
}

// Memoize -- cache function results
function memoize(fn) {
  const cache = new Map();
  return (arg) => {
    if (!cache.has(arg)) cache.set(arg, fn(arg));
    return cache.get(arg);
  };
}
\`\`\`

Measure first, optimize second. Common patterns: debounce/throttle events, memoize expensive computations, use Maps over objects for dynamic keys.`,
  exercises: [
    {
      id: 'js-perf-1',
      title: 'performance.now',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to measure execution time with performance.now.',
      skeleton: `const start = __BLANK__.now();
// ... expensive operation ...
for (let i = 0; i < 1000000; i++) Math.sqrt(i);
const end = __BLANK__.now();
console.log(\`Took \${end - __BLANK__}ms\`);`,
      solution: `const start = performance.now();
// ... expensive operation ...
for (let i = 0; i < 1000000; i++) Math.sqrt(i);
const end = performance.now();
console.log(\`Took \${end - start}ms\`);`,
      hints: [
        'performance.now() returns a high-resolution timestamp.',
        'It is more precise than Date.now() (microsecond precision).',
        'Subtract start from end to get elapsed milliseconds.',
      ],
      concepts: ['performance.now', 'timing'],
    },
    {
      id: 'js-perf-2',
      title: 'console.time / timeEnd',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to use console.time for quick profiling.',
      skeleton: `console.__BLANK__('sort');
const arr = Array.from({ length: 100000 }, () => Math.random());
arr.sort();
console.__BLANK__('sort'); // logs: "sort: Xms"`,
      solution: `console.time('sort');
const arr = Array.from({ length: 100000 }, () => Math.random());
arr.sort();
console.timeEnd('sort'); // logs: "sort: Xms"`,
      hints: [
        'console.time(label) starts a timer.',
        'console.timeEnd(label) stops it and logs the duration.',
        'The label must match between time and timeEnd.',
      ],
      concepts: ['console.time', 'console.timeEnd'],
    },
    {
      id: 'js-perf-3',
      title: 'Performance marks and measures',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create performance marks and measures.',
      skeleton: `performance.__BLANK__('fetch-start');
const data = await fetch('/api/data').then(r => r.json());
performance.__BLANK__('fetch-end');

const measure = performance.__BLANK__('fetch-duration', 'fetch-start', 'fetch-end');
console.log(\`Fetch took \${measure.duration}ms\`);`,
      solution: `performance.mark('fetch-start');
const data = await fetch('/api/data').then(r => r.json());
performance.mark('fetch-end');

const measure = performance.measure('fetch-duration', 'fetch-start', 'fetch-end');
console.log(\`Fetch took \${measure.duration}ms\`);`,
      hints: [
        'performance.mark(name) creates a named timestamp.',
        'performance.measure(name, start, end) computes duration.',
        'measure.duration gives the time between marks.',
      ],
      concepts: ['performance.mark', 'performance.measure'],
    },
    {
      id: 'js-perf-4',
      title: 'Debounce function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to implement a debounce function.',
      skeleton: `function debounce(fn, ms) {
  let __BLANK__;
  return (...args) => {
    __BLANK__(timer);
    timer = __BLANK__(() => fn(...args), ms);
  };
}`,
      solution: `function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}`,
      hints: [
        'Store the timer ID so you can clear it.',
        'clearTimeout cancels the previous scheduled call.',
        'setTimeout schedules the function after the delay.',
      ],
      concepts: ['debounce', 'clearTimeout', 'setTimeout'],
    },
    {
      id: 'js-perf-5',
      title: 'Throttle function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to implement a throttle function.',
      skeleton: `function throttle(fn, ms) {
  let __BLANK__ = 0;
  return (...args) => {
    const now = __BLANK__.now();
    if (now - last >= __BLANK__) {
      last = now;
      fn(...args);
    }
  };
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
        'Only call fn if enough time has passed.',
        'Date.now() is sufficient for throttle timing.',
      ],
      concepts: ['throttle', 'rate limiting'],
    },
    {
      id: 'js-perf-6',
      title: 'Predict debounce vs throttle behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the difference between debounce and throttle.',
      skeleton: `// User types 5 characters rapidly (every 50ms) then stops.
// debounce(log, 200) -- how many times does log fire?
// throttle(log, 200) -- how many times does log fire?

// Timeline: 0ms, 50ms, 100ms, 150ms, 200ms (5 keystrokes)
// debounce(200): ?
// throttle(200): ?`,
      solution: `// debounce(200): fires ONCE, 200ms after the last keystroke (at ~400ms).
// Each keystroke resets the 200ms timer. Only fires after typing stops.

// throttle(200): fires TWICE.
// First call at 0ms (immediately).
// Second call at 200ms (200ms after the first).
// The calls at 50ms, 100ms, 150ms are dropped.`,
      hints: [
        'Debounce: waits until input STOPS, then fires once.',
        'Throttle: fires at most once per interval during input.',
        'Debounce = 1 call; Throttle = ceil(totalTime / interval) calls.',
      ],
      concepts: ['debounce vs throttle', 'timing behavior'],
    },
    {
      id: 'js-perf-7',
      title: 'Predict Map vs Object performance',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict which is faster for dynamic key operations.',
      skeleton: `// Scenario: 100,000 dynamic string keys, frequent add/delete
// Option A: plain object with bracket notation
// Option B: Map with set/delete

// Which is generally faster?
// What about memory usage?`,
      solution: `// Map is generally faster for:
// - Frequent additions and deletions
// - Non-string keys
// - Large numbers of entries
// - .size instead of Object.keys().length

// Object is generally faster for:
// - Small, fixed-shape objects
// - Known property access (JIT optimized)
// - JSON serialization (native support)

// For 100,000 dynamic keys with frequent churn:
// Map wins on speed and memory efficiency.`,
      hints: [
        'Maps are optimized for frequent insertion/deletion.',
        'Objects have overhead from property descriptors and prototypes.',
        'Maps track their own size; objects need Object.keys().',
      ],
      concepts: ['Map vs Object performance', 'dynamic keys'],
    },
    {
      id: 'js-perf-8',
      title: 'Memoization',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a memoize function that caches results based on arguments.',
      skeleton: `// memoize(fn) -- returns a memoized version of fn
// Cache should use a Map with JSON.stringify(args) as key
`,
      solution: `function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}`,
      hints: [
        'Use JSON.stringify(args) as the cache key.',
        'Check the cache before computing.',
        'Store the result after computing.',
      ],
      concepts: ['memoization', 'caching', 'Map'],
    },
    {
      id: 'js-perf-9',
      title: 'Lazy evaluation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a lazy function that defers computation until the value is first accessed.',
      skeleton: `// lazy(computeFn) -- returns a function that computes only on first call
// Subsequent calls return the cached result
`,
      solution: `function lazy(computeFn) {
  let computed = false;
  let value;
  return function () {
    if (!computed) {
      value = computeFn();
      computed = true;
    }
    return value;
  };
}`,
      hints: [
        'Use a flag to track if computation has happened.',
        'Store the result after first computation.',
        'Return the cached result on subsequent calls.',
      ],
      concepts: ['lazy evaluation', 'deferred computation'],
    },
    {
      id: 'js-perf-10',
      title: 'PerformanceObserver',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that uses PerformanceObserver to monitor all performance measures.',
      skeleton: `// observeMeasures(callback) -- calls callback(name, duration) for each measure
// Returns a disconnect function
`,
      solution: `function observeMeasures(callback) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      callback(entry.name, entry.duration);
    }
  });

  observer.observe({ type: 'measure', buffered: true });

  return () => observer.disconnect();
}`,
      hints: [
        'new PerformanceObserver(callback) watches for performance entries.',
        'observe({ type: "measure" }) filters for measure entries.',
        'buffered: true includes entries from before the observer started.',
      ],
      concepts: ['PerformanceObserver', 'performance monitoring'],
    },
    {
      id: 'js-perf-11',
      title: 'Predict requestIdleCallback behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the execution order with requestIdleCallback.',
      skeleton: `console.log('1');

requestIdleCallback(() => {
  console.log('2 (idle)');
});

setTimeout(() => {
  console.log('3 (timeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('4 (microtask)');
});

console.log('5');`,
      solution: `// Output:
// '1'
// '5'
// '4 (microtask)'
// '3 (timeout)'
// '2 (idle)'
// Sync: 1, 5
// Microtask: 4
// Macrotask (setTimeout): 3
// Idle callback: 2 (runs when browser is idle, after other tasks)`,
      hints: [
        'Synchronous code runs first.',
        'Microtasks (Promise.then) run next.',
        'requestIdleCallback runs when the browser is idle (lowest priority).',
      ],
      concepts: ['requestIdleCallback', 'execution order'],
    },
    {
      id: 'js-perf-12',
      title: 'Object pool pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write an object pool that reuses objects instead of allocating new ones.',
      skeleton: `// createPool(factory, reset, maxSize) returns { acquire(), release(obj) }
// factory() creates new objects
// reset(obj) cleans an object for reuse
`,
      solution: `function createPool(factory, reset, maxSize = 100) {
  const pool = [];

  return {
    acquire() {
      if (pool.length > 0) {
        return pool.pop();
      }
      return factory();
    },
    release(obj) {
      if (pool.length < maxSize) {
        reset(obj);
        pool.push(obj);
      }
    },
    size() {
      return pool.length;
    },
  };
}`,
      hints: [
        'Keep a pool (array) of available objects.',
        'acquire: pop from pool or create new.',
        'release: reset the object and push back to pool.',
      ],
      concepts: ['object pool', 'GC pressure reduction'],
    },
    {
      id: 'js-perf-13',
      title: 'Fix the debounce memory leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This debounce captures expensive arguments in closure. Fix the memory issue.',
      skeleton: `function debounce(fn, ms) {
  let timer;
  let lastArgs;
  return (...args) => {
    lastArgs = args; // Bug: holds reference to potentially large args
    clearTimeout(timer);
    timer = setTimeout(() => fn(...lastArgs), ms);
  };
}

// Usage with large objects:
const debouncedSave = debounce((data) => save(data), 1000);
debouncedSave(hugeObject); // hugeObject held in memory until timer fires`,
      solution: `function debounce(fn, ms) {
  let timer;
  let lastArgs;
  return (...args) => {
    lastArgs = args;
    clearTimeout(timer);
    timer = setTimeout(() => {
      const args = lastArgs;
      lastArgs = null;
      fn(...args);
    }, ms);
  };
}`,
      hints: [
        'Clear the lastArgs reference after the function fires.',
        'Set lastArgs = null in the timeout callback.',
        'This releases the reference to potentially large arguments.',
      ],
      concepts: ['debounce memory leak', 'reference cleanup'],
    },
    {
      id: 'js-perf-14',
      title: 'Fix the memoize cache leak',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This memoize function has an unbounded cache that grows forever. Fix it with an LRU limit.',
      skeleton: `function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    // Bug: cache grows without limit
    return result;
  };
}`,
      solution: `function memoize(fn, maxSize = 100) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    if (cache.size > maxSize) {
      const oldest = cache.keys().next().value;
      cache.delete(oldest);
    }
    return result;
  };
}`,
      hints: [
        'Map preserves insertion order.',
        'Delete and re-set on access to move to end (most recent).',
        'If cache exceeds maxSize, delete the first (oldest) entry.',
      ],
      concepts: ['LRU cache', 'bounded memoization', 'Map ordering'],
    },
    {
      id: 'js-perf-15',
      title: 'Fix the string concatenation perf issue',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This function has O(n^2) string concatenation. Fix it.',
      skeleton: `function buildCSV(rows) {
  let csv = '';
  for (const row of rows) {
    let line = '';
    for (const cell of row) {
      if (line) line += ',';
      line += cell;
    }
    csv += line + '\\n'; // O(n^2) -- creates new string each time
  }
  return csv;
}`,
      solution: `function buildCSV(rows) {
  return rows
    .map(row => row.join(','))
    .join('\\n') + '\\n';
}`,
      hints: [
        'Array.join() is optimized for string building.',
        'Map each row to a joined string, then join all rows.',
        'This avoids creating intermediate strings in a loop.',
      ],
      concepts: ['string performance', 'Array.join', 'O(n) vs O(n^2)'],
    },
    {
      id: 'js-perf-16',
      title: 'Debounce with leading edge',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a debounce that fires on the leading edge (immediately) and then waits.',
      skeleton: `// leadingDebounce(fn, ms) -- fires immediately on first call
// Then ignores calls for ms. After ms, allows the next call.
`,
      solution: `function leadingDebounce(fn, ms) {
  let timer = null;
  return function (...args) {
    if (timer === null) {
      fn.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
    }, ms);
  };
}`,
      hints: [
        'Fire immediately if no timer is running (first call).',
        'Set a timer that resets the state after ms.',
        'Calls during the timer period are ignored.',
      ],
      concepts: ['leading debounce', 'immediate invocation'],
    },
    {
      id: 'js-perf-17',
      title: 'Batch DOM operations',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a batcher that collects DOM updates and applies them all in one requestAnimationFrame.',
      skeleton: `// createBatcher() returns { schedule(fn), flush() }
// schedule collects functions, flush applies them in rAF
`,
      solution: `function createBatcher() {
  let pending = [];
  let scheduled = false;

  function flush() {
    const batch = pending;
    pending = [];
    scheduled = false;
    for (const fn of batch) {
      fn();
    }
  }

  return {
    schedule(fn) {
      pending.push(fn);
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(flush);
      }
    },
    flush,
  };
}`,
      hints: [
        'Collect updates in an array.',
        'Schedule a single requestAnimationFrame to flush all updates.',
        'Only schedule rAF once, even if multiple updates come in.',
      ],
      concepts: ['DOM batching', 'requestAnimationFrame', 'performance'],
    },
    {
      id: 'js-perf-18',
      title: 'Set vs Array lookup performance',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a benchmark that compares Array.includes vs Set.has for lookups.',
      skeleton: `// benchLookup(size, lookups) -- returns { arrayMs, setMs }
`,
      solution: `function benchLookup(size = 10000, lookups = 100000) {
  const arr = Array.from({ length: size }, (_, i) => i);
  const set = new Set(arr);
  const targets = Array.from({ length: lookups }, () =>
    Math.floor(Math.random() * size * 2)
  );

  const t0 = performance.now();
  for (const t of targets) arr.includes(t);
  const arrayMs = performance.now() - t0;

  const t1 = performance.now();
  for (const t of targets) set.has(t);
  const setMs = performance.now() - t1;

  return { arrayMs, setMs };
}`,
      hints: [
        'Array.includes is O(n) per lookup.',
        'Set.has is O(1) per lookup.',
        'For large datasets, Set is dramatically faster.',
      ],
      concepts: ['Set vs Array performance', 'Big-O'],
    },
    {
      id: 'js-perf-19',
      title: 'Refactor to memoized function',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this expensive function to use memoization.',
      skeleton: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// fibonacci(40) takes several seconds due to O(2^n) complexity
console.log(fibonacci(40));`,
      solution: `function fibonacci(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  const result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  memo.set(n, result);
  return result;
}

// fibonacci(40) is now O(n) and instant
console.log(fibonacci(40));`,
      hints: [
        'Pass a Map as a memo parameter for caching.',
        'Check the memo before recursive calls.',
        'Store results in the memo after computing.',
      ],
      concepts: ['memoization', 'fibonacci', 'O(2^n) to O(n)'],
    },
    {
      id: 'js-perf-20',
      title: 'Refactor includes to Set',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this O(n*m) lookup to O(n+m) using a Set.',
      skeleton: `function findCommon(arr1, arr2) {
  const result = [];
  for (const item of arr1) {
    if (arr2.includes(item) && !result.includes(item)) {
      result.push(item);
    }
  }
  return result;
}`,
      solution: `function findCommon(arr1, arr2) {
  const set2 = new Set(arr2);
  const seen = new Set();
  const result = [];
  for (const item of arr1) {
    if (set2.has(item) && !seen.has(item)) {
      result.push(item);
      seen.add(item);
    }
  }
  return result;
}`,
      hints: [
        'Convert arr2 to a Set for O(1) lookups.',
        'Use a Set to track already-added items (dedup).',
        'Total: O(n + m) instead of O(n * m).',
      ],
      concepts: ['Set optimization', 'algorithm performance'],
    },
  ],
};
