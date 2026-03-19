import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-reflect',
  title: '33. Reflection',
  explanation: `## Reflection in Kotlin

Kotlin reflection allows inspecting and manipulating code structure at runtime using the \`kotlin-reflect\` library.

### KClass

\`\`\`kotlin
val kClass: KClass<String> = String::class
println(kClass.simpleName) // "String"
println(kClass.qualifiedName) // "kotlin.String"
\`\`\`

### KProperty

\`\`\`kotlin
class Person(val name: String, var age: Int)

val prop = Person::name
println(prop.get(Person("Alice", 30))) // "Alice"
\`\`\`

### KFunction

\`\`\`kotlin
fun greet(name: String) = "Hello, \$name!"

val func = ::greet
println(func.call("World")) // "Hello, World!"
\`\`\`

### Member References

\`\`\`kotlin
val members = Person::class.memberProperties
members.forEach { println("\${it.name}: \${it.returnType}") }
\`\`\`

### callBy with Named Parameters

\`\`\`kotlin
val constructor = Person::class.primaryConstructor!!
val person = constructor.callBy(
    mapOf(
        constructor.parameters[0] to "Alice",
        constructor.parameters[1] to 30
    )
)
\`\`\``,
  exercises: [
    {
      id: 'kt-reflect-1',
      title: 'Get KClass',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Get the KClass reference for a type.',
      skeleton: `import kotlin.reflect.KClass

fun main() {
    val klass: KClass<String> = String::___
    println(klass.simpleName)
}`,
      solution: `import kotlin.reflect.KClass

fun main() {
    val klass: KClass<String> = String::class
    println(klass.simpleName)
}`,
      hints: [
        '::class gives the KClass reference for a type.',
        'KClass is Kotlin reflection equivalent of Java Class.',
        'simpleName returns the short name of the class.',
      ],
      concepts: ['KClass', 'class-reference'],
    },
    {
      id: 'kt-reflect-2',
      title: 'Property Reference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Use a property reference to get a value.',
      skeleton: `class User(val name: String)

fun main() {
    val prop = User::___
    val user = User("Alice")
    println(prop.get(user))
}`,
      solution: `class User(val name: String)

fun main() {
    val prop = User::name
    val user = User("Alice")
    println(prop.get(user))
}`,
      hints: [
        'ClassName::propertyName creates a KProperty reference.',
        'Call .get(instance) to retrieve the value from an object.',
        'Property references are first-class in Kotlin.',
      ],
      concepts: ['KProperty', 'property-reference', 'get'],
    },
    {
      id: 'kt-reflect-3',
      title: 'Function Reference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Use a function reference to call a function reflectively.',
      skeleton: `fun double(x: Int): Int = x * 2

fun main() {
    val func = ___double
    println(func.call(21))
}`,
      solution: `fun double(x: Int): Int = x * 2

fun main() {
    val func = ::double
    println(func.call(21))
}`,
      hints: [
        '::functionName creates a KFunction reference.',
        'call() invokes the function with the given arguments.',
        'Function references can be passed around as values.',
      ],
      concepts: ['KFunction', 'function-reference', 'call'],
    },
    {
      id: 'kt-reflect-4',
      title: 'List Member Properties',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'List all member properties of a class using reflection.',
      skeleton: `import kotlin.reflect.full.memberProperties

data class Point(val x: Int, val y: Int)

fun main() {
    val props = Point::class.___
    props.forEach { println("\${it.name}: \${it.returnType}") }
}`,
      solution: `import kotlin.reflect.full.memberProperties

data class Point(val x: Int, val y: Int)

fun main() {
    val props = Point::class.memberProperties
    props.forEach { println("\${it.name}: \${it.returnType}") }
}`,
      hints: [
        'memberProperties returns all properties declared in the class.',
        'Each property has name and returnType.',
        'Import kotlin.reflect.full.memberProperties extension.',
      ],
      concepts: ['memberProperties', 'introspection'],
    },
    {
      id: 'kt-reflect-5',
      title: 'Primary Constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Access the primary constructor of a class via reflection.',
      skeleton: `import kotlin.reflect.full.primaryConstructor

data class Config(val host: String, val port: Int)

fun main() {
    val ctor = Config::class.___!!
    val config = ctor.call("localhost", 8080)
    println(config)
}`,
      solution: `import kotlin.reflect.full.primaryConstructor

data class Config(val host: String, val port: Int)

fun main() {
    val ctor = Config::class.primaryConstructor!!
    val config = ctor.call("localhost", 8080)
    println(config)
}`,
      hints: [
        'primaryConstructor returns the primary constructor, or null if none.',
        'Use !! since data classes always have a primary constructor.',
        'call() invokes the constructor with positional arguments.',
      ],
      concepts: ['primaryConstructor', 'call'],
    },
    {
      id: 'kt-reflect-6',
      title: 'callBy with Default Parameters',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Use callBy to invoke a constructor with optional parameters.',
      skeleton: `import kotlin.reflect.full.primaryConstructor

data class Settings(val debug: Boolean = false, val verbose: Boolean = true)

fun main() {
    val ctor = Settings::class.primaryConstructor!!
    val settings = ctor.___(emptyMap())
    println(settings)
}`,
      solution: `import kotlin.reflect.full.primaryConstructor

data class Settings(val debug: Boolean = false, val verbose: Boolean = true)

fun main() {
    val ctor = Settings::class.primaryConstructor!!
    val settings = ctor.callBy(emptyMap())
    println(settings)
}`,
      hints: [
        'callBy accepts a map of parameter to value.',
        'Parameters not in the map use their default values.',
        'An empty map means all parameters use defaults.',
      ],
      concepts: ['callBy', 'default-parameters', 'reflection'],
    },
    {
      id: 'kt-reflect-7',
      title: 'Write a Property Inspector',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a function that inspects all properties of an object.',
      skeleton: `import kotlin.reflect.full.memberProperties

// Write a function called inspect that:
// 1. Takes an obj: Any parameter
// 2. Gets the KClass from obj::class
// 3. Iterates over memberProperties
// 4. Returns a Map<String, Any?> of property name to value
// Hint: use prop.getter.call(obj) to get the value`,
      solution: `import kotlin.reflect.full.memberProperties

fun inspect(obj: Any): Map<String, Any?> {
    return obj::class.memberProperties
        .associate { prop ->
            prop.name to prop.getter.call(obj)
        }
}`,
      hints: [
        'obj::class gets the runtime KClass.',
        'memberProperties lists all declared properties.',
        'prop.getter.call(obj) retrieves the value.',
      ],
      concepts: ['memberProperties', 'getter', 'inspection'],
    },
    {
      id: 'kt-reflect-8',
      title: 'Write a Simple Object Mapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a function that creates an object from a map using reflection.',
      skeleton: `import kotlin.reflect.KClass
import kotlin.reflect.full.primaryConstructor

// Write a function called fromMap that:
// 1. Takes a KClass<T> and a Map<String, Any?>
// 2. Gets the primaryConstructor
// 3. Maps each constructor parameter to the value from the map using parameter.name
// 4. Calls callBy with the parameter map
// 5. Returns the created instance T`,
      solution: `import kotlin.reflect.KClass
import kotlin.reflect.full.primaryConstructor

fun <T : Any> fromMap(clazz: KClass<T>, data: Map<String, Any?>): T {
    val ctor = clazz.primaryConstructor
        ?: throw IllegalArgumentException("No primary constructor")
    val args = ctor.parameters
        .filter { data.containsKey(it.name) }
        .associateWith { data[it.name] }
    return ctor.callBy(args)
}`,
      hints: [
        'Get the primaryConstructor from the KClass.',
        'Match constructor parameters to map keys by name.',
        'callBy skips parameters not in the map (uses defaults).',
      ],
      concepts: ['callBy', 'primaryConstructor', 'object-mapping'],
    },
    {
      id: 'kt-reflect-9',
      title: 'Write a Mutable Property Setter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a function that sets a mutable property value using reflection.',
      skeleton: `import kotlin.reflect.full.memberProperties
import kotlin.reflect.KMutableProperty

// Write a function called setProperty that:
// 1. Takes obj: Any, propertyName: String, value: Any?
// 2. Finds the property by name from obj::class.memberProperties
// 3. Checks if it is a KMutableProperty (var)
// 4. If so, calls setter.call(obj, value)
// 5. Returns true if set, false if not found or immutable`,
      solution: `import kotlin.reflect.full.memberProperties
import kotlin.reflect.KMutableProperty

fun setProperty(obj: Any, propertyName: String, value: Any?): Boolean {
    val prop = obj::class.memberProperties.find { it.name == propertyName }
        ?: return false
    if (prop is KMutableProperty<*>) {
        prop.setter.call(obj, value)
        return true
    }
    return false
}`,
      hints: [
        'Find the property using memberProperties.find { }.',
        'Check if it is KMutableProperty with is-check.',
        'KMutableProperty has a setter you can call.',
      ],
      concepts: ['KMutableProperty', 'setter', 'reflection'],
    },
    {
      id: 'kt-reflect-10',
      title: 'Write an Annotation Scanner',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a function that finds all functions with a specific annotation.',
      skeleton: `import kotlin.reflect.KClass
import kotlin.reflect.full.memberFunctions
import kotlin.reflect.full.findAnnotation

@Retention(AnnotationRetention.RUNTIME)
annotation class Command(val name: String)

// Write a function called findCommands that:
// 1. Takes a KClass<*> parameter
// 2. Returns Map<String, String> - command name to function name
// 3. Scans memberFunctions for @Command annotations
// 4. Maps annotation name to function name`,
      solution: `import kotlin.reflect.KClass
import kotlin.reflect.full.memberFunctions
import kotlin.reflect.full.findAnnotation

@Retention(AnnotationRetention.RUNTIME)
annotation class Command(val name: String)

fun findCommands(clazz: KClass<*>): Map<String, String> {
    return clazz.memberFunctions
        .mapNotNull { func ->
            val cmd = func.findAnnotation<Command>()
            if (cmd != null) cmd.name to func.name else null
        }
        .toMap()
}`,
      hints: [
        'Use memberFunctions to get all declared functions.',
        'findAnnotation<Command>() returns the annotation or null.',
        'Build the map from annotation name to function name.',
      ],
      concepts: ['findAnnotation', 'memberFunctions', 'annotation-scanning'],
    },
    {
      id: 'kt-reflect-11',
      title: 'Write a Copy Function Using Reflection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a generic deep copy function using reflection.',
      skeleton: `import kotlin.reflect.full.primaryConstructor
import kotlin.reflect.full.memberProperties

// Write a function called copyWith that:
// 1. Takes an obj: T and overrides: Map<String, Any?>
// 2. Gets all current property values
// 3. Merges with overrides
// 4. Creates a new instance using the primary constructor
// 5. Returns the new T`,
      solution: `import kotlin.reflect.full.primaryConstructor
import kotlin.reflect.full.memberProperties

inline fun <reified T : Any> copyWith(obj: T, overrides: Map<String, Any?>): T {
    val klass = T::class
    val ctor = klass.primaryConstructor
        ?: throw IllegalArgumentException("No primary constructor")
    val currentValues = klass.memberProperties
        .associate { it.name to it.getter.call(obj) }
    val merged = currentValues + overrides
    val args = ctor.parameters.associateWith { merged[it.name] }
    return ctor.callBy(args)
}`,
      hints: [
        'Use reified type to get the KClass at runtime.',
        'Read current values from memberProperties.',
        'Merge with overrides and call the constructor.',
      ],
      concepts: ['reified', 'callBy', 'memberProperties', 'deep-copy'],
    },
    {
      id: 'kt-reflect-12',
      title: 'Write a Simple JSON Serializer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a simple JSON serializer using reflection.',
      skeleton: `import kotlin.reflect.full.memberProperties

// Write a function called toJson that:
// 1. Takes an obj: Any
// 2. Gets all memberProperties
// 3. Maps each to "name": value (with proper quoting for strings)
// 4. Returns a JSON-like string: { "key": value, ... }`,
      solution: `import kotlin.reflect.full.memberProperties

fun toJson(obj: Any): String {
    val entries = obj::class.memberProperties.map { prop ->
        val value = prop.getter.call(obj)
        val jsonValue = when (value) {
            is String -> "\"${'$'}{value}\""
            null -> "null"
            else -> value.toString()
        }
        "\"${'$'}{prop.name}\": ${'$'}{jsonValue}"
    }
    return "{ ${'$'}{entries.joinToString(", ")} }"
}`,
      hints: [
        'Iterate over memberProperties and get each value.',
        'Strings need to be wrapped in quotes.',
        'Join all entries with commas inside braces.',
      ],
      concepts: ['memberProperties', 'serialization', 'reflection'],
    },
    {
      id: 'kt-reflect-13',
      title: 'Fix Missing kotlin-reflect',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Fix the code that uses reflection without proper imports.',
      skeleton: `class Person(val name: String, val age: Int)

fun main() {
    val props = Person::class.memberProperties  // Unresolved reference!
    props.forEach { println(it.name) }
}`,
      solution: `import kotlin.reflect.full.memberProperties

class Person(val name: String, val age: Int)

fun main() {
    val props = Person::class.memberProperties
    props.forEach { println(it.name) }
}`,
      hints: [
        'memberProperties is an extension function from kotlin.reflect.full.',
        'Add import kotlin.reflect.full.memberProperties.',
        'The kotlin-reflect library must also be on the classpath.',
      ],
      concepts: ['import', 'kotlin-reflect', 'memberProperties'],
    },
    {
      id: 'kt-reflect-14',
      title: 'Fix Immutable Property Setter',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the code that tries to set a val property via reflection.',
      skeleton: `import kotlin.reflect.full.memberProperties
import kotlin.reflect.KMutableProperty

class Config(val host: String)

fun main() {
    val config = Config("localhost")
    val prop = Config::class.memberProperties.first { it.name == "host" }
    (prop as KMutableProperty<*>).setter.call(config, "newhost") // ClassCastException!
}`,
      solution: `import kotlin.reflect.full.memberProperties
import kotlin.reflect.KMutableProperty

class Config(var host: String)

fun main() {
    val config = Config("localhost")
    val prop = Config::class.memberProperties.first { it.name == "host" }
    if (prop is KMutableProperty<*>) {
        prop.setter.call(config, "newhost")
    }
    println(config.host)
}`,
      hints: [
        'val properties are not KMutableProperty - they have no setter.',
        'Change val to var if the property should be mutable.',
        'Always check with is before casting to KMutableProperty.',
      ],
      concepts: ['KMutableProperty', 'val-vs-var', 'safe-cast'],
    },
    {
      id: 'kt-reflect-15',
      title: 'Fix callBy Missing Required Parameter',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the callBy that fails because a required parameter is missing.',
      skeleton: `import kotlin.reflect.full.primaryConstructor

data class User(val name: String, val age: Int = 25)

fun main() {
    val ctor = User::class.primaryConstructor!!
    // Crash! name has no default and is not in the map
    val user = ctor.callBy(mapOf())
    println(user)
}`,
      solution: `import kotlin.reflect.full.primaryConstructor

data class User(val name: String, val age: Int = 25)

fun main() {
    val ctor = User::class.primaryConstructor!!
    val nameParam = ctor.parameters.first { it.name == "name" }
    val user = ctor.callBy(mapOf(nameParam to "Alice"))
    println(user)
}`,
      hints: [
        'callBy throws if a required parameter (no default) is missing.',
        'name is required because it has no default value.',
        'age can be omitted because it has a default of 25.',
      ],
      concepts: ['callBy', 'required-parameters', 'default-values'],
    },
    {
      id: 'kt-reflect-16',
      title: 'Predict KClass Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Predict the output of KClass inspection.',
      skeleton: `fun main() {
    val klass = Int::class
    println(klass.simpleName)
    println(klass.qualifiedName)
}`,
      solution: `Int
kotlin.Int`,
      hints: [
        'simpleName returns just the class name.',
        'qualifiedName returns the full package-qualified name.',
        'Int is kotlin.Int in Kotlin.',
      ],
      concepts: ['KClass', 'simpleName', 'qualifiedName'],
    },
    {
      id: 'kt-reflect-17',
      title: 'Predict Property Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the number of member properties found via reflection.',
      skeleton: `import kotlin.reflect.full.memberProperties

class Animal(val name: String, val legs: Int) {
    val description get() = "\${name} with \${legs} legs"
}

fun main() {
    println(Animal::class.memberProperties.size)
}`,
      solution: `3`,
      hints: [
        'name and legs are constructor properties.',
        'description is a computed property (custom getter).',
        'All three are visible as member properties.',
      ],
      concepts: ['memberProperties', 'computed-property'],
    },
    {
      id: 'kt-reflect-18',
      title: 'Predict callBy Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output when using callBy with partial parameters.',
      skeleton: `import kotlin.reflect.full.primaryConstructor

data class Rect(val width: Int = 10, val height: Int = 20)

fun main() {
    val ctor = Rect::class.primaryConstructor!!
    val widthParam = ctor.parameters.first { it.name == "width" }
    val rect = ctor.callBy(mapOf(widthParam to 50))
    println("\${rect.width} x \${rect.height}")
}`,
      solution: `50 x 20`,
      hints: [
        'width is explicitly set to 50.',
        'height is not in the map, so it uses the default value 20.',
        'callBy uses defaults for missing optional parameters.',
      ],
      concepts: ['callBy', 'default-parameters'],
    },
    {
      id: 'kt-reflect-19',
      title: 'Refactor Hardcoded Serialization to Reflection',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Refactor hardcoded serialization to use reflection for any class.',
      skeleton: `data class User(val name: String, val age: Int)

fun serializeUser(user: User): String {
    return "name=\${user.name}&age=\${user.age}"
}

fun main() {
    println(serializeUser(User("Alice", 30)))
}`,
      solution: `import kotlin.reflect.full.memberProperties

data class User(val name: String, val age: Int)

fun serialize(obj: Any): String {
    return obj::class.memberProperties
        .joinToString("&") { prop ->
            "\${prop.name}=\${prop.getter.call(obj)}"
        }
}

fun main() {
    println(serialize(User("Alice", 30)))
}`,
      hints: [
        'Replace hardcoded property access with memberProperties.',
        'Use prop.getter.call(obj) to get each value dynamically.',
        'The function now works for any class, not just User.',
      ],
      concepts: ['reflection', 'generic-serialization', 'refactoring'],
    },
    {
      id: 'kt-reflect-20',
      title: 'Refactor Manual Factory to Reflective Factory',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Refactor a manual factory to create objects via reflection.',
      skeleton: `interface Shape
class Circle(val radius: Double) : Shape
class Square(val side: Double) : Shape

fun createShape(type: String, size: Double): Shape {
    return when (type) {
        "circle" -> Circle(size)
        "square" -> Square(size)
        else -> throw IllegalArgumentException("Unknown: \${type}")
    }
}

fun main() {
    println(createShape("circle", 5.0))
}`,
      solution: `import kotlin.reflect.KClass
import kotlin.reflect.full.primaryConstructor

interface Shape
class Circle(val radius: Double) : Shape
class Square(val side: Double) : Shape

val shapeRegistry = mapOf<String, KClass<out Shape>>(
    "circle" to Circle::class,
    "square" to Square::class
)

fun createShape(type: String, size: Double): Shape {
    val klass = shapeRegistry[type]
        ?: throw IllegalArgumentException("Unknown: \${type}")
    val ctor = klass.primaryConstructor
        ?: throw IllegalArgumentException("No constructor for \${type}")
    return ctor.call(size)
}

fun main() {
    println(createShape("circle", 5.0))
}`,
      hints: [
        'Use a registry map of String to KClass.',
        'Get the primaryConstructor from the KClass.',
        'Call the constructor with the size parameter.',
      ],
      concepts: ['KClass', 'primaryConstructor', 'factory-pattern', 'refactoring'],
    },
  ],
};
