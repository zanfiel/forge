import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-variables',
  title: '1. Variables & Declarations',
  explanation: `## Variables & Declarations

JavaScript has three ways to declare variables: \`var\`, \`let\`, and \`const\`.

### var
- Function-scoped (or global if declared outside a function)
- Hoisted to the top of its scope and initialised as \`undefined\`
- Can be re-declared in the same scope without error

### let
- Block-scoped (lives inside \`{}\`)
- Hoisted but **not** initialised -- accessing it before the declaration throws a \`ReferenceError\` (the **Temporal Dead Zone**)
- Cannot be re-declared in the same scope

### const
- Block-scoped like \`let\`
- Must be initialised at declaration
- The *binding* is immutable, but object/array *contents* can still be mutated

### Naming Rules
- Must start with a letter, \`_\`, or \`$\`
- Convention: camelCase for variables, UPPER_SNAKE for true constants
- Cannot use reserved words (\`class\`, \`return\`, etc.)

### Destructuring Declarations
You can unpack values from arrays or objects directly into variables:
\`\`\`js
const [a, b] = [1, 2];
const { name, age } = { name: 'Zan', age: 30 };
\`\`\`

### Variable Shadowing
An inner scope can declare a variable with the same name as an outer one, "shadowing" it.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-var-1',
      title: 'Declare with let',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Use the correct keyword to declare a block-scoped variable.',
      skeleton: `__BLANK__ count = 10;
console.log(count);`,
      solution: `let count = 10;
console.log(count);`,
      hints: [
        'You need a keyword that creates a block-scoped variable.',
        'It is not var (function-scoped) and not const (immutable binding).',
        'The keyword is `let`.',
      ],
      concepts: ['let', 'block scope', 'variable declaration'],
    },
    {
      id: 'js-var-2',
      title: 'Declare a constant',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Declare an immutable binding for a value that never changes.',
      skeleton: `__BLANK__ PI = 3.14159;
console.log(PI);`,
      solution: `const PI = 3.14159;
console.log(PI);`,
      hints: [
        'You need a keyword that prevents reassignment.',
        'The binding should be immutable.',
        'Use `const`.',
      ],
      concepts: ['const', 'immutable binding'],
    },
    {
      id: 'js-var-3',
      title: 'var hoisting',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the value that the console.log outputs before the var assignment.',
      skeleton: `console.log(x); // outputs: __BLANK__
var x = 5;`,
      solution: `console.log(x); // outputs: undefined
var x = 5;`,
      hints: [
        'var declarations are hoisted to the top of their scope.',
        'The declaration is hoisted but not the initialisation.',
        'The value is `undefined`.',
      ],
      concepts: ['var', 'hoisting', 'undefined'],
    },
    {
      id: 'js-var-4',
      title: 'Destructuring an array',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Use array destructuring to extract the first two elements.',
      skeleton: `const nums = [10, 20, 30];
const [__BLANK__, __BLANK__] = nums;
console.log(a, b); // 10 20`,
      solution: `const nums = [10, 20, 30];
const [a, b] = nums;
console.log(a, b); // 10 20`,
      hints: [
        'Array destructuring uses square brackets on the left side of the assignment.',
        'The variable names go inside the brackets, matching position.',
        'Use `a, b` to match the first two elements.',
      ],
      concepts: ['destructuring', 'array destructuring', 'const'],
    },
    {
      id: 'js-var-5',
      title: 'Temporal Dead Zone',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Identify the error type thrown when accessing a let variable before its declaration.',
      skeleton: `try {
  console.log(val);
  let val = 42;
} catch (e) {
  console.log(e.constructor.name); // __BLANK__
}`,
      solution: `try {
  console.log(val);
  let val = 42;
} catch (e) {
  console.log(e.constructor.name); // ReferenceError
}`,
      hints: [
        'let variables are hoisted but not initialised.',
        'Accessing them before declaration is called the Temporal Dead Zone.',
        'It throws a `ReferenceError`.',
      ],
      concepts: ['let', 'TDZ', 'temporal dead zone', 'ReferenceError'],
    },
    {
      id: 'js-var-6',
      title: 'const with objects',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the keyword showing that const objects can have their properties mutated.',
      skeleton: `const user = { name: 'Zan' };
user.__BLANK__ = 30;
console.log(user.age); // 30`,
      solution: `const user = { name: 'Zan' };
user.age = 30;
console.log(user.age); // 30`,
      hints: [
        'const prevents reassignment of the binding, not mutation of the value.',
        'You can add properties to a const object.',
        'Add the property `age`.',
      ],
      concepts: ['const', 'object mutation', 'immutable binding vs mutable value'],
    },
    // ---- write-function (6) ----
    {
      id: 'js-var-7',
      title: 'Swap two variables',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write code that swaps the values of variables `a` and `b` using destructuring.',
      skeleton: `let a = 1;
let b = 2;

// Swap a and b using destructuring
`,
      solution: `let a = 1;
let b = 2;

[a, b] = [b, a];`,
      hints: [
        'You can use array destructuring for swapping.',
        'Put both variables in an array on the right, reversed on the left.',
        '`[a, b] = [b, a];`',
      ],
      concepts: ['destructuring', 'swap', 'array destructuring'],
    },
    {
      id: 'js-var-8',
      title: 'Multiple declarations',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Declare three variables (x, y, z) in a single let statement with values 1, 2, 3.',
      skeleton: `// Declare x, y, z in a single statement
`,
      solution: `let x = 1, y = 2, z = 3;`,
      hints: [
        'You can declare multiple variables in one statement separated by commas.',
        'Use a single `let` keyword.',
        '`let x = 1, y = 2, z = 3;`',
      ],
      concepts: ['let', 'multiple declarations'],
    },
    {
      id: 'js-var-9',
      title: 'Object destructuring declaration',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Destructure the config object into individual const variables: host, port, and secure.',
      skeleton: `const config = { host: 'localhost', port: 8080, secure: true };

// Destructure config into host, port, secure
`,
      solution: `const config = { host: 'localhost', port: 8080, secure: true };

const { host, port, secure } = config;`,
      hints: [
        'Object destructuring uses curly braces on the left side.',
        'Property names must match the object keys.',
        '`const { host, port, secure } = config;`',
      ],
      concepts: ['destructuring', 'object destructuring', 'const'],
    },
    {
      id: 'js-var-10',
      title: 'Block scope demonstration',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write code that demonstrates let block scoping: declare a let variable inside a block, then show it is not accessible outside.',
      skeleton: `function testScope() {
  // Declare msg inside a block, return whether it is accessible outside
}
`,
      solution: `function testScope() {
  {
    let msg = 'hello';
  }
  try {
    return msg;
  } catch {
    return 'not accessible';
  }
}`,
      hints: [
        'Wrap a let declaration inside curly braces to create a block.',
        'Try accessing the variable outside the block in a try/catch.',
        'It will throw a ReferenceError because let is block-scoped.',
      ],
      concepts: ['let', 'block scope', 'ReferenceError'],
    },
    {
      id: 'js-var-11',
      title: 'Default destructuring values',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Destructure an object with a default value: extract `name` and `role` from a user object, defaulting `role` to "viewer".',
      skeleton: `const user = { name: 'Zan' };

// Destructure with default for role
`,
      solution: `const user = { name: 'Zan' };

const { name, role = 'viewer' } = user;`,
      hints: [
        'You can assign defaults in destructuring with the `=` operator.',
        'Default only applies when the property is undefined.',
        '`const { name, role = "viewer" } = user;`',
      ],
      concepts: ['destructuring', 'default values', 'object destructuring'],
    },
    {
      id: 'js-var-12',
      title: 'Variable shadowing',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that declares a variable `x` with value "outer", then inside a block declares another `x` with value "inner", and returns both values as an array [innerX, outerX].',
      skeleton: `function shadowDemo() {
  // Return [innerX, outerX]
}
`,
      solution: `function shadowDemo() {
  let x = 'outer';
  let outerX;
  {
    let x = 'inner';
    outerX = x;
  }
  return [outerX, x];
}`,
      hints: [
        'An inner block can declare a variable with the same name as an outer one.',
        'The inner `x` shadows the outer `x` only inside that block.',
        'Capture the inner value before the block ends, then return both.',
      ],
      concepts: ['variable shadowing', 'block scope', 'let'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'js-var-13',
      title: 'Fix the const reassignment',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'This code tries to reassign a const variable. Fix it so the code works correctly.',
      skeleton: `const score = 0;
score = 10;
console.log(score);`,
      solution: `let score = 0;
score = 10;
console.log(score);`,
      hints: [
        'const bindings cannot be reassigned.',
        'If you need to change the value later, use a different keyword.',
        'Change `const` to `let`.',
      ],
      concepts: ['const', 'let', 'reassignment'],
    },
    {
      id: 'js-var-14',
      title: 'Fix the loop variable leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'The loop variable leaks outside the for loop because of var. Fix it so `i` is not accessible after the loop.',
      skeleton: `for (var i = 0; i < 3; i++) {
  console.log(i);
}
console.log('after loop:', i); // should cause ReferenceError`,
      solution: `for (let i = 0; i < 3; i++) {
  console.log(i);
}
// i is no longer accessible here`,
      hints: [
        'var is function-scoped, so `i` leaks out of the for block.',
        'Use a block-scoped declaration keyword instead.',
        'Change `var` to `let`.',
      ],
      concepts: ['var', 'let', 'block scope', 'loop variable'],
    },
    {
      id: 'js-var-15',
      title: 'Fix the missing initialisation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code declares a const without an initialiser. Fix it.',
      skeleton: `const MAX_SIZE;
MAX_SIZE = 100;
console.log(MAX_SIZE);`,
      solution: `const MAX_SIZE = 100;
console.log(MAX_SIZE);`,
      hints: [
        'const requires an initialiser at declaration time.',
        'You cannot declare const and assign later.',
        'Combine the declaration and assignment into one line.',
      ],
      concepts: ['const', 'initialisation', 'SyntaxError'],
    },
    // ---- predict-output (3) ----
    {
      id: 'js-var-16',
      title: 'Predict: var in block',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output of this code.',
      skeleton: `{
  var x = 10;
}
console.log(x);`,
      solution: `10`,
      hints: [
        'var is not block-scoped.',
        'The block `{}` does not restrict var visibility.',
        'x is available outside the block and holds 10.',
      ],
      concepts: ['var', 'block scope', 'hoisting'],
    },
    {
      id: 'js-var-17',
      title: 'Predict: hoisting order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output of this code.',
      skeleton: `var a = 1;
function foo() {
  console.log(a);
  var a = 2;
}
foo();`,
      solution: `undefined`,
      hints: [
        'var inside the function is hoisted to the top of the function.',
        'The local `a` shadows the global `a`, but its value is hoisted as undefined.',
        'The output is `undefined`.',
      ],
      concepts: ['var', 'hoisting', 'function scope', 'shadowing'],
    },
    {
      id: 'js-var-18',
      title: 'Predict: const array mutation',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict the output of this code.',
      skeleton: `const arr = [1, 2, 3];
arr.push(4);
console.log(arr.length);`,
      solution: `4`,
      hints: [
        'const prevents reassignment of the binding, not mutation.',
        'push modifies the array in place.',
        'The array now has 4 elements.',
      ],
      concepts: ['const', 'mutation', 'arrays', 'immutable binding'],
    },
    // ---- refactor (2) ----
    {
      id: 'js-var-19',
      title: 'Refactor: var to let/const',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Refactor this code to use let and const instead of var. Use const where the value is never reassigned.',
      skeleton: `var name = 'Zan';
var age = 30;
var greeting = 'Hello, ' + name;
age = age + 1;
console.log(greeting, age);`,
      solution: `const name = 'Zan';
let age = 30;
const greeting = 'Hello, ' + name;
age = age + 1;
console.log(greeting, age);`,
      hints: [
        'Identify which variables are reassigned and which are not.',
        'name and greeting are never reassigned, so use const.',
        'age is reassigned, so use let.',
      ],
      concepts: ['var', 'let', 'const', 'refactoring'],
    },
    {
      id: 'js-var-20',
      title: 'Refactor: manual extraction to destructuring',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor the manual property extraction to use destructuring.',
      skeleton: `const person = { name: 'Zan', age: 30, city: 'Toronto' };
const name = person.name;
const age = person.age;
const city = person.city;
console.log(name, age, city);`,
      solution: `const person = { name: 'Zan', age: 30, city: 'Toronto' };
const { name, age, city } = person;
console.log(name, age, city);`,
      hints: [
        'You can extract multiple properties in one destructuring statement.',
        'Use `const { ... } = object` syntax.',
        '`const { name, age, city } = person;`',
      ],
      concepts: ['destructuring', 'object destructuring', 'refactoring'],
    },
  ],
};
