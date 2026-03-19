import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-types-adv',
  title: '44. Intersection & Union Types',
  explanation: `## Intersection & Union Types

PHP 8.0 introduced union types, PHP 8.1 added intersection types, and PHP 8.2 brought DNF (Disjunctive Normal Form) types, combining both.

### Union Types (PHP 8.0)
\`\`\`php
<?php
function format(int|float \$number): string {
    return number_format(\$number, 2);
}

function find(string \$key): string|false {
    \$data = ['a' => 'apple'];
    return \$data[\$key] ?? false;
}
\`\`\`

### Intersection Types (PHP 8.1)
\`\`\`php
<?php
interface Loggable {
    public function log(): void;
}

interface Serializable {
    public function serialize(): string;
}

function process(Loggable&Serializable \$item): void {
    \$item->log();
    echo \$item->serialize();
}
\`\`\`

### DNF Types (PHP 8.2)
\`\`\`php
<?php
// Union of intersections, or intersection with null
function handle((Countable&Traversable)|null \$data): void {
    if (\$data === null) return;
    foreach (\$data as \$item) {
        // ...
    }
}
\`\`\`

### Nullable Unions
\`\`\`php
<?php
function search(string \$q): User|null {
    // Equivalent to ?User
    return null;
}
\`\`\`

### Type Narrowing
\`\`\`php
<?php
function display(int|string \$val): void {
    if (is_int(\$val)) {
        echo \$val * 2; // PHP knows it is int here
    } else {
        echo strtoupper(\$val); // PHP knows it is string here
    }
}
\`\`\``,
  exercises: [
    {
      id: 'php-types-adv-1',
      title: 'Basic Union Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to accept either int or string.',
      skeleton: `<?php
function display(___ \$value): string {
    return (string) \$value;
}`,
      solution: `<?php
function display(int|string \$value): string {
    return (string) \$value;
}`,
      hints: [
        'Use | to separate types in a union.',
        'int|string accepts either type.',
        'Union types were added in PHP 8.0.',
      ],
      concepts: ['union-type', 'pipe-operator', 'PHP-8.0'],
    },
    {
      id: 'php-types-adv-2',
      title: 'Union with false',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank for a function that returns string or false.',
      skeleton: `<?php
function findItem(int \$id): ___ {
    \$items = [1 => 'apple', 2 => 'banana'];
    return \$items[\$id] ?? false;
}`,
      solution: `<?php
function findItem(int \$id): string|false {
    \$items = [1 => 'apple', 2 => 'banana'];
    return \$items[\$id] ?? false;
}`,
      hints: [
        'Use string|false for functions that return string or false.',
        'false is a standalone type in unions since PHP 8.0.',
        'This is common for lookup functions.',
      ],
      concepts: ['false-type', 'union', 'lookup-pattern'],
    },
    {
      id: 'php-types-adv-3',
      title: 'Basic Intersection Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to require a parameter implementing both interfaces.',
      skeleton: `<?php
interface Readable {
    public function read(): string;
}
interface Closeable {
    public function close(): void;
}

function consume(___ \$stream): string {
    \$data = \$stream->read();
    \$stream->close();
    return \$data;
}`,
      solution: `<?php
interface Readable {
    public function read(): string;
}
interface Closeable {
    public function close(): void;
}

function consume(Readable&Closeable \$stream): string {
    \$data = \$stream->read();
    \$stream->close();
    return \$data;
}`,
      hints: [
        'Use & to create an intersection type.',
        'Readable&Closeable means must implement both.',
        'Intersection types were added in PHP 8.1.',
      ],
      concepts: ['intersection-type', 'ampersand', 'multi-interface'],
    },
    {
      id: 'php-types-adv-4',
      title: 'DNF Type',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Fill in the blank to accept a Countable&Traversable intersection, or null.',
      skeleton: `<?php
function process(___): int {
    if (\$data === null) return 0;
    return count(\$data);
}`,
      solution: `<?php
function process((Countable&Traversable)|null \$data): int {
    if (\$data === null) return 0;
    return count(\$data);
}`,
      hints: [
        'DNF types wrap intersection in parentheses.',
        '(Countable&Traversable)|null is the DNF form.',
        'This was introduced in PHP 8.2.',
      ],
      concepts: ['DNF-type', 'parentheses', 'nullable-intersection'],
    },
    {
      id: 'php-types-adv-5',
      title: 'Nullable Union Shorthand',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to make the parameter nullable using union syntax.',
      skeleton: `<?php
function greet(___ \$name): string {
    return 'Hello, ' . (\$name ?? 'stranger');
}`,
      solution: `<?php
function greet(string|null \$name): string {
    return 'Hello, ' . (\$name ?? 'stranger');
}`,
      hints: [
        'string|null is equivalent to ?string.',
        'The union form is more explicit.',
        'Use null coalescing for the default.',
      ],
      concepts: ['nullable-union', 'string|null', 'explicit-null'],
    },
    {
      id: 'php-types-adv-6',
      title: 'Type Narrowing with is_int',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to narrow the union type and handle each case.',
      skeleton: `<?php
function double(int|string \$val): int|string {
    if (___(\$val)) {
        return \$val * 2;
    }
    return \$val . \$val;
}`,
      solution: `<?php
function double(int|string \$val): int|string {
    if (is_int(\$val)) {
        return \$val * 2;
    }
    return \$val . \$val;
}`,
      hints: [
        'Use is_int() to check if the value is an integer.',
        'After the check, PHP knows the type in each branch.',
        'This is called type narrowing.',
      ],
      concepts: ['type-narrowing', 'is_int', 'branching'],
    },
    {
      id: 'php-types-adv-7',
      title: 'Write Type-Safe Coerce',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Write a function toString(int|float|bool $value): string that converts any of the accepted types to a string representation.',
      skeleton: `<?php
// Write the toString function`,
      solution: `<?php
function toString(int|float|bool \$value): string {
    if (is_bool(\$value)) {
        return \$value ? 'true' : 'false';
    }
    return (string) \$value;
}`,
      hints: [
        'Check booleans first since (string) true gives "1".',
        'Cast numbers to string with (string).',
        'Handle each type appropriately.',
      ],
      concepts: ['type-coercion', 'union-type', 'bool-handling'],
    },
    {
      id: 'php-types-adv-8',
      title: 'Write Intersection Type Adapter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write interfaces Printable (method print(): string) and Measurable (method size(): int), then write a function summarize(Printable&Measurable $item): string that returns "{print result} ({size} bytes)".',
      skeleton: `<?php
// Write interfaces and the summarize function`,
      solution: `<?php
interface Printable {
    public function print(): string;
}

interface Measurable {
    public function size(): int;
}

function summarize(Printable&Measurable \$item): string {
    return \$item->print() . ' (' . \$item->size() . ' bytes)';
}`,
      hints: [
        'Define both interfaces with their methods.',
        'Use intersection type Printable&Measurable for the parameter.',
        'Call both interface methods on the parameter.',
      ],
      concepts: ['intersection-type', 'interface-design', 'combined-behavior'],
    },
    {
      id: 'php-types-adv-9',
      title: 'Write Union Type Processor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function normalize(int|float|string $input): float that converts any input to a float. Strings must be numeric or throw InvalidArgumentException.',
      skeleton: `<?php
// Write the normalize function`,
      solution: `<?php
function normalize(int|float|string \$input): float {
    if (is_string(\$input)) {
        if (!is_numeric(\$input)) {
            throw new InvalidArgumentException("Non-numeric string: \$input");
        }
        return (float) \$input;
    }
    return (float) \$input;
}`,
      hints: [
        'Check is_string() for the string case.',
        'Validate numeric strings with is_numeric().',
        'Cast all values to float.',
      ],
      concepts: ['union-processing', 'validation', 'type-narrowing'],
    },
    {
      id: 'php-types-adv-10',
      title: 'Write a Null-Safe Pipeline',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function transform(string|null $input): string|null that returns null if input is null, otherwise returns the trimmed, lowercased input.',
      skeleton: `<?php
// Write the transform function`,
      solution: `<?php
function transform(string|null \$input): string|null {
    if (\$input === null) {
        return null;
    }
    return strtolower(trim(\$input));
}`,
      hints: [
        'Check for null first and return early.',
        'Apply trim() then strtolower() to the string.',
        'The return type mirrors the input nullability.',
      ],
      concepts: ['null-safe', 'early-return', 'string-processing'],
    },
    {
      id: 'php-types-adv-11',
      title: 'Write a Type Discriminator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function describe(int|float|string|bool|null $val): string that returns a description like "integer: 42", "float: 3.14", "string: hello", "boolean: true", or "null".',
      skeleton: `<?php
// Write the describe function`,
      solution: `<?php
function describe(int|float|string|bool|null \$val): string {
    if (\$val === null) return 'null';
    if (is_bool(\$val)) return 'boolean: ' . (\$val ? 'true' : 'false');
    if (is_int(\$val)) return 'integer: ' . \$val;
    if (is_float(\$val)) return 'float: ' . \$val;
    return 'string: ' . \$val;
}`,
      hints: [
        'Check null and bool before int (since bools are ints internally).',
        'Use is_bool, is_int, is_float to discriminate.',
        'Order of checks matters for correctness.',
      ],
      concepts: ['type-discrimination', 'check-order', 'wide-union'],
    },
    {
      id: 'php-types-adv-12',
      title: 'Write DNF Type Handler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function countOrDefault((Countable&Traversable)|null $data, int $default): int that returns the count of $data or $default if null.',
      skeleton: `<?php
// Write the countOrDefault function`,
      solution: `<?php
function countOrDefault((Countable&Traversable)|null \$data, int \$default): int {
    if (\$data === null) {
        return \$default;
    }
    return count(\$data);
}`,
      hints: [
        'DNF type (Countable&Traversable)|null wraps intersection in parens.',
        'Check for null first.',
        'Use count() on non-null data.',
      ],
      concepts: ['DNF-type', 'null-check', 'default-value'],
    },
    {
      id: 'php-types-adv-13',
      title: 'Fix Missing Union Type',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the return type that does not account for the false return value.',
      skeleton: `<?php
function search(array \$haystack, mixed \$needle): int {
    \$index = array_search(\$needle, \$haystack);
    return \$index;
}`,
      solution: `<?php
function search(array \$haystack, mixed \$needle): int|false {
    \$index = array_search(\$needle, \$haystack);
    return \$index;
}`,
      hints: [
        'array_search returns int or false.',
        'The return type must include false.',
        'Change to int|false.',
      ],
      concepts: ['union-return', 'false-type', 'array_search'],
    },
    {
      id: 'php-types-adv-14',
      title: 'Fix Intersection Syntax Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the incorrect intersection type syntax.',
      skeleton: `<?php
interface A { public function a(): void; }
interface B { public function b(): void; }

function process(A|B \$item): void {
    \$item->a();
    \$item->b();
}`,
      solution: `<?php
interface A { public function a(): void; }
interface B { public function b(): void; }

function process(A&B \$item): void {
    \$item->a();
    \$item->b();
}`,
      hints: [
        'A|B means A OR B (only one is guaranteed).',
        'A&B means A AND B (both are guaranteed).',
        'Use & for intersection when you need both.',
      ],
      concepts: ['union-vs-intersection', 'ampersand', 'both-required'],
    },
    {
      id: 'php-types-adv-15',
      title: 'Fix Missing Null Check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the function that accepts nullable but does not handle null.',
      skeleton: `<?php
function length(string|null \$text): int {
    return strlen(\$text);
}`,
      solution: `<?php
function length(string|null \$text): int {
    if (\$text === null) {
        return 0;
    }
    return strlen(\$text);
}`,
      hints: [
        'strlen(null) triggers a deprecation warning in PHP 8.1+.',
        'Check for null before calling strlen.',
        'Return 0 or another default for null input.',
      ],
      concepts: ['null-handling', 'guard-clause', 'strlen-null'],
    },
    {
      id: 'php-types-adv-16',
      title: 'Predict Union Type Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output when processing different union type values.',
      skeleton: `<?php
function label(int|string \$v): string {
    return is_int(\$v) ? "num:\$v" : "str:\$v";
}
echo label(42) . ' ' . label('hi');`,
      solution: `num:42 str:hi`,
      hints: [
        'is_int(42) is true, so "num:42".',
        'is_int("hi") is false, so "str:hi".',
        'Type narrowing selects the right branch.',
      ],
      concepts: ['type-narrowing', 'is_int', 'output'],
    },
    {
      id: 'php-types-adv-17',
      title: 'Predict false Return',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output of a function that returns int|false.',
      skeleton: `<?php
function pos(string \$haystack, string \$needle): int|false {
    return strpos(\$haystack, \$needle);
}
\$r1 = pos('hello', 'l');
\$r2 = pos('hello', 'x');
echo (\$r1 !== false ? \$r1 : 'no') . ' ' . (\$r2 !== false ? \$r2 : 'no');`,
      solution: `2 no`,
      hints: [
        'strpos("hello", "l") returns 2.',
        'strpos("hello", "x") returns false.',
        'Use !== false to check (not == because 0 is falsy).',
      ],
      concepts: ['strpos', 'false-return', 'strict-comparison'],
    },
    {
      id: 'php-types-adv-18',
      title: 'Predict Intersection Constraint',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict whether the code will work with the intersection type.',
      skeleton: `<?php
interface HasName { public function name(): string; }
interface HasAge { public function age(): int; }

class Person implements HasName, HasAge {
    public function name(): string { return 'Alice'; }
    public function age(): int { return 30; }
}

function info(HasName&HasAge \$p): string {
    return \$p->name() . ' is ' . \$p->age();
}
echo info(new Person());`,
      solution: `Alice is 30`,
      hints: [
        'Person implements both HasName and HasAge.',
        'It satisfies the HasName&HasAge intersection.',
        'Both methods are callable on the parameter.',
      ],
      concepts: ['intersection-satisfaction', 'implements', 'both-interfaces'],
    },
    {
      id: 'php-types-adv-19',
      title: 'Refactor Nullable to Union',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the ?type syntax to explicit union type syntax for clarity.',
      skeleton: `<?php
function parse(?string \$input): ?int {
    if (\$input === null) return null;
    return (int) \$input;
}`,
      solution: `<?php
function parse(string|null \$input): int|null {
    if (\$input === null) return null;
    return (int) \$input;
}`,
      hints: [
        '?string is equivalent to string|null.',
        'The explicit union form is more readable.',
        'Both forms are functionally identical.',
      ],
      concepts: ['nullable-to-union', 'explicit-syntax', 'readability'],
    },
    {
      id: 'php-types-adv-20',
      title: 'Refactor Type Checks to match',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the if/elseif type checking chain into a cleaner approach using match with true.',
      skeleton: `<?php
function format(int|float|string|bool \$val): string {
    if (is_bool(\$val)) {
        return \$val ? 'yes' : 'no';
    } elseif (is_int(\$val)) {
        return number_format(\$val);
    } elseif (is_float(\$val)) {
        return number_format(\$val, 2);
    } else {
        return trim(\$val);
    }
}`,
      solution: `<?php
function format(int|float|string|bool \$val): string {
    return match (true) {
        is_bool(\$val) => \$val ? 'yes' : 'no',
        is_int(\$val) => number_format(\$val),
        is_float(\$val) => number_format(\$val, 2),
        default => trim(\$val),
    };
}`,
      hints: [
        'match(true) allows condition-based matching.',
        'Each arm tests a different type check.',
        'default handles the remaining string case.',
      ],
      concepts: ['match-true', 'type-dispatch', 'refactor'],
    },
  ],
};
