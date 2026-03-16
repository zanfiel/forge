import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-iterators',
  title: '23. Iterators',
  explanation: `## Iterators

An **iterator** is any object implementing \\\`__iter__()\\\` and \\\`__next__()\\\`. An **iterable** is any object implementing \\\`__iter__()\\\` that returns an iterator.

### The Protocol
\\\`\\\`\\\`python
class Counter:
    def __init__(self, limit):
        self.limit = limit
        self.current = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.current >= self.limit:
            raise StopIteration
        self.current += 1
        return self.current
\\\`\\\`\\\`

### Key Concepts
- \\\`iter(obj)\\\` calls \\\`obj.__iter__()\\\`
- \\\`next(obj)\\\` calls \\\`obj.__next__()\\\`
- \\\`StopIteration\\\` signals the end of iteration
- \\\`for\\\` loops call \\\`iter()\\\` then repeatedly \\\`next()\\\`

### Separating Iterable from Iterator
Best practice: the iterable's \\\`__iter__\\\` returns a **new** iterator each time, so multiple loops work independently.

### Built-in Iterators
\\\`range()\\\`, \\\`enumerate()\\\`, \\\`zip()\\\`, \\\`map()\\\`, \\\`filter()\\\` all return iterators.
`,
  exercises: [
    {
      id: 'py-iterators-1',
      title: 'iter() and next()',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Get an iterator from the list and retrieve the first element.',
      skeleton: `nums = [10, 20, 30]
it = __BLANK__(nums)
print(next(it))  # 10`,
      solution: `nums = [10, 20, 30]
it = iter(nums)
print(next(it))  # 10`,
      hints: [
        'iter() creates an iterator from an iterable.',
        'next() gets the next value from the iterator.',
        'The answer is: iter',
      ],
      concepts: ['iter()', 'next()'],
    },
    {
      id: 'py-iterators-2',
      title: 'StopIteration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Handle the end of an iterator.',
      skeleton: `it = iter([1])
print(next(it))  # 1
try:
    next(it)
except __BLANK__:
    print("No more items")`,
      solution: `it = iter([1])
print(next(it))  # 1
try:
    next(it)
except StopIteration:
    print("No more items")`,
      hints: [
        'Iterators raise an exception when exhausted.',
        'The exception type is StopIteration.',
        'The answer is: StopIteration',
      ],
      concepts: ['StopIteration'],
    },
    {
      id: 'py-iterators-3',
      title: '__iter__ Returns self',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Make the iterator return itself from __iter__.',
      skeleton: `class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return __BLANK__

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        val = self.current
        self.current -= 1
        return val

for n in Countdown(3):
    print(n, end=" ")  # 3 2 1`,
      solution: `class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        val = self.current
        self.current -= 1
        return val

for n in Countdown(3):
    print(n, end=" ")  # 3 2 1`,
      hints: [
        'When an object is both iterable and iterator, __iter__ returns self.',
        'This allows it to be used in for loops.',
        'The answer is: self',
      ],
      concepts: ['__iter__', 'iterator protocol'],
    },
    {
      id: 'py-iterators-4',
      title: 'next() with Default',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use next() with a default value to avoid StopIteration.',
      skeleton: `it = iter([])
result = next(it, __BLANK__)
print(result)  # None`,
      solution: `it = iter([])
result = next(it, None)
print(result)  # None`,
      hints: [
        'next() accepts an optional default value.',
        'If the iterator is exhausted, it returns the default.',
        'The answer is: None',
      ],
      concepts: ['next() default'],
    },
    {
      id: 'py-iterators-5',
      title: 'Iterate with for Loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete the __iter__ method to make the class work in a for loop.',
      skeleton: `class Evens:
    def __init__(self, limit):
        self.limit = limit

    def __BLANK__(self):
        self.current = 0
        return self

    def __next__(self):
        self.current += 2
        if self.current > self.limit:
            raise StopIteration
        return self.current

for n in Evens(10):
    print(n, end=" ")  # 2 4 6 8 10`,
      solution: `class Evens:
    def __init__(self, limit):
        self.limit = limit

    def __iter__(self):
        self.current = 0
        return self

    def __next__(self):
        self.current += 2
        if self.current > self.limit:
            raise StopIteration
        return self.current

for n in Evens(10):
    print(n, end=" ")  # 2 4 6 8 10`,
      hints: [
        'for loops call __iter__ to get the iterator.',
        'The method name is __iter__.',
        'The answer is: __iter__',
      ],
      concepts: ['__iter__', 'for loop'],
    },
    {
      id: 'py-iterators-6',
      title: 'Convert Iterator to List',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Convert a range iterator to a list.',
      skeleton: `r = range(5)
result = __BLANK__(r)
print(result)  # [0, 1, 2, 3, 4]`,
      solution: `r = range(5)
result = list(r)
print(result)  # [0, 1, 2, 3, 4]`,
      hints: [
        'list() consumes an iterable and creates a list.',
        'It calls iter() then next() repeatedly.',
        'The answer is: list',
      ],
      concepts: ['list()', 'consuming iterators'],
    },
    {
      id: 'py-iterators-7',
      title: 'Write a Repeat Iterator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a Repeat(value, times) iterator that yields value exactly times times.',
      skeleton: `class Repeat:
    # __init__(value, times)
    # __iter__, __next__
    pass`,
      solution: `class Repeat:
    def __init__(self, value, times):
        self.value = value
        self.times = times
        self.count = 0

    def __iter__(self):
        self.count = 0
        return self

    def __next__(self):
        if self.count >= self.times:
            raise StopIteration
        self.count += 1
        return self.value`,
      hints: [
        'Track how many times the value has been yielded.',
        'Raise StopIteration when count reaches times.',
        '__iter__ resets the counter.',
      ],
      concepts: ['iterator', '__next__', 'StopIteration'],
    },
    {
      id: 'py-iterators-8',
      title: 'Write a FibIterator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Fibonacci iterator that yields Fibonacci numbers up to a maximum value.',
      skeleton: `class FibIterator:
    # __init__(max_value)
    # Yields Fibonacci numbers <= max_value
    pass`,
      solution: `class FibIterator:
    def __init__(self, max_value):
        self.max_value = max_value
        self.a = 0
        self.b = 1

    def __iter__(self):
        self.a = 0
        self.b = 1
        return self

    def __next__(self):
        if self.a > self.max_value:
            raise StopIteration
        value = self.a
        self.a, self.b = self.b, self.a + self.b
        return value`,
      hints: [
        'Track two consecutive Fibonacci numbers: a and b.',
        'On each __next__, return a and update: a, b = b, a+b.',
        'Stop when a exceeds max_value.',
      ],
      concepts: ['Fibonacci', 'iterator', 'state'],
    },
    {
      id: 'py-iterators-9',
      title: 'Write a Separate Iterable/Iterator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Sentence iterable that splits text into words. Its __iter__ returns a new SentenceIterator each time.',
      skeleton: `class SentenceIterator:
    # __init__(words), __iter__, __next__
    pass

class Sentence:
    # __init__(text), __iter__ returns new SentenceIterator
    pass`,
      solution: `class SentenceIterator:
    def __init__(self, words):
        self.words = words
        self.index = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.index >= len(self.words):
            raise StopIteration
        word = self.words[self.index]
        self.index += 1
        return word

class Sentence:
    def __init__(self, text):
        self.words = text.split()

    def __iter__(self):
        return SentenceIterator(self.words)`,
      hints: [
        'Sentence.__iter__ returns a NEW SentenceIterator each call.',
        'This allows multiple independent iterations.',
        'SentenceIterator tracks its own index.',
      ],
      concepts: ['iterable vs iterator', 'multiple iteration'],
    },
    {
      id: 'py-iterators-10',
      title: 'Predict: Iterator Exhaustion',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `nums = [1, 2, 3]
it = iter(nums)
print(list(it))
print(list(it))`,
      solution: `[1, 2, 3]
[]`,
      hints: [
        'list(it) consumes the entire iterator.',
        'The second list(it) gets an exhausted iterator.',
        'An exhausted iterator immediately raises StopIteration.',
      ],
      concepts: ['iterator exhaustion'],
    },
    {
      id: 'py-iterators-11',
      title: 'Predict: Iterable vs Iterator',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `nums = [1, 2, 3]
print(list(nums))
print(list(nums))

it = iter(nums)
print(next(it))
print(next(it))`,
      solution: `[1, 2, 3]
[1, 2, 3]
1
2`,
      hints: [
        'Lists are iterables: each list() call creates a new iterator.',
        'So list(nums) works multiple times.',
        'iter(nums) creates one iterator; next() advances it.',
      ],
      concepts: ['iterable', 'iterator', 'reusability'],
    },
    {
      id: 'py-iterators-12',
      title: 'Write a Cycle Iterator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Cycle(iterable) iterator that cycles through elements infinitely. Include a take(n) method.',
      skeleton: `class Cycle:
    # __init__(iterable), __iter__, __next__
    # Cycles infinitely through the elements
    pass`,
      solution: `class Cycle:
    def __init__(self, iterable):
        self.items = list(iterable)
        self.index = 0

    def __iter__(self):
        self.index = 0
        return self

    def __next__(self):
        if not self.items:
            raise StopIteration
        value = self.items[self.index % len(self.items)]
        self.index += 1
        return value`,
      hints: [
        'Store a copy of the iterable as a list.',
        'Use modulo to wrap the index around.',
        'Handle empty iterables with StopIteration.',
      ],
      concepts: ['infinite iterator', 'modulo', 'cycle'],
    },
    {
      id: 'py-iterators-13',
      title: 'Fix: Iterator Not Resettable',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the iterator so it can be used in multiple for loops.',
      skeleton: `class Range3:
    def __init__(self):
        self.current = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.current >= 3:
            raise StopIteration
        self.current += 1
        return self.current

r = Range3()
print(list(r))  # [1, 2, 3]
print(list(r))  # Should be [1, 2, 3], but is []`,
      solution: `class Range3Iterator:
    def __init__(self):
        self.current = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.current >= 3:
            raise StopIteration
        self.current += 1
        return self.current

class Range3:
    def __iter__(self):
        return Range3Iterator()

r = Range3()
print(list(r))  # [1, 2, 3]
print(list(r))  # [1, 2, 3]`,
      hints: [
        'When iterable and iterator are the same object, it cannot reset.',
        'Separate the iterable from the iterator.',
        '__iter__ on the iterable should return a new iterator each time.',
      ],
      concepts: ['iterable vs iterator', 'reset', 'separation'],
    },
    {
      id: 'py-iterators-14',
      title: 'Fix: __next__ Missing StopIteration',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the iterator so it stops after yielding all items.',
      skeleton: `class Letters:
    def __init__(self, text):
        self.text = text
        self.index = 0

    def __iter__(self):
        return self

    def __next__(self):
        char = self.text[self.index]
        self.index += 1
        return char

for c in Letters("hi"):
    print(c, end="")  # Should print "hi" then stop, but crashes with IndexError`,
      solution: `class Letters:
    def __init__(self, text):
        self.text = text
        self.index = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.index >= len(self.text):
            raise StopIteration
        char = self.text[self.index]
        self.index += 1
        return char

for c in Letters("hi"):
    print(c, end="")  # hi`,
      hints: [
        '__next__ must raise StopIteration when done.',
        'Check if index >= len(text) before accessing.',
        'Without the check, IndexError crashes the loop.',
      ],
      concepts: ['StopIteration', 'bounds checking'],
    },
    {
      id: 'py-iterators-15',
      title: 'Write a Chunk Iterator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a chunked(iterable, size) function that returns an iterator yielding lists of the given size.',
      skeleton: `def chunked(iterable, size):
    # Yield lists of \`size\` elements from iterable
    pass`,
      solution: `def chunked(iterable, size):
    it = iter(iterable)
    while True:
        chunk = []
        try:
            for _ in range(size):
                chunk.append(next(it))
        except StopIteration:
            if chunk:
                yield chunk
            return
        yield chunk`,
      hints: [
        'Convert to iterator with iter() first.',
        'Collect size elements into a list.',
        'Handle StopIteration for the last partial chunk.',
      ],
      concepts: ['chunking', 'generator', 'iter()'],
    },
    {
      id: 'py-iterators-16',
      title: 'Predict: iter() with Sentinel',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `values = iter([1, 2, 3, 0, 4, 5])
result = list(iter(values.__next__, 0))
print(result)`,
      solution: `[1, 2, 3]`,
      hints: [
        'iter(callable, sentinel) calls the callable until it returns the sentinel.',
        'values.__next__ is the callable.',
        '0 is the sentinel, so iteration stops when 0 is returned.',
      ],
      concepts: ['iter() sentinel', 'two-argument iter'],
    },
    {
      id: 'py-iterators-17',
      title: 'Fix: Iterator Sharing State',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the code so two iterations over the same object work independently.',
      skeleton: `class Numbers:
    def __init__(self, n):
        self.n = n
        self.current = 0

    def __iter__(self):
        self.current = 0
        return self

    def __next__(self):
        if self.current >= self.n:
            raise StopIteration
        self.current += 1
        return self.current

nums = Numbers(3)
for a in nums:
    for b in nums:
        print(f"{a},{b}", end=" ")
# Expected: 1,1 1,2 1,3 2,1 2,2 2,3 3,1 3,2 3,3`,
      solution: `class NumbersIterator:
    def __init__(self, n):
        self.n = n
        self.current = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.current >= self.n:
            raise StopIteration
        self.current += 1
        return self.current

class Numbers:
    def __init__(self, n):
        self.n = n

    def __iter__(self):
        return NumbersIterator(self.n)

nums = Numbers(3)
for a in nums:
    for b in nums:
        print(f"{a},{b}", end=" ")`,
      hints: [
        'When iterable IS the iterator, nested loops share state.',
        'Separate iterable from iterator.',
        '__iter__ must return a NEW iterator object each time.',
      ],
      concepts: ['nested iteration', 'shared state', 'separation'],
    },
    {
      id: 'py-iterators-18',
      title: 'Write a Flatten Iterator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a flatten(nested) function that recursively flattens nested iterables (but not strings).',
      skeleton: `def flatten(nested):
    # Recursively yield items from nested iterables
    # Do not flatten strings
    pass`,
      solution: `def flatten(nested):
    for item in nested:
        if isinstance(item, (str, bytes)):
            yield item
        else:
            try:
                yield from flatten(item)
            except TypeError:
                yield item`,
      hints: [
        'Check if item is iterable (but not a string).',
        'Use yield from for recursive flattening.',
        'Catch TypeError for non-iterable items.',
      ],
      concepts: ['recursive iteration', 'yield from', 'flatten'],
    },
    {
      id: 'py-iterators-19',
      title: 'Refactor: Manual Loop to Iterator Class',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the manual index-tracking loop into a proper iterator class.',
      skeleton: `data = ["a", "b", "c", "d"]
index = 0
while index < len(data):
    item = data[index]
    print(f"{index}: {item}")
    index += 1`,
      solution: `class IndexedIterator:
    def __init__(self, data):
        self.data = data
        self.index = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.index >= len(self.data):
            raise StopIteration
        item = self.data[self.index]
        result = (self.index, item)
        self.index += 1
        return result

for idx, item in IndexedIterator(["a", "b", "c", "d"]):
    print(f"{idx}: {item}")`,
      hints: [
        'Encapsulate the index and data in a class.',
        'Yield (index, item) tuples like enumerate.',
        'Raise StopIteration when index reaches the end.',
      ],
      concepts: ['refactoring', 'iterator class', 'enumerate-like'],
    },
    {
      id: 'py-iterators-20',
      title: 'Refactor: List Building to Lazy Iterator',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the eager list-building approach to a lazy iterator that processes items one at a time.',
      skeleton: `def process_data(items):
    results = []
    for item in items:
        if item > 0:
            results.append(item * 2)
    return results

data = range(1000000)
output = process_data(data)
for x in output[:5]:
    print(x)`,
      solution: `def process_data(items):
    for item in items:
        if item > 0:
            yield item * 2

data = range(1000000)
import itertools
for x in itertools.islice(process_data(data), 5):
    print(x)`,
      hints: [
        'Replace list.append with yield to make it lazy.',
        'Use itertools.islice to take the first N items.',
        'The generator processes items one at a time, saving memory.',
      ],
      concepts: ['lazy evaluation', 'generator', 'memory efficiency'],
    },
  ],
};
