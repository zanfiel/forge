import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-narrowing',
  title: '19. Type Narrowing',
  explanation: `## Type Narrowing

Type narrowing is how TypeScript refines a broad type into a more specific one within a code block. It is one of the most important concepts in TypeScript.

### typeof Guards
\\\`\\\`\\\`typescript
function process(x: string | number) {
  if (typeof x === "string") {
    x.toUpperCase(); // x is string here
  }
}
\\\`\\\`\\\`

### instanceof Guards
\\\`\\\`\\\`typescript
if (err instanceof Error) {
  err.message; // err is Error here
}
\\\`\\\`\\\`

### in Operator
\\\`\\\`\\\`typescript
if ("swim" in animal) {
  // animal has a swim property
}
\\\`\\\`\\\`

### Equality Narrowing
\\\`\\\`\\\`typescript
if (x === null) { /* x is null */ }
if (x !== undefined) { /* x is not undefined */ }
\\\`\\\`\\\`

### Truthiness Narrowing
\\\`\\\`\\\`typescript
if (value) { /* value is truthy (not null, undefined, 0, "", false) */ }
\\\`\\\`\\\`

### Custom Type Guards
\\\`\\\`\\\`typescript
function isString(x: unknown): x is string {
  return typeof x === "string";
}
\\\`\\\`\\\`

### Assertion Functions
\\\`\\\`\\\`typescript
function assertDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val == null) throw new Error("Value is null or undefined");
}
\\\`\\\`\\\`

### Control Flow Analysis
TypeScript tracks assignments and conditions to narrow types automatically through if/else chains, switch statements, and early returns.

### Exhaustive Narrowing
Use \\\`never\\\` in the default case to ensure all variants are handled:
\\\`\\\`\\\`typescript
const _exhaustive: never = unhandledCase;
\\\`\\\`\\\``,
  exercises: [
    // --- 1 ---
    {
      id: 'ts-narrowing-1',
      title: 'typeof guard',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use typeof to narrow a string | number union.',
      skeleton: `function double(value: string | number): string | number {
  if (__BLANK__) {
    return value.repeat(2);
  }
  return value * 2;
}`,
      solution: `function double(value: string | number): string | number {
  if (typeof value === "string") {
    return value.repeat(2);
  }
  return value * 2;
}`,
      hints: [
        'typeof returns a string like "string", "number", "boolean", etc.',
        'Check if typeof value equals "string" to narrow to string.',
        'typeof value === "string"',
      ],
      concepts: ['typeof guard'],
    },
    // --- 2 ---
    {
      id: 'ts-narrowing-2',
      title: 'instanceof guard',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use instanceof to narrow to a specific class.',
      skeleton: `class Dog {
  bark() { return "Woof!"; }
}
class Cat {
  meow() { return "Meow!"; }
}

function speak(animal: Dog | Cat): string {
  if (__BLANK__) {
    return animal.bark();
  }
  return animal.meow();
}`,
      solution: `class Dog {
  bark() { return "Woof!"; }
}
class Cat {
  meow() { return "Meow!"; }
}

function speak(animal: Dog | Cat): string {
  if (animal instanceof Dog) {
    return animal.bark();
  }
  return animal.meow();
}`,
      hints: [
        'instanceof checks if an object is an instance of a class.',
        'It narrows the type to that specific class.',
        'animal instanceof Dog',
      ],
      concepts: ['instanceof guard'],
    },
    // --- 3 ---
    {
      id: 'ts-narrowing-3',
      title: 'in operator guard',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use the in operator to narrow a union based on property existence.',
      skeleton: `type Bird = { fly(): void; layEggs(): void };
type Fish = { swim(): void; layEggs(): void };

function move(animal: Bird | Fish): string {
  if (__BLANK__) {
    animal.swim();
    return "Swimming";
  }
  animal.fly();
  return "Flying";
}`,
      solution: `type Bird = { fly(): void; layEggs(): void };
type Fish = { swim(): void; layEggs(): void };

function move(animal: Bird | Fish): string {
  if ("swim" in animal) {
    animal.swim();
    return "Swimming";
  }
  animal.fly();
  return "Flying";
}`,
      hints: [
        'The "in" operator checks if a property exists on an object.',
        'If "swim" is in animal, TypeScript narrows to Fish.',
        '"swim" in animal',
      ],
      concepts: ['in operator guard'],
    },
    // --- 4 ---
    {
      id: 'ts-narrowing-4',
      title: 'Equality narrowing',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use equality checks to narrow a nullable type.',
      skeleton: `function getLength(value: string | null | undefined): number {
  if (__BLANK__) {
    return 0;
  }
  return value.length;
}`,
      solution: `function getLength(value: string | null | undefined): number {
  if (value == null) {
    return 0;
  }
  return value.length;
}`,
      hints: [
        'You need to handle both null and undefined.',
        '== null checks for both null and undefined at once.',
        'value == null',
      ],
      concepts: ['equality narrowing', 'null checks'],
    },
    // --- 5 ---
    {
      id: 'ts-narrowing-5',
      title: 'Truthiness narrowing',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use truthiness to narrow out falsy values.',
      skeleton: `function printName(name: string | null | undefined): string {
  if (__BLANK__) {
    return name.toUpperCase();
  }
  return "Anonymous";
}`,
      solution: `function printName(name: string | null | undefined): string {
  if (name) {
    return name.toUpperCase();
  }
  return "Anonymous";
}`,
      hints: [
        'Truthy check filters out null, undefined, empty string, and 0.',
        'A simple if(name) narrows away null and undefined.',
        'name (truthiness check)',
      ],
      concepts: ['truthiness narrowing'],
    },
    // --- 6 ---
    {
      id: 'ts-narrowing-6',
      title: 'Discriminated union narrowing',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Narrow a discriminated union using the tag property.',
      skeleton: `type Success = { status: "success"; data: string };
type Failure = { status: "failure"; error: string };
type Result = Success | Failure;

function handle(result: Result): string {
  if (result.__BLANK__ === "success") {
    return result.data;
  }
  return result.error;
}`,
      solution: `type Success = { status: "success"; data: string };
type Failure = { status: "failure"; error: string };
type Result = Success | Failure;

function handle(result: Result): string {
  if (result.status === "success") {
    return result.data;
  }
  return result.error;
}`,
      hints: [
        'Check the discriminant property to narrow the union.',
        'The shared property that distinguishes variants is "status".',
        'status',
      ],
      concepts: ['discriminated union narrowing'],
    },
    // --- 7 ---
    {
      id: 'ts-narrowing-7',
      title: 'Custom type guard',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a custom type guard function to check if a value is a non-empty string.',
      skeleton: `function isNonEmptyString(value: unknown): value is string {
  // return true if value is a string with length > 0
}

function processInput(input: unknown): string {
  if (isNonEmptyString(input)) {
    return input.toUpperCase(); // input is string here
  }
  return "invalid";
}`,
      solution: `function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function processInput(input: unknown): string {
  if (isNonEmptyString(input)) {
    return input.toUpperCase();
  }
  return "invalid";
}`,
      hints: [
        'A type guard uses "value is Type" as the return type.',
        'Check typeof and length inside the function body.',
        'return typeof value === "string" && value.length > 0;',
      ],
      concepts: ['custom type guards', 'is keyword'],
    },
    // --- 8 ---
    {
      id: 'ts-narrowing-8',
      title: 'Assertion function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an assertion function that throws if a value is null or undefined.',
      skeleton: `function assertDefined<T>(
  value: T | null | undefined,
  message?: string
): asserts value is T {
  // throw if value is null or undefined
}

function processUser(name: string | null): string {
  assertDefined(name, "Name is required");
  return name.toUpperCase(); // name is string after assertion
}`,
      solution: `function assertDefined<T>(
  value: T | null | undefined,
  message?: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message ?? "Value is null or undefined");
  }
}

function processUser(name: string | null): string {
  assertDefined(name, "Name is required");
  return name.toUpperCase();
}`,
      hints: [
        'Assertion functions use "asserts value is Type" as the return type.',
        'If the function returns without throwing, TypeScript narrows the type.',
        'Throw an Error if value is null or undefined.',
      ],
      concepts: ['assertion functions', 'asserts keyword'],
    },
    // --- 9 ---
    {
      id: 'ts-narrowing-9',
      title: 'Control flow analysis',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict how TypeScript narrows types through control flow.',
      skeleton: `function example(x: string | number | boolean) {
  if (typeof x === "string") {
    // A: What is x here?
    console.log(x.toUpperCase());
    return;
  }
  // B: What is x here?
  if (typeof x === "number") {
    // C: What is x here?
    console.log(x.toFixed(2));
    return;
  }
  // D: What is x here?
  console.log(x);
}

example("hello");`,
      solution: `A: string. B: number | boolean. C: number. D: boolean. Output: HELLO`,
      hints: [
        'After the first if block with return, string is eliminated.',
        'After the second if block with return, number is also eliminated.',
        'At D, only boolean remains.',
      ],
      concepts: ['control flow analysis', 'type elimination'],
    },
    // --- 10 ---
    {
      id: 'ts-narrowing-10',
      title: 'Narrowing with switch',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use a switch statement to narrow a discriminated union.',
      skeleton: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "triangle"; base: number; height: number };

function area(shape: Shape): number {
  // use switch on shape.kind to calculate area
}`,
      solution: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "triangle"; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}`,
      hints: [
        'Switch narrows the type in each case block.',
        'In case "circle", shape is narrowed to { kind: "circle"; radius: number }.',
        'Handle all three cases to calculate each area formula.',
      ],
      concepts: ['narrowing with switch', 'discriminated unions'],
    },
    // --- 11 ---
    {
      id: 'ts-narrowing-11',
      title: 'Narrowing with if chains',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the narrowing logic so TypeScript correctly identifies the type in each branch.',
      skeleton: `type Value = string | number | boolean | null;

function describe(value: Value): string {
  if (value === null) {
    return "null";
  }
  if (typeof value === "string") {
    return \`string: "\${value}"\`;
  }
  if (typeof value === "boolean") {
    return \`bool: \${value}\`;
  }
  // Bug: TypeScript says value is string | number | boolean here
  return \`number: \${value.toFixed(2)}\`;
}`,
      solution: `type Value = string | number | boolean | null;

function describe(value: Value): string {
  if (value === null) {
    return "null";
  }
  if (typeof value === "string") {
    return \`string: "\${value}"\`;
  }
  if (typeof value === "boolean") {
    return \`bool: \${value}\`;
  }
  return \`number: \${value.toFixed(2)}\`;
}`,
      hints: [
        'This code is actually correct! Each if with return eliminates a type.',
        'After null, string, and boolean are eliminated, only number remains.',
        'TypeScript tracks early returns and narrows correctly.',
      ],
      concepts: ['narrowing with if chains', 'early returns'],
    },
    // --- 12 ---
    {
      id: 'ts-narrowing-12',
      title: 'Narrowing arrays',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that narrows an array of mixed types to only strings.',
      skeleton: `function onlyStrings(items: (string | number | boolean)[]): string[] {
  // use a type guard to filter only strings
}`,
      solution: `function onlyStrings(items: (string | number | boolean)[]): string[] {
  return items.filter((item): item is string => typeof item === "string");
}`,
      hints: [
        'Array.filter can use a type guard as its predicate.',
        'The predicate needs an explicit return type: item is string.',
        'items.filter((item): item is string => typeof item === "string")',
      ],
      concepts: ['narrowing arrays', 'filter with type guards'],
    },
    // --- 13 ---
    {
      id: 'ts-narrowing-13',
      title: 'Narrowing with never',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict what happens when a new variant is added to a union without updating the handler.',
      skeleton: `type Animal = "cat" | "dog" | "bird";

function sound(animal: Animal): string {
  switch (animal) {
    case "cat": return "Meow";
    case "dog": return "Woof";
    case "bird": return "Tweet";
    default: {
      const _never: never = animal;
      return _never;
    }
  }
}

// If we add "fish" to Animal but don't add a case:
// What error would TypeScript show?`,
      solution: `If "fish" is added to Animal without a case, TypeScript shows: "Type 'string' is not assignable to type 'never'" in the default branch, because "fish" is not handled and reaches the never assignment.`,
      hints: [
        'The never assignment catches unhandled cases at compile time.',
        'If a new variant reaches default, it cannot be assigned to never.',
        'TypeScript reports an error because "fish" is not assignable to never.',
      ],
      concepts: ['narrowing with never', 'exhaustive checking'],
    },
    // --- 14 ---
    {
      id: 'ts-narrowing-14',
      title: 'Type predicate functions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write type predicate functions for a complex object hierarchy.',
      skeleton: `interface BaseEvent {
  type: string;
  timestamp: number;
}

interface ClickEvent extends BaseEvent {
  type: "click";
  x: number;
  y: number;
}

interface KeyEvent extends BaseEvent {
  type: "keydown";
  key: string;
  code: string;
}

type AppEvent = ClickEvent | KeyEvent;

// Write type guard for ClickEvent
function isClickEvent(event: AppEvent): event is ClickEvent {
  // implement
}

// Write type guard for KeyEvent
function isKeyEvent(event: AppEvent): event is KeyEvent {
  // implement
}`,
      solution: `interface BaseEvent {
  type: string;
  timestamp: number;
}

interface ClickEvent extends BaseEvent {
  type: "click";
  x: number;
  y: number;
}

interface KeyEvent extends BaseEvent {
  type: "keydown";
  key: string;
  code: string;
}

type AppEvent = ClickEvent | KeyEvent;

function isClickEvent(event: AppEvent): event is ClickEvent {
  return event.type === "click";
}

function isKeyEvent(event: AppEvent): event is KeyEvent {
  return event.type === "keydown";
}`,
      hints: [
        'Use the discriminant property "type" to distinguish events.',
        'Return event.type === the expected literal value.',
        'isClickEvent checks type === "click"; isKeyEvent checks type === "keydown".',
      ],
      concepts: ['type predicate functions', 'event handling'],
    },
    // --- 15 ---
    {
      id: 'ts-narrowing-15',
      title: 'Narrowing with tagged types',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the narrowing that fails because the discriminant property is not a literal type.',
      skeleton: `// Bug: "type" is string, not a literal -- narrowing doesn't work
interface ApiError {
  type: string;
  message: string;
  code: number;
}

interface NetworkError {
  type: string;
  message: string;
  retryable: boolean;
}

type AppError = ApiError | NetworkError;

function handleError(error: AppError) {
  if (error.type === "api") {
    console.log(error.code); // Error: 'code' doesn't exist on NetworkError
  }
}`,
      solution: `interface ApiError {
  type: "api";
  message: string;
  code: number;
}

interface NetworkError {
  type: "network";
  message: string;
  retryable: boolean;
}

type AppError = ApiError | NetworkError;

function handleError(error: AppError) {
  if (error.type === "api") {
    console.log(error.code);
  }
}`,
      hints: [
        'Discriminated unions need literal types for the tag property.',
        'Change type: string to type: "api" and type: "network".',
        'Literal types in the discriminant enable TypeScript to narrow correctly.',
      ],
      concepts: ['narrowing with tagged types', 'literal discriminants'],
    },
    // --- 16 ---
    {
      id: 'ts-narrowing-16',
      title: 'Narrowing in loops',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function that processes mixed-type array items with proper narrowing in a loop.',
      skeleton: `type LogEntry =
  | { level: "info"; message: string }
  | { level: "warn"; message: string; source: string }
  | { level: "error"; message: string; stack: string; code: number };

function summarizeLogs(entries: LogEntry[]): {
  info: number;
  warnings: string[];
  errors: Array<{ code: number; message: string }>;
} {
  // loop through entries, narrow by level, collect into summary
}`,
      solution: `type LogEntry =
  | { level: "info"; message: string }
  | { level: "warn"; message: string; source: string }
  | { level: "error"; message: string; stack: string; code: number };

function summarizeLogs(entries: LogEntry[]): {
  info: number;
  warnings: string[];
  errors: Array<{ code: number; message: string }>;
} {
  let info = 0;
  const warnings: string[] = [];
  const errors: Array<{ code: number; message: string }> = [];

  for (const entry of entries) {
    switch (entry.level) {
      case "info":
        info++;
        break;
      case "warn":
        warnings.push(\`[\${entry.source}] \${entry.message}\`);
        break;
      case "error":
        errors.push({ code: entry.code, message: entry.message });
        break;
    }
  }

  return { info, warnings, errors };
}`,
      hints: [
        'Use a switch on entry.level inside the loop.',
        'TypeScript narrows the type in each case automatically.',
        'In case "error", you can access entry.code and entry.stack.',
      ],
      concepts: ['narrowing in loops', 'discriminated union in loop'],
    },
    // --- 17 ---
    {
      id: 'ts-narrowing-17',
      title: 'Narrowing with exceptions',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix the error handling to properly narrow the caught error type.',
      skeleton: `async function fetchData(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    // Bug: error is "unknown" in TypeScript strict mode
    console.error(error.message);
    throw error;
  }
}`,
      solution: `async function fetchData(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    }
    console.error(String(error));
    throw new Error(String(error));
  }
}`,
      hints: [
        'In strict mode, catch clause variables are typed as "unknown".',
        'You must narrow the error type before accessing properties.',
        'Use instanceof Error to narrow, then handle the non-Error case.',
      ],
      concepts: ['narrowing with exceptions', 'unknown type'],
    },
    // --- 18 ---
    {
      id: 'ts-narrowing-18',
      title: 'Narrowing object properties',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function that safely accesses deeply nested optional properties with proper narrowing.',
      skeleton: `interface Config {
  database?: {
    connection?: {
      host: string;
      port: number;
      ssl?: {
        cert: string;
        key: string;
      };
    };
  };
}

function getConnectionInfo(config: Config): string {
  // safely narrow through each level and return a connection string
  // return "host:port (SSL)" or "host:port" or "No database configured"
}`,
      solution: `interface Config {
  database?: {
    connection?: {
      host: string;
      port: number;
      ssl?: {
        cert: string;
        key: string;
      };
    };
  };
}

function getConnectionInfo(config: Config): string {
  if (!config.database) {
    return "No database configured";
  }
  if (!config.database.connection) {
    return "No database configured";
  }
  const { host, port, ssl } = config.database.connection;
  if (ssl) {
    return \`\${host}:\${port} (SSL)\`;
  }
  return \`\${host}:\${port}\`;
}`,
      hints: [
        'Narrow each optional level with null/undefined checks.',
        'After checking config.database and config.database.connection, they are defined.',
        'Destructure the connection and check for ssl to determine the format.',
      ],
      concepts: ['narrowing object properties', 'nested optional access'],
    },
    // --- 19 ---
    {
      id: 'ts-narrowing-19',
      title: 'Narrowing with template literals',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Predict how TypeScript narrows based on string patterns.',
      skeleton: `function handleRoute(path: string): string {
  if (path.startsWith("/api/")) {
    // Does TypeScript narrow "path" to a template literal type here?
    return \`API route: \${path}\`;
  }
  if (path === "/") {
    // What is the type of path here?
    return "Home";
  }
  return \`Page: \${path}\`;
}

console.log(handleRoute("/api/users"));
console.log(handleRoute("/"));
console.log(handleRoute("/about"));`,
      solution: `TypeScript does NOT narrow path to a template literal type with startsWith -- path remains "string" in all branches. The equality check path === "/" narrows to the literal "/" but only for the exact comparison. Output:
API route: /api/users
Home
Page: /about`,
      hints: [
        'startsWith does not narrow the type -- it is a runtime check only.',
        'Equality checks can narrow to literal types.',
        'TypeScript control flow narrows types but string methods do not produce template literal types.',
      ],
      concepts: ['narrowing with template literals', 'string method limitations'],
    },
    // --- 20 ---
    {
      id: 'ts-narrowing-20',
      title: 'Exhaustive narrowing patterns',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this function to use exhaustive narrowing with a helper function.',
      skeleton: `type Theme = "light" | "dark" | "system" | "contrast";

function getBackground(theme: Theme): string {
  if (theme === "light") return "#ffffff";
  if (theme === "dark") return "#1a1a1a";
  if (theme === "system") return "#f0f0f0";
  if (theme === "contrast") return "#000000";
  return "#ffffff"; // unreachable but needed for TS
}

// Problem: if we add a new theme, there is no compile error
// Refactor to use exhaustive narrowing`,
      solution: `type Theme = "light" | "dark" | "system" | "contrast";

function assertNever(value: never, message?: string): never {
  throw new Error(message ?? \`Unexpected value: \${value}\`);
}

function getBackground(theme: Theme): string {
  switch (theme) {
    case "light": return "#ffffff";
    case "dark": return "#1a1a1a";
    case "system": return "#f0f0f0";
    case "contrast": return "#000000";
    default: return assertNever(theme);
  }
}`,
      hints: [
        'Create an assertNever helper that takes a never parameter.',
        'Use a switch with a default case that calls assertNever.',
        'If a new theme is added, assertNever(theme) will error at compile time.',
      ],
      concepts: ['exhaustive narrowing patterns', 'assertNever helper'],
    },
  ],
};
