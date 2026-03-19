import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-tuples',
  title: '18. Tuples',
  explanation: `## Tuples

Tuples are fixed-length arrays where each position has a specific type. They are TypeScript's answer to typed positional data.

### Basic Tuples
\\\`\\\`\\\`typescript
const point: [number, number] = [10, 20];
const entry: [string, number] = ["age", 30];
\\\`\\\`\\\`

### Labeled Tuples (TS 4.0+)
\\\`\\\`\\\`typescript
type Point = [x: number, y: number];
\\\`\\\`\\\`
Labels are for documentation only -- they do not affect runtime behavior.

### Optional Elements
\\\`\\\`\\\`typescript
type OptionalTuple = [string, number?, boolean?];
\\\`\\\`\\\`

### Rest Elements
\\\`\\\`\\\`typescript
type StringAndNums = [string, ...number[]];
\\\`\\\`\\\`

### Readonly Tuples
\\\`\\\`\\\`typescript
type Frozen = readonly [string, number];
\\\`\\\`\\\`

### Variadic Tuple Types (TS 4.0+)
\\\`\\\`\\\`typescript
type Concat<A extends unknown[], B extends unknown[]> = [...A, ...B];
\\\`\\\`\\\`

### Tuple as Function Parameters
\\\`\\\`\\\`typescript
type Args = [string, number, boolean];
function fn(...args: Args) { }
\\\`\\\`\\\`

### Key Properties
- Fixed length (checked at compile time)
- Different types per position
- Destructuring supported
- Can be used as rest parameters
- Supports spread in type positions`,
  exercises: [
    // --- 1 ---
    {
      id: 'ts-tuples-1',
      title: 'Basic tuple declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Declare a tuple type for a name-age pair.',
      skeleton: `const person: __BLANK__ = ["Alice", 30];
console.log(person[0], person[1]);`,
      solution: `const person: [string, number] = ["Alice", 30];
console.log(person[0], person[1]);`,
      hints: [
        'Tuple types use square brackets with a type for each position.',
        'First element is a string, second is a number.',
        '[string, number]',
      ],
      concepts: ['tuple declaration'],
    },
    // --- 2 ---
    {
      id: 'ts-tuples-2',
      title: 'Typed tuple access',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Access tuple elements with proper type inference.',
      skeleton: `const pair: [string, number] = ["score", 95];
const label: __BLANK__ = pair[0];
const value: __BLANK__ = pair[1];`,
      solution: `const pair: [string, number] = ["score", 95];
const label: string = pair[0];
const value: number = pair[1];`,
      hints: [
        'Each position in a tuple has its own specific type.',
        'pair[0] is string, pair[1] is number.',
        'string and number',
      ],
      concepts: ['typed tuple', 'positional types'],
    },
    // --- 3 ---
    {
      id: 'ts-tuples-3',
      title: 'Readonly tuple',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Make the tuple readonly to prevent modification.',
      skeleton: `const point: __BLANK__ [number, number] = [10, 20];
// point[0] = 30; // Should be an error`,
      solution: `const point: readonly [number, number] = [10, 20];
// point[0] = 30; // Error: Cannot assign to '0' because it is a read-only property`,
      hints: [
        'Add a modifier before the tuple type to make it immutable.',
        'The readonly modifier prevents index assignment.',
        'readonly [number, number]',
      ],
      concepts: ['readonly tuple'],
    },
    // --- 4 ---
    {
      id: 'ts-tuples-4',
      title: 'Tuple destructuring',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Destructure a tuple into named variables.',
      skeleton: `const rgb: [number, number, number] = [255, 128, 0];
const [__BLANK__] = rgb;
console.log(r, g, b);`,
      solution: `const rgb: [number, number, number] = [255, 128, 0];
const [r, g, b] = rgb;
console.log(r, g, b);`,
      hints: [
        'Array destructuring works with tuples.',
        'Name each position to extract it into a variable.',
        'const [r, g, b] = rgb;',
      ],
      concepts: ['tuple destructuring'],
    },
    // --- 5 ---
    {
      id: 'ts-tuples-5',
      title: 'Optional tuple elements',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a tuple where the third element is optional.',
      skeleton: `type Coordinate = [number, number, __BLANK__];

const point2D: Coordinate = [10, 20];
const point3D: Coordinate = [10, 20, 30];`,
      solution: `type Coordinate = [number, number, number?];

const point2D: Coordinate = [10, 20];
const point3D: Coordinate = [10, 20, 30];`,
      hints: [
        'Optional tuple elements use the ? modifier after the type.',
        'Optional elements must come after required elements.',
        'number?',
      ],
      concepts: ['optional tuple elements'],
    },
    // --- 6 ---
    {
      id: 'ts-tuples-6',
      title: 'Labeled tuple',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add labels to tuple elements for documentation.',
      skeleton: `type Range = [__BLANK__: number, __BLANK__: number];

const ages: Range = [18, 65];`,
      solution: `type Range = [min: number, max: number];

const ages: Range = [18, 65];`,
      hints: [
        'Labeled tuples add names before the colon: [name: type].',
        'Labels help with documentation and IDE tooltips.',
        'min and max',
      ],
      concepts: ['labeled tuples'],
    },
    // --- 7 ---
    {
      id: 'ts-tuples-7',
      title: 'Rest elements in tuples',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Define a tuple type with a fixed first element and variable-length rest.',
      skeleton: `// Define a type: first element is a string (label), rest are numbers (values)
type LabeledData = // implement

function sum(data: LabeledData): string {
  const [label, ...nums] = data;
  const total = nums.reduce((a, b) => a + b, 0);
  return \`\${label}: \${total}\`;
}`,
      solution: `type LabeledData = [string, ...number[]];

function sum(data: LabeledData): string {
  const [label, ...nums] = data;
  const total = nums.reduce((a, b) => a + b, 0);
  return \`\${label}: \${total}\`;
}`,
      hints: [
        'Rest elements use the spread syntax in the tuple type.',
        'The rest must be an array type and comes at the end.',
        '[string, ...number[]]',
      ],
      concepts: ['rest elements in tuples'],
    },
    // --- 8 ---
    {
      id: 'ts-tuples-8',
      title: 'Tuple as function params',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use a tuple type as rest parameters for a function.',
      skeleton: `type DrawArgs = [x: number, y: number, color: string];

function draw(...args: DrawArgs): string {
  // destructure and return "Drawing at (x, y) in color"
}`,
      solution: `type DrawArgs = [x: number, y: number, color: string];

function draw(...args: DrawArgs): string {
  const [x, y, color] = args;
  return \`Drawing at (\${x}, \${y}) in \${color}\`;
}`,
      hints: [
        'Tuple types can be used as rest parameters with ...args: TupleType.',
        'Destructure args to access individual elements.',
        'const [x, y, color] = args; return `Drawing at (${x}, ${y}) in ${color}`;',
      ],
      concepts: ['tuple as function params', 'rest parameters'],
    },
    // --- 9 ---
    {
      id: 'ts-tuples-9',
      title: 'Tuple return type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that returns a tuple for use with destructuring.',
      skeleton: `// Write useState-like function that returns [value, setter]
function createState<T>(initial: T): [T, (newValue: T) => void] {
  // implement: return current value and a function to update it
}

const [count, setCount] = createState(0);`,
      solution: `function createState<T>(initial: T): [T, (newValue: T) => void] {
  let value = initial;
  return [
    value,
    (newValue: T) => { value = newValue; },
  ];
}

const [count, setCount] = createState(0);`,
      hints: [
        'Return a tuple with the value and an updater function.',
        'The return type is [T, (newValue: T) => void].',
        'return [value, (newValue) => { value = newValue; }];',
      ],
      concepts: ['tuple return types', 'useState pattern'],
    },
    // --- 10 ---
    {
      id: 'ts-tuples-10',
      title: 'Variadic tuple type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a type-safe concat function using variadic tuple types.',
      skeleton: `function concat<A extends unknown[], B extends unknown[]>(
  a: [...A],
  b: [...B]
): [...A, ...B] {
  // implement
}

const result = concat([1, "hello"], [true, 42]);
// result type should be [number, string, boolean, number]`,
      solution: `function concat<A extends unknown[], B extends unknown[]>(
  a: [...A],
  b: [...B]
): [...A, ...B] {
  return [...a, ...b] as [...A, ...B];
}

const result = concat([1, "hello"], [true, 42]);
// result: [number, string, boolean, number]`,
      hints: [
        'Variadic tuple types use spread in type positions.',
        'The return type [...A, ...B] combines both tuple types.',
        'return [...a, ...b] as [...A, ...B];',
      ],
      concepts: ['variadic tuple types', 'tuple spread'],
    },
    // --- 11 ---
    {
      id: 'ts-tuples-11',
      title: 'Tuple length',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict the length type of different tuples.',
      skeleton: `type A = [string, number, boolean];
type B = [string, ...number[]];
type C = [];

type LenA = A["length"];
type LenB = B["length"];
type LenC = C["length"];

// What are LenA, LenB, and LenC?`,
      solution: `LenA is 3 (exact literal). LenB is number (variable length due to rest). LenC is 0.`,
      hints: [
        'Fixed-length tuples have a literal number for length.',
        'Tuples with rest elements have "number" as their length type.',
        'LenA = 3, LenB = number, LenC = 0.',
      ],
      concepts: ['tuple length', 'type-level length'],
    },
    // --- 12 ---
    {
      id: 'ts-tuples-12',
      title: 'Tuple to union',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create a type that extracts a union of all element types from a tuple.',
      skeleton: `// Define TupleToUnion that converts a tuple to a union of its element types
type TupleToUnion<T extends readonly unknown[]> = // implement

type Colors = ["red", "green", "blue"];
type Color = TupleToUnion<Colors>;
// Color should be "red" | "green" | "blue"

const c: Color = "red";`,
      solution: `type TupleToUnion<T extends readonly unknown[]> = T[number];

type Colors = ["red", "green", "blue"];
type Color = TupleToUnion<Colors>;

const c: Color = "red";`,
      hints: [
        'Indexing a tuple with "number" gives a union of all element types.',
        'This is the same pattern as extracting from const arrays.',
        'T[number]',
      ],
      concepts: ['tuple to union', 'indexed access'],
    },
    // --- 13 ---
    {
      id: 'ts-tuples-13',
      title: 'Named tuple patterns',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the function signature to use proper tuple types instead of any[].',
      skeleton: `// Bug: using any[] loses all type information
function parseCSVRow(row: string): any[] {
  const [name, ageStr, activeStr] = row.split(",");
  return [name, parseInt(ageStr), activeStr === "true"];
}

const result = parseCSVRow("Alice,30,true");
const name = result[0]; // any -- should be string
const age = result[1];  // any -- should be number`,
      solution: `function parseCSVRow(row: string): [name: string, age: number, active: boolean] {
  const [name, ageStr, activeStr] = row.split(",");
  return [name, parseInt(ageStr), activeStr === "true"];
}

const result = parseCSVRow("Alice,30,true");
const name = result[0]; // string
const age = result[1];  // number`,
      hints: [
        'Replace any[] with a specific tuple return type.',
        'Use labeled tuples for clarity.',
        'Return type: [name: string, age: number, active: boolean]',
      ],
      concepts: ['named tuple patterns', 'return type tuples'],
    },
    // --- 14 ---
    {
      id: 'ts-tuples-14',
      title: 'Tuple in generics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a generic function that returns the first and last elements of a tuple as a pair.',
      skeleton: `function firstAndLast<T extends readonly [unknown, ...unknown[]]>(
  tuple: T
): [T[0], T extends readonly [...unknown[], infer Last] ? Last : never] {
  // implement
}

const result = firstAndLast([1, "hello", true] as const);
// result should be [1, true]`,
      solution: `function firstAndLast<T extends readonly [unknown, ...unknown[]]>(
  tuple: T
): [T[0], T extends readonly [...unknown[], infer Last] ? Last : never] {
  return [tuple[0], tuple[tuple.length - 1]] as any;
}

const result = firstAndLast([1, "hello", true] as const);
// result: [1, true]`,
      hints: [
        'T[0] gets the first element type. Use infer for the last.',
        'At runtime, tuple[tuple.length - 1] gets the last element.',
        'The type system needs conditional types to infer the last element.',
      ],
      concepts: ['tuple in generics', 'conditional types with tuples'],
    },
    // --- 15 ---
    {
      id: 'ts-tuples-15',
      title: 'Readonly tuple vs mutable',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict which operations are allowed on readonly vs mutable tuples.',
      skeleton: `const mutable: [string, number] = ["age", 25];
const immutable: readonly [string, number] = ["age", 25];

mutable[1] = 30;           // OK or Error?
mutable.push(42);          // OK or Error?
immutable[1] = 30;         // OK or Error?
immutable.push(42);        // OK or Error?

console.log(mutable);`,
      solution: `mutable[1] = 30 is OK. mutable.push(42) is OK (tuples are arrays). immutable[1] = 30 is Error. immutable.push(42) is Error. mutable logs ["age", 30] (with 42 pushed at runtime).`,
      hints: [
        'Mutable tuples allow index assignment and mutation methods.',
        'Readonly tuples prevent both assignment and mutation methods like push.',
        'Note: mutable tuples still allow push at the type level (they extend Array).',
      ],
      concepts: ['readonly tuple vs mutable', 'tuple mutability'],
    },
    // --- 16 ---
    {
      id: 'ts-tuples-16',
      title: 'Tuple inference',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix the function so TypeScript infers a tuple type instead of an array type.',
      skeleton: `// Bug: TypeScript infers (string | number)[] instead of [string, number]
function pair(a: string, b: number) {
  return [a, b]; // inferred as (string | number)[]
}

const p = pair("x", 1);
const str = p[0]; // string | number -- should be string`,
      solution: `function pair(a: string, b: number): [string, number] {
  return [a, b];
}

const p = pair("x", 1);
const str = p[0]; // string`,
      hints: [
        'TypeScript infers arrays, not tuples, by default.',
        'Add an explicit return type annotation to get a tuple.',
        'Return type: [string, number]',
      ],
      concepts: ['tuple inference', 'return type annotation'],
    },
    // --- 17 ---
    {
      id: 'ts-tuples-17',
      title: 'Tuple concat type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Create a type-level Concat utility that merges two tuples.',
      skeleton: `// Define a Concat type that combines two tuple types
type Concat<A extends readonly unknown[], B extends readonly unknown[]> = // implement

type Result = Concat<[1, 2], [3, 4]>;
// Result should be [1, 2, 3, 4]

type Result2 = Concat<["a"], [true, 42]>;
// Result2 should be ["a", true, 42]`,
      solution: `type Concat<A extends readonly unknown[], B extends readonly unknown[]> = [...A, ...B];

type Result = Concat<[1, 2], [3, 4]>;
// [1, 2, 3, 4]

type Result2 = Concat<["a"], [true, 42]>;
// ["a", true, 42]`,
      hints: [
        'Variadic tuple types allow spreading in type positions.',
        'Spread both type parameters into a single tuple.',
        '[...A, ...B]',
      ],
      concepts: ['tuple concat type', 'variadic tuples'],
    },
    // --- 18 ---
    {
      id: 'ts-tuples-18',
      title: 'Tuple with rest in middle',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Predict the behavior of tuples with rest elements in the middle.',
      skeleton: `type Padded = [first: string, ...middle: number[], last: boolean];

const a: Padded = ["start", true];
const b: Padded = ["start", 1, 2, 3, true];
// const c: Padded = ["start", "oops", true]; // Valid?

// What is b.length in terms of type?`,
      solution: `a is valid (0 middle elements). b is valid (3 middle elements). c is NOT valid ("oops" is not a number). b.length type is "number" (variable due to rest).`,
      hints: [
        'Rest elements can appear in the middle of a tuple (TS 4.2+).',
        'The middle ...number[] can have zero or more elements.',
        'String in middle position fails because middle expects numbers.',
      ],
      concepts: ['tuple with rest', 'middle rest elements'],
    },
    // --- 19 ---
    {
      id: 'ts-tuples-19',
      title: 'Type-safe event emitter with tuples',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Use tuples to create a type-safe event emitter where each event has specific argument types.',
      skeleton: `type EventDef = {
  login: [username: string, timestamp: number];
  logout: [username: string];
  error: [code: number, message: string];
};

// Write a type-safe emit function
function emit<K extends keyof EventDef>(
  event: K,
  ...args: EventDef[K]
): void {
  console.log(event, ...args);
}

// These should be type-safe:
// emit("login", "alice", Date.now());
// emit("logout", "alice");
// emit("error", 500, "Server Error");
// emit("login", 123); // Should error`,
      solution: `type EventDef = {
  login: [username: string, timestamp: number];
  logout: [username: string];
  error: [code: number, message: string];
};

function emit<K extends keyof EventDef>(
  event: K,
  ...args: EventDef[K]
): void {
  console.log(event, ...args);
}

emit("login", "alice", Date.now());
emit("logout", "alice");
emit("error", 500, "Server Error");
// emit("login", 123); // Error: number not assignable to string`,
      hints: [
        'Map event names to argument tuples in a type.',
        'Use ...args: EventDef[K] to spread the tuple as rest parameters.',
        'The generic K constrains which arguments each event expects.',
      ],
      concepts: ['practical tuple patterns', 'type-safe events'],
    },
    // --- 20 ---
    {
      id: 'ts-tuples-20',
      title: 'Refactor function overloads to tuples',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor multiple function overloads into a single function using tuple types.',
      skeleton: `// Before: multiple overloads
function query(sql: string): Promise<any[]>;
function query(sql: string, params: any[]): Promise<any[]>;
function query(sql: string, params: any[], timeout: number): Promise<any[]>;
function query(sql: string, params?: any[], timeout?: number): Promise<any[]> {
  const p = params ?? [];
  const t = timeout ?? 5000;
  return Promise.resolve([]);
}`,
      solution: `type QueryArgs =
  | [sql: string]
  | [sql: string, params: unknown[]]
  | [sql: string, params: unknown[], timeout: number];

function query(...args: QueryArgs): Promise<unknown[]> {
  const [sql, params = [], timeout = 5000] = args;
  return Promise.resolve([]);
}`,
      hints: [
        'Union of tuples can replace function overloads.',
        'Each tuple variant represents one overload signature.',
        'type QueryArgs = [string] | [string, unknown[]] | [string, unknown[], number];',
      ],
      concepts: ['tuple overload pattern', 'refactoring overloads'],
    },
  ],
};
