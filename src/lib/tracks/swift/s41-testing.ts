import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-testing',
  title: '41. Testing',
  explanation: `## Testing in Swift

Swift uses XCTest for unit testing, providing assertions, setup/teardown, and async test support.

### Basic Test Structure

\`\`\`swift
import XCTest

class MathTests: XCTestCase {
    func testAddition() {
        XCTAssertEqual(2 + 2, 4)
    }

    func testMultiplication() {
        XCTAssertEqual(3 * 4, 12, "3 times 4 should be 12")
    }
}
\`\`\`

### Common Assertions

\`\`\`swift
XCTAssertTrue(condition)
XCTAssertFalse(condition)
XCTAssertEqual(a, b)
XCTAssertNotEqual(a, b)
XCTAssertNil(value)
XCTAssertNotNil(value)
XCTAssertThrowsError(try expression)
XCTAssertNoThrow(try expression)
XCTAssertGreaterThan(a, b)
XCTAssertLessThan(a, b)
\`\`\`

### Setup and Teardown

\`\`\`swift
class DatabaseTests: XCTestCase {
    var db: Database!

    override func setUp() {
        super.setUp()
        db = Database(inMemory: true)
    }

    override func tearDown() {
        db = nil
        super.tearDown()
    }
}
\`\`\`

### Async Testing

\`\`\`swift
func testAsyncFetch() async throws {
    let result = try await fetchData()
    XCTAssertFalse(result.isEmpty)
}
\`\`\`
`,
  exercises: [
    {
      id: 'swift-testing-1',
      title: 'Write a Basic Test',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write a basic XCTest assertion.',
      skeleton: `import XCTest

class StringTests: XCTestCase {
    func testUppercase() {
        let result = "hello".uppercased()
        ___(result, "HELLO")
    }
}`,
      solution: `import XCTest

class StringTests: XCTestCase {
    func testUppercase() {
        let result = "hello".uppercased()
        XCTAssertEqual(result, "HELLO")
    }
}`,
      hints: [
        'Use an assertion to compare two values.',
        'XCTAssertEqual checks if two values are equal.',
        'The answer is XCTAssertEqual.',
      ],
      concepts: ['XCTAssertEqual', 'unit-test'],
    },
    {
      id: 'swift-testing-2',
      title: 'Assert True/False',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use boolean assertions.',
      skeleton: `func testBooleans() {
    let empty: [Int] = []
    let full = [1, 2, 3]

    ___(empty.isEmpty)
    ___(full.isEmpty)
}`,
      solution: `func testBooleans() {
    let empty: [Int] = []
    let full = [1, 2, 3]

    XCTAssertTrue(empty.isEmpty)
    XCTAssertFalse(full.isEmpty)
}`,
      hints: [
        'Use XCTAssertTrue for conditions that should be true.',
        'Use XCTAssertFalse for conditions that should be false.',
        'empty.isEmpty is true, full.isEmpty is false.',
      ],
      concepts: ['XCTAssertTrue', 'XCTAssertFalse'],
    },
    {
      id: 'swift-testing-3',
      title: 'Assert Nil/NotNil',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use nil assertions.',
      skeleton: `func testOptionals() {
    let dict = ["key": "value"]

    ___(dict["key"])
    ___(dict["missing"])
}`,
      solution: `func testOptionals() {
    let dict = ["key": "value"]

    XCTAssertNotNil(dict["key"])
    XCTAssertNil(dict["missing"])
}`,
      hints: [
        'dict["key"] exists, so it is not nil.',
        'dict["missing"] does not exist, so it is nil.',
        'Use XCTAssertNotNil and XCTAssertNil.',
      ],
      concepts: ['XCTAssertNil', 'XCTAssertNotNil'],
    },
    {
      id: 'swift-testing-4',
      title: 'Test setUp Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Override setUp to prepare test state.',
      skeleton: `class CalculatorTests: XCTestCase {
    var calculator: Calculator!

    override func ___() {
        super.setUp()
        calculator = Calculator()
    }

    override func ___() {
        calculator = nil
        super.tearDown()
    }

    func testAdd() {
        XCTAssertEqual(calculator.add(2, 3), 5)
    }
}`,
      solution: `class CalculatorTests: XCTestCase {
    var calculator: Calculator!

    override func setUp() {
        super.setUp()
        calculator = Calculator()
    }

    override func tearDown() {
        calculator = nil
        super.tearDown()
    }

    func testAdd() {
        XCTAssertEqual(calculator.add(2, 3), 5)
    }
}`,
      hints: [
        'setUp runs before each test method.',
        'tearDown runs after each test method.',
        'The methods are setUp() and tearDown().',
      ],
      concepts: ['setUp', 'tearDown', 'test-lifecycle'],
    },
    {
      id: 'swift-testing-5',
      title: 'Test Throwing Function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Assert that a function throws an error.',
      skeleton: `enum ValidationError: Error { case empty }

func validate(_ input: String) throws -> String {
    guard !input.isEmpty else { throw ValidationError.empty }
    return input
}

func testThrows() {
    ___ {
        try validate("")
    }
    ___ {
        try validate("hello")
    }
}`,
      solution: `enum ValidationError: Error { case empty }

func validate(_ input: String) throws -> String {
    guard !input.isEmpty else { throw ValidationError.empty }
    return input
}

func testThrows() {
    XCTAssertThrowsError {
        try validate("")
    }
    XCTAssertNoThrow {
        try validate("hello")
    }
}`,
      hints: [
        'Empty string should throw, non-empty should not.',
        'XCTAssertThrowsError expects a throw.',
        'XCTAssertNoThrow expects no throw.',
      ],
      concepts: ['XCTAssertThrowsError', 'XCTAssertNoThrow'],
    },
    {
      id: 'swift-testing-6',
      title: 'Async Test Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write an async test method.',
      skeleton: `func fetchUser() async -> String { return "Alice" }

class AsyncTests: XCTestCase {
    func testFetch() ___ ___ {
        let user = ___ fetchUser()
        XCTAssertEqual(user, "Alice")
    }
}`,
      solution: `func fetchUser() async -> String { return "Alice" }

class AsyncTests: XCTestCase {
    func testFetch() async throws {
        let user = await fetchUser()
        XCTAssertEqual(user, "Alice")
    }
}`,
      hints: [
        'Async test methods need async throws in their signature.',
        'Call async functions with await inside.',
        'The blanks are async throws and await.',
      ],
      concepts: ['async-testing', 'await'],
    },
    {
      id: 'swift-testing-7',
      title: 'Write a Complete Test Suite',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a full test class for a Stack data structure.',
      skeleton: `struct Stack<T> {
    private var elements: [T] = []
    var isEmpty: Bool { elements.isEmpty }
    var count: Int { elements.count }
    var peek: T? { elements.last }
    mutating func push(_ element: T) { elements.append(element) }
    mutating func pop() -> T? { elements.popLast() }
}

// Write StackTests: XCTestCase with tests for:
// - testEmpty, testPush, testPop, testPeek, testCount
`,
      solution: `import XCTest

class StackTests: XCTestCase {
    var stack: Stack<Int>!

    override func setUp() {
        super.setUp()
        stack = Stack<Int>()
    }

    func testEmpty() {
        XCTAssertTrue(stack.isEmpty)
        XCTAssertEqual(stack.count, 0)
    }

    func testPush() {
        stack.push(1)
        XCTAssertFalse(stack.isEmpty)
        XCTAssertEqual(stack.count, 1)
    }

    func testPop() {
        stack.push(1)
        stack.push(2)
        XCTAssertEqual(stack.pop(), 2)
        XCTAssertEqual(stack.pop(), 1)
        XCTAssertNil(stack.pop())
    }

    func testPeek() {
        XCTAssertNil(stack.peek)
        stack.push(42)
        XCTAssertEqual(stack.peek, 42)
        XCTAssertEqual(stack.count, 1)
    }

    func testCount() {
        for i in 1...5 { stack.push(i) }
        XCTAssertEqual(stack.count, 5)
    }
}`,
      hints: [
        'Use setUp to create a fresh stack for each test.',
        'Test both normal and edge cases.',
        'Verify pop on empty stack returns nil.',
      ],
      concepts: ['test-suite', 'setUp', 'comprehensive-testing'],
    },
    {
      id: 'swift-testing-8',
      title: 'Write Parameterized-Style Tests',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write tests that verify multiple inputs and outputs.',
      skeleton: `func isPalindrome(_ str: String) -> Bool {
    let cleaned = str.lowercased().filter { $0.isLetter }
    return cleaned == String(cleaned.reversed())
}

// Write PalindromeTests with:
// - testValidPalindromes (test at least 3 palindromes)
// - testInvalidPalindromes (test at least 3 non-palindromes)
// - testEdgeCases (empty string, single char, mixed case)
`,
      solution: `import XCTest

class PalindromeTests: XCTestCase {
    func testValidPalindromes() {
        let cases = ["racecar", "madam", "A man a plan a canal Panama"]
        for str in cases {
            XCTAssertTrue(isPalindrome(str), "\\(str) should be a palindrome")
        }
    }

    func testInvalidPalindromes() {
        let cases = ["hello", "swift", "testing"]
        for str in cases {
            XCTAssertFalse(isPalindrome(str), "\\(str) should not be a palindrome")
        }
    }

    func testEdgeCases() {
        XCTAssertTrue(isPalindrome(""))
        XCTAssertTrue(isPalindrome("a"))
        XCTAssertTrue(isPalindrome("Aa"))
    }
}`,
      hints: [
        'Loop over test cases with descriptive failure messages.',
        'Include a message parameter in assertions for clarity.',
        'Edge cases: empty, single char, mixed case.',
      ],
      concepts: ['parameterized-tests', 'edge-cases'],
    },
    {
      id: 'swift-testing-9',
      title: 'Write Error-Specific Test',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a test that verifies the specific error thrown.',
      skeleton: `enum AppError: Error, Equatable {
    case notFound
    case unauthorized
    case invalid(String)
}

func fetchItem(id: Int) throws -> String {
    guard id > 0 else { throw AppError.invalid("ID must be positive") }
    guard id < 100 else { throw AppError.notFound }
    return "Item \\(id)"
}

// Write tests that verify specific errors are thrown
`,
      solution: `import XCTest

class ErrorTests: XCTestCase {
    func testInvalidIdThrows() {
        XCTAssertThrowsError(try fetchItem(id: -1)) { error in
            guard case AppError.invalid(let msg) = error else {
                XCTFail("Expected AppError.invalid, got \\(error)")
                return
            }
            XCTAssertEqual(msg, "ID must be positive")
        }
    }

    func testNotFoundThrows() {
        XCTAssertThrowsError(try fetchItem(id: 200)) { error in
            XCTAssertEqual(error as? AppError, AppError.notFound)
        }
    }

    func testValidIdSucceeds() {
        XCTAssertNoThrow(try fetchItem(id: 50))
        XCTAssertEqual(try? fetchItem(id: 1), "Item 1")
    }
}`,
      hints: [
        'XCTAssertThrowsError has a closure to inspect the error.',
        'Use pattern matching to verify the specific error case.',
        'Test both the error type and any associated values.',
      ],
      concepts: ['error-testing', 'XCTAssertThrowsError'],
    },
    {
      id: 'swift-testing-10',
      title: 'Write Performance Test',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a performance test using measure.',
      skeleton: `// Write a test that measures the performance of sorting
// a large array using XCTestCase's measure method
`,
      solution: `import XCTest

class PerformanceTests: XCTestCase {
    func testSortPerformance() {
        let array = (0..<10000).map { _ in Int.random(in: 0...10000) }
        measure {
            _ = array.sorted()
        }
    }

    func testSearchPerformance() {
        let array = Array(0..<10000)
        measure {
            _ = array.contains(9999)
        }
    }
}`,
      hints: [
        'measure { } runs the block multiple times and reports timing.',
        'Create test data outside measure to only measure the operation.',
        'XCTest automatically sets performance baselines.',
      ],
      concepts: ['performance-testing', 'measure'],
    },
    {
      id: 'swift-testing-11',
      title: 'Write Async Test with Expectation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a test using XCTestExpectation for callback-based APIs.',
      skeleton: `// Write a test that uses XCTestExpectation to test
// a callback-based async function:
func fetchData(callback: @escaping (String) -> Void) {
    DispatchQueue.global().async {
        callback("result")
    }
}
`,
      solution: `import XCTest

class ExpectationTests: XCTestCase {
    func testCallbackFetch() {
        let expectation = expectation(description: "Fetch completes")

        fetchData { result in
            XCTAssertEqual(result, "result")
            expectation.fulfill()
        }

        waitForExpectations(timeout: 5)
    }
}`,
      hints: [
        'Create an expectation with a description.',
        'Call fulfill() in the callback.',
        'Wait with waitForExpectations(timeout:).',
      ],
      concepts: ['XCTestExpectation', 'async-callback-testing'],
    },
    {
      id: 'swift-testing-12',
      title: 'Write a Mock for Testing',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a mock object for dependency injection in tests.',
      skeleton: `protocol NetworkService {
    func fetch(url: String) async throws -> Data
}

class UserLoader {
    let service: NetworkService
    init(service: NetworkService) { self.service = service }
    func loadUser() async throws -> String {
        let data = try await service.fetch(url: "/user")
        return String(data: data, encoding: .utf8) ?? ""
    }
}

// Write a MockNetworkService and test UserLoader
`,
      solution: `class MockNetworkService: NetworkService {
    var mockData: Data = Data()
    var shouldThrow: Error?
    var fetchCallCount = 0
    var lastURL: String?

    func fetch(url: String) async throws -> Data {
        fetchCallCount += 1
        lastURL = url
        if let error = shouldThrow { throw error }
        return mockData
    }
}

class UserLoaderTests: XCTestCase {
    func testLoadUser() async throws {
        let mock = MockNetworkService()
        mock.mockData = "Alice".data(using: .utf8)!
        let loader = UserLoader(service: mock)
        let user = try await loader.loadUser()
        XCTAssertEqual(user, "Alice")
        XCTAssertEqual(mock.fetchCallCount, 1)
        XCTAssertEqual(mock.lastURL, "/user")
    }
}`,
      hints: [
        'Mock stores predefined responses.',
        'Track call count and arguments for verification.',
        'Inject the mock into the class under test.',
      ],
      concepts: ['mock-object', 'dependency-injection', 'test-doubles'],
    },
    {
      id: 'swift-testing-13',
      title: 'Fix Test Not Running',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the test method that XCTest does not discover.',
      skeleton: `import XCTest

class MyTests: XCTestCase {
    func addition() {
        XCTAssertEqual(1 + 1, 2)
    }

    func subtraction() {
        XCTAssertEqual(5 - 3, 2)
    }
}`,
      solution: `import XCTest

class MyTests: XCTestCase {
    func testAddition() {
        XCTAssertEqual(1 + 1, 2)
    }

    func testSubtraction() {
        XCTAssertEqual(5 - 3, 2)
    }
}`,
      hints: [
        'XCTest discovers methods by name prefix.',
        'Test methods must start with "test".',
        'Rename addition to testAddition.',
      ],
      concepts: ['test-discovery', 'naming-convention'],
    },
    {
      id: 'swift-testing-14',
      title: 'Fix Wrong Assertion',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the test that uses the wrong assertion method.',
      skeleton: `func testOptionalValue() {
    let result: String? = "hello"

    XCTAssertTrue(result)
    XCTAssertEqual(result, "hello")
}`,
      solution: `func testOptionalValue() {
    let result: String? = "hello"

    XCTAssertNotNil(result)
    XCTAssertEqual(result, "hello")
}`,
      hints: [
        'XCTAssertTrue expects a Bool, not an Optional.',
        'Use XCTAssertNotNil to check for non-nil.',
        'Change XCTAssertTrue to XCTAssertNotNil.',
      ],
      concepts: ['assertion-types', 'optional-testing'],
    },
    {
      id: 'swift-testing-15',
      title: 'Fix Flaky Async Test',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Fix an async test that sometimes fails due to timing.',
      skeleton: `class FlakyTests: XCTestCase {
    func testAsyncOperation() {
        var result = ""
        DispatchQueue.global().async {
            result = "done"
        }
        XCTAssertEqual(result, "done")
    }
}`,
      solution: `class FlakyTests: XCTestCase {
    func testAsyncOperation() {
        let exp = expectation(description: "Operation completes")
        var result = ""
        DispatchQueue.global().async {
            result = "done"
            exp.fulfill()
        }
        waitForExpectations(timeout: 5)
        XCTAssertEqual(result, "done")
    }
}`,
      hints: [
        'The assertion runs before the async block completes.',
        'Use XCTestExpectation to wait for completion.',
        'Assert after waitForExpectations.',
      ],
      concepts: ['flaky-test', 'XCTestExpectation', 'race-condition'],
    },
    {
      id: 'swift-testing-16',
      title: 'Predict Test Result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict whether a test assertion passes or fails.',
      skeleton: `func testArrayOps() {
    var arr = [1, 2, 3]
    arr.append(4)
    arr.remove(at: 0)
    // Does XCTAssertEqual(arr, [2, 3, 4]) pass or fail?
}`,
      solution: `pass`,
      hints: [
        'Start: [1, 2, 3]. Append 4: [1, 2, 3, 4].',
        'Remove at 0: [2, 3, 4].',
        'This equals [2, 3, 4], so the test passes.',
      ],
      concepts: ['array-operations', 'test-prediction'],
    },
    {
      id: 'swift-testing-17',
      title: 'Predict setUp/tearDown Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the execution order of setUp, tearDown, and test methods.',
      skeleton: `class OrderTests: XCTestCase {
    override func setUp() { print("S") }
    override func tearDown() { print("T") }
    func testA() { print("A") }
    func testB() { print("B") }
}
// What is the output when running both tests?`,
      solution: `S
A
T
S
B
T`,
      hints: [
        'setUp runs before EACH test method.',
        'tearDown runs after EACH test method.',
        'Tests run in alphabetical order.',
      ],
      concepts: ['setUp', 'tearDown', 'execution-order'],
    },
    {
      id: 'swift-testing-18',
      title: 'Predict Assertion Message',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict which assertion will fail.',
      skeleton: `func testAssertions() {
    XCTAssertEqual(2 + 2, 4)       // 1
    XCTAssertTrue("hello".isEmpty)  // 2
    XCTAssertNil(Optional<Int>.none) // 3
    XCTAssertGreaterThan(5, 10)     // 4
}
// Which assertions fail? List numbers.`,
      solution: `2,4`,
      hints: [
        '2 + 2 == 4 is true, passes.',
        '"hello".isEmpty is false, fails.',
        'nil is nil, passes. 5 > 10 is false, fails.',
      ],
      concepts: ['assertion-evaluation'],
    },
    {
      id: 'swift-testing-19',
      title: 'Refactor Test Duplication',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor duplicated test setup into helper methods.',
      skeleton: `class UserTests: XCTestCase {
    func testAdminAccess() {
        let user = User(name: "Admin", role: "admin", active: true)
        let permissions = PermissionService()
        let access = permissions.check(user)
        XCTAssertTrue(access.canEdit)
        XCTAssertTrue(access.canDelete)
    }

    func testUserAccess() {
        let user = User(name: "User", role: "user", active: true)
        let permissions = PermissionService()
        let access = permissions.check(user)
        XCTAssertTrue(access.canEdit)
        XCTAssertFalse(access.canDelete)
    }

    func testInactiveAccess() {
        let user = User(name: "Inactive", role: "admin", active: false)
        let permissions = PermissionService()
        let access = permissions.check(user)
        XCTAssertFalse(access.canEdit)
        XCTAssertFalse(access.canDelete)
    }
}`,
      solution: `class UserTests: XCTestCase {
    var permissions: PermissionService!

    override func setUp() {
        super.setUp()
        permissions = PermissionService()
    }

    private func makeUser(name: String, role: String, active: Bool = true) -> User {
        User(name: name, role: role, active: active)
    }

    func testAdminAccess() {
        let access = permissions.check(makeUser(name: "Admin", role: "admin"))
        XCTAssertTrue(access.canEdit)
        XCTAssertTrue(access.canDelete)
    }

    func testUserAccess() {
        let access = permissions.check(makeUser(name: "User", role: "user"))
        XCTAssertTrue(access.canEdit)
        XCTAssertFalse(access.canDelete)
    }

    func testInactiveAccess() {
        let access = permissions.check(makeUser(name: "Inactive", role: "admin", active: false))
        XCTAssertFalse(access.canEdit)
        XCTAssertFalse(access.canDelete)
    }
}`,
      hints: [
        'Move PermissionService creation to setUp.',
        'Create a helper method for User creation.',
        'Use default parameter values for common defaults.',
      ],
      concepts: ['test-helpers', 'DRY', 'setUp'],
    },
    {
      id: 'swift-testing-20',
      title: 'Refactor to Protocol-Based Testing',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Refactor tests to use protocol-based dependency injection.',
      skeleton: `class WeatherService {
    func getTemp() -> Double { /* network call */ return 72.0 }
}

class WeatherApp {
    let service = WeatherService()

    func displayTemp() -> String {
        let temp = service.getTemp()
        return "\\(temp)F"
    }
}

class WeatherTests: XCTestCase {
    func testDisplay() {
        let app = WeatherApp()
        // Can't control what getTemp returns!
        let display = app.displayTemp()
        XCTAssertTrue(display.hasSuffix("F"))
    }
}`,
      solution: `protocol WeatherProvider {
    func getTemp() -> Double
}

class WeatherService: WeatherProvider {
    func getTemp() -> Double { return 72.0 }
}

class WeatherApp {
    let service: WeatherProvider
    init(service: WeatherProvider) { self.service = service }
    func displayTemp() -> String { "\\(service.getTemp())F" }
}

class MockWeather: WeatherProvider {
    var temp: Double = 0
    func getTemp() -> Double { return temp }
}

class WeatherTests: XCTestCase {
    func testDisplay() {
        let mock = MockWeather()
        mock.temp = 98.6
        let app = WeatherApp(service: mock)
        XCTAssertEqual(app.displayTemp(), "98.6F")
    }
}`,
      hints: [
        'Extract a protocol for the service.',
        'Inject the service via init.',
        'Create a mock that implements the protocol.',
      ],
      concepts: ['protocol-based-testing', 'dependency-injection', 'mocking'],
    },
  ],
};
