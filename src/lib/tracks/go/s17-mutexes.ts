import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-mtx',
  title: '17. Mutexes & Sync',
  explanation: `## Mutexes & Sync in Go

The \`sync\` package provides primitives for synchronizing access to shared state.

\`\`\`go
// Mutex -- mutual exclusion lock
var mu sync.Mutex
mu.Lock()
defer mu.Unlock()
// critical section

// RWMutex -- allows multiple readers, one writer
var rw sync.RWMutex
rw.RLock()   // shared read lock
rw.RUnlock()
rw.Lock()    // exclusive write lock
rw.Unlock()

// sync.Once -- run exactly once
var once sync.Once
once.Do(func() { fmt.Println("only once") })

// sync.Map -- concurrent map
var m sync.Map
m.Store("key", "value")
val, ok := m.Load("key")

// sync.Pool -- reusable object pool
pool := sync.Pool{New: func() interface{} { return new(bytes.Buffer) }}
buf := pool.Get().(*bytes.Buffer)
pool.Put(buf)

// sync/atomic -- lock-free operations
var counter int64
atomic.AddInt64(&counter, 1)
\`\`\``,
  exercises: [
    {
      id: 'go-mtx-1',
      title: 'Basic Mutex',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use a mutex to protect shared state.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var mu sync.__BLANK__
    counter := 0
    var wg sync.WaitGroup

    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            mu.__BLANK__()
            counter++
            mu.__BLANK__()
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
        'sync.Mutex provides mutual exclusion.',
        'Lock() acquires the lock, Unlock() releases it.',
        'Only one goroutine can hold the lock at a time.',
      ],
      concepts: ['sync.Mutex', 'Lock', 'Unlock'],
    },
    {
      id: 'go-mtx-2',
      title: 'Defer Unlock',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use defer to ensure the mutex is always unlocked.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

type SafeCounter struct {
    mu    sync.Mutex
    count int
}

func (c *SafeCounter) Increment() {
    c.mu.Lock()
    __BLANK__ c.mu.Unlock()
    c.count++
}

func (c *SafeCounter) Value() int {
    c.mu.Lock()
    __BLANK__ c.mu.Unlock()
    return c.count
}

func main() {
    c := &SafeCounter{}
    var wg sync.WaitGroup
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            c.Increment()
        }()
    }
    wg.Wait()
    fmt.Println(c.Value())
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

type SafeCounter struct {
    mu    sync.Mutex
    count int
}

func (c *SafeCounter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.count++
}

func (c *SafeCounter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.count
}

func main() {
    c := &SafeCounter{}
    var wg sync.WaitGroup
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            c.Increment()
        }()
    }
    wg.Wait()
    fmt.Println(c.Value())
}`,
      hints: [
        'defer ensures Unlock is called even if the function panics.',
        'Always pair Lock with defer Unlock.',
        'This prevents forgetting to unlock.',
      ],
      concepts: ['defer Unlock', 'mutex safety'],
    },
    {
      id: 'go-mtx-3',
      title: 'RWMutex',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use RWMutex for concurrent reads and exclusive writes.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

type Cache struct {
    mu   sync.__BLANK__
    data map[string]string
}

func (c *Cache) Get(key string) (string, bool) {
    c.mu.__BLANK__()
    defer c.mu.__BLANK__()
    val, ok := c.data[key]
    return val, ok
}

func (c *Cache) Set(key, val string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.data[key] = val
}

func main() {
    cache := &Cache{data: make(map[string]string)}
    cache.Set("name", "Go")
    val, _ := cache.Get("name")
    fmt.Println(val)
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

type Cache struct {
    mu   sync.RWMutex
    data map[string]string
}

func (c *Cache) Get(key string) (string, bool) {
    c.mu.RLock()
    defer c.mu.RUnlock()
    val, ok := c.data[key]
    return val, ok
}

func (c *Cache) Set(key, val string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.data[key] = val
}

func main() {
    cache := &Cache{data: make(map[string]string)}
    cache.Set("name", "Go")
    val, _ := cache.Get("name")
    fmt.Println(val)
}`,
      hints: [
        'RWMutex allows multiple concurrent readers.',
        'RLock/RUnlock for reads, Lock/Unlock for writes.',
        'Reads do not block other reads.',
      ],
      concepts: ['sync.RWMutex', 'RLock', 'concurrent reads'],
    },
    {
      id: 'go-mtx-4',
      title: 'sync.Once',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use sync.Once to initialize a value exactly once.',
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
    Host string
}

func GetConfig() *Config {
    once.__BLANK__(func() {
        fmt.Println("initializing config")
        instance = &Config{Host: "localhost"}
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
            fmt.Println(cfg.Host)
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
    Host string
}

func GetConfig() *Config {
    once.Do(func() {
        fmt.Println("initializing config")
        instance = &Config{Host: "localhost"}
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
            fmt.Println(cfg.Host)
        }()
    }
    wg.Wait()
}`,
      hints: [
        'once.Do runs the function exactly once, even from multiple goroutines.',
        'Subsequent calls to Do are no-ops.',
        'This is the idiomatic singleton pattern in Go.',
      ],
      concepts: ['sync.Once', 'singleton', 'lazy initialization'],
    },
    {
      id: 'go-mtx-5',
      title: 'sync.Map',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use sync.Map for concurrent map access without a mutex.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var m sync.Map

    m.__BLANK__("key1", "value1")
    m.__BLANK__("key2", "value2")

    val, ok := m.__BLANK__("key1")
    if ok {
        fmt.Println(val)
    }

    m.Range(func(key, value interface{}) bool {
        fmt.Printf("%s: %s\\n", key, value)
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

    m.Store("key1", "value1")
    m.Store("key2", "value2")

    val, ok := m.Load("key1")
    if ok {
        fmt.Println(val)
    }

    m.Range(func(key, value interface{}) bool {
        fmt.Printf("%s: %s\\n", key, value)
        return true
    })
}`,
      hints: [
        'sync.Map uses Store to set, Load to get.',
        'Range iterates over all key-value pairs.',
        'No external locking is needed.',
      ],
      concepts: ['sync.Map', 'Store', 'Load', 'Range'],
    },
    {
      id: 'go-mtx-6',
      title: 'Atomic Operations',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use atomic operations for lock-free counter updates.',
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
            atomic.__BLANK__(&counter, 1)
        }()
    }

    wg.Wait()
    fmt.Println(atomic.__BLANK__(&counter))
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

    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            atomic.AddInt64(&counter, 1)
        }()
    }

    wg.Wait()
    fmt.Println(atomic.LoadInt64(&counter))
}`,
      hints: [
        'atomic.AddInt64 atomically adds to the counter.',
        'atomic.LoadInt64 atomically reads the value.',
        'Atomic operations are faster than mutex for simple counters.',
      ],
      concepts: ['sync/atomic', 'AddInt64', 'LoadInt64'],
    },
    {
      id: 'go-mtx-7',
      title: 'Thread-Safe Stack',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement a thread-safe stack using a mutex.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

type Stack struct {
    mu    sync.Mutex
    items []int
}

// Implement Push and Pop methods that are goroutine-safe

func main() {
    s := &Stack{}
    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            s.Push(n)
        }(i)
    }
    wg.Wait()
    fmt.Println("size:", len(s.items))
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

type Stack struct {
    mu    sync.Mutex
    items []int
}

func (s *Stack) Push(val int) {
    s.mu.Lock()
    defer s.mu.Unlock()
    s.items = append(s.items, val)
}

func (s *Stack) Pop() (int, bool) {
    s.mu.Lock()
    defer s.mu.Unlock()
    if len(s.items) == 0 {
        return 0, false
    }
    val := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return val, true
}

func main() {
    s := &Stack{}
    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            s.Push(n)
        }(i)
    }
    wg.Wait()
    fmt.Println("size:", len(s.items))
}`,
      hints: [
        'Lock the mutex in both Push and Pop.',
        'Use defer Unlock for safety.',
        'Pop should return a boolean indicating success.',
      ],
      concepts: ['mutex-protected data structure', 'thread safety'],
    },
    {
      id: 'go-mtx-8',
      title: 'sync.Pool Usage',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use sync.Pool to reuse allocated buffers.',
      skeleton: `package main

import (
    "bytes"
    "fmt"
    "sync"
)

// Create a sync.Pool for bytes.Buffer
// Write a function that gets a buffer, writes to it, prints, and returns it

func main() {
    for i := 0; i < 5; i++ {
        processWithPool(fmt.Sprintf("message %d", i))
    }
}`,
      solution: `package main

import (
    "bytes"
    "fmt"
    "sync"
)

var bufPool = sync.Pool{
    New: func() interface{} {
        return new(bytes.Buffer)
    },
}

func processWithPool(msg string) {
    buf := bufPool.Get().(*bytes.Buffer)
    defer func() {
        buf.Reset()
        bufPool.Put(buf)
    }()

    buf.WriteString("processed: ")
    buf.WriteString(msg)
    fmt.Println(buf.String())
}

func main() {
    for i := 0; i < 5; i++ {
        processWithPool(fmt.Sprintf("message %d", i))
    }
}`,
      hints: [
        'sync.Pool.New creates a new object when the pool is empty.',
        'Get retrieves an object, Put returns it.',
        'Always Reset the buffer before returning to the pool.',
      ],
      concepts: ['sync.Pool', 'object reuse', 'buffer pooling'],
    },
    {
      id: 'go-mtx-9',
      title: 'Atomic Value',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use atomic.Value to store and load a configuration atomically.',
      skeleton: `package main

import (
    "fmt"
    "sync/atomic"
)

type Config struct {
    Host string
    Port int
}

// Use atomic.Value to store/load Config safely

func main() {
    var config atomic.Value
    // Store initial config
    // Load and print config
}`,
      solution: `package main

import (
    "fmt"
    "sync/atomic"
)

type Config struct {
    Host string
    Port int
}

func main() {
    var config atomic.Value
    config.Store(Config{Host: "localhost", Port: 8080})

    cfg := config.Load().(Config)
    fmt.Printf("%s:%d\\n", cfg.Host, cfg.Port)

    config.Store(Config{Host: "0.0.0.0", Port: 9090})
    cfg = config.Load().(Config)
    fmt.Printf("%s:%d\\n", cfg.Host, cfg.Port)
}`,
      hints: [
        'atomic.Value stores and loads interface{} values atomically.',
        'Use Store to set the value.',
        'Use Load with type assertion to retrieve it.',
      ],
      concepts: ['atomic.Value', 'Store', 'Load'],
    },
    {
      id: 'go-mtx-10',
      title: 'Compare and Swap',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use atomic.CompareAndSwapInt64 for lock-free updates.',
      skeleton: `package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

func atomicMax(addr *int64, val int64) {
    // Atomically update addr to max(current, val) using CAS
}

func main() {
    var maxVal int64
    var wg sync.WaitGroup
    values := []int64{5, 3, 8, 1, 9, 2, 7}

    for _, v := range values {
        wg.Add(1)
        go func(n int64) {
            defer wg.Done()
            atomicMax(&maxVal, n)
        }(v)
    }
    wg.Wait()
    fmt.Println(maxVal)
}`,
      solution: `package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

func atomicMax(addr *int64, val int64) {
    for {
        old := atomic.LoadInt64(addr)
        if val <= old {
            return
        }
        if atomic.CompareAndSwapInt64(addr, old, val) {
            return
        }
    }
}

func main() {
    var maxVal int64
    var wg sync.WaitGroup
    values := []int64{5, 3, 8, 1, 9, 2, 7}

    for _, v := range values {
        wg.Add(1)
        go func(n int64) {
            defer wg.Done()
            atomicMax(&maxVal, n)
        }(v)
    }
    wg.Wait()
    fmt.Println(maxVal)
}`,
      hints: [
        'CAS: if current == old, set to new, return success.',
        'Loop until CAS succeeds or value is already >= val.',
        'This is a lock-free pattern.',
      ],
      concepts: ['CompareAndSwap', 'lock-free', 'CAS loop'],
    },
    {
      id: 'go-mtx-11',
      title: 'Condition Variable',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use sync.Cond for signaling between goroutines.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var mu sync.Mutex
    cond := sync.NewCond(&mu)
    ready := false

    // Writer: set ready and signal
    // Reader: wait until ready

    go func() {
        mu.Lock()
        ready = true
        cond.Signal()
        mu.Unlock()
    }()

    mu.Lock()
    for !ready {
        cond.Wait()
    }
    fmt.Println("ready:", ready)
    mu.Unlock()
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var mu sync.Mutex
    cond := sync.NewCond(&mu)
    ready := false

    go func() {
        mu.Lock()
        ready = true
        cond.Signal()
        mu.Unlock()
    }()

    mu.Lock()
    for !ready {
        cond.Wait()
    }
    fmt.Println("ready:", ready)
    mu.Unlock()
}`,
      hints: [
        'sync.Cond.Wait atomically unlocks and waits for Signal.',
        'Always check the condition in a for loop.',
        'Signal wakes one waiting goroutine.',
      ],
      concepts: ['sync.Cond', 'Signal', 'Wait', 'condition variable'],
    },
    {
      id: 'go-mtx-12',
      title: 'Read-Heavy Cache',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Build a read-heavy cache using RWMutex for performance.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

type ReadHeavyCache struct {
    mu   sync.RWMutex
    data map[string]int
}

// Write Get, Set, and Sum methods
// Get and Sum use read locks, Set uses write lock

func main() {
    cache := &ReadHeavyCache{data: make(map[string]int)}
    cache.Set("a", 1)
    cache.Set("b", 2)
    cache.Set("c", 3)
    fmt.Println(cache.Get("b"))
    fmt.Println(cache.Sum())
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

type ReadHeavyCache struct {
    mu   sync.RWMutex
    data map[string]int
}

func (c *ReadHeavyCache) Get(key string) int {
    c.mu.RLock()
    defer c.mu.RUnlock()
    return c.data[key]
}

func (c *ReadHeavyCache) Set(key string, val int) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.data[key] = val
}

func (c *ReadHeavyCache) Sum() int {
    c.mu.RLock()
    defer c.mu.RUnlock()
    total := 0
    for _, v := range c.data {
        total += v
    }
    return total
}

func main() {
    cache := &ReadHeavyCache{data: make(map[string]int)}
    cache.Set("a", 1)
    cache.Set("b", 2)
    cache.Set("c", 3)
    fmt.Println(cache.Get("b"))
    fmt.Println(cache.Sum())
}`,
      hints: [
        'RLock allows multiple concurrent readers.',
        'Use RLock for Get and Sum, Lock for Set.',
        'This improves throughput for read-heavy workloads.',
      ],
      concepts: ['RWMutex', 'read-heavy optimization', 'concurrent cache'],
    },
    {
      id: 'go-mtx-13',
      title: 'Predict Once',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict how many times sync.Once executes the function.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var once sync.Once
    for i := 0; i < 5; i++ {
        once.Do(func() {
            fmt.Print("init ")
        })
        fmt.Print(i, " ")
    }
    fmt.Println()
}`,
      solution: `init 0 1 2 3 4 `,
      hints: [
        'once.Do runs the function only on the first call.',
        'Subsequent Do calls are no-ops.',
        '"init" prints once, then all 5 numbers print.',
      ],
      concepts: ['sync.Once', 'single execution'],
    },
    {
      id: 'go-mtx-14',
      title: 'Predict Atomic',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the output of atomic operations.',
      skeleton: `package main

import (
    "fmt"
    "sync/atomic"
)

func main() {
    var x int64 = 10
    old := atomic.SwapInt64(&x, 20)
    fmt.Println(old, x)

    swapped := atomic.CompareAndSwapInt64(&x, 20, 30)
    fmt.Println(swapped, x)

    swapped = atomic.CompareAndSwapInt64(&x, 20, 40)
    fmt.Println(swapped, x)
}`,
      solution: `10 20
true 30
false 30`,
      hints: [
        'Swap returns the old value and sets the new one.',
        'CAS succeeds when current value matches expected.',
        'Second CAS fails because x is 30, not 20.',
      ],
      concepts: ['atomic.Swap', 'atomic.CompareAndSwap'],
    },
    {
      id: 'go-mtx-15',
      title: 'Predict sync.Map',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the behavior of sync.Map LoadOrStore.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var m sync.Map

    actual, loaded := m.LoadOrStore("key", "first")
    fmt.Println(actual, loaded)

    actual, loaded = m.LoadOrStore("key", "second")
    fmt.Println(actual, loaded)
}`,
      solution: `first false
first true`,
      hints: [
        'LoadOrStore returns the existing value if present.',
        'First call: stores "first", loaded=false (was not present).',
        'Second call: loads "first", loaded=true (already exists).',
      ],
      concepts: ['sync.Map', 'LoadOrStore'],
    },
    {
      id: 'go-mtx-16',
      title: 'Fix Missing Lock',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the data race caused by missing mutex protection.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

type Balance struct {
    amount int
}

func (b *Balance) Add(n int) {
    b.amount += n // data race
}

func (b *Balance) Get() int {
    return b.amount // data race
}

func main() {
    b := &Balance{}
    var wg sync.WaitGroup
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            b.Add(1)
        }()
    }
    wg.Wait()
    fmt.Println(b.Get())
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

type Balance struct {
    mu     sync.Mutex
    amount int
}

func (b *Balance) Add(n int) {
    b.mu.Lock()
    defer b.mu.Unlock()
    b.amount += n
}

func (b *Balance) Get() int {
    b.mu.Lock()
    defer b.mu.Unlock()
    return b.amount
}

func main() {
    b := &Balance{}
    var wg sync.WaitGroup
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            b.Add(1)
        }()
    }
    wg.Wait()
    fmt.Println(b.Get())
}`,
      hints: [
        'Add a sync.Mutex field to the struct.',
        'Lock/Unlock in both Add and Get.',
        'Both reads and writes need protection.',
      ],
      concepts: ['data race', 'mutex protection'],
    },
    {
      id: 'go-mtx-17',
      title: 'Fix Mutex Copy',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the bug caused by copying a struct with a mutex.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

type Counter struct {
    mu    sync.Mutex
    count int
}

func (c Counter) Value() int { // Bug: value receiver copies the mutex
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.count
}

func (c *Counter) Inc() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.count++
}

func main() {
    c := &Counter{}
    c.Inc()
    c.Inc()
    fmt.Println(c.Value())
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

type Counter struct {
    mu    sync.Mutex
    count int
}

func (c *Counter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.count
}

func (c *Counter) Inc() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.count++
}

func main() {
    c := &Counter{}
    c.Inc()
    c.Inc()
    fmt.Println(c.Value())
}`,
      hints: [
        'A value receiver copies the entire struct including the mutex.',
        'Copying a mutex is undefined behavior.',
        'Always use pointer receivers with mutex-containing structs.',
      ],
      concepts: ['mutex copy', 'pointer receiver', 'go vet'],
    },
    {
      id: 'go-mtx-18',
      title: 'Fix Deadlock',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix the deadlock caused by double-locking a non-reentrant mutex.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

type DB struct {
    mu   sync.Mutex
    data map[string]string
}

func (db *DB) Get(key string) string {
    db.mu.Lock()
    defer db.mu.Unlock()
    return db.data[key]
}

func (db *DB) GetOrDefault(key, def string) string {
    db.mu.Lock()
    defer db.mu.Unlock()
    val := db.Get(key) // deadlock: Get also locks
    if val == "" {
        return def
    }
    return val
}

func main() {
    db := &DB{data: map[string]string{"name": "Go"}}
    fmt.Println(db.GetOrDefault("name", "unknown"))
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

type DB struct {
    mu   sync.Mutex
    data map[string]string
}

func (db *DB) get(key string) string {
    return db.data[key]
}

func (db *DB) Get(key string) string {
    db.mu.Lock()
    defer db.mu.Unlock()
    return db.get(key)
}

func (db *DB) GetOrDefault(key, def string) string {
    db.mu.Lock()
    defer db.mu.Unlock()
    val := db.get(key)
    if val == "" {
        return def
    }
    return val
}

func main() {
    db := &DB{data: map[string]string{"name": "Go"}}
    fmt.Println(db.GetOrDefault("name", "unknown"))
}`,
      hints: [
        'Go mutexes are not reentrant -- locking twice deadlocks.',
        'Extract an internal unlocked helper method.',
        'Public methods lock, internal helpers assume the lock is held.',
      ],
      concepts: ['non-reentrant mutex', 'deadlock', 'internal helper'],
    },
    {
      id: 'go-mtx-19',
      title: 'Refactor Map to sync.Map',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor a mutex-protected map to use sync.Map.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

type Registry struct {
    mu    sync.Mutex
    items map[string]int
}

func (r *Registry) Set(key string, val int) {
    r.mu.Lock()
    defer r.mu.Unlock()
    r.items[key] = val
}

func (r *Registry) Get(key string) (int, bool) {
    r.mu.Lock()
    defer r.mu.Unlock()
    val, ok := r.items[key]
    return val, ok
}

func main() {
    r := &Registry{items: make(map[string]int)}
    r.Set("x", 10)
    val, _ := r.Get("x")
    fmt.Println(val)
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

type Registry struct {
    items sync.Map
}

func (r *Registry) Set(key string, val int) {
    r.items.Store(key, val)
}

func (r *Registry) Get(key string) (int, bool) {
    val, ok := r.items.Load(key)
    if !ok {
        return 0, false
    }
    return val.(int), true
}

func main() {
    r := &Registry{}
    r.Set("x", 10)
    val, _ := r.Get("x")
    fmt.Println(val)
}`,
      hints: [
        'sync.Map handles its own locking internally.',
        'Replace Lock/Unlock with Store/Load.',
        'Type assert the loaded value back to int.',
      ],
      concepts: ['sync.Map', 'refactoring', 'concurrent map'],
    },
    {
      id: 'go-mtx-20',
      title: 'Refactor Mutex to Channel',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor mutex-based state management to channel-based.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

type Account struct {
    mu      sync.Mutex
    balance int
}

func (a *Account) Deposit(amount int) {
    a.mu.Lock()
    defer a.mu.Unlock()
    a.balance += amount
}

func (a *Account) Balance() int {
    a.mu.Lock()
    defer a.mu.Unlock()
    return a.balance
}

func main() {
    acc := &Account{}
    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            acc.Deposit(100)
        }()
    }
    wg.Wait()
    fmt.Println(acc.Balance())
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

type Account struct {
    deposits chan int
    queries  chan chan int
}

func NewAccount() *Account {
    a := &Account{
        deposits: make(chan int),
        queries:  make(chan chan int),
    }
    go a.run()
    return a
}

func (a *Account) run() {
    balance := 0
    for {
        select {
        case amount := <-a.deposits:
            balance += amount
        case reply := <-a.queries:
            reply <- balance
        }
    }
}

func (a *Account) Deposit(amount int) {
    a.deposits <- amount
}

func (a *Account) Balance() int {
    reply := make(chan int)
    a.queries <- reply
    return <-reply
}

func main() {
    acc := NewAccount()
    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            acc.Deposit(100)
        }()
    }
    wg.Wait()
    fmt.Println(acc.Balance())
}`,
      hints: [
        'Use a single goroutine to own the state.',
        'Accept deposits and balance queries via channels.',
        'This is the "share memory by communicating" pattern.',
      ],
      concepts: ['channel-based state', 'actor model', 'share by communicating'],
    },
  ],
};
