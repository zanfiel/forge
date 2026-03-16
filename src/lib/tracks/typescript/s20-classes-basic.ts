import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-classes',
  title: '20. Classes Fundamentals',
  explanation: `## Classes Fundamentals

TypeScript classes extend JavaScript classes with type annotations, access modifiers, and other features.

### Basic Declaration
\\\`\\\`\\\`typescript
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
\\\`\\\`\\\`

### Parameter Properties (Shorthand)
\\\`\\\`\\\`typescript
class User {
  constructor(public name: string, public age: number) {}
}
\\\`\\\`\\\`
This is equivalent to the longer form above.

### Methods and this
\\\`\\\`\\\`typescript
class Counter {
  count = 0;
  increment() { this.count++; return this; }
}
\\\`\\\`\\\`

### Static Members
\\\`\\\`\\\`typescript
class MathUtils {
  static PI = 3.14159;
  static square(n: number) { return n * n; }
}
\\\`\\\`\\\`

### Getters and Setters
\\\`\\\`\\\`typescript
class Temperature {
  constructor(private _celsius: number) {}
  get fahrenheit() { return this._celsius * 9/5 + 32; }
  set fahrenheit(f: number) { this._celsius = (f - 32) * 5/9; }
}
\\\`\\\`\\\`

### Key Concepts
- **readonly**: properties that can only be set in the constructor
- **Class expressions**: \\\`const Foo = class { ... }\\\`
- **Structural typing**: classes are compatible based on shape, not name
- **instanceof**: works with class hierarchies
- **implements**: classes can implement interfaces
- **Method chaining**: return \\\`this\\\` from methods`,
  exercises: [
    // --- 1 ---
    {
      id: 'ts-classes-1',
      title: 'Basic class declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the class declaration with properties and constructor.',
      skeleton: `__BLANK__ Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const p = new Person("Alice", 30);`,
      solution: `class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const p = new Person("Alice", 30);`,
      hints: [
        'What keyword declares a class in TypeScript?',
        'The keyword is "class".',
        'class Person { ... }',
      ],
      concepts: ['class declaration', 'constructor'],
    },
    // --- 2 ---
    {
      id: 'ts-classes-2',
      title: 'Class properties',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add typed properties with default values to a class.',
      skeleton: `class Config {
  host: string __BLANK__ "localhost";
  port: number __BLANK__ 3000;
  debug: boolean __BLANK__ false;
}

const config = new Config();
console.log(config.host);`,
      solution: `class Config {
  host: string = "localhost";
  port: number = 3000;
  debug: boolean = false;
}

const config = new Config();
console.log(config.host);`,
      hints: [
        'Class properties can have default values using the = sign.',
        'Each property needs = followed by its default value.',
        'host: string = "localhost"',
      ],
      concepts: ['properties', 'default values'],
    },
    // --- 3 ---
    {
      id: 'ts-classes-3',
      title: 'Class methods',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add a typed method to the class.',
      skeleton: `class Calculator {
  value: number = 0;

  add(n: number): __BLANK__ {
    this.value += n;
    return this.value;
  }
}

const calc = new Calculator();
console.log(calc.add(5));`,
      solution: `class Calculator {
  value: number = 0;

  add(n: number): number {
    this.value += n;
    return this.value;
  }
}

const calc = new Calculator();
console.log(calc.add(5));`,
      hints: [
        'Methods need a return type annotation.',
        'add() returns a number (this.value).',
        'number',
      ],
      concepts: ['methods', 'return types'],
    },
    // --- 4 ---
    {
      id: 'ts-classes-4',
      title: 'this keyword',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use "this" to reference the current instance.',
      skeleton: `class Greeter {
  name: string;

  constructor(name: string) {
    __BLANK__.name = name;
  }

  greet(): string {
    return \`Hello, I'm \${__BLANK__.name}\`;
  }
}`,
      solution: `class Greeter {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    return \`Hello, I'm \${this.name}\`;
  }
}`,
      hints: [
        '"this" refers to the current class instance.',
        'Use this.property to access instance properties.',
        'this',
      ],
      concepts: ['this keyword'],
    },
    // --- 5 ---
    {
      id: 'ts-classes-5',
      title: 'Static members',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add a static property and method to the class.',
      skeleton: `class IdGenerator {
  __BLANK__ nextId: number = 1;

  __BLANK__ generate(): number {
    return IdGenerator.nextId++;
  }
}

console.log(IdGenerator.generate());
console.log(IdGenerator.generate());`,
      solution: `class IdGenerator {
  static nextId: number = 1;

  static generate(): number {
    return IdGenerator.nextId++;
  }
}

console.log(IdGenerator.generate());
console.log(IdGenerator.generate());`,
      hints: [
        'Static members belong to the class itself, not instances.',
        'Use the "static" keyword before the property/method.',
        'static',
      ],
      concepts: ['static members', 'static methods'],
    },
    // --- 6 ---
    {
      id: 'ts-classes-6',
      title: 'Getters and setters',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add a getter and setter for a computed property.',
      skeleton: `class Circle {
  constructor(public radius: number) {}

  __BLANK__ area(): number {
    return Math.PI * this.radius ** 2;
  }

  __BLANK__ diameter(): number {
    return this.radius * 2;
  }

  __BLANK__ diameter(d: number) {
    this.radius = d / 2;
  }
}

const c = new Circle(5);
console.log(c.area);
c.diameter = 20;`,
      solution: `class Circle {
  constructor(public radius: number) {}

  get area(): number {
    return Math.PI * this.radius ** 2;
  }

  get diameter(): number {
    return this.radius * 2;
  }

  set diameter(d: number) {
    this.radius = d / 2;
  }
}

const c = new Circle(5);
console.log(c.area);
c.diameter = 20;`,
      hints: [
        'Getters use "get" keyword, setters use "set".',
        'They are accessed like properties, not called like methods.',
        'get, get, set',
      ],
      concepts: ['getters/setters', 'computed properties'],
    },
    // --- 7 ---
    {
      id: 'ts-classes-7',
      title: 'Readonly property',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a class with a readonly property that can only be set in the constructor.',
      skeleton: `class ImmutablePoint {
  // declare readonly x and y properties

  constructor(x: number, y: number) {
    // assign x and y
  }

  // This should be a TypeScript error:
  // move(dx: number) { this.x += dx; }

  toString(): string {
    return \`(\${this.x}, \${this.y})\`;
  }
}`,
      solution: `class ImmutablePoint {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString(): string {
    return \`(\${this.x}, \${this.y})\`;
  }
}`,
      hints: [
        'readonly properties can be set in the constructor but not after.',
        'Declare with "readonly" modifier before the property name.',
        'readonly x: number; readonly y: number;',
      ],
      concepts: ['readonly properties in classes'],
    },
    // --- 8 ---
    {
      id: 'ts-classes-8',
      title: 'Parameter properties',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Rewrite a class using parameter properties (shorthand constructor).',
      skeleton: `// Rewrite this class using parameter properties
class User {
  name: string;
  email: string;
  age: number;

  constructor(name: string, email: string, age: number) {
    this.name = name;
    this.email = email;
    this.age = age;
  }

  toString(): string {
    return \`\${this.name} (\${this.email}), age \${this.age}\`;
  }
}`,
      solution: `class User {
  constructor(
    public name: string,
    public email: string,
    public age: number
  ) {}

  toString(): string {
    return \`\${this.name} (\${this.email}), age \${this.age}\`;
  }
}`,
      hints: [
        'Parameter properties add a visibility modifier to constructor parameters.',
        'Adding "public" before a parameter auto-declares and assigns the property.',
        'constructor(public name: string, public email: string, public age: number) {}',
      ],
      concepts: ['parameter properties', 'shorthand constructor'],
    },
    // --- 9 ---
    {
      id: 'ts-classes-9',
      title: 'Class type inference',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict the inferred types when using a class.',
      skeleton: `class Box {
  constructor(public value: number) {}
  double() { return new Box(this.value * 2); }
}

const a = new Box(5);
const b = a.double();
const c = b.value;

// What are the types of a, b, and c?
console.log(a instanceof Box);
console.log(c);`,
      solution: `a is Box. b is Box. c is number. Output:
true
10`,
      hints: [
        'new Box(5) creates a Box instance. double() returns a new Box.',
        'b.value is typed as number (from the class definition).',
        'a: Box, b: Box, c: number. a instanceof Box is true. c is 10.',
      ],
      concepts: ['class type inference'],
    },
    // --- 10 ---
    {
      id: 'ts-classes-10',
      title: 'Class expressions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create a class using a class expression and assign it to a variable.',
      skeleton: `// Create a class expression for a simple stack
const Stack = class<T> {
  // private items array
  // push, pop, peek, and size methods
};

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack.peek());
console.log(stack.size);`,
      solution: `const Stack = class<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }
};

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack.peek());
console.log(stack.size);`,
      hints: [
        'Class expressions assign a class to a const/let variable.',
        'They can be generic: class<T> { ... }.',
        'Add private items: T[] and implement push, pop, peek, size.',
      ],
      concepts: ['class expressions', 'generic classes'],
    },
    // --- 11 ---
    {
      id: 'ts-classes-11',
      title: 'Class vs interface',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict whether a plain object satisfies a class type.',
      skeleton: `class Point {
  constructor(public x: number, public y: number) {}
}

function logPoint(p: Point): string {
  return \`(\${p.x}, \${p.y})\`;
}

const myPoint = { x: 10, y: 20 };
console.log(logPoint(myPoint));
// Does this work? Is myPoint instanceof Point?`,
      solution: `logPoint(myPoint) works because TypeScript uses structural typing -- myPoint has x and y. Output: (10, 20). However, myPoint instanceof Point would be false because instanceof checks the prototype chain.`,
      hints: [
        'TypeScript uses structural (duck) typing for type compatibility.',
        'myPoint has x and y, so it satisfies the Point type.',
        'But instanceof checks the prototype, which myPoint does not have.',
      ],
      concepts: ['class vs interface', 'structural typing'],
    },
    // --- 12 ---
    {
      id: 'ts-classes-12',
      title: 'Class implementing interface',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create a class that implements an interface.',
      skeleton: `interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

interface Printable {
  print(): void;
}

// Create a class that implements both interfaces
class Document implements Serializable, Printable {
  constructor(public title: string, public content: string) {}

  // implement all required methods
}`,
      solution: `interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

interface Printable {
  print(): void;
}

class Document implements Serializable, Printable {
  constructor(public title: string, public content: string) {}

  serialize(): string {
    return JSON.stringify({ title: this.title, content: this.content });
  }

  deserialize(data: string): void {
    const parsed = JSON.parse(data);
    this.title = parsed.title;
    this.content = parsed.content;
  }

  print(): void {
    console.log(\`[\${this.title}] \${this.content}\`);
  }
}`,
      hints: [
        'A class can implement multiple interfaces with commas.',
        'You must implement all methods from both interfaces.',
        'Implement serialize (return JSON), deserialize (parse JSON), and print.',
      ],
      concepts: ['class implementing interface', 'multiple implements'],
    },
    // --- 13 ---
    {
      id: 'ts-classes-13',
      title: 'Constructor overloads',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the class so it can be constructed with different argument combinations.',
      skeleton: `class Color {
  r: number;
  g: number;
  b: number;

  // Bug: cannot have multiple constructor implementations
  constructor(hex: string) {
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
    this.r = result ? parseInt(result[1], 16) : 0;
    this.g = result ? parseInt(result[2], 16) : 0;
    this.b = result ? parseInt(result[3], 16) : 0;
  }

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}`,
      solution: `class Color {
  r: number;
  g: number;
  b: number;

  constructor(hex: string);
  constructor(r: number, g: number, b: number);
  constructor(hexOrR: string | number, g?: number, b?: number) {
    if (typeof hexOrR === "string") {
      const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hexOrR);
      this.r = result ? parseInt(result[1], 16) : 0;
      this.g = result ? parseInt(result[2], 16) : 0;
      this.b = result ? parseInt(result[3], 16) : 0;
    } else {
      this.r = hexOrR;
      this.g = g ?? 0;
      this.b = b ?? 0;
    }
  }
}`,
      hints: [
        'TypeScript uses overload signatures, not multiple constructor bodies.',
        'Declare overload signatures, then one implementation that handles all cases.',
        'Use typeof to narrow the first parameter and handle both cases.',
      ],
      concepts: ['constructor overloads'],
    },
    // --- 14 ---
    {
      id: 'ts-classes-14',
      title: 'Method chaining',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Implement a fluent API using method chaining (return this).',
      skeleton: `class QueryBuilder {
  private table: string = "";
  private conditions: string[] = [];
  private limit_: number | null = null;

  from(table: string): this {
    // set table, return this
  }

  where(condition: string): this {
    // add condition, return this
  }

  limit(n: number): this {
    // set limit, return this
  }

  build(): string {
    // build and return the SQL query string
  }
}

const sql = new QueryBuilder()
  .from("users")
  .where("age > 18")
  .where("active = true")
  .limit(10)
  .build();`,
      solution: `class QueryBuilder {
  private table: string = "";
  private conditions: string[] = [];
  private limit_: number | null = null;

  from(table: string): this {
    this.table = table;
    return this;
  }

  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  limit(n: number): this {
    this.limit_ = n;
    return this;
  }

  build(): string {
    let query = \`SELECT * FROM \${this.table}\`;
    if (this.conditions.length > 0) {
      query += \` WHERE \${this.conditions.join(" AND ")}\`;
    }
    if (this.limit_ !== null) {
      query += \` LIMIT \${this.limit_}\`;
    }
    return query;
  }
}

const sql = new QueryBuilder()
  .from("users")
  .where("age > 18")
  .where("active = true")
  .limit(10)
  .build();`,
      hints: [
        'Method chaining works by returning "this" from each method.',
        'The return type "this" is polymorphic -- it works with subclasses too.',
        'Each method modifies state and returns this for chaining.',
      ],
      concepts: ['method chaining', 'return this', 'fluent API'],
    },
    // --- 15 ---
    {
      id: 'ts-classes-15',
      title: 'instanceof with classes',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict instanceof behavior with classes.',
      skeleton: `class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  bark() { return "Woof!"; }
}

const dog = new Dog("Rex");
console.log(dog instanceof Dog);
console.log(dog instanceof Animal);
console.log(dog instanceof Object);

const obj = { name: "Fake", bark: () => "Fake woof" };
console.log(obj instanceof Dog);`,
      solution: `true
true
true
false`,
      hints: [
        'instanceof checks the prototype chain.',
        'dog is a Dog, which extends Animal, which extends Object.',
        'A plain object is not an instance of Dog even if it has the same shape.',
      ],
      concepts: ['instanceof with classes', 'prototype chain'],
    },
    // --- 16 ---
    {
      id: 'ts-classes-16',
      title: 'Static methods pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create a class with static factory methods.',
      skeleton: `class Temperature {
  private constructor(private celsius: number) {}

  // Static factory methods
  static fromCelsius(c: number): Temperature {
    // implement
  }

  static fromFahrenheit(f: number): Temperature {
    // implement
  }

  static fromKelvin(k: number): Temperature {
    // implement
  }

  toCelsius(): number { return this.celsius; }
  toFahrenheit(): number { return this.celsius * 9/5 + 32; }
  toKelvin(): number { return this.celsius + 273.15; }
}`,
      solution: `class Temperature {
  private constructor(private celsius: number) {}

  static fromCelsius(c: number): Temperature {
    return new Temperature(c);
  }

  static fromFahrenheit(f: number): Temperature {
    return new Temperature((f - 32) * 5 / 9);
  }

  static fromKelvin(k: number): Temperature {
    return new Temperature(k - 273.15);
  }

  toCelsius(): number { return this.celsius; }
  toFahrenheit(): number { return this.celsius * 9/5 + 32; }
  toKelvin(): number { return this.celsius + 273.15; }
}`,
      hints: [
        'Private constructor prevents direct instantiation -- use static methods instead.',
        'Each factory method converts the input to Celsius and creates a new instance.',
        'fromFahrenheit: (f - 32) * 5/9. fromKelvin: k - 273.15.',
      ],
      concepts: ['static methods', 'factory pattern'],
    },
    // --- 17 ---
    {
      id: 'ts-classes-17',
      title: 'Class with generics intro',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Create a generic class for a typed key-value store.',
      skeleton: `class TypedMap<K, V> {
  // private store using Map

  set(key: K, value: V): void {
    // implement
  }

  get(key: K): V | undefined {
    // implement
  }

  has(key: K): boolean {
    // implement
  }

  get size(): number {
    // implement
  }
}

const userAges = new TypedMap<string, number>();
userAges.set("Alice", 30);
console.log(userAges.get("Alice"));`,
      solution: `class TypedMap<K, V> {
  private store = new Map<K, V>();

  set(key: K, value: V): void {
    this.store.set(key, value);
  }

  get(key: K): V | undefined {
    return this.store.get(key);
  }

  has(key: K): boolean {
    return this.store.has(key);
  }

  get size(): number {
    return this.store.size;
  }
}

const userAges = new TypedMap<string, number>();
userAges.set("Alice", 30);
console.log(userAges.get("Alice"));`,
      hints: [
        'Generic classes have type parameters after the class name: class Foo<K, V>.',
        'Use a Map<K, V> internally for storage.',
        'Delegate set, get, has, and size to the internal Map.',
      ],
      concepts: ['class with generics', 'type parameters'],
    },
    // --- 18 ---
    {
      id: 'ts-classes-18',
      title: 'Structural typing with classes',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix the code where structural typing causes unintended compatibility.',
      skeleton: `class UserId {
  constructor(public value: string) {}
}

class PostId {
  constructor(public value: string) {}
}

function getUser(id: UserId): string {
  return \`User: \${id.value}\`;
}

// Bug: this should be an error but isn't (structural typing)
const postId = new PostId("post-123");
console.log(getUser(postId)); // Oops! Wrong ID type passed`,
      solution: `class UserId {
  private readonly __brand = "UserId" as const;
  constructor(public value: string) {}
}

class PostId {
  private readonly __brand = "PostId" as const;
  constructor(public value: string) {}
}

function getUser(id: UserId): string {
  return \`User: \${id.value}\`;
}

// Now this is an error: PostId is not assignable to UserId
// const postId = new PostId("post-123");
// getUser(postId); // Error`,
      hints: [
        'TypeScript uses structural typing -- two classes with the same shape are compatible.',
        'Add a private branded field to make the classes structurally different.',
        'private readonly __brand = "UserId" as const; makes each class unique.',
      ],
      concepts: ['structural typing with classes', 'branded classes'],
    },
    // --- 19 ---
    {
      id: 'ts-classes-19',
      title: 'Class and structural typing',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Predict which assignments are valid with structural typing.',
      skeleton: `class Alpha {
  x: number = 0;
}

class Beta {
  x: number = 0;
  y: number = 0;
}

let a: Alpha = new Alpha();
let b: Beta = new Beta();

a = b;  // Valid?
// b = a; // Valid?

console.log(a.x);`,
      solution: `a = b is valid because Beta has all properties of Alpha (and more). b = a would be an error because Alpha is missing "y". Output: 0`,
      hints: [
        'A type with more properties is assignable to one with fewer (it is a subtype).',
        'Beta has x and y; Alpha only has x. Beta satisfies Alpha but not vice versa.',
        'a = b works (Beta is a subtype of Alpha). b = a fails (Alpha lacks y).',
      ],
      concepts: ['structural typing', 'subtype assignment'],
    },
    // --- 20 ---
    {
      id: 'ts-classes-20',
      title: 'Practical class patterns',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor procedural code into a well-structured class with proper TypeScript features.',
      skeleton: `// Procedural version
let logEntries: string[] = [];
let logLevel = "info";

function setLevel(level: string) {
  logLevel = level;
}

function log(message: string) {
  const entry = \`[\${logLevel.toUpperCase()}] \${new Date().toISOString()} - \${message}\`;
  logEntries.push(entry);
  console.log(entry);
}

function getEntries() {
  return [...logEntries];
}

function clearEntries() {
  logEntries = [];
}`,
      solution: `type LogLevel = "debug" | "info" | "warn" | "error";

class Logger {
  private entries: string[] = [];

  constructor(private level: LogLevel = "info") {}

  setLevel(level: LogLevel): this {
    this.level = level;
    return this;
  }

  log(message: string): this {
    const entry = \`[\${this.level.toUpperCase()}] \${new Date().toISOString()} - \${message}\`;
    this.entries.push(entry);
    console.log(entry);
    return this;
  }

  getEntries(): readonly string[] {
    return [...this.entries];
  }

  clear(): this {
    this.entries = [];
    return this;
  }

  get count(): number {
    return this.entries.length;
  }
}`,
      hints: [
        'Encapsulate state and behavior in a class.',
        'Use a LogLevel union type instead of plain string.',
        'Add method chaining, a getter, and proper encapsulation.',
      ],
      concepts: ['practical class patterns', 'encapsulation', 'refactoring'],
    },
  ],
};
