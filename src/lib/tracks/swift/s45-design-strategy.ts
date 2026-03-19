import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-strategy',
  title: '45. Strategy',
  explanation: `## Strategy Pattern in Swift

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable.

### Protocol Strategy

\`\`\`swift
protocol SortStrategy {
    func sort(_ array: inout [Int])
}

struct BubbleSort: SortStrategy {
    func sort(_ array: inout [Int]) { /* bubble sort */ }
}

struct QuickSort: SortStrategy {
    func sort(_ array: inout [Int]) { /* quick sort */ }
}

class Sorter {
    var strategy: SortStrategy
    init(strategy: SortStrategy) { self.strategy = strategy }
    func sort(_ array: inout [Int]) { strategy.sort(&array) }
}
\`\`\`

### Closure Strategy

\`\`\`swift
struct Processor {
    var transform: (String) -> String

    func process(_ input: String) -> String {
        transform(input)
    }
}

let upper = Processor(transform: { $0.uppercased() })
let lower = Processor(transform: { $0.lowercased() })
\`\`\`

### Enum Strategy

\`\`\`swift
enum CompressionStrategy {
    case zip, gzip, lz4

    func compress(_ data: Data) -> Data {
        switch self {
        case .zip: return zipCompress(data)
        case .gzip: return gzipCompress(data)
        case .lz4: return lz4Compress(data)
        }
    }
}
\`\`\`
`,
  exercises: [
    {
      id: 'swift-strategy-1',
      title: 'Define a Strategy Protocol',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Define a protocol for interchangeable validation strategies.',
      skeleton: `___ ValidationStrategy {
    func validate(_ input: String) -> Bool
}

struct EmailValidator: ValidationStrategy {
    func validate(_ input: String) -> Bool { input.contains("@") }
}

struct PhoneValidator: ValidationStrategy {
    func validate(_ input: String) -> Bool { input.count == 10 && input.allSatisfy { $0.isNumber } }
}`,
      solution: `protocol ValidationStrategy {
    func validate(_ input: String) -> Bool
}

struct EmailValidator: ValidationStrategy {
    func validate(_ input: String) -> Bool { input.contains("@") }
}

struct PhoneValidator: ValidationStrategy {
    func validate(_ input: String) -> Bool { input.count == 10 && input.allSatisfy { $0.isNumber } }
}`,
      hints: ['The strategy interface is defined as a protocol.', 'Different validators conform to it.', 'The answer is protocol.'],
      concepts: ['strategy-protocol', 'polymorphism'],
    },
    {
      id: 'swift-strategy-2',
      title: 'Use a Strategy',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use strategy injection in a context class.',
      skeleton: `class FormField {
    var strategy: ValidationStrategy

    init(strategy: ___) {
        self.strategy = strategy
    }

    func isValid(_ input: String) -> Bool {
        strategy.validate(input)
    }
}

let emailField = FormField(strategy: EmailValidator())
print(emailField.isValid("test@test.com"))`,
      solution: `class FormField {
    var strategy: ValidationStrategy

    init(strategy: ValidationStrategy) {
        self.strategy = strategy
    }

    func isValid(_ input: String) -> Bool {
        strategy.validate(input)
    }
}

let emailField = FormField(strategy: EmailValidator())
print(emailField.isValid("test@test.com"))`,
      hints: ['The parameter type is the protocol.', 'Any conforming type can be passed.', 'The answer is ValidationStrategy.'],
      concepts: ['strategy-injection', 'polymorphism'],
    },
    {
      id: 'swift-strategy-3',
      title: 'Closure Strategy',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use a closure as a strategy.',
      skeleton: `struct TextProcessor {
    let transform: (String) -> ___

    func process(_ input: String) -> String {
        return transform(input)
    }
}

let shouter = TextProcessor(transform: { $0.uppercased() })
let whisperer = TextProcessor { $0.lowercased() }`,
      solution: `struct TextProcessor {
    let transform: (String) -> String

    func process(_ input: String) -> String {
        return transform(input)
    }
}

let shouter = TextProcessor(transform: { $0.uppercased() })
let whisperer = TextProcessor { $0.lowercased() }`,
      hints: ['The closure takes and returns a String.', 'The return type matches the process method.', 'The answer is String.'],
      concepts: ['closure-strategy', 'first-class-functions'],
    },
    {
      id: 'swift-strategy-4',
      title: 'Enum Strategy',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use an enum to represent strategy variants.',
      skeleton: `enum PricingStrategy {
    case regular
    case premium
    case student

    func calculate(basePrice: Double) -> Double {
        ___ self {
        case .regular: return basePrice
        case .premium: return basePrice * 1.5
        case .student: return basePrice * 0.7
        }
    }
}`,
      solution: `enum PricingStrategy {
    case regular
    case premium
    case student

    func calculate(basePrice: Double) -> Double {
        switch self {
        case .regular: return basePrice
        case .premium: return basePrice * 1.5
        case .student: return basePrice * 0.7
        }
    }
}`,
      hints: ['Switch on the enum value to pick the algorithm.', 'Each case applies a different pricing rule.', 'The answer is switch.'],
      concepts: ['enum-strategy', 'switch'],
    },
    {
      id: 'swift-strategy-5',
      title: 'Swap Strategy at Runtime',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Change the strategy at runtime.',
      skeleton: `protocol Renderer {
    func render(_ text: String) -> String
}

struct HTMLRenderer: Renderer {
    func render(_ text: String) -> String { "<p>\\(text)</p>" }
}

struct MarkdownRenderer: Renderer {
    func render(_ text: String) -> String { "**\\(text)**" }
}

class Document {
    ___ renderer: Renderer

    init(renderer: Renderer) { self.renderer = renderer }

    func display(_ text: String) -> String {
        renderer.render(text)
    }
}

let doc = Document(renderer: HTMLRenderer())
doc.renderer = MarkdownRenderer()`,
      solution: `protocol Renderer {
    func render(_ text: String) -> String
}

struct HTMLRenderer: Renderer {
    func render(_ text: String) -> String { "<p>\\(text)</p>" }
}

struct MarkdownRenderer: Renderer {
    func render(_ text: String) -> String { "**\\(text)**" }
}

class Document {
    var renderer: Renderer

    init(renderer: Renderer) { self.renderer = renderer }

    func display(_ text: String) -> String {
        renderer.render(text)
    }
}

let doc = Document(renderer: HTMLRenderer())
doc.renderer = MarkdownRenderer()`,
      hints: ['The strategy must be changeable after creation.', 'Use var for mutable properties.', 'The answer is var.'],
      concepts: ['runtime-strategy-swap', 'var-property'],
    },
    {
      id: 'swift-strategy-6',
      title: 'Generic Strategy',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Define a generic strategy protocol.',
      skeleton: `protocol Comparator {
    associatedtype ___
    func compare(_ a: Element, _ b: Element) -> Bool
}

struct AscendingInt: Comparator {
    func compare(_ a: Int, _ b: Int) -> Bool { a < b }
}

struct DescendingInt: Comparator {
    func compare(_ a: Int, _ b: Int) -> Bool { a > b }
}`,
      solution: `protocol Comparator {
    associatedtype Element
    func compare(_ a: Element, _ b: Element) -> Bool
}

struct AscendingInt: Comparator {
    func compare(_ a: Int, _ b: Int) -> Bool { a < b }
}

struct DescendingInt: Comparator {
    func compare(_ a: Int, _ b: Int) -> Bool { a > b }
}`,
      hints: ['The associated type defines the element being compared.', 'Conforming types specify the concrete Element type.', 'The answer is Element.'],
      concepts: ['associated-type', 'generic-strategy'],
    },
    {
      id: 'swift-strategy-7',
      title: 'Write a Sorting Strategy System',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a complete sorting strategy system.',
      skeleton: `// Write:
// - protocol SortStrategy with func sort<T: Comparable>(_ array: [T]) -> [T]
// - struct AscendingSort, DescendingSort conforming
// - struct DataList<T: Comparable> with strategy and sorted() method
`,
      solution: `protocol SortStrategy {
    func sort<T: Comparable>(_ array: [T]) -> [T]
}

struct AscendingSort: SortStrategy {
    func sort<T: Comparable>(_ array: [T]) -> [T] {
        array.sorted { $0 < $1 }
    }
}

struct DescendingSort: SortStrategy {
    func sort<T: Comparable>(_ array: [T]) -> [T] {
        array.sorted { $0 > $1 }
    }
}

struct DataList<T: Comparable> {
    var items: [T]
    var strategy: any SortStrategy

    func sorted() -> [T] {
        strategy.sort(items)
    }
}`,
      hints: ['The protocol method is generic over Comparable.', 'Each strategy sorts differently.', 'DataList delegates sorting to its strategy.'],
      concepts: ['strategy-pattern', 'generics', 'delegation'],
    },
    {
      id: 'swift-strategy-8',
      title: 'Write a Retry Strategy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write different retry strategies for network requests.',
      skeleton: `// Write:
// - protocol RetryStrategy with func delay(attempt: Int) -> Double
// - struct ConstantRetry(delay: Double)
// - struct ExponentialRetry(base: Double)
// - struct LinearRetry(increment: Double)
`,
      solution: `protocol RetryStrategy {
    func delay(attempt: Int) -> Double
}

struct ConstantRetry: RetryStrategy {
    let delaySeconds: Double
    func delay(attempt: Int) -> Double {
        return delaySeconds
    }
}

struct ExponentialRetry: RetryStrategy {
    let base: Double
    func delay(attempt: Int) -> Double {
        return pow(base, Double(attempt))
    }
}

struct LinearRetry: RetryStrategy {
    let increment: Double
    func delay(attempt: Int) -> Double {
        return Double(attempt) * increment
    }
}`,
      hints: ['Constant: same delay every time.', 'Exponential: base^attempt.', 'Linear: attempt * increment.'],
      concepts: ['retry-strategy', 'algorithm-family'],
    },
    {
      id: 'swift-strategy-9',
      title: 'Write a Formatter Strategy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a formatter system using closure strategies.',
      skeleton: `// Write a struct Formatter with:
// - typealias Strategy = (Double) -> String
// - static strategies: currency, percentage, decimal(places:)
// - let strategy: Strategy
// - func format(_ value: Double) -> String
`,
      solution: `struct Formatter {
    typealias Strategy = (Double) -> String

    let strategy: Strategy

    func format(_ value: Double) -> String {
        return strategy(value)
    }

    static let currency: Formatter = Formatter { value in
        String(format: "$%.2f", value)
    }

    static let percentage: Formatter = Formatter { value in
        String(format: "%.1f%%", value * 100)
    }

    static func decimal(places: Int) -> Formatter {
        Formatter { value in
            String(format: "%.\(places)f", value)
        }
    }
}`,
      hints: ['Static properties provide pre-configured formatters.', 'decimal is a function that returns a Formatter.', 'The strategy closure does the formatting work.'],
      concepts: ['closure-strategy', 'static-factory', 'formatting'],
    },
    {
      id: 'swift-strategy-10',
      title: 'Write a Composition Strategy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a strategy that composes multiple strategies.',
      skeleton: `// Write:
// - protocol Filter with func apply(_ items: [Int]) -> [Int]
// - struct GreaterThan, LessThan, Even conforming to Filter
// - struct CompositeFilter that combines multiple filters
`,
      solution: `protocol Filter {
    func apply(_ items: [Int]) -> [Int]
}

struct GreaterThan: Filter {
    let threshold: Int
    func apply(_ items: [Int]) -> [Int] {
        items.filter { $0 > threshold }
    }
}

struct LessThan: Filter {
    let threshold: Int
    func apply(_ items: [Int]) -> [Int] {
        items.filter { $0 < threshold }
    }
}

struct Even: Filter {
    func apply(_ items: [Int]) -> [Int] {
        items.filter { $0 % 2 == 0 }
    }
}

struct CompositeFilter: Filter {
    let filters: [any Filter]
    func apply(_ items: [Int]) -> [Int] {
        filters.reduce(items) { result, filter in
            filter.apply(result)
        }
    }
}`,
      hints: ['CompositeFilter chains multiple filters.', 'Use reduce to apply each filter sequentially.', 'Each filter narrows the result.'],
      concepts: ['composite-strategy', 'filter-chain', 'reduce'],
    },
    {
      id: 'swift-strategy-11',
      title: 'Write a Caching Strategy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write different caching eviction strategies.',
      skeleton: `// Write:
// - protocol EvictionStrategy with func shouldEvict(key:lastAccess:size:) -> Bool
// - struct TimeBasedEviction(maxAge: TimeInterval)
// - struct SizeBasedEviction(maxSize: Int)
`,
      solution: `protocol EvictionStrategy {
    func shouldEvict(key: String, lastAccess: Date, size: Int) -> Bool
}

struct TimeBasedEviction: EvictionStrategy {
    let maxAge: TimeInterval
    func shouldEvict(key: String, lastAccess: Date, size: Int) -> Bool {
        return Date().timeIntervalSince(lastAccess) > maxAge
    }
}

struct SizeBasedEviction: EvictionStrategy {
    let maxSize: Int
    func shouldEvict(key: String, lastAccess: Date, size: Int) -> Bool {
        return size > maxSize
    }
}`,
      hints: ['TimeBasedEviction checks age against maxAge.', 'SizeBasedEviction checks size against maxSize.', 'Both return Bool indicating eviction.'],
      concepts: ['cache-eviction', 'strategy-pattern'],
    },
    {
      id: 'swift-strategy-12',
      title: 'Write a Navigation Strategy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a navigation strategy system for different routing approaches.',
      skeleton: `// Write:
// - enum Route { case home, profile(id: Int), settings }
// - protocol Navigator with func navigate(to: Route) -> String
// - struct TabNavigator, StackNavigator conforming
`,
      solution: `enum Route {
    case home
    case profile(id: Int)
    case settings
}

protocol Navigator {
    func navigate(to route: Route) -> String
}

struct TabNavigator: Navigator {
    func navigate(to route: Route) -> String {
        switch route {
        case .home: return "Switch to Home tab"
        case .profile(let id): return "Switch to Profile tab (\\(id))"
        case .settings: return "Switch to Settings tab"
        }
    }
}

struct StackNavigator: Navigator {
    func navigate(to route: Route) -> String {
        switch route {
        case .home: return "Push Home onto stack"
        case .profile(let id): return "Push Profile(\\(id)) onto stack"
        case .settings: return "Push Settings onto stack"
        }
    }
}`,
      hints: ['Each navigator handles routes differently.', 'TabNavigator switches tabs, StackNavigator pushes.', 'Both conform to the same protocol.'],
      concepts: ['navigation-strategy', 'enum-routing'],
    },
    {
      id: 'swift-strategy-13',
      title: 'Fix Strategy Not Applied',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code where the strategy is never used.',
      skeleton: `protocol Encryption {
    func encrypt(_ text: String) -> String
}

struct CaesarCipher: Encryption {
    func encrypt(_ text: String) -> String {
        String(text.map { Character(UnicodeScalar(($0.asciiValue! + 3) % 128)) })
    }
}

class SecureStorage {
    let encryption: Encryption

    init(encryption: Encryption) {
        self.encryption = encryption
    }

    func store(_ text: String) -> String {
        return text  // Bug: not using encryption!
    }
}`,
      solution: `protocol Encryption {
    func encrypt(_ text: String) -> String
}

struct CaesarCipher: Encryption {
    func encrypt(_ text: String) -> String {
        String(text.map { Character(UnicodeScalar(($0.asciiValue! + 3) % 128)) })
    }
}

class SecureStorage {
    let encryption: Encryption

    init(encryption: Encryption) {
        self.encryption = encryption
    }

    func store(_ text: String) -> String {
        return encryption.encrypt(text)
    }
}`,
      hints: ['The store method ignores the encryption strategy.', 'Call encryption.encrypt(text) instead of returning raw text.', 'Delegate to the strategy.'],
      concepts: ['strategy-delegation', 'bug-fix'],
    },
    {
      id: 'swift-strategy-14',
      title: 'Fix Hardcoded Strategy',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix a class that hardcodes a strategy instead of accepting it.',
      skeleton: `class Logger {
    func log(_ message: String) {
        print("[\\(Date())] \\(message)")
    }
}

class App {
    private let logger = Logger()

    func run() {
        logger.log("Started")
    }
}
// Can't change logging behavior for tests!`,
      solution: `protocol LogStrategy {
    func log(_ message: String)
}

struct ConsoleLog: LogStrategy {
    func log(_ message: String) {
        print("[\\(Date())] \\(message)")
    }
}

struct SilentLog: LogStrategy {
    func log(_ message: String) {}
}

class App {
    private let logger: LogStrategy

    init(logger: LogStrategy = ConsoleLog()) {
        self.logger = logger
    }

    func run() {
        logger.log("Started")
    }
}`,
      hints: ['Extract a protocol for logging.', 'Inject the logger via init.', 'Default to ConsoleLog for production.'],
      concepts: ['dependency-injection', 'strategy-extraction'],
    },
    {
      id: 'swift-strategy-15',
      title: 'Fix Enum Strategy Missing Case',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the enum strategy that does not handle all cases.',
      skeleton: `enum Discount {
    case none, percentage(Double), fixed(Double), buyOneGetOne

    func apply(to price: Double) -> Double {
        switch self {
        case .none: return price
        case .percentage(let pct): return price * (1 - pct / 100)
        case .fixed(let amount): return max(0, price - amount)
        }
    }
}`,
      solution: `enum Discount {
    case none, percentage(Double), fixed(Double), buyOneGetOne

    func apply(to price: Double) -> Double {
        switch self {
        case .none: return price
        case .percentage(let pct): return price * (1 - pct / 100)
        case .fixed(let amount): return max(0, price - amount)
        case .buyOneGetOne: return price / 2
        }
    }
}`,
      hints: ['The buyOneGetOne case is not handled.', 'Add a case for it in the switch.', 'BOGO halves the price.'],
      concepts: ['exhaustive-switch', 'enum-strategy'],
    },
    {
      id: 'swift-strategy-16',
      title: 'Predict Strategy Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the output of strategy switching.',
      skeleton: `struct Transformer {
    var transform: (Int) -> Int
}

var t = Transformer(transform: { $0 * 2 })
print(t.transform(5))
t.transform = { $0 + 10 }
print(t.transform(5))
t.transform = { $0 * $0 }
print(t.transform(5))`,
      solution: `10
15
25`,
      hints: ['First: 5 * 2 = 10.', 'Second: 5 + 10 = 15.', 'Third: 5 * 5 = 25.'],
      concepts: ['closure-strategy', 'runtime-swap'],
    },
    {
      id: 'swift-strategy-17',
      title: 'Predict Enum Strategy Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the output of an enum strategy.',
      skeleton: `enum Tax {
    case flat(Double)
    case progressive

    func calculate(income: Double) -> Double {
        switch self {
        case .flat(let rate): return income * rate
        case .progressive:
            if income <= 50000 { return income * 0.1 }
            return 5000 + (income - 50000) * 0.2
        }
    }
}

print(Tax.flat(0.15).calculate(income: 100000))
print(Tax.progressive.calculate(income: 100000))`,
      solution: `15000.0
15000.0`,
      hints: ['Flat: 100000 * 0.15 = 15000.', 'Progressive: 5000 + (100000-50000)*0.2 = 5000 + 10000 = 15000.', 'Both give 15000 for this input.'],
      concepts: ['enum-strategy', 'tax-calculation'],
    },
    {
      id: 'swift-strategy-18',
      title: 'Predict Composite Strategy',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the result of composing multiple strategies.',
      skeleton: `let transforms: [(Int) -> Int] = [
    { $0 + 5 },
    { $0 * 2 },
    { $0 - 3 },
]

let result = transforms.reduce(10) { value, transform in
    transform(value)
}
print(result)`,
      solution: `27`,
      hints: ['Start: 10. +5 = 15.', '*2 = 30.', '-3 = 27.'],
      concepts: ['composed-strategy', 'reduce'],
    },
    {
      id: 'swift-strategy-19',
      title: 'Refactor If-Else to Strategy',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor conditional logic into a strategy pattern.',
      skeleton: `func ship(item: String, method: String) -> Double {
    let weight = 2.5 // kg
    if method == "standard" {
        return weight * 1.0
    } else if method == "express" {
        return weight * 2.5
    } else if method == "overnight" {
        return weight * 5.0 + 10.0
    } else {
        return weight * 1.0
    }
}`,
      solution: `protocol ShippingStrategy {
    func cost(weight: Double) -> Double
}

struct StandardShipping: ShippingStrategy {
    func cost(weight: Double) -> Double { weight * 1.0 }
}

struct ExpressShipping: ShippingStrategy {
    func cost(weight: Double) -> Double { weight * 2.5 }
}

struct OvernightShipping: ShippingStrategy {
    func cost(weight: Double) -> Double { weight * 5.0 + 10.0 }
}

func ship(item: String, strategy: any ShippingStrategy) -> Double {
    let weight = 2.5
    return strategy.cost(weight: weight)
}`,
      hints: ['Each if branch is a different strategy.', 'Extract each into its own type.', 'Inject the strategy instead of a string.'],
      concepts: ['strategy-extraction', 'if-else-elimination'],
    },
    {
      id: 'swift-strategy-20',
      title: 'Refactor to Closure Strategy',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor protocol-based strategies to simpler closure-based strategies.',
      skeleton: `protocol Comparator {
    func compare(_ a: String, _ b: String) -> Bool
}

struct AlphabeticComparator: Comparator {
    func compare(_ a: String, _ b: String) -> Bool { a < b }
}

struct LengthComparator: Comparator {
    func compare(_ a: String, _ b: String) -> Bool { a.count < b.count }
}

struct ReversedComparator: Comparator {
    func compare(_ a: String, _ b: String) -> Bool { a > b }
}

class SortedList {
    var comparator: Comparator
    init(comparator: Comparator) { self.comparator = comparator }
    func sort(_ items: [String]) -> [String] {
        items.sorted { comparator.compare($0, $1) }
    }
}`,
      solution: `struct SortedList {
    var comparator: (String, String) -> Bool

    func sort(_ items: [String]) -> [String] {
        items.sorted(by: comparator)
    }

    static let alphabetic = SortedList { $0 < $1 }
    static let byLength = SortedList { $0.count < $1.count }
    static let reversed = SortedList { $0 > $1 }
}`,
      hints: ['Simple single-method protocols can be closures.', 'Store the comparison function directly.', 'Static properties provide named strategies.'],
      concepts: ['closure-strategy', 'simplification', 'refactoring'],
    },
  ],
};
