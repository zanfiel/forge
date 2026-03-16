import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-pkg',
  title: '13. Packages & Modules',
  explanation: `## Packages & Modules in Go

Go organizes code into packages. Every Go file begins with a \`package\` declaration. The \`main\` package is special -- it defines an executable program.

\`\`\`go
// Package declaration
package mylib

// Importing packages
import (
    "fmt"
    "strings"
    "myproject/internal/utils"
)

// Exported names start with uppercase
func PublicFunc() {}  // exported
func privateFunc() {} // unexported

// init() runs automatically before main
func init() {
    fmt.Println("package initialized")
}

// go.mod defines a module
// module example.com/myproject
// go 1.21

// Blank import for side effects
import _ "image/png"

// Import alias
import str "strings"

// Internal packages restrict visibility
// myproject/internal/secret -- only myproject can import
\`\`\``,
  exercises: [
    {
      id: 'go-pkg-1',
      title: 'Package Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Declare the main package for an executable program.',
      skeleton: `__BLANK__ main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}`,
      solution: `package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}`,
      hints: [
        'Every Go file starts with a package declaration.',
        'The main package is used for executable programs.',
        'Use the keyword "package" followed by the package name.',
      ],
      concepts: ['package declaration', 'main package'],
    },
    {
      id: 'go-pkg-2',
      title: 'Multiple Imports',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use a grouped import statement to import multiple packages.',
      skeleton: `package main

__BLANK__ (
    "fmt"
    "strings"
)

func main() {
    fmt.Println(strings.ToUpper("hello"))
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

func main() {
    fmt.Println(strings.ToUpper("hello"))
}`,
      hints: [
        'Group imports with parentheses.',
        'The keyword is "import" followed by a parenthesized block.',
        'Each import path is on its own line.',
      ],
      concepts: ['import statement', 'grouped imports'],
    },
    {
      id: 'go-pkg-3',
      title: 'Exported Names',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Call an exported function from the strings package.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

func main() {
    result := strings.__BLANK__("hello world", " ")
    fmt.Println(result)
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

func main() {
    result := strings.Split("hello world", " ")
    fmt.Println(result)
}`,
      hints: [
        'Exported names in Go start with an uppercase letter.',
        'The strings package has a Split function.',
        'strings.Split(s, sep) splits a string by a separator.',
      ],
      concepts: ['exported names', 'strings package'],
    },
    {
      id: 'go-pkg-4',
      title: 'Blank Import',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use a blank import to import a package only for its side effects.',
      skeleton: `package main

import (
    "database/sql"
    "fmt"

    __BLANK__ "github.com/lib/pq"
)

func main() {
    db, err := sql.Open("postgres", "user=test dbname=test sslmode=disable")
    if err != nil {
        fmt.Println(err)
        return
    }
    defer db.Close()
    fmt.Println("connected")
}`,
      solution: `package main

import (
    "database/sql"
    "fmt"

    _ "github.com/lib/pq"
)

func main() {
    db, err := sql.Open("postgres", "user=test dbname=test sslmode=disable")
    if err != nil {
        fmt.Println(err)
        return
    }
    defer db.Close()
    fmt.Println("connected")
}`,
      hints: [
        'A blank import uses _ as the package name.',
        'This imports the package only for its init() side effects.',
        'Database drivers register themselves in init().',
      ],
      concepts: ['blank import', 'side effects', 'init function'],
    },
    {
      id: 'go-pkg-5',
      title: 'Import Alias',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use an import alias to resolve a naming conflict.',
      skeleton: `package main

import (
    "fmt"
    crand "crypto/rand"
    __BLANK__ "math/rand"
)

func main() {
    fmt.Println(mrand.Intn(100))
    buf := make([]byte, 4)
    crand.Read(buf)
    fmt.Printf("%x\\n", buf)
}`,
      solution: `package main

import (
    "fmt"
    crand "crypto/rand"
    mrand "math/rand"
)

func main() {
    fmt.Println(mrand.Intn(100))
    buf := make([]byte, 4)
    crand.Read(buf)
    fmt.Printf("%x\\n", buf)
}`,
      hints: [
        'An alias is placed before the import path.',
        'Use a short name to distinguish between packages.',
        'mrand for math/rand, crand for crypto/rand.',
      ],
      concepts: ['import alias', 'name collision', 'package alias'],
    },
    {
      id: 'go-pkg-6',
      title: 'init Function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use the init function to set up package-level state.',
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
    fmt.Println(config["port"])
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
    fmt.Println(config["port"])
}`,
      hints: [
        'The init function runs automatically before main.',
        'It takes no arguments and returns nothing.',
        'A file can have multiple init functions.',
      ],
      concepts: ['init function', 'package initialization'],
    },
    {
      id: 'go-pkg-7',
      title: 'Package Visibility',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a package with both exported and unexported functions.',
      skeleton: `package mathutil

// Write an exported function Add that adds two ints
// Write an unexported helper function abs that returns absolute value of an int`,
      solution: `package mathutil

func Add(a, b int) int {
    return a + b
}

func abs(n int) int {
    if n < 0 {
        return -n
    }
    return n
}`,
      hints: [
        'Exported functions start with an uppercase letter.',
        'Unexported functions start with a lowercase letter.',
        'Only exported identifiers are visible outside the package.',
      ],
      concepts: ['exported names', 'unexported names', 'visibility'],
    },
    {
      id: 'go-pkg-8',
      title: 'Package-Level Variables',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create a package with exported constants and a constructor function.',
      skeleton: `package config

// Define exported constants for default host and port
// Write a NewConfig function that returns a Config struct

type Config struct {
    Host string
    Port int
}`,
      solution: `package config

const (
    DefaultHost = "localhost"
    DefaultPort = 8080
)

type Config struct {
    Host string
    Port int
}

func NewConfig() Config {
    return Config{
        Host: DefaultHost,
        Port: DefaultPort,
    }
}`,
      hints: [
        'Exported constants start with uppercase.',
        'NewX is a common constructor naming convention in Go.',
        'Return a struct with default values from the constants.',
      ],
      concepts: ['exported constants', 'constructor pattern', 'package API'],
    },
    {
      id: 'go-pkg-9',
      title: 'Multiple init Functions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Demonstrate that a file can have multiple init functions.',
      skeleton: `package main

import "fmt"

var steps []string

// Write two init functions that append "step1" and "step2" to steps

func main() {
    fmt.Println(steps)
}`,
      solution: `package main

import "fmt"

var steps []string

func init() {
    steps = append(steps, "step1")
}

func init() {
    steps = append(steps, "step2")
}

func main() {
    fmt.Println(steps)
}`,
      hints: [
        'Go allows multiple init functions in the same file.',
        'They run in the order they appear in the source.',
        'Each init function is called once during package initialization.',
      ],
      concepts: ['multiple init', 'initialization order'],
    },
    {
      id: 'go-pkg-10',
      title: 'Package Documentation',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write proper package documentation comments.',
      skeleton: `// Write a package comment for a calculator package
// Write a documented exported function Multiply

package calculator`,
      solution: `// Package calculator provides basic arithmetic operations.
package calculator

// Multiply returns the product of two integers.
func Multiply(a, b int) int {
    return a * b
}`,
      hints: [
        'Package comments go directly before the package keyword.',
        'Start with "Package <name>" by convention.',
        'Function comments start with the function name.',
      ],
      concepts: ['package comments', 'godoc', 'documentation'],
    },
    {
      id: 'go-pkg-11',
      title: 'go.mod Basics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a go.mod file for a project.',
      skeleton: `// Write a go.mod file for module "github.com/user/myapp"
// using Go 1.21 with a dependency on github.com/gorilla/mux v1.8.0`,
      solution: `module github.com/user/myapp

go 1.21

require github.com/gorilla/mux v1.8.0`,
      hints: [
        'go.mod starts with the module directive.',
        'The go directive specifies the minimum Go version.',
        'require lists dependencies with version.',
      ],
      concepts: ['go.mod', 'module path', 'dependency management'],
    },
    {
      id: 'go-pkg-12',
      title: 'Encapsulated Package',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Create a package with proper encapsulation using unexported fields and exported methods.',
      skeleton: `package counter

// Create an unexported counter struct with a count field
// Write exported New, Increment, Decrement, and Value methods`,
      solution: `package counter

type counter struct {
    count int
}

func New() *counter {
    return &counter{count: 0}
}

func (c *counter) Increment() {
    c.count++
}

func (c *counter) Decrement() {
    if c.count > 0 {
        c.count--
    }
}

func (c *counter) Value() int {
    return c.count
}`,
      hints: [
        'Unexported struct type hides implementation details.',
        'Exported constructor returns a pointer to the unexported type.',
        'Methods provide controlled access to internal state.',
      ],
      concepts: ['encapsulation', 'unexported types', 'constructor pattern'],
    },
    {
      id: 'go-pkg-13',
      title: 'Predict Init Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the order of initialization and output.',
      skeleton: `package main

import "fmt"

var x = compute()

func compute() int {
    fmt.Println("computing x")
    return 42
}

func init() {
    fmt.Println("init called, x =", x)
}

func main() {
    fmt.Println("main called")
}`,
      solution: `computing x
init called, x = 42
main called`,
      hints: [
        'Package-level variables are initialized first.',
        'Then init functions run.',
        'Finally main runs.',
      ],
      concepts: ['initialization order', 'init function', 'package-level variables'],
    },
    {
      id: 'go-pkg-14',
      title: 'Predict Exported Access',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict what happens when accessing unexported names.',
      skeleton: `package main

import "fmt"

type point struct {
    x, y int
}

func newPoint(x, y int) point {
    return point{x: x, y: y}
}

func main() {
    p := newPoint(3, 4)
    fmt.Println(p.x, p.y)
}`,
      solution: `3 4`,
      hints: [
        'Within the same package, unexported names are accessible.',
        'point, x, y, and newPoint are all in package main.',
        'Unexported is only restricted across package boundaries.',
      ],
      concepts: ['unexported access', 'same package visibility'],
    },
    {
      id: 'go-pkg-15',
      title: 'Predict Multiple Init',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the output of multiple init functions.',
      skeleton: `package main

import "fmt"

func init() {
    fmt.Print("A")
}

func init() {
    fmt.Print("B")
}

func init() {
    fmt.Print("C")
}

func main() {
    fmt.Println("D")
}`,
      solution: `ABCD`,
      hints: [
        'Multiple init functions run in source order.',
        'All init functions complete before main starts.',
        'fmt.Print does not add a newline; fmt.Println does.',
      ],
      concepts: ['init order', 'multiple init functions'],
    },
    {
      id: 'go-pkg-16',
      title: 'Fix Unused Import',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the compilation error caused by an unused import.',
      skeleton: `package main

import (
    "fmt"
    "strings"
    "strconv"
)

func main() {
    fmt.Println(strings.ToUpper("hello"))
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

func main() {
    fmt.Println(strings.ToUpper("hello"))
}`,
      hints: [
        'Go does not allow unused imports.',
        'Remove the strconv import since it is not used.',
        'Alternatively, use a blank import _ if you need side effects.',
      ],
      concepts: ['unused imports', 'compilation error'],
    },
    {
      id: 'go-pkg-17',
      title: 'Fix Unexported Access',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the code that tries to access an unexported function incorrectly.',
      skeleton: `package main

import (
    "fmt"
    "strings"
)

func main() {
    // strings.contains won't compile -- it's unexported
    result := strings.contains("Hello World", "World")
    fmt.Println(result)
}`,
      solution: `package main

import (
    "fmt"
    "strings"
)

func main() {
    result := strings.Contains("Hello World", "World")
    fmt.Println(result)
}`,
      hints: [
        'Exported functions in Go start with uppercase.',
        'strings.contains should be strings.Contains.',
        'Check the Go standard library docs for exact names.',
      ],
      concepts: ['exported names', 'case sensitivity'],
    },
    {
      id: 'go-pkg-18',
      title: 'Fix Circular Init',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix the init function that panics due to nil map access.',
      skeleton: `package main

import "fmt"

var registry map[string]int

func init() {
    registry["a"] = 1
    registry["b"] = 2
}

func main() {
    fmt.Println(registry)
}`,
      solution: `package main

import "fmt"

var registry map[string]int

func init() {
    registry = make(map[string]int)
    registry["a"] = 1
    registry["b"] = 2
}

func main() {
    fmt.Println(registry)
}`,
      hints: [
        'A declared map variable is nil by default.',
        'You must initialize it with make before use.',
        'Writing to a nil map causes a runtime panic.',
      ],
      concepts: ['nil map', 'init function', 'map initialization'],
    },
    {
      id: 'go-pkg-19',
      title: 'Refactor to Package',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor inline code into a reusable package with proper API.',
      skeleton: `package main

import "fmt"

func main() {
    celsius := 100.0
    fahrenheit := celsius*9/5 + 32

    fahrenheit2 := 212.0
    celsius2 := (fahrenheit2 - 32) * 5 / 9

    fmt.Printf("%.1fC = %.1fF\\n", celsius, fahrenheit)
    fmt.Printf("%.1fF = %.1fC\\n", fahrenheit2, celsius2)
}`,
      solution: `package main

import "fmt"

func CelsiusToFahrenheit(c float64) float64 {
    return c*9/5 + 32
}

func FahrenheitToCelsius(f float64) float64 {
    return (f - 32) * 5 / 9
}

func main() {
    celsius := 100.0
    fahrenheit := CelsiusToFahrenheit(celsius)

    fahrenheit2 := 212.0
    celsius2 := FahrenheitToCelsius(fahrenheit2)

    fmt.Printf("%.1fC = %.1fF\\n", celsius, fahrenheit)
    fmt.Printf("%.1fF = %.1fC\\n", fahrenheit2, celsius2)
}`,
      hints: [
        'Extract the conversion formulas into named functions.',
        'Use exported names so they could be used from another package.',
        'Functions should be self-documenting with clear names.',
      ],
      concepts: ['code organization', 'exported functions', 'reusability'],
    },
    {
      id: 'go-pkg-20',
      title: 'Refactor Global State',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor global package state into a proper struct-based API.',
      skeleton: `package main

import "fmt"

var items []string
var count int

func addItem(item string) {
    items = append(items, item)
    count++
}

func getCount() int {
    return count
}

func getItems() []string {
    return items
}

func main() {
    addItem("apple")
    addItem("banana")
    fmt.Println(getCount())
    fmt.Println(getItems())
}`,
      solution: `package main

import "fmt"

type Store struct {
    items []string
}

func NewStore() *Store {
    return &Store{}
}

func (s *Store) Add(item string) {
    s.items = append(s.items, item)
}

func (s *Store) Count() int {
    return len(s.items)
}

func (s *Store) Items() []string {
    result := make([]string, len(s.items))
    copy(result, s.items)
    return result
}

func main() {
    store := NewStore()
    store.Add("apple")
    store.Add("banana")
    fmt.Println(store.Count())
    fmt.Println(store.Items())
}`,
      hints: [
        'Replace global variables with a struct.',
        'Use a constructor function to create instances.',
        'Return a copy of the items slice to prevent external mutation.',
      ],
      concepts: ['encapsulation', 'struct methods', 'avoiding globals'],
    },
  ],
};
