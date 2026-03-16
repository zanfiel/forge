import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-co-flow',
  title: '27. Coroutines Flow',
  explanation: `## Coroutines Flow in Kotlin

Kotlin Flow is a cold asynchronous stream that emits values sequentially. It is the coroutine equivalent of reactive streams.

### Flow Builder

\`\`\`kotlin
import kotlinx.coroutines.flow.*

fun numbers(): Flow<Int> = flow {
    for (i in 1..3) {
        delay(100)
        emit(i)
    }
}
\`\`\`

### Collecting a Flow

\`\`\`kotlin
runBlocking {
    numbers().collect { value ->
        println(value)
    }
}
\`\`\`

### Operators

\`\`\`kotlin
flowOf(1, 2, 3, 4, 5)
    .filter { it % 2 == 0 }
    .map { it * 10 }
    .collect { println(it) } // 20, 40
\`\`\`

### flowOn - Changing Context

\`\`\`kotlin
flow {
    emit(performHeavyComputation())
}.flowOn(Dispatchers.Default)
 .collect { println(it) }
\`\`\`

### StateFlow and stateIn

\`\`\`kotlin
val stateFlow = MutableStateFlow(0)
stateFlow.value = 42

// Convert cold flow to StateFlow
val state = coldFlow.stateIn(
    scope = viewModelScope,
    started = SharingStarted.WhileSubscribed(5000),
    initialValue = 0
)
\`\`\``,
  exercises: [
    {
      id: 'kt-co-flow-1',
      title: 'Create a Basic Flow',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Create a flow that emits three integers.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun simpleFlow(): Flow<Int> = ___ {
    emit(1)
    emit(2)
    emit(3)
}

fun main() = runBlocking {
    simpleFlow().collect { println(it) }
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun simpleFlow(): Flow<Int> = flow {
    emit(1)
    emit(2)
    emit(3)
}

fun main() = runBlocking {
    simpleFlow().collect { println(it) }
}`,
      hints: [
        'The flow builder creates a new Flow.',
        'Use emit() inside the flow block to produce values.',
        'flow { } is the standard way to create a cold flow.',
      ],
      concepts: ['flow-builder', 'emit'],
    },
    {
      id: 'kt-co-flow-2',
      title: 'Collect a Flow',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Collect values from a flow and print them.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    flowOf("A", "B", "C").___ { value ->
        println(value)
    }
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    flowOf("A", "B", "C").collect { value ->
        println(value)
    }
}`,
      hints: [
        'collect is a terminal operator that triggers flow emission.',
        'collect is a suspend function that processes each emitted value.',
        'Without collect, the flow does nothing (it is cold).',
      ],
      concepts: ['collect', 'terminal-operator'],
    },
    {
      id: 'kt-co-flow-3',
      title: 'Map Operator on Flow',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Transform flow values using map.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    flowOf(1, 2, 3)
        .___ { it * 10 }
        .collect { println(it) }
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    flowOf(1, 2, 3)
        .map { it * 10 }
        .collect { println(it) }
}`,
      hints: [
        'map transforms each emitted value.',
        'It works just like map on collections.',
        'The result is a new Flow with transformed values.',
      ],
      concepts: ['map', 'intermediate-operator'],
    },
    {
      id: 'kt-co-flow-4',
      title: 'Filter Flow Values',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Filter a flow to only emit even numbers.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    flowOf(1, 2, 3, 4, 5, 6)
        .___ { it % 2 == 0 }
        .collect { println(it) }
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    flowOf(1, 2, 3, 4, 5, 6)
        .filter { it % 2 == 0 }
        .collect { println(it) }
}`,
      hints: [
        'filter keeps only values matching the predicate.',
        'It returns a new Flow with only the matching elements.',
        'The predicate checks if the number is even.',
      ],
      concepts: ['filter', 'intermediate-operator'],
    },
    {
      id: 'kt-co-flow-5',
      title: 'flowOn Dispatcher',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Change the coroutine context for upstream flow operations.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun heavyFlow(): Flow<Int> = flow {
    for (i in 1..3) {
        delay(100)
        emit(i)
    }
}.___(Dispatchers.Default)

fun main() = runBlocking {
    heavyFlow().collect { println(it) }
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun heavyFlow(): Flow<Int> = flow {
    for (i in 1..3) {
        delay(100)
        emit(i)
    }
}.flowOn(Dispatchers.Default)

fun main() = runBlocking {
    heavyFlow().collect { println(it) }
}`,
      hints: [
        'flowOn changes the context for upstream operations.',
        'It does not affect downstream operators.',
        'Use Dispatchers.Default for CPU-intensive work.',
      ],
      concepts: ['flowOn', 'dispatchers'],
    },
    {
      id: 'kt-co-flow-6',
      title: 'MutableStateFlow',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Create and update a MutableStateFlow.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    val counter = ___(0)
    
    launch {
        counter.collect { println("Count: \${it}") }
    }
    
    delay(100)
    counter.value = 1
    delay(100)
    counter.value = 2
    delay(100)
    cancel()
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    val counter = MutableStateFlow(0)
    
    launch {
        counter.collect { println("Count: \${it}") }
    }
    
    delay(100)
    counter.value = 1
    delay(100)
    counter.value = 2
    delay(100)
    cancel()
}`,
      hints: [
        'MutableStateFlow holds a single updatable value.',
        'It always has a current value accessible via .value.',
        'Collectors receive the latest value and all subsequent updates.',
      ],
      concepts: ['MutableStateFlow', 'state-management'],
    },
    {
      id: 'kt-co-flow-7',
      title: 'Write a Number Generator Flow',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Write a function that returns a flow emitting numbers from 1 to n with delays.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

// Write a function called countTo that:
// 1. Takes an Int parameter 'n'
// 2. Returns a Flow<Int>
// 3. Uses the flow builder to emit numbers 1 through n
// 4. Delays 100ms between each emission`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun countTo(n: Int): Flow<Int> = flow {
    for (i in 1..n) {
        delay(100L)
        emit(i)
    }
}`,
      hints: [
        'Use the flow { } builder to create the Flow.',
        'Loop from 1 to n using a for loop.',
        'Call delay before or after emit in each iteration.',
      ],
      concepts: ['flow-builder', 'emit', 'delay'],
    },
    {
      id: 'kt-co-flow-8',
      title: 'Write a Flow Transformer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a function that takes a Flow<String> and returns a Flow<Int> of string lengths.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

// Write a function called stringLengths that:
// 1. Takes a Flow<String> parameter called input
// 2. Returns a Flow<Int>
// 3. Maps each string to its length
// 4. Filters out lengths less than 3`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun stringLengths(input: Flow<String>): Flow<Int> {
    return input
        .map { it.length }
        .filter { it >= 3 }
}`,
      hints: [
        'Chain map and filter operators on the input flow.',
        'map { it.length } converts String to Int.',
        'filter { it >= 3 } removes short strings.',
      ],
      concepts: ['map', 'filter', 'flow-transformation'],
    },
    {
      id: 'kt-co-flow-9',
      title: 'Write a Flow Combiner',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a function that combines two flows using zip.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

// Write a function called zipFlows that:
// 1. Takes two Flow<Int> parameters: flow1 and flow2
// 2. Zips them together, summing each pair
// 3. Returns Flow<Int>`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun zipFlows(flow1: Flow<Int>, flow2: Flow<Int>): Flow<Int> {
    return flow1.zip(flow2) { a, b -> a + b }
}`,
      hints: [
        'Use the zip operator to combine two flows.',
        'zip pairs elements from both flows by position.',
        'The lambda receives one element from each flow.',
      ],
      concepts: ['zip', 'flow-combination'],
    },
    {
      id: 'kt-co-flow-10',
      title: 'Write a Debounce Search',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a function that debounces a flow of search queries.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

// Write a function called searchDebounced that:
// 1. Takes a Flow<String> parameter called queries
// 2. Debounces by 300ms
// 3. Filters out blank strings
// 4. Returns only distinct consecutive values
// 5. Returns Flow<String>`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun searchDebounced(queries: Flow<String>): Flow<String> {
    return queries
        .debounce(300L)
        .filter { it.isNotBlank() }
        .distinctUntilChanged()
}`,
      hints: [
        'debounce waits for a pause in emissions before forwarding.',
        'filter { it.isNotBlank() } removes empty queries.',
        'distinctUntilChanged removes consecutive duplicates.',
      ],
      concepts: ['debounce', 'distinctUntilChanged', 'search-pattern'],
    },
    {
      id: 'kt-co-flow-11',
      title: 'Write a Flow to List Converter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Write a suspend function that collects a flow into a list.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

// Write a suspend function called collectToList that:
// 1. Takes a Flow<Int> parameter
// 2. Collects all values into a list
// 3. Returns List<Int>
// Hint: there is a built-in terminal operator for this`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

suspend fun collectToList(flow: Flow<Int>): List<Int> {
    return flow.toList()
}`,
      hints: [
        'Flow has a built-in toList() terminal operator.',
        'toList() collects all values into a List.',
        'It is a suspend function that waits for the flow to complete.',
      ],
      concepts: ['toList', 'terminal-operator'],
    },
    {
      id: 'kt-co-flow-12',
      title: 'Write a Running Total Flow',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a function that creates a running total from a flow of numbers.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

// Write a function called runningTotal that:
// 1. Takes a Flow<Int> parameter
// 2. Uses the scan operator to compute a running sum
// 3. Starting from 0
// 4. Returns Flow<Int>`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun runningTotal(numbers: Flow<Int>): Flow<Int> {
    return numbers.scan(0) { acc, value -> acc + value }
}`,
      hints: [
        'scan is like fold but emits each intermediate result.',
        'The initial value is 0.',
        'Each step adds the current value to the accumulator.',
      ],
      concepts: ['scan', 'accumulation', 'intermediate-operator'],
    },
    {
      id: 'kt-co-flow-13',
      title: 'Fix Flow Not Collected',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Fix the flow that never emits because it is never collected.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    val myFlow = flow {
        println("Emitting 1")
        emit(1)
        println("Emitting 2")
        emit(2)
    }
    
    // Nothing happens!
    println("Done")
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    val myFlow = flow {
        println("Emitting 1")
        emit(1)
        println("Emitting 2")
        emit(2)
    }
    
    myFlow.collect { println(it) }
    println("Done")
}`,
      hints: [
        'Flows are cold - they do not execute until collected.',
        'You must call collect or another terminal operator.',
        'Add myFlow.collect { } to trigger the emissions.',
      ],
      concepts: ['cold-flow', 'collect', 'terminal-operator'],
    },
    {
      id: 'kt-co-flow-14',
      title: 'Fix Emit on Wrong Context',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the flow that tries to emit from a different dispatcher.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun dataFlow(): Flow<Int> = flow {
    withContext(Dispatchers.IO) {
        emit(1)
    }
}

fun main() = runBlocking {
    dataFlow().collect { println(it) }
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun dataFlow(): Flow<Int> = flow {
    emit(1)
}.flowOn(Dispatchers.IO)

fun main() = runBlocking {
    dataFlow().collect { println(it) }
}`,
      hints: [
        'Flow does not allow emitting from a different context inside withContext.',
        'Use flowOn to change the upstream context instead.',
        'flowOn is the correct way to change dispatchers for flow emission.',
      ],
      concepts: ['flowOn', 'context-preservation'],
    },
    {
      id: 'kt-co-flow-15',
      title: 'Fix StateFlow Initial Duplicate',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the StateFlow that emits duplicate values.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    val state = MutableStateFlow("initial")
    
    launch {
        state.collect { println(it) }
    }
    
    delay(100)
    state.value = "initial"  // Should not trigger re-emission
    state.value = "updated"
    delay(100)
    cancel()
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    val state = MutableStateFlow("initial")
    
    launch {
        state.collect { println(it) }
    }
    
    delay(100)
    // StateFlow already ignores duplicate values, no fix needed here
    state.value = "updated"
    delay(100)
    cancel()
}`,
      hints: [
        'StateFlow uses structural equality to skip duplicate values.',
        'Setting the same value again does not trigger a new emission.',
        'Remove the redundant assignment of "initial".',
      ],
      concepts: ['StateFlow', 'distinctUntilChanged', 'equality'],
    },
    {
      id: 'kt-co-flow-16',
      title: 'Predict Flow Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Predict the output of a simple flow with map and filter.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    flowOf(1, 2, 3, 4, 5)
        .filter { it > 2 }
        .map { it * 3 }
        .collect { println(it) }
}`,
      solution: `9
12
15`,
      hints: [
        'filter { it > 2 } keeps 3, 4, 5.',
        'map { it * 3 } transforms to 9, 12, 15.',
        'collect prints each value on a new line.',
      ],
      concepts: ['filter', 'map', 'flow-pipeline'],
    },
    {
      id: 'kt-co-flow-17',
      title: 'Predict Take Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output of a flow with take operator.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    flow {
        emit("A")
        println("After A")
        emit("B")
        println("After B")
        emit("C")
        println("After C")
    }.take(2).collect { println(it) }
}`,
      solution: `A
After A
B`,
      hints: [
        'take(2) collects only the first 2 emissions.',
        'After taking 2 values, the flow is cancelled.',
        'The print statements interleave with emissions.',
      ],
      concepts: ['take', 'flow-cancellation'],
    },
    {
      id: 'kt-co-flow-18',
      title: 'Predict Reduce Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the result of reducing a flow.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    val sum = flowOf(10, 20, 30)
        .reduce { acc, value -> acc + value }
    println(sum)
}`,
      solution: `60`,
      hints: [
        'reduce accumulates values starting from the first element.',
        '10 + 20 = 30, then 30 + 30 = 60.',
        'reduce is a terminal operator that returns a single value.',
      ],
      concepts: ['reduce', 'terminal-operator'],
    },
    {
      id: 'kt-co-flow-19',
      title: 'Refactor List Processing to Flow',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor synchronous list processing to use Flow for lazy evaluation.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun processData(): List<String> {
    val numbers = listOf(1, 2, 3, 4, 5)
    return numbers
        .filter { it % 2 != 0 }
        .map { "Item \${it}" }
}

fun main() {
    processData().forEach { println(it) }
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun processData(): Flow<String> {
    return flowOf(1, 2, 3, 4, 5)
        .filter { it % 2 != 0 }
        .map { "Item \${it}" }
}

fun main() = runBlocking {
    processData().collect { println(it) }
}`,
      hints: [
        'Replace List with Flow as the return type.',
        'Use flowOf() instead of listOf().',
        'Use collect instead of forEach.',
      ],
      concepts: ['flow', 'lazy-evaluation', 'refactoring'],
    },
    {
      id: 'kt-co-flow-20',
      title: 'Refactor Callback Stream to Flow',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Refactor a callback-based listener to a Flow using callbackFlow.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

interface Listener {
    fun onValue(value: Int)
    fun onComplete()
}

class DataSource {
    var listener: Listener? = null
    
    fun start() {
        for (i in 1..3) {
            listener?.onValue(i)
        }
        listener?.onComplete()
    }
}

fun main() {
    val source = DataSource()
    source.listener = object : Listener {
        override fun onValue(value: Int) = println(value)
        override fun onComplete() = println("Done")
    }
    source.start()
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.channels.*

interface Listener {
    fun onValue(value: Int)
    fun onComplete()
}

class DataSource {
    var listener: Listener? = null
    
    fun start() {
        for (i in 1..3) {
            listener?.onValue(i)
        }
        listener?.onComplete()
    }
}

fun DataSource.asFlow(): Flow<Int> = callbackFlow {
    listener = object : Listener {
        override fun onValue(value: Int) { trySend(value) }
        override fun onComplete() { close() }
    }
    start()
    awaitClose { listener = null }
}

fun main() = runBlocking {
    val source = DataSource()
    source.asFlow().collect { println(it) }
    println("Done")
}`,
      hints: [
        'callbackFlow bridges callback APIs to Flow.',
        'Use trySend() to emit values from callbacks.',
        'Call close() when the source completes.',
      ],
      concepts: ['callbackFlow', 'trySend', 'awaitClose'],
    },
  ],
};
