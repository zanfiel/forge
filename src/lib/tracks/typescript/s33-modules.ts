import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-modules',
  title: '33. Modules & Imports',
  explanation: `## Modules & Imports

TypeScript uses ES modules as the standard module system. Every file with an \\\`import\\\` or \\\`export\\\` is treated as a module.

### Named Exports
Export specific values by name. Consumers import them by exact name (or rename with \\\`as\\\`).

### Default Exports
Each module can have one default export, imported with any name.

### Type-Only Imports
Use \\\`import type { ... }\\\` to import only types, which are erased at compile time. This helps with tree-shaking and avoids circular dependency issues.

### Dynamic Imports
Use \\\`import()\\\` as a function to load modules lazily at runtime. Returns a Promise.

### Re-exports & Barrel Files
Re-export from other modules to create a single entry point (barrel pattern with index.ts).

### Module Resolution
TypeScript resolves modules using \\\`node\\\`, \\\`bundler\\\`, or \\\`classic\\\` strategies. Configure with \\\`moduleResolution\\\` in tsconfig.json.

### Key Rules
- Each file is its own module scope.
- Avoid circular dependencies -- they cause runtime issues.
- Use \\\`isolatedModules\\\` for compatibility with single-file transpilers.
- Side-effect imports (\\\`import "./polyfill"\\\`) execute the module without binding names.
`,
  exercises: [
    {
      id: 'ts-modules-1',
      title: 'Named export',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Export the add function as a named export.',
      skeleton: `__BLANK__ function add(a: number, b: number): number {
  return a + b;
}`,
      solution: `export function add(a: number, b: number): number {
  return a + b;
}`,
      hints: [
        'Which keyword makes a function available to other modules?',
        'Place export before the function declaration.',
        'The answer is: export',
      ],
      concepts: ['named export', 'export keyword'],
    },
    {
      id: 'ts-modules-2',
      title: 'Named import',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Import the add function from the math module.',
      skeleton: `__BLANK__ { add } from "./math";

console.log(add(2, 3));`,
      solution: `import { add } from "./math";

console.log(add(2, 3));`,
      hints: [
        'Which keyword brings a named export into scope?',
        'Use import { name } from "path".',
        'The answer is: import',
      ],
      concepts: ['named import', 'import syntax'],
    },
    {
      id: 'ts-modules-3',
      title: 'Default export',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Export the Calculator class as the default export.',
      skeleton: `class Calculator {
  add(a: number, b: number): number { return a + b; }
}

__BLANK__ __BLANK__ Calculator;`,
      solution: `class Calculator {
  add(a: number, b: number): number { return a + b; }
}

export default Calculator;`,
      hints: [
        'Default exports use two keywords together.',
        'Use export default to set the default export.',
        'The answer is: export default',
      ],
      concepts: ['default export', 'class export'],
    },
    {
      id: 'ts-modules-4',
      title: 'Import default',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Import the default export from "./Calculator" and name it Calc.',
      skeleton: `__BLANK__ Calc from "./Calculator";

const c = new Calc();`,
      solution: `import Calc from "./Calculator";

const c = new Calc();`,
      hints: [
        'Default imports do not use curly braces.',
        'import Name from "path" imports the default export.',
        'The answer is: import',
      ],
      concepts: ['default import', 'import syntax'],
    },
    {
      id: 'ts-modules-5',
      title: 'Predict re-export',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Given these files, what is available when importing from index.ts?',
      skeleton: `// math.ts
export const PI = 3.14;
export function add(a: number, b: number) { return a + b; }

// utils.ts
export function capitalize(s: string) { return s[0].toUpperCase() + s.slice(1); }

// index.ts (barrel)
export { PI, add } from "./math";
export { capitalize } from "./utils";

// consumer.ts
import { PI, add, capitalize } from "./index";
console.log(typeof PI, typeof add, typeof capitalize);`,
      solution: `number function function`,
      hints: [
        'Re-exports make everything available through the barrel file.',
        'PI is a number, add and capitalize are functions.',
        'Output is: number function function',
      ],
      concepts: ['re-export', 'barrel file', 'typeof'],
    },
    {
      id: 'ts-modules-6',
      title: 'Namespace import',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Import all exports from "./math" as a namespace called MathUtils.',
      skeleton: `import __BLANK__ as MathUtils from "./math";

console.log(MathUtils.add(1, 2));`,
      solution: `import * as MathUtils from "./math";

console.log(MathUtils.add(1, 2));`,
      hints: [
        'To import everything as a namespace, use * as Name.',
        'import * as Name from "path" creates a namespace object.',
        'The answer is: *',
      ],
      concepts: ['namespace import', 'import * as'],
    },
    {
      id: 'ts-modules-7',
      title: 'Type-only import',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Import only the User type (not the runtime value) from the users module.',
      skeleton: `import __BLANK__ { User } from "./users";

function greet(user: User): string {
  return "Hello, " + user.name;
}`,
      solution: `import type { User } from "./users";

function greet(user: User): string {
  return "Hello, " + user.name;
}`,
      hints: [
        'Type-only imports are erased at compile time.',
        'Use import type { ... } to import only the type.',
        'The answer is: type',
      ],
      concepts: ['import type', 'type-only import', 'type erasure'],
    },
    {
      id: 'ts-modules-8',
      title: 'Dynamic import',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that lazily loads the "./heavy-module" only when needed, using dynamic import().',
      skeleton: `async function loadHeavyModule(): Promise<void> {
  // Dynamically import "./heavy-module" and call its process() function
}`,
      solution: `async function loadHeavyModule(): Promise<void> {
  const mod = await import("./heavy-module");
  mod.process();
}`,
      hints: [
        'import() can be used as a function that returns a Promise.',
        'Await the import() call to get the module object.',
        'const mod = await import("./heavy-module"); mod.process();',
      ],
      concepts: ['dynamic import', 'lazy loading', 'code splitting'],
    },
    {
      id: 'ts-modules-9',
      title: 'Re-export with rename',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a barrel file that re-exports add from math.ts renamed as sum, and subtract renamed as minus.',
      skeleton: `// Write re-exports that rename:
// add -> sum
// subtract -> minus
// from "./math"
`,
      solution: `export { add as sum, subtract as minus } from "./math";`,
      hints: [
        'Re-exports can rename using the as keyword.',
        'export { original as renamed } from "path".',
        'export { add as sum, subtract as minus } from "./math";',
      ],
      concepts: ['re-export', 'rename', 'as keyword'],
    },
    {
      id: 'ts-modules-10',
      title: 'Side-effect import',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What does the side-effect import do?',
      skeleton: `// polyfill.ts
console.log("polyfill loaded");

// main.ts
import "./polyfill";
console.log("main");`,
      solution: `polyfill loaded
main`,
      hints: [
        'A bare import (no bindings) just executes the module.',
        'The module code runs when imported, then main continues.',
        'Output is: polyfill loaded, then main',
      ],
      concepts: ['side-effect import', 'module execution'],
    },
    {
      id: 'ts-modules-11',
      title: 'Export type separately',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a module that exports a type and a value with the same name pattern, using export type for the type.',
      skeleton: `// Define an interface Config and a function createConfig
// Export the type with 'export type' and the function with 'export'
`,
      solution: `export interface Config {
  host: string;
  port: number;
}

export function createConfig(host: string, port: number): Config {
  return { host, port };
}`,
      hints: [
        'Interfaces are always type-only, so export interface is fine.',
        'The function is a runtime value and needs a regular export.',
        'export interface Config { ... } and export function createConfig(...) { ... }',
      ],
      concepts: ['export type', 'export interface', 'type vs value'],
    },
    {
      id: 'ts-modules-12',
      title: 'Fix: circular dependency',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'These two modules have a circular dependency at the value level. Fix it by using import type for the type-only usage.',
      skeleton: `// user.ts
import { Post } from "./post";
export interface User {
  name: string;
  posts: Post[];
}
export function createUser(name: string): User {
  return { name, posts: [] };
}

// post.ts
import { User } from "./user";
export interface Post {
  title: string;
  author: User;
}
export function createPost(title: string, author: User): Post {
  return { title, author };
}`,
      solution: `// user.ts
import type { Post } from "./post";
export interface User {
  name: string;
  posts: Post[];
}
export function createUser(name: string): User {
  return { name, posts: [] };
}

// post.ts
import type { User } from "./user";
export interface Post {
  title: string;
  author: User;
}
export function createPost(title: string, author: User): Post {
  return { title, author };
}`,
      hints: [
        'When you only need a type from another module, use import type.',
        'Type-only imports are erased at compile time, breaking the circular dependency.',
        'Change import { Post } to import type { Post } and import { User } to import type { User }.',
      ],
      concepts: ['circular dependency', 'import type', 'type erasure'],
    },
    {
      id: 'ts-modules-13',
      title: 'Conditional dynamic import',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that dynamically imports either "./light-theme" or "./dark-theme" based on a parameter.',
      skeleton: `async function loadTheme(dark: boolean): Promise<{ colors: Record<string, string> }> {
  // Dynamically import the correct theme module
}`,
      solution: `async function loadTheme(dark: boolean): Promise<{ colors: Record<string, string> }> {
  if (dark) {
    return import("./dark-theme");
  }
  return import("./light-theme");
}`,
      hints: [
        'Use an if/else with dynamic import() for each path.',
        'import() returns a Promise of the module.',
        'if (dark) return import("./dark-theme"); else return import("./light-theme");',
      ],
      concepts: ['conditional import', 'dynamic import', 'lazy loading'],
    },
    {
      id: 'ts-modules-14',
      title: 'Module augmentation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Augment the existing Array interface in the global scope to add a last() method declaration.',
      skeleton: `// Augment the global Array interface to add a last<T>(): T | undefined method
`,
      solution: `declare global {
  interface Array<T> {
    last(): T | undefined;
  }
}

Array.prototype.last = function <T>(this: T[]): T | undefined {
  return this[this.length - 1];
};

export {};`,
      hints: [
        'Use declare global { } to augment global types.',
        'Add the method signature to the Array<T> interface inside declare global.',
        'You need export {} at the end to make the file a module.',
      ],
      concepts: ['module augmentation', 'declare global', 'interface merging'],
    },
    {
      id: 'ts-modules-15',
      title: 'Fix: isolatedModules issue',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'With isolatedModules enabled, re-exporting a type without "type" causes an error. Fix it.',
      skeleton: `// types.ts
export interface User { name: string; }

// index.ts (isolatedModules: true)
export { User } from "./types";  // Error with isolatedModules`,
      solution: `// types.ts
export interface User { name: string; }

// index.ts (isolatedModules: true)
export type { User } from "./types";`,
      hints: [
        'isolatedModules requires type re-exports to use export type.',
        'The transpiler cannot determine if User is a type or value in isolation.',
        'Change export { User } to export type { User }.',
      ],
      concepts: ['isolatedModules', 'export type', 're-export'],
    },
    {
      id: 'ts-modules-16',
      title: 'Predict import order',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What is the order of console.log outputs?',
      skeleton: `// a.ts
console.log("A");
export const a = 1;

// b.ts
console.log("B");
export const b = 2;

// main.ts
console.log("start");
import { a } from "./a";
import { b } from "./b";
console.log("end", a, b);`,
      solution: `A
B
start
end 1 2`,
      hints: [
        'ES module imports are hoisted and executed before the importing module.',
        'Module a.ts runs first, then b.ts, then main.ts body.',
        'Output is: A, B, start, end 1 2',
      ],
      concepts: ['import hoisting', 'module execution order'],
    },
    {
      id: 'ts-modules-17',
      title: 'Write a barrel file',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a barrel index.ts that re-exports everything from user.ts, post.ts, and re-exports only the Config type from config.ts.',
      skeleton: `// Write the barrel file (index.ts)
// Re-export all from "./user" and "./post"
// Re-export only the Config type from "./config"
`,
      solution: `export * from "./user";
export * from "./post";
export type { Config } from "./config";`,
      hints: [
        'Use export * from "path" to re-export all named exports.',
        'Use export type { Name } to re-export only a type.',
        'export * from "./user"; export * from "./post"; export type { Config } from "./config";',
      ],
      concepts: ['barrel file', 'export *', 'export type'],
    },
    {
      id: 'ts-modules-18',
      title: 'Import with alias',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Import add from "./math" renamed as sum, and the default export as MathLib, in a single import statement.',
      skeleton: `// Write a single import that gets:
// - default export as MathLib
// - named export add renamed to sum
// from "./math"
`,
      solution: `import MathLib, { add as sum } from "./math";`,
      hints: [
        'You can combine default and named imports in one statement.',
        'import Default, { named as alias } from "path".',
        'import MathLib, { add as sum } from "./math";',
      ],
      concepts: ['combined import', 'rename import', 'default + named'],
    },
    {
      id: 'ts-modules-19',
      title: 'Refactor: split monolith',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this single file into a proper module structure by writing the import/export statements.',
      skeleton: `// monolith.ts -- split into user.ts, validator.ts, index.ts
interface User {
  name: string;
  email: string;
}

function validateEmail(email: string): boolean {
  return email.includes("@");
}

function createUser(name: string, email: string): User {
  if (!validateEmail(email)) throw new Error("Invalid email");
  return { name, email };
}`,
      solution: `// user.ts
import { validateEmail } from "./validator";

export interface User {
  name: string;
  email: string;
}

export function createUser(name: string, email: string): User {
  if (!validateEmail(email)) throw new Error("Invalid email");
  return { name, email };
}

// validator.ts
export function validateEmail(email: string): boolean {
  return email.includes("@");
}

// index.ts
export type { User } from "./user";
export { createUser } from "./user";
export { validateEmail } from "./validator";`,
      hints: [
        'Split by responsibility: User type and creation in user.ts, validation in validator.ts.',
        'Create a barrel index.ts that re-exports the public API.',
        'user.ts imports validateEmail from validator.ts. index.ts re-exports everything.',
      ],
      concepts: ['module splitting', 'separation of concerns', 'barrel file'],
    },
    {
      id: 'ts-modules-20',
      title: 'Refactor: inline to module',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor these global functions to use proper ES module exports and demonstrate the import.',
      skeleton: `// All in one file, no exports
function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

function formatCurrency(amount: number): string {
  return "$" + amount.toFixed(2);
}

function formatPercent(value: number): string {
  return (value * 100).toFixed(1) + "%";
}

// Usage in another file:
// formatDate(new Date());`,
      solution: `// formatters.ts
export function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

export function formatCurrency(amount: number): string {
  return "$" + amount.toFixed(2);
}

export function formatPercent(value: number): string {
  return (value * 100).toFixed(1) + "%";
}

// consumer.ts
import { formatDate, formatCurrency, formatPercent } from "./formatters";

console.log(formatDate(new Date()));
console.log(formatCurrency(42.5));
console.log(formatPercent(0.85));`,
      hints: [
        'Add export before each function declaration.',
        'In the consuming file, import the functions by name.',
        'export function formatDate(...) and import { formatDate } from "./formatters".',
      ],
      concepts: ['refactoring', 'ES modules', 'named exports'],
    },
  ],
};
