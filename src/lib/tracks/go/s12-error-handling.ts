import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-err',
  title: '12. Error Handling',
  explanation: `## Error Handling in Go

Go uses explicit error values instead of exceptions. The \`error\` interface is simple: any type with an \`Error() string\` method satisfies it.

\`\`\`go
// error interface
type error interface {
    Error() string
}

// Creating errors
err := errors.New("something went wrong")
err := fmt.Errorf("failed to open %s: %w", name, cause) // wrapping

// Checking errors
if err != nil {
    return err
}

// Error wrapping (Go 1.13+)
wrapped := fmt.Errorf("outer: %w", innerErr)

// errors.Is -- checks error chain
if errors.Is(err, os.ErrNotExist) {
    fmt.Println("file not found")
}

// errors.As -- extracts typed error from chain
var pathErr *os.PathError
if errors.As(err, &pathErr) {
    fmt.Println("path:", pathErr.Path)
}

// Sentinel errors
var ErrNotFound = errors.New("not found")

// Custom error types
type AppError struct {
    Code    int
    Message string
}
func (e *AppError) Error() string {
    return fmt.Sprintf("[%d] %s", e.Code, e.Message)
}
\`\`\``,
  exercises: [
    {
      id: 'go-err-1',
      title: 'Return an Error',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Return an error from a function using errors.New.',
      skeleton: `package main

import (
    "errors"
    "fmt"
)

func divide(a, b float64) (float64, __BLANK__) {
    if b == 0 {
        return 0, __BLANK__.New("division by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 0)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println(result)
}`,
      solution: `package main

import (
    "errors"
    "fmt"
)

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 0)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println(result)
}`,
      hints: [
        'The error type is the standard way to report errors.',
        'errors.New creates a simple error with a message.',
        'Return nil for the error when the operation succeeds.',
      ],
      concepts: ['error interface', 'errors.New', 'error return'],
    },
    {
      id: 'go-err-2',
      title: 'fmt.Errorf',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Create a formatted error message with fmt.Errorf.',
      skeleton: `package main

import "fmt"

func validateAge(age int) error {
    if age < 0 || age > 150 {
        return fmt.__BLANK__("invalid age: %d", age)
    }
    return nil
}

func main() {
    if err := validateAge(-5); err != nil {
        fmt.Println(err)
    }
}`,
      solution: `package main

import "fmt"

func validateAge(age int) error {
    if age < 0 || age > 150 {
        return fmt.Errorf("invalid age: %d", age)
    }
    return nil
}

func main() {
    if err := validateAge(-5); err != nil {
        fmt.Println(err)
    }
}`,
      hints: [
        'fmt.Errorf works like Sprintf but returns an error.',
        'Use format verbs to include dynamic values in the message.',
        'fmt.Errorf("invalid age: %d", age)',
      ],
      concepts: ['fmt.Errorf', 'formatted error', 'error message'],
    },
    {
      id: 'go-err-3',
      title: 'Error Wrapping',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Wrap an error using the %w verb to preserve the error chain.',
      skeleton: `package main

import (
    "errors"
    "fmt"
    "strconv"
)

func parseConfig(s string) (int, error) {
    n, err := strconv.Atoi(s)
    if err != nil {
        return 0, fmt.Errorf("parseConfig: __BLANK__", err)
    }
    return n, nil
}

func main() {
    _, err := parseConfig("abc")
    fmt.Println(err)
    fmt.Println(errors.Is(err, strconv.ErrSyntax))
}`,
      solution: `package main

import (
    "errors"
    "fmt"
    "strconv"
)

func parseConfig(s string) (int, error) {
    n, err := strconv.Atoi(s)
    if err != nil {
        return 0, fmt.Errorf("parseConfig: %w", err)
    }
    return n, nil
}

func main() {
    _, err := parseConfig("abc")
    fmt.Println(err)
    fmt.Println(errors.Is(err, strconv.ErrSyntax))
}`,
      hints: [
        'The %w verb wraps the error, preserving the chain.',
        'errors.Is can then check for the wrapped error.',
        'Use %w instead of %v to maintain the error chain.',
      ],
      concepts: ['error wrapping', '%w verb', 'error chain'],
    },
    {
      id: 'go-err-4',
      title: 'errors.Is',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Check for a specific error in the error chain using errors.Is.',
      skeleton: `package main

import (
    "errors"
    "fmt"
)

var ErrNotFound = errors.New("not found")

func findUser(id int) error {
    return fmt.Errorf("findUser: %w", ErrNotFound)
}

func main() {
    err := findUser(42)
    if errors.__BLANK__(err, ErrNotFound) {
        fmt.Println("user not found")
    }
}`,
      solution: `package main

import (
    "errors"
    "fmt"
)

var ErrNotFound = errors.New("not found")

func findUser(id int) error {
    return fmt.Errorf("findUser: %w", ErrNotFound)
}

func main() {
    err := findUser(42)
    if errors.Is(err, ErrNotFound) {
        fmt.Println("user not found")
    }
}`,
      hints: [
        'errors.Is checks if any error in the chain matches.',
        'It unwraps errors automatically to find a match.',
        'errors.Is(err, ErrNotFound)',
      ],
      concepts: ['errors.Is', 'sentinel errors', 'error chain'],
    },
    {
      id: 'go-err-5',
      title: 'errors.As',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Extract a typed error from the chain using errors.As.',
      skeleton: `package main

import (
    "errors"
    "fmt"
)

type HTTPError struct {
    Code    int
    Message string
}

func (e *HTTPError) Error() string {
    return fmt.Sprintf("%d: %s", e.Code, e.Message)
}

func doRequest() error {
    return fmt.Errorf("request failed: %w", &HTTPError{Code: 404, Message: "not found"})
}

func main() {
    err := doRequest()
    var httpErr *HTTPError
    if errors.__BLANK__(err, &httpErr) {
        fmt.Println("HTTP code:", httpErr.Code)
    }
}`,
      solution: `package main

import (
    "errors"
    "fmt"
)

type HTTPError struct {
    Code    int
    Message string
}

func (e *HTTPError) Error() string {
    return fmt.Sprintf("%d: %s", e.Code, e.Message)
}

func doRequest() error {
    return fmt.Errorf("request failed: %w", &HTTPError{Code: 404, Message: "not found"})
}

func main() {
    err := doRequest()
    var httpErr *HTTPError
    if errors.As(err, &httpErr) {
        fmt.Println("HTTP code:", httpErr.Code)
    }
}`,
      hints: [
        'errors.As finds the first error in the chain matching the target type.',
        'Pass a pointer to the target variable: &httpErr.',
        'If found, httpErr is set to the matching error.',
      ],
      concepts: ['errors.As', 'typed error extraction', 'error chain'],
    },
    {
      id: 'go-err-6',
      title: 'Custom Error Type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create a custom error type with context information.',
      skeleton: `package main

import "fmt"

type ValidationError struct {
    Field   string
    Value   interface{}
    Message string
}

// Implement the error interface

func validateEmail(email string) error {
    if email == "" {
        return &ValidationError{Field: "email", Value: email, Message: "cannot be empty"}
    }
    return nil
}

func main() {
    err := validateEmail("")
    if err != nil {
        fmt.Println(err)
    }
}`,
      solution: `package main

import "fmt"

type ValidationError struct {
    Field   string
    Value   interface{}
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation error on %s (%v): %s", e.Field, e.Value, e.Message)
}

func validateEmail(email string) error {
    if email == "" {
        return &ValidationError{Field: "email", Value: email, Message: "cannot be empty"}
    }
    return nil
}

func main() {
    err := validateEmail("")
    if err != nil {
        fmt.Println(err)
    }
}`,
      hints: [
        'Implement the Error() string method on *ValidationError.',
        'Include field name, value, and message in the output.',
        'Use fmt.Sprintf for formatting.',
      ],
      concepts: ['custom error type', 'Error method', 'structured errors'],
    },
    {
      id: 'go-err-7',
      title: 'Sentinel Error',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Define and use sentinel errors for known error conditions.',
      skeleton: `package main

import (
    "errors"
    "fmt"
)

// Define sentinel errors for empty stack and not found

type Stack struct {
    items []int
}

func (s *Stack) Pop() (int, error) {
    if len(s.items) == 0 {
        return 0, ErrEmptyStack
    }
    val := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return val, nil
}

func main() {
    s := &Stack{}
    _, err := s.Pop()
    if errors.Is(err, ErrEmptyStack) {
        fmt.Println("stack is empty")
    }
}`,
      solution: `package main

import (
    "errors"
    "fmt"
)

var ErrEmptyStack = errors.New("stack is empty")

type Stack struct {
    items []int
}

func (s *Stack) Pop() (int, error) {
    if len(s.items) == 0 {
        return 0, ErrEmptyStack
    }
    val := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return val, nil
}

func main() {
    s := &Stack{}
    _, err := s.Pop()
    if errors.Is(err, ErrEmptyStack) {
        fmt.Println("stack is empty")
    }
}`,
      hints: [
        'Sentinel errors are package-level var values.',
        'Define with var ErrName = errors.New("message").',
        'Check with errors.Is for robust comparison.',
      ],
      concepts: ['sentinel errors', 'package-level errors', 'error comparison'],
    },
    {
      id: 'go-err-8',
      title: 'Multi-Error Collection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Collect multiple errors and return them as one.',
      skeleton: `package main

import (
    "errors"
    "fmt"
    "strings"
)

func validateUser(name, email string, age int) error {
    var errs []error
    // Add validation errors to errs slice
    // Return joined errors or nil
}

func main() {
    err := validateUser("", "", -5)
    if err != nil {
        fmt.Println(err)
    }
}`,
      solution: `package main

import (
    "errors"
    "fmt"
    "strings"
)

func validateUser(name, email string, age int) error {
    var errs []error
    if name == "" {
        errs = append(errs, fmt.Errorf("name is required"))
    }
    if email == "" {
        errs = append(errs, fmt.Errorf("email is required"))
    }
    if age < 0 || age > 150 {
        errs = append(errs, fmt.Errorf("invalid age: %d", age))
    }
    if len(errs) > 0 {
        return errors.Join(errs...)
    }
    return nil
}

func main() {
    err := validateUser("", "", -5)
    if err != nil {
        fmt.Println(err)
    }
}`,
      hints: [
        'Collect errors in a slice as you validate.',
        'Use errors.Join (Go 1.20+) to combine multiple errors.',
        'Return nil if no errors were collected.',
      ],
      concepts: ['error collection', 'errors.Join', 'multi-error'],
    },
    {
      id: 'go-err-9',
      title: 'Predict Wrapping',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the output of wrapped vs non-wrapped error checks.',
      skeleton: `package main

import (
    "errors"
    "fmt"
)

var ErrBase = errors.New("base error")

func main() {
    wrapped := fmt.Errorf("outer: %w", ErrBase)
    notWrapped := fmt.Errorf("outer: %v", ErrBase)

    fmt.Println(errors.Is(wrapped, ErrBase))
    fmt.Println(errors.Is(notWrapped, ErrBase))
}`,
      solution: `true
false`,
      hints: [
        '%w wraps the error, preserving the chain.',
        '%v formats it as a string, breaking the chain.',
        'errors.Is can only find errors in the wrapped chain.',
      ],
      concepts: ['%w vs %v', 'error wrapping', 'chain preservation'],
    },
    {
      id: 'go-err-10',
      title: 'Predict Error String',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the string output of a wrapped error.',
      skeleton: `package main

import (
    "errors"
    "fmt"
)

func main() {
    inner := errors.New("file not found")
    outer := fmt.Errorf("open config: %w", inner)
    fmt.Println(outer)
}`,
      solution: `open config: file not found`,
      hints: [
        'fmt.Errorf with %w includes the wrapped error message.',
        'The output combines outer text and inner error message.',
        'open config: file not found',
      ],
      concepts: ['error message', 'wrapping output', 'fmt.Errorf'],
    },
    {
      id: 'go-err-11',
      title: 'Predict errors.As',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the behavior of errors.As on a wrapped custom error.',
      skeleton: `package main

import (
    "errors"
    "fmt"
)

type CodeError struct {
    Code int
}

func (e *CodeError) Error() string {
    return fmt.Sprintf("error code %d", e.Code)
}

func main() {
    err := fmt.Errorf("wrapped: %w", &CodeError{Code: 42})
    var ce *CodeError
    fmt.Println(errors.As(err, &ce))
    if ce != nil {
        fmt.Println(ce.Code)
    }
}`,
      solution: `true
42`,
      hints: [
        'errors.As unwraps the chain to find a *CodeError.',
        'It finds the wrapped CodeError and sets ce to it.',
        'ce.Code is 42.',
      ],
      concepts: ['errors.As', 'unwrapping', 'typed error'],
    },
    {
      id: 'go-err-12',
      title: 'Fix Error Check',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the code that ignores an error return value.',
      skeleton: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    n, _ := strconv.Atoi("not-a-number")
    fmt.Println("Result:", n*2)
}`,
      solution: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    n, err := strconv.Atoi("not-a-number")
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Result:", n*2)
}`,
      hints: [
        'Never ignore error returns with _ in production code.',
        'Capture the error and check it.',
        'Handle the error before using the result.',
      ],
      concepts: ['error checking', 'ignored errors', 'error handling'],
    },
    {
      id: 'go-err-13',
      title: 'Fix Error Comparison',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the error comparison that uses == instead of errors.Is.',
      skeleton: `package main

import (
    "errors"
    "fmt"
)

var ErrAuth = errors.New("authentication failed")

func authenticate() error {
    return fmt.Errorf("login: %w", ErrAuth)
}

func main() {
    err := authenticate()
    if err == ErrAuth {  // Bug: does not check wrapped errors
        fmt.Println("auth error")
    } else {
        fmt.Println("other error:", err)
    }
}`,
      solution: `package main

import (
    "errors"
    "fmt"
)

var ErrAuth = errors.New("authentication failed")

func authenticate() error {
    return fmt.Errorf("login: %w", ErrAuth)
}

func main() {
    err := authenticate()
    if errors.Is(err, ErrAuth) {
        fmt.Println("auth error")
    } else {
        fmt.Println("other error:", err)
    }
}`,
      hints: [
        '== only checks the outermost error.',
        'errors.Is checks the entire error chain.',
        'Always use errors.Is for sentinel error checks.',
      ],
      concepts: ['errors.Is', 'wrapped error comparison', 'error chain'],
    },
    {
      id: 'go-err-14',
      title: 'Error with Context',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Build an error chain with context at each level.',
      skeleton: `package main

import (
    "errors"
    "fmt"
)

func readDB() error {
    return errors.New("connection refused")
}

func getUser(id int) error {
    err := readDB()
    if err != nil {
        // Wrap with context
    }
    return nil
}

func handleRequest() error {
    err := getUser(42)
    if err != nil {
        // Wrap with context
    }
    return nil
}

func main() {
    err := handleRequest()
    if err != nil {
        fmt.Println(err)
    }
}`,
      solution: `package main

import (
    "errors"
    "fmt"
)

func readDB() error {
    return errors.New("connection refused")
}

func getUser(id int) error {
    err := readDB()
    if err != nil {
        return fmt.Errorf("getUser(%d): %w", id, err)
    }
    return nil
}

func handleRequest() error {
    err := getUser(42)
    if err != nil {
        return fmt.Errorf("handleRequest: %w", err)
    }
    return nil
}

func main() {
    err := handleRequest()
    if err != nil {
        fmt.Println(err)
    }
}`,
      hints: [
        'Wrap errors at each level with fmt.Errorf and %w.',
        'Include the function name and relevant context.',
        'The final error message shows the full chain.',
      ],
      concepts: ['error context', 'error wrapping chain', 'debugging info'],
    },
    {
      id: 'go-err-15',
      title: 'Error Unwrap',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement the Unwrap method on a custom error for chain traversal.',
      skeleton: `package main

import (
    "errors"
    "fmt"
)

type RetryError struct {
    Attempts int
    Last     error
}

func (e *RetryError) Error() string {
    return fmt.Sprintf("failed after %d attempts: %s", e.Attempts, e.Last)
}

// Implement Unwrap to expose the wrapped error

func main() {
    base := errors.New("timeout")
    err := &RetryError{Attempts: 3, Last: base}
    fmt.Println(errors.Is(err, base)) // should be true
}`,
      solution: `package main

import (
    "errors"
    "fmt"
)

type RetryError struct {
    Attempts int
    Last     error
}

func (e *RetryError) Error() string {
    return fmt.Sprintf("failed after %d attempts: %s", e.Attempts, e.Last)
}

func (e *RetryError) Unwrap() error {
    return e.Last
}

func main() {
    base := errors.New("timeout")
    err := &RetryError{Attempts: 3, Last: base}
    fmt.Println(errors.Is(err, base)) // true
}`,
      hints: [
        'Unwrap() error enables errors.Is and errors.As to traverse the chain.',
        'Return the wrapped inner error from Unwrap.',
        'func (e *RetryError) Unwrap() error { return e.Last }',
      ],
      concepts: ['Unwrap method', 'error chain', 'errors.Is support'],
    },
    {
      id: 'go-err-16',
      title: 'Retry with Error',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a retry function that returns the last error on failure.',
      skeleton: `package main

import (
    "errors"
    "fmt"
)

func retry(attempts int, fn func() error) error {
    // Call fn up to attempts times, return nil on success or last error
}

func main() {
    calls := 0
    err := retry(3, func() error {
        calls++
        if calls < 3 {
            return errors.New("temporary failure")
        }
        return nil
    })
    fmt.Println(err)   // <nil>
    fmt.Println(calls) // 3
}`,
      solution: `package main

import (
    "errors"
    "fmt"
)

func retry(attempts int, fn func() error) error {
    var lastErr error
    for i := 0; i < attempts; i++ {
        lastErr = fn()
        if lastErr == nil {
            return nil
        }
    }
    return fmt.Errorf("failed after %d attempts: %w", attempts, lastErr)
}

func main() {
    calls := 0
    err := retry(3, func() error {
        calls++
        if calls < 3 {
            return errors.New("temporary failure")
        }
        return nil
    })
    fmt.Println(err)   // <nil>
    fmt.Println(calls) // 3
}`,
      hints: [
        'Loop up to attempts times, calling fn each time.',
        'Return nil immediately on success.',
        'After all attempts, wrap and return the last error.',
      ],
      concepts: ['retry pattern', 'error handling', 'loop'],
    },
    {
      id: 'go-err-17',
      title: 'Panic and Recover',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use recover to catch a panic and convert it to an error.',
      skeleton: `package main

import "fmt"

func safeCall(fn func()) (err error) {
    // Use defer and recover to catch panics
    fn()
    return nil
}

func main() {
    err := safeCall(func() {
        panic("something went wrong")
    })
    fmt.Println("Recovered:", err)
}`,
      solution: `package main

import "fmt"

func safeCall(fn func()) (err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("panic: %v", r)
        }
    }()
    fn()
    return nil
}

func main() {
    err := safeCall(func() {
        panic("something went wrong")
    })
    fmt.Println("Recovered:", err)
}`,
      hints: [
        'Use defer with an anonymous function to call recover.',
        'recover() returns the panic value or nil.',
        'Set the named return err in the deferred function.',
      ],
      concepts: ['panic', 'recover', 'named return', 'defer'],
    },
    {
      id: 'go-err-18',
      title: 'Refactor Error Handling',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor repetitive error handling into a helper.',
      skeleton: `package main

import (
    "fmt"
    "strconv"
)

func process(a, b, c string) (int, error) {
    x, err := strconv.Atoi(a)
    if err != nil {
        return 0, fmt.Errorf("parse a: %w", err)
    }
    y, err := strconv.Atoi(b)
    if err != nil {
        return 0, fmt.Errorf("parse b: %w", err)
    }
    z, err := strconv.Atoi(c)
    if err != nil {
        return 0, fmt.Errorf("parse c: %w", err)
    }
    return x + y + z, nil
}

func main() {
    result, err := process("1", "2", "3")
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(result)
}`,
      solution: `package main

import (
    "fmt"
    "strconv"
)

func parseInts(strs ...string) ([]int, error) {
    result := make([]int, len(strs))
    for i, s := range strs {
        n, err := strconv.Atoi(s)
        if err != nil {
            return nil, fmt.Errorf("parse arg %d (%q): %w", i, s, err)
        }
        result[i] = n
    }
    return result, nil
}

func process(a, b, c string) (int, error) {
    nums, err := parseInts(a, b, c)
    if err != nil {
        return 0, err
    }
    return nums[0] + nums[1] + nums[2], nil
}

func main() {
    result, err := process("1", "2", "3")
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(result)
}`,
      hints: [
        'Extract the repeated parse-and-check pattern into a helper.',
        'The helper can parse multiple strings in a loop.',
        'This reduces duplication and makes error handling consistent.',
      ],
      concepts: ['DRY errors', 'helper function', 'error refactoring'],
    },
    {
      id: 'go-err-19',
      title: 'Refactor to Sentinel Errors',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor string-based error checks to use sentinel errors.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

func findItem(id int) error {
    if id <= 0 {
        return fmt.Errorf("invalid id")
    }
    if id > 1000 {
        return fmt.Errorf("item not found")
    }
    return nil
}

func main() {
    err := findItem(2000)
    if err != nil && strings.Contains(err.Error(), "not found") {
        fmt.Println("Item missing")
    }
}`,
      solution: `package main

import (
    "errors"
    "fmt"
)

var (
    ErrInvalidID  = errors.New("invalid id")
    ErrNotFound   = errors.New("item not found")
)

func findItem(id int) error {
    if id <= 0 {
        return ErrInvalidID
    }
    if id > 1000 {
        return ErrNotFound
    }
    return nil
}

func main() {
    err := findItem(2000)
    if errors.Is(err, ErrNotFound) {
        fmt.Println("Item missing")
    }
}`,
      hints: [
        'Define sentinel errors as package-level variables.',
        'Return them directly instead of creating new error strings.',
        'Check with errors.Is instead of string comparison.',
      ],
      concepts: ['sentinel errors', 'errors.Is', 'error comparison'],
    },
    {
      id: 'go-err-20',
      title: 'Error Type Hierarchy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Create an error type hierarchy with wrapping and type checking.',
      skeleton: `package main

import (
    "errors"
    "fmt"
)

type AppError struct {
    Op      string
    Kind    string
    Err     error
}

func (e *AppError) Error() string {
    return fmt.Sprintf("%s: %s: %s", e.Op, e.Kind, e.Err)
}

// Implement Unwrap

func newAppError(op, kind string, err error) *AppError {
    return &AppError{Op: op, Kind: kind, Err: err}
}

func main() {
    base := errors.New("connection timeout")
    err := newAppError("GetUser", "database", base)
    wrapped := fmt.Errorf("handler: %w", err)

    var appErr *AppError
    if errors.As(wrapped, &appErr) {
        fmt.Printf("Op: %s, Kind: %s\\n", appErr.Op, appErr.Kind)
    }
    fmt.Println(errors.Is(wrapped, base))
}`,
      solution: `package main

import (
    "errors"
    "fmt"
)

type AppError struct {
    Op   string
    Kind string
    Err  error
}

func (e *AppError) Error() string {
    return fmt.Sprintf("%s: %s: %s", e.Op, e.Kind, e.Err)
}

func (e *AppError) Unwrap() error {
    return e.Err
}

func newAppError(op, kind string, err error) *AppError {
    return &AppError{Op: op, Kind: kind, Err: err}
}

func main() {
    base := errors.New("connection timeout")
    err := newAppError("GetUser", "database", base)
    wrapped := fmt.Errorf("handler: %w", err)

    var appErr *AppError
    if errors.As(wrapped, &appErr) {
        fmt.Printf("Op: %s, Kind: %s\\n", appErr.Op, appErr.Kind)
    }
    fmt.Println(errors.Is(wrapped, base))
}`,
      hints: [
        'Implement Unwrap to return e.Err, enabling chain traversal.',
        'errors.As finds the AppError in the chain.',
        'errors.Is can traverse through AppError to find the base error.',
      ],
      concepts: ['error hierarchy', 'Unwrap', 'errors.As', 'errors.Is'],
    },
  ],
};
