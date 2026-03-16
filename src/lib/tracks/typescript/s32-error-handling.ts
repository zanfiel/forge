import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-errors',
  title: '32. Error Handling',
  explanation: `## Error Handling

Robust error handling is critical for reliable applications. TypeScript provides structured mechanisms for catching, creating, and propagating errors.

### try/catch/finally
The core construct: \\\`try\\\` runs risky code, \\\`catch\\\` handles errors, \\\`finally\\\` runs cleanup regardless of outcome.

### Error Classes
JavaScript provides built-in error types: \\\`Error\\\`, \\\`TypeError\\\`, \\\`RangeError\\\`, \\\`SyntaxError\\\`, \\\`ReferenceError\\\`, and more. You can extend \\\`Error\\\` to create custom error classes.

### Typing catch
In TypeScript, the \\\`catch\\\` parameter is typed as \\\`unknown\\\` by default (with \\\`useUnknownInCatchVariables\\\`). You must narrow it before accessing properties.

### Error Cause (ES2022)
The \\\`cause\\\` property on Error lets you chain errors, preserving the original error context.

### Result Type Pattern
Instead of throwing, return a discriminated union like \\\`{ ok: true, value: T } | { ok: false, error: E }\\\` for explicit error handling without exceptions.

### Best Practices
- Always catch specific error types when possible.
- Use custom error classes with error codes for programmatic handling.
- Prefer \\\`finally\\\` for cleanup (closing connections, releasing resources).
- Log errors with context (stack traces, error codes).
`,
  exercises: [
    {
      id: 'ts-errors-1',
      title: 'Basic try/catch',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the try/catch block to handle the error.',
      skeleton: `__BLANK__ {
  JSON.parse("invalid json");
} __BLANK__ (error) {
  console.log("Parse failed");
}`,
      solution: `try {
  JSON.parse("invalid json");
} catch (error) {
  console.log("Parse failed");
}`,
      hints: [
        'The two keywords for error handling blocks are try and catch.',
        'try { risky code } catch (error) { handle error }',
        'The blanks are: try and catch',
      ],
      concepts: ['try/catch', 'error handling basics'],
    },
    {
      id: 'ts-errors-2',
      title: 'Finally block',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add a finally block that always logs "cleanup".',
      skeleton: `try {
  console.log("work");
} catch (e) {
  console.log("error");
} __BLANK__ {
  console.log("cleanup");
}`,
      solution: `try {
  console.log("work");
} catch (e) {
  console.log("error");
} finally {
  console.log("cleanup");
}`,
      hints: [
        'Which block runs regardless of whether an error occurred?',
        'The finally block always executes after try/catch.',
        'The answer is: finally',
      ],
      concepts: ['finally', 'cleanup', 'try/catch/finally'],
    },
    {
      id: 'ts-errors-3',
      title: 'Throw an error',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Throw a new Error with the message "invalid input".',
      skeleton: `function validate(x: number): void {
  if (x < 0) {
    __BLANK__ new Error("invalid input");
  }
}`,
      solution: `function validate(x: number): void {
  if (x < 0) {
    throw new Error("invalid input");
  }
}`,
      hints: [
        'Which keyword raises an exception?',
        'Use throw followed by an Error object.',
        'The answer is: throw',
      ],
      concepts: ['throw', 'Error constructor', 'validation'],
    },
    {
      id: 'ts-errors-4',
      title: 'Predict try/catch/finally order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code log?',
      skeleton: `try {
  console.log("A");
  throw new Error("oops");
  console.log("B");
} catch (e) {
  console.log("C");
} finally {
  console.log("D");
}`,
      solution: `A
C
D`,
      hints: [
        'After the throw, execution jumps to catch, skipping "B".',
        'The finally block always runs after catch.',
        'Output is: A, C, D',
      ],
      concepts: ['execution flow', 'try/catch/finally', 'throw'],
    },
    {
      id: 'ts-errors-5',
      title: 'Custom error class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a custom error class called ValidationError that extends Error and includes a field property.',
      skeleton: `// Create ValidationError class extending Error
// Constructor should accept message and field parameters
`,
      solution: `class ValidationError extends Error {
  field: string;

  constructor(message: string, field: string) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}`,
      hints: [
        'Extend the Error class and call super(message) in the constructor.',
        'Set this.name to "ValidationError" and store the field property.',
        'class ValidationError extends Error { field: string; constructor(message: string, field: string) { super(message); this.name = "ValidationError"; this.field = field; } }',
      ],
      concepts: ['custom error', 'extends Error', 'class'],
    },
    {
      id: 'ts-errors-6',
      title: 'Error types',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Throw the correct built-in error type for an out-of-range value.',
      skeleton: `function setVolume(level: number): void {
  if (level < 0 || level > 100) {
    throw new __BLANK__("Volume must be between 0 and 100");
  }
}`,
      solution: `function setVolume(level: number): void {
  if (level < 0 || level > 100) {
    throw new RangeError("Volume must be between 0 and 100");
  }
}`,
      hints: [
        'Which built-in error type is for values outside an allowed range?',
        'JavaScript has TypeError, RangeError, SyntaxError, etc.',
        'The answer is: RangeError',
      ],
      concepts: ['RangeError', 'built-in error types'],
    },
    {
      id: 'ts-errors-7',
      title: 'Narrow unknown catch',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a safe error handler that narrows the unknown catch parameter to get the error message.',
      skeleton: `function getErrorMessage(error: unknown): string {
  // Return the error message if it is an Error, otherwise return String(error)
}`,
      solution: `function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}`,
      hints: [
        'Use instanceof to check if the value is an Error.',
        'If it is an Error, access .message. Otherwise, convert to string.',
        'if (error instanceof Error) return error.message; return String(error);',
      ],
      concepts: ['unknown', 'type narrowing', 'instanceof', 'catch parameter'],
    },
    {
      id: 'ts-errors-8',
      title: 'Error cause (ES2022)',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Wrap an inner error with a higher-level error using the cause option.',
      skeleton: `async function loadConfig(): Promise<object> {
  try {
    const data = JSON.parse("bad json");
    return data;
  } catch (innerError) {
    // Throw a new Error with message "Config load failed" and the innerError as cause
  }
}`,
      solution: `async function loadConfig(): Promise<object> {
  try {
    const data = JSON.parse("bad json");
    return data;
  } catch (innerError) {
    throw new Error("Config load failed", { cause: innerError });
  }
}`,
      hints: [
        'The Error constructor accepts an options object with a cause property.',
        'Pass { cause: innerError } as the second argument to new Error().',
        'throw new Error("Config load failed", { cause: innerError });',
      ],
      concepts: ['error cause', 'ES2022', 'error wrapping'],
    },
    {
      id: 'ts-errors-9',
      title: 'Fix: swallowed error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This code silently swallows errors. Fix it to log the error and re-throw it.',
      skeleton: `async function processData(data: string): Promise<string> {
  try {
    return JSON.parse(data);
  } catch (e) {
    // Bug: error is silently swallowed
  }
}`,
      solution: `async function processData(data: string): Promise<string> {
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Failed to process data:", e);
    throw e;
  }
}`,
      hints: [
        'An empty catch block silently swallows errors -- callers never know something failed.',
        'Log the error and re-throw it so the caller can handle it.',
        'Add console.error("Failed to process data:", e); throw e; in the catch block.',
      ],
      concepts: ['error swallowing', 're-throw', 'error logging'],
    },
    {
      id: 'ts-errors-10',
      title: 'AggregateError',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that runs multiple async operations and if all fail, throws an AggregateError with all the errors.',
      skeleton: `async function tryAll(tasks: (() => Promise<string>)[]): Promise<string> {
  // Try each task. If one succeeds, return its result.
  // If all fail, throw an AggregateError with all errors.
}`,
      solution: `async function tryAll(tasks: (() => Promise<string>)[]): Promise<string> {
  const errors: Error[] = [];
  for (const task of tasks) {
    try {
      return await task();
    } catch (e) {
      errors.push(e instanceof Error ? e : new Error(String(e)));
    }
  }
  throw new AggregateError(errors, "All tasks failed");
}`,
      hints: [
        'Collect errors in an array as each task fails.',
        'If a task succeeds, return immediately. If all fail, throw AggregateError.',
        'new AggregateError(errorsArray, "message") bundles multiple errors.',
      ],
      concepts: ['AggregateError', 'error collection', 'fallback pattern'],
    },
    {
      id: 'ts-errors-11',
      title: 'Result type pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Implement a Result type and a function that returns it instead of throwing.',
      skeleton: `type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

function safeDivide(a: number, b: number): Result<number> {
  // Return error result if b is 0, otherwise return success result
}`,
      solution: `type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

function safeDivide(a: number, b: number): Result<number> {
  if (b === 0) {
    return { ok: false, error: new Error("Division by zero") };
  }
  return { ok: true, value: a / b };
}`,
      hints: [
        'Return { ok: false, error: ... } for failure and { ok: true, value: ... } for success.',
        'Check if b is 0 and return the error result in that case.',
        'if (b === 0) return { ok: false, error: new Error("Division by zero") }; return { ok: true, value: a / b };',
      ],
      concepts: ['Result type', 'discriminated union', 'no-throw pattern'],
    },
    {
      id: 'ts-errors-12',
      title: 'Assertion error',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an assert function that throws if the condition is false, using TypeScript assertion signature.',
      skeleton: `// Write function assert(condition: unknown, message: string): asserts condition
`,
      solution: `function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}`,
      hints: [
        'Use the "asserts condition" return type annotation.',
        'If condition is falsy, throw an Error with the message.',
        'function assert(condition: unknown, message: string): asserts condition { if (!condition) throw new Error(message); }',
      ],
      concepts: ['assertion functions', 'asserts', 'type narrowing'],
    },
    {
      id: 'ts-errors-13',
      title: 'Error code pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create an AppError class that includes a numeric error code for programmatic handling.',
      skeleton: `// Create AppError extending Error with:
// - code: number property
// - constructor(message: string, code: number)
`,
      solution: `class AppError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = "AppError";
    this.code = code;
  }
}`,
      hints: [
        'Extend Error and add a code property.',
        'Call super(message) and set this.code = code in the constructor.',
        'class AppError extends Error { code: number; constructor(message: string, code: number) { super(message); this.name = "AppError"; this.code = code; } }',
      ],
      concepts: ['error codes', 'custom error class', 'programmatic handling'],
    },
    {
      id: 'ts-errors-14',
      title: 'Predict nested try/catch',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What does this code log?',
      skeleton: `try {
  try {
    throw new Error("inner");
  } finally {
    console.log("inner finally");
  }
} catch (e: any) {
  console.log(e.message);
}`,
      solution: `inner finally
inner`,
      hints: [
        'The inner finally runs before the error propagates to the outer catch.',
        'There is no inner catch, so the error propagates to the outer catch.',
        'Output is: inner finally, then inner',
      ],
      concepts: ['nested try/catch', 'finally execution order', 'error propagation'],
    },
    {
      id: 'ts-errors-15',
      title: 'Error serialization',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function that serializes an Error to a plain JSON-safe object including name, message, stack, and cause.',
      skeleton: `interface SerializedError {
  name: string;
  message: string;
  stack?: string;
  cause?: SerializedError;
}

function serializeError(error: Error): SerializedError {
  // Convert the Error to a SerializedError, recursively handling cause
}`,
      solution: `interface SerializedError {
  name: string;
  message: string;
  stack?: string;
  cause?: SerializedError;
}

function serializeError(error: Error): SerializedError {
  const serialized: SerializedError = {
    name: error.name,
    message: error.message,
    stack: error.stack,
  };
  if (error.cause instanceof Error) {
    serialized.cause = serializeError(error.cause);
  }
  return serialized;
}`,
      hints: [
        'Extract name, message, and stack from the Error.',
        'If error.cause is also an Error, recursively serialize it.',
        'Check error.cause instanceof Error and recurse if true.',
      ],
      concepts: ['error serialization', 'recursive', 'cause chain'],
    },
    {
      id: 'ts-errors-16',
      title: 'Fix: wrong error type check',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This code checks error.code but the catch parameter is unknown. Fix the type narrowing.',
      skeleton: `class HttpError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.name = "HttpError";
    this.code = code;
  }
}

async function fetchData(url: string): Promise<string> {
  try {
    const res = await fetch(url);
    return await res.text();
  } catch (error) {
    if (error.code === 404) {
      return "not found";
    }
    throw error;
  }
}`,
      solution: `class HttpError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.name = "HttpError";
    this.code = code;
  }
}

async function fetchData(url: string): Promise<string> {
  try {
    const res = await fetch(url);
    return await res.text();
  } catch (error) {
    if (error instanceof HttpError && error.code === 404) {
      return "not found";
    }
    throw error;
  }
}`,
      hints: [
        'The catch parameter is unknown -- you cannot access .code directly.',
        'Use instanceof to narrow the type to HttpError first.',
        'if (error instanceof HttpError && error.code === 404)',
      ],
      concepts: ['type narrowing', 'instanceof', 'unknown catch', 'HttpError'],
    },
    {
      id: 'ts-errors-17',
      title: 'Error boundary wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a generic error boundary function that wraps an async operation and converts exceptions to a Result type.',
      skeleton: `type Result<T> = { ok: true; value: T } | { ok: false; error: Error };

async function tryCatch<T>(fn: () => Promise<T>): Promise<Result<T>> {
  // Execute fn, return success result or error result
}`,
      solution: `type Result<T> = { ok: true; value: T } | { ok: false; error: Error };

async function tryCatch<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    const value = await fn();
    return { ok: true, value };
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    return { ok: false, error };
  }
}`,
      hints: [
        'Wrap fn() in try/catch and return the appropriate Result variant.',
        'For success: { ok: true, value }. For failure: { ok: false, error }.',
        'Ensure the caught value is converted to an Error if it is not one already.',
      ],
      concepts: ['Result type', 'error boundary', 'generics', 'async'],
    },
    {
      id: 'ts-errors-18',
      title: 'Predict finally with return',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What does this function return?',
      skeleton: `function tricky(): string {
  try {
    return "try";
  } finally {
    return "finally";
  }
}

console.log(tricky());`,
      solution: `finally`,
      hints: [
        'A return in the finally block overrides the return in try.',
        'The finally block always runs and its return takes precedence.',
        'Output is: finally',
      ],
      concepts: ['finally return override', 'control flow', 'gotcha'],
    },
    {
      id: 'ts-errors-19',
      title: 'Refactor: error handling cleanup',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this repetitive error handling into a reusable wrapper function.',
      skeleton: `async function getUser(): Promise<string> {
  try {
    const res = await fetch("/api/user");
    return await res.text();
  } catch (e) {
    console.error("getUser failed:", e);
    throw e;
  }
}

async function getPosts(): Promise<string> {
  try {
    const res = await fetch("/api/posts");
    return await res.text();
  } catch (e) {
    console.error("getPosts failed:", e);
    throw e;
  }
}`,
      solution: `async function withLogging<T>(name: string, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    console.error(\\\`\${name} failed:\\\`, e);
    throw e;
  }
}

async function getUser(): Promise<string> {
  return withLogging("getUser", async () => {
    const res = await fetch("/api/user");
    return res.text();
  });
}

async function getPosts(): Promise<string> {
  return withLogging("getPosts", async () => {
    const res = await fetch("/api/posts");
    return res.text();
  });
}`,
      hints: [
        'Extract the repeated try/catch pattern into a higher-order function.',
        'Create withLogging<T>(name: string, fn: () => Promise<T>): Promise<T>.',
        'The wrapper handles the try/catch and logging, each function just provides the logic.',
      ],
      concepts: ['refactoring', 'DRY', 'higher-order function', 'error logging'],
    },
    {
      id: 'ts-errors-20',
      title: 'Refactor: error hierarchy',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor these scattered error throws into a proper error hierarchy with a base AppError class.',
      skeleton: `function validateAge(age: number): void {
  if (age < 0) throw new Error("VALIDATION: Age cannot be negative");
  if (age > 150) throw new Error("VALIDATION: Age too high");
}

function fetchUser(id: number): void {
  if (id <= 0) throw new Error("NOT_FOUND: Invalid user id");
  // fetch logic
}

function saveUser(data: object): void {
  throw new Error("DATABASE: Connection failed");
}`,
      solution: `class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AppError";
  }
}

class ValidationError extends AppError {
  field: string;
  constructor(message: string, field: string) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NotFoundError extends AppError {
  resource: string;
  constructor(message: string, resource: string) {
    super(message);
    this.name = "NotFoundError";
    this.resource = resource;
  }
}

class DatabaseError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

function validateAge(age: number): void {
  if (age < 0) throw new ValidationError("Age cannot be negative", "age");
  if (age > 150) throw new ValidationError("Age too high", "age");
}

function fetchUser(id: number): void {
  if (id <= 0) throw new NotFoundError("Invalid user id", "user");
}

function saveUser(data: object): void {
  throw new DatabaseError("Connection failed");
}`,
      hints: [
        'Create a base AppError class and specific subclasses for each error category.',
        'ValidationError, NotFoundError, and DatabaseError all extend AppError.',
        'Each subclass can have domain-specific properties like field or resource.',
      ],
      concepts: ['error hierarchy', 'custom errors', 'refactoring', 'inheritance'],
    },
  ],
};
