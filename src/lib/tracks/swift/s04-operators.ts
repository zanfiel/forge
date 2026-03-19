import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-ops',
  title: '04. Operators',
  explanation: `## Operators in Swift

Swift provides standard operators plus some powerful additions.

### Arithmetic
\`\`\`swift
1 + 2    // 3
10 % 3   // 1 (remainder)
\`\`\`

### Comparison & Logical
\`\`\`swift
3 > 2          // true
true && false  // false
!true          // false
\`\`\`

### Ternary & Nil-Coalescing
\`\`\`swift
let label = score > 50 ? "Pass" : "Fail"
let value = optionalInt ?? 0  // default if nil
\`\`\`

### Range Operators
\`\`\`swift
1...5    // closed range: 1, 2, 3, 4, 5
1..<5    // half-open range: 1, 2, 3, 4
\`\`\``,
  exercises: [
    {
      id: 'swift-ops-1',
      title: 'Remainder Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use the remainder operator to get the remainder of 17 divided by 5.',
      skeleton: `let remainder = 17 ___ 5`,
      solution: `let remainder = 17 % 5`,
      hints: [
        'The remainder operator in Swift is %.',
        '17 % 5 gives the remainder of integer division.',
        'The result is 2.',
      ],
      concepts: ['remainder-operator'],
    },
    {
      id: 'swift-ops-2',
      title: 'Ternary Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use the ternary operator to assign "Even" or "Odd".',
      skeleton: `let n = 4
let label = n % 2 == 0 ___ "Even" ___ "Odd"`,
      solution: `let n = 4
let label = n % 2 == 0 ? "Even" : "Odd"`,
      hints: [
        'The ternary operator syntax is: condition ? valueIfTrue : valueIfFalse.',
        'Use ? after the condition.',
        'Use : to separate the two values.',
      ],
      concepts: ['ternary-operator'],
    },
    {
      id: 'swift-ops-3',
      title: 'Nil-Coalescing Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Provide a default value of 0 using the nil-coalescing operator.',
      skeleton: `let input: Int? = nil
let value = input ___ 0`,
      solution: `let input: Int? = nil
let value = input ?? 0`,
      hints: [
        'The nil-coalescing operator is ??.',
        'It provides a default when the optional is nil.',
        'Syntax: optional ?? defaultValue.',
      ],
      concepts: ['nil-coalescing'],
    },
    {
      id: 'swift-ops-4',
      title: 'Closed Range',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Create a closed range from 1 to 10 inclusive.',
      skeleton: `for i in 1___10 {
    print(i)
}`,
      solution: `for i in 1...10 {
    print(i)
}`,
      hints: [
        'A closed range uses the ... operator.',
        'It includes both endpoints.',
        '1...10 includes 1 through 10.',
      ],
      concepts: ['closed-range'],
    },
    {
      id: 'swift-ops-5',
      title: 'Half-Open Range',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Create a half-open range from 0 to 5 (excluding 5).',
      skeleton: `for i in 0___5 {
    print(i)
}`,
      solution: `for i in 0..<5 {
    print(i)
}`,
      hints: [
        'A half-open range uses the ..< operator.',
        'It includes the start but excludes the end.',
        '0..<5 gives 0, 1, 2, 3, 4.',
      ],
      concepts: ['half-open-range'],
    },
    {
      id: 'swift-ops-6',
      title: 'Logical AND',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use logical AND to check both conditions.',
      skeleton: `let age = 25
let hasID = true
if age >= 18 ___ hasID {
    print("Allowed")
}`,
      solution: `let age = 25
let hasID = true
if age >= 18 && hasID {
    print("Allowed")
}`,
      hints: [
        'Logical AND is the && operator.',
        'Both conditions must be true.',
        'Short-circuit evaluation applies.',
      ],
      concepts: ['logical-and'],
    },
    {
      id: 'swift-ops-7',
      title: 'Compound Assignment Calculator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write code that starts with total = 100, adds 50, subtracts 30, multiplies by 2, using compound assignment operators.',
      skeleton: `var total = 100
// Add 50
// Subtract 30
// Multiply by 2
print(total)`,
      solution: `var total = 100
total += 50
total -= 30
total *= 2
print(total)`,
      hints: [
        'Use += to add, -= to subtract, *= to multiply.',
        'Compound assignment combines operation and assignment.',
        'The final result is (100 + 50 - 30) * 2 = 240.',
      ],
      concepts: ['compound-assignment'],
    },
    {
      id: 'swift-ops-8',
      title: 'Clamp Value to Range',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that clamps an Int to a given range (min...max).',
      skeleton: `func clamp(_ value: Int, min lower: Int, max upper: Int) -> Int {
    // Return value clamped to [lower, upper]
}`,
      solution: `func clamp(_ value: Int, min lower: Int, max upper: Int) -> Int {
    return max(lower, min(upper, value))
}`,
      hints: [
        'If value < lower, return lower.',
        'If value > upper, return upper.',
        'Use min() and max() or ternary operators.',
      ],
      concepts: ['comparison', 'min', 'max'],
    },
    {
      id: 'swift-ops-9',
      title: 'FizzBuzz with Operators',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that returns "FizzBuzz" for multiples of 15, "Fizz" for 3, "Buzz" for 5, or the number as String.',
      skeleton: `func fizzBuzz(_ n: Int) -> String {
    // Implement FizzBuzz logic
}`,
      solution: `func fizzBuzz(_ n: Int) -> String {
    if n % 15 == 0 { return "FizzBuzz" }
    if n % 3 == 0 { return "Fizz" }
    if n % 5 == 0 { return "Buzz" }
    return String(n)
}`,
      hints: [
        'Check divisibility by 15 first (both 3 and 5).',
        'Use the % operator to check divisibility.',
        'Convert Int to String with String().',
      ],
      concepts: ['remainder-operator', 'conditionals'],
    },
    {
      id: 'swift-ops-10',
      title: 'Range Contains Check',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write a function that checks if a number is in the range 1 to 100 inclusive.',
      skeleton: `func isInRange(_ n: Int) -> Bool {
    // Check if n is between 1 and 100 inclusive
}`,
      solution: `func isInRange(_ n: Int) -> Bool {
    return (1...100).contains(n)
}`,
      hints: [
        'Create a closed range with 1...100.',
        'Use .contains() to check membership.',
        'Ranges have a contains method.',
      ],
      concepts: ['closed-range', 'contains'],
    },
    {
      id: 'swift-ops-11',
      title: 'Nil-Coalescing Chain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that takes three optional Ints and returns the first non-nil value, or 0.',
      skeleton: `func firstNonNil(_ a: Int?, _ b: Int?, _ c: Int?) -> Int {
    // Return first non-nil or 0
}`,
      solution: `func firstNonNil(_ a: Int?, _ b: Int?, _ c: Int?) -> Int {
    return a ?? b ?? c ?? 0
}`,
      hints: [
        'Chain multiple ?? operators.',
        'Each ?? tries the next value if the previous is nil.',
        'The final ?? 0 is the fallback.',
      ],
      concepts: ['nil-coalescing', 'optional-chaining'],
    },
    {
      id: 'swift-ops-12',
      title: 'Power Function with Loop',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that computes base raised to the power of exp using a loop and the *= operator.',
      skeleton: `func power(_ base: Int, _ exp: Int) -> Int {
    // Compute base^exp using a loop
}`,
      solution: `func power(_ base: Int, _ exp: Int) -> Int {
    var result = 1
    for _ in 0..<exp {
        result *= base
    }
    return result
}`,
      hints: [
        'Start with result = 1.',
        'Multiply by base, exp times.',
        'Use a half-open range 0..<exp.',
      ],
      concepts: ['compound-assignment', 'half-open-range'],
    },
    {
      id: 'swift-ops-13',
      title: 'Fix Operator Precedence',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the expression so it computes (2 + 3) * 4 = 20, not 2 + 12 = 14.',
      skeleton: `let result = 2 + 3 * 4
print(result) // Should be 20`,
      solution: `let result = (2 + 3) * 4
print(result) // Should be 20`,
      hints: [
        'Multiplication has higher precedence than addition.',
        'Use parentheses to force addition first.',
        'Wrap 2 + 3 in parentheses.',
      ],
      concepts: ['operator-precedence', 'parentheses'],
    },
    {
      id: 'swift-ops-14',
      title: 'Fix Comparison Type Error',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the comparison so it compiles correctly.',
      skeleton: `let x: Int = 5
let y: Double = 5.0
if x == y {
    print("Equal")
}`,
      solution: `let x: Int = 5
let y: Double = 5.0
if Double(x) == y {
    print("Equal")
}`,
      hints: [
        'Swift cannot compare Int and Double directly.',
        'Convert one type to match the other.',
        'Use Double(x) to convert.',
      ],
      concepts: ['comparison', 'type-conversion'],
    },
    {
      id: 'swift-ops-15',
      title: 'Fix Logical Operator',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the logical operator to check if either condition is true.',
      skeleton: `let isMember = false
let hasTicket = true
if isMember && hasTicket {
    print("Welcome")
}
// Should print "Welcome" if EITHER is true`,
      solution: `let isMember = false
let hasTicket = true
if isMember || hasTicket {
    print("Welcome")
}`,
      hints: [
        '&& requires both to be true.',
        'Use || for logical OR.',
        'OR returns true if either operand is true.',
      ],
      concepts: ['logical-or', 'logical-and'],
    },
    {
      id: 'swift-ops-16',
      title: 'Predict Ternary Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let x = 10
let result = x > 5 ? "High" : "Low"
print(result)`,
      solution: `High`,
      hints: [
        '10 > 5 is true.',
        'When true, the ternary returns the first value.',
        'The result is "High".',
      ],
      concepts: ['ternary-operator'],
    },
    {
      id: 'swift-ops-17',
      title: 'Predict Nil-Coalescing Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let a: Int? = nil
let b: Int? = 42
let result = a ?? b ?? 0
print(result)`,
      solution: `42`,
      hints: [
        'a is nil, so it falls through.',
        'b is 42, which is not nil.',
        'The chain stops at the first non-nil value.',
      ],
      concepts: ['nil-coalescing'],
    },
    {
      id: 'swift-ops-18',
      title: 'Predict Range Count',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let range = 1..<6
print(range.count)`,
      solution: `5`,
      hints: [
        'Half-open range excludes the upper bound.',
        '1..<6 contains 1, 2, 3, 4, 5.',
        'That is 5 elements.',
      ],
      concepts: ['half-open-range', 'count'],
    },
    {
      id: 'swift-ops-19',
      title: 'Refactor Nested Ternaries',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor the nested ternary to use if/else for clarity.',
      skeleton: `let score = 85
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F"
print(grade)`,
      solution: `let score = 85
let grade: String
if score >= 90 {
    grade = "A"
} else if score >= 80 {
    grade = "B"
} else if score >= 70 {
    grade = "C"
} else {
    grade = "F"
}
print(grade)`,
      hints: [
        'Nested ternaries are hard to read.',
        'Use if/else if/else for multiple conditions.',
        'Declare grade first, then assign in each branch.',
      ],
      concepts: ['ternary-operator', 'if-else', 'refactoring'],
    },
    {
      id: 'swift-ops-20',
      title: 'Refactor to Use Nil-Coalescing',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Refactor the if/else to use the nil-coalescing operator.',
      skeleton: `let name: String? = nil
let displayName: String
if name != nil {
    displayName = name!
} else {
    displayName = "Anonymous"
}
print(displayName)`,
      solution: `let name: String? = nil
let displayName = name ?? "Anonymous"
print(displayName)`,
      hints: [
        'The nil-coalescing operator replaces if/else nil checks.',
        'Use ?? to provide a default value.',
        'This eliminates the need for force unwrapping.',
      ],
      concepts: ['nil-coalescing', 'refactoring'],
    },
  ],
};
