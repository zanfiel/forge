import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-inheritance',
  title: '16. Inheritance',
  explanation: `## Inheritance

JavaScript classes support single inheritance via the \`extends\` keyword. A child class inherits all methods and properties from its parent.

### extends & super
\`\`\`js
class Animal {
  constructor(name) { this.name = name; }
  speak() { return this.name + ' makes a sound'; }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);          // MUST call super() before using this
    this.breed = breed;
  }
  speak() { return this.name + ' barks'; }  // override
}
\`\`\`

### Rules
- \`super()\` must be called in the child constructor before accessing \`this\`
- \`super.method()\` calls the parent version of an overridden method
- Static methods are also inherited
- \`instanceof\` checks the entire prototype chain

### Mixins
JavaScript has no multiple inheritance, but you can compose behaviour with mixins:
\`\`\`js
const Serializable = (Base) => class extends Base {
  toJSON() { return JSON.stringify(this); }
};
\`\`\`

### Composition vs Inheritance
Prefer composition ("has-a") over deep inheritance ("is-a") hierarchies. Flat is better than nested.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-inh-1b',
      title: 'Extending a class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the keyword to create a subclass.',
      skeleton: `class Shape {}

class Circle __BLANK__ Shape {
  constructor(r) {
    super();
    this.radius = r;
  }
}`,
      solution: `class Shape {}

class Circle extends Shape {
  constructor(r) {
    super();
    this.radius = r;
  }
}`,
      hints: [
        'You need a keyword that establishes a parent-child relationship.',
        'It goes between the class name and the parent class name.',
        'The keyword is `extends`.',
      ],
      concepts: ['extends', 'class', 'inheritance'],
    },
    {
      id: 'js-inh-2b',
      title: 'Calling the parent constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Call the parent constructor with the name argument.',
      skeleton: `class Animal {
  constructor(name) { this.name = name; }
}

class Cat extends Animal {
  constructor(name, color) {
    __BLANK__;
    this.color = color;
  }
}`,
      solution: `class Animal {
  constructor(name) { this.name = name; }
}

class Cat extends Animal {
  constructor(name, color) {
    super(name);
    this.color = color;
  }
}`,
      hints: [
        'You need to invoke the parent constructor.',
        'Pass the name argument up to the parent.',
        'Use `super(name)`.',
      ],
      concepts: ['super', 'constructor', 'extends'],
    },
    {
      id: 'js-inh-3b',
      title: 'Calling a parent method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Call the parent speak() method from the child.',
      skeleton: `class Animal {
  speak() { return 'generic sound'; }
}

class Dog extends Animal {
  speak() {
    const base = __BLANK__;
    return base + ' (woof!)';
  }
}`,
      solution: `class Animal {
  speak() { return 'generic sound'; }
}

class Dog extends Animal {
  speak() {
    const base = super.speak();
    return base + ' (woof!)';
  }
}`,
      hints: [
        'You need to call the parent version of this method.',
        'Access parent methods through a special keyword.',
        'Use `super.speak()`.',
      ],
      concepts: ['super', 'method overriding'],
    },
    {
      id: 'js-inh-4i',
      title: 'instanceof check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the operator that checks the prototype chain.',
      skeleton: `class Vehicle {}
class Car extends Vehicle {}
const c = new Car();
console.log(c __BLANK__ Vehicle); // true`,
      solution: `class Vehicle {}
class Car extends Vehicle {}
const c = new Car();
console.log(c instanceof Vehicle); // true`,
      hints: [
        'This operator checks if an object is in a constructor\'s prototype chain.',
        'It returns a boolean.',
        'The operator is `instanceof`.',
      ],
      concepts: ['instanceof', 'prototype chain'],
    },
    {
      id: 'js-inh-5i',
      title: 'Static method inheritance',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the keyword so the child class can call the inherited static method.',
      skeleton: `class Base {
  __BLANK__ create() {
    return new this();
  }
}

class Child extends Base {}
const obj = Child.create();`,
      solution: `class Base {
  static create() {
    return new this();
  }
}

class Child extends Base {}
const obj = Child.create();`,
      hints: [
        'Static methods belong to the class, not instances.',
        'They are inherited by subclasses.',
        'The keyword is `static`.',
      ],
      concepts: ['static', 'inheritance'],
    },
    {
      id: 'js-inh-6i',
      title: 'Override getter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Override the parent getter to return a different value.',
      skeleton: `class Base {
  get type() { return 'base'; }
}

class Derived extends Base {
  __BLANK__ type() { return 'derived'; }
}

console.log(new Derived().type); // 'derived'`,
      solution: `class Base {
  get type() { return 'base'; }
}

class Derived extends Base {
  get type() { return 'derived'; }
}

console.log(new Derived().type); // 'derived'`,
      hints: [
        'You are overriding a getter, not a regular method.',
        'Getters use a special keyword before the method name.',
        'The keyword is `get`.',
      ],
      concepts: ['getter', 'override', 'inheritance'],
    },

    // ---- write-function (6) ----
    {
      id: 'js-inh-7b',
      title: 'Basic inheritance hierarchy',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Create a Rectangle class that extends Shape and has an area() method.',
      skeleton: `class Shape {
  constructor(name) { this.name = name; }
}

// Write class Rectangle that extends Shape
// Constructor takes width and height (and passes 'rectangle' to super)
// Add an area() method returning width * height
`,
      solution: `class Shape {
  constructor(name) { this.name = name; }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super('rectangle');
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}`,
      hints: [
        'Use extends to inherit from Shape.',
        'Call super("rectangle") before using this in the constructor.',
        'The area method multiplies width by height.',
      ],
      concepts: ['extends', 'super', 'method'],
    },
    {
      id: 'js-inh-8b',
      title: 'Method override with super',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Override toString() in Employee to include the role.',
      skeleton: `class Person {
  constructor(name) { this.name = name; }
  toString() { return this.name; }
}

// Write class Employee extends Person
// Constructor takes name and role
// Override toString() to return "name (role)" using super.toString()
`,
      solution: `class Person {
  constructor(name) { this.name = name; }
  toString() { return this.name; }
}

class Employee extends Person {
  constructor(name, role) {
    super(name);
    this.role = role;
  }

  toString() {
    return super.toString() + ' (' + this.role + ')';
  }
}`,
      hints: [
        'Call super(name) in the constructor.',
        'In toString(), call super.toString() to get the parent result.',
        'Concatenate the role in parentheses.',
      ],
      concepts: ['super', 'method overriding', 'toString'],
    },
    {
      id: 'js-inh-9i',
      title: 'Multi-level inheritance',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Create a three-level hierarchy: Animal -> Pet -> Dog, each adding a method.',
      skeleton: `// Create class Animal with method alive() returning true
// Create class Pet extends Animal with method domestic() returning true
// Create class Dog extends Pet with method speak() returning 'woof'
`,
      solution: `class Animal {
  alive() {
    return true;
  }
}

class Pet extends Animal {
  domestic() {
    return true;
  }
}

class Dog extends Pet {
  speak() {
    return 'woof';
  }
}`,
      hints: [
        'Each class extends the one above it.',
        'Dog extends Pet, Pet extends Animal.',
        'Each class adds one new method.',
      ],
      concepts: ['multi-level inheritance', 'extends', 'prototype chain'],
    },
    {
      id: 'js-inh-10i',
      title: 'Mixin pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a mixin function that adds serialization to any class.',
      skeleton: `// Write a function Serializable(Base) that returns a class extending Base
// The returned class should have a serialize() method that returns
// JSON.stringify(this)

class User {
  constructor(name) { this.name = name; }
}

// Apply: const SerializableUser = Serializable(User);
`,
      solution: `function Serializable(Base) {
  return class extends Base {
    serialize() {
      return JSON.stringify(this);
    }
  };
}

class User {
  constructor(name) { this.name = name; }
}

const SerializableUser = Serializable(User);`,
      hints: [
        'The function takes a Base class and returns a new class.',
        'The returned class extends Base.',
        'Add a serialize method that calls JSON.stringify(this).',
      ],
      concepts: ['mixin', 'higher-order class', 'composition'],
    },
    {
      id: 'js-inh-11i',
      title: 'Abstract class pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Create an abstract class that cannot be instantiated directly using new.target.',
      skeleton: `// Create class AbstractShape with a constructor that throws
// if new.target === AbstractShape
// Add an abstract area() method that throws 'Not implemented'
// Create class Square extends AbstractShape with proper area()
`,
      solution: `class AbstractShape {
  constructor(name) {
    if (new.target === AbstractShape) {
      throw new Error('Cannot instantiate AbstractShape directly');
    }
    this.name = name;
  }

  area() {
    throw new Error('Not implemented');
  }
}

class Square extends AbstractShape {
  constructor(side) {
    super('square');
    this.side = side;
  }

  area() {
    return this.side * this.side;
  }
}`,
      hints: [
        'new.target refers to the class being constructed.',
        'If new.target === AbstractShape, throw an error.',
        'Square overrides area() with its own implementation.',
      ],
      concepts: ['new.target', 'abstract class', 'method overriding'],
    },
    {
      id: 'js-inh-12a',
      title: 'Composition over inheritance',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor a deep hierarchy into composition using delegation.',
      skeleton: `// Instead of: FlyingSwimmingDuck extends FlyingAnimal extends SwimmingAnimal
// Use composition: create canFly and canSwim behaviour objects,
// then a createDuck function that combines them.

// canFly: object with fly() returning 'flying'
// canSwim: object with swim() returning 'swimming'
// createDuck(name): returns { name, ...canFly, ...canSwim, quack() returning 'quack' }
`,
      solution: `const canFly = {
  fly() {
    return 'flying';
  },
};

const canSwim = {
  swim() {
    return 'swimming';
  },
};

function createDuck(name) {
  return {
    name,
    ...canFly,
    ...canSwim,
    quack() {
      return 'quack';
    },
  };
}`,
      hints: [
        'Define behaviour as plain objects with methods.',
        'Combine them using the spread operator.',
        'The factory function returns an object with all behaviours mixed in.',
      ],
      concepts: ['composition', 'factory function', 'spread', 'delegation'],
    },

    // ---- fix-bug (3) ----
    {
      id: 'js-inh-13b',
      title: 'Missing super() call',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fix the error: must call super() before accessing this.',
      skeleton: `class Base {
  constructor(id) { this.id = id; }
}

class Child extends Base {
  constructor(id, name) {
    this.name = name;
    super(id);
  }
}`,
      solution: `class Base {
  constructor(id) { this.id = id; }
}

class Child extends Base {
  constructor(id, name) {
    super(id);
    this.name = name;
  }
}`,
      hints: [
        'In a subclass constructor, there is a required order of operations.',
        'You cannot use `this` before calling the parent constructor.',
        'Move `super(id)` before `this.name = name`.',
      ],
      concepts: ['super', 'constructor order', 'ReferenceError'],
    },
    {
      id: 'js-inh-14i',
      title: 'Broken method override',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the override so it correctly extends parent behaviour.',
      skeleton: `class Logger {
  log(msg) {
    return '[LOG] ' + msg;
  }
}

class TimedLogger extends Logger {
  log(msg) {
    const timestamp = new Date().toISOString();
    return timestamp + ' ' + log(msg);
  }
}`,
      solution: `class Logger {
  log(msg) {
    return '[LOG] ' + msg;
  }
}

class TimedLogger extends Logger {
  log(msg) {
    const timestamp = new Date().toISOString();
    return timestamp + ' ' + super.log(msg);
  }
}`,
      hints: [
        'The child is trying to call the parent method but uses the wrong syntax.',
        'You need to reference the parent class version of log.',
        'Change `log(msg)` to `super.log(msg)`.',
      ],
      concepts: ['super', 'method overriding', 'ReferenceError'],
    },
    {
      id: 'js-inh-15a',
      title: 'Constructor return override',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fix the singleton pattern that breaks inheritance.',
      skeleton: `class Singleton {
  static instance = null;
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}

class AppConfig extends Singleton {
  constructor(env) {
    super();
    this.env = env;
  }
}

const a = new AppConfig('prod');
const b = new AppConfig('dev');
// b.env is 'dev' but we want b === a and b.env === 'prod'`,
      solution: `class Singleton {
  static instance = null;
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}

class AppConfig extends Singleton {
  constructor(env) {
    super();
    if (this === Singleton.instance && this.env !== undefined) {
      return this;
    }
    this.env = env;
  }
}

const a = new AppConfig('prod');
const b = new AppConfig('dev');
// b === a and b.env === 'prod'`,
      hints: [
        'When super() returns an existing instance, the child constructor still runs.',
        'After super(), check if this already has env set.',
        'Guard the property assignment: only set env if it has not been set yet.',
      ],
      concepts: ['constructor return', 'singleton', 'inheritance'],
    },

    // ---- predict-output (3) ----
    {
      id: 'js-inh-16b',
      title: 'instanceof chain',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output of instanceof checks across a hierarchy.',
      skeleton: `class A {}
class B extends A {}
class C extends B {}

const c = new C();
console.log(c instanceof C);
console.log(c instanceof B);
console.log(c instanceof A);
console.log(c instanceof Object);`,
      solution: `class A {}
class B extends A {}
class C extends B {}

const c = new C();
console.log(c instanceof C);
console.log(c instanceof B);
console.log(c instanceof A);
console.log(c instanceof Object);`,
      expectedOutput: `true
true
true
true`,
      hints: [
        'instanceof walks the entire prototype chain.',
        'C extends B extends A, so c is an instance of all three.',
        'All objects are instances of Object.',
      ],
      concepts: ['instanceof', 'prototype chain'],
    },
    {
      id: 'js-inh-17i',
      title: 'Method resolution order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict which greet() method is called.',
      skeleton: `class Parent {
  greet() { return 'Hello from Parent'; }
}

class Child extends Parent {
  greet() { return 'Hello from Child'; }
}

class GrandChild extends Child {}

const g = new GrandChild();
console.log(g.greet());`,
      solution: `class Parent {
  greet() { return 'Hello from Parent'; }
}

class Child extends Parent {
  greet() { return 'Hello from Child'; }
}

class GrandChild extends Child {}

const g = new GrandChild();
console.log(g.greet());`,
      expectedOutput: `Hello from Child`,
      hints: [
        'GrandChild does not define its own greet().',
        'JavaScript looks up the prototype chain for the nearest definition.',
        'Child.prototype.greet is found first.',
      ],
      concepts: ['method resolution', 'prototype chain', 'override'],
    },
    {
      id: 'js-inh-18a',
      title: 'Static vs instance inheritance',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict the output involving static method inheritance and this.',
      skeleton: `class Base {
  static create() {
    return new this();
  }
  identify() {
    return this.constructor.name;
  }
}

class Derived extends Base {}

const obj = Derived.create();
console.log(obj.identify());
console.log(obj instanceof Derived);
console.log(obj instanceof Base);`,
      solution: `class Base {
  static create() {
    return new this();
  }
  identify() {
    return this.constructor.name;
  }
}

class Derived extends Base {}

const obj = Derived.create();
console.log(obj.identify());
console.log(obj instanceof Derived);
console.log(obj instanceof Base);`,
      expectedOutput: `Derived
true
true`,
      hints: [
        'In a static method, `this` refers to the class it was called on.',
        'Derived.create() calls new Derived().',
        'constructor.name returns the class name.',
      ],
      concepts: ['static', 'this in static methods', 'instanceof'],
    },

    // ---- refactor (2) ----
    {
      id: 'js-inh-19i',
      title: 'Replace repeated code with inheritance',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Extract shared logic into a base class.',
      skeleton: `class Dog {
  constructor(name) {
    this.name = name;
    this.alive = true;
  }
  eat(food) { return this.name + ' eats ' + food; }
  speak() { return 'woof'; }
}

class Cat {
  constructor(name) {
    this.name = name;
    this.alive = true;
  }
  eat(food) { return this.name + ' eats ' + food; }
  speak() { return 'meow'; }
}`,
      solution: `class Animal {
  constructor(name) {
    this.name = name;
    this.alive = true;
  }
  eat(food) {
    return this.name + ' eats ' + food;
  }
}

class Dog extends Animal {
  speak() { return 'woof'; }
}

class Cat extends Animal {
  speak() { return 'meow'; }
}`,
      hints: [
        'Both classes share the same constructor and eat method.',
        'Extract the shared parts into a base class.',
        'Each subclass only defines its unique speak() method.',
      ],
      concepts: ['DRY', 'refactor', 'base class', 'extends'],
    },
    {
      id: 'js-inh-20a',
      title: 'Flatten deep hierarchy to composition',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Replace a fragile 4-level hierarchy with composition.',
      skeleton: `class Entity {
  constructor(id) { this.id = id; }
}

class MovableEntity extends Entity {
  move(x, y) { this.x = x; this.y = y; return this; }
}

class DamageableMovableEntity extends MovableEntity {
  constructor(id, hp) { super(id); this.hp = hp; }
  takeDamage(n) { this.hp -= n; return this; }
}

class Player extends DamageableMovableEntity {
  constructor(id, hp, name) { super(id, hp); this.name = name; }
}`,
      solution: `function withMovement(obj) {
  obj.move = function (x, y) {
    this.x = x;
    this.y = y;
    return this;
  };
  return obj;
}

function withHealth(obj, hp) {
  obj.hp = hp;
  obj.takeDamage = function (n) {
    this.hp -= n;
    return this;
  };
  return obj;
}

function createPlayer(id, hp, name) {
  let player = { id, name };
  withMovement(player);
  withHealth(player, hp);
  return player;
}`,
      hints: [
        'Deep hierarchies are fragile - extract behaviours into functions.',
        'Create helper functions that add capabilities to plain objects.',
        'Compose the player by applying each behaviour function.',
      ],
      concepts: ['composition', 'factory function', 'mixin', 'refactor'],
    },
  ],
};
