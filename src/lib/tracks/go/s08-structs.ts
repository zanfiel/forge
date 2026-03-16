import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-struct',
  title: '08. Structs',
  explanation: `## Structs in Go

Structs are Go's primary mechanism for grouping data into composite types.

\`\`\`go
// Struct definition
type Person struct {
    Name string
    Age  int
}

// Creating instances
p1 := Person{Name: "Alice", Age: 30}
p2 := Person{"Bob", 25}  // positional (fragile)
p3 := new(Person)         // returns *Person with zero values

// Anonymous fields (embedded types)
type Employee struct {
    Person     // embedded -- promotes Person fields
    Company string
}

// Struct tags (metadata for encoding/reflection)
type User struct {
    Name  string \`json:"name"\`
    Email string \`json:"email,omitempty"\`
}

// Struct comparison
a := Person{"Alice", 30}
b := Person{"Alice", 30}
fmt.Println(a == b) // true -- all fields comparable

// Zero value -- all fields set to their zero values
var p Person // {Name:"", Age:0}
\`\`\``,
  exercises: [
    {
      id: 'go-struct-1',
      title: 'Define a Struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Define a struct with two fields.',
      skeleton: `package main

import "fmt"

__BLANK__ Point __BLANK__ {
    X float64
    Y float64
}

func main() {
    p := Point{X: 3.0, Y: 4.0}
    fmt.Println(p)
}`,
      solution: `package main

import "fmt"

type Point struct {
    X float64
    Y float64
}

func main() {
    p := Point{X: 3.0, Y: 4.0}
    fmt.Println(p)
}`,
      hints: [
        'Structs are defined with the type keyword followed by struct.',
        'type Name struct { fields }',
        'type Point struct { X float64; Y float64 }',
      ],
      concepts: ['struct definition', 'type keyword', 'fields'],
    },
    {
      id: 'go-struct-2',
      title: 'Struct Literal',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Create a struct using named field initialization.',
      skeleton: `package main

import "fmt"

type Book struct {
    Title  string
    Author string
    Pages  int
}

func main() {
    b := Book{
        __BLANK__: "The Go Programming Language",
        __BLANK__: "Donovan & Kernighan",
        __BLANK__: 380,
    }
    fmt.Println(b.Title)
}`,
      solution: `package main

import "fmt"

type Book struct {
    Title  string
    Author string
    Pages  int
}

func main() {
    b := Book{
        Title:  "The Go Programming Language",
        Author: "Donovan & Kernighan",
        Pages:  380,
    }
    fmt.Println(b.Title)
}`,
      hints: [
        'Use FieldName: value syntax for named initialization.',
        'Named fields can appear in any order.',
        'Title: "...", Author: "...", Pages: 380',
      ],
      concepts: ['struct literal', 'named fields', 'initialization'],
    },
    {
      id: 'go-struct-3',
      title: 'Anonymous Fields',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create a struct with an embedded (anonymous) field.',
      skeleton: `package main

import "fmt"

type Address struct {
    City  string
    State string
}

type Person struct {
    Name string
    __BLANK__  // Embed Address
}

func main() {
    p := Person{
        Name:    "Alice",
        Address: Address{City: "Portland", State: "OR"},
    }
    fmt.Println(p.City) // Promoted field access
}`,
      solution: `package main

import "fmt"

type Address struct {
    City  string
    State string
}

type Person struct {
    Name    string
    Address
}

func main() {
    p := Person{
        Name:    "Alice",
        Address: Address{City: "Portland", State: "OR"},
    }
    fmt.Println(p.City) // Promoted field access
}`,
      hints: [
        'An anonymous (embedded) field is just the type name without a field name.',
        'Embedded fields promote their fields to the outer struct.',
        'You can access p.City directly instead of p.Address.City.',
      ],
      concepts: ['anonymous fields', 'embedding', 'field promotion'],
    },
    {
      id: 'go-struct-4',
      title: 'Struct Tags',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Add JSON struct tags for custom field names.',
      skeleton: `package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    FirstName string __BLANK__
    LastName  string __BLANK__
    Age       int    __BLANK__
}

func main() {
    u := User{FirstName: "John", LastName: "Doe", Age: 30}
    data, _ := json.Marshal(u)
    fmt.Println(string(data))
}`,
      solution: `package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    FirstName string \`json:"first_name"\`
    LastName  string \`json:"last_name"\`
    Age       int    \`json:"age"\`
}

func main() {
    u := User{FirstName: "John", LastName: "Doe", Age: 30}
    data, _ := json.Marshal(u)
    fmt.Println(string(data))
}`,
      hints: [
        'Struct tags are raw string literals after the field type.',
        'JSON tags use the format: `json:"field_name"`',
        'Tags control how encoding/json marshals the struct.',
      ],
      concepts: ['struct tags', 'JSON tags', 'encoding/json'],
    },
    {
      id: 'go-struct-5',
      title: 'New Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use the new() built-in to allocate a struct.',
      skeleton: `package main

import "fmt"

type Config struct {
    Host string
    Port int
}

func main() {
    c := __BLANK__(Config)
    c.Host = "localhost"
    c.Port = 8080
    fmt.Println(*c)
}`,
      solution: `package main

import "fmt"

type Config struct {
    Host string
    Port int
}

func main() {
    c := new(Config)
    c.Host = "localhost"
    c.Port = 8080
    fmt.Println(*c)
}`,
      hints: [
        'new(T) allocates zero-valued memory and returns a pointer *T.',
        'You can access fields directly through the pointer.',
        'Go auto-dereferences struct pointers for field access.',
      ],
      concepts: ['new built-in', 'pointer allocation', 'zero value'],
    },
    {
      id: 'go-struct-6',
      title: 'Struct Zero Value',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the zero values of struct fields.',
      skeleton: `package main

import "fmt"

type Settings struct {
    Debug   bool
    Verbose bool
    Retries int
    Name    string
}

func main() {
    var s Settings
    fmt.Printf("%t %t %d %q\\n", s.Debug, s.Verbose, s.Retries, s.Name)
}`,
      solution: `false false 0 ""`,
      hints: [
        'Struct fields are initialized to their zero values.',
        'bool zero is false, int zero is 0, string zero is "".',
        'All fields of an uninitialized struct are zero-valued.',
      ],
      concepts: ['zero value', 'struct initialization', 'default values'],
    },
    {
      id: 'go-struct-7',
      title: 'Struct Comparison',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict whether two struct values are equal.',
      skeleton: `package main

import "fmt"

type Point struct {
    X, Y int
}

func main() {
    a := Point{1, 2}
    b := Point{1, 2}
    c := Point{2, 1}
    fmt.Println(a == b)
    fmt.Println(a == c)
}`,
      solution: `true
false`,
      hints: [
        'Structs are comparable if all their fields are comparable.',
        'Two structs are equal if all corresponding fields are equal.',
        'a and b have the same fields, a and c do not.',
      ],
      concepts: ['struct comparison', 'equality', 'comparable types'],
    },
    {
      id: 'go-struct-8',
      title: 'Constructor Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a constructor function that returns a struct with validated fields.',
      skeleton: `package main

import (
    "errors"
    "fmt"
)

type Circle struct {
    Radius float64
}

func NewCircle(radius float64) (*Circle, error) {
    // Return error if radius <= 0, otherwise return a new Circle
}

func main() {
    c, err := NewCircle(5.0)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(c.Radius) // 5
}`,
      solution: `package main

import (
    "errors"
    "fmt"
)

type Circle struct {
    Radius float64
}

func NewCircle(radius float64) (*Circle, error) {
    if radius <= 0 {
        return nil, errors.New("radius must be positive")
    }
    return &Circle{Radius: radius}, nil
}

func main() {
    c, err := NewCircle(5.0)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(c.Radius) // 5
}`,
      hints: [
        'Go convention: constructor functions are named NewTypeName.',
        'Return a pointer and an error for validation.',
        'Use &Circle{...} to create and return a pointer to the struct.',
      ],
      concepts: ['constructor function', 'validation', 'pointer return'],
    },
    {
      id: 'go-struct-9',
      title: 'Embedded Struct Methods',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create structs with embedding and demonstrate method promotion.',
      skeleton: `package main

import "fmt"

type Animal struct {
    Name string
}

func (a Animal) Speak() string {
    return a.Name + " makes a sound"
}

type Dog struct {
    // Embed Animal
    Breed string
}

// Override Speak for Dog

func main() {
    d := Dog{Animal: Animal{Name: "Rex"}, Breed: "Labrador"}
    fmt.Println(d.Speak()) // "Rex barks"
}`,
      solution: `package main

import "fmt"

type Animal struct {
    Name string
}

func (a Animal) Speak() string {
    return a.Name + " makes a sound"
}

type Dog struct {
    Animal
    Breed string
}

func (d Dog) Speak() string {
    return d.Name + " barks"
}

func main() {
    d := Dog{Animal: Animal{Name: "Rex"}, Breed: "Labrador"}
    fmt.Println(d.Speak()) // "Rex barks"
}`,
      hints: [
        'Embed Animal in Dog using an anonymous field.',
        'Define a Speak method on Dog to override the promoted one.',
        'd.Name works because Animal.Name is promoted.',
      ],
      concepts: ['embedding', 'method promotion', 'method override'],
    },
    {
      id: 'go-struct-10',
      title: 'Fix Struct Copy',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the issue where modifying a copy does not affect the original.',
      skeleton: `package main

import "fmt"

type Counter struct {
    Value int
}

func increment(c Counter) {
    c.Value++
}

func main() {
    c := Counter{Value: 0}
    increment(c)
    fmt.Println(c.Value) // Expected: 1, Got: 0
}`,
      solution: `package main

import "fmt"

type Counter struct {
    Value int
}

func increment(c *Counter) {
    c.Value++
}

func main() {
    c := Counter{Value: 0}
    increment(&c)
    fmt.Println(c.Value) // 1
}`,
      hints: [
        'Structs are passed by value in Go -- the function gets a copy.',
        'Use a pointer parameter to modify the original struct.',
        'Change parameter to *Counter and pass &c.',
      ],
      concepts: ['pass by value', 'pointer parameter', 'struct mutation'],
    },
    {
      id: 'go-struct-11',
      title: 'Fix Missing Trailing Comma',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the syntax error in a multi-line struct literal.',
      skeleton: `package main

import "fmt"

type Config struct {
    Host string
    Port int
}

func main() {
    c := Config{
        Host: "localhost",
        Port: 8080
    }
    fmt.Println(c)
}`,
      solution: `package main

import "fmt"

type Config struct {
    Host string
    Port int
}

func main() {
    c := Config{
        Host: "localhost",
        Port: 8080,
    }
    fmt.Println(c)
}`,
      hints: [
        'In multi-line struct literals, every field needs a trailing comma.',
        'Even the last field must have a comma when the closing brace is on the next line.',
        'Add a comma after 8080.',
      ],
      concepts: ['trailing comma', 'syntax error', 'struct literal'],
    },
    {
      id: 'go-struct-12',
      title: 'Linked List Node',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Define a linked list node struct and write a function to count nodes.',
      skeleton: `package main

import "fmt"

type Node struct {
    Value int
    Next  *Node
}

func count(head *Node) int {
    // Count the number of nodes in the linked list
}

func main() {
    list := &Node{1, &Node{2, &Node{3, nil}}}
    fmt.Println(count(list)) // 3
}`,
      solution: `package main

import "fmt"

type Node struct {
    Value int
    Next  *Node
}

func count(head *Node) int {
    n := 0
    for head != nil {
        n++
        head = head.Next
    }
    return n
}

func main() {
    list := &Node{1, &Node{2, &Node{3, nil}}}
    fmt.Println(count(list)) // 3
}`,
      hints: [
        'Traverse the list by following Next pointers.',
        'Stop when head is nil.',
        'Increment a counter for each node visited.',
      ],
      concepts: ['linked list', 'self-referential struct', 'pointer traversal'],
    },
    {
      id: 'go-struct-13',
      title: 'Struct with Methods',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Add an Area method to a Rectangle struct.',
      skeleton: `package main

import "fmt"

type Rectangle struct {
    Width  float64
    Height float64
}

// Add an Area method that returns Width * Height

func main() {
    r := Rectangle{Width: 5, Height: 3}
    fmt.Println(r.Area()) // 15
}`,
      solution: `package main

import "fmt"

type Rectangle struct {
    Width  float64
    Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func main() {
    r := Rectangle{Width: 5, Height: 3}
    fmt.Println(r.Area()) // 15
}`,
      hints: [
        'Methods are defined with a receiver between func and the method name.',
        'func (r Rectangle) Area() float64 { ... }',
        'Use r.Width and r.Height inside the method.',
      ],
      concepts: ['methods', 'value receiver', 'struct methods'],
    },
    {
      id: 'go-struct-14',
      title: 'Predict Embedded Field',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict how embedded struct fields are accessed.',
      skeleton: `package main

import "fmt"

type Base struct {
    ID int
}

type Derived struct {
    Base
    ID int
}

func main() {
    d := Derived{Base: Base{ID: 1}, ID: 2}
    fmt.Println(d.ID)
    fmt.Println(d.Base.ID)
}`,
      solution: `2
1`,
      hints: [
        'When a field name conflicts with an embedded field, the outer field wins.',
        'd.ID refers to Derived.ID, not Base.ID.',
        'Use d.Base.ID to access the embedded field explicitly.',
      ],
      concepts: ['field shadowing', 'embedded structs', 'name resolution'],
    },
    {
      id: 'go-struct-15',
      title: 'Functional Options',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement the functional options pattern for struct configuration.',
      skeleton: `package main

import "fmt"

type Server struct {
    Host string
    Port int
}

type Option func(*Server)

func WithHost(host string) Option {
    // Return an Option that sets the host
}

func WithPort(port int) Option {
    // Return an Option that sets the port
}

func NewServer(opts ...Option) *Server {
    s := &Server{Host: "localhost", Port: 8080}
    // Apply all options
    return s
}

func main() {
    s := NewServer(WithHost("0.0.0.0"), WithPort(9090))
    fmt.Println(s.Host, s.Port) // 0.0.0.0 9090
}`,
      solution: `package main

import "fmt"

type Server struct {
    Host string
    Port int
}

type Option func(*Server)

func WithHost(host string) Option {
    return func(s *Server) {
        s.Host = host
    }
}

func WithPort(port int) Option {
    return func(s *Server) {
        s.Port = port
    }
}

func NewServer(opts ...Option) *Server {
    s := &Server{Host: "localhost", Port: 8080}
    for _, opt := range opts {
        opt(s)
    }
    return s
}

func main() {
    s := NewServer(WithHost("0.0.0.0"), WithPort(9090))
    fmt.Println(s.Host, s.Port) // 0.0.0.0 9090
}`,
      hints: [
        'Each option is a function that modifies a *Server.',
        'WithHost returns a closure that sets s.Host.',
        'NewServer applies each option in order.',
      ],
      concepts: ['functional options', 'closures', 'configuration pattern'],
    },
    {
      id: 'go-struct-16',
      title: 'Struct to Map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Convert a struct to a map using JSON marshaling.',
      skeleton: `package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}

func toMap(p Person) map[string]interface{} {
    // Convert Person to a map using JSON marshal/unmarshal
}

func main() {
    p := Person{Name: "Alice", Age: 30}
    m := toMap(p)
    fmt.Println(m["name"], m["age"])
}`,
      solution: `package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}

func toMap(p Person) map[string]interface{} {
    var m map[string]interface{}
    data, _ := json.Marshal(p)
    json.Unmarshal(data, &m)
    return m
}

func main() {
    p := Person{Name: "Alice", Age: 30}
    m := toMap(p)
    fmt.Println(m["name"], m["age"])
}`,
      hints: [
        'Marshal the struct to JSON bytes.',
        'Unmarshal the JSON bytes into a map[string]interface{}.',
        'This uses JSON tags for key names.',
      ],
      concepts: ['struct to map', 'JSON marshaling', 'interface{}'],
    },
    {
      id: 'go-struct-17',
      title: 'Refactor to Embedded Struct',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor duplicated fields into a shared embedded struct.',
      skeleton: `package main

import "fmt"

type Admin struct {
    FirstName string
    LastName  string
    Email     string
    Level     int
}

type Customer struct {
    FirstName string
    LastName  string
    Email     string
    Orders    int
}

func main() {
    a := Admin{FirstName: "Alice", LastName: "Smith", Email: "alice@co.com", Level: 3}
    c := Customer{FirstName: "Bob", LastName: "Jones", Email: "bob@co.com", Orders: 5}
    fmt.Println(a.FirstName, c.FirstName)
}`,
      solution: `package main

import "fmt"

type Person struct {
    FirstName string
    LastName  string
    Email     string
}

type Admin struct {
    Person
    Level int
}

type Customer struct {
    Person
    Orders int
}

func main() {
    a := Admin{Person: Person{FirstName: "Alice", LastName: "Smith", Email: "alice@co.com"}, Level: 3}
    c := Customer{Person: Person{FirstName: "Bob", LastName: "Jones", Email: "bob@co.com"}, Orders: 5}
    fmt.Println(a.FirstName, c.FirstName)
}`,
      hints: [
        'Extract common fields into a shared Person struct.',
        'Embed Person in both Admin and Customer.',
        'Promoted fields are accessible directly: a.FirstName.',
      ],
      concepts: ['struct embedding', 'DRY principle', 'composition'],
    },
    {
      id: 'go-struct-18',
      title: 'Refactor to Builder Pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor a large constructor call into a builder pattern.',
      skeleton: `package main

import "fmt"

type Query struct {
    Table   string
    Fields  []string
    Where   string
    OrderBy string
    Limit   int
}

func main() {
    q := Query{
        Table:   "users",
        Fields:  []string{"name", "email"},
        Where:   "active = true",
        OrderBy: "name",
        Limit:   10,
    }
    fmt.Println(q)
}`,
      solution: `package main

import "fmt"

type Query struct {
    Table   string
    Fields  []string
    Where   string
    OrderBy string
    Limit   int
}

type QueryBuilder struct {
    query Query
}

func NewQueryBuilder(table string) *QueryBuilder {
    return &QueryBuilder{query: Query{Table: table}}
}

func (b *QueryBuilder) Select(fields ...string) *QueryBuilder {
    b.query.Fields = fields
    return b
}

func (b *QueryBuilder) WhereClause(where string) *QueryBuilder {
    b.query.Where = where
    return b
}

func (b *QueryBuilder) Order(order string) *QueryBuilder {
    b.query.OrderBy = order
    return b
}

func (b *QueryBuilder) LimitTo(n int) *QueryBuilder {
    b.query.Limit = n
    return b
}

func (b *QueryBuilder) Build() Query {
    return b.query
}

func main() {
    q := NewQueryBuilder("users").
        Select("name", "email").
        WhereClause("active = true").
        Order("name").
        LimitTo(10).
        Build()
    fmt.Println(q)
}`,
      hints: [
        'Create a QueryBuilder struct that holds a Query.',
        'Each setter method returns *QueryBuilder for chaining.',
        'Add a Build() method that returns the final Query.',
      ],
      concepts: ['builder pattern', 'method chaining', 'fluent API'],
    },
    {
      id: 'go-struct-19',
      title: 'Predict Struct Size',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Predict what unsafe.Sizeof reports for a struct.',
      skeleton: `package main

import (
    "fmt"
    "unsafe"
)

type A struct {
    x bool
    y int64
    z bool
}

type B struct {
    x bool
    z bool
    y int64
}

func main() {
    fmt.Println(unsafe.Sizeof(A{}))
    fmt.Println(unsafe.Sizeof(B{}))
}`,
      solution: `24
16`,
      hints: [
        'Struct fields are padded for alignment.',
        'int64 requires 8-byte alignment, causing padding after bool fields.',
        'Reordering fields can reduce struct size by minimizing padding.',
      ],
      concepts: ['struct alignment', 'padding', 'memory layout'],
    },
    {
      id: 'go-struct-20',
      title: 'Stack Implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement a stack using a struct with Push, Pop, and Peek methods.',
      skeleton: `package main

import "fmt"

type Stack struct {
    items []int
}

func (s *Stack) Push(val int) {
    // Add val to the top
}

func (s *Stack) Pop() (int, bool) {
    // Remove and return top element, false if empty
}

func (s *Stack) Peek() (int, bool) {
    // Return top element without removing, false if empty
}

func main() {
    var s Stack
    s.Push(1)
    s.Push(2)
    s.Push(3)
    v, _ := s.Pop()
    fmt.Println(v) // 3
    v, _ = s.Peek()
    fmt.Println(v) // 2
}`,
      solution: `package main

import "fmt"

type Stack struct {
    items []int
}

func (s *Stack) Push(val int) {
    s.items = append(s.items, val)
}

func (s *Stack) Pop() (int, bool) {
    if len(s.items) == 0 {
        return 0, false
    }
    top := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return top, true
}

func (s *Stack) Peek() (int, bool) {
    if len(s.items) == 0 {
        return 0, false
    }
    return s.items[len(s.items)-1], true
}

func main() {
    var s Stack
    s.Push(1)
    s.Push(2)
    s.Push(3)
    v, _ := s.Pop()
    fmt.Println(v) // 3
    v, _ = s.Peek()
    fmt.Println(v) // 2
}`,
      hints: [
        'Use a slice as the underlying storage.',
        'Push appends to the end, Pop removes from the end.',
        'Return a bool to indicate if the operation succeeded.',
      ],
      concepts: ['stack data structure', 'methods', 'slice operations'],
    },
  ],
};
