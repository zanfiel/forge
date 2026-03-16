import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-enum',
  title: '12. Enums',
  explanation: `## Enums in Swift

Enums define a group of related values as a common type.

\`\`\`swift
enum Direction {
    case north, south, east, west
}
let dir: Direction = .north
\`\`\`

### Associated Values
\`\`\`swift
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}
let code = Barcode.qrCode("ABCDEF")
\`\`\`

### Raw Values
\`\`\`swift
enum Planet: Int {
    case mercury = 1, venus, earth, mars
}
let earth = Planet(rawValue: 3)  // Planet?
\`\`\`

### CaseIterable
\`\`\`swift
enum Season: CaseIterable {
    case spring, summer, autumn, winter
}
Season.allCases.count  // 4
\`\`\``,
  exercises: [
    {
      id: 'swift-enum-1',
      title: 'Declare an Enum',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a basic enum with three cases.',
      skeleton: `___ Color {
    ___ red, green, blue
}`,
      solution: `enum Color {
    case red, green, blue
}`,
      hints: [
        'Use the `enum` keyword to declare.',
        'Cases are declared with the `case` keyword.',
        'Multiple cases can be on one line with commas.',
      ],
      concepts: ['enum', 'case'],
    },
    {
      id: 'swift-enum-2',
      title: 'Enum with Raw Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Create an enum with String raw values.',
      skeleton: `enum Coin: ___ {
    case penny = "1c"
    case nickel = "5c"
    case dime = "10c"
}`,
      solution: `enum Coin: String {
    case penny = "1c"
    case nickel = "5c"
    case dime = "10c"
}`,
      hints: [
        'Raw value type follows the colon after the enum name.',
        'String raw values are assigned with = "value".',
        'Each case gets a string literal.',
      ],
      concepts: ['raw-values', 'String'],
    },
    {
      id: 'swift-enum-3',
      title: 'Associated Value',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Create an enum case with an associated String value.',
      skeleton: `enum Message {
    case text(___)
    case image(url: String, width: Int, height: Int)
}`,
      solution: `enum Message {
    case text(String)
    case image(url: String, width: Int, height: Int)
}`,
      hints: [
        'Associated values go in parentheses after the case.',
        'String is the type of the associated value.',
        'Each case can have different associated types.',
      ],
      concepts: ['associated-values'],
    },
    {
      id: 'swift-enum-4',
      title: 'CaseIterable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Make the enum conform to CaseIterable.',
      skeleton: `enum Season: ___ {
    case spring, summer, autumn, winter
}
let count = Season.allCases.count`,
      solution: `enum Season: CaseIterable {
    case spring, summer, autumn, winter
}
let count = Season.allCases.count`,
      hints: [
        'CaseIterable provides allCases property.',
        'Add it after the colon in the enum declaration.',
        'allCases returns an array of all cases.',
      ],
      concepts: ['CaseIterable'],
    },
    {
      id: 'swift-enum-5',
      title: 'Switch on Enum',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use a switch statement to match enum cases.',
      skeleton: `enum Direction { case north, south, east, west }
let dir = Direction.north
switch dir {
___ .north: print("Up")
___ .south: print("Down")
___ .east: print("Right")
___ .west: print("Left")
}`,
      solution: `enum Direction { case north, south, east, west }
let dir = Direction.north
switch dir {
case .north: print("Up")
case .south: print("Down")
case .east: print("Right")
case .west: print("Left")
}`,
      hints: [
        'Each enum case is matched with `case`.',
        'Use dot syntax (.case) since the type is known.',
        'No default needed when all cases are covered.',
      ],
      concepts: ['switch', 'enum-matching'],
    },
    {
      id: 'swift-enum-6',
      title: 'Raw Value Init',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Create an enum value from a raw value.',
      skeleton: `enum Planet: Int {
    case mercury = 1, venus, earth
}
let p = Planet(___ : 3)`,
      solution: `enum Planet: Int {
    case mercury = 1, venus, earth
}
let p = Planet(rawValue: 3)`,
      hints: [
        'Use rawValue: in the initializer.',
        'This returns an Optional since it may fail.',
        'Auto-incremented: mercury=1, venus=2, earth=3.',
      ],
      concepts: ['rawValue-init'],
    },
    {
      id: 'swift-enum-7',
      title: 'Enum with Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a method to an enum that returns a description string.',
      skeleton: `enum TrafficLight {
    case red, yellow, green

    func description() -> String {
        // Return "Stop", "Caution", or "Go"
    }
}`,
      solution: `enum TrafficLight {
    case red, yellow, green

    func description() -> String {
        switch self {
        case .red: return "Stop"
        case .yellow: return "Caution"
        case .green: return "Go"
        }
    }
}`,
      hints: [
        'Use switch self to match the current case.',
        'Enums can have methods.',
        'Return the appropriate string for each case.',
      ],
      concepts: ['enum-methods', 'self'],
    },
    {
      id: 'swift-enum-8',
      title: 'Extract Associated Value',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that extracts the text from a Result enum.',
      skeleton: `enum Result {
    case success(String)
    case failure(String)
}

func getMessage(_ r: Result) -> String {
    // Extract the associated string from either case
}`,
      solution: `enum Result {
    case success(String)
    case failure(String)
}

func getMessage(_ r: Result) -> String {
    switch r {
    case .success(let msg): return msg
    case .failure(let msg): return msg
    }
}`,
      hints: [
        'Use pattern matching with let to extract values.',
        'case .success(let msg) binds the associated value.',
        'Both cases have String associated values.',
      ],
      concepts: ['associated-values', 'pattern-matching'],
    },
    {
      id: 'swift-enum-9',
      title: 'Enum Computed Property',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a computed property to an enum that returns the number of sides for each shape.',
      skeleton: `enum Shape {
    case triangle, square, pentagon, hexagon

    var sides: Int {
        // Return number of sides
    }
}`,
      solution: `enum Shape {
    case triangle, square, pentagon, hexagon

    var sides: Int {
        switch self {
        case .triangle: return 3
        case .square: return 4
        case .pentagon: return 5
        case .hexagon: return 6
        }
    }
}`,
      hints: [
        'Use a computed property with switch self.',
        'Return the appropriate count for each case.',
        'Enums can have computed properties.',
      ],
      concepts: ['computed-properties', 'enum-methods'],
    },
    {
      id: 'swift-enum-10',
      title: 'Recursive Enum',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Create a recursive enum for arithmetic expressions and an evaluate function.',
      skeleton: `indirect enum Expr {
    case number(Int)
    case add(Expr, Expr)
    case multiply(Expr, Expr)
}

func evaluate(_ expr: Expr) -> Int {
    // Evaluate the expression recursively
}`,
      solution: `indirect enum Expr {
    case number(Int)
    case add(Expr, Expr)
    case multiply(Expr, Expr)
}

func evaluate(_ expr: Expr) -> Int {
    switch expr {
    case .number(let n): return n
    case .add(let a, let b): return evaluate(a) + evaluate(b)
    case .multiply(let a, let b): return evaluate(a) * evaluate(b)
    }
}`,
      hints: [
        'Use `indirect` for recursive enums.',
        'Pattern match on each case.',
        'Recursively evaluate sub-expressions.',
      ],
      concepts: ['indirect-enum', 'recursion'],
    },
    {
      id: 'swift-enum-11',
      title: 'Enum Map to Array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use CaseIterable to get all enum cases as an array of their raw values.',
      skeleton: `enum Suit: String, CaseIterable {
    case hearts, diamonds, clubs, spades
}

func allSuits() -> [String] {
    // Return all suit raw values
}`,
      solution: `enum Suit: String, CaseIterable {
    case hearts, diamonds, clubs, spades
}

func allSuits() -> [String] {
    return Suit.allCases.map { $0.rawValue }
}`,
      hints: [
        'Use Suit.allCases to get all cases.',
        'Map over them to extract rawValue.',
        'CaseIterable provides the allCases property.',
      ],
      concepts: ['CaseIterable', 'map', 'rawValue'],
    },
    {
      id: 'swift-enum-12',
      title: 'Enum with if-case-let',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use if-case-let to check for a specific enum case and extract its value.',
      skeleton: `enum Response {
    case data(String)
    case error(Int)
}

func extractData(_ r: Response) -> String? {
    // Return the data string if it is a .data case, nil otherwise
}`,
      solution: `enum Response {
    case data(String)
    case error(Int)
}

func extractData(_ r: Response) -> String? {
    if case .data(let s) = r {
        return s
    }
    return nil
}`,
      hints: [
        'if case .pattern = value checks and extracts.',
        'Use let to bind the associated value.',
        'Return nil if it does not match.',
      ],
      concepts: ['if-case-let', 'pattern-matching'],
    },
    {
      id: 'swift-enum-13',
      title: 'Fix Missing Case',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the non-exhaustive switch statement.',
      skeleton: `enum Fruit { case apple, banana, cherry }
let f = Fruit.cherry
switch f {
case .apple: print("Red")
case .banana: print("Yellow")
}`,
      solution: `enum Fruit { case apple, banana, cherry }
let f = Fruit.cherry
switch f {
case .apple: print("Red")
case .banana: print("Yellow")
case .cherry: print("Dark red")
}`,
      hints: [
        'Switch on enums must be exhaustive.',
        'The .cherry case is not handled.',
        'Add a case for .cherry or add default.',
      ],
      concepts: ['exhaustive-switch'],
    },
    {
      id: 'swift-enum-14',
      title: 'Fix Enum Comparison',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the comparison that does not compile.',
      skeleton: `enum Status { case active, inactive }
let s = Status.active
if s == "active" {
    print("Active")
}`,
      solution: `enum Status { case active, inactive }
let s = Status.active
if s == .active {
    print("Active")
}`,
      hints: [
        'Enums are compared with their cases, not strings.',
        'Use .active instead of "active".',
        'Enum comparison uses == with enum values.',
      ],
      concepts: ['enum-comparison'],
    },
    {
      id: 'swift-enum-15',
      title: 'Fix Raw Value Type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the enum that assigns Int raw values to a String raw value type.',
      skeleton: `enum Priority: String {
    case low = 1
    case medium = 2
    case high = 3
}`,
      solution: `enum Priority: Int {
    case low = 1
    case medium = 2
    case high = 3
}`,
      hints: [
        'Raw value type must match the assigned values.',
        'Integer values need Int, not String.',
        'Change String to Int.',
      ],
      concepts: ['raw-values', 'type-mismatch'],
    },
    {
      id: 'swift-enum-16',
      title: 'Predict Enum Raw Value',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `enum Day: Int {
    case mon = 1, tue, wed, thu, fri
}
print(Day.wed.rawValue)`,
      solution: `3`,
      hints: [
        'Raw Int values auto-increment from the first.',
        'mon=1, tue=2, wed=3.',
        'The rawValue of wed is 3.',
      ],
      concepts: ['raw-values', 'auto-increment'],
    },
    {
      id: 'swift-enum-17',
      title: 'Predict Optional RawValue Init',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `enum Color: String {
    case red, green, blue
}
let c = Color(rawValue: "purple")
print(c == nil)`,
      solution: `true`,
      hints: [
        '"purple" is not a valid case.',
        'rawValue init returns nil for invalid values.',
        'The result is nil, so == nil is true.',
      ],
      concepts: ['rawValue-init', 'Optional'],
    },
    {
      id: 'swift-enum-18',
      title: 'Predict CaseIterable Count',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `enum Direction: CaseIterable {
    case north, south, east, west
}
print(Direction.allCases.count)`,
      solution: `4`,
      hints: [
        'There are 4 cases in the enum.',
        'allCases contains all of them.',
        'count is 4.',
      ],
      concepts: ['CaseIterable', 'count'],
    },
    {
      id: 'swift-enum-19',
      title: 'Refactor Constants to Enum',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor string constants to an enum with raw values.',
      skeleton: `let statusPending = "pending"
let statusApproved = "approved"
let statusRejected = "rejected"

func check(_ status: String) -> String {
    switch status {
    case "pending": return "Waiting"
    case "approved": return "Done"
    case "rejected": return "Failed"
    default: return "Unknown"
    }
}`,
      solution: `enum Status: String {
    case pending, approved, rejected
}

func check(_ status: Status) -> String {
    switch status {
    case .pending: return "Waiting"
    case .approved: return "Done"
    case .rejected: return "Failed"
    }
}`,
      hints: [
        'Enums provide type safety over raw strings.',
        'No default case needed when exhaustive.',
        'Raw values default to the case name for String enums.',
      ],
      concepts: ['enum', 'type-safety', 'refactoring'],
    },
    {
      id: 'swift-enum-20',
      title: 'Refactor if-else to Switch on Enum',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Refactor if/else chain on associated values to a switch.',
      skeleton: `enum Shape {
    case circle(radius: Double)
    case rectangle(width: Double, height: Double)
}

func area(_ s: Shape) -> Double {
    if case .circle(let r) = s {
        return 3.14159 * r * r
    } else if case .rectangle(let w, let h) = s {
        return w * h
    }
    return 0
}`,
      solution: `enum Shape {
    case circle(radius: Double)
    case rectangle(width: Double, height: Double)
}

func area(_ s: Shape) -> Double {
    switch s {
    case .circle(let r):
        return 3.14159 * r * r
    case .rectangle(let w, let h):
        return w * h
    }
}`,
      hints: [
        'Switch on the enum for cleaner pattern matching.',
        'No default needed when all cases are covered.',
        'Switch is more idiomatic for enums.',
      ],
      concepts: ['switch', 'associated-values', 'refactoring'],
    },
  ],
};
