import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-str',
  title: '03. Strings',
  explanation: `## Strings in Swift

Swift strings are value types with full Unicode support. String interpolation uses \\(expression) syntax:

\`\`\`swift
let name = "World"
let greeting = "Hello, \\(name)!"  // "Hello, World!"
\`\`\`

### Multiline Strings
\`\`\`swift
let poem = """
    Roses are red,
    Violets are blue
    """
\`\`\`

### String Indices
Swift strings don't use integer indices — they use \`String.Index\`:
\`\`\`swift
let s = "Hello"
let first = s[s.startIndex]           // "H"
let last = s[s.index(before: s.endIndex)]  // "o"
\`\`\`

### Common Methods
\`\`\`swift
s.count             // 5
s.isEmpty           // false
s.uppercased()      // "HELLO"
s.contains("ell")   // true
s.hasPrefix("He")   // true
\`\`\``,
  exercises: [
    {
      id: 'swift-str-1',
      title: 'String Interpolation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use string interpolation to include the variable name in the greeting.',
      skeleton: `let name = "Swift"
let greeting = "Hello, ___!"`,
      solution: `let name = "Swift"
let greeting = "Hello, \\(name)!"`,
      hints: [
        'String interpolation uses \\(expression) syntax.',
        'Place the variable inside \\( and ).',
        'The result should be "Hello, Swift!".',
      ],
      concepts: ['string-interpolation'],
    },
    {
      id: 'swift-str-2',
      title: 'Multiline String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a multiline string using triple quotes.',
      skeleton: `let text = ___
Line one
Line two
___`,
      solution: `let text = """
Line one
Line two
"""`,
      hints: [
        'Multiline strings use triple double quotes.',
        'Start with """ on its own line.',
        'End with """ on its own line.',
      ],
      concepts: ['multiline-strings'],
    },
    {
      id: 'swift-str-3',
      title: 'String isEmpty Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Check if a string is empty using the correct property.',
      skeleton: `let text = ""
if text.___ {
    print("Empty")
}`,
      solution: `let text = ""
if text.isEmpty {
    print("Empty")
}`,
      hints: [
        'Use the `isEmpty` property.',
        'It returns true for empty strings.',
        'Prefer isEmpty over checking count == 0.',
      ],
      concepts: ['isEmpty', 'String-properties'],
    },
    {
      id: 'swift-str-4',
      title: 'Access First Character',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Access the first character of the string using String.Index.',
      skeleton: `let word = "Swift"
let first = word[word.___]`,
      solution: `let word = "Swift"
let first = word[word.startIndex]`,
      hints: [
        'Strings use String.Index, not integers.',
        'The first position is `startIndex`.',
        'Access with subscript: word[index].',
      ],
      concepts: ['String.Index', 'startIndex'],
    },
    {
      id: 'swift-str-5',
      title: 'String hasPrefix',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Check if a string starts with "Hello".',
      skeleton: `let text = "Hello, World!"
if text.___("Hello") {
    print("Starts with Hello")
}`,
      solution: `let text = "Hello, World!"
if text.hasPrefix("Hello") {
    print("Starts with Hello")
}`,
      hints: [
        'Use `hasPrefix` to check the start of a string.',
        'It takes a String argument.',
        'Returns a Bool.',
      ],
      concepts: ['hasPrefix'],
    },
    {
      id: 'swift-str-6',
      title: 'String Concatenation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Concatenate two strings using the + operator.',
      skeleton: `let first = "Hello"
let second = " World"
let combined = first ___ second`,
      solution: `let first = "Hello"
let second = " World"
let combined = first + second`,
      hints: [
        'Use the + operator to join strings.',
        'Both operands must be String type.',
        'The result is "Hello World".',
      ],
      concepts: ['string-concatenation'],
    },
    {
      id: 'swift-str-7',
      title: 'Reverse a String',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that reverses a string.',
      skeleton: `func reverseString(_ s: String) -> String {
    // Return the reversed string
}`,
      solution: `func reverseString(_ s: String) -> String {
    return String(s.reversed())
}`,
      hints: [
        'Strings have a `reversed()` method.',
        'reversed() returns a ReversedCollection.',
        'Wrap it in String() to get a String back.',
      ],
      concepts: ['reversed', 'String'],
    },
    {
      id: 'swift-str-8',
      title: 'Count Character Occurrences',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that counts how many times a Character appears in a String.',
      skeleton: `func countChar(_ s: String, _ c: Character) -> Int {
    // Count occurrences of c in s
}`,
      solution: `func countChar(_ s: String, _ c: Character) -> Int {
    return s.filter { $0 == c }.count
}`,
      hints: [
        'Use filter to keep only matching characters.',
        'Compare each character with ==.',
        'Return the count of the filtered result.',
      ],
      concepts: ['filter', 'Character', 'count'],
    },
    {
      id: 'swift-str-9',
      title: 'Capitalize First Letter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that capitalizes the first letter of a string.',
      skeleton: `func capitalizeFirst(_ s: String) -> String {
    // Capitalize only the first letter
}`,
      solution: `func capitalizeFirst(_ s: String) -> String {
    guard let first = s.first else { return s }
    return first.uppercased() + s.dropFirst()
}`,
      hints: [
        'Get the first character with s.first.',
        'Use uppercased() on the character.',
        'Append the rest with s.dropFirst().',
      ],
      concepts: ['first', 'uppercased', 'dropFirst'],
    },
    {
      id: 'swift-str-10',
      title: 'Check Palindrome',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that checks if a string is a palindrome (case-insensitive).',
      skeleton: `func isPalindrome(_ s: String) -> Bool {
    // Return true if s reads the same forwards and backwards
}`,
      solution: `func isPalindrome(_ s: String) -> Bool {
    let lower = s.lowercased()
    return lower == String(lower.reversed())
}`,
      hints: [
        'Convert to lowercase first for case-insensitivity.',
        'Compare the string with its reverse.',
        'Use reversed() and String() conversion.',
      ],
      concepts: ['reversed', 'lowercased', 'comparison'],
    },
    {
      id: 'swift-str-11',
      title: 'Extract Substring',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that returns the first n characters of a string.',
      skeleton: `func firstN(_ s: String, _ n: Int) -> String {
    // Return the first n characters
}`,
      solution: `func firstN(_ s: String, _ n: Int) -> String {
    return String(s.prefix(n))
}`,
      hints: [
        'Use the prefix() method.',
        'prefix(n) returns up to n characters.',
        'Wrap in String() for the return type.',
      ],
      concepts: ['prefix', 'Substring'],
    },
    {
      id: 'swift-str-12',
      title: 'Word Count Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that counts the number of words in a string (split by spaces).',
      skeleton: `func wordCount(_ s: String) -> Int {
    // Count words separated by spaces
}`,
      solution: `func wordCount(_ s: String) -> Int {
    return s.split(separator: " ").count
}`,
      hints: [
        'Use split(separator:) to divide the string.',
        'split ignores empty subsequences by default.',
        'Return the count of the resulting array.',
      ],
      concepts: ['split', 'count'],
    },
    {
      id: 'swift-str-13',
      title: 'Fix String Index Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the code to correctly access the second character.',
      skeleton: `let word = "Hello"
let second = word[1]
print(second)`,
      solution: `let word = "Hello"
let second = word[word.index(after: word.startIndex)]
print(second)`,
      hints: [
        'Strings cannot be indexed with integers.',
        'Use word.index(after: word.startIndex) for the second character.',
        'String indices require String.Index type.',
      ],
      concepts: ['String.Index', 'index-after'],
    },
    {
      id: 'swift-str-14',
      title: 'Fix Interpolation Syntax',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the string interpolation syntax.',
      skeleton: `let age = 25
let text = "I am $(age) years old"
print(text)`,
      solution: `let age = 25
let text = "I am \\(age) years old"
print(text)`,
      hints: [
        'Swift interpolation uses backslash, not dollar sign.',
        'The correct syntax is \\(expression).',
        'Replace $( with \\(.',
      ],
      concepts: ['string-interpolation'],
    },
    {
      id: 'swift-str-15',
      title: 'Fix String Mutation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code so the string can be appended to.',
      skeleton: `let message = "Hello"
message += " World"
print(message)`,
      solution: `var message = "Hello"
message += " World"
print(message)`,
      hints: [
        'let declares an immutable constant.',
        'To modify a string, use var.',
        'Change let to var.',
      ],
      concepts: ['var', 'string-mutation'],
    },
    {
      id: 'swift-str-16',
      title: 'Predict String Interpolation',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let x = 3
let y = 4
print("\\(x) + \\(y) = \\(x + y)")`,
      solution: `3 + 4 = 7`,
      hints: [
        'Each \\() is replaced with the expression value.',
        'x is 3, y is 4, x + y is 7.',
        'The entire expression is evaluated inside \\().',
      ],
      concepts: ['string-interpolation'],
    },
    {
      id: 'swift-str-17',
      title: 'Predict String Count',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let emoji = "Hello 🌍"
print(emoji.count)`,
      solution: `7`,
      hints: [
        'Swift counts Unicode grapheme clusters.',
        'The emoji counts as one character.',
        'H-e-l-l-o-space-emoji = 7.',
      ],
      concepts: ['count', 'Unicode'],
    },
    {
      id: 'swift-str-18',
      title: 'Predict hasPrefix Result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let path = "/usr/local/bin"
print(path.hasPrefix("/usr"))`,
      solution: `true`,
      hints: [
        'hasPrefix checks the start of the string.',
        '"/usr/local/bin" starts with "/usr".',
        'The result is true.',
      ],
      concepts: ['hasPrefix'],
    },
    {
      id: 'swift-str-19',
      title: 'Refactor String Building',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor the string concatenation to use string interpolation.',
      skeleton: `let name = "Alice"
let age = 30
let bio = name + " is " + String(age) + " years old."
print(bio)`,
      solution: `let name = "Alice"
let age = 30
let bio = "\\(name) is \\(age) years old."
print(bio)`,
      hints: [
        'String interpolation is cleaner than concatenation.',
        'Use \\(variable) inside the string.',
        'No need for String() conversion in interpolation.',
      ],
      concepts: ['string-interpolation', 'refactoring'],
    },
    {
      id: 'swift-str-20',
      title: 'Refactor to Use Higher-Order Methods',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor the loop to use filter and count.',
      skeleton: `let text = "Hello World"
var spaceCount = 0
for char in text {
    if char == " " {
        spaceCount += 1
    }
}
print(spaceCount)`,
      solution: `let text = "Hello World"
let spaceCount = text.filter { $0 == " " }.count
print(spaceCount)`,
      hints: [
        'Use filter to select matching characters.',
        'Then use count on the result.',
        'This replaces the manual loop.',
      ],
      concepts: ['filter', 'count', 'refactoring'],
    },
  ],
};
