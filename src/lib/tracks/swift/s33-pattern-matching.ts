import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-patterns',
  title: '33. Pattern Matching',
  explanation: `## Pattern Matching in Swift

Swift has powerful pattern matching capabilities that go far beyond simple switch statements.

### Switch with Value Binding

\`\`\`swift
let point = (3, 5)
switch point {
case (0, 0):
    print("Origin")
case (let x, 0):
    print("On x-axis at \\(x)")
case (0, let y):
    print("On y-axis at \\(y)")
case (let x, let y):
    print("At (\\(x), \\(y))")
}
\`\`\`

### Where Clauses

\`\`\`swift
let age = 25
switch age {
case let x where x < 13:
    print("Child")
case let x where x < 20:
    print("Teenager")
default:
    print("Adult")
}
\`\`\`

### Tuple Matching

\`\`\`swift
let response = (200, "OK")
switch response {
case (200...299, _):
    print("Success")
case (400...499, let message):
    print("Client error: \\(message)")
default:
    print("Other")
}
\`\`\`

### Enum Pattern Matching

\`\`\`swift
enum Result {
    case success(String)
    case failure(Error)
}

switch result {
case .success(let value):
    print(value)
case .failure(let error):
    print(error)
}
\`\`\`

### Pattern Matching Operators

The \`~=\` operator powers pattern matching behind the scenes:

\`\`\`swift
if case 1...10 = someNumber {
    print("In range")
}
\`\`\`
`,
  exercises: [
    {
      id: 'swift-patterns-1',
      title: 'Tuple Pattern Matching',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Match a tuple pattern in a switch statement.',
      skeleton: `let point = (2, 0)
switch point {
case (0, 0):
    print("Origin")
case (___, 0):
    print("On x-axis")
case (0, ___):
    print("On y-axis")
default:
    print("Elsewhere")
}`,
      solution: `let point = (2, 0)
switch point {
case (0, 0):
    print("Origin")
case (_, 0):
    print("On x-axis")
case (0, _):
    print("On y-axis")
default:
    print("Elsewhere")
}`,
      hints: [
        'The wildcard pattern matches any value.',
        'Use _ to ignore a value in the tuple.',
        'The answer is _ for both blanks.',
      ],
      concepts: ['tuple-matching', 'wildcard-pattern'],
    },
    {
      id: 'swift-patterns-2',
      title: 'Value Binding Pattern',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Bind a value in a switch case.',
      skeleton: `let response = (404, "Not Found")
switch response {
case (200, ___):
    print("OK: \\(msg)")
case (let code, let msg) where code >= 400:
    print("Error \\(code): \\(msg)")
default:
    print("Unknown")
}`,
      solution: `let response = (404, "Not Found")
switch response {
case (200, let msg):
    print("OK: \\(msg)")
case (let code, let msg) where code >= 400:
    print("Error \\(code): \\(msg)")
default:
    print("Unknown")
}`,
      hints: [
        'Use let to bind the matched value to a name.',
        'This captures the second element of the tuple.',
        'The answer is let msg.',
      ],
      concepts: ['value-binding', 'switch-patterns'],
    },
    {
      id: 'swift-patterns-3',
      title: 'Where Clause in Switch',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a where clause to filter a pattern.',
      skeleton: `let number = 15
switch number {
case let n ___ n % 3 == 0 && n % 5 == 0:
    print("FizzBuzz")
case let n where n % 3 == 0:
    print("Fizz")
case let n where n % 5 == 0:
    print("Buzz")
default:
    print("\\(number)")
}`,
      solution: `let number = 15
switch number {
case let n where n % 3 == 0 && n % 5 == 0:
    print("FizzBuzz")
case let n where n % 3 == 0:
    print("Fizz")
case let n where n % 5 == 0:
    print("Buzz")
default:
    print("\\(number)")
}`,
      hints: [
        'The where clause adds a condition to a pattern.',
        'It filters which values match the case.',
        'The keyword is where.',
      ],
      concepts: ['where-clause', 'conditional-pattern'],
    },
    {
      id: 'swift-patterns-4',
      title: 'Range Pattern Matching',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use a range pattern in a switch case.',
      skeleton: `let score = 85
switch score {
case 90___100:
    print("A")
case 80..<90:
    print("B")
case 70..<80:
    print("C")
default:
    print("F")
}`,
      solution: `let score = 85
switch score {
case 90...100:
    print("A")
case 80..<90:
    print("B")
case 70..<80:
    print("C")
default:
    print("F")
}`,
      hints: [
        'Use ... for a closed range (inclusive of both ends).',
        '90...100 matches 90 through 100.',
        'The answer is ... (three dots).',
      ],
      concepts: ['range-pattern', 'closed-range'],
    },
    {
      id: 'swift-patterns-5',
      title: 'Enum Pattern with Associated Value',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Extract an associated value from an enum in a switch.',
      skeleton: `enum Barcode {
    case upc(Int, Int, Int, Int)
    case qr(String)
}

let code = Barcode.qr("ABCDE")
switch code {
case .upc(let ns, let m, let p, let c):
    print("UPC: \\(ns)-\\(m)-\\(p)-\\(c)")
case .___(let value):
    print("QR: \\(value)")
}`,
      solution: `enum Barcode {
    case upc(Int, Int, Int, Int)
    case qr(String)
}

let code = Barcode.qr("ABCDE")
switch code {
case .upc(let ns, let m, let p, let c):
    print("UPC: \\(ns)-\\(m)-\\(p)-\\(c)")
case .qr(let value):
    print("QR: \\(value)")
}`,
      hints: [
        'Match the enum case and extract its associated value.',
        'Use the case name followed by let bindings.',
        'The answer is qr.',
      ],
      concepts: ['enum-pattern', 'associated-values'],
    },
    {
      id: 'swift-patterns-6',
      title: 'If Case Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use if case to match a single pattern.',
      skeleton: `enum Status {
    case active(since: String)
    case inactive
}

let status = Status.active(since: "2024-01-01")
___ ___ .active(let date) = status {
    print("Active since \\(date)")
}`,
      solution: `enum Status {
    case active(since: String)
    case inactive
}

let status = Status.active(since: "2024-01-01")
if case .active(let date) = status {
    print("Active since \\(date)")
}`,
      hints: [
        'if case matches a single enum pattern.',
        'It avoids writing a full switch statement.',
        'The syntax is if case .pattern = value.',
      ],
      concepts: ['if-case', 'enum-pattern'],
    },
    {
      id: 'swift-patterns-7',
      title: 'Write a Pattern-Based Classifier',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that classifies coordinates using pattern matching.',
      skeleton: `// Write a function classify that takes (x: Int, y: Int)
// Returns a String:
// (0,0) -> "origin"
// (x,0) where x>0 -> "positive x-axis"
// (x,0) where x<0 -> "negative x-axis"
// (0,y) where y>0 -> "positive y-axis"
// (0,y) where y<0 -> "negative y-axis"
// otherwise -> "quadrant N" (1-4, standard math quadrants)
`,
      solution: `func classify(_ point: (x: Int, y: Int)) -> String {
    switch point {
    case (0, 0):
        return "origin"
    case (let x, 0) where x > 0:
        return "positive x-axis"
    case (let x, 0) where x < 0:
        return "negative x-axis"
    case (0, let y) where y > 0:
        return "positive y-axis"
    case (0, let y) where y < 0:
        return "negative y-axis"
    case let (x, y) where x > 0 && y > 0:
        return "quadrant 1"
    case let (x, y) where x < 0 && y > 0:
        return "quadrant 2"
    case let (x, y) where x < 0 && y < 0:
        return "quadrant 3"
    default:
        return "quadrant 4"
    }
}`,
      hints: [
        'Use tuple patterns with where clauses.',
        'Match axes first, then quadrants.',
        'Standard quadrants: I(+,+), II(-,+), III(-,-), IV(+,-).',
      ],
      concepts: ['tuple-matching', 'where-clause', 'coordinate-geometry'],
    },
    {
      id: 'swift-patterns-8',
      title: 'Write an Expression Evaluator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a function that evaluates a simple expression tree using pattern matching.',
      skeleton: `indirect enum Expr {
    case number(Double)
    case add(Expr, Expr)
    case multiply(Expr, Expr)
    case negate(Expr)
}

// Write a function evaluate that takes an Expr and returns Double
`,
      solution: `func evaluate(_ expr: Expr) -> Double {
    switch expr {
    case .number(let value):
        return value
    case .add(let left, let right):
        return evaluate(left) + evaluate(right)
    case .multiply(let left, let right):
        return evaluate(left) * evaluate(right)
    case .negate(let inner):
        return -evaluate(inner)
    }
}`,
      hints: [
        'Use switch on the enum with pattern matching.',
        'Recursively evaluate sub-expressions.',
        'Each case extracts and processes associated values.',
      ],
      concepts: ['enum-pattern', 'recursive-evaluation', 'expression-tree'],
    },
    {
      id: 'swift-patterns-9',
      title: 'Write a Pattern-Based Validator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that validates HTTP responses using pattern matching.',
      skeleton: `// Write a function describeResponse that takes (code: Int, body: String?)
// Returns a String:
// 200 with non-nil body -> "OK: {body}"
// 200 with nil body -> "OK: empty"
// 201 -> "Created"
// 204 -> "No Content"
// 301, 302 -> "Redirect"
// 400...499 -> "Client Error {code}"
// 500...599 -> "Server Error {code}"
// else -> "Unknown {code}"
`,
      solution: `func describeResponse(code: Int, body: String?) -> String {
    switch (code, body) {
    case (200, let b?):
        return "OK: \\(b)"
    case (200, nil):
        return "OK: empty"
    case (201, _):
        return "Created"
    case (204, _):
        return "No Content"
    case (301, _), (302, _):
        return "Redirect"
    case (400...499, _):
        return "Client Error \\(code)"
    case (500...599, _):
        return "Server Error \\(code)"
    default:
        return "Unknown \\(code)"
    }
}`,
      hints: [
        'Match a tuple of (code, body).',
        'Use optional pattern let b? to unwrap non-nil body.',
        'Use range patterns for error code ranges.',
      ],
      concepts: ['tuple-matching', 'optional-pattern', 'range-pattern'],
    },
    {
      id: 'swift-patterns-10',
      title: 'Write a For-Case Loop',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that uses for-case to filter enum values.',
      skeleton: `enum Task {
    case pending(String)
    case completed(String)
    case failed(String, Error)
}

// Write a function pendingTasks that takes [Task]
// and returns [String] of only the pending task names
// Use for case pattern matching
`,
      solution: `func pendingTasks(_ tasks: [Task]) -> [String] {
    var result: [String] = []
    for case .pending(let name) in tasks {
        result.append(name)
    }
    return result
}`,
      hints: [
        'for case .pattern in collection filters while iterating.',
        'Only .pending cases will be iterated.',
        'let name extracts the associated value.',
      ],
      concepts: ['for-case', 'enum-pattern', 'filtering'],
    },
    {
      id: 'swift-patterns-11',
      title: 'Write Optional Pattern Filter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write a function that uses optional patterns to filter nil values.',
      skeleton: `// Write a function unwrapAll that takes [Int?]
// and returns [Int] using for case let x? pattern
`,
      solution: `func unwrapAll(_ values: [Int?]) -> [Int] {
    var result: [Int] = []
    for case let x? in values {
        result.append(x)
    }
    return result
}`,
      hints: [
        'The optional pattern let x? matches non-nil values.',
        'It automatically unwraps the optional.',
        'Nil values are skipped.',
      ],
      concepts: ['optional-pattern', 'for-case', 'unwrapping'],
    },
    {
      id: 'swift-patterns-12',
      title: 'Write a Custom Pattern Match Operator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a custom ~= operator for regex-like string matching.',
      skeleton: `// Write a ~= operator overload that lets you match a string
// against a prefix pattern in a switch statement
// hasPrefix(prefix: String, value: String) -> Bool

// Example usage:
// switch "hello world" {
// case hasPrefix("hello"): print("starts with hello")
// }
`,
      solution: `struct PrefixPattern {
    let prefix: String
}

func hasPrefix(_ prefix: String) -> PrefixPattern {
    return PrefixPattern(prefix: prefix)
}

func ~= (pattern: PrefixPattern, value: String) -> Bool {
    return value.hasPrefix(pattern.prefix)
}`,
      hints: [
        'The ~= operator is what switch uses for pattern matching.',
        'Create a wrapper type and overload ~= for it.',
        'Return a function that creates the pattern.',
      ],
      concepts: ['pattern-match-operator', 'operator-overload', 'custom-patterns'],
    },
    {
      id: 'swift-patterns-13',
      title: 'Fix Missing Default Case',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the non-exhaustive switch statement.',
      skeleton: `enum Direction {
    case north, south, east, west
}

func describe(_ dir: Direction) -> String {
    switch dir {
    case .north: return "Going up"
    case .south: return "Going down"
    case .east: return "Going right"
    }
}`,
      solution: `enum Direction {
    case north, south, east, west
}

func describe(_ dir: Direction) -> String {
    switch dir {
    case .north: return "Going up"
    case .south: return "Going down"
    case .east: return "Going right"
    case .west: return "Going left"
    }
}`,
      hints: [
        'Switch must be exhaustive in Swift.',
        'The .west case is missing.',
        'Add the missing case or a default.',
      ],
      concepts: ['exhaustive-switch', 'enum-pattern'],
    },
    {
      id: 'swift-patterns-14',
      title: 'Fix Pattern Matching Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the switch where a general case shadows a specific one.',
      skeleton: `let value = 0
switch value {
case let x where x >= 0:
    print("Non-negative: \\(x)")
case 0:
    print("Zero")
case let x where x < 0:
    print("Negative: \\(x)")
default:
    print("Other")
}
// "Zero" case is never reached`,
      solution: `let value = 0
switch value {
case 0:
    print("Zero")
case let x where x > 0:
    print("Positive: \\(x)")
case let x where x < 0:
    print("Negative: \\(x)")
default:
    print("Other")
}`,
      hints: [
        'More specific patterns must come before general ones.',
        '0 matches x >= 0, so it never reaches case 0.',
        'Put the exact match first.',
      ],
      concepts: ['pattern-order', 'shadow-pattern'],
    },
    {
      id: 'swift-patterns-15',
      title: 'Fix Incorrect Optional Pattern',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the incorrect use of optional pattern matching.',
      skeleton: `let name: String? = "Alice"

switch name {
case "Alice":
    print("Found Alice")
case nil:
    print("No name")
default:
    print("Someone else")
}`,
      solution: `let name: String? = "Alice"

switch name {
case .some("Alice"):
    print("Found Alice")
case .none:
    print("No name")
default:
    print("Someone else")
}`,
      hints: [
        'An optional String is actually Optional<String>.',
        'Use .some("Alice") to match the wrapped value.',
        'Use .none for nil.',
      ],
      concepts: ['optional-pattern', 'switch-optional'],
    },
    {
      id: 'swift-patterns-16',
      title: 'Predict Tuple Match Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the output of tuple pattern matching.',
      skeleton: `let coord = (3, -2)
switch coord {
case (0, 0):
    print("A")
case (_, 0):
    print("B")
case (0, _):
    print("C")
case (let x, let y) where x > 0 && y > 0:
    print("D")
case (let x, let y) where x > 0:
    print("E")
default:
    print("F")
}`,
      solution: `E`,
      hints: [
        '(3, -2): x=3 (positive), y=-2 (negative).',
        'Not origin, not on axes.',
        'x > 0 && y > 0 is false, but x > 0 is true -> E.',
      ],
      concepts: ['tuple-matching', 'where-clause'],
    },
    {
      id: 'swift-patterns-17',
      title: 'Predict Enum Pattern Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the output of enum pattern matching with associated values.',
      skeleton: `enum Shape {
    case circle(radius: Double)
    case rectangle(width: Double, height: Double)
}

let shapes: [Shape] = [.circle(radius: 5), .rectangle(width: 3, height: 4), .circle(radius: 2)]
var total = 0.0
for case .circle(let r) in shapes {
    total += r
}
print(total)`,
      solution: `7.0`,
      hints: [
        'for case .circle only matches circle cases.',
        'It extracts the radius from each circle.',
        '5.0 + 2.0 = 7.0.',
      ],
      concepts: ['for-case', 'enum-pattern', 'associated-values'],
    },
    {
      id: 'swift-patterns-18',
      title: 'Predict Compound Case Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the output of compound switch cases.',
      skeleton: `let char: Character = "e"
switch char {
case "a", "e", "i", "o", "u":
    print("vowel")
case "b"..."d", "f"..."h":
    print("early consonant")
default:
    print("other")
}`,
      solution: `vowel`,
      hints: [
        '"e" is one of the vowels in the first case.',
        'Compound cases match any of the listed patterns.',
        'The output is vowel.',
      ],
      concepts: ['compound-case', 'character-matching'],
    },
    {
      id: 'swift-patterns-19',
      title: 'Refactor If-Else Chain to Switch',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Refactor an if-else chain to use pattern matching with switch.',
      skeleton: `func grade(_ score: Int) -> String {
    if score >= 90 && score <= 100 {
        return "A"
    } else if score >= 80 && score < 90 {
        return "B"
    } else if score >= 70 && score < 80 {
        return "C"
    } else if score >= 60 && score < 70 {
        return "D"
    } else {
        return "F"
    }
}`,
      solution: `func grade(_ score: Int) -> String {
    switch score {
    case 90...100: return "A"
    case 80..<90: return "B"
    case 70..<80: return "C"
    case 60..<70: return "D"
    default: return "F"
    }
}`,
      hints: [
        'Use range patterns in switch cases.',
        '... for closed range, ..< for half-open range.',
        'Switch is more readable than if-else chains for ranges.',
      ],
      concepts: ['range-pattern', 'switch-refactoring'],
    },
    {
      id: 'swift-patterns-20',
      title: 'Refactor Nested Ifs to Switch Tuple',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor nested conditionals to use tuple pattern matching.',
      skeleton: `func access(role: String, isActive: Bool) -> String {
    if role == "admin" {
        if isActive {
            return "full access"
        } else {
            return "suspended admin"
        }
    } else if role == "user" {
        if isActive {
            return "standard access"
        } else {
            return "suspended user"
        }
    } else {
        return "no access"
    }
}`,
      solution: `func access(role: String, isActive: Bool) -> String {
    switch (role, isActive) {
    case ("admin", true): return "full access"
    case ("admin", false): return "suspended admin"
    case ("user", true): return "standard access"
    case ("user", false): return "suspended user"
    default: return "no access"
    }
}`,
      hints: [
        'Combine both conditions into a tuple.',
        'Match each combination as a case.',
        'This eliminates nesting entirely.',
      ],
      concepts: ['tuple-matching', 'refactoring', 'flat-structure'],
    },
  ],
};
