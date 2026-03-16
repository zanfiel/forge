import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-closures',
  title: '07. Closures',
  explanation: `## Closures in Swift

Closures are self-contained blocks of functionality. They capture values from their surrounding context.

### Closure Expression Syntax
\`\`\`swift
let add = { (a: Int, b: Int) -> Int in
    return a + b
}
\`\`\`

### Trailing Closures
\`\`\`swift
let sorted = [3, 1, 2].sorted { $0 < $1 }
\`\`\`

### Capturing Values
\`\`\`swift
func makeCounter() -> () -> Int {
    var count = 0
    return {
        count += 1
        return count
    }
}
\`\`\`

### @escaping and @autoclosure
\`\`\`swift
func later(_ work: @escaping () -> Void) {
    DispatchQueue.main.async(execute: work)
}

func assert(_ condition: @autoclosure () -> Bool) {
    if !condition() { print("Failed") }
}
\`\`\``,
  exercises: [
    {
      id: 'swift-closures-1',
      title: 'Basic Closure',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Complete the closure that adds two integers.',
      skeleton: `let add = { (a: Int, b: Int) -> Int ___
    return a + b
}`,
      solution: `let add = { (a: Int, b: Int) -> Int in
    return a + b
}`,
      hints: [
        'The `in` keyword separates parameters from the body.',
        'Place `in` after the return type.',
        'in marks the start of the closure body.',
      ],
      concepts: ['closure-syntax', 'in-keyword'],
    },
    {
      id: 'swift-closures-2',
      title: 'Trailing Closure',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use trailing closure syntax with sorted.',
      skeleton: `let numbers = [3, 1, 4, 1, 5]
let sorted = numbers.sorted ___ $0 < $1 }`,
      solution: `let numbers = [3, 1, 4, 1, 5]
let sorted = numbers.sorted { $0 < $1 }`,
      hints: [
        'Trailing closures start with { after the function call.',
        'No parentheses needed when the closure is the only argument.',
        '$0 and $1 are shorthand argument names.',
      ],
      concepts: ['trailing-closures', 'shorthand-arguments'],
    },
    {
      id: 'swift-closures-3',
      title: 'Shorthand Arguments',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use shorthand argument names to multiply two values.',
      skeleton: `let multiply: (Int, Int) -> Int = { ___ * ___ }`,
      solution: `let multiply: (Int, Int) -> Int = { $0 * $1 }`,
      hints: [
        'Shorthand arguments are $0, $1, $2, etc.',
        '$0 is the first argument, $1 the second.',
        'No need for parameter names or `in` keyword.',
      ],
      concepts: ['shorthand-arguments'],
    },
    {
      id: 'swift-closures-4',
      title: 'Map with Closure',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use map with a closure to double each element.',
      skeleton: `let numbers = [1, 2, 3]
let doubled = numbers.___ { $0 * 2 }`,
      solution: `let numbers = [1, 2, 3]
let doubled = numbers.map { $0 * 2 }`,
      hints: [
        'map transforms each element.',
        'Use map with a trailing closure.',
        'The closure receives each element as $0.',
      ],
      concepts: ['map', 'trailing-closures'],
    },
    {
      id: 'swift-closures-5',
      title: 'Filter with Closure',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use filter to keep only even numbers.',
      skeleton: `let numbers = [1, 2, 3, 4, 5, 6]
let evens = numbers.___ { $0 % 2 == 0 }`,
      solution: `let numbers = [1, 2, 3, 4, 5, 6]
let evens = numbers.filter { $0 % 2 == 0 }`,
      hints: [
        'filter keeps elements that match the predicate.',
        'Return true to keep, false to discard.',
        'The closure must return a Bool.',
      ],
      concepts: ['filter', 'trailing-closures'],
    },
    {
      id: 'swift-closures-6',
      title: 'Escaping Closure',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Mark the closure parameter as escaping.',
      skeleton: `var callbacks: [() -> Void] = []
func register(_ callback: ___ () -> Void) {
    callbacks.append(callback)
}`,
      solution: `var callbacks: [() -> Void] = []
func register(_ callback: @escaping () -> Void) {
    callbacks.append(callback)
}`,
      hints: [
        'Closures stored beyond function scope must be @escaping.',
        'Place @escaping before the closure type.',
        'Appending to an array means the closure escapes.',
      ],
      concepts: ['escaping-closures'],
    },
    {
      id: 'swift-closures-7',
      title: 'Write a Counter Closure',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that returns a closure. Each call to the closure increments and returns a counter.',
      skeleton: `func makeCounter() -> () -> Int {
    // Return a closure that counts up from 0
}`,
      solution: `func makeCounter() -> () -> Int {
    var count = 0
    return {
        count += 1
        return count
    }
}`,
      hints: [
        'Declare a variable inside the function.',
        'Return a closure that captures and increments it.',
        'The closure captures count by reference.',
      ],
      concepts: ['capturing-values', 'closure-factory'],
    },
    {
      id: 'swift-closures-8',
      title: 'Write a Custom Map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that applies a transform closure to each element of an Int array.',
      skeleton: `func myMap(_ array: [Int], _ transform: (Int) -> Int) -> [Int] {
    // Apply transform to each element
}`,
      solution: `func myMap(_ array: [Int], _ transform: (Int) -> Int) -> [Int] {
    var result: [Int] = []
    for item in array {
        result.append(transform(item))
    }
    return result
}`,
      hints: [
        'Create an empty result array.',
        'Loop through the input and apply the closure.',
        'Append each transformed value.',
      ],
      concepts: ['higher-order-functions', 'closures'],
    },
    {
      id: 'swift-closures-9',
      title: 'Write a Compose Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a function that composes two closures: first applies f, then g.',
      skeleton: `func compose(_ f: @escaping (Int) -> Int, _ g: @escaping (Int) -> Int) -> (Int) -> Int {
    // Return a closure that applies f then g
}`,
      solution: `func compose(_ f: @escaping (Int) -> Int, _ g: @escaping (Int) -> Int) -> (Int) -> Int {
    return { x in g(f(x)) }
}`,
      hints: [
        'Return a new closure.',
        'Apply f first, then pass the result to g.',
        'Both closures must be @escaping since they are stored.',
      ],
      concepts: ['composition', 'escaping-closures'],
    },
    {
      id: 'swift-closures-10',
      title: 'Write a Reduce to String',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use reduce with a closure to join an array of strings with commas.',
      skeleton: `func joinWithComma(_ words: [String]) -> String {
    // Use reduce to join with ", "
}`,
      solution: `func joinWithComma(_ words: [String]) -> String {
    guard let first = words.first else { return "" }
    return words.dropFirst().reduce(first) { $0 + ", " + $1 }
}`,
      hints: [
        'reduce combines elements into a single value.',
        'Start with the first element.',
        'Append ", " and the next element each step.',
      ],
      concepts: ['reduce', 'closures'],
    },
    {
      id: 'swift-closures-11',
      title: 'Closure Capture List',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a closure that captures a value by copy using a capture list.',
      skeleton: `var x = 10
// Create a closure that captures x by value (copy)
// so changing x after doesn't affect the closure
`,
      solution: `var x = 10
let captured = { [x] in
    return x
}
x = 20
print(captured()) // prints 10`,
      hints: [
        'Use [x] before `in` to capture by value.',
        'Capture lists use square brackets.',
        'The captured value is frozen at creation time.',
      ],
      concepts: ['capture-lists', 'value-capture'],
    },
    {
      id: 'swift-closures-12',
      title: 'Autoclosure',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a function using @autoclosure that lazily evaluates a condition.',
      skeleton: `func myAssert(_ condition: @autoclosure () -> Bool, _ message: String) {
    // Print message if condition is false
}`,
      solution: `func myAssert(_ condition: @autoclosure () -> Bool, _ message: String) {
    if !condition() {
        print("Assertion failed: \\(message)")
    }
}`,
      hints: [
        '@autoclosure wraps the expression in a closure automatically.',
        'Call condition() to evaluate it.',
        'The caller writes myAssert(x > 0, "positive") without braces.',
      ],
      concepts: ['autoclosure'],
    },
    {
      id: 'swift-closures-13',
      title: 'Fix Missing in Keyword',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the closure syntax error.',
      skeleton: `let greet = { (name: String) -> String
    return "Hello, \\(name)"
}`,
      solution: `let greet = { (name: String) -> String in
    return "Hello, \\(name)"
}`,
      hints: [
        'Closures need the `in` keyword after the signature.',
        'Place `in` after the return type.',
        'in separates the header from the body.',
      ],
      concepts: ['closure-syntax', 'in-keyword'],
    },
    {
      id: 'swift-closures-14',
      title: 'Fix Non-Escaping Storage',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the function that stores a closure but does not mark it as escaping.',
      skeleton: `var stored: (() -> Void)? = nil
func save(_ action: () -> Void) {
    stored = action
}`,
      solution: `var stored: (() -> Void)? = nil
func save(_ action: @escaping () -> Void) {
    stored = action
}`,
      hints: [
        'Closures stored in external variables must be @escaping.',
        'Non-escaping closures cannot outlive the function.',
        'Add @escaping before the closure type.',
      ],
      concepts: ['escaping-closures'],
    },
    {
      id: 'swift-closures-15',
      title: 'Fix Closure Return',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the closure that should return a value but does not.',
      skeleton: `let double: (Int) -> Int = { x in
    x * 2
    return
}`,
      solution: `let double: (Int) -> Int = { x in
    return x * 2
}`,
      hints: [
        'The closure must return an Int.',
        'Return the expression x * 2.',
        'Remove the bare `return` and add `return` before the expression.',
      ],
      concepts: ['closure-return'],
    },
    {
      id: 'swift-closures-16',
      title: 'Predict Capture Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `var x = 10
let closure = { print(x) }
x = 20
closure()`,
      solution: `20`,
      hints: [
        'Closures capture variables by reference by default.',
        'x is changed to 20 before the closure runs.',
        'The closure sees the current value of x.',
      ],
      concepts: ['capturing-values', 'reference-capture'],
    },
    {
      id: 'swift-closures-17',
      title: 'Predict Capture List Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `var x = 10
let closure = { [x] in print(x) }
x = 20
closure()`,
      solution: `10`,
      hints: [
        'The capture list [x] captures x by value.',
        'The value is frozen at 10 when the closure is created.',
        'Changing x afterward does not affect the captured copy.',
      ],
      concepts: ['capture-lists', 'value-capture'],
    },
    {
      id: 'swift-closures-18',
      title: 'Predict Map Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let result = [1, 2, 3].map { $0 * $0 }
print(result)`,
      solution: `[1, 4, 9]`,
      hints: [
        'map applies the closure to each element.',
        '1*1=1, 2*2=4, 3*3=9.',
        'The result is an array of squares.',
      ],
      concepts: ['map', 'closures'],
    },
    {
      id: 'swift-closures-19',
      title: 'Refactor to Trailing Closure',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Refactor the closure argument to use trailing closure syntax.',
      skeleton: `let sorted = [3, 1, 2].sorted(by: { (a: Int, b: Int) -> Bool in return a < b })`,
      solution: `let sorted = [3, 1, 2].sorted { $0 < $1 }`,
      hints: [
        'Remove the argument label and parentheses.',
        'Use shorthand argument names $0 and $1.',
        'Single-expression closures can omit return.',
      ],
      concepts: ['trailing-closures', 'shorthand-arguments'],
    },
    {
      id: 'swift-closures-20',
      title: 'Refactor to Use Closure Shorthand',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Simplify the closure using operator shorthand.',
      skeleton: `let numbers = [5, 2, 8, 1]
let sorted = numbers.sorted { (a, b) -> Bool in
    return a < b
}`,
      solution: `let numbers = [5, 2, 8, 1]
let sorted = numbers.sorted(by: <)`,
      hints: [
        'Operators can be passed directly as closures.',
        'The < operator matches the (Int, Int) -> Bool signature.',
        'Use sorted(by: <) for the simplest form.',
      ],
      concepts: ['operator-closure', 'refactoring'],
    },
  ],
};
