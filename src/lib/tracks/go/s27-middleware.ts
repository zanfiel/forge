import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-mw',
  title: '27. Middleware',
  explanation: `## HTTP Middleware in Go

Middleware wraps handlers to add cross-cutting functionality like logging, authentication, and CORS. The pattern chains handlers together.

\`\`\`go
// Middleware signature: func(http.Handler) http.Handler
func LoggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}

// Chaining middleware
handler := LoggingMiddleware(AuthMiddleware(actualHandler))

// Using with ServeMux
mux := http.NewServeMux()
mux.HandleFunc("/api", apiHandler)
wrapped := LoggingMiddleware(mux)
http.ListenAndServe(":8080", wrapped)

// HandlerFunc adapter
type HandlerFunc func(ResponseWriter, *Request)
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {
    f(w, r)
}
\`\`\``,
  exercises: [
    {
      id: 'go-mw-1',
      title: 'Basic Middleware',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Complete a basic middleware that adds a response header.',
      skeleton: `package main

import "net/http"

func AddHeader(next http.Handler) http.__BLANK__ {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("X-Powered-By", "Go")
        next.ServeHTTP(w, r)
    })
}`,
      solution: `package main

import "net/http"

func AddHeader(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("X-Powered-By", "Go")
        next.ServeHTTP(w, r)
    })
}`,
      hints: [
        'Middleware takes http.Handler and returns http.Handler.',
        'http.HandlerFunc adapts a function to http.Handler.',
        'Call next.ServeHTTP to pass control to the next handler.',
      ],
      concepts: ['middleware pattern', 'http.Handler', 'http.HandlerFunc'],
    },
    {
      id: 'go-mw-2',
      title: 'Call Next Handler',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Pass control to the next handler in the middleware chain.',
      skeleton: `package main

import (
    "log"
    "net/http"
)

func Logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("Request: %s %s", r.Method, r.URL.Path)
        next.__BLANK__(w, r)
    })
}`,
      solution: `package main

import (
    "log"
    "net/http"
)

func Logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("Request: %s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}`,
      hints: [
        'ServeHTTP is the method on http.Handler interface.',
        'It passes the ResponseWriter and Request to the next handler.',
        'Without this call, the chain stops at this middleware.',
      ],
      concepts: ['ServeHTTP', 'handler chain'],
    },
    {
      id: 'go-mw-3',
      title: 'HandlerFunc Adapter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use http.HandlerFunc to convert a function to an http.Handler.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

func hello(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Hello!")
}

func main() {
    var handler http.Handler = http.__BLANK__(hello)
    http.ListenAndServe(":8080", handler)
}`,
      solution: `package main

import (
    "fmt"
    "net/http"
)

func hello(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Hello!")
}

func main() {
    var handler http.Handler = http.HandlerFunc(hello)
    http.ListenAndServe(":8080", handler)
}`,
      hints: [
        'http.HandlerFunc is a type that implements http.Handler.',
        'It converts a function signature to the Handler interface.',
        'The function must have (ResponseWriter, *Request) parameters.',
      ],
      concepts: ['http.HandlerFunc', 'adapter pattern'],
    },
    {
      id: 'go-mw-4',
      title: 'Timing Middleware',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write middleware that logs the time taken by each request.',
      skeleton: `package main

import (
    "log"
    "net/http"
    "time"
)

func Timer(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.__BLANK__()
        next.ServeHTTP(w, r)
        log.Printf("%s took %v", r.URL.Path, time.Since(start))
    })
}`,
      solution: `package main

import (
    "log"
    "net/http"
    "time"
)

func Timer(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s took %v", r.URL.Path, time.Since(start))
    })
}`,
      hints: [
        'Record time.Now() before calling next.',
        'time.Since(start) gives the elapsed duration.',
        'Code after next.ServeHTTP runs after the handler completes.',
      ],
      concepts: ['timing middleware', 'time.Now', 'time.Since'],
    },
    {
      id: 'go-mw-5',
      title: 'Auth Middleware',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write middleware that checks for a valid API key in the Authorization header.',
      skeleton: `package main

import "net/http"

// RequireAPIKey returns middleware that checks the Authorization header
// against the given validKey. Returns 401 if missing or invalid.
func RequireAPIKey(validKey string) func(http.Handler) http.Handler {
}`,
      solution: `package main

import "net/http"

func RequireAPIKey(validKey string) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            key := r.Header.Get("Authorization")
            if key != validKey {
                http.Error(w, "unauthorized", http.StatusUnauthorized)
                return
            }
            next.ServeHTTP(w, r)
        })
    }
}`,
      hints: [
        'Return a function that takes and returns http.Handler.',
        'Check the Authorization header against the valid key.',
        'Return 401 and stop the chain if invalid.',
      ],
      concepts: ['auth middleware', 'closure', 'parameterized middleware'],
    },
    {
      id: 'go-mw-6',
      title: 'CORS Middleware',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write middleware that adds CORS headers and handles preflight requests.',
      skeleton: `package main

import "net/http"

// CORS adds Access-Control-Allow-Origin: * and handles OPTIONS preflight
func CORS(next http.Handler) http.Handler {
}`,
      solution: `package main

import "net/http"

func CORS(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        if r.Method == http.MethodOptions {
            w.WriteHeader(http.StatusOK)
            return
        }
        next.ServeHTTP(w, r)
    })
}`,
      hints: [
        'Set CORS headers on every response.',
        'Handle OPTIONS preflight by returning 200 immediately.',
        'Do not call next.ServeHTTP for preflight requests.',
      ],
      concepts: ['CORS', 'preflight', 'OPTIONS method'],
    },
    {
      id: 'go-mw-7',
      title: 'Recovery Middleware',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write middleware that recovers from panics and returns a 500 error.',
      skeleton: `package main

import (
    "log"
    "net/http"
)

// Recover catches panics in handlers and returns 500
func Recover(next http.Handler) http.Handler {
}`,
      solution: `package main

import (
    "log"
    "net/http"
)

func Recover(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if err := recover(); err != nil {
                log.Printf("panic recovered: %v", err)
                http.Error(w, "internal server error", http.StatusInternalServerError)
            }
        }()
        next.ServeHTTP(w, r)
    })
}`,
      hints: [
        'Use defer with recover() to catch panics.',
        'Log the panic for debugging.',
        'Return 500 Internal Server Error to the client.',
      ],
      concepts: ['panic recovery', 'defer/recover', 'error handling'],
    },
    {
      id: 'go-mw-8',
      title: 'Chain Middleware',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that chains multiple middleware together.',
      skeleton: `package main

import "net/http"

type Middleware func(http.Handler) http.Handler

// Chain applies middleware in order: first middleware is outermost
func Chain(handler http.Handler, middlewares ...Middleware) http.Handler {
}`,
      solution: `package main

import "net/http"

type Middleware func(http.Handler) http.Handler

func Chain(handler http.Handler, middlewares ...Middleware) http.Handler {
    for i := len(middlewares) - 1; i >= 0; i-- {
        handler = middlewares[i](handler)
    }
    return handler
}`,
      hints: [
        'Apply middleware in reverse order so the first is outermost.',
        'Each middleware wraps the previous result.',
        'The first middleware in the list runs first on a request.',
      ],
      concepts: ['middleware chaining', 'variadic', 'reverse iteration'],
    },
    {
      id: 'go-mw-9',
      title: 'Request ID Middleware',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write middleware that adds a unique request ID to the context.',
      skeleton: `package main

import (
    "context"
    "fmt"
    "net/http"
)

type contextKey string
const requestIDKey contextKey = "requestID"

// RequestID adds a unique ID to the request context
// Use fmt.Sprintf("req-%d", counter) for simplicity
func RequestID(next http.Handler) http.Handler {
}`,
      solution: `package main

import (
    "context"
    "fmt"
    "net/http"
    "sync/atomic"
)

type contextKey string
const requestIDKey contextKey = "requestID"

var counter int64

func RequestID(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        id := fmt.Sprintf("req-%d", atomic.AddInt64(&counter, 1))
        ctx := context.WithValue(r.Context(), requestIDKey, id)
        w.Header().Set("X-Request-ID", id)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}`,
      hints: [
        'Use context.WithValue to attach the ID to the request context.',
        'r.WithContext creates a new request with the updated context.',
        'Use atomic for thread-safe counter increments.',
      ],
      concepts: ['context.WithValue', 'r.WithContext', 'request ID'],
    },
    {
      id: 'go-mw-10',
      title: 'Content-Type Middleware',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write middleware that sets the Content-Type header for all responses.',
      skeleton: `package main

import "net/http"

func JSONContentType(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().__BLANK__("Content-Type", "application/json")
        next.ServeHTTP(w, r)
    })
}`,
      solution: `package main

import "net/http"

func JSONContentType(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        next.ServeHTTP(w, r)
    })
}`,
      hints: [
        'Header().Set replaces any existing value for the key.',
        'Set headers before calling next.ServeHTTP.',
        'This ensures all responses have the correct Content-Type.',
      ],
      concepts: ['Header().Set', 'content type'],
    },
    {
      id: 'go-mw-11',
      title: 'Predict Middleware Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the order of middleware execution.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

func MW1(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Print("A")
        next.ServeHTTP(w, r)
        fmt.Print("D")
    })
}

func MW2(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Print("B")
        next.ServeHTTP(w, r)
        fmt.Print("C")
    })
}

// handler := MW1(MW2(finalHandler))
// finalHandler prints nothing
// What is the output when a request is processed?`,
      solution: `ABCD`,
      hints: [
        'MW1 wraps MW2, so MW1 runs first.',
        'MW1 prints A, calls MW2 which prints B.',
        'MW2 returns (prints C), then MW1 returns (prints D).',
      ],
      concepts: ['middleware order', 'call stack'],
    },
    {
      id: 'go-mw-12',
      title: 'Predict Short Circuit',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict what happens when middleware does not call next.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

func Block(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "blocked")
        // note: next.ServeHTTP is NOT called
    })
}

// What happens when a request hits Block middleware?
// A) The next handler runs normally
// B) The request gets "blocked" response and chain stops
// C) Runtime panic
// D) Infinite loop`,
      solution: `B) The request gets "blocked" response and chain stops`,
      hints: [
        'If next.ServeHTTP is not called, the chain stops.',
        'This is how auth middleware blocks unauthorized requests.',
        'The client receives only what this middleware writes.',
      ],
      concepts: ['short circuit', 'middleware blocking'],
    },
    {
      id: 'go-mw-13',
      title: 'Predict Panic Recovery',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Predict whether a recovery middleware catches panics in handlers.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

func Recover(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if r := recover(); r != nil {
                fmt.Fprintln(w, "recovered")
            }
        }()
        next.ServeHTTP(w, r)
    })
}

// handler panics with "oops"
// What does the client receive?
// A) Empty response
// B) "recovered"
// C) Connection reset
// D) "oops"`,
      solution: `B) "recovered"`,
      hints: [
        'defer with recover catches panics in the same goroutine.',
        'The panic in the handler is caught by the recovery middleware.',
        'The client receives "recovered" with a 200 status.',
      ],
      concepts: ['panic recovery', 'defer/recover'],
    },
    {
      id: 'go-mw-14',
      title: 'Fix Missing Return After Auth',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix auth middleware that calls next even when authentication fails.',
      skeleton: `package main

import "net/http"

func Auth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if token == "" {
            http.Error(w, "unauthorized", http.StatusUnauthorized)
        }
        next.ServeHTTP(w, r)
    })
}`,
      solution: `package main

import "net/http"

func Auth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if token == "" {
            http.Error(w, "unauthorized", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}`,
      hints: [
        'Without return, next.ServeHTTP is called even after sending 401.',
        'This means unauthorized requests still reach the handler.',
        'Add return to stop execution after the error response.',
      ],
      concepts: ['early return', 'auth middleware', 'short circuit'],
    },
    {
      id: 'go-mw-15',
      title: 'Fix Middleware Wrapping Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix middleware applied in wrong order so logging runs before auth.',
      skeleton: `package main

import "net/http"

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/api", apiHandler)

    // Want: Log -> Auth -> Handler
    // But this applies Auth first, then Log
    wrapped := Auth(Log(mux))
    http.ListenAndServe(":8080", wrapped)
}`,
      solution: `package main

import "net/http"

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/api", apiHandler)

    // Log -> Auth -> Handler
    // Outermost middleware runs first
    wrapped := Log(Auth(mux))
    http.ListenAndServe(":8080", wrapped)
}`,
      hints: [
        'The outermost middleware runs first.',
        'Log(Auth(handler)) means: Log runs, then Auth, then handler.',
        'Auth(Log(handler)) means: Auth runs first, not Log.',
      ],
      concepts: ['middleware order', 'wrapping direction'],
    },
    {
      id: 'go-mw-16',
      title: 'Fix Response Writer Race',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix middleware that modifies headers after the response has been sent.',
      skeleton: `package main

import (
    "net/http"
    "time"
)

func Timer(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r) // handler writes response
        // BUG: headers already sent!
        w.Header().Set("X-Duration", time.Since(start).String())
    })
}`,
      solution: `package main

import (
    "net/http"
    "time"
)

func Timer(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        w.Header().Set("X-Start", start.Format(time.RFC3339))
        next.ServeHTTP(w, r)
        // Log duration instead of trying to set headers
        // Headers cannot be modified after Write is called
    })
}`,
      hints: [
        'Headers must be set before any call to Write or WriteHeader.',
        'After next.ServeHTTP, the response may already be sent.',
        'Either set headers before calling next, or log instead of header.',
      ],
      concepts: ['response lifecycle', 'header timing', 'Write order'],
    },
    {
      id: 'go-mw-17',
      title: 'Write Rate Limiting Middleware',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write simple rate limiting middleware using a token bucket.',
      skeleton: `package main

import (
    "net/http"
    "sync"
    "time"
)

// RateLimit returns middleware that allows maxReqs requests per second
func RateLimit(maxReqs int) func(http.Handler) http.Handler {
}`,
      solution: `package main

import (
    "net/http"
    "sync"
    "time"
)

func RateLimit(maxReqs int) func(http.Handler) http.Handler {
    var mu sync.Mutex
    tokens := maxReqs
    go func() {
        ticker := time.NewTicker(time.Second / time.Duration(maxReqs))
        defer ticker.Stop()
        for range ticker.C {
            mu.Lock()
            if tokens < maxReqs {
                tokens++
            }
            mu.Unlock()
        }
    }()
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            mu.Lock()
            if tokens <= 0 {
                mu.Unlock()
                http.Error(w, "rate limit exceeded", http.StatusTooManyRequests)
                return
            }
            tokens--
            mu.Unlock()
            next.ServeHTTP(w, r)
        })
    }
}`,
      hints: [
        'Use a token counter protected by a mutex.',
        'Refill tokens periodically with a ticker.',
        'Return 429 Too Many Requests when tokens are exhausted.',
      ],
      concepts: ['rate limiting', 'token bucket', 'sync.Mutex'],
    },
    {
      id: 'go-mw-18',
      title: 'Write Response Wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a response wrapper that captures the status code for logging.',
      skeleton: `package main

import "net/http"

// statusWriter wraps ResponseWriter to capture the status code
type statusWriter struct {
    http.ResponseWriter
    status int
}

// Implement WriteHeader to capture the status code
// Then write StatusLogger middleware that logs the status after response`,
      solution: `package main

import (
    "log"
    "net/http"
)

type statusWriter struct {
    http.ResponseWriter
    status int
}

func (sw *statusWriter) WriteHeader(code int) {
    sw.status = code
    sw.ResponseWriter.WriteHeader(code)
}

func StatusLogger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        sw := &statusWriter{ResponseWriter: w, status: http.StatusOK}
        next.ServeHTTP(sw, r)
        log.Printf("%s %s -> %d", r.Method, r.URL.Path, sw.status)
    })
}`,
      hints: [
        'Embed http.ResponseWriter and override WriteHeader.',
        'Default status is 200 if WriteHeader is never called.',
        'Pass the wrapper to next.ServeHTTP instead of w.',
      ],
      concepts: ['response wrapper', 'status capture', 'embedding'],
    },
    {
      id: 'go-mw-19',
      title: 'Refactor Inline Checks to Middleware',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Extract repeated auth checks from handlers into middleware.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
)

func usersHandler(w http.ResponseWriter, r *http.Request) {
    if r.Header.Get("Authorization") == "" {
        http.Error(w, "unauthorized", http.StatusUnauthorized)
        return
    }
    fmt.Fprintln(w, "users list")
}

func ordersHandler(w http.ResponseWriter, r *http.Request) {
    if r.Header.Get("Authorization") == "" {
        http.Error(w, "unauthorized", http.StatusUnauthorized)
        return
    }
    fmt.Fprintln(w, "orders list")
}`,
      solution: `package main

import (
    "fmt"
    "net/http"
)

func RequireAuth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        if r.Header.Get("Authorization") == "" {
            http.Error(w, "unauthorized", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}

func usersHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "users list")
}

func ordersHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "orders list")
}

// Usage: RequireAuth(http.HandlerFunc(usersHandler))`,
      hints: [
        'Extract the auth check into a middleware function.',
        'Handlers become simpler without auth logic.',
        'Apply the middleware to any handler that needs auth.',
      ],
      concepts: ['middleware extraction', 'DRY', 'separation of concerns'],
    },
    {
      id: 'go-mw-20',
      title: 'Refactor to Middleware Chain',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor nested middleware calls into a clean chain function.',
      skeleton: `package main

import "net/http"

func main() {
    handler := http.HandlerFunc(apiHandler)
    // Deeply nested, hard to read
    wrapped := Logger(CORS(Auth(RateLimit(Recover(handler)))))
    http.ListenAndServe(":8080", wrapped)
}`,
      solution: `package main

import "net/http"

func Chain(h http.Handler, mws ...func(http.Handler) http.Handler) http.Handler {
    for i := len(mws) - 1; i >= 0; i-- {
        h = mws[i](h)
    }
    return h
}

func main() {
    handler := http.HandlerFunc(apiHandler)
    wrapped := Chain(handler,
        Logger,
        CORS,
        Auth,
        RateLimit,
        Recover,
    )
    http.ListenAndServe(":8080", wrapped)
}`,
      hints: [
        'Create a Chain function that applies middleware in order.',
        'Iterate in reverse so the first middleware is outermost.',
        'This is much more readable than deep nesting.',
      ],
      concepts: ['middleware chain', 'variadic functions', 'readability'],
    },
  ],
};
