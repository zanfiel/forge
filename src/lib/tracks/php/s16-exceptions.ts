import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-except',
  title: '16. Exceptions',
  explanation: `## Exceptions in PHP

Exceptions provide a structured way to handle errors. PHP uses **try/catch/finally** blocks.

### Basic try/catch
\`\`\`php
try {
    \$result = riskyOperation();
} catch (RuntimeException \$e) {
    echo 'Error: ' . \$e->getMessage();
} finally {
    echo 'Cleanup done.';
}
\`\`\`

### Exception Hierarchy
\`\`\`
Throwable
├── Error (engine errors)
│   ├── TypeError
│   ├── ValueError
│   └── ...
└── Exception
    ├── RuntimeException
    ├── LogicException
    │   ├── InvalidArgumentException
    │   ├── OutOfRangeException
    │   └── ...
    └── ...
\`\`\`

### Custom Exceptions
\`\`\`php
class InsufficientFundsException extends RuntimeException {
    public function __construct(
        private float \$amount,
        string \$message = 'Insufficient funds',
        int \$code = 0,
        ?Throwable \$previous = null
    ) {
        parent::__construct(\$message, \$code, \$previous);
    }

    public function getAmount(): float {
        return \$this->amount;
    }
}
\`\`\`

### Multiple Catch Blocks
\`\`\`php
try {
    process();
} catch (InvalidArgumentException \$e) {
    // Handle bad arguments
} catch (RuntimeException \$e) {
    // Handle runtime errors
} catch (Exception \$e) {
    // Catch-all for other exceptions
}
\`\`\`

### Union Catch (PHP 8.0+)
\`\`\`php
try {
    process();
} catch (TypeError | ValueError \$e) {
    echo 'Type or value error: ' . \$e->getMessage();
}
\`\`\`

### Previous Exception (Chaining)
\`\`\`php
try {
    connectToDb();
} catch (PDOException \$e) {
    throw new AppException('DB failed', 0, \$e); // chain original
}
\`\`\``,
  exercises: [
    {
      id: 'php-except-1',
      title: 'Basic try/catch',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to write a basic try/catch block.',
      skeleton: `<?php
___ {
    throw new RuntimeException('Something failed');
} ___ (RuntimeException \$e) {
    echo \$e->___();
}`,
      solution: `<?php
try {
    throw new RuntimeException('Something failed');
} catch (RuntimeException \$e) {
    echo \$e->getMessage();
}`,
      hints: [
        'Use "try" to begin the block and "catch" for handling.',
        'The catch block specifies the exception type.',
        'getMessage() retrieves the exception message.',
      ],
      concepts: ['try-catch', 'getMessage', 'RuntimeException'],
    },
    {
      id: 'php-except-2',
      title: 'try/catch/finally',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to add a finally block.',
      skeleton: `<?php
\$resource = 'open';
try {
    throw new Exception('Error');
} catch (Exception \$e) {
    echo \$e->getMessage();
} ___ {
    \$resource = ___;
    echo ' cleaned';
}`,
      solution: `<?php
\$resource = 'open';
try {
    throw new Exception('Error');
} catch (Exception \$e) {
    echo \$e->getMessage();
} finally {
    \$resource = 'closed';
    echo ' cleaned';
}`,
      hints: [
        'The "finally" block always executes.',
        'It runs whether an exception was caught or not.',
        'Set the resource to "closed" in the finally block.',
      ],
      concepts: ['finally', 'cleanup', 'resource-management'],
    },
    {
      id: 'php-except-3',
      title: 'Multiple Catch Blocks',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks for multiple catch blocks.',
      skeleton: `<?php
try {
    \$val = -1;
    if (\$val < 0) {
        throw new ___('Negative value');
    }
} catch (InvalidArgumentException \$e) {
    echo 'Arg: ' . \$e->getMessage();
} ___ (RuntimeException \$e) {
    echo 'Runtime: ' . \$e->getMessage();
}`,
      solution: `<?php
try {
    \$val = -1;
    if (\$val < 0) {
        throw new InvalidArgumentException('Negative value');
    }
} catch (InvalidArgumentException \$e) {
    echo 'Arg: ' . \$e->getMessage();
} catch (RuntimeException \$e) {
    echo 'Runtime: ' . \$e->getMessage();
}`,
      hints: [
        'Throw an InvalidArgumentException for bad input.',
        'Multiple catch blocks each handle a different type.',
        'The most specific catch should come first.',
      ],
      concepts: ['multiple-catch', 'exception-hierarchy', 'specificity'],
    },
    {
      id: 'php-except-4',
      title: 'Union Catch Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to catch multiple exception types with a union.',
      skeleton: `<?php
try {
    \$data = json_decode('invalid', true, 512, JSON_THROW_ON_ERROR);
} catch (TypeError ___ JsonException \$e) {
    echo 'Error: ' . \$e->getMessage();
}`,
      solution: `<?php
try {
    \$data = json_decode('invalid', true, 512, JSON_THROW_ON_ERROR);
} catch (TypeError | JsonException \$e) {
    echo 'Error: ' . \$e->getMessage();
}`,
      hints: [
        'Use the pipe | operator to catch multiple types.',
        'This is a PHP 8.0+ feature.',
        'Both TypeError and JsonException are caught by the same block.',
      ],
      concepts: ['union-catch', 'pipe-operator', 'php8'],
    },
    {
      id: 'php-except-5',
      title: 'Re-throw an Exception',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to catch, log, and re-throw an exception.',
      skeleton: `<?php
function process(): void {
    try {
        throw new RuntimeException('fail');
    } catch (RuntimeException \$e) {
        echo 'Logged: ' . \$e->getMessage();
        ___ \$e;
    }
}`,
      solution: `<?php
function process(): void {
    try {
        throw new RuntimeException('fail');
    } catch (RuntimeException \$e) {
        echo 'Logged: ' . \$e->getMessage();
        throw \$e;
    }
}`,
      hints: [
        'Use "throw" to re-throw the caught exception.',
        'This allows higher-level code to also handle it.',
        'The original exception object is re-thrown unchanged.',
      ],
      concepts: ['re-throw', 'exception-propagation', 'logging'],
    },
    {
      id: 'php-except-6',
      title: 'Exception Chaining',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Fill in the blanks to chain a previous exception.',
      skeleton: `<?php
try {
    throw new RuntimeException('Original error');
} catch (RuntimeException \$e) {
    throw new LogicException('Wrapped', 0, ___);
}`,
      solution: `<?php
try {
    throw new RuntimeException('Original error');
} catch (RuntimeException \$e) {
    throw new LogicException('Wrapped', 0, \$e);
}`,
      hints: [
        'The third parameter of Exception constructor is the previous exception.',
        'Pass the caught exception $e as the previous.',
        'This preserves the original error for debugging.',
      ],
      concepts: ['exception-chaining', 'previous-exception', 'wrapping'],
    },
    {
      id: 'php-except-7',
      title: 'Write a Custom Exception',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a custom exception class ValidationException that extends RuntimeException. It should accept a $field parameter, store it, and provide a getField(): string method.',
      skeleton: `<?php
// Write the ValidationException class`,
      solution: `<?php
class ValidationException extends RuntimeException {
    public function __construct(
        private string \$field,
        string \$message = '',
        int \$code = 0,
        ?\\Throwable \$previous = null
    ) {
        parent::__construct(\$message, \$code, \$previous);
    }

    public function getField(): string {
        return \$this->field;
    }
}`,
      hints: [
        'Extend RuntimeException.',
        'Add a $field parameter to the constructor.',
        'Call parent::__construct to pass message, code, previous.',
      ],
      concepts: ['custom-exception', 'extends', 'constructor-chaining'],
    },
    {
      id: 'php-except-8',
      title: 'Write an Exception Handler',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function safeJsonDecode(string $json): array that wraps json_decode with JSON_THROW_ON_ERROR and catches JsonException. Return the decoded array on success or an empty array on failure.',
      skeleton: `<?php
// Write the safeJsonDecode function`,
      solution: `<?php
function safeJsonDecode(string \$json): array {
    try {
        return json_decode(\$json, true, 512, JSON_THROW_ON_ERROR);
    } catch (\\JsonException \$e) {
        return [];
    }
}`,
      hints: [
        'Use JSON_THROW_ON_ERROR flag to throw on invalid JSON.',
        'Catch JsonException and return empty array.',
        'The second arg true makes json_decode return arrays.',
      ],
      concepts: ['json-error-handling', 'JSON_THROW_ON_ERROR', 'try-catch'],
    },
    {
      id: 'php-except-9',
      title: 'Write Exception Hierarchy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write an exception hierarchy: AppException extends RuntimeException, NotFoundException extends AppException, and ForbiddenException extends AppException. Each should call parent constructor.',
      skeleton: `<?php
// Write the exception hierarchy`,
      solution: `<?php
class AppException extends RuntimeException {
    public function __construct(string \$message = '', int \$code = 0, ?\\Throwable \$previous = null) {
        parent::__construct(\$message, \$code, \$previous);
    }
}

class NotFoundException extends AppException {
    public function __construct(string \$message = 'Not Found', int \$code = 404, ?\\Throwable \$previous = null) {
        parent::__construct(\$message, \$code, \$previous);
    }
}

class ForbiddenException extends AppException {
    public function __construct(string \$message = 'Forbidden', int \$code = 403, ?\\Throwable \$previous = null) {
        parent::__construct(\$message, \$code, \$previous);
    }
}`,
      hints: [
        'AppException is the base, extending RuntimeException.',
        'NotFoundException and ForbiddenException extend AppException.',
        'Give meaningful default messages and HTTP-like codes.',
      ],
      concepts: ['exception-hierarchy', 'inheritance', 'default-parameters'],
    },
    {
      id: 'php-except-10',
      title: 'Write a Retry Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function retry(callable $fn, int $maxAttempts = 3): mixed that calls $fn up to $maxAttempts times. If $fn throws, retry. If all attempts fail, re-throw the last exception.',
      skeleton: `<?php
// Write the retry function`,
      solution: `<?php
function retry(callable \$fn, int \$maxAttempts = 3): mixed {
    \$lastException = null;
    for (\$i = 0; \$i < \$maxAttempts; \$i++) {
        try {
            return \$fn();
        } catch (\\Exception \$e) {
            \$lastException = \$e;
        }
    }
    throw \$lastException;
}`,
      hints: [
        'Loop up to $maxAttempts times.',
        'Try calling $fn; return on success.',
        'Store the last exception and throw it after all attempts fail.',
      ],
      concepts: ['retry-pattern', 'exception-handling', 'callable'],
    },
    {
      id: 'php-except-11',
      title: 'Write Error to Exception Converter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function that sets a custom error handler using set_error_handler to convert PHP warnings/notices into ErrorException instances.',
      skeleton: `<?php
// Write the error-to-exception converter`,
      solution: `<?php
set_error_handler(function (int \$severity, string \$message, string \$file, int \$line): bool {
    throw new ErrorException(\$message, 0, \$severity, \$file, \$line);
});`,
      hints: [
        'set_error_handler takes a callable.',
        'The handler receives severity, message, file, and line.',
        'Throw a new ErrorException with those parameters.',
      ],
      concepts: ['set_error_handler', 'ErrorException', 'error-conversion'],
    },
    {
      id: 'php-except-12',
      title: 'Write getPrevious Chain Walker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function getExceptionChain(Throwable $e): array that returns an array of all exception messages in the chain (using getPrevious()).',
      skeleton: `<?php
// Write the getExceptionChain function`,
      solution: `<?php
function getExceptionChain(\\Throwable \$e): array {
    \$messages = [];
    while (\$e !== null) {
        \$messages[] = \$e->getMessage();
        \$e = \$e->getPrevious();
    }
    return \$messages;
}`,
      hints: [
        'Start with the given exception.',
        'Loop while $e is not null.',
        'Collect getMessage() and move to getPrevious().',
      ],
      concepts: ['exception-chaining', 'getPrevious', 'chain-traversal'],
    },
    {
      id: 'php-except-13',
      title: 'Fix Catching Wrong Exception Type',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the code that catches the wrong exception type.',
      skeleton: `<?php
function divide(int \$a, int \$b): float {
    if (\$b === 0) {
        throw new InvalidArgumentException('Division by zero');
    }
    return \$a / \$b;
}

try {
    echo divide(10, 0);
} catch (TypeError \$e) {
    echo 'Error: ' . \$e->getMessage();
}`,
      solution: `<?php
function divide(int \$a, int \$b): float {
    if (\$b === 0) {
        throw new InvalidArgumentException('Division by zero');
    }
    return \$a / \$b;
}

try {
    echo divide(10, 0);
} catch (InvalidArgumentException \$e) {
    echo 'Error: ' . \$e->getMessage();
}`,
      hints: [
        'The function throws InvalidArgumentException, not TypeError.',
        'The catch type must match the thrown exception.',
        'Change TypeError to InvalidArgumentException.',
      ],
      concepts: ['exception-type-mismatch', 'catch-specificity'],
    },
    {
      id: 'php-except-14',
      title: 'Fix Missing Parent Constructor Call',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the custom exception that forgets to call the parent constructor.',
      skeleton: `<?php
class ApiException extends RuntimeException {
    private int \$statusCode;

    public function __construct(string \$message, int \$statusCode) {
        \$this->statusCode = \$statusCode;
    }

    public function getStatusCode(): int {
        return \$this->statusCode;
    }
}

\$e = new ApiException('Not Found', 404);
echo \$e->getMessage(); // outputs empty string!`,
      solution: `<?php
class ApiException extends RuntimeException {
    private int \$statusCode;

    public function __construct(string \$message, int \$statusCode) {
        parent::__construct(\$message);
        \$this->statusCode = \$statusCode;
    }

    public function getStatusCode(): int {
        return \$this->statusCode;
    }
}

\$e = new ApiException('Not Found', 404);
echo \$e->getMessage();`,
      hints: [
        'The parent constructor sets the message property.',
        'Without calling parent::__construct, getMessage() returns empty.',
        'Add parent::__construct($message) in the constructor.',
      ],
      concepts: ['parent-constructor', 'exception-message', 'constructor-chaining'],
    },
    {
      id: 'php-except-15',
      title: 'Fix Catch Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the catch block order so specific exceptions are caught before general ones.',
      skeleton: `<?php
try {
    throw new InvalidArgumentException('Bad input');
} catch (Exception \$e) {
    echo 'General: ' . \$e->getMessage();
} catch (InvalidArgumentException \$e) {
    echo 'Specific: ' . \$e->getMessage();
}`,
      solution: `<?php
try {
    throw new InvalidArgumentException('Bad input');
} catch (InvalidArgumentException \$e) {
    echo 'Specific: ' . \$e->getMessage();
} catch (Exception \$e) {
    echo 'General: ' . \$e->getMessage();
}`,
      hints: [
        'More specific exception types must be caught first.',
        'Exception catches everything, so InvalidArgumentException never runs.',
        'Swap the order: specific before general.',
      ],
      concepts: ['catch-order', 'specificity', 'unreachable-catch'],
    },
    {
      id: 'php-except-16',
      title: 'Predict try/catch Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
try {
    echo 'A';
    throw new RuntimeException('fail');
    echo 'B';
} catch (RuntimeException \$e) {
    echo 'C';
} finally {
    echo 'D';
}`,
      solution: `ACD`,
      hints: [
        '"A" prints before the exception is thrown.',
        '"B" is skipped because the exception interrupts flow.',
        '"C" prints in catch, "D" always prints in finally.',
      ],
      concepts: ['execution-flow', 'finally', 'exception-interruption'],
    },
    {
      id: 'php-except-17',
      title: 'Predict Nested try/catch',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
try {
    try {
        throw new RuntimeException('inner');
    } catch (InvalidArgumentException \$e) {
        echo 'caught inner';
    }
} catch (RuntimeException \$e) {
    echo \$e->getMessage();
}`,
      solution: `inner`,
      hints: [
        'The inner catch does not match RuntimeException.',
        'The exception propagates to the outer try/catch.',
        'The outer catch handles RuntimeException and prints "inner".',
      ],
      concepts: ['exception-propagation', 'nested-try', 'catch-mismatch'],
    },
    {
      id: 'php-except-18',
      title: 'Predict Finally with Return',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
function test(): string {
    try {
        return 'try';
    } finally {
        echo 'finally ';
    }
}

echo test();`,
      solution: `finally try`,
      hints: [
        'finally runs even when try has a return statement.',
        'The echo in finally prints before the function returns.',
        '"finally " is echoed first, then test() returns "try".',
      ],
      concepts: ['finally-with-return', 'execution-order', 'guaranteed-cleanup'],
    },
    {
      id: 'php-except-19',
      title: 'Refactor Error Codes to Exceptions',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the error-code-returning function to use exceptions instead.',
      skeleton: `<?php
function parseAge(string \$input): int|string {
    if (!is_numeric(\$input)) {
        return 'ERROR: not a number';
    }
    \$age = (int) \$input;
    if (\$age < 0 || \$age > 150) {
        return 'ERROR: out of range';
    }
    return \$age;
}

\$result = parseAge('abc');
if (is_string(\$result)) {
    echo \$result;
} else {
    echo "Age: \$result";
}`,
      solution: `<?php
function parseAge(string \$input): int {
    if (!is_numeric(\$input)) {
        throw new InvalidArgumentException('Not a number');
    }
    \$age = (int) \$input;
    if (\$age < 0 || \$age > 150) {
        throw new RangeException('Out of range');
    }
    return \$age;
}

try {
    \$age = parseAge('abc');
    echo "Age: \$age";
} catch (InvalidArgumentException | RangeException \$e) {
    echo 'Error: ' . \$e->getMessage();
}`,
      hints: [
        'Replace error strings with thrown exceptions.',
        'Use InvalidArgumentException for bad input type.',
        'Use RangeException for out-of-range values.',
      ],
      concepts: ['error-to-exception', 'clean-api', 'exception-types'],
    },
    {
      id: 'php-except-20',
      title: 'Refactor to Custom Exception Hierarchy',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the generic exception usage into a proper hierarchy.',
      skeleton: `<?php
function findUser(int \$id): array {
    if (\$id <= 0) {
        throw new Exception('Invalid ID');
    }
    if (\$id > 1000) {
        throw new Exception('User not found');
    }
    return ['id' => \$id, 'name' => 'User'];
}

try {
    findUser(-1);
} catch (Exception \$e) {
    // Can't distinguish between invalid ID and not found
    echo \$e->getMessage();
}`,
      solution: `<?php
class InvalidIdException extends InvalidArgumentException {}
class UserNotFoundException extends RuntimeException {}

function findUser(int \$id): array {
    if (\$id <= 0) {
        throw new InvalidIdException('Invalid ID');
    }
    if (\$id > 1000) {
        throw new UserNotFoundException('User not found');
    }
    return ['id' => \$id, 'name' => 'User'];
}

try {
    findUser(-1);
} catch (InvalidIdException \$e) {
    echo 'Bad ID: ' . \$e->getMessage();
} catch (UserNotFoundException \$e) {
    echo 'Not found: ' . \$e->getMessage();
}`,
      hints: [
        'Create specific exception classes for each error case.',
        'InvalidIdException extends InvalidArgumentException.',
        'UserNotFoundException extends RuntimeException.',
      ],
      concepts: ['exception-hierarchy', 'specific-exceptions', 'clean-error-handling'],
    },
  ],
};
