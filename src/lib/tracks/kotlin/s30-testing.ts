import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'kt-testing',
  title: '30. Testing',
  explanation: `## Testing in Kotlin

Kotlin testing leverages JUnit alongside Kotlin-specific libraries like Kotest and assertk for expressive, readable tests.

### JUnit with Kotlin

\`\`\`kotlin
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class CalculatorTest {
    @Test
    fun \`addition works correctly\`() {
        assertEquals(4, 2 + 2)
    }
}
\`\`\`

### Kotest Assertions

\`\`\`kotlin
import io.kotest.matchers.shouldBe
import io.kotest.matchers.string.shouldContain

"hello world" shouldContain "world"
42 shouldBe 42
\`\`\`

### Parameterized Tests

\`\`\`kotlin
@ParameterizedTest
@ValueSource(ints = [1, 2, 3, 4])
fun \`positive numbers\`(value: Int) {
    assertTrue(value > 0)
}
\`\`\`

### Coroutine Testing

\`\`\`kotlin
import kotlinx.coroutines.test.*

@Test
fun \`test suspend function\`() = runTest {
    val result = fetchData()
    assertEquals("Data", result)
}
\`\`\`

The \`runTest\` builder auto-advances virtual time, making delay-based tests instant.`,
  exercises: [
    {
      id: 'kt-testing-1',
      title: 'Basic JUnit Test',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Write a basic JUnit test with assertEquals.',
      skeleton: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class MathTest {
    ___
    fun \`multiplication works\`() {
        ___(12, 3 * 4)
    }
}`,
      solution: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class MathTest {
    @Test
    fun \`multiplication works\`() {
        assertEquals(12, 3 * 4)
    }
}`,
      hints: [
        'Use @Test annotation to mark a test method.',
        'assertEquals takes expected value first, then actual.',
        'Kotlin allows backtick-quoted method names for readable test names.',
      ],
      concepts: ['JUnit', 'Test-annotation', 'assertEquals'],
    },
    {
      id: 'kt-testing-2',
      title: 'assertTrue and assertFalse',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Use assertTrue and assertFalse assertions.',
      skeleton: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class BooleanTest {
    @Test
    fun \`check conditions\`() {
        ___(10 > 5)
        ___(10 < 5)
    }
}`,
      solution: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class BooleanTest {
    @Test
    fun \`check conditions\`() {
        assertTrue(10 > 5)
        assertFalse(10 < 5)
    }
}`,
      hints: [
        'assertTrue checks that the condition is true.',
        'assertFalse checks that the condition is false.',
        'Both take a Boolean expression.',
      ],
      concepts: ['assertTrue', 'assertFalse'],
    },
    {
      id: 'kt-testing-3',
      title: 'assertThrows',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use assertThrows to verify an exception is thrown.',
      skeleton: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class ExceptionTest {
    @Test
    fun \`division by zero throws\`() {
        ___<ArithmeticException> {
            val result = 1 / 0
        }
    }
}`,
      solution: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class ExceptionTest {
    @Test
    fun \`division by zero throws\`() {
        assertThrows<ArithmeticException> {
            val result = 1 / 0
        }
    }
}`,
      hints: [
        'assertThrows verifies that the block throws the specified exception.',
        'Use the reified type parameter with angle brackets.',
        'The test fails if no exception or a different exception is thrown.',
      ],
      concepts: ['assertThrows', 'exception-testing'],
    },
    {
      id: 'kt-testing-4',
      title: 'Kotest shouldBe',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Use Kotest shouldBe matcher for assertions.',
      skeleton: `import io.kotest.matchers.shouldBe
import io.kotest.matchers.string.shouldStartWith
import org.junit.jupiter.api.Test

class KotestTest {
    @Test
    fun \`string assertions\`() {
        val greeting = "Hello, World!"
        greeting.length ___ 13
        greeting ___ "Hello"
    }
}`,
      solution: `import io.kotest.matchers.shouldBe
import io.kotest.matchers.string.shouldStartWith
import org.junit.jupiter.api.Test

class KotestTest {
    @Test
    fun \`string assertions\`() {
        val greeting = "Hello, World!"
        greeting.length shouldBe 13
        greeting shouldStartWith "Hello"
    }
}`,
      hints: [
        'shouldBe is an infix function for equality assertions.',
        'shouldStartWith checks the string prefix.',
        'Kotest matchers read like natural language.',
      ],
      concepts: ['shouldBe', 'shouldStartWith', 'kotest'],
    },
    {
      id: 'kt-testing-5',
      title: 'runTest for Coroutines',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Use runTest to test a suspend function.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.test.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

suspend fun fetchValue(): Int {
    delay(1000)
    return 42
}

class CoroutineTest {
    @Test
    fun \`test fetch value\`() = ___ {
        val result = fetchValue()
        assertEquals(42, result)
    }
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.test.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

suspend fun fetchValue(): Int {
    delay(1000)
    return 42
}

class CoroutineTest {
    @Test
    fun \`test fetch value\`() = runTest {
        val result = fetchValue()
        assertEquals(42, result)
    }
}`,
      hints: [
        'runTest creates a test coroutine scope with virtual time.',
        'It auto-advances virtual time, making delay instant.',
        'Use runTest instead of runBlocking for coroutine tests.',
      ],
      concepts: ['runTest', 'coroutine-testing', 'virtual-time'],
    },
    {
      id: 'kt-testing-6',
      title: 'Parameterized Test',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Create a parameterized test with multiple inputs.',
      skeleton: `import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.CsvSource

class ParamTest {
    @___
    @CsvSource("1,1", "2,4", "3,9", "4,16")
    fun \`square values\`(input: Int, expected: Int) {
        assertEquals(expected, input * input)
    }
}`,
      solution: `import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.CsvSource

class ParamTest {
    @ParameterizedTest
    @CsvSource("1,1", "2,4", "3,9", "4,16")
    fun \`square values\`(input: Int, expected: Int) {
        assertEquals(expected, input * input)
    }
}`,
      hints: [
        '@ParameterizedTest replaces @Test for parameterized tests.',
        '@CsvSource provides comma-separated input/expected pairs.',
        'The test runs once for each set of parameters.',
      ],
      concepts: ['ParameterizedTest', 'CsvSource'],
    },
    {
      id: 'kt-testing-7',
      title: 'Write a Test for a List Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Write a test class with multiple test methods for a list utility function.',
      skeleton: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

fun sumPositive(numbers: List<Int>): Int = numbers.filter { it > 0 }.sum()

// Write a test class called SumPositiveTest with:
// 1. A test that checks sumPositive(listOf(1, -2, 3, -4, 5)) returns 9
// 2. A test that checks sumPositive(emptyList()) returns 0
// 3. A test that checks sumPositive(listOf(-1, -2, -3)) returns 0`,
      solution: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

fun sumPositive(numbers: List<Int>): Int = numbers.filter { it > 0 }.sum()

class SumPositiveTest {
    @Test
    fun \`sums positive numbers\`() {
        assertEquals(9, sumPositive(listOf(1, -2, 3, -4, 5)))
    }

    @Test
    fun \`empty list returns zero\`() {
        assertEquals(0, sumPositive(emptyList()))
    }

    @Test
    fun \`all negative returns zero\`() {
        assertEquals(0, sumPositive(listOf(-1, -2, -3)))
    }
}`,
      hints: [
        'Each test method needs @Test annotation.',
        'Use backtick-quoted names for readable test descriptions.',
        'assertEquals(expected, actual) for each assertion.',
      ],
      concepts: ['JUnit', 'multiple-tests', 'edge-cases'],
    },
    {
      id: 'kt-testing-8',
      title: 'Write a Test with Setup',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a test class with @BeforeEach setup.',
      skeleton: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Assertions.*

class Counter {
    var count = 0
    fun increment() { count++ }
    fun decrement() { count-- }
    fun reset() { count = 0 }
}

// Write a test class called CounterTest with:
// 1. A private lateinit var counter: Counter
// 2. A @BeforeEach fun that creates a new Counter
// 3. Test that increment increases count to 1
// 4. Test that decrement decreases count to -1
// 5. Test that multiple increments work (increment 3 times, check count is 3)`,
      solution: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Assertions.*

class Counter {
    var count = 0
    fun increment() { count++ }
    fun decrement() { count-- }
    fun reset() { count = 0 }
}

class CounterTest {
    private lateinit var counter: Counter

    @BeforeEach
    fun setup() {
        counter = Counter()
    }

    @Test
    fun \`increment increases count\`() {
        counter.increment()
        assertEquals(1, counter.count)
    }

    @Test
    fun \`decrement decreases count\`() {
        counter.decrement()
        assertEquals(-1, counter.count)
    }

    @Test
    fun \`multiple increments work\`() {
        repeat(3) { counter.increment() }
        assertEquals(3, counter.count)
    }
}`,
      hints: [
        'Use @BeforeEach to run setup before each test.',
        'lateinit var allows initialization in the setup method.',
        'Each test gets a fresh Counter instance.',
      ],
      concepts: ['BeforeEach', 'lateinit', 'test-setup'],
    },
    {
      id: 'kt-testing-9',
      title: 'Write a Coroutine Test',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a test for a suspend function using runTest.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.test.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

suspend fun computeResult(a: Int, b: Int): Int {
    delay(1000)
    return a + b
}

// Write a test class called ComputeTest with:
// 1. A test that uses runTest
// 2. Calls computeResult(10, 20)
// 3. Asserts the result equals 30`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.test.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

suspend fun computeResult(a: Int, b: Int): Int {
    delay(1000)
    return a + b
}

class ComputeTest {
    @Test
    fun \`computes correct result\`() = runTest {
        val result = computeResult(10, 20)
        assertEquals(30, result)
    }
}`,
      hints: [
        'runTest auto-advances virtual time past the delay.',
        'The test runs instantly despite the 1000ms delay.',
        'Use = runTest { } to make the test function return TestResult.',
      ],
      concepts: ['runTest', 'coroutine-testing'],
    },
    {
      id: 'kt-testing-10',
      title: 'Write a Test with advanceTimeBy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'kotlin',
      goal: 'Write a coroutine test that manually advances virtual time.',
      skeleton: `import kotlinx.coroutines.*
import kotlinx.coroutines.test.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

// Write a test class called TimerTest with a test that:
// 1. Uses runTest
// 2. Creates a var count = 0
// 3. Launches a coroutine that repeats 5 times: delay(1000), count++
// 4. Calls advanceTimeBy(3000) and asserts count == 3
// 5. Calls advanceTimeBy(2000) and asserts count == 5`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.test.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class TimerTest {
    @Test
    fun \`advance time controls execution\`() = runTest {
        var count = 0
        launch {
            repeat(5) {
                delay(1000)
                count++
            }
        }
        advanceTimeBy(3000)
        assertEquals(3, count)
        advanceTimeBy(2000)
        assertEquals(5, count)
    }
}`,
      hints: [
        'advanceTimeBy moves virtual time forward by the specified amount.',
        'After 3000ms, 3 iterations of 1000ms delay have completed.',
        'After another 2000ms (total 5000ms), all 5 iterations are done.',
      ],
      concepts: ['advanceTimeBy', 'virtual-time', 'runTest'],
    },
    {
      id: 'kt-testing-11',
      title: 'Write a Kotest Style Test',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write a test using Kotest matchers for collection assertions.',
      skeleton: `import io.kotest.matchers.shouldBe
import io.kotest.matchers.collections.*
import org.junit.jupiter.api.Test

// Write a test class called CollectionTest with a test that:
// 1. Creates a list = listOf(3, 1, 4, 1, 5, 9)
// 2. Asserts the list shouldHaveSize 6
// 3. Asserts the list shouldContain 5
// 4. Asserts the list shouldNotContain 7
// 5. Asserts the list.sorted().first() shouldBe 1`,
      solution: `import io.kotest.matchers.shouldBe
import io.kotest.matchers.collections.*
import org.junit.jupiter.api.Test

class CollectionTest {
    @Test
    fun \`collection assertions\`() {
        val list = listOf(3, 1, 4, 1, 5, 9)
        list shouldHaveSize 6
        list shouldContain 5
        list shouldNotContain 7
        list.sorted().first() shouldBe 1
    }
}`,
      hints: [
        'shouldHaveSize checks the collection size.',
        'shouldContain and shouldNotContain check element presence.',
        'Kotest matchers are infix functions for readability.',
      ],
      concepts: ['kotest', 'collection-matchers'],
    },
    {
      id: 'kt-testing-12',
      title: 'Write an Exception Test',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Write tests that verify exceptions and their messages.',
      skeleton: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

fun divide(a: Int, b: Int): Int {
    require(b != 0) { "Cannot divide by zero" }
    return a / b
}

// Write a test class called DivideTest with:
// 1. A test that asserts divide(10, 2) returns 5
// 2. A test that asserts divide(0, 5) returns 0
// 3. A test that asserts dividing by zero throws IllegalArgumentException
// 4. The third test also verifies the exception message contains "zero"`,
      solution: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

fun divide(a: Int, b: Int): Int {
    require(b != 0) { "Cannot divide by zero" }
    return a / b
}

class DivideTest {
    @Test
    fun \`divides correctly\`() {
        assertEquals(5, divide(10, 2))
    }

    @Test
    fun \`zero divided by anything is zero\`() {
        assertEquals(0, divide(0, 5))
    }

    @Test
    fun \`divide by zero throws\`() {
        val exception = assertThrows<IllegalArgumentException> {
            divide(10, 0)
        }
        assertTrue(exception.message!!.contains("zero"))
    }
}`,
      hints: [
        'assertThrows returns the caught exception.',
        'You can inspect the exception message.',
        'require throws IllegalArgumentException.',
      ],
      concepts: ['assertThrows', 'exception-message', 'require'],
    },
    {
      id: 'kt-testing-13',
      title: 'Fix Incorrect Assertion Order',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Fix the assertEquals call with swapped expected and actual values.',
      skeleton: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class SwappedTest {
    @Test
    fun \`string length\`() {
        val text = "Kotlin"
        assertEquals(text.length, 6)  // Swapped! Error message will be confusing
    }
}`,
      solution: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class SwappedTest {
    @Test
    fun \`string length\`() {
        val text = "Kotlin"
        assertEquals(6, text.length)
    }
}`,
      hints: [
        'assertEquals takes expected first, actual second.',
        'Swapped order gives confusing failure messages.',
        'Convention: assertEquals(expected, actual).',
      ],
      concepts: ['assertEquals', 'assertion-order'],
    },
    {
      id: 'kt-testing-14',
      title: 'Fix runBlocking in Test',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Replace runBlocking with runTest for coroutine tests.',
      skeleton: `import kotlinx.coroutines.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

suspend fun slowOperation(): String {
    delay(10_000)
    return "done"
}

class SlowTest {
    @Test
    fun \`test slow operation\`() = runBlocking {
        // This test takes 10 real seconds!
        val result = slowOperation()
        assertEquals("done", result)
    }
}`,
      solution: `import kotlinx.coroutines.*
import kotlinx.coroutines.test.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

suspend fun slowOperation(): String {
    delay(10_000)
    return "done"
}

class SlowTest {
    @Test
    fun \`test slow operation\`() = runTest {
        val result = slowOperation()
        assertEquals("done", result)
    }
}`,
      hints: [
        'runBlocking blocks the real thread for the full delay.',
        'runTest uses virtual time, making delays instant.',
        'Import kotlinx.coroutines.test.runTest.',
      ],
      concepts: ['runTest', 'virtual-time', 'performance'],
    },
    {
      id: 'kt-testing-15',
      title: 'Fix Missing Test Annotation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Fix the test method that is missing its @Test annotation.',
      skeleton: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class MissingAnnotation {
    @Test
    fun \`first test\`() {
        assertEquals(2, 1 + 1)
    }

    fun \`second test\`() {
        assertEquals(4, 2 + 2)  // This test never runs!
    }
}`,
      solution: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class MissingAnnotation {
    @Test
    fun \`first test\`() {
        assertEquals(2, 1 + 1)
    }

    @Test
    fun \`second test\`() {
        assertEquals(4, 2 + 2)
    }
}`,
      hints: [
        'Without @Test, the method is not recognized as a test.',
        'The test runner only executes annotated methods.',
        'Add @Test before the second function.',
      ],
      concepts: ['Test-annotation', 'test-discovery'],
    },
    {
      id: 'kt-testing-16',
      title: 'Predict Test Result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Predict whether the test passes or fails.',
      skeleton: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class PredictTest {
    @Test
    fun \`list equality\`() {
        val a = listOf(1, 2, 3)
        val b = listOf(1, 2, 3)
        assertEquals(a, b)
        println("PASS")
    }
}`,
      solution: `PASS`,
      hints: [
        'Kotlin data-based equals compares list contents.',
        'Two lists with the same elements are equal.',
        'assertEquals will pass, then "PASS" is printed.',
      ],
      concepts: ['structural-equality', 'list-comparison'],
    },
    {
      id: 'kt-testing-17',
      title: 'Predict assertAll Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict the behavior of assertAll with multiple assertions.',
      skeleton: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class AssertAllTest {
    @Test
    fun \`grouped assertions\`() {
        val name = "Kotlin"
        assertAll(
            { assertEquals(6, name.length) },
            { assertTrue(name.startsWith("K")) },
            { assertTrue(name.endsWith("n")) }
        )
        println("All passed")
    }
}`,
      solution: `All passed`,
      hints: [
        'assertAll runs ALL assertions, even if some fail.',
        'All three conditions are true here.',
        '"Kotlin" has length 6, starts with K, ends with n.',
      ],
      concepts: ['assertAll', 'grouped-assertions'],
    },
    {
      id: 'kt-testing-18',
      title: 'Predict Parameterized Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Predict how many times a parameterized test runs.',
      skeleton: `import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.ValueSource

class CountTest {
    var runCount = 0

    @ParameterizedTest
    @ValueSource(strings = ["a", "bb", "ccc", "dddd"])
    fun \`check lengths\`(input: String) {
        runCount++
        println("Run \${runCount}: \${input}")
    }
}`,
      solution: `Run 1: a
Run 2: bb
Run 3: ccc
Run 4: dddd`,
      hints: [
        'The test runs once for each value in @ValueSource.',
        'There are 4 strings, so the test runs 4 times.',
        'Note: runCount resets per instance with default JUnit lifecycle.',
      ],
      concepts: ['ParameterizedTest', 'ValueSource', 'test-count'],
    },
    {
      id: 'kt-testing-19',
      title: 'Refactor Print Verification to Assertions',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'kotlin',
      goal: 'Refactor manual print-and-check testing to proper assertions.',
      skeleton: `fun reverse(s: String): String = s.reversed()

fun main() {
    println(reverse("hello"))   // Check: should be "olleh"
    println(reverse(""))        // Check: should be ""
    println(reverse("a"))       // Check: should be "a"
    println("Check the output manually!")
}`,
      solution: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

fun reverse(s: String): String = s.reversed()

class ReverseTest {
    @Test
    fun \`reverses a string\`() {
        assertEquals("olleh", reverse("hello"))
    }

    @Test
    fun \`empty string stays empty\`() {
        assertEquals("", reverse(""))
    }

    @Test
    fun \`single char unchanged\`() {
        assertEquals("a", reverse("a"))
    }
}`,
      hints: [
        'Replace println checks with assertEquals assertions.',
        'Each case becomes its own @Test method.',
        'Tests give automatic pass/fail instead of manual checking.',
      ],
      concepts: ['assertions', 'test-automation', 'refactoring'],
    },
    {
      id: 'kt-testing-20',
      title: 'Refactor Repeated Setup to @BeforeEach',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'kotlin',
      goal: 'Refactor repeated test setup into a @BeforeEach method.',
      skeleton: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class StackTest {
    @Test
    fun \`push adds element\`() {
        val stack = ArrayDeque<Int>()
        stack.addLast(1)
        stack.addLast(2)
        assertEquals(2, stack.size)
    }

    @Test
    fun \`pop removes last\`() {
        val stack = ArrayDeque<Int>()
        stack.addLast(1)
        stack.addLast(2)
        assertEquals(2, stack.removeLast())
    }

    @Test
    fun \`peek shows last\`() {
        val stack = ArrayDeque<Int>()
        stack.addLast(1)
        stack.addLast(2)
        assertEquals(2, stack.last())
    }
}`,
      solution: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Assertions.*

class StackTest {
    private lateinit var stack: ArrayDeque<Int>

    @BeforeEach
    fun setup() {
        stack = ArrayDeque()
        stack.addLast(1)
        stack.addLast(2)
    }

    @Test
    fun \`push adds element\`() {
        assertEquals(2, stack.size)
    }

    @Test
    fun \`pop removes last\`() {
        assertEquals(2, stack.removeLast())
    }

    @Test
    fun \`peek shows last\`() {
        assertEquals(2, stack.last())
    }
}`,
      hints: [
        'Extract the repeated ArrayDeque creation to @BeforeEach.',
        'Use lateinit var for the shared test fixture.',
        'Each test gets a fresh stack instance.',
      ],
      concepts: ['BeforeEach', 'DRY', 'test-fixture'],
    },
  ],
};
