import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-access',
  title: '20. Access Control',
  explanation: `## Access Control in Swift

Swift provides five access levels, from most to least restrictive:

| Level | Scope |
|-------|-------|
| \`private\` | Enclosing declaration only |
| \`fileprivate\` | Same source file |
| \`internal\` | Same module (default) |
| \`public\` | Any module, but no subclassing/override |
| \`open\` | Any module, allows subclassing/override |

\`\`\`swift
public class API {
    public var endpoint: String
    private var apiKey: String
    internal func fetch() { }
    
    public init(endpoint: String, apiKey: String) {
        self.endpoint = endpoint
        self.apiKey = apiKey
    }
}
\`\`\`

### private(set)
\`\`\`swift
public private(set) var count = 0  // readable, not writable externally
\`\`\``,
  exercises: [
    {
      id: 'swift-access-1',
      title: 'Private Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Make the property private.',
      skeleton: `class Account {
    ___ var balance: Double = 0

    func deposit(_ amount: Double) {
        balance += amount
    }
}`,
      solution: `class Account {
    private var balance: Double = 0

    func deposit(_ amount: Double) {
        balance += amount
    }
}`,
      hints: [
        'Use `private` before the property.',
        'Private restricts access to the enclosing type.',
        'The deposit method can still access it.',
      ],
      concepts: ['private'],
    },
    {
      id: 'swift-access-2',
      title: 'Public Class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Make the class and its init public.',
      skeleton: `___ class Logger {
    ___ var prefix: String

    ___ init(prefix: String) {
        self.prefix = prefix
    }
}`,
      solution: `public class Logger {
    public var prefix: String

    public init(prefix: String) {
        self.prefix = prefix
    }
}`,
      hints: [
        'Use `public` for external visibility.',
        'Members default to internal.',
        'Init must also be marked public.',
      ],
      concepts: ['public'],
    },
    {
      id: 'swift-access-3',
      title: 'Fileprivate',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Make the helper function accessible only within the same file.',
      skeleton: `class Service {
    func process() { helper() }
}
___ func helper() { print("Internal helper") }`,
      solution: `class Service {
    func process() { helper() }
}
fileprivate func helper() { print("Internal helper") }`,
      hints: [
        'fileprivate restricts to the same source file.',
        'Other files in the module cannot see it.',
        'Useful for file-level helpers.',
      ],
      concepts: ['fileprivate'],
    },
    {
      id: 'swift-access-4',
      title: 'Open Class',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Make the class open for subclassing from other modules.',
      skeleton: `___ class BaseView {
    ___ func render() -> String { return "base" }
}`,
      solution: `open class BaseView {
    open func render() -> String { return "base" }
}`,
      hints: [
        'open allows subclassing and overriding from other modules.',
        'public would prevent subclassing externally.',
        'Both the class and method need open.',
      ],
      concepts: ['open'],
    },
    {
      id: 'swift-access-5',
      title: 'Private(set)',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Make the property readable externally but writable only internally.',
      skeleton: `class Counter {
    ___ var count: Int = 0

    func increment() { count += 1 }
}`,
      solution: `class Counter {
    private(set) var count: Int = 0

    func increment() { count += 1 }
}`,
      hints: [
        'private(set) allows get but restricts set.',
        'External code can read count but not set it.',
        'The class can still modify it internally.',
      ],
      concepts: ['private-set'],
    },
    {
      id: 'swift-access-6',
      title: 'Internal Default',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Explicitly mark a function as internal (the default).',
      skeleton: `class Manager {
    ___ func process() { print("Processing") }
}`,
      solution: `class Manager {
    internal func process() { print("Processing") }
}`,
      hints: [
        'internal is the default access level.',
        'Accessible within the same module.',
        'Usually omitted but can be explicit.',
      ],
      concepts: ['internal'],
    },
    {
      id: 'swift-access-7',
      title: 'Design a Public API',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a class with proper access control for a public API.',
      skeleton: `// Write a UserService class where:
// - the class is public
// - users array is private
// - addUser is public
// - a read-only public var userCount
`,
      solution: `public class UserService {
    private var users: [String] = []

    public var userCount: Int { return users.count }

    public init() {}

    public func addUser(_ name: String) {
        users.append(name)
    }
}`,
      hints: [
        'Hide internal state with private.',
        'Expose only necessary functionality as public.',
        'Use computed property for read-only access.',
      ],
      concepts: ['public', 'private', 'encapsulation'],
    },
    {
      id: 'swift-access-8',
      title: 'Private Init Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a class that can only be created through a factory method.',
      skeleton: `// Write a Database class with:
// - private init
// - static shared instance
// - public query method
`,
      solution: `class Database {
    static let shared = Database()

    private init() {}

    func query(_ sql: String) -> String {
        return "Results for: \\(sql)"
    }
}`,
      hints: [
        'Private init prevents external instantiation.',
        'Static shared provides the singleton.',
        'query can be internal (default) or public.',
      ],
      concepts: ['private-init', 'singleton'],
    },
    {
      id: 'swift-access-9',
      title: 'Protocol with Access Control',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a public protocol with a public conforming struct.',
      skeleton: `// Write a public Identifiable protocol with id property
// Write a public struct User conforming to it
`,
      solution: `public protocol Identifiable {
    var id: String { get }
}

public struct User: Identifiable {
    public let id: String
    public let name: String

    public init(id: String, name: String) {
        self.id = id
        self.name = name
    }
}`,
      hints: [
        'Public protocols need public on the protocol itself.',
        'Public structs need public init explicitly.',
        'Properties must also be public.',
      ],
      concepts: ['public', 'protocol'],
    },
    {
      id: 'swift-access-10',
      title: 'Layered Access Control',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct with different access levels for different properties.',
      skeleton: `// Write a Config struct with:
// - public let appName (set at init)
// - internal var debugMode (default false)
// - private var secretKey
// - public init
`,
      solution: `public struct Config {
    public let appName: String
    internal var debugMode: Bool
    private var secretKey: String

    public init(appName: String, secretKey: String) {
        self.appName = appName
        self.debugMode = false
        self.secretKey = secretKey
    }
}`,
      hints: [
        'Mix access levels based on need.',
        'Public for API surface.',
        'Private for sensitive data.',
      ],
      concepts: ['access-control', 'encapsulation'],
    },
    {
      id: 'swift-access-11',
      title: 'Extension Access Control',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a private extension to organize private helpers.',
      skeleton: `class Processor {
    func run() {
        let cleaned = sanitize("input")
        print(cleaned)
    }
}

// Add a private extension with the sanitize helper
`,
      solution: `class Processor {
    func run() {
        let cleaned = sanitize("input")
        print(cleaned)
    }
}

private extension Processor {
    func sanitize(_ input: String) -> String {
        return input.trimmingCharacters(in: .whitespaces)
    }
}`,
      hints: [
        'private extension makes all members private.',
        'Groups private helpers separately.',
        'Keeps the main class declaration clean.',
      ],
      concepts: ['private-extension'],
    },
    {
      id: 'swift-access-12',
      title: 'Read-only Subscript',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct with a public getter but private setter for a subscript.',
      skeleton: `struct Matrix {
    private var data: [[Int]]

    init(rows: Int, cols: Int) {
        data = Array(repeating: Array(repeating: 0, count: cols), count: rows)
    }

    // Add subscript with internal set
}`,
      solution: `struct Matrix {
    private var data: [[Int]]

    init(rows: Int, cols: Int) {
        data = Array(repeating: Array(repeating: 0, count: cols), count: rows)
    }

    subscript(row: Int, col: Int) -> Int {
        get { return data[row][col] }
        set { data[row][col] = newValue }
    }
}`,
      hints: [
        'Subscripts can have different get/set access.',
        'The data array is private.',
        'The subscript provides controlled access.',
      ],
      concepts: ['subscript', 'access-control'],
    },
    {
      id: 'swift-access-13',
      title: 'Fix Public Init Missing',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the public struct that cannot be created from another module.',
      skeleton: `public struct Config {
    public var name: String
    public var value: Int
}
// Cannot call Config(name:value:) from outside module`,
      solution: `public struct Config {
    public var name: String
    public var value: Int

    public init(name: String, value: Int) {
        self.name = name
        self.value = value
    }
}`,
      hints: [
        'Memberwise init is internal by default.',
        'Public structs need explicit public init.',
        'Add a public init with all parameters.',
      ],
      concepts: ['public-init', 'memberwise-init'],
    },
    {
      id: 'swift-access-14',
      title: 'Fix Private Protocol Conformance',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the access level conflict in protocol conformance.',
      skeleton: `public protocol Displayable {
    func display() -> String
}
public struct Item: Displayable {
    private func display() -> String { return "Item" }
}`,
      solution: `public protocol Displayable {
    func display() -> String
}
public struct Item: Displayable {
    public func display() -> String { return "Item" }
}`,
      hints: [
        'Protocol requirements must be at least as accessible.',
        'A public protocol needs public implementations.',
        'Change private to public.',
      ],
      concepts: ['protocol-conformance', 'access-control'],
    },
    {
      id: 'swift-access-15',
      title: 'Fix Open vs Public',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the class that should be subclassable from other modules.',
      skeleton: `public class Widget {
    public func render() -> String { return "Widget" }
}
// In another module:
// class CustomWidget: Widget { override func render() -> String { return "Custom" } }
// ERROR: Cannot override, not open`,
      solution: `open class Widget {
    open func render() -> String { return "Widget" }
}`,
      hints: [
        'public does not allow subclassing externally.',
        'Use open for class and methods.',
        'open is the most permissive access level.',
      ],
      concepts: ['open', 'public'],
    },
    {
      id: 'swift-access-16',
      title: 'Predict Access Level Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class Box {
    private(set) var value = 0
    func set(_ v: Int) { value = v }
}
let b = Box()
b.set(42)
print(b.value)`,
      solution: `42`,
      hints: [
        'private(set) allows reading externally.',
        'set() modifies value internally.',
        'b.value reads as 42.',
      ],
      concepts: ['private-set'],
    },
    {
      id: 'swift-access-17',
      title: 'Predict Default Access',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the default access level of a struct member.',
      skeleton: `struct Item {
    var name = "test"
}
// What is the access level of 'name'?
print("internal")`,
      solution: `internal`,
      hints: [
        'The default access level in Swift is internal.',
        'No explicit modifier means internal.',
        'Accessible within the same module.',
      ],
      concepts: ['internal', 'default-access'],
    },
    {
      id: 'swift-access-18',
      title: 'Predict Fileprivate Scope',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict whether the code compiles (same file).',
      skeleton: `class A {
    fileprivate var x = 10
}
class B {
    func read() -> Int {
        return A().x
    }
}
print(B().read())`,
      solution: `10`,
      hints: [
        'fileprivate allows access from the same file.',
        'A and B are in the same file.',
        'B can read A.x.',
      ],
      concepts: ['fileprivate'],
    },
    {
      id: 'swift-access-19',
      title: 'Refactor to Use Access Control',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add appropriate access control to hide implementation details.',
      skeleton: `class Cache {
    var storage: [String: Any] = [:]
    var hitCount = 0

    func get(_ key: String) -> Any? {
        if let val = storage[key] {
            hitCount += 1
            return val
        }
        return nil
    }

    func set(_ key: String, _ value: Any) {
        storage[key] = value
    }
}`,
      solution: `class Cache {
    private var storage: [String: Any] = [:]
    private(set) var hitCount = 0

    func get(_ key: String) -> Any? {
        if let val = storage[key] {
            hitCount += 1
            return val
        }
        return nil
    }

    func set(_ key: String, _ value: Any) {
        storage[key] = value
    }
}`,
      hints: [
        'storage should be private -- implementation detail.',
        'hitCount should be readable but not settable externally.',
        'Use private and private(set).',
      ],
      concepts: ['private', 'private-set', 'encapsulation'],
    },
    {
      id: 'swift-access-20',
      title: 'Refactor Global to Scoped',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Refactor a global variable into a properly scoped class property.',
      skeleton: `var globalCounter = 0

class Service {
    func process() {
        globalCounter += 1
        print("Processed \\(globalCounter) items")
    }
}`,
      solution: `class Service {
    private var counter = 0

    func process() {
        counter += 1
        print("Processed \\(counter) items")
    }
}`,
      hints: [
        'Global mutable state is dangerous.',
        'Move the counter inside the class.',
        'Make it private for encapsulation.',
      ],
      concepts: ['encapsulation', 'private'],
    },
  ],
};
