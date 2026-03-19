import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-async-await',
  title: '31. Async/Await',
  explanation: `## Async/Await

Async/await is syntactic sugar over Promises that makes asynchronous code read like synchronous code.

### async Function Declaration
Adding \\\`async\\\` before a function makes it return a Promise. Inside, you can use \\\`await\\\` to pause execution until a Promise resolves.

### Error Handling
Use \\\`try/catch\\\` blocks around \\\`await\\\` expressions to handle rejections -- just like synchronous error handling.

### Sequential vs Parallel
\\\`await\\\` pauses execution, so sequential awaits run one after another. Use \\\`Promise.all\\\` to run independent operations in parallel.

### Async Generators
Combine \\\`async\\\` with \\\`function*\\\` to create async generators. Consume them with \\\`for await...of\\\`.

### Cancellation
Use \\\`AbortController\\\` to cancel async operations. Pass the signal to fetch or custom async functions.

### Key Rules
- \\\`await\\\` can only be used inside an \\\`async\\\` function (or at top level in ES modules).
- An \\\`async\\\` function always returns a Promise.
- Avoid \\\`await\\\` inside \\\`forEach\\\` -- use \\\`for...of\\\` instead for sequential iteration.
`,
  exercises: [
    {
      id: 'ts-async-1',
      title: 'Basic async function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Declare an async function called greet that returns the string "hello".',
      skeleton: `__BLANK__ function greet(): Promise<string> {
  return "hello";
}`,
      solution: `async function greet(): Promise<string> {
  return "hello";
}`,
      hints: [
        'Which keyword makes a function return a Promise automatically?',
        'The async keyword goes before the function keyword.',
        'The answer is: async',
      ],
      concepts: ['async', 'function declaration', 'Promise'],
    },
    {
      id: 'ts-async-2',
      title: 'Await a promise',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use await to get the resolved value from fetchData().',
      skeleton: `async function fetchData(): Promise<string> {
  return "data";
}

async function main() {
  const result = __BLANK__ fetchData();
  console.log(result);
}`,
      solution: `async function fetchData(): Promise<string> {
  return "data";
}

async function main() {
  const result = await fetchData();
  console.log(result);
}`,
      hints: [
        'Which keyword pauses execution until a Promise resolves?',
        'Use await before the Promise-returning function call.',
        'The answer is: await',
      ],
      concepts: ['await', 'Promise resolution'],
    },
    {
      id: 'ts-async-3',
      title: 'Async arrow function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write an async arrow function that returns a number.',
      skeleton: `const getNumber = __BLANK__ (): Promise<number> => {
  return 42;
};`,
      solution: `const getNumber = async (): Promise<number> => {
  return 42;
};`,
      hints: [
        'Arrow functions can also be async.',
        'Place the async keyword before the parameter list.',
        'The answer is: async',
      ],
      concepts: ['async', 'arrow function', 'Promise'],
    },
    {
      id: 'ts-async-4',
      title: 'Predict async return',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code log? (Consider the Promise wrapping behavior of async.)',
      skeleton: `async function getValue() {
  return 5;
}

getValue().then(v => console.log(typeof v, v));`,
      solution: `number 5`,
      hints: [
        'async functions wrap their return value in a Promise.',
        'The .then callback receives the resolved value, which is 5.',
        'typeof 5 is "number", so the output is: number 5',
      ],
      concepts: ['async return value', 'Promise wrapping', 'typeof'],
    },
    {
      id: 'ts-async-5',
      title: 'Try/catch with await',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add error handling around the await expression.',
      skeleton: `async function safeFetch(url: string): Promise<string> {
  __BLANK__ {
    const response = await fetch(url);
    return await response.text();
  } __BLANK__ (error) {
    return "fetch failed";
  }
}`,
      solution: `async function safeFetch(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    return "fetch failed";
  }
}`,
      hints: [
        'Error handling with await uses the same keywords as synchronous code.',
        'Wrap the await in try { } catch (error) { }.',
        'The blanks are: try and catch',
      ],
      concepts: ['try/catch', 'async error handling', 'await'],
    },
    {
      id: 'ts-async-6',
      title: 'Async method in class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the async method inside the class.',
      skeleton: `class DataService {
  __BLANK__ getData(): Promise<string[]> {
    return ["item1", "item2"];
  }
}`,
      solution: `class DataService {
  async getData(): Promise<string[]> {
    return ["item1", "item2"];
  }
}`,
      hints: [
        'Class methods can be async just like regular functions.',
        'Place async before the method name.',
        'The answer is: async',
      ],
      concepts: ['async method', 'class', 'Promise'],
    },
    {
      id: 'ts-async-7',
      title: 'Fix: await in forEach',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This code tries to process items sequentially but forEach does not await. Fix it using for...of.',
      skeleton: `async function processItems(items: string[]): Promise<void> {
  items.forEach(async (item) => {
    await processItem(item);
    console.log(\\\`Processed: \${item}\\\`);
  });
  console.log("All done");
}

async function processItem(item: string): Promise<void> {
  // simulated async work
}`,
      solution: `async function processItems(items: string[]): Promise<void> {
  for (const item of items) {
    await processItem(item);
    console.log(\\\`Processed: \${item}\\\`);
  }
  console.log("All done");
}

async function processItem(item: string): Promise<void> {
  // simulated async work
}`,
      hints: [
        'forEach does not wait for async callbacks to complete.',
        'Use a for...of loop instead to properly await each iteration.',
        'Replace items.forEach(async (item) => { ... }) with for (const item of items) { ... }',
      ],
      concepts: ['for-of', 'await in loops', 'forEach pitfall'],
    },
    {
      id: 'ts-async-8',
      title: 'Sequential vs parallel await',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Rewrite this sequential code to run both fetches in parallel using Promise.all.',
      skeleton: `async function fetchBoth(): Promise<[string, string]> {
  // Currently sequential -- make parallel
  const a = await fetchUser();
  const b = await fetchPosts();
  return [a, b];
}

async function fetchUser(): Promise<string> { return "user"; }
async function fetchPosts(): Promise<string> { return "posts"; }`,
      solution: `async function fetchBoth(): Promise<[string, string]> {
  const [a, b] = await Promise.all([fetchUser(), fetchPosts()]);
  return [a, b];
}

async function fetchUser(): Promise<string> { return "user"; }
async function fetchPosts(): Promise<string> { return "posts"; }`,
      hints: [
        'Promise.all takes an array of promises and resolves when all complete.',
        'Start both promises without await, then await Promise.all.',
        'const [a, b] = await Promise.all([fetchUser(), fetchPosts()]);',
      ],
      concepts: ['Promise.all', 'parallel execution', 'sequential vs parallel'],
    },
    {
      id: 'ts-async-9',
      title: 'Async IIFE',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an async immediately-invoked function expression (IIFE) that logs "started" then awaits a delay then logs "done".',
      skeleton: `function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Write an async IIFE that logs "started", waits 100ms, then logs "done"
`,
      solution: `function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  console.log("started");
  await delay(100);
  console.log("done");
})();`,
      hints: [
        'An IIFE is a function that is defined and called immediately.',
        'Wrap an async arrow function in parentheses and invoke it: (async () => { ... })()',
        '(async () => { console.log("started"); await delay(100); console.log("done"); })();',
      ],
      concepts: ['IIFE', 'async', 'immediately invoked'],
    },
    {
      id: 'ts-async-10',
      title: 'Promise.all with await',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an async function that takes an array of URLs and fetches them all in parallel, returning an array of response texts.',
      skeleton: `async function fetchAll(urls: string[]): Promise<string[]> {
  // Fetch all URLs in parallel and return their text content
}`,
      solution: `async function fetchAll(urls: string[]): Promise<string[]> {
  const responses = await Promise.all(urls.map(url => fetch(url)));
  return Promise.all(responses.map(r => r.text()));
}`,
      hints: [
        'Use urls.map to create an array of fetch promises.',
        'Await Promise.all on the array of promises.',
        'await Promise.all(urls.map(url => fetch(url))) then map each response to .text()',
      ],
      concepts: ['Promise.all', 'map', 'parallel fetching'],
    },
    {
      id: 'ts-async-11',
      title: 'Async generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an async generator function that yields numbers 1, 2, 3 with a delay between each.',
      skeleton: `function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Write an async generator that yields 1, 2, 3 with 100ms delay between each
`,
      solution: `function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function* countSlow(): AsyncGenerator<number> {
  for (let i = 1; i <= 3; i++) {
    await delay(100);
    yield i;
  }
}`,
      hints: [
        'An async generator combines async and function* syntax.',
        'Use async function* name() and yield values after awaiting.',
        'async function* countSlow() { for (let i = 1; i <= 3; i++) { await delay(100); yield i; } }',
      ],
      concepts: ['async generator', 'yield', 'AsyncGenerator'],
    },
    {
      id: 'ts-async-12',
      title: 'for-await-of',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Consume the async iterable using for-await-of.',
      skeleton: `async function* generate(): AsyncGenerator<number> {
  yield 1;
  yield 2;
  yield 3;
}

async function consume() {
  __BLANK__ (const num of generate()) {
    console.log(num);
  }
}`,
      solution: `async function* generate(): AsyncGenerator<number> {
  yield 1;
  yield 2;
  yield 3;
}

async function consume() {
  for await (const num of generate()) {
    console.log(num);
  }
}`,
      hints: [
        'Async iterables need a special for loop variant.',
        'Use for await instead of just for.',
        'The answer is: for await',
      ],
      concepts: ['for-await-of', 'async iterable', 'async generator'],
    },
    {
      id: 'ts-async-13',
      title: 'Async function return type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an async function with an explicit return type annotation that fetches a user object with id and name properties.',
      skeleton: `interface User {
  id: number;
  name: string;
}

// Write async function getUser that returns Promise<User>
`,
      solution: `interface User {
  id: number;
  name: string;
}

async function getUser(): Promise<User> {
  return { id: 1, name: "Alice" };
}`,
      hints: [
        'An async function that returns T has return type Promise<T>.',
        'Annotate the return type as Promise<User>.',
        'async function getUser(): Promise<User> { return { id: 1, name: "Alice" }; }',
      ],
      concepts: ['async return type', 'Promise<T>', 'type annotation'],
    },
    {
      id: 'ts-async-14',
      title: 'Void async function',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What does this code log? Consider the order of async execution.',
      skeleton: `async function logLater(): Promise<void> {
  await Promise.resolve();
  console.log("B");
}

console.log("A");
logLater();
console.log("C");`,
      solution: `A
C
B`,
      hints: [
        'await Promise.resolve() yields control back to the caller.',
        'The synchronous console.log("C") runs before the awaited continuation.',
        'Output is: A, C, B',
      ],
      concepts: ['async execution order', 'microtask queue', 'void async'],
    },
    {
      id: 'ts-async-15',
      title: 'Async with generics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generic async function fetchAndParse<T> that takes a URL and a parser function, fetches the URL, and returns the parsed result.',
      skeleton: `// Write fetchAndParse<T>(url: string, parser: (text: string) => T): Promise<T>
`,
      solution: `async function fetchAndParse<T>(url: string, parser: (text: string) => T): Promise<T> {
  const response = await fetch(url);
  const text = await response.text();
  return parser(text);
}`,
      hints: [
        'Use a generic type parameter T for the parser return type.',
        'The function is async and returns Promise<T>.',
        'async function fetchAndParse<T>(url: string, parser: (text: string) => T): Promise<T> { ... }',
      ],
      concepts: ['generics', 'async', 'higher-order function'],
    },
    {
      id: 'ts-async-16',
      title: 'AbortController cancellation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write an async function fetchWithTimeout that cancels a fetch if it takes longer than a given timeout in milliseconds.',
      skeleton: `// Write fetchWithTimeout(url: string, timeoutMs: number): Promise<Response>
// Use AbortController to cancel after timeoutMs
`,
      solution: `async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}`,
      hints: [
        'Create an AbortController and pass its signal to fetch.',
        'Use setTimeout to call controller.abort() after the timeout.',
        'Clear the timeout in a finally block to prevent leaks.',
      ],
      concepts: ['AbortController', 'cancellation', 'fetch signal', 'timeout'],
    },
    {
      id: 'ts-async-17',
      title: 'Async error propagation',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What does this code log? Trace the error propagation.',
      skeleton: `async function inner(): Promise<string> {
  throw new Error("fail");
}

async function outer(): Promise<string> {
  try {
    return await inner();
  } catch (e: any) {
    return "caught: " + e.message;
  }
}

outer().then(console.log);`,
      solution: `caught: fail`,
      hints: [
        'inner() throws, and outer() catches it with try/catch.',
        'The catch block returns a string that becomes the resolved value.',
        'Output is: caught: fail',
      ],
      concepts: ['error propagation', 'try/catch', 'async'],
    },
    {
      id: 'ts-async-18',
      title: 'Fix: missing await',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This function returns a Promise instead of the actual value because await is missing. Fix it.',
      skeleton: `async function getUserName(): Promise<string> {
  return "Alice";
}

async function greetUser(): Promise<string> {
  const name = getUserName();
  return \\\`Hello, \${name}!\\\`;
}

// greetUser() resolves to "Hello, [object Promise]!" -- fix it`,
      solution: `async function getUserName(): Promise<string> {
  return "Alice";
}

async function greetUser(): Promise<string> {
  const name = await getUserName();
  return \\\`Hello, \${name}!\\\`;
}`,
      hints: [
        'getUserName() returns a Promise, not a string directly.',
        'You need to await the Promise to get its resolved value.',
        'Add await before getUserName(): const name = await getUserName();',
      ],
      concepts: ['missing await', 'Promise vs value', 'debugging'],
    },
    {
      id: 'ts-async-19',
      title: 'Refactor callbacks to async/await',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this callback-based code to use async/await.',
      skeleton: `function loadData(): Promise<string> {
  return fetch("/api/data")
    .then(response => response.json())
    .then(data => data.name)
    .catch(err => "unknown");
}`,
      solution: `async function loadData(): Promise<string> {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();
    return data.name;
  } catch (err) {
    return "unknown";
  }
}`,
      hints: [
        'Replace .then chains with await expressions.',
        'Replace .catch with a try/catch block.',
        'Each .then becomes an await, and .catch becomes catch (err) { }.',
      ],
      concepts: ['refactoring', 'callback to async/await', 'try/catch'],
    },
    {
      id: 'ts-async-20',
      title: 'Refactor: retry pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this retry function to use async/await instead of recursive Promises.',
      skeleton: `function fetchWithRetry(url: string, retries: number): Promise<Response> {
  return fetch(url).catch((err) => {
    if (retries <= 0) throw err;
    return fetchWithRetry(url, retries - 1);
  });
}`,
      solution: `async function fetchWithRetry(url: string, retries: number): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fetch(url);
    } catch (err) {
      if (i === retries) throw err;
    }
  }
  throw new Error("unreachable");
}`,
      hints: [
        'Replace recursion with a for loop and try/catch.',
        'Loop retries + 1 times, returning on success, rethrowing on final failure.',
        'Use a for loop from 0 to retries, try/catch inside, throw on last iteration.',
      ],
      concepts: ['retry pattern', 'refactoring', 'async/await', 'error recovery'],
    },
  ],
};
