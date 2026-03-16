import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
	id: 'go-fanio',
	title: '44. Fan-Out Fan-In',
	explanation: `## Fan-Out Fan-In Pattern

**Fan-out**: Multiple goroutines read from the same channel, distributing work.
**Fan-in**: A single goroutine reads from multiple channels, merging results.

### Fan-Out

\`\`\`go
// Multiple workers read from the same jobs channel
func fanOut(jobs <-chan int, numWorkers int) []<-chan int {
    workers := make([]<-chan int, numWorkers)
    for i := 0; i < numWorkers; i++ {
        workers[i] = worker(jobs)
    }
    return workers
}
\`\`\`

### Fan-In (Merge)

\`\`\`go
func merge(channels ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    merged := make(chan int)

    output := func(ch <-chan int) {
        defer wg.Done()
        for v := range ch {
            merged <- v
        }
    }

    wg.Add(len(channels))
    for _, ch := range channels {
        go output(ch)
    }

    go func() {
        wg.Wait()
        close(merged)
    }()

    return merged
}
\`\`\`

### Ordered Fan-In

\`\`\`go
type IndexedResult struct {
    Index int
    Value int
}

// Preserve original order by tracking indices
func orderedFanIn(results <-chan IndexedResult, total int) []int {
    ordered := make([]int, total)
    for r := range results {
        ordered[r.Index] = r.Value
    }
    return ordered
}
\`\`\`

### Scatter-Gather

\`\`\`go
func scatterGather(data []int, numWorkers int) []int {
    jobs := make(chan IndexedJob)
    results := make(chan IndexedResult)

    // Scatter: fan-out to workers
    for i := 0; i < numWorkers; i++ {
        go worker(jobs, results)
    }

    // Send jobs
    go func() { defer close(jobs); for i, d := range data { jobs <- IndexedJob{i, d} } }()

    // Gather: collect all results
    output := make([]int, len(data))
    for i := 0; i < len(data); i++ {
        r := <-results
        output[r.Index] = r.Value
    }
    return output
}
\`\`\``,
	exercises: [
		{
			id: 'go-fanio-1',
			title: 'Basic Merge Function',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Complete the WaitGroup usage in a merge function.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

func merge(channels ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    merged := make(chan int)

    for _, ch := range channels {
        __BLANK__
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c {
                merged <- v
            }
        }(ch)
    }

    go func() {
        wg.Wait()
        close(merged)
    }()

    return merged
}

func main() {
    ch1 := make(chan int, 2)
    ch2 := make(chan int, 2)
    ch1 <- 1; ch1 <- 2; close(ch1)
    ch2 <- 3; ch2 <- 4; close(ch2)

    for v := range merge(ch1, ch2) {
        fmt.Println(v)
    }
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

func merge(channels ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    merged := make(chan int)

    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c {
                merged <- v
            }
        }(ch)
    }

    go func() {
        wg.Wait()
        close(merged)
    }()

    return merged
}

func main() {
    ch1 := make(chan int, 2)
    ch2 := make(chan int, 2)
    ch1 <- 1; ch1 <- 2; close(ch1)
    ch2 <- 3; ch2 <- 4; close(ch2)

    for v := range merge(ch1, ch2) {
        fmt.Println(v)
    }
}`,
			hints: [
				'Add to the WaitGroup before each goroutine.',
				'wg.Add(1) increments the counter.',
				'Replace __BLANK__ with wg.Add(1)'
			],
			concepts: ['fan-in', 'merge', 'waitgroup']
		},
		{
			id: 'go-fanio-2',
			title: 'Fan-Out Worker Launch',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Launch multiple workers reading from the same channel.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

func worker(id int, jobs <-chan int, results chan<- string) {
    for j := range jobs {
        results <- fmt.Sprintf("worker %d processed %d", id, j)
    }
}

func main() {
    jobs := make(chan int, 10)
    results := make(chan string, 10)
    var wg sync.WaitGroup

    for w := 1; w <= 3; w++ {
        wg.Add(1)
        go func(id int) {
            __BLANK__
            worker(id, jobs, results)
        }(w)
    }

    for j := 1; j <= 9; j++ {
        jobs <- j
    }
    close(jobs)

    go func() { wg.Wait(); close(results) }()

    for r := range results {
        fmt.Println(r)
    }
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

func worker(id int, jobs <-chan int, results chan<- string) {
    for j := range jobs {
        results <- fmt.Sprintf("worker %d processed %d", id, j)
    }
}

func main() {
    jobs := make(chan int, 10)
    results := make(chan string, 10)
    var wg sync.WaitGroup

    for w := 1; w <= 3; w++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            worker(id, jobs, results)
        }(w)
    }

    for j := 1; j <= 9; j++ {
        jobs <- j
    }
    close(jobs)

    go func() { wg.Wait(); close(results) }()

    for r := range results {
        fmt.Println(r)
    }
}`,
			hints: [
				'Each worker goroutine needs to signal completion.',
				'Use defer wg.Done() at the start of the goroutine.',
				'Replace __BLANK__ with defer wg.Done()'
			],
			concepts: ['fan-out', 'waitgroup', 'defer']
		},
		{
			id: 'go-fanio-3',
			title: 'Variadic Channel Merge',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Accept variadic channels in a merge function.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

func merge(channels __BLANK__) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)

    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c {
                out <- v
            }
        }(ch)
    }

    go func() { wg.Wait(); close(out) }()
    return out
}

func main() {
    a := make(chan int, 1)
    b := make(chan int, 1)
    a <- 10; close(a)
    b <- 20; close(b)

    for v := range merge(a, b) {
        fmt.Println(v)
    }
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

func merge(channels ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)

    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c {
                out <- v
            }
        }(ch)
    }

    go func() { wg.Wait(); close(out) }()
    return out
}

func main() {
    a := make(chan int, 1)
    b := make(chan int, 1)
    a <- 10; close(a)
    b <- 20; close(b)

    for v := range merge(a, b) {
        fmt.Println(v)
    }
}`,
			hints: [
				'Variadic parameters use ... before the type.',
				'For receive-only channels: ...<-chan int',
				'Replace __BLANK__ with ...<-chan int'
			],
			concepts: ['variadic', 'fan-in', 'receive-only-channel']
		},
		{
			id: 'go-fanio-4',
			title: 'Fan-Out with Done Channel',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Add cancellation to fan-out workers.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

func worker(done <-chan struct{}, jobs <-chan int, results chan<- int) {
    for {
        select {
        case __BLANK__:
            return
        case j, ok := <-jobs:
            if !ok {
                return
            }
            results <- j * j
        }
    }
}

func main() {
    done := make(chan struct{})
    jobs := make(chan int, 5)
    results := make(chan int, 5)

    var wg sync.WaitGroup
    for w := 0; w < 3; w++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            worker(done, jobs, results)
        }()
    }

    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)

    go func() { wg.Wait(); close(results) }()

    for r := range results {
        fmt.Println(r)
    }
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

func worker(done <-chan struct{}, jobs <-chan int, results chan<- int) {
    for {
        select {
        case <-done:
            return
        case j, ok := <-jobs:
            if !ok {
                return
            }
            results <- j * j
        }
    }
}

func main() {
    done := make(chan struct{})
    jobs := make(chan int, 5)
    results := make(chan int, 5)

    var wg sync.WaitGroup
    for w := 0; w < 3; w++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            worker(done, jobs, results)
        }()
    }

    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)

    go func() { wg.Wait(); close(results) }()

    for r := range results {
        fmt.Println(r)
    }
}`,
			hints: [
				'Check the done channel for cancellation.',
				'Receive from done in a select case.',
				'Replace __BLANK__ with <-done'
			],
			concepts: ['done-channel', 'fan-out', 'select']
		},
		{
			id: 'go-fanio-5',
			title: 'Indexed Result for Ordering',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Use indexed results to preserve ordering in fan-out.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

type IndexedResult struct {
    Index int
    Value int
}

func main() {
    data := []int{10, 20, 30, 40, 50}
    results := make(chan IndexedResult, len(data))

    var wg sync.WaitGroup
    for i, d := range data {
        wg.Add(1)
        go func(idx, val int) {
            defer wg.Done()
            results <- IndexedResult{__BLANK__}
        }(i, d)
    }

    wg.Wait()
    close(results)

    ordered := make([]int, len(data))
    for r := range results {
        ordered[r.Index] = r.Value
    }
    fmt.Println(ordered)
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

type IndexedResult struct {
    Index int
    Value int
}

func main() {
    data := []int{10, 20, 30, 40, 50}
    results := make(chan IndexedResult, len(data))

    var wg sync.WaitGroup
    for i, d := range data {
        wg.Add(1)
        go func(idx, val int) {
            defer wg.Done()
            results <- IndexedResult{Index: idx, Value: val * val}
        }(i, d)
    }

    wg.Wait()
    close(results)

    ordered := make([]int, len(data))
    for r := range results {
        ordered[r.Index] = r.Value
    }
    fmt.Println(ordered)
}`,
			hints: [
				'Include the index and computed value in the result.',
				'The struct has Index and Value fields.',
				'Replace __BLANK__ with Index: idx, Value: val * val'
			],
			concepts: ['ordered-fan-in', 'indexed-result', 'struct-literal']
		},
		{
			id: 'go-fanio-6',
			title: 'Select-Based Merge',
			type: 'fill-blank',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Merge two channels using select instead of goroutines.',
			skeleton: `package main

import "fmt"

func merge2(a, b <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for a != nil || b != nil {
            select {
            case v, ok := <-a:
                if !ok {
                    __BLANK__
                    continue
                }
                out <- v
            case v, ok := <-b:
                if !ok {
                    b = nil
                    continue
                }
                out <- v
            }
        }
    }()
    return out
}

func main() {
    ch1 := make(chan int, 2)
    ch2 := make(chan int, 2)
    ch1 <- 1; ch1 <- 2; close(ch1)
    ch2 <- 3; ch2 <- 4; close(ch2)

    for v := range merge2(ch1, ch2) {
        fmt.Println(v)
    }
}`,
			solution: `package main

import "fmt"

func merge2(a, b <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for a != nil || b != nil {
            select {
            case v, ok := <-a:
                if !ok {
                    a = nil
                    continue
                }
                out <- v
            case v, ok := <-b:
                if !ok {
                    b = nil
                    continue
                }
                out <- v
            }
        }
    }()
    return out
}

func main() {
    ch1 := make(chan int, 2)
    ch2 := make(chan int, 2)
    ch1 <- 1; ch1 <- 2; close(ch1)
    ch2 <- 3; ch2 <- 4; close(ch2)

    for v := range merge2(ch1, ch2) {
        fmt.Println(v)
    }
}`,
			hints: [
				'Setting a channel to nil disables its select case.',
				'When both channels are nil, the loop exits.',
				'Replace __BLANK__ with a = nil'
			],
			concepts: ['select-merge', 'nil-channel', 'fan-in']
		},
		{
			id: 'go-fanio-7',
			title: 'Fan-In Merge',
			type: 'write-function',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Write a merge function that combines multiple channels into one.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

// merge combines all input channels into a single output channel.
func merge(channels ...<-chan int) <-chan int {
    // TODO: implement
}

func main() {
    ch1 := make(chan int, 2)
    ch2 := make(chan int, 2)
    ch3 := make(chan int, 2)
    ch1 <- 1; ch1 <- 2; close(ch1)
    ch2 <- 3; ch2 <- 4; close(ch2)
    ch3 <- 5; ch3 <- 6; close(ch3)

    for v := range merge(ch1, ch2, ch3) {
        fmt.Println(v)
    }
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

// merge combines all input channels into a single output channel.
func merge(channels ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)

    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c {
                out <- v
            }
        }(ch)
    }

    go func() {
        wg.Wait()
        close(out)
    }()

    return out
}

func main() {
    ch1 := make(chan int, 2)
    ch2 := make(chan int, 2)
    ch3 := make(chan int, 2)
    ch1 <- 1; ch1 <- 2; close(ch1)
    ch2 <- 3; ch2 <- 4; close(ch2)
    ch3 <- 5; ch3 <- 6; close(ch3)

    for v := range merge(ch1, ch2, ch3) {
        fmt.Println(v)
    }
}`,
			hints: [
				'Launch a goroutine per input channel to forward values.',
				'Use WaitGroup to know when all channels are drained.',
				'Close the output channel after all goroutines finish.'
			],
			concepts: ['fan-in', 'merge', 'waitgroup']
		},
		{
			id: 'go-fanio-8',
			title: 'Fan-Out to Workers',
			type: 'write-function',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Write a fanOut function that distributes work to N workers.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

// fanOut starts numWorkers goroutines that read from jobs,
// triple each value, and send to a shared results channel.
// Returns the results channel.
func fanOut(numWorkers int, jobs <-chan int) <-chan int {
    // TODO: implement
}

func main() {
    jobs := make(chan int, 6)
    for i := 1; i <= 6; i++ {
        jobs <- i
    }
    close(jobs)

    for r := range fanOut(3, jobs) {
        fmt.Println(r)
    }
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

// fanOut starts numWorkers goroutines that read from jobs,
// triple each value, and send to a shared results channel.
// Returns the results channel.
func fanOut(numWorkers int, jobs <-chan int) <-chan int {
    results := make(chan int)
    var wg sync.WaitGroup

    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for j := range jobs {
                results <- j * 3
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

    for r := range fanOut(3, jobs) {
        fmt.Println(r)
    }
}`,
			hints: [
				'Multiple goroutines read from the same jobs channel.',
				'Go runtime distributes jobs fairly among readers.',
				'Use WaitGroup to close results when all workers finish.'
			],
			concepts: ['fan-out', 'competing-consumers', 'waitgroup']
		},
		{
			id: 'go-fanio-9',
			title: 'Scatter-Gather Pattern',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Implement scatter-gather to process data and preserve order.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

type IndexedResult struct {
    Index int
    Value int
}

// scatterGather distributes items to numWorkers, squares each value,
// and returns results in the original order.
func scatterGather(items []int, numWorkers int) []int {
    // TODO: implement
}

func main() {
    items := []int{5, 3, 8, 1, 9, 2}
    results := scatterGather(items, 3)
    fmt.Println(results)
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

type IndexedResult struct {
    Index int
    Value int
}

// scatterGather distributes items to numWorkers, squares each value,
// and returns results in the original order.
func scatterGather(items []int, numWorkers int) []int {
    type IndexedJob struct {
        Index int
        Value int
    }

    jobs := make(chan IndexedJob, len(items))
    results := make(chan IndexedResult, len(items))

    var wg sync.WaitGroup
    for w := 0; w < numWorkers; w++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for j := range jobs {
                results <- IndexedResult{Index: j.Index, Value: j.Value * j.Value}
            }
        }()
    }

    for i, item := range items {
        jobs <- IndexedJob{Index: i, Value: item}
    }
    close(jobs)

    go func() {
        wg.Wait()
        close(results)
    }()

    ordered := make([]int, len(items))
    for r := range results {
        ordered[r.Index] = r.Value
    }
    return ordered
}

func main() {
    items := []int{5, 3, 8, 1, 9, 2}
    results := scatterGather(items, 3)
    fmt.Println(results)
}`,
			hints: [
				'Track the original index with each job.',
				'Workers return IndexedResult with the index preserved.',
				'Reconstruct order by placing results at their original index.'
			],
			concepts: ['scatter-gather', 'ordered-results', 'fan-out-fan-in']
		},
		{
			id: 'go-fanio-10',
			title: 'Fan-In with Error Channel',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Write a fan-in that merges result channels and an error channel.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

type Result struct {
    Value int
    Err   error
}

// mergeResults merges multiple Result channels into one.
func mergeResults(channels ...<-chan Result) <-chan Result {
    // TODO: implement
}

func main() {
    ch1 := make(chan Result, 2)
    ch2 := make(chan Result, 2)
    ch1 <- Result{Value: 10}
    ch1 <- Result{Err: fmt.Errorf("oops")}
    close(ch1)
    ch2 <- Result{Value: 20}
    ch2 <- Result{Value: 30}
    close(ch2)

    for r := range mergeResults(ch1, ch2) {
        if r.Err != nil {
            fmt.Println("error:", r.Err)
        } else {
            fmt.Println("value:", r.Value)
        }
    }
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

type Result struct {
    Value int
    Err   error
}

// mergeResults merges multiple Result channels into one.
func mergeResults(channels ...<-chan Result) <-chan Result {
    var wg sync.WaitGroup
    out := make(chan Result)

    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan Result) {
            defer wg.Done()
            for r := range c {
                out <- r
            }
        }(ch)
    }

    go func() {
        wg.Wait()
        close(out)
    }()

    return out
}

func main() {
    ch1 := make(chan Result, 2)
    ch2 := make(chan Result, 2)
    ch1 <- Result{Value: 10}
    ch1 <- Result{Err: fmt.Errorf("oops")}
    close(ch1)
    ch2 <- Result{Value: 20}
    ch2 <- Result{Value: 30}
    close(ch2)

    for r := range mergeResults(ch1, ch2) {
        if r.Err != nil {
            fmt.Println("error:", r.Err)
        } else {
            fmt.Println("value:", r.Value)
        }
    }
}`,
			hints: [
				'Same merge pattern but with Result type.',
				'Errors are carried inline in the Result struct.',
				'Consumer checks Err field on each result.'
			],
			concepts: ['fan-in', 'error-handling', 'result-type']
		},
		{
			id: 'go-fanio-11',
			title: 'Map-Reduce with Fan-Out',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Implement map-reduce using fan-out (map) and fan-in (reduce).',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

// mapReduce applies mapFn to each item using numWorkers goroutines,
// then reduces all results using reduceFn with initial value.
func mapReduce(items []int, numWorkers int, mapFn func(int) int, reduceFn func(int, int) int, initial int) int {
    // TODO: implement
}

func main() {
    items := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    // Sum of squares: 1+4+9+16+25+36+49+64+81+100 = 385
    result := mapReduce(items, 4,
        func(n int) int { return n * n },
        func(acc, val int) int { return acc + val },
        0,
    )
    fmt.Println(result)
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

// mapReduce applies mapFn to each item using numWorkers goroutines,
// then reduces all results using reduceFn with initial value.
func mapReduce(items []int, numWorkers int, mapFn func(int) int, reduceFn func(int, int) int, initial int) int {
    jobs := make(chan int, len(items))
    results := make(chan int, len(items))

    var wg sync.WaitGroup
    for w := 0; w < numWorkers; w++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for item := range jobs {
                results <- mapFn(item)
            }
        }()
    }

    for _, item := range items {
        jobs <- item
    }
    close(jobs)

    go func() {
        wg.Wait()
        close(results)
    }()

    acc := initial
    for r := range results {
        acc = reduceFn(acc, r)
    }
    return acc
}

func main() {
    items := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    // Sum of squares: 1+4+9+16+25+36+49+64+81+100 = 385
    result := mapReduce(items, 4,
        func(n int) int { return n * n },
        func(acc, val int) int { return acc + val },
        0,
    )
    fmt.Println(result)
}`,
			hints: [
				'Fan-out: workers apply mapFn to each job.',
				'Fan-in: collect all mapped results.',
				'Reduce: fold results using reduceFn with initial value.'
			],
			concepts: ['map-reduce', 'fan-out-fan-in', 'higher-order-functions']
		},
		{
			id: 'go-fanio-12',
			title: 'First-Response Wins',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Fan-out to multiple services and return the first response.',
			skeleton: `package main

import (
    "context"
    "fmt"
    "math/rand"
    "time"
)

// queryFirst sends the query to all replicas concurrently
// and returns the first response. Cancels the rest.
func queryFirst(ctx context.Context, query string, replicas ...func(context.Context, string) int) int {
    // TODO: implement
}

func main() {
    replica := func(ctx context.Context, q string) int {
        d := time.Duration(rand.Intn(100)) * time.Millisecond
        select {
        case <-time.After(d):
            return len(q) + rand.Intn(10)
        case <-ctx.Done():
            return -1
        }
    }

    result := queryFirst(context.Background(), "hello",
        replica, replica, replica,
    )
    fmt.Println("first result:", result)
}`,
			solution: `package main

import (
    "context"
    "fmt"
    "math/rand"
    "time"
)

// queryFirst sends the query to all replicas concurrently
// and returns the first response. Cancels the rest.
func queryFirst(ctx context.Context, query string, replicas ...func(context.Context, string) int) int {
    ctx, cancel := context.WithCancel(ctx)
    defer cancel()

    ch := make(chan int, len(replicas))
    for _, replica := range replicas {
        go func(r func(context.Context, string) int) {
            ch <- r(ctx, query)
        }(replica)
    }

    return <-ch
}

func main() {
    replica := func(ctx context.Context, q string) int {
        d := time.Duration(rand.Intn(100)) * time.Millisecond
        select {
        case <-time.After(d):
            return len(q) + rand.Intn(10)
        case <-ctx.Done():
            return -1
        }
    }

    result := queryFirst(context.Background(), "hello",
        replica, replica, replica,
    )
    fmt.Println("first result:", result)
}`,
			hints: [
				'Launch all replicas as goroutines sending to a buffered channel.',
				'Read only the first result from the channel.',
				'Cancel the context to stop remaining replicas.'
			],
			concepts: ['first-response', 'fan-out', 'context-cancellation']
		},
		{
			id: 'go-fanio-13',
			title: 'Merge Sends to Wrong Channel',
			type: 'fix-bug',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Fix the merge function that sends to input instead of output.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

func merge(a, b <-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup

    forward := func(ch <-chan int) {
        defer wg.Done()
        for v := range ch {
            ch <- v // BUG
        }
    }

    wg.Add(2)
    go forward(a)
    go forward(b)

    go func() { wg.Wait(); close(out) }()
    return out
}

func main() {
    a := make(chan int, 1)
    b := make(chan int, 1)
    a <- 1; close(a)
    b <- 2; close(b)

    for v := range merge(a, b) {
        fmt.Println(v)
    }
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

func merge(a, b <-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup

    forward := func(ch <-chan int) {
        defer wg.Done()
        for v := range ch {
            out <- v
        }
    }

    wg.Add(2)
    go forward(a)
    go forward(b)

    go func() { wg.Wait(); close(out) }()
    return out
}

func main() {
    a := make(chan int, 1)
    b := make(chan int, 1)
    a <- 1; close(a)
    b <- 2; close(b)

    for v := range merge(a, b) {
        fmt.Println(v)
    }
}`,
			hints: [
				'The forward function sends to ch (input) instead of out.',
				'Values should be forwarded to the output channel.',
				'Change ch <- v to out <- v. Note: ch is receive-only, so this was also a compile error.'
			],
			concepts: ['channel-direction', 'bug-fix', 'fan-in']
		},
		{
			id: 'go-fanio-14',
			title: 'Missing Close in Fan-In',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the fan-in that never closes its output channel.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

func merge(channels ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)

    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c {
                out <- v
            }
        }(ch)
    }

    wg.Wait()
    close(out)

    return out
}

func main() {
    a := make(chan int, 2)
    b := make(chan int, 2)
    a <- 1; a <- 2; close(a)
    b <- 3; b <- 4; close(b)

    for v := range merge(a, b) {
        fmt.Println(v)
    }
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

func merge(channels ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)

    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c {
                out <- v
            }
        }(ch)
    }

    go func() {
        wg.Wait()
        close(out)
    }()

    return out
}

func main() {
    a := make(chan int, 2)
    b := make(chan int, 2)
    a <- 1; a <- 2; close(a)
    b <- 3; b <- 4; close(b)

    for v := range merge(a, b) {
        fmt.Println(v)
    }
}`,
			hints: [
				'wg.Wait() and close(out) block the merge function.',
				'The channel is returned before it is closed - deadlock.',
				'Move wg.Wait() and close(out) into a separate goroutine.'
			],
			concepts: ['deadlock', 'goroutine', 'fan-in']
		},
		{
			id: 'go-fanio-15',
			title: 'Race in Ordered Results',
			type: 'fix-bug',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Fix the data race when collecting ordered results into a shared slice.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    data := []int{1, 2, 3, 4, 5}
    results := make([]int, len(data))
    var wg sync.WaitGroup

    for i, d := range data {
        wg.Add(1)
        go func() {
            defer wg.Done()
            results[i] = d * d
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
    data := []int{1, 2, 3, 4, 5}
    results := make([]int, len(data))
    var wg sync.WaitGroup

    for i, d := range data {
        wg.Add(1)
        go func(idx, val int) {
            defer wg.Done()
            results[idx] = val * val
        }(i, d)
    }

    wg.Wait()
    fmt.Println(results)
}`,
			hints: [
				'Loop variables i and d are captured by reference.',
				'By the time goroutines run, i and d may have changed.',
				'Pass i and d as parameters to the goroutine.'
			],
			concepts: ['data-race', 'closure-capture', 'goroutine-safety']
		},
		{
			id: 'go-fanio-16',
			title: 'Predict Merge Count',
			type: 'predict-output',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Predict how many values come out of a merge.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

func merge(channels ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)
    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c { out <- v }
        }(ch)
    }
    go func() { wg.Wait(); close(out) }()
    return out
}

func main() {
    a := make(chan int, 3)
    b := make(chan int, 2)
    a <- 1; a <- 2; a <- 3; close(a)
    b <- 4; b <- 5; close(b)

    count := 0
    for range merge(a, b) {
        count++
    }
    fmt.Println(count)
}`,
			solution: `5`,
			hints: [
				'Channel a has 3 values, channel b has 2 values.',
				'Merge combines all values from all channels.',
				'Total: 3 + 2 = 5'
			],
			concepts: ['fan-in', 'merge', 'counting']
		},
		{
			id: 'go-fanio-17',
			title: 'Predict Fan-Out Distribution',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict the total of fan-out processed values.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    jobs := make(chan int, 6)
    for i := 1; i <= 6; i++ {
        jobs <- i
    }
    close(jobs)

    sum := 0
    var mu sync.Mutex
    var wg sync.WaitGroup

    for w := 0; w < 3; w++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for j := range jobs {
                mu.Lock()
                sum += j
                mu.Unlock()
            }
        }()
    }

    wg.Wait()
    fmt.Println(sum)
}`,
			solution: `21`,
			hints: [
				'Each job value is processed exactly once.',
				'Workers compete for jobs but every value is consumed.',
				'Sum: 1+2+3+4+5+6 = 21'
			],
			concepts: ['fan-out', 'mutex', 'sum']
		},
		{
			id: 'go-fanio-18',
			title: 'Predict Ordered Results',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict the output of ordered fan-out results.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

type IR struct {
    Idx int
    Val int
}

func main() {
    data := []int{3, 1, 4}
    results := make(chan IR, 3)
    var wg sync.WaitGroup

    for i, d := range data {
        wg.Add(1)
        go func(idx, val int) {
            defer wg.Done()
            results <- IR{idx, val * 2}
        }(i, d)
    }

    wg.Wait()
    close(results)

    ordered := make([]int, 3)
    for r := range results {
        ordered[r.Idx] = r.Val
    }
    fmt.Println(ordered)
}`,
			solution: `[6 2 8]`,
			hints: [
				'data[0]=3 -> 6, data[1]=1 -> 2, data[2]=4 -> 8',
				'Results are placed at their original index.',
				'Output: [6 2 8]'
			],
			concepts: ['ordered-fan-in', 'indexed-result', 'slice']
		},
		{
			id: 'go-fanio-19',
			title: 'Refactor Sequential to Fan-Out',
			type: 'refactor',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Refactor sequential processing to concurrent fan-out fan-in.',
			skeleton: `package main

import "fmt"

func heavy(n int) int {
    // simulate expensive computation
    return n * n * n
}

func main() {
    data := []int{2, 3, 4, 5, 6, 7, 8, 9}
    results := make([]int, len(data))

    for i, d := range data {
        results[i] = heavy(d)
    }

    sum := 0
    for _, r := range results {
        sum += r
    }
    fmt.Println(sum)
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

func heavy(n int) int {
    return n * n * n
}

func main() {
    data := []int{2, 3, 4, 5, 6, 7, 8, 9}
    results := make([]int, len(data))

    var wg sync.WaitGroup
    for i, d := range data {
        wg.Add(1)
        go func(idx, val int) {
            defer wg.Done()
            results[idx] = heavy(val)
        }(i, d)
    }
    wg.Wait()

    sum := 0
    for _, r := range results {
        sum += r
    }
    fmt.Println(sum)
}`,
			hints: [
				'Launch a goroutine for each data item.',
				'Write to the results slice by index to avoid races.',
				'Wait for all goroutines before summing.'
			],
			concepts: ['refactoring', 'fan-out', 'concurrency']
		},
		{
			id: 'go-fanio-20',
			title: 'Refactor to Generic Fan-In',
			type: 'refactor',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Refactor multiple ad-hoc channel reads into a reusable merge function.',
			skeleton: `package main

import "fmt"

func main() {
    ch1 := make(chan int, 2)
    ch2 := make(chan int, 2)
    ch3 := make(chan int, 2)
    ch1 <- 1; ch1 <- 2; close(ch1)
    ch2 <- 3; ch2 <- 4; close(ch2)
    ch3 <- 5; ch3 <- 6; close(ch3)

    var all []int

    for v := range ch1 {
        all = append(all, v)
    }
    for v := range ch2 {
        all = append(all, v)
    }
    for v := range ch3 {
        all = append(all, v)
    }

    sum := 0
    for _, v := range all {
        sum += v
    }
    fmt.Println(sum)
}`,
			solution: `package main

import (
    "fmt"
    "sync"
)

func merge(channels ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)
    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c {
                out <- v
            }
        }(ch)
    }
    go func() {
        wg.Wait()
        close(out)
    }()
    return out
}

func main() {
    ch1 := make(chan int, 2)
    ch2 := make(chan int, 2)
    ch3 := make(chan int, 2)
    ch1 <- 1; ch1 <- 2; close(ch1)
    ch2 <- 3; ch2 <- 4; close(ch2)
    ch3 <- 5; ch3 <- 6; close(ch3)

    sum := 0
    for v := range merge(ch1, ch2, ch3) {
        sum += v
    }
    fmt.Println(sum)
}`,
			hints: [
				'Extract a reusable merge function that takes variadic channels.',
				'The merge function handles concurrency internally.',
				'The consumer just ranges over the merged output.'
			],
			concepts: ['refactoring', 'reusable-merge', 'fan-in']
		}
	]
};
