import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-co-basic',
  title: '26. Coroutines Basic',
  explanation: `## Coroutines Basic in Kotlin

Kotlin coroutines provide a way to write asynchronous, non-blocking code in a sequential style. They are lightweight threads that can be suspended and resumed without blocking the underlying thread.

### Key Concepts

**runBlocking** creates a coroutine scope that blocks the current thread:
\`\`\`kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    println("Hello from coroutine!")
}
\`\`\`

**launch** starts a new coroutine without blocking:
\`\`\`kotlin
runBlocking {
    launch {
        delay(1000L)
        println("World!")
    }
    println("Hello,")
}
// Hello,
// World!
\`\`\`

**async** starts a coroutine that returns a Deferred result:
\`\`\`kotlin
runBlocking {
    val result = async {
        delay(1000L)
        42
    }
    println("The answer is \${result.await()}")
}
\`\`\`

**suspend** functions can be paused and resumed:
\`\`\`kotlin
suspend fun fetchData(): String {
    delay(1000L)
    return "Data loaded"
}
\`\`\`

**delay** suspends the coroutine for a given time without blocking the thread:
\`\`\`kotlin
suspend fun countdown() {
    for (i in 5 downTo 1) {
        println(i)
        delay(1000L)
    }
}
\`\`\``,
  exercises: [
    {
      id: 'kt-co-basic-1',
      title: 'Basic runBlocking',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Use runBlocking to create a coroutine scope.',
      skeleton: `import kotlinx.coroutines.*

fun main() = ___ {
    println("Hello, Coroutines!")
}`,
      solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    println("Hello, Coroutines!")
}`,
      hints: [
        'runBlocking bridges the regular blocking world with the coroutine world.',
        'It creates a coroutine scope and blocks the current thread until all children complete.',
        'Use runBlocking as the entry point for coroutine code in main().',
      ],
      concepts: ['runBlocking', 'coroutine-scope'],
    },
    {
      id: 'kt-co-basic-2',
      title: 'Launch a Coroutine',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Launch a new coroutine inside runBlocking.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    ___ {
        delay(100L)
        println("Task complete")
    }
    println("Started")
}`,
      solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        delay(100L)
        println("Task complete")
    }
    println("Started")
}`,
      hints: [
        'launch starts a new coroutine concurrently.',
        'The launched coroutine runs alongside the parent.',
        'launch returns a Job, not a result value.',
      ],
      concepts: ['launch', 'coroutine-builder'],
    },
    {
      id: 'kt-co-basic-3',
      title: 'Async and Await',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Use async to compute a value and await the result.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val deferred = ___ {
        delay(100L)
        42
    }
    println("Result: \${deferred.___()}")
}`,
      solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val deferred = async {
        delay(100L)
        42
    }
    println("Result: \${deferred.await()}")
}`,
      hints: [
        'async is like launch but returns a Deferred with a result.',
        'Call await() on the Deferred to get the computed value.',
        'async is used when you need a return value from a coroutine.',
      ],
      concepts: ['async', 'await', 'Deferred'],
    },
    {
      id: 'kt-co-basic-4',
      title: 'Suspend Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Define a suspend function that can use delay.',
      skeleton: `import kotlinx.coroutines.*

___ fun loadData(): String {
    delay(500L)
    return "Data loaded"
}

fun main() = runBlocking {
    println(loadData())
}`,
      solution: `import kotlinx.coroutines.*

suspend fun loadData(): String {
    delay(500L)
    return "Data loaded"
}

fun main() = runBlocking {
    println(loadData())
}`,
      hints: [
        'The suspend modifier allows a function to call other suspending functions.',
        'suspend functions can only be called from coroutines or other suspend functions.',
        'delay is a suspend function, so loadData must also be suspend.',
      ],
      concepts: ['suspend', 'suspend-function'],
    },
    {
      id: 'kt-co-basic-5',
      title: 'Delay vs Thread.sleep',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Use delay to suspend without blocking the thread.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        ___(1000L)
        println("World!")
    }
    println("Hello,")
}`,
      solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        delay(1000L)
        println("World!")
    }
    println("Hello,")
}`,
      hints: [
        'delay suspends the coroutine, not the thread.',
        'Unlike Thread.sleep, delay allows other coroutines to run.',
        'delay takes a time in milliseconds.',
      ],
      concepts: ['delay', 'suspension'],
    },
    {
      id: 'kt-co-basic-6',
      title: 'Structured Concurrency',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use coroutineScope to create structured concurrency.',
      skeleton: `import kotlinx.coroutines.*

suspend fun doWork() = ___ {
    launch {
        delay(200L)
        println("Task 1")
    }
    launch {
        delay(100L)
        println("Task 2")
    }
}

fun main() = runBlocking {
    doWork()
    println("All done")
}`,
      solution: `import kotlinx.coroutines.*

suspend fun doWork() = coroutineScope {
    launch {
        delay(200L)
        println("Task 1")
    }
    launch {
        delay(100L)
        println("Task 2")
    }
}

fun main() = runBlocking {
    doWork()
    println("All done")
}`,
      hints: [
        'coroutineScope creates a new scope and waits for all children to complete.',
        'Unlike runBlocking, coroutineScope suspends instead of blocking.',
        'It ensures structured concurrency: the parent waits for all children.',
      ],
      concepts: ['coroutineScope', 'structured-concurrency'],
    },
    {
      id: 'kt-co-basic-7',
      title: 'Write Parallel Async Functions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a suspend function that runs two tasks in parallel and returns their sum.',
      skeleton: `import kotlinx.coroutines.*

// Write a suspend function called parallelSum that:
// 1. Uses coroutineScope
// 2. Launches two async tasks
// 3. First task delays 100ms and returns 10
// 4. Second task delays 100ms and returns 20
// 5. Returns the sum of both results`,
      solution: `import kotlinx.coroutines.*

suspend fun parallelSum(): Int = coroutineScope {
    val a = async {
        delay(100L)
        10
    }
    val b = async {
        delay(100L)
        20
    }
    a.await() + b.await()
}`,
      hints: [
        'Use coroutineScope to create a structured scope.',
        'Launch two async blocks, each returning a number.',
        'Call await() on both and return their sum.',
      ],
      concepts: ['async', 'parallel-decomposition', 'coroutineScope'],
    },
    {
      id: 'kt-co-basic-8',
      title: 'Write a Suspend Data Fetcher',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a suspend function that simulates fetching user data.',
      skeleton: `import kotlinx.coroutines.*

// Write a suspend function called fetchUser that:
// 1. Takes a userId: Int parameter
// 2. Delays for 200ms to simulate network call
// 3. Returns "User(id=<userId>)" as a String`,
      solution: `import kotlinx.coroutines.*

suspend fun fetchUser(userId: Int): String {
    delay(200L)
    return "User(id=\${userId})"
}`,
      hints: [
        'Mark the function with suspend keyword.',
        'Use delay() to simulate a network call.',
        'Use string interpolation to build the result.',
      ],
      concepts: ['suspend', 'delay', 'string-templates'],
    },
    {
      id: 'kt-co-basic-9',
      title: 'Write a Timeout Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a function that wraps a long-running task with a timeout.',
      skeleton: `import kotlinx.coroutines.*

// Write a suspend function called fetchWithTimeout that:
// 1. Uses withTimeoutOrNull with a 500ms timeout
// 2. Inside, delays for the given 'delayMs' parameter
// 3. Then returns "Success"
// 4. If timeout occurs, returns "Timeout"`,
      solution: `import kotlinx.coroutines.*

suspend fun fetchWithTimeout(delayMs: Long): String {
    val result = withTimeoutOrNull(500L) {
        delay(delayMs)
        "Success"
    }
    return result ?: "Timeout"
}`,
      hints: [
        'withTimeoutOrNull returns null if the timeout is exceeded.',
        'Use the Elvis operator ?: to provide a fallback value.',
        'The block inside withTimeoutOrNull is a suspending lambda.',
      ],
      concepts: ['withTimeoutOrNull', 'timeout', 'null-safety'],
    },
    {
      id: 'kt-co-basic-10',
      title: 'Write a Sequential Loader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a suspend function that loads multiple items sequentially.',
      skeleton: `import kotlinx.coroutines.*

// Write a suspend function called loadItems that:
// 1. Takes a count: Int parameter
// 2. Creates a mutableListOf<String>()
// 3. Loops from 1..count, delaying 50ms each iteration
// 4. Adds "Item <i>" to the list each iteration
// 5. Returns the list`,
      solution: `import kotlinx.coroutines.*

suspend fun loadItems(count: Int): List<String> {
    val items = mutableListOf<String>()
    for (i in 1..count) {
        delay(50L)
        items.add("Item \${i}")
    }
    return items
}`,
      hints: [
        'Use a for loop with the range 1..count.',
        'Call delay() in each iteration to simulate loading.',
        'Use mutableListOf to build the result list.',
      ],
      concepts: ['suspend', 'delay', 'sequential-execution'],
    },
    {
      id: 'kt-co-basic-11',
      title: 'Write a Coroutine Job Canceller',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a function that launches a job and cancels it.',
      skeleton: `import kotlinx.coroutines.*

// Write a suspend function called launchAndCancel that:
// 1. Uses coroutineScope
// 2. Launches a coroutine that loops, printing "Working..." and delaying 100ms
// 3. Delays 250ms in the outer scope
// 4. Cancels the job
// 5. Prints "Cancelled"`,
      solution: `import kotlinx.coroutines.*

suspend fun launchAndCancel() = coroutineScope {
    val job = launch {
        while (true) {
            println("Working...")
            delay(100L)
        }
    }
    delay(250L)
    job.cancel()
    println("Cancelled")
}`,
      hints: [
        'launch returns a Job that you can cancel.',
        'Use while(true) for the loop since delay is a cancellation point.',
        'Call job.cancel() to cancel the coroutine.',
      ],
      concepts: ['Job', 'cancel', 'cancellation'],
    },
    {
      id: 'kt-co-basic-12',
      title: 'Write an Async Map',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a function that maps over a list using async coroutines.',
      skeleton: `import kotlinx.coroutines.*

// Write a suspend function called asyncMap that:
// 1. Takes a List<Int> parameter called items
// 2. Uses coroutineScope
// 3. Maps each item to an async block that delays 50ms and returns item * 2
// 4. Awaits all results and returns List<Int>`,
      solution: `import kotlinx.coroutines.*

suspend fun asyncMap(items: List<Int>): List<Int> = coroutineScope {
    items.map { item ->
        async {
            delay(50L)
            item * 2
        }
    }.map { it.await() }
}`,
      hints: [
        'Use .map { async { ... } } to create a list of Deferred.',
        'Then use .map { it.await() } to collect all results.',
        'coroutineScope ensures all async tasks complete before returning.',
      ],
      concepts: ['async', 'map', 'awaitAll'],
    },
    {
      id: 'kt-co-basic-13',
      title: 'Fix Missing Suspend',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Fix the function that calls delay but is not marked as suspend.',
      skeleton: `import kotlinx.coroutines.*

fun slowGreet(name: String): String {
    delay(500L)
    return "Hello, \${name}!"
}

fun main() = runBlocking {
    println(slowGreet("World"))
}`,
      solution: `import kotlinx.coroutines.*

suspend fun slowGreet(name: String): String {
    delay(500L)
    return "Hello, \${name}!"
}

fun main() = runBlocking {
    println(slowGreet("World"))
}`,
      hints: [
        'delay is a suspend function and can only be called from a coroutine.',
        'The function needs the suspend modifier.',
        'Add suspend before the fun keyword.',
      ],
      concepts: ['suspend', 'compilation-error'],
    },
    {
      id: 'kt-co-basic-14',
      title: 'Fix Blocking Call in Coroutine',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Replace Thread.sleep with delay in the coroutine.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        Thread.sleep(1000)
        println("Done")
    }
    println("Start")
}`,
      solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        delay(1000L)
        println("Done")
    }
    println("Start")
}`,
      hints: [
        'Thread.sleep blocks the thread, preventing other coroutines from running.',
        'Use delay() instead to suspend without blocking.',
        'delay is a coroutine-aware alternative to Thread.sleep.',
      ],
      concepts: ['delay', 'blocking-vs-suspending'],
    },
    {
      id: 'kt-co-basic-15',
      title: 'Fix Missing Await',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the async call that forgets to await the result.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val result = async {
        delay(100L)
        42
    }
    println("Answer: \${result}")
}`,
      solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val result = async {
        delay(100L)
        42
    }
    println("Answer: \${result.await()}")
}`,
      hints: [
        'async returns a Deferred, not the actual value.',
        'You need to call .await() to get the computed result.',
        'Without await(), you print the Deferred object itself.',
      ],
      concepts: ['async', 'await', 'Deferred'],
    },
    {
      id: 'kt-co-basic-16',
      title: 'Predict Launch Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output of concurrent coroutine launches.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        delay(200L)
        println("A")
    }
    launch {
        delay(100L)
        println("B")
    }
    println("C")
}`,
      solution: `C
B
A`,
      hints: [
        'launch starts coroutines concurrently.',
        'println("C") runs first because it is not in a launched coroutine.',
        'The second launch has a shorter delay, so "B" prints before "A".',
      ],
      concepts: ['launch', 'concurrency', 'delay-ordering'],
    },
    {
      id: 'kt-co-basic-17',
      title: 'Predict Async Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output of async/await usage.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val a = async { 10 }
    val b = async { 20 }
    val c = async { 30 }
    println(a.await() + b.await() + c.await())
}`,
      solution: `60`,
      hints: [
        'Each async block returns a value.',
        'await() retrieves the computed value.',
        '10 + 20 + 30 = 60.',
      ],
      concepts: ['async', 'await', 'arithmetic'],
    },
    {
      id: 'kt-co-basic-18',
      title: 'Predict withTimeout',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output when a timeout occurs.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val result = withTimeoutOrNull(100L) {
        delay(200L)
        "Done"
    }
    println(result ?: "Timed out")
}`,
      solution: `Timed out`,
      hints: [
        'The timeout is 100ms but the delay is 200ms.',
        'withTimeoutOrNull returns null when the timeout is exceeded.',
        'The Elvis operator provides "Timed out" when result is null.',
      ],
      concepts: ['withTimeoutOrNull', 'timeout', 'null-safety'],
    },
    {
      id: 'kt-co-basic-19',
      title: 'Refactor Callbacks to Coroutines',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Refactor callback-based code to use suspend functions.',
      skeleton: `import kotlinx.coroutines.*

fun fetchData(callback: (String) -> Unit) {
    Thread {
        Thread.sleep(500)
        callback("Data loaded")
    }.start()
}

fun main() {
    fetchData { data ->
        println(data)
    }
    Thread.sleep(1000)
}`,
      solution: `import kotlinx.coroutines.*

suspend fun fetchData(): String {
    delay(500L)
    return "Data loaded"
}

fun main() = runBlocking {
    val data = fetchData()
    println(data)
}`,
      hints: [
        'Replace the callback with a suspend function that returns the value directly.',
        'Use delay instead of Thread.sleep.',
        'Use runBlocking as the entry point in main.',
      ],
      concepts: ['suspend', 'callback-to-coroutine', 'refactoring'],
    },
    {
      id: 'kt-co-basic-20',
      title: 'Refactor Sequential to Parallel',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Refactor sequential async calls to run in parallel.',
      skeleton: `import kotlinx.coroutines.*

suspend fun fetchName(): String {
    delay(500L)
    return "Alice"
}

suspend fun fetchAge(): Int {
    delay(500L)
    return 30
}

fun main() = runBlocking {
    val name = fetchName()
    val age = fetchAge()
    println("\${name} is \${age} years old")
}`,
      solution: `import kotlinx.coroutines.*

suspend fun fetchName(): String {
    delay(500L)
    return "Alice"
}

suspend fun fetchAge(): Int {
    delay(500L)
    return 30
}

fun main() = runBlocking {
    val name = async { fetchName() }
    val age = async { fetchAge() }
    println("\${name.await()} is \${age.await()} years old")
}`,
      hints: [
        'Wrap each call in async to run them concurrently.',
        'Use await() when you need the results.',
        'This cuts the total time roughly in half.',
      ],
      concepts: ['async', 'parallel-execution', 'refactoring'],
    },
  ],
};
