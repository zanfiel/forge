import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-junit',
  title: '39. Testing with JUnit',
  explanation: `## Testing with JUnit in Java

**JUnit 5** (Jupiter) is the standard testing framework for Java. It provides a rich set of annotations, assertions, and extension points for writing expressive, maintainable tests.

### Basic Test Structure

\`\`\`java
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    private Calculator calc;

    @BeforeEach
    void setUp() {
        calc = new Calculator();
    }

    @Test
    @DisplayName("Addition of two positive numbers")
    void testAdd() {
        assertEquals(5, calc.add(2, 3));
    }

    @AfterEach
    void tearDown() {
        calc = null;
    }
}
\`\`\`

### Key Annotations

- **@Test** - marks a method as a test
- **@DisplayName** - provides a readable name for the test
- **@BeforeEach / @AfterEach** - runs before/after each test method
- **@BeforeAll / @AfterAll** - runs once before/after all tests (must be static)
- **@Disabled** - skips the test
- **@Nested** - groups tests in inner classes
- **@ParameterizedTest** - runs a test with different arguments
- **@RepeatedTest** - runs a test multiple times
- **@Tag** - categorizes tests for filtering

### Assertions

\`\`\`java
assertEquals(expected, actual);
assertNotEquals(unexpected, actual);
assertTrue(condition);
assertFalse(condition);
assertNull(obj);
assertNotNull(obj);
assertThrows(Exception.class, () -> riskyCall());
assertTimeout(Duration.ofSeconds(2), () -> longTask());
assertAll("grouped",
    () -> assertEquals(1, a),
    () -> assertEquals(2, b)
);
\`\`\`

### Parameterized Tests

\`\`\`java
@ParameterizedTest
@ValueSource(ints = {1, 2, 3, 4, 5})
void testIsPositive(int number) {
    assertTrue(number > 0);
}

@ParameterizedTest
@CsvSource({"1,1,2", "2,3,5", "10,20,30"})
void testAdd(int a, int b, int expected) {
    assertEquals(expected, calc.add(a, b));
}
\`\`\``,
  exercises: [
    {
      id: 'java-junit-1',
      title: 'Basic @Test Annotation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Add the correct annotation to mark a method as a JUnit test.',
      skeleton: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class MathTest {
    __BLANK__
    void testAddition() {
        assertEquals(4, 2 + 2);
    }
}`,
      solution: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class MathTest {
    @Test
    void testAddition() {
        assertEquals(4, 2 + 2);
    }
}`,
      hints: [
        'JUnit 5 uses annotations to identify test methods.',
        'The annotation is a simple, short word.',
        'Use @Test above the method.',
      ],
      concepts: ['junit-test-annotation', 'test-basics'],
    },
    {
      id: 'java-junit-2',
      title: 'assertEquals Assertion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Use the correct assertion to check that two values are equal.',
      skeleton: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class StringTest {
    @Test
    void testLength() {
        String word = "Hello";
        __BLANK__(5, word.length());
    }
}`,
      solution: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class StringTest {
    @Test
    void testLength() {
        String word = "Hello";
        assertEquals(5, word.length());
    }
}`,
      hints: [
        'You need an assertion that checks equality between expected and actual.',
        'The method name starts with "assert" and ends with "Equals".',
        'Use assertEquals(expected, actual).',
      ],
      concepts: ['assertions', 'assertEquals'],
    },
    {
      id: 'java-junit-3',
      title: 'BeforeEach Setup',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Add the annotation that makes a method run before each test.',
      skeleton: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class ListTest {
    private java.util.List<String> list;

    __BLANK__
    void setUp() {
        list = new java.util.ArrayList<>();
        list.add("initial");
    }

    @Test
    void testSize() {
        assertEquals(1, list.size());
    }
}`,
      solution: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class ListTest {
    private java.util.List<String> list;

    @BeforeEach
    void setUp() {
        list = new java.util.ArrayList<>();
        list.add("initial");
    }

    @Test
    void testSize() {
        assertEquals(1, list.size());
    }
}`,
      hints: [
        'You want a lifecycle hook that fires before every test method.',
        'The annotation describes when it runs: before each test.',
        'Use @BeforeEach.',
      ],
      concepts: ['lifecycle-hooks', 'beforeEach', 'test-setup'],
    },
    {
      id: 'java-junit-4',
      title: 'assertThrows for Exceptions',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Assert that a method throws an IllegalArgumentException.',
      skeleton: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ValidatorTest {
    @Test
    void testNegativeAge() {
        Validator v = new Validator();
        __BLANK__(IllegalArgumentException.class, () -> v.validateAge(-1));
    }
}`,
      solution: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ValidatorTest {
    @Test
    void testNegativeAge() {
        Validator v = new Validator();
        assertThrows(IllegalArgumentException.class, () -> v.validateAge(-1));
    }
}`,
      hints: [
        'You need an assertion that verifies an exception is thrown.',
        'The method takes the exception class and a lambda that should throw.',
        'Use assertThrows(ExceptionClass.class, () -> code).',
      ],
      concepts: ['assertThrows', 'exception-testing'],
    },
    {
      id: 'java-junit-5',
      title: 'DisplayName Annotation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Add a human-readable display name to a test.',
      skeleton: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {
    @Test
    __BLANK__("User email should not be null after creation")
    void testEmailNotNull() {
        User user = new User("alice@test.com");
        assertNotNull(user.getEmail());
    }
}`,
      solution: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {
    @Test
    @DisplayName("User email should not be null after creation")
    void testEmailNotNull() {
        User user = new User("alice@test.com");
        assertNotNull(user.getEmail());
    }
}`,
      hints: [
        'JUnit 5 has an annotation for setting a readable test name.',
        'It takes a String argument with the display text.',
        'Use @DisplayName("...").',
      ],
      concepts: ['displayName', 'test-readability'],
    },
    {
      id: 'java-junit-6',
      title: '@ValueSource Parameterized Test',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Complete the annotation to supply string values to a parameterized test.',
      skeleton: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import static org.junit.jupiter.api.Assertions.*;

class BlankTest {
    @ParameterizedTest
    __BLANK__(strings = {"", "  ", "\\t", "\\n"})
    void testIsBlank(String input) {
        assertTrue(input.isBlank());
    }
}`,
      solution: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import static org.junit.jupiter.api.Assertions.*;

class BlankTest {
    @ParameterizedTest
    @ValueSource(strings = {"", "  ", "\\t", "\\n"})
    void testIsBlank(String input) {
        assertTrue(input.isBlank());
    }
}`,
      hints: [
        'Parameterized tests need a source annotation providing the test data.',
        'For simple single-argument tests, use the annotation that provides values.',
        'Use @ValueSource(strings = {...}).',
      ],
      concepts: ['parameterized-tests', 'valueSource'],
    },
    {
      id: 'java-junit-7',
      title: 'Write a Basic Test Class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a test class for a Calculator with tests for add and subtract methods using @BeforeEach for setup.',
      skeleton: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

// Write CalculatorTest class with:
// - A Calculator field initialized in @BeforeEach
// - @Test for add(3, 4) == 7
// - @Test for subtract(10, 3) == 7`,
      solution: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    private Calculator calc;

    @BeforeEach
    void setUp() {
        calc = new Calculator();
    }

    @Test
    void testAdd() {
        assertEquals(7, calc.add(3, 4));
    }

    @Test
    void testSubtract() {
        assertEquals(7, calc.subtract(10, 3));
    }
}`,
      hints: [
        'Create a class with a Calculator field.',
        'Use @BeforeEach on a setUp method to instantiate the Calculator.',
        'Write two @Test methods with assertEquals.',
      ],
      concepts: ['test-class-structure', 'beforeEach', 'assertEquals'],
    },
    {
      id: 'java-junit-8',
      title: 'Write assertAll Grouped Assertions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a test that uses assertAll to verify multiple properties of a User object at once.',
      skeleton: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {
    // Write: testUserProperties()
    // Create a User("Alice", 30, "alice@test.com")
    // Use assertAll to check name, age, and email in one grouped assertion
}`,
      solution: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {
    @Test
    void testUserProperties() {
        User user = new User("Alice", 30, "alice@test.com");
        assertAll("user properties",
            () -> assertEquals("Alice", user.getName()),
            () -> assertEquals(30, user.getAge()),
            () -> assertEquals("alice@test.com", user.getEmail())
        );
    }
}`,
      hints: [
        'assertAll takes a heading string and multiple Executable lambdas.',
        'Each lambda contains one assertion.',
        'All assertions run even if one fails.',
      ],
      concepts: ['assertAll', 'grouped-assertions'],
    },
    {
      id: 'java-junit-9',
      title: 'Write a CsvSource Parameterized Test',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a parameterized test using @CsvSource to test a multiply method with three pairs of inputs and expected results.',
      skeleton: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import static org.junit.jupiter.api.Assertions.*;

class MultiplyTest {
    // Write a @ParameterizedTest with @CsvSource
    // Test cases: (2,3,6), (0,5,0), (-1,4,-4)
    // Method signature: void testMultiply(int a, int b, int expected)
}`,
      solution: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import static org.junit.jupiter.api.Assertions.*;

class MultiplyTest {
    @ParameterizedTest
    @CsvSource({"2, 3, 6", "0, 5, 0", "-1, 4, -4"})
    void testMultiply(int a, int b, int expected) {
        Calculator calc = new Calculator();
        assertEquals(expected, calc.multiply(a, b));
    }
}`,
      hints: [
        '@CsvSource takes an array of comma-separated strings.',
        'Each string becomes the arguments for one test invocation.',
        'JUnit auto-converts the CSV values to the parameter types.',
      ],
      concepts: ['parameterized-tests', 'csvSource'],
    },
    {
      id: 'java-junit-10',
      title: 'Write a Nested Test Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a test class with @Nested inner classes to group tests for an empty list and a non-empty list.',
      skeleton: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import java.util.ArrayList;
import java.util.List;

// Write StackTest with:
// - @Nested class WhenEmpty: test isEmpty returns true, test pop throws exception
// - @Nested class WhenNotEmpty: @BeforeEach adds an element, test isEmpty returns false, test pop returns element`,
      solution: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import java.util.ArrayList;
import java.util.List;

class StackTest {
    private List<String> stack;

    @BeforeEach
    void setUp() {
        stack = new ArrayList<>();
    }

    @Nested
    class WhenEmpty {
        @Test
        void testIsEmpty() {
            assertTrue(stack.isEmpty());
        }

        @Test
        void testPopThrows() {
            assertThrows(IndexOutOfBoundsException.class, () -> stack.remove(stack.size() - 1));
        }
    }

    @Nested
    class WhenNotEmpty {
        @BeforeEach
        void addElement() {
            stack.add("hello");
        }

        @Test
        void testIsNotEmpty() {
            assertFalse(stack.isEmpty());
        }

        @Test
        void testPop() {
            String result = stack.remove(stack.size() - 1);
            assertEquals("hello", result);
        }
    }
}`,
      hints: [
        '@Nested inner classes share the outer class setup.',
        'Each nested class can have its own @BeforeEach.',
        'Nested classes logically group related tests.',
      ],
      concepts: ['nested-tests', 'test-organization'],
    },
    {
      id: 'java-junit-11',
      title: 'Write Timeout Assertion',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a test that asserts a method completes within 2 seconds using assertTimeout.',
      skeleton: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.time.Duration;

class PerformanceTest {
    // Write: testFastResponse()
    // Assert that service.fetchData() completes within 2 seconds
    // Use assertTimeout with Duration.ofSeconds(2)
}`,
      solution: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.time.Duration;

class PerformanceTest {
    @Test
    void testFastResponse() {
        Service service = new Service();
        assertTimeout(Duration.ofSeconds(2), () -> service.fetchData());
    }
}`,
      hints: [
        'assertTimeout takes a Duration and an Executable lambda.',
        'Duration.ofSeconds(2) creates a 2-second timeout.',
        'The test fails if the lambda does not complete within the duration.',
      ],
      concepts: ['assertTimeout', 'performance-testing'],
    },
    {
      id: 'java-junit-12',
      title: 'Write a RepeatedTest',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a test that runs 5 times to verify a random number generator always produces values in range 1-100.',
      skeleton: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class RandomTest {
    // Write a @RepeatedTest(5) that:
    // Creates a RandomGenerator instance
    // Calls generate() and asserts result is between 1 and 100 inclusive
}`,
      solution: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class RandomTest {
    @RepeatedTest(5)
    void testRandomInRange() {
        RandomGenerator gen = new RandomGenerator();
        int result = gen.generate();
        assertTrue(result >= 1 && result <= 100,
            "Expected value between 1 and 100 but got " + result);
    }
}`,
      hints: [
        '@RepeatedTest(n) runs the test method n times.',
        'Use assertTrue with a condition checking the range.',
        'Include a message for better failure diagnostics.',
      ],
      concepts: ['repeatedTest', 'randomness-testing'],
    },
    {
      id: 'java-junit-13',
      title: 'Fix Wrong Assertion Order',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'The assertion has expected and actual arguments swapped. Fix the order.',
      skeleton: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class MathTest {
    @Test
    void testSquare() {
        int result = MathUtils.square(5);
        // Bug: arguments are in wrong order (actual, expected)
        assertEquals(result, 25);
    }
}`,
      solution: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class MathTest {
    @Test
    void testSquare() {
        int result = MathUtils.square(5);
        assertEquals(25, result);
    }
}`,
      hints: [
        'assertEquals takes (expected, actual) -- in that order.',
        'The expected value should be the first argument.',
        'Swap the arguments: assertEquals(25, result).',
      ],
      concepts: ['assertEquals', 'assertion-order'],
    },
    {
      id: 'java-junit-14',
      title: 'Fix BeforeAll Not Static',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'The @BeforeAll method is not static. Fix it so the test class compiles.',
      skeleton: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class DatabaseTest {
    private static DatabaseConnection conn;

    @BeforeAll
    void initDatabase() {
        conn = DatabaseConnection.create();
    }

    @Test
    void testConnection() {
        assertNotNull(conn);
    }

    @AfterAll
    void closeDatabase() {
        conn.close();
    }
}`,
      solution: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class DatabaseTest {
    private static DatabaseConnection conn;

    @BeforeAll
    static void initDatabase() {
        conn = DatabaseConnection.create();
    }

    @Test
    void testConnection() {
        assertNotNull(conn);
    }

    @AfterAll
    static void closeDatabase() {
        conn.close();
    }
}`,
      hints: [
        '@BeforeAll and @AfterAll methods must be static in default lifecycle.',
        'Add the static modifier to both lifecycle methods.',
        'static void initDatabase() and static void closeDatabase().',
      ],
      concepts: ['beforeAll', 'afterAll', 'lifecycle-hooks'],
    },
    {
      id: 'java-junit-15',
      title: 'Fix Missing ParameterizedTest Annotation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'The test uses @ValueSource but has @Test instead of @ParameterizedTest. Fix it.',
      skeleton: `import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.provider.ValueSource;
import static org.junit.jupiter.api.Assertions.*;

class EvenTest {
    @Test
    @ValueSource(ints = {2, 4, 6, 8, 10})
    void testEvenNumbers(int number) {
        assertEquals(0, number % 2);
    }
}`,
      solution: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import static org.junit.jupiter.api.Assertions.*;

class EvenTest {
    @ParameterizedTest
    @ValueSource(ints = {2, 4, 6, 8, 10})
    void testEvenNumbers(int number) {
        assertEquals(0, number % 2);
    }
}`,
      hints: [
        '@ValueSource provides data for parameterized tests, not regular @Test.',
        'Replace @Test with the correct parameterized annotation.',
        'Use @ParameterizedTest instead of @Test.',
      ],
      concepts: ['parameterized-tests', 'valueSource'],
    },
    {
      id: 'java-junit-16',
      title: 'Predict Test Output: Lifecycle Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the order in which lifecycle methods execute for a class with two tests.',
      skeleton: `import org.junit.jupiter.api.*;

class LifecycleTest {
    @BeforeAll
    static void beforeAll() { System.out.print("A "); }

    @BeforeEach
    void beforeEach() { System.out.print("B "); }

    @Test
    void test1() { System.out.print("1 "); }

    @Test
    void test2() { System.out.print("2 "); }

    @AfterEach
    void afterEach() { System.out.print("C "); }

    @AfterAll
    static void afterAll() { System.out.print("D"); }
}
// What is printed? (Assume test1 runs before test2)`,
      solution: `A B 1 C B 2 C D`,
      hints: [
        '@BeforeAll runs once at the start, @AfterAll once at the end.',
        '@BeforeEach and @AfterEach wrap each individual test.',
        'The sequence is: A, then for each test: B-test-C, then D.',
      ],
      concepts: ['lifecycle-hooks', 'test-execution-order'],
    },
    {
      id: 'java-junit-17',
      title: 'Predict assertAll Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict how many assertion failures are reported when using assertAll.',
      skeleton: `@Test
void testMultipleAssertions() {
    assertAll("values",
        () -> assertEquals(1, 2),  // fails
        () -> assertEquals(3, 3),  // passes
        () -> assertEquals(5, 6)   // fails
    );
}
// How many assertion failures are reported: 1, 2, or 3?`,
      solution: `2`,
      hints: [
        'assertAll runs ALL assertions, even if some fail.',
        'It collects all failures and reports them together.',
        'Two assertions fail (1!=2 and 5!=6), so 2 failures are reported.',
      ],
      concepts: ['assertAll', 'soft-assertions'],
    },
    {
      id: 'java-junit-18',
      title: 'Predict Disabled Test',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'What happens to a test annotated with @Disabled?',
      skeleton: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class SkipTest {
    @Test
    @Disabled("Under construction")
    void testFeature() {
        fail("This should not run");
    }

    @Test
    void testOther() {
        assertTrue(true);
    }
}
// How many tests pass, how many are skipped?`,
      solution: `1 passed, 1 skipped`,
      hints: [
        '@Disabled prevents a test from executing.',
        'The disabled test does not count as passed or failed.',
        'testOther passes, testFeature is skipped.',
      ],
      concepts: ['disabled-tests', 'test-lifecycle'],
    },
    {
      id: 'java-junit-19',
      title: 'Refactor Repeated Setup to @BeforeEach',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor duplicated setup code from each test method into a @BeforeEach method.',
      skeleton: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.ArrayList;
import java.util.List;

class ShoppingCartTest {
    @Test
    void testAddItem() {
        List<String> cart = new ArrayList<>();
        cart.add("Apple");
        assertEquals(1, cart.size());
    }

    @Test
    void testRemoveItem() {
        List<String> cart = new ArrayList<>();
        cart.add("Apple");
        cart.remove("Apple");
        assertTrue(cart.isEmpty());
    }

    @Test
    void testContains() {
        List<String> cart = new ArrayList<>();
        cart.add("Apple");
        assertTrue(cart.contains("Apple"));
    }
}`,
      solution: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import java.util.ArrayList;
import java.util.List;

class ShoppingCartTest {
    private List<String> cart;

    @BeforeEach
    void setUp() {
        cart = new ArrayList<>();
        cart.add("Apple");
    }

    @Test
    void testAddItem() {
        assertEquals(1, cart.size());
    }

    @Test
    void testRemoveItem() {
        cart.remove("Apple");
        assertTrue(cart.isEmpty());
    }

    @Test
    void testContains() {
        assertTrue(cart.contains("Apple"));
    }
}`,
      hints: [
        'All three tests create a list and add "Apple" -- extract that to @BeforeEach.',
        'Make the list a field and initialize it in setUp().',
        'Remove the duplicated lines from each test method.',
      ],
      concepts: ['beforeEach', 'dry-principle', 'test-refactoring'],
    },
    {
      id: 'java-junit-20',
      title: 'Refactor to Parameterized Test',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor three nearly identical test methods into a single parameterized test with @CsvSource.',
      skeleton: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PalindromeTest {
    @Test
    void testRacecar() {
        assertTrue(StringUtils.isPalindrome("racecar"));
    }

    @Test
    void testLevel() {
        assertTrue(StringUtils.isPalindrome("level"));
    }

    @Test
    void testHello() {
        assertFalse(StringUtils.isPalindrome("hello"));
    }
}`,
      solution: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import static org.junit.jupiter.api.Assertions.*;

class PalindromeTest {
    @ParameterizedTest
    @CsvSource({"racecar, true", "level, true", "hello, false"})
    void testIsPalindrome(String input, boolean expected) {
        assertEquals(expected, StringUtils.isPalindrome(input));
    }
}`,
      hints: [
        'All three tests call the same method with different inputs and expectations.',
        'Use @ParameterizedTest with @CsvSource to supply input and expected result.',
        'Each CSV row contains the input string and the expected boolean.',
      ],
      concepts: ['parameterized-tests', 'csvSource', 'test-refactoring'],
    },
  ],
};
