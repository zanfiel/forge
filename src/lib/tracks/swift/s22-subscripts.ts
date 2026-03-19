import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-subscript',
  title: '22. Subscripts',
  explanation: `## Subscripts in Swift

Subscripts provide shortcut access to elements using bracket syntax.

\`\`\`swift
struct Matrix {
    var grid: [[Int]]
    subscript(row: Int, col: Int) -> Int {
        get { return grid[row][col] }
        set { grid[row][col] = newValue }
    }
}
var m = Matrix(grid: [[1,2],[3,4]])
m[0, 1] = 5   // set
print(m[1, 0]) // get: 3
\`\`\`

### Multiple Parameter Subscripts
\`\`\`swift
struct Table {
    subscript(row: Int, col: String) -> String { ... }
}
\`\`\`

### Type Subscripts
\`\`\`swift
enum Planet: Int {
    case mercury = 1, venus, earth
    static subscript(n: Int) -> Planet? {
        return Planet(rawValue: n)
    }
}
Planet[3]  // .earth
\`\`\``,
  exercises: [
    {
      id: 'swift-subscript-1',
      title: 'Basic Subscript',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a subscript to a struct.',
      skeleton: `struct TimesTable {
    let multiplier: Int
    ___(index: Int) -> Int {
        return multiplier * index
    }
}`,
      solution: `struct TimesTable {
    let multiplier: Int
    subscript(index: Int) -> Int {
        return multiplier * index
    }
}`,
      hints: ['Use the `subscript` keyword.', 'Subscripts allow bracket access.', 'TimesTable(multiplier: 3)[6] returns 18.'],
      concepts: ['subscript'],
    },
    {
      id: 'swift-subscript-2',
      title: 'Read-Write Subscript',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add both get and set to a subscript.',
      skeleton: `struct Container {
    var items: [String] = []
    subscript(index: Int) -> String {
        ___ { return items[index] }
        ___ { items[index] = newValue }
    }
}`,
      solution: `struct Container {
    var items: [String] = []
    subscript(index: Int) -> String {
        get { return items[index] }
        set { items[index] = newValue }
    }
}`,
      hints: ['get returns the value.', 'set assigns newValue.', 'Both are needed for read-write.'],
      concepts: ['subscript', 'getter-setter'],
    },
    {
      id: 'swift-subscript-3',
      title: 'Multi-Parameter Subscript',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Create a subscript with two parameters.',
      skeleton: `struct Grid {
    var data: [[Int]]
    subscript(___ row: Int, ___ col: Int) -> Int {
        return data[row][col]
    }
}`,
      solution: `struct Grid {
    var data: [[Int]]
    subscript(_ row: Int, _ col: Int) -> Int {
        return data[row][col]
    }
}`,
      hints: ['Use _ to omit argument labels.', 'Access as grid[0, 1].', 'Multiple parameters are comma-separated.'],
      concepts: ['subscript', 'multiple-params'],
    },
    {
      id: 'swift-subscript-4',
      title: 'Static Subscript',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Add a static subscript to an enum.',
      skeleton: `enum Color: Int, CaseIterable {
    case red, green, blue
    ___ subscript(index: Int) -> Color? {
        return Color(rawValue: index)
    }
}`,
      solution: `enum Color: Int, CaseIterable {
    case red, green, blue
    static subscript(index: Int) -> Color? {
        return Color(rawValue: index)
    }
}`,
      hints: ['Use `static` before subscript.', 'Called on the type: Color[0].', 'Returns optional since rawValue may fail.'],
      concepts: ['static-subscript'],
    },
    {
      id: 'swift-subscript-5',
      title: 'Safe Subscript',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a safe subscript that returns nil for out-of-bounds access.',
      skeleton: `extension Array {
    subscript(safe index: Int) -> Element? {
        return ___.contains(index) ? self[index] : nil
    }
}`,
      solution: `extension Array {
    subscript(safe index: Int) -> Element? {
        return indices.contains(index) ? self[index] : nil
    }
}`,
      hints: ['indices gives the valid range.', 'contains checks if index is valid.', 'Return nil if out of bounds.'],
      concepts: ['safe-subscript'],
    },
    {
      id: 'swift-subscript-6',
      title: 'String Subscript',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add an Int subscript to String for easier character access.',
      skeleton: `extension String {
    subscript(i: Int) -> Character {
        return self[self.index(self.___, offsetBy: i)]
    }
}`,
      solution: `extension String {
    subscript(i: Int) -> Character {
        return self[self.index(self.startIndex, offsetBy: i)]
    }
}`,
      hints: ['Calculate the String.Index from an Int.', 'Use index(_:offsetBy:).', 'Start from startIndex.'],
      concepts: ['subscript', 'String.Index'],
    },
    {
      id: 'swift-subscript-7',
      title: 'Matrix Subscript',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a Matrix struct with a subscript for row/column access.',
      skeleton: `struct Matrix {
    let rows: Int, columns: Int
    var grid: [Double]

    init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        grid = Array(repeating: 0.0, count: rows * columns)
    }

    // Add subscript(row, column) with get and set
}`,
      solution: `struct Matrix {
    let rows: Int, columns: Int
    var grid: [Double]

    init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        grid = Array(repeating: 0.0, count: rows * columns)
    }

    subscript(row: Int, column: Int) -> Double {
        get { return grid[row * columns + column] }
        set { grid[row * columns + column] = newValue }
    }
}`,
      hints: ['Flatten 2D to 1D: row * columns + column.', 'get reads from the grid.', 'set writes to the grid.'],
      concepts: ['subscript', 'matrix'],
    },
    {
      id: 'swift-subscript-8',
      title: 'Dictionary-like Subscript',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct with a dictionary-like subscript that has a default value.',
      skeleton: `struct Config {
    private var data: [String: String] = [:]

    // subscript with default value parameter
}`,
      solution: `struct Config {
    private var data: [String: String] = [:]

    subscript(key: String, default defaultValue: String) -> String {
        get { return data[key] ?? defaultValue }
        set { data[key] = newValue }
    }
}`,
      hints: ['Add a default parameter to the subscript.', 'Use ?? with the default in the getter.', 'The setter stores normally.'],
      concepts: ['subscript', 'default-value'],
    },
    {
      id: 'swift-subscript-9',
      title: 'Range Subscript',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a subscript that accepts a Range to return a slice.',
      skeleton: `struct NumberList {
    var items: [Int]

    // Add subscript that takes a Range<Int> and returns [Int]
}`,
      solution: `struct NumberList {
    var items: [Int]

    subscript(range: Range<Int>) -> [Int] {
        return Array(items[range])
    }
}`,
      hints: ['Accept Range<Int> as the parameter.', 'Slice the array with items[range].', 'Convert to Array for the return.'],
      concepts: ['subscript', 'Range'],
    },
    {
      id: 'swift-subscript-10',
      title: 'Overloaded Subscript',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct with subscripts that accept both Int and String keys.',
      skeleton: `struct Lookup {
    private var data = ["name": "Alice", "role": "Dev"]
    private var indexed = ["Alice", "Dev"]

    // subscript(String) -> String?
    // subscript(Int) -> String?
}`,
      solution: `struct Lookup {
    private var data = ["name": "Alice", "role": "Dev"]
    private var indexed = ["Alice", "Dev"]

    subscript(key: String) -> String? {
        return data[key]
    }

    subscript(index: Int) -> String? {
        return index < indexed.count ? indexed[index] : nil
    }
}`,
      hints: ['Subscripts can be overloaded by parameter type.', 'String subscript looks up in dictionary.', 'Int subscript looks up by index.'],
      concepts: ['subscript', 'overloading'],
    },
    {
      id: 'swift-subscript-11',
      title: 'KeyPath Subscript',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a generic function using KeyPath subscript syntax.',
      skeleton: `func getValue<T, V>(from obj: T, at path: KeyPath<T, V>) -> V {
    // Return the value at the key path
}`,
      solution: `func getValue<T, V>(from obj: T, at path: KeyPath<T, V>) -> V {
    return obj[keyPath: path]
}`,
      hints: ['Use obj[keyPath: path] syntax.', 'KeyPath provides type-safe property access.', 'The subscript is built into Swift types.'],
      concepts: ['KeyPath', 'subscript'],
    },
    {
      id: 'swift-subscript-12',
      title: 'Circular Buffer Subscript',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a circular buffer with a wrapping subscript.',
      skeleton: `struct CircularBuffer<T> {
    private var buffer: [T]
    
    init(_ items: [T]) { buffer = items }

    // subscript that wraps around using modulo
}`,
      solution: `struct CircularBuffer<T> {
    private var buffer: [T]
    
    init(_ items: [T]) { buffer = items }

    subscript(index: Int) -> T {
        get { return buffer[index % buffer.count] }
        set { buffer[index % buffer.count] = newValue }
    }
}`,
      hints: ['Use modulo to wrap the index.', 'index % count wraps around.', 'Works for indices beyond the array size.'],
      concepts: ['subscript', 'circular-buffer'],
    },
    {
      id: 'swift-subscript-13',
      title: 'Fix Subscript Missing Set',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the subscript that should be read-write but is read-only.',
      skeleton: `struct Shelf {
    var books: [String] = ["A", "B", "C"]
    subscript(index: Int) -> String {
        return books[index]
    }
}
var s = Shelf()
s[0] = "Z"  // Error: subscript is read-only`,
      solution: `struct Shelf {
    var books: [String] = ["A", "B", "C"]
    subscript(index: Int) -> String {
        get { return books[index] }
        set { books[index] = newValue }
    }
}
var s = Shelf()
s[0] = "Z"`,
      hints: ['Read-only subscripts have no set clause.', 'Add get and set for read-write.', 'newValue is the assigned value.'],
      concepts: ['subscript', 'getter-setter'],
    },
    {
      id: 'swift-subscript-14',
      title: 'Fix Subscript on Let',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code that tries to set a subscript on a let instance.',
      skeleton: `struct Arr {
    var items: [Int] = [1, 2, 3]
    subscript(i: Int) -> Int {
        get { items[i] }
        set { items[i] = newValue }
    }
}
let a = Arr()
a[0] = 10`,
      solution: `struct Arr {
    var items: [Int] = [1, 2, 3]
    subscript(i: Int) -> Int {
        get { items[i] }
        set { items[i] = newValue }
    }
}
var a = Arr()
a[0] = 10`,
      hints: ['let struct instances are immutable.', 'Change let to var.', 'Subscript set requires a mutable instance.'],
      concepts: ['let', 'var', 'mutability'],
    },
    {
      id: 'swift-subscript-15',
      title: 'Fix Return Type Mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the subscript return type to handle potential nil.',
      skeleton: `struct SafeArray {
    var items: [Int]
    subscript(index: Int) -> Int {
        guard index >= 0 && index < items.count else { return nil }
        return items[index]
    }
}`,
      solution: `struct SafeArray {
    var items: [Int]
    subscript(index: Int) -> Int? {
        guard index >= 0 && index < items.count else { return nil }
        return items[index]
    }
}`,
      hints: ['Returning nil requires Optional return type.', 'Change Int to Int?.', 'nil is only valid for Optional types.'],
      concepts: ['subscript', 'Optional'],
    },
    {
      id: 'swift-subscript-16',
      title: 'Predict Subscript Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `struct TimesTable {
    let n: Int
    subscript(i: Int) -> Int { return n * i }
}
let t = TimesTable(n: 7)
print(t[6])`,
      solution: `42`,
      hints: ['7 * 6 = 42.', 'The subscript multiplies n by i.', 't[6] is like t.n * 6.'],
      concepts: ['subscript'],
    },
    {
      id: 'swift-subscript-17',
      title: 'Predict Multi-Subscript',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `struct Grid {
    subscript(r: Int, c: Int) -> String { return "(\\(r),\\(c))" }
}
print(Grid()[2, 3])`,
      solution: `(2,3)`,
      hints: ['The subscript formats row and column.', 'r=2, c=3.', 'Returns "(2,3)".'],
      concepts: ['subscript', 'multiple-params'],
    },
    {
      id: 'swift-subscript-18',
      title: 'Predict Safe Subscript',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `extension Array {
    subscript(safe i: Int) -> Element? {
        return indices.contains(i) ? self[i] : nil
    }
}
let arr = [10, 20, 30]
print(arr[safe: 5] ?? -1)`,
      solution: `-1`,
      hints: ['Index 5 is out of bounds (0, 1, 2).', 'safe subscript returns nil.', '?? provides -1 as default.'],
      concepts: ['safe-subscript'],
    },
    {
      id: 'swift-subscript-19',
      title: 'Refactor Method to Subscript',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor the get/set methods to a subscript.',
      skeleton: `struct Cache {
    private var data: [String: Int] = [:]

    func getValue(for key: String) -> Int? {
        return data[key]
    }

    mutating func setValue(_ value: Int, for key: String) {
        data[key] = value
    }
}`,
      solution: `struct Cache {
    private var data: [String: Int] = [:]

    subscript(key: String) -> Int? {
        get { return data[key] }
        set { data[key] = newValue }
    }
}`,
      hints: ['Subscripts replace paired get/set methods.', 'Access as cache["key"].', 'newValue in set is the assigned value.'],
      concepts: ['subscript', 'refactoring'],
    },
    {
      id: 'swift-subscript-20',
      title: 'Refactor to Type Subscript',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor the static method to a static subscript.',
      skeleton: `enum Emoji {
    static let map = [0: "smile", 1: "sad", 2: "laugh"]

    static func get(_ code: Int) -> String? {
        return map[code]
    }
}
print(Emoji.get(1) ?? "")`,
      solution: `enum Emoji {
    static let map = [0: "smile", 1: "sad", 2: "laugh"]

    static subscript(code: Int) -> String? {
        return map[code]
    }
}
print(Emoji[1] ?? "")`,
      hints: ['Static subscripts are accessed on the type.', 'Replace the static method with a static subscript.', 'Emoji[1] is more natural than Emoji.get(1).'],
      concepts: ['static-subscript', 'refactoring'],
    },
  ],
};
