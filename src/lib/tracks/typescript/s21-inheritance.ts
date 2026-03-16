import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-inherit',
  title: '21. Inheritance & Polymorphism',
  explanation: `## Inheritance & Polymorphism

Inheritance lets a class **extend** another class, inheriting its properties and methods. The child class can then **override** methods to provide specialized behavior -- this is **polymorphism**.

\\\`\\\`\\\`typescript
class Animal {
  constructor(public name: string) {}

  speak(): string {
    return \\\`\\\${this.name} makes a sound.\\\`;
  }
}

class Dog extends Animal {
  override speak(): string {
    return \\\`\\\${this.name} barks!\\\`;
  }
}

const pet: Animal = new Dog('Rex'); // upcasting
console.log(pet.speak()); // "Rex barks!" -- polymorphism
\\\`\\\`\\\`

Key concepts:
- **extends** creates a subclass
- **super()** calls the parent constructor
- **override** explicitly marks method overrides
- **protected** members are accessible in subclasses but not outside
- **Liskov Substitution**: subtypes must be usable wherever the parent type is expected
- Prefer **composition over inheritance** for flexible designs`,
  exercises: [
    {
      id: 'ts-inherit-1',
      title: 'Basic extends',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the class declaration so Dog extends Animal.',
      skeleton: `class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Dog __BLANK__ Animal {
  breed: string;
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
}`,
      solution: `class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  breed: string;
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
}`,
      hints: [
        'Which keyword creates a subclass relationship?',
        'The keyword that means "inherits from" in TypeScript is extends.',
        'Replace __BLANK__ with extends.',
      ],
      concepts: ['extends keyword', 'class inheritance'],
    },
    {
      id: 'ts-inherit-2',
      title: 'Calling super()',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the blank to call the parent constructor with the name argument.',
      skeleton: `class Vehicle {
  constructor(public name: string) {}
}

class Car extends Vehicle {
  constructor(name: string, public doors: number) {
    __BLANK__;
  }
}`,
      solution: `class Vehicle {
  constructor(public name: string) {}
}

class Car extends Vehicle {
  constructor(name: string, public doors: number) {
    super(name);
  }
}`,
      hints: [
        'The parent constructor must be called before using "this".',
        'Use super() to invoke the parent class constructor.',
        'Replace __BLANK__ with super(name).',
      ],
      concepts: ['super() constructor call', 'constructor inheritance'],
    },
    {
      id: 'ts-inherit-3',
      title: 'Method override',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Add the override keyword to the greet method in the child class.',
      skeleton: `class Person {
  greet(): string {
    return 'Hello!';
  }
}

class FriendlyPerson extends Person {
  __BLANK__ greet(): string {
    return 'Hey there, friend!';
  }
}`,
      solution: `class Person {
  greet(): string {
    return 'Hello!';
  }
}

class FriendlyPerson extends Person {
  override greet(): string {
    return 'Hey there, friend!';
  }
}`,
      hints: [
        'TypeScript has a keyword that explicitly marks a method as overriding a parent method.',
        'The keyword is override -- it helps catch typos in method names.',
        'Replace __BLANK__ with override.',
      ],
      concepts: ['method overriding', 'override keyword'],
    },
    {
      id: 'ts-inherit-4',
      title: 'Protected members',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the access modifier so the field is accessible in subclasses but not outside.',
      skeleton: `class Base {
  __BLANK__ secret: string = 'hidden';
}

class Child extends Base {
  reveal(): string {
    return this.secret; // should work
  }
}

const b = new Base();
// b.secret; // should NOT work`,
      solution: `class Base {
  protected secret: string = 'hidden';
}

class Child extends Base {
  reveal(): string {
    return this.secret; // should work
  }
}

const b = new Base();
// b.secret; // should NOT work`,
      hints: [
        'There are three access modifiers: public, private, protected.',
        'protected allows access within the class and its subclasses.',
        'Replace __BLANK__ with protected.',
      ],
      concepts: ['protected members', 'access modifiers'],
    },
    {
      id: 'ts-inherit-5',
      title: 'Predict polymorphic output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'What does this code log? Write the exact console output.',
      skeleton: `class Shape {
  area(): number { return 0; }
}

class Circle extends Shape {
  constructor(public radius: number) { super(); }
  override area(): number { return Math.round(Math.PI * this.radius ** 2); }
}

class Square extends Shape {
  constructor(public side: number) { super(); }
  override area(): number { return this.side ** 2; }
}

const shapes: Shape[] = [new Circle(1), new Square(3)];
shapes.forEach(s => console.log(s.area()));`,
      solution: `3
9`,
      hints: [
        'Each shape calls its own overridden area() method.',
        'Circle area: Math.round(PI * 1^2) = Math.round(3.14159...) = 3. Square area: 3^2 = 9.',
        'Output is 3 then 9, each on its own line.',
      ],
      concepts: ['polymorphism', 'method overriding'],
    },
    {
      id: 'ts-inherit-6',
      title: 'Calling super methods',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Fill in the blank to call the parent describe() method from the child class.',
      skeleton: `class Product {
  constructor(public name: string) {}

  describe(): string {
    return \`Product: \${this.name}\`;
  }
}

class DiscountedProduct extends Product {
  constructor(name: string, public discount: number) {
    super(name);
  }

  override describe(): string {
    return \`\${__BLANK__} (Discount: \${this.discount}%)\`;
  }
}`,
      solution: `class Product {
  constructor(public name: string) {}

  describe(): string {
    return \`Product: \${this.name}\`;
  }
}

class DiscountedProduct extends Product {
  constructor(name: string, public discount: number) {
    super(name);
  }

  override describe(): string {
    return \`\${super.describe()} (Discount: \${this.discount}%)\`;
  }
}`,
      hints: [
        'You can call a parent method using the super keyword.',
        'super.methodName() calls the parent version of that method.',
        'Replace __BLANK__ with super.describe().',
      ],
      concepts: ['calling super methods', 'method overriding'],
    },
    {
      id: 'ts-inherit-7',
      title: 'Multi-level inheritance',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Create a three-level class hierarchy: Animal -> Mammal -> Cat. Animal has name (string). Mammal adds warmBlooded (boolean, always true). Cat adds meow() returning "Meow!".',
      skeleton: `// Write your Animal, Mammal, and Cat classes here
`,
      solution: `class Animal {
  constructor(public name: string) {}
}

class Mammal extends Animal {
  warmBlooded: boolean = true;
  constructor(name: string) {
    super(name);
  }
}

class Cat extends Mammal {
  constructor(name: string) {
    super(name);
  }

  meow(): string {
    return 'Meow!';
  }
}`,
      hints: [
        'Each class extends the one above it in the hierarchy.',
        'Animal has the constructor with name. Mammal extends Animal and adds warmBlooded = true. Cat extends Mammal.',
        'Cat extends Mammal which extends Animal. Cat adds a meow() method returning "Meow!".',
      ],
      concepts: ['multi-level inheritance', 'extends keyword'],
    },
    {
      id: 'ts-inherit-8',
      title: 'Upcasting and downcasting',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a function processAnimal that takes an Animal. If the animal is a Dog (use instanceof), call its fetch() method and return the result. Otherwise return "Just an animal".',
      skeleton: `class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  fetch(): string {
    return \`\${this.name} fetches the ball!\`;
  }
}

// Write processAnimal here
`,
      solution: `class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  fetch(): string {
    return \`\${this.name} fetches the ball!\`;
  }
}

function processAnimal(animal: Animal): string {
  if (animal instanceof Dog) {
    return animal.fetch();
  }
  return 'Just an animal';
}`,
      hints: [
        'Use instanceof to check if the animal is a Dog.',
        'Inside the instanceof block, TypeScript automatically narrows the type to Dog.',
        'if (animal instanceof Dog) { return animal.fetch(); } else return "Just an animal".',
      ],
      concepts: ['upcasting/downcasting', 'instanceof in polymorphism'],
    },
    {
      id: 'ts-inherit-9',
      title: 'Fix constructor inheritance bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This code has a bug -- the child class constructor does not call super(). Fix it.',
      skeleton: `class Logger {
  logs: string[] = [];
  constructor(public prefix: string) {}

  log(msg: string): void {
    this.logs.push(\`[\${this.prefix}] \${msg}\`);
  }
}

class TimestampLogger extends Logger {
  constructor(prefix: string) {
    // Bug: missing super call
    this.prefix = prefix;
  }

  override log(msg: string): void {
    const time = new Date().toISOString();
    super.log(\`\${time} - \${msg}\`);
  }
}`,
      solution: `class Logger {
  logs: string[] = [];
  constructor(public prefix: string) {}

  log(msg: string): void {
    this.logs.push(\`[\${this.prefix}] \${msg}\`);
  }
}

class TimestampLogger extends Logger {
  constructor(prefix: string) {
    super(prefix);
  }

  override log(msg: string): void {
    const time = new Date().toISOString();
    super.log(\`\${time} - \${msg}\`);
  }
}`,
      hints: [
        'In a subclass constructor, super() must be called before accessing "this".',
        'Replace the direct assignment with a super(prefix) call.',
        'Remove this.prefix = prefix and add super(prefix) as the first line of the constructor.',
      ],
      concepts: ['super() constructor call', 'constructor inheritance'],
    },
    {
      id: 'ts-inherit-10',
      title: 'Interface inheritance',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Define an interface Serializable with a serialize(): string method. Then define a class User that implements Serializable. User has name and email, and serialize returns JSON.',
      skeleton: `// Define Serializable interface and User class
`,
      solution: `interface Serializable {
  serialize(): string;
}

class User implements Serializable {
  constructor(public name: string, public email: string) {}

  serialize(): string {
    return JSON.stringify({ name: this.name, email: this.email });
  }
}`,
      hints: [
        'Use the interface keyword to define Serializable with a serialize method.',
        'A class uses implements to satisfy an interface contract.',
        'class User implements Serializable { ... serialize(): string { return JSON.stringify({...}); } }',
      ],
      concepts: ['interface inheritance', 'polymorphism'],
    },
    {
      id: 'ts-inherit-11',
      title: 'Predict multi-level output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What does this code log?',
      skeleton: `class A {
  greet(): string { return 'A'; }
}

class B extends A {
  override greet(): string { return 'B' + super.greet(); }
}

class C extends B {
  override greet(): string { return 'C' + super.greet(); }
}

console.log(new C().greet());`,
      solution: `CBA`,
      hints: [
        'C.greet() calls super.greet() which is B.greet().',
        'B.greet() returns "B" + super.greet() which is A.greet() returning "A".',
        'So C.greet() = "C" + B.greet() = "C" + "B" + "A" = "CBA".',
      ],
      concepts: ['multi-level inheritance', 'calling super methods'],
    },
    {
      id: 'ts-inherit-12',
      title: 'Override vs overload',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fill in the blank to provide overload signatures for the process method, then implement it.',
      skeleton: `class Processor {
  process(input: string): string;
  process(input: number): number;
  process(input: __BLANK__): string | number {
    if (typeof input === 'string') return input.toUpperCase();
    return input * 2;
  }
}`,
      solution: `class Processor {
  process(input: string): string;
  process(input: number): number;
  process(input: string | number): string | number {
    if (typeof input === 'string') return input.toUpperCase();
    return input * 2;
  }
}`,
      hints: [
        'The implementation signature must be compatible with all overload signatures.',
        'It needs to accept both string and number.',
        'Replace __BLANK__ with string | number.',
      ],
      concepts: ['override vs overload', 'method overriding'],
    },
    {
      id: 'ts-inherit-13',
      title: 'Composition vs inheritance',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Refactor from inheritance to composition. Instead of FlyingCar extending Car and having fly(), make FlyingCar contain a Car and a FlightSystem.',
      skeleton: `class Car {
  drive(): string { return 'Driving'; }
}

class FlyingCar extends Car {
  fly(): string { return 'Flying'; }
}`,
      solution: `class Car {
  drive(): string { return 'Driving'; }
}

class FlightSystem {
  fly(): string { return 'Flying'; }
}

class FlyingCar {
  private car = new Car();
  private flight = new FlightSystem();

  drive(): string { return this.car.drive(); }
  fly(): string { return this.flight.fly(); }
}`,
      hints: [
        'Instead of extending Car, FlyingCar should contain a Car instance.',
        'Create a separate FlightSystem class. FlyingCar delegates to both.',
        'FlyingCar has private car and flight fields, and delegates drive() and fly() to them.',
      ],
      concepts: ['composition vs inheritance', 'class hierarchy design'],
    },
    {
      id: 'ts-inherit-14',
      title: 'Abstract in inheritance',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Create an abstract class Shape with an abstract area(): number method. Extend it with Rectangle (width, height) and Triangle (base, height) that implement area().',
      skeleton: `// Write abstract Shape, Rectangle, and Triangle
`,
      solution: `abstract class Shape {
  abstract area(): number;
}

class Rectangle extends Shape {
  constructor(public width: number, public height: number) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }
}

class Triangle extends Shape {
  constructor(public base: number, public height: number) {
    super();
  }

  area(): number {
    return (this.base * this.height) / 2;
  }
}`,
      hints: [
        'Use the abstract keyword before both the class and the method.',
        'abstract class Shape { abstract area(): number; }. Then Rectangle and Triangle extend Shape.',
        'Rectangle.area = width * height. Triangle.area = (base * height) / 2.',
      ],
      concepts: ['abstract in inheritance', 'polymorphism'],
    },
    {
      id: 'ts-inherit-15',
      title: 'Liskov substitution',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'The Square class violates Liskov substitution by overriding setWidth and setHeight to always keep them equal. Refactor so Square has a single setSize method instead of breaking the parent contract.',
      skeleton: `class Rectangle2 {
  constructor(protected w: number, protected h: number) {}

  setWidth(w: number): void { this.w = w; }
  setHeight(h: number): void { this.h = h; }
  getArea(): number { return this.w * this.h; }
}

class Square extends Rectangle2 {
  constructor(size: number) { super(size, size); }

  // Violates LSP: changes behavior of inherited methods
  override setWidth(w: number): void { this.w = w; this.h = w; }
  override setHeight(h: number): void { this.w = h; this.h = h; }
}`,
      solution: `class Rectangle2 {
  constructor(protected w: number, protected h: number) {}

  setWidth(w: number): void { this.w = w; }
  setHeight(h: number): void { this.h = h; }
  getArea(): number { return this.w * this.h; }
}

class Square {
  private size: number;
  constructor(size: number) { this.size = size; }

  setSize(s: number): void { this.size = s; }
  getArea(): number { return this.size * this.size; }
}`,
      hints: [
        'Liskov substitution means a subtype should be usable wherever the parent is expected without surprises.',
        'Square should not extend Rectangle if it cannot honor setWidth/setHeight independently.',
        'Make Square a standalone class with its own setSize method instead of overriding parent methods.',
      ],
      concepts: ['Liskov substitution', 'class hierarchy design'],
    },
    {
      id: 'ts-inherit-16',
      title: 'Mixin pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a Timestamped mixin that adds a createdAt: Date property to any class. Use the mixin pattern: a function that takes a base class constructor and returns a new class extending it.',
      skeleton: `// Write the Timestamped mixin function
// Usage: class User extends Timestamped(Base) {}
`,
      solution: `type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    createdAt = new Date();
  };
}

class BaseUser {
  constructor(public name: string) {}
}

class User extends Timestamped(BaseUser) {}`,
      hints: [
        'A mixin is a function that takes a constructor and returns a new class extending it.',
        'Define a Constructor type: type Constructor<T = {}> = new (...args: any[]) => T.',
        'function Timestamped<TBase extends Constructor>(Base: TBase) { return class extends Base { createdAt = new Date(); }; }',
      ],
      concepts: ['mixin pattern', 'constructor inheritance'],
    },
    {
      id: 'ts-inherit-17',
      title: 'Factory with inheritance',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a factory function createNotification that takes a type ("email" | "sms" | "push") and returns the appropriate subclass instance. All extend a Notification base class with abstract send(): string.',
      skeleton: `// Write the Notification hierarchy and factory function
`,
      solution: `abstract class Notification {
  abstract send(): string;
}

class EmailNotification extends Notification {
  send(): string { return 'Sending email'; }
}

class SmsNotification extends Notification {
  send(): string { return 'Sending SMS'; }
}

class PushNotification extends Notification {
  send(): string { return 'Sending push notification'; }
}

function createNotification(type: 'email' | 'sms' | 'push'): Notification {
  switch (type) {
    case 'email': return new EmailNotification();
    case 'sms': return new SmsNotification();
    case 'push': return new PushNotification();
  }
}`,
      hints: [
        'Create an abstract Notification with abstract send(). Then three concrete subclasses.',
        'The factory function uses a switch on the type string to instantiate the right class.',
        'switch (type) { case "email": return new EmailNotification(); ... }',
      ],
      concepts: ['factory with inheritance', 'polymorphism', 'abstract in inheritance'],
    },
    {
      id: 'ts-inherit-18',
      title: 'Fix missing override',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'This code has a typo in the method name so it does not actually override the parent. Fix the method name so it properly overrides toString.',
      skeleton: `class Config {
  constructor(public settings: Record<string, string>) {}

  toString(): string {
    return JSON.stringify(this.settings);
  }
}

class AppConfig extends Config {
  override tostring(): string {  // Bug: wrong case
    return \`AppConfig: \${JSON.stringify(this.settings)}\`;
  }
}`,
      solution: `class Config {
  constructor(public settings: Record<string, string>) {}

  toString(): string {
    return JSON.stringify(this.settings);
  }
}

class AppConfig extends Config {
  override toString(): string {
    return \`AppConfig: \${JSON.stringify(this.settings)}\`;
  }
}`,
      hints: [
        'Look carefully at the method name in the child class.',
        'JavaScript/TypeScript method names are case-sensitive. "tostring" is not "toString".',
        'Change tostring to toString to properly override the parent method.',
      ],
      concepts: ['override keyword', 'method overriding'],
    },
    {
      id: 'ts-inherit-19',
      title: 'Predict instanceof',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What does this code log?',
      skeleton: `class Vehicle2 {}
class Car2 extends Vehicle2 {}
class ElectricCar extends Car2 {}

const ec = new ElectricCar();
console.log(ec instanceof ElectricCar);
console.log(ec instanceof Car2);
console.log(ec instanceof Vehicle2);`,
      solution: `true
true
true`,
      hints: [
        'instanceof checks the entire prototype chain.',
        'An ElectricCar is also a Car2 and a Vehicle2.',
        'All three checks return true because instanceof walks up the chain.',
      ],
      concepts: ['instanceof in polymorphism', 'multi-level inheritance'],
    },
    {
      id: 'ts-inherit-20',
      title: 'Practical inheritance refactor',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'This code duplicates logic across FileLogger and ConsoleLogger. Refactor to use a base Logger class with a shared format() method and abstract write() method.',
      skeleton: `class FileLogger {
  log(level: string, msg: string): void {
    const formatted = \`[\${level.toUpperCase()}] \${msg}\`;
    // pretend: write to file
    console.log('FILE: ' + formatted);
  }
}

class ConsoleLogger {
  log(level: string, msg: string): void {
    const formatted = \`[\${level.toUpperCase()}] \${msg}\`;
    console.log(formatted);
  }
}`,
      solution: `abstract class Logger {
  protected format(level: string, msg: string): string {
    return \`[\${level.toUpperCase()}] \${msg}\`;
  }

  log(level: string, msg: string): void {
    const formatted = this.format(level, msg);
    this.write(formatted);
  }

  protected abstract write(formatted: string): void;
}

class FileLogger extends Logger {
  protected write(formatted: string): void {
    console.log('FILE: ' + formatted);
  }
}

class ConsoleLogger extends Logger {
  protected write(formatted: string): void {
    console.log(formatted);
  }
}`,
      hints: [
        'Both classes share the same formatting logic. Extract it into a base class.',
        'The base class can have a concrete format() and log() method, with an abstract write().',
        'abstract class Logger { format(), log() concrete; abstract write(). FileLogger and ConsoleLogger only implement write().',
      ],
      concepts: ['practical inheritance patterns', 'composition vs inheritance', 'class hierarchy design'],
    },
  ],
};
