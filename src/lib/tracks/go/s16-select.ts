import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'go-sel',
  title: '16. Select Statement',
  explanation: `## Select Statement in Go

The \`select\` statement lets a goroutine wait on multiple channel operations. It blocks until one case is ready, then executes that case.

\`\`\`go
select {
case msg := <-ch1:
    fmt.Println("from ch1:", msg)
case msg := <-ch2:
    fmt.Println("from ch2:", msg)
case ch3 <- 42:
    fmt.Println("sent to ch3")
default:
    fmt.Println("no channel ready")
}

// Timeout pattern
select {
case val := <-ch:
    fmt.Println(val)
case <-time.After(1 * time.Second):
    fmt.Println("timeout")
}

// Done channel pattern
done := make(chan struct{})
select {
case <-done:
    return
case val := <-work:
    process(val)
}

// Nil channel disables a case
var ch chan int // nil
select {
case <-ch: // never selected
default:
    fmt.Println("ch is nil, skipped")
}
\`\`\``,
  exercises: [
    {
      id: 'go-sel-1',
      title: 'Basic Select',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use select to receive from one of two channels.',
      skeleton: `package main

import "fmt"

func main() {
    ch1 := make(chan string, 1)
    ch2 := make(chan string, 1)

    ch1 <- "one"

    __BLANK__ {
    case msg := <-ch1:
        fmt.Println("received", msg)
    case msg := <-ch2:
        fmt.Println("received", msg)
    }
}`,
      solution: `package main

import "fmt"

func main() {
    ch1 := make(chan string, 1)
    ch2 := make(chan string, 1)

    ch1 <- "one"

    select {
    case msg := <-ch1:
        fmt.Println("received", msg)
    case msg := <-ch2:
        fmt.Println("received", msg)
    }
}`,
      hints: [
        'select waits on multiple channel operations.',
        'It executes the first case that is ready.',
        'Since ch1 has a value, that case runs.',
      ],
      concepts: ['select statement', 'channel multiplexing'],
    },
    {
      id: 'go-sel-2',
      title: 'Default Case',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use the default case for non-blocking channel operations.',
      skeleton: `package main

import "fmt"

func main() {
    ch := make(chan int)

    select {
    case val := <-ch:
        fmt.Println("received", val)
    __BLANK__:
        fmt.Println("no value ready")
    }
}`,
      solution: `package main

import "fmt"

func main() {
    ch := make(chan int)

    select {
    case val := <-ch:
        fmt.Println("received", val)
    default:
        fmt.Println("no value ready")
    }
}`,
      hints: [
        'The default case runs when no channel is ready.',
        'This makes the select non-blocking.',
        'Without default, select would block forever here.',
      ],
      concepts: ['default case', 'non-blocking select'],
    },
    {
      id: 'go-sel-3',
      title: 'Timeout with Select',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement a timeout using select and time.After.',
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
    case msg := <-ch:
        fmt.Println(msg)
    case <-time.__BLANK__(500 * time.Millisecond):
        fmt.Println("timeout")
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
    case msg := <-ch:
        fmt.Println(msg)
    case <-time.After(500 * time.Millisecond):
        fmt.Println("timeout")
    }
}`,
      hints: [
        'time.After returns a channel that fires after the duration.',
        'select picks whichever channel is ready first.',
        'Since the work takes 2s and timeout is 500ms, timeout wins.',
      ],
      concepts: ['timeout pattern', 'time.After', 'select'],
    },
    {
      id: 'go-sel-4',
      title: 'Done Channel',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use a done channel to signal cancellation.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

func worker(done __BLANK__ struct{}, results chan<- int) {
    for i := 0; ; i++ {
        select {
        case <-done:
            fmt.Println("worker stopped")
            return
        case results <- i:
            time.Sleep(50 * time.Millisecond)
        }
    }
}

func main() {
    done := make(chan struct{})
    results := make(chan int)

    go worker(done, results)

    for i := 0; i < 5; i++ {
        fmt.Println(<-results)
    }

    close(done)
    time.Sleep(100 * time.Millisecond)
}`,
      solution: `package main

import (
    "fmt"
    "time"
)

func worker(done <-chan struct{}, results chan<- int) {
    for i := 0; ; i++ {
        select {
        case <-done:
            fmt.Println("worker stopped")
            return
        case results <- i:
            time.Sleep(50 * time.Millisecond)
        }
    }
}

func main() {
    done := make(chan struct{})
    results := make(chan int)

    go worker(done, results)

    for i := 0; i < 5; i++ {
        fmt.Println(<-results)
    }

    close(done)
    time.Sleep(100 * time.Millisecond)
}`,
      hints: [
        'done is a receive-only channel: <-chan struct{}.',
        'Closing done signals all listeners to stop.',
        'struct{} uses zero memory as a signal type.',
      ],
      concepts: ['done channel', 'cancellation', 'struct{}'],
    },
    {
      id: 'go-sel-5',
      title: 'Non-Blocking Send',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Perform a non-blocking send using select with default.',
      skeleton: `package main

import "fmt"

func main() {
    ch := make(chan int, 1)
    ch <- 1 // channel is full

    __BLANK__ {
    case ch <- 2:
        fmt.Println("sent 2")
    default:
        fmt.Println("channel full, dropped")
    }

    fmt.Println(<-ch)
}`,
      solution: `package main

import "fmt"

func main() {
    ch := make(chan int, 1)
    ch <- 1 // channel is full

    select {
    case ch <- 2:
        fmt.Println("sent 2")
    default:
        fmt.Println("channel full, dropped")
    }

    fmt.Println(<-ch)
}`,
      hints: [
        'select with default makes sends non-blocking.',
        'If the channel is full, default runs instead.',
        'This prevents the goroutine from blocking.',
      ],
      concepts: ['non-blocking send', 'select default'],
    },
    {
      id: 'go-sel-6',
      title: 'Select with Timer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use time.NewTimer with select for cancellable timeouts.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

func main() {
    timer := time.__BLANK__(100 * time.Millisecond)
    ch := make(chan string, 1)
    ch <- "data"

    select {
    case msg := <-ch:
        if !timer.Stop() {
            <-timer.C
        }
        fmt.Println("got:", msg)
    case <-timer.__BLANK__:
        fmt.Println("timeout")
    }
}`,
      solution: `package main

import (
    "fmt"
    "time"
)

func main() {
    timer := time.NewTimer(100 * time.Millisecond)
    ch := make(chan string, 1)
    ch <- "data"

    select {
    case msg := <-ch:
        if !timer.Stop() {
            <-timer.C
        }
        fmt.Println("got:", msg)
    case <-timer.C:
        fmt.Println("timeout")
    }
}`,
      hints: [
        'time.NewTimer creates a timer you can stop.',
        'timer.C is the channel that receives when the timer fires.',
        'Stop the timer if you do not need the timeout.',
      ],
      concepts: ['time.NewTimer', 'timer.C', 'cancellable timeout'],
    },
    {
      id: 'go-sel-7',
      title: 'Heartbeat Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Implement a heartbeat pattern using select and time.Tick.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

func worker(done <-chan struct{}) <-chan struct{} {
    heartbeat := make(chan struct{})
    // Send heartbeats every 100ms while doing work
    // Stop when done is closed
    return heartbeat
}

func main() {
    done := make(chan struct{})
    hb := worker(done)

    // Listen for 3 heartbeats then stop
    for i := 0; i < 3; i++ {
        <-hb
        fmt.Println("heartbeat", i+1)
    }
    close(done)
}`,
      solution: `package main

import (
    "fmt"
    "time"
)

func worker(done <-chan struct{}) <-chan struct{} {
    heartbeat := make(chan struct{}, 1)
    go func() {
        defer close(heartbeat)
        tick := time.NewTicker(100 * time.Millisecond)
        defer tick.Stop()
        for {
            select {
            case <-done:
                return
            case <-tick.C:
                select {
                case heartbeat <- struct{}{}:
                default:
                }
            }
        }
    }()
    return heartbeat
}

func main() {
    done := make(chan struct{})
    hb := worker(done)

    for i := 0; i < 3; i++ {
        <-hb
        fmt.Println("heartbeat", i+1)
    }
    close(done)
}`,
      hints: [
        'Use time.NewTicker for periodic events.',
        'Use a nested select with default for non-blocking heartbeat send.',
        'Stop when done is closed.',
      ],
      concepts: ['heartbeat pattern', 'time.Ticker', 'nested select'],
    },
    {
      id: 'go-sel-8',
      title: 'Select for-loop',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Use select inside a for loop to continuously process channels.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

func main() {
    tick := time.NewTicker(100 * time.Millisecond)
    defer tick.Stop()
    done := time.After(550 * time.Millisecond)

    // Loop: print "tick" on each tick, exit on done
}`,
      solution: `package main

import (
    "fmt"
    "time"
)

func main() {
    tick := time.NewTicker(100 * time.Millisecond)
    defer tick.Stop()
    done := time.After(550 * time.Millisecond)

    for {
        select {
        case <-tick.C:
            fmt.Println("tick")
        case <-done:
            fmt.Println("done")
            return
        }
    }
}`,
      hints: [
        'Wrap select in an infinite for loop.',
        'The done channel breaks the loop.',
        'Use return to exit from main.',
      ],
      concepts: ['for-select loop', 'ticker', 'termination'],
    },
    {
      id: 'go-sel-9',
      title: 'Priority Select',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement priority channel selection where one channel is checked first.',
      skeleton: `package main

import "fmt"

func prioritySelect(high, low <-chan string) string {
    // Prefer high-priority channel over low
    // Only read from low if high is empty
}

func main() {
    high := make(chan string, 1)
    low := make(chan string, 1)

    high <- "urgent"
    low <- "normal"

    fmt.Println(prioritySelect(high, low))
    fmt.Println(prioritySelect(high, low))
}`,
      solution: `package main

import "fmt"

func prioritySelect(high, low <-chan string) string {
    select {
    case msg := <-high:
        return msg
    default:
    }

    select {
    case msg := <-high:
        return msg
    case msg := <-low:
        return msg
    }
}

func main() {
    high := make(chan string, 1)
    low := make(chan string, 1)

    high <- "urgent"
    low <- "normal"

    fmt.Println(prioritySelect(high, low))
    fmt.Println(prioritySelect(high, low))
}`,
      hints: [
        'First try to read from high with a default fallback.',
        'If high is empty, use a regular select for both.',
        'This gives priority to the high channel.',
      ],
      concepts: ['priority select', 'two-phase select', 'channel priority'],
    },
    {
      id: 'go-sel-10',
      title: 'Quit Channel',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Use a quit channel to cleanly stop a goroutine.',
      skeleton: `package main

import "fmt"

func counter(quit <-chan struct{}) <-chan int {
    ch := make(chan int)
    // Count up from 0, stop when quit is closed
    return ch
}

func main() {
    quit := make(chan struct{})
    c := counter(quit)

    for i := 0; i < 5; i++ {
        fmt.Println(<-c)
    }
    close(quit)
}`,
      solution: `package main

import "fmt"

func counter(quit <-chan struct{}) <-chan int {
    ch := make(chan int)
    go func() {
        defer close(ch)
        i := 0
        for {
            select {
            case <-quit:
                return
            case ch <- i:
                i++
            }
        }
    }()
    return ch
}

func main() {
    quit := make(chan struct{})
    c := counter(quit)

    for i := 0; i < 5; i++ {
        fmt.Println(<-c)
    }
    close(quit)
}`,
      hints: [
        'Use select to check quit alongside sending.',
        'Close the output channel when quit fires.',
        'This ensures no goroutine leak.',
      ],
      concepts: ['quit channel', 'clean shutdown', 'goroutine lifecycle'],
    },
    {
      id: 'go-sel-11',
      title: 'Multiplex Channels',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Multiplex messages from multiple channels with labels.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

type Message struct {
    Source string
    Text   string
}

func multiplex(sources map[string]<-chan string, done <-chan struct{}) <-chan Message {
    // Read from all sources, label each message, send to output
}

func main() {
    ch1 := make(chan string, 2)
    ch2 := make(chan string, 2)
    ch1 <- "hello"
    ch2 <- "world"
    close(ch1)
    close(ch2)

    done := make(chan struct{})
    sources := map[string]<-chan string{"src1": ch1, "src2": ch2}
    for msg := range multiplex(sources, done) {
        fmt.Printf("[%s] %s\\n", msg.Source, msg.Text)
    }
}`,
      solution: `package main

import (
    "fmt"
    "sync"
    "time"
)

type Message struct {
    Source string
    Text   string
}

func multiplex(sources map[string]<-chan string, done <-chan struct{}) <-chan Message {
    out := make(chan Message)
    var wg sync.WaitGroup

    for name, ch := range sources {
        wg.Add(1)
        go func(n string, c <-chan string) {
            defer wg.Done()
            for {
                select {
                case <-done:
                    return
                case msg, ok := <-c:
                    if !ok {
                        return
                    }
                    out <- Message{Source: n, Text: msg}
                }
            }
        }(name, ch)
    }

    go func() {
        wg.Wait()
        close(out)
    }()

    return out
}

func main() {
    ch1 := make(chan string, 2)
    ch2 := make(chan string, 2)
    ch1 <- "hello"
    ch2 <- "world"
    close(ch1)
    close(ch2)

    done := make(chan struct{})
    sources := map[string]<-chan string{"src1": ch1, "src2": ch2}
    for msg := range multiplex(sources, done) {
        fmt.Printf("[%s] %s\\n", msg.Source, msg.Text)
    }
}`,
      hints: [
        'Launch a goroutine per source to forward messages.',
        'Label each message with the source name.',
        'Use WaitGroup to close output when all sources are done.',
      ],
      concepts: ['channel multiplexing', 'select', 'labeled messages'],
    },
    {
      id: 'go-sel-12',
      title: 'Or-Channel Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Implement the or-channel pattern to combine multiple done channels.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

func or(channels ...<-chan struct{}) <-chan struct{} {
    // Return a channel that closes when ANY input channel closes
}

func after(d time.Duration) <-chan struct{} {
    ch := make(chan struct{})
    go func() {
        time.Sleep(d)
        close(ch)
    }()
    return ch
}

func main() {
    start := time.Now()
    <-or(
        after(2*time.Hour),
        after(5*time.Minute),
        after(100*time.Millisecond),
    )
    fmt.Printf("done after %v\\n", time.Since(start).Round(time.Millisecond))
}`,
      solution: `package main

import (
    "fmt"
    "time"
)

func or(channels ...<-chan struct{}) <-chan struct{} {
    switch len(channels) {
    case 0:
        return nil
    case 1:
        return channels[0]
    }

    orDone := make(chan struct{})
    go func() {
        defer close(orDone)
        switch len(channels) {
        case 2:
            select {
            case <-channels[0]:
            case <-channels[1]:
            }
        default:
            select {
            case <-channels[0]:
            case <-channels[1]:
            case <-channels[2]:
            case <-or(append(channels[3:], orDone)...):
            }
        }
    }()
    return orDone
}

func after(d time.Duration) <-chan struct{} {
    ch := make(chan struct{})
    go func() {
        time.Sleep(d)
        close(ch)
    }()
    return ch
}

func main() {
    start := time.Now()
    <-or(
        after(2*time.Hour),
        after(5*time.Minute),
        after(100*time.Millisecond),
    )
    fmt.Printf("done after %v\\n", time.Since(start).Round(time.Millisecond))
}`,
      hints: [
        'Recursively combine channels using select.',
        'Base cases: 0 channels returns nil, 1 channel returns itself.',
        'The resulting channel closes when any input closes.',
      ],
      concepts: ['or-channel', 'recursive select', 'done aggregation'],
    },
    {
      id: 'go-sel-13',
      title: 'Predict Select Default',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Predict the output when select has an empty channel and default.',
      skeleton: `package main

import "fmt"

func main() {
    ch := make(chan int)

    select {
    case v := <-ch:
        fmt.Println("received", v)
    default:
        fmt.Println("default")
    }
}`,
      solution: `default`,
      hints: [
        'ch is unbuffered and empty with no sender.',
        'The channel case would block.',
        'default runs immediately when no case is ready.',
      ],
      concepts: ['default case', 'non-blocking'],
    },
    {
      id: 'go-sel-14',
      title: 'Predict Select Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict what happens when multiple select cases are ready.',
      skeleton: `package main

import "fmt"

func main() {
    ch1 := make(chan int, 1)
    ch2 := make(chan int, 1)
    ch1 <- 1
    ch2 <- 2

    select {
    case v := <-ch1:
        fmt.Println(v)
    case v := <-ch2:
        fmt.Println(v)
    }
}`,
      solution: `1`,
      hints: [
        'When multiple cases are ready, select picks one randomly.',
        'The output could be 1 or 2.',
        'Both channels have values, so either case could run.',
      ],
      concepts: ['random selection', 'multiple ready cases'],
    },
    {
      id: 'go-sel-15',
      title: 'Predict Nil Channel',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Predict what happens with a nil channel in select.',
      skeleton: `package main

import "fmt"

func main() {
    var ch1 chan int // nil
    ch2 := make(chan int, 1)
    ch2 <- 42

    select {
    case v := <-ch1:
        fmt.Println("ch1:", v)
    case v := <-ch2:
        fmt.Println("ch2:", v)
    }
}`,
      solution: `ch2: 42`,
      hints: [
        'A nil channel in select is never ready.',
        'The ch1 case is effectively disabled.',
        'Only the ch2 case can be selected.',
      ],
      concepts: ['nil channel', 'disabled case', 'select'],
    },
    {
      id: 'go-sel-16',
      title: 'Fix Select Deadlock',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'go',
      goal: 'Fix the deadlock in a select with no ready channels.',
      skeleton: `package main

import "fmt"

func main() {
    ch1 := make(chan int)
    ch2 := make(chan int)

    select {
    case v := <-ch1:
        fmt.Println("ch1:", v)
    case v := <-ch2:
        fmt.Println("ch2:", v)
    }
    // deadlock: no goroutines sending to either channel
}`,
      solution: `package main

import "fmt"

func main() {
    ch1 := make(chan int)
    ch2 := make(chan int)

    select {
    case v := <-ch1:
        fmt.Println("ch1:", v)
    case v := <-ch2:
        fmt.Println("ch2:", v)
    default:
        fmt.Println("no data available")
    }
}`,
      hints: [
        'Without a default case, select blocks forever.',
        'Add a default case for a non-blocking fallback.',
        'default runs when no channel operations are ready.',
      ],
      concepts: ['select deadlock', 'default case'],
    },
    {
      id: 'go-sel-17',
      title: 'Fix Ticker Leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Fix the ticker that is never stopped, causing a resource leak.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

func monitor(done <-chan struct{}) {
    ticker := time.NewTicker(100 * time.Millisecond)
    // Bug: ticker is never stopped

    for {
        select {
        case <-done:
            return
        case t := <-ticker.C:
            fmt.Println("tick at", t.Format("15:04:05.000"))
        }
    }
}

func main() {
    done := make(chan struct{})
    go monitor(done)
    time.Sleep(350 * time.Millisecond)
    close(done)
    time.Sleep(50 * time.Millisecond)
}`,
      solution: `package main

import (
    "fmt"
    "time"
)

func monitor(done <-chan struct{}) {
    ticker := time.NewTicker(100 * time.Millisecond)
    defer ticker.Stop()

    for {
        select {
        case <-done:
            return
        case t := <-ticker.C:
            fmt.Println("tick at", t.Format("15:04:05.000"))
        }
    }
}

func main() {
    done := make(chan struct{})
    go monitor(done)
    time.Sleep(350 * time.Millisecond)
    close(done)
    time.Sleep(50 * time.Millisecond)
}`,
      hints: [
        'Tickers must be stopped to release resources.',
        'Use defer ticker.Stop() right after creation.',
        'Forgetting to stop a ticker causes a goroutine leak.',
      ],
      concepts: ['ticker leak', 'defer Stop', 'resource cleanup'],
    },
    {
      id: 'go-sel-18',
      title: 'Fix Timeout Reset',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Fix the timeout that creates a new timer every loop iteration.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

func process(in <-chan int) {
    for {
        select {
        case val := <-in:
            fmt.Println("got:", val)
        case <-time.After(200 * time.Millisecond):
            // Bug: time.After allocates a new timer every iteration
            fmt.Println("idle timeout")
            return
        }
    }
}

func main() {
    ch := make(chan int)
    go func() {
        for i := 0; i < 3; i++ {
            ch <- i
            time.Sleep(50 * time.Millisecond)
        }
    }()
    process(ch)
}`,
      solution: `package main

import (
    "fmt"
    "time"
)

func process(in <-chan int) {
    timer := time.NewTimer(200 * time.Millisecond)
    defer timer.Stop()

    for {
        select {
        case val := <-in:
            if !timer.Stop() {
                select {
                case <-timer.C:
                default:
                }
            }
            timer.Reset(200 * time.Millisecond)
            fmt.Println("got:", val)
        case <-timer.C:
            fmt.Println("idle timeout")
            return
        }
    }
}

func main() {
    ch := make(chan int)
    go func() {
        for i := 0; i < 3; i++ {
            ch <- i
            time.Sleep(50 * time.Millisecond)
        }
    }()
    process(ch)
}`,
      hints: [
        'time.After in a loop creates garbage timers.',
        'Use time.NewTimer and Reset instead.',
        'Drain the timer channel before resetting to avoid races.',
      ],
      concepts: ['timer reuse', 'time.NewTimer', 'Reset'],
    },
    {
      id: 'go-sel-19',
      title: 'Refactor Polling to Select',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'go',
      goal: 'Refactor busy-wait polling to use select.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

func main() {
    ch := make(chan string, 1)
    go func() {
        time.Sleep(200 * time.Millisecond)
        ch <- "result"
    }()

    // Busy polling
    for {
        select {
        case msg := <-ch:
            fmt.Println(msg)
            return
        default:
        }
        time.Sleep(10 * time.Millisecond)
        fmt.Println("polling...")
    }
}`,
      solution: `package main

import (
    "fmt"
    "time"
)

func main() {
    ch := make(chan string, 1)
    go func() {
        time.Sleep(200 * time.Millisecond)
        ch <- "result"
    }()

    select {
    case msg := <-ch:
        fmt.Println(msg)
    case <-time.After(1 * time.Second):
        fmt.Println("timeout")
    }
}`,
      hints: [
        'Replace busy polling with a blocking select.',
        'Add a timeout case instead of manual polling.',
        'This is more efficient and uses zero CPU while waiting.',
      ],
      concepts: ['blocking select', 'no busy wait', 'efficiency'],
    },
    {
      id: 'go-sel-20',
      title: 'Refactor Switch to Select',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'go',
      goal: 'Refactor a sequential event handler to use concurrent select.',
      skeleton: `package main

import (
    "fmt"
    "time"
)

func main() {
    events := make(chan string, 10)
    errors := make(chan error, 10)

    go func() {
        events <- "start"
        time.Sleep(50 * time.Millisecond)
        events <- "data"
        time.Sleep(50 * time.Millisecond)
        errors <- fmt.Errorf("network error")
        close(events)
        close(errors)
    }()

    // Sequential: process all events then all errors
    for e := range events {
        fmt.Println("event:", e)
    }
    for e := range errors {
        fmt.Println("error:", e)
    }
}`,
      solution: `package main

import (
    "fmt"
    "time"
)

func main() {
    events := make(chan string, 10)
    errors := make(chan error, 10)

    go func() {
        events <- "start"
        time.Sleep(50 * time.Millisecond)
        events <- "data"
        time.Sleep(50 * time.Millisecond)
        errors <- fmt.Errorf("network error")
        close(events)
        close(errors)
    }()

    evDone := false
    erDone := false
    for !evDone || !erDone {
        select {
        case e, ok := <-events:
            if !ok {
                events = nil
                evDone = true
                continue
            }
            fmt.Println("event:", e)
        case e, ok := <-errors:
            if !ok {
                errors = nil
                erDone = true
                continue
            }
            fmt.Println("error:", e)
        }
    }
}`,
      hints: [
        'Use select to handle both channels concurrently.',
        'Set channels to nil when closed to disable those cases.',
        'Track when both channels are done to exit the loop.',
      ],
      concepts: ['concurrent event handling', 'nil channel disable', 'select'],
    },
  ],
};
