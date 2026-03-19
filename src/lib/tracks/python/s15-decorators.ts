import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-decorators',
  title: '15. Decorators',
  explanation: `## Decorators

Decorators wrap a function (or class) with additional behavior. The \\\`@decorator\\\` syntax is syntactic sugar for \\\`func = decorator(func)\\\`.

### Basic Pattern
\\\`\\\`\\\`python
def my_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # before
        result = func(*args, **kwargs)
        # after
        return result
    return wrapper
\\\`\\\`\\\`

### functools.wraps
Always use \\\`@functools.wraps(func)\\\` to preserve the original function's metadata.

### Decorator with Arguments
Requires an extra layer of nesting (a decorator factory).

### Built-in Decorators
- \\\`@staticmethod\\\`, \\\`@classmethod\\\`, \\\`@property\\\`
- \\\`@functools.lru_cache\\\` for memoization
- \\\`@functools.wraps\\\` for metadata preservation

### Stacking Decorators
Multiple decorators are applied bottom-up.
`,
  exercises: [
    {
      id: 'py-dec-1',
      title: 'Basic Decorator Syntax',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Apply the shout decorator to the greet function.',
      skeleton: `def shout(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper

__BLANK__
def greet(name):
    return f"hello, {name}"

print(greet("alice"))  # HELLO, ALICE`,
      solution: `def shout(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper

@shout
def greet(name):
    return f"hello, {name}"

print(greet("alice"))  # HELLO, ALICE`,
      hints: [
        'The @ symbol applies a decorator.',
        'Place @decorator_name above the function definition.',
        'The answer is: @shout',
      ],
      concepts: ['decorator syntax', '@'],
    },
    {
      id: 'py-dec-2',
      title: 'functools.wraps',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Preserve the original function metadata using functools.wraps.',
      skeleton: `import functools

def my_decorator(func):
    __BLANK__
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet():
    """Say hello."""
    return "hello"

print(greet.__name__)  # greet`,
      solution: `import functools

def my_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet():
    """Say hello."""
    return "hello"

print(greet.__name__)  # greet`,
      hints: [
        'functools.wraps copies metadata from the original function.',
        'Apply it as a decorator on the wrapper function.',
        'The answer is: @functools.wraps(func)',
      ],
      concepts: ['functools.wraps', 'metadata preservation'],
    },
    {
      id: 'py-dec-3',
      title: 'Decorator with Arguments',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete the repeat decorator factory.',
      skeleton: `import functools

def repeat(__BLANK__):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello!")

say_hello()`,
      solution: `import functools

def repeat(n):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello!")

say_hello()`,
      hints: [
        'A decorator factory takes the decorator arguments.',
        'It returns the actual decorator.',
        'The answer is: n',
      ],
      concepts: ['decorator factory', 'parameterized decorator'],
    },
    {
      id: 'py-dec-4',
      title: '@staticmethod',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Make the utility method a static method.',
      skeleton: `class MathUtils:
    __BLANK__
    def add(a, b):
        return a + b

print(MathUtils.add(3, 4))  # 7`,
      solution: `class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b

print(MathUtils.add(3, 4))  # 7`,
      hints: [
        'Static methods do not receive self or cls.',
        'Use the @staticmethod decorator.',
        'The answer is: @staticmethod',
      ],
      concepts: ['@staticmethod'],
    },
    {
      id: 'py-dec-5',
      title: '@classmethod',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Make the from_string method a class method.',
      skeleton: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    __BLANK__
    def from_string(cls, s):
        name, age = s.split(",")
        return cls(name, int(age))

p = Person.from_string("Alice,30")
print(p.name)  # Alice`,
      solution: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def from_string(cls, s):
        name, age = s.split(",")
        return cls(name, int(age))

p = Person.from_string("Alice,30")
print(p.name)  # Alice`,
      hints: [
        'Class methods receive cls as the first argument.',
        'Use the @classmethod decorator.',
        'The answer is: @classmethod',
      ],
      concepts: ['@classmethod', 'alternative constructor'],
    },
    {
      id: 'py-dec-6',
      title: 'lru_cache',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Add caching to the expensive function.',
      skeleton: `import functools

__BLANK__
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(30))`,
      solution: `import functools

@functools.lru_cache
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(30))`,
      hints: [
        'lru_cache memoizes function results.',
        'Apply it as a decorator from functools.',
        'The answer is: @functools.lru_cache',
      ],
      concepts: ['functools.lru_cache', 'memoization'],
    },
    {
      id: 'py-dec-7',
      title: 'Write timer Decorator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a decorator timer(func) that prints how long the function took to execute.',
      skeleton: `import functools
import time

def timer(func):
    # Print execution time
    pass`,
      solution: `import functools
import time

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper`,
      hints: [
        'Record the time before and after calling func.',
        'Use time.perf_counter() for precision.',
        'Do not forget functools.wraps and returning the result.',
      ],
      concepts: ['decorator', 'timing', 'functools.wraps'],
    },
    {
      id: 'py-dec-8',
      title: 'Write debug Decorator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a decorator debug(func) that prints the function name, arguments, and return value.',
      skeleton: `import functools

def debug(func):
    # Print function calls and return values
    pass`,
      solution: `import functools

def debug(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        args_repr = [repr(a) for a in args]
        kwargs_repr = [f"{k}={v!r}" for k, v in kwargs.items()]
        signature = ", ".join(args_repr + kwargs_repr)
        print(f"Calling {func.__name__}({signature})")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result!r}")
        return result
    return wrapper`,
      hints: [
        'Build a string representation of the arguments.',
        'Print before calling and after getting the result.',
        'Use repr() for readable argument display.',
      ],
      concepts: ['decorator', 'debugging', 'repr()'],
    },
    {
      id: 'py-dec-9',
      title: 'Predict Decorator Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `def bold(func):
    def wrapper():
        return f"<b>{func()}</b>"
    return wrapper

def italic(func):
    def wrapper():
        return f"<i>{func()}</i>"
    return wrapper

@bold
@italic
def greet():
    return "hello"

print(greet())`,
      solution: `<b><i>hello</i></b>`,
      hints: [
        'Decorators are applied bottom-up.',
        '@italic is applied first, then @bold wraps the result.',
        'greet = bold(italic(greet))',
      ],
      concepts: ['decorator stacking', 'decorator order'],
    },
    {
      id: 'py-dec-10',
      title: 'Write retry Decorator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a decorator retry(max_attempts) that retries the function up to max_attempts times on exception.',
      skeleton: `import functools

def retry(max_attempts):
    # Decorator factory for retrying
    pass`,
      solution: `import functools

def retry(max_attempts):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exc = None
            for _ in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exc = e
            raise last_exc
        return wrapper
    return decorator`,
      hints: [
        'This is a decorator factory (takes arguments).',
        'Three levels of nesting: factory -> decorator -> wrapper.',
        'Store the last exception and raise it if all retries fail.',
      ],
      concepts: ['decorator factory', 'retry pattern'],
    },
    {
      id: 'py-dec-11',
      title: 'Predict functools.wraps',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `def decorator(func):
    def wrapper():
        return func()
    return wrapper

@decorator
def hello():
    """A greeting function."""
    return "hi"

print(hello.__name__)`,
      solution: `wrapper`,
      hints: [
        'Without functools.wraps, the wrapper replaces metadata.',
        'hello.__name__ returns "wrapper" instead of "hello".',
        'This is why functools.wraps is important.',
      ],
      concepts: ['functools.wraps', 'metadata loss'],
    },
    {
      id: 'py-dec-12',
      title: 'Fix the Bug: Missing wraps',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the decorator so the original function name and docstring are preserved.',
      skeleton: `def log_calls(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_calls
def process():
    """Process data."""
    return 42

print(process.__name__)  # Should print: process
print(process.__doc__)   # Should print: Process data.`,
      solution: `import functools

def log_calls(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_calls
def process():
    """Process data."""
    return 42

print(process.__name__)  # Should print: process
print(process.__doc__)   # Should print: Process data.`,
      hints: [
        'Add @functools.wraps(func) on the wrapper.',
        'Import functools at the top.',
        'This preserves __name__, __doc__, etc.',
      ],
      concepts: ['functools.wraps', 'metadata preservation'],
    },
    {
      id: 'py-dec-13',
      title: 'Write validate_types Decorator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a decorator validate_types(*types) that checks positional argument types at runtime.',
      skeleton: `import functools

def validate_types(*types):
    # Validate argument types
    pass`,
      solution: `import functools

def validate_types(*types):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for arg, expected in zip(args, types):
                if not isinstance(arg, expected):
                    raise TypeError(
                        f"Expected {expected.__name__}, got {type(arg).__name__}"
                    )
            return func(*args, **kwargs)
        return wrapper
    return decorator`,
      hints: [
        'Use zip() to pair arguments with expected types.',
        'Check each with isinstance().',
        'Raise TypeError on mismatch.',
      ],
      concepts: ['decorator factory', 'type validation'],
    },
    {
      id: 'py-dec-14',
      title: 'Fix the Bug: Decorator Forgets Return',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the decorator so it returns the function result.',
      skeleton: `import functools

def log(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        func(*args, **kwargs)
    return wrapper

@log
def add(a, b):
    return a + b

result = add(3, 4)
print(result)  # Should print 7, not None`,
      solution: `import functools

def log(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log
def add(a, b):
    return a + b

result = add(3, 4)
print(result)  # Should print 7`,
      hints: [
        'The wrapper calls func but does not return its value.',
        'Add return before func(*args, **kwargs).',
        'Without return, the wrapper returns None.',
      ],
      concepts: ['decorator', 'return value'],
    },
    {
      id: 'py-dec-15',
      title: 'Write singleton Decorator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a class decorator singleton(cls) that ensures only one instance of the class is ever created.',
      skeleton: `import functools

def singleton(cls):
    # Ensure only one instance
    pass`,
      solution: `import functools

def singleton(cls):
    instances = {}
    @functools.wraps(cls)
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance`,
      hints: [
        'Store the single instance in a dict.',
        'Return the existing instance if already created.',
        'Use the class itself as the dict key.',
      ],
      concepts: ['class decorator', 'singleton pattern'],
    },
    {
      id: 'py-dec-16',
      title: 'Write register Decorator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a decorator system: register() adds functions to a registry dict, and get_registry() returns it.',
      skeleton: `registry = {}

def register(name):
    # Register a function under the given name
    pass

def get_registry():
    return registry`,
      solution: `registry = {}

def register(name):
    def decorator(func):
        registry[name] = func
        return func
    return decorator

def get_registry():
    return registry`,
      hints: [
        'register(name) is a decorator factory.',
        'Store func in the registry dict under the given name.',
        'Return func unchanged so the original function still works.',
      ],
      concepts: ['decorator factory', 'registration pattern'],
    },
    {
      id: 'py-dec-17',
      title: 'Predict Class Decorator',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `def add_repr(cls):
    def __repr__(self):
        attrs = ", ".join(f"{k}={v!r}" for k, v in self.__dict__.items())
        return f"{cls.__name__}({attrs})"
    cls.__repr__ = __repr__
    return cls

@add_repr
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

print(Point(1, 2))`,
      solution: `Point(x=1, y=2)`,
      hints: [
        'The decorator adds a __repr__ method to the class.',
        'It formats all instance attributes.',
        'Point(1,2) creates a Point with x=1, y=2.',
      ],
      concepts: ['class decorator', '__repr__'],
    },
    {
      id: 'py-dec-18',
      title: 'Fix the Bug: Decorator on Method',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the decorator so it works correctly with instance methods.',
      skeleton: `import functools

def log_call(func):
    @functools.wraps(func)
    def wrapper(*args):
        print(f"Calling {func.__name__}")
        return func(*args)
    return wrapper

class Calculator:
    @log_call
    def add(self, a, b):
        return a + b

calc = Calculator()
print(calc.add(3, 4))  # Should print 7`,
      solution: `import functools

def log_call(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

class Calculator:
    @log_call
    def add(self, a, b):
        return a + b

calc = Calculator()
print(calc.add(3, 4))  # Should print 7`,
      hints: [
        'The wrapper should accept **kwargs too.',
        'Method calls pass self as the first argument.',
        'Use *args, **kwargs for full flexibility.',
      ],
      concepts: ['decorator', 'method decoration', '**kwargs'],
    },
    {
      id: 'py-dec-19',
      title: 'Refactor to @property',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the getter/setter methods to use @property.',
      skeleton: `class Circle:
    def __init__(self, radius):
        self._radius = radius

    def get_radius(self):
        return self._radius

    def set_radius(self, value):
        if value < 0:
            raise ValueError("Radius must be non-negative")
        self._radius = value

c = Circle(5)
print(c.get_radius())
c.set_radius(10)`,
      solution: `class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius must be non-negative")
        self._radius = value

c = Circle(5)
print(c.radius)
c.radius = 10`,
      hints: [
        '@property makes a method act like an attribute.',
        '@name.setter defines the setter.',
        'Access with c.radius instead of c.get_radius().',
      ],
      concepts: ['@property', 'refactoring', 'encapsulation'],
    },
    {
      id: 'py-dec-20',
      title: 'Refactor to lru_cache',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the manual caching to use functools.lru_cache.',
      skeleton: `_cache = {}

def expensive_compute(n):
    if n in _cache:
        return _cache[n]
    if n < 2:
        result = n
    else:
        result = expensive_compute(n - 1) + expensive_compute(n - 2)
    _cache[n] = result
    return result`,
      solution: `import functools

@functools.lru_cache(maxsize=None)
def expensive_compute(n):
    if n < 2:
        return n
    return expensive_compute(n - 1) + expensive_compute(n - 2)`,
      hints: [
        'lru_cache handles all the caching automatically.',
        'maxsize=None means unlimited cache.',
        'Remove the manual cache dict entirely.',
      ],
      concepts: ['functools.lru_cache', 'refactoring'],
    },
  ],
};
