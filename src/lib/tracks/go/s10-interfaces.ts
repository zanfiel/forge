import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-iface',
  title: '10. Interfaces',
  explanation: `## Interfaces in Go

Interfaces define behavior as a set of method signatures. Types implicitly satisfy interfaces -- no "implements" keyword needed.

\`\`\`go
// Interface definition
type Reader interface {
    Read(p []byte) (n int, err error)
}

// Implicit implementation -- any type with a Read method satisfies Reader
type MyReader struct{}
func (r MyReader) Read(p []byte) (int, error) { return 0, nil }

// Empty interface -- satisfied by every type
var x interface{} = 42
var y any = "hello"  // any is alias for interface{}

// Type assertion
s, ok := x.(string) // safe assertion with comma-ok

// Stringer interface (from fmt)
type Stringer interface {
    String() string
}

// error interface
type error interface {
    Error() string
}

// io.Reader and io.Writer
type Writer interface {
    Write(p []byte) (n int, err error)
}
\`\`\`

Small, focused interfaces (1-3 methods) are idiomatic Go. Compose larger interfaces from smaller ones.`,
  exercises: [
    {
      id: 'go-iface-1',
      title: 'Define an Interface',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Define an interface with a single method.',
      skeleton: `package main

import "fmt"

__BLANK__ Shape __BLANK__ {
    Area() float64
}

type Square struct {
    Side float64
}

func (s Square) Area() float64 {
    return s.Side * s.Side
}

func printArea(s Shape) {
    fmt.Printf("Area: %.2f\\n", s.Area())
}

func main() {
    printArea(Square{Side: 5})
}`,
      solution: `package main

import "fmt"

type Shape interface {
    Area() float64
}

type Square struct {
    Side float64
}

func (s Square) Area() float64 {
    return s.Side * s.Side
}

func printArea(s Shape) {
    fmt.Printf("Area: %.2f\\n", s.Area())
}

func main() {
    printArea(Square{Side: 5})
}`,
      hints: [
        'Interfaces are defined with type Name interface { ... }.',
        'List method signatures inside the interface body.',
        'type Shape interface { Area() float64 }',
      ],
      concepts: ['interface definition', 'method signature', 'polymorphism'],
    },
    {
      id: 'go-iface-2',
      title: 'Implicit Implementation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Implement an interface without any explicit declaration.',
      skeleton: `package main

import "fmt"

type Greeter interface {
    Greet() string
}

type English struct{}
type Spanish struct{}

func (e English) Greet() __BLANK__ {
    return "Hello!"
}

func (s Spanish) __BLANK__() string {
    return "Hola!"
}

func sayHi(g Greeter) {
    fmt.Println(g.Greet())
}

func main() {
    sayHi(English{})
    sayHi(Spanish{})
}`,
      solution: `package main

import "fmt"

type Greeter interface {
    Greet() string
}

type English struct{}
type Spanish struct{}

func (e English) Greet() string {
    return "Hello!"
}

func (s Spanish) Greet() string {
    return "Hola!"
}

func sayHi(g Greeter) {
    fmt.Println(g.Greet())
}

func main() {
    sayHi(English{})
    sayHi(Spanish{})
}`,
      hints: [
        'Both types must have a Greet() string method to satisfy the interface.',
        'No explicit declaration like "implements" is needed.',
        'The compiler checks interface satisfaction automatically.',
      ],
      concepts: ['implicit implementation', 'duck typing', 'interface satisfaction'],
    },
    {
      id: 'go-iface-3',
      title: 'Empty Interface',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use the empty interface to accept any type.',
      skeleton: `package main

import "fmt"

func printAnything(val __BLANK__) {
    fmt.Printf("Value: %v, Type: %T\\n", val, val)
}

func main() {
    printAnything(42)
    printAnything("hello")
    printAnything(true)
}`,
      solution: `package main

import "fmt"

func printAnything(val any) {
    fmt.Printf("Value: %v, Type: %T\\n", val, val)
}

func main() {
    printAnything(42)
    printAnything("hello")
    printAnything(true)
}`,
      hints: [
        'The empty interface is satisfied by all types.',
        'In Go 1.18+, any is an alias for interface{}.',
        'Use any as the parameter type.',
      ],
      concepts: ['empty interface', 'any', 'generic container'],
    },
    {
      id: 'go-iface-4',
      title: 'Type Assertion',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use type assertion with the comma-ok idiom.',
      skeleton: `package main

import "fmt"

func describe(i any) string {
    if s, __BLANK__ := i.(string); ok {
        return "string: " + s
    }
    if n, ok := i.__BLANK__; ok {
        return fmt.Sprintf("int: %d", n)
    }
    return "unknown"
}

func main() {
    fmt.Println(describe("hello"))
    fmt.Println(describe(42))
    fmt.Println(describe(3.14))
}`,
      solution: `package main

import "fmt"

func describe(i any) string {
    if s, ok := i.(string); ok {
        return "string: " + s
    }
    if n, ok := i.(int); ok {
        return fmt.Sprintf("int: %d", n)
    }
    return "unknown"
}

func main() {
    fmt.Println(describe("hello"))
    fmt.Println(describe(42))
    fmt.Println(describe(3.14))
}`,
      hints: [
        'Type assertion syntax: value.(Type).',
        'The comma-ok form prevents panic on failed assertion.',
        'i.(string) checks if i holds a string.',
      ],
      concepts: ['type assertion', 'comma-ok', 'runtime type checking'],
    },
    {
      id: 'go-iface-5',
      title: 'Stringer Interface',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Implement the fmt.Stringer interface for custom string representation.',
      skeleton: `package main

import "fmt"

type Color struct {
    R, G, B uint8
}

// Implement String() so fmt.Println prints "rgb(R, G, B)"

func main() {
    c := Color{255, 128, 0}
    fmt.Println(c) // rgb(255, 128, 0)
}`,
      solution: `package main

import "fmt"

type Color struct {
    R, G, B uint8
}

func (c Color) String() string {
    return fmt.Sprintf("rgb(%d, %d, %d)", c.R, c.G, c.B)
}

func main() {
    c := Color{255, 128, 0}
    fmt.Println(c) // rgb(255, 128, 0)
}`,
      hints: [
        'The Stringer interface requires String() string.',
        'fmt.Println calls String() on types that implement it.',
        'Use fmt.Sprintf to format the output.',
      ],
      concepts: ['Stringer interface', 'String method', 'custom formatting'],
    },
    {
      id: 'go-iface-6',
      title: 'Error Interface',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create a custom error type implementing the error interface.',
      skeleton: `package main

import "fmt"

type ValidationError struct {
    Field   string
    Message string
}

// Implement the error interface for ValidationError

func validate(name string) error {
    if name == "" {
        return &ValidationError{Field: "name", Message: "cannot be empty"}
    }
    return nil
}

func main() {
    if err := validate(""); err != nil {
        fmt.Println(err)
    }
}`,
      solution: `package main

import "fmt"

type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation error: %s %s", e.Field, e.Message)
}

func validate(name string) error {
    if name == "" {
        return &ValidationError{Field: "name", Message: "cannot be empty"}
    }
    return nil
}

func main() {
    if err := validate(""); err != nil {
        fmt.Println(err)
    }
}`,
      hints: [
        'The error interface requires an Error() string method.',
        'Return *ValidationError to satisfy the error interface.',
        'Use fmt.Sprintf to build the error message.',
      ],
      concepts: ['error interface', 'custom error type', 'Error method'],
    },
    {
      id: 'go-iface-7',
      title: 'Interface Composition',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Compose a larger interface from smaller ones.',
      skeleton: `package main

import "fmt"

type Reader interface {
    Read() string
}

type Writer interface {
    Write(data string)
}

type ReadWriter __BLANK__ {
    __BLANK__
    __BLANK__
}

type File struct {
    content string
}

func (f File) Read() string        { return f.content }
func (f *File) Write(data string)  { f.content = data }

func process(rw ReadWriter) {
    rw.Write("hello")
    fmt.Println(rw.Read())
}

func main() {
    f := &File{}
    process(f)
}`,
      solution: `package main

import "fmt"

type Reader interface {
    Read() string
}

type Writer interface {
    Write(data string)
}

type ReadWriter interface {
    Reader
    Writer
}

type File struct {
    content string
}

func (f File) Read() string        { return f.content }
func (f *File) Write(data string)  { f.content = data }

func process(rw ReadWriter) {
    rw.Write("hello")
    fmt.Println(rw.Read())
}

func main() {
    f := &File{}
    process(f)
}`,
      hints: [
        'Interfaces can embed other interfaces.',
        'ReadWriter should embed both Reader and Writer.',
        'type ReadWriter interface { Reader; Writer }',
      ],
      concepts: ['interface composition', 'embedding', 'composed interfaces'],
    },
    {
      id: 'go-iface-8',
      title: 'Predict Nil Interface',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Predict the behavior of nil interface values vs nil concrete values.',
      skeleton: `package main

import "fmt"

type MyError struct{}

func (e *MyError) Error() string { return "error" }

func getError() error {
    var e *MyError = nil
    return e
}

func main() {
    err := getError()
    fmt.Println(err == nil)
}`,
      solution: `false`,
      hints: [
        'An interface value is nil only if both its type and value are nil.',
        'getError returns a non-nil interface holding a nil *MyError pointer.',
        'The interface has type information (*MyError), so it is not nil.',
      ],
      concepts: ['nil interface', 'interface internals', 'nil gotcha'],
    },
    {
      id: 'go-iface-9',
      title: 'io.Reader Implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement io.Reader for a custom string reader.',
      skeleton: `package main

import (
    "fmt"
    "io"
)

type StringReader struct {
    data string
    pos  int
}

func (r *StringReader) Read(p []byte) (int, error) {
    // Copy remaining data to p, return io.EOF when done
}

func main() {
    r := &StringReader{data: "Hello, Go!"}
    buf := make([]byte, 4)
    for {
        n, err := r.Read(buf)
        if n > 0 {
            fmt.Print(string(buf[:n]))
        }
        if err == io.EOF {
            break
        }
    }
    fmt.Println()
}`,
      solution: `package main

import (
    "fmt"
    "io"
)

type StringReader struct {
    data string
    pos  int
}

func (r *StringReader) Read(p []byte) (int, error) {
    if r.pos >= len(r.data) {
        return 0, io.EOF
    }
    n := copy(p, r.data[r.pos:])
    r.pos += n
    return n, nil
}

func main() {
    r := &StringReader{data: "Hello, Go!"}
    buf := make([]byte, 4)
    for {
        n, err := r.Read(buf)
        if n > 0 {
            fmt.Print(string(buf[:n]))
        }
        if err == io.EOF {
            break
        }
    }
    fmt.Println()
}`,
      hints: [
        'Read copies data into p and advances pos.',
        'Return io.EOF when all data has been read.',
        'Use copy() to transfer bytes efficiently.',
      ],
      concepts: ['io.Reader', 'Read method', 'io.EOF'],
    },
    {
      id: 'go-iface-10',
      title: 'Fix Interface Satisfaction',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the type that does not satisfy an interface due to receiver mismatch.',
      skeleton: `package main

import "fmt"

type Sizer interface {
    Size() int
}

type Collection struct {
    items []string
}

func (c *Collection) Size() int {
    return len(c.items)
}

func printSize(s Sizer) {
    fmt.Println(s.Size())
}

func main() {
    c := Collection{items: []string{"a", "b", "c"}}
    printSize(c) // compile error: Collection does not implement Sizer
}`,
      solution: `package main

import "fmt"

type Sizer interface {
    Size() int
}

type Collection struct {
    items []string
}

func (c *Collection) Size() int {
    return len(c.items)
}

func printSize(s Sizer) {
    fmt.Println(s.Size())
}

func main() {
    c := Collection{items: []string{"a", "b", "c"}}
    printSize(&c) // pass pointer
}`,
      hints: [
        'Size has a pointer receiver (*Collection), but c is a value.',
        'Value types do not include pointer receiver methods in their method set for interfaces.',
        'Pass &c instead of c to satisfy the interface.',
      ],
      concepts: ['method set rules', 'pointer receiver', 'interface satisfaction'],
    },
    {
      id: 'go-iface-11',
      title: 'Fix Nil Interface Panic',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix a type assertion panic on a nil interface.',
      skeleton: `package main

import "fmt"

func process(val any) {
    s := val.(string) // panics if val is not string
    fmt.Println(s)
}

func main() {
    process("hello")
    process(42) // PANIC
}`,
      solution: `package main

import "fmt"

func process(val any) {
    s, ok := val.(string)
    if !ok {
        fmt.Println("not a string")
        return
    }
    fmt.Println(s)
}

func main() {
    process("hello")
    process(42)
}`,
      hints: [
        'A type assertion without comma-ok panics on failure.',
        'Use the two-value form: s, ok := val.(string).',
        'Check ok before using the value.',
      ],
      concepts: ['safe type assertion', 'comma-ok', 'panic prevention'],
    },
    {
      id: 'go-iface-12',
      title: 'Fix Missing Method',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix a struct that fails to implement an interface because of a missing method.',
      skeleton: `package main

import "fmt"

type Animal interface {
    Name() string
    Sound() string
}

type Dog struct {
    name string
}

func (d Dog) Name() string {
    return d.name
}

// Missing Sound method

func describe(a Animal) {
    fmt.Printf("%s says %s\\n", a.Name(), a.Sound())
}

func main() {
    d := Dog{name: "Rex"}
    describe(d)
}`,
      solution: `package main

import "fmt"

type Animal interface {
    Name() string
    Sound() string
}

type Dog struct {
    name string
}

func (d Dog) Name() string {
    return d.name
}

func (d Dog) Sound() string {
    return "Woof"
}

func describe(a Animal) {
    fmt.Printf("%s says %s\\n", a.Name(), a.Sound())
}

func main() {
    d := Dog{name: "Rex"}
    describe(d)
}`,
      hints: [
        'Dog must implement all methods in the Animal interface.',
        'Sound() string is missing from Dog.',
        'Add func (d Dog) Sound() string { return "Woof" }.',
      ],
      concepts: ['interface implementation', 'missing method', 'compilation error'],
    },
    {
      id: 'go-iface-13',
      title: 'Interface Slice',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create a slice of interface values holding different types.',
      skeleton: `package main

import (
    "fmt"
    "math"
)

type Shape interface {
    Area() float64
}

type Circle struct{ Radius float64 }
type Rectangle struct{ Width, Height float64 }

func (c Circle) Area() float64    { return math.Pi * c.Radius * c.Radius }
func (r Rectangle) Area() float64 { return r.Width * r.Height }

func totalArea(shapes []Shape) float64 {
    // Sum the area of all shapes
}

func main() {
    shapes := []Shape{
        Circle{Radius: 5},
        Rectangle{Width: 3, Height: 4},
        Circle{Radius: 2},
    }
    fmt.Printf("Total: %.2f\\n", totalArea(shapes))
}`,
      solution: `package main

import (
    "fmt"
    "math"
)

type Shape interface {
    Area() float64
}

type Circle struct{ Radius float64 }
type Rectangle struct{ Width, Height float64 }

func (c Circle) Area() float64    { return math.Pi * c.Radius * c.Radius }
func (r Rectangle) Area() float64 { return r.Width * r.Height }

func totalArea(shapes []Shape) float64 {
    total := 0.0
    for _, s := range shapes {
        total += s.Area()
    }
    return total
}

func main() {
    shapes := []Shape{
        Circle{Radius: 5},
        Rectangle{Width: 3, Height: 4},
        Circle{Radius: 2},
    }
    fmt.Printf("Total: %.2f\\n", totalArea(shapes))
}`,
      hints: [
        'Iterate over the slice and call Area() on each shape.',
        'The interface allows polymorphic behavior.',
        'Accumulate the total area in a float64.',
      ],
      concepts: ['polymorphism', 'interface slice', 'sum pattern'],
    },
    {
      id: 'go-iface-14',
      title: 'Predict Type Assertion',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the result of type assertions on interface values.',
      skeleton: `package main

import "fmt"

func main() {
    var i interface{} = "hello"
    s, ok1 := i.(string)
    n, ok2 := i.(int)
    fmt.Println(s, ok1)
    fmt.Println(n, ok2)
}`,
      solution: `hello true
0 false`,
      hints: [
        'i holds a string, so i.(string) succeeds.',
        'i.(int) fails because i does not hold an int.',
        'Failed assertion with comma-ok returns zero value and false.',
      ],
      concepts: ['type assertion', 'comma-ok', 'zero value on failure'],
    },
    {
      id: 'go-iface-15',
      title: 'Predict Interface Value',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Predict the dynamic type of an interface value.',
      skeleton: `package main

import "fmt"

func main() {
    var x interface{} = 42
    fmt.Printf("%v %T\\n", x, x)
    x = "hello"
    fmt.Printf("%v %T\\n", x, x)
    x = []int{1, 2}
    fmt.Printf("%v %T\\n", x, x)
}`,
      solution: `42 int
hello string
[1 2] []int`,
      hints: [
        '%T prints the dynamic type of an interface value.',
        'An interface can hold any type -- it changes as you reassign.',
        'The dynamic type changes from int to string to []int.',
      ],
      concepts: ['dynamic type', 'interface value', '%T format'],
    },
    {
      id: 'go-iface-16',
      title: 'Middleware Interface',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use interfaces to build a processing pipeline.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

type Transformer interface {
    Transform(s string) string
}

type Upper struct{}
type Trimmer struct{}
type Prefixer struct{ Prefix string }

// Implement Transform for each type

func pipeline(s string, transforms []Transformer) string {
    for _, t := range transforms {
        s = t.Transform(s)
    }
    return s
}

func main() {
    result := pipeline("  hello world  ", []Transformer{
        Trimmer{},
        Upper{},
        Prefixer{Prefix: ">>> "},
    })
    fmt.Println(result) // ">>> HELLO WORLD"
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

type Transformer interface {
    Transform(s string) string
}

type Upper struct{}
type Trimmer struct{}
type Prefixer struct{ Prefix string }

func (u Upper) Transform(s string) string    { return strings.ToUpper(s) }
func (t Trimmer) Transform(s string) string  { return strings.TrimSpace(s) }
func (p Prefixer) Transform(s string) string { return p.Prefix + s }

func pipeline(s string, transforms []Transformer) string {
    for _, t := range transforms {
        s = t.Transform(s)
    }
    return s
}

func main() {
    result := pipeline("  hello world  ", []Transformer{
        Trimmer{},
        Upper{},
        Prefixer{Prefix: ">>> "},
    })
    fmt.Println(result) // ">>> HELLO WORLD"
}`,
      hints: [
        'Each type must implement Transform(s string) string.',
        'Upper uses strings.ToUpper, Trimmer uses strings.TrimSpace.',
        'Prefixer prepends its Prefix to the string.',
      ],
      concepts: ['pipeline pattern', 'interface polymorphism', 'chain of responsibility'],
    },
    {
      id: 'go-iface-17',
      title: 'Compile-Time Check',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use a compile-time assertion to verify interface implementation.',
      skeleton: `package main

import "fmt"

type Validator interface {
    Validate() error
}

type Email struct {
    Address string
}

func (e Email) Validate() error {
    if e.Address == "" {
        return fmt.Errorf("email cannot be empty")
    }
    return nil
}

// Add compile-time check that Email implements Validator

func main() {
    e := Email{Address: "test@example.com"}
    fmt.Println(e.Validate())
}`,
      solution: `package main

import "fmt"

type Validator interface {
    Validate() error
}

type Email struct {
    Address string
}

func (e Email) Validate() error {
    if e.Address == "" {
        return fmt.Errorf("email cannot be empty")
    }
    return nil
}

var _ Validator = Email{}

func main() {
    e := Email{Address: "test@example.com"}
    fmt.Println(e.Validate())
}`,
      hints: [
        'Use var _ Interface = Type{} to verify at compile time.',
        'The blank identifier discards the value.',
        'var _ Validator = Email{} fails at compile time if Email does not satisfy Validator.',
      ],
      concepts: ['compile-time check', 'interface assertion', 'blank identifier'],
    },
    {
      id: 'go-iface-18',
      title: 'Refactor to Interface',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor concrete type dependency to use an interface.',
      skeleton: `package main

import "fmt"

type FileLogger struct{}

func (l FileLogger) Log(msg string) {
    fmt.Println("[FILE]", msg)
}

type App struct {
    logger FileLogger
}

func (a App) Run() {
    a.logger.Log("app started")
}

func main() {
    app := App{logger: FileLogger{}}
    app.Run()
}`,
      solution: `package main

import "fmt"

type Logger interface {
    Log(msg string)
}

type FileLogger struct{}

func (l FileLogger) Log(msg string) {
    fmt.Println("[FILE]", msg)
}

type App struct {
    logger Logger
}

func (a App) Run() {
    a.logger.Log("app started")
}

func main() {
    app := App{logger: FileLogger{}}
    app.Run()
}`,
      hints: [
        'Define a Logger interface with a Log method.',
        'Change App.logger to use the Logger interface type.',
        'This allows swapping implementations without changing App.',
      ],
      concepts: ['dependency injection', 'interface decoupling', 'refactoring'],
    },
    {
      id: 'go-iface-19',
      title: 'Refactor to Accept Interface',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor a function to accept an interface instead of a concrete type.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

func countLines(s string) int {
    return len(strings.Split(s, "\\n"))
}

func main() {
    text := "line1\\nline2\\nline3"
    fmt.Println(countLines(text))
}`,
      solution: `package main

import (
    "bufio"
    "fmt"
    "io"
    "strings"
)

func countLines(r io.Reader) int {
    scanner := bufio.NewScanner(r)
    count := 0
    for scanner.Scan() {
        count++
    }
    return count
}

func main() {
    text := "line1\\nline2\\nline3"
    fmt.Println(countLines(strings.NewReader(text)))
}`,
      hints: [
        'Accept io.Reader instead of string for flexibility.',
        'Use bufio.Scanner to read lines from any Reader.',
        'strings.NewReader wraps a string as an io.Reader.',
      ],
      concepts: ['accept interfaces', 'io.Reader', 'flexible design'],
    },
    {
      id: 'go-iface-20',
      title: 'Strategy Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement the strategy pattern using interfaces.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

type SortStrategy interface {
    Sort(data []int)
}

type AscendingSort struct{}
type DescendingSort struct{}

// Implement Sort for both strategies

type Sorter struct {
    strategy SortStrategy
}

func (s Sorter) Execute(data []int) {
    s.strategy.Sort(data)
}

func main() {
    data := []int{3, 1, 4, 1, 5}
    asc := Sorter{strategy: AscendingSort{}}
    asc.Execute(data)
    fmt.Println(data) // [1 1 3 4 5]

    desc := Sorter{strategy: DescendingSort{}}
    desc.Execute(data)
    fmt.Println(data) // [5 4 3 1 1]
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

type SortStrategy interface {
    Sort(data []int)
}

type AscendingSort struct{}
type DescendingSort struct{}

func (a AscendingSort) Sort(data []int) {
    sort.Ints(data)
}

func (d DescendingSort) Sort(data []int) {
    sort.Sort(sort.Reverse(sort.IntSlice(data)))
}

type Sorter struct {
    strategy SortStrategy
}

func (s Sorter) Execute(data []int) {
    s.strategy.Sort(data)
}

func main() {
    data := []int{3, 1, 4, 1, 5}
    asc := Sorter{strategy: AscendingSort{}}
    asc.Execute(data)
    fmt.Println(data) // [1 1 3 4 5]

    desc := Sorter{strategy: DescendingSort{}}
    desc.Execute(data)
    fmt.Println(data) // [5 4 3 1 1]
}`,
      hints: [
        'AscendingSort uses sort.Ints for ascending order.',
        'DescendingSort uses sort.Reverse with sort.IntSlice.',
        'The Sorter delegates to whichever strategy is set.',
      ],
      concepts: ['strategy pattern', 'interface polymorphism', 'sort package'],
    },
  ],
};
