import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-variables',
  title: '1. Variables & Declarations',
  explanation: `## Variables & Declarations

In TypeScript (and modern JavaScript), you declare variables with \\\`let\\\`, \\\`const\\\`, or \\\`var\\\`.

- **\\\`const\\\`** -- cannot be reassigned after declaration. Use by default.
- **\\\`let\\\`** -- can be reassigned. Use when the value must change.
- **\\\`var\\\`** -- function-scoped, hoisted. Avoid in modern code.

### Block Scope
\\\`let\\\` and \\\`const\\\` are block-scoped (limited to the nearest \\\`{}\\\`), while \\\`var\\\` is function-scoped.

### Temporal Dead Zone
Accessing a \\\`let\\\` or \\\`const\\\` variable before its declaration throws a ReferenceError. This zone between the start of the block and the declaration is called the Temporal Dead Zone (TDZ).

### Naming Conventions
- Use camelCase for variables and functions.
- Use PascalCase for types, interfaces, and classes.
- Use UPPER_SNAKE_CASE for true constants.

### Destructuring Declarations
You can unpack values from arrays or properties from objects into distinct variables.

### const with Objects
\\\`const\\\` prevents reassignment of the binding, but the contents of objects and arrays declared with \\\`const\\\` can still be mutated.
`,
  exercises: [
    {
      id: 'ts-var-1',
      title: 'Declare with const',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Declare a constant string variable called greeting with the value "hello".',
      skeleton: `__BLANK__ greeting = "hello";
console.log(greeting);`,
      solution: `const greeting = "hello";
console.log(greeting);`,
      hints: [
        'Which keyword prevents reassignment?',
        'Use const for values that should never change.',
        'The answer is: const',
      ],
      concepts: ['const', 'variable declaration', 'string'],
    },
    {
      id: 'ts-var-2',
      title: 'Declare with let',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Declare a variable count with let, initialized to 0, then reassign it to 5.',
      skeleton: `__BLANK__ count = 0;
count = 5;
console.log(count);`,
      solution: `let count = 0;
count = 5;
console.log(count);`,
      hints: [
        'Which keyword allows reassignment?',
        'let declares a block-scoped variable that can be reassigned.',
        'The answer is: let',
      ],
      concepts: ['let', 'reassignment', 'variable declaration'],
    },
    {
      id: 'ts-var-3',
      title: 'const vs let',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code output? (If it throws an error, write "Error".)',
      skeleton: `const x = 10;
x = 20;
console.log(x);`,
      solution: `Error`,
      hints: [
        'const variables cannot be reassigned.',
        'Attempting to reassign a const throws a TypeError.',
        'The output is: Error',
      ],
      concepts: ['const', 'reassignment error', 'TypeError'],
    },
    {
      id: 'ts-var-4',
      title: 'Block scope with let',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `let a = 1;
{
  let a = 2;
  console.log(a);
}
console.log(a);`,
      solution: `2
1`,
      hints: [
        'let is block-scoped -- each block can have its own binding.',
        'The inner a shadows the outer a only inside the braces.',
        'Output is 2 then 1.',
      ],
      concepts: ['block scope', 'let', 'shadowing'],
    },
    {
      id: 'ts-var-5',
      title: 'var hoisting',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `console.log(y);
var y = 42;`,
      solution: `undefined`,
      hints: [
        'var declarations are hoisted to the top of their scope.',
        'The declaration is hoisted but not the initialization.',
        'Output is: undefined',
      ],
      concepts: ['var', 'hoisting', 'undefined'],
    },
    {
      id: 'ts-var-6',
      title: 'Temporal dead zone',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'This code throws a ReferenceError due to the temporal dead zone. Fix it so it logs "ready".',
      skeleton: `console.log(status);
let status = "ready";`,
      solution: `let status = "ready";
console.log(status);`,
      hints: [
        'You cannot access a let variable before its declaration.',
        'Move the declaration before the usage.',
        'Put let status = "ready" on the first line.',
      ],
      concepts: ['temporal dead zone', 'let', 'ReferenceError'],
    },
    {
      id: 'ts-var-7',
      title: 'Multiple declarations',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Declare two variables in one statement: firstName as "Ada" and lastName as "Lovelace".',
      skeleton: `const __BLANK__ = "Ada", __BLANK__ = "Lovelace";
console.log(firstName, lastName);`,
      solution: `const firstName = "Ada", lastName = "Lovelace";
console.log(firstName, lastName);`,
      hints: [
        'You can declare multiple const variables separated by commas.',
        'Each variable needs its own name and value.',
        'const firstName = "Ada", lastName = "Lovelace"',
      ],
      concepts: ['multiple declarations', 'const', 'comma-separated'],
    },
    {
      id: 'ts-var-8',
      title: 'Naming conventions',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fix the variable name to follow TypeScript camelCase convention.',
      skeleton: `const __BLANK__ = 42;
console.log(userAge);`,
      solution: `const userAge = 42;
console.log(userAge);`,
      hints: [
        'TypeScript uses camelCase for variable names.',
        'Combine "user" and "age" in camelCase.',
        'The answer is: userAge',
      ],
      concepts: ['naming conventions', 'camelCase'],
    },
    {
      id: 'ts-var-9',
      title: 'Object destructuring declaration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use destructuring to extract name and age from the person object.',
      skeleton: `const person = { name: "Alice", age: 30, city: "Paris" };
const { __BLANK__, __BLANK__ } = person;
console.log(name, age);`,
      solution: `const person = { name: "Alice", age: 30, city: "Paris" };
const { name, age } = person;
console.log(name, age);`,
      hints: [
        'Object destructuring uses { } on the left side of the assignment.',
        'The variable names must match the property names.',
        'const { name, age } = person;',
      ],
      concepts: ['destructuring', 'object destructuring', 'const'],
    },
    {
      id: 'ts-var-10',
      title: 'Array destructuring declaration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use array destructuring to get the first and second elements.',
      skeleton: `const colors = ["red", "green", "blue"];
const [__BLANK__, __BLANK__] = colors;
console.log(first, second);`,
      solution: `const colors = ["red", "green", "blue"];
const [first, second] = colors;
console.log(first, second);`,
      hints: [
        'Array destructuring uses [ ] on the left side.',
        'The first name gets the first element, the second name gets the second.',
        'const [first, second] = colors;',
      ],
      concepts: ['destructuring', 'array destructuring'],
    },
    {
      id: 'ts-var-11',
      title: 'Swap two variables',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Swap the values of a and b without using a temporary variable. Use array destructuring.',
      skeleton: `let a = 1;
let b = 2;

// Swap a and b here

console.log(a, b); // should output: 2 1`,
      solution: `let a = 1;
let b = 2;

[a, b] = [b, a];

console.log(a, b); // should output: 2 1`,
      hints: [
        'You can use destructuring assignment to swap.',
        '[a, b] = [b, a] swaps without a temp variable.',
        'The answer: [a, b] = [b, a];',
      ],
      concepts: ['destructuring assignment', 'swap', 'array destructuring'],
    },
    {
      id: 'ts-var-12',
      title: 'const with objects',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Given a const object, update its name property to "Bob". This is legal because const prevents reassignment of the binding, not mutation of the value.',
      skeleton: `const user = { name: "Alice", score: 100 };

// Change user.name to "Bob"

console.log(user.name); // should output: Bob`,
      solution: `const user = { name: "Alice", score: 100 };

user.name = "Bob";

console.log(user.name); // should output: Bob`,
      hints: [
        'const prevents reassigning the variable, not modifying the object.',
        'You can still set properties on a const object.',
        'user.name = "Bob";',
      ],
      concepts: ['const', 'object mutation', 'reference types'],
    },
    {
      id: 'ts-var-13',
      title: 'const with arrays',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Push the number 4 onto a const array. This works because const only prevents reassignment.',
      skeleton: `const nums = [1, 2, 3];

// Add 4 to the array

console.log(nums); // should output: [1, 2, 3, 4]`,
      solution: `const nums = [1, 2, 3];

nums.push(4);

console.log(nums); // should output: [1, 2, 3, 4]`,
      hints: [
        'const arrays can still be mutated.',
        'Use the push method to add an element.',
        'nums.push(4);',
      ],
      concepts: ['const', 'array mutation', 'push'],
    },
    {
      id: 'ts-var-14',
      title: 'Readonly concept',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix this code so the array cannot be modified. Use Readonly or readonly.',
      skeleton: `const scores: number[] = [10, 20, 30];
scores.push(40); // This should cause a type error

console.log(scores);`,
      solution: `const scores: readonly number[] = [10, 20, 30];
// scores.push(40); // Type error: Property 'push' does not exist on type 'readonly number[]'

console.log(scores);`,
      hints: [
        'TypeScript has a readonly modifier for arrays.',
        'Use readonly number[] or ReadonlyArray<number>.',
        'const scores: readonly number[] = [10, 20, 30]; and comment out the push.',
      ],
      concepts: ['readonly', 'immutability', 'type safety'],
    },
    {
      id: 'ts-var-15',
      title: 'Destructuring with rename',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Destructure the object, renaming the property "name" to "userName" and "age" to "userAge".',
      skeleton: `const data = { name: "Charlie", age: 25 };

// Destructure with renamed variables

console.log(userName, userAge); // should output: Charlie 25`,
      solution: `const data = { name: "Charlie", age: 25 };

const { name: userName, age: userAge } = data;

console.log(userName, userAge); // should output: Charlie 25`,
      hints: [
        'You can rename during destructuring with : syntax.',
        'Use { originalName: newName } pattern.',
        'const { name: userName, age: userAge } = data;',
      ],
      concepts: ['destructuring', 'renaming', 'object destructuring'],
    },
    {
      id: 'ts-var-16',
      title: 'Destructuring with defaults',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Destructure the config object, providing a default value of 3000 for port and "localhost" for host if they are missing.',
      skeleton: `const config: { port?: number; host?: string } = {};

// Destructure with defaults

console.log(host, port); // should output: localhost 3000`,
      solution: `const config: { port?: number; host?: string } = {};

const { port = 3000, host = "localhost" } = config;

console.log(host, port); // should output: localhost 3000`,
      hints: [
        'Destructuring supports default values with = syntax.',
        '{ property = defaultValue } sets a fallback.',
        'const { port = 3000, host = "localhost" } = config;',
      ],
      concepts: ['destructuring', 'default values', 'optional properties'],
    },
    {
      id: 'ts-var-17',
      title: 'var vs let in loops',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This code is supposed to create an array of functions that return 0, 1, 2. But because of var, they all return 3. Fix it by using let.',
      skeleton: `const funcs: (() => number)[] = [];
for (var i = 0; i < 3; i++) {
  funcs.push(() => i);
}
console.log(funcs[0]()); // should be 0
console.log(funcs[1]()); // should be 1
console.log(funcs[2]()); // should be 2`,
      solution: `const funcs: (() => number)[] = [];
for (let i = 0; i < 3; i++) {
  funcs.push(() => i);
}
console.log(funcs[0]()); // should be 0
console.log(funcs[1]()); // should be 1
console.log(funcs[2]()); // should be 2`,
      hints: [
        'var is function-scoped, so all closures share the same i.',
        'let is block-scoped and creates a new binding per iteration.',
        'Change var to let in the for loop.',
      ],
      concepts: ['var vs let', 'closure', 'loop scoping'],
    },
    {
      id: 'ts-var-18',
      title: 'Nested destructuring',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Extract the street value from the nested address object using nested destructuring.',
      skeleton: `const company = {
  name: "Acme",
  address: {
    street: "123 Main St",
    city: "Springfield",
  },
};

// Use nested destructuring to get street

console.log(street); // should output: 123 Main St`,
      solution: `const company = {
  name: "Acme",
  address: {
    street: "123 Main St",
    city: "Springfield",
  },
};

const { address: { street } } = company;

console.log(street); // should output: 123 Main St`,
      hints: [
        'You can destructure nested objects by nesting the pattern.',
        '{ outer: { inner } } extracts the inner property.',
        'const { address: { street } } = company;',
      ],
      concepts: ['nested destructuring', 'deep destructuring'],
    },
    {
      id: 'ts-var-19',
      title: 'Rest in destructuring',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Use the rest pattern in destructuring to separate the first element from the remaining elements.',
      skeleton: `const numbers = [10, 20, 30, 40, 50];

// Destructure: first element into 'head', the rest into 'tail'

console.log(head); // should output: 10
console.log(tail); // should output: [20, 30, 40, 50]`,
      solution: `const numbers = [10, 20, 30, 40, 50];

const [head, ...tail] = numbers;

console.log(head); // should output: 10
console.log(tail); // should output: [20, 30, 40, 50]`,
      hints: [
        'The rest element uses ... syntax in destructuring.',
        '[first, ...rest] captures the first and collects the rest.',
        'const [head, ...tail] = numbers;',
      ],
      concepts: ['rest pattern', 'array destructuring', 'spread'],
    },
    {
      id: 'ts-var-20',
      title: 'Refactor var to const/let',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this code to use const and let instead of var. Use const where the variable is never reassigned, let where it is.',
      skeleton: `var name = "Forge";
var version = 1;
var isReady = false;

version = 2;
isReady = true;

console.log(name, version, isReady);`,
      solution: `const name = "Forge";
let version = 1;
let isReady = false;

version = 2;
isReady = true;

console.log(name, version, isReady);`,
      hints: [
        'Identify which variables are reassigned and which are not.',
        'name is never reassigned so use const. version and isReady are reassigned so use let.',
        'const name, let version, let isReady.',
      ],
      concepts: ['refactoring', 'const vs let', 'var elimination'],
    },
  ],
};
