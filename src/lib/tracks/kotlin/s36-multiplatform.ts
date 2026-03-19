import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-multiplatform',
  title: '36. Multiplatform',
  explanation: `## Kotlin Multiplatform

Kotlin Multiplatform (KMP) allows sharing code between platforms (JVM, JS, Native, iOS) while still having platform-specific implementations.

### expect/actual

\`\`\`kotlin
// Common code
expect fun platformName(): String

// JVM implementation
actual fun platformName(): String = "JVM"

// JS implementation
actual fun platformName(): String = "JavaScript"
\`\`\`

### Common Module

\`\`\`kotlin
// commonMain
class Greeting {
    fun greet(): String = "Hello from \${platformName()}"
}
\`\`\`

### expect/actual Classes

\`\`\`kotlin
// Common
expect class Platform() {
    val name: String
}

// JVM
actual class Platform actual constructor() {
    actual val name: String = "JVM \${System.getProperty("java.version")}"
}
\`\`\`

### Platform-Specific Dependencies

\`\`\`kotlin
// build.gradle.kts
kotlin {
    sourceSets {
        commonMain { dependencies { implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core") } }
        jvmMain { dependencies { implementation("io.ktor:ktor-client-cio") } }
        iosMain { dependencies { implementation("io.ktor:ktor-client-darwin") } }
    }
}
\`\`\``,
  exercises: [
    {
      id: 'kt-multiplatform-1',
      title: 'Basic expect/actual',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Declare an expect function and its actual implementation.',
      skeleton: `// commonMain
___ fun getPlatform(): String

// jvmMain
___ fun getPlatform(): String = "JVM"`,
      solution: `// commonMain
expect fun getPlatform(): String

// jvmMain
actual fun getPlatform(): String = "JVM"`,
      hints: [
        'expect declares the API in common code.',
        'actual provides the platform-specific implementation.',
        'Each target must provide an actual implementation.',
      ],
      concepts: ['expect', 'actual'],
    },
    {
      id: 'kt-multiplatform-2',
      title: 'expect/actual Class',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Declare an expect class with actual implementations.',
      skeleton: `// commonMain
___ class UUID {
    fun generate(): String
}

// jvmMain
___ class UUID {
    ___ fun generate(): String = java.util.UUID.randomUUID().toString()
}`,
      solution: `// commonMain
expect class UUID() {
    fun generate(): String
}

// jvmMain
actual class UUID actual constructor() {
    actual fun generate(): String = java.util.UUID.randomUUID().toString()
}`,
      hints: [
        'expect class declares the common interface.',
        'actual class provides the platform implementation.',
        'The constructor and all members need actual keyword.',
      ],
      concepts: ['expect-class', 'actual-class'],
    },
    {
      id: 'kt-multiplatform-3',
      title: 'Common Module Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Write common code that uses an expect function.',
      skeleton: `// commonMain
expect fun currentTimeMs(): Long

fun formatTime(): String {
    val time = ___()
    return "Current time: \${time}ms"
}`,
      solution: `// commonMain
expect fun currentTimeMs(): Long

fun formatTime(): String {
    val time = currentTimeMs()
    return "Current time: \${time}ms"
}`,
      hints: [
        'Common code calls expect functions normally.',
        'The actual implementation is resolved at compile time per target.',
        'The common module does not know which platform it runs on.',
      ],
      concepts: ['common-module', 'expect-function'],
    },
    {
      id: 'kt-multiplatform-4',
      title: 'expect/actual Object',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Declare an expect object singleton.',
      skeleton: `// commonMain
___ object Platform {
    val name: String
    val version: String
}

// jvmMain
___ object Platform {
    ___ val name: String = "JVM"
    ___ val version: String = System.getProperty("java.version")
}`,
      solution: `// commonMain
expect object Platform {
    val name: String
    val version: String
}

// jvmMain
actual object Platform {
    actual val name: String = "JVM"
    actual val version: String = System.getProperty("java.version")
}`,
      hints: [
        'Objects can also be expect/actual.',
        'Each property in the expect object needs an actual implementation.',
        'Objects are singletons - one instance per platform.',
      ],
      concepts: ['expect-object', 'actual-object'],
    },
    {
      id: 'kt-multiplatform-5',
      title: 'Typealias actual',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use typealias as an actual implementation.',
      skeleton: `// commonMain
expect class PlatformDate

// jvmMain
actual ___ PlatformDate = java.util.Date`,
      solution: `// commonMain
expect class PlatformDate

// jvmMain
actual typealias PlatformDate = java.util.Date`,
      hints: [
        'actual typealias maps an expect class to an existing platform class.',
        'This avoids creating a wrapper class.',
        'The platform class must match the expect declaration signature.',
      ],
      concepts: ['typealias', 'actual-typealias'],
    },
    {
      id: 'kt-multiplatform-6',
      title: 'expect annotation',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Declare an expect annotation with actual implementations.',
      skeleton: `// commonMain
@Target(AnnotationTarget.CLASS)
___ annotation class Parcelize

// androidMain
actual ___ Parcelize = kotlinx.parcelize.Parcelize`,
      solution: `// commonMain
@Target(AnnotationTarget.CLASS)
expect annotation class Parcelize()

// androidMain
actual typealias Parcelize = kotlinx.parcelize.Parcelize`,
      hints: [
        'Annotations can be expect/actual too.',
        'typealias is common for mapping to platform annotations.',
        'Android has Parcelize, other platforms may have a no-op.',
      ],
      concepts: ['expect-annotation', 'typealias'],
    },
    {
      id: 'kt-multiplatform-7',
      title: 'Write a Multiplatform Logger',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a multiplatform logger with expect/actual.',
      skeleton: `// Write:
// 1. In commonMain: expect object Logger with fun log(message: String)
// 2. In jvmMain: actual object Logger using println("[JVM] message")
// 3. In commonMain: a class App with fun run() that calls Logger.log("App started")`,
      solution: `// commonMain
expect object Logger {
    fun log(message: String)
}

class App {
    fun run() {
        Logger.log("App started")
    }
}

// jvmMain
actual object Logger {
    actual fun log(message: String) {
        println("[JVM] \${message}")
    }
}`,
      hints: [
        'Use expect object for the common declaration.',
        'The actual JVM implementation uses println.',
        'Common code uses Logger.log() without knowing the platform.',
      ],
      concepts: ['expect-object', 'actual-object', 'logging'],
    },
    {
      id: 'kt-multiplatform-8',
      title: 'Write a Platform-Specific HTTP Client',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write expect/actual declarations for a simple HTTP client.',
      skeleton: `// Write:
// 1. In commonMain: expect class HttpClient with suspend fun get(url: String): String
// 2. In jvmMain: actual class HttpClient using java.net.URL to fetch
// 3. In commonMain: a suspend fun fetchData(url: String): String that uses HttpClient`,
      solution: `// commonMain
expect class HttpClient() {
    suspend fun get(url: String): String
}

suspend fun fetchData(url: String): String {
    val client = HttpClient()
    return client.get(url)
}

// jvmMain
actual class HttpClient actual constructor() {
    actual suspend fun get(url: String): String {
        return java.net.URL(url).readText()
    }
}`,
      hints: [
        'The common module declares the interface.',
        'JVM uses java.net.URL for the implementation.',
        'Other platforms would use their native HTTP libraries.',
      ],
      concepts: ['expect-class', 'suspend', 'platform-specific'],
    },
    {
      id: 'kt-multiplatform-9',
      title: 'Write Shared Business Logic',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write shared business logic in common code.',
      skeleton: `// Write in commonMain:
// 1. expect fun generateId(): String
// 2. data class User(val id: String, val name: String, val email: String)
// 3. class UserRepository with:
//    - private val users = mutableListOf<User>()
//    - fun addUser(name: String, email: String): User
//    - fun findByName(name: String): User?
//    - fun allUsers(): List<User>`,
      solution: `// commonMain
expect fun generateId(): String

data class User(val id: String, val name: String, val email: String)

class UserRepository {
    private val users = mutableListOf<User>()

    fun addUser(name: String, email: String): User {
        val user = User(generateId(), name, email)
        users.add(user)
        return user
    }

    fun findByName(name: String): User? {
        return users.find { it.name == name }
    }

    fun allUsers(): List<User> = users.toList()
}`,
      hints: [
        'Business logic goes in commonMain for sharing.',
        'Only platform-specific operations need expect/actual.',
        'generateId() is platform-specific; everything else is shared.',
      ],
      concepts: ['common-module', 'shared-logic', 'expect'],
    },
    {
      id: 'kt-multiplatform-10',
      title: 'Write expect/actual for Storage',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write expect/actual for a key-value storage interface.',
      skeleton: `// Write:
// 1. In commonMain: expect class Storage() with:
//    fun save(key: String, value: String)
//    fun load(key: String): String?
//    fun delete(key: String)
// 2. In jvmMain: actual class Storage using a HashMap as backing store`,
      solution: `// commonMain
expect class Storage() {
    fun save(key: String, value: String)
    fun load(key: String): String?
    fun delete(key: String)
}

// jvmMain
actual class Storage actual constructor() {
    private val store = HashMap<String, String>()

    actual fun save(key: String, value: String) {
        store[key] = value
    }

    actual fun load(key: String): String? {
        return store[key]
    }

    actual fun delete(key: String) {
        store.remove(key)
    }
}`,
      hints: [
        'The common API is identical for all platforms.',
        'JVM uses HashMap; iOS might use NSUserDefaults.',
        'Each platform provides its own storage mechanism.',
      ],
      concepts: ['expect-class', 'platform-abstraction', 'storage'],
    },
    {
      id: 'kt-multiplatform-11',
      title: 'Write a Multiplatform Enum with actual',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write shared enums and platform-specific operations on them.',
      skeleton: `// Write in commonMain:
// 1. enum class Theme { LIGHT, DARK, SYSTEM }
// 2. expect fun applyTheme(theme: Theme)
// 3. fun toggleTheme(current: Theme): Theme that returns DARK if LIGHT, LIGHT otherwise
// Write in jvmMain:
// 4. actual fun applyTheme that prints "Applying <theme> on JVM"`,
      solution: `// commonMain
enum class Theme { LIGHT, DARK, SYSTEM }

expect fun applyTheme(theme: Theme)

fun toggleTheme(current: Theme): Theme {
    return when (current) {
        Theme.LIGHT -> Theme.DARK
        else -> Theme.LIGHT
    }
}

// jvmMain
actual fun applyTheme(theme: Theme) {
    println("Applying \${theme} on JVM")
}`,
      hints: [
        'Enums can live in common code.',
        'Only the side-effect function needs expect/actual.',
        'Business logic like toggleTheme is shared across platforms.',
      ],
      concepts: ['enum', 'expect', 'shared-logic'],
    },
    {
      id: 'kt-multiplatform-12',
      title: 'Write a Common Interface with Platform Implementation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Use interfaces in common code with platform-specific implementations.',
      skeleton: `// Write:
// 1. In commonMain: interface FileSystem with:
//    fun readFile(path: String): String
//    fun writeFile(path: String, content: String)
//    fun exists(path: String): Boolean
// 2. expect fun createFileSystem(): FileSystem
// 3. In jvmMain: class JvmFileSystem that uses java.io.File
// 4. actual fun createFileSystem() = JvmFileSystem()`,
      solution: `// commonMain
interface FileSystem {
    fun readFile(path: String): String
    fun writeFile(path: String, content: String)
    fun exists(path: String): Boolean
}

expect fun createFileSystem(): FileSystem

// jvmMain
class JvmFileSystem : FileSystem {
    override fun readFile(path: String): String {
        return java.io.File(path).readText()
    }

    override fun writeFile(path: String, content: String) {
        java.io.File(path).writeText(content)
    }

    override fun exists(path: String): Boolean {
        return java.io.File(path).exists()
    }
}

actual fun createFileSystem(): FileSystem = JvmFileSystem()`,
      hints: [
        'Define the interface in common code.',
        'Use expect/actual for the factory function.',
        'JVM uses java.io.File for the implementation.',
      ],
      concepts: ['interface', 'expect', 'factory', 'platform-specific'],
    },
    {
      id: 'kt-multiplatform-13',
      title: 'Fix Missing actual Declaration',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Fix the multiplatform code missing an actual declaration.',
      skeleton: `// commonMain
expect fun getTimestamp(): Long

// jvmMain
// Missing! No actual declaration provided.

// commonMain usage
fun logEvent(event: String) {
    println("[\${getTimestamp()}] \${event}")
}`,
      solution: `// commonMain
expect fun getTimestamp(): Long

// jvmMain
actual fun getTimestamp(): Long = System.currentTimeMillis()

// commonMain usage
fun logEvent(event: String) {
    println("[\${getTimestamp()}] \${event}")
}`,
      hints: [
        'Every expect declaration needs a matching actual for each target.',
        'Missing actual causes a compile error.',
        'JVM can use System.currentTimeMillis().',
      ],
      concepts: ['actual', 'expect', 'compile-error'],
    },
    {
      id: 'kt-multiplatform-14',
      title: 'Fix actual Signature Mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the actual declaration that does not match the expect signature.',
      skeleton: `// commonMain
expect fun formatNumber(value: Double, decimals: Int): String

// jvmMain
actual fun formatNumber(value: Double): String {
    return String.format("%.2f", value)
}`,
      solution: `// commonMain
expect fun formatNumber(value: Double, decimals: Int): String

// jvmMain
actual fun formatNumber(value: Double, decimals: Int): String {
    return String.format("%.\${decimals}f", value)
}`,
      hints: [
        'The actual signature must exactly match the expect signature.',
        'The actual is missing the decimals parameter.',
        'Add the parameter and use it in the format string.',
      ],
      concepts: ['signature-matching', 'expect-actual'],
    },
    {
      id: 'kt-multiplatform-15',
      title: 'Fix Platform Code in Common Module',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix common code that accidentally uses platform-specific APIs.',
      skeleton: `// commonMain - this should be platform-independent!
fun getCurrentTime(): Long {
    return System.currentTimeMillis()  // Error: JVM-only API in common code!
}`,
      solution: `// commonMain
expect fun getCurrentTime(): Long

// jvmMain
actual fun getCurrentTime(): Long {
    return System.currentTimeMillis()
}`,
      hints: [
        'System.currentTimeMillis() is JVM-specific.',
        'Extract it to an expect/actual declaration.',
        'Common code must only use common APIs.',
      ],
      concepts: ['common-module', 'expect-actual', 'platform-leakage'],
    },
    {
      id: 'kt-multiplatform-16',
      title: 'Predict expect/actual Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Predict the output of expect/actual on JVM.',
      skeleton: `// commonMain
expect fun greeting(): String

fun main() {
    println(greeting())
}

// jvmMain
actual fun greeting(): String = "Hello from JVM!"`,
      solution: `Hello from JVM!`,
      hints: [
        'On JVM, the actual implementation is used.',
        'greeting() returns "Hello from JVM!".',
        'The common main function prints the result.',
      ],
      concepts: ['expect-actual', 'JVM'],
    },
    {
      id: 'kt-multiplatform-17',
      title: 'Predict Shared Logic Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output of shared business logic.',
      skeleton: `// commonMain
expect fun platformTag(): String

fun buildMessage(name: String): String {
    return "[\${platformTag()}] Welcome, \${name}!"
}

// jvmMain
actual fun platformTag(): String = "JVM"

fun main() {
    println(buildMessage("Alice"))
}`,
      solution: `[JVM] Welcome, Alice!`,
      hints: [
        'platformTag() returns "JVM" on the JVM target.',
        'buildMessage combines the tag with the name.',
        'The shared logic produces the formatted string.',
      ],
      concepts: ['shared-logic', 'expect-actual'],
    },
    {
      id: 'kt-multiplatform-18',
      title: 'Predict Common Data Class',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Predict the output of a common data class.',
      skeleton: `// commonMain
data class Point(val x: Int, val y: Int) {
    fun distanceFromOrigin(): Double = kotlin.math.sqrt((x * x + y * y).toDouble())
}

fun main() {
    val p = Point(3, 4)
    println(p)
    println(p.distanceFromOrigin())
}`,
      solution: `Point(x=3, y=4)
5.0`,
      hints: [
        'Data classes generate toString automatically.',
        'distanceFromOrigin: sqrt(9 + 16) = sqrt(25) = 5.0.',
        'kotlin.math is available in common code.',
      ],
      concepts: ['data-class', 'common-module', 'kotlin-math'],
    },
    {
      id: 'kt-multiplatform-19',
      title: 'Refactor JVM Code to Multiplatform',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor JVM-only code to be multiplatform-ready.',
      skeleton: `class Crypto {
    fun hash(input: String): String {
        val digest = java.security.MessageDigest.getInstance("SHA-256")
        val bytes = digest.digest(input.toByteArray())
        return bytes.joinToString("") { "%02x".format(it) }
    }
}

fun main() {
    val crypto = Crypto()
    println(crypto.hash("hello"))
}`,
      solution: `// commonMain
expect class Crypto() {
    fun hash(input: String): String
}

fun main() {
    val crypto = Crypto()
    println(crypto.hash("hello"))
}

// jvmMain
actual class Crypto actual constructor() {
    actual fun hash(input: String): String {
        val digest = java.security.MessageDigest.getInstance("SHA-256")
        val bytes = digest.digest(input.toByteArray())
        return bytes.joinToString("") { "%02x".format(it) }
    }
}`,
      hints: [
        'Move the class declaration to common with expect.',
        'Keep the JVM implementation in jvmMain with actual.',
        'The main function stays in common code.',
      ],
      concepts: ['expect-actual', 'refactoring', 'multiplatform'],
    },
    {
      id: 'kt-multiplatform-20',
      title: 'Refactor to Interface-Based Multiplatform',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Refactor direct platform calls to interface-based multiplatform architecture.',
      skeleton: `fun sendNotification(title: String, body: String) {
    // JVM-specific: uses javax.swing
    javax.swing.JOptionPane.showMessageDialog(null, body, title, 1)
}

fun alertUser(message: String) {
    sendNotification("Alert", message)
}

fun main() {
    alertUser("Task complete!")
}`,
      solution: `// commonMain
interface Notifier {
    fun send(title: String, body: String)
}

expect fun createNotifier(): Notifier

fun alertUser(message: String) {
    val notifier = createNotifier()
    notifier.send("Alert", message)
}

// jvmMain
class JvmNotifier : Notifier {
    override fun send(title: String, body: String) {
        javax.swing.JOptionPane.showMessageDialog(null, body, title, 1)
    }
}

actual fun createNotifier(): Notifier = JvmNotifier()`,
      hints: [
        'Extract an interface for the notification contract.',
        'Use expect/actual for the factory function.',
        'Common code uses the interface, not platform APIs.',
      ],
      concepts: ['interface', 'expect-actual', 'dependency-inversion'],
    },
  ],
};
