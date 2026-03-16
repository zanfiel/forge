import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-str',
  title: '07. Strings',
  explanation: `## Strings in Go

Strings in Go are immutable sequences of bytes (usually UTF-8). The \`strings\` and \`strconv\` packages provide essential operations.

\`\`\`go
// String basics
s := "Hello, World"
length := len(s)         // byte count
r := []rune(s)           // convert to runes for character ops

// Multiline strings
raw := \\\`line one
line two\\\`

// strings package
strings.Contains(s, "World")
strings.HasPrefix(s, "Hello")
strings.Split("a,b,c", ",")
strings.Join([]string{"a","b"}, "-")
strings.Replace(s, "World", "Go", 1)
strings.ToUpper(s)
strings.TrimSpace("  hi  ")

// strconv -- string conversions
n, _ := strconv.Atoi("42")
s = strconv.Itoa(42)

// strings.Builder -- efficient concatenation
var b strings.Builder
b.WriteString("hello")
b.WriteString(" world")
result := b.String()

// fmt.Sprintf
msg := fmt.Sprintf("Hello, %s! You are %d.", name, age)
\`\`\``,
  exercises: [
    {
      id: 'go-str-1',
      title: 'String Contains',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Check if a string contains a substring.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "Hello, World!"
    fmt.Println(strings.__BLANK__(s, "World"))
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "Hello, World!"
    fmt.Println(strings.Contains(s, "World"))
}`,
      hints: [
        'The strings package has a Contains function.',
        'strings.Contains(s, substr) returns bool.',
        'strings.Contains(s, "World")',
      ],
      concepts: ['strings.Contains', 'substring search', 'strings package'],
    },
    {
      id: 'go-str-2',
      title: 'String Split and Join',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Split a CSV string and join it back with a different separator.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

func main() {
    csv := "apple,banana,cherry"
    parts := strings.__BLANK__(csv, ",")
    result := strings.__BLANK__(parts, " | ")
    fmt.Println(result)
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

func main() {
    csv := "apple,banana,cherry"
    parts := strings.Split(csv, ",")
    result := strings.Join(parts, " | ")
    fmt.Println(result)
}`,
      hints: [
        'strings.Split breaks a string by a separator.',
        'strings.Join combines a slice with a separator.',
        'Split and Join are inverse operations.',
      ],
      concepts: ['strings.Split', 'strings.Join', 'string transformation'],
    },
    {
      id: 'go-str-3',
      title: 'String Replace',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Replace all occurrences of a substring.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "foo bar foo baz foo"
    result := strings.__BLANK__(s, "foo", "qux", __BLANK__)
    fmt.Println(result) // "qux bar qux baz qux"
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "foo bar foo baz foo"
    result := strings.Replace(s, "foo", "qux", -1)
    fmt.Println(result) // "qux bar qux baz qux"
}`,
      hints: [
        'strings.Replace(s, old, new, n) replaces up to n occurrences.',
        'Use -1 to replace all occurrences.',
        'strings.Replace(s, "foo", "qux", -1)',
      ],
      concepts: ['strings.Replace', 'string substitution', 'replace all'],
    },
    {
      id: 'go-str-4',
      title: 'String to Int',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Convert a string to an integer using strconv.',
      skeleton: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    s := "42"
    n, err := strconv.__BLANK__(s)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println(n * 2)
}`,
      solution: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    s := "42"
    n, err := strconv.Atoi(s)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println(n * 2)
}`,
      hints: [
        'strconv.Atoi converts a string to an int.',
        'It returns the integer and an error.',
        'Atoi stands for "ASCII to integer".',
      ],
      concepts: ['strconv.Atoi', 'string conversion', 'error handling'],
    },
    {
      id: 'go-str-5',
      title: 'Strings Builder',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use strings.Builder for efficient string concatenation.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

func main() {
    var b strings.__BLANK__
    for i := 0; i < 5; i++ {
        b.__BLANK__(fmt.Sprintf("item%d ", i))
    }
    fmt.Println(b.String())
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

func main() {
    var b strings.Builder
    for i := 0; i < 5; i++ {
        b.WriteString(fmt.Sprintf("item%d ", i))
    }
    fmt.Println(b.String())
}`,
      hints: [
        'strings.Builder is the efficient way to build strings.',
        'Use WriteString to append strings.',
        'Call String() to get the final result.',
      ],
      concepts: ['strings.Builder', 'efficient concatenation', 'WriteString'],
    },
    {
      id: 'go-str-6',
      title: 'Rune Iteration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Iterate over runes in a string with Unicode characters.',
      skeleton: `package main

import "fmt"

func main() {
    s := "Go\\u8bed\\u8a00"  // "Go" + Chinese characters
    for _, __BLANK__ := range s {
        fmt.Printf("%c ", r)
    }
}`,
      solution: `package main

import "fmt"

func main() {
    s := "Go\\u8bed\\u8a00"
    for _, r := range s {
        fmt.Printf("%c ", r)
    }
}`,
      hints: [
        'Range over a string yields index and rune (not byte).',
        'Use a rune variable to capture each character.',
        '%c format verb prints a rune as a character.',
      ],
      concepts: ['rune iteration', 'range over string', 'Unicode'],
    },
    {
      id: 'go-str-7',
      title: 'Predict String Byte Length',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the byte length vs rune count of a UTF-8 string.',
      skeleton: `package main

import (
    "fmt"
    "unicode/utf8"
)

func main() {
    s := "cafe\\u0301"
    fmt.Println(len(s))
    fmt.Println(utf8.RuneCountInString(s))
}`,
      solution: `6
5`,
      hints: [
        'len() returns byte count, not character count.',
        '"cafe" is 4 bytes, the combining accent is 2 bytes UTF-8.',
        'RuneCountInString counts Unicode code points.',
      ],
      concepts: ['byte length', 'rune count', 'UTF-8 encoding'],
    },
    {
      id: 'go-str-8',
      title: 'Reverse a String',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that reverses a string, handling Unicode correctly.',
      skeleton: `package main

import "fmt"

func reverseString(s string) string {
    // Reverse the string handling multi-byte runes
}

func main() {
    fmt.Println(reverseString("Hello"))   // "olleH"
    fmt.Println(reverseString("Go\\u8bed\\u8a00")) // Reversed correctly
}`,
      solution: `package main

import "fmt"

func reverseString(s string) string {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}

func main() {
    fmt.Println(reverseString("Hello"))
    fmt.Println(reverseString("Go\\u8bed\\u8a00"))
}`,
      hints: [
        'Convert to []rune first to handle multi-byte characters.',
        'Reverse the rune slice using two pointers.',
        'Convert back to string with string(runes).',
      ],
      concepts: ['string reversal', 'rune conversion', 'Unicode safe'],
    },
    {
      id: 'go-str-9',
      title: 'Is Palindrome',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function to check if a string is a palindrome (case-insensitive).',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

func isPalindrome(s string) bool {
    // Check if s reads the same forwards and backwards (case-insensitive)
}

func main() {
    fmt.Println(isPalindrome("Racecar")) // true
    fmt.Println(isPalindrome("Hello"))    // false
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

func isPalindrome(s string) bool {
    s = strings.ToLower(s)
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        if runes[i] != runes[j] {
            return false
        }
    }
    return true
}

func main() {
    fmt.Println(isPalindrome("Racecar")) // true
    fmt.Println(isPalindrome("Hello"))    // false
}`,
      hints: [
        'Convert to lowercase first for case-insensitive comparison.',
        'Convert to rune slice and compare from both ends.',
        'Return false on first mismatch.',
      ],
      concepts: ['palindrome', 'string comparison', 'two pointers'],
    },
    {
      id: 'go-str-10',
      title: 'Title Case',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that capitalizes the first letter of each word.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

func titleCase(s string) string {
    // Capitalize first letter of each word
}

func main() {
    fmt.Println(titleCase("hello world foo bar")) // "Hello World Foo Bar"
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

func titleCase(s string) string {
    words := strings.Fields(s)
    for i, w := range words {
        if len(w) > 0 {
            words[i] = strings.ToUpper(w[:1]) + w[1:]
        }
    }
    return strings.Join(words, " ")
}

func main() {
    fmt.Println(titleCase("hello world foo bar")) // "Hello World Foo Bar"
}`,
      hints: [
        'Split the string into words with strings.Fields.',
        'Capitalize the first character of each word.',
        'Join back with strings.Join.',
      ],
      concepts: ['title case', 'strings.Fields', 'string manipulation'],
    },
    {
      id: 'go-str-11',
      title: 'Fix String Mutation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the attempt to mutate an immutable string.',
      skeleton: `package main

import "fmt"

func main() {
    s := "hello"
    s[0] = 'H'  // cannot assign to s[0]
    fmt.Println(s)
}`,
      solution: `package main

import "fmt"

func main() {
    s := "hello"
    b := []byte(s)
    b[0] = 'H'
    s = string(b)
    fmt.Println(s)
}`,
      hints: [
        'Strings in Go are immutable -- you cannot modify individual bytes.',
        'Convert to []byte, modify, then convert back to string.',
        '[]byte(s) creates a mutable copy.',
      ],
      concepts: ['string immutability', 'byte slice conversion', 'mutation'],
    },
    {
      id: 'go-str-12',
      title: 'Fix Concatenation Performance',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix inefficient string concatenation in a loop.',
      skeleton: `package main

import "fmt"

func repeat(s string, n int) string {
    result := ""
    for i := 0; i < n; i++ {
        result += s  // O(n^2) -- creates new string each iteration
    }
    return result
}

func main() {
    fmt.Println(repeat("Go", 5))
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

func repeat(s string, n int) string {
    var b strings.Builder
    for i := 0; i < n; i++ {
        b.WriteString(s)
    }
    return b.String()
}

func main() {
    fmt.Println(repeat("Go", 5))
}`,
      hints: [
        'String concatenation with += creates a new string each time.',
        'Use strings.Builder for O(n) performance.',
        'WriteString appends to an internal buffer.',
      ],
      concepts: ['string concatenation', 'strings.Builder', 'performance'],
    },
    {
      id: 'go-str-13',
      title: 'Multiline String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Create a multiline string using raw string literals.',
      skeleton: `package main

import "fmt"

func main() {
    query := __BLANK__SELECT *
FROM users
WHERE active = true__BLANK__
    fmt.Println(query)
}`,
      solution: `package main

import "fmt"

func main() {
    query := \`SELECT *
FROM users
WHERE active = true\`
    fmt.Println(query)
}`,
      hints: [
        'Raw string literals use backticks (`).',
        'They preserve newlines and do not interpret escape sequences.',
        'Backtick strings are ideal for multi-line content.',
      ],
      concepts: ['raw string literal', 'multiline string', 'backtick'],
    },
    {
      id: 'go-str-14',
      title: 'Predict Printf',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the output of various Printf format verbs.',
      skeleton: `package main

import "fmt"

func main() {
    fmt.Printf("%d %05d %x\\n", 42, 42, 255)
}`,
      solution: `42 00042 ff`,
      hints: [
        '%d prints decimal integer.',
        '%05d pads with zeros to width 5.',
        '%x prints hexadecimal (lowercase).',
      ],
      concepts: ['Printf', 'format verbs', 'padding'],
    },
    {
      id: 'go-str-15',
      title: 'Predict String Comparison',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the result of string comparison operators.',
      skeleton: `package main

import "fmt"

func main() {
    fmt.Println("apple" < "banana")
    fmt.Println("go" == "Go")
    fmt.Println("abc" < "abd")
}`,
      solution: `true
false
true`,
      hints: [
        'Strings are compared lexicographically (byte by byte).',
        'Comparison is case-sensitive.',
        '"abc" < "abd" because c < d.',
      ],
      concepts: ['string comparison', 'lexicographic order', 'case sensitivity'],
    },
    {
      id: 'go-str-16',
      title: 'Count Characters',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a function that counts occurrences of a character in a string.',
      skeleton: `package main

import "fmt"

func countChar(s string, c rune) int {
    // Count how many times rune c appears in s
}

func main() {
    fmt.Println(countChar("mississippi", 's')) // 4
}`,
      solution: `package main

import "fmt"

func countChar(s string, c rune) int {
    count := 0
    for _, r := range s {
        if r == c {
            count++
        }
    }
    return count
}

func main() {
    fmt.Println(countChar("mississippi", 's')) // 4
}`,
      hints: [
        'Iterate over the string with range to get runes.',
        'Compare each rune to the target character.',
        'Increment a counter on match.',
      ],
      concepts: ['character counting', 'rune comparison', 'range'],
    },
    {
      id: 'go-str-17',
      title: 'Truncate String',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that truncates a string to n runes, adding "..." if truncated.',
      skeleton: `package main

import "fmt"

func truncate(s string, maxRunes int) string {
    // Truncate to maxRunes and add "..." if the string was longer
}

func main() {
    fmt.Println(truncate("Hello, World!", 5))  // "Hello..."
    fmt.Println(truncate("Hi", 5))             // "Hi"
}`,
      solution: `package main

import "fmt"

func truncate(s string, maxRunes int) string {
    runes := []rune(s)
    if len(runes) <= maxRunes {
        return s
    }
    return string(runes[:maxRunes]) + "..."
}

func main() {
    fmt.Println(truncate("Hello, World!", 5))  // "Hello..."
    fmt.Println(truncate("Hi", 5))             // "Hi"
}`,
      hints: [
        'Convert to runes to handle multi-byte characters correctly.',
        'Compare rune count to maxRunes.',
        'Slice the rune array and add "..." if truncated.',
      ],
      concepts: ['string truncation', 'rune slicing', 'Unicode safe'],
    },
    {
      id: 'go-str-18',
      title: 'Fix Byte Index Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the bug where byte indexing mishandles multi-byte characters.',
      skeleton: `package main

import "fmt"

func firstNChars(s string, n int) string {
    // Bug: byte slicing breaks multi-byte characters
    return s[:n]
}

func main() {
    fmt.Println(firstNChars("cafe\\u0301", 5)) // Should get 5 chars cleanly
}`,
      solution: `package main

import "fmt"

func firstNChars(s string, n int) string {
    runes := []rune(s)
    if n > len(runes) {
        return s
    }
    return string(runes[:n])
}

func main() {
    fmt.Println(firstNChars("cafe\\u0301", 5))
}`,
      hints: [
        's[:n] slices by bytes, not characters.',
        'Convert to []rune first for character-level slicing.',
        'Always use rune slicing for Unicode-safe operations.',
      ],
      concepts: ['byte vs rune indexing', 'Unicode safety', 'string slicing'],
    },
    {
      id: 'go-str-19',
      title: 'Refactor String Concatenation',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor manual string building to use fmt.Sprintf.',
      skeleton: `package main

import (
    "fmt"
    "strconv"
)

func formatUser(name string, age int, score float64) string {
    return "Name: " + name + ", Age: " + strconv.Itoa(age) + ", Score: " + strconv.FormatFloat(score, 'f', 1, 64)
}

func main() {
    fmt.Println(formatUser("Alice", 30, 95.5))
}`,
      solution: `package main

import "fmt"

func formatUser(name string, age int, score float64) string {
    return fmt.Sprintf("Name: %s, Age: %d, Score: %.1f", name, age, score)
}

func main() {
    fmt.Println(formatUser("Alice", 30, 95.5))
}`,
      hints: [
        'fmt.Sprintf is cleaner than manual concatenation with strconv.',
        'Use %s for strings, %d for integers, %.1f for floats.',
        'It is more readable and less error-prone.',
      ],
      concepts: ['fmt.Sprintf', 'format strings', 'refactoring'],
    },
    {
      id: 'go-str-20',
      title: 'Refactor to strings.Map',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor a manual character filter to use strings.Map.',
      skeleton: `package main

import (
    "fmt"
    "unicode"
)

func removeDigits(s string) string {
    result := make([]rune, 0, len(s))
    for _, r := range s {
        if !unicode.IsDigit(r) {
            result = append(result, r)
        }
    }
    return string(result)
}

func main() {
    fmt.Println(removeDigits("h3llo w0rld 123"))
}`,
      solution: `package main

import (
    "fmt"
    "strings"
    "unicode"
)

func removeDigits(s string) string {
    return strings.Map(func(r rune) rune {
        if unicode.IsDigit(r) {
            return -1
        }
        return r
    }, s)
}

func main() {
    fmt.Println(removeDigits("h3llo w0rld 123"))
}`,
      hints: [
        'strings.Map applies a function to every rune in a string.',
        'Return -1 from the mapping function to drop a rune.',
        'This is more idiomatic than manual rune slice building.',
      ],
      concepts: ['strings.Map', 'rune filtering', 'functional style'],
    },
  ],
};
