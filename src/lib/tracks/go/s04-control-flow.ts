import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-ctrl',
  title: '04. Control Flow',
  explanation: `## Control Flow in Go

Go has a minimal but powerful set of control flow structures: if, switch, for, and goto. There is no while or do-while -- \`for\` handles all looping.

\`\`\`go
// If with init statement
if err := doSomething(); err != nil {
    log.Fatal(err)
}

// Switch (no fallthrough by default)
switch day {
case "Mon", "Tue", "Wed", "Thu", "Fri":
    fmt.Println("weekday")
default:
    fmt.Println("weekend")
}

// Switch with no condition (like if/else chain)
switch {
case score >= 90:
    grade = "A"
case score >= 80:
    grade = "B"
default:
    grade = "C"
}

// For loop (only loop construct in Go)
for i := 0; i < 10; i++ { }  // classic
for condition { }              // while-style
for { }                        // infinite loop
for i, v := range slice { }   // range-based

// Break, continue, labels
outer:
for i := 0; i < 3; i++ {
    for j := 0; j < 3; j++ {
        if j == 1 { break outer }
    }
}
\`\`\``,
  exercises: [
    {
      id: 'go-ctrl-1',
      title: 'If with Init',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fill in the blanks to use an if statement with an initialization.',
      skeleton: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    __BLANK__ n, err := strconv.Atoi("42"); err == nil {
        fmt.Println("Parsed:", n)
    } else {
        fmt.Println("Error:", err)
    }
}`,
      solution: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    if n, err := strconv.Atoi("42"); err == nil {
        fmt.Println("Parsed:", n)
    } else {
        fmt.Println("Error:", err)
    }
}`,
      hints: [
        'Go allows a short statement before the condition in an if.',
        'The keyword is if, followed by the init statement and a semicolon.',
        'if n, err := strconv.Atoi("42"); err == nil { ... }',
      ],
      concepts: ['if with init', 'scoped variables', 'strconv'],
    },
    {
      id: 'go-ctrl-2',
      title: 'Switch Statement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fill in the blanks to complete a switch statement.',
      skeleton: `package main

import "fmt"

func dayType(day string) string {
    __BLANK__ day {
    __BLANK__ "Sat", "Sun":
        return "weekend"
    __BLANK__:
        return "weekday"
    }
}

func main() {
    fmt.Println(dayType("Mon"))
    fmt.Println(dayType("Sat"))
}`,
      solution: `package main

import "fmt"

func dayType(day string) string {
    switch day {
    case "Sat", "Sun":
        return "weekend"
    default:
        return "weekday"
    }
}

func main() {
    fmt.Println(dayType("Mon"))
    fmt.Println(dayType("Sat"))
}`,
      hints: [
        'Use the switch keyword followed by the expression to match.',
        'Each branch starts with the case keyword.',
        'The default branch handles all unmatched cases.',
      ],
      concepts: ['switch', 'case', 'default', 'multiple case values'],
    },
    {
      id: 'go-ctrl-3',
      title: 'Conditionless Switch',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use a switch with no condition to replace an if-else chain.',
      skeleton: `package main

import "fmt"

func grade(score int) string {
    switch {
    case score >= 90:
        return "A"
    __BLANK__ score >= 80:
        return "B"
    __BLANK__ score >= 70:
        return "C"
    default:
        return "F"
    }
}

func main() {
    fmt.Println(grade(95))
    fmt.Println(grade(73))
}`,
      solution: `package main

import "fmt"

func grade(score int) string {
    switch {
    case score >= 90:
        return "A"
    case score >= 80:
        return "B"
    case score >= 70:
        return "C"
    default:
        return "F"
    }
}

func main() {
    fmt.Println(grade(95))
    fmt.Println(grade(73))
}`,
      hints: [
        'A conditionless switch evaluates cases as boolean expressions.',
        'Each branch uses the case keyword with a boolean condition.',
        'case score >= 80:',
      ],
      concepts: ['conditionless switch', 'boolean cases', 'if-else alternative'],
    },
    {
      id: 'go-ctrl-4',
      title: 'For Loop Classic',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a classic for loop that sums numbers from 1 to 10.',
      skeleton: `package main

import "fmt"

func main() {
    sum := 0
    __BLANK__ i := 1; i <= 10; i++ {
        sum += i
    }
    fmt.Println(sum)
}`,
      solution: `package main

import "fmt"

func main() {
    sum := 0
    for i := 1; i <= 10; i++ {
        sum += i
    }
    fmt.Println(sum)
}`,
      hints: [
        'Go uses the for keyword for all loops.',
        'Classic form: for init; condition; post { body }.',
        'for i := 1; i <= 10; i++ { ... }',
      ],
      concepts: ['for loop', 'classic loop', 'accumulator'],
    },
    {
      id: 'go-ctrl-5',
      title: 'For Range',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use for range to iterate over a slice and print index and value.',
      skeleton: `package main

import "fmt"

func main() {
    fruits := []string{"apple", "banana", "cherry"}
    for __BLANK__, __BLANK__ := range fruits {
        fmt.Printf("%d: %s\\n", i, fruit)
    }
}`,
      solution: `package main

import "fmt"

func main() {
    fruits := []string{"apple", "banana", "cherry"}
    for i, fruit := range fruits {
        fmt.Printf("%d: %s\\n", i, fruit)
    }
}`,
      hints: [
        'Range over a slice yields index and value on each iteration.',
        'Declare both variables with := in the for statement.',
        'for i, fruit := range fruits',
      ],
      concepts: ['for range', 'slice iteration', 'index and value'],
    },
    {
      id: 'go-ctrl-6',
      title: 'While-Style Loop',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a function that counts digits in a number using a while-style loop.',
      skeleton: `package main

import "fmt"

func countDigits(n int) int {
    // Use for with just a condition (while-style) to count digits
    // Handle n == 0 as having 1 digit
}

func main() {
    fmt.Println(countDigits(12345)) // 5
    fmt.Println(countDigits(0))     // 1
}`,
      solution: `package main

import "fmt"

func countDigits(n int) int {
    if n == 0 {
        return 1
    }
    count := 0
    for n != 0 {
        n /= 10
        count++
    }
    return count
}

func main() {
    fmt.Println(countDigits(12345)) // 5
    fmt.Println(countDigits(0))     // 1
}`,
      hints: [
        'Use for with just a condition: for n != 0 { ... }',
        'Divide n by 10 each iteration to remove the last digit.',
        'Handle the special case of n == 0 returning 1.',
      ],
      concepts: ['while-style loop', 'for with condition', 'digit counting'],
    },
    {
      id: 'go-ctrl-7',
      title: 'Break with Label',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use a labeled break to exit nested loops when target is found.',
      skeleton: `package main

import "fmt"

func findInMatrix(matrix [][]int, target int) (int, int) {
    // Use labeled break to find target and return its row, col
    // Return -1, -1 if not found
}

func main() {
    m := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
    r, c := findInMatrix(m, 5)
    fmt.Println(r, c) // 1 1
}`,
      solution: `package main

import "fmt"

func findInMatrix(matrix [][]int, target int) (int, int) {
    row, col := -1, -1
search:
    for i, r := range matrix {
        for j, v := range r {
            if v == target {
                row, col = i, j
                break search
            }
        }
    }
    return row, col
}

func main() {
    m := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
    r, c := findInMatrix(m, 5)
    fmt.Println(r, c) // 1 1
}`,
      hints: [
        'Define a label before the outer loop: search:',
        'Use break search to exit both loops at once.',
        'Without the label, break would only exit the inner loop.',
      ],
      concepts: ['labeled break', 'nested loops', 'matrix search'],
    },
    {
      id: 'go-ctrl-8',
      title: 'Continue Statement',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a function that sums only even numbers using continue.',
      skeleton: `package main

import "fmt"

func sumEvens(nums []int) int {
    // Skip odd numbers with continue, sum even ones
}

func main() {
    fmt.Println(sumEvens([]int{1, 2, 3, 4, 5, 6})) // 12
}`,
      solution: `package main

import "fmt"

func sumEvens(nums []int) int {
    sum := 0
    for _, n := range nums {
        if n%2 != 0 {
            continue
        }
        sum += n
    }
    return sum
}

func main() {
    fmt.Println(sumEvens([]int{1, 2, 3, 4, 5, 6})) // 12
}`,
      hints: [
        'Use continue to skip the current iteration and move to the next.',
        'Check if the number is odd with n%2 != 0.',
        'If odd, continue; otherwise add to sum.',
      ],
      concepts: ['continue', 'skip iteration', 'even number check'],
    },
    {
      id: 'go-ctrl-9',
      title: 'Nested Switch',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the output of a switch without explicit break.',
      skeleton: `package main

import "fmt"

func main() {
    x := 2
    switch x {
    case 1:
        fmt.Println("one")
    case 2:
        fmt.Println("two")
    case 3:
        fmt.Println("three")
    default:
        fmt.Println("other")
    }
}`,
      solution: `two`,
      hints: [
        'Go switch cases do NOT fall through by default.',
        'Only the matching case executes.',
        'Unlike C/Java, no explicit break is needed.',
      ],
      concepts: ['switch no fallthrough', 'implicit break', 'case matching'],
    },
    {
      id: 'go-ctrl-10',
      title: 'Infinite Loop with Break',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a function that finds the first power of 2 greater than n using an infinite loop.',
      skeleton: `package main

import "fmt"

func nextPowerOf2(n int) int {
    // Use for {} infinite loop with break
}

func main() {
    fmt.Println(nextPowerOf2(5))   // 8
    fmt.Println(nextPowerOf2(100)) // 128
}`,
      solution: `package main

import "fmt"

func nextPowerOf2(n int) int {
    p := 1
    for {
        if p > n {
            break
        }
        p *= 2
    }
    return p
}

func main() {
    fmt.Println(nextPowerOf2(5))   // 8
    fmt.Println(nextPowerOf2(100)) // 128
}`,
      hints: [
        'for {} creates an infinite loop.',
        'Use break to exit the loop when the condition is met.',
        'Double p each iteration until p > n.',
      ],
      concepts: ['infinite loop', 'break', 'powers of 2'],
    },
    {
      id: 'go-ctrl-11',
      title: 'Predict Loop Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the output of a for loop with continue.',
      skeleton: `package main

import "fmt"

func main() {
    for i := 0; i < 5; i++ {
        if i == 2 {
            continue
        }
        fmt.Print(i, " ")
    }
}`,
      solution: `0 1 3 4 `,
      hints: [
        'continue skips the rest of the loop body for the current iteration.',
        'When i is 2, the Print statement is skipped.',
        'All other values (0, 1, 3, 4) are printed.',
      ],
      concepts: ['continue', 'loop control', 'iteration skipping'],
    },
    {
      id: 'go-ctrl-12',
      title: 'Fix Off-by-One',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the off-by-one error in the loop condition.',
      skeleton: `package main

import "fmt"

func main() {
    // Should print 1 through 5, but prints 1 through 4
    for i := 1; i < 5; i++ {
        fmt.Println(i)
    }
}`,
      solution: `package main

import "fmt"

func main() {
    for i := 1; i <= 5; i++ {
        fmt.Println(i)
    }
}`,
      hints: [
        'The loop condition i < 5 stops at 4.',
        'To include 5, change the condition to i <= 5.',
        'Off-by-one errors are one of the most common bugs.',
      ],
      concepts: ['off-by-one', 'loop bounds', 'inclusive range'],
    },
    {
      id: 'go-ctrl-13',
      title: 'Fix Switch Fallthrough',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the code that needs fallthrough behavior in a switch.',
      skeleton: `package main

import "fmt"

func main() {
    n := 3
    switch {
    case n >= 3:
        fmt.Println(">=3")
        // Should also print ">=2" and ">=1" but doesn't
    case n >= 2:
        fmt.Println(">=2")
    case n >= 1:
        fmt.Println(">=1")
    }
}`,
      solution: `package main

import "fmt"

func main() {
    n := 3
    switch {
    case n >= 3:
        fmt.Println(">=3")
        fallthrough
    case n >= 2:
        fmt.Println(">=2")
        fallthrough
    case n >= 1:
        fmt.Println(">=1")
    }
}`,
      hints: [
        'Go switch cases do not fall through by default.',
        'Use the fallthrough keyword to continue to the next case.',
        'Add fallthrough at the end of each case that should continue.',
      ],
      concepts: ['fallthrough', 'switch behavior', 'explicit fallthrough'],
    },
    {
      id: 'go-ctrl-14',
      title: 'FizzBuzz',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Implement FizzBuzz: return "Fizz" for multiples of 3, "Buzz" for 5, "FizzBuzz" for both.',
      skeleton: `package main

import (
    "fmt"
    "strconv"
)

func fizzBuzz(n int) string {
    // Return "FizzBuzz", "Fizz", "Buzz", or the number as string
}

func main() {
    for i := 1; i <= 15; i++ {
        fmt.Println(fizzBuzz(i))
    }
}`,
      solution: `package main

import (
    "fmt"
    "strconv"
)

func fizzBuzz(n int) string {
    switch {
    case n%15 == 0:
        return "FizzBuzz"
    case n%3 == 0:
        return "Fizz"
    case n%5 == 0:
        return "Buzz"
    default:
        return strconv.Itoa(n)
    }
}

func main() {
    for i := 1; i <= 15; i++ {
        fmt.Println(fizzBuzz(i))
    }
}`,
      hints: [
        'Check multiples of 15 first (both 3 and 5).',
        'Use a conditionless switch for clean logic.',
        'Convert numbers to string with strconv.Itoa.',
      ],
      concepts: ['FizzBuzz', 'modulo operator', 'conditionless switch'],
    },
    {
      id: 'go-ctrl-15',
      title: 'Predict Switch Match',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict which case matches when multiple cases share a value.',
      skeleton: `package main

import "fmt"

func main() {
    x := 5
    switch {
    case x > 10:
        fmt.Println("big")
    case x > 3:
        fmt.Println("medium")
    case x > 0:
        fmt.Println("small")
    default:
        fmt.Println("zero or negative")
    }
}`,
      solution: `medium`,
      hints: [
        'A conditionless switch evaluates cases top to bottom.',
        'The first true case wins.',
        'x > 3 is true and comes before x > 0, so "medium" is printed.',
      ],
      concepts: ['switch evaluation order', 'first match wins', 'conditionless switch'],
    },
    {
      id: 'go-ctrl-16',
      title: 'Binary Search',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement binary search on a sorted slice using a for loop.',
      skeleton: `package main

import "fmt"

func binarySearch(sorted []int, target int) int {
    // Return index of target, or -1 if not found
}

func main() {
    data := []int{1, 3, 5, 7, 9, 11, 13}
    fmt.Println(binarySearch(data, 7))  // 3
    fmt.Println(binarySearch(data, 4))  // -1
}`,
      solution: `package main

import "fmt"

func binarySearch(sorted []int, target int) int {
    lo, hi := 0, len(sorted)-1
    for lo <= hi {
        mid := lo + (hi-lo)/2
        switch {
        case sorted[mid] == target:
            return mid
        case sorted[mid] < target:
            lo = mid + 1
        default:
            hi = mid - 1
        }
    }
    return -1
}

func main() {
    data := []int{1, 3, 5, 7, 9, 11, 13}
    fmt.Println(binarySearch(data, 7))  // 3
    fmt.Println(binarySearch(data, 4))  // -1
}`,
      hints: [
        'Maintain lo and hi pointers, loop while lo <= hi.',
        'Calculate mid as lo + (hi-lo)/2 to avoid overflow.',
        'Narrow the search range based on comparison.',
      ],
      concepts: ['binary search', 'for loop', 'algorithm'],
    },
    {
      id: 'go-ctrl-17',
      title: 'Refactor If Chain to Switch',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Refactor a verbose if-else chain into a clean switch statement.',
      skeleton: `package main

import "fmt"

func httpStatus(code int) string {
    if code == 200 {
        return "OK"
    } else if code == 201 {
        return "Created"
    } else if code == 301 {
        return "Moved Permanently"
    } else if code == 404 {
        return "Not Found"
    } else if code == 500 {
        return "Internal Server Error"
    } else {
        return "Unknown"
    }
}

func main() {
    fmt.Println(httpStatus(404))
}`,
      solution: `package main

import "fmt"

func httpStatus(code int) string {
    switch code {
    case 200:
        return "OK"
    case 201:
        return "Created"
    case 301:
        return "Moved Permanently"
    case 404:
        return "Not Found"
    case 500:
        return "Internal Server Error"
    default:
        return "Unknown"
    }
}

func main() {
    fmt.Println(httpStatus(404))
}`,
      hints: [
        'Replace the if-else chain with a switch on the code variable.',
        'Each if condition becomes a case.',
        'The else becomes default.',
      ],
      concepts: ['refactoring', 'switch vs if-else', 'readability'],
    },
    {
      id: 'go-ctrl-18',
      title: 'Refactor Nested Ifs',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor deeply nested ifs using early returns.',
      skeleton: `package main

import "fmt"

func process(s string) string {
    if s != "" {
        if len(s) <= 100 {
            if s[0] != ' ' {
                return "valid: " + s
            } else {
                return "error: leading space"
            }
        } else {
            return "error: too long"
        }
    } else {
        return "error: empty"
    }
}

func main() {
    fmt.Println(process("hello"))
}`,
      solution: `package main

import "fmt"

func process(s string) string {
    if s == "" {
        return "error: empty"
    }
    if len(s) > 100 {
        return "error: too long"
    }
    if s[0] == ' ' {
        return "error: leading space"
    }
    return "valid: " + s
}

func main() {
    fmt.Println(process("hello"))
}`,
      hints: [
        'Invert conditions and return early to flatten nesting.',
        'Check error conditions first and return immediately.',
        'The happy path becomes the final return at the end.',
      ],
      concepts: ['early return', 'guard clauses', 'code flattening'],
    },
    {
      id: 'go-ctrl-19',
      title: 'Fix Goto Usage',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix the goto that jumps over a variable declaration.',
      skeleton: `package main

import "fmt"

func main() {
    n := 5
    if n > 3 {
        goto done
    }
    msg := "small number"
    fmt.Println(msg)
done:
    fmt.Println("finished")
}`,
      solution: `package main

import "fmt"

func main() {
    n := 5
    var msg string
    if n > 3 {
        goto done
    }
    msg = "small number"
    fmt.Println(msg)
done:
    _ = msg
    fmt.Println("finished")
}`,
      hints: [
        'goto cannot jump over variable declarations in Go.',
        'Move the variable declaration before the goto.',
        'Declare msg with var before the if block, assign it later.',
      ],
      concepts: ['goto', 'labels', 'variable declaration scope'],
    },
    {
      id: 'go-ctrl-20',
      title: 'Collatz Conjecture',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Count the steps to reach 1 in the Collatz sequence.',
      skeleton: `package main

import "fmt"

func collatzSteps(n int) int {
    // If n is even, divide by 2. If odd, multiply by 3 and add 1.
    // Count steps until n reaches 1.
}

func main() {
    fmt.Println(collatzSteps(6))  // 8
    fmt.Println(collatzSteps(1))  // 0
}`,
      solution: `package main

import "fmt"

func collatzSteps(n int) int {
    steps := 0
    for n != 1 {
        if n%2 == 0 {
            n /= 2
        } else {
            n = 3*n + 1
        }
        steps++
    }
    return steps
}

func main() {
    fmt.Println(collatzSteps(6))  // 8
    fmt.Println(collatzSteps(1))  // 0
}`,
      hints: [
        'Use a for loop that continues while n != 1.',
        'Check if n is even or odd using n%2.',
        'Increment a steps counter each iteration.',
      ],
      concepts: ['while-style loop', 'conditional logic', 'Collatz sequence'],
    },
  ],
};
