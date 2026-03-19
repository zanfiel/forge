import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-https',
  title: '26. HTTP Server',
  explanation: `## HTTP Server in Go

Go's \`net/http\` package makes building HTTP servers straightforward with handlers, multiplexers, and middleware support.

\`\`\`go
// Simple handler function
http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Hello, World!")
})
http.ListenAndServe(":8080", nil)

// Handler interface
type Handler interface {
    ServeHTTP(http.ResponseWriter, *http.Request)
}

// Custom handler type
type HelloHandler struct{}
func (h HelloHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Hello!")
}

// ServeMux for routing
mux := http.NewServeMux()
mux.HandleFunc("/api/users", usersHandler)
mux.Handle("/api/items", &itemsHandler{})

// Server with configuration
server := &http.Server{
    Addr:         ":8080",
    Handler:      mux,
    ReadTimeout:  5 * time.Second,
    WriteTimeout: 10 * time.Second,
}
server.ListenAndServe()
\`\`\``,
  exercises: [
    {
      id: 'go-https-1',
      title: 'HandleFunc',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Register a handler function for a route.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.__BLANK__("/hello", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello!")
    })
    http.ListenAndServe(":8080", nil)
}`,
      solution: `package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello!")
    })
    http.ListenAndServe(":8080", nil)
}`,
      hints: [
        'http.HandleFunc registers a function for a pattern.',
        'The function receives ResponseWriter and *Request.',
        'Passing nil to ListenAndServe uses DefaultServeMux.',
      ],
      concepts: ['http.HandleFunc', 'handler function'],
    },
    {
      id: 'go-https-2',
      title: 'Write to ResponseWriter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a response body to the client.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

func greetHandler(w http.ResponseWriter, r *http.Request) {
    __BLANK__.Fprintln(w, "Welcome to Go!")
}`,
      solution: `package main

import (
    "fmt"
    "net/http"
)

func greetHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Welcome to Go!")
}`,
      hints: [
        'http.ResponseWriter implements io.Writer.',
        'fmt.Fprintln writes to any io.Writer.',
        'You can also use w.Write([]byte(...)).',
      ],
      concepts: ['ResponseWriter', 'fmt.Fprintln'],
    },
    {
      id: 'go-https-3',
      title: 'Set Status Code',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Set an HTTP status code before writing the response body.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

func notFoundHandler(w http.ResponseWriter, r *http.Request) {
    w.__BLANK__(http.StatusNotFound)
    fmt.Fprintln(w, "page not found")
}`,
      solution: `package main

import (
    "fmt"
    "net/http"
)

func notFoundHandler(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusNotFound)
    fmt.Fprintln(w, "page not found")
}`,
      hints: [
        'w.WriteHeader sets the HTTP status code.',
        'It must be called before any Write calls.',
        'If not called, the default status is 200 OK.',
      ],
      concepts: ['WriteHeader', 'status codes'],
    },
    {
      id: 'go-https-4',
      title: 'Set Content-Type Header',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Set the Content-Type header for a JSON response.',
      skeleton: `package main

import (
    "encoding/json"
    "net/http"
)

func jsonHandler(w http.ResponseWriter, r *http.Request) {
    w.__BLANK__().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}`,
      solution: `package main

import (
    "encoding/json"
    "net/http"
)

func jsonHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}`,
      hints: [
        'w.Header() returns the response headers map.',
        'Set Content-Type before calling Write or WriteHeader.',
        'Use .Set() to replace or .Add() to append headers.',
      ],
      concepts: ['Header().Set', 'Content-Type'],
    },
    {
      id: 'go-https-5',
      title: 'NewServeMux',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create a custom ServeMux for routing.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

func main() {
    mux := http.__BLANK__()
    mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "ok")
    })
    http.ListenAndServe(":8080", mux)
}`,
      solution: `package main

import (
    "fmt"
    "net/http"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "ok")
    })
    http.ListenAndServe(":8080", mux)
}`,
      hints: [
        'http.NewServeMux creates a custom request multiplexer.',
        'Pass it to ListenAndServe instead of nil.',
        'Avoids using the global DefaultServeMux.',
      ],
      concepts: ['http.NewServeMux', 'routing'],
    },
    {
      id: 'go-https-6',
      title: 'Implement Handler Interface',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create a struct that implements the http.Handler interface.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

type CountHandler struct {
    count int
}

// Implement ServeHTTP to respond with the current count
// and increment it each time`,
      solution: `package main

import (
    "fmt"
    "net/http"
)

type CountHandler struct {
    count int
}

func (h *CountHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    h.count++
    fmt.Fprintf(w, "Count: %d", h.count)
}`,
      hints: [
        'Implement ServeHTTP(http.ResponseWriter, *http.Request).',
        'Use a pointer receiver to mutate the count.',
        'Register with mux.Handle("/path", &CountHandler{}).',
      ],
      concepts: ['http.Handler', 'ServeHTTP', 'stateful handler'],
    },
    {
      id: 'go-https-7',
      title: 'Read Request Body',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a handler that reads and echoes the request body.',
      skeleton: `package main

import (
    "io"
    "net/http"
)

// echoHandler reads the request body and writes it back as the response
func echoHandler(w http.ResponseWriter, r *http.Request) {
}`,
      solution: `package main

import (
    "io"
    "net/http"
)

func echoHandler(w http.ResponseWriter, r *http.Request) {
    body, err := io.ReadAll(r.Body)
    if err != nil {
        http.Error(w, "failed to read body", http.StatusBadRequest)
        return
    }
    defer r.Body.Close()
    w.Write(body)
}`,
      hints: [
        'r.Body is an io.ReadCloser with the request payload.',
        'Use io.ReadAll to read the entire body.',
        'http.Error is a helper for error responses.',
      ],
      concepts: ['r.Body', 'io.ReadAll', 'http.Error'],
    },
    {
      id: 'go-https-8',
      title: 'JSON API Handler',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a handler that accepts JSON POST and responds with JSON.',
      skeleton: `package main

import (
    "encoding/json"
    "net/http"
)

type Input struct {
    Name string \`json:"name"\`
}

type Output struct {
    Greeting string \`json:"greeting"\`
}

// greetAPI decodes JSON body, creates greeting, responds with JSON
func greetAPI(w http.ResponseWriter, r *http.Request) {
}`,
      solution: `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type Input struct {
    Name string \`json:"name"\`
}

type Output struct {
    Greeting string \`json:"greeting"\`
}

func greetAPI(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
        return
    }
    var in Input
    if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
        http.Error(w, "invalid JSON", http.StatusBadRequest)
        return
    }
    out := Output{Greeting: fmt.Sprintf("Hello, %s!", in.Name)}
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(out)
}`,
      hints: [
        'Check the HTTP method first.',
        'Decode with json.NewDecoder(r.Body).Decode.',
        'Set Content-Type before encoding the response.',
      ],
      concepts: ['JSON API', 'method check', 'encode/decode'],
    },
    {
      id: 'go-https-9',
      title: 'Server with Timeouts',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create an http.Server with proper timeouts.',
      skeleton: `package main

import (
    "net/http"
    "time"
)

// NewServer returns a configured *http.Server on the given addr
// with read timeout 5s, write timeout 10s, idle timeout 120s
func NewServer(addr string, handler http.Handler) *http.Server {
}`,
      solution: `package main

import (
    "net/http"
    "time"
)

func NewServer(addr string, handler http.Handler) *http.Server {
    return &http.Server{
        Addr:         addr,
        Handler:      handler,
        ReadTimeout:  5 * time.Second,
        WriteTimeout: 10 * time.Second,
        IdleTimeout:  120 * time.Second,
    }
}`,
      hints: [
        'http.Server has multiple timeout fields.',
        'ReadTimeout limits time to read the full request.',
        'WriteTimeout limits time from request read to response write.',
      ],
      concepts: ['http.Server', 'timeouts', 'production config'],
    },
    {
      id: 'go-https-10',
      title: 'Query Parameters',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a handler that reads query parameters from the URL.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

// searchHandler reads "q" query parameter and responds with it
// Example: /search?q=golang -> "Search: golang"
func searchHandler(w http.ResponseWriter, r *http.Request) {
}`,
      solution: `package main

import (
    "fmt"
    "net/http"
)

func searchHandler(w http.ResponseWriter, r *http.Request) {
    query := r.URL.Query().Get("q")
    if query == "" {
        http.Error(w, "missing q parameter", http.StatusBadRequest)
        return
    }
    fmt.Fprintf(w, "Search: %s", query)
}`,
      hints: [
        'r.URL.Query() returns the parsed query parameters.',
        '.Get("key") returns the first value for the key.',
        'Returns empty string if the parameter is missing.',
      ],
      concepts: ['r.URL.Query', 'query parameters'],
    },
    {
      id: 'go-https-11',
      title: 'Predict Handler Execution',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the default status code when only writing a response body.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "hello")
}

// What HTTP status code does this handler return?
// A) 0 (none)
// B) 200 OK
// C) 204 No Content
// D) It depends on the request method`,
      solution: `B) 200 OK`,
      hints: [
        'If WriteHeader is never called, Go defaults to 200.',
        'The first Write call implicitly sends a 200 status.',
        'To send a different status, call WriteHeader first.',
      ],
      concepts: ['default status code', 'implicit WriteHeader'],
    },
    {
      id: 'go-https-12',
      title: 'Predict WriteHeader Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict what happens when WriteHeader is called after Write.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "body first")
    w.WriteHeader(http.StatusCreated)
}

// What status code does the client receive?
// A) 200 OK
// B) 201 Created
// C) Runtime panic
// D) Compilation error`,
      solution: `A) 200 OK`,
      hints: [
        'The first Write call sends headers with status 200.',
        'WriteHeader after Write is a no-op (headers already sent).',
        'Go logs a "superfluous response.WriteHeader call" warning.',
      ],
      concepts: ['WriteHeader ordering', 'implicit status'],
    },
    {
      id: 'go-https-13',
      title: 'Predict Pattern Matching',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict which handler matches a request path.',
      skeleton: `package main

import "net/http"

// Given these registrations:
// mux.HandleFunc("/", rootHandler)
// mux.HandleFunc("/api/", apiHandler)
// mux.HandleFunc("/api/users", usersHandler)
//
// Which handler matches GET /api/items ?
// A) rootHandler
// B) apiHandler
// C) usersHandler
// D) 404 not found`,
      solution: `B) apiHandler`,
      hints: [
        'Trailing slash patterns match all paths with that prefix.',
        '"/api/" matches /api/items, /api/anything, etc.',
        '"/api/users" matches exactly /api/users.',
      ],
      concepts: ['pattern matching', 'trailing slash', 'ServeMux'],
    },
    {
      id: 'go-https-14',
      title: 'Fix Missing Method Check',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the handler that accepts any HTTP method when it should only accept POST.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

func createHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "created")
}`,
      solution: `package main

import (
    "fmt"
    "net/http"
)

func createHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
        return
    }
    fmt.Fprintln(w, "created")
}`,
      hints: [
        'Check r.Method at the start of the handler.',
        'Return 405 Method Not Allowed for wrong methods.',
        'Use http.MethodPost constant instead of "POST" string.',
      ],
      concepts: ['method check', 'http.MethodPost', 'StatusMethodNotAllowed'],
    },
    {
      id: 'go-https-15',
      title: 'Fix Double WriteHeader',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the handler that writes headers twice causing incorrect status.',
      skeleton: `package main

import (
    "encoding/json"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    data := map[string]string{"status": "created"}
    json.NewEncoder(w).Encode(data)
    w.WriteHeader(http.StatusCreated)
}`,
      solution: `package main

import (
    "encoding/json"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    data := map[string]string{"status": "created"}
    json.NewEncoder(w).Encode(data)
}`,
      hints: [
        'WriteHeader must be called before any Write.',
        'json.Encode calls Write, which sends implicit 200.',
        'Set headers and status code first, then write the body.',
      ],
      concepts: ['WriteHeader ordering', 'response lifecycle'],
    },
    {
      id: 'go-https-16',
      title: 'Fix Error Response Missing Return',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the handler that continues execution after sending an error response.',
      skeleton: `package main

import (
    "encoding/json"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    id := r.URL.Query().Get("id")
    if id == "" {
        http.Error(w, "missing id", http.StatusBadRequest)
    }
    // This code runs even when id is empty!
    user := LookupUser(id)
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}`,
      solution: `package main

import (
    "encoding/json"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    id := r.URL.Query().Get("id")
    if id == "" {
        http.Error(w, "missing id", http.StatusBadRequest)
        return
    }
    user := LookupUser(id)
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}`,
      hints: [
        'http.Error does not stop handler execution.',
        'Add return after http.Error to prevent further processing.',
        'Without return, you get double-write and wrong behavior.',
      ],
      concepts: ['http.Error', 'early return', 'handler flow'],
    },
    {
      id: 'go-https-17',
      title: 'Write Static File Server',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a handler that serves static files from a directory.',
      skeleton: `package main

import "net/http"

// SetupStaticServer registers a handler that serves files from ./static
// at the /static/ URL path
func SetupStaticServer(mux *http.ServeMux) {
}`,
      solution: `package main

import "net/http"

func SetupStaticServer(mux *http.ServeMux) {
    fs := http.FileServer(http.Dir("./static"))
    mux.Handle("/static/", http.StripPrefix("/static/", fs))
}`,
      hints: [
        'http.FileServer serves files from an http.FileSystem.',
        'http.Dir wraps a directory path as a FileSystem.',
        'http.StripPrefix removes the URL prefix before looking up files.',
      ],
      concepts: ['http.FileServer', 'http.Dir', 'http.StripPrefix'],
    },
    {
      id: 'go-https-18',
      title: 'Write Graceful Shutdown',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write server startup code with graceful shutdown on signal.',
      skeleton: `package main

import (
    "context"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
)

// RunServer starts the server and shuts down gracefully on SIGINT/SIGTERM
// Allow 5 seconds for in-flight requests to complete
func RunServer(srv *http.Server) error {
}`,
      solution: `package main

import (
    "context"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
)

func RunServer(srv *http.Server) error {
    errCh := make(chan error, 1)
    go func() {
        errCh <- srv.ListenAndServe()
    }()

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

    select {
    case err := <-errCh:
        return err
    case <-quit:
        ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
        defer cancel()
        return srv.Shutdown(ctx)
    }
}`,
      hints: [
        'Run ListenAndServe in a goroutine.',
        'Use signal.Notify to catch OS signals.',
        'srv.Shutdown gracefully waits for in-flight requests.',
      ],
      concepts: ['graceful shutdown', 'signal.Notify', 'srv.Shutdown'],
    },
    {
      id: 'go-https-19',
      title: 'Refactor Handler to Use http.Error',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Refactor manual error responses to use http.Error helper.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    id := r.URL.Query().Get("id")
    if id == "" {
        w.WriteHeader(http.StatusBadRequest)
        fmt.Fprintln(w, "missing id parameter")
        return
    }
    fmt.Fprintf(w, "ID: %s", id)
}`,
      solution: `package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    id := r.URL.Query().Get("id")
    if id == "" {
        http.Error(w, "missing id parameter", http.StatusBadRequest)
        return
    }
    fmt.Fprintf(w, "ID: %s", id)
}`,
      hints: [
        'http.Error sets the status code and writes the error message.',
        'It also sets Content-Type to text/plain.',
        'One function call instead of two.',
      ],
      concepts: ['http.Error', 'error responses'],
    },
    {
      id: 'go-https-20',
      title: 'Refactor to http.Server',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor from ListenAndServe to a configured http.Server.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello!")
    })
    http.ListenAndServe(":8080", mux)
}`,
      solution: `package main

import (
    "fmt"
    "log"
    "net/http"
    "time"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello!")
    })
    srv := &http.Server{
        Addr:         ":8080",
        Handler:      mux,
        ReadTimeout:  5 * time.Second,
        WriteTimeout: 10 * time.Second,
        IdleTimeout:  120 * time.Second,
    }
    log.Fatal(srv.ListenAndServe())
}`,
      hints: [
        'http.Server gives control over timeouts and TLS.',
        'Always set timeouts to prevent slowloris attacks.',
        'log.Fatal logs the error and exits if ListenAndServe fails.',
      ],
      concepts: ['http.Server', 'timeouts', 'production configuration'],
    },
  ],
};
