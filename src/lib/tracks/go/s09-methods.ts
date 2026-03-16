import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-method',
  title: '09. Methods',
  explanation: `## Methods in Go

Methods are functions with a special receiver argument. The receiver binds the method to a type.

\`\`\`go
type Rect struct {
    Width, Height float64
}

// Value receiver -- gets a copy
func (r Rect) Area() float64 {
    return r.Width * r.Height
}

// Pointer receiver -- can modify the original
func (r *Rect) Scale(factor float64) {
    r.Width *= factor
    r.Height *= factor
}

// Method sets:
// Value type T has methods with value receivers
// Pointer type *T has methods with both value AND pointer receivers

// Method expressions -- functions from methods
area := Rect.Area     // func(Rect) float64
scale := (*Rect).Scale // func(*Rect, float64)

// Method values -- bound to a specific instance
r := Rect{3, 4}
areaFn := r.Area    // func() float64
fmt.Println(areaFn()) // 12
\`\`\`

Use pointer receivers when the method needs to modify the receiver or when the struct is large.`,
  exercises: [
    {
      id: 'go-method-1',
      title: 'Value Receiver',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Define a method with a value receiver.',
      skeleton: `package main

import "fmt"

type Circle struct {
    Radius float64
}

func __BLANK__ Area() float64 {
    return 3.14159 * c.Radius * c.Radius
}

func main() {
    c := Circle{Radius: 5}
    fmt.Printf("%.2f\\n", c.Area())
}`,
      solution: `package main

import "fmt"

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return 3.14159 * c.Radius * c.Radius
}

func main() {
    c := Circle{Radius: 5}
    fmt.Printf("%.2f\\n", c.Area())
}`,
      hints: [
        'The receiver goes in parentheses between func and the method name.',
        'A value receiver uses the type directly: (c Circle).',
        'func (c Circle) Area() float64 { ... }',
      ],
      concepts: ['value receiver', 'method syntax', 'struct methods'],
    },
    {
      id: 'go-method-2',
      title: 'Pointer Receiver',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Define a method with a pointer receiver that modifies the struct.',
      skeleton: `package main

import "fmt"

type Account struct {
    Balance float64
}

func (a __BLANK__) Deposit(amount float64) {
    a.Balance += amount
}

func main() {
    acc := Account{Balance: 100}
    acc.Deposit(50)
    fmt.Println(acc.Balance) // 150
}`,
      solution: `package main

import "fmt"

type Account struct {
    Balance float64
}

func (a *Account) Deposit(amount float64) {
    a.Balance += amount
}

func main() {
    acc := Account{Balance: 100}
    acc.Deposit(50)
    fmt.Println(acc.Balance) // 150
}`,
      hints: [
        'A pointer receiver uses *Type in the receiver.',
        'Pointer receivers can modify the original struct.',
        '(a *Account) makes Deposit modify the actual account.',
      ],
      concepts: ['pointer receiver', 'mutation', 'method receiver'],
    },
    {
      id: 'go-method-3',
      title: 'Method vs Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Convert a regular function to a method on a type.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

type Name struct {
    First string
    Last  string
}

// Define FullName as a method on Name
func __BLANK__ FullName() string {
    return n.First + " " + n.Last
}

func __BLANK__ Initials() string {
    return strings.ToUpper(string(n.First[0])) + strings.ToUpper(string(n.Last[0]))
}

func main() {
    n := Name{"John", "Doe"}
    fmt.Println(n.FullName())  // John Doe
    fmt.Println(n.Initials())  // JD
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

type Name struct {
    First string
    Last  string
}

func (n Name) FullName() string {
    return n.First + " " + n.Last
}

func (n Name) Initials() string {
    return strings.ToUpper(string(n.First[0])) + strings.ToUpper(string(n.Last[0]))
}

func main() {
    n := Name{"John", "Doe"}
    fmt.Println(n.FullName())  // John Doe
    fmt.Println(n.Initials())  // JD
}`,
      hints: [
        'Methods need a receiver: (n Name) before the method name.',
        'Both methods read but do not modify, so value receiver is fine.',
        'func (n Name) MethodName() ...',
      ],
      concepts: ['methods', 'value receiver', 'struct methods'],
    },
    {
      id: 'go-method-4',
      title: 'Method Set Rules',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict which methods are available on value vs pointer types.',
      skeleton: `package main

import "fmt"

type Counter struct {
    count int
}

func (c Counter) Value() int {
    return c.count
}

func (c *Counter) Increment() {
    c.count++
}

func main() {
    c := Counter{count: 0}
    c.Increment() // Go auto-takes address
    fmt.Println(c.Value())
}`,
      solution: `1`,
      hints: [
        'Go automatically takes the address when calling a pointer method on a value.',
        'c.Increment() works even though c is a value, not a pointer.',
        'After Increment, count is 1.',
      ],
      concepts: ['method sets', 'auto-addressing', 'pointer receiver'],
    },
    {
      id: 'go-method-5',
      title: 'Chained Methods',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write chainable methods that return the receiver pointer.',
      skeleton: `package main

import "fmt"

type Builder struct {
    parts []string
}

func (b *Builder) Add(part string) *Builder {
    // Add part and return b for chaining
}

func (b *Builder) Build() string {
    // Join all parts with space
}

func main() {
    result := new(Builder).Add("Hello").Add("Go").Add("World").Build()
    fmt.Println(result) // Hello Go World
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

type Builder struct {
    parts []string
}

func (b *Builder) Add(part string) *Builder {
    b.parts = append(b.parts, part)
    return b
}

func (b *Builder) Build() string {
    return strings.Join(b.parts, " ")
}

func main() {
    result := new(Builder).Add("Hello").Add("Go").Add("World").Build()
    fmt.Println(result) // Hello Go World
}`,
      hints: [
        'Return *Builder from Add for method chaining.',
        'Append the part and return b.',
        'Use strings.Join in Build.',
      ],
      concepts: ['method chaining', 'fluent interface', 'builder pattern'],
    },
    {
      id: 'go-method-6',
      title: 'Method Expression',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use a method expression to get a function from a method.',
      skeleton: `package main

import "fmt"

type Greeter struct {
    Greeting string
}

func (g Greeter) Greet(name string) string {
    return g.Greeting + ", " + name + "!"
}

func main() {
    greetFn := __BLANK__.Greet
    g := Greeter{Greeting: "Hello"}
    fmt.Println(greetFn(g, "World"))
}`,
      solution: `package main

import "fmt"

type Greeter struct {
    Greeting string
}

func (g Greeter) Greet(name string) string {
    return g.Greeting + ", " + name + "!"
}

func main() {
    greetFn := Greeter.Greet
    g := Greeter{Greeting: "Hello"}
    fmt.Println(greetFn(g, "World"))
}`,
      hints: [
        'A method expression creates a function from a method.',
        'The receiver becomes the first parameter.',
        'Greeter.Greet has signature func(Greeter, string) string.',
      ],
      concepts: ['method expression', 'function value', 'receiver as parameter'],
    },
    {
      id: 'go-method-7',
      title: 'Method Value',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use a method value bound to a specific instance.',
      skeleton: `package main

import "fmt"

type Adder struct {
    Base int
}

func (a Adder) Add(n int) int {
    return a.Base + n
}

func applyAll(fn func(int) int, values []int) []int {
    result := make([]int, len(values))
    for i, v := range values {
        result[i] = fn(v)
    }
    return result
}

func main() {
    a := Adder{Base: 10}
    // Get a method value bound to 'a' and pass it to applyAll
    result := applyAll(a.Add, []int{1, 2, 3})
    fmt.Println(result) // [11 12 13]
}`,
      solution: `package main

import "fmt"

type Adder struct {
    Base int
}

func (a Adder) Add(n int) int {
    return a.Base + n
}

func applyAll(fn func(int) int, values []int) []int {
    result := make([]int, len(values))
    for i, v := range values {
        result[i] = fn(v)
    }
    return result
}

func main() {
    a := Adder{Base: 10}
    result := applyAll(a.Add, []int{1, 2, 3})
    fmt.Println(result) // [11 12 13]
}`,
      hints: [
        'a.Add is a method value -- a function bound to the instance a.',
        'It has signature func(int) int, with the receiver already bound.',
        'This can be passed directly to functions expecting func(int) int.',
      ],
      concepts: ['method value', 'bound method', 'first-class function'],
    },
    {
      id: 'go-method-8',
      title: 'Embedding Methods',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Demonstrate that embedded struct methods are promoted.',
      skeleton: `package main

import "fmt"

type Logger struct {
    Prefix string
}

func (l Logger) Log(msg string) {
    fmt.Printf("[%s] %s\\n", l.Prefix, msg)
}

type Service struct {
    // Embed Logger so Service gets the Log method
    Name string
}

func main() {
    s := Service{
        Logger: Logger{Prefix: "SVC"},
        Name:   "MyService",
    }
    s.Log("started") // Should work via promotion
}`,
      solution: `package main

import "fmt"

type Logger struct {
    Prefix string
}

func (l Logger) Log(msg string) {
    fmt.Printf("[%s] %s\\n", l.Prefix, msg)
}

type Service struct {
    Logger
    Name string
}

func main() {
    s := Service{
        Logger: Logger{Prefix: "SVC"},
        Name:   "MyService",
    }
    s.Log("started")
}`,
      hints: [
        'Embed Logger as an anonymous field in Service.',
        'The Log method is promoted and available on Service.',
        's.Log("started") calls Logger.Log.',
      ],
      concepts: ['method promotion', 'embedding', 'composition over inheritance'],
    },
    {
      id: 'go-method-9',
      title: 'Fix Value Receiver Mutation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the method that fails to modify the struct because it uses a value receiver.',
      skeleton: `package main

import "fmt"

type Player struct {
    Health int
}

func (p Player) TakeDamage(dmg int) {
    p.Health -= dmg
}

func main() {
    p := Player{Health: 100}
    p.TakeDamage(30)
    fmt.Println(p.Health) // Expected 70, got 100
}`,
      solution: `package main

import "fmt"

type Player struct {
    Health int
}

func (p *Player) TakeDamage(dmg int) {
    p.Health -= dmg
}

func main() {
    p := Player{Health: 100}
    p.TakeDamage(30)
    fmt.Println(p.Health) // 70
}`,
      hints: [
        'A value receiver works on a copy -- changes are lost.',
        'Use a pointer receiver to modify the actual struct.',
        'Change (p Player) to (p *Player).',
      ],
      concepts: ['value vs pointer receiver', 'mutation bug', 'method receivers'],
    },
    {
      id: 'go-method-10',
      title: 'Fix Method on Non-Local Type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the error of defining a method on a built-in type.',
      skeleton: `package main

import "fmt"

func (s string) Reverse() string {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}

func main() {
    fmt.Println("hello".Reverse())
}`,
      solution: `package main

import "fmt"

type MyString string

func (s MyString) Reverse() string {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}

func main() {
    s := MyString("hello")
    fmt.Println(s.Reverse())
}`,
      hints: [
        'You cannot define methods on types from other packages.',
        'Create a defined type based on string.',
        'type MyString string allows you to add methods.',
      ],
      concepts: ['defined types', 'non-local type', 'method declaration'],
    },
    {
      id: 'go-method-11',
      title: 'Stringer Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement the Stringer interface for custom fmt output.',
      skeleton: `package main

import "fmt"

type Point struct {
    X, Y int
}

// Implement String() so fmt.Println prints "(X, Y)"

func main() {
    p := Point{3, 4}
    fmt.Println(p) // (3, 4)
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
    fmt.Println(p) // (3, 4)
}`,
      hints: [
        'The fmt.Stringer interface requires a String() string method.',
        'fmt.Println calls String() automatically on types that implement it.',
        'func (p Point) String() string { return fmt.Sprintf("(%d, %d)", p.X, p.Y) }',
      ],
      concepts: ['Stringer interface', 'String method', 'fmt formatting'],
    },
    {
      id: 'go-method-12',
      title: 'Predict Method Set',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Predict which receiver type a method set includes.',
      skeleton: `package main

import "fmt"

type T struct{}

func (t T) ValueMethod() string   { return "value" }
func (t *T) PointerMethod() string { return "pointer" }

func main() {
    var t T
    fmt.Println(t.ValueMethod())
    fmt.Println(t.PointerMethod()) // auto-addressing

    var pt *T = &t
    fmt.Println(pt.ValueMethod())  // auto-dereferencing
    fmt.Println(pt.PointerMethod())
}`,
      solution: `value
pointer
value
pointer`,
      hints: [
        'Values can call pointer methods -- Go auto-takes the address.',
        'Pointers can call value methods -- Go auto-dereferences.',
        'Both work in direct method calls.',
      ],
      concepts: ['method set', 'auto-addressing', 'auto-dereferencing'],
    },
    {
      id: 'go-method-13',
      title: 'Fix Missing Pointer Method',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the method that should modify the receiver but does not take a pointer.',
      skeleton: `package main

import "fmt"

type Queue struct {
    items []string
}

func (q Queue) Enqueue(item string) {
    q.items = append(q.items, item)
}

func (q Queue) Dequeue() string {
    if len(q.items) == 0 {
        return ""
    }
    item := q.items[0]
    q.items = q.items[1:]
    return item
}

func main() {
    q := Queue{}
    q.Enqueue("a")
    q.Enqueue("b")
    fmt.Println(q.Dequeue()) // Expected: "a", Got: ""
}`,
      solution: `package main

import "fmt"

type Queue struct {
    items []string
}

func (q *Queue) Enqueue(item string) {
    q.items = append(q.items, item)
}

func (q *Queue) Dequeue() string {
    if len(q.items) == 0 {
        return ""
    }
    item := q.items[0]
    q.items = q.items[1:]
    return item
}

func main() {
    q := &Queue{}
    q.Enqueue("a")
    q.Enqueue("b")
    fmt.Println(q.Dequeue()) // "a"
}`,
      hints: [
        'Both Enqueue and Dequeue modify the items slice.',
        'Value receivers get a copy -- changes to the slice header are lost.',
        'Change both to pointer receivers and use &Queue{} in main.',
      ],
      concepts: ['pointer receiver', 'slice modification', 'queue implementation'],
    },
    {
      id: 'go-method-14',
      title: 'Method on Defined Type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Define methods on a custom type based on a slice.',
      skeleton: `package main

import "fmt"

type IntSlice []int

// Add a Sum method that returns the sum of all elements
// Add a Map method that applies a function to each element

func main() {
    s := IntSlice{1, 2, 3, 4, 5}
    fmt.Println(s.Sum()) // 15
    doubled := s.Map(func(n int) int { return n * 2 })
    fmt.Println(doubled) // [2 4 6 8 10]
}`,
      solution: `package main

import "fmt"

type IntSlice []int

func (s IntSlice) Sum() int {
    total := 0
    for _, v := range s {
        total += v
    }
    return total
}

func (s IntSlice) Map(f func(int) int) IntSlice {
    result := make(IntSlice, len(s))
    for i, v := range s {
        result[i] = f(v)
    }
    return result
}

func main() {
    s := IntSlice{1, 2, 3, 4, 5}
    fmt.Println(s.Sum()) // 15
    doubled := s.Map(func(n int) int { return n * 2 })
    fmt.Println(doubled) // [2 4 6 8 10]
}`,
      hints: [
        'You can define methods on any defined type, including slice types.',
        'Sum iterates and accumulates values.',
        'Map creates a new slice with transformed values.',
      ],
      concepts: ['methods on defined types', 'custom slice type', 'functional methods'],
    },
    {
      id: 'go-method-15',
      title: 'Predict Receiver Copy',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict output showing that value receivers work on copies.',
      skeleton: `package main

import "fmt"

type Box struct {
    Size int
}

func (b Box) Double() Box {
    b.Size *= 2
    return b
}

func main() {
    b := Box{Size: 5}
    b2 := b.Double()
    fmt.Println(b.Size, b2.Size)
}`,
      solution: `5 10`,
      hints: [
        'Double has a value receiver, so b inside the method is a copy.',
        'The original b.Size remains 5.',
        'b2 gets the modified copy with Size 10.',
      ],
      concepts: ['value receiver copy', 'immutability', 'return value'],
    },
    {
      id: 'go-method-16',
      title: 'Implement sort.Interface',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement Len, Less, and Swap methods to satisfy sort.Interface.',
      skeleton: `package main

import (
    "fmt"
    "sort"
)

type Person struct {
    Name string
    Age  int
}

type ByAge []Person

// Implement Len, Less, Swap for ByAge

func main() {
    people := ByAge{
        {"Alice", 30},
        {"Bob", 25},
        {"Carol", 35},
    }
    sort.Sort(people)
    fmt.Println(people[0].Name) // Bob
}`,
      solution: `package main

import (
    "fmt"
    "sort"
)

type Person struct {
    Name string
    Age  int
}

type ByAge []Person

func (a ByAge) Len() int           { return len(a) }
func (a ByAge) Less(i, j int) bool { return a[i].Age < a[j].Age }
func (a ByAge) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }

func main() {
    people := ByAge{
        {"Alice", 30},
        {"Bob", 25},
        {"Carol", 35},
    }
    sort.Sort(people)
    fmt.Println(people[0].Name) // Bob
}`,
      hints: [
        'sort.Interface requires Len() int, Less(i, j int) bool, Swap(i, j int).',
        'Len returns the length, Less compares by Age.',
        'Swap exchanges two elements.',
      ],
      concepts: ['sort.Interface', 'interface implementation', 'custom sorting'],
    },
    {
      id: 'go-method-17',
      title: 'Refactor to Methods',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Refactor standalone functions to methods on a type.',
      skeleton: `package main

import "fmt"

type Temp struct {
    Celsius float64
}

func toFahrenheit(t Temp) float64 {
    return t.Celsius*9/5 + 32
}

func toKelvin(t Temp) float64 {
    return t.Celsius + 273.15
}

func main() {
    t := Temp{100}
    fmt.Println(toFahrenheit(t))
    fmt.Println(toKelvin(t))
}`,
      solution: `package main

import "fmt"

type Temp struct {
    Celsius float64
}

func (t Temp) ToFahrenheit() float64 {
    return t.Celsius*9/5 + 32
}

func (t Temp) ToKelvin() float64 {
    return t.Celsius + 273.15
}

func main() {
    t := Temp{100}
    fmt.Println(t.ToFahrenheit())
    fmt.Println(t.ToKelvin())
}`,
      hints: [
        'Convert the Temp parameter to a value receiver.',
        'func toFahrenheit(t Temp) becomes func (t Temp) ToFahrenheit().',
        'Call with t.ToFahrenheit() instead of toFahrenheit(t).',
      ],
      concepts: ['refactoring', 'function to method', 'receiver syntax'],
    },
    {
      id: 'go-method-18',
      title: 'Refactor Consistent Receiver',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor mixed receiver types to use a consistent pointer receiver.',
      skeleton: `package main

import "fmt"

type Cache struct {
    data map[string]string
}

func NewCache() *Cache {
    return &Cache{data: make(map[string]string)}
}

func (c Cache) Get(key string) (string, bool) {
    val, ok := c.data[key]
    return val, ok
}

func (c *Cache) Set(key, value string) {
    c.data[key] = value
}

func (c Cache) Len() int {
    return len(c.data)
}

func main() {
    c := NewCache()
    c.Set("a", "1")
    v, _ := c.Get("a")
    fmt.Println(v, c.Len())
}`,
      solution: `package main

import "fmt"

type Cache struct {
    data map[string]string
}

func NewCache() *Cache {
    return &Cache{data: make(map[string]string)}
}

func (c *Cache) Get(key string) (string, bool) {
    val, ok := c.data[key]
    return val, ok
}

func (c *Cache) Set(key, value string) {
    c.data[key] = value
}

func (c *Cache) Len() int {
    return len(c.data)
}

func main() {
    c := NewCache()
    c.Set("a", "1")
    v, _ := c.Get("a")
    fmt.Println(v, c.Len())
}`,
      hints: [
        'When any method needs a pointer receiver, all methods should use pointer receivers.',
        'This ensures consistent method sets for interface satisfaction.',
        'Change all value receivers to pointer receivers.',
      ],
      concepts: ['consistent receivers', 'method set consistency', 'best practice'],
    },
    {
      id: 'go-method-19',
      title: 'Predict Embedded Method Override',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Predict which method is called when outer type overrides an embedded method.',
      skeleton: `package main

import "fmt"

type Base struct{}

func (Base) Hello() string { return "Base" }

type Child struct {
    Base
}

func (Child) Hello() string { return "Child" }

func main() {
    c := Child{}
    fmt.Println(c.Hello())
    fmt.Println(c.Base.Hello())
}`,
      solution: `Child
Base`,
      hints: [
        'When Child defines its own Hello, it shadows the promoted Base.Hello.',
        'c.Hello() calls Child.Hello.',
        'c.Base.Hello() explicitly calls the embedded Base.Hello.',
      ],
      concepts: ['method shadowing', 'embedding', 'explicit access'],
    },
    {
      id: 'go-method-20',
      title: 'Iterator Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement an iterator pattern using methods on a custom type.',
      skeleton: `package main

import "fmt"

type IntRange struct {
    current int
    end     int
}

func NewRange(start, end int) *IntRange {
    return &IntRange{current: start, end: end}
}

func (r *IntRange) Next() (int, bool) {
    // Return next value and true, or 0 and false when done
}

func main() {
    r := NewRange(1, 5)
    for v, ok := r.Next(); ok; v, ok = r.Next() {
        fmt.Print(v, " ")
    }
    // Output: 1 2 3 4 5
}`,
      solution: `package main

import "fmt"

type IntRange struct {
    current int
    end     int
}

func NewRange(start, end int) *IntRange {
    return &IntRange{current: start, end: end}
}

func (r *IntRange) Next() (int, bool) {
    if r.current > r.end {
        return 0, false
    }
    val := r.current
    r.current++
    return val, true
}

func main() {
    r := NewRange(1, 5)
    for v, ok := r.Next(); ok; v, ok = r.Next() {
        fmt.Print(v, " ")
    }
    // Output: 1 2 3 4 5
}`,
      hints: [
        'Check if current exceeds end to know when iteration is done.',
        'Return the current value and increment it.',
        'Return false when the range is exhausted.',
      ],
      concepts: ['iterator pattern', 'stateful methods', 'pointer receiver'],
    },
  ],
};
