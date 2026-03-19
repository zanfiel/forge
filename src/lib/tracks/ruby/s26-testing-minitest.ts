import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-minitest',
  title: '26. Minitest',
  explanation: `## Testing with Minitest in Ruby

Minitest is Ruby's built-in testing framework -- lightweight, fast, and part of the standard library.

### Test Classes

\`\`\`ruby
require 'minitest/autorun'

class CalculatorTest < Minitest::Test
  def setup
    @calc = Calculator.new
  end

  def test_addition
    assert_equal 5, @calc.add(2, 3)
  end

  def teardown
    # cleanup after each test
  end
end
\`\`\`

### Common Assertions

\`\`\`ruby
assert true                        # passes if truthy
assert_equal expected, actual      # equality
assert_nil obj                     # nil check
assert_raises(RuntimeError) { boom }  # exception
assert_includes [1,2,3], 2        # collection membership
assert_match /pattern/, string    # regex match
refute false                      # opposite of assert
\`\`\`

### Spec Syntax

\`\`\`ruby
require 'minitest/autorun'

describe Calculator do
  before do
    @calc = Calculator.new
  end

  it "adds two numbers" do
    _(@calc.add(2, 3)).must_equal 5
  end
end
\`\`\`

### Mocks and Stubs

\`\`\`ruby
def test_with_stub
  obj = Minitest::Mock.new
  obj.expect :name, "Alice"
  assert_equal "Alice", obj.name
  obj.verify
end

Time.stub :now, Time.new(2025, 1, 1) do
  assert_equal 2025, Time.now.year
end
\`\`\``,
  exercises: [
    {
      id: 'rb-minitest-1',
      title: 'Basic Assertion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Complete the test with the correct assertion.',
      skeleton: `require 'minitest/autorun'

class StringTest < Minitest::Test
  def test_string_length
    ___ 5, "hello".length
  end
end`,
      solution: `require 'minitest/autorun'

class StringTest < Minitest::Test
  def test_string_length
    assert_equal 5, "hello".length
  end
end`,
      hints: ['Use assert_equal to compare expected and actual values', 'The expected value comes first', 'assert_equal expected, actual'],
      concepts: ['assert_equal'],
    },
    {
      id: 'rb-minitest-2',
      title: 'Setup Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the setup method to initialize a test fixture.',
      skeleton: `require 'minitest/autorun'

class ArrayTest < Minitest::Test
  def ___
    @arr = [1, 2, 3]
  end

  def test_includes
    assert_includes @arr, 2
  end
end`,
      solution: `require 'minitest/autorun'

class ArrayTest < Minitest::Test
  def setup
    @arr = [1, 2, 3]
  end

  def test_includes
    assert_includes @arr, 2
  end
end`,
      hints: ['The method that runs before each test is called setup', 'It is an instance method with no arguments', 'def setup'],
      concepts: ['setup'],
    },
    {
      id: 'rb-minitest-3',
      title: 'Assert Nil',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use the correct assertion to check for nil.',
      skeleton: `require 'minitest/autorun'

class NilTest < Minitest::Test
  def test_hash_missing_key
    h = { a: 1 }
    ___ h[:b]
  end
end`,
      solution: `require 'minitest/autorun'

class NilTest < Minitest::Test
  def test_hash_missing_key
    h = { a: 1 }
    assert_nil h[:b]
  end
end`,
      hints: ['There is a specific assertion for nil checks', 'assert_nil checks that the value is nil', 'assert_nil value'],
      concepts: ['assert_nil'],
    },
    {
      id: 'rb-minitest-4',
      title: 'Assert Raises',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Assert that an exception is raised.',
      skeleton: `require 'minitest/autorun'

class ErrorTest < Minitest::Test
  def test_division_by_zero
    ___(ZeroDivisionError) { 1 / 0 }
  end
end`,
      solution: `require 'minitest/autorun'

class ErrorTest < Minitest::Test
  def test_division_by_zero
    assert_raises(ZeroDivisionError) { 1 / 0 }
  end
end`,
      hints: ['Use assert_raises to test for exceptions', 'Pass the exception class as argument', 'The code that raises goes in a block'],
      concepts: ['assert_raises'],
    },
    {
      id: 'rb-minitest-5',
      title: 'Refute Assertion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use refute to assert something is false.',
      skeleton: `require 'minitest/autorun'

class RefuteTest < Minitest::Test
  def test_not_empty
    ___ [1, 2, 3].empty?
  end
end`,
      solution: `require 'minitest/autorun'

class RefuteTest < Minitest::Test
  def test_not_empty
    refute [1, 2, 3].empty?
  end
end`,
      hints: ['refute is the opposite of assert', 'It passes when the expression is falsy', 'refute expression'],
      concepts: ['refute'],
    },
    {
      id: 'rb-minitest-6',
      title: 'Assert Match',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use assert_match to test a regex pattern.',
      skeleton: `require 'minitest/autorun'

class MatchTest < Minitest::Test
  def test_email_format
    email = "user@example.com"
    ___ /@/, email
  end
end`,
      solution: `require 'minitest/autorun'

class MatchTest < Minitest::Test
  def test_email_format
    email = "user@example.com"
    assert_match /@/, email
  end
end`,
      hints: ['assert_match tests a regex against a string', 'Pattern comes first, then the string', 'assert_match /pattern/, string'],
      concepts: ['assert_match'],
    },
    {
      id: 'rb-minitest-7',
      title: 'Write a Complete Test Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Minitest class that tests a Stack with push, pop, and empty? methods.',
      skeleton: `require 'minitest/autorun'

class Stack
  def initialize
    @data = []
  end

  def push(val)
    @data.push(val)
    self
  end

  def pop
    @data.pop
  end

  def empty?
    @data.empty?
  end
end

# Write StackTest class with test_push, test_pop, test_empty
`,
      solution: `require 'minitest/autorun'

class Stack
  def initialize
    @data = []
  end

  def push(val)
    @data.push(val)
    self
  end

  def pop
    @data.pop
  end

  def empty?
    @data.empty?
  end
end

class StackTest < Minitest::Test
  def setup
    @stack = Stack.new
  end

  def test_push
    @stack.push(1)
    refute @stack.empty?
  end

  def test_pop
    @stack.push(42)
    assert_equal 42, @stack.pop
  end

  def test_empty
    assert @stack.empty?
  end
end`,
      hints: ['Inherit from Minitest::Test', 'Use setup to create a fresh Stack', 'Write three test methods starting with test_'],
      concepts: ['test_class', 'setup', 'assertions'],
    },
    {
      id: 'rb-minitest-8',
      title: 'Write Tests with Teardown',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a test class with setup and teardown that tests file operations.',
      skeleton: `require 'minitest/autorun'
require 'tempfile'

# Write FileTest class:
# - setup creates a Tempfile and writes "hello" to it
# - test_read verifies reading the content
# - teardown closes and unlinks the tempfile
`,
      solution: `require 'minitest/autorun'
require 'tempfile'

class FileTest < Minitest::Test
  def setup
    @file = Tempfile.new('test')
    @file.write("hello")
    @file.rewind
  end

  def test_read
    assert_equal "hello", @file.read
  end

  def teardown
    @file.close
    @file.unlink
  end
end`,
      hints: ['Tempfile.new creates a temporary file', 'Call rewind after writing to read from the beginning', 'teardown runs after each test for cleanup'],
      concepts: ['teardown', 'tempfile', 'setup'],
    },
    {
      id: 'rb-minitest-9',
      title: 'Write Spec-Style Tests',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write spec-style tests using describe/it blocks for an Array.',
      skeleton: `require 'minitest/autorun'

# Write describe block for Array:
# - before block creates @arr = [3, 1, 2]
# - it "sorts elements" -> must_equal [1, 2, 3]
# - it "finds max" -> must_equal 3
# - it "calculates size" -> must_equal 3
`,
      solution: `require 'minitest/autorun'

describe Array do
  before do
    @arr = [3, 1, 2]
  end

  it "sorts elements" do
    _(@arr.sort).must_equal [1, 2, 3]
  end

  it "finds max" do
    _(@arr.max).must_equal 3
  end

  it "calculates size" do
    _(@arr.size).must_equal 3
  end
end`,
      hints: ['Use describe ClassName do...end', 'before replaces setup in spec style', 'Use _(value).must_equal expected'],
      concepts: ['spec_syntax', 'describe', 'before'],
    },
    {
      id: 'rb-minitest-10',
      title: 'Write Mock Test',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a test using Minitest::Mock to mock a database connection.',
      skeleton: `require 'minitest/autorun'

class UserService
  def initialize(db)
    @db = db
  end

  def find_user(id)
    @db.query("SELECT * FROM users WHERE id = \\\#{id}")
  end
end

# Write UserServiceTest that mocks the db object
# Mock should expect :query with specific SQL and return { name: "Alice" }
`,
      solution: `require 'minitest/autorun'

class UserService
  def initialize(db)
    @db = db
  end

  def find_user(id)
    @db.query("SELECT * FROM users WHERE id = \\\#{id}")
  end
end

class UserServiceTest < Minitest::Test
  def test_find_user
    mock_db = Minitest::Mock.new
    mock_db.expect :query, { name: "Alice" }, ["SELECT * FROM users WHERE id = 1"]
    service = UserService.new(mock_db)
    result = service.find_user(1)
    assert_equal({ name: "Alice" }, result)
    mock_db.verify
  end
end`,
      hints: ['Create a Minitest::Mock.new', 'Use expect with method name, return value, and expected args', 'Call verify at the end to check expectations'],
      concepts: ['mock', 'expect', 'verify'],
    },
    {
      id: 'rb-minitest-11',
      title: 'Write Stub Test',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a test that stubs Time.now to return a fixed time.',
      skeleton: `require 'minitest/autorun'

class Greeter
  def greet
    hour = Time.now.hour
    if hour < 12
      "Good morning"
    else
      "Good afternoon"
    end
  end
end

# Write GreeterTest with two tests:
# - test_morning stubs Time.now to 9:00 AM
# - test_afternoon stubs Time.now to 14:00
`,
      solution: `require 'minitest/autorun'

class Greeter
  def greet
    hour = Time.now.hour
    if hour < 12
      "Good morning"
    else
      "Good afternoon"
    end
  end
end

class GreeterTest < Minitest::Test
  def test_morning
    morning = Time.new(2025, 1, 1, 9, 0, 0)
    Time.stub :now, morning do
      assert_equal "Good morning", Greeter.new.greet
    end
  end

  def test_afternoon
    afternoon = Time.new(2025, 1, 1, 14, 0, 0)
    Time.stub :now, afternoon do
      assert_equal "Good afternoon", Greeter.new.greet
    end
  end
end`,
      hints: ['Time.stub :now, value do...end replaces Time.now temporarily', 'Create a Time object for the specific hour you want', 'The stub only applies within the block'],
      concepts: ['stub', 'time_testing'],
    },
    {
      id: 'rb-minitest-12',
      title: 'Write Custom Assertion',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a custom assertion method assert_between and use it in a test.',
      skeleton: `require 'minitest/autorun'

# Add a custom assertion assert_between(min, max, actual)
# that asserts actual is between min and max (inclusive)
# Use it in a test class
`,
      solution: `require 'minitest/autorun'

module Minitest::Assertions
  def assert_between(min, max, actual, msg = nil)
    msg = message(msg) { "Expected \\\#{actual} to be between \\\#{min} and \\\#{max}" }
    assert (min..max).include?(actual), msg
  end
end

class BetweenTest < Minitest::Test
  def test_random_in_range
    val = rand(1..10)
    assert_between 1, 10, val
  end

  def test_string_length
    assert_between 3, 10, "hello".length
  end
end`,
      hints: ['Open Minitest::Assertions module to add custom assertions', 'Use the assert method with a condition and message', 'message(msg) { } creates a lazy error message'],
      concepts: ['custom_assertions', 'minitest_assertions_module'],
    },
    {
      id: 'rb-minitest-13',
      title: 'Fix Test Naming Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the bug so the test is discovered and runs.',
      skeleton: `require 'minitest/autorun'

class MathTest < Minitest::Test
  def addition_test
    assert_equal 4, 2 + 2
  end
end`,
      solution: `require 'minitest/autorun'

class MathTest < Minitest::Test
  def test_addition
    assert_equal 4, 2 + 2
  end
end`,
      hints: ['Minitest discovers tests by method name prefix', 'Test methods must start with test_', 'Rename the method'],
      concepts: ['test_naming'],
    },
    {
      id: 'rb-minitest-14',
      title: 'Fix Assert Order Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the assertion argument order.',
      skeleton: `require 'minitest/autorun'

class OrderTest < Minitest::Test
  def test_string_upcase
    assert_equal "hello".upcase, "HELLO"
  end
end`,
      solution: `require 'minitest/autorun'

class OrderTest < Minitest::Test
  def test_string_upcase
    assert_equal "HELLO", "hello".upcase
  end
end`,
      hints: ['assert_equal takes expected first, then actual', 'The expected value should be the literal', 'Swap the arguments'],
      concepts: ['assert_equal_order'],
    },
    {
      id: 'rb-minitest-15',
      title: 'Fix Mock Verification Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the mock test so expectations are properly verified.',
      skeleton: `require 'minitest/autorun'

class MockBugTest < Minitest::Test
  def test_logger
    logger = Minitest::Mock.new
    logger.expect :log, nil, ["start"]
    # Oops: we call with different argument
    logger.log("begin")
    logger.verify
  end
end`,
      solution: `require 'minitest/autorun'

class MockBugTest < Minitest::Test
  def test_logger
    logger = Minitest::Mock.new
    logger.expect :log, nil, ["begin"]
    logger.log("begin")
    logger.verify
  end
end`,
      hints: ['The mock expects "start" but receives "begin"', 'The expected arguments must match what is actually called', 'Change the expect to match the actual call'],
      concepts: ['mock_expectations'],
    },
    {
      id: 'rb-minitest-16',
      title: 'Predict Assertion Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict whether each assertion passes or fails.',
      skeleton: `# What does each assertion result in? (pass or fail)
assert_equal 3, [1, 2, 3].length     # A
assert_nil false                       # B
assert_includes [1, 2], 3             # C`,
      solution: `# A: pass (3 == 3)
# B: fail (false is not nil)
# C: fail (3 is not in [1, 2])`,
      hints: ['assert_equal checks equality', 'assert_nil checks specifically for nil, not falsy', 'assert_includes checks membership'],
      concepts: ['assertions_behavior'],
    },
    {
      id: 'rb-minitest-17',
      title: 'Predict Test Execution Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of setup/teardown ordering.',
      skeleton: `# What is the execution order of methods?
class OrderTest < Minitest::Test
  def setup
    puts "setup"
  end

  def teardown
    puts "teardown"
  end

  def test_one
    puts "test_one"
  end

  def test_two
    puts "test_two"
  end
end
# (Assume tests run in alphabetical order)`,
      solution: `setup
test_one
teardown
setup
test_two
teardown`,
      hints: ['setup runs before EACH test', 'teardown runs after EACH test', 'Tests run independently with their own setup/teardown cycle'],
      concepts: ['test_lifecycle'],
    },
    {
      id: 'rb-minitest-18',
      title: 'Predict Spec Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict what the spec test outputs.',
      skeleton: `# What is the output?
require 'minitest/autorun'

describe "counter" do
  before do
    @count = 0
    puts "before: \\\#{@count}"
  end

  it "increments" do
    @count += 1
    puts "test: \\\#{@count}"
  end

  it "still zero" do
    puts "test: \\\#{@count}"
  end
end`,
      solution: `before: 0
test: 1
before: 0
test: 0`,
      hints: ['before runs before each it block', 'Instance variables are reset each time before runs', 'Each test gets a fresh @count = 0'],
      concepts: ['spec_before_isolation'],
    },
    {
      id: 'rb-minitest-19',
      title: 'Refactor Repeated Assertions',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor repeated test code using a data-driven approach.',
      skeleton: `require 'minitest/autorun'

class SquareTest < Minitest::Test
  def test_square_of_2
    assert_equal 4, 2 ** 2
  end

  def test_square_of_3
    assert_equal 9, 3 ** 2
  end

  def test_square_of_4
    assert_equal 16, 4 ** 2
  end

  def test_square_of_5
    assert_equal 25, 5 ** 2
  end
end`,
      solution: `require 'minitest/autorun'

class SquareTest < Minitest::Test
  { 2 => 4, 3 => 9, 4 => 16, 5 => 25 }.each do |input, expected|
    define_method("test_square_of_\\\#{input}") do
      assert_equal expected, input ** 2
    end
  end
end`,
      hints: ['Use define_method to generate test methods dynamically', 'Iterate over a hash of inputs and expected outputs', 'Each generated method name must start with test_'],
      concepts: ['data_driven_tests', 'define_method'],
    },
    {
      id: 'rb-minitest-20',
      title: 'Refactor to Spec Style',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor a Minitest::Test class into spec-style syntax.',
      skeleton: `require 'minitest/autorun'

class StringTest < Minitest::Test
  def setup
    @str = "Hello, World!"
  end

  def test_length
    assert_equal 13, @str.length
  end

  def test_downcase
    assert_equal "hello, world!", @str.downcase
  end

  def test_include
    assert @str.include?("World")
  end
end`,
      solution: `require 'minitest/autorun'

describe String do
  before do
    @str = "Hello, World!"
  end

  it "has correct length" do
    _(@str.length).must_equal 13
  end

  it "downcases" do
    _(@str.downcase).must_equal "hello, world!"
  end

  it "includes substring" do
    _(@str).must_include "World"
  end
end`,
      hints: ['Replace class...< Minitest::Test with describe', 'Replace def setup with before do', 'Replace assert_equal with _(val).must_equal'],
      concepts: ['spec_style', 'refactor_to_spec'],
    },
  ],
};
