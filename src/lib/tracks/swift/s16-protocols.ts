import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-proto',
  title: '16. Protocols',
  explanation: `## Protocols in Swift

Protocols define a blueprint of methods, properties, and requirements.

\`\`\`swift
protocol Describable {
    var description: String { get }
    func summary() -> String
}

struct Product: Describable {
    var name: String
    var description: String { return name }
    func summary() -> String { return "Product: \\(name)" }
}
\`\`\`

### Protocol Extensions
\`\`\`swift
extension Describable {
    func summary() -> String { return description }
}
\`\`\`

### Protocol as Type
\`\`\`swift
func printItem(_ item: Describable) {
    print(item.description)
}
\`\`\`

### Self Requirement
\`\`\`swift
protocol Copyable {
    func copy() -> Self
}
\`\`\``,
  exercises: [
    {
      id: 'swift-proto-1',
      title: 'Declare a Protocol',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a protocol with a method requirement.',
      skeleton: `___ Greetable {
    func greet() -> String
}`,
      solution: `protocol Greetable {
    func greet() -> String
}`,
      hints: [
        'Use the `protocol` keyword.',
        'Methods are declared without a body.',
        'The conforming type provides the implementation.',
      ],
      concepts: ['protocol'],
    },
    {
      id: 'swift-proto-2',
      title: 'Conform to Protocol',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Make a struct conform to the protocol.',
      skeleton: `protocol Named {
    var name: String { get }
}
struct User___ Named {
    var name: String
}`,
      solution: `protocol Named {
    var name: String { get }
}
struct User: Named {
    var name: String
}`,
      hints: [
        'Use colon `:` to declare conformance.',
        'Same syntax as class inheritance.',
        'The struct must implement all requirements.',
      ],
      concepts: ['conformance'],
    },
    {
      id: 'swift-proto-3',
      title: 'Protocol Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a protocol with a gettable property.',
      skeleton: `protocol HasArea {
    var area: Double { ___ }
}`,
      solution: `protocol HasArea {
    var area: Double { get }
}`,
      hints: [
        'Use { get } for read-only properties.',
        'Use { get set } for read-write properties.',
        'Protocol properties must specify access level.',
      ],
      concepts: ['protocol-properties'],
    },
    {
      id: 'swift-proto-4',
      title: 'Protocol Extension Default',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Provide a default implementation in a protocol extension.',
      skeleton: `protocol Loggable {
    func log()
}
___ Loggable {
    func log() { print("Default log") }
}`,
      solution: `protocol Loggable {
    func log()
}
extension Loggable {
    func log() { print("Default log") }
}`,
      hints: [
        'Use `extension` on the protocol.',
        'Default implementations go in the extension.',
        'Types can override or use the default.',
      ],
      concepts: ['protocol-extensions', 'default-implementation'],
    },
    {
      id: 'swift-proto-5',
      title: 'Multiple Protocol Conformance',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Make a struct conform to two protocols.',
      skeleton: `protocol Named { var name: String { get } }
protocol Aged { var age: Int { get } }
struct Person: ______ ______ {
    var name: String
    var age: Int
}`,
      solution: `protocol Named { var name: String { get } }
protocol Aged { var age: Int { get } }
struct Person: Named, Aged {
    var name: String
    var age: Int
}`,
      hints: [
        'Separate multiple protocols with commas.',
        'The struct must satisfy all requirements.',
        'Syntax: struct Type: Protocol1, Protocol2.',
      ],
      concepts: ['multiple-conformance'],
    },
    {
      id: 'swift-proto-6',
      title: 'Mutating Protocol Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Declare a protocol method that can mutate value types.',
      skeleton: `protocol Togglable {
    ___ func toggle()
}`,
      solution: `protocol Togglable {
    mutating func toggle()
}`,
      hints: [
        'Value types need `mutating` to modify self.',
        'The protocol must declare the method as mutating.',
        'Classes can conform without the mutating keyword.',
      ],
      concepts: ['mutating', 'protocol'],
    },
    {
      id: 'swift-proto-7',
      title: 'Write Equatable Conformance',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct that conforms to Equatable.',
      skeleton: `struct Point: Equatable {
    var x: Double
    var y: Double

    // Implement == operator
}`,
      solution: `struct Point: Equatable {
    var x: Double
    var y: Double

    static func == (lhs: Point, rhs: Point) -> Bool {
        return lhs.x == rhs.x && lhs.y == rhs.y
    }
}`,
      hints: [
        'Equatable requires a static == function.',
        'Compare each property.',
        'For simple structs, Swift can auto-synthesize this.',
      ],
      concepts: ['Equatable'],
    },
    {
      id: 'swift-proto-8',
      title: 'Protocol as Function Parameter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that accepts any type conforming to a protocol.',
      skeleton: `protocol Shape {
    func area() -> Double
}
struct Circle: Shape {
    var radius: Double
    func area() -> Double { return 3.14159 * radius * radius }
}

func printArea(_ shape: Shape) {
    // Print the area of any Shape
}`,
      solution: `protocol Shape {
    func area() -> Double
}
struct Circle: Shape {
    var radius: Double
    func area() -> Double { return 3.14159 * radius * radius }
}

func printArea(_ shape: Shape) {
    print(shape.area())
}`,
      hints: [
        'Use the protocol name as the parameter type.',
        'Any conforming type can be passed.',
        'Call the protocol method on the parameter.',
      ],
      concepts: ['protocol-as-type'],
    },
    {
      id: 'swift-proto-9',
      title: 'Comparable Conformance',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Make a struct conform to Comparable by implementing <.',
      skeleton: `struct Score: Comparable {
    var value: Int

    // Implement < and ==
}`,
      solution: `struct Score: Comparable {
    var value: Int

    static func < (lhs: Score, rhs: Score) -> Bool {
        return lhs.value < rhs.value
    }

    static func == (lhs: Score, rhs: Score) -> Bool {
        return lhs.value == rhs.value
    }
}`,
      hints: [
        'Comparable requires < and Equatable (==).',
        'Compare the value properties.',
        'Other operators (>, <=, >=) are derived automatically.',
      ],
      concepts: ['Comparable'],
    },
    {
      id: 'swift-proto-10',
      title: 'Protocol Composition',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that requires a parameter to conform to multiple protocols using &.',
      skeleton: `protocol Named { var name: String { get } }
protocol Aged { var age: Int { get } }

func introduce(_ person: Named & Aged) -> String {
    // Return "Name is Age years old"
}`,
      solution: `protocol Named { var name: String { get } }
protocol Aged { var age: Int { get } }

func introduce(_ person: Named & Aged) -> String {
    return "\\(person.name) is \\(person.age) years old"
}`,
      hints: [
        'Use & to compose protocol requirements.',
        'The parameter must conform to both protocols.',
        'Access properties from both protocols.',
      ],
      concepts: ['protocol-composition'],
    },
    {
      id: 'swift-proto-11',
      title: 'Protocol with Associated Type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a protocol with an associated type and a conforming struct.',
      skeleton: `protocol Container {
    associatedtype Item
    mutating func add(_ item: Item)
    var count: Int { get }
}

struct IntStack: Container {
    // Implement Container for Int items
}`,
      solution: `protocol Container {
    associatedtype Item
    mutating func add(_ item: Item)
    var count: Int { get }
}

struct IntStack: Container {
    var items: [Int] = []

    mutating func add(_ item: Int) {
        items.append(item)
    }

    var count: Int { return items.count }
}`,
      hints: [
        'The associated type is inferred from usage.',
        'Implement add with the concrete type Int.',
        'count should return the number of items.',
      ],
      concepts: ['associated-types'],
    },
    {
      id: 'swift-proto-12',
      title: 'Hashable Conformance',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Make a struct conform to Hashable.',
      skeleton: `struct Coordinate: Hashable {
    var x: Int
    var y: Int

    func hash(into hasher: inout Hasher) {
        // Combine x and y into the hash
    }
}`,
      solution: `struct Coordinate: Hashable {
    var x: Int
    var y: Int

    func hash(into hasher: inout Hasher) {
        hasher.combine(x)
        hasher.combine(y)
    }
}`,
      hints: [
        'Use hasher.combine() for each property.',
        'All properties that affect equality should be combined.',
        'Hashable also requires Equatable.',
      ],
      concepts: ['Hashable'],
    },
    {
      id: 'swift-proto-13',
      title: 'Fix Missing Conformance',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the struct that claims conformance but does not implement the requirement.',
      skeleton: `protocol Drawable {
    func draw() -> String
}
struct Line: Drawable {
    var length: Int
}`,
      solution: `protocol Drawable {
    func draw() -> String
}
struct Line: Drawable {
    var length: Int
    func draw() -> String { return String(repeating: "-", count: length) }
}`,
      hints: [
        'The struct declares Drawable but missing draw().',
        'Implement the required method.',
        'Return a String representation.',
      ],
      concepts: ['conformance', 'protocol'],
    },
    {
      id: 'swift-proto-14',
      title: 'Fix Protocol Property Access',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the protocol property that should be get-only but is declared get set.',
      skeleton: `protocol Identifiable {
    var id: String { get set }
}
struct User: Identifiable {
    let id: String  // let can't satisfy { get set }
}`,
      solution: `protocol Identifiable {
    var id: String { get }
}
struct User: Identifiable {
    let id: String
}`,
      hints: [
        '{ get set } requires var, not let.',
        'If the id should not change, use { get } only.',
        'Change the protocol requirement to { get }.',
      ],
      concepts: ['protocol-properties', 'let'],
    },
    {
      id: 'swift-proto-15',
      title: 'Fix Mutating Protocol Method',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the protocol method that modifies self but is not marked mutating.',
      skeleton: `protocol Resettable {
    func reset()
}
struct Counter: Resettable {
    var count = 0
    mutating func reset() { count = 0 }
}`,
      solution: `protocol Resettable {
    mutating func reset()
}
struct Counter: Resettable {
    var count = 0
    mutating func reset() { count = 0 }
}`,
      hints: [
        'The protocol must declare the method as mutating.',
        'Value type conformers need mutating.',
        'Add mutating to the protocol declaration.',
      ],
      concepts: ['mutating', 'protocol'],
    },
    {
      id: 'swift-proto-16',
      title: 'Predict Protocol Extension',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `protocol Greetable { func greet() -> String }
extension Greetable {
    func greet() -> String { return "Hi" }
}
struct Person: Greetable {}
print(Person().greet())`,
      solution: `Hi`,
      hints: [
        'Person does not override greet().',
        'The default extension implementation is used.',
        'It returns "Hi".',
      ],
      concepts: ['protocol-extensions', 'default-implementation'],
    },
    {
      id: 'swift-proto-17',
      title: 'Predict Protocol Override',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `protocol Describable { func desc() -> String }
extension Describable {
    func desc() -> String { return "Default" }
}
struct Item: Describable {
    func desc() -> String { return "Custom" }
}
print(Item().desc())`,
      solution: `Custom`,
      hints: [
        'Item provides its own implementation.',
        'The custom implementation overrides the default.',
        'The result is "Custom".',
      ],
      concepts: ['protocol-extensions', 'override'],
    },
    {
      id: 'swift-proto-18',
      title: 'Predict Static vs Dynamic Dispatch',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `protocol P {
    func method() -> String
}
extension P {
    func method() -> String { return "Protocol" }
    func extra() -> String { return "Extension" }
}
struct S: P {
    func method() -> String { return "Struct" }
    func extra() -> String { return "Struct Extra" }
}
let s: P = S()
print(s.method())
print(s.extra())`,
      solution: `Struct
Extension`,
      hints: [
        'method() is in the protocol -- dynamic dispatch.',
        'extra() is only in the extension -- static dispatch.',
        'Static dispatch uses the declared type (P), not runtime type.',
      ],
      concepts: ['static-dispatch', 'dynamic-dispatch'],
    },
    {
      id: 'swift-proto-19',
      title: 'Refactor to Protocol',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Extract the common interface into a protocol.',
      skeleton: `class EmailNotifier {
    func send(message: String) { print("Email: \\(message)") }
}
class SMSNotifier {
    func send(message: String) { print("SMS: \\(message)") }
}

func notify(_ notifier: EmailNotifier, _ msg: String) {
    notifier.send(message: msg)
}`,
      solution: `protocol Notifier {
    func send(message: String)
}
class EmailNotifier: Notifier {
    func send(message: String) { print("Email: \\(message)") }
}
class SMSNotifier: Notifier {
    func send(message: String) { print("SMS: \\(message)") }
}

func notify(_ notifier: Notifier, _ msg: String) {
    notifier.send(message: msg)
}`,
      hints: [
        'Create a Notifier protocol with the send method.',
        'Both classes conform to the protocol.',
        'The function parameter type becomes Notifier.',
      ],
      concepts: ['protocol', 'abstraction', 'refactoring'],
    },
    {
      id: 'swift-proto-20',
      title: 'Refactor to Protocol Extension',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Move duplicate method implementations into a protocol extension.',
      skeleton: `protocol Describable {
    var name: String { get }
    func describe() -> String
}
struct Cat: Describable {
    var name: String
    func describe() -> String { return "I am \\(name)" }
}
struct Dog: Describable {
    var name: String
    func describe() -> String { return "I am \\(name)" }
}`,
      solution: `protocol Describable {
    var name: String { get }
    func describe() -> String
}
extension Describable {
    func describe() -> String { return "I am \\(name)" }
}
struct Cat: Describable {
    var name: String
}
struct Dog: Describable {
    var name: String
}`,
      hints: [
        'Both implementations are identical.',
        'Move the shared implementation to a protocol extension.',
        'Types inherit the default without duplication.',
      ],
      concepts: ['protocol-extensions', 'DRY', 'refactoring'],
    },
  ],
};
