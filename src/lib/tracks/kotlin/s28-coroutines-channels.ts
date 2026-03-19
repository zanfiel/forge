import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-co-chan',
  title: '28. Channels',
  explanation: `## Channels in Kotlin

Channels provide a way to transfer a stream of values between coroutines. They are similar to BlockingQueue but use suspending send and receive operations instead of blocking ones.

### Basic Channel

\`\`\`kotlin
val channel = Channel<Int>()

launch { channel.send(42) }
println(channel.receive()) // 42
\`\`\`

### produce Builder

\`\`\`kotlin
fun CoroutineScope.produceNumbers(): ReceiveChannel<Int> = produce {
    for (i in 1..5) {
        send(i)
        delay(100)
    }
}
\`\`\`

### consumeEach

\`\`\`kotlin
val channel = produce { for (i in 1..5) send(i) }
channel.consumeEach { println(it) }
\`\`\`

### Fan-Out (multiple receivers)

\`\`\`kotlin
val channel = produce { repeat(10) { send(it) } }
repeat(3) { workerId ->
    launch { for (msg in channel) println("Worker \$workerId got \$msg") }
}
\`\`\`

### Fan-In (multiple senders)

\`\`\`kotlin
val channel = Channel<String>()
launch { repeat(3) { channel.send("A\$it") } }
launch { repeat(3) { channel.send("B\$it") } }
repeat(6) { println(channel.receive()) }
\`\`\``,
  exercises: [
    {
      id: 'kt-co-chan-1',
      title: 'Create a Basic Channel',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Create a channel and send/receive a value.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = ___<Int>()
    launch {
        channel.send(42)
    }
    println(channel.receive())
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>()
    launch {
        channel.send(42)
    }
    println(channel.receive())
}`,
      hints: [
        'Channel<Int>() creates a new rendezvous channel.',
        'send() suspends until a receiver is ready.',
        'receive() suspends until a value is available.',
      ],
      concepts: ['Channel', 'send', 'receive'],
    },
    {
      id: 'kt-co-chan-2',
      title: 'Close a Channel',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Close a channel after sending all values.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>()
    launch {
        for (i in 1..5) channel.send(i)
        channel.___()
    }
    for (value in channel) {
        println(value)
    }
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>()
    launch {
        for (i in 1..5) channel.send(i)
        channel.close()
    }
    for (value in channel) {
        println(value)
    }
}`,
      hints: [
        'close() signals that no more values will be sent.',
        'The for loop on a channel iterates until it is closed.',
        'Without close(), the receiver would suspend forever waiting.',
      ],
      concepts: ['close', 'channel-iteration'],
    },
    {
      id: 'kt-co-chan-3',
      title: 'Produce Builder',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use produce to create a channel that auto-closes.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun CoroutineScope.numbers() = ___ {
    for (i in 1..5) {
        send(i)
    }
}

fun main() = runBlocking {
    val ch = numbers()
    ch.consumeEach { println(it) }
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun CoroutineScope.numbers() = produce {
    for (i in 1..5) {
        send(i)
    }
}

fun main() = runBlocking {
    val ch = numbers()
    ch.consumeEach { println(it) }
}`,
      hints: [
        'produce creates a coroutine that sends values to a channel.',
        'The channel is automatically closed when the produce block completes.',
        'produce returns a ReceiveChannel.',
      ],
      concepts: ['produce', 'ReceiveChannel'],
    },
    {
      id: 'kt-co-chan-4',
      title: 'consumeEach',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Use consumeEach to process all channel values.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = produce {
        send("Hello")
        send("World")
    }
    channel.___ { println(it) }
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = produce {
        send("Hello")
        send("World")
    }
    channel.consumeEach { println(it) }
}`,
      hints: [
        'consumeEach iterates over all values and consumes the channel.',
        'It is a terminal operation that closes the channel when done.',
        'Similar to forEach but designed for channels.',
      ],
      concepts: ['consumeEach', 'terminal-operation'],
    },
    {
      id: 'kt-co-chan-5',
      title: 'Buffered Channel',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Create a buffered channel with capacity 3.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>(___)
    launch {
        for (i in 1..5) {
            println("Sending \${i}")
            channel.send(i)
        }
        channel.close()
    }
    delay(500)
    for (v in channel) println("Received \${v}")
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>(3)
    launch {
        for (i in 1..5) {
            println("Sending \${i}")
            channel.send(i)
        }
        channel.close()
    }
    delay(500)
    for (v in channel) println("Received \${v}")
}`,
      hints: [
        'Pass the buffer size as a parameter to Channel().',
        'A buffered channel can hold values without a receiver being ready.',
        'The sender suspends only when the buffer is full.',
      ],
      concepts: ['buffered-channel', 'capacity'],
    },
    {
      id: 'kt-co-chan-6',
      title: 'Channel with Select',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Use select to receive from the first available channel.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*
import kotlinx.coroutines.selects.*

fun main() = runBlocking {
    val ch1 = produce { delay(100); send("slow") }
    val ch2 = produce { delay(50); send("fast") }
    
    val result = ___ {
        ch1.onReceive { it }
        ch2.onReceive { it }
    }
    println(result)
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*
import kotlinx.coroutines.selects.*

fun main() = runBlocking {
    val ch1 = produce { delay(100); send("slow") }
    val ch2 = produce { delay(50); send("fast") }
    
    val result = select {
        ch1.onReceive { it }
        ch2.onReceive { it }
    }
    println(result)
}`,
      hints: [
        'select allows waiting on multiple suspending operations.',
        'It completes with the first available result.',
        'onReceive registers a channel for selection.',
      ],
      concepts: ['select', 'onReceive'],
    },
    {
      id: 'kt-co-chan-7',
      title: 'Write a Fan-Out Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a fan-out pattern with multiple worker coroutines consuming from one channel.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

// Write a function called fanOut that:
// 1. Takes a CoroutineScope receiver
// 2. Creates a produce channel sending numbers 1..10
// 3. Launches 3 worker coroutines
// 4. Each worker reads from the channel and prints "Worker <id>: <value>"
// 5. Uses for-in loop to read from the channel`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun CoroutineScope.fanOut() {
    val channel = produce {
        for (i in 1..10) send(i)
    }
    repeat(3) { workerId ->
        launch {
            for (value in channel) {
                println("Worker \${workerId}: \${value}")
            }
        }
    }
}`,
      hints: [
        'Use produce to create the source channel.',
        'Launch multiple coroutines that all read from the same channel.',
        'Each value is delivered to exactly one worker.',
      ],
      concepts: ['fan-out', 'produce', 'worker-pattern'],
    },
    {
      id: 'kt-co-chan-8',
      title: 'Write a Fan-In Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a fan-in pattern with multiple producers sending to one channel.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

// Write a function called fanIn that:
// 1. Takes a CoroutineScope receiver
// 2. Creates a Channel<String>()
// 3. Launches 3 producer coroutines
// 4. Each producer sends "Producer <id>: <i>" for i in 1..3
// 5. Launches a consumer that receives 9 total messages and prints them
// 6. Each producer closes its end after sending (but not the channel itself)`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun CoroutineScope.fanIn() {
    val channel = Channel<String>()
    repeat(3) { producerId ->
        launch {
            for (i in 1..3) {
                channel.send("Producer \${producerId}: \${i}")
            }
        }
    }
    launch {
        repeat(9) {
            println(channel.receive())
        }
        channel.close()
    }
}`,
      hints: [
        'Multiple coroutines can send to the same channel.',
        'The consumer knows to expect exactly 9 messages (3 producers x 3 each).',
        'Close the channel after all messages are received.',
      ],
      concepts: ['fan-in', 'Channel', 'multiple-producers'],
    },
    {
      id: 'kt-co-chan-9',
      title: 'Write a Pipeline',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a channel pipeline that generates, squares, and filters numbers.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

// Write three functions on CoroutineScope:
// 1. generateNumbers() - produce channel sending 1..10
// 2. square(input: ReceiveChannel<Int>) - produce channel that reads from input and sends value * value
// 3. filterEven(input: ReceiveChannel<Int>) - produce channel that reads from input and sends only even values`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun CoroutineScope.generateNumbers() = produce {
    for (i in 1..10) send(i)
}

fun CoroutineScope.square(input: ReceiveChannel<Int>) = produce {
    for (value in input) send(value * value)
}

fun CoroutineScope.filterEven(input: ReceiveChannel<Int>) = produce {
    for (value in input) {
        if (value % 2 == 0) send(value)
    }
}`,
      hints: [
        'Each stage is a produce block that reads from an input channel.',
        'Use for-in loop to iterate over the input ReceiveChannel.',
        'Chain them: filterEven(square(generateNumbers())).',
      ],
      concepts: ['pipeline', 'produce', 'ReceiveChannel'],
    },
    {
      id: 'kt-co-chan-10',
      title: 'Write a Ticker Channel',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a function that creates a ticker-like channel emitting at intervals.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

// Write a function called ticker that:
// 1. Takes a CoroutineScope receiver and intervalMs: Long parameter
// 2. Returns a produce channel
// 3. In a loop (repeat 5 times), delays for intervalMs then sends the tick number (0..4)`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun CoroutineScope.ticker(intervalMs: Long) = produce {
    repeat(5) { tick ->
        delay(intervalMs)
        send(tick)
    }
}`,
      hints: [
        'Use produce to create the channel.',
        'repeat(5) loops 5 times with indices 0..4.',
        'delay before send creates a periodic emission.',
      ],
      concepts: ['produce', 'ticker', 'periodic-emission'],
    },
    {
      id: 'kt-co-chan-11',
      title: 'Write a Channel Merge',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a function that merges multiple channels into one.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

// Write a function called mergeChannels that:
// 1. Takes a CoroutineScope receiver
// 2. Takes vararg channels: ReceiveChannel<Int>
// 3. Creates a single output Channel<Int>()
// 4. For each input channel, launches a coroutine that forwards all values to output
// 5. Launches a coroutine that waits for all forwarders (use Job) then closes output
// 6. Returns the output channel`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun CoroutineScope.mergeChannels(vararg channels: ReceiveChannel<Int>): ReceiveChannel<Int> {
    val output = Channel<Int>()
    val jobs = channels.map { ch ->
        launch {
            for (value in ch) output.send(value)
        }
    }
    launch {
        jobs.forEach { it.join() }
        output.close()
    }
    return output
}`,
      hints: [
        'Launch a forwarding coroutine for each input channel.',
        'Collect all Jobs from the launch calls.',
        'After all jobs complete, close the output channel.',
      ],
      concepts: ['fan-in', 'merge', 'Job'],
    },
    {
      id: 'kt-co-chan-12',
      title: 'Write a Broadcast-like Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a function that sends each value to multiple output channels.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

// Write a function called broadcast that:
// 1. Takes a CoroutineScope receiver
// 2. Takes source: ReceiveChannel<Int> and numOutputs: Int
// 3. Creates numOutputs Channel<Int> instances
// 4. Launches a coroutine that reads from source and sends each value to ALL output channels
// 5. Closes all output channels when source is exhausted
// 6. Returns List<ReceiveChannel<Int>>`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun CoroutineScope.broadcast(source: ReceiveChannel<Int>, numOutputs: Int): List<ReceiveChannel<Int>> {
    val outputs = List(numOutputs) { Channel<Int>() }
    launch {
        for (value in source) {
            outputs.forEach { it.send(value) }
        }
        outputs.forEach { it.close() }
    }
    return outputs
}`,
      hints: [
        'Create a list of output channels.',
        'For each value from the source, send it to every output channel.',
        'Close all output channels when the source is exhausted.',
      ],
      concepts: ['broadcast', 'fan-out-duplicate', 'Channel'],
    },
    {
      id: 'kt-co-chan-13',
      title: 'Fix Channel Deadlock',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the deadlock caused by sending and receiving on the same coroutine.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>()
    channel.send(1)         // Deadlock! No one is receiving
    println(channel.receive())
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>()
    launch {
        channel.send(1)
    }
    println(channel.receive())
}`,
      hints: [
        'A rendezvous channel suspends send until someone receives.',
        'Sending and receiving on the same coroutine causes a deadlock.',
        'Move the send to a separate coroutine with launch.',
      ],
      concepts: ['deadlock', 'rendezvous-channel', 'launch'],
    },
    {
      id: 'kt-co-chan-14',
      title: 'Fix Missing Channel Close',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Fix the program that hangs because the channel is never closed.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>()
    launch {
        for (i in 1..3) {
            channel.send(i)
        }
    }
    for (value in channel) {
        println(value)
    }
    println("Done")
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>()
    launch {
        for (i in 1..3) {
            channel.send(i)
        }
        channel.close()
    }
    for (value in channel) {
        println(value)
    }
    println("Done")
}`,
      hints: [
        'The for loop waits indefinitely for more values.',
        'Call channel.close() after sending all values.',
        'close() signals that no more values will be sent.',
      ],
      concepts: ['close', 'channel-iteration', 'hanging'],
    },
    {
      id: 'kt-co-chan-15',
      title: 'Fix Conflated Channel Issue',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the channel that loses values by using an unlimited buffer.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>(Channel.CONFLATED)
    launch {
        for (i in 1..5) channel.send(i)
        channel.close()
    }
    // Only gets the last value! We want all values.
    for (v in channel) println(v)
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>(Channel.UNLIMITED)
    launch {
        for (i in 1..5) channel.send(i)
        channel.close()
    }
    for (v in channel) println(v)
}`,
      hints: [
        'Channel.CONFLATED keeps only the latest value.',
        'Use Channel.UNLIMITED or a large buffer to keep all values.',
        'UNLIMITED allows the sender to send without suspending.',
      ],
      concepts: ['CONFLATED', 'UNLIMITED', 'buffer-strategy'],
    },
    {
      id: 'kt-co-chan-16',
      title: 'Predict Channel Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output of a produce/consumeEach pattern.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val ch = produce {
        send(10)
        send(20)
        send(30)
    }
    var sum = 0
    ch.consumeEach { sum += it }
    println(sum)
}`,
      solution: `60`,
      hints: [
        'consumeEach processes all values: 10, 20, 30.',
        'sum accumulates: 0 + 10 + 20 + 30 = 60.',
        'produce auto-closes the channel when the block completes.',
      ],
      concepts: ['produce', 'consumeEach', 'accumulation'],
    },
    {
      id: 'kt-co-chan-17',
      title: 'Predict Buffered Channel',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the order of operations with a buffered channel.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>(2)
    launch {
        for (i in 1..3) {
            println("Send \${i}")
            channel.send(i)
        }
        channel.close()
    }
    delay(200)
    for (v in channel) {
        println("Recv \${v}")
    }
}`,
      solution: `Send 1
Send 2
Send 3
Recv 1
Recv 2
Recv 3`,
      hints: [
        'The buffer holds 2 elements, so Send 1 and Send 2 proceed without waiting.',
        'Send 3 may suspend briefly until the buffer has space, but the delay(200) allows all sends first.',
        'After the delay, all 3 values are received in order.',
      ],
      concepts: ['buffered-channel', 'ordering'],
    },
    {
      id: 'kt-co-chan-18',
      title: 'Predict Pipeline Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output of a simple channel pipeline.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val source = produce { for (i in 1..4) send(i) }
    val doubled = produce { for (v in source) send(v * 2) }
    doubled.consumeEach { println(it) }
}`,
      solution: `2
4
6
8`,
      hints: [
        'source produces 1, 2, 3, 4.',
        'doubled transforms each to value * 2: 2, 4, 6, 8.',
        'consumeEach prints each value.',
      ],
      concepts: ['pipeline', 'produce', 'transformation'],
    },
    {
      id: 'kt-co-chan-19',
      title: 'Refactor Shared List to Channel',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor shared mutable list to use a channel for thread-safe communication.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val results = mutableListOf<Int>()
    val jobs = (1..5).map { i ->
        launch(Dispatchers.Default) {
            delay(100)
            results.add(i * 10) // Not thread-safe!
        }
    }
    jobs.forEach { it.join() }
    println(results.sorted())
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>()
    val jobs = (1..5).map { i ->
        launch(Dispatchers.Default) {
            delay(100)
            channel.send(i * 10)
        }
    }
    val results = mutableListOf<Int>()
    launch {
        jobs.forEach { it.join() }
        channel.close()
    }
    for (value in channel) {
        results.add(value)
    }
    println(results.sorted())
}`,
      hints: [
        'Replace the shared mutable list with a channel.',
        'Send values through the channel instead of adding directly.',
        'Collect from the channel in the main coroutine.',
      ],
      concepts: ['Channel', 'thread-safety', 'refactoring'],
    },
    {
      id: 'kt-co-chan-20',
      title: 'Refactor Polling to Channel Pipeline',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Refactor a polling loop into a channel-based pipeline.',
      skeleton: `import kotlinx.coroutines.*

var counter = 0

suspend fun pollData(): Int {
    delay(50)
    return ++counter
}

fun main() = runBlocking {
    val results = mutableListOf<Int>()
    repeat(5) {
        val data = pollData()
        if (data % 2 != 0) {
            results.add(data * 10)
        }
    }
    results.forEach { println(it) }
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

var counter = 0

suspend fun pollData(): Int {
    delay(50)
    return ++counter
}

fun CoroutineScope.dataSource() = produce {
    repeat(5) { send(pollData()) }
}

fun CoroutineScope.filterOdd(input: ReceiveChannel<Int>) = produce {
    for (v in input) if (v % 2 != 0) send(v)
}

fun CoroutineScope.scale(input: ReceiveChannel<Int>) = produce {
    for (v in input) send(v * 10)
}

fun main() = runBlocking {
    val pipeline = scale(filterOdd(dataSource()))
    pipeline.consumeEach { println(it) }
}`,
      hints: [
        'Break the logic into separate pipeline stages using produce.',
        'Each stage reads from an input channel and sends to its output.',
        'Chain them together: scale(filterOdd(dataSource())).',
      ],
      concepts: ['pipeline', 'produce', 'channel-composition'],
    },
  ],
};
