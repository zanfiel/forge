import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-generators',
  title: '14. Generators',
  explanation: `## Generators

Generators are functions that use \\\`yield\\\` to produce a sequence of values lazily, one at a time.

### Generator Functions
Use \\\`yield\\\` instead of \\\`return\\\`. The function pauses at each \\\`yield\\\` and resumes on \\\`next()\\\`.

### Generator Expressions
\\\`(expr for item in iterable)\\\` -- like a list comprehension but lazy.

### Key Methods
- \\\`next(gen)\\\` -- get the next value
- \\\`gen.send(value)\\\` -- send a value back into the generator
- \\\`gen.throw(exc)\\\` -- throw an exception into the generator
- \\\`gen.close()\\\` -- terminate the generator

### yield from
Delegates to a sub-generator: \\\`yield from iterable\\\`.

### itertools
Standard library module with powerful iterator building blocks:
\\\`chain\\\`, \\\`islice\\\`, \\\`count\\\`, \\\`cycle\\\`, \\\`repeat\\\`, \\\`groupby\\\`, etc.
`,
  exercises: [
    {
      id: 'py-gen-1',
      title: 'Basic Generator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete the generator function to yield 1, 2, 3.',
      skeleton: `def one_two_three():
    __BLANK__ 1
    yield 2
    yield 3

print(list(one_two_three()))  # [1, 2, 3]`,
      solution: `def one_two_three():
    yield 1
    yield 2
    yield 3

print(list(one_two_three()))  # [1, 2, 3]`,
      hints: [
        'The yield keyword produces a value and pauses.',
        'yield is like return but the function can continue.',
        'The answer is: yield',
      ],
      concepts: ['yield', 'generator function'],
    },
    {
      id: 'py-gen-2',
      title: 'next() on Generator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Get the first value from the generator.',
      skeleton: `def count_up():
    yield 1
    yield 2
    yield 3

gen = count_up()
first = __BLANK__(gen)
print(first)  # 1`,
      solution: `def count_up():
    yield 1
    yield 2
    yield 3

gen = count_up()
first = next(gen)
print(first)  # 1`,
      hints: [
        'next() advances the generator to the next yield.',
        'It returns the yielded value.',
        'The answer is: next',
      ],
      concepts: ['next()', 'generator protocol'],
    },
    {
      id: 'py-gen-3',
      title: 'Generator with Loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete the generator that yields squares of 1 to n.',
      skeleton: `def squares(n):
    for i in range(1, n + 1):
        __BLANK__ i ** 2

print(list(squares(5)))  # [1, 4, 9, 16, 25]`,
      solution: `def squares(n):
    for i in range(1, n + 1):
        yield i ** 2

print(list(squares(5)))  # [1, 4, 9, 16, 25]`,
      hints: [
        'Use yield inside the loop to produce each value.',
        'yield pauses the function and returns the value.',
        'The answer is: yield',
      ],
      concepts: ['yield', 'generator with loop'],
    },
    {
      id: 'py-gen-4',
      title: 'yield from',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Delegate to sub-generators using yield from.',
      skeleton: `def concat_generators(*gens):
    for gen in gens:
        __BLANK__ gen

g = concat_generators(range(3), range(3, 6))
print(list(g))  # [0, 1, 2, 3, 4, 5]`,
      solution: `def concat_generators(*gens):
    for gen in gens:
        yield from gen

g = concat_generators(range(3), range(3, 6))
print(list(g))  # [0, 1, 2, 3, 4, 5]`,
      hints: [
        'yield from delegates to another iterable.',
        'It yields each item from the sub-iterable.',
        'The answer is: yield from',
      ],
      concepts: ['yield from', 'delegation'],
    },
    {
      id: 'py-gen-5',
      title: 'Generator Expression',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a generator expression for squares.',
      skeleton: `gen = __BLANK__
print(sum(gen))  # 55 (sum of squares 1-5)`,
      solution: `gen = (n**2 for n in range(1, 6))
print(sum(gen))  # 55 (sum of squares 1-5)`,
      hints: [
        'Generator expressions use parentheses instead of brackets.',
        'Same syntax as list comprehension but with ().',
        'The answer is: (n**2 for n in range(1, 6))',
      ],
      concepts: ['generator expression'],
    },
    {
      id: 'py-gen-6',
      title: 'Infinite Generator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete the infinite counter generator.',
      skeleton: `import itertools

counter = itertools.__BLANK__(1)
first_five = [next(counter) for _ in range(5)]
print(first_five)  # [1, 2, 3, 4, 5]`,
      solution: `import itertools

counter = itertools.count(1)
first_five = [next(counter) for _ in range(5)]
print(first_five)  # [1, 2, 3, 4, 5]`,
      hints: [
        'itertools.count(start) generates an infinite sequence.',
        'It starts at the given value and increments by 1.',
        'The answer is: count',
      ],
      concepts: ['itertools.count()', 'infinite iterator'],
    },
    {
      id: 'py-gen-7',
      title: 'Write fibonacci Generator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a generator function fibonacci() that yields Fibonacci numbers indefinitely (0, 1, 1, 2, 3, 5, ...).',
      skeleton: `def fibonacci():
    # Yield Fibonacci numbers forever
    pass`,
      solution: `def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b`,
      hints: [
        'Start with a=0, b=1.',
        'Yield a, then update: a, b = b, a + b.',
        'Use while True for an infinite generator.',
      ],
      concepts: ['infinite generator', 'Fibonacci sequence'],
    },
    {
      id: 'py-gen-8',
      title: 'Write take Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a generator function take(n, iterable) that yields the first n items from an iterable.',
      skeleton: `def take(n, iterable):
    # Yield first n items
    pass`,
      solution: `def take(n, iterable):
    for i, item in enumerate(iterable):
        if i >= n:
            break
        yield item`,
      hints: [
        'Use enumerate to track the count.',
        'Break after yielding n items.',
        'Or use itertools.islice.',
      ],
      concepts: ['generator function', 'islice pattern'],
    },
    {
      id: 'py-gen-9',
      title: 'Predict Generator Exhaustion',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `gen = (x for x in [1, 2, 3])
print(list(gen))
print(list(gen))`,
      solution: `[1, 2, 3]
[]`,
      hints: [
        'Generators are single-use iterators.',
        'Once exhausted, they produce no more values.',
        'The second list() call gets an empty list.',
      ],
      concepts: ['generator exhaustion', 'single-use'],
    },
    {
      id: 'py-gen-10',
      title: 'Write chunk Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a generator function chunk(iterable, size) that yields lists of the given size from the iterable.',
      skeleton: `def chunk(iterable, size):
    # Yield chunks of the given size
    pass`,
      solution: `def chunk(iterable, size):
    batch = []
    for item in iterable:
        batch.append(item)
        if len(batch) == size:
            yield batch
            batch = []
    if batch:
        yield batch`,
      hints: [
        'Accumulate items into a batch list.',
        'Yield the batch when it reaches the desired size.',
        'Do not forget the remaining items at the end.',
      ],
      concepts: ['generator function', 'batching'],
    },
    {
      id: 'py-gen-11',
      title: 'Predict send() Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `def echo():
    while True:
        received = yield
        print(f"Got: {received}")

g = echo()
next(g)  # Prime the generator
g.send("hello")`,
      solution: `Got: hello`,
      hints: [
        'yield as an expression receives values from send().',
        'next(g) primes the generator to the first yield.',
        'send("hello") resumes the generator with "hello".',
      ],
      concepts: ['send()', 'bidirectional generator'],
    },
    {
      id: 'py-gen-12',
      title: 'Fix the Bug: Returning from Generator',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the generator that accidentally uses return instead of yield.',
      skeleton: `def first_n(lst, n):
    for i, item in enumerate(lst):
        if i >= n:
            return
        return item

print(list(first_n([10, 20, 30, 40], 2)))  # Should print [10, 20]`,
      solution: `def first_n(lst, n):
    for i, item in enumerate(lst):
        if i >= n:
            return
        yield item

print(list(first_n([10, 20, 30, 40], 2)))  # Should print [10, 20]`,
      hints: [
        'return inside a generator stops it entirely.',
        'Use yield to produce values one at a time.',
        'Change "return item" to "yield item".',
      ],
      concepts: ['yield vs return', 'generator'],
    },
    {
      id: 'py-gen-13',
      title: 'Write sliding_window Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a generator function sliding_window(iterable, size) that yields overlapping windows.',
      skeleton: `from collections import deque

def sliding_window(iterable, size):
    # Yield sliding windows of given size
    pass`,
      solution: `from collections import deque

def sliding_window(iterable, size):
    window = deque(maxlen=size)
    for item in iterable:
        window.append(item)
        if len(window) == size:
            yield tuple(window)`,
      hints: [
        'Use a deque with maxlen to maintain the window.',
        'Yield a tuple of the window once it is full.',
        'deque automatically drops the oldest item when full.',
      ],
      concepts: ['sliding window', 'deque', 'generator'],
    },
    {
      id: 'py-gen-14',
      title: 'Fix the Bug: Generator Not Lazy',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the function so it is truly lazy (generator), not eagerly building a list.',
      skeleton: `def read_lines(lines):
    result = []
    for line in lines:
        result.append(line.strip())
    return result  # Not lazy!

# Should work with infinite iterables
import itertools
gen = read_lines(itertools.count())  # This hangs!`,
      solution: `def read_lines(lines):
    for line in lines:
        yield str(line).strip()

import itertools
gen = read_lines(itertools.count())
# Now lazy - only processes items as needed`,
      hints: [
        'Replace the list accumulation with yield.',
        'This makes the function a generator -- it processes lazily.',
        'Remove the result list and return, use yield instead.',
      ],
      concepts: ['lazy evaluation', 'generator', 'memory efficiency'],
    },
    {
      id: 'py-gen-15',
      title: 'Write itertools chain Usage',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function concat_iters(*iterables) that lazily concatenates multiple iterables using itertools.chain.',
      skeleton: `import itertools

def concat_iters(*iterables):
    # Lazily concatenate iterables
    pass`,
      solution: `import itertools

def concat_iters(*iterables):
    return itertools.chain(*iterables)`,
      hints: [
        'itertools.chain() concatenates iterables lazily.',
        'Unpack the iterables with *.',
        'return itertools.chain(*iterables)',
      ],
      concepts: ['itertools.chain()', 'lazy concatenation'],
    },
    {
      id: 'py-gen-16',
      title: 'Predict yield from',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `def inner():
    yield 1
    yield 2

def outer():
    yield 0
    yield from inner()
    yield 3

print(list(outer()))`,
      solution: `[0, 1, 2, 3]`,
      hints: [
        'yield from delegates to the inner generator.',
        'outer yields 0, then inner yields 1, 2, then outer yields 3.',
        'The result is a flat sequence.',
      ],
      concepts: ['yield from', 'delegation'],
    },
    {
      id: 'py-gen-17',
      title: 'Write flatten_deep Generator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a generator function flatten_deep(iterable) that recursively flattens any nesting depth. Non-iterables and strings are yielded as-is.',
      skeleton: `def flatten_deep(iterable):
    # Recursively flatten nested iterables
    pass`,
      solution: `def flatten_deep(iterable):
    for item in iterable:
        if isinstance(item, (list, tuple, set)):
            yield from flatten_deep(item)
        else:
            yield item`,
      hints: [
        'Check if each item is an iterable (list, tuple, set).',
        'Use yield from for recursive flattening.',
        'Strings should not be recursively flattened.',
      ],
      concepts: ['recursive generator', 'yield from', 'deep flatten'],
    },
    {
      id: 'py-gen-18',
      title: 'Fix the Bug: StopIteration Leak',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the generator that accidentally leaks StopIteration in Python 3.7+.',
      skeleton: `def first_positive(iterable):
    it = iter(iterable)
    while True:
        value = next(it)  # Raises StopIteration when exhausted
        if value > 0:
            yield value
            return

print(list(first_positive([-1, -2, 3])))  # Should print [3]`,
      solution: `def first_positive(iterable):
    for value in iterable:
        if value > 0:
            yield value
            return

print(list(first_positive([-1, -2, 3])))  # Should print [3]`,
      hints: [
        'In Python 3.7+, StopIteration inside a generator becomes RuntimeError.',
        'Use a for loop instead of manual next() calls.',
        'for handles StopIteration properly.',
      ],
      concepts: ['StopIteration', 'PEP 479', 'generator'],
    },
    {
      id: 'py-gen-19',
      title: 'Refactor to Generator',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the function to use a generator instead of building a list.',
      skeleton: `def even_squares(n):
    result = []
    for i in range(n):
        sq = i ** 2
        if sq % 2 == 0:
            result.append(sq)
    return result`,
      solution: `def even_squares(n):
    for i in range(n):
        sq = i ** 2
        if sq % 2 == 0:
            yield sq`,
      hints: [
        'Replace the list and append with yield.',
        'Remove the result list and return.',
        'The function becomes a generator.',
      ],
      concepts: ['generator', 'refactoring', 'lazy evaluation'],
    },
    {
      id: 'py-gen-20',
      title: 'Refactor Pipeline with Generators',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the eager pipeline to a lazy generator pipeline.',
      skeleton: `def process_data(data):
    # Step 1: filter
    filtered = [x for x in data if x > 0]
    # Step 2: transform
    doubled = [x * 2 for x in filtered]
    # Step 3: limit
    return doubled[:5]`,
      solution: `import itertools

def process_data(data):
    filtered = (x for x in data if x > 0)
    doubled = (x * 2 for x in filtered)
    return list(itertools.islice(doubled, 5))`,
      hints: [
        'Replace list comprehensions with generator expressions.',
        'Use itertools.islice instead of slicing.',
        'This avoids creating intermediate lists.',
      ],
      concepts: ['generator pipeline', 'itertools.islice', 'lazy evaluation'],
    },
  ],
};
