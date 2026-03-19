import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-promises',
  title: '21. Promises',
  explanation: `## Promises

A Promise represents a value that may be available now, later, or never. It has three states: **pending**, **fulfilled**, or **rejected**.

### Creating
\`\`\`js
const p = new Promise((resolve, reject) => {
  // async work...
  resolve(value);  // or reject(error)
});
\`\`\`

### Consuming
\`\`\`js
p.then(value => { ... })
 .catch(err => { ... })
 .finally(() => { ... });
\`\`\`

### Chaining
Each \`.then()\` returns a new promise, enabling chaining. Returning a value from \`.then()\` resolves the next promise with that value. Returning a promise chains them.

### Static Methods
- \`Promise.all(iterable)\` -- fulfils when ALL fulfil; rejects on first rejection
- \`Promise.allSettled(iterable)\` -- waits for all to settle (never rejects)
- \`Promise.race(iterable)\` -- settles with the first to settle
- \`Promise.any(iterable)\` -- fulfils with the first fulfilment; rejects if all reject
- \`Promise.resolve(value)\` / \`Promise.reject(reason)\` -- create settled promises

### Microtask Queue
Promise callbacks run as microtasks, which execute before the next macrotask (setTimeout, etc.).
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-prom-1b',
      title: 'Create a resolved promise',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Create a promise that resolves immediately with 42.',
      skeleton: `const p = Promise.__BLANK__(42);
p.then(val => console.log(val)); // 42`,
      solution: `const p = Promise.resolve(42);
p.then(val => console.log(val)); // 42`,
      hints: [
        'There is a static method that creates an already-fulfilled promise.',
        'It takes the resolved value as an argument.',
        'The method is `resolve`.',
      ],
      concepts: ['Promise.resolve', 'then'],
    },
    {
      id: 'js-prom-2b',
      title: 'Handle rejection',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Add an error handler to the promise chain.',
      skeleton: `const p = Promise.reject(new Error('oops'));
p.__BLANK__(err => console.log(err.message)); // 'oops'`,
      solution: `const p = Promise.reject(new Error('oops'));
p.catch(err => console.log(err.message)); // 'oops'`,
      hints: [
        'There is a method for handling rejected promises.',
        'It takes a callback that receives the rejection reason.',
        'The method is `catch`.',
      ],
      concepts: ['catch', 'Promise.reject', 'error handling'],
    },
    {
      id: 'js-prom-3b',
      title: 'Finally block',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Run cleanup code regardless of outcome.',
      skeleton: `fetch('/api/data')
  .then(res => res.json())
  .catch(err => console.error(err))
  .__BLANK__(() => console.log('done'));`,
      solution: `fetch('/api/data')
  .then(res => res.json())
  .catch(err => console.error(err))
  .finally(() => console.log('done'));`,
      hints: [
        'This method runs after the promise settles, regardless of result.',
        'It does not receive the value or error.',
        'The method is `finally`.',
      ],
      concepts: ['finally', 'promise chain'],
    },
    {
      id: 'js-prom-4i',
      title: 'Wait for all promises',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Use the method that waits for all promises to fulfil.',
      skeleton: `const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.__BLANK__([p1, p2, p3]).then(vals => {
  console.log(vals); // [1, 2, 3]
});`,
      solution: `const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).then(vals => {
  console.log(vals); // [1, 2, 3]
});`,
      hints: [
        'This method takes an iterable of promises.',
        'It fulfils with an array of all results.',
        'The method is `all`.',
      ],
      concepts: ['Promise.all', 'parallel promises'],
    },
    {
      id: 'js-prom-5i',
      title: 'First to settle',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Use the method that resolves with whichever promise settles first.',
      skeleton: `const slow = new Promise(r => setTimeout(() => r('slow'), 200));
const fast = new Promise(r => setTimeout(() => r('fast'), 50));

Promise.__BLANK__([slow, fast]).then(val => {
  console.log(val); // 'fast'
});`,
      solution: `const slow = new Promise(r => setTimeout(() => r('slow'), 200));
const fast = new Promise(r => setTimeout(() => r('fast'), 50));

Promise.race([slow, fast]).then(val => {
  console.log(val); // 'fast'
});`,
      hints: [
        'This method settles as soon as any promise settles.',
        'It does not wait for the others.',
        'The method is `race`.',
      ],
      concepts: ['Promise.race', 'first settle'],
    },
    {
      id: 'js-prom-6a',
      title: 'All settled results',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Get results from all promises regardless of rejection.',
      skeleton: `const p1 = Promise.resolve('ok');
const p2 = Promise.reject('fail');
const p3 = Promise.resolve('ok2');

Promise.__BLANK__([p1, p2, p3]).then(results => {
  console.log(results[1].status);  // 'rejected'
  console.log(results[1].reason);  // 'fail'
});`,
      solution: `const p1 = Promise.resolve('ok');
const p2 = Promise.reject('fail');
const p3 = Promise.resolve('ok2');

Promise.allSettled([p1, p2, p3]).then(results => {
  console.log(results[1].status);  // 'rejected'
  console.log(results[1].reason);  // 'fail'
});`,
      hints: [
        'This method never short-circuits on rejection.',
        'Each result has a status of "fulfilled" or "rejected".',
        'The method is `allSettled`.',
      ],
      concepts: ['Promise.allSettled', 'status', 'reason'],
    },

    // ---- write-function (6) ----
    {
      id: 'js-prom-7b',
      title: 'Promisify setTimeout',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a delay function that returns a promise.',
      skeleton: `// Write function delay(ms) that returns a promise
// that resolves after ms milliseconds.
// Example: delay(100).then(() => console.log('done'));
`,
      solution: `function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}`,
      hints: [
        'Wrap setTimeout in a new Promise.',
        'Pass resolve as the callback to setTimeout.',
        'The promise resolves when the timeout fires.',
      ],
      concepts: ['Promise', 'setTimeout', 'promisify'],
    },
    {
      id: 'js-prom-8b',
      title: 'Promise chain transformation',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function that chains multiple transformations.',
      skeleton: `// Write function transform(value) that returns a promise chain:
// 1. Double the value
// 2. Add 10
// 3. Convert to string
// Example: transform(5) resolves to '20'
`,
      solution: `function transform(value) {
  return Promise.resolve(value)
    .then(v => v * 2)
    .then(v => v + 10)
    .then(v => String(v));
}`,
      hints: [
        'Start with Promise.resolve(value).',
        'Each .then() receives the result of the previous step.',
        'Return the value from each .then() to pass it forward.',
      ],
      concepts: ['promise chain', 'then', 'Promise.resolve'],
    },
    {
      id: 'js-prom-9i',
      title: 'Retry with promises',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that retries a failing async operation.',
      skeleton: `// Write function retry(fn, attempts) where fn returns a promise.
// If fn rejects, retry up to 'attempts' times.
// If all attempts fail, reject with the last error.
`,
      solution: `function retry(fn, attempts) {
  return fn().catch(err => {
    if (attempts <= 1) throw err;
    return retry(fn, attempts - 1);
  });
}`,
      hints: [
        'Call fn() and catch any error.',
        'If attempts remain, recursively retry.',
        'If no attempts left, rethrow the error.',
      ],
      concepts: ['retry', 'catch', 'recursion', 'promise'],
    },
    {
      id: 'js-prom-10i',
      title: 'Promise.any polyfill',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a simplified version of Promise.any.',
      skeleton: `// Write function promiseAny(promises) that:
// - Resolves with the first fulfilled value
// - Rejects with AggregateError if ALL reject
// - AggregateError takes (errors, message)
`,
      solution: `function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    const errors = [];
    let remaining = promises.length;

    if (remaining === 0) {
      reject(new AggregateError([], 'All promises were rejected'));
      return;
    }

    promises.forEach((p, i) => {
      Promise.resolve(p).then(resolve, (err) => {
        errors[i] = err;
        remaining--;
        if (remaining === 0) {
          reject(new AggregateError(errors, 'All promises were rejected'));
        }
      });
    });
  });
}`,
      hints: [
        'Resolve immediately on the first fulfilment.',
        'Track rejections; only reject when all have failed.',
        'Use AggregateError to bundle all rejection reasons.',
      ],
      concepts: ['Promise.any', 'AggregateError', 'Promise'],
    },
    {
      id: 'js-prom-11a',
      title: 'Concurrent limit',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that runs promises with a concurrency limit.',
      skeleton: `// Write function pMap(items, fn, concurrency) where:
// - items: array of inputs
// - fn(item): returns a promise
// - concurrency: max simultaneous promises
// Returns a promise that resolves with all results in order.
`,
      solution: `function pMap(items, fn, concurrency) {
  return new Promise((resolve, reject) => {
    const results = new Array(items.length);
    let running = 0;
    let nextIndex = 0;
    let completed = 0;

    function runNext() {
      while (running < concurrency && nextIndex < items.length) {
        const index = nextIndex++;
        running++;
        Promise.resolve(fn(items[index])).then(
          (result) => {
            results[index] = result;
            running--;
            completed++;
            if (completed === items.length) {
              resolve(results);
            } else {
              runNext();
            }
          },
          reject
        );
      }
    }

    if (items.length === 0) {
      resolve([]);
    } else {
      runNext();
    }
  });
}`,
      hints: [
        'Track how many are currently running.',
        'Start new tasks when a running one completes.',
        'Store results by index to preserve order.',
      ],
      concepts: ['concurrency', 'promise', 'rate limiting'],
    },
    {
      id: 'js-prom-12a',
      title: 'Timeout wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that rejects a promise if it takes too long.',
      skeleton: `// Write function withTimeout(promise, ms) that:
// - Resolves with the promise value if it finishes in time
// - Rejects with new Error('Timeout') if ms elapses first
`,
      solution: `function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), ms);
  });
  return Promise.race([promise, timeout]);
}`,
      hints: [
        'Create a second promise that rejects after ms.',
        'Race the original promise against the timeout.',
        'Promise.race settles with whichever finishes first.',
      ],
      concepts: ['Promise.race', 'timeout', 'setTimeout'],
    },

    // ---- fix-bug (3) ----
    {
      id: 'js-prom-13b',
      title: 'Unhandled rejection',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fix the unhandled promise rejection.',
      skeleton: `function fetchData() {
  return fetch('/api/data')
    .then(res => res.json())
    .then(data => {
      if (!data.valid) {
        throw new Error('Invalid data');
      }
      return data;
    });
}

// Bug: no error handling
fetchData().then(data => console.log(data));`,
      solution: `function fetchData() {
  return fetch('/api/data')
    .then(res => res.json())
    .then(data => {
      if (!data.valid) {
        throw new Error('Invalid data');
      }
      return data;
    });
}

fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err.message));`,
      hints: [
        'If the promise rejects and there is no catch, it is unhandled.',
        'Add a catch at the end of the chain.',
        'Handle the error with .catch(err => ...).',
      ],
      concepts: ['catch', 'unhandled rejection', 'error handling'],
    },
    {
      id: 'js-prom-14i',
      title: 'Broken chain',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the promise chain that swallows a step.',
      skeleton: `function process(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      return transform(data);
    })
    .then(result => console.log(result));
}

function transform(data) {
  return Promise.resolve(data.value * 2);
}

// Bug: process() does not return the chain, so caller cannot await it`,
      solution: `function process(url) {
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      return transform(data);
    })
    .then(result => console.log(result));
}

function transform(data) {
  return Promise.resolve(data.value * 2);
}`,
      hints: [
        'The function creates a promise chain but does not return it.',
        'Without returning, the caller cannot chain or catch errors.',
        'Add `return` before fetch().',
      ],
      concepts: ['promise chain', 'return', 'composability'],
    },
    {
      id: 'js-prom-15a',
      title: 'Promise constructor anti-pattern',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fix the unnecessary Promise constructor wrapping.',
      skeleton: `function getData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}`,
      solution: `function getData(url) {
  return fetch(url).then(res => res.json());
}`,
      hints: [
        'Wrapping an existing promise in new Promise() is an anti-pattern.',
        'fetch() already returns a promise.',
        'Just return the promise chain directly.',
      ],
      concepts: ['promise constructor anti-pattern', 'simplification'],
    },

    // ---- predict-output (3) ----
    {
      id: 'js-prom-16b',
      title: 'Promise.all rejection',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict what happens when one promise in Promise.all rejects.',
      skeleton: `Promise.all([
  Promise.resolve('a'),
  Promise.reject('b'),
  Promise.resolve('c'),
])
  .then(vals => console.log('resolved:', vals))
  .catch(err => console.log('rejected:', err));`,
      solution: `Promise.all([
  Promise.resolve('a'),
  Promise.reject('b'),
  Promise.resolve('c'),
])
  .then(vals => console.log('resolved:', vals))
  .catch(err => console.log('rejected:', err));`,
      expectedOutput: `rejected: b`,
      hints: [
        'Promise.all short-circuits on the first rejection.',
        'It does not wait for the other promises.',
        'The catch receives the rejection reason.',
      ],
      concepts: ['Promise.all', 'rejection', 'short-circuit'],
    },
    {
      id: 'js-prom-17i',
      title: 'Microtask vs macrotask',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the order of microtask vs macrotask execution.',
      skeleton: `console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');`,
      solution: `console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');`,
      expectedOutput: `1
4
3
2`,
      hints: [
        'Synchronous code runs first.',
        'Promise callbacks (microtasks) run before setTimeout (macrotasks).',
        'The order is: sync, microtask, macrotask.',
      ],
      concepts: ['microtask', 'macrotask', 'event loop', 'execution order'],
    },
    {
      id: 'js-prom-18a',
      title: 'then chain values',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict the values flowing through a complex then chain.',
      skeleton: `Promise.resolve(1)
  .then(v => v + 1)
  .then(v => { throw new Error(v); })
  .then(v => v + 1)
  .catch(e => Number(e.message) + 10)
  .then(v => console.log(v));`,
      solution: `Promise.resolve(1)
  .then(v => v + 1)
  .then(v => { throw new Error(v); })
  .then(v => v + 1)
  .catch(e => Number(e.message) + 10)
  .then(v => console.log(v));`,
      expectedOutput: `12`,
      hints: [
        '1 -> then -> 2 -> then throws Error(2).',
        'The third then is skipped (chain is rejected).',
        'catch receives the error, returns 2 + 10 = 12.',
      ],
      concepts: ['promise chain', 'throw', 'catch recovery'],
    },

    // ---- refactor (2) ----
    {
      id: 'js-prom-19i',
      title: 'Callback to promise',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Convert a callback-based function to return a promise.',
      skeleton: `function readFile(path, callback) {
  setTimeout(() => {
    if (path === '') {
      callback(new Error('empty path'), null);
    } else {
      callback(null, 'file contents of ' + path);
    }
  }, 100);
}

// Usage with callback
readFile('test.txt', (err, data) => {
  if (err) console.error(err);
  else console.log(data);
});`,
      solution: `function readFile(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path === '') {
        reject(new Error('empty path'));
      } else {
        resolve('file contents of ' + path);
      }
    }, 100);
  });
}

// Usage with promise
readFile('test.txt')
  .then(data => console.log(data))
  .catch(err => console.error(err));`,
      hints: [
        'Wrap the setTimeout in a new Promise.',
        'Call resolve instead of callback(null, data).',
        'Call reject instead of callback(error).',
      ],
      concepts: ['promisify', 'callback', 'refactor'],
    },
    {
      id: 'js-prom-20a',
      title: 'Nested then to flat chain',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Flatten nested .then() calls into a clean chain.',
      skeleton: `function loadUserData(userId) {
  return fetchUser(userId).then(user => {
    return fetchPosts(user.id).then(posts => {
      return fetchComments(posts[0].id).then(comments => {
        return {
          user,
          posts,
          comments,
        };
      });
    });
  });
}`,
      solution: `function loadUserData(userId) {
  let savedUser;
  let savedPosts;
  return fetchUser(userId)
    .then(user => {
      savedUser = user;
      return fetchPosts(user.id);
    })
    .then(posts => {
      savedPosts = posts;
      return fetchComments(posts[0].id);
    })
    .then(comments => ({
      user: savedUser,
      posts: savedPosts,
      comments,
    }));
}`,
      hints: [
        'Each nested then can be moved to the top level.',
        'Store intermediate values in outer variables.',
        'The flat chain is more readable and avoids callback hell.',
      ],
      concepts: ['promise chain', 'flatten', 'refactor'],
    },
  ],
};
