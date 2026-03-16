import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-opaque',
  title: '29. Opaque Types',
  explanation: `## Opaque Types in Swift

Opaque types hide concrete type information while preserving type identity. They are declared with the \`some\` keyword.

### Opaque Return Types

\`some\` hides the concrete return type but guarantees it is always the same:

\`\`\`swift
func makeShape() -> some Shape {
    return Circle(radius: 5)
}
\`\`\`

The caller knows it conforms to \`Shape\` but not that it is a \`Circle\`.

### some vs any

\`some\` (opaque type) preserves type identity; \`any\` (existential type) erases it:

\`\`\`swift
func opaque() -> some Equatable { return 42 }
func existential() -> any Equatable { return 42 }

let a = opaque()
let b = opaque()
a == b  // OK: same underlying type

let c = existential()
let d = existential()
// c == d  // Error: Equatable with Self requirement
\`\`\`

### Opaque Parameters (Swift 5.7+)

\`\`\`swift
func double(_ x: some Numeric) -> some Numeric {
    return x + x
}
\`\`\`

### When to Use

- **some**: When you want to hide implementation but need type identity (protocols with Self or associated types)
- **any**: When you need heterogeneous collections or truly dynamic types
- Opaque types enable the compiler to optimize because the concrete type is known at compile time
`,
  exercises: [
    {
      id: 'swift-opaque-1',
      title: 'Basic Opaque Return Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use some to return an opaque type from a function.',
      skeleton: `protocol Shape {
    func area() -> Double
}

struct Square: Shape {
    let side: Double
    func area() -> Double { side * side }
}

func makeShape() -> ___ Shape {
    return Square(side: 5)
}`,
      solution: `protocol Shape {
    func area() -> Double
}

struct Square: Shape {
    let side: Double
    func area() -> Double { side * side }
}

func makeShape() -> some Shape {
    return Square(side: 5)
}`,
      hints: [
        'Opaque types hide the concrete type.',
        'Use the some keyword before the protocol name.',
        'The answer is some.',
      ],
      concepts: ['opaque-return-type', 'some-keyword'],
    },
    {
      id: 'swift-opaque-2',
      title: 'Opaque Parameter Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use some to accept an opaque parameter type.',
      skeleton: `func printArea(_ shape: ___ Shape) {
    print("Area: \\(shape.area())")
}`,
      solution: `func printArea(_ shape: some Shape) {
    print("Area: \\(shape.area())")
}`,
      hints: [
        'Opaque parameters work like generics.',
        'Use some before the protocol name.',
        'This is equivalent to func printArea<T: Shape>(_ shape: T).',
      ],
      concepts: ['opaque-parameter', 'some-keyword'],
    },
    {
      id: 'swift-opaque-3',
      title: 'Existential Type with any',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use any to declare an existential type for a heterogeneous array.',
      skeleton: `protocol Drawable {
    func draw()
}

struct Circle: Drawable { func draw() { print("O") } }
struct Square: Drawable { func draw() { print("[]") } }

let shapes: [___ Drawable] = [Circle(), Square()]
shapes.forEach { $0.draw() }`,
      solution: `protocol Drawable {
    func draw()
}

struct Circle: Drawable { func draw() { print("O") } }
struct Square: Drawable { func draw() { print("[]") } }

let shapes: [any Drawable] = [Circle(), Square()]
shapes.forEach { $0.draw() }`,
      hints: [
        'Heterogeneous arrays need existential types.',
        'Use the any keyword for existential types.',
        'some requires a single concrete type.',
      ],
      concepts: ['existential-type', 'any-keyword', 'heterogeneous-array'],
    },
    {
      id: 'swift-opaque-4',
      title: 'Protocol with Associated Type',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Return an opaque type from a protocol with an associated type.',
      skeleton: `protocol Container {
    associatedtype Item
    var items: [Item] { get }
}

struct IntBox: Container {
    var items: [Int]
}

func makeContainer() -> ___ Container {
    return IntBox(items: [1, 2, 3])
}`,
      solution: `protocol Container {
    associatedtype Item
    var items: [Item] { get }
}

struct IntBox: Container {
    var items: [Int]
}

func makeContainer() -> some Container {
    return IntBox(items: [1, 2, 3])
}`,
      hints: [
        'Protocols with associated types cannot use any as a return type directly.',
        'Use some to return an opaque type.',
        'The compiler knows the concrete type is IntBox.',
      ],
      concepts: ['associated-type', 'opaque-return-type'],
    },
    {
      id: 'swift-opaque-5',
      title: 'Primary Associated Type',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Use a primary associated type constraint with some.',
      skeleton: `func sum(_ collection: some Collection<___>) -> Int {
    return collection.reduce(0, +)
}

print(sum([1, 2, 3]))`,
      solution: `func sum(_ collection: some Collection<Int>) -> Int {
    return collection.reduce(0, +)
}

print(sum([1, 2, 3]))`,
      hints: [
        'Primary associated types constrain the element type.',
        'Collection<Int> means a collection of Int elements.',
        'The answer is Int.',
      ],
      concepts: ['primary-associated-type', 'collection-constraint'],
    },
    {
      id: 'swift-opaque-6',
      title: 'Existential to Opaque Conversion',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Open an existential type to use it with an opaque parameter.',
      skeleton: `protocol Animal {
    var name: String { get }
    func speak() -> String
}

struct Dog: Animal {
    let name = "Rex"
    func speak() -> String { "Woof" }
}

func greet(_ animal: ___ Animal) -> String {
    return "Hello \\(animal.name), you say \\(animal.speak())!"
}

let pet: any Animal = Dog()
print(greet(pet))`,
      solution: `protocol Animal {
    var name: String { get }
    func speak() -> String
}

struct Dog: Animal {
    let name = "Rex"
    func speak() -> String { "Woof" }
}

func greet(_ animal: some Animal) -> String {
    return "Hello \\(animal.name), you say \\(animal.speak())!"
}

let pet: any Animal = Dog()
print(greet(pet))`,
      hints: [
        'some and any can interoperate in Swift 5.7+.',
        'Passing an any value to a some parameter opens the existential.',
        'The answer is some.',
      ],
      concepts: ['existential-opening', 'some-any-interop'],
    },
    {
      id: 'swift-opaque-7',
      title: 'Write a Shape Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write functions that return opaque Shape types.',
      skeleton: `protocol Shape {
    func area() -> Double
    func description() -> String
}

struct Circle: Shape {
    let radius: Double
    func area() -> Double { .pi * radius * radius }
    func description() -> String { "Circle(r=\\(radius))" }
}

struct Rectangle: Shape {
    let width: Double
    let height: Double
    func area() -> Double { width * height }
    func description() -> String { "Rect(\\(width)x\\(height))" }
}

// Write two functions:
// makeCircle(radius:) -> some Shape
// makeRectangle(width:height:) -> some Shape
`,
      solution: `func makeCircle(radius: Double) -> some Shape {
    return Circle(radius: radius)
}

func makeRectangle(width: Double, height: Double) -> some Shape {
    return Rectangle(width: width, height: height)
}`,
      hints: [
        'Each function returns some Shape.',
        'The concrete type is hidden from the caller.',
        'Each function can only return one concrete type.',
      ],
      concepts: ['opaque-return-type', 'factory-pattern'],
    },
    {
      id: 'swift-opaque-8',
      title: 'Write a Generic Wrapper with Opaque Types',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a function using opaque types with Equatable constraint.',
      skeleton: `// Write a function makePair that takes two values of the same
// opaque Equatable type and returns true if they are equal
`,
      solution: `func makePair<T: Equatable>(_ a: T, _ b: T) -> Bool {
    return a == b
}`,
      hints: [
        'some Equatable parameters each get their own type.',
        'Use a generic constraint to ensure both are the same type.',
        'func makePair<T: Equatable>(_ a: T, _ b: T) -> Bool.',
      ],
      concepts: ['generics', 'equatable', 'type-identity'],
    },
    {
      id: 'swift-opaque-9',
      title: 'Write a Protocol with Opaque Return',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a protocol that uses opaque return types in its requirements.',
      skeleton: `// Write a protocol ViewBuilder with:
// - associatedtype Body
// - func body() -> Body
// Then write a struct MyView conforming to ViewBuilder
// whose body() returns some CustomStringConvertible (returning a String)
`,
      solution: `protocol ViewBuilder {
    associatedtype Body
    func body() -> Body
}

struct MyView: ViewBuilder {
    func body() -> some CustomStringConvertible {
        return "Hello, World!"
    }
}`,
      hints: [
        'The associated type Body is inferred from body() return.',
        'some CustomStringConvertible hides the concrete String type.',
        'The protocol defines the shape, the conformer picks the type.',
      ],
      concepts: ['associated-type', 'opaque-return-type', 'protocol-conformance'],
    },
    {
      id: 'swift-opaque-10',
      title: 'Write an Existential Collection Filter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that filters a heterogeneous array using existential types.',
      skeleton: `protocol Measurable {
    var size: Double { get }
}

struct Box: Measurable { let size: Double }
struct Sphere: Measurable { let size: Double }

// Write a function filterLarge that takes [any Measurable] and a threshold Double
// Returns [any Measurable] with only items where size > threshold
`,
      solution: `func filterLarge(_ items: [any Measurable], threshold: Double) -> [any Measurable] {
    return items.filter { $0.size > threshold }
}`,
      hints: [
        'Use any Measurable for heterogeneous arrays.',
        'Use filter with a closure checking size > threshold.',
        'Return [any Measurable].',
      ],
      concepts: ['existential-type', 'filter', 'heterogeneous-array'],
    },
    {
      id: 'swift-opaque-11',
      title: 'Write a Type-Erasing Wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a type-erasing wrapper for a protocol with an associated type.',
      skeleton: `protocol Reducer {
    associatedtype State
    func reduce(_ state: State) -> State
}

// Write a struct AnyReducer<S> that:
// - conforms to Reducer with State = S
// - takes any Reducer with matching State in init
// - wraps the reduce call
`,
      solution: `struct AnyReducer<S>: Reducer {
    typealias State = S
    private let _reduce: (S) -> S

    init<R: Reducer>(_ reducer: R) where R.State == S {
        self._reduce = reducer.reduce
    }

    func reduce(_ state: S) -> S {
        return _reduce(state)
    }
}`,
      hints: [
        'Store the reduce function as a closure to erase the type.',
        'Use a generic init to accept any matching Reducer.',
        'The where clause constrains R.State == S.',
      ],
      concepts: ['type-erasure', 'associated-type', 'generics'],
    },
    {
      id: 'swift-opaque-12',
      title: 'Write Opaque Computed Property',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a computed property that returns an opaque type.',
      skeleton: `protocol Theme {
    var name: String { get }
    var primaryColor: String { get }
}

struct DarkTheme: Theme {
    let name = "Dark"
    let primaryColor = "#1a1a2e"
}

struct LightTheme: Theme {
    let name = "Light"
    let primaryColor = "#ffffff"
}

// Write a struct App with a Bool isDark property
// and a computed property 'theme' that returns some Theme
// (DarkTheme if isDark, LightTheme otherwise)
// Note: this requires both branches to return the same type,
// so use a single concrete type or a wrapper
`,
      solution: `struct App {
    var isDark: Bool

    var theme: any Theme {
        if isDark {
            return DarkTheme()
        } else {
            return LightTheme()
        }
    }
}`,
      hints: [
        'some requires the same concrete type from all branches.',
        'If branches return different types, use any instead.',
        'any Theme allows different concrete types.',
      ],
      concepts: ['opaque-vs-existential', 'computed-property', 'branching'],
    },
    {
      id: 'swift-opaque-13',
      title: 'Fix Mismatched Opaque Return',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix a function that returns different concrete types from branches.',
      skeleton: `protocol Renderable {
    func render() -> String
}

struct Text: Renderable {
    let content: String
    func render() -> String { content }
}

struct Bold: Renderable {
    let content: String
    func render() -> String { "<b>\\(content)</b>" }
}

func format(_ text: String, bold: Bool) -> some Renderable {
    if bold {
        return Bold(content: text)
    } else {
        return Text(content: text)
    }
}`,
      solution: `protocol Renderable {
    func render() -> String
}

struct Text: Renderable {
    let content: String
    func render() -> String { content }
}

struct Bold: Renderable {
    let content: String
    func render() -> String { "<b>\\(content)</b>" }
}

func format(_ text: String, bold: Bool) -> any Renderable {
    if bold {
        return Bold(content: text)
    } else {
        return Text(content: text)
    }
}`,
      hints: [
        'some requires the same concrete type from all return paths.',
        'Bold and Text are different types.',
        'Change some to any for existential type.',
      ],
      concepts: ['opaque-vs-existential', 'return-type-mismatch'],
    },
    {
      id: 'swift-opaque-14',
      title: 'Fix Existential Self Requirement',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Fix the code that tries to compare existential types with Self requirement.',
      skeleton: `protocol Identifier: Equatable {
    var id: String { get }
}

struct UserID: Identifier {
    let id: String
}

func areSame(_ a: any Identifier, _ b: any Identifier) -> Bool {
    return a == b
}`,
      solution: `protocol Identifier: Equatable {
    var id: String { get }
}

struct UserID: Identifier {
    let id: String
}

func areSame(_ a: any Identifier, _ b: any Identifier) -> Bool {
    return a.id == b.id
}`,
      hints: [
        'Equatable has a Self requirement, so == cannot be used on any Identifier.',
        'Compare the id properties instead.',
        'Or use a generic function with some.',
      ],
      concepts: ['self-requirement', 'existential-limitation', 'equatable'],
    },
    {
      id: 'swift-opaque-15',
      title: 'Fix Protocol Return Type Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the function that cannot return a protocol with associated types.',
      skeleton: `protocol DataStore {
    associatedtype Item
    func fetch() -> [Item]
}

struct StringStore: DataStore {
    func fetch() -> [String] { return ["a", "b"] }
}

func makeStore() -> DataStore {
    return StringStore()
}`,
      solution: `protocol DataStore {
    associatedtype Item
    func fetch() -> [Item]
}

struct StringStore: DataStore {
    func fetch() -> [String] { return ["a", "b"] }
}

func makeStore() -> some DataStore {
    return StringStore()
}`,
      hints: [
        'Protocols with associated types cannot be used as plain return types.',
        'Use some DataStore for an opaque return type.',
        'The compiler knows the concrete type at compile time.',
      ],
      concepts: ['associated-type', 'opaque-return-type', 'existential-error'],
    },
    {
      id: 'swift-opaque-16',
      title: 'Predict Opaque Type Identity',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict whether opaque values can be compared.',
      skeleton: `func makeValue() -> some Equatable {
    return 42
}

let a = makeValue()
let b = makeValue()
print(a == b)
print(type(of: a) == type(of: b))`,
      solution: `true
true`,
      hints: [
        'Both calls return the same concrete type (Int).',
        'Opaque types preserve type identity.',
        'Since both are Int 42, equality is true.',
      ],
      concepts: ['opaque-type-identity', 'equatable'],
    },
    {
      id: 'swift-opaque-17',
      title: 'Predict Any vs Some',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the types involved with some and any.',
      skeleton: `func opaqueNum() -> some Numeric { return 5 }
func existNum() -> any Numeric { return 5 }

let a = opaqueNum()
let b = opaqueNum()
let sum = a + b
print(sum)`,
      solution: `10`,
      hints: [
        'some Numeric preserves the concrete type (Int).',
        'Both a and b are the same type, so + works.',
        '5 + 5 = 10.',
      ],
      concepts: ['opaque-type', 'numeric', 'type-identity'],
    },
    {
      id: 'swift-opaque-18',
      title: 'Predict Type Erasure Output',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Predict the output when using existential types.',
      skeleton: `protocol Named {
    var name: String { get }
}

struct Cat: Named { let name = "Whiskers" }
struct Dog: Named { let name = "Rex" }

let pets: [any Named] = [Cat(), Dog(), Cat()]
print(pets.count)
print(pets[1].name)`,
      solution: `3
Rex`,
      hints: [
        'The array holds 3 items of different concrete types.',
        'pets[1] is the Dog instance.',
        'Its name is Rex.',
      ],
      concepts: ['existential-type', 'heterogeneous-array'],
    },
    {
      id: 'swift-opaque-19',
      title: 'Refactor Existential to Opaque',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor code using any to use some where possible for better performance.',
      skeleton: `protocol Logger {
    func log(_ message: String)
}

struct ConsoleLogger: Logger {
    func log(_ message: String) { print("[LOG] \\(message)") }
}

func makeLogger() -> any Logger {
    return ConsoleLogger()
}

func doWork(logger: any Logger) {
    logger.log("Starting")
    logger.log("Done")
}

let logger = makeLogger()
doWork(logger: logger)`,
      solution: `protocol Logger {
    func log(_ message: String)
}

struct ConsoleLogger: Logger {
    func log(_ message: String) { print("[LOG] \\(message)") }
}

func makeLogger() -> some Logger {
    return ConsoleLogger()
}

func doWork(logger: some Logger) {
    logger.log("Starting")
    logger.log("Done")
}

let logger = makeLogger()
doWork(logger: logger)`,
      hints: [
        'Since makeLogger always returns ConsoleLogger, use some.',
        'some allows the compiler to optimize with concrete types.',
        'Change both any to some.',
      ],
      concepts: ['opaque-type', 'performance', 'refactoring'],
    },
    {
      id: 'swift-opaque-20',
      title: 'Refactor Type Erasure to Opaque',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Refactor a manual type-erasing wrapper to use opaque types.',
      skeleton: `protocol Validator {
    associatedtype Value
    func validate(_ value: Value) -> Bool
}

struct AnyValidator<V> {
    private let _validate: (V) -> Bool
    init<T: Validator>(_ validator: T) where T.Value == V {
        self._validate = validator.validate
    }
    func validate(_ value: V) -> Bool { _validate(value) }
}

struct RangeValidator: Validator {
    let range: ClosedRange<Int>
    func validate(_ value: Int) -> Bool { range.contains(value) }
}

func makeValidator() -> AnyValidator<Int> {
    return AnyValidator(RangeValidator(range: 1...100))
}`,
      solution: `protocol Validator {
    associatedtype Value
    func validate(_ value: Value) -> Bool
}

struct RangeValidator: Validator {
    let range: ClosedRange<Int>
    func validate(_ value: Int) -> Bool { range.contains(value) }
}

func makeValidator() -> some Validator {
    return RangeValidator(range: 1...100)
}`,
      hints: [
        'When only one concrete type is returned, opaque types replace type erasure.',
        'Remove the AnyValidator wrapper entirely.',
        'Return some Validator directly.',
      ],
      concepts: ['opaque-type', 'type-erasure-removal', 'simplification'],
    },
  ],
};
