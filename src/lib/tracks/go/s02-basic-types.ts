import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-types',
  title: '02. Basic Types',
  explanation: `## Basic Types in Go

Go has a rich set of built-in types for numbers, text, and booleans.

\`\`\`go
// Integer types
var i int       = 42       // platform-dependent size (32 or 64 bit)
var i8 int8     = 127      // -128 to 127
var u8 uint8    = 255      // 0 to 255 (alias: byte)

// Floating-point types
var f32 float32 = 3.14
var f64 float64 = 3.141592653589793

// Boolean
var b bool = true

// String and character types
var s string = "hello"
var by byte  = 'A'         // alias for uint8
var r rune   = '\\u4e16'    // alias for int32 (Unicode code point)

// Complex numbers
var c complex128 = 3 + 4i

// Type conversion (explicit, never implicit)
f := float64(42)
n := int(3.14)  // truncates to 3

// Type alias vs defined type
type Celsius float64       // defined type -- new type
type MyFloat = float64     // alias -- same type
\`\`\`

Go never performs implicit type conversions. You must explicitly convert between types.`,
  exercises: [
    {
      id: 'go-types-1',
      title: 'Integer Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fill in the blank to declare a variable of type int with value 100.',
      skeleton: `package main

import "fmt"

func main() {
    var count __BLANK__ = 100
    fmt.Println(count)
}`,
      solution: `package main

import "fmt"

func main() {
    var count int = 100
    fmt.Println(count)
}`,
      hints: [
        'The basic integer type in Go is int.',
        'Declare as: var count int = 100.',
        'int size is platform-dependent (32 or 64 bits).',
      ],
      concepts: ['int type', 'variable declaration', 'integer literals'],
    },
    {
      id: 'go-types-2',
      title: 'Float64 Arithmetic',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Convert an int to float64 to perform division correctly.',
      skeleton: `package main

import "fmt"

func main() {
    a := 7
    b := 2
    result := __BLANK__(a) / __BLANK__(b)
    fmt.Println(result) // 3.5
}`,
      solution: `package main

import "fmt"

func main() {
    a := 7
    b := 2
    result := float64(a) / float64(b)
    fmt.Println(result) // 3.5
}`,
      hints: [
        'Integer division in Go truncates. You need floating-point division.',
        'Convert both operands to float64 before dividing.',
        'Use float64(a) and float64(b).',
      ],
      concepts: ['type conversion', 'float64', 'integer division'],
    },
    {
      id: 'go-types-3',
      title: 'Boolean Logic',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fill in the boolean operators to complete the logic.',
      skeleton: `package main

import "fmt"

func main() {
    a := true
    b := false
    fmt.Println(a __BLANK__ b)  // true (logical OR)
    fmt.Println(a __BLANK__ b)  // false (logical AND)
    fmt.Println(__BLANK__b)     // true (logical NOT)
}`,
      solution: `package main

import "fmt"

func main() {
    a := true
    b := false
    fmt.Println(a || b)  // true (logical OR)
    fmt.Println(a && b)  // false (logical AND)
    fmt.Println(!b)      // true (logical NOT)
}`,
      hints: [
        'Logical OR is ||, AND is &&, NOT is !.',
        'true || false = true, true && false = false.',
        '!false = true.',
      ],
      concepts: ['boolean operators', 'logical OR', 'logical AND', 'logical NOT'],
    },
    {
      id: 'go-types-4',
      title: 'Rune vs Byte',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the types and values of a byte and rune.',
      skeleton: `package main

import "fmt"

func main() {
    var b byte = 'A'
    var r rune = 'A'
    fmt.Printf("%T %T\\n", b, r)
    fmt.Printf("%d %d\\n", b, r)
}`,
      solution: `uint8 int32
65 65`,
      hints: [
        'byte is an alias for uint8, rune is an alias for int32.',
        'Both hold the ASCII value of A which is 65.',
        'The types print differently but the numeric values are the same.',
      ],
      concepts: ['byte', 'rune', 'type aliases', 'ASCII'],
    },
    {
      id: 'go-types-5',
      title: 'String to Bytes',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Convert a string to a byte slice.',
      skeleton: `package main

import "fmt"

func main() {
    s := "Go"
    b := __BLANK__(s)
    fmt.Println(b) // [71 111]
}`,
      solution: `package main

import "fmt"

func main() {
    s := "Go"
    b := []byte(s)
    fmt.Println(b) // [71 111]
}`,
      hints: [
        'You can convert a string to a slice of bytes.',
        'Use []byte(s) to convert string s to a byte slice.',
        'Each character becomes its ASCII/UTF-8 byte value.',
      ],
      concepts: ['string to bytes', 'type conversion', 'byte slice'],
    },
    {
      id: 'go-types-6',
      title: 'Complex Numbers',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create a complex number and extract its real and imaginary parts.',
      skeleton: `package main

import "fmt"

func main() {
    c := __BLANK__(3, 4)
    fmt.Println(real(c), __BLANK__(c))
}`,
      solution: `package main

import "fmt"

func main() {
    c := complex(3, 4)
    fmt.Println(real(c), imag(c))
}`,
      hints: [
        'Use the complex() built-in to create a complex number.',
        'Use real() to get the real part.',
        'Use imag() to get the imaginary part.',
      ],
      concepts: ['complex numbers', 'complex built-in', 'real', 'imag'],
    },
    {
      id: 'go-types-7',
      title: 'Truncation on Conversion',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict what happens when a float is converted to int.',
      skeleton: `package main

import "fmt"

func main() {
    f := 3.99
    n := int(f)
    fmt.Println(n)
}`,
      solution: `3`,
      hints: [
        'Converting float to int in Go truncates toward zero.',
        'It does not round -- it simply drops the decimal portion.',
        '3.99 becomes 3, not 4.',
      ],
      concepts: ['type conversion', 'truncation', 'float to int'],
    },
    {
      id: 'go-types-8',
      title: 'Write Absolute Value',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a function that returns the absolute value of a float64.',
      skeleton: `package main

import "fmt"

func abs(x float64) float64 {
    // Return the absolute value of x
}

func main() {
    fmt.Println(abs(-3.14))  // 3.14
    fmt.Println(abs(2.71))   // 2.71
}`,
      solution: `package main

import "fmt"

func abs(x float64) float64 {
    if x < 0 {
        return -x
    }
    return x
}

func main() {
    fmt.Println(abs(-3.14))  // 3.14
    fmt.Println(abs(2.71))   // 2.71
}`,
      hints: [
        'Check if x is negative using an if statement.',
        'If negative, return -x to make it positive.',
        'Otherwise return x as-is.',
      ],
      concepts: ['float64', 'conditional logic', 'absolute value'],
    },
    {
      id: 'go-types-9',
      title: 'Defined Type Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create a defined type Celsius and a method to convert it to Fahrenheit.',
      skeleton: `package main

import "fmt"

type Celsius float64

// Add a ToFahrenheit method that returns float64

func main() {
    temp := Celsius(100)
    fmt.Printf("%.1f\\n", temp.ToFahrenheit()) // 212.0
}`,
      solution: `package main

import "fmt"

type Celsius float64

func (c Celsius) ToFahrenheit() float64 {
    return float64(c)*9/5 + 32
}

func main() {
    temp := Celsius(100)
    fmt.Printf("%.1f\\n", temp.ToFahrenheit()) // 212.0
}`,
      hints: [
        'A defined type can have methods attached to it.',
        'Use the formula: F = C * 9/5 + 32.',
        'func (c Celsius) ToFahrenheit() float64 { return float64(c)*9/5 + 32 }',
      ],
      concepts: ['defined types', 'methods', 'type conversion'],
    },
    {
      id: 'go-types-10',
      title: 'Overflow Detection',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the result of integer overflow with uint8.',
      skeleton: `package main

import "fmt"

func main() {
    var x uint8 = 255
    x++
    fmt.Println(x)
}`,
      solution: `0`,
      hints: [
        'uint8 can hold values from 0 to 255.',
        'When you increment 255, it wraps around.',
        '255 + 1 overflows to 0 for unsigned integers.',
      ],
      concepts: ['integer overflow', 'uint8', 'wraparound'],
    },
    {
      id: 'go-types-11',
      title: 'String Length vs Rune Count',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that returns both the byte length and rune count of a string.',
      skeleton: `package main

import (
    "fmt"
    "unicode/utf8"
)

func lengths(s string) (int, int) {
    // Return byte length and rune count
}

func main() {
    b, r := lengths("Hello, 世界")
    fmt.Println(b, r) // 13 9
}`,
      solution: `package main

import (
    "fmt"
    "unicode/utf8"
)

func lengths(s string) (int, int) {
    return len(s), utf8.RuneCountInString(s)
}

func main() {
    b, r := lengths("Hello, 世界")
    fmt.Println(b, r) // 13 9
}`,
      hints: [
        'len(s) returns byte count, not character count.',
        'utf8.RuneCountInString(s) returns the number of runes (characters).',
        'Multi-byte characters like Chinese characters take 3 bytes each in UTF-8.',
      ],
      concepts: ['string length', 'rune count', 'UTF-8', 'unicode/utf8'],
    },
    {
      id: 'go-types-12',
      title: 'Fix Type Mismatch',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the type mismatch error when adding an int and float64.',
      skeleton: `package main

import "fmt"

func main() {
    x := 10
    y := 3.14
    sum := x + y
    fmt.Println(sum)
}`,
      solution: `package main

import "fmt"

func main() {
    x := 10
    y := 3.14
    sum := float64(x) + y
    fmt.Println(sum)
}`,
      hints: [
        'Go does not allow implicit type conversion between int and float64.',
        'You must explicitly convert one type to match the other.',
        'Convert x to float64: float64(x) + y.',
      ],
      concepts: ['type mismatch', 'explicit conversion', 'int to float64'],
    },
    {
      id: 'go-types-13',
      title: 'Fix Defined Type Assignment',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the error when assigning a float64 to a defined type.',
      skeleton: `package main

import "fmt"

type Meters float64

func main() {
    var distance float64 = 100.0
    var m Meters = distance
    fmt.Println(m)
}`,
      solution: `package main

import "fmt"

type Meters float64

func main() {
    var distance float64 = 100.0
    var m Meters = Meters(distance)
    fmt.Println(m)
}`,
      hints: [
        'A defined type is a distinct type even if the underlying type is the same.',
        'You cannot directly assign float64 to Meters without conversion.',
        'Use Meters(distance) to convert.',
      ],
      concepts: ['defined types', 'type identity', 'explicit conversion'],
    },
    {
      id: 'go-types-14',
      title: 'Rune Iteration',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that counts vowels in a string using rune iteration.',
      skeleton: `package main

import "fmt"

func countVowels(s string) int {
    // Count a, e, i, o, u (lowercase) using range to iterate runes
}

func main() {
    fmt.Println(countVowels("hello world")) // 3
}`,
      solution: `package main

import "fmt"

func countVowels(s string) int {
    count := 0
    for _, r := range s {
        switch r {
        case 'a', 'e', 'i', 'o', 'u':
            count++
        }
    }
    return count
}

func main() {
    fmt.Println(countVowels("hello world")) // 3
}`,
      hints: [
        'Use for _, r := range s to iterate over runes in a string.',
        'Use a switch statement to check for vowel characters.',
        'Increment a counter for each vowel found.',
      ],
      concepts: ['rune iteration', 'range over string', 'switch statement'],
    },
    {
      id: 'go-types-15',
      title: 'Type Alias Behavior',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Predict whether a type alias and the original type are interchangeable.',
      skeleton: `package main

import "fmt"

type MyInt = int

func double(n int) int {
    return n * 2
}

func main() {
    var x MyInt = 5
    fmt.Println(double(x))
}`,
      solution: `10`,
      hints: [
        'A type alias (=) creates another name for the same type.',
        'MyInt = int means MyInt IS int, not a new type.',
        'You can pass MyInt directly to a function expecting int.',
      ],
      concepts: ['type alias', 'type identity', 'interchangeability'],
    },
    {
      id: 'go-types-16',
      title: 'Max of Two Integers',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a function that returns the larger of two integers.',
      skeleton: `package main

import "fmt"

func max(a, b int) int {
    // Return the larger of a and b
}

func main() {
    fmt.Println(max(10, 20)) // 20
    fmt.Println(max(30, 5))  // 30
}`,
      solution: `package main

import "fmt"

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func main() {
    fmt.Println(max(10, 20)) // 20
    fmt.Println(max(30, 5))  // 30
}`,
      hints: [
        'Compare the two values using an if statement.',
        'Return a if a > b, otherwise return b.',
        'Go does not have a built-in max function for integers (prior to Go 1.21).',
      ],
      concepts: ['comparison', 'conditional return', 'int type'],
    },
    {
      id: 'go-types-17',
      title: 'Byte to String',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that builds a string from a byte slice by shifting each byte by 1.',
      skeleton: `package main

import "fmt"

func shiftBytes(data []byte) string {
    // Add 1 to each byte and return the result as a string
}

func main() {
    data := []byte{71, 110, 111, 103, 103, 100, 113}
    fmt.Println(shiftBytes(data)) // "Hopper"
}`,
      solution: `package main

import "fmt"

func shiftBytes(data []byte) string {
    result := make([]byte, len(data))
    for i, b := range data {
        result[i] = b + 1
    }
    return string(result)
}

func main() {
    data := []byte{71, 110, 111, 103, 103, 100, 113}
    fmt.Println(shiftBytes(data)) // "Hopper"
}`,
      hints: [
        'Create a new byte slice to store the shifted values.',
        'Add 1 to each byte value.',
        'Convert the byte slice to string with string(result).',
      ],
      concepts: ['byte manipulation', 'byte to string', 'slice operations'],
    },
    {
      id: 'go-types-18',
      title: 'Refactor Type Assertions',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor repeated type conversions into a helper function.',
      skeleton: `package main

import "fmt"

func main() {
    a := 10
    b := 20
    c := 30

    fa := float64(a) / 3.0
    fb := float64(b) / 3.0
    fc := float64(c) / 3.0

    fmt.Printf("%.2f %.2f %.2f\\n", fa, fb, fc)
}`,
      solution: `package main

import "fmt"

func divThird(n int) float64 {
    return float64(n) / 3.0
}

func main() {
    a := 10
    b := 20
    c := 30

    fmt.Printf("%.2f %.2f %.2f\\n", divThird(a), divThird(b), divThird(c))
}`,
      hints: [
        'Extract the repeated pattern into a helper function.',
        'The function should take an int, convert to float64, and divide by 3.',
        'Replace all three conversions with calls to the helper.',
      ],
      concepts: ['refactoring', 'helper functions', 'DRY principle'],
    },
    {
      id: 'go-types-19',
      title: 'Refactor to Named Types',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor raw float64 values into named types for type safety.',
      skeleton: `package main

import "fmt"

func calculateBMI(weightKg float64, heightM float64) float64 {
    return weightKg / (heightM * heightM)
}

func main() {
    bmi := calculateBMI(70.0, 1.75)
    fmt.Printf("BMI: %.1f\\n", bmi)
}`,
      solution: `package main

import "fmt"

type Kilograms float64
type Meters float64
type BMI float64

func calculateBMI(weight Kilograms, height Meters) BMI {
    return BMI(float64(weight) / (float64(height) * float64(height)))
}

func main() {
    bmi := calculateBMI(Kilograms(70.0), Meters(1.75))
    fmt.Printf("BMI: %.1f\\n", bmi)
}`,
      hints: [
        'Create defined types like Kilograms and Meters for type safety.',
        'This prevents accidentally passing weight where height is expected.',
        'Use explicit conversions inside the function body.',
      ],
      concepts: ['defined types', 'type safety', 'domain modeling'],
    },
    {
      id: 'go-types-20',
      title: 'Fix Rune Comparison',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the bug where string indexing returns a byte instead of a rune.',
      skeleton: `package main

import "fmt"

func main() {
    s := "cafe\u0301" // "cafe" + combining accent = "cafe\u0301"
    // Bug: comparing byte to rune
    if s[4] == '\u0301' {
        fmt.Println("found accent")
    } else {
        fmt.Println("not found")
    }
}`,
      solution: `package main

import "fmt"

func main() {
    s := "cafe\u0301"
    for _, r := range s {
        if r == '\u0301' {
            fmt.Println("found accent")
            return
        }
    }
    fmt.Println("not found")
}`,
      hints: [
        'String indexing with s[i] returns a byte, not a rune.',
        'Multi-byte characters cannot be found with byte indexing.',
        'Use range to iterate runes and compare with the target rune.',
      ],
      concepts: ['rune vs byte', 'string indexing', 'Unicode', 'range iteration'],
    },
  ],
};
