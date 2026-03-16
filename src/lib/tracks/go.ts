import type { Track } from '../../stores/app.svelte.ts';

export const track: Track = {
  id: 'go',
  name: 'Go',
  language: 'go',
  monacoLang: 'go',
  icon: '🔵',
  description: 'Simple, fast, concurrent. Built for servers, CLIs, and cloud infrastructure.',
  sections: [
    {
      id: 'go-variables',
      title: '1. Variables & Types',
      explanation: `## Variables & Types

Go is statically typed but can infer types with \`:=\` (short declaration):

\`\`\`go
var name string = "Zan"    // explicit type
age := 25                   // inferred as int
const maxRetries = 3        // constant

var active bool = true
var ratio float64 = 0.85
\`\`\`

**Basic types:** \`string\`, \`int\`, \`float64\`, \`bool\`, \`byte\`

**Zero values:** Unlike most languages, Go initializes everything. \`int\` defaults to \`0\`, \`string\` to \`""\`, \`bool\` to \`false\`.

\`\`\`go
var count int      // 0, not undefined/null
var label string   // "", not null
\`\`\`

**Multiple declarations:**
\`\`\`go
host, port := "localhost", 8080
\`\`\``,
      exercises: [
        {
          id: 'go-var-1',
          title: 'Short Declarations',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'go',
          goal: 'Declare variables using both explicit and short declaration syntax.',
          skeleton: `package main

import "fmt"

func main() {
    // Explicit variable declaration
    __BLANK__ serverName string = "rocky"

    // Short declaration (type inferred)
    port __BLANK__ 8080

    // Declare a boolean
    online __BLANK__ true

    // Multiple assignment on one line
    cpu, ram __BLANK__ 8, 32

    fmt.Printf("Server: %s:%d (online=%t)\\n", serverName, port, online)
    fmt.Printf("Specs: %d cores, %dGB RAM\\n", cpu, ram)
}`,
          solution: `package main

import "fmt"

func main() {
    var serverName string = "rocky"
    port := 8080
    online := true
    cpu, ram := 8, 32

    fmt.Printf("Server: %s:%d (online=%t)\\n", serverName, port, online)
    fmt.Printf("Specs: %d cores, %dGB RAM\\n", cpu, ram)
}`,
          hints: [
            'Explicit declarations start with `var`. Short declarations use `:=`.',
            '`:=` declares AND assigns in one step. Go figures out the type from the value.',
            'Fill in: `var`, `:=`, `:=`, `:=`.',
          ],
          concepts: ['var', ':=', 'string', 'int', 'bool', 'multiple assignment'],
        },
        {
          id: 'go-var-2',
          title: 'Slices and Maps',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'go',
          goal: 'Create slices (dynamic arrays) and maps (key-value stores) to manage server data.',
          skeleton: `package main

import "fmt"

func main() {
    // A slice of server names
    servers := __BLANK__{string}{"rocky", "pangolin", "bav-apps"}

    // A map of server name to IP address
    ips := __BLANK__[string]__BLANK__{
        "rocky":    "192.168.8.133",
        "pangolin": "46.225.188.154",
    }

    // Add a new server
    servers = __BLANK__(servers, "forge-box")
    ips["forge-box"] = "94.156.152.50"

    // Iterate over the slice
    for __BLANK__, name := range servers {
        fmt.Printf("%d: %s\\n", i, name)
    }

    fmt.Println("IPs:", ips)
}`,
          solution: `package main

import "fmt"

func main() {
    servers := []string{"rocky", "pangolin", "bav-apps"}

    ips := map[string]string{
        "rocky":    "192.168.8.133",
        "pangolin": "46.225.188.154",
    }

    servers = append(servers, "forge-box")
    ips["forge-box"] = "94.156.152.50"

    for i, name := range servers {
        fmt.Printf("%d: %s\\n", i, name)
    }

    fmt.Println("IPs:", ips)
}`,
          hints: [
            'Slices use `[]type{...}` syntax. Maps use `map[keyType]valueType{...}`.',
            '`append()` adds to a slice. Maps are assigned with `m[key] = value`.',
            'Fill in: `[]`, `map`, `string`, `append`, `i`.',
          ],
          concepts: ['slices', 'maps', 'append', 'range', 'for loop'],
        },
        {
          id: 'go-var-3',
          title: 'Build a Config Struct',
          type: 'write-function',
          difficulty: 'beginner',
          language: 'go',
          goal: 'From scratch: declare a slice of strings called `tags` with at least 3 values, then use a `for range` loop to print each tag with its index. Also create a map called `config` mapping string keys to string values with at least 2 entries, and print the value for the key "host".',
          skeleton: `package main

import "fmt"

func main() {
    // Write your code here

}`,
          solution: `package main

import "fmt"

func main() {
    tags := []string{"production", "linux", "docker"}
    for i, tag := range tags {
        fmt.Printf("%d: %s\\n", i, tag)
    }

    config := map[string]string{
        "host": "0.0.0.0",
        "port": "8080",
    }
    fmt.Println("Host:", config["host"])
}`,
          hints: [
            'Slice: `tags := []string{"val1", "val2", "val3"}`.',
            'Loop: `for i, tag := range tags { ... }`. Access map values: `config["key"]`.',
            'You need a slice declaration, a range loop, a map declaration, and a print.',
          ],
          concepts: ['slices', 'maps', 'range', 'fmt.Printf', 'fmt.Println'],
        },
      ],
    },
    {
      id: 'go-functions',
      title: '2. Functions & Control Flow',
      explanation: `## Functions & Control Flow

Go functions can return **multiple values**. This is used everywhere, especially for error handling:

\`\`\`go
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("cannot divide by zero")
    }
    return a / b, nil
}

result, err := divide(10, 3)
if err != nil {
    log.Fatal(err)
}
\`\`\`

**Switch** in Go is cleaner than most languages (no \`break\` needed):
\`\`\`go
switch status {
case "running":
    fmt.Println("All good")
case "stopped", "crashed":
    fmt.Println("Needs attention")
default:
    fmt.Println("Unknown")
}
\`\`\`

**Defer** runs a function when the surrounding function returns. Great for cleanup:
\`\`\`go
func readFile(path string) {
    f, _ := os.Open(path)
    defer f.Close()    // runs when readFile returns
    // ... use f ...
}
\`\`\``,
      exercises: [
        {
          id: 'go-fn-1',
          title: 'Multiple Return Values',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'go',
          goal: 'Complete a function that parses a host:port string and returns both parts.',
          skeleton: `package main

import (
    "fmt"
    "strconv"
    "strings"
)

// parseAddr splits "host:port" into host string and port int
func parseAddr(addr string) (__BLANK__, __BLANK__, __BLANK__) {
    parts := strings.SplitN(addr, ":", 2)
    if len(parts) != 2 {
        return "", 0, fmt.Errorf("invalid address: %s", addr)
    }

    port, err := strconv.Atoi(parts[1])
    if err != nil {
        __BLANK__ "", 0, fmt.Errorf("invalid port: %s", parts[1])
    }

    return parts[0], port, __BLANK__
}

func main() {
    host, port, err := parseAddr("localhost:8080")
    if __BLANK__ != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Printf("Host: %s, Port: %d\\n", host, port)
}`,
          solution: `package main

import (
    "fmt"
    "strconv"
    "strings"
)

func parseAddr(addr string) (string, int, error) {
    parts := strings.SplitN(addr, ":", 2)
    if len(parts) != 2 {
        return "", 0, fmt.Errorf("invalid address: %s", addr)
    }

    port, err := strconv.Atoi(parts[1])
    if err != nil {
        return "", 0, fmt.Errorf("invalid port: %s", parts[1])
    }

    return parts[0], port, nil
}

func main() {
    host, port, err := parseAddr("localhost:8080")
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Printf("Host: %s, Port: %d\\n", host, port)
}`,
          hints: [
            'Go functions list return types in parentheses: `(string, int, error)`.',
            'A successful return uses `nil` for the error. A failure returns zero values and an error.',
            'Fill in: `string`, `int`, `error`, `return`, `nil`, `err`.',
          ],
          concepts: ['multiple returns', 'error', 'nil', 'strings.SplitN', 'strconv.Atoi'],
        },
        {
          id: 'go-fn-2',
          title: 'Switch and Defer',
          type: 'fix-bug',
          difficulty: 'beginner',
          language: 'go',
          goal: 'This code has 3 bugs. The switch is missing its variable, the defer is in the wrong place, and one function call has the wrong arguments. Find and fix them.',
          skeleton: `package main

import "fmt"

func statusMessage(code int) string {
    switch {
    case 200:
        return "OK"
    case 404:
        return "Not Found"
    case 500:
        return "Internal Server Error"
    default:
        return fmt.Sprintf("Unknown status: %d", code)
    }
}

func processRequest(url string) {
    fmt.Println("Starting request to", url)

    fmt.Println("Request complete")
    defer func() {
    }()

    status := 200
    fmt.Println("Status:", statusMessage())
}

func main() {
    processRequest("/api/health")
}`,
          solution: `package main

import "fmt"

func statusMessage(code int) string {
    switch code {
    case 200:
        return "OK"
    case 404:
        return "Not Found"
    case 500:
        return "Internal Server Error"
    default:
        return fmt.Sprintf("Unknown status: %d", code)
    }
}

func processRequest(url string) {
    fmt.Println("Starting request to", url)

    defer func() {
        fmt.Println("Request complete")
    }()

    status := 200
    fmt.Println("Status:", statusMessage(status))
}

func main() {
    processRequest("/api/health")
}`,
          hints: [
            'The `switch` needs to know what variable to match against the cases.',
            '`defer` should wrap the cleanup print so it runs last. Move the print inside the defer func.',
            '`statusMessage` takes a `code int` parameter. You need to pass `status` to it.',
          ],
          concepts: ['switch', 'defer', 'function arguments', 'debugging'],
        },
        {
          id: 'go-fn-3',
          title: 'Write a CLI Helper',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'go',
          goal: 'Write a function `parseFlags` that takes a slice of strings (command line args like `["--port", "8080", "--host", "localhost", "--verbose"]`) and returns a `map[string]string`. Flags with values get the next arg as their value. Flags without a following value (or followed by another flag) get the value "true".',
          skeleton: `package main

import "fmt"

// Write parseFlags here


func main() {
    args := []string{"--port", "8080", "--host", "localhost", "--verbose"}
    flags := parseFlags(args)

    fmt.Println(flags["--port"])    // "8080"
    fmt.Println(flags["--host"])    // "localhost"
    fmt.Println(flags["--verbose"]) // "true"
}`,
          solution: `package main

import (
    "fmt"
    "strings"
)

func parseFlags(args []string) map[string]string {
    flags := make(map[string]string)
    for i := 0; i < len(args); i++ {
        arg := args[i]
        if !strings.HasPrefix(arg, "--") {
            continue
        }
        if i+1 < len(args) && !strings.HasPrefix(args[i+1], "--") {
            flags[arg] = args[i+1]
            i++
        } else {
            flags[arg] = "true"
        }
    }
    return flags
}

func main() {
    args := []string{"--port", "8080", "--host", "localhost", "--verbose"}
    flags := parseFlags(args)

    fmt.Println(flags["--port"])
    fmt.Println(flags["--host"])
    fmt.Println(flags["--verbose"])
}`,
          hints: [
            'Use `make(map[string]string)` to create the map. Loop through args with a for loop.',
            'Check if the current arg starts with "--". If the next arg exists and is not a flag, use it as the value.',
            'Use `strings.HasPrefix(arg, "--")` to detect flags. Increment `i` an extra step when consuming a value.',
          ],
          concepts: ['map', 'make', 'for loop', 'strings.HasPrefix', 'CLI parsing'],
        },
      ],
    },
    {
      id: 'go-structs',
      title: '3. Structs & Interfaces',
      explanation: `## Structs & Interfaces

Go uses **structs** instead of classes. No inheritance, just composition:

\`\`\`go
type Server struct {
    Name   string
    IP     string
    Port   int
    Online bool
}

// Method on Server (receiver syntax)
func (s Server) Addr() string {
    return fmt.Sprintf("%s:%d", s.IP, s.Port)
}

srv := Server{Name: "rocky", IP: "192.168.8.133", Port: 22, Online: true}
fmt.Println(srv.Addr())  // "192.168.8.133:22"
\`\`\`

**Interfaces** are satisfied *implicitly*. No "implements" keyword:
\`\`\`go
type Stringer interface {
    String() string
}

// Any type with a String() method satisfies Stringer
func (s Server) String() string {
    return fmt.Sprintf("[%s] %s", s.Name, s.Addr())
}
\`\`\`

Use **pointer receivers** (\`*Server\`) when you need to modify the struct:
\`\`\`go
func (s *Server) Shutdown() {
    s.Online = false   // modifies the original
}
\`\`\``,
      exercises: [
        {
          id: 'go-struct-1',
          title: 'Define a Struct with Methods',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'go',
          goal: 'Complete the Task struct and its methods for a simple task runner.',
          skeleton: `package main

import "fmt"

type Task struct {
    Name     __BLANK__
    Priority __BLANK__
    Done     __BLANK__
}

// Method: mark the task as done (needs to modify the struct)
func (t __BLANK__) Complete() {
    t.Done = true
}

// Method: return a display string (no modification needed)
func (t __BLANK__) String() string {
    status := "[ ]"
    if t.Done {
        status = "[x]"
    }
    return fmt.Sprintf("%s %s (priority: %d)", status, t.Name, t.Priority)
}

func main() {
    task := Task{Name: "Deploy API", Priority: 1, Done: false}
    fmt.Println(task.String())  // [ ] Deploy API (priority: 1)

    task.Complete()
    fmt.Println(task.String())  // [x] Deploy API (priority: 1)
}`,
          solution: `package main

import "fmt"

type Task struct {
    Name     string
    Priority int
    Done     bool
}

func (t *Task) Complete() {
    t.Done = true
}

func (t Task) String() string {
    status := "[ ]"
    if t.Done {
        status = "[x]"
    }
    return fmt.Sprintf("%s %s (priority: %d)", status, t.Name, t.Priority)
}

func main() {
    task := Task{Name: "Deploy API", Priority: 1, Done: false}
    fmt.Println(task.String())

    task.Complete()
    fmt.Println(task.String())
}`,
          hints: [
            'Struct fields need types: `string`, `int`, `bool`.',
            '`Complete()` changes the struct, so it needs a pointer receiver: `*Task`.',
            '`String()` only reads, so a value receiver `Task` is fine. Fill in: `string`, `int`, `bool`, `*Task`, `Task`.',
          ],
          concepts: ['struct', 'methods', 'pointer receiver', 'value receiver', 'Stringer'],
        },
        {
          id: 'go-struct-2',
          title: 'Interfaces in Practice',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'go',
          goal: 'Define a `Logger` interface with a `Log(msg string)` method. Then create two types that satisfy it: `ConsoleLogger` (prints to stdout with a "[CONSOLE]" prefix) and `FileLogger` (has a `Path string` field and prints the path plus the message). Write a function `logAll` that takes a `Logger` and a slice of messages and logs each one.',
          skeleton: `package main

import "fmt"

// Define the Logger interface, ConsoleLogger, FileLogger, and logAll here


func main() {
    console := ConsoleLogger{}
    file := FileLogger{Path: "/var/log/app.log"}

    messages := []string{"server started", "listening on :8080", "ready"}

    fmt.Println("--- Console ---")
    logAll(console, messages)

    fmt.Println("--- File ---")
    logAll(file, messages)
}`,
          solution: `package main

import "fmt"

type Logger interface {
    Log(msg string)
}

type ConsoleLogger struct{}

func (c ConsoleLogger) Log(msg string) {
    fmt.Println("[CONSOLE]", msg)
}

type FileLogger struct {
    Path string
}

func (f FileLogger) Log(msg string) {
    fmt.Printf("[FILE:%s] %s\\n", f.Path, msg)
}

func logAll(logger Logger, messages []string) {
    for _, msg := range messages {
        logger.Log(msg)
    }
}

func main() {
    console := ConsoleLogger{}
    file := FileLogger{Path: "/var/log/app.log"}

    messages := []string{"server started", "listening on :8080", "ready"}

    fmt.Println("--- Console ---")
    logAll(console, messages)

    fmt.Println("--- File ---")
    logAll(file, messages)
}`,
          hints: [
            'An interface lists method signatures: `type Logger interface { Log(msg string) }`.',
            'Any struct with a `Log(msg string)` method automatically satisfies Logger. No "implements" needed.',
            '`logAll` takes `(logger Logger, messages []string)` and loops with `for _, msg := range messages`.',
          ],
          concepts: ['interface', 'implicit satisfaction', 'struct methods', 'polymorphism', 'range'],
        },
      ],
    },
    {
      id: 'go-concurrency',
      title: '4. Goroutines & Channels',
      explanation: `## Goroutines & Channels

Goroutines are lightweight threads. Channels let them communicate:

\`\`\`go
// Start a goroutine with "go"
go func() {
    fmt.Println("running in background")
}()

// Channels send data between goroutines
ch := make(chan string)

go func() {
    ch <- "hello"    // send
}()

msg := <-ch          // receive (blocks until data arrives)
fmt.Println(msg)     // "hello"
\`\`\`

**Buffered channels** hold values without a receiver ready:
\`\`\`go
ch := make(chan int, 3)  // buffer of 3
ch <- 1
ch <- 2
ch <- 3
// ch <- 4  // would block! buffer full
\`\`\`

**Select** waits on multiple channels:
\`\`\`go
select {
case msg := <-inbox:
    handle(msg)
case <-time.After(5 * time.Second):
    fmt.Println("timeout")
}
\`\`\``,
      exercises: [
        {
          id: 'go-conc-1',
          title: 'Basic Goroutines and Channels',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'go',
          goal: 'Complete the code that launches goroutines to check multiple servers and collects results via a channel.',
          skeleton: `package main

import (
    "fmt"
    "time"
)

type HealthResult struct {
    Server  string
    Healthy bool
    Latency time.Duration
}

func checkHealth(server string, results __BLANK__ HealthResult) {
    // Simulate a health check
    start := time.Now()
    time.Sleep(100 * time.Millisecond)
    latency := time.Since(start)

    // Send result back through the channel
    results __BLANK__ HealthResult{
        Server:  server,
        Healthy: true,
        Latency: latency,
    }
}

func main() {
    servers := []string{"rocky", "pangolin", "bav-apps"}
    results := __BLANK__(chan HealthResult, len(servers))

    for _, srv := range servers {
        __BLANK__ checkHealth(srv, results)
    }

    // Collect all results
    for i := 0; i < len(servers); i++ {
        r := __BLANK__results
        fmt.Printf("%s: healthy=%t latency=%v\\n", r.Server, r.Healthy, r.Latency)
    }
}`,
          solution: `package main

import (
    "fmt"
    "time"
)

type HealthResult struct {
    Server  string
    Healthy bool
    Latency time.Duration
}

func checkHealth(server string, results chan<- HealthResult) {
    start := time.Now()
    time.Sleep(100 * time.Millisecond)
    latency := time.Since(start)

    results <- HealthResult{
        Server:  server,
        Healthy: true,
        Latency: latency,
    }
}

func main() {
    servers := []string{"rocky", "pangolin", "bav-apps"}
    results := make(chan HealthResult, len(servers))

    for _, srv := range servers {
        go checkHealth(srv, results)
    }

    for i := 0; i < len(servers); i++ {
        r := <-results
        fmt.Printf("%s: healthy=%t latency=%v\\n", r.Server, r.Healthy, r.Latency)
    }
}`,
          hints: [
            'Channel parameter type is `chan<- Type` (send-only) or `chan Type`. Send with `ch <- value`.',
            '`make(chan Type, bufferSize)` creates a buffered channel. `go` starts a goroutine.',
            'Fill in: `chan<-`, `<-`, `make`, `go`, `<-`.',
          ],
          concepts: ['goroutines', 'channels', 'chan<-', 'make', 'buffered channels'],
        },
        {
          id: 'go-conc-2',
          title: 'Worker Pool',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'go',
          goal: 'Write a worker pool: create a `jobs` channel and a `results` channel. Launch 3 worker goroutines that each read from `jobs`, double the number, and send it to `results`. Send 9 jobs (1 through 9) and collect all 9 results.',
          skeleton: `package main

import "fmt"

// Write the worker function and main here


func main() {
    // Create channels, launch 3 workers, send 9 jobs, collect results
    // Each worker reads ints from jobs, doubles them, sends to results

    // Should print 9 results (order may vary): 2, 4, 6, 8, 10, 12, 14, 16, 18
}`,
          solution: `package main

import "fmt"

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 9)
    results := make(chan int, 9)

    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    for j := 1; j <= 9; j++ {
        jobs <- j
    }
    close(jobs)

    for i := 0; i < 9; i++ {
        fmt.Println(<-results)
    }
}`,
          hints: [
            'Workers receive on `jobs <-chan int` and send on `results chan<- int`. Use `for j := range jobs` to read until closed.',
            'Create buffered channels with `make(chan int, 9)`. Launch workers with `go worker(...)`. Close jobs after sending all.',
            'Send 1..9 to jobs, then `close(jobs)`. Workers exit their range loop when the channel is closed. Collect 9 results.',
          ],
          concepts: ['worker pool', 'channel direction', 'close', 'range over channel', 'goroutines'],
        },
        {
          id: 'go-conc-3',
          title: 'Timeout with Select',
          type: 'fill-blank',
          difficulty: 'advanced',
          language: 'go',
          goal: 'Use select to implement a function that waits for a result but times out after a deadline.',
          skeleton: `package main

import (
    "fmt"
    "time"
)

func slowOperation() chan string {
    ch := make(chan string)
    go func() {
        time.Sleep(2 * time.Second)
        ch <- "operation complete"
    }()
    return ch
}

func waitWithTimeout(result chan string, timeout time.Duration) (string, bool) {
    __BLANK__ {
    case msg := __BLANK__:
        return msg, true
    case __BLANK__:
        return "", false
    }
}

func main() {
    result := slowOperation()

    msg, ok := waitWithTimeout(result, 1*time.Second)
    if __BLANK__ {
        fmt.Println("Timeout! Operation took too long.")
    } else {
        fmt.Println("Got:", msg)
    }
}`,
          solution: `package main

import (
    "fmt"
    "time"
)

func slowOperation() chan string {
    ch := make(chan string)
    go func() {
        time.Sleep(2 * time.Second)
        ch <- "operation complete"
    }()
    return ch
}

func waitWithTimeout(result chan string, timeout time.Duration) (string, bool) {
    select {
    case msg := <-result:
        return msg, true
    case <-time.After(timeout):
        return "", false
    }
}

func main() {
    result := slowOperation()

    msg, ok := waitWithTimeout(result, 1*time.Second)
    if !ok {
        fmt.Println("Timeout! Operation took too long.")
    } else {
        fmt.Println("Got:", msg)
    }
}`,
          hints: [
            '`select` works like switch but for channels. Each case waits on a channel operation.',
            '`time.After(duration)` returns a channel that sends after the duration. Use `<-result` and `<-time.After(timeout)`.',
            'Fill in: `select`, `<-result`, `<-time.After(timeout)`, `!ok`.',
          ],
          concepts: ['select', 'time.After', 'timeout pattern', 'channel operations'],
        },
      ],
    },
    {
      id: 'go-errors',
      title: '5. Error Handling & Packages',
      explanation: `## Error Handling & Packages

Go handles errors explicitly. No exceptions, no try/catch. Functions return errors:

\`\`\`go
f, err := os.Open("config.json")
if err != nil {
    return fmt.Errorf("opening config: %w", err)  // wrap with context
}
defer f.Close()
\`\`\`

**Custom errors:**
\`\`\`go
type NotFoundError struct {
    Name string
}

func (e *NotFoundError) Error() string {
    return fmt.Sprintf("%s not found", e.Name)
}
\`\`\`

**Check error types with \`errors.Is\` and \`errors.As\`:**
\`\`\`go
if errors.Is(err, os.ErrNotExist) {
    fmt.Println("file does not exist")
}
\`\`\`

**Packages:** every Go file starts with \`package name\`. Uppercase names are exported (public), lowercase are private:
\`\`\`go
package server

func Listen() {}  // exported, other packages can call it
func setup() {}   // unexported, internal only
\`\`\``,
      exercises: [
        {
          id: 'go-err-1',
          title: 'Error Wrapping',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'go',
          goal: 'Complete the code that reads a JSON config file with proper error wrapping at each step.',
          skeleton: `package main

import (
    "encoding/json"
    "fmt"
    "os"
)

type Config struct {
    Host string \`json:"host"\`
    Port int    \`json:"port"\`
}

func loadConfig(path string) (Config, error) {
    data, err := os.ReadFile(path)
    if err __BLANK__ nil {
        return Config{}, fmt.__BLANK__("reading config file: %__BLANK__", err)
    }

    var cfg Config
    err = json.Unmarshal(data, &cfg)
    if err != nil {
        return Config{}, fmt.Errorf("parsing config JSON: __BLANK__", err)
    }

    if cfg.Port < 1 || cfg.Port > 65535 {
        return Config{}, fmt.Errorf("invalid port: %d", cfg.Port)
    }

    return cfg, __BLANK__
}

func main() {
    cfg, err := loadConfig("config.json")
    if err != nil {
        fmt.Println("Error:", err)
        os.Exit(1)
    }
    fmt.Printf("Server: %s:%d\\n", cfg.Host, cfg.Port)
}`,
          solution: `package main

import (
    "encoding/json"
    "fmt"
    "os"
)

type Config struct {
    Host string \`json:"host"\`
    Port int    \`json:"port"\`
}

func loadConfig(path string) (Config, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return Config{}, fmt.Errorf("reading config file: %w", err)
    }

    var cfg Config
    err = json.Unmarshal(data, &cfg)
    if err != nil {
        return Config{}, fmt.Errorf("parsing config JSON: %w", err)
    }

    if cfg.Port < 1 || cfg.Port > 65535 {
        return Config{}, fmt.Errorf("invalid port: %d", cfg.Port)
    }

    return cfg, nil
}

func main() {
    cfg, err := loadConfig("config.json")
    if err != nil {
        fmt.Println("Error:", err)
        os.Exit(1)
    }
    fmt.Printf("Server: %s:%d\\n", cfg.Host, cfg.Port)
}`,
          hints: [
            'The standard error check pattern: `if err != nil`. Success returns `nil` as the error.',
            '`%w` wraps errors so callers can unwrap them later with `errors.Is` or `errors.As`.',
            'Fill in: `!=`, `Errorf`, `w`, `%w`, `nil`.',
          ],
          concepts: ['error wrapping', '%w', 'fmt.Errorf', 'nil', 'os.ReadFile', 'json.Unmarshal'],
        },
        {
          id: 'go-err-2',
          title: 'Custom Error Types',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'go',
          goal: 'Create a custom `ValidationError` type with `Field` and `Message` string fields. Implement the `Error()` method. Then write a `validateUser` function that checks a User struct (Name must not be empty, Age must be 0-150) and returns a `*ValidationError` when validation fails, or nil on success.',
          skeleton: `package main

import "fmt"

type User struct {
    Name string
    Age  int
}

// Define ValidationError and validateUser here


func main() {
    users := []User{
        {Name: "Zan", Age: 25},
        {Name: "", Age: 25},
        {Name: "Bob", Age: -5},
    }

    for _, u := range users {
        err := validateUser(u)
        if err != nil {
            fmt.Printf("INVALID: %s\\n", err)
        } else {
            fmt.Printf("VALID: %s (age %d)\\n", u.Name, u.Age)
        }
    }
}`,
          solution: `package main

import "fmt"

type User struct {
    Name string
    Age  int
}

type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation failed on %s: %s", e.Field, e.Message)
}

func validateUser(u User) error {
    if u.Name == "" {
        return &ValidationError{Field: "Name", Message: "must not be empty"}
    }
    if u.Age < 0 || u.Age > 150 {
        return &ValidationError{Field: "Age", Message: fmt.Sprintf("must be 0-150, got %d", u.Age)}
    }
    return nil
}

func main() {
    users := []User{
        {Name: "Zan", Age: 25},
        {Name: "", Age: 25},
        {Name: "Bob", Age: -5},
    }

    for _, u := range users {
        err := validateUser(u)
        if err != nil {
            fmt.Printf("INVALID: %s\\n", err)
        } else {
            fmt.Printf("VALID: %s (age %d)\\n", u.Name, u.Age)
        }
    }
}`,
          hints: [
            'Any type with an `Error() string` method satisfies the `error` interface.',
            'Return `&ValidationError{...}` (pointer) since the Error() method has a pointer receiver.',
            'The function signature should return `error` (the interface), not `*ValidationError`. Return `nil` for success.',
          ],
          concepts: ['custom errors', 'error interface', 'pointer receiver', 'validation', 'nil'],
        },
      ],
    },
  ],
};
