import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-ta',
  title: '31. Type Assertions',
  explanation: `## Type Assertions in Go

Type assertions extract the concrete type from an interface value. They are essential for working with interface{}/any values.

\`\`\`go
var i interface{} = "hello"

// Basic assertion (panics if wrong type)
s := i.(string)

// Safe assertion with ok check
s, ok := i.(string)  // ok is true
n, ok := i.(int)     // ok is false, n is zero value

// Common pattern
if s, ok := i.(string); ok {
    fmt.Println("string:", s)
}

// Asserting to an interface
type Stringer interface {
    String() string
}
if str, ok := val.(Stringer); ok {
    fmt.Println(str.String())
}

// Type assertion on error
if pathErr, ok := err.(*os.PathError); ok {
    fmt.Println(pathErr.Path)
}
\`\`\``,
  exercises: [
    {
      id: 'go-ta-1',
      title: 'Basic Type Assertion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Assert an interface value to its concrete type.',
      skeleton: `package main

import "fmt"

func main() {
    var val interface{} = "hello"
    s := val.__BLANK__
    fmt.Println(s)
}`,
      solution: `package main

import "fmt"

func main() {
    var val interface{} = "hello"
    s := val.(string)
    fmt.Println(s)
}`,
      hints: [
        'val.(Type) extracts the concrete type from an interface.',
        'This panics if val does not hold a string.',
        'Use the two-value form for safe assertions.',
      ],
      concepts: ['type assertion', 'interface{}'],
    },
    {
      id: 'go-ta-2',
      title: 'Safe Type Assertion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use the two-value form of type assertion to avoid panics.',
      skeleton: `package main

import "fmt"

func main() {
    var val interface{} = 42
    s, __BLANK__ := val.(string)
    if !ok {
        fmt.Println("not a string")
    } else {
        fmt.Println(s)
    }
}`,
      solution: `package main

import "fmt"

func main() {
    var val interface{} = 42
    s, ok := val.(string)
    if !ok {
        fmt.Println("not a string")
    } else {
        fmt.Println(s)
    }
}`,
      hints: [
        'The second return value ok indicates success.',
        'If ok is false, s is the zero value of string.',
        'This form never panics.',
      ],
      concepts: ['safe assertion', 'comma-ok pattern'],
    },
    {
      id: 'go-ta-3',
      title: 'Assert to Interface',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Assert a value to an interface type to access its methods.',
      skeleton: `package main

import "fmt"

type Stringer interface {
    String() string
}

func PrintIfStringer(val interface{}) {
    if s, ok := val.__BLANK__; ok {
        fmt.Println(s.String())
    }
}`,
      solution: `package main

import "fmt"

type Stringer interface {
    String() string
}

func PrintIfStringer(val interface{}) {
    if s, ok := val.(Stringer); ok {
        fmt.Println(s.String())
    }
}`,
      hints: [
        'You can assert to an interface type, not just concrete types.',
        'This checks if the value implements the interface.',
        'If ok, s has the Stringer interface type with String() available.',
      ],
      concepts: ['interface assertion', 'method access'],
    },
    {
      id: 'go-ta-4',
      title: 'Error Type Assertion',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Assert an error to a specific error type to access additional fields.',
      skeleton: `package main

import (
    "fmt"
    "os"
)

func CheckFile(path string) {
    _, err := os.Open(path)
    if err != nil {
        if pathErr, ok := err.__BLANK__; ok {
            fmt.Println("Operation:", pathErr.Op)
            fmt.Println("Path:", pathErr.Path)
        }
    }
}`,
      solution: `package main

import (
    "fmt"
    "os"
)

func CheckFile(path string) {
    _, err := os.Open(path)
    if err != nil {
        if pathErr, ok := err.(*os.PathError); ok {
            fmt.Println("Operation:", pathErr.Op)
            fmt.Println("Path:", pathErr.Path)
        }
    }
}`,
      hints: [
        'Error types are often pointers, so use *os.PathError.',
        'This gives access to specific error fields.',
        'Always use the safe two-value form.',
      ],
      concepts: ['error type assertion', '*os.PathError'],
    },
    {
      id: 'go-ta-5',
      title: 'Assert any Value',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that extracts an int from an any value safely.',
      skeleton: `package main

// ToInt attempts to extract an int from an any value
// Returns the int and true if successful, 0 and false otherwise
func ToInt(val any) (int, bool) {
}`,
      solution: `package main

func ToInt(val any) (int, bool) {
    n, ok := val.(int)
    return n, ok
}`,
      hints: [
        'any is an alias for interface{}.',
        'Use the comma-ok pattern for safe assertion.',
        'Return the zero value and false on failure.',
      ],
      concepts: ['any type', 'safe extraction'],
    },
    {
      id: 'go-ta-6',
      title: 'Multiple Type Checks',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that describes the type of an interface value.',
      skeleton: `package main

// Describe returns a string describing the type of val
// Handle: string, int, float64, bool, default "unknown"
func Describe(val interface{}) string {
}`,
      solution: `package main

import "fmt"

func Describe(val interface{}) string {
    if s, ok := val.(string); ok {
        return fmt.Sprintf("string: %q", s)
    }
    if n, ok := val.(int); ok {
        return fmt.Sprintf("int: %d", n)
    }
    if f, ok := val.(float64); ok {
        return fmt.Sprintf("float64: %f", f)
    }
    if b, ok := val.(bool); ok {
        return fmt.Sprintf("bool: %t", b)
    }
    return "unknown"
}`,
      hints: [
        'Chain if statements with type assertions.',
        'Check each possible type with the comma-ok pattern.',
        'A type switch (next section) is more elegant for this.',
      ],
      concepts: ['multiple assertions', 'type checking'],
    },
    {
      id: 'go-ta-7',
      title: 'Assert Slice Element',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that extracts string values from a slice of interfaces.',
      skeleton: `package main

// ExtractStrings returns only the string values from a mixed slice
func ExtractStrings(vals []interface{}) []string {
}`,
      solution: `package main

func ExtractStrings(vals []interface{}) []string {
    var result []string
    for _, v := range vals {
        if s, ok := v.(string); ok {
            result = append(result, s)
        }
    }
    return result
}`,
      hints: [
        'Iterate over the slice and assert each element.',
        'Only include elements that are actually strings.',
        'Skip non-string elements silently.',
      ],
      concepts: ['slice iteration', 'selective extraction'],
    },
    {
      id: 'go-ta-8',
      title: 'Nested Interface Assertion',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Extract a deeply nested value from a map[string]interface{}.',
      skeleton: `package main

// GetNestedString extracts a string at path ["key1"]["key2"] from a nested map
// Returns the string and true if found, "" and false otherwise
func GetNestedString(data map[string]interface{}, key1, key2 string) (string, bool) {
}`,
      solution: `package main

func GetNestedString(data map[string]interface{}, key1, key2 string) (string, bool) {
    inner, ok := data[key1]
    if !ok {
        return "", false
    }
    innerMap, ok := inner.(map[string]interface{})
    if !ok {
        return "", false
    }
    val, ok := innerMap[key2]
    if !ok {
        return "", false
    }
    s, ok := val.(string)
    return s, ok
}`,
      hints: [
        'Assert each level: first to map[string]interface{}, then to string.',
        'Check ok at each step to handle missing or wrong types.',
        'This pattern is common when working with untyped JSON.',
      ],
      concepts: ['nested assertions', 'map access', 'dynamic JSON'],
    },
    {
      id: 'go-ta-9',
      title: 'Write Type-Safe Wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a helper that asserts and converts interface values with error reporting.',
      skeleton: `package main

import "fmt"

// AssertString asserts val is a string, returns error with context if not
func AssertString(val interface{}, fieldName string) (string, error) {
}`,
      solution: `package main

import "fmt"

func AssertString(val interface{}, fieldName string) (string, error) {
    s, ok := val.(string)
    if !ok {
        return "", fmt.Errorf("field %q: expected string, got %T", fieldName, val)
    }
    return s, nil
}`,
      hints: [
        'Use %T to include the actual type in the error message.',
        'The field name helps identify which value failed.',
        'This is much better than a bare panic.',
      ],
      concepts: ['error reporting', '%T format', 'safe assertion'],
    },
    {
      id: 'go-ta-10',
      title: 'Assert to Custom Interface',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Check if a value implements a custom interface and call its method.',
      skeleton: `package main

type Sizer interface {
    Size() int
}

// GetSize returns the size if val implements Sizer, -1 otherwise
func GetSize(val interface{}) int {
}`,
      solution: `package main

type Sizer interface {
    Size() int
}

func GetSize(val interface{}) int {
    if s, ok := val.(Sizer); ok {
        return s.Size()
    }
    return -1
}`,
      hints: [
        'Assert to the interface type, not a concrete type.',
        'If the value implements Sizer, call its Size method.',
        'Return a sentinel value (-1) if not implemented.',
      ],
      concepts: ['interface assertion', 'duck typing'],
    },
    {
      id: 'go-ta-11',
      title: 'Predict Panic on Wrong Type',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict what happens with a wrong type assertion.',
      skeleton: `package main

func main() {
    var val interface{} = "hello"
    n := val.(int)
    _ = n
}

// What happens?
// A) n is 0
// B) n is "hello"
// C) Panic: interface conversion
// D) Compilation error`,
      solution: `C) Panic: interface conversion`,
      hints: [
        'Single-value type assertion panics on wrong type.',
        'val holds a string, not an int.',
        'Use the two-value form to avoid panics.',
      ],
      concepts: ['panic on assertion', 'type mismatch'],
    },
    {
      id: 'go-ta-12',
      title: 'Predict Safe Assertion',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the result of a safe type assertion on the wrong type.',
      skeleton: `package main

import "fmt"

func main() {
    var val interface{} = "hello"
    n, ok := val.(int)
    fmt.Println(n, ok)
}`,
      solution: `0 false`,
      hints: [
        'The safe form returns the zero value and false.',
        'int zero value is 0.',
        'No panic occurs with the two-value form.',
      ],
      concepts: ['safe assertion', 'zero value on failure'],
    },
    {
      id: 'go-ta-13',
      title: 'Predict Nil Assertion',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict what happens when asserting on a nil interface.',
      skeleton: `package main

import "fmt"

func main() {
    var val interface{} = nil
    s, ok := val.(string)
    fmt.Printf("%q %t\\n", s, ok)
}`,
      solution: `"" false`,
      hints: [
        'nil interface does not hold any type.',
        'Any assertion on nil returns zero value and false.',
        'This is safe with the two-value form.',
      ],
      concepts: ['nil interface', 'assertion on nil'],
    },
    {
      id: 'go-ta-14',
      title: 'Fix Unsafe Assertion',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the code that panics on type assertion failure.',
      skeleton: `package main

import "fmt"

func PrintName(val interface{}) {
    name := val.(string)
    fmt.Println("Name:", name)
}`,
      solution: `package main

import "fmt"

func PrintName(val interface{}) {
    name, ok := val.(string)
    if !ok {
        fmt.Println("Name: unknown")
        return
    }
    fmt.Println("Name:", name)
}`,
      hints: [
        'Use the two-value form to avoid panics.',
        'Handle the case where the assertion fails.',
        'Provide a default value or error message.',
      ],
      concepts: ['safe assertion', 'panic prevention'],
    },
    {
      id: 'go-ta-15',
      title: 'Fix Pointer vs Value Assertion',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the type assertion that uses the wrong type (pointer vs value).',
      skeleton: `package main

import "fmt"

type MyError struct {
    Code    int
    Message string
}

func (e *MyError) Error() string {
    return e.Message
}

func HandleError(err error) {
    if myErr, ok := err.(MyError); ok {
        fmt.Println("Code:", myErr.Code)
    }
}`,
      solution: `package main

import "fmt"

type MyError struct {
    Code    int
    Message string
}

func (e *MyError) Error() string {
    return e.Message
}

func HandleError(err error) {
    if myErr, ok := err.(*MyError); ok {
        fmt.Println("Code:", myErr.Code)
    }
}`,
      hints: [
        'The Error method is on *MyError (pointer receiver).',
        'The interface holds *MyError, not MyError.',
        'Assert to *MyError with the * prefix.',
      ],
      concepts: ['pointer receiver', 'pointer assertion'],
    },
    {
      id: 'go-ta-16',
      title: 'Fix Assertion on Non-Interface',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix code that tries to type-assert on a non-interface type.',
      skeleton: `package main

import "fmt"

func Process(val string) {
    if n, ok := val.(int); ok {
        fmt.Println("number:", n)
    } else {
        fmt.Println("string:", val)
    }
}`,
      solution: `package main

import (
    "fmt"
    "strconv"
)

func Process(val string) {
    if n, err := strconv.Atoi(val); err == nil {
        fmt.Println("number:", n)
    } else {
        fmt.Println("string:", val)
    }
}`,
      hints: [
        'Type assertions only work on interface types.',
        'val is already a string, not an interface.',
        'Use strconv.Atoi to convert a string to int.',
      ],
      concepts: ['interface requirement', 'strconv.Atoi'],
    },
    {
      id: 'go-ta-17',
      title: 'Write JSON Field Extractor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a function that safely extracts a typed field from parsed JSON.',
      skeleton: `package main

import "encoding/json"

// GetJSONField extracts field as a specific type from JSON bytes
// Example: GetJSONField(data, "name") returns the string value
func GetJSONString(data []byte, field string) (string, error) {
}`,
      solution: `package main

import (
    "encoding/json"
    "fmt"
)

func GetJSONString(data []byte, field string) (string, error) {
    var m map[string]interface{}
    if err := json.Unmarshal(data, &m); err != nil {
        return "", err
    }
    val, exists := m[field]
    if !exists {
        return "", fmt.Errorf("field %q not found", field)
    }
    s, ok := val.(string)
    if !ok {
        return "", fmt.Errorf("field %q is %T, not string", field, val)
    }
    return s, nil
}`,
      hints: [
        'Unmarshal into map[string]interface{} for dynamic access.',
        'Check both existence and type.',
        'Use %T to report the actual type in error messages.',
      ],
      concepts: ['JSON extraction', 'type assertion chain'],
    },
    {
      id: 'go-ta-18',
      title: 'Write Interface Compliance Check',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that checks if a value implements multiple interfaces.',
      skeleton: `package main

type Reader interface { Read() }
type Writer interface { Write() }
type Closer interface { Close() }

// Capabilities returns which interfaces val implements
// Returns a slice like ["Reader", "Writer"]
func Capabilities(val interface{}) []string {
}`,
      solution: `package main

type Reader interface { Read() }
type Writer interface { Write() }
type Closer interface { Close() }

func Capabilities(val interface{}) []string {
    var caps []string
    if _, ok := val.(Reader); ok {
        caps = append(caps, "Reader")
    }
    if _, ok := val.(Writer); ok {
        caps = append(caps, "Writer")
    }
    if _, ok := val.(Closer); ok {
        caps = append(caps, "Closer")
    }
    return caps
}`,
      hints: [
        'Check each interface separately with assertions.',
        'Use _ to discard the typed value when you only need the check.',
        'Build a list of implemented interfaces.',
      ],
      concepts: ['interface checking', 'capability discovery'],
    },
    {
      id: 'go-ta-19',
      title: 'Refactor Assertion Chain to Switch',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor a series of type assertions into a cleaner pattern.',
      skeleton: `package main

import "fmt"

func Format(val interface{}) string {
    if s, ok := val.(string); ok {
        return fmt.Sprintf("%q", s)
    }
    if n, ok := val.(int); ok {
        return fmt.Sprintf("%d", n)
    }
    if f, ok := val.(float64); ok {
        return fmt.Sprintf("%.2f", f)
    }
    if b, ok := val.(bool); ok {
        return fmt.Sprintf("%t", b)
    }
    return "unknown"
}`,
      solution: `package main

import "fmt"

func Format(val interface{}) string {
    switch v := val.(type) {
    case string:
        return fmt.Sprintf("%q", v)
    case int:
        return fmt.Sprintf("%d", v)
    case float64:
        return fmt.Sprintf("%.2f", v)
    case bool:
        return fmt.Sprintf("%t", v)
    default:
        return "unknown"
    }
}`,
      hints: [
        'A type switch is cleaner than chained assertions.',
        'switch v := val.(type) tests and assigns in one step.',
        'Each case has v typed to the matched type.',
      ],
      concepts: ['type switch', 'refactoring assertions'],
    },
    {
      id: 'go-ta-20',
      title: 'Refactor to errors.As',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor a type assertion on error to use errors.As for wrapped error support.',
      skeleton: `package main

import (
    "fmt"
    "os"
)

func HandleError(err error) {
    if pathErr, ok := err.(*os.PathError); ok {
        fmt.Println("Path:", pathErr.Path)
    } else {
        fmt.Println("Error:", err)
    }
}`,
      solution: `package main

import (
    "errors"
    "fmt"
    "os"
)

func HandleError(err error) {
    var pathErr *os.PathError
    if errors.As(err, &pathErr) {
        fmt.Println("Path:", pathErr.Path)
    } else {
        fmt.Println("Error:", err)
    }
}`,
      hints: [
        'errors.As unwraps errors and checks the target type.',
        'It handles wrapped errors that type assertions miss.',
        'Pass a pointer to the target variable.',
      ],
      concepts: ['errors.As', 'wrapped errors', 'error unwrapping'],
    },
  ],
};
