import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-gen-intro',
  title: '24. Generics Introduction',
  explanation: `## Generics Introduction

Generics let you write **reusable code** that works with multiple types while preserving type safety. Instead of using \\\`any\\\`, you use **type parameters**.

\\\`\\\`\\\`typescript
function identity<T>(value: T): T {
  return value;
}

identity<string>('hello'); // explicit: T = string
identity(42);              // inferred: T = number
\\\`\\\`\\\`

Key concepts:
- **\\\`<T>\\\`** declares a type parameter (convention: T, U, K, V)
- TypeScript **infers** T from arguments when possible
- **Generic constraints** (\\\`T extends Something\\\`) limit what T can be
- Generic **classes**, **interfaces**, and **type aliases** are all supported
- **Default type parameters** (\\\`<T = string>\\\`) provide fallback types
- Generics preserve the relationship between input and output types`,
  exercises: [
    {
      id: 'ts-gen-intro-1',
      title: 'Generic identity',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the type parameter to make this a generic identity function.',
      skeleton: `function identity__BLANK__(value: T): T {
  return value;
}

const result = identity('hello');`,
      solution: `function identity<T>(value: T): T {
  return value;
}

const result = identity('hello');`,
      hints: [
        'Generic type parameters go in angle brackets before the parameters.',
        'The syntax is function name<TypeParam>(...).',
        'Replace __BLANK__ with <T>.',
      ],
      concepts: ['generic function basics', 'type parameter T'],
    },
    {
      id: 'ts-gen-intro-2',
      title: 'Generic with arrays',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the return type for a function that returns the first element of a generic array.',
      skeleton: `function first<T>(arr: T[]): __BLANK__ {
  return arr[0];
}

const n: number = first([1, 2, 3]);`,
      solution: `function first<T>(arr: T[]): T {
  return arr[0];
}

const n: number = first([1, 2, 3]);`,
      hints: [
        'The function takes T[] and returns a single element from it.',
        'What type is a single element of T[]?',
        'Replace __BLANK__ with T.',
      ],
      concepts: ['generic with arrays', 'generic return types'],
    },
    {
      id: 'ts-gen-intro-3',
      title: 'Explicit type arguments',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the explicit type argument so TypeScript knows this is a string array.',
      skeleton: `function wrap<T>(value: T): T[] {
  return [value];
}

const strings: string[] = wrap__BLANK__('hello');`,
      solution: `function wrap<T>(value: T): T[] {
  return [value];
}

const strings: string[] = wrap<string>('hello');`,
      hints: [
        'You can pass type arguments explicitly using angle brackets at the call site.',
        'The syntax is functionName<Type>(args).',
        'Replace __BLANK__ with <string>.',
      ],
      concepts: ['explicit type arguments', 'generic function basics'],
    },
    {
      id: 'ts-gen-intro-4',
      title: 'Multiple type parameters',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the type parameters for a function that takes two different types and returns a tuple.',
      skeleton: `function pair__BLANK__(first: T, second: U): [T, U] {
  return [first, second];
}

const p = pair('hello', 42); // [string, number]`,
      solution: `function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p = pair('hello', 42); // [string, number]`,
      hints: [
        'You can have multiple type parameters separated by commas.',
        'Two different type parameters for two different types.',
        'Replace __BLANK__ with <T, U>.',
      ],
      concepts: ['multiple type parameters'],
    },
    {
      id: 'ts-gen-intro-5',
      title: 'Predict generic inference',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What type does TypeScript infer for result?',
      skeleton: `function lastElement<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

const result = lastElement([true, false, true]);
// What is the type of result?`,
      solution: `boolean`,
      hints: [
        'TypeScript infers T from the argument type.',
        'The argument is an array of booleans.',
        'T is inferred as boolean, so result is boolean.',
      ],
      concepts: ['generic type inference'],
    },
    {
      id: 'ts-gen-intro-6',
      title: 'Generic with interfaces',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Define a generic interface Box<T> with a value property of type T and a getValue() method returning T. Then create a stringBox of type Box<string>.',
      skeleton: `// Write the Box<T> interface and create a stringBox
`,
      solution: `interface Box<T> {
  value: T;
  getValue(): T;
}

const stringBox: Box<string> = {
  value: 'hello',
  getValue() {
    return this.value;
  },
};`,
      hints: [
        'interface Box<T> { value: T; getValue(): T; }',
        'To create an instance, specify the type: Box<string>.',
        'const stringBox: Box<string> = { value: "hello", getValue() { return this.value; } };',
      ],
      concepts: ['generic with interfaces', 'type parameter T'],
    },
    {
      id: 'ts-gen-intro-7',
      title: 'Generic class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generic Stack<T> class with push(item: T), pop(): T | undefined, peek(): T | undefined, and get size(): number.',
      skeleton: `// Write the generic Stack<T> class
`,
      solution: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }
}`,
      hints: [
        'class Stack<T> with a private items: T[] array.',
        'push adds to the array, pop removes from end, peek reads last element.',
        'Use Array push/pop methods. peek returns items[items.length - 1]. size returns items.length.',
      ],
      concepts: ['generic classes', 'type parameter T'],
    },
    {
      id: 'ts-gen-intro-8',
      title: 'Generic defaults',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fill in the default type parameter so Response defaults to unknown when no type argument is provided.',
      skeleton: `interface ApiResponse<T __BLANK__> {
  data: T;
  status: number;
  message: string;
}

const resp: ApiResponse = { data: 'anything', status: 200, message: 'ok' };`,
      solution: `interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message: string;
}

const resp: ApiResponse = { data: 'anything', status: 200, message: 'ok' };`,
      hints: [
        'Default type parameters use = like default function parameters.',
        '<T = DefaultType> provides a fallback type.',
        'Replace __BLANK__ with = unknown.',
      ],
      concepts: ['generic defaults'],
    },
    {
      id: 'ts-gen-intro-9',
      title: 'Generic constraint',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fill in the constraint so T must have a length property.',
      skeleton: `function longest<T __BLANK__ { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest('hello', 'hi'));
console.log(longest([1, 2, 3], [4, 5]));`,
      solution: `function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest('hello', 'hi'));
console.log(longest([1, 2, 3], [4, 5]));`,
      hints: [
        'Constraints use the extends keyword inside angle brackets.',
        'T extends SomeType means T must be assignable to SomeType.',
        'Replace __BLANK__ with extends.',
      ],
      concepts: ['generic constraints (extends)'],
    },
    {
      id: 'ts-gen-intro-10',
      title: 'Generic with objects',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generic function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] that safely accesses a property of an object.',
      skeleton: `// Write the getProperty function
`,
      solution: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Alice', age: 30 };
const name = getProperty(user, 'name'); // string
const age = getProperty(user, 'age');   // number`,
      hints: [
        'K extends keyof T ensures key is a valid property name of T.',
        'The return type T[K] is the type of that specific property.',
        'function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }',
      ],
      concepts: ['generic with objects', 'generic constraints (extends)'],
    },
    {
      id: 'ts-gen-intro-11',
      title: 'Generic methods',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a class ArrayUtils with a static generic method unique<T>(arr: T[]): T[] that returns an array with duplicates removed.',
      skeleton: `// Write the ArrayUtils class with a static generic method
`,
      solution: `class ArrayUtils {
  static unique<T>(arr: T[]): T[] {
    return [...new Set(arr)];
  }
}`,
      hints: [
        'Static methods can be generic -- put <T> after the method name.',
        'Use new Set(arr) to remove duplicates, then spread back to array.',
        'static unique<T>(arr: T[]): T[] { return [...new Set(arr)]; }',
      ],
      concepts: ['generic methods', 'generic with arrays'],
    },
    {
      id: 'ts-gen-intro-12',
      title: 'Generic vs any',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What is the type of result1 and result2? Which preserves type safety?',
      skeleton: `function withAny(value: any): any {
  return value;
}

function withGeneric<T>(value: T): T {
  return value;
}

const result1 = withAny('hello');    // type?
const result2 = withGeneric('hello'); // type?`,
      solution: `result1 is type any (type information lost). result2 is type string (type preserved). The generic version preserves type safety.`,
      hints: [
        'any discards all type information.',
        'Generics preserve the specific type that was passed in.',
        'result1: any, result2: string. Generics maintain the type relationship.',
      ],
      concepts: ['generic vs any'],
    },
    {
      id: 'ts-gen-intro-13',
      title: 'Generic with union',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generic function orDefault<T>(value: T | null | undefined, defaultValue: T): T that returns the value if it exists, otherwise the default.',
      skeleton: `// Write the orDefault function
`,
      solution: `function orDefault<T>(value: T | null | undefined, defaultValue: T): T {
  return value ?? defaultValue;
}`,
      hints: [
        'The value parameter can be T, null, or undefined.',
        'Use the nullish coalescing operator ?? to provide the default.',
        'function orDefault<T>(value: T | null | undefined, defaultValue: T): T { return value ?? defaultValue; }',
      ],
      concepts: ['generic with union', 'generic return types'],
    },
    {
      id: 'ts-gen-intro-14',
      title: 'Fix generic type error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This function tries to access .length on T, but T is unconstrained. Fix it by adding a constraint.',
      skeleton: `function logLength<T>(value: T): void {
  console.log(value.length); // Error: Property 'length' does not exist on type 'T'
}`,
      solution: `function logLength<T extends { length: number }>(value: T): void {
  console.log(value.length);
}`,
      hints: [
        'T has no guarantee of having a .length property.',
        'Add a constraint: T extends { length: number }.',
        'Change <T> to <T extends { length: number }>.',
      ],
      concepts: ['generic constraints (extends)', 'generic function basics'],
    },
    {
      id: 'ts-gen-intro-15',
      title: 'Generic vs unknown',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What is the key difference between these two function signatures in terms of type safety?',
      skeleton: `function processUnknown(a: unknown, b: unknown): unknown {
  return a; // caller gets unknown back
}

function processGeneric<T, U>(a: T, b: U): T {
  return a; // caller gets T back
}

const r1 = processUnknown('hello', 42);  // type?
const r2 = processGeneric('hello', 42);  // type?`,
      solution: `r1 is type unknown (must be narrowed before use). r2 is type string (preserved via generic T). Generics maintain the connection between input and output types; unknown does not.`,
      hints: [
        'unknown is safer than any but still loses the specific type.',
        'Generics preserve the exact input type through to the output.',
        'r1: unknown, r2: string. Generic tracks the type; unknown forgets it.',
      ],
      concepts: ['generic vs unknown', 'generic type inference'],
    },
    {
      id: 'ts-gen-intro-16',
      title: 'Generic parameter naming',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in descriptive type parameter names for a Map-like structure.',
      skeleton: `class SimpleMap<__BLANK__, __BLANK__> {
  private entries: [K, V][] = [];

  set(key: K, value: V): void {
    this.entries.push([key, value]);
  }

  get(key: K): V | undefined {
    const entry = this.entries.find(([k]) => k === key);
    return entry?.[1];
  }
}`,
      solution: `class SimpleMap<K, V> {
  private entries: [K, V][] = [];

  set(key: K, value: V): void {
    this.entries.push([key, value]);
  }

  get(key: K): V | undefined {
    const entry = this.entries.find(([k]) => k === key);
    return entry?.[1];
  }
}`,
      hints: [
        'Convention uses single letters: T for general type, K for key, V for value.',
        'This is a map structure with keys and values.',
        'Replace the blanks with K and V.',
      ],
      concepts: ['generic parameter naming conventions'],
    },
    {
      id: 'ts-gen-intro-17',
      title: 'Generic utility function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generic function groupBy<T, K extends string>(arr: T[], keyFn: (item: T) => K): Record<K, T[]> that groups array items by a key function.',
      skeleton: `// Write the groupBy function
`,
      solution: `function groupBy<T, K extends string>(arr: T[], keyFn: (item: T) => K): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
  for (const item of arr) {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}`,
      hints: [
        'Iterate over the array, compute the key for each item, and group them.',
        'Initialize groups as empty arrays. Use Record<K, T[]> for the result type.',
        'For each item: compute key, initialize array if needed, push item. Return the record.',
      ],
      concepts: ['generic utility functions', 'generic with objects'],
    },
    {
      id: 'ts-gen-intro-18',
      title: 'Fix wrong generic usage',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This function returns a different type than it receives but claims to return T. Fix the return type.',
      skeleton: `function toStringArray<T>(items: T[]): T[] {
  return items.map(item => String(item)); // Bug: returns string[], not T[]
}`,
      solution: `function toStringArray<T>(items: T[]): string[] {
  return items.map(item => String(item));
}`,
      hints: [
        'String(item) always returns a string, regardless of T.',
        'The return type should match what is actually returned.',
        'Change the return type from T[] to string[].',
      ],
      concepts: ['generic return types', 'generic function basics'],
    },
    {
      id: 'ts-gen-intro-19',
      title: 'Generic type inference chain',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What are the inferred types for T and U in this call?',
      skeleton: `function transform<T, U>(input: T, fn: (val: T) => U): U {
  return fn(input);
}

const result = transform(42, (n) => n.toString());
// What are T and U?`,
      solution: `T is number (inferred from 42). U is string (inferred from the return type of n.toString()). result is type string.`,
      hints: [
        'T is inferred from the first argument.',
        'U is inferred from the return type of the callback function.',
        'T = number (from 42), U = string (from .toString()). result is string.',
      ],
      concepts: ['generic type inference', 'multiple type parameters'],
    },
    {
      id: 'ts-gen-intro-20',
      title: 'Practical generic pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a generic function createLookup<T, K extends keyof T>(items: T[], key: K): Map<T[K], T> that creates a Map keyed by a specified property of each item.',
      skeleton: `// Write the createLookup function
`,
      solution: `function createLookup<T, K extends keyof T>(items: T[], key: K): Map<T[K], T> {
  const map = new Map<T[K], T>();
  for (const item of items) {
    map.set(item[key], item);
  }
  return map;
}

// Usage:
// const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
// const byId = createLookup(users, 'id'); // Map<number, User>`,
      hints: [
        'K extends keyof T constrains the key to valid property names of T.',
        'T[K] is the type of that property -- used as the Map key type.',
        'Iterate items, map.set(item[key], item) for each. Return the Map<T[K], T>.',
      ],
      concepts: ['practical generic patterns', 'generic with objects', 'generic constraints (extends)'],
    },
  ],
};
