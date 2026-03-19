import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-var',
  title: '01. Variables',
  explanation: `## Variables in Swift

Swift uses \`let\` for constants and \`var\` for variables. The compiler infers types automatically, but you can add explicit type annotations.

\`\`\`swift
let name = "Alice"        // String inferred
var age: Int = 30          // Explicit type annotation
let (x, y) = (10, 20)     // Tuple decomposition

var score = 100
score += 50                // var allows mutation
// name = "Bob"            // ERROR: let is immutable
\`\`\`

### Type Inference
Swift's type inference is powerful - it deduces the type from the assigned value. Use annotations when the inferred type isn't what you want (e.g., \`let pi: Float = 3.14\` instead of the default \`Double\`).

### Tuples
Tuples group multiple values into a single compound value:
\`\`\`swift
let point = (x: 3, y: 7)
print(point.x)  // 3
\`\`\``,
  exercises: [
    {
      id: 'swift-var-1',
      title: 'Declare a Constant',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a constant named greeting with the value "Hello".',
      skeleton: `___ greeting = "Hello"`,
      solution: `let greeting = "Hello"`,
      hints: [
        'Constants in Swift are declared with the `let` keyword.',
        'Constants cannot be changed after assignment.',
        'Use `let` for values that never change.',
      ],
      concepts: ['let', 'constants'],
    },
    {
      id: 'swift-var-2',
      title: 'Declare a Variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a variable named count with the value 0.',
      skeleton: `___ count = 0`,
      solution: `var count = 0`,
      hints: [
        'Variables in Swift are declared with the `var` keyword.',
        'Variables can be reassigned after declaration.',
        'Use `var` when the value needs to change.',
      ],
      concepts: ['var', 'variables'],
    },
    {
      id: 'swift-var-3',
      title: 'Type Annotation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a variable named price with an explicit Double type annotation and value 9.99.',
      skeleton: `var price___Double = 9.99`,
      solution: `var price: Double = 9.99`,
      hints: [
        'Type annotations use a colon after the variable name.',
        'The syntax is `var name: Type = value`.',
        'Double is the type for decimal numbers.',
      ],
      concepts: ['type-annotation', 'Double'],
    },
    {
      id: 'swift-var-4',
      title: 'Tuple Decomposition',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Decompose a tuple into two constants x and y.',
      skeleton: `let point = (10, 20)
let (___, ___) = point`,
      solution: `let point = (10, 20)
let (x, y) = point`,
      hints: [
        'Tuples can be decomposed into individual constants.',
        'Use `let (a, b) = tuple` to extract values.',
        'The variable names should be x and y.',
      ],
      concepts: ['tuples', 'decomposition'],
    },
    {
      id: 'swift-var-5',
      title: 'Named Tuple Elements',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Create a named tuple with fields name and age.',
      skeleton: `let person: (___: String, ___: Int) = ("Alice", 30)`,
      solution: `let person: (name: String, age: Int) = ("Alice", 30)`,
      hints: [
        'Named tuples use labels before each type.',
        'The syntax is `(label: Type, label: Type)`.',
        'Use name for the String and age for the Int.',
      ],
      concepts: ['tuples', 'named-tuples'],
    },
    {
      id: 'swift-var-6',
      title: 'Ignore Tuple Element',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Decompose a tuple but ignore the second element using an underscore.',
      skeleton: `let coords = (5, 10)
let (x, ___) = coords`,
      solution: `let coords = (5, 10)
let (x, _) = coords`,
      hints: [
        'Use underscore `_` to ignore a value.',
        'The wildcard pattern discards the value.',
        'Only x should be bound.',
      ],
      concepts: ['tuples', 'wildcard'],
    },
    {
      id: 'swift-var-7',
      title: 'Write a Swap Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write code that swaps the values of two variables a and b using a temporary variable.',
      skeleton: `var a = 1
var b = 2
// Swap a and b using a temporary variable
`,
      solution: `var a = 1
var b = 2
let temp = a
a = b
b = temp`,
      hints: [
        'Store one value in a temporary constant first.',
        'Then assign the other value to the first variable.',
        'Finally assign the temp to the second variable.',
      ],
      concepts: ['var', 'let', 'swap'],
    },
    {
      id: 'swift-var-8',
      title: 'Multiple Variable Declaration',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare three constants x, y, z on a single line with values 1, 2, 3.',
      skeleton: `// Declare x, y, z on one line
`,
      solution: `let (x, y, z) = (1, 2, 3)`,
      hints: [
        'You can use tuple decomposition on one line.',
        'The syntax is `let (a, b, c) = (v1, v2, v3)`.',
        'All three should be constants.',
      ],
      concepts: ['let', 'tuples', 'multiple-declaration'],
    },
    {
      id: 'swift-var-9',
      title: 'Create a Function Returning a Tuple',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function minMax that takes an array of Int and returns a named tuple (min: Int, max: Int).',
      skeleton: `func minMax(array: [Int]) -> (min: Int, max: Int) {
    // Return the min and max of the array
}`,
      solution: `func minMax(array: [Int]) -> (min: Int, max: Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array {
        if value < currentMin {
            currentMin = value
        }
        if value > currentMax {
            currentMax = value
        }
    }
    return (min: currentMin, max: currentMax)
}`,
      hints: [
        'Initialize min and max with the first element.',
        'Loop through the array comparing each element.',
        'Return a named tuple with (min:, max:).',
      ],
      concepts: ['functions', 'tuples', 'named-tuples'],
    },
    {
      id: 'swift-var-10',
      title: 'Compute Rectangle Area',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Given a tuple representing width and height, compute the area and store it in a constant.',
      skeleton: `let rect = (width: 5, height: 10)
// Compute the area
`,
      solution: `let rect = (width: 5, height: 10)
let area = rect.width * rect.height`,
      hints: [
        'Access named tuple elements with dot syntax.',
        'Multiply width and height.',
        'Store the result in a constant named area.',
      ],
      concepts: ['tuples', 'named-tuples', 'let'],
    },
    {
      id: 'swift-var-11',
      title: 'Convert Tuple to Variables',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write code to extract the first and second elements of a tuple into separate variables named first and second.',
      skeleton: `let pair = ("hello", 42)
// Extract into first and second
`,
      solution: `let pair = ("hello", 42)
let first = pair.0
let second = pair.1`,
      hints: [
        'Unnamed tuple elements use numeric indices.',
        'The first element is `.0`, second is `.1`.',
        'You can also use decomposition.',
      ],
      concepts: ['tuples', 'index-access'],
    },
    {
      id: 'swift-var-12',
      title: 'Fix the Immutable Variable',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code so that the score can be updated.',
      skeleton: `let score = 0
score = 10
print(score)`,
      solution: `var score = 0
score = 10
print(score)`,
      hints: [
        '`let` declares an immutable constant.',
        'To allow reassignment, use `var` instead.',
        'Change the declaration keyword.',
      ],
      concepts: ['let', 'var', 'mutability'],
    },
    {
      id: 'swift-var-13',
      title: 'Fix the Type Mismatch',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the type annotation so it matches the assigned value.',
      skeleton: `let name: Int = "Alice"
print(name)`,
      solution: `let name: String = "Alice"
print(name)`,
      hints: [
        '"Alice" is a String, not an Int.',
        'The type annotation must match the value.',
        'Change Int to String.',
      ],
      concepts: ['type-annotation', 'type-mismatch'],
    },
    {
      id: 'swift-var-14',
      title: 'Fix Missing Type Annotation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code so the variable is explicitly typed as Float.',
      skeleton: `let temperature = 98.6
// temperature should be Float, not Double`,
      solution: `let temperature: Float = 98.6`,
      hints: [
        'Without annotation, decimal literals default to Double.',
        'Add `: Float` after the variable name.',
        'Explicit annotation overrides inference.',
      ],
      concepts: ['type-annotation', 'Float', 'Double'],
    },
    {
      id: 'swift-var-15',
      title: 'Predict let vs var Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `var x = 5
x = x + 3
let y = x
print(y)`,
      solution: `8`,
      hints: [
        'x starts at 5 and is incremented by 3.',
        'y captures the current value of x.',
        'The final value of x is 8.',
      ],
      concepts: ['var', 'let', 'assignment'],
    },
    {
      id: 'swift-var-16',
      title: 'Predict Tuple Access',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let info = (name: "Swift", version: 5)
print(info.version)`,
      solution: `5`,
      hints: [
        'Named tuple elements are accessed with dot syntax.',
        'The version field is 5.',
        'print outputs the value of info.version.',
      ],
      concepts: ['tuples', 'named-tuples'],
    },
    {
      id: 'swift-var-17',
      title: 'Predict Multiple Assignment',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `var a = 10
var b = a
a = 20
print(b)`,
      solution: `10`,
      hints: [
        'b gets the value of a at the time of assignment.',
        'Changing a afterward does not affect b.',
        'Value types are copied on assignment.',
      ],
      concepts: ['value-semantics', 'var', 'assignment'],
    },
    {
      id: 'swift-var-18',
      title: 'Refactor to Use Type Inference',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Remove unnecessary type annotations where Swift can infer the type.',
      skeleton: `let name: String = "Alice"
let age: Int = 30
let height: Double = 5.9
let isStudent: Bool = true`,
      solution: `let name = "Alice"
let age = 30
let height = 5.9
let isStudent = true`,
      hints: [
        'Swift can infer String from string literals.',
        'Integer literals infer to Int.',
        'Boolean literals infer to Bool.',
      ],
      concepts: ['type-inference', 'clean-code'],
    },
    {
      id: 'swift-var-19',
      title: 'Refactor to Use Named Tuple',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Refactor separate variables into a single named tuple.',
      skeleton: `let latitude = 37.7749
let longitude = -122.4194
print(latitude)
print(longitude)`,
      solution: `let location = (latitude: 37.7749, longitude: -122.4194)
print(location.latitude)
print(location.longitude)`,
      hints: [
        'Group related values into a named tuple.',
        'Access elements with dot notation.',
        'The tuple should be named location.',
      ],
      concepts: ['tuples', 'named-tuples', 'refactoring'],
    },
    {
      id: 'swift-var-20',
      title: 'Write a Tuple Comparison',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that takes two (Int, Int) tuples and returns true if the first tuple is less than the second (compare first element, then second).',
      skeleton: `func isLessThan(_ a: (Int, Int), _ b: (Int, Int)) -> Bool {
    // Compare tuples
}`,
      solution: `func isLessThan(_ a: (Int, Int), _ b: (Int, Int)) -> Bool {
    return a < b
}`,
      hints: [
        'Swift can compare tuples with < operator.',
        'Tuples are compared element by element.',
        'You can use the built-in < operator directly.',
      ],
      concepts: ['tuples', 'comparison', 'functions'],
    },
  ],
};
