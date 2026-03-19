import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-opt',
  title: '11. Optionals',
  explanation: `## Optionals in Swift

Optionals represent a value that may or may not exist. They are fundamental to Swift's safety.

\`\`\`swift
var name: String? = "Alice"
name = nil  // valid for optionals

// if let binding
if let n = name {
    print(n)  // unwrapped value
}

// guard let
func greet(_ name: String?) {
    guard let n = name else { return }
    print("Hello, \\(n)")
}
\`\`\`

### Optional Chaining
\`\`\`swift
let count = name?.count  // Int? -- nil if name is nil
\`\`\`

### Nil-Coalescing & map/flatMap
\`\`\`swift
let display = name ?? "Anonymous"
let upper = name.map { $0.uppercased() }  // String?
\`\`\``,
  exercises: [
    {
      id: 'swift-opt-1',
      title: 'Declare an Optional',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare an optional String variable.',
      skeleton: `var nickname: String___ = nil`,
      solution: `var nickname: String? = nil`,
      hints: [
        'Append ? to the type to make it optional.',
        'String? means "String or nil".',
        'Optionals default to nil if not assigned.',
      ],
      concepts: ['Optional', 'nil'],
    },
    {
      id: 'swift-opt-2',
      title: 'If Let Binding',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Safely unwrap an optional with if let.',
      skeleton: `let name: String? = "Alice"
___ ___ n = name {
    print(n)
}`,
      solution: `let name: String? = "Alice"
if let n = name {
    print(n)
}`,
      hints: [
        'if let unwraps the optional into a new constant.',
        'The unwrapped value is available inside the block.',
        'If nil, the block is skipped.',
      ],
      concepts: ['if-let', 'optional-binding'],
    },
    {
      id: 'swift-opt-3',
      title: 'Guard Let',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use guard let to unwrap and exit early if nil.',
      skeleton: `func process(_ val: Int?) -> Int {
    ___ ___ v = val ___ { return 0 }
    return v * 2
}`,
      solution: `func process(_ val: Int?) -> Int {
    guard let v = val else { return 0 }
    return v * 2
}`,
      hints: [
        'guard let unwraps or exits the scope.',
        'The else clause must exit (return, throw, etc.).',
        'The unwrapped value is available after the guard.',
      ],
      concepts: ['guard-let'],
    },
    {
      id: 'swift-opt-4',
      title: 'Optional Chaining',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use optional chaining to safely access a property.',
      skeleton: `let name: String? = "Swift"
let count = name___count`,
      solution: `let name: String? = "Swift"
let count = name?.count`,
      hints: [
        'Use ?. for optional chaining.',
        'If name is nil, the entire expression returns nil.',
        'The result type is Int?.',
      ],
      concepts: ['optional-chaining'],
    },
    {
      id: 'swift-opt-5',
      title: 'Nil-Coalescing Default',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Provide a default value when the optional is nil.',
      skeleton: `let input: String? = nil
let value = input ___ "default"`,
      solution: `let input: String? = nil
let value = input ?? "default"`,
      hints: [
        'Use ?? to provide a fallback.',
        'If input is nil, "default" is used.',
        'The result is a non-optional String.',
      ],
      concepts: ['nil-coalescing'],
    },
    {
      id: 'swift-opt-6',
      title: 'Optional Map',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Transform an optional value without unwrapping manually.',
      skeleton: `let number: Int? = 5
let doubled = number.___ { $0 * 2 }`,
      solution: `let number: Int? = 5
let doubled = number.map { $0 * 2 }`,
      hints: [
        'Optional has a map method.',
        'If the optional has a value, the closure is applied.',
        'If nil, map returns nil.',
      ],
      concepts: ['optional-map'],
    },
    {
      id: 'swift-opt-7',
      title: 'Safe Array Access',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that safely accesses an array index, returning nil if out of bounds.',
      skeleton: `func safeGet(_ arr: [Int], at index: Int) -> Int? {
    // Return element at index, or nil if out of bounds
}`,
      solution: `func safeGet(_ arr: [Int], at index: Int) -> Int? {
    guard index >= 0 && index < arr.count else { return nil }
    return arr[index]
}`,
      hints: [
        'Check if the index is within valid bounds.',
        'Return nil if the index is out of range.',
        'Valid indices are 0..<arr.count.',
      ],
      concepts: ['guard', 'Optional', 'bounds-checking'],
    },
    {
      id: 'swift-opt-8',
      title: 'Chain Multiple Optionals',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that returns the uppercased first character of an optional string.',
      skeleton: `func firstUpper(_ s: String?) -> Character? {
    // Return uppercased first character, or nil
}`,
      solution: `func firstUpper(_ s: String?) -> Character? {
    return s?.first.map { Character($0.uppercased()) }
}`,
      hints: [
        'Use optional chaining on s?.first.',
        'first returns a Character? for the string.',
        'Chain further operations with map.',
      ],
      concepts: ['optional-chaining', 'optional-map'],
    },
    {
      id: 'swift-opt-9',
      title: 'Unwrap or Throw',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that unwraps an optional or throws an error.',
      skeleton: `enum UnwrapError: Error {
    case nilValue
}

func unwrapOrThrow<T>(_ value: T?) throws -> T {
    // Unwrap or throw UnwrapError.nilValue
}`,
      solution: `enum UnwrapError: Error {
    case nilValue
}

func unwrapOrThrow<T>(_ value: T?) throws -> T {
    guard let v = value else { throw UnwrapError.nilValue }
    return v
}`,
      hints: [
        'Use guard let to attempt unwrapping.',
        'Throw the error in the else clause.',
        'Return the unwrapped value after the guard.',
      ],
      concepts: ['guard-let', 'throws', 'generics'],
    },
    {
      id: 'swift-opt-10',
      title: 'FlatMap Optional Chain',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a function that converts an optional String to optional Int using flatMap.',
      skeleton: `func optionalInt(_ s: String?) -> Int? {
    // Convert optional string to optional int
}`,
      solution: `func optionalInt(_ s: String?) -> Int? {
    return s.flatMap { Int($0) }
}`,
      hints: [
        'flatMap unwraps, transforms, and flattens.',
        'Int($0) returns Int?, flatMap flattens the Optional<Optional<Int>>.',
        'If s is nil, flatMap returns nil directly.',
      ],
      concepts: ['flatMap', 'optional-chaining'],
    },
    {
      id: 'swift-opt-11',
      title: 'Multiple Optional Binding',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that returns the sum of two optional Ints, or nil if either is nil.',
      skeleton: `func addOptionals(_ a: Int?, _ b: Int?) -> Int? {
    // Return a + b if both exist, nil otherwise
}`,
      solution: `func addOptionals(_ a: Int?, _ b: Int?) -> Int? {
    guard let a = a, let b = b else { return nil }
    return a + b
}`,
      hints: [
        'Use guard let with comma to bind both.',
        'Both must be non-nil to proceed.',
        'Return nil if either is nil.',
      ],
      concepts: ['multiple-binding', 'guard-let'],
    },
    {
      id: 'swift-opt-12',
      title: 'Optional Default with Closure',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that returns the optional value or computes a default lazily.',
      skeleton: `func valueOrDefault<T>(_ optional: T?, default defaultValue: @autoclosure () -> T) -> T {
    // Return the optional value or the default
}`,
      solution: `func valueOrDefault<T>(_ optional: T?, default defaultValue: @autoclosure () -> T) -> T {
    return optional ?? defaultValue()
}`,
      hints: [
        'Use the nil-coalescing operator.',
        '@autoclosure wraps the default in a closure.',
        'The default is only evaluated if needed.',
      ],
      concepts: ['nil-coalescing', 'autoclosure'],
    },
    {
      id: 'swift-opt-13',
      title: 'Fix Force Unwrap Crash',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the force unwrap that crashes on nil.',
      skeleton: `let data: [String: Int] = ["a": 1]
let value = data["b"]!
print(value)`,
      solution: `let data: [String: Int] = ["a": 1]
let value = data["b"] ?? 0
print(value)`,
      hints: [
        'Force unwrapping nil crashes the program.',
        'Key "b" does not exist in the dictionary.',
        'Use ?? to provide a safe default.',
      ],
      concepts: ['force-unwrap', 'nil-coalescing'],
    },
    {
      id: 'swift-opt-14',
      title: 'Fix Nested Optional',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the double-optional issue by using flatMap instead of map.',
      skeleton: `let text: String? = "42"
let number: Int?? = text.map { Int($0) }
// number should be Int?, not Int??`,
      solution: `let text: String? = "42"
let number: Int? = text.flatMap { Int($0) }`,
      hints: [
        'map wraps the result in another Optional.',
        'Int($0) returns Int?, so map gives Int??.',
        'flatMap flattens the nested Optional.',
      ],
      concepts: ['flatMap', 'nested-optionals'],
    },
    {
      id: 'swift-opt-15',
      title: 'Fix Implicit Unwrap Misuse',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the implicitly unwrapped optional that should be a regular optional.',
      skeleton: `var name: String! = nil
print(name.count)  // Crash!`,
      solution: `var name: String? = nil
print(name?.count ?? 0)`,
      hints: [
        'String! crashes when accessed as nil.',
        'Use String? for safe optionals.',
        'Add optional chaining and a default.',
      ],
      concepts: ['implicitly-unwrapped', 'optional-chaining'],
    },
    {
      id: 'swift-opt-16',
      title: 'Predict If Let Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let x: Int? = nil
if let v = x {
    print(v)
} else {
    print("none")
}`,
      solution: `none`,
      hints: [
        'x is nil, so if let fails.',
        'The else branch executes.',
        '"none" is printed.',
      ],
      concepts: ['if-let'],
    },
    {
      id: 'swift-opt-17',
      title: 'Predict Optional Chaining',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let text: String? = "Hello"
let count = text?.count ?? 0
print(count)`,
      solution: `5`,
      hints: [
        'text is not nil, so ?.count returns 5.',
        'Since the result is not nil, ?? is not used.',
        'The output is 5.',
      ],
      concepts: ['optional-chaining', 'nil-coalescing'],
    },
    {
      id: 'swift-opt-18',
      title: 'Predict Map on Optional',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let val: Int? = 3
let result = val.map { $0 * 10 }
print(result ?? -1)`,
      solution: `30`,
      hints: [
        'val is 3 (not nil), so map applies the closure.',
        '3 * 10 = 30.',
        'result is Optional(30), unwrapped to 30 by ??.',
      ],
      concepts: ['optional-map', 'nil-coalescing'],
    },
    {
      id: 'swift-opt-19',
      title: 'Refactor Force Unwraps to Guard',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Replace force unwraps with guard let for safety.',
      skeleton: `func printInfo(_ name: String?, _ age: Int?) {
    print("\\(name!) is \\(age!) years old")
}`,
      solution: `func printInfo(_ name: String?, _ age: Int?) {
    guard let name = name, let age = age else { return }
    print("\\(name) is \\(age) years old")
}`,
      hints: [
        'Force unwrapping can crash if nil.',
        'Use guard let to safely unwrap both.',
        'Exit early if either is nil.',
      ],
      concepts: ['guard-let', 'refactoring'],
    },
    {
      id: 'swift-opt-20',
      title: 'Refactor if-let Pyramid to Guard',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Flatten nested if-let bindings into sequential guards.',
      skeleton: `func process(_ a: Int?, _ b: Int?, _ c: Int?) -> Int {
    if let a = a {
        if let b = b {
            if let c = c {
                return a + b + c
            }
        }
    }
    return 0
}`,
      solution: `func process(_ a: Int?, _ b: Int?, _ c: Int?) -> Int {
    guard let a = a, let b = b, let c = c else { return 0 }
    return a + b + c
}`,
      hints: [
        'Multiple guard let bindings can be comma-separated.',
        'This flattens the pyramid of doom.',
        'All three must be non-nil to proceed.',
      ],
      concepts: ['guard-let', 'pyramid-of-doom', 'refactoring'],
    },
  ],
};
