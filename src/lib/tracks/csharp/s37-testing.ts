import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-testing',
  title: '37. Testing with xUnit',
  explanation: `## Testing with xUnit

xUnit is the most popular testing framework for .NET. Tests are methods decorated with attributes.

\`\`\`csharp
public class CalculatorTests
{
    [Fact]
    public void Add_ReturnsSum()
    {
        var calc = new Calculator();
        Assert.Equal(5, calc.Add(2, 3));
    }

    [Theory]
    [InlineData(1, 1, 2)]
    [InlineData(0, 0, 0)]
    [InlineData(-1, 1, 0)]
    public void Add_WithVariousInputs(int a, int b, int expected)
    {
        var calc = new Calculator();
        Assert.Equal(expected, calc.Add(a, b));
    }
}
\`\`\`

### Assertions

\`\`\`csharp
Assert.Equal(expected, actual);
Assert.True(condition);
Assert.Null(value);
Assert.Throws<ArgumentException>(() => Foo());
Assert.Contains("error", message);
Assert.Empty(collection);
\`\`\`

### Mocking with Moq

\`\`\`csharp
var mock = new Mock<IEmailService>();
mock.Setup(e => e.Send(It.IsAny<string>())).Returns(true);
var service = new OrderService(mock.Object);
service.Process();
mock.Verify(e => e.Send(It.IsAny<string>()), Times.Once);
\`\`\`

Use \`[Fact]\` for single test cases and \`[Theory]\` for parameterized tests. Arrange-Act-Assert is the standard pattern.`,
  exercises: [
    {
      id: 'cs-test-1',
      title: 'Fact Test',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Decorate a test method with the xUnit Fact attribute.',
      skeleton: `[__BLANK__]
public void Add_ReturnsCorrectSum()
{
    Assert.Equal(4, new Calculator().Add(2, 2));
}`,
      solution: `[Fact]
public void Add_ReturnsCorrectSum()
{
    Assert.Equal(4, new Calculator().Add(2, 2));
}`,
      hints: ['This attribute marks a single test case.', 'It is the simplest xUnit test attribute.', 'The answer is: Fact'],
      concepts: ['Fact', 'xUnit test method'],
    },
    {
      id: 'cs-test-2',
      title: 'Assert.Equal',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Assert that two values are equal.',
      skeleton: `[Fact]
public void Name_IsCorrect()
{
    var user = new User("Alice");
    Assert.__BLANK__("Alice", user.Name);
}`,
      solution: `[Fact]
public void Name_IsCorrect()
{
    var user = new User("Alice");
    Assert.Equal("Alice", user.Name);
}`,
      hints: ['The first argument is the expected value.', 'The second is the actual value.', 'The answer is: Equal'],
      concepts: ['Assert.Equal', 'equality assertion'],
    },
    {
      id: 'cs-test-3',
      title: 'Theory with InlineData',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create a parameterized test with inline data.',
      skeleton: `[__BLANK__]
[InlineData(2, 3, 5)]
[InlineData(0, 0, 0)]
[InlineData(-1, 1, 0)]
public void Add_Theory(int a, int b, int expected)
{
    Assert.Equal(expected, new Calculator().Add(a, b));
}`,
      solution: `[Theory]
[InlineData(2, 3, 5)]
[InlineData(0, 0, 0)]
[InlineData(-1, 1, 0)]
public void Add_Theory(int a, int b, int expected)
{
    Assert.Equal(expected, new Calculator().Add(a, b));
}`,
      hints: ['This attribute marks a data-driven test.', 'It runs once per InlineData set.', 'The answer is: Theory'],
      concepts: ['Theory', 'InlineData', 'parameterized tests'],
    },
    {
      id: 'cs-test-4',
      title: 'Assert.Throws',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Assert that a method throws a specific exception.',
      skeleton: `[Fact]
public void Divide_ByZero_Throws()
{
    var calc = new Calculator();
    Assert.__BLANK__<DivideByZeroException>(() => calc.Divide(1, 0));
}`,
      solution: `[Fact]
public void Divide_ByZero_Throws()
{
    var calc = new Calculator();
    Assert.Throws<DivideByZeroException>(() => calc.Divide(1, 0));
}`,
      hints: ['This assertion expects a specific exception type.', 'It takes a lambda that should throw.', 'The answer is: Throws'],
      concepts: ['Assert.Throws', 'exception testing'],
    },
    {
      id: 'cs-test-5',
      title: 'Assert.Contains',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Assert that a string contains a substring.',
      skeleton: `[Fact]
public void Error_ContainsMessage()
{
    var ex = Assert.Throws<Exception>(() => Validate(null));
    Assert.__BLANK__("cannot be null", ex.Message);
}`,
      solution: `[Fact]
public void Error_ContainsMessage()
{
    var ex = Assert.Throws<Exception>(() => Validate(null));
    Assert.Contains("cannot be null", ex.Message);
}`,
      hints: ['This checks if a substring exists in a string.', 'First argument is the expected substring.', 'The answer is: Contains'],
      concepts: ['Assert.Contains', 'substring assertion'],
    },
    {
      id: 'cs-test-6',
      title: 'Assert.Collection',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Assert on each element of a collection in order.',
      skeleton: `[Fact]
public void GetUsers_ReturnsThree()
{
    var users = GetUsers();
    Assert.__BLANK__(users,
        u => Assert.Equal("Alice", u.Name),
        u => Assert.Equal("Bob", u.Name),
        u => Assert.Equal("Charlie", u.Name));
}`,
      solution: `[Fact]
public void GetUsers_ReturnsThree()
{
    var users = GetUsers();
    Assert.Collection(users,
        u => Assert.Equal("Alice", u.Name),
        u => Assert.Equal("Bob", u.Name),
        u => Assert.Equal("Charlie", u.Name));
}`,
      hints: ['This assertion validates each element with a delegate.', 'It also verifies the count matches the number of delegates.', 'The answer is: Collection'],
      concepts: ['Assert.Collection', 'ordered collection assertion'],
    },
    {
      id: 'cs-test-7',
      title: 'Complete Test Class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a complete test class for a StringHelper.Reverse method.',
      skeleton: `public class StringHelperTests
{
    // Test 1: Reverse("hello") should return "olleh"
    // Test 2: Reverse("") should return ""
    // Test 3: Reverse(null) should throw ArgumentNullException
}`,
      solution: `public class StringHelperTests
{
    [Fact]
    public void Reverse_ReturnsReversedString()
    {
        Assert.Equal("olleh", StringHelper.Reverse("hello"));
    }

    [Fact]
    public void Reverse_EmptyString_ReturnsEmpty()
    {
        Assert.Equal("", StringHelper.Reverse(""));
    }

    [Fact]
    public void Reverse_Null_ThrowsArgumentNullException()
    {
        Assert.Throws<ArgumentNullException>(() => StringHelper.Reverse(null!));
    }
}`,
      hints: ['Each test method gets a [Fact] attribute.', 'Use descriptive method names following the pattern: Method_Condition_Expected.', 'Assert.Throws for the null case.'],
      concepts: ['test class structure', 'Fact', 'naming conventions'],
    },
    {
      id: 'cs-test-8',
      title: 'Theory with MemberData',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create a Theory test using MemberData for complex test cases.',
      skeleton: `public class MathTests
{
    // Create a static property that provides test data
    // Write a Theory test for IsPrime that tests: 2=true, 3=true, 4=false, 7=true, 9=false
}`,
      solution: `public class MathTests
{
    public static IEnumerable<object[]> PrimeData =>
        new List<object[]>
        {
            new object[] { 2, true },
            new object[] { 3, true },
            new object[] { 4, false },
            new object[] { 7, true },
            new object[] { 9, false },
        };

    [Theory]
    [MemberData(nameof(PrimeData))]
    public void IsPrime_ReturnsExpected(int number, bool expected)
    {
        Assert.Equal(expected, MathHelper.IsPrime(number));
    }
}`,
      hints: ['MemberData references a static property or method.', 'The property returns IEnumerable<object[]>.', 'Each array maps to the method parameters.'],
      concepts: ['MemberData', 'complex test data', 'Theory'],
    },
    {
      id: 'cs-test-9',
      title: 'Test with Mock',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a test that mocks an IEmailService dependency.',
      skeleton: `[Fact]
public void PlaceOrder_SendsConfirmationEmail()
{
    // Arrange: mock IEmailService, create OrderService
    // Act: call PlaceOrder("item-1")
    // Assert: verify Send was called once with any string
}`,
      solution: `[Fact]
public void PlaceOrder_SendsConfirmationEmail()
{
    var mockEmail = new Mock<IEmailService>();
    mockEmail.Setup(e => e.Send(It.IsAny<string>())).Returns(true);
    var service = new OrderService(mockEmail.Object);

    service.PlaceOrder("item-1");

    mockEmail.Verify(e => e.Send(It.IsAny<string>()), Times.Once);
}`,
      hints: ['Use new Mock<IEmailService>() to create a mock.', 'Setup defines behavior, Verify checks calls.', 'Pass mock.Object as the dependency.'],
      concepts: ['Mock', 'Setup', 'Verify', 'Times.Once'],
    },
    {
      id: 'cs-test-10',
      title: 'Async Test',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write an async test that tests an async method.',
      skeleton: `// Test that UserService.GetByIdAsync(1) returns a user with name "Alice"
// Test that GetByIdAsync(999) throws KeyNotFoundException`,
      solution: `[Fact]
public async Task GetByIdAsync_ExistingUser_ReturnsUser()
{
    var service = new UserService();
    var user = await service.GetByIdAsync(1);
    Assert.Equal("Alice", user.Name);
}

[Fact]
public async Task GetByIdAsync_NonExistent_Throws()
{
    var service = new UserService();
    await Assert.ThrowsAsync<KeyNotFoundException>(
        () => service.GetByIdAsync(999));
}`,
      hints: ['Async tests return Task and use async/await.', 'Use Assert.ThrowsAsync for async exception testing.', 'xUnit handles Task-returning test methods automatically.'],
      concepts: ['async tests', 'ThrowsAsync', 'Task return'],
    },
    {
      id: 'cs-test-11',
      title: 'Test Fixture Setup',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Create a test class that shares expensive setup using IClassFixture.',
      skeleton: `// Create a DatabaseFixture and a test class that uses it
// DatabaseFixture should initialize a connection string
// Tests should use the shared fixture`,
      solution: `public class DatabaseFixture : IDisposable
{
    public string ConnectionString { get; }

    public DatabaseFixture()
    {
        ConnectionString = "Server=test;Database=testdb";
    }

    public void Dispose()
    {
        // cleanup
    }
}

public class DatabaseTests : IClassFixture<DatabaseFixture>
{
    private readonly DatabaseFixture _fixture;

    public DatabaseTests(DatabaseFixture fixture)
    {
        _fixture = fixture;
    }

    [Fact]
    public void Connection_IsValid()
    {
        Assert.Contains("testdb", _fixture.ConnectionString);
    }
}`,
      hints: ['IClassFixture<T> shares one instance across all tests in the class.', 'The fixture is injected via the test class constructor.', 'Implement IDisposable for cleanup.'],
      concepts: ['IClassFixture', 'test fixtures', 'shared setup'],
    },
    {
      id: 'cs-test-12',
      title: 'Custom Assertion',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Create a custom assertion helper for domain validation.',
      skeleton: `static class CustomAssert
{
    // Assert that a User is valid: non-null, non-empty name, age > 0
    public static void IsValidUser(User user)
    {
        // Multiple assertions with clear messages
    }
}`,
      solution: `static class CustomAssert
{
    public static void IsValidUser(User user)
    {
        Assert.NotNull(user);
        Assert.False(string.IsNullOrWhiteSpace(user.Name),
            "User name should not be empty");
        Assert.True(user.Age > 0,
            $"User age should be positive, was {user.Age}");
    }
}`,
      hints: ['Combine multiple Assert calls for domain logic.', 'Use message overloads for clear failure messages.', 'Custom assertions improve test readability.'],
      concepts: ['custom assertions', 'Assert messages', 'domain validation'],
    },
    {
      id: 'cs-test-13',
      title: 'Missing Fact Attribute Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the test that is never discovered by the test runner.',
      skeleton: `public class MathTests
{
    // Bug: missing attribute, test runner ignores this method
    public void Add_Works()
    {
        Assert.Equal(5, Calculator.Add(2, 3));
    }
}`,
      solution: `public class MathTests
{
    [Fact]
    public void Add_Works()
    {
        Assert.Equal(5, Calculator.Add(2, 3));
    }
}`,
      hints: ['xUnit discovers tests by their attributes.', 'Without [Fact] or [Theory], the method is not a test.', 'Add the [Fact] attribute.'],
      concepts: ['Fact', 'test discovery'],
    },
    {
      id: 'cs-test-14',
      title: 'Assert.Equal Argument Order Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the reversed Assert.Equal arguments.',
      skeleton: `[Fact]
public void GetName_ReturnsAlice()
{
    var user = new User("Alice");
    // Bug: arguments are reversed -- actual first, expected second
    Assert.Equal(user.Name, "Alice");
}`,
      solution: `[Fact]
public void GetName_ReturnsAlice()
{
    var user = new User("Alice");
    Assert.Equal("Alice", user.Name);
}`,
      hints: ['Assert.Equal(expected, actual) -- expected comes first.', 'Reversing them gives confusing failure messages.', 'Put the literal/known value first.'],
      concepts: ['Assert.Equal', 'argument order', 'expected vs actual'],
    },
    {
      id: 'cs-test-15',
      title: 'Async Void Test Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the async test that always passes even when it should fail.',
      skeleton: `[Fact]
public async void GetUser_ThrowsOnInvalidId()
{
    // Bug: async void -- test runner cannot observe exceptions
    var service = new UserService();
    await Assert.ThrowsAsync<Exception>(() => service.GetByIdAsync(-1));
}`,
      solution: `[Fact]
public async Task GetUser_ThrowsOnInvalidId()
{
    var service = new UserService();
    await Assert.ThrowsAsync<Exception>(() => service.GetByIdAsync(-1));
}`,
      hints: ['async void tests fire and forget.', 'The test runner cannot await void methods.', 'Change the return type to Task.'],
      concepts: ['async void', 'async Task', 'test runner await'],
    },
    {
      id: 'cs-test-16',
      title: 'Predict Assert.Equal Float',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict whether floating-point assertion passes.',
      skeleton: `// Does this test pass or fail?
[Fact]
public void FloatingPoint()
{
    double result = 0.1 + 0.2;
    Assert.Equal(0.3, result);
}
// A) Passes
// B) Fails`,
      solution: `B) Fails`,
      hints: ['0.1 + 0.2 is not exactly 0.3 in floating point.', 'Assert.Equal for doubles uses exact comparison by default.', 'Use the precision overload: Assert.Equal(0.3, result, 10).'],
      concepts: ['floating-point precision', 'Assert.Equal double', 'precision parameter'],
    },
    {
      id: 'cs-test-17',
      title: 'Predict Theory Runs',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict how many times a Theory test executes.',
      skeleton: `[Theory]
[InlineData(1)]
[InlineData(2)]
[InlineData(3)]
[InlineData(4)]
public void IsEven(int n)
{
    Assert.True(n % 2 == 0);
}
// How many test runs? How many pass?`,
      solution: `4 runs, 2 pass (2 and 4), 2 fail (1 and 3)`,
      hints: ['Each InlineData creates one test run.', '4 InlineData attributes = 4 runs.', 'Only even numbers (2, 4) pass the assertion.'],
      concepts: ['Theory execution', 'InlineData count', 'test results'],
    },
    {
      id: 'cs-test-18',
      title: 'Predict Mock Verify',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict whether Mock.Verify passes or throws.',
      skeleton: `var mock = new Mock<ILogger>();
var service = new Service(mock.Object);
service.DoWork();
service.DoWork();
mock.Verify(l => l.Log(It.IsAny<string>()), Times.Once);
// A) Passes
// B) Throws MockException`,
      solution: `B) Throws MockException`,
      hints: ['DoWork is called twice, so Log is called twice.', 'Times.Once expects exactly one call.', 'Use Times.Exactly(2) or Times.AtLeastOnce for this scenario.'],
      concepts: ['Mock.Verify', 'Times.Once', 'call count verification'],
    },
    {
      id: 'cs-test-19',
      title: 'Refactor Repeated Arrange',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor repeated test setup into a constructor.',
      skeleton: `public class OrderServiceTests
{
    [Fact]
    public void PlaceOrder_Works()
    {
        var mockEmail = new Mock<IEmailService>();
        var mockDb = new Mock<IDatabase>();
        var service = new OrderService(mockEmail.Object, mockDb.Object);
        service.PlaceOrder("item-1");
        mockDb.Verify(d => d.Save(It.IsAny<Order>()), Times.Once);
    }

    [Fact]
    public void CancelOrder_Works()
    {
        var mockEmail = new Mock<IEmailService>();
        var mockDb = new Mock<IDatabase>();
        var service = new OrderService(mockEmail.Object, mockDb.Object);
        service.CancelOrder("order-1");
        mockEmail.Verify(e => e.Send(It.IsAny<string>()), Times.Once);
    }
}`,
      solution: `public class OrderServiceTests
{
    private readonly Mock<IEmailService> _mockEmail;
    private readonly Mock<IDatabase> _mockDb;
    private readonly OrderService _service;

    public OrderServiceTests()
    {
        _mockEmail = new Mock<IEmailService>();
        _mockDb = new Mock<IDatabase>();
        _service = new OrderService(_mockEmail.Object, _mockDb.Object);
    }

    [Fact]
    public void PlaceOrder_Works()
    {
        _service.PlaceOrder("item-1");
        _mockDb.Verify(d => d.Save(It.IsAny<Order>()), Times.Once);
    }

    [Fact]
    public void CancelOrder_Works()
    {
        _service.CancelOrder("order-1");
        _mockEmail.Verify(e => e.Send(It.IsAny<string>()), Times.Once);
    }
}`,
      hints: ['xUnit creates a new instance per test, so the constructor runs each time.', 'Move shared mock setup to the constructor.', 'Store mocks and service as fields.'],
      concepts: ['test constructor', 'shared setup', 'DRY tests'],
    },
    {
      id: 'cs-test-20',
      title: 'Refactor to Fluent Assertions',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor standard Assert calls to FluentAssertions style.',
      skeleton: `[Fact]
public void User_Validation()
{
    var user = CreateUser();
    Assert.NotNull(user);
    Assert.Equal("Alice", user.Name);
    Assert.True(user.Age > 0);
    Assert.Contains("admin", user.Roles);
    Assert.Equal(3, user.Roles.Count);
}`,
      solution: `[Fact]
public void User_Validation()
{
    var user = CreateUser();
    user.Should().NotBeNull();
    user.Name.Should().Be("Alice");
    user.Age.Should().BePositive();
    user.Roles.Should().Contain("admin")
        .And.HaveCount(3);
}`,
      hints: ['FluentAssertions uses .Should() extension methods.', 'Assert.Equal becomes .Should().Be().', 'Chain assertions with .And for readability.'],
      concepts: ['FluentAssertions', 'Should', 'fluent API', 'readable tests'],
    },
  ],
};
