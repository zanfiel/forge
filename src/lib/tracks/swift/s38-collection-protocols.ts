import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-collections',
  title: '38. Collection Protocols',
  explanation: `## Collection Protocols in Swift

Swift's collection hierarchy lets you build custom sequences and collections that work with for-in loops, map, filter, and more.

### Sequence Protocol

\`\`\`swift
struct Countdown: Sequence {
    let start: Int

    func makeIterator() -> CountdownIterator {
        return CountdownIterator(current: start)
    }
}

struct CountdownIterator: IteratorProtocol {
    var current: Int
    mutating func next() -> Int? {
        guard current > 0 else { return nil }
        defer { current -= 1 }
        return current
    }
}

for n in Countdown(start: 3) { print(n) }
// 3, 2, 1
\`\`\`

### IteratorProtocol

The core protocol for producing elements one at a time. Must implement \`next() -> Element?\`.

### Collection Protocol

Extends Sequence with subscript access, indices, and count:

\`\`\`swift
struct MyArray<T>: Collection {
    private var storage: [T]
    var startIndex: Int { 0 }
    var endIndex: Int { storage.count }
    func index(after i: Int) -> Int { i + 1 }
    subscript(position: Int) -> T { storage[position] }
}
\`\`\`

### Higher-Level Protocols

- \`BidirectionalCollection\`: supports backward traversal
- \`RandomAccessCollection\`: O(1) index movement
- \`MutableCollection\`: supports element assignment
- \`RangeReplaceableCollection\`: supports insertion/removal
`,
  exercises: [
    {
      id: 'swift-collections-1',
      title: 'Implement IteratorProtocol',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Implement the next() method of IteratorProtocol.',
      skeleton: `struct FibIterator: IteratorProtocol {
    var a = 0, b = 1
    var count: Int

    mutating func ___() -> Int? {
        guard count > 0 else { return nil }
        count -= 1
        let result = a
        (a, b) = (b, a + b)
        return result
    }
}`,
      solution: `struct FibIterator: IteratorProtocol {
    var a = 0, b = 1
    var count: Int

    mutating func next() -> Int? {
        guard count > 0 else { return nil }
        count -= 1
        let result = a
        (a, b) = (b, a + b)
        return result
    }
}`,
      hints: [
        'IteratorProtocol requires one method.',
        'It returns the next element or nil.',
        'The method is next().',
      ],
      concepts: ['IteratorProtocol', 'next'],
    },
    {
      id: 'swift-collections-2',
      title: 'Implement Sequence makeIterator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Implement makeIterator to conform to Sequence.',
      skeleton: `struct Fibonacci: Sequence {
    let count: Int

    func ___() -> FibIterator {
        return FibIterator(count: count)
    }
}

for n in Fibonacci(count: 6) {
    print(n, terminator: " ")
}`,
      solution: `struct Fibonacci: Sequence {
    let count: Int

    func makeIterator() -> FibIterator {
        return FibIterator(count: count)
    }
}

for n in Fibonacci(count: 6) {
    print(n, terminator: " ")
}`,
      hints: [
        'Sequence requires a method that creates an iterator.',
        'It returns an instance of the associated iterator type.',
        'The method is makeIterator().',
      ],
      concepts: ['Sequence', 'makeIterator'],
    },
    {
      id: 'swift-collections-3',
      title: 'Collection startIndex and endIndex',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Provide the required index properties for Collection.',
      skeleton: `struct Stack<T>: Collection {
    private var elements: [T] = []

    var ___: Int { 0 }
    var ___: Int { elements.count }

    func index(after i: Int) -> Int { i + 1 }
    subscript(position: Int) -> T { elements[position] }

    mutating func push(_ element: T) { elements.append(element) }
    mutating func pop() -> T? { elements.popLast() }
}`,
      solution: `struct Stack<T>: Collection {
    private var elements: [T] = []

    var startIndex: Int { 0 }
    var endIndex: Int { elements.count }

    func index(after i: Int) -> Int { i + 1 }
    subscript(position: Int) -> T { elements[position] }

    mutating func push(_ element: T) { elements.append(element) }
    mutating func pop() -> T? { elements.popLast() }
}`,
      hints: [
        'Collection requires startIndex and endIndex.',
        'startIndex is the first valid index (0).',
        'endIndex is past the last element (count).',
      ],
      concepts: ['Collection', 'startIndex', 'endIndex'],
    },
    {
      id: 'swift-collections-4',
      title: 'Collection index(after:)',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Implement the index advancement method for Collection.',
      skeleton: `struct SimpleArray<T>: Collection {
    private var storage: [T]
    var startIndex: Int { 0 }
    var endIndex: Int { storage.count }

    func ___(after i: Int) -> Int {
        return i + 1
    }

    subscript(position: Int) -> T { storage[position] }
}`,
      solution: `struct SimpleArray<T>: Collection {
    private var storage: [T]
    var startIndex: Int { 0 }
    var endIndex: Int { storage.count }

    func index(after i: Int) -> Int {
        return i + 1
    }

    subscript(position: Int) -> T { storage[position] }
}`,
      hints: [
        'Collection needs a method to advance an index by one.',
        'For integer indices, just add 1.',
        'The method is index(after:).',
      ],
      concepts: ['Collection', 'index-advancement'],
    },
    {
      id: 'swift-collections-5',
      title: 'Sequence Conformance with AnyIterator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use AnyIterator to create a simple Sequence.',
      skeleton: `struct RepeatSequence<T>: Sequence {
    let element: T
    let count: Int

    func makeIterator() -> ___ {
        var remaining = count
        return AnyIterator {
            guard remaining > 0 else { return nil }
            remaining -= 1
            return self.element
        }
    }
}`,
      solution: `struct RepeatSequence<T>: Sequence {
    let element: T
    let count: Int

    func makeIterator() -> AnyIterator<T> {
        var remaining = count
        return AnyIterator {
            guard remaining > 0 else { return nil }
            remaining -= 1
            return self.element
        }
    }
}`,
      hints: [
        'AnyIterator wraps a closure as an iterator.',
        'The generic parameter matches the element type.',
        'The return type is AnyIterator<T>.',
      ],
      concepts: ['AnyIterator', 'type-erasure'],
    },
    {
      id: 'swift-collections-6',
      title: 'Custom Sequence with Stride',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Create a sequence that steps through a range.',
      skeleton: `struct StepSequence: Sequence, ___ {
    var current: Int
    let end: Int
    let step: Int

    mutating func next() -> Int? {
        guard current < end else { return nil }
        defer { current += step }
        return current
    }
}

for n in StepSequence(current: 0, end: 10, step: 3) {
    print(n, terminator: " ")
}`,
      solution: `struct StepSequence: Sequence, IteratorProtocol {
    var current: Int
    let end: Int
    let step: Int

    mutating func next() -> Int? {
        guard current < end else { return nil }
        defer { current += step }
        return current
    }
}

for n in StepSequence(current: 0, end: 10, step: 3) {
    print(n, terminator: " ")
}`,
      hints: [
        'When a type is its own iterator, conform to both protocols.',
        'This avoids needing a separate iterator type.',
        'The answer is IteratorProtocol.',
      ],
      concepts: ['Sequence', 'IteratorProtocol', 'self-iterator'],
    },
    {
      id: 'swift-collections-7',
      title: 'Write a Ring Buffer Collection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a ring buffer that conforms to Collection.',
      skeleton: `// Write a struct RingBuffer<T>: Collection with:
// - fixed capacity: Int
// - storage: [T?] initialized to nil
// - head and count tracking
// - Collection conformance (startIndex, endIndex, index(after:), subscript)
// - mutating func append(_ element: T) that wraps around
`,
      solution: `struct RingBuffer<T>: Collection {
    private var storage: [T?]
    private var head: Int = 0
    private(set) var count: Int = 0
    let capacity: Int

    var startIndex: Int { 0 }
    var endIndex: Int { count }

    init(capacity: Int) {
        self.capacity = capacity
        self.storage = Array(repeating: nil, count: capacity)
    }

    func index(after i: Int) -> Int { i + 1 }

    subscript(position: Int) -> T {
        return storage[(head + position) % capacity]!
    }

    mutating func append(_ element: T) {
        let index = (head + count) % capacity
        if count == capacity {
            head = (head + 1) % capacity
        } else {
            count += 1
        }
        storage[index] = element
    }
}`,
      hints: [
        'Use modular arithmetic for wrapping.',
        'subscript maps logical index to physical storage.',
        'When full, advance head to overwrite oldest.',
      ],
      concepts: ['Collection', 'ring-buffer', 'modular-arithmetic'],
    },
    {
      id: 'swift-collections-8',
      title: 'Write a Lazy Filter Sequence',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a sequence that lazily filters elements from another sequence.',
      skeleton: `// Write a struct FilteredSequence<S: Sequence>: Sequence where:
// - takes a base sequence and predicate
// - only yields elements matching the predicate
// Use AnyIterator for the iterator
`,
      solution: `struct FilteredSequence<S: Sequence>: Sequence {
    let base: S
    let predicate: (S.Element) -> Bool

    func makeIterator() -> AnyIterator<S.Element> {
        var iterator = base.makeIterator()
        return AnyIterator {
            while let element = iterator.next() {
                if self.predicate(element) {
                    return element
                }
            }
            return nil
        }
    }
}`,
      hints: [
        'Use the base sequence iterator internally.',
        'Skip elements that do not match the predicate.',
        'Return nil when the base iterator is exhausted.',
      ],
      concepts: ['lazy-sequence', 'filtering', 'AnyIterator'],
    },
    {
      id: 'swift-collections-9',
      title: 'Write an Infinite Sequence',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write an infinite sequence that generates values from a closure.',
      skeleton: `// Write a struct Generate<T>: Sequence that:
// - takes a () -> T closure
// - produces infinite elements from calling the closure
// Use with prefix() to limit
`,
      solution: `struct Generate<T>: Sequence, IteratorProtocol {
    let generator: () -> T

    mutating func next() -> T? {
        return generator()
    }
}

// Usage: Array(Generate { Int.random(in: 1...6) }.prefix(5))`,
      hints: [
        'next() always returns a value, never nil.',
        'This creates an infinite sequence.',
        'Use prefix() to take a finite number of elements.',
      ],
      concepts: ['infinite-sequence', 'generator', 'prefix'],
    },
    {
      id: 'swift-collections-10',
      title: 'Write a Zip Sequence',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a sequence that zips two sequences together.',
      skeleton: `// Write a struct ZipSequence<A: Sequence, B: Sequence>: Sequence
// that yields (A.Element, B.Element) tuples
// Stops when either sequence is exhausted
`,
      solution: `struct ZipSequence<A: Sequence, B: Sequence>: Sequence {
    let first: A
    let second: B

    func makeIterator() -> AnyIterator<(A.Element, B.Element)> {
        var iterA = first.makeIterator()
        var iterB = second.makeIterator()
        return AnyIterator {
            guard let a = iterA.next(), let b = iterB.next() else {
                return nil
            }
            return (a, b)
        }
    }
}`,
      hints: [
        'Advance both iterators simultaneously.',
        'Stop when either returns nil.',
        'Return a tuple of both elements.',
      ],
      concepts: ['zip-sequence', 'tuple', 'AnyIterator'],
    },
    {
      id: 'swift-collections-11',
      title: 'Write a Chunk Sequence',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a sequence that yields chunks of a given size.',
      skeleton: `// Write a function chunks<C: Collection>(of collection: C, size: Int) -> [[C.Element]]
// that splits a collection into arrays of the given size
`,
      solution: `func chunks<C: Collection>(of collection: C, size: Int) -> [[C.Element]] {
    var result: [[C.Element]] = []
    var index = collection.startIndex
    while index < collection.endIndex {
        let end = collection.index(index, offsetBy: size, limitedBy: collection.endIndex) ?? collection.endIndex
        result.append(Array(collection[index..<end]))
        index = end
    }
    return result
}`,
      hints: [
        'Use index(_:offsetBy:limitedBy:) to advance safely.',
        'Slice the collection from current index to the offset.',
        'The last chunk may be smaller than size.',
      ],
      concepts: ['chunking', 'Collection', 'index-offsetting'],
    },
    {
      id: 'swift-collections-12',
      title: 'Write a Sequence Extension',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write an extension on Sequence that adds a scan method.',
      skeleton: `// Write an extension on Sequence that adds:
// func scan<T>(_ initial: T, _ combine: (T, Element) -> T) -> [T]
// Like reduce, but returns all intermediate results
`,
      solution: `extension Sequence {
    func scan<T>(_ initial: T, _ combine: (T, Element) -> T) -> [T] {
        var accumulator = initial
        var results: [T] = []
        for element in self {
            accumulator = combine(accumulator, element)
            results.append(accumulator)
        }
        return results
    }
}`,
      hints: [
        'Similar to reduce but collect every intermediate value.',
        'Maintain an accumulator and append after each step.',
        'Return the array of all intermediate results.',
      ],
      concepts: ['scan', 'Sequence-extension', 'accumulation'],
    },
    {
      id: 'swift-collections-13',
      title: 'Fix Iterator Infinite Loop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the iterator that never terminates.',
      skeleton: `struct CountUp: Sequence, IteratorProtocol {
    var current: Int
    let limit: Int

    mutating func next() -> Int? {
        let value = current
        current += 1
        return value
    }
}

// for n in CountUp(current: 0, limit: 5) { print(n) }
// This will loop forever!`,
      solution: `struct CountUp: Sequence, IteratorProtocol {
    var current: Int
    let limit: Int

    mutating func next() -> Int? {
        guard current < limit else { return nil }
        let value = current
        current += 1
        return value
    }
}`,
      hints: [
        'next() never returns nil, so the loop never ends.',
        'Add a guard that checks current against limit.',
        'Return nil when current reaches limit.',
      ],
      concepts: ['termination', 'guard', 'IteratorProtocol'],
    },
    {
      id: 'swift-collections-14',
      title: 'Fix Collection Index Out of Bounds',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the collection that crashes on invalid index access.',
      skeleton: `struct SafeArray<T>: Collection {
    private var elements: [T]
    var startIndex: Int { 0 }
    var endIndex: Int { elements.count }
    func index(after i: Int) -> Int { i + 1 }

    subscript(position: Int) -> T {
        return elements[position]
    }

    init(_ elements: [T]) { self.elements = elements }
}

let arr = SafeArray([1, 2, 3])
// arr[5] will crash`,
      solution: `struct SafeArray<T>: Collection {
    private var elements: [T]
    var startIndex: Int { 0 }
    var endIndex: Int { elements.count }
    func index(after i: Int) -> Int { i + 1 }

    subscript(position: Int) -> T {
        precondition(position >= startIndex && position < endIndex, "Index out of bounds")
        return elements[position]
    }

    init(_ elements: [T]) { self.elements = elements }
}

let arr = SafeArray([1, 2, 3])`,
      hints: [
        'Add bounds checking to the subscript.',
        'Use precondition for clear error messages.',
        'Check position is between startIndex and endIndex.',
      ],
      concepts: ['bounds-checking', 'precondition', 'Collection'],
    },
    {
      id: 'swift-collections-15',
      title: 'Fix Sequence Reuse Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Fix a sequence that can only be iterated once.',
      skeleton: `class SingleUseSequence: Sequence, IteratorProtocol {
    var items: [Int]
    init(_ items: [Int]) { self.items = items }

    func next() -> Int? {
        guard !items.isEmpty else { return nil }
        return items.removeFirst()
    }
}

let seq = SingleUseSequence([1, 2, 3])
print(Array(seq))  // [1, 2, 3]
print(Array(seq))  // [] - empty! Bug!`,
      solution: `struct ReusableSequence: Sequence {
    let items: [Int]
    init(_ items: [Int]) { self.items = items }

    func makeIterator() -> IndexingIterator<[Int]> {
        return items.makeIterator()
    }
}

let seq = ReusableSequence([1, 2, 3])
print(Array(seq))  // [1, 2, 3]
print(Array(seq))  // [1, 2, 3]`,
      hints: [
        'The class mutates its own state during iteration.',
        'Separate the sequence from the iterator.',
        'makeIterator() creates a fresh iterator each time.',
      ],
      concepts: ['sequence-reuse', 'value-semantics', 'iterator-separation'],
    },
    {
      id: 'swift-collections-16',
      title: 'Predict Sequence Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the output of a custom sequence.',
      skeleton: `struct Countdown: Sequence, IteratorProtocol {
    var current: Int
    mutating func next() -> Int? {
        guard current > 0 else { return nil }
        defer { current -= 1 }
        return current
    }
}

print(Array(Countdown(current: 4)))`,
      solution: `[4, 3, 2, 1]`,
      hints: [
        'Starts at 4, decrements each step.',
        'Stops when current reaches 0.',
        'defer decrements after returning the value.',
      ],
      concepts: ['countdown', 'defer', 'Sequence'],
    },
    {
      id: 'swift-collections-17',
      title: 'Predict Collection Count',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the count of a custom collection.',
      skeleton: `struct Wrapper: Collection {
    let data: [String]
    var startIndex: Int { 0 }
    var endIndex: Int { data.count }
    func index(after i: Int) -> Int { i + 1 }
    subscript(position: Int) -> String { data[position] }
}

let w = Wrapper(data: ["a", "b", "c", "d"])
print(w.count)
print(w.first ?? "none")`,
      solution: `4
a`,
      hints: [
        'count is endIndex - startIndex = 4.',
        'first returns the element at startIndex.',
        'data[0] is "a".',
      ],
      concepts: ['Collection', 'count', 'first'],
    },
    {
      id: 'swift-collections-18',
      title: 'Predict Lazy Sequence',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict how many times a transform is called with lazy.',
      skeleton: `var callCount = 0
let numbers = [1, 2, 3, 4, 5]
let result = numbers.lazy.map { n -> Int in
    callCount += 1
    return n * 2
}.prefix(3)
let array = Array(result)
print(callCount)
print(array)`,
      solution: `3
[2, 4, 6]`,
      hints: [
        'lazy defers computation until needed.',
        'prefix(3) only requests 3 elements.',
        'map is called exactly 3 times.',
      ],
      concepts: ['lazy-sequence', 'prefix', 'deferred-evaluation'],
    },
    {
      id: 'swift-collections-19',
      title: 'Refactor Manual Iteration to Sequence',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor manual iteration code into a Sequence conformance.',
      skeleton: `struct DateRange {
    let start: Date
    let end: Date
    let calendar = Calendar.current

    func allDays() -> [Date] {
        var dates: [Date] = []
        var current = start
        while current <= end {
            dates.append(current)
            current = calendar.date(byAdding: .day, value: 1, to: current)!
        }
        return dates
    }
}`,
      solution: `struct DateRange: Sequence {
    let start: Date
    let end: Date
    let calendar = Calendar.current

    func makeIterator() -> AnyIterator<Date> {
        var current = start
        return AnyIterator {
            guard current <= self.end else { return nil }
            let date = current
            current = self.calendar.date(byAdding: .day, value: 1, to: current)!
            return date
        }
    }
}`,
      hints: [
        'The allDays pattern is exactly what Sequence provides.',
        'Use AnyIterator for a simple iterator.',
        'Now you can use for-in, map, filter, etc.',
      ],
      concepts: ['Sequence', 'AnyIterator', 'refactoring'],
    },
    {
      id: 'swift-collections-20',
      title: 'Refactor Array Wrapper to Collection',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor a custom type to properly conform to Collection.',
      skeleton: `struct TodoList {
    private var items: [String] = []

    func item(at index: Int) -> String? {
        guard index >= 0 && index < items.count else { return nil }
        return items[index]
    }

    func allItems() -> [String] { items }
    func numberOfItems() -> Int { items.count }

    mutating func add(_ item: String) { items.append(item) }
}`,
      solution: `struct TodoList: Collection {
    private var items: [String] = []

    var startIndex: Int { 0 }
    var endIndex: Int { items.count }
    func index(after i: Int) -> Int { i + 1 }

    subscript(position: Int) -> String {
        return items[position]
    }

    mutating func add(_ item: String) { items.append(item) }
}`,
      hints: [
        'Replace manual methods with Collection conformance.',
        'item(at:) becomes subscript, numberOfItems becomes count.',
        'allItems is no longer needed; Collection is iterable.',
      ],
      concepts: ['Collection', 'protocol-conformance', 'refactoring'],
    },
  ],
};
