import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-gr',
  title: '14. Goroutines',
  explanation: `## Goroutines in Go

Goroutines are lightweight threads managed by the Go runtime. They are cheap to create -- thousands can run concurrently.

\`\`\`go
// Launch a goroutine
go myFunc()

// Anonymous goroutine
go func() {
    fmt.Println("running concurrently")
}()

// WaitGroup to wait for goroutines
var wg sync.WaitGroup
wg.Add(1)
go func() {
    defer wg.Done()
    // work
}()
wg.Wait()

// Goroutine closure pitfall
for i := 0; i < 5; i++ {
    go func(n int) {  // pass i as parameter
        fmt.Println(n)
    }(i)
}

// runtime.GOMAXPROCS sets CPU parallelism
runtime.GOMAXPROCS(4)

// runtime.Gosched yields the processor
runtime.Gosched()
\`\`\``,
  exercises: [
    {
      id: 'go-gr-1',
      title: 'Launch a Goroutine',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Launch a function as a goroutine using the go keyword.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

func sayHello() {
    fmt.Println("hello from goroutine")
}

func main() {
    __BLANK__ sayHello()
    time.Sleep(100 * time.Millisecond)
}`,
      solution: `package main

import (
    "fmt"
    "time"
)

func sayHello() {
    fmt.Println("hello from goroutine")
}

func main() {
    go sayHello()
    time.Sleep(100 * time.Millisecond)
}`,
      hints: [
        'The go keyword launches a function as a goroutine.',
        'go functionName() runs it concurrently.',
        'time.Sleep prevents main from exiting too early.',
      ],
      concepts: ['go keyword', 'goroutine launch'],
    },
    {
      id: 'go-gr-2',
      title: 'Anonymous Goroutine',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Launch an anonymous function as a goroutine.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

func main() {
    __BLANK__ func() {
        fmt.Println("anonymous goroutine")
    }()
    time.Sleep(100 * time.Millisecond)
}`,
      solution: `package main

import (
    "fmt"
    "time"
)

func main() {
    go func() {
        fmt.Println("anonymous goroutine")
    }()
    time.Sleep(100 * time.Millisecond)
}`,
      hints: [
        'Use go func() { ... }() for an anonymous goroutine.',
        'The () at the end immediately invokes the function.',
        'The go keyword makes it run concurrently.',
      ],
      concepts: ['anonymous goroutine', 'go keyword'],
    },
    {
      id: 'go-gr-3',
      title: 'WaitGroup Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use sync.WaitGroup to wait for a goroutine to complete.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    wg.__BLANK__(1)

    go func() {
        defer wg.__BLANK__()
        fmt.Println("worker done")
    }()

    wg.__BLANK__()
    fmt.Println("all done")
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    wg.Add(1)

    go func() {
        defer wg.Done()
        fmt.Println("worker done")
    }()

    wg.Wait()
    fmt.Println("all done")
}`,
      hints: [
        'Add increments the counter, Done decrements it.',
        'Wait blocks until the counter reaches zero.',
        'Use defer wg.Done() to ensure it is called.',
      ],
      concepts: ['sync.WaitGroup', 'Add', 'Done', 'Wait'],
    },
    {
      id: 'go-gr-4',
      title: 'Goroutine with Parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Pass a value to a goroutine to avoid closure capture issues.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(__BLANK__ int) {
            defer wg.Done()
            fmt.Println(n)
        }(__BLANK__)
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
        'Pass loop variables as parameters to avoid capture.',
        'The parameter n captures the current value of i.',
        'Without this, all goroutines would see the final value of i.',
      ],
      concepts: ['closure capture', 'goroutine parameter', 'loop variable'],
    },
    {
      id: 'go-gr-5',
      title: 'GOMAXPROCS',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Query and set the maximum number of CPUs for goroutine scheduling.',
      skeleton: `package main

import (
    "fmt"
    "runtime"
)

func main() {
    current := runtime.__BLANK__(0)
    fmt.Println("Current GOMAXPROCS:", current)

    runtime.__BLANK__(2)
    fmt.Println("Set to 2")
    fmt.Println("NumCPU:", runtime.NumCPU())
}`,
      solution: `package main

import (
    "fmt"
    "runtime"
)

func main() {
    current := runtime.GOMAXPROCS(0)
    fmt.Println("Current GOMAXPROCS:", current)

    runtime.GOMAXPROCS(2)
    fmt.Println("Set to 2")
    fmt.Println("NumCPU:", runtime.NumCPU())
}`,
      hints: [
        'GOMAXPROCS(0) returns the current setting without changing it.',
        'GOMAXPROCS(n) sets the value and returns the previous one.',
        'NumCPU returns the number of logical CPUs.',
      ],
      concepts: ['runtime.GOMAXPROCS', 'runtime.NumCPU', 'parallelism'],
    },
    {
      id: 'go-gr-6',
      title: 'Goroutine with Return Value',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use a channel to get a return value from a goroutine.',
      skeleton: `package main

import "fmt"

func compute(n int, result __BLANK__ int) {
    result <- n * n
}

func main() {
    ch := make(chan int)
    go compute(5, ch)
    val := <-ch
    fmt.Println(val)
}`,
      solution: `package main

import "fmt"

func compute(n int, result chan int) {
    result <- n * n
}

func main() {
    ch := make(chan int)
    go compute(5, ch)
    val := <-ch
    fmt.Println(val)
}`,
      hints: [
        'Goroutines cannot return values directly.',
        'Use a channel to communicate results.',
        'The channel type is chan int for integer values.',
      ],
      concepts: ['channel', 'goroutine communication'],
    },
    {
      id: 'go-gr-7',
      title: 'Multiple Workers',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Launch multiple goroutine workers that process items concurrently.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func worker(id int, items []int, wg *sync.WaitGroup) {
    // Process each item and print "worker {id}: {item}"
}

func main() {
    var wg sync.WaitGroup
    items := []int{1, 2, 3}
    // Launch 3 workers, each processing the items slice
    wg.Wait()
    fmt.Println("all workers done")
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func worker(id int, items []int, wg *sync.WaitGroup) {
    defer wg.Done()
    for _, item := range items {
        fmt.Printf("worker %d: %d\\n", id, item)
    }
}

func main() {
    var wg sync.WaitGroup
    items := []int{1, 2, 3}
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go worker(i, items, &wg)
    }
    wg.Wait()
    fmt.Println("all workers done")
}`,
      hints: [
        'Each worker should call defer wg.Done().',
        'Pass the WaitGroup as a pointer.',
        'Add to the WaitGroup before launching each goroutine.',
      ],
      concepts: ['worker pattern', 'WaitGroup', 'concurrent workers'],
    },
    {
      id: 'go-gr-8',
      title: 'Goroutine Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that returns the number of active goroutines.',
      skeleton: `package main

import (
    "fmt"
    "runtime"
    "sync"
)

func spawnWorkers(n int) {
    // Spawn n goroutines that each wait on a shared WaitGroup
    // Print the number of goroutines using runtime.NumGoroutine
}

func main() {
    fmt.Println("Initial goroutines:", runtime.NumGoroutine())
    spawnWorkers(5)
}`,
      solution: `package main

import (
    "fmt"
    "runtime"
    "sync"
)

func spawnWorkers(n int) {
    var wg sync.WaitGroup
    wg.Add(n)
    for i := 0; i < n; i++ {
        go func(id int) {
            defer wg.Done()
            fmt.Printf("worker %d running\\n", id)
        }(i)
    }
    fmt.Println("Active goroutines:", runtime.NumGoroutine())
    wg.Wait()
}

func main() {
    fmt.Println("Initial goroutines:", runtime.NumGoroutine())
    spawnWorkers(5)
}`,
      hints: [
        'runtime.NumGoroutine returns the current goroutine count.',
        'This includes the main goroutine.',
        'The count may vary depending on timing.',
      ],
      concepts: ['runtime.NumGoroutine', 'goroutine lifecycle'],
    },
    {
      id: 'go-gr-9',
      title: 'Parallel Sum',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Compute a sum in parallel by splitting work across goroutines.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func parallelSum(nums []int, workers int) int {
    // Split nums into chunks and sum each chunk in a goroutine
    // Collect partial sums and return the total
}

func main() {
    nums := make([]int, 100)
    for i := range nums {
        nums[i] = i + 1
    }
    fmt.Println(parallelSum(nums, 4)) // 5050
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func parallelSum(nums []int, workers int) int {
    chunkSize := (len(nums) + workers - 1) / workers
    partials := make([]int, workers)
    var wg sync.WaitGroup

    for i := 0; i < workers; i++ {
        start := i * chunkSize
        end := start + chunkSize
        if end > len(nums) {
            end = len(nums)
        }
        if start >= len(nums) {
            break
        }
        wg.Add(1)
        go func(idx int, chunk []int) {
            defer wg.Done()
            sum := 0
            for _, n := range chunk {
                sum += n
            }
            partials[idx] = sum
        }(i, nums[start:end])
    }
    wg.Wait()

    total := 0
    for _, p := range partials {
        total += p
    }
    return total
}

func main() {
    nums := make([]int, 100)
    for i := range nums {
        nums[i] = i + 1
    }
    fmt.Println(parallelSum(nums, 4))
}`,
      hints: [
        'Split the slice into roughly equal chunks.',
        'Each goroutine sums its chunk into a dedicated slot.',
        'Wait for all goroutines then sum the partials.',
      ],
      concepts: ['parallel computation', 'data partitioning', 'WaitGroup'],
    },
    {
      id: 'go-gr-10',
      title: 'Goroutine Pool',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement a simple goroutine pool with a fixed number of workers.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func pool(workers int, jobs []int) []int {
    // Create a pool of workers that process jobs from a channel
    // Return results in order
}

func main() {
    jobs := []int{1, 2, 3, 4, 5, 6, 7, 8}
    results := pool(3, jobs)
    fmt.Println(results)
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func pool(workers int, jobs []int) []int {
    results := make([]int, len(jobs))
    jobCh := make(chan int, len(jobs))
    var wg sync.WaitGroup

    for w := 0; w < workers; w++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for idx := range jobCh {
                results[idx] = jobs[idx] * jobs[idx]
            }
        }()
    }

    for i := range jobs {
        jobCh <- i
    }
    close(jobCh)
    wg.Wait()
    return results
}

func main() {
    jobs := []int{1, 2, 3, 4, 5, 6, 7, 8}
    results := pool(3, jobs)
    fmt.Println(results)
}`,
      hints: [
        'Send job indices through a channel.',
        'Workers read from the channel until it is closed.',
        'Use the index to write results to the correct position.',
      ],
      concepts: ['worker pool', 'channel', 'bounded concurrency'],
    },
    {
      id: 'go-gr-11',
      title: 'Timeout Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement a timeout for a goroutine operation.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

func doWork(done chan bool) {
    time.Sleep(200 * time.Millisecond)
    done <- true
}

func main() {
    done := make(chan bool)
    go doWork(done)

    // Wait for done or timeout after 100ms
    // Print "done" or "timeout"
}`,
      solution: `package main

import (
    "fmt"
    "time"
)

func doWork(done chan bool) {
    time.Sleep(200 * time.Millisecond)
    done <- true
}

func main() {
    done := make(chan bool)
    go doWork(done)

    select {
    case <-done:
        fmt.Println("done")
    case <-time.After(100 * time.Millisecond):
        fmt.Println("timeout")
    }
}`,
      hints: [
        'Use select with time.After for a timeout.',
        'time.After returns a channel that receives after the duration.',
        'select picks whichever channel is ready first.',
      ],
      concepts: ['timeout pattern', 'select', 'time.After'],
    },
    {
      id: 'go-gr-12',
      title: 'Concurrent Map Access',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Safely access a map from multiple goroutines using a mutex.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

type SafeMap struct {
    mu sync.Mutex
    data map[string]int
}

// Write Set and Get methods that are goroutine-safe

func main() {
    sm := SafeMap{data: make(map[string]int)}
    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            key := fmt.Sprintf("key%d", n)
            sm.Set(key, n)
        }(i)
    }
    wg.Wait()
    fmt.Println(sm.Get("key5"))
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

type SafeMap struct {
    mu   sync.Mutex
    data map[string]int
}

func (s *SafeMap) Set(key string, val int) {
    s.mu.Lock()
    defer s.mu.Unlock()
    s.data[key] = val
}

func (s *SafeMap) Get(key string) int {
    s.mu.Lock()
    defer s.mu.Unlock()
    return s.data[key]
}

func main() {
    sm := SafeMap{data: make(map[string]int)}
    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            key := fmt.Sprintf("key%d", n)
            sm.Set(key, n)
        }(i)
    }
    wg.Wait()
    fmt.Println(sm.Get("key5"))
}`,
      hints: [
        'Lock the mutex before accessing the map.',
        'Use defer mu.Unlock() for safety.',
        'Both reads and writes need synchronization.',
      ],
      concepts: ['mutex', 'goroutine safety', 'concurrent map'],
    },
    {
      id: 'go-gr-13',
      title: 'Predict Goroutine Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the guaranteed output when main does not wait.',
      skeleton: `package main

import "fmt"

func main() {
    go fmt.Println("goroutine")
    fmt.Println("main")
}`,
      solution: `main`,
      hints: [
        'main exits before the goroutine can run.',
        'When main returns, all goroutines are terminated.',
        'Only "main" is guaranteed to print.',
      ],
      concepts: ['goroutine lifecycle', 'main exit'],
    },
    {
      id: 'go-gr-14',
      title: 'Predict WaitGroup',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the output of a program using WaitGroup.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    wg.Add(2)

    go func() {
        defer wg.Done()
        fmt.Print("A")
    }()

    go func() {
        defer wg.Done()
        fmt.Print("B")
    }()

    wg.Wait()
    fmt.Println("C")
}`,
      solution: `ABC`,
      hints: [
        'Both goroutines complete before Wait returns.',
        'A and B may print in either order.',
        'C always prints last. Output is AB C or BA C.',
      ],
      concepts: ['WaitGroup ordering', 'goroutine scheduling'],
    },
    {
      id: 'go-gr-15',
      title: 'Predict Closure Capture',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the output when a goroutine captures a loop variable.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 3; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            fmt.Print(n)
        }(i)
    }
    wg.Wait()
    fmt.Println()
}`,
      solution: `012`,
      hints: [
        'The value of i is passed as n to each goroutine.',
        'Each goroutine gets its own copy of the value.',
        '0, 1, 2 print in some order (likely 012 or permutation).',
      ],
      concepts: ['closure capture', 'goroutine parameter'],
    },
    {
      id: 'go-gr-16',
      title: 'Fix Goroutine Leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the goroutine that leaks because no one reads from the channel.',
      skeleton: `package main

import "fmt"

func generate(n int) chan int {
    ch := make(chan int)
    go func() {
        for i := 0; i < n; i++ {
            ch <- i
        }
    }()
    return ch
}

func main() {
    ch := generate(10)
    // Only read 3 values, goroutine leaks
    for i := 0; i < 3; i++ {
        fmt.Println(<-ch)
    }
}`,
      solution: `package main

import "fmt"

func generate(n int) chan int {
    ch := make(chan int, n)
    go func() {
        for i := 0; i < n; i++ {
            ch <- i
        }
        close(ch)
    }()
    return ch
}

func main() {
    ch := generate(10)
    for i := 0; i < 3; i++ {
        fmt.Println(<-ch)
    }
}`,
      hints: [
        'Use a buffered channel so the goroutine can finish.',
        'Buffer the channel with capacity n.',
        'Close the channel when the goroutine is done sending.',
      ],
      concepts: ['goroutine leak', 'buffered channel', 'channel close'],
    },
    {
      id: 'go-gr-17',
      title: 'Fix WaitGroup Misuse',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the WaitGroup that is added inside the goroutine.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        go func(n int) {
            wg.Add(1) // Bug: Add inside goroutine
            defer wg.Done()
            fmt.Println(n)
        }(i)
    }

    wg.Wait()
    fmt.Println("done")
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
    fmt.Println("done")
}`,
      hints: [
        'wg.Add must be called before launching the goroutine.',
        'If Add is inside the goroutine, Wait may return early.',
        'Move wg.Add(1) before the go statement.',
      ],
      concepts: ['WaitGroup.Add', 'race condition', 'synchronization'],
    },
    {
      id: 'go-gr-18',
      title: 'Fix Data Race',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix the data race on a shared counter variable.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    counter := 0
    var wg sync.WaitGroup

    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter++ // data race
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
        'Use sync/atomic for lock-free thread-safe operations.',
        'atomic.AddInt64 atomically increments the counter.',
        'Alternatively, use a sync.Mutex to protect the counter.',
      ],
      concepts: ['data race', 'atomic operations', 'sync/atomic'],
    },
    {
      id: 'go-gr-19',
      title: 'Refactor Sequential to Concurrent',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor sequential API calls into concurrent goroutines.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

func fetchUser(id int) string {
    time.Sleep(50 * time.Millisecond)
    return fmt.Sprintf("user_%d", id)
}

func main() {
    start := time.Now()
    results := make([]string, 5)
    for i := 0; i < 5; i++ {
        results[i] = fetchUser(i)
    }
    fmt.Println(results)
    fmt.Printf("took %v\\n", time.Since(start))
}`,
      solution: `package main

import (
    "fmt"
    "sync"
    "time"
)

func fetchUser(id int) string {
    time.Sleep(50 * time.Millisecond)
    return fmt.Sprintf("user_%d", id)
}

func main() {
    start := time.Now()
    results := make([]string, 5)
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(idx int) {
            defer wg.Done()
            results[idx] = fetchUser(idx)
        }(i)
    }
    wg.Wait()

    fmt.Println(results)
    fmt.Printf("took %v\\n", time.Since(start))
}`,
      hints: [
        'Launch each fetch in its own goroutine.',
        'Use a WaitGroup to wait for all to complete.',
        'Pass the index to avoid closure capture issues.',
      ],
      concepts: ['concurrent execution', 'WaitGroup', 'performance'],
    },
    {
      id: 'go-gr-20',
      title: 'Refactor Fire-and-Forget',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor fire-and-forget goroutines to use proper lifecycle management.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

func logEvent(event string) {
    time.Sleep(10 * time.Millisecond)
    fmt.Println("logged:", event)
}

func main() {
    events := []string{"login", "view", "purchase", "logout"}
    for _, e := range events {
        go logEvent(e) // fire and forget -- may not complete
    }
    time.Sleep(100 * time.Millisecond) // unreliable wait
    fmt.Println("done")
}`,
      solution: `package main

import (
    "fmt"
    "sync"
    "time"
)

func logEvent(event string, wg *sync.WaitGroup) {
    defer wg.Done()
    time.Sleep(10 * time.Millisecond)
    fmt.Println("logged:", event)
}

func main() {
    var wg sync.WaitGroup
    events := []string{"login", "view", "purchase", "logout"}
    for _, e := range events {
        wg.Add(1)
        go logEvent(e, &wg)
    }
    wg.Wait()
    fmt.Println("done")
}`,
      hints: [
        'Replace time.Sleep with a WaitGroup for reliable waiting.',
        'Pass the WaitGroup to each goroutine.',
        'This ensures all events are logged before exiting.',
      ],
      concepts: ['lifecycle management', 'WaitGroup', 'reliable shutdown'],
    },
  ],
};
