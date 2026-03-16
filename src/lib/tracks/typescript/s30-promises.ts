import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-promises',
  title: '30. Promises',
  explanation: `## Promises

A **Promise** represents a value that may be available now, later, or never. Promises are the foundation of asynchronous TypeScript.

\\\`\\\`\\\`typescript
const p = new Promise<string>((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});

p.then(value => console.log(value))   // 'done'
 .catch(err => console.error(err))
 .finally(() => console.log('cleanup'));
\\\`\\\`\\\`

Key concepts:
- **Promise<T>** -- resolves to type T
- **then/catch/finally** -- chaining handlers
- **Promise.all** -- wait for all (fails if any fails)
- **Promise.allSettled** -- wait for all (never fails)
- **Promise.race** -- first to settle wins
- **Promise.any** -- first to fulfill wins
- Promises are **eager** -- they start executing immediately
- Unhandled rejections should always be caught`,
  exercises: [
    {
      id: 'ts-promises-1',
      title: 'Promise constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the blank to create a Promise that resolves with a number.',
      skeleton: `const p = new __BLANK__<number>((resolve) => {
  resolve(42);
});`,
      solution: `const p = new Promise<number>((resolve) => {
  resolve(42);
});`,
      hints: [
        'What constructor creates an asynchronous value wrapper?',
        'The Promise constructor takes an executor function with resolve and reject.',
        'Replace __BLANK__ with Promise.',
      ],
      concepts: ['Promise constructor'],
    },
    {
      id: 'ts-promises-2',
      title: 'Promise.resolve/reject',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the blanks to create pre-resolved and pre-rejected promises.',
      skeleton: `const resolved = Promise.__BLANK__('success');
const rejected = Promise.__BLANK__('failure');`,
      solution: `const resolved = Promise.resolve('success');
const rejected = Promise.reject('failure');`,
      hints: [
        'Promise has static methods for creating already-settled promises.',
        'Promise.resolve creates a fulfilled promise. Promise.reject creates a rejected one.',
        'Replace the blanks with resolve and reject.',
      ],
      concepts: ['Promise.resolve/reject'],
    },
    {
      id: 'ts-promises-3',
      title: 'Then/catch/finally',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the chaining methods.',
      skeleton: `Promise.resolve(10)
  .__BLANK__(n => n * 2)
  .__BLANK__(n => console.log(n))
  .__BLANK__(err => console.error(err))
  .__BLANK__(() => console.log('done'));`,
      solution: `Promise.resolve(10)
  .then(n => n * 2)
  .then(n => console.log(n))
  .catch(err => console.error(err))
  .finally(() => console.log('done'));`,
      hints: [
        'then handles the resolved value. catch handles errors. finally runs regardless.',
        'First two transform/use the value (then), third handles errors (catch), fourth always runs (finally).',
        'Replace blanks with then, then, catch, finally.',
      ],
      concepts: ['then/catch/finally'],
    },
    {
      id: 'ts-promises-4',
      title: 'Promise chaining',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What values are logged and in what order?',
      skeleton: `Promise.resolve(1)
  .then(n => {
    console.log(n);
    return n + 1;
  })
  .then(n => {
    console.log(n);
    return n + 1;
  })
  .then(n => {
    console.log(n);
  });`,
      solution: `1
2
3`,
      hints: [
        'Each .then receives the return value of the previous .then.',
        'First logs 1, returns 2. Second logs 2, returns 3. Third logs 3.',
        'Output: 1, 2, 3 on separate lines.',
      ],
      concepts: ['Promise chaining'],
    },
    {
      id: 'ts-promises-5',
      title: 'Typed Promises',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add the correct type annotation to the Promise.',
      skeleton: `function fetchUser(): Promise<__BLANK__> {
  return Promise.resolve({ name: 'Alice', age: 30 });
}`,
      solution: `function fetchUser(): Promise<{ name: string; age: number }> {
  return Promise.resolve({ name: 'Alice', age: 30 });
}`,
      hints: [
        'The Promise resolves to an object with name and age.',
        'Describe the shape of the resolved value.',
        'Replace __BLANK__ with { name: string; age: number }.',
      ],
      concepts: ['typed Promises'],
    },
    {
      id: 'ts-promises-6',
      title: 'Promise<void>',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a function delay(ms: number): Promise<void> that resolves after a given number of milliseconds.',
      skeleton: `// Write the delay function
`,
      solution: `function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}`,
      hints: [
        'Use setTimeout inside a Promise constructor.',
        'Pass resolve directly to setTimeout as the callback.',
        'new Promise<void>(resolve => setTimeout(resolve, ms));',
      ],
      concepts: ['Promise<void>', 'creating delay function'],
    },
    {
      id: 'ts-promises-7',
      title: 'Promise.all',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function fetchAll that takes an array of URLs and returns Promise<string[]> using Promise.all and fetch.',
      skeleton: `// Write the fetchAll function
`,
      solution: `async function fetchAll(urls: string[]): Promise<string[]> {
  const promises = urls.map(url =>
    fetch(url).then(res => res.text())
  );
  return Promise.all(promises);
}`,
      hints: [
        'Map each URL to a fetch promise, then use Promise.all.',
        'Promise.all takes an array of promises and returns a promise of an array.',
        'urls.map(url => fetch(url).then(r => r.text())) gives the array. Promise.all wraps it.',
      ],
      concepts: ['Promise.all'],
    },
    {
      id: 'ts-promises-8',
      title: 'Promise.allSettled',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function tryAll that takes an array of promises and returns an object with successes and failures arrays using Promise.allSettled.',
      skeleton: `// Write the tryAll function
`,
      solution: `async function tryAll<T>(
  promises: Promise<T>[]
): Promise<{ successes: T[]; failures: unknown[] }> {
  const results = await Promise.allSettled(promises);
  const successes: T[] = [];
  const failures: unknown[] = [];

  for (const result of results) {
    if (result.status === 'fulfilled') {
      successes.push(result.value);
    } else {
      failures.push(result.reason);
    }
  }

  return { successes, failures };
}`,
      hints: [
        'Promise.allSettled never rejects -- it returns an array of result objects.',
        'Each result has status "fulfilled" or "rejected".',
        'Filter results by status: fulfilled gives .value, rejected gives .reason.',
      ],
      concepts: ['Promise.allSettled'],
    },
    {
      id: 'ts-promises-9',
      title: 'Promise.race',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function timeout<T>(promise: Promise<T>, ms: number): Promise<T> that rejects if the promise does not resolve within ms milliseconds.',
      skeleton: `// Write the timeout function
`,
      solution: `function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timer = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), ms);
  });
  return Promise.race([promise, timer]);
}`,
      hints: [
        'Create a rejection promise with setTimeout and race it against the original.',
        'Promise.race returns the first promise to settle.',
        'Race the original promise against a timer promise that rejects after ms.',
      ],
      concepts: ['Promise.race'],
    },
    {
      id: 'ts-promises-10',
      title: 'Promise.any',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What does Promise.any resolve to, and when does it reject?',
      skeleton: `const p1 = Promise.reject('error 1');
const p2 = new Promise(resolve => setTimeout(() => resolve('fast'), 100));
const p3 = new Promise(resolve => setTimeout(() => resolve('slow'), 500));

const result = await Promise.any([p1, p2, p3]);
console.log(result);`,
      solution: `'fast' -- Promise.any resolves with the first fulfilled promise, ignoring rejections. p1 rejects immediately but p2 resolves first at 100ms. If ALL promises reject, Promise.any rejects with an AggregateError.`,
      hints: [
        'Promise.any resolves with the first fulfilled (not settled) promise.',
        'Rejections are ignored unless all promises reject.',
        'p1 rejects, p2 fulfills first at 100ms with "fast".',
      ],
      concepts: ['Promise.any'],
    },
    {
      id: 'ts-promises-11',
      title: 'Promisifying callbacks',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function readFileAsync that wraps a callback-style readFile into a Promise. Simulate readFile with a callback pattern.',
      skeleton: `// Simulated callback-style function
function readFile(path: string, callback: (err: Error | null, data: string | null) => void): void {
  setTimeout(() => callback(null, 'file content'), 100);
}

// Write readFileAsync that returns Promise<string>
`,
      solution: `function readFile(path: string, callback: (err: Error | null, data: string | null) => void): void {
  setTimeout(() => callback(null, 'file content'), 100);
}

function readFileAsync(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data!);
      }
    });
  });
}`,
      hints: [
        'Wrap the callback-style function in a new Promise.',
        'In the callback: if err, reject. If data, resolve.',
        'new Promise((resolve, reject) => { readFile(path, (err, data) => err ? reject(err) : resolve(data!)); });',
      ],
      concepts: ['promisifying callbacks'],
    },
    {
      id: 'ts-promises-12',
      title: 'Promise.all with tuple types',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fill in the blank type to get a properly typed tuple from Promise.all.',
      skeleton: `async function loadData(): Promise<__BLANK__> {
  const result = await Promise.all([
    Promise.resolve('Alice'),
    Promise.resolve(30),
    Promise.resolve(true),
  ]);
  return result;
}`,
      solution: `async function loadData(): Promise<[string, number, boolean]> {
  const result = await Promise.all([
    Promise.resolve('Alice'),
    Promise.resolve(30),
    Promise.resolve(true),
  ]);
  return result;
}`,
      hints: [
        'Promise.all with a tuple of different promise types returns a tuple.',
        'The resolved types are string, number, boolean.',
        'Replace __BLANK__ with [string, number, boolean].',
      ],
      concepts: ['Promise.all with tuple types'],
    },
    {
      id: 'ts-promises-13',
      title: 'Sequential vs parallel',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function runSequential that takes an array of functions returning promises and runs them one after another (not in parallel), returning all results.',
      skeleton: `// Write runSequential
`,
      solution: `async function runSequential<T>(
  tasks: (() => Promise<T>)[]
): Promise<T[]> {
  const results: T[] = [];
  for (const task of tasks) {
    const result = await task();
    results.push(result);
  }
  return results;
}`,
      hints: [
        'Use a for loop with await to run tasks one at a time.',
        'Do NOT use Promise.all -- that runs in parallel.',
        'for (const task of tasks) { results.push(await task()); }',
      ],
      concepts: ['sequential vs parallel'],
    },
    {
      id: 'ts-promises-14',
      title: 'Fix unhandled rejection',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This code has an unhandled promise rejection. Add proper error handling.',
      skeleton: `async function riskyOperation(): Promise<string> {
  throw new Error('Something went wrong');
}

// Bug: no error handling
async function main() {
  const result = await riskyOperation();
  console.log(result);
}

main();`,
      solution: `async function riskyOperation(): Promise<string> {
  throw new Error('Something went wrong');
}

async function main() {
  try {
    const result = await riskyOperation();
    console.log(result);
  } catch (error) {
    console.error('Failed:', error);
  }
}

main();`,
      hints: [
        'Await can throw if the promise rejects.',
        'Wrap the await in a try/catch block.',
        'try { const result = await riskyOperation(); } catch (error) { console.error(error); }',
      ],
      concepts: ['unhandled rejections', 'Promise error types'],
    },
    {
      id: 'ts-promises-15',
      title: 'Promise error types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function safeFetch<T>(url: string): Promise<{ data: T | null; error: string | null }> that never throws, wrapping fetch errors into the return value.',
      skeleton: `// Write the safeFetch function
`,
      solution: `async function safeFetch<T>(url: string): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { data: null, error: \`HTTP \${response.status}\` };
    }
    const data = await response.json() as T;
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e.message : String(e) };
  }
}`,
      hints: [
        'Wrap the entire fetch in try/catch and return a result object.',
        'On success: { data, error: null }. On failure: { data: null, error: message }.',
        'Check response.ok for HTTP errors. Catch for network errors.',
      ],
      concepts: ['Promise error types'],
    },
    {
      id: 'ts-promises-16',
      title: 'Promise combinators',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What does this code log?',
      skeleton: `const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).then(values => {
  console.log(values.reduce((a, b) => a + b, 0));
});`,
      solution: `6`,
      hints: [
        'Promise.all resolves to [1, 2, 3].',
        'reduce adds them: 0 + 1 + 2 + 3 = 6.',
        'Output is 6.',
      ],
      concepts: ['promise combinators', 'Promise.all'],
    },
    {
      id: 'ts-promises-17',
      title: 'Fix promise memory leak',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This timeout function creates a timer that is never cleaned up if the promise resolves first. Fix the memory leak.',
      skeleton: `function timeoutRace<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timer = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), ms);
    // Bug: timer keeps running even if promise resolves first
  });
  return Promise.race([promise, timer]);
}`,
      solution: `function timeoutRace<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timerId: ReturnType<typeof setTimeout>;
  const timer = new Promise<never>((_, reject) => {
    timerId = setTimeout(() => reject(new Error('Timeout')), ms);
  });
  return Promise.race([promise, timer]).finally(() => {
    clearTimeout(timerId);
  });
}`,
      hints: [
        'Store the setTimeout return value so you can clear it.',
        'Use .finally() to clean up the timer regardless of outcome.',
        'Store timerId = setTimeout(...). In .finally(() => clearTimeout(timerId)).',
      ],
      concepts: ['promise memory leaks'],
    },
    {
      id: 'ts-promises-18',
      title: 'Promise anti-patterns',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this code to remove the unnecessary Promise constructor (explicit construction anti-pattern).',
      skeleton: `function getUser(id: string): Promise<{ name: string }> {
  return new Promise((resolve, reject) => {
    fetch(\`/api/users/\${id}\`)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}`,
      solution: `function getUser(id: string): Promise<{ name: string }> {
  return fetch(\`/api/users/\${id}\`).then(res => res.json());
}`,
      hints: [
        'fetch already returns a Promise -- no need to wrap it in another Promise.',
        'This is the "explicit construction anti-pattern" -- wrapping an existing promise in new Promise.',
        'Just return the fetch chain directly: return fetch(...).then(res => res.json());',
      ],
      concepts: ['promise anti-patterns'],
    },
    {
      id: 'ts-promises-19',
      title: 'Practical: retry with delay',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function retryWithDelay<T>(fn: () => Promise<T>, retries: number, delayMs: number): Promise<T> that retries a failing operation with a delay between attempts.',
      skeleton: `// Write the retryWithDelay function
`,
      solution: `async function retryWithDelay<T>(
  fn: () => Promise<T>,
  retries: number,
  delayMs: number
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      if (i < retries) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }
  throw lastError;
}`,
      hints: [
        'Loop retries + 1 times (initial attempt + retries).',
        'After each failure (except the last), await a delay promise.',
        'for loop with try/catch. On catch: if more retries, await delay. After all retries, throw.',
      ],
      concepts: ['practical promise patterns'],
    },
    {
      id: 'ts-promises-20',
      title: 'Practical: promise pool',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function pool<T>(tasks: (() => Promise<T>)[], concurrency: number): Promise<T[]> that runs promises with a maximum concurrency limit.',
      skeleton: `// Write the pool function
`,
      solution: `async function pool<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let index = 0;

  async function runNext(): Promise<void> {
    while (index < tasks.length) {
      const currentIndex = index++;
      results[currentIndex] = await tasks[currentIndex]();
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, tasks.length) },
    () => runNext()
  );

  await Promise.all(workers);
  return results;
}`,
      hints: [
        'Create N worker promises that each grab the next task from a shared index.',
        'Each worker loops: grab next index, run that task, repeat until no tasks left.',
        'Promise.all on the workers waits for all to finish. Results stored by index.',
      ],
      concepts: ['practical promise patterns', 'sequential vs parallel'],
    },
  ],
};
