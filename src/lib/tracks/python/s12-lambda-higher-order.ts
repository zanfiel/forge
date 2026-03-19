import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-lambda',
  title: '12. Lambda & Higher-Order Functions',
  explanation: `## Lambda & Higher-Order Functions

### Lambda Expressions
Anonymous, single-expression functions: \\\`lambda x: x * 2\\\`

Lambdas are limited to a single expression (no statements, no assignments).

### Higher-Order Functions
Functions that take other functions as arguments or return them.

### Built-in Higher-Order Functions
- \\\`map(f, iterable)\\\` -- apply f to every element
- \\\`filter(f, iterable)\\\` -- keep elements where f returns truthy
- \\\`sorted(iterable, key=f)\\\` -- sort by key function
- \\\`min()\\\`/\\\`max()\\\` with \\\`key=\\\` parameter

### functools Module
- \\\`functools.reduce(f, iterable)\\\` -- cumulative fold
- \\\`functools.partial(f, arg)\\\` -- fix some arguments

### operator Module
Pre-built functions for common operators: \\\`operator.add\\\`, \\\`operator.itemgetter\\\`, etc.
`,
  exercises: [
    {
      id: 'py-lam-1',
      title: 'Basic Lambda',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a lambda that doubles its input.',
      skeleton: `double = __BLANK__
print(double(5))  # 10`,
      solution: `double = lambda x: x * 2
print(double(5))  # 10`,
      hints: [
        'Lambda syntax: lambda parameters: expression.',
        'lambda x: x * 2 creates a doubling function.',
        'The answer is: lambda x: x * 2',
      ],
      concepts: ['lambda', 'anonymous function'],
    },
    {
      id: 'py-lam-2',
      title: 'Lambda with Multiple Args',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a lambda that adds two numbers.',
      skeleton: `add = __BLANK__
print(add(3, 4))  # 7`,
      solution: `add = lambda x, y: x + y
print(add(3, 4))  # 7`,
      hints: [
        'Lambda can take multiple parameters.',
        'Separate parameters with commas.',
        'The answer is: lambda x, y: x + y',
      ],
      concepts: ['lambda', 'multiple parameters'],
    },
    {
      id: 'py-lam-3',
      title: 'map() Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use map() to square each number in the list.',
      skeleton: `numbers = [1, 2, 3, 4]
squared = list(__BLANK__(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16]`,
      solution: `numbers = [1, 2, 3, 4]
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16]`,
      hints: [
        'map() applies a function to every element.',
        'It returns a map object; wrap in list().',
        'The answer is: map',
      ],
      concepts: ['map()', 'lambda'],
    },
    {
      id: 'py-lam-4',
      title: 'filter() Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use filter() to keep only even numbers.',
      skeleton: `numbers = [1, 2, 3, 4, 5, 6]
evens = list(__BLANK__(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6]`,
      solution: `numbers = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6]`,
      hints: [
        'filter() keeps elements where the function returns True.',
        'It returns a filter object; wrap in list().',
        'The answer is: filter',
      ],
      concepts: ['filter()', 'lambda'],
    },
    {
      id: 'py-lam-5',
      title: 'sorted() with key',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Sort the list of tuples by the second element.',
      skeleton: `pairs = [(1, "c"), (3, "a"), (2, "b")]
result = sorted(pairs, key=__BLANK__)
print(result)  # [(3, 'a'), (2, 'b'), (1, 'c')]`,
      solution: `pairs = [(1, "c"), (3, "a"), (2, "b")]
result = sorted(pairs, key=lambda x: x[1])
print(result)  # [(3, 'a'), (2, 'b'), (1, 'c')]`,
      hints: [
        'The key function extracts the comparison value.',
        'x[1] gets the second element of each tuple.',
        'The answer is: lambda x: x[1]',
      ],
      concepts: ['sorted()', 'key function', 'lambda'],
    },
    {
      id: 'py-lam-6',
      title: 'min() with key',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Find the shortest string in the list.',
      skeleton: `words = ["banana", "fig", "cherry", "date"]
shortest = min(words, key=__BLANK__)
print(shortest)  # fig`,
      solution: `words = ["banana", "fig", "cherry", "date"]
shortest = min(words, key=len)
print(shortest)  # fig`,
      hints: [
        'min() with key compares by the key function result.',
        'len returns the length of each string.',
        'The answer is: len',
      ],
      concepts: ['min()', 'key function'],
    },
    {
      id: 'py-lam-7',
      title: 'Write apply_to_all Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function apply_to_all(f, items) that returns a list of f applied to each item.',
      skeleton: `def apply_to_all(f, items):
    # Apply f to each item
    pass`,
      solution: `def apply_to_all(f, items):
    return [f(item) for item in items]`,
      hints: [
        'Use a list comprehension.',
        'Call f(item) for each item.',
        '[f(item) for item in items]',
      ],
      concepts: ['higher-order function', 'list comprehension'],
    },
    {
      id: 'py-lam-8',
      title: 'Write reduce to compute product',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function product(numbers) that uses functools.reduce to compute the product of all numbers.',
      skeleton: `from functools import reduce

def product(numbers):
    # Compute product using reduce
    pass`,
      solution: `from functools import reduce

def product(numbers):
    return reduce(lambda x, y: x * y, numbers)`,
      hints: [
        'reduce() applies a function cumulatively.',
        'reduce(lambda x, y: x * y, [1,2,3]) gives 1*2*3.',
        'Import reduce from functools.',
      ],
      concepts: ['reduce()', 'lambda', 'functools'],
    },
    {
      id: 'py-lam-9',
      title: 'Predict map() Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `result = list(map(len, ["hi", "hello", "hey"]))
print(result)`,
      solution: `[2, 5, 3]`,
      hints: [
        'map() applies len to each string.',
        'len("hi")=2, len("hello")=5, len("hey")=3.',
        'The result is [2, 5, 3].',
      ],
      concepts: ['map()', 'len()'],
    },
    {
      id: 'py-lam-10',
      title: 'Write partial_apply Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function using functools.partial to create a function that always adds 10.',
      skeleton: `from functools import partial

def add(a, b):
    return a + b

# Create add_ten using partial
add_ten = None  # Fix this`,
      solution: `from functools import partial

def add(a, b):
    return a + b

add_ten = partial(add, 10)`,
      hints: [
        'partial() fixes some arguments of a function.',
        'partial(add, 10) creates a function that adds 10 to its argument.',
        'The first argument is frozen to 10.',
      ],
      concepts: ['functools.partial', 'partial application'],
    },
    {
      id: 'py-lam-11',
      title: 'Predict filter() Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `result = list(filter(None, [0, 1, "", "hi", [], [1], None, True]))
print(result)`,
      solution: `[1, 'hi', [1], True]`,
      hints: [
        'filter(None, ...) filters by truthiness.',
        'Falsy values are removed: 0, "", [], None.',
        'Truthy values remain: 1, "hi", [1], True.',
      ],
      concepts: ['filter()', 'truthiness'],
    },
    {
      id: 'py-lam-12',
      title: 'Fix the Bug: Lambda Scope',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the lambda so each one captures a different multiplier.',
      skeleton: `multipliers = []
for n in [2, 3, 4]:
    multipliers.append(lambda x: x * n)

print(multipliers[0](10))  # Should print 20, not 40`,
      solution: `multipliers = []
for n in [2, 3, 4]:
    multipliers.append(lambda x, n=n: x * n)

print(multipliers[0](10))  # Should print 20, not 40`,
      hints: [
        'Lambda captures n by reference, not value.',
        'Use a default argument n=n to capture the current value.',
        'This is the standard late-binding fix.',
      ],
      concepts: ['lambda', 'late binding', 'default argument'],
    },
    {
      id: 'py-lam-13',
      title: 'Write compose Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function compose(*funcs) that returns a function applying all functions right to left: compose(f, g, h)(x) = f(g(h(x))).',
      skeleton: `from functools import reduce

def compose(*funcs):
    # Compose multiple functions right to left
    pass`,
      solution: `from functools import reduce

def compose(*funcs):
    return reduce(lambda f, g: lambda x: f(g(x)), funcs)`,
      hints: [
        'Use reduce to combine functions.',
        'Each step wraps: lambda x: f(g(x)).',
        'The rightmost function is applied first.',
      ],
      concepts: ['function composition', 'reduce()', 'lambda'],
    },
    {
      id: 'py-lam-14',
      title: 'Fix the Bug: map Returns Iterator',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code so it prints the mapped values twice.',
      skeleton: `mapped = map(str.upper, ["hello", "world"])
print(list(mapped))  # ['HELLO', 'WORLD']
print(list(mapped))  # Should also print ['HELLO', 'WORLD']`,
      solution: `mapped = list(map(str.upper, ["hello", "world"]))
print(mapped)  # ['HELLO', 'WORLD']
print(mapped)  # ['HELLO', 'WORLD']`,
      hints: [
        'map() returns an iterator that is exhausted after one pass.',
        'Convert to a list to make it reusable.',
        'Assign list(map(...)) to the variable.',
      ],
      concepts: ['iterator exhaustion', 'map()'],
    },
    {
      id: 'py-lam-15',
      title: 'Write sort_by_multiple_keys Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function sort_students(students) that sorts a list of (name, grade) tuples by grade descending, then name ascending.',
      skeleton: `def sort_students(students):
    # Sort by grade desc, then name asc
    pass`,
      solution: `def sort_students(students):
    return sorted(students, key=lambda s: (-s[1], s[0]))`,
      hints: [
        'Use a tuple key for multi-level sorting.',
        'Negate the grade for descending order.',
        'key=lambda s: (-s[1], s[0])',
      ],
      concepts: ['sorted()', 'multi-key sort', 'lambda'],
    },
    {
      id: 'py-lam-16',
      title: 'Predict Lambda Identity',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `f = lambda x: x
g = lambda x: x
print(f == g)`,
      solution: `False`,
      hints: [
        'Each lambda creates a distinct function object.',
        'Function objects are compared by identity, not behavior.',
        'Two lambdas with identical bodies are still different objects.',
      ],
      concepts: ['function identity', 'lambda', '== vs is'],
    },
    {
      id: 'py-lam-17',
      title: 'Write curried_add Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a curried function curried_add(a)(b)(c) that returns a + b + c.',
      skeleton: `def curried_add(a):
    # Return nested functions for currying
    pass`,
      solution: `def curried_add(a):
    def add_b(b):
        def add_c(c):
            return a + b + c
        return add_c
    return add_b`,
      hints: [
        'Currying transforms f(a,b,c) into f(a)(b)(c).',
        'Each level returns a function taking the next argument.',
        'Use nested function definitions.',
      ],
      concepts: ['currying', 'nested closures'],
    },
    {
      id: 'py-lam-18',
      title: 'Fix the Bug: reduce Initial Value',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the code so it works with an empty list.',
      skeleton: `from functools import reduce

def total(numbers):
    return reduce(lambda x, y: x + y, numbers)

print(total([]))  # Should print 0, not raise TypeError`,
      solution: `from functools import reduce

def total(numbers):
    return reduce(lambda x, y: x + y, numbers, 0)

print(total([]))  # Should print 0`,
      hints: [
        'reduce() raises TypeError on empty sequences without an initial value.',
        'Pass 0 as the third argument (initial value).',
        'reduce(f, iterable, initial)',
      ],
      concepts: ['reduce()', 'initial value', 'edge case'],
    },
    {
      id: 'py-lam-19',
      title: 'Refactor to map/filter',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the loop to use map() and filter().',
      skeleton: `def get_upper_long_words(words):
    result = []
    for w in words:
        if len(w) > 3:
            result.append(w.upper())
    return result`,
      solution: `def get_upper_long_words(words):
    return list(map(str.upper, filter(lambda w: len(w) > 3, words)))`,
      hints: [
        'Use filter() to select long words.',
        'Use map() to convert to uppercase.',
        'Chain them: map(str.upper, filter(...))',
      ],
      concepts: ['map()', 'filter()', 'refactoring'],
    },
    {
      id: 'py-lam-20',
      title: 'Refactor to operator Module',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the lambda to use operator.itemgetter.',
      skeleton: `from operator import itemgetter

data = [{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]
result = sorted(data, key=lambda x: x["age"])
print(result)`,
      solution: `from operator import itemgetter

data = [{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]
result = sorted(data, key=itemgetter("age"))
print(result)`,
      hints: [
        'operator.itemgetter("age") creates a function that gets the "age" key.',
        'It is more readable and slightly faster than a lambda.',
        'Replace the lambda with itemgetter("age").',
      ],
      concepts: ['operator.itemgetter', 'refactoring'],
    },
  ],
};
