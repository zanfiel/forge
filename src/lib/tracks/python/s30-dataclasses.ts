import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-dataclasses',
  title: '30. Dataclasses',
  explanation: `## Dataclasses

The \\\`dataclasses\\\` module (Python 3.7+) auto-generates boilerplate for classes that primarily store data.

### @dataclass Basics
\\\`\\\`\\\`python
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float
\\\`\\\`\\\`
This auto-generates \\\`__init__\\\`, \\\`__repr__\\\`, and \\\`__eq__\\\`.

### field() Function
Customize individual fields: default values, default_factory for mutable defaults, repr, compare, hash, metadata.

### Immutability with frozen=True
\\\`@dataclass(frozen=True)\\\` makes instances hashable and immutable.

### Ordering
\\\`@dataclass(order=True)\\\` generates \\\`__lt__\\\`, \\\`__le__\\\`, \\\`__gt__\\\`, \\\`__ge__\\\`.

### __post_init__
Called after \\\`__init__\\\` for validation or computed fields.

### InitVar & ClassVar
- \\\`InitVar[T]\\\` -- passed to __init__ but not stored as a field
- \\\`ClassVar[T]\\\` -- class-level attribute, not an instance field

### Conversion Utilities
- \\\`asdict()\\\` / \\\`astuple()\\\` -- convert to dict/tuple
- \\\`replace()\\\` -- create a copy with modified fields

### Modern Features
- \\\`slots=True\\\` (3.10+) -- use __slots__ for memory efficiency
- \\\`kw_only=True\\\` (3.10+) -- all fields are keyword-only
- \\\`match_args=True\\\` (3.10+) -- enables pattern matching support
`,
  exercises: [
    {
      id: 'py-dc-1',
      title: 'Basic dataclass',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Apply the dataclass decorator to auto-generate __init__ and __repr__.',
      skeleton: `from dataclasses import __BLANK__

__BLANK__
class User:
    name: str
    age: int

u = User("Alice", 30)
print(u)`,
      solution: `from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int

u = User("Alice", 30)
print(u)`,
      hints: [
        'Import and apply the dataclass decorator.',
        'The decorator goes on the line before the class definition.',
        'The answer is: dataclass, then @dataclass',
      ],
      concepts: ['@dataclass', '__init__', '__repr__'],
    },
    {
      id: 'py-dc-2',
      title: 'Default values',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Add a default value for the active field.',
      skeleton: `from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int
    active: bool __BLANK__

u = User("Alice", 30)
print(u.active)  # True`,
      solution: `from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int
    active: bool = True

u = User("Alice", 30)
print(u.active)  # True`,
      hints: [
        'Default values use the same syntax as function defaults.',
        'Fields with defaults must come after fields without defaults.',
        'The answer is: = True',
      ],
      concepts: ['default values', 'field ordering'],
    },
    {
      id: 'py-dc-3',
      title: 'Mutable default with field()',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use field() with default_factory for a mutable default value.',
      skeleton: `from dataclasses import dataclass, field

@dataclass
class Team:
    name: str
    members: list[str] = __BLANK__(default_factory=list)

t = Team("Dev")
t.members.append("Alice")
print(t)`,
      solution: `from dataclasses import dataclass, field

@dataclass
class Team:
    name: str
    members: list[str] = field(default_factory=list)

t = Team("Dev")
t.members.append("Alice")
print(t)`,
      hints: [
        'Mutable defaults (like lists) must use field(default_factory=...).',
        'default_factory is called to create a new default for each instance.',
        'The answer is: field',
      ],
      concepts: ['field()', 'default_factory', 'mutable defaults'],
    },
    {
      id: 'py-dc-4',
      title: 'Frozen dataclass',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Make the dataclass immutable (frozen).',
      skeleton: `from dataclasses import dataclass

@dataclass(__BLANK__=True)
class Point:
    x: float
    y: float

p = Point(1.0, 2.0)
print(p)
# p.x = 3.0  # This would raise FrozenInstanceError`,
      solution: `from dataclasses import dataclass

@dataclass(frozen=True)
class Point:
    x: float
    y: float

p = Point(1.0, 2.0)
print(p)
# p.x = 3.0  # This would raise FrozenInstanceError`,
      hints: [
        'frozen=True makes the dataclass immutable after creation.',
        'Frozen dataclasses are also hashable.',
        'The answer is: frozen',
      ],
      concepts: ['frozen', 'immutability', 'hashable'],
    },
    {
      id: 'py-dc-5',
      title: '__post_init__ validation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use __post_init__ to validate that age is non-negative.',
      skeleton: `from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int

    def __BLANK__(self):
        if self.age < 0:
            raise ValueError("Age cannot be negative")

p = Person("Alice", 30)
print(p)`,
      solution: `from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int

    def __post_init__(self):
        if self.age < 0:
            raise ValueError("Age cannot be negative")

p = Person("Alice", 30)
print(p)`,
      hints: [
        '__post_init__ is called automatically after __init__.',
        'It is the perfect place for validation logic.',
        'The answer is: __post_init__',
      ],
      concepts: ['__post_init__', 'validation'],
    },
    {
      id: 'py-dc-6',
      title: 'Ordering support',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Enable ordering comparison on the dataclass.',
      skeleton: `from dataclasses import dataclass

@dataclass(__BLANK__=True)
class Version:
    major: int
    minor: int
    patch: int

v1 = Version(1, 2, 0)
v2 = Version(1, 3, 0)
print(v1 < v2)  # True`,
      solution: `from dataclasses import dataclass

@dataclass(order=True)
class Version:
    major: int
    minor: int
    patch: int

v1 = Version(1, 2, 0)
v2 = Version(1, 3, 0)
print(v1 < v2)  # True`,
      hints: [
        'order=True generates comparison methods (__lt__, __gt__, etc.).',
        'Fields are compared in declaration order.',
        'The answer is: order',
      ],
      concepts: ['order', 'comparison methods'],
    },
    {
      id: 'py-dc-7',
      title: 'Predict dataclass equality',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does this dataclass equality check output?',
      skeleton: `from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

p1 = Point(1, 2)
p2 = Point(1, 2)
p3 = Point(3, 4)
print(p1 == p2)
print(p1 == p3)`,
      solution: `True
False`,
      hints: [
        '@dataclass auto-generates __eq__ that compares all fields.',
        'p1 and p2 have the same x and y values.',
        'The output is True then False.',
      ],
      concepts: ['__eq__', 'value equality'],
    },
    {
      id: 'py-dc-8',
      title: 'Predict asdict output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does asdict return for a nested dataclass?',
      skeleton: `from dataclasses import dataclass, asdict

@dataclass
class Address:
    city: str

@dataclass
class Person:
    name: str
    address: Address

p = Person("Alice", Address("NYC"))
print(asdict(p))`,
      solution: `{'name': 'Alice', 'address': {'city': 'NYC'}}`,
      hints: [
        'asdict recursively converts dataclasses to dictionaries.',
        'Nested dataclasses are also converted to dicts.',
        'The output is a nested dict structure.',
      ],
      concepts: ['asdict', 'nested dataclasses', 'serialization'],
    },
    {
      id: 'py-dc-9',
      title: 'Predict replace output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does replace() return?',
      skeleton: `from dataclasses import dataclass, replace

@dataclass
class Config:
    host: str
    port: int
    debug: bool

c1 = Config("localhost", 8080, False)
c2 = replace(c1, debug=True, port=9090)
print(c2)
print(c1.debug)`,
      solution: `Config(host='localhost', port=9090, debug=True)
False`,
      hints: [
        'replace() creates a shallow copy with overridden fields.',
        'The original instance is not modified.',
        'c2 gets the new values, c1 stays unchanged.',
      ],
      concepts: ['replace()', 'immutable update'],
    },
    {
      id: 'py-dc-10',
      title: 'Fix mutable default bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Fix the dataclass that raises an error due to a mutable default value.',
      skeleton: `from dataclasses import dataclass

@dataclass
class ShoppingCart:
    owner: str
    items: list[str] = []  # Bug: mutable default

cart = ShoppingCart("Alice")
cart.items.append("Book")
print(cart)`,
      solution: `from dataclasses import dataclass, field

@dataclass
class ShoppingCart:
    owner: str
    items: list[str] = field(default_factory=list)

cart = ShoppingCart("Alice")
cart.items.append("Book")
print(cart)`,
      hints: [
        'Dataclasses do not allow mutable default values directly.',
        'Use field(default_factory=list) for mutable defaults.',
        'Import field from dataclasses and wrap the default.',
      ],
      concepts: ['mutable default error', 'field()', 'default_factory'],
    },
    {
      id: 'py-dc-11',
      title: 'Fix field ordering',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the dataclass that has fields with defaults before fields without defaults.',
      skeleton: `from dataclasses import dataclass

# Bug: field with default (active) before field without default (email)
@dataclass
class User:
    name: str
    active: bool = True
    email: str

u = User("Alice", True, "alice@example.com")
print(u)`,
      solution: `from dataclasses import dataclass

# Fixed: fields without defaults come first
@dataclass
class User:
    name: str
    email: str
    active: bool = True

u = User("Alice", "alice@example.com")
print(u)`,
      hints: [
        'Fields without defaults must come before fields with defaults.',
        'Reorder so email (no default) comes before active (has default).',
        'Move email before active in the class definition.',
      ],
      concepts: ['field ordering', 'default values'],
    },
    {
      id: 'py-dc-12',
      title: 'Fix frozen modification',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code that tries to modify a frozen dataclass instance.',
      skeleton: `from dataclasses import dataclass, replace

@dataclass(frozen=True)
class Config:
    host: str
    port: int

c = Config("localhost", 8080)
# Bug: cannot assign to frozen instance
c.port = 9090
print(c)`,
      solution: `from dataclasses import dataclass, replace

@dataclass(frozen=True)
class Config:
    host: str
    port: int

c = Config("localhost", 8080)
# Fixed: use replace() to create a new instance
c = replace(c, port=9090)
print(c)`,
      hints: [
        'Frozen dataclasses cannot be modified after creation.',
        'Use replace() to create a new instance with changed values.',
        'Replace the assignment with c = replace(c, port=9090).',
      ],
      concepts: ['frozen', 'replace()', 'immutability'],
    },
    {
      id: 'py-dc-13',
      title: 'Write a dataclass with computed field',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Rectangle dataclass with width and height fields and a computed area property.',
      skeleton: `from dataclasses import dataclass

# Write Rectangle with width, height, and computed area

r = Rectangle(5, 3)
print(r.area)  # 15
print(r)`,
      solution: `from dataclasses import dataclass

@dataclass
class Rectangle:
    width: float
    height: float

    @property
    def area(self) -> float:
        return self.width * self.height

r = Rectangle(5, 3)
print(r.area)  # 15
print(r)`,
      hints: [
        'Use @property for computed values that should not be stored.',
        'Properties are not dataclass fields and do not appear in __repr__.',
        'Define area as a @property that returns width * height.',
      ],
      concepts: ['@property', 'computed fields', '@dataclass'],
    },
    {
      id: 'py-dc-14',
      title: 'Write dataclass with InitVar',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a dataclass that takes a password in __init__ but stores only the hash.',
      skeleton: `from dataclasses import dataclass, field, InitVar
import hashlib

# Write a User dataclass:
# - name: str
# - password: InitVar[str] (not stored)
# - password_hash: str (computed in __post_init__)

u = User("Alice", "secret123")
print(u.name)
print(u.password_hash)  # Should be a hash, not the raw password`,
      solution: `from dataclasses import dataclass, field, InitVar
import hashlib

@dataclass
class User:
    name: str
    password: InitVar[str]
    password_hash: str = field(init=False)

    def __post_init__(self, password: str) -> None:
        self.password_hash = hashlib.sha256(password.encode()).hexdigest()

u = User("Alice", "secret123")
print(u.name)
print(u.password_hash)`,
      hints: [
        'InitVar[str] creates a parameter passed to __init__ but not stored.',
        'The InitVar value is passed as an argument to __post_init__.',
        'Use field(init=False) for password_hash so it is computed, not passed.',
      ],
      concepts: ['InitVar', '__post_init__', 'field(init=False)'],
    },
    {
      id: 'py-dc-15',
      title: 'Write dataclass inheritance',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a base Shape dataclass and a Circle subclass that adds radius.',
      skeleton: `from dataclasses import dataclass
import math

# Write Shape (color: str) and Circle(Shape) adding radius: float
# Circle should have an area() method

c = Circle("red", 5.0)
print(c.color)       # red
print(f"{c.area():.2f}")  # 78.54`,
      solution: `from dataclasses import dataclass
import math

@dataclass
class Shape:
    color: str

@dataclass
class Circle(Shape):
    radius: float

    def area(self) -> float:
        return math.pi * self.radius ** 2

c = Circle("red", 5.0)
print(c.color)       # red
print(f"{c.area():.2f}")  # 78.54`,
      hints: [
        'Child dataclass inherits parent fields.',
        'Parent fields come first in the __init__ signature.',
        'Circle(Shape) inherits color and adds radius.',
      ],
      concepts: ['dataclass inheritance', 'field order'],
    },
    {
      id: 'py-dc-16',
      title: 'Write a slots dataclass',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a dataclass using slots=True for memory efficiency and verify it works.',
      skeleton: `from dataclasses import dataclass
import sys

# Write a Point dataclass with slots=True
# Compare memory usage with a regular class

p = Point(1.0, 2.0)
print(p)
print(hasattr(p, "__slots__"))  # True
print(hasattr(p, "__dict__"))   # False`,
      solution: `from dataclasses import dataclass
import sys

@dataclass(slots=True)
class Point:
    x: float
    y: float

p = Point(1.0, 2.0)
print(p)
print(hasattr(p, "__slots__"))  # True
print(hasattr(p, "__dict__"))   # False`,
      hints: [
        'slots=True (Python 3.10+) generates __slots__ automatically.',
        'Slotted classes do not have __dict__ and use less memory.',
        'Add slots=True to the @dataclass decorator.',
      ],
      concepts: ['slots=True', '__slots__', 'memory efficiency'],
    },
    {
      id: 'py-dc-17',
      title: 'Write a kw_only dataclass',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a Config dataclass where all fields must be passed as keyword arguments.',
      skeleton: `from dataclasses import dataclass

# Write Config with kw_only=True
# Fields: host (str), port (int), debug (bool)

c = Config(host="localhost", port=8080, debug=True)
print(c)`,
      solution: `from dataclasses import dataclass

@dataclass(kw_only=True)
class Config:
    host: str
    port: int
    debug: bool

c = Config(host="localhost", port=8080, debug=True)
print(c)`,
      hints: [
        'kw_only=True (Python 3.10+) requires keyword arguments only.',
        'This prevents positional argument mistakes with many fields.',
        'Add kw_only=True to the @dataclass decorator.',
      ],
      concepts: ['kw_only', 'keyword-only arguments'],
    },
    {
      id: 'py-dc-18',
      title: 'Write a dataclass with field metadata',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a dataclass with field metadata for validation constraints.',
      skeleton: `from dataclasses import dataclass, field, fields

# Write a Product dataclass with metadata for min/max constraints
# Validate constraints in __post_init__

p = Product("Widget", 9.99, 100)
print(p)
for f in fields(p):
    print(f"{f.name}: {f.metadata}")`,
      solution: `from dataclasses import dataclass, field, fields

@dataclass
class Product:
    name: str = field(metadata={"min_length": 1})
    price: float = field(metadata={"min": 0.0, "max": 10000.0})
    stock: int = field(metadata={"min": 0})

    def __post_init__(self) -> None:
        for f in fields(self):
            value = getattr(self, f.name)
            if "min" in f.metadata and isinstance(value, (int, float)):
                if value < f.metadata["min"]:
                    raise ValueError(f"{f.name} below minimum")

p = Product("Widget", 9.99, 100)
print(p)
for f in fields(p):
    print(f"{f.name}: {f.metadata}")`,
      hints: [
        'field(metadata={...}) attaches arbitrary metadata to fields.',
        'Access metadata via dataclasses.fields() at runtime.',
        'Use __post_init__ to validate against metadata constraints.',
      ],
      concepts: ['field metadata', 'validation', 'fields()'],
    },
    {
      id: 'py-dc-19',
      title: 'Refactor regular class to dataclass',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Refactor the verbose class into a concise dataclass.',
      skeleton: `class Employee:
    def __init__(self, name, department, salary):
        self.name = name
        self.department = department
        self.salary = salary

    def __repr__(self):
        return f"Employee(name={self.name!r}, department={self.department!r}, salary={self.salary!r})"

    def __eq__(self, other):
        if not isinstance(other, Employee):
            return NotImplemented
        return (self.name, self.department, self.salary) == (other.name, other.department, other.salary)

e = Employee("Alice", "Engineering", 95000)
print(e)`,
      solution: `from dataclasses import dataclass

@dataclass
class Employee:
    name: str
    department: str
    salary: int

e = Employee("Alice", "Engineering", 95000)
print(e)`,
      hints: [
        '@dataclass auto-generates __init__, __repr__, and __eq__.',
        'Just declare the fields with type annotations.',
        'Remove the entire __init__, __repr__, and __eq__ methods.',
      ],
      concepts: ['refactoring', '@dataclass', 'boilerplate removal'],
    },
    {
      id: 'py-dc-20',
      title: 'Refactor namedtuple to dataclass',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the namedtuple to a dataclass with additional functionality.',
      skeleton: `from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])

def distance(p1, p2):
    return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** 0.5

p1 = Point(0, 0)
p2 = Point(3, 4)
print(distance(p1, p2))`,
      solution: `from dataclasses import dataclass

@dataclass(frozen=True)
class Point:
    x: float
    y: float

    def distance(self, other: "Point") -> float:
        return ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** 0.5

p1 = Point(0, 0)
p2 = Point(3, 4)
print(p1.distance(p2))`,
      hints: [
        'namedtuples are immutable, so use frozen=True to match behavior.',
        'Move the distance function into the class as a method.',
        'Dataclasses allow methods, namedtuples make it awkward.',
      ],
      concepts: ['namedtuple to dataclass', 'refactoring', 'frozen'],
    },
  ],
};
