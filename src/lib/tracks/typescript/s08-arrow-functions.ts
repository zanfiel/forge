import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-arrow-fn',
  title: '8. Arrow Functions',
  explanation: `## Arrow Functions

Arrow functions provide a concise syntax for writing functions. They were introduced in ES6 and are widely used in TypeScript.

### Syntax
\\\`\\\`\\\`typescript
// Full syntax
const add = (a: number, b: number): number => {
  return a + b;
};

// Implicit return (single expression)
const add = (a: number, b: number): number => a + b;

// Single parameter (no parens needed)
const double = (n: number): number => n * 2;
\\\`\\\`\\\`

### Key Differences from Regular Functions
1. **\\\`this\\\` binding**: Arrow functions do not have their own \\\`this\\\`. They inherit \\\`this\\\` from the enclosing scope.
2. **No \\\`arguments\\\` object**: Arrow functions do not have the \\\`arguments\\\` object.
3. **Cannot be used as constructors**: You cannot use \\\`new\\\` with arrow functions.
4. **No \\\`prototype\\\` property**.

### Returning Objects
To implicitly return an object literal, wrap it in parentheses:
\\\`\\\`\\\`typescript
const makeUser = (name: string) => ({ name, active: true });
\\\`\\\`\\\`

### Currying
Arrow functions make currying natural:
\\\`\\\`\\\`typescript
const add = (a: number) => (b: number) => a + b;
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 'ts-arrow-1',
      title: 'Arrow syntax basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Convert this function expression to arrow syntax.',
      skeleton: `const greet = (name: string): string __BLANK__ {
  return "Hello, " + name;
};
console.log(greet("Alice"));`,
      solution: `const greet = (name: string): string => {
  return "Hello, " + name;
};
console.log(greet("Alice"));`,
      hints: [
        'Arrow functions use => between the parameters and the body.',
        'The arrow goes after the return type annotation.',
        'The answer is: =>',
      ],
      concepts: ['arrow function', '=>', 'syntax'],
    },
    {
      id: 'ts-arrow-2',
      title: 'Implicit return',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Simplify this arrow function to use implicit return (no braces, no return keyword).',
      skeleton: `const double = (n: number): number => __BLANK__;
console.log(double(5)); // 10`,
      solution: `const double = (n: number): number => n * 2;
console.log(double(5)); // 10`,
      hints: [
        'An arrow function with a single expression can omit braces and return.',
        'The expression after => is implicitly returned.',
        'The answer is: n * 2',
      ],
      concepts: ['implicit return', 'concise body'],
    },
    {
      id: 'ts-arrow-3',
      title: 'Arrow with no params',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write an arrow function that takes no parameters and returns "hello".',
      skeleton: `const sayHello = __BLANK__: string => "hello";
console.log(sayHello()); // "hello"`,
      solution: `const sayHello = (): string => "hello";
console.log(sayHello()); // "hello"`,
      hints: [
        'With no parameters, use empty parentheses ().',
        'The syntax is () => expression.',
        'The answer is: ()',
      ],
      concepts: ['no parameters', 'empty parens'],
    },
    {
      id: 'ts-arrow-4',
      title: 'Returning an object',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fix this arrow function that tries to return an object literal. It currently returns undefined.',
      skeleton: `const makeUser = (name: string) => __BLANK__{ name, active: true }__BLANK__;
console.log(makeUser("Alice")); // { name: "Alice", active: true }`,
      solution: `const makeUser = (name: string) => ({ name, active: true });
console.log(makeUser("Alice")); // { name: "Alice", active: true }`,
      hints: [
        'Without parens, the braces are interpreted as a code block, not an object.',
        'Wrap the object literal in parentheses to return it.',
        'The answers are: ( and )',
      ],
      concepts: ['returning objects', 'parenthesized expression'],
    },
    {
      id: 'ts-arrow-5',
      title: 'Arrow in array methods',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use an arrow function with filter to get only even numbers.',
      skeleton: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const evens: number[] = // Use numbers.filter with an arrow function

console.log(evens); // [2, 4, 6, 8]`,
      solution: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const evens: number[] = numbers.filter(n => n % 2 === 0);

console.log(evens); // [2, 4, 6, 8]`,
      hints: [
        'filter takes a callback that returns true/false.',
        'An even number has remainder 0 when divided by 2.',
        'numbers.filter(n => n % 2 === 0)',
      ],
      concepts: ['filter', 'arrow callback', 'array methods'],
    },
    {
      id: 'ts-arrow-6',
      title: 'Arrow in callbacks',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use arrow functions with map and filter to transform and filter an array of names.',
      skeleton: `const names = ["alice", "bob", "charlie", "dave"];

// Uppercase all names, then filter those longer than 3 characters
const result: string[] = // Your code here

console.log(result); // ["ALICE", "CHARLIE", "DAVE"]`,
      solution: `const names = ["alice", "bob", "charlie", "dave"];

const result: string[] = names
  .map(name => name.toUpperCase())
  .filter(name => name.length > 3);

console.log(result); // ["ALICE", "CHARLIE", "DAVE"]`,
      hints: [
        'Chain map and filter with arrow function callbacks.',
        'map(name => name.toUpperCase()) converts to uppercase.',
        'names.map(name => name.toUpperCase()).filter(name => name.length > 3)',
      ],
      concepts: ['map', 'filter', 'method chaining', 'arrow functions'],
    },
    {
      id: 'ts-arrow-7',
      title: 'this binding difference',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `const obj = {
  value: 42,
  getArrow: function() {
    const arrow = () => this.value;
    return arrow();
  },
  getRegular: function() {
    const regular = function() { return this; };
    return regular();
  },
};

console.log(obj.getArrow());`,
      solution: `42`,
      hints: [
        'Arrow functions capture this from the enclosing scope.',
        'The enclosing scope is getArrow, where this is obj.',
        'Output: 42',
      ],
      concepts: ['this binding', 'arrow vs function', 'lexical this'],
    },
    {
      id: 'ts-arrow-8',
      title: 'Arrow with destructured params',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an arrow function that destructures an object parameter and returns a formatted string.',
      skeleton: `const formatUser = // Arrow function with destructured { name, age } parameter
// Return "NAME (AGE years)"

console.log(formatUser({ name: "Alice", age: 30 })); // "Alice (30 years)"`,
      solution: `const formatUser = ({ name, age }: { name: string; age: number }): string =>
  name + " (" + age + " years)";

console.log(formatUser({ name: "Alice", age: 30 })); // "Alice (30 years)"`,
      hints: [
        'Destructure in the parameter list: ({ name, age }: { name: string; age: number }).',
        'Use implicit return for a single expression.',
        '({ name, age }: { name: string; age: number }): string => name + " (" + age + " years)"',
      ],
      concepts: ['destructured parameters', 'arrow function', 'object type'],
    },
    {
      id: 'ts-arrow-9',
      title: 'Arrow with rest params',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an arrow function that takes a multiplier and any number of values, returning each value multiplied.',
      skeleton: `const multiplyAll = (multiplier: number, ...values: number[]): number[] => {
  // Return each value multiplied by the multiplier
};

console.log(multiplyAll(3, 1, 2, 3)); // [3, 6, 9]`,
      solution: `const multiplyAll = (multiplier: number, ...values: number[]): number[] => {
  return values.map(v => v * multiplier);
};

console.log(multiplyAll(3, 1, 2, 3)); // [3, 6, 9]`,
      hints: [
        'Use rest params to collect the values into an array.',
        'Map over values and multiply each by the multiplier.',
        'return values.map(v => v * multiplier);',
      ],
      concepts: ['rest parameters', 'map', 'arrow function'],
    },
    {
      id: 'ts-arrow-10',
      title: 'Arrow with default params',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an arrow function with a default parameter for the exponent.',
      skeleton: `const power = // Arrow function: (base: number, exp: number = 2) => number

console.log(power(5));     // 25 (5^2)
console.log(power(2, 10)); // 1024 (2^10)`,
      solution: `const power = (base: number, exp: number = 2): number => base ** exp;

console.log(power(5));     // 25
console.log(power(2, 10)); // 1024`,
      hints: [
        'Default parameters work the same in arrow functions.',
        '(base: number, exp: number = 2) sets exp to 2 if not provided.',
        'const power = (base: number, exp: number = 2): number => base ** exp;',
      ],
      concepts: ['default parameters', 'exponentiation', 'arrow function'],
    },
    {
      id: 'ts-arrow-11',
      title: 'Arrow type annotations',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Add the correct type annotation to this arrow function variable.',
      skeleton: `const transform: __BLANK__ = (s) => s.toUpperCase();
console.log(transform("hello")); // "HELLO"`,
      solution: `const transform: (s: string) => string = (s) => s.toUpperCase();
console.log(transform("hello")); // "HELLO"`,
      hints: [
        'A function type annotation looks like (param: Type) => ReturnType.',
        'The function takes a string and returns a string.',
        'The answer is: (s: string) => string',
      ],
      concepts: ['function type', 'type annotation', 'arrow function'],
    },
    {
      id: 'ts-arrow-12',
      title: 'Immediately invoked arrow',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create an immediately invoked arrow function that computes and returns a config object.',
      skeleton: `const config = // IIFE arrow function that returns { env: "production", debug: false }

console.log(config.env);   // "production"
console.log(config.debug); // false`,
      solution: `const config = (() => ({
  env: "production" as const,
  debug: false,
}))();

console.log(config.env);   // "production"
console.log(config.debug); // false`,
      hints: [
        'Wrap the arrow function in parentheses and invoke it: (() => ...)().',
        'Remember to wrap the returned object literal in parentheses.',
        '(() => ({ env: "production", debug: false }))()',
      ],
      concepts: ['IIFE', 'arrow function', 'immediately invoked'],
    },
    {
      id: 'ts-arrow-13',
      title: 'Currying with arrows',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a curried add function using arrow functions. add(a)(b) should return a + b.',
      skeleton: `const add = // Curried arrow function

console.log(add(3)(4));  // 7
console.log(add(10)(5)); // 15

const add5 = add(5);
console.log(add5(3)); // 8`,
      solution: `const add = (a: number) => (b: number): number => a + b;

console.log(add(3)(4));  // 7
console.log(add(10)(5)); // 15

const add5 = add(5);
console.log(add5(3)); // 8`,
      hints: [
        'Currying means a function returns another function.',
        '(a) => (b) => a + b is a curried two-argument function.',
        'const add = (a: number) => (b: number): number => a + b;',
      ],
      concepts: ['currying', 'partial application', 'arrow function'],
    },
    {
      id: 'ts-arrow-14',
      title: 'Arrow with generics',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a generic arrow function that returns the first element of an array.',
      skeleton: `const first = // Generic arrow: <T>(arr: T[]) => T | undefined

console.log(first([1, 2, 3]));        // 1
console.log(first(["a", "b"]));       // "a"
console.log(first([] as number[]));   // undefined`,
      solution: `const first = <T>(arr: T[]): T | undefined => arr[0];

console.log(first([1, 2, 3]));        // 1
console.log(first(["a", "b"]));       // "a"
console.log(first([] as number[]));   // undefined`,
      hints: [
        'Generic arrow functions use <T> before the parameter list.',
        'The syntax is <T>(param: T[]): T | undefined => ...',
        'const first = <T>(arr: T[]): T | undefined => arr[0];',
      ],
      concepts: ['generics', 'arrow function', 'type parameter'],
    },
    {
      id: 'ts-arrow-15',
      title: 'Arrow vs function tradeoffs',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This class method uses an arrow function where a regular method is more appropriate. Fix the prototype issue.',
      skeleton: `class Counter {
  count = 0;

  // This creates a new function per instance (wasteful)
  increment = () => {
    this.count++;
  };

  // This should be a regular method on the prototype
  decrement = () => {
    this.count--;
  };

  getCount(): number {
    return this.count;
  }
}

const c = new Counter();
c.increment();
c.increment();
c.decrement();
console.log(c.getCount()); // 1`,
      solution: `class Counter {
  count = 0;

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }

  getCount(): number {
    return this.count;
  }
}

const c = new Counter();
c.increment();
c.increment();
c.decrement();
console.log(c.getCount()); // 1`,
      hints: [
        'Arrow functions as class properties are per-instance (not on prototype).',
        'Regular methods are defined once on the prototype and shared.',
        'Change arrow functions to regular method syntax.',
      ],
      concepts: ['prototype', 'class methods', 'arrow vs function'],
    },
    {
      id: 'ts-arrow-16',
      title: 'Arrow function limitations',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What happens when you try to use an arrow function as a constructor? Write "Error" or the output.',
      skeleton: `const Person = (name: string) => {
  // @ts-ignore
  this.name = name;
};

// @ts-ignore
const p = new Person("Alice");
console.log(p.name);`,
      solution: `Error`,
      hints: [
        'Arrow functions cannot be used with new.',
        'They do not have a prototype property.',
        'Output: Error (TypeError: Person is not a constructor)',
      ],
      concepts: ['arrow limitations', 'constructor', 'new keyword'],
    },
    {
      id: 'ts-arrow-17',
      title: 'Arrow returning arrow (composition)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a compose function that takes two functions and returns a new function that applies them in sequence (right to left).',
      skeleton: `const compose = <A, B, C>(
  f: (b: B) => C,
  g: (a: A) => B
) => // Return a function that applies g then f

const toUpper = (s: string): string => s.toUpperCase();
const exclaim = (s: string): string => s + "!";
const shout = compose(exclaim, toUpper);

console.log(shout("hello")); // "HELLO!"`,
      solution: `const compose = <A, B, C>(
  f: (b: B) => C,
  g: (a: A) => B
) => (a: A): C => f(g(a));

const toUpper = (s: string): string => s.toUpperCase();
const exclaim = (s: string): string => s + "!";
const shout = compose(exclaim, toUpper);

console.log(shout("hello")); // "HELLO!"`,
      hints: [
        'compose(f, g) returns a function that first applies g, then f.',
        'The returned function takes an A and returns a C.',
        '(a: A): C => f(g(a))',
      ],
      concepts: ['function composition', 'generics', 'higher-order functions'],
    },
    {
      id: 'ts-arrow-18',
      title: 'Arrow in event-like handlers',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Create a simple event emitter where arrow functions preserve the correct this context.',
      skeleton: `class Emitter {
  private listeners: (() => void)[] = [];

  on(fn: () => void): void {
    this.listeners.push(fn);
  }

  emit(): void {
    this.listeners.forEach(fn => fn());
  }
}

const emitter = new Emitter();
const state = { count: 0 };

// Use an arrow function so 'state' is captured from the enclosing scope
emitter.on(() => { state.count++; });
emitter.on(() => { state.count++; });
emitter.emit();

console.log(state.count); // 2`,
      solution: `class Emitter {
  private listeners: (() => void)[] = [];

  on(fn: () => void): void {
    this.listeners.push(fn);
  }

  emit(): void {
    this.listeners.forEach(fn => fn());
  }
}

const emitter = new Emitter();
const state = { count: 0 };

emitter.on(() => { state.count++; });
emitter.on(() => { state.count++; });
emitter.emit();

console.log(state.count); // 2`,
      hints: [
        'Arrow functions capture the surrounding scope, not the caller\'s this.',
        'This makes them ideal for event handlers that need enclosing scope.',
        'The code is already correct -- arrow functions capture state from closure.',
      ],
      concepts: ['event handlers', 'closure', 'arrow this'],
    },
    {
      id: 'ts-arrow-19',
      title: 'Refactor to arrows',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor all the callback functions to use arrow syntax with implicit returns where possible.',
      skeleton: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = numbers
  .filter(function(n) { return n % 2 === 0; })
  .map(function(n) { return n * n; })
  .reduce(function(sum, n) { return sum + n; }, 0);

console.log(result); // 220`,
      solution: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * n)
  .reduce((sum, n) => sum + n, 0);

console.log(result); // 220`,
      hints: [
        'Replace function(params) { return expr; } with params => expr.',
        'Single-parameter arrows don\'t need parentheses (but can have them).',
        '.filter(n => n % 2 === 0).map(n => n * n).reduce((sum, n) => sum + n, 0)',
      ],
      concepts: ['refactoring', 'arrow functions', 'implicit return'],
    },
    {
      id: 'ts-arrow-20',
      title: 'Refactor class to use arrow methods',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This class loses its this context when methods are passed as callbacks. Refactor the problematic method to an arrow function property to fix the this binding.',
      skeleton: `class Timer {
  seconds = 0;

  tick() {
    this.seconds++;
  }

  getSeconds(): number {
    return this.seconds;
  }
}

const timer = new Timer();
const tickFn = timer.tick;
tickFn(); // Error: this is undefined
tickFn();
console.log(timer.getSeconds()); // should be 2`,
      solution: `class Timer {
  seconds = 0;

  tick = (): void => {
    this.seconds++;
  };

  getSeconds(): number {
    return this.seconds;
  }
}

const timer = new Timer();
const tickFn = timer.tick;
tickFn();
tickFn();
console.log(timer.getSeconds()); // 2`,
      hints: [
        'When a method is extracted, it loses its this context.',
        'Arrow function properties bind this to the instance.',
        'Change tick() { ... } to tick = (): void => { ... };',
      ],
      concepts: ['this binding', 'arrow property', 'class method extraction'],
    },
  ],
};
