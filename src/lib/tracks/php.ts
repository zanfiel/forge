/**
 * php.ts - Complete PHP learning track
 *
 * 5 sections, 14 exercises. Progresses from variables through error handling and file I/O.
 * Exercises use real-world examples: web requests, config parsing, data processing.
 */

import type { Track } from '../../stores/app.svelte.ts';

export const track: Track = {
  id: 'php',
  name: 'PHP',
  language: 'php',
  monacoLang: 'php',
  icon: '\u{1F418}',
  description: 'Powers the web. WordPress, Laravel, and millions of websites worldwide.',
  sections: [
    {
      id: 'php-variables',
      title: '1. Variables & Types',
      explanation: `## Variables & Types

PHP variables always start with a \`$\` sign. The language is dynamically typed but supports type declarations:

\`\`\`php
<?php
$name = "Zan";           // string
$age = 25;               // int
$pi = 3.14;              // float
$active = true;          // bool (lowercase true/false)
$servers = ["rocky", "pangolin", "ovh"];  // array
\`\`\`

**Type checking:**
\`\`\`php
<?php
gettype($name);    // "string"
is_string($name);  // true
is_int($age);      // true
\`\`\`

**Type juggling** -- PHP automatically converts types in certain contexts:
\`\`\`php
<?php
$result = "5" + 3;       // 8 (string "5" becomes int)
$concat = "5" . 3;       // "53" (dot concatenates strings)
$truthy = (bool)"hello"; // true (non-empty string is truthy)
$falsy = (bool)"";       // false (empty string is falsy)
$zero = (bool)0;         // false
\`\`\`

**String interpolation** works in double quotes (NOT single quotes):
\`\`\`php
<?php
$host = "rocky";
echo "Server: $host";       // Server: rocky
echo "Port: {$ports[0]}";   // use braces for complex expressions
echo 'No $interpolation';   // literally: No $interpolation
\`\`\``,
      exercises: [
        {
          id: 'php-var-1',
          title: 'Variables & Interpolation',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'php',
          goal: 'Declare variables and use string interpolation to format output.',
          skeleton: `<?php
// Declare variables
__BLANK__server = "rocky";
__BLANK__port = 4200;
__BLANK__online = true;
$memory_gb = __BLANK__;

// Print a formatted status line using double-quoted string interpolation
echo "Server __BLANK__server on port __BLANK__port - RAM: {__BLANK__memory_gb}GB\\n";

// Concatenate with the dot operator
$status = $online __BLANK__ " [ONLINE]" __BLANK__ " [OFFLINE]";
echo $status;`,
          solution: `<?php
$server = "rocky";
$port = 4200;
$online = true;
$memory_gb = 30.0;

echo "Server $server on port $port - RAM: {$memory_gb}GB\\n";

$status = $online ? " [ONLINE]" : " [OFFLINE]";
echo $status;`,
          hints: [
            'All PHP variables start with `$`. Strings use quotes, numbers don\'t, booleans are lowercase `true`/`false`.',
            'Inside double-quoted strings, `$var` is interpolated directly. Use `{$var}` for complex expressions.',
            'The ternary operator in PHP is `$condition ? "if true" : "if false"`.',
          ],
          concepts: ['variables', 'string interpolation', 'ternary operator', 'types'],
        },
        {
          id: 'php-var-2',
          title: 'Type Juggling Predictions',
          type: 'predict-output',
          difficulty: 'beginner',
          language: 'php',
          goal: 'Predict what each expression evaluates to. PHP\'s type juggling can be surprising -- think carefully about how types convert.',
          skeleton: `<?php
// What does each var_dump() output?

var_dump("10" + 5);          // Line A
var_dump("10" . 5);          // Line B
var_dump(0 == "hello");      // Line C (loose comparison)
var_dump(0 === "hello");     // Line D (strict comparison)
var_dump((int)"42abc");      // Line E
var_dump((bool)[]);          // Line F

// Write your predictions as comments next to each line above.`,
          solution: `<?php
// Line A: int(15)        -- "10" is cast to int, then added to 5
// Line B: string("105")  -- dot operator concatenates as strings
// Line C: bool(false)    -- PHP 8+ changed this: "hello" is not numeric, so not equal to 0
// Line D: bool(false)    -- strict comparison: int !== string, always false
// Line E: int(42)        -- leading numeric portion is extracted, rest discarded
// Line F: bool(false)    -- empty array is falsy

var_dump("10" + 5);          // int(15)
var_dump("10" . 5);          // string("105")
var_dump(0 == "hello");      // bool(false)
var_dump(0 === "hello");     // bool(false)
var_dump((int)"42abc");      // int(42)
var_dump((bool)[]);          // bool(false)`,
          hints: [
            'The `+` operator does math (converting strings to numbers). The `.` operator concatenates strings.',
            'In PHP 8+, `0 == "hello"` is `false` because non-numeric strings are no longer equal to 0. `===` checks type AND value.',
            '`(int)"42abc"` extracts the leading number. Empty arrays `[]` are falsy, non-empty arrays are truthy.',
          ],
          concepts: ['type juggling', 'loose vs strict comparison', 'type casting', 'truthy/falsy'],
        },
        {
          id: 'php-var-3',
          title: 'Fix the Type Bug',
          type: 'fix-bug',
          difficulty: 'beginner',
          language: 'php',
          goal: 'This config parser has type-related bugs. Find and fix them so it outputs correct values.',
          skeleton: `<?php
// Parse config values from string input (simulating reading from a file)
$config_lines = [
    "port=8080",
    "debug=true",
    "max_connections=100",
    "host=0.0.0.0",
];

$config = [];
foreach ($config_lines as $line) {
    [$key, $value] = explode("=", $line);
    $config[$key] = $value;  // Bug: everything stored as string!
}

// These comparisons fail because values are strings, not proper types
if ($config["debug"] === true) {
    echo "Debug mode ON\\n";
}

if ($config["port"] === 8080) {
    echo "Default port\\n";
}

$total = $config["max_connections"] + 50;
echo "Max connections with buffer: $total\\n";`,
          solution: `<?php
$config_lines = [
    "port=8080",
    "debug=true",
    "max_connections=100",
    "host=0.0.0.0",
];

$config = [];
foreach ($config_lines as $line) {
    [$key, $value] = explode("=", $line);
    // Cast values to appropriate types
    if ($value === "true" || $value === "false") {
        $config[$key] = $value === "true";
    } elseif (is_numeric($value) && strpos($value, ".") === false) {
        $config[$key] = (int)$value;
    } else {
        $config[$key] = $value;
    }
}

if ($config["debug"] === true) {
    echo "Debug mode ON\\n";
}

if ($config["port"] === 8080) {
    echo "Default port\\n";
}

$total = $config["max_connections"] + 50;
echo "Max connections with buffer: $total\\n";`,
          hints: [
            'The bug is that `explode` returns strings, so `"true"` is not the same as `true` when using `===`.',
            'You need to convert values to proper types after parsing. Check if values are `"true"`/`"false"` for bools, or numeric for ints.',
            'Use `is_numeric()` to detect numbers, and compare against `"true"`/`"false"` strings for booleans. Cast with `(int)` or use `$value === "true"`.',
          ],
          concepts: ['strict comparison', 'type casting', 'explode', 'is_numeric', 'config parsing'],
        },
      ],
    },
    {
      id: 'php-functions',
      title: '2. Functions & Arrays',
      explanation: `## Functions & Arrays

**Function declarations** support type hints (PHP 7+) and return types:

\`\`\`php
<?php
function greet(string $name, int $times = 1): string {
    return str_repeat("Hello, $name! ", $times);
}

echo greet("Zan");        // "Hello, Zan! "
echo greet("Zan", 3);     // "Hello, Zan! Hello, Zan! Hello, Zan! "
\`\`\`

**Arrow functions** (PHP 7.4+):
\`\`\`php
<?php
$double = fn(int $n): int => $n * 2;
echo $double(5);  // 10
\`\`\`

**Arrays** are PHP's swiss army knife -- they act as lists, maps, stacks, and queues:

\`\`\`php
<?php
// Indexed array
$servers = ["rocky", "pangolin", "ovh"];

// Associative array (like a dict/map)
$ports = ["engram" => 4200, "synapse" => 8080, "forge" => 1420];

// Useful functions
count($servers);                    // 3
in_array("rocky", $servers);        // true
array_push($servers, "forge-box");  // adds to end
array_map(fn($s) => strtoupper($s), $servers);  // ["ROCKY", ...]
array_filter($servers, fn($s) => str_contains($s, "-"));  // ["forge-box"]
\`\`\`

**Spread operator** (PHP 7.4+):
\`\`\`php
<?php
$base = [1, 2, 3];
$extended = [...$base, 4, 5];  // [1, 2, 3, 4, 5]
\`\`\``,
      exercises: [
        {
          id: 'php-func-1',
          title: 'Write an Array Processor',
          type: 'write-function',
          difficulty: 'beginner',
          language: 'php',
          goal: 'Write a function `summarize_servers` that takes an associative array of server names mapped to their status ("online"/"offline"), and returns a string like "3 online, 2 offline out of 5 total".',
          skeleton: `<?php
// Write the summarize_servers function here


// Tests
$servers = [
    "rocky" => "online",
    "pangolin" => "online",
    "ovh-vps" => "offline",
    "bav-apps" => "online",
    "forge-box" => "offline",
];

echo summarize_servers($servers);
// Expected: "3 online, 2 offline out of 5 total"`,
          solution: `<?php
function summarize_servers(array $servers): string {
    $total = count($servers);
    $online = count(array_filter($servers, fn($status) => $status === "online"));
    $offline = $total - $online;
    return "$online online, $offline offline out of $total total";
}

$servers = [
    "rocky" => "online",
    "pangolin" => "online",
    "ovh-vps" => "offline",
    "bav-apps" => "online",
    "forge-box" => "offline",
];

echo summarize_servers($servers);`,
          hints: [
            '`count()` gives you the total number of elements. `array_filter()` returns elements that pass a test.',
            'Filter for online servers with `array_filter($servers, fn($s) => $s === "online")`, then count the result.',
            'Offline count is simply `$total - $online`. Use string interpolation for the return value.',
          ],
          concepts: ['functions', 'array_filter', 'count', 'arrow functions', 'associative arrays'],
        },
        {
          id: 'php-func-2',
          title: 'Array Pipeline',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'php',
          goal: 'Chain array functions to transform data. Fill in the blanks to process a list of request logs.',
          skeleton: `<?php
$requests = [
    ["path" => "/api/search", "ms" => 45],
    ["path" => "/api/store", "ms" => 120],
    ["path" => "/health", "ms" => 2],
    ["path" => "/api/context", "ms" => 230],
    ["path" => "/api/list", "ms" => 15],
    ["path" => "/health", "ms" => 1],
];

// 1. Filter to only API requests (path starts with "/api")
$api_only = array_filter($requests, fn($r) => __BLANK__($r["path"], "/api"));

// 2. Extract just the response times
$times = array_map(__BLANK__, $api_only);

// 3. Sort times descending (highest first)
__BLANK__($times);

// 4. Calculate average response time
$avg = array_sum($times) / __BLANK__($times);

echo "API requests: " . count($api_only) . "\\n";
echo "Slowest: " . $times[0] . "ms\\n";
echo "Average: " . round($avg, 1) . "ms\\n";`,
          solution: `<?php
$requests = [
    ["path" => "/api/search", "ms" => 45],
    ["path" => "/api/store", "ms" => 120],
    ["path" => "/health", "ms" => 2],
    ["path" => "/api/context", "ms" => 230],
    ["path" => "/api/list", "ms" => 15],
    ["path" => "/health", "ms" => 1],
];

$api_only = array_filter($requests, fn($r) => str_starts_with($r["path"], "/api"));

$times = array_map(fn($r) => $r["ms"], $api_only);

rsort($times);

$avg = array_sum($times) / count($times);

echo "API requests: " . count($api_only) . "\\n";
echo "Slowest: " . $times[0] . "ms\\n";
echo "Average: " . round($avg, 1) . "ms\\n";`,
          hints: [
            '`str_starts_with($string, $prefix)` checks if a string begins with a given prefix (PHP 8+).',
            '`array_map` takes a callback first, then the array. Use an arrow function: `fn($r) => $r["ms"]`.',
            '`rsort()` sorts an array in descending order (reverse sort) in place. `count()` returns the array length.',
          ],
          concepts: ['array_filter', 'array_map', 'rsort', 'array_sum', 'str_starts_with', 'method chaining'],
        },
        {
          id: 'php-func-3',
          title: 'Recursive Directory Lister',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'php',
          goal: 'Write a function `flatten_tree` that takes a nested associative array representing a directory tree and returns a flat array of full paths. Directories have array values; files have `null` values.',
          skeleton: `<?php
// Write flatten_tree here


// Tests
$tree = [
    "src" => [
        "index.ts" => null,
        "lib" => [
            "utils.ts" => null,
            "tracks" => [
                "python.ts" => null,
                "php.ts" => null,
            ],
        ],
    ],
    "package.json" => null,
];

$paths = flatten_tree($tree);
print_r($paths);
// Expected:
// [
//     "src/index.ts",
//     "src/lib/utils.ts",
//     "src/lib/tracks/python.ts",
//     "src/lib/tracks/php.ts",
//     "package.json",
// ]`,
          solution: `<?php
function flatten_tree(array $tree, string $prefix = ""): array {
    $paths = [];
    foreach ($tree as $name => $children) {
        $full_path = $prefix === "" ? $name : "$prefix/$name";
        if (is_array($children)) {
            $paths = array_merge($paths, flatten_tree($children, $full_path));
        } else {
            $paths[] = $full_path;
        }
    }
    return $paths;
}

$tree = [
    "src" => [
        "index.ts" => null,
        "lib" => [
            "utils.ts" => null,
            "tracks" => [
                "python.ts" => null,
                "php.ts" => null,
            ],
        ],
    ],
    "package.json" => null,
];

$paths = flatten_tree($tree);
print_r($paths);`,
          hints: [
            'Use a `$prefix` parameter (defaulting to `""`) to build up the path as you recurse deeper.',
            'Loop with `foreach`. If the value `is_array()`, it\'s a directory -- recurse. Otherwise it\'s a file -- add the full path.',
            'Use `array_merge()` to combine the recursive results into a flat array. Build the path with `"$prefix/$name"`.',
          ],
          concepts: ['recursion', 'associative arrays', 'is_array', 'array_merge', 'default parameters'],
        },
      ],
    },
    {
      id: 'php-strings',
      title: '3. Strings & Regex',
      explanation: `## Strings & Regex

PHP has incredibly rich string functions built in:

\`\`\`php
<?php
$str = "Hello, World!";

strlen($str);                  // 13
strtolower($str);              // "hello, world!"
strtoupper($str);              // "HELLO, WORLD!"
trim("  hello  ");            // "hello"
str_replace("World", "PHP", $str);  // "Hello, PHP!"
substr($str, 7, 5);           // "World"
str_contains($str, "World");  // true (PHP 8+)
explode(", ", $str);          // ["Hello", "World!"]
implode(" | ", ["a", "b"]);   // "a | b"
\`\`\`

**Regular expressions** use PCRE (Perl-Compatible):
\`\`\`php
<?php
// Match
preg_match('/^[a-z]+$/i', "Hello");   // 1 (truthy -- matched)

// Match with captures
preg_match('/^(\\w+):(\\d+)$/', "rocky:22", $matches);
// $matches = ["rocky:22", "rocky", "22"]

// Match all occurrences
preg_match_all('/\\d+/', "port 22 and 4200", $matches);
// $matches[0] = ["22", "4200"]

// Replace
preg_replace('/\\s+/', '-', "hello   world");  // "hello-world"
\`\`\`

**Named captures:**
\`\`\`php
<?php
preg_match('/(?P<host>[\\w.-]+):(?P<port>\\d+)/', "rocky:4200", $m);
echo $m["host"];  // "rocky"
echo $m["port"];  // "4200"
\`\`\``,
      exercises: [
        {
          id: 'php-str-1',
          title: 'String Manipulation',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'php',
          goal: 'Use PHP string functions to parse and transform a URL string.',
          skeleton: `<?php
$url = "  https://API.example.com/v2/Users?active=true  ";

// 1. Remove leading/trailing whitespace
$url = __BLANK__($url);

// 2. Convert to lowercase
$url = __BLANK__($url);

// 3. Check if it starts with "https://"
$is_secure = __BLANK__($url, "https://");

// 4. Extract the domain (between "://" and the next "/")
$without_scheme = str_replace("https://", "", $url);
$parts = __BLANK__("/", $without_scheme);
$domain = $parts[__BLANK__];

// 5. Replace "v2" with "v3"
$url = __BLANK__("v2", "v3", $url);

echo "Secure: " . ($is_secure ? "yes" : "no") . "\\n";
echo "Domain: $domain\\n";
echo "Updated: $url\\n";`,
          solution: `<?php
$url = "  https://API.example.com/v2/Users?active=true  ";

$url = trim($url);

$url = strtolower($url);

$is_secure = str_starts_with($url, "https://");

$without_scheme = str_replace("https://", "", $url);
$parts = explode("/", $without_scheme);
$domain = $parts[0];

$url = str_replace("v2", "v3", $url);

echo "Secure: " . ($is_secure ? "yes" : "no") . "\\n";
echo "Domain: $domain\\n";
echo "Updated: $url\\n";`,
          hints: [
            '`trim()` removes whitespace. `strtolower()` lowercases a string.',
            '`str_starts_with()` checks a prefix (PHP 8+). `explode()` splits a string by a delimiter.',
            'After splitting `"api.example.com/v2/users?active=true"` by `"/"`, index `0` is the domain. `str_replace()` takes `(search, replace, subject)`.',
          ],
          concepts: ['trim', 'strtolower', 'str_starts_with', 'explode', 'str_replace'],
        },
        {
          id: 'php-str-2',
          title: 'Regex Log Parser',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'php',
          goal: 'Write a function `parse_access_log` that takes a log line in the format "[2024-01-15 14:30:22] GET /api/search 200 45ms" and returns an associative array with keys: "date", "method", "path", "status", "time_ms". Return `null` if the line doesn\'t match.',
          skeleton: `<?php
// Write parse_access_log here


// Tests
$line1 = "[2024-01-15 14:30:22] GET /api/search 200 45ms";
$line2 = "[2024-01-15 14:30:23] POST /api/store 201 120ms";
$line3 = "this is not a valid log line";

print_r(parse_access_log($line1));
// ["date" => "2024-01-15 14:30:22", "method" => "GET", "path" => "/api/search", "status" => 200, "time_ms" => 45]

print_r(parse_access_log($line2));
// ["date" => "2024-01-15 14:30:23", "method" => "POST", "path" => "/api/store", "status" => 201, "time_ms" => 120]

var_dump(parse_access_log($line3));
// NULL`,
          solution: `<?php
function parse_access_log(string $line): ?array {
    $pattern = '/^\\[(?P<date>[\\d-]+\\s[\\d:]+)\\]\\s+(?P<method>[A-Z]+)\\s+(?P<path>\\S+)\\s+(?P<status>\\d+)\\s+(?P<time>\\d+)ms$/';
    if (preg_match($pattern, $line, $matches)) {
        return [
            "date" => $matches["date"],
            "method" => $matches["method"],
            "path" => $matches["path"],
            "status" => (int)$matches["status"],
            "time_ms" => (int)$matches["time"],
        ];
    }
    return null;
}

$line1 = "[2024-01-15 14:30:22] GET /api/search 200 45ms";
$line2 = "[2024-01-15 14:30:23] POST /api/store 201 120ms";
$line3 = "this is not a valid log line";

print_r(parse_access_log($line1));
print_r(parse_access_log($line2));
var_dump(parse_access_log($line3));`,
          hints: [
            'Use `preg_match()` with named captures: `(?P<name>pattern)`. The date is inside brackets, method is uppercase letters.',
            'Pattern breakdown: `\\[` matches literal bracket, `[\\d-]+\\s[\\d:]+` matches the date, `[A-Z]+` matches HTTP method, `\\S+` matches the path.',
            'Remember to cast status and time to `(int)`. Return `null` (nullable return type `?array`) when the pattern doesn\'t match.',
          ],
          concepts: ['preg_match', 'named captures', 'regex', 'nullable types', 'type casting'],
        },
        {
          id: 'php-str-3',
          title: 'Template Engine',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'php',
          goal: 'Write a function `render_template` that takes a template string containing `{{key}}` placeholders and an associative array of values, and returns the string with all placeholders replaced. Unknown placeholders should be left as-is.',
          skeleton: `<?php
// Write render_template here


// Tests
$template = "Hello, {{name}}! Your server {{server}} is {{status}} on port {{port}}.";
$vars = [
    "name" => "Zan",
    "server" => "rocky",
    "status" => "online",
    "port" => "4200",
];

echo render_template($template, $vars) . "\\n";
// "Hello, Zan! Your server rocky is online on port 4200."

$partial = "{{greeting}}, {{name}}! Unknown: {{missing}}";
echo render_template($partial, ["name" => "Zan"]) . "\\n";
// "{{greeting}}, Zan! Unknown: {{missing}}"`,
          solution: `<?php
function render_template(string $template, array $vars): string {
    return preg_replace_callback('/\\{\\{(\\w+)\\}\\}/', function ($matches) use ($vars) {
        $key = $matches[1];
        return array_key_exists($key, $vars) ? $vars[$key] : $matches[0];
    }, $template);
}

$template = "Hello, {{name}}! Your server {{server}} is {{status}} on port {{port}}.";
$vars = [
    "name" => "Zan",
    "server" => "rocky",
    "status" => "online",
    "port" => "4200",
];

echo render_template($template, $vars) . "\\n";

$partial = "{{greeting}}, {{name}}! Unknown: {{missing}}";
echo render_template($partial, ["name" => "Zan"]) . "\\n";`,
          hints: [
            '`preg_replace_callback()` lets you run a function for each regex match. The pattern `\\{\\{(\\w+)\\}\\}` captures the key name.',
            'The callback receives `$matches` where `$matches[0]` is the full match and `$matches[1]` is the captured key. Use `use ($vars)` to access the variables array.',
            'Use `array_key_exists($key, $vars)` to check if the key exists. Return the original `$matches[0]` (e.g. `{{missing}}`) for unknown keys.',
          ],
          concepts: ['preg_replace_callback', 'closures', 'use keyword', 'array_key_exists', 'template rendering'],
        },
      ],
    },
    {
      id: 'php-oop',
      title: '4. OOP Basics',
      explanation: `## OOP Basics

PHP has a complete object-oriented system with classes, interfaces, traits, and more:

\`\`\`php
<?php
class Server {
    public string $name;
    private int $port;
    protected bool $online = false;

    public function __construct(string $name, int $port = 22) {
        $this->name = $name;
        $this->port = $port;
    }

    public function connect(): string {
        $this->online = true;
        return "Connected to {$this->name}:{$this->port}";
    }

    public function getPort(): int {
        return $this->port;
    }
}

$srv = new Server("rocky", 4200);
echo $srv->connect();  // "Connected to rocky:4200"
\`\`\`

**Interfaces** define contracts:
\`\`\`php
<?php
interface Loggable {
    public function toLogString(): string;
}
\`\`\`

**Traits** share code between classes (like mixins):
\`\`\`php
<?php
trait HasTimestamps {
    public string $createdAt;
    public function touch(): void {
        $this->createdAt = date('Y-m-d H:i:s');
    }
}

class Post {
    use HasTimestamps;
}
\`\`\`

**Constructor promotion** (PHP 8+) removes boilerplate:
\`\`\`php
<?php
class Service {
    public function __construct(
        public readonly string $name,
        private int $port,
        private bool $active = false,
    ) {}
}
\`\`\``,
      exercises: [
        {
          id: 'php-oop-1',
          title: 'Build a Class',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'php',
          goal: 'Complete the `Router` class that registers URL routes and dispatches requests to handler functions.',
          skeleton: `<?php
class Router {
    private __BLANK__ $routes = [];

    public function add(string $method, string $path, callable $handler): __BLANK__ {
        $this->routes[] = [
            "method" => strtoupper($method),
            "path" => $path,
            "handler" => $handler,
        ];
    }

    public function dispatch(string $method, string $path): string {
        __BLANK__ ($this->routes __BLANK__ $route) {
            if ($route["method"] === strtoupper($method) && $route["path"] === $path) {
                return __BLANK__($route["handler"])($path);
            }
        }
        return "404 Not Found: $method $path";
    }

    public function __BLANK__(): int {
        return count($this->routes);
    }
}

// Tests
$router = new Router();
$router->add("GET", "/api/search", fn($p) => "Searching...");
$router->add("POST", "/api/store", fn($p) => "Storing data at $p");

echo $router->dispatch("GET", "/api/search") . "\\n";    // "Searching..."
echo $router->dispatch("POST", "/api/store") . "\\n";    // "Storing data at /api/store"
echo $router->dispatch("DELETE", "/api/nope") . "\\n";   // "404 Not Found: DELETE /api/nope"
echo "Routes: " . $router->count() . "\\n";               // "Routes: 2"`,
          solution: `<?php
class Router {
    private array $routes = [];

    public function add(string $method, string $path, callable $handler): void {
        $this->routes[] = [
            "method" => strtoupper($method),
            "path" => $path,
            "handler" => $handler,
        ];
    }

    public function dispatch(string $method, string $path): string {
        foreach ($this->routes as $route) {
            if ($route["method"] === strtoupper($method) && $route["path"] === $path) {
                return call_user_func($route["handler"], $path);
            }
        }
        return "404 Not Found: $method $path";
    }

    public function count(): int {
        return count($this->routes);
    }
}

$router = new Router();
$router->add("GET", "/api/search", fn($p) => "Searching...");
$router->add("POST", "/api/store", fn($p) => "Storing data at $p");

echo $router->dispatch("GET", "/api/search") . "\\n";
echo $router->dispatch("POST", "/api/store") . "\\n";
echo $router->dispatch("DELETE", "/api/nope") . "\\n";
echo "Routes: " . $router->count() . "\\n";`,
          hints: [
            'Property type is `array`. The `add` method returns nothing, so its return type is `void`.',
            'Loop with `foreach ($this->routes as $route)`. Call the handler with `call_user_func($route["handler"], $path)`.',
            'The method that returns the route count is called `count`. Fill in: `array`, `void`, `foreach`, `as`, `call_user_func`, `count`.',
          ],
          concepts: ['classes', 'typed properties', 'callable', 'foreach', 'call_user_func', 'void return'],
        },
        {
          id: 'php-oop-2',
          title: 'Interfaces & Traits',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'php',
          goal: 'Create an interface `Cacheable` with a `cacheKey(): string` method and a `ttl(): int` method. Create a trait `HasCache` that provides a `getCached()` method which returns a string like "[CACHE key TTL=300s]". Then create a class `ApiResponse` that implements `Cacheable`, uses `HasCache`, and stores a path and status code.',
          skeleton: `<?php
// Create the Cacheable interface
// Create the HasCache trait
// Create the ApiResponse class


// Tests
$response = new ApiResponse("/api/search", 200);
echo $response->cacheKey() . "\\n";     // "api_search_200"
echo $response->ttl() . "\\n";          // 300
echo $response->getCached() . "\\n";    // "[CACHE api_search_200 TTL=300s]"
echo $response->getPath() . "\\n";      // "/api/search"`,
          solution: `<?php
interface Cacheable {
    public function cacheKey(): string;
    public function ttl(): int;
}

trait HasCache {
    public function getCached(): string {
        return "[CACHE {$this->cacheKey()} TTL={$this->ttl()}s]";
    }
}

class ApiResponse implements Cacheable {
    use HasCache;

    public function __construct(
        private string $path,
        private int $statusCode,
    ) {}

    public function cacheKey(): string {
        $clean = str_replace("/", "_", ltrim($this->path, "/"));
        return "{$clean}_{$this->statusCode}";
    }

    public function ttl(): int {
        return 300;
    }

    public function getPath(): string {
        return $this->path;
    }
}

$response = new ApiResponse("/api/search", 200);
echo $response->cacheKey() . "\\n";
echo $response->ttl() . "\\n";
echo $response->getCached() . "\\n";
echo $response->getPath() . "\\n";`,
          hints: [
            'An `interface` declares method signatures without bodies. A `trait` provides reusable method implementations that can be "used" in classes.',
            'The trait can call `$this->cacheKey()` and `$this->ttl()` because the class using it will implement those methods.',
            'For the cache key, use `ltrim($this->path, "/")` to remove the leading slash, then `str_replace("/", "_", ...)` to replace slashes with underscores.',
          ],
          concepts: ['interface', 'trait', 'implements', 'use', 'constructor promotion', 'str_replace', 'ltrim'],
        },
        {
          id: 'php-oop-3',
          title: 'Refactor to Constructor Promotion',
          type: 'refactor',
          difficulty: 'advanced',
          language: 'php',
          goal: 'Refactor this verbose class to use PHP 8 constructor promotion and readonly properties where appropriate. The name and host should be readonly (set once, never changed). The class behavior must remain identical.',
          skeleton: `<?php
// Refactor this class to use constructor promotion and readonly
class DatabaseConnection {
    private string $name;
    private string $host;
    private int $port;
    private string $database;
    private bool $connected;

    public function __construct(string $name, string $host, int $port = 5432, string $database = "main") {
        $this->name = $name;
        $this->host = $host;
        $this->port = $port;
        $this->database = $database;
        $this->connected = false;
    }

    public function getName(): string {
        return $this->name;
    }

    public function getHost(): string {
        return $this->host;
    }

    public function connect(): string {
        $this->connected = true;
        return "Connected to {$this->database} on {$this->host}:{$this->port}";
    }

    public function isConnected(): bool {
        return $this->connected;
    }
}

// Tests (must still pass after refactor)
$db = new DatabaseConnection("primary", "192.168.8.133", 5432, "engram");
echo $db->getName() . "\\n";       // "primary"
echo $db->getHost() . "\\n";       // "192.168.8.133"
echo $db->connect() . "\\n";       // "Connected to engram on 192.168.8.133:5432"
echo $db->isConnected() . "\\n";   // 1 (true)`,
          solution: `<?php
class DatabaseConnection {
    private bool $connected = false;

    public function __construct(
        public readonly string $name,
        public readonly string $host,
        private int $port = 5432,
        private string $database = "main",
    ) {}

    public function getName(): string {
        return $this->name;
    }

    public function getHost(): string {
        return $this->host;
    }

    public function connect(): string {
        $this->connected = true;
        return "Connected to {$this->database} on {$this->host}:{$this->port}";
    }

    public function isConnected(): bool {
        return $this->connected;
    }
}

$db = new DatabaseConnection("primary", "192.168.8.133", 5432, "engram");
echo $db->getName() . "\\n";
echo $db->getHost() . "\\n";
echo $db->connect() . "\\n";
echo $db->isConnected() . "\\n";`,
          hints: [
            'Constructor promotion puts visibility keywords directly in the constructor parameters: `public readonly string $name` instead of declaring the property separately.',
            '`readonly` properties can only be set once (in the constructor). `$name` and `$host` never change, so they should be `readonly`.',
            '`$connected` is initialized to `false` and changed later, so it cannot use constructor promotion or `readonly`. Keep it as a separate property.',
          ],
          concepts: ['constructor promotion', 'readonly', 'refactoring', 'PHP 8 features', 'visibility'],
        },
      ],
    },
    {
      id: 'php-errors',
      title: '5. Error Handling & Files',
      explanation: `## Error Handling & Files

PHP uses try/catch for exception handling, similar to other languages:

\`\`\`php
<?php
try {
    $result = riskyOperation();
} catch (InvalidArgumentException $e) {
    echo "Bad input: " . $e->getMessage();
} catch (RuntimeException $e) {
    echo "Runtime error: " . $e->getMessage();
} catch (Exception $e) {
    echo "Something went wrong: " . $e->getMessage();
} finally {
    cleanup();  // always runs
}
\`\`\`

**Custom exceptions:**
\`\`\`php
<?php
class ConfigException extends RuntimeException {
    public function __construct(string $key, string $reason) {
        parent::__construct("Config error for '$key': $reason");
    }
}

throw new ConfigException("port", "must be between 1-65535");
\`\`\`

**File operations:**
\`\`\`php
<?php
// Reading
$content = file_get_contents("config.json");   // entire file as string
$lines = file("server.log", FILE_IGNORE_NEW_LINES);  // array of lines

// Writing
file_put_contents("output.txt", "Hello!\\n");
file_put_contents("log.txt", "new line\\n", FILE_APPEND);  // append

// JSON
$data = json_decode($content, true);   // true = associative array
$json = json_encode($data, JSON_PRETTY_PRINT);

// Check existence
file_exists("config.json");   // true/false
is_readable("config.json");   // true/false
\`\`\`

**Directory scanning:**
\`\`\`php
<?php
$files = scandir("./src");          // [".", "..", "index.ts", "lib"]
$files = glob("./src/*.ts");        // ["./src/index.ts"]
\`\`\``,
      exercises: [
        {
          id: 'php-err-1',
          title: 'Custom Exception & Validation',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'php',
          goal: 'Create a `ValidationException` class that extends `RuntimeException` and stores an array of error messages. Then write a function `validate_config` that takes an associative array and throws `ValidationException` if: "host" is missing, "port" is not between 1-65535, or "name" is empty. Collect ALL errors before throwing.',
          skeleton: `<?php
// Create ValidationException class
// Write validate_config function


// Tests
try {
    validate_config(["name" => "engram", "host" => "localhost", "port" => 4200]);
    echo "Valid config!\\n";
} catch (ValidationException $e) {
    echo "Should not get here\\n";
}

try {
    validate_config(["name" => "", "port" => 99999]);
    echo "Should not get here\\n";
} catch (ValidationException $e) {
    echo "Errors: " . implode(", ", $e->getErrors()) . "\\n";
    // "Errors: name cannot be empty, host is required, port must be between 1-65535"
}`,
          solution: `<?php
class ValidationException extends RuntimeException {
    private array $errors;

    public function __construct(array $errors) {
        $this->errors = $errors;
        parent::__construct("Validation failed: " . implode(", ", $errors));
    }

    public function getErrors(): array {
        return $this->errors;
    }
}

function validate_config(array $config): void {
    $errors = [];

    if (empty($config["name"] ?? "")) {
        $errors[] = "name cannot be empty";
    }

    if (!isset($config["host"])) {
        $errors[] = "host is required";
    }

    $port = $config["port"] ?? null;
    if ($port === null || $port < 1 || $port > 65535) {
        $errors[] = "port must be between 1-65535";
    }

    if (!empty($errors)) {
        throw new ValidationException($errors);
    }
}

try {
    validate_config(["name" => "engram", "host" => "localhost", "port" => 4200]);
    echo "Valid config!\\n";
} catch (ValidationException $e) {
    echo "Should not get here\\n";
}

try {
    validate_config(["name" => "", "port" => 99999]);
    echo "Should not get here\\n";
} catch (ValidationException $e) {
    echo "Errors: " . implode(", ", $e->getErrors()) . "\\n";
}`,
          hints: [
            'Extend `RuntimeException` and call `parent::__construct()` with a message. Store the errors array as a property with a getter.',
            'Collect errors into an array first, then throw only if the array is not empty. Use `??` (null coalescing) to handle missing keys.',
            '`empty()` checks for empty strings, null, 0, etc. `isset()` checks if a key exists and is not null. Validate port range with `< 1 || > 65535`.',
          ],
          concepts: ['custom exceptions', 'extends', 'try/catch', 'validation', 'null coalescing', 'empty', 'isset'],
        },
        {
          id: 'php-err-2',
          title: 'Safe JSON Config Loader',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'php',
          goal: 'Write a function `load_json_config` that takes a file path and an array of defaults. It reads the file, parses JSON, and merges with defaults (file values override). Handle errors: return defaults if the file is missing, throw a `RuntimeException` if JSON is invalid, and use `finally` to log which config source was used.',
          skeleton: `<?php
// Write load_json_config here
// Also write a test that simulates the behavior without real files


// Simulated tests using a helper
function test_with_string(string $json_content, array $defaults): array {
    // Simulate what load_json_config does but with a string instead of file
    $file_config = json_decode($json_content, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new RuntimeException("Invalid JSON: " . json_last_error_msg());
    }
    return array_merge($defaults, $file_config);
}

$defaults = ["port" => 8080, "debug" => false, "host" => "0.0.0.0"];

// Valid JSON
$result = test_with_string('{"port": 4200, "debug": true}', $defaults);
print_r($result);
// ["port" => 4200, "debug" => true, "host" => "0.0.0.0"]

// Invalid JSON
try {
    test_with_string('{invalid json}', $defaults);
} catch (RuntimeException $e) {
    echo "Caught: " . $e->getMessage() . "\\n";
}`,
          solution: `<?php
function load_json_config(string $path, array $defaults): array {
    $source = "defaults";
    try {
        if (!file_exists($path)) {
            return $defaults;
        }

        $content = file_get_contents($path);
        if ($content === false) {
            throw new RuntimeException("Could not read file: $path");
        }

        $file_config = json_decode($content, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new RuntimeException("Invalid JSON in $path: " . json_last_error_msg());
        }

        $source = "file";
        return array_merge($defaults, $file_config);
    } finally {
        echo "[Config loaded from: $source]\\n";
    }
}

function test_with_string(string $json_content, array $defaults): array {
    $file_config = json_decode($json_content, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new RuntimeException("Invalid JSON: " . json_last_error_msg());
    }
    return array_merge($defaults, $file_config);
}

$defaults = ["port" => 8080, "debug" => false, "host" => "0.0.0.0"];

$result = test_with_string('{"port": 4200, "debug": true}', $defaults);
print_r($result);

try {
    test_with_string('{invalid json}', $defaults);
} catch (RuntimeException $e) {
    echo "Caught: " . $e->getMessage() . "\\n";
}`,
          hints: [
            'Check `file_exists()` first. Use `file_get_contents()` to read the file, `json_decode($content, true)` to parse as an associative array.',
            '`json_last_error()` returns `JSON_ERROR_NONE` on success. `json_last_error_msg()` gives a human-readable error. Throw `RuntimeException` on parse failure.',
            '`array_merge($defaults, $file_config)` merges arrays with file values overriding defaults. Use `finally` to always log the config source.',
          ],
          concepts: ['file_get_contents', 'json_decode', 'json_last_error', 'try/catch/finally', 'array_merge', 'RuntimeException'],
        },
      ],
    },
  ],
};
