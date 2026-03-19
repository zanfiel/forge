import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-rfl',
  title: '36. Reflection',
  explanation: `## Reflection in Go

The \`reflect\` package provides runtime type inspection and manipulation. Use it sparingly -- it bypasses compile-time type safety.

\`\`\`go
import "reflect"

// Getting type and value
t := reflect.TypeOf(42)      // int
v := reflect.ValueOf(42)     // reflect.Value holding 42
fmt.Println(t.Kind())        // int

// Struct field inspection
type User struct {
    Name string \\\`json:"name"\\\`
    Age  int    \\\`json:"age"\\\`
}

t = reflect.TypeOf(User{})
for i := 0; i < t.NumField(); i++ {
    f := t.Field(i)
    fmt.Println(f.Name, f.Type, f.Tag.Get("json"))
}

// Setting values (must use pointer)
x := 42
v = reflect.ValueOf(&x).Elem()
v.SetInt(100) // x is now 100

// DeepEqual for comparison
reflect.DeepEqual(a, b)

// Creating values dynamically
sliceType := reflect.SliceOf(reflect.TypeOf(0))
slice := reflect.MakeSlice(sliceType, 0, 10)
\`\`\`

Key rules:
- reflect.ValueOf takes interface{}, boxing the value
- Use .Elem() to dereference pointers or interface values
- Only exported fields can be set via reflection
- reflect.DeepEqual compares values recursively`,
  exercises: [
    {
      id: 'go-rfl-1',
      title: 'Get Type Name',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use reflect.TypeOf to get a value\'s type.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

func main() {
    x := 42
    t := reflect.__BLANK__(x)
    fmt.Println(t)
    fmt.Println(t.Kind())
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
)

func main() {
    x := 42
    t := reflect.TypeOf(x)
    fmt.Println(t)
    fmt.Println(t.Kind())
}`,
      hints: [
        'reflect.TypeOf returns the reflect.Type of a value.',
        'It takes an interface{} parameter.',
        'Kind() returns the underlying kind (int, string, etc.).',
      ],
      concepts: ['reflect.TypeOf', 'Kind'],
    },
    {
      id: 'go-rfl-2',
      title: 'Get Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use reflect.ValueOf to get a value\'s reflect.Value.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

func main() {
    s := "hello"
    v := reflect.__BLANK__(s)
    fmt.Println(v.String())
    fmt.Println(v.Type())
    fmt.Println(v.Kind())
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
)

func main() {
    s := "hello"
    v := reflect.ValueOf(s)
    fmt.Println(v.String())
    fmt.Println(v.Type())
    fmt.Println(v.Kind())
}`,
      hints: [
        'reflect.ValueOf wraps a value in a reflect.Value.',
        'v.String() returns the string value.',
        'v.Type() and v.Kind() describe the type.',
      ],
      concepts: ['reflect.ValueOf', 'reflect.Value'],
    },
    {
      id: 'go-rfl-3',
      title: 'Check Kind',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use Kind to distinguish between types.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

func describe(i interface{}) string {
    v := reflect.ValueOf(i)
    switch v.__BLANK__() {
    case reflect.Int:
        return fmt.Sprintf("integer: %d", v.Int())
    case reflect.String:
        return fmt.Sprintf("string: %s", v.String())
    case reflect.Bool:
        return fmt.Sprintf("bool: %t", v.Bool())
    default:
        return fmt.Sprintf("other: %v", i)
    }
}

func main() {
    fmt.Println(describe(42))
    fmt.Println(describe("go"))
    fmt.Println(describe(true))
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
)

func describe(i interface{}) string {
    v := reflect.ValueOf(i)
    switch v.Kind() {
    case reflect.Int:
        return fmt.Sprintf("integer: %d", v.Int())
    case reflect.String:
        return fmt.Sprintf("string: %s", v.String())
    case reflect.Bool:
        return fmt.Sprintf("bool: %t", v.Bool())
    default:
        return fmt.Sprintf("other: %v", i)
    }
}

func main() {
    fmt.Println(describe(42))
    fmt.Println(describe("go"))
    fmt.Println(describe(true))
}`,
      hints: [
        'Kind() returns the reflect.Kind of the value.',
        'reflect.Int, reflect.String, etc. are Kind constants.',
        'Use Int(), String(), Bool() to extract typed values.',
      ],
      concepts: ['reflect.Kind', 'type switch on Kind'],
    },
    {
      id: 'go-rfl-4',
      title: 'Iterate Struct Fields',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use reflection to iterate over struct fields.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

type Config struct {
    Host string
    Port int
    Debug bool
}

func main() {
    cfg := Config{"localhost", 8080, true}
    v := reflect.ValueOf(cfg)
    t := v.Type()
    for i := 0; i < v.__BLANK__(); i++ {
        fmt.Printf("%s: %v\\n", t.Field(i).Name, v.Field(i))
    }
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
)

type Config struct {
    Host string
    Port int
    Debug bool
}

func main() {
    cfg := Config{"localhost", 8080, true}
    v := reflect.ValueOf(cfg)
    t := v.Type()
    for i := 0; i < v.NumField(); i++ {
        fmt.Printf("%s: %v\\n", t.Field(i).Name, v.Field(i))
    }
}`,
      hints: [
        'NumField() returns the number of fields in a struct.',
        'v.Field(i) returns the i-th field value.',
        't.Field(i) returns the i-th field metadata.',
      ],
      concepts: ['reflect.NumField', 'struct iteration'],
    },
    {
      id: 'go-rfl-5',
      title: 'Read Struct Tags',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Read struct tags using reflection.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

type User struct {
    Name  string \`json:"name" validate:"required"\`
    Email string \`json:"email" validate:"email"\`
    Age   int    \`json:"age" validate:"min=0"\`
}

func main() {
    t := reflect.TypeOf(User{})
    for i := 0; i < t.NumField(); i++ {
        f := t.Field(i)
        jsonTag := f.Tag.__BLANK__("json")
        valTag := f.Tag.Get("validate")
        fmt.Printf("%s -> json:%s validate:%s\\n", f.Name, jsonTag, valTag)
    }
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
)

type User struct {
    Name  string \`json:"name" validate:"required"\`
    Email string \`json:"email" validate:"email"\`
    Age   int    \`json:"age" validate:"min=0"\`
}

func main() {
    t := reflect.TypeOf(User{})
    for i := 0; i < t.NumField(); i++ {
        f := t.Field(i)
        jsonTag := f.Tag.Get("json")
        valTag := f.Tag.Get("validate")
        fmt.Printf("%s -> json:%s validate:%s\\n", f.Name, jsonTag, valTag)
    }
}`,
      hints: [
        'StructTag.Get(key) retrieves a tag value by key.',
        'Tags are metadata attached to struct fields.',
        'Common tags: json, xml, validate, db.',
      ],
      concepts: ['struct tags', 'reflect.StructTag.Get'],
    },
    {
      id: 'go-rfl-6',
      title: 'Set Value via Reflection',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Modify a variable\'s value using reflection.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

func main() {
    x := 10
    v := reflect.ValueOf(__BLANK__).Elem()
    v.SetInt(42)
    fmt.Println(x)
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
)

func main() {
    x := 10
    v := reflect.ValueOf(&x).Elem()
    v.SetInt(42)
    fmt.Println(x)
}`,
      hints: [
        'To set a value, you must pass a pointer to ValueOf.',
        'Use .Elem() to dereference the pointer.',
        'Only addressable values can be set.',
      ],
      concepts: ['reflect.SetInt', 'Elem', 'addressable'],
    },
    {
      id: 'go-rfl-7',
      title: 'Predict TypeOf Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the output of reflect.TypeOf.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

func main() {
    fmt.Println(reflect.TypeOf(42))
    fmt.Println(reflect.TypeOf("hello"))
    fmt.Println(reflect.TypeOf(3.14))
    fmt.Println(reflect.TypeOf([]int{1, 2}))
    fmt.Println(reflect.TypeOf(map[string]int{}))
}`,
      solution: `int
string
float64
[]int
map[string]int`,
      hints: [
        'TypeOf returns the Go type as a string.',
        '42 is int, "hello" is string, 3.14 is float64.',
        'Slices and maps show their full type syntax.',
      ],
      concepts: ['reflect.TypeOf', 'Go types'],
    },
    {
      id: 'go-rfl-8',
      title: 'Predict Kind Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the Kind of various values.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

type MyInt int
type Pair struct{ A, B int }

func main() {
    fmt.Println(reflect.TypeOf(MyInt(5)).Kind())
    fmt.Println(reflect.TypeOf(Pair{}).Kind())
    fmt.Println(reflect.TypeOf(&Pair{}).Kind())
    fmt.Println(reflect.TypeOf([]int{}).Kind())
}`,
      solution: `int
struct
ptr
slice`,
      hints: [
        'Kind reflects the underlying type category, not the name.',
        'MyInt is based on int, so Kind is int.',
        '&Pair{} is a pointer, so Kind is ptr.',
      ],
      concepts: ['reflect.Kind', 'underlying type'],
    },
    {
      id: 'go-rfl-9',
      title: 'Predict CanSet',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Predict which values can be set via reflection.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

func main() {
    x := 42
    v1 := reflect.ValueOf(x)
    v2 := reflect.ValueOf(&x).Elem()
    fmt.Println(v1.CanSet())
    fmt.Println(v2.CanSet())
}`,
      solution: `false
true`,
      hints: [
        'ValueOf(x) receives a copy, so it cannot be set.',
        'ValueOf(&x).Elem() accesses the original variable.',
        'Only addressable values (via pointer) can be set.',
      ],
      concepts: ['reflect.CanSet', 'addressable'],
    },
    {
      id: 'go-rfl-10',
      title: 'Struct to Map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that converts any struct to a map using reflection.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

// structToMap converts a struct to map[string]interface{}
// using field names as keys. Only includes exported fields.
func structToMap(v interface{}) map[string]interface{} {
    // TODO: implement
}

type Person struct {
    Name string
    Age  int
    city string // unexported
}

func main() {
    p := Person{"Alice", 30, "NYC"}
    m := structToMap(p)
    fmt.Println(m)
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
)

func structToMap(v interface{}) map[string]interface{} {
    result := make(map[string]interface{})
    val := reflect.ValueOf(v)
    typ := val.Type()
    for i := 0; i < val.NumField(); i++ {
        field := typ.Field(i)
        if field.IsExported() {
            result[field.Name] = val.Field(i).Interface()
        }
    }
    return result
}

type Person struct {
    Name string
    Age  int
    city string
}

func main() {
    p := Person{"Alice", 30, "NYC"}
    m := structToMap(p)
    fmt.Println(m)
}`,
      hints: [
        'Use NumField to iterate over struct fields.',
        'field.IsExported() checks if the field is exported.',
        'val.Field(i).Interface() extracts the value as interface{}.',
      ],
      concepts: ['reflect', 'struct to map', 'IsExported'],
    },
    {
      id: 'go-rfl-11',
      title: 'Tag-Based Validator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a simple struct validator using reflect and struct tags.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
    "strings"
)

// validate checks struct fields with "validate" tags.
// Supported tags: "required" (string must be non-empty),
//                 "positive" (int must be > 0)
// Returns a slice of error messages.
func validate(v interface{}) []string {
    // TODO: implement
}

type Order struct {
    Item     string \`validate:"required"\`
    Quantity int    \`validate:"positive"\`
    Note     string
}

func main() {
    o1 := Order{"", 0, ""}
    fmt.Println(validate(o1))
    o2 := Order{"Widget", 5, "rush"}
    fmt.Println(validate(o2))
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
    "strings"
)

func validate(v interface{}) []string {
    var errs []string
    val := reflect.ValueOf(v)
    typ := val.Type()
    for i := 0; i < val.NumField(); i++ {
        field := typ.Field(i)
        tag := field.Tag.Get("validate")
        if tag == "" {
            continue
        }
        fv := val.Field(i)
        for _, rule := range strings.Split(tag, ",") {
            switch rule {
            case "required":
                if fv.Kind() == reflect.String && fv.String() == "" {
                    errs = append(errs, field.Name+" is required")
                }
            case "positive":
                if fv.Kind() == reflect.Int && fv.Int() <= 0 {
                    errs = append(errs, field.Name+" must be positive")
                }
            }
        }
    }
    return errs
}

type Order struct {
    Item     string \`validate:"required"\`
    Quantity int    \`validate:"positive"\`
    Note     string
}

func main() {
    o1 := Order{"", 0, ""}
    fmt.Println(validate(o1))
    o2 := Order{"Widget", 5, "rush"}
    fmt.Println(validate(o2))
}`,
      hints: [
        'Iterate fields and check the "validate" tag.',
        'For "required": check if string is empty.',
        'For "positive": check if int is <= 0.',
      ],
      concepts: ['reflect', 'struct tags', 'validation'],
    },
    {
      id: 'go-rfl-12',
      title: 'DeepEqual Comparison',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use reflect.DeepEqual to compare complex data structures.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

type Matrix [][]int

// equalMatrices compares two matrices for deep equality.
func equalMatrices(a, b Matrix) bool {
    // TODO: implement using reflect.DeepEqual
}

func main() {
    m1 := Matrix{{1, 2}, {3, 4}}
    m2 := Matrix{{1, 2}, {3, 4}}
    m3 := Matrix{{1, 2}, {3, 5}}
    fmt.Println(equalMatrices(m1, m2))
    fmt.Println(equalMatrices(m1, m3))
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
)

type Matrix [][]int

func equalMatrices(a, b Matrix) bool {
    return reflect.DeepEqual(a, b)
}

func main() {
    m1 := Matrix{{1, 2}, {3, 4}}
    m2 := Matrix{{1, 2}, {3, 4}}
    m3 := Matrix{{1, 2}, {3, 5}}
    fmt.Println(equalMatrices(m1, m2))
    fmt.Println(equalMatrices(m1, m3))
}`,
      hints: [
        'reflect.DeepEqual recursively compares two values.',
        'It handles slices, maps, structs, and nested types.',
        'Returns true if all elements are equal.',
      ],
      concepts: ['reflect.DeepEqual', 'deep comparison'],
    },
    {
      id: 'go-rfl-13',
      title: 'Fix Unaddressable Set',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix a panic from trying to set an unaddressable value.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

type Settings struct {
    Volume int
    Muted  bool
}

func setField(obj interface{}, name string, value interface{}) {
    // BUG: panics because obj is not a pointer
    v := reflect.ValueOf(obj)
    f := v.FieldByName(name)
    f.Set(reflect.ValueOf(value))
}

func main() {
    s := Settings{50, false}
    setField(s, "Volume", 75)
    fmt.Println(s)
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
)

type Settings struct {
    Volume int
    Muted  bool
}

func setField(obj interface{}, name string, value interface{}) {
    v := reflect.ValueOf(obj).Elem()
    f := v.FieldByName(name)
    f.Set(reflect.ValueOf(value))
}

func main() {
    s := Settings{50, false}
    setField(&s, "Volume", 75)
    fmt.Println(s)
}`,
      hints: [
        'Pass a pointer (&s) and use .Elem() to dereference.',
        'Non-pointer values are not addressable.',
        'Only addressable struct fields can be set.',
      ],
      concepts: ['reflect', 'addressable', 'Elem'],
    },
    {
      id: 'go-rfl-14',
      title: 'Fix Unexported Field Access',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix a panic from trying to access unexported field values.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

type Secret struct {
    Public  string
    private string
}

func printAllFields(v interface{}) {
    val := reflect.ValueOf(v)
    typ := val.Type()
    for i := 0; i < val.NumField(); i++ {
        // BUG: panics on unexported fields when calling Interface()
        fmt.Printf("%s = %v\\n", typ.Field(i).Name, val.Field(i).Interface())
    }
}

func main() {
    s := Secret{"visible", "hidden"}
    printAllFields(s)
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
)

type Secret struct {
    Public  string
    private string
}

func printAllFields(v interface{}) {
    val := reflect.ValueOf(v)
    typ := val.Type()
    for i := 0; i < val.NumField(); i++ {
        field := typ.Field(i)
        if field.IsExported() {
            fmt.Printf("%s = %v\\n", field.Name, val.Field(i).Interface())
        } else {
            fmt.Printf("%s = <unexported>\\n", field.Name)
        }
    }
}

func main() {
    s := Secret{"visible", "hidden"}
    printAllFields(s)
}`,
      hints: [
        'Calling Interface() on unexported fields panics.',
        'Check field.IsExported() before accessing.',
        'Unexported fields cannot be read via Interface().',
      ],
      concepts: ['reflect', 'unexported fields', 'IsExported'],
    },
    {
      id: 'go-rfl-15',
      title: 'Fix Wrong Elem Usage',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix incorrect use of Elem() on a non-pointer value.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

func typeInfo(v interface{}) {
    val := reflect.ValueOf(v)
    // BUG: calling Elem() on a struct value panics
    elem := val.Elem()
    fmt.Println("Kind:", elem.Kind())
    fmt.Println("Type:", elem.Type())
}

func main() {
    typeInfo(42)
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
)

func typeInfo(v interface{}) {
    val := reflect.ValueOf(v)
    fmt.Println("Kind:", val.Kind())
    fmt.Println("Type:", val.Type())
}

func main() {
    typeInfo(42)
}`,
      hints: [
        'Elem() is only valid on Ptr and Interface kinds.',
        'Calling Elem() on an int panics.',
        'Remove the Elem() call; val already holds the value.',
      ],
      concepts: ['reflect.Elem', 'panic', 'Kind'],
    },
    {
      id: 'go-rfl-16',
      title: 'Dynamic Method Call',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Call a method by name using reflection.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

type Calculator struct{}

func (c Calculator) Add(a, b int) int      { return a + b }
func (c Calculator) Multiply(a, b int) int  { return a * b }

// callMethod calls a method by name on obj with the given int args.
// Returns the int result or 0 if the method doesn't exist.
func callMethod(obj interface{}, name string, args ...int) int {
    // TODO: implement
}

func main() {
    calc := Calculator{}
    fmt.Println(callMethod(calc, "Add", 3, 4))
    fmt.Println(callMethod(calc, "Multiply", 5, 6))
    fmt.Println(callMethod(calc, "Subtract", 10, 3))
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
)

type Calculator struct{}

func (c Calculator) Add(a, b int) int      { return a + b }
func (c Calculator) Multiply(a, b int) int  { return a * b }

func callMethod(obj interface{}, name string, args ...int) int {
    v := reflect.ValueOf(obj)
    m := v.MethodByName(name)
    if !m.IsValid() {
        return 0
    }
    in := make([]reflect.Value, len(args))
    for i, a := range args {
        in[i] = reflect.ValueOf(a)
    }
    results := m.Call(in)
    if len(results) > 0 {
        return int(results[0].Int())
    }
    return 0
}

func main() {
    calc := Calculator{}
    fmt.Println(callMethod(calc, "Add", 3, 4))
    fmt.Println(callMethod(calc, "Multiply", 5, 6))
    fmt.Println(callMethod(calc, "Subtract", 10, 3))
}`,
      hints: [
        'Use MethodByName to find the method.',
        'Check IsValid() before calling.',
        'Convert args to []reflect.Value and use Call().',
      ],
      concepts: ['reflect.MethodByName', 'reflect.Call', 'dynamic dispatch'],
    },
    {
      id: 'go-rfl-17',
      title: 'Map to Struct',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a function that populates a struct from a map using reflection.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

// mapToStruct sets exported struct fields from a map.
// Map keys must match field names exactly.
// ptr must be a pointer to a struct.
func mapToStruct(ptr interface{}, data map[string]interface{}) {
    // TODO: implement
}

type Product struct {
    Name  string
    Price float64
    Stock int
}

func main() {
    var p Product
    mapToStruct(&p, map[string]interface{}{
        "Name":  "Widget",
        "Price": 9.99,
        "Stock": 100,
    })
    fmt.Printf("%+v\\n", p)
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
)

func mapToStruct(ptr interface{}, data map[string]interface{}) {
    v := reflect.ValueOf(ptr).Elem()
    t := v.Type()
    for i := 0; i < t.NumField(); i++ {
        field := t.Field(i)
        if val, ok := data[field.Name]; ok && field.IsExported() {
            fv := v.Field(i)
            rv := reflect.ValueOf(val)
            if rv.Type().AssignableTo(fv.Type()) {
                fv.Set(rv)
            }
        }
    }
}

type Product struct {
    Name  string
    Price float64
    Stock int
}

func main() {
    var p Product
    mapToStruct(&p, map[string]interface{}{
        "Name":  "Widget",
        "Price": 9.99,
        "Stock": 100,
    })
    fmt.Printf("%+v\\n", p)
}`,
      hints: [
        'Dereference the pointer with Elem().',
        'Match map keys to field names.',
        'Check AssignableTo before Set to avoid panics.',
      ],
      concepts: ['reflect', 'map to struct', 'Set'],
    },
    {
      id: 'go-rfl-18',
      title: 'Struct Differ',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a function that finds which fields differ between two structs.',
      skeleton: `package main

import (
    "fmt"
    "reflect"
)

// diff returns field names where two structs of the same type differ.
func diff(a, b interface{}) []string {
    // TODO: implement
}

type User struct {
    Name  string
    Email string
    Age   int
}

func main() {
    u1 := User{"Alice", "alice@go.dev", 30}
    u2 := User{"Alice", "alice@new.dev", 31}
    fmt.Println(diff(u1, u2))
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
)

func diff(a, b interface{}) []string {
    va := reflect.ValueOf(a)
    vb := reflect.ValueOf(b)
    t := va.Type()
    var diffs []string
    for i := 0; i < t.NumField(); i++ {
        if !reflect.DeepEqual(va.Field(i).Interface(), vb.Field(i).Interface()) {
            diffs = append(diffs, t.Field(i).Name)
        }
    }
    return diffs
}

type User struct {
    Name  string
    Email string
    Age   int
}

func main() {
    u1 := User{"Alice", "alice@go.dev", 30}
    u2 := User{"Alice", "alice@new.dev", 31}
    fmt.Println(diff(u1, u2))
}`,
      hints: [
        'Compare each field using DeepEqual.',
        'Collect field names where values differ.',
        'Use Interface() to extract comparable values.',
      ],
      concepts: ['reflect', 'DeepEqual', 'struct comparison'],
    },
    {
      id: 'go-rfl-19',
      title: 'Refactor Type Assertion Chain',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor a long type assertion chain to use reflection.',
      skeleton: `package main

import "fmt"

func toString(v interface{}) string {
    switch val := v.(type) {
    case string:
        return val
    case int:
        return fmt.Sprintf("%d", val)
    case int8:
        return fmt.Sprintf("%d", val)
    case int16:
        return fmt.Sprintf("%d", val)
    case int32:
        return fmt.Sprintf("%d", val)
    case int64:
        return fmt.Sprintf("%d", val)
    case float32:
        return fmt.Sprintf("%g", val)
    case float64:
        return fmt.Sprintf("%g", val)
    case bool:
        return fmt.Sprintf("%t", val)
    default:
        return fmt.Sprintf("%v", val)
    }
}

func main() {
    fmt.Println(toString(42))
    fmt.Println(toString("hi"))
    fmt.Println(toString(3.14))
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
)

func toString(v interface{}) string {
    val := reflect.ValueOf(v)
    switch val.Kind() {
    case reflect.String:
        return val.String()
    case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
        return fmt.Sprintf("%d", val.Int())
    case reflect.Float32, reflect.Float64:
        return fmt.Sprintf("%g", val.Float())
    case reflect.Bool:
        return fmt.Sprintf("%t", val.Bool())
    default:
        return fmt.Sprintf("%v", v)
    }
}

func main() {
    fmt.Println(toString(42))
    fmt.Println(toString("hi"))
    fmt.Println(toString(3.14))
}`,
      hints: [
        'Use reflect.Kind to group similar types.',
        'reflect.Int covers int, Int8 covers int8, etc.',
        'val.Int() works for all integer kinds.',
      ],
      concepts: ['reflect', 'refactoring', 'Kind grouping'],
    },
    {
      id: 'go-rfl-20',
      title: 'Refactor to Tag-Based JSON',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor hardcoded field mapping to use json struct tags via reflection.',
      skeleton: `package main

import "fmt"

type APIResponse struct {
    StatusCode  int    \`json:"status_code"\`
    Message     string \`json:"message"\`
    RequestID   string \`json:"request_id"\`
}

// Hardcoded mapping - breaks when struct changes
func toMap(r APIResponse) map[string]interface{} {
    return map[string]interface{}{
        "status_code": r.StatusCode,
        "message":     r.Message,
        "request_id":  r.RequestID,
    }
}

func main() {
    r := APIResponse{200, "OK", "abc-123"}
    fmt.Println(toMap(r))
}`,
      solution: `package main

import (
    "fmt"
    "reflect"
)

type APIResponse struct {
    StatusCode  int    \`json:"status_code"\`
    Message     string \`json:"message"\`
    RequestID   string \`json:"request_id"\`
}

func toMap(v interface{}) map[string]interface{} {
    result := make(map[string]interface{})
    val := reflect.ValueOf(v)
    typ := val.Type()
    for i := 0; i < typ.NumField(); i++ {
        field := typ.Field(i)
        tag := field.Tag.Get("json")
        if tag == "" || tag == "-" {
            continue
        }
        result[tag] = val.Field(i).Interface()
    }
    return result
}

func main() {
    r := APIResponse{200, "OK", "abc-123"}
    fmt.Println(toMap(r))
}`,
      hints: [
        'Use reflection to read json struct tags.',
        'Map the tag value to the field value.',
        'This automatically adapts when the struct changes.',
      ],
      concepts: ['reflect', 'struct tags', 'json', 'refactoring'],
    },
  ],
};
