import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-var',
  title: '01. Variables',
  explanation: `## Variables in Go

Go provides several ways to declare and initialize variables. The \`var\` keyword offers explicit declarations, while \`:=\` gives short, concise initialization inside functions.

\`\`\`go
// var keyword -- explicit declaration
var name string = "Alice"
var age int      // zero value: 0

// Short declaration -- type inferred
count := 42

// Multiple assignment
x, y := 10, 20

// Constants
const Pi = 3.14159

// iota -- auto-incrementing constant generator
const (
    Red   = iota // 0
    Green        // 1
    Blue         // 2
)

// Blank identifier -- discard unwanted values
_, err := fmt.Println("hello")
\`\`\`

Every declared variable in Go must be used or the compiler will reject the program. Zero values ensure variables are always initialized: \`0\` for numbers, \`""\` for strings, \`false\` for bools, and \`nil\` for pointers/slices/maps.`,
  exercises: [
    {
      id: 'go-var-1',
      title: 'Declare with var',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fill in the blanks to declare a string variable with an initial value.',
      skeleton: `package main

import "fmt"

func main() {
    __BLANK__ greeting __BLANK__ = "Hello, Go!"
    fmt.Println(greeting)
}`,
      solution: `package main

import "fmt"

func main() {
    var greeting string = "Hello, Go!"
    fmt.Println(greeting)
}`,
      hints: [
        'Use the var keyword to declare a variable explicitly.',
        'The type goes between the variable name and the equals sign.',
        'var greeting string = "Hello, Go!"',
      ],
      concepts: ['var keyword', 'string type', 'variable declaration'],
    },
    {
      id: 'go-var-2',
      title: 'Short Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use short variable declaration to create and initialize an integer.',
      skeleton: `package main

import "fmt"

func main() {
    age __BLANK__ 25
    fmt.Println(age)
}`,
      solution: `package main

import "fmt"

func main() {
    age := 25
    fmt.Println(age)
}`,
      hints: [
        'Short declaration uses a special operator that combines declaration and assignment.',
        'The operator is colon followed by equals.',
        'age := 25',
      ],
      concepts: ['short declaration', ':= operator', 'type inference'],
    },
    {
      id: 'go-var-3',
      title: 'Multiple Assignment',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Declare two variables in one statement using short declaration.',
      skeleton: `package main

import "fmt"

func main() {
    x, y __BLANK__ 10, 20
    fmt.Println(x + y)
}`,
      solution: `package main

import "fmt"

func main() {
    x, y := 10, 20
    fmt.Println(x + y)
}`,
      hints: [
        'Multiple variables can be declared on one line with short declaration.',
        'Separate variable names with a comma on the left, values with a comma on the right.',
        'x, y := 10, 20',
      ],
      concepts: ['multiple assignment', 'short declaration', 'comma separated values'],
    },
    {
      id: 'go-var-4',
      title: 'Zero Values',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the zero values printed for each uninitialized variable.',
      skeleton: `package main

import "fmt"

func main() {
    var i int
    var f float64
    var b bool
    var s string
    fmt.Printf("%d %g %t %q\\n", i, f, b, s)
}`,
      solution: `0 0 false ""`,
      hints: [
        'Go assigns zero values to uninitialized variables automatically.',
        'int zero is 0, float64 zero is 0, bool zero is false.',
        'string zero value is the empty string "".',
      ],
      concepts: ['zero values', 'default initialization', 'Printf formatting'],
    },
    {
      id: 'go-var-5',
      title: 'Constants with const',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Declare a constant and use it in a calculation.',
      skeleton: `package main

import "fmt"

func main() {
    __BLANK__ Pi = 3.14159
    radius := 5.0
    area := Pi * radius * radius
    fmt.Printf("Area: %.2f\\n", area)
}`,
      solution: `package main

import "fmt"

func main() {
    const Pi = 3.14159
    radius := 5.0
    area := Pi * radius * radius
    fmt.Printf("Area: %.2f\\n", area)
}`,
      hints: [
        'Constants in Go are declared with a specific keyword.',
        'The keyword is const, and you do not need to specify a type for untyped constants.',
        'const Pi = 3.14159',
      ],
      concepts: ['constants', 'const keyword', 'untyped constants'],
    },
    {
      id: 'go-var-6',
      title: 'Iota Enumerations',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use iota to create auto-incrementing constants starting from 0.',
      skeleton: `package main

import "fmt"

const (
    Sunday    = __BLANK__
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
)

func main() {
    fmt.Println(Sunday, Wednesday, Saturday)
}`,
      solution: `package main

import "fmt"

const (
    Sunday    = iota
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
)

func main() {
    fmt.Println(Sunday, Wednesday, Saturday)
}`,
      hints: [
        'iota is a special constant generator that auto-increments in const blocks.',
        'The first constant is assigned iota (value 0), subsequent ones auto-increment.',
        'Sunday = iota gives Sunday=0, Monday=1, Tuesday=2, etc.',
      ],
      concepts: ['iota', 'const block', 'enumeration'],
    },
    {
      id: 'go-var-7',
      title: 'Blank Identifier',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use the blank identifier to discard the index in a range loop.',
      skeleton: `package main

import "fmt"

func main() {
    names := []string{"Alice", "Bob", "Carol"}
    for __BLANK__, name := range names {
        fmt.Println(name)
    }
}`,
      solution: `package main

import "fmt"

func main() {
    names := []string{"Alice", "Bob", "Carol"}
    for _, name := range names {
        fmt.Println(name)
    }
}`,
      hints: [
        'Go requires you to use every declared variable.',
        'The blank identifier is an underscore character.',
        'Use _ to discard the index: for _, name := range names',
      ],
      concepts: ['blank identifier', 'unused variables', 'range loop'],
    },
    {
      id: 'go-var-8',
      title: 'Swap Two Variables',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a function that swaps two integers using multiple return values.',
      skeleton: `package main

import "fmt"

func swap(a, b int) (int, int) {
    // Return b first, then a
}

func main() {
    x, y := swap(1, 2)
    fmt.Println(x, y) // 2 1
}`,
      solution: `package main

import "fmt"

func swap(a, b int) (int, int) {
    return b, a
}

func main() {
    x, y := swap(1, 2)
    fmt.Println(x, y) // 2 1
}`,
      hints: [
        'Go functions can return multiple values.',
        'Simply return the parameters in reversed order.',
        'return b, a',
      ],
      concepts: ['multiple return values', 'function parameters', 'variable swapping'],
    },
    {
      id: 'go-var-9',
      title: 'Type Inference Check',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the types that Go infers for these short declarations.',
      skeleton: `package main

import "fmt"

func main() {
    a := 42
    b := 3.14
    c := "hello"
    d := true
    fmt.Printf("%T %T %T %T\\n", a, b, c, d)
}`,
      solution: `int float64 string bool`,
      hints: [
        '%T prints the type of a value.',
        'Integer literals default to int, floating-point to float64.',
        'String literals are string, boolean literals are bool.',
      ],
      concepts: ['type inference', 'default types', 'Printf %T'],
    },
    {
      id: 'go-var-10',
      title: 'Variable Block Declaration',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Declare multiple variables in a var block and print their sum.',
      skeleton: `package main

import "fmt"

// Declare a, b, c as int with values 10, 20, 30 in a var block

func main() {
    fmt.Println(a + b + c) // 60
}`,
      solution: `package main

import "fmt"

var (
    a int = 10
    b int = 20
    c int = 30
)

func main() {
    fmt.Println(a + b + c) // 60
}`,
      hints: [
        'Use var ( ... ) to group multiple variable declarations.',
        'Each variable gets its own line with type and value.',
        'var (\n    a int = 10\n    b int = 20\n    c int = 30\n)',
      ],
      concepts: ['var block', 'package-level variables', 'grouped declaration'],
    },
    {
      id: 'go-var-11',
      title: 'Fix Unused Variable',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the compilation error caused by an unused variable.',
      skeleton: `package main

import "fmt"

func main() {
    name := "Alice"
    age := 30
    city := "NYC"
    fmt.Println(name, age)
}`,
      solution: `package main

import "fmt"

func main() {
    name := "Alice"
    age := 30
    _ = "NYC"
    fmt.Println(name, age)
}`,
      hints: [
        'Go does not allow unused variables -- the compiler rejects them.',
        'You can either use the variable or assign it to the blank identifier.',
        'Change city := "NYC" to _ = "NYC" or remove it entirely.',
      ],
      concepts: ['unused variables', 'compiler errors', 'blank identifier'],
    },
    {
      id: 'go-var-12',
      title: 'Reassignment vs Declaration',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the error where := is used for reassignment instead of =.',
      skeleton: `package main

import "fmt"

func main() {
    count := 0
    count := count + 1
    fmt.Println(count)
}`,
      solution: `package main

import "fmt"

func main() {
    count := 0
    count = count + 1
    fmt.Println(count)
}`,
      hints: [
        ':= declares a new variable. You cannot redeclare an existing variable in the same scope.',
        'Use = for reassignment of already-declared variables.',
        'Change count := count + 1 to count = count + 1.',
      ],
      concepts: ['short declaration', 'reassignment', 'variable scope'],
    },
    {
      id: 'go-var-13',
      title: 'Constant Expression',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the output of iota-based constant expressions.',
      skeleton: `package main

import "fmt"

const (
    _  = iota
    KB = 1 << (10 * iota)
    MB
    GB
)

func main() {
    fmt.Println(KB, MB, GB)
}`,
      solution: `1024 1048576 1073741824`,
      hints: [
        'iota starts at 0 and increments by 1 for each constant in the block.',
        'The first constant (blank) gets iota=0, KB gets iota=1, MB gets iota=2, GB gets iota=3.',
        'KB = 1 << 10 = 1024, MB = 1 << 20 = 1048576, GB = 1 << 30 = 1073741824.',
      ],
      concepts: ['iota', 'bit shifting', 'constant expressions'],
    },
    {
      id: 'go-var-14',
      title: 'Shadowed Variable',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the variable shadowing bug so the outer variable is modified.',
      skeleton: `package main

import "fmt"

func main() {
    x := 10
    if true {
        x := 20  // Bug: shadows outer x
        fmt.Println("inner:", x)
    }
    fmt.Println("outer:", x) // Should print 20
}`,
      solution: `package main

import "fmt"

func main() {
    x := 10
    if true {
        x = 20
        fmt.Println("inner:", x)
    }
    fmt.Println("outer:", x) // Should print 20
}`,
      hints: [
        ':= inside the if block creates a new variable that shadows the outer x.',
        'Use = instead of := to modify the outer variable.',
        'Change x := 20 to x = 20 inside the if block.',
      ],
      concepts: ['variable shadowing', 'scope', 'short declaration'],
    },
    {
      id: 'go-var-15',
      title: 'Multiple Return Capture',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a function that returns a quotient and remainder, then capture both.',
      skeleton: `package main

import "fmt"

func divmod(a, b int) (int, int) {
    // Return quotient and remainder
}

func main() {
    q, r := divmod(17, 5)
    fmt.Printf("17 / 5 = %d remainder %d\\n", q, r)
}`,
      solution: `package main

import "fmt"

func divmod(a, b int) (int, int) {
    return a / b, a % b
}

func main() {
    q, r := divmod(17, 5)
    fmt.Printf("17 / 5 = %d remainder %d\\n", q, r)
}`,
      hints: [
        'Use the / operator for integer division and % for the remainder.',
        'Return both values separated by a comma.',
        'return a / b, a % b',
      ],
      concepts: ['multiple returns', 'integer division', 'modulo operator'],
    },
    {
      id: 'go-var-16',
      title: 'Variable Type Conversion',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that converts an integer to float64, doubles it, and returns the integer result.',
      skeleton: `package main

import "fmt"

func doubleAsFloat(n int) int {
    // Convert n to float64, multiply by 2.0, convert back to int
}

func main() {
    fmt.Println(doubleAsFloat(21)) // 42
}`,
      solution: `package main

import "fmt"

func doubleAsFloat(n int) int {
    f := float64(n) * 2.0
    return int(f)
}

func main() {
    fmt.Println(doubleAsFloat(21)) // 42
}`,
      hints: [
        'Go requires explicit type conversion between int and float64.',
        'Use float64(n) to convert int to float64.',
        'Use int(f) to convert back to int after the calculation.',
      ],
      concepts: ['type conversion', 'float64', 'explicit casting'],
    },
    {
      id: 'go-var-17',
      title: 'Iota with Custom Start',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create constants for HTTP status codes starting at 200, using iota.',
      skeleton: `package main

import "fmt"

// Define constants: OK=200, Created=201, Accepted=202
// Use iota with an offset

func main() {
    fmt.Println(OK, Created, Accepted) // 200 201 202
}`,
      solution: `package main

import "fmt"

const (
    OK       = iota + 200
    Created
    Accepted
)

func main() {
    fmt.Println(OK, Created, Accepted) // 200 201 202
}`,
      hints: [
        'iota starts at 0 but you can add an offset.',
        'iota + 200 makes the first constant 200.',
        'Subsequent constants auto-increment: 201, 202, etc.',
      ],
      concepts: ['iota', 'constant offset', 'auto-increment'],
    },
    {
      id: 'go-var-18',
      title: 'Refactor var to Short Declaration',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Refactor verbose var declarations to concise short declarations.',
      skeleton: `package main

import "fmt"

func main() {
    var name string = "Gopher"
    var age int = 10
    var score float64 = 99.5
    var active bool = true
    fmt.Println(name, age, score, active)
}`,
      solution: `package main

import "fmt"

func main() {
    name := "Gopher"
    age := 10
    score := 99.5
    active := true
    fmt.Println(name, age, score, active)
}`,
      hints: [
        'Short declarations with := infer the type from the value.',
        'Replace var name string = "Gopher" with name := "Gopher".',
        'Do the same for all four variables.',
      ],
      concepts: ['short declaration', 'type inference', 'code simplification'],
    },
    {
      id: 'go-var-19',
      title: 'Refactor Magic Numbers',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Replace magic numbers with named constants for better readability.',
      skeleton: `package main

import "fmt"

func main() {
    speed := 100.0
    time := 3600.0
    distance := speed * 1000.0 / 3600.0 * time
    fmt.Printf("Distance: %.2f meters\\n", distance)
}`,
      solution: `package main

import "fmt"

const (
    metersPerKm     = 1000.0
    secondsPerHour  = 3600.0
)

func main() {
    speed := 100.0
    time := 3600.0
    distance := speed * metersPerKm / secondsPerHour * time
    fmt.Printf("Distance: %.2f meters\\n", distance)
}`,
      hints: [
        'Extract magic numbers like 1000.0 and 3600.0 into named constants.',
        'Use a const block at the package level.',
        'Name them descriptively: metersPerKm, secondsPerHour.',
      ],
      concepts: ['named constants', 'readability', 'magic numbers'],
    },
    {
      id: 'go-var-20',
      title: 'Write a Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that returns a closure incrementing a counter each call.',
      skeleton: `package main

import "fmt"

func makeCounter() func() int {
    // Return a closure that increments and returns a count starting at 0
}

func main() {
    counter := makeCounter()
    fmt.Println(counter()) // 1
    fmt.Println(counter()) // 2
    fmt.Println(counter()) // 3
}`,
      solution: `package main

import "fmt"

func makeCounter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

func main() {
    counter := makeCounter()
    fmt.Println(counter()) // 1
    fmt.Println(counter()) // 2
    fmt.Println(counter()) // 3
}`,
      hints: [
        'Declare a local variable count inside makeCounter.',
        'Return an anonymous function that captures count via closure.',
        'The closure increments count and returns it.',
      ],
      concepts: ['closures', 'variable capture', 'function factories'],
    },
  ],
};
