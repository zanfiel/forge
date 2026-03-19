import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-fn-types',
  title: '9. Function Types & Overloads',
  explanation: `## Function Types & Overloads

TypeScript lets you describe the shape of functions with type annotations, type aliases, and interfaces.

### Function Type Syntax
\\\`\\\`\\\`typescript
type MathOp = (a: number, b: number) => number;
const add: MathOp = (a, b) => a + b;
\\\`\\\`\\\`

### Call Signatures in Interfaces
\\\`\\\`\\\`typescript
interface Formatter {
  (value: string): string;
}
\\\`\\\`\\\`

### Function Overloads
Overloads let you define multiple call signatures for a single function:
\\\`\\\`\\\`typescript
function parse(input: string): number;
function parse(input: number): string;
function parse(input: string | number): number | string { ... }
\\\`\\\`\\\`

### Generic Function Types
\\\`\\\`\\\`typescript
type Identity = <T>(value: T) => T;
\\\`\\\`\\\`

### Special Concepts
- **void vs undefined**: \\\`void\\\` means the return value should be ignored; \\\`undefined\\\` means it literally returns undefined
- **this parameter**: Explicitly type \\\`this\\\` in function signatures
- **Callable interfaces**: Interfaces with call signatures plus properties
- **Construct signatures**: Interfaces that describe constructable functions
`,
  exercises: [
    {
      id: 'ts-fnt-1',
      title: 'Function type syntax',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the function type alias.',
      skeleton: `type Greeter = (name: string) __BLANK__ string;
const greet: Greeter = (name) => "Hello, " + name;
console.log(greet("Alice"));`,
      solution: `type Greeter = (name: string) => string;
const greet: Greeter = (name) => "Hello, " + name;
console.log(greet("Alice"));`,
      hints: [
        'Function types use => between parameters and return type.',
        'In a type alias, => separates the params from the return type.',
        'The answer is: =>',
      ],
      concepts: ['function type', 'type alias', '=>'],
    },
    {
      id: 'ts-fnt-2',
      title: 'Type alias for functions',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a type alias for a function that takes two numbers and returns a number.',
      skeleton: `type __BLANK__ = (a: number, b: number) => number;
const add: MathOp = (a, b) => a + b;
const mul: MathOp = (a, b) => a * b;
console.log(add(3, 4), mul(3, 4));`,
      solution: `type MathOp = (a: number, b: number) => number;
const add: MathOp = (a, b) => a + b;
const mul: MathOp = (a, b) => a * b;
console.log(add(3, 4), mul(3, 4));`,
      hints: [
        'What name should the type alias have?',
        'Look at how MathOp is used below.',
        'The answer is: MathOp',
      ],
      concepts: ['type alias', 'function type', 'naming'],
    },
    {
      id: 'ts-fnt-3',
      title: 'Interface with call signature',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the interface with a call signature.',
      skeleton: `interface Validator {
  __BLANK__: boolean;
}

const isPositive: Validator = (n) => n > 0;
console.log(isPositive(5));  // true
console.log(isPositive(-1)); // false`,
      solution: `interface Validator {
  (n: number): boolean;
}

const isPositive: Validator = (n) => n > 0;
console.log(isPositive(5));  // true
console.log(isPositive(-1)); // false`,
      hints: [
        'A call signature in an interface looks like a function signature without the function keyword.',
        '(paramName: Type): ReturnType inside the interface body.',
        'The answer is: (n: number)',
      ],
      concepts: ['call signature', 'interface', 'callable'],
    },
    {
      id: 'ts-fnt-4',
      title: 'Using function types',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a function type and use it to type a higher-order function.',
      skeleton: `type Predicate = (value: number) => boolean;

function filterNumbers(nums: number[], predicate: Predicate): number[] {
  // Use the predicate to filter
}

const isEven: Predicate = (n) => n % 2 === 0;
console.log(filterNumbers([1, 2, 3, 4, 5], isEven)); // [2, 4]`,
      solution: `type Predicate = (value: number) => boolean;

function filterNumbers(nums: number[], predicate: Predicate): number[] {
  return nums.filter(predicate);
}

const isEven: Predicate = (n) => n % 2 === 0;
console.log(filterNumbers([1, 2, 3, 4, 5], isEven)); // [2, 4]`,
      hints: [
        'The predicate is already a function that matches what filter expects.',
        'Pass predicate directly to nums.filter.',
        'return nums.filter(predicate);',
      ],
      concepts: ['function type', 'predicate', 'filter'],
    },
    {
      id: 'ts-fnt-5',
      title: 'Generic function type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the generic function type alias.',
      skeleton: `type Identity = __BLANK__(value: T) => T;
const identity: Identity = (value) => value;
console.log(identity(42));      // 42
console.log(identity("hello")); // "hello"`,
      solution: `type Identity = <T>(value: T) => T;
const identity: Identity = (value) => value;
console.log(identity(42));      // 42
console.log(identity("hello")); // "hello"`,
      hints: [
        'Generic function types have a type parameter before the params.',
        'Use <T> to introduce the type parameter.',
        'The answer is: <T>',
      ],
      concepts: ['generic function type', 'type parameter', '<T>'],
    },
    {
      id: 'ts-fnt-6',
      title: 'Function type inference',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Does this code compile? Write "Yes" or "No".',
      skeleton: `type StringFn = (s: string) => string;
const toUpper: StringFn = (s) => s.toUpperCase();
const result: number = toUpper("hello");`,
      solution: `No`,
      hints: [
        'toUpper returns a string, but result expects a number.',
        'Assigning a string to a number variable is a type error.',
        'No, it does not compile.',
      ],
      concepts: ['type checking', 'type mismatch', 'function type'],
    },
    {
      id: 'ts-fnt-7',
      title: 'Overload signatures',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write overload signatures for a function that reverses strings or arrays.',
      skeleton: `// Add overload signatures

function reverse(input: string | number[]): string | number[] {
  if (typeof input === "string") {
    return input.split("").reverse().join("");
  }
  return [...input].reverse();
}

const s: string = reverse("hello") as string;
const a: number[] = reverse([1, 2, 3]) as number[];
console.log(s); // "olleh"
console.log(a); // [3, 2, 1]`,
      solution: `function reverse(input: string): string;
function reverse(input: number[]): number[];
function reverse(input: string | number[]): string | number[] {
  if (typeof input === "string") {
    return input.split("").reverse().join("");
  }
  return [...input].reverse();
}

const s: string = reverse("hello");
const a: number[] = reverse([1, 2, 3]);
console.log(s); // "olleh"
console.log(a); // [3, 2, 1]`,
      hints: [
        'Add two overload signatures before the implementation.',
        'One for string input/output, one for number[] input/output.',
        'function reverse(input: string): string; function reverse(input: number[]): number[];',
      ],
      concepts: ['function overloads', 'overload signatures'],
    },
    {
      id: 'ts-fnt-8',
      title: 'Overload implementation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'The overload implementation is missing the number case. Fix it.',
      skeleton: `function stringify(value: string): string;
function stringify(value: number): string;
function stringify(value: string | number): string {
  if (typeof value === "string") {
    return '"' + value + '"';
  }
  // Bug: missing number case, falls off end
}

console.log(stringify("hello")); // '"hello"'
console.log(stringify(42));      // "42"`,
      solution: `function stringify(value: string): string;
function stringify(value: number): string;
function stringify(value: string | number): string {
  if (typeof value === "string") {
    return '"' + value + '"';
  }
  return String(value);
}

console.log(stringify("hello")); // '"hello"'
console.log(stringify(42));      // "42"`,
      hints: [
        'The number branch is missing -- the function returns undefined.',
        'Add a return for the number case.',
        'Add: return String(value); after the if block.',
      ],
      concepts: ['overload implementation', 'exhaustive returns'],
    },
    {
      id: 'ts-fnt-9',
      title: 'Rest parameter types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type for a function that takes a format string and any number of replacements.',
      skeleton: `type Formatter = (template: string, ...args: string[]) => string;

const format: Formatter = (template, ...args) => {
  // Replace {0}, {1}, etc. with args
}

console.log(format("Hello {0}, welcome to {1}!", "Alice", "Forge"));
// "Hello Alice, welcome to Forge!"`,
      solution: `type Formatter = (template: string, ...args: string[]) => string;

const format: Formatter = (template, ...args) => {
  return args.reduce(
    (result, arg, i) => result.replace("{" + i + "}", arg),
    template
  );
};

console.log(format("Hello {0}, welcome to {1}!", "Alice", "Forge"));
// "Hello Alice, welcome to Forge!"`,
      hints: [
        'Use reduce to replace each placeholder with the corresponding arg.',
        'Replace "{0}" with args[0], "{1}" with args[1], etc.',
        'args.reduce((result, arg, i) => result.replace("{" + i + "}", arg), template)',
      ],
      concepts: ['rest parameter types', 'template replacement', 'reduce'],
    },
    {
      id: 'ts-fnt-10',
      title: 'void vs undefined return',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Does this code compile? Write "Yes" or "No" and explain briefly.',
      skeleton: `type VoidFn = () => void;

const fn: VoidFn = () => {
  return true; // returning a boolean from a void function type
};

const result = fn();
// Is result usable as a boolean?
const flag: boolean = result;`,
      solution: `No`,
      hints: [
        'void return type means the return value should be ignored.',
        'A void function type can accept functions that return values.',
        'But assigning result to boolean fails -- void is not assignable to boolean.',
      ],
      concepts: ['void', 'undefined', 'return type compatibility'],
    },
    {
      id: 'ts-fnt-11',
      title: 'Callable interface with properties',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create an interface that describes a function with a property, then implement it.',
      skeleton: `interface Counter {
  (): number;        // call signature
  count: number;     // property
  reset(): void;     // method
}

function createCounter(): Counter {
  // Create and return a Counter
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
counter.reset();
console.log(counter()); // 1`,
      solution: `interface Counter {
  (): number;
  count: number;
  reset(): void;
}

function createCounter(): Counter {
  const fn = function(): number {
    fn.count++;
    return fn.count;
  } as Counter;
  fn.count = 0;
  fn.reset = () => { fn.count = 0; };
  return fn;
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
counter.reset();
console.log(counter()); // 1`,
      hints: [
        'Create a function and add properties to it.',
        'Use "as Counter" to cast the function, then assign count and reset.',
        'Create fn as Counter, set fn.count = 0, fn.reset = () => { fn.count = 0; }.',
      ],
      concepts: ['callable interface', 'function properties', 'hybrid types'],
    },
    {
      id: 'ts-fnt-12',
      title: 'This parameter type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Add a this parameter type to prevent calling this function with the wrong context.',
      skeleton: `interface User {
  name: string;
  greet(this: User): string;
}

const user: User = {
  name: "Alice",
  greet() {
    return "Hello, I am " + this.name;
  },
};

console.log(user.greet()); // "Hello, I am Alice"`,
      solution: `interface User {
  name: string;
  greet(this: User): string;
}

const user: User = {
  name: "Alice",
  greet() {
    return "Hello, I am " + this.name;
  },
};

console.log(user.greet()); // "Hello, I am Alice"`,
      hints: [
        'The this parameter is a fake parameter that types the context.',
        'It does not affect how you call the function.',
        'This code is already correct -- the this: User parameter ensures type safety.',
      ],
      concepts: ['this parameter', 'context typing', 'method'],
    },
    {
      id: 'ts-fnt-13',
      title: 'Parameter destructuring in types',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Define a function type that uses destructured parameters and implement it.',
      skeleton: `type PointDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => number;

const distance: PointDistance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  // Calculate Euclidean distance
};

console.log(distance({ x: 0, y: 0 }, { x: 3, y: 4 })); // 5`,
      solution: `type PointDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => number;

const distance: PointDistance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

console.log(distance({ x: 0, y: 0 }, { x: 3, y: 4 })); // 5`,
      hints: [
        'Euclidean distance: sqrt((x2-x1)^2 + (y2-y1)^2).',
        'Destructure with renaming: { x: x1, y: y1 } renames x to x1.',
        'return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);',
      ],
      concepts: ['parameter destructuring', 'function types', 'Euclidean distance'],
    },
    {
      id: 'ts-fnt-14',
      title: 'Optional callback pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function that takes an optional callback. If provided, call it with the result; otherwise return the result.',
      skeleton: `function compute(
  a: number,
  b: number,
  callback?: (result: number) => void
): number {
  // Compute a + b, optionally call callback, return result
}

console.log(compute(3, 4));                          // 7
compute(3, 4, (result) => console.log("Got:", result)); // "Got: 7"`,
      solution: `function compute(
  a: number,
  b: number,
  callback?: (result: number) => void
): number {
  const result = a + b;
  if (callback) {
    callback(result);
  }
  return result;
}

console.log(compute(3, 4));                          // 7
compute(3, 4, (result) => console.log("Got:", result)); // "Got: 7"`,
      hints: [
        'Check if callback is defined before calling it.',
        'Compute the result first, optionally invoke callback, then return.',
        'const result = a + b; if (callback) callback(result); return result;',
      ],
      concepts: ['optional callback', 'optional parameter', 'conditional invoke'],
    },
    {
      id: 'ts-fnt-15',
      title: 'Higher-order function types',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a pipe function that composes two functions left-to-right.',
      skeleton: `type Pipe = <A, B, C>(f: (a: A) => B, g: (b: B) => C) => (a: A) => C;

const pipe: Pipe = (f, g) => {
  // Return a function that applies f then g
};

const double = (n: number): number => n * 2;
const toString = (n: number): string => "Value: " + n;
const doubleThenString = pipe(double, toString);

console.log(doubleThenString(5)); // "Value: 10"`,
      solution: `type Pipe = <A, B, C>(f: (a: A) => B, g: (b: B) => C) => (a: A) => C;

const pipe: Pipe = (f, g) => {
  return (a) => g(f(a));
};

const double = (n: number): number => n * 2;
const toString = (n: number): string => "Value: " + n;
const doubleThenString = pipe(double, toString);

console.log(doubleThenString(5)); // "Value: 10"`,
      hints: [
        'pipe(f, g) returns a function that applies f first, then g.',
        'The result is (a) => g(f(a)).',
        'return (a) => g(f(a));',
      ],
      concepts: ['pipe', 'function composition', 'higher-order types'],
    },
    {
      id: 'ts-fnt-16',
      title: 'Construct signature',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Define an interface with a construct signature and use it.',
      skeleton: `interface Constructable {
  new (name: string): { name: string };
}

function create(Ctor: Constructable, name: string): { name: string } {
  // Use the construct signature
}

class User {
  constructor(public name: string) {}
}

console.log(create(User, "Alice")); // User { name: "Alice" }`,
      solution: `interface Constructable {
  new (name: string): { name: string };
}

function create(Ctor: Constructable, name: string): { name: string } {
  return new Ctor(name);
}

class User {
  constructor(public name: string) {}
}

console.log(create(User, "Alice")); // User { name: "Alice" }`,
      hints: [
        'A construct signature uses the new keyword.',
        'Call new Ctor(name) to use the construct signature.',
        'return new Ctor(name);',
      ],
      concepts: ['construct signature', 'new', 'factory pattern'],
    },
    {
      id: 'ts-fnt-17',
      title: 'Function type guard',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type guard function that narrows a union type.',
      skeleton: `interface Cat { meow(): void; whiskers: number; }
interface Dog { bark(): void; breed: string; }

function isCat(pet: Cat | Dog): pet is Cat {
  // Check if the pet is a Cat
}

const pet: Cat | Dog = { meow() {}, whiskers: 12 };
if (isCat(pet)) {
  console.log("Whiskers:", pet.whiskers);
} else {
  console.log("Breed:", pet.breed);
}`,
      solution: `interface Cat { meow(): void; whiskers: number; }
interface Dog { bark(): void; breed: string; }

function isCat(pet: Cat | Dog): pet is Cat {
  return "meow" in pet;
}

const pet: Cat | Dog = { meow() {}, whiskers: 12 };
if (isCat(pet)) {
  console.log("Whiskers:", pet.whiskers);
} else {
  console.log("Breed:", pet.breed);
}`,
      hints: [
        'Use "property" in object to check for a distinguishing property.',
        'The return type "pet is Cat" is a type predicate.',
        'return "meow" in pet;',
      ],
      concepts: ['type guard', 'type predicate', 'in operator'],
    },
    {
      id: 'ts-fnt-18',
      title: 'Strict function types',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Does this code compile under strict mode? Write "Yes" or "No".',
      skeleton: `type NumberFn = (n: number) => void;
type AnyFn = (n: any) => void;

const numFn: NumberFn = (n) => console.log(n.toFixed(2));
const anyFn: AnyFn = numFn; // Is this assignment valid?`,
      solution: `No`,
      hints: [
        'Under strictFunctionTypes, function parameter types are checked contravariantly.',
        'NumberFn expects a number, but AnyFn could receive any type.',
        'No, this does not compile under strict mode.',
      ],
      concepts: ['strict function types', 'contravariance', 'type safety'],
    },
    {
      id: 'ts-fnt-19',
      title: 'Fix overload order',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'The overloads are in the wrong order, causing the more specific one to be shadowed. Fix it.',
      skeleton: `function format(value: string | number): string;
function format(value: number, decimals: number): string;
function format(value: string | number, decimals?: number): string {
  if (typeof value === "number" && decimals !== undefined) {
    return value.toFixed(decimals);
  }
  return String(value);
}

console.log(format(3.14159, 2)); // should call the number+decimals overload
console.log(format("hello"));`,
      solution: `function format(value: number, decimals: number): string;
function format(value: string | number): string;
function format(value: string | number, decimals?: number): string {
  if (typeof value === "number" && decimals !== undefined) {
    return value.toFixed(decimals);
  }
  return String(value);
}

console.log(format(3.14159, 2)); // "3.14"
console.log(format("hello"));   // "hello"`,
      hints: [
        'Overloads are matched from top to bottom -- more specific ones should come first.',
        'Put the (number, decimals) overload before the (string | number) one.',
        'Swap the order of the two overload signatures.',
      ],
      concepts: ['overload order', 'specificity', 'overload resolution'],
    },
    {
      id: 'ts-fnt-20',
      title: 'Refactor callbacks to typed functions',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this code to use named function type aliases instead of inline function types.',
      skeleton: `function process(
  items: string[],
  transform: (item: string) => string,
  filter: (item: string) => boolean,
  reduce: (acc: string, item: string) => string
): string {
  return items
    .map(transform)
    .filter(filter)
    .reduce(reduce, "");
}

const result = process(
  ["hello", "world", "hi"],
  (s) => s.toUpperCase(),
  (s) => s.length > 2,
  (acc, s) => acc + s + " "
);
console.log(result.trim()); // "HELLO WORLD"`,
      solution: `type Transform = (item: string) => string;
type Filter = (item: string) => boolean;
type Reducer = (acc: string, item: string) => string;

function process(
  items: string[],
  transform: Transform,
  filter: Filter,
  reduce: Reducer
): string {
  return items
    .map(transform)
    .filter(filter)
    .reduce(reduce, "");
}

const result = process(
  ["hello", "world", "hi"],
  (s) => s.toUpperCase(),
  (s) => s.length > 2,
  (acc, s) => acc + s + " "
);
console.log(result.trim()); // "HELLO WORLD"`,
      hints: [
        'Extract each inline function type into a named type alias.',
        'type Transform = (item: string) => string; etc.',
        'Create Transform, Filter, and Reducer type aliases.',
      ],
      concepts: ['refactoring', 'type aliases', 'named function types'],
    },
  ],
};
