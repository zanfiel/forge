import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-functools',
  title: '32. Functools',
  explanation: `## Functools

The \\\`functools\\\` module provides higher-order functions and operations on callable objects.

### Caching
- **\\\`@lru_cache\\\`** -- memoizes function results with an LRU eviction policy
- **\\\`@cache\\\`** (3.9+) -- unbounded cache (same as lru_cache with no maxsize)
- **\\\`@cached_property\\\`** -- caches a property value after first access

### Partial Application
- **\\\`partial(func, *args, **kwargs)\\\`** -- freezes some arguments, creating a new callable
- **\\\`partialmethod\\\`** -- same but for class methods

### Reduction
- **\\\`reduce(func, iterable, initial)\\\`** -- applies a two-argument function cumulatively

### Decoration Helpers
- **\\\`@wraps(func)\\\`** -- preserves the wrapped function's metadata
- **\\\`update_wrapper\\\`** -- lower-level version of wraps

### Comparison Helpers
- **\\\`@total_ordering\\\`** -- generate all comparison methods from \\\`__eq__\\\` and one of \\\`__lt__\\\`/\\\`__gt__\\\`
- **\\\`cmp_to_key\\\`** -- converts old-style comparison functions to key functions

### Single Dispatch
- **\\\`@singledispatch\\\`** -- generic function dispatch based on first argument type
- **\\\`@singledispatchmethod\\\`** -- same for class methods
`,
  exercises: [
    {
      id: 'py-ft-1',
      title: 'lru_cache basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Apply lru_cache to memoize the fibonacci function.',
      skeleton: `from functools import __BLANK__

@__BLANK__
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(30))`,
      solution: `from functools import lru_cache

@lru_cache
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(30))`,
      hints: [
        'lru_cache memoizes function results to avoid recomputation.',
        'Without it, fib(30) would be extremely slow.',
        'The answer is: lru_cache',
      ],
      concepts: ['lru_cache', 'memoization', 'fibonacci'],
    },
    {
      id: 'py-ft-2',
      title: 'partial basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use partial to create a function that always multiplies by 2.',
      skeleton: `from functools import __BLANK__

def multiply(x, y):
    return x * y

double = __BLANK__(multiply, 2)
print(double(5))  # 10`,
      solution: `from functools import partial

def multiply(x, y):
    return x * y

double = partial(multiply, 2)
print(double(5))  # 10`,
      hints: [
        'partial freezes some arguments of a function.',
        'partial(multiply, 2) creates a new function with x=2.',
        'The answer is: partial',
      ],
      concepts: ['partial', 'partial application'],
    },
    {
      id: 'py-ft-3',
      title: 'wraps decorator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use @wraps to preserve the original function metadata in a decorator.',
      skeleton: `from functools import __BLANK__

def my_decorator(func):
    @__BLANK__(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet(name):
    """Greet someone."""
    return f"Hello, {name}!"

print(greet.__name__)  # "greet" not "wrapper"`,
      solution: `from functools import wraps

def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet(name):
    """Greet someone."""
    return f"Hello, {name}!"

print(greet.__name__)  # "greet" not "wrapper"`,
      hints: [
        '@wraps copies __name__, __doc__, etc. from the wrapped function.',
        'Without @wraps, greet.__name__ would be "wrapper".',
        'The answer is: wraps',
      ],
      concepts: ['wraps', 'decorator metadata'],
    },
    {
      id: 'py-ft-4',
      title: 'reduce',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use reduce to compute the product of all numbers in a list.',
      skeleton: `from functools import __BLANK__

numbers = [1, 2, 3, 4, 5]
product = __BLANK__(lambda a, b: a * b, numbers)
print(product)  # 120`,
      solution: `from functools import reduce

numbers = [1, 2, 3, 4, 5]
product = reduce(lambda a, b: a * b, numbers)
print(product)  # 120`,
      hints: [
        'reduce applies a two-argument function cumulatively.',
        'reduce(f, [a, b, c]) computes f(f(a, b), c).',
        'The answer is: reduce',
      ],
      concepts: ['reduce', 'cumulative application'],
    },
    {
      id: 'py-ft-5',
      title: 'total_ordering',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use @total_ordering to auto-generate comparison methods.',
      skeleton: `from functools import __BLANK__

@__BLANK__
class Version:
    def __init__(self, major, minor):
        self.major = major
        self.minor = minor

    def __eq__(self, other):
        return (self.major, self.minor) == (other.major, other.minor)

    def __lt__(self, other):
        return (self.major, self.minor) < (other.major, other.minor)

v1 = Version(1, 0)
v2 = Version(2, 0)
print(v1 <= v2)  # True`,
      solution: `from functools import total_ordering

@total_ordering
class Version:
    def __init__(self, major, minor):
        self.major = major
        self.minor = minor

    def __eq__(self, other):
        return (self.major, self.minor) == (other.major, other.minor)

    def __lt__(self, other):
        return (self.major, self.minor) < (other.major, other.minor)

v1 = Version(1, 0)
v2 = Version(2, 0)
print(v1 <= v2)  # True`,
      hints: [
        '@total_ordering generates __le__, __gt__, __ge__ from __eq__ and __lt__.',
        'You only need to define two comparison methods.',
        'The answer is: total_ordering',
      ],
      concepts: ['total_ordering', 'comparison methods'],
    },
    {
      id: 'py-ft-6',
      title: 'singledispatch',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use @singledispatch to create a generic function that handles different types.',
      skeleton: `from functools import __BLANK__

@__BLANK__
def format_value(value):
    return str(value)

@format_value.register(int)
def _(value):
    return f"Integer: {value}"

@format_value.register(list)
def _(value):
    return f"List with {len(value)} items"

print(format_value(42))
print(format_value([1, 2, 3]))`,
      solution: `from functools import singledispatch

@singledispatch
def format_value(value):
    return str(value)

@format_value.register(int)
def _(value):
    return f"Integer: {value}"

@format_value.register(list)
def _(value):
    return f"List with {len(value)} items"

print(format_value(42))
print(format_value([1, 2, 3]))`,
      hints: [
        '@singledispatch dispatches based on the type of the first argument.',
        'Register type-specific implementations with @func.register(type).',
        'The answer is: singledispatch',
      ],
      concepts: ['singledispatch', 'generic functions', 'dispatch'],
    },
    {
      id: 'py-ft-7',
      title: 'Predict lru_cache behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'How many times is the function actually called?',
      skeleton: `from functools import lru_cache

call_count = 0

@lru_cache(maxsize=None)
def square(n):
    global call_count
    call_count += 1
    return n * n

square(3)
square(4)
square(3)
square(4)
square(5)
print(call_count)`,
      solution: `3`,
      hints: [
        'lru_cache memoizes results, so repeat calls are cached.',
        'square(3) and square(4) are each computed once, then cached.',
        'Only 3, 4, and 5 trigger actual computation = 3 calls.',
      ],
      concepts: ['lru_cache', 'cache hits', 'memoization'],
    },
    {
      id: 'py-ft-8',
      title: 'Predict partial behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this partial application output?',
      skeleton: `from functools import partial

def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
cube = partial(power, exp=3)
print(square(5))
print(cube(3))`,
      solution: `25
27`,
      hints: [
        'partial(power, exp=2) creates a function where exp is always 2.',
        'square(5) computes 5**2 = 25.',
        'cube(3) computes 3**3 = 27.',
      ],
      concepts: ['partial', 'keyword arguments'],
    },
    {
      id: 'py-ft-9',
      title: 'Predict reduce behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does reduce produce with an initial value?',
      skeleton: `from functools import reduce

result = reduce(lambda acc, x: acc + [x * 2], [1, 2, 3], [])
print(result)`,
      solution: `[2, 4, 6]`,
      hints: [
        'The initial value is an empty list [].',
        'Each step appends x * 2 to the accumulator.',
        'The output is [2, 4, 6].',
      ],
      concepts: ['reduce', 'initial value', 'accumulator'],
    },
    {
      id: 'py-ft-10',
      title: 'Fix missing wraps',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Fix the decorator that loses the original function name and docstring.',
      skeleton: `def timer(func):
    # Bug: missing @wraps, so metadata is lost
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@timer
def process():
    """Process data."""
    return "done"

print(process.__name__)  # Should print "process", prints "wrapper"`,
      solution: `from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@timer
def process():
    """Process data."""
    return "done"

print(process.__name__)  # Correctly prints "process"`,
      hints: [
        'Without @wraps, the wrapper replaces the function metadata.',
        'Import wraps from functools and apply it to wrapper.',
        'Add @wraps(func) above the def wrapper line.',
      ],
      concepts: ['wraps', 'decorator metadata', 'common bug'],
    },
    {
      id: 'py-ft-11',
      title: 'Fix lru_cache with mutable args',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the function that fails because lru_cache requires hashable arguments.',
      skeleton: `from functools import lru_cache

# Bug: lists are not hashable, so lru_cache raises TypeError
@lru_cache
def sum_items(items):
    return sum(items)

print(sum_items([1, 2, 3]))`,
      solution: `from functools import lru_cache

@lru_cache
def sum_items(items):
    return sum(items)

# Fixed: convert list to tuple (hashable) before calling
print(sum_items((1, 2, 3)))`,
      hints: [
        'lru_cache requires all arguments to be hashable.',
        'Lists are not hashable, but tuples are.',
        'Convert the list to a tuple before passing it.',
      ],
      concepts: ['lru_cache', 'hashable arguments', 'tuple conversion'],
    },
    {
      id: 'py-ft-12',
      title: 'Fix singledispatch registration',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the singledispatch that does not match bool correctly.',
      skeleton: `from functools import singledispatch

@singledispatch
def describe(value):
    return f"Unknown: {value}"

@describe.register(int)
def _(value):
    return f"Integer: {value}"

@describe.register(bool)
def _(value):
    return f"Boolean: {value}"

# Bug: bool is a subclass of int, so registration order matters
print(describe(True))  # Should print "Boolean: True"`,
      solution: `from functools import singledispatch

@singledispatch
def describe(value):
    return f"Unknown: {value}"

# Fixed: register bool BEFORE int since bool is a subclass of int
@describe.register(bool)
def _(value):
    return f"Boolean: {value}"

@describe.register(int)
def _(value):
    return f"Integer: {value}"

print(describe(True))  # Correctly prints "Boolean: True"`,
      hints: [
        'bool is a subclass of int in Python.',
        'singledispatch checks the MRO, so register more specific types first.',
        'Move the bool registration before the int registration.',
      ],
      concepts: ['singledispatch', 'bool subclass of int', 'MRO'],
    },
    {
      id: 'py-ft-13',
      title: 'Write cached_property',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a class that uses cached_property for an expensive computed value.',
      skeleton: `from functools import cached_property

class DataAnalyzer:
    def __init__(self, data):
        self.data = data

    # Write a cached_property that computes the mean
    # It should only compute once, even if accessed multiple times

analyzer = DataAnalyzer([10, 20, 30, 40, 50])
print(analyzer.mean)  # 30.0
print(analyzer.mean)  # 30.0 (cached, not recomputed)`,
      solution: `from functools import cached_property

class DataAnalyzer:
    def __init__(self, data):
        self.data = data

    @cached_property
    def mean(self):
        print("Computing mean...")
        return sum(self.data) / len(self.data)

analyzer = DataAnalyzer([10, 20, 30, 40, 50])
print(analyzer.mean)  # 30.0
print(analyzer.mean)  # 30.0 (cached, not recomputed)`,
      hints: [
        '@cached_property computes on first access and caches the result.',
        'It replaces itself with the computed value on the instance.',
        'Define mean as a @cached_property method.',
      ],
      concepts: ['cached_property', 'lazy computation'],
    },
    {
      id: 'py-ft-14',
      title: 'Write partial for config',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use partial to create pre-configured logging functions.',
      skeleton: `from functools import partial

def log(level, message, timestamp=True):
    prefix = f"[{level}]"
    if timestamp:
        prefix = "2025-01-01 " + prefix
    return f"{prefix} {message}"

# Create info, warning, error functions using partial

print(info("Server started"))
print(error("Connection failed"))`,
      solution: `from functools import partial

def log(level, message, timestamp=True):
    prefix = f"[{level}]"
    if timestamp:
        prefix = "2025-01-01 " + prefix
    return f"{prefix} {message}"

info = partial(log, "INFO")
warning = partial(log, "WARNING")
error = partial(log, "ERROR")

print(info("Server started"))
print(error("Connection failed"))`,
      hints: [
        'partial freezes the level argument for each log function.',
        'info = partial(log, "INFO") creates a function with level="INFO".',
        'Each partial creates a specialized version of log.',
      ],
      concepts: ['partial', 'configuration', 'factory pattern'],
    },
    {
      id: 'py-ft-15',
      title: 'Write singledispatch processor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a singledispatch function that serializes different types to strings.',
      skeleton: `from functools import singledispatch

# Write a serialize function that handles:
# str -> quoted string, int -> "int:N", list -> comma-joined, dict -> "key=value" pairs

print(serialize("hello"))       # '"hello"'
print(serialize(42))            # "int:42"
print(serialize([1, 2, 3]))    # "1,2,3"
print(serialize({"a": 1}))     # "a=1"`,
      solution: `from functools import singledispatch

@singledispatch
def serialize(value) -> str:
    return str(value)

@serialize.register(str)
def _(value) -> str:
    return f'"{value}"'

@serialize.register(int)
def _(value) -> str:
    return f"int:{value}"

@serialize.register(list)
def _(value) -> str:
    return ",".join(str(v) for v in value)

@serialize.register(dict)
def _(value) -> str:
    return ",".join(f"{k}={v}" for k, v in value.items())

print(serialize("hello"))       # '"hello"'
print(serialize(42))            # "int:42"
print(serialize([1, 2, 3]))    # "1,2,3"
print(serialize({"a": 1}))     # "a=1"`,
      hints: [
        'Register each type with @serialize.register(type).',
        'The base function handles unregistered types.',
        'Each registered function handles one specific type.',
      ],
      concepts: ['singledispatch', 'serialization', 'type dispatch'],
    },
    {
      id: 'py-ft-16',
      title: 'Write cmp_to_key usage',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Use cmp_to_key to sort strings by length first, then alphabetically.',
      skeleton: `from functools import cmp_to_key

def compare(a, b):
    # Sort by length first, then alphabetically
    pass

words = ["banana", "fig", "apple", "date", "kiwi"]
sorted_words = sorted(words, key=cmp_to_key(compare))
print(sorted_words)`,
      solution: `from functools import cmp_to_key

def compare(a, b):
    if len(a) != len(b):
        return len(a) - len(b)
    if a < b:
        return -1
    if a > b:
        return 1
    return 0

words = ["banana", "fig", "apple", "date", "kiwi"]
sorted_words = sorted(words, key=cmp_to_key(compare))
print(sorted_words)`,
      hints: [
        'cmp_to_key converts a comparison function to a key function.',
        'Comparison function returns negative, zero, or positive.',
        'First compare lengths, then compare strings alphabetically.',
      ],
      concepts: ['cmp_to_key', 'comparison function', 'sorting'],
    },
    {
      id: 'py-ft-17',
      title: 'Write lru_cache with maxsize',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function with a bounded cache and demonstrate cache statistics.',
      skeleton: `from functools import lru_cache

# Write an expensive_compute function with maxsize=3
# Call it with various arguments and print cache_info()

print(expensive_compute(1))
print(expensive_compute(2))
print(expensive_compute(3))
print(expensive_compute(1))  # cache hit
print(expensive_compute(4))  # evicts oldest
print(expensive_compute.cache_info())`,
      solution: `from functools import lru_cache

@lru_cache(maxsize=3)
def expensive_compute(n):
    return n ** 2

print(expensive_compute(1))
print(expensive_compute(2))
print(expensive_compute(3))
print(expensive_compute(1))  # cache hit
print(expensive_compute(4))  # evicts oldest
print(expensive_compute.cache_info())`,
      hints: [
        'lru_cache(maxsize=3) keeps at most 3 recent results.',
        '.cache_info() shows hits, misses, maxsize, and currsize.',
        'When the cache is full, the least recently used entry is evicted.',
      ],
      concepts: ['lru_cache maxsize', 'cache_info', 'eviction'],
    },
    {
      id: 'py-ft-18',
      title: 'Write a reduce pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Use reduce to compose a pipeline of transformation functions.',
      skeleton: `from functools import reduce

def pipeline(value, functions):
    # Apply each function in sequence to the value
    pass

result = pipeline(
    "  Hello, World!  ",
    [str.strip, str.lower, lambda s: s.replace(",", "")]
)
print(result)  # "hello world!"`,
      solution: `from functools import reduce

def pipeline(value, functions):
    return reduce(lambda v, f: f(v), functions, value)

result = pipeline(
    "  Hello, World!  ",
    [str.strip, str.lower, lambda s: s.replace(",", "")]
)
print(result)  # "hello world!"`,
      hints: [
        'reduce applies each function to the accumulated value.',
        'The initial value is the input, each function transforms it.',
        'reduce(lambda v, f: f(v), functions, value) chains the calls.',
      ],
      concepts: ['reduce', 'function composition', 'pipeline'],
    },
    {
      id: 'py-ft-19',
      title: 'Refactor manual cache to lru_cache',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Replace the manual caching dictionary with @lru_cache.',
      skeleton: `_cache = {}

def expensive(n):
    if n in _cache:
        return _cache[n]
    result = sum(i * i for i in range(n))
    _cache[n] = result
    return result

print(expensive(1000))
print(expensive(1000))  # cached`,
      solution: `from functools import lru_cache

@lru_cache(maxsize=None)
def expensive(n):
    return sum(i * i for i in range(n))

print(expensive(1000))
print(expensive(1000))  # cached`,
      hints: [
        '@lru_cache replaces manual cache dictionary patterns.',
        'maxsize=None means unbounded cache.',
        'Remove the _cache dict and the if/else caching logic.',
      ],
      concepts: ['refactoring', 'lru_cache', 'manual cache elimination'],
    },
    {
      id: 'py-ft-20',
      title: 'Refactor if/elif dispatch to singledispatch',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the isinstance chain into singledispatch.',
      skeleton: `def process(data):
    if isinstance(data, str):
        return data.upper()
    elif isinstance(data, int):
        return data * 2
    elif isinstance(data, list):
        return [process(item) for item in data]
    else:
        return str(data)

print(process("hello"))
print(process(21))
print(process([1, "hi"]))`,
      solution: `from functools import singledispatch

@singledispatch
def process(data):
    return str(data)

@process.register(str)
def _(data):
    return data.upper()

@process.register(int)
def _(data):
    return data * 2

@process.register(list)
def _(data):
    return [process(item) for item in data]

print(process("hello"))
print(process(21))
print(process([1, "hi"]))`,
      hints: [
        'Each isinstance branch becomes a registered handler.',
        'The else branch becomes the base @singledispatch function.',
        'This is more extensible -- new types can register without modifying process.',
      ],
      concepts: ['singledispatch', 'refactoring', 'open/closed principle'],
    },
  ],
};
