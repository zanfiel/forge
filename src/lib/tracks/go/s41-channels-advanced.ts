import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
	id: 'go-chadv',
	title: '41. Advanced Channels',
	explanation: `## Advanced Channel Patterns in Go

Beyond basic send and receive, Go channels support powerful patterns for coordinating concurrent work.

### Directional Channels

\`\`\`go
// Send-only channel
func producer(ch chan<- int) {
    ch <- 42
}

// Receive-only channel
func consumer(ch <-chan int) {
    v := <-ch
    fmt.Println(v)
}
\`\`\`

### Buffered vs Unbuffered

\`\`\`go
unbuf := make(chan int)     // blocks until receiver ready
buf := make(chan int, 10)   // blocks only when buffer full
\`\`\`

### Nil Channels in Select

A nil channel blocks forever in select, useful for disabling cases:

\`\`\`go
var ch1, ch2 chan int
ch1 = make(chan int, 1)
ch1 <- 1
select {
case v := <-ch1:
    fmt.Println(v) // this case wins
    ch1 = nil      // disable this case for future iterations
case v := <-ch2:
    fmt.Println(v) // never selected (ch2 is nil)
}
\`\`\`

### Signaling with Empty Struct

\`\`\`go
done := make(chan struct{})
go func() {
    // do work
    close(done) // signal completion, zero memory
}()
<-done
\`\`\`

### Range Over Channel

\`\`\`go
ch := make(chan int)
go func() {
    for i := 0; i < 5; i++ {
        ch <- i
    }
    close(ch)
}()
for v := range ch {
    fmt.Println(v)
}
\`\`\`

### Or-Done Channel

\`\`\`go
func orDone(done <-chan struct{}, c <-chan int) <-chan int {
    stream := make(chan int)
    go func() {
        defer close(stream)
        for {
            select {
            case <-done:
                return
            case v, ok := <-c:
                if !ok { return }
                select {
                case stream <- v:
                case <-done:
                    return
                }
            }
        }
    }()
    return stream
}
\`\`\`

### Tee Channel

\`\`\`go
func tee(done <-chan struct{}, in <-chan int) (<-chan int, <-chan int) {
    out1, out2 := make(chan int), make(chan int)
    go func() {
        defer close(out1)
        defer close(out2)
        for v := range in {
            o1, o2 := out1, out2
            for i := 0; i < 2; i++ {
                select {
                case <-done: return
                case o1 <- v: o1 = nil
                case o2 <- v: o2 = nil
                }
            }
        }
    }()
    return out1, out2
}
\`\`\``,
	exercises: [
		{
			id: 'go-chadv-1',
			title: 'Directional Send Channel',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Declare a send-only channel parameter.',
			skeleton: `package main

import "fmt"

func produce(ch __BLANK__ int) {
    for i := 0; i < 5; i++ {
        ch <- i
    }
    close(ch)
}

func main() {
    ch := make(chan int)
    go produce(ch)
    for v := range ch {
        fmt.Println(v)
    }
}`,
			solution: `package main

import "fmt"

func produce(ch chan<- int) {
    for i := 0; i < 5; i++ {
        ch <- i
    }
    close(ch)
}

func main() {
    ch := make(chan int)
    go produce(ch)
    for v := range ch {
        fmt.Println(v)
    }
}`,
			hints: [
				'A send-only channel uses the arrow after chan.',
				'The syntax is chan<- Type for send-only.',
				'Replace __BLANK__ with chan<-'
			],
			concepts: ['directional-channels', 'send-only', 'range-channel']
		},
		{
			id: 'go-chadv-2',
			title: 'Directional Receive Channel',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Declare a receive-only channel parameter.',
			skeleton: `package main

import "fmt"

func consume(ch __BLANK__ int) {
    for v := range ch {
        fmt.Println(v)
    }
}

func main() {
    ch := make(chan int, 3)
    ch <- 10
    ch <- 20
    ch <- 30
    close(ch)
    consume(ch)
}`,
			solution: `package main

import "fmt"

func consume(ch <-chan int) {
    for v := range ch {
        fmt.Println(v)
    }
}

func main() {
    ch := make(chan int, 3)
    ch <- 10
    ch <- 20
    ch <- 30
    close(ch)
    consume(ch)
}`,
			hints: [
				'A receive-only channel has the arrow before chan.',
				'The syntax is <-chan Type for receive-only.',
				'Replace __BLANK__ with <-chan'
			],
			concepts: ['directional-channels', 'receive-only', 'range-channel']
		},
		{
			id: 'go-chadv-3',
			title: 'Buffered Channel Capacity',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Create a buffered channel with capacity 5.',
			skeleton: `package main

import "fmt"

func main() {
    ch := __BLANK__

    ch <- 1
    ch <- 2
    ch <- 3

    fmt.Println(len(ch), cap(ch))
}`,
			solution: `package main

import "fmt"

func main() {
    ch := make(chan int, 5)

    ch <- 1
    ch <- 2
    ch <- 3

    fmt.Println(len(ch), cap(ch))
}`,
			hints: [
				'make(chan Type, capacity) creates a buffered channel.',
				'The second argument to make is the buffer size.',
				'Replace __BLANK__ with make(chan int, 5)'
			],
			concepts: ['buffered-channels', 'channel-capacity', 'len-cap']
		},
		{
			id: 'go-chadv-4',
			title: 'Signal with Empty Struct',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Use an empty struct channel for signaling.',
			skeleton: `package main

import "fmt"

func worker(done __BLANK__) {
    fmt.Println("working...")
    close(done)
}

func main() {
    done := make(chan struct{})
    go worker(done)
    <-done
    fmt.Println("done")
}`,
			solution: `package main

import "fmt"

func worker(done chan<- struct{}) {
    fmt.Println("working...")
    close(done)
}

func main() {
    done := make(chan struct{})
    go worker(done)
    <-done
    fmt.Println("done")
}`,
			hints: [
				'chan struct{} is zero-size and ideal for signaling.',
				'The worker only needs to close the channel, so send-only is appropriate.',
				'Replace __BLANK__ with chan<- struct{}'
			],
			concepts: ['empty-struct', 'signaling', 'done-channel']
		},
		{
			id: 'go-chadv-5',
			title: 'Nil Channel in Select',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Disable a select case by setting a channel to nil.',
			skeleton: `package main

import "fmt"

func main() {
    ch1 := make(chan string, 1)
    ch2 := make(chan string, 1)
    ch1 <- "hello"
    ch2 <- "world"

    for i := 0; i < 2; i++ {
        select {
        case v, ok := <-ch1:
            if ok {
                fmt.Println(v)
                __BLANK__
            }
        case v, ok := <-ch2:
            if ok {
                fmt.Println(v)
                ch2 = nil
            }
        }
    }
}`,
			solution: `package main

import "fmt"

func main() {
    ch1 := make(chan string, 1)
    ch2 := make(chan string, 1)
    ch1 <- "hello"
    ch2 <- "world"

    for i := 0; i < 2; i++ {
        select {
        case v, ok := <-ch1:
            if ok {
                fmt.Println(v)
                ch1 = nil
            }
        case v, ok := <-ch2:
            if ok {
                fmt.Println(v)
                ch2 = nil
            }
        }
    }
}`,
			hints: [
				'Setting a channel to nil makes it block forever in select.',
				'This effectively disables that select case.',
				'Replace __BLANK__ with ch1 = nil'
			],
			concepts: ['nil-channel', 'select', 'channel-disabling']
		},
		{
			id: 'go-chadv-6',
			title: 'Select with Timeout',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Add a timeout case to a select statement.',
			skeleton: `package main

import (
    "fmt"
    "time"
)

func main() {
    ch := make(chan string)

    go func() {
        time.Sleep(2 * time.Second)
        ch <- "result"
    }()

    select {
    case v := <-ch:
        fmt.Println(v)
    case __BLANK__:
        fmt.Println("timeout!")
    }
}`,
			solution: `package main

import (
    "fmt"
    "time"
)

func main() {
    ch := make(chan string)

    go func() {
        time.Sleep(2 * time.Second)
        ch <- "result"
    }()

    select {
    case v := <-ch:
        fmt.Println(v)
    case <-time.After(1 * time.Second):
        fmt.Println("timeout!")
    }
}`,
			hints: [
				'time.After returns a channel that receives after a duration.',
				'Use <-time.After(duration) in a select case.',
				'Replace __BLANK__ with <-time.After(1 * time.Second)'
			],
			concepts: ['select', 'timeout', 'time-after']
		},
		{
			id: 'go-chadv-7',
			title: 'Done Channel Pattern',
			type: 'write-function',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Write a generator that stops when a done channel is closed.',
			skeleton: `package main

import "fmt"

// generator returns a channel that produces integers starting from 0.
// It stops when the done channel is closed.
func generator(done <-chan struct{}) <-chan int {
    // TODO: implement
}

func main() {
    done := make(chan struct{})
    ch := generator(done)

    for i := 0; i < 5; i++ {
        fmt.Println(<-ch)
    }
    close(done)
}`,
			solution: `package main

import "fmt"

// generator returns a channel that produces integers starting from 0.
// It stops when the done channel is closed.
func generator(done <-chan struct{}) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        i := 0
        for {
            select {
            case <-done:
                return
            case out <- i:
                i++
            }
        }
    }()
    return out
}

func main() {
    done := make(chan struct{})
    ch := generator(done)

    for i := 0; i < 5; i++ {
        fmt.Println(<-ch)
    }
    close(done)
}`,
			hints: [
				'Create an output channel and launch a goroutine.',
				'Use select to check done before sending.',
				'Defer close(out) so consumers know when the generator stops.'
			],
			concepts: ['done-channel', 'generator-pattern', 'select']
		},
		{
			id: 'go-chadv-8',
			title: 'Range Over Channel',
			type: 'write-function',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Write a function that sends slice values on a channel and closes it.',
			skeleton: `package main

import "fmt"

// sendAll sends each element of vals on ch, then closes ch.
func sendAll(ch chan<- int, vals []int) {
    // TODO: implement
}

func main() {
    ch := make(chan int)
    go sendAll(ch, []int{10, 20, 30, 40, 50})

    for v := range ch {
        fmt.Println(v)
    }
}`,
			solution: `package main

import "fmt"

// sendAll sends each element of vals on ch, then closes ch.
func sendAll(ch chan<- int, vals []int) {
    for _, v := range vals {
        ch <- v
    }
    close(ch)
}

func main() {
    ch := make(chan int)
    go sendAll(ch, []int{10, 20, 30, 40, 50})

    for v := range ch {
        fmt.Println(v)
    }
}`,
			hints: [
				'Iterate over vals and send each value on ch.',
				'Close the channel after all values are sent.',
				'The consumer uses range to receive until the channel closes.'
			],
			concepts: ['range-channel', 'close', 'send-only']
		},
		{
			id: 'go-chadv-9',
			title: 'Channel of Channels',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Implement a request-response pattern using a channel of channels.',
			skeleton: `package main

import "fmt"

type Request struct {
    Value    int
    Response chan int
}

// server reads requests and responds with the square of the value.
func server(reqs <-chan Request) {
    // TODO: implement
}

func main() {
    reqs := make(chan Request)
    go server(reqs)

    resp := make(chan int)
    reqs <- Request{Value: 7, Response: resp}
    fmt.Println(<-resp)

    reqs <- Request{Value: 12, Response: resp}
    fmt.Println(<-resp)
}`,
			solution: `package main

import "fmt"

type Request struct {
    Value    int
    Response chan int
}

// server reads requests and responds with the square of the value.
func server(reqs <-chan Request) {
    for req := range reqs {
        req.Response <- req.Value * req.Value
    }
}

func main() {
    reqs := make(chan Request)
    go server(reqs)

    resp := make(chan int)
    reqs <- Request{Value: 7, Response: resp}
    fmt.Println(<-resp)

    reqs <- Request{Value: 12, Response: resp}
    fmt.Println(<-resp)
}`,
			hints: [
				'Range over the requests channel to process each one.',
				'Send the result back on req.Response.',
				'The response channel is embedded in the request struct.'
			],
			concepts: ['channel-of-channels', 'request-response', 'struct-channels']
		},
		{
			id: 'go-chadv-10',
			title: 'Tee Channel',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Implement a tee function that splits a channel into two.',
			skeleton: `package main

import "fmt"

// tee takes an input channel and returns two output channels
// that each receive a copy of every value from in.
func tee(done <-chan struct{}, in <-chan int) (<-chan int, <-chan int) {
    // TODO: implement
}

func main() {
    done := make(chan struct{})
    in := make(chan int, 3)
    in <- 1
    in <- 2
    in <- 3
    close(in)

    out1, out2 := tee(done, in)
    for v := range out1 {
        fmt.Println("out1:", v, "out2:", <-out2)
    }
}`,
			solution: `package main

import "fmt"

// tee takes an input channel and returns two output channels
// that each receive a copy of every value from in.
func tee(done <-chan struct{}, in <-chan int) (<-chan int, <-chan int) {
    out1 := make(chan int)
    out2 := make(chan int)
    go func() {
        defer close(out1)
        defer close(out2)
        for v := range in {
            o1, o2 := out1, out2
            for i := 0; i < 2; i++ {
                select {
                case <-done:
                    return
                case o1 <- v:
                    o1 = nil
                case o2 <- v:
                    o2 = nil
                }
            }
        }
    }()
    return out1, out2
}

func main() {
    done := make(chan struct{})
    in := make(chan int, 3)
    in <- 1
    in <- 2
    in <- 3
    close(in)

    out1, out2 := tee(done, in)
    for v := range out1 {
        fmt.Println("out1:", v, "out2:", <-out2)
    }
}`,
			hints: [
				'Create two output channels and a goroutine to distribute.',
				'Use local copies of out1/out2, setting each to nil after sending.',
				'Loop twice inside a select to send to both outputs.'
			],
			concepts: ['tee-channel', 'nil-channel', 'fan-out']
		},
		{
			id: 'go-chadv-11',
			title: 'Or-Done Channel',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Implement the or-done pattern to wrap a channel with cancellation.',
			skeleton: `package main

import "fmt"

// orDone wraps a channel so reads are cancellable via done.
func orDone(done <-chan struct{}, c <-chan int) <-chan int {
    // TODO: implement
}

func main() {
    done := make(chan struct{})
    in := make(chan int, 5)
    for i := 1; i <= 5; i++ {
        in <- i
    }
    close(in)

    for v := range orDone(done, in) {
        fmt.Println(v)
    }
}`,
			solution: `package main

import "fmt"

// orDone wraps a channel so reads are cancellable via done.
func orDone(done <-chan struct{}, c <-chan int) <-chan int {
    stream := make(chan int)
    go func() {
        defer close(stream)
        for {
            select {
            case <-done:
                return
            case v, ok := <-c:
                if !ok {
                    return
                }
                select {
                case stream <- v:
                case <-done:
                    return
                }
            }
        }
    }()
    return stream
}

func main() {
    done := make(chan struct{})
    in := make(chan int, 5)
    for i := 1; i <= 5; i++ {
        in <- i
    }
    close(in)

    for v := range orDone(done, in) {
        fmt.Println(v)
    }
}`,
			hints: [
				'Create a stream channel and goroutine.',
				'Check both done and c in a select. If c is closed, return.',
				'Use a nested select when sending to stream to also check done.'
			],
			concepts: ['or-done', 'cancellation', 'channel-wrapping']
		},
		{
			id: 'go-chadv-12',
			title: 'Bridge Channel',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Implement a bridge that flattens a channel of channels into one.',
			skeleton: `package main

import "fmt"

// bridge flattens a channel of channels into a single channel.
func bridge(done <-chan struct{}, chanStream <-chan <-chan int) <-chan int {
    // TODO: implement
}

func main() {
    done := make(chan struct{})

    genChan := func(vals ...int) <-chan int {
        ch := make(chan int)
        go func() {
            defer close(ch)
            for _, v := range vals {
                ch <- v
            }
        }()
        return ch
    }

    chanStream := make(chan (<-chan int), 3)
    chanStream <- genChan(1, 2)
    chanStream <- genChan(3, 4)
    chanStream <- genChan(5, 6)
    close(chanStream)

    for v := range bridge(done, chanStream) {
        fmt.Println(v)
    }
}`,
			solution: `package main

import "fmt"

// bridge flattens a channel of channels into a single channel.
func bridge(done <-chan struct{}, chanStream <-chan <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for {
            var stream <-chan int
            select {
            case <-done:
                return
            case s, ok := <-chanStream:
                if !ok {
                    return
                }
                stream = s
            }
            for v := range stream {
                select {
                case <-done:
                    return
                case out <- v:
                }
            }
        }
    }()
    return out
}

func main() {
    done := make(chan struct{})

    genChan := func(vals ...int) <-chan int {
        ch := make(chan int)
        go func() {
            defer close(ch)
            for _, v := range vals {
                ch <- v
            }
        }()
        return ch
    }

    chanStream := make(chan (<-chan int), 3)
    chanStream <- genChan(1, 2)
    chanStream <- genChan(3, 4)
    chanStream <- genChan(5, 6)
    close(chanStream)

    for v := range bridge(done, chanStream) {
        fmt.Println(v)
    }
}`,
			hints: [
				'Read from chanStream to get each inner channel.',
				'Range over each inner channel to forward values.',
				'Check done in both loops to support cancellation.'
			],
			concepts: ['bridge-channel', 'channel-of-channels', 'flattening']
		},
		{
			id: 'go-chadv-13',
			title: 'Ticker Channel',
			type: 'fix-bug',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Fix the ticker to properly stop and avoid goroutine leak.',
			skeleton: `package main

import (
    "fmt"
    "time"
)

func main() {
    ticker := time.NewTicker(100 * time.Millisecond)
    count := 0

    for range ticker.C {
        count++
        fmt.Println("tick", count)
        if count >= 5 {
            break
        }
    }

    fmt.Println("total ticks:", count)
}`,
			solution: `package main

import (
    "fmt"
    "time"
)

func main() {
    ticker := time.NewTicker(100 * time.Millisecond)
    defer ticker.Stop()
    count := 0

    for range ticker.C {
        count++
        fmt.Println("tick", count)
        if count >= 5 {
            break
        }
    }

    fmt.Println("total ticks:", count)
}`,
			hints: [
				'Tickers must be stopped to release resources.',
				'Use defer ticker.Stop() after creating the ticker.',
				'Without Stop(), the ticker goroutine leaks.'
			],
			concepts: ['ticker', 'resource-leak', 'defer']
		},
		{
			id: 'go-chadv-14',
			title: 'Deadlock from Unbuffered Send',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the deadlock caused by sending on an unbuffered channel without a receiver.',
			skeleton: `package main

import "fmt"

func main() {
    ch := make(chan int)
    ch <- 42
    fmt.Println(<-ch)
}`,
			solution: `package main

import "fmt"

func main() {
    ch := make(chan int, 1)
    ch <- 42
    fmt.Println(<-ch)
}`,
			hints: [
				'An unbuffered channel blocks the sender until a receiver is ready.',
				'Since send and receive are in the same goroutine, it deadlocks.',
				'Use a buffered channel with capacity 1, or send from a goroutine.'
			],
			concepts: ['deadlock', 'unbuffered-channel', 'buffered-channel']
		},
		{
			id: 'go-chadv-15',
			title: 'Send on Closed Channel',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the panic caused by sending on a closed channel.',
			skeleton: `package main

import "fmt"

func main() {
    ch := make(chan int, 5)
    ch <- 1
    ch <- 2
    close(ch)
    ch <- 3

    for v := range ch {
        fmt.Println(v)
    }
}`,
			solution: `package main

import "fmt"

func main() {
    ch := make(chan int, 5)
    ch <- 1
    ch <- 2
    ch <- 3
    close(ch)

    for v := range ch {
        fmt.Println(v)
    }
}`,
			hints: [
				'Sending on a closed channel causes a panic.',
				'Close the channel only after all sends are complete.',
				'Move the close(ch) after all ch <- operations.'
			],
			concepts: ['closed-channel', 'panic', 'channel-ownership']
		},
		{
			id: 'go-chadv-16',
			title: 'Predict Buffered Channel Output',
			type: 'predict-output',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Predict the output of buffered channel operations.',
			skeleton: `package main

import "fmt"

func main() {
    ch := make(chan int, 3)
    ch <- 10
    ch <- 20
    ch <- 30
    fmt.Println(len(ch), cap(ch))
    fmt.Println(<-ch)
    fmt.Println(len(ch), cap(ch))
}`,
			solution: `3 3
10
2 3`,
			hints: [
				'len(ch) is the number of elements queued in the buffer.',
				'cap(ch) is the buffer capacity (always 3).',
				'Receiving removes the first element (FIFO).'
			],
			concepts: ['buffered-channel', 'len', 'cap', 'fifo']
		},
		{
			id: 'go-chadv-17',
			title: 'Predict Closed Channel Receive',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict what happens when receiving from a closed channel.',
			skeleton: `package main

import "fmt"

func main() {
    ch := make(chan int, 2)
    ch <- 5
    close(ch)

    v1, ok1 := <-ch
    fmt.Println(v1, ok1)

    v2, ok2 := <-ch
    fmt.Println(v2, ok2)
}`,
			solution: `5 true
0 false`,
			hints: [
				'A closed channel with buffered values still delivers them.',
				'The ok value is true while buffered values remain.',
				'After the buffer is empty, receiving returns zero value and false.'
			],
			concepts: ['closed-channel', 'comma-ok', 'zero-value']
		},
		{
			id: 'go-chadv-18',
			title: 'Predict Select Default',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict select behavior with a default case.',
			skeleton: `package main

import "fmt"

func main() {
    ch := make(chan int)

    select {
    case v := <-ch:
        fmt.Println("received", v)
    default:
        fmt.Println("no value ready")
    }
}`,
			solution: `no value ready`,
			hints: [
				'The default case runs when no other case is ready.',
				'ch is unbuffered and has no sender, so <-ch would block.',
				'Since default is present, select does not block.'
			],
			concepts: ['select', 'default-case', 'non-blocking']
		},
		{
			id: 'go-chadv-19',
			title: 'Refactor Channel Ownership',
			type: 'refactor',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Refactor so the producer owns and closes the channel.',
			skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    ch := make(chan int)
    var wg sync.WaitGroup

    wg.Add(1)
    go func() {
        defer wg.Done()
        for i := 0; i < 5; i++ {
            ch <- i
        }
    }()

    go func() {
        wg.Wait()
        close(ch)
    }()

    for v := range ch {
        fmt.Println(v)
    }
}`,
			solution: `package main

import "fmt"

func produce() <-chan int {
    ch := make(chan int)
    go func() {
        defer close(ch)
        for i := 0; i < 5; i++ {
            ch <- i
        }
    }()
    return ch
}

func main() {
    for v := range produce() {
        fmt.Println(v)
    }
}`,
			hints: [
				'The producer should create, write to, and close its own channel.',
				'Return a receive-only channel from the producer function.',
				'This eliminates the need for WaitGroup and extra goroutines.'
			],
			concepts: ['channel-ownership', 'encapsulation', 'refactoring']
		},
		{
			id: 'go-chadv-20',
			title: 'Refactor Select to Context',
			type: 'refactor',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Refactor from manual done channel to context.Context for cancellation.',
			skeleton: `package main

import (
    "fmt"
    "time"
)

func worker(done <-chan struct{}, results chan<- int) {
    i := 0
    for {
        select {
        case <-done:
            close(results)
            return
        case results <- i:
            i++
            time.Sleep(50 * time.Millisecond)
        }
    }
}

func main() {
    done := make(chan struct{})
    results := make(chan int)
    go worker(done, results)

    time.Sleep(200 * time.Millisecond)
    close(done)

    for v := range results {
        fmt.Println(v)
    }
}`,
			solution: `package main

import (
    "context"
    "fmt"
    "time"
)

func worker(ctx context.Context, results chan<- int) {
    defer close(results)
    i := 0
    for {
        select {
        case <-ctx.Done():
            return
        case results <- i:
            i++
            time.Sleep(50 * time.Millisecond)
        }
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
    defer cancel()

    results := make(chan int)
    go worker(ctx, results)

    for v := range results {
        fmt.Println(v)
    }
}`,
			hints: [
				'Replace the done channel with context.Context.',
				'Use context.WithTimeout for automatic cancellation.',
				'Check ctx.Done() instead of <-done in the select.'
			],
			concepts: ['context', 'cancellation', 'refactoring', 'timeout']
		}
	]
};
