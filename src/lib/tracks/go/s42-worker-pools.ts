import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
	id: 'go-wpool',
	title: '42. Worker Pools',
	explanation: `## Worker Pools in Go

Worker pools are a concurrency pattern where a fixed number of goroutines process tasks from a shared channel.

### Basic Worker Pool

\`\`\`go
func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    // Start 3 workers
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    // Send 5 jobs
    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)

    for r := 1; r <= 5; r++ {
        fmt.Println(<-results)
    }
}
\`\`\`

### With sync.WaitGroup

\`\`\`go
func pool(numWorkers int, jobs <-chan int) <-chan int {
    results := make(chan int)
    var wg sync.WaitGroup
    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for j := range jobs {
                results <- process(j)
            }
        }()
    }
    go func() {
        wg.Wait()
        close(results)
    }()
    return results
}
\`\`\`

### With errgroup

\`\`\`go
import "golang.org/x/sync/errgroup"

g, ctx := errgroup.WithContext(context.Background())
g.SetLimit(10) // max 10 concurrent goroutines

for _, url := range urls {
    url := url
    g.Go(func() error {
        return fetch(ctx, url)
    })
}
if err := g.Wait(); err != nil {
    log.Fatal(err)
}
\`\`\`

### Semaphore Pattern

\`\`\`go
sem := make(chan struct{}, maxConcurrency)
for _, task := range tasks {
    sem <- struct{}{} // acquire
    go func(t Task) {
        defer func() { <-sem }() // release
        process(t)
    }(task)
}
// Wait for all to finish
for i := 0; i < cap(sem); i++ {
    sem <- struct{}{}
}
\`\`\``,
	exercises: [
		{
			id: 'go-wpool-1',
			title: 'Basic Worker Function',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Complete a basic worker function that reads jobs from a channel.',
			skeleton: `package main

import "fmt"

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := __BLANK__ {
        fmt.Printf("worker %d processing job %d\\n", id, j)
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 5)
    results := make(chan int, 5)

    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)

    for r := 1; r <= 5; r++ {
        fmt.Println(<-results)
    }
}`,
			solution: `package main

import "fmt"

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("worker %d processing job %d\\n", id, j)
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 5)
    results := make(chan int, 5)

    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)

    for r := 1; r <= 5; r++ {
        fmt.Println(<-results)
    }
}`,
			hints: [
				'Use range to iterate over the jobs channel.',
				'range on a channel reads until the channel is closed.',
				'Replace __BLANK__ with range jobs'
			],
			concepts: ['worker-pool', 'range-channel', 'goroutines']
		},
		{
			id: 'go-wpool-2',
			title: 'WaitGroup Pool Completion',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Use WaitGroup to wait for all workers to finish.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    jobs := make(chan int, 10)

    for w := 0; w < 3; w++ {
        __BLANK__
        go func(id int) {
            defer wg.Done()
            for j := range jobs {
                fmt.Printf("worker %d: %d\\n", id, j)
            }
        }(w)
    }

    for j := 0; j < 9; j++ {
        jobs <- j
    }
    close(jobs)
    wg.Wait()
    fmt.Println("all done")
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    jobs := make(chan int, 10)

    for w := 0; w < 3; w++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for j := range jobs {
                fmt.Printf("worker %d: %d\\n", id, j)
            }
        }(w)
    }

    for j := 0; j < 9; j++ {
        jobs <- j
    }
    close(jobs)
    wg.Wait()
    fmt.Println("all done")
}`,
			hints: [
				'Call wg.Add(1) before launching each goroutine.',
				'Each goroutine calls wg.Done() when it finishes.',
				'Replace __BLANK__ with wg.Add(1)'
			],
			concepts: ['waitgroup', 'worker-pool', 'synchronization']
		},
		{
			id: 'go-wpool-3',
			title: 'Semaphore Acquire',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Use a buffered channel as a counting semaphore.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    sem := make(chan struct{}, 3) // max 3 concurrent
    var wg sync.WaitGroup

    for i := 0; i < 10; i++ {
        wg.Add(1)
        __BLANK__ // acquire semaphore
        go func(n int) {
            defer wg.Done()
            defer func() { <-sem }() // release
            fmt.Println("processing", n)
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
    sem := make(chan struct{}, 3) // max 3 concurrent
    var wg sync.WaitGroup

    for i := 0; i < 10; i++ {
        wg.Add(1)
        sem <- struct{}{} // acquire semaphore
        go func(n int) {
            defer wg.Done()
            defer func() { <-sem }() // release
            fmt.Println("processing", n)
        }(i)
    }

    wg.Wait()
    fmt.Println("done")
}`,
			hints: [
				'Send an empty struct to the semaphore channel to acquire.',
				'This blocks if the buffer is full (at max concurrency).',
				'Replace __BLANK__ with sem <- struct{}{}'
			],
			concepts: ['semaphore', 'bounded-concurrency', 'buffered-channel']
		},
		{
			id: 'go-wpool-4',
			title: 'Job and Result Types',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Define typed job and result structs for a worker pool.',
			skeleton: `package main

import "fmt"

type Job struct {
    ID    int
    Input int
}

type Result struct {
    Job    Job
    Output int
}

func worker(jobs <-chan Job, results __BLANK__) {
    for job := range jobs {
        results <- Result{Job: job, Output: job.Input * job.Input}
    }
}

func main() {
    jobs := make(chan Job, 5)
    results := make(chan Result, 5)

    for w := 0; w < 2; w++ {
        go worker(jobs, results)
    }

    for i := 1; i <= 5; i++ {
        jobs <- Job{ID: i, Input: i * 10}
    }
    close(jobs)

    for i := 0; i < 5; i++ {
        r := <-results
        fmt.Printf("job %d: %d^2 = %d\\n", r.Job.ID, r.Job.Input, r.Output)
    }
}`,
			solution: `package main

import "fmt"

type Job struct {
    ID    int
    Input int
}

type Result struct {
    Job    Job
    Output int
}

func worker(jobs <-chan Job, results chan<- Result) {
    for job := range jobs {
        results <- Result{Job: job, Output: job.Input * job.Input}
    }
}

func main() {
    jobs := make(chan Job, 5)
    results := make(chan Result, 5)

    for w := 0; w < 2; w++ {
        go worker(jobs, results)
    }

    for i := 1; i <= 5; i++ {
        jobs <- Job{ID: i, Input: i * 10}
    }
    close(jobs)

    for i := 0; i < 5; i++ {
        r := <-results
        fmt.Printf("job %d: %d^2 = %d\\n", r.Job.ID, r.Job.Input, r.Output)
    }
}`,
			hints: [
				'The results channel is send-only from the worker perspective.',
				'Use chan<- Result for a send-only channel of Result.',
				'Replace __BLANK__ with chan<- Result'
			],
			concepts: ['typed-channels', 'job-result-pattern', 'directional-channels']
		},
		{
			id: 'go-wpool-5',
			title: 'Errgroup Limit',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Use errgroup with a concurrency limit.',
			skeleton: `package main

import (
    "context"
    "fmt"
    "golang.org/x/sync/errgroup"
)

func main() {
    g, _ := errgroup.WithContext(context.Background())
    __BLANK__

    for i := 0; i < 20; i++ {
        i := i
        g.Go(func() error {
            fmt.Println("task", i)
            return nil
        })
    }

    if err := g.Wait(); err != nil {
        fmt.Println("error:", err)
    }
    fmt.Println("done")
}`,
			solution: `package main

import (
    "context"
    "fmt"
    "golang.org/x/sync/errgroup"
)

func main() {
    g, _ := errgroup.WithContext(context.Background())
    g.SetLimit(5)

    for i := 0; i < 20; i++ {
        i := i
        g.Go(func() error {
            fmt.Println("task", i)
            return nil
        })
    }

    if err := g.Wait(); err != nil {
        fmt.Println("error:", err)
    }
    fmt.Println("done")
}`,
			hints: [
				'errgroup.Group has a SetLimit method to cap concurrency.',
				'Pass the maximum number of concurrent goroutines.',
				'Replace __BLANK__ with g.SetLimit(5)'
			],
			concepts: ['errgroup', 'concurrency-limit', 'error-handling']
		},
		{
			id: 'go-wpool-6',
			title: 'Pool with Context Cancellation',
			type: 'fill-blank',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Cancel workers using context when an error occurs.',
			skeleton: `package main

import (
    "context"
    "fmt"
    "sync"
)

func worker(ctx context.Context, id int, jobs <-chan int, results chan<- int) {
    for {
        select {
        case __BLANK__:
            fmt.Printf("worker %d cancelled\\n", id)
            return
        case j, ok := <-jobs:
            if !ok {
                return
            }
            results <- j * 2
        }
    }
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()

    jobs := make(chan int, 10)
    results := make(chan int, 10)

    var wg sync.WaitGroup
    for w := 0; w < 3; w++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            worker(ctx, id, jobs, results)
        }(w)
    }

    for j := 0; j < 10; j++ {
        jobs <- j
    }
    close(jobs)
    wg.Wait()
    close(results)

    for r := range results {
        fmt.Println(r)
    }
}`,
			solution: `package main

import (
    "context"
    "fmt"
    "sync"
)

func worker(ctx context.Context, id int, jobs <-chan int, results chan<- int) {
    for {
        select {
        case <-ctx.Done():
            fmt.Printf("worker %d cancelled\\n", id)
            return
        case j, ok := <-jobs:
            if !ok {
                return
            }
            results <- j * 2
        }
    }
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()

    jobs := make(chan int, 10)
    results := make(chan int, 10)

    var wg sync.WaitGroup
    for w := 0; w < 3; w++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            worker(ctx, id, jobs, results)
        }(w)
    }

    for j := 0; j < 10; j++ {
        jobs <- j
    }
    close(jobs)
    wg.Wait()
    close(results)

    for r := range results {
        fmt.Println(r)
    }
}`,
			hints: [
				'ctx.Done() returns a channel closed when the context is cancelled.',
				'Use <-ctx.Done() in a select case to detect cancellation.',
				'Replace __BLANK__ with <-ctx.Done()'
			],
			concepts: ['context-cancellation', 'worker-pool', 'select']
		},
		{
			id: 'go-wpool-7',
			title: 'Simple Worker Pool',
			type: 'write-function',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Write a pool function that runs N workers processing jobs.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

// pool starts numWorkers goroutines that read from jobs,
// double each value, and send results. Returns results channel.
func pool(numWorkers int, jobs <-chan int) <-chan int {
    // TODO: implement
}

func main() {
    jobs := make(chan int, 6)
    for i := 1; i <= 6; i++ {
        jobs <- i
    }
    close(jobs)

    for r := range pool(3, jobs) {
        fmt.Println(r)
    }
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

// pool starts numWorkers goroutines that read from jobs,
// double each value, and send results. Returns results channel.
func pool(numWorkers int, jobs <-chan int) <-chan int {
    results := make(chan int)
    var wg sync.WaitGroup
    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for j := range jobs {
                results <- j * 2
            }
        }()
    }
    go func() {
        wg.Wait()
        close(results)
    }()
    return results
}

func main() {
    jobs := make(chan int, 6)
    for i := 1; i <= 6; i++ {
        jobs <- i
    }
    close(jobs)

    for r := range pool(3, jobs) {
        fmt.Println(r)
    }
}`,
			hints: [
				'Create a results channel and launch numWorkers goroutines.',
				'Use WaitGroup to track when all workers finish.',
				'Close results in a separate goroutine after wg.Wait().'
			],
			concepts: ['worker-pool', 'waitgroup', 'channel-ownership']
		},
		{
			id: 'go-wpool-8',
			title: 'Pool with Error Collection',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Write a worker pool that collects errors from failed jobs.',
			skeleton: `package main

import (
    "errors"
    "fmt"
    "sync"
)

type Result struct {
    Value int
    Err   error
}

// processPool runs numWorkers goroutines. Each job that is negative
// should produce an error "negative input: <value>".
// Positive values produce Value = input * 3.
func processPool(numWorkers int, jobs <-chan int) <-chan Result {
    // TODO: implement
}

func main() {
    jobs := make(chan int, 6)
    inputs := []int{5, -2, 10, -7, 3, 8}
    for _, v := range inputs {
        jobs <- v
    }
    close(jobs)

    for r := range processPool(3, jobs) {
        if r.Err != nil {
            fmt.Println("error:", r.Err)
        } else {
            fmt.Println("result:", r.Value)
        }
    }
}`,
			solution: `package main

import (
    "errors"
    "fmt"
    "sync"
)

type Result struct {
    Value int
    Err   error
}

// processPool runs numWorkers goroutines. Each job that is negative
// should produce an error "negative input: <value>".
// Positive values produce Value = input * 3.
func processPool(numWorkers int, jobs <-chan int) <-chan Result {
    results := make(chan Result)
    var wg sync.WaitGroup
    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for j := range jobs {
                if j < 0 {
                    results <- Result{Err: errors.New(fmt.Sprintf("negative input: %d", j))}
                } else {
                    results <- Result{Value: j * 3}
                }
            }
        }()
    }
    go func() {
        wg.Wait()
        close(results)
    }()
    return results
}

func main() {
    jobs := make(chan int, 6)
    inputs := []int{5, -2, 10, -7, 3, 8}
    for _, v := range inputs {
        jobs <- v
    }
    close(jobs)

    for r := range processPool(3, jobs) {
        if r.Err != nil {
            fmt.Println("error:", r.Err)
        } else {
            fmt.Println("result:", r.Value)
        }
    }
}`,
			hints: [
				'Each worker checks if the job value is negative.',
				'Send a Result with Err set for negatives, Value for positives.',
				'Use the same WaitGroup + close pattern for the results channel.'
			],
			concepts: ['error-handling', 'worker-pool', 'result-type']
		},
		{
			id: 'go-wpool-9',
			title: 'Dynamic Dispatch Pool',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Write a pool where each job carries its own processing function.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

type Job struct {
    ID      int
    Execute func() int
}

// dispatch runs numWorkers goroutines processing Job items.
// Returns a channel of (jobID, result) pairs.
func dispatch(numWorkers int, jobs <-chan Job) <-chan [2]int {
    // TODO: implement
}

func main() {
    jobs := make(chan Job, 4)
    jobs <- Job{ID: 1, Execute: func() int { return 10 + 5 }}
    jobs <- Job{ID: 2, Execute: func() int { return 20 * 3 }}
    jobs <- Job{ID: 3, Execute: func() int { return 100 / 4 }}
    jobs <- Job{ID: 4, Execute: func() int { return 7 * 7 }}
    close(jobs)

    for pair := range dispatch(2, jobs) {
        fmt.Printf("job %d -> %d\\n", pair[0], pair[1])
    }
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

type Job struct {
    ID      int
    Execute func() int
}

// dispatch runs numWorkers goroutines processing Job items.
// Returns a channel of (jobID, result) pairs.
func dispatch(numWorkers int, jobs <-chan Job) <-chan [2]int {
    results := make(chan [2]int)
    var wg sync.WaitGroup
    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for job := range jobs {
                results <- [2]int{job.ID, job.Execute()}
            }
        }()
    }
    go func() {
        wg.Wait()
        close(results)
    }()
    return results
}

func main() {
    jobs := make(chan Job, 4)
    jobs <- Job{ID: 1, Execute: func() int { return 10 + 5 }}
    jobs <- Job{ID: 2, Execute: func() int { return 20 * 3 }}
    jobs <- Job{ID: 3, Execute: func() int { return 100 / 4 }}
    jobs <- Job{ID: 4, Execute: func() int { return 7 * 7 }}
    close(jobs)

    for pair := range dispatch(2, jobs) {
        fmt.Printf("job %d -> %d\\n", pair[0], pair[1])
    }
}`,
			hints: [
				'Each Job has an Execute function - call it to get the result.',
				'Pair the job.ID with the Execute() return value.',
				'Use the standard WaitGroup pattern to close results.'
			],
			concepts: ['dynamic-dispatch', 'function-values', 'worker-pool']
		},
		{
			id: 'go-wpool-10',
			title: 'Bounded Pool with Semaphore',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Implement bounded concurrency using a semaphore channel.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

// boundedProcess processes all items with at most maxConcurrency goroutines.
// Each item is squared. Returns results as a slice.
func boundedProcess(items []int, maxConcurrency int) []int {
    // TODO: implement
}

func main() {
    items := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    results := boundedProcess(items, 3)
    fmt.Println(results)
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

// boundedProcess processes all items with at most maxConcurrency goroutines.
// Each item is squared. Returns results as a slice.
func boundedProcess(items []int, maxConcurrency int) []int {
    results := make([]int, len(items))
    sem := make(chan struct{}, maxConcurrency)
    var wg sync.WaitGroup

    for i, item := range items {
        wg.Add(1)
        sem <- struct{}{}
        go func(idx, val int) {
            defer wg.Done()
            defer func() { <-sem }()
            results[idx] = val * val
        }(i, item)
    }

    wg.Wait()
    return results
}

func main() {
    items := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    results := boundedProcess(items, 3)
    fmt.Println(results)
}`,
			hints: [
				'Use a buffered channel of empty structs as a semaphore.',
				'Send to acquire, receive to release.',
				'Pre-allocate the results slice and write by index to avoid races.'
			],
			concepts: ['semaphore', 'bounded-concurrency', 'index-safety']
		},
		{
			id: 'go-wpool-11',
			title: 'Pool with Graceful Shutdown',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Write a worker pool that shuts down gracefully via context.',
			skeleton: `package main

import (
    "context"
    "fmt"
    "sync"
    "time"
)

// runPool starts numWorkers goroutines that process jobs until
// ctx is cancelled. Returns when all workers have stopped.
func runPool(ctx context.Context, numWorkers int, jobs <-chan int) []int {
    // TODO: implement - collect all processed results
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 150*time.Millisecond)
    defer cancel()

    jobs := make(chan int)
    go func() {
        defer close(jobs)
        for i := 0; ; i++ {
            select {
            case <-ctx.Done():
                return
            case jobs <- i:
                time.Sleep(20 * time.Millisecond)
            }
        }
    }()

    results := runPool(ctx, 3, jobs)
    fmt.Println("processed:", len(results), "items")
}`,
			solution: `package main

import (
    "context"
    "fmt"
    "sync"
    "time"
)

// runPool starts numWorkers goroutines that process jobs until
// ctx is cancelled. Returns when all workers have stopped.
func runPool(ctx context.Context, numWorkers int, jobs <-chan int) []int {
    var mu sync.Mutex
    var results []int
    var wg sync.WaitGroup

    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for {
                select {
                case <-ctx.Done():
                    return
                case j, ok := <-jobs:
                    if !ok {
                        return
                    }
                    mu.Lock()
                    results = append(results, j*2)
                    mu.Unlock()
                }
            }
        }()
    }

    wg.Wait()
    return results
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 150*time.Millisecond)
    defer cancel()

    jobs := make(chan int)
    go func() {
        defer close(jobs)
        for i := 0; ; i++ {
            select {
            case <-ctx.Done():
                return
            case jobs <- i:
                time.Sleep(20 * time.Millisecond)
            }
        }
    }()

    results := runPool(ctx, 3, jobs)
    fmt.Println("processed:", len(results), "items")
}`,
			hints: [
				'Workers check both ctx.Done() and jobs in a select.',
				'Use a mutex to safely append to the shared results slice.',
				'WaitGroup ensures all workers finish before returning.'
			],
			concepts: ['graceful-shutdown', 'context', 'mutex', 'worker-pool']
		},
		{
			id: 'go-wpool-12',
			title: 'Sync.Pool Object Reuse',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Use sync.Pool to reuse byte buffers across goroutines.',
			skeleton: `package main

import (
    "bytes"
    "fmt"
    "sync"
)

// newBufferPool creates a sync.Pool that produces *bytes.Buffer objects.
func newBufferPool() *sync.Pool {
    // TODO: implement
}

// useBuffer gets a buffer from the pool, writes msg to it,
// returns the string, and puts the buffer back.
func useBuffer(pool *sync.Pool, msg string) string {
    // TODO: implement
}

func main() {
    pool := newBufferPool()

    var wg sync.WaitGroup
    messages := []string{"hello", "world", "foo", "bar"}
    for _, msg := range messages {
        wg.Add(1)
        go func(m string) {
            defer wg.Done()
            result := useBuffer(pool, m)
            fmt.Println(result)
        }(msg)
    }
    wg.Wait()
}`,
			solution: `package main

import (
    "bytes"
    "fmt"
    "sync"
)

// newBufferPool creates a sync.Pool that produces *bytes.Buffer objects.
func newBufferPool() *sync.Pool {
    return &sync.Pool{
        New: func() interface{} {
            return new(bytes.Buffer)
        },
    }
}

// useBuffer gets a buffer from the pool, writes msg to it,
// returns the string, and puts the buffer back.
func useBuffer(pool *sync.Pool, msg string) string {
    buf := pool.Get().(*bytes.Buffer)
    buf.Reset()
    buf.WriteString("processed: ")
    buf.WriteString(msg)
    result := buf.String()
    pool.Put(buf)
    return result
}

func main() {
    pool := newBufferPool()

    var wg sync.WaitGroup
    messages := []string{"hello", "world", "foo", "bar"}
    for _, msg := range messages {
        wg.Add(1)
        go func(m string) {
            defer wg.Done()
            result := useBuffer(pool, m)
            fmt.Println(result)
        }(msg)
    }
    wg.Wait()
}`,
			hints: [
				'sync.Pool has a New field that creates fresh objects.',
				'Get() retrieves from pool, Put() returns to pool.',
				'Always Reset() a buffer before reusing it.'
			],
			concepts: ['sync-pool', 'object-reuse', 'bytes-buffer']
		},
		{
			id: 'go-wpool-13',
			title: 'Missing WaitGroup Done',
			type: 'fix-bug',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Fix the deadlock caused by missing WaitGroup Done calls.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    jobs := []int{1, 2, 3, 4, 5}

    for _, j := range jobs {
        wg.Add(1)
        go func(n int) {
            fmt.Println("processing", n)
        }(j)
    }

    wg.Wait()
    fmt.Println("all done")
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    jobs := []int{1, 2, 3, 4, 5}

    for _, j := range jobs {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            fmt.Println("processing", n)
        }(j)
    }

    wg.Wait()
    fmt.Println("all done")
}`,
			hints: [
				'Each goroutine must call wg.Done() when it finishes.',
				'Without Done(), Wait() blocks forever.',
				'Use defer wg.Done() at the start of the goroutine.'
			],
			concepts: ['waitgroup', 'deadlock', 'defer']
		},
		{
			id: 'go-wpool-14',
			title: 'Loop Variable Capture Bug',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the goroutine loop variable capture bug.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    results := make([]int, 5)

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            results[i] = i * i
        }()
    }

    wg.Wait()
    fmt.Println(results)
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    results := make([]int, 5)

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            results[n] = n * n
        }(i)
    }

    wg.Wait()
    fmt.Println(results)
}`,
			hints: [
				'The goroutine captures the loop variable i by reference.',
				'By the time goroutines run, i may have changed.',
				'Pass i as a parameter to the goroutine function.'
			],
			concepts: ['closure-capture', 'loop-variable', 'goroutine-safety']
		},
		{
			id: 'go-wpool-15',
			title: 'Results Channel Not Closed',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the deadlock from ranging over an unclosed channel.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    results := make(chan int)

    for w := 0; w < 3; w++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            results <- 42
        }()
    }

    for r := range results {
        fmt.Println(r)
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
    results := make(chan int)

    for w := 0; w < 3; w++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            results <- 42
        }()
    }

    go func() {
        wg.Wait()
        close(results)
    }()

    for r := range results {
        fmt.Println(r)
    }
}`,
			hints: [
				'range over a channel blocks until the channel is closed.',
				'Close the results channel after all workers finish.',
				'Use a goroutine to wait on wg and close results.'
			],
			concepts: ['channel-close', 'deadlock', 'waitgroup']
		},
		{
			id: 'go-wpool-16',
			title: 'Predict Pool Output Count',
			type: 'predict-output',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Predict the number of results from a worker pool.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    results := make(chan int)

    for w := 0; w < 4; w++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            results <- id
        }(w)
    }

    go func() {
        wg.Wait()
        close(results)
    }()

    count := 0
    for range results {
        count++
    }
    fmt.Println(count)
}`,
			solution: `4`,
			hints: [
				'4 workers are started, each sending exactly one value.',
				'The channel is closed after all 4 workers finish.',
				'count increments once per received value.'
			],
			concepts: ['worker-pool', 'channel-counting', 'waitgroup']
		},
		{
			id: 'go-wpool-17',
			title: 'Predict Semaphore Behavior',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict the maximum concurrent goroutines with a semaphore.',
			skeleton: `package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

func main() {
    sem := make(chan struct{}, 2)
    var maxConcurrent int64
    var current int64
    var wg sync.WaitGroup

    for i := 0; i < 10; i++ {
        wg.Add(1)
        sem <- struct{}{}
        go func() {
            defer wg.Done()
            defer func() { <-sem }()
            c := atomic.AddInt64(&current, 1)
            for {
                old := atomic.LoadInt64(&maxConcurrent)
                if c <= old || atomic.CompareAndSwapInt64(&maxConcurrent, old, c) {
                    break
                }
            }
            atomic.AddInt64(&current, -1)
        }()
    }

    wg.Wait()
    fmt.Println(atomic.LoadInt64(&maxConcurrent) <= 2)
}`,
			solution: `true`,
			hints: [
				'The semaphore channel has capacity 2.',
				'At most 2 goroutines can hold the semaphore at once.',
				'maxConcurrent tracks the peak, which cannot exceed 2.'
			],
			concepts: ['semaphore', 'atomic', 'bounded-concurrency']
		},
		{
			id: 'go-wpool-18',
			title: 'Predict Errgroup Error',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict which error errgroup returns.',
			skeleton: `package main

import (
    "errors"
    "fmt"
    "golang.org/x/sync/errgroup"
)

func main() {
    var g errgroup.Group

    g.Go(func() error {
        return nil
    })
    g.Go(func() error {
        return errors.New("task 2 failed")
    })
    g.Go(func() error {
        return nil
    })

    err := g.Wait()
    fmt.Println(err != nil)
}`,
			solution: `true`,
			hints: [
				'errgroup.Wait returns the first non-nil error.',
				'Task 2 returns an error, so Wait returns non-nil.',
				'The output checks err != nil which is true.'
			],
			concepts: ['errgroup', 'error-propagation', 'concurrency']
		},
		{
			id: 'go-wpool-19',
			title: 'Refactor Sequential to Pool',
			type: 'refactor',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Refactor sequential processing to use a worker pool.',
			skeleton: `package main

import "fmt"

func process(n int) int {
    return n * n
}

func main() {
    items := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    results := make([]int, len(items))

    for i, item := range items {
        results[i] = process(item)
    }

    fmt.Println(results)
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

func process(n int) int {
    return n * n
}

func main() {
    items := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    results := make([]int, len(items))

    var wg sync.WaitGroup
    sem := make(chan struct{}, 4)

    for i, item := range items {
        wg.Add(1)
        sem <- struct{}{}
        go func(idx, val int) {
            defer wg.Done()
            defer func() { <-sem }()
            results[idx] = process(val)
        }(i, item)
    }

    wg.Wait()
    fmt.Println(results)
}`,
			hints: [
				'Use a semaphore to limit concurrency.',
				'Write results by index to avoid data races.',
				'WaitGroup ensures all goroutines complete before printing.'
			],
			concepts: ['refactoring', 'concurrency', 'semaphore']
		},
		{
			id: 'go-wpool-20',
			title: 'Refactor to Errgroup',
			type: 'refactor',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Refactor a manual worker pool to use errgroup.',
			skeleton: `package main

import (
    "errors"
    "fmt"
    "sync"
)

func processItem(n int) (int, error) {
    if n < 0 {
        return 0, errors.New("negative")
    }
    return n * 2, nil
}

func main() {
    items := []int{1, 2, -3, 4, 5}
    results := make([]int, len(items))
    var mu sync.Mutex
    var firstErr error
    var wg sync.WaitGroup

    for i, item := range items {
        wg.Add(1)
        go func(idx, val int) {
            defer wg.Done()
            r, err := processItem(val)
            mu.Lock()
            if err != nil && firstErr == nil {
                firstErr = err
            }
            results[idx] = r
            mu.Unlock()
        }(i, item)
    }

    wg.Wait()
    if firstErr != nil {
        fmt.Println("error:", firstErr)
    }
    fmt.Println(results)
}`,
			solution: `package main

import (
    "context"
    "errors"
    "fmt"
    "golang.org/x/sync/errgroup"
)

func processItem(n int) (int, error) {
    if n < 0 {
        return 0, errors.New("negative")
    }
    return n * 2, nil
}

func main() {
    items := []int{1, 2, -3, 4, 5}
    results := make([]int, len(items))

    g, _ := errgroup.WithContext(context.Background())
    g.SetLimit(3)

    for i, item := range items {
        i, item := i, item
        g.Go(func() error {
            r, err := processItem(item)
            if err != nil {
                return err
            }
            results[i] = r
            return nil
        })
    }

    if err := g.Wait(); err != nil {
        fmt.Println("error:", err)
    }
    fmt.Println(results)
}`,
			hints: [
				'errgroup handles WaitGroup, error collection, and context.',
				'g.Go takes a func() error and collects the first error.',
				'SetLimit controls concurrency without a manual semaphore.'
			],
			concepts: ['errgroup', 'refactoring', 'error-handling']
		}
	]
};
