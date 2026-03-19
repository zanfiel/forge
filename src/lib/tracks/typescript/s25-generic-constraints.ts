import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-gen-const',
  title: '25. Generic Constraints',
  explanation: `## Generic Constraints

Constraints narrow what types are allowed for a generic parameter. Without constraints, T could be **anything**, so you cannot use any specific methods or properties on it.

\\\`\\\`\\\`typescript
// Without constraint: T is too broad
function getLength<T>(val: T): number {
  return val.length; // Error! T might not have length
}

// With constraint: T must have length
function getLength<T extends { length: number }>(val: T): number {
  return val.length; // OK!
}
\\\`\\\`\\\`

Constraint patterns:
- \\\`T extends SomeType\\\` -- T must be assignable to SomeType
- \\\`K extends keyof T\\\` -- K must be a key of T
- \\\`T extends U ? X : Y\\\` -- conditional constraint
- Multiple constraints via intersection: \\\`T extends A & B\\\`
- Constraining to functions: \\\`T extends (...args: any[]) => any\\\`
- Constraining to constructors: \\\`T extends new (...args: any[]) => any\\\``,
  exercises: [
    {
      id: 'ts-gen-const-1',
      title: 'Basic extends constraint',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add a constraint so T must have a name property.',
      skeleton: `function greet<T __BLANK__ { name: string }>(obj: T): string {
  return \`Hello, \${obj.name}!\`;
}`,
      solution: `function greet<T extends { name: string }>(obj: T): string {
  return \`Hello, \${obj.name}!\`;
}`,
      hints: [
        'Constraints use the extends keyword in the type parameter.',
        'T extends { name: string } means T must have at least a name property.',
        'Replace __BLANK__ with extends.',
      ],
      concepts: ['extends with interfaces'],
    },
    {
      id: 'ts-gen-const-2',
      title: 'keyof constraint',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Constrain K so it can only be a valid key of T.',
      skeleton: `function pluck<T, K __BLANK__ keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Alice', age: 30 };
const name = pluck(user, 'name'); // string`,
      solution: `function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Alice', age: 30 };
const name = pluck(user, 'name'); // string`,
      hints: [
        'K must be one of the keys of T.',
        'keyof T gives the union of property names of T.',
        'Replace __BLANK__ with extends.',
      ],
      concepts: ['keyof constraint', 'extends keyof'],
    },
    {
      id: 'ts-gen-const-3',
      title: 'Extends with primitives',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Constrain T to only string or number types.',
      skeleton: `function double<T extends __BLANK__>(value: T): string {
  if (typeof value === 'string') return value + value;
  return String(Number(value) * 2);
}`,
      solution: `function double<T extends string | number>(value: T): string {
  if (typeof value === 'string') return value + value;
  return String(Number(value) * 2);
}`,
      hints: [
        'T should accept string or number but nothing else.',
        'Use a union type as the constraint.',
        'Replace __BLANK__ with string | number.',
      ],
      concepts: ['extends with primitives'],
    },
    {
      id: 'ts-gen-const-4',
      title: 'Predict constraint error',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Will this code compile? If not, what is the error?',
      skeleton: `function getLength<T extends { length: number }>(val: T): number {
  return val.length;
}

getLength('hello');  // ?
getLength([1, 2]);   // ?
getLength(42);       // ?`,
      solution: `getLength('hello') compiles (string has length). getLength([1, 2]) compiles (array has length). getLength(42) fails: number does not satisfy the constraint { length: number }.`,
      hints: [
        'The constraint requires T to have a length property of type number.',
        'Strings and arrays have .length. What about numbers?',
        'getLength(42) fails because number does not have a length property.',
      ],
      concepts: ['extends with interfaces', 'constraint error messages'],
    },
    {
      id: 'ts-gen-const-5',
      title: 'Multiple constraints',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Constrain T so it must have both a name property and a toJSON method.',
      skeleton: `interface Named { name: string; }
interface Serializable { toJSON(): string; }

function process<T extends __BLANK__>(item: T): string {
  return \`\${item.name}: \${item.toJSON()}\`;
}`,
      solution: `interface Named { name: string; }
interface Serializable { toJSON(): string; }

function process<T extends Named & Serializable>(item: T): string {
  return \`\${item.name}: \${item.toJSON()}\`;
}`,
      hints: [
        'You can combine constraints with intersection types.',
        'Use & to require T to satisfy multiple interfaces.',
        'Replace __BLANK__ with Named & Serializable.',
      ],
      concepts: ['multiple constraints'],
    },
    {
      id: 'ts-gen-const-6',
      title: 'Constraining to callable',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generic function callTwice<T extends (...args: any[]) => any>(fn: T): ReturnType<T> that calls a function and returns the result of the second call.',
      skeleton: `// Write the callTwice function
`,
      solution: `function callTwice<T extends (...args: any[]) => any>(fn: T): ReturnType<T> {
  fn();
  return fn();
}`,
      hints: [
        'Constrain T to be any function type.',
        'T extends (...args: any[]) => any matches any function.',
        'Call fn() twice. Return the result of the second call. Use ReturnType<T> as the return type.',
      ],
      concepts: ['constraining to callable'],
    },
    {
      id: 'ts-gen-const-7',
      title: 'Constraining to constructable',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generic function create<T>(Ctor: new () => T): T that takes a constructor with no arguments and returns a new instance.',
      skeleton: `// Write the create function
`,
      solution: `function create<T>(Ctor: new () => T): T {
  return new Ctor();
}

class MyClass {
  value = 42;
}

const instance = create(MyClass); // MyClass`,
      hints: [
        'A constructor type is written as new (...args) => T.',
        'For a no-arg constructor: new () => T.',
        'function create<T>(Ctor: new () => T): T { return new Ctor(); }',
      ],
      concepts: ['constraining to constructable'],
    },
    {
      id: 'ts-gen-const-8',
      title: 'Constraint with default',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fill in the constraint and default so T defaults to string but must always extend string | number.',
      skeleton: `function parse<T extends string | number __BLANK__>(input: string): T {
  return input as unknown as T;
}

const s = parse('hello');    // T defaults to string
const n = parse<number>('42'); // T explicitly number`,
      solution: `function parse<T extends string | number = string>(input: string): T {
  return input as unknown as T;
}

const s = parse('hello');    // T defaults to string
const n = parse<number>('42'); // T explicitly number`,
      hints: [
        'Default type parameters use = after the constraint.',
        'Syntax: <T extends Constraint = Default>.',
        'Replace __BLANK__ with = string.',
      ],
      concepts: ['constraint with default'],
    },
    {
      id: 'ts-gen-const-9',
      title: 'Bounded generics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function merge<T extends object, U extends object>(a: T, b: U): T & U that merges two objects together.',
      skeleton: `// Write the merge function
`,
      solution: `function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b } as T & U;
}`,
      hints: [
        'Constrain both T and U to object types.',
        'Use the spread operator to merge objects.',
        'function merge<T extends object, U extends object>(a: T, b: U): T & U { return { ...a, ...b } as T & U; }',
      ],
      concepts: ['bounded generics', 'multiple constraints'],
    },
    {
      id: 'ts-gen-const-10',
      title: 'Constraining to indexable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Constrain T so it must be indexable with string keys.',
      skeleton: `function getValues<T extends __BLANK__>(obj: T): unknown[] {
  return Object.values(obj);
}`,
      solution: `function getValues<T extends Record<string, unknown>>(obj: T): unknown[] {
  return Object.values(obj);
}`,
      hints: [
        'An indexable type can be represented as Record<string, unknown>.',
        'Record<string, unknown> means any object with string keys.',
        'Replace __BLANK__ with Record<string, unknown>.',
      ],
      concepts: ['constraining to indexable'],
    },
    {
      id: 'ts-gen-const-11',
      title: 'Extends with union',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What types can be passed to this function?',
      skeleton: `function format<T extends string | number | boolean>(value: T): string {
  return String(value);
}

// Which of these compile?
format('hello');
format(42);
format(true);
format([1, 2, 3]);
format({ name: 'Alice' });`,
      solution: `format('hello') compiles. format(42) compiles. format(true) compiles. format([1, 2, 3]) fails. format({ name: 'Alice' }) fails. Only string, number, and boolean satisfy the constraint.`,
      hints: [
        'T extends string | number | boolean limits T to those three types.',
        'Arrays and objects are not assignable to string | number | boolean.',
        'The first three calls compile. The last two fail the constraint.',
      ],
      concepts: ['extends with union'],
    },
    {
      id: 'ts-gen-const-12',
      title: 'Constraint chains',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> that extracts specified properties from an object.',
      skeleton: `// Write the pick function
`,
      solution: `function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}`,
      hints: [
        'K extends keyof T ensures all keys are valid properties of T.',
        'Iterate over keys and copy each property to a new object.',
        'const result = {} as Pick<T, K>; keys.forEach(k => result[k] = obj[k]); return result;',
      ],
      concepts: ['constraint chains', 'extends keyof'],
    },
    {
      id: 'ts-gen-const-13',
      title: 'Fix constraint too narrow',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This function constrains T to string but should accept any type with a toString() method. Fix the constraint.',
      skeleton: `function stringify<T extends string>(value: T): string {
  return value.toString();
}

// Should work with numbers too:
// stringify(42); // Error: number is not assignable to string`,
      solution: `function stringify<T extends { toString(): string }>(value: T): string {
  return value.toString();
}`,
      hints: [
        'The constraint is too narrow -- only strings are allowed.',
        'What is the actual requirement? The value needs toString().',
        'Change the constraint to T extends { toString(): string }.',
      ],
      concepts: ['constraint error messages', 'constraint best practices'],
    },
    {
      id: 'ts-gen-const-14',
      title: 'Narrowing in generics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function isNonNull<T>(value: T): value is NonNullable<T> that acts as a type guard for filtering nullish values from arrays.',
      skeleton: `// Write the isNonNull type guard
// Usage: [1, null, 2, undefined, 3].filter(isNonNull) // number[]
`,
      solution: `function isNonNull<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}`,
      hints: [
        'This is a type guard function -- it returns a type predicate.',
        'The return type "value is NonNullable<T>" narrows the type when used as a filter.',
        'function isNonNull<T>(value: T): value is NonNullable<T> { return value !== null && value !== undefined; }',
      ],
      concepts: ['narrowing in generics'],
    },
    {
      id: 'ts-gen-const-15',
      title: 'Recursive constraint',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type Comparable<T> interface with compareTo(other: T): number. Then write a function max<T extends Comparable<T>>(a: T, b: T): T that returns the greater value.',
      skeleton: `// Write Comparable<T> and max function
`,
      solution: `interface Comparable<T> {
  compareTo(other: T): number;
}

function max<T extends Comparable<T>>(a: T, b: T): T {
  return a.compareTo(b) >= 0 ? a : b;
}`,
      hints: [
        'Comparable<T> references T in its own definition -- this is a recursive constraint.',
        'T extends Comparable<T> means T must know how to compare itself.',
        'interface Comparable<T> { compareTo(other: T): number; }. max uses a.compareTo(b) >= 0.',
      ],
      concepts: ['recursive constraints'],
    },
    {
      id: 'ts-gen-const-16',
      title: 'Mutual constraints',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function assign<T extends object, K extends keyof T>(obj: T, key: K, value: T[K]): void that safely assigns a value to an object property with proper type checking.',
      skeleton: `// Write the assign function
`,
      solution: `function assign<T extends object, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  obj[key] = value;
}

const user = { name: 'Alice', age: 30 };
assign(user, 'name', 'Bob');   // OK
assign(user, 'age', 25);      // OK
// assign(user, 'name', 42);  // Error: number not assignable to string`,
      hints: [
        'K depends on T (must be a key of T). The value type depends on both T and K.',
        'T[K] gives the type of property K on type T.',
        'function assign<T extends object, K extends keyof T>(obj: T, key: K, value: T[K]): void { obj[key] = value; }',
      ],
      concepts: ['mutual constraints', 'extends keyof'],
    },
    {
      id: 'ts-gen-const-17',
      title: 'Constraint inference',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What types are inferred for T and K in this call?',
      skeleton: `function getProperty<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const config = { host: 'localhost', port: 3000, debug: true };
const val = getProperty(config, 'port');
// What are T, K, and the type of val?`,
      solution: `T is { host: string; port: number; debug: boolean }. K is 'port'. val is type number.`,
      hints: [
        'T is inferred from the first argument object.',
        'K is inferred from the string literal "port".',
        'T = typeof config, K = "port", val = T["port"] = number.',
      ],
      concepts: ['constraint inference'],
    },
    {
      id: 'ts-gen-const-18',
      title: 'Fix over-constrained generic',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This function is over-constrained -- it requires T to be exactly Array, losing the specific element type. Fix it to preserve the element type.',
      skeleton: `function firstElement<T extends Array<unknown>>(arr: T): unknown {
  return arr[0];
}

const result = firstElement([1, 2, 3]); // unknown -- should be number`,
      solution: `function firstElement<T>(arr: T[]): T {
  return arr[0];
}

const result = firstElement([1, 2, 3]); // number`,
      hints: [
        'The constraint T extends Array<unknown> loses the element type.',
        'Instead of constraining T to be an array, make T be the element type.',
        'Change to <T>(arr: T[]): T to preserve the element type.',
      ],
      concepts: ['constraint best practices', 'constraint error messages'],
    },
    {
      id: 'ts-gen-const-19',
      title: 'Conditional constraints',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type StringKeys<T> that extracts only the keys of T whose values are strings. Then write a function getStringProp<T, K extends StringKeys<T>>(obj: T, key: K): string.',
      skeleton: `// Write StringKeys<T> and getStringProp
`,
      solution: `type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

function getStringProp<T, K extends StringKeys<T>>(obj: T, key: K): string {
  return obj[key] as unknown as string;
}

const data = { name: 'Alice', age: 30, city: 'NYC' };
const name = getStringProp(data, 'name'); // OK
const city = getStringProp(data, 'city'); // OK
// getStringProp(data, 'age'); // Error: 'age' is not assignable`,
      hints: [
        'Use a mapped type with conditional to filter keys by value type.',
        'Map each key: if T[K] extends string, keep K, otherwise never. Then index with [keyof T].',
        'type StringKeys<T> = { [K in keyof T]: T[K] extends string ? K : never }[keyof T];',
      ],
      concepts: ['conditional constraints', 'constraint chains'],
    },
    {
      id: 'ts-gen-const-20',
      title: 'Practical constraint patterns',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type-safe event emitter function: on<T extends Record<string, (...args: any[]) => void>, K extends keyof T>(events: T, event: K, handler: T[K]): void that registers a handler matching the event signature.',
      skeleton: `// Write the on function and demonstrate usage
`,
      solution: `function on<T extends Record<string, (...args: any[]) => void>, K extends keyof T>(
  events: T,
  event: K,
  handler: T[K]
): void {
  events[event] = handler;
}

type Events = {
  click: (x: number, y: number) => void;
  load: () => void;
  error: (msg: string) => void;
};

const handlers = {} as Events;
on(handlers, 'click', (x, y) => console.log(x, y));
on(handlers, 'load', () => console.log('loaded'));
// on(handlers, 'click', (msg: string) => {}); // Error: wrong signature`,
      hints: [
        'T is a record of event names to handler functions. K is a specific event name.',
        'T[K] gives the exact handler type for that event.',
        'The handler parameter T[K] ensures the callback matches the event signature exactly.',
      ],
      concepts: ['practical constraint patterns', 'constraining to callable', 'extends keyof'],
    },
  ],
};
