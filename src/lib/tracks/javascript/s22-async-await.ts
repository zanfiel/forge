import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-async-await',
  title: '22. Async / Await',
  explanation: `## Async / Await

\`async\` functions always return a promise. \`await\` pauses execution until the promise settles.

### Basics
\`\`\`js
async function fetchData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
\`\`\`

### Error Handling
Use try/catch inside async functions:
\`\`\`js
async function safeFetch(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
\`\`\`

### Sequential vs Parallel
\`\`\`js
// Sequential -- slow
const a = await fetchA();
const b = await fetchB();

// Parallel -- fast
const [a, b] = await Promise.all([fetchA(), fetchB()]);
\`\`\`

### Top-Level Await
Available in ES modules. Blocks module loading until the await resolves.

### Async Iteration
\`\`\`js
for await (const chunk of stream) { ... }
\`\`\`

### Key Rules
- \`await\` only works inside \`async\` functions (or top-level in modules)
- An \`async\` function returns a promise even if you return a plain value
- Thrown errors become rejected promises
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-async-1b',
      title: 'Basic async function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Add the keyword that makes this function return a promise.',
      skeleton: `__BLANK__ function greet() {
  return 'hello';
}

greet().then(msg => console.log(msg)); // 'hello'`,
      solution: `async function greet() {
  return 'hello';
}

greet().then(msg => console.log(msg)); // 'hello'`,
      hints: [
        'This keyword marks a function as asynchronous.',
        'The return value is automatically wrapped in a promise.',
        'The keyword is `async`.',
      ],
      concepts: ['async', 'promise'],
    },
    {
      id: 'js-async-2b',
      title: 'Await a promise',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Pause execution until the promise resolves.',
      skeleton: `async function fetchName() {
  const res = __BLANK__ fetch('/api/name');
  const data = __BLANK__ res.json();
  return data.name;
}`,
      solution: `async function fetchName() {
  const res = await fetch('/api/name');
  const data = await res.json();
  return data.name;
}`,
      hints: [
        'This keyword pauses until the promise settles.',
        'It can only be used inside an async function.',
        'The keyword is `await`.',
      ],
      concepts: ['await', 'async', 'fetch'],
    },
    {
      id: 'js-async-3b',
      title: 'Error handling with try/catch',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Add error handling to the async function.',
      skeleton: `async function safeFetch(url) {
  __BLANK__ {
    const res = await fetch(url);
    return await res.json();
  } __BLANK__ (err) {
    return null;
  }
}`,
      solution: `async function safeFetch(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    return null;
  }
}`,
      hints: [
        'Async errors are caught with the same syntax as synchronous errors.',
        'Wrap the risky code in a try block.',
        'The keywords are `try` and `catch`.',
      ],
      concepts: ['try', 'catch', 'async', 'error handling'],
    },
    {
      id: 'js-async-4i',
      title: 'Parallel await',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Run two async operations in parallel.',
      skeleton: `async function loadBoth() {
  const [users, posts] = await Promise.__BLANK__([
    fetchUsers(),
    fetchPosts(),
  ]);
  return { users, posts };
}`,
      solution: `async function loadBoth() {
  const [users, posts] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
  ]);
  return { users, posts };
}`,
      hints: [
        'You need a Promise static method that runs promises concurrently.',
        'It resolves when ALL promises fulfil.',
        'The method is `all`.',
      ],
      concepts: ['Promise.all', 'parallel', 'destructuring'],
    },
    {
      id: 'js-async-5i',
      title: 'Async arrow function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Create an async arrow function.',
      skeleton: `const getData = __BLANK__ (url) => {
  const res = await fetch(url);
  return res.json();
};`,
      solution: `const getData = async (url) => {
  const res = await fetch(url);
  return res.json();
};`,
      hints: [
        'Arrow functions can also be async.',
        'Place the keyword before the parameters.',
        'Use `async` before `(url)`.',
      ],
      concepts: ['async', 'arrow function', 'await'],
    },
    {
      id: 'js-async-6a',
      title: 'for await...of',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Iterate over an async iterable.',
      skeleton: `async function consume(asyncIterable) {
  const results = [];
  for __BLANK__ (const item of asyncIterable) {
    results.push(item);
  }
  return results;
}`,
      solution: `async function consume(asyncIterable) {
  const results = [];
  for await (const item of asyncIterable) {
    results.push(item);
  }
  return results;
}`,
      hints: [
        'Async iterables need a special form of for...of.',
        'Add a keyword between for and the parenthesis.',
        'Use `for await (...)`.',
      ],
      concepts: ['for await...of', 'async iterable'],
    },

    // ---- write-function (6) ----
    {
      id: 'js-async-7b',
      title: 'Async delay',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write an async function that waits then returns a value.',
      skeleton: `// Write async function delayedValue(value, ms) that:
// - Waits for ms milliseconds
// - Then returns the value
// Use a helper: const sleep = ms => new Promise(r => setTimeout(r, ms));
`,
      solution: `const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function delayedValue(value, ms) {
  await sleep(ms);
  return value;
}`,
      hints: [
        'Create a sleep helper that returns a promise.',
        'Await the sleep inside the async function.',
        'Return the value after the await.',
      ],
      concepts: ['async', 'await', 'setTimeout', 'promise'],
    },
    {
      id: 'js-async-8b',
      title: 'Sequential async loop',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Process items one at a time with async/await.',
      skeleton: `// Write async function processSequentially(items, fn) where:
// - items: array of values
// - fn(item): async function
// Process each item sequentially (wait for one before starting next)
// Return array of results
`,
      solution: `async function processSequentially(items, fn) {
  const results = [];
  for (const item of items) {
    const result = await fn(item);
    results.push(result);
  }
  return results;
}`,
      hints: [
        'Use a for...of loop with await inside.',
        'Each iteration waits for fn to complete before continuing.',
        'Collect results in an array.',
      ],
      concepts: ['async', 'await', 'sequential', 'for...of'],
    },
    {
      id: 'js-async-9i',
      title: 'Async retry with delay',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Retry an async operation with exponential backoff.',
      skeleton: `// Write async function retryWithBackoff(fn, maxRetries, baseDelay = 100)
// - Call fn() (returns promise)
// - If it fails, wait baseDelay * 2^attempt ms, then retry
// - After maxRetries failures, throw the last error
`,
      solution: `async function retryWithBackoff(fn, maxRetries, baseDelay = 100) {
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }
  throw lastError;
}`,
      hints: [
        'Loop from 0 to maxRetries.',
        'Wrap fn() in try/catch; if it fails, calculate the delay.',
        'Use 2^attempt * baseDelay for exponential backoff.',
      ],
      concepts: ['retry', 'exponential backoff', 'async', 'error handling'],
    },
    {
      id: 'js-async-10i',
      title: 'Async map with concurrency',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Map over items with limited concurrency using async/await.',
      skeleton: `// Write async function asyncMap(items, fn, concurrency = Infinity)
// - fn(item) is async
// - Run at most 'concurrency' operations at once
// - Return results in original order
`,
      solution: `async function asyncMap(items, fn, concurrency = Infinity) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await fn(items[index]);
    }
  }

  const workers = [];
  const workerCount = Math.min(concurrency, items.length);
  for (let i = 0; i < workerCount; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);
  return results;
}`,
      hints: [
        'Create a pool of worker functions that pull from a shared index.',
        'Each worker processes items until the index is exhausted.',
        'Await all workers with Promise.all.',
      ],
      concepts: ['concurrency', 'worker pool', 'async', 'Promise.all'],
    },
    {
      id: 'js-async-11a',
      title: 'Async mutex',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Implement a simple async mutex for serializing access.',
      skeleton: `// Write class Mutex with:
// - async acquire(): waits if locked, then locks
// - release(): unlocks, allowing the next waiter
// Usage:
//   const mutex = new Mutex();
//   await mutex.acquire();
//   try { /* critical section */ }
//   finally { mutex.release(); }
`,
      solution: `class Mutex {
  constructor() {
    this.locked = false;
    this.queue = [];
  }

  acquire() {
    return new Promise((resolve) => {
      if (!this.locked) {
        this.locked = true;
        resolve();
      } else {
        this.queue.push(resolve);
      }
    });
  }

  release() {
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next();
    } else {
      this.locked = false;
    }
  }
}`,
      hints: [
        'Use a queue of pending resolve functions.',
        'acquire() returns a promise that resolves when the lock is available.',
        'release() either resolves the next waiter or unlocks.',
      ],
      concepts: ['mutex', 'async', 'queue', 'concurrency control'],
    },
    {
      id: 'js-async-12a',
      title: 'Async generator consumer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write an async generator that paginates through an API.',
      skeleton: `// Write async generator function* paginate(url)
// - Fetch url, parse JSON
// - Yield each item from response.data
// - If response.nextPage exists, fetch that and continue
// - Stop when there is no nextPage
`,
      solution: `async function* paginate(url) {
  let currentUrl = url;
  while (currentUrl) {
    const res = await fetch(currentUrl);
    const response = await res.json();
    for (const item of response.data) {
      yield item;
    }
    currentUrl = response.nextPage || null;
  }
}`,
      hints: [
        'Use a while loop that continues as long as there is a URL.',
        'Fetch and parse inside the loop.',
        'Yield each item, then update the URL from response.nextPage.',
      ],
      concepts: ['async generator', 'pagination', 'yield', 'fetch'],
    },

    // ---- fix-bug (3) ----
    {
      id: 'js-async-13b',
      title: 'Await in non-async function',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fix the function that uses await without async.',
      skeleton: `function getUser(id) {
  const res = await fetch('/api/users/' + id);
  const user = await res.json();
  return user;
}`,
      solution: `async function getUser(id) {
  const res = await fetch('/api/users/' + id);
  const user = await res.json();
  return user;
}`,
      hints: [
        'await can only be used inside async functions.',
        'The function needs a keyword before "function".',
        'Add `async` before `function`.',
      ],
      concepts: ['async', 'await', 'SyntaxError'],
    },
    {
      id: 'js-async-14i',
      title: 'Sequential instead of parallel',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the code that runs independent requests sequentially.',
      skeleton: `async function loadDashboard() {
  // Bug: these are independent but run sequentially
  const users = await fetchUsers();
  const posts = await fetchPosts();
  const comments = await fetchComments();
  return { users, posts, comments };
}`,
      solution: `async function loadDashboard() {
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments(),
  ]);
  return { users, posts, comments };
}`,
      hints: [
        'These three fetches do not depend on each other.',
        'Running them sequentially wastes time.',
        'Use Promise.all to run them in parallel.',
      ],
      concepts: ['Promise.all', 'parallel', 'performance'],
    },
    {
      id: 'js-async-15a',
      title: 'Swallowed error in async forEach',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fix the forEach that silently ignores async errors.',
      skeleton: `async function processAll(items) {
  const results = [];
  items.forEach(async (item) => {
    const result = await processItem(item);
    results.push(result);
  });
  return results; // Bug: returns [] because forEach doesn't await
}`,
      solution: `async function processAll(items) {
  const results = [];
  for (const item of items) {
    const result = await processItem(item);
    results.push(result);
  }
  return results;
}`,
      hints: [
        'forEach does not wait for async callbacks.',
        'The function returns immediately with an empty array.',
        'Replace forEach with a for...of loop and await inside.',
      ],
      concepts: ['forEach', 'async', 'for...of', 'common pitfall'],
    },

    // ---- predict-output (3) ----
    {
      id: 'js-async-16b',
      title: 'Async return value',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the type of value returned by an async function.',
      skeleton: `async function getNum() {
  return 42;
}

const result = getNum();
console.log(typeof result);
console.log(result instanceof Promise);`,
      solution: `async function getNum() {
  return 42;
}

const result = getNum();
console.log(typeof result);
console.log(result instanceof Promise);`,
      expectedOutput: `object
true`,
      hints: [
        'async functions always return a promise.',
        'Even returning a plain value wraps it in a promise.',
        'A promise is an object.',
      ],
      concepts: ['async', 'Promise', 'typeof'],
    },
    {
      id: 'js-async-17i',
      title: 'Execution order with await',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the execution order of sync and async code.',
      skeleton: `async function demo() {
  console.log('A');
  await Promise.resolve();
  console.log('B');
}

console.log('1');
demo();
console.log('2');`,
      solution: `async function demo() {
  console.log('A');
  await Promise.resolve();
  console.log('B');
}

console.log('1');
demo();
console.log('2');`,
      expectedOutput: `1
A
2
B`,
      hints: [
        'Code before await runs synchronously.',
        'await yields control back to the caller.',
        'Code after await runs as a microtask.',
      ],
      concepts: ['await', 'execution order', 'microtask'],
    },
    {
      id: 'js-async-18a',
      title: 'Error propagation',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict how errors propagate through async/await.',
      skeleton: `async function inner() {
  throw new Error('fail');
}

async function middle() {
  const val = await inner();
  console.log('never');
  return val;
}

async function outer() {
  try {
    await middle();
  } catch (e) {
    console.log('caught: ' + e.message);
  }
  console.log('done');
}

outer();`,
      solution: `async function inner() {
  throw new Error('fail');
}

async function middle() {
  const val = await inner();
  console.log('never');
  return val;
}

async function outer() {
  try {
    await middle();
  } catch (e) {
    console.log('caught: ' + e.message);
  }
  console.log('done');
}

outer();`,
      expectedOutput: `caught: fail
done`,
      hints: [
        'inner() throws, which rejects its returned promise.',
        'middle() awaits inner(), so the rejection propagates up.',
        'outer() catches it in the try/catch.',
      ],
      concepts: ['error propagation', 'async', 'try/catch'],
    },

    // ---- refactor (2) ----
    {
      id: 'js-async-19i',
      title: 'Promise chain to async/await',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Convert a promise chain to use async/await.',
      skeleton: `function loadUser(id) {
  return fetch('/api/users/' + id)
    .then(res => {
      if (!res.ok) throw new Error('Not found');
      return res.json();
    })
    .then(user => {
      return fetch('/api/posts?userId=' + user.id);
    })
    .then(res => res.json())
    .then(posts => {
      return { user: null, posts };
    })
    .catch(err => {
      console.error(err);
      return null;
    });
}`,
      solution: `async function loadUser(id) {
  try {
    const res = await fetch('/api/users/' + id);
    if (!res.ok) throw new Error('Not found');
    const user = await res.json();
    const postsRes = await fetch('/api/posts?userId=' + user.id);
    const posts = await postsRes.json();
    return { user, posts };
  } catch (err) {
    console.error(err);
    return null;
  }
}`,
      hints: [
        'Replace each .then() with an await assignment.',
        'Replace .catch() with a try/catch block.',
        'The logic flows top-to-bottom, just like synchronous code.',
      ],
      concepts: ['async/await', 'refactor', 'promise chain'],
    },
    {
      id: 'js-async-20a',
      title: 'Nested callbacks to async/await',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Flatten deeply nested callback/promise code with async/await.',
      skeleton: `function processOrder(orderId) {
  return getOrder(orderId).then(order => {
    return validateOrder(order).then(valid => {
      if (!valid) throw new Error('Invalid order');
      return processPayment(order.total).then(receipt => {
        return sendConfirmation(order.email, receipt).then(() => {
          return { order, receipt, confirmed: true };
        });
      });
    });
  }).catch(err => {
    return logError(err).then(() => {
      return { error: err.message };
    });
  });
}`,
      solution: `async function processOrder(orderId) {
  try {
    const order = await getOrder(orderId);
    const valid = await validateOrder(order);
    if (!valid) throw new Error('Invalid order');
    const receipt = await processPayment(order.total);
    await sendConfirmation(order.email, receipt);
    return { order, receipt, confirmed: true };
  } catch (err) {
    await logError(err);
    return { error: err.message };
  }
}`,
      hints: [
        'Each nested .then() becomes a simple await line.',
        'The nesting disappears completely.',
        'Error handling moves to a single try/catch.',
      ],
      concepts: ['async/await', 'callback hell', 'refactor', 'flatten'],
    },
  ],
};
