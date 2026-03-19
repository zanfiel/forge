import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-fn',
  title: '03. Functions',
  explanation: `## Functions in Go

Functions are the building blocks of Go programs. They support multiple return values, named returns, variadic parameters, closures, and deferred execution.

\`\`\`go
// Basic function
func add(a, b int) int {
    return a + b
}

// Multiple returns
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

// Named returns
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return // naked return uses named values
}

// Variadic function
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

// Defer -- runs when surrounding function returns
func readFile() {
    f, _ := os.Open("file.txt")
    defer f.Close() // guaranteed cleanup
}

// Closures -- functions that capture outer variables
func counter() func() int {
    n := 0
    return func() int { n++; return n }
}

// First-class functions
var op func(int, int) int = add
\`\`\`

The \`init()\` function runs automatically before \`main()\` and cannot be called directly.`,
  exercises: [
    {
      id: 'go-fn-1',
      title: 'Basic Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fill in the blanks to define a function that multiplies two integers.',
      skeleton: `package main

import "fmt"

__BLANK__ multiply(a, b __BLANK__) int {
    return a * b
}

func main() {
    fmt.Println(multiply(6, 7))
}`,
      solution: `package main

import "fmt"

func multiply(a, b int) int {
    return a * b
}

func main() {
    fmt.Println(multiply(6, 7))
}`,
      hints: [
        'Functions are declared with the func keyword.',
        'When consecutive parameters share a type, the type appears only once.',
        'func multiply(a, b int) int { ... }',
      ],
      concepts: ['func keyword', 'parameter types', 'return type'],
    },
    {
      id: 'go-fn-2',
      title: 'Multiple Returns',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fill in the blanks to return both a quotient and an error.',
      skeleton: `package main

import (
    "errors"
    "fmt"
)

func safeDivide(a, b float64) (__BLANK__, __BLANK__) {
    if b == 0 {
        return 0, errors.New("cannot divide by zero")
    }
    return a / b, __BLANK__
}

func main() {
    result, err := safeDivide(10, 3)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Printf("%.2f\\n", result)
}`,
      solution: `package main

import (
    "errors"
    "fmt"
)

func safeDivide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("cannot divide by zero")
    }
    return a / b, nil
}

func main() {
    result, err := safeDivide(10, 3)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Printf("%.2f\\n", result)
}`,
      hints: [
        'Multiple return types are listed in parentheses.',
        'The error type is the standard way to report errors in Go.',
        'Return nil for the error when the operation succeeds.',
      ],
      concepts: ['multiple returns', 'error handling', 'nil'],
    },
    {
      id: 'go-fn-3',
      title: 'Named Returns',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fill in the blanks to use named return values.',
      skeleton: `package main

import "fmt"

func minMax(values []int) (min, max __BLANK__) {
    min = values[0]
    max = values[0]
    for _, v := range values {
        if v < min {
            min = v
        }
        if v > max {
            max = v
        }
    }
    __BLANK__
}

func main() {
    lo, hi := minMax([]int{3, 1, 4, 1, 5, 9})
    fmt.Println(lo, hi)
}`,
      solution: `package main

import "fmt"

func minMax(values []int) (min, max int) {
    min = values[0]
    max = values[0]
    for _, v := range values {
        if v < min {
            min = v
        }
        if v > max {
            max = v
        }
    }
    return
}

func main() {
    lo, hi := minMax([]int{3, 1, 4, 1, 5, 9})
    fmt.Println(lo, hi)
}`,
      hints: [
        'Named returns specify variable names in the return type signature.',
        'The type appears after both names since they share the same type.',
        'A bare return statement returns the named values.',
      ],
      concepts: ['named returns', 'naked return', 'min/max algorithm'],
    },
    {
      id: 'go-fn-4',
      title: 'Variadic Sum',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a variadic function that returns the sum of all arguments.',
      skeleton: `package main

import "fmt"

func sum(nums ...int) int {
    // Sum all nums and return the total
}

func main() {
    fmt.Println(sum(1, 2, 3))       // 6
    fmt.Println(sum(10, 20, 30, 40)) // 100
}`,
      solution: `package main

import "fmt"

func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

func main() {
    fmt.Println(sum(1, 2, 3))       // 6
    fmt.Println(sum(10, 20, 30, 40)) // 100
}`,
      hints: [
        'The ...int parameter receives any number of int arguments as a slice.',
        'Use a for range loop to iterate over the slice.',
        'Accumulate the sum in a local variable.',
      ],
      concepts: ['variadic functions', 'range loop', 'accumulator pattern'],
    },
    {
      id: 'go-fn-5',
      title: 'Defer Execution Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the order of deferred function calls.',
      skeleton: `package main

import "fmt"

func main() {
    fmt.Println("start")
    defer fmt.Println("first defer")
    defer fmt.Println("second defer")
    defer fmt.Println("third defer")
    fmt.Println("end")
}`,
      solution: `start
end
third defer
second defer
first defer`,
      hints: [
        'Deferred calls execute after the surrounding function returns.',
        'Multiple defers run in LIFO (last in, first out) order.',
        'Non-deferred statements execute first in normal order.',
      ],
      concepts: ['defer', 'LIFO order', 'stack behavior'],
    },
    {
      id: 'go-fn-6',
      title: 'Closure Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that returns a closure tracking a running total.',
      skeleton: `package main

import "fmt"

func accumulator() func(int) int {
    // Return a closure that adds to a running total
}

func main() {
    acc := accumulator()
    fmt.Println(acc(5))  // 5
    fmt.Println(acc(3))  // 8
    fmt.Println(acc(2))  // 10
}`,
      solution: `package main

import "fmt"

func accumulator() func(int) int {
    total := 0
    return func(n int) int {
        total += n
        return total
    }
}

func main() {
    acc := accumulator()
    fmt.Println(acc(5))  // 5
    fmt.Println(acc(3))  // 8
    fmt.Println(acc(2))  // 10
}`,
      hints: [
        'Declare a total variable inside accumulator.',
        'Return an anonymous function that captures total.',
        'Each call adds n to total and returns the new total.',
      ],
      concepts: ['closures', 'variable capture', 'running total'],
    },
    {
      id: 'go-fn-7',
      title: 'First-Class Functions',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Pass a function as an argument to another function.',
      skeleton: `package main

import "fmt"

func apply(a, b int, op __BLANK__) int {
    return op(a, b)
}

func main() {
    add := func(a, b int) int { return a + b }
    fmt.Println(apply(3, 4, add))
}`,
      solution: `package main

import "fmt"

func apply(a, b int, op func(int, int) int) int {
    return op(a, b)
}

func main() {
    add := func(a, b int) int { return a + b }
    fmt.Println(apply(3, 4, add))
}`,
      hints: [
        'The parameter type is a function signature.',
        'Write the full function type: func(int, int) int.',
        'Functions are first-class values in Go.',
      ],
      concepts: ['first-class functions', 'function types', 'higher-order functions'],
    },
    {
      id: 'go-fn-8',
      title: 'Fix Defer Argument Evaluation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the bug where defer evaluates its argument at the wrong time.',
      skeleton: `package main

import "fmt"

func main() {
    x := 10
    defer fmt.Println("deferred x:", x) // Should print 20, not 10
    x = 20
    fmt.Println("current x:", x)
}`,
      solution: `package main

import "fmt"

func main() {
    x := 10
    defer func() { fmt.Println("deferred x:", x) }()
    x = 20
    fmt.Println("current x:", x)
}`,
      hints: [
        'Defer evaluates its arguments immediately, not when it executes.',
        'Wrap the deferred call in an anonymous function to capture the variable.',
        'defer func() { fmt.Println("deferred x:", x) }()',
      ],
      concepts: ['defer argument evaluation', 'closures', 'deferred execution'],
    },
    {
      id: 'go-fn-9',
      title: 'Recursive Factorial',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a recursive function to calculate factorial.',
      skeleton: `package main

import "fmt"

func factorial(n int) int {
    // Return n! using recursion
}

func main() {
    fmt.Println(factorial(5))  // 120
    fmt.Println(factorial(0))  // 1
}`,
      solution: `package main

import "fmt"

func factorial(n int) int {
    if n <= 1 {
        return 1
    }
    return n * factorial(n-1)
}

func main() {
    fmt.Println(factorial(5))  // 120
    fmt.Println(factorial(0))  // 1
}`,
      hints: [
        'Base case: factorial of 0 or 1 is 1.',
        'Recursive case: n * factorial(n-1).',
        'Always handle the base case first to avoid infinite recursion.',
      ],
      concepts: ['recursion', 'base case', 'factorial'],
    },
    {
      id: 'go-fn-10',
      title: 'Variadic Spread',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Spread a slice into a variadic function call.',
      skeleton: `package main

import "fmt"

func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    fmt.Println(sum(numbers__BLANK__))
}`,
      solution: `package main

import "fmt"

func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    fmt.Println(sum(numbers...))
}`,
      hints: [
        'To pass a slice to a variadic function, you need to "spread" it.',
        'Use the ... suffix after the slice name.',
        'sum(numbers...) spreads the slice elements as individual arguments.',
      ],
      concepts: ['variadic spread', 'slice to variadic', 'ellipsis operator'],
    },
    {
      id: 'go-fn-11',
      title: 'Defer with Loops',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the output when defer is used inside a loop.',
      skeleton: `package main

import "fmt"

func main() {
    for i := 0; i < 3; i++ {
        defer fmt.Print(i)
    }
    fmt.Print("done ")
}`,
      solution: `done 210`,
      hints: [
        'Each iteration pushes a new deferred call onto the stack.',
        'Defer arguments are evaluated immediately, so i values are captured as 0, 1, 2.',
        'Deferred calls execute in LIFO order after the function body completes.',
      ],
      concepts: ['defer in loops', 'LIFO', 'argument evaluation'],
    },
    {
      id: 'go-fn-12',
      title: 'Function Composition',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a compose function that chains two functions together.',
      skeleton: `package main

import "fmt"

func compose(f, g func(int) int) func(int) int {
    // Return a function that applies g first, then f
}

func main() {
    double := func(x int) int { return x * 2 }
    addOne := func(x int) int { return x + 1 }
    doubleThenAdd := compose(addOne, double)
    fmt.Println(doubleThenAdd(5)) // 11: double(5)=10, addOne(10)=11
}`,
      solution: `package main

import "fmt"

func compose(f, g func(int) int) func(int) int {
    return func(x int) int {
        return f(g(x))
    }
}

func main() {
    double := func(x int) int { return x * 2 }
    addOne := func(x int) int { return x + 1 }
    doubleThenAdd := compose(addOne, double)
    fmt.Println(doubleThenAdd(5)) // 11: double(5)=10, addOne(10)=11
}`,
      hints: [
        'compose(f, g) should return a new function.',
        'The returned function applies g first, then f to the result.',
        'return func(x int) int { return f(g(x)) }',
      ],
      concepts: ['function composition', 'higher-order functions', 'closures'],
    },
    {
      id: 'go-fn-13',
      title: 'Init Function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fill in the blanks to use an init function for package initialization.',
      skeleton: `package main

import "fmt"

var config map[string]string

func __BLANK__() {
    config = map[string]string{
        "env":  "production",
        "port": "8080",
    }
}

func main() {
    fmt.Println(config["env"])
}`,
      solution: `package main

import "fmt"

var config map[string]string

func init() {
    config = map[string]string{
        "env":  "production",
        "port": "8080",
    }
}

func main() {
    fmt.Println(config["env"])
}`,
      hints: [
        'Go has a special function that runs before main().',
        'The function is called init and takes no parameters and returns nothing.',
        'init() is used for package-level initialization.',
      ],
      concepts: ['init function', 'package initialization', 'execution order'],
    },
    {
      id: 'go-fn-14',
      title: 'Fix Missing Return',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the missing return statement in a function with multiple branches.',
      skeleton: `package main

import "fmt"

func classify(n int) string {
    if n > 0 {
        return "positive"
    } else if n < 0 {
        return "negative"
    }
}

func main() {
    fmt.Println(classify(0))
}`,
      solution: `package main

import "fmt"

func classify(n int) string {
    if n > 0 {
        return "positive"
    } else if n < 0 {
        return "negative"
    }
    return "zero"
}

func main() {
    fmt.Println(classify(0))
}`,
      hints: [
        'Every code path in a function with a return type must return a value.',
        'What happens when n is 0? Neither if nor else if is true.',
        'Add a return statement for the n == 0 case.',
      ],
      concepts: ['return statement', 'code paths', 'compiler requirements'],
    },
    {
      id: 'go-fn-15',
      title: 'Map Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a map function that applies a transform to each element of a slice.',
      skeleton: `package main

import "fmt"

func mapInts(s []int, f func(int) int) []int {
    // Apply f to each element and return a new slice
}

func main() {
    nums := []int{1, 2, 3, 4, 5}
    doubled := mapInts(nums, func(n int) int { return n * 2 })
    fmt.Println(doubled) // [2 4 6 8 10]
}`,
      solution: `package main

import "fmt"

func mapInts(s []int, f func(int) int) []int {
    result := make([]int, len(s))
    for i, v := range s {
        result[i] = f(v)
    }
    return result
}

func main() {
    nums := []int{1, 2, 3, 4, 5}
    doubled := mapInts(nums, func(n int) int { return n * 2 })
    fmt.Println(doubled) // [2 4 6 8 10]
}`,
      hints: [
        'Create a result slice with the same length as the input.',
        'Iterate with range and apply f to each element.',
        'Store the result of f(v) at the corresponding index.',
      ],
      concepts: ['higher-order functions', 'functional patterns', 'slice transformation'],
    },
    {
      id: 'go-fn-16',
      title: 'Fix Nil Function Call',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the panic caused by calling a nil function variable.',
      skeleton: `package main

import "fmt"

func main() {
    var handler func(string) string
    result := handler("hello")
    fmt.Println(result)
}`,
      solution: `package main

import "fmt"

func main() {
    var handler func(string) string
    if handler != nil {
        result := handler("hello")
        fmt.Println(result)
    } else {
        fmt.Println("no handler set")
    }
}`,
      hints: [
        'Function variables default to nil in Go.',
        'Calling a nil function causes a runtime panic.',
        'Check if the function is not nil before calling it.',
      ],
      concepts: ['nil function', 'nil check', 'runtime panic'],
    },
    {
      id: 'go-fn-17',
      title: 'Predict Closure Capture',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Predict the output of closures capturing loop variables.',
      skeleton: `package main

import "fmt"

func main() {
    funcs := make([]func(), 3)
    for i := 0; i < 3; i++ {
        i := i // shadow with new variable
        funcs[i] = func() { fmt.Print(i) }
    }
    for _, f := range funcs {
        f()
    }
}`,
      solution: `012`,
      hints: [
        'The i := i inside the loop creates a new variable for each iteration.',
        'Each closure captures its own copy of i.',
        'Without the shadowing, all closures would capture the same i (value 3).',
      ],
      concepts: ['closure capture', 'loop variable', 'variable shadowing'],
    },
    {
      id: 'go-fn-18',
      title: 'Memoize Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a memoization wrapper for a function that takes an int and returns an int.',
      skeleton: `package main

import "fmt"

func memoize(f func(int) int) func(int) int {
    // Return a version of f that caches results
}

func main() {
    calls := 0
    expensive := func(n int) int {
        calls++
        return n * n
    }
    memo := memoize(expensive)
    fmt.Println(memo(5))  // 25
    fmt.Println(memo(5))  // 25 (cached)
    fmt.Println(memo(3))  // 9
    fmt.Println(calls)    // 2 (only 2 unique calls)
}`,
      solution: `package main

import "fmt"

func memoize(f func(int) int) func(int) int {
    cache := make(map[int]int)
    return func(n int) int {
        if v, ok := cache[n]; ok {
            return v
        }
        result := f(n)
        cache[n] = result
        return result
    }
}

func main() {
    calls := 0
    expensive := func(n int) int {
        calls++
        return n * n
    }
    memo := memoize(expensive)
    fmt.Println(memo(5))  // 25
    fmt.Println(memo(5))  // 25 (cached)
    fmt.Println(memo(3))  // 9
    fmt.Println(calls)    // 2 (only 2 unique calls)
}`,
      hints: [
        'Use a map to store computed results.',
        'Check if the result is in the cache before calling f.',
        'The cache map is captured by the closure.',
      ],
      concepts: ['memoization', 'closures', 'caching', 'map'],
    },
    {
      id: 'go-fn-19',
      title: 'Refactor to Named Returns',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor the function to use named return values for clarity.',
      skeleton: `package main

import (
    "errors"
    "fmt"
)

func parseAge(s string) (int, error) {
    if s == "" {
        return 0, errors.New("empty string")
    }
    n := 0
    for _, c := range s {
        if c < '0' || c > '9' {
            return 0, errors.New("invalid character")
        }
        n = n*10 + int(c-'0')
    }
    if n < 0 || n > 150 {
        return 0, errors.New("age out of range")
    }
    return n, nil
}

func main() {
    age, err := parseAge("25")
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(age)
}`,
      solution: `package main

import (
    "errors"
    "fmt"
)

func parseAge(s string) (age int, err error) {
    if s == "" {
        err = errors.New("empty string")
        return
    }
    for _, c := range s {
        if c < '0' || c > '9' {
            err = errors.New("invalid character")
            return
        }
        age = age*10 + int(c-'0')
    }
    if age < 0 || age > 150 {
        err = errors.New("age out of range")
        return
    }
    return
}

func main() {
    age, err := parseAge("25")
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(age)
}`,
      hints: [
        'Name the return values in the signature: (age int, err error).',
        'Assign to named returns directly instead of using return with values.',
        'Use bare return statements since the named values are already set.',
      ],
      concepts: ['named returns', 'refactoring', 'code clarity'],
    },
    {
      id: 'go-fn-20',
      title: 'Refactor Repeated Logic',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Extract repeated validation logic into a helper function.',
      skeleton: `package main

import "fmt"

func processUser(name string, age int) string {
    if name == "" {
        return "error: name required"
    }
    if age < 0 || age > 150 {
        return "error: invalid age"
    }
    return fmt.Sprintf("User: %s, Age: %d", name, age)
}

func processAdmin(name string, age int) string {
    if name == "" {
        return "error: name required"
    }
    if age < 0 || age > 150 {
        return "error: invalid age"
    }
    return fmt.Sprintf("Admin: %s, Age: %d", name, age)
}

func main() {
    fmt.Println(processUser("Alice", 30))
    fmt.Println(processAdmin("Bob", 25))
}`,
      solution: `package main

import "fmt"

func validate(name string, age int) error {
    if name == "" {
        return fmt.Errorf("name required")
    }
    if age < 0 || age > 150 {
        return fmt.Errorf("invalid age")
    }
    return nil
}

func processUser(name string, age int) string {
    if err := validate(name, age); err != nil {
        return "error: " + err.Error()
    }
    return fmt.Sprintf("User: %s, Age: %d", name, age)
}

func processAdmin(name string, age int) string {
    if err := validate(name, age); err != nil {
        return "error: " + err.Error()
    }
    return fmt.Sprintf("Admin: %s, Age: %d", name, age)
}

func main() {
    fmt.Println(processUser("Alice", 30))
    fmt.Println(processAdmin("Bob", 25))
}`,
      hints: [
        'The validation logic is duplicated between processUser and processAdmin.',
        'Extract it into a validate function that returns an error.',
        'Both process functions call validate and handle the error.',
      ],
      concepts: ['DRY principle', 'helper functions', 'error handling'],
    },
  ],
};
