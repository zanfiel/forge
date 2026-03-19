import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-symbols',
  title: '37. Symbols',
  explanation: `## Symbols

Symbols are a primitive type introduced in ES2015. Each Symbol is unique and immutable, making them ideal for property keys that should never conflict.

### Creating Symbols
\\\`Symbol()\\\` creates a new unique symbol. The optional description is for debugging only.

### unique symbol
TypeScript has a \\\`unique symbol\\\` type for const declarations, ensuring the type system treats each as distinct.

### Global Symbol Registry
\\\`Symbol.for(key)\\\` returns a shared symbol from a global registry. \\\`Symbol.keyFor(sym)\\\` retrieves the key.

### Well-Known Symbols
JavaScript defines built-in symbols that customize object behavior:
- \\\`Symbol.iterator\\\` -- makes objects iterable
- \\\`Symbol.toPrimitive\\\` -- controls type coercion
- \\\`Symbol.toStringTag\\\` -- customizes Object.prototype.toString
- \\\`Symbol.hasInstance\\\` -- customizes instanceof
- \\\`Symbol.species\\\` -- controls derived object creation

### Symbols as Property Keys
Symbols can be used as object property keys and are not enumerable by default (not in \\\`for...in\\\` or \\\`Object.keys()\\\`).

### Brand Pattern
Symbols can create nominal types (brands) for type-safe code.
`,
  exercises: [
    {
      id: 'ts-symbols-1',
      title: 'Create a symbol',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a symbol with the description "id".',
      skeleton: `const id = __BLANK__("id");
console.log(typeof id);`,
      solution: `const id = Symbol("id");
console.log(typeof id);`,
      hints: [
        'Symbols are created with the Symbol() function.',
        'The string argument is just a description for debugging.',
        'The answer is: Symbol',
      ],
      concepts: ['Symbol()', 'symbol creation', 'typeof symbol'],
    },
    {
      id: 'ts-symbols-2',
      title: 'Symbol uniqueness',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this comparison return?',
      skeleton: `const a = Symbol("test");
const b = Symbol("test");
console.log(a === b);`,
      solution: `false`,
      hints: [
        'Every call to Symbol() creates a unique value.',
        'Even with the same description, two symbols are different.',
        'Output is: false',
      ],
      concepts: ['symbol uniqueness', 'identity'],
    },
    {
      id: 'ts-symbols-3',
      title: 'Symbol as property key',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use a symbol as an object property key.',
      skeleton: `const secret = Symbol("secret");

const obj = {
  name: "public",
  __BLANK__: "hidden value",
};

console.log(obj[secret]);`,
      solution: `const secret = Symbol("secret");

const obj = {
  name: "public",
  [secret]: "hidden value",
};

console.log(obj[secret]);`,
      hints: [
        'Symbols as property keys require computed property syntax.',
        'Use [symbolName] inside object literals.',
        'The answer is: [secret]',
      ],
      concepts: ['computed property', 'symbol property key'],
    },
    {
      id: 'ts-symbols-4',
      title: 'Symbol.for global registry',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use the global symbol registry to get a shared symbol.',
      skeleton: `const s1 = Symbol.__BLANK__("app.id");
const s2 = Symbol.__BLANK__("app.id");
console.log(s1 === s2);`,
      solution: `const s1 = Symbol.for("app.id");
const s2 = Symbol.for("app.id");
console.log(s1 === s2);`,
      hints: [
        'The global symbol registry uses Symbol.for().',
        'Symbol.for() returns the same symbol for the same key.',
        'The answer is: for',
      ],
      concepts: ['Symbol.for', 'global symbol registry'],
    },
    {
      id: 'ts-symbols-5',
      title: 'Predict Symbol.for behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code output?',
      skeleton: `const s1 = Symbol.for("shared");
const s2 = Symbol.for("shared");
const s3 = Symbol("shared");

console.log(s1 === s2);
console.log(s1 === s3);`,
      solution: `true
false`,
      hints: [
        'Symbol.for() returns the same symbol for the same key.',
        'Symbol() always creates a new unique symbol.',
        'Output: true, false',
      ],
      concepts: ['Symbol.for vs Symbol()', 'global registry vs local'],
    },
    {
      id: 'ts-symbols-6',
      title: 'Symbol.keyFor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Retrieve the key from the global symbol registry.',
      skeleton: `const sym = Symbol.for("myKey");
const key = Symbol.__BLANK__(sym);
console.log(key);`,
      solution: `const sym = Symbol.for("myKey");
const key = Symbol.keyFor(sym);
console.log(key);`,
      hints: [
        'Which method retrieves the key for a globally registered symbol?',
        'It is the reverse of Symbol.for().',
        'The answer is: keyFor',
      ],
      concepts: ['Symbol.keyFor', 'global symbol registry'],
    },
    {
      id: 'ts-symbols-7',
      title: 'unique symbol type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Declare a const symbol with the unique symbol type and use it as a property key in an interface.',
      skeleton: `// Declare a unique symbol called ID
// Use it as a property key in a HasId interface
`,
      solution: `const ID: unique symbol = Symbol("ID");

interface HasId {
  [ID]: string;
}

const item: HasId = {
  [ID]: "abc-123",
};`,
      hints: [
        'Use const with the type annotation "unique symbol".',
        'unique symbol ensures TypeScript treats it as a distinct type.',
        'const ID: unique symbol = Symbol("ID"); then use [ID] in an interface.',
      ],
      concepts: ['unique symbol', 'const symbol', 'symbol in interface'],
    },
    {
      id: 'ts-symbols-8',
      title: 'Symbol.toPrimitive',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Implement Symbol.toPrimitive on an object to control type coercion.',
      skeleton: `// Create a Money class with amount and currency
// Implement [Symbol.toPrimitive] to return the amount for "number" hint
// and a formatted string for "string" hint
`,
      solution: `class Money {
  constructor(public amount: number, public currency: string) {}

  [Symbol.toPrimitive](hint: string): number | string {
    if (hint === "number") {
      return this.amount;
    }
    if (hint === "string") {
      return \\\`\${this.amount} \${this.currency}\\\`;
    }
    return this.amount;
  }
}

const price = new Money(42, "USD");
console.log(+price);       // 42
console.log(\\\`\${price}\\\`);  // "42 USD"`,
      hints: [
        'Symbol.toPrimitive receives a hint: "number", "string", or "default".',
        'Return the appropriate value based on the hint.',
        '[Symbol.toPrimitive](hint: string) { if (hint === "number") return this.amount; ... }',
      ],
      concepts: ['Symbol.toPrimitive', 'type coercion', 'well-known symbol'],
    },
    {
      id: 'ts-symbols-9',
      title: 'Symbol.toStringTag',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use Symbol.toStringTag to customize the string representation of a class.',
      skeleton: `// Create a class MyCollection
// Set Symbol.toStringTag so Object.prototype.toString returns "[object MyCollection]"
`,
      solution: `class MyCollection {
  get [Symbol.toStringTag](): string {
    return "MyCollection";
  }
}

const col = new MyCollection();
console.log(Object.prototype.toString.call(col)); // "[object MyCollection]"`,
      hints: [
        'Symbol.toStringTag is a getter that returns a string.',
        'It customizes what Object.prototype.toString.call() returns.',
        'get [Symbol.toStringTag]() { return "MyCollection"; }',
      ],
      concepts: ['Symbol.toStringTag', 'toString customization'],
    },
    {
      id: 'ts-symbols-10',
      title: 'Symbol.hasInstance',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use Symbol.hasInstance to make instanceof check based on a custom condition.',
      skeleton: `// Create a class EvenNumber
// Override Symbol.hasInstance so that (4 instanceof EvenNumber) is true
// and (3 instanceof EvenNumber) is false
`,
      solution: `class EvenNumber {
  static [Symbol.hasInstance](value: unknown): boolean {
    return typeof value === "number" && value % 2 === 0;
  }
}

console.log(4 instanceof EvenNumber);  // true
console.log(3 instanceof EvenNumber);  // false`,
      hints: [
        'Symbol.hasInstance is a static method that customizes instanceof.',
        'It receives the left-hand value and returns a boolean.',
        'static [Symbol.hasInstance](value: unknown): boolean { ... }',
      ],
      concepts: ['Symbol.hasInstance', 'instanceof customization'],
    },
    {
      id: 'ts-symbols-11',
      title: 'Symbols are not enumerable',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What does Object.keys return for an object with symbol properties?',
      skeleton: `const secret = Symbol("secret");

const obj = {
  name: "Alice",
  age: 30,
  [secret]: "hidden",
};

console.log(Object.keys(obj).length);
console.log(Object.getOwnPropertySymbols(obj).length);`,
      solution: `2
1`,
      hints: [
        'Symbol properties are not included in Object.keys().',
        'Use Object.getOwnPropertySymbols() to find symbol-keyed properties.',
        'Output: 2 (name, age) and 1 (secret)',
      ],
      concepts: ['symbol enumeration', 'Object.keys', 'getOwnPropertySymbols'],
    },
    {
      id: 'ts-symbols-12',
      title: 'Private-like properties with symbols',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Use a symbol to create a private-like property that is not accessible via normal property enumeration.',
      skeleton: `// Create a class with a symbol-based "private" _balance property
// Expose it only through getBalance() method
`,
      solution: `const _balance = Symbol("balance");

class BankAccount {
  [_balance]: number;

  constructor(initial: number) {
    this[_balance] = initial;
  }

  getBalance(): number {
    return this[_balance];
  }

  deposit(amount: number): void {
    this[_balance] += amount;
  }
}

const account = new BankAccount(100);
console.log(account.getBalance()); // 100
// account._balance is undefined -- the symbol key is not easily guessable`,
      hints: [
        'Define a symbol outside the class and use it as a property key.',
        'The property is not accessible with dot notation or Object.keys.',
        'const _balance = Symbol("balance"); then use [_balance] in the class.',
      ],
      concepts: ['symbol privacy', 'encapsulation', 'symbol property'],
    },
    {
      id: 'ts-symbols-13',
      title: 'Fix: symbol comparison',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This code fails because it creates new symbols each time instead of using shared ones. Fix it.',
      skeleton: `// registry.ts
export const TOKEN = Symbol("TOKEN");

// auth.ts
import { TOKEN } from "./registry";
const obj: Record<symbol, string> = {};
obj[Symbol("TOKEN")] = "abc123";

// consumer.ts
import { TOKEN } from "./registry";
console.log(obj[TOKEN]); // undefined -- wrong symbol!`,
      solution: `// registry.ts
export const TOKEN = Symbol("TOKEN");

// auth.ts
import { TOKEN } from "./registry";
const obj: Record<symbol, string> = {};
obj[TOKEN] = "abc123";

// consumer.ts
import { TOKEN } from "./registry";
console.log(obj[TOKEN]); // "abc123"`,
      hints: [
        'Symbol("TOKEN") creates a new symbol every time.',
        'Use the imported TOKEN symbol instead of creating a new one.',
        'Change obj[Symbol("TOKEN")] to obj[TOKEN].',
      ],
      concepts: ['symbol identity', 'shared reference', 'symbol bug'],
    },
    {
      id: 'ts-symbols-14',
      title: 'Symbol registry pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a type-safe event system using symbols as event keys.',
      skeleton: `// Create symbol-based event keys and a typed event emitter
// Events: onConnect (no payload), onMessage (payload: string), onError (payload: Error)
`,
      solution: `const onConnect = Symbol("onConnect");
const onMessage = Symbol("onMessage");
const onError = Symbol("onError");

type EventMap = {
  [onConnect]: void;
  [onMessage]: string;
  [onError]: Error;
};

class EventBus {
  private handlers = new Map<symbol, Function[]>();

  on<K extends keyof EventMap>(event: K, handler: (payload: EventMap[K]) => void): void {
    const list = this.handlers.get(event as symbol) || [];
    list.push(handler);
    this.handlers.set(event as symbol, list);
  }

  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): void {
    const list = this.handlers.get(event as symbol) || [];
    list.forEach(fn => fn(payload));
  }
}`,
      hints: [
        'Define symbols for each event type.',
        'Create an EventMap type that maps symbol keys to payload types.',
        'The emitter uses generics to enforce type-safe emit and on calls.',
      ],
      concepts: ['symbol event keys', 'type-safe events', 'EventMap'],
    },
    {
      id: 'ts-symbols-15',
      title: 'Symbol brand pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Use a symbol to create a branded type that prevents mixing up similar value types.',
      skeleton: `// Create branded types UserId and PostId (both strings underneath)
// They should not be assignable to each other
`,
      solution: `declare const UserIdBrand: unique symbol;
declare const PostIdBrand: unique symbol;

type UserId = string & { readonly [UserIdBrand]: typeof UserIdBrand };
type PostId = string & { readonly [PostIdBrand]: typeof PostIdBrand };

function createUserId(id: string): UserId {
  return id as UserId;
}

function createPostId(id: string): PostId {
  return id as PostId;
}

function getUser(id: UserId): void {}

const userId = createUserId("u-1");
const postId = createPostId("p-1");

getUser(userId);  // OK
// getUser(postId); // Error: PostId is not assignable to UserId`,
      hints: [
        'Use a unique symbol as a brand to create nominal types.',
        'Intersect string with an object type containing the symbol brand.',
        'type UserId = string & { readonly [Brand]: typeof Brand }',
      ],
      concepts: ['branded types', 'nominal typing', 'unique symbol brand'],
    },
    {
      id: 'ts-symbols-16',
      title: 'Symbol.species',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Use Symbol.species to control what constructor is used when a derived array method creates a new array.',
      skeleton: `// Create a TypedArray subclass that uses regular Array as its species
// So .map() returns a plain Array, not a TypedArray
`,
      solution: `class TypedArray<T> extends Array<T> {
  static get [Symbol.species](): typeof Array {
    return Array;
  }
}

const typed = new TypedArray<number>(1, 2, 3);
const mapped = typed.map(x => x * 2);

console.log(mapped instanceof TypedArray); // false
console.log(mapped instanceof Array);      // true`,
      hints: [
        'Symbol.species controls which constructor is used for derived objects.',
        'Override the static getter [Symbol.species] to return Array.',
        'static get [Symbol.species]() { return Array; }',
      ],
      concepts: ['Symbol.species', 'derived constructor', 'Array subclass'],
    },
    {
      id: 'ts-symbols-17',
      title: 'Predict typeof symbol',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'What does typeof return for various symbol operations?',
      skeleton: `const s = Symbol("test");
console.log(typeof s);
console.log(typeof Symbol.iterator);
console.log(typeof Symbol);`,
      solution: `symbol
symbol
function`,
      hints: [
        'typeof a symbol value returns "symbol".',
        'Well-known symbols like Symbol.iterator are also symbols.',
        'typeof Symbol (the constructor) is "function".',
      ],
      concepts: ['typeof symbol', 'Symbol constructor type'],
    },
    {
      id: 'ts-symbols-18',
      title: 'Fix: symbol in JSON',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Symbol properties are lost in JSON.stringify. Fix the serialization to include them.',
      skeleton: `const metaKey = Symbol("meta");

const data = {
  name: "test",
  [metaKey]: { version: 2 },
};

// Bug: JSON.stringify loses symbol properties
const json = JSON.stringify(data);
console.log(json); // {"name":"test"} -- meta is lost!`,
      solution: `const metaKey = Symbol("meta");

const data = {
  name: "test",
  [metaKey]: { version: 2 },
};

function serializeWithSymbols(obj: any): string {
  const plain: Record<string, any> = {};
  for (const key of Object.keys(obj)) {
    plain[key] = obj[key];
  }
  for (const sym of Object.getOwnPropertySymbols(obj)) {
    plain[\\\`Symbol(\${sym.description})\\\`] = obj[sym];
  }
  return JSON.stringify(plain);
}

const json = serializeWithSymbols(data);
console.log(json); // {"name":"test","Symbol(meta)":{"version":2}}`,
      hints: [
        'JSON.stringify ignores symbol-keyed properties.',
        'Use Object.getOwnPropertySymbols() to access them manually.',
        'Convert symbol keys to string representations for serialization.',
      ],
      concepts: ['JSON serialization', 'symbol limitations', 'getOwnPropertySymbols'],
    },
    {
      id: 'ts-symbols-19',
      title: 'Refactor: string keys to symbols',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor these string-based internal keys to use symbols for collision prevention.',
      skeleton: `class Plugin {
  private _initialized = false;
  private _hooks: Function[] = [];

  init() {
    this._initialized = true;
  }

  addHook(fn: Function) {
    this._hooks.push(fn);
  }
}

// Problem: subclasses might accidentally override _initialized or _hooks`,
      solution: `const initialized = Symbol("initialized");
const hooks = Symbol("hooks");

class Plugin {
  [initialized] = false;
  [hooks]: Function[] = [];

  init() {
    this[initialized] = true;
  }

  addHook(fn: Function) {
    this[hooks].push(fn);
  }
}

// Symbol keys cannot be accidentally overridden by subclasses`,
      hints: [
        'Replace string property names with symbol keys.',
        'Define symbols outside the class and use computed property syntax.',
        'Subclasses cannot accidentally collide with symbol-keyed properties.',
      ],
      concepts: ['refactoring', 'collision prevention', 'symbol vs string keys'],
    },
    {
      id: 'ts-symbols-20',
      title: 'Refactor: enum to symbol registry',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this string enum to use symbols for guaranteed uniqueness.',
      skeleton: `enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING",
}

function setStatus(status: Status): void {
  console.log("Status:", status);
}

setStatus(Status.Active);`,
      solution: `const Status = {
  Active: Symbol("Active"),
  Inactive: Symbol("Inactive"),
  Pending: Symbol("Pending"),
} as const;

type Status = typeof Status[keyof typeof Status];

function setStatus(status: Status): void {
  console.log("Status:", status);
}

setStatus(Status.Active);`,
      hints: [
        'Replace the enum with a const object of symbols.',
        'Extract a union type from the object values.',
        'Symbols guarantee uniqueness -- no two statuses can ever be equal.',
      ],
      concepts: ['refactoring', 'symbol enum', 'const object pattern'],
    },
  ],
};
