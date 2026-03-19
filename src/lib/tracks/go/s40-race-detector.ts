import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-rce',
  title: '40. Race Detector',
  explanation: `## Go Race Detector

Go's race detector finds data races at runtime. A data race occurs when two goroutines access the same variable concurrently and at least one access is a write.

\`\`\`go
// Enable with -race flag
// go run -race main.go
// go test -race ./...
// go build -race -o myapp

// Classic data race
var counter int
go func() { counter++ }()
go func() { counter++ }()
// RACE: concurrent writes to counter

// Fixing with mutex
var mu sync.Mutex
go func() { mu.Lock(); counter++; mu.Unlock() }()
go func() { mu.Lock(); counter++; mu.Unlock() }()

// Fixing with atomic
var counter int64
go func() { atomic.AddInt64(&counter, 1) }()
go func() { atomic.AddInt64(&counter, 1) }()

// Fixing with channel
ch := make(chan int, 1)
ch <- 0
go func() { v := <-ch; ch <- v + 1 }()
\`\`\`

The race detector:
- Slows programs ~2-10x
- Uses ~5-10x more memory
- Only detects races that actually execute
- Should be used in CI/CD testing`,
  exercises: [
    {
      id: 'go-rce-1',
      title: 'Identify Data Race',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Identify and fix a basic data race with a mutex.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var mu sync.Mutex
    counter := 0
    var wg sync.WaitGroup

    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            mu.__BLANK__()
            counter++
            mu.Unlock()
        }()
    }
    wg.Wait()
    fmt.Println(counter)
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var mu sync.Mutex
    counter := 0
    var wg sync.WaitGroup

    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            mu.Lock()
            counter++
            mu.Unlock()
        }()
    }
    wg.Wait()
    fmt.Println(counter)
}`,
      hints: [
        'mu.Lock() acquires the mutex before accessing shared data.',
        'mu.Unlock() releases it after.',
        'This prevents concurrent access to counter.',
      ],
      concepts: ['data race', 'sync.Mutex', 'Lock'],
    },
    {
      id: 'go-rce-2',
      title: 'Atomic Counter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use atomic operations to avoid a data race.',
      skeleton: `package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

func main() {
    var counter int64
    var wg sync.WaitGroup

    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            atomic.__BLANK__(&counter, 1)
        }()
    }
    wg.Wait()
    fmt.Println(counter)
}`,
      solution: `package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

func main() {
    var counter int64
    var wg sync.WaitGroup

    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            atomic.AddInt64(&counter, 1)
        }()
    }
    wg.Wait()
    fmt.Println(counter)
}`,
      hints: [
        'atomic.AddInt64 atomically adds to an int64.',
        'Pass a pointer to the variable.',
        'Atomic operations are lock-free.',
      ],
      concepts: ['data race', 'sync/atomic', 'AddInt64'],
    },
    {
      id: 'go-rce-3',
      title: 'Race-Free Map Access',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use sync.RWMutex for concurrent map access.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

type SafeMap struct {
    mu sync.RWMutex
    m  map[string]int
}

func (s *SafeMap) Get(key string) (int, bool) {
    s.mu.__BLANK__()
    defer s.mu.RUnlock()
    v, ok := s.m[key]
    return v, ok
}

func (s *SafeMap) Set(key string, val int) {
    s.mu.Lock()
    defer s.mu.Unlock()
    s.m[key] = val
}

func main() {
    sm := SafeMap{m: make(map[string]int)}
    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            sm.Set(fmt.Sprintf("key%d", n), n)
        }(i)
    }
    wg.Wait()
    v, _ := sm.Get("key5")
    fmt.Println(v)
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

type SafeMap struct {
    mu sync.RWMutex
    m  map[string]int
}

func (s *SafeMap) Get(key string) (int, bool) {
    s.mu.RLock()
    defer s.mu.RUnlock()
    v, ok := s.m[key]
    return v, ok
}

func (s *SafeMap) Set(key string, val int) {
    s.mu.Lock()
    defer s.mu.Unlock()
    s.m[key] = val
}

func main() {
    sm := SafeMap{m: make(map[string]int)}
    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            sm.Set(fmt.Sprintf("key%d", n), n)
        }(i)
    }
    wg.Wait()
    v, _ := sm.Get("key5")
    fmt.Println(v)
}`,
      hints: [
        'RLock allows multiple concurrent readers.',
        'Lock is exclusive for writes.',
        'RWMutex is ideal for read-heavy workloads.',
      ],
      concepts: ['data race', 'sync.RWMutex', 'concurrent map'],
    },
    {
      id: 'go-rce-4',
      title: 'Channel-Based Synchronization',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use channels to eliminate a data race.',
      skeleton: `package main

import "fmt"

func main() {
    results := make(__BLANK__, 10)
    for i := 0; i < 10; i++ {
        go func(n int) {
            results <- n * n
        }(i)
    }

    sum := 0
    for i := 0; i < 10; i++ {
        sum += <-results
    }
    fmt.Println(sum)
}`,
      solution: `package main

import "fmt"

func main() {
    results := make(chan int, 10)
    for i := 0; i < 10; i++ {
        go func(n int) {
            results <- n * n
        }(i)
    }

    sum := 0
    for i := 0; i < 10; i++ {
        sum += <-results
    }
    fmt.Println(sum)
}`,
      hints: [
        'Channels provide safe communication between goroutines.',
        'Buffered channel avoids blocking on send.',
        'No shared memory = no data race.',
      ],
      concepts: ['data race', 'channels', 'communication'],
    },
    {
      id: 'go-rce-5',
      title: 'sync.Map Usage',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use sync.Map for concurrent-safe map operations.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var m sync.Map
    var wg sync.WaitGroup

    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            m.__BLANK__(fmt.Sprintf("key%d", n), n*n)
        }(i)
    }
    wg.Wait()

    m.Range(func(key, value interface{}) bool {
        fmt.Printf("%s: %d\\n", key, value)
        return true
    })
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var m sync.Map
    var wg sync.WaitGroup

    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            m.Store(fmt.Sprintf("key%d", n), n*n)
        }(i)
    }
    wg.Wait()

    m.Range(func(key, value interface{}) bool {
        fmt.Printf("%s: %d\\n", key, value)
        return true
    })
}`,
      hints: [
        'sync.Map.Store sets a key-value pair atomically.',
        'sync.Map.Load retrieves a value.',
        'sync.Map.Range iterates over all entries.',
      ],
      concepts: ['sync.Map', 'concurrent map'],
    },
    {
      id: 'go-rce-6',
      title: 'Once Initialization',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use sync.Once for race-free lazy initialization.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

var (
    instance *Config
    once     sync.Once
)

type Config struct {
    Value string
}

func GetConfig() *Config {
    once.__BLANK__(func() {
        fmt.Println("Initializing config...")
        instance = &Config{Value: "production"}
    })
    return instance
}

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            cfg := GetConfig()
            fmt.Println(cfg.Value)
        }()
    }
    wg.Wait()
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

var (
    instance *Config
    once     sync.Once
)

type Config struct {
    Value string
}

func GetConfig() *Config {
    once.Do(func() {
        fmt.Println("Initializing config...")
        instance = &Config{Value: "production"}
    })
    return instance
}

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            cfg := GetConfig()
            fmt.Println(cfg.Value)
        }()
    }
    wg.Wait()
}`,
      hints: [
        'sync.Once.Do executes the function exactly once.',
        'All concurrent callers wait for the first execution.',
        'Subsequent calls return immediately.',
      ],
      concepts: ['sync.Once', 'lazy initialization', 'singleton'],
    },
    {
      id: 'go-rce-7',
      title: 'Predict Race Outcome',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the result of a race-free counter.',
      skeleton: `package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

func main() {
    var counter int64
    var wg sync.WaitGroup

    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            atomic.AddInt64(&counter, 1)
        }()
    }
    wg.Wait()
    fmt.Println(counter)
}`,
      solution: `1000`,
      hints: [
        'Atomic operations guarantee no data race.',
        'Every AddInt64 succeeds exactly once.',
        '1000 goroutines each add 1 = 1000.',
      ],
      concepts: ['atomic', 'deterministic result'],
    },
    {
      id: 'go-rce-8',
      title: 'Predict Once Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict how many times sync.Once executes.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var once sync.Once
    count := 0

    for i := 0; i < 5; i++ {
        once.Do(func() {
            count++
        })
    }
    fmt.Println(count)
}`,
      solution: `1`,
      hints: [
        'sync.Once.Do only executes the function once.',
        'Subsequent calls are no-ops.',
        'count is only incremented once.',
      ],
      concepts: ['sync.Once', 'single execution'],
    },
    {
      id: 'go-rce-9',
      title: 'Predict Atomic Load',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the output of atomic load/store operations.',
      skeleton: `package main

import (
    "fmt"
    "sync/atomic"
)

func main() {
    var val int64 = 10
    atomic.StoreInt64(&val, 42)
    loaded := atomic.LoadInt64(&val)
    fmt.Println(loaded)

    old := atomic.SwapInt64(&val, 100)
    fmt.Println(old)
    fmt.Println(atomic.LoadInt64(&val))
}`,
      solution: `42
42
100`,
      hints: [
        'StoreInt64 atomically sets val to 42.',
        'LoadInt64 reads 42.',
        'SwapInt64 returns the old value (42) and sets to 100.',
      ],
      concepts: ['atomic', 'Store', 'Load', 'Swap'],
    },
    {
      id: 'go-rce-10',
      title: 'Fix Map Concurrent Write',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix a concurrent map write panic.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    // BUG: concurrent map writes cause panic
    m := make(map[int]int)
    var wg sync.WaitGroup

    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            m[n] = n * n
        }(i)
    }
    wg.Wait()
    fmt.Println(len(m))
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var mu sync.Mutex
    m := make(map[int]int)
    var wg sync.WaitGroup

    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            mu.Lock()
            m[n] = n * n
            mu.Unlock()
        }(i)
    }
    wg.Wait()
    fmt.Println(len(m))
}`,
      hints: [
        'Go maps are not safe for concurrent writes.',
        'Add a sync.Mutex to protect map writes.',
        'Lock before writing, unlock after.',
      ],
      concepts: ['data race', 'map', 'sync.Mutex'],
    },
    {
      id: 'go-rce-11',
      title: 'Fix Closure Variable Race',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix a data race from a loop variable closure.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    // BUG: All goroutines share the same loop variable
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            fmt.Println(i)
        }()
    }
    wg.Wait()
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            fmt.Println(n)
        }(i)
    }
    wg.Wait()
}`,
      hints: [
        'Pass the loop variable as a function argument.',
        'This creates a copy for each goroutine.',
        'Without the copy, all goroutines read the same variable.',
      ],
      concepts: ['data race', 'closure', 'loop variable'],
    },
    {
      id: 'go-rce-12',
      title: 'Fix Slice Append Race',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix a data race on concurrent slice appends.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var results []int
    var wg sync.WaitGroup

    // BUG: concurrent append to shared slice
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            results = append(results, n*n)
        }(i)
    }
    wg.Wait()
    fmt.Println(len(results))
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var mu sync.Mutex
    var results []int
    var wg sync.WaitGroup

    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            mu.Lock()
            results = append(results, n*n)
            mu.Unlock()
        }(i)
    }
    wg.Wait()
    fmt.Println(len(results))
}`,
      hints: [
        'Slice append is not atomic and not thread-safe.',
        'Protect with a mutex or use a channel to collect results.',
        'Lock before append, unlock after.',
      ],
      concepts: ['data race', 'slice append', 'sync.Mutex'],
    },
    {
      id: 'go-rce-13',
      title: 'Fix Read-Write Race',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix a race where one goroutine reads while another writes.',
      skeleton: `package main

import (
    "fmt"
    "sync"
    "time"
)

type Cache struct {
    data map[string]string
}

func (c *Cache) Get(key string) string {
    // BUG: reading without lock while Set writes
    return c.data[key]
}

func (c *Cache) Set(key, value string) {
    // BUG: writing without lock while Get reads
    c.data[key] = value
}

func main() {
    cache := &Cache{data: make(map[string]string)}
    var wg sync.WaitGroup

    // Writer
    wg.Add(1)
    go func() {
        defer wg.Done()
        for i := 0; i < 100; i++ {
            cache.Set("key", fmt.Sprintf("value%d", i))
        }
    }()

    // Reader
    wg.Add(1)
    go func() {
        defer wg.Done()
        for i := 0; i < 100; i++ {
            _ = cache.Get("key")
        }
    }()

    wg.Wait()
    fmt.Println(cache.Get("key"))
    _ = time.Now()
}`,
      solution: `package main

import (
    "fmt"
    "sync"
    "time"
)

type Cache struct {
    mu   sync.RWMutex
    data map[string]string
}

func (c *Cache) Get(key string) string {
    c.mu.RLock()
    defer c.mu.RUnlock()
    return c.data[key]
}

func (c *Cache) Set(key, value string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.data[key] = value
}

func main() {
    cache := &Cache{data: make(map[string]string)}
    var wg sync.WaitGroup

    wg.Add(1)
    go func() {
        defer wg.Done()
        for i := 0; i < 100; i++ {
            cache.Set("key", fmt.Sprintf("value%d", i))
        }
    }()

    wg.Add(1)
    go func() {
        defer wg.Done()
        for i := 0; i < 100; i++ {
            _ = cache.Get("key")
        }
    }()

    wg.Wait()
    fmt.Println(cache.Get("key"))
    _ = time.Now()
}`,
      hints: [
        'Add sync.RWMutex to the Cache struct.',
        'RLock for reads, Lock for writes.',
        'RWMutex allows concurrent reads but exclusive writes.',
      ],
      concepts: ['data race', 'RWMutex', 'read-write race'],
    },
    {
      id: 'go-rce-14',
      title: 'Concurrent Counter Service',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a race-free counter service using channels.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

type CounterService struct {
    incCh   chan struct{}
    getCh   chan chan int
    done    chan struct{}
}

// NewCounterService creates and starts a counter service.
// It uses channels instead of mutexes for synchronization.
func NewCounterService() *CounterService {
    // TODO: implement
}

func (cs *CounterService) Increment() {
    // TODO: implement
}

func (cs *CounterService) Value() int {
    // TODO: implement
}

func (cs *CounterService) Stop() {
    // TODO: implement
}

func main() {
    cs := NewCounterService()
    var wg sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            cs.Increment()
        }()
    }
    wg.Wait()
    fmt.Println(cs.Value())
    cs.Stop()
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

type CounterService struct {
    incCh chan struct{}
    getCh chan chan int
    done  chan struct{}
}

func NewCounterService() *CounterService {
    cs := &CounterService{
        incCh: make(chan struct{}),
        getCh: make(chan chan int),
        done:  make(chan struct{}),
    }
    go func() {
        count := 0
        for {
            select {
            case <-cs.incCh:
                count++
            case reply := <-cs.getCh:
                reply <- count
            case <-cs.done:
                return
            }
        }
    }()
    return cs
}

func (cs *CounterService) Increment() {
    cs.incCh <- struct{}{}
}

func (cs *CounterService) Value() int {
    reply := make(chan int)
    cs.getCh <- reply
    return <-reply
}

func (cs *CounterService) Stop() {
    close(cs.done)
}

func main() {
    cs := NewCounterService()
    var wg sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            cs.Increment()
        }()
    }
    wg.Wait()
    fmt.Println(cs.Value())
    cs.Stop()
}`,
      hints: [
        'Use a goroutine that owns the counter state.',
        'Increment sends on a channel; the goroutine increments.',
        'Value sends a reply channel and waits for the response.',
      ],
      concepts: ['channels', 'race-free design', 'CSP'],
    },
    {
      id: 'go-rce-15',
      title: 'Atomic Flag Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement an atomic boolean flag for shutdown signaling.',
      skeleton: `package main

import (
    "fmt"
    "sync"
    "sync/atomic"
    "time"
)

type ShutdownFlag struct {
    flag int32
}

// Set marks the flag as shutdown
func (s *ShutdownFlag) Set() {
    // TODO: implement atomically
}

// IsSet returns true if shutdown was requested
func (s *ShutdownFlag) IsSet() bool {
    // TODO: implement atomically
}

func main() {
    var shutdown ShutdownFlag
    var wg sync.WaitGroup

    // Start workers
    for i := 0; i < 3; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for !shutdown.IsSet() {
                fmt.Printf("Worker %d running\\n", id)
                time.Sleep(50 * time.Millisecond)
            }
            fmt.Printf("Worker %d stopped\\n", id)
        }(i)
    }

    time.Sleep(150 * time.Millisecond)
    shutdown.Set()
    wg.Wait()
    fmt.Println("All stopped")
}`,
      solution: `package main

import (
    "fmt"
    "sync"
    "sync/atomic"
    "time"
)

type ShutdownFlag struct {
    flag int32
}

func (s *ShutdownFlag) Set() {
    atomic.StoreInt32(&s.flag, 1)
}

func (s *ShutdownFlag) IsSet() bool {
    return atomic.LoadInt32(&s.flag) == 1
}

func main() {
    var shutdown ShutdownFlag
    var wg sync.WaitGroup

    for i := 0; i < 3; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for !shutdown.IsSet() {
                fmt.Printf("Worker %d running\\n", id)
                time.Sleep(50 * time.Millisecond)
            }
            fmt.Printf("Worker %d stopped\\n", id)
        }(i)
    }

    time.Sleep(150 * time.Millisecond)
    shutdown.Set()
    wg.Wait()
    fmt.Println("All stopped")
}`,
      hints: [
        'Use atomic.StoreInt32 to set the flag.',
        'Use atomic.LoadInt32 to read the flag.',
        'Compare to 1 to check if set.',
      ],
      concepts: ['atomic', 'flag pattern', 'shutdown signal'],
    },
    {
      id: 'go-rce-16',
      title: 'Race-Free Logger',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Build a thread-safe logger that collects messages from multiple goroutines.',
      skeleton: `package main

import (
    "fmt"
    "sync"
    "time"
)

type SafeLogger struct {
    // TODO: define fields
}

// NewSafeLogger creates a new thread-safe logger.
func NewSafeLogger() *SafeLogger {
    // TODO: implement
}

// Log adds a timestamped message.
func (l *SafeLogger) Log(msg string) {
    // TODO: implement (thread-safe)
}

// Messages returns all logged messages.
func (l *SafeLogger) Messages() []string {
    // TODO: implement (thread-safe)
}

func main() {
    logger := NewSafeLogger()
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            logger.Log(fmt.Sprintf("Worker %d started", id))
            time.Sleep(10 * time.Millisecond)
            logger.Log(fmt.Sprintf("Worker %d done", id))
        }(i)
    }
    wg.Wait()

    msgs := logger.Messages()
    fmt.Printf("Total messages: %d\\n", len(msgs))
}`,
      solution: `package main

import (
    "fmt"
    "sync"
    "time"
)

type SafeLogger struct {
    mu       sync.RWMutex
    messages []string
}

func NewSafeLogger() *SafeLogger {
    return &SafeLogger{}
}

func (l *SafeLogger) Log(msg string) {
    l.mu.Lock()
    defer l.mu.Unlock()
    l.messages = append(l.messages, fmt.Sprintf("[%s] %s", time.Now().Format("15:04:05.000"), msg))
}

func (l *SafeLogger) Messages() []string {
    l.mu.RLock()
    defer l.mu.RUnlock()
    result := make([]string, len(l.messages))
    copy(result, l.messages)
    return result
}

func main() {
    logger := NewSafeLogger()
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            logger.Log(fmt.Sprintf("Worker %d started", id))
            time.Sleep(10 * time.Millisecond)
            logger.Log(fmt.Sprintf("Worker %d done", id))
        }(i)
    }
    wg.Wait()

    msgs := logger.Messages()
    fmt.Printf("Total messages: %d\\n", len(msgs))
}`,
      hints: [
        'Use RWMutex: Lock for Log, RLock for Messages.',
        'Return a copy of messages to avoid race on the slice.',
        'copy() creates a snapshot of the current messages.',
      ],
      concepts: ['RWMutex', 'thread-safe logger', 'defensive copy'],
    },
    {
      id: 'go-rce-17',
      title: 'CompareAndSwap Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use atomic.CompareAndSwap for lock-free state transitions.',
      skeleton: `package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

const (
    StateIdle    int32 = 0
    StateRunning int32 = 1
    StateDone    int32 = 2
)

type Task struct {
    state int32
}

// Start transitions from Idle to Running. Returns false if not idle.
func (t *Task) Start() bool {
    // TODO: implement with CompareAndSwapInt32
}

// Complete transitions from Running to Done. Returns false if not running.
func (t *Task) Complete() bool {
    // TODO: implement with CompareAndSwapInt32
}

func (t *Task) State() int32 {
    return atomic.LoadInt32(&t.state)
}

func main() {
    task := &Task{}
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            if task.Start() {
                fmt.Printf("Worker %d started the task\\n", id)
                task.Complete()
                fmt.Printf("Worker %d completed the task\\n", id)
            } else {
                fmt.Printf("Worker %d: task already taken\\n", id)
            }
        }(i)
    }
    wg.Wait()
    fmt.Printf("Final state: %d\\n", task.State())
}`,
      solution: `package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

const (
    StateIdle    int32 = 0
    StateRunning int32 = 1
    StateDone    int32 = 2
)

type Task struct {
    state int32
}

func (t *Task) Start() bool {
    return atomic.CompareAndSwapInt32(&t.state, StateIdle, StateRunning)
}

func (t *Task) Complete() bool {
    return atomic.CompareAndSwapInt32(&t.state, StateRunning, StateDone)
}

func (t *Task) State() int32 {
    return atomic.LoadInt32(&t.state)
}

func main() {
    task := &Task{}
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            if task.Start() {
                fmt.Printf("Worker %d started the task\\n", id)
                task.Complete()
                fmt.Printf("Worker %d completed the task\\n", id)
            } else {
                fmt.Printf("Worker %d: task already taken\\n", id)
            }
        }(i)
    }
    wg.Wait()
    fmt.Printf("Final state: %d\\n", task.State())
}`,
      hints: [
        'CompareAndSwapInt32(addr, old, new) atomically checks and sets.',
        'Returns true if the swap happened.',
        'Only one goroutine can win the CAS.',
      ],
      concepts: ['atomic.CompareAndSwap', 'lock-free', 'state machine'],
    },
    {
      id: 'go-rce-18',
      title: 'Detect Race in Test',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a test that would fail under the race detector.',
      skeleton: `package main

import (
    "sync"
    "testing"
)

type Counter struct {
    n int
}

func (c *Counter) Inc() { c.n++ }
func (c *Counter) Val() int { return c.n }

// TestCounterRace should demonstrate a data race.
// This test would PASS without -race but FAIL with -race.
func TestCounterRace(t *testing.T) {
    // TODO: implement a test that creates a race condition
}

// TestCounterSafe should be race-free.
func TestCounterSafe(t *testing.T) {
    // TODO: implement a race-free version
}`,
      solution: `package main

import (
    "sync"
    "testing"
)

type Counter struct {
    n int
}

func (c *Counter) Inc() { c.n++ }
func (c *Counter) Val() int { return c.n }

func TestCounterRace(t *testing.T) {
    c := &Counter{}
    var wg sync.WaitGroup
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            c.Inc() // DATA RACE: concurrent write
        }()
    }
    wg.Wait()
    // Result is non-deterministic without synchronization
    t.Logf("Counter: %d (may not be 100)", c.Val())
}

func TestCounterSafe(t *testing.T) {
    var mu sync.Mutex
    c := &Counter{}
    var wg sync.WaitGroup
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            mu.Lock()
            c.Inc()
            mu.Unlock()
        }()
    }
    wg.Wait()
    if c.Val() != 100 {
        t.Errorf("expected 100, got %d", c.Val())
    }
}`,
      hints: [
        'Concurrent Inc() calls create a data race.',
        'The race detector finds this with go test -race.',
        'Add a mutex to make it safe.',
      ],
      concepts: ['race detector', 'testing', 'data race'],
    },
    {
      id: 'go-rce-19',
      title: 'Refactor Global Mutex to Channel',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor mutex-protected shared state to channel-based communication.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

var (
    mu      sync.Mutex
    balance int
)

func deposit(amount int) {
    mu.Lock()
    balance += amount
    mu.Unlock()
}

func withdraw(amount int) bool {
    mu.Lock()
    defer mu.Unlock()
    if balance >= amount {
        balance -= amount
        return true
    }
    return false
}

func getBalance() int {
    mu.Lock()
    defer mu.Unlock()
    return balance
}

func main() {
    deposit(100)
    deposit(50)
    withdraw(30)
    fmt.Println("Balance:", getBalance())
}`,
      solution: `package main

import "fmt"

type BankOp struct {
    kind   string
    amount int
    reply  chan interface{}
}

func bankService() chan BankOp {
    ops := make(chan BankOp)
    go func() {
        balance := 0
        for op := range ops {
            switch op.kind {
            case "deposit":
                balance += op.amount
                op.reply <- nil
            case "withdraw":
                if balance >= op.amount {
                    balance -= op.amount
                    op.reply <- true
                } else {
                    op.reply <- false
                }
            case "balance":
                op.reply <- balance
            }
        }
    }()
    return ops
}

func main() {
    ops := bankService()

    reply := make(chan interface{})
    ops <- BankOp{"deposit", 100, reply}
    <-reply
    ops <- BankOp{"deposit", 50, reply}
    <-reply
    ops <- BankOp{"withdraw", 30, reply}
    ok := <-reply
    fmt.Println("Withdraw ok:", ok)
    ops <- BankOp{"balance", 0, reply}
    bal := <-reply
    fmt.Println("Balance:", bal)
}`,
      hints: [
        'Replace the mutex with a channel-based service goroutine.',
        'The service goroutine owns the balance state.',
        'Operations are sent as messages with reply channels.',
      ],
      concepts: ['channels', 'CSP', 'refactoring', 'mutex elimination'],
    },
    {
      id: 'go-rce-20',
      title: 'Refactor sync.Map to Typed Safe Map',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor sync.Map usage to a type-safe wrapper with generics.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var m sync.Map

    // Store
    m.Store("alice", 100)
    m.Store("bob", 200)

    // Load requires type assertion
    if v, ok := m.Load("alice"); ok {
        balance := v.(int) // unsafe type assertion
        fmt.Println("Alice:", balance)
    }

    // Range requires type assertions
    m.Range(func(k, v interface{}) bool {
        name := k.(string)
        bal := v.(int)
        fmt.Printf("%s: %d\\n", name, bal)
        return true
    })
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

type TypedMap[K comparable, V any] struct {
    m sync.Map
}

func (tm *TypedMap[K, V]) Store(key K, value V) {
    tm.m.Store(key, value)
}

func (tm *TypedMap[K, V]) Load(key K) (V, bool) {
    v, ok := tm.m.Load(key)
    if !ok {
        var zero V
        return zero, false
    }
    return v.(V), true
}

func (tm *TypedMap[K, V]) Range(fn func(K, V) bool) {
    tm.m.Range(func(k, v interface{}) bool {
        return fn(k.(K), v.(V))
    })
}

func main() {
    var m TypedMap[string, int]

    m.Store("alice", 100)
    m.Store("bob", 200)

    if balance, ok := m.Load("alice"); ok {
        fmt.Println("Alice:", balance)
    }

    m.Range(func(name string, bal int) bool {
        fmt.Printf("%s: %d\n", name, bal)
        return true
    })
}`,
      hints: [
        'Create a generic wrapper around sync.Map.',
        'Handle type assertions internally.',
        'Callers get type-safe API without casts.',
      ],
      concepts: ['sync.Map', 'generics', 'type safety', 'refactoring'],
    },
  ],
};
