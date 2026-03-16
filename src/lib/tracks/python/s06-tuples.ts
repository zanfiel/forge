import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-tuples',
  title: '6. Tuples',
  explanation: `## Tuples

Tuples are immutable, ordered sequences. Once created, their elements cannot be changed.

### Creation
- Parentheses: \\\`(1, 2, 3)\\\` or just commas: \\\`1, 2, 3\\\`
- Single-element tuple: \\\`(42,)\\\` -- the trailing comma is required.
- \\\`tuple()\\\` constructor from any iterable.

### Unpacking
- \\\`a, b, c = (1, 2, 3)\\\`
- Extended: \\\`first, *rest = (1, 2, 3, 4)\\\`

### Named Tuples
\\\`collections.namedtuple\\\` creates tuple subclasses with named fields.

### Why Tuples?
- Immutable -- can be used as dict keys and set elements.
- Slightly more memory-efficient than lists.
- Signal intent: "this sequence should not change."

### Methods
Tuples only have \\\`count()\\\` and \\\`index()\\\`.
`,
  exercises: [
    {
      id: 'py-tup-1',
      title: 'Create a Tuple',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a tuple with the values 1, 2, 3.',
      skeleton: `t = __BLANK__
print(t)`,
      solution: `t = (1, 2, 3)
print(t)`,
      hints: [
        'Tuples use parentheses.',
        'Separate elements with commas.',
        'The answer is: (1, 2, 3)',
      ],
      concepts: ['tuple creation', 'tuple literal'],
    },
    {
      id: 'py-tup-2',
      title: 'Single-Element Tuple',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a single-element tuple containing just the number 42.',
      skeleton: `t = __BLANK__
print(type(t))  # <class 'tuple'>`,
      solution: `t = (42,)
print(type(t))  # <class 'tuple'>`,
      hints: [
        'A single-element tuple needs a trailing comma.',
        'Without the comma, (42) is just the integer 42.',
        'The answer is: (42,)',
      ],
      concepts: ['single-element tuple', 'trailing comma'],
    },
    {
      id: 'py-tup-3',
      title: 'Tuple Unpacking',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Unpack the tuple into three variables.',
      skeleton: `point = (10, 20, 30)
__BLANK__ = point
print(x, y, z)  # 10 20 30`,
      solution: `point = (10, 20, 30)
x, y, z = point
print(x, y, z)  # 10 20 30`,
      hints: [
        'Provide matching variable names separated by commas.',
        'The number of variables must match the tuple length.',
        'The answer is: x, y, z',
      ],
      concepts: ['tuple unpacking'],
    },
    {
      id: 'py-tup-4',
      title: 'Tuple Index',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Find the index of "banana" in the tuple.',
      skeleton: `fruits = ("apple", "banana", "cherry")
idx = fruits.__BLANK__("banana")
print(idx)  # 1`,
      solution: `fruits = ("apple", "banana", "cherry")
idx = fruits.index("banana")
print(idx)  # 1`,
      hints: [
        'Tuples have an index() method.',
        'It returns the position of the first occurrence.',
        'The answer is: index',
      ],
      concepts: ['tuple.index()', 'tuple methods'],
    },
    {
      id: 'py-tup-5',
      title: 'Tuple Count',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Count how many times 3 appears in the tuple.',
      skeleton: `numbers = (1, 3, 3, 3, 5)
result = numbers.__BLANK__(3)
print(result)  # 3`,
      solution: `numbers = (1, 3, 3, 3, 5)
result = numbers.count(3)
print(result)  # 3`,
      hints: [
        'Tuples have a count() method.',
        'It returns the number of occurrences.',
        'The answer is: count',
      ],
      concepts: ['tuple.count()', 'tuple methods'],
    },
    {
      id: 'py-tup-6',
      title: 'Tuple from List',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Convert a list to a tuple.',
      skeleton: `lst = [1, 2, 3]
t = __BLANK__(lst)
print(t)  # (1, 2, 3)`,
      solution: `lst = [1, 2, 3]
t = tuple(lst)
print(t)  # (1, 2, 3)`,
      hints: [
        'The tuple() constructor converts iterables to tuples.',
        'Pass the list as an argument.',
        'The answer is: tuple',
      ],
      concepts: ['tuple()', 'type conversion'],
    },
    {
      id: 'py-tup-7',
      title: 'Write named_point Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function that creates and returns a namedtuple Point with fields x, y. Return a Point(3, 4).',
      skeleton: `from collections import namedtuple

def named_point():
    # Create a Point namedtuple and return Point(3, 4)
    pass`,
      solution: `from collections import namedtuple

def named_point():
    Point = namedtuple("Point", ["x", "y"])
    return Point(3, 4)`,
      hints: [
        'namedtuple takes a name string and a list of field names.',
        'Point = namedtuple("Point", ["x", "y"])',
        'Return Point(3, 4).',
      ],
      concepts: ['namedtuple', 'collections'],
    },
    {
      id: 'py-tup-8',
      title: 'Write min_max Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function min_max(lst) that returns the minimum and maximum values as a tuple.',
      skeleton: `def min_max(lst):
    # Return (minimum, maximum) as a tuple
    pass`,
      solution: `def min_max(lst):
    return (min(lst), max(lst))`,
      hints: [
        'Use min() and max() built-in functions.',
        'Return them as a tuple.',
        'return (min(lst), max(lst))',
      ],
      concepts: ['min()', 'max()', 'tuple return'],
    },
    {
      id: 'py-tup-9',
      title: 'Predict Tuple Immutability',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does this code output? Write "Error" if it raises an exception.',
      skeleton: `t = (1, 2, 3)
t[0] = 10
print(t)`,
      solution: `Error`,
      hints: [
        'Tuples are immutable.',
        'You cannot assign to tuple indices.',
        'This raises a TypeError.',
      ],
      concepts: ['tuple immutability', 'TypeError'],
    },
    {
      id: 'py-tup-10',
      title: 'Write unzip Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function unzip(pairs) that takes a list of 2-tuples and returns two separate tuples. unzip([(1,"a"),(2,"b")]) returns ((1,2), ("a","b")).',
      skeleton: `def unzip(pairs):
    # Separate list of pairs into two tuples
    pass`,
      solution: `def unzip(pairs):
    if not pairs:
        return ((), ())
    keys, values = zip(*pairs)
    return (keys, values)`,
      hints: [
        'zip(*pairs) transposes a list of tuples.',
        'The * operator unpacks the list as arguments to zip.',
        'zip returns tuples, which is what we want.',
      ],
      concepts: ['zip()', 'unpacking operator *', 'transpose'],
    },
    {
      id: 'py-tup-11',
      title: 'Predict Tuple Comparison',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `print((1, 2, 3) < (1, 2, 4))`,
      solution: `True`,
      hints: [
        'Tuples are compared element by element.',
        'First elements are equal (1 == 1), second equal (2 == 2).',
        'Third element: 3 < 4, so the first tuple is less.',
      ],
      concepts: ['tuple comparison', 'lexicographic order'],
    },
    {
      id: 'py-tup-12',
      title: 'Fix the Bug: Not a Tuple',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code so that result is actually a tuple, not an integer.',
      skeleton: `def get_single():
    return (42)

result = get_single()
print(type(result).__name__)  # Should print: tuple`,
      solution: `def get_single():
    return (42,)

result = get_single()
print(type(result).__name__)  # Should print: tuple`,
      hints: [
        '(42) is just 42 in parentheses, not a tuple.',
        'A single-element tuple requires a trailing comma.',
        'Use (42,) to create a real tuple.',
      ],
      concepts: ['single-element tuple', 'trailing comma'],
    },
    {
      id: 'py-tup-13',
      title: 'Write group_by_first Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function group_by_first(pairs) that groups tuples by their first element into a dict of lists.',
      skeleton: `def group_by_first(pairs):
    # Group list of (key, value) tuples into {key: [values]}
    pass`,
      solution: `def group_by_first(pairs):
    groups = {}
    for key, value in pairs:
        groups.setdefault(key, []).append(value)
    return groups`,
      hints: [
        'Use dict.setdefault() to initialize missing keys.',
        'Unpack each tuple in the for loop.',
        'setdefault returns the existing list or creates a new one.',
      ],
      concepts: ['dict.setdefault()', 'grouping', 'tuple unpacking'],
    },
    {
      id: 'py-tup-14',
      title: 'Predict Nested Tuple Mutation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `t = (1, [2, 3], 4)
t[1].append(99)
print(t)`,
      solution: `(1, [2, 3, 99], 4)`,
      hints: [
        'Tuples are immutable, but their contents can be mutable.',
        'The list inside the tuple can still be modified.',
        't[1] is a list, and append() works on it.',
      ],
      concepts: ['tuple immutability', 'mutable contents'],
    },
    {
      id: 'py-tup-15',
      title: 'Fix the Bug: Tuple Concatenation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code to concatenate two tuples correctly.',
      skeleton: `a = (1, 2)
b = (3, 4)
a.extend(b)
print(a)  # Should print (1, 2, 3, 4)`,
      solution: `a = (1, 2)
b = (3, 4)
a = a + b
print(a)  # Should print (1, 2, 3, 4)`,
      hints: [
        'Tuples do not have an extend() method.',
        'Use the + operator to concatenate tuples.',
        'This creates a new tuple since tuples are immutable.',
      ],
      concepts: ['tuple concatenation', 'immutability'],
    },
    {
      id: 'py-tup-16',
      title: 'Write tuple_to_dict Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function tuple_to_dict(pairs) that converts a list of 2-tuples into a dictionary.',
      skeleton: `def tuple_to_dict(pairs):
    # Convert list of (key, value) tuples to dict
    pass`,
      solution: `def tuple_to_dict(pairs):
    return dict(pairs)`,
      hints: [
        'The dict() constructor accepts a list of key-value pairs.',
        'Each pair should be a 2-tuple (key, value).',
        'Just return dict(pairs).',
      ],
      concepts: ['dict()', 'tuple to dict'],
    },
    {
      id: 'py-tup-17',
      title: 'Write partition Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function partition(lst, predicate) that returns a tuple of two lists: (matches, non_matches).',
      skeleton: `def partition(lst, predicate):
    # Split list into (matches, non_matches)
    pass`,
      solution: `def partition(lst, predicate):
    matches = []
    non_matches = []
    for item in lst:
        if predicate(item):
            matches.append(item)
        else:
            non_matches.append(item)
    return (matches, non_matches)`,
      hints: [
        'Create two empty lists for matches and non-matches.',
        'Iterate and test each item with the predicate function.',
        'Return both lists as a tuple.',
      ],
      concepts: ['partitioning', 'predicate function', 'tuple return'],
    },
    {
      id: 'py-tup-18',
      title: 'Fix the Bug: Tuple as Dict Key',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the code so the coordinate can be used as a dictionary key.',
      skeleton: `coord = [3, 4]
locations = {coord: "park"}
print(locations)`,
      solution: `coord = (3, 4)
locations = {coord: "park"}
print(locations)`,
      hints: [
        'Lists are unhashable and cannot be used as dict keys.',
        'Tuples are immutable and hashable.',
        'Convert the list to a tuple.',
      ],
      concepts: ['hashable', 'dict keys', 'tuple vs list'],
    },
    {
      id: 'py-tup-19',
      title: 'Refactor to Named Tuple',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the plain tuple usage to use a namedtuple for clarity.',
      skeleton: `from collections import namedtuple

def get_user():
    return ("Alice", 30, "alice@example.com")

user = get_user()
print(f"Name: {user[0]}, Age: {user[1]}, Email: {user[2]}")`,
      solution: `from collections import namedtuple

User = namedtuple("User", ["name", "age", "email"])

def get_user():
    return User("Alice", 30, "alice@example.com")

user = get_user()
print(f"Name: {user.name}, Age: {user.age}, Email: {user.email}")`,
      hints: [
        'namedtuple adds named field access.',
        'Define User = namedtuple("User", [...fields...]).',
        'Access fields with dot notation: user.name.',
      ],
      concepts: ['namedtuple', 'refactoring', 'readability'],
    },
    {
      id: 'py-tup-20',
      title: 'Refactor Multiple Returns',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor to unpack the tuple return directly in the calling code.',
      skeleton: `def get_dimensions():
    return (1920, 1080)

dims = get_dimensions()
width = dims[0]
height = dims[1]
print(f"{width}x{height}")`,
      solution: `def get_dimensions():
    return (1920, 1080)

width, height = get_dimensions()
print(f"{width}x{height}")`,
      hints: [
        'Unpack the tuple directly in the assignment.',
        'width, height = get_dimensions()',
        'No need for an intermediate variable.',
      ],
      concepts: ['tuple unpacking', 'refactoring'],
    },
  ],
};
