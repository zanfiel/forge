import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-discrim',
  title: '40. Discriminated Unions & Pattern Matching',
  explanation: `## Discriminated Unions & Pattern Matching

Discriminated unions (also called tagged unions) are a powerful pattern for modeling state, events, and protocol messages in TypeScript.

### Discriminant Property
Each variant in the union has a shared property (the discriminant) with a unique literal type. TypeScript uses this to narrow the union.

### Exhaustive Checking
Use \\\`switch\\\` on the discriminant and assign the default case to \\\`never\\\` to ensure all variants are handled. If you add a new variant, TypeScript will error.

### assertNever Helper
A function accepting \\\`never\\\` catches missed cases at compile time and throws at runtime.

### Common Patterns
- **Action/Reducer**: Redux-style state management with action discriminants.
- **State Machines**: Model application states as a discriminated union.
- **Result/Either**: \\\`{ ok: true, value } | { ok: false, error }\\\` for error handling.
- **AST Nodes**: Represent syntax tree variants.
- **Protocol Messages**: Type-safe message passing.

### Nested Unions
Discriminated unions can be nested for complex hierarchies.

### Pattern Matching
TypeScript does not have native pattern matching, but libraries like ts-pattern provide it. You can also use switch/if chains and maps.
`,
  exercises: [
    {
      id: 'ts-discrim-1',
      title: 'Basic discriminant',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the discriminant property to distinguish Circle from Rectangle.',
      skeleton: `interface Circle {
  __BLANK__: "circle";
  radius: number;
}

interface Rectangle {
  __BLANK__: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Rectangle;`,
      solution: `interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Rectangle;`,
      hints: [
        'The discriminant is a shared property with different literal values.',
        'Common names are "kind", "type", or "tag".',
        'The answer is: kind',
      ],
      concepts: ['discriminant property', 'literal type', 'tagged union'],
    },
    {
      id: 'ts-discrim-2',
      title: 'Switch on discriminant',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the switch statement to narrow the union type.',
      skeleton: `interface Circle { kind: "circle"; radius: number; }
interface Square { kind: "square"; side: number; }
type Shape = Circle | Square;

function area(shape: Shape): number {
  switch (shape.__BLANK__) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
  }
}`,
      solution: `interface Circle { kind: "circle"; radius: number; }
interface Square { kind: "square"; side: number; }
type Shape = Circle | Square;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
  }
}`,
      hints: [
        'Switch on the discriminant property.',
        'The discriminant is the "kind" property.',
        'The answer is: kind',
      ],
      concepts: ['switch narrowing', 'discriminant property'],
    },
    {
      id: 'ts-discrim-3',
      title: 'Predict discriminated union',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `type Result = { ok: true; value: number } | { ok: false; error: string };

function show(r: Result): string {
  if (r.ok) {
    return "Value: " + r.value;
  }
  return "Error: " + r.error;
}

console.log(show({ ok: true, value: 42 }));
console.log(show({ ok: false, error: "not found" }));`,
      solution: `Value: 42
Error: not found`,
      hints: [
        'The ok property acts as the discriminant (true or false).',
        'When ok is true, r is narrowed to { ok: true; value: number }.',
        'Output: Value: 42, Error: not found',
      ],
      concepts: ['boolean discriminant', 'Result type', 'narrowing'],
    },
    {
      id: 'ts-discrim-4',
      title: 'assertNever helper',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the assertNever function for exhaustive checking.',
      skeleton: `function assertNever(value: __BLANK__): never {
  throw new Error(\\\`Unexpected value: \${value}\\\`);
}`,
      solution: `function assertNever(value: never): never {
  throw new Error(\\\`Unexpected value: \${value}\\\`);
}`,
      hints: [
        'The parameter type should be the type that remains after all cases are handled.',
        'If all cases are covered, the remaining type is never.',
        'The answer is: never',
      ],
      concepts: ['assertNever', 'never type', 'exhaustive checking'],
    },
    {
      id: 'ts-discrim-5',
      title: 'Exhaustive switch',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a function with an exhaustive switch that handles all variants and uses assertNever.',
      skeleton: `type Direction = "north" | "south" | "east" | "west";

function assertNever(value: never): never {
  throw new Error(\\\`Unexpected: \${value}\\\`);
}

// Write function move(dir: Direction): string
// Return "up", "down", "right", "left" with exhaustive check
`,
      solution: `type Direction = "north" | "south" | "east" | "west";

function assertNever(value: never): never {
  throw new Error(\\\`Unexpected: \${value}\\\`);
}

function move(dir: Direction): string {
  switch (dir) {
    case "north": return "up";
    case "south": return "down";
    case "east": return "right";
    case "west": return "left";
    default: return assertNever(dir);
  }
}`,
      hints: [
        'Handle all four directions in the switch.',
        'The default case should call assertNever with the narrowed value.',
        'If all cases are handled, the default is unreachable and dir is never.',
      ],
      concepts: ['exhaustive switch', 'assertNever', 'string union'],
    },
    {
      id: 'ts-discrim-6',
      title: 'Numeric discriminant',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a discriminated union using numeric discriminants for HTTP responses.',
      skeleton: `// Define types for HTTP 200, 404, and 500 responses
// Use a numeric "status" discriminant
// Write a function handleResponse that switches on status
`,
      solution: `interface OkResponse {
  status: 200;
  data: string;
}

interface NotFoundResponse {
  status: 404;
  path: string;
}

interface ServerError {
  status: 500;
  error: Error;
}

type HttpResponse = OkResponse | NotFoundResponse | ServerError;

function handleResponse(res: HttpResponse): string {
  switch (res.status) {
    case 200: return \\\`Data: \${res.data}\\\`;
    case 404: return \\\`Not found: \${res.path}\\\`;
    case 500: return \\\`Server error: \${res.error.message}\\\`;
  }
}`,
      hints: [
        'Numeric literals work as discriminants just like strings.',
        'Each interface has a status property with a specific number literal.',
        'The switch statement narrows based on the numeric value.',
      ],
      concepts: ['numeric discriminant', 'HTTP responses', 'literal types'],
    },
    {
      id: 'ts-discrim-7',
      title: 'Action/reducer pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Implement a typed Redux-style reducer with discriminated action types.',
      skeleton: `interface State { count: number; }

// Define actions: Increment (no payload), Decrement (no payload), Set (payload: number)
// Write a reducer function
`,
      solution: `interface State { count: number; }

type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET"; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "SET":
      return { count: action.payload };
  }
}`,
      hints: [
        'Define Action as a discriminated union with "type" as the discriminant.',
        'The reducer switches on action.type to handle each case.',
        'Only the SET action has a payload property.',
      ],
      concepts: ['action/reducer', 'Redux pattern', 'discriminated union'],
    },
    {
      id: 'ts-discrim-8',
      title: 'State machine',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Model a loading state machine with idle, loading, success, and error states.',
      skeleton: `// Define a LoadingState discriminated union with:
// idle, loading, success (data: T), error (error: Error)
// Write a function renderState<T> that returns a string for each state
`,
      solution: `type LoadingState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

function renderState<T>(state: LoadingState<T>): string {
  switch (state.status) {
    case "idle":
      return "Ready";
    case "loading":
      return "Loading...";
    case "success":
      return \\\`Data: \${JSON.stringify(state.data)}\\\`;
    case "error":
      return \\\`Error: \${state.error.message}\\\`;
  }
}`,
      hints: [
        'Use "status" as the discriminant property.',
        'Only "success" has data, only "error" has error.',
        'Make the union generic with <T> for the data type.',
      ],
      concepts: ['state machine', 'generic discriminated union', 'loading states'],
    },
    {
      id: 'ts-discrim-9',
      title: 'Fix: missing discriminant case',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'A new "warning" log level was added but not handled in the switch. Fix the exhaustive check.',
      skeleton: `type LogLevel = "info" | "error" | "debug" | "warning";

function assertNever(value: never): never {
  throw new Error(\\\`Unhandled: \${value}\\\`);
}

function getIcon(level: LogLevel): string {
  switch (level) {
    case "info": return "i";
    case "error": return "x";
    case "debug": return "?";
    default: return assertNever(level); // Error: 'warning' not assignable to never
  }
}`,
      solution: `type LogLevel = "info" | "error" | "debug" | "warning";

function assertNever(value: never): never {
  throw new Error(\\\`Unhandled: \${value}\\\`);
}

function getIcon(level: LogLevel): string {
  switch (level) {
    case "info": return "i";
    case "error": return "x";
    case "debug": return "?";
    case "warning": return "!";
    default: return assertNever(level);
  }
}`,
      hints: [
        'The assertNever error tells you which variant is not handled.',
        'Add a case for "warning" to fix the exhaustive check.',
        'case "warning": return "!";',
      ],
      concepts: ['exhaustive check failure', 'missing case', 'assertNever'],
    },
    {
      id: 'ts-discrim-10',
      title: 'Nested discriminated union',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create a nested discriminated union for an event system with categories.',
      skeleton: `// Define events:
// Category "user": Login (userId: string), Logout (userId: string)
// Category "system": Startup, Shutdown (reason: string)
// Write a function describeEvent that handles all cases
`,
      solution: `type UserEvent =
  | { category: "user"; type: "login"; userId: string }
  | { category: "user"; type: "logout"; userId: string };

type SystemEvent =
  | { category: "system"; type: "startup" }
  | { category: "system"; type: "shutdown"; reason: string };

type AppEvent = UserEvent | SystemEvent;

function describeEvent(event: AppEvent): string {
  switch (event.category) {
    case "user":
      switch (event.type) {
        case "login": return \\\`User \${event.userId} logged in\\\`;
        case "logout": return \\\`User \${event.userId} logged out\\\`;
      }
    case "system":
      switch (event.type) {
        case "startup": return "System started";
        case "shutdown": return \\\`System shutdown: \${event.reason}\\\`;
      }
  }
}`,
      hints: [
        'Use two levels of discriminants: category and type.',
        'First switch on category, then switch on type within each case.',
        'TypeScript narrows at each level.',
      ],
      concepts: ['nested discriminated union', 'multi-level narrowing'],
    },
    {
      id: 'ts-discrim-11',
      title: 'Result/Either pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Implement a full Result type with map and flatMap methods.',
      skeleton: `// Define Result<T, E> as a discriminated union
// Add map and flatMap helper functions
`,
      solution: `type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

function map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
  if (result.ok) {
    return ok(fn(result.value));
  }
  return result;
}

function flatMap<T, U, E>(result: Result<T, E>, fn: (value: T) => Result<U, E>): Result<U, E> {
  if (result.ok) {
    return fn(result.value);
  }
  return result;
}`,
      hints: [
        'ok() creates a success result, err() creates a failure result.',
        'map transforms the value if ok, passes through the error if not.',
        'flatMap is like map but the function returns a Result (avoids nesting).',
      ],
      concepts: ['Result type', 'map', 'flatMap', 'functional error handling'],
    },
    {
      id: 'ts-discrim-12',
      title: 'Predict exhaustive check',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Does this code compile? If not, what is the error?',
      skeleton: `type Animal = { type: "dog"; breed: string } | { type: "cat"; color: string };

function getName(animal: Animal): string {
  switch (animal.type) {
    case "dog":
      return animal.breed;
  }
}

// Does this compile? What happens?`,
      solution: `No, TypeScript error: Function lacks ending return statement and return type does not include 'undefined'.`,
      hints: [
        'The switch does not cover "cat", so there is no return for that case.',
        'TypeScript requires all code paths to return a value.',
        'The function might fall through without returning when animal is a cat.',
      ],
      concepts: ['exhaustive check', 'missing return', 'compiler error'],
    },
    {
      id: 'ts-discrim-13',
      title: 'Exhaustive map',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type-safe exhaustive map that ensures all discriminant values are handled.',
      skeleton: `type Color = "red" | "green" | "blue";

// Write a type ExhaustiveMap<K extends string, V> that requires all keys
// Write function mapColor(color: Color): string using an exhaustive map object
`,
      solution: `type ExhaustiveMap<K extends string, V> = { [P in K]: V };

const colorMap: ExhaustiveMap<Color, string> = {
  red: "#ff0000",
  green: "#00ff00",
  blue: "#0000ff",
};

type Color = "red" | "green" | "blue";

function mapColor(color: Color): string {
  return colorMap[color];
}`,
      hints: [
        'Use a mapped type to require all literal values as keys.',
        '{ [P in K]: V } creates a type with every K as a required key.',
        'If you miss a color, TypeScript will error on the object literal.',
      ],
      concepts: ['exhaustive map', 'mapped type', 'lookup pattern'],
    },
    {
      id: 'ts-discrim-14',
      title: 'Discriminated union with generics',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Create a generic discriminated union for API endpoints with typed request/response pairs.',
      skeleton: `// Define endpoints:
// GET /users -> User[]
// POST /users -> User (body: { name: string })
// DELETE /users/:id -> void
// Write an ApiCall<T> union and a handler
`,
      solution: `interface User { id: number; name: string; }

type ApiCall =
  | { method: "GET"; path: "/users"; response: User[] }
  | { method: "POST"; path: "/users"; body: { name: string }; response: User }
  | { method: "DELETE"; path: "/users/:id"; params: { id: string }; response: void };

async function handleCall(call: ApiCall): Promise<string> {
  switch (call.method) {
    case "GET":
      return \\\`Fetching users from \${call.path}\\\`;
    case "POST":
      return \\\`Creating user: \${call.body.name}\\\`;
    case "DELETE":
      return \\\`Deleting user: \${call.params.id}\\\`;
  }
}`,
      hints: [
        'Use "method" as the discriminant property.',
        'Each variant has different properties (body, params, response).',
        'TypeScript narrows to the specific variant in each case.',
      ],
      concepts: ['generic discriminated union', 'API typing', 'method discriminant'],
    },
    {
      id: 'ts-discrim-15',
      title: 'AST node types',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Model a simple expression AST using discriminated unions and write an evaluator.',
      skeleton: `// Define AST nodes: NumberLiteral, BinaryExpr (op: + | -), UnaryExpr (op: -)
// Write function evaluate(node: Expr): number
`,
      solution: `type Expr =
  | { kind: "number"; value: number }
  | { kind: "binary"; op: "+" | "-"; left: Expr; right: Expr }
  | { kind: "unary"; op: "-"; operand: Expr };

function evaluate(node: Expr): number {
  switch (node.kind) {
    case "number":
      return node.value;
    case "binary":
      const left = evaluate(node.left);
      const right = evaluate(node.right);
      return node.op === "+" ? left + right : left - right;
    case "unary":
      return -evaluate(node.operand);
  }
}

// (3 + 5) - 2
const expr: Expr = {
  kind: "binary",
  op: "-",
  left: { kind: "binary", op: "+", left: { kind: "number", value: 3 }, right: { kind: "number", value: 5 } },
  right: { kind: "number", value: 2 },
};
console.log(evaluate(expr)); // 6`,
      hints: [
        'Use "kind" as the discriminant for AST node types.',
        'The evaluator recursively handles each node kind.',
        'BinaryExpr has left and right children, UnaryExpr has one operand.',
      ],
      concepts: ['AST', 'recursive union', 'expression evaluation'],
    },
    {
      id: 'ts-discrim-16',
      title: 'Visitor pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Implement a type-safe visitor for a discriminated union.',
      skeleton: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "triangle"; base: number; height: number };

// Define Visitor<R> that has a method for each shape kind
// Write function visit<R>(shape: Shape, visitor: Visitor<R>): R
`,
      solution: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "triangle"; base: number; height: number };

interface Visitor<R> {
  circle(shape: Extract<Shape, { kind: "circle" }>): R;
  square(shape: Extract<Shape, { kind: "square" }>): R;
  triangle(shape: Extract<Shape, { kind: "triangle" }>): R;
}

function visit<R>(shape: Shape, visitor: Visitor<R>): R {
  switch (shape.kind) {
    case "circle": return visitor.circle(shape);
    case "square": return visitor.square(shape);
    case "triangle": return visitor.triangle(shape);
  }
}

const areaVisitor: Visitor<number> = {
  circle: (s) => Math.PI * s.radius ** 2,
  square: (s) => s.side ** 2,
  triangle: (s) => (s.base * s.height) / 2,
};`,
      hints: [
        'The Visitor interface has one method per union variant.',
        'Use Extract to get the specific variant type for each method.',
        'The visit function dispatches to the appropriate visitor method.',
      ],
      concepts: ['visitor pattern', 'Extract utility', 'double dispatch'],
    },
    {
      id: 'ts-discrim-17',
      title: 'Protocol messages',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Define a type-safe WebSocket protocol with discriminated message types.',
      skeleton: `// Define messages: Ping, Pong, TextMessage (content: string), Binary (data: Uint8Array)
// Write a function processMessage that handles all types
`,
      solution: `type WsMessage =
  | { type: "ping" }
  | { type: "pong" }
  | { type: "text"; content: string }
  | { type: "binary"; data: Uint8Array };

function processMessage(msg: WsMessage): string {
  switch (msg.type) {
    case "ping":
      return "Received ping, sending pong";
    case "pong":
      return "Received pong";
    case "text":
      return \\\`Text: \${msg.content}\\\`;
    case "binary":
      return \\\`Binary: \${msg.data.length} bytes\\\`;
  }
}`,
      hints: [
        'Use "type" as the discriminant for protocol messages.',
        'Each message type has different associated data.',
        'The switch exhaustively handles all message types.',
      ],
      concepts: ['protocol messages', 'WebSocket types', 'message handling'],
    },
    {
      id: 'ts-discrim-18',
      title: 'Fix: non-exhaustive handler',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This code does not handle all event types and has no exhaustive check. Add the missing case and assertNever.',
      skeleton: `type Event =
  | { kind: "click"; x: number; y: number }
  | { kind: "keypress"; key: string }
  | { kind: "scroll"; delta: number };

function handle(event: Event): string {
  switch (event.kind) {
    case "click":
      return \\\`Click at \${event.x},\${event.y}\\\`;
    case "keypress":
      return \\\`Key: \${event.key}\\\`;
    // Missing scroll case, no exhaustive check
  }
  return "unknown";
}`,
      solution: `type Event =
  | { kind: "click"; x: number; y: number }
  | { kind: "keypress"; key: string }
  | { kind: "scroll"; delta: number };

function assertNever(value: never): never {
  throw new Error(\\\`Unhandled event: \${JSON.stringify(value)}\\\`);
}

function handle(event: Event): string {
  switch (event.kind) {
    case "click":
      return \\\`Click at \${event.x},\${event.y}\\\`;
    case "keypress":
      return \\\`Key: \${event.key}\\\`;
    case "scroll":
      return \\\`Scroll: \${event.delta}\\\`;
    default:
      return assertNever(event);
  }
}`,
      hints: [
        'Add the missing case for "scroll".',
        'Add a default case with assertNever for compile-time exhaustive checking.',
        'Remove the fallthrough "return unknown" at the end.',
      ],
      concepts: ['exhaustive check', 'missing case', 'assertNever'],
    },
    {
      id: 'ts-discrim-19',
      title: 'Refactor: if/else to discriminated union',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this type-unsafe code using string checks into a proper discriminated union.',
      skeleton: `function processPayment(payment: any): string {
  if (payment.method === "credit") {
    return \\\`Charging card \${payment.cardNumber}\\\`;
  } else if (payment.method === "paypal") {
    return \\\`PayPal: \${payment.email}\\\`;
  } else if (payment.method === "crypto") {
    return \\\`Crypto wallet: \${payment.walletAddress}\\\`;
  }
  return "Unknown payment method";
}`,
      solution: `type Payment =
  | { method: "credit"; cardNumber: string; expiry: string }
  | { method: "paypal"; email: string }
  | { method: "crypto"; walletAddress: string };

function assertNever(value: never): never {
  throw new Error(\\\`Unexpected payment: \${JSON.stringify(value)}\\\`);
}

function processPayment(payment: Payment): string {
  switch (payment.method) {
    case "credit":
      return \\\`Charging card \${payment.cardNumber}\\\`;
    case "paypal":
      return \\\`PayPal: \${payment.email}\\\`;
    case "crypto":
      return \\\`Crypto wallet: \${payment.walletAddress}\\\`;
    default:
      return assertNever(payment);
  }
}`,
      hints: [
        'Replace "any" with a proper discriminated union type.',
        'Define each payment method as a variant with its specific properties.',
        'Use a switch with assertNever for exhaustive checking.',
      ],
      concepts: ['refactoring', 'type safety', 'discriminated union'],
    },
    {
      id: 'ts-discrim-20',
      title: 'Refactor: class hierarchy to union',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this class hierarchy into a discriminated union for simpler data handling.',
      skeleton: `abstract class Notification {
  abstract display(): string;
}

class EmailNotification extends Notification {
  constructor(public to: string, public subject: string) { super(); }
  display() { return \\\`Email to \${this.to}: \${this.subject}\\\`; }
}

class SmsNotification extends Notification {
  constructor(public phone: string, public message: string) { super(); }
  display() { return \\\`SMS to \${this.phone}: \${this.message}\\\`; }
}

class PushNotification extends Notification {
  constructor(public token: string, public title: string) { super(); }
  display() { return \\\`Push to \${this.token}: \${this.title}\\\`; }
}`,
      solution: `type Notification =
  | { type: "email"; to: string; subject: string }
  | { type: "sms"; phone: string; message: string }
  | { type: "push"; token: string; title: string };

function displayNotification(n: Notification): string {
  switch (n.type) {
    case "email":
      return \\\`Email to \${n.to}: \${n.subject}\\\`;
    case "sms":
      return \\\`SMS to \${n.phone}: \${n.message}\\\`;
    case "push":
      return \\\`Push to \${n.token}: \${n.title}\\\`;
  }
}

// Benefits: simpler serialization, pattern matching, no class overhead
const notification: Notification = { type: "email", to: "alice@test.com", subject: "Hello" };
console.log(displayNotification(notification));`,
      hints: [
        'Replace abstract class + subclasses with a type union.',
        'Each class becomes a variant with a "type" discriminant.',
        'The display method becomes a standalone function with a switch.',
      ],
      concepts: ['refactoring', 'class to union', 'data-oriented design'],
    },
  ],
};
