import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-protocols',
  title: '41. Protocols',
  explanation: `## Protocols

Protocols enable **structural subtyping** (duck typing with type checker support) in Python.

### Structural vs Nominal Typing
- **Nominal** -- a class must explicitly inherit to be considered a subtype (e.g., ABCs)
- **Structural** -- a class is a subtype if it has the right methods/attributes, regardless of inheritance

### Defining a Protocol
\`\`\`python
from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> str: ...

class Circle:
    def draw(self) -> str:
        return "O"

def render(shape: Drawable) -> str:
    return shape.draw()

render(Circle())  # OK -- Circle has draw(), satisfies Drawable
\`\`\`

### @runtime_checkable
\`\`\`python
from typing import Protocol, runtime_checkable

@runtime_checkable
class Sized(Protocol):
    def __len__(self) -> int: ...

isinstance([1, 2], Sized)  # True -- list has __len__
\`\`\`

### Key Points
- Protocol classes use \`...\` (ellipsis) as method body
- No explicit inheritance needed -- just matching structure
- @runtime_checkable enables isinstance() checks (structural, not type-safe)
- Protocols can have attributes, properties, and class variables
- Protocols can inherit from other Protocols
- Prefer Protocols over ABCs when you want structural subtyping
- Built-in protocols: Iterable, Iterator, Hashable, Sized, Callable, etc.

### Generic Protocols
\`\`\`python
from typing import Protocol, TypeVar

T = TypeVar('T')

class Container(Protocol[T]):
    def get(self) -> T: ...
    def set(self, value: T) -> None: ...
\`\`\`
`,
  exercises: [
    {
      id: 'py-proto-1',
      title: 'Define a simple Protocol',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Define a Protocol class with a method signature.',
      skeleton: `from typing import __BLANK__

class Greetable(__BLANK__):
    def greet(self) -> str: ...`,
      solution: `from typing import Protocol

class Greetable(Protocol):
    def greet(self) -> str: ...`,
      hints: [
        'typing provides a base class for structural subtyping.',
        'Classes inheriting from it define interface contracts.',
        'The answer is: Protocol',
      ],
      concepts: ['Protocol', 'structural subtyping'],
    },
    {
      id: 'py-proto-2',
      title: 'Implement a Protocol',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a class that satisfies a Protocol without explicit inheritance.',
      skeleton: `from typing import Protocol

class Speakable(Protocol):
    def speak(self) -> str: ...

class Dog:
    def __BLANK__(self) -> str:
        return "Woof!"

def make_sound(animal: Speakable) -> str:
    return animal.speak()

print(make_sound(Dog()))`,
      solution: `from typing import Protocol

class Speakable(Protocol):
    def speak(self) -> str: ...

class Dog:
    def speak(self) -> str:
        return "Woof!"

def make_sound(animal: Speakable) -> str:
    return animal.speak()

print(make_sound(Dog()))`,
      hints: [
        'Dog needs to have the same method that Speakable defines.',
        'No inheritance needed -- just matching method signature.',
        'The answer is: speak',
      ],
      concepts: ['Protocol', 'duck typing', 'structural subtyping'],
    },
    {
      id: 'py-proto-3',
      title: 'Function accepting Protocol type',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function that accepts any object satisfying a Protocol.',
      skeleton: `from typing import Protocol

class HasLength(Protocol):
    def __len__(self) -> int: ...

# Write a function 'get_length' that:
# 1. Takes a parameter 'obj' of type HasLength
# 2. Returns the length using len(obj)

def get_length(obj):
    pass`,
      solution: `from typing import Protocol

class HasLength(Protocol):
    def __len__(self) -> int: ...

def get_length(obj: HasLength) -> int:
    return len(obj)`,
      hints: [
        'Type hint the parameter with the Protocol class.',
        'Use len() to get the length.',
        'def get_length(obj: HasLength) -> int: return len(obj)',
      ],
      concepts: ['Protocol', 'type hints', 'duck typing'],
    },
    {
      id: 'py-proto-4',
      title: 'Protocol with multiple methods',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Define a Protocol with multiple method signatures.',
      skeleton: `from typing import Protocol

class Repository(Protocol):
    def get(self, id: int) -> dict: __BLANK__
    def save(self, data: dict) -> None: __BLANK__
    def delete(self, id: int) -> bool: __BLANK__`,
      solution: `from typing import Protocol

class Repository(Protocol):
    def get(self, id: int) -> dict: ...
    def save(self, data: dict) -> None: ...
    def delete(self, id: int) -> bool: ...`,
      hints: [
        'Protocol methods use a special placeholder instead of pass.',
        'It is the Python ellipsis literal.',
        'The answer is: ... (three dots)',
      ],
      concepts: ['Protocol', 'ellipsis', 'method signatures'],
    },
    {
      id: 'py-proto-5',
      title: 'Predict Protocol satisfaction',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Predict whether a class satisfies a Protocol.',
      skeleton: `from typing import Protocol, runtime_checkable

@runtime_checkable
class Printable(Protocol):
    def to_string(self) -> str: ...

class User:
    def __init__(self, name):
        self.name = name
    def to_string(self):
        return self.name

class Product:
    def __init__(self, title):
        self.title = title
    def display(self):
        return self.title

print(isinstance(User("Alice"), Printable))
print(isinstance(Product("Book"), Printable))
print(isinstance("hello", Printable))`,
      solution: `True
False
False`,
      hints: [
        'Printable requires a to_string method.',
        'User has to_string -- satisfies it. Product has display, not to_string.',
        'str has no to_string method. Output: True, False, False.',
      ],
      concepts: ['runtime_checkable', 'isinstance', 'Protocol'],
    },
    {
      id: 'py-proto-6',
      title: 'Fix missing Protocol method',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the class that fails to satisfy the Protocol.',
      skeleton: `from typing import Protocol

class Serializable(Protocol):
    def to_json(self) -> str: ...
    def from_json(self, data: str) -> None: ...

class Config:
    def __init__(self):
        self.data = {}

    def to_json(self) -> str:
        import json
        return json.dumps(self.data)

def save(obj: Serializable) -> str:
    return obj.to_json()

# Config is missing from_json method`,
      solution: `from typing import Protocol

class Serializable(Protocol):
    def to_json(self) -> str: ...
    def from_json(self, data: str) -> None: ...

class Config:
    def __init__(self):
        self.data = {}

    def to_json(self) -> str:
        import json
        return json.dumps(self.data)

    def from_json(self, data: str) -> None:
        import json
        self.data = json.loads(data)

def save(obj: Serializable) -> str:
    return obj.to_json()`,
      hints: [
        'Serializable requires both to_json and from_json methods.',
        'Config only has to_json -- it needs from_json.',
        'Add a from_json method that parses JSON into self.data.',
      ],
      concepts: ['Protocol', 'structural subtyping', 'method signature'],
    },
    {
      id: 'py-proto-7',
      title: '@runtime_checkable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use @runtime_checkable to enable isinstance checks with a Protocol.',
      skeleton: `from typing import Protocol, __BLANK__

@__BLANK__
class Closable(Protocol):
    def close(self) -> None: ...

class FileHandle:
    def close(self) -> None:
        print("Closed")

print(isinstance(FileHandle(), Closable))`,
      solution: `from typing import Protocol, runtime_checkable

@runtime_checkable
class Closable(Protocol):
    def close(self) -> None: ...

class FileHandle:
    def close(self) -> None:
        print("Closed")

print(isinstance(FileHandle(), Closable))`,
      hints: [
        'A decorator enables isinstance() checks with Protocol classes.',
        'It checks structural compatibility at runtime.',
        'The answer is: runtime_checkable',
      ],
      concepts: ['runtime_checkable', 'isinstance', 'Protocol'],
    },
    {
      id: 'py-proto-8',
      title: 'Write a Comparable protocol',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Protocol for comparable objects and a function that uses it.',
      skeleton: `from typing import Protocol

# Write:
# 1. A Protocol 'Comparable' with method: __lt__(self, other) -> bool
# 2. A function 'find_min' that takes a list of Comparable items
#    and returns the minimum using comparison

class Comparable(Protocol):
    pass

def find_min(items):
    pass`,
      solution: `from typing import Protocol

class Comparable(Protocol):
    def __lt__(self, other) -> bool: ...

def find_min(items: list[Comparable]) -> Comparable:
    result = items[0]
    for item in items[1:]:
        if item < result:
            result = item
    return result`,
      hints: [
        'Comparable needs a __lt__ method (less than operator).',
        'find_min loops through items comparing with < operator.',
        'Track the minimum in a variable and return it.',
      ],
      concepts: ['Protocol', '__lt__', 'comparison'],
    },
    {
      id: 'py-proto-9',
      title: 'isinstance with Protocol',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Check if an object satisfies a runtime-checkable Protocol.',
      skeleton: `from typing import Protocol, runtime_checkable

@runtime_checkable
class Iterable(Protocol):
    def __iter__(self): ...

items = [1, 2, 3]
number = 42

print(__BLANK__(items, Iterable))
print(__BLANK__(number, Iterable))`,
      solution: `from typing import Protocol, runtime_checkable

@runtime_checkable
class Iterable(Protocol):
    def __iter__(self): ...

items = [1, 2, 3]
number = 42

print(isinstance(items, Iterable))
print(isinstance(number, Iterable))`,
      hints: [
        'Python has a built-in function to check if an object is an instance of a type.',
        'It works with runtime_checkable Protocols too.',
        'The answer is: isinstance',
      ],
      concepts: ['isinstance', 'runtime_checkable', 'Protocol'],
    },
    {
      id: 'py-proto-10',
      title: 'Predict isinstance with Protocol',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict isinstance results with runtime_checkable Protocols.',
      skeleton: `from typing import Protocol, runtime_checkable

@runtime_checkable
class HasName(Protocol):
    name: str

class Person:
    def __init__(self, name: str):
        self.name = name

class Robot:
    model: str = "X100"

p = Person("Alice")
r = Robot()

print(isinstance(p, HasName))
print(isinstance(r, HasName))`,
      solution: `True
False`,
      hints: [
        'HasName requires a "name" attribute.',
        'Person instances have a name attribute set in __init__.',
        'Robot has "model" but not "name". Output: True, False.',
      ],
      concepts: ['runtime_checkable', 'Protocol attributes', 'isinstance'],
    },
    {
      id: 'py-proto-11',
      title: 'Fix Protocol definition',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the Protocol that is incorrectly defined.',
      skeleton: `from typing import Protocol

class Renderable(Protocol):
    def render(self) -> str:
        return "<default>"  # Bug: Protocols should not have implementations

class Button:
    def render(self) -> str:
        return "<button>"

def show(widget: Renderable) -> str:
    return widget.render()`,
      solution: `from typing import Protocol

class Renderable(Protocol):
    def render(self) -> str: ...

class Button:
    def render(self) -> str:
        return "<button>"

def show(widget: Renderable) -> str:
    return widget.render()`,
      hints: [
        'Protocol methods should not have implementations.',
        'Use ellipsis (...) instead of a real method body.',
        'Replace return "<default>" with ... in the Protocol.',
      ],
      concepts: ['Protocol', 'ellipsis', 'interface definition'],
    },
    {
      id: 'py-proto-12',
      title: 'Write generic Protocol',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a generic Protocol parameterized by a type variable.',
      skeleton: `from typing import Protocol, TypeVar

T = TypeVar('T')

# Write a generic Protocol 'Container' with:
# 1. get(self) -> T
# 2. set(self, value: T) -> None
# The Protocol should be parameterized by T

class Container(Protocol):
    pass`,
      solution: `from typing import Protocol, TypeVar

T = TypeVar('T')

class Container(Protocol[T]):
    def get(self) -> T: ...
    def set(self, value: T) -> None: ...`,
      hints: [
        'Generic Protocols are parameterized using Protocol[T].',
        'Methods use the type variable T in their signatures.',
        'class Container(Protocol[T]): with methods returning/accepting T.',
      ],
      concepts: ['Generic Protocol', 'TypeVar', 'parameterized types'],
    },
    {
      id: 'py-proto-13',
      title: 'Protocol inheritance',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Protocol that inherits from another Protocol.',
      skeleton: `from typing import Protocol

class Readable(Protocol):
    def read(self) -> str: ...

# Write a Protocol 'ReadWritable' that:
# 1. Inherits from Readable
# 2. Adds a write(self, data: str) -> None method
# A class satisfying ReadWritable must have both read() and write()

class ReadWritable(Protocol):
    pass`,
      solution: `from typing import Protocol

class Readable(Protocol):
    def read(self) -> str: ...

class ReadWritable(Readable, Protocol):
    def write(self, data: str) -> None: ...`,
      hints: [
        'A Protocol can inherit from another Protocol.',
        'Include both the parent Protocol and Protocol in the bases.',
        'class ReadWritable(Readable, Protocol): with the write method.',
      ],
      concepts: ['Protocol inheritance', 'composition'],
    },
    {
      id: 'py-proto-14',
      title: 'Predict Protocol compatibility',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Predict whether classes are compatible with a Protocol.',
      skeleton: `from typing import Protocol, runtime_checkable

@runtime_checkable
class Mappable(Protocol):
    def map(self, fn) -> "Mappable": ...

class MyList:
    def __init__(self, items):
        self.items = items
    def map(self, fn):
        return MyList([fn(x) for x in self.items])

class MySet:
    def __init__(self, items):
        self.items = set(items)
    def filter(self, fn):
        return MySet([x for x in self.items if fn(x)])

print(isinstance(MyList([1, 2]), Mappable))
print(isinstance(MySet([1, 2]), Mappable))`,
      solution: `True
False`,
      hints: [
        'Mappable requires a map method.',
        'MyList has map -- satisfies the Protocol.',
        'MySet has filter but not map -- does not satisfy it. Output: True, False.',
      ],
      concepts: ['Protocol compatibility', 'runtime_checkable'],
    },
    {
      id: 'py-proto-15',
      title: 'Fix runtime_checkable misuse',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix incorrect usage of runtime_checkable Protocol.',
      skeleton: `from typing import Protocol

class Hashable(Protocol):
    def __hash__(self) -> int: ...

# Bug: isinstance check fails because Protocol is not runtime_checkable
data = [1, "hello", [1, 2]]
hashable_items = [x for x in data if isinstance(x, Hashable)]
print(hashable_items)`,
      solution: `from typing import Protocol, runtime_checkable

@runtime_checkable
class Hashable(Protocol):
    def __hash__(self) -> int: ...

data = [1, "hello", [1, 2]]
hashable_items = [x for x in data if isinstance(x, Hashable)]
print(hashable_items)`,
      hints: [
        'isinstance() only works with Protocols decorated with @runtime_checkable.',
        'Add the decorator and import it from typing.',
        'Add @runtime_checkable above the class and import runtime_checkable.',
      ],
      concepts: ['runtime_checkable', 'isinstance', 'Protocol'],
    },
    {
      id: 'py-proto-16',
      title: 'Write callback Protocol',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a Protocol for a callback function signature.',
      skeleton: `from typing import Protocol

# Write a Protocol 'EventHandler' that defines:
# __call__(self, event: str, data: dict) -> None
# Then write a function 'trigger' that takes an EventHandler and calls it

class EventHandler(Protocol):
    pass

def trigger(handler, event, data):
    pass`,
      solution: `from typing import Protocol

class EventHandler(Protocol):
    def __call__(self, event: str, data: dict) -> None: ...

def trigger(handler: EventHandler, event: str, data: dict) -> None:
    handler(event, data)`,
      hints: [
        'Callable Protocols define __call__ with the expected signature.',
        'EventHandler needs __call__(self, event: str, data: dict) -> None.',
        'trigger simply calls handler(event, data).',
      ],
      concepts: ['callable Protocol', '__call__', 'callback typing'],
    },
    {
      id: 'py-proto-17',
      title: 'Write composite Protocol',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a Protocol that combines multiple interface requirements.',
      skeleton: `from typing import Protocol

class Serializable(Protocol):
    def serialize(self) -> bytes: ...

class Deserializable(Protocol):
    @classmethod
    def deserialize(cls, data: bytes) -> "Deserializable": ...

# Write a Protocol 'Persistable' that combines both
# Serializable and Deserializable protocols

class Persistable(Protocol):
    pass`,
      solution: `from typing import Protocol

class Serializable(Protocol):
    def serialize(self) -> bytes: ...

class Deserializable(Protocol):
    @classmethod
    def deserialize(cls, data: bytes) -> "Deserializable": ...

class Persistable(Serializable, Deserializable, Protocol):
    ...`,
      hints: [
        'A Protocol can inherit from multiple Protocols.',
        'Include all parent Protocols and Protocol itself in the bases.',
        'class Persistable(Serializable, Deserializable, Protocol): ...',
      ],
      concepts: ['Protocol composition', 'multiple inheritance'],
    },
    {
      id: 'py-proto-18',
      title: 'Protocol with property',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a Protocol that requires a property.',
      skeleton: `from typing import Protocol

# Write a Protocol 'Named' that requires:
# 1. A property 'name' that returns a str
# Then write a class 'Employee' that satisfies it
# with a name property returning self._name

class Named(Protocol):
    pass

class Employee:
    pass`,
      solution: `from typing import Protocol

class Named(Protocol):
    @property
    def name(self) -> str: ...

class Employee:
    def __init__(self, name: str):
        self._name = name

    @property
    def name(self) -> str:
        return self._name`,
      hints: [
        'Protocols can require properties using @property.',
        'Define the property with @property and ... as body in the Protocol.',
        'Employee implements name as a real @property returning self._name.',
      ],
      concepts: ['Protocol', 'property', 'structural subtyping'],
    },
    {
      id: 'py-proto-19',
      title: 'Refactor ABC to Protocol',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor an abstract base class to use Protocol instead.',
      skeleton: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

    @abstractmethod
    def perimeter(self) -> float:
        pass

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius

    def area(self) -> float:
        return 3.14159 * self.radius ** 2

    def perimeter(self) -> float:
        return 2 * 3.14159 * self.radius

def total_area(shapes: list[Shape]) -> float:
    return sum(s.area() for s in shapes)`,
      solution: `from typing import Protocol

class Shape(Protocol):
    def area(self) -> float: ...
    def perimeter(self) -> float: ...

class Circle:
    def __init__(self, radius: float):
        self.radius = radius

    def area(self) -> float:
        return 3.14159 * self.radius ** 2

    def perimeter(self) -> float:
        return 2 * 3.14159 * self.radius

def total_area(shapes: list[Shape]) -> float:
    return sum(s.area() for s in shapes)`,
      hints: [
        'Replace ABC with Protocol. Replace @abstractmethod bodies with ...',
        'Circle no longer needs to inherit from Shape.',
        'Remove ABC import, use Protocol. Circle stands alone with matching methods.',
      ],
      concepts: ['refactoring', 'ABC to Protocol', 'structural subtyping'],
    },
    {
      id: 'py-proto-20',
      title: 'Refactor duck typing to Protocol',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Add Protocol type hints to untyped duck-typing code.',
      skeleton: `# No type hints -- pure duck typing
def process_items(processor, items):
    """processor must have .validate(item) and .transform(item) methods"""
    results = []
    for item in items:
        if processor.validate(item):
            results.append(processor.transform(item))
    return results

class StringProcessor:
    def validate(self, item):
        return isinstance(item, str) and len(item) > 0

    def transform(self, item):
        return item.upper()

output = process_items(StringProcessor(), ["hello", "", "world"])
print(output)`,
      solution: `from typing import Protocol, Any

class ItemProcessor(Protocol):
    def validate(self, item: Any) -> bool: ...
    def transform(self, item: Any) -> Any: ...

def process_items(processor: ItemProcessor, items: list[Any]) -> list[Any]:
    results = []
    for item in items:
        if processor.validate(item):
            results.append(processor.transform(item))
    return results

class StringProcessor:
    def validate(self, item: Any) -> bool:
        return isinstance(item, str) and len(item) > 0

    def transform(self, item: Any) -> Any:
        return item.upper()

output = process_items(StringProcessor(), ["hello", "", "world"])
print(output)`,
      hints: [
        'Define a Protocol that captures the expected interface.',
        'The Protocol needs validate(item) -> bool and transform(item) -> Any.',
        'Add type hints to process_items using the new Protocol.',
      ],
      concepts: ['refactoring', 'duck typing', 'Protocol', 'type hints'],
    },
  ],
};
