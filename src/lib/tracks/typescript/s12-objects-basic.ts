import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-obj-basic',
  title: '12. Objects Fundamentals',
  explanation: `## Objects Fundamentals

Objects are the backbone of TypeScript. Nearly everything in JavaScript/TypeScript is an object or behaves like one.

### Object Literals
\\\`\\\`\\\`typescript
const user = { name: "Alice", age: 30 };
\\\`\\\`\\\`

### Property Access
- **Dot notation**: \\\`user.name\\\`
- **Bracket notation**: \\\`user["name"]\\\` -- required for dynamic keys

### Shorthand Syntax
- **Property shorthand**: \\\`{ name }\\\` instead of \\\`{ name: name }\\\`
- **Method shorthand**: \\\`{ greet() {} }\\\` instead of \\\`{ greet: function() {} }\\\`
- **Computed properties**: \\\`{ [key]: value }\\\`

### Object Utilities
- \\\`Object.keys()\\\` / \\\`Object.values()\\\` / \\\`Object.entries()\\\`
- \\\`Object.assign()\\\` -- shallow merge
- **Spread operator**: \\\`{ ...obj1, ...obj2 }\\\`

### Safety
- **Optional chaining**: \\\`obj?.nested?.prop\\\`
- **Object.freeze()** -- makes an object immutable (shallow)
- **Object.seal()** -- prevents adding/removing properties

### Destructuring
\\\`\\\`\\\`typescript
const { name, age } = user;
const { name, ...rest } = user; // rest collects remaining properties
\\\`\\\`\\\`

### Other Concepts
- Property existence: \\\`"key" in obj\\\` or \\\`obj.hasOwnProperty("key")\\\`
- Deleting: \\\`delete obj.prop\\\`
- Object comparison is by reference, not by value
- Every object has a prototype chain leading to \\\`Object.prototype\\\``,
  exercises: [
    // --- 1 ---
    {
      id: 'ts-obj-basic-1',
      title: 'Object literal',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create an object literal with name and age properties.',
      skeleton: `const person: { name: string; age: number } = __BLANK__;
console.log(person.name, person.age);`,
      solution: `const person: { name: string; age: number } = { name: "Alice", age: 25 };
console.log(person.name, person.age);`,
      hints: [
        'An object literal uses curly braces with key: value pairs.',
        'The type requires name (string) and age (number).',
        '{ name: "Alice", age: 25 }',
      ],
      concepts: ['object literal', 'inline type annotation'],
    },
    // --- 2 ---
    {
      id: 'ts-obj-basic-2',
      title: 'Dot vs bracket access',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Access the "first-name" property using bracket notation.',
      skeleton: `const data: { [key: string]: string } = { "first-name": "Zan" };
const name: string = data__BLANK__;
console.log(name);`,
      solution: `const data: { [key: string]: string } = { "first-name": "Zan" };
const name: string = data["first-name"];
console.log(name);`,
      hints: [
        'Property names with hyphens cannot use dot notation.',
        'Use bracket notation with the property name as a string.',
        'data["first-name"]',
      ],
      concepts: ['bracket notation', 'property access'],
    },
    // --- 3 ---
    {
      id: 'ts-obj-basic-3',
      title: 'Shorthand properties',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use property shorthand to create an object from existing variables.',
      skeleton: `const title = "Admin";
const level = 5;
const role = { __BLANK__ };
console.log(role); // { title: "Admin", level: 5 }`,
      solution: `const title = "Admin";
const level = 5;
const role = { title, level };
console.log(role); // { title: "Admin", level: 5 }`,
      hints: [
        'When the variable name matches the property name, you can use shorthand.',
        'Instead of { title: title, level: level } you can write shorter.',
        '{ title, level }',
      ],
      concepts: ['property shorthand', 'ES6 syntax'],
    },
    // --- 4 ---
    {
      id: 'ts-obj-basic-4',
      title: 'Computed property names',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use a computed property name to create a key from a variable.',
      skeleton: `const key = "color";
const config: Record<string, string> = { __BLANK__: "blue" };
console.log(config.color);`,
      solution: `const key = "color";
const config: Record<string, string> = { [key]: "blue" };
console.log(config.color);`,
      hints: [
        'Computed property names use square brackets around an expression.',
        'The expression is evaluated and used as the property key.',
        '{ [key]: "blue" }',
      ],
      concepts: ['computed properties', 'dynamic keys'],
    },
    // --- 5 ---
    {
      id: 'ts-obj-basic-5',
      title: 'Method shorthand',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Define a method using shorthand syntax inside an object.',
      skeleton: `const calculator = {
  value: 0,
  __BLANK__(n: number) {
    this.value += n;
    return this;
  },
};
calculator.add(5);
console.log(calculator.value);`,
      solution: `const calculator = {
  value: 0,
  add(n: number) {
    this.value += n;
    return this;
  },
};
calculator.add(5);
console.log(calculator.value);`,
      hints: [
        'Method shorthand lets you define methods without the function keyword.',
        'Just write the method name followed by parentheses.',
        'add(n: number) { ... }',
      ],
      concepts: ['method shorthand', 'this keyword'],
    },
    // --- 6 ---
    {
      id: 'ts-obj-basic-6',
      title: 'Object.keys/values/entries',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Use Object.entries() to get key-value pairs.',
      skeleton: `const config = { host: "localhost", port: 3000 };
const entries = __BLANK__(config);
console.log(entries);`,
      solution: `const config = { host: "localhost", port: 3000 };
const entries = Object.entries(config);
console.log(entries);`,
      hints: [
        'Object has static methods for inspecting properties.',
        'Object.entries() returns an array of [key, value] pairs.',
        'Object.entries(config)',
      ],
      concepts: ['Object.entries', 'Object.keys', 'Object.values'],
    },
    // --- 7 ---
    {
      id: 'ts-obj-basic-7',
      title: 'Spread operator merge',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a function that merges two objects using the spread operator, with the second overriding the first.',
      skeleton: `function mergeConfig(
  defaults: Record<string, unknown>,
  overrides: Record<string, unknown>
): Record<string, unknown> {
  // merge defaults and overrides using spread
}`,
      solution: `function mergeConfig(
  defaults: Record<string, unknown>,
  overrides: Record<string, unknown>
): Record<string, unknown> {
  return { ...defaults, ...overrides };
}`,
      hints: [
        'The spread operator copies all properties from one object into another.',
        'Properties listed later override earlier ones.',
        'return { ...defaults, ...overrides };',
      ],
      concepts: ['spread operator', 'object merging'],
    },
    // --- 8 ---
    {
      id: 'ts-obj-basic-8',
      title: 'Object destructuring',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a function that destructures a user object and returns a greeting string.',
      skeleton: `interface User {
  name: string;
  age: number;
  city: string;
}

function greetUser(user: User): string {
  // destructure user and return "Hello, {name} from {city}!"
}`,
      solution: `interface User {
  name: string;
  age: number;
  city: string;
}

function greetUser(user: User): string {
  const { name, city } = user;
  return \`Hello, \${name} from \${city}!\`;
}`,
      hints: [
        'Destructuring lets you extract properties into variables: const { a, b } = obj.',
        'Use template literals to build the greeting string.',
        'const { name, city } = user; return `Hello, ${name} from ${city}!`;',
      ],
      concepts: ['destructuring', 'template literals'],
    },
    // --- 9 ---
    {
      id: 'ts-obj-basic-9',
      title: 'Rest in destructuring',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that extracts the id from an object and returns the remaining properties.',
      skeleton: `function extractId(obj: { id: number; [key: string]: unknown }): {
  id: number;
  rest: Record<string, unknown>;
} {
  // destructure id and collect the rest
}`,
      solution: `function extractId(obj: { id: number; [key: string]: unknown }): {
  id: number;
  rest: Record<string, unknown>;
} {
  const { id, ...rest } = obj;
  return { id, rest };
}`,
      hints: [
        'The rest syntax (...) in destructuring collects remaining properties.',
        'const { id, ...rest } = obj separates id from everything else.',
        'const { id, ...rest } = obj; return { id, rest };',
      ],
      concepts: ['rest destructuring', 'object spread'],
    },
    // --- 10 ---
    {
      id: 'ts-obj-basic-10',
      title: 'Optional chaining',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the runtime error when accessing a nested property that may not exist.',
      skeleton: `interface Company {
  name: string;
  address?: {
    street: string;
    city: string;
  };
}

function getCity(company: Company): string | undefined {
  return company.address.city;
}`,
      solution: `interface Company {
  name: string;
  address?: {
    street: string;
    city: string;
  };
}

function getCity(company: Company): string | undefined {
  return company.address?.city;
}`,
      hints: [
        'address is optional, so it could be undefined.',
        'Accessing .city on undefined throws a runtime error.',
        'Use optional chaining: company.address?.city',
      ],
      concepts: ['optional chaining', 'nullable properties'],
    },
    // --- 11 ---
    {
      id: 'ts-obj-basic-11',
      title: 'Property existence check',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that checks whether a given key exists on an object using the "in" operator.',
      skeleton: `function hasProperty(obj: Record<string, unknown>, key: string): boolean {
  // use the "in" operator
}`,
      solution: `function hasProperty(obj: Record<string, unknown>, key: string): boolean {
  return key in obj;
}`,
      hints: [
        'The "in" operator checks if a property exists on an object or its prototype chain.',
        'Syntax: "key" in obj returns a boolean.',
        'return key in obj;',
      ],
      concepts: ['in operator', 'property existence'],
    },
    // --- 12 ---
    {
      id: 'ts-obj-basic-12',
      title: 'Object.assign vs spread',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict the output showing how Object.assign mutates the target.',
      skeleton: `const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = Object.assign(target, source);
console.log(target === result);
console.log(target);`,
      solution: `true
{ a: 1, b: 3, c: 4 }`,
      hints: [
        'Object.assign modifies the target object and returns it.',
        'source properties override target properties with the same key.',
        'target === result is true because assign returns the target. target becomes { a: 1, b: 3, c: 4 }.',
      ],
      concepts: ['Object.assign', 'mutation', 'reference equality'],
    },
    // --- 13 ---
    {
      id: 'ts-obj-basic-13',
      title: 'Nested object update',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function that immutably updates a nested address city on a user object.',
      skeleton: `interface Address {
  street: string;
  city: string;
}
interface User {
  name: string;
  address: Address;
}

function updateCity(user: User, newCity: string): User {
  // return a new User with the city changed, without mutating the original
}`,
      solution: `interface Address {
  street: string;
  city: string;
}
interface User {
  name: string;
  address: Address;
}

function updateCity(user: User, newCity: string): User {
  return {
    ...user,
    address: {
      ...user.address,
      city: newCity,
    },
  };
}`,
      hints: [
        'Use the spread operator at each nesting level to create new objects.',
        'Spread the user, then spread the address, overriding city.',
        'return { ...user, address: { ...user.address, city: newCity } };',
      ],
      concepts: ['immutable update', 'nested spread', 'object copying'],
    },
    // --- 14 ---
    {
      id: 'ts-obj-basic-14',
      title: 'Delete property',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict the output after deleting a property.',
      skeleton: `const obj: { a?: number; b: number; c: number } = { a: 1, b: 2, c: 3 };
delete obj.a;
console.log(obj);
console.log("a" in obj);`,
      solution: `{ b: 2, c: 3 }
false`,
      hints: [
        'delete removes a property from an object entirely.',
        'After deletion, the property no longer exists on the object.',
        'obj becomes { b: 2, c: 3 }. "a" in obj is false.',
      ],
      concepts: ['delete operator', 'property removal'],
    },
    // --- 15 ---
    {
      id: 'ts-obj-basic-15',
      title: 'Object.freeze',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix the code so that the config object is truly immutable and TypeScript catches mutations.',
      skeleton: `const config = { host: "localhost", port: 3000 };
config.port = 8080; // This should be a TypeScript error
console.log(config.port);`,
      solution: `const config = Object.freeze({ host: "localhost", port: 3000 });
// config.port = 8080; // Error: Cannot assign to 'port' because it is a read-only property
console.log(config.port);`,
      hints: [
        'Object.freeze makes properties read-only at runtime.',
        'TypeScript also infers readonly properties from Object.freeze.',
        'Wrap the literal with Object.freeze() and remove or comment out the mutation.',
      ],
      concepts: ['Object.freeze', 'immutability', 'readonly'],
    },
    // --- 16 ---
    {
      id: 'ts-obj-basic-16',
      title: 'Object.seal behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Predict what happens with a sealed object.',
      skeleton: `const obj: Record<string, number> = { x: 1, y: 2 };
Object.seal(obj);
obj.x = 10;         // modify existing
obj.z = 3;          // add new (strict mode throws)
console.log(obj.x);
console.log(Object.keys(obj));`,
      solution: `10
["x", "y"]`,
      hints: [
        'Object.seal prevents adding or removing properties but allows modification.',
        'obj.x = 10 succeeds. obj.z = 3 silently fails (or throws in strict mode).',
        'obj.x is 10, keys are still ["x", "y"].',
      ],
      concepts: ['Object.seal', 'property modification'],
    },
    // --- 17 ---
    {
      id: 'ts-obj-basic-17',
      title: 'Property descriptors',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a function that defines a non-enumerable property on an object using Object.defineProperty.',
      skeleton: `function addHiddenProp(obj: Record<string, unknown>, key: string, value: unknown): void {
  // define a non-enumerable property
}`,
      solution: `function addHiddenProp(obj: Record<string, unknown>, key: string, value: unknown): void {
  Object.defineProperty(obj, key, {
    value,
    enumerable: false,
    writable: true,
    configurable: true,
  });
}`,
      hints: [
        'Object.defineProperty lets you control property attributes.',
        'Set enumerable to false to hide it from Object.keys and for...in.',
        'Object.defineProperty(obj, key, { value, enumerable: false, writable: true, configurable: true });',
      ],
      concepts: ['Object.defineProperty', 'property descriptors', 'enumerable'],
    },
    // --- 18 ---
    {
      id: 'ts-obj-basic-18',
      title: 'Prototype chain basics',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Predict the output involving prototype chain lookups.',
      skeleton: `const parent = { greet: "hello" };
const child = Object.create(parent);
child.name = "Alice";
console.log(child.greet);
console.log(child.hasOwnProperty("greet"));
console.log(child.hasOwnProperty("name"));`,
      solution: `hello
false
true`,
      hints: [
        'Object.create(parent) makes parent the prototype of child.',
        'child.greet is found via prototype chain, not directly on child.',
        'child.greet is "hello". hasOwnProperty("greet") is false. hasOwnProperty("name") is true.',
      ],
      concepts: ['prototype chain', 'Object.create', 'hasOwnProperty'],
    },
    // --- 19 ---
    {
      id: 'ts-obj-basic-19',
      title: 'toString and valueOf',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Create an object with custom toString() and valueOf() methods.',
      skeleton: `function createMoney(amount: number, currency: string) {
  return {
    amount,
    currency,
    // add toString that returns e.g. "100 USD"
    // add valueOf that returns the numeric amount
  };
}

const price = createMoney(100, "USD");
// String(price) should return "100 USD"
// +price should return 100`,
      solution: `function createMoney(amount: number, currency: string) {
  return {
    amount,
    currency,
    toString() {
      return \`\${amount} \${currency}\`;
    },
    valueOf() {
      return amount;
    },
  };
}

const price = createMoney(100, "USD");
// String(price) returns "100 USD"
// +price returns 100`,
      hints: [
        'toString() is called when an object is converted to a string.',
        'valueOf() is called when an object is used in a numeric context.',
        'Add toString() { return `${amount} ${currency}`; } and valueOf() { return amount; }.',
      ],
      concepts: ['toString', 'valueOf', 'type coercion'],
    },
    // --- 20 ---
    {
      id: 'ts-obj-basic-20',
      title: 'Refactor to object patterns',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this function to use destructuring, spread, and shorthand syntax.',
      skeleton: `function createUser(
  name: string,
  email: string,
  options: { role: string; active: boolean; theme: string }
) {
  const user: Record<string, unknown> = {};
  user.name = name;
  user.email = email;
  user.role = options.role;
  user.active = options.active;
  user.theme = options.theme;
  user.createdAt = new Date();
  return user;
}`,
      solution: `function createUser(
  name: string,
  email: string,
  options: { role: string; active: boolean; theme: string }
) {
  const { role, active, theme } = options;
  return { name, email, role, active, theme, createdAt: new Date() };
}`,
      hints: [
        'Destructure options to extract role, active, and theme.',
        'Use property shorthand when variable names match property names.',
        'Destructure options, then return { name, email, role, active, theme, createdAt: new Date() }.',
      ],
      concepts: ['destructuring', 'property shorthand', 'refactoring'],
    },
  ],
};
