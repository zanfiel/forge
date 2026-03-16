import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-this-binding',
  title: '18. The this Keyword',
  explanation: `## The this Keyword

\`this\` is determined by **how** a function is called, not where it is defined (except arrow functions).

### Binding Rules (in priority order)
1. **new binding** -- \`new Foo()\` sets \`this\` to the new instance
2. **Explicit binding** -- \`call\`, \`apply\`, \`bind\` set \`this\` explicitly
3. **Implicit binding** -- \`obj.method()\` sets \`this\` to \`obj\`
4. **Default binding** -- standalone call; \`globalThis\` (sloppy) or \`undefined\` (strict)

### Arrow Functions
Arrow functions capture \`this\` from the enclosing lexical scope at creation time. They **cannot** be rebound with call/apply/bind.

### Common Pitfalls
\`\`\`js
const obj = {
  name: 'Alice',
  greet() { return 'Hi ' + this.name; },
};
const fn = obj.greet;
fn(); // 'Hi undefined' -- this is lost!
\`\`\`

### bind, call, apply
- \`fn.call(thisArg, a, b)\` -- invoke with this and args
- \`fn.apply(thisArg, [a, b])\` -- invoke with this and args array
- \`fn.bind(thisArg)\` -- returns new function with bound this
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-this-1b',
      title: 'Implicit binding',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the keyword that refers to the calling object.',
      skeleton: `const user = {
  name: 'Alice',
  greet() {
    return 'Hello, ' + __BLANK__.name;
  },
};

console.log(user.greet()); // 'Hello, Alice'`,
      solution: `const user = {
  name: 'Alice',
  greet() {
    return 'Hello, ' + this.name;
  },
};

console.log(user.greet()); // 'Hello, Alice'`,
      hints: [
        'When a method is called on an object, it can reference that object.',
        'The keyword refers to the context the function is called on.',
        'The keyword is `this`.',
      ],
      concepts: ['this', 'implicit binding'],
    },
    {
      id: 'js-this-2b',
      title: 'Explicit binding with call',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Use call to invoke the function with a specific this.',
      skeleton: `function greet() {
  return 'Hi, ' + this.name;
}

const person = { name: 'Bob' };
console.log(greet.__BLANK__(person)); // 'Hi, Bob'`,
      solution: `function greet() {
  return 'Hi, ' + this.name;
}

const person = { name: 'Bob' };
console.log(greet.call(person)); // 'Hi, Bob'`,
      hints: [
        'There is a method on functions that sets this and invokes immediately.',
        'It takes the desired this value as its first argument.',
        'The method is `call`.',
      ],
      concepts: ['call', 'explicit binding'],
    },
    {
      id: 'js-this-3b',
      title: 'Bind for later use',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Create a bound version of the function.',
      skeleton: `const counter = {
  count: 0,
  increment() { this.count += 1; },
};

const inc = counter.increment.__BLANK__(counter);
inc();
console.log(counter.count); // 1`,
      solution: `const counter = {
  count: 0,
  increment() { this.count += 1; },
};

const inc = counter.increment.bind(counter);
inc();
console.log(counter.count); // 1`,
      hints: [
        'You need a method that returns a new function with a fixed this.',
        'It does not invoke the function immediately.',
        'The method is `bind`.',
      ],
      concepts: ['bind', 'explicit binding'],
    },
    {
      id: 'js-this-4i',
      title: 'apply with arguments array',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Use apply to pass arguments as an array.',
      skeleton: `function sum(a, b, c) {
  return this.base + a + b + c;
}

const ctx = { base: 10 };
const args = [1, 2, 3];
console.log(sum.__BLANK__(ctx, args)); // 16`,
      solution: `function sum(a, b, c) {
  return this.base + a + b + c;
}

const ctx = { base: 10 };
const args = [1, 2, 3];
console.log(sum.apply(ctx, args)); // 16`,
      hints: [
        'Like call, but takes arguments as an array.',
        'First argument is the this value, second is an array.',
        'The method is `apply`.',
      ],
      concepts: ['apply', 'explicit binding'],
    },
    {
      id: 'js-this-5i',
      title: 'Arrow function this',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Use an arrow function to preserve the outer this.',
      skeleton: `class Timer {
  constructor() {
    this.seconds = 0;
  }
  start() {
    setInterval(__BLANK__ {
      this.seconds += 1;
    }, 1000);
  }
}`,
      solution: `class Timer {
  constructor() {
    this.seconds = 0;
  }
  start() {
    setInterval(() => {
      this.seconds += 1;
    }, 1000);
  }
}`,
      hints: [
        'Regular functions in callbacks lose the outer this.',
        'A certain function syntax inherits this from the enclosing scope.',
        'Use `() =>` to create an arrow function.',
      ],
      concepts: ['arrow function', 'lexical this', 'setInterval'],
    },
    {
      id: 'js-this-6a',
      title: 'Partial application with bind',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Use bind for partial application.',
      skeleton: `function multiply(a, b) {
  return a * b;
}

const double = multiply.__BLANK__(null, 2);
console.log(double(5)); // 10
console.log(double(8)); // 16`,
      solution: `function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // 10
console.log(double(8)); // 16`,
      hints: [
        'bind can also pre-fill arguments, not just this.',
        'Pass null as this since we do not need it.',
        'Use `bind(null, 2)` to fix the first argument as 2.',
      ],
      concepts: ['bind', 'partial application', 'currying'],
    },

    // ---- write-function (6) ----
    {
      id: 'js-this-7b',
      title: 'Fix lost this with bind',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function that extracts a method and binds it to its object.',
      skeleton: `const logger = {
  prefix: '[LOG]',
  log(msg) {
    return this.prefix + ' ' + msg;
  },
};

// Write function extractBound(obj, methodName) that returns
// a bound version of obj[methodName] tied to obj
`,
      solution: `const logger = {
  prefix: '[LOG]',
  log(msg) {
    return this.prefix + ' ' + msg;
  },
};

function extractBound(obj, methodName) {
  return obj[methodName].bind(obj);
}`,
      hints: [
        'Access the method via obj[methodName].',
        'Use bind to tie it permanently to obj.',
        'Return the bound function.',
      ],
      concepts: ['bind', 'method extraction', 'this'],
    },
    {
      id: 'js-this-8i',
      title: 'Custom bind implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Implement a simple version of Function.prototype.bind.',
      skeleton: `// Write function myBind(fn, thisArg, ...prefilled) that returns a new
// function. When called, it invokes fn with thisArg as this, prepending
// the prefilled args before any new args.
`,
      solution: `function myBind(fn, thisArg, ...prefilled) {
  return function (...args) {
    return fn.apply(thisArg, [...prefilled, ...args]);
  };
}`,
      hints: [
        'Return a new function that captures fn, thisArg, and prefilled via closure.',
        'Use apply to set this and combine prefilled and new args.',
        'Spread prefilled before the new args array.',
      ],
      concepts: ['bind', 'apply', 'closure', 'rest parameters'],
    },
    {
      id: 'js-this-9i',
      title: 'Method borrowing',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Borrow Array.prototype methods for an array-like object.',
      skeleton: `// Write function toArray(arrayLike) that converts an array-like object
// (like arguments or NodeList) to a real array using call.
// Do NOT use Array.from or spread -- use Array.prototype.slice.call
`,
      solution: `function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
}`,
      hints: [
        'Array.prototype.slice works on any array-like object.',
        'Use call to set the this to the array-like object.',
        'slice() with no arguments copies everything.',
      ],
      concepts: ['call', 'method borrowing', 'Array.prototype', 'array-like'],
    },
    {
      id: 'js-this-10i',
      title: 'Bind all methods',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that binds all methods of an object to itself.',
      skeleton: `// Write function bindAll(obj) that iterates over all own properties of obj
// and for each that is a function, replaces it with a bound version.
// Return obj for chaining.
`,
      solution: `function bindAll(obj) {
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'function') {
      obj[key] = obj[key].bind(obj);
    }
  }
  return obj;
}`,
      hints: [
        'Loop over Object.keys(obj) to get own properties.',
        'Check typeof to find function properties.',
        'Replace each function with obj[key].bind(obj).',
      ],
      concepts: ['bind', 'Object.keys', 'typeof', 'this'],
    },
    {
      id: 'js-this-11a',
      title: 'Soft bind',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Implement soft binding: use default this unless explicitly rebound.',
      skeleton: `// Write function softBind(fn, defaultThis) that returns a new function.
// If called with this === undefined or this === globalThis, use defaultThis.
// Otherwise, use the actual this (allowing call/apply/bind to override).
`,
      solution: `function softBind(fn, defaultThis) {
  return function (...args) {
    const boundThis = (!this || this === globalThis) ? defaultThis : this;
    return fn.apply(boundThis, args);
  };
}`,
      hints: [
        'Check if this is undefined/null or globalThis.',
        'If so, fall back to defaultThis.',
        'Otherwise use the provided this, allowing explicit rebinding.',
      ],
      concepts: ['soft bind', 'this', 'apply', 'globalThis'],
    },
    {
      id: 'js-this-12a',
      title: 'Chained method context',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Create a builder that supports method chaining by returning this.',
      skeleton: `// Write a class QueryBuilder with:
// - constructor: initialise this.parts = []
// - select(fields): push 'SELECT ' + fields, return this
// - from(table): push 'FROM ' + table, return this
// - where(condition): push 'WHERE ' + condition, return this
// - build(): join parts with ' ' and return the string
`,
      solution: `class QueryBuilder {
  constructor() {
    this.parts = [];
  }

  select(fields) {
    this.parts.push('SELECT ' + fields);
    return this;
  }

  from(table) {
    this.parts.push('FROM ' + table);
    return this;
  }

  where(condition) {
    this.parts.push('WHERE ' + condition);
    return this;
  }

  build() {
    return this.parts.join(' ');
  }
}`,
      hints: [
        'Each chainable method must return this.',
        'this refers to the QueryBuilder instance.',
        'build() joins all parts into a single string.',
      ],
      concepts: ['this', 'method chaining', 'builder pattern'],
    },

    // ---- fix-bug (3) ----
    {
      id: 'js-this-13b',
      title: 'Lost this in callback',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fix the callback that loses its this context.',
      skeleton: `class Countdown {
  constructor(from) {
    this.count = from;
  }
  start() {
    setTimeout(function () {
      this.count -= 1;
      console.log(this.count);
    }, 1000);
  }
}`,
      solution: `class Countdown {
  constructor(from) {
    this.count = from;
  }
  start() {
    setTimeout(() => {
      this.count -= 1;
      console.log(this.count);
    }, 1000);
  }
}`,
      hints: [
        'The regular function in setTimeout gets its own this.',
        'In a timeout callback, this is globalThis (or undefined in strict mode).',
        'Use an arrow function to inherit this from start().',
      ],
      concepts: ['this', 'arrow function', 'setTimeout'],
    },
    {
      id: 'js-this-14i',
      title: 'Event handler this',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the event handler that loses the class context.',
      skeleton: `class ClickTracker {
  constructor() {
    this.clicks = 0;
  }

  handleClick() {
    this.clicks += 1;
    console.log('Clicks: ' + this.clicks);
  }

  attach(element) {
    element.addEventListener('click', this.handleClick);
  }
}`,
      solution: `class ClickTracker {
  constructor() {
    this.clicks = 0;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.clicks += 1;
    console.log('Clicks: ' + this.clicks);
  }

  attach(element) {
    element.addEventListener('click', this.handleClick);
  }
}`,
      hints: [
        'addEventListener calls the handler with this set to the element.',
        'The class instance is lost when passing the method as a callback.',
        'Bind the method in the constructor so it always uses the instance.',
      ],
      concepts: ['this', 'bind', 'addEventListener', 'event handler'],
    },
    {
      id: 'js-this-15a',
      title: 'Nested function this',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fix the nested function that cannot access the outer this.',
      skeleton: `const calculator = {
  values: [1, 2, 3, 4, 5],
  multiplier: 10,

  getMultiplied() {
    return this.values.map(function (val) {
      return val * this.multiplier;
    });
  },
};

console.log(calculator.getMultiplied()); // [NaN, NaN, NaN, NaN, NaN]`,
      solution: `const calculator = {
  values: [1, 2, 3, 4, 5],
  multiplier: 10,

  getMultiplied() {
    return this.values.map((val) => {
      return val * this.multiplier;
    });
  },
};

console.log(calculator.getMultiplied()); // [10, 20, 30, 40, 50]`,
      hints: [
        'The regular function callback in map has its own this.',
        'Inside the callback, this.multiplier is undefined.',
        'Replace the function with an arrow function to inherit outer this.',
      ],
      concepts: ['this', 'arrow function', 'map', 'nested function'],
    },

    // ---- predict-output (3) ----
    {
      id: 'js-this-16b',
      title: 'Method extraction',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict what happens when a method is extracted from its object.',
      skeleton: `'use strict';

const obj = {
  value: 42,
  getValue() { return this.value; },
};

const fn = obj.getValue;

try {
  console.log(fn());
} catch (e) {
  console.log(e.constructor.name);
}`,
      solution: `'use strict';

const obj = {
  value: 42,
  getValue() { return this.value; },
};

const fn = obj.getValue;

try {
  console.log(fn());
} catch (e) {
  console.log(e.constructor.name);
}`,
      expectedOutput: `TypeError`,
      hints: [
        'Extracting a method loses implicit binding.',
        'In strict mode, standalone function calls have this === undefined.',
        'Accessing undefined.value throws a TypeError.',
      ],
      concepts: ['this', 'strict mode', 'method extraction', 'TypeError'],
    },
    {
      id: 'js-this-17i',
      title: 'call vs bind',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output of call and bind interactions.',
      skeleton: `function getName() {
  return this.name;
}

const a = { name: 'Alice' };
const b = { name: 'Bob' };

const boundToA = getName.bind(a);
console.log(boundToA());
console.log(boundToA.call(b));`,
      solution: `function getName() {
  return this.name;
}

const a = { name: 'Alice' };
const b = { name: 'Bob' };

const boundToA = getName.bind(a);
console.log(boundToA());
console.log(boundToA.call(b));`,
      expectedOutput: `Alice
Alice`,
      hints: [
        'bind creates a permanently bound function.',
        'Once bound, call/apply cannot override the binding.',
        'Both calls return Alice.',
      ],
      concepts: ['bind', 'call', 'binding precedence'],
    },
    {
      id: 'js-this-18a',
      title: 'Arrow in object literal',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict the this value in an arrow function defined in an object literal.',
      skeleton: `const obj = {
  name: 'obj',
  arrow: () => typeof this,
  regular() { return typeof this; },
};

console.log(obj.arrow());
console.log(obj.regular());`,
      solution: `const obj = {
  name: 'obj',
  arrow: () => typeof this,
  regular() { return typeof this; },
};

console.log(obj.arrow());
console.log(obj.regular());`,
      expectedOutput: `undefined
object`,
      hints: [
        'Arrow functions capture this from their lexical scope, not the object.',
        'The outer scope of an object literal is the module/global scope.',
        'In a module or strict mode, outer this is undefined.',
      ],
      concepts: ['arrow function', 'lexical this', 'object literal'],
    },

    // ---- refactor (2) ----
    {
      id: 'js-this-19i',
      title: 'Replace self = this with arrow',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Replace the var self = this pattern with arrow functions.',
      skeleton: `function Fetcher(url) {
  this.url = url;
  this.data = null;
}

Fetcher.prototype.fetch = function () {
  var self = this;
  return fetch(self.url)
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      self.data = json;
      return self.data;
    });
};`,
      solution: `class Fetcher {
  constructor(url) {
    this.url = url;
    this.data = null;
  }

  fetch() {
    return fetch(this.url)
      .then((res) => res.json())
      .then((json) => {
        this.data = json;
        return this.data;
      });
  }
}`,
      hints: [
        'Arrow functions inherit this from their enclosing scope.',
        'Remove the self variable and use this directly.',
        'Also convert to a class for cleaner syntax.',
      ],
      concepts: ['arrow function', 'this', 'self pattern', 'refactor'],
    },
    {
      id: 'js-this-20a',
      title: 'bind in constructor to arrow fields',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Replace manual bind calls with class field arrow functions.',
      skeleton: `class Form {
  constructor(id) {
    this.id = id;
    this.value = '';

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleInput(e) {
    this.value = e.target.value;
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.id + ': ' + this.value);
  }

  handleReset() {
    this.value = '';
  }
}`,
      solution: `class Form {
  constructor(id) {
    this.id = id;
    this.value = '';
  }

  handleInput = (e) => {
    this.value = e.target.value;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.id + ': ' + this.value);
  };

  handleReset = () => {
    this.value = '';
  };
}`,
      hints: [
        'Class field arrow functions are auto-bound to the instance.',
        'They eliminate the need for manual bind calls in the constructor.',
        'Define them as property = () => { ... } in the class body.',
      ],
      concepts: ['class fields', 'arrow function', 'bind', 'refactor'],
    },
  ],
};
