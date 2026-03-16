import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
	id: 'go-pipe',
	title: '43. Pipeline Pattern',
	explanation: `## Pipeline Concurrency Pattern

A pipeline is a series of stages connected by channels, where each stage is a group of goroutines that:
1. Receives values from upstream via inbound channels
2. Performs a function on that data
3. Sends values downstream via outbound channels

### Basic Pipeline

\`\`\`go
// Generator: produces values
func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

// Stage: squares values
func sq(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            out <- n * n
        }
    }()
    return out
}

// Chain: gen -> sq -> sq
for v := range sq(sq(gen(2, 3, 4))) {
    fmt.Println(v) // 16, 81, 256
}
\`\`\`

### Pipeline with Cancellation

\`\`\`go
func gen(done <-chan struct{}, nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            select {
            case <-done:
                return
            case out <- n:
            }
        }
    }()
    return out
}
\`\`\`

### Error Propagation

\`\`\`go
type Result struct {
    Value int
    Err   error
}

func stage(in <-chan Result) <-chan Result {
    out := make(chan Result)
    go func() {
        defer close(out)
        for r := range in {
            if r.Err != nil {
                out <- r // forward error
                continue
            }
            out <- Result{Value: transform(r.Value)}
        }
    }()
    return out
}
\`\`\``,
	exercises: [
		{
			id: 'go-pipe-1',
			title: 'Generator Stage',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Complete a generator stage that emits values on a channel.',
			skeleton: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        __BLANK__
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

func main() {
    for v := range gen(2, 3, 4) {
        fmt.Println(v)
    }
}`,
			solution: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

func main() {
    for v := range gen(2, 3, 4) {
        fmt.Println(v)
    }
}`,
			hints: [
				'The channel must be closed after all values are sent.',
				'Use defer to ensure close happens even if there is a panic.',
				'Replace __BLANK__ with defer close(out)'
			],
			concepts: ['generator', 'pipeline-stage', 'defer-close']
		},
		{
			id: 'go-pipe-2',
			title: 'Transform Stage',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Complete a pipeline stage that doubles input values.',
			skeleton: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

func double(in __BLANK__) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            out <- n * 2
        }
    }()
    return out
}

func main() {
    for v := range double(gen(1, 2, 3)) {
        fmt.Println(v)
    }
}`,
			solution: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

func double(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            out <- n * 2
        }
    }()
    return out
}

func main() {
    for v := range double(gen(1, 2, 3)) {
        fmt.Println(v)
    }
}`,
			hints: [
				'The input channel should be receive-only.',
				'Use <-chan int for a receive-only channel of int.',
				'Replace __BLANK__ with <-chan int'
			],
			concepts: ['pipeline-stage', 'directional-channels', 'transformation']
		},
		{
			id: 'go-pipe-3',
			title: 'Filter Stage',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Complete a filter stage that only passes even numbers.',
			skeleton: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

func filterEven(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            if __BLANK__ {
                out <- n
            }
        }
    }()
    return out
}

func main() {
    for v := range filterEven(gen(1, 2, 3, 4, 5, 6)) {
        fmt.Println(v)
    }
}`,
			solution: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

func filterEven(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            if n%2 == 0 {
                out <- n
            }
        }
    }()
    return out
}

func main() {
    for v := range filterEven(gen(1, 2, 3, 4, 5, 6)) {
        fmt.Println(v)
    }
}`,
			hints: [
				'Even numbers have no remainder when divided by 2.',
				'Use the modulo operator % to check.',
				'Replace __BLANK__ with n%2 == 0'
			],
			concepts: ['filter-stage', 'pipeline', 'modulo']
		},
		{
			id: 'go-pipe-4',
			title: 'Pipeline with Done Channel',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Add cancellation support to a pipeline stage.',
			skeleton: `package main

import "fmt"

func gen(done <-chan struct{}, nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            select {
            case <-done:
                return
            case out <- n:
            }
        }
    }()
    return out
}

func square(done <-chan struct{}, in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            select {
            case __BLANK__:
                return
            case out <- n * n:
            }
        }
    }()
    return out
}

func main() {
    done := make(chan struct{})
    ch := square(done, gen(done, 2, 3, 4, 5, 6))
    fmt.Println(<-ch)
    close(done)
}`,
			solution: `package main

import "fmt"

func gen(done <-chan struct{}, nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            select {
            case <-done:
                return
            case out <- n:
            }
        }
    }()
    return out
}

func square(done <-chan struct{}, in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            select {
            case <-done:
                return
            case out <- n * n:
            }
        }
    }()
    return out
}

func main() {
    done := make(chan struct{})
    ch := square(done, gen(done, 2, 3, 4, 5, 6))
    fmt.Println(<-ch)
    close(done)
}`,
			hints: [
				'Check the done channel in the select to support cancellation.',
				'When done is closed, the stage should return immediately.',
				'Replace __BLANK__ with <-done'
			],
			concepts: ['done-channel', 'cancellation', 'pipeline']
		},
		{
			id: 'go-pipe-5',
			title: 'Sink Stage Accumulator',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Complete a sink stage that sums all values from a pipeline.',
			skeleton: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

func sum(in <-chan int) int {
    total := 0
    for n := __BLANK__ {
        total += n
    }
    return total
}

func main() {
    fmt.Println(sum(gen(1, 2, 3, 4, 5)))
}`,
			solution: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

func sum(in <-chan int) int {
    total := 0
    for n := range in {
        total += n
    }
    return total
}

func main() {
    fmt.Println(sum(gen(1, 2, 3, 4, 5)))
}`,
			hints: [
				'A sink is the final stage that consumes all values.',
				'Use range to read all values until the channel closes.',
				'Replace __BLANK__ with range in'
			],
			concepts: ['sink-stage', 'accumulator', 'range-channel']
		},
		{
			id: 'go-pipe-6',
			title: 'Context Pipeline Stage',
			type: 'fill-blank',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Use context.Context for pipeline cancellation.',
			skeleton: `package main

import (
    "context"
    "fmt"
    "time"
)

func infinite(ctx context.Context) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        i := 0
        for {
            select {
            case __BLANK__:
                return
            case out <- i:
                i++
            }
        }
    }()
    return out
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
    defer cancel()

    count := 0
    for range infinite(ctx) {
        count++
    }
    fmt.Println("received", count, "values")
}`,
			solution: `package main

import (
    "context"
    "fmt"
    "time"
)

func infinite(ctx context.Context) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        i := 0
        for {
            select {
            case <-ctx.Done():
                return
            case out <- i:
                i++
            }
        }
    }()
    return out
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
    defer cancel()

    count := 0
    for range infinite(ctx) {
        count++
    }
    fmt.Println("received", count, "values")
}`,
			hints: [
				'context.Context has a Done() method returning a channel.',
				'When the context expires or is cancelled, Done() closes.',
				'Replace __BLANK__ with <-ctx.Done()'
			],
			concepts: ['context', 'cancellation', 'infinite-generator']
		},
		{
			id: 'go-pipe-7',
			title: 'Three-Stage Pipeline',
			type: 'write-function',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Write a three-stage pipeline: generate, square, and filter positive.',
			skeleton: `package main

import "fmt"

// gen sends all nums on a channel, then closes it.
func gen(nums ...int) <-chan int {
    // TODO: implement
}

// square reads from in, squares each value, sends on output.
func square(in <-chan int) <-chan int {
    // TODO: implement
}

// filterPositive passes only values > 0.
func filterPositive(in <-chan int) <-chan int {
    // TODO: implement
}

func main() {
    for v := range filterPositive(square(gen(-3, -1, 0, 2, 4))) {
        fmt.Println(v)
    }
}`,
			solution: `package main

import "fmt"

// gen sends all nums on a channel, then closes it.
func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

// square reads from in, squares each value, sends on output.
func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            out <- n * n
        }
    }()
    return out
}

// filterPositive passes only values > 0.
func filterPositive(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            if n > 0 {
                out <- n
            }
        }
    }()
    return out
}

func main() {
    for v := range filterPositive(square(gen(-3, -1, 0, 2, 4))) {
        fmt.Println(v)
    }
}`,
			hints: [
				'Each stage creates an output channel and goroutine.',
				'Close the output channel when input is exhausted.',
				'Stages compose by passing one output as another input.'
			],
			concepts: ['pipeline', 'composition', 'filter']
		},
		{
			id: 'go-pipe-8',
			title: 'Map Stage Function',
			type: 'write-function',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Write a generic map stage that applies a function to each value.',
			skeleton: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

// mapStage applies fn to each value from in.
func mapStage(in <-chan int, fn func(int) int) <-chan int {
    // TODO: implement
}

func main() {
    triple := func(n int) int { return n * 3 }
    for v := range mapStage(gen(1, 2, 3, 4), triple) {
        fmt.Println(v)
    }
}`,
			solution: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

// mapStage applies fn to each value from in.
func mapStage(in <-chan int, fn func(int) int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            out <- fn(n)
        }
    }()
    return out
}

func main() {
    triple := func(n int) int { return n * 3 }
    for v := range mapStage(gen(1, 2, 3, 4), triple) {
        fmt.Println(v)
    }
}`,
			hints: [
				'Read from in, apply fn, send result on out.',
				'Close the output channel when input is exhausted.',
				'This is a higher-order function pipeline stage.'
			],
			concepts: ['higher-order-functions', 'map', 'pipeline']
		},
		{
			id: 'go-pipe-9',
			title: 'Batch Pipeline Stage',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Write a pipeline stage that batches values into groups.',
			skeleton: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

// batch collects values from in into slices of size batchSize.
// The last batch may be smaller.
func batch(in <-chan int, batchSize int) <-chan []int {
    // TODO: implement
}

func main() {
    for b := range batch(gen(1, 2, 3, 4, 5, 6, 7), 3) {
        fmt.Println(b)
    }
}`,
			solution: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

// batch collects values from in into slices of size batchSize.
// The last batch may be smaller.
func batch(in <-chan int, batchSize int) <-chan []int {
    out := make(chan []int)
    go func() {
        defer close(out)
        buf := make([]int, 0, batchSize)
        for n := range in {
            buf = append(buf, n)
            if len(buf) == batchSize {
                out <- buf
                buf = make([]int, 0, batchSize)
            }
        }
        if len(buf) > 0 {
            out <- buf
        }
    }()
    return out
}

func main() {
    for b := range batch(gen(1, 2, 3, 4, 5, 6, 7), 3) {
        fmt.Println(b)
    }
}`,
			hints: [
				'Accumulate values in a buffer slice.',
				'Flush the buffer when it reaches batchSize.',
				'After the input channel closes, flush any remaining values.'
			],
			concepts: ['batching', 'pipeline', 'slice-buffer']
		},
		{
			id: 'go-pipe-10',
			title: 'Error Pipeline Stage',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Write a pipeline stage that propagates errors through results.',
			skeleton: `package main

import (
    "errors"
    "fmt"
)

type Result struct {
    Value int
    Err   error
}

func genResults(nums ...int) <-chan Result {
    out := make(chan Result)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- Result{Value: n}
        }
    }()
    return out
}

// validate rejects negative numbers with an error.
// Positive values pass through unchanged.
// If the input already has an error, forward it.
func validate(in <-chan Result) <-chan Result {
    // TODO: implement
}

func main() {
    for r := range validate(genResults(5, -2, 10, -7, 3)) {
        if r.Err != nil {
            fmt.Println("error:", r.Err)
        } else {
            fmt.Println("value:", r.Value)
        }
    }
}`,
			solution: `package main

import (
    "errors"
    "fmt"
)

type Result struct {
    Value int
    Err   error
}

func genResults(nums ...int) <-chan Result {
    out := make(chan Result)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- Result{Value: n}
        }
    }()
    return out
}

// validate rejects negative numbers with an error.
// Positive values pass through unchanged.
// If the input already has an error, forward it.
func validate(in <-chan Result) <-chan Result {
    out := make(chan Result)
    go func() {
        defer close(out)
        for r := range in {
            if r.Err != nil {
                out <- r
                continue
            }
            if r.Value < 0 {
                out <- Result{Err: errors.New(fmt.Sprintf("negative: %d", r.Value))}
            } else {
                out <- r
            }
        }
    }()
    return out
}

func main() {
    for r := range validate(genResults(5, -2, 10, -7, 3)) {
        if r.Err != nil {
            fmt.Println("error:", r.Err)
        } else {
            fmt.Println("value:", r.Value)
        }
    }
}`,
			hints: [
				'Check if the incoming result already has an error.',
				'For negative values, create a new Result with Err set.',
				'Forward valid values unchanged.'
			],
			concepts: ['error-propagation', 'result-type', 'pipeline']
		},
		{
			id: 'go-pipe-11',
			title: 'Pipeline with Retry',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Write a pipeline stage that retries failed operations.',
			skeleton: `package main

import (
    "fmt"
    "math/rand"
)

type Result struct {
    Value int
    Err   error
}

// retryStage reads Results from in. If a result has an error,
// it retries the operation (calling process) up to maxRetries times.
// process is a function that may fail randomly.
func retryStage(in <-chan Result, maxRetries int, process func(int) (int, error)) <-chan Result {
    // TODO: implement
}

func main() {
    in := make(chan Result, 5)
    for i := 1; i <= 5; i++ {
        in <- Result{Value: i}
    }
    close(in)

    process := func(n int) (int, error) {
        if rand.Intn(3) == 0 {
            return 0, fmt.Errorf("transient error for %d", n)
        }
        return n * 10, nil
    }

    for r := range retryStage(in, 3, process) {
        if r.Err != nil {
            fmt.Println("failed:", r.Err)
        } else {
            fmt.Println("ok:", r.Value)
        }
    }
}`,
			solution: `package main

import (
    "fmt"
    "math/rand"
)

type Result struct {
    Value int
    Err   error
}

// retryStage reads Results from in. If a result has an error,
// it retries the operation (calling process) up to maxRetries times.
// process is a function that may fail randomly.
func retryStage(in <-chan Result, maxRetries int, process func(int) (int, error)) <-chan Result {
    out := make(chan Result)
    go func() {
        defer close(out)
        for r := range in {
            if r.Err != nil {
                out <- r
                continue
            }
            var lastErr error
            success := false
            for attempt := 0; attempt <= maxRetries; attempt++ {
                val, err := process(r.Value)
                if err == nil {
                    out <- Result{Value: val}
                    success = true
                    break
                }
                lastErr = err
            }
            if !success {
                out <- Result{Value: r.Value, Err: lastErr}
            }
        }
    }()
    return out
}

func main() {
    in := make(chan Result, 5)
    for i := 1; i <= 5; i++ {
        in <- Result{Value: i}
    }
    close(in)

    process := func(n int) (int, error) {
        if rand.Intn(3) == 0 {
            return 0, fmt.Errorf("transient error for %d", n)
        }
        return n * 10, nil
    }

    for r := range retryStage(in, 3, process) {
        if r.Err != nil {
            fmt.Println("failed:", r.Err)
        } else {
            fmt.Println("ok:", r.Value)
        }
    }
}`,
			hints: [
				'Loop up to maxRetries + 1 attempts for each value.',
				'If process succeeds, send the result and break.',
				'If all retries fail, send a Result with the last error.'
			],
			concepts: ['retry', 'pipeline', 'error-handling']
		},
		{
			id: 'go-pipe-12',
			title: 'Composable Pipeline Builder',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Write a function that composes multiple stages into a pipeline.',
			skeleton: `package main

import "fmt"

type Stage func(<-chan int) <-chan int

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

// pipeline chains multiple stages together.
// The output of one stage feeds into the next.
func pipeline(source <-chan int, stages ...Stage) <-chan int {
    // TODO: implement
}

func main() {
    double := func(in <-chan int) <-chan int {
        out := make(chan int)
        go func() { defer close(out); for n := range in { out <- n * 2 } }()
        return out
    }
    addOne := func(in <-chan int) <-chan int {
        out := make(chan int)
        go func() { defer close(out); for n := range in { out <- n + 1 } }()
        return out
    }

    for v := range pipeline(gen(1, 2, 3), double, addOne) {
        fmt.Println(v) // 3, 5, 7
    }
}`,
			solution: `package main

import "fmt"

type Stage func(<-chan int) <-chan int

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

// pipeline chains multiple stages together.
// The output of one stage feeds into the next.
func pipeline(source <-chan int, stages ...Stage) <-chan int {
    ch := source
    for _, stage := range stages {
        ch = stage(ch)
    }
    return ch
}

func main() {
    double := func(in <-chan int) <-chan int {
        out := make(chan int)
        go func() { defer close(out); for n := range in { out <- n * 2 } }()
        return out
    }
    addOne := func(in <-chan int) <-chan int {
        out := make(chan int)
        go func() { defer close(out); for n := range in { out <- n + 1 } }()
        return out
    }

    for v := range pipeline(gen(1, 2, 3), double, addOne) {
        fmt.Println(v) // 3, 5, 7
    }
}`,
			hints: [
				'Iterate over stages, feeding each output into the next.',
				'Start with the source channel.',
				'Each stage(ch) returns a new channel to pass to the next stage.'
			],
			concepts: ['composition', 'higher-order-functions', 'pipeline-builder']
		},
		{
			id: 'go-pipe-13',
			title: 'Goroutine Leak in Pipeline',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the goroutine leak when a pipeline consumer stops early.',
			skeleton: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n // blocks forever if consumer stops
        }
        close(out)
    }()
    return out
}

func main() {
    ch := gen(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    fmt.Println(<-ch) // only take first value
    // gen goroutine leaks!
}`,
			solution: `package main

import "fmt"

func gen(done <-chan struct{}, nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            select {
            case <-done:
                return
            case out <- n:
            }
        }
    }()
    return out
}

func main() {
    done := make(chan struct{})
    ch := gen(done, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    fmt.Println(<-ch)
    close(done)
}`,
			hints: [
				'The generator blocks on send if no one receives.',
				'Add a done channel for cancellation.',
				'Use select to check done before each send.'
			],
			concepts: ['goroutine-leak', 'done-channel', 'cancellation']
		},
		{
			id: 'go-pipe-14',
			title: 'Deadlock in Pipeline Chain',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the deadlock caused by missing goroutine in a stage.',
			skeleton: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

func double(in <-chan int) <-chan int {
    out := make(chan int)
    // Bug: running synchronously blocks
    defer close(out)
    for n := range in {
        out <- n * 2
    }
    return out
}

func main() {
    for v := range double(gen(1, 2, 3)) {
        fmt.Println(v)
    }
}`,
			solution: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

func double(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            out <- n * 2
        }
    }()
    return out
}

func main() {
    for v := range double(gen(1, 2, 3)) {
        fmt.Println(v)
    }
}`,
			hints: [
				'Pipeline stages must process in a goroutine.',
				'Running synchronously deadlocks since out has no buffer.',
				'Wrap the processing loop in go func() { ... }().'
			],
			concepts: ['deadlock', 'goroutine', 'pipeline-stage']
		},
		{
			id: 'go-pipe-15',
			title: 'Stage Closes Wrong Channel',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the stage that incorrectly closes the input channel.',
			skeleton: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

func triple(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(in) // BUG: closing input channel
        for n := range in {
            out <- n * 3
        }
    }()
    return out
}

func main() {
    for v := range triple(gen(1, 2, 3)) {
        fmt.Println(v)
    }
}`,
			solution: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

func triple(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            out <- n * 3
        }
    }()
    return out
}

func main() {
    for v := range triple(gen(1, 2, 3)) {
        fmt.Println(v)
    }
}`,
			hints: [
				'A stage should close its output channel, not its input.',
				'The input channel is owned by the upstream stage.',
				'Change close(in) to close(out).'
			],
			concepts: ['channel-ownership', 'close', 'pipeline']
		},
		{
			id: 'go-pipe-16',
			title: 'Predict Pipeline Output',
			type: 'predict-output',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Predict the output of a simple two-stage pipeline.',
			skeleton: `package main

import "fmt"

func main() {
    ch := make(chan int, 3)
    ch <- 2
    ch <- 5
    ch <- 10
    close(ch)

    out := make(chan int, 3)
    go func() {
        defer close(out)
        for n := range ch {
            out <- n * n
        }
    }()

    for v := range out {
        fmt.Println(v)
    }
}`,
			solution: `4
25
100`,
			hints: [
				'Each value is squared: 2*2=4, 5*5=25, 10*10=100.',
				'Values come out in FIFO order.',
				'The output channel receives all three squared values.'
			],
			concepts: ['pipeline', 'square', 'buffered-channel']
		},
		{
			id: 'go-pipe-17',
			title: 'Predict Filter Pipeline',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict the output of a pipeline with filter and transform.',
			skeleton: `package main

import "fmt"

func main() {
    nums := make(chan int, 6)
    for _, n := range []int{1, 2, 3, 4, 5, 6} {
        nums <- n
    }
    close(nums)

    evens := make(chan int, 6)
    go func() {
        defer close(evens)
        for n := range nums {
            if n%2 == 0 {
                evens <- n
            }
        }
    }()

    doubled := make(chan int, 6)
    go func() {
        defer close(doubled)
        for n := range evens {
            doubled <- n * 2
        }
    }()

    sum := 0
    for v := range doubled {
        sum += v
    }
    fmt.Println(sum)
}`,
			solution: `24`,
			hints: [
				'Evens: 2, 4, 6. Doubled: 4, 8, 12.',
				'Sum: 4 + 8 + 12 = 24.',
				'The filter passes only even numbers.'
			],
			concepts: ['filter', 'transform', 'accumulator']
		},
		{
			id: 'go-pipe-18',
			title: 'Predict Chained Pipeline',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict the output of three chained stages.',
			skeleton: `package main

import "fmt"

func stage(in <-chan int, fn func(int) int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            out <- fn(n)
        }
    }()
    return out
}

func main() {
    ch := make(chan int, 1)
    ch <- 3
    close(ch)

    result := stage(stage(stage(ch,
        func(n int) int { return n + 2 }),
        func(n int) int { return n * 3 }),
        func(n int) int { return n - 1 })

    fmt.Println(<-result)
}`,
			solution: `14`,
			hints: [
				'Stage 1: 3 + 2 = 5',
				'Stage 2: 5 * 3 = 15',
				'Stage 3: 15 - 1 = 14'
			],
			concepts: ['pipeline-chaining', 'function-composition', 'closures']
		},
		{
			id: 'go-pipe-19',
			title: 'Refactor Nested Loops to Pipeline',
			type: 'refactor',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Refactor nested sequential processing into a composable pipeline.',
			skeleton: `package main

import "fmt"

func main() {
    nums := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

    var result []int
    for _, n := range nums {
        if n%2 == 0 {
            squared := n * n
            if squared > 10 {
                result = append(result, squared)
            }
        }
    }

    for _, v := range result {
        fmt.Println(v)
    }
}`,
			solution: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

func filter(in <-chan int, pred func(int) bool) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            if pred(n) {
                out <- n
            }
        }
    }()
    return out
}

func transform(in <-chan int, fn func(int) int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            out <- fn(n)
        }
    }()
    return out
}

func main() {
    isEven := func(n int) bool { return n%2 == 0 }
    square := func(n int) int { return n * n }
    gt10 := func(n int) bool { return n > 10 }

    pipe := filter(
        transform(
            filter(gen(1, 2, 3, 4, 5, 6, 7, 8, 9, 10), isEven),
            square,
        ),
        gt10,
    )

    for v := range pipe {
        fmt.Println(v)
    }
}`,
			hints: [
				'Break the nested logic into separate filter and transform stages.',
				'Each stage is a function that takes and returns a channel.',
				'Compose the stages to build the same logic.'
			],
			concepts: ['refactoring', 'pipeline', 'composition']
		},
		{
			id: 'go-pipe-20',
			title: 'Refactor Callback to Pipeline',
			type: 'refactor',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Refactor callback-based processing to a channel pipeline.',
			skeleton: `package main

import "fmt"

type Processor struct {
    OnData  func(int)
    OnError func(error)
    OnDone  func()
}

func process(data []int, p Processor) {
    for _, d := range data {
        if d < 0 {
            p.OnError(fmt.Errorf("negative: %d", d))
            continue
        }
        p.OnData(d * 2)
    }
    p.OnDone()
}

func main() {
    var results []int
    process([]int{1, -2, 3, -4, 5}, Processor{
        OnData:  func(v int) { results = append(results, v) },
        OnError: func(e error) { fmt.Println("err:", e) },
        OnDone:  func() { fmt.Println("results:", results) },
    })
}`,
			solution: `package main

import "fmt"

type Result struct {
    Value int
    Err   error
}

func process(data []int) <-chan Result {
    out := make(chan Result)
    go func() {
        defer close(out)
        for _, d := range data {
            if d < 0 {
                out <- Result{Err: fmt.Errorf("negative: %d", d)}
                continue
            }
            out <- Result{Value: d * 2}
        }
    }()
    return out
}

func main() {
    var results []int
    for r := range process([]int{1, -2, 3, -4, 5}) {
        if r.Err != nil {
            fmt.Println("err:", r.Err)
            continue
        }
        results = append(results, r.Value)
    }
    fmt.Println("results:", results)
}`,
			hints: [
				'Replace callbacks with a channel of Result structs.',
				'Each Result carries either a Value or an Error.',
				'The consumer handles results with a range loop.'
			],
			concepts: ['refactoring', 'callbacks-to-channels', 'result-type']
		}
	]
};
