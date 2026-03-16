import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-exceptions',
  title: '21. Exceptions',
  explanation: `## Exceptions

Exceptions signal errors and exceptional conditions. Python uses \\\`try/except\\\` to handle them.

### Basic Pattern
\\\`\\\`\\\`python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
else:
    print("No error")
finally:
    print("Always runs")
\\\`\\\`\\\`

### Exception Hierarchy
All exceptions inherit from \\\`BaseException\\\`. Catchable exceptions inherit from \\\`Exception\\\`.
- \\\`ValueError\\\`, \\\`TypeError\\\`, \\\`KeyError\\\`, \\\`IndexError\\\`, \\\`FileNotFoundError\\\`, etc.

### Raising Exceptions
\\\`\\\`\\\`python
raise ValueError("bad input")
\\\`\\\`\\\`

### Custom Exceptions
\\\`\\\`\\\`python
class AppError(Exception):
    def __init__(self, message, code=None):
        super().__init__(message)
        self.code = code
\\\`\\\`\\\`

### Exception Chaining
\\\`\\\`\\\`python
raise RuntimeError("high level") from original_error
\\\`\\\`\\\`

### Multiple except Clauses
Catch specific exceptions first, general ones last.
`,
  exercises: [
    {
      id: 'py-exceptions-1',
      title: 'Basic try/except',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Catch the ZeroDivisionError.',
      skeleton: `try:
    result = 10 / 0
__BLANK__ ZeroDivisionError:
    print("Cannot divide by zero")`,
      solution: `try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")`,
      hints: [
        'The keyword to catch exceptions is except.',
        'Follow it with the exception type.',
        'The answer is: except',
      ],
      concepts: ['try/except', 'ZeroDivisionError'],
    },
    {
      id: 'py-exceptions-2',
      title: 'Capture Exception Object',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Capture the exception object into a variable.',
      skeleton: `try:
    int("abc")
except ValueError __BLANK__ e:
    print(f"Error: {e}")`,
      solution: `try:
    int("abc")
except ValueError as e:
    print(f"Error: {e}")`,
      hints: [
        'Use the "as" keyword to bind the exception to a variable.',
        'The variable e holds the exception object.',
        'The answer is: as',
      ],
      concepts: ['except as', 'exception object'],
    },
    {
      id: 'py-exceptions-3',
      title: 'Raise an Exception',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Raise a ValueError with a message.',
      skeleton: `def validate_age(age):
    if age < 0:
        __BLANK__ ValueError("Age cannot be negative")
    return age

try:
    validate_age(-5)
except ValueError as e:
    print(e)  # Age cannot be negative`,
      solution: `def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

try:
    validate_age(-5)
except ValueError as e:
    print(e)  # Age cannot be negative`,
      hints: [
        'Use the raise keyword to throw an exception.',
        'Follow it with the exception class and message.',
        'The answer is: raise',
      ],
      concepts: ['raise', 'ValueError'],
    },
    {
      id: 'py-exceptions-4',
      title: 'else Clause',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Add an else clause that runs only when no exception occurs.',
      skeleton: `try:
    result = 10 / 2
except ZeroDivisionError:
    print("Error")
__BLANK__:
    print(f"Result: {result}")`,
      solution: `try:
    result = 10 / 2
except ZeroDivisionError:
    print("Error")
else:
    print(f"Result: {result}")`,
      hints: [
        'The else clause runs when no exception was raised.',
        'It goes between except and finally.',
        'The answer is: else',
      ],
      concepts: ['try/else'],
    },
    {
      id: 'py-exceptions-5',
      title: 'finally Clause',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Add a finally clause for cleanup.',
      skeleton: `f = open("test.txt", "w")
try:
    f.write("hello")
except IOError:
    print("Write error")
__BLANK__:
    f.close()`,
      solution: `f = open("test.txt", "w")
try:
    f.write("hello")
except IOError:
    print("Write error")
finally:
    f.close()`,
      hints: [
        'finally runs whether or not an exception occurred.',
        'Use it for cleanup like closing files.',
        'The answer is: finally',
      ],
      concepts: ['finally', 'cleanup'],
    },
    {
      id: 'py-exceptions-6',
      title: 'Custom Exception Class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Define a custom exception that inherits from Exception.',
      skeleton: `class NotFoundError(__BLANK__):
    pass

try:
    raise NotFoundError("Item not found")
except NotFoundError as e:
    print(e)  # Item not found`,
      solution: `class NotFoundError(Exception):
    pass

try:
    raise NotFoundError("Item not found")
except NotFoundError as e:
    print(e)  # Item not found`,
      hints: [
        'Custom exceptions should inherit from Exception.',
        'Exception is the base class for all catchable exceptions.',
        'The answer is: Exception',
      ],
      concepts: ['custom exception', 'Exception'],
    },
    {
      id: 'py-exceptions-7',
      title: 'Write Safe Division Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write safe_divide(a, b) that returns the result or None if b is zero.',
      skeleton: `def safe_divide(a, b):
    # Return a/b or None if ZeroDivisionError
    pass`,
      solution: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None`,
      hints: [
        'Wrap the division in try/except.',
        'Catch ZeroDivisionError specifically.',
        'Return None in the except block.',
      ],
      concepts: ['try/except', 'ZeroDivisionError', 'defensive programming'],
    },
    {
      id: 'py-exceptions-8',
      title: 'Write Custom Exception with Code',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write an AppError exception class that accepts message and an optional error_code. Store both as attributes.',
      skeleton: `class AppError(Exception):
    # __init__(message, error_code=None)
    # Store message and error_code
    pass`,
      solution: `class AppError(Exception):
    def __init__(self, message, error_code=None):
        super().__init__(message)
        self.error_code = error_code

    def __str__(self):
        if self.error_code:
            return f"[{self.error_code}] {super().__str__()}"
        return super().__str__()`,
      hints: [
        'Call super().__init__(message) to set the message.',
        'Store error_code as an instance attribute.',
        'Optionally override __str__ to include the code.',
      ],
      concepts: ['custom exception', 'super()', '__str__'],
    },
    {
      id: 'py-exceptions-9',
      title: 'Write Exception Hierarchy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a base AppError, then ValidationError and AuthError that inherit from it. Each stores a message.',
      skeleton: `class AppError(Exception):
    pass

class ValidationError(AppError):
    pass

class AuthError(AppError):
    pass`,
      solution: `class AppError(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = message

class ValidationError(AppError):
    def __init__(self, field, message):
        super().__init__(f"{field}: {message}")
        self.field = field

class AuthError(AppError):
    def __init__(self, message, status_code=401):
        super().__init__(message)
        self.status_code = status_code`,
      hints: [
        'AppError is the base with a message attribute.',
        'ValidationError adds a field attribute.',
        'AuthError adds a status_code with a default.',
      ],
      concepts: ['exception hierarchy', 'custom exceptions'],
    },
    {
      id: 'py-exceptions-10',
      title: 'Predict: except Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `class AppError(Exception):
    pass

class NotFoundError(AppError):
    pass

try:
    raise NotFoundError("gone")
except AppError:
    print("AppError caught")
except NotFoundError:
    print("NotFoundError caught")`,
      solution: `AppError caught`,
      hints: [
        'except clauses are checked in order.',
        'NotFoundError is a subclass of AppError.',
        'The first matching except catches it.',
      ],
      concepts: ['except order', 'exception hierarchy'],
    },
    {
      id: 'py-exceptions-11',
      title: 'Predict: finally Always Runs',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `def risky():
    try:
        return "success"
    finally:
        print("cleanup")

result = risky()
print(result)`,
      solution: `cleanup
success`,
      hints: [
        'finally runs even when the try block returns.',
        '"cleanup" prints before the return value is delivered.',
        'The function still returns "success".',
      ],
      concepts: ['finally', 'return in try'],
    },
    {
      id: 'py-exceptions-12',
      title: 'Write retry with Exceptions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write retry(func, max_attempts) that calls func() up to max_attempts times, returning the result on success or raising the last exception.',
      skeleton: `def retry(func, max_attempts=3):
    # Call func() up to max_attempts times
    # Return on success, raise last exception on failure
    pass`,
      solution: `def retry(func, max_attempts=3):
    last_error = None
    for attempt in range(max_attempts):
        try:
            return func()
        except Exception as e:
            last_error = e
    raise last_error`,
      hints: [
        'Loop up to max_attempts times.',
        'Return immediately on success.',
        'Store the last exception and raise it after all attempts fail.',
      ],
      concepts: ['retry pattern', 'exception handling'],
    },
    {
      id: 'py-exceptions-13',
      title: 'Fix: Catching Too Broadly',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code to catch only ValueError, not mask the KeyboardInterrupt.',
      skeleton: `def parse_number(s):
    try:
        return int(s)
    except:
        return None

# This catches EVERYTHING, including KeyboardInterrupt and SystemExit
print(parse_number("abc"))  # None`,
      solution: `def parse_number(s):
    try:
        return int(s)
    except ValueError:
        return None

print(parse_number("abc"))  # None`,
      hints: [
        'Bare except catches everything including KeyboardInterrupt.',
        'Always specify the exception type.',
        'Catch ValueError specifically for int() conversion.',
      ],
      concepts: ['bare except', 'specific exceptions'],
    },
    {
      id: 'py-exceptions-14',
      title: 'Fix: Exception Swallowed Silently',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code so the error is logged, not silently ignored.',
      skeleton: `import logging

def process_item(item):
    try:
        return int(item) * 2
    except ValueError:
        pass

results = [process_item(x) for x in ["1", "abc", "3"]]
print(results)  # [2, None, 6] -- "abc" failure is invisible`,
      solution: `import logging

def process_item(item):
    try:
        return int(item) * 2
    except ValueError as e:
        logging.warning(f"Skipping invalid item {item!r}: {e}")
        return None

results = [process_item(x) for x in ["1", "abc", "3"]]
print(results)  # [2, None, 6]`,
      hints: [
        'Silently passing on exceptions hides bugs.',
        'Log the error so it is visible.',
        'Return None explicitly instead of implicitly.',
      ],
      concepts: ['logging', 'silent failure', 'explicit return'],
    },
    {
      id: 'py-exceptions-15',
      title: 'Write Context-Aware Exception',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a HttpError(status_code, message) exception with a is_client_error property (400-499) and is_server_error property (500-599).',
      skeleton: `class HttpError(Exception):
    # status_code, message
    # is_client_error, is_server_error properties
    pass`,
      solution: `class HttpError(Exception):
    def __init__(self, status_code, message):
        super().__init__(f"{status_code}: {message}")
        self.status_code = status_code

    @property
    def is_client_error(self):
        return 400 <= self.status_code < 500

    @property
    def is_server_error(self):
        return 500 <= self.status_code < 600`,
      hints: [
        'Store status_code as an attribute.',
        'Use @property for is_client_error and is_server_error.',
        'Check the range of status_code.',
      ],
      concepts: ['custom exception', '@property', 'HTTP status codes'],
    },
    {
      id: 'py-exceptions-16',
      title: 'Predict: Exception Chaining',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `try:
    try:
        raise ValueError("original")
    except ValueError as e:
        raise RuntimeError("wrapped") from e
except RuntimeError as e:
    print(type(e).__name__)
    print(type(e.__cause__).__name__)`,
      solution: `RuntimeError
ValueError`,
      hints: [
        '"from e" chains the original exception as __cause__.',
        'The outer except catches RuntimeError.',
        'e.__cause__ is the original ValueError.',
      ],
      concepts: ['exception chaining', '__cause__', 'from'],
    },
    {
      id: 'py-exceptions-17',
      title: 'Fix: Re-raising without Losing Traceback',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the code to re-raise the original exception without losing the traceback.',
      skeleton: `def process():
    try:
        return 1 / 0
    except ZeroDivisionError as e:
        print("Logging error")
        raise ZeroDivisionError(str(e))  # Loses original traceback

try:
    process()
except ZeroDivisionError:
    print("Caught")`,
      solution: `def process():
    try:
        return 1 / 0
    except ZeroDivisionError as e:
        print("Logging error")
        raise  # Re-raises original with full traceback

try:
    process()
except ZeroDivisionError:
    print("Caught")`,
      hints: [
        'Creating a new exception loses the original traceback.',
        'Use bare "raise" to re-raise the current exception.',
        'This preserves the full traceback chain.',
      ],
      concepts: ['re-raise', 'traceback', 'bare raise'],
    },
    {
      id: 'py-exceptions-18',
      title: 'Write ExceptionGroup Handler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function validate_all(validators, data) that runs all validators, collects errors, and raises an ExceptionGroup if any failed.',
      skeleton: `def validate_all(validators, data):
    # Run all validators, collect errors
    # Raise ExceptionGroup if any errors
    pass`,
      solution: `def validate_all(validators, data):
    errors = []
    for validator in validators:
        try:
            validator(data)
        except Exception as e:
            errors.append(e)
    if errors:
        raise ExceptionGroup("Validation failed", errors)`,
      hints: [
        'Run each validator in a try/except, collecting failures.',
        'ExceptionGroup(message, exceptions) bundles multiple errors.',
        'Only raise if there are errors.',
      ],
      concepts: ['ExceptionGroup', 'validation', 'error collection'],
    },
    {
      id: 'py-exceptions-19',
      title: 'Refactor: Error Codes to Exceptions',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the error-code-returning function to use exceptions instead.',
      skeleton: `def divide(a, b):
    if b == 0:
        return None, "Division by zero"
    if not isinstance(a, (int, float)):
        return None, "Invalid type for a"
    return a / b, None

result, error = divide(10, 0)
if error:
    print(f"Error: {error}")
else:
    print(f"Result: {result}")`,
      solution: `def divide(a, b):
    if not isinstance(a, (int, float)):
        raise TypeError("Invalid type for a")
    if b == 0:
        raise ZeroDivisionError("Division by zero")
    return a / b

try:
    result = divide(10, 0)
    print(f"Result: {result}")
except (TypeError, ZeroDivisionError) as e:
    print(f"Error: {e}")`,
      hints: [
        'Replace error tuples with raise statements.',
        'Use specific exception types.',
        'Callers use try/except instead of checking error codes.',
      ],
      concepts: ['refactoring', 'exceptions vs error codes'],
    },
    {
      id: 'py-exceptions-20',
      title: 'Refactor: Nested try to Context Manager',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the nested try/finally for resource cleanup into a class with __enter__/__exit__.',
      skeleton: `class Connection:
    def open(self):
        print("Opening")
        self.active = True

    def close(self):
        print("Closing")
        self.active = False

    def query(self, sql):
        if not self.active:
            raise RuntimeError("Not connected")
        return f"Result: {sql}"

# Current usage:
conn = Connection()
conn.open()
try:
    print(conn.query("SELECT 1"))
finally:
    conn.close()`,
      solution: `class Connection:
    def open(self):
        print("Opening")
        self.active = True

    def close(self):
        print("Closing")
        self.active = False

    def query(self, sql):
        if not self.active:
            raise RuntimeError("Not connected")
        return f"Result: {sql}"

    def __enter__(self):
        self.open()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()
        return False

# Refactored usage:
with Connection() as conn:
    print(conn.query("SELECT 1"))`,
      hints: [
        'Add __enter__ that calls open() and returns self.',
        'Add __exit__ that calls close().',
        'Use "with Connection() as conn:" for automatic cleanup.',
      ],
      concepts: ['context manager', '__enter__', '__exit__', 'refactoring'],
    },
  ],
};
