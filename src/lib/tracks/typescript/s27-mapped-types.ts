import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-mapped',
  title: '27. Mapped Types',
  explanation: `## Mapped Types

Mapped types let you **transform every property** of an existing type into a new type. They iterate over keys using \\\`in keyof\\\`.

\\\`\\\`\\\`typescript
// Built-in Partial -- makes all properties optional
type Partial<T> = {
  [K in keyof T]?: T[K];
};

// Built-in Readonly -- makes all properties readonly
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};
\\\`\\\`\\\`

Power features:
- **\\\`-?\\\`** removes optional, **\\\`-readonly\\\`** removes readonly
- **\\\`as\\\`** remaps keys (rename, filter, transform)
- Template literal keys: \\\`\\\${K}Changed\\\` creates new key names
- Combine with conditionals for advanced filtering
- Mapped types preserve the modifier state unless you change it`,
  exercises: [
    {
      id: 'ts-mapped-1',
      title: 'Basic mapped type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the blank to create a mapped type that converts all properties to boolean.',
      skeleton: `type Flags<T> = {
  [K __BLANK__ keyof T]: boolean;
};

interface Features {
  darkMode: string;
  notifications: string;
}

type FeatureFlags = Flags<Features>;
// { darkMode: boolean; notifications: boolean }`,
      solution: `type Flags<T> = {
  [K in keyof T]: boolean;
};

interface Features {
  darkMode: string;
  notifications: string;
}

type FeatureFlags = Flags<Features>;
// { darkMode: boolean; notifications: boolean }`,
      hints: [
        'Mapped types iterate over keys using which keyword?',
        'The in keyword iterates over a union of keys.',
        'Replace __BLANK__ with in.',
      ],
      concepts: ['basic mapped type', 'keyof in mapped types'],
    },
    {
      id: 'ts-mapped-2',
      title: 'Readonly mapped type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the blank to make all properties readonly.',
      skeleton: `type MyReadonly<T> = {
  __BLANK__ [K in keyof T]: T[K];
};`,
      solution: `type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};`,
      hints: [
        'Which modifier prevents reassignment of properties?',
        'Place readonly before the key mapping.',
        'Replace __BLANK__ with readonly.',
      ],
      concepts: ['readonly mapped type', 'Readonly implementation'],
    },
    {
      id: 'ts-mapped-3',
      title: 'Optional mapped type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the blank to make all properties optional.',
      skeleton: `type MyPartial<T> = {
  [K in keyof T]__BLANK__: T[K];
};`,
      solution: `type MyPartial<T> = {
  [K in keyof T]?: T[K];
};`,
      hints: [
        'Which modifier makes a property optional?',
        'The ? after the key makes it optional.',
        'Replace __BLANK__ with ?.',
      ],
      concepts: ['optional mapped type', 'Partial implementation'],
    },
    {
      id: 'ts-mapped-4',
      title: 'Removing modifiers',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the blank to remove the optional modifier, making all properties required.',
      skeleton: `type MyRequired<T> = {
  [K in keyof T]__BLANK__: T[K];
};`,
      solution: `type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};`,
      hints: [
        'How do you remove a modifier in a mapped type?',
        'Prefix the modifier with - to remove it.',
        'Replace __BLANK__ with -?.',
      ],
      concepts: ['removing modifiers (-readonly, -?)', 'Required implementation'],
    },
    {
      id: 'ts-mapped-5',
      title: 'Record implementation',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Implement your own MyRecord<K, V> type that creates an object type with keys of type K and values of type V.',
      skeleton: `// Write MyRecord<K, V>
`,
      solution: `type MyRecord<K extends string | number | symbol, V> = {
  [P in K]: V;
};

// Usage:
type UserRoles = MyRecord<'admin' | 'user' | 'guest', boolean>;
// { admin: boolean; user: boolean; guest: boolean }`,
      hints: [
        'K must extend string | number | symbol to be valid keys.',
        'Map over K using [P in K] and set the value type to V.',
        'type MyRecord<K extends string | number | symbol, V> = { [P in K]: V };',
      ],
      concepts: ['Record implementation'],
    },
    {
      id: 'ts-mapped-6',
      title: 'Pick implementation',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Implement your own MyPick<T, K> that extracts specified properties from T.',
      skeleton: `// Write MyPick<T, K>
`,
      solution: `type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Usage:
interface User {
  name: string;
  age: number;
  email: string;
}
type NameAndEmail = MyPick<User, 'name' | 'email'>;
// { name: string; email: string }`,
      hints: [
        'K extends keyof T to ensure only valid keys are selected.',
        'Map over K (the selected keys) instead of keyof T.',
        'type MyPick<T, K extends keyof T> = { [P in K]: T[P] };',
      ],
      concepts: ['Pick implementation'],
    },
    {
      id: 'ts-mapped-7',
      title: 'Omit implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Implement your own MyOmit<T, K> using MyPick and Exclude.',
      skeleton: `// Write MyOmit<T, K>
`,
      solution: `type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

// Usage:
interface User {
  name: string;
  age: number;
  email: string;
}
type WithoutEmail = MyOmit<User, 'email'>;
// { name: string; age: number }`,
      hints: [
        'Omit is the opposite of Pick -- keep everything except K.',
        'Use Exclude<keyof T, K> to get all keys except K.',
        'type MyOmit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] };',
      ],
      concepts: ['Omit implementation'],
    },
    {
      id: 'ts-mapped-8',
      title: 'Key remapping with as',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fill in the blank to remap keys to getter method names.',
      skeleton: `type Getters<T> = {
  [K in keyof T __BLANK__ \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number }`,
      solution: `type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number }`,
      hints: [
        'Key remapping uses the as keyword after the key variable.',
        'as lets you transform the key name using template literals.',
        'Replace __BLANK__ with as.',
      ],
      concepts: ['key remapping (as)', 'mapping with template literals'],
    },
    {
      id: 'ts-mapped-9',
      title: 'Filtering keys',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type OnlyStrings<T> that keeps only the properties whose values are strings.',
      skeleton: `// Write OnlyStrings<T>
`,
      solution: `type OnlyStrings<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

// Usage:
interface Mixed {
  name: string;
  age: number;
  email: string;
  active: boolean;
}
type StringProps = OnlyStrings<Mixed>;
// { name: string; email: string }`,
      hints: [
        'Use key remapping with as and a conditional type.',
        'If T[K] extends string, keep K. Otherwise, remap to never (which removes the key).',
        '[K in keyof T as T[K] extends string ? K : never]: T[K];',
      ],
      concepts: ['filtering keys', 'mapped type with conditionals'],
    },
    {
      id: 'ts-mapped-10',
      title: 'Predict mapped type output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What type does Nullable<User> produce?',
      skeleton: `type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

interface User {
  name: string;
  age: number;
}

type NullableUser = Nullable<User>;`,
      solution: `{ name: string | null; age: number | null }`,
      hints: [
        'Nullable maps each property to its original type OR null.',
        'name becomes string | null, age becomes number | null.',
        '{ name: string | null; age: number | null }.',
      ],
      concepts: ['mapping to new value types', 'basic mapped type'],
    },
    {
      id: 'ts-mapped-11',
      title: 'Mapping with template literals',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type EventMap<T> that transforms each key K into an on${Capitalize<K>} method accepting a callback.',
      skeleton: `// Write EventMap<T>
`,
      solution: `type EventMap<T> = {
  [K in keyof T & string as \`on\${Capitalize<K>}\`]: (value: T[K]) => void;
};

// Usage:
interface Events {
  click: { x: number; y: number };
  load: undefined;
}

type EventHandlers = EventMap<Events>;
// { onClick: (value: { x: number; y: number }) => void; onLoad: (value: undefined) => void }`,
      hints: [
        'Use key remapping with as and a template literal type.',
        'as `on${Capitalize<K>}` transforms "click" to "onClick".',
        '[K in keyof T & string as `on${Capitalize<K>}`]: (value: T[K]) => void;',
      ],
      concepts: ['mapping with template literals', 'key remapping (as)'],
    },
    {
      id: 'ts-mapped-12',
      title: 'Remove readonly modifier',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fill in the blank to remove the readonly modifier from all properties.',
      skeleton: `type Mutable<T> = {
  __BLANK__ [K in keyof T]: T[K];
};

interface FrozenConfig {
  readonly host: string;
  readonly port: number;
}

type MutableConfig = Mutable<FrozenConfig>;
// { host: string; port: number } -- no longer readonly`,
      solution: `type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

interface FrozenConfig {
  readonly host: string;
  readonly port: number;
}

type MutableConfig = Mutable<FrozenConfig>;
// { host: string; port: number } -- no longer readonly`,
      hints: [
        'To remove a modifier, prefix it with -.',
        '-readonly removes the readonly modifier.',
        'Replace __BLANK__ with -readonly.',
      ],
      concepts: ['removing modifiers (-readonly, -?)'],
    },
    {
      id: 'ts-mapped-13',
      title: 'Mapped type with conditionals',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type Promisify<T> that wraps each property value in a Promise. If the value is already a Promise, leave it as-is.',
      skeleton: `// Write Promisify<T>
`,
      solution: `type Promisify<T> = {
  [K in keyof T]: T[K] extends Promise<any> ? T[K] : Promise<T[K]>;
};

// Usage:
interface Sync {
  name: string;
  data: Promise<number>;
}

type AsyncVersion = Promisify<Sync>;
// { name: Promise<string>; data: Promise<number> }`,
      hints: [
        'Use a conditional type in the value position of the mapped type.',
        'If T[K] extends Promise<any>, keep it. Otherwise wrap in Promise<T[K]>.',
        'T[K] extends Promise<any> ? T[K] : Promise<T[K]>;',
      ],
      concepts: ['mapped type with conditionals'],
    },
    {
      id: 'ts-mapped-14',
      title: 'Fix broken mapped type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This mapped type tries to filter out boolean properties but does it incorrectly. Fix the conditional in the key remapping.',
      skeleton: `type NonBooleans<T> = {
  [K in keyof T as T[K] extends boolean ? K : never]: T[K];
  // Bug: this KEEPS booleans instead of removing them
};`,
      solution: `type NonBooleans<T> = {
  [K in keyof T as T[K] extends boolean ? never : K]: T[K];
};`,
      hints: [
        'The conditional is inverted -- it keeps booleans and removes non-booleans.',
        'To filter OUT a key, map it to never. To keep it, return K.',
        'Swap the branches: T[K] extends boolean ? never : K.',
      ],
      concepts: ['filtering keys', 'mapped type with conditionals'],
    },
    {
      id: 'ts-mapped-15',
      title: 'Nested mapped types',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type DeepNullable<T> that recursively makes all properties nullable (T[K] | null), including nested objects.',
      skeleton: `// Write DeepNullable<T>
`,
      solution: `type DeepNullable<T> = {
  [K in keyof T]: T[K] extends object
    ? DeepNullable<T[K]> | null
    : T[K] | null;
};

// Usage:
interface Config {
  server: {
    host: string;
    port: number;
  };
  debug: boolean;
}

type NullableConfig = DeepNullable<Config>;`,
      hints: [
        'Recursively apply the mapped type for object properties.',
        'If T[K] extends object, recurse. Otherwise add | null.',
        'For objects: DeepNullable<T[K]> | null. For primitives: T[K] | null.',
      ],
      concepts: ['nested mapped types'],
    },
    {
      id: 'ts-mapped-16',
      title: 'Predict key remapping',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What are the keys of the resulting type?',
      skeleton: `type Setters<T> = {
  [K in keyof T & string as \`set\${Capitalize<K>}\`]: (value: T[K]) => void;
};

interface Point {
  x: number;
  y: number;
}

type PointSetters = Setters<Point>;
// What are the keys?`,
      solution: `The keys are "setX" and "setY". The resulting type is { setX: (value: number) => void; setY: (value: number) => void }.`,
      hints: [
        'as `set${Capitalize<K>}` transforms each key.',
        'x -> setX, y -> setY.',
        'Keys are "setX" and "setY" with setter function signatures.',
      ],
      concepts: ['key remapping (as)', 'mapping with template literals'],
    },
    {
      id: 'ts-mapped-17',
      title: 'Mapped type inference',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This type tries to create a version of T where all methods return Promises, but it wraps non-function properties too. Fix it to only modify function properties.',
      skeleton: `type AsyncMethods<T> = {
  [K in keyof T]: (...args: any[]) => Promise<any>;
  // Bug: makes ALL properties into functions
};`,
      solution: `type AsyncMethods<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[K];
};`,
      hints: [
        'Use a conditional type to check if T[K] is a function.',
        'If it is a function, wrap its return type in Promise. Otherwise, keep the original type.',
        'T[K] extends (...args: infer A) => infer R ? (...args: A) => Promise<R> : T[K];',
      ],
      concepts: ['mapped type inference', 'mapped type with conditionals'],
    },
    {
      id: 'ts-mapped-18',
      title: 'Mapped type constraints',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type ReadonlyKeys<T> that extracts only the keys of T that are readonly. Use mapped types with key remapping.',
      skeleton: `// Write ReadonlyKeys<T>
`,
      solution: `type ReadonlyKeys<T> = {
  [K in keyof T]-?: (<V>() => V extends { [P in K]: T[K] } ? 1 : 2) extends
    (<V>() => V extends { -readonly [P in K]: T[K] } ? 1 : 2)
    ? never
    : K;
}[keyof T];

// Simpler approach for practical use:
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;`,
      hints: [
        'Detecting readonly is tricky -- you need to compare the property with and without readonly.',
        'If a property with readonly equals the same property without readonly, it is not readonly.',
        'Compare { [P in K]: T[K] } with { -readonly [P in K]: T[K] }. If they differ, K is readonly.',
      ],
      concepts: ['mapped type constraints'],
    },
    {
      id: 'ts-mapped-19',
      title: 'Refactor with mapped types',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor these three separate interfaces into one base interface and mapped type transformations.',
      skeleton: `interface UserInput {
  name: string;
  email: string;
  age: number;
}

interface UserResponse {
  readonly name: string;
  readonly email: string;
  readonly age: number;
}

interface UserUpdate {
  name?: string;
  email?: string;
  age?: number;
}`,
      solution: `interface User {
  name: string;
  email: string;
  age: number;
}

type UserInput = User;
type UserResponse = Readonly<User>;
type UserUpdate = Partial<User>;`,
      hints: [
        'All three interfaces have the same properties with different modifiers.',
        'Use Readonly<T> for the response and Partial<T> for the update.',
        'One base User interface. UserResponse = Readonly<User>. UserUpdate = Partial<User>.',
      ],
      concepts: ['practical mapped type patterns'],
    },
    {
      id: 'ts-mapped-20',
      title: 'Practical: form validation type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a mapped type FormErrors<T> that transforms each property into string | undefined (error message or no error). Then write FormTouched<T> that maps each to boolean.',
      skeleton: `// Write FormErrors<T> and FormTouched<T>
`,
      solution: `type FormErrors<T> = {
  [K in keyof T]?: string;
};

type FormTouched<T> = {
  [K in keyof T]: boolean;
};

// Usage:
interface LoginForm {
  username: string;
  password: string;
}

type LoginErrors = FormErrors<LoginForm>;
// { username?: string; password?: string }

type LoginTouched = FormTouched<LoginForm>;
// { username: boolean; password: boolean }`,
      hints: [
        'FormErrors maps each key to an optional string (error message or undefined).',
        'FormTouched maps each key to boolean (has the field been interacted with).',
        'FormErrors: [K in keyof T]?: string. FormTouched: [K in keyof T]: boolean.',
      ],
      concepts: ['practical mapped type patterns'],
    },
  ],
};
