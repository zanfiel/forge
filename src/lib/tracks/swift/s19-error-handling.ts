import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-error',
  title: '19. Error Handling',
  explanation: `## Error Handling in Swift

Swift uses a typed error system with \`throws\`, \`do-try-catch\`, and \`Result\`.

\`\`\`swift
enum FileError: Error {
    case notFound
    case permissionDenied
}

func readFile(_ name: String) throws -> String {
    guard name != "" else { throw FileError.notFound }
    return "contents"
}

do {
    let data = try readFile("test.txt")
    print(data)
} catch FileError.notFound {
    print("Not found")
} catch {
    print("Error: \\(error)")
}
\`\`\`

### Result Type
\`\`\`swift
func parse(_ input: String) -> Result<Int, Error> {
    guard let n = Int(input) else {
        return .failure(ParseError.invalid)
    }
    return .success(n)
}
\`\`\`

### try?, try!
\`\`\`swift
let result = try? readFile("x")  // Optional
let forced = try! readFile("y")  // Crashes on error
\`\`\``,
  exercises: [
    {
      id: 'swift-error-1',
      title: 'Define an Error Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Define a custom error type.',
      skeleton: `enum LoginError: ___ {
    case invalidUsername
    case wrongPassword
}`,
      solution: `enum LoginError: Error {
    case invalidUsername
    case wrongPassword
}`,
      hints: [
        'Custom errors conform to the Error protocol.',
        'Use enum with : Error.',
        'Each case represents a different error.',
      ],
      concepts: ['Error', 'enum'],
    },
    {
      id: 'swift-error-2',
      title: 'Throwing Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Mark a function as throwing.',
      skeleton: `func validate(_ input: String) ___ -> Bool {
    guard !input.isEmpty else { throw ValidationError.empty }
    return true
}`,
      solution: `func validate(_ input: String) throws -> Bool {
    guard !input.isEmpty else { throw ValidationError.empty }
    return true
}`,
      hints: [
        'Add `throws` before the return arrow.',
        'throws indicates the function can throw errors.',
        'Place it between parameters and return type.',
      ],
      concepts: ['throws'],
    },
    {
      id: 'swift-error-3',
      title: 'Do-Try-Catch',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Handle a throwing function with do-try-catch.',
      skeleton: `___ {
    let result = ___ riskyFunction()
    print(result)
} ___ {
    print("Error: \\(error)")
}`,
      solution: `do {
    let result = try riskyFunction()
    print(result)
} catch {
    print("Error: \\(error)")
}`,
      hints: [
        'Wrap in a `do` block.',
        'Call throwing functions with `try`.',
        '`catch` handles any thrown errors.',
      ],
      concepts: ['do-try-catch'],
    },
    {
      id: 'swift-error-4',
      title: 'Try Optional',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use try? to convert an error to nil.',
      skeleton: `let value = ___? riskyFunction()`,
      solution: `let value = try? riskyFunction()`,
      hints: [
        'try? returns nil on error.',
        'The result is an Optional.',
        'No do-catch needed.',
      ],
      concepts: ['try-optional'],
    },
    {
      id: 'swift-error-5',
      title: 'Catch Specific Error',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Catch a specific error case.',
      skeleton: `enum AppError: Error { case network, parsing }
do {
    try loadData()
} catch AppError.___ {
    print("Network issue")
} catch {
    print("Other: \\(error)")
}`,
      solution: `enum AppError: Error { case network, parsing }
do {
    try loadData()
} catch AppError.network {
    print("Network issue")
} catch {
    print("Other: \\(error)")
}`,
      hints: [
        'Match specific cases in catch clauses.',
        'Use the full enum case path.',
        'A general catch handles remaining errors.',
      ],
      concepts: ['catch-pattern'],
    },
    {
      id: 'swift-error-6',
      title: 'Result Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Return a Result with success or failure.',
      skeleton: `enum ParseError: Error { case invalid }
func parse(_ s: String) -> Result<Int, ParseError> {
    guard let n = Int(s) else { return .___(ParseError.invalid) }
    return .___(n)
}`,
      solution: `enum ParseError: Error { case invalid }
func parse(_ s: String) -> Result<Int, ParseError> {
    guard let n = Int(s) else { return .failure(ParseError.invalid) }
    return .success(n)
}`,
      hints: [
        'Result has .success and .failure cases.',
        'Return .failure with the error.',
        'Return .success with the value.',
      ],
      concepts: ['Result'],
    },
    {
      id: 'swift-error-7',
      title: 'Throwing Initializer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct with a throwing initializer that validates input.',
      skeleton: `enum AgeError: Error { case tooYoung, tooOld }

struct Person {
    let name: String
    let age: Int

    // Add a throwing init that rejects age < 0 or > 150
}`,
      solution: `enum AgeError: Error { case tooYoung, tooOld }

struct Person {
    let name: String
    let age: Int

    init(name: String, age: Int) throws {
        guard age >= 0 else { throw AgeError.tooYoung }
        guard age <= 150 else { throw AgeError.tooOld }
        self.name = name
        self.age = age
    }
}`,
      hints: [
        'Add throws after init parameters.',
        'Use guard to validate before assigning.',
        'Throw the appropriate error case.',
      ],
      concepts: ['throwing-init'],
    },
    {
      id: 'swift-error-8',
      title: 'Rethrows Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a function that rethrows errors from a closure parameter.',
      skeleton: `func attempt<T>(_ body: () throws -> T) rethrows -> T {
    // Call body and rethrow any errors
}`,
      solution: `func attempt<T>(_ body: () throws -> T) rethrows -> T {
    return try body()
}`,
      hints: [
        'rethrows means it only throws if the closure throws.',
        'Call the closure with try.',
        'The error propagates to the caller.',
      ],
      concepts: ['rethrows'],
    },
    {
      id: 'swift-error-9',
      title: 'Convert Throws to Result',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that wraps a throwing call into a Result.',
      skeleton: `func toResult<T>(_ body: () throws -> T) -> Result<T, Error> {
    // Convert throwing to Result
}`,
      solution: `func toResult<T>(_ body: () throws -> T) -> Result<T, Error> {
    do {
        return .success(try body())
    } catch {
        return .failure(error)
    }
}`,
      hints: [
        'Use do-try-catch internally.',
        'Return .success on success.',
        'Return .failure on catch.',
      ],
      concepts: ['Result', 'do-try-catch'],
    },
    {
      id: 'swift-error-10',
      title: 'Chain Result with Map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Transform a Result value using map.',
      skeleton: `func doubleResult(_ result: Result<Int, Error>) -> Result<Int, Error> {
    // Map the success value to double it
}`,
      solution: `func doubleResult(_ result: Result<Int, Error>) -> Result<Int, Error> {
    return result.map { $0 * 2 }
}`,
      hints: [
        'Result has a map method.',
        'map transforms the success value.',
        'Failure cases pass through unchanged.',
      ],
      concepts: ['Result', 'map'],
    },
    {
      id: 'swift-error-11',
      title: 'Error with Associated Value',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Define an error type with associated values for context.',
      skeleton: `// Define a NetworkError with cases:
// - badURL(String)
// - httpError(Int)
// - timeout
`,
      solution: `enum NetworkError: Error {
    case badURL(String)
    case httpError(Int)
    case timeout
}`,
      hints: [
        'Enum cases can have associated values.',
        'badURL carries the invalid URL string.',
        'httpError carries the status code.',
      ],
      concepts: ['Error', 'associated-values'],
    },
    {
      id: 'swift-error-12',
      title: 'LocalizedError Conformance',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Make an error conform to LocalizedError for user-friendly messages.',
      skeleton: `enum AppError: LocalizedError {
    case notFound
    case unauthorized

    var errorDescription: String? {
        // Return human-readable messages
    }
}`,
      solution: `enum AppError: LocalizedError {
    case notFound
    case unauthorized

    var errorDescription: String? {
        switch self {
        case .notFound: return "The requested item was not found."
        case .unauthorized: return "You are not authorized to perform this action."
        }
    }
}`,
      hints: [
        'LocalizedError has an errorDescription property.',
        'Switch on self to return per-case messages.',
        'These show up in error.localizedDescription.',
      ],
      concepts: ['LocalizedError'],
    },
    {
      id: 'swift-error-13',
      title: 'Fix Missing Try',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code that calls a throwing function without try.',
      skeleton: `func load() throws -> String { return "data" }
let data = load()`,
      solution: `func load() throws -> String { return "data" }
let data = try! load()`,
      hints: [
        'Throwing functions must be called with try.',
        'Use try, try?, or try!.',
        'try! is fine here since load never actually throws.',
      ],
      concepts: ['try'],
    },
    {
      id: 'swift-error-14',
      title: 'Fix Catch Without Do',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the catch block that is missing its do block.',
      skeleton: `let result = try riskyFunction()
catch {
    print("Error")
}`,
      solution: `do {
    let result = try riskyFunction()
    print(result)
} catch {
    print("Error")
}`,
      hints: [
        'catch must be inside a do block.',
        'Wrap the try call in do { }.',
        'do-catch is the complete error handling structure.',
      ],
      concepts: ['do-try-catch'],
    },
    {
      id: 'swift-error-15',
      title: 'Fix Non-Exhaustive Catch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the error handling that misses some error cases.',
      skeleton: `enum E: Error { case a, b, c }
func test() throws { throw E.c }
do {
    try test()
} catch E.a {
    print("A")
} catch E.b {
    print("B")
}`,
      solution: `enum E: Error { case a, b, c }
func test() throws { throw E.c }
do {
    try test()
} catch E.a {
    print("A")
} catch E.b {
    print("B")
} catch {
    print("Other: \\(error)")
}`,
      hints: [
        'Catch blocks must be exhaustive.',
        'E.c is not handled.',
        'Add a general catch clause.',
      ],
      concepts: ['exhaustive-catch'],
    },
    {
      id: 'swift-error-16',
      title: 'Predict Try? Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `enum E: Error { case fail }
func failing() throws -> Int { throw E.fail }
let result = try? failing()
print(result ?? -1)`,
      solution: `-1`,
      hints: [
        'try? returns nil when the function throws.',
        'result is nil.',
        '?? provides -1 as the default.',
      ],
      concepts: ['try-optional'],
    },
    {
      id: 'swift-error-17',
      title: 'Predict Result Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let r: Result<Int, Error> = .success(42)
switch r {
case .success(let v): print(v)
case .failure(let e): print(e)
}`,
      solution: `42`,
      hints: [
        'r is .success(42).',
        'The success case matches.',
        'v is 42.',
      ],
      concepts: ['Result', 'pattern-matching'],
    },
    {
      id: 'swift-error-18',
      title: 'Predict Catch Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `enum E: Error { case x }
func fail() throws { throw E.x }
do {
    try fail()
} catch {
    print("caught")
}`,
      solution: `caught`,
      hints: [
        'fail() throws E.x.',
        'The general catch clause matches.',
        '"caught" is printed.',
      ],
      concepts: ['do-try-catch'],
    },
    {
      id: 'swift-error-19',
      title: 'Refactor to Result',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor the throwing function to return a Result instead.',
      skeleton: `enum ParseError: Error { case invalid }
func parseInt(_ s: String) throws -> Int {
    guard let n = Int(s) else { throw ParseError.invalid }
    return n
}`,
      solution: `enum ParseError: Error { case invalid }
func parseInt(_ s: String) -> Result<Int, ParseError> {
    guard let n = Int(s) else { return .failure(.invalid) }
    return .success(n)
}`,
      hints: [
        'Replace throws with Result return type.',
        'Return .failure instead of throwing.',
        'Return .success with the value.',
      ],
      concepts: ['Result', 'refactoring'],
    },
    {
      id: 'swift-error-20',
      title: 'Refactor Force Try to Safe Handling',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Replace try! with safe error handling.',
      skeleton: `let data = try! loadData()
print(data)`,
      solution: `do {
    let data = try loadData()
    print(data)
} catch {
    print("Failed to load: \\(error)")
}`,
      hints: [
        'try! crashes if the function throws.',
        'Use do-try-catch for safe handling.',
        'Log or handle the error gracefully.',
      ],
      concepts: ['do-try-catch', 'safety'],
    },
  ],
};
