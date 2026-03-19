import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-operators',
  title: '4. Operators & Expressions',
  explanation: `## Operators & Expressions

TypeScript inherits all JavaScript operators and adds type-safe behavior on top.

### Arithmetic Operators
\\\`+\\\`, \\\`-\\\`, \\\`*\\\`, \\\`/\\\`, \\\`%\\\` (remainder), \\\`**\\\` (exponentiation)

### Comparison Operators
\\\`===\\\` (strict equal), \\\`!==\\\` (strict not equal), \\\`<\\\`, \\\`>\\\`, \\\`<=\\\`, \\\`>=\\\`
Always prefer \\\`===\\\` over \\\`==\\\` to avoid type coercion.

### Logical Operators
\\\`&&\\\` (AND), \\\`||\\\` (OR), \\\`!\\\` (NOT)

### Nullish Coalescing (\\\`??\\\`)
Returns the right operand when the left is \\\`null\\\` or \\\`undefined\\\` (but NOT for other falsy values like \\\`0\\\` or \\\`""\\\`).

### Optional Chaining (\\\`?.\\\`)
Safely access deeply nested properties without throwing if an intermediate value is \\\`null\\\` or \\\`undefined\\\`.

### Other Operators
- **Ternary**: \\\`condition ? valueIfTrue : valueIfFalse\\\`
- **typeof**: returns a string describing the runtime type
- **instanceof**: checks prototype chain
- **in**: checks if a property exists on an object
- **Spread (\\\`...\\\`)**: expands iterables in expressions
- **Destructuring**: extracts values from arrays/objects
`,
  exercises: [
    {
      id: 'ts-op-1',
      title: 'Arithmetic basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the operator that gives the remainder of a division.',
      skeleton: `const remainder: number = 17 __BLANK__ 5;
console.log(remainder); // 2`,
      solution: `const remainder: number = 17 % 5;
console.log(remainder); // 2`,
      hints: [
        'Which operator gives the remainder?',
        'The modulo/remainder operator is %.',
        'The answer is: %',
      ],
      concepts: ['remainder', 'modulo', '%'],
    },
    {
      id: 'ts-op-2',
      title: 'Strict equality',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `console.log(5 === 5);
console.log(5 === "5");
console.log(null === undefined);`,
      solution: `true
false
false`,
      hints: [
        '=== checks type and value without coercion.',
        '5 and "5" have different types (number vs string).',
        'Output: true, false, false.',
      ],
      concepts: ['strict equality', '===', 'type comparison'],
    },
    {
      id: 'ts-op-3',
      title: 'Logical AND short-circuit',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `const a = 0 && "hello";
const b = 1 && "world";
console.log(a);
console.log(b);`,
      solution: `0
world`,
      hints: [
        '&& returns the first falsy value, or the last value if all are truthy.',
        '0 is falsy, so 0 && "hello" returns 0.',
        'Output: 0 then world.',
      ],
      concepts: ['logical AND', 'short-circuit evaluation', 'falsy values'],
    },
    {
      id: 'ts-op-4',
      title: 'Nullish coalescing',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use nullish coalescing to provide a default value when name is null or undefined.',
      skeleton: `const name: string | null = null;
const displayName: string = name __BLANK__ "Anonymous";
console.log(displayName); // "Anonymous"`,
      solution: `const name: string | null = null;
const displayName: string = name ?? "Anonymous";
console.log(displayName); // "Anonymous"`,
      hints: [
        'Which operator provides a default only for null/undefined?',
        'The nullish coalescing operator is ??.',
        'The answer is: ??',
      ],
      concepts: ['nullish coalescing', '??', 'null handling'],
    },
    {
      id: 'ts-op-5',
      title: 'Optional chaining',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use optional chaining to safely access the nested property.',
      skeleton: `const user: { address?: { city?: string } } = {};
const city: string | undefined = user__BLANK__address__BLANK__city;
console.log(city); // undefined`,
      solution: `const user: { address?: { city?: string } } = {};
const city: string | undefined = user?.address?.city;
console.log(city); // undefined`,
      hints: [
        'Optional chaining uses ?. to safely navigate.',
        'Replace . with ?. when the property might not exist.',
        'The answer is: ?. and ?.',
      ],
      concepts: ['optional chaining', '?.', 'safe navigation'],
    },
    {
      id: 'ts-op-6',
      title: 'Ternary operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use the ternary operator to assign "even" or "odd" based on the number.',
      skeleton: `const num = 7;
const parity: string = num % 2 === 0 __BLANK__ "even" __BLANK__ "odd";
console.log(parity); // "odd"`,
      solution: `const num = 7;
const parity: string = num % 2 === 0 ? "even" : "odd";
console.log(parity); // "odd"`,
      hints: [
        'The ternary operator has the form: condition ? a : b.',
        'Use ? for the true branch and : for the false branch.',
        'The answers are: ? and :',
      ],
      concepts: ['ternary operator', 'conditional expression'],
    },
    {
      id: 'ts-op-7',
      title: 'typeof in expressions',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a function that returns the typeof its argument as a string.',
      skeleton: `function getType(value: unknown): string {
  // Return the typeof the value
}

console.log(getType(42));        // "number"
console.log(getType("hello"));   // "string"
console.log(getType(true));      // "boolean"`,
      solution: `function getType(value: unknown): string {
  return typeof value;
}

console.log(getType(42));        // "number"
console.log(getType("hello"));   // "string"
console.log(getType(true));      // "boolean"`,
      hints: [
        'typeof returns a string describing the type.',
        'Just return typeof value.',
        'return typeof value;',
      ],
      concepts: ['typeof', 'runtime type', 'unknown'],
    },
    {
      id: 'ts-op-8',
      title: 'instanceof check',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that checks if a value is an instance of Date and returns its ISO string, or "not a date" otherwise.',
      skeleton: `function describeDate(value: unknown): string {
  // Your code here
}

console.log(describeDate(new Date("2025-01-01"))); // "2025-01-01T00:00:00.000Z"
console.log(describeDate("not a date"));            // "not a date"`,
      solution: `function describeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return "not a date";
}

console.log(describeDate(new Date("2025-01-01"))); // "2025-01-01T00:00:00.000Z"
console.log(describeDate("not a date"));            // "not a date"`,
      hints: [
        'Use instanceof to check if a value is an instance of a class.',
        'if (value instanceof Date) narrows the type to Date.',
        'if (value instanceof Date) { return value.toISOString(); }',
      ],
      concepts: ['instanceof', 'type narrowing', 'Date'],
    },
    {
      id: 'ts-op-9',
      title: 'in operator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that checks if an object has a "name" property using the in operator.',
      skeleton: `function hasName(obj: object): boolean {
  // Your code here
}

console.log(hasName({ name: "Alice" }));  // true
console.log(hasName({ age: 30 }));        // false`,
      solution: `function hasName(obj: object): boolean {
  return "name" in obj;
}

console.log(hasName({ name: "Alice" }));  // true
console.log(hasName({ age: 30 }));        // false`,
      hints: [
        'The in operator checks if a property exists on an object.',
        '"property" in object returns a boolean.',
        'return "name" in obj;',
      ],
      concepts: ['in operator', 'property check'],
    },
    {
      id: 'ts-op-10',
      title: 'Assignment operators',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `let x = 10;
x += 5;
x -= 3;
x *= 2;
console.log(x);`,
      solution: `24`,
      hints: [
        'Evaluate each assignment step by step.',
        'x starts at 10, +5 = 15, -3 = 12, *2 = 24.',
        'Output: 24',
      ],
      concepts: ['assignment operators', '+=', '-=', '*='],
    },
    {
      id: 'ts-op-11',
      title: 'Nullish vs OR',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What is the difference in output between ?? and ||?',
      skeleton: `const a = 0 ?? "default";
const b = 0 || "default";
const c = "" ?? "default";
const d = "" || "default";
console.log(a, b, c, d);`,
      solution: `0 default  default`,
      hints: [
        '?? only triggers on null/undefined. || triggers on any falsy value.',
        '0 is falsy but not null/undefined. "" is falsy but not null/undefined.',
        'Output: 0 default (empty string) default.',
      ],
      concepts: ['nullish coalescing', 'logical OR', 'falsy values'],
    },
    {
      id: 'ts-op-12',
      title: 'Spread in expressions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use the spread operator to merge two objects, with the second object overriding shared properties.',
      skeleton: `function mergeDefaults(
  defaults: { color: string; size: number },
  overrides: { color?: string; size?: number }
): { color: string; size: number } {
  // Your code here
}

console.log(mergeDefaults({ color: "red", size: 10 }, { size: 20 }));
// { color: "red", size: 20 }`,
      solution: `function mergeDefaults(
  defaults: { color: string; size: number },
  overrides: { color?: string; size?: number }
): { color: string; size: number } {
  return { ...defaults, ...overrides };
}

console.log(mergeDefaults({ color: "red", size: 10 }, { size: 20 }));
// { color: "red", size: 20 }`,
      hints: [
        'Spread operator copies properties from objects.',
        'Later spreads override earlier ones for shared keys.',
        'return { ...defaults, ...overrides };',
      ],
      concepts: ['spread operator', 'object merge', '...'],
    },
    {
      id: 'ts-op-13',
      title: 'Destructuring in expressions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use destructuring assignment to extract x and y from a point object and return their distance from origin.',
      skeleton: `function distanceFromOrigin(point: { x: number; y: number }): number {
  // Destructure and compute sqrt(x^2 + y^2)
}

console.log(distanceFromOrigin({ x: 3, y: 4 })); // 5`,
      solution: `function distanceFromOrigin(point: { x: number; y: number }): number {
  const { x, y } = point;
  return Math.sqrt(x ** 2 + y ** 2);
}

console.log(distanceFromOrigin({ x: 3, y: 4 })); // 5`,
      hints: [
        'Destructure point into x and y variables.',
        'Use Math.sqrt and the ** operator for exponentiation.',
        'const { x, y } = point; return Math.sqrt(x ** 2 + y ** 2);',
      ],
      concepts: ['destructuring', 'exponentiation', 'Math.sqrt'],
    },
    {
      id: 'ts-op-14',
      title: 'Exponentiation operator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use the exponentiation operator to compute 2 to the power of 10.',
      skeleton: `const result: number = 2 __BLANK__ 10;
console.log(result); // 1024`,
      solution: `const result: number = 2 ** 10;
console.log(result); // 1024`,
      hints: [
        'TypeScript has an exponentiation operator.',
        'It uses double asterisk.',
        'The answer is: **',
      ],
      concepts: ['exponentiation', '**', 'Math.pow alternative'],
    },
    {
      id: 'ts-op-15',
      title: 'Fix optional chaining bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This code crashes when user is null. Fix it using optional chaining and nullish coalescing.',
      skeleton: `interface User {
  profile: {
    email: string;
  };
}

function getEmail(user: User | null): string {
  return user.profile.email;
}

console.log(getEmail(null)); // should return "no email"`,
      solution: `interface User {
  profile: {
    email: string;
  };
}

function getEmail(user: User | null): string {
  return user?.profile?.email ?? "no email";
}

console.log(getEmail(null)); // should return "no email"`,
      hints: [
        'Accessing properties on null throws an error.',
        'Use ?. to safely navigate and ?? to provide a default.',
        'return user?.profile?.email ?? "no email";',
      ],
      concepts: ['optional chaining', 'nullish coalescing', 'null safety'],
    },
    {
      id: 'ts-op-16',
      title: 'Logical assignment operators',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Use the logical nullish assignment (??=) to set default values on a config object.',
      skeleton: `function applyDefaults(config: { host?: string; port?: number }): { host: string; port: number } {
  // Use ??= to set defaults: host = "localhost", port = 3000
  // Return the config with all values guaranteed
}

console.log(applyDefaults({}));                      // { host: "localhost", port: 3000 }
console.log(applyDefaults({ host: "example.com" })); // { host: "example.com", port: 3000 }`,
      solution: `function applyDefaults(config: { host?: string; port?: number }): { host: string; port: number } {
  config.host ??= "localhost";
  config.port ??= 3000;
  return config as { host: string; port: number };
}

console.log(applyDefaults({}));                      // { host: "localhost", port: 3000 }
console.log(applyDefaults({ host: "example.com" })); // { host: "example.com", port: 3000 }`,
      hints: [
        '??= assigns the right side only if the left side is null/undefined.',
        'config.host ??= "localhost" sets host only if it is undefined.',
        'config.host ??= "localhost"; config.port ??= 3000;',
      ],
      concepts: ['logical nullish assignment', '??=', 'default values'],
    },
    {
      id: 'ts-op-17',
      title: 'Chained optional access',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function that safely gets the first tag from a deeply nested optional structure.',
      skeleton: `interface Article {
  meta?: {
    tags?: string[];
  };
}

function getFirstTag(article: Article): string {
  // Return the first tag, or "untagged" if not available
}

console.log(getFirstTag({ meta: { tags: ["ts", "js"] } })); // "ts"
console.log(getFirstTag({ meta: {} }));                       // "untagged"
console.log(getFirstTag({}));                                 // "untagged"`,
      solution: `interface Article {
  meta?: {
    tags?: string[];
  };
}

function getFirstTag(article: Article): string {
  return article.meta?.tags?.[0] ?? "untagged";
}

console.log(getFirstTag({ meta: { tags: ["ts", "js"] } })); // "ts"
console.log(getFirstTag({ meta: {} }));                       // "untagged"
console.log(getFirstTag({}));                                 // "untagged"`,
      hints: [
        'You can use ?. for property access and ?.[] for index access.',
        'Chain optional access: article.meta?.tags?.[0].',
        'return article.meta?.tags?.[0] ?? "untagged";',
      ],
      concepts: ['optional chaining', 'index access', 'nullish coalescing'],
    },
    {
      id: 'ts-op-18',
      title: 'Bitwise basics',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `const a = 5 & 3;   // AND
const b = 5 | 3;   // OR
const c = 5 ^ 3;   // XOR
console.log(a, b, c);`,
      solution: `1 7 6`,
      hints: [
        '5 is 101 in binary, 3 is 011.',
        'AND: 101 & 011 = 001 (1). OR: 101 | 011 = 111 (7). XOR: 101 ^ 011 = 110 (6).',
        'Output: 1 7 6',
      ],
      concepts: ['bitwise AND', 'bitwise OR', 'bitwise XOR'],
    },
    {
      id: 'ts-op-19',
      title: 'Fix operator precedence',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix the operator precedence issue. The function should return true only if the value is between min and max (inclusive).',
      skeleton: `function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max || value === min;
}

console.log(inRange(5, 1, 10));  // true
console.log(inRange(0, 1, 10));  // should be false
console.log(inRange(15, 1, 10)); // should be false`,
      solution: `function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

console.log(inRange(5, 1, 10));  // true
console.log(inRange(0, 1, 10));  // false
console.log(inRange(15, 1, 10)); // false`,
      hints: [
        'The || value === min clause is redundant and causes bugs.',
        'value >= min already covers the case where value equals min.',
        'Remove the || value === min part entirely.',
      ],
      concepts: ['operator precedence', 'logical operators', 'range check'],
    },
    {
      id: 'ts-op-20',
      title: 'Refactor verbose conditions',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this verbose code to use optional chaining, nullish coalescing, and ternary operators for conciseness.',
      skeleton: `interface Config {
  theme?: {
    primary?: string;
    dark?: boolean;
  };
}

function getThemeClass(config: Config): string {
  let primary: string;
  if (config.theme !== null && config.theme !== undefined) {
    if (config.theme.primary !== null && config.theme.primary !== undefined) {
      primary = config.theme.primary;
    } else {
      primary = "blue";
    }
  } else {
    primary = "blue";
  }

  let mode: string;
  if (config.theme !== null && config.theme !== undefined) {
    if (config.theme.dark === true) {
      mode = "dark";
    } else {
      mode = "light";
    }
  } else {
    mode = "light";
  }

  return primary + "-" + mode;
}

console.log(getThemeClass({}));                                    // "blue-light"
console.log(getThemeClass({ theme: { primary: "red", dark: true } })); // "red-dark"`,
      solution: `interface Config {
  theme?: {
    primary?: string;
    dark?: boolean;
  };
}

function getThemeClass(config: Config): string {
  const primary = config.theme?.primary ?? "blue";
  const mode = config.theme?.dark ? "dark" : "light";
  return primary + "-" + mode;
}

console.log(getThemeClass({}));                                    // "blue-light"
console.log(getThemeClass({ theme: { primary: "red", dark: true } })); // "red-dark"`,
      hints: [
        'Replace the nested null checks with optional chaining (?.).',
        'Replace the fallback logic with nullish coalescing (??) and ternary.',
        'const primary = config.theme?.primary ?? "blue"; const mode = config.theme?.dark ? "dark" : "light";',
      ],
      concepts: ['refactoring', 'optional chaining', 'nullish coalescing', 'ternary'],
    },
  ],
};
