import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-classes',
  title: '15. Classes',
  explanation: `## Classes

Classes are syntactic sugar over JavaScript's prototype-based inheritance, providing cleaner syntax for constructors and methods.

### Declaration
\`\`\`js
class Animal {
  constructor(name) { this.name = name; }
  speak() { return this.name + ' makes a sound'; }
}
\`\`\`

### Features
- **constructor**: initialise instance state
- **Methods**: shared via prototype
- **Static methods/properties**: on the class itself, not instances
- **Getters/Setters**: computed properties
- **Public fields**: \`class Foo { count = 0; }\`
- **#Private fields/methods**: \`#secret\`, only accessible inside the class
- **Static initialization blocks**: \`static { ... }\`

### class vs function constructor
Classes are **not hoisted** (unlike function declarations). They always run in strict mode. You cannot call them without \`new\`.

### Well-Known Symbols
- \`Symbol.toPrimitive\` -- custom type conversion
- \`toString()\` -- string representation
- \`valueOf()\` -- numeric representation

### new.target
Inside a constructor, \`new.target\` refers to the class that was directly constructed (useful for abstract class patterns).
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-cls-1b',
      title: 'Class constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the constructor keyword.',
      skeleton: `class Dog {
  __BLANK__(name) {
    this.name = name;
  }
}`,
      solution: `class Dog {
  constructor(name) {
    this.name = name;
  }
}`,
      hints: [
        'The special method that runs when creating an instance.',
        'It initialises the instance properties.',
        'The keyword is `constructor`.',
      ],
      concepts: ['class', 'constructor'],
    },
    {
      id: 'js-cls-2b',
      title: 'Static method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Add the keyword to make this a static method.',
      skeleton: `class MathUtils {
  __BLANK__ add(a, b) {
    return a + b;
  }
}
MathUtils.add(2, 3); // 5`,
      solution: `class MathUtils {
  static add(a, b) {
    return a + b;
  }
}
MathUtils.add(2, 3); // 5`,
      hints: [
        'Static methods belong to the class, not instances.',
        'They are called on the class itself.',
        'Use `static`.',
      ],
      concepts: ['static method', 'class'],
    },
    {
      id: 'js-cls-3b',
      title: 'Getter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Define a getter for the full name.',
      skeleton: `class Person {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }
  __BLANK__ fullName() {
    return this.first + ' ' + this.last;
  }
}
const p = new Person('Zan', 'F');
console.log(p.fullName); // "Zan F"`,
      solution: `class Person {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }
  get fullName() {
    return this.first + ' ' + this.last;
  }
}
const p = new Person('Zan', 'F');
console.log(p.fullName); // "Zan F"`,
      hints: [
        'Getters use a keyword before the method name.',
        'They are accessed like properties, not called like methods.',
        'Use `get`.',
      ],
      concepts: ['getter', 'computed property', 'class'],
    },
    {
      id: 'js-cls-4b',
      title: 'Private field',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Declare a private field.',
      skeleton: `class BankAccount {
  __BLANK__balance = 0;
  
  deposit(amount) { this.#balance += amount; }
  getBalance() { return this.#balance; }
}`,
      solution: `class BankAccount {
  #balance = 0;
  
  deposit(amount) { this.#balance += amount; }
  getBalance() { return this.#balance; }
}`,
      hints: [
        'Private fields use a special prefix character.',
        'It is a hash/pound symbol.',
        'Use `#`.',
      ],
      concepts: ['private fields', '#', 'encapsulation'],
    },
    {
      id: 'js-cls-5b',
      title: 'instanceof check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Check if an object is an instance of a class.',
      skeleton: `class Car {}
const myCar = new Car();
console.log(myCar __BLANK__ Car); // true`,
      solution: `class Car {}
const myCar = new Car();
console.log(myCar instanceof Car); // true`,
      hints: [
        'This operator checks the prototype chain.',
        'It returns true if the constructor appears in the chain.',
        'The operator is `instanceof`.',
      ],
      concepts: ['instanceof', 'prototype chain'],
    },
    {
      id: 'js-cls-6b',
      title: 'Public class field',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Declare a public class field with a default value.',
      skeleton: `class Counter {
  count __BLANK__ 0;
  
  increment() { this.count++; }
}`,
      solution: `class Counter {
  count = 0;
  
  increment() { this.count++; }
}`,
      hints: [
        'Public fields are declared at the top of the class body.',
        'Use = to assign a default value.',
        'Use `=`.',
      ],
      concepts: ['public fields', 'class fields'],
    },
    // ---- write-function (6) ----
    {
      id: 'js-cls-7b',
      title: 'Basic class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a class `Rectangle` with a constructor(width, height) and a method area() that returns width * height.',
      skeleton: `// Write the Rectangle class
`,
      solution: `class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}`,
      hints: [
        'Define the class with constructor and method.',
        'Store width and height in the constructor.',
        'area() returns this.width * this.height.',
      ],
      concepts: ['class', 'constructor', 'methods'],
    },
    {
      id: 'js-cls-8b',
      title: 'Getters and setters',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a class `Temperature` with a constructor(celsius) and get/set fahrenheit that converts between scales.',
      skeleton: `// Write Temperature class
// new Temperature(0).fahrenheit => 32
// t.fahrenheit = 212; t.celsius => 100
`,
      solution: `class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  get fahrenheit() {
    return this.celsius * 9 / 5 + 32;
  }

  set fahrenheit(f) {
    this.celsius = (f - 32) * 5 / 9;
  }
}`,
      hints: [
        'The getter converts celsius to fahrenheit.',
        'The setter converts fahrenheit back to celsius.',
        'F = C * 9/5 + 32, C = (F - 32) * 5/9.',
      ],
      concepts: ['getter', 'setter', 'computed properties', 'class'],
    },
    {
      id: 'js-cls-9b',
      title: 'Private field with validation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a class `Age` with a private #value field. The constructor validates that age is >= 0. Provide a getter `value`.',
      skeleton: `// Write Age class with private field and validation
`,
      solution: `class Age {
  #value;

  constructor(value) {
    if (value < 0) throw new RangeError('Age cannot be negative');
    this.#value = value;
  }

  get value() {
    return this.#value;
  }
}`,
      hints: [
        'Declare #value as a private field.',
        'Validate in the constructor, throw if invalid.',
        'Provide a getter to expose the value.',
      ],
      concepts: ['private fields', 'validation', 'getter', 'RangeError'],
    },
    {
      id: 'js-cls-10b',
      title: 'Static factory method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a class `User` with a constructor(name, role) and a static method `createAdmin(name)` that creates a User with role "admin".',
      skeleton: `// Write User class with static factory
`,
      solution: `class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  static createAdmin(name) {
    return new User(name, 'admin');
  }
}`,
      hints: [
        'Static methods are called on the class itself.',
        'The factory method creates a new instance with preset values.',
        'Return new User(name, "admin").',
      ],
      concepts: ['static method', 'factory pattern', 'class'],
    },
    {
      id: 'js-cls-11b',
      title: 'Symbol.toPrimitive',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a class `Money` with constructor(amount, currency) that implements Symbol.toPrimitive: return amount for "number", "$amount" for "string", and true for "default".',
      skeleton: `// Write Money class with Symbol.toPrimitive
`,
      solution: `class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return this.amount;
    if (hint === 'string') return \`\${this.currency}\${this.amount}\`;
    return true;
  }
}`,
      hints: [
        'Symbol.toPrimitive is a method with a computed property name.',
        'The hint parameter is "number", "string", or "default".',
        'Return appropriate values for each hint.',
      ],
      concepts: ['Symbol.toPrimitive', 'type conversion', 'computed method'],
    },
    {
      id: 'js-cls-12b',
      title: 'Static initialization block',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a class `Config` with a static initialization block that sets up a static `defaults` property from a computed value.',
      skeleton: `// Write Config class with static initialization block
// Config.defaults should be { env: 'production', debug: false }
`,
      solution: `class Config {
  static defaults;

  static {
    Config.defaults = {
      env: 'production',
      debug: false,
    };
  }
}`,
      hints: [
        'Static initialization blocks use `static { ... }` in the class body.',
        'They run once when the class is defined.',
        'Set the static property inside the block.',
      ],
      concepts: ['static initialization block', 'static properties', 'class'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'js-cls-13b',
      title: 'Fix: calling class without new',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'This code forgets to use new when creating an instance. Fix it.',
      skeleton: `class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
const p = Point(1, 2); // TypeError`,
      solution: `class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
const p = new Point(1, 2);`,
      hints: [
        'Classes cannot be called without new.',
        'Unlike function constructors in sloppy mode.',
        'Add `new` before Point.',
      ],
      concepts: ['new', 'class', 'TypeError'],
    },
    {
      id: 'js-cls-14b',
      title: 'Fix: private field access',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code tries to access a private field from outside the class. Fix it by adding a public getter.',
      skeleton: `class Secret {
  #value = 42;
}
const s = new Secret();
console.log(s.#value); // SyntaxError`,
      solution: `class Secret {
  #value = 42;

  getValue() {
    return this.#value;
  }
}
const s = new Secret();
console.log(s.getValue()); // 42`,
      hints: [
        'Private fields are only accessible inside the class.',
        'Add a public method to expose the value.',
        'Create a getValue() method.',
      ],
      concepts: ['private fields', 'encapsulation', 'getter'],
    },
    {
      id: 'js-cls-15b',
      title: 'Fix: this in callback',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This class method loses its this context when passed as a callback. Fix it.',
      skeleton: `class Greeter {
  constructor(name) { this.name = name; }
  greet() { return 'Hello, ' + this.name; }
}
const g = new Greeter('Zan');
const fn = g.greet;
console.log(fn()); // TypeError: Cannot read properties of undefined`,
      solution: `class Greeter {
  constructor(name) { this.name = name; }
  greet = () => { return 'Hello, ' + this.name; };
}
const g = new Greeter('Zan');
const fn = g.greet;
console.log(fn()); // "Hello, Zan"`,
      hints: [
        'When a method is extracted, this is lost.',
        'Use an arrow function class field to bind this.',
        'Change `greet()` to `greet = () => ...`.',
      ],
      concepts: ['this', 'arrow function', 'class field', 'callback'],
    },
    // ---- predict-output (3) ----
    {
      id: 'js-cls-16b',
      title: 'Predict: class hoisting',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `try {
  const a = new Animal();
} catch (e) {
  console.log(e.constructor.name);
}
class Animal {}`,
      solution: `ReferenceError`,
      hints: [
        'Classes are not hoisted like function declarations.',
        'Using a class before its declaration throws.',
        'It throws a ReferenceError.',
      ],
      concepts: ['class hoisting', 'TDZ', 'ReferenceError'],
    },
    {
      id: 'js-cls-17b',
      title: 'Predict: static vs instance',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `class Foo {
  static bar() { return 'static'; }
  bar() { return 'instance'; }
}
const f = new Foo();
console.log(Foo.bar());
console.log(f.bar());`,
      solution: `static
instance`,
      hints: [
        'Static and instance methods can have the same name.',
        'Static is called on the class, instance on the object.',
        'They are separate methods.',
      ],
      concepts: ['static method', 'instance method', 'class'],
    },
    {
      id: 'js-cls-18b',
      title: 'Predict: class field initialisation',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `class Counter {
  count = 0;
}
const a = new Counter();
const b = new Counter();
a.count = 5;
console.log(b.count);`,
      solution: `0`,
      hints: [
        'Class fields create instance properties, not shared ones.',
        'Each instance gets its own count.',
        'Changing a.count does not affect b.count.',
      ],
      concepts: ['class fields', 'instance properties'],
    },
    // ---- refactor (2) ----
    {
      id: 'js-cls-19b',
      title: 'Refactor: constructor function to class',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Refactor this constructor function to a class.',
      skeleton: `function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return this.name + ' makes a sound';
};`,
      solution: `class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return this.name + ' makes a sound';
  }
}`,
      hints: [
        'Move the constructor body into the class constructor.',
        'Move prototype methods into the class body.',
        'Use class syntax instead of function + prototype.',
      ],
      concepts: ['class', 'constructor function', 'prototype', 'refactoring'],
    },
    {
      id: 'js-cls-20b',
      title: 'Refactor: closure privacy to #private',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this closure-based privacy to use private class fields.',
      skeleton: `function createStack() {
  const items = [];
  return {
    push(val) { items.push(val); },
    pop() { return items.pop(); },
    get size() { return items.length; },
  };
}`,
      solution: `class Stack {
  #items = [];

  push(val) { this.#items.push(val); }
  pop() { return this.#items.pop(); }
  get size() { return this.#items.length; }
}`,
      hints: [
        'Replace the closure variable with a #private field.',
        'Methods access this.#items.',
        'The getter becomes a class getter.',
      ],
      concepts: ['private fields', 'closure', 'class', 'refactoring'],
    },
  ],
};
