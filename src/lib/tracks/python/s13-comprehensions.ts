import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-comprehensions',
  title: '13. Comprehensions',
  explanation: `## Comprehensions

Comprehensions provide concise syntax for creating lists, dicts, sets, and generators.

### List Comprehension
\\\`[expr for item in iterable if condition]\\\`

### Dict Comprehension
\\\`{key: value for item in iterable if condition}\\\`

### Set Comprehension
\\\`{expr for item in iterable if condition}\\\`

### Generator Expression
\\\`(expr for item in iterable if condition)\\\` -- lazy evaluation, no list in memory.

### Nested Comprehensions
\\\`[expr for x in xs for y in ys]\\\` -- equivalent to nested for loops.

### When to Use
- Use comprehensions for simple transformations.
- Switch to regular loops when logic is complex.
- Generator expressions for large data sets.
`,
  exercises: [
    {
      id: 'py-comp-1',
      title: 'Basic List Comprehension',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a list of squares from 1 to 5 using a list comprehension.',
      skeleton: `squares = [__BLANK__ for n in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]`,
      solution: `squares = [n**2 for n in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]`,
      hints: [
        'The expression goes before the for keyword.',
        'n**2 squares each number.',
        'The answer is: n**2',
      ],
      concepts: ['list comprehension'],
    },
    {
      id: 'py-comp-2',
      title: 'Comprehension with Filter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a list of even numbers from 1 to 10 using a comprehension.',
      skeleton: `evens = [n for n in range(1, 11) __BLANK__]
print(evens)  # [2, 4, 6, 8, 10]`,
      solution: `evens = [n for n in range(1, 11) if n % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10]`,
      hints: [
        'Add an if clause at the end to filter.',
        'Check if n is even with n % 2 == 0.',
        'The answer is: if n % 2 == 0',
      ],
      concepts: ['conditional comprehension', 'filtering'],
    },
    {
      id: 'py-comp-3',
      title: 'Dict Comprehension',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a dict mapping words to their lengths.',
      skeleton: `words = ["hello", "world", "python"]
lengths = {__BLANK__ for w in words}
print(lengths)`,
      solution: `words = ["hello", "world", "python"]
lengths = {w: len(w) for w in words}
print(lengths)`,
      hints: [
        'Dict comprehensions use key: value syntax.',
        'w is the key, len(w) is the value.',
        'The answer is: w: len(w)',
      ],
      concepts: ['dict comprehension'],
    },
    {
      id: 'py-comp-4',
      title: 'Set Comprehension',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a set of first characters from the words list.',
      skeleton: `words = ["apple", "avocado", "banana", "blueberry"]
first_chars = __BLANK__
print(sorted(first_chars))  # ['a', 'b']`,
      solution: `words = ["apple", "avocado", "banana", "blueberry"]
first_chars = {w[0] for w in words}
print(sorted(first_chars))  # ['a', 'b']`,
      hints: [
        'Set comprehensions use curly braces with single values.',
        'w[0] gets the first character.',
        'The answer is: {w[0] for w in words}',
      ],
      concepts: ['set comprehension'],
    },
    {
      id: 'py-comp-5',
      title: 'Generator Expression',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use a generator expression to sum squares without creating a list.',
      skeleton: `total = sum(__BLANK__ for n in range(1, 6))
print(total)  # 55`,
      solution: `total = sum(n**2 for n in range(1, 6))
print(total)  # 55`,
      hints: [
        'Generator expressions use parentheses (or rely on the function call).',
        'When passed directly to a function, extra parentheses are not needed.',
        'The answer is: n**2',
      ],
      concepts: ['generator expression', 'sum()'],
    },
    {
      id: 'py-comp-6',
      title: 'Nested Comprehension',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Flatten a 2D list using a nested comprehension.',
      skeleton: `matrix = [[1, 2], [3, 4], [5, 6]]
flat = [x __BLANK__]
print(flat)  # [1, 2, 3, 4, 5, 6]`,
      solution: `matrix = [[1, 2], [3, 4], [5, 6]]
flat = [x for row in matrix for x in row]
print(flat)  # [1, 2, 3, 4, 5, 6]`,
      hints: [
        'Nested for clauses go left to right (outer first).',
        'for row in matrix for x in row.',
        'The answer is: for row in matrix for x in row',
      ],
      concepts: ['nested comprehension', 'flatten'],
    },
    {
      id: 'py-comp-7',
      title: 'Write filter_and_transform Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function get_short_upper(words) that returns a list of uppercase words shorter than 5 characters.',
      skeleton: `def get_short_upper(words):
    # Return uppercase words shorter than 5 chars
    pass`,
      solution: `def get_short_upper(words):
    return [w.upper() for w in words if len(w) < 5]`,
      hints: [
        'Combine transformation and filtering in one comprehension.',
        'Expression: w.upper(), filter: if len(w) < 5.',
        'Transformation goes before for, filter goes after.',
      ],
      concepts: ['list comprehension', 'transform and filter'],
    },
    {
      id: 'py-comp-8',
      title: 'Write invert_dict with Comprehension',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function invert(d) that returns a dict with keys and values swapped using a dict comprehension.',
      skeleton: `def invert(d):
    # Swap keys and values
    pass`,
      solution: `def invert(d):
    return {v: k for k, v in d.items()}`,
      hints: [
        'Use items() to get key-value pairs.',
        'Swap them in the comprehension: v: k.',
        '{v: k for k, v in d.items()}',
      ],
      concepts: ['dict comprehension', 'inversion'],
    },
    {
      id: 'py-comp-9',
      title: 'Predict Comprehension Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `result = [x * y for x in [1, 2] for y in [10, 20]]
print(result)`,
      solution: `[10, 20, 20, 40]`,
      hints: [
        'Nested for loops in comprehensions go left to right.',
        'Outer: x=1 then x=2. Inner: y=10 then y=20.',
        '1*10, 1*20, 2*10, 2*20.',
      ],
      concepts: ['nested comprehension', 'cartesian product'],
    },
    {
      id: 'py-comp-10',
      title: 'Write matrix_from_comprehension Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function make_identity(n) that returns an n x n identity matrix using a nested comprehension.',
      skeleton: `def make_identity(n):
    # Return n x n identity matrix
    pass`,
      solution: `def make_identity(n):
    return [[1 if i == j else 0 for j in range(n)] for i in range(n)]`,
      hints: [
        'An identity matrix has 1s on the diagonal, 0s elsewhere.',
        'Use a conditional expression: 1 if i == j else 0.',
        'Outer comprehension for rows, inner for columns.',
      ],
      concepts: ['nested comprehension', 'conditional expression', 'matrix'],
    },
    {
      id: 'py-comp-11',
      title: 'Predict Generator vs List',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `gen = (x for x in range(3))
print(type(gen).__name__)`,
      solution: `generator`,
      hints: [
        'Parentheses create a generator expression, not a tuple.',
        'Generators are lazy iterators.',
        'The type name is "generator".',
      ],
      concepts: ['generator expression', 'lazy evaluation'],
    },
    {
      id: 'py-comp-12',
      title: 'Fix the Bug: Comprehension Side Effect',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the comprehension that tries to use assignment.',
      skeleton: `# Bug: Can't use assignment in comprehension
counts = {}
[counts[w] = counts.get(w, 0) + 1 for w in ["a", "b", "a"]]
print(counts)  # Should print {'a': 2, 'b': 1}`,
      solution: `counts = {}
for w in ["a", "b", "a"]:
    counts[w] = counts.get(w, 0) + 1
print(counts)  # Should print {'a': 2, 'b': 1}`,
      hints: [
        'Comprehensions cannot contain assignments (statements).',
        'Use a regular for loop for side effects.',
        'Or use collections.Counter for counting.',
      ],
      concepts: ['comprehension limitations', 'side effects'],
    },
    {
      id: 'py-comp-13',
      title: 'Write transpose with Comprehension',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function transpose(matrix) that transposes a 2D matrix using a comprehension.',
      skeleton: `def transpose(matrix):
    # Transpose using comprehension
    pass`,
      solution: `def transpose(matrix):
    return [[row[i] for row in matrix] for i in range(len(matrix[0]))]`,
      hints: [
        'For each column index, collect that element from every row.',
        'Outer: iterate column indices. Inner: iterate rows.',
        '[[row[i] for row in matrix] for i in range(cols)]',
      ],
      concepts: ['nested comprehension', 'transpose'],
    },
    {
      id: 'py-comp-14',
      title: 'Fix the Bug: Nested vs Flat',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the comprehension to produce a flat list, not a nested one.',
      skeleton: `matrix = [[1, 2], [3, 4], [5, 6]]
flat = [[x for x in row] for row in matrix]
print(flat)  # Should print [1, 2, 3, 4, 5, 6]`,
      solution: `matrix = [[1, 2], [3, 4], [5, 6]]
flat = [x for row in matrix for x in row]
print(flat)  # Should print [1, 2, 3, 4, 5, 6]`,
      hints: [
        'The current code creates a list of lists.',
        'For a flat list, use a single set of brackets.',
        'for row in matrix for x in row -- outer loop first.',
      ],
      concepts: ['flatten', 'nested comprehension'],
    },
    {
      id: 'py-comp-15',
      title: 'Write group_by_length Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function group_by_length(words) that returns a dict mapping lengths to lists of words using comprehensions.',
      skeleton: `def group_by_length(words):
    # Group words by their length
    pass`,
      solution: `def group_by_length(words):
    lengths = {len(w) for w in words}
    return {l: [w for w in words if len(w) == l] for l in lengths}`,
      hints: [
        'First, get unique lengths with a set comprehension.',
        'Then build the dict with a dict comprehension.',
        'Filter words by length in the inner list comprehension.',
      ],
      concepts: ['dict comprehension', 'set comprehension', 'grouping'],
    },
    {
      id: 'py-comp-16',
      title: 'Walrus in Comprehension',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `results = [y for x in range(5) if (y := x * 3) > 6]
print(results)`,
      solution: `[9, 12]`,
      hints: [
        'The walrus operator := assigns and returns a value.',
        'y is assigned x*3, then filtered by > 6.',
        'x=3 gives y=9, x=4 gives y=12. Both pass the filter.',
      ],
      concepts: ['walrus operator', 'comprehension'],
    },
    {
      id: 'py-comp-17',
      title: 'Write cartesian_product Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function cartesian_product(a, b) that returns all pairs as a list of tuples using a comprehension.',
      skeleton: `def cartesian_product(a, b):
    # Return list of (x, y) for all combinations
    pass`,
      solution: `def cartesian_product(a, b):
    return [(x, y) for x in a for y in b]`,
      hints: [
        'Nested for clauses create a cartesian product.',
        'Create tuples: (x, y) for x in a for y in b.',
        'Outer loop is a, inner loop is b.',
      ],
      concepts: ['cartesian product', 'nested comprehension'],
    },
    {
      id: 'py-comp-18',
      title: 'Fix the Bug: Comprehension Scope',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the code that expects the comprehension variable to be available after.',
      skeleton: `squares = [x**2 for x in range(5)]
print(x)  # Should print 4 (last value of x)`,
      solution: `for x in range(5):
    pass
squares = [x**2 for x in range(5)]
print(x)  # Now prints 4`,
      hints: [
        'In Python 3, comprehension variables have their own scope.',
        'x from the comprehension is not accessible outside it.',
        'Use a regular for loop if you need the variable after.',
      ],
      concepts: ['comprehension scope', 'variable leaking'],
    },
    {
      id: 'py-comp-19',
      title: 'Refactor Loop to Comprehension',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the loop to a dict comprehension.',
      skeleton: `def count_chars(s):
    result = {}
    for char in set(s):
        result[char] = s.count(char)
    return result`,
      solution: `def count_chars(s):
    return {char: s.count(char) for char in set(s)}`,
      hints: [
        'The loop builds a dict from set(s).',
        'Convert directly to a dict comprehension.',
        '{char: s.count(char) for char in set(s)}',
      ],
      concepts: ['dict comprehension', 'refactoring'],
    },
    {
      id: 'py-comp-20',
      title: 'Refactor Comprehension to Generator',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the list comprehension to a generator expression for memory efficiency.',
      skeleton: `def first_match(items, predicate):
    matches = [x for x in items if predicate(x)]
    if matches:
        return matches[0]
    return None`,
      solution: `def first_match(items, predicate):
    return next((x for x in items if predicate(x)), None)`,
      hints: [
        'A list comprehension processes ALL items even if you only need the first.',
        'next() with a generator expression stops at the first match.',
        'next(gen, default) returns the default if the generator is empty.',
      ],
      concepts: ['generator expression', 'next()', 'lazy evaluation'],
    },
  ],
};
