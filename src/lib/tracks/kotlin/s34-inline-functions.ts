import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-inline',
  title: '34. Inline Functions',
  explanation: `## Inline Functions in Kotlin

Inline functions reduce the overhead of higher-order functions by inlining the function body and its lambda arguments at the call site.

### inline

\`\`\`kotlin
inline fun measure(block: () -> Unit) {
    val start = System.nanoTime()
    block()
    println("Took \${System.nanoTime() - start}ns")
}
\`\`\`
The compiler inlines both the function and the lambda at the call site.

### noinline

\`\`\`kotlin
inline fun doStuff(inlined: () -> Unit, noinline stored: () -> Unit) {
    inlined()  // Inlined at call site
    val ref = stored  // Can be stored because noinline
}
\`\`\`

### crossinline

\`\`\`kotlin
inline fun runInThread(crossinline block: () -> Unit) {
    Thread {
        block()  // Cannot use non-local return
    }.start()
}
\`\`\`

### reified Type Parameters

\`\`\`kotlin
inline fun <reified T> isType(value: Any): Boolean {
    return value is T  // Only possible with reified!
}

println(isType<String>("hello"))  // true
println(isType<Int>("hello"))     // false
\`\`\``,
  exercises: [
    {
      id: 'kt-inline-1',
      title: 'Basic Inline Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Create a basic inline function.',
      skeleton: `___ fun repeat(times: Int, action: (Int) -> Unit) {
    for (i in 0 until times) {
        action(i)
    }
}

fun main() {
    repeat(3) { println("Step \${it}") }
}`,
      solution: `inline fun repeat(times: Int, action: (Int) -> Unit) {
    for (i in 0 until times) {
        action(i)
    }
}

fun main() {
    repeat(3) { println("Step \${it}") }
}`,
      hints: [
        'The inline keyword causes the function body to be copied to the call site.',
        'Lambda arguments are also inlined, avoiding object allocation.',
        'This is most beneficial for small functions called frequently.',
      ],
      concepts: ['inline', 'performance'],
    },
    {
      id: 'kt-inline-2',
      title: 'Reified Type Parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use reified to access type information at runtime.',
      skeleton: `inline fun <___ T> typeName(): String {
    return T::class.simpleName ?: "Unknown"
}

fun main() {
    println(typeName<String>())
    println(typeName<Int>())
}`,
      solution: `inline fun <reified T> typeName(): String {
    return T::class.simpleName ?: "Unknown"
}

fun main() {
    println(typeName<String>())
    println(typeName<Int>())
}`,
      hints: [
        'reified preserves type information at runtime.',
        'Without reified, generic types are erased at runtime.',
        'Only inline functions can have reified type parameters.',
      ],
      concepts: ['reified', 'type-erasure'],
    },
    {
      id: 'kt-inline-3',
      title: 'noinline Parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use noinline to prevent a lambda from being inlined.',
      skeleton: `inline fun execute(
    action: () -> Unit,
    ___ callback: () -> Unit
) {
    action()
    val ref = callback  // Cannot store inlined lambda, needs noinline
    ref()
}`,
      solution: `inline fun execute(
    action: () -> Unit,
    noinline callback: () -> Unit
) {
    action()
    val ref = callback
    ref()
}`,
      hints: [
        'Inlined lambdas cannot be stored in variables.',
        'noinline prevents the lambda from being inlined.',
        'Use noinline when you need to pass or store the lambda.',
      ],
      concepts: ['noinline', 'lambda-storage'],
    },
    {
      id: 'kt-inline-4',
      title: 'crossinline Parameter',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Use crossinline to prevent non-local returns.',
      skeleton: `inline fun runAsync(___ block: () -> Unit) {
    Thread {
        block()
    }.start()
}

fun main() {
    runAsync {
        println("Running in thread")
        // return  // Not allowed with crossinline!
    }
    Thread.sleep(100)
}`,
      solution: `inline fun runAsync(crossinline block: () -> Unit) {
    Thread {
        block()
    }.start()
}

fun main() {
    runAsync {
        println("Running in thread")
    }
    Thread.sleep(100)
}`,
      hints: [
        'crossinline prevents non-local returns from the lambda.',
        'Needed when the lambda is called from a different execution context.',
        'A Thread runs the lambda asynchronously, so non-local return would be unsafe.',
      ],
      concepts: ['crossinline', 'non-local-return'],
    },
    {
      id: 'kt-inline-5',
      title: 'Reified Type Check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use reified to perform type checks at runtime.',
      skeleton: `inline fun <reified T> filterByType(items: List<Any>): List<T> {
    return items.filterIsInstance<___>()
}

fun main() {
    val mixed = listOf(1, "hello", 2.0, "world", 3)
    val strings = filterByType<String>(mixed)
    println(strings)
}`,
      solution: `inline fun <reified T> filterByType(items: List<Any>): List<T> {
    return items.filterIsInstance<T>()
}

fun main() {
    val mixed = listOf(1, "hello", 2.0, "world", 3)
    val strings = filterByType<String>(mixed)
    println(strings)
}`,
      hints: [
        'reified T can be used with is and filterIsInstance.',
        'filterIsInstance<T>() filters elements that are instances of T.',
        'Without reified, T would be erased and this would not compile.',
      ],
      concepts: ['reified', 'filterIsInstance', 'type-check'],
    },
    {
      id: 'kt-inline-6',
      title: 'Non-Local Return',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use non-local return in an inline lambda.',
      skeleton: `inline fun findFirst(items: List<Int>, predicate: (Int) -> Boolean): Int? {
    for (item in items) {
        if (predicate(item)) ___ item
    }
    return null
}

fun main() {
    val result = findFirst(listOf(1, 2, 3, 4)) { it > 2 }
    println(result)
}`,
      solution: `inline fun findFirst(items: List<Int>, predicate: (Int) -> Boolean): Int? {
    for (item in items) {
        if (predicate(item)) return item
    }
    return null
}

fun main() {
    val result = findFirst(listOf(1, 2, 3, 4)) { it > 2 }
    println(result)
}`,
      hints: [
        'Inline lambdas support non-local returns.',
        'return inside the lambda returns from the enclosing function.',
        'This is only possible because the lambda is inlined.',
      ],
      concepts: ['non-local-return', 'inline'],
    },
    {
      id: 'kt-inline-7',
      title: 'Write a Reified Logger',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write an inline function that creates a logger using the reified type name.',
      skeleton: `// Write an inline function called logger that:
// 1. Has a reified type parameter T
// 2. Returns a simple Logger class with a tag: String property
// 3. The tag should be T::class.simpleName ?: "Unknown"
// 4. Logger has a fun log(message: String) that prints "[tag] message"`,
      solution: `class Logger(val tag: String) {
    fun log(message: String) {
        println("[\${tag}] \${message}")
    }
}

inline fun <reified T> logger(): Logger {
    return Logger(T::class.simpleName ?: "Unknown")
}`,
      hints: [
        'reified T gives access to T::class at runtime.',
        'simpleName returns the short class name.',
        'Return a Logger instance with the type name as tag.',
      ],
      concepts: ['reified', 'KClass', 'logger-pattern'],
    },
    {
      id: 'kt-inline-8',
      title: 'Write a Reified JSON Parser',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write an inline function that simulates parsing JSON to a reified type.',
      skeleton: `// Write an inline function called parse that:
// 1. Has a reified type parameter T
// 2. Takes a json: String parameter
// 3. Returns T::class.simpleName + ": " + json as a simple simulation
// 4. Also write an overload parseList that returns "List<T::class.simpleName>: json"
// This simulates how real serialization libraries use reified types`,
      solution: `inline fun <reified T> parse(json: String): String {
    return "\${T::class.simpleName}: \${json}"
}

inline fun <reified T> parseList(json: String): String {
    return "List<\${T::class.simpleName}>: \${json}"
}`,
      hints: [
        'reified lets you access the type name at runtime.',
        'Real libraries use reified to determine the target type for deserialization.',
        'T::class.simpleName gives the class name.',
      ],
      concepts: ['reified', 'deserialization', 'type-information'],
    },
    {
      id: 'kt-inline-9',
      title: 'Write a Benchmark Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write an inline benchmark function that measures execution time.',
      skeleton: `// Write an inline function called benchmark that:
// 1. Takes a label: String parameter
// 2. Takes a block: () -> T parameter
// 3. Records System.nanoTime() before and after
// 4. Prints "<label> took <elapsed>ns"
// 5. Returns the result of the block`,
      solution: `inline fun <T> benchmark(label: String, block: () -> T): T {
    val start = System.nanoTime()
    val result = block()
    val elapsed = System.nanoTime() - start
    println("\${label} took \${elapsed}ns")
    return result
}`,
      hints: [
        'Use System.nanoTime() for precise timing.',
        'Inline ensures no lambda allocation overhead.',
        'Return the block result so it can be used.',
      ],
      concepts: ['inline', 'benchmarking', 'generics'],
    },
    {
      id: 'kt-inline-10',
      title: 'Write a Safe Cast Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write an inline function that safely casts and transforms a value.',
      skeleton: `// Write an inline function called safeCast that:
// 1. Has a reified type parameter T
// 2. Takes a value: Any? parameter
// 3. Takes a transform: (T) -> String parameter
// 4. If value is T, applies transform and returns the result
// 5. Otherwise returns "Not a <T::class.simpleName>"`,
      solution: `inline fun <reified T> safeCast(value: Any?, transform: (T) -> String): String {
    return if (value is T) {
        transform(value)
    } else {
        "Not a \${T::class.simpleName}"
    }
}`,
      hints: [
        'reified allows using is T for type checks.',
        'Smart cast works after the is check.',
        'Return the transformed value or an error message.',
      ],
      concepts: ['reified', 'safe-cast', 'smart-cast'],
    },
    {
      id: 'kt-inline-11',
      title: 'Write an Inline Extension Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write an inline extension function on collections.',
      skeleton: `// Write an inline extension function on List<T> called sumByDouble that:
// 1. Takes a selector: (T) -> Double parameter
// 2. Iterates the list, applies selector, sums the results
// 3. Returns the total as Double
// This is similar to how the stdlib implements sumOf`,
      solution: `inline fun <T> List<T>.sumByDouble(selector: (T) -> Double): Double {
    var sum = 0.0
    for (item in this) {
        sum += selector(item)
    }
    return sum
}`,
      hints: [
        'Inline extension functions work just like regular inline functions.',
        'The lambda is inlined at the call site for performance.',
        'Use this to refer to the list receiver.',
      ],
      concepts: ['inline', 'extension-function', 'collection'],
    },
    {
      id: 'kt-inline-12',
      title: 'Write a Retry with Reified Exception',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write an inline retry function that catches only a specific exception type.',
      skeleton: `// Write an inline function called retryOn that:
// 1. Has a reified type parameter E : Exception
// 2. Takes times: Int and block: () -> T parameters
// 3. Retries the block up to 'times' attempts
// 4. Only catches exceptions of type E, rethrows others
// 5. Returns the result on success`,
      solution: `inline fun <reified E : Exception, T> retryOn(times: Int, block: () -> T): T {
    var lastException: E? = null
    repeat(times) {
        try {
            return block()
        } catch (e: Exception) {
            if (e is E) {
                lastException = e
            } else {
                throw e
            }
        }
    }
    throw lastException!!
}`,
      hints: [
        'reified allows using is E for exception type checking.',
        'Catch generic Exception, then check if it is E.',
        'Non-matching exceptions are rethrown immediately.',
      ],
      concepts: ['reified', 'exception-handling', 'retry'],
    },
    {
      id: 'kt-inline-13',
      title: 'Fix Non-Local Return in Non-Inline',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the non-local return that is not allowed in a non-inline function.',
      skeleton: `fun processList(items: List<Int>, action: (Int) -> Unit) {
    for (item in items) {
        action(item)
    }
}

fun main() {
    processList(listOf(1, 2, 3)) {
        if (it == 2) return  // Error: non-local return not allowed
        println(it)
    }
}`,
      solution: `inline fun processList(items: List<Int>, action: (Int) -> Unit) {
    for (item in items) {
        action(item)
    }
}

fun main() {
    processList(listOf(1, 2, 3)) {
        if (it == 2) return
        println(it)
    }
}`,
      hints: [
        'Non-local returns are only allowed in inline lambdas.',
        'Make processList an inline function.',
        'Alternatively, use return@processList for a local return.',
      ],
      concepts: ['inline', 'non-local-return'],
    },
    {
      id: 'kt-inline-14',
      title: 'Fix Reified on Non-Inline Function',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Fix the function that uses reified without inline.',
      skeleton: `fun <reified T> createInstance(): T? {
    return T::class.java.getDeclaredConstructor().newInstance()
}`,
      solution: `inline fun <reified T> createInstance(): T? {
    return T::class.java.getDeclaredConstructor().newInstance()
}`,
      hints: [
        'reified can only be used with inline functions.',
        'Without inline, the type parameter is erased at runtime.',
        'Add the inline keyword before fun.',
      ],
      concepts: ['reified', 'inline', 'type-erasure'],
    },
    {
      id: 'kt-inline-15',
      title: 'Fix Storing Inline Lambda',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the inline function that tries to store a lambda in a variable.',
      skeleton: `inline fun register(callback: () -> Unit) {
    val saved = callback  // Error: cannot store inline lambda
    saved()
}`,
      solution: `inline fun register(noinline callback: () -> Unit) {
    val saved = callback
    saved()
}`,
      hints: [
        'Inline lambdas cannot be stored in variables or passed around.',
        'Mark the parameter as noinline to allow storage.',
        'noinline prevents the lambda from being inlined.',
      ],
      concepts: ['noinline', 'inline', 'lambda-storage'],
    },
    {
      id: 'kt-inline-16',
      title: 'Predict Reified Type Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output of reified type checks.',
      skeleton: `inline fun <reified T> check(value: Any): String {
    return if (value is T) "yes" else "no"
}

fun main() {
    println(check<String>("hello"))
    println(check<Int>("hello"))
    println(check<Number>(42))
}`,
      solution: `yes
no
yes`,
      hints: [
        '"hello" is String -> yes.',
        '"hello" is not Int -> no.',
        '42 is a Number (Int extends Number) -> yes.',
      ],
      concepts: ['reified', 'is-check', 'type-hierarchy'],
    },
    {
      id: 'kt-inline-17',
      title: 'Predict Non-Local Return',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output with non-local return in an inline function.',
      skeleton: `inline fun process(items: List<Int>, action: (Int) -> Unit) {
    for (item in items) action(item)
}

fun main() {
    println("Start")
    process(listOf(1, 2, 3)) {
        if (it == 2) return
        println(it)
    }
    println("End")
}`,
      solution: `Start
1`,
      hints: [
        'return inside the inline lambda returns from main().',
        '1 is printed, then when it==2, main() returns.',
        '"End" is never reached due to non-local return.',
      ],
      concepts: ['non-local-return', 'inline'],
    },
    {
      id: 'kt-inline-18',
      title: 'Predict Local Return with Label',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output with a labeled local return.',
      skeleton: `inline fun process(items: List<Int>, action: (Int) -> Unit) {
    for (item in items) action(item)
}

fun main() {
    println("Start")
    process(listOf(1, 2, 3)) {
        if (it == 2) return@process
        println(it)
    }
    println("End")
}`,
      solution: `Start
1
3
End`,
      hints: [
        'return@process is a local return - it skips the current iteration.',
        '1 prints, 2 is skipped, 3 prints.',
        '"End" is reached because it is not a non-local return.',
      ],
      concepts: ['labeled-return', 'local-return'],
    },
    {
      id: 'kt-inline-19',
      title: 'Refactor to Inline for Performance',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor a higher-order function to inline for better performance.',
      skeleton: `fun <T> withLock(lock: Any, action: () -> T): T {
    synchronized(lock) {
        return action()
    }
}

class Counter {
    private val lock = Any()
    private var count = 0
    
    fun increment(): Int = withLock(lock) { ++count }
    fun get(): Int = withLock(lock) { count }
}`,
      solution: `inline fun <T> withLock(lock: Any, action: () -> T): T {
    synchronized(lock) {
        return action()
    }
}

class Counter {
    private val lock = Any()
    private var count = 0
    
    fun increment(): Int = withLock(lock) { ++count }
    fun get(): Int = withLock(lock) { count }
}`,
      hints: [
        'Adding inline avoids creating a lambda object on each call.',
        'For frequently called utility functions, inline is a significant optimization.',
        'The behavior is identical, just more efficient.',
      ],
      concepts: ['inline', 'performance', 'lambda-allocation'],
    },
    {
      id: 'kt-inline-20',
      title: 'Refactor Class Check to Reified',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor KClass parameter to reified type parameter.',
      skeleton: `import kotlin.reflect.KClass

fun <T : Any> findByType(items: List<Any>, type: KClass<T>): List<T> {
    return items.filter { type.isInstance(it) }.map { type.java.cast(it) }
}

fun main() {
    val items = listOf(1, "hello", 2.0, "world")
    val strings = findByType(items, String::class)
    println(strings)
}`,
      solution: `inline fun <reified T> findByType(items: List<Any>): List<T> {
    return items.filterIsInstance<T>()
}

fun main() {
    val items = listOf(1, "hello", 2.0, "world")
    val strings = findByType<String>(items)
    println(strings)
}`,
      hints: [
        'reified eliminates the need to pass KClass explicitly.',
        'filterIsInstance<T>() works directly with reified T.',
        'The call site becomes cleaner: findByType<String>(items).',
      ],
      concepts: ['reified', 'filterIsInstance', 'refactoring'],
    },
  ],
};
