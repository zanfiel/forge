import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-annot',
  title: '32. Annotations',
  explanation: `## Annotations in Kotlin

Annotations attach metadata to code elements. Kotlin supports custom annotations, use-site targets, and Java interop annotations.

### Defining Annotations

\`\`\`kotlin
annotation class Fancy

@Fancy
class MyClass
\`\`\`

### Annotation with Parameters

\`\`\`kotlin
annotation class Special(val reason: String)

@Special("performance")
fun optimizedFunction() { }
\`\`\`

### Use-Site Targets

\`\`\`kotlin
class User(
    @get:JsonProperty("user_name") val name: String,
    @field:NotNull val email: String
)
\`\`\`

### Java Interop Annotations

\`\`\`kotlin
class Utils {
    companion object {
        @JvmStatic
        fun helper() { }
        
        @JvmField
        val VERSION = "1.0"
    }
}
\`\`\`

### @JvmOverloads

\`\`\`kotlin
class View @JvmOverloads constructor(
    val name: String,
    val size: Int = 10,
    val color: String = "blue"
)
\`\`\``,
  exercises: [
    {
      id: 'kt-annot-1',
      title: 'Define a Simple Annotation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Define a custom annotation class.',
      skeleton: `___ class Deprecated(val message: String)

@Deprecated("Use newFunction instead")
fun oldFunction() { }`,
      solution: `annotation class Deprecated(val message: String)

@Deprecated("Use newFunction instead")
fun oldFunction() { }`,
      hints: [
        'Use the annotation keyword before class.',
        'Annotation parameters must be val.',
        'Only certain types are allowed: primitives, String, KClass, enums, other annotations.',
      ],
      concepts: ['annotation-class', 'annotation-parameters'],
    },
    {
      id: 'kt-annot-2',
      title: '@JvmStatic Usage',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use @JvmStatic to make a companion object method a static method in Java.',
      skeleton: `class MathUtils {
    companion object {
        ___
        fun add(a: Int, b: Int): Int = a + b
    }
}`,
      solution: `class MathUtils {
    companion object {
        @JvmStatic
        fun add(a: Int, b: Int): Int = a + b
    }
}`,
      hints: [
        '@JvmStatic generates a real static method for Java interop.',
        'Without it, Java code must call MathUtils.Companion.add().',
        'With it, Java code can call MathUtils.add() directly.',
      ],
      concepts: ['JvmStatic', 'companion-object', 'java-interop'],
    },
    {
      id: 'kt-annot-3',
      title: '@JvmField Usage',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use @JvmField to expose a property as a public field.',
      skeleton: `class Constants {
    companion object {
        ___
        val MAX_SIZE = 100
    }
}`,
      solution: `class Constants {
    companion object {
        @JvmField
        val MAX_SIZE = 100
    }
}`,
      hints: [
        '@JvmField exposes the property as a public field without getters/setters.',
        'Java code can access it as Constants.MAX_SIZE directly.',
        'Without it, Java would need Constants.Companion.getMAX_SIZE().',
      ],
      concepts: ['JvmField', 'java-interop'],
    },
    {
      id: 'kt-annot-4',
      title: 'Use-Site Target',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use a use-site target to apply an annotation to a specific element.',
      skeleton: `annotation class Validate

class User(
    @___:Validate val name: String,
    @___:Validate val email: String
)`,
      solution: `annotation class Validate

class User(
    @get:Validate val name: String,
    @field:Validate val email: String
)`,
      hints: [
        'Use-site targets specify which element the annotation applies to.',
        'Common targets: field, get, set, param, property.',
        '@get: applies to the getter, @field: applies to the backing field.',
      ],
      concepts: ['use-site-target', 'get', 'field'],
    },
    {
      id: 'kt-annot-5',
      title: '@JvmOverloads',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use @JvmOverloads to generate overloaded methods for Java.',
      skeleton: `class Greeting {
    ___
    fun greet(name: String = "World", prefix: String = "Hello"): String {
        return "\${prefix}, \${name}!"
    }
}`,
      solution: `class Greeting {
    @JvmOverloads
    fun greet(name: String = "World", prefix: String = "Hello"): String {
        return "\${prefix}, \${name}!"
    }
}`,
      hints: [
        '@JvmOverloads generates overloaded methods for each default parameter combination.',
        'Java cannot use Kotlin default parameters directly.',
        'This generates greet(), greet(name), and greet(name, prefix) in bytecode.',
      ],
      concepts: ['JvmOverloads', 'default-parameters', 'java-interop'],
    },
    {
      id: 'kt-annot-6',
      title: 'Annotation with Array Parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Create an annotation with an array parameter.',
      skeleton: `annotation class Route(val methods: ___)

@Route(methods = ["GET", "POST"])
fun handleRequest() { }`,
      solution: `annotation class Route(val methods: Array<String>)

@Route(methods = ["GET", "POST"])
fun handleRequest() { }`,
      hints: [
        'Annotation parameters can be arrays of allowed types.',
        'Use Array<String> for a string array parameter.',
        'At the use site, pass arrays with [] literal syntax.',
      ],
      concepts: ['annotation-array', 'Array'],
    },
    {
      id: 'kt-annot-7',
      title: 'Write a Custom Annotation',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Write a custom annotation with multiple parameters.',
      skeleton: `// Write an annotation class called Api that:
// 1. Has a val path: String parameter
// 2. Has a val method: String parameter with default "GET"
// 3. Has a val version: Int parameter with default 1
// Then annotate a function fetchUsers with @Api(path = "/users")`,
      solution: `annotation class Api(
    val path: String,
    val method: String = "GET",
    val version: Int = 1
)

@Api(path = "/users")
fun fetchUsers(): List<String> = listOf("Alice", "Bob")`,
      hints: [
        'Annotation parameters can have default values.',
        'Only the parameters without defaults must be specified at use site.',
        'Use val for all annotation parameters.',
      ],
      concepts: ['annotation-class', 'default-parameters'],
    },
    {
      id: 'kt-annot-8',
      title: 'Write Target-Restricted Annotation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write an annotation restricted to specific targets.',
      skeleton: `// Write an annotation class called Injectable that:
// 1. Is restricted to CLASS and CONSTRUCTOR targets using @Target
// 2. Has RUNTIME retention using @Retention
// 3. Has no parameters
// Then apply it to a class called UserService`,
      solution: `@Target(AnnotationTarget.CLASS, AnnotationTarget.CONSTRUCTOR)
@Retention(AnnotationRetention.RUNTIME)
annotation class Injectable

@Injectable
class UserService {
    fun getUser(): String = "User"
}`,
      hints: [
        '@Target restricts where the annotation can be used.',
        '@Retention controls whether the annotation is available at runtime.',
        'AnnotationRetention.RUNTIME makes it accessible via reflection.',
      ],
      concepts: ['Target', 'Retention', 'AnnotationTarget'],
    },
    {
      id: 'kt-annot-9',
      title: 'Write Repeatable Annotation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a repeatable annotation that can be applied multiple times.',
      skeleton: `// Write a repeatable annotation called Tag that:
// 1. Has a val name: String parameter
// 2. Is marked @Repeatable
// 3. Has RUNTIME retention
// Then apply @Tag("fast") and @Tag("unit") to a test function`,
      solution: `@Repeatable
@Retention(AnnotationRetention.RUNTIME)
annotation class Tag(val name: String)

@Tag("fast")
@Tag("unit")
fun myTest() {
    println("Test running")
}`,
      hints: [
        '@Repeatable allows the same annotation to be used multiple times.',
        'Each use can have different parameter values.',
        'Kotlin 1.6+ supports @Repeatable natively.',
      ],
      concepts: ['Repeatable', 'annotation', 'tagging'],
    },
    {
      id: 'kt-annot-10',
      title: 'Write Annotation Processor Simulation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write code that reads annotations at runtime using reflection.',
      skeleton: `// Write the following:
// 1. @Retention(RUNTIME) annotation class Endpoint(val path: String)
// 2. A class ApiController with three functions annotated with @Endpoint:
//    - @Endpoint("/users") fun users() = "users"
//    - @Endpoint("/posts") fun posts() = "posts"
//    - fun helper() = "not an endpoint" (no annotation)
// 3. A function discoverEndpoints(clazz: KClass<*>): List<String> that:
//    - Gets all member functions
//    - Filters those with @Endpoint annotation
//    - Returns list of paths`,
      solution: `import kotlin.reflect.KClass
import kotlin.reflect.full.findAnnotation
import kotlin.reflect.full.memberFunctions

@Retention(AnnotationRetention.RUNTIME)
annotation class Endpoint(val path: String)

class ApiController {
    @Endpoint("/users")
    fun users() = "users"

    @Endpoint("/posts")
    fun posts() = "posts"

    fun helper() = "not an endpoint"
}

fun discoverEndpoints(clazz: KClass<*>): List<String> {
    return clazz.memberFunctions
        .mapNotNull { it.findAnnotation<Endpoint>() }
        .map { it.path }
}`,
      hints: [
        'Use KClass.memberFunctions to get all functions.',
        'findAnnotation<T>() returns null if the annotation is not present.',
        'mapNotNull filters out nulls while transforming.',
      ],
      concepts: ['reflection', 'findAnnotation', 'runtime-annotation'],
    },
    {
      id: 'kt-annot-11',
      title: 'Write JvmName Annotation Usage',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use @JvmName to resolve name clashes between Kotlin files.',
      skeleton: `// Write a file-level @JvmName annotation and two extension functions:
// 1. Use @file:JvmName("StringUtils") at the top
// 2. Write fun String.isPalindrome(): Boolean
//    - Returns true if the string reads the same forwards and backwards
// 3. Write fun String.wordCount(): Int
//    - Returns the number of words (split by whitespace)`,
      solution: `@file:JvmName("StringUtils")

fun String.isPalindrome(): Boolean {
    val cleaned = this.lowercase().filter { it.isLetterOrDigit() }
    return cleaned == cleaned.reversed()
}

fun String.wordCount(): Int {
    return this.trim().split("\\\\s+".toRegex()).filter { it.isNotEmpty() }.size
}`,
      hints: [
        '@file:JvmName changes the generated class name for Java interop.',
        'Without it, the class name is derived from the filename.',
        'This prevents name clashes when multiple files have top-level functions.',
      ],
      concepts: ['JvmName', 'file-annotation', 'extension-function'],
    },
    {
      id: 'kt-annot-12',
      title: 'Write @Throws Annotation Usage',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use @Throws for Java interop with checked exceptions.',
      skeleton: `// Write a function called parseNumber that:
// 1. Takes a String parameter
// 2. Is annotated with @Throws(NumberFormatException::class)
// 3. Returns the string converted to Int using .toInt()
// 4. This allows Java code to handle the checked exception`,
      solution: `@Throws(NumberFormatException::class)
fun parseNumber(input: String): Int {
    return input.toInt()
}`,
      hints: [
        '@Throws declares checked exceptions for Java callers.',
        'Kotlin does not have checked exceptions, but Java does.',
        'The annotation generates the throws clause in bytecode.',
      ],
      concepts: ['Throws', 'checked-exceptions', 'java-interop'],
    },
    {
      id: 'kt-annot-13',
      title: 'Fix Missing Use-Site Target',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the annotation that targets the wrong element.',
      skeleton: `annotation class Positive

data class Product(
    @Positive val price: Double  // Annotation goes to parameter, not field!
)

// Java framework needs it on the field for validation`,
      solution: `annotation class Positive

data class Product(
    @field:Positive val price: Double
)`,
      hints: [
        'Constructor val parameters default the annotation to the parameter.',
        'Use @field: to target the backing field instead.',
        'Java frameworks like Hibernate read field annotations.',
      ],
      concepts: ['use-site-target', 'field', 'java-framework'],
    },
    {
      id: 'kt-annot-14',
      title: 'Fix JvmStatic on Non-Companion',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the @JvmStatic annotation placed on a regular method.',
      skeleton: `class Converter {
    @JvmStatic
    fun toUpperCase(s: String): String = s.uppercase()
}`,
      solution: `class Converter {
    companion object {
        @JvmStatic
        fun toUpperCase(s: String): String = s.uppercase()
    }
}`,
      hints: [
        '@JvmStatic can only be used in companion objects or named objects.',
        'Move the function into a companion object.',
        'Or make Converter an object instead of a class.',
      ],
      concepts: ['JvmStatic', 'companion-object'],
    },
    {
      id: 'kt-annot-15',
      title: 'Fix Annotation Retention',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the annotation that cannot be read at runtime due to wrong retention.',
      skeleton: `@Retention(AnnotationRetention.SOURCE)
annotation class Loggable(val tag: String)

@Loggable("UserService")
class UserService

fun getTag(clazz: Any): String? {
    // Returns null because annotation is not available at runtime!
    return clazz::class.annotations
        .filterIsInstance<Loggable>()
        .firstOrNull()?.tag
}`,
      solution: `@Retention(AnnotationRetention.RUNTIME)
annotation class Loggable(val tag: String)

@Loggable("UserService")
class UserService

fun getTag(clazz: Any): String? {
    return clazz::class.annotations
        .filterIsInstance<Loggable>()
        .firstOrNull()?.tag
}`,
      hints: [
        'SOURCE retention strips the annotation before compilation.',
        'RUNTIME retention makes it available via reflection.',
        'Change AnnotationRetention.SOURCE to AnnotationRetention.RUNTIME.',
      ],
      concepts: ['Retention', 'RUNTIME', 'reflection'],
    },
    {
      id: 'kt-annot-16',
      title: 'Predict Annotation Availability',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict whether an annotation is available at runtime.',
      skeleton: `@Retention(AnnotationRetention.RUNTIME)
annotation class Info(val value: String)

@Info("test")
class Demo

fun main() {
    val ann = Demo::class.annotations.firstOrNull() as? Info
    println(ann?.value ?: "not found")
}`,
      solution: `test`,
      hints: [
        'RUNTIME retention makes the annotation available via reflection.',
        'Demo::class.annotations contains the @Info annotation.',
        'Casting to Info gives access to the value property.',
      ],
      concepts: ['RUNTIME', 'reflection', 'annotations'],
    },
    {
      id: 'kt-annot-17',
      title: 'Predict JvmOverloads Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict how many overloaded methods @JvmOverloads generates.',
      skeleton: `class Builder {
    @JvmOverloads
    fun create(name: String, size: Int = 10, color: String = "red"): String {
        return "\${name}-\${size}-\${color}"
    }
}

fun main() {
    val b = Builder()
    println(b.create("box"))
    println(b.create("box", 20))
    println(b.create("box", 20, "blue"))
}`,
      solution: `box-10-red
box-20-red
box-20-blue`,
      hints: [
        '@JvmOverloads generates overloads for each default parameter.',
        'create("box") uses both defaults: size=10, color="red".',
        'create("box", 20) uses only color default.',
      ],
      concepts: ['JvmOverloads', 'default-parameters'],
    },
    {
      id: 'kt-annot-18',
      title: 'Predict Annotation Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict how many annotations are found on a class.',
      skeleton: `@Retention(AnnotationRetention.RUNTIME)
annotation class A
@Retention(AnnotationRetention.RUNTIME)
annotation class B
@Retention(AnnotationRetention.SOURCE)
annotation class C

@A @B @C
class Tagged

fun main() {
    println(Tagged::class.annotations.size)
}`,
      solution: `2`,
      hints: [
        'Only RUNTIME annotations are visible via reflection.',
        '@A and @B have RUNTIME retention.',
        '@C has SOURCE retention and is stripped at compile time.',
      ],
      concepts: ['Retention', 'SOURCE', 'RUNTIME'],
    },
    {
      id: 'kt-annot-19',
      title: 'Refactor Magic Strings to Annotations',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor magic string configuration to annotation-based configuration.',
      skeleton: `class Router {
    private val routes = mutableMapOf<String, () -> String>()
    
    fun register() {
        routes["/users"] = { "User list" }
        routes["/posts"] = { "Post list" }
        routes["/about"] = { "About page" }
    }
    
    fun handle(path: String): String = routes[path]?.invoke() ?: "Not found"
}`,
      solution: `@Retention(AnnotationRetention.RUNTIME)
@Target(AnnotationTarget.FUNCTION)
annotation class Route(val path: String)

class Router {
    @Route("/users")
    fun users() = "User list"

    @Route("/posts")
    fun posts() = "Post list"

    @Route("/about")
    fun about() = "About page"

    fun handle(path: String): String {
        val method = this::class.members.find { member ->
            member.annotations.filterIsInstance<Route>().any { it.path == path }
        }
        return (method?.call(this) as? String) ?: "Not found"
    }
}`,
      hints: [
        'Define a @Route annotation with a path parameter.',
        'Annotate each handler function with its route.',
        'Use reflection to discover routes at runtime.',
      ],
      concepts: ['annotation', 'reflection', 'routing', 'refactoring'],
    },
    {
      id: 'kt-annot-20',
      title: 'Refactor Java-Style Getters to Kotlin with @JvmName',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor Java-style getter methods to Kotlin properties with @get:JvmName.',
      skeleton: `class User {
    private var _name: String = ""
    private var _active: Boolean = false
    
    fun getName(): String = _name
    fun setName(name: String) { _name = name }
    fun isActive(): Boolean = _active
    fun setActive(active: Boolean) { _active = active }
}`,
      solution: `class User {
    var name: String = ""

    @get:JvmName("isActive")
    var active: Boolean = false
}`,
      hints: [
        'Kotlin properties automatically generate getters and setters.',
        'Use @get:JvmName to customize the getter name for Java callers.',
        'Boolean properties with "is" prefix need @get:JvmName for compatibility.',
      ],
      concepts: ['JvmName', 'properties', 'java-interop', 'refactoring'],
    },
  ],
};
