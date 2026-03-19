import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-tsw',
  title: '32. Type Switches',
  explanation: `## Type Switches in Go

Type switches let you branch based on the concrete type of an interface value. They are the multi-branch counterpart to type assertions.

\`\`\`go
// Basic type switch
func describe(i interface{}) string {
    switch v := i.(type) {
    case int:
        return fmt.Sprintf("integer: %d", v)
    case string:
        return fmt.Sprintf("string: %q", v)
    case bool:
        return fmt.Sprintf("boolean: %t", v)
    default:
        return fmt.Sprintf("unknown: %T", v)
    }
}

// Multiple types per case
switch v := i.(type) {
case int, int64:
    // v is interface{} here (not int or int64)
    fmt.Println("some integer")
case string:
    // v is string here
    fmt.Println(v)
}

// Nil case
switch i.(type) {
case nil:
    fmt.Println("nil value")
}

// Without variable binding
switch i.(type) {
case int:
    fmt.Println("it's an int")
}
\`\`\`

Key points:
- \`v := i.(type)\` binds the concrete value in single-type cases
- Multi-type cases keep the interface type for \`v\`
- The \`nil\` case matches when the interface is nil
- No \`fallthrough\` is allowed in type switches
- \`default\` matches any unmatched type`,
  exercises: [
    {
      id: 'go-tsw-1',
      title: 'Basic Type Switch',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Complete a basic type switch statement.',
      skeleton: `package main

import "fmt"

func classify(i interface{}) string {
    switch __BLANK__ {
    case int:
        return "integer"
    case string:
        return "string"
    default:
        return "other"
    }
}

func main() {
    fmt.Println(classify(42))
    fmt.Println(classify("hi"))
}`,
      solution: `package main

import "fmt"

func classify(i interface{}) string {
    switch i.(type) {
    case int:
        return "integer"
    case string:
        return "string"
    default:
        return "other"
    }
}

func main() {
    fmt.Println(classify(42))
    fmt.Println(classify("hi"))
}`,
      hints: [
        'Type switches use a special syntax with .(type).',
        'The switch expression should be i.(type).',
        'This checks the concrete type stored in the interface.',
      ],
      concepts: ['type switch', 'interface{}'],
    },
    {
      id: 'go-tsw-2',
      title: 'Type Switch with Binding',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Bind the concrete value in a type switch.',
      skeleton: `package main

import "fmt"

func describe(i interface{}) string {
    switch __BLANK__ := i.(type) {
    case int:
        return fmt.Sprintf("int: %d", v)
    case string:
        return fmt.Sprintf("str: %s", v)
    default:
        return fmt.Sprintf("type: %T", v)
    }
}

func main() {
    fmt.Println(describe(10))
    fmt.Println(describe("go"))
}`,
      solution: `package main

import "fmt"

func describe(i interface{}) string {
    switch v := i.(type) {
    case int:
        return fmt.Sprintf("int: %d", v)
    case string:
        return fmt.Sprintf("str: %s", v)
    default:
        return fmt.Sprintf("type: %T", v)
    }
}

func main() {
    fmt.Println(describe(10))
    fmt.Println(describe("go"))
}`,
      hints: [
        'You can bind the concrete value with v := i.(type).',
        'In each case, v has the concrete type for that case.',
        'In the default case, v retains the interface type.',
      ],
      concepts: ['type switch', 'variable binding'],
    },
    {
      id: 'go-tsw-3',
      title: 'Nil Case in Type Switch',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Handle nil values in a type switch.',
      skeleton: `package main

import "fmt"

func check(i interface{}) string {
    switch i.(type) {
    case __BLANK__:
        return "nil"
    case int:
        return "int"
    default:
        return "other"
    }
}

func main() {
    fmt.Println(check(nil))
    fmt.Println(check(5))
}`,
      solution: `package main

import "fmt"

func check(i interface{}) string {
    switch i.(type) {
    case nil:
        return "nil"
    case int:
        return "int"
    default:
        return "other"
    }
}

func main() {
    fmt.Println(check(nil))
    fmt.Println(check(5))
}`,
      hints: [
        'Use the nil keyword as a case in a type switch.',
        'nil matches when the interface value is nil.',
        'A nil interface has no concrete type.',
      ],
      concepts: ['type switch', 'nil', 'interface{}'],
    },
    {
      id: 'go-tsw-4',
      title: 'Multiple Types per Case',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Match multiple types in a single case.',
      skeleton: `package main

import "fmt"

func isNumeric(i interface{}) bool {
    switch i.(type) {
    case int, __BLANK__, float64:
        return true
    default:
        return false
    }
}

func main() {
    fmt.Println(isNumeric(42))
    fmt.Println(isNumeric(int64(100)))
    fmt.Println(isNumeric("no"))
}`,
      solution: `package main

import "fmt"

func isNumeric(i interface{}) bool {
    switch i.(type) {
    case int, int64, float64:
        return true
    default:
        return false
    }
}

func main() {
    fmt.Println(isNumeric(42))
    fmt.Println(isNumeric(int64(100)))
    fmt.Println(isNumeric("no"))
}`,
      hints: [
        'You can list multiple types separated by commas in a case.',
        'int64 is a distinct type from int in Go.',
        'When multiple types are listed, the bound variable has interface{} type.',
      ],
      concepts: ['type switch', 'multiple types', 'numeric types'],
    },
    {
      id: 'go-tsw-5',
      title: 'Default Case Handling',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use the default case to handle unknown types.',
      skeleton: `package main

import "fmt"

func typeName(i interface{}) string {
    switch i.(type) {
    case int:
        return "int"
    case string:
        return "string"
    case bool:
        return "bool"
    __BLANK__:
        return fmt.Sprintf("unknown(%T)", i)
    }
}

func main() {
    fmt.Println(typeName(3.14))
}`,
      solution: `package main

import "fmt"

func typeName(i interface{}) string {
    switch i.(type) {
    case int:
        return "int"
    case string:
        return "string"
    case bool:
        return "bool"
    default:
        return fmt.Sprintf("unknown(%T)", i)
    }
}

func main() {
    fmt.Println(typeName(3.14))
}`,
      hints: [
        'The default keyword catches all unmatched types.',
        'default works the same as in regular switch statements.',
        'Use %T to print the type of a value.',
      ],
      concepts: ['type switch', 'default case'],
    },
    {
      id: 'go-tsw-6',
      title: 'Type Switch with Interface Check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use a type switch to check if a value implements an interface.',
      skeleton: `package main

import "fmt"

type Stringer interface {
    String() string
}

type Name struct {
    First, Last string
}

func (n Name) String() string {
    return n.First + " " + n.Last
}

func display(i interface{}) string {
    switch v := i.(type) {
    case __BLANK__:
        return v.String()
    case string:
        return v
    default:
        return fmt.Sprintf("%v", v)
    }
}

func main() {
    fmt.Println(display(Name{"Go", "Lang"}))
}`,
      solution: `package main

import "fmt"

type Stringer interface {
    String() string
}

type Name struct {
    First, Last string
}

func (n Name) String() string {
    return n.First + " " + n.Last
}

func display(i interface{}) string {
    switch v := i.(type) {
    case Stringer:
        return v.String()
    case string:
        return v
    default:
        return fmt.Sprintf("%v", v)
    }
}

func main() {
    fmt.Println(display(Name{"Go", "Lang"}))
}`,
      hints: [
        'You can use interface types in type switch cases.',
        'If the value implements the interface, that case matches.',
        'The bound variable v will have the interface type in that case.',
      ],
      concepts: ['type switch', 'interface implementation'],
    },
    {
      id: 'go-tsw-7',
      title: 'Type Switch Predict Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the output of a type switch.',
      skeleton: `package main

import "fmt"

func what(i interface{}) string {
    switch i.(type) {
    case int:
        return "int"
    case float64:
        return "float64"
    case string:
        return "string"
    default:
        return "unknown"
    }
}

func main() {
    fmt.Println(what(42))
    fmt.Println(what(3.14))
    fmt.Println(what(true))
}`,
      solution: `int
float64
unknown`,
      hints: [
        '42 is an untyped int literal; it becomes int.',
        '3.14 is an untyped float literal; it becomes float64.',
        'bool is not matched by any case, so default runs.',
      ],
      concepts: ['type switch', 'default types'],
    },
    {
      id: 'go-tsw-8',
      title: 'Multi-Type Case Predict',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict behavior when multiple types share a case.',
      skeleton: `package main

import "fmt"

func size(i interface{}) string {
    switch v := i.(type) {
    case int, int64:
        // v is interface{} here
        return fmt.Sprintf("integer(%T)", v)
    case string:
        return fmt.Sprintf("string(len=%d)", len(v))
    default:
        return "other"
    }
}

func main() {
    fmt.Println(size(42))
    fmt.Println(size("hello"))
}`,
      solution: `integer(int)
string(len=5)`,
      hints: [
        'When multiple types share a case, v is interface{}.',
        '%T still prints the dynamic type.',
        'len("hello") is 5.',
      ],
      concepts: ['type switch', 'multi-type case', 'fmt.Sprintf'],
    },
    {
      id: 'go-tsw-9',
      title: 'Nil Interface Predict',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict output for nil interface in type switch.',
      skeleton: `package main

import "fmt"

func check(i interface{}) string {
    switch i.(type) {
    case nil:
        return "nil"
    case int:
        return "int"
    default:
        return "other"
    }
}

func main() {
    var x interface{}
    fmt.Println(check(x))
    fmt.Println(check(0))
}`,
      solution: `nil
int`,
      hints: [
        'An uninitialized interface{} variable is nil.',
        'The nil case matches nil interface values.',
        '0 is an int, so the int case matches.',
      ],
      concepts: ['type switch', 'nil interface', 'zero value'],
    },
    {
      id: 'go-tsw-10',
      title: 'Type Switch for Errors',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that classifies errors using a type switch.',
      skeleton: `package main

import (
    "fmt"
    "net"
    "os"
)

// classifyError returns "network", "file", or "general"
// based on the concrete error type.
func classifyError(err error) string {
    // TODO: implement using type switch
}

func main() {
    fmt.Println(classifyError(&net.OpError{Op: "read"}))
    fmt.Println(classifyError(&os.PathError{Op: "open", Path: "/tmp"}))
    fmt.Println(classifyError(fmt.Errorf("general")))
}`,
      solution: `package main

import (
    "fmt"
    "net"
    "os"
)

func classifyError(err error) string {
    switch err.(type) {
    case *net.OpError:
        return "network"
    case *os.PathError:
        return "file"
    default:
        return "general"
    }
}

func main() {
    fmt.Println(classifyError(&net.OpError{Op: "read"}))
    fmt.Println(classifyError(&os.PathError{Op: "open", Path: "/tmp"}))
    fmt.Println(classifyError(fmt.Errorf("general")))
}`,
      hints: [
        'Use a type switch on the error interface.',
        'net.OpError and os.PathError are pointer types.',
        'The default case handles generic errors.',
      ],
      concepts: ['type switch', 'error handling', 'net', 'os'],
    },
    {
      id: 'go-tsw-11',
      title: 'Shape Area Calculator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that calculates area using a type switch over shape types.',
      skeleton: `package main

import (
    "fmt"
    "math"
)

type Circle struct{ Radius float64 }
type Rectangle struct{ Width, Height float64 }
type Triangle struct{ Base, Height float64 }

// area returns the area of a shape using a type switch.
// Returns 0 for unknown shapes.
func area(shape interface{}) float64 {
    // TODO: implement
}

func main() {
    fmt.Printf("%.2f\\n", area(Circle{5}))
    fmt.Printf("%.2f\\n", area(Rectangle{3, 4}))
    fmt.Printf("%.2f\\n", area(Triangle{6, 3}))
}`,
      solution: `package main

import (
    "fmt"
    "math"
)

type Circle struct{ Radius float64 }
type Rectangle struct{ Width, Height float64 }
type Triangle struct{ Base, Height float64 }

func area(shape interface{}) float64 {
    switch s := shape.(type) {
    case Circle:
        return math.Pi * s.Radius * s.Radius
    case Rectangle:
        return s.Width * s.Height
    case Triangle:
        return 0.5 * s.Base * s.Height
    default:
        return 0
    }
}

func main() {
    fmt.Printf("%.2f\\n", area(Circle{5}))
    fmt.Printf("%.2f\\n", area(Rectangle{3, 4}))
    fmt.Printf("%.2f\\n", area(Triangle{6, 3}))
}`,
      hints: [
        'Use switch s := shape.(type) to bind the concrete value.',
        'Circle area = Pi * r^2.',
        'Triangle area = 0.5 * base * height.',
      ],
      concepts: ['type switch', 'structs', 'math'],
    },
    {
      id: 'go-tsw-12',
      title: 'JSON Value Classifier',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that classifies JSON-decoded values by type.',
      skeleton: `package main

import "fmt"

// classifyJSON takes a value from json.Unmarshal (into interface{})
// and returns: "number", "string", "bool", "null", "array", "object", or "unknown"
func classifyJSON(v interface{}) string {
    // TODO: implement using type switch
    // JSON numbers decode to float64
    // JSON arrays decode to []interface{}
    // JSON objects decode to map[string]interface{}
}

func main() {
    fmt.Println(classifyJSON(3.14))
    fmt.Println(classifyJSON("hello"))
    fmt.Println(classifyJSON(true))
    fmt.Println(classifyJSON(nil))
    fmt.Println(classifyJSON([]interface{}{1, 2}))
    fmt.Println(classifyJSON(map[string]interface{}{"a": 1}))
}`,
      solution: `package main

import "fmt"

func classifyJSON(v interface{}) string {
    switch v.(type) {
    case float64:
        return "number"
    case string:
        return "string"
    case bool:
        return "bool"
    case nil:
        return "null"
    case []interface{}:
        return "array"
    case map[string]interface{}:
        return "object"
    default:
        return "unknown"
    }
}

func main() {
    fmt.Println(classifyJSON(3.14))
    fmt.Println(classifyJSON("hello"))
    fmt.Println(classifyJSON(true))
    fmt.Println(classifyJSON(nil))
    fmt.Println(classifyJSON([]interface{}{1, 2}))
    fmt.Println(classifyJSON(map[string]interface{}{"a": 1}))
}`,
      hints: [
        'JSON numbers always decode to float64 in Go.',
        'JSON arrays become []interface{}.',
        'JSON objects become map[string]interface{}.',
      ],
      concepts: ['type switch', 'JSON', 'interface{}'],
    },
    {
      id: 'go-tsw-13',
      title: 'Fix Wrong Type Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the type switch where a broader interface shadows specific types.',
      skeleton: `package main

import "fmt"

type Animal interface {
    Sound() string
}

type Dog struct{ Name string }
func (d Dog) Sound() string { return "woof" }

type Cat struct{ Name string }
func (c Cat) Sound() string { return "meow" }

func greet(i interface{}) string {
    // BUG: Dog and Cat cases are never reached
    switch v := i.(type) {
    case Animal:
        return "Animal: " + v.Sound()
    case Dog:
        return "Dog: " + v.Name
    case Cat:
        return "Cat: " + v.Name
    default:
        return "unknown"
    }
}

func main() {
    fmt.Println(greet(Dog{"Rex"}))
    fmt.Println(greet(Cat{"Whiskers"}))
}`,
      solution: `package main

import "fmt"

type Animal interface {
    Sound() string
}

type Dog struct{ Name string }
func (d Dog) Sound() string { return "woof" }

type Cat struct{ Name string }
func (c Cat) Sound() string { return "meow" }

func greet(i interface{}) string {
    switch v := i.(type) {
    case Dog:
        return "Dog: " + v.Name
    case Cat:
        return "Cat: " + v.Name
    case Animal:
        return "Animal: " + v.Sound()
    default:
        return "unknown"
    }
}

func main() {
    fmt.Println(greet(Dog{"Rex"}))
    fmt.Println(greet(Cat{"Whiskers"}))
}`,
      hints: [
        'In type switches, more specific types should come before interfaces.',
        'Dog and Cat both implement Animal, so Animal matches first.',
        'Reorder the cases: concrete types before interface types.',
      ],
      concepts: ['type switch', 'case ordering', 'interface'],
    },
    {
      id: 'go-tsw-14',
      title: 'Fix Fallthrough Error',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the illegal fallthrough in a type switch.',
      skeleton: `package main

import "fmt"

func describe(i interface{}) string {
    switch v := i.(type) {
    case int:
        if v < 0 {
            fallthrough
        }
        return fmt.Sprintf("positive int: %d", v)
    case string:
        return fmt.Sprintf("string: %s", v)
    default:
        return "other"
    }
}

func main() {
    fmt.Println(describe(-5))
    fmt.Println(describe(10))
}`,
      solution: `package main

import "fmt"

func describe(i interface{}) string {
    switch v := i.(type) {
    case int:
        if v < 0 {
            return fmt.Sprintf("negative int: %d", v)
        }
        return fmt.Sprintf("positive int: %d", v)
    case string:
        return fmt.Sprintf("string: %s", v)
    default:
        return "other"
    }
}

func main() {
    fmt.Println(describe(-5))
    fmt.Println(describe(10))
}`,
      hints: [
        'fallthrough is not allowed in type switch statements.',
        'Replace fallthrough with explicit logic.',
        'Use an if-else inside the case instead.',
      ],
      concepts: ['type switch', 'fallthrough', 'compilation error'],
    },
    {
      id: 'go-tsw-15',
      title: 'Fix Missing Pointer Type',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix a type switch that fails to match pointer receiver types.',
      skeleton: `package main

import "fmt"

type Validator interface {
    Validate() error
}

type Email struct{ Address string }

func (e *Email) Validate() error {
    if e.Address == "" {
        return fmt.Errorf("empty email")
    }
    return nil
}

func process(v interface{}) string {
    // BUG: Email case never matches
    switch val := v.(type) {
    case Email:
        if err := val.Validate(); err != nil {
            return "invalid"
        }
        return "valid"
    default:
        return "unknown"
    }
}

func main() {
    fmt.Println(process(&Email{"test@go.dev"}))
}`,
      solution: `package main

import "fmt"

type Validator interface {
    Validate() error
}

type Email struct{ Address string }

func (e *Email) Validate() error {
    if e.Address == "" {
        return fmt.Errorf("empty email")
    }
    return nil
}

func process(v interface{}) string {
    switch val := v.(type) {
    case *Email:
        if err := val.Validate(); err != nil {
            return "invalid"
        }
        return "valid"
    default:
        return "unknown"
    }
}

func main() {
    fmt.Println(process(&Email{"test@go.dev"}))
}`,
      hints: [
        'The value passed is &Email{}, which is *Email, not Email.',
        'Pointer receivers mean the pointer type implements the interface.',
        'Change the case to match *Email instead of Email.',
      ],
      concepts: ['type switch', 'pointer types', 'method sets'],
    },
    {
      id: 'go-tsw-16',
      title: 'Expression Evaluator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write an expression evaluator using type switch over AST node types.',
      skeleton: `package main

import "fmt"

type Expr interface{}

type Num struct{ Value float64 }
type Add struct{ Left, Right Expr }
type Mul struct{ Left, Right Expr }

// eval evaluates an expression tree recursively.
// Returns 0 for unknown node types.
func eval(e Expr) float64 {
    // TODO: implement using type switch
}

func main() {
    expr := Add{
        Left:  Num{3},
        Right: Mul{Left: Num{4}, Right: Num{5}},
    }
    fmt.Println(eval(expr)) // 23
}`,
      solution: `package main

import "fmt"

type Expr interface{}

type Num struct{ Value float64 }
type Add struct{ Left, Right Expr }
type Mul struct{ Left, Right Expr }

func eval(e Expr) float64 {
    switch node := e.(type) {
    case Num:
        return node.Value
    case Add:
        return eval(node.Left) + eval(node.Right)
    case Mul:
        return eval(node.Left) * eval(node.Right)
    default:
        return 0
    }
}

func main() {
    expr := Add{
        Left:  Num{3},
        Right: Mul{Left: Num{4}, Right: Num{5}},
    }
    fmt.Println(eval(expr)) // 23
}`,
      hints: [
        'Use a type switch to handle each node type.',
        'Recursively evaluate Add and Mul children.',
        'Num is the base case returning its Value.',
      ],
      concepts: ['type switch', 'recursion', 'AST', 'expression evaluation'],
    },
    {
      id: 'go-tsw-17',
      title: 'Event Handler Dispatch',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write an event handler dispatcher using type switches.',
      skeleton: `package main

import "fmt"

type Event interface{}

type ClickEvent struct{ X, Y int }
type KeyEvent struct{ Key string }
type ResizeEvent struct{ Width, Height int }
type CloseEvent struct{}

// handleEvent returns a description of how the event was handled.
func handleEvent(e Event) string {
    // TODO: implement
}

func main() {
    events := []Event{
        ClickEvent{100, 200},
        KeyEvent{"Enter"},
        ResizeEvent{1920, 1080},
        CloseEvent{},
    }
    for _, e := range events {
        fmt.Println(handleEvent(e))
    }
}`,
      solution: `package main

import "fmt"

type Event interface{}

type ClickEvent struct{ X, Y int }
type KeyEvent struct{ Key string }
type ResizeEvent struct{ Width, Height int }
type CloseEvent struct{}

func handleEvent(e Event) string {
    switch ev := e.(type) {
    case ClickEvent:
        return fmt.Sprintf("clicked at (%d, %d)", ev.X, ev.Y)
    case KeyEvent:
        return fmt.Sprintf("key pressed: %s", ev.Key)
    case ResizeEvent:
        return fmt.Sprintf("resized to %dx%d", ev.Width, ev.Height)
    case CloseEvent:
        return "window closed"
    default:
        return "unknown event"
    }
}

func main() {
    events := []Event{
        ClickEvent{100, 200},
        KeyEvent{"Enter"},
        ResizeEvent{1920, 1080},
        CloseEvent{},
    }
    for _, e := range events {
        fmt.Println(handleEvent(e))
    }
}`,
      hints: [
        'Use a type switch to dispatch on the concrete event type.',
        'Bind the concrete value to access event-specific fields.',
        'Use fmt.Sprintf to format the response strings.',
      ],
      concepts: ['type switch', 'event handling', 'dispatch'],
    },
    {
      id: 'go-tsw-18',
      title: 'Refactor Chain of Type Assertions',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor a chain of if/else type assertions into a type switch.',
      skeleton: `package main

import "fmt"

func format(v interface{}) string {
    if s, ok := v.(string); ok {
        return fmt.Sprintf("%q", s)
    } else if n, ok := v.(int); ok {
        return fmt.Sprintf("%d", n)
    } else if f, ok := v.(float64); ok {
        return fmt.Sprintf("%.2f", f)
    } else if b, ok := v.(bool); ok {
        return fmt.Sprintf("%t", b)
    } else {
        return fmt.Sprintf("%v", v)
    }
}

func main() {
    fmt.Println(format("hello"))
    fmt.Println(format(42))
    fmt.Println(format(3.14))
    fmt.Println(format(true))
}`,
      solution: `package main

import "fmt"

func format(v interface{}) string {
    switch val := v.(type) {
    case string:
        return fmt.Sprintf("%q", val)
    case int:
        return fmt.Sprintf("%d", val)
    case float64:
        return fmt.Sprintf("%.2f", val)
    case bool:
        return fmt.Sprintf("%t", val)
    default:
        return fmt.Sprintf("%v", val)
    }
}

func main() {
    fmt.Println(format("hello"))
    fmt.Println(format(42))
    fmt.Println(format(3.14))
    fmt.Println(format(true))
}`,
      hints: [
        'Replace the if/else chain with a type switch.',
        'Use switch val := v.(type) for binding.',
        'Each if/else becomes a case clause.',
      ],
      concepts: ['type switch', 'refactoring', 'type assertion'],
    },
    {
      id: 'go-tsw-19',
      title: 'Refactor to Combined Cases',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor redundant type switch cases into combined multi-type cases.',
      skeleton: `package main

import "fmt"

func sizeOf(v interface{}) int {
    switch v.(type) {
    case int8:
        return 1
    case uint8:
        return 1
    case int16:
        return 2
    case uint16:
        return 2
    case int32:
        return 4
    case uint32:
        return 4
    case float32:
        return 4
    case int64:
        return 8
    case uint64:
        return 8
    case float64:
        return 8
    default:
        return -1
    }
}

func main() {
    fmt.Println(sizeOf(int8(1)))
    fmt.Println(sizeOf(float64(1.0)))
}`,
      solution: `package main

import "fmt"

func sizeOf(v interface{}) int {
    switch v.(type) {
    case int8, uint8:
        return 1
    case int16, uint16:
        return 2
    case int32, uint32, float32:
        return 4
    case int64, uint64, float64:
        return 8
    default:
        return -1
    }
}

func main() {
    fmt.Println(sizeOf(int8(1)))
    fmt.Println(sizeOf(float64(1.0)))
}`,
      hints: [
        'Types with the same return value can be combined into one case.',
        'Separate types in a case with commas.',
        'Group by size: 1-byte, 2-byte, 4-byte, 8-byte.',
      ],
      concepts: ['type switch', 'refactoring', 'multi-type case'],
    },
    {
      id: 'go-tsw-20',
      title: 'Recursive Value Printer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a function that recursively prints nested values using type switches.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

// prettyPrint returns a formatted string for nested Go values.
// Handles: string, int, float64, bool, nil,
// []interface{}, map[string]interface{}
// Indent nested structures by the given depth.
func prettyPrint(v interface{}, depth int) string {
    // TODO: implement
}

func main() {
    data := map[string]interface{}{
        "name": "Go",
        "version": 1.21,
        "features": []interface{}{"concurrency", "simplicity"},
    }
    fmt.Println(prettyPrint(data, 0))
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

func prettyPrint(v interface{}, depth int) string {
    indent := strings.Repeat("  ", depth)
    switch val := v.(type) {
    case nil:
        return indent + "null"
    case string:
        return indent + fmt.Sprintf("%q", val)
    case int:
        return indent + fmt.Sprintf("%d", val)
    case float64:
        return indent + fmt.Sprintf("%g", val)
    case bool:
        return indent + fmt.Sprintf("%t", val)
    case []interface{}:
        if len(val) == 0 {
            return indent + "[]"
        }
        lines := []string{indent + "["}
        for _, item := range val {
            lines = append(lines, prettyPrint(item, depth+1)+",")
        }
        lines = append(lines, indent+"]")
        return strings.Join(lines, "\n")
    case map[string]interface{}:
        if len(val) == 0 {
            return indent + "{}"
        }
        lines := []string{indent + "{"}
        for k, item := range val {
            lines = append(lines, fmt.Sprintf("%s  %q: %s,", indent, k, strings.TrimSpace(prettyPrint(item, depth+1))))
        }
        lines = append(lines, indent+"}")
        return strings.Join(lines, "\n")
    default:
        return indent + fmt.Sprintf("%v", val)
    }
}

func main() {
    data := map[string]interface{}{
        "name": "Go",
        "version": 1.21,
        "features": []interface{}{"concurrency", "simplicity"},
    }
    fmt.Println(prettyPrint(data, 0))
}`,
      hints: [
        'Use a type switch to handle each value type differently.',
        'Recursively call prettyPrint for slices and maps.',
        'Use strings.Repeat for indentation at each depth.',
      ],
      concepts: ['type switch', 'recursion', 'pretty printing', 'nested data'],
    },
  ],
};
