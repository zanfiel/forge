/**
 * kotlin.ts - Kotlin learning track
 *
 * Modern JVM language built by JetBrains. First-class for Android development,
 * powerful for server-side, and growing fast in multiplatform.
 * Exercises emphasize Kotlin idioms: null safety, data classes, coroutines, extension functions.
 */

import type { Track } from '../../stores/app.svelte.ts';

export const track: Track = {
  id: 'kotlin',
  name: 'Kotlin',
  language: 'kotlin',
  monacoLang: 'kotlin',
  icon: '🟣',
  description: 'Modern JVM language. Android development, server-side, and multiplatform.',
  sections: [
    // ─── 1. Variables & Types ────────────────────
    {
      id: 'kt-variables',
      title: '1. Variables & Types',
      explanation: `## Variables & Types

Kotlin has two kinds of variable declarations: \`val\` (immutable) and \`var\` (mutable).

\`\`\`kotlin
val name = "Zan"          // immutable (like final/const)
var count = 0             // mutable (can be reassigned)
count = 5                 // ok
// name = "other"         // ERROR: val cannot be reassigned
\`\`\`

**Type inference** means you usually don't need to write the type:
\`\`\`kotlin
val greeting = "Hello"    // inferred as String
val port = 4200           // inferred as Int
val pi = 3.14             // inferred as Double
val active = true         // inferred as Boolean
\`\`\`

But you can be explicit when you want:
\`\`\`kotlin
val host: String = "0.0.0.0"
val port: Int = 8080
\`\`\`

**Null safety** is built into the type system. Types are non-null by default:
\`\`\`kotlin
var name: String = "Zan"     // cannot be null
var nickname: String? = null // nullable (note the ?)

// Safe call operator (?.)
println(nickname?.length)    // prints null (no crash)

// Elvis operator (?:)
val len = nickname?.length ?: 0  // 0 if nickname is null

// Non-null assertion (!!) - throws if null
// val len = nickname!!.length   // dangerous, avoid if possible
\`\`\`

**String templates** embed expressions directly:
\`\`\`kotlin
val name = "Zan"
println("Hello, $name!")                    // simple variable
println("Name length: \${name.length}")     // expression in \${}
\`\`\``,
      exercises: [
        {
          id: 'kt-var-1',
          title: 'Val, Var & Type Inference',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'kotlin',
          goal: 'Declare variables using val and var with correct mutability. Use type inference where possible.',
          skeleton: `fun main() {
    // Immutable server name (cannot change)
    __BLANK__ serverName = "rocky"

    // Mutable request count (will be incremented)
    __BLANK__ requestCount = 0

    // Increment the count
    requestCount __BLANK__ 1
    requestCount += 1

    // Explicit type: port number
    val port__BLANK__ Int = 4200

    // String template to print status
    println("__BLANK__serverName on port __BLANK__port: __BLANK__{requestCount} requests")
}`,
          solution: `fun main() {
    val serverName = "rocky"

    var requestCount = 0

    requestCount += 1
    requestCount += 1

    val port: Int = 4200

    println("$serverName on port $port: \${requestCount} requests")
}`,
          hints: [
            '`val` declares an immutable variable (cannot be reassigned). `var` declares a mutable one.',
            '`+=` adds and reassigns. Explicit types use a colon: `val port: Int = 4200`.',
            'String templates use `$variable` for simple references and `${expression}` for complex expressions.',
          ],
          concepts: ['val', 'var', 'type inference', 'explicit types', 'string templates', '+='],
        },
        {
          id: 'kt-var-2',
          title: 'Null Safety',
          type: 'fix-bug',
          difficulty: 'beginner',
          language: 'kotlin',
          goal: 'Fix the null safety errors. The code crashes because it treats nullable types as non-null.',
          skeleton: `fun main() {
    val servers: Map<String, String> = mapOf(
        "rocky" to "192.168.8.133",
        "pangolin" to "46.225.188.154"
    )

    // BUG: Map.get() returns String? (nullable), but we treat it as String
    val rockyIp: String = servers["rocky"]
    println("Rocky: $rockyIp")

    // BUG: This key doesn't exist, will be null
    val forgeIp: String = servers["forge-box"]
    println("Forge: $forgeIp")

    // BUG: Calling .length on a nullable without safe call
    val nickname: String? = null
    println("Nickname length: ${nickname.length}")
}`,
          solution: `fun main() {
    val servers: Map<String, String> = mapOf(
        "rocky" to "192.168.8.133",
        "pangolin" to "46.225.188.154"
    )

    val rockyIp: String? = servers["rocky"]
    println("Rocky: $rockyIp")

    val forgeIp: String = servers["forge-box"] ?: "unknown"
    println("Forge: $forgeIp")

    val nickname: String? = null
    println("Nickname length: \${nickname?.length ?: 0}")
}`,
          hints: [
            'Map indexing returns a nullable type (`String?`). Either make the variable nullable or provide a default.',
            'The Elvis operator `?:` provides a fallback: `servers["forge-box"] ?: "unknown"` returns "unknown" if null.',
            'Use the safe call operator `?.` to avoid crashing on null: `nickname?.length` returns null instead of throwing.',
          ],
          concepts: ['nullable types', 'String?', 'safe call ?.', 'Elvis operator ?:', 'Map.get'],
        },
        {
          id: 'kt-var-3',
          title: 'Type Inference & Smart Casts',
          type: 'predict-output',
          difficulty: 'beginner',
          language: 'kotlin',
          goal: 'Read the code and predict the output. Pay attention to how Kotlin infers types and smart-casts.',
          skeleton: `fun describe(value: Any): String {
    return when (value) {
        is String -> "String of length \${value.length}"
        is Int -> "Int: \${value * 2}"
        is Boolean -> if (value) "TRUE" else "FALSE"
        is List<*> -> "List with \${value.size} items"
        else -> "Unknown type"
    }
}

fun main() {
    println(describe("Kotlin"))
    println(describe(21))
    println(describe(false))
    println(describe(listOf(1, 2, 3)))
    println(describe(3.14))
}

// What does this program print?
// Line 1: ???
// Line 2: ???
// Line 3: ???
// Line 4: ???
// Line 5: ???`,
          solution: `fun describe(value: Any): String {
    return when (value) {
        is String -> "String of length \${value.length}"
        is Int -> "Int: \${value * 2}"
        is Boolean -> if (value) "TRUE" else "FALSE"
        is List<*> -> "List with \${value.size} items"
        else -> "Unknown type"
    }
}

fun main() {
    println(describe("Kotlin"))
    println(describe(21))
    println(describe(false))
    println(describe(listOf(1, 2, 3)))
    println(describe(3.14))
}

// Line 1: String of length 6
// Line 2: Int: 42
// Line 3: FALSE
// Line 4: List with 3 items
// Line 5: Unknown type`,
          hints: [
            '`when` with `is` checks the type. After the check, Kotlin smart-casts the value so you can use type-specific members.',
            '"Kotlin" has 6 characters. `21 * 2 = 42`. `false` hits the else branch of the if expression.',
            '`3.14` is a Double, which matches none of the specific cases, so it falls through to `else`.',
          ],
          concepts: ['when expression', 'is check', 'smart cast', 'Any type', 'List<*>', 'type checking'],
        },
      ],
    },

    // ─── 2. Functions & Lambdas ──────────────────
    {
      id: 'kt-functions',
      title: '2. Functions & Lambdas',
      explanation: `## Functions & Lambdas

Functions use the \`fun\` keyword. Kotlin supports **single-expression functions** for concise code:

\`\`\`kotlin
// Standard function
fun add(a: Int, b: Int): Int {
    return a + b
}

// Single-expression (= instead of block body)
fun add(a: Int, b: Int): Int = a + b

// Return type can be inferred for single-expression
fun add(a: Int, b: Int) = a + b
\`\`\`

**Default and named parameters:**
\`\`\`kotlin
fun greet(name: String, greeting: String = "Hello") = "\$greeting, \$name!"
greet("Zan")                    // "Hello, Zan!"
greet("Zan", greeting = "Hi")  // "Hi, Zan!"
\`\`\`

**Lambdas** are anonymous functions wrapped in curly braces:
\`\`\`kotlin
val double = { x: Int -> x * 2 }
println(double(5))  // 10

// If the lambda is the last argument, move it outside parentheses
listOf(1, 2, 3).map { it * 2 }    // [2, 4, 6]
\`\`\`

**Higher-order functions** take or return functions:
\`\`\`kotlin
fun applyTwice(x: Int, operation: (Int) -> Int): Int {
    return operation(operation(x))
}
applyTwice(3) { it + 10 }  // 23 (3+10=13, 13+10=23)
\`\`\`

**Extension functions** add methods to existing types:
\`\`\`kotlin
fun String.shout() = this.uppercase() + "!!!"
"hello".shout()  // "HELLO!!!"
\`\`\``,
      exercises: [
        {
          id: 'kt-fn-1',
          title: 'Fun & Single-Expression',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'kotlin',
          goal: 'Complete the functions using standard and single-expression syntax. Use default parameters.',
          skeleton: `// Standard function: returns the larger of two numbers
__BLANK__ maxOf(a: Int, b: Int): __BLANK__ {
    return if (a > b) a else b
}

// Single-expression: clamp a value between min and max
fun clamp(value: Int, min: Int, max: Int) __BLANK__ maxOf(min, minOf(value, max))

// Default parameters: build a connection string
fun connectionString(
    host: String __BLANK__ "localhost",
    port: Int = 5432,
    db: String = "main"
) = "jdbc:postgresql://__BLANK__host:__BLANK__port/__BLANK__db"

fun main() {
    println(maxOf(10, 20))                     // 20
    println(clamp(150, 0, 100))                // 100
    println(clamp(-5, 0, 100))                 // 0
    println(connectionString())                // jdbc:postgresql://localhost:5432/main
    println(connectionString(host = "rocky", db = "forge"))
    // jdbc:postgresql://rocky:5432/forge
}`,
          solution: `fun maxOf(a: Int, b: Int): Int {
    return if (a > b) a else b
}

fun clamp(value: Int, min: Int, max: Int) = maxOf(min, minOf(value, max))

fun connectionString(
    host: String = "localhost",
    port: Int = 5432,
    db: String = "main"
) = "jdbc:postgresql://$host:$port/$db"

fun main() {
    println(maxOf(10, 20))
    println(clamp(150, 0, 100))
    println(clamp(-5, 0, 100))
    println(connectionString())
    println(connectionString(host = "rocky", db = "forge"))
}`,
          hints: [
            '`fun` declares a function. The return type goes after the colon: `fun maxOf(...): Int`.',
            'Single-expression functions use `=` instead of a block body. No `return` needed.',
            'Default parameters use `=` after the type: `host: String = "localhost"`. Use `$` for string templates.',
          ],
          concepts: ['fun', 'return type', 'single-expression function', 'default parameters', 'named arguments'],
        },
        {
          id: 'kt-fn-2',
          title: 'Lambdas & it',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'kotlin',
          goal: 'Write a function `retry` that takes a maxAttempts Int and an action lambda `() -> Boolean`. It calls the action up to maxAttempts times, stopping early if the action returns true (success). Return the number of attempts made.',
          skeleton: `// Write the retry function here


fun main() {
    var callCount = 0

    // Simulates a flaky operation that succeeds on the 3rd try
    val attempts = retry(5) {
        callCount++
        callCount >= 3  // succeeds when callCount reaches 3
    }

    println("Succeeded after $attempts attempts")  // "Succeeded after 3 attempts"

    callCount = 0
    val failed = retry(2) {
        callCount++
        false  // always fails
    }
    println("Failed after $failed attempts")  // "Failed after 2 attempts"
}`,
          solution: `fun retry(maxAttempts: Int, action: () -> Boolean): Int {
    for (attempt in 1..maxAttempts) {
        if (action()) return attempt
    }
    return maxAttempts
}

fun main() {
    var callCount = 0

    val attempts = retry(5) {
        callCount++
        callCount >= 3
    }

    println("Succeeded after $attempts attempts")

    callCount = 0
    val failed = retry(2) {
        callCount++
        false
    }
    println("Failed after $failed attempts")
}`,
          hints: [
            'The function signature: `fun retry(maxAttempts: Int, action: () -> Boolean): Int`. The lambda type `() -> Boolean` takes no args and returns a Boolean.',
            'Use a `for (attempt in 1..maxAttempts)` loop. Call `action()` and check if it returned true.',
            'If `action()` returns true, `return attempt` immediately. If the loop finishes without success, return `maxAttempts`.',
          ],
          concepts: ['higher-order functions', 'lambda parameters', '() -> Boolean', 'trailing lambda', 'early return'],
        },
        {
          id: 'kt-fn-3',
          title: 'Extension Functions',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'kotlin',
          goal: 'Write three extension functions: `String.wordCount()` that returns the number of words, `List<Int>.median()` that returns the median as a Double, and `Int.ordinal()` that returns the ordinal string (e.g. 1 -> "1st", 2 -> "2nd", 3 -> "3rd", 4 -> "4th").',
          skeleton: `// Write the three extension functions here


fun main() {
    println("the quick brown fox".wordCount())   // 4
    println("hello world".wordCount())            // 2
    println("   ".wordCount())                    // 0

    println(listOf(3, 1, 4, 1, 5).median())      // 3.0
    println(listOf(1, 2, 3, 4).median())          // 2.5

    println(1.ordinal())   // "1st"
    println(2.ordinal())   // "2nd"
    println(3.ordinal())   // "3rd"
    println(4.ordinal())   // "4th"
    println(11.ordinal())  // "11th"
    println(21.ordinal())  // "21st"
}`,
          solution: `fun String.wordCount(): Int {
    val trimmed = this.trim()
    if (trimmed.isEmpty()) return 0
    return trimmed.split("\\\\s+".toRegex()).size
}

fun List<Int>.median(): Double {
    val sorted = this.sorted()
    val mid = sorted.size / 2
    return if (sorted.size % 2 == 0) {
        (sorted[mid - 1] + sorted[mid]) / 2.0
    } else {
        sorted[mid].toDouble()
    }
}

fun Int.ordinal(): String {
    val suffix = when {
        this % 100 in 11..13 -> "th"
        this % 10 == 1 -> "st"
        this % 10 == 2 -> "nd"
        this % 10 == 3 -> "rd"
        else -> "th"
    }
    return "\${this}\$suffix"
}

fun main() {
    println("the quick brown fox".wordCount())
    println("hello world".wordCount())
    println("   ".wordCount())

    println(listOf(3, 1, 4, 1, 5).median())
    println(listOf(1, 2, 3, 4).median())

    println(1.ordinal())
    println(2.ordinal())
    println(3.ordinal())
    println(4.ordinal())
    println(11.ordinal())
    println(21.ordinal())
}`,
          hints: [
            'Extension functions use `fun Type.name()` syntax. Inside the function, `this` refers to the receiver object.',
            'For `wordCount`, trim first and check for empty. Split on regex `\\\\s+` for whitespace. For `median`, sort first, then check even vs odd size.',
            'For `ordinal`, 11/12/13 are special (always "th"). Otherwise check the last digit: 1="st", 2="nd", 3="rd", rest="th".',
          ],
          concepts: ['extension functions', 'this receiver', 'String.split', 'regex', 'when expression', 'sorted'],
        },
      ],
    },

    // ─── 3. Collections & Sequences ──────────────
    {
      id: 'kt-collections',
      title: '3. Collections & Sequences',
      explanation: `## Collections & Sequences

Kotlin has immutable and mutable collection types:

\`\`\`kotlin
// Immutable (read-only)
val names = listOf("Alice", "Bob", "Charlie")
val scores = mapOf("Alice" to 95, "Bob" to 87)
val tags = setOf("kotlin", "jvm", "android")

// Mutable
val items = mutableListOf("a", "b")
items.add("c")
val config = mutableMapOf("host" to "localhost")
config["port"] = "4200"
\`\`\`

**Functional operations** work like JavaScript array methods but are more powerful:
\`\`\`kotlin
val numbers = listOf(1, 2, 3, 4, 5, 6)

numbers.filter { it > 3 }          // [4, 5, 6]
numbers.map { it * 10 }            // [10, 20, 30, 40, 50, 60]
numbers.reduce { acc, n -> acc + n }  // 21 (sum)
numbers.fold(100) { acc, n -> acc + n }  // 121 (sum starting from 100)

numbers.groupBy { if (it % 2 == 0) "even" else "odd" }
// {odd=[1, 3, 5], even=[2, 4, 6]}

numbers.partition { it > 3 }
// Pair([4, 5, 6], [1, 2, 3])
\`\`\`

**Sequences** are lazy (like Java streams). Use them for large collections:
\`\`\`kotlin
val result = (1..1_000_000).asSequence()
    .filter { it % 7 == 0 }
    .map { it * it }
    .take(5)
    .toList()
// Only processes elements until 5 results are found
\`\`\`

**Destructuring:**
\`\`\`kotlin
val (name, score) = Pair("Alice", 95)
for ((key, value) in mapOf("a" to 1, "b" to 2)) {
    println("$key = $value")
}
\`\`\``,
      exercises: [
        {
          id: 'kt-col-1',
          title: 'listOf & mapOf Basics',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'kotlin',
          goal: 'Create and query immutable collections using Kotlin standard library functions.',
          skeleton: `fun main() {
    // Create an immutable list of server names
    val servers = __BLANK__("rocky", "pangolin", "forge-box", "bav-apps")

    // Create a map of server -> IP
    val ips = __BLANK__(
        "rocky" __BLANK__ "192.168.8.133",
        "pangolin" __BLANK__ "46.225.188.154"
    )

    // Get the number of servers
    println("Server count: __BLANK__{servers.__BLANK__}")  // 4

    // Check if a server exists
    println("Has rocky: \${servers.__BLANK__("rocky")}")  // true

    // Get an IP with a fallback for missing keys
    val forgeIp = ips.__BLANK__("forge-box") ?: "not mapped"
    println("Forge IP: $forgeIp")  // "not mapped"

    // Iterate with index
    for ((index, name) in servers.__BLANK__()) {
        println("$index: $name")
    }
}`,
          solution: `fun main() {
    val servers = listOf("rocky", "pangolin", "forge-box", "bav-apps")

    val ips = mapOf(
        "rocky" to "192.168.8.133",
        "pangolin" to "46.225.188.154"
    )

    println("Server count: \${servers.size}")

    println("Has rocky: \${servers.contains("rocky")}")

    val forgeIp = ips["forge-box"] ?: "not mapped"
    println("Forge IP: $forgeIp")

    for ((index, name) in servers.withIndex()) {
        println("$index: $name")
    }
}`,
          hints: [
            '`listOf(...)` creates an immutable list. `mapOf(...)` creates an immutable map with `key to value` pairs.',
            '`.size` gives the count. `.contains()` checks membership. Map indexing with `["key"]` returns nullable.',
            '`.withIndex()` gives you `(index, element)` pairs for destructuring in a for loop.',
          ],
          concepts: ['listOf', 'mapOf', 'to infix', 'size', 'contains', 'index operator', 'withIndex'],
        },
        {
          id: 'kt-col-2',
          title: 'Filter, Map, Reduce',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'kotlin',
          goal: 'Write a function `analyzeScores` that takes a Map<String, List<Int>> of student names to their test scores and returns a Map<String, String> where each student is mapped to a summary like "avg: 85.0, grade: B". Grading: A >= 90, B >= 80, C >= 70, D >= 60, F below 60. Only include students who took at least 2 tests.',
          skeleton: `// Write analyzeScores here


fun main() {
    val students = mapOf(
        "Alice" to listOf(95, 88, 92),
        "Bob" to listOf(72, 68, 75),
        "Charlie" to listOf(100),         // only 1 test, exclude
        "Diana" to listOf(55, 62, 58)
    )

    val results = analyzeScores(students)
    results.forEach { (name, summary) ->
        println("$name: $summary")
    }
    // Alice: avg: 91.7, grade: A
    // Bob: avg: 71.7, grade: C
    // Diana: avg: 58.3, grade: F
}`,
          solution: `fun analyzeScores(students: Map<String, List<Int>>): Map<String, String> {
    return students
        .filter { (_, scores) -> scores.size >= 2 }
        .map { (name, scores) ->
            val avg = scores.average()
            val grade = when {
                avg >= 90 -> "A"
                avg >= 80 -> "B"
                avg >= 70 -> "C"
                avg >= 60 -> "D"
                else -> "F"
            }
            name to "avg: ${"%.1f".format(avg)}, grade: $grade"
        }
        .toMap()
}

fun main() {
    val students = mapOf(
        "Alice" to listOf(95, 88, 92),
        "Bob" to listOf(72, 68, 75),
        "Charlie" to listOf(100),
        "Diana" to listOf(55, 62, 58)
    )

    val results = analyzeScores(students)
    results.forEach { (name, summary) ->
        println("$name: $summary")
    }
}`,
          hints: [
            '`.filter { (_, scores) -> scores.size >= 2 }` removes students with fewer than 2 tests. Destructure the map entries.',
            '`.average()` computes the mean of a list of numbers. Use `when` to assign a letter grade based on ranges.',
            '`.map { (name, scores) -> name to "..." }` produces pairs. Call `.toMap()` to convert back to a Map.',
          ],
          concepts: ['filter on map', 'destructuring', 'average', 'when expression', 'map to pairs', 'toMap'],
        },
        {
          id: 'kt-col-3',
          title: 'Sequence Pipeline',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'kotlin',
          goal: 'Write a function `generatePasswords` that uses a Sequence to lazily generate random-looking passwords. It takes a count and length parameter. Each password should be built from the characters a-z, A-Z, 0-9 using a seeded approach: for position i in password j, use the character at index ((j * length + i) * 31 + 17) % chars.length from the character set. Return a List<String>.',
          skeleton: `// Write generatePasswords here


fun main() {
    val passwords = generatePasswords(count = 5, length = 12)
    passwords.forEach { println(it) }
    println("Generated \${passwords.size} passwords of length \${passwords[0].length}")
}`,
          solution: `fun generatePasswords(count: Int, length: Int): List<String> {
    val chars = ('a'..'z') + ('A'..'Z') + ('0'..'9')
    return generateSequence(0) { it + 1 }
        .take(count)
        .map { j ->
            (0 until length).map { i ->
                chars[((j * length + i) * 31 + 17) % chars.size]
            }.joinToString("")
        }
        .toList()
}

fun main() {
    val passwords = generatePasswords(count = 5, length = 12)
    passwords.forEach { println(it) }
    println("Generated \${passwords.size} passwords of length \${passwords[0].length}")
}`,
          hints: [
            '`generateSequence(0) { it + 1 }` creates an infinite sequence of incrementing integers. Use `.take(count)` to limit it.',
            'Build the char pool with ranges: `(\'a\'..\'z\') + (\'A\'..\'Z\') + (\'0\'..\'9\')` creates a List<Char>.',
            'For each password index j, map over `(0 until length)` to pick characters using the formula, then `.joinToString("")`.',
          ],
          concepts: ['generateSequence', 'lazy evaluation', 'take', 'CharRange', 'joinToString', 'nested map'],
        },
      ],
    },

    // ─── 4. Classes & Data Classes ───────────────
    {
      id: 'kt-classes',
      title: '4. Classes & Data Classes',
      explanation: `## Classes & Data Classes

Kotlin classes are concise. Constructor parameters can declare properties directly:

\`\`\`kotlin
class Server(val name: String, val ip: String, var online: Boolean = false) {
    fun status() = "$name ($ip) - \${if (online) "UP" else "DOWN"}"
}

val srv = Server("rocky", "192.168.8.133", online = true)
println(srv.status())  // "rocky (192.168.8.133) - UP"
\`\`\`

**Data classes** auto-generate \`equals\`, \`hashCode\`, \`toString\`, \`copy\`, and destructuring:
\`\`\`kotlin
data class User(val name: String, val email: String, val active: Boolean = true)

val user = User("Zan", "zan@zanverse.lol")
println(user)  // User(name=Zan, email=zan@zanverse.lol, active=true)

val inactive = user.copy(active = false)  // copy with one field changed
val (name, email) = user                  // destructuring
\`\`\`

**Sealed classes** restrict inheritance to a closed set of subclasses (perfect for state machines):
\`\`\`kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
    data object Loading : Result<Nothing>()
}

fun handle(result: Result<String>) = when (result) {
    is Result.Success -> "Got: \${result.data}"
    is Result.Error -> "Failed: \${result.message}"
    is Result.Loading -> "Loading..."
    // no else needed - sealed class is exhaustive!
}
\`\`\`

**Object declarations** create singletons:
\`\`\`kotlin
object Database {
    val url = "jdbc:postgresql://localhost:5432/main"
    fun connect() = println("Connected to $url")
}
Database.connect()
\`\`\`

**Companion objects** hold static-like members:
\`\`\`kotlin
class Config private constructor(val host: String, val port: Int) {
    companion object {
        fun default() = Config("0.0.0.0", 8080)
        fun fromEnv() = Config(
            System.getenv("HOST") ?: "0.0.0.0",
            System.getenv("PORT")?.toIntOrNull() ?: 8080
        )
    }
}
val cfg = Config.default()
\`\`\``,
      exercises: [
        {
          id: 'kt-class-1',
          title: 'Data Classes & Copy',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'kotlin',
          goal: 'Define and use data classes with copy and destructuring.',
          skeleton: `// Define a data class for a server endpoint
__BLANK__ class Endpoint(
    val host: String,
    val port: Int,
    val protocol: String __BLANK__ "https"
)

fun main() {
    val prod = Endpoint("api.zanverse.lol", 443)
    println(prod)  // Endpoint(host=api.zanverse.lol, port=443, protocol=https)

    // Create a dev copy with different host and port
    val dev = prod.__BLANK__(host = "localhost", port = 8080, protocol = "http")
    println(dev)  // Endpoint(host=localhost, port=8080, protocol=http)

    // Destructuring
    val (__BLANK__, __BLANK__, __BLANK__) = dev
    println("$protocol://$host:$port")  // "http://localhost:8080"

    // Data classes get equals() for free
    val other = Endpoint("api.zanverse.lol", 443)
    println(prod __BLANK__ other)  // true (structural equality)
}`,
          solution: `data class Endpoint(
    val host: String,
    val port: Int,
    val protocol: String = "https"
)

fun main() {
    val prod = Endpoint("api.zanverse.lol", 443)
    println(prod)

    val dev = prod.copy(host = "localhost", port = 8080, protocol = "http")
    println(dev)

    val (host, port, protocol) = dev
    println("$protocol://$host:$port")

    val other = Endpoint("api.zanverse.lol", 443)
    println(prod == other)
}`,
          hints: [
            '`data` before `class` makes it a data class. Default parameter values use `=` after the type.',
            '`.copy()` creates a new instance with specified fields changed. Destructuring unpacks in declaration order.',
            '`==` in Kotlin checks structural equality (calls `.equals()`). Data classes auto-generate `equals` based on all properties.',
          ],
          concepts: ['data class', 'copy', 'destructuring', 'default parameters', '== structural equality'],
        },
        {
          id: 'kt-class-2',
          title: 'Sealed Classes for State',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'kotlin',
          goal: 'Define a sealed class `NetworkState` with three subclasses: `Disconnected` (object), `Connecting` (data class with host: String), and `Connected` (data class with host: String, latencyMs: Int). Write a function `describeState` that returns a human-readable description using when.',
          skeleton: `// Define the sealed class and subclasses here


// Write describeState here


fun main() {
    val states = listOf(
        NetworkState.Disconnected,
        NetworkState.Connecting("rocky"),
        NetworkState.Connected("rocky", 12),
        NetworkState.Connecting("pangolin"),
        NetworkState.Connected("pangolin", 45)
    )

    states.forEach { println(describeState(it)) }
    // "Disconnected - waiting for connection"
    // "Connecting to rocky..."
    // "Connected to rocky (12ms latency)"
    // "Connecting to pangolin..."
    // "Connected to pangolin (45ms latency)"
}`,
          solution: `sealed class NetworkState {
    data object Disconnected : NetworkState()
    data class Connecting(val host: String) : NetworkState()
    data class Connected(val host: String, val latencyMs: Int) : NetworkState()
}

fun describeState(state: NetworkState): String = when (state) {
    is NetworkState.Disconnected -> "Disconnected - waiting for connection"
    is NetworkState.Connecting -> "Connecting to \${state.host}..."
    is NetworkState.Connected -> "Connected to \${state.host} (\${state.latencyMs}ms latency)"
}

fun main() {
    val states = listOf(
        NetworkState.Disconnected,
        NetworkState.Connecting("rocky"),
        NetworkState.Connected("rocky", 12),
        NetworkState.Connecting("pangolin"),
        NetworkState.Connected("pangolin", 45)
    )

    states.forEach { println(describeState(it)) }
}`,
          hints: [
            '`sealed class NetworkState` restricts all subclasses to be defined in the same file. Use `data object` for singleton, `data class` for classes with data.',
            'Subclasses inherit from the sealed class: `data class Connecting(val host: String) : NetworkState()`.',
            '`when` on a sealed class is exhaustive - no `else` needed. Smart cast lets you access `state.host` after `is Connecting`.',
          ],
          concepts: ['sealed class', 'data object', 'data class inheritance', 'exhaustive when', 'smart cast'],
        },
        {
          id: 'kt-class-3',
          title: 'Object & Companion Object',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'kotlin',
          goal: 'Create a `Logger` singleton object with a mutable list of log entries and methods: `info(msg)`, `error(msg)`, and `dump()` which returns all entries joined by newlines. Each entry should be formatted as "[INFO] msg" or "[ERROR] msg". Also create a `ServiceConfig` class with a private constructor and a companion object factory method `create` that takes optional host (default "0.0.0.0") and port (default 8080).',
          skeleton: `// Write the Logger object here


// Write the ServiceConfig class with companion object here


fun main() {
    Logger.info("Server starting")
    Logger.error("Port already in use")
    Logger.info("Retrying on fallback port")
    println(Logger.dump())
    // [INFO] Server starting
    // [ERROR] Port already in use
    // [INFO] Retrying on fallback port

    val cfg = ServiceConfig.create(host = "rocky", port = 4200)
    println(cfg)

    val defaultCfg = ServiceConfig.create()
    println(defaultCfg)
}`,
          solution: `object Logger {
    private val entries = mutableListOf<String>()

    fun info(msg: String) {
        entries.add("[INFO] $msg")
    }

    fun error(msg: String) {
        entries.add("[ERROR] $msg")
    }

    fun dump(): String = entries.joinToString("\\n")
}

data class ServiceConfig private constructor(val host: String, val port: Int) {
    companion object {
        fun create(host: String = "0.0.0.0", port: Int = 8080) = ServiceConfig(host, port)
    }
}

fun main() {
    Logger.info("Server starting")
    Logger.error("Port already in use")
    Logger.info("Retrying on fallback port")
    println(Logger.dump())

    val cfg = ServiceConfig.create(host = "rocky", port = 4200)
    println(cfg)

    val defaultCfg = ServiceConfig.create()
    println(defaultCfg)
}`,
          hints: [
            '`object Logger { ... }` creates a singleton. Use `mutableListOf<String>()` for the entries.',
            'Private constructor: `data class ServiceConfig private constructor(...)`. The companion object can still call it.',
            '`companion object { fun create(...) = ServiceConfig(...) }` acts as a factory. `joinToString("\\n")` joins with newlines.',
          ],
          concepts: ['object singleton', 'companion object', 'factory pattern', 'private constructor', 'mutableListOf', 'joinToString'],
        },
      ],
    },

    // ─── 5. Coroutines & Flow ────────────────────
    {
      id: 'kt-coroutines',
      title: '5. Coroutines & Flow',
      explanation: `## Coroutines & Flow

Coroutines are Kotlin's approach to asynchronous programming. They're lightweight threads managed by the runtime:

\`\`\`kotlin
import kotlinx.coroutines.*

// suspend functions can pause and resume without blocking a thread
suspend fun fetchUser(id: Int): String {
    delay(1000)  // non-blocking delay (unlike Thread.sleep)
    return "User #$id"
}

fun main() = runBlocking {   // creates a coroutine scope
    val user = fetchUser(42)
    println(user)  // "User #42" after 1 second
}
\`\`\`

**Launching coroutines:**
\`\`\`kotlin
fun main() = runBlocking {
    // launch: fire-and-forget (returns Job)
    val job = launch {
        delay(1000)
        println("World!")
    }
    println("Hello,")  // prints immediately
    job.join()          // wait for the coroutine to finish

    // async: returns a Deferred (like a Promise/Future)
    val deferred = async {
        delay(500)
        42
    }
    val result = deferred.await()  // suspends until result is ready
    println("Answer: $result")
}
\`\`\`

**Structured concurrency** means child coroutines are bound to their parent scope:
\`\`\`kotlin
coroutineScope {
    launch { fetchUser(1) }   // child 1
    launch { fetchUser(2) }   // child 2
    // scope waits for both to finish
}
\`\`\`

**Flow** is Kotlin's reactive stream. It emits values asynchronously:
\`\`\`kotlin
import kotlinx.coroutines.flow.*

fun tickerFlow(interval: Long, count: Int): Flow<Int> = flow {
    for (i in 1..count) {
        delay(interval)
        emit(i)          // emit a value downstream
    }
}

fun main() = runBlocking {
    tickerFlow(500, 5)
        .filter { it % 2 == 0 }
        .map { "Tick #$it" }
        .collect { println(it) }
    // "Tick #2" (after 1s)
    // "Tick #4" (after 2s)
}
\`\`\`

Flows are cold (nothing happens until \`.collect()\` is called) and support all the familiar operators: \`.filter\`, \`.map\`, \`.take\`, \`.zip\`, \`.combine\`, etc.`,
      exercises: [
        {
          id: 'kt-co-1',
          title: 'Suspend & Launch',
          type: 'fill-blank',
          difficulty: 'advanced',
          language: 'kotlin',
          goal: 'Complete the coroutine code to fetch data concurrently and combine the results.',
          skeleton: `import kotlinx.coroutines.*

// A suspend function that simulates a network call
__BLANK__ fun fetchConfig(key: String): String {
    delay(500)  // simulates network latency
    return when (key) {
        "host" -> "0.0.0.0"
        "port" -> "4200"
        "mode" -> "production"
        else -> "unknown"
    }
}

fun main() = __BLANK__ {
    println("Fetching config...")

    // Launch two fetches concurrently using async
    val hostDeferred = __BLANK__ { fetchConfig("host") }
    val portDeferred = __BLANK__ { fetchConfig("port") }

    // Wait for both results
    val host = hostDeferred.__BLANK__()
    val port = portDeferred.__BLANK__()

    println("Server: $host:$port")

    // Launch a background job
    val monitor = __BLANK__ {
        repeat(3) { i ->
            __BLANK__(300)
            println("Health check #\${i + 1}")
        }
    }

    monitor.__BLANK__()  // wait for monitor to finish
    println("All done")
}`,
          solution: `import kotlinx.coroutines.*

suspend fun fetchConfig(key: String): String {
    delay(500)
    return when (key) {
        "host" -> "0.0.0.0"
        "port" -> "4200"
        "mode" -> "production"
        else -> "unknown"
    }
}

fun main() = runBlocking {
    println("Fetching config...")

    val hostDeferred = async { fetchConfig("host") }
    val portDeferred = async { fetchConfig("port") }

    val host = hostDeferred.await()
    val port = portDeferred.await()

    println("Server: $host:$port")

    val monitor = launch {
        repeat(3) { i ->
            delay(300)
            println("Health check #\${i + 1}")
        }
    }

    monitor.join()
    println("All done")
}`,
          hints: [
            '`suspend` marks a function that can be paused. `runBlocking` creates a coroutine scope for main.',
            '`async` launches a coroutine that returns a result. `.await()` suspends until the result is ready.',
            '`launch` starts a fire-and-forget coroutine. `delay()` is a non-blocking sleep. `.join()` waits for completion.',
          ],
          concepts: ['suspend', 'runBlocking', 'async', 'await', 'launch', 'delay', 'join', 'Deferred'],
        },
        {
          id: 'kt-co-2',
          title: 'Flow Basics',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'kotlin',
          goal: 'Write a function `serverMetrics` that returns a Flow<Map<String, Int>> emitting simulated server metrics. It should emit a map with "cpu", "memory", and "connections" values for each tick, using a deterministic formula: cpu = (tick * 17 + 30) % 100, memory = (tick * 13 + 45) % 100, connections = (tick * 7 + 10) % 200. The flow should emit `count` times with a `delayMs` interval between emissions. Also write a `collectAlerts` function that takes a Flow<Map<String, Int>> and returns a List<String> of alert messages for any metric where cpu > 80 or memory > 90.',
          skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

// Write serverMetrics flow here


// Write collectAlerts here


fun main() = runBlocking {
    val metrics = serverMetrics(count = 6, delayMs = 100)

    println("--- All metrics ---")
    metrics.collect { m ->
        println("cpu=\${m["cpu"]}% mem=\${m["memory"]}% conn=\${m["connections"]}")
    }

    println("\\n--- Alerts ---")
    val alerts = collectAlerts(serverMetrics(count = 6, delayMs = 50))
    alerts.forEach { println(it) }
}`,
          solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun serverMetrics(count: Int, delayMs: Long): Flow<Map<String, Int>> = flow {
    for (tick in 1..count) {
        delay(delayMs)
        emit(mapOf(
            "cpu" to (tick * 17 + 30) % 100,
            "memory" to (tick * 13 + 45) % 100,
            "connections" to (tick * 7 + 10) % 200
        ))
    }
}

suspend fun collectAlerts(metrics: Flow<Map<String, Int>>): List<String> {
    val alerts = mutableListOf<String>()
    metrics.collect { m ->
        val cpu = m["cpu"] ?: 0
        val memory = m["memory"] ?: 0
        if (cpu > 80) alerts.add("HIGH CPU: \${cpu}%")
        if (memory > 90) alerts.add("HIGH MEMORY: \${memory}%")
    }
    return alerts
}

fun main() = runBlocking {
    val metrics = serverMetrics(count = 6, delayMs = 100)

    println("--- All metrics ---")
    metrics.collect { m ->
        println("cpu=\${m["cpu"]}% mem=\${m["memory"]}% conn=\${m["connections"]}")
    }

    println("\\n--- Alerts ---")
    val alerts = collectAlerts(serverMetrics(count = 6, delayMs = 50))
    alerts.forEach { println(it) }
}`,
          hints: [
            '`flow { ... }` creates a cold Flow. Use `emit()` inside the block to send values downstream. `delay()` works inside flow builders.',
            'For `collectAlerts`, make it a `suspend` function. Call `.collect { ... }` on the flow and build up a list of alerts.',
            'Access map values with `m["cpu"] ?: 0` (with Elvis for safety). Check thresholds and add formatted alert strings.',
          ],
          concepts: ['Flow builder', 'emit', 'collect', 'cold stream', 'suspend function', 'flow with delay'],
        },
      ],
    },
  ],
};
