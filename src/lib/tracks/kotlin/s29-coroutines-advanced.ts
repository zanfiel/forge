import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-co-adv',
  title: '29. Coroutines Advanced',
  explanation: `## Coroutines Advanced in Kotlin

Advanced coroutine topics cover exception handling, cancellation, supervisorScope, and coroutineContext management.

### supervisorScope

\`\`\`kotlin
supervisorScope {
    val child1 = launch {
        throw RuntimeException("Failed")
    }
    val child2 = launch {
        delay(100)
        println("Child 2 still running")
    }
}
\`\`\`
Child 2 continues even though child 1 failed.

### Exception Handling

\`\`\`kotlin
val handler = CoroutineExceptionHandler { _, exception ->
    println("Caught: \${exception.message}")
}

val scope = CoroutineScope(SupervisorJob() + handler)
scope.launch { throw RuntimeException("Error") }
\`\`\`

### Cancellation

\`\`\`kotlin
val job = launch {
    try {
        repeat(1000) { i ->
            println("Working \$i")
            delay(100)
        }
    } finally {
        println("Cleanup")
    }
}
delay(300)
job.cancelAndJoin()
\`\`\`

### coroutineContext

\`\`\`kotlin
launch(Dispatchers.IO + CoroutineName("myCoroutine")) {
    println("Running in \${coroutineContext[CoroutineName]?.name}")
    println("Dispatcher: \${coroutineContext[ContinuationInterceptor]}")
}
\`\`\``,
  exercises: [
    {
      id: 'kt-co-adv-1',
      title: 'supervisorScope Basics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use supervisorScope to isolate child failures.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    ___ {
        launch {
            throw RuntimeException("Child 1 failed")
        }
        launch {
            delay(100)
            println("Child 2 completed")
        }
    }
}`,
      solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    supervisorScope {
        launch {
            throw RuntimeException("Child 1 failed")
        }
        launch {
            delay(100)
            println("Child 2 completed")
        }
    }
}`,
      hints: [
        'supervisorScope prevents child failure from cancelling siblings.',
        'Unlike coroutineScope, one child failure does not affect others.',
        'Each child is independent in a supervisor scope.',
      ],
      concepts: ['supervisorScope', 'failure-isolation'],
    },
    {
      id: 'kt-co-adv-2',
      title: 'CoroutineExceptionHandler',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Set up a CoroutineExceptionHandler to catch unhandled exceptions.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val handler = ___ { _, exception ->
        println("Caught: \${exception.message}")
    }
    
    val scope = CoroutineScope(SupervisorJob() + handler)
    scope.launch {
        throw RuntimeException("Oops")
    }
    delay(200)
}`,
      solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val handler = CoroutineExceptionHandler { _, exception ->
        println("Caught: \${exception.message}")
    }
    
    val scope = CoroutineScope(SupervisorJob() + handler)
    scope.launch {
        throw RuntimeException("Oops")
    }
    delay(200)
}`,
      hints: [
        'CoroutineExceptionHandler catches uncaught exceptions in coroutines.',
        'It must be installed on the scope or a root coroutine.',
        'It only works with launch, not async (use try/catch for async).',
      ],
      concepts: ['CoroutineExceptionHandler', 'exception-handling'],
    },
    {
      id: 'kt-co-adv-3',
      title: 'Cancel a Coroutine',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Cancel a running coroutine using cancelAndJoin.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        repeat(100) { i ->
            println("Working \${i}")
            delay(100)
        }
    }
    delay(350)
    job.___()
    println("Cancelled")
}`,
      solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        repeat(100) { i ->
            println("Working \${i}")
            delay(100)
        }
    }
    delay(350)
    job.cancelAndJoin()
    println("Cancelled")
}`,
      hints: [
        'cancelAndJoin cancels the job and waits for it to finish.',
        'It combines cancel() and join() into one call.',
        'delay is a cancellation point where the coroutine checks for cancellation.',
      ],
      concepts: ['cancelAndJoin', 'cancellation'],
    },
    {
      id: 'kt-co-adv-4',
      title: 'CoroutineName Context',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Add a CoroutineName to the context.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    launch(Dispatchers.Default + ___(\"worker\")) {
        println("Name: \${coroutineContext[CoroutineName]?.name}")
    }
}`,
      solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    launch(Dispatchers.Default + CoroutineName("worker")) {
        println("Name: \${coroutineContext[CoroutineName]?.name}")
    }
}`,
      hints: [
        'CoroutineName adds a debug name to the coroutine.',
        'Context elements are combined with the + operator.',
        'Access the name via coroutineContext[CoroutineName].',
      ],
      concepts: ['CoroutineName', 'coroutineContext'],
    },
    {
      id: 'kt-co-adv-5',
      title: 'isActive Check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Check isActive for cooperative cancellation in a CPU-bound loop.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch(Dispatchers.Default) {
        var i = 0
        while (___) {
            if (i % 100000 == 0) println("Working \${i}")
            i++
        }
        println("Done")
    }
    delay(100)
    job.cancelAndJoin()
}`,
      solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch(Dispatchers.Default) {
        var i = 0
        while (isActive) {
            if (i % 100000 == 0) println("Working \${i}")
            i++
        }
        println("Done")
    }
    delay(100)
    job.cancelAndJoin()
}`,
      hints: [
        'isActive is a property from CoroutineScope.',
        'CPU-bound loops need explicit cancellation checks.',
        'Without isActive check, the coroutine cannot be cancelled.',
      ],
      concepts: ['isActive', 'cooperative-cancellation'],
    },
    {
      id: 'kt-co-adv-6',
      title: 'NonCancellable Cleanup',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Use NonCancellable to perform cleanup after cancellation.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        try {
            repeat(100) { delay(100) }
        } finally {
            withContext(___) {
                delay(100)
                println("Cleanup complete")
            }
        }
    }
    delay(250)
    job.cancelAndJoin()
}`,
      solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        try {
            repeat(100) { delay(100) }
        } finally {
            withContext(NonCancellable) {
                delay(100)
                println("Cleanup complete")
            }
        }
    }
    delay(250)
    job.cancelAndJoin()
}`,
      hints: [
        'In a cancelled coroutine, suspend functions throw CancellationException.',
        'NonCancellable allows suspend calls in a finally block after cancellation.',
        'Without it, delay in finally would throw immediately.',
      ],
      concepts: ['NonCancellable', 'cleanup', 'finally'],
    },
    {
      id: 'kt-co-adv-7',
      title: 'Write a Retry Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a suspend function that retries a block up to n times.',
      skeleton: `import kotlinx.coroutines.*

// Write a suspend function called retry that:
// 1. Takes times: Int and delayMs: Long parameters
// 2. Takes a suspend block: suspend () -> T parameter
// 3. Tries to execute the block up to 'times' attempts
// 4. If it throws, delays for delayMs and retries
// 5. On the last attempt, lets the exception propagate`,
      solution: `import kotlinx.coroutines.*

suspend fun <T> retry(times: Int, delayMs: Long, block: suspend () -> T): T {
    var lastException: Exception? = null
    repeat(times) { attempt ->
        try {
            return block()
        } catch (e: Exception) {
            lastException = e
            if (attempt < times - 1) {
                delay(delayMs)
            }
        }
    }
    throw lastException!!
}`,
      hints: [
        'Use a generic type parameter T for the return type.',
        'Catch exceptions and retry after a delay.',
        'On the last attempt, rethrow the exception.',
      ],
      concepts: ['retry', 'exception-handling', 'generics'],
    },
    {
      id: 'kt-co-adv-8',
      title: 'Write a Timeout with Fallback',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a function that tries a primary source with timeout, falling back to a secondary.',
      skeleton: `import kotlinx.coroutines.*

// Write a suspend function called fetchWithFallback that:
// 1. Takes primary: suspend () -> String and fallback: suspend () -> String
// 2. Takes timeoutMs: Long
// 3. Tries primary with withTimeoutOrNull(timeoutMs)
// 4. If primary times out (returns null), calls fallback
// 5. Returns the result String`,
      solution: `import kotlinx.coroutines.*

suspend fun fetchWithFallback(
    primary: suspend () -> String,
    fallback: suspend () -> String,
    timeoutMs: Long
): String {
    val result = withTimeoutOrNull(timeoutMs) {
        primary()
    }
    return result ?: fallback()
}`,
      hints: [
        'withTimeoutOrNull returns null if the timeout expires.',
        'Use the Elvis operator to call fallback when result is null.',
        'Both primary and fallback are suspend function parameters.',
      ],
      concepts: ['withTimeoutOrNull', 'fallback-pattern', 'higher-order-functions'],
    },
    {
      id: 'kt-co-adv-9',
      title: 'Write a Custom CoroutineScope',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a class with a custom CoroutineScope that can be cancelled.',
      skeleton: `import kotlinx.coroutines.*

// Write a class called TaskManager that:
// 1. Implements CoroutineScope
// 2. Has a private val job = SupervisorJob()
// 3. Overrides coroutineContext = Dispatchers.Default + job + CoroutineName("TaskManager")
// 4. Has a fun runTask(name: String) that launches a coroutine printing "Running <name>"
// 5. Has a fun destroy() that calls job.cancel()`,
      solution: `import kotlinx.coroutines.*

class TaskManager : CoroutineScope {
    private val job = SupervisorJob()
    override val coroutineContext = Dispatchers.Default + job + CoroutineName("TaskManager")

    fun runTask(name: String) {
        launch {
            println("Running \${name}")
        }
    }

    fun destroy() {
        job.cancel()
    }
}`,
      hints: [
        'Implement CoroutineScope interface.',
        'Use SupervisorJob so one task failure does not cancel others.',
        'Combine context elements with + operator.',
      ],
      concepts: ['CoroutineScope', 'SupervisorJob', 'lifecycle'],
    },
    {
      id: 'kt-co-adv-10',
      title: 'Write an ensureActive Check',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a suspend function that uses ensureActive for cooperative cancellation.',
      skeleton: `import kotlinx.coroutines.*

// Write a suspend function called processItems that:
// 1. Takes a List<Int> parameter
// 2. Uses currentCoroutineContext() to get the context
// 3. Iterates over the list
// 4. Calls ensureActive() at the start of each iteration
// 5. Adds each item * 2 to a result list
// 6. Returns the result list`,
      solution: `import kotlinx.coroutines.*
import kotlin.coroutines.coroutineContext

suspend fun processItems(items: List<Int>): List<Int> {
    val result = mutableListOf<Int>()
    for (item in items) {
        coroutineContext.ensureActive()
        result.add(item * 2)
    }
    return result
}`,
      hints: [
        'ensureActive() throws CancellationException if the coroutine is cancelled.',
        'Use coroutineContext.ensureActive() in a suspend function.',
        'This provides cooperative cancellation without delay.',
      ],
      concepts: ['ensureActive', 'cooperative-cancellation'],
    },
    {
      id: 'kt-co-adv-11',
      title: 'Write a Structured Scope Builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a function that demonstrates structured concurrency with proper error propagation.',
      skeleton: `import kotlinx.coroutines.*

// Write a suspend function called loadUserProfile that:
// 1. Uses coroutineScope
// 2. Launches async for fetchName() (delays 100ms, returns "Alice")
// 3. Launches async for fetchEmail() (delays 150ms, returns "alice@test.com")
// 4. Returns "Name: <name>, Email: <email>"
// If either fails, both are cancelled automatically`,
      solution: `import kotlinx.coroutines.*

suspend fun fetchName(): String {
    delay(100L)
    return "Alice"
}

suspend fun fetchEmail(): String {
    delay(150L)
    return "alice@test.com"
}

suspend fun loadUserProfile(): String = coroutineScope {
    val name = async { fetchName() }
    val email = async { fetchEmail() }
    "Name: \${name.await()}, Email: \${email.await()}"
}`,
      hints: [
        'coroutineScope cancels all children if one fails.',
        'Use async for parallel decomposition.',
        'The function returns the combined result.',
      ],
      concepts: ['structured-concurrency', 'coroutineScope', 'error-propagation'],
    },
    {
      id: 'kt-co-adv-12',
      title: 'Write a Mutex-Protected Counter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a thread-safe counter using Mutex.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.sync.*

// Write a class called SafeCounter that:
// 1. Has a private var count = 0
// 2. Has a private val mutex = Mutex()
// 3. Has a suspend fun increment() that locks the mutex and increments count
// 4. Has a fun getCount(): Int that returns count`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.sync.*

class SafeCounter {
    private var count = 0
    private val mutex = Mutex()

    suspend fun increment() {
        mutex.withLock {
            count++
        }
    }

    fun getCount(): Int = count
}`,
      hints: [
        'Mutex provides mutual exclusion for coroutines.',
        'Use mutex.withLock { } to safely access shared state.',
        'Mutex is a coroutine-friendly alternative to synchronized.',
      ],
      concepts: ['Mutex', 'withLock', 'thread-safety'],
    },
    {
      id: 'kt-co-adv-13',
      title: 'Fix Cancellation Not Working',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the coroutine that cannot be cancelled because it lacks cancellation points.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch(Dispatchers.Default) {
        var i = 0
        while (true) {
            i++
            if (i % 1000000 == 0) println("Count: \${i}")
        }
    }
    delay(200)
    job.cancelAndJoin()
    println("Done")
}`,
      solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch(Dispatchers.Default) {
        var i = 0
        while (isActive) {
            i++
            if (i % 1000000 == 0) println("Count: \${i}")
        }
    }
    delay(200)
    job.cancelAndJoin()
    println("Done")
}`,
      hints: [
        'while(true) never checks for cancellation.',
        'Replace while(true) with while(isActive).',
        'CPU-bound loops need explicit cancellation checks.',
      ],
      concepts: ['isActive', 'cooperative-cancellation'],
    },
    {
      id: 'kt-co-adv-14',
      title: 'Fix Exception Swallowed by async',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Fix the exception that is silently lost in an async coroutine.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val handler = CoroutineExceptionHandler { _, e ->
        println("Caught: \${e.message}")
    }
    
    val deferred = async(handler) {
        throw RuntimeException("Error in async")
    }
    
    delay(200)
    println("No crash seen")
}`,
      solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val deferred = async {
        throw RuntimeException("Error in async")
    }
    
    try {
        deferred.await()
    } catch (e: RuntimeException) {
        println("Caught: \${e.message}")
    }
}`,
      hints: [
        'CoroutineExceptionHandler does not work with async.',
        'async stores the exception in the Deferred.',
        'You must use try/catch around await() to handle async exceptions.',
      ],
      concepts: ['async', 'exception-handling', 'await'],
    },
    {
      id: 'kt-co-adv-15',
      title: 'Fix SupervisorJob Usage',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Fix the supervisor scope that still cancels siblings.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    // This does NOT provide supervisor behavior!
    launch(SupervisorJob()) {
        launch {
            delay(50)
            throw RuntimeException("Failed")
        }
        launch {
            delay(200)
            println("Should complete")
        }
    }
    delay(500)
}`,
      solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    supervisorScope {
        launch {
            delay(50)
            throw RuntimeException("Failed")
        }
        launch {
            delay(200)
            println("Should complete")
        }
    }
    delay(500)
}`,
      hints: [
        'launch(SupervisorJob()) breaks structured concurrency.',
        'Use supervisorScope { } instead for proper supervisor behavior.',
        'supervisorScope maintains the parent-child relationship correctly.',
      ],
      concepts: ['supervisorScope', 'SupervisorJob', 'structured-concurrency'],
    },
    {
      id: 'kt-co-adv-16',
      title: 'Predict Cancellation Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output of a coroutine with try/finally and cancellation.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        try {
            println("Start")
            delay(1000)
            println("End")
        } finally {
            println("Cleanup")
        }
    }
    delay(100)
    job.cancelAndJoin()
    println("Done")
}`,
      solution: `Start
Cleanup
Done`,
      hints: [
        '"Start" prints immediately.',
        'The coroutine is cancelled during delay, so "End" never prints.',
        'The finally block executes on cancellation, printing "Cleanup".',
      ],
      concepts: ['cancellation', 'finally', 'try-catch'],
    },
    {
      id: 'kt-co-adv-17',
      title: 'Predict supervisorScope Output',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Predict the output with supervisorScope and a failing child.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    try {
        supervisorScope {
            launch {
                println("Child 1 start")
                throw RuntimeException("Fail")
            }
            launch {
                delay(100)
                println("Child 2 done")
            }
            delay(200)
            println("Supervisor done")
        }
    } catch (e: Exception) {
        println("Caught")
    }
}`,
      solution: `Child 1 start
Child 2 done
Supervisor done`,
      hints: [
        'In supervisorScope, child 1 failure does not cancel child 2.',
        'Child 2 prints after 100ms delay.',
        'The supervisor completes after 200ms.',
      ],
      concepts: ['supervisorScope', 'failure-isolation'],
    },
    {
      id: 'kt-co-adv-18',
      title: 'Predict Context Inheritance',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict which context elements are inherited by child coroutines.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking(CoroutineName("parent")) {
    println(coroutineContext[CoroutineName]?.name)
    launch {
        println(coroutineContext[CoroutineName]?.name)
    }
    launch(CoroutineName("child")) {
        println(coroutineContext[CoroutineName]?.name)
    }
}`,
      solution: `parent
parent
child`,
      hints: [
        'The first launch inherits the parent context.',
        'The second launch overrides CoroutineName with "child".',
        'Context elements are inherited unless explicitly overridden.',
      ],
      concepts: ['context-inheritance', 'CoroutineName'],
    },
    {
      id: 'kt-co-adv-19',
      title: 'Refactor GlobalScope to Structured',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor GlobalScope usage to structured concurrency.',
      skeleton: `import kotlinx.coroutines.*

class DataService {
    fun loadData() {
        GlobalScope.launch {
            delay(100)
            println("Data loaded")
        }
    }
    
    fun processData() {
        GlobalScope.launch {
            delay(200)
            println("Data processed")
        }
    }
}

fun main() = runBlocking {
    val service = DataService()
    service.loadData()
    service.processData()
    delay(500)
}`,
      solution: `import kotlinx.coroutines.*

class DataService(private val scope: CoroutineScope) {
    fun loadData() {
        scope.launch {
            delay(100)
            println("Data loaded")
        }
    }
    
    fun processData() {
        scope.launch {
            delay(200)
            println("Data processed")
        }
    }
}

fun main() = runBlocking {
    val service = DataService(this)
    service.loadData()
    service.processData()
}`,
      hints: [
        'Inject CoroutineScope instead of using GlobalScope.',
        'GlobalScope creates coroutines with no lifecycle management.',
        'Structured concurrency ensures all coroutines complete before the scope ends.',
      ],
      concepts: ['structured-concurrency', 'scope-injection', 'GlobalScope'],
    },
    {
      id: 'kt-co-adv-20',
      title: 'Refactor Nested try/catch to Handler',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Refactor nested try/catch exception handling to use CoroutineExceptionHandler.',
      skeleton: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val scope = CoroutineScope(SupervisorJob())
    
    scope.launch {
        try {
            delay(50)
            throw RuntimeException("Task 1 failed")
        } catch (e: Exception) {
            println("Error in task 1: \${e.message}")
        }
    }
    
    scope.launch {
        try {
            delay(100)
            throw RuntimeException("Task 2 failed")
        } catch (e: Exception) {
            println("Error in task 2: \${e.message}")
        }
    }
    
    delay(300)
    scope.cancel()
}`,
      solution: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val handler = CoroutineExceptionHandler { _, exception ->
        println("Error: \${exception.message}")
    }
    
    val scope = CoroutineScope(SupervisorJob() + handler)
    
    scope.launch {
        delay(50)
        throw RuntimeException("Task 1 failed")
    }
    
    scope.launch {
        delay(100)
        throw RuntimeException("Task 2 failed")
    }
    
    delay(300)
    scope.cancel()
}`,
      hints: [
        'CoroutineExceptionHandler centralizes error handling.',
        'Install it on the scope with SupervisorJob.',
        'Individual coroutines no longer need try/catch.',
      ],
      concepts: ['CoroutineExceptionHandler', 'centralized-error-handling', 'refactoring'],
    },
  ],
};
