import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-annotations',
  title: '3. Type Annotations',
  explanation: `## Type Annotations

Type annotations let you explicitly tell TypeScript the type of a value. While TypeScript can infer many types, explicit annotations serve as documentation and catch errors early.

### Variable Annotations
\\\`\\\`\\\`typescript
let name: string = "Alice";
let age: number = 30;
\\\`\\\`\\\`

### Function Parameter & Return Types
\\\`\\\`\\\`typescript
function greet(name: string, age: number): string {
  return \\\\\\\`Hello \\\${name}, age \\\${age}\\\\\\\`;
}
\\\`\\\`\\\`

### Array & Object Annotations
\\\`\\\`\\\`typescript
const nums: number[] = [1, 2, 3];
const user: { name: string; age: number } = { name: "Bob", age: 25 };
\\\`\\\`\\\`

### Optional & Default Parameters
- **Optional**: \\\`param?: Type\\\` (may be undefined)
- **Default**: \\\`param: Type = defaultValue\\\`

### Rest Parameters
Use \\\`...args: Type[]\\\` to accept a variable number of arguments.

### Function Overloads
Declare multiple signatures for the same function when it can accept different argument combinations.

### Contextual Typing
When TypeScript can infer types from context (like array method callbacks), you can omit annotations.
`,
  exercises: [
    {
      id: 'ts-ann-1',
      title: 'Variable annotation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add the correct type annotation to the variable.',
      skeleton: `let score: __BLANK__ = 100;
console.log(score);`,
      solution: `let score: number = 100;
console.log(score);`,
      hints: [
        'What type is the value 100?',
        'Whole numbers and decimals are both number.',
        'The answer is: number',
      ],
      concepts: ['type annotation', 'number'],
    },
    {
      id: 'ts-ann-2',
      title: 'Function parameter types',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add type annotations to the function parameters.',
      skeleton: `function add(a: __BLANK__, b: __BLANK__): number {
  return a + b;
}
console.log(add(3, 4));`,
      solution: `function add(a: number, b: number): number {
  return a + b;
}
console.log(add(3, 4));`,
      hints: [
        'What type should numeric parameters have?',
        'Both parameters should be number.',
        'The answer is: number, number',
      ],
      concepts: ['parameter types', 'function annotation'],
    },
    {
      id: 'ts-ann-3',
      title: 'Return type annotation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add the correct return type annotation.',
      skeleton: `function isEven(n: number): __BLANK__ {
  return n % 2 === 0;
}
console.log(isEven(4));`,
      solution: `function isEven(n: number): boolean {
  return n % 2 === 0;
}
console.log(isEven(4));`,
      hints: [
        'What type does a comparison return?',
        '=== returns true or false.',
        'The answer is: boolean',
      ],
      concepts: ['return type', 'boolean'],
    },
    {
      id: 'ts-ann-4',
      title: 'Array type annotation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add the correct type annotation for an array of strings.',
      skeleton: `const fruits: __BLANK__ = ["apple", "banana", "cherry"];
console.log(fruits);`,
      solution: `const fruits: string[] = ["apple", "banana", "cherry"];
console.log(fruits);`,
      hints: [
        'How do you annotate an array of strings?',
        'Use Type[] syntax.',
        'The answer is: string[]',
      ],
      concepts: ['array types', 'string[]'],
    },
    {
      id: 'ts-ann-5',
      title: 'Object type annotation inline',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add an inline object type annotation with name (string) and age (number).',
      skeleton: `const user: { name: __BLANK__; age: __BLANK__ } = { name: "Alice", age: 30 };
console.log(user);`,
      solution: `const user: { name: string; age: number } = { name: "Alice", age: 30 };
console.log(user);`,
      hints: [
        'Object types list property names and their types.',
        'name should be string, age should be number.',
        'The answer is: string, number',
      ],
      concepts: ['object type', 'inline annotation'],
    },
    {
      id: 'ts-ann-6',
      title: 'Optional parameter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a function greet that takes a required name (string) and an optional title (string). If title is provided, return "Hello, TITLE NAME!", otherwise return "Hello, NAME!".',
      skeleton: `function greet(name: string, title?: string): string {
  // Your code here
}

console.log(greet("Alice", "Dr.")); // "Hello, Dr. Alice!"
console.log(greet("Bob"));          // "Hello, Bob!"`,
      solution: `function greet(name: string, title?: string): string {
  if (title) {
    return "Hello, " + title + " " + name + "!";
  }
  return "Hello, " + name + "!";
}

console.log(greet("Alice", "Dr.")); // "Hello, Dr. Alice!"
console.log(greet("Bob"));          // "Hello, Bob!"`,
      hints: [
        'Check if the optional parameter was provided.',
        'Use an if statement to check if title is truthy.',
        'if (title) { return "Hello, " + title + " " + name + "!"; }',
      ],
      concepts: ['optional parameters', '?', 'conditionals'],
    },
    {
      id: 'ts-ann-7',
      title: 'Default parameter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a function that takes a name and an optional greeting with a default value of "Hello".',
      skeleton: `function sayHi(name: string, greeting: string = "Hello"): string {
  // Your code here
}

console.log(sayHi("Alice"));           // "Hello, Alice!"
console.log(sayHi("Bob", "Hey"));      // "Hey, Bob!"`,
      solution: `function sayHi(name: string, greeting: string = "Hello"): string {
  return greeting + ", " + name + "!";
}

console.log(sayHi("Alice"));           // "Hello, Alice!"
console.log(sayHi("Bob", "Hey"));      // "Hey, Bob!"`,
      hints: [
        'The default value is already set in the parameter list.',
        'Just use the greeting parameter -- it will have "Hello" if not provided.',
        'return greeting + ", " + name + "!";',
      ],
      concepts: ['default parameters', 'function annotation'],
    },
    {
      id: 'ts-ann-8',
      title: 'Rest parameters',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function sum that accepts any number of numeric arguments and returns their sum.',
      skeleton: `function sum(...numbers: number[]): number {
  // Your code here
}

console.log(sum(1, 2, 3));    // 6
console.log(sum(10, 20));     // 30
console.log(sum());           // 0`,
      solution: `function sum(...numbers: number[]): number {
  let total = 0;
  for (const n of numbers) {
    total += n;
  }
  return total;
}

console.log(sum(1, 2, 3));    // 6
console.log(sum(10, 20));     // 30
console.log(sum());           // 0`,
      hints: [
        'Rest parameters collect all arguments into an array.',
        'Loop through the numbers array and accumulate the sum.',
        'Use a for-of loop: for (const n of numbers) { total += n; }',
      ],
      concepts: ['rest parameters', '...args', 'accumulator'],
    },
    {
      id: 'ts-ann-9',
      title: 'Annotate array of objects',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Annotate the users array with the correct type: an array of objects with name (string) and active (boolean).',
      skeleton: `// Add the correct type annotation
const users = [
  { name: "Alice", active: true },
  { name: "Bob", active: false },
];

function getActiveUsers(list: { name: string; active: boolean }[]): string[] {
  // Return names of active users
}

console.log(getActiveUsers(users)); // ["Alice"]`,
      solution: `const users: { name: string; active: boolean }[] = [
  { name: "Alice", active: true },
  { name: "Bob", active: false },
];

function getActiveUsers(list: { name: string; active: boolean }[]): string[] {
  return list.filter(u => u.active).map(u => u.name);
}

console.log(getActiveUsers(users)); // ["Alice"]`,
      hints: [
        'Annotate the array as { name: string; active: boolean }[].',
        'Use filter to get active users, then map to get their names.',
        'list.filter(u => u.active).map(u => u.name)',
      ],
      concepts: ['object types', 'array of objects', 'filter', 'map'],
    },
    {
      id: 'ts-ann-10',
      title: 'Function returning object',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that returns an object with first and last string properties parsed from a full name.',
      skeleton: `function parseName(fullName: string): { first: string; last: string } {
  // Split the name and return an object
}

console.log(parseName("John Doe")); // { first: "John", last: "Doe" }`,
      solution: `function parseName(fullName: string): { first: string; last: string } {
  const parts = fullName.split(" ");
  return { first: parts[0], last: parts[1] };
}

console.log(parseName("John Doe")); // { first: "John", last: "Doe" }`,
      hints: [
        'Use split(" ") to break the name into parts.',
        'Return an object with first and last properties.',
        'const parts = fullName.split(" "); return { first: parts[0], last: parts[1] };',
      ],
      concepts: ['return type', 'object type', 'string split'],
    },
    {
      id: 'ts-ann-11',
      title: 'Contextual typing',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Does this code compile? Write "Yes" or "No" and explain why in one sentence.',
      skeleton: `const names = ["Alice", "Bob", "Charlie"];
// TypeScript infers the callback parameter type from the array type
const lengths = names.map(name => name.length);
console.log(lengths);`,
      solution: `Yes`,
      hints: [
        'TypeScript knows names is string[], so map callbacks get string parameters.',
        'This is called contextual typing -- the context provides the type.',
        'Yes, it compiles. TypeScript infers name as string from the string[] context.',
      ],
      concepts: ['contextual typing', 'type inference', 'map'],
    },
    {
      id: 'ts-ann-12',
      title: 'Fix missing annotations',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This function has implicit any parameters. Add proper type annotations so it compiles under strict mode.',
      skeleton: `function multiply(a, b) {
  return a * b;
}

console.log(multiply(3, 4));`,
      solution: `function multiply(a: number, b: number): number {
  return a * b;
}

console.log(multiply(3, 4));`,
      hints: [
        'In strict mode, parameters without types are an error.',
        'Both parameters are used with *, so they must be numbers.',
        'function multiply(a: number, b: number): number',
      ],
      concepts: ['strict mode', 'noImplicitAny', 'parameter types'],
    },
    {
      id: 'ts-ann-13',
      title: 'Generic Array<T> syntax',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use the Array<T> generic syntax instead of T[] to annotate this array.',
      skeleton: `const scores: __BLANK__ = [95, 87, 92, 78];
console.log(scores);`,
      solution: `const scores: Array<number> = [95, 87, 92, 78];
console.log(scores);`,
      hints: [
        'There are two syntaxes for array types: T[] and Array<T>.',
        'Array<number> is equivalent to number[].',
        'The answer is: Array<number>',
      ],
      concepts: ['Array<T>', 'generic syntax', 'array types'],
    },
    {
      id: 'ts-ann-14',
      title: 'Function overload signatures',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write overload signatures for a function that can either reverse a string (returning string) or reverse an array of numbers (returning number[]).',
      skeleton: `// Add overload signatures here

function reverse(input: string | number[]): string | number[] {
  if (typeof input === "string") {
    return input.split("").reverse().join("");
  }
  return [...input].reverse();
}

console.log(reverse("hello"));    // "olleh"
console.log(reverse([1, 2, 3]));  // [3, 2, 1]`,
      solution: `function reverse(input: string): string;
function reverse(input: number[]): number[];
function reverse(input: string | number[]): string | number[] {
  if (typeof input === "string") {
    return input.split("").reverse().join("");
  }
  return [...input].reverse();
}

console.log(reverse("hello"));    // "olleh"
console.log(reverse([1, 2, 3]));  // [3, 2, 1]`,
      hints: [
        'Overload signatures are declared before the implementation.',
        'Each overload signature has specific parameter and return types.',
        'function reverse(input: string): string; function reverse(input: number[]): number[];',
      ],
      concepts: ['function overloads', 'overload signatures'],
    },
    {
      id: 'ts-ann-15',
      title: 'Parameter destructuring with types',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function that uses destructuring in its parameter list with proper type annotations.',
      skeleton: `function displayUser(/* destructured param with name: string, age: number */): string {
  // Return "NAME (AGE)"
}

console.log(displayUser({ name: "Alice", age: 30 })); // "Alice (30)"`,
      solution: `function displayUser({ name, age }: { name: string; age: number }): string {
  return name + " (" + age + ")";
}

console.log(displayUser({ name: "Alice", age: 30 })); // "Alice (30)"`,
      hints: [
        'Destructuring in parameters: { prop1, prop2 }: { prop1: Type; prop2: Type }.',
        'The type annotation goes after the destructuring pattern.',
        '{ name, age }: { name: string; age: number }',
      ],
      concepts: ['parameter destructuring', 'inline object type'],
    },
    {
      id: 'ts-ann-16',
      title: 'Readonly parameter annotation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function that takes a readonly array and returns the first element. The function must not mutate the input.',
      skeleton: `function first(items: readonly string[]): string | undefined {
  // Return the first element without mutating the array
}

const colors: readonly string[] = ["red", "green", "blue"];
console.log(first(colors)); // "red"`,
      solution: `function first(items: readonly string[]): string | undefined {
  return items[0];
}

const colors: readonly string[] = ["red", "green", "blue"];
console.log(first(colors)); // "red"`,
      hints: [
        'readonly arrays cannot use push, pop, or other mutating methods.',
        'Index access is fine -- items[0] does not mutate.',
        'return items[0];',
      ],
      concepts: ['readonly arrays', 'immutability', 'parameter types'],
    },
    {
      id: 'ts-ann-17',
      title: 'Annotate a callback parameter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function applyTwice that takes a value and a callback, and applies the callback to the value twice.',
      skeleton: `function applyTwice(value: number, fn: (x: number) => number): number {
  // Apply fn to value, then apply fn to the result
}

console.log(applyTwice(3, x => x * 2));  // 12
console.log(applyTwice(5, x => x + 1));  // 7`,
      solution: `function applyTwice(value: number, fn: (x: number) => number): number {
  return fn(fn(value));
}

console.log(applyTwice(3, x => x * 2));  // 12
console.log(applyTwice(5, x => x + 1));  // 7`,
      hints: [
        'Apply fn to value first, then apply fn to that result.',
        'fn(fn(value)) applies the function twice.',
        'return fn(fn(value));',
      ],
      concepts: ['callback types', 'higher-order functions', 'function types'],
    },
    {
      id: 'ts-ann-18',
      title: 'Refactor implicit types',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Add explicit type annotations to every variable and function in this code. The code works but has no annotations.',
      skeleton: `function getFullName(first, last) {
  return first + " " + last;
}

const firstName = "John";
const lastName = "Doe";
const full = getFullName(firstName, lastName);
console.log(full);`,
      solution: `function getFullName(first: string, last: string): string {
  return first + " " + last;
}

const firstName: string = "John";
const lastName: string = "Doe";
const full: string = getFullName(firstName, lastName);
console.log(full);`,
      hints: [
        'Add type annotations to function parameters, return type, and variables.',
        'All values here are strings.',
        'first: string, last: string, return string, and all const variables: string.',
      ],
      concepts: ['type annotations', 'explicit typing', 'refactoring'],
    },
    {
      id: 'ts-ann-19',
      title: 'Fix overload implementation',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'The overload implementation signature is wrong. Fix it to be compatible with both overloads.',
      skeleton: `function format(value: string): string;
function format(value: number): string;
function format(value: string): string {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.toUpperCase();
}

console.log(format("hello")); // "HELLO"
console.log(format(42));      // "42.00"`,
      solution: `function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.toUpperCase();
}

console.log(format("hello")); // "HELLO"
console.log(format(42));      // "42.00"`,
      hints: [
        'The implementation signature must accept all overload parameter types.',
        'It needs to accept both string and number.',
        'Change the implementation parameter to value: string | number.',
      ],
      concepts: ['function overloads', 'implementation signature', 'union types'],
    },
    {
      id: 'ts-ann-20',
      title: 'Refactor to use annotations throughout',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this code to use proper type annotations for everything: the config object, the function parameters, return type, and the result variable.',
      skeleton: `const config = {
  host: "localhost",
  port: 3000,
  secure: false,
};

function buildUrl(cfg) {
  const protocol = cfg.secure ? "https" : "http";
  return protocol + "://" + cfg.host + ":" + cfg.port;
}

const url = buildUrl(config);
console.log(url);`,
      solution: `const config: { host: string; port: number; secure: boolean } = {
  host: "localhost",
  port: 3000,
  secure: false,
};

function buildUrl(cfg: { host: string; port: number; secure: boolean }): string {
  const protocol: string = cfg.secure ? "https" : "http";
  return protocol + "://" + cfg.host + ":" + cfg.port;
}

const url: string = buildUrl(config);
console.log(url);`,
      hints: [
        'The config object has three properties: host (string), port (number), secure (boolean).',
        'The function parameter needs the same shape, and returns a string.',
        'Annotate config, cfg parameter, protocol, url, and return type.',
      ],
      concepts: ['type annotations', 'object types', 'refactoring'],
    },
  ],
};
