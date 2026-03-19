import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-inherit',
  title: '15. Inheritance',
  explanation: `## Inheritance in Swift

Classes can inherit from a superclass, gaining its properties and methods.

\`\`\`swift
class Vehicle {
    var speed = 0.0
    func describe() -> String {
        return "Traveling at \\(speed) mph"
    }
}

class Car: Vehicle {
    var gear = 1
    override func describe() -> String {
        return super.describe() + " in gear \\(gear)"
    }
}
\`\`\`

### Override & Super
Use \`override\` to redefine inherited methods. Call \`super\` to access the parent implementation.

### Final
Mark classes or methods as \`final\` to prevent further subclassing or overriding:
\`\`\`swift
final class Singleton { }
class Base {
    final func locked() { }
}
\`\`\``,
  exercises: [
    {
      id: 'swift-inherit-1',
      title: 'Basic Inheritance',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Create a subclass that inherits from a base class.',
      skeleton: `class Animal {
    func sound() -> String { return "..." }
}

class Dog___ Animal {
    override func sound() -> String { return "Woof" }
}`,
      solution: `class Animal {
    func sound() -> String { return "..." }
}

class Dog: Animal {
    override func sound() -> String { return "Woof" }
}`,
      hints: [
        'Use colon `:` to inherit from a superclass.',
        'Syntax: class SubClass: SuperClass.',
        'Dog inherits all Animal members.',
      ],
      concepts: ['inheritance', 'subclass'],
    },
    {
      id: 'swift-inherit-2',
      title: 'Override Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Override a method from the superclass.',
      skeleton: `class Shape {
    func area() -> Double { return 0 }
}
class Circle: Shape {
    var radius: Double
    init(radius: Double) { self.radius = radius }

    ___ func area() -> Double {
        return 3.14159 * radius * radius
    }
}`,
      solution: `class Shape {
    func area() -> Double { return 0 }
}
class Circle: Shape {
    var radius: Double
    init(radius: Double) { self.radius = radius }

    override func area() -> Double {
        return 3.14159 * radius * radius
    }
}`,
      hints: [
        'Use `override` before func to redefine.',
        'The method signature must match the parent.',
        'override is required -- Swift enforces this.',
      ],
      concepts: ['override'],
    },
    {
      id: 'swift-inherit-3',
      title: 'Call Super',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Call the superclass implementation from the override.',
      skeleton: `class Base {
    func greet() -> String { return "Hello" }
}
class Child: Base {
    override func greet() -> String {
        return ___.greet() + ", World!"
    }
}`,
      solution: `class Base {
    func greet() -> String { return "Hello" }
}
class Child: Base {
    override func greet() -> String {
        return super.greet() + ", World!"
    }
}`,
      hints: [
        'Use `super` to call the parent method.',
        'super.method() invokes the superclass version.',
        'Then add your own behavior.',
      ],
      concepts: ['super'],
    },
    {
      id: 'swift-inherit-4',
      title: 'Final Class',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Prevent a class from being subclassed.',
      skeleton: `___ class Config {
    var value: String = "default"
}`,
      solution: `final class Config {
    var value: String = "default"
}`,
      hints: [
        'Use `final` before class.',
        'Final classes cannot be inherited from.',
        'This is used for performance and design safety.',
      ],
      concepts: ['final'],
    },
    {
      id: 'swift-inherit-5',
      title: 'Override Init with Super',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Call the super initializer from a subclass init.',
      skeleton: `class Vehicle {
    var name: String
    init(name: String) { self.name = name }
}
class Car: Vehicle {
    var doors: Int
    init(name: String, doors: Int) {
        self.doors = doors
        ___.___(name: name)
    }
}`,
      solution: `class Vehicle {
    var name: String
    init(name: String) { self.name = name }
}
class Car: Vehicle {
    var doors: Int
    init(name: String, doors: Int) {
        self.doors = doors
        super.init(name: name)
    }
}`,
      hints: [
        'Initialize own properties first.',
        'Then call super.init with required parameters.',
        'This is the two-phase initialization rule.',
      ],
      concepts: ['super-init', 'two-phase-init'],
    },
    {
      id: 'swift-inherit-6',
      title: 'Final Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Prevent a specific method from being overridden.',
      skeleton: `class Account {
    ___ func id() -> String { return "ACC-001" }
    func display() -> String { return "Account" }
}`,
      solution: `class Account {
    final func id() -> String { return "ACC-001" }
    func display() -> String { return "Account" }
}`,
      hints: [
        'Use `final` before func.',
        'Final methods cannot be overridden by subclasses.',
        'display() can still be overridden.',
      ],
      concepts: ['final-method'],
    },
    {
      id: 'swift-inherit-7',
      title: 'Shape Hierarchy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a Rectangle subclass of Shape with width and height.',
      skeleton: `class Shape {
    func area() -> Double { return 0 }
}

// Write a Rectangle subclass with width, height and area override
`,
      solution: `class Shape {
    func area() -> Double { return 0 }
}

class Rectangle: Shape {
    var width: Double
    var height: Double

    init(width: Double, height: Double) {
        self.width = width
        self.height = height
    }

    override func area() -> Double {
        return width * height
    }
}`,
      hints: [
        'Inherit from Shape with : Shape.',
        'Add width and height properties.',
        'Override area() to return width * height.',
      ],
      concepts: ['inheritance', 'override'],
    },
    {
      id: 'swift-inherit-8',
      title: 'Chain of Inheritance',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a three-level inheritance chain: Animal -> Dog -> GuideDog.',
      skeleton: `class Animal {
    func describe() -> String { return "Animal" }
}

// Write Dog and GuideDog subclasses
// Dog.describe() returns "Dog"
// GuideDog.describe() returns "Guide Dog"
`,
      solution: `class Animal {
    func describe() -> String { return "Animal" }
}

class Dog: Animal {
    override func describe() -> String { return "Dog" }
}

class GuideDog: Dog {
    override func describe() -> String { return "Guide Dog" }
}`,
      hints: [
        'Dog inherits from Animal.',
        'GuideDog inherits from Dog.',
        'Each overrides describe().',
      ],
      concepts: ['inheritance-chain', 'override'],
    },
    {
      id: 'swift-inherit-9',
      title: 'Override Property',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Override a computed property in a subclass.',
      skeleton: `class Vehicle {
    var speed: Double = 0
    var description: String {
        return "Speed: \\(speed)"
    }
}

// Write a Car subclass that overrides description to include gear
`,
      solution: `class Vehicle {
    var speed: Double = 0
    var description: String {
        return "Speed: \\(speed)"
    }
}

class Car: Vehicle {
    var gear: Int = 1
    override var description: String {
        return "\\(super.description) in gear \\(gear)"
    }
}`,
      hints: [
        'Properties can be overridden with override var.',
        'Use super.description to include parent output.',
        'The overridden property must be computed.',
      ],
      concepts: ['override-property', 'super'],
    },
    {
      id: 'swift-inherit-10',
      title: 'Type Casting with as',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that takes an array of Animals and counts Dogs.',
      skeleton: `class Animal {}
class Dog: Animal {}
class Cat: Animal {}

func countDogs(_ animals: [Animal]) -> Int {
    // Count how many are Dogs
}`,
      solution: `class Animal {}
class Dog: Animal {}
class Cat: Animal {}

func countDogs(_ animals: [Animal]) -> Int {
    return animals.filter { $0 is Dog }.count
}`,
      hints: [
        'Use `is` to check type at runtime.',
        'filter keeps elements matching the condition.',
        '$0 is Dog returns true for Dog instances.',
      ],
      concepts: ['type-casting', 'is'],
    },
    {
      id: 'swift-inherit-11',
      title: 'Downcast with as?',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that safely downcasts an Animal to a Dog and returns its name.',
      skeleton: `class Animal { var species: String; init(species: String) { self.species = species } }
class Dog: Animal { var name: String; init(name: String) { self.name = name; super.init(species: "Dog") } }

func dogName(_ animal: Animal) -> String? {
    // Safely downcast and return name
}`,
      solution: `class Animal { var species: String; init(species: String) { self.species = species } }
class Dog: Animal { var name: String; init(name: String) { self.name = name; super.init(species: "Dog") } }

func dogName(_ animal: Animal) -> String? {
    guard let dog = animal as? Dog else { return nil }
    return dog.name
}`,
      hints: [
        'Use as? for conditional downcast.',
        'as? returns nil if the cast fails.',
        'guard let safely unwraps the result.',
      ],
      concepts: ['as-optional', 'downcasting'],
    },
    {
      id: 'swift-inherit-12',
      title: 'Abstract-Like Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Create a pattern where the base class method calls fatalError, forcing subclasses to override.',
      skeleton: `class Renderer {
    func render() -> String {
        // Force subclasses to implement
    }
}

class HTMLRenderer: Renderer {
    // Override render
}`,
      solution: `class Renderer {
    func render() -> String {
        fatalError("Subclasses must override render()")
    }
}

class HTMLRenderer: Renderer {
    override func render() -> String {
        return "<html></html>"
    }
}`,
      hints: [
        'Swift has no abstract keyword.',
        'Use fatalError to enforce override.',
        'Subclasses must provide their own implementation.',
      ],
      concepts: ['abstract-pattern', 'fatalError'],
    },
    {
      id: 'swift-inherit-13',
      title: 'Fix Missing Override',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the subclass method that forgets the override keyword.',
      skeleton: `class Base {
    func info() -> String { return "Base" }
}
class Sub: Base {
    func info() -> String { return "Sub" }
}`,
      solution: `class Base {
    func info() -> String { return "Base" }
}
class Sub: Base {
    override func info() -> String { return "Sub" }
}`,
      hints: [
        'Overriding requires the `override` keyword.',
        'Swift enforces this to prevent accidental overrides.',
        'Add override before func.',
      ],
      concepts: ['override'],
    },
    {
      id: 'swift-inherit-14',
      title: 'Fix Super Init Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the init that calls super before initializing its own properties.',
      skeleton: `class Base {
    var a: Int
    init(a: Int) { self.a = a }
}
class Child: Base {
    var b: Int
    init(a: Int, b: Int) {
        super.init(a: a)
        self.b = b
    }
}`,
      solution: `class Base {
    var a: Int
    init(a: Int) { self.a = a }
}
class Child: Base {
    var b: Int
    init(a: Int, b: Int) {
        self.b = b
        super.init(a: a)
    }
}`,
      hints: [
        'Initialize own properties before calling super.init.',
        'This is Swift\'s two-phase initialization rule.',
        'Move self.b = b before super.init.',
      ],
      concepts: ['two-phase-init', 'super-init'],
    },
    {
      id: 'swift-inherit-15',
      title: 'Fix Final Override',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the code that tries to override a final method.',
      skeleton: `class Locked {
    final func id() -> String { return "locked" }
}
class Sub: Locked {
    override func id() -> String { return "unlocked" }
}`,
      solution: `class Locked {
    func id() -> String { return "locked" }
}
class Sub: Locked {
    override func id() -> String { return "unlocked" }
}`,
      hints: [
        'final methods cannot be overridden.',
        'Remove final from the base class method.',
        'Or remove the override in the subclass.',
      ],
      concepts: ['final', 'override'],
    },
    {
      id: 'swift-inherit-16',
      title: 'Predict Inheritance Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class A { func say() -> String { return "A" } }
class B: A { override func say() -> String { return "B" } }
let obj: A = B()
print(obj.say())`,
      solution: `B`,
      hints: [
        'The runtime type is B, not A.',
        'Override is resolved at runtime (polymorphism).',
        'B\'s implementation is called.',
      ],
      concepts: ['polymorphism', 'override'],
    },
    {
      id: 'swift-inherit-17',
      title: 'Predict Super Call',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class Base {
    func val() -> Int { return 1 }
}
class Sub: Base {
    override func val() -> Int { return super.val() + 10 }
}
print(Sub().val())`,
      solution: `11`,
      hints: [
        'super.val() returns 1 from Base.',
        'Sub adds 10 to it.',
        '1 + 10 = 11.',
      ],
      concepts: ['super', 'override'],
    },
    {
      id: 'swift-inherit-18',
      title: 'Predict Type Check',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class Animal {}
class Dog: Animal {}
let d = Dog()
print(d is Animal)`,
      solution: `true`,
      hints: [
        'Dog inherits from Animal.',
        'A Dog instance is also an Animal.',
        'is checks type compatibility.',
      ],
      concepts: ['type-casting', 'is'],
    },
    {
      id: 'swift-inherit-19',
      title: 'Refactor Shared Code to Superclass',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Extract common code into a base class.',
      skeleton: `class Dog {
    var name: String
    init(name: String) { self.name = name }
    func speak() -> String { return "\\(name) says Woof" }
}
class Cat {
    var name: String
    init(name: String) { self.name = name }
    func speak() -> String { return "\\(name) says Meow" }
}`,
      solution: `class Animal {
    var name: String
    init(name: String) { self.name = name }
    func speak() -> String { return "\\(name) makes a sound" }
}
class Dog: Animal {
    override func speak() -> String { return "\\(name) says Woof" }
}
class Cat: Animal {
    override func speak() -> String { return "\\(name) says Meow" }
}`,
      hints: [
        'Move shared name property and init to a base class.',
        'Each subclass overrides speak().',
        'This eliminates code duplication.',
      ],
      concepts: ['inheritance', 'DRY', 'refactoring'],
    },
    {
      id: 'swift-inherit-20',
      title: 'Refactor to Protocol Instead of Inheritance',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Refactor class inheritance to protocol conformance for unrelated types.',
      skeleton: `class Printable {
    func display() -> String { return "" }
}
class Invoice: Printable {
    override func display() -> String { return "Invoice #123" }
}
class Report: Printable {
    override func display() -> String { return "Q4 Report" }
}`,
      solution: `protocol Displayable {
    func display() -> String
}
class Invoice: Displayable {
    func display() -> String { return "Invoice #123" }
}
class Report: Displayable {
    func display() -> String { return "Q4 Report" }
}`,
      hints: [
        'Invoice and Report are unrelated -- no shared state.',
        'A protocol is better than a base class here.',
        'Protocols allow conformance without inheritance.',
      ],
      concepts: ['protocol-vs-inheritance', 'refactoring'],
    },
  ],
};
