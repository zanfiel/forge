import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-testing',
  title: '30. Testing',
  explanation: `## Testing in PHP

PHPUnit is the standard testing framework for PHP. It provides assertions, data providers, mocking, and code coverage tools.

### Basic Test
\`\`\`php
<?php
use PHPUnit\\Framework\\TestCase;

class CalculatorTest extends TestCase {
    public function testAdd(): void {
        \\\$calc = new Calculator();
        \\\$this->assertEquals(4, \\\$calc->add(2, 2));
    }

    public function testDivideByZero(): void {
        \\\$calc = new Calculator();
        \\\$this->expectException(DivisionByZeroError::class);
        \\\$calc->divide(10, 0);
    }
}
\`\`\`

### Common Assertions
\`\`\`php
<?php
\\\$this->assertEquals(\\\$expected, \\\$actual);
\\\$this->assertTrue(\\\$condition);
\\\$this->assertFalse(\\\$condition);
\\\$this->assertNull(\\\$value);
\\\$this->assertCount(3, \\\$array);
\\\$this->assertContains('item', \\\$array);
\\\$this->assertInstanceOf(User::class, \\\$object);
\\\$this->assertSame(\\\$expected, \\\$actual); // strict ===
\`\`\`

### Data Providers
\`\`\`php
<?php
#[DataProvider('additionProvider')]
public function testAdd(int \\\$a, int \\\$b, int \\\$expected): void {
    \\\$this->assertEquals(\\\$expected, \\\$this->calc->add(\\\$a, \\\$b));
}

public static function additionProvider(): array {
    return [
        [1, 1, 2],
        [0, 0, 0],
        [-1, 1, 0],
    ];
}
\`\`\`

### Mocking
\`\`\`php
<?php
public function testSendNotification(): void {
    \\\$mailer = \\\$this->createMock(MailerInterface::class);
    \\\$mailer->expects(\\\$this->once())
            ->method('send')
            ->with('user@test.com', 'Hello');

    \\\$service = new NotificationService(\\\$mailer);
    \\\$service->notify('user@test.com', 'Hello');
}
\`\`\`

### Setup and Teardown
\`\`\`php
<?php
protected function setUp(): void {
    \\\$this->calc = new Calculator();
}

protected function tearDown(): void {
    // Cleanup resources
}
\`\`\``,
  exercises: [
    {
      id: 'php-testing-1',
      title: 'Basic Assertion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to assert that the result equals the expected value.',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;

class MathTest extends TestCase {
    public function testMultiply(): void {
        \\\$result = 3 * 4;
        \\\$this->___(12, \\\$result);
    }
}`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;

class MathTest extends TestCase {
    public function testMultiply(): void {
        \\\$result = 3 * 4;
        \\\$this->assertEquals(12, \\\$result);
    }
}`,
      hints: [
        'PHPUnit has assertion methods on the test class',
        'To check equality, use assertEquals',
        'The expected value comes first, then actual',
      ],
      concepts: ['assertions', 'assertEquals'],
    },
    {
      id: 'php-testing-2',
      title: 'Assert True',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to assert that the condition is true.',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;

class ValidatorTest extends TestCase {
    public function testIsPositive(): void {
        \\\$value = 5;
        \\\$this->___(\\\$value > 0);
    }
}`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;

class ValidatorTest extends TestCase {
    public function testIsPositive(): void {
        \\\$value = 5;
        \\\$this->assertTrue(\\\$value > 0);
    }
}`,
      hints: [
        'Use an assertion that checks for truthiness',
        'The method is assertTrue()',
        'It takes a boolean expression',
      ],
      concepts: ['assertions', 'assertTrue'],
    },
    {
      id: 'php-testing-3',
      title: 'Expect Exception',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to expect an InvalidArgumentException to be thrown.',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;

class ParserTest extends TestCase {
    public function testInvalidInput(): void {
        \\\$this->___(InvalidArgumentException::class);
        \\\$parser = new Parser();
        \\\$parser->parse('');
    }
}`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;

class ParserTest extends TestCase {
    public function testInvalidInput(): void {
        \\\$this->expectException(InvalidArgumentException::class);
        \\\$parser = new Parser();
        \\\$parser->parse('');
    }
}`,
      hints: [
        'PHPUnit can verify that exceptions are thrown',
        'Call the expectation before the code that throws',
        'Use expectException() with the exception class',
      ],
      concepts: ['exceptions', 'expectException'],
    },
    {
      id: 'php-testing-4',
      title: 'SetUp Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to set up the test fixture before each test.',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;

class StackTest extends TestCase {
    private array \\\$stack;

    protected function ___(): void {
        \\\$this->stack = [];
    }

    public function testPush(): void {
        \\\$this->stack[] = 'item';
        \\\$this->assertCount(1, \\\$this->stack);
    }
}`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;

class StackTest extends TestCase {
    private array \\\$stack;

    protected function setUp(): void {
        \\\$this->stack = [];
    }

    public function testPush(): void {
        \\\$this->stack[] = 'item';
        \\\$this->assertCount(1, \\\$this->stack);
    }
}`,
      hints: [
        'PHPUnit runs a method before each test',
        'It initializes the test fixture',
        'The method is setUp()',
      ],
      concepts: ['setUp', 'test-fixtures'],
    },
    {
      id: 'php-testing-5',
      title: 'Assert Instance Of',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to assert the object is an instance of the expected class.',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;

class FactoryTest extends TestCase {
    public function testCreate(): void {
        \\\$factory = new UserFactory();
        \\\$user = \\\$factory->create();
        \\\$this->___(User::class, \\\$user);
    }
}`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;

class FactoryTest extends TestCase {
    public function testCreate(): void {
        \\\$factory = new UserFactory();
        \\\$user = \\\$factory->create();
        \\\$this->assertInstanceOf(User::class, \\\$user);
    }
}`,
      hints: [
        'Use an assertion that checks object type',
        'The expected class comes first',
        'Use assertInstanceOf()',
      ],
      concepts: ['assertions', 'assertInstanceOf'],
    },
    {
      id: 'php-testing-6',
      title: 'Assert Contains',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to assert that an array contains a specific value.',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;

class ListTest extends TestCase {
    public function testAddItem(): void {
        \\\$list = new ShoppingList();
        \\\$list->add('Milk');
        \\\$this->___('Milk', \\\$list->getItems());
    }
}`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;

class ListTest extends TestCase {
    public function testAddItem(): void {
        \\\$list = new ShoppingList();
        \\\$list->add('Milk');
        \\\$this->assertContains('Milk', \\\$list->getItems());
    }
}`,
      hints: [
        'Check if an array contains a value',
        'The value comes first, then the array',
        'Use assertContains()',
      ],
      concepts: ['assertions', 'assertContains'],
    },
    {
      id: 'php-testing-7',
      title: 'Write a Data Provider Test',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a test class with a data provider that tests a slugify function with multiple inputs: "Hello World" -> "hello-world", "PHP 8.1" -> "php-81", "  Spaces  " -> "spaces".',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;
use PHPUnit\\Framework\\Attributes\\DataProvider;

class SlugTest extends TestCase {
    // Write the data provider method
    // Write the test method using #[DataProvider]
}`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;
use PHPUnit\\Framework\\Attributes\\DataProvider;

class SlugTest extends TestCase {
    public static function slugProvider(): array {
        return [
            ['Hello World', 'hello-world'],
            ['PHP 8.1', 'php-81'],
            ['  Spaces  ', 'spaces'],
        ];
    }

    #[DataProvider('slugProvider')]
    public function testSlugify(string \\\$input, string \\\$expected): void {
        \\\$this->assertEquals(\\\$expected, slugify(\\\$input));
    }
}`,
      hints: [
        'Data providers are static methods returning arrays',
        'Each inner array provides arguments for one test run',
        'Use the #[DataProvider] attribute to link them',
      ],
      concepts: ['data-providers', 'parameterized-tests'],
    },
    {
      id: 'php-testing-8',
      title: 'Write a Mock Test',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a test that mocks a LoggerInterface with a log method. Verify the OrderService calls log exactly once when an order is placed.',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;

class OrderServiceTest extends TestCase {
    public function testPlaceOrderLogsEvent(): void {
        // Create mock of LoggerInterface
        // Expect log() to be called once with 'Order placed'
        // Create OrderService with mock logger
        // Call placeOrder()
    }
}`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;

class OrderServiceTest extends TestCase {
    public function testPlaceOrderLogsEvent(): void {
        \\\$logger = \\\$this->createMock(LoggerInterface::class);
        \\\$logger->expects(\\\$this->once())
                ->method('log')
                ->with('Order placed');

        \\\$service = new OrderService(\\\$logger);
        \\\$service->placeOrder();
    }
}`,
      hints: [
        'Use createMock() to create a test double',
        'Use expects(\$this->once()) for call count verification',
        'Chain ->method() and ->with() for specifics',
      ],
      concepts: ['mocking', 'test-doubles', 'dependency-injection'],
    },
    {
      id: 'php-testing-9',
      title: 'Write setUp and Multiple Tests',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a test class for a Stack with setUp, testPush (push adds item), testPop (pop returns last item), and testEmpty (new stack is empty).',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;

class StackTest extends TestCase {
    // setUp to create a Stack instance
    // testEmpty: new stack has count 0
    // testPush: push adds an item, count is 1
    // testPop: push then pop returns the item
}`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;

class StackTest extends TestCase {
    private Stack \\\$stack;

    protected function setUp(): void {
        \\\$this->stack = new Stack();
    }

    public function testEmpty(): void {
        \\\$this->assertCount(0, \\\$this->stack->toArray());
    }

    public function testPush(): void {
        \\\$this->stack->push('item');
        \\\$this->assertCount(1, \\\$this->stack->toArray());
    }

    public function testPop(): void {
        \\\$this->stack->push('hello');
        \\\$result = \\\$this->stack->pop();
        \\\$this->assertEquals('hello', \\\$result);
    }
}`,
      hints: [
        'setUp runs before each test for a fresh fixture',
        'Store the Stack as a class property',
        'Each test method must start with "test"',
      ],
      concepts: ['setUp', 'test-isolation', 'assertions'],
    },
    {
      id: 'php-testing-10',
      title: 'Stub Return Values',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a test that stubs a UserRepository to return a specific user, then tests that UserService::getDisplayName returns the correct formatted name.',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;

class UserServiceTest extends TestCase {
    public function testGetDisplayName(): void {
        // Stub UserRepository::find to return a User with name "Jane Doe"
        // Create UserService with stubbed repository
        // Assert getDisplayName(1) returns "Jane Doe"
    }
}`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;

class UserServiceTest extends TestCase {
    public function testGetDisplayName(): void {
        \\\$user = new User();
        \\\$user->name = 'Jane Doe';

        \\\$repo = \\\$this->createStub(UserRepository::class);
        \\\$repo->method('find')->willReturn(\\\$user);

        \\\$service = new UserService(\\\$repo);
        \\\$this->assertEquals('Jane Doe', \\\$service->getDisplayName(1));
    }
}`,
      hints: [
        'createStub() makes a stub without call expectations',
        'Use method()->willReturn() to define return values',
        'Stubs focus on return values, mocks verify interactions',
      ],
      concepts: ['stubs', 'test-doubles', 'dependency-injection'],
    },
    {
      id: 'php-testing-11',
      title: 'Exception Message Assertion',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a test that verifies both the exception type and message when dividing by zero.',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;

class DivisionTest extends TestCase {
    public function testDivideByZeroMessage(): void {
        // Expect InvalidArgumentException
        // Expect message "Division by zero"
        // Call divide(10, 0)
    }
}`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;

class DivisionTest extends TestCase {
    public function testDivideByZeroMessage(): void {
        \\\$this->expectException(InvalidArgumentException::class);
        \\\$this->expectExceptionMessage('Division by zero');
        \\\$calc = new Calculator();
        \\\$calc->divide(10, 0);
    }
}`,
      hints: [
        'expectException() checks the exception class',
        'expectExceptionMessage() checks the message',
        'Both must be called before the code that throws',
      ],
      concepts: ['exceptions', 'expectExceptionMessage'],
    },
    {
      id: 'php-testing-12',
      title: 'Consecutive Return Values',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a test that stubs a method to return different values on consecutive calls. The first call returns "first", second returns "second", third throws an exception.',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;

class QueueTest extends TestCase {
    public function testConsecutivePops(): void {
        // Stub QueueInterface::pop
        // First call returns "first"
        // Second call returns "second"
        // Third call throws RuntimeException
    }
}`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;

class QueueTest extends TestCase {
    public function testConsecutivePops(): void {
        \\\$queue = \\\$this->createStub(QueueInterface::class);
        \\\$queue->method('pop')
            ->willReturnOnConsecutiveCalls('first', 'second');

        \\\$this->assertEquals('first', \\\$queue->pop());
        \\\$this->assertEquals('second', \\\$queue->pop());
    }
}`,
      hints: [
        'Use willReturnOnConsecutiveCalls() for sequential return values',
        'Each call gets the next value in the list',
        'This is useful for testing iteration patterns',
      ],
      concepts: ['stubs', 'consecutive-returns'],
    },
    {
      id: 'php-testing-13',
      title: 'Fix Test Method Naming',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the tests that PHPUnit does not recognize as test methods.',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;

class StringTest extends TestCase {
    public function checkUppercase(): void {
        \\\$this->assertEquals('HELLO', strtoupper('hello'));
    }

    public function verifyTrim(): void {
        \\\$this->assertEquals('hi', trim('  hi  '));
    }
}
// PHPUnit reports: No tests found`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;

class StringTest extends TestCase {
    public function testUppercase(): void {
        \\\$this->assertEquals('HELLO', strtoupper('hello'));
    }

    public function testTrim(): void {
        \\\$this->assertEquals('hi', trim('  hi  '));
    }
}`,
      hints: [
        'PHPUnit identifies test methods by naming convention',
        'Test methods must start with the word "test"',
        'Rename checkUppercase to testUppercase, etc.',
      ],
      concepts: ['test-naming', 'PHPUnit-conventions'],
    },
    {
      id: 'php-testing-14',
      title: 'Fix Assertion Order',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the assertion that has expected and actual values swapped.',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;

class CalcTest extends TestCase {
    public function testAdd(): void {
        \\\$calc = new Calculator();
        \\\$result = \\\$calc->add(2, 3);
        // Bug: arguments are swapped
        \\\$this->assertEquals(\\\$result, 5);
    }
}`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;

class CalcTest extends TestCase {
    public function testAdd(): void {
        \\\$calc = new Calculator();
        \\\$result = \\\$calc->add(2, 3);
        \\\$this->assertEquals(5, \\\$result);
    }
}`,
      hints: [
        'assertEquals takes expected first, then actual',
        'Having them swapped gives confusing error messages',
        'Expected=5, actual=\$result',
      ],
      concepts: ['assertions', 'assertEquals', 'debugging'],
    },
    {
      id: 'php-testing-15',
      title: 'Fix Missing Exception Expectation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the test that should verify an exception is thrown but passes even when no exception occurs.',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;

class ValidationTest extends TestCase {
    public function testThrowsOnEmpty(): void {
        try {
            \\\$validator = new Validator();
            \\\$validator->validate('');
        } catch (InvalidArgumentException \\\$e) {
            \\\$this->assertTrue(true);
        }
        // Bug: test passes even if no exception is thrown
    }
}`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;

class ValidationTest extends TestCase {
    public function testThrowsOnEmpty(): void {
        \\\$this->expectException(InvalidArgumentException::class);
        \\\$validator = new Validator();
        \\\$validator->validate('');
    }
}`,
      hints: [
        'Using try-catch in tests can hide missing exceptions',
        'Use expectException() instead of try-catch',
        'PHPUnit automatically fails if the exception is not thrown',
      ],
      concepts: ['exceptions', 'expectException', 'test-patterns'],
    },
    {
      id: 'php-testing-16',
      title: 'Predict Test Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict how many tests will run with this data provider.',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;
use PHPUnit\\Framework\\Attributes\\DataProvider;

class MathTest extends TestCase {
    public static function mathProvider(): array {
        return [
            [2, 3, 5],
            [0, 0, 0],
            [-1, 1, 0],
            [100, -50, 50],
        ];
    }

    #[DataProvider('mathProvider')]
    public function testAdd(int \\\$a, int \\\$b, int \\\$expected): void {
        \\\$this->assertEquals(\\\$expected, \\\$a + \\\$b);
    }
}
// How many tests run?`,
      solution: `4`,
      hints: [
        'Each entry in the data provider runs the test once',
        'The provider has 4 entries',
        'So 4 tests will run',
      ],
      concepts: ['data-providers', 'test-count'],
    },
    {
      id: 'php-testing-17',
      title: 'Predict assertEquals vs assertSame',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict which assertion will fail: assertEquals or assertSame.',
      skeleton: `<?php
// assertEquals uses == (loose comparison)
// assertSame uses === (strict comparison)

\\\$a = '123';
\\\$b = 123;

// assertEquals('123', 123) -> ?
// assertSame('123', 123) -> ?
echo "assertEquals: pass\\n";
echo "assertSame: fail\\n";`,
      solution: `assertEquals: pass
assertSame: fail`,
      hints: [
        'assertEquals uses == which allows type coercion',
        'assertSame uses === which requires same type',
        '"123" == 123 is true, but "123" === 123 is false',
      ],
      concepts: ['assertEquals', 'assertSame', 'type-coercion'],
    },
    {
      id: 'php-testing-18',
      title: 'Predict Mock Call Verification',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Predict whether this mock test will pass or fail.',
      skeleton: `<?php
// Mock expects send() to be called once
// But the code calls send() twice
// \\\$mock->expects(\\\$this->once())->method('send');
// \\\$service->process(); // calls send() internally twice
echo "Test result: fail";`,
      solution: `Test result: fail`,
      hints: [
        'once() expects exactly one call',
        'If send() is called twice, the expectation fails',
        'Use atLeast(2) or exactly(2) for two calls',
      ],
      concepts: ['mocking', 'call-expectations'],
    },
    {
      id: 'php-testing-19',
      title: 'Refactor Duplicated Test Setup',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the duplicated object creation into a setUp method.',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;

class UserServiceTest extends TestCase {
    public function testCreateUser(): void {
        \\\$repo = new InMemoryUserRepository();
        \\\$service = new UserService(\\\$repo);
        \\\$user = \\\$service->create('Alice');
        \\\$this->assertEquals('Alice', \\\$user->name);
    }

    public function testFindUser(): void {
        \\\$repo = new InMemoryUserRepository();
        \\\$service = new UserService(\\\$repo);
        \\\$service->create('Bob');
        \\\$found = \\\$service->find('Bob');
        \\\$this->assertNotNull(\\\$found);
    }

    public function testDeleteUser(): void {
        \\\$repo = new InMemoryUserRepository();
        \\\$service = new UserService(\\\$repo);
        \\\$service->create('Charlie');
        \\\$service->delete('Charlie');
        \\\$this->assertNull(\\\$service->find('Charlie'));
    }
}`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;

class UserServiceTest extends TestCase {
    private UserService \\\$service;

    protected function setUp(): void {
        \\\$repo = new InMemoryUserRepository();
        \\\$this->service = new UserService(\\\$repo);
    }

    public function testCreateUser(): void {
        \\\$user = \\\$this->service->create('Alice');
        \\\$this->assertEquals('Alice', \\\$user->name);
    }

    public function testFindUser(): void {
        \\\$this->service->create('Bob');
        \\\$found = \\\$this->service->find('Bob');
        \\\$this->assertNotNull(\\\$found);
    }

    public function testDeleteUser(): void {
        \\\$this->service->create('Charlie');
        \\\$this->service->delete('Charlie');
        \\\$this->assertNull(\\\$this->service->find('Charlie'));
    }
}`,
      hints: [
        'Move repeated object creation to setUp()',
        'Store shared objects as class properties',
        'Each test gets a fresh instance from setUp',
      ],
      concepts: ['setUp', 'DRY', 'refactoring'],
    },
    {
      id: 'php-testing-20',
      title: 'Refactor to Use Data Provider',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the repetitive test methods into a single test with a data provider.',
      skeleton: `<?php
use PHPUnit\\Framework\\TestCase;

class StringUtilTest extends TestCase {
    public function testSlugifyHelloWorld(): void {
        \\\$this->assertEquals('hello-world', slugify('Hello World'));
    }

    public function testSlugifyPHP(): void {
        \\\$this->assertEquals('php-is-great', slugify('PHP is Great'));
    }

    public function testSlugifySpecialChars(): void {
        \\\$this->assertEquals('test-123', slugify('Test! @#123'));
    }

    public function testSlugifySpaces(): void {
        \\\$this->assertEquals('extra-spaces', slugify('  Extra   Spaces  '));
    }
}`,
      solution: `<?php
use PHPUnit\\Framework\\TestCase;
use PHPUnit\\Framework\\Attributes\\DataProvider;

class StringUtilTest extends TestCase {
    public static function slugifyProvider(): array {
        return [
            'hello world' => ['Hello World', 'hello-world'],
            'php phrase' => ['PHP is Great', 'php-is-great'],
            'special chars' => ['Test! @#123', 'test-123'],
            'extra spaces' => ['  Extra   Spaces  ', 'extra-spaces'],
        ];
    }

    #[DataProvider('slugifyProvider')]
    public function testSlugify(string \\\$input, string \\\$expected): void {
        \\\$this->assertEquals(\\\$expected, slugify(\\\$input));
    }
}`,
      hints: [
        'Create a static data provider method returning test cases',
        'Each case provides input and expected output',
        'Use named keys for readable test output',
      ],
      concepts: ['data-providers', 'DRY', 'refactoring'],
    },
  ],
};
