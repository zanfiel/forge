import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-idx-sig',
  title: '41. Index Signatures & Records',
  explanation: `## Index Signatures & Records

Index signatures let you describe objects whose property names aren't known ahead of time but whose value types are consistent.

### String Index Signatures
\\\`\\\`\\\`typescript
interface Dictionary {
  [key: string]: string;
}
\\\`\\\`\\\`

### Number Index Signatures
\\\`\\\`\\\`typescript
interface NumberMap {
  [index: number]: string;
}
\\\`\\\`\\\`

### Record Utility Type
\\\`Record<Keys, Value>\\\` is a shorthand for an object type whose keys come from \\\`Keys\\\` and values are all \\\`Value\\\`:
\\\`\\\`\\\`typescript
type Roles = Record<'admin' | 'user' | 'guest', boolean>;
\\\`\\\`\\\`

### Key Rules
- A string index signature forces ALL properties to conform to its value type.
- A number index signature's value must be a subtype of the string index signature's value.
- \\\`noUncheckedIndexedAccess\\\` makes indexed values include \\\`undefined\\\`.
- Use \\\`readonly\\\` on index signatures to prevent mutation.

### Index Signatures vs Map
Index signatures create plain objects. \\\`Map<K,V>\\\` is a runtime data structure with better key flexibility and guaranteed insertion order.
`,
  exercises: [
    {
      id: 'ts-idx-sig-1',
      title: 'Basic string index signature',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the interface so it accepts any string key mapping to a number value.',
      skeleton: `interface Scores {
  __BLANK__: number;
}

const gameScores: Scores = {
  mario: 100,
  zelda: 250,
};`,
      solution: `interface Scores {
  [key: string]: number;
}

const gameScores: Scores = {
  mario: 100,
  zelda: 250,
};`,
      hints: [
        'Index signatures use square brackets around a parameter name.',
        'The syntax is [paramName: keyType]: valueType.',
        'The answer is: [key: string]',
      ],
      concepts: ['string index signature', 'interface'],
    },
    {
      id: 'ts-idx-sig-2',
      title: 'Number index signature',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the interface so it maps numeric indices to string values.',
      skeleton: `interface StringArray {
  __BLANK__: string;
}

const arr: StringArray = { 0: "hello", 1: "world" };`,
      solution: `interface StringArray {
  [index: number]: string;
}

const arr: StringArray = { 0: "hello", 1: "world" };`,
      hints: [
        'Similar to string index signatures but use number as the key type.',
        'The syntax is [index: number]: valueType.',
        'The answer is: [index: number]',
      ],
      concepts: ['number index signature', 'interface'],
    },
    {
      id: 'ts-idx-sig-3',
      title: 'Record utility type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use the Record utility type to create a type mapping specific role names to boolean permissions.',
      skeleton: `type Roles = __BLANK__;

const permissions: Roles = {
  admin: true,
  user: true,
  guest: false,
};`,
      solution: `type Roles = Record<'admin' | 'user' | 'guest', boolean>;

const permissions: Roles = {
  admin: true,
  user: true,
  guest: false,
};`,
      hints: [
        'Record takes two type arguments: the key type and the value type.',
        'The keys should be a union of literal string types.',
        'The answer is: Record<\'admin\' | \'user\' | \'guest\', boolean>',
      ],
      concepts: ['Record utility type', 'union types', 'literal types'],
    },
    {
      id: 'ts-idx-sig-4',
      title: 'Index signature with known properties',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add an index signature alongside the known "name" property. All dynamic properties must be strings.',
      skeleton: `interface Config {
  name: string;
  __BLANK__: string;
}

const cfg: Config = {
  name: "app",
  version: "1.0.0",
  env: "production",
};`,
      solution: `interface Config {
  name: string;
  [key: string]: string;
}

const cfg: Config = {
  name: "app",
  version: "1.0.0",
  env: "production",
};`,
      hints: [
        'Known properties must have types compatible with the index signature value type.',
        'Add [key: string]: string alongside the name property.',
        'The answer is: [key: string]',
      ],
      concepts: ['index signature with known properties', 'type compatibility'],
    },
    {
      id: 'ts-idx-sig-5',
      title: 'Predict: excess property check',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Does this code compile? If yes, write "Compiles". If no, write "Error".',
      skeleton: `interface Named {
  name: string;
}

const obj: Named = {
  name: "test",
  age: 25,
};`,
      solution: `Error`,
      hints: [
        'TypeScript performs excess property checks on object literals.',
        'The interface only declares "name" and has no index signature.',
        'Object literals may not have properties not declared in the target type.',
      ],
      concepts: ['excess property checks', 'object literals', 'structural typing'],
    },
    {
      id: 'ts-idx-sig-6',
      title: 'Readonly index signature',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Make the index signature readonly so properties cannot be modified after creation.',
      skeleton: `interface FrozenMap {
  __BLANK__: string;
}

const data: FrozenMap = { key: "value" };
// data.key = "new"; // Should be an error`,
      solution: `interface FrozenMap {
  readonly [key: string]: string;
}

const data: FrozenMap = { key: "value" };
// data.key = "new"; // Should be an error`,
      hints: [
        'You can prefix index signatures with the readonly modifier.',
        'Place readonly before the opening bracket.',
        'The answer is: readonly [key: string]',
      ],
      concepts: ['readonly index signature', 'immutability'],
    },
    {
      id: 'ts-idx-sig-7',
      title: 'Write a dictionary lookup function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a function getOrDefault that takes a dictionary (string keys, string values), a key, and a default value. Return the value if the key exists, otherwise the default.',
      skeleton: `// Write your function here
`,
      solution: `function getOrDefault(
  dict: { [key: string]: string },
  key: string,
  defaultValue: string
): string {
  return dict[key] !== undefined ? dict[key] : defaultValue;
}`,
      hints: [
        'The dictionary parameter should have a string index signature.',
        'Check if dict[key] is undefined to decide which value to return.',
        'function getOrDefault(dict: { [key: string]: string }, key: string, defaultValue: string): string',
      ],
      concepts: ['index signature', 'dynamic key access', 'default values'],
    },
    {
      id: 'ts-idx-sig-8',
      title: 'Fix: index signature type mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the type error in this interface. The "count" property is a number but the index signature requires string.',
      skeleton: `interface Metadata {
  [key: string]: string;
  name: string;
  count: number;
}`,
      solution: `interface Metadata {
  [key: string]: string | number;
  name: string;
  count: number;
}`,
      hints: [
        'All known properties must have types assignable to the index signature value.',
        'The index signature value type must be a union that includes both string and number.',
        'Change the index signature to [key: string]: string | number.',
      ],
      concepts: ['index signature compatibility', 'union types', 'known properties'],
    },
    {
      id: 'ts-idx-sig-9',
      title: 'Write a Record-based enum map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Define a type StatusMessages that maps each Status to a string message, then create a constant object of that type.',
      skeleton: `type Status = 'pending' | 'active' | 'closed';

// Define StatusMessages type using Record

// Create the messages object
`,
      solution: `type Status = 'pending' | 'active' | 'closed';

type StatusMessages = Record<Status, string>;

const messages: StatusMessages = {
  pending: 'Your request is pending.',
  active: 'Your account is active.',
  closed: 'This ticket is closed.',
};`,
      hints: [
        'Record<K, V> creates an object type with keys from K and values of type V.',
        'Use Record<Status, string> as the type.',
        'You must provide a value for every member of the Status union.',
      ],
      concepts: ['Record utility type', 'union keys', 'exhaustive mapping'],
    },
    {
      id: 'ts-idx-sig-10',
      title: 'Predict: noUncheckedIndexedAccess',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'With noUncheckedIndexedAccess enabled, what is the type of value? Write the type exactly.',
      skeleton: `// tsconfig: "noUncheckedIndexedAccess": true
interface Dict {
  [key: string]: number;
}

const d: Dict = { a: 1 };
const value = d["b"];
// What is the type of value?`,
      solution: `number | undefined`,
      hints: [
        'noUncheckedIndexedAccess changes how TypeScript types indexed access.',
        'It adds undefined to every index signature access.',
        'The type is number | undefined.',
      ],
      concepts: ['noUncheckedIndexedAccess', 'compiler options', 'index signature safety'],
    },
    {
      id: 'ts-idx-sig-11',
      title: 'Write a typed merge function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generic function mergeDicts that takes two dictionaries of the same value type and merges them into one. Properties from the second dictionary overwrite the first.',
      skeleton: `// Write your function here
`,
      solution: `function mergeDicts<T>(
  a: Record<string, T>,
  b: Record<string, T>
): Record<string, T> {
  return { ...a, ...b };
}`,
      hints: [
        'Use a generic type parameter T for the value type.',
        'Both parameters should be Record<string, T>.',
        'Spread both objects into a new one: { ...a, ...b }.',
      ],
      concepts: ['generics', 'Record', 'spread operator', 'dictionary merge'],
    },
    {
      id: 'ts-idx-sig-12',
      title: 'Template literal index signature',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use a template literal type as the index signature key to only allow keys that start with "data-".',
      skeleton: `interface DataAttributes {
  [key: __BLANK__]: string;
}

const attrs: DataAttributes = {
  "data-id": "123",
  "data-name": "test",
};`,
      solution: `interface DataAttributes {
  [key: \`data-\${string}\`]: string;
}

const attrs: DataAttributes = {
  "data-id": "123",
  "data-name": "test",
};`,
      hints: [
        'Template literal types can be used in index signatures since TypeScript 4.4.',
        'Use a template literal with a string placeholder for the dynamic part.',
        'The answer is: `data-${string}`',
      ],
      concepts: ['template literal index signature', 'pattern index signatures'],
    },
    {
      id: 'ts-idx-sig-13',
      title: 'Fix: class with index signature',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the class so the index signature is compatible with the greet method.',
      skeleton: `class DynamicObj {
  [key: string]: string;

  greet(): string {
    return "Hello!";
  }
}`,
      solution: `class DynamicObj {
  [key: string]: string | (() => string);

  greet(): string {
    return "Hello!";
  }
}`,
      hints: [
        'Methods must also conform to the index signature value type.',
        'greet() returns string, but it is itself a function, not a string.',
        'The index signature value needs to be string | (() => string).',
      ],
      concepts: ['index signature in classes', 'method compatibility', 'union types'],
    },
    {
      id: 'ts-idx-sig-14',
      title: 'Write: index signature vs Map comparison',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function createLookup that takes an array of [string, number] tuples and returns both a plain object with string index signature and a Map. Return them as { obj, map }.',
      skeleton: `// Write your function here
`,
      solution: `function createLookup(
  entries: [string, number][]
): { obj: { [key: string]: number }; map: Map<string, number> } {
  const obj: { [key: string]: number } = {};
  const map = new Map<string, number>();

  for (const [key, value] of entries) {
    obj[key] = value;
    map.set(key, value);
  }

  return { obj, map };
}`,
      hints: [
        'The return type should include both a plain object and a Map.',
        'Iterate through the entries array and populate both data structures.',
        'Use { [key: string]: number } for the object type and Map<string, number> for the map.',
      ],
      concepts: ['index signature vs Map', 'tuples', 'iteration'],
    },
    {
      id: 'ts-idx-sig-15',
      title: 'Predict: weak types',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Does this code compile? Write "Compiles" or "Error".',
      skeleton: `interface Options {
  color?: string;
  width?: number;
}

const opts: Options = { height: 100 };`,
      solution: `Error`,
      hints: [
        'A "weak type" is one where all properties are optional.',
        'TypeScript still checks that at least one property overlaps.',
        'Assigning an object with no overlapping properties to a weak type is an error.',
      ],
      concepts: ['weak types', 'excess property checks', 'optional properties'],
    },
    {
      id: 'ts-idx-sig-16',
      title: 'Record with union keys',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function getThemeColors that returns a Record mapping "primary", "secondary", and "accent" to hex color strings. All three keys must be present.',
      skeleton: `// Write your function here
`,
      solution: `function getThemeColors(): Record<'primary' | 'secondary' | 'accent', string> {
  return {
    primary: '#3b82f6',
    secondary: '#6b7280',
    accent: '#f59e0b',
  };
}`,
      hints: [
        'Use Record with a union of literal types as the key.',
        'Record<"primary" | "secondary" | "accent", string> ensures all three keys are present.',
        'Return an object literal with all three keys mapped to string color values.',
      ],
      concepts: ['Record with union keys', 'literal types', 'exhaustive objects'],
    },
    {
      id: 'ts-idx-sig-17',
      title: 'Recursive index signature',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Define a NestedConfig type that allows arbitrary string keys mapping to either a string or another NestedConfig. Then write a function getNestedValue that retrieves a value by dot-separated path.',
      skeleton: `// Define the NestedConfig type and write the getNestedValue function
`,
      solution: `type NestedConfig = {
  [key: string]: string | NestedConfig;
};

function getNestedValue(config: NestedConfig, path: string): string | NestedConfig | undefined {
  const keys = path.split('.');
  let current: string | NestedConfig | undefined = config;

  for (const key of keys) {
    if (typeof current !== 'object' || current === null) {
      return undefined;
    }
    current = (current as NestedConfig)[key];
  }

  return current;
}`,
      hints: [
        'A recursive type can reference itself in its value position.',
        'type NestedConfig = { [key: string]: string | NestedConfig }',
        'For getNestedValue, split the path on "." and walk through the object step by step.',
      ],
      concepts: ['recursive index signatures', 'path traversal', 'type recursion'],
    },
    {
      id: 'ts-idx-sig-18',
      title: 'Fix: strict index with intersection',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix this code so the intersection properly combines a known-property type with an index signature type.',
      skeleton: `type Known = {
  id: number;
  name: string;
};

type Extensible = Known & {
  [key: string]: string;
};

// Error: id is number but index signature requires string
const item: Extensible = {
  id: 1,
  name: "test",
  extra: "value",
};`,
      solution: `type Known = {
  id: number;
  name: string;
};

type Extensible = Known & {
  [key: string]: string | number;
};

const item: Extensible = {
  id: 1,
  name: "test",
  extra: "value",
};`,
      hints: [
        'When intersecting, the index signature value must be compatible with all known properties.',
        'The "id" property is a number, so the index signature must allow number too.',
        'Change the index signature value to string | number.',
      ],
      concepts: ['index signature intersections', 'type compatibility', 'intersection types'],
    },
    {
      id: 'ts-idx-sig-19',
      title: 'Refactor: object to Map',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this code from using a plain object with an index signature to using a Map for better type safety and performance with frequent additions/deletions.',
      skeleton: `interface Cache {
  [key: string]: { data: unknown; expiry: number };
}

function createCache(): Cache {
  const store: Cache = {};

  return {
    get(key: string) { return store[key]; },
    set(key: string, data: unknown, ttl: number) {
      store[key] = { data, expiry: Date.now() + ttl };
    },
    delete(key: string) { delete store[key]; },
    has(key: string) { return key in store; },
  } as any;
}`,
      solution: `interface CacheEntry {
  data: unknown;
  expiry: number;
}

interface Cache {
  get(key: string): CacheEntry | undefined;
  set(key: string, data: unknown, ttl: number): void;
  delete(key: string): boolean;
  has(key: string): boolean;
}

function createCache(): Cache {
  const store = new Map<string, CacheEntry>();

  return {
    get(key: string) { return store.get(key); },
    set(key: string, data: unknown, ttl: number) {
      store.set(key, { data, expiry: Date.now() + ttl });
    },
    delete(key: string) { return store.delete(key); },
    has(key: string) { return store.has(key); },
  };
}`,
      hints: [
        'Replace the plain object with new Map<string, CacheEntry>().',
        'Use Map methods: .get(), .set(), .delete(), .has() instead of bracket access.',
        'Define a proper Cache interface with method signatures instead of using "as any".',
      ],
      concepts: ['index signature vs Map', 'refactoring', 'type safety'],
    },
    {
      id: 'ts-idx-sig-20',
      title: 'Refactor: type-safe dictionary pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this loosely typed dictionary into a fully type-safe pattern with a generic TypedDictionary class that supports get, set, has, keys, and values operations.',
      skeleton: `const registry: { [key: string]: any } = {};

function register(name: string, value: any) {
  registry[name] = value;
}

function lookup(name: string): any {
  return registry[name];
}`,
      solution: `class TypedDictionary<V> {
  private store = new Map<string, V>();

  set(key: string, value: V): void {
    this.store.set(key, value);
  }

  get(key: string): V | undefined {
    return this.store.get(key);
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  keys(): string[] {
    return Array.from(this.store.keys());
  }

  values(): V[] {
    return Array.from(this.store.values());
  }
}

const registry = new TypedDictionary<{ handler: () => void; priority: number }>();
registry.set('onClick', { handler: () => console.log('clicked'), priority: 1 });
const entry = registry.get('onClick'); // { handler: () => void; priority: number } | undefined`,
      hints: [
        'Replace any with a generic type parameter V.',
        'Use a class with a private Map for storage.',
        'Expose typed methods: get returns V | undefined, keys returns string[], etc.',
      ],
      concepts: ['dictionary patterns', 'generics', 'encapsulation', 'type safety'],
    },
  ],
};
