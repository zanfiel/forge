import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-gen-util',
  title: '26. Generic Utility Functions',
  explanation: `## Generic Utility Functions

Building your own generic utility functions teaches you how TypeScript's type system truly works. These are **reusable, type-safe** helpers that work across your entire codebase.

\\\`\\\`\\\`typescript
// A type-safe pick function
function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) result[key] = obj[key];
  return result;
}

// A type-safe Result type
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}
\\\`\\\`\\\`

In this section you will build real utility functions from scratch: pick, omit, merge, deep clone, pipe/compose, memoize, Result/Option types, and more.`,
  exercises: [
    {
      id: 'ts-gen-util-1',
      title: 'Build pick function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a generic pick function that extracts specified keys from an object. pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>.',
      skeleton: `// Write the pick function
`,
      solution: `function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}`,
      hints: [
        'K extends keyof T constrains keys to valid property names.',
        'Iterate over the keys array and copy each property.',
        'const result = {} as Pick<T, K>; for (const key of keys) result[key] = obj[key]; return result;',
      ],
      concepts: ['building pick function'],
    },
    {
      id: 'ts-gen-util-2',
      title: 'Build omit function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a generic omit function that removes specified keys from an object. Return type should be Omit<T, K>.',
      skeleton: `// Write the omit function
`,
      solution: `function omit<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}`,
      hints: [
        'Copy the object first with spread, then delete the specified keys.',
        'const result = { ...obj }; then loop and delete result[key].',
        'Return type is Omit<T, K>. Cast the result since delete does not narrow the type.',
      ],
      concepts: ['building omit function'],
    },
    {
      id: 'ts-gen-util-3',
      title: 'Build merge function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the return type for a merge function that combines two objects.',
      skeleton: `function merge<T extends object, U extends object>(a: T, b: U): __BLANK__ {
  return { ...a, ...b } as T & U;
}

const result = merge({ name: 'Alice' }, { age: 30 });
// result: { name: string } & { age: number }`,
      solution: `function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b } as T & U;
}

const result = merge({ name: 'Alice' }, { age: 30 });
// result: { name: string } & { age: number }`,
      hints: [
        'When you merge two objects, the result has properties from both.',
        'The intersection type T & U represents an object with all properties from T and U.',
        'Replace __BLANK__ with T & U.',
      ],
      concepts: ['building merge function'],
    },
    {
      id: 'ts-gen-util-4',
      title: 'Build deep clone',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a generic deepClone<T>(obj: T): T function using structuredClone.',
      skeleton: `// Write the deepClone function
`,
      solution: `function deepClone<T>(obj: T): T {
  return structuredClone(obj);
}`,
      hints: [
        'structuredClone creates a deep copy of any structured-cloneable value.',
        'The function just wraps structuredClone with a generic type.',
        'function deepClone<T>(obj: T): T { return structuredClone(obj); }',
      ],
      concepts: ['building deep clone'],
    },
    {
      id: 'ts-gen-util-5',
      title: 'Build Result type (Ok/Err)',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Define a Result<T, E> discriminated union type with ok() and err() constructor functions.',
      skeleton: `// Write Result<T, E>, ok<T>, and err<E>
`,
      solution: `type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}`,
      hints: [
        'Result is a discriminated union on the ok field.',
        'ok() returns { ok: true, value }. err() returns { ok: false, error }.',
        'Use never for the unused type parameter: ok returns Result<T, never>, err returns Result<never, E>.',
      ],
      concepts: ['building result type (Ok/Err)'],
    },
    {
      id: 'ts-gen-util-6',
      title: 'Build Option type (Some/None)',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Define an Option<T> type as { some: true; value: T } | { some: false }. Write some<T>(value: T) and none() constructor functions, and a map function for Option.',
      skeleton: `// Write Option<T>, some, none, and mapOption
`,
      solution: `type Option<T> =
  | { some: true; value: T }
  | { some: false };

function some<T>(value: T): Option<T> {
  return { some: true, value };
}

function none<T = never>(): Option<T> {
  return { some: false };
}

function mapOption<T, U>(opt: Option<T>, fn: (val: T) => U): Option<U> {
  if (opt.some) {
    return some(fn(opt.value));
  }
  return none();
}`,
      hints: [
        'Option is a discriminated union on the some field.',
        'mapOption applies fn to the value if some is true, otherwise returns none.',
        'if (opt.some) return some(fn(opt.value)); else return none();',
      ],
      concepts: ['building option type (Some/None)'],
    },
    {
      id: 'ts-gen-util-7',
      title: 'Build pipe function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a pipe function that takes a value and two transform functions, applying them in sequence: pipe(value, fn1, fn2). Use generics to track types through the chain.',
      skeleton: `// Write the pipe function
`,
      solution: `function pipe<A, B, C>(
  value: A,
  fn1: (a: A) => B,
  fn2: (b: B) => C
): C {
  return fn2(fn1(value));
}

// Usage:
const result = pipe(
  '  hello  ',
  (s) => s.trim(),
  (s) => s.length
); // 5`,
      hints: [
        'Each function transforms one type to the next: A -> B -> C.',
        'Three type parameters: A (input), B (intermediate), C (output).',
        'pipe applies fn1 to value, then fn2 to the result: fn2(fn1(value)).',
      ],
      concepts: ['building pipe/compose'],
    },
    {
      id: 'ts-gen-util-8',
      title: 'Build memoize',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a memoize function that caches results of a single-argument function. memoize<T, R>(fn: (arg: T) => R): (arg: T) => R.',
      skeleton: `// Write the memoize function
`,
      solution: `function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}`,
      hints: [
        'Use a Map<T, R> to cache results keyed by the argument.',
        'Return a new function that checks the cache first.',
        'If cache.has(arg) return cached value. Otherwise compute, store, and return.',
      ],
      concepts: ['building memoize with generics'],
    },
    {
      id: 'ts-gen-util-9',
      title: 'Build type-safe event emitter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generic EventEmitter<T extends Record<string, (...args: any[]) => void>> class with on(event, handler), off(event, handler), and emit(event, ...args) methods.',
      skeleton: `// Write the type-safe EventEmitter class
`,
      solution: `class EventEmitter<T extends Record<string, (...args: any[]) => void>> {
  private handlers = new Map<keyof T, Set<Function>>();

  on<K extends keyof T>(event: K, handler: T[K]): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);
  }

  off<K extends keyof T>(event: K, handler: T[K]): void {
    this.handlers.get(event)?.delete(handler);
  }

  emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>): void {
    this.handlers.get(event)?.forEach(h => h(...args));
  }
}`,
      hints: [
        'T maps event names to handler signatures. K extends keyof T picks a specific event.',
        'Use Parameters<T[K]> to get the argument types for emit.',
        'Store handlers in a Map<keyof T, Set<Function>>. emit calls each handler with the args.',
      ],
      concepts: ['building type-safe event emitter'],
    },
    {
      id: 'ts-gen-util-10',
      title: 'Build retry with generics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write an async retry<T>(fn: () => Promise<T>, attempts: number): Promise<T> function that retries a failing async operation up to N times.',
      skeleton: `// Write the retry function
`,
      solution: `async function retry<T>(fn: () => Promise<T>, attempts: number): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError;
}`,
      hints: [
        'Loop up to attempts times, calling fn() each time.',
        'If fn() succeeds, return the result. If it throws, catch and try again.',
        'After all attempts fail, throw the last error.',
      ],
      concepts: ['building retry with generics'],
    },
    {
      id: 'ts-gen-util-11',
      title: 'Build type-safe fetch wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generic fetchJson<T>(url: string): Promise<T> that fetches a URL and returns typed JSON.',
      skeleton: `// Write the fetchJson function
`,
      solution: `async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
  }
  return response.json() as Promise<T>;
}`,
      hints: [
        'Use the fetch API and .json() method.',
        'Check response.ok to handle HTTP errors.',
        'Cast the json() result as Promise<T> since the actual type depends on the API.',
      ],
      concepts: ['building type-safe fetch wrapper'],
    },
    {
      id: 'ts-gen-util-12',
      title: 'Build deep partial',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a recursive type DeepPartial<T> that makes all nested properties optional.',
      skeleton: `// Write the DeepPartial<T> type
`,
      solution: `type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// Usage:
interface Config {
  server: {
    host: string;
    port: number;
  };
  debug: boolean;
}

const partial: DeepPartial<Config> = {
  server: { host: 'localhost' }, // port is optional
};`,
      hints: [
        'Use a mapped type with ? to make each key optional.',
        'If the value type is an object, recursively apply DeepPartial.',
        '[K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];',
      ],
      concepts: ['building deep partial'],
    },
    {
      id: 'ts-gen-util-13',
      title: 'Build deep required',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fill in the blank to make DeepRequired recursively make all properties required.',
      skeleton: `type DeepRequired<T> = {
  [K in keyof T]__BLANK__: T[K] extends object ? DeepRequired<T[K]> : T[K];
};`,
      solution: `type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};`,
      hints: [
        'How do you remove the optional modifier from mapped types?',
        'The -? modifier removes optionality.',
        'Replace __BLANK__ with -?.',
      ],
      concepts: ['building deep required'],
    },
    {
      id: 'ts-gen-util-14',
      title: 'Build deep readonly',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fill in the blank to add readonly recursively to all nested properties.',
      skeleton: `type DeepReadonly<T> = {
  __BLANK__ [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};`,
      solution: `type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};`,
      hints: [
        'Which modifier prevents reassignment?',
        'readonly before the key mapping adds immutability.',
        'Replace __BLANK__ with readonly.',
      ],
      concepts: ['building deep readonly'],
    },
    {
      id: 'ts-gen-util-15',
      title: 'Build type-safe builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a Builder<T> class that accumulates properties and returns a complete T object. Builder starts empty and has set<K>(key, value) returning a new Builder with that key added.',
      skeleton: `// Write a simple Builder class
`,
      solution: `class Builder<T extends object> {
  private data: Partial<T> = {};

  set<K extends keyof T>(key: K, value: T[K]): this {
    this.data[key] = value;
    return this;
  }

  build(): T {
    return this.data as T;
  }
}

// Usage:
interface User {
  name: string;
  age: number;
}

const user = new Builder<User>()
  .set('name', 'Alice')
  .set('age', 30)
  .build();`,
      hints: [
        'Store accumulated properties in a Partial<T>.',
        'set<K extends keyof T>(key: K, value: T[K]) ensures type-safe property setting.',
        'Return this from set for chaining. build() casts Partial<T> to T.',
      ],
      concepts: ['building type-safe builder'],
    },
    {
      id: 'ts-gen-util-16',
      title: 'Build path type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type Paths<T> that generates dot-notation string paths for all properties of a nested object. For { a: { b: number } } it should produce "a" | "a.b".',
      skeleton: `// Write the Paths<T> type
`,
      solution: `type Paths<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? K | \`\${K}.\${Paths<T[K]>}\`
        : K;
    }[keyof T & string]
  : never;

// Usage:
interface Config {
  server: {
    host: string;
    port: number;
  };
  debug: boolean;
}

type ConfigPaths = Paths<Config>;
// "server" | "server.host" | "server.port" | "debug"`,
      hints: [
        'Use a mapped type that iterates keys and recursively builds paths.',
        'For object values: K | `${K}.${Paths<T[K]>}`. For primitives: just K.',
        'Index with [keyof T & string] to get the union of all paths.',
      ],
      concepts: ['building path type'],
    },
    {
      id: 'ts-gen-util-17',
      title: 'Build get-by-path',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function getByPath(obj, path) that takes a dot-notation string path and returns the value at that path. Use string splitting with simple runtime logic.',
      skeleton: `// Write the getByPath function
`,
      solution: `function getByPath(obj: Record<string, any>, path: string): unknown {
  return path.split('.').reduce((current, key) => {
    return current?.[key];
  }, obj as any);
}

// Usage:
const config = { server: { host: 'localhost', port: 3000 }, debug: true };
console.log(getByPath(config, 'server.host')); // 'localhost'
console.log(getByPath(config, 'server.port')); // 3000`,
      hints: [
        'Split the path by "." and traverse the object one key at a time.',
        'Use reduce to walk through each segment of the path.',
        'path.split(".").reduce((current, key) => current?.[key], obj)',
      ],
      concepts: ['building get-by-path'],
    },
    {
      id: 'ts-gen-util-18',
      title: 'Build set-by-path',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function setByPath(obj, path, value) that sets a value at a dot-notation path, creating intermediate objects as needed.',
      skeleton: `// Write the setByPath function
`,
      solution: `function setByPath(obj: Record<string, any>, path: string, value: unknown): void {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}`,
      hints: [
        'Split the path, traverse to the second-to-last key, then set the final key.',
        'Create intermediate objects if they do not exist along the path.',
        'Loop through all keys except the last, building the path. Set the value at the final key.',
      ],
      concepts: ['building set-by-path'],
    },
    {
      id: 'ts-gen-util-19',
      title: 'Build type-safe validator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a simple validator builder: a function validate<T>() that returns a chain with string(), number(), boolean() methods, each returning a validator function (value: unknown) => T.',
      skeleton: `// Write the validator builder
`,
      solution: `interface Validator<T> {
  validate(value: unknown): T;
}

function stringValidator(): Validator<string> {
  return {
    validate(value: unknown): string {
      if (typeof value !== 'string') throw new Error('Expected string');
      return value;
    },
  };
}

function numberValidator(): Validator<number> {
  return {
    validate(value: unknown): number {
      if (typeof value !== 'number') throw new Error('Expected number');
      return value;
    },
  };
}

function booleanValidator(): Validator<boolean> {
  return {
    validate(value: unknown): boolean {
      if (typeof value !== 'boolean') throw new Error('Expected boolean');
      return value;
    },
  };
}`,
      hints: [
        'Each validator factory returns a Validator<T> with a validate method.',
        'The validate method checks typeof and throws if wrong.',
        'stringValidator returns Validator<string>, numberValidator returns Validator<number>, etc.',
      ],
      concepts: ['building type-safe validator'],
    },
    {
      id: 'ts-gen-util-20',
      title: 'Practical utility: compose',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a compose function that takes two functions and returns their composition: compose(f, g) returns (x) => f(g(x)). Ensure full generic type safety.',
      skeleton: `// Write the compose function
`,
      solution: `function compose<A, B, C>(
  f: (b: B) => C,
  g: (a: A) => B
): (a: A) => C {
  return (a: A): C => f(g(a));
}

// Usage:
const double = (n: number) => n * 2;
const toString = (n: number) => String(n);
const doubleToString = compose(toString, double);
console.log(doubleToString(21)); // "42"`,
      hints: [
        'compose(f, g) means f after g: first apply g, then f.',
        'g: A -> B, f: B -> C, compose: A -> C.',
        'function compose<A, B, C>(f: (b: B) => C, g: (a: A) => B): (a: A) => C { return (a) => f(g(a)); }',
      ],
      concepts: ['practical utility patterns', 'building pipe/compose'],
    },
  ],
};
