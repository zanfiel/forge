import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
	id: 'go-patterns',
	title: '49. Design Patterns in Go',
	explanation: `## Design Patterns in Go

Go takes a pragmatic approach to design patterns, favoring simplicity and composition over complex class hierarchies.

### Functional Options Pattern

\`\`\`go
type Server struct {
    port    int
    host    string
    timeout time.Duration
}

type Option func(*Server)

func WithPort(port int) Option {
    return func(s *Server) { s.port = port }
}

func WithHost(host string) Option {
    return func(s *Server) { s.host = host }
}

func WithTimeout(d time.Duration) Option {
    return func(s *Server) { s.timeout = d }
}

func NewServer(opts ...Option) *Server {
    s := &Server{port: 8080, host: "localhost", timeout: 30 * time.Second}
    for _, opt := range opts {
        opt(s)
    }
    return s
}

// Usage:
srv := NewServer(WithPort(9090), WithTimeout(60*time.Second))
\`\`\`

### Strategy Pattern

\`\`\`go
type Compressor interface {
    Compress(data []byte) ([]byte, error)
}

type GzipCompressor struct{}
func (g GzipCompressor) Compress(data []byte) ([]byte, error) { /* ... */ }

type ZstdCompressor struct{}
func (z ZstdCompressor) Compress(data []byte) ([]byte, error) { /* ... */ }

type Archiver struct {
    compressor Compressor
}

func (a *Archiver) Archive(data []byte) ([]byte, error) {
    return a.compressor.Compress(data)
}
\`\`\`

### Observer Pattern

\`\`\`go
type Event struct {
    Type    string
    Payload interface{}
}

type Handler func(Event)

type EventBus struct {
    mu       sync.RWMutex
    handlers map[string][]Handler
}

func (eb *EventBus) Subscribe(eventType string, handler Handler) {
    eb.mu.Lock()
    defer eb.mu.Unlock()
    eb.handlers[eventType] = append(eb.handlers[eventType], handler)
}

func (eb *EventBus) Publish(event Event) {
    eb.mu.RLock()
    defer eb.mu.RUnlock()
    for _, handler := range eb.handlers[event.Type] {
        go handler(event)
    }
}
\`\`\`

### Builder Pattern

\`\`\`go
type QueryBuilder struct {
    table      string
    conditions []string
    orderBy    string
    limit      int
}

func NewQueryBuilder(table string) *QueryBuilder {
    return &QueryBuilder{table: table}
}

func (qb *QueryBuilder) Where(cond string) *QueryBuilder {
    qb.conditions = append(qb.conditions, cond)
    return qb
}

func (qb *QueryBuilder) OrderBy(field string) *QueryBuilder {
    qb.orderBy = field
    return qb
}

func (qb *QueryBuilder) Limit(n int) *QueryBuilder {
    qb.limit = n
    return qb
}

func (qb *QueryBuilder) Build() string {
    q := "SELECT * FROM " + qb.table
    if len(qb.conditions) > 0 {
        q += " WHERE " + strings.Join(qb.conditions, " AND ")
    }
    if qb.orderBy != "" {
        q += " ORDER BY " + qb.orderBy
    }
    if qb.limit > 0 {
        q += fmt.Sprintf(" LIMIT %d", qb.limit)
    }
    return q
}
\`\`\`

### Singleton with sync.Once

\`\`\`go
var (
    instance *Database
    once     sync.Once
)

func GetDB() *Database {
    once.Do(func() {
        instance = &Database{}
        instance.connect()
    })
    return instance
}
\`\`\`
`,
	exercises: [
		{
			id: 'go-patterns-1',
			title: 'Functional Options Basics',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Implement the functional options pattern for configuring a client.',
			skeleton: `package main

import "fmt"

type Client struct {
	baseURL string
	timeout int
	retries int
}

type __BLANK__ func(*Client)

func WithTimeout(t int) Option {
	return func(c *Client) {
		c.timeout = t
	}
}

func WithRetries(r int) Option {
	return func(c *Client) {
		c.retries = r
	}
}

func NewClient(baseURL string, opts ...__BLANK__) *Client {
	c := &Client{baseURL: baseURL, timeout: 30, retries: 3}
	for _, opt := range opts {
		opt(c)
	}
	return c
}

func main() {
	c := NewClient("https://api.example.com", WithTimeout(60), WithRetries(5))
	fmt.Printf("URL: %s, Timeout: %d, Retries: %d\\n", c.baseURL, c.timeout, c.retries)
}`,
			solution: `package main

import "fmt"

type Client struct {
	baseURL string
	timeout int
	retries int
}

type Option func(*Client)

func WithTimeout(t int) Option {
	return func(c *Client) {
		c.timeout = t
	}
}

func WithRetries(r int) Option {
	return func(c *Client) {
		c.retries = r
	}
}

func NewClient(baseURL string, opts ...Option) *Client {
	c := &Client{baseURL: baseURL, timeout: 30, retries: 3}
	for _, opt := range opts {
		opt(c)
	}
	return c
}

func main() {
	c := NewClient("https://api.example.com", WithTimeout(60), WithRetries(5))
	fmt.Printf("URL: %s, Timeout: %d, Retries: %d\\n", c.baseURL, c.timeout, c.retries)
}`,
			hints: [
				'Option is a function type that modifies the Client.',
				'The type definition is: type Option func(*Client).',
				'The variadic parameter uses ...Option.',
			],
			concepts: ['functional-options', 'type-definition', 'variadic'],
		},
		{
			id: 'go-patterns-2',
			title: 'Singleton with sync.Once',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Implement the singleton pattern using sync.Once.',
			skeleton: `package main

import (
	"fmt"
	"sync"
)

type Config struct {
	DBHost string
	DBPort int
}

var (
	configInstance *Config
	configOnce     sync.__BLANK__
)

func GetConfig() *Config {
	configOnce.__BLANK__(func() {
		configInstance = &Config{
			DBHost: "localhost",
			DBPort: 5432,
		}
		fmt.Println("Config initialized")
	})
	return configInstance
}

func main() {
	c1 := GetConfig()
	c2 := GetConfig()
	fmt.Println(c1 == c2)
}`,
			solution: `package main

import (
	"fmt"
	"sync"
)

type Config struct {
	DBHost string
	DBPort int
}

var (
	configInstance *Config
	configOnce     sync.Once
)

func GetConfig() *Config {
	configOnce.Do(func() {
		configInstance = &Config{
			DBHost: "localhost",
			DBPort: 5432,
		}
		fmt.Println("Config initialized")
	})
	return configInstance
}

func main() {
	c1 := GetConfig()
	c2 := GetConfig()
	fmt.Println(c1 == c2)
}`,
			hints: [
				'sync.Once ensures a function runs exactly once.',
				'The method is called Do and takes a function.',
				'Subsequent calls to Do are no-ops.',
			],
			concepts: ['singleton', 'sync-once', 'initialization'],
		},
		{
			id: 'go-patterns-3',
			title: 'Strategy Pattern Interface',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Implement the strategy pattern using interfaces.',
			skeleton: `package main

import (
	"fmt"
	"sort"
)

type SortStrategy __BLANK__ {
	Sort(data []int) []int
}

type AscendingSort struct{}

func (a AscendingSort) Sort(data []int) []int {
	result := make([]int, len(data))
	copy(result, data)
	sort.Ints(result)
	return result
}

type DescendingSort struct{}

func (d DescendingSort) Sort(data []int) []int {
	result := make([]int, len(data))
	copy(result, data)
	sort.Sort(sort.Reverse(sort.IntSlice(result)))
	return result
}

type Sorter struct {
	strategy SortStrategy
}

func (s *Sorter) SetStrategy(strategy SortStrategy) {
	s.strategy = strategy
}

func (s *Sorter) Execute(data []int) []int {
	return s.strategy.__BLANK__(data)
}

func main() {
	sorter := &Sorter{strategy: AscendingSort{}}
	fmt.Println(sorter.Execute([]int{3, 1, 2}))
	sorter.SetStrategy(DescendingSort{})
	fmt.Println(sorter.Execute([]int{3, 1, 2}))
}`,
			solution: `package main

import (
	"fmt"
	"sort"
)

type SortStrategy interface {
	Sort(data []int) []int
}

type AscendingSort struct{}

func (a AscendingSort) Sort(data []int) []int {
	result := make([]int, len(data))
	copy(result, data)
	sort.Ints(result)
	return result
}

type DescendingSort struct{}

func (d DescendingSort) Sort(data []int) []int {
	result := make([]int, len(data))
	copy(result, data)
	sort.Sort(sort.Reverse(sort.IntSlice(result)))
	return result
}

type Sorter struct {
	strategy SortStrategy
}

func (s *Sorter) SetStrategy(strategy SortStrategy) {
	s.strategy = strategy
}

func (s *Sorter) Execute(data []int) []int {
	return s.strategy.Sort(data)
}

func main() {
	sorter := &Sorter{strategy: AscendingSort{}}
	fmt.Println(sorter.Execute([]int{3, 1, 2}))
	sorter.SetStrategy(DescendingSort{})
	fmt.Println(sorter.Execute([]int{3, 1, 2}))
}`,
			hints: [
				'Strategy pattern uses an interface to define interchangeable algorithms.',
				'The keyword is "interface" for defining the contract.',
				'The Sorter delegates to its strategy by calling Sort.',
			],
			concepts: ['strategy-pattern', 'interface', 'composition'],
		},
		{
			id: 'go-patterns-4',
			title: 'Builder Pattern Chain',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Implement a fluent builder pattern with method chaining.',
			skeleton: `package main

import (
	"fmt"
	"strings"
)

type Email struct {
	from    string
	to      []string
	subject string
	body    string
}

type EmailBuilder struct {
	email Email
}

func NewEmailBuilder() *EmailBuilder {
	return &EmailBuilder{}
}

func (b *EmailBuilder) From(from string) __BLANK__ {
	b.email.from = from
	return b
}

func (b *EmailBuilder) To(to string) *EmailBuilder {
	b.email.to = append(b.email.to, to)
	return __BLANK__
}

func (b *EmailBuilder) Subject(s string) *EmailBuilder {
	b.email.subject = s
	return b
}

func (b *EmailBuilder) Body(body string) *EmailBuilder {
	b.email.body = body
	return b
}

func (b *EmailBuilder) Build() Email {
	return b.email
}

func main() {
	email := NewEmailBuilder().
		From("sender@test.com").
		To("alice@test.com").
		To("bob@test.com").
		Subject("Hello").
		Body("Hi there!").
		Build()
	fmt.Printf("From: %s, To: %s, Subject: %s\\n",
		email.from, strings.Join(email.to, ", "), email.subject)
}`,
			solution: `package main

import (
	"fmt"
	"strings"
)

type Email struct {
	from    string
	to      []string
	subject string
	body    string
}

type EmailBuilder struct {
	email Email
}

func NewEmailBuilder() *EmailBuilder {
	return &EmailBuilder{}
}

func (b *EmailBuilder) From(from string) *EmailBuilder {
	b.email.from = from
	return b
}

func (b *EmailBuilder) To(to string) *EmailBuilder {
	b.email.to = append(b.email.to, to)
	return b
}

func (b *EmailBuilder) Subject(s string) *EmailBuilder {
	b.email.subject = s
	return b
}

func (b *EmailBuilder) Body(body string) *EmailBuilder {
	b.email.body = body
	return b
}

func (b *EmailBuilder) Build() Email {
	return b.email
}

func main() {
	email := NewEmailBuilder().
		From("sender@test.com").
		To("alice@test.com").
		To("bob@test.com").
		Subject("Hello").
		Body("Hi there!").
		Build()
	fmt.Printf("From: %s, To: %s, Subject: %s\\n",
		email.from, strings.Join(email.to, ", "), email.subject)
}`,
			hints: [
				'Each builder method returns *EmailBuilder for chaining.',
				'Return the receiver (b) to enable method chaining.',
				'Build() returns the final constructed Email value.',
			],
			concepts: ['builder-pattern', 'method-chaining', 'fluent-api'],
		},
		{
			id: 'go-patterns-5',
			title: 'Observer with Event Bus',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Implement the observer pattern with a simple event bus.',
			skeleton: `package main

import (
	"fmt"
	"sync"
)

type EventBus struct {
	mu       sync.RWMutex
	handlers map[string][]func(interface{})
}

func NewEventBus() *EventBus {
	return &EventBus{handlers: make(map[string][]func(interface{}))}
}

func (eb *EventBus) Subscribe(event string, handler func(interface{})) {
	eb.mu.__BLANK__()
	defer eb.mu.Unlock()
	eb.handlers[event] = __BLANK__(eb.handlers[event], handler)
}

func (eb *EventBus) Publish(event string, data interface{}) {
	eb.mu.__BLANK__()
	defer eb.mu.RUnlock()
	for _, handler := range eb.handlers[event] {
		handler(data)
	}
}

func main() {
	bus := NewEventBus()
	bus.Subscribe("user.created", func(data interface{}) {
		fmt.Printf("New user: %v\\n", data)
	})
	bus.Publish("user.created", "Alice")
}`,
			solution: `package main

import (
	"fmt"
	"sync"
)

type EventBus struct {
	mu       sync.RWMutex
	handlers map[string][]func(interface{})
}

func NewEventBus() *EventBus {
	return &EventBus{handlers: make(map[string][]func(interface{}))}
}

func (eb *EventBus) Subscribe(event string, handler func(interface{})) {
	eb.mu.Lock()
	defer eb.mu.Unlock()
	eb.handlers[event] = append(eb.handlers[event], handler)
}

func (eb *EventBus) Publish(event string, data interface{}) {
	eb.mu.RLock()
	defer eb.mu.RUnlock()
	for _, handler := range eb.handlers[event] {
		handler(data)
	}
}

func main() {
	bus := NewEventBus()
	bus.Subscribe("user.created", func(data interface{}) {
		fmt.Printf("New user: %v\\n", data)
	})
	bus.Publish("user.created", "Alice")
}`,
			hints: [
				'Subscribe modifies state so it needs a write Lock.',
				'append adds the handler to the slice for that event type.',
				'Publish only reads so it uses RLock for concurrent access.',
			],
			concepts: ['observer-pattern', 'event-bus', 'rwmutex'],
		},
		{
			id: 'go-patterns-6',
			title: 'Factory Function',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Implement a factory function that creates different types based on input.',
			skeleton: `package main

import "fmt"

type Storage interface {
	Save(key string, value []byte) error
	Load(key string) ([]byte, error)
}

type MemoryStorage struct {
	data map[string][]byte
}

func (m *MemoryStorage) Save(key string, value []byte) error {
	m.data[key] = value
	return nil
}
func (m *MemoryStorage) Load(key string) ([]byte, error) {
	v, ok := m.data[key]
	if !ok {
		return nil, fmt.Errorf("key not found: %s", key)
	}
	return v, nil
}

type DiskStorage struct {
	basePath string
}

func (d *DiskStorage) Save(key string, value []byte) error { return nil }
func (d *DiskStorage) Load(key string) ([]byte, error)     { return nil, nil }

func NewStorage(storageType string) (__BLANK__, error) {
	switch storageType {
	case "memory":
		return &MemoryStorage{data: make(map[string][]byte)}, nil
	case "disk":
		return &DiskStorage{basePath: "/tmp/storage"}, nil
	__BLANK__:
		return nil, fmt.Errorf("unknown storage type: %s", storageType)
	}
}`,
			solution: `package main

import "fmt"

type Storage interface {
	Save(key string, value []byte) error
	Load(key string) ([]byte, error)
}

type MemoryStorage struct {
	data map[string][]byte
}

func (m *MemoryStorage) Save(key string, value []byte) error {
	m.data[key] = value
	return nil
}
func (m *MemoryStorage) Load(key string) ([]byte, error) {
	v, ok := m.data[key]
	if !ok {
		return nil, fmt.Errorf("key not found: %s", key)
	}
	return v, nil
}

type DiskStorage struct {
	basePath string
}

func (d *DiskStorage) Save(key string, value []byte) error { return nil }
func (d *DiskStorage) Load(key string) ([]byte, error)     { return nil, nil }

func NewStorage(storageType string) (Storage, error) {
	switch storageType {
	case "memory":
		return &MemoryStorage{data: make(map[string][]byte)}, nil
	case "disk":
		return &DiskStorage{basePath: "/tmp/storage"}, nil
	default:
		return nil, fmt.Errorf("unknown storage type: %s", storageType)
	}
}`,
			hints: [
				'The factory returns the interface type, not a concrete type.',
				'Return Storage (the interface) to allow polymorphism.',
				'default handles unknown storage types.',
			],
			concepts: ['factory-pattern', 'interface', 'polymorphism'],
		},
		{
			id: 'go-patterns-7',
			title: 'Write Decorator Pattern',
			type: 'write-function',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Implement the decorator pattern to add logging around an HTTP handler.',
			skeleton: `package main

import (
	"log"
	"net/http"
	"time"
)

// Write a decorator function called withLogging that:
// - Takes an http.HandlerFunc and returns an http.HandlerFunc
// - Logs the method, path, and duration of each request
// - Calls the original handler
`,
			solution: `package main

import (
	"log"
	"net/http"
	"time"
)

func withLogging(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next(w, r)
		log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
	}
}`,
			hints: [
				'The decorator takes a handler and returns a new handler.',
				'The returned function wraps the original with additional behavior.',
				'Record the start time before calling next, compute duration after.',
			],
			concepts: ['decorator-pattern', 'http-middleware', 'closures'],
		},
		{
			id: 'go-patterns-8',
			title: 'Write Registry Pattern',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Implement a type registry that allows registering and creating types by name.',
			skeleton: `package main

import "fmt"

// Write a Registry for creating plugins by name:
// - Plugin interface with Name() string and Execute() string methods
// - Registry struct with Register(name, constructor) and Create(name) methods
// - Register stores a constructor function
// - Create looks up and calls the constructor, returning error if not found
`,
			solution: `package main

import "fmt"

type Plugin interface {
	Name() string
	Execute() string
}

type PluginConstructor func() Plugin

type Registry struct {
	constructors map[string]PluginConstructor
}

func NewRegistry() *Registry {
	return &Registry{constructors: make(map[string]PluginConstructor)}
}

func (r *Registry) Register(name string, ctor PluginConstructor) {
	r.constructors[name] = ctor
}

func (r *Registry) Create(name string) (Plugin, error) {
	ctor, ok := r.constructors[name]
	if !ok {
		return nil, fmt.Errorf("unknown plugin: %s", name)
	}
	return ctor(), nil
}`,
			hints: [
				'Store constructor functions in a map keyed by name.',
				'The constructor type is a function that returns a Plugin.',
				'Create looks up the constructor and calls it.',
			],
			concepts: ['registry-pattern', 'factory', 'plugin-architecture'],
		},
		{
			id: 'go-patterns-9',
			title: 'Write Pipeline Pattern',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Implement a middleware pipeline that processes strings through a chain of transformers.',
			skeleton: `package main

import (
	"fmt"
	"strings"
)

// Write a Pipeline that chains string transformations:
// - Transformer type: func(string) string
// - Pipeline struct that holds a slice of transformers
// - Add(Transformer) method to append transformers
// - Execute(input string) string that runs all transformers in order
// Test with: trim spaces -> lowercase -> replace spaces with hyphens
`,
			solution: `package main

import (
	"fmt"
	"strings"
)

type Transformer func(string) string

type Pipeline struct {
	transformers []Transformer
}

func NewPipeline() *Pipeline {
	return &Pipeline{}
}

func (p *Pipeline) Add(t Transformer) *Pipeline {
	p.transformers = append(p.transformers, t)
	return p
}

func (p *Pipeline) Execute(input string) string {
	result := input
	for _, t := range p.transformers {
		result = t(result)
	}
	return result
}

func main() {
	p := NewPipeline().
		Add(strings.TrimSpace).
		Add(strings.ToLower).
		Add(func(s string) string {
			return strings.ReplaceAll(s, " ", "-")
		})

	result := p.Execute("  Hello World  ")
	fmt.Println(result) // hello-world
}`,
			hints: [
				'Each transformer is a simple function from string to string.',
				'Execute iterates through transformers, passing the result of each to the next.',
				'Return *Pipeline from Add to enable method chaining.',
			],
			concepts: ['pipeline-pattern', 'function-composition', 'method-chaining'],
		},
		{
			id: 'go-patterns-10',
			title: 'Write Circuit Breaker Pattern',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Implement a basic circuit breaker that opens after consecutive failures.',
			skeleton: `package main

import (
	"errors"
	"fmt"
	"sync"
	"time"
)

// Write a CircuitBreaker with:
// - States: closed (normal), open (rejecting), half-open (testing)
// - Opens after maxFailures consecutive failures
// - After resetTimeout, transitions to half-open
// - In half-open, one success closes it, one failure re-opens it
// - Execute(func() error) error runs the function or returns ErrCircuitOpen
`,
			solution: `package main

import (
	"errors"
	"fmt"
	"sync"
	"time"
)

var ErrCircuitOpen = errors.New("circuit breaker is open")

type State int

const (
	StateClosed State = iota
	StateOpen
	StateHalfOpen
)

type CircuitBreaker struct {
	mu           sync.Mutex
	state        State
	failures     int
	maxFailures  int
	resetTimeout time.Duration
	lastFailure  time.Time
}

func NewCircuitBreaker(maxFailures int, resetTimeout time.Duration) *CircuitBreaker {
	return &CircuitBreaker{
		state:        StateClosed,
		maxFailures:  maxFailures,
		resetTimeout: resetTimeout,
	}
}

func (cb *CircuitBreaker) Execute(fn func() error) error {
	cb.mu.Lock()

	switch cb.state {
	case StateOpen:
		if time.Since(cb.lastFailure) > cb.resetTimeout {
			cb.state = StateHalfOpen
		} else {
			cb.mu.Unlock()
			return ErrCircuitOpen
		}
	}

	state := cb.state
	cb.mu.Unlock()

	err := fn()

	cb.mu.Lock()
	defer cb.mu.Unlock()

	if err != nil {
		cb.failures++
		cb.lastFailure = time.Now()
		if state == StateHalfOpen || cb.failures >= cb.maxFailures {
			cb.state = StateOpen
		}
		return err
	}

	cb.failures = 0
	cb.state = StateClosed
	return nil
}

func main() {
	cb := NewCircuitBreaker(3, 5*time.Second)

	for i := 0; i < 5; i++ {
		err := cb.Execute(func() error {
			return fmt.Errorf("service unavailable")
		})
		fmt.Printf("Call %d: %v\\n", i+1, err)
	}
}`,
			hints: [
				'Use an enum (iota) for the three states: closed, open, half-open.',
				'Track consecutive failures and the time of the last failure.',
				'In open state, check if resetTimeout has elapsed before rejecting.',
			],
			concepts: ['circuit-breaker', 'resilience', 'state-machine', 'mutex'],
		},
		{
			id: 'go-patterns-11',
			title: 'Write Middleware Chain',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Implement an HTTP middleware chain that composes multiple middleware functions.',
			skeleton: `package main

import (
	"fmt"
	"net/http"
)

// Write a Chain function that:
// - Takes variadic middleware: func(http.Handler) http.Handler
// - Returns a single middleware that applies them in order
// - The first middleware in the list is the outermost wrapper
`,
			solution: `package main

import (
	"fmt"
	"net/http"
)

type Middleware func(http.Handler) http.Handler

func Chain(middlewares ...Middleware) Middleware {
	return func(final http.Handler) http.Handler {
		for i := len(middlewares) - 1; i >= 0; i-- {
			final = middlewares[i](final)
		}
		return final
	}
}

func logging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("LOG: %s %s\\n", r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	})
}

func auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("Authorization") == "" {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	chain := Chain(logging, auth)
	handler := chain(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Hello!")
	}))
	_ = handler
}`,
			hints: [
				'Apply middlewares in reverse order so the first listed is outermost.',
				'Each middleware wraps the handler from the previous iteration.',
				'Chain returns a Middleware that can be applied to any handler.',
			],
			concepts: ['middleware', 'chain-of-responsibility', 'http-handler'],
		},
		{
			id: 'go-patterns-12',
			title: 'Write Object Pool Pattern',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Implement an object pool using sync.Pool for reusing byte buffers.',
			skeleton: `package main

import (
	"bytes"
	"fmt"
	"sync"
)

// Write a BufferPool that:
// - Uses sync.Pool internally
// - Get() returns a *bytes.Buffer (reset to empty)
// - Put(*bytes.Buffer) returns it to the pool
// - New function creates a buffer with initial capacity of 1024
`,
			solution: `package main

import (
	"bytes"
	"fmt"
	"sync"
)

type BufferPool struct {
	pool sync.Pool
}

func NewBufferPool() *BufferPool {
	return &BufferPool{
		pool: sync.Pool{
			New: func() interface{} {
				return bytes.NewBuffer(make([]byte, 0, 1024))
			},
		},
	}
}

func (bp *BufferPool) Get() *bytes.Buffer {
	buf := bp.pool.Get().(*bytes.Buffer)
	buf.Reset()
	return buf
}

func (bp *BufferPool) Put(buf *bytes.Buffer) {
	bp.pool.Put(buf)
}

func main() {
	pool := NewBufferPool()

	buf := pool.Get()
	buf.WriteString("Hello, World!")
	fmt.Println(buf.String())
	pool.Put(buf)

	buf2 := pool.Get()
	fmt.Println(buf2.Len()) // 0 - buffer was reset
	pool.Put(buf2)
}`,
			hints: [
				'sync.Pool has a New field for creating fresh objects.',
				'Get returns interface{} so you need a type assertion.',
				'Always Reset() the buffer before returning from Get.',
			],
			concepts: ['object-pool', 'sync-pool', 'memory-reuse'],
		},
		{
			id: 'go-patterns-13',
			title: 'Fix Broken Singleton Race Condition',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the singleton implementation that has a race condition.',
			skeleton: `package main

import (
	"fmt"
	"sync"
)

type Logger struct {
	prefix string
}

var loggerInstance *Logger

func GetLogger() *Logger {
	if loggerInstance == nil {
		loggerInstance = &Logger{prefix: "[APP]"}
	}
	return loggerInstance
}

func main() {
	var wg sync.WaitGroup
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			l := GetLogger()
			_ = l
		}()
	}
	wg.Wait()
	fmt.Println("Done")
}`,
			solution: `package main

import (
	"fmt"
	"sync"
)

type Logger struct {
	prefix string
}

var (
	loggerInstance *Logger
	loggerOnce     sync.Once
)

func GetLogger() *Logger {
	loggerOnce.Do(func() {
		loggerInstance = &Logger{prefix: "[APP]"}
	})
	return loggerInstance
}

func main() {
	var wg sync.WaitGroup
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			l := GetLogger()
			_ = l
		}()
	}
	wg.Wait()
	fmt.Println("Done")
}`,
			hints: [
				'The check-then-set pattern is not thread-safe.',
				'Multiple goroutines could pass the nil check simultaneously.',
				'Use sync.Once to guarantee exactly one initialization.',
			],
			concepts: ['singleton', 'race-condition', 'sync-once', 'debugging'],
		},
		{
			id: 'go-patterns-14',
			title: 'Fix Broken Observer Unsubscribe',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the event bus that panics when unsubscribing during publish.',
			skeleton: `package main

import (
	"fmt"
	"sync"
)

type Bus struct {
	mu       sync.Mutex
	handlers map[string][]func(string)
}

func NewBus() *Bus {
	return &Bus{handlers: make(map[string][]func(string))}
}

func (b *Bus) Subscribe(event string, h func(string)) int {
	b.mu.Lock()
	defer b.mu.Unlock()
	b.handlers[event] = append(b.handlers[event], h)
	return len(b.handlers[event]) - 1
}

func (b *Bus) Publish(event string, data string) {
	b.mu.Lock()
	defer b.mu.Unlock()
	for _, h := range b.handlers[event] {
		h(data)
	}
}

func main() {
	bus := NewBus()
	bus.Subscribe("msg", func(data string) {
		fmt.Println("Handler 1:", data)
	})
	bus.Subscribe("msg", func(data string) {
		fmt.Println("Handler 2:", data)
	})
	bus.Publish("msg", "hello")
}`,
			solution: `package main

import (
	"fmt"
	"sync"
)

type Bus struct {
	mu       sync.RWMutex
	handlers map[string][]func(string)
}

func NewBus() *Bus {
	return &Bus{handlers: make(map[string][]func(string))}
}

func (b *Bus) Subscribe(event string, h func(string)) int {
	b.mu.Lock()
	defer b.mu.Unlock()
	b.handlers[event] = append(b.handlers[event], h)
	return len(b.handlers[event]) - 1
}

func (b *Bus) Publish(event string, data string) {
	b.mu.RLock()
	handlers := make([]func(string), len(b.handlers[event]))
	copy(handlers, b.handlers[event])
	b.mu.RUnlock()
	for _, h := range handlers {
		h(data)
	}
}

func main() {
	bus := NewBus()
	bus.Subscribe("msg", func(data string) {
		fmt.Println("Handler 1:", data)
	})
	bus.Subscribe("msg", func(data string) {
		fmt.Println("Handler 2:", data)
	})
	bus.Publish("msg", "hello")
}`,
			hints: [
				'Holding a lock while calling handlers can cause deadlock if handlers subscribe.',
				'Copy the handlers slice under lock, then release the lock before iterating.',
				'Use RWMutex: RLock for reads (Publish), Lock for writes (Subscribe).',
			],
			concepts: ['observer-pattern', 'deadlock', 'rwmutex', 'debugging'],
		},
		{
			id: 'go-patterns-15',
			title: 'Fix Broken Builder Validation',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the builder that allows creating invalid objects.',
			skeleton: `package main

import "fmt"

type Server struct {
	Host string
	Port int
	TLS  bool
}

type ServerBuilder struct {
	server Server
}

func NewServerBuilder() *ServerBuilder {
	return &ServerBuilder{}
}

func (b *ServerBuilder) Host(h string) *ServerBuilder {
	b.server.Host = h
	return b
}

func (b *ServerBuilder) Port(p int) *ServerBuilder {
	b.server.Port = p
	return b
}

func (b *ServerBuilder) TLS(t bool) *ServerBuilder {
	b.server.TLS = t
	return b
}

func (b *ServerBuilder) Build() Server {
	return b.server
}

func main() {
	s := NewServerBuilder().Port(8080).Build()
	fmt.Println(s.Host, s.Port)
}`,
			solution: `package main

import (
	"fmt"
	"errors"
)

type Server struct {
	Host string
	Port int
	TLS  bool
}

type ServerBuilder struct {
	server Server
	err    error
}

func NewServerBuilder() *ServerBuilder {
	return &ServerBuilder{}
}

func (b *ServerBuilder) Host(h string) *ServerBuilder {
	if h == "" {
		b.err = errors.New("host is required")
	}
	b.server.Host = h
	return b
}

func (b *ServerBuilder) Port(p int) *ServerBuilder {
	if p <= 0 || p > 65535 {
		b.err = errors.New("port must be between 1 and 65535")
	}
	b.server.Port = p
	return b
}

func (b *ServerBuilder) TLS(t bool) *ServerBuilder {
	b.server.TLS = t
	return b
}

func (b *ServerBuilder) Build() (Server, error) {
	if b.server.Host == "" {
		return Server{}, errors.New("host is required")
	}
	if b.server.Port == 0 {
		return Server{}, errors.New("port is required")
	}
	if b.err != nil {
		return Server{}, b.err
	}
	return b.server, nil
}

func main() {
	s, err := NewServerBuilder().Host("localhost").Port(8080).Build()
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println(s.Host, s.Port)
}`,
			hints: [
				'Build should return (Server, error) to validate the final object.',
				'Track errors during building and check required fields in Build.',
				'An empty Host should not produce a valid Server.',
			],
			concepts: ['builder-pattern', 'validation', 'error-handling', 'debugging'],
		},
		{
			id: 'go-patterns-16',
			title: 'Predict Functional Options Output',
			type: 'predict-output',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Predict the output of a functional options constructor.',
			skeleton: `package main

import "fmt"

type Config struct {
	Debug   bool
	Port    int
	Workers int
}

type Opt func(*Config)

func WithDebug() Opt       { return func(c *Config) { c.Debug = true } }
func WithPort(p int) Opt   { return func(c *Config) { c.Port = p } }
func WithWorkers(n int) Opt { return func(c *Config) { c.Workers = n } }

func NewConfig(opts ...Opt) Config {
	c := Config{Debug: false, Port: 8080, Workers: 4}
	for _, opt := range opts {
		opt(&c)
	}
	return c
}

func main() {
	c := NewConfig(WithDebug(), WithPort(3000))
	fmt.Printf("%v %d %d\\n", c.Debug, c.Port, c.Workers)
}`,
			solution: `true 3000 4`,
			hints: [
				'Defaults are: Debug=false, Port=8080, Workers=4.',
				'WithDebug sets Debug to true, WithPort sets Port to 3000.',
				'Workers is not overridden, so it stays at the default of 4.',
			],
			concepts: ['functional-options', 'defaults', 'output-prediction'],
		},
		{
			id: 'go-patterns-17',
			title: 'Predict Observer Execution Order',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict the order in which event handlers fire.',
			skeleton: `package main

import "fmt"

type SimpleBus struct {
	handlers []func(string)
}

func (b *SimpleBus) On(h func(string)) {
	b.handlers = append(b.handlers, h)
}

func (b *SimpleBus) Emit(data string) {
	for _, h := range b.handlers {
		h(data)
	}
}

func main() {
	bus := &SimpleBus{}
	bus.On(func(d string) { fmt.Printf("A:%s ", d) })
	bus.On(func(d string) { fmt.Printf("B:%s ", d) })
	bus.On(func(d string) { fmt.Printf("C:%s ", d) })
	bus.Emit("1")
	fmt.Println()
	bus.Emit("2")
}`,
			solution: `A:1 B:1 C:1 
A:2 B:2 C:2 `,
			hints: [
				'Handlers are stored in a slice and execute in order.',
				'Each Emit call iterates through all handlers sequentially.',
				'First emit passes "1" to A, B, C; second passes "2".',
			],
			concepts: ['observer-pattern', 'execution-order', 'output-prediction'],
		},
		{
			id: 'go-patterns-18',
			title: 'Predict Builder Chain',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict the output of a builder chain with overrides.',
			skeleton: `package main

import (
	"fmt"
	"strings"
)

type QB struct {
	parts []string
}

func New() *QB              { return &QB{} }
func (q *QB) Select(s string) *QB { q.parts = append(q.parts, "SELECT "+s); return q }
func (q *QB) From(s string) *QB   { q.parts = append(q.parts, "FROM "+s); return q }
func (q *QB) Where(s string) *QB  { q.parts = append(q.parts, "WHERE "+s); return q }
func (q *QB) Build() string { return strings.Join(q.parts, " ") }

func main() {
	q := New().Select("*").From("users").Where("active = true").Build()
	fmt.Println(q)
}`,
			solution: `SELECT * FROM users WHERE active = true`,
			hints: [
				'Each method appends its keyword and value to the parts slice.',
				'Build joins all parts with spaces.',
				'The chain builds: SELECT * | FROM users | WHERE active = true.',
			],
			concepts: ['builder-pattern', 'method-chaining', 'output-prediction'],
		},
		{
			id: 'go-patterns-19',
			title: 'Refactor God Object to Strategy',
			type: 'refactor',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Refactor a god object with a giant switch into strategy pattern.',
			skeleton: `package main

import (
	"fmt"
	"strings"
)

type Formatter struct {
	format string
}

func (f *Formatter) Format(data map[string]string) string {
	switch f.format {
	case "json":
		parts := make([]string, 0)
		for k, v := range data {
			parts = append(parts, fmt.Sprintf("\\"%s\\": \\"%s\\"", k, v))
		}
		return "{" + strings.Join(parts, ", ") + "}"
	case "csv":
		keys := make([]string, 0)
		vals := make([]string, 0)
		for k, v := range data {
			keys = append(keys, k)
			vals = append(vals, v)
		}
		return strings.Join(keys, ",") + "\\n" + strings.Join(vals, ",")
	case "xml":
		parts := make([]string, 0)
		for k, v := range data {
			parts = append(parts, fmt.Sprintf("<%s>%s</%s>", k, v, k))
		}
		return "<root>" + strings.Join(parts, "") + "</root>"
	default:
		return ""
	}
}

func main() {
	data := map[string]string{"name": "Alice", "age": "30"}
	f := &Formatter{format: "json"}
	fmt.Println(f.Format(data))
}`,
			solution: `package main

import (
	"fmt"
	"strings"
)

type FormatStrategy interface {
	Format(data map[string]string) string
}

type JSONFormatter struct{}

func (j JSONFormatter) Format(data map[string]string) string {
	parts := make([]string, 0)
	for k, v := range data {
		parts = append(parts, fmt.Sprintf("\\"%s\\": \\"%s\\"", k, v))
	}
	return "{" + strings.Join(parts, ", ") + "}"
}

type CSVFormatter struct{}

func (c CSVFormatter) Format(data map[string]string) string {
	keys := make([]string, 0)
	vals := make([]string, 0)
	for k, v := range data {
		keys = append(keys, k)
		vals = append(vals, v)
	}
	return strings.Join(keys, ",") + "\\n" + strings.Join(vals, ",")
}

type XMLFormatter struct{}

func (x XMLFormatter) Format(data map[string]string) string {
	parts := make([]string, 0)
	for k, v := range data {
		parts = append(parts, fmt.Sprintf("<%s>%s</%s>", k, v, k))
	}
	return "<root>" + strings.Join(parts, "") + "</root>"
}

type Formatter struct {
	strategy FormatStrategy
}

func NewFormatter(strategy FormatStrategy) *Formatter {
	return &Formatter{strategy: strategy}
}

func (f *Formatter) Format(data map[string]string) string {
	return f.strategy.Format(data)
}

func main() {
	data := map[string]string{"name": "Alice", "age": "30"}
	f := NewFormatter(JSONFormatter{})
	fmt.Println(f.Format(data))
}`,
			hints: [
				'Extract each case into its own struct implementing a FormatStrategy interface.',
				'The Formatter holds a strategy and delegates to it.',
				'New formats can be added without modifying existing code (Open/Closed principle).',
			],
			concepts: ['strategy-pattern', 'refactoring', 'open-closed-principle'],
		},
		{
			id: 'go-patterns-20',
			title: 'Refactor to Functional Options with Validation',
			type: 'refactor',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Refactor a config constructor with many parameters to functional options with validation.',
			skeleton: `package main

import (
	"fmt"
	"time"
)

type HTTPClient struct {
	baseURL     string
	timeout     time.Duration
	maxRetries  int
	headers     map[string]string
	rateLimit   int
	bearerToken string
}

func NewHTTPClient(baseURL string, timeout time.Duration, maxRetries int, headers map[string]string, rateLimit int, bearerToken string) (*HTTPClient, error) {
	if baseURL == "" {
		return nil, fmt.Errorf("baseURL is required")
	}
	if timeout <= 0 {
		timeout = 30 * time.Second
	}
	if maxRetries < 0 {
		maxRetries = 0
	}
	if maxRetries > 10 {
		return nil, fmt.Errorf("maxRetries cannot exceed 10")
	}
	if rateLimit < 0 {
		return nil, fmt.Errorf("rateLimit must be non-negative")
	}
	if headers == nil {
		headers = make(map[string]string)
	}
	return &HTTPClient{
		baseURL:     baseURL,
		timeout:     timeout,
		maxRetries:  maxRetries,
		headers:     headers,
		rateLimit:   rateLimit,
		bearerToken: bearerToken,
	}, nil
}

func main() {
	c, err := NewHTTPClient("https://api.example.com", 10*time.Second, 3, nil, 100, "token123")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("URL: %s, Timeout: %v\\n", c.baseURL, c.timeout)
}`,
			solution: `package main

import (
	"fmt"
	"time"
)

type HTTPClient struct {
	baseURL     string
	timeout     time.Duration
	maxRetries  int
	headers     map[string]string
	rateLimit   int
	bearerToken string
}

type ClientOption func(*HTTPClient) error

func WithTimeout(d time.Duration) ClientOption {
	return func(c *HTTPClient) error {
		if d <= 0 {
			return fmt.Errorf("timeout must be positive")
		}
		c.timeout = d
		return nil
	}
}

func WithMaxRetries(n int) ClientOption {
	return func(c *HTTPClient) error {
		if n < 0 {
			return fmt.Errorf("maxRetries must be non-negative")
		}
		if n > 10 {
			return fmt.Errorf("maxRetries cannot exceed 10")
		}
		c.maxRetries = n
		return nil
	}
}

func WithHeader(key, value string) ClientOption {
	return func(c *HTTPClient) error {
		c.headers[key] = value
		return nil
	}
}

func WithRateLimit(rps int) ClientOption {
	return func(c *HTTPClient) error {
		if rps < 0 {
			return fmt.Errorf("rateLimit must be non-negative")
		}
		c.rateLimit = rps
		return nil
	}
}

func WithBearerToken(token string) ClientOption {
	return func(c *HTTPClient) error {
		c.bearerToken = token
		return nil
	}
}

func NewHTTPClient(baseURL string, opts ...ClientOption) (*HTTPClient, error) {
	if baseURL == "" {
		return nil, fmt.Errorf("baseURL is required")
	}
	c := &HTTPClient{
		baseURL:    baseURL,
		timeout:    30 * time.Second,
		maxRetries: 3,
		headers:    make(map[string]string),
		rateLimit:  0,
	}
	for _, opt := range opts {
		if err := opt(c); err != nil {
			return nil, err
		}
	}
	return c, nil
}

func main() {
	c, err := NewHTTPClient("https://api.example.com",
		WithTimeout(10*time.Second),
		WithMaxRetries(3),
		WithRateLimit(100),
		WithBearerToken("token123"),
	)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("URL: %s, Timeout: %v\\n", c.baseURL, c.timeout)
}`,
			hints: [
				'Change options to return error for validation: func(*HTTPClient) error.',
				'Each With* function validates its input and returns an error if invalid.',
				'NewHTTPClient checks each option error and returns early if one fails.',
			],
			concepts: ['functional-options', 'validation', 'refactoring', 'clean-api'],
		},
	],
};
