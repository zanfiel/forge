import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-arrows',
  title: '8. Arrow Functions',
  explanation: `## Arrow Functions

Arrow functions provide a concise syntax and lexically bind \`this\`.

### Syntax Variations
\`\`\`js
const add = (a, b) => a + b;          // implicit return
const square = x => x * x;             // single param, no parens needed
const greet = () => 'hello';            // no params
const getObj = () => ({ key: 'val' });  // return object literal (wrap in parens)
\`\`\`

### Key Differences from Regular Functions
1. **No own \`this\`** -- inherits from enclosing lexical scope
2. **No \`arguments\` object** -- use rest params instead
3. **Cannot be used as constructors** -- no \`new\`
4. **No \`prototype\` property**

### When to Use
- Callbacks: \`arr.map(x => x * 2)\`
- Short inline functions
- When you need lexical \`this\`

### When NOT to Use
- Object methods that need \`this\` to reference the object
- Event handlers that need \`this\` to reference the element (in traditional DOM)
- When you need \`arguments\` object
- As constructors
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-arrow-1',
      title: 'Basic arrow syntax',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Convert to arrow function syntax.',
      skeleton: `const double = (x) __BLANK__ x * 2;
console.log(double(5)); // 10`,
      solution: `const double = (x) => x * 2;
console.log(double(5)); // 10`,
      hints: [
        'Arrow functions use a specific operator between parameters and body.',
        'It looks like an arrow.',
        'The operator is `=>`.',
      ],
      concepts: ['arrow function', 'implicit return', '=>'],
    },
    {
      id: 'js-arrow-2',
      title: 'Single param shorthand',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'When there is exactly one parameter, parentheses are optional.',
      skeleton: `const isEven = __BLANK__ => n % 2 === 0;
console.log(isEven(4)); // true`,
      solution: `const isEven = n => n % 2 === 0;
console.log(isEven(4)); // true`,
      hints: [
        'With a single parameter, you can omit parentheses.',
        'Just put the parameter name directly.',
        'Use `n`.',
      ],
      concepts: ['arrow function', 'single parameter', 'shorthand'],
    },
    {
      id: 'js-arrow-3',
      title: 'Return object literal',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Wrap the object literal in parentheses for implicit return.',
      skeleton: `const makeUser = (name) => __BLANK__{ name, active: true }__BLANK__;`,
      solution: `const makeUser = (name) => ({ name, active: true });`,
      hints: [
        'Without wrapping, the braces are treated as a function body.',
        'Wrap the object literal in parentheses.',
        'Use `(` and `)`.',
      ],
      concepts: ['arrow function', 'object literal', 'implicit return'],
    },
    {
      id: 'js-arrow-4',
      title: 'Arrow with destructuring',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Use destructuring in the arrow function parameter.',
      skeleton: `const getName = (__BLANK__) => name;
console.log(getName({ name: 'Zan', age: 30 })); // "Zan"`,
      solution: `const getName = ({ name }) => name;
console.log(getName({ name: 'Zan', age: 30 })); // "Zan"`,
      hints: [
        'Destructure the object parameter directly.',
        'Extract the name property in the parameter list.',
        'Use `{ name }`.',
      ],
      concepts: ['arrow function', 'destructuring', 'parameter destructuring'],
    },
    {
      id: 'js-arrow-5',
      title: 'Arrow with rest params',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Use rest parameters with an arrow function.',
      skeleton: `const first = (__BLANK__) => head;
console.log(first(1, 2, 3)); // 1`,
      solution: `const first = (head, ...rest) => head;
console.log(first(1, 2, 3)); // 1`,
      hints: [
        'Use rest parameters to capture remaining arguments.',
        'The first parameter gets the first value.',
        'Use `head, ...rest`.',
      ],
      concepts: ['arrow function', 'rest parameters'],
    },
    {
      id: 'js-arrow-6',
      title: 'No arguments object',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fill in what happens when you try to access arguments in an arrow function.',
      skeleton: `const fn = () => {
  try { return arguments; }
  catch (e) { return e.constructor.name; }
};
// In a module scope, the result would be: __BLANK__`,
      solution: `const fn = () => {
  try { return arguments; }
  catch (e) { return e.constructor.name; }
};
// In a module scope, the result would be: ReferenceError`,
      hints: [
        'Arrow functions do not have their own arguments.',
        'In module scope there is no outer arguments either.',
        'It throws a ReferenceError.',
      ],
      concepts: ['arrow function', 'arguments', 'ReferenceError'],
    },
    // ---- write-function (6) ----
    {
      id: 'js-arrow-7',
      title: 'Array method chain',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Use arrow functions with map and filter to get the uppercase versions of strings longer than 3 characters.',
      skeleton: `const words = ['hi', 'hello', 'hey', 'world', 'ok'];
// Write a chain using arrow functions
const result = // your code here
`,
      solution: `const words = ['hi', 'hello', 'hey', 'world', 'ok'];
const result = words.filter(w => w.length > 3).map(w => w.toUpperCase());`,
      hints: [
        'Use filter with an arrow to keep words longer than 3.',
        'Chain map with an arrow to uppercase.',
        '`words.filter(w => w.length > 3).map(w => w.toUpperCase())`.',
      ],
      concepts: ['arrow function', 'Array.filter', 'Array.map', 'method chaining'],
    },
    {
      id: 'js-arrow-8',
      title: 'Arrow returning arrow',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a curried add function using arrows: `add(a)(b)` returns a + b.',
      skeleton: `// Write add as an arrow returning an arrow
const add = // your code here
// add(2)(3) => 5
`,
      solution: `const add = a => b => a + b;`,
      hints: [
        'An arrow function can return another arrow function.',
        'The outer function takes a, the inner takes b.',
        '`const add = a => b => a + b`.',
      ],
      concepts: ['currying', 'arrow function', 'higher-order function'],
    },
    {
      id: 'js-arrow-9',
      title: 'Lexical this in arrow',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a Timer class where the tick method uses an arrow callback in setInterval to correctly access this.count.',
      skeleton: `class Timer {
  constructor() {
    this.count = 0;
  }

  start() {
    // Use an arrow function so 'this' refers to the Timer instance
    this.interval = setInterval(() => {
      // increment count
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }
}
`,
      solution: `class Timer {
  constructor() {
    this.count = 0;
  }

  start() {
    this.interval = setInterval(() => {
      this.count++;
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }
}`,
      hints: [
        'Arrow functions inherit this from the enclosing scope.',
        'Inside start(), this refers to the Timer instance.',
        'The arrow callback captures that this.',
      ],
      concepts: ['arrow function', 'lexical this', 'setInterval', 'class'],
    },
    {
      id: 'js-arrow-10',
      title: 'Immediately invoked arrow',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write an immediately invoked arrow function that returns the current timestamp.',
      skeleton: `const timestamp = // immediately invoked arrow function
`,
      solution: `const timestamp = (() => Date.now())();`,
      hints: [
        'Wrap the arrow in parentheses and invoke immediately.',
        'Same as IIFE but with arrow syntax.',
        '`(() => Date.now())()`.',
      ],
      concepts: ['IIFE', 'arrow function', 'Date.now'],
    },
    {
      id: 'js-arrow-11',
      title: 'Sort comparator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `sortByProp(arr, prop)` that returns a new sorted array using an arrow comparator.',
      skeleton: `function sortByProp(arr, prop) {
  // Sort by the given property using arrow comparator
}
// sortByProp([{age: 30}, {age: 20}], 'age') => [{age: 20}, {age: 30}]
`,
      solution: `function sortByProp(arr, prop) {
  return [...arr].sort((a, b) => a[prop] - b[prop]);
}`,
      hints: [
        'Use toSorted or spread + sort to avoid mutation.',
        'The comparator takes two items and returns negative/zero/positive.',
        'Use `(a, b) => a[prop] - b[prop]`.',
      ],
      concepts: ['Array.sort', 'arrow function', 'comparator', 'spread'],
    },
    {
      id: 'js-arrow-12',
      title: 'Compose with arrows',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a `compose` function using arrows that applies functions right to left.',
      skeleton: `// compose(f, g)(x) => f(g(x))
const compose = // your code here
`,
      solution: `const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);`,
      hints: [
        'compose is the reverse of pipe.',
        'Use reduceRight to apply functions right to left.',
        '`(...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x)`.',
      ],
      concepts: ['compose', 'reduceRight', 'arrow function', 'functional programming'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'js-arrow-13',
      title: 'Fix: arrow as method',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This object method uses an arrow function and this is undefined. Fix it.',
      skeleton: `const user = {
  name: 'Zan',
  greet: () => {
    return 'Hello, ' + this.name;
  },
};
console.log(user.greet()); // "Hello, undefined"`,
      solution: `const user = {
  name: 'Zan',
  greet() {
    return 'Hello, ' + this.name;
  },
};
console.log(user.greet()); // "Hello, Zan"`,
      hints: [
        'Arrow functions do not have their own this.',
        'For object methods that need this, use regular function or method shorthand.',
        'Use method shorthand: `greet() { ... }`.',
      ],
      concepts: ['arrow function', 'this', 'object methods'],
    },
    {
      id: 'js-arrow-14',
      title: 'Fix: arrow constructor',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code tries to use an arrow function as a constructor. Fix it.',
      skeleton: `const Person = (name) => {
  this.name = name;
};
const p = new Person('Zan'); // TypeError`,
      solution: `function Person(name) {
  this.name = name;
}
const p = new Person('Zan');`,
      hints: [
        'Arrow functions cannot be used with new.',
        'They do not have a prototype.',
        'Convert to a regular function declaration.',
      ],
      concepts: ['arrow function', 'constructor', 'new', 'TypeError'],
    },
    {
      id: 'js-arrow-15',
      title: 'Fix: implicit return with block body',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'This arrow function has a block body but forgot to return. Fix it.',
      skeleton: `const getArea = (w, h) => {
  w * h;
};
console.log(getArea(3, 4)); // undefined, should be 12`,
      solution: `const getArea = (w, h) => {
  return w * h;
};
console.log(getArea(3, 4)); // 12`,
      hints: [
        'Block body arrows (with {}) require an explicit return.',
        'Only concise body arrows (without {}) have implicit return.',
        'Add `return` before `w * h`.',
      ],
      concepts: ['arrow function', 'implicit return', 'block body'],
    },
    // ---- predict-output (3) ----
    {
      id: 'js-arrow-16',
      title: 'Predict: arrow this',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const obj = {
  value: 42,
  getValue: () => this?.value,
};
console.log(obj.getValue());`,
      solution: `undefined`,
      hints: [
        'Arrow functions capture this from the enclosing scope.',
        'In module or script scope, this is undefined (or the global object).',
        'The result is undefined.',
      ],
      concepts: ['arrow function', 'lexical this', 'undefined'],
    },
    {
      id: 'js-arrow-17',
      title: 'Predict: arrow implicit return',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const fns = [1, 2, 3].map(n => n ** 2);
console.log(fns);`,
      solution: `[1, 4, 9]`,
      hints: [
        'The arrow implicitly returns n ** 2.',
        'map creates a new array of the returned values.',
        'Output: [1, 4, 9].',
      ],
      concepts: ['arrow function', 'implicit return', 'Array.map'],
    },
    {
      id: 'js-arrow-18',
      title: 'Predict: arrow returning object',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const fn = () => { value: 42 };
console.log(fn());`,
      solution: `undefined`,
      hints: [
        'The braces are treated as a block body, not an object literal.',
        '`value:` becomes a label, and 42 is an expression statement.',
        'There is no return, so the result is undefined.',
      ],
      concepts: ['arrow function', 'object literal', 'label', 'gotcha'],
    },
    // ---- refactor (2) ----
    {
      id: 'js-arrow-19',
      title: 'Refactor: function expressions to arrows',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Refactor these function expressions to concise arrow functions.',
      skeleton: `const nums = [1, 2, 3, 4, 5];
const evens = nums.filter(function(n) { return n % 2 === 0; });
const doubled = evens.map(function(n) { return n * 2; });
const sum = doubled.reduce(function(a, b) { return a + b; }, 0);`,
      solution: `const nums = [1, 2, 3, 4, 5];
const evens = nums.filter(n => n % 2 === 0);
const doubled = evens.map(n => n * 2);
const sum = doubled.reduce((a, b) => a + b, 0);`,
      hints: [
        'Each callback can be converted to an arrow.',
        'Single-expression functions can use implicit return.',
        'Remove the function keyword and add =>.',
      ],
      concepts: ['arrow function', 'refactoring', 'Array methods'],
    },
    {
      id: 'js-arrow-20',
      title: 'Refactor: bind(this) to arrow',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Refactor the bind(this) pattern to use an arrow function instead.',
      skeleton: `class Logger {
  constructor(prefix) {
    this.prefix = prefix;
  }

  logAll(items) {
    items.forEach(function(item) {
      console.log(this.prefix + ': ' + item);
    }.bind(this));
  }
}`,
      solution: `class Logger {
  constructor(prefix) {
    this.prefix = prefix;
  }

  logAll(items) {
    items.forEach(item => {
      console.log(this.prefix + ': ' + item);
    });
  }
}`,
      hints: [
        'Arrow functions capture this from the enclosing scope.',
        'No need for .bind(this) with arrows.',
        'Replace the function expression with an arrow.',
      ],
      concepts: ['arrow function', 'bind', 'this', 'refactoring'],
    },
  ],
};
