import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-closures-adv',
  title: '26. Advanced Closures',
  explanation: `## Advanced Closures in Swift

Closures in Swift go far beyond simple inline functions. Advanced closure usage includes **escaping closures**, **autoclosures**, **capture lists**, and using closures as first-class types.

### Escaping Closures

A closure **escapes** a function when it is stored or called after the function returns. Mark the parameter with \`@escaping\`:

\`\`\`swift
func fetchData(completion: @escaping (Data) -> Void) {
    DispatchQueue.global().async {
        let data = Data()
        completion(data)
    }
}
\`\`\`

### Autoclosures

\`@autoclosure\` wraps an expression in a closure automatically, deferring evaluation:

\`\`\`swift
func log(_ message: @autoclosure () -> String) {
    print(message())
}
log("Expensive: \\(42 * 100)")
\`\`\`

### Capture Lists

Capture lists let you control how values are captured, avoiding retain cycles:

\`\`\`swift
class Loader {
    var onComplete: (() -> Void)?
    func start() {
        onComplete = { [weak self] in
            self?.finish()
        }
    }
    func finish() { print("Done") }
}
\`\`\`

### Closures as Types

Closures can be stored in variables, passed as arguments, and used as return types:

\`\`\`swift
typealias Transform = (Int) -> Int
func makeMultiplier(_ factor: Int) -> Transform {
    return { value in value * factor }
}
\`\`\`
`,
  exercises: [
    {
      id: 'swift-closures-adv-1',
      title: 'Escaping Closure Parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Mark the closure parameter as escaping so it can be stored.',
      skeleton: `var callbacks: [() -> Void] = []

func register(callback: ___ () -> Void) {
    callbacks.append(callback)
}`,
      solution: `var callbacks: [() -> Void] = []

func register(callback: @escaping () -> Void) {
    callbacks.append(callback)
}`,
      hints: [
        'The closure is stored in an array, so it outlives the function.',
        'Use @escaping before the closure type.',
        'The answer is @escaping.',
      ],
      concepts: ['escaping-closures'],
    },
    {
      id: 'swift-closures-adv-2',
      title: 'Autoclosure Basics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use @autoclosure to defer evaluation of an expression.',
      skeleton: `func assert(_ condition: ___ () -> Bool, _ message: String) {
    if !condition() {
        print(message)
    }
}

assert(2 + 2 == 4, "Math is broken")`,
      solution: `func assert(_ condition: @autoclosure () -> Bool, _ message: String) {
    if !condition() {
        print(message)
    }
}

assert(2 + 2 == 4, "Math is broken")`,
      hints: [
        'The caller passes a plain expression, not a closure literal.',
        '@autoclosure wraps it automatically.',
        'Place @autoclosure before () -> Bool.',
      ],
      concepts: ['autoclosure'],
    },
    {
      id: 'swift-closures-adv-3',
      title: 'Weak Capture List',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use a capture list to weakly capture self and avoid a retain cycle.',
      skeleton: `class Timer {
    var tick: (() -> Void)?
    func start() {
        tick = { [___] in
            self?.update()
        }
    }
    func update() { print("tick") }
}`,
      solution: `class Timer {
    var tick: (() -> Void)?
    func start() {
        tick = { [weak self] in
            self?.update()
        }
    }
    func update() { print("tick") }
}`,
      hints: [
        'To avoid a retain cycle, capture self weakly.',
        'Use weak self in the capture list.',
        'The syntax is [weak self].',
      ],
      concepts: ['capture-lists', 'weak-references'],
    },
    {
      id: 'swift-closures-adv-4',
      title: 'Closure Type Alias',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Define a typealias for a closure that takes a String and returns Bool.',
      skeleton: `typealias Validator = ___

let isNotEmpty: Validator = { str in
    !str.isEmpty
}
print(isNotEmpty("hello"))`,
      solution: `typealias Validator = (String) -> Bool

let isNotEmpty: Validator = { str in
    !str.isEmpty
}
print(isNotEmpty("hello"))`,
      hints: [
        'A closure type looks like (ParamType) -> ReturnType.',
        'It takes a String and returns Bool.',
        'The answer is (String) -> Bool.',
      ],
      concepts: ['closure-types', 'typealias'],
    },
    {
      id: 'swift-closures-adv-5',
      title: 'Trailing Closure with Multiple Closures',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Call a function that takes two closures using trailing closure syntax.',
      skeleton: `func animate(duration: Double, animation: () -> Void, completion: () -> Void) {
    animation()
    completion()
}

animate(duration: 0.3) {
    print("animating")
} ___: {
    print("done")
}`,
      solution: `func animate(duration: Double, animation: () -> Void, completion: () -> Void) {
    animation()
    completion()
}

animate(duration: 0.3) {
    print("animating")
} completion: {
    print("done")
}`,
      hints: [
        'Multiple trailing closures use the parameter label.',
        'The second closure label is completion.',
        'Write completion: { ... }.',
      ],
      concepts: ['trailing-closures', 'multiple-closures'],
    },
    {
      id: 'swift-closures-adv-6',
      title: 'Unowned Capture',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Use unowned capture when you know the reference will always be valid.',
      skeleton: `class HTMLElement {
    let name: String
    lazy var asHTML: () -> String = { [___] in
        "<\\(self.name)/>"
    }
    init(name: String) { self.name = name }
}`,
      solution: `class HTMLElement {
    let name: String
    lazy var asHTML: () -> String = { [unowned self] in
        "<\\(self.name)/>"
    }
    init(name: String) { self.name = name }
}`,
      hints: [
        'The closure and self have the same lifetime.',
        'Use unowned instead of weak when the reference is always valid.',
        'The syntax is [unowned self].',
      ],
      concepts: ['capture-lists', 'unowned-references'],
    },
    {
      id: 'swift-closures-adv-7',
      title: 'Write a Closure Composer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that composes two closures into one.',
      skeleton: `// Write a function compose that takes two closures:
// f: (B) -> C and g: (A) -> B
// and returns a closure (A) -> C
`,
      solution: `func compose<A, B, C>(_ f: @escaping (B) -> C, _ g: @escaping (A) -> B) -> (A) -> C {
    return { a in f(g(a)) }
}`,
      hints: [
        'Use generics A, B, C for the types.',
        'The returned closure applies g first, then f.',
        'Both closures must be @escaping since they are stored in the returned closure.',
      ],
      concepts: ['closure-composition', 'generics', 'escaping-closures'],
    },
    {
      id: 'swift-closures-adv-8',
      title: 'Write a Memoize Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a memoize function that caches results of a closure.',
      skeleton: `// Write a function memoize that takes a closure (Int) -> Int
// and returns a new closure (Int) -> Int that caches results
`,
      solution: `func memoize(_ f: @escaping (Int) -> Int) -> (Int) -> Int {
    var cache: [Int: Int] = [:]
    return { n in
        if let cached = cache[n] {
            return cached
        }
        let result = f(n)
        cache[n] = result
        return result
    }
}`,
      hints: [
        'Use a dictionary to cache results.',
        'The cache must be captured by the returned closure.',
        'Check if the key exists before computing.',
      ],
      concepts: ['memoization', 'closure-capture', 'dictionary'],
    },
    {
      id: 'swift-closures-adv-9',
      title: 'Write a Retry Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that retries a throwing closure up to n times.',
      skeleton: `// Write a function retry(times:operation:) that:
// - calls operation() up to 'times' attempts
// - returns the result on success
// - throws the last error if all attempts fail
`,
      solution: `func retry<T>(times: Int, operation: () throws -> T) throws -> T {
    var lastError: Error?
    for _ in 0..<times {
        do {
            return try operation()
        } catch {
            lastError = error
        }
    }
    throw lastError!
}`,
      hints: [
        'Loop up to times and try calling operation().',
        'Catch errors and store the last one.',
        'If the loop finishes, throw the last error.',
      ],
      concepts: ['throwing-closures', 'error-handling', 'generics'],
    },
    {
      id: 'swift-closures-adv-10',
      title: 'Write a Debounce Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a debounce function that delays closure execution.',
      skeleton: `// Write a function debounce(delay:action:) that returns a () -> Void
// Each call resets the timer; action fires only after 'delay' seconds of inactivity
// Use DispatchWorkItem for cancellation
`,
      solution: `func debounce(delay: Double, action: @escaping () -> Void) -> () -> Void {
    var workItem: DispatchWorkItem?
    return {
        workItem?.cancel()
        workItem = DispatchWorkItem { action() }
        DispatchQueue.main.asyncAfter(deadline: .now() + delay, execute: workItem!)
    }
}`,
      hints: [
        'Store a DispatchWorkItem that can be cancelled.',
        'Each invocation cancels the previous work item.',
        'Schedule the new work item with asyncAfter.',
      ],
      concepts: ['debounce', 'dispatch', 'escaping-closures'],
    },
    {
      id: 'swift-closures-adv-11',
      title: 'Write a Pipeline Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that chains an array of transforms into a single closure.',
      skeleton: `// Write a function pipeline that takes an array of (Int) -> Int closures
// and returns a single (Int) -> Int that applies them in order
`,
      solution: `func pipeline(_ transforms: [(Int) -> Int]) -> (Int) -> Int {
    return { value in
        transforms.reduce(value) { result, transform in
            transform(result)
        }
    }
}`,
      hints: [
        'Use reduce to apply each transform in sequence.',
        'The initial value is the input to the pipeline.',
        'Each step applies the next transform to the accumulated result.',
      ],
      concepts: ['closure-chaining', 'reduce', 'higher-order-functions'],
    },
    {
      id: 'swift-closures-adv-12',
      title: 'Write a Curried Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a curry function that converts a two-argument function into curried form.',
      skeleton: `// Write a function curry that takes a closure (A, B) -> C
// and returns (A) -> (B) -> C
`,
      solution: `func curry<A, B, C>(_ f: @escaping (A, B) -> C) -> (A) -> (B) -> C {
    return { a in { b in f(a, b) } }
}`,
      hints: [
        'Return a closure that takes A and returns another closure taking B.',
        'The inner closure calls f with both captured a and the new b.',
        'Use @escaping since f is stored in the returned closures.',
      ],
      concepts: ['currying', 'generics', 'nested-closures'],
    },
    {
      id: 'swift-closures-adv-13',
      title: 'Fix the Retain Cycle',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the retain cycle caused by the closure capturing self strongly.',
      skeleton: `class NetworkManager {
    var onSuccess: (() -> Void)?

    func fetch() {
        onSuccess = {
            self.handleResponse()
        }
    }

    func handleResponse() {
        print("Response received")
    }

    deinit { print("NetworkManager deallocated") }
}`,
      solution: `class NetworkManager {
    var onSuccess: (() -> Void)?

    func fetch() {
        onSuccess = { [weak self] in
            self?.handleResponse()
        }
    }

    func handleResponse() {
        print("Response received")
    }

    deinit { print("NetworkManager deallocated") }
}`,
      hints: [
        'The closure strongly captures self, creating a retain cycle.',
        'Use a capture list with weak self.',
        'Change self.handleResponse() to self?.handleResponse().',
      ],
      concepts: ['retain-cycles', 'weak-capture', 'memory-management'],
    },
    {
      id: 'swift-closures-adv-14',
      title: 'Fix Escaping Closure Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the compilation error by properly marking the closure as escaping.',
      skeleton: `class EventBus {
    var handlers: [String: [(String) -> Void]] = [:]

    func on(_ event: String, handler: (String) -> Void) {
        handlers[event, default: []].append(handler)
    }

    func emit(_ event: String, data: String) {
        handlers[event]?.forEach { $0(data) }
    }
}`,
      solution: `class EventBus {
    var handlers: [String: [(String) -> Void]] = [:]

    func on(_ event: String, handler: @escaping (String) -> Void) {
        handlers[event, default: []].append(handler)
    }

    func emit(_ event: String, data: String) {
        handlers[event]?.forEach { $0(data) }
    }
}`,
      hints: [
        'The handler is stored in a dictionary, so it escapes the function.',
        'Add @escaping before the closure type.',
        'handler: @escaping (String) -> Void.',
      ],
      concepts: ['escaping-closures', 'compilation-errors'],
    },
    {
      id: 'swift-closures-adv-15',
      title: 'Fix Autoclosure Misuse',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Fix the autoclosure that is incorrectly applied to a regular closure parameter.',
      skeleton: `func measure(_ operation: @autoclosure () -> Void) {
    let start = Date()
    operation()
    let elapsed = Date().timeIntervalSince(start)
    print("Elapsed: \\(elapsed)s")
}

measure({
    for _ in 0..<1000 { _ = UUID() }
})`,
      solution: `func measure(_ operation: () -> Void) {
    let start = Date()
    operation()
    let elapsed = Date().timeIntervalSince(start)
    print("Elapsed: \\(elapsed)s")
}

measure {
    for _ in 0..<1000 { _ = UUID() }
}`,
      hints: [
        '@autoclosure is for wrapping a simple expression, not a closure literal.',
        'Remove @autoclosure so the caller can pass a block.',
        'Use trailing closure syntax at the call site.',
      ],
      concepts: ['autoclosure', 'closure-syntax'],
    },
    {
      id: 'swift-closures-adv-16',
      title: 'Predict Escaping Closure Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the output of code using an escaping closure.',
      skeleton: `var stored: (() -> Void)?

func save(_ f: @escaping () -> Void) {
    stored = f
}

var x = 10
save { print(x) }
x = 20
stored?()`,
      solution: `20`,
      hints: [
        'Closures capture variables by reference, not by value.',
        'x is modified after the closure is created.',
        'When the closure runs, x is 20.',
      ],
      concepts: ['closure-capture', 'reference-semantics'],
    },
    {
      id: 'swift-closures-adv-17',
      title: 'Predict Capture List Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the output when a capture list copies a value.',
      skeleton: `var count = 5
let closure = { [count] in
    print(count)
}
count = 100
closure()`,
      solution: `5`,
      hints: [
        'The capture list [count] captures the value at creation time.',
        'Changing count afterwards does not affect the captured copy.',
        'The output is 5.',
      ],
      concepts: ['capture-lists', 'value-capture'],
    },
    {
      id: 'swift-closures-adv-18',
      title: 'Predict Nested Closure Output',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Predict the output of nested closures with shared capture.',
      skeleton: `func makeCounter() -> () -> Int {
    var n = 0
    return {
        n += 1
        return n
    }
}

let counter = makeCounter()
print(counter())
print(counter())
print(counter())`,
      solution: `1
2
3`,
      hints: [
        'The returned closure captures n by reference.',
        'Each call increments the same n.',
        'Successive calls return 1, 2, 3.',
      ],
      concepts: ['closure-capture', 'stateful-closures'],
    },
    {
      id: 'swift-closures-adv-19',
      title: 'Refactor Nested Callbacks to Composition',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Refactor nested callback-style code into composed closures.',
      skeleton: `func process(input: Int) -> Int {
    let step1 = { (x: Int) -> Int in x * 2 }
    let step2 = { (x: Int) -> Int in x + 10 }
    let step3 = { (x: Int) -> Int in x - 3 }

    let r1 = step1(input)
    let r2 = step2(r1)
    let r3 = step3(r2)
    return r3
}`,
      solution: `func process(input: Int) -> Int {
    let steps: [(Int) -> Int] = [
        { $0 * 2 },
        { $0 + 10 },
        { $0 - 3 },
    ]
    return steps.reduce(input) { result, step in step(result) }
}`,
      hints: [
        'Collect all steps into an array of closures.',
        'Use reduce to apply them sequentially.',
        'The initial accumulator is the input.',
      ],
      concepts: ['closure-composition', 'reduce', 'refactoring'],
    },
    {
      id: 'swift-closures-adv-20',
      title: 'Refactor Closure to Use Shorthand',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Refactor verbose closure syntax to use shorthand argument names.',
      skeleton: `let numbers = [3, 1, 4, 1, 5, 9]
let sorted = numbers.sorted(by: { (a: Int, b: Int) -> Bool in
    return a < b
})
let doubled = numbers.map({ (value: Int) -> Int in
    return value * 2
})
let evens = numbers.filter({ (value: Int) -> Bool in
    return value % 2 == 0
})
print(sorted)
print(doubled)
print(evens)`,
      solution: `let numbers = [3, 1, 4, 1, 5, 9]
let sorted = numbers.sorted { $0 < $1 }
let doubled = numbers.map { $0 * 2 }
let evens = numbers.filter { $0 % 2 == 0 }
print(sorted)
print(doubled)
print(evens)`,
      hints: [
        'Use $0 and $1 for shorthand argument names.',
        'Trailing closure syntax removes parentheses.',
        'Single-expression closures can omit return.',
      ],
      concepts: ['shorthand-arguments', 'trailing-closures', 'type-inference'],
    },
  ],
};
