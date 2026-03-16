import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-basic-types',
  title: '2. Basic Types',
  explanation: `## Basic Types

TypeScript has several primitive types built on top of JavaScript:

- **\\\`string\\\`** -- textual data: \\\`"hello"\\\`, \\\`'world'\\\`, \\\`\\\\\\\`template\\\\\\\`\\\`
- **\\\`number\\\`** -- all numeric values (integers and floats): \\\`42\\\`, \\\`3.14\\\`
- **\\\`boolean\\\`** -- \\\`true\\\` or \\\`false\\\`
- **\\\`null\\\`** -- intentional absence of value
- **\\\`undefined\\\`** -- variable declared but not assigned
- **\\\`void\\\`** -- typically the return type of functions that don't return a value
- **\\\`never\\\`** -- represents values that never occur (unreachable code, functions that always throw)
- **\\\`any\\\`** -- opts out of type checking (avoid when possible)
- **\\\`unknown\\\`** -- type-safe counterpart of any (must narrow before use)

### Type Inference
TypeScript can infer types from initial values. You don't always need explicit annotations.

### Special Values
- \\\`NaN\\\` (Not a Number) is of type \\\`number\\\`
- \\\`Infinity\\\` and \\\`-Infinity\\\` are of type \\\`number\\\`
- \\\`bigint\\\` handles integers of arbitrary precision: \\\`9007199254740991n\\\`
- \\\`symbol\\\` creates unique identifiers: \\\`Symbol("desc")\\\`
`,
  exercises: [
    {
      id: 'ts-types-1',
      title: 'String type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Annotate the variable with the correct type.',
      skeleton: `const greeting: __BLANK__ = "Hello, TypeScript!";
console.log(greeting);`,
      solution: `const greeting: string = "Hello, TypeScript!";
console.log(greeting);`,
      hints: [
        'What type represents textual data?',
        'The type for quoted text is string.',
        'The answer is: string',
      ],
      concepts: ['string', 'type annotation'],
    },
    {
      id: 'ts-types-2',
      title: 'Number type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Annotate the variable with the correct type.',
      skeleton: `const pi: __BLANK__ = 3.14159;
console.log(pi);`,
      solution: `const pi: number = 3.14159;
console.log(pi);`,
      hints: [
        'What type covers both integers and floating-point values?',
        'TypeScript uses a single numeric type for all numbers.',
        'The answer is: number',
      ],
      concepts: ['number', 'type annotation'],
    },
    {
      id: 'ts-types-3',
      title: 'Boolean type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Annotate the variable with the correct type.',
      skeleton: `const isActive: __BLANK__ = true;
console.log(isActive);`,
      solution: `const isActive: boolean = true;
console.log(isActive);`,
      hints: [
        'What type represents true or false?',
        'It is the boolean type.',
        'The answer is: boolean',
      ],
      concepts: ['boolean', 'type annotation'],
    },
    {
      id: 'ts-types-4',
      title: 'Type inference',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What is the inferred type of x? Write the type name.',
      skeleton: `const x = 42;
// What type does TypeScript infer for x?`,
      solution: `42`,
      hints: [
        'const variables get a narrower inferred type than let.',
        'TypeScript infers const primitives as literal types.',
        'The inferred type is the literal type 42.',
      ],
      concepts: ['type inference', 'literal types', 'const'],
    },
    {
      id: 'ts-types-5',
      title: 'null and undefined',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Declare a variable that can be a string or null.',
      skeleton: `let username: __BLANK__ = null;
username = "Alice";
console.log(username);`,
      solution: `let username: string | null = null;
username = "Alice";
console.log(username);`,
      hints: [
        'You need a union type to allow both string and null.',
        'Use the pipe | to combine types.',
        'The answer is: string | null',
      ],
      concepts: ['null', 'union types', 'nullable'],
    },
    {
      id: 'ts-types-6',
      title: 'void return type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add the correct return type annotation for a function that logs but returns nothing.',
      skeleton: `function greet(name: string): __BLANK__ {
  console.log("Hello, " + name);
}
greet("World");`,
      solution: `function greet(name: string): void {
  console.log("Hello, " + name);
}
greet("World");`,
      hints: [
        'What type represents "no return value"?',
        'Functions that don\'t return use void.',
        'The answer is: void',
      ],
      concepts: ['void', 'return type', 'function annotation'],
    },
    {
      id: 'ts-types-7',
      title: 'typeof operator',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `console.log(typeof "hello");
console.log(typeof 42);
console.log(typeof true);
console.log(typeof undefined);`,
      solution: `string
number
boolean
undefined`,
      hints: [
        'typeof returns a string describing the type.',
        'Each primitive has a matching typeof result.',
        'Output: string, number, boolean, undefined (one per line).',
      ],
      concepts: ['typeof', 'runtime type checking'],
    },
    {
      id: 'ts-types-8',
      title: 'NaN is a number',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `const result = 0 / 0;
console.log(result);
console.log(typeof result);`,
      solution: `NaN
number`,
      hints: [
        '0 divided by 0 produces a special numeric value.',
        'NaN stands for Not a Number, but its type is number.',
        'Output: NaN then number.',
      ],
      concepts: ['NaN', 'typeof', 'number'],
    },
    {
      id: 'ts-types-9',
      title: 'any escape hatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This code uses any, which hides a bug. Replace any with proper types so TypeScript catches the error.',
      skeleton: `function add(a: any, b: any): any {
  return a + b;
}

const result = add("5", 10);
console.log(result); // "510" -- not what we wanted!`,
      solution: `function add(a: number, b: number): number {
  return a + b;
}

const result = add(5, 10);
console.log(result); // 15`,
      hints: [
        'any disables type checking entirely.',
        'Use number for both parameters and the return type.',
        'function add(a: number, b: number): number and pass 5 instead of "5".',
      ],
      concepts: ['any', 'type safety', 'number'],
    },
    {
      id: 'ts-types-10',
      title: 'unknown vs any',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that accepts an unknown value and safely returns its length if it is a string, or -1 otherwise.',
      skeleton: `function safeLength(value: unknown): number {
  // Your code here
}

console.log(safeLength("hello")); // 5
console.log(safeLength(42));      // -1`,
      solution: `function safeLength(value: unknown): number {
  if (typeof value === "string") {
    return value.length;
  }
  return -1;
}

console.log(safeLength("hello")); // 5
console.log(safeLength(42));      // -1`,
      hints: [
        'unknown requires narrowing before you can use its value.',
        'Use typeof to check if the value is a string.',
        'if (typeof value === "string") { return value.length; } return -1;',
      ],
      concepts: ['unknown', 'type narrowing', 'typeof'],
    },
    {
      id: 'ts-types-11',
      title: 'never type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function throwError that always throws and has a return type of never.',
      skeleton: `function throwError(message: string) {
  // Your code here
}

// throwError("Something went wrong");`,
      solution: `function throwError(message: string): never {
  throw new Error(message);
}

// throwError("Something went wrong");`,
      hints: [
        'never means the function never successfully returns.',
        'A function that always throws has a return type of never.',
        'function throwError(message: string): never { throw new Error(message); }',
      ],
      concepts: ['never', 'throw', 'return type'],
    },
    {
      id: 'ts-types-12',
      title: 'Template literal values',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create a template literal string that says "Hello, NAME! You are AGE years old." using the provided variables.',
      skeleton: `const name = "Alice";
const age = 30;

const message: string = // Your code here

console.log(message); // Hello, Alice! You are 30 years old.`,
      solution: `const name = "Alice";
const age = 30;

const message: string = \`Hello, \${name}! You are \${age} years old.\`;

console.log(message); // Hello, Alice! You are 30 years old.`,
      hints: [
        'Template literals use backticks and ${} for interpolation.',
        'Embed variables with ${variableName} inside backticks.',
        'const message: string = `Hello, ${name}! You are ${age} years old.`;',
      ],
      concepts: ['template literals', 'string interpolation'],
    },
    {
      id: 'ts-types-13',
      title: 'String methods with types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that takes a string and returns it uppercased and trimmed.',
      skeleton: `function cleanUp(input: string): string {
  // Your code here
}

console.log(cleanUp("  hello  ")); // "HELLO"`,
      solution: `function cleanUp(input: string): string {
  return input.trim().toUpperCase();
}

console.log(cleanUp("  hello  ")); // "HELLO"`,
      hints: [
        'Strings have trim() and toUpperCase() methods.',
        'Chain the methods: first trim, then toUpperCase.',
        'return input.trim().toUpperCase();',
      ],
      concepts: ['string methods', 'trim', 'toUpperCase'],
    },
    {
      id: 'ts-types-14',
      title: 'Number methods',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that takes a number and returns it formatted to 2 decimal places as a string.',
      skeleton: `function formatPrice(amount: number): string {
  // Your code here
}

console.log(formatPrice(9.1));    // "9.10"
console.log(formatPrice(10));     // "10.00"`,
      solution: `function formatPrice(amount: number): string {
  return amount.toFixed(2);
}

console.log(formatPrice(9.1));    // "9.10"
console.log(formatPrice(10));     // "10.00"`,
      hints: [
        'Numbers have a method that formats to a fixed number of decimal places.',
        'Use toFixed(n) which returns a string.',
        'return amount.toFixed(2);',
      ],
      concepts: ['toFixed', 'number methods', 'string conversion'],
    },
    {
      id: 'ts-types-15',
      title: 'Infinity and checking',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fill in the check that detects if a value is finite.',
      skeleton: `const value = 1 / 0;
console.log(value); // Infinity

if (!__BLANK__(value)) {
  console.log("Not a finite number");
}`,
      solution: `const value = 1 / 0;
console.log(value); // Infinity

if (!isFinite(value)) {
  console.log("Not a finite number");
}`,
      hints: [
        'There is a built-in function to check if a number is finite.',
        'The function name is isFinite.',
        'The answer is: isFinite',
      ],
      concepts: ['Infinity', 'isFinite', 'number checks'],
    },
    {
      id: 'ts-types-16',
      title: 'bigint basics',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Create two bigint values and add them. Demonstrate that bigint can handle numbers beyond Number.MAX_SAFE_INTEGER.',
      skeleton: `// Create a bigint for 9007199254740992 (Number.MAX_SAFE_INTEGER + 1)
// and add 1n to it

const big: bigint = // Your code here
const result: bigint = // Your code here

console.log(result); // 9007199254740993n`,
      solution: `// Create a bigint for 9007199254740992 (Number.MAX_SAFE_INTEGER + 1)
// and add 1n to it

const big: bigint = 9007199254740992n;
const result: bigint = big + 1n;

console.log(result); // 9007199254740993n`,
      hints: [
        'Append n to a numeric literal to make it a bigint.',
        'bigint arithmetic only works with other bigints.',
        'const big: bigint = 9007199254740992n; const result = big + 1n;',
      ],
      concepts: ['bigint', 'large integers', 'numeric precision'],
    },
    {
      id: 'ts-types-17',
      title: 'Symbol basics',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Create two symbols with the same description and show that they are not equal.',
      skeleton: `// Create two symbols with description "id"

const sym1 = // Your code here
const sym2 = // Your code here

console.log(sym1 === sym2); // false
console.log(typeof sym1);   // "symbol"`,
      solution: `// Create two symbols with description "id"

const sym1 = Symbol("id");
const sym2 = Symbol("id");

console.log(sym1 === sym2); // false
console.log(typeof sym1);   // "symbol"`,
      hints: [
        'Every Symbol() call creates a unique value.',
        'Even with the same description, two symbols are never equal.',
        'const sym1 = Symbol("id"); const sym2 = Symbol("id");',
      ],
      concepts: ['symbol', 'uniqueness', 'typeof'],
    },
    {
      id: 'ts-types-18',
      title: 'Type coercion awareness',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix the comparison so it correctly checks equality without type coercion.',
      skeleton: `function isZero(value: number | string): boolean {
  // Bug: using == allows type coercion
  if (value == 0) {
    return true;
  }
  return false;
}

console.log(isZero(0));    // true
console.log(isZero(""));   // should be false, but returns true with ==`,
      solution: `function isZero(value: number | string): boolean {
  if (value === 0) {
    return true;
  }
  return false;
}

console.log(isZero(0));    // true
console.log(isZero(""));   // false`,
      hints: [
        '== performs type coercion, === does not.',
        'With ==, empty string "" is coerced to 0.',
        'Change == to === for strict equality.',
      ],
      concepts: ['type coercion', 'strict equality', '=== vs =='],
    },
    {
      id: 'ts-types-19',
      title: 'Literal types',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this function to use literal types for the direction parameter instead of a generic string.',
      skeleton: `function move(direction: string): string {
  switch (direction) {
    case "up": return "Moving up";
    case "down": return "Moving down";
    case "left": return "Moving left";
    case "right": return "Moving right";
    default: return "Unknown direction";
  }
}

console.log(move("up"));`,
      solution: `function move(direction: "up" | "down" | "left" | "right"): string {
  switch (direction) {
    case "up": return "Moving up";
    case "down": return "Moving down";
    case "left": return "Moving left";
    case "right": return "Moving right";
  }
}

console.log(move("up"));`,
      hints: [
        'Literal types restrict a value to specific exact values.',
        'Use a union of string literals: "up" | "down" | "left" | "right".',
        'direction: "up" | "down" | "left" | "right" -- and you can remove the default case.',
      ],
      concepts: ['literal types', 'union types', 'exhaustive switch'],
    },
    {
      id: 'ts-types-20',
      title: 'Type narrowing with typeof',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this function to properly handle all branches without using any. Use type narrowing.',
      skeleton: `function describe(value: any): string {
  return "Value is: " + value;
}

console.log(describe(42));
console.log(describe("hello"));
console.log(describe(true));`,
      solution: `function describe(value: string | number | boolean): string {
  if (typeof value === "number") {
    return "Number: " + value.toFixed(2);
  } else if (typeof value === "string") {
    return "String: " + value.toUpperCase();
  } else {
    return "Boolean: " + String(value);
  }
}

console.log(describe(42));
console.log(describe("hello"));
console.log(describe(true));`,
      hints: [
        'Replace any with a union of the types you actually handle.',
        'Use typeof checks to narrow the type in each branch.',
        'string | number | boolean, then typeof checks for each.',
      ],
      concepts: ['type narrowing', 'union types', 'typeof', 'refactoring'],
    },
  ],
};
