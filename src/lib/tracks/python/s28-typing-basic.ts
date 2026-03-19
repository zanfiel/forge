import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-typing',
  title: '28. Type Hints (Basic)',
  explanation: `## Type Hints (Basic)

Python's type hints (PEP 484+) add optional type annotations that tools like mypy can check statically, without affecting runtime.

### Basic Type Annotations
Annotate variables and function signatures with built-in types:
\\\`\\\`\\\`python
name: str = "Alice"
age: int = 30
def greet(name: str) -> str: ...
\\\`\\\`\\\`

### Common Types
- **\\\`int\\\`, \\\`str\\\`, \\\`float\\\`, \\\`bool\\\`** -- primitive types
- **\\\`list[int]\\\`** -- list of ints (Python 3.9+, or \\\`List[int]\\\` from typing)
- **\\\`dict[str, int]\\\`** -- dict with string keys, int values
- **\\\`tuple[int, str]\\\`** -- fixed-length tuple
- **\\\`set[str]\\\`** -- set of strings

### Optional and Union
- **\\\`Optional[str]\\\`** -- same as \\\`str | None\\\`
- **\\\`Union[int, str]\\\`** -- same as \\\`int | str\\\` (Python 3.10+)

### Special Types
- **\\\`Any\\\`** -- disables type checking
- **\\\`None\\\`** -- used as return type for functions that return nothing
- **\\\`TypeAlias\\\`** -- marks a variable as a type alias

### Type Checking vs Runtime
Type hints are NOT enforced at runtime. They are metadata for static analysis tools. \\\`isinstance()\\\` checks types at runtime.

### Forward References
Use string literals \\\`"ClassName"\\\` for types not yet defined, or \\\`from __future__ import annotations\\\` to defer all evaluation.
`,
  exercises: [
    {
      id: 'py-typ-1',
      title: 'Annotate function parameters',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Add type hints to the function parameters and return type.',
      skeleton: `def add(a__BLANK__, b__BLANK__) -> __BLANK__:
    return a + b

print(add(3, 4))`,
      solution: `def add(a: int, b: int) -> int:
    return a + b

print(add(3, 4))`,
      hints: [
        'Type hints use colon syntax: parameter: type.',
        'Both parameters are integers, and the return is also int.',
        'The answer is: : int, : int, and int',
      ],
      concepts: ['function annotations', 'int type', 'return type'],
    },
    {
      id: 'py-typ-2',
      title: 'Annotate a variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Add a type annotation to the variable declaration.',
      skeleton: `names__BLANK__ = ["Alice", "Bob", "Charlie"]
print(names)`,
      solution: `names: list[str] = ["Alice", "Bob", "Charlie"]
print(names)`,
      hints: [
        'Variable annotations use colon syntax: variable: type.',
        'A list of strings is typed as list[str].',
        'The answer is: : list[str]',
      ],
      concepts: ['variable annotations', 'list type'],
    },
    {
      id: 'py-typ-3',
      title: 'Optional type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use the correct type for a parameter that can be a string or None.',
      skeleton: `def greet(name: __BLANK__ = None) -> str:
    if name is None:
        return "Hello, stranger!"
    return f"Hello, {name}!"

print(greet())
print(greet("Alice"))`,
      solution: `def greet(name: str | None = None) -> str:
    if name is None:
        return "Hello, stranger!"
    return f"Hello, {name}!"

print(greet())
print(greet("Alice"))`,
      hints: [
        'A value that can be str or None uses the union syntax.',
        'In Python 3.10+, use str | None.',
        'The answer is: str | None',
      ],
      concepts: ['Optional', 'None type', 'union syntax'],
    },
    {
      id: 'py-typ-4',
      title: 'Dict type hint',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Add the correct type hint for a dictionary mapping strings to integers.',
      skeleton: `scores: __BLANK__ = {"Alice": 95, "Bob": 87}
print(scores)`,
      solution: `scores: dict[str, int] = {"Alice": 95, "Bob": 87}
print(scores)`,
      hints: [
        'Dictionaries are typed as dict[key_type, value_type].',
        'The keys are strings and values are integers.',
        'The answer is: dict[str, int]',
      ],
      concepts: ['dict type', 'type parameters'],
    },
    {
      id: 'py-typ-5',
      title: 'Tuple type hint',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Add the correct type hint for a fixed-length tuple of (str, int, float).',
      skeleton: `record: __BLANK__ = ("Alice", 30, 95.5)
print(record)`,
      solution: `record: tuple[str, int, float] = ("Alice", 30, 95.5)
print(record)`,
      hints: [
        'Fixed-length tuples specify each element type.',
        'tuple[str, int, float] describes a 3-element tuple.',
        'The answer is: tuple[str, int, float]',
      ],
      concepts: ['tuple type', 'fixed-length tuple'],
    },
    {
      id: 'py-typ-6',
      title: 'Union type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use the pipe syntax for a union type that accepts int or str.',
      skeleton: `def process(value: __BLANK__) -> str:
    return str(value)

print(process(42))
print(process("hello"))`,
      solution: `def process(value: int | str) -> str:
    return str(value)

print(process(42))
print(process("hello"))`,
      hints: [
        'Python 3.10+ uses the | operator for union types.',
        'int | str means the value can be either type.',
        'The answer is: int | str',
      ],
      concepts: ['Union', 'pipe syntax', 'Python 3.10+'],
    },
    {
      id: 'py-typ-7',
      title: 'Predict type checking behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Does this code run without error at runtime? What does it print?',
      skeleton: `def add(a: int, b: int) -> int:
    return a + b

# Passing strings instead of ints
print(add("hello", " world"))`,
      solution: `hello world`,
      hints: [
        'Type hints are NOT enforced at runtime in Python.',
        'The function works because + concatenates strings too.',
        'The output is: hello world',
      ],
      concepts: ['type hints not enforced', 'runtime behavior'],
    },
    {
      id: 'py-typ-8',
      title: 'Predict None return',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this function return when called?',
      skeleton: `def log(message: str) -> None:
    print(message)

result = log("hello")
print(result)`,
      solution: `hello
None`,
      hints: [
        'The function is annotated with -> None.',
        'Functions without an explicit return statement return None.',
        'The output is hello on the first line, then None.',
      ],
      concepts: ['None return type', 'implicit return'],
    },
    {
      id: 'py-typ-9',
      title: 'Predict isinstance check',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this runtime type check output?',
      skeleton: `from typing import get_type_hints

def greet(name: str) -> str:
    return f"Hello, {name}"

hints = get_type_hints(greet)
print(hints)`,
      solution: `{'name': <class 'str'>, 'return': <class 'str'>}`,
      hints: [
        'get_type_hints() retrieves annotations as a dictionary.',
        'It returns both parameter hints and the return type.',
        'The output shows a dict with name -> str and return -> str.',
      ],
      concepts: ['get_type_hints', 'annotations introspection'],
    },
    {
      id: 'py-typ-10',
      title: 'Fix incorrect type annotation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Fix the type annotation that does not match the actual data structure.',
      skeleton: `# Bug: annotated as list[int] but contains strings
names: list[int] = ["Alice", "Bob", "Charlie"]

def get_first(items: list[int]) -> int:
    return items[0]

print(get_first(names))`,
      solution: `# Fixed: annotated correctly as list[str]
names: list[str] = ["Alice", "Bob", "Charlie"]

def get_first(items: list[str]) -> str:
    return items[0]

print(get_first(names))`,
      hints: [
        'The list contains strings, not integers.',
        'Change list[int] to list[str] everywhere.',
        'Also change the return type from int to str.',
      ],
      concepts: ['type annotation accuracy', 'list type'],
    },
    {
      id: 'py-typ-11',
      title: 'Fix missing Optional',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the function that can return None but is annotated as returning str.',
      skeleton: `# Bug: function returns None when key not found, but annotation says str
def get_value(data: dict[str, str], key: str) -> str:
    return data.get(key)

result = get_value({"a": "1"}, "b")
print(result)`,
      solution: `# Fixed: return type correctly allows None
def get_value(data: dict[str, str], key: str) -> str | None:
    return data.get(key)

result = get_value({"a": "1"}, "b")
print(result)`,
      hints: [
        'dict.get() returns None when the key is missing.',
        'The return type should allow None.',
        'Change -> str to -> str | None.',
      ],
      concepts: ['Optional', 'None return', 'dict.get'],
    },
    {
      id: 'py-typ-12',
      title: 'Fix forward reference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the forward reference error where a class references itself.',
      skeleton: `# Bug: Node is not yet defined when used in the annotation
class Node:
    def __init__(self, value: int, next: Node = None):
        self.value = value
        self.next = next

n = Node(1, Node(2))
print(n.value, n.next.value)`,
      solution: `from __future__ import annotations

class Node:
    def __init__(self, value: int, next: Node | None = None):
        self.value = value
        self.next = next

n = Node(1, Node(2))
print(n.value, n.next.value)`,
      hints: [
        'A class cannot reference itself in annotations before it is defined.',
        'from __future__ import annotations defers evaluation of all annotations.',
        'Also add | None since next defaults to None.',
      ],
      concepts: ['forward references', '__future__ annotations', 'self-referential types'],
    },
    {
      id: 'py-typ-13',
      title: 'Write a typed function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a fully typed function that takes a list of strings and returns the longest one.',
      skeleton: `def longest(items):
    # Add type hints and implement
    pass

print(longest(["cat", "elephant", "dog"]))  # elephant`,
      solution: `def longest(items: list[str]) -> str:
    result = items[0]
    for item in items:
        if len(item) > len(result):
            result = item
    return result

print(longest(["cat", "elephant", "dog"]))  # elephant`,
      hints: [
        'The parameter is a list of strings, return is a single string.',
        'Use list[str] for the parameter and str for the return type.',
        'Iterate through items tracking the longest one found.',
      ],
      concepts: ['function annotations', 'list[str]', 'return type'],
    },
    {
      id: 'py-typ-14',
      title: 'Write a typed class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a typed Point class with x and y coordinates and a distance_to method.',
      skeleton: `import math

class Point:
    # Add type annotations for x, y and fully typed methods
    pass

p1 = Point(0, 0)
p2 = Point(3, 4)
print(p1.distance_to(p2))  # 5.0`,
      solution: `import math

class Point:
    def __init__(self, x: float, y: float) -> None:
        self.x: float = x
        self.y: float = y

    def distance_to(self, other: "Point") -> float:
        return math.sqrt((self.x - other.x) ** 2 + (self.y - other.y) ** 2)

p1 = Point(0, 0)
p2 = Point(3, 4)
print(p1.distance_to(p2))  # 5.0`,
      hints: [
        'Annotate __init__ parameters and instance variables.',
        'Use "Point" as a string for the forward reference in distance_to.',
        'Return type of distance_to is float.',
      ],
      concepts: ['class annotations', 'forward references', 'method typing'],
    },
    {
      id: 'py-typ-15',
      title: 'Write a TypeAlias',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Create a type alias for a complex type and use it in a function signature.',
      skeleton: `from typing import TypeAlias

# Create a type alias for a list of (name, score) tuples
# Then write a function that returns the top scorer

def top_scorer(records):
    pass

data = [("Alice", 95), ("Bob", 87), ("Charlie", 99)]
print(top_scorer(data))  # ('Charlie', 99)`,
      solution: `from typing import TypeAlias

ScoreBoard: TypeAlias = list[tuple[str, int]]

def top_scorer(records: ScoreBoard) -> tuple[str, int]:
    return max(records, key=lambda r: r[1])

data: ScoreBoard = [("Alice", 95), ("Bob", 87), ("Charlie", 99)]
print(top_scorer(data))  # ('Charlie', 99)`,
      hints: [
        'TypeAlias marks a variable as a type alias.',
        'Use list[tuple[str, int]] as the complex type.',
        'Apply the alias in the function signature.',
      ],
      concepts: ['TypeAlias', 'complex types', 'type aliases'],
    },
    {
      id: 'py-typ-16',
      title: 'Write a NewType usage',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Use NewType to create distinct types for UserId and OrderId that are both ints but should not be mixed.',
      skeleton: `from typing import NewType

# Create UserId and OrderId as distinct types
# Write a function that takes a UserId and returns a greeting

def greet_user(user_id):
    pass

print(greet_user(42))`,
      solution: `from typing import NewType

UserId = NewType("UserId", int)
OrderId = NewType("OrderId", int)

def greet_user(user_id: UserId) -> str:
    return f"Hello, user #{user_id}!"

uid = UserId(42)
print(greet_user(uid))`,
      hints: [
        'NewType creates a callable that returns its argument at runtime.',
        'NewType("UserId", int) creates a distinct type based on int.',
        'Static checkers treat UserId and OrderId as different types.',
      ],
      concepts: ['NewType', 'distinct types', 'type safety'],
    },
    {
      id: 'py-typ-17',
      title: 'Write a Callable type hint',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that takes a callback with a specific signature and applies it to a list.',
      skeleton: `from collections.abc import Callable

def apply_to_all(items, func):
    # Type this properly: func takes an int and returns a str
    pass

result = apply_to_all([1, 2, 3], str)
print(result)  # ['1', '2', '3']`,
      solution: `from collections.abc import Callable

def apply_to_all(items: list[int], func: Callable[[int], str]) -> list[str]:
    return [func(item) for item in items]

result = apply_to_all([1, 2, 3], str)
print(result)  # ['1', '2', '3']`,
      hints: [
        'Callable[[arg_types], return_type] specifies function signatures.',
        'Callable[[int], str] means takes an int, returns a str.',
        'The function returns list[str] after applying func to each item.',
      ],
      concepts: ['Callable', 'callback typing', 'higher-order functions'],
    },
    {
      id: 'py-typ-18',
      title: 'Write a cast usage',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Use typing.cast to tell the type checker about a type that you know is correct but it cannot infer.',
      skeleton: `from typing import cast

def get_config():
    # Returns Any because it reads from external source
    return {"host": "localhost", "port": 8080}

# Use cast to tell type checker the result is dict[str, str | int]
pass`,
      solution: `from typing import cast

def get_config() -> dict:
    # Returns Any because it reads from external source
    return {"host": "localhost", "port": 8080}

config = cast(dict[str, str | int], get_config())
host: str = cast(str, config["host"])
port: int = cast(int, config["port"])
print(f"{host}:{port}")`,
      hints: [
        'cast(Type, value) returns value unchanged at runtime.',
        'It only tells the type checker to treat value as Type.',
        'Use cast when you know more about the type than the checker does.',
      ],
      concepts: ['cast', 'type narrowing', 'external data'],
    },
    {
      id: 'py-typ-19',
      title: 'Refactor untyped to typed',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Add comprehensive type hints to this untyped code.',
      skeleton: `def process_data(items, threshold):
    results = {}
    for item in items:
        name = item["name"]
        score = item["score"]
        if score >= threshold:
            results[name] = score
    return results

data = [{"name": "Alice", "score": 95}, {"name": "Bob", "score": 70}]
print(process_data(data, 80))`,
      solution: `def process_data(items: list[dict[str, str | int]], threshold: int) -> dict[str, int]:
    results: dict[str, int] = {}
    for item in items:
        name: str = str(item["name"])
        score: int = int(item["score"])
        if score >= threshold:
            results[name] = score
    return results

data: list[dict[str, str | int]] = [{"name": "Alice", "score": 95}, {"name": "Bob", "score": 70}]
print(process_data(data, 80))`,
      hints: [
        'items is a list of dicts with string keys and mixed values.',
        'The function returns a dict mapping names to scores.',
        'Add type hints to parameters, return type, and local variables.',
      ],
      concepts: ['refactoring', 'adding type hints', 'complex types'],
    },
    {
      id: 'py-typ-20',
      title: 'Refactor typing imports to modern syntax',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor old-style typing imports to Python 3.10+ built-in syntax.',
      skeleton: `from typing import List, Dict, Tuple, Optional, Union

def process(
    items: List[str],
    config: Dict[str, int],
    pair: Tuple[str, int],
    name: Optional[str] = None,
    value: Union[int, float] = 0,
) -> List[Dict[str, Union[int, str]]]:
    return []`,
      solution: `def process(
    items: list[str],
    config: dict[str, int],
    pair: tuple[str, int],
    name: str | None = None,
    value: int | float = 0,
) -> list[dict[str, int | str]]:
    return []`,
      hints: [
        'Python 3.9+ supports list, dict, tuple, set directly for type hints.',
        'Python 3.10+ supports X | Y instead of Union[X, Y].',
        'Optional[X] becomes X | None. Remove all typing imports.',
      ],
      concepts: ['modern syntax', 'Python 3.10+', 'refactoring imports'],
    },
  ],
};
