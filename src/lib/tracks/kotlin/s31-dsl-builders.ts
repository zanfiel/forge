import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-dsl',
  title: '31. DSL Builders',
  explanation: `## DSL Builders in Kotlin

Kotlin's language features -- lambdas with receivers, extension functions, and infix functions -- enable creating type-safe domain-specific languages (DSLs).

### Type-Safe Builders

\`\`\`kotlin
fun html(init: HTML.() -> Unit): HTML {
    val html = HTML()
    html.init()
    return html
}

class HTML {
    private val children = mutableListOf<String>()
    fun body(init: Body.() -> Unit) {
        val body = Body()
        body.init()
        children.add(body.render())
    }
    fun render() = "<html>\${children.joinToString("")}</html>"
}
\`\`\`

### @DslMarker

\`\`\`kotlin
@DslMarker
annotation class HtmlDsl

@HtmlDsl
class HTML { ... }

@HtmlDsl
class Body { ... }
\`\`\`
Prevents accessing outer receivers implicitly.

### apply-Based Builders

\`\`\`kotlin
data class User(var name: String = "", var age: Int = 0)

fun user(init: User.() -> Unit): User = User().apply(init)

val u = user {
    name = "Alice"
    age = 30
}
\`\`\``,
  exercises: [
    {
      id: 'kt-dsl-1',
      title: 'Basic apply Builder',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Use apply to build an object with a DSL-like syntax.',
      skeleton: `data class Config(var host: String = "", var port: Int = 0)

fun config(init: Config.() -> Unit): Config = Config().___(init)

val c = config {
    host = "localhost"
    port = 8080
}`,
      solution: `data class Config(var host: String = "", var port: Int = 0)

fun config(init: Config.() -> Unit): Config = Config().apply(init)

val c = config {
    host = "localhost"
    port = 8080
}`,
      hints: [
        'apply executes the block with the object as receiver.',
        'It returns the object itself after applying the changes.',
        'The lambda with receiver Config.() -> Unit allows setting properties directly.',
      ],
      concepts: ['apply', 'lambda-with-receiver'],
    },
    {
      id: 'kt-dsl-2',
      title: 'Lambda with Receiver',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Define a function that takes a lambda with receiver.',
      skeleton: `class MenuBuilder {
    private val items = mutableListOf<String>()
    fun item(name: String) { items.add(name) }
    fun build(): List<String> = items.toList()
}

fun menu(init: ___): List<String> {
    val builder = MenuBuilder()
    builder.init()
    return builder.build()
}

val myMenu = menu {
    item("Home")
    item("About")
    item("Contact")
}`,
      solution: `class MenuBuilder {
    private val items = mutableListOf<String>()
    fun item(name: String) { items.add(name) }
    fun build(): List<String> = items.toList()
}

fun menu(init: MenuBuilder.() -> Unit): List<String> {
    val builder = MenuBuilder()
    builder.init()
    return builder.build()
}

val myMenu = menu {
    item("Home")
    item("About")
    item("Contact")
}`,
      hints: [
        'A lambda with receiver has the form ReceiverType.() -> ReturnType.',
        'Inside the lambda, you can call methods on the receiver directly.',
        'MenuBuilder.() -> Unit means the lambda runs in the context of MenuBuilder.',
      ],
      concepts: ['lambda-with-receiver', 'DSL'],
    },
    {
      id: 'kt-dsl-3',
      title: '@DslMarker Annotation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Create a @DslMarker annotation to control scope.',
      skeleton: `@___
annotation class FormDsl

@FormDsl
class FormBuilder {
    private val fields = mutableListOf<String>()
    fun field(name: String) { fields.add(name) }
    fun build() = fields
}

@FormDsl
class FieldGroupBuilder {
    private val fields = mutableListOf<String>()
    fun field(name: String) { fields.add(name) }
    fun build() = fields
}`,
      solution: `@DslMarker
annotation class FormDsl

@FormDsl
class FormBuilder {
    private val fields = mutableListOf<String>()
    fun field(name: String) { fields.add(name) }
    fun build() = fields
}

@FormDsl
class FieldGroupBuilder {
    private val fields = mutableListOf<String>()
    fun field(name: String) { fields.add(name) }
    fun build() = fields
}`,
      hints: [
        '@DslMarker is a meta-annotation for DSL scope control.',
        'It prevents implicit access to outer receivers.',
        'Classes annotated with the same @DslMarker cannot be accessed implicitly.',
      ],
      concepts: ['DslMarker', 'scope-control'],
    },
    {
      id: 'kt-dsl-4',
      title: 'Nested DSL Builder',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Create a nested DSL with parent and child builders.',
      skeleton: `class Row(val cells: List<String>)
class Table(val rows: List<Row>)

class RowBuilder {
    private val cells = mutableListOf<String>()
    fun cell(content: String) { cells.add(content) }
    fun build() = Row(cells)
}

class TableBuilder {
    private val rows = mutableListOf<Row>()
    fun row(init: ___) {
        val builder = RowBuilder()
        builder.init()
        rows.add(builder.build())
    }
    fun build() = Table(rows)
}

fun table(init: TableBuilder.() -> Unit): Table {
    val builder = TableBuilder()
    builder.init()
    return builder.build()
}`,
      solution: `class Row(val cells: List<String>)
class Table(val rows: List<Row>)

class RowBuilder {
    private val cells = mutableListOf<String>()
    fun cell(content: String) { cells.add(content) }
    fun build() = Row(cells)
}

class TableBuilder {
    private val rows = mutableListOf<Row>()
    fun row(init: RowBuilder.() -> Unit) {
        val builder = RowBuilder()
        builder.init()
        rows.add(builder.build())
    }
    fun build() = Table(rows)
}

fun table(init: TableBuilder.() -> Unit): Table {
    val builder = TableBuilder()
    builder.init()
    return builder.build()
}`,
      hints: [
        'The row function takes a lambda with RowBuilder as the receiver.',
        'Nesting is achieved by having builders accept lambdas with receivers.',
        'Each level creates its own builder context.',
      ],
      concepts: ['nested-DSL', 'lambda-with-receiver'],
    },
    {
      id: 'kt-dsl-5',
      title: 'Infix Function in DSL',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use infix functions to create a more natural DSL syntax.',
      skeleton: `class AssertionBuilder<T>(private val actual: T) {
    ___ fun shouldBe(expected: T) {
        if (actual != expected) throw AssertionError("\$actual != \$expected")
    }
}

fun <T> expect(value: T) = AssertionBuilder(value)

fun main() {
    expect(2 + 2) shouldBe 4
}`,
      solution: `class AssertionBuilder<T>(private val actual: T) {
    infix fun shouldBe(expected: T) {
        if (actual != expected) throw AssertionError("\$actual != \$expected")
    }
}

fun <T> expect(value: T) = AssertionBuilder(value)

fun main() {
    expect(2 + 2) shouldBe 4
}`,
      hints: [
        'infix functions can be called without dot notation or parentheses.',
        'They must have exactly one parameter.',
        'This creates a readable assertion syntax.',
      ],
      concepts: ['infix', 'DSL-syntax'],
    },
    {
      id: 'kt-dsl-6',
      title: 'Operator Overloading in DSL',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Use operator overloading to enhance DSL syntax.',
      skeleton: `class RouteBuilder {
    private val routes = mutableListOf<Pair<String, String>>()
    
    ___ fun String.invoke(handler: String) {
        routes.add(this to handler)
    }
    
    fun build() = routes.toList()
}

fun routes(init: RouteBuilder.() -> Unit) = RouteBuilder().apply(init).build()`,
      solution: `class RouteBuilder {
    private val routes = mutableListOf<Pair<String, String>>()
    
    operator fun String.invoke(handler: String) {
        routes.add(this to handler)
    }
    
    fun build() = routes.toList()
}

fun routes(init: RouteBuilder.() -> Unit) = RouteBuilder().apply(init).build()`,
      hints: [
        'operator keyword enables operator overloading.',
        'invoke operator allows calling objects like functions.',
        'Extension operator functions add operators within a specific scope.',
      ],
      concepts: ['operator-overloading', 'invoke', 'extension-function'],
    },
    {
      id: 'kt-dsl-7',
      title: 'Write an HTML Builder DSL',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a simple HTML builder DSL.',
      skeleton: `// Write the following:
// 1. A class Tag with: var name: String, var text: String = "", children: MutableList<Tag>
// 2. A fun tag(name: String, init: Tag.() -> Unit): creates Tag, sets name, calls init, adds to children
// 3. A fun render(): returns "<name>text + children.render()</name>"
// 4. A top-level fun html(init: Tag.() -> Unit): Tag that creates a Tag with name "html"`,
      solution: `class Tag(var name: String) {
    var text: String = ""
    val children = mutableListOf<Tag>()

    fun tag(name: String, init: Tag.() -> Unit = {}) {
        val child = Tag(name)
        child.init()
        children.add(child)
    }

    fun render(): String {
        val childHtml = children.joinToString("") { it.render() }
        return "<\${name}>\${text}\${childHtml}</\${name}>"
    }
}

fun html(init: Tag.() -> Unit): Tag {
    val root = Tag("html")
    root.init()
    return root
}`,
      hints: [
        'Tag class holds name, text content, and child tags.',
        'The tag function creates a child and applies the init lambda.',
        'render recursively builds the HTML string.',
      ],
      concepts: ['type-safe-builder', 'recursion', 'HTML-DSL'],
    },
    {
      id: 'kt-dsl-8',
      title: 'Write a Query DSL',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a simple SQL-like query DSL.',
      skeleton: `// Write a DSL for building simple SELECT queries:
// 1. Class QueryBuilder with: var table = "", columns = mutableListOf<String>(), var condition = ""
// 2. Method select(vararg cols: String) that adds columns
// 3. Method from(tableName: String) that sets table
// 4. Method where(cond: String) that sets condition
// 5. Method build() that returns "SELECT cols FROM table WHERE condition"
// 6. Top-level fun query(init: QueryBuilder.() -> Unit): String`,
      solution: `class QueryBuilder {
    var table = ""
    val columns = mutableListOf<String>()
    var condition = ""

    fun select(vararg cols: String) {
        columns.addAll(cols)
    }

    fun from(tableName: String) {
        table = tableName
    }

    fun where(cond: String) {
        condition = cond
    }

    fun build(): String {
        val cols = columns.joinToString(", ")
        val sql = "SELECT \${cols} FROM \${table}"
        return if (condition.isNotEmpty()) "\${sql} WHERE \${condition}" else sql
    }
}

fun query(init: QueryBuilder.() -> Unit): String {
    return QueryBuilder().apply(init).build()
}`,
      hints: [
        'Use a builder class with mutable state.',
        'select, from, where are methods that modify builder state.',
        'build() assembles the final SQL string.',
      ],
      concepts: ['DSL', 'builder-pattern', 'query-builder'],
    },
    {
      id: 'kt-dsl-9',
      title: 'Write a Validation DSL',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a validation DSL that collects error messages.',
      skeleton: `// Write a validation DSL:
// 1. Class ValidationBuilder with errors: MutableList<String>
// 2. Method require(condition: Boolean, message: String) - adds message if condition is false
// 3. Method requireNotBlank(value: String, fieldName: String) - adds "<fieldName> must not be blank" if blank
// 4. Method isValid(): Boolean - returns errors.isEmpty()
// 5. Top-level fun validate(init: ValidationBuilder.() -> Unit): ValidationBuilder`,
      solution: `class ValidationBuilder {
    val errors = mutableListOf<String>()

    fun require(condition: Boolean, message: String) {
        if (!condition) errors.add(message)
    }

    fun requireNotBlank(value: String, fieldName: String) {
        if (value.isBlank()) errors.add("\${fieldName} must not be blank")
    }

    fun isValid(): Boolean = errors.isEmpty()
}

fun validate(init: ValidationBuilder.() -> Unit): ValidationBuilder {
    return ValidationBuilder().apply(init)
}`,
      hints: [
        'The builder collects validation errors.',
        'require adds an error message when the condition is false.',
        'Use apply to execute the init block on the builder.',
      ],
      concepts: ['validation-DSL', 'builder', 'error-collection'],
    },
    {
      id: 'kt-dsl-10',
      title: 'Write a Test DSL',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a test spec DSL similar to Kotest.',
      skeleton: `// Write a test DSL:
// 1. Class TestSpec with: tests: MutableList<Pair<String, () -> Unit>>
// 2. Method test(name: String, block: () -> Unit) adds pair to tests
// 3. Method run() that iterates tests, runs each, prints "PASS: name" or "FAIL: name: message"
// 4. Top-level fun describe(name: String, init: TestSpec.() -> Unit) that prints the name and runs`,
      solution: `class TestSpec {
    val tests = mutableListOf<Pair<String, () -> Unit>>()

    fun test(name: String, block: () -> Unit) {
        tests.add(name to block)
    }

    fun run() {
        tests.forEach { (name, block) ->
            try {
                block()
                println("PASS: \${name}")
            } catch (e: Throwable) {
                println("FAIL: \${name}: \${e.message}")
            }
        }
    }
}

fun describe(name: String, init: TestSpec.() -> Unit) {
    println("Describe: \${name}")
    val spec = TestSpec()
    spec.init()
    spec.run()
}`,
      hints: [
        'Store test cases as name-block pairs.',
        'run() executes each test in a try-catch.',
        'describe creates the spec, runs init, then runs all tests.',
      ],
      concepts: ['test-DSL', 'lambda', 'exception-handling'],
    },
    {
      id: 'kt-dsl-11',
      title: 'Write a Configuration DSL',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a nested configuration DSL for a server.',
      skeleton: `// Write a server configuration DSL:
// 1. Class ServerConfig with: var host = "localhost", var port = 8080, var dbConfig: DbConfig? = null
// 2. Class DbConfig with: var url = "", var user = "", var password = ""
// 3. ServerConfig.database(init: DbConfig.() -> Unit) creates DbConfig, applies init, sets dbConfig
// 4. Top-level fun server(init: ServerConfig.() -> Unit): ServerConfig`,
      solution: `class DbConfig {
    var url = ""
    var user = ""
    var password = ""

    override fun toString() = "DbConfig(url=\${url}, user=\${user})"
}

class ServerConfig {
    var host = "localhost"
    var port = 8080
    var dbConfig: DbConfig? = null

    fun database(init: DbConfig.() -> Unit) {
        dbConfig = DbConfig().apply(init)
    }

    override fun toString() = "ServerConfig(host=\${host}, port=\${port}, db=\${dbConfig})"
}

fun server(init: ServerConfig.() -> Unit): ServerConfig {
    return ServerConfig().apply(init)
}`,
      hints: [
        'Nest builders by having parent create child builder in a method.',
        'database() creates a DbConfig and applies the init lambda.',
        'The top-level server function uses apply for the init block.',
      ],
      concepts: ['nested-DSL', 'configuration', 'apply'],
    },
    {
      id: 'kt-dsl-12',
      title: 'Write a Fluent API Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a fluent builder that chains method calls.',
      skeleton: `// Write a class RequestBuilder with:
// 1. Private vars: method = "GET", url = "", headers = mutableMapOf<String, String>(), body: String? = null
// 2. fun method(m: String) = apply { method = m }
// 3. fun url(u: String) = apply { url = u }
// 4. fun header(key: String, value: String) = apply { headers[key] = value }
// 5. fun body(b: String) = apply { body = b }
// 6. fun build(): String returns "$method $url Headers: $headers Body: $body"`,
      solution: `class RequestBuilder {
    private var method = "GET"
    private var url = ""
    private val headers = mutableMapOf<String, String>()
    private var body: String? = null

    fun method(m: String) = apply { method = m }
    fun url(u: String) = apply { url = u }
    fun header(key: String, value: String) = apply { headers[key] = value }
    fun body(b: String) = apply { body = b }

    fun build(): String = "\${method} \${url} Headers: \${headers} Body: \${body}"
}`,
      hints: [
        'apply returns this, enabling method chaining.',
        'Each method modifies state and returns the builder.',
        'build() assembles the final result string.',
      ],
      concepts: ['fluent-API', 'apply', 'method-chaining'],
    },
    {
      id: 'kt-dsl-13',
      title: 'Fix DSL Scope Leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the DSL that accidentally accesses the outer receiver.',
      skeleton: `class Outer {
    var outerValue = ""
    fun inner(init: Inner.() -> Unit) {
        val i = Inner()
        i.init()
    }
}

class Inner {
    var innerValue = ""
}

fun main() {
    val outer = Outer()
    outer.inner {
        innerValue = "hello"
        outerValue = "oops" // Should NOT be accessible!
    }
}`,
      solution: `@DslMarker
annotation class MyDsl

@MyDsl
class Outer {
    var outerValue = ""
    fun inner(init: Inner.() -> Unit) {
        val i = Inner()
        i.init()
    }
}

@MyDsl
class Inner {
    var innerValue = ""
}

fun main() {
    val outer = Outer()
    outer.inner {
        innerValue = "hello"
        // outerValue is no longer accessible without explicit this@outer
    }
}`,
      hints: [
        'Without @DslMarker, inner lambdas can access outer receivers.',
        'Create a @DslMarker annotation and apply it to both classes.',
        'This prevents implicit access to outer scope.',
      ],
      concepts: ['DslMarker', 'scope-leak', 'DSL-safety'],
    },
    {
      id: 'kt-dsl-14',
      title: 'Fix Builder Missing apply',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Fix the builder that does not apply the initialization block.',
      skeleton: `data class Person(var name: String = "", var age: Int = 0)

fun person(init: Person.() -> Unit): Person {
    return Person()
}

fun main() {
    val p = person {
        name = "Alice"
        age = 30
    }
    println(p) // Prints Person(name=, age=0) - init was never called!
}`,
      solution: `data class Person(var name: String = "", var age: Int = 0)

fun person(init: Person.() -> Unit): Person {
    return Person().apply(init)
}

fun main() {
    val p = person {
        name = "Alice"
        age = 30
    }
    println(p)
}`,
      hints: [
        'The init lambda is received but never called.',
        'Use .apply(init) to execute the block on the Person.',
        'Without apply, the Person is returned with default values.',
      ],
      concepts: ['apply', 'lambda-with-receiver', 'builder-bug'],
    },
    {
      id: 'kt-dsl-15',
      title: 'Fix Mutable Exposure',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the builder that exposes its mutable internal list.',
      skeleton: `class ListBuilder {
    val items = mutableListOf<String>()
    fun add(item: String) { items.add(item) }
}

fun buildList(init: ListBuilder.() -> Unit): List<String> {
    val builder = ListBuilder()
    builder.init()
    return builder.items // Mutable list exposed!
}

fun main() {
    val list = buildList { add("a"); add("b") }
    (list as MutableList).add("hacked") // Should not be possible
}`,
      solution: `class ListBuilder {
    private val items = mutableListOf<String>()
    fun add(item: String) { items.add(item) }
    fun build(): List<String> = items.toList()
}

fun buildList(init: ListBuilder.() -> Unit): List<String> {
    val builder = ListBuilder()
    builder.init()
    return builder.build()
}

fun main() {
    val list = buildList { add("a"); add("b") }
    println(list)
}`,
      hints: [
        'Make items private and add a build() method.',
        'Return items.toList() to create an immutable copy.',
        'Never expose mutable internal state from a builder.',
      ],
      concepts: ['encapsulation', 'immutability', 'defensive-copy'],
    },
    {
      id: 'kt-dsl-16',
      title: 'Predict DSL Builder Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Predict the output of an apply-based DSL.',
      skeleton: `data class Car(var make: String = "", var year: Int = 0)

fun car(init: Car.() -> Unit) = Car().apply(init)

fun main() {
    val c = car {
        make = "Tesla"
        year = 2024
    }
    println("\${c.make} \${c.year}")
}`,
      solution: `Tesla 2024`,
      hints: [
        'apply runs the lambda with Car as receiver.',
        'make is set to "Tesla", year to 2024.',
        'The string template prints both values.',
      ],
      concepts: ['apply', 'DSL-output'],
    },
    {
      id: 'kt-dsl-17',
      title: 'Predict Nested Builder Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output of a nested builder DSL.',
      skeleton: `class Doc {
    val sections = mutableListOf<String>()
    fun section(title: String) { sections.add(title) }
    override fun toString() = sections.joinToString(", ")
}

fun doc(init: Doc.() -> Unit) = Doc().apply(init)

fun main() {
    val d = doc {
        section("Intro")
        section("Body")
        section("Conclusion")
    }
    println(d)
}`,
      solution: `Intro, Body, Conclusion`,
      hints: [
        'Three sections are added: Intro, Body, Conclusion.',
        'toString joins them with ", ".',
        'apply executes the lambda and returns the Doc.',
      ],
      concepts: ['builder', 'toString', 'joinToString'],
    },
    {
      id: 'kt-dsl-18',
      title: 'Predict Infix DSL Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output of an infix-based DSL.',
      skeleton: `class Pair(val key: String, val value: String)

infix fun String.to(value: String) = Pair(this, value)

fun main() {
    val p = "name" to "Kotlin"
    println("\${p.key}=\${p.value}")
}`,
      solution: `name=Kotlin`,
      hints: [
        'The infix to function creates a Pair.',
        'key is "name", value is "Kotlin".',
        'The string template formats as key=value.',
      ],
      concepts: ['infix', 'Pair', 'to'],
    },
    {
      id: 'kt-dsl-19',
      title: 'Refactor Manual Construction to DSL',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor manual object construction to use a DSL builder.',
      skeleton: `data class Email(
    var from: String = "",
    var to: String = "",
    var subject: String = "",
    var body: String = ""
)

fun main() {
    val email = Email()
    email.from = "alice@test.com"
    email.to = "bob@test.com"
    email.subject = "Hello"
    email.body = "Hi Bob!"
    println(email)
}`,
      solution: `data class Email(
    var from: String = "",
    var to: String = "",
    var subject: String = "",
    var body: String = ""
)

fun email(init: Email.() -> Unit): Email = Email().apply(init)

fun main() {
    val e = email {
        from = "alice@test.com"
        to = "bob@test.com"
        subject = "Hello"
        body = "Hi Bob!"
    }
    println(e)
}`,
      hints: [
        'Create a top-level email() function with a lambda receiver.',
        'Use apply to execute the init block.',
        'The DSL syntax is more readable than manual property assignment.',
      ],
      concepts: ['DSL', 'apply', 'refactoring'],
    },
    {
      id: 'kt-dsl-20',
      title: 'Refactor Builder to DSL with Validation',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Refactor a Java-style builder pattern to a Kotlin DSL with validation.',
      skeleton: `class UserBuilder {
    private var name: String? = null
    private var email: String? = null
    private var age: Int? = null

    fun setName(n: String): UserBuilder { name = n; return this }
    fun setEmail(e: String): UserBuilder { email = e; return this }
    fun setAge(a: Int): UserBuilder { age = a; return this }
    fun build(): String {
        return "User(name=\${name}, email=\${email}, age=\${age})"
    }
}

fun main() {
    val user = UserBuilder()
        .setName("Alice")
        .setEmail("alice@test.com")
        .setAge(30)
        .build()
    println(user)
}`,
      solution: `class UserBuilder {
    var name: String = ""
    var email: String = ""
    var age: Int = 0

    fun build(): String {
        require(name.isNotBlank()) { "Name is required" }
        require(email.contains("@")) { "Valid email required" }
        require(age > 0) { "Age must be positive" }
        return "User(name=\${name}, email=\${email}, age=\${age})"
    }
}

fun user(init: UserBuilder.() -> Unit): String {
    return UserBuilder().apply(init).build()
}

fun main() {
    val u = user {
        name = "Alice"
        email = "alice@test.com"
        age = 30
    }
    println(u)
}`,
      hints: [
        'Replace setX methods with mutable properties.',
        'Add require() calls in build() for validation.',
        'Create a top-level DSL function with lambda receiver.',
      ],
      concepts: ['DSL', 'validation', 'require', 'refactoring'],
    },
  ],
};
