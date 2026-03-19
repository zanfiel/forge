import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-contracts',
  title: '35. Contracts',
  explanation: `## Contracts in Kotlin

Kotlin contracts allow you to tell the compiler about function behavior that it cannot infer on its own. They enable better smart casting and initialization analysis.

### callsInPlace

\`\`\`kotlin
import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
inline fun <T> myRun(block: () -> T): T {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return block()
}

// Now the compiler knows val is initialized:
val value: String
myRun { value = "hello" }
println(value) // OK - compiler trusts the contract
\`\`\`

### returns implies

\`\`\`kotlin
@OptIn(ExperimentalContracts::class)
fun requireNotEmpty(str: String?) {
    contract {
        returns() implies (str != null)
    }
    if (str.isNullOrEmpty()) throw IllegalArgumentException()
}

fun demo(s: String?) {
    requireNotEmpty(s)
    println(s.length) // Smart cast to String!
}
\`\`\`

### Limitations
- Contracts are experimental (\`@OptIn(ExperimentalContracts::class)\`)
- Only top-level functions can declare contracts
- Contract block must be the first statement in the function`,
  exercises: [
    {
      id: 'kt-contracts-1',
      title: 'Basic callsInPlace Contract',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a contract that declares a lambda is called exactly once.',
      skeleton: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
inline fun <T> execute(block: () -> T): T {
    ___ {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return block()
}`,
      solution: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
inline fun <T> execute(block: () -> T): T {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return block()
}`,
      hints: [
        'The contract block must be the first statement in the function.',
        'callsInPlace tells the compiler how many times the lambda runs.',
        'EXACTLY_ONCE enables val initialization in the lambda.',
      ],
      concepts: ['contract', 'callsInPlace', 'EXACTLY_ONCE'],
    },
    {
      id: 'kt-contracts-2',
      title: 'returns implies Contract',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a contract with returns() implies for smart casting.',
      skeleton: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
fun assertNotNull(value: Any?) {
    contract {
        ___ implies (value != null)
    }
    if (value == null) throw IllegalArgumentException("Value is null")
}`,
      solution: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
fun assertNotNull(value: Any?) {
    contract {
        returns() implies (value != null)
    }
    if (value == null) throw IllegalArgumentException("Value is null")
}`,
      hints: [
        'returns() implies means "if this function returns normally, then...".',
        'This enables smart casting after the function call.',
        'The compiler trusts that value is not null after assertNotNull.',
      ],
      concepts: ['returns', 'implies', 'smart-cast'],
    },
    {
      id: 'kt-contracts-3',
      title: 'AT_MOST_ONCE Contract',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a contract for a lambda called at most once.',
      skeleton: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
inline fun <T> runIf(condition: Boolean, block: () -> T): T? {
    contract {
        callsInPlace(block, InvocationKind.___)
    }
    return if (condition) block() else null
}`,
      solution: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
inline fun <T> runIf(condition: Boolean, block: () -> T): T? {
    contract {
        callsInPlace(block, InvocationKind.AT_MOST_ONCE)
    }
    return if (condition) block() else null
}`,
      hints: [
        'AT_MOST_ONCE means the lambda runs 0 or 1 times.',
        'The block only runs if the condition is true.',
        'This is less strict than EXACTLY_ONCE.',
      ],
      concepts: ['AT_MOST_ONCE', 'callsInPlace'],
    },
    {
      id: 'kt-contracts-4',
      title: 'AT_LEAST_ONCE Contract',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a contract for a lambda called one or more times.',
      skeleton: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
inline fun repeatAtLeast(times: Int, block: (Int) -> Unit) {
    contract {
        callsInPlace(block, InvocationKind.___)
    }
    val actualTimes = if (times < 1) 1 else times
    for (i in 0 until actualTimes) {
        block(i)
    }
}`,
      solution: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
inline fun repeatAtLeast(times: Int, block: (Int) -> Unit) {
    contract {
        callsInPlace(block, InvocationKind.AT_LEAST_ONCE)
    }
    val actualTimes = if (times < 1) 1 else times
    for (i in 0 until actualTimes) {
        block(i)
    }
}`,
      hints: [
        'AT_LEAST_ONCE means the lambda runs 1 or more times.',
        'The function ensures at least 1 execution.',
        'This still allows val initialization in the lambda.',
      ],
      concepts: ['AT_LEAST_ONCE', 'callsInPlace'],
    },
    {
      id: 'kt-contracts-5',
      title: 'returns true implies',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a contract that links a boolean return to a type condition.',
      skeleton: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
fun isString(value: Any?): Boolean {
    contract {
        returns(___) implies (value is String)
    }
    return value is String
}

fun demo(x: Any?) {
    if (isString(x)) {
        println(x.length)  // Smart cast works!
    }
}`,
      solution: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
fun isString(value: Any?): Boolean {
    contract {
        returns(true) implies (value is String)
    }
    return value is String
}

fun demo(x: Any?) {
    if (isString(x)) {
        println(x.length)
    }
}`,
      hints: [
        'returns(true) means "when this function returns true".',
        'The implication tells the compiler about the type.',
        'This enables smart casting in if-conditions.',
      ],
      concepts: ['returns-true', 'implies', 'type-narrowing'],
    },
    {
      id: 'kt-contracts-6',
      title: 'returns false implies',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a contract using returns(false) implies.',
      skeleton: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
fun isNullOrBlank(value: String?): Boolean {
    contract {
        returns(___) implies (value != null)
    }
    return value.isNullOrBlank()
}

fun demo(s: String?) {
    if (!isNullOrBlank(s)) {
        println(s.length) // Smart cast to String
    }
}`,
      solution: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
fun isNullOrBlank(value: String?): Boolean {
    contract {
        returns(false) implies (value != null)
    }
    return value.isNullOrBlank()
}

fun demo(s: String?) {
    if (!isNullOrBlank(s)) {
        println(s.length)
    }
}`,
      hints: [
        'returns(false) means "when this function returns false".',
        'If isNullOrBlank returns false, the value is not null.',
        'The negation in the if-condition uses the false case.',
      ],
      concepts: ['returns-false', 'implies', 'negation'],
    },
    {
      id: 'kt-contracts-7',
      title: 'Write a Contract-Based Initializer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write an inline function with a contract that enables val initialization.',
      skeleton: `import kotlin.contracts.*

// Write an inline function called initialize that:
// 1. Has @OptIn(ExperimentalContracts::class)
// 2. Takes a block: () -> T parameter
// 3. Has a contract { callsInPlace(block, EXACTLY_ONCE) }
// 4. Returns block()
// Then demonstrate that a val can be initialized inside the block`,
      solution: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
inline fun <T> initialize(block: () -> T): T {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return block()
}

fun main() {
    val name: String
    initialize {
        name = "Kotlin"
    }
    println(name)
}`,
      hints: [
        'The contract guarantees the block runs exactly once.',
        'This allows the compiler to verify val initialization.',
        'Without the contract, the compiler would reject the val assignment.',
      ],
      concepts: ['contract', 'EXACTLY_ONCE', 'val-initialization'],
    },
    {
      id: 'kt-contracts-8',
      title: 'Write a Contract-Based Type Guard',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a function with a contract that enables smart casting.',
      skeleton: `import kotlin.contracts.*

// Write a function called requireIs that:
// 1. Has @OptIn(ExperimentalContracts::class)
// 2. Has a reified type parameter T (so must be inline)
// 3. Takes a value: Any? parameter
// 4. Has a contract: returns() implies (value is T)
// 5. Throws if value !is T
// Then demonstrate smart casting after the call`,
      solution: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
inline fun <reified T> requireIs(value: Any?) {
    contract {
        returns() implies (value is T)
    }
    if (value !is T) {
        throw IllegalArgumentException("Expected \${T::class.simpleName}, got \${value?.let { it::class.simpleName }}")
    }
}

fun demo(input: Any?) {
    requireIs<String>(input)
    println(input.length)
}`,
      hints: [
        'Combine reified and contracts for powerful type guards.',
        'returns() implies (value is T) enables smart casting.',
        'After requireIs, the compiler treats value as T.',
      ],
      concepts: ['reified', 'contract', 'type-guard'],
    },
    {
      id: 'kt-contracts-9',
      title: 'Write a Conditional Contract Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a function that combines multiple contract effects.',
      skeleton: `import kotlin.contracts.*

// Write a function called checkNotNullOrEmpty that:
// 1. Takes value: String? parameter
// 2. Has contract: returns() implies (value != null)
// 3. Throws if value is null
// 4. Throws if value is empty
// 5. After calling it, both null-safety and non-empty are guaranteed`,
      solution: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
fun checkNotNullOrEmpty(value: String?) {
    contract {
        returns() implies (value != null)
    }
    if (value == null) throw IllegalArgumentException("Value is null")
    if (value.isEmpty()) throw IllegalArgumentException("Value is empty")
}

fun demo(s: String?) {
    checkNotNullOrEmpty(s)
    println(s.length)
    println(s.uppercase())
}`,
      hints: [
        'The contract guarantees value != null on return.',
        'The function body enforces both null and empty checks.',
        'After the call, s is smart-cast to String.',
      ],
      concepts: ['contract', 'validation', 'smart-cast'],
    },
    {
      id: 'kt-contracts-10',
      title: 'Write a Scoped Resource Contract',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write an inline function with a contract for resource management.',
      skeleton: `import kotlin.contracts.*

class Resource(val name: String) {
    fun use() = println("Using \${name}")
    fun close() = println("Closing \${name}")
}

// Write an inline function called withResource that:
// 1. Takes name: String and block: (Resource) -> T
// 2. Has a contract with callsInPlace(block, EXACTLY_ONCE)
// 3. Creates a Resource, calls block, closes it, returns result
// 4. Use try/finally for cleanup`,
      solution: `import kotlin.contracts.*

class Resource(val name: String) {
    fun use() = println("Using \${name}")
    fun close() = println("Closing \${name}")
}

@OptIn(ExperimentalContracts::class)
inline fun <T> withResource(name: String, block: (Resource) -> T): T {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    val resource = Resource(name)
    return try {
        block(resource)
    } finally {
        resource.close()
    }
}`,
      hints: [
        'EXACTLY_ONCE contract enables val initialization in the block.',
        'try/finally ensures the resource is always closed.',
        'This pattern is similar to Kotlin use() function.',
      ],
      concepts: ['contract', 'resource-management', 'try-finally'],
    },
    {
      id: 'kt-contracts-11',
      title: 'Write a Contract-Based Assertion Library',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write assertion functions that enable smart casting via contracts.',
      skeleton: `import kotlin.contracts.*

// Write two functions:
// 1. assertNotNull(value: T?) with contract: returns() implies (value != null)
//    Throws if null
// 2. assertIs<T>(value: Any?) with contract: returns() implies (value is T)
//    Inline + reified, throws if not instance of T`,
      solution: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
fun <T> assertNotNull(value: T?) {
    contract {
        returns() implies (value != null)
    }
    if (value == null) throw AssertionError("Expected non-null value")
}

@OptIn(ExperimentalContracts::class)
inline fun <reified T> assertIs(value: Any?) {
    contract {
        returns() implies (value is T)
    }
    if (value !is T) throw AssertionError("Expected \${T::class.simpleName}")
}`,
      hints: [
        'assertNotNull uses returns() implies (value != null).',
        'assertIs uses reified and returns() implies (value is T).',
        'Both throw AssertionError on failure.',
      ],
      concepts: ['contract', 'assertion', 'smart-cast'],
    },
    {
      id: 'kt-contracts-12',
      title: 'Write a Boolean Contract Extension',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write Boolean extension functions with contracts.',
      skeleton: `import kotlin.contracts.*

// Write two functions on Boolean:
// 1. assertTrue() with contract: returns() implies (this == true)
//    Throws if false
// 2. assertFalse() with contract: returns() implies (this == false)
//    Throws if true`,
      solution: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
fun Boolean.assertTrue() {
    contract {
        returns() implies (this@assertTrue)
    }
    if (!this) throw AssertionError("Expected true")
}

@OptIn(ExperimentalContracts::class)
fun Boolean.assertFalse() {
    contract {
        returns() implies (!this@assertFalse)
    }
    if (this) throw AssertionError("Expected false")
}`,
      hints: [
        'Use this@functionName to refer to the receiver in contracts.',
        'returns() implies (this@assertTrue) means "returns when true".',
        'Extension functions can have contracts too.',
      ],
      concepts: ['contract', 'extension-function', 'Boolean'],
    },
    {
      id: 'kt-contracts-13',
      title: 'Fix Contract Not First Statement',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the contract that is not the first statement in the function.',
      skeleton: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
inline fun <T> safeRun(block: () -> T): T {
    println("Running...")
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return block()
}`,
      solution: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
inline fun <T> safeRun(block: () -> T): T {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    println("Running...")
    return block()
}`,
      hints: [
        'The contract block must be the first statement in the function body.',
        'Move the println after the contract block.',
        'No code can precede the contract declaration.',
      ],
      concepts: ['contract', 'first-statement-rule'],
    },
    {
      id: 'kt-contracts-14',
      title: 'Fix Missing OptIn Annotation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Fix the contract function missing the OptIn annotation.',
      skeleton: `import kotlin.contracts.*

inline fun <T> myLet(block: () -> T): T {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return block()
}`,
      solution: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
inline fun <T> myLet(block: () -> T): T {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return block()
}`,
      hints: [
        'Contracts are experimental and require @OptIn.',
        'Add @OptIn(ExperimentalContracts::class) to the function.',
        'Without it, the compiler warns about using experimental API.',
      ],
      concepts: ['OptIn', 'ExperimentalContracts'],
    },
    {
      id: 'kt-contracts-15',
      title: 'Fix Wrong InvocationKind',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Fix the contract that claims EXACTLY_ONCE but the lambda may not run.',
      skeleton: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
inline fun <T> runIfTrue(condition: Boolean, block: () -> T): T? {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return if (condition) block() else null
}`,
      solution: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
inline fun <T> runIfTrue(condition: Boolean, block: () -> T): T? {
    contract {
        callsInPlace(block, InvocationKind.AT_MOST_ONCE)
    }
    return if (condition) block() else null
}`,
      hints: [
        'The block only runs when condition is true.',
        'EXACTLY_ONCE is incorrect because the block may not run.',
        'AT_MOST_ONCE correctly describes 0 or 1 invocations.',
      ],
      concepts: ['AT_MOST_ONCE', 'EXACTLY_ONCE', 'correctness'],
    },
    {
      id: 'kt-contracts-16',
      title: 'Predict Smart Cast with Contract',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict whether the code compiles and what it outputs.',
      skeleton: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
fun ensureString(value: Any?) {
    contract { returns() implies (value is String) }
    if (value !is String) throw IllegalArgumentException()
}

fun main() {
    val x: Any? = "Hello"
    ensureString(x)
    println(x.length)
}`,
      solution: `5`,
      hints: [
        'The contract enables smart casting of x to String.',
        'After ensureString, x is treated as String.',
        '"Hello".length is 5.',
      ],
      concepts: ['contract', 'smart-cast', 'returns-implies'],
    },
    {
      id: 'kt-contracts-17',
      title: 'Predict Val Initialization',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict whether val initialization works with a contract.',
      skeleton: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
inline fun <T> once(block: () -> T): T {
    contract { callsInPlace(block, InvocationKind.EXACTLY_ONCE) }
    return block()
}

fun main() {
    val message: String
    once {
        message = "Initialized!"
    }
    println(message)
}`,
      solution: `Initialized!`,
      hints: [
        'EXACTLY_ONCE contract guarantees the block runs once.',
        'This allows val initialization inside the block.',
        'Without the contract, the compiler would reject this code.',
      ],
      concepts: ['EXACTLY_ONCE', 'val-initialization'],
    },
    {
      id: 'kt-contracts-18',
      title: 'Predict Contract Type Check',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the output using a boolean contract function.',
      skeleton: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
fun isPositive(n: Int?): Boolean {
    contract { returns(true) implies (n != null) }
    return n != null && n > 0
}

fun main() {
    val x: Int? = 42
    if (isPositive(x)) {
        println(x + 1)
    } else {
        println("nope")
    }
}`,
      solution: `43`,
      hints: [
        'returns(true) implies (n != null) enables smart cast.',
        'isPositive(42) returns true.',
        'In the true branch, x is smart-cast to Int, so x + 1 = 43.',
      ],
      concepts: ['returns-true', 'smart-cast'],
    },
    {
      id: 'kt-contracts-19',
      title: 'Refactor Require to Contract Function',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor repeated null checks to a contract-based function.',
      skeleton: `fun processUser(name: String?, email: String?) {
    if (name == null) throw IllegalArgumentException("Name required")
    if (email == null) throw IllegalArgumentException("Email required")
    
    println("\${name.length} \${email.length}")
}`,
      solution: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
fun requireNotNull(value: Any?, name: String) {
    contract {
        returns() implies (value != null)
    }
    if (value == null) throw IllegalArgumentException("\${name} required")
}

fun processUser(name: String?, email: String?) {
    requireNotNull(name, "Name")
    requireNotNull(email, "Email")
    
    println("\${name.length} \${email.length}")
}`,
      hints: [
        'Extract the null check to a function with a contract.',
        'returns() implies (value != null) enables smart casting.',
        'The calling code can use the values without null checks.',
      ],
      concepts: ['contract', 'requireNotNull', 'refactoring'],
    },
    {
      id: 'kt-contracts-20',
      title: 'Refactor Custom Scope to Contract',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Refactor a scope function to use contracts for val initialization.',
      skeleton: `inline fun <T> init(block: () -> T): T {
    return block()
}

fun main() {
    var result: String = ""  // Must use var because compiler does not trust init
    init {
        result = "Hello, World!"
    }
    println(result)
}`,
      solution: `import kotlin.contracts.*

@OptIn(ExperimentalContracts::class)
inline fun <T> init(block: () -> T): T {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return block()
}

fun main() {
    val result: String
    init {
        result = "Hello, World!"
    }
    println(result)
}`,
      hints: [
        'Adding a contract lets the compiler know the block runs exactly once.',
        'This allows changing var to val for immutability.',
        'EXACTLY_ONCE is the key to val initialization.',
      ],
      concepts: ['contract', 'EXACTLY_ONCE', 'val-vs-var', 'refactoring'],
    },
  ],
};
