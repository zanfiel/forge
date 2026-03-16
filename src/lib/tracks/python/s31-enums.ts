import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-enums',
  title: '31. Enums',
  explanation: `## Enums

Python's \\\`enum\\\` module (Python 3.4+) provides support for enumerations -- a set of symbolic names bound to unique values.

### Enum Basics
\\\`\\\`\\\`python
from enum import Enum

class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3
\\\`\\\`\\\`

### auto()
\\\`auto()\\\` automatically assigns incrementing values.

### Value & Name
- \\\`member.value\\\` -- the assigned value
- \\\`member.name\\\` -- the string name

### Enum Variants
- **\\\`IntEnum\\\`** -- members are also ints, comparable with integers
- **\\\`StrEnum\\\`** (3.11+) -- members are also strings
- **\\\`Flag\\\`** -- supports bitwise operations
- **\\\`IntFlag\\\`** -- Flag with int compatibility

### Special Features
- \\\`@unique\\\` decorator ensures no duplicate values
- Enums are iterable
- Aliases: multiple names for the same value
- Functional API: \\\`Color = Enum("Color", ["RED", "GREEN", "BLUE"])\\\`
- Enums support methods and \\\`__init__\\\`

### Pattern Matching
Enums work with Python 3.10+ match/case statements.

### Serialization
Access via value: \\\`Color(1)\\\` or name: \\\`Color["RED"]\\\`.
`,
  exercises: [
    {
      id: 'py-enm-1',
      title: 'Define an Enum',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a simple enum for cardinal directions.',
      skeleton: `from enum import __BLANK__

class Direction(__BLANK__):
    NORTH = 1
    SOUTH = 2
    EAST = 3
    WEST = 4

print(Direction.NORTH)`,
      solution: `from enum import Enum

class Direction(Enum):
    NORTH = 1
    SOUTH = 2
    EAST = 3
    WEST = 4

print(Direction.NORTH)`,
      hints: [
        'Import Enum from the enum module.',
        'The class inherits from Enum.',
        'The answer is: Enum',
      ],
      concepts: ['Enum', 'enum definition'],
    },
    {
      id: 'py-enm-2',
      title: 'Use auto()',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use auto() to automatically assign values to enum members.',
      skeleton: `from enum import Enum, __BLANK__

class Priority(Enum):
    LOW = __BLANK__()
    MEDIUM = __BLANK__()
    HIGH = __BLANK__()

print(Priority.LOW.value)`,
      solution: `from enum import Enum, auto

class Priority(Enum):
    LOW = auto()
    MEDIUM = auto()
    HIGH = auto()

print(Priority.LOW.value)`,
      hints: [
        'auto() generates sequential values automatically.',
        'Import auto from the enum module.',
        'The answer is: auto',
      ],
      concepts: ['auto()', 'automatic values'],
    },
    {
      id: 'py-enm-3',
      title: 'Access name and value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Access both the name and value of an enum member.',
      skeleton: `from enum import Enum

class Status(Enum):
    ACTIVE = 1
    INACTIVE = 0

s = Status.ACTIVE
print(s.__BLANK__)   # "ACTIVE"
print(s.__BLANK__)   # 1`,
      solution: `from enum import Enum

class Status(Enum):
    ACTIVE = 1
    INACTIVE = 0

s = Status.ACTIVE
print(s.name)    # "ACTIVE"
print(s.value)   # 1`,
      hints: [
        'Every enum member has .name and .value attributes.',
        '.name gives the string name, .value gives the assigned value.',
        'The answers are: name and value',
      ],
      concepts: ['.name', '.value', 'member attributes'],
    },
    {
      id: 'py-enm-4',
      title: 'StrEnum',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Create a StrEnum where members are actual string values.',
      skeleton: `from enum import __BLANK__

class MediaType(__BLANK__):
    JSON = "application/json"
    HTML = "text/html"
    TEXT = "text/plain"

# StrEnum members work as strings directly
print("Content-Type: " + MediaType.JSON)`,
      solution: `from enum import StrEnum

class MediaType(StrEnum):
    JSON = "application/json"
    HTML = "text/html"
    TEXT = "text/plain"

# StrEnum members work as strings directly
print("Content-Type: " + MediaType.JSON)`,
      hints: [
        'StrEnum (Python 3.11+) makes members actual strings.',
        'Members can be used directly in string operations.',
        'The answer is: StrEnum',
      ],
      concepts: ['StrEnum', 'string compatibility'],
    },
    {
      id: 'py-enm-5',
      title: 'Flag enum',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Create a Flag enum for permissions that supports bitwise operations.',
      skeleton: `from enum import __BLANK__, auto

class Permission(__BLANK__):
    READ = auto()
    WRITE = auto()
    EXECUTE = auto()

perms = Permission.READ __BLANK__ Permission.WRITE
print(perms)`,
      solution: `from enum import Flag, auto

class Permission(Flag):
    READ = auto()
    WRITE = auto()
    EXECUTE = auto()

perms = Permission.READ | Permission.WRITE
print(perms)`,
      hints: [
        'Flag enums support bitwise OR, AND, XOR operations.',
        'Use | to combine flag members.',
        'The answer is: Flag, then |',
      ],
      concepts: ['Flag', 'bitwise operations', 'permissions'],
    },
    {
      id: 'py-enm-6',
      title: '@unique decorator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Apply the @unique decorator to prevent duplicate values.',
      skeleton: `from enum import Enum, __BLANK__

@__BLANK__
class Shape(Enum):
    CIRCLE = 1
    SQUARE = 2
    TRIANGLE = 3

print(list(Shape))`,
      solution: `from enum import Enum, unique

@unique
class Shape(Enum):
    CIRCLE = 1
    SQUARE = 2
    TRIANGLE = 3

print(list(Shape))`,
      hints: [
        '@unique raises ValueError if any values are duplicated.',
        'Import unique from the enum module.',
        'The answer is: unique',
      ],
      concepts: ['@unique', 'duplicate prevention'],
    },
    {
      id: 'py-enm-7',
      title: 'Predict enum iteration',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does iterating over an enum produce?',
      skeleton: `from enum import Enum

class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

for c in Color:
    print(c.name, end=" ")`,
      solution: `RED GREEN BLUE `,
      hints: [
        'Enums are iterable; iteration yields the members.',
        'Each member has a .name attribute.',
        'The output is: RED GREEN BLUE',
      ],
      concepts: ['enum iteration', '.name'],
    },
    {
      id: 'py-enm-8',
      title: 'Predict enum identity',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What do these enum comparisons output?',
      skeleton: `from enum import Enum

class Color(Enum):
    RED = 1
    GREEN = 2

print(Color.RED == Color.RED)
print(Color.RED == 1)
print(Color.RED is Color.RED)`,
      solution: `True
False
True`,
      hints: [
        'Enum members compare equal only to themselves, not to raw values.',
        'Color.RED == 1 is False because Enum does not equal its value.',
        'The is check is True because enum members are singletons.',
      ],
      concepts: ['enum equality', 'identity', 'singleton'],
    },
    {
      id: 'py-enm-9',
      title: 'Predict alias behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What happens with enum aliases (duplicate values)?',
      skeleton: `from enum import Enum

class Shape(Enum):
    CIRCLE = 1
    ROUND = 1
    SQUARE = 2

print(Shape.CIRCLE is Shape.ROUND)
print(len(list(Shape)))`,
      solution: `True
2`,
      hints: [
        'Duplicate values create aliases, not new members.',
        'ROUND is an alias for CIRCLE, they are the same member.',
        'Iteration only yields canonical members, not aliases.',
      ],
      concepts: ['aliases', 'duplicate values', 'canonical members'],
    },
    {
      id: 'py-enm-10',
      title: 'Fix enum comparison',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Fix the code that compares an enum to its raw value incorrectly.',
      skeleton: `from enum import Enum

class Status(Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"

status = Status.ACTIVE
# Bug: comparing enum to string directly
if status == "active":
    print("User is active")
else:
    print("Not active")`,
      solution: `from enum import Enum

class Status(Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"

status = Status.ACTIVE
# Fixed: compare enum to enum member
if status == Status.ACTIVE:
    print("User is active")
else:
    print("Not active")`,
      hints: [
        'Regular Enum members do not equal their raw values.',
        'Compare against the enum member, not the string.',
        'Change "active" to Status.ACTIVE in the comparison.',
      ],
      concepts: ['enum comparison', 'common mistake'],
    },
    {
      id: 'py-enm-11',
      title: 'Fix enum value lookup',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code that tries to look up an enum member by name incorrectly.',
      skeleton: `from enum import Enum

class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

# Bug: using () for name lookup instead of []
color_name = "RED"
color = Color(color_name)
print(color)`,
      solution: `from enum import Enum

class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

# Fixed: use [] for name lookup, () is for value lookup
color_name = "RED"
color = Color[color_name]
print(color)`,
      hints: [
        'Color("RED") looks up by value, not name.',
        'Color["RED"] looks up by name.',
        'Use square brackets for name-based access.',
      ],
      concepts: ['name lookup', 'value lookup', '[] vs ()'],
    },
    {
      id: 'py-enm-12',
      title: 'Fix IntFlag combination',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the Flag values that do not work correctly for bitwise operations.',
      skeleton: `from enum import Flag

class Permission(Flag):
    # Bug: values must be powers of 2 for proper bitwise ops
    READ = 1
    WRITE = 2
    EXECUTE = 3  # Wrong! Should be 4

combined = Permission.READ | Permission.WRITE | Permission.EXECUTE
print(Permission.READ in combined)`,
      solution: `from enum import Flag

class Permission(Flag):
    # Fixed: values are powers of 2
    READ = 1
    WRITE = 2
    EXECUTE = 4

combined = Permission.READ | Permission.WRITE | Permission.EXECUTE
print(Permission.READ in combined)`,
      hints: [
        'Flag values must be powers of 2 for bitwise operations to work.',
        '3 in binary is 11, which overlaps with READ|WRITE.',
        'Change EXECUTE from 3 to 4 (or use auto()).',
      ],
      concepts: ['Flag values', 'powers of 2', 'bitwise operations'],
    },
    {
      id: 'py-enm-13',
      title: 'Write an enum with methods',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Suit enum for playing cards with a color() method.',
      skeleton: `from enum import Enum

# Write Suit enum: HEARTS, DIAMONDS, CLUBS, SPADES
# Add a color() method: hearts/diamonds -> "red", clubs/spades -> "black"

print(Suit.HEARTS.color())   # red
print(Suit.SPADES.color())   # black`,
      solution: `from enum import Enum

class Suit(Enum):
    HEARTS = "hearts"
    DIAMONDS = "diamonds"
    CLUBS = "clubs"
    SPADES = "spades"

    def color(self) -> str:
        if self in (Suit.HEARTS, Suit.DIAMONDS):
            return "red"
        return "black"

print(Suit.HEARTS.color())   # red
print(Suit.SPADES.color())   # black`,
      hints: [
        'Enums can have regular methods defined in the class body.',
        'Methods can reference other members using the class name.',
        'Check self against member values to determine the color.',
      ],
      concepts: ['enum methods', 'self reference'],
    },
    {
      id: 'py-enm-14',
      title: 'Write an enum with __init__',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a Planet enum where each member stores mass and radius as tuple values.',
      skeleton: `from enum import Enum

# Write Planet enum with EARTH and MARS
# Each member value is (mass, radius)
# Add a surface_gravity() method: mass / (radius ** 2)

print(Planet.EARTH.surface_gravity())
print(Planet.MARS.surface_gravity())`,
      solution: `from enum import Enum

class Planet(Enum):
    EARTH = (5.976e24, 6.37814e6)
    MARS = (6.421e23, 3.3972e6)

    def __init__(self, mass: float, radius: float) -> None:
        self.mass = mass
        self.radius = radius

    def surface_gravity(self) -> float:
        return self.mass / (self.radius ** 2)

print(Planet.EARTH.surface_gravity())
print(Planet.MARS.surface_gravity())`,
      hints: [
        'When enum values are tuples, define __init__ to unpack them.',
        '__init__ receives the tuple elements as separate arguments.',
        'Store mass and radius as instance attributes.',
      ],
      concepts: ['enum __init__', 'tuple values', 'computed properties'],
    },
    {
      id: 'py-enm-15',
      title: 'Write functional API enum',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Create an enum using the functional API from a list of strings.',
      skeleton: `from enum import Enum

# Create a Weekday enum using the functional API
# Members: MONDAY through SUNDAY

for day in Weekday:
    print(day.name, day.value)`,
      solution: `from enum import Enum

Weekday = Enum("Weekday", ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"])

for day in Weekday:
    print(day.name, day.value)`,
      hints: [
        'The functional API: Enum("Name", ["MEMBER1", "MEMBER2", ...]).',
        'Values are auto-assigned starting from 1.',
        'This is equivalent to a class definition with auto().',
      ],
      concepts: ['functional API', 'dynamic enum creation'],
    },
    {
      id: 'py-enm-16',
      title: 'Write enum serialization',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write functions to serialize and deserialize enums to/from JSON-compatible values.',
      skeleton: `from enum import Enum
import json

class Status(Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    PENDING = "pending"

def to_json(status):
    # Convert enum to JSON-serializable value
    pass

def from_json(value):
    # Convert JSON value back to enum
    pass

s = Status.ACTIVE
j = to_json(s)
print(j)                    # "active"
print(from_json(j) == s)    # True`,
      solution: `from enum import Enum
import json

class Status(Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    PENDING = "pending"

def to_json(status: Status) -> str:
    return status.value

def from_json(value: str) -> Status:
    return Status(value)

s = Status.ACTIVE
j = to_json(s)
print(j)                    # "active"
print(from_json(j) == s)    # True`,
      hints: [
        'Use .value to get the serializable value from an enum.',
        'Use Enum(value) to reconstruct from a value.',
        'Status("active") returns Status.ACTIVE.',
      ],
      concepts: ['serialization', '.value', 'value lookup'],
    },
    {
      id: 'py-enm-17',
      title: 'Write enum in match/case',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that uses match/case with an enum to return descriptions.',
      skeleton: `from enum import Enum, auto

class HttpStatus(Enum):
    OK = 200
    NOT_FOUND = 404
    SERVER_ERROR = 500

def describe(status):
    # Use match/case to return a description string
    pass

print(describe(HttpStatus.OK))           # "Success"
print(describe(HttpStatus.NOT_FOUND))    # "Not Found"
print(describe(HttpStatus.SERVER_ERROR)) # "Server Error"`,
      solution: `from enum import Enum, auto

class HttpStatus(Enum):
    OK = 200
    NOT_FOUND = 404
    SERVER_ERROR = 500

def describe(status: HttpStatus) -> str:
    match status:
        case HttpStatus.OK:
            return "Success"
        case HttpStatus.NOT_FOUND:
            return "Not Found"
        case HttpStatus.SERVER_ERROR:
            return "Server Error"
        case _:
            return "Unknown"

print(describe(HttpStatus.OK))           # "Success"
print(describe(HttpStatus.NOT_FOUND))    # "Not Found"
print(describe(HttpStatus.SERVER_ERROR)) # "Server Error"`,
      hints: [
        'match/case works with enum members as patterns.',
        'Use the fully qualified name: HttpStatus.OK as the pattern.',
        'Include a wildcard _ case for safety.',
      ],
      concepts: ['match/case', 'enum patterns', 'Python 3.10+'],
    },
    {
      id: 'py-enm-18',
      title: 'Write a Flag permissions system',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that checks if a user has specific permissions using Flag enum.',
      skeleton: `from enum import Flag, auto

class Perm(Flag):
    READ = auto()
    WRITE = auto()
    EXECUTE = auto()
    ADMIN = READ | WRITE | EXECUTE

def has_permission(user_perms, required):
    # Check if user_perms includes all required permissions
    pass

admin = Perm.ADMIN
reader = Perm.READ
print(has_permission(admin, Perm.WRITE))             # True
print(has_permission(reader, Perm.READ | Perm.WRITE)) # False`,
      solution: `from enum import Flag, auto

class Perm(Flag):
    READ = auto()
    WRITE = auto()
    EXECUTE = auto()
    ADMIN = READ | WRITE | EXECUTE

def has_permission(user_perms: Perm, required: Perm) -> bool:
    return (user_perms & required) == required

admin = Perm.ADMIN
reader = Perm.READ
print(has_permission(admin, Perm.WRITE))             # True
print(has_permission(reader, Perm.READ | Perm.WRITE)) # False`,
      hints: [
        'Use bitwise AND (&) to check for flags.',
        'If (perms & required) == required, all required flags are present.',
        'This is a standard bitmask check pattern.',
      ],
      concepts: ['Flag', 'bitwise AND', 'permission checking'],
    },
    {
      id: 'py-enm-19',
      title: 'Refactor constants to enum',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Refactor the module-level constants into a proper enum.',
      skeleton: `# Current: scattered constants
STATUS_PENDING = 0
STATUS_ACTIVE = 1
STATUS_CLOSED = 2

def describe_status(status):
    if status == STATUS_PENDING:
        return "Pending"
    elif status == STATUS_ACTIVE:
        return "Active"
    elif status == STATUS_CLOSED:
        return "Closed"
    return "Unknown"

print(describe_status(STATUS_ACTIVE))`,
      solution: `from enum import Enum

class Status(Enum):
    PENDING = 0
    ACTIVE = 1
    CLOSED = 2

    def describe(self) -> str:
        return self.name.capitalize()

print(Status.ACTIVE.describe())`,
      hints: [
        'Group related constants into an Enum class.',
        'The describe logic can become a method on the enum.',
        'This eliminates the need for a separate function.',
      ],
      concepts: ['refactoring', 'constants to enum', 'encapsulation'],
    },
    {
      id: 'py-enm-20',
      title: 'Refactor string checks to StrEnum',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor raw string comparisons to use StrEnum for type safety.',
      skeleton: `def handle_event(event_type):
    if event_type == "click":
        return "Handling click"
    elif event_type == "hover":
        return "Handling hover"
    elif event_type == "scroll":
        return "Handling scroll"
    return "Unknown event"

print(handle_event("click"))
# Bug-prone: typos like "Click" or "clck" silently fail`,
      solution: `from enum import StrEnum

class EventType(StrEnum):
    CLICK = "click"
    HOVER = "hover"
    SCROLL = "scroll"

def handle_event(event_type: EventType) -> str:
    match event_type:
        case EventType.CLICK:
            return "Handling click"
        case EventType.HOVER:
            return "Handling hover"
        case EventType.SCROLL:
            return "Handling scroll"
        case _:
            return "Unknown event"

print(handle_event(EventType.CLICK))`,
      hints: [
        'StrEnum ensures only valid event types can be used.',
        'Typos are caught by the type checker at development time.',
        'StrEnum members work as strings for backwards compatibility.',
      ],
      concepts: ['StrEnum', 'type safety', 'refactoring'],
    },
  ],
};
