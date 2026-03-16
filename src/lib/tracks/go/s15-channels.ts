import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-ch',
  title: '15. Channels',
  explanation: `## Channels in Go

Channels are typed conduits for communication between goroutines. They synchronize execution and pass data safely.

\`\`\`go
// Create a channel
ch := make(chan int)       // unbuffered
ch := make(chan int, 5)    // buffered with capacity 5

// Send and receive
ch <- 42       // send
val := <-ch    // receive

// Directional channels
func send(ch chan<- int)   { ch <- 1 }  // send-only
func recv(ch <-chan int)   { <-ch }     // receive-only

// Close a channel
close(ch)

// Range over channel
for val := range ch {
    fmt.Println(val)
}

// Check if channel is closed
val, ok := <-ch  // ok is false if closed and empty

// Nil channel blocks forever
var ch chan int  // nil
// <-ch blocks forever
// ch <- 1 blocks forever
\`\`\``,
  exercises: [
    {
      id: 'go-ch-1',
      title: 'Create a Channel',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Create an unbuffered channel and send/receive a value.',
      skeleton: `package main

import "fmt"

func main() {
    ch := __BLANK__(chan string)

    go func() {
        ch <- "hello"
    }()

    msg := <-ch
    fmt.Println(msg)
}`,
      solution: `package main

import "fmt"

func main() {
    ch := make(chan string)

    go func() {
        ch <- "hello"
    }()

    msg := <-ch
    fmt.Println(msg)
}`,
      hints: [
        'Use make to create a channel.',
        'make(chan string) creates an unbuffered string channel.',
        'Unbuffered channels block until both sender and receiver are ready.',
      ],
      concepts: ['make channel', 'unbuffered channel'],
    },
    {
      id: 'go-ch-2',
      title: 'Buffered Channel',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Create a buffered channel with a specific capacity.',
      skeleton: `package main

import "fmt"

func main() {
    ch := make(chan int, __BLANK__)

    ch <- 1
    ch <- 2
    ch <- 3

    fmt.Println(<-ch)
    fmt.Println(<-ch)
    fmt.Println(<-ch)
}`,
      solution: `package main

import "fmt"

func main() {
    ch := make(chan int, 3)

    ch <- 1
    ch <- 2
    ch <- 3

    fmt.Println(<-ch)
    fmt.Println(<-ch)
    fmt.Println(<-ch)
}`,
      hints: [
        'Buffered channels accept sends without blocking up to capacity.',
        'We need capacity 3 to hold three values.',
        'make(chan int, 3) creates a buffered channel.',
      ],
      concepts: ['buffered channel', 'channel capacity'],
    },
    {
      id: 'go-ch-3',
      title: 'Channel Direction',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use directional channel types for send-only and receive-only.',
      skeleton: `package main

import "fmt"

func producer(ch __BLANK__ int) {
    for i := 0; i < 5; i++ {
        ch <- i
    }
    close(ch)
}

func consumer(ch __BLANK__ int) {
    for val := range ch {
        fmt.Println(val)
    }
}

func main() {
    ch := make(chan int)
    go producer(ch)
    consumer(ch)
}`,
      solution: `package main

import "fmt"

func producer(ch chan<- int) {
    for i := 0; i < 5; i++ {
        ch <- i
    }
    close(ch)
}

func consumer(ch <-chan int) {
    for val := range ch {
        fmt.Println(val)
    }
}

func main() {
    ch := make(chan int)
    go producer(ch)
    consumer(ch)
}`,
      hints: [
        'chan<- int is a send-only channel.',
        '<-chan int is a receive-only channel.',
        'The arrow direction indicates allowed operation.',
      ],
      concepts: ['directional channels', 'chan<-', '<-chan'],
    },
    {
      id: 'go-ch-4',
      title: 'Close and Range',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Close a channel and range over its values.',
      skeleton: `package main

import "fmt"

func main() {
    ch := make(chan int, 5)
    for i := 1; i <= 5; i++ {
        ch <- i
    }
    __BLANK__(ch)

    for val := __BLANK__ ch {
        fmt.Println(val)
    }
}`,
      solution: `package main

import "fmt"

func main() {
    ch := make(chan int, 5)
    for i := 1; i <= 5; i++ {
        ch <- i
    }
    close(ch)

    for val := range ch {
        fmt.Println(val)
    }
}`,
      hints: [
        'close(ch) signals no more values will be sent.',
        'range over a channel reads until it is closed.',
        'Without close, range would block forever.',
      ],
      concepts: ['close channel', 'range channel'],
    },
    {
      id: 'go-ch-5',
      title: 'Comma-OK Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use the comma-ok pattern to detect a closed channel.',
      skeleton: `package main

import "fmt"

func main() {
    ch := make(chan int, 2)
    ch <- 10
    close(ch)

    val, __BLANK__ := <-ch
    fmt.Println(val, ok)

    val, __BLANK__ = <-ch
    fmt.Println(val, ok)
}`,
      solution: `package main

import "fmt"

func main() {
    ch := make(chan int, 2)
    ch <- 10
    close(ch)

    val, ok := <-ch
    fmt.Println(val, ok)

    val, ok = <-ch
    fmt.Println(val, ok)
}`,
      hints: [
        'The second value from a receive tells if the channel is open.',
        'ok is true if the value was sent, false if channel is closed.',
        'A closed empty channel returns the zero value and false.',
      ],
      concepts: ['comma-ok', 'channel closed detection'],
    },
    {
      id: 'go-ch-6',
      title: 'Channel Length and Capacity',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Query the current length and capacity of a buffered channel.',
      skeleton: `package main

import "fmt"

func main() {
    ch := make(chan int, 5)
    ch <- 1
    ch <- 2
    ch <- 3

    fmt.Println("length:", __BLANK__(ch))
    fmt.Println("capacity:", __BLANK__(ch))
}`,
      solution: `package main

import "fmt"

func main() {
    ch := make(chan int, 5)
    ch <- 1
    ch <- 2
    ch <- 3

    fmt.Println("length:", len(ch))
    fmt.Println("capacity:", cap(ch))
}`,
      hints: [
        'len(ch) returns the number of elements queued in the channel.',
        'cap(ch) returns the channel buffer capacity.',
        'These work the same as with slices.',
      ],
      concepts: ['len channel', 'cap channel', 'buffered channel'],
    },
    {
      id: 'go-ch-7',
      title: 'Generator Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a generator function that returns a channel of values.',
      skeleton: `package main

import "fmt"

func fibonacci(n int) <-chan int {
    // Return a channel that produces n Fibonacci numbers
}

func main() {
    for val := range fibonacci(8) {
        fmt.Print(val, " ")
    }
    fmt.Println()
}`,
      solution: `package main

import "fmt"

func fibonacci(n int) <-chan int {
    ch := make(chan int)
    go func() {
        a, b := 0, 1
        for i := 0; i < n; i++ {
            ch <- a
            a, b = b, a+b
        }
        close(ch)
    }()
    return ch
}

func main() {
    for val := range fibonacci(8) {
        fmt.Print(val, " ")
    }
    fmt.Println()
}`,
      hints: [
        'Create a channel and launch a goroutine to produce values.',
        'Close the channel when all values are sent.',
        'Return a receive-only channel.',
      ],
      concepts: ['generator pattern', 'channel producer'],
    },
    {
      id: 'go-ch-8',
      title: 'Channel Synchronization',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use an unbuffered channel as a synchronization signal.',
      skeleton: `package main

import "fmt"

func worker(done chan bool) {
    // Do work and signal completion
}

func main() {
    done := make(chan bool)
    go worker(done)
    // Wait for worker to finish
    fmt.Println("worker finished")
}`,
      solution: `package main

import "fmt"

func worker(done chan bool) {
    fmt.Println("working...")
    done <- true
}

func main() {
    done := make(chan bool)
    go worker(done)
    <-done
    fmt.Println("worker finished")
}`,
      hints: [
        'An unbuffered channel blocks until both sides are ready.',
        'Send true on done when work is complete.',
        'Receive from done to wait for the signal.',
      ],
      concepts: ['channel synchronization', 'signaling'],
    },
    {
      id: 'go-ch-9',
      title: 'Pipeline Stage',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Write a pipeline stage that doubles values from an input channel.',
      skeleton: `package main

import "fmt"

func double(in <-chan int) <-chan int {
    // Read from in, double each value, send to output channel
}

func main() {
    input := make(chan int, 3)
    input <- 1
    input <- 2
    input <- 3
    close(input)

    for val := range double(input) {
        fmt.Println(val)
    }
}`,
      solution: `package main

import "fmt"

func double(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for val := range in {
            out <- val * 2
        }
        close(out)
    }()
    return out
}

func main() {
    input := make(chan int, 3)
    input <- 1
    input <- 2
    input <- 3
    close(input)

    for val := range double(input) {
        fmt.Println(val)
    }
}`,
      hints: [
        'Create an output channel and process in a goroutine.',
        'Range over the input channel to read all values.',
        'Close the output channel when input is exhausted.',
      ],
      concepts: ['pipeline pattern', 'channel chaining'],
    },
    {
      id: 'go-ch-10',
      title: 'Fan-In Merge',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Merge multiple channels into a single channel.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func merge(channels ...<-chan int) <-chan int {
    // Merge all input channels into one output channel
}

func gen(nums ...int) <-chan int {
    ch := make(chan int)
    go func() {
        for _, n := range nums {
            ch <- n
        }
        close(ch)
    }()
    return ch
}

func main() {
    ch1 := gen(1, 2, 3)
    ch2 := gen(4, 5, 6)

    for val := range merge(ch1, ch2) {
        fmt.Println(val)
    }
}`,
      solution: `package main

import (
    "fmt"
    "sync"
)

func merge(channels ...<-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup

    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for val := range c {
                out <- val
            }
        }(ch)
    }

    go func() {
        wg.Wait()
        close(out)
    }()

    return out
}

func gen(nums ...int) <-chan int {
    ch := make(chan int)
    go func() {
        for _, n := range nums {
            ch <- n
        }
        close(ch)
    }()
    return ch
}

func main() {
    ch1 := gen(1, 2, 3)
    ch2 := gen(4, 5, 6)

    for val := range merge(ch1, ch2) {
        fmt.Println(val)
    }
}`,
      hints: [
        'Launch a goroutine per input channel to forward values.',
        'Use a WaitGroup to know when all inputs are done.',
        'Close the output channel after all goroutines complete.',
      ],
      concepts: ['fan-in', 'channel merge', 'WaitGroup'],
    },
    {
      id: 'go-ch-11',
      title: 'Semaphore Channel',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use a buffered channel as a semaphore to limit concurrency.',
      skeleton: `package main

import (
    "fmt"
    "sync"
    "time"
)

func process(id int, sem chan struct{}, wg *sync.WaitGroup) {
    // Acquire semaphore, do work, release semaphore
}

func main() {
    // Limit to 3 concurrent operations
    sem := make(chan struct{}, 3)
    var wg sync.WaitGroup

    for i := 0; i < 10; i++ {
        wg.Add(1)
        go process(i, sem, &wg)
    }
    wg.Wait()
    fmt.Println("all done")
}`,
      solution: `package main

import (
    "fmt"
    "sync"
    "time"
)

func process(id int, sem chan struct{}, wg *sync.WaitGroup) {
    defer wg.Done()
    sem <- struct{}{}
    defer func() { <-sem }()

    fmt.Printf("processing %d\\n", id)
    time.Sleep(50 * time.Millisecond)
}

func main() {
    sem := make(chan struct{}, 3)
    var wg sync.WaitGroup

    for i := 0; i < 10; i++ {
        wg.Add(1)
        go process(i, sem, &wg)
    }
    wg.Wait()
    fmt.Println("all done")
}`,
      hints: [
        'Send to the semaphore channel to acquire a slot.',
        'Receive from it to release the slot.',
        'Buffer size limits the number of concurrent operations.',
      ],
      concepts: ['semaphore', 'bounded concurrency', 'channel pattern'],
    },
    {
      id: 'go-ch-12',
      title: 'Channel of Channels',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Use a channel of channels for request-response communication.',
      skeleton: `package main

import "fmt"

type Request struct {
    Value    int
    Response chan int
}

func server(requests <-chan Request) {
    // Read requests, square the value, send back on Response channel
}

func main() {
    requests := make(chan Request)
    go server(requests)

    // Send a request and get the response
}`,
      solution: `package main

import "fmt"

type Request struct {
    Value    int
    Response chan int
}

func server(requests <-chan Request) {
    for req := range requests {
        req.Response <- req.Value * req.Value
    }
}

func main() {
    requests := make(chan Request)
    go server(requests)

    resp := make(chan int)
    requests <- Request{Value: 7, Response: resp}
    fmt.Println(<-resp)

    requests <- Request{Value: 12, Response: resp}
    fmt.Println(<-resp)

    close(requests)
}`,
      hints: [
        'Each request carries its own response channel.',
        'The server reads requests and sends responses back.',
        'This enables request-response patterns over channels.',
      ],
      concepts: ['channel of channels', 'request-response pattern'],
    },
    {
      id: 'go-ch-13',
      title: 'Predict Unbuffered',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the output of unbuffered channel communication.',
      skeleton: `package main

import "fmt"

func main() {
    ch := make(chan int)

    go func() {
        ch <- 42
    }()

    val := <-ch
    fmt.Println(val)
}`,
      solution: `42`,
      hints: [
        'The goroutine sends 42 on the channel.',
        'main receives 42 from the channel.',
        'Unbuffered channels synchronize sender and receiver.',
      ],
      concepts: ['unbuffered channel', 'synchronization'],
    },
    {
      id: 'go-ch-14',
      title: 'Predict Buffered Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict the order of values from a buffered channel.',
      skeleton: `package main

import "fmt"

func main() {
    ch := make(chan string, 3)
    ch <- "first"
    ch <- "second"
    ch <- "third"

    fmt.Println(<-ch)
    fmt.Println(<-ch)
    fmt.Println(<-ch)
}`,
      solution: `first
second
third`,
      hints: [
        'Channels are FIFO -- first in, first out.',
        'Values come out in the order they were sent.',
        'Buffered channels allow sends without a receiver.',
      ],
      concepts: ['FIFO ordering', 'buffered channel'],
    },
    {
      id: 'go-ch-15',
      title: 'Predict Closed Channel',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict what happens when receiving from a closed channel.',
      skeleton: `package main

import "fmt"

func main() {
    ch := make(chan int, 2)
    ch <- 10
    ch <- 20
    close(ch)

    fmt.Println(<-ch)
    fmt.Println(<-ch)
    fmt.Println(<-ch)
}`,
      solution: `10
20
0`,
      hints: [
        'First two receives get the buffered values.',
        'Third receive from a closed empty channel returns zero value.',
        'The zero value for int is 0.',
      ],
      concepts: ['closed channel', 'zero value', 'channel drain'],
    },
    {
      id: 'go-ch-16',
      title: 'Fix Deadlock',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the deadlock caused by sending on an unbuffered channel in main.',
      skeleton: `package main

import "fmt"

func main() {
    ch := make(chan int)
    ch <- 42 // deadlock: no receiver
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
        'Since main is the only goroutine, it deadlocks.',
        'Use a buffered channel with capacity 1.',
      ],
      concepts: ['deadlock', 'unbuffered channel', 'buffered channel'],
    },
    {
      id: 'go-ch-17',
      title: 'Fix Send on Closed',
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
    ch <- 3 // panic: send on closed channel

    for val := range ch {
        fmt.Println(val)
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

    for val := range ch {
        fmt.Println(val)
    }
}`,
      hints: [
        'Never send on a closed channel -- it panics.',
        'Send all values before closing the channel.',
        'Close should be the last operation by the sender.',
      ],
      concepts: ['send on closed', 'channel close timing'],
    },
    {
      id: 'go-ch-18',
      title: 'Fix Missing Close',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the deadlock caused by a missing close on a channel.',
      skeleton: `package main

import "fmt"

func produce(ch chan<- int) {
    for i := 0; i < 5; i++ {
        ch <- i
    }
    // Missing close -- range in main will block forever
}

func main() {
    ch := make(chan int)
    go produce(ch)

    for val := range ch {
        fmt.Println(val)
    }
    fmt.Println("done")
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

    for val := range ch {
        fmt.Println(val)
    }
    fmt.Println("done")
}`,
      hints: [
        'range over a channel blocks until the channel is closed.',
        'The producer must close the channel when done.',
        'Add close(ch) after the loop in produce.',
      ],
      concepts: ['channel close', 'range deadlock'],
    },
    {
      id: 'go-ch-19',
      title: 'Refactor Callback to Channel',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor a callback-based API to use channels.',
      skeleton: `package main

import "fmt"

func processItems(items []int, callback func(int)) {
    for _, item := range items {
        callback(item * 2)
    }
}

func main() {
    items := []int{1, 2, 3, 4, 5}
    processItems(items, func(result int) {
        fmt.Println(result)
    })
}`,
      solution: `package main

import "fmt"

func processItems(items []int) <-chan int {
    ch := make(chan int)
    go func() {
        for _, item := range items {
            ch <- item * 2
        }
        close(ch)
    }()
    return ch
}

func main() {
    items := []int{1, 2, 3, 4, 5}
    for result := range processItems(items) {
        fmt.Println(result)
    }
}`,
      hints: [
        'Replace the callback with a returned channel.',
        'Process items in a goroutine and send results on the channel.',
        'Close the channel when all items are processed.',
      ],
      concepts: ['channel pattern', 'callback replacement', 'generator'],
    },
    {
      id: 'go-ch-20',
      title: 'Refactor Shared Slice to Channel',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor shared mutable state to channel-based communication.',
      skeleton: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var mu sync.Mutex
    results := []int{}
    var wg sync.WaitGroup

    for i := 1; i <= 5; i++ {
        wg.Add(1)
        go func(n int) {
            defer wg.Done()
            mu.Lock()
            results = append(results, n*n)
            mu.Unlock()
        }(i)
    }

    wg.Wait()
    fmt.Println(results)
}`,
      solution: `package main

import "fmt"

func main() {
    ch := make(chan int, 5)

    for i := 1; i <= 5; i++ {
        go func(n int) {
            ch <- n * n
        }(i)
    }

    results := make([]int, 0, 5)
    for i := 0; i < 5; i++ {
        results = append(results, <-ch)
    }
    fmt.Println(results)
}`,
      hints: [
        'Replace mutex-protected slice with a channel.',
        'Each goroutine sends its result on the channel.',
        'Main collects results by receiving from the channel.',
      ],
      concepts: ['share by communicating', 'channel vs mutex'],
    },
  ],
};
