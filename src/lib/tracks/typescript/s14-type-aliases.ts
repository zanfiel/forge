import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-type-aliases',
  title: '14. Type Aliases',
  explanation: `## Type Aliases

Type aliases create a new name for any type. They make complex types reusable and readable.

### Basic Syntax
\\\`\\\`\\\`typescript
type ID = string | number;
type Point = { x: number; y: number };
type Callback = (data: string) => void;
\\\`\\\`\\\`

### What Can You Alias?
- Primitives: \\\`type Name = string\\\`
- Unions: \\\`type Result = "success" | "failure"\\\`
- Objects: \\\`type User = { name: string; age: number }\\\`
- Functions: \\\`type Handler = (event: Event) => void\\\`
- Tuples: \\\`type Pair = [string, number]\\\`
- Generics: \\\`type Box<T> = { value: T }\\\`
- Recursive: \\\`type Tree<T> = { value: T; children: Tree<T>[] }\\\`

### Type Alias vs Interface
| Feature              | Type Alias | Interface  |
|----------------------|-----------|------------|
| Union types          | Yes       | No         |
| Declaration merging  | No        | Yes        |
| Extends/implements   | No*       | Yes        |
| Computed properties  | Yes       | No         |
| Recursive            | Yes       | Yes        |

*Type aliases use intersections (\\\`&\\\`) instead of extends.

### When to Use Which
- **Interface**: when defining object shapes that may be extended or merged
- **Type alias**: when defining unions, tuples, function types, or complex compositions
- Many teams use type aliases for everything -- both approaches are valid

### Advanced Patterns
- Self-referencing types for recursive data structures
- Generic type aliases for reusable patterns
- Mapped and conditional type aliases (preview of later sections)`,
  exercises: [
    // --- 1 ---
    {
      id: 'ts-type-aliases-1',
      title: 'Basic type alias',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a type alias for a string ID.',
      skeleton: `__BLANK__ UserID = string;

const id: UserID = "usr_123";`,
      solution: `type UserID = string;

const id: UserID = "usr_123";`,
      hints: [
        'Which keyword creates a type alias?',
        'The keyword is "type".',
        'type UserID = string;',
      ],
      concepts: ['type keyword', 'aliasing primitives'],
    },
    // --- 2 ---
    {
      id: 'ts-type-aliases-2',
      title: 'Union type alias',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a type alias for a value that can be string or number.',
      skeleton: `type ID = __BLANK__;

const a: ID = "abc";
const b: ID = 42;`,
      solution: `type ID = string | number;

const a: ID = "abc";
const b: ID = 42;`,
      hints: [
        'A union type uses the pipe character to combine types.',
        'The alias should allow both string and number.',
        'string | number',
      ],
      concepts: ['aliasing unions', 'union types'],
    },
    // --- 3 ---
    {
      id: 'ts-type-aliases-3',
      title: 'Object type alias',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a type alias for a coordinate object.',
      skeleton: `type Coordinate = __BLANK__;

const point: Coordinate = { x: 10, y: 20 };`,
      solution: `type Coordinate = { x: number; y: number };

const point: Coordinate = { x: 10, y: 20 };`,
      hints: [
        'Object types use curly braces with property: type pairs.',
        'The object needs x and y, both numbers.',
        '{ x: number; y: number }',
      ],
      concepts: ['aliasing objects', 'object types'],
    },
    // --- 4 ---
    {
      id: 'ts-type-aliases-4',
      title: 'Function type alias',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a type alias for a function that takes two numbers and returns a number.',
      skeleton: `type MathOp = __BLANK__;

const add: MathOp = (a, b) => a + b;
const mul: MathOp = (a, b) => a * b;`,
      solution: `type MathOp = (a: number, b: number) => number;

const add: MathOp = (a, b) => a + b;
const mul: MathOp = (a, b) => a * b;`,
      hints: [
        'Function types use arrow syntax: (params) => returnType.',
        'The function takes two numbers and returns a number.',
        '(a: number, b: number) => number',
      ],
      concepts: ['aliasing functions', 'function types'],
    },
    // --- 5 ---
    {
      id: 'ts-type-aliases-5',
      title: 'Tuple type alias',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a type alias for a tuple of [string, number, boolean].',
      skeleton: `type UserRecord = __BLANK__;

const record: UserRecord = ["Alice", 30, true];`,
      solution: `type UserRecord = [string, number, boolean];

const record: UserRecord = ["Alice", 30, true];`,
      hints: [
        'Tuples use square brackets with types for each position.',
        'The tuple has string first, number second, boolean third.',
        '[string, number, boolean]',
      ],
      concepts: ['aliasing tuples', 'tuple types'],
    },
    // --- 6 ---
    {
      id: 'ts-type-aliases-6',
      title: 'Generic type alias',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a generic type alias for a container with a value property.',
      skeleton: `type Box__BLANK__ = { value: T };

const numBox: Box<number> = { value: 42 };
const strBox: Box<string> = { value: "hello" };`,
      solution: `type Box<T> = { value: T };

const numBox: Box<number> = { value: 42 };
const strBox: Box<string> = { value: "hello" };`,
      hints: [
        'Generic type aliases add a type parameter in angle brackets.',
        'The type parameter goes after the alias name.',
        '<T>',
      ],
      concepts: ['generic type aliases', 'type parameters'],
    },
    // --- 7 ---
    {
      id: 'ts-type-aliases-7',
      title: 'Callback type alias',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Define a type alias for an error-first callback and use it in a function.',
      skeleton: `// Define ErrorCallback type: takes (error: Error | null, data?: string) => void

// Write fetchData that accepts a url and an ErrorCallback
function fetchData(url: string, callback: ErrorCallback): void {
  // simulate: if url starts with "http", call with null error and url as data
  // otherwise call with an Error
}`,
      solution: `type ErrorCallback = (error: Error | null, data?: string) => void;

function fetchData(url: string, callback: ErrorCallback): void {
  if (url.startsWith("http")) {
    callback(null, url);
  } else {
    callback(new Error("Invalid URL"));
  }
}`,
      hints: [
        'An error-first callback has Error | null as the first param.',
        'The data parameter is optional (uses ?).',
        'type ErrorCallback = (error: Error | null, data?: string) => void;',
      ],
      concepts: ['type alias for callbacks', 'error-first pattern'],
    },
    // --- 8 ---
    {
      id: 'ts-type-aliases-8',
      title: 'Config object type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Define a type alias for a server configuration and write a function to create a config with defaults.',
      skeleton: `// Define ServerConfig type with:
//   host: string, port: number, ssl: boolean, timeout: number

// Define PartialConfig as a type where all properties are optional

function createConfig(overrides: PartialConfig): ServerConfig {
  // merge with defaults: host "localhost", port 3000, ssl false, timeout 5000
}`,
      solution: `type ServerConfig = {
  host: string;
  port: number;
  ssl: boolean;
  timeout: number;
};

type PartialConfig = Partial<ServerConfig>;

function createConfig(overrides: PartialConfig): ServerConfig {
  return {
    host: "localhost",
    port: 3000,
    ssl: false,
    timeout: 5000,
    ...overrides,
  };
}`,
      hints: [
        'Use Partial<T> to make all properties optional.',
        'Spread the overrides over the defaults so they take priority.',
        'type PartialConfig = Partial<ServerConfig>; return { ...defaults, ...overrides };',
      ],
      concepts: ['type alias for config objects', 'Partial utility'],
    },
    // --- 9 ---
    {
      id: 'ts-type-aliases-9',
      title: 'Type alias composition',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Compose multiple type aliases to build a complex API request type.',
      skeleton: `// Define these type aliases:
// HttpMethod = "GET" | "POST" | "PUT" | "DELETE"
// Headers = Record<string, string>
// RequestBody = string | Record<string, unknown> | null
// ApiRequest = { method: HttpMethod; url: string; headers: Headers; body: RequestBody }

function createGetRequest(url: string): ApiRequest {
  // create a GET request with empty headers and null body
}`,
      solution: `type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type Headers = Record<string, string>;
type RequestBody = string | Record<string, unknown> | null;
type ApiRequest = {
  method: HttpMethod;
  url: string;
  headers: Headers;
  body: RequestBody;
};

function createGetRequest(url: string): ApiRequest {
  return { method: "GET", url, headers: {}, body: null };
}`,
      hints: [
        'Build small type aliases and compose them into larger ones.',
        'ApiRequest references HttpMethod, Headers, and RequestBody.',
        'Define each type alias separately, then use them in ApiRequest.',
      ],
      concepts: ['type composition', 'complex type alias'],
    },
    // --- 10 ---
    {
      id: 'ts-type-aliases-10',
      title: 'Type alias vs interface',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict which declarations compile and which cause errors.',
      skeleton: `// A: type alias redeclaration
type Color = "red";
// type Color = "blue"; // uncomment: does this work?

// B: interface redeclaration
interface Shape { sides: number; }
interface Shape { color: string; }

const s: Shape = { sides: 4, color: "blue" };
console.log(s.sides, s.color);`,
      solution: `4 blue`,
      hints: [
        'Type aliases CANNOT be redeclared (would cause error if uncommented).',
        'Interfaces CAN be redeclared -- they merge automatically.',
        'Shape merges to { sides: number; color: string }. Output: 4 blue.',
      ],
      concepts: ['type alias vs interface', 'declaration merging'],
    },
    // --- 11 ---
    {
      id: 'ts-type-aliases-11',
      title: 'Recursive type alias',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Define a recursive type alias for a JSON value.',
      skeleton: `// Define JsonValue that can be:
// string, number, boolean, null, JsonValue[], or { [key: string]: JsonValue }

// Write a function that checks if a JsonValue is an object (not array, not null)
function isJsonObject(value: JsonValue): boolean {
  // implement
}`,
      solution: `type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

function isJsonObject(value: JsonValue): boolean {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}`,
      hints: [
        'A recursive type alias references itself in its definition.',
        'JsonValue includes JsonValue[] and { [key: string]: JsonValue }.',
        'Check typeof === "object", not null, and not Array.isArray.',
      ],
      concepts: ['recursive type aliases', 'self-referencing types'],
    },
    // --- 12 ---
    {
      id: 'ts-type-aliases-12',
      title: 'Extracting type aliases',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Refactor repeated inline types into reusable type aliases.',
      skeleton: `function validateUser(user: { name: string; email: string; age: number }): boolean {
  return user.name.length > 0 && user.email.includes("@") && user.age >= 18;
}

function formatUser(user: { name: string; email: string; age: number }): string {
  return \`\${user.name} (\${user.email}), age \${user.age}\`;
}

function compareUsers(
  a: { name: string; email: string; age: number },
  b: { name: string; email: string; age: number }
): number {
  return a.age - b.age;
}`,
      solution: `type User = { name: string; email: string; age: number };

function validateUser(user: User): boolean {
  return user.name.length > 0 && user.email.includes("@") && user.age >= 18;
}

function formatUser(user: User): string {
  return \`\${user.name} (\${user.email}), age \${user.age}\`;
}

function compareUsers(a: User, b: User): number {
  return a.age - b.age;
}`,
      hints: [
        'The same inline type is repeated three times -- extract it.',
        'Create a type alias and use it in all three function signatures.',
        'type User = { name: string; email: string; age: number };',
      ],
      concepts: ['extracting type aliases', 'DRY principle'],
    },
    // --- 13 ---
    {
      id: 'ts-type-aliases-13',
      title: 'Generic type with constraints',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create a generic type alias for a response wrapper with a constraint on the data type.',
      skeleton: `// Define Identifiable as { id: string }
// Define ApiResponse<T extends Identifiable> with: data: T, timestamp: Date, success: boolean

// Write a function that wraps any identifiable object in an ApiResponse
function wrapInResponse<T extends Identifiable>(data: T): ApiResponse<T> {
  // implement
}`,
      solution: `type Identifiable = { id: string };

type ApiResponse<T extends Identifiable> = {
  data: T;
  timestamp: Date;
  success: boolean;
};

function wrapInResponse<T extends Identifiable>(data: T): ApiResponse<T> {
  return { data, timestamp: new Date(), success: true };
}`,
      hints: [
        'Generic type aliases can have constraints using "extends".',
        'T extends Identifiable means T must have an id: string property.',
        'type ApiResponse<T extends Identifiable> = { data: T; timestamp: Date; success: boolean };',
      ],
      concepts: ['type alias with generics', 'type constraints'],
    },
    // --- 14 ---
    {
      id: 'ts-type-aliases-14',
      title: 'Mapped type alias preview',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict the type that results from a mapped type alias.',
      skeleton: `type Flags<T> = {
  [K in keyof T]: boolean;
};

type UserFields = { name: string; age: number; email: string };
type UserFlags = Flags<UserFields>;

const flags: UserFlags = { name: true, age: false, email: true };
console.log(flags);`,
      solution: `{ name: true, age: false, email: true }`,
      hints: [
        'Flags<T> transforms every property of T to boolean.',
        'UserFields has name, age, email -- all become boolean in UserFlags.',
        'The output is the object { name: true, age: false, email: true }.',
      ],
      concepts: ['mapped type alias', 'type transformation'],
    },
    // --- 15 ---
    {
      id: 'ts-type-aliases-15',
      title: 'Conditional type alias intro',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the conditional type alias so it correctly extracts the return type.',
      skeleton: `type ReturnOf<T> = T extends () => string ? string : never;

// Should work for any return type, not just string
const test1: ReturnOf<() => number> = 42;     // Error: Type 'number' is not assignable to 'never'
const test2: ReturnOf<() => string> = "hello";`,
      solution: `type ReturnOf<T> = T extends () => infer R ? R : never;

const test1: ReturnOf<() => number> = 42;
const test2: ReturnOf<() => string> = "hello";`,
      hints: [
        'The current type only checks for string returns -- it should be generic.',
        'Use the "infer" keyword to infer the return type.',
        'T extends () => infer R ? R : never',
      ],
      concepts: ['conditional type alias', 'infer keyword preview'],
    },
    // --- 16 ---
    {
      id: 'ts-type-aliases-16',
      title: 'Type alias documentation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create well-documented type aliases with JSDoc comments for an event system.',
      skeleton: `// Define these type aliases with JSDoc comments:
// EventName: string alias for event names
// EventHandler<T>: function that takes data of type T and returns void
// EventMap: Record mapping EventName to EventHandler<any>
// EventEmitter: object with on, off, and emit methods

// Then implement a simple createEmitter function
function createEmitter(): EventEmitter {
  // implement with on, off, emit
}`,
      solution: `/** Name identifier for events */
type EventName = string;

/** Handler function for events of type T */
type EventHandler<T = unknown> = (data: T) => void;

/** Maps event names to their handlers */
type EventMap = Record<EventName, EventHandler<any>[]>;

/** Event emitter with subscribe/unsubscribe/emit capabilities */
type EventEmitter = {
  on(event: EventName, handler: EventHandler<any>): void;
  off(event: EventName, handler: EventHandler<any>): void;
  emit(event: EventName, data: unknown): void;
};

function createEmitter(): EventEmitter {
  const handlers: EventMap = {};
  return {
    on(event, handler) {
      if (!handlers[event]) handlers[event] = [];
      handlers[event].push(handler);
    },
    off(event, handler) {
      if (!handlers[event]) return;
      handlers[event] = handlers[event].filter(h => h !== handler);
    },
    emit(event, data) {
      if (!handlers[event]) return;
      handlers[event].forEach(h => h(data));
    },
  };
}`,
      hints: [
        'Use JSDoc /** */ comments above each type alias to document it.',
        'Build the event emitter using a handlers map internally.',
        'on pushes to the array, off filters it, emit calls each handler.',
      ],
      concepts: ['type alias documentation', 'event system pattern'],
    },
    // --- 17 ---
    {
      id: 'ts-type-aliases-17',
      title: 'When to use type vs interface',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix each declaration to use the correct construct (type or interface).',
      skeleton: `// Bug: interface cannot represent a union
interface Status {
  "active" | "inactive" | "suspended"
}

// Bug: type cannot be merged/reopened
type Logger = {
  log(msg: string): void;
}
type Logger = {
  warn(msg: string): void;
}

const status: Status = "active";`,
      solution: `type Status = "active" | "inactive" | "suspended";

interface Logger {
  log(msg: string): void;
}
interface Logger {
  warn(msg: string): void;
}

const status: Status = "active";`,
      hints: [
        'Union types must use "type" -- interfaces cannot represent unions.',
        'Declaration merging requires "interface" -- type aliases cannot be redeclared.',
        'Change Status to a type alias and Logger to an interface.',
      ],
      concepts: ['when to use which', 'type vs interface'],
    },
    // --- 18 ---
    {
      id: 'ts-type-aliases-18',
      title: 'Self-referencing tree',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Define a recursive TreeNode type and write a function to count all nodes.',
      skeleton: `// Define TreeNode<T> with: value: T, children: TreeNode<T>[]

function countNodes<T>(node: TreeNode<T>): number {
  // count this node plus all descendants recursively
}`,
      solution: `type TreeNode<T> = {
  value: T;
  children: TreeNode<T>[];
};

function countNodes<T>(node: TreeNode<T>): number {
  return 1 + node.children.reduce((sum, child) => sum + countNodes(child), 0);
}`,
      hints: [
        'A TreeNode references itself in its children property.',
        'Count the current node (1) plus the count of all children recursively.',
        'return 1 + node.children.reduce((sum, child) => sum + countNodes(child), 0);',
      ],
      concepts: ['self-referencing types', 'recursive data structures'],
    },
    // --- 19 ---
    {
      id: 'ts-type-aliases-19',
      title: 'Complex composition',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Build a type-safe state machine type using composed type aliases.',
      skeleton: `// Define:
// State = { name: string; data: Record<string, unknown> }
// Transition = { from: string; to: string; action: string }
// StateMachine = { currentState: string; states: State[]; transitions: Transition[]; transition(action: string): void }

function createMachine(initial: string, states: State[], transitions: Transition[]): StateMachine {
  // implement
}`,
      solution: `type State = {
  name: string;
  data: Record<string, unknown>;
};

type Transition = {
  from: string;
  to: string;
  action: string;
};

type StateMachine = {
  currentState: string;
  states: State[];
  transitions: Transition[];
  transition(action: string): void;
};

function createMachine(initial: string, states: State[], transitions: Transition[]): StateMachine {
  const machine: StateMachine = {
    currentState: initial,
    states,
    transitions,
    transition(action: string) {
      const t = transitions.find(
        tr => tr.from === machine.currentState && tr.action === action
      );
      if (t) {
        machine.currentState = t.to;
      }
    },
  };
  return machine;
}`,
      hints: [
        'Define each type alias for State, Transition, and StateMachine.',
        'The transition method finds a matching transition and updates currentState.',
        'Find transition where from === currentState and action matches.',
      ],
      concepts: ['complex type composition', 'state machine pattern'],
    },
    // --- 20 ---
    {
      id: 'ts-type-aliases-20',
      title: 'Organizing types',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this code to organize related types using a namespace-like pattern with type aliases.',
      skeleton: `// Messy: all types at top level with no grouping
type DbHost = string;
type DbPort = number;
type DbName = string;
type DbUser = string;
type DbPassword = string;
type DbConnection = { host: DbHost; port: DbPort; database: DbName; user: DbUser; password: DbPassword };

type ApiBaseUrl = string;
type ApiKey = string;
type ApiTimeout = number;
type ApiConfig = { baseUrl: ApiBaseUrl; apiKey: ApiKey; timeout: ApiTimeout };

function connect(db: DbConnection, api: ApiConfig): void {
  console.log(\`DB: \${db.host}:\${db.port}, API: \${api.baseUrl}\`);
}`,
      solution: `type Database = {
  Host: string;
  Port: number;
  Name: string;
  User: string;
  Password: string;
  Connection: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
};

type Api = {
  BaseUrl: string;
  Key: string;
  Timeout: number;
  Config: {
    baseUrl: string;
    apiKey: string;
    timeout: number;
  };
};

function connect(db: Database["Connection"], api: Api["Config"]): void {
  console.log(\`DB: \${db.host}:\${db.port}, API: \${api.baseUrl}\`);
}`,
      hints: [
        'Group related types under a single type alias using indexed access types.',
        'Use Database["Connection"] and Api["Config"] to access nested types.',
        'Define Database and Api as objects containing related sub-types.',
      ],
      concepts: ['organizing types', 'indexed access types', 'type namespacing'],
    },
  ],
};
