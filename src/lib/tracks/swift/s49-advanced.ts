import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-adv',
  title: '49. Advanced Swift',
  explanation: `## Advanced Swift

Swift offers powerful advanced features for metaprogramming, memory management, and type system expressiveness.

### @dynamicCallable

\`\`\`swift
@dynamicCallable
struct PythonFunction {
    func dynamicallyCall(withArguments args: [Int]) -> Int {
        return args.reduce(0, +)
    }
}

let add = PythonFunction()
let result = add(1, 2, 3)  // 6
\`\`\`

### @dynamicMemberLookup

\`\`\`swift
@dynamicMemberLookup
struct JSON {
    var data: [String: Any]

    subscript(dynamicMember key: String) -> Any? {
        return data[key]
    }
}

let json = JSON(data: ["name": "Alice", "age": 30])
print(json.name)  // Optional("Alice")
\`\`\`

### Unsafe Pointers

\`\`\`swift
var value = 42
withUnsafePointer(to: &value) { pointer in
    print(pointer.pointee)  // 42
}

let buffer = UnsafeMutableBufferPointer<Int>.allocate(capacity: 3)
buffer[0] = 10
buffer[1] = 20
buffer[2] = 30
buffer.deallocate()
\`\`\`

### Existential Types and Primary Associated Types

\`\`\`swift
// Existential (any)
func process(collection: any Collection) { }

// Primary associated types (constrained existential)
func processInts(collection: any Collection<Int>) { }

// some vs any
func sorted<T: Comparable>(items: some Collection<T>) -> [T] {
    Array(items).sorted()
}
\`\`\`

### Consuming and Borrowing

\`\`\`swift
struct LargeData {
    var buffer: [UInt8]

    consuming func takeOwnership() -> [UInt8] {
        return buffer
    }

    borrowing func peek() -> UInt8? {
        return buffer.first
    }
}
\`\`\`

### If/Switch Expressions

\`\`\`swift
let label = if score >= 90 { "A" }
            else if score >= 80 { "B" }
            else { "C" }

let description = switch direction {
    case .north: "Up"
    case .south: "Down"
    case .east: "Right"
    case .west: "Left"
}
\`\`\`
`,
  exercises: [
    {
      id: 'swift-adv-1',
      title: '@dynamicCallable Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use @dynamicCallable to make a struct callable.',
      skeleton: `___
struct Adder {
    func dynamicallyCall(withArguments args: [Int]) -> Int {
        return args.reduce(0, +)
    }
}

let add = Adder()
print(add(3, 4, 5))  // 12`,
      solution: `@dynamicCallable
struct Adder {
    func dynamicallyCall(withArguments args: [Int]) -> Int {
        return args.reduce(0, +)
    }
}

let add = Adder()
print(add(3, 4, 5))  // 12`,
      hints: ['This attribute enables calling an instance like a function.', 'It requires dynamicallyCall(withArguments:) or dynamicallyCall(withKeywordArguments:).', 'The answer is @dynamicCallable.'],
      concepts: ['dynamic-callable', 'metaprogramming'],
    },
    {
      id: 'swift-adv-2',
      title: '@dynamicMemberLookup Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Enable dynamic member access on a struct.',
      skeleton: `___
struct Config {
    private var store: [String: String] = [:]

    subscript(dynamicMember key: String) -> String? {
        get { store[key] }
        set { store[key] = newValue }
    }
}

var config = Config()
config.theme = "dark"
print(config.theme ?? "none")`,
      solution: `@dynamicMemberLookup
struct Config {
    private var store: [String: String] = [:]

    subscript(dynamicMember key: String) -> String? {
        get { store[key] }
        set { store[key] = newValue }
    }
}

var config = Config()
config.theme = "dark"
print(config.theme ?? "none")`,
      hints: ['This attribute allows accessing arbitrary member names.', 'Requires a subscript(dynamicMember:) implementation.', 'The answer is @dynamicMemberLookup.'],
      concepts: ['dynamic-member-lookup', 'subscript'],
    },
    {
      id: 'swift-adv-3',
      title: 'withUnsafePointer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use withUnsafePointer to read a value through a pointer.',
      skeleton: `var number = 99

___(to: &number) { pointer in
    print("Value: \\(pointer.pointee)")
    print("Address: \\(pointer)")
}`,
      solution: `var number = 99

withUnsafePointer(to: &number) { pointer in
    print("Value: \\(pointer.pointee)")
    print("Address: \\(pointer)")
}`,
      hints: ['This function provides temporary pointer access to a value.', 'The pointer is only valid inside the closure.', 'The answer is withUnsafePointer.'],
      concepts: ['unsafe-pointer', 'pointee'],
    },
    {
      id: 'swift-adv-4',
      title: 'Existential any Keyword',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use the any keyword for existential types.',
      skeleton: `protocol Drawable {
    func draw() -> String
}

struct Circle: Drawable {
    func draw() -> String { "O" }
}

struct Square: Drawable {
    func draw() -> String { "[]" }
}

func render(shapes: [___ Drawable]) {
    for shape in shapes {
        print(shape.draw())
    }
}

render(shapes: [Circle(), Square()])`,
      solution: `protocol Drawable {
    func draw() -> String
}

struct Circle: Drawable {
    func draw() -> String { "O" }
}

struct Square: Drawable {
    func draw() -> String { "[]" }
}

func render(shapes: [any Drawable]) {
    for shape in shapes {
        print(shape.draw())
    }
}

render(shapes: [Circle(), Square()])`,
      hints: ['Swift 5.6+ requires explicitly marking existential types.', 'The any keyword makes it clear you are using dynamic dispatch.', 'The answer is any.'],
      concepts: ['existential-type', 'any-keyword'],
    },
    {
      id: 'swift-adv-5',
      title: 'Primary Associated Types',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use primary associated types to constrain existentials.',
      skeleton: `func sum(of collection: any Collection<___>) -> Int {
    collection.reduce(0, +)
}

print(sum(of: [1, 2, 3]))
print(sum(of: Set([4, 5, 6])))`,
      solution: `func sum(of collection: any Collection<Int>) -> Int {
    collection.reduce(0, +)
}

print(sum(of: [1, 2, 3]))
print(sum(of: Set([4, 5, 6])))`,
      hints: ['Primary associated types constrain an existential\'s associated type.', 'Collection<Int> means a collection whose Element is Int.', 'The answer is Int.'],
      concepts: ['primary-associated-type', 'constrained-existential'],
    },
    {
      id: 'swift-adv-6',
      title: 'If Expression',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use if as an expression to assign a value.',
      skeleton: `let temperature = 75

let description = ___ temperature > 85 {
    "Hot"
} else if temperature > 65 {
    "Warm"
} else {
    "Cool"
}

print(description)`,
      solution: `let temperature = 75

let description = if temperature > 85 {
    "Hot"
} else if temperature > 65 {
    "Warm"
} else {
    "Cool"
}

print(description)`,
      hints: ['Swift 5.9 allows if/else as expressions that return a value.', 'Each branch must produce a value of the same type.', 'The answer is if.'],
      concepts: ['if-expression', 'swift-5.9'],
    },
    {
      id: 'swift-adv-7',
      title: 'Write a @dynamicCallable DSL',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a dynamic callable struct that acts as a string builder.',
      skeleton: `// Write a @dynamicCallable struct SQLBuilder that:
// - Has dynamicallyCall(withKeywordArguments:) accepting KeyValuePairs<String, String>
// - Builds a SELECT query: "SELECT * FROM table WHERE col1='val1' AND col2='val2'"
// - The first argument key is "from" (the table), rest are WHERE conditions
`,
      solution: `@dynamicCallable
struct SQLBuilder {
    func dynamicallyCall(withKeywordArguments args: KeyValuePairs<String, String>) -> String {
        guard let first = args.first else { return "" }
        let table = first.value
        let conditions = args.dropFirst().map { "\\($0.key)='\\($0.value)'" }
        if conditions.isEmpty {
            return "SELECT * FROM \\(table)"
        }
        return "SELECT * FROM \\(table) WHERE \\(conditions.joined(separator: " AND "))"
    }
}

let sql = SQLBuilder()
print(sql(from: "users", name: "Alice", age: "30"))`,
      hints: ['Use KeyValuePairs to preserve argument order.', 'The first key-value pair specifies the table.', 'Join remaining conditions with AND.'],
      concepts: ['dynamic-callable', 'keyword-arguments', 'dsl'],
    },
    {
      id: 'swift-adv-8',
      title: 'Write a @dynamicMemberLookup Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a dynamic member lookup type that wraps a dictionary with typed access.',
      skeleton: `// Write:
// - @dynamicMemberLookup struct Environment
// - Private [String: String] storage
// - subscript(dynamicMember:) -> String? that reads from storage
// - init with a dictionary
// - static func fromProcess() that reads from ProcessInfo.processInfo.environment
`,
      solution: `@dynamicMemberLookup
struct Environment {
    private let storage: [String: String]

    init(_ dict: [String: String]) {
        self.storage = dict
    }

    subscript(dynamicMember key: String) -> String? {
        return storage[key]
    }

    static func fromProcess() -> Environment {
        Environment(ProcessInfo.processInfo.environment)
    }
}

let env = Environment(["HOME": "/Users/dev", "PATH": "/usr/bin"])
print(env.HOME ?? "unknown")`,
      hints: ['The subscript enables dot-syntax access to dictionary keys.', 'Return String? since keys may not exist.', 'ProcessInfo.processInfo.environment is the system env dict.'],
      concepts: ['dynamic-member-lookup', 'wrapper', 'environment'],
    },
    {
      id: 'swift-adv-9',
      title: 'Write Unsafe Buffer Operations',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Allocate, fill, read, and deallocate an unsafe buffer.',
      skeleton: `// Write a function createBuffer(count: Int) -> [Int] that:
// 1. Allocates UnsafeMutableBufferPointer<Int> with given capacity
// 2. Fills it with squares: buffer[i] = (i+1) * (i+1)
// 3. Converts to [Int] using Array(buffer)
// 4. Deallocates the buffer
// 5. Returns the array
`,
      solution: `func createBuffer(count: Int) -> [Int] {
    let buffer = UnsafeMutableBufferPointer<Int>.allocate(capacity: count)
    buffer.initialize(repeating: 0)
    for i in 0..<count {
        buffer[i] = (i + 1) * (i + 1)
    }
    let result = Array(buffer)
    buffer.deallocate()
    return result
}

print(createBuffer(count: 5))`,
      hints: ['allocate creates uninitialized memory -- initialize it first.', 'Always deallocate manually to avoid memory leaks.', 'Convert to Array before deallocating.'],
      concepts: ['unsafe-mutable-buffer', 'manual-memory', 'allocation'],
    },
    {
      id: 'swift-adv-10',
      title: 'Write Consuming and Borrowing Methods',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a struct with consuming and borrowing methods.',
      skeleton: `// Write struct FileHandle with:
// - var path: String
// - var data: [UInt8]
// - borrowing func peek() -> UInt8? (returns first byte without taking ownership)
// - consuming func read() -> [UInt8] (transfers ownership of data)
// - borrowing func size() -> Int
`,
      solution: `struct FileHandle {
    var path: String
    var data: [UInt8]

    borrowing func peek() -> UInt8? {
        return data.first
    }

    consuming func read() -> [UInt8] {
        return data
    }

    borrowing func size() -> Int {
        return data.count
    }
}

var handle = FileHandle(path: "/tmp/test", data: [72, 101, 108, 108, 111])
print(handle.peek() ?? 0)
print(handle.size())
let bytes = handle.read()
print(bytes)`,
      hints: ['borrowing allows read access without taking ownership.', 'consuming transfers ownership -- the caller cannot use the value after.', 'These are ownership modifiers introduced in Swift 5.9.'],
      concepts: ['consuming', 'borrowing', 'ownership'],
    },
    {
      id: 'swift-adv-11',
      title: 'Write a Type-Erased Container',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a type-erased wrapper for a protocol with an associated type.',
      skeleton: `// Given:
protocol DataSource {
    associatedtype Item
    func fetchAll() -> [Item]
    var count: Int { get }
}

// Write AnyDataSource<T> that type-erases any DataSource where Item == T
// It should store closures for fetchAll and count
`,
      solution: `protocol DataSource {
    associatedtype Item
    func fetchAll() -> [Item]
    var count: Int { get }
}

struct AnyDataSource<T> {
    private let _fetchAll: () -> [T]
    private let _count: () -> Int

    init<D: DataSource>(_ source: D) where D.Item == T {
        _fetchAll = source.fetchAll
        _count = { source.count }
    }

    func fetchAll() -> [T] {
        _fetchAll()
    }

    var count: Int {
        _count()
    }
}

struct ArraySource: DataSource {
    let items: [String]
    func fetchAll() -> [String] { items }
    var count: Int { items.count }
}

let erased = AnyDataSource(ArraySource(items: ["A", "B", "C"]))
print(erased.fetchAll())
print(erased.count)`,
      hints: ['Store protocol methods as closures to erase the concrete type.', 'The init is generic over the concrete DataSource type.', 'The where clause ensures Item matches T.'],
      concepts: ['type-erasure', 'associated-type', 'closure-capture'],
    },
    {
      id: 'swift-adv-12',
      title: 'Write Switch Expressions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use switch expressions for concise value assignment.',
      skeleton: `// Write a function httpStatus(_ code: Int) -> String that uses
// a switch EXPRESSION (not statement) to return:
// 200 -> "OK", 201 -> "Created", 301 -> "Moved",
// 400 -> "Bad Request", 404 -> "Not Found", 500 -> "Server Error"
// default -> "Unknown"
`,
      solution: `func httpStatus(_ code: Int) -> String {
    let message = switch code {
    case 200: "OK"
    case 201: "Created"
    case 301: "Moved"
    case 400: "Bad Request"
    case 404: "Not Found"
    case 500: "Server Error"
    default: "Unknown"
    }
    return message
}

print(httpStatus(200))
print(httpStatus(404))
print(httpStatus(999))`,
      hints: ['Switch expressions return a value directly.', 'Each case provides the value without return keyword.', 'The default case is required for exhaustiveness.'],
      concepts: ['switch-expression', 'pattern-matching'],
    },
    {
      id: 'swift-adv-13',
      title: 'Fix Unsafe Pointer Memory Leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix a memory leak in unsafe pointer code.',
      skeleton: `func makeArray(size: Int) -> [Int] {
    let ptr = UnsafeMutablePointer<Int>.allocate(capacity: size)
    ptr.initialize(repeating: 0, count: size)
    for i in 0..<size {
        ptr[i] = i * 10
    }
    let buffer = UnsafeMutableBufferPointer(start: ptr, count: size)
    let result = Array(buffer)
    // Bug: memory is never freed!
    return result
}`,
      solution: `func makeArray(size: Int) -> [Int] {
    let ptr = UnsafeMutablePointer<Int>.allocate(capacity: size)
    ptr.initialize(repeating: 0, count: size)
    for i in 0..<size {
        ptr[i] = i * 10
    }
    let buffer = UnsafeMutableBufferPointer(start: ptr, count: size)
    let result = Array(buffer)
    ptr.deinitialize(count: size)
    ptr.deallocate()
    return result
}`,
      hints: ['Allocated memory must be deinitialized and deallocated.', 'Call deinitialize(count:) then deallocate().', 'Without this, the memory leaks.'],
      concepts: ['memory-leak', 'deallocation', 'unsafe-pointer'],
    },
    {
      id: 'swift-adv-14',
      title: 'Fix Missing any for Existential',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix code that uses a bare protocol type where any is required.',
      skeleton: `protocol Animal {
    var name: String { get }
    func speak() -> String
}

struct Dog: Animal {
    var name: String
    func speak() -> String { "Woof!" }
}

struct Cat: Animal {
    var name: String
    func speak() -> String { "Meow!" }
}

// Swift 5.6+ requires explicit 'any' for existential types
func makeNoise(animals: [Animal]) {
    for animal in animals {
        print("\\(animal.name): \\(animal.speak())")
    }
}`,
      solution: `protocol Animal {
    var name: String { get }
    func speak() -> String
}

struct Dog: Animal {
    var name: String
    func speak() -> String { "Woof!" }
}

struct Cat: Animal {
    var name: String
    func speak() -> String { "Meow!" }
}

func makeNoise(animals: [any Animal]) {
    for animal in animals {
        print("\\(animal.name): \\(animal.speak())")
    }
}`,
      hints: ['Swift 5.6+ warns about bare protocol types as existentials.', 'Prefix the protocol type with any.', 'This makes the existential usage explicit.'],
      concepts: ['existential-any', 'protocol-type'],
    },
    {
      id: 'swift-adv-15',
      title: 'Fix @dynamicCallable Missing Method',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix a @dynamicCallable struct that is missing the required method.',
      skeleton: `@dynamicCallable
struct Logger {
    let prefix: String

    // Bug: wrong method name -- this won't compile
    func call(withArguments args: [String]) {
        for arg in args {
            print("[\\(prefix)] \\(arg)")
        }
    }
}

let log = Logger(prefix: "INFO")
log("Server started", "Listening on port 8080")`,
      solution: `@dynamicCallable
struct Logger {
    let prefix: String

    func dynamicallyCall(withArguments args: [String]) {
        for arg in args {
            print("[\\(prefix)] \\(arg)")
        }
    }
}

let log = Logger(prefix: "INFO")
log("Server started", "Listening on port 8080")`,
      hints: ['@dynamicCallable requires a specific method name.', 'The method must be named dynamicallyCall.', 'Rename call to dynamicallyCall.'],
      concepts: ['dynamic-callable', 'method-signature'],
    },
    {
      id: 'swift-adv-16',
      title: 'Predict @dynamicMemberLookup Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the output of dynamic member lookup.',
      skeleton: `@dynamicMemberLookup
struct Bag {
    var items: [String: Int] = ["apples": 3, "oranges": 5]

    subscript(dynamicMember key: String) -> Int {
        return items[key] ?? 0
    }
}

let bag = Bag()
print(bag.apples)
print(bag.oranges)
print(bag.bananas)`,
      solution: `3
5
0`,
      hints: ['apples maps to 3 in the dictionary.', 'oranges maps to 5.', 'bananas is not found, so the default 0 is returned.'],
      concepts: ['dynamic-member-lookup', 'default-value'],
    },
    {
      id: 'swift-adv-17',
      title: 'Predict If Expression Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the result of nested if/switch expressions.',
      skeleton: `let x = 15
let y = 3

let result = if x % y == 0 {
    switch x / y {
    case 1...3: "small"
    case 4...6: "medium"
    default: "large"
    }
} else {
    "not divisible"
}

print(result)`,
      solution: `medium`,
      hints: ['15 % 3 == 0, so we enter the if branch.', '15 / 3 = 5, which matches case 4...6.', 'The result is "medium".'],
      concepts: ['if-expression', 'switch-expression', 'nested-expression'],
    },
    {
      id: 'swift-adv-18',
      title: 'Predict Type Erasure Behavior',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Predict the output of type-erased protocol usage.',
      skeleton: `protocol Printable {
    var label: String { get }
}

struct Item: Printable {
    var label: String
}

func wrap(_ items: [any Printable]) -> [String] {
    items.map { "[\\($0.label)]" }
}

let items: [any Printable] = [
    Item(label: "first"),
    Item(label: "second"),
    Item(label: "third")
]

print(wrap(items).joined(separator: " "))`,
      solution: `[first] [second] [third]`,
      hints: ['Each item is mapped to its label wrapped in brackets.', 'joined combines them with spaces.', 'Existential any does not change runtime behavior.'],
      concepts: ['existential', 'type-erasure', 'map'],
    },
    {
      id: 'swift-adv-19',
      title: 'Refactor to Existential any',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Update legacy code to use explicit existential any syntax.',
      skeleton: `protocol Cacheable {
    var cacheKey: String { get }
    var data: Data { get }
}

class CacheManager {
    private var store: [String: Cacheable] = [:]

    func save(_ item: Cacheable) {
        store[item.cacheKey] = item
    }

    func load(_ key: String) -> Cacheable? {
        return store[key]
    }

    func allItems() -> [Cacheable] {
        return Array(store.values)
    }
}`,
      solution: `protocol Cacheable {
    var cacheKey: String { get }
    var data: Data { get }
}

class CacheManager {
    private var store: [String: any Cacheable] = [:]

    func save(_ item: any Cacheable) {
        store[item.cacheKey] = item
    }

    func load(_ key: String) -> (any Cacheable)? {
        return store[key]
    }

    func allItems() -> [any Cacheable] {
        return Array(store.values)
    }
}`,
      hints: ['All bare protocol types used as existentials need the any keyword.', 'This includes dictionary values, parameters, and return types.', 'Wrap optional existentials as (any Protocol)?.'],
      concepts: ['existential-any', 'migration', 'swift-5.6'],
    },
    {
      id: 'swift-adv-20',
      title: 'Refactor to some/any Opaque Types',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Refactor generic function signatures to use some and any appropriately.',
      skeleton: `protocol Shape {
    func area() -> Double
}

struct Circle: Shape {
    let radius: Double
    func area() -> Double { .pi * radius * radius }
}

struct Rectangle: Shape {
    let width: Double
    let height: Double
    func area() -> Double { width * height }
}

// Overuse of generics where some/any would be cleaner
func largest<T: Shape, U: Shape>(a: T, b: U) -> Double {
    max(a.area(), b.area())
}

func printArea<T: Shape>(shape: T) {
    print(shape.area())
}

func allAreas<T: Shape>(shapes: [T]) -> [Double] {
    shapes.map { $0.area() }
}`,
      solution: `protocol Shape {
    func area() -> Double
}

struct Circle: Shape {
    let radius: Double
    func area() -> Double { .pi * radius * radius }
}

struct Rectangle: Shape {
    let width: Double
    let height: Double
    func area() -> Double { width * height }
}

func largest(a: any Shape, b: any Shape) -> Double {
    max(a.area(), b.area())
}

func printArea(shape: some Shape) {
    print(shape.area())
}

func allAreas(shapes: [any Shape]) -> [Double] {
    shapes.map { $0.area() }
}`,
      hints: ['Use any when you need heterogeneous types (different shapes in same collection).', 'Use some when the concrete type is uniform but hidden.', 'largest takes two potentially different shapes, so use any.'],
      concepts: ['some-vs-any', 'opaque-types', 'existential-types'],
    },
  ],
};
