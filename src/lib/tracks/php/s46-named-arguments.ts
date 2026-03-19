import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-named',
  title: '46. Named Arguments',
  explanation: `## Named Arguments (PHP 8.0)

Named arguments allow passing arguments by parameter name rather than position, making code more readable and allowing you to skip optional parameters.

### Basic Syntax
\`\`\`php
<?php
function createUser(string \$name, int \$age, string \$role = 'user'): array {
    return ['name' => \$name, 'age' => \$age, 'role' => \$role];
}

// Positional
createUser('Alice', 30, 'admin');

// Named
createUser(name: 'Alice', age: 30, role: 'admin');
\`\`\`

### Skipping Defaults
\`\`\`php
<?php
function config(string \$host = 'localhost', int \$port = 3306, string \$db = 'app'): array {
    return compact('host', 'port', 'db');
}

// Skip host and port, only set db
config(db: 'mydb');
\`\`\`

### Reordering Arguments
\`\`\`php
<?php
createUser(age: 25, name: 'Bob');
// Named arguments can be in any order
\`\`\`

### With Built-in Functions
\`\`\`php
<?php
\$sorted = array_slice(array: [1, 2, 3, 4, 5], offset: 1, length: 3);
// [2, 3, 4]

\$trimmed = implode(separator: ', ', array: ['a', 'b', 'c']);
// "a, b, c"
\`\`\`

### Mixing Positional and Named
\`\`\`php
<?php
// Positional args must come before named args
createUser('Alice', age: 30);     // OK
// createUser(name: 'Alice', 30); // Error!
\`\`\`

### With Variadic Parameters
\`\`\`php
<?php
function log(string \$level, string ...\$messages): void {
    foreach (\$messages as \$msg) {
        echo "[\$level] \$msg\\n";
    }
}
log(level: 'INFO', 'Server started', 'Port 8080');
\`\`\``,
  exercises: [
    {
      id: 'php-named-1',
      title: 'Basic Named Argument',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to call a function with named arguments.',
      skeleton: `<?php
function greet(string \$name, string \$greeting = 'Hello'): string {
    return "\$greeting, \$name!";
}
echo greet(___: 'Alice', ___: 'Hi');`,
      solution: `<?php
function greet(string \$name, string \$greeting = 'Hello'): string {
    return "\$greeting, \$name!";
}
echo greet(name: 'Alice', greeting: 'Hi');`,
      hints: [
        'Use parameterName: value syntax.',
        'Named args can be in any order.',
        'The parameter names must match the function definition.',
      ],
      concepts: ['named-arguments', 'syntax', 'readability'],
    },
    {
      id: 'php-named-2',
      title: 'Skip Default Parameters',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to only set the third parameter, skipping the second.',
      skeleton: `<?php
function connect(string \$host = 'localhost', int \$port = 3306, string \$db = 'app'): string {
    return "\$host:\$port/\$db";
}
echo connect(___: 'mydb');`,
      solution: `<?php
function connect(string \$host = 'localhost', int \$port = 3306, string \$db = 'app'): string {
    return "\$host:\$port/\$db";
}
echo connect(db: 'mydb');`,
      hints: [
        'Named arguments let you skip optional parameters.',
        'Just specify the parameter you want to set.',
        'All other defaults are used.',
      ],
      concepts: ['skip-defaults', 'named-arg', 'optional-params'],
    },
    {
      id: 'php-named-3',
      title: 'Named Args with Built-in Functions',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to use named arguments with array_slice.',
      skeleton: `<?php
\$result = array_slice(___: [10, 20, 30, 40, 50], ___: 1, ___: 3);
echo implode(', ', \$result);`,
      solution: `<?php
\$result = array_slice(array: [10, 20, 30, 40, 50], offset: 1, length: 3);
echo implode(', ', \$result);`,
      hints: [
        'array_slice params: array, offset, length.',
        'Use the official parameter names.',
        'Named args make built-in function calls clearer.',
      ],
      concepts: ['built-in-functions', 'array_slice', 'named-args'],
    },
    {
      id: 'php-named-4',
      title: 'Reorder Arguments',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to call the function with arguments in a different order.',
      skeleton: `<?php
function tag(string \$name, string \$content, string \$class = ''): string {
    \$cls = \$class ? " class=\\"\$class\\"" : '';
    return "<\$name\$cls>\$content</\$name>";
}
echo tag(___: 'Hello', ___: 'bold', ___: 'p');`,
      solution: `<?php
function tag(string \$name, string \$content, string \$class = ''): string {
    \$cls = \$class ? " class=\\"\$class\\"" : '';
    return "<\$name\$cls>\$content</\$name>";
}
echo tag(content: 'Hello', class: 'bold', name: 'p');`,
      hints: [
        'Named arguments can be in any order.',
        'Match the parameter names from the function definition.',
        'This lets you put the most important args first.',
      ],
      concepts: ['argument-order', 'flexibility', 'named-args'],
    },
    {
      id: 'php-named-5',
      title: 'Mix Positional and Named',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to mix positional and named arguments.',
      skeleton: `<?php
function format(string \$text, bool \$bold = false, bool \$italic = false): string {
    \$result = \$text;
    if (\$bold) \$result = "<b>\$result</b>";
    if (\$italic) \$result = "<i>\$result</i>";
    return \$result;
}
echo format('Hello', ___: true);`,
      solution: `<?php
function format(string \$text, bool \$bold = false, bool \$italic = false): string {
    \$result = \$text;
    if (\$bold) \$result = "<b>\$result</b>";
    if (\$italic) \$result = "<i>\$result</i>";
    return \$result;
}
echo format('Hello', italic: true);`,
      hints: [
        'Positional args must come before named args.',
        '"Hello" is positional for $text.',
        'italic: true skips $bold and sets $italic.',
      ],
      concepts: ['mixed-args', 'positional-first', 'skip-middle'],
    },
    {
      id: 'php-named-6',
      title: 'Named Args with Array Spread',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Fill in the blank to use named arguments with array unpacking.',
      skeleton: `<?php
function create(string \$name, int \$age, string \$role): array {
    return compact('name', 'age', 'role');
}

\$args = ['name' => 'Alice', 'age' => 30, 'role' => 'admin'];
\$user = create(___\$args);`,
      solution: `<?php
function create(string \$name, int \$age, string \$role): array {
    return compact('name', 'age', 'role');
}

\$args = ['name' => 'Alice', 'age' => 30, 'role' => 'admin'];
\$user = create(...\$args);`,
      hints: [
        'Use the ... spread operator to unpack an associative array.',
        'Array keys must match parameter names.',
        'This is called argument unpacking with named args.',
      ],
      concepts: ['spread-operator', 'array-unpack', 'named-spread'],
    },
    {
      id: 'php-named-7',
      title: 'Write a Flexible Query Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function query(string $table, string $where = "1=1", string $orderBy = "id", int $limit = 100): string that returns a SQL SELECT string. Design it so named args make it readable.',
      skeleton: `<?php
// Write the query function`,
      solution: `<?php
function query(
    string \$table,
    string \$where = '1=1',
    string \$orderBy = 'id',
    int \$limit = 100
): string {
    return "SELECT * FROM \$table WHERE \$where ORDER BY \$orderBy LIMIT \$limit";
}`,
      hints: [
        'Use default values for optional parameters.',
        'The caller can use named args to set only what they need.',
        'Example: query("users", limit: 10).',
      ],
      concepts: ['query-builder', 'defaults', 'named-args-design'],
    },
    {
      id: 'php-named-8',
      title: 'Write a Config Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function makeConfig(string $host = "localhost", int $port = 8080, bool $ssl = false, string $path = "/"): array that returns all params as an associative array. Use compact().',
      skeleton: `<?php
// Write the makeConfig function`,
      solution: `<?php
function makeConfig(
    string \$host = 'localhost',
    int \$port = 8080,
    bool \$ssl = false,
    string \$path = '/'
): array {
    return compact('host', 'port', 'ssl', 'path');
}`,
      hints: [
        'compact() creates an array from variable names.',
        'All parameters have defaults.',
        'Callers can use named args to override specific ones.',
      ],
      concepts: ['compact', 'config-factory', 'defaults'],
    },
    {
      id: 'php-named-9',
      title: 'Write a Tag Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function htmlTag(string $tag, string $content = "", string $id = "", string $class = ""): string that builds an HTML tag with optional id and class attributes.',
      skeleton: `<?php
// Write the htmlTag function`,
      solution: `<?php
function htmlTag(
    string \$tag,
    string \$content = '',
    string \$id = '',
    string \$class = ''
): string {
    \$attrs = '';
    if (\$id !== '') \$attrs .= " id=\\"\$id\\"";
    if (\$class !== '') \$attrs .= " class=\\"\$class\\"";
    return "<\$tag\$attrs>\$content</\$tag>";
}`,
      hints: [
        'Build attribute string from non-empty parameters.',
        'Default to empty strings for optional attrs.',
        'Named args: htmlTag("div", class: "box", content: "Hi").',
      ],
      concepts: ['HTML-builder', 'optional-attrs', 'named-args'],
    },
    {
      id: 'php-named-10',
      title: 'Write a Dispatch with Named Spread',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function dispatch(callable $fn, array $args): mixed that calls $fn with $args unpacked as named arguments.',
      skeleton: `<?php
// Write the dispatch function`,
      solution: `<?php
function dispatch(callable \$fn, array \$args): mixed {
    return \$fn(...\$args);
}`,
      hints: [
        'Use the spread operator ... to unpack the array.',
        'Array keys must match function parameter names.',
        'This enables dynamic function calling with named args.',
      ],
      concepts: ['spread-dispatch', 'callable', 'dynamic-call'],
    },
    {
      id: 'php-named-11',
      title: 'Write a Fluent Options Resolver',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function resolveOptions(array $defaults, array $overrides): array that merges overrides into defaults. Named arguments to this function provide the defaults.',
      skeleton: `<?php
// Write the resolveOptions function`,
      solution: `<?php
function resolveOptions(array \$defaults, array \$overrides): array {
    return array_merge(\$defaults, \$overrides);
}`,
      hints: [
        'Use array_merge to combine defaults with overrides.',
        'Overrides take precedence over defaults.',
        'Keep it simple with array_merge.',
      ],
      concepts: ['array_merge', 'options-resolver', 'override'],
    },
    {
      id: 'php-named-12',
      title: 'Write an Event Emitter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function emit(string $event, mixed ...$data): array that returns ["event" => $event, "data" => $data]. This demonstrates named variadic usage.',
      skeleton: `<?php
// Write the emit function`,
      solution: `<?php
function emit(string \$event, mixed ...\$data): array {
    return ['event' => \$event, 'data' => \$data];
}`,
      hints: [
        'Variadic ...$data collects remaining arguments.',
        'Named args before variadic work normally.',
        'emit(event: "click", x: 10, y: 20) gives named variadic data.',
      ],
      concepts: ['variadic', 'named-variadic', 'event-emitter'],
    },
    {
      id: 'php-named-13',
      title: 'Fix Named After Positional Error',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the error caused by placing a positional argument after a named one.',
      skeleton: `<?php
function add(int \$a, int \$b): int {
    return \$a + \$b;
}
echo add(a: 5, 10);`,
      solution: `<?php
function add(int \$a, int \$b): int {
    return \$a + \$b;
}
echo add(5, b: 10);`,
      hints: [
        'Positional arguments must come before named arguments.',
        'Move the positional arg to the beginning.',
        'Or make both named: add(a: 5, b: 10).',
      ],
      concepts: ['ordering-rule', 'positional-first', 'syntax-error'],
    },
    {
      id: 'php-named-14',
      title: 'Fix Duplicate Named Argument',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the error caused by providing the same argument both positionally and named.',
      skeleton: `<?php
function greet(string \$name): string {
    return "Hello, \$name!";
}
echo greet('Alice', name: 'Bob');`,
      solution: `<?php
function greet(string \$name): string {
    return "Hello, \$name!";
}
echo greet(name: 'Bob');`,
      hints: [
        'You cannot provide the same parameter twice.',
        '"Alice" fills $name positionally, then name: tries again.',
        'Use either positional or named, not both for the same param.',
      ],
      concepts: ['duplicate-arg', 'error', 'pick-one'],
    },
    {
      id: 'php-named-15',
      title: 'Fix Wrong Parameter Name',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the named argument that uses the wrong parameter name.',
      skeleton: `<?php
function square(int \$number): int {
    return \$number * \$number;
}
echo square(num: 5);`,
      solution: `<?php
function square(int \$number): int {
    return \$number * \$number;
}
echo square(number: 5);`,
      hints: [
        'The parameter name is $number, not $num.',
        'Named args must use the exact parameter name.',
        'Check the function definition for the correct name.',
      ],
      concepts: ['parameter-name', 'typo', 'name-mismatch'],
    },
    {
      id: 'php-named-16',
      title: 'Predict Named Args Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output when using named arguments.',
      skeleton: `<?php
function join(string \$glue, string \$a, string \$b): string {
    return \$a . \$glue . \$b;
}
echo join(b: 'world', a: 'hello', glue: ' ');`,
      solution: `hello world`,
      hints: [
        'Named arguments can be in any order.',
        'a: "hello", b: "world", glue: " ".',
        'Result: "hello" . " " . "world".',
      ],
      concepts: ['reordering', 'named-args', 'output'],
    },
    {
      id: 'php-named-17',
      title: 'Predict Default Skip',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output when skipping defaults with named args.',
      skeleton: `<?php
function info(string \$name = 'anon', int \$age = 0, string \$city = 'unknown'): string {
    return "\$name, \$age, \$city";
}
echo info(city: 'NYC', age: 25);`,
      solution: `anon, 25, NYC`,
      hints: [
        '$name is not provided, so it uses default "anon".',
        'age: 25 and city: "NYC" are set explicitly.',
        'Defaults fill in for unprovided parameters.',
      ],
      concepts: ['defaults', 'skip-params', 'output'],
    },
    {
      id: 'php-named-18',
      title: 'Predict Spread Named Args',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output when spreading an associative array as named args.',
      skeleton: `<?php
function sum(int \$a, int \$b, int \$c): int {
    return \$a + \$b + \$c;
}
\$args = ['c' => 30, 'a' => 10, 'b' => 20];
echo sum(...\$args);`,
      solution: `60`,
      hints: [
        'Array keys match parameter names.',
        'Order does not matter with named args.',
        '10 + 20 + 30 = 60.',
      ],
      concepts: ['spread-operator', 'named-unpack', 'sum'],
    },
    {
      id: 'php-named-19',
      title: 'Refactor Boolean Flags to Named Args',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the call with unclear boolean arguments to use named args for readability.',
      skeleton: `<?php
function render(string \$template, bool \$cache, bool \$minify, bool \$debug): string {
    return "template=\$template cache=\$cache minify=\$minify debug=\$debug";
}
echo render('home.html', true, false, true);`,
      solution: `<?php
function render(string \$template, bool \$cache, bool \$minify, bool \$debug): string {
    return "template=\$template cache=\$cache minify=\$minify debug=\$debug";
}
echo render('home.html', cache: true, minify: false, debug: true);`,
      hints: [
        'Boolean flags are unclear without names.',
        'Named args make the intent explicit.',
        'cache: true is much clearer than just true.',
      ],
      concepts: ['readability', 'boolean-flags', 'named-args'],
    },
    {
      id: 'php-named-20',
      title: 'Refactor Options Array to Named Args',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the function that takes an options array to use named parameters instead.',
      skeleton: `<?php
function sendEmail(array \$options): void {
    \$to = \$options['to'];
    \$subject = \$options['subject'] ?? 'No Subject';
    \$body = \$options['body'] ?? '';
    \$cc = \$options['cc'] ?? '';
    echo "To: \$to | Subj: \$subject | Body: \$body | CC: \$cc";
}
sendEmail(['to' => 'alice@test.com', 'body' => 'Hi!']);`,
      solution: `<?php
function sendEmail(
    string \$to,
    string \$subject = 'No Subject',
    string \$body = '',
    string \$cc = ''
): void {
    echo "To: \$to | Subj: \$subject | Body: \$body | CC: \$cc";
}
sendEmail(to: 'alice@test.com', body: 'Hi!');`,
      hints: [
        'Replace the options array with named parameters.',
        'Use default values for optional parameters.',
        'Named args at the call site provide the same flexibility.',
      ],
      concepts: ['options-to-params', 'refactor', 'type-safety'],
    },
  ],
};
