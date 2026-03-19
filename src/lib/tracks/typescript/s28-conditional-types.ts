import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-conditional',
  title: '28. Conditional Types',
  explanation: `## Conditional Types

Conditional types are **type-level ternary operators**. They let you choose between types based on a condition:

\\\`\\\`\\\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false
\\\`\\\`\\\`

Powerful features:
- **Distributive** behavior: when T is a union, the conditional distributes over each member
- **\\\`infer\\\`** keyword extracts types from patterns (function params, return types, etc.)
- **Recursive** conditional types enable deep type transformations
- Built-in utilities: \\\`Extract\\\`, \\\`Exclude\\\`, \\\`NonNullable\\\`, \\\`ReturnType\\\`, \\\`Parameters\\\` all use conditional types
- Wrap in \\\`[T] extends [U]\\\` to prevent distribution`,
  exercises: [
    {
      id: 'ts-conditional-1',
      title: 'Basic conditional type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the blank to complete the conditional type.',
      skeleton: `type IsNumber<T> = T __BLANK__ number ? 'yes' : 'no';

type A = IsNumber<number>;  // 'yes'
type B = IsNumber<string>;  // 'no'`,
      solution: `type IsNumber<T> = T extends number ? 'yes' : 'no';

type A = IsNumber<number>;  // 'yes'
type B = IsNumber<string>;  // 'no'`,
      hints: [
        'Conditional types use the extends keyword as the condition.',
        'T extends number checks if T is assignable to number.',
        'Replace __BLANK__ with extends.',
      ],
      concepts: ['basic conditional type (extends ? :)'],
    },
    {
      id: 'ts-conditional-2',
      title: 'Conditional with generics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the conditional type to return the element type of an array, or the type itself if not an array.',
      skeleton: `type Flatten<T> = T extends Array<__BLANK__> ? U : T;

type A = Flatten<string[]>;  // string
type B = Flatten<number>;    // number`,
      solution: `type Flatten<T> = T extends Array<infer U> ? U : T;

type A = Flatten<string[]>;  // string
type B = Flatten<number>;    // number`,
      hints: [
        'You need to extract the element type from the array.',
        'The infer keyword creates a type variable during pattern matching.',
        'Replace __BLANK__ with infer U.',
      ],
      concepts: ['conditional with generics', 'conditional type inference (infer)'],
    },
    {
      id: 'ts-conditional-3',
      title: 'Extract utility',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Implement your own Extract type that keeps only union members assignable to U.',
      skeleton: `type MyExtract<T, U> = T extends U __BLANK__ T __BLANK__ never;

type Nums = MyExtract<string | number | boolean, number | string>;
// string | number`,
      solution: `type MyExtract<T, U> = T extends U ? T : never;

type Nums = MyExtract<string | number | boolean, number | string>;
// string | number`,
      hints: [
        'If T (each union member) extends U, keep it. Otherwise, discard it.',
        'Discarding means returning never.',
        'Replace the blanks with ? and : (ternary).',
      ],
      concepts: ['Extract utility', 'distributive conditional types'],
    },
    {
      id: 'ts-conditional-4',
      title: 'Exclude utility',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Implement your own MyExclude<T, U> type that removes union members assignable to U.',
      skeleton: `// Write MyExclude<T, U>
`,
      solution: `type MyExclude<T, U> = T extends U ? never : T;

type Result = MyExclude<'a' | 'b' | 'c', 'a' | 'c'>;
// 'b'`,
      hints: [
        'Exclude is the opposite of Extract.',
        'If T extends U, discard it (never). Otherwise keep it (T).',
        'type MyExclude<T, U> = T extends U ? never : T;',
      ],
      concepts: ['Exclude utility', 'distributive conditional types'],
    },
    {
      id: 'ts-conditional-5',
      title: 'Predict distributive behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What type does ToArray<string | number> produce?',
      skeleton: `type ToArray<T> = T extends any ? T[] : never;

type Result = ToArray<string | number>;`,
      solution: `string[] | number[] (not (string | number)[] because conditional types distribute over unions)`,
      hints: [
        'Conditional types distribute over union members.',
        'Each union member is processed independently: string -> string[], number -> number[].',
        'Result is string[] | number[], not (string | number)[].',
      ],
      concepts: ['distributive conditional types'],
    },
    {
      id: 'ts-conditional-6',
      title: 'NonNullable implementation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Implement NonNullable by excluding null and undefined.',
      skeleton: `type MyNonNullable<T> = T extends __BLANK__ ? never : T;

type Result = MyNonNullable<string | null | undefined>;
// string`,
      solution: `type MyNonNullable<T> = T extends null | undefined ? never : T;

type Result = MyNonNullable<string | null | undefined>;
// string`,
      hints: [
        'NonNullable removes null and undefined from a union.',
        'If T extends null | undefined, discard it.',
        'Replace __BLANK__ with null | undefined.',
      ],
      concepts: ['NonNullable implementation'],
    },
    {
      id: 'ts-conditional-7',
      title: 'Infer in function params',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type FirstArg<T> that extracts the type of the first parameter of a function.',
      skeleton: `// Write FirstArg<T>
`,
      solution: `type FirstArg<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never;

type A = FirstArg<(name: string, age: number) => void>; // string
type B = FirstArg<() => void>; // never`,
      hints: [
        'Use infer to capture the first parameter type.',
        'Pattern match against (first: infer F, ...rest: any[]) => any.',
        'type FirstArg<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never;',
      ],
      concepts: ['infer in function params'],
    },
    {
      id: 'ts-conditional-8',
      title: 'Infer in return types',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Implement your own ReturnType using infer.',
      skeleton: `type MyReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => __BLANK__ ? R : never;

type A = MyReturnType<() => string>; // string
type B = MyReturnType<(x: number) => boolean>; // boolean`,
      solution: `type MyReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R ? R : never;

type A = MyReturnType<() => string>; // string
type B = MyReturnType<(x: number) => boolean>; // boolean`,
      hints: [
        'Use infer to capture the return type of the function.',
        'Match against (...args: any[]) => infer R.',
        'Replace __BLANK__ with infer R.',
      ],
      concepts: ['infer in return types'],
    },
    {
      id: 'ts-conditional-9',
      title: 'Infer in arrays',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type Last<T> that extracts the last element type from a tuple.',
      skeleton: `// Write Last<T>
`,
      solution: `type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;

type A = Last<[1, 2, 3]>; // 3
type B = Last<[string, boolean]>; // boolean`,
      hints: [
        'Use rest elements in tuple patterns with infer.',
        'Match [...any[], infer L] to capture the last element.',
        'type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;',
      ],
      concepts: ['infer in arrays'],
    },
    {
      id: 'ts-conditional-10',
      title: 'Infer in promises',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fill in the blank to extract the resolved type from a Promise.',
      skeleton: `type Awaited2<T> = T extends Promise<__BLANK__> ? R : T;

type A = Awaited2<Promise<string>>; // string
type B = Awaited2<number>; // number`,
      solution: `type Awaited2<T> = T extends Promise<infer R> ? R : T;

type A = Awaited2<Promise<string>>; // string
type B = Awaited2<number>; // number`,
      hints: [
        'Use infer to capture the type inside Promise<>.',
        'Match T extends Promise<infer R>.',
        'Replace __BLANK__ with infer R.',
      ],
      concepts: ['infer in promises'],
    },
    {
      id: 'ts-conditional-11',
      title: 'Non-distributive conditional',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type ToArrayNonDist<T> that wraps the ENTIRE union in an array (not each member). Use the [T] extends [any] trick to prevent distribution.',
      skeleton: `// Write ToArrayNonDist<T>
`,
      solution: `type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type Result = ToArrayNonDist<string | number>;
// (string | number)[]  -- NOT  string[] | number[]`,
      hints: [
        'Wrapping T in a tuple prevents distributive behavior.',
        '[T] extends [any] treats the union as a single unit.',
        'type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;',
      ],
      concepts: ['non-distributive conditionals'],
    },
    {
      id: 'ts-conditional-12',
      title: 'Nested conditional types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type TypeName<T> that returns a string literal describing T: "string", "number", "boolean", "object", or "other".',
      skeleton: `// Write TypeName<T>
`,
      solution: `type TypeName<T> =
  T extends string ? 'string' :
  T extends number ? 'number' :
  T extends boolean ? 'boolean' :
  T extends object ? 'object' :
  'other';

type A = TypeName<string>;  // 'string'
type B = TypeName<42>;      // 'number'
type C = TypeName<true>;    // 'boolean'
type D = TypeName<{ a: 1 }>; // 'object'`,
      hints: [
        'Chain conditional types like nested ternary operators.',
        'Check string first, then number, then boolean, then object, then other.',
        'T extends string ? "string" : T extends number ? "number" : ...',
      ],
      concepts: ['nested conditional types', 'conditional type chains'],
    },
    {
      id: 'ts-conditional-13',
      title: 'Conditional type chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What type does FilterFunctions<Obj> produce?',
      skeleton: `type FilterFunctions<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
};

interface Obj {
  name: string;
  greet: () => string;
  age: number;
  run: (speed: number) => void;
}

type FnOnly = FilterFunctions<Obj>;`,
      solution: `{ greet: () => string; run: (speed: number) => void }`,
      hints: [
        'Keys whose values extend Function are kept. Others are mapped to never.',
        'name (string) and age (number) are filtered out.',
        'Only greet and run remain because they are functions.',
      ],
      concepts: ['conditional type chains', 'conditional mapped types'],
    },
    {
      id: 'ts-conditional-14',
      title: 'Recursive conditional type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type DeepAwaited<T> that recursively unwraps nested Promises: Promise<Promise<string>> becomes string.',
      skeleton: `// Write DeepAwaited<T>
`,
      solution: `type DeepAwaited<T> = T extends Promise<infer U> ? DeepAwaited<U> : T;

type A = DeepAwaited<Promise<Promise<Promise<string>>>>; // string
type B = DeepAwaited<Promise<number>>; // number
type C = DeepAwaited<string>; // string`,
      hints: [
        'If T is a Promise, unwrap it and recurse.',
        'Base case: T is not a Promise, return T as-is.',
        'type DeepAwaited<T> = T extends Promise<infer U> ? DeepAwaited<U> : T;',
      ],
      concepts: ['recursive conditional types'],
    },
    {
      id: 'ts-conditional-15',
      title: 'Fix distributive bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This type is supposed to check if T is exactly never, but it incorrectly distributes. Fix it to properly detect never.',
      skeleton: `type IsNever<T> = T extends never ? true : false;

type Test = IsNever<never>; // Expected: true, Actual: never (distributes over empty union)`,
      solution: `type IsNever<T> = [T] extends [never] ? true : false;

type Test = IsNever<never>; // true`,
      hints: [
        'never is an empty union, so distribution produces nothing (never).',
        'Wrap T in a tuple to prevent distribution.',
        'Change T extends never to [T] extends [never].',
      ],
      concepts: ['non-distributive conditionals', 'conditional type distribution control'],
    },
    {
      id: 'ts-conditional-16',
      title: 'Template literal conditional',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type IsGetter<T> that checks if a string type starts with "get" and returns true or false.',
      skeleton: `// Write IsGetter<T>
`,
      solution: `type IsGetter<T extends string> = T extends \`get\${string}\` ? true : false;

type A = IsGetter<'getName'>; // true
type B = IsGetter<'setName'>; // false
type C = IsGetter<'get'>;     // true`,
      hints: [
        'Use template literal types in the extends clause.',
        'T extends `get${string}` checks if T starts with "get".',
        'type IsGetter<T extends string> = T extends `get${string}` ? true : false;',
      ],
      concepts: ['template literal conditional'],
    },
    {
      id: 'ts-conditional-17',
      title: 'Conditional mapped types',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type OptionalUndefined<T> that makes properties optional if their type includes undefined, and required otherwise.',
      skeleton: `// Write OptionalUndefined<T>
`,
      solution: `type OptionalUndefined<T> = {
  [K in keyof T as undefined extends T[K] ? K : never]?: T[K];
} & {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};

// Usage:
interface Input {
  name: string;
  nickname: string | undefined;
  age: number;
}

type Cleaned = OptionalUndefined<Input>;
// { name: string; age: number; nickname?: string | undefined }`,
      hints: [
        'Split into two mapped types: one for optional keys, one for required keys.',
        'Use undefined extends T[K] to check if the type includes undefined.',
        'Intersect the optional and required parts with &.',
      ],
      concepts: ['conditional mapped types'],
    },
    {
      id: 'ts-conditional-18',
      title: 'Predict infer behavior',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What types do A, B, and C resolve to?',
      skeleton: `type UnpackPromise<T> = T extends Promise<infer U> ? U : T;

type A = UnpackPromise<Promise<string>>;
type B = UnpackPromise<Promise<Promise<number>>>;
type C = UnpackPromise<string>;`,
      solution: `A is string. B is Promise<number> (only one level unwrapped). C is string (not a Promise, returned as-is).`,
      hints: [
        'UnpackPromise only unwraps one level of Promise.',
        'Promise<Promise<number>> unwraps to Promise<number>.',
        'A = string, B = Promise<number>, C = string.',
      ],
      concepts: ['conditional type inference (infer)', 'infer in promises'],
    },
    {
      id: 'ts-conditional-19',
      title: 'Practical conditional patterns',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type Prettify<T> that flattens intersection types into a single object type for better IDE display.',
      skeleton: `// Write Prettify<T>
`,
      solution: `type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

// Usage:
type Ugly = { name: string } & { age: number } & { email: string };
type Pretty = Prettify<Ugly>;
// Shows as: { name: string; age: number; email: string }`,
      hints: [
        'A simple mapped type over keyof T collapses intersections.',
        'Map each key to its own value type.',
        'type Prettify<T> = { [K in keyof T]: T[K] } & {};',
      ],
      concepts: ['practical conditional patterns'],
    },
    {
      id: 'ts-conditional-20',
      title: 'Type-level programming intro',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type IsEqual<A, B> that returns true if A and B are exactly the same type, false otherwise. This must handle edge cases like any, never, and union types.',
      skeleton: `// Write IsEqual<A, B>
`,
      solution: `type IsEqual<A, B> =
  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? true
    : false;

type T1 = IsEqual<string, string>; // true
type T2 = IsEqual<string, number>; // false
type T3 = IsEqual<any, string>;    // false
type T4 = IsEqual<never, never>;   // true`,
      hints: [
        'Simple T extends comparisons fail for any and never edge cases.',
        'The trick is to compare function types that use A and B as conditional constraints.',
        'If (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2), the types are equal.',
      ],
      concepts: ['type-level programming intro'],
    },
  ],
};
