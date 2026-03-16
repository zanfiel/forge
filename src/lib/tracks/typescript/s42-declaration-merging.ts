import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-merging',
  title: '42. Declaration Merging',
  explanation: `## Declaration Merging

Declaration merging is when the TypeScript compiler combines two or more separate declarations with the same name into a single definition.

### Interface Merging
Two interfaces with the same name automatically merge:
\\\`\\\`\\\`typescript
interface User { name: string; }
interface User { age: number; }
// Result: interface User { name: string; age: number; }
\\\`\\\`\\\`

### Namespace Merging
Namespaces with the same name merge their exported members.

### Namespace + Class/Function/Enum
You can augment classes, functions, and enums by merging a namespace with them.

### Module Augmentation
Use \\\`declare module\\\` to add types to existing modules:
\\\`\\\`\\\`typescript
declare module 'express' {
  interface Request {
    user?: { id: string };
  }
}
\\\`\\\`\\\`

### Global Augmentation
Use \\\`declare global\\\` inside a module to add global types.

### Rules
- Later interface declarations add to earlier ones.
- Non-function members must be unique or identical types.
- Function members are treated as overloads (later declarations have higher priority).
`,
  exercises: [
    {
      id: 'ts-merging-1',
      title: 'Basic interface merging',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the second interface declaration so that User has both name and email properties after merging.',
      skeleton: `interface User {
  name: string;
}

__BLANK__ {
  email: string;
}

const user: User = { name: "Zan", email: "zan@example.com" };`,
      solution: `interface User {
  name: string;
}

interface User {
  email: string;
}

const user: User = { name: "Zan", email: "zan@example.com" };`,
      hints: [
        'To merge interfaces, declare a second interface with the same name.',
        'Just use "interface User" again.',
        'The answer is: interface User',
      ],
      concepts: ['interface merging', 'declaration merging basics'],
    },
    {
      id: 'ts-merging-2',
      title: 'Predict: merged interface',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Does this code compile? Write "Compiles" or "Error".',
      skeleton: `interface Box {
  width: number;
}

interface Box {
  width: string;
}

const b: Box = { width: 10 };`,
      solution: `Error`,
      hints: [
        'When interfaces merge, non-function members with the same name must have identical types.',
        'width is declared as number in one and string in the other.',
        'This is a conflict: the same property cannot be both number and string.',
      ],
      concepts: ['interface merging', 'merging rules and conflicts'],
    },
    {
      id: 'ts-merging-3',
      title: 'Namespace merging',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the second namespace so that Validation has both isEmail and isPhone functions.',
      skeleton: `namespace Validation {
  export function isEmail(s: string): boolean {
    return s.includes('@');
  }
}

__BLANK__ {
  export function isPhone(s: string): boolean {
    return /^\\d{10}$/.test(s);
  }
}

Validation.isEmail("test@test.com");
Validation.isPhone("1234567890");`,
      solution: `namespace Validation {
  export function isEmail(s: string): boolean {
    return s.includes('@');
  }
}

namespace Validation {
  export function isPhone(s: string): boolean {
    return /^\\d{10}$/.test(s);
  }
}

Validation.isEmail("test@test.com");
Validation.isPhone("1234567890");`,
      hints: [
        'Namespaces merge the same way interfaces do -- re-declare with the same name.',
        'Use "namespace Validation" again.',
        'The answer is: namespace Validation',
      ],
      concepts: ['namespace merging', 'exported members'],
    },
    {
      id: 'ts-merging-4',
      title: 'Namespace + class merging',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add a static helper to the Color class by merging a namespace with it.',
      skeleton: `class Color {
  constructor(public r: number, public g: number, public b: number) {}
}

__BLANK__ Color {
  export function fromHex(hex: string): Color {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return new Color(r, g, b);
  }
}

const red = Color.fromHex("#ff0000");`,
      solution: `class Color {
  constructor(public r: number, public g: number, public b: number) {}
}

namespace Color {
  export function fromHex(hex: string): Color {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return new Color(r, g, b);
  }
}

const red = Color.fromHex("#ff0000");`,
      hints: [
        'A namespace can be merged with a class to add static-like members.',
        'Declare a namespace with the same name as the class.',
        'The answer is: namespace',
      ],
      concepts: ['namespace + class merging', 'static helpers'],
    },
    {
      id: 'ts-merging-5',
      title: 'Namespace + function merging',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add a "version" property to the greet function by merging a namespace with it.',
      skeleton: `function greet(name: string): string {
  return \\\`Hello, \${name}!\\\`;
}

__BLANK__ greet {
  export const version = "1.0.0";
}

console.log(greet("Zan"));
console.log(greet.version);`,
      solution: `function greet(name: string): string {
  return \\\`Hello, \${name}!\\\`;
}

namespace greet {
  export const version = "1.0.0";
}

console.log(greet("Zan"));
console.log(greet.version);`,
      hints: [
        'Functions are objects in JavaScript, so you can add properties to them.',
        'TypeScript models this with namespace + function merging.',
        'The answer is: namespace',
      ],
      concepts: ['namespace + function merging', 'function properties'],
    },
    {
      id: 'ts-merging-6',
      title: 'Namespace + enum merging',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add a helper function to the Direction enum via namespace merging.',
      skeleton: `enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

__BLANK__ Direction {
  export function isVertical(dir: Direction): boolean {
    return dir === Direction.Up || dir === Direction.Down;
  }
}

console.log(Direction.isVertical(Direction.Up));`,
      solution: `enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

namespace Direction {
  export function isVertical(dir: Direction): boolean {
    return dir === Direction.Up || dir === Direction.Down;
  }
}

console.log(Direction.isVertical(Direction.Up));`,
      hints: [
        'Namespaces can be merged with enums to add utility functions.',
        'Declare a namespace with the same name as the enum.',
        'The answer is: namespace',
      ],
      concepts: ['namespace + enum merging', 'enum utilities'],
    },
    {
      id: 'ts-merging-7',
      title: 'Module augmentation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a module augmentation that adds a "userId" property (string) to Express Request interface. Use declare module syntax.',
      skeleton: `// Augment the express Request interface
`,
      solution: `declare module 'express' {
  interface Request {
    userId?: string;
  }
}

export {};`,
      hints: [
        'Use declare module "express" to target the express module.',
        'Inside, redeclare the interface Request with the new property.',
        'The file must be a module (has an import or export) for the augmentation to work.',
      ],
      concepts: ['module augmentation', 'declare module', 'augmenting third-party types'],
    },
    {
      id: 'ts-merging-8',
      title: 'Global augmentation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a global augmentation that adds an "appVersion" property (string) to the Window interface.',
      skeleton: `// Write global augmentation for Window
`,
      solution: `declare global {
  interface Window {
    appVersion: string;
  }
}

export {};`,
      hints: [
        'Use "declare global" to add to global scope from within a module.',
        'Redeclare the Window interface inside the declare global block.',
        'The file must be a module, so add export {} if needed.',
      ],
      concepts: ['global augmentation', 'augment Window interface', 'declare global'],
    },
    {
      id: 'ts-merging-9',
      title: 'Fix: module augmentation not working',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix this module augmentation so it actually takes effect. The augmentation has no import/export so it is treated as a script, not a module.',
      skeleton: `declare module 'express' {
  interface Request {
    sessionId: string;
  }
}`,
      solution: `import type { Request } from 'express';

declare module 'express' {
  interface Request {
    sessionId: string;
  }
}

export {};`,
      hints: [
        'Module augmentations must appear in a module (a file with imports or exports).',
        'Without any import/export, the file is a script and declare module creates an ambient module.',
        'Add an import or export statement to make the file a module.',
      ],
      concepts: ['module augmentation', 'scripts vs modules', 'declare module patterns'],
    },
    {
      id: 'ts-merging-10',
      title: 'Augment process.env',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a global augmentation for NodeJS.ProcessEnv to include typed environment variables: DATABASE_URL (string), PORT (string), and NODE_ENV ("development" | "production" | "test").',
      skeleton: `// Write your augmentation here
`,
      solution: `declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PORT: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};`,
      hints: [
        'process.env types live in the NodeJS.ProcessEnv interface.',
        'Use declare global with a nested namespace NodeJS.',
        'NODE_ENV should be a union of literal string types.',
      ],
      concepts: ['augment process.env', 'global augmentation', 'namespace nesting'],
    },
    {
      id: 'ts-merging-11',
      title: 'Merging with generics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create two interface declarations for Container<T>: one with a "value" property of type T, and a second that adds a "metadata" property of type string. Show that the merged interface works.',
      skeleton: `// Write the merged interfaces and a usage example
`,
      solution: `interface Container<T> {
  value: T;
}

interface Container<T> {
  metadata: string;
}

const box: Container<number> = {
  value: 42,
  metadata: 'integer container',
};`,
      hints: [
        'Generic interfaces can merge as long as the type parameters match.',
        'Both declarations must use the same generic parameter name and position.',
        'Declare interface Container<T> twice with different properties.',
      ],
      concepts: ['merging with generics', 'interface merging', 'generic interfaces'],
    },
    {
      id: 'ts-merging-12',
      title: 'Predict: merging order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Given these merged interfaces with function overloads, which overload is called for doSomething("hello")? Write "first" or "second".',
      skeleton: `interface Handler {
  doSomething(x: number): number;
}

interface Handler {
  doSomething(x: string): string;
}

// When calling handler.doSomething("hello"),
// which overload matches: "first" (number) or "second" (string)?`,
      solution: `second`,
      hints: [
        'When interfaces merge, function overloads from later declarations appear first.',
        'The second interface declaration gets higher priority for overload resolution.',
        'doSomething(string) is from the second declaration, so it has priority and matches.',
      ],
      concepts: ['merging order matters', 'function overload resolution', 'declaration order'],
    },
    {
      id: 'ts-merging-13',
      title: 'Write: augment Array prototype type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a global augmentation that adds a "last" method (returning T | undefined) to the Array<T> interface.',
      skeleton: `// Write your augmentation here
`,
      solution: `declare global {
  interface Array<T> {
    last(): T | undefined;
  }
}

Array.prototype.last = function <T>(this: T[]): T | undefined {
  return this.length > 0 ? this[this.length - 1] : undefined;
};

export {};`,
      hints: [
        'Use declare global to augment the built-in Array interface.',
        'The Array interface is generic: Array<T>.',
        'Also provide the runtime implementation on Array.prototype.',
      ],
      concepts: ['augmenting Array prototype type', 'global augmentation', 'prototype extension'],
    },
    {
      id: 'ts-merging-14',
      title: 'Fix: conflicting merge',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the merging conflict where two libraries declare the same interface with incompatible property types.',
      skeleton: `// lib-a.d.ts declares:
interface AppConfig {
  debug: boolean;
  logLevel: number;
}

// lib-b.d.ts declares:
interface AppConfig {
  debug: boolean;
  logLevel: string; // Conflict! number vs string
}`,
      solution: `// lib-a.d.ts declares:
interface AppConfig {
  debug: boolean;
  logLevel: number | string;
}

// lib-b.d.ts declares:
interface AppConfig {
  debug: boolean;
  logLevel: number | string;
}`,
      hints: [
        'Non-function members with the same name must have identical types.',
        'Both declarations must agree on the type of logLevel.',
        'Change logLevel to a union type (number | string) in both declarations.',
      ],
      concepts: ['merging rules and conflicts', 'type compatibility', 'union resolution'],
    },
    {
      id: 'ts-merging-15',
      title: 'Ambient module declaration',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an ambient module declaration for a "config" module that has no types. It should export a default object with host (string) and port (number) properties.',
      skeleton: `// Write the ambient module declaration
`,
      solution: `declare module 'config' {
  const config: {
    host: string;
    port: number;
  };
  export default config;
}`,
      hints: [
        'Use declare module "moduleName" for ambient module declarations.',
        'This goes in a .d.ts file and provides types for untyped modules.',
        'Export default with the shape you expect the module to have.',
      ],
      concepts: ['ambient module augmentation', 'declare module patterns', 'type declarations'],
    },
    {
      id: 'ts-merging-16',
      title: 'Augment a third-party library',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a module augmentation for a hypothetical "lodash" module that adds a typed "deepClone" function accepting a generic parameter T and returning T.',
      skeleton: `// Write your module augmentation here
`,
      solution: `import _ from 'lodash';

declare module 'lodash' {
  interface LoDashStatic {
    deepClone<T>(value: T): T;
  }
}

export {};`,
      hints: [
        'Lodash exports its functions through the LoDashStatic interface.',
        'Use declare module "lodash" and augment the LoDashStatic interface.',
        'The deepClone method should be generic: deepClone<T>(value: T): T.',
      ],
      concepts: ['augmenting third-party types', 'module augmentation', 'generic methods'],
    },
    {
      id: 'ts-merging-17',
      title: 'Predict: anti-pattern detection',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Does this code compile? Write "Compiles" or "Error". A namespace tries to access private class members.',
      skeleton: `class Counter {
  private count = 0;
  increment() { this.count++; }
}

namespace Counter {
  export function getCount(c: Counter): number {
    return c.count;
  }
}`,
      solution: `Error`,
      hints: [
        'Namespace merging with a class does not grant access to private members.',
        'The "count" property is private and cannot be accessed outside the class.',
        'This is a declaration merging anti-pattern.',
      ],
      concepts: ['declaration merging anti-patterns', 'private access', 'namespace + class merging'],
    },
    {
      id: 'ts-merging-18',
      title: 'Practical: augment Express Response',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a complete module augmentation that adds a typed "sendSuccess" method to Express Response. It should accept a generic data parameter and return Response.',
      skeleton: `// Write the full augmentation
`,
      solution: `import type { Response } from 'express';

declare module 'express' {
  interface Response {
    sendSuccess<T>(data: T, message?: string): Response;
  }
}

export {};`,
      hints: [
        'Augment the Response interface inside declare module "express".',
        'The method should be generic to handle any data shape.',
        'Return Response to allow method chaining.',
      ],
      concepts: ['augmenting Express types', 'practical augmentation for libraries', 'generic methods'],
    },
    {
      id: 'ts-merging-19',
      title: 'Refactor: merge scattered types',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor these scattered type additions into a single well-organized interface with clear documentation.',
      skeleton: `interface ApiResponse {
  status: number;
}

interface ApiResponse {
  data: unknown;
}

interface ApiResponse {
  error?: string;
}

interface ApiResponse {
  timestamp: number;
}

interface ApiResponse {
  headers: Record<string, string>;
}`,
      solution: `interface ApiResponse {
  /** HTTP status code */
  status: number;
  /** Response payload */
  data: unknown;
  /** Error message, present when request failed */
  error?: string;
  /** Unix timestamp of the response */
  timestamp: number;
  /** Response headers */
  headers: Record<string, string>;
}`,
      hints: [
        'While interface merging works, scattering properties across many declarations hurts readability.',
        'Combine all properties into a single interface declaration.',
        'Add JSDoc comments to document each property clearly.',
      ],
      concepts: ['declaration merging anti-patterns', 'code organization', 'refactoring'],
    },
    {
      id: 'ts-merging-20',
      title: 'Refactor: safe library augmentation',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this unsafe augmentation pattern into a type-safe wrapper module instead of modifying the global prototype.',
      skeleton: `// Unsafe: modifying global String prototype type
declare global {
  interface String {
    toSlug(): string;
    truncate(len: number): string;
    isEmail(): boolean;
  }
}

String.prototype.toSlug = function() {
  return this.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};
String.prototype.truncate = function(len: number) {
  return this.length > len ? this.slice(0, len) + '...' : this.toString();
};
String.prototype.isEmail = function() {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(this.toString());
};

export {};`,
      solution: `export const StringUtils = {
  toSlug(input: string): string {
    return input.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  },

  truncate(input: string, len: number): string {
    return input.length > len ? input.slice(0, len) + '...' : input;
  },

  isEmail(input: string): boolean {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(input);
  },
};`,
      hints: [
        'Augmenting built-in prototypes is fragile and can conflict with other libraries.',
        'Create a utility module with standalone functions instead.',
        'Export a StringUtils object with the same methods that take a string parameter.',
      ],
      concepts: ['practical merging patterns', 'declaration merging anti-patterns', 'safe alternatives'],
    },
  ],
};
