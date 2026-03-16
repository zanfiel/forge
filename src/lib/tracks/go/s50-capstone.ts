import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
	id: 'go-capstone',
	title: '50. Capstone Project',
	explanation: `## Capstone: Building a Complete Go Application

This capstone section integrates concepts from across all previous sections. Each exercise combines multiple Go fundamentals into realistic, production-quality code patterns.

### What You Have Learned

Over the previous 49 sections, you have covered:

- **Fundamentals**: Variables, types, control flow, functions, error handling
- **Data Structures**: Arrays, slices, maps, structs, pointers
- **OOP Concepts**: Methods, interfaces, embedding, composition
- **Concurrency**: Goroutines, channels, mutexes, WaitGroups, context
- **Advanced Patterns**: Generics, reflection, testing, benchmarking
- **Networking**: HTTP servers/clients, middleware, gRPC
- **Architecture**: Design patterns, CLI tools, graceful shutdown

### Integration Principles

\`\`\`go
// Good Go code combines these principles:
// 1. Small interfaces
// 2. Explicit error handling
// 3. Composition over inheritance
// 4. Concurrency with clear ownership
// 5. Table-driven tests
// 6. Functional options for configuration
\`\`\`

### A Complete Application Structure

\`\`\`
myapp/
  cmd/
    server/main.go     // Entry point
  internal/
    config/config.go   // Configuration
    handler/handler.go // HTTP handlers
    service/service.go // Business logic
    store/store.go     // Data access
    middleware/        // HTTP middleware
  pkg/
    logger/logger.go   // Shared utilities
  go.mod
  go.sum
\`\`\`

### Wiring It All Together

\`\`\`go
func main() {
    // 1. Load configuration
    cfg, err := config.Load()
    if err != nil {
        log.Fatal(err)
    }

    // 2. Initialize dependencies
    store := store.New(cfg.DatabaseURL)
    svc := service.New(store)
    handler := handler.New(svc)

    // 3. Set up HTTP server with middleware
    mux := http.NewServeMux()
    handler.RegisterRoutes(mux)
    wrapped := middleware.Chain(
        middleware.Logger,
        middleware.Recovery,
        middleware.CORS,
    )(mux)

    // 4. Start with graceful shutdown
    srv := &http.Server{Addr: cfg.Addr, Handler: wrapped}
    go func() {
        if err := srv.ListenAndServe(); err != http.ErrServerClosed {
            log.Fatal(err)
        }
    }()

    // 5. Wait for shutdown signal
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    srv.Shutdown(ctx)
}
\`\`\`
`,
	exercises: [
		{
			id: 'go-capstone-1',
			title: 'Config with Functional Options and Env',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Create a configuration loader that combines functional options with environment variables.',
			skeleton: `package main

import (
	"fmt"
	"os"
	"strconv"
	"time"
)

type Config struct {
	Port         int
	Host         string
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
	Debug        bool
}

type __BLANK__ func(*Config)

func WithPort(p int) Option {
	return func(c *Config) { c.Port = p }
}

func WithDebug(d bool) Option {
	return func(c *Config) { c.Debug = d }
}

func LoadConfig(opts ...Option) *Config {
	c := &Config{
		Port:         8080,
		Host:         "0.0.0.0",
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		Debug:        false,
	}

	// Environment overrides
	if p := os.Getenv("PORT"); p != "" {
		if port, err := strconv.Atoi(p); err == nil {
			c.Port = port
		}
	}
	if h := os.Getenv("HOST"); h != "" {
		c.Host = h
	}

	// Functional options override everything
	for _, opt := range __BLANK__ {
		opt(c)
	}
	return c
}

func main() {
	cfg := LoadConfig(WithPort(3000), WithDebug(true))
	fmt.Printf("Server: %s:%d (debug=%v)\\n", cfg.Host, cfg.Port, cfg.Debug)
}`,
			solution: `package main

import (
	"fmt"
	"os"
	"strconv"
	"time"
)

type Config struct {
	Port         int
	Host         string
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
	Debug        bool
}

type Option func(*Config)

func WithPort(p int) Option {
	return func(c *Config) { c.Port = p }
}

func WithDebug(d bool) Option {
	return func(c *Config) { c.Debug = d }
}

func LoadConfig(opts ...Option) *Config {
	c := &Config{
		Port:         8080,
		Host:         "0.0.0.0",
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		Debug:        false,
	}

	// Environment overrides
	if p := os.Getenv("PORT"); p != "" {
		if port, err := strconv.Atoi(p); err == nil {
			c.Port = port
		}
	}
	if h := os.Getenv("HOST"); h != "" {
		c.Host = h
	}

	// Functional options override everything
	for _, opt := range opts {
		opt(c)
	}
	return c
}

func main() {
	cfg := LoadConfig(WithPort(3000), WithDebug(true))
	fmt.Printf("Server: %s:%d (debug=%v)\\n", cfg.Host, cfg.Port, cfg.Debug)
}`,
			hints: [
				'Option is a function type that modifies *Config.',
				'The opts parameter is the variadic slice of options.',
				'Options are applied after environment variables for highest precedence.',
			],
			concepts: ['functional-options', 'environment-variables', 'configuration'],
		},
		{
			id: 'go-capstone-2',
			title: 'Repository Interface with Error Types',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Define a repository interface with custom error types for not-found and validation errors.',
			skeleton: `package main

import (
	"errors"
	"fmt"
)

type NotFoundError struct {
	Resource string
	ID       string
}

func (e *NotFoundError) __BLANK__() string {
	return fmt.Sprintf("%s with ID %s not found", e.Resource, e.ID)
}

type ValidationError struct {
	Field   string
	Message string
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("validation error on %s: %s", e.Field, e.Message)
}

type User struct {
	ID    string
	Name  string
	Email string
}

type UserRepository __BLANK__ {
	FindByID(id string) (*User, error)
	Create(user *User) error
	Update(user *User) error
	Delete(id string) error
}

func IsNotFound(err error) bool {
	var nfe *NotFoundError
	return errors.__BLANK__(err, &nfe)
}

func main() {
	err := &NotFoundError{Resource: "User", ID: "123"}
	fmt.Println(IsNotFound(err))
	fmt.Println(err.Error())
}`,
			solution: `package main

import (
	"errors"
	"fmt"
)

type NotFoundError struct {
	Resource string
	ID       string
}

func (e *NotFoundError) Error() string {
	return fmt.Sprintf("%s with ID %s not found", e.Resource, e.ID)
}

type ValidationError struct {
	Field   string
	Message string
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("validation error on %s: %s", e.Field, e.Message)
}

type User struct {
	ID    string
	Name  string
	Email string
}

type UserRepository interface {
	FindByID(id string) (*User, error)
	Create(user *User) error
	Update(user *User) error
	Delete(id string) error
}

func IsNotFound(err error) bool {
	var nfe *NotFoundError
	return errors.As(err, &nfe)
}

func main() {
	err := &NotFoundError{Resource: "User", ID: "123"}
	fmt.Println(IsNotFound(err))
	fmt.Println(err.Error())
}`,
			hints: [
				'Error() string implements the error interface.',
				'UserRepository is defined as an interface.',
				'errors.As checks if an error matches a specific type.',
			],
			concepts: ['interfaces', 'custom-errors', 'repository-pattern', 'errors-as'],
		},
		{
			id: 'go-capstone-3',
			title: 'HTTP Handler with Dependency Injection',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Create an HTTP handler that uses dependency injection for the service layer.',
			skeleton: `package main

import (
	"encoding/json"
	"net/http"
)

type UserService interface {
	GetUser(id string) (*User, error)
}

type User struct {
	ID   string \`json:"id"\`
	Name string \`json:"name"\`
}

type Handler struct {
	userService __BLANK__
}

func NewHandler(us UserService) *Handler {
	return &Handler{userService: us}
}

func (h *Handler) GetUser(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "id required", http.StatusBadRequest)
		return
	}

	user, err := h.userService.__BLANK__(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.__BLANK__(w).Encode(user)
}`,
			solution: `package main

import (
	"encoding/json"
	"net/http"
)

type UserService interface {
	GetUser(id string) (*User, error)
}

type User struct {
	ID   string \`json:"id"\`
	Name string \`json:"name"\`
}

type Handler struct {
	userService UserService
}

func NewHandler(us UserService) *Handler {
	return &Handler{userService: us}
}

func (h *Handler) GetUser(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "id required", http.StatusBadRequest)
		return
	}

	user, err := h.userService.GetUser(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}`,
			hints: [
				'The field type should be the UserService interface, not a concrete type.',
				'Call the GetUser method on the service to retrieve the user.',
				'json.NewEncoder wraps a writer and Encode writes JSON to it.',
			],
			concepts: ['dependency-injection', 'http-handler', 'json-encoding', 'interfaces'],
		},
		{
			id: 'go-capstone-4',
			title: 'Middleware Chain with Recovery',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Implement a middleware chain that includes logging and panic recovery.',
			skeleton: `package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
	})
}

func recoveryMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := __BLANK__(); err != nil {
				log.Printf("PANIC: %v", err)
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			}
		}()
		next.__BLANK__(w, r)
	})
}

type Middleware func(http.Handler) http.Handler

func Chain(middlewares ...__BLANK__) Middleware {
	return func(final http.Handler) http.Handler {
		for i := len(middlewares) - 1; i >= 0; i-- {
			final = middlewares[i](final)
		}
		return final
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Hello!")
	})

	chain := Chain(loggingMiddleware, recoveryMiddleware)
	http.ListenAndServe(":8080", chain(mux))
}`,
			solution: `package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
	})
}

func recoveryMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Printf("PANIC: %v", err)
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			}
		}()
		next.ServeHTTP(w, r)
	})
}

type Middleware func(http.Handler) http.Handler

func Chain(middlewares ...Middleware) Middleware {
	return func(final http.Handler) http.Handler {
		for i := len(middlewares) - 1; i >= 0; i-- {
			final = middlewares[i](final)
		}
		return final
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Hello!")
	})

	chain := Chain(loggingMiddleware, recoveryMiddleware)
	http.ListenAndServe(":8080", chain(mux))
}`,
			hints: [
				'recover() catches panics in the deferred function.',
				'ServeHTTP calls the next handler in the chain.',
				'The Chain function takes variadic Middleware parameters.',
			],
			concepts: ['middleware', 'panic-recovery', 'chain-of-responsibility', 'http-server'],
		},
		{
			id: 'go-capstone-5',
			title: 'Generic In-Memory Cache',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Write a generic thread-safe cache with TTL expiration.',
			skeleton: `package main

import (
	"sync"
	"time"
)

// Write a generic Cache[K comparable, V any] that:
// - Stores key-value pairs with expiration timestamps
// - Get(key) returns (value, bool) - false if expired or missing
// - Set(key, value, ttl) stores with a TTL duration
// - Delete(key) removes an entry
// - Is thread-safe using sync.RWMutex
`,
			solution: `package main

import (
	"sync"
	"time"
)

type cacheEntry[V any] struct {
	value     V
	expiresAt time.Time
}

type Cache[K comparable, V any] struct {
	mu      sync.RWMutex
	entries map[K]cacheEntry[V]
}

func NewCache[K comparable, V any]() *Cache[K, V] {
	return &Cache[K, V]{
		entries: make(map[K]cacheEntry[V]),
	}
}

func (c *Cache[K, V]) Set(key K, value V, ttl time.Duration) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.entries[key] = cacheEntry[V]{
		value:     value,
		expiresAt: time.Now().Add(ttl),
	}
}

func (c *Cache[K, V]) Get(key K) (V, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	entry, ok := c.entries[key]
	if !ok || time.Now().After(entry.expiresAt) {
		var zero V
		return zero, false
	}
	return entry.value, true
}

func (c *Cache[K, V]) Delete(key K) {
	c.mu.Lock()
	defer c.mu.Unlock()
	delete(c.entries, key)
}`,
			hints: [
				'Use generics with [K comparable, V any] type parameters.',
				'Store the expiration time with each entry.',
				'Check time.Now().After(expiresAt) to determine if an entry has expired.',
			],
			concepts: ['generics', 'cache', 'ttl', 'rwmutex', 'thread-safety'],
		},
		{
			id: 'go-capstone-6',
			title: 'Write Concurrent Task Runner',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Write a task runner that executes functions concurrently with error collection and a concurrency limit.',
			skeleton: `package main

import (
	"fmt"
	"sync"
)

// Write a TaskRunner that:
// - Run(tasks []func() error) []error executes all tasks concurrently
// - Limits concurrency to maxWorkers goroutines
// - Collects and returns all errors (in any order)
// - Uses a semaphore pattern with a buffered channel
`,
			solution: `package main

import (
	"fmt"
	"sync"
)

type TaskRunner struct {
	maxWorkers int
}

func NewTaskRunner(maxWorkers int) *TaskRunner {
	return &TaskRunner{maxWorkers: maxWorkers}
}

func (tr *TaskRunner) Run(tasks []func() error) []error {
	var mu sync.Mutex
	var errs []error
	var wg sync.WaitGroup

	sem := make(chan struct{}, tr.maxWorkers)

	for _, task := range tasks {
		wg.Add(1)
		sem <- struct{}{}
		go func(t func() error) {
			defer wg.Done()
			defer func() { <-sem }()
			if err := t(); err != nil {
				mu.Lock()
				errs = append(errs, err)
				mu.Unlock()
			}
		}(task)
	}

	wg.Wait()
	return errs
}

func main() {
	runner := NewTaskRunner(3)
	tasks := []func() error{
		func() error { fmt.Println("Task 1"); return nil },
		func() error { fmt.Println("Task 2"); return nil },
		func() error { return fmt.Errorf("task 3 failed") },
		func() error { fmt.Println("Task 4"); return nil },
	}
	errs := runner.Run(tasks)
	for _, err := range errs {
		fmt.Println("Error:", err)
	}
}`,
			hints: [
				'Use a buffered channel as a semaphore to limit concurrency.',
				'Protect the errors slice with a mutex for concurrent appends.',
				'Use sync.WaitGroup to wait for all tasks to complete.',
			],
			concepts: ['concurrency', 'semaphore', 'waitgroup', 'error-collection'],
		},
		{
			id: 'go-capstone-7',
			title: 'Write Table-Driven Test Suite',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Write a comprehensive table-driven test for a URL parser function.',
			skeleton: `package main

import (
	"fmt"
	"net/url"
	"strings"
	"testing"
)

// Given this function:
func ParseEndpoint(raw string) (scheme, host string, port int, err error) {
	if !strings.Contains(raw, "://") {
		raw = "http://" + raw
	}
	u, err := url.Parse(raw)
	if err != nil {
		return "", "", 0, err
	}
	scheme = u.Scheme
	host = u.Hostname()
	p := u.Port()
	if p != "" {
		fmt.Sscanf(p, "%d", &port)
	} else if scheme == "https" {
		port = 443
	} else {
		port = 80
	}
	return scheme, host, port, nil
}

// Write TestParseEndpoint with table-driven tests covering:
// - "localhost:8080" -> http, localhost, 8080
// - "https://example.com" -> https, example.com, 443
// - "http://api.test:3000" -> http, api.test, 3000
// - "example.com" -> http, example.com, 80
`,
			solution: `package main

import (
	"fmt"
	"net/url"
	"strings"
	"testing"
)

func ParseEndpoint(raw string) (scheme, host string, port int, err error) {
	if !strings.Contains(raw, "://") {
		raw = "http://" + raw
	}
	u, err := url.Parse(raw)
	if err != nil {
		return "", "", 0, err
	}
	scheme = u.Scheme
	host = u.Hostname()
	p := u.Port()
	if p != "" {
		fmt.Sscanf(p, "%d", &port)
	} else if scheme == "https" {
		port = 443
	} else {
		port = 80
	}
	return scheme, host, port, nil
}

func TestParseEndpoint(t *testing.T) {
	tests := []struct {
		name       string
		input      string
		wantScheme string
		wantHost   string
		wantPort   int
		wantErr    bool
	}{
		{
			name:       "host with port no scheme",
			input:      "localhost:8080",
			wantScheme: "http",
			wantHost:   "localhost",
			wantPort:   8080,
		},
		{
			name:       "https with default port",
			input:      "https://example.com",
			wantScheme: "https",
			wantHost:   "example.com",
			wantPort:   443,
		},
		{
			name:       "http with explicit port",
			input:      "http://api.test:3000",
			wantScheme: "http",
			wantHost:   "api.test",
			wantPort:   3000,
		},
		{
			name:       "bare hostname",
			input:      "example.com",
			wantScheme: "http",
			wantHost:   "example.com",
			wantPort:   80,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			scheme, host, port, err := ParseEndpoint(tt.input)
			if (err != nil) != tt.wantErr {
				t.Fatalf("ParseEndpoint(%q) error = %v, wantErr %v", tt.input, err, tt.wantErr)
			}
			if err != nil {
				return
			}
			if scheme != tt.wantScheme {
				t.Errorf("scheme = %q, want %q", scheme, tt.wantScheme)
			}
			if host != tt.wantHost {
				t.Errorf("host = %q, want %q", host, tt.wantHost)
			}
			if port != tt.wantPort {
				t.Errorf("port = %d, want %d", port, tt.wantPort)
			}
		})
	}
}`,
			hints: [
				'Use a slice of anonymous structs for test cases.',
				't.Run creates named subtests for each case.',
				'Check error first, then validate each output field separately.',
			],
			concepts: ['table-driven-tests', 'subtests', 'testing', 'url-parsing'],
		},
		{
			id: 'go-capstone-8',
			title: 'Write Graceful Server with Context',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Write a complete HTTP server setup with graceful shutdown, context propagation, and signal handling.',
			skeleton: `package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

// Write a function runServer that:
// - Starts an HTTP server on the given address
// - Registers a health check at GET /health
// - Handles SIGINT and SIGTERM for graceful shutdown
// - Gives in-flight requests 30 seconds to complete
// - Returns an error if anything goes wrong
`,
			solution: `package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func runServer(addr string) error {
	mux := http.NewServeMux()
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, \`{"status":"ok"}\`)
	})

	srv := &http.Server{
		Addr:         addr,
		Handler:      mux,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	errCh := make(chan error, 1)
	go func() {
		log.Printf("Server starting on %s", addr)
		if err := srv.ListenAndServe(); err != http.ErrServerClosed {
			errCh <- err
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	select {
	case err := <-errCh:
		return fmt.Errorf("server error: %w", err)
	case sig := <-quit:
		log.Printf("Received signal %v, shutting down...", sig)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		return fmt.Errorf("shutdown error: %w", err)
	}

	log.Println("Server stopped gracefully")
	return nil
}

func main() {
	if err := runServer(":8080"); err != nil {
		log.Fatal(err)
	}
}`,
			hints: [
				'Use a goroutine for ListenAndServe and a channel for errors.',
				'Select between server error and shutdown signal.',
				'context.WithTimeout gives in-flight requests a deadline.',
			],
			concepts: ['graceful-shutdown', 'signal-handling', 'context', 'http-server'],
		},
		{
			id: 'go-capstone-9',
			title: 'Write Event-Driven Service',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Write an event bus service that supports typed events, subscribers, and async publishing.',
			skeleton: `package main

import (
	"context"
	"fmt"
	"sync"
)

// Write an EventService that:
// - Subscribe(eventType string, handler func(context.Context, interface{})) returns unsubscribe func
// - Publish(ctx context.Context, eventType string, payload interface{}) sends to all subscribers
// - PublishAsync does the same but in goroutines
// - Close() stops accepting events and waits for in-flight handlers
`,
			solution: `package main

import (
	"context"
	"fmt"
	"sync"
	"sync/atomic"
)

type EventHandler func(context.Context, interface{})

type EventService struct {
	mu       sync.RWMutex
	handlers map[string]map[int]EventHandler
	nextID   int
	closed   atomic.Bool
	wg       sync.WaitGroup
}

func NewEventService() *EventService {
	return &EventService{
		handlers: make(map[string]map[int]EventHandler),
	}
}

func (es *EventService) Subscribe(eventType string, handler EventHandler) func() {
	es.mu.Lock()
	defer es.mu.Unlock()

	if es.handlers[eventType] == nil {
		es.handlers[eventType] = make(map[int]EventHandler)
	}

	id := es.nextID
	es.nextID++
	es.handlers[eventType][id] = handler

	return func() {
		es.mu.Lock()
		defer es.mu.Unlock()
		delete(es.handlers[eventType], id)
	}
}

func (es *EventService) Publish(ctx context.Context, eventType string, payload interface{}) {
	if es.closed.Load() {
		return
	}
	es.mu.RLock()
	handlers := make([]EventHandler, 0, len(es.handlers[eventType]))
	for _, h := range es.handlers[eventType] {
		handlers = append(handlers, h)
	}
	es.mu.RUnlock()

	for _, h := range handlers {
		h(ctx, payload)
	}
}

func (es *EventService) PublishAsync(ctx context.Context, eventType string, payload interface{}) {
	if es.closed.Load() {
		return
	}
	es.mu.RLock()
	handlers := make([]EventHandler, 0, len(es.handlers[eventType]))
	for _, h := range es.handlers[eventType] {
		handlers = append(handlers, h)
	}
	es.mu.RUnlock()

	for _, h := range handlers {
		es.wg.Add(1)
		go func(handler EventHandler) {
			defer es.wg.Done()
			handler(ctx, payload)
		}(h)
	}
}

func (es *EventService) Close() {
	es.closed.Store(true)
	es.wg.Wait()
}

func main() {
	svc := NewEventService()

	unsub := svc.Subscribe("user.created", func(ctx context.Context, data interface{}) {
		fmt.Printf("User created: %v\\n", data)
	})

	svc.Publish(context.Background(), "user.created", "Alice")
	unsub()
	svc.Publish(context.Background(), "user.created", "Bob") // no output
	svc.Close()
}`,
			hints: [
				'Use a map of maps: eventType -> handlerID -> handler for easy unsubscribe.',
				'Return an unsubscribe function that removes the handler by ID.',
				'Use atomic.Bool for the closed flag and sync.WaitGroup for in-flight tracking.',
			],
			concepts: ['event-driven', 'observer-pattern', 'concurrency', 'unsubscribe', 'atomic'],
		},
		{
			id: 'go-capstone-10',
			title: 'Write Complete CRUD Service Layer',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Write a complete service layer with validation, business logic, and repository abstraction.',
			skeleton: `package main

import (
	"context"
	"fmt"
	"strings"
	"time"
)

// Write a TodoService with:
// - TodoRepository interface (Create, GetByID, Update, Delete, List)
// - TodoService struct with Create, Complete, List methods
// - Validation: title required, max 200 chars
// - Business logic: set CreatedAt on create, CompletedAt on complete
// - Custom errors: ErrNotFound, ErrValidation
`,
			solution: `package main

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"
)

var (
	ErrNotFound   = errors.New("not found")
	ErrValidation = errors.New("validation error")
)

type Todo struct {
	ID          string
	Title       string
	Done        bool
	CreatedAt   time.Time
	CompletedAt *time.Time
}

type TodoRepository interface {
	Create(ctx context.Context, todo *Todo) error
	GetByID(ctx context.Context, id string) (*Todo, error)
	Update(ctx context.Context, todo *Todo) error
	Delete(ctx context.Context, id string) error
	List(ctx context.Context) ([]*Todo, error)
}

type TodoService struct {
	repo TodoRepository
}

func NewTodoService(repo TodoRepository) *TodoService {
	return &TodoService{repo: repo}
}

func (s *TodoService) Create(ctx context.Context, title string) (*Todo, error) {
	title = strings.TrimSpace(title)
	if title == "" {
		return nil, fmt.Errorf("%w: title is required", ErrValidation)
	}
	if len(title) > 200 {
		return nil, fmt.Errorf("%w: title must be 200 characters or less", ErrValidation)
	}

	todo := &Todo{
		ID:        fmt.Sprintf("todo-%d", time.Now().UnixNano()),
		Title:     title,
		Done:      false,
		CreatedAt: time.Now(),
	}

	if err := s.repo.Create(ctx, todo); err != nil {
		return nil, fmt.Errorf("failed to create todo: %w", err)
	}
	return todo, nil
}

func (s *TodoService) Complete(ctx context.Context, id string) (*Todo, error) {
	todo, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("failed to get todo: %w", err)
	}
	if todo.Done {
		return todo, nil
	}

	now := time.Now()
	todo.Done = true
	todo.CompletedAt = &now

	if err := s.repo.Update(ctx, todo); err != nil {
		return nil, fmt.Errorf("failed to update todo: %w", err)
	}
	return todo, nil
}

func (s *TodoService) List(ctx context.Context) ([]*Todo, error) {
	todos, err := s.repo.List(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to list todos: %w", err)
	}
	return todos, nil
}`,
			hints: [
				'Define sentinel errors with errors.New for ErrNotFound and ErrValidation.',
				'Wrap sentinel errors with fmt.Errorf and %w for context.',
				'Set timestamps in the service layer, not the repository.',
			],
			concepts: ['service-layer', 'repository-pattern', 'validation', 'sentinel-errors', 'crud'],
		},
		{
			id: 'go-capstone-11',
			title: 'Fix Race Condition in Cache',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the cache that has a race condition between check-and-set operations.',
			skeleton: `package main

import (
	"fmt"
	"sync"
)

type Cache struct {
	mu   sync.RWMutex
	data map[string]int
}

func NewCache() *Cache {
	return &Cache{data: make(map[string]int)}
}

func (c *Cache) GetOrCompute(key string, compute func() int) int {
	c.mu.RLock()
	if val, ok := c.data[key]; ok {
		c.mu.RUnlock()
		return val
	}
	c.mu.RUnlock()

	val := compute()

	c.mu.Lock()
	c.data[key] = val
	c.mu.Unlock()

	return val
}

func main() {
	cache := NewCache()
	var wg sync.WaitGroup
	computeCount := 0

	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			cache.GetOrCompute("key", func() int {
				computeCount++
				return 42
			})
		}()
	}
	wg.Wait()
	fmt.Println("Computed", computeCount, "times")
}`,
			solution: `package main

import (
	"fmt"
	"sync"
)

type Cache struct {
	mu   sync.Mutex
	data map[string]int
}

func NewCache() *Cache {
	return &Cache{data: make(map[string]int)}
}

func (c *Cache) GetOrCompute(key string, compute func() int) int {
	c.mu.Lock()
	defer c.mu.Unlock()

	if val, ok := c.data[key]; ok {
		return val
	}

	val := compute()
	c.data[key] = val
	return val
}

func main() {
	cache := NewCache()
	var wg sync.WaitGroup
	computeCount := 0
	var mu sync.Mutex

	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			cache.GetOrCompute("key", func() int {
				mu.Lock()
				computeCount++
				mu.Unlock()
				return 42
			})
		}()
	}
	wg.Wait()
	fmt.Println("Computed", computeCount, "times")
}`,
			hints: [
				'The read-then-write pattern with separate locks has a TOCTOU race.',
				'Between RUnlock and Lock, another goroutine can also compute.',
				'Use a single Lock for the entire check-and-set operation.',
			],
			concepts: ['race-condition', 'toctou', 'mutex', 'cache', 'debugging'],
		},
		{
			id: 'go-capstone-12',
			title: 'Fix Goroutine Leak in HTTP Client',
			type: 'fix-bug',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Fix the HTTP client helper that leaks goroutines when requests are cancelled.',
			skeleton: `package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"time"
)

func fetchWithTimeout(url string, timeout time.Duration) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	_ = cancel

	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return "", err
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}

func main() {
	body, err := fetchWithTimeout("https://example.com", 5*time.Second)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Printf("Got %d bytes\\n", len(body))
}`,
			solution: `package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"time"
)

func fetchWithTimeout(url string, timeout time.Duration) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return "", err
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}

func main() {
	body, err := fetchWithTimeout("https://example.com", 5*time.Second)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Printf("Got %d bytes\\n", len(body))
}`,
			hints: [
				'cancel() must be called to release context resources - use defer.',
				'resp.Body must be closed to prevent connection leaks.',
				'Both defer cancel() and defer resp.Body.Close() are needed.',
			],
			concepts: ['resource-leak', 'context-cancel', 'http-client', 'defer', 'debugging'],
		},
		{
			id: 'go-capstone-13',
			title: 'Fix Broken Middleware Chain Order',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the middleware chain where auth runs after the handler instead of before.',
			skeleton: `package main

import (
	"fmt"
	"net/http"
)

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("Authorization") == "" {
			http.Error(w, "unauthorized", 401)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "secret data")
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/data", handler)

	// Bug: auth middleware is applied incorrectly
	wrapped := http.Handler(mux)
	http.ListenAndServe(":8080", wrapped)
}`,
			solution: `package main

import (
	"fmt"
	"net/http"
)

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("Authorization") == "" {
			http.Error(w, "unauthorized", 401)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "secret data")
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/data", handler)

	wrapped := authMiddleware(mux)
	http.ListenAndServe(":8080", wrapped)
}`,
			hints: [
				'The middleware is defined but never applied to the handler chain.',
				'Wrap mux with authMiddleware so auth runs before the handler.',
				'authMiddleware(mux) creates the correct chain: auth -> mux -> handler.',
			],
			concepts: ['middleware', 'http-handler', 'authentication', 'debugging'],
		},
		{
			id: 'go-capstone-14',
			title: 'Predict Dependency Injection Output',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict the output of a program using interface-based dependency injection.',
			skeleton: `package main

import "fmt"

type Greeter interface {
	Greet(name string) string
}

type FormalGreeter struct{}
func (f FormalGreeter) Greet(name string) string {
	return fmt.Sprintf("Good day, %s.", name)
}

type CasualGreeter struct{}
func (c CasualGreeter) Greet(name string) string {
	return fmt.Sprintf("Hey %s!", name)
}

type App struct {
	greeter Greeter
}

func (a App) Run(name string) {
	fmt.Println(a.greeter.Greet(name))
}

func main() {
	app1 := App{greeter: FormalGreeter{}}
	app2 := App{greeter: CasualGreeter{}}
	app1.Run("Alice")
	app2.Run("Bob")
}`,
			solution: `Good day, Alice.
Hey Bob!`,
			hints: [
				'app1 uses FormalGreeter, app2 uses CasualGreeter.',
				'FormalGreeter formats as "Good day, <name>."',
				'CasualGreeter formats as "Hey <name>!"',
			],
			concepts: ['dependency-injection', 'interfaces', 'polymorphism', 'output-prediction'],
		},
		{
			id: 'go-capstone-15',
			title: 'Predict Context Cancellation Behavior',
			type: 'predict-output',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Predict what happens when a context is cancelled during concurrent operations.',
			skeleton: `package main

import (
	"context"
	"fmt"
	"time"
)

func worker(ctx context.Context, id int, results chan<- string) {
	select {
	case <-time.After(time.Duration(id*100) * time.Millisecond):
		results <- fmt.Sprintf("worker %d done", id)
	case <-ctx.Done():
		results <- fmt.Sprintf("worker %d cancelled", id)
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 250*time.Millisecond)
	defer cancel()

	results := make(chan string, 4)
	for i := 1; i <= 4; i++ {
		go worker(ctx, i, results)
	}

	for i := 0; i < 4; i++ {
		fmt.Println(<-results)
	}
}`,
			solution: `worker 1 done
worker 2 done
worker 3 cancelled
worker 4 cancelled`,
			hints: [
				'Workers complete at 100ms, 200ms, 300ms, 400ms respectively.',
				'Context expires at 250ms.',
				'Workers 1 (100ms) and 2 (200ms) finish before timeout; 3 and 4 are cancelled.',
			],
			concepts: ['context', 'cancellation', 'timeout', 'concurrency', 'output-prediction'],
		},
		{
			id: 'go-capstone-16',
			title: 'Predict Generic Type Behavior',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict the output of generic function usage.',
			skeleton: `package main

import "fmt"

func Map[T any, U any](slice []T, fn func(T) U) []U {
	result := make([]U, len(slice))
	for i, v := range slice {
		result[i] = fn(v)
	}
	return result
}

func Filter[T any](slice []T, fn func(T) bool) []T {
	var result []T
	for _, v := range slice {
		if fn(v) {
			result = append(result, v)
		}
	}
	return result
}

func main() {
	nums := []int{1, 2, 3, 4, 5}
	doubled := Map(nums, func(n int) int { return n * 2 })
	evens := Filter(doubled, func(n int) bool { return n%4 == 0 })
	strs := Map(evens, func(n int) string { return fmt.Sprintf("(%d)", n) })
	fmt.Println(strs)
}`,
			solution: `[(4) (8)]`,
			hints: [
				'Map doubles: [1,2,3,4,5] -> [2,4,6,8,10].',
				'Filter keeps multiples of 4: [2,4,6,8,10] -> [4,8].',
				'Map to strings: [4,8] -> ["(4)","(8)"].',
			],
			concepts: ['generics', 'map', 'filter', 'function-composition', 'output-prediction'],
		},
		{
			id: 'go-capstone-17',
			title: 'Refactor Monolithic Handler to Clean Architecture',
			type: 'refactor',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Refactor a monolithic HTTP handler into clean layers with proper separation of concerns.',
			skeleton: `package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"
	"strings"
	"sync"
	"time"
)

var (
	users = make(map[string]map[string]interface{})
	mu    sync.RWMutex
)

func handleUsers(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		var body map[string]string
		json.NewDecoder(r.Body).Decode(&body)
		name := strings.TrimSpace(body["name"])
		email := strings.TrimSpace(body["email"])
		if name == "" || email == "" {
			http.Error(w, "name and email required", 400)
			return
		}
		if !regexp.MustCompile("^[^@]+@[^@]+$").MatchString(email) {
			http.Error(w, "invalid email", 400)
			return
		}
		mu.Lock()
		id := fmt.Sprintf("u%d", len(users)+1)
		users[id] = map[string]interface{}{
			"id": id, "name": name, "email": email,
			"created_at": time.Now().Format(time.RFC3339),
		}
		mu.Unlock()
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(201)
		json.NewEncoder(w).Encode(users[id])
	case "GET":
		mu.RLock()
		list := make([]map[string]interface{}, 0, len(users))
		for _, u := range users {
			list = append(list, u)
		}
		mu.RUnlock()
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(list)
	default:
		http.Error(w, "method not allowed", 405)
	}
}

func main() {
	http.HandleFunc("/users", handleUsers)
	http.ListenAndServe(":8080", nil)
}`,
			solution: `package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"
	"strings"
	"sync"
	"time"
)

// Domain
type User struct {
	ID        string    \`json:"id"\`
	Name      string    \`json:"name"\`
	Email     string    \`json:"email"\`
	CreatedAt time.Time \`json:"created_at"\`
}

// Repository interface
type UserRepository interface {
	Create(user *User) error
	List() ([]*User, error)
}

// In-memory repository
type inMemoryUserRepo struct {
	mu     sync.RWMutex
	users  map[string]*User
	nextID int
}

func newInMemoryUserRepo() *inMemoryUserRepo {
	return &inMemoryUserRepo{users: make(map[string]*User), nextID: 1}
}

func (r *inMemoryUserRepo) Create(user *User) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	user.ID = fmt.Sprintf("u%d", r.nextID)
	r.nextID++
	r.users[user.ID] = user
	return nil
}

func (r *inMemoryUserRepo) List() ([]*User, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	list := make([]*User, 0, len(r.users))
	for _, u := range r.users {
		list = append(list, u)
	}
	return list, nil
}

// Service layer
var emailRegex = regexp.MustCompile("^[^@]+@[^@]+$")

type UserService struct {
	repo UserRepository
}

func NewUserService(repo UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) Create(name, email string) (*User, error) {
	name = strings.TrimSpace(name)
	email = strings.TrimSpace(email)
	if name == "" || email == "" {
		return nil, fmt.Errorf("name and email are required")
	}
	if !emailRegex.MatchString(email) {
		return nil, fmt.Errorf("invalid email format")
	}
	user := &User{Name: name, Email: email, CreatedAt: time.Now()}
	if err := s.repo.Create(user); err != nil {
		return nil, err
	}
	return user, nil
}

func (s *UserService) List() ([]*User, error) {
	return s.repo.List()
}

// Handler layer
type UserHandler struct {
	service *UserService
}

func NewUserHandler(svc *UserService) *UserHandler {
	return &UserHandler{service: svc}
}

func (h *UserHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		h.create(w, r)
	case http.MethodGet:
		h.list(w, r)
	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

func (h *UserHandler) create(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Name  string \`json:"name"\`
		Email string \`json:"email"\`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}
	user, err := h.service.Create(body.Name, body.Email)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}

func (h *UserHandler) list(w http.ResponseWriter, r *http.Request) {
	users, err := h.service.List()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

func main() {
	repo := newInMemoryUserRepo()
	svc := NewUserService(repo)
	handler := NewUserHandler(svc)

	http.Handle("/users", handler)
	http.ListenAndServe(":8080", nil)
}`,
			hints: [
				'Separate into layers: domain (User struct), repository, service, handler.',
				'The repository handles data storage, the service handles validation and business logic.',
				'The handler only deals with HTTP concerns (parsing, status codes, JSON encoding).',
			],
			concepts: ['clean-architecture', 'separation-of-concerns', 'repository-pattern', 'refactoring'],
		},
		{
			id: 'go-capstone-18',
			title: 'Refactor to Use Context Throughout',
			type: 'refactor',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Refactor a service that ignores context to properly propagate and respect it.',
			skeleton: `package main

import (
	"fmt"
	"time"
)

type Item struct {
	ID    string
	Name  string
	Price float64
}

type Store struct {
	items map[string]*Item
}

func NewStore() *Store {
	return &Store{items: map[string]*Item{
		"1": {ID: "1", Name: "Widget", Price: 9.99},
		"2": {ID: "2", Name: "Gadget", Price: 24.99},
	}}
}

func (s *Store) GetItem(id string) (*Item, error) {
	time.Sleep(100 * time.Millisecond) // simulate DB
	item, ok := s.items[id]
	if !ok {
		return nil, fmt.Errorf("item %s not found", id)
	}
	return item, nil
}

func (s *Store) ListItems() ([]*Item, error) {
	time.Sleep(200 * time.Millisecond) // simulate DB
	items := make([]*Item, 0, len(s.items))
	for _, item := range s.items {
		items = append(items, item)
	}
	return items, nil
}

type Service struct {
	store *Store
}

func NewService(store *Store) *Service {
	return &Service{store: store}
}

func (svc *Service) GetItem(id string) (*Item, error) {
	return svc.store.GetItem(id)
}

func (svc *Service) GetTotalPrice(ids []string) (float64, error) {
	var total float64
	for _, id := range ids {
		item, err := svc.store.GetItem(id)
		if err != nil {
			return 0, err
		}
		total += item.Price
	}
	return total, nil
}`,
			solution: `package main

import (
	"context"
	"fmt"
	"time"
)

type Item struct {
	ID    string
	Name  string
	Price float64
}

type Store struct {
	items map[string]*Item
}

func NewStore() *Store {
	return &Store{items: map[string]*Item{
		"1": {ID: "1", Name: "Widget", Price: 9.99},
		"2": {ID: "2", Name: "Gadget", Price: 24.99},
	}}
}

func (s *Store) GetItem(ctx context.Context, id string) (*Item, error) {
	select {
	case <-ctx.Done():
		return nil, ctx.Err()
	case <-time.After(100 * time.Millisecond):
	}
	item, ok := s.items[id]
	if !ok {
		return nil, fmt.Errorf("item %s not found", id)
	}
	return item, nil
}

func (s *Store) ListItems(ctx context.Context) ([]*Item, error) {
	select {
	case <-ctx.Done():
		return nil, ctx.Err()
	case <-time.After(200 * time.Millisecond):
	}
	items := make([]*Item, 0, len(s.items))
	for _, item := range s.items {
		items = append(items, item)
	}
	return items, nil
}

type Service struct {
	store *Store
}

func NewService(store *Store) *Service {
	return &Service{store: store}
}

func (svc *Service) GetItem(ctx context.Context, id string) (*Item, error) {
	return svc.store.GetItem(ctx, id)
}

func (svc *Service) GetTotalPrice(ctx context.Context, ids []string) (float64, error) {
	var total float64
	for _, id := range ids {
		select {
		case <-ctx.Done():
			return 0, ctx.Err()
		default:
		}
		item, err := svc.store.GetItem(ctx, id)
		if err != nil {
			return 0, err
		}
		total += item.Price
	}
	return total, nil
}`,
			hints: [
				'Add context.Context as the first parameter to all methods.',
				'Use select with ctx.Done() to check for cancellation before slow operations.',
				'Propagate context through each layer of the call stack.',
			],
			concepts: ['context-propagation', 'cancellation', 'refactoring', 'clean-architecture'],
		},
		{
			id: 'go-capstone-19',
			title: 'Refactor Global State to Dependency Injection',
			type: 'refactor',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Refactor code that uses global variables into proper dependency injection.',
			skeleton: `package main

import (
	"fmt"
	"log"
	"os"
)

var (
	logger   = log.New(os.Stdout, "[APP] ", log.LstdFlags)
	dbURL    = os.Getenv("DATABASE_URL")
	apiKey   = os.Getenv("API_KEY")
	maxConns = 10
)

func connectDB() {
	logger.Printf("Connecting to %s with max %d connections", dbURL, maxConns)
}

func callAPI(endpoint string) {
	logger.Printf("Calling %s with key %s...", endpoint, apiKey[:4])
}

func processData() {
	connectDB()
	callAPI("/data")
	logger.Println("Processing complete")
}

func main() {
	processData()
}`,
			solution: `package main

import (
	"fmt"
	"log"
	"os"
)

type AppConfig struct {
	DBURL    string
	APIKey   string
	MaxConns int
}

type App struct {
	config AppConfig
	logger *log.Logger
}

func NewApp(cfg AppConfig, logger *log.Logger) *App {
	return &App{config: cfg, logger: logger}
}

func (a *App) connectDB() {
	a.logger.Printf("Connecting to %s with max %d connections", a.config.DBURL, a.config.MaxConns)
}

func (a *App) callAPI(endpoint string) {
	a.logger.Printf("Calling %s with key %s...", endpoint, a.config.APIKey[:4])
}

func (a *App) ProcessData() {
	a.connectDB()
	a.callAPI("/data")
	a.logger.Println("Processing complete")
}

func main() {
	cfg := AppConfig{
		DBURL:    os.Getenv("DATABASE_URL"),
		APIKey:   os.Getenv("API_KEY"),
		MaxConns: 10,
	}
	logger := log.New(os.Stdout, "[APP] ", log.LstdFlags)

	app := NewApp(cfg, logger)
	app.ProcessData()
}`,
			hints: [
				'Move global variables into a config struct and inject them.',
				'Make functions into methods on an App struct that holds dependencies.',
				'The logger becomes an injected dependency, not a global.',
			],
			concepts: ['dependency-injection', 'global-state', 'refactoring', 'testability'],
		},
		{
			id: 'go-capstone-20',
			title: 'Write Complete Application Bootstrap',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Write a complete application bootstrap that wires together config, logging, HTTP server, graceful shutdown, and health checks.',
			skeleton: `package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

// Write a complete application that:
// 1. Loads config from env vars with defaults (PORT=8080, ENV=development)
// 2. Sets up structured logging with the environment prefix
// 3. Registers a GET /health endpoint returning {"status":"ok","env":"...","uptime":"..."}
// 4. Registers a GET /ready endpoint that returns 200 after setup, 503 before
// 5. Wraps all routes with request logging middleware
// 6. Starts with graceful shutdown (30s timeout)
// 7. Logs startup and shutdown events
`,
			solution: `package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"sync/atomic"
	"syscall"
	"time"
)

type Config struct {
	Port string
	Env  string
}

func loadConfig() Config {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	env := os.Getenv("ENV")
	if env == "" {
		env = "development"
	}
	return Config{Port: port, Env: env}
}

func loggingMiddleware(logger *log.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		logger.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
	})
}

func healthHandler(cfg Config, startTime time.Time) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"status": "ok",
			"env":    cfg.Env,
			"uptime": time.Since(startTime).Round(time.Second).String(),
		})
	}
}

func readyHandler(ready *atomic.Bool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if !ready.Load() {
			w.WriteHeader(http.StatusServiceUnavailable)
			fmt.Fprintln(w, "not ready")
			return
		}
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "ready")
	}
}

func run() error {
	cfg := loadConfig()
	logger := log.New(os.Stdout, fmt.Sprintf("[%s] ", cfg.Env), log.LstdFlags)
	startTime := time.Now()

	var ready atomic.Bool

	mux := http.NewServeMux()
	mux.HandleFunc("/health", healthHandler(cfg, startTime))
	mux.HandleFunc("/ready", readyHandler(&ready))

	handler := loggingMiddleware(logger, mux)

	srv := &http.Server{
		Addr:         ":" + cfg.Port,
		Handler:      handler,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	errCh := make(chan error, 1)
	go func() {
		logger.Printf("Server starting on :%s", cfg.Port)
		if err := srv.ListenAndServe(); err != http.ErrServerClosed {
			errCh <- err
		}
	}()

	ready.Store(true)
	logger.Println("Application ready")

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	select {
	case err := <-errCh:
		return fmt.Errorf("server error: %w", err)
	case sig := <-quit:
		logger.Printf("Received %v, starting graceful shutdown...", sig)
	}

	ready.Store(false)

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		return fmt.Errorf("shutdown error: %w", err)
	}

	logger.Println("Server stopped gracefully")
	return nil
}

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}`,
			hints: [
				'Use a run() function that returns error for clean main().',
				'atomic.Bool tracks readiness state without mutex.',
				'Set ready to false on shutdown so /ready returns 503 during drain.',
			],
			concepts: ['application-bootstrap', 'graceful-shutdown', 'health-check', 'readiness', 'middleware', 'configuration'],
		},
	],
};
