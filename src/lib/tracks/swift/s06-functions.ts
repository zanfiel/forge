import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-func',
  title: '06. Functions',
  explanation: `## Functions in Swift

Functions are first-class citizens in Swift with rich parameter handling.

\`\`\`swift
func greet(person name: String) -> String {
    return "Hello, \\(name)!"
}
greet(person: "Alice")
\`\`\`

### Argument Labels & Parameter Names
\`\`\`swift
func move(from start: Int, to end: Int) { }
move(from: 0, to: 10)

func add(_ a: Int, _ b: Int) -> Int { a + b }
add(3, 5)  // no external labels
\`\`\`

### inout Parameters
\`\`\`swift
func double(_ x: inout Int) { x *= 2 }
var n = 5
double(&n)  // n is now 10
\`\`\`

### Variadic Parameters
\`\`\`swift
func sum(_ numbers: Int...) -> Int {
    numbers.reduce(0, +)
}
sum(1, 2, 3, 4)  // 10
\`\`\``,
  exercises: [
    {
      id: 'swift-func-1',
      title: 'Basic Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a function that returns a String greeting.',
      skeleton: `___ sayHello() -> ___ {
    return "Hello!"
}`,
      solution: `func sayHello() -> String {
    return "Hello!"
}`,
      hints: [
        'Functions are declared with the `func` keyword.',
        'The return type follows the -> arrow.',
        'String is the return type.',
      ],
      concepts: ['func', 'return-type'],
    },
    {
      id: 'swift-func-2',
      title: 'Function with Parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Complete the function that takes a name parameter.',
      skeleton: `func greet(___ name: String) -> String {
    return "Hello, \\(name)!"
}`,
      solution: `func greet(_ name: String) -> String {
    return "Hello, \\(name)!"
}`,
      hints: [
        'Use _ to omit the argument label.',
        'The parameter name is still used inside the function.',
        'Callers write greet("Alice") without a label.',
      ],
      concepts: ['argument-labels', 'parameters'],
    },
    {
      id: 'swift-func-3',
      title: 'Argument Labels',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Add argument labels to make the call read naturally: move(from: 0, to: 10).',
      skeleton: `func move(___ start: Int, ___ end: Int) {
    print("Moving from \\(start) to \\(end)")
}`,
      solution: `func move(from start: Int, to end: Int) {
    print("Moving from \\(start) to \\(end)")
}`,
      hints: [
        'Argument labels come before the parameter name.',
        'The label is used at the call site.',
        'The parameter name is used inside the function.',
      ],
      concepts: ['argument-labels'],
    },
    {
      id: 'swift-func-4',
      title: 'Default Parameter Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Add a default value of "World" to the name parameter.',
      skeleton: `func hello(name: String ___) -> String {
    return "Hello, \\(name)!"
}`,
      solution: `func hello(name: String = "World") -> String {
    return "Hello, \\(name)!"
}`,
      hints: [
        'Default values use = after the type.',
        'Callers can omit parameters with defaults.',
        'Use = "World" after String.',
      ],
      concepts: ['default-parameters'],
    },
    {
      id: 'swift-func-5',
      title: 'inout Parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Mark the parameter as inout so it can be modified.',
      skeleton: `func increment(_ value: ___ Int) {
    value += 1
}
var x = 5
increment(___x)`,
      solution: `func increment(_ value: inout Int) {
    value += 1
}
var x = 5
increment(&x)`,
      hints: [
        'Use `inout` before the type to allow mutation.',
        'Pass the variable with & at the call site.',
        'inout parameters are modified in place.',
      ],
      concepts: ['inout'],
    },
    {
      id: 'swift-func-6',
      title: 'Variadic Parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use a variadic parameter to accept multiple integers.',
      skeleton: `func average(_ numbers: Int___) -> Double {
    let sum = numbers.reduce(0, +)
    return Double(sum) / Double(numbers.count)
}`,
      solution: `func average(_ numbers: Int...) -> Double {
    let sum = numbers.reduce(0, +)
    return Double(sum) / Double(numbers.count)
}`,
      hints: [
        'Variadic parameters use ... after the type.',
        'Inside the function, it becomes an Array.',
        'Callers pass comma-separated values.',
      ],
      concepts: ['variadic-parameters'],
    },
    {
      id: 'swift-func-7',
      title: 'Write a Max Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write a function that returns the larger of two integers.',
      skeleton: `func maxOf(_ a: Int, _ b: Int) -> Int {
    // Return the larger value
}`,
      solution: `func maxOf(_ a: Int, _ b: Int) -> Int {
    return a > b ? a : b
}`,
      hints: [
        'Compare a and b.',
        'Use the ternary operator or if/else.',
        'Return the larger value.',
      ],
      concepts: ['comparison', 'ternary-operator'],
    },
    {
      id: 'swift-func-8',
      title: 'Write a Function Returning a Tuple',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that returns both the quotient and remainder of integer division.',
      skeleton: `func divmod(_ a: Int, _ b: Int) -> (quotient: Int, remainder: Int) {
    // Return both quotient and remainder
}`,
      solution: `func divmod(_ a: Int, _ b: Int) -> (quotient: Int, remainder: Int) {
    return (quotient: a / b, remainder: a % b)
}`,
      hints: [
        'Use / for integer division.',
        'Use % for the remainder.',
        'Return a named tuple.',
      ],
      concepts: ['tuples', 'return-type'],
    },
    {
      id: 'swift-func-9',
      title: 'Recursive Fibonacci',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a recursive function that returns the nth Fibonacci number.',
      skeleton: `func fibonacci(_ n: Int) -> Int {
    // Base cases: fib(0) = 0, fib(1) = 1
    // Recursive case: fib(n) = fib(n-1) + fib(n-2)
}`,
      solution: `func fibonacci(_ n: Int) -> Int {
    if n <= 0 { return 0 }
    if n == 1 { return 1 }
    return fibonacci(n - 1) + fibonacci(n - 2)
}`,
      hints: [
        'Handle base cases first.',
        'fib(0) = 0 and fib(1) = 1.',
        'Recursively sum the two previous values.',
      ],
      concepts: ['recursion', 'base-case'],
    },
    {
      id: 'swift-func-10',
      title: 'Higher-Order Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that takes another function as a parameter and applies it to a value.',
      skeleton: `func apply(_ value: Int, _ transform: (Int) -> Int) -> Int {
    // Apply the transform to value and return result
}`,
      solution: `func apply(_ value: Int, _ transform: (Int) -> Int) -> Int {
    return transform(value)
}`,
      hints: [
        'Call the transform function with value.',
        'Functions can be passed as parameters.',
        'Return the result of the function call.',
      ],
      concepts: ['higher-order-functions', 'function-types'],
    },
    {
      id: 'swift-func-11',
      title: 'Swap with inout',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that swaps two integers using inout parameters.',
      skeleton: `func swapValues(_ a: inout Int, _ b: inout Int) {
    // Swap a and b
}`,
      solution: `func swapValues(_ a: inout Int, _ b: inout Int) {
    let temp = a
    a = b
    b = temp
}`,
      hints: [
        'Store one value in a temporary constant.',
        'inout allows modifying the original variables.',
        'You can also use a tuple swap: (a, b) = (b, a).',
      ],
      concepts: ['inout', 'swap'],
    },
    {
      id: 'swift-func-12',
      title: 'Variadic Sum',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write a variadic function that sums all its arguments.',
      skeleton: `func sum(_ numbers: Int...) -> Int {
    // Sum all the numbers
}`,
      solution: `func sum(_ numbers: Int...) -> Int {
    return numbers.reduce(0, +)
}`,
      hints: [
        'Variadic params become an array inside the function.',
        'Use reduce to sum all elements.',
        'reduce(0, +) starts at 0 and adds each element.',
      ],
      concepts: ['variadic-parameters', 'reduce'],
    },
    {
      id: 'swift-func-13',
      title: 'Fix Missing Return Type',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the function that is missing its return type.',
      skeleton: `func double(_ x: Int) {
    return x * 2
}
let result = double(5)`,
      solution: `func double(_ x: Int) -> Int {
    return x * 2
}
let result = double(5)`,
      hints: [
        'The function returns a value but has no return type.',
        'Add -> Int after the parameter list.',
        'Without a return type, the function returns Void.',
      ],
      concepts: ['return-type'],
    },
    {
      id: 'swift-func-14',
      title: 'Fix Missing Ampersand',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the call to an inout function.',
      skeleton: `func triple(_ x: inout Int) {
    x *= 3
}
var n = 4
triple(n)`,
      solution: `func triple(_ x: inout Int) {
    x *= 3
}
var n = 4
triple(&n)`,
      hints: [
        'inout parameters require & at the call site.',
        'The & indicates the value is passed by reference.',
        'Add & before the variable name.',
      ],
      concepts: ['inout', 'ampersand'],
    },
    {
      id: 'swift-func-15',
      title: 'Fix Wrong Argument Label',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the function call to use the correct argument label.',
      skeleton: `func greet(person name: String) -> String {
    return "Hi, \\(name)"
}
let msg = greet(name: "Alice")`,
      solution: `func greet(person name: String) -> String {
    return "Hi, \\(name)"
}
let msg = greet(person: "Alice")`,
      hints: [
        'The argument label is `person`, not `name`.',
        'The external label is used at the call site.',
        'The internal parameter name is used inside the body.',
      ],
      concepts: ['argument-labels'],
    },
    {
      id: 'swift-func-16',
      title: 'Predict Function Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `func add(_ a: Int, _ b: Int = 10) -> Int {
    return a + b
}
print(add(5))`,
      solution: `15`,
      hints: [
        'b has a default value of 10.',
        'Only a is provided as 5.',
        '5 + 10 = 15.',
      ],
      concepts: ['default-parameters'],
    },
    {
      id: 'swift-func-17',
      title: 'Predict inout Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `func addTen(_ x: inout Int) {
    x += 10
}
var val = 7
addTen(&val)
print(val)`,
      solution: `17`,
      hints: [
        'inout modifies the original variable.',
        'val starts at 7, then 10 is added.',
        '7 + 10 = 17.',
      ],
      concepts: ['inout'],
    },
    {
      id: 'swift-func-18',
      title: 'Predict Variadic Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `func count(_ items: String...) -> Int {
    return items.count
}
print(count("a", "b", "c"))`,
      solution: `3`,
      hints: [
        'Three string arguments are passed.',
        'items becomes an array of 3 elements.',
        'items.count is 3.',
      ],
      concepts: ['variadic-parameters'],
    },
    {
      id: 'swift-func-19',
      title: 'Refactor to Use Default Parameter',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor two overloaded functions into one with a default parameter.',
      skeleton: `func greet(_ name: String) -> String {
    return "Hello, \\(name)!"
}
func greetWithTitle(_ name: String, _ title: String) -> String {
    return "Hello, \\(title) \\(name)!"
}`,
      solution: `func greet(_ name: String, title: String = "") -> String {
    if title.isEmpty {
        return "Hello, \\(name)!"
    }
    return "Hello, \\(title) \\(name)!"
}`,
      hints: [
        'Combine into one function with a default parameter.',
        'Use an empty string as the default for title.',
        'Check if title is empty to decide format.',
      ],
      concepts: ['default-parameters', 'refactoring'],
    },
    {
      id: 'swift-func-20',
      title: 'Refactor to Use Argument Labels',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Add argument labels to make the function call more readable.',
      skeleton: `func send(_ message: String, _ recipient: String) {
    print("Sending '\\(message)' to \\(recipient)")
}
send("Hi", "Alice")`,
      solution: `func send(_ message: String, to recipient: String) {
    print("Sending '\\(message)' to \\(recipient)")
}
send("Hi", to: "Alice")`,
      hints: [
        'Add an argument label before the parameter name.',
        'Use `to` as the label for recipient.',
        'The call becomes send("Hi", to: "Alice").',
      ],
      concepts: ['argument-labels', 'readability'],
    },
  ],
};
