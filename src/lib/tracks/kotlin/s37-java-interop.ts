import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-java-interop',
  title: '37. Java Interop',
  explanation: `## Java Interop in Kotlin

Kotlin is designed for seamless interoperability with Java. You can call Java code from Kotlin and vice versa.

### Calling Java from Kotlin

\`\`\`kotlin
import java.util.ArrayList

val list = ArrayList<String>()
list.add("Hello")
println(list.size) // Property-style access
\`\`\`

### Platform Types

\`\`\`kotlin
// Java returns String! (platform type)
val result: String = javaObject.getName() // May throw NPE if null
val safe: String? = javaObject.getName() // Safe - nullable
\`\`\`

### SAM Conversions

\`\`\`kotlin
// Java interface with single method
val executor = java.util.concurrent.Executors.newSingleThreadExecutor()
executor.execute { println("Running") }  // SAM conversion from lambda
\`\`\`

### @JvmOverloads

\`\`\`kotlin
@JvmOverloads
fun greet(name: String, greeting: String = "Hello") = "\$greeting, \$name!"
// Java sees: greet(String) and greet(String, String)
\`\`\`

### @JvmStatic / @JvmField

\`\`\`kotlin
object Config {
    @JvmStatic fun load() { }   // Java: Config.load()
    @JvmField val VERSION = "1.0" // Java: Config.VERSION
}
\`\`\``,
  exercises: [
    {
      id: 'kt-java-interop-1',
      title: 'Use Java Collections',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Use Java collection classes from Kotlin.',
      skeleton: `import java.util.___

fun main() {
    val map = HashMap<String, Int>()
    map["Alice"] = 30
    map["Bob"] = 25
    println(map["Alice"])
}`,
      solution: `import java.util.HashMap

fun main() {
    val map = HashMap<String, Int>()
    map["Alice"] = 30
    map["Bob"] = 25
    println(map["Alice"])
}`,
      hints: [
        'Java collections are fully usable from Kotlin.',
        'Kotlin adds operator overloading for [] access.',
        'HashMap is in java.util package.',
      ],
      concepts: ['java-collections', 'operator-overloading'],
    },
    {
      id: 'kt-java-interop-2',
      title: 'SAM Conversion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Use a Kotlin lambda where a Java SAM interface is expected.',
      skeleton: `import java.util.concurrent.Executors

fun main() {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute ___ {
        println("Running in thread pool")
    }
    executor.shutdown()
}`,
      solution: `import java.util.concurrent.Executors

fun main() {
    val executor = Executors.newSingleThreadExecutor()
    executor.execute {
        println("Running in thread pool")
    }
    executor.shutdown()
}`,
      hints: [
        'SAM conversion automatically converts a lambda to a Java interface.',
        'Runnable has a single method run(), so a lambda works.',
        'No need to write object : Runnable { override fun run() { } }.',
      ],
      concepts: ['SAM-conversion', 'lambda', 'Runnable'],
    },
    {
      id: 'kt-java-interop-3',
      title: 'Platform Types',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Handle platform types safely with nullable annotations.',
      skeleton: `// Simulating Java code that may return null
fun javaGetName(): String? = null // Java would return String! (platform type)

fun main() {
    val name = javaGetName()
    // Safe handling of platform type
    println(name___length ___ 0)
}`,
      solution: `// Simulating Java code that may return null
fun javaGetName(): String? = null

fun main() {
    val name = javaGetName()
    println(name?.length ?: 0)
}`,
      hints: [
        'Platform types (String!) can be null.',
        'Use ?. for safe calls and ?: for default values.',
        'Always treat Java return values as potentially nullable.',
      ],
      concepts: ['platform-types', 'null-safety', 'safe-call'],
    },
    {
      id: 'kt-java-interop-4',
      title: '@JvmOverloads',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use @JvmOverloads for Java-compatible default parameters.',
      skeleton: `___
fun createUser(
    name: String,
    age: Int = 0,
    email: String = ""
): String = "User(\${name}, \${age}, \${email})"`,
      solution: `@JvmOverloads
fun createUser(
    name: String,
    age: Int = 0,
    email: String = ""
): String = "User(\${name}, \${age}, \${email})"`,
      hints: [
        '@JvmOverloads generates overloaded methods for Java.',
        'Java does not support default parameter values.',
        'This creates createUser(String), createUser(String, Int), createUser(String, Int, String).',
      ],
      concepts: ['JvmOverloads', 'default-parameters'],
    },
    {
      id: 'kt-java-interop-5',
      title: '@JvmName for File',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use @file:JvmName to set the class name for Java callers.',
      skeleton: `@file:___(\"StringUtils\")

package com.example

fun String.capitalize(): String = replaceFirstChar { it.uppercase() }
fun String.truncate(max: Int): String = if (length > max) take(max) + "..." else this`,
      solution: `@file:JvmName("StringUtils")

package com.example

fun String.capitalize(): String = replaceFirstChar { it.uppercase() }
fun String.truncate(max: Int): String = if (length > max) take(max) + "..." else this`,
      hints: [
        '@file:JvmName sets the generated class name for top-level functions.',
        'Java calls these as StringUtils.capitalize(str).',
        'Without it, Java would use the filename-based class name.',
      ],
      concepts: ['JvmName', 'file-annotation'],
    },
    {
      id: 'kt-java-interop-6',
      title: '@Throws for Java',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Declare checked exceptions for Java callers.',
      skeleton: `import java.io.IOException

___(IOException::class)
fun readConfig(path: String): String {
    val file = java.io.File(path)
    if (!file.exists()) throw IOException("File not found: \${path}")
    return file.readText()
}`,
      solution: `import java.io.IOException

@Throws(IOException::class)
fun readConfig(path: String): String {
    val file = java.io.File(path)
    if (!file.exists()) throw IOException("File not found: \${path}")
    return file.readText()
}`,
      hints: [
        '@Throws generates a throws clause in the bytecode.',
        'Java has checked exceptions; Kotlin does not.',
        'Without @Throws, Java callers cannot catch IOException in a try-catch.',
      ],
      concepts: ['Throws', 'checked-exceptions', 'java-interop'],
    },
    {
      id: 'kt-java-interop-7',
      title: 'Write Java-Friendly Kotlin Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a Kotlin class that is easy to use from Java.',
      skeleton: `// Write a class called AppConfig that:
// 1. Has companion object with @JvmStatic fun default(): AppConfig
// 2. Has @JvmField val APP_NAME = "MyApp" in companion
// 3. Has @JvmOverloads constructor(host: String, port: Int = 8080, debug: Boolean = false)
// 4. Has properties host, port, debug
// 5. Has override fun toString()`,
      solution: `class AppConfig @JvmOverloads constructor(
    val host: String,
    val port: Int = 8080,
    val debug: Boolean = false
) {
    companion object {
        @JvmField
        val APP_NAME = "MyApp"

        @JvmStatic
        fun default(): AppConfig = AppConfig("localhost")
    }

    override fun toString() = "AppConfig(host=\${host}, port=\${port}, debug=\${debug})"
}`,
      hints: [
        '@JvmOverloads on constructor generates multiple constructors for Java.',
        '@JvmStatic makes companion methods callable as static methods.',
        '@JvmField exposes constants without getter/setter.',
      ],
      concepts: ['JvmOverloads', 'JvmStatic', 'JvmField'],
    },
    {
      id: 'kt-java-interop-8',
      title: 'Write SAM Interface Usage',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write code that uses Java functional interfaces with Kotlin lambdas.',
      skeleton: `// Write:
// 1. A function called sortStrings that takes a MutableList<String>
// 2. Sorts it using java.util.Collections.sort with a Comparator
// 3. The comparator sorts by string length (shortest first)
// 4. Use SAM conversion (lambda) for the Comparator`,
      solution: `fun sortStrings(list: MutableList<String>) {
    java.util.Collections.sort(list) { a, b ->
        a.length.compareTo(b.length)
    }
}`,
      hints: [
        'Collections.sort takes a List and a Comparator.',
        'Comparator is a SAM interface - use a lambda.',
        'Compare by length using a.length.compareTo(b.length).',
      ],
      concepts: ['SAM-conversion', 'Comparator', 'lambda'],
    },
    {
      id: 'kt-java-interop-9',
      title: 'Write Kotlin Extension for Java Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write Kotlin extension functions for Java classes.',
      skeleton: `// Write extension functions for java.io.File:
// 1. fun File.ensureDirectory(): Boolean - creates dir if not exists, returns success
// 2. fun File.writeLines(lines: List<String>) - writes lines joined by newline
// 3. fun File.readLines(): List<String> - reads all lines
// 4. fun File.sizeInKb(): Double - returns size in kilobytes`,
      solution: `import java.io.File

fun File.ensureDirectory(): Boolean {
    return if (!exists()) mkdirs() else true
}

fun File.writeLines(lines: List<String>) {
    writeText(lines.joinToString("\\n"))
}

fun File.readAllLines(): List<String> {
    return readText().split("\\n")
}

fun File.sizeInKb(): Double {
    return length().toDouble() / 1024.0
}`,
      hints: [
        'Extension functions add methods to existing Java classes.',
        'Java classes get Kotlin-style APIs through extensions.',
        'These are compiled as static methods with the File as first parameter.',
      ],
      concepts: ['extension-function', 'java-class', 'File'],
    },
    {
      id: 'kt-java-interop-10',
      title: 'Write Null-Safe Java Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a wrapper that makes Java nullable APIs safe in Kotlin.',
      skeleton: `// Simulate Java methods that may return null
// Write a class SafeMap<K, V> that wraps java.util.HashMap and:
// 1. Has fun put(key: K, value: V)
// 2. Has fun get(key: K): V? (explicitly nullable)
// 3. Has fun getOrDefault(key: K, default: V): V
// 4. Has fun containsKey(key: K): Boolean`,
      solution: `class SafeMap<K, V> {
    private val map = java.util.HashMap<K, V>()

    fun put(key: K, value: V) {
        map[key] = value
    }

    fun get(key: K): V? {
        return map[key]
    }

    fun getOrDefault(key: K, default: V): V {
        return map[key] ?: default
    }

    fun containsKey(key: K): Boolean {
        return map.containsKey(key)
    }
}`,
      hints: [
        'Wrap Java collections to provide explicit nullability.',
        'HashMap.get() returns platform type; make it explicitly nullable.',
        'Use ?: operator for getOrDefault.',
      ],
      concepts: ['null-safety', 'wrapper', 'platform-types'],
    },
    {
      id: 'kt-java-interop-11',
      title: 'Write Type Alias for Java Types',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Use type aliases to simplify verbose Java types.',
      skeleton: `// Write type aliases:
// 1. StringMap for HashMap<String, String>
// 2. Callback for java.util.function.Consumer<String>
// 3. Predicate for java.util.function.Predicate<String>
// Then write a function processItems that takes a StringMap and a Predicate,
// filters entries, and returns a StringMap`,
      solution: `typealias StringMap = HashMap<String, String>
typealias Callback = java.util.function.Consumer<String>
typealias Predicate = java.util.function.Predicate<String>

fun processItems(items: StringMap, filter: Predicate): StringMap {
    val result = StringMap()
    items.forEach { (key, value) ->
        if (filter.test(key)) {
            result[key] = value
        }
    }
    return result
}`,
      hints: [
        'typealias creates a short name for a complex type.',
        'The alias is interchangeable with the original type.',
        'This improves readability when working with Java generics.',
      ],
      concepts: ['typealias', 'java-generics', 'readability'],
    },
    {
      id: 'kt-java-interop-12',
      title: 'Write Kotlin fun Interface for SAM',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a Kotlin fun interface that enables SAM conversion.',
      skeleton: `// Write:
// 1. A fun interface Transformer<T, R> with fun transform(input: T): R
// 2. A function applyTransform that takes a list and a Transformer, returns transformed list
// 3. Demonstrate calling it with a lambda (SAM conversion)`,
      solution: `fun interface Transformer<T, R> {
    fun transform(input: T): R
}

fun <T, R> applyTransform(items: List<T>, transformer: Transformer<T, R>): List<R> {
    return items.map { transformer.transform(it) }
}

fun main() {
    val result = applyTransform(listOf(1, 2, 3)) { it * 10 }
    println(result)
}`,
      hints: [
        'fun interface enables SAM conversion for Kotlin interfaces.',
        'Without fun keyword, Kotlin interfaces do not support SAM conversion.',
        'The lambda is automatically converted to the interface.',
      ],
      concepts: ['fun-interface', 'SAM-conversion', 'Kotlin-SAM'],
    },
    {
      id: 'kt-java-interop-13',
      title: 'Fix Java Null Safety',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix unsafe handling of Java nullable return values.',
      skeleton: `fun processJavaMap() {
    val map = java.util.HashMap<String, String>()
    map["key"] = "value"
    
    val result: String = map.get("missing")  // NPE! Java returns null
    println(result.length)
}`,
      solution: `fun processJavaMap() {
    val map = java.util.HashMap<String, String>()
    map["key"] = "value"
    
    val result: String? = map.get("missing")
    println(result?.length ?: 0)
}`,
      hints: [
        'Java HashMap.get() returns null for missing keys.',
        'Declare the type as String? to handle nullability.',
        'Use safe call ?. and Elvis ?: for safe access.',
      ],
      concepts: ['platform-types', 'null-safety', 'NPE'],
    },
    {
      id: 'kt-java-interop-14',
      title: 'Fix Java Stream Interop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix Java Stream usage in Kotlin to use idiomatic Kotlin instead.',
      skeleton: `fun processNumbers(numbers: List<Int>): List<Int> {
    return numbers.stream()
        .filter { it > 5 }
        .map { it * 2 }
        .collect(java.util.stream.Collectors.toList())
}`,
      solution: `fun processNumbers(numbers: List<Int>): List<Int> {
    return numbers
        .filter { it > 5 }
        .map { it * 2 }
}`,
      hints: [
        'Kotlin collections have built-in filter and map.',
        'No need for Java Streams in Kotlin code.',
        'Kotlin sequences are the equivalent for lazy evaluation.',
      ],
      concepts: ['kotlin-collections', 'idiomatic-kotlin'],
    },
    {
      id: 'kt-java-interop-15',
      title: 'Fix Missing @JvmStatic',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the companion object method that Java cannot call as static.',
      skeleton: `// Java code tries: Config.getInstance() -- but gets compile error
class Config private constructor(val value: String) {
    companion object {
        private var instance: Config? = null
        
        fun getInstance(): Config {
            if (instance == null) instance = Config("default")
            return instance!!
        }
    }
}`,
      solution: `class Config private constructor(val value: String) {
    companion object {
        private var instance: Config? = null
        
        @JvmStatic
        fun getInstance(): Config {
            if (instance == null) instance = Config("default")
            return instance!!
        }
    }
}`,
      hints: [
        'Without @JvmStatic, Java must call Config.Companion.getInstance().',
        'Add @JvmStatic to generate a real static method.',
        'Java code can then call Config.getInstance() directly.',
      ],
      concepts: ['JvmStatic', 'companion-object', 'java-interop'],
    },
    {
      id: 'kt-java-interop-16',
      title: 'Predict Java Interop Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Predict the output of using Java APIs from Kotlin.',
      skeleton: `fun main() {
    val sb = java.lang.StringBuilder()
    sb.append("Hello")
    sb.append(" ")
    sb.append("Kotlin")
    println(sb.toString())
    println(sb.length)
}`,
      solution: `Hello Kotlin
12`,
      hints: [
        'Java StringBuilder works directly in Kotlin.',
        '"Hello Kotlin" has 12 characters including the space.',
        'Kotlin provides property-style access to getLength().',
      ],
      concepts: ['java-class', 'property-access'],
    },
    {
      id: 'kt-java-interop-17',
      title: 'Predict Collections Interop',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict Java/Kotlin collection interop behavior.',
      skeleton: `fun main() {
    val kotlinList: List<Int> = listOf(3, 1, 4, 1, 5)
    val javaList: java.util.List<Int> = kotlinList as java.util.List<Int>
    println(javaList.size)
    println(kotlinList === javaList)
}`,
      solution: `5
true`,
      hints: [
        'Kotlin List maps to java.util.List at runtime.',
        'They are the same object -- no copying occurs.',
        '=== checks reference identity.',
      ],
      concepts: ['collection-mapping', 'identity'],
    },
    {
      id: 'kt-java-interop-18',
      title: 'Predict @JvmOverloads',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output of calling @JvmOverloads functions.',
      skeleton: `@JvmOverloads
fun format(text: String, prefix: String = "[", suffix: String = "]"): String {
    return "\${prefix}\${text}\${suffix}"
}

fun main() {
    println(format("hello"))
    println(format("hello", "("))
    println(format("hello", "(", ")"))
}`,
      solution: `[hello]
(hello]
(hello)`,
      hints: [
        'format("hello") uses both defaults: [ and ].',
        'format("hello", "(") overrides prefix, keeps suffix default.',
        'format("hello", "(", ")") overrides both.',
      ],
      concepts: ['JvmOverloads', 'default-parameters'],
    },
    {
      id: 'kt-java-interop-19',
      title: 'Refactor Java Builder to Kotlin DSL',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor a Java-style builder pattern to idiomatic Kotlin.',
      skeleton: `class Alert {
    var title: String = ""
    var message: String = ""
    var type: String = "info"
    
    class Builder {
        private val alert = Alert()
        fun title(t: String): Builder { alert.title = t; return this }
        fun message(m: String): Builder { alert.message = m; return this }
        fun type(t: String): Builder { alert.type = t; return this }
        fun build(): Alert = alert
    }
}

fun main() {
    val alert = Alert.Builder()
        .title("Warning")
        .message("Disk space low")
        .type("warning")
        .build()
    println("\${alert.type}: \${alert.title} - \${alert.message}")
}`,
      solution: `data class Alert(
    val title: String,
    val message: String,
    val type: String = "info"
)

fun alert(init: AlertBuilder.() -> Unit): Alert = AlertBuilder().apply(init).build()

class AlertBuilder {
    var title: String = ""
    var message: String = ""
    var type: String = "info"
    fun build() = Alert(title, message, type)
}

fun main() {
    val a = alert {
        title = "Warning"
        message = "Disk space low"
        type = "warning"
    }
    println("\${a.type}: \${a.title} - \${a.message}")
}`,
      hints: [
        'Replace fluent setters with mutable properties.',
        'Use a DSL function with lambda receiver.',
        'Data class gives toString, equals, copy for free.',
      ],
      concepts: ['DSL', 'data-class', 'idiomatic-kotlin'],
    },
    {
      id: 'kt-java-interop-20',
      title: 'Refactor Java Enum Pattern to Kotlin',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor a Java-style enum with methods to idiomatic Kotlin.',
      skeleton: `enum class Priority {
    LOW, MEDIUM, HIGH, CRITICAL;

    companion object {
        @JvmStatic
        fun fromString(value: String): Priority {
            return when (value.uppercase()) {
                "LOW" -> LOW
                "MEDIUM" -> MEDIUM
                "HIGH" -> HIGH
                "CRITICAL" -> CRITICAL
                else -> throw IllegalArgumentException("Unknown: \${value}")
            }
        }
    }

    fun isUrgent(): Boolean {
        return this == HIGH || this == CRITICAL
    }
}`,
      solution: `enum class Priority(val level: Int) {
    LOW(1), MEDIUM(2), HIGH(3), CRITICAL(4);

    val isUrgent: Boolean get() = level >= 3

    companion object {
        fun fromString(value: String): Priority =
            entries.find { it.name.equals(value, ignoreCase = true) }
                ?: throw IllegalArgumentException("Unknown: \${value}")
    }
}`,
      hints: [
        'Add a level property to the enum for ordering.',
        'Replace the function with a computed property.',
        'Use entries.find for dynamic lookup instead of manual when.',
      ],
      concepts: ['enum', 'computed-property', 'entries'],
    },
  ],
};
