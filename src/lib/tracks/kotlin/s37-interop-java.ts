import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-java-interop',
  title: '37. Java Interoperability',
  explanation: `## Java Interoperability

Kotlin runs on the JVM and is 100% interoperable with Java. You can call Java code from Kotlin and Kotlin code from Java with minimal friction.

### Calling Java from Kotlin

\`\`\`kotlin
// Java class: com.example.Person.java
val person = Person("Alice", 30)  // Kotlin calls Java constructors normally
println(person.name)              // Java getters become properties
person.age = 31                   // Java setters become property assignments
\`\`\`

### Platform Types

Java values have unknown nullability. Kotlin uses platform types (e.g., \`String!\`) which bypass null checks:

\`\`\`kotlin
val javaStr: String = javaMethod()  // May throw NPE at runtime!
val safeStr: String? = javaMethod() // Safer: treat as nullable
\`\`\`

### @JvmStatic

Makes a companion object function accessible as a true Java static method:

\`\`\`kotlin
class Config {
    companion object {
        @JvmStatic
        fun getDefault(): Config = Config()
    }
}
// From Java: Config.getDefault()  (not Config.Companion.getDefault())
\`\`\`

### @JvmField

Exposes a property as a plain Java field (no getter/setter):

\`\`\`kotlin
class Constants {
    companion object {
        @JvmField
        val MAX_SIZE = 100
    }
}
// From Java: Constants.MAX_SIZE  (not Constants.getMAX_SIZE())
\`\`\`

### @JvmOverloads

Generates overloaded Java methods for Kotlin functions with default parameters:

\`\`\`kotlin
@JvmOverloads
fun greet(name: String, greeting: String = "Hello") = "$greeting, $name!"
// From Java: greet("Alice") or greet("Alice", "Hi")
\`\`\`

### SAM Conversions

Kotlin lambda syntax works with Java functional interfaces (single abstract method):

\`\`\`kotlin
val executor = Executor { runnable -> runnable.run() }
button.setOnClickListener { view -> println("clicked") }
\`\`\`

### Checked Exceptions

Kotlin has no checked exceptions. Use \`@Throws\` to declare them for Java callers:

\`\`\`kotlin
@Throws(IOException::class)
fun readFile(path: String): String { ... }
\`\`\``,
  exercises: [
    {
      id: 'kt-java-interop-1',
      title: 'Call Java Getter as Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Access Java getters and setters using Kotlin property syntax.',
      skeleton: `// Assume Java class: class Person { String getName(); void setName(String n); }
fun demo(person: Person) {
    // Access the name getter as a property
    val n = person.___
    // Set the name via the setter as a property
    person.___ = "Bob"
    println(n)
}`,
      solution: `// Assume Java class: class Person { String getName(); void setName(String n); }
fun demo(person: Person) {
    val n = person.name
    person.name = "Bob"
    println(n)
}`,
      hints: [
        'Kotlin automatically maps Java getters/setters to properties.',
        'getName() becomes .name, setName(...) becomes .name = ...',
        'Drop the get/set prefix and lowercase the first letter.',
      ],
      concepts: ['java-properties', 'getter-setter', 'kotlin-java-interop'],
    },
    {
      id: 'kt-java-interop-2',
      title: 'Platform Types and Null Safety',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Declare a nullable type when receiving values from Java to avoid NPE.',
      skeleton: `// Java: public static String findUser(int id) { return null; }

fun safeFind(id: Int): String {
    // Treat the Java return as nullable for safety
    val result: ___? = JavaApi.findUser(id)
    return result ?: "unknown"
}`,
      solution: `// Java: public static String findUser(int id) { return null; }

fun safeFind(id: Int): String {
    val result: String? = JavaApi.findUser(id)
    return result ?: "unknown"
}`,
      hints: [
        'Java methods return platform types with unknown nullability.',
        'Declaring the result as String? forces you to handle null.',
        'Use String? to be safe when the Java method can return null.',
      ],
      concepts: ['platform-types', 'nullable', 'null-safety'],
    },
    {
      id: 'kt-java-interop-3',
      title: '@JvmStatic on Companion Object',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Add @JvmStatic so Java can call the companion function without .Companion.',
      skeleton: `class Database {
    companion object {
        ___
        fun connect(url: String): Database {
            return Database()
        }
    }
}
// Java should call: Database.connect("jdbc://...")
// Without annotation: Database.Companion.connect("jdbc://...")`,
      solution: `class Database {
    companion object {
        @JvmStatic
        fun connect(url: String): Database {
            return Database()
        }
    }
}`,
      hints: [
        '@JvmStatic makes the function a real static method in bytecode.',
        'Without it, Java must use Database.Companion.connect().',
        'Place @JvmStatic directly before the function declaration.',
      ],
      concepts: ['@JvmStatic', 'companion-object', 'java-static'],
    },
    {
      id: 'kt-java-interop-4',
      title: '@JvmField for Direct Field Access',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Add @JvmField to expose a companion constant as a Java field.',
      skeleton: `class AppConfig {
    companion object {
        ___
        val VERSION = "1.0.0"

        ___
        val MAX_RETRIES = 3
    }
}
// Java should access: AppConfig.VERSION and AppConfig.MAX_RETRIES`,
      solution: `class AppConfig {
    companion object {
        @JvmField
        val VERSION = "1.0.0"

        @JvmField
        val MAX_RETRIES = 3
    }
}`,
      hints: [
        '@JvmField exposes the property as a direct field, not via a getter.',
        'Without @JvmField, Java calls AppConfig.Companion.getVERSION().',
        'Apply @JvmField to each property you want as a direct Java field.',
      ],
      concepts: ['@JvmField', 'companion-object', 'java-field'],
    },
    {
      id: 'kt-java-interop-5',
      title: '@JvmOverloads for Default Parameters',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Add @JvmOverloads so Java can call the function with fewer arguments.',
      skeleton: `___
fun createButton(
    text: String,
    width: Int = 100,
    height: Int = 40,
    color: String = "blue"
): String = "Button($text, ${width}x${height}, $color)"
// Java callers should be able to use:
// createButton("OK")
// createButton("OK", 200)
// createButton("OK", 200, 60)`,
      solution: `@JvmOverloads
fun createButton(
    text: String,
    width: Int = 100,
    height: Int = 40,
    color: String = "blue"
): String = "Button($text, ${width}x${height}, $color)"`,
      hints: [
        '@JvmOverloads generates one Java method per default parameter.',
        'Without it, Java must always provide all arguments.',
        'Place @JvmOverloads before the fun keyword.',
      ],
      concepts: ['@JvmOverloads', 'default-parameters', 'java-overloads'],
    },
    {
      id: 'kt-java-interop-6',
      title: '@Throws for Checked Exceptions',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Annotate a Kotlin function so Java knows it throws IOException.',
      skeleton: `import java.io.IOException

___
fun readConfig(path: String): String {
    if (path.isEmpty()) throw IOException("Empty path")
    return "config content"
}
// Java callers must handle: try { readConfig(p); } catch (IOException e) { }`,
      solution: `import java.io.IOException

@Throws(IOException::class)
fun readConfig(path: String): String {
    if (path.isEmpty()) throw IOException("Empty path")
    return "config content"
}`,
      hints: [
        'Kotlin has no checked exceptions, but Java callers need to know.',
        '@Throws(SomeException::class) adds checked exception to the signature.',
        'Use @Throws(IOException::class) for file I/O functions.',
      ],
      concepts: ['@Throws', 'checked-exceptions', 'java-interop'],
    },
    {
      id: 'kt-java-interop-7',
      title: 'SAM Conversion with Runnable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Use a Kotlin lambda as a Java Runnable (SAM conversion).',
      skeleton: `fun startThread(name: String) {
    // Create a Thread using a Kotlin lambda for the Runnable
    val thread = Thread(___ {
        println("Running: $name")
    })
    thread.start()
}`,
      solution: `fun startThread(name: String) {
    val thread = Thread {
        println("Running: $name")
    }
    thread.start()
}`,
      hints: [
        'Java functional interfaces (1 abstract method) accept Kotlin lambdas directly.',
        'Thread accepts a Runnable -- just pass a lambda: Thread { ... }',
        'No explicit Runnable { } wrapper needed; SAM conversion is automatic.',
      ],
      concepts: ['SAM-conversion', 'Runnable', 'lambda', 'Thread'],
    },
    {
      id: 'kt-java-interop-8',
      title: 'Write a @JvmStatic Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a class with a companion object factory method accessible as a Java static.',
      skeleton: `// Write a class Logger with:
// 1. A private constructor taking tag: String
// 2. A companion object with @JvmStatic fun create(tag: String): Logger
// 3. A fun log(msg: String) that prints "[$tag] $msg"`,
      solution: `class Logger private constructor(private val tag: String) {
    fun log(msg: String) = println("[$tag] $msg")

    companion object {
        @JvmStatic
        fun create(tag: String): Logger = Logger(tag)
    }
}

fun main() {
    val logger = Logger.create("App")
    logger.log("Started")
}`,
      hints: [
        'Use private constructor(private val tag: String) to restrict construction.',
        '@JvmStatic on the companion fun makes Logger.create() work from Java.',
        'The log function uses the captured tag from the constructor.',
      ],
      concepts: ['@JvmStatic', 'factory-pattern', 'private-constructor', 'companion-object'],
    },
    {
      id: 'kt-java-interop-9',
      title: 'Write a Java Collections Bridge',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a function that takes a Java ArrayList, filters it, and returns a Kotlin List.',
      skeleton: `import java.util.ArrayList

// Write filterPositive that takes a Java ArrayList<Int> and returns
// a Kotlin List<Int> with only positive numbers`,
      solution: `import java.util.ArrayList

fun filterPositive(javaList: ArrayList<Int>): List<Int> {
    return javaList.filter { it > 0 }
}

fun main() {
    val list = ArrayList<Int>()
    list.add(-3)
    list.add(5)
    list.add(-1)
    list.add(7)
    println(filterPositive(list))
}`,
      hints: [
        'Kotlin and Java collections are interoperable -- ArrayList works directly.',
        'Use .filter { it > 0 } to filter positive values.',
        'Return type List<Int> works because ArrayList implements List.',
      ],
      concepts: ['java-collections', 'ArrayList', 'filter', 'interop'],
    },
    {
      id: 'kt-java-interop-10',
      title: 'Write a @JvmOverloads Builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a function with @JvmOverloads that builds a connection string from parameters with defaults.',
      skeleton: `// Write buildConnectionString with @JvmOverloads:
// host: String
// port: Int = 5432
// database: String = "default"
// user: String = "admin"
// Returns: "host:port/database?user=user"`,
      solution: `@JvmOverloads
fun buildConnectionString(
    host: String,
    port: Int = 5432,
    database: String = "default",
    user: String = "admin"
): String = "$host:$port/$database?user=$user"

fun main() {
    println(buildConnectionString("localhost"))
    println(buildConnectionString("db.example.com", 5433, "mydb", "zan"))
}`,
      hints: [
        '@JvmOverloads generates multiple Java-compatible overloads.',
        'String interpolation: "$host:$port/$database?user=$user"',
        'The most specific overload (all params) is always available.',
      ],
      concepts: ['@JvmOverloads', 'default-parameters', 'string-templates'],
    },
    {
      id: 'kt-java-interop-11',
      title: 'Write an Interop-Safe Nullable Wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a function that safely wraps a Java API call that returns null.',
      skeleton: `// Simulate a Java API that returns null for missing entries
object JavaUserService {
    @JvmStatic
    fun findById(id: Int): String? = if (id == 1) "Alice" else null
}

// Write findUserName that wraps JavaUserService.findById
// Returns "Guest" if the result is null`,
      solution: `object JavaUserService {
    @JvmStatic
    fun findById(id: Int): String? = if (id == 1) "Alice" else null
}

fun findUserName(id: Int): String {
    val result: String? = JavaUserService.findById(id)
    return result ?: "Guest"
}

fun main() {
    println(findUserName(1))  // Alice
    println(findUserName(99)) // Guest
}`,
      hints: [
        'Declare the result as String? to handle potential null from Java.',
        'Use the Elvis operator ?: to provide a default value.',
        'result ?: "Guest" returns "Guest" when result is null.',
      ],
      concepts: ['platform-types', 'elvis-operator', 'null-safety', 'java-interop'],
    },
    {
      id: 'kt-java-interop-12',
      title: 'Fix Missing @JvmStatic',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Fix the companion object so Java can call it without .Companion.',
      skeleton: `class MathUtils {
    companion object {
        // BUG: Java must call MathUtils.Companion.square(x) -- fix it
        fun square(n: Int): Int = n * n
        fun cube(n: Int): Int = n * n * n
    }
}`,
      solution: `class MathUtils {
    companion object {
        @JvmStatic
        fun square(n: Int): Int = n * n
        @JvmStatic
        fun cube(n: Int): Int = n * n * n
    }
}`,
      hints: [
        'Add @JvmStatic to each function you want accessible as a Java static.',
        'Without @JvmStatic, Java sees these on a Companion object, not the class.',
        'Both square and cube need the annotation.',
      ],
      concepts: ['@JvmStatic', 'companion-object', 'java-visibility'],
    },
    {
      id: 'kt-java-interop-13',
      title: 'Fix Platform Type NPE Risk',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix unsafe Java platform type usage that could cause a NullPointerException.',
      skeleton: `// Java: public static String getSystemProp(String key) { return System.getProperty(key); }

fun getProperty(key: String): Int {
    // BUG: Platform type used as non-null -- may throw NPE
    val value: String = JavaSys.getSystemProp(key)
    return value.length
}`,
      solution: `// Java: public static String getSystemProp(String key) { return System.getProperty(key); }

fun getProperty(key: String): Int {
    val value: String? = JavaSys.getSystemProp(key)
    return value?.length ?: 0
}`,
      hints: [
        'Java can return null -- treat the value as String? not String.',
        'Use ?. for safe calls and ?: for a default when null.',
        'value?.length ?: 0 safely returns 0 when value is null.',
      ],
      concepts: ['platform-types', 'nullable', 'safe-call', 'elvis-operator'],
    },
    {
      id: 'kt-java-interop-14',
      title: 'Fix Missing @Throws',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the Kotlin function so Java callers know it throws an exception.',
      skeleton: `import java.io.IOException

// BUG: Java callers don't know this can throw IOException
fun writeFile(path: String, content: String) {
    if (path.isEmpty()) throw IOException("Invalid path")
    // write logic here
}`,
      solution: `import java.io.IOException

@Throws(IOException::class)
fun writeFile(path: String, content: String) {
    if (path.isEmpty()) throw IOException("Invalid path")
    // write logic here
}`,
      hints: [
        'Kotlin does not enforce checked exceptions, but Java callers need @Throws.',
        'Add @Throws(IOException::class) before the function.',
        'This generates the throws declaration in the bytecode.',
      ],
      concepts: ['@Throws', 'checked-exceptions', 'java-interop'],
    },
    {
      id: 'kt-java-interop-15',
      title: 'Fix SAM Conversion Ambiguity',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Fix the ambiguous SAM conversion by using an explicit functional interface name.',
      skeleton: `fun interface Transformer {
    fun transform(value: Int): Int
}

fun interface Predicate {
    fun test(value: Int): Boolean
}

fun applyTransform(value: Int, t: Transformer): Int = t.transform(value)

fun main() {
    // BUG: Compiler cannot infer which SAM interface to use
    val result = applyTransform(5, { it * 2 })
    println(result)
}`,
      solution: `fun interface Transformer {
    fun transform(value: Int): Int
}

fun interface Predicate {
    fun test(value: Int): Boolean
}

fun applyTransform(value: Int, t: Transformer): Int = t.transform(value)

fun main() {
    val result = applyTransform(5, Transformer { it * 2 })
    println(result)
}`,
      hints: [
        'When multiple SAM interfaces exist, specify which one explicitly.',
        'Use Transformer { it * 2 } instead of just { it * 2 }.',
        'This resolves the type ambiguity at the call site.',
      ],
      concepts: ['SAM-conversion', 'fun-interface', 'type-disambiguation'],
    },
    {
      id: 'kt-java-interop-16',
      title: 'Predict @JvmField Access',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output of this code using @JvmField.',
      skeleton: `class Settings {
    companion object {
        @JvmField
        val TIMEOUT = 30
        @JvmField
        val MAX_CONN = 10
    }
}

fun main() {
    println(Settings.TIMEOUT)
    println(Settings.MAX_CONN * 2)
}`,
      solution: `30
20`,
      hints: [
        '@JvmField makes the values accessible as Settings.TIMEOUT directly.',
        'TIMEOUT is 30, MAX_CONN is 10 so MAX_CONN * 2 = 20.',
        'Output: 30 then 20.',
      ],
      concepts: ['@JvmField', 'companion-object', 'direct-access'],
    },
    {
      id: 'kt-java-interop-17',
      title: 'Predict SAM Conversion Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output of SAM conversion with a Java Comparator.',
      skeleton: `fun main() {
    val words = mutableListOf("banana", "apple", "cherry", "date")
    words.sortWith(Comparator { a, b -> a.length - b.length })
    println(words.take(2).joinToString())
}`,
      solution: `date, apple`,
      hints: [
        'Comparator sorts by string length ascending.',
        'date=4, apple=5, banana=6, cherry=6.',
        'Shortest two are "date" (4) and "apple" (5).',
      ],
      concepts: ['SAM-conversion', 'Comparator', 'sortWith', 'joinToString'],
    },
    {
      id: 'kt-java-interop-18',
      title: 'Predict @JvmOverloads Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output of calling an @JvmOverloads function with defaults.',
      skeleton: `@JvmOverloads
fun greet(name: String, greeting: String = "Hello", punctuation: String = "!"): String {
    return "$greeting, $name$punctuation"
}

fun main() {
    println(greet("Alice"))
    println(greet("Bob", "Hi"))
    println(greet("Carol", "Hey", "."))
}`,
      solution: `Hello, Alice!
Hi, Bob!
Hey, Carol.`,
      hints: [
        'First call uses both defaults: "Hello" and "!".',
        'Second call overrides greeting to "Hi", punctuation stays "!".',
        'Third call specifies all three arguments explicitly.',
      ],
      concepts: ['@JvmOverloads', 'default-parameters', 'named-arguments'],
    },
    {
      id: 'kt-java-interop-19',
      title: 'Refactor Companion to @JvmStatic',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor the companion object so all its methods are Java-static-compatible.',
      skeleton: `class Cache {
    private val data = mutableMapOf<String, String>()

    companion object {
        fun create(): Cache = Cache()
        fun defaultTtl(): Int = 3600
    }
}`,
      solution: `class Cache {
    private val data = mutableMapOf<String, String>()

    companion object {
        @JvmStatic
        fun create(): Cache = Cache()
        @JvmStatic
        fun defaultTtl(): Int = 3600
    }
}`,
      hints: [
        'Add @JvmStatic to each companion function that Java will call.',
        'This avoids Cache.Companion.create() in Java code.',
        'Apply the annotation to both create() and defaultTtl().',
      ],
      concepts: ['@JvmStatic', 'companion-object', 'java-interop-refactor'],
    },
    {
      id: 'kt-java-interop-20',
      title: 'Refactor to SAM Conversion',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Refactor verbose anonymous object syntax to SAM conversion lambdas.',
      skeleton: `import java.util.concurrent.Callable
import java.util.concurrent.Executors

fun runTasks() {
    val executor = Executors.newFixedThreadPool(2)
    val task1 = object : Callable<Int> {
        override fun call(): Int = 42
    }
    val task2 = object : Callable<Int> {
        override fun call(): Int = 100
    }
    val f1 = executor.submit(task1)
    val f2 = executor.submit(task2)
    println(f1.get() + f2.get())
    executor.shutdown()
}`,
      solution: `import java.util.concurrent.Callable
import java.util.concurrent.Executors

fun runTasks() {
    val executor = Executors.newFixedThreadPool(2)
    val task1 = Callable { 42 }
    val task2 = Callable { 100 }
    val f1 = executor.submit(task1)
    val f2 = executor.submit(task2)
    println(f1.get() + f2.get())
    executor.shutdown()
}`,
      hints: [
        'Callable is a SAM interface -- replace object : Callable with a lambda.',
        'Callable { 42 } is equivalent to the anonymous object that returns 42.',
        'The lambda body is the return value of call().',
      ],
      concepts: ['SAM-conversion', 'Callable', 'lambda', 'refactoring'],
    },
  ],
};
