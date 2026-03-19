import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-perf',
  title: '49. Performance',
  explanation: `## PHP Performance

Modern PHP (8.x) includes powerful performance features: OPcache, JIT compilation, preloading, and efficient memory management strategies.

### OPcache
\`\`\`php
<?php
// php.ini settings
// opcache.enable=1
// opcache.memory_consumption=128
// opcache.max_accelerated_files=10000
// opcache.validate_timestamps=0 (production)

// Check OPcache status
\$status = opcache_get_status();
echo \$status['opcache_enabled'] ? 'enabled' : 'disabled';
\`\`\`

### Preloading (PHP 7.4+)
\`\`\`php
<?php
// preload.php -- loaded once at server start
// opcache.preload=/path/to/preload.php

// Preload commonly used classes
require_once __DIR__ . '/src/Entity/User.php';
require_once __DIR__ . '/src/Entity/Product.php';
// These classes are now in shared memory
\`\`\`

### JIT Compilation (PHP 8.0+)
\`\`\`php
<?php
// php.ini
// opcache.jit=1255
// opcache.jit_buffer_size=64M

// JIT is most effective for CPU-bound code
function fibonacci(int \$n): int {
    if (\$n <= 1) return \$n;
    return fibonacci(\$n - 1) + fibonacci(\$n - 2);
}
\`\`\`

### Memory Management
\`\`\`php
<?php
echo memory_get_usage();       // current memory
echo memory_get_peak_usage();  // peak memory

// Free large variables
\$data = range(1, 1000000);
unset(\$data); // release memory

// Use generators for memory-efficient iteration
function bigRange(int \$n): Generator {
    for (\$i = 0; \$i < \$n; \$i++) yield \$i;
}
\`\`\`

### Caching Strategies
\`\`\`php
<?php
// APCu for in-memory caching
apcu_store('key', 'value', 300); // 5 min TTL
\$val = apcu_fetch('key');

// File-based caching
function cached(string \$key, callable \$fn, int \$ttl = 3600): mixed {
    \$file = sys_get_temp_dir() . "/cache_\$key";
    if (file_exists(\$file) && time() - filemtime(\$file) < \$ttl) {
        return unserialize(file_get_contents(\$file));
    }
    \$result = \$fn();
    file_put_contents(\$file, serialize(\$result));
    return \$result;
}
\`\`\``,
  exercises: [
    {
      id: 'php-perf-1',
      title: 'Check Memory Usage',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to get the current memory usage.',
      skeleton: `<?php
\$mem = ___();
echo round(\$mem / 1024 / 1024, 2) . ' MB';`,
      solution: `<?php
\$mem = memory_get_usage();
echo round(\$mem / 1024 / 1024, 2) . ' MB';`,
      hints: [
        'memory_get_usage() returns bytes of memory used.',
        'Divide by 1024 twice to convert to megabytes.',
        'round() formats the number.',
      ],
      concepts: ['memory_get_usage', 'memory-monitoring', 'bytes'],
    },
    {
      id: 'php-perf-2',
      title: 'Get Peak Memory',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to get peak memory usage.',
      skeleton: `<?php
\$data = range(1, 100000);
\$peak = ___();
unset(\$data);
echo round(\$peak / 1024 / 1024, 2) . ' MB peak';`,
      solution: `<?php
\$data = range(1, 100000);
\$peak = memory_get_peak_usage();
unset(\$data);
echo round(\$peak / 1024 / 1024, 2) . ' MB peak';`,
      hints: [
        'memory_get_peak_usage() returns the highest memory used.',
        'This is useful for finding memory spikes.',
        'Even after unset, peak remains recorded.',
      ],
      concepts: ['memory_get_peak_usage', 'peak', 'monitoring'],
    },
    {
      id: 'php-perf-3',
      title: 'Measure Execution Time',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to measure how long code takes to execute.',
      skeleton: `<?php
\$start = ___();
usleep(10000); // 10ms
\$elapsed = ___() - \$start;
echo round(\$elapsed * 1000, 2) . ' ms';`,
      solution: `<?php
\$start = microtime(true);
usleep(10000); // 10ms
\$elapsed = microtime(true) - \$start;
echo round(\$elapsed * 1000, 2) . ' ms';`,
      hints: [
        'microtime(true) returns the time as a float in seconds.',
        'Subtract start from end for elapsed time.',
        'Multiply by 1000 for milliseconds.',
      ],
      concepts: ['microtime', 'timing', 'profiling'],
    },
    {
      id: 'php-perf-4',
      title: 'Unset Large Variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to free memory used by a large array.',
      skeleton: `<?php
\$data = range(1, 1000000);
\$before = memory_get_usage();
___(\$data);
\$after = memory_get_usage();
echo 'Freed: ' . round((\$before - \$after) / 1024 / 1024, 2) . ' MB';`,
      solution: `<?php
\$data = range(1, 1000000);
\$before = memory_get_usage();
unset(\$data);
\$after = memory_get_usage();
echo 'Freed: ' . round((\$before - \$after) / 1024 / 1024, 2) . ' MB';`,
      hints: [
        'unset() removes the variable and frees memory.',
        'Check memory before and after to see the difference.',
        'PHP garbage collector handles the rest.',
      ],
      concepts: ['unset', 'memory-free', 'garbage-collection'],
    },
    {
      id: 'php-perf-5',
      title: 'Generator for Memory Efficiency',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to use a generator instead of building a huge array.',
      skeleton: `<?php
function bigRange(int \$max): Generator {
    for (\$i = 0; \$i < \$max; \$i++) {
        ___ \$i;
    }
}

\$sum = 0;
foreach (bigRange(1000000) as \$n) {
    \$sum += \$n;
}
echo \$sum;`,
      solution: `<?php
function bigRange(int \$max): Generator {
    for (\$i = 0; \$i < \$max; \$i++) {
        yield \$i;
    }
}

\$sum = 0;
foreach (bigRange(1000000) as \$n) {
    \$sum += \$n;
}
echo \$sum;`,
      hints: [
        'yield produces values one at a time.',
        'Only one value is in memory at a time.',
        'Generators are much more memory-efficient than arrays.',
      ],
      concepts: ['generator', 'yield', 'memory-efficiency'],
    },
    {
      id: 'php-perf-6',
      title: 'Use isset Instead of array_key_exists',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank with the faster key existence check.',
      skeleton: `<?php
\$cache = ['user_1' => 'Alice', 'user_2' => 'Bob'];
if (___(___)) {
    echo \$cache['user_1'];
}`,
      solution: `<?php
\$cache = ['user_1' => 'Alice', 'user_2' => 'Bob'];
if (isset(\$cache['user_1'])) {
    echo \$cache['user_1'];
}`,
      hints: [
        'isset() is faster than array_key_exists().',
        'isset checks both key existence and non-null.',
        'Use isset for simple existence checks.',
      ],
      concepts: ['isset', 'performance', 'vs-array_key_exists'],
    },
    {
      id: 'php-perf-7',
      title: 'Write a Simple Cache',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Write a function cached(string $key, callable $fn): mixed that stores results in a static array. Return cached result if available, otherwise call $fn and cache it.',
      skeleton: `<?php
// Write the cached function`,
      solution: `<?php
function cached(string \$key, callable \$fn): mixed {
    static \$cache = [];
    if (!isset(\$cache[\$key])) {
        \$cache[\$key] = \$fn();
    }
    return \$cache[\$key];
}`,
      hints: [
        'Use static $cache to persist across calls.',
        'Check isset before computing.',
        'Store the result for future calls.',
      ],
      concepts: ['static-cache', 'memoization', 'callable'],
    },
    {
      id: 'php-perf-8',
      title: 'Write a Benchmark Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function benchmark(callable $fn, int $iterations = 1000): float that runs $fn the given number of times and returns average time in milliseconds.',
      skeleton: `<?php
// Write the benchmark function`,
      solution: `<?php
function benchmark(callable \$fn, int \$iterations = 1000): float {
    \$start = microtime(true);
    for (\$i = 0; \$i < \$iterations; \$i++) {
        \$fn();
    }
    \$elapsed = microtime(true) - \$start;
    return (\$elapsed / \$iterations) * 1000;
}`,
      hints: [
        'Time the entire loop, then divide by iterations.',
        'Multiply by 1000 to convert seconds to milliseconds.',
        'This gives the average time per call.',
      ],
      concepts: ['benchmarking', 'microtime', 'iterations'],
    },
    {
      id: 'php-perf-9',
      title: 'Write a Lazy Loader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function lazy(callable $factory): Closure that returns a Closure which calls the factory only on first invocation and caches the result.',
      skeleton: `<?php
// Write the lazy function`,
      solution: `<?php
function lazy(callable \$factory): Closure {
    \$value = null;
    \$loaded = false;
    return function () use (\$factory, &\$value, &\$loaded): mixed {
        if (!\$loaded) {
            \$value = \$factory();
            \$loaded = true;
        }
        return \$value;
    };
}`,
      hints: [
        'Use a flag to track if the factory has been called.',
        'Store the result in a captured variable.',
        'Subsequent calls return the cached value.',
      ],
      concepts: ['lazy-loading', 'closure-state', 'deferred-init'],
    },
    {
      id: 'php-perf-10',
      title: 'Write a Chunked Processor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function processChunked(array $items, int $chunkSize, callable $fn): array that processes items in chunks to limit memory, applying $fn to each chunk and merging results.',
      skeleton: `<?php
// Write the processChunked function`,
      solution: `<?php
function processChunked(array \$items, int \$chunkSize, callable \$fn): array {
    \$results = [];
    foreach (array_chunk(\$items, \$chunkSize) as \$chunk) {
        \$results = array_merge(\$results, \$fn(\$chunk));
    }
    return \$results;
}`,
      hints: [
        'Use array_chunk to split into manageable pieces.',
        'Process each chunk with the callable.',
        'Merge results from each chunk.',
      ],
      concepts: ['chunking', 'array_chunk', 'memory-management'],
    },
    {
      id: 'php-perf-11',
      title: 'Write a File Cache',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function fileCache(string $key, callable $fn, int $ttl = 3600): mixed that caches in temp files with a time-to-live.',
      skeleton: `<?php
// Write the fileCache function`,
      solution: `<?php
function fileCache(string \$key, callable \$fn, int \$ttl = 3600): mixed {
    \$file = sys_get_temp_dir() . '/cache_' . md5(\$key);
    if (file_exists(\$file) && (time() - filemtime(\$file)) < \$ttl) {
        return unserialize(file_get_contents(\$file));
    }
    \$result = \$fn();
    file_put_contents(\$file, serialize(\$result));
    return \$result;
}`,
      hints: [
        'Use md5 to create a safe filename from the key.',
        'Check file age with filemtime() against TTL.',
        'Serialize/unserialize for storing any type.',
      ],
      concepts: ['file-cache', 'TTL', 'serialize'],
    },
    {
      id: 'php-perf-12',
      title: 'Write an Object Pool',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a class ObjectPool with get(): object that returns a reusable object (or creates one), and release(object $obj): void that returns it to the pool. Constructor takes a callable factory.',
      skeleton: `<?php
// Write the ObjectPool class`,
      solution: `<?php
class ObjectPool {
    private array \$pool = [];

    public function __construct(private Closure \$factory) {}

    public function get(): object {
        if (!empty(\$this->pool)) {
            return array_pop(\$this->pool);
        }
        return (\$this->factory)();
    }

    public function release(object \$obj): void {
        \$this->pool[] = \$obj;
    }

    public function size(): int {
        return count(\$this->pool);
    }
}`,
      hints: [
        'Pop from pool if available, else create new.',
        'release() returns the object to the pool.',
        'This avoids repeated construction costs.',
      ],
      concepts: ['object-pool', 'reuse', 'factory-pattern'],
    },
    {
      id: 'php-perf-13',
      title: 'Fix N+1 Query Problem',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the code that makes N+1 database queries by batching them.',
      skeleton: `<?php
// Simulated DB functions
function getUsers(): array { return [1, 2, 3]; }
function getProfile(int \$id): string { return "profile_\$id"; }

\$users = getUsers();
\$profiles = [];
foreach (\$users as \$id) {
    \$profiles[] = getProfile(\$id); // N queries!
}`,
      solution: `<?php
function getUsers(): array { return [1, 2, 3]; }
function getProfiles(array \$ids): array {
    return array_map(fn(\$id) => "profile_\$id", \$ids);
}

\$users = getUsers();
\$profiles = getProfiles(\$users); // 1 query`,
      hints: [
        'Batch individual queries into one bulk query.',
        'Create a function that takes an array of IDs.',
        'This changes N+1 queries to just 2.',
      ],
      concepts: ['N+1-problem', 'batch-query', 'optimization'],
    },
    {
      id: 'php-perf-14',
      title: 'Fix String Concatenation in Loop',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the inefficient string concatenation in a loop.',
      skeleton: `<?php
\$result = '';
for (\$i = 0; \$i < 10000; \$i++) {
    \$result = \$result . 'x';
}
echo strlen(\$result);`,
      solution: `<?php
\$parts = [];
for (\$i = 0; \$i < 10000; \$i++) {
    \$parts[] = 'x';
}
\$result = implode('', \$parts);
echo strlen(\$result);`,
      hints: [
        'Repeated string concatenation creates many temporary strings.',
        'Collect parts in an array and implode once.',
        'This is significantly faster for large concatenations.',
      ],
      concepts: ['string-concatenation', 'implode', 'array-collect'],
    },
    {
      id: 'php-perf-15',
      title: 'Fix Memory Leak with Large Array',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the function that builds a massive array when a generator would suffice.',
      skeleton: `<?php
function readAllLines(string \$file): array {
    \$lines = [];
    \$fp = fopen(\$file, 'r');
    while ((\$line = fgets(\$fp)) !== false) {
        \$lines[] = trim(\$line);
    }
    fclose(\$fp);
    return \$lines;
}`,
      solution: `<?php
function readAllLines(string \$file): Generator {
    \$fp = fopen(\$file, 'r');
    while ((\$line = fgets(\$fp)) !== false) {
        yield trim(\$line);
    }
    fclose(\$fp);
}`,
      hints: [
        'Change return type to Generator.',
        'Replace $lines[] = with yield.',
        'Only one line is in memory at a time.',
      ],
      concepts: ['generator', 'memory-leak', 'streaming'],
    },
    {
      id: 'php-perf-16',
      title: 'Predict Memory Difference',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict whether the generator uses less memory than the array.',
      skeleton: `<?php
function arrayRange(int \$n): array {
    return range(0, \$n);
}

function genRange(int \$n): Generator {
    for (\$i = 0; \$i <= \$n; \$i++) yield \$i;
}

\$a = memory_get_usage();
foreach (genRange(1000) as \$v) {}
\$b = memory_get_usage();
echo \$b - \$a < 1000 ? 'low' : 'high';`,
      solution: `low`,
      hints: [
        'Generators yield one value at a time.',
        'They do not build the full array in memory.',
        'Memory difference is minimal (low).',
      ],
      concepts: ['generator-memory', 'comparison', 'low-overhead'],
    },
    {
      id: 'php-perf-17',
      title: 'Predict isset vs array_key_exists',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the difference between isset and array_key_exists for a null value.',
      skeleton: `<?php
\$arr = ['key' => null];
echo isset(\$arr['key']) ? 'isset' : 'not isset';
echo ' ';
echo array_key_exists('key', \$arr) ? 'exists' : 'not exists';`,
      solution: `not isset exists`,
      hints: [
        'isset returns false for null values.',
        'array_key_exists only checks if the key exists.',
        'They differ when the value is null.',
      ],
      concepts: ['isset-null', 'array_key_exists', 'subtle-difference'],
    },
    {
      id: 'php-perf-18',
      title: 'Predict Static Cache Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict how many times the factory is called with static caching.',
      skeleton: `<?php
\$count = 0;
function compute(callable \$fn): int {
    static \$cache = null;
    if (\$cache === null) {
        \$cache = \$fn();
    }
    return \$cache;
}

compute(function () use (&\$count) { \$count++; return 42; });
compute(function () use (&\$count) { \$count++; return 42; });
compute(function () use (&\$count) { \$count++; return 42; });
echo \$count;`,
      solution: `1`,
      hints: [
        'static $cache persists across calls.',
        'After the first call, $cache is 42 (not null).',
        'Subsequent calls skip the factory.',
      ],
      concepts: ['static-variable', 'cache', 'call-count'],
    },
    {
      id: 'php-perf-19',
      title: 'Refactor Array to Generator',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the function that builds a large array in memory to use a generator.',
      skeleton: `<?php
function fibonacci(int \$n): array {
    \$seq = [];
    \$a = 0;
    \$b = 1;
    for (\$i = 0; \$i < \$n; \$i++) {
        \$seq[] = \$a;
        [\$a, \$b] = [\$b, \$a + \$b];
    }
    return \$seq;
}`,
      solution: `<?php
function fibonacci(int \$n): Generator {
    \$a = 0;
    \$b = 1;
    for (\$i = 0; \$i < \$n; \$i++) {
        yield \$a;
        [\$a, \$b] = [\$b, \$a + \$b];
    }
}`,
      hints: [
        'Replace the array and return with yield.',
        'Change return type to Generator.',
        'No array is needed in memory.',
      ],
      concepts: ['array-to-generator', 'yield', 'memory-efficient'],
    },
    {
      id: 'php-perf-20',
      title: 'Refactor to Lazy Collection',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the eager map/filter chain to a lazy generator pipeline.',
      skeleton: `<?php
\$data = range(1, 1000000);
\$filtered = array_filter(\$data, fn(\$n) => \$n % 2 === 0);
\$mapped = array_map(fn(\$n) => \$n * \$n, \$filtered);
\$result = array_slice(\$mapped, 0, 5);
echo implode(', ', \$result);`,
      solution: `<?php
function lazyPipeline(int \$max): Generator {
    for (\$i = 1; \$i <= \$max; \$i++) {
        if (\$i % 2 === 0) {
            yield \$i * \$i;
        }
    }
}

\$result = [];
\$count = 0;
foreach (lazyPipeline(1000000) as \$val) {
    \$result[] = \$val;
    if (++\$count >= 5) break;
}
echo implode(', ', \$result);`,
      hints: [
        'Combine filter and map into a single generator.',
        'Only generate values as needed.',
        'Break after getting the 5 required values.',
      ],
      concepts: ['lazy-pipeline', 'early-termination', 'generator'],
    },
  ],
};
