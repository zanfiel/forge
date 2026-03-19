import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-testing',
  title: '40. Testing',
  explanation: `## Testing

Python provides robust testing tools -- from the built-in \`assert\` statement to the \`unittest\` module and the popular \`pytest\` framework.

### Assert Statement
\`\`\`python
assert 2 + 2 == 4
assert len([1, 2]) == 2, "Expected length 2"
\`\`\`

### unittest Module
\`\`\`python
import unittest

class TestMath(unittest.TestCase):
    def test_addition(self):
        self.assertEqual(2 + 2, 4)

    def test_subtraction(self):
        self.assertTrue(5 - 3 > 0)
\`\`\`

### Common Assertions
- **assertEqual(a, b)** -- a == b
- **assertTrue(x)** / **assertFalse(x)** -- bool checks
- **assertRaises(Error)** -- exception expected
- **assertIn(a, b)** -- a in b
- **assertIsNone(x)** -- x is None
- **assertAlmostEqual(a, b)** -- float comparison

### setUp and tearDown
- **setUp()** -- runs before each test method
- **tearDown()** -- runs after each test method
- **setUpClass()** / **tearDownClass()** -- once per class

### Mocking
\`\`\`python
from unittest.mock import Mock, patch, MagicMock

mock = Mock(return_value=42)
mock()  # returns 42
mock.assert_called_once()
\`\`\`

### pytest
- Simpler syntax -- just use plain assert
- Automatic test discovery (files named test_*.py)
- Powerful fixtures with @pytest.fixture
- Parameterized tests with @pytest.mark.parametrize
`,
  exercises: [
    {
      id: 'py-test-1',
      title: 'Basic assert',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use the assert statement to verify a condition.',
      skeleton: `def add(a, b):
    return a + b

result = add(2, 3)
__BLANK__ result == 5`,
      solution: `def add(a, b):
    return a + b

result = add(2, 3)
assert result == 5`,
      hints: [
        'Python has a built-in statement for checking conditions.',
        'It raises AssertionError if the condition is False.',
        'The answer is: assert',
      ],
      concepts: ['assert', 'assertion'],
    },
    {
      id: 'py-test-2',
      title: 'assertEqual in unittest',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use assertEqual to check two values are equal.',
      skeleton: `import unittest

class TestAdd(unittest.TestCase):
    def test_add(self):
        self.__BLANK__(1 + 1, 2)

if __name__ == "__main__":
    unittest.main()`,
      solution: `import unittest

class TestAdd(unittest.TestCase):
    def test_add(self):
        self.assertEqual(1 + 1, 2)

if __name__ == "__main__":
    unittest.main()`,
      hints: [
        'TestCase provides methods for assertions.',
        'This method checks if two values are equal.',
        'The answer is: assertEqual',
      ],
      concepts: ['unittest', 'assertEqual', 'TestCase'],
    },
    {
      id: 'py-test-3',
      title: 'Write a simple TestCase',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a TestCase class with tests for a multiply function.',
      skeleton: `import unittest

def multiply(a, b):
    return a * b

# Write a class 'TestMultiply' that:
# 1. Inherits from unittest.TestCase
# 2. Has test_positive: multiply(3, 4) == 12
# 3. Has test_zero: multiply(5, 0) == 0
# 4. Has test_negative: multiply(-2, 3) == -6

class TestMultiply(unittest.TestCase):
    pass`,
      solution: `import unittest

def multiply(a, b):
    return a * b

class TestMultiply(unittest.TestCase):
    def test_positive(self):
        self.assertEqual(multiply(3, 4), 12)

    def test_zero(self):
        self.assertEqual(multiply(5, 0), 0)

    def test_negative(self):
        self.assertEqual(multiply(-2, 3), -6)`,
      hints: [
        'Each test method starts with test_ and uses self.assertEqual.',
        'Test methods take only self as a parameter.',
        'self.assertEqual(multiply(3, 4), 12) checks the result.',
      ],
      concepts: ['TestCase', 'assertEqual', 'test methods'],
    },
    {
      id: 'py-test-4',
      title: 'assertTrue and assertFalse',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use assertTrue and assertFalse for boolean checks.',
      skeleton: `import unittest

class TestBool(unittest.TestCase):
    def test_positive(self):
        self.__BLANK__(10 > 5)

    def test_negative(self):
        self.__BLANK__(10 < 5)

if __name__ == "__main__":
    unittest.main()`,
      solution: `import unittest

class TestBool(unittest.TestCase):
    def test_positive(self):
        self.assertTrue(10 > 5)

    def test_negative(self):
        self.assertFalse(10 < 5)

if __name__ == "__main__":
    unittest.main()`,
      hints: [
        'One assertion checks that something is True, the other checks False.',
        'assertTrue for conditions that should be True, assertFalse for False.',
        'The answers are: assertTrue and assertFalse',
      ],
      concepts: ['assertTrue', 'assertFalse'],
    },
    {
      id: 'py-test-5',
      title: 'Predict which tests pass',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Predict which test methods will pass.',
      skeleton: `import unittest

class TestStrings(unittest.TestCase):
    def test_upper(self):
        self.assertEqual("hello".upper(), "HELLO")

    def test_split(self):
        self.assertEqual("a,b,c".split(","), ["a", "b", "c"])

    def test_strip(self):
        self.assertEqual("  hi  ".strip(), "hi")

# All three tests run. How many pass?
# Answer with a number.`,
      solution: `3`,
      hints: [
        '"hello".upper() returns "HELLO" -- pass.',
        '"a,b,c".split(",") returns ["a", "b", "c"] -- pass.',
        '"  hi  ".strip() returns "hi" -- pass. All 3 pass.',
      ],
      concepts: ['unittest', 'string methods', 'assertions'],
    },
    {
      id: 'py-test-6',
      title: 'Fix failing assertion',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Fix the test that uses the wrong assertion method.',
      skeleton: `import unittest

class TestList(unittest.TestCase):
    def test_contains(self):
        fruits = ["apple", "banana", "cherry"]
        self.assertEqual("banana", fruits)

if __name__ == "__main__":
    unittest.main()`,
      solution: `import unittest

class TestList(unittest.TestCase):
    def test_contains(self):
        fruits = ["apple", "banana", "cherry"]
        self.assertIn("banana", fruits)

if __name__ == "__main__":
    unittest.main()`,
      hints: [
        'assertEqual checks if two values are equal, not membership.',
        'To check if an item is in a collection, use a different assertion.',
        'Change assertEqual to assertIn.',
      ],
      concepts: ['assertIn', 'assertEqual', 'assertion methods'],
    },
    {
      id: 'py-test-7',
      title: 'assertRaises',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use assertRaises to verify an exception is raised.',
      skeleton: `import unittest

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

class TestDivide(unittest.TestCase):
    def test_zero_division(self):
        with self.__BLANK__(ValueError):
            divide(10, 0)

if __name__ == "__main__":
    unittest.main()`,
      solution: `import unittest

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

class TestDivide(unittest.TestCase):
    def test_zero_division(self):
        with self.assertRaises(ValueError):
            divide(10, 0)

if __name__ == "__main__":
    unittest.main()`,
      hints: [
        'TestCase has a method to assert that code raises a specific exception.',
        'It can be used as a context manager with "with".',
        'The answer is: assertRaises',
      ],
      concepts: ['assertRaises', 'exception testing'],
    },
    {
      id: 'py-test-8',
      title: 'Write calculator tests',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write comprehensive tests for a Calculator class.',
      skeleton: `import unittest

class Calculator:
    def add(self, a, b):
        return a + b

    def divide(self, a, b):
        if b == 0:
            raise ZeroDivisionError("Cannot divide by zero")
        return a / b

# Write TestCalculator with:
# 1. test_add: add(2, 3) == 5
# 2. test_add_negative: add(-1, -1) == -2
# 3. test_divide: divide(10, 2) == 5.0
# 4. test_divide_by_zero: divide(1, 0) raises ZeroDivisionError

class TestCalculator(unittest.TestCase):
    pass`,
      solution: `import unittest

class Calculator:
    def add(self, a, b):
        return a + b

    def divide(self, a, b):
        if b == 0:
            raise ZeroDivisionError("Cannot divide by zero")
        return a / b

class TestCalculator(unittest.TestCase):
    def setUp(self):
        self.calc = Calculator()

    def test_add(self):
        self.assertEqual(self.calc.add(2, 3), 5)

    def test_add_negative(self):
        self.assertEqual(self.calc.add(-1, -1), -2)

    def test_divide(self):
        self.assertEqual(self.calc.divide(10, 2), 5.0)

    def test_divide_by_zero(self):
        with self.assertRaises(ZeroDivisionError):
            self.calc.divide(1, 0)`,
      hints: [
        'Create a Calculator instance in setUp for reuse across tests.',
        'Use assertEqual for value checks and assertRaises for exception checks.',
        'Use "with self.assertRaises(ZeroDivisionError):" as a context manager.',
      ],
      concepts: ['TestCase', 'setUp', 'assertEqual', 'assertRaises'],
    },
    {
      id: 'py-test-9',
      title: 'setUp and tearDown',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use setUp to prepare test fixtures.',
      skeleton: `import unittest

class TestStack(unittest.TestCase):
    def __BLANK__(self):
        self.stack = []
        self.stack.append(1)
        self.stack.append(2)

    def test_pop(self):
        self.assertEqual(self.stack.pop(), 2)

    def test_length(self):
        self.assertEqual(len(self.stack), 2)

if __name__ == "__main__":
    unittest.main()`,
      solution: `import unittest

class TestStack(unittest.TestCase):
    def setUp(self):
        self.stack = []
        self.stack.append(1)
        self.stack.append(2)

    def test_pop(self):
        self.assertEqual(self.stack.pop(), 2)

    def test_length(self):
        self.assertEqual(len(self.stack), 2)

if __name__ == "__main__":
    unittest.main()`,
      hints: [
        'A special method runs before each test to prepare fixtures.',
        'It sets up the initial state that each test needs.',
        'The answer is: setUp',
      ],
      concepts: ['setUp', 'test fixtures'],
    },
    {
      id: 'py-test-10',
      title: 'Write tests with setUp',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a test class using setUp for a BankAccount.',
      skeleton: `import unittest

class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount

# Write TestBankAccount with:
# 1. setUp: create account with balance=100
# 2. test_deposit: deposit 50, balance should be 150
# 3. test_withdraw: withdraw 30, balance should be 70
# 4. test_overdraw: withdraw 200 raises ValueError

class TestBankAccount(unittest.TestCase):
    pass`,
      solution: `import unittest

class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount

class TestBankAccount(unittest.TestCase):
    def setUp(self):
        self.account = BankAccount(balance=100)

    def test_deposit(self):
        self.account.deposit(50)
        self.assertEqual(self.account.balance, 150)

    def test_withdraw(self):
        self.account.withdraw(30)
        self.assertEqual(self.account.balance, 70)

    def test_overdraw(self):
        with self.assertRaises(ValueError):
            self.account.withdraw(200)`,
      hints: [
        'setUp creates a fresh BankAccount(balance=100) for each test.',
        'Each test modifies the account and checks the expected balance.',
        'Use assertRaises(ValueError) for the overdraw test.',
      ],
      concepts: ['setUp', 'TestCase', 'assertEqual', 'assertRaises'],
    },
    {
      id: 'py-test-11',
      title: 'Fix wrong mock target',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the test that patches the wrong location.',
      skeleton: `import unittest
from unittest.mock import patch

# module: myapp.py
# from datetime import datetime
# def get_year():
#     return datetime.now().year

# Test file:
class TestGetYear(unittest.TestCase):
    @patch('datetime.datetime')
    def test_get_year(self, mock_dt):
        mock_dt.now.return_value.year = 2025
        from datetime import datetime
        result = datetime.now().year
        self.assertEqual(result, 2025)`,
      solution: `import unittest
from unittest.mock import patch, MagicMock

class TestGetYear(unittest.TestCase):
    @patch('datetime.datetime')
    def test_get_year(self, mock_dt):
        mock_instance = MagicMock()
        mock_instance.year = 2025
        mock_dt.now.return_value = mock_instance
        result = mock_dt.now().year
        self.assertEqual(result, 2025)`,
      hints: [
        'Patch must target where the name is looked up, not where it is defined.',
        'The mock_dt.now.return_value needs to be an object with a year attribute.',
        'Set mock_dt.now.return_value to a MagicMock with year=2025.',
      ],
      concepts: ['patch', 'mock target', 'return_value'],
    },
    {
      id: 'py-test-12',
      title: 'Predict mock calls',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict the output of Mock call tracking.',
      skeleton: `from unittest.mock import Mock

m = Mock()
m(1, 2)
m(3)
m(key="value")

print(m.call_count)
print(m.call_args)
print(m.called)`,
      solution: `3
call(key='value')
True`,
      hints: [
        'The mock was called 3 times total.',
        'call_args returns the arguments of the LAST call.',
        'called is True because the mock was called at least once.',
      ],
      concepts: ['Mock', 'call_count', 'call_args', 'called'],
    },
    {
      id: 'py-test-13',
      title: 'Using patch decorator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use the patch decorator to mock a function.',
      skeleton: `import unittest
from unittest.mock import __BLANK__

def get_data():
    # In real code, this would call an API
    return {"status": "ok"}

def process():
    data = get_data()
    return data["status"]

class TestProcess(unittest.TestCase):
    @__BLANK__("__main__.get_data", return_value={"status": "mocked"})
    def test_process(self, mock_get):
        result = process()
        self.assertEqual(result, "mocked")
        mock_get.assert_called_once()`,
      solution: `import unittest
from unittest.mock import patch

def get_data():
    # In real code, this would call an API
    return {"status": "ok"}

def process():
    data = get_data()
    return data["status"]

class TestProcess(unittest.TestCase):
    @patch("__main__.get_data", return_value={"status": "mocked"})
    def test_process(self, mock_get):
        result = process()
        self.assertEqual(result, "mocked")
        mock_get.assert_called_once()`,
      hints: [
        'unittest.mock provides a decorator to replace objects during tests.',
        'It temporarily replaces the target with a Mock object.',
        'The answer is: patch',
      ],
      concepts: ['patch', 'mocking', 'assert_called_once'],
    },
    {
      id: 'py-test-14',
      title: 'Write tests using Mock',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write tests using Mock objects to isolate dependencies.',
      skeleton: `import unittest
from unittest.mock import Mock

class UserService:
    def __init__(self, db):
        self.db = db

    def get_user(self, user_id):
        return self.db.find_by_id(user_id)

    def create_user(self, name):
        return self.db.insert({"name": name})

# Write TestUserService with:
# 1. setUp: create a Mock() for db, create UserService with mock db
# 2. test_get_user: mock db.find_by_id to return {"name": "Alice"},
#    call get_user(1), assert result and that find_by_id was called with 1
# 3. test_create_user: call create_user("Bob"),
#    assert db.insert was called with {"name": "Bob"}

class TestUserService(unittest.TestCase):
    pass`,
      solution: `import unittest
from unittest.mock import Mock

class UserService:
    def __init__(self, db):
        self.db = db

    def get_user(self, user_id):
        return self.db.find_by_id(user_id)

    def create_user(self, name):
        return self.db.insert({"name": name})

class TestUserService(unittest.TestCase):
    def setUp(self):
        self.db = Mock()
        self.service = UserService(self.db)

    def test_get_user(self):
        self.db.find_by_id.return_value = {"name": "Alice"}
        result = self.service.get_user(1)
        self.assertEqual(result, {"name": "Alice"})
        self.db.find_by_id.assert_called_once_with(1)

    def test_create_user(self):
        self.service.create_user("Bob")
        self.db.insert.assert_called_once_with({"name": "Bob"})`,
      hints: [
        'Create a Mock() for the database in setUp.',
        'Set return_value on mock methods to control their output.',
        'Use assert_called_once_with() to verify correct arguments.',
      ],
      concepts: ['Mock', 'return_value', 'assert_called_once_with'],
    },
    {
      id: 'py-test-15',
      title: 'Fix test isolation issue',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the test that fails due to shared mutable state.',
      skeleton: `import unittest

shared_list = []

class TestList(unittest.TestCase):
    def test_append_one(self):
        shared_list.append(1)
        self.assertEqual(len(shared_list), 1)

    def test_append_two(self):
        shared_list.append(2)
        self.assertEqual(len(shared_list), 1)  # Fails! List has items from test_append_one`,
      solution: `import unittest

class TestList(unittest.TestCase):
    def setUp(self):
        self.items = []

    def test_append_one(self):
        self.items.append(1)
        self.assertEqual(len(self.items), 1)

    def test_append_two(self):
        self.items.append(2)
        self.assertEqual(len(self.items), 1)`,
      hints: [
        'Tests share the module-level list, so state leaks between tests.',
        'Each test should have its own fresh list.',
        'Move the list into setUp as self.items so each test gets a fresh copy.',
      ],
      concepts: ['test isolation', 'setUp', 'shared state'],
    },
    {
      id: 'py-test-16',
      title: 'Write parameterized test',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a parameterized test using subTest.',
      skeleton: `import unittest

def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

# Write TestPalindrome with a single test method 'test_palindromes' that:
# Uses self.subTest to test multiple cases:
# ("racecar", True), ("hello", False), ("A man a plan a canal Panama", True), ("", True)

class TestPalindrome(unittest.TestCase):
    pass`,
      solution: `import unittest

def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

class TestPalindrome(unittest.TestCase):
    def test_palindromes(self):
        cases = [
            ("racecar", True),
            ("hello", False),
            ("A man a plan a canal Panama", True),
            ("", True),
        ]
        for text, expected in cases:
            with self.subTest(text=text):
                self.assertEqual(is_palindrome(text), expected)`,
      hints: [
        'self.subTest() lets you run multiple parametrized checks in one test.',
        'Loop over test cases and use "with self.subTest(...):" for each.',
        'If one subTest fails, the others still run.',
      ],
      concepts: ['subTest', 'parameterized testing'],
    },
    {
      id: 'py-test-17',
      title: 'Predict test discovery',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Predict which methods are discovered as tests.',
      skeleton: `import unittest

class TestExample(unittest.TestCase):
    def test_one(self):
        pass

    def check_two(self):
        pass

    def test_three(self):
        pass

    def helper(self):
        pass

suite = unittest.TestLoader().loadTestsFromTestCase(TestExample)
print(suite.countTestCases())`,
      solution: `2`,
      hints: [
        'unittest discovers methods that start with "test".',
        'check_two and helper do not start with "test".',
        'Only test_one and test_three are discovered -- 2 tests.',
      ],
      concepts: ['test discovery', 'naming convention'],
    },
    {
      id: 'py-test-18',
      title: 'Write fixture-based tests',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write tests that use setUpClass for expensive shared setup.',
      skeleton: `import unittest

class Database:
    def __init__(self):
        self.connected = True
        self.data = {"users": ["Alice", "Bob"]}

    def query(self, table):
        return self.data.get(table, [])

    def close(self):
        self.connected = False

# Write TestDatabase with:
# 1. setUpClass: create a shared Database instance (cls.db)
# 2. tearDownClass: close the database (cls.db.close())
# 3. test_connection: assert db.connected is True
# 4. test_query_users: assert db.query("users") returns ["Alice", "Bob"]
# 5. test_query_missing: assert db.query("orders") returns []

class TestDatabase(unittest.TestCase):
    pass`,
      solution: `import unittest

class Database:
    def __init__(self):
        self.connected = True
        self.data = {"users": ["Alice", "Bob"]}

    def query(self, table):
        return self.data.get(table, [])

    def close(self):
        self.connected = False

class TestDatabase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.db = Database()

    @classmethod
    def tearDownClass(cls):
        cls.db.close()

    def test_connection(self):
        self.assertTrue(self.db.connected)

    def test_query_users(self):
        self.assertEqual(self.db.query("users"), ["Alice", "Bob"])

    def test_query_missing(self):
        self.assertEqual(self.db.query("orders"), [])`,
      hints: [
        'setUpClass is a @classmethod that runs once for the entire test class.',
        'Use cls instead of self in class-level setup/teardown.',
        'tearDownClass should close the database.',
      ],
      concepts: ['setUpClass', 'tearDownClass', 'classmethod', 'test fixtures'],
    },
    {
      id: 'py-test-19',
      title: 'Refactor repetitive tests',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor repetitive test methods into a parameterized test.',
      skeleton: `import unittest

def double(n):
    return n * 2

class TestDouble(unittest.TestCase):
    def test_double_1(self):
        self.assertEqual(double(1), 2)

    def test_double_2(self):
        self.assertEqual(double(2), 4)

    def test_double_3(self):
        self.assertEqual(double(3), 6)

    def test_double_0(self):
        self.assertEqual(double(0), 0)

    def test_double_neg(self):
        self.assertEqual(double(-5), -10)`,
      solution: `import unittest

def double(n):
    return n * 2

class TestDouble(unittest.TestCase):
    def test_double(self):
        cases = [
            (1, 2),
            (2, 4),
            (3, 6),
            (0, 0),
            (-5, -10),
        ]
        for inp, expected in cases:
            with self.subTest(input=inp):
                self.assertEqual(double(inp), expected)`,
      hints: [
        'All five tests follow the same pattern -- check double(n) == expected.',
        'Use self.subTest to parameterize a single test method.',
        'Create a list of (input, expected) tuples and loop with subTest.',
      ],
      concepts: ['refactoring', 'subTest', 'DRY'],
    },
    {
      id: 'py-test-20',
      title: 'Refactor to proper mocking',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor tests that hit real dependencies to use mocks.',
      skeleton: `import unittest
import time

class WeatherService:
    def get_temperature(self, city):
        time.sleep(2)  # Simulates slow API call
        return 72.0

class WeatherApp:
    def __init__(self, service):
        self.service = service

    def is_hot(self, city):
        temp = self.service.get_temperature(city)
        return temp > 80

class TestWeatherApp(unittest.TestCase):
    def test_is_hot_true(self):
        service = WeatherService()  # Slow! Hits real service
        app = WeatherApp(service)
        # This test is slow and unreliable
        result = app.is_hot("Phoenix")

    def test_is_hot_false(self):
        service = WeatherService()  # Slow! Hits real service
        app = WeatherApp(service)
        result = app.is_hot("Seattle")`,
      solution: `import unittest
from unittest.mock import Mock

class WeatherService:
    def get_temperature(self, city):
        return 72.0

class WeatherApp:
    def __init__(self, service):
        self.service = service

    def is_hot(self, city):
        temp = self.service.get_temperature(city)
        return temp > 80

class TestWeatherApp(unittest.TestCase):
    def setUp(self):
        self.service = Mock()
        self.app = WeatherApp(self.service)

    def test_is_hot_true(self):
        self.service.get_temperature.return_value = 95.0
        self.assertTrue(self.app.is_hot("Phoenix"))

    def test_is_hot_false(self):
        self.service.get_temperature.return_value = 65.0
        self.assertFalse(self.app.is_hot("Seattle"))`,
      hints: [
        'Replace WeatherService with a Mock to avoid slow API calls.',
        'Use mock.get_temperature.return_value to control the temperature.',
        'Create the mock service in setUp and set return_value per test.',
      ],
      concepts: ['refactoring', 'Mock', 'dependency injection', 'test speed'],
    },
  ],
};
