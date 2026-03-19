import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-namespaces',
  title: '34. Namespaces & Declaration Files',
  explanation: `## Namespaces & Declaration Files

Namespaces and declaration files are how TypeScript integrates with non-module code and provides type information for JavaScript libraries.

### Namespaces
The \\\`namespace\\\` keyword groups related code under a single name. While modules are preferred today, namespaces are still used in global scripts and legacy code.

### Declaration Files (.d.ts)
Declaration files provide type information for JavaScript code. They contain only type declarations (no runtime code).

### Ambient Declarations
Use \\\`declare\\\` to tell TypeScript about values that exist at runtime but are not defined in TypeScript (e.g., global variables, external libraries).

### Module Declarations
Use \\\`declare module "name"\\\` to provide types for untyped modules or to augment existing module types.

### DefinitelyTyped
The \\\`@types\\\` namespace on npm provides declaration files for thousands of JavaScript libraries.

### Key Rules
- Prefer ES modules over namespaces for new code.
- Use \\\`declare\\\` for ambient values that exist at runtime.
- \\\`.d.ts\\\` files can only contain declarations, not implementations.
- Configure \\\`typeRoots\\\` and \\\`types\\\` in tsconfig to control type resolution.
`,
  exercises: [
    {
      id: 'ts-namespaces-1',
      title: 'Basic namespace',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Declare a namespace called MathUtils containing an add function.',
      skeleton: `__BLANK__ MathUtils {
  export function add(a: number, b: number): number {
    return a + b;
  }
}

console.log(MathUtils.add(2, 3));`,
      solution: `namespace MathUtils {
  export function add(a: number, b: number): number {
    return a + b;
  }
}

console.log(MathUtils.add(2, 3));`,
      hints: [
        'Which keyword groups declarations under a single name?',
        'TypeScript uses the namespace keyword.',
        'The answer is: namespace',
      ],
      concepts: ['namespace', 'namespace declaration'],
    },
    {
      id: 'ts-namespaces-2',
      title: 'Namespace export',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Make the PI constant accessible outside the namespace.',
      skeleton: `namespace Constants {
  __BLANK__ const PI = 3.14159;
}

console.log(Constants.PI);`,
      solution: `namespace Constants {
  export const PI = 3.14159;
}

console.log(Constants.PI);`,
      hints: [
        'Members of a namespace are private by default.',
        'Use export to make them accessible from outside.',
        'The answer is: export',
      ],
      concepts: ['namespace export', 'visibility'],
    },
    {
      id: 'ts-namespaces-3',
      title: 'Declare a global variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Tell TypeScript about a global variable called API_KEY that exists at runtime.',
      skeleton: `__BLANK__ const API_KEY: string;

console.log(API_KEY);`,
      solution: `declare const API_KEY: string;

console.log(API_KEY);`,
      hints: [
        'Which keyword tells TypeScript about values that exist at runtime?',
        'Use declare for ambient declarations.',
        'The answer is: declare',
      ],
      concepts: ['declare', 'ambient declaration', 'global variable'],
    },
    {
      id: 'ts-namespaces-4',
      title: 'Predict namespace access',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `namespace App {
  export const version = "1.0";
  const internal = "secret";
}

console.log(App.version);
// console.log(App.internal); // Would this work?`,
      solution: `1.0`,
      hints: [
        'Only exported members are accessible outside the namespace.',
        'App.version is exported, so it works. App.internal is not exported.',
        'Output is: 1.0',
      ],
      concepts: ['namespace visibility', 'export', 'encapsulation'],
    },
    {
      id: 'ts-namespaces-5',
      title: 'Nested namespace',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create nested namespaces: App.Models with a User interface containing name and age.',
      skeleton: `// Create namespace App with nested namespace Models
// Models should export interface User { name: string; age: number; }
`,
      solution: `namespace App {
  export namespace Models {
    export interface User {
      name: string;
      age: number;
    }
  }
}

const user: App.Models.User = { name: "Alice", age: 30 };`,
      hints: [
        'Namespaces can be nested inside other namespaces.',
        'Both the outer and inner namespaces need export for access.',
        'namespace App { export namespace Models { export interface User { ... } } }',
      ],
      concepts: ['nested namespaces', 'namespace nesting'],
    },
    {
      id: 'ts-namespaces-6',
      title: 'Declare a module',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write an ambient module declaration for an untyped "config" module.',
      skeleton: `__BLANK__ __BLANK__ "config" {
  export const dbHost: string;
  export const dbPort: number;
}`,
      solution: `declare module "config" {
  export const dbHost: string;
  export const dbPort: number;
}`,
      hints: [
        'Ambient module declarations use declare module.',
        'The module name is a string that matches the import path.',
        'The answer is: declare module',
      ],
      concepts: ['declare module', 'ambient module'],
    },
    {
      id: 'ts-namespaces-7',
      title: 'Declaration file basics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a .d.ts declaration file for a JavaScript library that exports a greet function and a Config interface.',
      skeleton: `// Write the contents of greeting-lib.d.ts
// The library exports: greet(name: string): string
// And a Config interface with { locale: string; formal: boolean }
`,
      solution: `declare module "greeting-lib" {
  export function greet(name: string): string;
  export interface Config {
    locale: string;
    formal: boolean;
  }
}`,
      hints: [
        'Declaration files only contain type declarations, no implementations.',
        'Use declare module "name" { } to type an external module.',
        'declare module "greeting-lib" { export function greet(name: string): string; export interface Config { ... } }',
      ],
      concepts: ['.d.ts', 'declaration file', 'declare module'],
    },
    {
      id: 'ts-namespaces-8',
      title: 'Namespace merging',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Demonstrate namespace merging by declaring the same namespace twice with different exports.',
      skeleton: `// Declare namespace Validation with isEmail(email: string): boolean
// Then declare it again to add isPhone(phone: string): boolean
// Both should be accessible as Validation.isEmail and Validation.isPhone
`,
      solution: `namespace Validation {
  export function isEmail(email: string): boolean {
    return email.includes("@");
  }
}

namespace Validation {
  export function isPhone(phone: string): boolean {
    return /^\\d{10}$/.test(phone);
  }
}

console.log(Validation.isEmail("a@b.com"));
console.log(Validation.isPhone("1234567890"));`,
      hints: [
        'TypeScript merges multiple namespace declarations with the same name.',
        'Each declaration can add new exported members.',
        'Declare namespace Validation twice with different exports.',
      ],
      concepts: ['namespace merging', 'declaration merging'],
    },
    {
      id: 'ts-namespaces-9',
      title: 'Fix: missing declare',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This .d.ts file has implementations, which are not allowed. Fix it to be declarations only.',
      skeleton: `// types.d.ts
export function formatName(first: string, last: string): string {
  return first + " " + last;
}

export interface User {
  name: string;
}`,
      solution: `// types.d.ts
export function formatName(first: string, last: string): string;

export interface User {
  name: string;
}`,
      hints: [
        'Declaration files cannot contain function bodies.',
        'Remove the function body and replace with a semicolon.',
        'export function formatName(first: string, last: string): string;',
      ],
      concepts: ['declaration file', 'no implementation', '.d.ts rules'],
    },
    {
      id: 'ts-namespaces-10',
      title: 'Declare global',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Augment the global scope to add a custom property appVersion on the Window interface.',
      skeleton: `// Add appVersion: string to the global Window interface
`,
      solution: `declare global {
  interface Window {
    appVersion: string;
  }
}

export {};`,
      hints: [
        'Use declare global { } to augment global types.',
        'Extend the Window interface inside declare global.',
        'declare global { interface Window { appVersion: string; } } export {};',
      ],
      concepts: ['declare global', 'Window augmentation', 'global types'],
    },
    {
      id: 'ts-namespaces-11',
      title: 'Triple-slash directive',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Add a triple-slash reference directive to include types from "node".',
      skeleton: `__BLANK__

const buffer = Buffer.from("hello");`,
      solution: `/// <reference types="node" />

const buffer = Buffer.from("hello");`,
      hints: [
        'Triple-slash directives are special comments at the top of a file.',
        'The types directive references a @types package.',
        'The answer is: /// <reference types="node" />',
      ],
      concepts: ['triple-slash directive', 'reference types'],
    },
    {
      id: 'ts-namespaces-12',
      title: 'Ambient enum',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Declare an ambient enum Direction with values Up, Down, Left, Right for use in a .d.ts file.',
      skeleton: `// Write an ambient (declare) enum Direction with Up, Down, Left, Right
`,
      solution: `declare enum Direction {
  Up,
  Down,
  Left,
  Right,
}`,
      hints: [
        'Ambient enums use declare enum, just like other ambient declarations.',
        'No values are needed since this is a declaration only.',
        'declare enum Direction { Up, Down, Left, Right }',
      ],
      concepts: ['ambient enum', 'declare enum', 'declaration'],
    },
    {
      id: 'ts-namespaces-13',
      title: 'Predict namespace vs module',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Does this namespace code work in a module file (one with import/export)?',
      skeleton: `import { something } from "./other";

namespace MyApp {
  export const value = 42;
}

console.log(MyApp.value);`,
      solution: `42`,
      hints: [
        'Namespaces work inside modules -- they become local to the module.',
        'The namespace is scoped to this module, not global.',
        'Output is: 42',
      ],
      concepts: ['namespace in module', 'module scope'],
    },
    {
      id: 'ts-namespaces-14',
      title: 'Wildcard module declaration',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a module declaration that types all .css file imports as having a default export of Record<string, string>.',
      skeleton: `// Write a wildcard module declaration for "*.css" files
`,
      solution: `declare module "*.css" {
  const classes: Record<string, string>;
  export default classes;
}`,
      hints: [
        'Use a wildcard pattern in the module name string.',
        'declare module "*.css" { ... } matches all .css imports.',
        'declare module "*.css" { const classes: Record<string, string>; export default classes; }',
      ],
      concepts: ['wildcard module', 'CSS modules', 'declare module'],
    },
    {
      id: 'ts-namespaces-15',
      title: 'Module augmentation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Augment the "express" module to add a user property to the Request interface.',
      skeleton: `// Augment the express module to add user: { id: string; name: string } to Request
`,
      solution: `declare module "express" {
  interface Request {
    user?: {
      id: string;
      name: string;
    };
  }
}

export {};`,
      hints: [
        'Use declare module "express" to augment the express module.',
        'Interface declarations inside will merge with existing interfaces.',
        'declare module "express" { interface Request { user?: { id: string; name: string }; } }',
      ],
      concepts: ['module augmentation', 'interface merging', 'express types'],
    },
    {
      id: 'ts-namespaces-16',
      title: 'Fix: declaration merging conflict',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This code tries to merge a namespace with an interface but fails because the types conflict. Fix it.',
      skeleton: `interface Box {
  height: number;
  width: number;
}

interface Box {
  height: string;  // Error: conflicting type with first declaration
  depth: number;
}`,
      solution: `interface Box {
  height: number;
  width: number;
}

interface Box {
  height: number;
  depth: number;
}`,
      hints: [
        'When merging interfaces, duplicate properties must have identical types.',
        'height is number in the first declaration, so it must be number in the second.',
        'Change height: string to height: number in the second declaration.',
      ],
      concepts: ['declaration merging', 'interface merging conflict'],
    },
    {
      id: 'ts-namespaces-17',
      title: 'Declare function overloads',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write ambient function declarations with overloads for a format function that accepts string or number.',
      skeleton: `// Declare (ambient) function format with two overloads:
// format(value: string): string
// format(value: number, decimals: number): string
`,
      solution: `declare function format(value: string): string;
declare function format(value: number, decimals: number): string;`,
      hints: [
        'Ambient function declarations use declare function.',
        'Write each overload as a separate declare function statement.',
        'declare function format(value: string): string; declare function format(value: number, decimals: number): string;',
      ],
      concepts: ['ambient overloads', 'declare function', 'function overloading'],
    },
    {
      id: 'ts-namespaces-18',
      title: 'Predict typeRoots behavior',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Given this tsconfig, which @types packages are included?',
      skeleton: `// tsconfig.json
// { "compilerOptions": { "types": ["node", "jest"] } }
//
// node_modules/@types/ contains: node, jest, lodash, express
//
// Which type packages are included?`,
      solution: `node and jest only`,
      hints: [
        'The "types" option in tsconfig restricts which @types packages are included.',
        'When "types" is specified, only the listed packages are included.',
        'Only @types/node and @types/jest are included. lodash and express are excluded.',
      ],
      concepts: ['typeRoots', 'types config', 'tsconfig'],
    },
    {
      id: 'ts-namespaces-19',
      title: 'Refactor: namespace to module',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this namespace-based code to use ES modules.',
      skeleton: `namespace StringUtils {
  export function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  export function lowercase(s: string): string {
    return s.toLowerCase();
  }

  export function reverse(s: string): string {
    return s.split("").reverse().join("");
  }
}

const result = StringUtils.capitalize("hello");`,
      solution: `// string-utils.ts
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function lowercase(s: string): string {
  return s.toLowerCase();
}

export function reverse(s: string): string {
  return s.split("").reverse().join("");
}

// consumer.ts
import { capitalize } from "./string-utils";

const result = capitalize("hello");`,
      hints: [
        'Replace the namespace wrapper with individual exports.',
        'Each function becomes a named export in its own module file.',
        'Remove the namespace, add export to each function, import by name in consumer.',
      ],
      concepts: ['namespace to module', 'refactoring', 'ES modules'],
    },
    {
      id: 'ts-namespaces-20',
      title: 'Refactor: global to declare global',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor these scattered type assertions into proper global type declarations.',
      skeleton: `// Various files use: (window as any).analytics.track("event")
// and: (window as any).featureFlags.isEnabled("newUI")

// Write proper declarations instead of using 'as any'
`,
      solution: `declare global {
  interface Window {
    analytics: {
      track(event: string, data?: Record<string, unknown>): void;
    };
    featureFlags: {
      isEnabled(flag: string): boolean;
    };
  }
}

export {};

// Now in any file:
// window.analytics.track("event");
// window.featureFlags.isEnabled("newUI");`,
      hints: [
        'Instead of casting with "as any", declare the types globally.',
        'Use declare global { interface Window { ... } } to add typed properties.',
        'Declare analytics and featureFlags on the Window interface with proper types.',
      ],
      concepts: ['declare global', 'type safety', 'refactoring', 'Window interface'],
    },
  ],
};
