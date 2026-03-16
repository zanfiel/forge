import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-async',
  title: '48. Async Patterns with Fibers',
  explanation: `## Async Patterns with Fibers

While PHP does not have built-in async/await, Fibers enable building cooperative async patterns: event loops, promise-like constructs, and concurrent task execution.

### Simple Event Loop
\`\`\`php
<?php
class EventLoop {
    private array \$tasks = [];

    public function defer(Fiber \$fiber): void {
        \$this->tasks[] = \$fiber;
    }

    public function run(): void {
        foreach (\$this->tasks as \$task) {
            \$task->start();
        }
        \$running = true;
        while (\$running) {
            \$running = false;
            foreach (\$this->tasks as \$task) {
                if (\$task->isSuspended()) {
                    \$task->resume();
                    \$running = true;
                }
            }
        }
    }
}
\`\`\`

### Async/Await Simulation
\`\`\`php
<?php
function async(callable \$fn): Fiber {
    return new Fiber(\$fn);
}

function await(Fiber \$fiber): mixed {
    \$fiber->start();
    while (\$fiber->isSuspended()) {
        Fiber::suspend(); // yield control to parent
        \$fiber->resume();
    }
    return \$fiber->getReturn();
}
\`\`\`

### Promise-Like Pattern
\`\`\`php
<?php
class Deferred {
    private Fiber \$fiber;
    private mixed \$result = null;
    private bool \$resolved = false;

    public function __construct(callable \$fn) {
        \$this->fiber = new Fiber(\$fn);
    }

    public function resolve(): void {
        if (!\$this->fiber->isStarted()) {
            \$this->fiber->start();
        }
        while (\$this->fiber->isSuspended()) {
            \$this->fiber->resume();
        }
        if (\$this->fiber->isTerminated()) {
            \$this->result = \$this->fiber->getReturn();
            \$this->resolved = true;
        }
    }

    public function getResult(): mixed {
        return \$this->result;
    }
}
\`\`\``,
  exercises: [
    {
      id: 'php-async-1',
      title: 'Create an Async Task',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to create a Fiber that simulates an async operation.',
      skeleton: `<?php
\$task = new ___(function (): string {
    Fiber::suspend(); // simulate waiting
    return 'done';
});
\$task->start();
\$task->resume();
echo \$task->getReturn();`,
      solution: `<?php
\$task = new Fiber(function (): string {
    Fiber::suspend(); // simulate waiting
    return 'done';
});
\$task->start();
\$task->resume();
echo \$task->getReturn();`,
      hints: [
        'Use new Fiber() to create an async-like task.',
        'The fiber suspends to simulate waiting.',
        'resume() and getReturn() complete the operation.',
      ],
      concepts: ['Fiber', 'async-simulation', 'suspend-resume'],
    },
    {
      id: 'php-async-2',
      title: 'Yield Control from Fiber',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to yield control back to the event loop.',
      skeleton: `<?php
\$fiber = new Fiber(function (): void {
    echo 'step 1 ';
    ___; // yield control
    echo 'step 2 ';
    ___; // yield control
    echo 'step 3';
});`,
      solution: `<?php
\$fiber = new Fiber(function (): void {
    echo 'step 1 ';
    Fiber::suspend(); // yield control
    echo 'step 2 ';
    Fiber::suspend(); // yield control
    echo 'step 3';
});`,
      hints: [
        'Fiber::suspend() pauses the fiber.',
        'Each suspend allows other tasks to run.',
        'This is cooperative multitasking.',
      ],
      concepts: ['Fiber::suspend', 'yielding', 'cooperative'],
    },
    {
      id: 'php-async-3',
      title: 'Simple Task Runner',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to run multiple fibers concurrently.',
      skeleton: `<?php
\$fibers = [
    new Fiber(fn() => Fiber::suspend()),
    new Fiber(fn() => Fiber::suspend()),
];
foreach (\$fibers as \$f) \$f->___();
foreach (\$fibers as \$f) \$f->___();`,
      solution: `<?php
\$fibers = [
    new Fiber(fn() => Fiber::suspend()),
    new Fiber(fn() => Fiber::suspend()),
];
foreach (\$fibers as \$f) \$f->start();
foreach (\$fibers as \$f) \$f->resume();`,
      hints: [
        'Start all fibers first.',
        'Then resume all fibers.',
        'This simulates concurrent execution.',
      ],
      concepts: ['concurrent-start', 'batch-resume', 'parallel-sim'],
    },
    {
      id: 'php-async-4',
      title: 'Pass Result Between Fibers',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to pass data from one fiber to another via the main loop.',
      skeleton: `<?php
\$producer = new Fiber(function (): void {
    Fiber::suspend(___);
});
\$value = \$producer->start();
\$consumer = new Fiber(function () use (\$value): string {
    return "got: \$value";
});
\$consumer->start();
echo \$consumer->getReturn();`,
      solution: `<?php
\$producer = new Fiber(function (): void {
    Fiber::suspend('data');
});
\$value = \$producer->start();
\$consumer = new Fiber(function () use (\$value): string {
    return "got: \$value";
});
\$consumer->start();
echo \$consumer->getReturn();`,
      hints: [
        'Producer suspends with a value.',
        'Main loop captures it from start().',
        'Consumer receives it via use().',
      ],
      concepts: ['data-passing', 'producer-consumer', 'suspend-value'],
    },
    {
      id: 'php-async-5',
      title: 'Event Loop Defer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to add a fiber to the event loop task queue.',
      skeleton: `<?php
class Loop {
    private array \$tasks = [];
    public function ___(Fiber \$f): void { \$this->tasks[] = \$f; }
    public function run(): void {
        foreach (\$this->tasks as \$t) \$t->start();
        do {
            \$active = false;
            foreach (\$this->tasks as \$t) {
                if (\$t->isSuspended()) { \$t->resume(); \$active = true; }
            }
        } while (\$active);
    }
}`,
      solution: `<?php
class Loop {
    private array \$tasks = [];
    public function defer(Fiber \$f): void { \$this->tasks[] = \$f; }
    public function run(): void {
        foreach (\$this->tasks as \$t) \$t->start();
        do {
            \$active = false;
            foreach (\$this->tasks as \$t) {
                if (\$t->isSuspended()) { \$t->resume(); \$active = true; }
            }
        } while (\$active);
    }
}`,
      hints: [
        'defer() queues a fiber for later execution.',
        'run() starts all and loops until all terminate.',
        'This is a basic event loop pattern.',
      ],
      concepts: ['event-loop', 'defer', 'task-queue'],
    },
    {
      id: 'php-async-6',
      title: 'Await Pattern',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Fill in the blank to implement a basic await that runs a fiber to completion.',
      skeleton: `<?php
function await(Fiber \$fiber): mixed {
    \$fiber->start();
    while (\$fiber->___()) {
        \$fiber->resume();
    }
    return \$fiber->___();
}`,
      solution: `<?php
function await(Fiber \$fiber): mixed {
    \$fiber->start();
    while (\$fiber->isSuspended()) {
        \$fiber->resume();
    }
    return \$fiber->getReturn();
}`,
      hints: [
        'Check isSuspended() to know if fiber needs more work.',
        'Resume until it terminates.',
        'getReturn() gets the final result.',
      ],
      concepts: ['await', 'run-to-completion', 'getReturn'],
    },
    {
      id: 'php-async-7',
      title: 'Write a Task Scheduler',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a class Scheduler with add(callable $fn): void that creates a Fiber, and run(): void that executes all tasks cooperatively.',
      skeleton: `<?php
// Write the Scheduler class`,
      solution: `<?php
class Scheduler {
    private array \$fibers = [];

    public function add(callable \$fn): void {
        \$this->fibers[] = new Fiber(\$fn);
    }

    public function run(): void {
        foreach (\$this->fibers as \$fiber) {
            \$fiber->start();
        }
        \$active = true;
        while (\$active) {
            \$active = false;
            foreach (\$this->fibers as \$fiber) {
                if (\$fiber->isSuspended()) {
                    \$fiber->resume();
                    \$active = true;
                }
            }
        }
    }
}`,
      hints: [
        'Create Fibers from callables in add().',
        'Start all fibers, then loop resuming suspended ones.',
        'Stop when no fibers are suspended.',
      ],
      concepts: ['scheduler', 'cooperative', 'fiber-management'],
    },
    {
      id: 'php-async-8',
      title: 'Write a Deferred/Promise',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a class Deferred with constructor(callable $fn), resolve(): void that runs the fiber to completion, and result(): mixed that returns the value.',
      skeleton: `<?php
// Write the Deferred class`,
      solution: `<?php
class Deferred {
    private Fiber \$fiber;
    private mixed \$value = null;
    private bool \$done = false;

    public function __construct(callable \$fn) {
        \$this->fiber = new Fiber(\$fn);
    }

    public function resolve(): void {
        if (!\$this->fiber->isStarted()) {
            \$this->fiber->start();
        }
        while (\$this->fiber->isSuspended()) {
            \$this->fiber->resume();
        }
        if (\$this->fiber->isTerminated()) {
            \$this->value = \$this->fiber->getReturn();
            \$this->done = true;
        }
    }

    public function result(): mixed {
        if (!\$this->done) {
            throw new RuntimeException('Not resolved');
        }
        return \$this->value;
    }
}`,
      hints: [
        'Wrap a Fiber with resolve/result API.',
        'resolve() runs the fiber to completion.',
        'result() returns the final value.',
      ],
      concepts: ['deferred', 'promise-pattern', 'fiber-wrapper'],
    },
    {
      id: 'php-async-9',
      title: 'Write Parallel Collector',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function all(array $fns): array that runs multiple callables as fibers concurrently and returns all their return values.',
      skeleton: `<?php
// Write the all function`,
      solution: `<?php
function all(array \$fns): array {
    \$fibers = array_map(fn(\$fn) => new Fiber(\$fn), \$fns);
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
    return array_map(fn(\$f) => \$f->getReturn(), \$fibers);
}`,
      hints: [
        'Create fibers from all callables.',
        'Run the event loop until all complete.',
        'Collect return values from each fiber.',
      ],
      concepts: ['parallel-collection', 'all-pattern', 'concurrent'],
    },
    {
      id: 'php-async-10',
      title: 'Write Race Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function race(array $fns): mixed that runs fibers concurrently and returns the result of the first one to terminate.',
      skeleton: `<?php
// Write the race function`,
      solution: `<?php
function race(array \$fns): mixed {
    \$fibers = array_map(fn(\$fn) => new Fiber(\$fn), \$fns);
    foreach (\$fibers as \$fiber) {
        \$fiber->start();
        if (\$fiber->isTerminated()) {
            return \$fiber->getReturn();
        }
    }
    while (true) {
        foreach (\$fibers as \$fiber) {
            if (\$fiber->isSuspended()) {
                \$fiber->resume();
            }
            if (\$fiber->isTerminated()) {
                return \$fiber->getReturn();
            }
        }
    }
}`,
      hints: [
        'Start all fibers and check for immediate completion.',
        'Resume in round-robin, checking after each resume.',
        'Return as soon as any fiber terminates.',
      ],
      concepts: ['race-pattern', 'first-to-finish', 'competitive'],
    },
    {
      id: 'php-async-11',
      title: 'Write a Timer Fiber',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function timer(int $ticks): Fiber that creates a fiber which suspends $ticks times before returning "timer done".',
      skeleton: `<?php
// Write the timer function`,
      solution: `<?php
function timer(int \$ticks): Fiber {
    return new Fiber(function () use (\$ticks): string {
        for (\$i = 0; \$i < \$ticks; \$i++) {
            Fiber::suspend(\$i);
        }
        return 'timer done';
    });
}`,
      hints: [
        'Suspend once per tick.',
        'Pass the current tick count on each suspend.',
        'Return a completion message at the end.',
      ],
      concepts: ['timer', 'tick-based', 'suspend-count'],
    },
    {
      id: 'php-async-12',
      title: 'Write a Channel',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a class Channel with send(mixed $value): void and receive(): mixed. send() stores a value; receive() returns it. If no value is available, throw RuntimeException.',
      skeleton: `<?php
// Write the Channel class`,
      solution: `<?php
class Channel {
    private array \$buffer = [];

    public function send(mixed \$value): void {
        \$this->buffer[] = \$value;
    }

    public function receive(): mixed {
        if (empty(\$this->buffer)) {
            throw new RuntimeException('Channel empty');
        }
        return array_shift(\$this->buffer);
    }

    public function isEmpty(): bool {
        return empty(\$this->buffer);
    }
}`,
      hints: [
        'Use an array as a FIFO buffer.',
        'send() appends, receive() shifts.',
        'Throw if receiving from empty channel.',
      ],
      concepts: ['channel', 'message-passing', 'FIFO-buffer'],
    },
    {
      id: 'php-async-13',
      title: 'Fix Fiber Never Resumed',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the code where a fiber suspends but is never resumed, leaving work incomplete.',
      skeleton: `<?php
\$results = [];
\$fiber = new Fiber(function () use (&\$results): void {
    \$results[] = 'step 1';
    Fiber::suspend();
    \$results[] = 'step 2';
});
\$fiber->start();
echo implode(', ', \$results);
// Only prints "step 1", missing "step 2"`,
      solution: `<?php
\$results = [];
\$fiber = new Fiber(function () use (&\$results): void {
    \$results[] = 'step 1';
    Fiber::suspend();
    \$results[] = 'step 2';
});
\$fiber->start();
\$fiber->resume();
echo implode(', ', \$results);`,
      hints: [
        'The fiber suspended but was never resumed.',
        'Add $fiber->resume() to continue execution.',
        'Without resume, the fiber stays suspended forever.',
      ],
      concepts: ['incomplete-fiber', 'resume', 'suspended-forever'],
    },
    {
      id: 'php-async-14',
      title: 'Fix Event Loop Missing Active Check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the event loop that runs infinitely because it does not check if any fibers are still active.',
      skeleton: `<?php
\$fibers = [
    new Fiber(fn() => Fiber::suspend()),
    new Fiber(fn() => Fiber::suspend()),
];
foreach (\$fibers as \$f) \$f->start();
while (true) {
    foreach (\$fibers as \$f) {
        if (\$f->isSuspended()) \$f->resume();
    }
}
echo 'done';`,
      solution: `<?php
\$fibers = [
    new Fiber(fn() => Fiber::suspend()),
    new Fiber(fn() => Fiber::suspend()),
];
foreach (\$fibers as \$f) \$f->start();
\$active = true;
while (\$active) {
    \$active = false;
    foreach (\$fibers as \$f) {
        if (\$f->isSuspended()) {
            \$f->resume();
            \$active = true;
        }
    }
}
echo 'done';`,
      hints: [
        'while(true) never exits even when all fibers are done.',
        'Track whether any fiber was active in this iteration.',
        'Exit the loop when no fibers are suspended.',
      ],
      concepts: ['infinite-loop', 'active-check', 'termination'],
    },
    {
      id: 'php-async-15',
      title: 'Fix Missing Error Propagation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the scheduler that silently swallows fiber exceptions.',
      skeleton: `<?php
\$fibers = [
    new Fiber(fn() => throw new RuntimeException('task failed')),
];
foreach (\$fibers as \$f) {
    \$f->start();
}
echo 'all done';`,
      solution: `<?php
\$fibers = [
    new Fiber(fn() => throw new RuntimeException('task failed')),
];
foreach (\$fibers as \$f) {
    try {
        \$f->start();
    } catch (RuntimeException \$e) {
        echo 'Error: ' . \$e->getMessage() . ' ';
    }
}
echo 'all done';`,
      hints: [
        'Fiber exceptions propagate to start()/resume().',
        'Wrap in try/catch to handle them.',
        'Otherwise the exception crashes the whole loop.',
      ],
      concepts: ['error-propagation', 'try-catch', 'resilience'],
    },
    {
      id: 'php-async-16',
      title: 'Predict Concurrent Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output order of two concurrent fibers.',
      skeleton: `<?php
\$a = new Fiber(function (): void { echo 'A1 '; Fiber::suspend(); echo 'A2 '; });
\$b = new Fiber(function (): void { echo 'B1 '; Fiber::suspend(); echo 'B2 '; });
\$a->start();
\$b->start();
\$a->resume();
\$b->resume();`,
      solution: `A1 B1 A2 B2 `,
      hints: [
        'a.start prints A1, suspends.',
        'b.start prints B1, suspends.',
        'a.resume prints A2.',
        'b.resume prints B2.',
      ],
      concepts: ['interleaved-output', 'concurrent', 'order'],
    },
    {
      id: 'php-async-17',
      title: 'Predict Race Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict which fiber completes first in a race.',
      skeleton: `<?php
\$fast = new Fiber(function (): string { return 'fast'; });
\$slow = new Fiber(function (): string { Fiber::suspend(); return 'slow'; });
\$fast->start();
\$slow->start();
if (\$fast->isTerminated()) echo \$fast->getReturn();
elseif (\$slow->isTerminated()) echo \$slow->getReturn();`,
      solution: `fast`,
      hints: [
        'fast completes immediately (no suspend).',
        'slow suspends on start, not terminated yet.',
        'fast wins the race.',
      ],
      concepts: ['race', 'immediate-vs-deferred', 'isTerminated'],
    },
    {
      id: 'php-async-18',
      title: 'Predict Channel Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output of channel send/receive operations.',
      skeleton: `<?php
\$ch = new SplQueue();
\$ch->enqueue('hello');
\$ch->enqueue('world');
echo \$ch->dequeue() . ' ' . \$ch->dequeue();`,
      solution: `hello world`,
      hints: [
        'SplQueue is FIFO.',
        'hello was enqueued first, dequeued first.',
        'world comes second.',
      ],
      concepts: ['channel-fifo', 'SplQueue', 'ordering'],
    },
    {
      id: 'php-async-19',
      title: 'Refactor Sequential to Concurrent',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor sequential task execution to concurrent fiber-based execution.',
      skeleton: `<?php
function task1(): string { return 'result1'; }
function task2(): string { return 'result2'; }
function task3(): string { return 'result3'; }

\$r1 = task1();
\$r2 = task2();
\$r3 = task3();
echo "\$r1 \$r2 \$r3";`,
      solution: `<?php
function task1(): string { return 'result1'; }
function task2(): string { return 'result2'; }
function task3(): string { return 'result3'; }

\$fibers = [
    new Fiber(fn() => task1()),
    new Fiber(fn() => task2()),
    new Fiber(fn() => task3()),
];
foreach (\$fibers as \$f) \$f->start();
\$results = array_map(fn(\$f) => \$f->getReturn(), \$fibers);
echo implode(' ', \$results);`,
      hints: [
        'Wrap each task in a Fiber.',
        'Start all fibers.',
        'Collect results from getReturn().',
      ],
      concepts: ['sequential-to-concurrent', 'fiber-wrap', 'refactor'],
    },
    {
      id: 'php-async-20',
      title: 'Refactor Callback Hell to Fibers',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the nested callback structure to a linear fiber-based flow.',
      skeleton: `<?php
function fetchData(callable \$cb): void { \$cb('data'); }
function processData(string \$data, callable \$cb): void { \$cb(strtoupper(\$data)); }
function saveResult(string \$result, callable \$cb): void { \$cb("saved: \$result"); }

fetchData(function (\$data) {
    processData(\$data, function (\$processed) {
        saveResult(\$processed, function (\$final) {
            echo \$final;
        });
    });
});`,
      solution: `<?php
function fetchData(callable \$cb): void { \$cb('data'); }
function processData(string \$data, callable \$cb): void { \$cb(strtoupper(\$data)); }
function saveResult(string \$result, callable \$cb): void { \$cb("saved: \$result"); }

\$fiber = new Fiber(function (): void {
    \$data = null;
    fetchData(function (\$d) use (&\$data) { \$data = \$d; });
    \$processed = null;
    processData(\$data, function (\$p) use (&\$processed) { \$processed = \$p; });
    \$final = null;
    saveResult(\$processed, function (\$f) use (&\$final) { \$final = \$f; });
    echo \$final;
});
\$fiber->start();`,
      hints: [
        'Flatten the nested callbacks into sequential steps.',
        'Capture callback results in local variables.',
        'The fiber executes linearly, easier to read.',
      ],
      concepts: ['callback-hell', 'linearize', 'fiber-flow'],
    },
  ],
};
