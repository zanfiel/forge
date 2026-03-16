import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-class',
  title: '14. Classes',
  explanation: `## Classes in Swift

Classes are reference types with inheritance, identity, and deinitializers.

\`\`\`swift
class Vehicle {
    var speed: Double = 0
    
    func describe() -> String {
        return "Speed: \\(speed)"
    }
    
    deinit {
        print("Vehicle deallocated")
    }
}
\`\`\`

### Reference Semantics
\`\`\`swift
let a = Vehicle()
let b = a       // b points to the same instance
b.speed = 60    // a.speed is also 60
\`\`\`

### Identity Operators
\`\`\`swift
a === b  // true -- same instance
a !== b  // false
\`\`\``,
  exercises: [
    {
      id: 'swift-class-1',
      title: 'Declare a Class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a class with a stored property and a method.',
      skeleton: `___ Animal {
    var name: String

    init(name: String) {
        self.name = name
    }

    func speak() -> String {
        return "\\(name) makes a sound"
    }
}`,
      solution: `class Animal {
    var name: String

    init(name: String) {
        self.name = name
    }

    func speak() -> String {
        return "\\(name) makes a sound"
    }
}`,
      hints: [
        'Use the `class` keyword.',
        'Classes require explicit initializers.',
        'Unlike structs, no automatic memberwise init.',
      ],
      concepts: ['class', 'init'],
    },
    {
      id: 'swift-class-2',
      title: 'Reference Assignment',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Demonstrate that two variables reference the same object.',
      skeleton: `class Box { var value = 0 }
let a = Box()
let b = ___
b.value = 42
print(a.value) // prints 42`,
      solution: `class Box { var value = 0 }
let a = Box()
let b = a
b.value = 42
print(a.value) // prints 42`,
      hints: [
        'Assigning a class creates a reference, not a copy.',
        'b = a makes b point to the same instance.',
        'Modifying b also modifies a.',
      ],
      concepts: ['reference-semantics'],
    },
    {
      id: 'swift-class-3',
      title: 'Identity Operator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Check if two variables reference the same instance.',
      skeleton: `class Obj {}
let a = Obj()
let b = a
print(a ___ b) // true`,
      solution: `class Obj {}
let a = Obj()
let b = a
print(a === b) // true`,
      hints: [
        'Use === to check identity (same instance).',
        '== checks equality, === checks identity.',
        'Classes support identity comparison.',
      ],
      concepts: ['identity-operators'],
    },
    {
      id: 'swift-class-4',
      title: 'Class Deinit',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a deinitializer to the class.',
      skeleton: `class Resource {
    var name: String
    init(name: String) { self.name = name }

    ___ {
        print("\\(name) released")
    }
}`,
      solution: `class Resource {
    var name: String
    init(name: String) { self.name = name }

    deinit {
        print("\\(name) released")
    }
}`,
      hints: [
        'Use `deinit` for cleanup code.',
        'No func keyword or parentheses needed.',
        'Called automatically when the instance is deallocated.',
      ],
      concepts: ['deinit'],
    },
    {
      id: 'swift-class-5',
      title: 'Let Instance Mutability',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Show that let class instances can still have their properties modified.',
      skeleton: `class Config { var theme = "light" }
___ c = Config()
c.theme = "dark"  // This works because classes are reference types`,
      solution: `class Config { var theme = "light" }
let c = Config()
c.theme = "dark"  // This works because classes are reference types`,
      hints: [
        'let on a class means the reference is constant.',
        'The properties can still be modified.',
        'This differs from structs.',
      ],
      concepts: ['reference-semantics', 'let'],
    },
    {
      id: 'swift-class-6',
      title: 'Class with Multiple Init',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a convenience initializer.',
      skeleton: `class User {
    var name: String
    var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }

    ___ init(name: String) {
        self.init(name: name, age: 0)
    }
}`,
      solution: `class User {
    var name: String
    var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }

    convenience init(name: String) {
        self.init(name: name, age: 0)
    }
}`,
      hints: [
        'Convenience inits call another init on the same class.',
        'Use the `convenience` keyword.',
        'Must call self.init, not super.init.',
      ],
      concepts: ['convenience-init'],
    },
    {
      id: 'swift-class-7',
      title: 'Write a BankAccount Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a class with deposit and withdraw methods.',
      skeleton: `class BankAccount {
    var balance: Double

    init(balance: Double) {
        self.balance = balance
    }

    // Add deposit and withdraw methods
    // withdraw should return false if insufficient funds
}`,
      solution: `class BankAccount {
    var balance: Double

    init(balance: Double) {
        self.balance = balance
    }

    func deposit(_ amount: Double) {
        balance += amount
    }

    func withdraw(_ amount: Double) -> Bool {
        guard amount <= balance else { return false }
        balance -= amount
        return true
    }
}`,
      hints: [
        'deposit adds to balance.',
        'withdraw checks if sufficient funds exist.',
        'Return false if the withdrawal would overdraw.',
      ],
      concepts: ['methods', 'guard'],
    },
    {
      id: 'swift-class-8',
      title: 'Write a Linked List Node',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a Node class for a singly linked list.',
      skeleton: `class Node {
    var value: Int
    var next: Node?

    init(value: Int, next: Node? = nil) {
        // Initialize properties
    }

    func toArray() -> [Int] {
        // Return all values as an array
    }
}`,
      solution: `class Node {
    var value: Int
    var next: Node?

    init(value: Int, next: Node? = nil) {
        self.value = value
        self.next = next
    }

    func toArray() -> [Int] {
        var result = [value]
        var current = next
        while let node = current {
            result.append(node.value)
            current = node.next
        }
        return result
    }
}`,
      hints: [
        'Classes are needed for self-referential types.',
        'next is optional since the last node has no next.',
        'Use while let to traverse the list.',
      ],
      concepts: ['reference-types', 'linked-list'],
    },
    {
      id: 'swift-class-9',
      title: 'Class Copy Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a method that creates a deep copy of a class instance.',
      skeleton: `class Settings {
    var volume: Int
    var brightness: Int

    init(volume: Int, brightness: Int) {
        self.volume = volume
        self.brightness = brightness
    }

    func copy() -> Settings {
        // Return a new instance with the same values
    }
}`,
      solution: `class Settings {
    var volume: Int
    var brightness: Int

    init(volume: Int, brightness: Int) {
        self.volume = volume
        self.brightness = brightness
    }

    func copy() -> Settings {
        return Settings(volume: volume, brightness: brightness)
    }
}`,
      hints: [
        'Create a new instance with current property values.',
        'This gives a separate object (deep copy).',
        'Modifying the copy won\'t affect the original.',
      ],
      concepts: ['deep-copy', 'reference-types'],
    },
    {
      id: 'swift-class-10',
      title: 'Observable Class',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a class that notifies observers when a value changes.',
      skeleton: `class Observable {
    var value: Int {
        didSet {
            // Call all callbacks
        }
    }
    private var callbacks: [(Int) -> Void] = []

    init(value: Int) { self.value = value }

    func onChange(_ callback: @escaping (Int) -> Void) {
        // Add callback
    }
}`,
      solution: `class Observable {
    var value: Int {
        didSet {
            for callback in callbacks {
                callback(value)
            }
        }
    }
    private var callbacks: [(Int) -> Void] = []

    init(value: Int) { self.value = value }

    func onChange(_ callback: @escaping (Int) -> Void) {
        callbacks.append(callback)
    }
}`,
      hints: [
        'didSet triggers after the value changes.',
        'Store callbacks in an array.',
        'Call each callback with the new value.',
      ],
      concepts: ['property-observers', 'escaping-closures'],
    },
    {
      id: 'swift-class-11',
      title: 'Equatable Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Make the class conform to Equatable.',
      skeleton: `class Card: Equatable {
    var rank: Int
    var suit: String

    init(rank: Int, suit: String) {
        self.rank = rank
        self.suit = suit
    }

    // Implement == operator
}`,
      solution: `class Card: Equatable {
    var rank: Int
    var suit: String

    init(rank: Int, suit: String) {
        self.rank = rank
        self.suit = suit
    }

    static func == (lhs: Card, rhs: Card) -> Bool {
        return lhs.rank == rhs.rank && lhs.suit == rhs.suit
    }
}`,
      hints: [
        'Equatable requires a static == function.',
        'Compare all relevant properties.',
        'lhs and rhs are conventional parameter names.',
      ],
      concepts: ['Equatable', 'operator-overloading'],
    },
    {
      id: 'swift-class-12',
      title: 'Class Singleton Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Implement the singleton pattern for a class.',
      skeleton: `class AppConfig {
    // Create a shared static instance
    var apiKey: String = ""

    // Prevent external init
}`,
      solution: `class AppConfig {
    static let shared = AppConfig()
    var apiKey: String = ""

    private init() {}
}`,
      hints: [
        'Use a static let for the shared instance.',
        'Make init private to prevent external creation.',
        'Access via AppConfig.shared.',
      ],
      concepts: ['singleton', 'static', 'private-init'],
    },
    {
      id: 'swift-class-13',
      title: 'Fix Struct Used as Reference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the code where struct value semantics cause unexpected behavior.',
      skeleton: `struct SharedState {
    var count = 0
}
var state = SharedState()
var ref = state
ref.count = 10
print(state.count) // Expected 10 but gets 0`,
      solution: `class SharedState {
    var count = 0
}
let state = SharedState()
let ref = state
ref.count = 10
print(state.count) // Now prints 10`,
      hints: [
        'Structs are value types -- copies are independent.',
        'Use a class for shared reference semantics.',
        'Change struct to class.',
      ],
      concepts: ['reference-vs-value', 'class'],
    },
    {
      id: 'swift-class-14',
      title: 'Fix Missing Init',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the class that is missing a required initializer.',
      skeleton: `class Person {
    var name: String
    var age: Int
}
let p = Person()`,
      solution: `class Person {
    var name: String
    var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}
let p = Person(name: "Alice", age: 30)`,
      hints: [
        'Classes do not get automatic memberwise inits.',
        'All stored properties must be initialized.',
        'Add an explicit init.',
      ],
      concepts: ['init', 'stored-properties'],
    },
    {
      id: 'swift-class-15',
      title: 'Fix Identity vs Equality',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the code that confuses identity with equality.',
      skeleton: `class Token {
    var value: String
    init(_ v: String) { value = v }
}
let a = Token("abc")
let b = Token("abc")
print(a === b) // Developer expected true`,
      solution: `class Token: Equatable {
    var value: String
    init(_ v: String) { value = v }
    static func == (lhs: Token, rhs: Token) -> Bool {
        return lhs.value == rhs.value
    }
}
let a = Token("abc")
let b = Token("abc")
print(a == b) // true`,
      hints: [
        '=== checks if same instance, not same value.',
        'a and b are different instances.',
        'Use == with Equatable for value comparison.',
      ],
      concepts: ['identity-vs-equality', 'Equatable'],
    },
    {
      id: 'swift-class-16',
      title: 'Predict Reference Semantics',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class Counter { var n = 0 }
let a = Counter()
let b = a
a.n = 5
b.n += 3
print(a.n)`,
      solution: `8`,
      hints: [
        'a and b reference the same instance.',
        'a.n = 5 sets to 5.',
        'b.n += 3 adds 3 to 5, making it 8.',
      ],
      concepts: ['reference-semantics'],
    },
    {
      id: 'swift-class-17',
      title: 'Predict Identity Check',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class Obj {}
let a = Obj()
let b = Obj()
print(a === b)`,
      solution: `false`,
      hints: [
        'a and b are different instances.',
        '=== returns false for different objects.',
        'They are separate allocations.',
      ],
      concepts: ['identity-operators'],
    },
    {
      id: 'swift-class-18',
      title: 'Predict Let Class Mutation',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class Bag { var items: [String] = [] }
let bag = Bag()
bag.items.append("key")
bag.items.append("coin")
print(bag.items.count)`,
      solution: `2`,
      hints: [
        'let bag means the reference cannot change.',
        'Properties of the referenced object can still change.',
        'Two items are appended.',
      ],
      concepts: ['reference-semantics', 'let'],
    },
    {
      id: 'swift-class-19',
      title: 'Refactor to Use Convenience Init',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor the duplicate initialization code to use a convenience init.',
      skeleton: `class Logger {
    var prefix: String
    var enabled: Bool

    init(prefix: String, enabled: Bool) {
        self.prefix = prefix
        self.enabled = enabled
    }

    init(prefix: String) {
        self.prefix = prefix
        self.enabled = true
    }
}`,
      solution: `class Logger {
    var prefix: String
    var enabled: Bool

    init(prefix: String, enabled: Bool) {
        self.prefix = prefix
        self.enabled = enabled
    }

    convenience init(prefix: String) {
        self.init(prefix: prefix, enabled: true)
    }
}`,
      hints: [
        'The second init duplicates code.',
        'Make it a convenience init that delegates.',
        'Convenience inits call self.init.',
      ],
      concepts: ['convenience-init', 'refactoring'],
    },
    {
      id: 'swift-class-20',
      title: 'Refactor Public Properties to Private(set)',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor to prevent external mutation of the balance property.',
      skeleton: `class Wallet {
    var balance: Double = 0

    func earn(_ amount: Double) {
        balance += amount
    }
}
// Problem: anyone can do wallet.balance = 1000000`,
      solution: `class Wallet {
    private(set) var balance: Double = 0

    func earn(_ amount: Double) {
        balance += amount
    }
}`,
      hints: [
        'private(set) allows reading but not external setting.',
        'The class itself can still modify balance.',
        'External code can only read, not write.',
      ],
      concepts: ['private-set', 'encapsulation'],
    },
  ],
};
