import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-access',
  title: '22. Access Modifiers',
  explanation: `## Access Modifiers

Access modifiers control **who can see and modify** class members. TypeScript provides several:

\\\`\\\`\\\`typescript
class Account {
  public owner: string;          // accessible everywhere (default)
  private balance: number;       // only inside this class
  protected accountType: string; // this class + subclasses
  readonly id: string;           // set once, never changed
  #pin: number;                  // ES2022 true private field

  constructor(owner: string, balance: number, pin: number) {
    this.owner = owner;
    this.balance = balance;
    this.accountType = 'checking';
    this.id = crypto.randomUUID();
    this.#pin = pin;
  }
}
\\\`\\\`\\\`

Key distinctions:
- **private** is compile-time only -- JS runtime can still access it
- **#private** is true runtime privacy (ES2022 private fields)
- **readonly** prevents reassignment after initialization
- Constructor parameter modifiers (\\\`constructor(public name: string)\\\`) are shorthand
- Use **getters/setters** to control access to private state`,
  exercises: [
    {
      id: 'ts-access-1',
      title: 'Public by default',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the access modifier that makes the property accessible everywhere (the default).',
      skeleton: `class User {
  __BLANK__ name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const u = new User('Alice');
console.log(u.name); // works`,
      solution: `class User {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const u = new User('Alice');
console.log(u.name); // works`,
      hints: [
        'What is the default access modifier in TypeScript?',
        'The keyword that makes a member accessible from anywhere is public.',
        'Replace __BLANK__ with public.',
      ],
      concepts: ['public (default)', 'access modifiers'],
    },
    {
      id: 'ts-access-2',
      title: 'Private keyword',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Mark the balance field so it can only be accessed within the BankAccount class.',
      skeleton: `class BankAccount {
  __BLANK__ balance: number = 0;

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}`,
      solution: `class BankAccount {
  private balance: number = 0;

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}`,
      hints: [
        'Which modifier restricts access to only within the class?',
        'The private keyword prevents access from outside the class.',
        'Replace __BLANK__ with private.',
      ],
      concepts: ['private keyword', 'encapsulation patterns'],
    },
    {
      id: 'ts-access-3',
      title: 'Protected keyword',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Mark the field so that subclasses can access it but external code cannot.',
      skeleton: `class Component {
  __BLANK__ element: HTMLElement | null = null;

  render(): string {
    return '<div></div>';
  }
}

class Button extends Component {
  override render(): string {
    // Can access this.element here
    return '<button></button>';
  }
}`,
      solution: `class Component {
  protected element: HTMLElement | null = null;

  render(): string {
    return '<div></div>';
  }
}

class Button extends Component {
  override render(): string {
    // Can access this.element here
    return '<button></button>';
  }
}`,
      hints: [
        'Which modifier is between public and private?',
        'protected allows the class itself and its subclasses to access the member.',
        'Replace __BLANK__ with protected.',
      ],
      concepts: ['protected keyword', 'access modifiers'],
    },
    {
      id: 'ts-access-4',
      title: 'Readonly property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Make the id property read-only so it cannot be changed after construction.',
      skeleton: `class Entity {
  __BLANK__ id: string;

  constructor(id: string) {
    this.id = id;
  }
}

const e = new Entity('abc');
// e.id = 'xyz'; // should cause an error`,
      solution: `class Entity {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

const e = new Entity('abc');
// e.id = 'xyz'; // should cause an error`,
      hints: [
        'Which modifier prevents a property from being reassigned?',
        'readonly allows assignment only in the constructor or at declaration.',
        'Replace __BLANK__ with readonly.',
      ],
      concepts: ['readonly in classes', 'immutable class patterns'],
    },
    {
      id: 'ts-access-5',
      title: 'Constructor parameter shorthand',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use constructor parameter modifiers to declare and assign name and age in one step.',
      skeleton: `class Person {
  constructor(__BLANK__ name: string, __BLANK__ age: number) {}
}

const p = new Person('Bob', 30);
console.log(p.name, p.age);`,
      solution: `class Person {
  constructor(public name: string, public age: number) {}
}

const p = new Person('Bob', 30);
console.log(p.name, p.age);`,
      hints: [
        'Adding an access modifier to a constructor parameter automatically creates and assigns the property.',
        'public, private, protected, or readonly in the constructor params creates the property.',
        'Replace both __BLANK__ with public.',
      ],
      concepts: ['access modifier in constructor params'],
    },
    {
      id: 'ts-access-6',
      title: 'Predict private access error',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Will this code compile? If not, explain the error in one sentence.',
      skeleton: `class Secret {
  private value: string = 'hidden';
}

const s = new Secret();
console.log(s.value);`,
      solution: `Error: Property 'value' is private and only accessible within class 'Secret'.`,
      hints: [
        'Private members cannot be accessed outside the class.',
        'TypeScript will emit a compile-time error for accessing private members externally.',
        'The error message is about value being private and only accessible within class Secret.',
      ],
      concepts: ['private keyword', 'encapsulation patterns'],
    },
    {
      id: 'ts-access-7',
      title: 'ES private fields (#)',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use the ES2022 true private field syntax with # prefix.',
      skeleton: `class Wallet {
  __BLANK__: number = 0;

  deposit(amount: number): void {
    this.#balance += amount;
  }

  getBalance(): number {
    return this.#balance;
  }
}`,
      solution: `class Wallet {
  #balance: number = 0;

  deposit(amount: number): void {
    this.#balance += amount;
  }

  getBalance(): number {
    return this.#balance;
  }
}`,
      hints: [
        'ES2022 introduced a new syntax for truly private fields.',
        'The # prefix makes a field truly private at runtime, not just compile time.',
        'Replace __BLANK__ with #balance.',
      ],
      concepts: ['#private (ES private)', 'private vs #private'],
    },
    {
      id: 'ts-access-8',
      title: 'Getter and setter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a Temperature class with a private _celsius field. Add a get celsius() getter and set celsius(v) setter that rejects negative absolute zero values (below -273.15).',
      skeleton: `// Write the Temperature class with getter/setter
`,
      solution: `class Temperature {
  private _celsius: number;

  constructor(celsius: number) {
    this._celsius = celsius;
  }

  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error('Temperature below absolute zero');
    }
    this._celsius = value;
  }
}`,
      hints: [
        'Use get propName() and set propName(value) syntax.',
        'The setter should validate the value before assigning to the private field.',
        'set celsius(value: number) { if (value < -273.15) throw new Error(...); this._celsius = value; }',
      ],
      concepts: ['getter/setter with private', 'encapsulation patterns'],
    },
    {
      id: 'ts-access-9',
      title: 'Fix broken encapsulation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This class exposes its internal array directly, allowing mutation from outside. Fix it by returning a copy in the getter.',
      skeleton: `class TodoList {
  private items: string[] = [];

  add(item: string): void {
    this.items.push(item);
  }

  getItems(): string[] {
    return this.items; // Bug: returns reference to internal array
  }
}

const list = new TodoList();
list.add('Buy milk');
const items = list.getItems();
items.push('HACKED'); // modifies internal state!`,
      solution: `class TodoList {
  private items: string[] = [];

  add(item: string): void {
    this.items.push(item);
  }

  getItems(): string[] {
    return [...this.items]; // Returns a copy
  }
}

const list = new TodoList();
list.add('Buy milk');
const items = list.getItems();
items.push('HACKED'); // only modifies the copy`,
      hints: [
        'Returning the internal array allows callers to mutate it directly.',
        'Return a copy of the array instead of the original reference.',
        'Use return [...this.items] or return this.items.slice() to return a defensive copy.',
      ],
      concepts: ['defensive copying', 'readonly arrays in classes', 'encapsulation patterns'],
    },
    {
      id: 'ts-access-10',
      title: 'Private vs #private',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What is the key difference between private and #? Will the commented line work at runtime if we bypass TypeScript?',
      skeleton: `class Example {
  private tsPrivate: string = 'ts';
  #esPrivate: string = 'es';
}

const ex = new Example();
// At runtime (bypassing TS):
// (ex as any).tsPrivate  -- does this work?
// (ex as any).#esPrivate -- does this work?`,
      solution: `(ex as any).tsPrivate works at runtime (returns 'ts') because private is compile-time only.
(ex as any).#esPrivate causes a SyntaxError because # fields are truly private at runtime.`,
      hints: [
        'TypeScript private is erased at compile time. # is enforced by the JS engine.',
        'You can access TS private members at runtime with (obj as any).field.',
        'You cannot access #private fields from outside the class at all, even at runtime.',
      ],
      concepts: ['private vs #private', '#private (ES private)'],
    },
    {
      id: 'ts-access-11',
      title: 'Readonly arrays in classes',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create a Registry class with a private items array. Expose a readonly view using ReadonlyArray<string> in the getter return type. Add register(item: string) to add items.',
      skeleton: `// Write the Registry class
`,
      solution: `class Registry {
  private items: string[] = [];

  register(item: string): void {
    this.items.push(item);
  }

  getItems(): ReadonlyArray<string> {
    return this.items;
  }
}`,
      hints: [
        'ReadonlyArray<T> is like T[] but without mutation methods (push, pop, etc.).',
        'You can return a string[] where ReadonlyArray<string> is expected.',
        'getItems(): ReadonlyArray<string> { return this.items; } -- callers cannot push/pop on the result.',
      ],
      concepts: ['readonly arrays in classes', 'encapsulation patterns'],
    },
    {
      id: 'ts-access-12',
      title: 'Builder pattern with private',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a QueryBuilder class with a private query string. Add methods select(fields: string), from(table: string), where(condition: string) that return this for chaining, and build() that returns the final query string.',
      skeleton: `// Write the QueryBuilder class
`,
      solution: `class QueryBuilder {
  private query: string = '';

  select(fields: string): this {
    this.query = \`SELECT \${fields}\`;
    return this;
  }

  from(table: string): this {
    this.query += \` FROM \${table}\`;
    return this;
  }

  where(condition: string): this {
    this.query += \` WHERE \${condition}\`;
    return this;
  }

  build(): string {
    return this.query;
  }
}`,
      hints: [
        'Each method modifies the private query string and returns this for chaining.',
        'Return type should be this so subclasses preserve their type in chains.',
        'select sets the query, from and where append to it, build returns the final string.',
      ],
      concepts: ['builder pattern with private', 'encapsulation patterns'],
    },
    {
      id: 'ts-access-13',
      title: 'Singleton access control',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Implement a Singleton class with a private constructor and a static getInstance() method that always returns the same instance.',
      skeleton: `// Write the Singleton class
`,
      solution: `class Singleton {
  private static instance: Singleton;

  private constructor(public readonly value: string) {}

  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton('default');
    }
    return Singleton.instance;
  }
}`,
      hints: [
        'A private constructor prevents external instantiation with new.',
        'Store the single instance in a static field.',
        'private constructor, private static instance, and public static getInstance() that lazily creates it.',
      ],
      concepts: ['singleton access control', 'private keyword'],
    },
    {
      id: 'ts-access-14',
      title: 'Fix readonly violation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This code tries to modify a readonly property after construction. Fix it by removing the invalid reassignment and using a method that returns a new instance.',
      skeleton: `class Config {
  readonly host: string;
  readonly port: number;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  withPort(newPort: number): void {
    this.port = newPort; // Bug: cannot assign to readonly
  }
}`,
      solution: `class Config {
  readonly host: string;
  readonly port: number;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  withPort(newPort: number): Config {
    return new Config(this.host, newPort);
  }
}`,
      hints: [
        'Readonly properties cannot be reassigned after construction.',
        'Instead of mutating, return a new instance with the updated value.',
        'Change withPort to return new Config(this.host, newPort) and update the return type.',
      ],
      concepts: ['readonly in classes', 'immutable class patterns'],
    },
    {
      id: 'ts-access-15',
      title: 'Module-level privacy',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'In this module, which symbols are accessible when imported from another file?',
      skeleton: `// myModule.ts
const internalHelper = (x: number) => x * 2;

export class Calculator {
  private state: number = 0;

  add(n: number): void {
    this.state += internalHelper(n);
  }

  getState(): number {
    return this.state;
  }
}

export function createCalc(): Calculator {
  return new Calculator();
}

function secretFactory(): Calculator {
  return new Calculator();
}`,
      solution: `Only Calculator and createCalc are accessible from imports. internalHelper and secretFactory are module-private (not exported).`,
      hints: [
        'Only exported symbols are accessible from other files.',
        'internalHelper and secretFactory are not exported.',
        'Calculator and createCalc are the only exports. The private state is also inaccessible externally.',
      ],
      concepts: ['module-level privacy', 'export visibility'],
    },
    {
      id: 'ts-access-16',
      title: 'Internal state management',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a Counter class with private count starting at 0. Add increment(), decrement(), reset(), and getCount() methods. Decrement should not go below 0.',
      skeleton: `// Write the Counter class
`,
      solution: `class Counter {
  private count: number = 0;

  increment(): void {
    this.count++;
  }

  decrement(): void {
    if (this.count > 0) {
      this.count--;
    }
  }

  reset(): void {
    this.count = 0;
  }

  getCount(): number {
    return this.count;
  }
}`,
      hints: [
        'Use private to prevent external modification of count.',
        'decrement should check if count > 0 before subtracting.',
        'All methods modify or read the private count field. decrement: if (this.count > 0) this.count--.',
      ],
      concepts: ['internal state management', 'private keyword', 'encapsulation patterns'],
    },
    {
      id: 'ts-access-17',
      title: 'Immutable class pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this mutable Point class into an immutable one. All properties should be readonly, and move/scale should return new Point instances.',
      skeleton: `class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
  }

  scale(factor: number): void {
    this.x *= factor;
    this.y *= factor;
  }
}`,
      solution: `class Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(dx: number, dy: number): Point {
    return new Point(this.x + dx, this.y + dy);
  }

  scale(factor: number): Point {
    return new Point(this.x * factor, this.y * factor);
  }
}`,
      hints: [
        'Immutable objects never change -- methods return new instances instead.',
        'Mark x and y as readonly. Change move and scale to return new Point.',
        'move returns new Point(this.x + dx, this.y + dy). scale returns new Point(this.x * factor, this.y * factor).',
      ],
      concepts: ['immutable class patterns', 'readonly in classes'],
    },
    {
      id: 'ts-access-18',
      title: 'Friend class workaround',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'TypeScript has no friend classes. Write a pattern where class Engine has internal state, and a class Mechanic can inspect it via a dedicated inspect method on Engine that accepts a Mechanic instance as a key.',
      skeleton: `// Write Engine and Mechanic classes demonstrating friend-class workaround
`,
      solution: `class Mechanic {
  readonly license: string;
  constructor(license: string) {
    this.license = license;
  }
}

class Engine {
  private rpm: number = 0;
  private temperature: number = 0;

  start(): void {
    this.rpm = 3000;
    this.temperature = 90;
  }

  inspect(mechanic: Mechanic): { rpm: number; temperature: number } {
    // Only Mechanic instances can get internal state
    return { rpm: this.rpm, temperature: this.temperature };
  }
}`,
      hints: [
        'The "friend class" pattern in TS uses a method that requires a specific type as a parameter.',
        'Engine.inspect(mechanic: Mechanic) acts as a gated accessor.',
        'The inspect method takes a Mechanic and returns the private internals. Only code with a Mechanic instance can call it.',
      ],
      concepts: ['friend class workarounds', 'encapsulation patterns'],
    },
    {
      id: 'ts-access-19',
      title: 'Fix constructor param modifier',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'This class has duplicate property declarations -- once explicit and once via constructor parameter modifier. Remove the redundant explicit declarations.',
      skeleton: `class Player {
  public name: string;   // redundant
  public score: number;  // redundant

  constructor(public name: string, public score: number) {
    // Bug: duplicate declarations
  }
}`,
      solution: `class Player {
  constructor(public name: string, public score: number) {}
}`,
      hints: [
        'Constructor parameter modifiers automatically declare and assign the properties.',
        'You do not need separate property declarations when using public/private/protected in constructor params.',
        'Remove the explicit name and score declarations above the constructor.',
      ],
      concepts: ['access modifier in constructor params', 'access modifier best practices'],
    },
    {
      id: 'ts-access-20',
      title: 'Practical access patterns',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this class to properly encapsulate all fields. Make id readonly, balance private with a getter, and transactions private with a defensive copy getter.',
      skeleton: `class Account {
  id: string;
  balance: number;
  transactions: string[];

  constructor(id: string, balance: number) {
    this.id = id;
    this.balance = balance;
    this.transactions = [];
  }

  deposit(amount: number): void {
    this.balance += amount;
    this.transactions.push(\`+\${amount}\`);
  }

  withdraw(amount: number): void {
    this.balance -= amount;
    this.transactions.push(\`-\${amount}\`);
  }
}`,
      solution: `class Account {
  readonly id: string;
  private _balance: number;
  private _transactions: string[];

  constructor(id: string, balance: number) {
    this.id = id;
    this._balance = balance;
    this._transactions = [];
  }

  get balance(): number {
    return this._balance;
  }

  get transactions(): string[] {
    return [...this._transactions];
  }

  deposit(amount: number): void {
    this._balance += amount;
    this._transactions.push(\`+\${amount}\`);
  }

  withdraw(amount: number): void {
    this._balance -= amount;
    this._transactions.push(\`-\${amount}\`);
  }
}`,
      hints: [
        'id should be readonly. balance and transactions should be private with getters.',
        'Rename private fields with underscore prefix and add get accessors.',
        'transactions getter returns [...this._transactions] for defensive copying. balance getter returns this._balance.',
      ],
      concepts: ['practical access patterns', 'defensive copying', 'encapsulation patterns'],
    },
  ],
};
