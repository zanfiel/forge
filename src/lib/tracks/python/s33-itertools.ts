import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-itertools',
  title: '33. Itertools',
  explanation: `## Itertools

The \\\`itertools\\\` module provides memory-efficient tools for working with iterators.

### Infinite Iterators
- **\\\`count(start, step)\\\`** -- infinite counter
- **\\\`cycle(iterable)\\\`** -- endlessly repeat an iterable
- **\\\`repeat(elem, n)\\\`** -- repeat an element n times (or infinitely)

### Terminating Iterators
- **\\\`chain(*iterables)\\\`** -- concatenate iterables
- **\\\`islice(iterable, stop)\\\`** -- slice an iterator
- **\\\`compress(data, selectors)\\\`** -- filter by boolean selectors
- **\\\`filterfalse(pred, iterable)\\\`** -- keep items where predicate is false
- **\\\`starmap(func, iterable)\\\`** -- apply func with unpacked arguments
- **\\\`zip_longest(*iterables)\\\`** -- zip with fill value for shorter iterables
- **\\\`takewhile(pred, iterable)\\\`** / **\\\`dropwhile(pred, iterable)\\\`**

### Combinatoric Iterators
- **\\\`product(*iterables)\\\`** -- Cartesian product
- **\\\`permutations(iterable, r)\\\`** -- r-length permutations
- **\\\`combinations(iterable, r)\\\`** -- r-length combinations
- **\\\`combinations_with_replacement(iterable, r)\\\`**

### Other Useful Tools
- **\\\`groupby(iterable, key)\\\`** -- group consecutive elements
- **\\\`tee(iterable, n)\\\`** -- clone an iterator
- **\\\`accumulate(iterable, func)\\\`** -- running totals/reductions
- **\\\`pairwise(iterable)\\\`** (3.10+) -- sliding window of pairs
- **\\\`batched(iterable, n)\\\`** (3.12+) -- split into chunks
`,
  exercises: [
    {
      id: 'py-it-1',
      title: 'chain basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use chain to concatenate multiple iterables into one.',
      skeleton: `from itertools import __BLANK__

a = [1, 2, 3]
b = [4, 5, 6]
c = [7, 8, 9]
result = list(__BLANK__(a, b, c))
print(result)`,
      solution: `from itertools import chain

a = [1, 2, 3]
b = [4, 5, 6]
c = [7, 8, 9]
result = list(chain(a, b, c))
print(result)`,
      hints: [
        'chain concatenates multiple iterables into one sequence.',
        'It yields elements from the first, then second, then third.',
        'The answer is: chain',
      ],
      concepts: ['chain', 'concatenation'],
    },
    {
      id: 'py-it-2',
      title: 'islice basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use islice to take the first 5 elements from an infinite counter.',
      skeleton: `from itertools import count, __BLANK__

first_five = list(__BLANK__(count(1), 5))
print(first_five)`,
      solution: `from itertools import count, islice

first_five = list(islice(count(1), 5))
print(first_five)`,
      hints: [
        'islice works like slice but on any iterable/iterator.',
        'islice(iterable, stop) takes the first stop elements.',
        'The answer is: islice',
      ],
      concepts: ['islice', 'count', 'infinite iterators'],
    },
    {
      id: 'py-it-3',
      title: 'product basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use product to generate the Cartesian product of two lists.',
      skeleton: `from itertools import __BLANK__

colors = ["red", "blue"]
sizes = ["S", "L"]
combos = list(__BLANK__(colors, sizes))
print(combos)`,
      solution: `from itertools import product

colors = ["red", "blue"]
sizes = ["S", "L"]
combos = list(product(colors, sizes))
print(combos)`,
      hints: [
        'product generates all pairs from the input iterables.',
        'product(A, B) yields (a, b) for each a in A and b in B.',
        'The answer is: product',
      ],
      concepts: ['product', 'Cartesian product'],
    },
    {
      id: 'py-it-4',
      title: 'combinations',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use combinations to find all 2-element combinations from a list.',
      skeleton: `from itertools import __BLANK__

items = ["a", "b", "c", "d"]
pairs = list(__BLANK__(items, 2))
print(pairs)`,
      solution: `from itertools import combinations

items = ["a", "b", "c", "d"]
pairs = list(combinations(items, 2))
print(pairs)`,
      hints: [
        'combinations(iterable, r) yields r-length combinations.',
        'Order does not matter and elements are not repeated.',
        'The answer is: combinations',
      ],
      concepts: ['combinations', 'combinatorics'],
    },
    {
      id: 'py-it-5',
      title: 'accumulate',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use accumulate to compute running totals.',
      skeleton: `from itertools import __BLANK__

numbers = [1, 2, 3, 4, 5]
running = list(__BLANK__(numbers))
print(running)`,
      solution: `from itertools import accumulate

numbers = [1, 2, 3, 4, 5]
running = list(accumulate(numbers))
print(running)`,
      hints: [
        'accumulate yields running totals by default (addition).',
        'It can also take a custom binary function.',
        'The answer is: accumulate',
      ],
      concepts: ['accumulate', 'running total'],
    },
    {
      id: 'py-it-6',
      title: 'groupby',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use groupby to group consecutive elements by their first letter.',
      skeleton: `from itertools import __BLANK__

words = ["apple", "avocado", "banana", "blueberry", "cherry"]
for key, group in __BLANK__(words, key=lambda w: w[0]):
    print(key, list(group))`,
      solution: `from itertools import groupby

words = ["apple", "avocado", "banana", "blueberry", "cherry"]
for key, group in groupby(words, key=lambda w: w[0]):
    print(key, list(group))`,
      hints: [
        'groupby groups consecutive elements with the same key.',
        'Data must be sorted by key first for full grouping.',
        'The answer is: groupby',
      ],
      concepts: ['groupby', 'key function', 'consecutive grouping'],
    },
    {
      id: 'py-it-7',
      title: 'Predict chain output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does chain.from_iterable produce?',
      skeleton: `from itertools import chain

nested = [[1, 2], [3, 4], [5, 6]]
result = list(chain.from_iterable(nested))
print(result)`,
      solution: `[1, 2, 3, 4, 5, 6]`,
      hints: [
        'chain.from_iterable flattens one level of nesting.',
        'It chains the inner lists into a single sequence.',
        'The output is [1, 2, 3, 4, 5, 6].',
      ],
      concepts: ['chain.from_iterable', 'flattening'],
    },
    {
      id: 'py-it-8',
      title: 'Predict permutations count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'How many 2-element permutations come from a 4-element list?',
      skeleton: `from itertools import permutations

items = ["a", "b", "c", "d"]
perms = list(permutations(items, 2))
print(len(perms))`,
      solution: `12`,
      hints: [
        'Permutations consider order: (a,b) and (b,a) are different.',
        'For n items choosing r: n! / (n-r)! = 4! / 2! = 24/2 = 12.',
        'The output is 12.',
      ],
      concepts: ['permutations', 'combinatorics'],
    },
    {
      id: 'py-it-9',
      title: 'Predict zip_longest output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does zip_longest produce with a fill value?',
      skeleton: `from itertools import zip_longest

a = [1, 2, 3]
b = ["x", "y"]
result = list(zip_longest(a, b, fillvalue="-"))
print(result)`,
      solution: `[(1, 'x'), (2, 'y'), (3, '-')]`,
      hints: [
        'zip_longest continues until the longest iterable is exhausted.',
        'Shorter iterables are padded with the fillvalue.',
        'The output has 3 tuples, with "-" filling the missing b value.',
      ],
      concepts: ['zip_longest', 'fill value'],
    },
    {
      id: 'py-it-10',
      title: 'Fix groupby without sorting',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the groupby that produces wrong results because data is not sorted by key.',
      skeleton: `from itertools import groupby

# Bug: groupby only groups CONSECUTIVE equal keys
data = [("a", 1), ("b", 2), ("a", 3), ("b", 4)]
for key, group in groupby(data, key=lambda x: x[0]):
    items = [v for _, v in group]
    print(f"{key}: {items}")
# Produces 4 groups instead of 2`,
      solution: `from itertools import groupby

# Fixed: sort by key before groupby
data = [("a", 1), ("b", 2), ("a", 3), ("b", 4)]
data_sorted = sorted(data, key=lambda x: x[0])
for key, group in groupby(data_sorted, key=lambda x: x[0]):
    items = [v for _, v in group]
    print(f"{key}: {items}")`,
      hints: [
        'groupby only groups consecutive elements with the same key.',
        'Sort the data by the grouping key first.',
        'Add sorted(data, key=lambda x: x[0]) before groupby.',
      ],
      concepts: ['groupby', 'sorting requirement'],
    },
    {
      id: 'py-it-11',
      title: 'Fix exhausted tee iterator',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code that uses the original iterator after calling tee.',
      skeleton: `from itertools import tee

data = iter([1, 2, 3, 4, 5])
a, b = tee(data)

# Bug: consuming original iterator invalidates the tee clones
total = sum(data)
first_three = list(a)[:3]

print(total)
print(first_three)`,
      solution: `from itertools import tee

data = iter([1, 2, 3, 4, 5])
a, b = tee(data)

# Fixed: use the tee clones, not the original iterator
total = sum(b)
first_three = list(a)[:3]

print(total)
print(first_three)`,
      hints: [
        'After calling tee, do not use the original iterator.',
        'Using the original advances it, invalidating the clones.',
        'Use the clones (a and b) instead of data.',
      ],
      concepts: ['tee', 'iterator invalidation'],
    },
    {
      id: 'py-it-12',
      title: 'Fix filterfalse usage',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Fix the code that uses filter instead of filterfalse to get odd numbers.',
      skeleton: `from itertools import filterfalse

numbers = [1, 2, 3, 4, 5, 6]
# Bug: filter keeps items where predicate is True
# We want items where "is even" is False (i.e., odd numbers)
odds = list(filter(lambda x: x % 2 == 0, numbers))
print(odds)  # Should be [1, 3, 5]`,
      solution: `from itertools import filterfalse

numbers = [1, 2, 3, 4, 5, 6]
# Fixed: filterfalse keeps items where predicate is False
odds = list(filterfalse(lambda x: x % 2 == 0, numbers))
print(odds)  # [1, 3, 5]`,
      hints: [
        'filter keeps items where the predicate is True.',
        'filterfalse keeps items where the predicate is False.',
        'Change filter to filterfalse to invert the selection.',
      ],
      concepts: ['filterfalse', 'filter vs filterfalse'],
    },
    {
      id: 'py-it-13',
      title: 'Write a chunker function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that splits an iterable into chunks of size n using itertools.',
      skeleton: `from itertools import islice

def chunked(iterable, n):
    # Yield successive n-sized chunks from iterable
    pass

data = list(range(10))
for chunk in chunked(data, 3):
    print(chunk)
# [0, 1, 2], [3, 4, 5], [6, 7, 8], [9]`,
      solution: `from itertools import islice

def chunked(iterable, n):
    it = iter(iterable)
    while True:
        chunk = list(islice(it, n))
        if not chunk:
            break
        yield chunk

data = list(range(10))
for chunk in chunked(data, 3):
    print(chunk)`,
      hints: [
        'Use islice to take n elements at a time.',
        'Convert to an iterator first so islice advances it.',
        'Keep taking chunks until islice returns an empty list.',
      ],
      concepts: ['islice', 'chunking', 'generator'],
    },
    {
      id: 'py-it-14',
      title: 'Write a flatten function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that flattens nested iterables using chain.from_iterable.',
      skeleton: `from itertools import chain

def flatten(nested):
    # Flatten one level of nesting
    pass

data = [[1, 2], [3, [4, 5]], [6]]
print(list(flatten(data)))
# [1, 2, 3, [4, 5], 6]  -- only flattens one level`,
      solution: `from itertools import chain

def flatten(nested):
    return chain.from_iterable(nested)

data = [[1, 2], [3, [4, 5]], [6]]
print(list(flatten(data)))`,
      hints: [
        'chain.from_iterable flattens exactly one level.',
        'It takes an iterable of iterables and chains them.',
        'Simply return chain.from_iterable(nested).',
      ],
      concepts: ['chain.from_iterable', 'flattening'],
    },
    {
      id: 'py-it-15',
      title: 'Write a sliding window',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a sliding window function using itertools.',
      skeleton: `from itertools import islice
from collections import deque

def sliding_window(iterable, n):
    # Yield sliding windows of size n
    pass

data = [1, 2, 3, 4, 5]
for window in sliding_window(data, 3):
    print(window)
# (1, 2, 3), (2, 3, 4), (3, 4, 5)`,
      solution: `from itertools import islice
from collections import deque

def sliding_window(iterable, n):
    it = iter(iterable)
    window = deque(islice(it, n), maxlen=n)
    if len(window) == n:
        yield tuple(window)
    for item in it:
        window.append(item)
        yield tuple(window)

data = [1, 2, 3, 4, 5]
for window in sliding_window(data, 3):
    print(window)`,
      hints: [
        'Use a deque with maxlen=n as the window.',
        'Initialize with the first n elements using islice.',
        'Each new element pushes out the oldest automatically.',
      ],
      concepts: ['sliding window', 'deque', 'islice'],
    },
    {
      id: 'py-it-16',
      title: 'Write accumulate with max',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use accumulate with a custom function to compute running maximums.',
      skeleton: `from itertools import accumulate

def running_max(numbers):
    # Return list of running maximum values
    pass

print(running_max([3, 1, 4, 1, 5, 9, 2, 6]))
# [3, 3, 4, 4, 5, 9, 9, 9]`,
      solution: `from itertools import accumulate

def running_max(numbers):
    return list(accumulate(numbers, max))

print(running_max([3, 1, 4, 1, 5, 9, 2, 6]))
# [3, 3, 4, 4, 5, 9, 9, 9]`,
      hints: [
        'accumulate accepts a custom binary function.',
        'Pass max as the function to compute running maximums.',
        'accumulate(numbers, max) yields the max seen so far.',
      ],
      concepts: ['accumulate', 'custom function', 'running max'],
    },
    {
      id: 'py-it-17',
      title: 'Write starmap usage',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Use starmap to apply a function to pre-paired arguments.',
      skeleton: `from itertools import starmap

def compute_areas(rectangles):
    # rectangles is a list of (width, height) tuples
    # Return list of areas using starmap
    pass

rects = [(3, 4), (5, 6), (2, 8)]
print(compute_areas(rects))  # [12, 30, 16]`,
      solution: `from itertools import starmap

def compute_areas(rectangles):
    return list(starmap(lambda w, h: w * h, rectangles))

rects = [(3, 4), (5, 6), (2, 8)]
print(compute_areas(rects))  # [12, 30, 16]`,
      hints: [
        'starmap unpacks each tuple as arguments to the function.',
        'starmap(f, [(a,b), (c,d)]) calls f(a,b) then f(c,d).',
        'Use a lambda that takes w and h and returns w * h.',
      ],
      concepts: ['starmap', 'argument unpacking'],
    },
    {
      id: 'py-it-18',
      title: 'Write compress selector',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Use compress to filter elements based on a boolean mask.',
      skeleton: `from itertools import compress

def select_by_mask(data, mask):
    # Return elements where mask is True
    pass

names = ["Alice", "Bob", "Charlie", "Diana"]
active = [True, False, True, False]
print(select_by_mask(names, active))  # ['Alice', 'Charlie']`,
      solution: `from itertools import compress

def select_by_mask(data, mask):
    return list(compress(data, mask))

names = ["Alice", "Bob", "Charlie", "Diana"]
active = [True, False, True, False]
print(select_by_mask(names, active))  # ['Alice', 'Charlie']`,
      hints: [
        'compress filters data where the corresponding selector is truthy.',
        'compress(data, selectors) is like a parallel filter.',
        'Return list(compress(data, mask)).',
      ],
      concepts: ['compress', 'boolean mask', 'parallel filter'],
    },
    {
      id: 'py-it-19',
      title: 'Refactor nested loops to product',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Refactor the nested for loops into a single itertools.product call.',
      skeleton: `results = []
for x in range(3):
    for y in range(3):
        for z in range(3):
            results.append((x, y, z))

print(len(results))
print(results[:3])`,
      solution: `from itertools import product

results = list(product(range(3), range(3), range(3)))

print(len(results))
print(results[:3])`,
      hints: [
        'Nested loops over multiple ranges produce a Cartesian product.',
        'product(range(3), range(3), range(3)) replaces the nesting.',
        'Or use product(range(3), repeat=3) for identical ranges.',
      ],
      concepts: ['product', 'refactoring nested loops'],
    },
    {
      id: 'py-it-20',
      title: 'Refactor manual accumulation to accumulate',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the manual running total loop to use itertools.accumulate.',
      skeleton: `prices = [10, 20, 30, 40, 50]
running_totals = []
total = 0
for price in prices:
    total += price
    running_totals.append(total)

print(running_totals)`,
      solution: `from itertools import accumulate

prices = [10, 20, 30, 40, 50]
running_totals = list(accumulate(prices))

print(running_totals)`,
      hints: [
        'accumulate computes running totals by default.',
        'It replaces the manual loop with total += price.',
        'list(accumulate(prices)) gives [10, 30, 60, 100, 150].',
      ],
      concepts: ['accumulate', 'refactoring', 'running total'],
    },
  ],
};
