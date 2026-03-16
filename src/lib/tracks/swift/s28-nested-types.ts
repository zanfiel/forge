import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-nested',
  title: '28. Nested Types',
  explanation: `## Nested Types in Swift

Swift lets you define types inside other types for better organization and namespacing. You can nest enums, structs, and classes within each other.

### Basic Nesting

\`\`\`swift
struct Card {
    enum Suit: String {
        case hearts, diamonds, clubs, spades
    }
    enum Rank: Int {
        case ace = 1, two, three, four, five
        case six, seven, eight, nine, ten
        case jack, queen, king
    }

    let suit: Suit
    let rank: Rank
}

let card = Card(suit: .hearts, rank: .ace)
\`\`\`

### Namespacing

Nested types are accessed via the outer type:

\`\`\`swift
let suit = Card.Suit.hearts
\`\`\`

### Multi-Level Nesting

\`\`\`swift
struct App {
    struct Config {
        struct Theme {
            var primaryColor: String
            var fontSize: Int
        }
        var theme: Theme
    }
    var config: Config
}
\`\`\`

### Nested Types in Extensions

You can add nested types via extensions:

\`\`\`swift
extension Card {
    enum Color {
        case red, black
    }
    var color: Color {
        switch suit {
        case .hearts, .diamonds: return .red
        case .clubs, .spades: return .black
        }
    }
}
\`\`\`
`,
  exercises: [
    {
      id: 'swift-nested-1',
      title: 'Nested Enum in Struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Define a nested enum inside a struct.',
      skeleton: `struct TrafficLight {
    ___ State {
        case red, yellow, green
    }

    var state: State = .red
}

let light = TrafficLight()
print(light.state)`,
      solution: `struct TrafficLight {
    enum State {
        case red, yellow, green
    }

    var state: State = .red
}

let light = TrafficLight()
print(light.state)`,
      hints: [
        'Define an enum inside the struct.',
        'Use the enum keyword.',
        'The answer is enum.',
      ],
      concepts: ['nested-enum', 'struct'],
    },
    {
      id: 'swift-nested-2',
      title: 'Access Nested Type Externally',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Access a nested type from outside the enclosing type.',
      skeleton: `struct Database {
    enum Status {
        case connected, disconnected, error
    }
    var status: Status = .disconnected
}

let status: ___ = .connected
print(status)`,
      solution: `struct Database {
    enum Status {
        case connected, disconnected, error
    }
    var status: Status = .disconnected
}

let status: Database.Status = .connected
print(status)`,
      hints: [
        'Nested types are accessed through the outer type.',
        'Use dot notation: OuterType.InnerType.',
        'The answer is Database.Status.',
      ],
      concepts: ['nested-type-access', 'namespacing'],
    },
    {
      id: 'swift-nested-3',
      title: 'Nested Struct Configuration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Create a nested struct to hold configuration.',
      skeleton: `struct Server {
    struct ___ {
        var host: String
        var port: Int
    }

    var config: Config

    init(host: String, port: Int) {
        self.config = Config(host: host, port: port)
    }
}

let server = Server(host: "localhost", port: 8080)
print(server.config.host)`,
      solution: `struct Server {
    struct Config {
        var host: String
        var port: Int
    }

    var config: Config

    init(host: String, port: Int) {
        self.config = Config(host: host, port: port)
    }
}

let server = Server(host: "localhost", port: 8080)
print(server.config.host)`,
      hints: [
        'The nested struct name should match the property type.',
        'It is used as the type of config.',
        'The answer is Config.',
      ],
      concepts: ['nested-struct', 'configuration-pattern'],
    },
    {
      id: 'swift-nested-4',
      title: 'Nested Class in Struct',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Define a nested class inside a struct.',
      skeleton: `struct GameEngine {
    ___ Entity {
        var name: String
        var x: Double = 0
        var y: Double = 0
        init(name: String) { self.name = name }
    }

    var entities: [Entity] = []

    mutating func spawn(_ name: String) {
        entities.append(Entity(name: name))
    }
}`,
      solution: `struct GameEngine {
    class Entity {
        var name: String
        var x: Double = 0
        var y: Double = 0
        init(name: String) { self.name = name }
    }

    var entities: [Entity] = []

    mutating func spawn(_ name: String) {
        entities.append(Entity(name: name))
    }
}`,
      hints: [
        'Entity needs reference semantics for shared state.',
        'Use class for reference types.',
        'The answer is class.',
      ],
      concepts: ['nested-class', 'reference-semantics'],
    },
    {
      id: 'swift-nested-5',
      title: 'Multi-Level Nesting',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Access a deeply nested type.',
      skeleton: `struct UI {
    struct Components {
        struct Button {
            enum Style {
                case primary, secondary, danger
            }
            var style: Style
            var label: String
        }
    }
}

let style: ___ = .primary`,
      solution: `struct UI {
    struct Components {
        struct Button {
            enum Style {
                case primary, secondary, danger
            }
            var style: Style
            var label: String
        }
    }
}

let style: UI.Components.Button.Style = .primary`,
      hints: [
        'Chain through all nesting levels with dots.',
        'UI -> Components -> Button -> Style.',
        'The answer is UI.Components.Button.Style.',
      ],
      concepts: ['deep-nesting', 'namespacing'],
    },
    {
      id: 'swift-nested-6',
      title: 'Nested Type in Extension',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a nested type via an extension.',
      skeleton: `struct Temperature {
    var value: Double
}

___ Temperature {
    enum Scale {
        case celsius, fahrenheit, kelvin
    }
}

let scale = Temperature.Scale.celsius`,
      solution: `struct Temperature {
    var value: Double
}

extension Temperature {
    enum Scale {
        case celsius, fahrenheit, kelvin
    }
}

let scale = Temperature.Scale.celsius`,
      hints: [
        'Extensions can add nested types to existing types.',
        'Use the extension keyword.',
        'The answer is extension.',
      ],
      concepts: ['extensions', 'nested-types'],
    },
    {
      id: 'swift-nested-7',
      title: 'Write a Card Deck with Nested Types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a Deck struct with nested Suit and Rank enums and a Card struct.',
      skeleton: `// Write a Deck struct containing:
// - enum Suit with cases hearts, diamonds, clubs, spades
// - enum Rank: Int with ace=1 through king=13
// - struct Card with suit: Suit and rank: Rank
// - a method allCards() -> [Card] that returns all 52 cards
`,
      solution: `struct Deck {
    enum Suit: CaseIterable {
        case hearts, diamonds, clubs, spades
    }

    enum Rank: Int, CaseIterable {
        case ace = 1, two, three, four, five, six
        case seven, eight, nine, ten, jack, queen, king
    }

    struct Card {
        let suit: Suit
        let rank: Rank
    }

    func allCards() -> [Card] {
        var cards: [Card] = []
        for suit in Suit.allCases {
            for rank in Rank.allCases {
                cards.append(Card(suit: suit, rank: rank))
            }
        }
        return cards
    }
}`,
      hints: [
        'Conform enums to CaseIterable for allCases.',
        'Use nested loops over suits and ranks.',
        'Return an array of Card.',
      ],
      concepts: ['nested-types', 'CaseIterable', 'struct-design'],
    },
    {
      id: 'swift-nested-8',
      title: 'Write a State Machine with Nested Types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct with a nested State enum and transition method.',
      skeleton: `// Write an OrderProcessor struct containing:
// - enum State: pending, processing, shipped, delivered, cancelled
// - var state: State starting at .pending
// - mutating func advance() that moves to the next state
//   (pending->processing->shipped->delivered; no change at delivered)
// - mutating func cancel() that sets state to .cancelled
`,
      solution: `struct OrderProcessor {
    enum State {
        case pending, processing, shipped, delivered, cancelled
    }

    var state: State = .pending

    mutating func advance() {
        switch state {
        case .pending: state = .processing
        case .processing: state = .shipped
        case .shipped: state = .delivered
        case .delivered: break
        case .cancelled: break
        }
    }

    mutating func cancel() {
        state = .cancelled
    }
}`,
      hints: [
        'Use a switch on the current state to determine the next.',
        'delivered and cancelled are terminal states.',
        'advance() does nothing at delivered or cancelled.',
      ],
      concepts: ['state-machine', 'nested-enum', 'mutating-methods'],
    },
    {
      id: 'swift-nested-9',
      title: 'Write a Namespace Container',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write a caseless enum used purely for namespacing constants.',
      skeleton: `// Write an enum Constants (no cases) that contains:
// - nested struct API with static let baseURL = "https://api.example.com"
//   and static let version = "v2"
// - nested struct UI with static let cornerRadius = 8.0
//   and static let animationDuration = 0.3
`,
      solution: `enum Constants {
    struct API {
        static let baseURL = "https://api.example.com"
        static let version = "v2"
    }
    struct UI {
        static let cornerRadius = 8.0
        static let animationDuration = 0.3
    }
}`,
      hints: [
        'A caseless enum cannot be instantiated, making it a pure namespace.',
        'Use static let for constants.',
        'Access as Constants.API.baseURL.',
      ],
      concepts: ['namespacing', 'caseless-enum', 'static-properties'],
    },
    {
      id: 'swift-nested-10',
      title: 'Write a Builder with Nested Config',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct with a nested Options struct for builder-pattern configuration.',
      skeleton: `// Write a NetworkRequest struct with:
// - nested struct Options with var timeout: Double = 30,
//   var retries: Int = 3, var cachePolicy: String = "default"
// - let url: String
// - var options: Options
// - init(url:) that uses default Options
`,
      solution: `struct NetworkRequest {
    struct Options {
        var timeout: Double = 30
        var retries: Int = 3
        var cachePolicy: String = "default"
    }

    let url: String
    var options: Options

    init(url: String) {
        self.url = url
        self.options = Options()
    }
}`,
      hints: [
        'Options gets a default memberwise initializer from its defaults.',
        'The outer init creates Options() with all defaults.',
        'Users can modify options after creation.',
      ],
      concepts: ['nested-struct', 'default-values', 'builder-pattern'],
    },
    {
      id: 'swift-nested-11',
      title: 'Write a Linked List with Nested Node',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a struct with a nested class Node for a singly linked list.',
      skeleton: `// Write a LinkedList<T> struct with:
// - nested class Node<T> with value: T and next: Node<T>?
// - var head: Node<T>?
// - mutating func prepend(_ value: T) that adds to the front
// - func toArray() -> [T] that returns all values
`,
      solution: `struct LinkedList<T> {
    class Node {
        var value: T
        var next: Node?
        init(value: T, next: Node? = nil) {
            self.value = value
            self.next = next
        }
    }

    var head: Node?

    mutating func prepend(_ value: T) {
        head = Node(value: value, next: head)
    }

    func toArray() -> [T] {
        var result: [T] = []
        var current = head
        while let node = current {
            result.append(node.value)
            current = node.next
        }
        return result
    }
}`,
      hints: [
        'Node needs to be a class for reference semantics.',
        'The nested Node uses the outer generic parameter T.',
        'Walk the list with while let for toArray.',
      ],
      concepts: ['nested-class', 'generics', 'linked-list'],
    },
    {
      id: 'swift-nested-12',
      title: 'Write an Error Domain with Nested Types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct that uses nested enums for categorized errors.',
      skeleton: `// Write a ValidationError enum with nested enums:
// - enum Field: name, email, password
// - enum Reason: empty, tooShort, invalid
// - case fieldError(field: Field, reason: Reason)
// - a var description: String property
`,
      solution: `enum ValidationError: CustomStringConvertible {
    enum Field: String {
        case name, email, password
    }
    enum Reason: String {
        case empty, tooShort, invalid
    }

    case fieldError(field: Field, reason: Reason)

    var description: String {
        switch self {
        case .fieldError(let field, let reason):
            return "\\(field.rawValue) is \\(reason.rawValue)"
        }
    }
}`,
      hints: [
        'Nest Field and Reason enums inside the error enum.',
        'Use associated values for the case.',
        'Use rawValue for the description.',
      ],
      concepts: ['nested-enum', 'associated-values', 'error-types'],
    },
    {
      id: 'swift-nested-13',
      title: 'Fix Missing Nested Type Qualifier',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code that references a nested type without its qualifier.',
      skeleton: `struct Printer {
    enum PaperSize {
        case a4, letter, legal
    }
    var paperSize: PaperSize = .a4
}

let size: PaperSize = .letter
print(size)`,
      solution: `struct Printer {
    enum PaperSize {
        case a4, letter, legal
    }
    var paperSize: PaperSize = .a4
}

let size: Printer.PaperSize = .letter
print(size)`,
      hints: [
        'PaperSize is nested inside Printer.',
        'You must qualify it as Printer.PaperSize outside the struct.',
        'Nested types need their enclosing type name.',
      ],
      concepts: ['nested-type-access', 'namespacing'],
    },
    {
      id: 'swift-nested-14',
      title: 'Fix Nested Type Initialization',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the incorrect initialization of a nested type.',
      skeleton: `struct Logger {
    struct Entry {
        let message: String
        let level: Level
    }

    enum Level {
        case info, warning, error
    }

    var entries: [Entry] = []

    mutating func log(_ msg: String, level: Level) {
        entries.append(Logger.Entry(message: msg, level: level))
    }
}

var logger = Logger()
logger.log("Started", level: Logger.info)`,
      solution: `struct Logger {
    struct Entry {
        let message: String
        let level: Level
    }

    enum Level {
        case info, warning, error
    }

    var entries: [Entry] = []

    mutating func log(_ msg: String, level: Level) {
        entries.append(Logger.Entry(message: msg, level: level))
    }
}

var logger = Logger()
logger.log("Started", level: Logger.Level.info)`,
      hints: [
        'info is a case of the nested Level enum.',
        'Access it as Logger.Level.info.',
        'Or simply .info if the type can be inferred.',
      ],
      concepts: ['nested-enum-access', 'type-inference'],
    },
    {
      id: 'swift-nested-15',
      title: 'Fix Nested Type Scope Issue',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the nested type that cannot access the outer type property.',
      skeleton: `struct Container {
    var items: [String] = []

    struct Iterator {
        var index: Int = 0

        mutating func next(from container: Container) -> String? {
            guard index < container.items.count else { return nil }
            let item = container.items[index]
            index += 1
            return item
        }
    }

    func makeIterator() -> Iterator {
        return Iterator(index: 0)
    }
}

var c = Container(items: ["a", "b", "c"])
var iter = c.makeIterator()
while let item = iter.next(from: c) {
    print(item)
}`,
      solution: `struct Container {
    var items: [String] = []

    struct Iterator {
        let items: [String]
        var index: Int = 0

        mutating func next() -> String? {
            guard index < items.count else { return nil }
            let item = items[index]
            index += 1
            return item
        }
    }

    func makeIterator() -> Iterator {
        return Iterator(items: items, index: 0)
    }
}

var c = Container(items: ["a", "b", "c"])
var iter = c.makeIterator()
while let item = iter.next() {
    print(item)
}`,
      hints: [
        'Nested structs do not automatically access outer type properties.',
        'Pass the items array to the Iterator at creation time.',
        'The Iterator should store its own copy of items.',
      ],
      concepts: ['nested-type-scope', 'value-semantics', 'iterator-pattern'],
    },
    {
      id: 'swift-nested-16',
      title: 'Predict Nested Enum Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the output when using a nested enum.',
      skeleton: `struct Compass {
    enum Direction {
        case north, south, east, west
    }
    var heading: Direction
}

let c = Compass(heading: .north)
print(c.heading)
print(c.heading == .north)`,
      solution: `north
true`,
      hints: [
        'The heading is set to .north.',
        'Printing an enum case shows its name.',
        'Comparing with == returns true.',
      ],
      concepts: ['nested-enum', 'enum-comparison'],
    },
    {
      id: 'swift-nested-17',
      title: 'Predict Nested Struct Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the output of nested struct value semantics.',
      skeleton: `struct Outer {
    struct Inner {
        var value: Int
    }
    var inner: Inner
}

var a = Outer(inner: Outer.Inner(value: 10))
var b = a
b.inner.value = 20
print(a.inner.value)
print(b.inner.value)`,
      solution: `10
20`,
      hints: [
        'Structs have value semantics.',
        'b is a copy of a, not a reference.',
        'Modifying b does not affect a.',
      ],
      concepts: ['value-semantics', 'nested-struct', 'copy-on-write'],
    },
    {
      id: 'swift-nested-18',
      title: 'Predict Type Name Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the output of type names for nested types.',
      skeleton: `struct Zoo {
    struct Animal {
        enum Species {
            case lion, tiger, bear
        }
        var species: Species
    }
}

let animal = Zoo.Animal(species: .lion)
print(type(of: animal))
print(type(of: animal.species))`,
      solution: `Animal
Species`,
      hints: [
        'type(of:) returns the dynamic type.',
        'Swift prints the unqualified type name.',
        'Animal and Species, not Zoo.Animal or Zoo.Animal.Species.',
      ],
      concepts: ['metatype', 'nested-type-names'],
    },
    {
      id: 'swift-nested-19',
      title: 'Refactor Global Types into Nested Types',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor global types into nested types for better namespacing.',
      skeleton: `enum HTTPMethod {
    case get, post, put, delete
}

enum HTTPStatus: Int {
    case ok = 200
    case notFound = 404
    case serverError = 500
}

struct HTTPRequest {
    var url: String
    var method: HTTPMethod
}

struct HTTPResponse {
    var status: HTTPStatus
    var body: String
}`,
      solution: `enum HTTP {
    enum Method {
        case get, post, put, delete
    }

    enum Status: Int {
        case ok = 200
        case notFound = 404
        case serverError = 500
    }

    struct Request {
        var url: String
        var method: Method
    }

    struct Response {
        var status: Status
        var body: String
    }
}`,
      hints: [
        'Create an HTTP namespace using a caseless enum.',
        'Move all related types inside the namespace.',
        'Remove the HTTP prefix from each type name.',
      ],
      concepts: ['namespacing', 'refactoring', 'caseless-enum'],
    },
    {
      id: 'swift-nested-20',
      title: 'Refactor Flat Constants to Nested Namespaces',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Refactor flat static constants into nested namespaces.',
      skeleton: `struct AppConfig {
    static let apiBaseURL = "https://api.example.com"
    static let apiVersion = "v3"
    static let apiTimeout = 30.0
    static let uiCornerRadius = 8.0
    static let uiPadding = 16.0
    static let uiAnimationDuration = 0.25
    static let cacheMaxSize = 1024
    static let cacheTTL = 3600
}`,
      solution: `enum AppConfig {
    enum API {
        static let baseURL = "https://api.example.com"
        static let version = "v3"
        static let timeout = 30.0
    }
    enum UI {
        static let cornerRadius = 8.0
        static let padding = 16.0
        static let animationDuration = 0.25
    }
    enum Cache {
        static let maxSize = 1024
        static let ttl = 3600
    }
}`,
      hints: [
        'Group constants by their prefix (api, ui, cache).',
        'Create nested caseless enums for each group.',
        'Remove the prefix from each constant name.',
      ],
      concepts: ['namespacing', 'organization', 'caseless-enum'],
    },
  ],
};
