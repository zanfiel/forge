import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-str',
  title: '34. Stringer Interface',
  explanation: `## The Stringer Interface in Go

The \`fmt.Stringer\` interface lets you customize how your types are printed. It is one of the most commonly implemented interfaces.

\`\`\`go
type Stringer interface {
    String() string
}

// Example implementation
type Color struct {
    R, G, B uint8
}

func (c Color) String() string {
    return fmt.Sprintf("#%02x%02x%02x", c.R, c.G, c.B)
}

fmt.Println(Color{255, 128, 0}) // #ff8000

// GoStringer for %#v format
type GoStringer interface {
    GoString() string
}

func (c Color) GoString() string {
    return fmt.Sprintf("Color{R:%d, G:%d, B:%d}", c.R, c.G, c.B)
}

fmt.Printf("%#v\\n", Color{255, 128, 0}) // Color{R:255, G:128, B:0}

// fmt.Formatter for full control
type Formatter interface {
    Format(f fmt.State, verb rune)
}
\`\`\`

Common pitfalls:
- Calling \`fmt.Sprintf("%s", myType)\` inside \`String()\` causes infinite recursion
- String() should be defined on value receiver for widest compatibility
- Stringer works with fmt.Print, fmt.Sprint, fmt.Fprintf, etc.`,
  exercises: [
    {
      id: 'go-str-1',
      title: 'Basic Stringer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Implement the Stringer interface for a custom type.',
      skeleton: `package main

import "fmt"

type Weekday int

const (
    Sunday Weekday = iota
    Monday
    Tuesday
)

func (d Weekday) __BLANK__() string {
    names := []string{"Sunday", "Monday", "Tuesday"}
    if int(d) < len(names) {
        return names[d]
    }
    return "Unknown"
}

func main() {
    fmt.Println(Monday)
}`,
      solution: `package main

import "fmt"

type Weekday int

const (
    Sunday Weekday = iota
    Monday
    Tuesday
)

func (d Weekday) String() string {
    names := []string{"Sunday", "Monday", "Tuesday"}
    if int(d) < len(names) {
        return names[d]
    }
    return "Unknown"
}

func main() {
    fmt.Println(Monday)
}`,
      hints: [
        'The Stringer interface requires a String() method.',
        'String() takes no arguments and returns a string.',
        'fmt.Println automatically calls String() on the value.',
      ],
      concepts: ['fmt.Stringer', 'String()'],
    },
    {
      id: 'go-str-2',
      title: 'Stringer with Struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Implement String() for a struct type.',
      skeleton: `package main

import "fmt"

type Point struct {
    X, Y int
}

func (p Point) String() __BLANK__ {
    return fmt.Sprintf("(%d, %d)", p.X, p.Y)
}

func main() {
    p := Point{3, 4}
    fmt.Println(p)
}`,
      solution: `package main

import "fmt"

type Point struct {
    X, Y int
}

func (p Point) String() string {
    return fmt.Sprintf("(%d, %d)", p.X, p.Y)
}

func main() {
    p := Point{3, 4}
    fmt.Println(p)
}`,
      hints: [
        'String() must return a string type.',
        'Use fmt.Sprintf to format the output.',
        'Value receiver ensures it works with both Point and *Point.',
      ],
      concepts: ['fmt.Stringer', 'struct', 'fmt.Sprintf'],
    },
    {
      id: 'go-str-3',
      title: 'Using Sprintf with Stringer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use a Stringer-implementing type with fmt.Sprintf.',
      skeleton: `package main

import "fmt"

type Currency struct {
    Amount   int
    Symbol   string
}

func (c Currency) String() string {
    return fmt.Sprintf("%s%d.%02d", c.Symbol, c.Amount/100, c.Amount%100)
}

func main() {
    price := Currency{1599, "$"}
    msg := fmt.__BLANK__("Price: %s", price)
    fmt.Println(msg)
}`,
      solution: `package main

import "fmt"

type Currency struct {
    Amount   int
    Symbol   string
}

func (c Currency) String() string {
    return fmt.Sprintf("%s%d.%02d", c.Symbol, c.Amount/100, c.Amount%100)
}

func main() {
    price := Currency{1599, "$"}
    msg := fmt.Sprintf("Price: %s", price)
    fmt.Println(msg)
}`,
      hints: [
        'fmt.Sprintf formats and returns a string.',
        '%s verb calls String() on the argument.',
        'Amount 1599 cents = $15.99.',
      ],
      concepts: ['fmt.Stringer', 'fmt.Sprintf', '%s verb'],
    },
    {
      id: 'go-str-4',
      title: 'Stringer with Enum and Iota',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use iota constants with a String() method.',
      skeleton: `package main

import "fmt"

type Direction int

const (
    North Direction = __BLANK__
    East
    South
    West
)

func (d Direction) String() string {
    return [...]string{"North", "East", "South", "West"}[d]
}

func main() {
    fmt.Println(North, East, South, West)
}`,
      solution: `package main

import "fmt"

type Direction int

const (
    North Direction = iota
    East
    South
    West
)

func (d Direction) String() string {
    return [...]string{"North", "East", "South", "West"}[d]
}

func main() {
    fmt.Println(North, East, South, West)
}`,
      hints: [
        'iota starts at 0 and auto-increments.',
        'The array index matches the iota value.',
        '[...]string{} creates a fixed-size array from the literal.',
      ],
      concepts: ['fmt.Stringer', 'iota', 'enum pattern'],
    },
    {
      id: 'go-str-5',
      title: 'GoStringer Interface',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement GoStringer for debug-friendly output with %#v.',
      skeleton: `package main

import "fmt"

type IP struct {
    A, B, C, D uint8
}

func (ip IP) String() string {
    return fmt.Sprintf("%d.%d.%d.%d", ip.A, ip.B, ip.C, ip.D)
}

func (ip IP) __BLANK__() string {
    return fmt.Sprintf("IP{%d, %d, %d, %d}", ip.A, ip.B, ip.C, ip.D)
}

func main() {
    ip := IP{192, 168, 1, 1}
    fmt.Println(ip)
    fmt.Printf("%#v\\n", ip)
}`,
      solution: `package main

import "fmt"

type IP struct {
    A, B, C, D uint8
}

func (ip IP) String() string {
    return fmt.Sprintf("%d.%d.%d.%d", ip.A, ip.B, ip.C, ip.D)
}

func (ip IP) GoString() string {
    return fmt.Sprintf("IP{%d, %d, %d, %d}", ip.A, ip.B, ip.C, ip.D)
}

func main() {
    ip := IP{192, 168, 1, 1}
    fmt.Println(ip)
    fmt.Printf("%#v\\n", ip)
}`,
      hints: [
        'GoString() is called by the %#v format verb.',
        'It provides a Go-syntax representation.',
        'Useful for debugging and logging.',
      ],
      concepts: ['GoStringer', '%#v', 'debug output'],
    },
    {
      id: 'go-str-6',
      title: 'Stringer for Slice Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement String() on a named slice type.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

type Tags __BLANK__

func (t Tags) String() string {
    return "[" + strings.Join(t, ", ") + "]"
}

func main() {
    tags := Tags{"go", "programming", "tutorial"}
    fmt.Println(tags)
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

type Tags []string

func (t Tags) String() string {
    return "[" + strings.Join(t, ", ") + "]"
}

func main() {
    tags := Tags{"go", "programming", "tutorial"}
    fmt.Println(tags)
}`,
      hints: [
        'Tags is a named type over []string.',
        'strings.Join concatenates with a separator.',
        'Named types can have methods, including String().',
      ],
      concepts: ['fmt.Stringer', 'named type', 'strings.Join'],
    },
    {
      id: 'go-str-7',
      title: 'Predict Stringer Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the output when Stringer is used.',
      skeleton: `package main

import "fmt"

type Temp struct {
    Celsius float64
}

func (t Temp) String() string {
    return fmt.Sprintf("%.1f°C", t.Celsius)
}

func main() {
    t := Temp{36.6}
    fmt.Println(t)
    fmt.Printf("Temperature: %v\\n", t)
    fmt.Printf("Raw: %+v\\n", t)
}`,
      solution: `36.6°C
Temperature: 36.6°C
Raw: {Celsius:36.6}`,
      hints: [
        'fmt.Println and %v both call String().',
        '%+v bypasses String() and shows struct fields.',
        'Only %+v shows the raw struct representation.',
      ],
      concepts: ['fmt.Stringer', '%v', '%+v'],
    },
    {
      id: 'go-str-8',
      title: 'Predict Pointer Receiver Stringer',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict behavior of Stringer with pointer vs value receivers.',
      skeleton: `package main

import "fmt"

type Counter struct {
    N int
}

func (c *Counter) String() string {
    return fmt.Sprintf("Count<%d>", c.N)
}

func main() {
    c1 := &Counter{N: 5}
    c2 := Counter{N: 10}
    fmt.Println(c1)
    fmt.Println(c2)
}`,
      solution: `Count<5>
{10}`,
      hints: [
        '*Counter implements Stringer, but Counter does not.',
        'fmt.Println(c1) calls String() because c1 is a pointer.',
        'fmt.Println(c2) uses default formatting because c2 is a value.',
      ],
      concepts: ['fmt.Stringer', 'pointer receiver', 'method sets'],
    },
    {
      id: 'go-str-9',
      title: 'Predict Recursive Stringer',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Identify why a Stringer causes infinite recursion.',
      skeleton: `package main

import "fmt"

type Name string

// This will cause infinite recursion. Why?
// func (n Name) String() string {
//     return fmt.Sprintf("Name: %s", n)
// }

// Fixed version:
func (n Name) String() string {
    return "Name: " + string(n)
}

func main() {
    n := Name("Go")
    fmt.Println(n)
}`,
      solution: `Name: Go`,
      hints: [
        'fmt.Sprintf("%s", n) calls n.String() again.',
        'This creates infinite recursion in the commented version.',
        'Convert to string(n) to avoid calling String() recursively.',
      ],
      concepts: ['fmt.Stringer', 'infinite recursion', 'type conversion'],
    },
    {
      id: 'go-str-10',
      title: 'Duration Stringer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement a human-readable String() for a Duration type.',
      skeleton: `package main

import "fmt"

type Duration struct {
    Hours   int
    Minutes int
    Seconds int
}

// Implement String() that returns "Xh Ym Zs"
// Omit zero components. Examples:
// {1, 30, 0} -> "1h 30m"
// {0, 0, 45} -> "45s"
// {2, 0, 15} -> "2h 15s"
// {0, 0, 0}  -> "0s"
// TODO: implement String()

func main() {
    fmt.Println(Duration{1, 30, 0})
    fmt.Println(Duration{0, 0, 45})
    fmt.Println(Duration{2, 0, 15})
    fmt.Println(Duration{0, 0, 0})
}`,
      solution: `package main

import "fmt"

type Duration struct {
    Hours   int
    Minutes int
    Seconds int
}

func (d Duration) String() string {
    result := ""
    if d.Hours > 0 {
        result += fmt.Sprintf("%dh ", d.Hours)
    }
    if d.Minutes > 0 {
        result += fmt.Sprintf("%dm ", d.Minutes)
    }
    if d.Seconds > 0 || result == "" {
        result += fmt.Sprintf("%ds", d.Seconds)
    }
    if result[len(result)-1] == ' ' {
        result = result[:len(result)-1]
    }
    return result
}

func main() {
    fmt.Println(Duration{1, 30, 0})
    fmt.Println(Duration{0, 0, 45})
    fmt.Println(Duration{2, 0, 15})
    fmt.Println(Duration{0, 0, 0})
}`,
      hints: [
        'Build the string conditionally for each non-zero component.',
        'Handle the all-zero case by always showing seconds.',
        'Trim trailing spaces if needed.',
      ],
      concepts: ['fmt.Stringer', 'conditional formatting'],
    },
    {
      id: 'go-str-11',
      title: 'Binary Stringer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement String() that shows an integer in binary representation.',
      skeleton: `package main

import "fmt"

type Bits uint8

// Implement String() that returns the 8-bit binary representation.
// Example: Bits(42) -> "00101010"
// TODO: implement String()

func main() {
    fmt.Println(Bits(0))
    fmt.Println(Bits(42))
    fmt.Println(Bits(255))
}`,
      solution: `package main

import "fmt"

type Bits uint8

func (b Bits) String() string {
    return fmt.Sprintf("%08b", uint8(b))
}

func main() {
    fmt.Println(Bits(0))
    fmt.Println(Bits(42))
    fmt.Println(Bits(255))
}`,
      hints: [
        'Use fmt.Sprintf with %08b for 8-bit binary.',
        'Convert to uint8 to avoid recursive String() call.',
        '%08b pads with leading zeros to 8 digits.',
      ],
      concepts: ['fmt.Stringer', 'binary', 'format verbs'],
    },
    {
      id: 'go-str-12',
      title: 'Error and Stringer Combined',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement both error and Stringer interfaces on a type.',
      skeleton: `package main

import "fmt"

type ValidationError struct {
    Field   string
    Message string
    Code    int
}

// Implement Error() for the error interface:
// returns "validation error [{Code}]: {Field} - {Message}"
// Implement String() for the Stringer interface:
// returns "{Field}: {Message}"
// TODO: implement both methods

func validate(name string) error {
    if name == "" {
        return &ValidationError{Field: "name", Message: "required", Code: 400}
    }
    return nil
}

func main() {
    err := validate("")
    if err != nil {
        fmt.Println(err)
        if ve, ok := err.(*ValidationError); ok {
            fmt.Println(ve.String())
        }
    }
}`,
      solution: `package main

import "fmt"

type ValidationError struct {
    Field   string
    Message string
    Code    int
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation error [%d]: %s - %s", e.Code, e.Field, e.Message)
}

func (e *ValidationError) String() string {
    return fmt.Sprintf("%s: %s", e.Field, e.Message)
}

func validate(name string) error {
    if name == "" {
        return &ValidationError{Field: "name", Message: "required", Code: 400}
    }
    return nil
}

func main() {
    err := validate("")
    if err != nil {
        fmt.Println(err)
        if ve, ok := err.(*ValidationError); ok {
            fmt.Println(ve.String())
        }
    }
}`,
      hints: [
        'Error() is used when the value is treated as an error.',
        'String() is used for general printing with fmt.',
        'When both exist, error takes precedence in error contexts.',
      ],
      concepts: ['fmt.Stringer', 'error interface', 'dual interface'],
    },
    {
      id: 'go-str-13',
      title: 'Fix Infinite Recursion Stringer',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix infinite recursion in a String() method.',
      skeleton: `package main

import "fmt"

type Person struct {
    First string
    Last  string
    Age   int
}

// BUG: This causes infinite recursion
func (p Person) String() string {
    return fmt.Sprintf("Person: %v, age %d", p, p.Age)
}

func main() {
    p := Person{"John", "Doe", 30}
    fmt.Println(p)
}`,
      solution: `package main

import "fmt"

type Person struct {
    First string
    Last  string
    Age   int
}

func (p Person) String() string {
    return fmt.Sprintf("Person: %s %s, age %d", p.First, p.Last, p.Age)
}

func main() {
    p := Person{"John", "Doe", 30}
    fmt.Println(p)
}`,
      hints: [
        '%v on p calls p.String(), causing infinite recursion.',
        'Format individual fields instead of the whole struct.',
        'Use p.First, p.Last, p.Age separately.',
      ],
      concepts: ['fmt.Stringer', 'infinite recursion', 'fix-bug'],
    },
    {
      id: 'go-str-14',
      title: 'Fix Wrong Receiver Type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix a Stringer that does not work because of wrong receiver type.',
      skeleton: `package main

import "fmt"

type Status int

const (
    Active Status = iota
    Inactive
    Suspended
)

// BUG: String is defined on *Status but Status values are used
func (s *Status) String() string {
    switch *s {
    case Active:
        return "Active"
    case Inactive:
        return "Inactive"
    case Suspended:
        return "Suspended"
    default:
        return "Unknown"
    }
}

func main() {
    s := Active
    fmt.Println(s)
    fmt.Printf("Status: %s\\n", s)
}`,
      solution: `package main

import "fmt"

type Status int

const (
    Active Status = iota
    Inactive
    Suspended
)

func (s Status) String() string {
    switch s {
    case Active:
        return "Active"
    case Inactive:
        return "Inactive"
    case Suspended:
        return "Suspended"
    default:
        return "Unknown"
    }
}

func main() {
    s := Active
    fmt.Println(s)
    fmt.Printf("Status: %s\\n", s)
}`,
      hints: [
        'A value receiver works for both values and pointers.',
        'A pointer receiver only works for pointers.',
        'Change *Status to Status as the receiver.',
      ],
      concepts: ['fmt.Stringer', 'value receiver', 'method sets'],
    },
    {
      id: 'go-str-15',
      title: 'Fix Stringer Format Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix a subtle formatting bug in a nested Stringer.',
      skeleton: `package main

import "fmt"

type Pair struct {
    Key   string
    Value interface{}
}

func (p Pair) String() string {
    // BUG: Using %s for Value will panic on non-string types
    return fmt.Sprintf("%s=%s", p.Key, p.Value)
}

func main() {
    fmt.Println(Pair{"count", 42})
    fmt.Println(Pair{"name", "Go"})
    fmt.Println(Pair{"active", true})
}`,
      solution: `package main

import "fmt"

type Pair struct {
    Key   string
    Value interface{}
}

func (p Pair) String() string {
    return fmt.Sprintf("%s=%v", p.Key, p.Value)
}

func main() {
    fmt.Println(Pair{"count", 42})
    fmt.Println(Pair{"name", "Go"})
    fmt.Println(Pair{"active", true})
}`,
      hints: [
        '%s tries to call String() or use the value as a string.',
        'For interface{} values, use %v which handles any type.',
        'Replace %s with %v for the Value field.',
      ],
      concepts: ['fmt.Stringer', 'format verbs', '%v vs %s'],
    },
    {
      id: 'go-str-16',
      title: 'Table Stringer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement a Stringer that formats data as an aligned table.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

type Table struct {
    Headers []string
    Rows    [][]string
}

// Implement String() that returns an aligned table.
// Each column width = max width in that column.
// Left-align all values, pad with spaces.
// Separate header from rows with a line of dashes.
// Example:
// Name   Age City
// ------ --- --------
// Alice  30  New York
// Bob    25  London
// TODO: implement String()

func main() {
    t := Table{
        Headers: []string{"Name", "Age", "City"},
        Rows: [][]string{
            {"Alice", "30", "New York"},
            {"Bob", "25", "London"},
        },
    }
    fmt.Println(t)
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

type Table struct {
    Headers []string
    Rows    [][]string
}

func (t Table) String() string {
    widths := make([]int, len(t.Headers))
    for i, h := range t.Headers {
        widths[i] = len(h)
    }
    for _, row := range t.Rows {
        for i, cell := range row {
            if i < len(widths) && len(cell) > widths[i] {
                widths[i] = len(cell)
            }
        }
    }
    var lines []string
    header := ""
    sep := ""
    for i, h := range t.Headers {
        if i > 0 {
            header += " "
            sep += " "
        }
        header += fmt.Sprintf("%-*s", widths[i], h)
        sep += strings.Repeat("-", widths[i])
    }
    lines = append(lines, header, sep)
    for _, row := range t.Rows {
        line := ""
        for i, cell := range row {
            if i > 0 {
                line += " "
            }
            if i < len(widths) {
                line += fmt.Sprintf("%-*s", widths[i], cell)
            }
        }
        lines = append(lines, line)
    }
    return strings.Join(lines, "\n")
}

func main() {
    t := Table{
        Headers: []string{"Name", "Age", "City"},
        Rows: [][]string{
            {"Alice", "30", "New York"},
            {"Bob", "25", "London"},
        },
    }
    fmt.Println(t)
}`,
      hints: [
        'First compute the max width for each column.',
        'Use fmt.Sprintf("%-*s", width, value) for left-aligned padding.',
        'strings.Repeat("-", n) creates the separator line.',
      ],
      concepts: ['fmt.Stringer', 'table formatting', 'column alignment'],
    },
    {
      id: 'go-str-17',
      title: 'Tree Stringer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement a recursive String() for a tree structure.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

type TreeNode struct {
    Value    string
    Children []*TreeNode
}

// Implement String() that renders a tree like:
// root
//   child1
//     grandchild
//   child2
// (2 spaces per indent level)
// TODO: implement String()

func main() {
    tree := &TreeNode{
        Value: "root",
        Children: []*TreeNode{
            {
                Value: "child1",
                Children: []*TreeNode{
                    {Value: "grandchild"},
                },
            },
            {Value: "child2"},
        },
    }
    fmt.Println(tree)
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

type TreeNode struct {
    Value    string
    Children []*TreeNode
}

func (t *TreeNode) String() string {
    return t.render(0)
}

func (t *TreeNode) render(depth int) string {
    indent := strings.Repeat("  ", depth)
    lines := []string{indent + t.Value}
    for _, child := range t.Children {
        lines = append(lines, child.render(depth+1))
    }
    return strings.Join(lines, "\n")
}

func main() {
    tree := &TreeNode{
        Value: "root",
        Children: []*TreeNode{
            {
                Value: "child1",
                Children: []*TreeNode{
                    {Value: "grandchild"},
                },
            },
            {Value: "child2"},
        },
    }
    fmt.Println(tree)
}`,
      hints: [
        'Use a helper method render(depth int) for recursion.',
        'Indent by depth * 2 spaces.',
        'Join lines with newlines.',
      ],
      concepts: ['fmt.Stringer', 'recursion', 'tree rendering'],
    },
    {
      id: 'go-str-18',
      title: 'JSON-like Stringer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement a Stringer that outputs JSON-like formatting.',
      skeleton: `package main

import (
    "fmt"
    "strings"
    "sort"
)

type Config map[string]string

// Implement String() that returns a JSON-like format:
// {
//   "key1": "value1",
//   "key2": "value2"
// }
// Keys should be sorted alphabetically.
// TODO: implement String()

func main() {
    cfg := Config{
        "host": "localhost",
        "port": "8080",
        "debug": "true",
    }
    fmt.Println(cfg)
}`,
      solution: `package main

import (
    "fmt"
    "strings"
    "sort"
)

type Config map[string]string

func (c Config) String() string {
    if len(c) == 0 {
        return "{}"
    }
    keys := make([]string, 0, len(c))
    for k := range c {
        keys = append(keys, k)
    }
    sort.Strings(keys)
    lines := []string{"{"}
    for i, k := range keys {
        comma := ","
        if i == len(keys)-1 {
            comma = ""
        }
        lines = append(lines, fmt.Sprintf("  %q: %q%s", k, c[k], comma))
    }
    lines = append(lines, "}")
    return strings.Join(lines, "\n")
}

func main() {
    cfg := Config{
        "host": "localhost",
        "port": "8080",
        "debug": "true",
    }
    fmt.Println(cfg)
}`,
      hints: [
        'Sort the keys for consistent output.',
        'Use %q to quote strings with double quotes.',
        'Handle the trailing comma (no comma on last entry).',
      ],
      concepts: ['fmt.Stringer', 'JSON formatting', 'sort'],
    },
    {
      id: 'go-str-19',
      title: 'Refactor Print Calls to Stringer',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor repeated formatting into a String() method.',
      skeleton: `package main

import "fmt"

type Rect struct {
    X, Y, W, H int
}

func main() {
    r := Rect{10, 20, 100, 50}

    // These formatting calls are repeated everywhere
    fmt.Printf("Drawing rect at (%d,%d) size %dx%d\\n", r.X, r.Y, r.W, r.H)
    label := fmt.Sprintf("Rect[(%d,%d) %dx%d]", r.X, r.Y, r.W, r.H)
    fmt.Println(label)
    debug := fmt.Sprintf("rect: x=%d y=%d w=%d h=%d", r.X, r.Y, r.W, r.H)
    fmt.Println(debug)
}`,
      solution: `package main

import "fmt"

type Rect struct {
    X, Y, W, H int
}

func (r Rect) String() string {
    return fmt.Sprintf("Rect[(%d,%d) %dx%d]", r.X, r.Y, r.W, r.H)
}

func main() {
    r := Rect{10, 20, 100, 50}

    fmt.Printf("Drawing %s\\n", r)
    fmt.Println(r)
    fmt.Printf("debug: %v\\n", r)
}`,
      hints: [
        'Define String() on Rect to centralize the formatting.',
        'Replace all manual formatting with %s or %v using the Stringer.',
        'fmt.Println(r) automatically calls r.String().',
      ],
      concepts: ['fmt.Stringer', 'refactoring', 'DRY principle'],
    },
    {
      id: 'go-str-20',
      title: 'Refactor to Composable Stringers',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor monolithic String() into composable sub-stringers.',
      skeleton: `package main

import "fmt"

type Address struct {
    Street string
    City   string
    State  string
    Zip    string
}

type Employee struct {
    Name    string
    Title   string
    Address Address
    Salary  int
}

// Monolithic String() - too much responsibility
func (e Employee) String() string {
    return fmt.Sprintf("%s (%s)\\n  %s, %s, %s %s\\n  Salary: $%d",
        e.Name, e.Title,
        e.Address.Street, e.Address.City, e.Address.State, e.Address.Zip,
        e.Salary)
}

func main() {
    emp := Employee{
        Name:    "Alice",
        Title:   "Engineer",
        Address: Address{"123 Main St", "Portland", "OR", "97201"},
        Salary:  95000,
    }
    fmt.Println(emp)
}`,
      solution: `package main

import "fmt"

type Address struct {
    Street string
    City   string
    State  string
    Zip    string
}

func (a Address) String() string {
    return fmt.Sprintf("%s, %s, %s %s", a.Street, a.City, a.State, a.Zip)
}

type Employee struct {
    Name    string
    Title   string
    Address Address
    Salary  int
}

func (e Employee) String() string {
    return fmt.Sprintf("%s (%s)\n  %s\n  Salary: $%d",
        e.Name, e.Title, e.Address, e.Salary)
}

func main() {
    emp := Employee{
        Name:    "Alice",
        Title:   "Engineer",
        Address: Address{"123 Main St", "Portland", "OR", "97201"},
        Salary:  95000,
    }
    fmt.Println(emp)
}`,
      hints: [
        'Give Address its own String() method.',
        'Employee.String() uses Address.String() via %s.',
        'Each type is responsible for its own formatting.',
      ],
      concepts: ['fmt.Stringer', 'composition', 'refactoring'],
    },
  ],
};
