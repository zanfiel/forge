import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-types',
  title: '02. Types',
  explanation: `## Types in Swift

Swift is a type-safe language with strong typing. The fundamental types include:

\`\`\`swift
let integer: Int = 42           // Platform-sized integer
let decimal: Double = 3.14      // 64-bit floating point
let text: String = "Hello"      // String of characters
let flag: Bool = true           // Boolean
let letter: Character = "A"    // Single character
\`\`\`

### Type Aliases
Create alternative names for existing types:
\`\`\`swift
typealias Distance = Double
let marathon: Distance = 42.195
\`\`\`

### Type Conversion
Swift requires explicit conversion between types:
\`\`\`swift
let intVal = 42
let doubleVal = Double(intVal)  // Explicit conversion
let label = "Score: " + String(intVal)
\`\`\``,
  exercises: [
    {
      id: 'swift-types-1',
      title: 'Declare an Int',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a constant of type Int with value 100.',
      skeleton: `let count: ___ = 100`,
      solution: `let count: Int = 100`,
      hints: [
        'The standard integer type in Swift is `Int`.',
        'Int is platform-sized (64-bit on modern systems).',
        'Use Int for whole numbers.',
      ],
      concepts: ['Int', 'type-annotation'],
    },
    {
      id: 'swift-types-2',
      title: 'Declare a Character',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a constant of type Character with value "A".',
      skeleton: `let letter: ___ = "A"`,
      solution: `let letter: Character = "A"`,
      hints: [
        'A single character uses the Character type.',
        'Without annotation, "A" would be inferred as String.',
        'Character requires explicit annotation for single-char literals.',
      ],
      concepts: ['Character', 'type-annotation'],
    },
    {
      id: 'swift-types-3',
      title: 'Type Alias',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Create a type alias called Meters for Double.',
      skeleton: `___ Meters = Double
let height: Meters = 1.82`,
      solution: `typealias Meters = Double
let height: Meters = 1.82`,
      hints: [
        'Use the `typealias` keyword.',
        'The syntax is `typealias NewName = ExistingType`.',
        'Meters becomes an alternative name for Double.',
      ],
      concepts: ['typealias'],
    },
    {
      id: 'swift-types-4',
      title: 'Int to Double Conversion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Convert an Int to Double.',
      skeleton: `let x = 42
let y = ___(x)`,
      solution: `let x = 42
let y = Double(x)`,
      hints: [
        'Use the target type as a function call.',
        'Double(someInt) converts Int to Double.',
        'Swift requires explicit type conversion.',
      ],
      concepts: ['type-conversion', 'Double'],
    },
    {
      id: 'swift-types-5',
      title: 'String to Int Conversion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Convert a String to an optional Int.',
      skeleton: `let text = "42"
let number = ___(text)`,
      solution: `let text = "42"
let number = Int(text)`,
      hints: [
        'Int() can take a String argument.',
        'String to Int conversion returns an Optional.',
        'It returns nil if the string is not a valid number.',
      ],
      concepts: ['type-conversion', 'Int', 'Optional'],
    },
    {
      id: 'swift-types-6',
      title: 'Bool Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a Bool constant set to false.',
      skeleton: `let isReady: ___ = false`,
      solution: `let isReady: Bool = false`,
      hints: [
        'Boolean values use the `Bool` type.',
        'The two possible values are `true` and `false`.',
        'Bool is the standard boolean type.',
      ],
      concepts: ['Bool'],
    },
    {
      id: 'swift-types-7',
      title: 'Write a Type Checking Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that takes an Int and returns it as a String with a prefix "Number: ".',
      skeleton: `func formatNumber(_ n: Int) -> String {
    // Return "Number: " followed by n as a string
}`,
      solution: `func formatNumber(_ n: Int) -> String {
    return "Number: " + String(n)
}`,
      hints: [
        'Convert Int to String using String().',
        'Concatenate strings with the + operator.',
        'Return the combined string.',
      ],
      concepts: ['type-conversion', 'String', 'functions'],
    },
    {
      id: 'swift-types-8',
      title: 'Safe String to Double',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that converts a String to Double, returning 0.0 if conversion fails.',
      skeleton: `func safeDouble(_ text: String) -> Double {
    // Convert text to Double, return 0.0 on failure
}`,
      solution: `func safeDouble(_ text: String) -> Double {
    return Double(text) ?? 0.0
}`,
      hints: [
        'Double(String) returns an Optional.',
        'Use the nil-coalescing operator ?? for a default.',
        'Return 0.0 when the conversion fails.',
      ],
      concepts: ['type-conversion', 'Optional', 'nil-coalescing'],
    },
    {
      id: 'swift-types-9',
      title: 'Numeric Type Widening',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that adds an Int and a Double together, returning a Double.',
      skeleton: `func addMixed(a: Int, b: Double) -> Double {
    // Add a and b, return the result
}`,
      solution: `func addMixed(a: Int, b: Double) -> Double {
    return Double(a) + b
}`,
      hints: [
        'You cannot add Int and Double directly in Swift.',
        'Convert the Int to Double first.',
        'Use Double(a) to convert.',
      ],
      concepts: ['type-conversion', 'arithmetic'],
    },
    {
      id: 'swift-types-10',
      title: 'Create Typealias for Closure',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Create a typealias called MathOperation for a closure that takes two Ints and returns an Int, then use it.',
      skeleton: `// Create the typealias
// Then create a constant 'add' of type MathOperation
`,
      solution: `typealias MathOperation = (Int, Int) -> Int
let add: MathOperation = { $0 + $1 }`,
      hints: [
        'Use typealias for the closure type.',
        'The closure signature is (Int, Int) -> Int.',
        'Use shorthand argument names $0 and $1.',
      ],
      concepts: ['typealias', 'closures'],
    },
    {
      id: 'swift-types-11',
      title: 'Character Iteration',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that counts the number of vowels (a, e, i, o, u) in a string.',
      skeleton: `func countVowels(_ text: String) -> Int {
    // Count vowels in text
}`,
      solution: `func countVowels(_ text: String) -> Int {
    let vowels: Set<Character> = ["a", "e", "i", "o", "u"]
    return text.lowercased().filter { vowels.contains($0) }.count
}`,
      hints: [
        'Iterate over characters in the string.',
        'Check each character against a set of vowels.',
        'Remember to handle uppercase by lowercasing first.',
      ],
      concepts: ['Character', 'String', 'filter'],
    },
    {
      id: 'swift-types-12',
      title: 'Type Bounds Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that prints the min and max values of Int8.',
      skeleton: `func printInt8Bounds() {
    // Print the min and max of Int8
}`,
      solution: `func printInt8Bounds() {
    print(Int8.min)
    print(Int8.max)
}`,
      hints: [
        'Integer types have static .min and .max properties.',
        'Int8.min is -128 and Int8.max is 127.',
        'Use the type name directly.',
      ],
      concepts: ['Int8', 'numeric-bounds'],
    },
    {
      id: 'swift-types-13',
      title: 'Fix Type Mismatch in Addition',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code so the addition compiles.',
      skeleton: `let a: Int = 5
let b: Double = 3.2
let result = a + b
print(result)`,
      solution: `let a: Int = 5
let b: Double = 3.2
let result = Double(a) + b
print(result)`,
      hints: [
        'Swift does not implicitly convert between types.',
        'Convert one type to match the other.',
        'Use Double(a) to convert Int to Double.',
      ],
      concepts: ['type-conversion', 'type-safety'],
    },
    {
      id: 'swift-types-14',
      title: 'Fix Character Assignment',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code so letter is a Character, not a String.',
      skeleton: `let letter = "Z"
// letter is inferred as String, should be Character`,
      solution: `let letter: Character = "Z"`,
      hints: [
        'Single character literals default to String.',
        'Add an explicit type annotation.',
        'Use `: Character` after the name.',
      ],
      concepts: ['Character', 'type-annotation'],
    },
    {
      id: 'swift-types-15',
      title: 'Fix Overflow Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the code to avoid an overflow when storing a large value.',
      skeleton: `let bigNumber: Int8 = 200
print(bigNumber)`,
      solution: `let bigNumber: Int16 = 200
print(bigNumber)`,
      hints: [
        'Int8 can only hold values from -128 to 127.',
        '200 exceeds the range of Int8.',
        'Use a larger integer type like Int16 or Int.',
      ],
      concepts: ['integer-overflow', 'Int8', 'Int16'],
    },
    {
      id: 'swift-types-16',
      title: 'Predict Type Conversion Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let x = 7
let y = 2
let result = Double(x) / Double(y)
print(result)`,
      solution: `3.5`,
      hints: [
        'Both x and y are converted to Double before division.',
        'Double division preserves the fractional part.',
        '7.0 / 2.0 = 3.5.',
      ],
      concepts: ['type-conversion', 'division'],
    },
    {
      id: 'swift-types-17',
      title: 'Predict Int Truncation',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let pi = 3.99
let truncated = Int(pi)
print(truncated)`,
      solution: `3`,
      hints: [
        'Converting Double to Int truncates toward zero.',
        'It does not round, it truncates.',
        '3.99 becomes 3.',
      ],
      concepts: ['type-conversion', 'truncation'],
    },
    {
      id: 'swift-types-18',
      title: 'Predict String Conversion',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let val = Int("abc")
print(val == nil)`,
      solution: `true`,
      hints: [
        'Int("abc") fails because "abc" is not a number.',
        'Failed conversions return nil.',
        'nil == nil is true.',
      ],
      concepts: ['type-conversion', 'Optional', 'nil'],
    },
    {
      id: 'swift-types-19',
      title: 'Refactor Explicit to Inferred Types',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Remove redundant type annotations where inference is sufficient.',
      skeleton: `let message: String = "Hello"
let count: Int = 42
let pi: Double = 3.14
let active: Bool = true`,
      solution: `let message = "Hello"
let count = 42
let pi = 3.14
let active = true`,
      hints: [
        'Swift infers types from literal values.',
        'String, Int, Double, Bool can all be inferred.',
        'Remove the `: Type` annotations.',
      ],
      concepts: ['type-inference', 'clean-code'],
    },
    {
      id: 'swift-types-20',
      title: 'Refactor Repeated Conversions',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor to avoid repeated type conversions by converting once.',
      skeleton: `let x: Int = 10
let a = Double(x) + 1.5
let b = Double(x) * 2.0
let c = Double(x) - 0.5
print(a, b, c)`,
      solution: `let x: Int = 10
let dx = Double(x)
let a = dx + 1.5
let b = dx * 2.0
let c = dx - 0.5
print(a, b, c)`,
      hints: [
        'Convert x to Double once and reuse it.',
        'Store the converted value in a new constant.',
        'This avoids redundant conversions.',
      ],
      concepts: ['type-conversion', 'refactoring', 'DRY'],
    },
  ],
};
