import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-recursive',
  title: '45. Recursive Types',
  explanation: `## Recursive Types

A recursive type references itself in its own definition. This is essential for modeling data structures like trees, linked lists, JSON, and deeply nested objects.

### Basic Recursive Type
\\\`\\\`\\\`typescript
type LinkedList<T> = { value: T; next: LinkedList<T> | null };
\\\`\\\`\\\`

### JSON Type
\\\`\\\`\\\`typescript
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
\\\`\\\`\\\`

### Deep Transformations
You can create recursive mapped types to deeply transform objects:
\\\`\\\`\\\`typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
\\\`\\\`\\\`

### Recursive Conditional Types (TS 4.1+)
Conditional types can recurse to process variadic or nested types.

### Depth Limiting
Deeply recursive types can hit TypeScript's recursion limit. Use depth counters or tail recursion patterns to manage this.

### Tail Recursion Optimization (TS 4.5+)
TypeScript can optimize certain recursive conditional types that accumulate results in a tail position.
`,
  exercises: [
    {
      id: 'ts-recursive-1',
      title: 'Linked list type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the recursive type definition for a singly linked list.',
      skeleton: `type ListNode<T> = {
  value: T;
  next: __BLANK__;
};

const list: ListNode<number> = {
  value: 1,
  next: { value: 2, next: { value: 3, next: null } },
};`,
      solution: `type ListNode<T> = {
  value: T;
  next: ListNode<T> | null;
};

const list: ListNode<number> = {
  value: 1,
  next: { value: 2, next: { value: 3, next: null } },
};`,
      hints: [
        'The next node is either another ListNode or null (end of list).',
        'A recursive type references itself by name.',
        'The answer is: ListNode<T> | null',
      ],
      concepts: ['recursive type alias', 'linked list type'],
    },
    {
      id: 'ts-recursive-2',
      title: 'Tree type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the recursive tree node type. Each node has a value and an array of children.',
      skeleton: `type TreeNode<T> = {
  value: T;
  children: __BLANK__;
};

const tree: TreeNode<string> = {
  value: "root",
  children: [
    { value: "child1", children: [] },
    { value: "child2", children: [{ value: "grandchild", children: [] }] },
  ],
};`,
      solution: `type TreeNode<T> = {
  value: T;
  children: TreeNode<T>[];
};

const tree: TreeNode<string> = {
  value: "root",
  children: [
    { value: "child1", children: [] },
    { value: "child2", children: [{ value: "grandchild", children: [] }] },
  ],
};`,
      hints: [
        'Children is an array of the same node type.',
        'Use the type name recursively inside an array type.',
        'The answer is: TreeNode<T>[]',
      ],
      concepts: ['tree type', 'recursive type alias'],
    },
    {
      id: 'ts-recursive-3',
      title: 'JSON type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the recursive JSON value type that represents any valid JSON.',
      skeleton: `type JsonValue =
  | string
  | number
  | boolean
  | null
  | __BLANK__
  | { [key: string]: JsonValue };

const data: JsonValue = {
  name: "test",
  scores: [1, 2, 3],
  nested: { deep: { value: true } },
};`,
      solution: `type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const data: JsonValue = {
  name: "test",
  scores: [1, 2, 3],
  nested: { deep: { value: true } },
};`,
      hints: [
        'JSON arrays contain JSON values.',
        'Use the type name itself inside an array.',
        'The answer is: JsonValue[]',
      ],
      concepts: ['JSON type', 'recursive unions'],
    },
    {
      id: 'ts-recursive-4',
      title: 'Deep Readonly',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the DeepReadonly type that makes all properties readonly at every depth.',
      skeleton: `type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? __BLANK__
    : T[K];
};

type Config = {
  db: { host: string; port: number };
  debug: boolean;
};

const cfg: DeepReadonly<Config> = { db: { host: "localhost", port: 5432 }, debug: true };
// cfg.db.host = "x"; // Error!`,
      solution: `type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};

type Config = {
  db: { host: string; port: number };
  debug: boolean;
};

const cfg: DeepReadonly<Config> = { db: { host: "localhost", port: 5432 }, debug: true };
// cfg.db.host = "x"; // Error!`,
      hints: [
        'When the property is an object, apply DeepReadonly recursively.',
        'Use the same type name for the recursive branch.',
        'The answer is: DeepReadonly<T[K]>',
      ],
      concepts: ['deep readonly', 'recursive mapped types'],
    },
    {
      id: 'ts-recursive-5',
      title: 'Predict: recursive depth',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What is the type of result? Write "string" or "DeepReadonly<string>" or "readonly string".',
      skeleton: `type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};

type X = DeepReadonly<{ a: { b: string } }>;
// What is X["a"]["b"]?`,
      solution: `string`,
      hints: [
        'string is not an object type, so recursion stops.',
        'The base case returns T[K] as-is for primitives.',
        'X["a"]["b"] is string (the readonly modifier is on the property, not the value).',
      ],
      concepts: ['recursive base case', 'mapped type behavior'],
    },
    {
      id: 'ts-recursive-6',
      title: 'Write: Deep Partial',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a DeepPartial<T> type that makes all properties optional at every depth.',
      skeleton: `// Define DeepPartial<T>
`,
      solution: `type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type Config = {
  db: { host: string; port: number };
  cache: { ttl: number; enabled: boolean };
};

const partial: DeepPartial<Config> = {
  db: { host: "localhost" },
  // port, cache, ttl, enabled are all optional
};`,
      hints: [
        'Similar to DeepReadonly but use ? instead of readonly.',
        'Each property becomes optional, and objects recurse.',
        'type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] }',
      ],
      concepts: ['deep partial', 'recursive mapped types'],
    },
    {
      id: 'ts-recursive-7',
      title: 'Write: Deep Required',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a DeepRequired<T> type that makes all properties required at every depth.',
      skeleton: `// Define DeepRequired<T>
`,
      solution: `type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

type PartialConfig = {
  db?: { host?: string; port?: number };
  debug?: boolean;
};

type FullConfig = DeepRequired<PartialConfig>;
// All properties are required at every level`,
      hints: [
        'Use the -? modifier to remove optional from each property.',
        'Recurse into object properties with DeepRequired<T[K]>.',
        'The -? syntax strips the optional modifier.',
      ],
      concepts: ['deep required', 'mapped type modifiers', '-? syntax'],
    },
    {
      id: 'ts-recursive-8',
      title: 'Write: Deep Mutable',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a DeepMutable<T> type that removes readonly from all properties at every depth.',
      skeleton: `// Define DeepMutable<T>
`,
      solution: `type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

type Frozen = {
  readonly name: string;
  readonly settings: {
    readonly theme: string;
    readonly lang: string;
  };
};

type Mutable = DeepMutable<Frozen>;
// All readonly modifiers removed at every level`,
      hints: [
        'Use -readonly to remove the readonly modifier.',
        'Recurse into object properties.',
        '-readonly [K in keyof T]: ... strips readonly from each property.',
      ],
      concepts: ['deep mutable', 'mapped type modifiers', '-readonly syntax'],
    },
    {
      id: 'ts-recursive-9',
      title: 'Fix: recursive type infinite loop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix this DeepReadonly that incorrectly recurses into arrays, dates, and other built-in objects.',
      skeleton: `type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};

// Problem: Date, Array, Map etc. get their methods made readonly too
type Config = {
  items: string[];
  created: Date;
  tags: Set<string>;
};

type FrozenConfig = DeepReadonly<Config>;`,
      solution: `type DeepReadonly<T> = T extends Date | RegExp | Set<any> | Map<any, any>
  ? T
  : T extends Array<infer U>
    ? ReadonlyArray<DeepReadonly<U>>
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T;

type Config = {
  items: string[];
  created: Date;
  tags: Set<string>;
};

type FrozenConfig = DeepReadonly<Config>;`,
      hints: [
        'Built-in types like Date, Set, Map should not be recursed into.',
        'Check for these types first and return them as-is.',
        'Arrays should become ReadonlyArray with recursively frozen elements.',
      ],
      concepts: ['recursive types', 'built-in type handling', 'conditional types'],
    },
    {
      id: 'ts-recursive-10',
      title: 'Recursive array flatten type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type Flatten<T> that recursively flattens nested array types into a single flat array type.',
      skeleton: `// Define Flatten<T>
`,
      solution: `type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type A = Flatten<number[][][]>; // number
type B = Flatten<string[]>; // string
type C = Flatten<boolean>; // boolean

type FlatArray<T> = Flatten<T>[];

type D = FlatArray<number[][][]>; // number[]`,
      hints: [
        'If T is an array, extract the element type and recurse.',
        'If T is not an array, return T (base case).',
        'T extends Array<infer U> ? Flatten<U> : T',
      ],
      concepts: ['recursive array flattening', 'infer', 'conditional types'],
    },
    {
      id: 'ts-recursive-11',
      title: 'Path extraction type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type Paths<T> that extracts all possible dot-separated property paths from a nested object type.',
      skeleton: `// Define Paths<T>
`,
      solution: `type Paths<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? K | \`\${K}.\${Paths<T[K]>}\`
        : K;
    }[keyof T & string]
  : never;

type Config = {
  db: {
    host: string;
    port: number;
  };
  app: {
    name: string;
  };
};

type ConfigPaths = Paths<Config>;
// "db" | "db.host" | "db.port" | "app" | "app.name"`,
      hints: [
        'For each key K, if the value is an object, generate both K and K.subpaths.',
        'Use template literal types to join keys with dots.',
        'Index into the mapped type with [keyof T & string] to get a union of all paths.',
      ],
      concepts: ['path extraction recursive', 'template literal types', 'mapped types'],
    },
    {
      id: 'ts-recursive-12',
      title: 'Predict: recursive conditional type',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What is the resulting type? Write it exactly.',
      skeleton: `type TupleToUnion<T extends any[]> =
  T extends [infer First, ...infer Rest]
    ? First | TupleToUnion<Rest>
    : never;

type Result = TupleToUnion<[string, number, boolean]>;
// What is Result?`,
      solution: `string | number | boolean`,
      hints: [
        'The type extracts the first element and recurses on the rest.',
        'First iteration: string | TupleToUnion<[number, boolean]>.',
        'Fully expanded: string | number | boolean | never, which simplifies to string | number | boolean.',
      ],
      concepts: ['recursive conditional types', 'tuple processing', 'union building'],
    },
    {
      id: 'ts-recursive-13',
      title: 'Write: Deep Pick',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type DeepPick<T, Path> that picks a nested property by dot-separated path string.',
      skeleton: `// Define DeepPick<T, Path>
`,
      solution: `type DeepPick<T, Path extends string> =
  Path extends \`\${infer Key}.\${infer Rest}\`
    ? Key extends keyof T
      ? { [K in Key]: DeepPick<T[K], Rest> }
      : never
    : Path extends keyof T
      ? { [K in Path]: T[K] }
      : never;

type Config = {
  db: { host: string; port: number };
  app: { name: string; version: string };
};

type DBHost = DeepPick<Config, "db.host">;
// { db: { host: string } }`,
      hints: [
        'Split the path at the first dot to get the current key and remaining path.',
        'Use template literal infer: Path extends \`\${infer Key}.\${infer Rest}\`.',
        'When no dot remains, you have reached the leaf -- pick that single key.',
      ],
      concepts: ['deep pick', 'recursive template literals', 'path-based types'],
    },
    {
      id: 'ts-recursive-14',
      title: 'Write: Deep Omit',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type DeepOmit<T, Path> that removes a nested property by dot-separated path string.',
      skeleton: `// Define DeepOmit<T, Path>
`,
      solution: `type DeepOmit<T, Path extends string> =
  Path extends \`\${infer Key}.\${infer Rest}\`
    ? {
        [K in keyof T]: K extends Key ? DeepOmit<T[K], Rest> : T[K];
      }
    : Omit<T, Path>;

type Config = {
  db: { host: string; port: number; password: string };
  app: { name: string };
};

type SafeConfig = DeepOmit<Config, "db.password">;
// { db: { host: string; port: number }; app: { name: string } }`,
      hints: [
        'If the path has a dot, recurse into the matching key while keeping others unchanged.',
        'If no dot, use built-in Omit at the current level.',
        'Map over keys: if K matches the current segment, recurse; otherwise keep as-is.',
      ],
      concepts: ['deep omit', 'recursive mapped types', 'path-based types'],
    },
    {
      id: 'ts-recursive-15',
      title: 'Fix: depth limit exceeded',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix this recursive type that hits the TypeScript recursion limit by adding a depth counter.',
      skeleton: `type DeepFlatten<T> = T extends object
  ? { [K in keyof T]: DeepFlatten<T[K]> }[keyof T]
  : T;

// Hits recursion limit on deeply nested types`,
      solution: `type DeepFlatten<T, Depth extends number[] = []> =
  Depth['length'] extends 10
    ? T
    : T extends object
      ? { [K in keyof T]: DeepFlatten<T[K], [...Depth, 0]> }[keyof T]
      : T;`,
      hints: [
        'Use a tuple as a counter: each recursive step adds an element.',
        'Check the tuple length to stop recursion at a maximum depth.',
        'When Depth[\'length\'] extends N, return T to stop.',
      ],
      concepts: ['depth limiting', 'recursive types', 'tuple counter pattern'],
    },
    {
      id: 'ts-recursive-16',
      title: 'Recursive template literal: string repeat',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type Repeat<S, N> that repeats a string literal type N times. Use a tuple counter for the number.',
      skeleton: `// Define Repeat<S, N>
`,
      solution: `type Repeat<
  S extends string,
  N extends number,
  Acc extends string = '',
  Counter extends any[] = []
> = Counter['length'] extends N
  ? Acc
  : Repeat<S, N, \`\${Acc}\${S}\`, [...Counter, 0]>;

type A = Repeat<"ha", 3>; // "hahaha"
type B = Repeat<"ab", 2>; // "abab"`,
      hints: [
        'Use an accumulator string and a tuple counter.',
        'Each step appends S to the accumulator and increments the counter.',
        'Stop when the counter length equals N.',
      ],
      concepts: ['recursive template literals', 'tuple counter', 'string accumulator'],
    },
    {
      id: 'ts-recursive-17',
      title: 'Predict: tail recursion optimization',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Does this type compile for Length<1000>? Write "Compiles" or "Error".',
      skeleton: `// Tail-recursive version (TS 4.5+)
type Length<
  N extends number,
  Acc extends any[] = []
> = Acc['length'] extends N
  ? Acc
  : Length<N, [...Acc, 0]>;

type Big = Length<1000>;`,
      solution: `Compiles`,
      hints: [
        'TypeScript 4.5+ optimizes tail-recursive conditional types.',
        'The accumulator pattern (building a tuple in tail position) is optimized.',
        'This compiles because TypeScript recognizes the tail recursion pattern.',
      ],
      concepts: ['tail recursion optimization', 'recursive types', 'TypeScript 4.5'],
    },
    {
      id: 'ts-recursive-18',
      title: 'Write: recursive JSON path accessor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type Get<T, Path> that retrieves the type at a dot-separated path in a nested object. Return never if the path is invalid.',
      skeleton: `// Define Get<T, Path>
`,
      solution: `type Get<T, Path extends string> =
  Path extends \`\${infer Key}.\${infer Rest}\`
    ? Key extends keyof T
      ? Get<T[Key], Rest>
      : never
    : Path extends keyof T
      ? T[Path]
      : never;

type Data = {
  user: {
    profile: {
      name: string;
      age: number;
    };
    settings: {
      theme: string;
    };
  };
};

type Name = Get<Data, "user.profile.name">; // string
type Theme = Get<Data, "user.settings.theme">; // string
type Invalid = Get<Data, "user.nope">; // never`,
      hints: [
        'Split the path into the first key and the rest at each step.',
        'If the key exists in T, recurse with the remaining path.',
        'When no dot remains, return T[Path] directly.',
      ],
      concepts: ['recursive conditional types', 'path accessor', 'template literal parsing'],
    },
    {
      id: 'ts-recursive-19',
      title: 'Refactor: flatten nested type aliases',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor these manually flattened types into a single recursive FlattenObject type that merges nested objects into dot-separated keys.',
      skeleton: `// Manual flattening -- tedious and error-prone
type OriginalConfig = {
  db: { host: string; port: number };
  cache: { ttl: number; redis: { url: string } };
};

type FlatConfig = {
  "db.host": string;
  "db.port": number;
  "cache.ttl": number;
  "cache.redis.url": string;
};`,
      solution: `type FlattenObject<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends object
    ? FlattenObject<T[K], \`\${Prefix}\${K}.\`>
    : { [P in \`\${Prefix}\${K}\`]: T[K] };
}[keyof T & string] extends infer U
  ? U extends object
    ? { [K in keyof U as K extends string ? K : never]: U[K] }
    : never
  : never;

// Simpler working version:
type Flatten<T, Prefix extends string = ''> = {
  [K in keyof T & string as T[K] extends object
    ? never
    : \`\${Prefix}\${K}\`]: T[K];
} & {
  [K in keyof T & string as T[K] extends object
    ? K
    : never]: never;
} extends infer O
  ? { [K in keyof Flatten2<T, Prefix>]: Flatten2<T, Prefix>[K] }
  : never;

type Flatten2<T, Prefix extends string = ''> =
  UnionToIntersection<
    {
      [K in keyof T & string]: T[K] extends object
        ? Flatten2<T[K], \`\${Prefix}\${K}.\`>
        : { [P in \`\${Prefix}\${K}\`]: T[K] };
    }[keyof T & string]
  >;

type UnionToIntersection<U> =
  (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;

type OriginalConfig = {
  db: { host: string; port: number };
  cache: { ttl: number; redis: { url: string } };
};

type FlatConfig = Flatten2<OriginalConfig>;
// { "db.host": string; "db.port": number; "cache.ttl": number; "cache.redis.url": string }`,
      hints: [
        'Use recursive mapped types with key remapping to generate dot-separated keys.',
        'For leaf properties, emit the full path. For objects, recurse deeper.',
        'UnionToIntersection merges the distributed object types into one.',
      ],
      concepts: ['recursive mapped types', 'key remapping', 'flatten type', 'practical recursive type patterns'],
    },
    {
      id: 'ts-recursive-20',
      title: 'Refactor: manual validation to recursive type',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this manual deep comparison into a recursive DeepEqual<A, B> type that returns true or false.',
      skeleton: `// Manual approach
type AreEqual1 = { name: string; age: number } extends { name: string; age: number } ? true : false;
type AreEqual2 = { a: { b: number } } extends { a: { b: number } } ? true : false;
// Need a generic reusable approach`,
      solution: `type DeepEqual<A, B> =
  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? true
    : false;

type Test1 = DeepEqual<{ name: string; age: number }, { name: string; age: number }>; // true
type Test2 = DeepEqual<{ name: string }, { name: string; age: number }>; // false
type Test3 = DeepEqual<{ a: { b: number } }, { a: { b: number } }>; // true
type Test4 = DeepEqual<{ a: { b: number } }, { a: { b: string } }>; // false`,
      hints: [
        'A simple extends check is not sufficient -- it only checks assignability, not equality.',
        'The canonical approach uses a deferred conditional type trick.',
        '(<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) checks structural equality.',
      ],
      concepts: ['recursive types', 'type equality', 'conditional type tricks'],
    },
  ],
};
