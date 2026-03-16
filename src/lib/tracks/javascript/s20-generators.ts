import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-generators',
  title: '20. Generators',
  explanation: `## Generators

Generator functions use \`function*\` and \`yield\` to produce a sequence of values lazily.

### Basics
\`\`\`js
function* count() {
  yield 1;
  yield 2;
  yield 3;
}
const gen = count();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }
\`\`\`

### Generators are Iterable
\`\`\`js
for (const n of count()) console.log(n); // 1, 2, 3
[...count()] // [1, 2, 3]
\`\`\`

### yield* -- Delegation
\`yield*\` delegates to another iterable or generator:
\`\`\`js
function* concat(a, b) {
  yield* a;
  yield* b;
}
\`\`\`

### Two-way Communication
\`yield\` can receive values: \`const input = yield output;\`
\`gen.next(value)\` sends value into the paused yield.

### gen.return() and gen.throw()
- \`gen.return(val)\` forces the generator to finish
- \`gen.throw(err)\` throws an error inside the generator

### Async Generators
\`async function*\` combines generators with async/await, consumed with \`for await...of\`.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-gen-1b',
      title: 'Generator function syntax',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Add the asterisk to make this a generator function.',
      skeleton: `function__BLANK__ greet() {
  yield 'hello';
  yield 'world';
}`,
      solution: `function* greet() {
  yield 'hello';
  yield 'world';
}`,
      hints: [
        'Generator functions have a special character after function.',
        'It is a single character.',
        'Add `*` after `function`.',
      ],
      concepts: ['function*', 'generator'],
    },
    {
      id: 'js-gen-2b',
      title: 'Yield a value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Use the keyword that pauses the generator and emits a value.',
      skeleton: `function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    __BLANK__ a;
    [a, b] = [b, a + b];
  }
}`,
      solution: `function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}`,
      hints: [
        'This keyword pauses generator execution and sends a value out.',
        'It resumes when next() is called again.',
        'The keyword is `yield`.',
      ],
      concepts: ['yield', 'generator', 'infinite sequence'],
    },
    {
      id: 'js-gen-3b',
      title: 'Delegate to another iterable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Delegate to another iterable using yield*.',
      skeleton: `function* flatten(arrays) {
  for (const arr of arrays) {
    __BLANK__ arr;
  }
}

console.log([...flatten([[1, 2], [3, 4]])]); // [1, 2, 3, 4]`,
      solution: `function* flatten(arrays) {
  for (const arr of arrays) {
    yield* arr;
  }
}

console.log([...flatten([[1, 2], [3, 4]])]); // [1, 2, 3, 4]`,
      hints: [
        'There is a special form of yield that delegates to sub-iterables.',
        'It yields each value from the sub-iterable individually.',
        'Use `yield*`.',
      ],
      concepts: ['yield*', 'delegation', 'flatten'],
    },
    {
      id: 'js-gen-4i',
      title: 'Receive values via next()',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Capture a value sent into the generator.',
      skeleton: `function* accumulator() {
  let total = 0;
  while (true) {
    const value = __BLANK__ total;
    total += value;
  }
}

const acc = accumulator();
acc.next();       // prime the generator
acc.next(10);     // total = 10
const r = acc.next(5); // total = 15
console.log(r.value); // 15`,
      solution: `function* accumulator() {
  let total = 0;
  while (true) {
    const value = yield total;
    total += value;
  }
}

const acc = accumulator();
acc.next();       // prime the generator
acc.next(10);     // total = 10
const r = acc.next(5); // total = 15
console.log(r.value); // 15`,
      hints: [
        'yield can both send a value out and receive one in.',
        'The value passed to next() becomes the result of the yield expression.',
        'Use `yield total` on the right side of the assignment.',
      ],
      concepts: ['yield', 'next()', 'two-way communication'],
    },
    {
      id: 'js-gen-5i',
      title: 'Generator return',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Force a generator to finish early.',
      skeleton: `function* nums() {
  yield 1;
  yield 2;
  yield 3;
}

const g = nums();
console.log(g.next().value);     // 1
console.log(g.__BLANK__(99));    // { value: 99, done: true }
console.log(g.next().done);      // true`,
      solution: `function* nums() {
  yield 1;
  yield 2;
  yield 3;
}

const g = nums();
console.log(g.next().value);     // 1
console.log(g.return(99));       // { value: 99, done: true }
console.log(g.next().done);      // true`,
      hints: [
        'There is a method on generators that terminates them early.',
        'It returns the given value and sets done to true.',
        'The method is `return`.',
      ],
      concepts: ['generator', 'return()', 'early termination'],
    },
    {
      id: 'js-gen-6a',
      title: 'Async generator',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Create an async generator function.',
      skeleton: `__BLANK__ function* fetchPages(urls) {
  for (const url of urls) {
    const res = await fetch(url);
    yield await res.json();
  }
}`,
      solution: `async function* fetchPages(urls) {
  for (const url of urls) {
    const res = await fetch(url);
    yield await res.json();
  }
}`,
      hints: [
        'Async generators combine two keywords before function*.',
        'They allow using await inside a generator.',
        'The keyword is `async`.',
      ],
      concepts: ['async generator', 'async function*', 'yield', 'await'],
    },

    // ---- write-function (6) ----
    {
      id: 'js-gen-7b',
      title: 'Infinite ID generator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a generator that produces unique IDs starting from 1.',
      skeleton: `// Write generator function idGenerator()
// It should yield 1, 2, 3, ... infinitely
`,
      solution: `function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}`,
      hints: [
        'Use an infinite while(true) loop.',
        'Yield the current id and increment it.',
        'The generator pauses at each yield, so the loop is safe.',
      ],
      concepts: ['generator', 'infinite sequence', 'yield'],
    },
    {
      id: 'js-gen-8b',
      title: 'Range generator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a generator that yields numbers in a range.',
      skeleton: `// Write generator function* range(start, end, step = 1)
// Yields start, start+step, start+2*step, ... while <= end
// Example: [...range(0, 10, 3)] => [0, 3, 6, 9]
`,
      solution: `function* range(start, end, step = 1) {
  for (let i = start; i <= end; i += step) {
    yield i;
  }
}`,
      hints: [
        'Use a for loop from start to end with the given step.',
        'Yield each value inside the loop.',
        'The default step is 1.',
      ],
      concepts: ['generator', 'range', 'default parameter'],
    },
    {
      id: 'js-gen-9i',
      title: 'Filter generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a generator that lazily filters values from another iterable.',
      skeleton: `// Write generator function* filter(iterable, predicate)
// Only yields values where predicate(value) is true
// Example: [...filter([1,2,3,4,5], n => n % 2 === 0)] => [2, 4]
`,
      solution: `function* filter(iterable, predicate) {
  for (const value of iterable) {
    if (predicate(value)) {
      yield value;
    }
  }
}`,
      hints: [
        'Iterate over the source with for...of.',
        'Only yield values that pass the predicate.',
        'This is lazy -- values are produced on demand.',
      ],
      concepts: ['generator', 'filter', 'lazy evaluation'],
    },
    {
      id: 'js-gen-10i',
      title: 'Tree traversal with yield*',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a generator that traverses a tree structure depth-first.',
      skeleton: `// A tree node is { value, children: [] }
// Write generator function* traverse(node) that yields all values
// in depth-first order. Use yield* to recurse into children.
`,
      solution: `function* traverse(node) {
  yield node.value;
  for (const child of node.children) {
    yield* traverse(child);
  }
}`,
      hints: [
        'First yield the current node value.',
        'Then iterate over children and delegate with yield*.',
        'yield* handles recursive generators seamlessly.',
      ],
      concepts: ['yield*', 'recursion', 'tree traversal', 'generator'],
    },
    {
      id: 'js-gen-11a',
      title: 'Coroutine with two-way yield',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a generator-based state machine.',
      skeleton: `// Write generator function* trafficLight() that:
// - Starts at 'green'
// - yield 'green', receive 'next' -> switch to 'yellow'
// - yield 'yellow', receive 'next' -> switch to 'red'
// - yield 'red', receive 'next' -> switch to 'green'
// - Loops forever
`,
      solution: `function* trafficLight() {
  const states = ['green', 'yellow', 'red'];
  let index = 0;
  while (true) {
    const input = yield states[index];
    if (input === 'next') {
      index = (index + 1) % states.length;
    }
  }
}`,
      hints: [
        'Use an array of states and an index.',
        'yield the current state and capture the input.',
        'If input is "next", advance the index (wrapping with modulo).',
      ],
      concepts: ['generator', 'coroutine', 'state machine', 'two-way yield'],
    },
    {
      id: 'js-gen-12a',
      title: 'Compose generators with pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a pipe function that chains generators together.',
      skeleton: `// Write function pipe(source, ...transforms) where source is an iterable
// and each transform is a function(iterable) -> generator.
// Returns the final generator.
// Example:
//   function* double(iter) { for (const n of iter) yield n * 2; }
//   function* addOne(iter) { for (const n of iter) yield n + 1; }
//   [...pipe([1, 2, 3], double, addOne)] => [3, 5, 7]
`,
      solution: `function pipe(source, ...transforms) {
  let current = source;
  for (const transform of transforms) {
    current = transform(current);
  }
  return current;
}`,
      hints: [
        'Each transform takes an iterable and returns a generator (which is iterable).',
        'Chain them: pass the output of one as input to the next.',
        'Just reduce through the transforms, threading the iterable.',
      ],
      concepts: ['generator', 'composition', 'pipeline', 'lazy evaluation'],
    },

    // ---- fix-bug (3) ----
    {
      id: 'js-gen-13b',
      title: 'Forgot to call generator',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fix the code that tries to iterate a generator function directly.',
      skeleton: `function* letters() {
  yield 'a';
  yield 'b';
  yield 'c';
}

// Bug: iterating the function, not the generator object
for (const letter of letters) {
  console.log(letter);
}`,
      solution: `function* letters() {
  yield 'a';
  yield 'b';
  yield 'c';
}

for (const letter of letters()) {
  console.log(letter);
}`,
      hints: [
        'A generator function must be called to produce an iterator.',
        'The function itself is not iterable.',
        'Add () to call it: letters().',
      ],
      concepts: ['generator', 'function call', 'iterable'],
    },
    {
      id: 'js-gen-14i',
      title: 'Yield inside forEach',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the generator that tries to yield inside a callback.',
      skeleton: `function* yieldAll(items) {
  items.forEach(function (item) {
    yield item;
  });
}

console.log([...yieldAll([1, 2, 3])]);`,
      solution: `function* yieldAll(items) {
  for (const item of items) {
    yield item;
  }
}

console.log([...yieldAll([1, 2, 3])]);`,
      hints: [
        'yield can only be used directly inside a generator function.',
        'The forEach callback is a separate regular function.',
        'Replace forEach with a for...of loop.',
      ],
      concepts: ['yield', 'generator', 'forEach', 'for...of'],
    },
    {
      id: 'js-gen-15a',
      title: 'Priming issue',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fix the generator that misses the first input.',
      skeleton: `function* summer() {
  let total = 0;
  while (true) {
    const n = yield total;
    total += n;
  }
}

const s = summer();
// Bug: first value is lost
s.next(10);
s.next(20);
console.log(s.next(30).value); // Expected 60 but gets 50`,
      solution: `function* summer() {
  let total = 0;
  while (true) {
    const n = yield total;
    total += n;
  }
}

const s = summer();
s.next();       // prime -- advances to first yield
s.next(10);     // total = 10
s.next(20);     // total = 30
console.log(s.next(30).value); // 60`,
      hints: [
        'The first next() call advances the generator to the first yield.',
        'Any value passed to the first next() is discarded.',
        'Prime the generator with an empty next() call first.',
      ],
      concepts: ['generator', 'priming', 'next()', 'two-way communication'],
    },

    // ---- predict-output (3) ----
    {
      id: 'js-gen-16b',
      title: 'Generator done state',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the done values from a simple generator.',
      skeleton: `function* twoItems() {
  yield 'a';
  yield 'b';
}

const g = twoItems();
console.log(g.next().done);
console.log(g.next().done);
console.log(g.next().done);`,
      solution: `function* twoItems() {
  yield 'a';
  yield 'b';
}

const g = twoItems();
console.log(g.next().done);
console.log(g.next().done);
console.log(g.next().done);`,
      expectedOutput: `false
false
true`,
      hints: [
        'Each yield produces a result with done: false.',
        'After all yields, the next call returns done: true.',
        'Two yields means two false, then true.',
      ],
      concepts: ['generator', 'done', 'next()'],
    },
    {
      id: 'js-gen-17i',
      title: 'yield* return value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the return value of yield* delegation.',
      skeleton: `function* inner() {
  yield 'a';
  return 'DONE';
}

function* outer() {
  const result = yield* inner();
  yield result;
}

const vals = [...outer()];
console.log(vals.join(','));`,
      solution: `function* inner() {
  yield 'a';
  return 'DONE';
}

function* outer() {
  const result = yield* inner();
  yield result;
}

const vals = [...outer()];
console.log(vals.join(','));`,
      expectedOutput: `a,DONE`,
      hints: [
        'yield* passes through all yielded values from inner.',
        'The return value of inner becomes the result of yield*.',
        'outer then yields that return value.',
      ],
      concepts: ['yield*', 'return value', 'delegation'],
    },
    {
      id: 'js-gen-18a',
      title: 'Generator with try/finally',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict when finally runs in a generator.',
      skeleton: `function* gen() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    console.log('cleanup');
  }
}

const g = gen();
console.log(g.next().value);
console.log(g.next().value);
console.log(g.return(99).value);`,
      solution: `function* gen() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    console.log('cleanup');
  }
}

const g = gen();
console.log(g.next().value);
console.log(g.next().value);
console.log(g.return(99).value);`,
      expectedOutput: `1
2
cleanup
99`,
      hints: [
        'gen.return() causes the generator to run any finally blocks.',
        'The finally block runs before return completes.',
        'Output is: 1, 2, cleanup, 99.',
      ],
      concepts: ['generator', 'finally', 'return()', 'cleanup'],
    },

    // ---- refactor (2) ----
    {
      id: 'js-gen-19i',
      title: 'Callback to generator',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Convert an eager array-building function to a lazy generator.',
      skeleton: `function getEvenNumbers(max) {
  const result = [];
  for (let i = 0; i <= max; i++) {
    if (i % 2 === 0) {
      result.push(i);
    }
  }
  return result;
}

// Creates entire array in memory
const evens = getEvenNumbers(1000000);`,
      solution: `function* getEvenNumbers(max) {
  for (let i = 0; i <= max; i++) {
    if (i % 2 === 0) {
      yield i;
    }
  }
}

// Lazy -- values produced on demand
const evens = getEvenNumbers(1000000);`,
      hints: [
        'Replace the result array with yield statements.',
        'Change function to function*.',
        'Remove the array push and return.',
      ],
      concepts: ['generator', 'lazy evaluation', 'memory efficiency'],
    },
    {
      id: 'js-gen-20a',
      title: 'Iterator class to generator',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Replace a manual iterator implementation with a generator.',
      skeleton: `class Permutations {
  constructor(arr) {
    this.arr = arr;
    this.indices = arr.map((_, i) => i);
    this.first = true;
    this.done = false;
  }

  [Symbol.iterator]() { return this; }

  next() {
    if (this.done) return { done: true };
    if (this.first) {
      this.first = false;
      return { value: [...this.arr], done: false };
    }

    const n = this.arr.length;
    let i = n - 2;
    while (i >= 0 && this.indices[i] >= this.indices[i + 1]) i--;
    if (i < 0) {
      this.done = true;
      return { done: true };
    }
    let j = n - 1;
    while (this.indices[j] <= this.indices[i]) j--;
    [this.indices[i], this.indices[j]] = [this.indices[j], this.indices[i]];
    this.indices.splice(i + 1, n - i - 1, ...this.indices.slice(i + 1).reverse());
    const perm = this.indices.map(idx => this.arr[idx]);
    return { value: perm, done: false };
  }
}`,
      solution: `function* permutations(arr) {
  const indices = arr.map((_, i) => i);
  const n = arr.length;

  yield [...arr];

  while (true) {
    let i = n - 2;
    while (i >= 0 && indices[i] >= indices[i + 1]) i--;
    if (i < 0) return;

    let j = n - 1;
    while (indices[j] <= indices[i]) j--;
    [indices[i], indices[j]] = [indices[j], indices[i]];
    indices.splice(i + 1, n - i - 1, ...indices.slice(i + 1).reverse());
    yield indices.map(idx => arr[idx]);
  }
}`,
      hints: [
        'Generators automatically handle done and the iterator protocol.',
        'Replace manual state tracking with local variables in the generator.',
        'Use return to signal completion instead of setting this.done.',
      ],
      concepts: ['generator', 'iterator protocol', 'refactor', 'permutations'],
    },
  ],
};
