import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-init',
  title: '23. Initialization',
  explanation: `## Initialization in Swift

Initialization sets up an instance. Swift has strict rules to ensure all properties are initialized.

### Designated & Convenience
\`\`\`swift
class Vehicle {
    var name: String
    var speed: Int

    // Designated: initializes all properties
    init(name: String, speed: Int) {
        self.name = name
        self.speed = speed
    }

    // Convenience: delegates to designated
    convenience init(name: String) {
        self.init(name: name, speed: 0)
    }
}
\`\`\`

### Required Init
\`\`\`swift
class Base {
    required init() { }
}
class Sub: Base {
    required init() { }  // Must implement
}
\`\`\`

### Failable Init
\`\`\`swift
struct Temperature {
    var celsius: Double
    init?(fahrenheit: Double) {
        guard fahrenheit > -459.67 else { return nil }
        celsius = (fahrenheit - 32) * 5.0 / 9.0
    }
}
\`\`\``,
  exercises: [
    {
      id: 'swift-init-1',
      title: 'Designated Initializer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write a designated initializer that sets all properties.',
      skeleton: `class Car {
    var make: String
    var year: Int

    ___(make: String, year: Int) {
        self.make = make
        self.year = year
    }
}`,
      solution: `class Car {
    var make: String
    var year: Int

    init(make: String, year: Int) {
        self.make = make
        self.year = year
    }
}`,
      hints: ['Use `init` to declare an initializer.', 'All stored properties must be set.', 'Use self.property to disambiguate.'],
      concepts: ['designated-init'],
    },
    {
      id: 'swift-init-2',
      title: 'Convenience Initializer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a convenience initializer that provides a default.',
      skeleton: `class User {
    var name: String
    var role: String

    init(name: String, role: String) {
        self.name = name
        self.role = role
    }

    ___ init(name: String) {
        self.init(name: name, role: "user")
    }
}`,
      solution: `class User {
    var name: String
    var role: String

    init(name: String, role: String) {
        self.name = name
        self.role = role
    }

    convenience init(name: String) {
        self.init(name: name, role: "user")
    }
}`,
      hints: ['convenience inits delegate to another init.', 'Must call self.init.', 'Provides a simpler creation path.'],
      concepts: ['convenience-init'],
    },
    {
      id: 'swift-init-3',
      title: 'Failable Initializer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Create a failable initializer that returns nil on invalid input.',
      skeleton: `struct Percentage {
    var value: Double

    init___(_ value: Double) {
        guard value >= 0 && value <= 100 else { return nil }
        self.value = value
    }
}`,
      solution: `struct Percentage {
    var value: Double

    init?(_ value: Double) {
        guard value >= 0 && value <= 100 else { return nil }
        self.value = value
    }
}`,
      hints: ['Failable inits use init? syntax.', 'Return nil for invalid cases.', 'The result is an Optional.'],
      concepts: ['failable-init'],
    },
    {
      id: 'swift-init-4',
      title: 'Required Initializer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Mark an initializer as required so subclasses must implement it.',
      skeleton: `class Serializable {
    ___ init() { }
}
class Document: Serializable {
    var title: String = "Untitled"
    ___ init() { super.init() }
}`,
      solution: `class Serializable {
    required init() { }
}
class Document: Serializable {
    var title: String = "Untitled"
    required init() { super.init() }
}`,
      hints: ['required forces subclasses to implement.', 'Subclass uses required, not override.', 'Ensures a consistent init across hierarchy.'],
      concepts: ['required-init'],
    },
    {
      id: 'swift-init-5',
      title: 'Super Init Call',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Call the superclass initializer from a subclass.',
      skeleton: `class Shape {
    var color: String
    init(color: String) { self.color = color }
}
class Circle: Shape {
    var radius: Double
    init(color: String, radius: Double) {
        self.radius = radius
        ___.___(color: color)
    }
}`,
      solution: `class Shape {
    var color: String
    init(color: String) { self.color = color }
}
class Circle: Shape {
    var radius: Double
    init(color: String, radius: Double) {
        self.radius = radius
        super.init(color: color)
    }
}`,
      hints: ['Initialize own properties first.', 'Then call super.init.', 'This is the two-phase init rule.'],
      concepts: ['super-init', 'two-phase-init'],
    },
    {
      id: 'swift-init-6',
      title: 'Default Property Values',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use default values to simplify initialization.',
      skeleton: `struct Config {
    var debug: Bool ___ false
    var maxRetries: Int ___ 3
    var timeout: Double ___ 30.0
}`,
      solution: `struct Config {
    var debug: Bool = false
    var maxRetries: Int = 3
    var timeout: Double = 30.0
}`,
      hints: ['Default values reduce init complexity.', 'Properties with defaults are optional in memberwise init.', 'Use = to assign defaults.'],
      concepts: ['default-values'],
    },
    {
      id: 'swift-init-7',
      title: 'Struct Custom Init',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct with both the memberwise init and a custom init (via extension).',
      skeleton: `struct Point {
    var x: Double
    var y: Double
}

// Add a convenience init(angle:radius:) via extension
`,
      solution: `struct Point {
    var x: Double
    var y: Double
}

extension Point {
    init(angle: Double, radius: Double) {
        self.init(x: radius * cos(angle), y: radius * sin(angle))
    }
}

func cos(_ x: Double) -> Double { return Foundation.cos(x) }
func sin(_ x: Double) -> Double { return Foundation.sin(x) }`,
      hints: ['Adding init in extension preserves memberwise init.', 'Call self.init with x and y.', 'Convert polar to cartesian coordinates.'],
      concepts: ['extension-init', 'memberwise-init'],
    },
    {
      id: 'swift-init-8',
      title: 'Init Delegation Chain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a class with designated and convenience inits forming a delegation chain.',
      skeleton: `class Rect {
    var x: Double, y: Double, w: Double, h: Double

    // Designated: init(x:y:w:h:)
    // Convenience: init(origin:size:) using tuples
    // Convenience: init(size:) centered at origin
}`,
      solution: `class Rect {
    var x: Double, y: Double, w: Double, h: Double

    init(x: Double, y: Double, w: Double, h: Double) {
        self.x = x; self.y = y; self.w = w; self.h = h
    }

    convenience init(origin: (Double, Double), size: (Double, Double)) {
        self.init(x: origin.0, y: origin.1, w: size.0, h: size.1)
    }

    convenience init(size: (Double, Double)) {
        self.init(origin: (0, 0), size: size)
    }
}`,
      hints: ['Convenience inits delegate to designated.', 'They can also delegate to other convenience inits.', 'The chain must end at a designated init.'],
      concepts: ['init-delegation'],
    },
    {
      id: 'swift-init-9',
      title: 'Failable Init from String',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a failable init that parses a comma-separated string into a Point.',
      skeleton: `struct Point {
    var x: Double, y: Double

    init?(from string: String) {
        // Parse "x,y" format, return nil if invalid
    }
}`,
      solution: `struct Point {
    var x: Double, y: Double

    init?(from string: String) {
        let parts = string.split(separator: ",")
        guard parts.count == 2,
              let x = Double(parts[0]),
              let y = Double(parts[1]) else { return nil }
        self.x = x
        self.y = y
    }
}`,
      hints: ['Split on comma.', 'Convert each part to Double.', 'Return nil if parsing fails.'],
      concepts: ['failable-init', 'parsing'],
    },
    {
      id: 'swift-init-10',
      title: 'Required Init with Decode Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a class hierarchy where subclass must implement a required init.',
      skeleton: `class Base {
    var id: Int

    required init(id: Int) {
        self.id = id
    }
}

class Child: Base {
    var name: String

    // Implement required init and a designated init
}`,
      solution: `class Base {
    var id: Int

    required init(id: Int) {
        self.id = id
    }
}

class Child: Base {
    var name: String

    init(id: Int, name: String) {
        self.name = name
        super.init(id: id)
    }

    required init(id: Int) {
        self.name = "Unknown"
        super.init(id: id)
    }
}`,
      hints: ['Required init must be implemented in subclass.', 'Initialize own properties before super.init.', 'Provide a default for name in the required init.'],
      concepts: ['required-init', 'two-phase-init'],
    },
    {
      id: 'swift-init-11',
      title: 'Memberwise Init with Validation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct with a custom init that validates all inputs.',
      skeleton: `struct Email {
    let address: String

    // Failable init that validates the email contains @
}`,
      solution: `struct Email {
    let address: String

    init?(_ address: String) {
        guard address.contains("@") else { return nil }
        self.address = address
    }
}`,
      hints: ['Check for @ in the string.', 'Return nil if invalid.', 'Use guard for validation.'],
      concepts: ['failable-init', 'validation'],
    },
    {
      id: 'swift-init-12',
      title: 'Init with Closure Default',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a class where a property is initialized with a closure.',
      skeleton: `class Board {
    let squares: [Int]

    init(size: Int) {
        // Initialize squares as [0, 1, 2, ..., size-1]
    }
}`,
      solution: `class Board {
    let squares: [Int]

    init(size: Int) {
        squares = Array(0..<size)
    }
}`,
      hints: ['Use Array(0..<size) to generate a range.', 'Assign in init before it is used.', 'let properties must be assigned exactly once.'],
      concepts: ['init', 'closure-initialization'],
    },
    {
      id: 'swift-init-13',
      title: 'Fix Two-Phase Init Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the init that calls super before initializing own properties.',
      skeleton: `class Base { init() {} }
class Sub: Base {
    var x: Int
    override init() {
        super.init()
        x = 10
    }
}`,
      solution: `class Base { init() {} }
class Sub: Base {
    var x: Int
    override init() {
        x = 10
        super.init()
    }
}`,
      hints: ['Own properties must be set before super.init.', 'This is two-phase initialization.', 'Move x = 10 before super.init().'],
      concepts: ['two-phase-init'],
    },
    {
      id: 'swift-init-14',
      title: 'Fix Missing Required Init',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the subclass missing the required init.',
      skeleton: `class Base {
    required init() {}
}
class Child: Base {
    var name: String
    init(name: String) {
        self.name = name
        super.init()
    }
}`,
      solution: `class Base {
    required init() {}
}
class Child: Base {
    var name: String
    init(name: String) {
        self.name = name
        super.init()
    }
    required init() {
        self.name = "default"
        super.init()
    }
}`,
      hints: ['Required inits must be present in all subclasses.', 'Add the required init to Child.', 'Provide a default value for name.'],
      concepts: ['required-init'],
    },
    {
      id: 'swift-init-15',
      title: 'Fix Convenience Calling Super',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the convenience init that incorrectly calls super.init.',
      skeleton: `class Vehicle {
    var speed: Int
    init(speed: Int) { self.speed = speed }
}
class Car: Vehicle {
    convenience init() {
        super.init(speed: 0)
    }
}`,
      solution: `class Car: Vehicle {
    convenience init() {
        self.init(speed: 0)
    }
}`,
      hints: ['Convenience inits must call self.init, not super.init.', 'They delegate horizontally, not up.', 'Change super.init to self.init.'],
      concepts: ['convenience-init', 'init-delegation'],
    },
    {
      id: 'swift-init-16',
      title: 'Predict Failable Init',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `struct Pos {
    var x: Int
    init?(_ x: Int) {
        guard x >= 0 else { return nil }
        self.x = x
    }
}
let p = Pos(-1)
print(p == nil)`,
      solution: `true`,
      hints: ['-1 fails the guard.', 'init? returns nil.', 'p is nil.'],
      concepts: ['failable-init'],
    },
    {
      id: 'swift-init-17',
      title: 'Predict Convenience Chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class Box {
    var n: Int
    init(n: Int) { self.n = n }
    convenience init() { self.init(n: 42) }
}
print(Box().n)`,
      solution: `42`,
      hints: ['Box() calls the convenience init.', 'Which delegates to init(n: 42).', 'n is 42.'],
      concepts: ['convenience-init'],
    },
    {
      id: 'swift-init-18',
      title: 'Predict Default Memberwise',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `struct S {
    var a: Int = 1
    var b: Int = 2
}
let s = S(a: 10)
print(s.b)`,
      solution: `2`,
      hints: ['b has a default value of 2.', 'Only a is overridden.', 'b keeps its default.'],
      concepts: ['memberwise-init', 'default-values'],
    },
    {
      id: 'swift-init-19',
      title: 'Refactor to Use Convenience Init',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor duplicated init code to use convenience initializers.',
      skeleton: `class Logger {
    var tag: String
    var level: Int

    init(tag: String, level: Int) {
        self.tag = tag
        self.level = level
    }

    init(tag: String) {
        self.tag = tag
        self.level = 0
    }

    init() {
        self.tag = "default"
        self.level = 0
    }
}`,
      solution: `class Logger {
    var tag: String
    var level: Int

    init(tag: String, level: Int) {
        self.tag = tag
        self.level = level
    }

    convenience init(tag: String) {
        self.init(tag: tag, level: 0)
    }

    convenience init() {
        self.init(tag: "default")
    }
}`,
      hints: ['Each convenience init delegates to another.', 'Reduces code duplication.', 'The chain ends at the designated init.'],
      concepts: ['convenience-init', 'refactoring'],
    },
    {
      id: 'swift-init-20',
      title: 'Refactor to Failable Init',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor the throwing init to a failable init.',
      skeleton: `enum E: Error { case invalid }
struct Age {
    var value: Int
    init(_ v: Int) throws {
        guard v >= 0 && v <= 150 else { throw E.invalid }
        value = v
    }
}`,
      solution: `struct Age {
    var value: Int
    init?(_ v: Int) {
        guard v >= 0 && v <= 150 else { return nil }
        value = v
    }
}`,
      hints: ['init? returns nil instead of throwing.', 'Simpler for cases where the error type is irrelevant.', 'Replace throws with ? and throw with return nil.'],
      concepts: ['failable-init', 'refactoring'],
    },
  ],
};
