import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-json',
  title: '22. JSON Handling',
  explanation: `## JSON Handling in PHP

PHP provides built-in functions for encoding and decoding JSON, making it trivial to work with APIs and data interchange.

### json_encode
\`\`\`php
<?php
\$data = ['name' => 'Alice', 'age' => 30];
echo json_encode(\$data);
// {"name":"Alice","age":30}

echo json_encode(\$data, JSON_PRETTY_PRINT);
// {
//     "name": "Alice",
//     "age": 30
// }
\`\`\`

### json_decode
\`\`\`php
<?php
\$json = '{"name":"Alice","age":30}';

// Returns object by default
\$obj = json_decode(\$json);
echo \$obj->name; // "Alice"

// Pass true for associative array
\$arr = json_decode(\$json, true);
echo \$arr['name']; // "Alice"
\`\`\`

### Error Handling
\`\`\`php
<?php
\$bad = json_decode('invalid json');
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_last_error_msg(); // "Syntax error"
}

// PHP 7.3+: throw on error
\$data = json_decode('invalid', true, 512, JSON_THROW_ON_ERROR);
// Throws JsonException
\`\`\`

### Encoding Options
\`\`\`php
<?php
\$data = ['url' => 'https://example.com/path?q=1&r=2'];
echo json_encode(\$data, JSON_UNESCAPED_SLASHES);
// {"url":"https://example.com/path?q=1&r=2"}

echo json_encode(\$data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
\`\`\``,
  exercises: [
    {
      id: 'php-json-1',
      title: 'Encode Array to JSON',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to encode an array as JSON.',
      skeleton: `<?php
\$data = ['name' => 'Bob', 'score' => 95];
echo ___(\$data);`,
      solution: `<?php
\$data = ['name' => 'Bob', 'score' => 95];
echo json_encode(\$data);`,
      hints: [
        'json_encode() converts a PHP value to JSON string.',
        'Arrays become JSON objects or arrays.',
        'Associative arrays become JSON objects.',
      ],
      concepts: ['json_encode', 'array-to-json', 'serialization'],
    },
    {
      id: 'php-json-2',
      title: 'Decode JSON String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to decode a JSON string into an associative array.',
      skeleton: `<?php
\$json = '{"city":"Paris","pop":2161}';
\$data = ___(\$json, true);
echo \$data['city'];`,
      solution: `<?php
\$json = '{"city":"Paris","pop":2161}';
\$data = json_decode(\$json, true);
echo \$data['city'];`,
      hints: [
        'json_decode() parses a JSON string.',
        'Pass true as second argument for associative array.',
        'Without true, you get an object.',
      ],
      concepts: ['json_decode', 'associative-array', 'deserialization'],
    },
    {
      id: 'php-json-3',
      title: 'Pretty Print JSON',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to output formatted JSON.',
      skeleton: `<?php
\$data = ['a' => 1, 'b' => 2];
echo json_encode(\$data, ___);`,
      solution: `<?php
\$data = ['a' => 1, 'b' => 2];
echo json_encode(\$data, JSON_PRETTY_PRINT);`,
      hints: [
        'JSON_PRETTY_PRINT adds indentation and newlines.',
        'It is the second argument to json_encode.',
        'This makes JSON human-readable.',
      ],
      concepts: ['JSON_PRETTY_PRINT', 'formatting', 'options'],
    },
    {
      id: 'php-json-4',
      title: 'JSON Error Check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to check if JSON decoding succeeded.',
      skeleton: `<?php
\$result = json_decode('bad json');
if (___ !== JSON_ERROR_NONE) {
    echo 'Error: ' . json_last_error_msg();
}`,
      solution: `<?php
\$result = json_decode('bad json');
if (json_last_error() !== JSON_ERROR_NONE) {
    echo 'Error: ' . json_last_error_msg();
}`,
      hints: [
        'json_last_error() returns the last JSON error code.',
        'JSON_ERROR_NONE means no error occurred.',
        'json_last_error_msg() returns a human-readable message.',
      ],
      concepts: ['json_last_error', 'error-checking', 'JSON_ERROR_NONE'],
    },
    {
      id: 'php-json-5',
      title: 'JSON Throw on Error',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to make json_decode throw an exception on error.',
      skeleton: `<?php
try {
    \$data = json_decode('invalid', true, 512, ___);
} catch (JsonException \$e) {
    echo 'Failed: ' . \$e->getMessage();
}`,
      solution: `<?php
try {
    \$data = json_decode('invalid', true, 512, JSON_THROW_ON_ERROR);
} catch (JsonException \$e) {
    echo 'Failed: ' . \$e->getMessage();
}`,
      hints: [
        'JSON_THROW_ON_ERROR makes JSON functions throw on failure.',
        'It is passed as the options (4th) argument.',
        'The exception type is JsonException.',
      ],
      concepts: ['JSON_THROW_ON_ERROR', 'JsonException', 'exception-handling'],
    },
    {
      id: 'php-json-6',
      title: 'Unescaped Slashes',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to encode JSON without escaping forward slashes.',
      skeleton: `<?php
\$data = ['url' => 'https://example.com/api'];
echo json_encode(\$data, ___);`,
      solution: `<?php
\$data = ['url' => 'https://example.com/api'];
echo json_encode(\$data, JSON_UNESCAPED_SLASHES);`,
      hints: [
        'By default, json_encode escapes / as \\/.',
        'JSON_UNESCAPED_SLASHES prevents this escaping.',
        'URLs look cleaner without escaped slashes.',
      ],
      concepts: ['JSON_UNESCAPED_SLASHES', 'encoding-options', 'urls'],
    },
    {
      id: 'php-json-7',
      title: 'Write a JSON File Writer',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Write a function writeJson(string $path, array $data): void that writes data to a JSON file with pretty printing.',
      skeleton: `<?php
// Write the writeJson function`,
      solution: `<?php
function writeJson(string \$path, array \$data): void {
    \$json = json_encode(\$data, JSON_PRETTY_PRINT);
    file_put_contents(\$path, \$json);
}`,
      hints: [
        'Use json_encode with JSON_PRETTY_PRINT.',
        'Write the result with file_put_contents.',
        'Combine the two functions sequentially.',
      ],
      concepts: ['json-file', 'file_put_contents', 'pretty-print'],
    },
    {
      id: 'php-json-8',
      title: 'Write a Safe JSON Decoder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function safeJsonDecode(string $json): array that decodes JSON or throws RuntimeException with the error message if decoding fails.',
      skeleton: `<?php
// Write the safeJsonDecode function`,
      solution: `<?php
function safeJsonDecode(string \$json): array {
    \$data = json_decode(\$json, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new RuntimeException(json_last_error_msg());
    }
    return \$data;
}`,
      hints: [
        'Decode with json_decode($json, true).',
        'Check json_last_error() after decoding.',
        'Throw RuntimeException with json_last_error_msg().',
      ],
      concepts: ['error-handling', 'json_decode', 'RuntimeException'],
    },
    {
      id: 'php-json-9',
      title: 'Write a Nested Value Extractor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function jsonGet(string $json, string $key): mixed that decodes JSON and returns the value at the given top-level key, or null if not found.',
      skeleton: `<?php
// Write the jsonGet function`,
      solution: `<?php
function jsonGet(string \$json, string \$key): mixed {
    \$data = json_decode(\$json, true);
    return \$data[\$key] ?? null;
}`,
      hints: [
        'Decode the JSON string first.',
        'Use the null coalescing operator ?? for missing keys.',
        'Return null if the key does not exist.',
      ],
      concepts: ['json_decode', 'null-coalescing', 'key-access'],
    },
    {
      id: 'php-json-10',
      title: 'Write JSON Merger',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function mergeJson(string $json1, string $json2): string that decodes two JSON objects, merges them (second overrides first), and returns the encoded result.',
      skeleton: `<?php
// Write the mergeJson function`,
      solution: `<?php
function mergeJson(string \$json1, string \$json2): string {
    \$a = json_decode(\$json1, true);
    \$b = json_decode(\$json2, true);
    \$merged = array_merge(\$a, \$b);
    return json_encode(\$merged);
}`,
      hints: [
        'Decode both JSON strings into arrays.',
        'Use array_merge() to merge, with $b overriding $a.',
        'Encode the result back to JSON.',
      ],
      concepts: ['array_merge', 'json-merge', 'encode-decode'],
    },
    {
      id: 'php-json-11',
      title: 'Write a JSON Validator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function isValidJson(string $str): bool that returns true if the string is valid JSON.',
      skeleton: `<?php
// Write the isValidJson function`,
      solution: `<?php
function isValidJson(string \$str): bool {
    json_decode(\$str);
    return json_last_error() === JSON_ERROR_NONE;
}`,
      hints: [
        'Try to decode the string.',
        'Check json_last_error() afterward.',
        'JSON_ERROR_NONE means the JSON was valid.',
      ],
      concepts: ['validation', 'json_last_error', 'boolean-return'],
    },
    {
      id: 'php-json-12',
      title: 'Write a JSON Transformer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function transformKeys(string $json, callable $fn): string that decodes JSON, applies $fn to every key in the top-level object, and returns re-encoded JSON.',
      skeleton: `<?php
// Write the transformKeys function`,
      solution: `<?php
function transformKeys(string \$json, callable \$fn): string {
    \$data = json_decode(\$json, true);
    \$result = [];
    foreach (\$data as \$key => \$value) {
        \$result[\$fn(\$key)] = \$value;
    }
    return json_encode(\$result);
}`,
      hints: [
        'Decode, iterate with foreach, apply $fn to each key.',
        'Build a new array with transformed keys.',
        'Encode the result back to JSON.',
      ],
      concepts: ['key-transformation', 'callable', 'higher-order'],
    },
    {
      id: 'php-json-13',
      title: 'Fix json_decode Without Assoc Flag',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the code that tries to access JSON data as an array but decoded it as an object.',
      skeleton: `<?php
\$json = '{"name":"Alice","age":30}';
\$data = json_decode(\$json);
echo \$data['name'];`,
      solution: `<?php
\$json = '{"name":"Alice","age":30}';
\$data = json_decode(\$json, true);
echo \$data['name'];`,
      hints: [
        'json_decode returns an object by default.',
        'Array access on an object causes an error.',
        'Pass true as second argument for associative array.',
      ],
      concepts: ['json_decode', 'assoc-flag', 'object-vs-array'],
    },
    {
      id: 'php-json-14',
      title: 'Fix Double Encoding',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the code that double-encodes JSON, producing escaped strings.',
      skeleton: `<?php
\$data = ['name' => 'Bob'];
\$json = json_encode(\$data);
\$output = json_encode(\$json);
echo \$output;
// Outputs: "\\"{\\\\\\"name\\\\\\":\\\\\\"Bob\\\\\\"}\\"" instead of {"name":"Bob"}`,
      solution: `<?php
\$data = ['name' => 'Bob'];
\$json = json_encode(\$data);
echo \$json;`,
      hints: [
        'The data is being encoded twice.',
        'json_encode on a JSON string produces a double-encoded mess.',
        'Remove the second json_encode call.',
      ],
      concepts: ['double-encoding', 'json_encode', 'common-mistake'],
    },
    {
      id: 'php-json-15',
      title: 'Fix Missing Error Handling',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the function that silently returns null on invalid JSON instead of reporting the error.',
      skeleton: `<?php
function parseConfig(string \$json): array {
    \$data = json_decode(\$json, true);
    return \$data;
}
// parseConfig('invalid') returns null silently`,
      solution: `<?php
function parseConfig(string \$json): array {
    \$data = json_decode(\$json, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new RuntimeException('Invalid JSON: ' . json_last_error_msg());
    }
    return \$data;
}`,
      hints: [
        'json_decode returns null on invalid JSON.',
        'Check json_last_error() after decoding.',
        'Throw an exception with a descriptive message.',
      ],
      concepts: ['error-handling', 'silent-failure', 'defensive-coding'],
    },
    {
      id: 'php-json-16',
      title: 'Predict json_encode Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the JSON output for different PHP values.',
      skeleton: `<?php
echo json_encode(42) . ' ';
echo json_encode('hello') . ' ';
echo json_encode(true) . ' ';
echo json_encode(null);`,
      solution: `42 "hello" true null`,
      hints: [
        'Integers encode as JSON numbers.',
        'Strings encode as JSON quoted strings.',
        'true and null encode as JSON keywords.',
      ],
      concepts: ['json_encode', 'scalar-types', 'type-mapping'],
    },
    {
      id: 'php-json-17',
      title: 'Predict Array vs Object Encoding',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict how PHP arrays encode to JSON.',
      skeleton: `<?php
echo json_encode([1, 2, 3]) . ' ';
echo json_encode(['a' => 1, 'b' => 2]);`,
      solution: `[1,2,3] {"a":1,"b":2}`,
      hints: [
        'Sequential arrays become JSON arrays.',
        'Associative arrays become JSON objects.',
        'PHP determines the type based on the keys.',
      ],
      concepts: ['array-encoding', 'object-encoding', 'key-detection'],
    },
    {
      id: 'php-json-18',
      title: 'Predict json_decode Type',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the type returned by json_decode with different flags.',
      skeleton: `<?php
\$json = '{"x":1}';
\$a = json_decode(\$json);
\$b = json_decode(\$json, true);
echo gettype(\$a) . ' ' . gettype(\$b);`,
      solution: `object array`,
      hints: [
        'Without the second argument, json_decode returns stdClass.',
        'With true, it returns an associative array.',
        'gettype returns "object" and "array" respectively.',
      ],
      concepts: ['json_decode', 'return-type', 'gettype'],
    },
    {
      id: 'php-json-19',
      title: 'Refactor Manual JSON Building',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the manual JSON string concatenation to use json_encode.',
      skeleton: `<?php
\$name = 'Alice';
\$age = 30;
\$json = '{"name":"' . \$name . '","age":' . \$age . '}';
echo \$json;`,
      solution: `<?php
\$name = 'Alice';
\$age = 30;
\$json = json_encode(['name' => \$name, 'age' => \$age]);
echo \$json;`,
      hints: [
        'Manual JSON concatenation is fragile and error-prone.',
        'Use json_encode with an associative array.',
        'json_encode handles escaping automatically.',
      ],
      concepts: ['json_encode', 'refactor', 'escape-handling'],
    },
    {
      id: 'php-json-20',
      title: 'Refactor Multiple Error Checks to JSON_THROW_ON_ERROR',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the manual json_last_error checks to use JSON_THROW_ON_ERROR.',
      skeleton: `<?php
function process(string \$input): string {
    \$data = json_decode(\$input, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new RuntimeException(json_last_error_msg());
    }
    \$data['processed'] = true;
    \$output = json_encode(\$data);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new RuntimeException(json_last_error_msg());
    }
    return \$output;
}`,
      solution: `<?php
function process(string \$input): string {
    try {
        \$data = json_decode(\$input, true, 512, JSON_THROW_ON_ERROR);
        \$data['processed'] = true;
        return json_encode(\$data, JSON_THROW_ON_ERROR);
    } catch (JsonException \$e) {
        throw new RuntimeException(\$e->getMessage());
    }
}`,
      hints: [
        'JSON_THROW_ON_ERROR eliminates manual error checking.',
        'Both json_decode and json_encode support this flag.',
        'Catch JsonException for centralized error handling.',
      ],
      concepts: ['JSON_THROW_ON_ERROR', 'JsonException', 'clean-code'],
    },
  ],
};
