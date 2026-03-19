import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-prf',
  title: '39. Profiling',
  explanation: `## Profiling Go Programs

Go has built-in profiling via \`runtime/pprof\` and \`net/http/pprof\`. Use it to find CPU hotspots, memory allocations, and goroutine issues.

\`\`\`go
// CPU profiling
import "runtime/pprof"

f, _ := os.Create("cpu.prof")
pprof.StartCPUProfile(f)
defer pprof.StopCPUProfile()

// Memory profiling
f, _ := os.Create("mem.prof")
pprof.WriteHeapProfile(f)

// HTTP-based profiling (for servers)
import _ "net/http/pprof"
go http.ListenAndServe(":6060", nil)
// Visit: http://localhost:6060/debug/pprof/

// Benchmark profiling
// go test -bench=. -cpuprofile=cpu.prof
// go test -bench=. -memprofile=mem.prof

// Analyze with go tool pprof
// go tool pprof cpu.prof
// (pprof) top10
// (pprof) web
// (pprof) list FunctionName
\`\`\`

Key profiles:
- CPU: where time is spent
- Heap: memory allocations
- Goroutine: goroutine stacks
- Block: blocking synchronization
- Mutex: mutex contention`,
  exercises: [
    {
      id: 'go-prf-1',
      title: 'Start CPU Profile',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Start and stop a CPU profile.',
      skeleton: `package main

import (
    "os"
    "runtime/pprof"
)

func main() {
    f, _ := os.Create("cpu.prof")
    defer f.Close()
    pprof.__BLANK__(f)
    defer pprof.StopCPUProfile()

    // ... do work ...
    sum := 0
    for i := 0; i < 1000000; i++ {
        sum += i
    }
}`,
      solution: `package main

import (
    "os"
    "runtime/pprof"
)

func main() {
    f, _ := os.Create("cpu.prof")
    defer f.Close()
    pprof.StartCPUProfile(f)
    defer pprof.StopCPUProfile()

    sum := 0
    for i := 0; i < 1000000; i++ {
        sum += i
    }
}`,
      hints: [
        'pprof.StartCPUProfile begins CPU profiling.',
        'pprof.StopCPUProfile stops it and flushes to file.',
        'Use defer to ensure cleanup.',
      ],
      concepts: ['pprof', 'CPU profiling'],
    },
    {
      id: 'go-prf-2',
      title: 'Write Heap Profile',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a memory heap profile.',
      skeleton: `package main

import (
    "os"
    "runtime"
    "runtime/pprof"
)

func main() {
    data := make([][]byte, 1000)
    for i := range data {
        data[i] = make([]byte, 1024)
    }

    runtime.GC()
    f, _ := os.Create("mem.prof")
    defer f.Close()
    pprof.__BLANK__(f)
}`,
      solution: `package main

import (
    "os"
    "runtime"
    "runtime/pprof"
)

func main() {
    data := make([][]byte, 1000)
    for i := range data {
        data[i] = make([]byte, 1024)
    }

    runtime.GC()
    f, _ := os.Create("mem.prof")
    defer f.Close()
    pprof.WriteHeapProfile(f)
}`,
      hints: [
        'pprof.WriteHeapProfile writes a snapshot of heap allocations.',
        'Call runtime.GC() first for accurate results.',
        'The profile shows current live allocations.',
      ],
      concepts: ['pprof', 'heap profiling'],
    },
    {
      id: 'go-prf-3',
      title: 'HTTP Pprof Import',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Enable HTTP-based profiling for a server.',
      skeleton: `package main

import (
    "fmt"
    "net/http"
    __BLANK__
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello!")
}

func main() {
    http.HandleFunc("/", handler)
    // Profiles available at /debug/pprof/
    http.ListenAndServe(":8080", nil)
}`,
      solution: `package main

import (
    "fmt"
    "net/http"
    _ "net/http/pprof"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello!")
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}`,
      hints: [
        'Import net/http/pprof with blank identifier _.',
        'The blank import registers pprof HTTP handlers.',
        'Profiles are then available at /debug/pprof/.',
      ],
      concepts: ['net/http/pprof', 'blank import'],
    },
    {
      id: 'go-prf-4',
      title: 'Benchmark Test Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Write a benchmark function for profiling.',
      skeleton: `package main

import "testing"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func BenchmarkFibonacci(b *testing.__BLANK__) {
    for i := 0; i < b.N; i++ {
        fibonacci(20)
    }
}`,
      solution: `package main

import "testing"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func BenchmarkFibonacci(b *testing.B) {
    for i := 0; i < b.N; i++ {
        fibonacci(20)
    }
}`,
      hints: [
        'Benchmark functions take *testing.B parameter.',
        'b.N is adjusted by the testing framework.',
        'Run with: go test -bench=BenchmarkFibonacci.',
      ],
      concepts: ['benchmarking', 'testing.B'],
    },
    {
      id: 'go-prf-5',
      title: 'Memory Allocation Tracking',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Report memory allocation statistics in a benchmark.',
      skeleton: `package main

import "testing"

func concat(strs []string) string {
    result := ""
    for _, s := range strs {
        result += s
    }
    return result
}

func BenchmarkConcat(b *testing.B) {
    strs := []string{"hello", " ", "world", "!"}
    b.__BLANK__()
    for i := 0; i < b.N; i++ {
        concat(strs)
    }
}`,
      solution: `package main

import "testing"

func concat(strs []string) string {
    result := ""
    for _, s := range strs {
        result += s
    }
    return result
}

func BenchmarkConcat(b *testing.B) {
    strs := []string{"hello", " ", "world", "!"}
    b.ReportAllocs()
    for i := 0; i < b.N; i++ {
        concat(strs)
    }
}`,
      hints: [
        'b.ReportAllocs() reports memory allocation stats.',
        'It shows allocs/op and bytes/op in output.',
        'Useful for comparing allocation efficiency.',
      ],
      concepts: ['benchmarking', 'ReportAllocs'],
    },
    {
      id: 'go-prf-6',
      title: 'Runtime MemStats',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Read memory statistics using runtime.MemStats.',
      skeleton: `package main

import (
    "fmt"
    "runtime"
)

func main() {
    var m runtime.MemStats
    runtime.__BLANK__(&m)

    fmt.Printf("Alloc: %d KB\\n", m.Alloc/1024)
    fmt.Printf("TotalAlloc: %d KB\\n", m.TotalAlloc/1024)
    fmt.Printf("Sys: %d KB\\n", m.Sys/1024)
    fmt.Printf("NumGC: %d\\n", m.NumGC)
}`,
      solution: `package main

import (
    "fmt"
    "runtime"
)

func main() {
    var m runtime.MemStats
    runtime.ReadMemStats(&m)

    fmt.Printf("Alloc: %d KB\\n", m.Alloc/1024)
    fmt.Printf("TotalAlloc: %d KB\\n", m.TotalAlloc/1024)
    fmt.Printf("Sys: %d KB\\n", m.Sys/1024)
    fmt.Printf("NumGC: %d\\n", m.NumGC)
}`,
      hints: [
        'runtime.ReadMemStats populates a MemStats struct.',
        'Alloc is current heap allocation.',
        'TotalAlloc is cumulative allocation.',
      ],
      concepts: ['runtime.MemStats', 'memory statistics'],
    },
    {
      id: 'go-prf-7',
      title: 'Predict Allocation Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict which operation allocates more memory.',
      skeleton: `package main

import "fmt"

func main() {
    // Method A: string concatenation in loop
    a := ""
    for i := 0; i < 5; i++ {
        a += "x"
    }

    // Method B: pre-allocated byte slice
    b := make([]byte, 0, 5)
    for i := 0; i < 5; i++ {
        b = append(b, 'x')
    }

    fmt.Println(len(a), len(string(b)))
    // Which has more allocations, A or B?
    fmt.Println("A has more allocations")
}`,
      solution: `5 5
A has more allocations`,
      hints: [
        'String concatenation creates a new string each iteration.',
        'Pre-allocated append avoids reallocation.',
        'Method A: ~5 allocations. Method B: 1 allocation.',
      ],
      concepts: ['memory allocation', 'string vs builder'],
    },
    {
      id: 'go-prf-8',
      title: 'Predict GC Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict when garbage collection runs.',
      skeleton: `package main

import (
    "fmt"
    "runtime"
)

func main() {
    var m runtime.MemStats

    runtime.ReadMemStats(&m)
    gc1 := m.NumGC

    // Allocate some memory
    data := make([]byte, 10*1024*1024) // 10MB
    _ = data

    runtime.GC() // Force GC

    runtime.ReadMemStats(&m)
    gc2 := m.NumGC

    fmt.Println(gc2 > gc1)
}`,
      solution: `true`,
      hints: [
        'runtime.GC() forces a garbage collection cycle.',
        'After GC, NumGC increments.',
        'gc2 will be greater than gc1.',
      ],
      concepts: ['garbage collection', 'runtime.GC'],
    },
    {
      id: 'go-prf-9',
      title: 'Predict Escape Analysis',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Predict whether a variable escapes to the heap.',
      skeleton: `package main

import "fmt"

func noEscape() int {
    x := 42 // stays on stack
    return x
}

func escapes() *int {
    x := 42 // escapes to heap
    return &x
}

func main() {
    a := noEscape()
    b := escapes()
    fmt.Println(a, *b)
}`,
      solution: `42 42`,
      hints: [
        'noEscape returns a copy, x stays on stack.',
        'escapes returns a pointer, x must live on heap.',
        'Both print 42 but differ in allocation behavior.',
      ],
      concepts: ['escape analysis', 'stack vs heap'],
    },
    {
      id: 'go-prf-10',
      title: 'CPU Profile Analyzer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write code that generates a CPU profile for analysis.',
      skeleton: `package main

import (
    "fmt"
    "os"
    "runtime/pprof"
    "sort"
    "math/rand"
)

// heavyWork does CPU-intensive operations
func heavyWork() {
    data := make([]int, 100000)
    for i := range data {
        data[i] = rand.Intn(100000)
    }
    sort.Ints(data)
}

// profiledRun executes fn while CPU profiling to the given file.
func profiledRun(filename string, fn func()) error {
    // TODO: implement
}

func main() {
    err := profiledRun("cpu.prof", func() {
        for i := 0; i < 10; i++ {
            heavyWork()
        }
    })
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Profile written to cpu.prof")
    }
}`,
      solution: `package main

import (
    "fmt"
    "os"
    "runtime/pprof"
    "sort"
    "math/rand"
)

func heavyWork() {
    data := make([]int, 100000)
    for i := range data {
        data[i] = rand.Intn(100000)
    }
    sort.Ints(data)
}

func profiledRun(filename string, fn func()) error {
    f, err := os.Create(filename)
    if err != nil {
        return err
    }
    defer f.Close()

    if err := pprof.StartCPUProfile(f); err != nil {
        return err
    }
    defer pprof.StopCPUProfile()

    fn()
    return nil
}

func main() {
    err := profiledRun("cpu.prof", func() {
        for i := 0; i < 10; i++ {
            heavyWork()
        }
    })
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Profile written to cpu.prof")
    }
}`,
      hints: [
        'Create the file, start profiling, run the function, stop.',
        'Handle errors from os.Create and StartCPUProfile.',
        'Use defer for cleanup.',
      ],
      concepts: ['pprof', 'CPU profiling', 'wrapper function'],
    },
    {
      id: 'go-prf-11',
      title: 'Memory Tracker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a function that tracks memory usage before and after an operation.',
      skeleton: `package main

import (
    "fmt"
    "runtime"
)

type MemDelta struct {
    AllocDelta int64
    NumGCDelta uint32
}

// trackMemory runs fn and returns the memory delta.
func trackMemory(fn func()) MemDelta {
    // TODO: implement
}

func main() {
    delta := trackMemory(func() {
        data := make([]byte, 1024*1024) // 1MB
        _ = data
    })
    fmt.Printf("Alloc delta: %d bytes\\n", delta.AllocDelta)
    fmt.Printf("GC cycles: %d\\n", delta.NumGCDelta)
}`,
      solution: `package main

import (
    "fmt"
    "runtime"
)

type MemDelta struct {
    AllocDelta int64
    NumGCDelta uint32
}

func trackMemory(fn func()) MemDelta {
    runtime.GC()
    var before runtime.MemStats
    runtime.ReadMemStats(&before)

    fn()

    var after runtime.MemStats
    runtime.ReadMemStats(&after)

    return MemDelta{
        AllocDelta: int64(after.TotalAlloc) - int64(before.TotalAlloc),
        NumGCDelta: after.NumGC - before.NumGC,
    }
}

func main() {
    delta := trackMemory(func() {
        data := make([]byte, 1024*1024)
        _ = data
    })
    fmt.Printf("Alloc delta: %d bytes\\n", delta.AllocDelta)
    fmt.Printf("GC cycles: %d\\n", delta.NumGCDelta)
}`,
      hints: [
        'Read MemStats before and after running fn.',
        'Use TotalAlloc for cumulative allocation tracking.',
        'Force GC before the first read for accuracy.',
      ],
      concepts: ['runtime.MemStats', 'memory tracking'],
    },
    {
      id: 'go-prf-12',
      title: 'Custom Pprof Profile',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Create and use a custom pprof profile.',
      skeleton: `package main

import (
    "fmt"
    "runtime/pprof"
    "sync"
)

// Create a custom profile to track active workers
var workerProfile = pprof.NewProfile("workers")

type Worker struct {
    ID   int
    done chan struct{}
}

// startWorker creates a worker and adds it to the profile.
func startWorker(id int) *Worker {
    // TODO: implement - create worker, add to profile
}

// stopWorker removes the worker from the profile.
func (w *Worker) stopWorker() {
    // TODO: implement - remove from profile
}

func main() {
    var wg sync.WaitGroup
    workers := make([]*Worker, 3)
    for i := 0; i < 3; i++ {
        workers[i] = startWorker(i)
    }

    fmt.Printf("Active workers: %d\\n", workerProfile.Count())

    for _, w := range workers {
        w.stopWorker()
    }
    _ = wg

    fmt.Printf("Active workers: %d\\n", workerProfile.Count())
}`,
      solution: `package main

import (
    "fmt"
    "runtime/pprof"
    "sync"
)

var workerProfile = pprof.NewProfile("workers")

type Worker struct {
    ID   int
    done chan struct{}
}

func startWorker(id int) *Worker {
    w := &Worker{ID: id, done: make(chan struct{})}
    workerProfile.Add(w, 1)
    return w
}

func (w *Worker) stopWorker() {
    workerProfile.Remove(w)
    close(w.done)
}

func main() {
    var wg sync.WaitGroup
    workers := make([]*Worker, 3)
    for i := 0; i < 3; i++ {
        workers[i] = startWorker(i)
    }

    fmt.Printf("Active workers: %d\\n", workerProfile.Count())

    for _, w := range workers {
        w.stopWorker()
    }
    _ = wg

    fmt.Printf("Active workers: %d\\n", workerProfile.Count())
}`,
      hints: [
        'pprof.NewProfile creates a custom named profile.',
        'profile.Add(value, skip) adds an entry.',
        'profile.Remove(value) removes it.',
      ],
      concepts: ['pprof', 'custom profile', 'resource tracking'],
    },
    {
      id: 'go-prf-13',
      title: 'Fix Profile Not Flushed',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix a CPU profile that produces an empty file.',
      skeleton: `package main

import (
    "fmt"
    "os"
    "runtime/pprof"
)

func main() {
    f, _ := os.Create("cpu.prof")
    pprof.StartCPUProfile(f)

    sum := 0
    for i := 0; i < 10000000; i++ {
        sum += i
    }

    // BUG: Profile is not stopped before file is closed
    f.Close()
    fmt.Println("Sum:", sum)
}`,
      solution: `package main

import (
    "fmt"
    "os"
    "runtime/pprof"
)

func main() {
    f, _ := os.Create("cpu.prof")
    defer f.Close()
    pprof.StartCPUProfile(f)
    defer pprof.StopCPUProfile()

    sum := 0
    for i := 0; i < 10000000; i++ {
        sum += i
    }

    fmt.Println("Sum:", sum)
}`,
      hints: [
        'StopCPUProfile must be called before closing the file.',
        'Use defer for both StopCPUProfile and f.Close.',
        'defer runs in LIFO order: Stop first, then Close.',
      ],
      concepts: ['pprof', 'StopCPUProfile', 'defer order'],
    },
    {
      id: 'go-prf-14',
      title: 'Fix Benchmark Timer',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix a benchmark that includes setup time in measurements.',
      skeleton: `package main

import (
    "math/rand"
    "sort"
    "testing"
)

func BenchmarkSort(b *testing.B) {
    // BUG: Setup is included in benchmark timing
    for i := 0; i < b.N; i++ {
        data := make([]int, 10000)
        for j := range data {
            data[j] = rand.Intn(10000)
        }
        sort.Ints(data)
    }
}`,
      solution: `package main

import (
    "math/rand"
    "sort"
    "testing"
)

func BenchmarkSort(b *testing.B) {
    for i := 0; i < b.N; i++ {
        b.StopTimer()
        data := make([]int, 10000)
        for j := range data {
            data[j] = rand.Intn(10000)
        }
        b.StartTimer()
        sort.Ints(data)
    }
}`,
      hints: [
        'Use b.StopTimer() before setup code.',
        'Use b.StartTimer() before the code being measured.',
        'This excludes setup from the timing.',
      ],
      concepts: ['benchmarking', 'StopTimer', 'StartTimer'],
    },
    {
      id: 'go-prf-15',
      title: 'Fix Memory Profile Timing',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix a memory profile taken before allocations happen.',
      skeleton: `package main

import (
    "fmt"
    "os"
    "runtime"
    "runtime/pprof"
)

func allocate() [][]byte {
    result := make([][]byte, 100)
    for i := range result {
        result[i] = make([]byte, 1024*1024)
    }
    return result
}

func main() {
    // BUG: Profile taken before allocation
    runtime.GC()
    f, _ := os.Create("mem.prof")
    pprof.WriteHeapProfile(f)
    f.Close()

    data := allocate()
    fmt.Printf("Allocated %d MB\\n", len(data))
}`,
      solution: `package main

import (
    "fmt"
    "os"
    "runtime"
    "runtime/pprof"
)

func allocate() [][]byte {
    result := make([][]byte, 100)
    for i := range result {
        result[i] = make([]byte, 1024*1024)
    }
    return result
}

func main() {
    data := allocate()
    fmt.Printf("Allocated %d MB\\n", len(data))

    runtime.GC()
    f, _ := os.Create("mem.prof")
    defer f.Close()
    pprof.WriteHeapProfile(f)
}`,
      hints: [
        'Write the heap profile AFTER allocations.',
        'Run GC first to get accurate live heap data.',
        'The profile captures the current state, not future allocations.',
      ],
      concepts: ['pprof', 'heap profile', 'timing'],
    },
    {
      id: 'go-prf-16',
      title: 'Benchmark Comparison',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write benchmark functions to compare two implementations.',
      skeleton: `package main

import (
    "strings"
    "testing"
)

// concatLoop concatenates strings using += in a loop
func concatLoop(words []string) string {
    result := ""
    for _, w := range words {
        result += w
    }
    return result
}

// concatBuilder concatenates strings using strings.Builder
func concatBuilder(words []string) string {
    // TODO: implement using strings.Builder
}

// Write two benchmark functions to compare them.
// TODO: BenchmarkConcatLoop and BenchmarkConcatBuilder`,
      solution: `package main

import (
    "strings"
    "testing"
)

func concatLoop(words []string) string {
    result := ""
    for _, w := range words {
        result += w
    }
    return result
}

func concatBuilder(words []string) string {
    var b strings.Builder
    for _, w := range words {
        b.WriteString(w)
    }
    return b.String()
}

func BenchmarkConcatLoop(b *testing.B) {
    words := []string{"hello", " ", "world", " ", "from", " ", "go"}
    b.ReportAllocs()
    for i := 0; i < b.N; i++ {
        concatLoop(words)
    }
}

func BenchmarkConcatBuilder(b *testing.B) {
    words := []string{"hello", " ", "world", " ", "from", " ", "go"}
    b.ReportAllocs()
    for i := 0; i < b.N; i++ {
        concatBuilder(words)
    }
}`,
      hints: [
        'strings.Builder is more efficient for repeated concatenation.',
        'Use b.ReportAllocs() to see allocation differences.',
        'Builder pre-allocates and avoids copying.',
      ],
      concepts: ['benchmarking', 'strings.Builder', 'performance comparison'],
    },
    {
      id: 'go-prf-17',
      title: 'Goroutine Profile',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Write a function that captures and reports goroutine counts.',
      skeleton: `package main

import (
    "fmt"
    "runtime"
    "time"
)

// goroutineMonitor prints the goroutine count every interval.
// It runs until the done channel is closed.
func goroutineMonitor(interval time.Duration, done <-chan struct{}) {
    // TODO: implement
}

func main() {
    done := make(chan struct{})
    go goroutineMonitor(100*time.Millisecond, done)

    for i := 0; i < 5; i++ {
        go func(n int) {
            time.Sleep(time.Duration(n) * 100 * time.Millisecond)
        }(i)
    }

    time.Sleep(600 * time.Millisecond)
    close(done)
    time.Sleep(50 * time.Millisecond)
}`,
      solution: `package main

import (
    "fmt"
    "runtime"
    "time"
)

func goroutineMonitor(interval time.Duration, done <-chan struct{}) {
    ticker := time.NewTicker(interval)
    defer ticker.Stop()
    for {
        select {
        case <-ticker.C:
            fmt.Printf("Goroutines: %d\n", runtime.NumGoroutine())
        case <-done:
            return
        }
    }
}

func main() {
    done := make(chan struct{})
    go goroutineMonitor(100*time.Millisecond, done)

    for i := 0; i < 5; i++ {
        go func(n int) {
            time.Sleep(time.Duration(n) * 100 * time.Millisecond)
        }(i)
    }

    time.Sleep(600 * time.Millisecond)
    close(done)
    time.Sleep(50 * time.Millisecond)
}`,
      hints: [
        'runtime.NumGoroutine() returns active goroutine count.',
        'Use a ticker for periodic reporting.',
        'Select on ticker and done channel.',
      ],
      concepts: ['runtime.NumGoroutine', 'goroutine monitoring'],
    },
    {
      id: 'go-prf-18',
      title: 'Allocation-Free Hot Path',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Rewrite a function to minimize heap allocations.',
      skeleton: `package main

import (
    "fmt"
    "strconv"
)

// formatInts converts ints to a comma-separated string.
// Current version allocates heavily.
func formatInts(nums []int) string {
    strs := make([]string, len(nums)) // allocation
    for i, n := range nums {
        strs[i] = strconv.Itoa(n) // allocation per int
    }
    result := ""
    for i, s := range strs {
        if i > 0 {
            result += "," // allocation per concat
        }
        result += s // allocation per concat
    }
    return result
}

// formatIntsOptimized uses a byte buffer to minimize allocations.
// TODO: implement

func main() {
    nums := []int{1, 2, 3, 4, 5, 10, 20, 30}
    fmt.Println(formatInts(nums))
    // fmt.Println(formatIntsOptimized(nums))
}`,
      solution: `package main

import (
    "fmt"
    "strconv"
)

func formatInts(nums []int) string {
    strs := make([]string, len(nums))
    for i, n := range nums {
        strs[i] = strconv.Itoa(n)
    }
    result := ""
    for i, s := range strs {
        if i > 0 {
            result += ","
        }
        result += s
    }
    return result
}

func formatIntsOptimized(nums []int) string {
    if len(nums) == 0 {
        return ""
    }
    buf := make([]byte, 0, len(nums)*4)
    for i, n := range nums {
        if i > 0 {
            buf = append(buf, ',')
        }
        buf = strconv.AppendInt(buf, int64(n), 10)
    }
    return string(buf)
}

func main() {
    nums := []int{1, 2, 3, 4, 5, 10, 20, 30}
    fmt.Println(formatInts(nums))
    fmt.Println(formatIntsOptimized(nums))
}`,
      hints: [
        'Pre-allocate a byte buffer with estimated capacity.',
        'strconv.AppendInt appends directly to a byte slice.',
        'Avoid intermediate string allocations.',
      ],
      concepts: ['allocation optimization', 'strconv.AppendInt', 'byte buffer'],
    },
    {
      id: 'go-prf-19',
      title: 'Refactor for Profiling',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor code to be more profile-friendly by extracting hot functions.',
      skeleton: `package main

import "fmt"

func processData(data []int) int {
    // Everything in one function - hard to profile
    total := 0
    for _, v := range data {
        // validation
        if v < 0 {
            v = -v
        }
        // transformation
        v = v*v + 2*v + 1
        // aggregation
        total += v
    }
    return total
}

func main() {
    data := make([]int, 1000)
    for i := range data {
        data[i] = i - 500
    }
    fmt.Println(processData(data))
}`,
      solution: `package main

import "fmt"

func validate(v int) int {
    if v < 0 {
        return -v
    }
    return v
}

func transform(v int) int {
    return v*v + 2*v + 1
}

func aggregate(values []int) int {
    total := 0
    for _, v := range values {
        total += v
    }
    return total
}

func processData(data []int) int {
    transformed := make([]int, len(data))
    for i, v := range data {
        v = validate(v)
        transformed[i] = transform(v)
    }
    return aggregate(transformed)
}

func main() {
    data := make([]int, 1000)
    for i := range data {
        data[i] = i - 500
    }
    fmt.Println(processData(data))
}`,
      hints: [
        'Extract validation, transformation, and aggregation into separate functions.',
        'Profiler can then show which phase is the bottleneck.',
        'Named functions appear clearly in pprof output.',
      ],
      concepts: ['profiling', 'refactoring', 'function extraction'],
    },
    {
      id: 'go-prf-20',
      title: 'Refactor Benchmark for Sub-benchmarks',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor flat benchmarks into structured sub-benchmarks.',
      skeleton: `package main

import (
    "sort"
    "math/rand"
    "testing"
)

func BenchmarkSort100(b *testing.B) {
    for i := 0; i < b.N; i++ {
        data := make([]int, 100)
        for j := range data { data[j] = rand.Intn(1000) }
        sort.Ints(data)
    }
}

func BenchmarkSort1000(b *testing.B) {
    for i := 0; i < b.N; i++ {
        data := make([]int, 1000)
        for j := range data { data[j] = rand.Intn(1000) }
        sort.Ints(data)
    }
}

func BenchmarkSort10000(b *testing.B) {
    for i := 0; i < b.N; i++ {
        data := make([]int, 10000)
        for j := range data { data[j] = rand.Intn(1000) }
        sort.Ints(data)
    }
}`,
      solution: `package main

import (
    "fmt"
    "sort"
    "math/rand"
    "testing"
)

func BenchmarkSort(b *testing.B) {
    sizes := []int{100, 1000, 10000}
    for _, size := range sizes {
        b.Run(fmt.Sprintf("n=%d", size), func(b *testing.B) {
            b.ReportAllocs()
            for i := 0; i < b.N; i++ {
                b.StopTimer()
                data := make([]int, size)
                for j := range data {
                    data[j] = rand.Intn(1000)
                }
                b.StartTimer()
                sort.Ints(data)
            }
        })
    }
}`,
      hints: [
        'Use b.Run(name, func) for sub-benchmarks.',
        'Parameterize the size in a loop.',
        'Run with: go test -bench=BenchmarkSort.',
      ],
      concepts: ['sub-benchmarks', 'b.Run', 'parameterized benchmarks'],
    },
  ],
};
