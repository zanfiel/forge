import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-serial',
  title: '39. Serialization',
  explanation: `## Serialization in Kotlin

kotlinx.serialization is the official Kotlin serialization library. It provides compile-time safe serialization with support for JSON and other formats.

### @Serializable

\`\`\`kotlin
import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class User(val name: String, val age: Int)
\`\`\`

### Encoding / Decoding

\`\`\`kotlin
val user = User("Alice", 30)
val json = Json.encodeToString(user)
// {"name":"Alice","age":30}

val decoded = Json.decodeFromString<User>(json)
\`\`\`

### Custom Field Names

\`\`\`kotlin
@Serializable
data class ApiResponse(
    @SerialName("user_name") val userName: String,
    @SerialName("is_active") val isActive: Boolean
)
\`\`\`

### Optional Fields

\`\`\`kotlin
@Serializable
data class Config(
    val host: String,
    val port: Int = 8080,  // Optional with default
    val debug: Boolean = false
)
\`\`\`

### Custom Serializers

\`\`\`kotlin
val json = Json {
    prettyPrint = true
    ignoreUnknownKeys = true
    coerceInputValues = true
}
\`\`\``,
  exercises: [
    {
      id: 'kt-serial-1',
      title: 'Basic @Serializable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Mark a data class as serializable.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

___
data class Person(val name: String, val age: Int)

fun main() {
    val json = Json.encodeToString(Person("Alice", 30))
    println(json)
}`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Person(val name: String, val age: Int)

fun main() {
    val json = Json.encodeToString(Person("Alice", 30))
    println(json)
}`,
      hints: [
        '@Serializable generates a serializer at compile time.',
        'No runtime reflection is needed.',
        'The annotation must be on the class, not the properties.',
      ],
      concepts: ['Serializable', 'encodeToString'],
    },
    {
      id: 'kt-serial-2',
      title: 'Decode from JSON',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Decode a JSON string to an object.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Point(val x: Int, val y: Int)

fun main() {
    val json = """{"x":10,"y":20}"""
    val point = Json.___<Point>(json)
    println(point)
}`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Point(val x: Int, val y: Int)

fun main() {
    val json = """{"x":10,"y":20}"""
    val point = Json.decodeFromString<Point>(json)
    println(point)
}`,
      hints: [
        'decodeFromString parses JSON into an object.',
        'The type parameter specifies the target class.',
        'Use raw string literals for JSON with quotes.',
      ],
      concepts: ['decodeFromString', 'JSON-parsing'],
    },
    {
      id: 'kt-serial-3',
      title: '@SerialName',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use @SerialName to customize JSON field names.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class ApiUser(
    @___(\"user_name\") val userName: String,
    @___(\"created_at\") val createdAt: String
)`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class ApiUser(
    @SerialName("user_name") val userName: String,
    @SerialName("created_at") val createdAt: String
)`,
      hints: [
        '@SerialName maps a Kotlin property to a different JSON key.',
        'The JSON uses snake_case but Kotlin uses camelCase.',
        'This avoids naming convention conflicts.',
      ],
      concepts: ['SerialName', 'naming-convention'],
    },
    {
      id: 'kt-serial-4',
      title: 'Default Values',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Use default values for optional fields.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Settings(
    val theme: String = "light",
    val fontSize: Int = ___,
    val notifications: Boolean = ___
)

fun main() {
    val json = """{"theme":"dark"}"""
    val settings = Json.decodeFromString<Settings>(json)
    println(settings)
}`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Settings(
    val theme: String = "light",
    val fontSize: Int = 14,
    val notifications: Boolean = true
)

fun main() {
    val json = """{"theme":"dark"}"""
    val settings = Json.decodeFromString<Settings>(json)
    println(settings)
}`,
      hints: [
        'Fields with defaults are optional during deserialization.',
        'Missing JSON fields use the Kotlin default values.',
        'Only theme is in the JSON; fontSize and notifications use defaults.',
      ],
      concepts: ['default-values', 'optional-fields'],
    },
    {
      id: 'kt-serial-5',
      title: 'Custom Json Configuration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Configure Json with custom settings.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

val customJson = ___ {
    prettyPrint = true
    ignoreUnknownKeys = true
    encodeDefaults = true
}

@Serializable
data class Item(val id: Int, val name: String, val active: Boolean = true)

fun main() {
    val item = Item(1, "Widget")
    println(customJson.encodeToString(item))
}`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

val customJson = Json {
    prettyPrint = true
    ignoreUnknownKeys = true
    encodeDefaults = true
}

@Serializable
data class Item(val id: Int, val name: String, val active: Boolean = true)

fun main() {
    val item = Item(1, "Widget")
    println(customJson.encodeToString(item))
}`,
      hints: [
        'Json { } creates a configured Json instance.',
        'prettyPrint formats with indentation.',
        'ignoreUnknownKeys skips unknown JSON fields.',
      ],
      concepts: ['Json-builder', 'configuration'],
    },
    {
      id: 'kt-serial-6',
      title: 'Serialize a List',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Serialize and deserialize a list of objects.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Task(val id: Int, val title: String)

fun main() {
    val tasks = listOf(Task(1, "Buy milk"), Task(2, "Code"))
    val json = Json.encodeToString(___<List<Task>>(), tasks)
    println(json)
}`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Task(val id: Int, val title: String)

fun main() {
    val tasks = listOf(Task(1, "Buy milk"), Task(2, "Code"))
    val json = Json.encodeToString(serializer<List<Task>>(), tasks)
    println(json)
}`,
      hints: [
        'Use serializer<List<Task>>() to get the list serializer.',
        'Or use Json.encodeToString(tasks) with the reified overload.',
        'Lists are serialized as JSON arrays.',
      ],
      concepts: ['list-serialization', 'serializer'],
    },
    {
      id: 'kt-serial-7',
      title: 'Write a Serializable Sealed Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a sealed class hierarchy that is serializable.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

// Write:
// 1. @Serializable sealed class Shape
// 2. @Serializable data class Circle(val radius: Double) : Shape()
// 3. @Serializable data class Rect(val width: Double, val height: Double) : Shape()
// 4. A function that serializes a list of shapes to JSON`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
sealed class Shape

@Serializable
@SerialName("circle")
data class Circle(val radius: Double) : Shape()

@Serializable
@SerialName("rect")
data class Rect(val width: Double, val height: Double) : Shape()

fun serializeShapes(shapes: List<Shape>): String {
    return Json.encodeToString(shapes)
}`,
      hints: [
        'Sealed classes need @SerialName on each subclass for polymorphism.',
        'The JSON includes a type discriminator field.',
        'All subclasses must also be @Serializable.',
      ],
      concepts: ['sealed-class', 'polymorphic-serialization', 'SerialName'],
    },
    {
      id: 'kt-serial-8',
      title: 'Write a JSON Parser Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a function that safely parses JSON with error handling.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Config(val host: String, val port: Int, val debug: Boolean = false)

// Write a function called parseConfig that:
// 1. Takes a jsonString: String parameter
// 2. Returns Result<Config>
// 3. Uses Json { ignoreUnknownKeys = true }
// 4. Wraps decodeFromString in try/catch
// 5. Returns Result.success or Result.failure`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Config(val host: String, val port: Int, val debug: Boolean = false)

fun parseConfig(jsonString: String): Result<Config> {
    val json = Json { ignoreUnknownKeys = true }
    return try {
        Result.success(json.decodeFromString<Config>(jsonString))
    } catch (e: SerializationException) {
        Result.failure(e)
    }
}`,
      hints: [
        'SerializationException is thrown for invalid JSON.',
        'Result wraps success/failure in a type-safe way.',
        'ignoreUnknownKeys makes parsing more lenient.',
      ],
      concepts: ['error-handling', 'Result', 'decodeFromString'],
    },
    {
      id: 'kt-serial-9',
      title: 'Write a Nested Object Serializer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write serializable classes with nested objects.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

// Write serializable classes:
// 1. @Serializable data class Address(val street: String, val city: String, val zip: String)
// 2. @Serializable data class Company(val name: String, val address: Address)
// 3. @Serializable data class Employee(val name: String, val company: Company)
// 4. Function to round-trip serialize/deserialize an Employee`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Address(val street: String, val city: String, val zip: String)

@Serializable
data class Company(val name: String, val address: Address)

@Serializable
data class Employee(val name: String, val company: Company)

fun roundTrip(employee: Employee): Employee {
    val json = Json.encodeToString(employee)
    return Json.decodeFromString(json)
}`,
      hints: [
        'Nested @Serializable classes are serialized recursively.',
        'The JSON structure mirrors the object nesting.',
        'Round-trip means encode then decode should give the same object.',
      ],
      concepts: ['nested-serialization', 'round-trip'],
    },
    {
      id: 'kt-serial-10',
      title: 'Write a Generic Serialization Utility',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a generic utility for serialization with pretty printing.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

// Write:
// 1. An object called Serializer with a private val json configured for prettyPrint and ignoreUnknownKeys
// 2. An inline fun <reified T> toJson(value: T): String
// 3. An inline fun <reified T> fromJson(jsonStr: String): T
// 4. An inline fun <reified T> clone(value: T): T that round-trips through JSON`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

object Serializer {
    private val json = Json {
        prettyPrint = true
        ignoreUnknownKeys = true
    }

    inline fun <reified T> toJson(value: T): String {
        return json.encodeToString(value)
    }

    inline fun <reified T> fromJson(jsonStr: String): T {
        return json.decodeFromString(jsonStr)
    }

    inline fun <reified T> clone(value: T): T {
        return fromJson(toJson(value))
    }
}`,
      hints: [
        'reified type parameters preserve the type at runtime.',
        'encodeToString and decodeFromString use the reified type.',
        'clone does a round-trip through JSON for deep copying.',
      ],
      concepts: ['reified', 'generic-serialization', 'utility-object'],
    },
    {
      id: 'kt-serial-11',
      title: 'Write a Map Serializer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Serialize and deserialize maps.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

// Write a function called serializeMap that:
// 1. Takes a Map<String, Int>
// 2. Encodes it to JSON string
// 3. Decodes it back and returns the map
// Maps are serialized as JSON objects`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

fun serializeMap(input: Map<String, Int>): Map<String, Int> {
    val json = Json.encodeToString(input)
    println(json)
    return Json.decodeFromString(json)
}`,
      hints: [
        'Map<String, *> serializes as a JSON object.',
        'Keys must be strings for JSON object serialization.',
        'encodeToString works directly with Map types.',
      ],
      concepts: ['map-serialization', 'JSON-object'],
    },
    {
      id: 'kt-serial-12',
      title: 'Write an Enum Serializer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Serialize an enum with custom names.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

// Write:
// 1. @Serializable enum class Priority with LOW, MEDIUM, HIGH, CRITICAL
// 2. Use @SerialName on each to serialize as lowercase ("low", "medium", etc.)
// 3. @Serializable data class Task(val title: String, val priority: Priority)
// 4. Serialize and deserialize a Task`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
enum class Priority {
    @SerialName("low") LOW,
    @SerialName("medium") MEDIUM,
    @SerialName("high") HIGH,
    @SerialName("critical") CRITICAL
}

@Serializable
data class Task(val title: String, val priority: Priority)

fun main() {
    val task = Task("Fix bug", Priority.HIGH)
    val json = Json.encodeToString(task)
    println(json) // {"title":"Fix bug","priority":"high"}
    val decoded = Json.decodeFromString<Task>(json)
    println(decoded)
}`,
      hints: [
        '@SerialName on enum entries customizes JSON values.',
        'Without @SerialName, the enum name is used as-is.',
        'Lowercase is common for JSON API conventions.',
      ],
      concepts: ['enum-serialization', 'SerialName'],
    },
    {
      id: 'kt-serial-13',
      title: 'Fix Missing @Serializable',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Fix the class that cannot be serialized.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

data class User(val name: String, val age: Int)

fun main() {
    val json = Json.encodeToString(User("Alice", 30))  // Error: no serializer
    println(json)
}`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class User(val name: String, val age: Int)

fun main() {
    val json = Json.encodeToString(User("Alice", 30))
    println(json)
}`,
      hints: [
        'Classes need @Serializable to generate a serializer.',
        'Without it, encodeToString cannot find a serializer.',
        'Add @Serializable before the class declaration.',
      ],
      concepts: ['Serializable', 'serializer-generation'],
    },
    {
      id: 'kt-serial-14',
      title: 'Fix Unknown Keys Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix JSON parsing that fails on unknown fields.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Profile(val name: String)

fun main() {
    val json = """{"name":"Alice","email":"alice@test.com","age":30}"""
    val profile = Json.decodeFromString<Profile>(json)  // Crashes: unknown keys
    println(profile)
}`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Profile(val name: String)

fun main() {
    val json = """{"name":"Alice","email":"alice@test.com","age":30}"""
    val lenientJson = Json { ignoreUnknownKeys = true }
    val profile = lenientJson.decodeFromString<Profile>(json)
    println(profile)
}`,
      hints: [
        'By default, unknown JSON keys cause an error.',
        'Use Json { ignoreUnknownKeys = true } to skip them.',
        'This is essential for parsing APIs that return extra fields.',
      ],
      concepts: ['ignoreUnknownKeys', 'lenient-parsing'],
    },
    {
      id: 'kt-serial-15',
      title: 'Fix Null Value Handling',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix serialization of nullable fields.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Response(val data: String, val error: String)  // error should be nullable

fun main() {
    val json = """{"data":"ok","error":null}"""
    val resp = Json.decodeFromString<Response>(json)  // Crashes: null for non-null
    println(resp)
}`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Response(val data: String, val error: String? = null)

fun main() {
    val json = """{"data":"ok","error":null}"""
    val resp = Json.decodeFromString<Response>(json)
    println(resp)
}`,
      hints: [
        'Make the field nullable with String? to accept null values.',
        'Add a default of null so the field is optional.',
        'Non-null types reject JSON null values.',
      ],
      concepts: ['nullable-fields', 'default-values'],
    },
    {
      id: 'kt-serial-16',
      title: 'Predict JSON Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Predict the JSON string produced by encoding.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Pair(val first: String, val second: Int)

fun main() {
    println(Json.encodeToString(Pair("hello", 42)))
}`,
      solution: `{"first":"hello","second":42}`,
      hints: [
        'Property names become JSON keys.',
        'Strings are quoted, numbers are not.',
        'Output is compact (no spaces) by default.',
      ],
      concepts: ['encodeToString', 'JSON-format'],
    },
    {
      id: 'kt-serial-17',
      title: 'Predict Decoded Object',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the decoded object from JSON.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class Config(val host: String, val port: Int = 3000, val ssl: Boolean = false)

fun main() {
    val json = """{"host":"api.example.com","ssl":true}"""
    val config = Json.decodeFromString<Config>(json)
    println("\${config.host}:\${config.port} ssl=\${config.ssl}")
}`,
      solution: `api.example.com:3000 ssl=true`,
      hints: [
        'host and ssl come from JSON.',
        'port uses the default value 3000.',
        'Defaults apply for missing fields.',
      ],
      concepts: ['default-values', 'partial-deserialization'],
    },
    {
      id: 'kt-serial-18',
      title: 'Predict SerialName Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict JSON output with @SerialName.',
      skeleton: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class User(
    @SerialName("full_name") val fullName: String,
    @SerialName("is_admin") val isAdmin: Boolean
)

fun main() {
    println(Json.encodeToString(User("Alice", true)))
}`,
      solution: `{"full_name":"Alice","is_admin":true}`,
      hints: [
        '@SerialName changes the JSON key name.',
        'fullName becomes "full_name" in JSON.',
        'isAdmin becomes "is_admin" in JSON.',
      ],
      concepts: ['SerialName', 'JSON-keys'],
    },
    {
      id: 'kt-serial-19',
      title: 'Refactor Manual JSON to Serialization',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor manual JSON string building to kotlinx.serialization.',
      skeleton: `data class User(val name: String, val age: Int, val active: Boolean)

fun toJson(user: User): String {
    return """{"name":"\${user.name}","age":\${user.age},"active":\${user.active}}"""
}

fun fromJson(json: String): User {
    // Fragile manual parsing
    val name = json.substringAfter("\"name\":\"").substringBefore("\"")
    val age = json.substringAfter("\"age\":").substringBefore(",").toInt()
    val active = json.substringAfter("\"active\":").substringBefore("}").toBoolean()
    return User(name, age, active)
}`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class User(val name: String, val age: Int, val active: Boolean)

fun toJson(user: User): String {
    return Json.encodeToString(user)
}

fun fromJson(json: String): User {
    return Json.decodeFromString(json)
}`,
      hints: [
        'Add @Serializable to the data class.',
        'Replace manual building with Json.encodeToString.',
        'Replace manual parsing with Json.decodeFromString.',
      ],
      concepts: ['Serializable', 'encodeToString', 'decodeFromString'],
    },
    {
      id: 'kt-serial-20',
      title: 'Refactor Gson to kotlinx.serialization',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Refactor code using Gson to kotlinx.serialization.',
      skeleton: `// Using Gson (Java library)
import com.google.gson.Gson
import com.google.gson.annotations.SerializedName

data class ApiResponse(
    @SerializedName("status_code") val statusCode: Int,
    @SerializedName("message") val message: String,
    @SerializedName("data") val data: List<String>?
)

val gson = Gson()
fun encode(resp: ApiResponse): String = gson.toJson(resp)
fun decode(json: String): ApiResponse = gson.fromJson(json, ApiResponse::class.java)`,
      solution: `import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class ApiResponse(
    @SerialName("status_code") val statusCode: Int,
    val message: String,
    val data: List<String>? = null
)

private val json = Json { ignoreUnknownKeys = true }
fun encode(resp: ApiResponse): String = json.encodeToString(resp)
fun decode(jsonStr: String): ApiResponse = json.decodeFromString(jsonStr)`,
      hints: [
        'Replace @SerializedName with @SerialName.',
        'Replace Gson with Json from kotlinx.serialization.',
        'Add @Serializable and make nullable fields have defaults.',
      ],
      concepts: ['migration', 'SerialName', 'kotlinx-serialization'],
    },
  ],
};
