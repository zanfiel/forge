import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
	id: 'go-gshut',
	title: '46. Graceful Shutdown',
	explanation: `## Graceful Shutdown in Go

Graceful shutdown ensures in-flight requests complete before a server stops.

### Signal Handling

\`\`\`go
import (
    "os"
    "os/signal"
    "syscall"
)

quit := make(chan os.Signal, 1)
signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
<-quit // blocks until signal received
\`\`\`

### HTTP Server Shutdown

\`\`\`go
srv := &http.Server{Addr: ":8080", Handler: mux}

go func() {
    if err := srv.ListenAndServe(); err != http.ErrServerClosed {
        log.Fatal(err)
    }
}()

// Wait for interrupt
quit := make(chan os.Signal, 1)
signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
<-quit

// Give in-flight requests 30 seconds
ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
defer cancel()
if err := srv.Shutdown(ctx); err != nil {
    log.Fatal("forced shutdown:", err)
}
\`\`\`

### Worker Shutdown with Context

\`\`\`go
ctx, cancel := context.WithCancel(context.Background())

var wg sync.WaitGroup
for i := 0; i < workers; i++ {
    wg.Add(1)
    go func() {
        defer wg.Done()
        for {
            select {
            case <-ctx.Done():
                return
            case job := <-jobs:
                process(job)
            }
        }
    }()
}

// On shutdown signal:
cancel()     // tell workers to stop
wg.Wait()    // wait for them to finish
\`\`\`

### Cleanup Functions

\`\`\`go
type App struct {
    cleanups []func()
}

func (a *App) OnShutdown(fn func()) {
    a.cleanups = append(a.cleanups, fn)
}

func (a *App) Shutdown() {
    for i := len(a.cleanups) - 1; i >= 0; i-- {
        a.cleanups[i]() // LIFO order
    }
}
\`\`\``,
	exercises: [
		{
			id: 'go-gshut-1',
			title: 'Signal Notify Setup',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Set up signal notification for graceful shutdown.',
			skeleton: `package main

import (
    "fmt"
    "os"
    "os/signal"
    "syscall"
)

func main() {
    quit := make(chan os.Signal, 1)
    __BLANK__

    fmt.Println("waiting for signal...")
    sig := <-quit
    fmt.Println("received:", sig)
}`,
			solution: `package main

import (
    "fmt"
    "os"
    "os/signal"
    "syscall"
)

func main() {
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

    fmt.Println("waiting for signal...")
    sig := <-quit
    fmt.Println("received:", sig)
}`,
			hints: [
				'signal.Notify registers the channel to receive signals.',
				'SIGINT (Ctrl+C) and SIGTERM are the standard shutdown signals.',
				'Replace __BLANK__ with signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)'
			],
			concepts: ['signal-handling', 'os-signal', 'graceful-shutdown']
		},
		{
			id: 'go-gshut-2',
			title: 'HTTP Server Shutdown',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Call Shutdown on an HTTP server with a timeout context.',
			skeleton: `package main

import (
    "context"
    "fmt"
    "net/http"
    "time"
)

func main() {
    srv := &http.Server{Addr: ":8080"}

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    err := __BLANK__
    if err != nil {
        fmt.Println("shutdown error:", err)
    } else {
        fmt.Println("shutdown complete")
    }
}`,
			solution: `package main

import (
    "context"
    "fmt"
    "net/http"
    "time"
)

func main() {
    srv := &http.Server{Addr: ":8080"}

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    err := srv.Shutdown(ctx)
    if err != nil {
        fmt.Println("shutdown error:", err)
    } else {
        fmt.Println("shutdown complete")
    }
}`,
			hints: [
				'http.Server has a Shutdown method that takes a context.',
				'It waits for active connections to finish.',
				'Replace __BLANK__ with srv.Shutdown(ctx)'
			],
			concepts: ['http-server', 'shutdown', 'context-timeout']
		},
		{
			id: 'go-gshut-3',
			title: 'Context Cancel for Workers',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Use context cancellation to stop workers.',
			skeleton: `package main

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
        case __BLANK__:
            fmt.Printf("worker %d stopping\\n", id)
            return
        default:
            fmt.Printf("worker %d working\\n", id)
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
    fmt.Println("all workers stopped")
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
            fmt.Printf("worker %d stopping\\n", id)
            return
        default:
            fmt.Printf("worker %d working\\n", id)
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
    fmt.Println("all workers stopped")
}`,
			hints: [
				'ctx.Done() returns a channel that closes on cancel.',
				'Use it in a select case to detect shutdown.',
				'Replace __BLANK__ with <-ctx.Done()'
			],
			concepts: ['context-cancel', 'worker-shutdown', 'select']
		},
		{
			id: 'go-gshut-4',
			title: 'Drain Channel Before Exit',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Drain remaining items from a channel during shutdown.',
			skeleton: `package main

import "fmt"

func drain(ch <-chan int) []int {
    var remaining []int
    for {
        select {
        case v, ok := <-ch:
            if !ok {
                return remaining
            }
            remaining = __BLANK__
        default:
            return remaining
        }
    }
}

func main() {
    ch := make(chan int, 5)
    ch <- 1
    ch <- 2
    ch <- 3

    remaining := drain(ch)
    fmt.Println("drained:", remaining)
}`,
			solution: `package main

import "fmt"

func drain(ch <-chan int) []int {
    var remaining []int
    for {
        select {
        case v, ok := <-ch:
            if !ok {
                return remaining
            }
            remaining = append(remaining, v)
        default:
            return remaining
        }
    }
}

func main() {
    ch := make(chan int, 5)
    ch <- 1
    ch <- 2
    ch <- 3

    remaining := drain(ch)
    fmt.Println("drained:", remaining)
}`,
			hints: [
				'Append each drained value to the remaining slice.',
				'The default case returns when the channel is empty.',
				'Replace __BLANK__ with append(remaining, v)'
			],
			concepts: ['channel-draining', 'non-blocking-receive', 'shutdown']
		},
		{
			id: 'go-gshut-5',
			title: 'ErrServerClosed Check',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Distinguish normal shutdown from unexpected server errors.',
			skeleton: `package main

import (
    "fmt"
    "net/http"
)

func main() {
    srv := &http.Server{Addr: ":0"}

    err := srv.ListenAndServe()
    if err != nil && __BLANK__ {
        fmt.Println("unexpected error:", err)
    } else {
        fmt.Println("server stopped gracefully")
    }
}`,
			solution: `package main

import (
    "fmt"
    "net/http"
)

func main() {
    srv := &http.Server{Addr: ":0"}

    err := srv.ListenAndServe()
    if err != nil && err != http.ErrServerClosed {
        fmt.Println("unexpected error:", err)
    } else {
        fmt.Println("server stopped gracefully")
    }
}`,
			hints: [
				'http.ErrServerClosed is returned when Shutdown is called.',
				'This is the expected error during graceful shutdown.',
				'Replace __BLANK__ with err != http.ErrServerClosed'
			],
			concepts: ['err-server-closed', 'error-handling', 'http-server']
		},
		{
			id: 'go-gshut-6',
			title: 'Shutdown with Cleanup',
			type: 'fill-blank',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Register and execute cleanup functions in LIFO order.',
			skeleton: `package main

import "fmt"

type App struct {
    cleanups []func()
}

func (a *App) OnShutdown(fn func()) {
    a.cleanups = append(a.cleanups, fn)
}

func (a *App) Shutdown() {
    for i := __BLANK__; i >= 0; i-- {
        a.cleanups[i]()
    }
}

func main() {
    app := &App{}
    app.OnShutdown(func() { fmt.Println("closed database") })
    app.OnShutdown(func() { fmt.Println("flushed cache") })
    app.OnShutdown(func() { fmt.Println("saved state") })

    app.Shutdown()
}`,
			solution: `package main

import "fmt"

type App struct {
    cleanups []func()
}

func (a *App) OnShutdown(fn func()) {
    a.cleanups = append(a.cleanups, fn)
}

func (a *App) Shutdown() {
    for i := len(a.cleanups) - 1; i >= 0; i-- {
        a.cleanups[i]()
    }
}

func main() {
    app := &App{}
    app.OnShutdown(func() { fmt.Println("closed database") })
    app.OnShutdown(func() { fmt.Println("flushed cache") })
    app.OnShutdown(func() { fmt.Println("saved state") })

    app.Shutdown()
}`,
			hints: [
				'LIFO order means last registered runs first.',
				'Start from the end of the slice.',
				'Replace __BLANK__ with len(a.cleanups) - 1'
			],
			concepts: ['cleanup', 'lifo', 'shutdown-hooks']
		},
		{
			id: 'go-gshut-7',
			title: 'Graceful HTTP Server',
			type: 'write-function',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Write a function that starts an HTTP server with graceful shutdown support.',
			skeleton: `package main

import (
    "context"
    "fmt"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
)

// serve starts the server and shuts it down gracefully on SIGINT/SIGTERM.
// Returns when shutdown is complete.
func serve(addr string, handler http.Handler) error {
    // TODO: implement
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "hello")
    })

    if err := serve(":8080", mux); err != nil {
        fmt.Println("error:", err)
    }
    fmt.Println("server stopped")
}`,
			solution: `package main

import (
    "context"
    "fmt"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
)

// serve starts the server and shuts it down gracefully on SIGINT/SIGTERM.
// Returns when shutdown is complete.
func serve(addr string, handler http.Handler) error {
    srv := &http.Server{Addr: addr, Handler: handler}

    errCh := make(chan error, 1)
    go func() {
        if err := srv.ListenAndServe(); err != http.ErrServerClosed {
            errCh <- err
        }
        close(errCh)
    }()

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

    select {
    case err := <-errCh:
        return err
    case <-quit:
    }

    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    return srv.Shutdown(ctx)
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "hello")
    })

    if err := serve(":8080", mux); err != nil {
        fmt.Println("error:", err)
    }
    fmt.Println("server stopped")
}`,
			hints: [
				'Start the server in a goroutine.',
				'Wait for either a signal or a server error.',
				'Call srv.Shutdown(ctx) with a timeout context.'
			],
			concepts: ['http-server', 'signal-handling', 'graceful-shutdown']
		},
		{
			id: 'go-gshut-8',
			title: 'Worker Pool with Drain',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Write a worker pool that drains remaining jobs before stopping.',
			skeleton: `package main

import (
    "context"
    "fmt"
    "sync"
)

// runWorkers starts numWorkers goroutines. When ctx is cancelled,
// workers finish their current job and drain any remaining jobs
// from the channel before stopping.
func runWorkers(ctx context.Context, numWorkers int, jobs <-chan int) []int {
    // TODO: implement - return all processed results
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())

    jobs := make(chan int, 10)
    for i := 1; i <= 10; i++ {
        jobs <- i
    }
    close(jobs)
    cancel() // cancel immediately

    results := runWorkers(ctx, 3, jobs)
    fmt.Println("processed:", len(results), "jobs")
}`,
			solution: `package main

import (
    "context"
    "fmt"
    "sync"
)

// runWorkers starts numWorkers goroutines. When ctx is cancelled,
// workers finish their current job and drain any remaining jobs
// from the channel before stopping.
func runWorkers(ctx context.Context, numWorkers int, jobs <-chan int) []int {
    var mu sync.Mutex
    var results []int
    var wg sync.WaitGroup

    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for j := range jobs {
                mu.Lock()
                results = append(results, j*2)
                mu.Unlock()
            }
        }()
    }

    wg.Wait()
    return results
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())

    jobs := make(chan int, 10)
    for i := 1; i <= 10; i++ {
        jobs <- i
    }
    close(jobs)
    cancel() // cancel immediately

    results := runWorkers(ctx, 3, jobs)
    fmt.Println("processed:", len(results), "jobs")
}`,
			hints: [
				'Drain by continuing to range over jobs even after ctx is done.',
				'Since jobs is closed, range will complete naturally.',
				'Use mutex to protect the shared results slice.'
			],
			concepts: ['drain', 'worker-pool', 'graceful-shutdown']
		},
		{
			id: 'go-gshut-9',
			title: 'Shutdown Coordinator',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Write a shutdown coordinator that manages multiple cleanup tasks.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

type ShutdownManager struct {
    mu       sync.Mutex
    hooks    []func() error
}

// Register adds a cleanup function to be called during shutdown.
func (sm *ShutdownManager) Register(fn func() error) {
    // TODO: implement
}

// Shutdown executes all registered hooks in reverse order.
// Returns the first error encountered (but runs all hooks).
func (sm *ShutdownManager) Shutdown() error {
    // TODO: implement
}

func main() {
    sm := &ShutdownManager{}
    sm.Register(func() error { fmt.Println("closing DB"); return nil })
    sm.Register(func() error { fmt.Println("flushing logs"); return nil })
    sm.Register(func() error { fmt.Println("saving state"); return nil })

    if err := sm.Shutdown(); err != nil {
        fmt.Println("shutdown error:", err)
    }
    fmt.Println("shutdown complete")
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

type ShutdownManager struct {
    mu       sync.Mutex
    hooks    []func() error
}

// Register adds a cleanup function to be called during shutdown.
func (sm *ShutdownManager) Register(fn func() error) {
    sm.mu.Lock()
    defer sm.mu.Unlock()
    sm.hooks = append(sm.hooks, fn)
}

// Shutdown executes all registered hooks in reverse order.
// Returns the first error encountered (but runs all hooks).
func (sm *ShutdownManager) Shutdown() error {
    sm.mu.Lock()
    hooks := make([]func() error, len(sm.hooks))
    copy(hooks, sm.hooks)
    sm.mu.Unlock()

    var firstErr error
    for i := len(hooks) - 1; i >= 0; i-- {
        if err := hooks[i](); err != nil && firstErr == nil {
            firstErr = err
        }
    }
    return firstErr
}

func main() {
    sm := &ShutdownManager{}
    sm.Register(func() error { fmt.Println("closing DB"); return nil })
    sm.Register(func() error { fmt.Println("flushing logs"); return nil })
    sm.Register(func() error { fmt.Println("saving state"); return nil })

    if err := sm.Shutdown(); err != nil {
        fmt.Println("shutdown error:", err)
    }
    fmt.Println("shutdown complete")
}`,
			hints: [
				'Register appends to the hooks slice with mutex protection.',
				'Shutdown iterates in reverse (LIFO) order.',
				'Capture the first error but continue running all hooks.'
			],
			concepts: ['shutdown-hooks', 'lifo', 'error-collection']
		},
		{
			id: 'go-gshut-10',
			title: 'Graceful with Timeout Fallback',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Implement shutdown that falls back to force-stop after timeout.',
			skeleton: `package main

import (
    "context"
    "fmt"
    "time"
)

// shutdownWithTimeout attempts graceful shutdown via the graceful function.
// If it takes longer than timeout, calls forceFn as a fallback.
// Returns an error if shutdown failed.
func shutdownWithTimeout(
    timeout time.Duration,
    gracefulFn func(context.Context) error,
    forceFn func(),
) error {
    // TODO: implement
}

func main() {
    err := shutdownWithTimeout(
        100*time.Millisecond,
        func(ctx context.Context) error {
            fmt.Println("graceful shutdown started")
            select {
            case <-time.After(50 * time.Millisecond):
                fmt.Println("graceful shutdown complete")
                return nil
            case <-ctx.Done():
                return ctx.Err()
            }
        },
        func() {
            fmt.Println("force shutdown!")
        },
    )

    if err != nil {
        fmt.Println("error:", err)
    }
}`,
			solution: `package main

import (
    "context"
    "fmt"
    "time"
)

// shutdownWithTimeout attempts graceful shutdown via the graceful function.
// If it takes longer than timeout, calls forceFn as a fallback.
// Returns an error if shutdown failed.
func shutdownWithTimeout(
    timeout time.Duration,
    gracefulFn func(context.Context) error,
    forceFn func(),
) error {
    ctx, cancel := context.WithTimeout(context.Background(), timeout)
    defer cancel()

    errCh := make(chan error, 1)
    go func() {
        errCh <- gracefulFn(ctx)
    }()

    select {
    case err := <-errCh:
        return err
    case <-ctx.Done():
        forceFn()
        return ctx.Err()
    }
}

func main() {
    err := shutdownWithTimeout(
        100*time.Millisecond,
        func(ctx context.Context) error {
            fmt.Println("graceful shutdown started")
            select {
            case <-time.After(50 * time.Millisecond):
                fmt.Println("graceful shutdown complete")
                return nil
            case <-ctx.Done():
                return ctx.Err()
            }
        },
        func() {
            fmt.Println("force shutdown!")
        },
    )

    if err != nil {
        fmt.Println("error:", err)
    }
}`,
			hints: [
				'Create a timeout context for the graceful function.',
				'Run gracefulFn in a goroutine to race against timeout.',
				'If context expires, call forceFn as fallback.'
			],
			concepts: ['timeout-fallback', 'graceful-shutdown', 'context']
		},
		{
			id: 'go-gshut-11',
			title: 'Multi-Service Shutdown',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Shut down multiple services concurrently with a shared deadline.',
			skeleton: `package main

import (
    "context"
    "fmt"
    "sync"
    "time"
)

type Service interface {
    Name() string
    Shutdown(ctx context.Context) error
}

// shutdownAll shuts down all services concurrently within the deadline.
// Returns all errors encountered.
func shutdownAll(ctx context.Context, services []Service) []error {
    // TODO: implement
}

type mockService struct {
    name     string
    duration time.Duration
}

func (s *mockService) Name() string { return s.name }
func (s *mockService) Shutdown(ctx context.Context) error {
    select {
    case <-time.After(s.duration):
        return nil
    case <-ctx.Done():
        return fmt.Errorf("%s: %w", s.name, ctx.Err())
    }
}

func main() {
    services := []Service{
        &mockService{"db", 10 * time.Millisecond},
        &mockService{"cache", 20 * time.Millisecond},
        &mockService{"queue", 15 * time.Millisecond},
    }

    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    errs := shutdownAll(ctx, services)
    if len(errs) > 0 {
        for _, err := range errs {
            fmt.Println("error:", err)
        }
    } else {
        fmt.Println("all services stopped")
    }
}`,
			solution: `package main

import (
    "context"
    "fmt"
    "sync"
    "time"
)

type Service interface {
    Name() string
    Shutdown(ctx context.Context) error
}

// shutdownAll shuts down all services concurrently within the deadline.
// Returns all errors encountered.
func shutdownAll(ctx context.Context, services []Service) []error {
    var mu sync.Mutex
    var errs []error
    var wg sync.WaitGroup

    for _, svc := range services {
        wg.Add(1)
        go func(s Service) {
            defer wg.Done()
            if err := s.Shutdown(ctx); err != nil {
                mu.Lock()
                errs = append(errs, err)
                mu.Unlock()
            }
        }(svc)
    }

    wg.Wait()
    return errs
}

type mockService struct {
    name     string
    duration time.Duration
}

func (s *mockService) Name() string { return s.name }
func (s *mockService) Shutdown(ctx context.Context) error {
    select {
    case <-time.After(s.duration):
        return nil
    case <-ctx.Done():
        return fmt.Errorf("%s: %w", s.name, ctx.Err())
    }
}

func main() {
    services := []Service{
        &mockService{"db", 10 * time.Millisecond},
        &mockService{"cache", 20 * time.Millisecond},
        &mockService{"queue", 15 * time.Millisecond},
    }

    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    errs := shutdownAll(ctx, services)
    if len(errs) > 0 {
        for _, err := range errs {
            fmt.Println("error:", err)
        }
    } else {
        fmt.Println("all services stopped")
    }
}`,
			hints: [
				'Shut down services in parallel to minimize total time.',
				'Pass the shared context to each service for the deadline.',
				'Collect errors with a mutex-protected slice.'
			],
			concepts: ['concurrent-shutdown', 'interface', 'error-collection']
		},
		{
			id: 'go-gshut-12',
			title: 'Shutdown Ordering with Dependencies',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Implement ordered shutdown where some services depend on others.',
			skeleton: `package main

import "fmt"

type Shutdownable struct {
    Name    string
    StopFn  func()
    DependsOn []string
}

// orderedShutdown shuts down items in dependency order.
// Items with no remaining dependents shut down first.
func orderedShutdown(items []Shutdownable) {
    // TODO: implement - topological shutdown order
}

func main() {
    items := []Shutdownable{
        {Name: "api", StopFn: func() { fmt.Println("stopped api") }, DependsOn: []string{"db", "cache"}},
        {Name: "db", StopFn: func() { fmt.Println("stopped db") }, DependsOn: nil},
        {Name: "cache", StopFn: func() { fmt.Println("stopped cache") }, DependsOn: nil},
        {Name: "worker", StopFn: func() { fmt.Println("stopped worker") }, DependsOn: []string{"db"}},
    }

    orderedShutdown(items)
}`,
			solution: `package main

import "fmt"

type Shutdownable struct {
    Name    string
    StopFn  func()
    DependsOn []string
}

// orderedShutdown shuts down items in dependency order.
// Items with no remaining dependents shut down first.
func orderedShutdown(items []Shutdownable) {
    // Build lookup map
    byName := make(map[string]*Shutdownable)
    for i := range items {
        byName[items[i].Name] = &items[i]
    }

    // Build reverse dependency map: who depends on me?
    dependents := make(map[string]map[string]bool)
    for _, item := range items {
        for _, dep := range item.DependsOn {
            if dependents[dep] == nil {
                dependents[dep] = make(map[string]bool)
            }
            dependents[dep][item.Name] = true
        }
    }

    stopped := make(map[string]bool)
    for len(stopped) < len(items) {
        for _, item := range items {
            if stopped[item.Name] {
                continue
            }
            // Check: all things that depend on me must be stopped
            canStop := true
            for dep := range dependents[item.Name] {
                if !stopped[dep] {
                    canStop = false
                    break
                }
            }
            if canStop {
                item.StopFn()
                stopped[item.Name] = true
            }
        }
    }
}

func main() {
    items := []Shutdownable{
        {Name: "api", StopFn: func() { fmt.Println("stopped api") }, DependsOn: []string{"db", "cache"}},
        {Name: "db", StopFn: func() { fmt.Println("stopped db") }, DependsOn: nil},
        {Name: "cache", StopFn: func() { fmt.Println("stopped cache") }, DependsOn: nil},
        {Name: "worker", StopFn: func() { fmt.Println("stopped worker") }, DependsOn: []string{"db"}},
    }

    orderedShutdown(items)
}`,
			hints: [
				'Build a reverse dependency map: who depends on each item.',
				'An item can stop only when all its dependents have stopped.',
				'Repeat until all items are stopped (topological sort).'
			],
			concepts: ['dependency-order', 'topological-sort', 'shutdown']
		},
		{
			id: 'go-gshut-13',
			title: 'Signal Channel Not Buffered',
			type: 'fix-bug',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Fix the signal channel that may miss signals.',
			skeleton: `package main

import (
    "fmt"
    "os"
    "os/signal"
    "syscall"
)

func main() {
    quit := make(chan os.Signal)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

    fmt.Println("waiting for signal...")
    <-quit
    fmt.Println("shutting down")
}`,
			solution: `package main

import (
    "fmt"
    "os"
    "os/signal"
    "syscall"
)

func main() {
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

    fmt.Println("waiting for signal...")
    <-quit
    fmt.Println("shutting down")
}`,
			hints: [
				'signal.Notify sends on the channel; if unbuffered it may miss signals.',
				'Use a buffered channel with capacity of at least 1.',
				'Change make(chan os.Signal) to make(chan os.Signal, 1)'
			],
			concepts: ['signal-notify', 'buffered-channel', 'missed-signal']
		},
		{
			id: 'go-gshut-14',
			title: 'Shutdown Before Listen',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the server that calls Shutdown before it starts listening.',
			skeleton: `package main

import (
    "context"
    "fmt"
    "net/http"
    "time"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "hello")
    })

    srv := &http.Server{Addr: ":8080", Handler: mux}

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    srv.Shutdown(ctx)

    if err := srv.ListenAndServe(); err != nil {
        fmt.Println("error:", err)
    }
}`,
			solution: `package main

import (
    "context"
    "fmt"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "hello")
    })

    srv := &http.Server{Addr: ":8080", Handler: mux}

    go func() {
        if err := srv.ListenAndServe(); err != http.ErrServerClosed {
            fmt.Println("error:", err)
        }
    }()

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    if err := srv.Shutdown(ctx); err != nil {
        fmt.Println("shutdown error:", err)
    }
}`,
			hints: [
				'Shutdown must be called after the server starts.',
				'Start the server in a goroutine first.',
				'Wait for a signal before calling Shutdown.'
			],
			concepts: ['server-lifecycle', 'ordering', 'graceful-shutdown']
		},
		{
			id: 'go-gshut-15',
			title: 'WaitGroup Add After Wait',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the race where wg.Add is called after wg.Wait starts.',
			skeleton: `package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {
    var wg sync.WaitGroup

    go func() {
        for i := 0; i < 5; i++ {
            wg.Add(1)
            go func(n int) {
                defer wg.Done()
                time.Sleep(10 * time.Millisecond)
                fmt.Println("task", n)
            }(i)
            time.Sleep(5 * time.Millisecond)
        }
    }()

    wg.Wait()
    fmt.Println("all done")
}`,
			solution: `package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {
    var wg sync.WaitGroup

    wg.Add(5)
    go func() {
        for i := 0; i < 5; i++ {
            go func(n int) {
                defer wg.Done()
                time.Sleep(10 * time.Millisecond)
                fmt.Println("task", n)
            }(i)
            time.Sleep(5 * time.Millisecond)
        }
    }()

    wg.Wait()
    fmt.Println("all done")
}`,
			hints: [
				'wg.Wait may return before all wg.Add calls happen.',
				'Add the full count before starting Wait.',
				'Move wg.Add(5) before the goroutine launch.'
			],
			concepts: ['waitgroup-race', 'synchronization', 'ordering']
		},
		{
			id: 'go-gshut-16',
			title: 'Predict Cleanup Order',
			type: 'predict-output',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Predict the LIFO order of cleanup functions.',
			skeleton: `package main

import "fmt"

func main() {
    cleanups := []func(){
        func() { fmt.Println("A") },
        func() { fmt.Println("B") },
        func() { fmt.Println("C") },
    }

    for i := len(cleanups) - 1; i >= 0; i-- {
        cleanups[i]()
    }
}`,
			solution: `C
B
A`,
			hints: [
				'LIFO order means last in, first out.',
				'The loop starts from the end.',
				'C was added last but runs first.'
			],
			concepts: ['lifo', 'cleanup-order', 'reverse-iteration']
		},
		{
			id: 'go-gshut-17',
			title: 'Predict ErrServerClosed',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict the error type after server shutdown.',
			skeleton: `package main

import (
    "fmt"
    "net/http"
)

func main() {
    err := http.ErrServerClosed
    fmt.Println(err.Error())
    fmt.Println(err == http.ErrServerClosed)
}`,
			solution: `http: Server closed
true`,
			hints: [
				'http.ErrServerClosed is a sentinel error.',
				'Its Error() message is "http: Server closed".',
				'Comparing with == returns true for the same error value.'
			],
			concepts: ['sentinel-error', 'error-comparison', 'http-server']
		},
		{
			id: 'go-gshut-18',
			title: 'Predict Context Deadline',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict context behavior when deadline is exceeded.',
			skeleton: `package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 1*time.Nanosecond)
    defer cancel()

    time.Sleep(1 * time.Millisecond) // ensure timeout passes

    select {
    case <-ctx.Done():
        fmt.Println(ctx.Err())
    default:
        fmt.Println("still active")
    }
}`,
			solution: `context deadline exceeded`,
			hints: [
				'1 nanosecond timeout expires almost immediately.',
				'After sleep, ctx.Done() is already closed.',
				'ctx.Err() returns context.DeadlineExceeded.'
			],
			concepts: ['context-deadline', 'timeout', 'error']
		},
		{
			id: 'go-gshut-19',
			title: 'Refactor Panic Recovery to Graceful',
			type: 'refactor',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Refactor panic-based shutdown to proper signal handling.',
			skeleton: `package main

import (
    "fmt"
    "os"
)

func cleanup() {
    fmt.Println("cleaning up...")
}

func main() {
    defer func() {
        if r := recover(); r != nil {
            cleanup()
            fmt.Println("recovered from panic:", r)
            os.Exit(1)
        }
    }()

    // Simulate work
    fmt.Println("running")

    // This is how shutdown is triggered - bad practice!
    panic("shutdown requested")
}`,
			solution: `package main

import (
    "context"
    "fmt"
    "os"
    "os/signal"
    "syscall"
    "time"
)

func cleanup() {
    fmt.Println("cleaning up...")
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

    go func() {
        <-quit
        fmt.Println("shutdown signal received")
        cancel()
    }()

    // Simulate work
    fmt.Println("running")

    select {
    case <-ctx.Done():
    case <-time.After(5 * time.Second):
    }

    cleanup()
    fmt.Println("shutdown complete")
}`,
			hints: [
				'Replace panic with proper signal handling.',
				'Use os/signal and context for clean shutdown.',
				'Cleanup should run as normal code, not in a recover.'
			],
			concepts: ['refactoring', 'signal-handling', 'no-panic-shutdown']
		},
		{
			id: 'go-gshut-20',
			title: 'Refactor os.Exit to Graceful',
			type: 'refactor',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Refactor abrupt os.Exit to proper graceful shutdown.',
			skeleton: `package main

import (
    "fmt"
    "net/http"
    "os"
    "os/signal"
    "syscall"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "hello")
    })

    go func() {
        quit := make(chan os.Signal, 1)
        signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
        <-quit
        fmt.Println("received signal")
        os.Exit(0) // abrupt! defers don't run, connections dropped
    }()

    fmt.Println("starting server")
    http.ListenAndServe(":8080", mux)
}`,
			solution: `package main

import (
    "context"
    "fmt"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "hello")
    })

    srv := &http.Server{Addr: ":8080", Handler: mux}

    go func() {
        if err := srv.ListenAndServe(); err != http.ErrServerClosed {
            fmt.Println("server error:", err)
        }
    }()

    fmt.Println("starting server")

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    fmt.Println("received signal, shutting down...")

    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()

    if err := srv.Shutdown(ctx); err != nil {
        fmt.Println("shutdown error:", err)
    }
    fmt.Println("server stopped gracefully")
}`,
			hints: [
				'Replace os.Exit with srv.Shutdown for clean connection draining.',
				'Use http.Server (not http.ListenAndServe) for Shutdown support.',
				'Give a timeout context for the shutdown deadline.'
			],
			concepts: ['refactoring', 'graceful-shutdown', 'no-os-exit']
		}
	]
};
