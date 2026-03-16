import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-infer',
  title: '44. The infer Keyword',
  explanation: `## The infer Keyword

The \\\`infer\\\` keyword lets you declare type variables within conditional types. It "captures" part of a type during pattern matching.

### Basic Syntax
\\\`\\\`\\\`typescript
type ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never;
\\\`\\\`\\\`

Here, \\\`infer R\\\` captures the return type into a type variable \\\`R\\\`.

### Where You Can Use infer
- Function return types
- Function parameter types
- Array/tuple element types
- Promise resolution types
- Object property types
- Template literal patterns
- Constructor parameters

### Multiple infer
You can use multiple \\\`infer\\\` clauses in a single conditional:
\\\`\\\`\\\`typescript
type FirstAndLast<T> = T extends [infer F, ...any[], infer L] ? [F, L] : never;
\\\`\\\`\\\`

### infer with Constraints (TS 4.7+)
\\\`\\\`\\\`typescript
type StringOnly<T> = T extends [infer S extends string] ? S : never;
\\\`\\\`\\\`

### Key Rules
- \\\`infer\\\` can only appear in the extends clause of a conditional type.
- The inferred variable is only available in the true branch.
- If the pattern doesn't match, you get the false branch (usually \\\`never\\\`).
`,
  exercises: [
    {
      id: 'ts-infer-1',
      title: 'Infer function return type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the conditional type to infer the return type of a function.',
      skeleton: `type MyReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => __BLANK__ ? R : never;

type Result = MyReturnType<() => string>; // string`,
      solution: `type MyReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R ? R : never;

type Result = MyReturnType<() => string>; // string`,
      hints: [
        'The infer keyword captures a type variable from a pattern.',
        'Place infer before the type variable name in the return position.',
        'The answer is: infer R',
      ],
      concepts: ['infer in conditional types', 'infer function return type'],
    },
    {
      id: 'ts-infer-2',
      title: 'Infer function parameters',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the type to infer the parameter types of a function as a tuple.',
      skeleton: `type MyParameters<T extends (...args: any[]) => any> =
  T extends (__BLANK__) => any ? P : never;

type Params = MyParameters<(a: string, b: number) => void>;
// [a: string, b: number]`,
      solution: `type MyParameters<T extends (...args: any[]) => any> =
  T extends (...args: infer P) => any ? P : never;

type Params = MyParameters<(a: string, b: number) => void>;
// [a: string, b: number]`,
      hints: [
        'Use infer in the parameter position of the function signature.',
        'The rest parameter captures all params as a tuple.',
        'The answer is: ...args: infer P',
      ],
      concepts: ['infer function parameters', 'tuple types'],
    },
    {
      id: 'ts-infer-3',
      title: 'Infer array element type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the type to extract the element type from an array.',
      skeleton: `type ElementOf<T> =
  T extends (__BLANK__)[] ? E : never;

type Item = ElementOf<string[]>; // string
type Num = ElementOf<number[]>; // number`,
      solution: `type ElementOf<T> =
  T extends (infer E)[] ? E : never;

type Item = ElementOf<string[]>; // string
type Num = ElementOf<number[]>; // number`,
      hints: [
        'Use infer inside the array pattern to capture the element type.',
        'The pattern is (infer E)[] to match any array.',
        'The answer is: infer E',
      ],
      concepts: ['infer array element type', 'array pattern matching'],
    },
    {
      id: 'ts-infer-4',
      title: 'Infer Promise resolution type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the type to unwrap one level of Promise.',
      skeleton: `type UnwrapPromise<T> =
  T extends Promise<__BLANK__> ? U : T;

type A = UnwrapPromise<Promise<string>>; // string
type B = UnwrapPromise<number>; // number`,
      solution: `type UnwrapPromise<T> =
  T extends Promise<infer U> ? U : T;

type A = UnwrapPromise<Promise<string>>; // string
type B = UnwrapPromise<number>; // number`,
      hints: [
        'Use infer inside the Promise generic parameter position.',
        'If T is not a Promise, return T unchanged.',
        'The answer is: infer U',
      ],
      concepts: ['infer promise resolution type', 'conditional types'],
    },
    {
      id: 'ts-infer-5',
      title: 'Predict: infer with non-matching type',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What is the resulting type? Write it exactly.',
      skeleton: `type GetReturn<T> = T extends (...args: any[]) => infer R ? R : never;

type Result = GetReturn<string>;
// What is Result?`,
      solution: `never`,
      hints: [
        'string does not match the function pattern.',
        'When the condition is false, the type resolves to the false branch.',
        'The false branch is "never".',
      ],
      concepts: ['conditional types', 'never type', 'pattern matching failure'],
    },
    {
      id: 'ts-infer-6',
      title: 'Infer tuple first element',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the type to extract the first element type from a tuple.',
      skeleton: `type First<T extends any[]> =
  T extends [__BLANK__, ...any[]] ? F : never;

type A = First<[string, number, boolean]>; // string
type B = First<[42, "hello"]>; // 42`,
      solution: `type First<T extends any[]> =
  T extends [infer F, ...any[]] ? F : never;

type A = First<[string, number, boolean]>; // string
type B = First<[42, "hello"]>; // 42`,
      hints: [
        'Use infer in the first position of a tuple pattern.',
        'The rest (...any[]) matches the remaining elements.',
        'The answer is: infer F',
      ],
      concepts: ['infer tuple elements', 'infer first/last of tuple'],
    },
    {
      id: 'ts-infer-7',
      title: 'Write: infer last element',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type Last<T> that extracts the last element type from a tuple.',
      skeleton: `// Define the Last<T> type
`,
      solution: `type Last<T extends any[]> =
  T extends [...any[], infer L] ? L : never;

type A = Last<[string, number, boolean]>; // boolean
type B = Last<[42]>; // 42
type C = Last<[]>; // never`,
      hints: [
        'Use a rest element before infer to capture the last position.',
        'The pattern [...any[], infer L] matches any tuple with at least one element.',
        'An empty tuple returns never since the pattern does not match.',
      ],
      concepts: ['infer first/last of tuple', 'variadic tuple types'],
    },
    {
      id: 'ts-infer-8',
      title: 'Write: infer string pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type ExtractDomain<T> that extracts the domain from an email string literal type. E.g., ExtractDomain<"zan@example.com"> should be "example.com".',
      skeleton: `// Define ExtractDomain<T>
`,
      solution: `type ExtractDomain<T extends string> =
  T extends \`\${string}@\${infer D}\` ? D : never;

type A = ExtractDomain<"zan@example.com">; // "example.com"
type B = ExtractDomain<"admin@forge.dev">; // "forge.dev"
type C = ExtractDomain<"invalid">; // never`,
      hints: [
        'Use a template literal type with infer to match the pattern.',
        'The pattern is \`\${string}@\${infer D}\` to capture everything after @.',
        'The part before @ can be any string, so use \${string}.',
      ],
      concepts: ['infer string patterns', 'template literal types'],
    },
    {
      id: 'ts-infer-9',
      title: 'Infer constructor parameters',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type MyConstructorParams<T> that extracts constructor parameter types, similar to the built-in ConstructorParameters.',
      skeleton: `// Define MyConstructorParams<T>
`,
      solution: `type MyConstructorParams<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;

class User {
  constructor(public name: string, public age: number) {}
}

type UserParams = MyConstructorParams<typeof User>; // [name: string, age: number]`,
      hints: [
        'Constructors use the "new" keyword in their type signature.',
        'Use abstract new to match both abstract and concrete constructors.',
        'The pattern is: T extends abstract new (...args: infer P) => any.',
      ],
      concepts: ['infer constructor params', 'constructor types'],
    },
    {
      id: 'ts-infer-10',
      title: 'Multiple infer in one type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type Split<T> that takes a function type (a: A, b: B) => R and splits it into { args: [A, B]; result: R }.',
      skeleton: `// Define Split<T>
`,
      solution: `type Split<T> = T extends (...args: infer A) => infer R
  ? { args: A; result: R }
  : never;

type Info = Split<(name: string, age: number) => boolean>;
// { args: [name: string, age: number]; result: boolean }`,
      hints: [
        'You can use multiple infer declarations in one conditional type.',
        'Capture both the parameters (infer A) and return type (infer R).',
        'Build the result object from both captured types.',
      ],
      concepts: ['multiple infer in one type', 'destructuring function types'],
    },
    {
      id: 'ts-infer-11',
      title: 'Infer with constraints',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type ExtractString<T> that infers a value from a wrapper but constrains it to be a string. Use infer...extends syntax (TS 4.7+).',
      skeleton: `// Define ExtractString<T>
`,
      solution: `type Wrapper<T> = { value: T };

type ExtractString<T> =
  T extends Wrapper<infer V extends string> ? V : never;

type A = ExtractString<Wrapper<"hello">>; // "hello"
type B = ExtractString<Wrapper<42>>; // never
type C = ExtractString<Wrapper<string>>; // string`,
      hints: [
        'Since TS 4.7, you can add constraints to infer: infer V extends string.',
        'This ensures the inferred type is assignable to string.',
        'If the value is not a string, the condition fails and returns never.',
      ],
      concepts: ['infer with constraints', 'conditional type narrowing'],
    },
    {
      id: 'ts-infer-12',
      title: 'Predict: nested infer',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What is the resulting type? Write it exactly.',
      skeleton: `type InnerValue<T> =
  T extends Promise<Array<infer U>> ? U : never;

type Result = InnerValue<Promise<Array<{ id: number }>>>;
// What is Result?`,
      solution: `{ id: number }`,
      hints: [
        'First the type matches Promise<...>, then Array<...>, then infers U.',
        'The array element type is { id: number }.',
        'infer captures the innermost pattern matched.',
      ],
      concepts: ['infer property types', 'nested patterns'],
    },
    {
      id: 'ts-infer-13',
      title: 'Fix: infer in wrong position',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix this type that tries to use infer outside of a conditional type extends clause.',
      skeleton: `type GetValue<T> = {
  value: infer V;
};

type Result = GetValue<{ value: string }>; // Should be string`,
      solution: `type GetValue<T> = T extends { value: infer V } ? V : never;

type Result = GetValue<{ value: string }>; // string`,
      hints: [
        'infer can only be used in the extends clause of a conditional type.',
        'You need a conditional type: T extends ... ? ... : ...',
        'Match T against { value: infer V } in the extends clause.',
      ],
      concepts: ['infer rules', 'conditional types', 'debugging infer'],
    },
    {
      id: 'ts-infer-14',
      title: 'Infer in recursive types',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type DeepAwaited<T> that recursively unwraps nested Promises.',
      skeleton: `// Define DeepAwaited<T>
`,
      solution: `type DeepAwaited<T> =
  T extends Promise<infer U>
    ? DeepAwaited<U>
    : T;

type A = DeepAwaited<Promise<Promise<Promise<string>>>>; // string
type B = DeepAwaited<Promise<number>>; // number
type C = DeepAwaited<string>; // string`,
      hints: [
        'If T is a Promise, unwrap it and recurse.',
        'If T is not a Promise, return T as-is.',
        'Use: T extends Promise<infer U> ? DeepAwaited<U> : T.',
      ],
      concepts: ['infer in recursive types', 'recursive conditional types'],
    },
    {
      id: 'ts-infer-15',
      title: 'Infer union members',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type ExtractPromises<T> that, given a union, extracts only the Promise members and unwraps them to get their resolved types.',
      skeleton: `// Define ExtractPromises<T>
`,
      solution: `type ExtractPromises<T> =
  T extends Promise<infer U> ? U : never;

type Mixed = string | Promise<number> | boolean | Promise<string[]>;

type Resolved = ExtractPromises<Mixed>;
// number | string[]`,
      hints: [
        'Conditional types distribute over unions automatically.',
        'Each union member is checked against the pattern independently.',
        'Only Promise members match; non-Promise members resolve to never.',
      ],
      concepts: ['infer union members', 'distributive conditional types'],
    },
    {
      id: 'ts-infer-16',
      title: 'Infer generic arguments',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type InferMapTypes<T> that extracts both the key and value types from a Map<K, V>.',
      skeleton: `// Define InferMapTypes<T>
`,
      solution: `type InferMapTypes<T> =
  T extends Map<infer K, infer V>
    ? { key: K; value: V }
    : never;

type M = InferMapTypes<Map<string, number>>;
// { key: string; value: number }

type M2 = InferMapTypes<Map<number, boolean[]>>;
// { key: number; value: boolean[] }`,
      hints: [
        'Use two infer variables inside Map<infer K, infer V>.',
        'Return the captured types in a structured object.',
        'If T is not a Map, return never.',
      ],
      concepts: ['infer generic arguments', 'multiple infer'],
    },
    {
      id: 'ts-infer-17',
      title: 'Infer with template literals',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type ParseRoute<T> that extracts parameter names from a URL route pattern like "/users/:id/posts/:postId" into a union type.',
      skeleton: `// Define ParseRoute<T>
`,
      solution: `type ParseRoute<T extends string> =
  T extends \`\${string}:\${infer Param}/\${infer Rest}\`
    ? Param | ParseRoute<Rest>
    : T extends \`\${string}:\${infer Param}\`
      ? Param
      : never;

type Params = ParseRoute<"/users/:id/posts/:postId">;
// "id" | "postId"`,
      hints: [
        'Use template literal types with infer to match route segments.',
        'Recursively process the remaining path after each parameter.',
        'Handle both mid-path params (followed by /) and end-of-path params.',
      ],
      concepts: ['infer with template literals', 'recursive template parsing'],
    },
    {
      id: 'ts-infer-18',
      title: 'Infer method return type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type MethodReturn<T, K> that extracts the return type of a specific method from an object type.',
      skeleton: `// Define MethodReturn<T, K>
`,
      solution: `type MethodReturn<T, K extends keyof T> =
  T[K] extends (...args: any[]) => infer R ? R : never;

interface Service {
  getUser(id: number): { name: string };
  getCount(): number;
  label: string;
}

type UserReturn = MethodReturn<Service, 'getUser'>; // { name: string }
type CountReturn = MethodReturn<Service, 'getCount'>; // number
type LabelReturn = MethodReturn<Service, 'label'>; // never`,
      hints: [
        'First access the property type with T[K].',
        'Then check if it is a function and infer the return type.',
        'Non-function properties resolve to never.',
      ],
      concepts: ['infer method return', 'property access types'],
    },
    {
      id: 'ts-infer-19',
      title: 'Practical: type-safe event handler extractor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type EventPayload<T, E> that, given an event map type and an event name, extracts the payload type from the handler function.',
      skeleton: `// Define EventPayload<T, E>
`,
      solution: `type EventPayload<
  T extends Record<string, (...args: any[]) => any>,
  E extends keyof T
> = T[E] extends (payload: infer P) => any ? P : never;

interface EventMap {
  click: (payload: { x: number; y: number }) => void;
  submit: (payload: { data: FormData }) => void;
  close: () => void;
}

type ClickPayload = EventPayload<EventMap, 'click'>;
// { x: number; y: number }

type ClosePayload = EventPayload<EventMap, 'close'>;
// never (no payload parameter)`,
      hints: [
        'Access the handler with T[E], then infer the first parameter.',
        'If the handler has no parameters, the pattern fails and returns never.',
        'Constrain T to Record<string, (...args: any[]) => any>.',
      ],
      concepts: ['practical infer patterns', 'event systems', 'type extraction'],
    },
    {
      id: 'ts-infer-20',
      title: 'Refactor: replace manual types with infer',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor these manually maintained types to use infer-based extraction from the source functions.',
      skeleton: `function fetchUser(id: number): Promise<{ name: string; email: string }> {
  return fetch(\\\`/users/\${id}\\\`).then(r => r.json());
}

function fetchPosts(userId: number, page: number): Promise<{ title: string; body: string }[]> {
  return fetch(\\\`/users/\${userId}/posts?page=\${page}\\\`).then(r => r.json());
}

// Manually maintained -- will get out of sync!
type User = { name: string; email: string };
type Post = { title: string; body: string };
type FetchUserParams = [id: number];
type FetchPostsParams = [userId: number, page: number];`,
      solution: `function fetchUser(id: number): Promise<{ name: string; email: string }> {
  return fetch(\\\`/users/\${id}\\\`).then(r => r.json());
}

function fetchPosts(userId: number, page: number): Promise<{ title: string; body: string }[]> {
  return fetch(\\\`/users/\${userId}/posts?page=\${page}\\\`).then(r => r.json());
}

type User = Awaited<ReturnType<typeof fetchUser>>;
type Post = Awaited<ReturnType<typeof fetchPosts>>[number];
type FetchUserParams = Parameters<typeof fetchUser>;
type FetchPostsParams = Parameters<typeof fetchPosts>;`,
      hints: [
        'Use ReturnType<typeof fn> to extract return types from functions.',
        'Wrap with Awaited<> to unwrap the Promise.',
        'Use Parameters<typeof fn> for parameter types, and [number] to get array element type.',
      ],
      concepts: ['practical infer patterns', 'ReturnType', 'Awaited', 'Parameters', 'DRY types'],
    },
  ],
};
