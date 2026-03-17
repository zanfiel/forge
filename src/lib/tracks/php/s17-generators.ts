import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-gen',
  title: '17. Generators',
  explanation: `## Generators in PHP

Generators provide an easy way to implement iterators without the overhead of building an array in memory. A generator function uses **yield** to produce values one at a time.

### Basic Generator
\`\`\`php
function countdown(int \$from): Generator {
    for (\$i = \$from; \$i > 0; \$i--) {
        yield \$i;
    }
}

foreach (countdown(3) as \$num) {
    echo \$num . ' '; // 3 2 1
}
\`\`\`

### yield with Keys
\`\`\`php
function indexedItems(): Generator {
    yield 'a' => 'Apple';
    yield 'b' => 'Banana';
}

foreach (indexedItems() as \$key => \$val) {
    echo "\$key: \$val\\n";
}
\`\`\`

### yield from (Delegation)
\`\`\`php
function inner(): Generator {
    yield 1;
    yield 2;
}

function outer(): Generator {
    yield 0;
    yield from inner();
    yield 3;
}
// Produces: 0, 1, 2, 3
\`\`\`

### send() - Sending Values In
\`\`\`php
function accumulator(): Generator {
    \$total = 0;
    while (true) {
        \$value = yield \$total;
        \$total += \$value;
    }
}

\$gen = accumulator();
\$gen->current();       // 0
\$gen->send(5);         // 5
\$gen->send(3);         // 8
\`\`\`

### Memory Efficiency
Generators are perfect for processing large datasets:
\`\`\`php
function readLines(string \$file): Generator {
    \$fh = fopen(\$file, 'r');
    while ((\$line = fgets(\$fh)) !== false) {
        yield trim(\$line);
    }
    fclose(\$fh);
}
\`\`\``,
  exercises: [
    {
      id: 'php-gen-1',
      title: 'Basic Generator with yield',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to create a generator that yields 1, 2, 3.',
      skeleton: `<?php
function numbers(): Generator {
    ___ 1;
    ___ 2;
    ___ 3;
}

foreach (numbers() as \$n) {
    echo \$n . ' ';
}`,
      solution: `<?php
function numbers(): Generator {
    yield 1;
    yield 2;
    yield 3;
}

foreach (numbers() as \$n) {
    echo \$n . ' ';
}`,
      hints: [
        'Use the "yield" keyword to produce each value.',
        'Each yield pauses the function and returns the value.',
        'The function resumes on the next iteration.',
      ],
      concepts: ['yield', 'generator-basics', 'lazy-evaluation'],
    },
    {
      id: 'php-gen-2',
      title: 'Generator with Loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks for a range generator.',
      skeleton: `<?php
function range_gen(int \$start, int \$end): ___ {
    for (\$i = \$start; \$i <= \$end; \$i++) {
        ___ \$i;
    }
}`,
      solution: `<?php
function range_gen(int \$start, int \$end): Generator {
    for (\$i = \$start; \$i <= \$end; \$i++) {
        yield \$i;
    }
}`,
      hints: [
        'The return type for a generator function is Generator.',
        'Use yield inside the loop to produce each value.',
        'The generator pauses at each yield.',
      ],
      concepts: ['Generator-type', 'yield-in-loop', 'range'],
    },
    {
      id: 'php-gen-3',
      title: 'yield with Key-Value Pairs',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to yield key-value pairs.',
      skeleton: `<?php
function fruitColors(): Generator {
    ___ 'apple' => 'red';
    ___ 'banana' => 'yellow';
    ___ 'grape' => 'purple';
}

foreach (fruitColors() as \$fruit ___ \$color) {
    echo "\$fruit is \$color\\n";
}`,
      solution: `<?php
function fruitColors(): Generator {
    yield 'apple' => 'red';
    yield 'banana' => 'yellow';
    yield 'grape' => 'purple';
}

foreach (fruitColors() as \$fruit => \$color) {
    echo "\$fruit is \$color\\n";
}`,
      hints: [
        'Use "yield key => value" to produce key-value pairs.',
        'In the foreach, destructure with $key => $value.',
        'The => operator works with yield just like with arrays.',
      ],
      concepts: ['yield-key-value', 'generator-keys', 'foreach-destructure'],
    },
    {
      id: 'php-gen-4',
      title: 'yield from Delegation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to delegate to another generator.',
      skeleton: `<?php
function letters(): Generator {
    yield 'a';
    yield 'b';
}

function combined(): Generator {
    yield 'start';
    ___ ___ letters();
    yield 'end';
}`,
      solution: `<?php
function letters(): Generator {
    yield 'a';
    yield 'b';
}

function combined(): Generator {
    yield 'start';
    yield from letters();
    yield 'end';
}`,
      hints: [
        'Use "yield from" to delegate to another generator.',
        'This inlines all values from the sub-generator.',
        'The sequence will be: start, a, b, end.',
      ],
      concepts: ['yield-from', 'generator-delegation', 'composition'],
    },
    {
      id: 'php-gen-5',
      title: 'Using send()',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Fill in the blanks to use send() with a generator.',
      skeleton: `<?php
function printer(): Generator {
    while (true) {
        \$received = ___;
        if (\$received === null) break;
        echo \$received . ' ';
    }
}

\$gen = printer();
\$gen->current();
\$gen->___('hello');
\$gen->___('world');`,
      solution: `<?php
function printer(): Generator {
    while (true) {
        \$received = yield;
        if (\$received === null) break;
        echo \$received . ' ';
    }
}

\$gen = printer();
\$gen->current();
\$gen->send('hello');
\$gen->send('world');`,
      hints: [
        'A bare "yield" with no value receives sent data.',
        'The sent value becomes the result of the yield expression.',
        'Use send() to push values into the generator.',
      ],
      concepts: ['send', 'coroutine', 'bidirectional'],
    },
    {
      id: 'php-gen-6',
      title: 'Generator Return Value',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Fill in the blanks to get a generator return value.',
      skeleton: `<?php
function sumGen(): Generator {
    \$sum = 0;
    \$sum += yield;
    \$sum += yield;
    ___ \$sum;
}

\$g = sumGen();
\$g->current();
\$g->send(10);
\$g->send(20);
echo \$g->___();`,
      solution: `<?php
function sumGen(): Generator {
    \$sum = 0;
    \$sum += yield;
    \$sum += yield;
    return \$sum;
}

\$g = sumGen();
\$g->current();
\$g->send(10);
\$g->send(20);
echo \$g->getReturn();`,
      hints: [
        'Generators can use "return" to set a final value.',
        'Access the return value with getReturn().',
        'getReturn() is only available after the generator completes.',
      ],
      concepts: ['generator-return', 'getReturn', 'final-value'],
    },
    {
      id: 'php-gen-7',
      title: 'Write a Fibonacci Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a generator function fibonacci(int $limit) that yields Fibonacci numbers up to $limit. Start with 0, 1.',
      skeleton: `<?php
// Write the fibonacci generator`,
      solution: `<?php
function fibonacci(int \$limit): Generator {
    \$a = 0;
    \$b = 1;
    while (\$a <= \$limit) {
        yield \$a;
        [\$a, \$b] = [\$b, \$a + \$b];
    }
}`,
      hints: [
        'Start with $a = 0, $b = 1.',
        'Yield $a, then update: [$a, $b] = [$b, $a + $b].',
        'Continue while $a <= $limit.',
      ],
      concepts: ['fibonacci', 'generator', 'swap-variables'],
    },
    {
      id: 'php-gen-8',
      title: 'Write a Chunk Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a generator function chunks(array $arr, int $size) that yields array chunks of the given size.',
      skeleton: `<?php
// Write the chunks generator`,
      solution: `<?php
function chunks(array \$arr, int \$size): Generator {
    for (\$i = 0; \$i < count(\$arr); \$i += \$size) {
        yield array_slice(\$arr, \$i, \$size);
    }
}`,
      hints: [
        'Loop through the array stepping by $size.',
        'Use array_slice to extract each chunk.',
        'Yield each chunk as an array.',
      ],
      concepts: ['chunking', 'array_slice', 'generator'],
    },
    {
      id: 'php-gen-9',
      title: 'Write a Filter Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a generator function filter(Generator $gen, callable $predicate) that yields only values for which $predicate returns true.',
      skeleton: `<?php
// Write the filter generator`,
      solution: `<?php
function filter(Generator \$gen, callable \$predicate): Generator {
    foreach (\$gen as \$value) {
        if (\$predicate(\$value)) {
            yield \$value;
        }
    }
}`,
      hints: [
        'Iterate over the generator with foreach.',
        'Call $predicate on each value.',
        'Only yield values where predicate returns true.',
      ],
      concepts: ['filter-pattern', 'higher-order-generator', 'predicate'],
    },
    {
      id: 'php-gen-10',
      title: 'Write a Map Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a generator function mapGen(Generator $gen, callable $fn) that yields the result of applying $fn to each value from $gen.',
      skeleton: `<?php
// Write the mapGen generator`,
      solution: `<?php
function mapGen(Generator \$gen, callable \$fn): Generator {
    foreach (\$gen as \$value) {
        yield \$fn(\$value);
    }
}`,
      hints: [
        'Iterate over the source generator.',
        'Apply $fn to each value.',
        'Yield the transformed value.',
      ],
      concepts: ['map-pattern', 'transformation', 'generator-pipeline'],
    },
    {
      id: 'php-gen-11',
      title: 'Write a Take Generator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Write a generator function take(Generator $gen, int $n) that yields only the first $n values from $gen.',
      skeleton: `<?php
// Write the take generator`,
      solution: `<?php
function take(Generator \$gen, int \$n): Generator {
    \$count = 0;
    foreach (\$gen as \$value) {
        if (\$count >= \$n) {
            return;
        }
        yield \$value;
        \$count++;
    }
}`,
      hints: [
        'Keep a counter of yielded values.',
        'Stop when the counter reaches $n.',
        'Use return to terminate the generator early.',
      ],
      concepts: ['take-pattern', 'early-termination', 'generator'],
    },
    {
      id: 'php-gen-12',
      title: 'Write an Infinite Counter Generator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Write a generator function counter(int $start = 0) that yields an infinite sequence of incrementing integers starting from $start.',
      skeleton: `<?php
// Write the counter generator`,
      solution: `<?php
function counter(int \$start = 0): Generator {
    \$i = \$start;
    while (true) {
        yield \$i++;
    }
}`,
      hints: [
        'Use while(true) for an infinite loop.',
        'Yield the current value and increment.',
        'Callers will use break or a take function to limit output.',
      ],
      concepts: ['infinite-generator', 'lazy-sequence', 'while-true'],
    },
    {
      id: 'php-gen-13',
      title: 'Fix Generator Not Iterable',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the function so it returns a generator instead of an array.',
      skeleton: `<?php
function evens(int \$max): array {
    \$result = [];
    for (\$i = 2; \$i <= \$max; \$i += 2) {
        \$result[] = \$i;
    }
    return \$result;
}

// Should work as a generator for memory efficiency
foreach (evens(1000000) as \$n) {
    if (\$n > 10) break;
    echo \$n . ' ';
}`,
      solution: `<?php
function evens(int \$max): Generator {
    for (\$i = 2; \$i <= \$max; \$i += 2) {
        yield \$i;
    }
}

foreach (evens(1000000) as \$n) {
    if (\$n > 10) break;
    echo \$n . ' ';
}`,
      hints: [
        'Replace the array accumulation with yield.',
        'Change the return type to Generator.',
        'Remove the $result array entirely.',
      ],
      concepts: ['array-to-generator', 'memory-efficiency', 'yield'],
    },
    {
      id: 'php-gen-14',
      title: 'Fix Forgotten current() Call',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the send() usage - the generator must be initialized first.',
      skeleton: `<?php
function doubler(): Generator {
    while (true) {
        \$val = yield;
        echo (\$val * 2) . ' ';
    }
}

\$g = doubler();
// BUG: send() without initializing the generator
\$g->send(5);
\$g->send(10);`,
      solution: `<?php
function doubler(): Generator {
    while (true) {
        \$val = yield;
        echo (\$val * 2) . ' ';
    }
}

\$g = doubler();
\$g->current(); // Initialize the generator
\$g->send(5);
\$g->send(10);`,
      hints: [
        'A generator must be initialized before send() works.',
        'Call current() first to advance to the first yield.',
        'Then send() will deliver the value to the yield expression.',
      ],
      concepts: ['generator-initialization', 'current', 'send-prerequisite'],
    },
    {
      id: 'php-gen-15',
      title: 'Fix yield from with Array',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the generator delegation that incorrectly yields an array as a single value.',
      skeleton: `<?php
function wrapper(): Generator {
    \$items = [1, 2, 3];
    yield \$items;  // BUG: yields the whole array as one value
}

foreach (wrapper() as \$val) {
    echo \$val . ' '; // Should print "1 2 3"
}`,
      solution: `<?php
function wrapper(): Generator {
    \$items = [1, 2, 3];
    yield from \$items;
}

foreach (wrapper() as \$val) {
    echo \$val . ' ';
}`,
      hints: [
        'Use "yield from" to delegate to an array or iterable.',
        'Plain yield would yield the entire array as a single value.',
        'yield from unpacks the array into individual values.',
      ],
      concepts: ['yield-from', 'array-delegation', 'unpacking'],
    },
    {
      id: 'php-gen-16',
      title: 'Predict Generator Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
function gen(): Generator {
    yield 'a';
    yield 'b';
    yield 'c';
}

\$g = gen();
echo \$g->current();
\$g->next();
echo \$g->current();`,
      solution: `ab`,
      hints: [
        'current() returns the current yielded value.',
        'next() advances the generator to the next yield.',
        'First current() gives "a", after next(), current() gives "b".',
      ],
      concepts: ['current', 'next', 'generator-api'],
    },
    {
      id: 'php-gen-17',
      title: 'Predict yield from Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
function a(): Generator {
    yield 1;
    yield 2;
}

function b(): Generator {
    yield 0;
    yield from a();
    yield 3;
}

\$result = [];
foreach (b() as \$v) {
    \$result[] = \$v;
}
echo implode(',', \$result);`,
      solution: `0,1,2,3`,
      hints: [
        'b() yields 0, then delegates to a() which yields 1 and 2.',
        'After a() completes, b() yields 3.',
        'The sequence is 0, 1, 2, 3.',
      ],
      concepts: ['yield-from', 'delegation-order', 'sequence'],
    },
    {
      id: 'php-gen-18',
      title: 'Predict send() Output',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Predict what this code outputs.',
      skeleton: `<?php
function adder(): Generator {
    \$sum = 0;
    while (true) {
        \$val = yield \$sum;
        if (\$val === null) return;
        \$sum += \$val;
    }
}

\$g = adder();
echo \$g->current() . ',';
echo \$g->send(10) . ',';
echo \$g->send(20) . ',';
echo \$g->send(5);`,
      solution: `0,10,30,35`,
      hints: [
        'current() returns the first yielded value (sum = 0).',
        'send(10) sets $val=10, sum becomes 10, yields 10.',
        'send(20) sets $val=20, sum becomes 30, yields 30.',
        'send(5) sets $val=5, sum becomes 35, yields 35.',
      ],
      concepts: ['send', 'accumulator-pattern', 'generator-state'],
    },
    {
      id: 'php-gen-19',
      title: 'Refactor Array Builder to Generator',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the function from building an array to using a generator for memory efficiency.',
      skeleton: `<?php
function powers(int \$base, int \$count): array {
    \$result = [];
    for (\$i = 0; \$i < \$count; \$i++) {
        \$result[] = \$base ** \$i;
    }
    return \$result;
}

foreach (powers(2, 5) as \$p) {
    echo \$p . ' ';
}`,
      solution: `<?php
function powers(int \$base, int \$count): Generator {
    for (\$i = 0; \$i < \$count; \$i++) {
        yield \$base ** \$i;
    }
}

foreach (powers(2, 5) as \$p) {
    echo \$p . ' ';
}`,
      hints: [
        'Replace the $result array with yield statements.',
        'Change return type from array to Generator.',
        'The foreach usage stays the same.',
      ],
      concepts: ['refactor-to-generator', 'memory-optimization', 'lazy-evaluation'],
    },
    {
      id: 'php-gen-20',
      title: 'Refactor Nested Loops to yield from',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the flat generator with nested logic into composed generators using yield from.',
      skeleton: `<?php
function allItems(): Generator {
    // Headers
    yield 'header1';
    yield 'header2';

    // Body items
    for (\$i = 1; \$i <= 3; \$i++) {
        yield "item\$i";
    }

    // Footers
    yield 'footer1';
    yield 'footer2';
}`,
      solution: `<?php
function headers(): Generator {
    yield 'header1';
    yield 'header2';
}

function bodyItems(): Generator {
    for (\$i = 1; \$i <= 3; \$i++) {
        yield "item\$i";
    }
}

function footers(): Generator {
    yield 'footer1';
    yield 'footer2';
}

function allItems(): Generator {
    yield from headers();
    yield from bodyItems();
    yield from footers();
}`,
      hints: [
        'Extract each section into its own generator function.',
        'Use yield from to compose them in allItems().',
        'This improves readability and reusability.',
      ],
      concepts: ['generator-composition', 'yield-from', 'separation-of-concerns'],
    },
  ],
};
