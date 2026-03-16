import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-interfaces',
  title: '13. Interfaces',
  explanation: `## Interfaces

Interfaces are one of TypeScript's core tools for defining the shape of objects. They provide a contract that objects must follow.

### Basic Declaration
\\\`\\\`\\\`typescript
interface User {
  name: string;
  age: number;
}
\\\`\\\`\\\`

### Optional & Readonly
\\\`\\\`\\\`typescript
interface Config {
  readonly host: string;
  port?: number; // optional
}
\\\`\\\`\\\`

### Extending Interfaces
Interfaces can extend one or more other interfaces:
\\\`\\\`\\\`typescript
interface Animal { name: string; }
interface Dog extends Animal { breed: string; }
\\\`\\\`\\\`

### Implementing Interfaces
Classes can implement interfaces to guarantee they have certain properties:
\\\`\\\`\\\`typescript
class Cat implements Animal { name = "Whiskers"; }
\\\`\\\`\\\`

### Index Signatures
\\\`\\\`\\\`typescript
interface StringMap { [key: string]: string; }
\\\`\\\`\\\`

### Function Types & Hybrid Types
Interfaces can describe callable objects and objects with both call signatures and properties.

### Declaration Merging
Multiple interface declarations with the same name are automatically merged -- a powerful feature unique to interfaces.

### Interface vs Type Alias
- Interfaces can be extended and merged; type aliases use intersections
- Interfaces are generally preferred for object shapes
- Type aliases are better for unions, tuples, and primitives

### Structural Typing
TypeScript uses structural (duck) typing: if an object has the required properties, it satisfies the interface regardless of explicit declaration.`,
  exercises: [
    // --- 1 ---
    {
      id: 'ts-interfaces-1',
      title: 'Basic interface',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Declare an interface for a Product with name and price.',
      skeleton: `__BLANK__ Product {
  name: string;
  price: number;
}

const item: Product = { name: "Widget", price: 9.99 };`,
      solution: `interface Product {
  name: string;
  price: number;
}

const item: Product = { name: "Widget", price: 9.99 };`,
      hints: [
        'What keyword declares an interface in TypeScript?',
        'It starts with the keyword "interface".',
        'interface Product { ... }',
      ],
      concepts: ['interface declaration', 'object typing'],
    },
    // --- 2 ---
    {
      id: 'ts-interfaces-2',
      title: 'Optional properties',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Make the email property optional.',
      skeleton: `interface Contact {
  name: string;
  phone: string;
  email__BLANK__ string;
}

const c: Contact = { name: "Bob", phone: "555-1234" };`,
      solution: `interface Contact {
  name: string;
  phone: string;
  email?: string;
}

const c: Contact = { name: "Bob", phone: "555-1234" };`,
      hints: [
        'Optional properties use a special character after the property name.',
        'Add a question mark before the colon.',
        'email?: string;',
      ],
      concepts: ['optional properties'],
    },
    // --- 3 ---
    {
      id: 'ts-interfaces-3',
      title: 'Readonly properties',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Make the id property readonly so it cannot be reassigned.',
      skeleton: `interface User {
  __BLANK__ id: number;
  name: string;
}

const user: User = { id: 1, name: "Alice" };
// user.id = 2; // Should be an error`,
      solution: `interface User {
  readonly id: number;
  name: string;
}

const user: User = { id: 1, name: "Alice" };
// user.id = 2; // Error: Cannot assign to 'id'`,
      hints: [
        'Which modifier prevents reassignment of a property?',
        'Place "readonly" before the property name.',
        'readonly id: number;',
      ],
      concepts: ['readonly properties'],
    },
    // --- 4 ---
    {
      id: 'ts-interfaces-4',
      title: 'Extending interfaces',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create an AdminUser interface that extends User.',
      skeleton: `interface User {
  name: string;
  email: string;
}

interface AdminUser __BLANK__ User {
  permissions: string[];
}`,
      solution: `interface User {
  name: string;
  email: string;
}

interface AdminUser extends User {
  permissions: string[];
}`,
      hints: [
        'Interfaces use a keyword to inherit from other interfaces.',
        'The keyword is "extends".',
        'interface AdminUser extends User { ... }',
      ],
      concepts: ['interface extension', 'inheritance'],
    },
    // --- 5 ---
    {
      id: 'ts-interfaces-5',
      title: 'Implementing an interface',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Make the Logger class implement the Loggable interface.',
      skeleton: `interface Loggable {
  log(message: string): void;
}

class Logger __BLANK__ Loggable {
  log(message: string): void {
    console.log(message);
  }
}`,
      solution: `interface Loggable {
  log(message: string): void;
}

class Logger implements Loggable {
  log(message: string): void {
    console.log(message);
  }
}`,
      hints: [
        'Classes use a keyword to satisfy an interface contract.',
        'The keyword is "implements".',
        'class Logger implements Loggable { ... }',
      ],
      concepts: ['implements', 'class interface contract'],
    },
    // --- 6 ---
    {
      id: 'ts-interfaces-6',
      title: 'Index signatures',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Define an interface that allows any string key mapping to a number.',
      skeleton: `interface ScoreBoard {
  __BLANK__;
}

const scores: ScoreBoard = { alice: 100, bob: 85 };`,
      solution: `interface ScoreBoard {
  [player: string]: number;
}

const scores: ScoreBoard = { alice: 100, bob: 85 };`,
      hints: [
        'Index signatures use bracket notation inside the interface.',
        'The syntax is [key: KeyType]: ValueType.',
        '[player: string]: number;',
      ],
      concepts: ['index signatures', 'dynamic keys'],
    },
    // --- 7 ---
    {
      id: 'ts-interfaces-7',
      title: 'Function type interface',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Define an interface for a comparison function and create a function that satisfies it.',
      skeleton: `interface Comparator {
  // define a call signature: (a: number, b: number) => number
}

const ascending: Comparator = // implement it`,
      solution: `interface Comparator {
  (a: number, b: number): number;
}

const ascending: Comparator = (a: number, b: number): number => a - b;`,
      hints: [
        'A function type in an interface uses a call signature: (params): returnType.',
        'The interface body should be: (a: number, b: number): number;',
        'interface Comparator { (a: number, b: number): number; } and const ascending: Comparator = (a, b) => a - b;',
      ],
      concepts: ['function type interface', 'call signature'],
    },
    // --- 8 ---
    {
      id: 'ts-interfaces-8',
      title: 'Interface vs type alias',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict whether this code compiles successfully.',
      skeleton: `interface A {
  x: number;
}
interface A {
  y: number;
}

const obj: A = { x: 1, y: 2 };
console.log(obj.x, obj.y);`,
      solution: `1 2`,
      hints: [
        'Interfaces with the same name in the same scope get merged.',
        'Declaration merging combines both declarations of A.',
        'A has both x and y. Output: 1 2.',
      ],
      concepts: ['declaration merging', 'interface vs type'],
    },
    // --- 9 ---
    {
      id: 'ts-interfaces-9',
      title: 'Generic interface',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Define a generic interface Response<T> with data of type T and a status code, then create a typed response.',
      skeleton: `// Define the interface
interface ApiResponse<T> {
  // data of type T
  // status of type number
  // message of type string
}

// Create a response for string data
const res: ApiResponse<string> = // fill in`,
      solution: `interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const res: ApiResponse<string> = {
  data: "success",
  status: 200,
  message: "OK",
};`,
      hints: [
        'A generic interface has a type parameter in angle brackets after the name.',
        'Use T as the type of the data property.',
        'interface ApiResponse<T> { data: T; status: number; message: string; }',
      ],
      concepts: ['generic interfaces', 'type parameters'],
    },
    // --- 10 ---
    {
      id: 'ts-interfaces-10',
      title: 'Hybrid type interface',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Define an interface for a counter that is both callable and has a count property.',
      skeleton: `interface Counter {
  // call signature: () => number
  // property: count: number
  // method: reset(): void
}

function createCounter(): Counter {
  // implement a counter that increments on each call
}`,
      solution: `interface Counter {
  (): number;
  count: number;
  reset(): void;
}

function createCounter(): Counter {
  const fn = function () {
    fn.count++;
    return fn.count;
  } as Counter;
  fn.count = 0;
  fn.reset = function () {
    fn.count = 0;
  };
  return fn;
}`,
      hints: [
        'A hybrid type has both a call signature and properties/methods.',
        'The call signature looks like (): number; in the interface body.',
        'Cast the function to Counter, then attach count and reset properties.',
      ],
      concepts: ['hybrid types', 'callable objects'],
    },
    // --- 11 ---
    {
      id: 'ts-interfaces-11',
      title: 'Declaration merging',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the type error by using declaration merging instead of duplicate type alias.',
      skeleton: `type Config = {
  host: string;
};

type Config = {
  port: number;
};

const config: Config = { host: "localhost", port: 3000 };`,
      solution: `interface Config {
  host: string;
}

interface Config {
  port: number;
}

const config: Config = { host: "localhost", port: 3000 };`,
      hints: [
        'Type aliases cannot be declared twice -- they cause a "Duplicate identifier" error.',
        'Interfaces support declaration merging: multiple declarations are combined.',
        'Change both "type" to "interface" and remove the = sign.',
      ],
      concepts: ['declaration merging', 'type alias limitation'],
    },
    // --- 12 ---
    {
      id: 'ts-interfaces-12',
      title: 'Nested interfaces',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Define nested interfaces for a blog post with an author and array of comments.',
      skeleton: `// Define Author, Comment, and Post interfaces
// Author: name (string), email (string)
// Comment: author (Author), text (string), date (Date)
// Post: title (string), body (string), author (Author), comments (Comment[])

function createPost(title: string, body: string, author: Author): Post {
  // return a new Post with empty comments
}`,
      solution: `interface Author {
  name: string;
  email: string;
}

interface Comment {
  author: Author;
  text: string;
  date: Date;
}

interface Post {
  title: string;
  body: string;
  author: Author;
  comments: Comment[];
}

function createPost(title: string, body: string, author: Author): Post {
  return { title, body, author, comments: [] };
}`,
      hints: [
        'Define each interface separately, referencing others by name.',
        'Comment references Author; Post references both Author and Comment[].',
        'Define Author, Comment, Post interfaces, then return { title, body, author, comments: [] }.',
      ],
      concepts: ['nested interfaces', 'composition'],
    },
    // --- 13 ---
    {
      id: 'ts-interfaces-13',
      title: 'Interface inheritance chain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create a 3-level interface inheritance chain: Shape -> Polygon -> RegularPolygon.',
      skeleton: `// Shape: color (string)
// Polygon extends Shape: sides (number)
// RegularPolygon extends Polygon: sideLength (number), area(): number

// Implement a function that creates a RegularPolygon (equilateral triangle)
function createEquilateral(sideLength: number, color: string): RegularPolygon {
  // area of equilateral triangle = (sqrt(3) / 4) * sideLength^2
}`,
      solution: `interface Shape {
  color: string;
}

interface Polygon extends Shape {
  sides: number;
}

interface RegularPolygon extends Polygon {
  sideLength: number;
  area(): number;
}

function createEquilateral(sideLength: number, color: string): RegularPolygon {
  return {
    color,
    sides: 3,
    sideLength,
    area() {
      return (Math.sqrt(3) / 4) * this.sideLength ** 2;
    },
  };
}`,
      hints: [
        'Each interface extends the previous one, adding more specificity.',
        'Shape has color, Polygon adds sides, RegularPolygon adds sideLength and area.',
        'Define all three interfaces, then return an object satisfying RegularPolygon.',
      ],
      concepts: ['interface inheritance chain', 'multi-level extension'],
    },
    // --- 14 ---
    {
      id: 'ts-interfaces-14',
      title: 'Interface with methods',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the interface so methods are properly typed.',
      skeleton: `interface Stack {
  items: number[];
  push: (item: number) => void;
  pop: () => number;
  peek: () => number;
  size: number;
}

const stack: Stack = {
  items: [],
  push(item: number) { this.items.push(item); },
  pop() { return this.items.pop(); },
  peek() { return this.items[this.items.length - 1]; },
  size: 0,
};`,
      solution: `interface Stack {
  items: number[];
  push: (item: number) => void;
  pop: () => number | undefined;
  peek: () => number | undefined;
  get size(): number;
}

const stack: Stack = {
  items: [],
  push(item: number) { this.items.push(item); },
  pop() { return this.items.pop(); },
  peek() { return this.items[this.items.length - 1]; },
  get size() { return this.items.length; },
};`,
      hints: [
        'Array.pop() can return undefined. peek on empty array is also undefined.',
        'The size property should be dynamic -- consider a getter.',
        'pop and peek should return number | undefined. size should be a getter.',
      ],
      concepts: ['method signatures', 'return type accuracy', 'getters'],
    },
    // --- 15 ---
    {
      id: 'ts-interfaces-15',
      title: 'Reopening interfaces',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict the final shape of the merged interface.',
      skeleton: `interface Settings {
  theme: string;
}

interface Settings {
  fontSize: number;
}

interface Settings {
  language: string;
}

const s: Settings = { theme: "dark", fontSize: 14, language: "en" };
console.log(Object.keys(s).sort().join(", "));`,
      solution: `fontSize, language, theme`,
      hints: [
        'All three Settings declarations are merged into one.',
        'The merged interface has theme, fontSize, and language.',
        'Object.keys returns the keys, sorted: fontSize, language, theme.',
      ],
      concepts: ['declaration merging', 'reopening interfaces'],
    },
    // --- 16 ---
    {
      id: 'ts-interfaces-16',
      title: 'Interface for arrays',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Define an interface that describes a readonly array-like structure with length and index access.',
      skeleton: `interface ReadonlyList<T> {
  // readonly length property
  // readonly index signature for numeric keys
  // method: includes(item: T): boolean
}

function toReadonlyList<T>(items: T[]): ReadonlyList<T> {
  // implement it
}`,
      solution: `interface ReadonlyList<T> {
  readonly length: number;
  readonly [index: number]: T;
  includes(item: T): boolean;
}

function toReadonlyList<T>(items: T[]): ReadonlyList<T> {
  return {
    length: items.length,
    ...items,
    includes(item: T): boolean {
      return items.includes(item);
    },
  };
}`,
      hints: [
        'Use a numeric index signature for array-like access.',
        'Mark both the length and index signature as readonly.',
        'readonly length: number; readonly [index: number]: T; includes(item: T): boolean;',
      ],
      concepts: ['index signatures', 'generic interfaces', 'array-like'],
    },
    // --- 17 ---
    {
      id: 'ts-interfaces-17',
      title: 'Structural typing',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Predict whether this code compiles and what it outputs.',
      skeleton: `interface Named {
  name: string;
}

function greet(entity: Named): string {
  return \`Hello, \${entity.name}\`;
}

const robot = { name: "R2-D2", serial: "A-42" };
console.log(greet(robot));`,
      solution: `Hello, R2-D2`,
      hints: [
        'TypeScript uses structural typing -- the shape matters, not the label.',
        'robot has a name property, so it satisfies the Named interface.',
        'Extra properties (serial) are fine when passing an existing variable.',
      ],
      concepts: ['structural typing', 'duck typing', 'excess property checks'],
    },
    // --- 18 ---
    {
      id: 'ts-interfaces-18',
      title: 'Interface compatibility',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix the excess property error when assigning an object literal.',
      skeleton: `interface Point {
  x: number;
  y: number;
}

const p: Point = { x: 1, y: 2, z: 3 }; // Error: Object literal may only specify known properties
console.log(p);`,
      solution: `interface Point {
  x: number;
  y: number;
}

const temp = { x: 1, y: 2, z: 3 };
const p: Point = temp;
console.log(p);`,
      hints: [
        'Object literals have stricter checking than variables in TypeScript.',
        'Assign to a temporary variable first, then assign to the typed variable.',
        'Create a temp variable, then assign: const temp = { x: 1, y: 2, z: 3 }; const p: Point = temp;',
      ],
      concepts: ['excess property checks', 'structural typing'],
    },
    // --- 19 ---
    {
      id: 'ts-interfaces-19',
      title: 'Interface with constructor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Define an interface for a constructor function and use it to create instances.',
      skeleton: `interface Constructable<T> {
  // define a construct signature
}

interface Timestamped {
  createdAt: Date;
}

class Event implements Timestamped {
  createdAt = new Date();
  constructor(public name: string) {}
}

function createInstance<T>(ctor: Constructable<T>, ...args: any[]): T {
  // create and return a new instance
}`,
      solution: `interface Constructable<T> {
  new (...args: any[]): T;
}

interface Timestamped {
  createdAt: Date;
}

class Event implements Timestamped {
  createdAt = new Date();
  constructor(public name: string) {}
}

function createInstance<T>(ctor: Constructable<T>, ...args: any[]): T {
  return new ctor(...args);
}`,
      hints: [
        'A construct signature uses the "new" keyword in the interface.',
        'new (...args: any[]): T describes a constructor.',
        'interface Constructable<T> { new (...args: any[]): T; }',
      ],
      concepts: ['construct signatures', 'factory pattern'],
    },
    // --- 20 ---
    {
      id: 'ts-interfaces-20',
      title: 'Refactor to interfaces',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor inline type annotations into reusable interfaces.',
      skeleton: `function processOrder(
  customer: { name: string; email: string; loyaltyLevel: number },
  items: { id: string; name: string; price: number; qty: number }[],
  shipping: { method: string; cost: number; address: { street: string; city: string; zip: string } }
): { total: number; summary: string } {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + shipping.cost;
  return {
    total,
    summary: \`Order for \${customer.name}: \${items.length} items, \$\${total.toFixed(2)}\`,
  };
}`,
      solution: `interface Customer {
  name: string;
  email: string;
  loyaltyLevel: number;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface Address {
  street: string;
  city: string;
  zip: string;
}

interface ShippingInfo {
  method: string;
  cost: number;
  address: Address;
}

interface OrderResult {
  total: number;
  summary: string;
}

function processOrder(
  customer: Customer,
  items: OrderItem[],
  shipping: ShippingInfo
): OrderResult {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + shipping.cost;
  return {
    total,
    summary: \`Order for \${customer.name}: \${items.length} items, \$\${total.toFixed(2)}\`,
  };
}`,
      hints: [
        'Extract each inline type into its own named interface.',
        'Create Customer, OrderItem, Address, ShippingInfo, and OrderResult interfaces.',
        'Replace all inline types with interface references in the function signature.',
      ],
      concepts: ['refactoring', 'interface extraction', 'code organization'],
    },
  ],
};
