import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-wg',
  title: '18. WaitGroups & Errgroup',
  explanation: `## WaitGroups & Errgroup in Go

\`sync.WaitGroup\` waits for a collection of goroutines to finish. \`errgroup.Group\` extends this with error propagation and context cancellation.

\`\`\`go
// WaitGroup basics
var wg sync.WaitGroup
wg.Add(1)
go func() {
    defer wg.Done()
    // work
}()
wg.Wait()

// errgroup -- propagates first error
g, ctx := errgroup.WithContext(context.Background())
g.Go(func() error {
    return doWork(ctx)
})
if err := g.Wait(); err != nil {
    log.Fatal(err)
}

// errgroup with concurrency limit
g.SetLimit(5)

// Common pitfalls:
// - Add must be called before go, not inside the goroutine
// - WaitGroup must not be copied (pass by pointer)
// - Done must match Add count exactly
\`\`\``,
  exercises: [
    {
      id: 'go-wg-1',
      title: 'WaitGroup Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use WaitGroup to wait for multiple goroutines.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.__BLANK__

    for i := 0; i < 3; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.__BLANK__()
            fmt.Println("worker", n)
        }(i)
    }

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

    for i := 0; i < 3; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            fmt.Println("worker", n)
        }(i)
    }

    wg.Wait()
    fmt.Println("all done")
}`,
      hints: [
        'WaitGroup has Add, Done, and Wait methods.',
        'Add increments, Done decrements the counter.',
        'Wait blocks until the counter reaches zero.',
      ],
      concepts: ['sync.WaitGroup', 'Add', 'Done', 'Wait'],
    },
    {
      id: 'go-wg-2',
      title: 'WaitGroup with Add(n)',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Add multiple counts at once with WaitGroup.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    n := 5
    wg.__BLANK__(n)

    for i := 0; i < n; i++ {
        go func(id int) {
            defer wg.Done()
            fmt.Printf("task %d\\n", id)
        }(i)
    }

    wg.Wait()
    fmt.Println("complete")
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    n := 5
    wg.Add(n)

    for i := 0; i < n; i++ {
        go func(id int) {
            defer wg.Done()
            fmt.Printf("task %d\\n", id)
        }(i)
    }

    wg.Wait()
    fmt.Println("complete")
}`,
      hints: [
        'wg.Add(n) adds n to the counter at once.',
        'This is useful when you know the count upfront.',
        'Each goroutine still calls Done once.',
      ],
      concepts: ['WaitGroup.Add', 'batch add'],
    },
    {
      id: 'go-wg-3',
      title: 'Pass WaitGroup by Pointer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Pass WaitGroup to a function by pointer.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func worker(id int, wg __BLANK__) {
    defer wg.Done()
    fmt.Printf("worker %d done\\n", id)
}

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 3; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }
    wg.Wait()
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("worker %d done\\n", id)
}

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 3; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }
    wg.Wait()
}`,
      hints: [
        'WaitGroup must be passed by pointer, not value.',
        'Copying a WaitGroup causes incorrect behavior.',
        'Use *sync.WaitGroup as the parameter type.',
      ],
      concepts: ['WaitGroup pointer', 'no copy'],
    },
    {
      id: 'go-wg-4',
      title: 'WaitGroup Closure',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use WaitGroup within a closure without passing as parameter.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    results := make([]string, 3)

    for i := 0; i < 3; i++ {
        wg.Add(1)
        go __BLANK__(idx int) {
            __BLANK__ wg.Done()
            results[idx] = fmt.Sprintf("result_%d", idx)
        }(i)
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
    results := make([]string, 3)

    for i := 0; i < 3; i++ {
        wg.Add(1)
        go func(idx int) {
            defer wg.Done()
            results[idx] = fmt.Sprintf("result_%d", idx)
        }(i)
    }

    wg.Wait()
    fmt.Println(results)
}`,
      hints: [
        'The closure captures wg from the outer scope.',
        'Pass the loop variable as a parameter to avoid capture.',
        'defer wg.Done() ensures cleanup.',
      ],
      concepts: ['closure capture', 'WaitGroup in closure'],
    },
    {
      id: 'go-wg-5',
      title: 'Errgroup Basic',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use errgroup.Group to run tasks and collect the first error.',
      skeleton: `package main

import (
    "fmt"
    "errors"

    "golang.org/x/sync/errgroup"
)

func main() {
    var g errgroup.Group

    g.__BLANK__(func() error {
        return nil // success
    })

    g.__BLANK__(func() error {
        return errors.New("task failed")
    })

    if err := g.__BLANK__(); err != nil {
        fmt.Println("error:", err)
    }
}`,
      solution: `package main

import (
    "fmt"
    "errors"

    "golang.org/x/sync/errgroup"
)

func main() {
    var g errgroup.Group

    g.Go(func() error {
        return nil
    })

    g.Go(func() error {
        return errors.New("task failed")
    })

    if err := g.Wait(); err != nil {
        fmt.Println("error:", err)
    }
}`,
      hints: [
        'errgroup.Group.Go launches a goroutine with error return.',
        'Wait blocks until all goroutines finish.',
        'Wait returns the first non-nil error.',
      ],
      concepts: ['errgroup', 'Go method', 'error propagation'],
    },
    {
      id: 'go-wg-6',
      title: 'Errgroup with Context',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use errgroup.WithContext to cancel remaining tasks on error.',
      skeleton: `package main

import (
    "context"
    "fmt"
    "errors"
    "time"

    "golang.org/x/sync/errgroup"
)

func main() {
    g, ctx := errgroup.__BLANK__(context.Background())

    g.Go(func() error {
        select {
        case <-ctx.Done():
            fmt.Println("task 1 cancelled")
            return ctx.Err()
        case <-time.After(200 * time.Millisecond):
            fmt.Println("task 1 done")
            return nil
        }
    })

    g.Go(func() error {
        return errors.New("task 2 failed")
    })

    if err := g.Wait(); err != nil {
        fmt.Println("error:", err)
    }
}`,
      solution: `package main

import (
    "context"
    "fmt"
    "errors"
    "time"

    "golang.org/x/sync/errgroup"
)

func main() {
    g, ctx := errgroup.WithContext(context.Background())

    g.Go(func() error {
        select {
        case <-ctx.Done():
            fmt.Println("task 1 cancelled")
            return ctx.Err()
        case <-time.After(200 * time.Millisecond):
            fmt.Println("task 1 done")
            return nil
        }
    })

    g.Go(func() error {
        return errors.New("task 2 failed")
    })

    if err := g.Wait(); err != nil {
        fmt.Println("error:", err)
    }
}`,
      hints: [
        'WithContext returns a group and a derived context.',
        'The context is cancelled when any Go function returns an error.',
        'Other goroutines should check ctx.Done().',
      ],
      concepts: ['errgroup.WithContext', 'context cancellation'],
    },
    {
      id: 'go-wg-7',
      title: 'Parallel Fetch',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fetch multiple URLs in parallel using WaitGroup and collect results.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func fetch(url string) string {
    return "response from " + url
}

func fetchAll(urls []string) []string {
    // Fetch all URLs in parallel, return results in order
}

func main() {
    urls := []string{"url1", "url2", "url3"}
    results := fetchAll(urls)
    for _, r := range results {
        fmt.Println(r)
    }
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func fetch(url string) string {
    return "response from " + url
}

func fetchAll(urls []string) []string {
    results := make([]string, len(urls))
    var wg sync.WaitGroup

    for i, url := range urls {
        wg.Add(1)
        go func(idx int, u string) {
            defer wg.Done()
            results[idx] = fetch(u)
        }(i, url)
    }

    wg.Wait()
    return results
}

func main() {
    urls := []string{"url1", "url2", "url3"}
    results := fetchAll(urls)
    for _, r := range results {
        fmt.Println(r)
    }
}`,
      hints: [
        'Pre-allocate the results slice for ordered results.',
        'Each goroutine writes to its own index.',
        'Wait for all fetches to complete.',
      ],
      concepts: ['parallel fetch', 'ordered results', 'WaitGroup'],
    },
    {
      id: 'go-wg-8',
      title: 'Batch Processor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Process items in batches using WaitGroup for each batch.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func processBatches(items []int, batchSize int) []int {
    // Process items in batches, each batch runs concurrently
    // Return doubled values
}

func main() {
    items := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    results := processBatches(items, 3)
    fmt.Println(results)
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func processBatches(items []int, batchSize int) []int {
    results := make([]int, len(items))

    for start := 0; start < len(items); start += batchSize {
        end := start + batchSize
        if end > len(items) {
            end = len(items)
        }

        var wg sync.WaitGroup
        for i := start; i < end; i++ {
            wg.Add(1)
            go func(idx int) {
                defer wg.Done()
                results[idx] = items[idx] * 2
            }(i)
        }
        wg.Wait()
    }

    return results
}

func main() {
    items := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    results := processBatches(items, 3)
    fmt.Println(results)
}`,
      hints: [
        'Split items into chunks of batchSize.',
        'Process each batch concurrently with a WaitGroup.',
        'Wait for each batch before starting the next.',
      ],
      concepts: ['batch processing', 'bounded concurrency'],
    },
    {
      id: 'go-wg-9',
      title: 'Errgroup Parallel Tasks',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use errgroup to run parallel tasks and return results with error handling.',
      skeleton: `package main

import (
    "fmt"
    "errors"
    "sync"

    "golang.org/x/sync/errgroup"
)

type Result struct {
    ID    int
    Value string
}

func processTask(id int) (string, error) {
    if id == 3 {
        return "", errors.New("task 3 failed")
    }
    return fmt.Sprintf("result_%d", id), nil
}

func runAll(ids []int) ([]Result, error) {
    // Run all tasks in parallel using errgroup
    // Return results or first error
}

func main() {
    results, err := runAll([]int{1, 2, 4, 5})
    if err != nil {
        fmt.Println("error:", err)
        return
    }
    for _, r := range results {
        fmt.Printf("ID=%d Value=%s\\n", r.ID, r.Value)
    }
}`,
      solution: `package main

import (
    "fmt"
    "errors"
    "sync"

    "golang.org/x/sync/errgroup"
)

type Result struct {
    ID    int
    Value string
}

func processTask(id int) (string, error) {
    if id == 3 {
        return "", errors.New("task 3 failed")
    }
    return fmt.Sprintf("result_%d", id), nil
}

func runAll(ids []int) ([]Result, error) {
    var g errgroup.Group
    var mu sync.Mutex
    results := make([]Result, 0, len(ids))

    for _, id := range ids {
        id := id
        g.Go(func() error {
            val, err := processTask(id)
            if err != nil {
                return fmt.Errorf("task %d: %w", id, err)
            }
            mu.Lock()
            results = append(results, Result{ID: id, Value: val})
            mu.Unlock()
            return nil
        })
    }

    if err := g.Wait(); err != nil {
        return nil, err
    }
    return results, nil
}

func main() {
    results, err := runAll([]int{1, 2, 4, 5})
    if err != nil {
        fmt.Println("error:", err)
        return
    }
    for _, r := range results {
        fmt.Printf("ID=%d Value=%s\\n", r.ID, r.Value)
    }
}`,
      hints: [
        'Use errgroup for error propagation.',
        'Protect shared results slice with a mutex.',
        'Shadow the loop variable (id := id) for the closure.',
      ],
      concepts: ['errgroup', 'parallel tasks', 'error handling'],
    },
    {
      id: 'go-wg-10',
      title: 'Errgroup with Limit',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use errgroup.SetLimit to control concurrency.',
      skeleton: `package main

import (
    "fmt"
    "time"

    "golang.org/x/sync/errgroup"
)

func process(id int) error {
    fmt.Printf("start %d\\n", id)
    time.Sleep(50 * time.Millisecond)
    fmt.Printf("end %d\\n", id)
    return nil
}

func main() {
    // Run 10 tasks with max 3 concurrent using errgroup
}`,
      solution: `package main

import (
    "fmt"
    "time"

    "golang.org/x/sync/errgroup"
)

func process(id int) error {
    fmt.Printf("start %d\\n", id)
    time.Sleep(50 * time.Millisecond)
    fmt.Printf("end %d\\n", id)
    return nil
}

func main() {
    var g errgroup.Group
    g.SetLimit(3)

    for i := 0; i < 10; i++ {
        i := i
        g.Go(func() error {
            return process(i)
        })
    }

    if err := g.Wait(); err != nil {
        fmt.Println("error:", err)
    }
    fmt.Println("all done")
}`,
      hints: [
        'SetLimit controls the maximum number of active goroutines.',
        'Go blocks when the limit is reached.',
        'This replaces manual semaphore patterns.',
      ],
      concepts: ['errgroup.SetLimit', 'bounded concurrency'],
    },
    {
      id: 'go-wg-11',
      title: 'Pipeline with WaitGroup',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Coordinate a multi-stage pipeline using WaitGroups.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func stage1(in []int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup
    // Launch goroutines to double each value
    // Close out after all goroutines finish
    return out
}

func main() {
    for val := range stage1([]int{1, 2, 3, 4, 5}) {
        fmt.Println(val)
    }
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func stage1(in []int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup

    for _, v := range in {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            out <- n * 2
        }(v)
    }

    go func() {
        wg.Wait()
        close(out)
    }()

    return out
}

func main() {
    for val := range stage1([]int{1, 2, 3, 4, 5}) {
        fmt.Println(val)
    }
}`,
      hints: [
        'Launch a goroutine per item to process concurrently.',
        'Use a separate goroutine to wait and close the channel.',
        'This pattern is common in pipeline stages.',
      ],
      concepts: ['pipeline', 'WaitGroup with channels'],
    },
    {
      id: 'go-wg-12',
      title: 'Collect Errors from Workers',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Collect errors from multiple goroutines using channels and WaitGroup.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func runWorkers(tasks []func() error) []error {
    // Run all tasks concurrently, collect all errors (not just first)
}

func main() {
    tasks := []func() error{
        func() error { return nil },
        func() error { return fmt.Errorf("error 1") },
        func() error { return nil },
        func() error { return fmt.Errorf("error 2") },
    }
    errs := runWorkers(tasks)
    for _, err := range errs {
        fmt.Println(err)
    }
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func runWorkers(tasks []func() error) []error {
    errCh := make(chan error, len(tasks))
    var wg sync.WaitGroup

    for _, task := range tasks {
        wg.Add(1)
        go func(fn func() error) {
            defer wg.Done()
            if err := fn(); err != nil {
                errCh <- err
            }
        }(task)
    }

    wg.Wait()
    close(errCh)

    var errs []error
    for err := range errCh {
        errs = append(errs, err)
    }
    return errs
}

func main() {
    tasks := []func() error{
        func() error { return nil },
        func() error { return fmt.Errorf("error 1") },
        func() error { return nil },
        func() error { return fmt.Errorf("error 2") },
    }
    errs := runWorkers(tasks)
    for _, err := range errs {
        fmt.Println(err)
    }
}`,
      hints: [
        'Use a buffered error channel to collect errors.',
        'Close the channel after all workers finish.',
        'Drain the channel to collect all errors.',
      ],
      concepts: ['error collection', 'buffered channel', 'WaitGroup'],
    },
    {
      id: 'go-wg-13',
      title: 'Predict WaitGroup Count',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the output of a WaitGroup counter program.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    count := 0

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            count++ // not safe but predictable in this context
        }()
    }

    wg.Wait()
    fmt.Println("at least ran")
}`,
      solution: `at least ran`,
      hints: [
        'The data race on count makes its value unpredictable.',
        'But WaitGroup ensures all goroutines complete.',
        '"at least ran" always prints after Wait returns.',
      ],
      concepts: ['WaitGroup guarantee', 'data race'],
    },
    {
      id: 'go-wg-14',
      title: 'Predict Errgroup',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the output when errgroup encounters an error.',
      skeleton: `package main

import (
    "fmt"
    "errors"

    "golang.org/x/sync/errgroup"
)

func main() {
    var g errgroup.Group

    g.Go(func() error {
        return errors.New("fail")
    })

    g.Go(func() error {
        return nil
    })

    err := g.Wait()
    fmt.Println(err != nil)
}`,
      solution: `true`,
      hints: [
        'errgroup.Wait returns the first error encountered.',
        'Even though one task succeeds, the error is returned.',
        'err != nil is true because one task failed.',
      ],
      concepts: ['errgroup error', 'first error wins'],
    },
    {
      id: 'go-wg-15',
      title: 'Predict Nested WaitGroup',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the output ordering with nested WaitGroup waits.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg1 sync.WaitGroup
    var wg2 sync.WaitGroup

    wg1.Add(1)
    go func() {
        defer wg1.Done()
        wg2.Add(1)
        go func() {
            defer wg2.Done()
            fmt.Print("inner ")
        }()
        wg2.Wait()
        fmt.Print("middle ")
    }()

    wg1.Wait()
    fmt.Print("outer")
    fmt.Println()
}`,
      solution: `inner middle outer`,
      hints: [
        'Inner goroutine completes first (wg2.Done).',
        'Then wg2.Wait returns, middle prints.',
        'Then wg1.Wait returns, outer prints.',
      ],
      concepts: ['nested WaitGroup', 'ordering guarantees'],
    },
    {
      id: 'go-wg-16',
      title: 'Fix WaitGroup Panic',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the panic caused by negative WaitGroup counter.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup

    for i := 0; i < 3; i++ {
        go func(n int) {
            defer wg.Done()
            fmt.Println("worker", n)
        }(i)
    }

    wg.Add(3) // Bug: Add after goroutines may have already called Done
    wg.Wait()
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    wg.Add(3)

    for i := 0; i < 3; i++ {
        go func(n int) {
            defer wg.Done()
            fmt.Println("worker", n)
        }(i)
    }

    wg.Wait()
}`,
      hints: [
        'wg.Add must be called before any goroutine calls Done.',
        'If Done runs first, the counter goes negative causing a panic.',
        'Move wg.Add(3) before the loop.',
      ],
      concepts: ['WaitGroup panic', 'negative counter'],
    },
    {
      id: 'go-wg-17',
      title: 'Fix WaitGroup Copy',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the WaitGroup being copied instead of shared.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func doWork(wg sync.WaitGroup, id int) { // Bug: WaitGroup copied
    defer wg.Done()
    fmt.Printf("worker %d\\n", id)
}

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 3; i++ {
        wg.Add(1)
        go doWork(wg, i)
    }
    wg.Wait()
    fmt.Println("done")
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func doWork(wg *sync.WaitGroup, id int) {
    defer wg.Done()
    fmt.Printf("worker %d\\n", id)
}

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 3; i++ {
        wg.Add(1)
        go doWork(&wg, i)
    }
    wg.Wait()
    fmt.Println("done")
}`,
      hints: [
        'WaitGroup must not be copied -- use a pointer.',
        'Change parameter to *sync.WaitGroup.',
        'Pass &wg when calling the function.',
      ],
      concepts: ['WaitGroup copy bug', 'pointer parameter'],
    },
    {
      id: 'go-wg-18',
      title: 'Fix Missing Done',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the deadlock caused by a missing wg.Done call.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup

    wg.Add(1)
    go func() {
        fmt.Println("working...")
        if true {
            return // Bug: Done is never called
        }
        wg.Done()
    }()

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

    wg.Add(1)
    go func() {
        defer wg.Done()
        fmt.Println("working...")
        if true {
            return
        }
    }()

    wg.Wait()
    fmt.Println("done")
}`,
      hints: [
        'Use defer wg.Done() at the start of the goroutine.',
        'defer ensures Done is called regardless of return path.',
        'Without defer, early returns skip Done causing deadlock.',
      ],
      concepts: ['defer Done', 'early return', 'deadlock'],
    },
    {
      id: 'go-wg-19',
      title: 'Refactor Sequential to Parallel',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor sequential processing to parallel with WaitGroup.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

func validate(item string) bool {
    time.Sleep(50 * time.Millisecond) // simulate work
    return len(item) > 2
}

func main() {
    items := []string{"go", "rust", "c", "python", "js"}
    valid := []string{}

    for _, item := range items {
        if validate(item) {
            valid = append(valid, item)
        }
    }

    fmt.Println(valid)
}`,
      solution: `package main

import (
    "fmt"
    "sync"
    "time"
)

func validate(item string) bool {
    time.Sleep(50 * time.Millisecond)
    return len(item) > 2
}

func main() {
    items := []string{"go", "rust", "c", "python", "js"}

    var mu sync.Mutex
    var wg sync.WaitGroup
    valid := []string{}

    for _, item := range items {
        wg.Add(1)
        go func(s string) {
            defer wg.Done()
            if validate(s) {
                mu.Lock()
                valid = append(valid, s)
                mu.Unlock()
            }
        }(item)
    }

    wg.Wait()
    fmt.Println(valid)
}`,
      hints: [
        'Run each validation in its own goroutine.',
        'Protect the shared valid slice with a mutex.',
        'Use WaitGroup to wait for all validations.',
      ],
      concepts: ['parallel validation', 'mutex with WaitGroup'],
    },
    {
      id: 'go-wg-20',
      title: 'Refactor WaitGroup to Errgroup',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor WaitGroup-based code to use errgroup for error handling.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func process(id int) error {
    if id%3 == 0 {
        return fmt.Errorf("failed on %d", id)
    }
    return nil
}

func main() {
    var wg sync.WaitGroup
    var mu sync.Mutex
    var errs []error

    for i := 1; i <= 6; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            if err := process(n); err != nil {
                mu.Lock()
                errs = append(errs, err)
                mu.Unlock()
            }
        }(i)
    }

    wg.Wait()
    for _, err := range errs {
        fmt.Println(err)
    }
}`,
      solution: `package main

import (
    "fmt"

    "golang.org/x/sync/errgroup"
)

func process(id int) error {
    if id%3 == 0 {
        return fmt.Errorf("failed on %d", id)
    }
    return nil
}

func main() {
    var g errgroup.Group

    for i := 1; i <= 6; i++ {
        i := i
        g.Go(func() error {
            return process(i)
        })
    }

    if err := g.Wait(); err != nil {
        fmt.Println("first error:", err)
    } else {
        fmt.Println("all succeeded")
    }
}`,
      hints: [
        'errgroup handles WaitGroup and error collection internally.',
        'g.Go replaces wg.Add + go func + defer wg.Done.',
        'g.Wait returns the first error (not all errors).',
      ],
      concepts: ['errgroup refactoring', 'error propagation'],
    },
  ],
};
