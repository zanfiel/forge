import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-flow',
  title: '05. Control Flow',
  explanation: `## Control Flow in Swift

Swift provides powerful control flow constructs.

### if / else
\`\`\`swift
if temperature > 30 {
    print("Hot")
} else if temperature > 20 {
    print("Warm")
} else {
    print("Cool")
}
\`\`\`

### guard
\`\`\`swift
func greet(_ name: String?) {
    guard let name = name else { return }
    print("Hello, \\(name)")
}
\`\`\`

### switch
\`\`\`swift
switch value {
case 1: print("One")
case 2...5: print("Two to Five")
default: print("Other")
}
\`\`\`

### Loops
\`\`\`swift
for i in 1...5 { print(i) }
while condition { /* ... */ }
repeat { /* ... */ } while condition
\`\`\`

### where clause
\`\`\`swift
for i in 1...10 where i % 2 == 0 {
    print(i)  // 2, 4, 6, 8, 10
}
\`\`\``,
  exercises: [
    {
      id: 'swift-flow-1',
      title: 'Basic if/else',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Complete the if/else to print "Adult" if age >= 18, otherwise "Minor".',
      skeleton: `let age = 20
___ age >= 18 {
    print("Adult")
} ___ {
    print("Minor")
}`,
      solution: `let age = 20
if age >= 18 {
    print("Adult")
} else {
    print("Minor")
}`,
      hints: [
        'Use `if` for the condition.',
        'Use `else` for the alternative branch.',
        'No parentheses required around the condition.',
      ],
      concepts: ['if-else'],
    },
    {
      id: 'swift-flow-2',
      title: 'Guard Statement',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use guard to unwrap an optional and return early if nil.',
      skeleton: `func process(_ value: Int?) {
    ___ let v = value ___ { return }
    print(v)
}`,
      solution: `func process(_ value: Int?) {
    guard let v = value else { return }
    print(v)
}`,
      hints: [
        'guard requires an else clause.',
        'The else clause must exit the scope.',
        'The unwrapped value is available after the guard.',
      ],
      concepts: ['guard', 'optional-binding'],
    },
    {
      id: 'swift-flow-3',
      title: 'Switch Statement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Complete the switch to match specific day names.',
      skeleton: `let day = "Monday"
___ day {
___ "Monday": print("Start of week")
___ "Friday": print("Almost weekend")
___: print("Regular day")
}`,
      solution: `let day = "Monday"
switch day {
case "Monday": print("Start of week")
case "Friday": print("Almost weekend")
default: print("Regular day")
}`,
      hints: [
        'switch and case are the keywords.',
        'Each case matches a value.',
        'default handles unmatched cases.',
      ],
      concepts: ['switch', 'pattern-matching'],
    },
    {
      id: 'swift-flow-4',
      title: 'For-in with Where',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Print only even numbers from 1 to 10 using where.',
      skeleton: `for i in 1...10 ___ i % 2 == 0 {
    print(i)
}`,
      solution: `for i in 1...10 where i % 2 == 0 {
    print(i)
}`,
      hints: [
        'The `where` clause filters loop iterations.',
        'Place it after the range, before the opening brace.',
        'Only iterations matching the condition execute.',
      ],
      concepts: ['for-in', 'where'],
    },
    {
      id: 'swift-flow-5',
      title: 'Repeat-While Loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Complete the repeat-while loop that runs at least once.',
      skeleton: `var n = 1
___ {
    print(n)
    n += 1
} ___ n <= 3`,
      solution: `var n = 1
repeat {
    print(n)
    n += 1
} while n <= 3`,
      hints: [
        'repeat-while runs the body at least once.',
        'The condition is checked after each iteration.',
        'Use `repeat` before the body and `while` after.',
      ],
      concepts: ['repeat-while'],
    },
    {
      id: 'swift-flow-6',
      title: 'Switch with Range',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use ranges in switch cases to categorize a score.',
      skeleton: `let score = 85
switch score {
case 90___100: print("A")
case 80___89: print("B")
case 70___79: print("C")
default: print("F")
}`,
      solution: `let score = 85
switch score {
case 90...100: print("A")
case 80...89: print("B")
case 70...79: print("C")
default: print("F")
}`,
      hints: [
        'Use the closed range operator ... in cases.',
        'Each case can match a range of values.',
        'Ranges must not overlap.',
      ],
      concepts: ['switch', 'range-matching'],
    },
    {
      id: 'swift-flow-7',
      title: 'Factorial with While Loop',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that computes factorial using a while loop.',
      skeleton: `func factorial(_ n: Int) -> Int {
    // Compute n! using a while loop
}`,
      solution: `func factorial(_ n: Int) -> Int {
    var result = 1
    var i = n
    while i > 1 {
        result *= i
        i -= 1
    }
    return result
}`,
      hints: [
        'Start with result = 1.',
        'Multiply result by each number from n down to 2.',
        'Use a while loop with a decrementing counter.',
      ],
      concepts: ['while', 'factorial'],
    },
    {
      id: 'swift-flow-8',
      title: 'Sum with For-in Loop',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write a function that sums all integers from 1 to n.',
      skeleton: `func sumTo(_ n: Int) -> Int {
    // Sum 1 to n using a for-in loop
}`,
      solution: `func sumTo(_ n: Int) -> Int {
    var sum = 0
    for i in 1...n {
        sum += i
    }
    return sum
}`,
      hints: [
        'Use a closed range 1...n.',
        'Accumulate each value into a sum variable.',
        'Return the final sum.',
      ],
      concepts: ['for-in', 'closed-range', 'accumulator'],
    },
    {
      id: 'swift-flow-9',
      title: 'Grade Calculator with Switch',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that returns a letter grade (A/B/C/D/F) using switch with ranges.',
      skeleton: `func grade(_ score: Int) -> String {
    // Return letter grade using switch
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
        'Use switch with range patterns.',
        'Ranges can use ... or ..<',
        'A default case handles scores below 60.',
      ],
      concepts: ['switch', 'range-matching', 'functions'],
    },
    {
      id: 'swift-flow-10',
      title: 'Validate with Guard',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that validates a username: must be non-nil, non-empty, and at least 3 characters.',
      skeleton: `func validateUsername(_ name: String?) -> String {
    // Use guard statements to validate
    // Return "Valid: <name>" or exit early with "Invalid"
}`,
      solution: `func validateUsername(_ name: String?) -> String {
    guard let name = name else { return "Invalid" }
    guard !name.isEmpty else { return "Invalid" }
    guard name.count >= 3 else { return "Invalid" }
    return "Valid: \\(name)"
}`,
      hints: [
        'Use multiple guard statements for each condition.',
        'Each guard returns "Invalid" in its else clause.',
        'The final return uses the validated name.',
      ],
      concepts: ['guard', 'validation'],
    },
    {
      id: 'swift-flow-11',
      title: 'Find First Match',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that finds the first negative number in an array, using a for-in loop with break.',
      skeleton: `func firstNegative(_ numbers: [Int]) -> Int? {
    // Return the first negative number, or nil
}`,
      solution: `func firstNegative(_ numbers: [Int]) -> Int? {
    for n in numbers {
        if n < 0 {
            return n
        }
    }
    return nil
}`,
      hints: [
        'Loop through the array with for-in.',
        'Check if each number is negative.',
        'Return immediately when found, nil if none.',
      ],
      concepts: ['for-in', 'early-return', 'Optional'],
    },
    {
      id: 'swift-flow-12',
      title: 'Continue to Skip',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write code that prints numbers 1 to 10 but skips multiples of 3 using continue.',
      skeleton: `// Print 1 to 10, skip multiples of 3
`,
      solution: `for i in 1...10 {
    if i % 3 == 0 { continue }
    print(i)
}`,
      hints: [
        'Use continue to skip the current iteration.',
        'Check if i is divisible by 3.',
        'continue jumps to the next iteration.',
      ],
      concepts: ['for-in', 'continue'],
    },
    {
      id: 'swift-flow-13',
      title: 'Fix Missing Default in Switch',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the switch statement that is missing a required case.',
      skeleton: `let direction = "north"
switch direction {
case "north": print("Up")
case "south": print("Down")
}`,
      solution: `let direction = "north"
switch direction {
case "north": print("Up")
case "south": print("Down")
default: print("Unknown")
}`,
      hints: [
        'Switch statements must be exhaustive.',
        'A String has infinite possible values.',
        'Add a default case to handle all other values.',
      ],
      concepts: ['switch', 'exhaustive'],
    },
    {
      id: 'swift-flow-14',
      title: 'Fix Guard Without Exit',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the guard statement that does not exit the scope in its else clause.',
      skeleton: `func check(_ value: Int?) -> Int {
    guard let v = value else {
        print("No value")
    }
    return v
}`,
      solution: `func check(_ value: Int?) -> Int {
    guard let v = value else {
        print("No value")
        return 0
    }
    return v
}`,
      hints: [
        'guard else must exit the enclosing scope.',
        'Add a return statement in the else block.',
        'The else block must return, throw, break, or continue.',
      ],
      concepts: ['guard', 'early-exit'],
    },
    {
      id: 'swift-flow-15',
      title: 'Fix Infinite Loop',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the while loop that never terminates.',
      skeleton: `var count = 0
while count < 5 {
    print(count)
}`,
      solution: `var count = 0
while count < 5 {
    print(count)
    count += 1
}`,
      hints: [
        'The loop condition never becomes false.',
        'Increment count inside the loop.',
        'Add count += 1 to make progress.',
      ],
      concepts: ['while', 'infinite-loop'],
    },
    {
      id: 'swift-flow-16',
      title: 'Predict Switch Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let x = 3
switch x {
case 1...5: print("Low")
case 6...10: print("High")
default: print("Out")
}`,
      solution: `Low`,
      hints: [
        '3 is in the range 1...5.',
        'The first matching case executes.',
        'Swift does not fall through by default.',
      ],
      concepts: ['switch', 'range-matching'],
    },
    {
      id: 'swift-flow-17',
      title: 'Predict For-in Where Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `var sum = 0
for i in 1...5 where i % 2 != 0 {
    sum += i
}
print(sum)`,
      solution: `9`,
      hints: [
        'where filters to odd numbers: 1, 3, 5.',
        '1 + 3 + 5 = 9.',
        'Even numbers are skipped.',
      ],
      concepts: ['for-in', 'where'],
    },
    {
      id: 'swift-flow-18',
      title: 'Predict Repeat-While Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `var n = 10
repeat {
    print(n)
    n += 1
} while n < 10`,
      solution: `10`,
      hints: [
        'repeat-while executes the body at least once.',
        'After printing 10, n becomes 11.',
        'The condition 11 < 10 is false, so it stops.',
      ],
      concepts: ['repeat-while'],
    },
    {
      id: 'swift-flow-19',
      title: 'Refactor if/else Chain to Switch',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor the if/else chain into a switch statement.',
      skeleton: `let fruit = "apple"
if fruit == "apple" {
    print("Red")
} else if fruit == "banana" {
    print("Yellow")
} else if fruit == "grape" {
    print("Purple")
} else {
    print("Unknown")
}`,
      solution: `let fruit = "apple"
switch fruit {
case "apple": print("Red")
case "banana": print("Yellow")
case "grape": print("Purple")
default: print("Unknown")
}`,
      hints: [
        'switch is cleaner for matching a single value.',
        'Each if becomes a case.',
        'The final else becomes default.',
      ],
      concepts: ['switch', 'refactoring'],
    },
    {
      id: 'swift-flow-20',
      title: 'Refactor to Use Guard',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor nested if-let into guard-let for flatter code.',
      skeleton: `func greet(_ name: String?, _ greeting: String?) -> String {
    if let n = name {
        if let g = greeting {
            return "\\(g), \\(n)!"
        } else {
            return "Hello, \\(n)!"
        }
    } else {
        return "Hello, stranger!"
    }
}`,
      solution: `func greet(_ name: String?, _ greeting: String?) -> String {
    guard let n = name else { return "Hello, stranger!" }
    guard let g = greeting else { return "Hello, \\(n)!" }
    return "\\(g), \\(n)!"
}`,
      hints: [
        'guard-let exits early, reducing nesting.',
        'Handle the nil cases first with guard.',
        'The happy path stays at the top level.',
      ],
      concepts: ['guard', 'refactoring', 'optional-binding'],
    },
  ],
};
