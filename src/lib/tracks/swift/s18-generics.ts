import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-generics',
  title: '18. Generics',
  explanation: `## Generics in Swift

Generics enable flexible, reusable functions and types that work with any type.

\`\`\`swift
func swapValues<T>(_ a: inout T, _ b: inout T) {
    let temp = a; a = b; b = temp
}
\`\`\`

### Generic Types
\`\`\`swift
struct Stack<Element> {
    var items: [Element] = []
    mutating func push(_ item: Element) { items.append(item) }
    mutating func pop() -> Element? { return items.popLast() }
}
\`\`\`

### Type Constraints
\`\`\`swift
func findIndex<T: Equatable>(of value: T, in array: [T]) -> Int? {
    for (i, item) in array.enumerated() where item == value {
        return i
    }
    return nil
}
\`\`\`

### Where Clauses & Associated Types
\`\`\`swift
func allEqual<C: Collection>(_ collection: C) -> Bool where C.Element: Equatable {
    guard let first = collection.first else { return true }
    return collection.allSatisfy { $0 == first }
}
\`\`\``,
  exercises: [
    {
      id: 'swift-generics-1',
      title: 'Generic Function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a generic function that returns a pair of values.',
      skeleton: `func makePair___(_ a: T, _ b: T) -> (T, T) {
    return (a, b)
}`,
      solution: `func makePair<T>(_ a: T, _ b: T) -> (T, T) {
    return (a, b)
}`,
      hints: [
        'Generic type parameters go in angle brackets.',
        'Place <T> after the function name.',
        'T is a placeholder for any type.',
      ],
      concepts: ['generic-function'],
    },
    {
      id: 'swift-generics-2',
      title: 'Type Constraint',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add an Equatable constraint to the generic parameter.',
      skeleton: `func contains<T: ___>(_ array: [T], _ value: T) -> Bool {
    return array.contains(value)
}`,
      solution: `func contains<T: Equatable>(_ array: [T], _ value: T) -> Bool {
    return array.contains(value)
}`,
      hints: [
        'Equatable is needed to use ==.',
        'Syntax: <T: Protocol>.',
        'contains() requires elements to be Equatable.',
      ],
      concepts: ['type-constraint', 'Equatable'],
    },
    {
      id: 'swift-generics-3',
      title: 'Generic Struct',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Declare a generic struct that holds a value of any type.',
      skeleton: `struct Wrapper___  {
    var value: T
}`,
      solution: `struct Wrapper<T> {
    var value: T
}`,
      hints: [
        'Add <T> after the struct name.',
        'T is used as the type of the value property.',
        'Wrapper<Int>, Wrapper<String>, etc.',
      ],
      concepts: ['generic-type'],
    },
    {
      id: 'swift-generics-4',
      title: 'Where Clause',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Use a where clause to constrain the Element type.',
      skeleton: `func sum<C: Collection>(_ c: C) -> Int ___ C.Element == Int {
    return c.reduce(0, +)
}`,
      solution: `func sum<C: Collection>(_ c: C) -> Int where C.Element == Int {
    return c.reduce(0, +)
}`,
      hints: [
        'where clauses add additional constraints.',
        'C.Element == Int means the collection holds Ints.',
        'Place where after the return type.',
      ],
      concepts: ['where-clause'],
    },
    {
      id: 'swift-generics-5',
      title: 'Multiple Generic Parameters',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Declare a function with two different generic parameters.',
      skeleton: `func combine<___, ___>(_ a: A, _ b: B) -> String {
    return "\\(a) and \\(b)"
}`,
      solution: `func combine<A, B>(_ a: A, _ b: B) -> String {
    return "\\(a) and \\(b)"
}`,
      hints: [
        'Multiple type parameters are comma-separated.',
        'A and B can be different types.',
        'Each is independent.',
      ],
      concepts: ['multiple-generics'],
    },
    {
      id: 'swift-generics-6',
      title: 'Associated Type Protocol',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Declare a protocol with an associated type.',
      skeleton: `protocol Container {
    ___ Item
    mutating func append(_ item: Item)
    var count: Int { get }
}`,
      solution: `protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
}`,
      hints: [
        'Use `associatedtype` to declare a placeholder type.',
        'Conforming types specify the concrete type.',
        'It is inferred from the implementation.',
      ],
      concepts: ['associated-types'],
    },
    {
      id: 'swift-generics-7',
      title: 'Generic Stack',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Implement a generic Stack with push, pop, and peek.',
      skeleton: `struct Stack<Element> {
    private var items: [Element] = []

    // Implement push, pop (returns Element?), peek (returns Element?)
}`,
      solution: `struct Stack<Element> {
    private var items: [Element] = []

    mutating func push(_ item: Element) {
        items.append(item)
    }

    mutating func pop() -> Element? {
        return items.popLast()
    }

    func peek() -> Element? {
        return items.last
    }
}`,
      hints: [
        'push adds to the end.',
        'pop removes and returns the last element.',
        'peek returns the last without removing.',
      ],
      concepts: ['generic-type', 'stack'],
    },
    {
      id: 'swift-generics-8',
      title: 'Generic Find Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a generic function that finds the index of a value in an array.',
      skeleton: `func findIndex<T: Equatable>(of value: T, in array: [T]) -> Int? {
    // Return the first index of value, or nil
}`,
      solution: `func findIndex<T: Equatable>(of value: T, in array: [T]) -> Int? {
    for (index, item) in array.enumerated() {
        if item == value { return index }
    }
    return nil
}`,
      hints: [
        'T must be Equatable to use ==.',
        'Use enumerated() to get index and element.',
        'Return nil if not found.',
      ],
      concepts: ['generic-function', 'Equatable'],
    },
    {
      id: 'swift-generics-9',
      title: 'Generic Map Implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a generic map function that transforms an array.',
      skeleton: `func myMap<T, U>(_ array: [T], _ transform: (T) -> U) -> [U] {
    // Apply transform to each element
}`,
      solution: `func myMap<T, U>(_ array: [T], _ transform: (T) -> U) -> [U] {
    var result: [U] = []
    for item in array {
        result.append(transform(item))
    }
    return result
}`,
      hints: [
        'T is the input type, U is the output type.',
        'Apply transform to each element.',
        'Collect results in a new array.',
      ],
      concepts: ['generic-function', 'higher-order'],
    },
    {
      id: 'swift-generics-10',
      title: 'Generic Min Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a generic function that returns the minimum of two Comparable values.',
      skeleton: `func minimum<T: Comparable>(_ a: T, _ b: T) -> T {
    // Return the smaller value
}`,
      solution: `func minimum<T: Comparable>(_ a: T, _ b: T) -> T {
    return a < b ? a : b
}`,
      hints: [
        'Comparable provides the < operator.',
        'Use ternary or if/else.',
        'Works for Int, String, Double, etc.',
      ],
      concepts: ['Comparable', 'generic-function'],
    },
    {
      id: 'swift-generics-11',
      title: 'Generic Linked List',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a generic Node class for a linked list.',
      skeleton: `class Node<T> {
    var value: T
    var next: Node<T>?

    init(value: T) {
        // Initialize
    }

    func toArray() -> [T] {
        // Convert to array
    }
}`,
      solution: `class Node<T> {
    var value: T
    var next: Node<T>?

    init(value: T) {
        self.value = value
    }

    func toArray() -> [T] {
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
        'Node<T> works with any type T.',
        'Traverse with while let.',
        'Collect each value into the result array.',
      ],
      concepts: ['generic-class', 'linked-list'],
    },
    {
      id: 'swift-generics-12',
      title: 'Type Erasure Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a type-erasing wrapper for a protocol with an associated type.',
      skeleton: `protocol Printable {
    associatedtype Value
    func print() -> Value
}

struct AnyPrintable<V>: Printable {
    private let _print: () -> V

    init<P: Printable>(_ printable: P) where P.Value == V {
        // Capture the print method
    }

    func print() -> V {
        return _print()
    }
}`,
      solution: `protocol Printable {
    associatedtype Value
    func print() -> Value
}

struct AnyPrintable<V>: Printable {
    private let _print: () -> V

    init<P: Printable>(_ printable: P) where P.Value == V {
        _print = printable.print
    }

    func print() -> V {
        return _print()
    }
}`,
      hints: [
        'Store the method as a closure.',
        'The closure captures the concrete implementation.',
        'This erases the concrete type to the generic wrapper.',
      ],
      concepts: ['type-erasure', 'associated-types'],
    },
    {
      id: 'swift-generics-13',
      title: 'Fix Missing Constraint',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the function that uses == without an Equatable constraint.',
      skeleton: `func isEqual<T>(_ a: T, _ b: T) -> Bool {
    return a == b
}`,
      solution: `func isEqual<T: Equatable>(_ a: T, _ b: T) -> Bool {
    return a == b
}`,
      hints: [
        'The == operator requires Equatable.',
        'Add `: Equatable` constraint to T.',
        'Without it, the compiler cannot verify == exists.',
      ],
      concepts: ['type-constraint', 'Equatable'],
    },
    {
      id: 'swift-generics-14',
      title: 'Fix Generic Return Type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the function that declares the wrong return type.',
      skeleton: `func first<T>(_ array: [T]) -> T {
    return array[0]
}
// Crashes on empty array`,
      solution: `func first<T>(_ array: [T]) -> T? {
    return array.first
}`,
      hints: [
        'array[0] crashes if empty.',
        'Return T? to handle empty arrays.',
        'Use array.first which returns optional.',
      ],
      concepts: ['Optional', 'safety'],
    },
    {
      id: 'swift-generics-15',
      title: 'Fix Ambiguous Generic Type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the code where the compiler cannot infer the generic type.',
      skeleton: `struct Wrapper<T> {
    var value: T
}
let w = Wrapper(value: nil)`,
      solution: `struct Wrapper<T> {
    var value: T
}
let w = Wrapper<Int?>(value: nil)`,
      hints: [
        'nil alone does not tell the compiler what T is.',
        'Specify the type explicitly.',
        'Use Wrapper<Int?>(value: nil).',
      ],
      concepts: ['type-inference', 'generic-type'],
    },
    {
      id: 'swift-generics-16',
      title: 'Predict Generic Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `func identity<T>(_ value: T) -> T { return value }
print(identity(42))`,
      solution: `42`,
      hints: [
        'identity returns whatever is passed in.',
        'T is inferred as Int.',
        'The value 42 is returned unchanged.',
      ],
      concepts: ['generic-function'],
    },
    {
      id: 'swift-generics-17',
      title: 'Predict Generic Stack',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `struct Stack<T> {
    var items: [T] = []
    mutating func push(_ item: T) { items.append(item) }
    mutating func pop() -> T? { return items.popLast() }
}
var s = Stack<String>()
s.push("a")
s.push("b")
print(s.pop() ?? "empty")`,
      solution: `b`,
      hints: [
        'Stack is LIFO (Last In, First Out).',
        '"b" was pushed last.',
        'pop returns "b".',
      ],
      concepts: ['generic-type', 'stack'],
    },
    {
      id: 'swift-generics-18',
      title: 'Predict Where Clause',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `func allEqual<T: Equatable>(_ a: T, _ b: T, _ c: T) -> Bool {
    return a == b && b == c
}
print(allEqual(1, 1, 1))`,
      solution: `true`,
      hints: [
        'All three values are 1.',
        '1 == 1 && 1 == 1 is true.',
        'Equatable allows == comparison.',
      ],
      concepts: ['Equatable', 'generic-function'],
    },
    {
      id: 'swift-generics-19',
      title: 'Refactor to Generic',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor duplicate functions into one generic function.',
      skeleton: `func printInt(_ value: Int) { print(value) }
func printString(_ value: String) { print(value) }
func printDouble(_ value: Double) { print(value) }`,
      solution: `func printValue<T>(_ value: T) { print(value) }`,
      hints: [
        'All three do the same thing with different types.',
        'Use a generic parameter T.',
        'One function replaces all three.',
      ],
      concepts: ['generic-function', 'DRY'],
    },
    {
      id: 'swift-generics-20',
      title: 'Refactor to Generic Container',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor separate typed containers into one generic container.',
      skeleton: `struct IntBox { var value: Int }
struct StringBox { var value: String }
struct DoubleBox { var value: Double }`,
      solution: `struct Box<T> { var value: T }`,
      hints: [
        'All three have the same structure.',
        'Replace the concrete types with a generic parameter.',
        'Box<Int>, Box<String>, Box<Double>.',
      ],
      concepts: ['generic-type', 'DRY'],
    },
  ],
};
