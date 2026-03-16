import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-fibers',
  title: '41. PHP 8.1 Fibers',
  explanation: `## PHP 8.1 Fibers

Fibers are lightweight concurrency primitives introduced in PHP 8.1. A Fiber can be started, suspended, and resumed, allowing cooperative multitasking within a single thread.

### Basic Fiber
\`\`\`php
<?php
\$fiber = new Fiber(function (): void {
    echo 'A ';
    Fiber::suspend();
    echo 'C ';
});

\$fiber->start();  // prints "A "
echo 'B ';
\$fiber->resume(); // prints "C "
// Output: A B C
\`\`\`

### Passing Values
\`\`\`php
<?php
\$fiber = new Fiber(function (): string {
    \$value = Fiber::suspend('first');
    return "got \$value";
});

\$first = \$fiber->start();       // "first"
\$result = \$fiber->resume('hello'); // null (fiber completed)
echo \$fiber->getReturn();        // "got hello"
\`\`\`

### Fiber State
\`\`\`php
<?php
\$fiber = new Fiber(fn() => Fiber::suspend());

echo \$fiber->isStarted() ? 'yes' : 'no';  // no
\$fiber->start();
echo \$fiber->isSuspended() ? 'yes' : 'no'; // yes
\$fiber->resume();
echo \$fiber->isTerminated() ? 'yes' : 'no'; // yes
\`\`\`

### Error Handling
\`\`\`php
<?php
\$fiber = new Fiber(function (): void {
    throw new RuntimeException('fiber error');
});

try {
    \$fiber->start();
} catch (RuntimeException \$e) {
    echo \$e->getMessage(); // "fiber error"
}
\`\`\``,
  exercises: [
    {
      id: 'php-fibers-1',
      title: 'Create a Basic Fiber',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to create and start a Fiber.',
      skeleton: `<?php
\$fiber = new ___(function (): void {
    echo 'Hello from Fiber!';
});
\$fiber->start();`,
      solution: `<?php
\$fiber = new Fiber(function (): void {
    echo 'Hello from Fiber!';
});
\$fiber->start();`,
      hints: [
        'Use new Fiber() to create a fiber.',
        'Pass a callable to the Fiber constructor.',
        'Call start() to begin execution.',
      ],
      concepts: ['Fiber', 'constructor', 'start'],
    },
    {
      id: 'php-fibers-2',
      title: 'Suspend a Fiber',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to suspend execution inside a Fiber.',
      skeleton: `<?php
\$fiber = new Fiber(function (): void {
    echo '1 ';
    ___();
    echo '3 ';
});
\$fiber->start();
echo '2 ';
\$fiber->resume();`,
      solution: `<?php
\$fiber = new Fiber(function (): void {
    echo '1 ';
    Fiber::suspend();
    echo '3 ';
});
\$fiber->start();
echo '2 ';
\$fiber->resume();`,
      hints: [
        'Use Fiber::suspend() to pause the fiber.',
        'It is a static method on the Fiber class.',
        'Execution continues when resume() is called.',
      ],
      concepts: ['Fiber::suspend', 'static-method', 'cooperative'],
    },
    {
      id: 'php-fibers-3',
      title: 'Resume a Fiber',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to resume a suspended Fiber.',
      skeleton: `<?php
\$fiber = new Fiber(function (): void {
    Fiber::suspend();
    echo 'resumed!';
});
\$fiber->start();
\$fiber->___();`,
      solution: `<?php
\$fiber = new Fiber(function (): void {
    Fiber::suspend();
    echo 'resumed!';
});
\$fiber->start();
\$fiber->resume();`,
      hints: [
        'Call resume() on the fiber instance.',
        'resume() continues from where suspend() was called.',
        'The fiber will print "resumed!" after resuming.',
      ],
      concepts: ['resume', 'continuation', 'fiber-lifecycle'],
    },
    {
      id: 'php-fibers-4',
      title: 'Pass Value on Suspend',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to pass a value out of the Fiber via suspend.',
      skeleton: `<?php
\$fiber = new Fiber(function (): void {
    Fiber::suspend(___);
});
\$value = \$fiber->start();
echo \$value;`,
      solution: `<?php
\$fiber = new Fiber(function (): void {
    Fiber::suspend('hello');
});
\$value = \$fiber->start();
echo \$value;`,
      hints: [
        'Pass a value as argument to Fiber::suspend().',
        'The value is returned by start() or resume().',
        'This allows fibers to yield values.',
      ],
      concepts: ['suspend-value', 'yield-like', 'communication'],
    },
    {
      id: 'php-fibers-5',
      title: 'Get Fiber Return Value',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to get the return value of a completed Fiber.',
      skeleton: `<?php
\$fiber = new Fiber(function (): string {
    return 'done';
});
\$fiber->start();
echo \$fiber->___();`,
      solution: `<?php
\$fiber = new Fiber(function (): string {
    return 'done';
});
\$fiber->start();
echo \$fiber->getReturn();`,
      hints: [
        'getReturn() retrieves the fiber\'s return value.',
        'The fiber must be terminated (completed) first.',
        'Calling getReturn() on a running fiber throws.',
      ],
      concepts: ['getReturn', 'return-value', 'terminated'],
    },
    {
      id: 'php-fibers-6',
      title: 'Check Fiber State',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to check fiber state at different points.',
      skeleton: `<?php
\$fiber = new Fiber(fn() => Fiber::suspend());
echo \$fiber->___() ? 'started' : 'not started';
\$fiber->start();
echo ' ';
echo \$fiber->___() ? 'suspended' : 'running';`,
      solution: `<?php
\$fiber = new Fiber(fn() => Fiber::suspend());
echo \$fiber->isStarted() ? 'started' : 'not started';
\$fiber->start();
echo ' ';
echo \$fiber->isSuspended() ? 'suspended' : 'running';`,
      hints: [
        'isStarted() checks if the fiber has been started.',
        'isSuspended() checks if the fiber is currently suspended.',
        'isTerminated() checks if the fiber has finished.',
      ],
      concepts: ['isStarted', 'isSuspended', 'fiber-state'],
    },
    {
      id: 'php-fibers-7',
      title: 'Write a Counter Fiber',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Write a function createCounter(): Fiber that returns a Fiber which suspends yielding 1, 2, 3 in sequence (suspending after each value).',
      skeleton: `<?php
// Write the createCounter function`,
      solution: `<?php
function createCounter(): Fiber {
    return new Fiber(function (): void {
        Fiber::suspend(1);
        Fiber::suspend(2);
        Fiber::suspend(3);
    });
}`,
      hints: [
        'Create a Fiber that calls suspend() with each value.',
        'Each call to resume() will return the next value.',
        'The fiber suspends after yielding each number.',
      ],
      concepts: ['Fiber-factory', 'sequential-suspend', 'counter'],
    },
    {
      id: 'php-fibers-8',
      title: 'Write a Fiber Runner',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function collectAll(Fiber $fiber): array that starts a fiber and collects all suspended values into an array until it terminates.',
      skeleton: `<?php
// Write the collectAll function`,
      solution: `<?php
function collectAll(Fiber \$fiber): array {
    \$results = [];
    \$value = \$fiber->start();
    if (\$value !== null) {
        \$results[] = \$value;
    }
    while (\$fiber->isSuspended()) {
        \$value = \$fiber->resume();
        if (\$value !== null) {
            \$results[] = \$value;
        }
    }
    return \$results;
}`,
      hints: [
        'Start the fiber and capture the first suspended value.',
        'Loop while isSuspended(), resuming and collecting values.',
        'Stop when the fiber terminates.',
      ],
      concepts: ['fiber-iteration', 'collect', 'while-loop'],
    },
    {
      id: 'php-fibers-9',
      title: 'Write a Fiber Communication Channel',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function createEchoFiber(): Fiber that creates a Fiber which receives a value via resume, uppercases it, and suspends with the result. It does this 3 times then returns "done".',
      skeleton: `<?php
// Write the createEchoFiber function`,
      solution: `<?php
function createEchoFiber(): Fiber {
    return new Fiber(function (): string {
        for (\$i = 0; \$i < 3; \$i++) {
            \$input = Fiber::suspend();
            Fiber::suspend(strtoupper(\$input));
        }
        return 'done';
    });
}`,
      hints: [
        'First suspend receives data, second suspend sends result.',
        'Loop 3 times for 3 echo cycles.',
        'Return "done" after completing all cycles.',
      ],
      concepts: ['bidirectional', 'strtoupper', 'fiber-protocol'],
    },
    {
      id: 'php-fibers-10',
      title: 'Write a Fiber Scheduler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function roundRobin(array $fibers): void that starts all fibers and resumes them in round-robin order until all are terminated.',
      skeleton: `<?php
// Write the roundRobin function`,
      solution: `<?php
function roundRobin(array \$fibers): void {
    foreach (\$fibers as \$fiber) {
        \$fiber->start();
    }
    \$active = true;
    while (\$active) {
        \$active = false;
        foreach (\$fibers as \$fiber) {
            if (\$fiber->isSuspended()) {
                \$fiber->resume();
                \$active = true;
            }
        }
    }
}`,
      hints: [
        'Start all fibers first.',
        'Loop until no fibers are suspended.',
        'Resume each suspended fiber once per round.',
      ],
      concepts: ['scheduler', 'round-robin', 'cooperative-multitasking'],
    },
    {
      id: 'php-fibers-11',
      title: 'Write a Fiber-Based Pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function pipeline(array $fns, mixed $input): mixed that chains callable stages. Each stage is a Fiber that receives input on start, processes, and returns a result. The output of each stage feeds the next.',
      skeleton: `<?php
// Write the pipeline function`,
      solution: `<?php
function pipeline(array \$fns, mixed \$input): mixed {
    \$value = \$input;
    foreach (\$fns as \$fn) {
        \$fiber = new Fiber(\$fn);
        \$fiber->start(\$value);
        \$value = \$fiber->getReturn();
    }
    return \$value;
}`,
      hints: [
        'Create a Fiber for each stage function.',
        'Pass the current value via start().',
        'Get the return value for the next stage.',
      ],
      concepts: ['pipeline', 'chaining', 'fiber-composition'],
    },
    {
      id: 'php-fibers-12',
      title: 'Write a Timeout Fiber',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function withTimeout(Fiber $fiber, int $maxResumes): mixed that runs a fiber but throws RuntimeException if it suspends more than $maxResumes times.',
      skeleton: `<?php
// Write the withTimeout function`,
      solution: `<?php
function withTimeout(Fiber \$fiber, int \$maxResumes): mixed {
    \$fiber->start();
    \$count = 0;
    while (\$fiber->isSuspended()) {
        if (++\$count > \$maxResumes) {
            throw new RuntimeException('Fiber exceeded max resumes');
        }
        \$fiber->resume();
    }
    return \$fiber->getReturn();
}`,
      hints: [
        'Track the number of resume calls.',
        'Throw if the count exceeds maxResumes.',
        'Return the fiber result if it completes in time.',
      ],
      concepts: ['timeout', 'guard', 'fiber-control'],
    },
    {
      id: 'php-fibers-13',
      title: 'Fix Fiber Started Twice',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the error caused by starting a fiber that has already been started.',
      skeleton: `<?php
\$fiber = new Fiber(function (): void {
    Fiber::suspend();
    echo 'done';
});
\$fiber->start();
\$fiber->start();`,
      solution: `<?php
\$fiber = new Fiber(function (): void {
    Fiber::suspend();
    echo 'done';
});
\$fiber->start();
\$fiber->resume();`,
      hints: [
        'A fiber can only be started once.',
        'After start, use resume() to continue.',
        'Calling start() twice throws FiberError.',
      ],
      concepts: ['start-vs-resume', 'FiberError', 'lifecycle'],
    },
    {
      id: 'php-fibers-14',
      title: 'Fix Resume on Terminated Fiber',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the error caused by resuming a fiber that has already terminated.',
      skeleton: `<?php
\$fiber = new Fiber(function (): string {
    return 'result';
});
\$fiber->start();
\$fiber->resume();
echo \$fiber->getReturn();`,
      solution: `<?php
\$fiber = new Fiber(function (): string {
    return 'result';
});
\$fiber->start();
echo \$fiber->getReturn();`,
      hints: [
        'The fiber returns immediately without suspending.',
        'It is already terminated after start().',
        'Remove the resume() call.',
      ],
      concepts: ['terminated-fiber', 'FiberError', 'no-suspend'],
    },
    {
      id: 'php-fibers-15',
      title: 'Fix Missing Error Catch in Fiber',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the uncaught exception propagating from a fiber.',
      skeleton: `<?php
\$fiber = new Fiber(function (): void {
    throw new RuntimeException('oops');
});
\$fiber->start();
echo 'after fiber';`,
      solution: `<?php
\$fiber = new Fiber(function (): void {
    throw new RuntimeException('oops');
});
try {
    \$fiber->start();
} catch (RuntimeException \$e) {
    echo 'caught: ' . \$e->getMessage() . ' ';
}
echo 'after fiber';`,
      hints: [
        'Exceptions thrown inside a fiber propagate to start()/resume().',
        'Wrap the start() call in try/catch.',
        'This prevents the exception from crashing the program.',
      ],
      concepts: ['exception-propagation', 'try-catch', 'fiber-error'],
    },
    {
      id: 'php-fibers-16',
      title: 'Predict Fiber Execution Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output order of interleaved fiber and main code.',
      skeleton: `<?php
\$fiber = new Fiber(function (): void {
    echo 'A';
    Fiber::suspend();
    echo 'C';
});
\$fiber->start();
echo 'B';
\$fiber->resume();
echo 'D';`,
      solution: `ABCD`,
      hints: [
        'start() runs until the first suspend: prints A.',
        'Main code continues: prints B.',
        'resume() continues the fiber: prints C.',
        'Main code: prints D.',
      ],
      concepts: ['execution-order', 'interleaving', 'cooperative'],
    },
    {
      id: 'php-fibers-17',
      title: 'Predict Suspend Return Value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the values exchanged between fiber and caller.',
      skeleton: `<?php
\$fiber = new Fiber(function (): string {
    \$x = Fiber::suspend('hello');
    return "got \$x";
});
echo \$fiber->start() . ' ';
\$fiber->resume('world');
echo \$fiber->getReturn();`,
      solution: `hello got world`,
      hints: [
        'start() returns the value passed to suspend().',
        'resume("world") sends "world" into the fiber.',
        'getReturn() gets the fiber return value.',
      ],
      concepts: ['value-passing', 'bidirectional', 'getReturn'],
    },
    {
      id: 'php-fibers-18',
      title: 'Predict Fiber State',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the fiber state at each checkpoint.',
      skeleton: `<?php
\$f = new Fiber(fn() => Fiber::suspend());
echo \$f->isStarted() ? '1' : '0';
\$f->start();
echo \$f->isSuspended() ? '1' : '0';
\$f->resume();
echo \$f->isTerminated() ? '1' : '0';`,
      solution: `011`,
      hints: [
        'Before start: isStarted() is false (0).',
        'After start with suspend: isSuspended() is true (1).',
        'After resume completes: isTerminated() is true (1).',
      ],
      concepts: ['fiber-state', 'boolean-checks', 'lifecycle'],
    },
    {
      id: 'php-fibers-19',
      title: 'Refactor Callback to Fiber',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the callback-based step processor to use a Fiber.',
      skeleton: `<?php
function processSteps(array \$steps, callable \$onStep): void {
    foreach (\$steps as \$step) {
        \$onStep(\$step);
    }
}

\$results = [];
processSteps(['a', 'b', 'c'], function (\$step) use (&\$results) {
    \$results[] = strtoupper(\$step);
});`,
      solution: `<?php
function processSteps(array \$steps): Fiber {
    return new Fiber(function () use (\$steps): void {
        foreach (\$steps as \$step) {
            Fiber::suspend(strtoupper(\$step));
        }
    });
}

\$fiber = processSteps(['a', 'b', 'c']);
\$results = [];
\$value = \$fiber->start();
while (\$fiber->isSuspended()) {
    \$results[] = \$value;
    \$value = \$fiber->resume();
}
if (\$value !== null) {
    \$results[] = \$value;
}`,
      hints: [
        'The Fiber suspends with each processed step.',
        'Collect suspended values instead of using callbacks.',
        'The caller controls the iteration pace.',
      ],
      concepts: ['callback-to-fiber', 'pull-vs-push', 'refactor'],
    },
    {
      id: 'php-fibers-20',
      title: 'Refactor Generator to Fiber',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the generator-based range function to use a Fiber instead.',
      skeleton: `<?php
function rangeGen(int \$start, int \$end): Generator {
    for (\$i = \$start; \$i <= \$end; \$i++) {
        yield \$i;
    }
}

foreach (rangeGen(1, 5) as \$n) {
    echo "\$n ";
}`,
      solution: `<?php
function rangeFiber(int \$start, int \$end): Fiber {
    return new Fiber(function () use (\$start, \$end): void {
        for (\$i = \$start; \$i <= \$end; \$i++) {
            Fiber::suspend(\$i);
        }
    });
}

\$fiber = rangeFiber(1, 5);
\$value = \$fiber->start();
while (\$fiber->isSuspended()) {
    echo "\$value ";
    \$value = \$fiber->resume();
}
if (\$value !== null) {
    echo "\$value ";
}`,
      hints: [
        'Replace yield with Fiber::suspend().',
        'Use start/resume loop instead of foreach.',
        'The caller manually iterates the fiber.',
      ],
      concepts: ['generator-to-fiber', 'yield-to-suspend', 'manual-iteration'],
    },
  ],
};
