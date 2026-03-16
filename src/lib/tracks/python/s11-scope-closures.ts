import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-scope',
  title: '11. Scope & Closures',
  explanation: `## Scope & Closures

Python follows the LEGB rule for variable lookup: Local, Enclosing, Global, Built-in.

### Local Scope
Variables defined inside a function. They are destroyed when the function exits.

### Enclosing Scope
Variables from an outer (enclosing) function, accessible in nested functions.

### Global Scope
Variables defined at the module level. Use \\\`global\\\` to modify them from within a function.

### Closures
A closure is a nested function that "remembers" variables from its enclosing scope, even after the outer function has returned. The \\\`nonlocal\\\` keyword allows modifying enclosing scope variables.

### Common Pitfalls
- Late binding in loops: closures capture variables by reference.
- Forgetting \\\`global\\\` or \\\`nonlocal\\\` when mutating outer variables.
`,
  exercises: [
    {
      id: 'py-scope-1',
      title: 'Local Variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete the function so x is a local variable.',
      skeleton: `def my_func():
    __BLANK__ = 10
    return x

print(my_func())  # 10`,
      solution: `def my_func():
    x = 10
    return x

print(my_func())  # 10`,
      hints: [
        'Variables assigned inside a function are local by default.',
        'Simply assign x = 10.',
        'The answer is: x',
      ],
      concepts: ['local scope', 'variable assignment'],
    },
    {
      id: 'py-scope-2',
      title: 'Global Keyword',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Modify the global variable from inside the function.',
      skeleton: `count = 0

def increment():
    __BLANK__ count
    count += 1

increment()
print(count)  # 1`,
      solution: `count = 0

def increment():
    global count
    count += 1

increment()
print(count)  # 1`,
      hints: [
        'To modify a global variable inside a function, use a keyword.',
        'The keyword is six letters: global.',
        'The answer is: global',
      ],
      concepts: ['global keyword'],
    },
    {
      id: 'py-scope-3',
      title: 'Nonlocal Keyword',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Modify the enclosing function\'s variable.',
      skeleton: `def outer():
    x = 0
    def inner():
        __BLANK__ x
        x += 1
    inner()
    return x

print(outer())  # 1`,
      solution: `def outer():
    x = 0
    def inner():
        nonlocal x
        x += 1
    inner()
    return x

print(outer())  # 1`,
      hints: [
        'nonlocal allows modifying variables from an enclosing scope.',
        'It is similar to global but for enclosing (not module-level) scope.',
        'The answer is: nonlocal',
      ],
      concepts: ['nonlocal keyword', 'enclosing scope'],
    },
    {
      id: 'py-scope-4',
      title: 'Simple Closure',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete the closure so it returns a multiplier function.',
      skeleton: `def make_multiplier(factor):
    def multiply(x):
        return x * __BLANK__
    return multiply

double = make_multiplier(2)
print(double(5))  # 10`,
      solution: `def make_multiplier(factor):
    def multiply(x):
        return x * factor
    return multiply

double = make_multiplier(2)
print(double(5))  # 10`,
      hints: [
        'The inner function captures the enclosing variable.',
        'factor is available inside multiply via closure.',
        'The answer is: factor',
      ],
      concepts: ['closure', 'enclosing variable'],
    },
    {
      id: 'py-scope-5',
      title: 'Closure Captures Variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Return the inner function to create a closure.',
      skeleton: `def make_greeter(greeting):
    def greet(name):
        return f"{greeting}, {name}!"
    __BLANK__ greet

hi = make_greeter("Hi")
print(hi("Alice"))  # Hi, Alice!`,
      solution: `def make_greeter(greeting):
    def greet(name):
        return f"{greeting}, {name}!"
    return greet

hi = make_greeter("Hi")
print(hi("Alice"))  # Hi, Alice!`,
      hints: [
        'You need to return the inner function.',
        'Do not call it -- just return the function object.',
        'The answer is: return',
      ],
      concepts: ['closure', 'returning functions'],
    },
    {
      id: 'py-scope-6',
      title: 'LEGB Lookup Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `x = "global"

def outer():
    x = "enclosing"
    def inner():
        print(x)
    inner()

outer()`,
      solution: `enclosing`,
      hints: [
        'Python looks up variables in order: Local, Enclosing, Global, Built-in.',
        'inner() has no local x, so it looks in the enclosing scope.',
        'It finds x = "enclosing" in outer().',
      ],
      concepts: ['LEGB rule', 'scope resolution'],
    },
    {
      id: 'py-scope-7',
      title: 'Write counter Closure',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function make_counter() that returns a function. Each call to the returned function increments and returns a count.',
      skeleton: `def make_counter():
    # Return a function that counts up from 0
    pass`,
      solution: `def make_counter():
    count = 0
    def counter():
        nonlocal count
        count += 1
        return count
    return counter`,
      hints: [
        'Initialize a count variable in the outer function.',
        'Use nonlocal to modify it in the inner function.',
        'Return the inner function.',
      ],
      concepts: ['closure', 'nonlocal', 'stateful function'],
    },
    {
      id: 'py-scope-8',
      title: 'Write accumulator Closure',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function make_accumulator(initial) that returns a function. Each call adds a value to the running total and returns it.',
      skeleton: `def make_accumulator(initial):
    # Return a function that accumulates values
    pass`,
      solution: `def make_accumulator(initial):
    total = initial
    def add(value):
        nonlocal total
        total += value
        return total
    return add`,
      hints: [
        'Store the running total in the enclosing scope.',
        'Use nonlocal to update it.',
        'Return the inner function.',
      ],
      concepts: ['closure', 'accumulator', 'nonlocal'],
    },
    {
      id: 'py-scope-9',
      title: 'Predict Scope Shadowing',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `x = 10

def func():
    x = 20
    print(x)

func()
print(x)`,
      solution: `20
10`,
      hints: [
        'x inside func is a local variable that shadows the global.',
        'Modifying local x does not affect global x.',
        'func prints 20 (local), then print(x) prints 10 (global).',
      ],
      concepts: ['variable shadowing', 'local vs global'],
    },
    {
      id: 'py-scope-10',
      title: 'Write once Closure',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function once(f) that returns a wrapper that calls f only on the first invocation and returns the cached result on subsequent calls.',
      skeleton: `def once(f):
    # Return a function that calls f only once
    pass`,
      solution: `def once(f):
    result = None
    called = False
    def wrapper(*args, **kwargs):
        nonlocal result, called
        if not called:
            result = f(*args, **kwargs)
            called = True
        return result
    return wrapper`,
      hints: [
        'Track whether f has been called with a boolean.',
        'Cache the result on first call.',
        'Return the cached result on subsequent calls.',
      ],
      concepts: ['closure', 'caching', 'call-once pattern'],
    },
    {
      id: 'py-scope-11',
      title: 'Predict Closure Late Binding',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `funcs = []
for i in range(3):
    funcs.append(lambda: i)

print([f() for f in funcs])`,
      solution: `[2, 2, 2]`,
      hints: [
        'Closures capture variables by reference, not by value.',
        'All lambdas reference the same variable i.',
        'After the loop, i is 2, so all return 2.',
      ],
      concepts: ['late binding', 'closure pitfall'],
    },
    {
      id: 'py-scope-12',
      title: 'Fix the Bug: UnboundLocalError',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the UnboundLocalError.',
      skeleton: `total = 100

def add_to_total(amount):
    total = total + amount
    return total

print(add_to_total(50))  # Should print 150`,
      solution: `total = 100

def add_to_total(amount):
    global total
    total = total + amount
    return total

print(add_to_total(50))  # Should print 150`,
      hints: [
        'Assignment to total inside the function makes it local.',
        'But the right side references total before it is assigned locally.',
        'Use global total to reference the module-level variable.',
      ],
      concepts: ['UnboundLocalError', 'global keyword'],
    },
    {
      id: 'py-scope-13',
      title: 'Write memoize with Closure',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function memoize(f) using a closure with a dict cache.',
      skeleton: `def memoize(f):
    # Memoize f using a closure with a cache dict
    pass`,
      solution: `def memoize(f):
    cache = {}
    def wrapper(*args):
        if args not in cache:
            cache[args] = f(*args)
        return cache[args]
    return wrapper`,
      hints: [
        'The cache dict lives in the enclosing scope.',
        'No need for nonlocal since we mutate the dict, not reassign it.',
        'Use args tuple as the cache key.',
      ],
      concepts: ['memoization', 'closure', 'dict cache'],
    },
    {
      id: 'py-scope-14',
      title: 'Fix the Bug: Late Binding in Loop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the late binding issue so each function captures its own value of i.',
      skeleton: `funcs = []
for i in range(5):
    funcs.append(lambda: i * 10)

print(funcs[0]())  # Should print 0, not 40`,
      solution: `funcs = []
for i in range(5):
    funcs.append(lambda i=i: i * 10)

print(funcs[0]())  # Should print 0, not 40`,
      hints: [
        'Default arguments are evaluated at function definition time.',
        'lambda i=i captures the current value of i.',
        'This is the standard fix for late binding in loops.',
      ],
      concepts: ['late binding fix', 'default argument capture'],
    },
    {
      id: 'py-scope-15',
      title: 'Write rate_limiter Closure',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function make_rate_limiter(max_calls) that returns a function. The returned function returns True if under the limit, False otherwise. Each call increments the counter.',
      skeleton: `def make_rate_limiter(max_calls):
    # Return a function that tracks call count
    pass`,
      solution: `def make_rate_limiter(max_calls):
    calls = 0
    def check():
        nonlocal calls
        calls += 1
        return calls <= max_calls
    return check`,
      hints: [
        'Track the call count with nonlocal.',
        'Increment on each call.',
        'Return True if within the limit.',
      ],
      concepts: ['closure', 'rate limiting', 'nonlocal'],
    },
    {
      id: 'py-scope-16',
      title: 'Write closure_factory Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function make_validators() that returns two functions: one that adds a validator to a list, and one that runs all validators on a value.',
      skeleton: `def make_validators():
    # Return (add_validator, validate) pair
    pass`,
      solution: `def make_validators():
    validators = []
    def add_validator(fn):
        validators.append(fn)
    def validate(value):
        return all(fn(value) for fn in validators)
    return add_validator, validate`,
      hints: [
        'Share a validators list between two inner functions.',
        'add_validator appends functions to the list.',
        'validate runs all validators and returns True if all pass.',
      ],
      concepts: ['closure factory', 'shared mutable state'],
    },
    {
      id: 'py-scope-17',
      title: 'Predict Nonlocal Behavior',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `def outer():
    x = 1
    def middle():
        x = 2
        def inner():
            nonlocal x
            x = 3
        inner()
        print("middle:", x)
    middle()
    print("outer:", x)

outer()`,
      solution: `middle: 3
outer: 1`,
      hints: [
        'nonlocal in inner() modifies the nearest enclosing scope\'s x.',
        'That is middle\'s x, not outer\'s x.',
        'middle\'s x becomes 3; outer\'s x remains 1.',
      ],
      concepts: ['nonlocal', 'scope chain'],
    },
    {
      id: 'py-scope-18',
      title: 'Fix the Bug: Closure With Mutable State',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the history tracker so it returns a copy of the history, not a reference.',
      skeleton: `def make_history():
    history = []
    def add(item):
        history.append(item)
    def get():
        return history
    return add, get

add, get = make_history()
add("a")
result = get()
result.append("hacked")
print(get())  # Should print ['a'], not ['a', 'hacked']`,
      solution: `def make_history():
    history = []
    def add(item):
        history.append(item)
    def get():
        return history.copy()
    return add, get

add, get = make_history()
add("a")
result = get()
result.append("hacked")
print(get())  # Should print ['a'], not ['a', 'hacked']`,
      hints: [
        'Returning the list directly exposes the internal state.',
        'Return a copy to protect encapsulation.',
        'Use history.copy() or list(history).',
      ],
      concepts: ['encapsulation', 'defensive copy', 'closure'],
    },
    {
      id: 'py-scope-19',
      title: 'Refactor to Closure',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the class-based approach to use a closure instead.',
      skeleton: `class Averager:
    def __init__(self):
        self.numbers = []
    def add(self, n):
        self.numbers.append(n)
        return sum(self.numbers) / len(self.numbers)

avg = Averager()
print(avg.add(10))
print(avg.add(20))`,
      solution: `def make_averager():
    numbers = []
    def add(n):
        numbers.append(n)
        return sum(numbers) / len(numbers)
    return add

avg = make_averager()
print(avg(10))
print(avg(20))`,
      hints: [
        'Replace the class with a factory function.',
        'The list becomes a closure variable.',
        'Return the method as a standalone function.',
      ],
      concepts: ['closure vs class', 'refactoring'],
    },
    {
      id: 'py-scope-20',
      title: 'Refactor Global State',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor away the global variable using a closure.',
      skeleton: `_cache = {}

def get_cached(key, compute_fn):
    global _cache
    if key not in _cache:
        _cache[key] = compute_fn()
    return _cache[key]`,
      solution: `def make_cache():
    cache = {}
    def get_cached(key, compute_fn):
        if key not in cache:
            cache[key] = compute_fn()
        return cache[key]
    return get_cached

get_cached = make_cache()`,
      hints: [
        'Move the cache dict inside a factory function.',
        'The inner function accesses it via closure.',
        'No more global state.',
      ],
      concepts: ['eliminating globals', 'closure', 'refactoring'],
    },
  ],
};
