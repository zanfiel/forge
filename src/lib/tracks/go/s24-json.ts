import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-json',
  title: '24. JSON',
  explanation: `## JSON in Go

The \`encoding/json\` package provides encoding and decoding of JSON data with struct tags for field mapping.

\`\`\`go
// Struct tags control JSON field names
type User struct {
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
    Age   int    \`json:"age,omitempty"\`
    Pass  string \`json:"-"\` // excluded from JSON
}

// Marshal (Go -> JSON)
data, err := json.Marshal(user)
data, err := json.MarshalIndent(user, "", "  ")

// Unmarshal (JSON -> Go)
var user User
err := json.Unmarshal(data, &user)

// Encoder/Decoder for streams
json.NewEncoder(w).Encode(user)
json.NewDecoder(r).Decode(&user)

// Dynamic JSON with map
var m map[string]interface{}
json.Unmarshal(data, &m)

// json.RawMessage for deferred parsing
type Event struct {
    Type string          \`json:"type"\`
    Data json.RawMessage \`json:"data"\`
}
\`\`\``,
  exercises: [
    {
      id: 'go-json-1',
      title: 'Marshal Struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Convert a Go struct to a JSON byte slice.',
      skeleton: `package main

import (
    "encoding/json"
    "fmt"
)

type Book struct {
    Title  string \`json:"title"\`
    Author string \`json:"author"\`
}

func main() {
    b := Book{Title: "Go in Action", Author: "William Kennedy"}
    data, _ := json.__BLANK__(b)
    fmt.Println(string(data))
}`,
      solution: `package main

import (
    "encoding/json"
    "fmt"
)

type Book struct {
    Title  string \`json:"title"\`
    Author string \`json:"author"\`
}

func main() {
    b := Book{Title: "Go in Action", Author: "William Kennedy"}
    data, _ := json.Marshal(b)
    fmt.Println(string(data))
}`,
      hints: [
        'json.Marshal converts a Go value to JSON bytes.',
        'It uses struct tags to determine field names.',
        'Returns ([]byte, error).',
      ],
      concepts: ['json.Marshal', 'struct tags'],
    },
    {
      id: 'go-json-2',
      title: 'Unmarshal JSON',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Parse a JSON byte slice into a Go struct.',
      skeleton: `package main

import (
    "encoding/json"
    "fmt"
)

type Config struct {
    Host string \`json:"host"\`
    Port int    \`json:"port"\`
}

func main() {
    raw := []byte(\`{"host":"localhost","port":8080}\`)
    var cfg Config
    json.__BLANK__(raw, &cfg)
    fmt.Printf("%s:%d\\n", cfg.Host, cfg.Port)
}`,
      solution: `package main

import (
    "encoding/json"
    "fmt"
)

type Config struct {
    Host string \`json:"host"\`
    Port int    \`json:"port"\`
}

func main() {
    raw := []byte(\`{"host":"localhost","port":8080}\`)
    var cfg Config
    json.Unmarshal(raw, &cfg)
    fmt.Printf("%s:%d\\n", cfg.Host, cfg.Port)
}`,
      hints: [
        'json.Unmarshal parses JSON bytes into a Go value.',
        'Pass a pointer to the target value.',
        'Fields are matched by struct tag names.',
      ],
      concepts: ['json.Unmarshal', 'JSON parsing'],
    },
    {
      id: 'go-json-3',
      title: 'Omitempty Tag',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use the omitempty tag to skip zero-value fields in JSON output.',
      skeleton: `package main

import (
    "encoding/json"
    "fmt"
)

type Response struct {
    Status string \`json:"status"\`
    Error  string \`json:"error,__BLANK__"\`
}

func main() {
    r := Response{Status: "ok"}
    data, _ := json.Marshal(r)
    fmt.Println(string(data))
}`,
      solution: `package main

import (
    "encoding/json"
    "fmt"
)

type Response struct {
    Status string \`json:"status"\`
    Error  string \`json:"error,omitempty"\`
}

func main() {
    r := Response{Status: "ok"}
    data, _ := json.Marshal(r)
    fmt.Println(string(data))
}`,
      hints: [
        'omitempty skips the field if it has its zero value.',
        'For strings, the zero value is "".',
        'The output will not include the "error" field.',
      ],
      concepts: ['omitempty', 'zero value', 'struct tags'],
    },
    {
      id: 'go-json-4',
      title: 'Exclude Field with -',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Exclude a sensitive field from JSON output using the - tag.',
      skeleton: `package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    Name     string \`json:"name"\`
    Password string \`json:"__BLANK__"\`
}

func main() {
    u := User{Name: "alice", Password: "secret"}
    data, _ := json.Marshal(u)
    fmt.Println(string(data))
}`,
      solution: `package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    Name     string \`json:"name"\`
    Password string \`json:"-"\`
}

func main() {
    u := User{Name: "alice", Password: "secret"}
    data, _ := json.Marshal(u)
    fmt.Println(string(data))
}`,
      hints: [
        'json:"-" excludes the field from JSON entirely.',
        'It will not appear in Marshal output.',
        'It will also be ignored during Unmarshal.',
      ],
      concepts: ['json:"-"', 'field exclusion'],
    },
    {
      id: 'go-json-5',
      title: 'MarshalIndent',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Produce pretty-printed JSON with indentation.',
      skeleton: `package main

import (
    "encoding/json"
    "fmt"
)

type Item struct {
    Name  string \`json:"name"\`
    Price float64 \`json:"price"\`
}

func main() {
    item := Item{Name: "Widget", Price: 9.99}
    data, _ := json.__BLANK__(item, "", "  ")
    fmt.Println(string(data))
}`,
      solution: `package main

import (
    "encoding/json"
    "fmt"
)

type Item struct {
    Name  string \`json:"name"\`
    Price float64 \`json:"price"\`
}

func main() {
    item := Item{Name: "Widget", Price: 9.99}
    data, _ := json.MarshalIndent(item, "", "  ")
    fmt.Println(string(data))
}`,
      hints: [
        'json.MarshalIndent adds formatting to the output.',
        'Second argument is the prefix, third is the indent string.',
        '"" prefix and "  " indent is the most common pattern.',
      ],
      concepts: ['json.MarshalIndent', 'pretty printing'],
    },
    {
      id: 'go-json-6',
      title: 'Encoder with Writer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use json.NewEncoder to write JSON to an io.Writer.',
      skeleton: `package main

import (
    "encoding/json"
    "os"
)

type Log struct {
    Level   string \`json:"level"\`
    Message string \`json:"message"\`
}

func main() {
    entry := Log{Level: "info", Message: "started"}
    json.__BLANK__(os.Stdout).Encode(entry)
}`,
      solution: `package main

import (
    "encoding/json"
    "os"
)

type Log struct {
    Level   string \`json:"level"\`
    Message string \`json:"message"\`
}

func main() {
    entry := Log{Level: "info", Message: "started"}
    json.NewEncoder(os.Stdout).Encode(entry)
}`,
      hints: [
        'json.NewEncoder wraps an io.Writer for JSON output.',
        'Encode writes JSON followed by a newline.',
        'More efficient than Marshal for streaming output.',
      ],
      concepts: ['json.NewEncoder', 'json.Encoder.Encode'],
    },
    {
      id: 'go-json-7',
      title: 'Decoder from Reader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that decodes JSON from an io.Reader into a struct.',
      skeleton: `package main

import (
    "encoding/json"
    "io"
)

type Product struct {
    ID    int     \`json:"id"\`
    Name  string  \`json:"name"\`
    Price float64 \`json:"price"\`
}

// DecodeProduct reads JSON from r and returns a Product
func DecodeProduct(r io.Reader) (Product, error) {
}`,
      solution: `package main

import (
    "encoding/json"
    "io"
)

type Product struct {
    ID    int     \`json:"id"\`
    Name  string  \`json:"name"\`
    Price float64 \`json:"price"\`
}

func DecodeProduct(r io.Reader) (Product, error) {
    var p Product
    err := json.NewDecoder(r).Decode(&p)
    return p, err
}`,
      hints: [
        'json.NewDecoder wraps an io.Reader for JSON input.',
        'Decode reads and parses the next JSON value.',
        'Pass a pointer to the target struct.',
      ],
      concepts: ['json.NewDecoder', 'json.Decoder.Decode'],
    },
    {
      id: 'go-json-8',
      title: 'Unmarshal into Map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Parse arbitrary JSON into a map when the structure is unknown.',
      skeleton: `package main

import "encoding/json"

// ParseDynamic parses JSON bytes into a map[string]interface{}
func ParseDynamic(data []byte) (map[string]interface{}, error) {
}`,
      solution: `package main

import "encoding/json"

func ParseDynamic(data []byte) (map[string]interface{}, error) {
    var m map[string]interface{}
    err := json.Unmarshal(data, &m)
    return m, err
}`,
      hints: [
        'map[string]interface{} can hold any JSON object.',
        'JSON numbers become float64, strings become string.',
        'Nested objects become map[string]interface{}.',
      ],
      concepts: ['dynamic JSON', 'map[string]interface{}'],
    },
    {
      id: 'go-json-9',
      title: 'Custom JSON Marshaler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement the json.Marshaler interface for custom JSON output.',
      skeleton: `package main

import (
    "encoding/json"
    "fmt"
    "time"
)

type Event struct {
    Name string
    At   time.Time
}

// Implement MarshalJSON for Event
// Output format: {"name":"...","at":"2006-01-02"}
// Use time.Format with layout "2006-01-02"`,
      solution: `package main

import (
    "encoding/json"
    "fmt"
    "time"
)

type Event struct {
    Name string
    At   time.Time
}

func (e Event) MarshalJSON() ([]byte, error) {
    return json.Marshal(struct {
        Name string \`json:"name"\`
        At   string \`json:"at"\`
    }{
        Name: e.Name,
        At:   e.At.Format("2006-01-02"),
    })
}`,
      hints: [
        'Implement MarshalJSON() ([]byte, error) on the type.',
        'Create an anonymous struct with the desired format.',
        'Marshal the anonymous struct to produce the output.',
      ],
      concepts: ['json.Marshaler', 'custom serialization'],
    },
    {
      id: 'go-json-10',
      title: 'json.RawMessage',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use json.RawMessage to defer parsing of a JSON field.',
      skeleton: `package main

import "encoding/json"

type Message struct {
    Type string          \`json:"type"\`
    Data json.RawMessage \`json:"data"\`
}

type TextData struct {
    Text string \`json:"text"\`
}

type NumData struct {
    Value int \`json:"value"\`
}

// ParseMessage parses JSON, then based on Type:
// "text" -> unmarshal Data into TextData, return TextData.Text
// "num" -> unmarshal Data into NumData, return NumData.Value as string
func ParseMessage(raw []byte) (string, error) {
}`,
      solution: `package main

import (
    "encoding/json"
    "fmt"
)

type Message struct {
    Type string          \`json:"type"\`
    Data json.RawMessage \`json:"data"\`
}

type TextData struct {
    Text string \`json:"text"\`
}

type NumData struct {
    Value int \`json:"value"\`
}

func ParseMessage(raw []byte) (string, error) {
    var msg Message
    if err := json.Unmarshal(raw, &msg); err != nil {
        return "", err
    }
    switch msg.Type {
    case "text":
        var d TextData
        if err := json.Unmarshal(msg.Data, &d); err != nil {
            return "", err
        }
        return d.Text, nil
    case "num":
        var d NumData
        if err := json.Unmarshal(msg.Data, &d); err != nil {
            return "", err
        }
        return fmt.Sprintf("%d", d.Value), nil
    default:
        return "", fmt.Errorf("unknown type: %s", msg.Type)
    }
}`,
      hints: [
        'json.RawMessage holds unparsed JSON bytes.',
        'First unmarshal to get the Type, then unmarshal Data based on Type.',
        'This is the discriminated union pattern in Go JSON.',
      ],
      concepts: ['json.RawMessage', 'deferred parsing', 'discriminated union'],
    },
    {
      id: 'go-json-11',
      title: 'Predict Marshal Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the JSON output from marshaling a struct.',
      skeleton: `package main

import (
    "encoding/json"
    "fmt"
)

type Point struct {
    X int    \`json:"x"\`
    Y int    \`json:"y"\`
    Z int    \`json:"z,omitempty"\`
}

func main() {
    p := Point{X: 1, Y: 2}
    data, _ := json.Marshal(p)
    fmt.Println(string(data))
}`,
      solution: `{"x":1,"y":2}`,
      hints: [
        'Z is 0 (zero value) and has omitempty, so it is excluded.',
        'X and Y use their json tag names.',
        'The output is compact JSON without spaces.',
      ],
      concepts: ['omitempty', 'json output'],
    },
    {
      id: 'go-json-12',
      title: 'Predict Unexported Field',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict what happens when marshaling a struct with unexported fields.',
      skeleton: `package main

import (
    "encoding/json"
    "fmt"
)

type Secret struct {
    Name    string \`json:"name"\`
    secret  string \`json:"secret"\`
}

func main() {
    s := Secret{Name: "test", secret: "hidden"}
    data, _ := json.Marshal(s)
    fmt.Println(string(data))
}`,
      solution: `{"name":"test"}`,
      hints: [
        'Unexported fields (lowercase) are invisible to encoding/json.',
        'Even with a json tag, secret is not exported.',
        'Only exported (capitalized) fields appear in JSON.',
      ],
      concepts: ['unexported fields', 'json visibility'],
    },
    {
      id: 'go-json-13',
      title: 'Predict Unmarshal Missing Fields',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict struct values when JSON has fewer fields than the struct.',
      skeleton: `package main

import (
    "encoding/json"
    "fmt"
)

type Settings struct {
    Theme string \`json:"theme"\`
    Lang  string \`json:"lang"\`
    Size  int    \`json:"size"\`
}

func main() {
    raw := []byte(\`{"theme":"dark"}\`)
    var s Settings
    json.Unmarshal(raw, &s)
    fmt.Printf("%q %q %d\\n", s.Theme, s.Lang, s.Size)
}`,
      solution: `"dark" "" 0`,
      hints: [
        'Missing JSON fields leave struct fields at their zero value.',
        'string zero value is "", int zero value is 0.',
        'Unmarshal does not error on missing fields.',
      ],
      concepts: ['missing fields', 'zero values', 'Unmarshal'],
    },
    {
      id: 'go-json-14',
      title: 'Fix Wrong Pointer in Unmarshal',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the Unmarshal call that passes a value instead of a pointer.',
      skeleton: `package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    Name string \`json:"name"\`
}

func main() {
    raw := []byte(\`{"name":"alice"}\`)
    var u User
    json.Unmarshal(raw, u)
    fmt.Println(u.Name)
}`,
      solution: `package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    Name string \`json:"name"\`
}

func main() {
    raw := []byte(\`{"name":"alice"}\`)
    var u User
    json.Unmarshal(raw, &u)
    fmt.Println(u.Name)
}`,
      hints: [
        'json.Unmarshal requires a pointer to the target.',
        'Passing a value means Unmarshal cannot modify the original.',
        'Add & to pass the address of u.',
      ],
      concepts: ['pointer', 'Unmarshal', 'pass by reference'],
    },
    {
      id: 'go-json-15',
      title: 'Fix Wrong Tag Syntax',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the struct tag that has incorrect syntax.',
      skeleton: `package main

import (
    "encoding/json"
    "fmt"
)

type Config struct {
    Host string \`json: "host"\`
    Port int    \`json: "port"\`
}

func main() {
    c := Config{Host: "localhost", Port: 8080}
    data, _ := json.Marshal(c)
    fmt.Println(string(data))
}`,
      solution: `package main

import (
    "encoding/json"
    "fmt"
)

type Config struct {
    Host string \`json:"host"\`
    Port int    \`json:"port"\`
}

func main() {
    c := Config{Host: "localhost", Port: 8080}
    data, _ := json.Marshal(c)
    fmt.Println(string(data))
}`,
      hints: [
        'Struct tags must not have a space after the colon.',
        'json: "host" is invalid, json:"host" is correct.',
        'The space causes Go to not recognize the tag.',
      ],
      concepts: ['struct tag syntax', 'json tags'],
    },
    {
      id: 'go-json-16',
      title: 'Fix Unmarshal Error Ignored',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix code that ignores the error from Unmarshal, hiding malformed JSON.',
      skeleton: `package main

import (
    "encoding/json"
    "fmt"
)

type Data struct {
    Value int \`json:"value"\`
}

func Parse(raw []byte) Data {
    var d Data
    json.Unmarshal(raw, &d)
    return d
}

func main() {
    d := Parse([]byte(\`{invalid json}\`))
    fmt.Println(d.Value)
}`,
      solution: `package main

import (
    "encoding/json"
    "fmt"
)

type Data struct {
    Value int \`json:"value"\`
}

func Parse(raw []byte) (Data, error) {
    var d Data
    err := json.Unmarshal(raw, &d)
    if err != nil {
        return Data{}, err
    }
    return d, nil
}

func main() {
    d, err := Parse([]byte(\`{invalid json}\`))
    if err != nil {
        fmt.Println("error:", err)
        return
    }
    fmt.Println(d.Value)
}`,
      hints: [
        'Always check errors from json.Unmarshal.',
        'Invalid JSON returns an error that should be handled.',
        'Return the error to the caller instead of ignoring it.',
      ],
      concepts: ['error handling', 'json.Unmarshal', 'malformed JSON'],
    },
    {
      id: 'go-json-17',
      title: 'Write JSON Slice Marshal',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that marshals a slice of structs to JSON.',
      skeleton: `package main

import "encoding/json"

type Task struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
    Done bool   \`json:"done"\`
}

// ToJSON converts a slice of tasks to a JSON string
func ToJSON(tasks []Task) (string, error) {
}`,
      solution: `package main

import "encoding/json"

type Task struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
    Done bool   \`json:"done"\`
}

func ToJSON(tasks []Task) (string, error) {
    data, err := json.Marshal(tasks)
    if err != nil {
        return "", err
    }
    return string(data), nil
}`,
      hints: [
        'json.Marshal works on slices, producing a JSON array.',
        'Each element is marshaled according to its struct tags.',
        'Convert []byte to string for the return value.',
      ],
      concepts: ['slice marshaling', 'JSON array'],
    },
    {
      id: 'go-json-18',
      title: 'Write JSON Number Handling',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a function that preserves number precision using json.Number.',
      skeleton: `package main

import (
    "encoding/json"
    "strings"
)

// ParseID extracts the "id" field from JSON as a string
// without losing precision for large numbers
// Use json.Decoder with UseNumber
func ParseID(raw string) (string, error) {
}`,
      solution: `package main

import (
    "encoding/json"
    "strings"
)

func ParseID(raw string) (string, error) {
    dec := json.NewDecoder(strings.NewReader(raw))
    dec.UseNumber()
    var m map[string]interface{}
    if err := dec.Decode(&m); err != nil {
        return "", err
    }
    num, ok := m["id"].(json.Number)
    if !ok {
        return "", fmt.Errorf("id is not a number")
    }
    return num.String(), nil
}`,
      hints: [
        'json.Decoder.UseNumber preserves numbers as json.Number.',
        'json.Number is a string type that can convert to int64 or float64.',
        'Without UseNumber, large ints lose precision as float64.',
      ],
      concepts: ['json.Number', 'UseNumber', 'number precision'],
    },
    {
      id: 'go-json-19',
      title: 'Refactor to Struct Tags',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor manual JSON building to use json.Marshal with proper struct tags.',
      skeleton: `package main

import "fmt"

type User struct {
    FirstName string
    LastName  string
    Email     string
}

func ToJSON(u User) string {
    return fmt.Sprintf(\`{"first_name":"%s","last_name":"%s","email":"%s"}\`,
        u.FirstName, u.LastName, u.Email)
}`,
      solution: `package main

import "encoding/json"

type User struct {
    FirstName string \`json:"first_name"\`
    LastName  string \`json:"last_name"\`
    Email     string \`json:"email"\`
}

func ToJSON(u User) (string, error) {
    data, err := json.Marshal(u)
    return string(data), err
}`,
      hints: [
        'Use struct tags to map field names to JSON keys.',
        'json.Marshal handles escaping and formatting.',
        'Manual string building is error-prone with special characters.',
      ],
      concepts: ['struct tags', 'json.Marshal', 'proper serialization'],
    },
    {
      id: 'go-json-20',
      title: 'Refactor Nested Unmarshal',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor two-pass JSON parsing into a single struct with nested types.',
      skeleton: `package main

import "encoding/json"

func ParseOrder(raw []byte) (int, string, float64, error) {
    var outer map[string]interface{}
    if err := json.Unmarshal(raw, &outer); err != nil {
        return 0, "", 0, err
    }
    id := int(outer["id"].(float64))
    customer := outer["customer"].(map[string]interface{})
    name := customer["name"].(string)
    total := outer["total"].(float64)
    return id, name, total, nil
}`,
      solution: `package main

import "encoding/json"

type Customer struct {
    Name string \`json:"name"\`
}

type Order struct {
    ID       int      \`json:"id"\`
    Customer Customer \`json:"customer"\`
    Total    float64  \`json:"total"\`
}

func ParseOrder(raw []byte) (int, string, float64, error) {
    var o Order
    if err := json.Unmarshal(raw, &o); err != nil {
        return 0, "", 0, err
    }
    return o.ID, o.Customer.Name, o.Total, nil
}`,
      hints: [
        'Define proper struct types matching the JSON structure.',
        'Nested JSON objects map to nested Go structs.',
        'Type-safe access is much better than map[string]interface{}.',
      ],
      concepts: ['nested structs', 'type-safe JSON', 'refactoring'],
    },
  ],
};
