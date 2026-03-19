import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-functions',
  title: '10. Functions',
  explanation: `## Functions

Functions are defined with the \\\`def\\\` keyword and are first-class objects in Python.

### Parameters
- Positional: \\\`def f(a, b)\\\`
- Default: \\\`def f(a, b=10)\\\`
- Keyword-only: \\\`def f(*, key)\\\`
- \\\`*args\\\` collects extra positional arguments into a tuple
- \\\`**kwargs\\\` collects extra keyword arguments into a dict

### Return Values
- \\\`return\\\` sends a value back to the caller
- Multiple return values are packed into a tuple
- No \\\`return\\\` (or bare \\\`return\\\`) returns \\\`None\\\`

### Docstrings
The first string literal in a function body becomes its docstring, accessible via \\\`help(f)\\\` or \\\`f.__doc__\\\`.

### Scope
Python follows the LEGB rule: Local, Enclosing, Global, Built-in.

### Type Hints
Optional annotations: \\\`def f(x: int) -> str:\\\` -- not enforced at runtime.
`,
  exercises: [
    {
      id: 'py-fn-1',
      title: 'Define a Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Define a function called greet that prints "Hello!".',
      skeleton: `__BLANK__ greet():
    print("Hello!")

greet()`,
      solution: `def greet():
    print("Hello!")

greet()`,
      hints: [
        'Functions are defined with a keyword.',
        'The keyword is three letters: def.',
        'The answer is: def',
      ],
      concepts: ['def', 'function definition'],
    },
    {
      id: 'py-fn-2',
      title: 'Return a Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete the function to return the sum of a and b.',
      skeleton: `def add(a, b):
    __BLANK__ a + b

print(add(3, 4))  # 7`,
      solution: `def add(a, b):
    return a + b

print(add(3, 4))  # 7`,
      hints: [
        'Use the return keyword to send a value back.',
        'return exits the function with a value.',
        'The answer is: return',
      ],
      concepts: ['return', 'function'],
    },
    {
      id: 'py-fn-3',
      title: 'Default Parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Set a default value of "World" for the name parameter.',
      skeleton: `def greet(name__BLANK__):
    return f"Hello, {name}!"

print(greet())       # Hello, World!
print(greet("Alice"))  # Hello, Alice!`,
      solution: `def greet(name="World"):
    return f"Hello, {name}!"

print(greet())       # Hello, World!
print(greet("Alice"))  # Hello, Alice!`,
      hints: [
        'Default values are assigned with = in the parameter list.',
        'name="World" provides a default.',
        'The answer is: ="World"',
      ],
      concepts: ['default parameters'],
    },
    {
      id: 'py-fn-4',
      title: 'Multiple Return',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Return both the quotient and remainder.',
      skeleton: `def divide(a, b):
    return a // b__BLANK__a % b

q, r = divide(17, 5)
print(q, r)  # 3 2`,
      solution: `def divide(a, b):
    return a // b, a % b

q, r = divide(17, 5)
print(q, r)  # 3 2`,
      hints: [
        'Return multiple values by separating them with a comma.',
        'Python packs them into a tuple automatically.',
        'The answer is: ,',
      ],
      concepts: ['multiple return', 'tuple packing'],
    },
    {
      id: 'py-fn-5',
      title: '*args Parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Accept any number of positional arguments.',
      skeleton: `def total(__BLANK__):
    return sum(numbers)

print(total(1, 2, 3, 4))  # 10`,
      solution: `def total(*numbers):
    return sum(numbers)

print(total(1, 2, 3, 4))  # 10`,
      hints: [
        '* before the parameter name collects extra positional args.',
        '*numbers captures all arguments as a tuple.',
        'The answer is: *numbers',
      ],
      concepts: ['*args', 'variadic functions'],
    },
    {
      id: 'py-fn-6',
      title: '**kwargs Parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Accept any number of keyword arguments.',
      skeleton: `def show_config(__BLANK__):
    for key, value in options.items():
        print(f"{key} = {value}")

show_config(host="localhost", port=8080)`,
      solution: `def show_config(**options):
    for key, value in options.items():
        print(f"{key} = {value}")

show_config(host="localhost", port=8080)`,
      hints: [
        '** before the parameter name collects keyword args.',
        '**options captures them as a dictionary.',
        'The answer is: **options',
      ],
      concepts: ['**kwargs', 'keyword arguments'],
    },
    {
      id: 'py-fn-7',
      title: 'Write apply_twice Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function apply_twice(f, x) that applies function f to x twice: f(f(x)).',
      skeleton: `def apply_twice(f, x):
    # Apply f to x twice
    pass`,
      solution: `def apply_twice(f, x):
    return f(f(x))`,
      hints: [
        'Functions are first-class in Python.',
        'Call f(x), then call f on that result.',
        'return f(f(x))',
      ],
      concepts: ['first-class functions', 'function composition'],
    },
    {
      id: 'py-fn-8',
      title: 'Write make_adder Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function make_adder(n) that returns a function which adds n to its argument.',
      skeleton: `def make_adder(n):
    # Return a function that adds n
    pass`,
      solution: `def make_adder(n):
    def adder(x):
        return x + n
    return adder`,
      hints: [
        'Define an inner function that captures n.',
        'Return the inner function.',
        'This is a closure pattern.',
      ],
      concepts: ['closure', 'nested functions', 'first-class functions'],
    },
    {
      id: 'py-fn-9',
      title: 'Predict None Return',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `def greet(name):
    print(f"Hi, {name}")

result = greet("Alice")
print(result)`,
      solution: `Hi, Alice
None`,
      hints: [
        'The function prints but does not return a value.',
        'Functions without return return None.',
        'result will be None.',
      ],
      concepts: ['None return', 'print vs return'],
    },
    {
      id: 'py-fn-10',
      title: 'Write compose Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function compose(f, g) that returns a new function h such that h(x) = f(g(x)).',
      skeleton: `def compose(f, g):
    # Return a function that applies g then f
    pass`,
      solution: `def compose(f, g):
    def h(x):
        return f(g(x))
    return h`,
      hints: [
        'Define an inner function that chains f and g.',
        'Apply g first, then f on the result.',
        'Return the inner function.',
      ],
      concepts: ['function composition', 'closure'],
    },
    {
      id: 'py-fn-11',
      title: 'Predict *args Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `def show(*args, **kwargs):
    print(len(args), len(kwargs))

show(1, 2, 3, x=10, y=20)`,
      solution: `3 2`,
      hints: [
        '*args captures positional arguments as a tuple.',
        '**kwargs captures keyword arguments as a dict.',
        '3 positional (1,2,3) and 2 keyword (x,y).',
      ],
      concepts: ['*args', '**kwargs', 'argument unpacking'],
    },
    {
      id: 'py-fn-12',
      title: 'Fix the Bug: Mutable Default',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the mutable default argument bug.',
      skeleton: `def add_item(item, lst=[]):
    lst.append(item)
    return lst

print(add_item(1))  # [1]
print(add_item(2))  # Should print [2], not [1, 2]`,
      solution: `def add_item(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst

print(add_item(1))  # [1]
print(add_item(2))  # [2]`,
      hints: [
        'Default mutable arguments are shared across calls.',
        'Use None as the default and create a new list inside.',
        'if lst is None: lst = []',
      ],
      concepts: ['mutable default argument', 'None pattern'],
    },
    {
      id: 'py-fn-13',
      title: 'Write retry Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function retry(f, times) that calls f() up to times attempts, returning the result on success. If all attempts raise an exception, re-raise the last one.',
      skeleton: `def retry(f, times):
    # Retry f up to times attempts
    pass`,
      solution: `def retry(f, times):
    last_error = None
    for _ in range(times):
        try:
            return f()
        except Exception as e:
            last_error = e
    raise last_error`,
      hints: [
        'Use a for loop with range(times).',
        'Wrap f() in try/except.',
        'Store the last exception and raise it if all retries fail.',
      ],
      concepts: ['retry pattern', 'exception handling', 'first-class functions'],
    },
    {
      id: 'py-fn-14',
      title: 'Fix the Bug: Scope Issue',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the function so it correctly modifies the global counter.',
      skeleton: `counter = 0

def increment():
    counter += 1

increment()
print(counter)  # Should print 1`,
      solution: `counter = 0

def increment():
    global counter
    counter += 1

increment()
print(counter)  # Should print 1`,
      hints: [
        'counter += 1 creates a local variable by default.',
        'Use the global keyword to modify the global variable.',
        'Add "global counter" at the top of the function.',
      ],
      concepts: ['global keyword', 'scope', 'LEGB rule'],
    },
    {
      id: 'py-fn-15',
      title: 'Write memoize Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function memoize(f) that returns a version of f that caches results.',
      skeleton: `def memoize(f):
    # Return a cached version of f
    pass`,
      solution: `def memoize(f):
    cache = {}
    def wrapper(*args):
        if args not in cache:
            cache[args] = f(*args)
        return cache[args]
    return wrapper`,
      hints: [
        'Store results in a dictionary keyed by arguments.',
        'Check the cache before calling the function.',
        'Use *args to handle any number of arguments.',
      ],
      concepts: ['memoization', 'closure', 'caching'],
    },
    {
      id: 'py-fn-16',
      title: 'Predict Keyword-Only Args',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code output? Write "Error" if it raises an exception.',
      skeleton: `def greet(*, name):
    return f"Hello, {name}"

print(greet("Alice"))`,
      solution: `Error`,
      hints: [
        'The * in the parameter list makes all following params keyword-only.',
        'You must use greet(name="Alice"), not greet("Alice").',
        'Positional argument to keyword-only parameter raises TypeError.',
      ],
      concepts: ['keyword-only arguments', '*'],
    },
    {
      id: 'py-fn-17',
      title: 'Write pipe Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function pipe(value, *functions) that passes value through each function in sequence.',
      skeleton: `def pipe(value, *functions):
    # Pass value through each function
    pass`,
      solution: `def pipe(value, *functions):
    result = value
    for f in functions:
        result = f(result)
    return result`,
      hints: [
        'Start with the initial value.',
        'Apply each function to the running result.',
        'Return the final result.',
      ],
      concepts: ['pipeline pattern', '*args', 'function composition'],
    },
    {
      id: 'py-fn-18',
      title: 'Fix the Bug: Type Hint Confusion',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the function so it actually validates the input type, not just annotate it.',
      skeleton: `def double(x: int) -> int:
    return x * 2

# Type hints don't enforce types at runtime
print(double("ha"))  # Should raise TypeError, not print "haha"`,
      solution: `def double(x: int) -> int:
    if not isinstance(x, int):
        raise TypeError(f"Expected int, got {type(x).__name__}")
    return x * 2

print(double("ha"))  # Now raises TypeError`,
      hints: [
        'Type hints are not enforced at runtime.',
        'Add an explicit isinstance() check.',
        'Raise TypeError for invalid types.',
      ],
      concepts: ['type hints', 'isinstance()', 'runtime validation'],
    },
    {
      id: 'py-fn-19',
      title: 'Refactor to Keyword Args',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the function to use keyword-only arguments for options.',
      skeleton: `def connect(host, port, timeout, use_ssl):
    return f"{host}:{port} ssl={use_ssl} timeout={timeout}"

# Calling code is unclear:
result = connect("localhost", 8080, 30, True)`,
      solution: `def connect(host, port, *, timeout, use_ssl):
    return f"{host}:{port} ssl={use_ssl} timeout={timeout}"

# Calling code is now self-documenting:
result = connect("localhost", 8080, timeout=30, use_ssl=True)`,
      hints: [
        'Put * before the parameters that should be keyword-only.',
        'This forces callers to use named arguments.',
        'Makes function calls self-documenting.',
      ],
      concepts: ['keyword-only arguments', 'API design', 'refactoring'],
    },
    {
      id: 'py-fn-20',
      title: 'Refactor Repeated Logic',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the repeated validation logic into a helper function.',
      skeleton: `def create_user(name, email, age):
    if not name or len(name) < 2:
        raise ValueError("Invalid name")
    if not email or "@" not in email:
        raise ValueError("Invalid email")
    if not isinstance(age, int) or age < 0:
        raise ValueError("Invalid age")
    return {"name": name, "email": email, "age": age}`,
      solution: `def validate(value, check, message):
    if not check(value):
        raise ValueError(message)

def create_user(name, email, age):
    validate(name, lambda n: n and len(n) >= 2, "Invalid name")
    validate(email, lambda e: e and "@" in e, "Invalid email")
    validate(age, lambda a: isinstance(a, int) and a >= 0, "Invalid age")
    return {"name": name, "email": email, "age": age}`,
      hints: [
        'Extract the repeated pattern into a helper function.',
        'Pass a check function (lambda) for each validation.',
        'This reduces repetition and improves maintainability.',
      ],
      concepts: ['DRY principle', 'higher-order functions', 'refactoring'],
    },
  ],
};
