import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-except',
  title: '15. Exceptions',
  explanation: `## Exception Handling in Ruby

Ruby uses \`begin/rescue/ensure\` for exception handling, similar to try/catch/finally in other languages.

\`\`\`ruby
begin
  result = 10 / 0
rescue ZeroDivisionError => e
  puts "Error: \#{e.message}"
ensure
  puts "This always runs"
end

# Raising exceptions
raise "Something went wrong"
raise ArgumentError, "Invalid input"

# Custom exceptions
class AppError < StandardError; end
class NotFoundError < AppError; end

# Multiple rescue clauses
begin
  risky_operation
rescue NotFoundError => e
  handle_not_found(e)
rescue AppError => e
  handle_app_error(e)
rescue => e
  handle_unknown(e)
end
\`\`\`

### Key Concepts

- **\`begin/rescue/end\`** wraps risky code
- **\`rescue ClassName => e\`** catches specific exception types
- **\`ensure\`** runs whether or not an exception occurred
- **\`retry\`** re-executes the begin block (use with caution!)
- **\`raise\`** throws an exception
- **\`StandardError\`** is the default class rescued by bare \`rescue\`
- Custom exceptions should inherit from \`StandardError\`, not \`Exception\``,
  exercises: [
    {
      id: 'rb-except-1',
      title: 'Basic Rescue',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to rescue the ZeroDivisionError.',
      skeleton: `begin
  puts 10 / 0
___ ZeroDivisionError => e
  puts "Cannot divide by zero"
end`,
      solution: `begin
  puts 10 / 0
rescue ZeroDivisionError => e
  puts "Cannot divide by zero"
end`,
      hints: [
        'Use `rescue` to catch exceptions.',
        'Specify the exception class after rescue.',
        '`=> e` captures the exception object.',
      ],
      concepts: ['rescue', 'ZeroDivisionError', 'exception-handling'],
    },
    {
      id: 'rb-except-2',
      title: 'Raise an Exception',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to raise an ArgumentError with a message.',
      skeleton: `def divide(a, b)
  ___ ArgumentError, "Divisor cannot be zero" if b == 0
  a / b
end`,
      solution: `def divide(a, b)
  raise ArgumentError, "Divisor cannot be zero" if b == 0
  a / b
end`,
      hints: [
        'Use `raise` to throw an exception.',
        'Provide the exception class and message.',
        'The if modifier makes it conditional.',
      ],
      concepts: ['raise', 'ArgumentError', 'guard-clause'],
    },
    {
      id: 'rb-except-3',
      title: 'Ensure Block',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank so the cleanup code always executes.',
      skeleton: `begin
  file = File.open("test.txt")
  # process file
rescue Errno::ENOENT => e
  puts "File not found"
___
  file&.close
  puts "Cleanup done"
end`,
      solution: `begin
  file = File.open("test.txt")
  # process file
rescue Errno::ENOENT => e
  puts "File not found"
ensure
  file&.close
  puts "Cleanup done"
end`,
      hints: [
        '`ensure` block runs whether or not an exception occurred.',
        'It is similar to `finally` in other languages.',
        'Good for cleanup like closing files.',
      ],
      concepts: ['ensure', 'cleanup', 'safe-navigation'],
    },
    {
      id: 'rb-except-4',
      title: 'Custom Exception Class',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to define a custom exception inheriting from StandardError.',
      skeleton: `class ValidationError ___ ___
  def initialize(field)
    super("Invalid field: \#{field}")
  end
end`,
      solution: `class ValidationError < StandardError
  def initialize(field)
    super("Invalid field: \#{field}")
  end
end`,
      hints: [
        'Custom exceptions should inherit from StandardError.',
        'Use `<` for inheritance.',
        'Call `super` to set the error message.',
      ],
      concepts: ['custom-exceptions', 'StandardError', 'inheritance'],
    },
    {
      id: 'rb-except-5',
      title: 'Retry Keyword',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to retry the operation up to 3 times.',
      skeleton: `attempts = 0

begin
  attempts += 1
  raise "Temporary failure" if attempts < 3
  puts "Success on attempt \#{attempts}"
rescue
  ___ if attempts < 3
end`,
      solution: `attempts = 0

begin
  attempts += 1
  raise "Temporary failure" if attempts < 3
  puts "Success on attempt \#{attempts}"
rescue
  retry if attempts < 3
end`,
      hints: [
        '`retry` re-executes the begin block from the start.',
        'Always use a counter to avoid infinite loops.',
        'Check the counter before retrying.',
      ],
      concepts: ['retry', 'error-recovery', 'loop-guard'],
    },
    {
      id: 'rb-except-6',
      title: 'Multiple Rescue Clauses',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blanks to rescue different exception types.',
      skeleton: `begin
  # risky code
rescue ___ => e
  puts "Type error: \#{e.message}"
rescue ___ => e
  puts "Name error: \#{e.message}"
rescue => e
  puts "Other: \#{e.message}"
end`,
      solution: `begin
  # risky code
rescue TypeError => e
  puts "Type error: \#{e.message}"
rescue NameError => e
  puts "Name error: \#{e.message}"
rescue => e
  puts "Other: \#{e.message}"
end`,
      hints: [
        'List more specific exceptions first.',
        'Bare `rescue` catches StandardError and its subclasses.',
        'Order matters - first matching rescue wins.',
      ],
      concepts: ['multiple-rescue', 'exception-hierarchy', 'specificity'],
    },
    {
      id: 'rb-except-7',
      title: 'Write a Safe Division Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Write a method safe_divide(a, b) that returns the result of a/b, or "Cannot divide by zero" if b is zero.',
      skeleton: `# Write your safe_divide method`,
      solution: `def safe_divide(a, b)
  a / b
rescue ZeroDivisionError
  "Cannot divide by zero"
end`,
      hints: [
        'You can use rescue directly in a method body without begin.',
        'Catch ZeroDivisionError specifically.',
        'Return the error message string from the rescue block.',
      ],
      concepts: ['inline-rescue', 'ZeroDivisionError', 'error-handling'],
    },
    {
      id: 'rb-except-8',
      title: 'Write Custom Exception Hierarchy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write an AppError < StandardError, then NotFoundError < AppError and ForbiddenError < AppError. Write a method check_access(role) that raises NotFoundError for "guest" and ForbiddenError for "banned", returns "Welcome" otherwise.',
      skeleton: `# Write your exception hierarchy and check_access method`,
      solution: `class AppError < StandardError; end
class NotFoundError < AppError; end
class ForbiddenError < AppError; end

def check_access(role)
  case role
  when "guest"
    raise NotFoundError, "Page not found"
  when "banned"
    raise ForbiddenError, "Access forbidden"
  else
    "Welcome"
  end
end`,
      hints: [
        'Define the base error class inheriting from StandardError.',
        'Specific errors inherit from the base error.',
        'Use `raise ClassName, message` to throw exceptions.',
      ],
      concepts: ['exception-hierarchy', 'custom-exceptions', 'case-when'],
    },
    {
      id: 'rb-except-9',
      title: 'Write a Retry with Backoff',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method fetch_data that simulates a network call. It should retry up to 3 times, sleeping 0.1 * attempts seconds between retries, and raise "Max retries exceeded" if all fail. Use a random failure simulation.',
      skeleton: `# Write your fetch_data method with retry and backoff`,
      solution: `def fetch_data
  attempts = 0
  begin
    attempts += 1
    raise "Network error" if rand < 0.7
    "Data received"
  rescue RuntimeError
    if attempts < 3
      sleep(0.1 * attempts)
      retry
    else
      raise "Max retries exceeded"
    end
  end
end`,
      hints: [
        'Use a counter to track attempts.',
        'sleep(0.1 * attempts) implements linear backoff.',
        'Re-raise a different error after max retries.',
      ],
      concepts: ['retry', 'backoff', 'error-recovery'],
    },
    {
      id: 'rb-except-10',
      title: 'Write Exception Logging',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method with_logging that takes a block, executes it, and returns the result. If an exception occurs, log the class name and message, then re-raise it. Always log "completed" in ensure.',
      skeleton: `# Write your with_logging method`,
      solution: `def with_logging
  result = yield
  result
rescue => e
  puts "\#{e.class}: \#{e.message}"
  raise
ensure
  puts "completed"
end`,
      hints: [
        'Use `yield` to execute the block.',
        '`e.class` gives the exception type, `e.message` the text.',
        '`raise` without arguments re-raises the current exception.',
      ],
      concepts: ['ensure', 're-raise', 'block-yield'],
    },
    {
      id: 'rb-except-11',
      title: 'Write a Validator with Exceptions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a validate_age(age) method that raises TypeError if age is not an Integer, ArgumentError if age < 0, and returns true otherwise.',
      skeleton: `# Write your validate_age method`,
      solution: `def validate_age(age)
  raise TypeError, "Age must be an Integer" unless age.is_a?(Integer)
  raise ArgumentError, "Age cannot be negative" if age < 0
  true
end`,
      hints: [
        'Check the type first with is_a?(Integer).',
        'Use `raise TypeError` for wrong types.',
        'Use `raise ArgumentError` for invalid values.',
      ],
      concepts: ['raise', 'TypeError', 'ArgumentError', 'validation'],
    },
    {
      id: 'rb-except-12',
      title: 'Write Rescue in Method Body',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a parse_integer(str) method that converts a string to integer with Integer(str). Rescue ArgumentError and return nil instead.',
      skeleton: `# Write your parse_integer method`,
      solution: `def parse_integer(str)
  Integer(str)
rescue ArgumentError
  nil
end`,
      hints: [
        'Integer("abc") raises ArgumentError.',
        'Methods can have rescue without begin.',
        'Return nil from the rescue block.',
      ],
      concepts: ['inline-rescue', 'Integer()', 'ArgumentError'],
    },
    {
      id: 'rb-except-13',
      title: 'Fix Exception Class Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so the custom exception is properly caught by a bare rescue.',
      skeleton: `class MyError < Exception
  def initialize
    super("My custom error")
  end
end

begin
  raise MyError
rescue => e
  puts "Caught: \#{e.message}"
end`,
      solution: `class MyError < StandardError
  def initialize
    super("My custom error")
  end
end

begin
  raise MyError
rescue => e
  puts "Caught: \#{e.message}"
end`,
      hints: [
        'Bare `rescue` only catches StandardError and subclasses.',
        'Inheriting from Exception means it won\'t be caught by bare rescue.',
        'Change `Exception` to `StandardError`.',
      ],
      concepts: ['StandardError-vs-Exception', 'custom-exceptions', 'common-bugs'],
    },
    {
      id: 'rb-except-14',
      title: 'Fix Infinite Retry Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so it does not loop forever.',
      skeleton: `def unreliable_method
  begin
    raise "Temporary failure"
  rescue
    retry
  end
end`,
      solution: `def unreliable_method
  attempts = 0
  begin
    attempts += 1
    raise "Temporary failure"
  rescue
    retry if attempts < 3
    raise "Failed after 3 attempts"
  end
end`,
      hints: [
        'retry without a counter causes infinite loops.',
        'Add an attempts counter and check before retrying.',
        'After max retries, re-raise or raise a new error.',
      ],
      concepts: ['retry', 'infinite-loop', 'guard-clause'],
    },
    {
      id: 'rb-except-15',
      title: 'Fix Rescue Order Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the rescue order so the specific exception is caught first.',
      skeleton: `class AppError < StandardError; end
class NotFoundError < AppError; end

begin
  raise NotFoundError, "Not found"
rescue AppError => e
  puts "App error: \#{e.message}"
rescue NotFoundError => e
  puts "Not found: \#{e.message}"
end`,
      solution: `class AppError < StandardError; end
class NotFoundError < AppError; end

begin
  raise NotFoundError, "Not found"
rescue NotFoundError => e
  puts "Not found: \#{e.message}"
rescue AppError => e
  puts "App error: \#{e.message}"
end`,
      hints: [
        'More specific exceptions must be listed first.',
        'AppError catches NotFoundError because it is a subclass.',
        'Swap the order so NotFoundError is rescued first.',
      ],
      concepts: ['rescue-order', 'exception-hierarchy', 'specificity'],
    },
    {
      id: 'rb-except-16',
      title: 'Predict Rescue Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `begin
  puts "start"
  raise "oops"
  puts "after raise"
rescue => e
  puts "rescued: \#{e.message}"
ensure
  puts "done"
end`,
      solution: `start
rescued: oops
done`,
      hints: [
        'raise stops execution and jumps to rescue.',
        '"after raise" is never reached.',
        'ensure runs regardless of exceptions.',
      ],
      concepts: ['raise', 'rescue', 'ensure', 'control-flow'],
    },
    {
      id: 'rb-except-17',
      title: 'Predict Ensure Return Value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `def test
  begin
    return "from begin"
  ensure
    puts "ensure ran"
  end
end

puts test`,
      solution: `ensure ran
from begin`,
      hints: [
        'ensure runs even when return is used.',
        'The return value from begin is preserved.',
        'ensure does NOT override the return value unless it also has return.',
      ],
      concepts: ['ensure', 'return-value', 'control-flow'],
    },
    {
      id: 'rb-except-18',
      title: 'Predict Multiple Rescue',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `begin
  raise TypeError, "wrong type"
rescue ArgumentError
  puts "arg error"
rescue TypeError
  puts "type error"
rescue => e
  puts "other"
end`,
      solution: `type error`,
      hints: [
        'Ruby checks rescue clauses in order.',
        'TypeError matches the second rescue clause.',
        'Only the first matching rescue executes.',
      ],
      concepts: ['multiple-rescue', 'exception-matching', 'control-flow'],
    },
    {
      id: 'rb-except-19',
      title: 'Refactor Nested Rescue to Method',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the nested begin/rescue into a clean method with inline rescue.',
      skeleton: `def process(input)
  begin
    begin
      value = Integer(input)
    rescue ArgumentError
      return "not a number"
    end
    begin
      result = 100 / value
    rescue ZeroDivisionError
      return "cannot divide by zero"
    end
    result
  end
end`,
      solution: `def process(input)
  value = Integer(input)
  100 / value
rescue ArgumentError
  "not a number"
rescue ZeroDivisionError
  "cannot divide by zero"
end`,
      hints: [
        'A method body can have multiple rescue clauses without begin.',
        'Remove the nested begin/end blocks.',
        'List both rescue clauses at the method level.',
      ],
      concepts: ['inline-rescue', 'refactoring', 'clean-code'],
    },
    {
      id: 'rb-except-20',
      title: 'Refactor to Custom Exception',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the generic RuntimeError raises into specific custom exceptions.',
      skeleton: `def transfer(from, to, amount)
  raise "Insufficient balance" if from[:balance] < amount
  raise "Account frozen" if from[:frozen]
  raise "Invalid amount" if amount <= 0
  from[:balance] -= amount
  to[:balance] += amount
end`,
      solution: `class InsufficientBalanceError < StandardError; end
class AccountFrozenError < StandardError; end
class InvalidAmountError < StandardError; end

def transfer(from, to, amount)
  raise InvalidAmountError, "Amount must be positive" if amount <= 0
  raise AccountFrozenError, "Account is frozen" if from[:frozen]
  raise InsufficientBalanceError, "Balance too low" if from[:balance] < amount
  from[:balance] -= amount
  to[:balance] += amount
end`,
      hints: [
        'Create specific exception classes inheriting from StandardError.',
        'Replace string raises with specific exception classes.',
        'This allows callers to rescue specific error types.',
      ],
      concepts: ['custom-exceptions', 'StandardError', 'refactoring'],
    },
  ],
};
