import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-coll',
  title: '19. Collections',
  explanation: `## PHP Collections (SPL Data Structures)

PHP's Standard PHP Library (SPL) provides a set of data structures that go beyond plain arrays. These offer better performance and clearer intent for specific use cases.

### SplStack (LIFO)
\`\`\`php
<?php
\$stack = new SplStack();
\$stack->push('first');
\$stack->push('second');
echo \$stack->pop(); // "second"
echo \$stack->pop(); // "first"
\`\`\`

### SplQueue (FIFO)
\`\`\`php
<?php
\$queue = new SplQueue();
\$queue->enqueue('first');
\$queue->enqueue('second');
echo \$queue->dequeue(); // "first"
echo \$queue->dequeue(); // "second"
\`\`\`

### SplPriorityQueue
\`\`\`php
<?php
\$pq = new SplPriorityQueue();
\$pq->insert('low', 1);
\$pq->insert('high', 10);
\$pq->insert('medium', 5);
echo \$pq->extract(); // "high"
\`\`\`

### SplFixedArray
\`\`\`php
<?php
\$arr = new SplFixedArray(3);
\$arr[0] = 'a';
\$arr[1] = 'b';
\$arr[2] = 'c';
echo count(\$arr); // 3
\`\`\`

### SplDoublyLinkedList
\`\`\`php
<?php
\$dll = new SplDoublyLinkedList();
\$dll->push('a');
\$dll->push('b');
\$dll->unshift('z');
echo \$dll->bottom(); // "z"
echo \$dll->top();    // "b"
\`\`\`

### SplHeap
\`\`\`php
<?php
class MinHeap extends SplHeap {
    protected function compare(mixed \$a, mixed \$b): int {
        return \$b - \$a; // reverse for min-heap
    }
}
\$heap = new MinHeap();
\$heap->insert(5);
\$heap->insert(1);
\$heap->insert(3);
echo \$heap->extract(); // 1
\`\`\``,
  exercises: [
    {
      id: 'php-coll-1',
      title: 'Create an SplStack',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to create an SplStack and push a value.',
      skeleton: `<?php
\$stack = ___;
\$stack->push('hello');
echo \$stack->pop();`,
      solution: `<?php
\$stack = new SplStack();
\$stack->push('hello');
echo \$stack->pop();`,
      hints: [
        'Use new SplStack() to create a stack.',
        'SplStack is a LIFO (last in, first out) structure.',
        'No arguments are needed for the constructor.',
      ],
      concepts: ['SplStack', 'LIFO', 'constructor'],
    },
    {
      id: 'php-coll-2',
      title: 'Enqueue into SplQueue',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to add an item to the queue.',
      skeleton: `<?php
\$queue = new SplQueue();
\$queue->___('task1');
\$queue->___('task2');
echo \$queue->dequeue();`,
      solution: `<?php
\$queue = new SplQueue();
\$queue->enqueue('task1');
\$queue->enqueue('task2');
echo \$queue->dequeue();`,
      hints: [
        'SplQueue uses enqueue() to add items.',
        'dequeue() removes and returns the first item.',
        'SplQueue is FIFO (first in, first out).',
      ],
      concepts: ['SplQueue', 'FIFO', 'enqueue'],
    },
    {
      id: 'php-coll-3',
      title: 'SplPriorityQueue Insert',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to insert items with priorities.',
      skeleton: `<?php
\$pq = new SplPriorityQueue();
\$pq->___(___);
\$pq->insert('low', 1);
echo \$pq->extract();`,
      solution: `<?php
\$pq = new SplPriorityQueue();
\$pq->insert('high', 10);
\$pq->insert('low', 1);
echo \$pq->extract();`,
      hints: [
        'Use insert(value, priority) to add items.',
        'Higher priority numbers are extracted first.',
        'extract() removes and returns the highest priority item.',
      ],
      concepts: ['SplPriorityQueue', 'insert', 'priority'],
    },
    {
      id: 'php-coll-4',
      title: 'SplFixedArray Size',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to create a fixed-size array of 5 elements.',
      skeleton: `<?php
\$arr = new SplFixedArray(___);
\$arr[0] = 'first';
\$arr[4] = 'last';
echo count(\$arr);`,
      solution: `<?php
\$arr = new SplFixedArray(5);
\$arr[0] = 'first';
\$arr[4] = 'last';
echo count(\$arr);`,
      hints: [
        'SplFixedArray requires a size in the constructor.',
        'Index 4 is the last valid index for size 5.',
        'count() returns the fixed size.',
      ],
      concepts: ['SplFixedArray', 'fixed-size', 'constructor-arg'],
    },
    {
      id: 'php-coll-5',
      title: 'SplDoublyLinkedList Push and Unshift',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to add to both ends of a doubly linked list.',
      skeleton: `<?php
\$dll = new SplDoublyLinkedList();
\$dll->___('middle');
\$dll->___('front');
echo \$dll->bottom();`,
      solution: `<?php
\$dll = new SplDoublyLinkedList();
\$dll->push('middle');
\$dll->unshift('front');
echo \$dll->bottom();`,
      hints: [
        'push() adds to the end of the list.',
        'unshift() adds to the beginning of the list.',
        'bottom() returns the first element.',
      ],
      concepts: ['SplDoublyLinkedList', 'push', 'unshift'],
    },
    {
      id: 'php-coll-6',
      title: 'SplStack Iteration Mode',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to set the iteration mode to FIFO on an SplDoublyLinkedList.',
      skeleton: `<?php
\$dll = new SplDoublyLinkedList();
\$dll->push('a');
\$dll->push('b');
\$dll->push('c');
\$dll->setIteratorMode(___);
\$dll->rewind();
echo \$dll->current();`,
      solution: `<?php
\$dll = new SplDoublyLinkedList();
\$dll->push('a');
\$dll->push('b');
\$dll->push('c');
\$dll->setIteratorMode(SplDoublyLinkedList::IT_MODE_FIFO);
\$dll->rewind();
echo \$dll->current();`,
      hints: [
        'Use the IT_MODE_FIFO constant from SplDoublyLinkedList.',
        'FIFO iterates from bottom to top.',
        'The constant is SplDoublyLinkedList::IT_MODE_FIFO.',
      ],
      concepts: ['iteration-mode', 'FIFO', 'SplDoublyLinkedList'],
    },
    {
      id: 'php-coll-7',
      title: 'Write a Stack Reverser',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Write a function reverseArray(array $items): array that uses SplStack to reverse an array.',
      skeleton: `<?php
// Write the reverseArray function using SplStack`,
      solution: `<?php
function reverseArray(array \$items): array {
    \$stack = new SplStack();
    foreach (\$items as \$item) {
        \$stack->push(\$item);
    }
    \$result = [];
    while (!\$stack->isEmpty()) {
        \$result[] = \$stack->pop();
    }
    return \$result;
}`,
      hints: [
        'Push all items onto the stack first.',
        'Then pop them off into a new array.',
        'SplStack is LIFO, so items come out reversed.',
      ],
      concepts: ['SplStack', 'LIFO', 'reversal'],
    },
    {
      id: 'php-coll-8',
      title: 'Write a Task Queue',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function processQueue(array $tasks): array that enqueues all tasks into an SplQueue and dequeues them, returning the processed order.',
      skeleton: `<?php
// Write the processQueue function using SplQueue`,
      solution: `<?php
function processQueue(array \$tasks): array {
    \$queue = new SplQueue();
    foreach (\$tasks as \$task) {
        \$queue->enqueue(\$task);
    }
    \$result = [];
    while (!\$queue->isEmpty()) {
        \$result[] = \$queue->dequeue();
    }
    return \$result;
}`,
      hints: [
        'Enqueue all tasks first.',
        'Dequeue them into a result array.',
        'SplQueue is FIFO, so order is preserved.',
      ],
      concepts: ['SplQueue', 'FIFO', 'task-processing'],
    },
    {
      id: 'php-coll-9',
      title: 'Write a Priority Sorter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function sortByPriority(array $items): array where each item is [name, priority]. Use SplPriorityQueue and return names in priority order.',
      skeleton: `<?php
// Write the sortByPriority function`,
      solution: `<?php
function sortByPriority(array \$items): array {
    \$pq = new SplPriorityQueue();
    foreach (\$items as [\$name, \$priority]) {
        \$pq->insert(\$name, \$priority);
    }
    \$result = [];
    while (!\$pq->isEmpty()) {
        \$result[] = \$pq->extract();
    }
    return \$result;
}`,
      hints: [
        'Destructure each item as [$name, $priority].',
        'Insert into SplPriorityQueue with insert($name, $priority).',
        'Extract all items into a result array.',
      ],
      concepts: ['SplPriorityQueue', 'sorting', 'destructuring'],
    },
    {
      id: 'php-coll-10',
      title: 'Write a MinHeap',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a MinHeap class extending SplHeap that extracts smallest values first. Implement the compare method.',
      skeleton: `<?php
// Write the MinHeap class extending SplHeap`,
      solution: `<?php
class MinHeap extends SplHeap {
    protected function compare(mixed \$a, mixed \$b): int {
        return \$b - \$a;
    }
}`,
      hints: [
        'Extend SplHeap and implement compare().',
        'SplHeap is a max-heap by default.',
        'Reverse the comparison ($b - $a) for min-heap behavior.',
      ],
      concepts: ['SplHeap', 'min-heap', 'compare'],
    },
    {
      id: 'php-coll-11',
      title: 'Write FixedArray from Regular Array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function toFixed(array $items): SplFixedArray that converts a regular array to SplFixedArray.',
      skeleton: `<?php
// Write the toFixed function`,
      solution: `<?php
function toFixed(array \$items): SplFixedArray {
    \$fixed = new SplFixedArray(count(\$items));
    foreach (\$items as \$i => \$val) {
        \$fixed[\$i] = \$val;
    }
    return \$fixed;
}`,
      hints: [
        'Create SplFixedArray with count($items) as the size.',
        'Loop through and assign each element by index.',
        'You could also use SplFixedArray::fromArray().',
      ],
      concepts: ['SplFixedArray', 'conversion', 'count'],
    },
    {
      id: 'php-coll-12',
      title: 'Write a Bounded Queue',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a class BoundedQueue that wraps SplQueue with a max size. Constructor takes int $maxSize. add($item): bool returns false if full. remove() dequeues. size(): int returns count.',
      skeleton: `<?php
// Write the BoundedQueue class`,
      solution: `<?php
class BoundedQueue {
    private SplQueue \$queue;

    public function __construct(private int \$maxSize) {
        \$this->queue = new SplQueue();
    }

    public function add(mixed \$item): bool {
        if (\$this->queue->count() >= \$this->maxSize) {
            return false;
        }
        \$this->queue->enqueue(\$item);
        return true;
    }

    public function remove(): mixed {
        return \$this->queue->dequeue();
    }

    public function size(): int {
        return \$this->queue->count();
    }
}`,
      hints: [
        'Store maxSize via constructor promotion.',
        'Check count() against maxSize before enqueuing.',
        'Return false if the queue is at capacity.',
      ],
      concepts: ['bounded-queue', 'encapsulation', 'SplQueue'],
    },
    {
      id: 'php-coll-13',
      title: 'Fix SplFixedArray Out of Bounds',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the runtime error caused by accessing an out-of-bounds index.',
      skeleton: `<?php
\$arr = new SplFixedArray(3);
\$arr[0] = 'a';
\$arr[1] = 'b';
\$arr[2] = 'c';
\$arr[3] = 'd';
echo count(\$arr);`,
      solution: `<?php
\$arr = new SplFixedArray(4);
\$arr[0] = 'a';
\$arr[1] = 'b';
\$arr[2] = 'c';
\$arr[3] = 'd';
echo count(\$arr);`,
      hints: [
        'SplFixedArray(3) only has indices 0, 1, 2.',
        'Index 3 is out of bounds for a size-3 array.',
        'Change the size to 4 to fit all elements.',
      ],
      concepts: ['SplFixedArray', 'bounds-checking', 'runtime-error'],
    },
    {
      id: 'php-coll-14',
      title: 'Fix SplStack Empty Pop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the bug where popping from an empty stack causes an error.',
      skeleton: `<?php
function safePop(SplStack \$stack): ?string {
    return \$stack->pop();
}

\$stack = new SplStack();
echo safePop(\$stack) ?? 'empty';`,
      solution: `<?php
function safePop(SplStack \$stack): ?string {
    if (\$stack->isEmpty()) {
        return null;
    }
    return \$stack->pop();
}

\$stack = new SplStack();
echo safePop(\$stack) ?? 'empty';`,
      hints: [
        'Calling pop() on an empty stack throws RuntimeException.',
        'Check isEmpty() before calling pop().',
        'Return null if the stack is empty.',
      ],
      concepts: ['empty-check', 'guard-clause', 'RuntimeException'],
    },
    {
      id: 'php-coll-15',
      title: 'Fix SplHeap Compare',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the MaxHeap so it correctly extracts the largest value first.',
      skeleton: `<?php
class MaxHeap extends SplHeap {
    protected function compare(mixed \$a, mixed \$b): int {
        return \$b - \$a;
    }
}

\$heap = new MaxHeap();
\$heap->insert(3);
\$heap->insert(10);
\$heap->insert(1);
echo \$heap->extract(); // Should print 10`,
      solution: `<?php
class MaxHeap extends SplHeap {
    protected function compare(mixed \$a, mixed \$b): int {
        return \$a - \$b;
    }
}

\$heap = new MaxHeap();
\$heap->insert(3);
\$heap->insert(10);
\$heap->insert(1);
echo \$heap->extract(); // Should print 10`,
      hints: [
        'SplHeap compare returns positive if $a should come before $b.',
        'For max-heap, larger values should come first.',
        '$a - $b gives max-heap; $b - $a gives min-heap.',
      ],
      concepts: ['SplHeap', 'compare', 'max-heap'],
    },
    {
      id: 'php-coll-16',
      title: 'Predict SplStack Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output of stack operations.',
      skeleton: `<?php
\$stack = new SplStack();
\$stack->push('a');
\$stack->push('b');
\$stack->push('c');
echo \$stack->pop() . ' ';
echo \$stack->pop() . ' ';
echo \$stack->pop();`,
      solution: `c b a`,
      hints: [
        'SplStack is LIFO (last in, first out).',
        'Items are popped in reverse order of insertion.',
        'c was pushed last, so it is popped first.',
      ],
      concepts: ['SplStack', 'LIFO', 'pop-order'],
    },
    {
      id: 'php-coll-17',
      title: 'Predict SplPriorityQueue Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict which items are extracted in what order.',
      skeleton: `<?php
\$pq = new SplPriorityQueue();
\$pq->insert('C', 3);
\$pq->insert('A', 1);
\$pq->insert('B', 2);
echo \$pq->extract() . ' ';
echo \$pq->extract() . ' ';
echo \$pq->extract();`,
      solution: `C B A`,
      hints: [
        'Higher priority numbers are extracted first.',
        'C has priority 3 (highest), then B (2), then A (1).',
        'SplPriorityQueue is a max-priority queue by default.',
      ],
      concepts: ['SplPriorityQueue', 'extraction-order', 'priority'],
    },
    {
      id: 'php-coll-18',
      title: 'Predict SplFixedArray Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output of SplFixedArray operations.',
      skeleton: `<?php
\$arr = new SplFixedArray(5);
\$arr[0] = 'x';
\$arr[2] = 'y';
echo count(\$arr) . ' ';
echo (\$arr[1] === null ? 'null' : \$arr[1]) . ' ';
echo \$arr[2];`,
      solution: `5 null y`,
      hints: [
        'count() returns the fixed size, not the number of set elements.',
        'Unset indices default to null.',
        'Index 2 was explicitly set to "y".',
      ],
      concepts: ['SplFixedArray', 'count', 'null-default'],
    },
    {
      id: 'php-coll-19',
      title: 'Refactor Array to SplQueue',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the array-based queue to use SplQueue.',
      skeleton: `<?php
\$queue = [];
\$queue[] = 'task1';
\$queue[] = 'task2';
\$queue[] = 'task3';
\$first = array_shift(\$queue);
echo \$first . ' ' . count(\$queue);`,
      solution: `<?php
\$queue = new SplQueue();
\$queue->enqueue('task1');
\$queue->enqueue('task2');
\$queue->enqueue('task3');
\$first = \$queue->dequeue();
echo \$first . ' ' . \$queue->count();`,
      hints: [
        'Replace array with new SplQueue().',
        'Replace [] append with enqueue().',
        'Replace array_shift() with dequeue().',
      ],
      concepts: ['SplQueue', 'refactor', 'array-to-collection'],
    },
    {
      id: 'php-coll-20',
      title: 'Refactor Sort to SplPriorityQueue',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the manual sorting to use SplPriorityQueue for processing items by priority.',
      skeleton: `<?php
\$items = [
    ['name' => 'low', 'priority' => 1],
    ['name' => 'high', 'priority' => 10],
    ['name' => 'medium', 'priority' => 5],
];

usort(\$items, fn(\$a, \$b) => \$b['priority'] - \$a['priority']);

\$result = [];
foreach (\$items as \$item) {
    \$result[] = \$item['name'];
}`,
      solution: `<?php
\$items = [
    ['name' => 'low', 'priority' => 1],
    ['name' => 'high', 'priority' => 10],
    ['name' => 'medium', 'priority' => 5],
];

\$pq = new SplPriorityQueue();
foreach (\$items as \$item) {
    \$pq->insert(\$item['name'], \$item['priority']);
}

\$result = [];
while (!\$pq->isEmpty()) {
    \$result[] = \$pq->extract();
}`,
      hints: [
        'SplPriorityQueue automatically orders by priority.',
        'Use insert(value, priority) for each item.',
        'Extract all items to get them in priority order.',
      ],
      concepts: ['SplPriorityQueue', 'refactor', 'sorting'],
    },
  ],
};
