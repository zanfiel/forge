import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-prototypes',
  title: '17. Prototypes',
  explanation: `## Prototypes

Every JavaScript object has an internal \`[[Prototype]]\` slot that links to another object (or \`null\`). This chain is the foundation of inheritance.

### Accessing the Prototype
\`\`\`js
Object.getPrototypeOf(obj)   // recommended
obj.__proto__                // legacy, avoid in production
\`\`\`

### Prototype Chain
When you access a property, the engine walks the chain:
\`\`\`
obj -> obj.[[Prototype]] -> ... -> Object.prototype -> null
\`\`\`

### Object.create()
Creates an object with a specified prototype:
\`\`\`js
const proto = { greet() { return 'hi'; } };
const child = Object.create(proto);
child.greet(); // 'hi' -- found on prototype
\`\`\`

### Own vs Inherited
- \`obj.hasOwnProperty(key)\` / \`Object.hasOwn(obj, key)\` -- own only
- \`key in obj\` -- includes inherited

### Constructor.prototype
Functions have a \`.prototype\` property used when called with \`new\`. This is NOT the function's own prototype -- it becomes the \`[[Prototype]]\` of instances.

### Property Shadowing
Setting a property on an object creates an own property that shadows the prototype's version.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-proto-1b',
      title: 'Get prototype of an object',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the method to retrieve an object\'s prototype.',
      skeleton: `const arr = [1, 2, 3];
const proto = Object.__BLANK__(arr);
console.log(proto === Array.prototype); // true`,
      solution: `const arr = [1, 2, 3];
const proto = Object.getPrototypeOf(arr);
console.log(proto === Array.prototype); // true`,
      hints: [
        'There is a standard method on Object for this.',
        'It takes the object as an argument.',
        'The method is `getPrototypeOf`.',
      ],
      concepts: ['Object.getPrototypeOf', 'prototype'],
    },
    {
      id: 'js-proto-2b',
      title: 'Create object with prototype',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Create an object whose prototype is the given proto object.',
      skeleton: `const proto = { greet() { return 'hello'; } };
const obj = Object.__BLANK__(proto);
console.log(obj.greet()); // 'hello'`,
      solution: `const proto = { greet() { return 'hello'; } };
const obj = Object.create(proto);
console.log(obj.greet()); // 'hello'`,
      hints: [
        'This Object method creates a new object with a specified prototype.',
        'It takes the prototype as its first argument.',
        'The method is `create`.',
      ],
      concepts: ['Object.create', 'prototype'],
    },
    {
      id: 'js-proto-3b',
      title: 'Check own property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Use the modern method to check if a property is an own property.',
      skeleton: `const obj = { a: 1 };
const proto = Object.create(obj);
proto.b = 2;

console.log(Object.__BLANK__(proto, 'b')); // true
console.log(Object.__BLANK__(proto, 'a')); // false`,
      solution: `const obj = { a: 1 };
const proto = Object.create(obj);
proto.b = 2;

console.log(Object.hasOwn(proto, 'b')); // true
console.log(Object.hasOwn(proto, 'a')); // false`,
      hints: [
        'This static method checks if a property belongs directly to the object.',
        'It replaced hasOwnProperty for safety.',
        'The method is `hasOwn`.',
      ],
      concepts: ['Object.hasOwn', 'own property'],
    },
    {
      id: 'js-proto-4i',
      title: 'Constructor prototype link',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Verify that an instance\'s prototype is the constructor\'s prototype property.',
      skeleton: `function Dog(name) { this.name = name; }
Dog.prototype.speak = function () { return 'woof'; };

const d = new Dog('Rex');
console.log(Object.getPrototypeOf(d) === Dog.__BLANK__); // true`,
      solution: `function Dog(name) { this.name = name; }
Dog.prototype.speak = function () { return 'woof'; };

const d = new Dog('Rex');
console.log(Object.getPrototypeOf(d) === Dog.prototype); // true`,
      hints: [
        'Functions have a special property used with new.',
        'Instances link to this property on the constructor.',
        'The property is `prototype`.',
      ],
      concepts: ['constructor', 'prototype', 'new'],
    },
    {
      id: 'js-proto-5i',
      title: 'Prototype chain end',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in what terminates the prototype chain.',
      skeleton: `const obj = {};
const objProto = Object.getPrototypeOf(obj); // Object.prototype
const end = Object.getPrototypeOf(objProto);
console.log(end === __BLANK__); // true`,
      solution: `const obj = {};
const objProto = Object.getPrototypeOf(obj); // Object.prototype
const end = Object.getPrototypeOf(objProto);
console.log(end === null); // true`,
      hints: [
        'The prototype chain must end somewhere.',
        'Object.prototype is the last object in the chain.',
        'Its prototype is `null`.',
      ],
      concepts: ['prototype chain', 'null', 'Object.prototype'],
    },
    {
      id: 'js-proto-6i',
      title: 'in operator vs hasOwn',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Use the operator that checks both own and inherited properties.',
      skeleton: `const parent = { x: 1 };
const child = Object.create(parent);
child.y = 2;

console.log('x' __BLANK__ child); // true (inherited)
console.log('y' __BLANK__ child); // true (own)`,
      solution: `const parent = { x: 1 };
const child = Object.create(parent);
child.y = 2;

console.log('x' in child); // true (inherited)
console.log('y' in child); // true (own)`,
      hints: [
        'This operator checks for property existence anywhere in the chain.',
        'It differs from hasOwn which only checks own properties.',
        'The operator is `in`.',
      ],
      concepts: ['in operator', 'property lookup', 'prototype chain'],
    },

    // ---- write-function (6) ----
    {
      id: 'js-proto-7b',
      title: 'Prototypal inheritance with Object.create',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Create a prototypal inheritance setup without classes.',
      skeleton: `// Create an object 'animal' with a method speak() returning 'generic sound'
// Create 'dog' that inherits from animal using Object.create
// Add a method bark() to dog returning 'woof'
// dog.speak() should work via prototype chain
`,
      solution: `const animal = {
  speak() {
    return 'generic sound';
  },
};

const dog = Object.create(animal);

dog.bark = function () {
  return 'woof';
};`,
      hints: [
        'Start with a plain object for the base.',
        'Use Object.create(animal) to set the prototype.',
        'Add methods directly to the new object.',
      ],
      concepts: ['Object.create', 'prototypal inheritance'],
    },
    {
      id: 'js-proto-8b',
      title: 'Constructor function with prototype',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a constructor function with a shared method on its prototype.',
      skeleton: `// Write a constructor function Counter that initialises count to 0
// Add an increment() method to Counter.prototype that increases count by 1
// Add a getCount() method to Counter.prototype that returns count
`,
      solution: `function Counter() {
  this.count = 0;
}

Counter.prototype.increment = function () {
  this.count += 1;
};

Counter.prototype.getCount = function () {
  return this.count;
};`,
      hints: [
        'Constructor functions use `this` to set instance properties.',
        'Shared methods go on the prototype, not in the constructor.',
        'Assign functions to Constructor.prototype.methodName.',
      ],
      concepts: ['constructor function', 'prototype', 'shared methods'],
    },
    {
      id: 'js-proto-9i',
      title: 'Walk the prototype chain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that returns an array of all prototypes in the chain.',
      skeleton: `// Write function getPrototypeChain(obj) that returns an array of all
// prototypes from obj up to (but not including) null.
// Example: getPrototypeChain([]) returns [Array.prototype, Object.prototype]
`,
      solution: `function getPrototypeChain(obj) {
  const chain = [];
  let current = Object.getPrototypeOf(obj);
  while (current !== null) {
    chain.push(current);
    current = Object.getPrototypeOf(current);
  }
  return chain;
}`,
      hints: [
        'Start from Object.getPrototypeOf(obj).',
        'Loop until you hit null.',
        'Push each prototype into the result array.',
      ],
      concepts: ['Object.getPrototypeOf', 'prototype chain', 'iteration'],
    },
    {
      id: 'js-proto-10i',
      title: 'Property lookup function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that finds which object in the chain owns a property.',
      skeleton: `// Write function findOwner(obj, prop) that walks the prototype chain
// and returns the first object that has prop as an own property.
// Return null if not found.
`,
      solution: `function findOwner(obj, prop) {
  let current = obj;
  while (current !== null) {
    if (Object.hasOwn(current, prop)) {
      return current;
    }
    current = Object.getPrototypeOf(current);
  }
  return null;
}`,
      hints: [
        'Start from obj itself, not its prototype.',
        'Use Object.hasOwn() to check own properties.',
        'Walk up with Object.getPrototypeOf() until null.',
      ],
      concepts: ['Object.hasOwn', 'prototype chain', 'property lookup'],
    },
    {
      id: 'js-proto-11a',
      title: 'Inherit with correct constructor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Set up prototypal inheritance between two constructor functions preserving constructor references.',
      skeleton: `// Given:
function Shape(name) { this.name = name; }
Shape.prototype.toString = function () { return 'Shape: ' + this.name; };

// Write constructor function Circle(name, radius)
// Set up prototype chain so Circle instances inherit from Shape
// Ensure Circle.prototype.constructor points back to Circle
// Add area() method to Circle.prototype
`,
      solution: `function Shape(name) { this.name = name; }
Shape.prototype.toString = function () { return 'Shape: ' + this.name; };

function Circle(name, radius) {
  Shape.call(this, name);
  this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.area = function () {
  return Math.PI * this.radius * this.radius;
};`,
      hints: [
        'Call Shape.call(this, name) inside Circle to initialise parent state.',
        'Set Circle.prototype to Object.create(Shape.prototype).',
        'Restore the constructor property after replacing the prototype.',
      ],
      concepts: ['constructor function', 'Object.create', 'prototype chain', 'constructor property'],
    },
    {
      id: 'js-proto-12a',
      title: 'Safe property check mixin',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that adds property checking methods to a prototype safely.',
      skeleton: `// Write function addPropertyHelpers(proto) that adds:
// - ownKeys(): returns array of own enumerable property names
// - hasAll(...keys): returns true if object has all listed own properties
// - inherited(key): returns true if key exists but is NOT own
// Use Object.defineProperty so helpers are non-enumerable
`,
      solution: `function addPropertyHelpers(proto) {
  Object.defineProperty(proto, 'ownKeys', {
    value: function () {
      return Object.keys(this);
    },
    enumerable: false,
    writable: true,
    configurable: true,
  });

  Object.defineProperty(proto, 'hasAll', {
    value: function (...keys) {
      return keys.every((k) => Object.hasOwn(this, k));
    },
    enumerable: false,
    writable: true,
    configurable: true,
  });

  Object.defineProperty(proto, 'inherited', {
    value: function (key) {
      return (key in this) && !Object.hasOwn(this, key);
    },
    enumerable: false,
    writable: true,
    configurable: true,
  });
}`,
      hints: [
        'Non-enumerable properties do not show in for...in or Object.keys.',
        'Use Object.defineProperty with enumerable: false.',
        'The inherited check is: exists via in but not hasOwn.',
      ],
      concepts: ['Object.defineProperty', 'enumerable', 'Object.hasOwn', 'in operator'],
    },

    // ---- fix-bug (3) ----
    {
      id: 'js-proto-13b',
      title: 'Overwritten prototype',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fix the prototype setup that loses the speak method.',
      skeleton: `function Animal(name) { this.name = name; }
Animal.prototype.speak = function () { return this.name + ' speaks'; };

// This overwrites the entire prototype, losing speak()
Animal.prototype = {
  eat(food) { return this.name + ' eats ' + food; },
};

const a = new Animal('Cat');
console.log(a.eat('fish'));   // works
console.log(a.speak());      // TypeError!`,
      solution: `function Animal(name) { this.name = name; }
Animal.prototype.speak = function () { return this.name + ' speaks'; };

// Add to existing prototype instead of replacing it
Animal.prototype.eat = function (food) {
  return this.name + ' eats ' + food;
};

const a = new Animal('Cat');
console.log(a.eat('fish'));
console.log(a.speak());`,
      hints: [
        'Assigning a new object to .prototype replaces the entire prototype.',
        'All previously added methods are lost.',
        'Add methods individually instead of replacing the whole prototype.',
      ],
      concepts: ['prototype', 'method assignment'],
    },
    {
      id: 'js-proto-14i',
      title: 'Shared mutable state on prototype',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the bug where all instances share the same array.',
      skeleton: `function TodoList(owner) {
  this.owner = owner;
}

TodoList.prototype.items = [];

TodoList.prototype.add = function (item) {
  this.items.push(item);
};

const a = new TodoList('Alice');
const b = new TodoList('Bob');
a.add('buy milk');
console.log(b.items); // ['buy milk'] -- Bug! Bob sees Alice's items`,
      solution: `function TodoList(owner) {
  this.owner = owner;
  this.items = [];
}

TodoList.prototype.add = function (item) {
  this.items.push(item);
};

const a = new TodoList('Alice');
const b = new TodoList('Bob');
a.add('buy milk');
console.log(b.items); // [] -- Fixed! Each has own array`,
      hints: [
        'Arrays on the prototype are shared between all instances.',
        'Mutating a shared array affects every instance.',
        'Initialise the array in the constructor so each instance gets its own.',
      ],
      concepts: ['prototype', 'shared state', 'instance property'],
    },
    {
      id: 'js-proto-15a',
      title: 'Lost constructor after inheritance',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fix the constructor property after setting up inheritance.',
      skeleton: `function Vehicle(type) { this.type = type; }
Vehicle.prototype.describe = function () { return 'Vehicle: ' + this.type; };

function Car(make) {
  Vehicle.call(this, 'car');
  this.make = make;
}

Car.prototype = Object.create(Vehicle.prototype);
// Bug: Car.prototype.constructor is now Vehicle, not Car

const c = new Car('Toyota');
console.log(c.constructor === Car);     // false -- should be true
console.log(c.constructor === Vehicle); // true -- wrong!`,
      solution: `function Vehicle(type) { this.type = type; }
Vehicle.prototype.describe = function () { return 'Vehicle: ' + this.type; };

function Car(make) {
  Vehicle.call(this, 'car');
  this.make = make;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

const c = new Car('Toyota');
console.log(c.constructor === Car);     // true
console.log(c.constructor === Vehicle); // false`,
      hints: [
        'Object.create replaces the prototype object entirely.',
        'The new prototype inherits constructor from Vehicle.prototype.',
        'Manually set Car.prototype.constructor = Car after the assignment.',
      ],
      concepts: ['constructor property', 'Object.create', 'prototype chain'],
    },

    // ---- predict-output (3) ----
    {
      id: 'js-proto-16b',
      title: 'Property shadowing',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output when a property shadows the prototype.',
      skeleton: `const proto = { x: 10 };
const obj = Object.create(proto);
console.log(obj.x);
obj.x = 20;
console.log(obj.x);
console.log(proto.x);`,
      solution: `const proto = { x: 10 };
const obj = Object.create(proto);
console.log(obj.x);
obj.x = 20;
console.log(obj.x);
console.log(proto.x);`,
      expectedOutput: `10
20
10`,
      hints: [
        'Initially obj.x is found on the prototype.',
        'Setting obj.x creates an own property that shadows the prototype.',
        'The prototype value is unchanged.',
      ],
      concepts: ['property shadowing', 'prototype', 'own property'],
    },
    {
      id: 'js-proto-17i',
      title: 'hasOwn vs in',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the results of own vs inherited property checks.',
      skeleton: `const base = { inherited: true };
const obj = Object.create(base);
obj.own = true;

console.log(Object.hasOwn(obj, 'own'));
console.log(Object.hasOwn(obj, 'inherited'));
console.log('own' in obj);
console.log('inherited' in obj);`,
      solution: `const base = { inherited: true };
const obj = Object.create(base);
obj.own = true;

console.log(Object.hasOwn(obj, 'own'));
console.log(Object.hasOwn(obj, 'inherited'));
console.log('own' in obj);
console.log('inherited' in obj);`,
      expectedOutput: `true
false
true
true`,
      hints: [
        'hasOwn only checks the object itself, not the chain.',
        'The in operator checks the entire prototype chain.',
        '"inherited" is on base, not directly on obj.',
      ],
      concepts: ['Object.hasOwn', 'in operator', 'prototype chain'],
    },
    {
      id: 'js-proto-18a',
      title: 'for...in enumeration',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict which properties for...in enumerates.',
      skeleton: `const parent = { a: 1 };
Object.defineProperty(parent, 'hidden', { value: 2, enumerable: false });

const child = Object.create(parent);
child.b = 3;

const keys = [];
for (const key in child) {
  keys.push(key);
}
console.log(keys.join(','));
console.log(Object.keys(child).join(','));`,
      solution: `const parent = { a: 1 };
Object.defineProperty(parent, 'hidden', { value: 2, enumerable: false });

const child = Object.create(parent);
child.b = 3;

const keys = [];
for (const key in child) {
  keys.push(key);
}
console.log(keys.join(','));
console.log(Object.keys(child).join(','));`,
      expectedOutput: `b,a
b`,
      hints: [
        'for...in enumerates own and inherited enumerable properties.',
        'Non-enumerable properties are skipped.',
        'Object.keys only returns own enumerable properties.',
      ],
      concepts: ['for...in', 'enumerable', 'Object.keys', 'prototype chain'],
    },

    // ---- refactor (2) ----
    {
      id: 'js-proto-19i',
      title: 'Constructor to class',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Convert a constructor function with prototype methods to a class.',
      skeleton: `function Stack() {
  this.items = [];
}

Stack.prototype.push = function (item) {
  this.items.push(item);
};

Stack.prototype.pop = function () {
  return this.items.pop();
};

Stack.prototype.peek = function () {
  return this.items[this.items.length - 1];
};

Stack.prototype.size = function () {
  return this.items.length;
};`,
      solution: `class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  size() {
    return this.items.length;
  }
}`,
      hints: [
        'Classes are syntactic sugar over constructor functions.',
        'Move the constructor body into a constructor() method.',
        'Convert prototype methods to class methods.',
      ],
      concepts: ['class', 'constructor function', 'refactor', 'prototype'],
    },
    {
      id: 'js-proto-20a',
      title: '__proto__ to Object methods',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Replace deprecated __proto__ usage with standard Object methods.',
      skeleton: `const base = {
  type: 'base',
  describe() { return 'Type: ' + this.type; },
};

const child = { type: 'child' };
child.__proto__ = base;

function getAncestor(obj) {
  return obj.__proto__.__proto__;
}

function setProto(obj, proto) {
  obj.__proto__ = proto;
}

console.log(child.describe());
console.log(getAncestor(child) === Object.prototype);`,
      solution: `const base = {
  type: 'base',
  describe() { return 'Type: ' + this.type; },
};

const child = Object.create(base);
child.type = 'child';

function getAncestor(obj) {
  return Object.getPrototypeOf(Object.getPrototypeOf(obj));
}

function setProto(obj, proto) {
  Object.setPrototypeOf(obj, proto);
}

console.log(child.describe());
console.log(getAncestor(child) === Object.prototype);`,
      hints: [
        '__proto__ is deprecated. Use standard Object methods.',
        'Replace assignment with Object.create or Object.setPrototypeOf.',
        'Replace reads with Object.getPrototypeOf.',
      ],
      concepts: ['__proto__', 'Object.getPrototypeOf', 'Object.setPrototypeOf', 'Object.create'],
    },
  ],
};
