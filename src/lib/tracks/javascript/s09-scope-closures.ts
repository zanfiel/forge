import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-closures',
  title: '9. Scope & Closures',
  explanation: `## Scope & Closures

### Scope Types
- **Global scope**: accessible everywhere
- **Function scope**: variables declared with \`var\` inside a function
- **Block scope**: variables declared with \`let\`/\`const\` inside \`{}\`
- **Lexical scope**: scope is determined by where code is written, not where it runs

### Closures
A closure is a function that **remembers** variables from its outer (enclosing) scope even after that scope has finished executing.

\`\`\`js
function outer() {
  let count = 0;
  return function inner() {
    return ++count;
  };
}
const counter = outer();
counter(); // 1
counter(); // 2
\`\`\`

### Common Patterns
- **Data privacy**: hide state inside closures
- **Module pattern**: IIFE returning an object of public methods
- **Partial application**: fix some arguments, return a new function
- **Currying**: transform f(a, b) into f(a)(b)
- **Memoization**: cache results using a closure variable

### Gotchas
- **Stale closures**: capturing a variable that changes (e.g., var in loops)
- **Memory**: closed-over variables are not garbage collected while the closure exists
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-cls-1',
      title: 'Closure captures variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'The inner function can access the outer variable because of ____.',
      skeleton: `function outer() {
  const message = 'hello';
  return function inner() {
    return message; // inner has access via __BLANK__
  };
}`,
      solution: `function outer() {
  const message = 'hello';
  return function inner() {
    return message; // inner has access via closure
  };
}`,
      hints: [
        'The inner function remembers variables from the outer scope.',
        'This mechanism has a specific name.',
        'It is called a closure.',
      ],
      concepts: ['closure', 'lexical scope'],
    },
    {
      id: 'js-cls-2',
      title: 'Block scope with let',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the keyword that creates a block-scoped variable.',
      skeleton: `{
  __BLANK__ secret = 42;
}
// secret is not accessible here`,
      solution: `{
  let secret = 42;
}
// secret is not accessible here`,
      hints: [
        'var would leak out of the block.',
        'You need block-scoped declaration.',
        'Use `let` (or `const`).',
      ],
      concepts: ['block scope', 'let'],
    },
    {
      id: 'js-cls-3',
      title: 'Closure counter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in to create a counter using closure.',
      skeleton: `function makeCounter() {
  let count = __BLANK__;
  return {
    increment() { return ++count; },
    getCount() { return count; },
  };
}`,
      solution: `function makeCounter() {
  let count = 0;
  return {
    increment() { return ++count; },
    getCount() { return count; },
  };
}`,
      hints: [
        'Initialise count to a starting value.',
        'The counter should start from zero.',
        'Use `0`.',
      ],
      concepts: ['closure', 'data privacy', 'counter'],
    },
    {
      id: 'js-cls-4',
      title: 'IIFE for scope',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the IIFE wrapper that creates a private scope.',
      skeleton: `const module = __BLANK__function() {
  let _private = 0;
  return { get: () => _private, set: (v) => { _private = v; } };
}__BLANK__;`,
      solution: `const module = (function() {
  let _private = 0;
  return { get: () => _private, set: (v) => { _private = v; } };
})();`,
      hints: [
        'IIFE wraps the function in parentheses and calls it immediately.',
        'First blank: `(`, second blank: `)()`.',
        'The function runs immediately and returns the public API.',
      ],
      concepts: ['IIFE', 'module pattern', 'closure'],
    },
    {
      id: 'js-cls-5',
      title: 'Lexical scope lookup',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the value returned by the inner function.',
      skeleton: `const x = 'global';
function outer() {
  const x = 'outer';
  function inner() {
    return x;
  }
  return inner();
}
console.log(outer()); // "__BLANK__"`,
      solution: `const x = 'global';
function outer() {
  const x = 'outer';
  function inner() {
    return x;
  }
  return inner();
}
console.log(outer()); // "outer"`,
      hints: [
        'Scope is determined by where the function is defined.',
        'inner is defined inside outer, so it sees outer x.',
        'The result is "outer".',
      ],
      concepts: ['lexical scope', 'scope chain'],
    },
    {
      id: 'js-cls-6',
      title: 'Stale closure with var',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Explain why all functions log 3 (the stale value).',
      skeleton: `const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(() => i);
}
// All closures share the same 'i' because var is __BLANK__-scoped
console.log(fns[0](), fns[1](), fns[2]()); // 3 3 3`,
      solution: `const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(() => i);
}
// All closures share the same 'i' because var is function-scoped
console.log(fns[0](), fns[1](), fns[2]()); // 3 3 3`,
      hints: [
        'var does not create a new binding per loop iteration.',
        'It is scoped to the enclosing function, not the block.',
        'The answer is `function`.',
      ],
      concepts: ['stale closure', 'var', 'function scope', 'loop'],
    },
    // ---- write-function (6) ----
    {
      id: 'js-cls-7',
      title: 'Private counter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `createCounter(start)` that returns an object with increment(), decrement(), and getValue() methods. The count should be private.',
      skeleton: `function createCounter(start) {
  // Return object with private count
}
`,
      solution: `function createCounter(start) {
  let count = start;
  return {
    increment() { count++; },
    decrement() { count--; },
    getValue() { return count; },
  };
}`,
      hints: [
        'Declare count as a local variable.',
        'Return an object with methods that access count.',
        'count is private because it is only accessible via closure.',
      ],
      concepts: ['closure', 'data privacy', 'encapsulation'],
    },
    {
      id: 'js-cls-8',
      title: 'Memoize function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `memoize(fn)` that caches results based on the first argument.',
      skeleton: `function memoize(fn) {
  // Return a memoized version of fn
}
`,
      solution: `function memoize(fn) {
  const cache = new Map();
  return function(arg) {
    if (cache.has(arg)) return cache.get(arg);
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}`,
      hints: [
        'Use a Map or object as cache inside the closure.',
        'Check if the argument is already cached.',
        'If not, compute and store the result.',
      ],
      concepts: ['memoization', 'closure', 'Map', 'caching'],
    },
    {
      id: 'js-cls-9',
      title: 'Partial application',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `partial(fn, ...presetArgs)` that returns a new function with some arguments preset.',
      skeleton: `function partial(fn, ...presetArgs) {
  // Return function with preset arguments
}
// const add10 = partial((a, b) => a + b, 10);
// add10(5) => 15
`,
      solution: `function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}`,
      hints: [
        'Capture the preset arguments via closure.',
        'When the returned function is called, combine preset + new args.',
        'Use spread to merge: `fn(...presetArgs, ...laterArgs)`.',
      ],
      concepts: ['partial application', 'closure', 'rest/spread'],
    },
    {
      id: 'js-cls-10',
      title: 'Currying',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function `curry(fn)` that converts a multi-argument function into a chain of single-argument functions.',
      skeleton: `function curry(fn) {
  // Return curried version
}
// const add = curry((a, b, c) => a + b + c);
// add(1)(2)(3) => 6
`,
      solution: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}`,
      hints: [
        'Check if enough arguments have been collected.',
        'If yes, call the original function.',
        'If no, return a new function that collects more.',
      ],
      concepts: ['currying', 'closure', 'function.length', 'recursion'],
    },
    {
      id: 'js-cls-11',
      title: 'Event handler with closure',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `createLogger(prefix)` that returns a log function. Each call should include a sequence number.',
      skeleton: `function createLogger(prefix) {
  // Return a function that logs with prefix and sequence number
}
// const log = createLogger('APP');
// log('started') => "APP [1]: started"
// log('ready')   => "APP [2]: ready"
`,
      solution: `function createLogger(prefix) {
  let seq = 0;
  return function(message) {
    seq++;
    return \`\${prefix} [\${seq}]: \${message}\`;
  };
}`,
      hints: [
        'Use a closure variable for the sequence counter.',
        'Increment it each time the returned function is called.',
        'Use template literals for formatting.',
      ],
      concepts: ['closure', 'counter', 'template literals', 'encapsulation'],
    },
    {
      id: 'js-cls-12',
      title: 'Revealing module pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Create a module using IIFE that exposes add(item) and getAll() methods, keeping the internal array private.',
      skeleton: `const store = (function() {
  // Private state + public API
})();
// store.add('item1'); store.getAll() => ['item1']
`,
      solution: `const store = (function() {
  const items = [];
  function add(item) {
    items.push(item);
  }
  function getAll() {
    return [...items];
  }
  return { add, getAll };
})();`,
      hints: [
        'Declare the items array inside the IIFE.',
        'Define add and getAll functions.',
        'Return an object exposing only the public API.',
      ],
      concepts: ['revealing module pattern', 'IIFE', 'closure', 'encapsulation'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'js-cls-13',
      title: 'Fix: stale closure in loop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the stale closure so each function returns the correct index.',
      skeleton: `const fns = [];
for (var i = 0; i < 5; i++) {
  fns.push(() => i);
}
console.log(fns[0]()); // should be 0, not 5`,
      solution: `const fns = [];
for (let i = 0; i < 5; i++) {
  fns.push(() => i);
}
console.log(fns[0]()); // 0`,
      hints: [
        'var shares a single binding across all iterations.',
        'let creates a new binding per iteration.',
        'Change var to let.',
      ],
      concepts: ['stale closure', 'var', 'let', 'loop'],
    },
    {
      id: 'js-cls-14',
      title: 'Fix: closure memory leak',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This function accidentally closes over a large array. Fix it to only capture what is needed.',
      skeleton: `function processData() {
  const hugeArray = new Array(1000000).fill('data');
  const summary = hugeArray.length;
  return function getSummary() {
    return 'Items: ' + hugeArray.length; // keeps hugeArray alive!
  };
}`,
      solution: `function processData() {
  const hugeArray = new Array(1000000).fill('data');
  const summary = hugeArray.length;
  return function getSummary() {
    return 'Items: ' + summary;
  };
}`,
      hints: [
        'The closure captures hugeArray even though only its length is needed.',
        'Store the length in a separate variable before the closure.',
        'Use `summary` instead of `hugeArray.length` in the closure.',
      ],
      concepts: ['closure', 'memory', 'garbage collection'],
    },
    {
      id: 'js-cls-15',
      title: 'Fix: shadowing confusion',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'The inner function shadows the outer variable accidentally. Fix it so the inner function modifies the outer count.',
      skeleton: `function makeAdder() {
  let count = 0;
  return function add(n) {
    let count = count + n; // bug: ReferenceError due to TDZ
    return count;
  };
}`,
      solution: `function makeAdder() {
  let count = 0;
  return function add(n) {
    count = count + n;
    return count;
  };
}`,
      hints: [
        'The inner `let count` shadows the outer one.',
        'It also creates a TDZ because it references count in its own initialiser.',
        'Remove `let` to use the outer count.',
      ],
      concepts: ['shadowing', 'TDZ', 'closure'],
    },
    // ---- predict-output (3) ----
    {
      id: 'js-cls-16',
      title: 'Predict: closure value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `function make() {
  let n = 0;
  return { inc: () => ++n, get: () => n };
}
const c = make();
c.inc();
c.inc();
c.inc();
console.log(c.get());`,
      solution: `3`,
      hints: [
        'n starts at 0 and is incremented 3 times.',
        'Both inc and get share the same closure over n.',
        'The output is 3.',
      ],
      concepts: ['closure', 'shared state', 'counter'],
    },
    {
      id: 'js-cls-17',
      title: 'Predict: separate closures',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `function make() {
  let n = 0;
  return () => ++n;
}
const a = make();
const b = make();
a(); a(); a();
b();
console.log(a(), b());`,
      solution: `4 2`,
      hints: [
        'Each call to make() creates a separate closure.',
        'a has its own n, b has its own n.',
        'a() was called 3 times then once more = 4. b() once then once more = 2.',
      ],
      concepts: ['closure', 'separate instances', 'counter'],
    },
    {
      id: 'js-cls-18',
      title: 'Predict: closure over reference',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `function outer() {
  let x = 10;
  function inner() { return x; }
  x = 20;
  return inner;
}
console.log(outer()());`,
      solution: `20`,
      hints: [
        'Closures capture the variable, not the value at the time of creation.',
        'x is changed to 20 before inner is returned.',
        'When inner() is called, x is 20.',
      ],
      concepts: ['closure', 'variable reference', 'live binding'],
    },
    // ---- refactor (2) ----
    {
      id: 'js-cls-19',
      title: 'Refactor: global state to closure',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Refactor this global state into a closure-based module.',
      skeleton: `let _items = [];

function addItem(item) {
  _items.push(item);
}

function getItems() {
  return [..._items];
}

function clear() {
  _items = [];
}`,
      solution: `const itemStore = (() => {
  let items = [];
  return {
    addItem(item) { items.push(item); },
    getItems() { return [...items]; },
    clear() { items = []; },
  };
})();`,
      hints: [
        'Wrap everything in an IIFE.',
        'The items array becomes a private closure variable.',
        'Return an object with the public methods.',
      ],
      concepts: ['module pattern', 'closure', 'IIFE', 'encapsulation'],
    },
    {
      id: 'js-cls-20',
      title: 'Refactor: closure to class',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this closure-based counter to a class with #private field.',
      skeleton: `function createCounter(initial) {
  let count = initial;
  return {
    increment() { count++; },
    decrement() { count--; },
    getValue() { return count; },
  };
}`,
      solution: `class Counter {
  #count;
  constructor(initial) {
    this.#count = initial;
  }
  increment() { this.#count++; }
  decrement() { this.#count--; }
  getValue() { return this.#count; }
}`,
      hints: [
        'Use #private fields for data privacy.',
        'The constructor sets the initial value.',
        'Methods access this.#count instead of a closure variable.',
      ],
      concepts: ['class', 'private fields', 'closure', 'refactoring'],
    },
  ],
};
