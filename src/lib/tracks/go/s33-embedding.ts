import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-emb',
  title: '33. Embedding',
  explanation: `## Embedding in Go

Go uses embedding instead of inheritance. Embedding promotes the fields and methods of the embedded type to the outer struct.

\`\`\`go
// Struct embedding
type Base struct {
    ID int
}

func (b Base) Describe() string {
    return fmt.Sprintf("ID=%d", b.ID)
}

type User struct {
    Base          // embedded struct
    Name string
}

u := User{Base: Base{ID: 1}, Name: "Alice"}
u.ID          // promoted field
u.Describe()  // promoted method

// Interface embedding
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

type ReadWriter interface {
    Reader  // embedded interface
    Writer  // embedded interface
}

// Embedding pointer types
type Node struct {
    *Tree
    Value int
}
\`\`\`

Key rules:
- Promoted methods count for interface satisfaction
- The outer type can override promoted methods (shadowing)
- If two embedded types have the same method, ambiguity must be resolved
- Embedding a pointer type embeds the pointer, not a copy`,
  exercises: [
    {
      id: 'go-emb-1',
      title: 'Basic Struct Embedding',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Embed one struct inside another.',
      skeleton: `package main

import "fmt"

type Animal struct {
    Name string
}

type Dog struct {
    __BLANK__
    Breed string
}

func main() {
    d := Dog{Animal: Animal{Name: "Rex"}, Breed: "Labrador"}
    fmt.Println(d.Name, d.Breed)
}`,
      solution: `package main

import "fmt"

type Animal struct {
    Name string
}

type Dog struct {
    Animal
    Breed string
}

func main() {
    d := Dog{Animal: Animal{Name: "Rex"}, Breed: "Labrador"}
    fmt.Println(d.Name, d.Breed)
}`,
      hints: [
        'Embedding uses just the type name without a field name.',
        'Animal (not Animal Animal) embeds the struct.',
        'Promoted fields are accessed directly: d.Name.',
      ],
      concepts: ['embedding', 'promoted fields'],
    },
    {
      id: 'go-emb-2',
      title: 'Promoted Method Access',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Access a promoted method from an embedded struct.',
      skeleton: `package main

import "fmt"

type Logger struct {
    Prefix string
}

func (l Logger) Log(msg string) string {
    return l.Prefix + ": " + msg
}

type App struct {
    __BLANK__
    Name string
}

func main() {
    a := App{Logger: Logger{Prefix: "INFO"}, Name: "MyApp"}
    fmt.Println(a.Log("started"))
}`,
      solution: `package main

import "fmt"

type Logger struct {
    Prefix string
}

func (l Logger) Log(msg string) string {
    return l.Prefix + ": " + msg
}

type App struct {
    Logger
    Name string
}

func main() {
    a := App{Logger: Logger{Prefix: "INFO"}, Name: "MyApp"}
    fmt.Println(a.Log("started"))
}`,
      hints: [
        'Embed Logger to promote its Log method.',
        'Use just the type name without a field name.',
        'a.Log() calls the promoted method from Logger.',
      ],
      concepts: ['embedding', 'promoted methods'],
    },
    {
      id: 'go-emb-3',
      title: 'Embedding for Interface Satisfaction',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use embedding to satisfy an interface.',
      skeleton: `package main

import "fmt"

type Speaker interface {
    Speak() string
}

type Voice struct{}

func (v Voice) Speak() string {
    return "Hello!"
}

type Robot struct {
    __BLANK__
    Model string
}

func greet(s Speaker) {
    fmt.Println(s.Speak())
}

func main() {
    r := Robot{Model: "X100"}
    greet(r)
}`,
      solution: `package main

import "fmt"

type Speaker interface {
    Speak() string
}

type Voice struct{}

func (v Voice) Speak() string {
    return "Hello!"
}

type Robot struct {
    Voice
    Model string
}

func greet(s Speaker) {
    fmt.Println(s.Speak())
}

func main() {
    r := Robot{Model: "X100"}
    greet(r)
}`,
      hints: [
        'Embedding Voice promotes Speak() to Robot.',
        'Robot then satisfies the Speaker interface.',
        'No explicit interface declaration needed.',
      ],
      concepts: ['embedding', 'interface satisfaction'],
    },
    {
      id: 'go-emb-4',
      title: 'Interface Embedding',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Create a composite interface by embedding two interfaces.',
      skeleton: `package main

import "fmt"

type Reader interface {
    Read() string
}

type Writer interface {
    Write(s string)
}

type ReadWriter interface {
    __BLANK__
    __BLANK__
}

type File struct {
    content string
}

func (f *File) Read() string    { return f.content }
func (f *File) Write(s string)  { f.content = s }

func process(rw ReadWriter) {
    rw.Write("hello")
    fmt.Println(rw.Read())
}

func main() {
    process(&File{})
}`,
      solution: `package main

import "fmt"

type Reader interface {
    Read() string
}

type Writer interface {
    Write(s string)
}

type ReadWriter interface {
    Reader
    Writer
}

type File struct {
    content string
}

func (f *File) Read() string    { return f.content }
func (f *File) Write(s string)  { f.content = s }

func process(rw ReadWriter) {
    rw.Write("hello")
    fmt.Println(rw.Read())
}

func main() {
    process(&File{})
}`,
      hints: [
        'Embed Reader and Writer inside ReadWriter.',
        'Interface embedding combines method sets.',
        '*File implements both Read and Write.',
      ],
      concepts: ['interface embedding', 'composition'],
    },
    {
      id: 'go-emb-5',
      title: 'Embedding Pointer Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Embed a pointer type in a struct.',
      skeleton: `package main

import "fmt"

type Config struct {
    Debug bool
}

func (c *Config) IsDebug() bool {
    return c.Debug
}

type Server struct {
    __BLANK__
    Port int
}

func main() {
    cfg := &Config{Debug: true}
    s := Server{Config: cfg, Port: 8080}
    fmt.Println(s.IsDebug(), s.Port)
}`,
      solution: `package main

import "fmt"

type Config struct {
    Debug bool
}

func (c *Config) IsDebug() bool {
    return c.Debug
}

type Server struct {
    *Config
    Port int
}

func main() {
    cfg := &Config{Debug: true}
    s := Server{Config: cfg, Port: 8080}
    fmt.Println(s.IsDebug(), s.Port)
}`,
      hints: [
        'Embed *Config to embed a pointer type.',
        'This shares the Config instance by reference.',
        'Methods on *Config are promoted to Server.',
      ],
      concepts: ['embedding', 'pointer type', 'shared state'],
    },
    {
      id: 'go-emb-6',
      title: 'Method Shadowing',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Override a promoted method by defining it on the outer type.',
      skeleton: `package main

import "fmt"

type Base struct{}

func (b Base) Greet() string {
    return "Hello from Base"
}

type Child struct {
    Base
}

func (c Child) __BLANK__ string {
    return "Hello from Child"
}

func main() {
    c := Child{}
    fmt.Println(c.Greet())
    fmt.Println(c.Base.Greet())
}`,
      solution: `package main

import "fmt"

type Base struct{}

func (b Base) Greet() string {
    return "Hello from Base"
}

type Child struct {
    Base
}

func (c Child) Greet() string {
    return "Hello from Child"
}

func main() {
    c := Child{}
    fmt.Println(c.Greet())
    fmt.Println(c.Base.Greet())
}`,
      hints: [
        'Define Greet() on Child to shadow the promoted method.',
        'c.Greet() calls Child\'s version.',
        'c.Base.Greet() explicitly calls the embedded version.',
      ],
      concepts: ['embedding', 'method shadowing'],
    },
    {
      id: 'go-emb-7',
      title: 'Promoted Field Predict',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the output of promoted field access.',
      skeleton: `package main

import "fmt"

type Point struct {
    X, Y int
}

type Circle struct {
    Point
    Radius int
}

func main() {
    c := Circle{Point{3, 4}, 5}
    fmt.Println(c.X, c.Y, c.Radius)
    fmt.Println(c.Point.X, c.Point.Y)
}`,
      solution: `3 4 5
3 4`,
      hints: [
        'c.X is promoted from Point, same as c.Point.X.',
        'c.Y is promoted from Point, same as c.Point.Y.',
        'Both access patterns give the same values.',
      ],
      concepts: ['embedding', 'promoted fields'],
    },
    {
      id: 'go-emb-8',
      title: 'Shadowing Predict',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the output when a method is shadowed.',
      skeleton: `package main

import "fmt"

type A struct{}
func (A) Name() string { return "A" }

type B struct{ A }
func (B) Name() string { return "B" }

type C struct{ B }

func main() {
    c := C{}
    fmt.Println(c.Name())
    fmt.Println(c.B.Name())
    fmt.Println(c.B.A.Name())
}`,
      solution: `B
B
A`,
      hints: [
        'c.Name() resolves to the shallowest embedding: B.Name().',
        'c.B.Name() is explicitly B\'s method.',
        'c.B.A.Name() reaches the original A.Name().',
      ],
      concepts: ['embedding', 'method shadowing', 'depth'],
    },
    {
      id: 'go-emb-9',
      title: 'Multiple Embedding Predict',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Predict behavior with multiple embedded structs.',
      skeleton: `package main

import "fmt"

type Foo struct{}
func (Foo) Hello() string { return "Foo" }

type Bar struct{}
func (Bar) Hello() string { return "Bar" }

type Baz struct {
    Foo
    Bar
}

func (b Baz) Hello() string { return "Baz" }

func main() {
    b := Baz{}
    fmt.Println(b.Hello())
}`,
      solution: `Baz`,
      hints: [
        'Both Foo and Bar have Hello(), creating ambiguity.',
        'Baz defines its own Hello(), which resolves the ambiguity.',
        'Without Baz.Hello(), this would be a compile error.',
      ],
      concepts: ['embedding', 'ambiguity resolution', 'shadowing'],
    },
    {
      id: 'go-emb-10',
      title: 'Composition Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use embedding to compose a type with reusable behaviors.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

type Timestamped struct {
    CreatedAt time.Time
    UpdatedAt time.Time
}

func (t *Timestamped) Touch() {
    t.UpdatedAt = time.Now()
}

type Named struct {
    Name string
}

func (n Named) String() string {
    return n.Name
}

// Article should embed both Timestamped and Named,
// and have a Body field.
// TODO: define Article struct

func main() {
    a := Article{
        Named:       Named{Name: "Go Embedding"},
        Timestamped: Timestamped{CreatedAt: time.Now()},
        Body:        "Embedding is composition.",
    }
    a.Touch()
    fmt.Println(a.String())
    fmt.Println(a.Body)
}`,
      solution: `package main

import (
    "fmt"
    "time"
)

type Timestamped struct {
    CreatedAt time.Time
    UpdatedAt time.Time
}

func (t *Timestamped) Touch() {
    t.UpdatedAt = time.Now()
}

type Named struct {
    Name string
}

func (n Named) String() string {
    return n.Name
}

type Article struct {
    Named
    Timestamped
    Body string
}

func main() {
    a := Article{
        Named:       Named{Name: "Go Embedding"},
        Timestamped: Timestamped{CreatedAt: time.Now()},
        Body:        "Embedding is composition.",
    }
    a.Touch()
    fmt.Println(a.String())
    fmt.Println(a.Body)
}`,
      hints: [
        'Embed both Named and Timestamped in Article.',
        'Add a Body string field.',
        'Both Touch() and String() are promoted to Article.',
      ],
      concepts: ['embedding', 'composition', 'multiple embedding'],
    },
    {
      id: 'go-emb-11',
      title: 'Mutex Embedding',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Embed sync.Mutex to make a thread-safe counter.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

// SafeCounter should embed sync.Mutex and have a count field.
// Implement Inc() and Value() methods.
// TODO: define SafeCounter and its methods

func main() {
    c := &SafeCounter{}
    var wg sync.WaitGroup
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            c.Inc()
        }()
    }
    wg.Wait()
    fmt.Println(c.Value())
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

type SafeCounter struct {
    sync.Mutex
    count int
}

func (c *SafeCounter) Inc() {
    c.Lock()
    defer c.Unlock()
    c.count++
}

func (c *SafeCounter) Value() int {
    c.Lock()
    defer c.Unlock()
    return c.count
}

func main() {
    c := &SafeCounter{}
    var wg sync.WaitGroup
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            c.Inc()
        }()
    }
    wg.Wait()
    fmt.Println(c.Value())
}`,
      hints: [
        'Embed sync.Mutex to promote Lock() and Unlock().',
        'Use c.Lock() and c.Unlock() via promoted methods.',
        'Both Inc and Value need pointer receivers for the mutex.',
      ],
      concepts: ['embedding', 'sync.Mutex', 'thread safety'],
    },
    {
      id: 'go-emb-12',
      title: 'HTTP Handler Embedding',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Embed an http.Handler to add middleware behavior.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

// LoggingHandler embeds http.Handler and logs each request.
// TODO: define LoggingHandler struct with embedded http.Handler
// TODO: implement ServeHTTP that prints the method and path,
//       then delegates to the embedded handler.

type helloHandler struct{}

func (h helloHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello!")
}

func main() {
    lh := LoggingHandler{Handler: helloHandler{}}
    fmt.Printf("Type: %T\\n", lh)
}`,
      solution: `package main

import (
    "fmt"
    "net/http"
)

type LoggingHandler struct {
    http.Handler
}

func (lh LoggingHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    fmt.Printf("%s %s\\n", r.Method, r.URL.Path)
    lh.Handler.ServeHTTP(w, r)
}

type helloHandler struct{}

func (h helloHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello!")
}

func main() {
    lh := LoggingHandler{Handler: helloHandler{}}
    fmt.Printf("Type: %T\\n", lh)
}`,
      hints: [
        'Embed http.Handler interface in LoggingHandler struct.',
        'Override ServeHTTP to add logging before delegating.',
        'Call lh.Handler.ServeHTTP to delegate to the wrapped handler.',
      ],
      concepts: ['embedding', 'http.Handler', 'middleware'],
    },
    {
      id: 'go-emb-13',
      title: 'Fix Nil Embedded Pointer',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix a nil pointer dereference from uninitialized embedded pointer.',
      skeleton: `package main

import "fmt"

type Engine struct {
    Horsepower int
}

func (e *Engine) Start() string {
    return fmt.Sprintf("Engine %dHP started", e.Horsepower)
}

type Car struct {
    *Engine
    Model string
}

func main() {
    // BUG: Engine is nil, calling Start() panics
    c := Car{Model: "Sedan"}
    fmt.Println(c.Start())
}`,
      solution: `package main

import "fmt"

type Engine struct {
    Horsepower int
}

func (e *Engine) Start() string {
    return fmt.Sprintf("Engine %dHP started", e.Horsepower)
}

type Car struct {
    *Engine
    Model string
}

func main() {
    c := Car{Engine: &Engine{Horsepower: 200}, Model: "Sedan"}
    fmt.Println(c.Start())
}`,
      hints: [
        'Embedded pointer types default to nil.',
        'Initialize the Engine field with a valid pointer.',
        'Use &Engine{Horsepower: 200} to create the embedded value.',
      ],
      concepts: ['embedding', 'nil pointer', 'initialization'],
    },
    {
      id: 'go-emb-14',
      title: 'Fix Ambiguous Selector',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix an ambiguous selector error from embedding two types with the same field.',
      skeleton: `package main

import "fmt"

type Dimensions struct {
    Width  int
    Height int
}

type Style struct {
    Width  int  // same field name as Dimensions
    Color  string
}

type Widget struct {
    Dimensions
    Style
}

func main() {
    w := Widget{
        Dimensions: Dimensions{Width: 100, Height: 50},
        Style:      Style{Width: 200, Color: "red"},
    }
    // BUG: w.Width is ambiguous
    fmt.Println("Dim width:", w.Width)
    fmt.Println("Style width:", w.Width)
    fmt.Println("Height:", w.Height)
}`,
      solution: `package main

import "fmt"

type Dimensions struct {
    Width  int
    Height int
}

type Style struct {
    Width  int
    Color  string
}

type Widget struct {
    Dimensions
    Style
}

func main() {
    w := Widget{
        Dimensions: Dimensions{Width: 100, Height: 50},
        Style:      Style{Width: 200, Color: "red"},
    }
    fmt.Println("Dim width:", w.Dimensions.Width)
    fmt.Println("Style width:", w.Style.Width)
    fmt.Println("Height:", w.Height)
}`,
      hints: [
        'When two embedded types have the same field, access is ambiguous.',
        'Use the full qualified path: w.Dimensions.Width.',
        'Height is not ambiguous since only Dimensions has it.',
      ],
      concepts: ['embedding', 'ambiguity', 'field resolution'],
    },
    {
      id: 'go-emb-15',
      title: 'Fix Shadowed Method Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix a bug where an outer method forgets to call the embedded method.',
      skeleton: `package main

import "fmt"

type Validator struct {
    errors []string
}

func (v *Validator) AddError(msg string) {
    v.errors = append(v.errors, msg)
}

func (v *Validator) IsValid() bool {
    return len(v.errors) == 0
}

type FormValidator struct {
    *Validator
    required []string
}

func (f *FormValidator) Validate(fields map[string]string) bool {
    // BUG: Creates a new Validator instead of using embedded one
    v := &Validator{}
    for _, req := range f.required {
        if fields[req] == "" {
            v.AddError(req + " is required")
        }
    }
    return v.IsValid()
}

func main() {
    fv := &FormValidator{
        Validator: &Validator{},
        required:  []string{"name", "email"},
    }
    result := fv.Validate(map[string]string{"name": "Go"})
    fmt.Println("Valid:", result)
    fmt.Println("Errors:", fv.errors)
}`,
      solution: `package main

import "fmt"

type Validator struct {
    errors []string
}

func (v *Validator) AddError(msg string) {
    v.errors = append(v.errors, msg)
}

func (v *Validator) IsValid() bool {
    return len(v.errors) == 0
}

type FormValidator struct {
    *Validator
    required []string
}

func (f *FormValidator) Validate(fields map[string]string) bool {
    for _, req := range f.required {
        if fields[req] == "" {
            f.AddError(req + " is required")
        }
    }
    return f.IsValid()
}

func main() {
    fv := &FormValidator{
        Validator: &Validator{},
        required:  []string{"name", "email"},
    }
    result := fv.Validate(map[string]string{"name": "Go"})
    fmt.Println("Valid:", result)
    fmt.Println("Errors:", fv.errors)
}`,
      hints: [
        'The bug creates a local Validator instead of using the embedded one.',
        'Use f.AddError() and f.IsValid() to use promoted methods.',
        'The errors are then stored in the embedded Validator.',
      ],
      concepts: ['embedding', 'promoted methods', 'state management'],
    },
    {
      id: 'go-emb-16',
      title: 'Decorator Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement a decorator pattern using embedding.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

type Transformer interface {
    Transform(s string) string
}

type Upper struct{}
func (Upper) Transform(s string) string { return strings.ToUpper(s) }

// TrimTransformer embeds a Transformer and trims spaces
// before delegating to the embedded transformer.
// TODO: define TrimTransformer and implement Transform

// PrefixTransformer embeds a Transformer and adds a prefix
// after the embedded transformer runs.
// TODO: define PrefixTransformer and implement Transform

func main() {
    t := PrefixTransformer{
        Transformer: TrimTransformer{
            Transformer: Upper{},
        },
        Prefix: ">>> ",
    }
    fmt.Println(t.Transform("  hello world  "))
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
func (Upper) Transform(s string) string { return strings.ToUpper(s) }

type TrimTransformer struct {
    Transformer
}

func (t TrimTransformer) Transform(s string) string {
    return t.Transformer.Transform(strings.TrimSpace(s))
}

type PrefixTransformer struct {
    Transformer
    Prefix string
}

func (p PrefixTransformer) Transform(s string) string {
    return p.Prefix + p.Transformer.Transform(s)
}

func main() {
    t := PrefixTransformer{
        Transformer: TrimTransformer{
            Transformer: Upper{},
        },
        Prefix: ">>> ",
    }
    fmt.Println(t.Transform("  hello world  "))
}`,
      hints: [
        'Embed the Transformer interface in each decorator struct.',
        'Override Transform to add behavior then delegate.',
        'Chain decorators by nesting: Prefix wraps Trim wraps Upper.',
      ],
      concepts: ['embedding', 'decorator pattern', 'composition'],
    },
    {
      id: 'go-emb-17',
      title: 'Embedding with Constructors',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write constructor functions for types with embedded structs.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

type Metadata struct {
    CreatedAt time.Time
    Version   int
}

type Document struct {
    Metadata
    Title   string
    Content string
}

// NewDocument creates a Document with initialized Metadata
// (CreatedAt = time.Now(), Version = 1).
// TODO: implement

// Revise creates a copy of the document with updated content
// and incremented version.
// TODO: implement as a method on Document

func main() {
    doc := NewDocument("Go Guide", "Learn Go")
    fmt.Println(doc.Title, doc.Version)
    revised := doc.Revise("Learn Go v2")
    fmt.Println(revised.Title, revised.Version, revised.Content)
}`,
      solution: `package main

import (
    "fmt"
    "time"
)

type Metadata struct {
    CreatedAt time.Time
    Version   int
}

type Document struct {
    Metadata
    Title   string
    Content string
}

func NewDocument(title, content string) Document {
    return Document{
        Metadata: Metadata{
            CreatedAt: time.Now(),
            Version:   1,
        },
        Title:   title,
        Content: content,
    }
}

func (d Document) Revise(newContent string) Document {
    return Document{
        Metadata: Metadata{
            CreatedAt: d.CreatedAt,
            Version:   d.Version + 1,
        },
        Title:   d.Title,
        Content: newContent,
    }
}

func main() {
    doc := NewDocument("Go Guide", "Learn Go")
    fmt.Println(doc.Title, doc.Version)
    revised := doc.Revise("Learn Go v2")
    fmt.Println(revised.Title, revised.Version, revised.Content)
}`,
      hints: [
        'Initialize Metadata in the constructor with time.Now() and Version 1.',
        'Revise returns a new Document, preserving CreatedAt.',
        'Increment Version in the revised copy.',
      ],
      concepts: ['embedding', 'constructor', 'immutability'],
    },
    {
      id: 'go-emb-18',
      title: 'Refactor Delegation to Embedding',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor manual delegation methods to use embedding.',
      skeleton: `package main

import "fmt"

type Cache struct {
    data map[string]string
}

func NewCache() *Cache {
    return &Cache{data: make(map[string]string)}
}

func (c *Cache) Get(key string) (string, bool) {
    v, ok := c.data[key]
    return v, ok
}

func (c *Cache) Set(key, value string) {
    c.data[key] = value
}

type UserService struct {
    cache *Cache
}

func NewUserService() *UserService {
    return &UserService{cache: NewCache()}
}

// These methods just delegate to cache
func (s *UserService) GetCached(key string) (string, bool) {
    return s.cache.Get(key)
}

func (s *UserService) SetCached(key, value string) {
    s.cache.Set(key, value)
}

func main() {
    svc := NewUserService()
    svc.SetCached("user:1", "Alice")
    v, _ := svc.GetCached("user:1")
    fmt.Println(v)
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
    v, ok := c.data[key]
    return v, ok
}

func (c *Cache) Set(key, value string) {
    c.data[key] = value
}

type UserService struct {
    *Cache
}

func NewUserService() *UserService {
    return &UserService{Cache: NewCache()}
}

func main() {
    svc := NewUserService()
    svc.Set("user:1", "Alice")
    v, _ := svc.Get("user:1")
    fmt.Println(v)
}`,
      hints: [
        'Replace the named cache field with an embedded *Cache.',
        'Remove the delegation methods; they are now promoted.',
        'Use svc.Get() and svc.Set() directly.',
      ],
      concepts: ['embedding', 'refactoring', 'delegation'],
    },
    {
      id: 'go-emb-19',
      title: 'Refactor to Interface Embedding',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor a large interface into composed smaller interfaces.',
      skeleton: `package main

import "fmt"

// This interface is too large. Refactor into smaller
// composed interfaces using embedding.
type Repository interface {
    Find(id int) (string, error)
    FindAll() ([]string, error)
    Create(item string) error
    Update(id int, item string) error
    Delete(id int) error
    Count() int
    Exists(id int) bool
}

type memRepo struct {
    items map[int]string
    next  int
}

func (r *memRepo) Find(id int) (string, error)     { return r.items[id], nil }
func (r *memRepo) FindAll() ([]string, error)       { vals := make([]string, 0); for _, v := range r.items { vals = append(vals, v) }; return vals, nil }
func (r *memRepo) Create(item string) error         { r.next++; r.items[r.next] = item; return nil }
func (r *memRepo) Update(id int, item string) error { r.items[id] = item; return nil }
func (r *memRepo) Delete(id int) error              { delete(r.items, id); return nil }
func (r *memRepo) Count() int                       { return len(r.items) }
func (r *memRepo) Exists(id int) bool               { _, ok := r.items[id]; return ok }

func main() {
    var repo Repository = &memRepo{items: make(map[int]string)}
    repo.Create("first")
    fmt.Println(repo.Count())
}`,
      solution: `package main

import "fmt"

type Reader interface {
    Find(id int) (string, error)
    FindAll() ([]string, error)
}

type Writer interface {
    Create(item string) error
    Update(id int, item string) error
    Delete(id int) error
}

type Counter interface {
    Count() int
    Exists(id int) bool
}

type Repository interface {
    Reader
    Writer
    Counter
}

type memRepo struct {
    items map[int]string
    next  int
}

func (r *memRepo) Find(id int) (string, error)     { return r.items[id], nil }
func (r *memRepo) FindAll() ([]string, error)       { vals := make([]string, 0); for _, v := range r.items { vals = append(vals, v) }; return vals, nil }
func (r *memRepo) Create(item string) error         { r.next++; r.items[r.next] = item; return nil }
func (r *memRepo) Update(id int, item string) error { r.items[id] = item; return nil }
func (r *memRepo) Delete(id int) error              { delete(r.items, id); return nil }
func (r *memRepo) Count() int                       { return len(r.items) }
func (r *memRepo) Exists(id int) bool               { _, ok := r.items[id]; return ok }

func main() {
    var repo Repository = &memRepo{items: make(map[int]string)}
    repo.Create("first")
    fmt.Println(repo.Count())
}`,
      hints: [
        'Split into Reader (Find, FindAll), Writer (Create, Update, Delete), Counter (Count, Exists).',
        'Compose Repository from Reader, Writer, Counter via embedding.',
        'The implementation does not change at all.',
      ],
      concepts: ['interface embedding', 'refactoring', 'interface segregation'],
    },
    {
      id: 'go-emb-20',
      title: 'Deep Embedding Chain',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Build a chain of embedded types demonstrating multi-level promotion.',
      skeleton: `package main

import "fmt"

type Identity struct {
    ID string
}

func (i Identity) GetID() string { return i.ID }

type Auditable struct {
    Identity
    CreatedBy string
}

func (a Auditable) Audit() string {
    return fmt.Sprintf("[%s] created by %s", a.GetID(), a.CreatedBy)
}

// Versioned embeds Auditable and adds a Version field.
// Implement a Summary() method that returns:
// "v{Version}: {Audit()}"
// TODO: define Versioned struct and Summary method

// Record embeds Versioned and adds Data field.
// Implement a String() method that returns:
// "{Summary()} - {Data}"
// TODO: define Record struct and String method

func main() {
    r := Record{
        Versioned: Versioned{
            Auditable: Auditable{
                Identity:  Identity{ID: "doc-1"},
                CreatedBy: "admin",
            },
            Version: 3,
        },
        Data: "important data",
    }
    fmt.Println(r.GetID())
    fmt.Println(r.Audit())
    fmt.Println(r.Summary())
    fmt.Println(r.String())
}`,
      solution: `package main

import "fmt"

type Identity struct {
    ID string
}

func (i Identity) GetID() string { return i.ID }

type Auditable struct {
    Identity
    CreatedBy string
}

func (a Auditable) Audit() string {
    return fmt.Sprintf("[%s] created by %s", a.GetID(), a.CreatedBy)
}

type Versioned struct {
    Auditable
    Version int
}

func (v Versioned) Summary() string {
    return fmt.Sprintf("v%d: %s", v.Version, v.Audit())
}

type Record struct {
    Versioned
    Data string
}

func (r Record) String() string {
    return fmt.Sprintf("%s - %s", r.Summary(), r.Data)
}

func main() {
    r := Record{
        Versioned: Versioned{
            Auditable: Auditable{
                Identity:  Identity{ID: "doc-1"},
                CreatedBy: "admin",
            },
            Version: 3,
        },
        Data: "important data",
    }
    fmt.Println(r.GetID())
    fmt.Println(r.Audit())
    fmt.Println(r.Summary())
    fmt.Println(r.String())
}`,
      hints: [
        'Versioned embeds Auditable and adds Version int.',
        'Record embeds Versioned and adds Data string.',
        'Methods at every level are promoted up to Record.',
      ],
      concepts: ['embedding', 'deep composition', 'method promotion'],
    },
  ],
};
