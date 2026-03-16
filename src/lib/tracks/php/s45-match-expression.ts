import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-match',
  title: '45. Match Expression',
  explanation: `## Match Expression (PHP 8.0)

The match expression is a more powerful and safer alternative to switch. It uses strict comparison, returns values, and does not fall through.

### Basic Match
\`\`\`php
<?php
\$status = 200;
\$text = match (\$status) {
    200 => 'OK',
    301 => 'Moved',
    404 => 'Not Found',
    500 => 'Server Error',
};
echo \$text; // "OK"
\`\`\`

### No-Match Exception
\`\`\`php
<?php
\$val = 999;
\$result = match (\$val) {
    1 => 'one',
    2 => 'two',
};
// Throws UnhandledMatchError if no arm matches
\`\`\`

### Multiple Conditions
\`\`\`php
<?php
\$code = 'b';
\$type = match (\$code) {
    'a', 'b', 'c' => 'letter',
    '1', '2', '3' => 'digit',
    default => 'unknown',
};
\`\`\`

### Complex Expressions
\`\`\`php
<?php
\$age = 25;
\$category = match (true) {
    \$age < 13 => 'child',
    \$age < 18 => 'teen',
    \$age < 65 => 'adult',
    default => 'senior',
};
\`\`\`

### Match vs Switch
\`\`\`php
<?php
// switch uses loose comparison (==)
// match uses strict comparison (===)
\$val = '0';
\$switchResult = ''; // switch(true) would match case 0:
\$matchResult = match (\$val) {
    0 => 'zero int',    // does NOT match (strict)
    '0' => 'zero str',  // matches!
    default => 'other',
};
\`\`\``,
  exercises: [
    {
      id: 'php-match-1',
      title: 'Basic Match Expression',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to use a match expression.',
      skeleton: `<?php
\$day = 'Mon';
\$type = ___ (\$day) {
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri' => 'weekday',
    'Sat', 'Sun' => 'weekend',
};
echo \$type;`,
      solution: `<?php
\$day = 'Mon';
\$type = match (\$day) {
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri' => 'weekday',
    'Sat', 'Sun' => 'weekend',
};
echo \$type;`,
      hints: [
        'Use the match keyword instead of switch.',
        'match is an expression that returns a value.',
        'Separate multiple conditions with commas.',
      ],
      concepts: ['match', 'expression', 'multi-condition'],
    },
    {
      id: 'php-match-2',
      title: 'Match with Default',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to add a default case to a match expression.',
      skeleton: `<?php
\$code = 418;
\$msg = match (\$code) {
    200 => 'OK',
    404 => 'Not Found',
    ___ => 'Unknown',
};
echo \$msg;`,
      solution: `<?php
\$code = 418;
\$msg = match (\$code) {
    200 => 'OK',
    404 => 'Not Found',
    default => 'Unknown',
};
echo \$msg;`,
      hints: [
        'Use default as the catch-all arm.',
        'Without default, unmatched values throw UnhandledMatchError.',
        'default should be the last arm.',
      ],
      concepts: ['default', 'catch-all', 'UnhandledMatchError'],
    },
    {
      id: 'php-match-3',
      title: 'Match with true',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to use match(true) for range checking.',
      skeleton: `<?php
\$score = 85;
\$grade = match (___) {
    \$score >= 90 => 'A',
    \$score >= 80 => 'B',
    \$score >= 70 => 'C',
    default => 'F',
};
echo \$grade;`,
      solution: `<?php
\$score = 85;
\$grade = match (true) {
    \$score >= 90 => 'A',
    \$score >= 80 => 'B',
    \$score >= 70 => 'C',
    default => 'F',
};
echo \$grade;`,
      hints: [
        'match(true) evaluates each arm as a boolean condition.',
        'The first truthy arm wins.',
        'This replaces complex if/elseif chains.',
      ],
      concepts: ['match-true', 'boolean-conditions', 'range-check'],
    },
    {
      id: 'php-match-4',
      title: 'Match Return Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to assign the match result to a variable.',
      skeleton: `<?php
\$op = '+';
\$a = 10;
\$b = 5;
\$result = match (\$op) {
    '+' => \$a ___ \$b,
    '-' => \$a - \$b,
    '*' => \$a * \$b,
};
echo \$result;`,
      solution: `<?php
\$op = '+';
\$a = 10;
\$b = 5;
\$result = match (\$op) {
    '+' => \$a + \$b,
    '-' => \$a - \$b,
    '*' => \$a * \$b,
};
echo \$result;`,
      hints: [
        'Each arm returns the value of its expression.',
        'The + operator adds the two numbers.',
        'match is an expression, so the whole thing returns a value.',
      ],
      concepts: ['expression-result', 'arithmetic', 'match-value'],
    },
    {
      id: 'php-match-5',
      title: 'Match with No-Arg Expressions',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to match against function calls.',
      skeleton: `<?php
\$input = '  hello  ';
\$result = match (true) {
    strlen(trim(\$input)) === 0 => 'empty',
    strlen(trim(\$input)) ___ 10 => 'short',
    default => 'long',
};
echo \$result;`,
      solution: `<?php
\$input = '  hello  ';
\$result = match (true) {
    strlen(trim(\$input)) === 0 => 'empty',
    strlen(trim(\$input)) <= 10 => 'short',
    default => 'long',
};
echo \$result;`,
      hints: [
        'Use <= for "less than or equal to".',
        'trim("  hello  ") is "hello" with length 5.',
        '5 <= 10 is true, so "short" is returned.',
      ],
      concepts: ['match-true', 'function-calls', 'comparison'],
    },
    {
      id: 'php-match-6',
      title: 'Match with Enum',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to match on an enum value.',
      skeleton: `<?php
enum Color {
    case Red;
    case Green;
    case Blue;
}

\$color = Color::Green;
\$hex = match (\$color) {
    Color::Red => '#FF0000',
    ___ => '#00FF00',
    Color::Blue => '#0000FF',
};
echo \$hex;`,
      solution: `<?php
enum Color {
    case Red;
    case Green;
    case Blue;
}

\$color = Color::Green;
\$hex = match (\$color) {
    Color::Red => '#FF0000',
    Color::Green => '#00FF00',
    Color::Blue => '#0000FF',
};
echo \$hex;`,
      hints: [
        'Match on enum cases using EnumName::CaseName.',
        'Match uses strict === comparison.',
        'Enums work naturally with match.',
      ],
      concepts: ['enum-match', 'strict-comparison', 'Color'],
    },
    {
      id: 'php-match-7',
      title: 'Write a HTTP Status Mapper',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Write a function httpStatus(int $code): string that uses match to return status text. Map 200=>"OK", 201=>"Created", 301=>"Moved", 400=>"Bad Request", 404=>"Not Found", 500=>"Server Error", default=>"Unknown".',
      skeleton: `<?php
// Write the httpStatus function`,
      solution: `<?php
function httpStatus(int \$code): string {
    return match (\$code) {
        200 => 'OK',
        201 => 'Created',
        301 => 'Moved',
        400 => 'Bad Request',
        404 => 'Not Found',
        500 => 'Server Error',
        default => 'Unknown',
    };
}`,
      hints: [
        'Use match with the $code as the subject.',
        'Each status code maps to a string.',
        'Include a default for unknown codes.',
      ],
      concepts: ['match', 'HTTP-status', 'mapping'],
    },
    {
      id: 'php-match-8',
      title: 'Write a Type Formatter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function formatValue(mixed $val): string that uses match(true) with is_* checks to format: ints as number_format, floats to 2 decimals, bools as "true"/"false", strings quoted, null as "null".',
      skeleton: `<?php
// Write the formatValue function`,
      solution: `<?php
function formatValue(mixed \$val): string {
    return match (true) {
        is_null(\$val) => 'null',
        is_bool(\$val) => \$val ? 'true' : 'false',
        is_int(\$val) => number_format(\$val),
        is_float(\$val) => number_format(\$val, 2),
        is_string(\$val) => '"' . \$val . '"',
        default => (string) \$val,
    };
}`,
      hints: [
        'Use match(true) with is_* type checks.',
        'Check null and bool before int.',
        'Format each type differently.',
      ],
      concepts: ['match-true', 'type-formatting', 'is-functions'],
    },
    {
      id: 'php-match-9',
      title: 'Write a Calculator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function calc(float $a, string $op, float $b): float that supports +, -, *, /. Throw InvalidArgumentException for division by zero and unknown operators.',
      skeleton: `<?php
// Write the calc function using match`,
      solution: `<?php
function calc(float \$a, string \$op, float \$b): float {
    return match (\$op) {
        '+' => \$a + \$b,
        '-' => \$a - \$b,
        '*' => \$a * \$b,
        '/' => \$b != 0 ? \$a / \$b : throw new InvalidArgumentException('Division by zero'),
        default => throw new InvalidArgumentException("Unknown operator: \$op"),
    };
}`,
      hints: [
        'Use match on the operator string.',
        'Division needs a zero check.',
        'throw expressions work inside match arms (PHP 8.0).',
      ],
      concepts: ['match-expression', 'throw-expression', 'calculator'],
    },
    {
      id: 'php-match-10',
      title: 'Write a Season Detector',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function season(int $month): string that returns "Winter" for 12,1,2; "Spring" for 3,4,5; "Summer" for 6,7,8; "Fall" for 9,10,11.',
      skeleton: `<?php
// Write the season function using match`,
      solution: `<?php
function season(int \$month): string {
    return match (\$month) {
        12, 1, 2 => 'Winter',
        3, 4, 5 => 'Spring',
        6, 7, 8 => 'Summer',
        9, 10, 11 => 'Fall',
        default => throw new InvalidArgumentException('Invalid month'),
    };
}`,
      hints: [
        'Use comma-separated values for multiple matches.',
        '12, 1, 2 => "Winter" matches any of those months.',
        'Add default for invalid input.',
      ],
      concepts: ['multi-value-match', 'season', 'comma-separated'],
    },
    {
      id: 'php-match-11',
      title: 'Write Permission Level Checker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function canAccess(string $role, string $resource): bool using nested match. Admin can access all. Editor can access "posts" and "pages". Viewer can access "posts" only.',
      skeleton: `<?php
// Write the canAccess function using match`,
      solution: `<?php
function canAccess(string \$role, string \$resource): bool {
    return match (\$role) {
        'admin' => true,
        'editor' => match (\$resource) {
            'posts', 'pages' => true,
            default => false,
        },
        'viewer' => match (\$resource) {
            'posts' => true,
            default => false,
        },
        default => false,
    };
}`,
      hints: [
        'Nest match expressions for multi-dimensional checks.',
        'Admin always returns true.',
        'Default to false for unknown roles/resources.',
      ],
      concepts: ['nested-match', 'RBAC', 'permission'],
    },
    {
      id: 'php-match-12',
      title: 'Write a Comparator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function compare(mixed $a, mixed $b): int using match(true). Return -1 if $a < $b, 0 if equal, 1 if $a > $b. Use the spaceship operator inside match.',
      skeleton: `<?php
// Write the compare function`,
      solution: `<?php
function compare(mixed \$a, mixed \$b): int {
    return match (true) {
        \$a < \$b => -1,
        \$a > \$b => 1,
        default => 0,
    };
}`,
      hints: [
        'Use match(true) with comparison conditions.',
        'Three cases: less than, greater than, equal.',
        'The spaceship operator ($a <=> $b) does this in one step.',
      ],
      concepts: ['comparison', 'match-true', 'three-way'],
    },
    {
      id: 'php-match-13',
      title: 'Fix Switch to Match (Strict)',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the switch that uses loose comparison, causing "0" to match the integer 0 case.',
      skeleton: `<?php
\$val = '0';
switch (\$val) {
    case 0: \$result = 'zero int'; break;
    case '0': \$result = 'zero str'; break;
    default: \$result = 'other';
}
echo \$result;
// Outputs "zero int" but should output "zero str"`,
      solution: `<?php
\$val = '0';
\$result = match (\$val) {
    0 => 'zero int',
    '0' => 'zero str',
    default => 'other',
};
echo \$result;`,
      hints: [
        'switch uses loose comparison (==).',
        'match uses strict comparison (===).',
        'With match, "0" only matches the string "0".',
      ],
      concepts: ['strict-vs-loose', 'match-safety', 'type-coercion'],
    },
    {
      id: 'php-match-14',
      title: 'Fix Missing Default',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the match that throws UnhandledMatchError for unexpected values.',
      skeleton: `<?php
function getLabel(string \$status): string {
    return match (\$status) {
        'active' => 'Active',
        'inactive' => 'Inactive',
    };
}
echo getLabel('pending');`,
      solution: `<?php
function getLabel(string \$status): string {
    return match (\$status) {
        'active' => 'Active',
        'inactive' => 'Inactive',
        default => 'Unknown',
    };
}
echo getLabel('pending');`,
      hints: [
        'match throws UnhandledMatchError if no arm matches.',
        'Add a default arm for unmatched values.',
        'This prevents runtime errors on unexpected input.',
      ],
      concepts: ['UnhandledMatchError', 'default', 'defensive-coding'],
    },
    {
      id: 'php-match-15',
      title: 'Fix Fallthrough Bug from Switch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the switch with missing break that causes fallthrough.',
      skeleton: `<?php
\$v = 'b';
switch (\$v) {
    case 'a':
        \$r = 'alpha';
    case 'b':
        \$r = 'beta';
    case 'c':
        \$r = 'gamma';
}
echo \$r;
// Outputs "gamma" instead of "beta"`,
      solution: `<?php
\$v = 'b';
\$r = match (\$v) {
    'a' => 'alpha',
    'b' => 'beta',
    'c' => 'gamma',
};
echo \$r;`,
      hints: [
        'switch falls through without break statements.',
        'match does not have fallthrough.',
        'Convert to match for safety.',
      ],
      concepts: ['no-fallthrough', 'match-safety', 'switch-bug'],
    },
    {
      id: 'php-match-16',
      title: 'Predict Match Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output of a basic match expression.',
      skeleton: `<?php
\$x = 2;
echo match (\$x) {
    1 => 'one',
    2 => 'two',
    3 => 'three',
};`,
      solution: `two`,
      hints: [
        '$x is 2.',
        'The second arm matches.',
        'match returns "two".',
      ],
      concepts: ['match', 'exact-match', 'return-value'],
    },
    {
      id: 'php-match-17',
      title: 'Predict Strict Comparison',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the match result with strict type comparison.',
      skeleton: `<?php
echo match (0) {
    null => 'null',
    false => 'false',
    '0' => 'string zero',
    0 => 'int zero',
};`,
      solution: `int zero`,
      hints: [
        'match uses === (strict comparison).',
        '0 === null is false.',
        '0 === false is false.',
        '0 === "0" is false.',
        '0 === 0 is true.',
      ],
      concepts: ['strict-identity', 'match', 'type-safety'],
    },
    {
      id: 'php-match-18',
      title: 'Predict match(true) Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output of match(true) with range conditions.',
      skeleton: `<?php
\$n = 50;
echo match (true) {
    \$n < 0 => 'negative',
    \$n === 0 => 'zero',
    \$n <= 100 => 'normal',
    default => 'high',
};`,
      solution: `normal`,
      hints: [
        '50 < 0 is false.',
        '50 === 0 is false.',
        '50 <= 100 is true, returns "normal".',
      ],
      concepts: ['match-true', 'first-match-wins', 'range'],
    },
    {
      id: 'php-match-19',
      title: 'Refactor Switch to Match',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the switch statement to a match expression.',
      skeleton: `<?php
\$ext = 'jpg';
switch (\$ext) {
    case 'jpg':
    case 'png':
    case 'gif':
        \$type = 'image';
        break;
    case 'mp4':
    case 'avi':
        \$type = 'video';
        break;
    default:
        \$type = 'other';
        break;
}
echo \$type;`,
      solution: `<?php
\$ext = 'jpg';
\$type = match (\$ext) {
    'jpg', 'png', 'gif' => 'image',
    'mp4', 'avi' => 'video',
    default => 'other',
};
echo \$type;`,
      hints: [
        'Group fallthrough cases with commas in match.',
        'match is an expression, assign directly.',
        'No break statements needed.',
      ],
      concepts: ['switch-to-match', 'refactor', 'comma-grouping'],
    },
    {
      id: 'php-match-20',
      title: 'Refactor if/elseif to match(true)',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the if/elseif chain to match(true).',
      skeleton: `<?php
function classify(float \$bmi): string {
    if (\$bmi < 18.5) {
        return 'underweight';
    } elseif (\$bmi < 25) {
        return 'normal';
    } elseif (\$bmi < 30) {
        return 'overweight';
    } else {
        return 'obese';
    }
}`,
      solution: `<?php
function classify(float \$bmi): string {
    return match (true) {
        \$bmi < 18.5 => 'underweight',
        \$bmi < 25 => 'normal',
        \$bmi < 30 => 'overweight',
        default => 'obese',
    };
}`,
      hints: [
        'match(true) replaces if/elseif chains cleanly.',
        'Each condition becomes a match arm.',
        'The else becomes default.',
      ],
      concepts: ['if-to-match', 'match-true', 'clean-code'],
    },
  ],
};
