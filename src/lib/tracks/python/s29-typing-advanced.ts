import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-typing-adv',
  title: '29. Type Hints (Advanced)',
  explanation: `## Type Hints (Advanced)

Advanced typing features let you express complex relationships between types with full precision.

### TypeVar & Generics
\\\`TypeVar\\\` creates type variables for generic functions and classes:
\\\`\\\`\\\`python
T = TypeVar("T")
def first(items: list[T]) -> T: ...
\\\`\\\`\\\`

### Generic Classes
Inherit from \\\`Generic[T]\\\` to make your own parameterized classes.

### Protocol (Structural Subtyping)
\\\`Protocol\\\` defines interfaces through structure rather than inheritance -- if it has the right methods, it matches.

### Callable Types
\\\`Callable[[int, str], bool]\\\` describes function signatures.

### @overload
Declare multiple signatures for a function so the checker knows different input types produce different output types.

### Literal & Final
- \\\`Literal["a", "b"]\\\` restricts to specific values
- \\\`Final\\\` marks a value as non-reassignable

### TypedDict
Typed dictionaries with specific keys and value types.

### TypeGuard
Custom type narrowing functions that return \\\`TypeGuard[T]\\\`.

### ParamSpec & Concatenate
Preserve parameter types through decorators with \\\`ParamSpec\\\`.

### Covariance & Contravariance
TypeVar supports \\\`covariant=True\\\` and \\\`contravariant=True\\\` for container type relationships.
`,
  exercises: [
    {
      id: 'py-tya-1',
      title: 'Basic TypeVar',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a TypeVar and use it to type a generic identity function.',
      skeleton: `from typing import TypeVar

T = __BLANK__("T")

def identity(x: T) -> T:
    return x

print(identity(42))
print(identity("hello"))`,
      solution: `from typing import TypeVar

T = TypeVar("T")

def identity(x: T) -> T:
    return x

print(identity(42))
print(identity("hello"))`,
      hints: [
        'TypeVar creates a type variable for generic functions.',
        'The string argument should match the variable name.',
        'The answer is: TypeVar',
      ],
      concepts: ['TypeVar', 'generic functions'],
    },
    {
      id: 'py-tya-2',
      title: 'Bounded TypeVar',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Create a TypeVar bounded to numeric types.',
      skeleton: `from typing import TypeVar

N = TypeVar("N", __BLANK__=int | float)

def double(x: N) -> N:
    return x * 2

print(double(5))
print(double(3.14))`,
      solution: `from typing import TypeVar

N = TypeVar("N", bound=int | float)

def double(x: N) -> N:
    return x * 2

print(double(5))
print(double(3.14))`,
      hints: [
        'TypeVar accepts a bound keyword to restrict the type.',
        'bound=int | float means N must be int, float, or a subtype.',
        'The answer is: bound',
      ],
      concepts: ['TypeVar bound', 'type constraints'],
    },
    {
      id: 'py-tya-3',
      title: 'Generic class',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Complete the generic Stack class definition.',
      skeleton: `from typing import TypeVar, Generic

T = TypeVar("T")

class Stack(__BLANK__):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

s = Stack[int]()
s.push(1)
print(s.pop())`,
      solution: `from typing import TypeVar, Generic

T = TypeVar("T")

class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

s = Stack[int]()
s.push(1)
print(s.pop())`,
      hints: [
        'Generic classes inherit from Generic[T].',
        'This allows the class to be parameterized: Stack[int].',
        'The answer is: Generic[T]',
      ],
      concepts: ['Generic', 'parameterized classes'],
    },
    {
      id: 'py-tya-4',
      title: 'Protocol definition',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Define a Protocol that requires a close() method.',
      skeleton: `from typing import __BLANK__

class Closeable(__BLANK__):
    def close(self) -> None: ...

class File:
    def close(self) -> None:
        print("File closed")

def cleanup(resource: Closeable) -> None:
    resource.close()

cleanup(File())`,
      solution: `from typing import Protocol

class Closeable(Protocol):
    def close(self) -> None: ...

class File:
    def close(self) -> None:
        print("File closed")

def cleanup(resource: Closeable) -> None:
    resource.close()

cleanup(File())`,
      hints: [
        'Protocol enables structural subtyping.',
        'A class matches a Protocol if it has the required methods.',
        'The answer is: Protocol',
      ],
      concepts: ['Protocol', 'structural subtyping'],
    },
    {
      id: 'py-tya-5',
      title: 'Literal type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use Literal to restrict a parameter to specific string values.',
      skeleton: `from typing import __BLANK__

def set_color(color: __BLANK__["red", "green", "blue"]) -> str:
    return f"Color set to {color}"

print(set_color("red"))`,
      solution: `from typing import Literal

def set_color(color: Literal["red", "green", "blue"]) -> str:
    return f"Color set to {color}"

print(set_color("red"))`,
      hints: [
        'Literal restricts values to specific literals.',
        'Literal["red", "green", "blue"] means only those strings.',
        'The answer is: Literal',
      ],
      concepts: ['Literal', 'value restriction'],
    },
    {
      id: 'py-tya-6',
      title: 'TypedDict',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Define a TypedDict for a user record with specific key types.',
      skeleton: `from typing import __BLANK__

class User(__BLANK__):
    name: str
    age: int
    active: bool

user: User = {"name": "Alice", "age": 30, "active": True}
print(user["name"])`,
      solution: `from typing import TypedDict

class User(TypedDict):
    name: str
    age: int
    active: bool

user: User = {"name": "Alice", "age": 30, "active": True}
print(user["name"])`,
      hints: [
        'TypedDict creates a dict type with specific keys and value types.',
        'Each attribute defines a required key.',
        'The answer is: TypedDict',
      ],
      concepts: ['TypedDict', 'typed dictionaries'],
    },
    {
      id: 'py-tya-7',
      title: 'Predict overload behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this overloaded function print at runtime?',
      skeleton: `from typing import overload

@overload
def process(x: int) -> str: ...
@overload
def process(x: str) -> int: ...

def process(x):
    if isinstance(x, int):
        return str(x)
    return len(x)

print(process(42))
print(process("hello"))`,
      solution: `42
5`,
      hints: [
        '@overload signatures are for the type checker only.',
        'The actual implementation handles both cases.',
        'process(42) returns "42" which prints as 42, process("hello") returns 5.',
      ],
      concepts: ['@overload', 'runtime behavior'],
    },
    {
      id: 'py-tya-8',
      title: 'Predict Final behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Does this code run? What does it output?',
      skeleton: `from typing import Final

MAX_SIZE: Final = 100
MAX_SIZE = 200  # mypy would flag this
print(MAX_SIZE)`,
      solution: `200`,
      hints: [
        'Final is a hint for type checkers, not enforced at runtime.',
        'mypy would report an error, but Python runs it fine.',
        'The output is 200 because reassignment works at runtime.',
      ],
      concepts: ['Final', 'runtime vs static', 'type checker hints'],
    },
    {
      id: 'py-tya-9',
      title: 'Predict TypeGuard',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this TypeGuard function output?',
      skeleton: `from typing import TypeGuard

def is_str_list(items: list[object]) -> TypeGuard[list[str]]:
    return all(isinstance(item, str) for item in items)

data = ["a", "b", "c"]
if is_str_list(data):
    print("All strings")
else:
    print("Mixed types")`,
      solution: `All strings`,
      hints: [
        'TypeGuard narrows the type in the if branch.',
        'The function checks if all items are strings.',
        'All items are strings, so "All strings" is printed.',
      ],
      concepts: ['TypeGuard', 'type narrowing'],
    },
    {
      id: 'py-tya-10',
      title: 'Fix TypeVar constraint',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the TypeVar that should only allow int or str but uses the wrong syntax.',
      skeleton: `from typing import TypeVar

# Bug: using bound instead of value constraints
T = TypeVar("T", bound=int | str)

def stringify(x: T) -> str:
    return str(x)

# This should work for int and str, but not float
print(stringify(42))
print(stringify("hello"))`,
      solution: `from typing import TypeVar

# Fixed: use value constraints to restrict to exactly int or str
T = TypeVar("T", int, str)

def stringify(x: T) -> str:
    return str(x)

# This works for int and str only
print(stringify(42))
print(stringify("hello"))`,
      hints: [
        'bound= means T can be any subtype, value constraints limit to exact types.',
        'TypeVar("T", int, str) restricts T to exactly int or str.',
        'Change bound=int | str to positional args int, str.',
      ],
      concepts: ['TypeVar constraints', 'bound vs constraints'],
    },
    {
      id: 'py-tya-11',
      title: 'Fix Protocol method signature',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the Protocol that does not match the implementing class.',
      skeleton: `from typing import Protocol

class Drawable(Protocol):
    def draw(self, x: int, y: int) -> None: ...

class Circle:
    def draw(self, x: int, y: int, radius: int = 10) -> None:
        print(f"Circle at ({x},{y}) r={radius}")

# Bug: checker says this is fine, but we actually use the wrong protocol
def render(shape: Drawable) -> None:
    shape.draw(0, 0, radius=5)  # Error: Drawable.draw has no radius param

render(Circle())`,
      solution: `from typing import Protocol

class Drawable(Protocol):
    def draw(self, x: int, y: int, radius: int = ...) -> None: ...

class Circle:
    def draw(self, x: int, y: int, radius: int = 10) -> None:
        print(f"Circle at ({x},{y}) r={radius}")

def render(shape: Drawable) -> None:
    shape.draw(0, 0, radius=5)

render(Circle())`,
      hints: [
        'The Protocol signature must include all parameters the caller uses.',
        'Add the radius parameter with a default to the Protocol.',
        'Use ... as the default value placeholder in Protocols.',
      ],
      concepts: ['Protocol', 'method signatures', 'default values'],
    },
    {
      id: 'py-tya-12',
      title: 'Fix TypedDict total',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the TypedDict that requires all keys but some should be optional.',
      skeleton: `from typing import TypedDict, NotRequired

# Bug: email should be optional but all keys are required by default
class User(TypedDict):
    name: str
    age: int
    email: str

# This should work without email
user: User = {"name": "Alice", "age": 30}
print(user)`,
      solution: `from typing import TypedDict, NotRequired

class User(TypedDict):
    name: str
    age: int
    email: NotRequired[str]

# Now email is optional
user: User = {"name": "Alice", "age": 30}
print(user)`,
      hints: [
        'By default, all TypedDict keys are required.',
        'Use NotRequired[] to mark individual keys as optional.',
        'Wrap the email type with NotRequired[str].',
      ],
      concepts: ['TypedDict', 'NotRequired', 'optional keys'],
    },
    {
      id: 'py-tya-13',
      title: 'Write a generic container',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a generic Box class that wraps a value of any type.',
      skeleton: `from typing import TypeVar, Generic

# Write a Box[T] class with get() and set() methods

box = Box(42)
print(box.get())  # 42
box.set(100)
print(box.get())  # 100`,
      solution: `from typing import TypeVar, Generic

T = TypeVar("T")

class Box(Generic[T]):
    def __init__(self, value: T) -> None:
        self._value = value

    def get(self) -> T:
        return self._value

    def set(self, value: T) -> None:
        self._value = value

box = Box(42)
print(box.get())  # 42
box.set(100)
print(box.get())  # 100`,
      hints: [
        'Create a TypeVar T and inherit from Generic[T].',
        'The constructor stores a value of type T.',
        'get() returns T, set() accepts T.',
      ],
      concepts: ['Generic', 'TypeVar', 'parameterized classes'],
    },
    {
      id: 'py-tya-14',
      title: 'Write an overloaded function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write an overloaded function that returns different types based on a boolean flag.',
      skeleton: `from typing import overload

# When raw=False (default), return str
# When raw=True, return bytes

print(fetch(raw=False))  # "data"
print(fetch(raw=True))   # b"data"`,
      solution: `from typing import overload

@overload
def fetch(raw: bool = False) -> str: ...
@overload
def fetch(raw: bool = True) -> bytes: ...

def fetch(raw: bool = False) -> str | bytes:
    if raw:
        return b"data"
    return "data"

print(fetch(raw=False))  # data
print(fetch(raw=True))   # b'data'`,
      hints: [
        'Use @overload to define multiple signatures.',
        'The actual implementation handles both cases with isinstance or flags.',
        'Each @overload shows one specific input -> output mapping.',
      ],
      concepts: ['@overload', 'conditional return types'],
    },
    {
      id: 'py-tya-15',
      title: 'Write a TypeGuard function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a TypeGuard function that narrows a list of objects to a list of integers.',
      skeleton: `from typing import TypeGuard

def is_int_list(items: list[object]) -> TypeGuard[list[int]]:
    pass

data = [1, 2, 3]
if is_int_list(data):
    total = sum(data)  # type checker knows data is list[int]
    print(total)`,
      solution: `from typing import TypeGuard

def is_int_list(items: list[object]) -> TypeGuard[list[int]]:
    return all(isinstance(item, int) for item in items)

data = [1, 2, 3]
if is_int_list(data):
    total = sum(data)  # type checker knows data is list[int]
    print(total)`,
      hints: [
        'TypeGuard functions return a bool at runtime.',
        'If True, the type checker narrows the input type.',
        'Check that all items are ints using all() and isinstance().',
      ],
      concepts: ['TypeGuard', 'type narrowing', 'isinstance'],
    },
    {
      id: 'py-tya-16',
      title: 'Write a ParamSpec decorator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a typed logging decorator that preserves the function signature using ParamSpec.',
      skeleton: `from typing import ParamSpec, TypeVar, Callable
import functools

P = ParamSpec("P")
R = TypeVar("R")

def logged(func: Callable[P, R]) -> Callable[P, R]:
    pass

@logged
def add(a: int, b: int) -> int:
    return a + b

print(add(3, 4))`,
      solution: `from typing import ParamSpec, TypeVar, Callable
import functools

P = ParamSpec("P")
R = TypeVar("R")

def logged(func: Callable[P, R]) -> Callable[P, R]:
    @functools.wraps(func)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@logged
def add(a: int, b: int) -> int:
    return a + b

print(add(3, 4))`,
      hints: [
        'ParamSpec captures the parameter types of the decorated function.',
        'Use P.args and P.kwargs in the wrapper signature.',
        'functools.wraps preserves the function metadata.',
      ],
      concepts: ['ParamSpec', 'Callable', 'typed decorators'],
    },
    {
      id: 'py-tya-17',
      title: 'Write a generic Protocol',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a generic Comparable Protocol that requires __lt__ and use it in a min function.',
      skeleton: `from typing import TypeVar, Protocol

# Write a Comparable protocol and a typed min_value function

print(min_value([3, 1, 4, 1, 5]))      # 1
print(min_value(["cherry", "apple"]))   # apple`,
      solution: `from typing import TypeVar, Protocol

class Comparable(Protocol):
    def __lt__(self, other: object) -> bool: ...

CT = TypeVar("CT", bound=Comparable)

def min_value(items: list[CT]) -> CT:
    result = items[0]
    for item in items[1:]:
        if item < result:
            result = item
    return result

print(min_value([3, 1, 4, 1, 5]))      # 1
print(min_value(["cherry", "apple"]))   # apple`,
      hints: [
        'Define a Protocol with __lt__ method.',
        'Use a TypeVar bounded by the Protocol.',
        'Iterate through items comparing with < operator.',
      ],
      concepts: ['generic Protocol', 'TypeVar bound', '__lt__'],
    },
    {
      id: 'py-tya-18',
      title: 'Write a Self type usage',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a Builder class that uses Self type for fluent method chaining.',
      skeleton: `from typing import Self

class QueryBuilder:
    # Implement a builder with select(), where(), and build() methods
    # Each method except build() should return Self
    pass

query = QueryBuilder().select("name").where("age > 18").build()
print(query)`,
      solution: `from typing import Self

class QueryBuilder:
    def __init__(self) -> None:
        self._select: str = "*"
        self._where: str = ""

    def select(self, fields: str) -> Self:
        self._select = fields
        return self

    def where(self, condition: str) -> Self:
        self._where = condition
        return self

    def build(self) -> str:
        query = f"SELECT {self._select}"
        if self._where:
            query += f" WHERE {self._where}"
        return query

query = QueryBuilder().select("name").where("age > 18").build()
print(query)`,
      hints: [
        'Self refers to the current class, useful for chained methods.',
        'Each method returns self with the Self return type.',
        'build() returns the final result (str), not Self.',
      ],
      concepts: ['Self type', 'fluent interface', 'builder pattern'],
    },
    {
      id: 'py-tya-19',
      title: 'Refactor Any to proper types',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Replace all uses of Any with proper specific types.',
      skeleton: `from typing import Any

def process(data: Any) -> Any:
    result: Any = {}
    for key in data:
        value: Any = data[key]
        if isinstance(value, str):
            result[key] = value.upper()
        elif isinstance(value, int):
            result[key] = value * 2
    return result

print(process({"name": "alice", "age": 30}))`,
      solution: `def process(data: dict[str, str | int]) -> dict[str, str | int]:
    result: dict[str, str | int] = {}
    for key in data:
        value: str | int = data[key]
        if isinstance(value, str):
            result[key] = value.upper()
        elif isinstance(value, int):
            result[key] = value * 2
    return result

print(process({"name": "alice", "age": 30}))`,
      hints: [
        'data is clearly a dict with string keys and str|int values.',
        'Replace each Any with the actual observed types.',
        'Remove the typing import since no typing module types are needed.',
      ],
      concepts: ['removing Any', 'type precision', 'refactoring'],
    },
    {
      id: 'py-tya-20',
      title: 'Refactor callback to Callable',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the untyped callback pattern to use proper Callable types.',
      skeleton: `class EventEmitter:
    def __init__(self):
        self._handlers = {}

    def on(self, event, handler):
        if event not in self._handlers:
            self._handlers[event] = []
        self._handlers[event].append(handler)

    def emit(self, event, data):
        for handler in self._handlers.get(event, []):
            handler(data)

emitter = EventEmitter()
emitter.on("click", lambda d: print(f"Clicked: {d}"))
emitter.emit("click", "button")`,
      solution: `from collections.abc import Callable

class EventEmitter:
    def __init__(self) -> None:
        self._handlers: dict[str, list[Callable[[str], None]]] = {}

    def on(self, event: str, handler: Callable[[str], None]) -> None:
        if event not in self._handlers:
            self._handlers[event] = []
        self._handlers[event].append(handler)

    def emit(self, event: str, data: str) -> None:
        for handler in self._handlers.get(event, []):
            handler(data)

emitter = EventEmitter()
emitter.on("click", lambda d: print(f"Clicked: {d}"))
emitter.emit("click", "button")`,
      hints: [
        'Handlers take a string argument and return None.',
        'Use Callable[[str], None] for the handler type.',
        '_handlers is a dict mapping strings to lists of Callables.',
      ],
      concepts: ['Callable', 'refactoring', 'callback typing'],
    },
  ],
};
