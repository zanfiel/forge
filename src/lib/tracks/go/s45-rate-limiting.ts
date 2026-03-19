import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
	id: 'go-rlim',
	title: '45. Rate Limiting',
	explanation: `## Rate Limiting in Go

Rate limiting controls the frequency of operations to prevent overload.

### Basic Rate Limiting with time.Tick

\`\`\`go
limiter := time.Tick(200 * time.Millisecond)
for _, req := range requests {
    <-limiter // wait for tick
    handle(req)
}
\`\`\`

### Token Bucket with Buffered Channel

\`\`\`go
// Allow bursts of 3, then 1 per 200ms
bursty := make(chan time.Time, 3)
// Pre-fill burst tokens
for i := 0; i < 3; i++ {
    bursty <- time.Now()
}
// Refill at steady rate
go func() {
    for t := range time.Tick(200 * time.Millisecond) {
        bursty <- t
    }
}()

for _, req := range requests {
    <-bursty
    handle(req)
}
\`\`\`

### golang.org/x/time/rate

\`\`\`go
import "golang.org/x/time/rate"

// 5 events per second, burst of 10
limiter := rate.NewLimiter(5, 10)

// Block until allowed
limiter.Wait(ctx) // or WaitN(ctx, n)

// Check without blocking
if limiter.Allow() {
    handle(req)
}

// Reserve a future token
r := limiter.Reserve()
time.Sleep(r.Delay())
\`\`\`

### Per-Client Rate Limiting

\`\`\`go
type ClientLimiter struct {
    mu       sync.Mutex
    limiters map[string]*rate.Limiter
}

func (cl *ClientLimiter) GetLimiter(clientID string) *rate.Limiter {
    cl.mu.Lock()
    defer cl.mu.Unlock()
    if l, ok := cl.limiters[clientID]; ok {
        return l
    }
    l := rate.NewLimiter(10, 20)
    cl.limiters[clientID] = l
    return l
}
\`\`\`

### HTTP Middleware

\`\`\`go
func rateLimitMiddleware(limiter *rate.Limiter) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            if !limiter.Allow() {
                http.Error(w, "Too Many Requests", http.StatusTooManyRequests)
                return
            }
            next.ServeHTTP(w, r)
        })
    }
}
\`\`\``,
	exercises: [
		{
			id: 'go-rlim-1',
			title: 'Basic Time.Tick Limiter',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Use time.Tick to rate limit request processing.',
			skeleton: `package main

import (
    "fmt"
    "time"
)

func main() {
    requests := []int{1, 2, 3, 4, 5}
    limiter := __BLANK__

    for _, req := range requests {
        <-limiter
        fmt.Println("handling request", req)
    }
}`,
			solution: `package main

import (
    "fmt"
    "time"
)

func main() {
    requests := []int{1, 2, 3, 4, 5}
    limiter := time.Tick(200 * time.Millisecond)

    for _, req := range requests {
        <-limiter
        fmt.Println("handling request", req)
    }
}`,
			hints: [
				'time.Tick returns a channel that sends at regular intervals.',
				'The interval controls the rate.',
				'Replace __BLANK__ with time.Tick(200 * time.Millisecond)'
			],
			concepts: ['time-tick', 'rate-limiting', 'channel']
		},
		{
			id: 'go-rlim-2',
			title: 'Burst Token Pre-Fill',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Pre-fill a buffered channel to allow burst capacity.',
			skeleton: `package main

import (
    "fmt"
    "time"
)

func main() {
    bursty := make(chan struct{}, __BLANK__)

    // Pre-fill 3 burst tokens
    for i := 0; i < 3; i++ {
        bursty <- struct{}{}
    }

    // Steady refill
    go func() {
        for range time.Tick(500 * time.Millisecond) {
            bursty <- struct{}{}
        }
    }()

    for i := 1; i <= 6; i++ {
        <-bursty
        fmt.Println("request", i, "at", time.Now().Format("15:04:05.000"))
    }
}`,
			solution: `package main

import (
    "fmt"
    "time"
)

func main() {
    bursty := make(chan struct{}, 3)

    // Pre-fill 3 burst tokens
    for i := 0; i < 3; i++ {
        bursty <- struct{}{}
    }

    // Steady refill
    go func() {
        for range time.Tick(500 * time.Millisecond) {
            bursty <- struct{}{}
        }
    }()

    for i := 1; i <= 6; i++ {
        <-bursty
        fmt.Println("request", i, "at", time.Now().Format("15:04:05.000"))
    }
}`,
			hints: [
				'The buffer size determines the burst capacity.',
				'3 burst tokens means buffer size of 3.',
				'Replace __BLANK__ with 3'
			],
			concepts: ['token-bucket', 'burst', 'buffered-channel']
		},
		{
			id: 'go-rlim-3',
			title: 'Rate Limiter Allow',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Use rate.Limiter.Allow() for non-blocking rate check.',
			skeleton: `package main

import (
    "fmt"
    "golang.org/x/time/rate"
)

func main() {
    // 2 events per second, burst of 5
    limiter := rate.NewLimiter(2, 5)

    allowed := 0
    denied := 0

    for i := 0; i < 10; i++ {
        if __BLANK__ {
            allowed++
        } else {
            denied++
        }
    }

    fmt.Printf("allowed: %d, denied: %d\\n", allowed, denied)
}`,
			solution: `package main

import (
    "fmt"
    "golang.org/x/time/rate"
)

func main() {
    // 2 events per second, burst of 5
    limiter := rate.NewLimiter(2, 5)

    allowed := 0
    denied := 0

    for i := 0; i < 10; i++ {
        if limiter.Allow() {
            allowed++
        } else {
            denied++
        }
    }

    fmt.Printf("allowed: %d, denied: %d\\n", allowed, denied)
}`,
			hints: [
				'limiter.Allow() checks if an event is allowed right now.',
				'It returns true if a token is available.',
				'Replace __BLANK__ with limiter.Allow()'
			],
			concepts: ['rate-limiter', 'allow', 'token-bucket']
		},
		{
			id: 'go-rlim-4',
			title: 'Rate Limiter Wait',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Use rate.Limiter.Wait() to block until allowed.',
			skeleton: `package main

import (
    "context"
    "fmt"
    "golang.org/x/time/rate"
    "time"
)

func main() {
    limiter := rate.NewLimiter(rate.Every(100*time.Millisecond), 1)
    ctx := context.Background()

    for i := 1; i <= 5; i++ {
        err := __BLANK__
        if err != nil {
            fmt.Println("error:", err)
            return
        }
        fmt.Println("event", i)
    }
}`,
			solution: `package main

import (
    "context"
    "fmt"
    "golang.org/x/time/rate"
    "time"
)

func main() {
    limiter := rate.NewLimiter(rate.Every(100*time.Millisecond), 1)
    ctx := context.Background()

    for i := 1; i <= 5; i++ {
        err := limiter.Wait(ctx)
        if err != nil {
            fmt.Println("error:", err)
            return
        }
        fmt.Println("event", i)
    }
}`,
			hints: [
				'limiter.Wait(ctx) blocks until a token is available.',
				'It respects context cancellation.',
				'Replace __BLANK__ with limiter.Wait(ctx)'
			],
			concepts: ['rate-limiter', 'wait', 'context']
		},
		{
			id: 'go-rlim-5',
			title: 'Rate.Every Helper',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Use rate.Every to set the rate from an interval.',
			skeleton: `package main

import (
    "fmt"
    "golang.org/x/time/rate"
    "time"
)

func main() {
    // One event every 500ms = 2 per second
    limit := __BLANK__
    limiter := rate.NewLimiter(limit, 1)
    fmt.Println("rate:", limiter.Limit())
    fmt.Println("burst:", limiter.Burst())
}`,
			solution: `package main

import (
    "fmt"
    "golang.org/x/time/rate"
    "time"
)

func main() {
    // One event every 500ms = 2 per second
    limit := rate.Every(500 * time.Millisecond)
    limiter := rate.NewLimiter(limit, 1)
    fmt.Println("rate:", limiter.Limit())
    fmt.Println("burst:", limiter.Burst())
}`,
			hints: [
				'rate.Every converts a duration to a rate.Limit.',
				'500ms interval means 2 events per second.',
				'Replace __BLANK__ with rate.Every(500 * time.Millisecond)'
			],
			concepts: ['rate-every', 'limit', 'conversion']
		},
		{
			id: 'go-rlim-6',
			title: 'Limiter SetLimit Dynamic',
			type: 'fill-blank',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Dynamically adjust rate limit at runtime.',
			skeleton: `package main

import (
    "fmt"
    "golang.org/x/time/rate"
)

func main() {
    limiter := rate.NewLimiter(10, 5)
    fmt.Println("initial rate:", limiter.Limit())

    // Reduce rate to 2 per second
    __BLANK__
    fmt.Println("new rate:", limiter.Limit())

    // Increase burst to 20
    limiter.SetBurst(20)
    fmt.Println("new burst:", limiter.Burst())
}`,
			solution: `package main

import (
    "fmt"
    "golang.org/x/time/rate"
)

func main() {
    limiter := rate.NewLimiter(10, 5)
    fmt.Println("initial rate:", limiter.Limit())

    // Reduce rate to 2 per second
    limiter.SetLimit(2)
    fmt.Println("new rate:", limiter.Limit())

    // Increase burst to 20
    limiter.SetBurst(20)
    fmt.Println("new burst:", limiter.Burst())
}`,
			hints: [
				'rate.Limiter has SetLimit and SetBurst methods.',
				'These can be called concurrently and take effect immediately.',
				'Replace __BLANK__ with limiter.SetLimit(2)'
			],
			concepts: ['dynamic-rate', 'set-limit', 'adaptive']
		},
		{
			id: 'go-rlim-7',
			title: 'Token Bucket Implementation',
			type: 'write-function',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Implement a simple token bucket rate limiter.',
			skeleton: `package main

import (
    "fmt"
    "sync"
    "time"
)

type TokenBucket struct {
    mu       sync.Mutex
    tokens   int
    max      int
    interval time.Duration
    stop     chan struct{}
}

// NewTokenBucket creates a bucket with max tokens, refilling one per interval.
func NewTokenBucket(max int, interval time.Duration) *TokenBucket {
    // TODO: implement - create bucket, start refill goroutine
}

// Take removes one token. Returns true if successful, false if empty.
func (tb *TokenBucket) Take() bool {
    // TODO: implement
}

// Stop stops the refill goroutine.
func (tb *TokenBucket) Stop() {
    close(tb.stop)
}

func main() {
    tb := NewTokenBucket(3, 100*time.Millisecond)
    defer tb.Stop()

    for i := 0; i < 5; i++ {
        if tb.Take() {
            fmt.Println(i, "allowed")
        } else {
            fmt.Println(i, "denied")
        }
    }
}`,
			solution: `package main

import (
    "fmt"
    "sync"
    "time"
)

type TokenBucket struct {
    mu       sync.Mutex
    tokens   int
    max      int
    interval time.Duration
    stop     chan struct{}
}

// NewTokenBucket creates a bucket with max tokens, refilling one per interval.
func NewTokenBucket(max int, interval time.Duration) *TokenBucket {
    tb := &TokenBucket{
        tokens:   max,
        max:      max,
        interval: interval,
        stop:     make(chan struct{}),
    }
    go func() {
        ticker := time.NewTicker(interval)
        defer ticker.Stop()
        for {
            select {
            case <-tb.stop:
                return
            case <-ticker.C:
                tb.mu.Lock()
                if tb.tokens < tb.max {
                    tb.tokens++
                }
                tb.mu.Unlock()
            }
        }
    }()
    return tb
}

// Take removes one token. Returns true if successful, false if empty.
func (tb *TokenBucket) Take() bool {
    tb.mu.Lock()
    defer tb.mu.Unlock()
    if tb.tokens > 0 {
        tb.tokens--
        return true
    }
    return false
}

// Stop stops the refill goroutine.
func (tb *TokenBucket) Stop() {
    close(tb.stop)
}

func main() {
    tb := NewTokenBucket(3, 100*time.Millisecond)
    defer tb.Stop()

    for i := 0; i < 5; i++ {
        if tb.Take() {
            fmt.Println(i, "allowed")
        } else {
            fmt.Println(i, "denied")
        }
    }
}`,
			hints: [
				'Start with tokens = max, refill one per interval.',
				'Use a mutex to protect the token count.',
				'A ticker goroutine adds tokens up to max.'
			],
			concepts: ['token-bucket', 'mutex', 'ticker']
		},
		{
			id: 'go-rlim-8',
			title: 'Sliding Window Counter',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Implement a sliding window rate counter.',
			skeleton: `package main

import (
    "fmt"
    "sync"
    "time"
)

type SlidingWindow struct {
    mu       sync.Mutex
    window   time.Duration
    maxReqs  int
    requests []time.Time
}

// NewSlidingWindow creates a limiter allowing maxReqs in the given window.
func NewSlidingWindow(maxReqs int, window time.Duration) *SlidingWindow {
    // TODO: implement
}

// Allow checks if a new request is permitted, recording it if so.
func (sw *SlidingWindow) Allow() bool {
    // TODO: implement - remove expired entries, check count
}

func main() {
    sw := NewSlidingWindow(3, 1*time.Second)

    for i := 0; i < 5; i++ {
        if sw.Allow() {
            fmt.Println(i, "allowed")
        } else {
            fmt.Println(i, "denied")
        }
    }
}`,
			solution: `package main

import (
    "fmt"
    "sync"
    "time"
)

type SlidingWindow struct {
    mu       sync.Mutex
    window   time.Duration
    maxReqs  int
    requests []time.Time
}

// NewSlidingWindow creates a limiter allowing maxReqs in the given window.
func NewSlidingWindow(maxReqs int, window time.Duration) *SlidingWindow {
    return &SlidingWindow{
        window:  window,
        maxReqs: maxReqs,
    }
}

// Allow checks if a new request is permitted, recording it if so.
func (sw *SlidingWindow) Allow() bool {
    sw.mu.Lock()
    defer sw.mu.Unlock()

    now := time.Now()
    cutoff := now.Add(-sw.window)

    // Remove expired requests
    valid := sw.requests[:0]
    for _, t := range sw.requests {
        if t.After(cutoff) {
            valid = append(valid, t)
        }
    }
    sw.requests = valid

    if len(sw.requests) >= sw.maxReqs {
        return false
    }

    sw.requests = append(sw.requests, now)
    return true
}

func main() {
    sw := NewSlidingWindow(3, 1*time.Second)

    for i := 0; i < 5; i++ {
        if sw.Allow() {
            fmt.Println(i, "allowed")
        } else {
            fmt.Println(i, "denied")
        }
    }
}`,
			hints: [
				'Remove timestamps older than now - window.',
				'If remaining count < maxReqs, allow and record the timestamp.',
				'Use a mutex for thread safety.'
			],
			concepts: ['sliding-window', 'rate-limiting', 'time-based']
		},
		{
			id: 'go-rlim-9',
			title: 'Per-Client Rate Limiter',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Implement per-client rate limiting with a map of limiters.',
			skeleton: `package main

import (
    "fmt"
    "golang.org/x/time/rate"
    "sync"
)

type ClientLimiter struct {
    mu       sync.Mutex
    limiters map[string]*rate.Limiter
    rate     rate.Limit
    burst    int
}

// NewClientLimiter creates a per-client limiter factory.
func NewClientLimiter(r rate.Limit, burst int) *ClientLimiter {
    // TODO: implement
}

// GetLimiter returns the rate limiter for a client, creating one if needed.
func (cl *ClientLimiter) GetLimiter(clientID string) *rate.Limiter {
    // TODO: implement
}

func main() {
    cl := NewClientLimiter(5, 10)

    clients := []string{"alice", "bob", "alice", "bob", "alice"}
    for _, id := range clients {
        limiter := cl.GetLimiter(id)
        if limiter.Allow() {
            fmt.Printf("%s: allowed\\n", id)
        } else {
            fmt.Printf("%s: denied\\n", id)
        }
    }
}`,
			solution: `package main

import (
    "fmt"
    "golang.org/x/time/rate"
    "sync"
)

type ClientLimiter struct {
    mu       sync.Mutex
    limiters map[string]*rate.Limiter
    rate     rate.Limit
    burst    int
}

// NewClientLimiter creates a per-client limiter factory.
func NewClientLimiter(r rate.Limit, burst int) *ClientLimiter {
    return &ClientLimiter{
        limiters: make(map[string]*rate.Limiter),
        rate:     r,
        burst:    burst,
    }
}

// GetLimiter returns the rate limiter for a client, creating one if needed.
func (cl *ClientLimiter) GetLimiter(clientID string) *rate.Limiter {
    cl.mu.Lock()
    defer cl.mu.Unlock()
    if l, ok := cl.limiters[clientID]; ok {
        return l
    }
    l := rate.NewLimiter(cl.rate, cl.burst)
    cl.limiters[clientID] = l
    return l
}

func main() {
    cl := NewClientLimiter(5, 10)

    clients := []string{"alice", "bob", "alice", "bob", "alice"}
    for _, id := range clients {
        limiter := cl.GetLimiter(id)
        if limiter.Allow() {
            fmt.Printf("%s: allowed\\n", id)
        } else {
            fmt.Printf("%s: denied\\n", id)
        }
    }
}`,
			hints: [
				'Use a map to store per-client rate.Limiter instances.',
				'Create a new limiter if the client ID is not found.',
				'Protect the map with a mutex.'
			],
			concepts: ['per-client', 'rate-limiter', 'map', 'mutex']
		},
		{
			id: 'go-rlim-10',
			title: 'Rate Limit HTTP Middleware',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Write HTTP middleware that rate limits requests.',
			skeleton: `package main

import (
    "fmt"
    "golang.org/x/time/rate"
    "net/http"
)

// rateLimitMiddleware returns middleware that limits requests.
// Returns 429 Too Many Requests when the limit is exceeded.
func rateLimitMiddleware(limiter *rate.Limiter) func(http.Handler) http.Handler {
    // TODO: implement
}

func main() {
    limiter := rate.NewLimiter(10, 20)
    mux := http.NewServeMux()
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "OK")
    })

    handler := rateLimitMiddleware(limiter)(mux)
    fmt.Println("server with rate limiting ready")
    _ = handler
}`,
			solution: `package main

import (
    "fmt"
    "golang.org/x/time/rate"
    "net/http"
)

// rateLimitMiddleware returns middleware that limits requests.
// Returns 429 Too Many Requests when the limit is exceeded.
func rateLimitMiddleware(limiter *rate.Limiter) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            if !limiter.Allow() {
                http.Error(w, "Too Many Requests", http.StatusTooManyRequests)
                return
            }
            next.ServeHTTP(w, r)
        })
    }
}

func main() {
    limiter := rate.NewLimiter(10, 20)
    mux := http.NewServeMux()
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "OK")
    })

    handler := rateLimitMiddleware(limiter)(mux)
    fmt.Println("server with rate limiting ready")
    _ = handler
}`,
			hints: [
				'Return a function that wraps an http.Handler.',
				'Check limiter.Allow() before calling next.',
				'Return 429 status if the limit is exceeded.'
			],
			concepts: ['http-middleware', 'rate-limiter', '429-status']
		},
		{
			id: 'go-rlim-11',
			title: 'Leaky Bucket',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Implement a leaky bucket rate limiter using a goroutine.',
			skeleton: `package main

import (
    "fmt"
    "time"
)

// LeakyBucket accepts requests into a fixed-size queue.
// Requests drain at a fixed rate.
type LeakyBucket struct {
    queue chan struct{}
    stop  chan struct{}
}

// NewLeakyBucket creates a bucket with given capacity and drain rate.
func NewLeakyBucket(capacity int, drainInterval time.Duration) *LeakyBucket {
    // TODO: implement - create bucket, start drain goroutine
}

// Submit tries to add a request. Returns false if the bucket is full.
func (lb *LeakyBucket) Submit() bool {
    // TODO: implement
}

// Stop stops the drain goroutine.
func (lb *LeakyBucket) Stop() {
    close(lb.stop)
}

func main() {
    lb := NewLeakyBucket(3, 100*time.Millisecond)
    defer lb.Stop()

    for i := 0; i < 5; i++ {
        if lb.Submit() {
            fmt.Println(i, "accepted")
        } else {
            fmt.Println(i, "rejected")
        }
    }
}`,
			solution: `package main

import (
    "fmt"
    "time"
)

// LeakyBucket accepts requests into a fixed-size queue.
// Requests drain at a fixed rate.
type LeakyBucket struct {
    queue chan struct{}
    stop  chan struct{}
}

// NewLeakyBucket creates a bucket with given capacity and drain rate.
func NewLeakyBucket(capacity int, drainInterval time.Duration) *LeakyBucket {
    lb := &LeakyBucket{
        queue: make(chan struct{}, capacity),
        stop:  make(chan struct{}),
    }
    go func() {
        ticker := time.NewTicker(drainInterval)
        defer ticker.Stop()
        for {
            select {
            case <-lb.stop:
                return
            case <-ticker.C:
                select {
                case <-lb.queue:
                default:
                }
            }
        }
    }()
    return lb
}

// Submit tries to add a request. Returns false if the bucket is full.
func (lb *LeakyBucket) Submit() bool {
    select {
    case lb.queue <- struct{}{}:
        return true
    default:
        return false
    }
}

// Stop stops the drain goroutine.
func (lb *LeakyBucket) Stop() {
    close(lb.stop)
}

func main() {
    lb := NewLeakyBucket(3, 100*time.Millisecond)
    defer lb.Stop()

    for i := 0; i < 5; i++ {
        if lb.Submit() {
            fmt.Println(i, "accepted")
        } else {
            fmt.Println(i, "rejected")
        }
    }
}`,
			hints: [
				'Use a buffered channel as the queue.',
				'A ticker goroutine drains one item per interval.',
				'Submit uses select with default for non-blocking enqueue.'
			],
			concepts: ['leaky-bucket', 'ticker', 'non-blocking']
		},
		{
			id: 'go-rlim-12',
			title: 'Circuit Breaker',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Implement a simple circuit breaker that opens after consecutive failures.',
			skeleton: `package main

import (
    "errors"
    "fmt"
    "sync"
    "time"
)

type CircuitBreaker struct {
    mu          sync.Mutex
    failures    int
    threshold   int
    resetAfter  time.Duration
    openedAt    time.Time
    state       string // "closed", "open", "half-open"
}

// NewCircuitBreaker creates a breaker that opens after threshold failures.
func NewCircuitBreaker(threshold int, resetAfter time.Duration) *CircuitBreaker {
    // TODO: implement
}

// Execute runs fn if the circuit allows it.
// Returns the result of fn, or an error if the circuit is open.
func (cb *CircuitBreaker) Execute(fn func() error) error {
    // TODO: implement
}

func main() {
    cb := NewCircuitBreaker(3, 1*time.Second)

    for i := 0; i < 5; i++ {
        err := cb.Execute(func() error {
            return errors.New("service down")
        })
        if err != nil {
            fmt.Println(i, "error:", err)
        }
    }
}`,
			solution: `package main

import (
    "errors"
    "fmt"
    "sync"
    "time"
)

type CircuitBreaker struct {
    mu          sync.Mutex
    failures    int
    threshold   int
    resetAfter  time.Duration
    openedAt    time.Time
    state       string // "closed", "open", "half-open"
}

// NewCircuitBreaker creates a breaker that opens after threshold failures.
func NewCircuitBreaker(threshold int, resetAfter time.Duration) *CircuitBreaker {
    return &CircuitBreaker{
        threshold:  threshold,
        resetAfter: resetAfter,
        state:      "closed",
    }
}

// Execute runs fn if the circuit allows it.
// Returns the result of fn, or an error if the circuit is open.
func (cb *CircuitBreaker) Execute(fn func() error) error {
    cb.mu.Lock()
    if cb.state == "open" {
        if time.Since(cb.openedAt) > cb.resetAfter {
            cb.state = "half-open"
        } else {
            cb.mu.Unlock()
            return errors.New("circuit breaker is open")
        }
    }
    cb.mu.Unlock()

    err := fn()

    cb.mu.Lock()
    defer cb.mu.Unlock()
    if err != nil {
        cb.failures++
        if cb.failures >= cb.threshold {
            cb.state = "open"
            cb.openedAt = time.Now()
        }
        return err
    }

    cb.failures = 0
    cb.state = "closed"
    return nil
}

func main() {
    cb := NewCircuitBreaker(3, 1*time.Second)

    for i := 0; i < 5; i++ {
        err := cb.Execute(func() error {
            return errors.New("service down")
        })
        if err != nil {
            fmt.Println(i, "error:", err)
        }
    }
}`,
			hints: [
				'Track failure count and transition to open after threshold.',
				'In open state, reject immediately unless resetAfter has passed.',
				'In half-open, allow one attempt and reset or re-open.'
			],
			concepts: ['circuit-breaker', 'state-machine', 'fault-tolerance']
		},
		{
			id: 'go-rlim-13',
			title: 'Ticker Leak',
			type: 'fix-bug',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Fix the ticker resource leak in a rate limiter.',
			skeleton: `package main

import (
    "fmt"
    "time"
)

func rateLimited(n int) {
    ticker := time.NewTicker(100 * time.Millisecond)

    for i := 0; i < n; i++ {
        <-ticker.C
        fmt.Println("tick", i)
    }
}

func main() {
    rateLimited(5)
    fmt.Println("done")
}`,
			solution: `package main

import (
    "fmt"
    "time"
)

func rateLimited(n int) {
    ticker := time.NewTicker(100 * time.Millisecond)
    defer ticker.Stop()

    for i := 0; i < n; i++ {
        <-ticker.C
        fmt.Println("tick", i)
    }
}

func main() {
    rateLimited(5)
    fmt.Println("done")
}`,
			hints: [
				'time.NewTicker must be stopped when no longer needed.',
				'Use defer ticker.Stop() after creating the ticker.',
				'Without Stop(), the ticker goroutine leaks.'
			],
			concepts: ['ticker', 'resource-leak', 'defer']
		},
		{
			id: 'go-rlim-14',
			title: 'Context Not Checked in Wait',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the rate limiter that ignores context cancellation.',
			skeleton: `package main

import (
    "context"
    "fmt"
    "time"
)

func processWithLimit(ctx context.Context, items []int) {
    ticker := time.NewTicker(100 * time.Millisecond)
    defer ticker.Stop()

    for _, item := range items {
        <-ticker.C
        fmt.Println("processing", item)
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 250*time.Millisecond)
    defer cancel()

    processWithLimit(ctx, []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
    fmt.Println("done")
}`,
			solution: `package main

import (
    "context"
    "fmt"
    "time"
)

func processWithLimit(ctx context.Context, items []int) {
    ticker := time.NewTicker(100 * time.Millisecond)
    defer ticker.Stop()

    for _, item := range items {
        select {
        case <-ctx.Done():
            fmt.Println("cancelled")
            return
        case <-ticker.C:
            fmt.Println("processing", item)
        }
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 250*time.Millisecond)
    defer cancel()

    processWithLimit(ctx, []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
    fmt.Println("done")
}`,
			hints: [
				'The function blocks on the ticker without checking ctx.',
				'Use select to check both ctx.Done() and ticker.C.',
				'Return early if the context is cancelled.'
			],
			concepts: ['context-cancellation', 'select', 'ticker']
		},
		{
			id: 'go-rlim-15',
			title: 'Race in Token Count',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the data race in a hand-rolled token counter.',
			skeleton: `package main

import (
    "fmt"
    "sync"
    "time"
)

type Limiter struct {
    tokens int
    max    int
}

func (l *Limiter) Take() bool {
    if l.tokens > 0 {
        l.tokens--
        return true
    }
    return false
}

func (l *Limiter) refill() {
    if l.tokens < l.max {
        l.tokens++
    }
}

func main() {
    l := &Limiter{tokens: 5, max: 5}

    go func() {
        for range time.Tick(50 * time.Millisecond) {
            l.refill()
        }
    }()

    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            if l.Take() {
                fmt.Println(n, "ok")
            }
        }(i)
    }
    wg.Wait()
}`,
			solution: `package main

import (
    "fmt"
    "sync"
    "time"
)

type Limiter struct {
    mu     sync.Mutex
    tokens int
    max    int
}

func (l *Limiter) Take() bool {
    l.mu.Lock()
    defer l.mu.Unlock()
    if l.tokens > 0 {
        l.tokens--
        return true
    }
    return false
}

func (l *Limiter) refill() {
    l.mu.Lock()
    defer l.mu.Unlock()
    if l.tokens < l.max {
        l.tokens++
    }
}

func main() {
    l := &Limiter{tokens: 5, max: 5}

    go func() {
        for range time.Tick(50 * time.Millisecond) {
            l.refill()
        }
    }()

    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            if l.Take() {
                fmt.Println(n, "ok")
            }
        }(i)
    }
    wg.Wait()
}`,
			hints: [
				'Multiple goroutines read and write tokens without synchronization.',
				'Add a sync.Mutex to protect the tokens field.',
				'Lock the mutex in both Take and refill.'
			],
			concepts: ['data-race', 'mutex', 'token-bucket']
		},
		{
			id: 'go-rlim-16',
			title: 'Predict Burst Behavior',
			type: 'predict-output',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Predict how many requests a bursty limiter allows immediately.',
			skeleton: `package main

import (
    "fmt"
    "golang.org/x/time/rate"
)

func main() {
    limiter := rate.NewLimiter(1, 5) // 1/s, burst 5

    allowed := 0
    for i := 0; i < 10; i++ {
        if limiter.Allow() {
            allowed++
        }
    }
    fmt.Println(allowed)
}`,
			solution: `5`,
			hints: [
				'Burst of 5 means 5 tokens available immediately.',
				'At rate 1/s, no time passes for refill in a tight loop.',
				'Exactly 5 of the 10 requests are allowed.'
			],
			concepts: ['burst', 'rate-limiter', 'token-bucket']
		},
		{
			id: 'go-rlim-17',
			title: 'Predict Rate Every',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict the rate value from rate.Every.',
			skeleton: `package main

import (
    "fmt"
    "golang.org/x/time/rate"
    "time"
)

func main() {
    r := rate.Every(250 * time.Millisecond)
    fmt.Println(r)
}`,
			solution: `4`,
			hints: [
				'rate.Every converts interval to events per second.',
				'250ms = 0.25 seconds per event.',
				'1 / 0.25 = 4 events per second.'
			],
			concepts: ['rate-every', 'conversion', 'rate-calculation']
		},
		{
			id: 'go-rlim-18',
			title: 'Predict Token Availability',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict token availability after consuming some.',
			skeleton: `package main

import (
    "fmt"
    "golang.org/x/time/rate"
)

func main() {
    limiter := rate.NewLimiter(rate.Inf, 0)
    fmt.Println(limiter.Allow())
    fmt.Println(limiter.Allow())
    fmt.Println(limiter.Allow())
}`,
			solution: `true
true
true`,
			hints: [
				'rate.Inf means infinite rate - always allow.',
				'With infinite rate, every Allow() returns true.',
				'Burst 0 is overridden by the infinite rate.'
			],
			concepts: ['rate-inf', 'unlimited', 'allow']
		},
		{
			id: 'go-rlim-19',
			title: 'Refactor Sleep to Ticker',
			type: 'refactor',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Refactor time.Sleep-based rate limiting to use a ticker.',
			skeleton: `package main

import (
    "fmt"
    "time"
)

func main() {
    items := []string{"a", "b", "c", "d", "e"}
    for _, item := range items {
        fmt.Println("processing", item)
        time.Sleep(200 * time.Millisecond)
    }
}`,
			solution: `package main

import (
    "fmt"
    "time"
)

func main() {
    items := []string{"a", "b", "c", "d", "e"}
    ticker := time.NewTicker(200 * time.Millisecond)
    defer ticker.Stop()

    for _, item := range items {
        <-ticker.C
        fmt.Println("processing", item)
    }
}`,
			hints: [
				'Replace time.Sleep with a ticker channel.',
				'Tickers provide more consistent timing.',
				'Remember to stop the ticker when done.'
			],
			concepts: ['ticker', 'refactoring', 'rate-limiting']
		},
		{
			id: 'go-rlim-20',
			title: 'Refactor to x/time/rate',
			type: 'refactor',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Refactor a hand-rolled rate limiter to use golang.org/x/time/rate.',
			skeleton: `package main

import (
    "fmt"
    "sync"
    "time"
)

type MyLimiter struct {
    mu       sync.Mutex
    tokens   int
    max      int
    interval time.Duration
}

func NewMyLimiter(rps int, burst int) *MyLimiter {
    l := &MyLimiter{tokens: burst, max: burst, interval: time.Second / time.Duration(rps)}
    go func() {
        for range time.Tick(l.interval) {
            l.mu.Lock()
            if l.tokens < l.max {
                l.tokens++
            }
            l.mu.Unlock()
        }
    }()
    return l
}

func (l *MyLimiter) Allow() bool {
    l.mu.Lock()
    defer l.mu.Unlock()
    if l.tokens > 0 {
        l.tokens--
        return true
    }
    return false
}

func main() {
    limiter := NewMyLimiter(10, 5)

    allowed := 0
    for i := 0; i < 10; i++ {
        if limiter.Allow() {
            allowed++
        }
    }
    fmt.Println("allowed:", allowed)
}`,
			solution: `package main

import (
    "fmt"
    "golang.org/x/time/rate"
)

func main() {
    limiter := rate.NewLimiter(10, 5)

    allowed := 0
    for i := 0; i < 10; i++ {
        if limiter.Allow() {
            allowed++
        }
    }
    fmt.Println("allowed:", allowed)
}`,
			hints: [
				'The rate package provides a production-quality token bucket.',
				'rate.NewLimiter(rps, burst) replaces the entire struct.',
				'limiter.Allow() works the same way.'
			],
			concepts: ['refactoring', 'rate-package', 'standard-library']
		}
	]
};
