import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-factory',
  title: '43. Factory',
  explanation: `## Factory Pattern in Swift

The Factory pattern creates objects without exposing the creation logic. Swift's protocols and enums make this pattern elegant.

### Protocol Factory

\`\`\`swift
protocol Vehicle { func drive() -> String }
struct Car: Vehicle { func drive() -> String { "Driving car" } }
struct Truck: Vehicle { func drive() -> String { "Driving truck" } }

struct VehicleFactory {
    static func make(type: String) -> Vehicle {
        switch type {
        case "car": return Car()
        case "truck": return Truck()
        default: fatalError("Unknown type")
        }
    }
}
\`\`\`

### Enum Factory

\`\`\`swift
enum ButtonStyle {
    case primary, secondary, danger

    func makeButton(title: String) -> UIButton {
        let button = UIButton()
        button.setTitle(title, for: .normal)
        switch self {
        case .primary: button.backgroundColor = .blue
        case .secondary: button.backgroundColor = .gray
        case .danger: button.backgroundColor = .red
        }
        return button
    }
}
\`\`\`

### Generic Factory

\`\`\`swift
struct Factory<T> {
    let create: () -> T
    func make() -> T { create() }
}
\`\`\`
`,
  exercises: [
    {
      id: 'swift-factory-1',
      title: 'Basic Factory Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Create a factory method that returns a protocol type.',
      skeleton: `protocol Shape { func area() -> Double }
struct Circle: Shape { let r: Double; func area() -> Double { .pi * r * r } }
struct Square: Shape { let s: Double; func area() -> Double { s * s } }

struct ShapeFactory {
    ___ func make(type: String, size: Double) -> Shape {
        switch type {
        case "circle": return Circle(r: size)
        case "square": return Square(s: size)
        default: fatalError("Unknown")
        }
    }
}`,
      solution: `protocol Shape { func area() -> Double }
struct Circle: Shape { let r: Double; func area() -> Double { .pi * r * r } }
struct Square: Shape { let s: Double; func area() -> Double { s * s } }

struct ShapeFactory {
    static func make(type: String, size: Double) -> Shape {
        switch type {
        case "circle": return Circle(r: size)
        case "square": return Square(s: size)
        default: fatalError("Unknown")
        }
    }
}`,
      hints: ['Factory methods are typically static.', 'They return the protocol type, hiding the concrete type.', 'The answer is static.'],
      concepts: ['factory-method', 'static-method'],
    },
    {
      id: 'swift-factory-2',
      title: 'Enum-Based Factory',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use an enum to define factory variants.',
      skeleton: `enum Theme {
    case light, dark, highContrast

    var backgroundColor: String {
        ___ self {
        case .light: return "#FFFFFF"
        case .dark: return "#1A1A2E"
        case .highContrast: return "#000000"
        }
    }

    var textColor: String {
        switch self {
        case .light: return "#000000"
        case .dark: return "#FFFFFF"
        case .highContrast: return "#FFFF00"
        }
    }
}`,
      solution: `enum Theme {
    case light, dark, highContrast

    var backgroundColor: String {
        switch self {
        case .light: return "#FFFFFF"
        case .dark: return "#1A1A2E"
        case .highContrast: return "#000000"
        }
    }

    var textColor: String {
        switch self {
        case .light: return "#000000"
        case .dark: return "#FFFFFF"
        case .highContrast: return "#FFFF00"
        }
    }
}`,
      hints: ['Switch on self to determine the variant.', 'Each case returns a different value.', 'The answer is switch.'],
      concepts: ['enum-factory', 'computed-properties'],
    },
    {
      id: 'swift-factory-3',
      title: 'Generic Factory',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Create a generic factory struct.',
      skeleton: `struct Factory<___> {
    let create: () -> T

    func make() -> T {
        return create()
    }
}

let intFactory = Factory { Int.random(in: 1...100) }
print(intFactory.make())`,
      solution: `struct Factory<T> {
    let create: () -> T

    func make() -> T {
        return create()
    }
}

let intFactory = Factory { Int.random(in: 1...100) }
print(intFactory.make())`,
      hints: ['The factory is generic over the product type.', 'Use a type parameter.', 'The answer is T.'],
      concepts: ['generic-factory', 'closure'],
    },
    {
      id: 'swift-factory-4',
      title: 'Factory with Registration',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Create a factory that supports runtime registration.',
      skeleton: `class ServiceFactory {
    private var creators: [String: () -> Any] = [:]

    func ___(name: String, creator: @escaping () -> Any) {
        creators[name] = creator
    }

    func create(_ name: String) -> Any? {
        return creators[name]?()
    }
}`,
      solution: `class ServiceFactory {
    private var creators: [String: () -> Any] = [:]

    func register(name: String, creator: @escaping () -> Any) {
        creators[name] = creator
    }

    func create(_ name: String) -> Any? {
        return creators[name]?()
    }
}`,
      hints: ['The method adds a creator closure to the dictionary.', 'It maps a name to a factory closure.', 'The answer is register.'],
      concepts: ['registration-factory', 'dynamic-creation'],
    },
    {
      id: 'swift-factory-5',
      title: 'Abstract Factory Protocol',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Define an abstract factory protocol.',
      skeleton: `protocol UIFactory {
    associatedtype Button
    associatedtype Label

    func makeButton(title: String) -> ___
    func makeLabel(text: String) -> ___
}`,
      solution: `protocol UIFactory {
    associatedtype Button
    associatedtype Label

    func makeButton(title: String) -> Button
    func makeLabel(text: String) -> Label
}`,
      hints: ['The return types match the associated types.', 'Each factory method returns its associated type.', 'The answers are Button and Label.'],
      concepts: ['abstract-factory', 'associated-types'],
    },
    {
      id: 'swift-factory-6',
      title: 'Factory Return Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use opaque return type for a factory method.',
      skeleton: `protocol Logger { func log(_ msg: String) }
struct ConsoleLogger: Logger { func log(_ msg: String) { print(msg) } }
struct FileLogger: Logger { func log(_ msg: String) { /* write to file */ } }

func makeLogger(console: Bool) -> ___ Logger {
    if console {
        return ConsoleLogger()
    }
    return FileLogger()
}`,
      solution: `protocol Logger { func log(_ msg: String) }
struct ConsoleLogger: Logger { func log(_ msg: String) { print(msg) } }
struct FileLogger: Logger { func log(_ msg: String) { /* write to file */ } }

func makeLogger(console: Bool) -> any Logger {
    if console {
        return ConsoleLogger()
    }
    return FileLogger()
}`,
      hints: ['Different branches return different types.', 'Use any for existential return types.', 'some requires the same concrete type.'],
      concepts: ['existential-type', 'factory-return-type'],
    },
    {
      id: 'swift-factory-7',
      title: 'Write a Document Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a factory that creates different document types.',
      skeleton: `// Write:
// - protocol Document with var content: String and func render() -> String
// - struct HTMLDocument, MarkdownDocument, PlainTextDocument conforming to Document
// - enum DocumentType { case html, markdown, plain }
// - struct DocumentFactory with static func create(type:content:) -> Document
`,
      solution: `protocol Document {
    var content: String { get }
    func render() -> String
}

struct HTMLDocument: Document {
    let content: String
    func render() -> String { "<html><body>\\(content)</body></html>" }
}

struct MarkdownDocument: Document {
    let content: String
    func render() -> String { "# Document\\n\\n\\(content)" }
}

struct PlainTextDocument: Document {
    let content: String
    func render() -> String { content }
}

enum DocumentType {
    case html, markdown, plain
}

struct DocumentFactory {
    static func create(type: DocumentType, content: String) -> any Document {
        switch type {
        case .html: return HTMLDocument(content: content)
        case .markdown: return MarkdownDocument(content: content)
        case .plain: return PlainTextDocument(content: content)
        }
    }
}`,
      hints: ['Each document type renders content differently.', 'The factory switches on DocumentType.', 'Return the protocol type.'],
      concepts: ['factory-pattern', 'protocol', 'enum-dispatch'],
    },
    {
      id: 'swift-factory-8',
      title: 'Write a Dependency Container',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a simple dependency injection container using factory pattern.',
      skeleton: `// Write a class Container with:
// - func register<T>(_ type: T.Type, factory: @escaping () -> T)
// - func resolve<T>(_ type: T.Type) -> T?
// Uses a dictionary with String(describing:) as keys
`,
      solution: `class Container {
    private var factories: [String: () -> Any] = [:]

    func register<T>(_ type: T.Type, factory: @escaping () -> T) {
        let key = String(describing: type)
        factories[key] = factory
    }

    func resolve<T>(_ type: T.Type) -> T? {
        let key = String(describing: type)
        return factories[key]?() as? T
    }
}`,
      hints: ['Use the type name as a dictionary key.', 'Store factories as () -> Any closures.', 'Cast back to T when resolving.'],
      concepts: ['dependency-injection', 'generic-factory', 'type-erasure'],
    },
    {
      id: 'swift-factory-9',
      title: 'Write an Enum Factory with Config',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write an enum factory that creates configured instances.',
      skeleton: `// Write an enum Environment (dev, staging, production) with:
// - var baseURL: String
// - var timeout: Double
// - var logLevel: String
// - func makeConfig() -> [String: Any] that returns all values
`,
      solution: `enum Environment {
    case dev, staging, production

    var baseURL: String {
        switch self {
        case .dev: return "http://localhost:3000"
        case .staging: return "https://staging.api.com"
        case .production: return "https://api.com"
        }
    }

    var timeout: Double {
        switch self {
        case .dev: return 60
        case .staging: return 30
        case .production: return 15
        }
    }

    var logLevel: String {
        switch self {
        case .dev: return "debug"
        case .staging: return "info"
        case .production: return "error"
        }
    }

    func makeConfig() -> [String: Any] {
        return [
            "baseURL": baseURL,
            "timeout": timeout,
            "logLevel": logLevel,
        ]
    }
}`,
      hints: ['Each environment has different values.', 'Computed properties switch on self.', 'makeConfig aggregates all values.'],
      concepts: ['enum-factory', 'configuration'],
    },
    {
      id: 'swift-factory-10',
      title: 'Write a Builder-Factory Hybrid',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a factory that uses builder pattern for complex object creation.',
      skeleton: `// Write a RequestBuilder class with:
// - var url: String, method: String, headers: [String: String], body: Data?
// - func setURL/setMethod/addHeader/setBody returning Self
// - func build() -> URLRequest
// - static factory methods: get(_:), post(_:body:)
`,
      solution: `import Foundation

class RequestBuilder {
    private var url: String = ""
    private var method: String = "GET"
    private var headers: [String: String] = [:]
    private var body: Data?

    @discardableResult
    func setURL(_ url: String) -> RequestBuilder {
        self.url = url
        return self
    }

    @discardableResult
    func setMethod(_ method: String) -> RequestBuilder {
        self.method = method
        return self
    }

    @discardableResult
    func addHeader(_ key: String, value: String) -> RequestBuilder {
        headers[key] = value
        return self
    }

    @discardableResult
    func setBody(_ body: Data) -> RequestBuilder {
        self.body = body
        return self
    }

    func build() -> URLRequest {
        var request = URLRequest(url: URL(string: url)!)
        request.httpMethod = method
        for (key, value) in headers {
            request.setValue(value, forHTTPHeaderField: key)
        }
        request.httpBody = body
        return request
    }

    static func get(_ url: String) -> URLRequest {
        return RequestBuilder().setURL(url).setMethod("GET").build()
    }

    static func post(_ url: String, body: Data) -> URLRequest {
        return RequestBuilder().setURL(url).setMethod("POST").setBody(body).build()
    }
}`,
      hints: ['Builder methods return self for chaining.', 'Static factory methods provide convenient shortcuts.', 'build() creates the final URLRequest.'],
      concepts: ['builder-pattern', 'factory-method', 'method-chaining'],
    },
    {
      id: 'swift-factory-11',
      title: 'Write a Closure-Based Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write factory functions that return configured closures.',
      skeleton: `// Write factory functions that return closures:
// - makeAdder(_ n: Int) -> (Int) -> Int
// - makeMultiplier(_ n: Int) -> (Int) -> Int
// - makeFormatter(prefix: String, suffix: String) -> (String) -> String
`,
      solution: `func makeAdder(_ n: Int) -> (Int) -> Int {
    return { x in x + n }
}

func makeMultiplier(_ n: Int) -> (Int) -> Int {
    return { x in x * n }
}

func makeFormatter(prefix: String, suffix: String) -> (String) -> String {
    return { text in "\\(prefix)\\(text)\\(suffix)" }
}`,
      hints: ['Each factory captures parameters in the returned closure.', 'The returned closure uses the captured values.', 'This is a functional factory pattern.'],
      concepts: ['closure-factory', 'capturing'],
    },
    {
      id: 'swift-factory-12',
      title: 'Write a Protocol Factory Extension',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a factory as a protocol extension.',
      skeleton: `// Write a protocol Creatable with:
// - associatedtype Config
// - static func create(config: Config) -> Self
// Then provide a default implementation for types where Config == Void
`,
      solution: `protocol Creatable {
    associatedtype Config
    static func create(config: Config) -> Self
}

extension Creatable where Config == Void {
    static func create() -> Self {
        return create(config: ())
    }
}

struct SimpleWidget: Creatable {
    typealias Config = Void
    static func create(config: Void) -> SimpleWidget {
        return SimpleWidget()
    }
}

struct ConfiguredWidget: Creatable {
    let color: String
    typealias Config = String
    static func create(config: String) -> ConfiguredWidget {
        return ConfiguredWidget(color: config)
    }
}`,
      hints: ['Use associatedtype for the configuration type.', 'Where Config == Void, provide a no-argument overload.', 'Self refers to the conforming type.'],
      concepts: ['protocol-factory', 'associated-type', 'conditional-extension'],
    },
    {
      id: 'swift-factory-13',
      title: 'Fix Factory Missing Case',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the factory that crashes on a valid input.',
      skeleton: `enum Notification {
    case success(String)
    case warning(String)
    case error(String)
    case info(String)
}

func makeNotification(type: String, message: String) -> Notification {
    switch type {
    case "success": return .success(message)
    case "warning": return .warning(message)
    case "error": return .error(message)
    default: fatalError("Unknown type: \\(type)")
    }
}

let n = makeNotification(type: "info", message: "Hello") // Crashes!`,
      solution: `enum Notification {
    case success(String)
    case warning(String)
    case error(String)
    case info(String)
}

func makeNotification(type: String, message: String) -> Notification {
    switch type {
    case "success": return .success(message)
    case "warning": return .warning(message)
    case "error": return .error(message)
    case "info": return .info(message)
    default: return .info(message)
    }
}`,
      hints: ['The "info" case is missing from the switch.', 'Add case "info" before the default.', 'Consider a safe default instead of fatalError.'],
      concepts: ['exhaustive-switch', 'factory-safety'],
    },
    {
      id: 'swift-factory-14',
      title: 'Fix Factory Return Type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the factory that returns concrete types instead of the protocol.',
      skeleton: `protocol Drawable { func draw() -> String }
struct Circle: Drawable { func draw() -> String { "O" } }
struct Square: Drawable { func draw() -> String { "[]" } }

func makeShape(_ type: String) -> Circle {
    switch type {
    case "circle": return Circle()
    case "square": return Square()
    default: return Circle()
    }
}`,
      solution: `protocol Drawable { func draw() -> String }
struct Circle: Drawable { func draw() -> String { "O" } }
struct Square: Drawable { func draw() -> String { "[]" } }

func makeShape(_ type: String) -> any Drawable {
    switch type {
    case "circle": return Circle()
    case "square": return Square()
    default: return Circle()
    }
}`,
      hints: ['Return type Circle cannot hold a Square.', 'Return the protocol type instead.', 'Use any Drawable for existential return.'],
      concepts: ['protocol-return-type', 'factory-pattern'],
    },
    {
      id: 'swift-factory-15',
      title: 'Fix Non-Extensible Factory',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Fix a factory that requires modification to add new types.',
      skeleton: `protocol Parser { func parse(_ input: String) -> Any }
struct JSONParser: Parser { func parse(_ input: String) -> Any { return [:] } }
struct XMLParser: Parser { func parse(_ input: String) -> Any { return "" } }

class ParserFactory {
    func make(_ format: String) -> Parser {
        switch format {
        case "json": return JSONParser()
        case "xml": return XMLParser()
        default: fatalError("Add new case here every time")
        }
    }
}`,
      solution: `protocol Parser { func parse(_ input: String) -> Any }
struct JSONParser: Parser { func parse(_ input: String) -> Any { return [:] } }
struct XMLParser: Parser { func parse(_ input: String) -> Any { return "" } }

class ParserFactory {
    private var creators: [String: () -> Parser] = [:]

    init() {
        register("json") { JSONParser() }
        register("xml") { XMLParser() }
    }

    func register(_ format: String, creator: @escaping () -> Parser) {
        creators[format] = creator
    }

    func make(_ format: String) -> Parser? {
        return creators[format]?()
    }
}`,
      hints: ['Use a registration-based factory.', 'New types can be added via register().', 'No need to modify the factory code.'],
      concepts: ['open-closed-principle', 'registration-factory'],
    },
    {
      id: 'swift-factory-16',
      title: 'Predict Factory Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the output of a factory method.',
      skeleton: `protocol Animal { var sound: String { get } }
struct Dog: Animal { let sound = "Woof" }
struct Cat: Animal { let sound = "Meow" }

func makeAnimal(_ type: String) -> any Animal {
    type == "dog" ? Dog() : Cat()
}

print(makeAnimal("dog").sound)
print(makeAnimal("cat").sound)
print(makeAnimal("fish").sound)`,
      solution: `Woof
Meow
Meow`,
      hints: ['"dog" returns Dog with Woof.', '"cat" returns Cat with Meow.', '"fish" is not "dog", so Cat() with Meow.'],
      concepts: ['factory-method', 'ternary-operator'],
    },
    {
      id: 'swift-factory-17',
      title: 'Predict Enum Factory Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the output of an enum-based factory.',
      skeleton: `enum Size {
    case small, medium, large

    var points: Int {
        switch self {
        case .small: return 12
        case .medium: return 16
        case .large: return 24
        }
    }
}

let sizes: [Size] = [.large, .small, .medium]
let total = sizes.reduce(0) { $0 + $1.points }
print(total)`,
      solution: `52`,
      hints: ['large=24, small=12, medium=16.', '24 + 12 + 16 = 52.', 'reduce sums all point values.'],
      concepts: ['enum-factory', 'reduce'],
    },
    {
      id: 'swift-factory-18',
      title: 'Predict Generic Factory',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the output of a generic factory.',
      skeleton: `struct Maker<T> {
    let value: () -> T
    func make() -> T { value() }
}

var counter = 0
let factory = Maker { () -> Int in
    counter += 1
    return counter
}

print(factory.make())
print(factory.make())
print(factory.make())`,
      solution: `1
2
3`,
      hints: ['Each call to make() calls the closure.', 'counter is captured by reference and increments.', 'Successive calls return 1, 2, 3.'],
      concepts: ['generic-factory', 'closure-capture'],
    },
    {
      id: 'swift-factory-19',
      title: 'Refactor Switch to Factory',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor a large switch statement into a factory pattern.',
      skeleton: `func processFile(_ path: String) -> String {
    let ext = path.split(separator: ".").last ?? ""
    switch ext {
    case "json":
        return "Parsing JSON from \\(path)"
    case "xml":
        return "Parsing XML from \\(path)"
    case "csv":
        return "Parsing CSV from \\(path)"
    case "yaml":
        return "Parsing YAML from \\(path)"
    default:
        return "Unknown format"
    }
}`,
      solution: `protocol FileProcessor {
    func process(_ path: String) -> String
}

struct JSONProcessor: FileProcessor {
    func process(_ path: String) -> String { "Parsing JSON from \\(path)" }
}
struct XMLProcessor: FileProcessor {
    func process(_ path: String) -> String { "Parsing XML from \\(path)" }
}
struct CSVProcessor: FileProcessor {
    func process(_ path: String) -> String { "Parsing CSV from \\(path)" }
}
struct YAMLProcessor: FileProcessor {
    func process(_ path: String) -> String { "Parsing YAML from \\(path)" }
}

class ProcessorFactory {
    private static let processors: [String: FileProcessor] = [
        "json": JSONProcessor(),
        "xml": XMLProcessor(),
        "csv": CSVProcessor(),
        "yaml": YAMLProcessor(),
    ]

    static func make(for ext: String) -> FileProcessor? {
        return processors[ext]
    }
}

func processFile(_ path: String) -> String {
    let ext = String(path.split(separator: ".").last ?? "")
    return ProcessorFactory.make(for: ext)?.process(path) ?? "Unknown format"
}`,
      hints: ['Extract each case into a separate type.', 'Use a dictionary for O(1) lookup.', 'New formats can be added without modifying the switch.'],
      concepts: ['factory-pattern', 'open-closed-principle', 'refactoring'],
    },
    {
      id: 'swift-factory-20',
      title: 'Refactor Constructor to Factory',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor complex constructor logic into factory methods.',
      skeleton: `struct DateRange {
    let start: Date
    let end: Date

    init(lastNDays n: Int) {
        self.end = Date()
        self.start = Calendar.current.date(byAdding: .day, value: -n, to: self.end)!
    }

    init(thisMonth: Bool) {
        let cal = Calendar.current
        let now = Date()
        self.start = cal.date(from: cal.dateComponents([.year, .month], from: now))!
        self.end = now
    }

    init(year: Int) {
        let cal = Calendar.current
        self.start = cal.date(from: DateComponents(year: year, month: 1, day: 1))!
        self.end = cal.date(from: DateComponents(year: year, month: 12, day: 31))!
    }
}`,
      solution: `struct DateRange {
    let start: Date
    let end: Date

    static func lastDays(_ n: Int) -> DateRange {
        let end = Date()
        let start = Calendar.current.date(byAdding: .day, value: -n, to: end)!
        return DateRange(start: start, end: end)
    }

    static func thisMonth() -> DateRange {
        let cal = Calendar.current
        let now = Date()
        let start = cal.date(from: cal.dateComponents([.year, .month], from: now))!
        return DateRange(start: start, end: now)
    }

    static func year(_ year: Int) -> DateRange {
        let cal = Calendar.current
        let start = cal.date(from: DateComponents(year: year, month: 1, day: 1))!
        let end = cal.date(from: DateComponents(year: year, month: 12, day: 31))!
        return DateRange(start: start, end: end)
    }
}`,
      hints: ['Replace init overloads with named static factory methods.', 'Factory methods are more descriptive.', 'DateRange.lastDays(7) reads better than DateRange(lastNDays: 7).'],
      concepts: ['static-factory', 'named-constructors', 'readability'],
    },
  ],
};
