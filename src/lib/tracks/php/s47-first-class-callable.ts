import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-callable',
  title: '47. First-Class Callables',
  explanation: `## First-Class Callable Syntax (PHP 8.1)

PHP 8.1 introduced first-class callable syntax, making it easy to create Closure objects from functions and methods using the \`...\` operator.

### Creating Closures from Functions
\`\`\`php
<?php
// Old way (PHP < 8.1)
\$fn = Closure::fromCallable('strlen');

// New way (PHP 8.1+)
\$fn = strlen(...);
echo \$fn('hello'); // 5
\`\`\`

### Method References
\`\`\`php
<?php
class Formatter {
    public function upper(string \$s): string {
        return strtoupper(\$s);
    }

    public static function lower(string \$s): string {
        return strtolower(\$s);
    }
}

\$fmt = new Formatter();
\$upper = \$fmt->upper(...);
echo \$upper('hello'); // "HELLO"

\$lower = Formatter::lower(...);
echo \$lower('HELLO'); // "hello"
\`\`\`

### Higher-Order Usage
\`\`\`php
<?php
\$words = ['hello', 'world'];
\$upper = array_map(strtoupper(...), \$words);
// ["HELLO", "WORLD"]
\`\`\`

### Closures from Built-in Functions
\`\`\`php
<?php
\$trim = trim(...);
\$isInt = is_int(...);
\$sort = sort(...);

echo \$trim('  hello  '); // "hello"
echo \$isInt(42) ? 'yes' : 'no'; // "yes"
\`\`\`

### Benefits
- Type-safe: creates a real Closure object
- IDE-friendly: works with autocompletion
- Cleaner than string-based callables
- Works with all callable types: functions, methods, static methods`,
  exercises: [
    {
      id: 'php-callable-1',
      title: 'Create Closure from Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to create a Closure from the strlen function.',
      skeleton: `<?php
\$fn = ___;
echo \$fn('hello');`,
      solution: `<?php
\$fn = strlen(...);
echo \$fn('hello');`,
      hints: [
        'Use functionName(...) to create a Closure.',
        'The ... is the first-class callable syntax.',
        'This was introduced in PHP 8.1.',
      ],
      concepts: ['first-class-callable', 'syntax', 'Closure'],
    },
    {
      id: 'php-callable-2',
      title: 'Closure from Instance Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to create a Closure from an object method.',
      skeleton: `<?php
class Converter {
    public function toUpper(string \$s): string {
        return strtoupper(\$s);
    }
}

\$conv = new Converter();
\$fn = \$conv->___(...);
echo \$fn('hello');`,
      solution: `<?php
class Converter {
    public function toUpper(string \$s): string {
        return strtoupper(\$s);
    }
}

\$conv = new Converter();
\$fn = \$conv->toUpper(...);
echo \$fn('hello');`,
      hints: [
        'Use $object->method(...) for instance methods.',
        'The resulting Closure captures the object.',
        'It can be called like a regular function.',
      ],
      concepts: ['method-reference', 'instance-method', 'bound-closure'],
    },
    {
      id: 'php-callable-3',
      title: 'Closure from Static Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to create a Closure from a static method.',
      skeleton: `<?php
class Math {
    public static function square(int \$n): int {
        return \$n * \$n;
    }
}

\$fn = ___::___(...);
echo \$fn(5);`,
      solution: `<?php
class Math {
    public static function square(int \$n): int {
        return \$n * \$n;
    }
}

\$fn = Math::square(...);
echo \$fn(5);`,
      hints: [
        'Use ClassName::method(...) for static methods.',
        'No object instance is needed.',
        'The result is a Closure that calls the static method.',
      ],
      concepts: ['static-method-ref', 'class-method', 'Closure'],
    },
    {
      id: 'php-callable-4',
      title: 'Use with array_map',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to use a first-class callable with array_map.',
      skeleton: `<?php
\$numbers = ['1', '2', '3'];
\$ints = array_map(___, \$numbers);
echo implode(', ', \$ints);`,
      solution: `<?php
\$numbers = ['1', '2', '3'];
\$ints = array_map(intval(...), \$numbers);
echo implode(', ', \$ints);`,
      hints: [
        'intval(...) creates a Closure from intval.',
        'This is cleaner than passing "intval" as a string.',
        'array_map applies it to each element.',
      ],
      concepts: ['array_map', 'first-class-callable', 'conversion'],
    },
    {
      id: 'php-callable-5',
      title: 'Use with array_filter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to use a first-class callable to filter integers.',
      skeleton: `<?php
\$items = [1, 'a', 2, 'b', 3];
\$ints = array_filter(\$items, ___);
echo count(\$ints);`,
      solution: `<?php
\$items = [1, 'a', 2, 'b', 3];
\$ints = array_filter(\$items, is_int(...));
echo count(\$ints);`,
      hints: [
        'is_int(...) creates a Closure from is_int.',
        'array_filter uses it to test each element.',
        'Only elements where is_int returns true remain.',
      ],
      concepts: ['array_filter', 'is_int', 'first-class-callable'],
    },
    {
      id: 'php-callable-6',
      title: 'Chain First-Class Callables',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to use array_map with strtoupper as a first-class callable.',
      skeleton: `<?php
\$words = ['hello', 'world', 'php'];
\$upper = array_map(___, \$words);
echo implode(' ', \$upper);`,
      solution: `<?php
\$words = ['hello', 'world', 'php'];
\$upper = array_map(strtoupper(...), \$words);
echo implode(' ', \$upper);`,
      hints: [
        'strtoupper(...) creates a Closure from strtoupper.',
        'Cleaner than fn($s) => strtoupper($s).',
        'Works directly with array_map.',
      ],
      concepts: ['strtoupper', 'first-class-callable', 'array_map'],
    },
    {
      id: 'php-callable-7',
      title: 'Write a Pipe Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function pipe(mixed $value, Closure ...$fns): mixed that passes the value through each function in sequence.',
      skeleton: `<?php
// Write the pipe function`,
      solution: `<?php
function pipe(mixed \$value, Closure ...\$fns): mixed {
    foreach (\$fns as \$fn) {
        \$value = \$fn(\$value);
    }
    return \$value;
}`,
      hints: [
        'Accept a variadic list of Closures.',
        'Apply each function to the value in order.',
        'Return the final transformed value.',
      ],
      concepts: ['pipe', 'variadic-closures', 'composition'],
    },
    {
      id: 'php-callable-8',
      title: 'Write a Method Mapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function mapMethod(array $objects, string $method): array that calls the named method on each object and returns the results.',
      skeleton: `<?php
// Write the mapMethod function`,
      solution: `<?php
function mapMethod(array \$objects, string \$method): array {
    return array_map(fn(\$obj) => \$obj->\$method(), \$objects);
}`,
      hints: [
        'Use array_map with a closure.',
        'Call the method dynamically on each object.',
        '$obj->$method() calls the method by name.',
      ],
      concepts: ['dynamic-method', 'array_map', 'reflection-lite'],
    },
    {
      id: 'php-callable-9',
      title: 'Write a Callable Registry',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a class FnRegistry with methods register(string $name, Closure $fn): void and call(string $name, mixed ...$args): mixed that stores and invokes closures by name.',
      skeleton: `<?php
// Write the FnRegistry class`,
      solution: `<?php
class FnRegistry {
    private array \$fns = [];

    public function register(string \$name, Closure \$fn): void {
        \$this->fns[\$name] = \$fn;
    }

    public function call(string \$name, mixed ...\$args): mixed {
        if (!isset(\$this->fns[\$name])) {
            throw new RuntimeException("Function not registered: \$name");
        }
        return (\$this->fns[\$name])(...\$args);
    }
}`,
      hints: [
        'Store closures in an associative array keyed by name.',
        'Use the spread operator to pass variadic args.',
        'Throw if the function is not registered.',
      ],
      concepts: ['registry-pattern', 'Closure-storage', 'dynamic-dispatch'],
    },
    {
      id: 'php-callable-10',
      title: 'Write a Compose Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function compose(Closure ...$fns): Closure that returns a new Closure composing all functions right-to-left (last function is applied first).',
      skeleton: `<?php
// Write the compose function`,
      solution: `<?php
function compose(Closure ...\$fns): Closure {
    return function (mixed \$value) use (\$fns): mixed {
        foreach (array_reverse(\$fns) as \$fn) {
            \$value = \$fn(\$value);
        }
        return \$value;
    };
}`,
      hints: [
        'Reverse the function array for right-to-left application.',
        'Return a new Closure that applies them in order.',
        'compose(f, g)(x) === f(g(x)).',
      ],
      concepts: ['compose', 'right-to-left', 'higher-order'],
    },
    {
      id: 'php-callable-11',
      title: 'Write a Partial Application Helper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function partial(Closure $fn, mixed ...$partial): Closure that returns a new Closure with some arguments pre-filled.',
      skeleton: `<?php
// Write the partial function`,
      solution: `<?php
function partial(Closure \$fn, mixed ...\$partial): Closure {
    return function (mixed ...\$rest) use (\$fn, \$partial): mixed {
        return \$fn(...\$partial, ...\$rest);
    };
}`,
      hints: [
        'Capture the partial args in the returned Closure.',
        'Merge partial and remaining args with spread.',
        'This is called partial application.',
      ],
      concepts: ['partial-application', 'currying', 'spread-merge'],
    },
    {
      id: 'php-callable-12',
      title: 'Write a Memoize Wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function memoize(Closure $fn): Closure that caches results based on the first argument.',
      skeleton: `<?php
// Write the memoize function`,
      solution: `<?php
function memoize(Closure \$fn): Closure {
    \$cache = [];
    return function () use (\$fn, &\$cache): mixed {
        \$key = serialize(func_get_args());
        if (!array_key_exists(\$key, \$cache)) {
            \$cache[\$key] = \$fn(...func_get_args());
        }
        return \$cache[\$key];
    };
}`,
      hints: [
        'Use serialize(func_get_args()) as cache key.',
        'Store results in a closure-captured array.',
        'Use &$cache for reference to persist across calls.',
      ],
      concepts: ['memoization', 'closure-state', 'cache'],
    },
    {
      id: 'php-callable-13',
      title: 'Fix String Callable to First-Class',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the code that uses string-based callable (which is fragile) to use first-class callable syntax.',
      skeleton: `<?php
\$fn = 'strtolower';
\$result = array_map(\$fn, ['HELLO', 'WORLD']);
// Works but is not type-safe. Fix to use first-class callable.
echo implode(' ', \$result);`,
      solution: `<?php
\$fn = strtolower(...);
\$result = array_map(\$fn, ['HELLO', 'WORLD']);
echo implode(' ', \$result);`,
      hints: [
        'Replace the string "strtolower" with strtolower(...).',
        'First-class callables are type-safe Closure objects.',
        'IDEs can verify the function exists at write time.',
      ],
      concepts: ['string-to-closure', 'type-safety', 'first-class'],
    },
    {
      id: 'php-callable-14',
      title: 'Fix Closure::fromCallable to New Syntax',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the verbose Closure::fromCallable to use the shorter first-class callable syntax.',
      skeleton: `<?php
class Validator {
    public function isValid(string \$s): bool {
        return strlen(\$s) > 0;
    }
}

\$v = new Validator();
\$fn = Closure::fromCallable([\$v, 'isValid']);
echo \$fn('test') ? 'valid' : 'invalid';`,
      solution: `<?php
class Validator {
    public function isValid(string \$s): bool {
        return strlen(\$s) > 0;
    }
}

\$v = new Validator();
\$fn = \$v->isValid(...);
echo \$fn('test') ? 'valid' : 'invalid';`,
      hints: [
        '$v->isValid(...) replaces Closure::fromCallable.',
        'The new syntax is more concise and readable.',
        'Both produce identical Closure objects.',
      ],
      concepts: ['fromCallable-replacement', 'syntax-upgrade', 'concise'],
    },
    {
      id: 'php-callable-15',
      title: 'Fix Missing Spread Operator',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the attempt to use first-class callable syntax that forgot the spread operator.',
      skeleton: `<?php
\$fn = strlen();
echo \$fn('hello');`,
      solution: `<?php
\$fn = strlen(...);
echo \$fn('hello');`,
      hints: [
        'strlen() calls the function immediately.',
        'strlen(...) creates a Closure without calling it.',
        'The ... is essential for the first-class syntax.',
      ],
      concepts: ['spread-operator', 'call-vs-reference', 'syntax'],
    },
    {
      id: 'php-callable-16',
      title: 'Predict First-Class Callable Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output of a first-class callable.',
      skeleton: `<?php
\$fn = strtoupper(...);
echo \$fn('hello') . ' ' . \$fn('world');`,
      solution: `HELLO WORLD`,
      hints: [
        'strtoupper(...) creates a Closure.',
        'Calling $fn("hello") returns "HELLO".',
        'It works just like calling strtoupper directly.',
      ],
      concepts: ['first-class-callable', 'strtoupper', 'output'],
    },
    {
      id: 'php-callable-17',
      title: 'Predict array_map with Callable',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output when using array_map with a first-class callable.',
      skeleton: `<?php
\$result = array_map(abs(...), [-3, -1, 4, -2]);
echo implode(' ', \$result);`,
      solution: `3 1 4 2`,
      hints: [
        'abs(...) creates a Closure from abs.',
        'array_map applies it to each element.',
        'abs(-3)=3, abs(-1)=1, abs(4)=4, abs(-2)=2.',
      ],
      concepts: ['abs', 'array_map', 'first-class-callable'],
    },
    {
      id: 'php-callable-18',
      title: 'Predict Static Method Callable',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output of a static method used as first-class callable.',
      skeleton: `<?php
class Str {
    public static function reverse(string \$s): string {
        return strrev(\$s);
    }
}

\$fn = Str::reverse(...);
echo \$fn('php') . ' ' . \$fn('8.1');`,
      solution: `php 1.8`,
      hints: [
        'Str::reverse(...) creates a Closure from the static method.',
        'strrev("php") is "php" (palindrome).',
        'strrev("8.1") is "1.8".',
      ],
      concepts: ['static-callable', 'strrev', 'output'],
    },
    {
      id: 'php-callable-19',
      title: 'Refactor Anonymous Function to First-Class',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the anonymous function wrappers to use first-class callable syntax.',
      skeleton: `<?php
\$words = ['  hello  ', '  world  ', '  php  '];
\$trimmed = array_map(function (\$w) { return trim(\$w); }, \$words);
\$upper = array_map(function (\$w) { return strtoupper(\$w); }, \$trimmed);
echo implode(' ', \$upper);`,
      solution: `<?php
\$words = ['  hello  ', '  world  ', '  php  '];
\$trimmed = array_map(trim(...), \$words);
\$upper = array_map(strtoupper(...), \$trimmed);
echo implode(' ', \$upper);`,
      hints: [
        'Replace function($w) { return trim($w); } with trim(...).',
        'Same for strtoupper.',
        'First-class callables are more concise.',
      ],
      concepts: ['anonymous-to-callable', 'refactor', 'concise'],
    },
    {
      id: 'php-callable-20',
      title: 'Refactor Closure::fromCallable',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor all Closure::fromCallable usage to PHP 8.1 first-class callable syntax.',
      skeleton: `<?php
class Logger {
    public function info(string \$msg): void { echo "[INFO] \$msg"; }
    public static function error(string \$msg): void { echo "[ERROR] \$msg"; }
}

\$log = new Logger();
\$info = Closure::fromCallable([\$log, 'info']);
\$error = Closure::fromCallable([Logger::class, 'error']);
\$trim = Closure::fromCallable('trim');

\$info('hello');
\$error('oops');
echo \$trim('  hi  ');`,
      solution: `<?php
class Logger {
    public function info(string \$msg): void { echo "[INFO] \$msg"; }
    public static function error(string \$msg): void { echo "[ERROR] \$msg"; }
}

\$log = new Logger();
\$info = \$log->info(...);
\$error = Logger::error(...);
\$trim = trim(...);

\$info('hello');
\$error('oops');
echo \$trim('  hi  ');`,
      hints: [
        '$obj->method(...) replaces Closure::fromCallable([$obj, "method"]).',
        'Class::method(...) replaces static callable.',
        'functionName(...) replaces string callable.',
      ],
      concepts: ['fromCallable-to-first-class', 'modernize', 'PHP-8.1'],
    },
  ],
};
