import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-ctx',
  title: '19. Context',
  explanation: `## Context in Go

The \`context\` package provides request-scoped values, cancellation signals, and deadlines across API boundaries and goroutines.

\`\`\`go
// Root contexts
ctx := context.Background() // top-level, never cancelled
ctx := context.TODO()       // placeholder when unsure

// Cancellation
ctx, cancel := context.WithCancel(parent)
defer cancel() // always cancel to free resources

// Timeout
ctx, cancel := context.WithTimeout(parent, 5*time.Second)
defer cancel()

// Deadline
ctx, cancel := context.WithDeadline(parent, time.Now().Add(1*time.Hour))
defer cancel()

// Values (use sparingly)
ctx = context.WithValue(parent, key, value)
val := ctx.Value(key)

// Check for cancellation
select {
case <-ctx.Done():
    return ctx.Err() // context.Canceled or context.DeadlineExceeded
default:
    // continue work
}
\`\`\``,
  exercises: [
    {
      id: 'go-ctx-1',
      title: 'Background Context',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Create a background context as the root of a context tree.',
      skeleton: `package main

import (
    "context"
    "fmt"
)

func main() {
    ctx := context.__BLANK__()
    fmt.Println(ctx.Err())
    fmt.Println(ctx.Done() == nil)
}`,
      solution: `package main

import (
    "context"
    "fmt"
)

func main() {
    ctx := context.Background()
    fmt.Println(ctx.Err())
    fmt.Println(ctx.Done() == nil)
}`,
      hints: [
        'context.Background() is the root context.',
        'It is never cancelled and has no deadline.',
        'Its Done channel is nil.',
      ],
      concepts: ['context.Background', 'root context'],
    },
    {
      id: 'go-ctx-2',
      title: 'WithCancel',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Create a cancellable context using WithCancel.',
      skeleton: `package main

import (
    "context"
    "fmt"
)

func main() {
    ctx, cancel := context.__BLANK__(context.Background())
    defer __BLANK__()

    fmt.Println("before:", ctx.Err())
    cancel()
    fmt.Println("after:", ctx.Err())
}`,
      solution: `package main

import (
    "context"
    "fmt"
)

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()

    fmt.Println("before:", ctx.Err())
    cancel()
    fmt.Println("after:", ctx.Err())
}`,
      hints: [
        'WithCancel returns a context and a cancel function.',
        'Calling cancel marks the context as cancelled.',
        'Always defer cancel() to prevent leaks.',
      ],
      concepts: ['context.WithCancel', 'cancel function'],
    },
    {
      id: 'go-ctx-3',
      title: 'WithTimeout',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create a context with a timeout.',
      skeleton: `package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.__BLANK__(context.Background(), 100*time.Millisecond)
    defer cancel()

    select {
    case <-time.After(200 * time.Millisecond):
        fmt.Println("completed")
    case <-ctx.__BLANK__():
        fmt.Println("timeout:", ctx.Err())
    }
}`,
      solution: `package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    select {
    case <-time.After(200 * time.Millisecond):
        fmt.Println("completed")
    case <-ctx.Done():
        fmt.Println("timeout:", ctx.Err())
    }
}`,
      hints: [
        'WithTimeout creates a context that auto-cancels after the duration.',
        'ctx.Done() returns a channel that closes on cancellation.',
        'ctx.Err() returns DeadlineExceeded or Canceled.',
      ],
      concepts: ['context.WithTimeout', 'ctx.Done', 'deadline exceeded'],
    },
    {
      id: 'go-ctx-4',
      title: 'WithDeadline',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Create a context with an absolute deadline.',
      skeleton: `package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    deadline := time.Now().Add(50 * time.Millisecond)
    ctx, cancel := context.__BLANK__(context.Background(), deadline)
    defer cancel()

    dl, ok := ctx.__BLANK__()
    fmt.Println("has deadline:", ok)
    fmt.Println("deadline set:", !dl.IsZero())

    <-ctx.Done()
    fmt.Println("expired:", ctx.Err())
}`,
      solution: `package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    deadline := time.Now().Add(50 * time.Millisecond)
    ctx, cancel := context.WithDeadline(context.Background(), deadline)
    defer cancel()

    dl, ok := ctx.Deadline()
    fmt.Println("has deadline:", ok)
    fmt.Println("deadline set:", !dl.IsZero())

    <-ctx.Done()
    fmt.Println("expired:", ctx.Err())
}`,
      hints: [
        'WithDeadline takes an absolute time.Time.',
        'ctx.Deadline() returns the deadline and whether one is set.',
        'The context cancels automatically when the deadline passes.',
      ],
      concepts: ['context.WithDeadline', 'ctx.Deadline'],
    },
    {
      id: 'go-ctx-5',
      title: 'WithValue',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Pass request-scoped values through context.',
      skeleton: `package main

import (
    "context"
    "fmt"
)

type contextKey string

const userKey contextKey = "user"

func getUser(ctx context.Context) string {
    val := ctx.__BLANK__(userKey)
    if val == nil {
        return "anonymous"
    }
    return val.(string)
}

func main() {
    ctx := context.__BLANK__(context.Background(), userKey, "alice")
    fmt.Println(getUser(ctx))
    fmt.Println(getUser(context.Background()))
}`,
      solution: `package main

import (
    "context"
    "fmt"
)

type contextKey string

const userKey contextKey = "user"

func getUser(ctx context.Context) string {
    val := ctx.Value(userKey)
    if val == nil {
        return "anonymous"
    }
    return val.(string)
}

func main() {
    ctx := context.WithValue(context.Background(), userKey, "alice")
    fmt.Println(getUser(ctx))
    fmt.Println(getUser(context.Background()))
}`,
      hints: [
        'WithValue associates a key-value pair with the context.',
        'ctx.Value(key) retrieves it.',
        'Use a custom type for keys to avoid collisions.',
      ],
      concepts: ['context.WithValue', 'ctx.Value', 'context key type'],
    },
    {
      id: 'go-ctx-6',
      title: 'Context in Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Pass context as the first parameter to a function.',
      skeleton: `package main

import (
    "context"
    "fmt"
    "time"
)

func doWork(__BLANK__ context.Context) error {
    select {
    case <-time.After(200 * time.Millisecond):
        fmt.Println("work done")
        return nil
    case <-ctx.Done():
        return ctx.Err()
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    if err := doWork(ctx); err != nil {
        fmt.Println("cancelled:", err)
    }
}`,
      solution: `package main

import (
    "context"
    "fmt"
    "time"
)

func doWork(ctx context.Context) error {
    select {
    case <-time.After(200 * time.Millisecond):
        fmt.Println("work done")
        return nil
    case <-ctx.Done():
        return ctx.Err()
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    if err := doWork(ctx); err != nil {
        fmt.Println("cancelled:", err)
    }
}`,
      hints: [
        'Context should always be the first parameter named ctx.',
        'Check ctx.Done() in long-running operations.',
        'Return ctx.Err() when cancelled.',
      ],
      concepts: ['context parameter', 'ctx convention', 'cancellation check'],
    },
    {
      id: 'go-ctx-7',
      title: 'Cancel Propagation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Demonstrate that cancelling a parent context cancels child contexts.',
      skeleton: `package main

import (
    "context"
    "fmt"
)

func main() {
    parent, parentCancel := context.WithCancel(context.Background())
    child, childCancel := context.WithCancel(parent)
    defer childCancel()

    // Cancel parent and show both parent and child are cancelled
}`,
      solution: `package main

import (
    "context"
    "fmt"
)

func main() {
    parent, parentCancel := context.WithCancel(context.Background())
    child, childCancel := context.WithCancel(parent)
    defer childCancel()

    parentCancel()

    fmt.Println("parent err:", parent.Err())
    fmt.Println("child err:", child.Err())
}`,
      hints: [
        'Cancelling a parent cancels all derived child contexts.',
        'Both parent.Err() and child.Err() return context.Canceled.',
        'Child contexts inherit cancellation from parents.',
      ],
      concepts: ['context propagation', 'parent-child cancellation'],
    },
    {
      id: 'go-ctx-8',
      title: 'Context-Aware Worker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a worker that respects context cancellation.',
      skeleton: `package main

import (
    "context"
    "fmt"
    "time"
)

func worker(ctx context.Context, id int) error {
    // Process items in a loop, checking ctx between each
    // Return nil on completion, ctx.Err() on cancellation
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 250*time.Millisecond)
    defer cancel()

    if err := worker(ctx, 1); err != nil {
        fmt.Println("worker stopped:", err)
    }
}`,
      solution: `package main

import (
    "context"
    "fmt"
    "time"
)

func worker(ctx context.Context, id int) error {
    for i := 0; ; i++ {
        select {
        case <-ctx.Done():
            fmt.Printf("worker %d: processed %d items\\n", id, i)
            return ctx.Err()
        default:
            fmt.Printf("worker %d: item %d\\n", id, i)
            time.Sleep(50 * time.Millisecond)
        }
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 250*time.Millisecond)
    defer cancel()

    if err := worker(ctx, 1); err != nil {
        fmt.Println("worker stopped:", err)
    }
}`,
      hints: [
        'Check ctx.Done() in each iteration of the work loop.',
        'Use select with default for non-blocking check.',
        'Return ctx.Err() to indicate the reason for stopping.',
      ],
      concepts: ['context-aware loop', 'graceful cancellation'],
    },
    {
      id: 'go-ctx-9',
      title: 'Request ID Middleware',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use context.WithValue to pass a request ID through handlers.',
      skeleton: `package main

import (
    "context"
    "fmt"
)

type ctxKey string

const requestIDKey ctxKey = "requestID"

func withRequestID(ctx context.Context, id string) context.Context {
    // Add request ID to context
}

func getRequestID(ctx context.Context) string {
    // Get request ID from context
}

func handler(ctx context.Context) {
    fmt.Println("handling request:", getRequestID(ctx))
}

func main() {
    ctx := withRequestID(context.Background(), "req-123")
    handler(ctx)
}`,
      solution: `package main

import (
    "context"
    "fmt"
)

type ctxKey string

const requestIDKey ctxKey = "requestID"

func withRequestID(ctx context.Context, id string) context.Context {
    return context.WithValue(ctx, requestIDKey, id)
}

func getRequestID(ctx context.Context) string {
    val, ok := ctx.Value(requestIDKey).(string)
    if !ok {
        return ""
    }
    return val
}

func handler(ctx context.Context) {
    fmt.Println("handling request:", getRequestID(ctx))
}

func main() {
    ctx := withRequestID(context.Background(), "req-123")
    handler(ctx)
}`,
      hints: [
        'Wrap context.WithValue in a helper function.',
        'Use type assertion with comma-ok for safe extraction.',
        'Custom key types prevent collisions.',
      ],
      concepts: ['context value pattern', 'request ID', 'middleware'],
    },
    {
      id: 'go-ctx-10',
      title: 'Context with HTTP',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use context for HTTP request timeout.',
      skeleton: `package main

import (
    "context"
    "fmt"
    "net/http"
    "time"
)

func fetchWithTimeout(url string, timeout time.Duration) error {
    // Create an HTTP request with a timeout context
    // Return error if timeout or request fails
}

func main() {
    err := fetchWithTimeout("https://httpbin.org/delay/5", 1*time.Second)
    if err != nil {
        fmt.Println("error:", err)
    }
}`,
      solution: `package main

import (
    "context"
    "fmt"
    "net/http"
    "time"
)

func fetchWithTimeout(url string, timeout time.Duration) error {
    ctx, cancel := context.WithTimeout(context.Background(), timeout)
    defer cancel()

    req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
    if err != nil {
        return err
    }

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()

    fmt.Println("status:", resp.StatusCode)
    return nil
}

func main() {
    err := fetchWithTimeout("https://httpbin.org/delay/5", 1*time.Second)
    if err != nil {
        fmt.Println("error:", err)
    }
}`,
      hints: [
        'Use http.NewRequestWithContext to attach context.',
        'The context timeout cancels the request automatically.',
        'Always close the response body.',
      ],
      concepts: ['HTTP context', 'request timeout', 'NewRequestWithContext'],
    },
    {
      id: 'go-ctx-11',
      title: 'Context Timeout Chain',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Create a chain of timeouts where the shortest wins.',
      skeleton: `package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    // Create parent with 500ms timeout
    // Create child with 200ms timeout
    // Show that child timeout (shorter) fires first
}`,
      solution: `package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    parent, parentCancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
    defer parentCancel()

    child, childCancel := context.WithTimeout(parent, 200*time.Millisecond)
    defer childCancel()

    start := time.Now()
    <-child.Done()
    elapsed := time.Since(start).Round(time.Millisecond)
    fmt.Printf("child done after ~%v: %v\\n", elapsed, child.Err())

    fmt.Println("parent err:", parent.Err())
}`,
      hints: [
        'A child timeout shorter than parent fires first.',
        'The effective timeout is the minimum of the chain.',
        'Parent remains valid until its own timeout.',
      ],
      concepts: ['timeout chain', 'minimum timeout', 'context hierarchy'],
    },
    {
      id: 'go-ctx-12',
      title: 'AfterFunc Context',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use context.AfterFunc to run cleanup when context is cancelled.',
      skeleton: `package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithCancel(context.Background())

    // Register a function to run when ctx is cancelled
    // using context.AfterFunc (Go 1.21+)
    context.AfterFunc(ctx, func() {
        fmt.Println("cleanup: context cancelled")
    })

    // Cancel after a short delay
    go func() {
        time.Sleep(100 * time.Millisecond)
        cancel()
    }()

    <-ctx.Done()
    time.Sleep(50 * time.Millisecond) // wait for AfterFunc
    fmt.Println("done")
}`,
      solution: `package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithCancel(context.Background())

    context.AfterFunc(ctx, func() {
        fmt.Println("cleanup: context cancelled")
    })

    go func() {
        time.Sleep(100 * time.Millisecond)
        cancel()
    }()

    <-ctx.Done()
    time.Sleep(50 * time.Millisecond)
    fmt.Println("done")
}`,
      hints: [
        'context.AfterFunc registers a callback for cancellation.',
        'The function runs in its own goroutine when ctx is done.',
        'Available since Go 1.21.',
      ],
      concepts: ['context.AfterFunc', 'cleanup callback'],
    },
    {
      id: 'go-ctx-13',
      title: 'Predict WithCancel',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the error returned after cancelling a context.',
      skeleton: `package main

import (
    "context"
    "fmt"
)

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    fmt.Println(ctx.Err())
    cancel()
    fmt.Println(ctx.Err())
}`,
      solution: `<nil>
context canceled`,
      hints: [
        'Before cancel, Err() returns nil.',
        'After cancel, Err() returns context.Canceled.',
        'The string representation is "context canceled".',
      ],
      concepts: ['context.Canceled', 'Err()'],
    },
    {
      id: 'go-ctx-14',
      title: 'Predict Value Lookup',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the behavior of nested context value lookups.',
      skeleton: `package main

import (
    "context"
    "fmt"
)

type key string

func main() {
    ctx1 := context.WithValue(context.Background(), key("a"), "1")
    ctx2 := context.WithValue(ctx1, key("b"), "2")
    ctx3 := context.WithValue(ctx2, key("a"), "3")

    fmt.Println(ctx3.Value(key("a")))
    fmt.Println(ctx3.Value(key("b")))
    fmt.Println(ctx2.Value(key("a")))
}`,
      solution: `3
2
1`,
      hints: [
        'Value lookups search from the current context upward.',
        'ctx3 has its own "a"="3" which shadows ctx1 "a"="1".',
        'ctx2 inherits "a"="1" from ctx1.',
      ],
      concepts: ['context value shadowing', 'value chain'],
    },
    {
      id: 'go-ctx-15',
      title: 'Predict Timeout Error',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the error type for a timed-out context.',
      skeleton: `package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 1*time.Millisecond)
    defer cancel()
    time.Sleep(10 * time.Millisecond)

    fmt.Println(ctx.Err() == context.DeadlineExceeded)
    fmt.Println(ctx.Err() == context.Canceled)
}`,
      solution: `true
false`,
      hints: [
        'A timeout produces DeadlineExceeded, not Canceled.',
        'Canceled comes from explicit cancel() calls.',
        'DeadlineExceeded comes from timeout/deadline expiry.',
      ],
      concepts: ['DeadlineExceeded', 'Canceled', 'error distinction'],
    },
    {
      id: 'go-ctx-16',
      title: 'Fix Missing Cancel',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the context leak caused by not calling cancel.',
      skeleton: `package main

import (
    "context"
    "fmt"
    "time"
)

func doRequest() string {
    ctx, _ := context.WithTimeout(context.Background(), 5*time.Second) // Bug: cancel not called
    _ = ctx
    return "response"
}

func main() {
    for i := 0; i < 100; i++ {
        _ = doRequest()
    }
    fmt.Println("done")
}`,
      solution: `package main

import (
    "context"
    "fmt"
    "time"
)

func doRequest() string {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    _ = ctx
    return "response"
}

func main() {
    for i := 0; i < 100; i++ {
        _ = doRequest()
    }
    fmt.Println("done")
}`,
      hints: [
        'Always capture the cancel function.',
        'defer cancel() frees resources immediately.',
        'Not calling cancel leaks timers and goroutines.',
      ],
      concepts: ['context leak', 'defer cancel'],
    },
    {
      id: 'go-ctx-17',
      title: 'Fix Wrong Context Key',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the context value lookup that uses the wrong key type.',
      skeleton: `package main

import (
    "context"
    "fmt"
)

func main() {
    ctx := context.WithValue(context.Background(), "user", "alice")
    val := ctx.Value("user") // works but fragile
    fmt.Println(val)

    // Another package uses same string key -- collision!
    ctx2 := context.WithValue(ctx, "user", "bob")
    fmt.Println(ctx2.Value("user"))
}`,
      solution: `package main

import (
    "context"
    "fmt"
)

type userKey struct{}

func main() {
    ctx := context.WithValue(context.Background(), userKey{}, "alice")
    val := ctx.Value(userKey{})
    fmt.Println(val)

    ctx2 := context.WithValue(ctx, userKey{}, "bob")
    fmt.Println(ctx2.Value(userKey{}))
}`,
      hints: [
        'String keys can collide between packages.',
        'Use an unexported struct type as the key.',
        'This prevents external packages from accessing or overwriting.',
      ],
      concepts: ['context key type', 'unexported key', 'collision avoidance'],
    },
    {
      id: 'go-ctx-18',
      title: 'Fix Ignored Context',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix the function that ignores its context parameter.',
      skeleton: `package main

import (
    "context"
    "fmt"
    "time"
)

func slowOperation(ctx context.Context) (string, error) {
    // Bug: ignores ctx, always takes full duration
    time.Sleep(500 * time.Millisecond)
    return "result", nil
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    result, err := slowOperation(ctx)
    if err != nil {
        fmt.Println("error:", err)
        return
    }
    fmt.Println(result)
}`,
      solution: `package main

import (
    "context"
    "fmt"
    "time"
)

func slowOperation(ctx context.Context) (string, error) {
    select {
    case <-time.After(500 * time.Millisecond):
        return "result", nil
    case <-ctx.Done():
        return "", ctx.Err()
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    result, err := slowOperation(ctx)
    if err != nil {
        fmt.Println("error:", err)
        return
    }
    fmt.Println(result)
}`,
      hints: [
        'Use select to listen to both work completion and ctx.Done.',
        'Return ctx.Err() when the context is cancelled.',
        'This allows the function to respect the caller timeout.',
      ],
      concepts: ['context respect', 'select for cancellation'],
    },
    {
      id: 'go-ctx-19',
      title: 'Refactor Timeout to Context',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor a time.Sleep-based timeout to use context.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

func fetchData() (string, error) {
    done := make(chan string, 1)
    go func() {
        time.Sleep(200 * time.Millisecond)
        done <- "data"
    }()

    select {
    case result := <-done:
        return result, nil
    case <-time.After(100 * time.Millisecond):
        return "", fmt.Errorf("timeout")
    }
}

func main() {
    result, err := fetchData()
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(result)
}`,
      solution: `package main

import (
    "context"
    "fmt"
    "time"
)

func fetchData(ctx context.Context) (string, error) {
    done := make(chan string, 1)
    go func() {
        time.Sleep(200 * time.Millisecond)
        done <- "data"
    }()

    select {
    case result := <-done:
        return result, nil
    case <-ctx.Done():
        return "", ctx.Err()
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    result, err := fetchData(ctx)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(result)
}`,
      hints: [
        'Replace time.After with context.WithTimeout.',
        'Accept context.Context as the first parameter.',
        'Listen on ctx.Done() instead of time.After.',
      ],
      concepts: ['context timeout', 'refactoring', 'standard pattern'],
    },
    {
      id: 'go-ctx-20',
      title: 'Refactor Global Cancel to Context',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor a global stop channel to use context cancellation.',
      skeleton: `package main

import (
    "fmt"
    "sync"
    "time"
)

var stopCh = make(chan struct{})

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    for {
        select {
        case <-stopCh:
            fmt.Printf("worker %d stopped\\n", id)
            return
        default:
            time.Sleep(50 * time.Millisecond)
        }
    }
}

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 3; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }
    time.Sleep(150 * time.Millisecond)
    close(stopCh)
    wg.Wait()
}`,
      solution: `package main

import (
    "context"
    "fmt"
    "sync"
    "time"
)

func worker(ctx context.Context, id int, wg *sync.WaitGroup) {
    defer wg.Done()
    for {
        select {
        case <-ctx.Done():
            fmt.Printf("worker %d stopped\\n", id)
            return
        default:
            time.Sleep(50 * time.Millisecond)
        }
    }
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    var wg sync.WaitGroup

    for i := 0; i < 3; i++ {
        wg.Add(1)
        go worker(ctx, i, &wg)
    }

    time.Sleep(150 * time.Millisecond)
    cancel()
    wg.Wait()
}`,
      hints: [
        'Replace the global stop channel with context.WithCancel.',
        'Pass context as the first parameter to worker.',
        'cancel() replaces close(stopCh).',
      ],
      concepts: ['context cancellation', 'replace global state'],
    },
  ],
};
