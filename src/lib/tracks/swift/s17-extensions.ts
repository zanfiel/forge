import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-ext',
  title: '17. Extensions',
  explanation: `## Extensions in Swift

Extensions add new functionality to existing types without modifying their source code.

\`\`\`swift
extension Int {
    var isEven: Bool { return self % 2 == 0 }
    func squared() -> Int { return self * self }
}
5.squared()   // 25
4.isEven      // true
\`\`\`

### Adding Initializers
\`\`\`swift
extension CGRect {
    init(center: CGPoint, size: CGSize) {
        self.init(origin: CGPoint(x: center.x - size.width/2,
                                   y: center.y - size.height/2),
                  size: size)
    }
}
\`\`\`

### Protocol Conformance via Extension
\`\`\`swift
extension Int: CustomStringConvertible {
    public var description: String { return "Number: \\(self)" }
}
\`\`\``,
  exercises: [
    {
      id: 'swift-ext-1',
      title: 'Extend Int with Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Add a method to Int that returns the value doubled.',
      skeleton: `___ Int {
    func doubled() -> Int {
        return self * 2
    }
}`,
      solution: `extension Int {
    func doubled() -> Int {
        return self * 2
    }
}`,
      hints: [
        'Use the `extension` keyword.',
        'self refers to the Int value.',
        'No inheritance or modification of the original type.',
      ],
      concepts: ['extension', 'methods'],
    },
    {
      id: 'swift-ext-2',
      title: 'Computed Property Extension',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Add a computed property to Double for kilometer conversion.',
      skeleton: `extension Double {
    var km: Double { return ___ * 1000.0 }
}`,
      solution: `extension Double {
    var km: Double { return self * 1000.0 }
}`,
      hints: [
        'Use self to refer to the Double value.',
        'Computed properties in extensions cannot be stored.',
        '5.0.km would return 5000.0.',
      ],
      concepts: ['computed-properties', 'extension'],
    },
    {
      id: 'swift-ext-3',
      title: 'Mutating Extension Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a mutating method to Int that squares itself.',
      skeleton: `extension Int {
    ___ func square() {
        self = self * self
    }
}`,
      solution: `extension Int {
    mutating func square() {
        self = self * self
    }
}`,
      hints: [
        'Value types need `mutating` to modify self.',
        'This allows var n = 5; n.square().',
        'self can be reassigned in mutating methods.',
      ],
      concepts: ['mutating', 'extension'],
    },
    {
      id: 'swift-ext-4',
      title: 'Protocol Conformance Extension',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add protocol conformance to an existing type via extension.',
      skeleton: `protocol Describable {
    var description: String { get }
}
___ Int: Describable {
    var description: String { return "Value: \\(self)" }
}`,
      solution: `protocol Describable {
    var description: String { get }
}
extension Int: Describable {
    var description: String { return "Value: \\(self)" }
}`,
      hints: [
        'Extensions can add protocol conformance.',
        'Use extension Type: Protocol.',
        'Implement the protocol requirements in the extension.',
      ],
      concepts: ['protocol-conformance', 'extension'],
    },
    {
      id: 'swift-ext-5',
      title: 'Extension with Subscript',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a subscript to Int that returns the digit at a position.',
      skeleton: `extension Int {
    ___ (index: Int) -> Int {
        var n = abs(self)
        for _ in 0..<index { n /= 10 }
        return n % 10
    }
}`,
      solution: `extension Int {
    subscript(index: Int) -> Int {
        var n = abs(self)
        for _ in 0..<index { n /= 10 }
        return n % 10
    }
}`,
      hints: [
        'Use the `subscript` keyword.',
        'Subscripts allow bracket-access syntax.',
        '12345[0] returns 5 (rightmost digit).',
      ],
      concepts: ['subscript', 'extension'],
    },
    {
      id: 'swift-ext-6',
      title: 'Nested Type in Extension',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Add a nested enum to Int via extension.',
      skeleton: `extension Int {
    ___ Kind {
        case negative, zero, positive
    }
    var kind: Kind {
        if self > 0 { return .positive }
        else if self == 0 { return .zero }
        else { return .negative }
    }
}`,
      solution: `extension Int {
    enum Kind {
        case negative, zero, positive
    }
    var kind: Kind {
        if self > 0 { return .positive }
        else if self == 0 { return .zero }
        else { return .negative }
    }
}`,
      hints: [
        'Extensions can add nested types.',
        'Use enum inside the extension.',
        'Access as Int.Kind or use the computed property.',
      ],
      concepts: ['nested-types', 'extension'],
    },
    {
      id: 'swift-ext-7',
      title: 'Extend String with Word Count',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Add a wordCount computed property to String.',
      skeleton: `// Add a wordCount property to String
`,
      solution: `extension String {
    var wordCount: Int {
        return self.split(separator: " ").count
    }
}`,
      hints: [
        'Use extension String.',
        'Split on spaces and count.',
        'split(separator:) divides the string.',
      ],
      concepts: ['extension', 'String'],
    },
    {
      id: 'swift-ext-8',
      title: 'Extend Array with Safe Index',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a safe subscript to Array that returns nil for out-of-bounds indices.',
      skeleton: `// Add a safe subscript to Array
`,
      solution: `extension Array {
    subscript(safe index: Int) -> Element? {
        return indices.contains(index) ? self[index] : nil
    }
}`,
      hints: [
        'Use extension Array (or Collection).',
        'Check if index is in bounds with indices.contains.',
        'Return nil if out of bounds.',
      ],
      concepts: ['extension', 'subscript', 'safety'],
    },
    {
      id: 'swift-ext-9',
      title: 'Extend String with Trimming',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a trimmed() method to String that removes whitespace from both ends.',
      skeleton: `// Add a trimmed method to String
`,
      solution: `extension String {
    func trimmed() -> String {
        return self.trimmingCharacters(in: .whitespacesAndNewlines)
    }
}`,
      hints: [
        'Use trimmingCharacters(in:).',
        '.whitespacesAndNewlines is the character set.',
        'Return the trimmed string.',
      ],
      concepts: ['extension', 'String-methods'],
    },
    {
      id: 'swift-ext-10',
      title: 'Extend Collection with isNotEmpty',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Add an isNotEmpty computed property to Collection.',
      skeleton: `// Add isNotEmpty to Collection
`,
      solution: `extension Collection {
    var isNotEmpty: Bool {
        return !isEmpty
    }
}`,
      hints: [
        'Extend Collection for maximum reusability.',
        'Negate the isEmpty property.',
        'Works on Array, Set, Dictionary, String, etc.',
      ],
      concepts: ['extension', 'Collection'],
    },
    {
      id: 'swift-ext-11',
      title: 'Extend Double with Clamped',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a clamped(to:) method to Double that constrains the value to a range.',
      skeleton: `// Add a clamped method to Double
`,
      solution: `extension Double {
    func clamped(to range: ClosedRange<Double>) -> Double {
        return min(max(self, range.lowerBound), range.upperBound)
    }
}`,
      hints: [
        'Use ClosedRange<Double> as the parameter.',
        'Clamp between lowerBound and upperBound.',
        'Use min and max to constrain.',
      ],
      concepts: ['extension', 'clamping'],
    },
    {
      id: 'swift-ext-12',
      title: 'Convenience Init Extension',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a convenience initializer to a struct via extension.',
      skeleton: `struct Color {
    var r: Double, g: Double, b: Double
}

// Add an extension with init(hex:) that takes an Int
`,
      solution: `struct Color {
    var r: Double, g: Double, b: Double
}

extension Color {
    init(gray: Double) {
        self.init(r: gray, g: gray, b: gray)
    }
}`,
      hints: [
        'Extensions on structs can add initializers.',
        'The new init must call self.init with the memberwise init.',
        'This preserves the original memberwise init.',
      ],
      concepts: ['extension', 'init'],
    },
    {
      id: 'swift-ext-13',
      title: 'Fix Stored Property in Extension',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the extension that tries to add a stored property.',
      skeleton: `extension String {
    var cached: String = ""
}`,
      solution: `extension String {
    var cached: String { return self }
}`,
      hints: [
        'Extensions cannot add stored properties.',
        'Only computed properties are allowed.',
        'Change to a computed property.',
      ],
      concepts: ['extension', 'stored-vs-computed'],
    },
    {
      id: 'swift-ext-14',
      title: 'Fix Missing Mutating in Extension',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the extension method that modifies self without mutating.',
      skeleton: `extension Int {
    func negate() {
        self = -self
    }
}`,
      solution: `extension Int {
    mutating func negate() {
        self = -self
    }
}`,
      hints: [
        'Modifying self requires mutating.',
        'Int is a value type.',
        'Add mutating before func.',
      ],
      concepts: ['mutating', 'extension'],
    },
    {
      id: 'swift-ext-15',
      title: 'Fix Extension Overriding Class Method',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the extension that tries to override an existing method.',
      skeleton: `class Vehicle {
    func describe() -> String { return "Vehicle" }
}
extension Vehicle {
    override func describe() -> String { return "Extended" }
}`,
      solution: `class Vehicle {
    func describe() -> String { return "Vehicle" }
}
extension Vehicle {
    func extendedDescribe() -> String { return "Extended \\(describe())" }
}`,
      hints: [
        'Extensions cannot override existing methods.',
        'Give the method a different name.',
        'Extensions add new functionality, not replace existing.',
      ],
      concepts: ['extension', 'override-restriction'],
    },
    {
      id: 'swift-ext-16',
      title: 'Predict Extension Method',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `extension Int {
    func times(_ action: () -> Void) {
        for _ in 0..<self { action() }
    }
}
var count = 0
3.times { count += 1 }
print(count)`,
      solution: `3`,
      hints: [
        '3.times runs the closure 3 times.',
        'Each time count is incremented by 1.',
        '0 + 1 + 1 + 1 = 3.',
      ],
      concepts: ['extension', 'closures'],
    },
    {
      id: 'swift-ext-17',
      title: 'Predict Computed Extension',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `extension Double {
    var half: Double { return self / 2.0 }
}
print(10.0.half)`,
      solution: `5.0`,
      hints: [
        '10.0.half divides by 2.',
        '10.0 / 2.0 = 5.0.',
        'The computed property returns 5.0.',
      ],
      concepts: ['extension', 'computed-properties'],
    },
    {
      id: 'swift-ext-18',
      title: 'Predict Extension Protocol Conformance',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `protocol Printable {
    func display() -> String
}
extension Int: Printable {
    func display() -> String { return "INT:\\(self)" }
}
let x: Printable = 42
print(x.display())`,
      solution: `INT:42`,
      hints: [
        'Int conforms to Printable via extension.',
        'display() returns "INT:" + the value.',
        'x is 42, so output is "INT:42".',
      ],
      concepts: ['protocol-conformance', 'extension'],
    },
    {
      id: 'swift-ext-19',
      title: 'Refactor to Extension',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Move the helper function into a String extension method.',
      skeleton: `func isPalindrome(_ s: String) -> Bool {
    let lower = s.lowercased()
    return lower == String(lower.reversed())
}
print(isPalindrome("Racecar"))`,
      solution: `extension String {
    var isPalindrome: Bool {
        let lower = self.lowercased()
        return lower == String(lower.reversed())
    }
}
print("Racecar".isPalindrome)`,
      hints: [
        'Move the function into a String extension.',
        'Use self instead of the parameter.',
        'A computed property reads more naturally.',
      ],
      concepts: ['extension', 'refactoring'],
    },
    {
      id: 'swift-ext-20',
      title: 'Refactor Free Functions to Extensions',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Move the free functions into type extensions.',
      skeleton: `func isPositive(_ n: Int) -> Bool { return n > 0 }
func absolute(_ n: Int) -> Int { return n < 0 ? -n : n }

print(isPositive(-5))
print(absolute(-5))`,
      solution: `extension Int {
    var isPositive: Bool { return self > 0 }
    var absolute: Int { return self < 0 ? -self : self }
}

print((-5).isPositive)
print((-5).absolute)`,
      hints: [
        'Move both into extension Int.',
        'Replace n with self.',
        'Computed properties are more idiomatic for these.',
      ],
      concepts: ['extension', 'refactoring'],
    },
  ],
};
