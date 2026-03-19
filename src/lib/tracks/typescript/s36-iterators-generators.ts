import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-iter-gen',
  title: '36. Iterators & Generators',
  explanation: `## Iterators & Generators

Iterators and generators provide a protocol for traversing data structures and producing sequences lazily.

### Iterator Protocol
An object is an iterator when it has a \\\`next()\\\` method that returns \\\`{ value, done }\\\`.

### Iterable Protocol
An object is iterable when it has a \\\`[Symbol.iterator]()\\\` method that returns an iterator. This enables use with \\\`for...of\\\`, spread, and destructuring.

### Generator Functions
\\\`function*\\\` declares a generator. Inside, \\\`yield\\\` pauses execution and produces a value. The generator resumes when \\\`next()\\\` is called again.

### yield*
Delegates to another iterable or generator, yielding each of its values.

### Lazy Evaluation
Generators compute values on demand, making them memory-efficient for large or infinite sequences.

### Async Generators
Combine \\\`async function*\\\` with \\\`yield\\\` to create async iterables consumed by \\\`for await...of\\\`.

### Key Types
- \\\`Iterator<T>\\\` -- has next(): IteratorResult<T>
- \\\`Iterable<T>\\\` -- has [Symbol.iterator](): Iterator<T>
- \\\`IterableIterator<T>\\\` -- both at once (what generators return)
`,
  exercises: [
    {
      id: 'ts-iter-gen-1',
      title: 'Basic generator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Declare a generator function using the correct syntax.',
      skeleton: `function__BLANK__ count(): Generator<number> {
  yield 1;
  yield 2;
  yield 3;
}`,
      solution: `function* count(): Generator<number> {
  yield 1;
  yield 2;
  yield 3;
}`,
      hints: [
        'Generator functions use a special character after the function keyword.',
        'The asterisk * marks a function as a generator.',
        'The answer is: * (function*)',
      ],
      concepts: ['generator function', 'function*', 'yield'],
    },
    {
      id: 'ts-iter-gen-2',
      title: 'Yield keyword',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use yield to produce values from the generator.',
      skeleton: `function* greetings(): Generator<string> {
  __BLANK__ "hello";
  __BLANK__ "world";
}`,
      solution: `function* greetings(): Generator<string> {
  yield "hello";
  yield "world";
}`,
      hints: [
        'Which keyword pauses a generator and produces a value?',
        'Use yield to emit a value from a generator function.',
        'The answer is: yield',
      ],
      concepts: ['yield', 'generator output'],
    },
    {
      id: 'ts-iter-gen-3',
      title: 'Consume with for-of',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use for...of to consume the generator.',
      skeleton: `function* nums(): Generator<number> {
  yield 10;
  yield 20;
  yield 30;
}

__BLANK__ (const n of nums()) {
  console.log(n);
}`,
      solution: `function* nums(): Generator<number> {
  yield 10;
  yield 20;
  yield 30;
}

for (const n of nums()) {
  console.log(n);
}`,
      hints: [
        'Generators implement the iterable protocol.',
        'Use for...of to iterate over the yielded values.',
        'The answer is: for',
      ],
      concepts: ['for-of', 'iterable protocol', 'generator consumption'],
    },
    {
      id: 'ts-iter-gen-4',
      title: 'Predict generator output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code log?',
      skeleton: `function* abc(): Generator<string> {
  yield "a";
  yield "b";
  yield "c";
}

const gen = abc();
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().done);`,
      solution: `a
b
false`,
      hints: [
        'Each gen.next() advances to the next yield.',
        'First next() gives "a", second gives "b".',
        'Third next() returns "c" with done: false (done is true only after all yields).',
      ],
      concepts: ['generator.next()', 'IteratorResult', 'value and done'],
    },
    {
      id: 'ts-iter-gen-5',
      title: 'Symbol.iterator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Implement Symbol.iterator on a custom class to make it iterable.',
      skeleton: `class Range {
  constructor(public start: number, public end: number) {}

  [__BLANK__](): Iterator<number> {
    let current = this.start;
    const end = this.end;
    return {
      next(): IteratorResult<number> {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}`,
      solution: `class Range {
  constructor(public start: number, public end: number) {}

  [Symbol.iterator](): Iterator<number> {
    let current = this.start;
    const end = this.end;
    return {
      next(): IteratorResult<number> {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}`,
      hints: [
        'The iterable protocol requires a method keyed by Symbol.iterator.',
        'Use Symbol.iterator as a computed property name.',
        'The answer is: Symbol.iterator',
      ],
      concepts: ['Symbol.iterator', 'iterable protocol', 'custom iterable'],
    },
    {
      id: 'ts-iter-gen-6',
      title: 'Spread with iterable',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a generator that yields 1, 2, 3 and use spread to collect into an array.',
      skeleton: `// Write a generator that yields 1, 2, 3
// Then use spread to collect into an array and log it
`,
      solution: `function* oneTwo Three(): Generator<number> {
  yield 1;
  yield 2;
  yield 3;
}

const arr = [...oneTwoThree()];
console.log(arr); // [1, 2, 3]`,
      hints: [
        'Spread (...) works with any iterable, including generators.',
        'const arr = [...generatorFunction()] collects all yielded values.',
        'function* gen() { yield 1; yield 2; yield 3; } const arr = [...gen()];',
      ],
      concepts: ['spread operator', 'iterable', 'array from generator'],
    },
    {
      id: 'ts-iter-gen-7',
      title: 'Custom iterable class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a Fibonacci class that implements Iterable<number> and yields the first n Fibonacci numbers.',
      skeleton: `// Write class Fibonacci that takes n in constructor
// Implement [Symbol.iterator] to yield n Fibonacci numbers
`,
      solution: `class Fibonacci implements Iterable<number> {
  constructor(private n: number) {}

  *[Symbol.iterator](): Iterator<number> {
    let a = 0;
    let b = 1;
    for (let i = 0; i < this.n; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

for (const num of new Fibonacci(7)) {
  console.log(num);
}`,
      hints: [
        'Implement the Iterable<number> interface with [Symbol.iterator].',
        'Use a generator method (*[Symbol.iterator]()) for cleaner code.',
        'Track two variables a and b, yield a, then shift: [a, b] = [b, a + b].',
      ],
      concepts: ['Iterable interface', 'Fibonacci', 'generator method'],
    },
    {
      id: 'ts-iter-gen-8',
      title: 'yield* delegation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generator that uses yield* to delegate to two other generators.',
      skeleton: `function* letters(): Generator<string> {
  yield "a";
  yield "b";
}

function* numbers(): Generator<number> {
  yield 1;
  yield 2;
}

// Write a combined generator that yields from both using yield*
`,
      solution: `function* letters(): Generator<string> {
  yield "a";
  yield "b";
}

function* numbers(): Generator<number> {
  yield 1;
  yield 2;
}

function* combined(): Generator<string | number> {
  yield* letters();
  yield* numbers();
}

console.log([...combined()]); // ["a", "b", 1, 2]`,
      hints: [
        'yield* delegates to another iterable, yielding each of its values.',
        'Use yield* generatorFunction() to emit all values from another generator.',
        'function* combined() { yield* letters(); yield* numbers(); }',
      ],
      concepts: ['yield*', 'generator delegation', 'composition'],
    },
    {
      id: 'ts-iter-gen-9',
      title: 'Infinite sequence',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an infinite generator that yields natural numbers starting from 1.',
      skeleton: `// Write an infinite generator naturals() that yields 1, 2, 3, ...
`,
      solution: `function* naturals(): Generator<number> {
  let n = 1;
  while (true) {
    yield n++;
  }
}

// Usage: take first 5
const gen = naturals();
for (let i = 0; i < 5; i++) {
  console.log(gen.next().value);
}`,
      hints: [
        'Use an infinite while(true) loop with yield inside.',
        'The generator pauses at each yield, so it does not actually loop infinitely.',
        'function* naturals() { let n = 1; while (true) { yield n++; } }',
      ],
      concepts: ['infinite generator', 'lazy evaluation', 'while true'],
    },
    {
      id: 'ts-iter-gen-10',
      title: 'Generator with return',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What does gen.return() do to a generator?',
      skeleton: `function* counter(): Generator<number> {
  yield 1;
  yield 2;
  yield 3;
}

const gen = counter();
console.log(gen.next().value);
console.log(gen.return(99).value);
console.log(gen.next().done);`,
      solution: `1
99
true`,
      hints: [
        'gen.return(value) terminates the generator and returns the given value.',
        'After return(), the generator is done.',
        'Output: 1, 99, true',
      ],
      concepts: ['generator.return()', 'early termination'],
    },
    {
      id: 'ts-iter-gen-11',
      title: 'Generator throw',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generator that uses try/catch to handle thrown errors via gen.throw().',
      skeleton: `// Write a generator resilientCounter that:
// - yields incrementing numbers
// - catches errors thrown into it with gen.throw()
// - logs the error message and continues yielding
`,
      solution: `function* resilientCounter(): Generator<number, void, never> {
  let count = 0;
  while (true) {
    try {
      yield count++;
    } catch (e: any) {
      console.log("Caught:", e.message);
    }
  }
}

const gen = resilientCounter();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
gen.throw(new Error("reset"));  // Caught: reset
console.log(gen.next().value); // 2`,
      hints: [
        'Wrap yield in try/catch inside the generator to handle gen.throw().',
        'gen.throw() causes the yield expression to throw inside the generator.',
        'The generator can catch the error and continue yielding.',
      ],
      concepts: ['generator.throw()', 'error handling in generators'],
    },
    {
      id: 'ts-iter-gen-12',
      title: 'Take utility',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a take<T> function that takes the first n values from any iterable.',
      skeleton: `// Write function take<T>(n: number, iterable: Iterable<T>): T[]
`,
      solution: `function take<T>(n: number, iterable: Iterable<T>): T[] {
  const result: T[] = [];
  for (const item of iterable) {
    if (result.length >= n) break;
    result.push(item);
  }
  return result;
}`,
      hints: [
        'Use for...of to iterate and break after collecting n items.',
        'Works with any iterable, including generators.',
        'Collect items into an array, break when length reaches n.',
      ],
      concepts: ['generic function', 'Iterable<T>', 'lazy consumption'],
    },
    {
      id: 'ts-iter-gen-13',
      title: 'Fix: non-iterable object',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This code tries to iterate an object with for...of but fails because it is not iterable. Fix it by adding Symbol.iterator.',
      skeleton: `const config = {
  host: "localhost",
  port: 3000,
  debug: true,
};

// Error: config is not iterable
for (const [key, value] of config) {
  console.log(key, value);
}`,
      solution: `const config = {
  host: "localhost",
  port: 3000,
  debug: true,

  *[Symbol.iterator](): Generator<[string, unknown]> {
    for (const key of Object.keys(this)) {
      if (key !== Symbol.iterator.toString()) {
        yield [key, (this as any)[key]];
      }
    }
  },
};

for (const [key, value] of config) {
  console.log(key, value);
}`,
      hints: [
        'Plain objects are not iterable by default.',
        'Add a [Symbol.iterator] method that yields key-value pairs.',
        'Or simply use Object.entries(config) in the for...of loop.',
      ],
      concepts: ['Symbol.iterator', 'object iteration', 'iterable protocol'],
    },
    {
      id: 'ts-iter-gen-14',
      title: 'Async generator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write an async generator that fetches paginated data, yielding one page at a time.',
      skeleton: `interface Page {
  data: string[];
  nextCursor?: string;
}

// Write async generator fetchPages that takes a baseUrl
// Yields Page objects until there is no nextCursor
`,
      solution: `interface Page {
  data: string[];
  nextCursor?: string;
}

async function* fetchPages(baseUrl: string): AsyncGenerator<Page> {
  let cursor: string | undefined = undefined;
  do {
    const url = cursor ? \\\`\${baseUrl}?cursor=\${cursor}\\\` : baseUrl;
    const response = await fetch(url);
    const page: Page = await response.json();
    yield page;
    cursor = page.nextCursor;
  } while (cursor);
}`,
      hints: [
        'Use async function* for an async generator.',
        'Loop until there is no nextCursor, yielding each page.',
        'Await the fetch and json parsing, then yield the page object.',
      ],
      concepts: ['async generator', 'pagination', 'cursor-based'],
    },
    {
      id: 'ts-iter-gen-15',
      title: 'for-await-of with async generator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function that consumes an async generator using for-await-of and collects all items.',
      skeleton: `async function* generateItems(): AsyncGenerator<number> {
  for (let i = 0; i < 5; i++) {
    await new Promise(r => setTimeout(r, 10));
    yield i;
  }
}

// Write collectAll that consumes the async generator and returns all items
`,
      solution: `async function* generateItems(): AsyncGenerator<number> {
  for (let i = 0; i < 5; i++) {
    await new Promise(r => setTimeout(r, 10));
    yield i;
  }
}

async function collectAll<T>(gen: AsyncIterable<T>): Promise<T[]> {
  const items: T[] = [];
  for await (const item of gen) {
    items.push(item);
  }
  return items;
}`,
      hints: [
        'Use for await...of to consume async iterables.',
        'Make the function generic to work with any async iterable.',
        'async function collectAll<T>(gen: AsyncIterable<T>): Promise<T[]>',
      ],
      concepts: ['for-await-of', 'AsyncIterable', 'async consumption'],
    },
    {
      id: 'ts-iter-gen-16',
      title: 'Generator composition: map',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a lazy map generator that transforms values from any iterable.',
      skeleton: `// Write function* map<T, U>(iterable: Iterable<T>, fn: (item: T) => U): Generator<U>
`,
      solution: `function* map<T, U>(iterable: Iterable<T>, fn: (item: T) => U): Generator<U> {
  for (const item of iterable) {
    yield fn(item);
  }
}

// Usage
function* nums(): Generator<number> {
  yield 1; yield 2; yield 3;
}

const doubled = map(nums(), n => n * 2);
console.log([...doubled]); // [2, 4, 6]`,
      hints: [
        'Create a generator that iterates the input and yields transformed values.',
        'Use for...of to consume the input iterable inside the generator.',
        'function* map<T, U>(iterable, fn) { for (const item of iterable) yield fn(item); }',
      ],
      concepts: ['generator composition', 'lazy map', 'higher-order generator'],
    },
    {
      id: 'ts-iter-gen-17',
      title: 'Generator composition: filter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a lazy filter generator that only yields values matching a predicate.',
      skeleton: `// Write function* filter<T>(iterable: Iterable<T>, predicate: (item: T) => boolean): Generator<T>
`,
      solution: `function* filter<T>(iterable: Iterable<T>, predicate: (item: T) => boolean): Generator<T> {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item;
    }
  }
}

function* range(start: number, end: number): Generator<number> {
  for (let i = start; i <= end; i++) yield i;
}

const evens = filter(range(1, 10), n => n % 2 === 0);
console.log([...evens]); // [2, 4, 6, 8, 10]`,
      hints: [
        'Similar to map, but only yield items that pass the predicate.',
        'Use an if statement to check the predicate before yielding.',
        'function* filter<T>(iterable, pred) { for (const item of iterable) if (pred(item)) yield item; }',
      ],
      concepts: ['generator composition', 'lazy filter', 'predicate'],
    },
    {
      id: 'ts-iter-gen-18',
      title: 'Predict yield* return value',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What value does the yield* expression return?',
      skeleton: `function* inner(): Generator<number, string> {
  yield 1;
  yield 2;
  return "done";
}

function* outer(): Generator<number, void, undefined> {
  const result = yield* inner();
  console.log(result);
}

const gen = outer();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // triggers the console.log`,
      solution: `done`,
      hints: [
        'yield* returns the return value of the delegated generator.',
        'inner() returns "done" after all yields are consumed.',
        'Output is: done',
      ],
      concepts: ['yield* return value', 'generator delegation'],
    },
    {
      id: 'ts-iter-gen-19',
      title: 'Refactor: array to generator',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this function that builds a large array to use a generator for lazy evaluation.',
      skeleton: `function getEvenSquares(limit: number): number[] {
  const results: number[] = [];
  for (let i = 0; i < limit; i++) {
    if (i % 2 === 0) {
      results.push(i * i);
    }
  }
  return results;
}

// This creates a huge array for large limits
const squares = getEvenSquares(1000000);`,
      solution: `function* getEvenSquares(limit: number): Generator<number> {
  for (let i = 0; i < limit; i++) {
    if (i % 2 === 0) {
      yield i * i;
    }
  }
}

// Now lazily consumed -- no huge array in memory
for (const square of getEvenSquares(1000000)) {
  if (square > 100) break; // can stop early
  console.log(square);
}`,
      hints: [
        'Replace the array accumulation with yield statements.',
        'Change function to function* and replace push with yield.',
        'Consumers can break early without computing the entire sequence.',
      ],
      concepts: ['refactoring', 'lazy evaluation', 'memory efficiency'],
    },
    {
      id: 'ts-iter-gen-20',
      title: 'Refactor: callback to iterable',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this callback-based tree traversal into an iterable using a generator.',
      skeleton: `interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

function traverse(node: TreeNode | undefined, callback: (value: number) => void): void {
  if (!node) return;
  traverse(node.left, callback);
  callback(node.value);
  traverse(node.right, callback);
}

// Usage:
// traverse(root, (v) => console.log(v));`,
      solution: `interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

function* inOrder(node: TreeNode | undefined): Generator<number> {
  if (!node) return;
  yield* inOrder(node.left);
  yield node.value;
  yield* inOrder(node.right);
}

// Usage:
// for (const value of inOrder(root)) {
//   console.log(value);
// }`,
      hints: [
        'Replace the callback with yield, and recursive calls with yield*.',
        'function* inOrder(node) replaces traverse(node, callback).',
        'yield* inOrder(node.left) replaces traverse(node.left, callback).',
      ],
      concepts: ['refactoring', 'callback to iterator', 'tree traversal', 'yield*'],
    },
  ],
};
