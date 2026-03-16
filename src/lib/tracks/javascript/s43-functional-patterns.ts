import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-functional',
  title: '43. Functional Patterns',
  explanation: `## Functional Patterns

Functional programming in JavaScript centers on pure functions, immutability, and composition.

\`\`\`javascript
// Pure function -- same input always yields same output, no side effects
const add = (a, b) => a + b;

// Composition -- combine small functions into larger ones
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

// Currying -- transform f(a, b) into f(a)(b)
const curry = (fn) => {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
};

// Partial application -- fix some arguments
const partial = (fn, ...fixed) => (...rest) => fn(...fixed, ...rest);

// Functors map over values: array.map(f), Option.map(f)
// Monads flatMap/chain: Promise.then, Array.flatMap, Maybe.flatMap
\`\`\`

These patterns enable declarative, testable, and composable code.`,
  exercises: [
    {
      id: 'js-functional-1',
      title: 'Pure vs Impure',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to convert impure functions into pure equivalents.',
      skeleton: `// Impure -- modifies external state
let count = 0;
function increment() { count++; return count; }

// Pure equivalent -- takes input, returns new value
const pureIncrement = (count) => __BLANK__;

// Impure -- mutates the input array
function addItem(arr, item) { arr.push(item); return arr; }

// Pure equivalent -- returns a new array
const pureAddItem = (arr, item) => __BLANK__;

// Impure -- depends on external state
const config = { tax: 0.08 };
function calcTotal(price) { return price * (1 + config.tax); }

// Pure equivalent -- tax is a parameter
const pureCalcTotal = (price, tax) => __BLANK__;`,
      solution: `// Impure -- modifies external state
let count = 0;
function increment() { count++; return count; }

// Pure equivalent -- takes input, returns new value
const pureIncrement = (count) => count + 1;

// Impure -- mutates the input array
function addItem(arr, item) { arr.push(item); return arr; }

// Pure equivalent -- returns a new array
const pureAddItem = (arr, item) => [...arr, item];

// Impure -- depends on external state
const config = { tax: 0.08 };
function calcTotal(price) { return price * (1 + config.tax); }

// Pure equivalent -- tax is a parameter
const pureCalcTotal = (price, tax) => price * (1 + tax);`,
      hints: [
        'A pure function does not modify its inputs or depend on external state.',
        'Use spread to create a new array: [...arr, item].',
        'Pass all dependencies as parameters instead of reading from external scope.',
      ],
      concepts: ['pure functions', 'immutability', 'side effects', 'referential transparency'],
    },
    {
      id: 'js-functional-2',
      title: 'Immutable Updates',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to perform immutable updates on objects and arrays.',
      skeleton: `const user = { name: 'Alice', age: 30, scores: [85, 92, 78] };

// Update age immutably
const older = { __BLANK__, age: 31 };

// Add a score immutably
const withNewScore = {
  ...user,
  scores: __BLANK__,
};

// Remove a property immutably
const { age, ...__BLANK__ } = user;
// rest has { name: 'Alice', scores: [85, 92, 78] }`,
      solution: `const user = { name: 'Alice', age: 30, scores: [85, 92, 78] };

// Update age immutably
const older = { ...user, age: 31 };

// Add a score immutably
const withNewScore = {
  ...user,
  scores: [...user.scores, 95],
};

// Remove a property immutably
const { age, ...rest } = user;
// rest has { name: 'Alice', scores: [85, 92, 78] }`,
      hints: [
        'Spread the original object and override the property: { ...user, age: 31 }.',
        'Spread the nested array and add: [...user.scores, 95].',
        'Destructure to extract a property and use rest syntax: const { age, ...rest } = user.',
      ],
      concepts: ['immutability', 'spread operator', 'destructuring', 'rest syntax'],
    },
    {
      id: 'js-functional-3',
      title: 'Compose and Pipe',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Implement pipe and compose functions. pipe applies functions left-to-right, compose applies right-to-left.',
      skeleton: `function pipe(...fns) {
  // Return a function that passes its argument through each fn left-to-right


}

function compose(...fns) {
  // Return a function that passes its argument through each fn right-to-left


}

// Test:
// const transform = pipe(
//   x => x + 1,    // 2
//   x => x * 3,    // 6
//   x => x - 2     // 4
// );
// transform(1) === 4`,
      solution: `function pipe(...fns) {
  return (x) => fns.reduce((v, f) => f(v), x);
}

function compose(...fns) {
  return (x) => fns.reduceRight((v, f) => f(v), x);
}

// Test:
// const transform = pipe(
//   x => x + 1,    // 2
//   x => x * 3,    // 6
//   x => x - 2     // 4
// );
// transform(1) === 4`,
      hints: [
        'pipe uses reduce to apply functions from left to right.',
        'compose uses reduceRight to apply functions from right to left.',
        'Both return a new function that takes the initial value.',
      ],
      concepts: ['pipe', 'compose', 'function composition', 'reduce'],
    },
    {
      id: 'js-functional-4',
      title: 'Curry Implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a curry function that transforms a multi-argument function into a chain of single-argument functions.',
      skeleton: `function curry(fn) {
  // Transform fn(a, b, c) into fn(a)(b)(c)
  // Should also handle partial application: fn(a, b)(c)



}

// Test:
// const add3 = curry((a, b, c) => a + b + c);
// add3(1)(2)(3)    // 6
// add3(1, 2)(3)    // 6
// add3(1)(2, 3)    // 6
// add3(1, 2, 3)    // 6`,
      solution: `function curry(fn) {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) {
      return fn(...args);
    }
    return (...more) => curried(...args, ...more);
  };
}

// Test:
// const add3 = curry((a, b, c) => a + b + c);
// add3(1)(2)(3)    // 6
// add3(1, 2)(3)    // 6
// add3(1)(2, 3)    // 6
// add3(1, 2, 3)    // 6`,
      hints: [
        'Use fn.length to determine the expected number of arguments (arity).',
        'If enough args are provided, call fn directly.',
        'Otherwise, return a new function that collects more args and recurses.',
      ],
      concepts: ['currying', 'partial application', 'arity', 'closures'],
    },
    {
      id: 'js-functional-5',
      title: 'Partial Application',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a partial function that fixes some arguments of a function and returns a new function expecting the rest.',
      skeleton: `function partial(fn, ...fixed) {
  // Return a new function that prepends fixed args to any new args


}

// Test:
// const greet = (greeting, name, punct) => greeting + ', ' + name + punct;
// const hello = partial(greet, 'Hello');
// hello('Alice', '!')  // 'Hello, Alice!'
// const helloAlice = partial(greet, 'Hello', 'Alice');
// helloAlice('.')       // 'Hello, Alice.'`,
      solution: `function partial(fn, ...fixed) {
  return (...rest) => fn(...fixed, ...rest);
}

// Test:
// const greet = (greeting, name, punct) => greeting + ', ' + name + punct;
// const hello = partial(greet, 'Hello');
// hello('Alice', '!')  // 'Hello, Alice!'
// const helloAlice = partial(greet, 'Hello', 'Alice');
// helloAlice('.')       // 'Hello, Alice.'`,
      hints: [
        'Capture the fixed arguments using rest parameters in the outer function.',
        'Return a new function that spreads both fixed and new arguments into fn.',
        'The order is: ...fixed first, then ...rest.',
      ],
      concepts: ['partial application', 'rest parameters', 'spread operator', 'closures'],
    },
    {
      id: 'js-functional-6',
      title: 'Point-Free Style',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output of point-free function compositions.',
      skeleton: `const double = x => x * 2;
const inc = x => x + 1;
const negate = x => -x;

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const transform = pipe(double, inc, negate);

console.log(transform(3));
console.log(transform(0));
console.log([1, 2, 3].map(pipe(double, inc)));`,
      solution: `const double = x => x * 2;
const inc = x => x + 1;
const negate = x => -x;

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const transform = pipe(double, inc, negate);

console.log(transform(3));  // -7  (3*2=6, 6+1=7, -7)
console.log(transform(0));  // -1  (0*2=0, 0+1=1, -1)
console.log([1, 2, 3].map(pipe(double, inc)));  // [3, 5, 7]`,
      hints: [
        'pipe applies left to right: double first, then inc, then negate.',
        'transform(3): 3 -> 6 -> 7 -> -7.',
        'The map creates a new pipe without negate: each value is doubled then incremented.',
      ],
      concepts: ['point-free', 'pipe', 'function composition', 'map'],
    },
    {
      id: 'js-functional-7',
      title: 'Functor (map)',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a Box functor -- a wrapper that supports map for transforming the contained value.',
      skeleton: `class Box {
  #value;

  constructor(value) {
    this.#value = value;
  }

  map(fn) {
    // Apply fn to the value and return a new Box


  }

  flatMap(fn) {
    // Apply fn (which returns a Box) and unwrap one layer


  }

  getValue() {
    return this.#value;
  }

  static of(value) {
    return new Box(value);
  }
}

// Test:
// Box.of(5)
//   .map(x => x + 1)
//   .map(x => x * 2)
//   .getValue()  // 12`,
      solution: `class Box {
  #value;

  constructor(value) {
    this.#value = value;
  }

  map(fn) {
    return Box.of(fn(this.#value));
  }

  flatMap(fn) {
    return fn(this.#value);
  }

  getValue() {
    return this.#value;
  }

  static of(value) {
    return new Box(value);
  }
}

// Test:
// Box.of(5)
//   .map(x => x + 1)
//   .map(x => x * 2)
//   .getValue()  // 12`,
      hints: [
        'map applies the function and wraps the result in a new Box.',
        'flatMap applies the function (which itself returns a Box) and does NOT double-wrap.',
        'Use Box.of(fn(this.#value)) for map, just fn(this.#value) for flatMap.',
      ],
      concepts: ['functor', 'map', 'flatMap', 'monad', 'container type'],
    },
    {
      id: 'js-functional-8',
      title: 'Maybe Monad',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a Maybe type that safely handles null/undefined values in a chain of operations.',
      skeleton: `class Maybe {
  #value;

  constructor(value) {
    this.#value = value;
  }

  static of(value) {
    return new Maybe(value);
  }

  static empty() {
    return new Maybe(null);
  }

  isNothing() {
    return this.#value === null || this.#value === undefined;
  }

  map(fn) {
    // If nothing, return Maybe.empty(). Otherwise apply fn and wrap.


  }

  flatMap(fn) {
    // If nothing, return Maybe.empty(). Otherwise apply fn (returns Maybe).


  }

  getOrElse(defaultValue) {
    // Return the value or the default if nothing


  }
}

// Test:
// Maybe.of({ address: { city: 'Paris' } })
//   .map(u => u.address)
//   .map(a => a.city)
//   .map(c => c.toUpperCase())
//   .getOrElse('UNKNOWN')  // 'PARIS'
//
// Maybe.of(null)
//   .map(u => u.address)
//   .getOrElse('UNKNOWN')  // 'UNKNOWN'`,
      solution: `class Maybe {
  #value;

  constructor(value) {
    this.#value = value;
  }

  static of(value) {
    return new Maybe(value);
  }

  static empty() {
    return new Maybe(null);
  }

  isNothing() {
    return this.#value === null || this.#value === undefined;
  }

  map(fn) {
    if (this.isNothing()) return Maybe.empty();
    return Maybe.of(fn(this.#value));
  }

  flatMap(fn) {
    if (this.isNothing()) return Maybe.empty();
    return fn(this.#value);
  }

  getOrElse(defaultValue) {
    return this.isNothing() ? defaultValue : this.#value;
  }
}

// Test:
// Maybe.of({ address: { city: 'Paris' } })
//   .map(u => u.address)
//   .map(a => a.city)
//   .map(c => c.toUpperCase())
//   .getOrElse('UNKNOWN')  // 'PARIS'
//
// Maybe.of(null)
//   .map(u => u.address)
//   .getOrElse('UNKNOWN')  // 'UNKNOWN'`,
      hints: [
        'Check isNothing() first -- if true, short-circuit by returning Maybe.empty().',
        'map wraps the result in Maybe.of(), flatMap does not (fn already returns a Maybe).',
        'getOrElse returns the default when the Maybe is empty.',
      ],
      concepts: ['Maybe', 'monad', 'null safety', 'method chaining'],
    },
    {
      id: 'js-functional-9',
      title: 'Either / Result',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Implement Left (error) and Right (success) types for error handling without exceptions.',
      skeleton: `class Right {
  #value;
  constructor(value) { this.#value = value; }

  map(fn) {
    // Apply fn to the value, return new Right

  }
  flatMap(fn) {
    // Apply fn (returns Right/Left), return result

  }
  getOrElse(_default) { return this.#value; }
  fold(leftFn, rightFn) { return rightFn(this.#value); }
}

class Left {
  #value;
  constructor(value) { this.#value = value; }

  map(_fn) {
    // Skip -- return this Left unchanged

  }
  flatMap(_fn) {
    // Skip -- return this Left unchanged

  }
  getOrElse(defaultValue) { return defaultValue; }
  fold(leftFn, _rightFn) { return leftFn(this.#value); }
}

// Helpers
const right = (value) => new Right(value);
const left = (error) => new Left(error);

// Test:
// right(5)
//   .map(x => x * 2)
//   .map(x => x + 1)
//   .getOrElse(0)  // 11
//
// left('error')
//   .map(x => x * 2)
//   .getOrElse(0)  // 0`,
      solution: `class Right {
  #value;
  constructor(value) { this.#value = value; }

  map(fn) {
    return right(fn(this.#value));
  }
  flatMap(fn) {
    return fn(this.#value);
  }
  getOrElse(_default) { return this.#value; }
  fold(leftFn, rightFn) { return rightFn(this.#value); }
}

class Left {
  #value;
  constructor(value) { this.#value = value; }

  map(_fn) {
    return this;
  }
  flatMap(_fn) {
    return this;
  }
  getOrElse(defaultValue) { return defaultValue; }
  fold(leftFn, _rightFn) { return leftFn(this.#value); }
}

const right = (value) => new Right(value);
const left = (error) => new Left(error);

// Test:
// right(5)
//   .map(x => x * 2)
//   .map(x => x + 1)
//   .getOrElse(0)  // 11
//
// left('error')
//   .map(x => x * 2)
//   .getOrElse(0)  // 0`,
      hints: [
        'Right.map applies the function and wraps in a new Right.',
        'Left.map and Left.flatMap both return this -- the error propagates unchanged.',
        'fold takes two functions: one for Left (error case), one for Right (success case).',
      ],
      concepts: ['Either', 'Result', 'error handling', 'functional error handling'],
    },
    {
      id: 'js-functional-10',
      title: 'Memoization',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a memoize function that caches results based on arguments. Support single and multiple arguments.',
      skeleton: `function memoize(fn) {
  // Cache results keyed by arguments
  // Return cached result if the same arguments are provided again



}

// Test:
// let calls = 0;
// const expensive = memoize((a, b) => { calls++; return a + b; });
// expensive(1, 2); // 3, calls = 1
// expensive(1, 2); // 3, calls = 1 (cached)
// expensive(2, 3); // 5, calls = 2`,
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
}

// Test:
// let calls = 0;
// const expensive = memoize((a, b) => { calls++; return a + b; });
// expensive(1, 2); // 3, calls = 1
// expensive(1, 2); // 3, calls = 1 (cached)
// expensive(2, 3); // 5, calls = 2`,
      hints: [
        'Use a Map to store results, with the arguments as the key.',
        'JSON.stringify(args) creates a simple cache key for multiple arguments.',
        'Check cache.has(key) before computing, and store the result after.',
      ],
      concepts: ['memoization', 'caching', 'Map', 'JSON.stringify'],
    },
    {
      id: 'js-functional-11',
      title: 'Transducer Concept',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fill in the blanks to create composable transducers that avoid intermediate arrays.',
      skeleton: `// A transducer transforms a reducer into a new reducer
const mapT = (fn) => (step) => (acc, x) => step(acc, __BLANK__);
const filterT = (pred) => (step) => (acc, x) => pred(x) ? __BLANK__ : acc;

// Compose transducers (right-to-left like compose)
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

// Final step: push into array
const pushReducer = (acc, x) => { acc.push(x); return acc; };

// Build a transducer that doubles and filters evens
const xform = __BLANK__(
  filterT(x => x % 2 === 0),
  mapT(x => x * 2)
);

const result = [1, 2, 3, 4, 5].reduce(xform(pushReducer), []);
// result: [4, 8]  (filter even first: [2,4], then double: [4,8])`,
      solution: `// A transducer transforms a reducer into a new reducer
const mapT = (fn) => (step) => (acc, x) => step(acc, fn(x));
const filterT = (pred) => (step) => (acc, x) => pred(x) ? step(acc, x) : acc;

// Compose transducers (right-to-left like compose)
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

// Final step: push into array
const pushReducer = (acc, x) => { acc.push(x); return acc; };

// Build a transducer that doubles and filters evens
const xform = compose(
  filterT(x => x % 2 === 0),
  mapT(x => x * 2)
);

const result = [1, 2, 3, 4, 5].reduce(xform(pushReducer), []);
// result: [4, 8]  (filter even first: [2,4], then double: [4,8])`,
      hints: [
        'mapT transforms the value with fn before passing to the next step.',
        'filterT calls step only if the predicate passes, otherwise returns acc unchanged.',
        'Use compose to combine transducers -- they compose like regular functions.',
      ],
      concepts: ['transducers', 'composition', 'reducers', 'performance'],
    },
    {
      id: 'js-functional-12',
      title: 'Lens Concept',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Implement a simple lens: a pair of getter/setter functions for focusing on a nested property.',
      skeleton: `function lens(getter, setter) {
  return {
    get(obj) {
      // Use getter to extract the focused value

    },
    set(val, obj) {
      // Use setter to return a new object with the focused value changed

    },
    over(fn, obj) {
      // Apply fn to the focused value and set the result

    },
  };
}

// Helper to create a lens for a property name
function prop(key) {
  return lens(
    (obj) => obj[key],
    (val, obj) => ({ ...obj, [key]: val })
  );
}

// Test:
// const nameLens = prop('name');
// nameLens.get({ name: 'Alice', age: 30 });  // 'Alice'
// nameLens.set('Bob', { name: 'Alice', age: 30 });  // { name: 'Bob', age: 30 }
// nameLens.over(s => s.toUpperCase(), { name: 'Alice', age: 30 });  // { name: 'ALICE', age: 30 }`,
      solution: `function lens(getter, setter) {
  return {
    get(obj) {
      return getter(obj);
    },
    set(val, obj) {
      return setter(val, obj);
    },
    over(fn, obj) {
      return setter(fn(getter(obj)), obj);
    },
  };
}

function prop(key) {
  return lens(
    (obj) => obj[key],
    (val, obj) => ({ ...obj, [key]: val })
  );
}

// Test:
// const nameLens = prop('name');
// nameLens.get({ name: 'Alice', age: 30 });  // 'Alice'
// nameLens.set('Bob', { name: 'Alice', age: 30 });  // { name: 'Bob', age: 30 }
// nameLens.over(s => s.toUpperCase(), { name: 'Alice', age: 30 });  // { name: 'ALICE', age: 30 }`,
      hints: [
        'get simply delegates to the getter function.',
        'set delegates to the setter function with the new value.',
        'over combines both: get the current value, apply fn, then set the result.',
      ],
      concepts: ['lens', 'getter', 'setter', 'immutable updates', 'functional optics'],
    },
    {
      id: 'js-functional-13',
      title: 'Algebraic Data Types',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the match function that pattern-matches on tagged union types.',
      skeleton: `// BUG: match does not properly handle all cases and crashes on unknown tags
const Shape = {
  Circle: (radius) => ({ tag: 'Circle', radius }),
  Rect: (w, h) => ({ tag: 'Rect', w, h }),
  Triangle: (base, height) => ({ tag: 'Triangle', base, height }),
};

function area(shape) {
  const handlers = {
    Circle: (s) => Math.PI * s.radius ** 2,
    Rect: (s) => s.w * s.h,
  };
  // BUG: crashes if shape.tag is 'Triangle' or unknown
  return handlers[shape.tag](shape);
}

console.log(area(Shape.Circle(5)));
console.log(area(Shape.Rect(4, 6)));
console.log(area(Shape.Triangle(3, 8)));  // TypeError!`,
      solution: `const Shape = {
  Circle: (radius) => ({ tag: 'Circle', radius }),
  Rect: (w, h) => ({ tag: 'Rect', w, h }),
  Triangle: (base, height) => ({ tag: 'Triangle', base, height }),
};

function area(shape) {
  const handlers = {
    Circle: (s) => Math.PI * s.radius ** 2,
    Rect: (s) => s.w * s.h,
    Triangle: (s) => (s.base * s.height) / 2,
  };
  const handler = handlers[shape.tag];
  if (!handler) {
    throw new Error(\`Unknown shape: \${shape.tag}\`);
  }
  return handler(shape);
}

console.log(area(Shape.Circle(5)));
console.log(area(Shape.Rect(4, 6)));
console.log(area(Shape.Triangle(3, 8)));  // 12`,
      hints: [
        'Add a handler for Triangle: (s) => (s.base * s.height) / 2.',
        'Check if the handler exists before calling it to avoid crashing on unknown tags.',
        'Throw a descriptive error for unhandled tags instead of silently failing.',
      ],
      concepts: ['algebraic data types', 'tagged unions', 'pattern matching', 'exhaustive handling'],
    },
    {
      id: 'js-functional-14',
      title: 'Reducer Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a reducer function for a shopping cart that handles ADD_ITEM, REMOVE_ITEM, and CLEAR actions immutably.',
      skeleton: `function cartReducer(state, action) {
  // state: { items: [{ id, name, price, qty }], total: number }
  // action: { type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'CLEAR', payload? }
  // Return new state (immutable)



}

const initial = { items: [], total: 0 };

// Test:
// let state = cartReducer(initial, {
//   type: 'ADD_ITEM',
//   payload: { id: 1, name: 'Widget', price: 9.99, qty: 2 }
// });
// state.items.length === 1
// state.total === 19.98`,
      solution: `function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        const items = state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, qty: i.qty + action.payload.qty }
            : i
        );
        return {
          items,
          total: items.reduce((sum, i) => sum + i.price * i.qty, 0),
        };
      }
      const items = [...state.items, action.payload];
      return {
        items,
        total: items.reduce((sum, i) => sum + i.price * i.qty, 0),
      };
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter(i => i.id !== action.payload.id);
      return {
        items,
        total: items.reduce((sum, i) => sum + i.price * i.qty, 0),
      };
    }
    case 'CLEAR':
      return { items: [], total: 0 };
    default:
      return state;
  }
}

const initial = { items: [], total: 0 };

// Test:
// let state = cartReducer(initial, {
//   type: 'ADD_ITEM',
//   payload: { id: 1, name: 'Widget', price: 9.99, qty: 2 }
// });
// state.items.length === 1
// state.total === 19.98`,
      hints: [
        'Use switch on action.type. Always return a new state object.',
        'For ADD_ITEM, check if the item already exists and update qty, or add new.',
        'Recalculate total from the items array using reduce after each change.',
      ],
      concepts: ['reducer', 'immutable state', 'switch', 'action pattern'],
    },
    {
      id: 'js-functional-15',
      title: 'Middleware Pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Implement a middleware pipeline where each middleware can modify the context and call next() to pass control.',
      skeleton: `function createPipeline() {
  const middlewares = [];

  function use(fn) {
    // Add a middleware function
    // Each middleware receives (ctx, next) and must call next() to continue

  }

  function execute(ctx) {
    // Run all middlewares in order
    // Each calls next() to invoke the next middleware
    // Return a promise that resolves when all have run


  }

  return { use, execute };
}

// Test:
// const pipeline = createPipeline();
// pipeline.use(async (ctx, next) => {
//   ctx.logs.push('start');
//   await next();
//   ctx.logs.push('end');
// });
// pipeline.use(async (ctx, next) => {
//   ctx.logs.push('middle');
//   await next();
// });
// const ctx = { logs: [] };
// await pipeline.execute(ctx);
// ctx.logs // ['start', 'middle', 'end']`,
      solution: `function createPipeline() {
  const middlewares = [];

  function use(fn) {
    middlewares.push(fn);
  }

  async function execute(ctx) {
    let index = 0;

    async function next() {
      if (index < middlewares.length) {
        const mw = middlewares[index++];
        await mw(ctx, next);
      }
    }

    await next();
  }

  return { use, execute };
}

// Test:
// const pipeline = createPipeline();
// pipeline.use(async (ctx, next) => {
//   ctx.logs.push('start');
//   await next();
//   ctx.logs.push('end');
// });
// pipeline.use(async (ctx, next) => {
//   ctx.logs.push('middle');
//   await next();
// });
// const ctx = { logs: [] };
// await pipeline.execute(ctx);
// ctx.logs // ['start', 'middle', 'end']`,
      hints: [
        'Track the current index; each call to next() advances to the next middleware.',
        'Each middleware receives ctx and a next function to call when ready to proceed.',
        'Use async/await to support asynchronous middleware.',
      ],
      concepts: ['middleware', 'pipeline', 'async/await', 'Koa-style middleware'],
    },
    {
      id: 'js-functional-16',
      title: 'Immutable Update Helpers',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write helper functions for deep immutable updates: setIn, updateIn, and removeIn for nested object paths.',
      skeleton: `function setIn(obj, path, value) {
  // Set a deeply nested value immutably
  // path is an array of keys: ['a', 'b', 'c']


}

function updateIn(obj, path, fn) {
  // Apply fn to the value at path, set the result


}

function removeIn(obj, path) {
  // Remove the property at path immutably


}

// Test:
// const state = { user: { profile: { name: 'Alice', age: 30 } } };
// setIn(state, ['user', 'profile', 'name'], 'Bob')
//   // { user: { profile: { name: 'Bob', age: 30 } } }
// updateIn(state, ['user', 'profile', 'age'], x => x + 1)
//   // { user: { profile: { name: 'Alice', age: 31 } } }`,
      solution: `function setIn(obj, path, value) {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  return {
    ...obj,
    [head]: setIn(obj?.[head] ?? {}, rest, value),
  };
}

function updateIn(obj, path, fn) {
  if (path.length === 0) return fn(obj);
  const [head, ...rest] = path;
  return {
    ...obj,
    [head]: updateIn(obj?.[head] ?? {}, rest, fn),
  };
}

function removeIn(obj, path) {
  if (path.length === 1) {
    const { [path[0]]: _, ...rest } = obj;
    return rest;
  }
  const [head, ...tail] = path;
  return {
    ...obj,
    [head]: removeIn(obj[head], tail),
  };
}

// Test:
// const state = { user: { profile: { name: 'Alice', age: 30 } } };
// setIn(state, ['user', 'profile', 'name'], 'Bob')
//   // { user: { profile: { name: 'Bob', age: 30 } } }
// updateIn(state, ['user', 'profile', 'age'], x => x + 1)
//   // { user: { profile: { name: 'Alice', age: 31 } } }`,
      hints: [
        'Recursively spread at each level: { ...obj, [key]: recurse(obj[key], rest) }.',
        'Base case for setIn: path.length === 0 means return the value.',
        'removeIn at the last key uses destructuring to omit the property.',
      ],
      concepts: ['immutable updates', 'recursion', 'spread operator', 'deep updates'],
    },
    {
      id: 'js-functional-17',
      title: 'Memoize with WeakMap',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the memoize function that leaks memory when used with object arguments.',
      skeleton: `// BUG: JSON.stringify is slow for objects and the cache grows unbounded
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (key in cache) return cache[key];
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Used with object arguments -- leaks memory
const processUser = memoize((user) => {
  return { ...user, processed: true };
});

// Each unique user string representation stays in cache forever`,
      solution: `// FIX: Use WeakMap for single-object-argument memoization
function memoize(fn) {
  const cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) return cache.get(arg);
    const result = fn.call(this, arg);
    cache.set(arg, result);
    return result;
  };
}

// WeakMap keys are held weakly -- entries are GC'd when the key object is GC'd
const processUser = memoize((user) => {
  return { ...user, processed: true };
});

// When user objects are no longer referenced elsewhere, cache entries are freed`,
      hints: [
        'WeakMap accepts objects as keys and does not prevent garbage collection.',
        'For single-object-argument functions, WeakMap is ideal for memoization.',
        'WeakMap entries are automatically removed when the key object is GC-eligible.',
      ],
      concepts: ['WeakMap', 'memoization', 'memory leak', 'garbage collection'],
    },
    {
      id: 'js-functional-18',
      title: 'Functional Error Handling',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor try/catch error handling into a functional tryCatch utility that returns Either (Right/Left) values.',
      skeleton: `// Imperative -- nested try/catch
function processData(raw) {
  try {
    const parsed = JSON.parse(raw);
    try {
      const validated = validateSchema(parsed);
      try {
        const result = transform(validated);
        return { ok: true, data: result };
      } catch (e) {
        return { ok: false, error: 'Transform failed: ' + e.message };
      }
    } catch (e) {
      return { ok: false, error: 'Validation failed: ' + e.message };
    }
  } catch (e) {
    return { ok: false, error: 'Parse failed: ' + e.message };
  }
}

function validateSchema(data) {
  if (!data.name) throw new Error('Missing name');
  return data;
}

function transform(data) {
  return { ...data, name: data.name.toUpperCase() };
}`,
      solution: `// Functional -- compose with tryCatch and Either
const right = (v) => ({
  map: (fn) => tryCatch(() => fn(v)),
  flatMap: (fn) => fn(v),
  getOrElse: () => v,
  fold: (_, rightFn) => rightFn(v),
});

const left = (e) => ({
  map: () => left(e),
  flatMap: () => left(e),
  getOrElse: (d) => d,
  fold: (leftFn) => leftFn(e),
});

function tryCatch(fn) {
  try {
    return right(fn());
  } catch (e) {
    return left(e.message);
  }
}

function processData(raw) {
  return tryCatch(() => JSON.parse(raw))
    .map(validateSchema)
    .map(transform)
    .fold(
      (error) => ({ ok: false, error }),
      (data) => ({ ok: true, data })
    );
}

function validateSchema(data) {
  if (!data.name) throw new Error('Missing name');
  return data;
}

function transform(data) {
  return { ...data, name: data.name.toUpperCase() };
}`,
      hints: [
        'Create a tryCatch function that wraps a function call in try/catch and returns Right or Left.',
        'Chain .map() calls to compose the pipeline -- errors short-circuit through Left.',
        'Use .fold() at the end to extract the final result for both success and error cases.',
      ],
      concepts: ['Either', 'tryCatch', 'functional error handling', 'refactoring'],
    },
    {
      id: 'js-functional-19',
      title: 'Practical: Data Pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Build a data pipeline using pipe, curry, and functional helpers to transform raw API data into a sorted, formatted display list.',
      skeleton: `const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const curry = (fn) => {
  const arity = fn.length;
  return function curried(...args) {
    return args.length >= arity ? fn(...args) : (...m) => curried(...args, ...m);
  };
};

// Curried helpers (implement these)
const filterBy = curry((pred, arr) => {
  // Filter array by predicate

});

const mapWith = curry((fn, arr) => {
  // Map array with fn

});

const sortBy = curry((key, arr) => {
  // Sort array by key (ascending), return new array

});

// Build the pipeline
const processUsers = pipe(
  filterBy(u => u.active),
  mapWith(u => ({ name: u.name, email: u.email })),
  sortBy('name')
);

// Test:
// processUsers([
//   { name: 'Charlie', email: 'c@test.com', active: true },
//   { name: 'Alice', email: 'a@test.com', active: true },
//   { name: 'Bob', email: 'b@test.com', active: false },
// ])
// => [{ name: 'Alice', email: 'a@test.com' }, { name: 'Charlie', email: 'c@test.com' }]`,
      solution: `const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const curry = (fn) => {
  const arity = fn.length;
  return function curried(...args) {
    return args.length >= arity ? fn(...args) : (...m) => curried(...args, ...m);
  };
};

const filterBy = curry((pred, arr) => {
  return arr.filter(pred);
});

const mapWith = curry((fn, arr) => {
  return arr.map(fn);
});

const sortBy = curry((key, arr) => {
  return [...arr].sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0));
});

const processUsers = pipe(
  filterBy(u => u.active),
  mapWith(u => ({ name: u.name, email: u.email })),
  sortBy('name')
);

// Test:
// processUsers([
//   { name: 'Charlie', email: 'c@test.com', active: true },
//   { name: 'Alice', email: 'a@test.com', active: true },
//   { name: 'Bob', email: 'b@test.com', active: false },
// ])
// => [{ name: 'Alice', email: 'a@test.com' }, { name: 'Charlie', email: 'c@test.com' }]`,
      hints: [
        'filterBy delegates to arr.filter(pred).',
        'sortBy must return a new sorted array: [...arr].sort(comparator).',
        'Because each helper is curried, passing one argument returns a function waiting for the array.',
      ],
      concepts: ['pipe', 'curry', 'data pipeline', 'functional composition'],
    },
    {
      id: 'js-functional-20',
      title: 'Combined Functional Patterns',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a validation library using functional patterns: composable validators that return Either results, with a validate function that runs all validators and collects errors.',
      skeleton: `// Validator: (value) => Right(value) | Left(errorMessage)

function validator(predicate, errorMsg) {
  // Create a validator function that returns Right or Left


}

function composeValidators(...validators) {
  // Run all validators, collect ALL Left errors
  // Return Right(value) if all pass, Left(errors[]) if any fail


}

// Built-in validators
const required = validator(v => v != null && v !== '', 'Required');
const minLength = (n) => validator(v => v.length >= n, 'Min length: ' + n);
const isEmail = validator(v => /^[^@]+@[^@]+$/.test(v), 'Invalid email');

const validateEmail = composeValidators(required, minLength(5), isEmail);

// Test:
// validateEmail('a@b.com')  // Right('a@b.com')
// validateEmail('')         // Left(['Required', 'Min length: 5', 'Invalid email'])
// validateEmail('abc')      // Left(['Invalid email'])`,
      solution: `const right = (v) => ({ tag: 'right', value: v });
const left = (e) => ({ tag: 'left', value: e });
const isRight = (r) => r.tag === 'right';

function validator(predicate, errorMsg) {
  return (value) => predicate(value) ? right(value) : left(errorMsg);
}

function composeValidators(...validators) {
  return (value) => {
    const errors = [];
    for (const v of validators) {
      const result = v(value);
      if (!isRight(result)) {
        errors.push(result.value);
      }
    }
    return errors.length === 0 ? right(value) : left(errors);
  };
}

const required = validator(v => v != null && v !== '', 'Required');
const minLength = (n) => validator(v => v.length >= n, \`Min length: \${n}\`);
const isEmail = validator(v => /^[^@]+@[^@]+$/.test(v), 'Invalid email');

const validateEmail = composeValidators(required, minLength(5), isEmail);

// Test:
// validateEmail('a@b.com')  // Right('a@b.com')
// validateEmail('')         // Left(['Required', 'Min length: 5', 'Invalid email'])
// validateEmail('abc')      // Left(['Invalid email'])`,
      hints: [
        'Each validator returns Right(value) if the predicate passes, Left(errorMsg) if not.',
        'composeValidators runs ALL validators (not short-circuiting) to collect all errors.',
        'Return Right if errors array is empty, Left with the errors array otherwise.',
      ],
      concepts: ['validation', 'Either', 'composition', 'applicative', 'error accumulation'],
    },
  ],
};
