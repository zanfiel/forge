import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-union-inter',
  title: '15. Union & Intersection Types',
  explanation: `## Union & Intersection Types

Union and intersection types are two of TypeScript's most powerful composition tools.

### Union Types (\\\`|\\\`)
A union type means "one of these types":
\\\`\\\`\\\`typescript
type StringOrNumber = string | number;
\\\`\\\`\\\`

You can only use members common to all types in the union unless you narrow first.

### Discriminated Unions
Add a literal "tag" property to each variant for safe narrowing:
\\\`\\\`\\\`typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };
\\\`\\\`\\\`

### Intersection Types (\\\`&\\\`)
An intersection type means "all of these types combined":
\\\`\\\`\\\`typescript
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged; // { name: string; age: number }
\\\`\\\`\\\`

### Narrowing Unions
- \\\`typeof\\\` guards: \\\`if (typeof x === "string")\\\`
- \\\`in\\\` operator: \\\`if ("radius" in shape)\\\`
- Discriminant checks: \\\`if (shape.kind === "circle")\\\`
- Custom type guards: \\\`function isCircle(s: Shape): s is Circle\\\`

### Key Concepts
- **Exhaustive checking**: use \\\`never\\\` to ensure all union variants are handled
- **Literal unions**: \\\`type Dir = "north" | "south" | "east" | "west"\\\`
- **Union with null/undefined**: \\\`type Maybe<T> = T | null | undefined\\\`
- **Distributive behavior**: conditional types distribute over unions
- **Branded types**: use intersections with unique symbols for nominal typing`,
  exercises: [
    // --- 1 ---
    {
      id: 'ts-union-inter-1',
      title: 'Basic union type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a variable that accepts either a string or number.',
      skeleton: `let value: __BLANK__;
value = "hello";
value = 42;`,
      solution: `let value: string | number;
value = "hello";
value = 42;`,
      hints: [
        'A union type uses the pipe | character between types.',
        'The variable should accept string or number.',
        'string | number',
      ],
      concepts: ['union type basics'],
    },
    // --- 2 ---
    {
      id: 'ts-union-inter-2',
      title: 'Narrowing with typeof',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use typeof to narrow a union type inside an if statement.',
      skeleton: `function describe(value: string | number): string {
  if (__BLANK__) {
    return \`String of length \${value.length}\`;
  }
  return \`Number: \${value.toFixed(2)}\`;
}`,
      solution: `function describe(value: string | number): string {
  if (typeof value === "string") {
    return \`String of length \${value.length}\`;
  }
  return \`Number: \${value.toFixed(2)}\`;
}`,
      hints: [
        'typeof returns the runtime type as a string.',
        'Check if typeof value equals "string".',
        'typeof value === "string"',
      ],
      concepts: ['narrowing unions', 'typeof guard'],
    },
    // --- 3 ---
    {
      id: 'ts-union-inter-3',
      title: 'Union with null',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Type a function parameter that can be a string or null.',
      skeleton: `function greet(name: __BLANK__): string {
  if (name === null) {
    return "Hello, stranger!";
  }
  return \`Hello, \${name}!\`;
}`,
      solution: `function greet(name: string | null): string {
  if (name === null) {
    return "Hello, stranger!";
  }
  return \`Hello, \${name}!\`;
}`,
      hints: [
        'Include null in the union to allow null values.',
        'string | null means the value is either a string or null.',
        'string | null',
      ],
      concepts: ['union with null', 'nullable types'],
    },
    // --- 4 ---
    {
      id: 'ts-union-inter-4',
      title: 'Literal union type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a type for compass directions using literal unions.',
      skeleton: `type Direction = __BLANK__;

function move(dir: Direction): string {
  return \`Moving \${dir}\`;
}

move("north");
move("south");`,
      solution: `type Direction = "north" | "south" | "east" | "west";

function move(dir: Direction): string {
  return \`Moving \${dir}\`;
}

move("north");
move("south");`,
      hints: [
        'Literal types are specific values like "north" or "south".',
        'Combine them with | to allow exactly those values.',
        '"north" | "south" | "east" | "west"',
      ],
      concepts: ['union of literal types', 'string literals'],
    },
    // --- 5 ---
    {
      id: 'ts-union-inter-5',
      title: 'Intersection basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Combine two types using an intersection.',
      skeleton: `type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName __BLANK__ HasAge;

const p: Person = { name: "Alice", age: 30 };`,
      solution: `type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge;

const p: Person = { name: "Alice", age: 30 };`,
      hints: [
        'Intersection types use the & operator.',
        'An intersection combines all properties from both types.',
        'HasName & HasAge',
      ],
      concepts: ['intersection type basics', 'combining types'],
    },
    // --- 6 ---
    {
      id: 'ts-union-inter-6',
      title: 'Discriminated union',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the discriminated union with a "kind" tag for each shape variant.',
      skeleton: `type Shape =
  | { kind: __BLANK__; radius: number }
  | { kind: __BLANK__; side: number }
  | { kind: __BLANK__; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "square": return shape.side ** 2;
    case "rectangle": return shape.width * shape.height;
  }
}`,
      solution: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "square": return shape.side ** 2;
    case "rectangle": return shape.width * shape.height;
  }
}`,
      hints: [
        'Each variant needs a unique literal string for the kind property.',
        'Match the kind values to the switch cases.',
        '"circle", "square", "rectangle"',
      ],
      concepts: ['discriminated unions', 'tagged unions'],
    },
    // --- 7 ---
    {
      id: 'ts-union-inter-7',
      title: 'Exhaustive check with never',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Add exhaustive checking to ensure all variants of a union are handled.',
      skeleton: `type Status = "pending" | "active" | "closed";

function handleStatus(status: Status): string {
  switch (status) {
    case "pending": return "Waiting...";
    case "active": return "In progress";
    case "closed": return "Done";
    // Add exhaustive check
  }
}`,
      solution: `type Status = "pending" | "active" | "closed";

function handleStatus(status: Status): string {
  switch (status) {
    case "pending": return "Waiting...";
    case "active": return "In progress";
    case "closed": return "Done";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}`,
      hints: [
        'If all cases are handled, status should be type "never" in the default.',
        'Assign status to a variable of type never -- this will error if a case is missed.',
        'default: { const _exhaustive: never = status; return _exhaustive; }',
      ],
      concepts: ['exhaustive checking', 'never type'],
    },
    // --- 8 ---
    {
      id: 'ts-union-inter-8',
      title: 'Combining interfaces with &',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use intersection types to combine multiple interfaces into one type.',
      skeleton: `interface Printable {
  print(): string;
}

interface Serializable {
  serialize(): string;
}

interface Loggable {
  log(): void;
}

// Create a type that combines all three

// Write a function that accepts the combined type
function processItem(item: PrintableSerializableLoggable): void {
  console.log(item.print());
  console.log(item.serialize());
  item.log();
}`,
      solution: `interface Printable {
  print(): string;
}

interface Serializable {
  serialize(): string;
}

interface Loggable {
  log(): void;
}

type PrintableSerializableLoggable = Printable & Serializable & Loggable;

function processItem(item: PrintableSerializableLoggable): void {
  console.log(item.print());
  console.log(item.serialize());
  item.log();
}`,
      hints: [
        'Use & to intersect multiple interfaces.',
        'The result has all methods from all three interfaces.',
        'type PrintableSerializableLoggable = Printable & Serializable & Loggable;',
      ],
      concepts: ['combining interfaces with &', 'intersection for mixins'],
    },
    // --- 9 ---
    {
      id: 'ts-union-inter-9',
      title: 'Union type guard function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a custom type guard function for a discriminated union.',
      skeleton: `type Cat = { kind: "cat"; purrs: boolean };
type Dog = { kind: "dog"; barks: boolean };
type Pet = Cat | Dog;

// Write a type guard function that checks if a Pet is a Cat
function isCat(pet: Pet): pet is Cat {
  // implement
}

function handlePet(pet: Pet): string {
  if (isCat(pet)) {
    return pet.purrs ? "Purring cat" : "Quiet cat";
  }
  return pet.barks ? "Barking dog" : "Quiet dog";
}`,
      solution: `type Cat = { kind: "cat"; purrs: boolean };
type Dog = { kind: "dog"; barks: boolean };
type Pet = Cat | Dog;

function isCat(pet: Pet): pet is Cat {
  return pet.kind === "cat";
}

function handlePet(pet: Pet): string {
  if (isCat(pet)) {
    return pet.purrs ? "Purring cat" : "Quiet cat";
  }
  return pet.barks ? "Barking dog" : "Quiet dog";
}`,
      hints: [
        'A type guard uses "pet is Cat" as the return type.',
        'Check the discriminant property: pet.kind === "cat".',
        'return pet.kind === "cat";',
      ],
      concepts: ['union type guards', 'type predicates'],
    },
    // --- 10 ---
    {
      id: 'ts-union-inter-10',
      title: 'Union with undefined',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the function so it safely handles undefined values.',
      skeleton: `function getLength(value: string | undefined): number {
  return value.length;
}`,
      solution: `function getLength(value: string | undefined): number {
  if (value === undefined) {
    return 0;
  }
  return value.length;
}`,
      hints: [
        'Accessing .length on undefined will throw a runtime error.',
        'Check for undefined before accessing properties.',
        'if (value === undefined) return 0; then access value.length safely.',
      ],
      concepts: ['union with undefined', 'null safety'],
    },
    // --- 11 ---
    {
      id: 'ts-union-inter-11',
      title: 'Union with functions',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict how TypeScript narrows a union type through control flow.',
      skeleton: `type Formatter = ((val: number) => string) | string;

function format(input: number, formatter: Formatter): string {
  if (typeof formatter === "function") {
    return formatter(input);
  }
  return formatter.replace("{}", String(input));
}

console.log(format(42, (n) => \`Value: \${n}\`));
console.log(format(42, "Result: {}"));`,
      solution: `Value: 42
Result: 42`,
      hints: [
        'typeof formatter === "function" narrows to the function variant.',
        'In the else branch, formatter is narrowed to string.',
        'First call uses the function, second uses string replacement.',
      ],
      concepts: ['union with functions', 'typeof narrowing'],
    },
    // --- 12 ---
    {
      id: 'ts-union-inter-12',
      title: 'Union with arrays',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that accepts either a single item or an array of items and always returns an array.',
      skeleton: `function toArray<T>(input: T | T[]): T[] {
  // if input is already an array, return it; otherwise wrap in array
}`,
      solution: `function toArray<T>(input: T | T[]): T[] {
  return Array.isArray(input) ? input : [input];
}`,
      hints: [
        'Use Array.isArray() to check if the input is an array.',
        'If it is an array, return it directly. Otherwise, wrap it.',
        'return Array.isArray(input) ? input : [input];',
      ],
      concepts: ['union with arrays', 'Array.isArray'],
    },
    // --- 13 ---
    {
      id: 'ts-union-inter-13',
      title: 'Intersection conflicts',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict what happens when intersection types have conflicting properties.',
      skeleton: `type A = { value: string };
type B = { value: number };
type C = A & B;

// What is the type of C["value"]?
// Can you create a valid value of type C?
// The type of value is: string & number = never`,
      solution: `The type of C["value"] is never (string & number is impossible). No valid value of type C can be created.`,
      hints: [
        'When properties intersect with incompatible types, the result is an intersection of those types.',
        'string & number has no valid values -- it reduces to never.',
        'C["value"] is never. You cannot create a valid instance of C.',
      ],
      concepts: ['intersection conflicts', 'never type'],
    },
    // --- 14 ---
    {
      id: 'ts-union-inter-14',
      title: 'Discriminated union pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Implement a Result type pattern using discriminated unions.',
      skeleton: `// Define Ok<T> with: ok: true, value: T
// Define Err<E> with: ok: false, error: E
// Define Result<T, E> as Ok<T> | Err<E>

// Write helper constructors
function ok<T>(value: T): Result<T, never> {
  // implement
}

function err<E>(error: E): Result<never, E> {
  // implement
}

// Write a function that uses Result
function divide(a: number, b: number): Result<number, string> {
  // return err if b is 0, otherwise return ok
}`,
      solution: `type Ok<T> = { ok: true; value: T };
type Err<E> = { ok: false; error: E };
type Result<T, E> = Ok<T> | Err<E>;

function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return err("Division by zero");
  return ok(a / b);
}`,
      hints: [
        'Ok has ok: true and a value; Err has ok: false and an error.',
        'Result is the union of Ok and Err.',
        'Use the ok boolean as the discriminant for narrowing.',
      ],
      concepts: ['discriminated union pattern', 'Result type'],
    },
    // --- 15 ---
    {
      id: 'ts-union-inter-15',
      title: 'Union patterns for state',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Model a fetch request lifecycle using discriminated unions.',
      skeleton: `// Define states:
// Idle: { status: "idle" }
// Loading: { status: "loading" }
// Success<T>: { status: "success"; data: T }
// Error: { status: "error"; error: string }
// FetchState<T> = union of all four

function renderState<T>(state: FetchState<T>): string {
  // handle all four states
}`,
      solution: `type Idle = { status: "idle" };
type Loading = { status: "loading" };
type Success<T> = { status: "success"; data: T };
type FetchError = { status: "error"; error: string };
type FetchState<T> = Idle | Loading | Success<T> | FetchError;

function renderState<T>(state: FetchState<T>): string {
  switch (state.status) {
    case "idle": return "Ready";
    case "loading": return "Loading...";
    case "success": return \`Data: \${JSON.stringify(state.data)}\`;
    case "error": return \`Error: \${state.error}\`;
  }
}`,
      hints: [
        'Each state has a unique "status" literal as the discriminant.',
        'Use a switch on state.status to handle each case.',
        'TypeScript narrows the type in each case branch automatically.',
      ],
      concepts: ['practical union patterns', 'state modeling'],
    },
    // --- 16 ---
    {
      id: 'ts-union-inter-16',
      title: 'Branded types intro',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Create branded types to prevent mixing up string IDs from different domains.',
      skeleton: `// Define branded types for UserId and PostId
// They should be strings at runtime but incompatible at the type level

// Write constructors
function userId(id: string): UserId {
  // implement
}

function postId(id: string): PostId {
  // implement
}

function getUser(id: UserId): string {
  return \`User: \${id}\`;
}

// getUser(postId("123")); // Should be a type error`,
      solution: `type UserId = string & { readonly __brand: "UserId" };
type PostId = string & { readonly __brand: "PostId" };

function userId(id: string): UserId {
  return id as UserId;
}

function postId(id: string): PostId {
  return id as PostId;
}

function getUser(id: UserId): string {
  return \`User: \${id}\`;
}

// getUser(postId("123")); // Error: PostId is not assignable to UserId`,
      hints: [
        'Branded types use an intersection with a phantom property.',
        'The __brand property exists only at the type level, not at runtime.',
        'type UserId = string & { readonly __brand: "UserId" };',
      ],
      concepts: ['branded types', 'nominal typing', 'phantom properties'],
    },
    // --- 17 ---
    {
      id: 'ts-union-inter-17',
      title: 'Union narrowing in loops',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix the type error when processing an array of union types.',
      skeleton: `type TextNode = { type: "text"; content: string };
type ImageNode = { type: "image"; src: string; alt: string };
type Node = TextNode | ImageNode;

function renderNodes(nodes: Node[]): string[] {
  const results: string[] = [];
  for (const node of nodes) {
    if (node.type === "text") {
      results.push(node.content);
    } else if (node.type === "image") {
      results.push(\`<img src="\${node.src}" alt="\${node.alt}">\`);
    }
  }
  return results;
}

// Bug: this function doesn't handle new LinkNode type
type LinkNode = { type: "link"; href: string; text: string };
type NodeV2 = TextNode | ImageNode | LinkNode;

function renderNodesV2(nodes: NodeV2[]): string[] {
  const results: string[] = [];
  for (const node of nodes) {
    if (node.type === "text") {
      results.push(node.content);
    } else if (node.type === "image") {
      results.push(\`<img src="\${node.src}" alt="\${node.alt}">\`);
    }
    // Missing link handling
  }
  return results;
}`,
      solution: `type TextNode = { type: "text"; content: string };
type ImageNode = { type: "image"; src: string; alt: string };
type LinkNode = { type: "link"; href: string; text: string };
type NodeV2 = TextNode | ImageNode | LinkNode;

function renderNodesV2(nodes: NodeV2[]): string[] {
  const results: string[] = [];
  for (const node of nodes) {
    switch (node.type) {
      case "text":
        results.push(node.content);
        break;
      case "image":
        results.push(\`<img src="\${node.src}" alt="\${node.alt}">\`);
        break;
      case "link":
        results.push(\`<a href="\${node.href}">\${node.text}</a>\`);
        break;
      default: {
        const _exhaustive: never = node;
        throw new Error(\`Unhandled node type: \${_exhaustive}\`);
      }
    }
  }
  return results;
}`,
      hints: [
        'The link type is missing from the rendering logic.',
        'Use a switch statement for cleaner discriminated union handling.',
        'Add case "link" and an exhaustive default check with never.',
      ],
      concepts: ['union narrowing in loops', 'exhaustive checking'],
    },
    // --- 18 ---
    {
      id: 'ts-union-inter-18',
      title: 'Distributive behavior preview',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Predict how a conditional type distributes over a union.',
      skeleton: `type ToArray<T> = T extends any ? T[] : never;

type Result = ToArray<string | number>;
// What is Result?

const a: Result = ["hello"];
const b: Result = [42];
// const c: Result = ["hello", 42]; // Is this valid?`,
      solution: `Result is string[] | number[]. c is NOT valid because (string | number)[] is different from string[] | number[].`,
      hints: [
        'Conditional types distribute over unions by default.',
        'ToArray<string | number> becomes ToArray<string> | ToArray<number>.',
        'Result is string[] | number[], not (string | number)[].',
      ],
      concepts: ['distributive behavior', 'conditional types over unions'],
    },
    // --- 19 ---
    {
      id: 'ts-union-inter-19',
      title: 'Union to intersection',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Understand the relationship between union and intersection for function types.',
      skeleton: `type FnA = (a: string) => void;
type FnB = (b: number) => void;

type UnionFn = FnA | FnB;
type IntersectionFn = FnA & FnB;

// Which can be called with a string?
// Which can be called with a number?
// Which can be called with either?

const unionFn: UnionFn = (x: string & number) => {};
// What type must x be for UnionFn to be callable?`,
      solution: `UnionFn can only be called with string & number (never in practice). IntersectionFn can be called with either a string OR a number (it is overloaded). A union of functions is only callable with the intersection of their parameter types.`,
      hints: [
        'For a union of functions, TypeScript requires arguments that satisfy ALL variants.',
        'For an intersection of functions, it acts like overloads -- either signature works.',
        'Union of functions: parameters intersect. Intersection of functions: parameters union.',
      ],
      concepts: ['union to intersection', 'function type variance'],
    },
    // --- 20 ---
    {
      id: 'ts-union-inter-20',
      title: 'Refactor to discriminated unions',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this code from using boolean flags to a discriminated union.',
      skeleton: `interface Payment {
  amount: number;
  currency: string;
  isCreditCard: boolean;
  isPaypal: boolean;
  isCrypto: boolean;
  // credit card fields
  cardNumber?: string;
  expiry?: string;
  // paypal fields
  paypalEmail?: string;
  // crypto fields
  walletAddress?: string;
  network?: string;
}

function processPayment(payment: Payment): string {
  if (payment.isCreditCard) {
    return \`Card \${payment.cardNumber} for \${payment.amount} \${payment.currency}\`;
  } else if (payment.isPaypal) {
    return \`PayPal \${payment.paypalEmail} for \${payment.amount} \${payment.currency}\`;
  } else if (payment.isCrypto) {
    return \`Crypto \${payment.walletAddress} on \${payment.network} for \${payment.amount} \${payment.currency}\`;
  }
  return "Unknown payment method";
}`,
      solution: `type CreditCardPayment = {
  method: "credit-card";
  amount: number;
  currency: string;
  cardNumber: string;
  expiry: string;
};

type PaypalPayment = {
  method: "paypal";
  amount: number;
  currency: string;
  paypalEmail: string;
};

type CryptoPayment = {
  method: "crypto";
  amount: number;
  currency: string;
  walletAddress: string;
  network: string;
};

type Payment = CreditCardPayment | PaypalPayment | CryptoPayment;

function processPayment(payment: Payment): string {
  switch (payment.method) {
    case "credit-card":
      return \`Card \${payment.cardNumber} for \${payment.amount} \${payment.currency}\`;
    case "paypal":
      return \`PayPal \${payment.paypalEmail} for \${payment.amount} \${payment.currency}\`;
    case "crypto":
      return \`Crypto \${payment.walletAddress} on \${payment.network} for \${payment.amount} \${payment.currency}\`;
  }
}`,
      hints: [
        'Replace boolean flags with a "method" discriminant property.',
        'Create separate types for each payment method with only their required fields.',
        'Use a switch on payment.method for type-safe narrowing.',
      ],
      concepts: ['refactoring to discriminated unions', 'type safety'],
    },
  ],
};
