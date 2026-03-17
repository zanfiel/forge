import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-typesys',
  title: '18. Type System',
  explanation: `## Type System in PHP

PHP has evolved from a dynamically typed language to one with a rich type system. Modern PHP supports union types, intersection types, nullable types, and strict mode.

### strict_types
\`\`\`php
<?php
declare(strict_types=1);

function add(int \$a, int \$b): int {
    return \$a + \$b;
}

add(1, 2);     // OK
add('1', '2'); // TypeError in strict mode!
\`\`\`

### Union Types (PHP 8.0)
\`\`\`php
function process(int|string \$input): string {
    return (string) \$input;
}
\`\`\`

### Intersection Types (PHP 8.1)
\`\`\`php
function render(Stringable&Countable \$item): string {
    return \$item . ' (' . count(\$item) . ')';
}
\`\`\`

### Nullable Types
\`\`\`php
function find(int \$id): ?User {
    // Returns User or null
    return \$id > 0 ? new User() : null;
}
\`\`\`

### Special Types
- **void** - function returns nothing
- **never** - function never returns (throws or exits)
- **mixed** - any type (explicit opt-out of type safety)
- **self** / **static** / **parent** - class reference types

### Type Coercion vs Strict
Without strict_types, PHP coerces values:
\`\`\`php
function double(int \$n): int { return \$n * 2; }
echo double('5');  // 10 (string coerced to int)
echo double('abc'); // TypeError (cannot coerce)
\`\`\`

### DNF Types (PHP 8.2)
\`\`\`php
function process((Countable&Traversable)|null \$input): void {
    // Disjunctive Normal Form - union of intersections
}
\`\`\``,
  exercises: [
    {
      id: 'php-typesys-1',
      title: 'Enable Strict Types',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to enable strict type checking.',
      skeleton: `<?php
___

function multiply(int \$a, int \$b): int {
    return \$a * \$b;
}`,
      solution: `<?php
declare(strict_types=1);

function multiply(int \$a, int \$b): int {
    return \$a * \$b;
}`,
      hints: [
        'Use declare(strict_types=1) at the top of the file.',
        'This must be the very first statement after <?php.',
        'With strict types, passing "5" to an int parameter throws TypeError.',
      ],
      concepts: ['strict_types', 'declare', 'type-safety'],
    },
    {
      id: 'php-typesys-2',
      title: 'Union Type Parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank with a union type that accepts int or float.',
      skeleton: `<?php
function absolute(___ \$num): float {
    return abs(\$num);
}`,
      solution: `<?php
function absolute(int|float \$num): float {
    return abs(\$num);
}`,
      hints: [
        'Use the pipe | operator between types.',
        'int|float means the parameter accepts either type.',
        'Union types were introduced in PHP 8.0.',
      ],
      concepts: ['union-type', 'pipe-operator', 'parameter-type'],
    },
    {
      id: 'php-typesys-3',
      title: 'Nullable Return Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank with a nullable return type.',
      skeleton: `<?php
function findUser(int \$id): ___string {
    if (\$id <= 0) return null;
    return "User_\$id";
}`,
      solution: `<?php
function findUser(int \$id): ?string {
    if (\$id <= 0) return null;
    return "User_\$id";
}`,
      hints: [
        'Prefix the type with ? to make it nullable.',
        '?string means the function can return string or null.',
        'This is shorthand for string|null.',
      ],
      concepts: ['nullable-type', 'question-mark', 'optional-return'],
    },
    {
      id: 'php-typesys-4',
      title: 'void Return Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank with the correct return type for a function that returns nothing.',
      skeleton: `<?php
function logMessage(string \$msg): ___ {
    echo "[LOG] \$msg";
}`,
      solution: `<?php
function logMessage(string \$msg): void {
    echo "[LOG] \$msg";
}`,
      hints: [
        'Use "void" when a function does not return a value.',
        'A void function can have return; (no value) or no return at all.',
        'Returning a value from a void function causes a TypeError.',
      ],
      concepts: ['void', 'return-type', 'no-return-value'],
    },
    {
      id: 'php-typesys-5',
      title: 'never Return Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank with the return type for a function that always throws.',
      skeleton: `<?php
function abort(string \$message): ___ {
    throw new RuntimeException(\$message);
}`,
      solution: `<?php
function abort(string \$message): never {
    throw new RuntimeException(\$message);
}`,
      hints: [
        'Use "never" when a function never returns normally.',
        'Functions that always throw or call exit() use never.',
        'never was introduced in PHP 8.1.',
      ],
      concepts: ['never-type', 'no-return', 'always-throws'],
    },
    {
      id: 'php-typesys-6',
      title: 'Intersection Type',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Fill in the blank with an intersection type requiring both interfaces.',
      skeleton: `<?php
interface Loggable {
    public function log(): void;
}

interface Serializable {
    public function serialize(): string;
}

function process(___ \$item): void {
    \$item->log();
    echo \$item->serialize();
}`,
      solution: `<?php
interface Loggable {
    public function log(): void;
}

interface Serializable {
    public function serialize(): string;
}

function process(Loggable&Serializable \$item): void {
    \$item->log();
    echo \$item->serialize();
}`,
      hints: [
        'Use the & operator to create an intersection type.',
        'Loggable&Serializable means the parameter must implement both.',
        'Intersection types were introduced in PHP 8.1.',
      ],
      concepts: ['intersection-type', 'ampersand', 'multi-interface'],
    },
    {
      id: 'php-typesys-7',
      title: 'Write a Type-Safe Container',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a class TypedBox with a constructor accepting mixed $value, a method get(): mixed, and a method is(string $type): bool that checks gettype() against $type.',
      skeleton: `<?php
// Write the TypedBox class`,
      solution: `<?php
class TypedBox {
    public function __construct(private mixed \$value) {}

    public function get(): mixed {
        return \$this->value;
    }

    public function is(string \$type): bool {
        return gettype(\$this->value) === \$type;
    }
}`,
      hints: [
        'Use mixed as the type for the constructor parameter.',
        'gettype() returns the type name as a string.',
        'Compare gettype() result with the $type parameter.',
      ],
      concepts: ['mixed-type', 'gettype', 'type-checking'],
    },
    {
      id: 'php-typesys-8',
      title: 'Write Type Coercion Helpers',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function toInt(mixed $value): int that safely converts a value to int. If $value is not numeric, throw InvalidArgumentException.',
      skeleton: `<?php
// Write the toInt function`,
      solution: `<?php
function toInt(mixed \$value): int {
    if (!is_numeric(\$value)) {
        throw new InvalidArgumentException('Cannot convert to int');
    }
    return (int) \$value;
}`,
      hints: [
        'Use is_numeric() to check if the value can be converted.',
        'Cast with (int) for the conversion.',
        'Throw InvalidArgumentException for non-numeric values.',
      ],
      concepts: ['type-casting', 'is_numeric', 'validation'],
    },
    {
      id: 'php-typesys-9',
      title: 'Write Union Return Type Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function parseId(string $input): int|false that tries to convert a string to a positive int. Return false if the string is not a positive integer.',
      skeleton: `<?php
// Write the parseId function`,
      solution: `<?php
function parseId(string \$input): int|false {
    if (!ctype_digit(\$input)) {
        return false;
    }
    \$id = (int) \$input;
    return \$id > 0 ? \$id : false;
}`,
      hints: [
        'Use ctype_digit() to check if the string is all digits.',
        'Return false for non-digit strings or non-positive values.',
        'The return type int|false uses a union type.',
      ],
      concepts: ['union-return', 'int|false', 'ctype_digit'],
    },
    {
      id: 'php-typesys-10',
      title: 'Write a Type Guard Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function assertString(mixed $value): string that returns the value if it is a string, otherwise throws TypeError.',
      skeleton: `<?php
// Write the assertString function`,
      solution: `<?php
function assertString(mixed \$value): string {
    if (!is_string(\$value)) {
        throw new TypeError('Expected string, got ' . gettype(\$value));
    }
    return \$value;
}`,
      hints: [
        'Check with is_string() first.',
        'Throw TypeError for non-string values.',
        'Return the value unchanged if it passes the check.',
      ],
      concepts: ['type-guard', 'assertion', 'TypeError'],
    },
    {
      id: 'php-typesys-11',
      title: 'Write Type-Safe Array Filter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function filterInts(array $items): array that returns only the integer values from a mixed array.',
      skeleton: `<?php
// Write the filterInts function`,
      solution: `<?php
function filterInts(array \$items): array {
    return array_values(array_filter(\$items, fn(mixed \$item): bool => is_int(\$item)));
}`,
      hints: [
        'Use array_filter with is_int as the predicate.',
        'Wrap with array_values to re-index the result.',
        'The callback checks each item with is_int().',
      ],
      concepts: ['array_filter', 'is_int', 'type-filtering'],
    },
    {
      id: 'php-typesys-12',
      title: 'Write Strict Comparison Helper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function strictEquals(mixed $a, mixed $b): bool that returns true only if both values are the same type AND equal. Use gettype() and ===.',
      skeleton: `<?php
// Write the strictEquals function`,
      solution: `<?php
function strictEquals(mixed \$a, mixed \$b): bool {
    return gettype(\$a) === gettype(\$b) && \$a === \$b;
}`,
      hints: [
        'First check that types match with gettype().',
        'Then check value equality with ===.',
        'Both conditions must be true.',
      ],
      concepts: ['strict-comparison', 'gettype', 'identity-check'],
    },
    {
      id: 'php-typesys-13',
      title: 'Fix Missing Return Type',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the function by adding the correct return type.',
      skeleton: `<?php
declare(strict_types=1);

function greet(string \$name) {
    return "Hello, \$name!";
}

echo greet('World');`,
      solution: `<?php
declare(strict_types=1);

function greet(string \$name): string {
    return "Hello, \$name!";
}

echo greet('World');`,
      hints: [
        'The function returns a string but has no return type.',
        'Add : string after the parameter list.',
        'In strict mode, it is best practice to always declare return types.',
      ],
      concepts: ['return-type', 'type-declaration', 'best-practice'],
    },
    {
      id: 'php-typesys-14',
      title: 'Fix Nullable Type Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the type error - the function can return null but the type does not allow it.',
      skeleton: `<?php
declare(strict_types=1);

function first(array \$items): string {
    if (empty(\$items)) {
        return null;
    }
    return (string) \$items[0];
}`,
      solution: `<?php
declare(strict_types=1);

function first(array \$items): ?string {
    if (empty(\$items)) {
        return null;
    }
    return (string) \$items[0];
}`,
      hints: [
        'The function returns null when the array is empty.',
        'The return type string does not allow null.',
        'Change to ?string to make it nullable.',
      ],
      concepts: ['nullable-type', 'null-return', 'type-error'],
    },
    {
      id: 'php-typesys-15',
      title: 'Fix Union Type Mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the type declaration to match what the function actually returns.',
      skeleton: `<?php
declare(strict_types=1);

function getValue(string \$key): int {
    \$data = ['count' => 42, 'name' => 'test'];
    return \$data[\$key] ?? false;
}`,
      solution: `<?php
declare(strict_types=1);

function getValue(string \$key): int|string|false {
    \$data = ['count' => 42, 'name' => 'test'];
    return \$data[\$key] ?? false;
}`,
      hints: [
        'The $data array contains both int and string values.',
        'The ?? operator can return false.',
        'The return type must be int|string|false.',
      ],
      concepts: ['union-type', 'mixed-returns', 'null-coalescing'],
    },
    {
      id: 'php-typesys-16',
      title: 'Predict Strict Types Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict what happens when strict_types is enabled.',
      skeleton: `<?php
declare(strict_types=1);

function add(int \$a, int \$b): int {
    return \$a + \$b;
}

try {
    echo add(3, 4);
    echo ' ';
    echo add('3', '4');
} catch (TypeError \$e) {
    echo 'type error';
}`,
      solution: `7 type error`,
      hints: [
        'add(3, 4) works fine and outputs 7.',
        'With strict_types, passing strings to int params throws TypeError.',
        '"type error" is printed from the catch block.',
      ],
      concepts: ['strict_types', 'TypeError', 'type-coercion'],
    },
    {
      id: 'php-typesys-17',
      title: 'Predict Coercion Without Strict',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what this code outputs WITHOUT strict_types.',
      skeleton: `<?php
function double(int \$n): int {
    return \$n * 2;
}

echo double(5) . ' ';
echo double('3') . ' ';
echo double(2.9);`,
      solution: `10 6 4`,
      hints: [
        'Without strict_types, PHP coerces compatible values.',
        '"3" is coerced to 3, and 2.9 is truncated to 2.',
        'double(5)=10, double("3")=6, double(2.9)=4.',
      ],
      concepts: ['type-coercion', 'implicit-cast', 'float-to-int'],
    },
    {
      id: 'php-typesys-18',
      title: 'Predict Nullable Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
function maybe(?int \$val): string {
    return \$val === null ? 'none' : "got \$val";
}

echo maybe(42) . ' ';
echo maybe(null) . ' ';
echo maybe(0);`,
      solution: `got 42 none got 0`,
      hints: [
        'maybe(42) returns "got 42".',
        'maybe(null) returns "none" since $val is null.',
        'maybe(0) returns "got 0" - 0 is not null.',
      ],
      concepts: ['nullable-parameter', 'null-check', 'zero-vs-null'],
    },
    {
      id: 'php-typesys-19',
      title: 'Refactor Loose Types to Strict',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the loosely typed function to use proper types and strict_types.',
      skeleton: `<?php
function createUser(\$name, \$age, \$email) {
    return [
        'name' => \$name,
        'age' => \$age,
        'email' => \$email,
    ];
}`,
      solution: `<?php
declare(strict_types=1);

function createUser(string \$name, int \$age, string \$email): array {
    return [
        'name' => \$name,
        'age' => \$age,
        'email' => \$email,
    ];
}`,
      hints: [
        'Add declare(strict_types=1) at the top.',
        'Add type declarations for each parameter.',
        'Add the return type array.',
      ],
      concepts: ['strict-mode', 'parameter-types', 'return-type'],
    },
    {
      id: 'php-typesys-20',
      title: 'Refactor Mixed to Union Types',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the mixed types to use specific union types for better type safety.',
      skeleton: `<?php
function format(mixed \$value): mixed {
    if (is_int(\$value)) {
        return number_format(\$value);
    }
    if (is_float(\$value)) {
        return number_format(\$value, 2);
    }
    if (is_string(\$value)) {
        return trim(\$value);
    }
    return null;
}`,
      solution: `<?php
function format(int|float|string \$value): string {
    if (is_int(\$value)) {
        return number_format(\$value);
    }
    if (is_float(\$value)) {
        return number_format(\$value, 2);
    }
    return trim(\$value);
}`,
      hints: [
        'The function only handles int, float, and string.',
        'Use int|float|string instead of mixed for the parameter.',
        'The return is always string (number_format and trim both return string).',
      ],
      concepts: ['union-type', 'type-narrowing', 'mixed-replacement'],
    },
  ],
};
