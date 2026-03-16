import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-magic',
  title: '18. Magic Methods',
  explanation: `## Magic Methods (Dunder Methods)

Magic methods (double-underscore or "dunder") let your classes integrate with Python's built-in operations.

### String Representations
- \\\`__str__(self)\\\` -- human-readable (\\\`print()\\\`, \\\`str()\\\`)
- \\\`__repr__(self)\\\` -- developer-readable (\\\`repr()\\\`, REPL)

### Container Protocol
- \\\`__len__(self)\\\` -- \\\`len(obj)\\\`
- \\\`__getitem__(self, key)\\\` -- \\\`obj[key]\\\`
- \\\`__setitem__(self, key, value)\\\` -- \\\`obj[key] = value\\\`
- \\\`__contains__(self, item)\\\` -- \\\`item in obj\\\`

### Comparison
- \\\`__eq__\\\`, \\\`__ne__\\\`, \\\`__lt__\\\`, \\\`__le__\\\`, \\\`__gt__\\\`, \\\`__ge__\\\`
- Use \\\`@functools.total_ordering\\\` to auto-generate from \\\`__eq__\\\` + one other.

### Arithmetic
- \\\`__add__\\\`, \\\`__sub__\\\`, \\\`__mul__\\\`, \\\`__truediv__\\\`
- Return \\\`NotImplemented\\\` for unsupported operand types.

### Boolean
- \\\`__bool__(self)\\\` -- \\\`bool(obj)\\\`, truthiness in \\\`if\\\`.

### Iteration
- \\\`__iter__(self)\\\` / \\\`__next__(self)\\\` -- for loops.
`,
  exercises: [
    {
      id: 'py-magic-1',
      title: '__str__ Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Implement __str__ so print() shows "Point(3, 4)".',
      skeleton: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __BLANK__(self):
        return f"Point({self.x}, {self.y})"

print(Point(3, 4))  # Point(3, 4)`,
      solution: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Point({self.x}, {self.y})"

print(Point(3, 4))  # Point(3, 4)`,
      hints: [
        'print() calls the __str__ method.',
        'Define a method named __str__ returning a string.',
        'The answer is: __str__',
      ],
      concepts: ['__str__'],
    },
    {
      id: 'py-magic-2',
      title: '__repr__ Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Implement __repr__ for the developer representation.',
      skeleton: `class Color:
    def __init__(self, r, g, b):
        self.r = r
        self.g = g
        self.b = b

    def __BLANK__(self):
        return f"Color({self.r}, {self.g}, {self.b})"

c = Color(255, 0, 128)
print(repr(c))  # Color(255, 0, 128)`,
      solution: `class Color:
    def __init__(self, r, g, b):
        self.r = r
        self.g = g
        self.b = b

    def __repr__(self):
        return f"Color({self.r}, {self.g}, {self.b})"

c = Color(255, 0, 128)
print(repr(c))  # Color(255, 0, 128)`,
      hints: [
        'repr() calls the __repr__ method.',
        '__repr__ should ideally be a valid Python expression.',
        'The answer is: __repr__',
      ],
      concepts: ['__repr__'],
    },
    {
      id: 'py-magic-3',
      title: '__len__ Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Implement __len__ so len() returns the number of items.',
      skeleton: `class Playlist:
    def __init__(self, songs):
        self.songs = songs

    def __BLANK__(self):
        return len(self.songs)

p = Playlist(["a", "b", "c"])
print(len(p))  # 3`,
      solution: `class Playlist:
    def __init__(self, songs):
        self.songs = songs

    def __len__(self):
        return len(self.songs)

p = Playlist(["a", "b", "c"])
print(len(p))  # 3`,
      hints: [
        'len() calls __len__ on the object.',
        'Return the length of the internal collection.',
        'The answer is: __len__',
      ],
      concepts: ['__len__', 'len()'],
    },
    {
      id: 'py-magic-4',
      title: '__eq__ Comparison',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Implement __eq__ so two Points with the same x,y are equal.',
      skeleton: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x __BLANK__ self.y == other.y

print(Point(1, 2) == Point(1, 2))  # True
print(Point(1, 2) == Point(3, 4))  # False`,
      solution: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

print(Point(1, 2) == Point(1, 2))  # True
print(Point(1, 2) == Point(3, 4))  # False`,
      hints: [
        'Both x and y must match for equality.',
        'Use a logical operator to combine the two comparisons.',
        'The answer is: and',
      ],
      concepts: ['__eq__', 'NotImplemented'],
    },
    {
      id: 'py-magic-5',
      title: '__add__ Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Implement __add__ so two Vectors can be added with +.',
      skeleton: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return __BLANK__(self.x + other.x, self.y + other.y)

v = Vector(1, 2) + Vector(3, 4)
print(v.x, v.y)  # 4 6`,
      solution: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

v = Vector(1, 2) + Vector(3, 4)
print(v.x, v.y)  # 4 6`,
      hints: [
        '__add__ should return a new instance.',
        'Add corresponding components together.',
        'The answer is: Vector',
      ],
      concepts: ['__add__', 'operator overloading'],
    },
    {
      id: 'py-magic-6',
      title: '__getitem__ Indexing',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Implement __getitem__ so items can be accessed by index.',
      skeleton: `class Shelf:
    def __init__(self, items):
        self._items = items

    def __BLANK__(self, index):
        return self._items[index]

s = Shelf(["book", "lamp", "clock"])
print(s[1])  # lamp`,
      solution: `class Shelf:
    def __init__(self, items):
        self._items = items

    def __getitem__(self, index):
        return self._items[index]

s = Shelf(["book", "lamp", "clock"])
print(s[1])  # lamp`,
      hints: [
        'obj[index] calls __getitem__(self, index).',
        'Delegate to the internal list.',
        'The answer is: __getitem__',
      ],
      concepts: ['__getitem__', 'indexing'],
    },
    {
      id: 'py-magic-7',
      title: 'Write Vector with Arithmetic',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a Vector class with __init__(x,y), __add__, __sub__, and __mul__ (scalar multiplication).',
      skeleton: `class Vector:
    # __init__(x, y)
    # __add__(other) -> Vector
    # __sub__(other) -> Vector
    # __mul__(scalar) -> Vector
    pass`,
      solution: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)`,
      hints: [
        'Each method returns a new Vector.',
        '__mul__ takes a scalar number, not another Vector.',
        'Add/subtract component-wise, multiply each component by scalar.',
      ],
      concepts: ['__add__', '__sub__', '__mul__', 'operator overloading'],
    },
    {
      id: 'py-magic-8',
      title: 'Write __contains__ Support',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a WordList class that stores words and supports the "in" operator via __contains__ (case-insensitive).',
      skeleton: `class WordList:
    # __init__(words), __contains__(word) case-insensitive
    pass`,
      solution: `class WordList:
    def __init__(self, words):
        self._words = [w.lower() for w in words]

    def __contains__(self, word):
        return word.lower() in self._words`,
      hints: [
        '"x in obj" calls obj.__contains__(x).',
        'Store words in lowercase for case-insensitive comparison.',
        'Compare word.lower() against the stored list.',
      ],
      concepts: ['__contains__', 'in operator', 'case-insensitive'],
    },
    {
      id: 'py-magic-9',
      title: 'Write Ordered Class with total_ordering',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Student class with name and gpa, using @functools.total_ordering. Define __eq__ and __lt__ based on gpa.',
      skeleton: `import functools

@functools.total_ordering
class Student:
    # __init__(name, gpa), __eq__, __lt__ by gpa
    pass`,
      solution: `import functools

@functools.total_ordering
class Student:
    def __init__(self, name, gpa):
        self.name = name
        self.gpa = gpa

    def __eq__(self, other):
        if not isinstance(other, Student):
            return NotImplemented
        return self.gpa == other.gpa

    def __lt__(self, other):
        if not isinstance(other, Student):
            return NotImplemented
        return self.gpa < other.gpa`,
      hints: [
        '@functools.total_ordering auto-generates <=, >, >= from __eq__ + __lt__.',
        'Return NotImplemented for non-Student comparisons.',
        'Compare based on self.gpa.',
      ],
      concepts: ['functools.total_ordering', '__eq__', '__lt__'],
    },
    {
      id: 'py-magic-10',
      title: 'Predict: __str__ vs __repr__',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `class Foo:
    def __repr__(self):
        return "Foo()"

    def __str__(self):
        return "I am Foo"

f = Foo()
print(str(f))
print(repr(f))
print(f)`,
      solution: `I am Foo
Foo()
I am Foo`,
      hints: [
        'str() and print() call __str__.',
        'repr() calls __repr__.',
        'print(f) uses __str__, not __repr__.',
      ],
      concepts: ['__str__', '__repr__', 'string representation'],
    },
    {
      id: 'py-magic-11',
      title: 'Predict: __bool__ Truthiness',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `class Bag:
    def __init__(self, items):
        self.items = items

    def __bool__(self):
        return len(self.items) > 0

a = Bag([1, 2])
b = Bag([])

print(bool(a))
print(bool(b))
print("yes" if a else "no")`,
      solution: `True
False
yes`,
      hints: [
        '__bool__ determines truthiness.',
        'Bag([1,2]) has items, so bool is True.',
        'Bag([]) is empty, so bool is False.',
      ],
      concepts: ['__bool__', 'truthiness'],
    },
    {
      id: 'py-magic-12',
      title: 'Write a Matrix with __getitem__',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Matrix class that stores a 2D list and supports m[row, col] access using __getitem__ with a tuple key.',
      skeleton: `class Matrix:
    # __init__(rows), __getitem__((row, col))
    pass`,
      solution: `class Matrix:
    def __init__(self, rows):
        self._rows = rows

    def __getitem__(self, key):
        row, col = key
        return self._rows[row][col]`,
      hints: [
        'm[row, col] passes a tuple (row, col) to __getitem__.',
        'Unpack the tuple: row, col = key.',
        'Index into self._rows[row][col].',
      ],
      concepts: ['__getitem__', 'tuple key', '2D indexing'],
    },
    {
      id: 'py-magic-13',
      title: 'Fix: __eq__ Missing NotImplemented',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix __eq__ so comparing with a non-Point type returns NotImplemented instead of crashing.',
      skeleton: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

p = Point(1, 2)
print(p == Point(1, 2))  # True
print(p == "hello")      # Should be False, not AttributeError`,
      solution: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

p = Point(1, 2)
print(p == Point(1, 2))  # True
print(p == "hello")      # False`,
      hints: [
        'Check isinstance before accessing other.x.',
        'Return NotImplemented (not raise, just return) for unknown types.',
        'Python will then try the other operand\'s __eq__.',
      ],
      concepts: ['__eq__', 'NotImplemented', 'isinstance'],
    },
    {
      id: 'py-magic-14',
      title: 'Fix: __repr__ Format',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix __repr__ so it matches the expected format Color(r=255, g=0, b=128).',
      skeleton: `class Color:
    def __init__(self, r, g, b):
        self.r = r
        self.g = g
        self.b = b

    def __repr__(self):
        return f"Color({self.r}, {self.g}, {self.b})"

c = Color(255, 0, 128)
print(repr(c))  # Should print: Color(r=255, g=0, b=128)`,
      solution: `class Color:
    def __init__(self, r, g, b):
        self.r = r
        self.g = g
        self.b = b

    def __repr__(self):
        return f"Color(r={self.r}, g={self.g}, b={self.b})"

c = Color(255, 0, 128)
print(repr(c))  # Color(r=255, g=0, b=128)`,
      hints: [
        'The repr format should include parameter names.',
        'Use f"Color(r={self.r}, g={self.g}, b={self.b})".',
        'This makes the repr more explicit and readable.',
      ],
      concepts: ['__repr__', 'string formatting'],
    },
    {
      id: 'py-magic-15',
      title: 'Write Money Class',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a Money class with amount and currency. Support __add__ (same currency only, raise ValueError otherwise), __eq__, __repr__.',
      skeleton: `class Money:
    # __init__(amount, currency)
    # __add__ (same currency only)
    # __eq__, __repr__
    pass`,
      solution: `class Money:
    def __init__(self, amount, currency):
        self.amount = amount
        self.currency = currency

    def __add__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        if self.currency != other.currency:
            raise ValueError(f"Cannot add {self.currency} and {other.currency}")
        return Money(self.amount + other.amount, self.currency)

    def __eq__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        return self.amount == other.amount and self.currency == other.currency

    def __repr__(self):
        return f"Money({self.amount}, '{self.currency}')"`,
      hints: [
        '__add__ should check currency matches before adding.',
        'Raise ValueError for mismatched currencies.',
        'Return NotImplemented for non-Money types.',
      ],
      concepts: ['__add__', '__eq__', '__repr__', 'domain validation'],
    },
    {
      id: 'py-magic-16',
      title: 'Predict: __contains__',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `class EvenNumbers:
    def __contains__(self, n):
        return isinstance(n, int) and n % 2 == 0

evens = EvenNumbers()
print(2 in evens)
print(3 in evens)
print(2.0 in evens)`,
      solution: `True
False
False`,
      hints: [
        '__contains__ is called by the "in" operator.',
        '2 is an int and even, so True.',
        '2.0 is a float, not an int, so isinstance fails.',
      ],
      concepts: ['__contains__', 'isinstance', 'in operator'],
    },
    {
      id: 'py-magic-17',
      title: 'Fix: __len__ Return Type',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix __len__ so it returns an integer, not a float.',
      skeleton: `class DataBuffer:
    def __init__(self, size_bytes):
        self.size_bytes = size_bytes

    def __len__(self):
        return self.size_bytes / 1024  # length in KB

buf = DataBuffer(2048)
print(len(buf))  # Should print 2, but crashes: TypeError`,
      solution: `class DataBuffer:
    def __init__(self, size_bytes):
        self.size_bytes = size_bytes

    def __len__(self):
        return self.size_bytes // 1024  # length in KB

buf = DataBuffer(2048)
print(len(buf))  # 2`,
      hints: [
        '__len__ must return a non-negative integer.',
        '/ returns a float, // returns an integer.',
        'Change / to // for integer division.',
      ],
      concepts: ['__len__', 'integer division', 'TypeError'],
    },
    {
      id: 'py-magic-18',
      title: 'Write a Range-like Class',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a CountUp class with __init__(start, stop), __iter__, __next__, and __len__. Iterates from start to stop-1.',
      skeleton: `class CountUp:
    # __init__(start, stop)
    # __iter__, __next__, __len__
    pass`,
      solution: `class CountUp:
    def __init__(self, start, stop):
        self.start = start
        self.stop = stop
        self._current = start

    def __iter__(self):
        self._current = self.start
        return self

    def __next__(self):
        if self._current >= self.stop:
            raise StopIteration
        value = self._current
        self._current += 1
        return value

    def __len__(self):
        return max(0, self.stop - self.start)`,
      hints: [
        '__iter__ resets _current and returns self.',
        '__next__ returns _current and increments, or raises StopIteration.',
        '__len__ returns stop - start (minimum 0).',
      ],
      concepts: ['__iter__', '__next__', '__len__', 'iterator protocol'],
    },
    {
      id: 'py-magic-19',
      title: 'Refactor to total_ordering',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the explicit comparison methods to use @functools.total_ordering with just __eq__ and __lt__.',
      skeleton: `class Temperature:
    def __init__(self, value):
        self.value = value

    def __eq__(self, other):
        return self.value == other.value

    def __lt__(self, other):
        return self.value < other.value

    def __le__(self, other):
        return self.value <= other.value

    def __gt__(self, other):
        return self.value > other.value

    def __ge__(self, other):
        return self.value >= other.value`,
      solution: `import functools

@functools.total_ordering
class Temperature:
    def __init__(self, value):
        self.value = value

    def __eq__(self, other):
        if not isinstance(other, Temperature):
            return NotImplemented
        return self.value == other.value

    def __lt__(self, other):
        if not isinstance(other, Temperature):
            return NotImplemented
        return self.value < other.value`,
      hints: [
        '@functools.total_ordering generates __le__, __gt__, __ge__ from __eq__ + __lt__.',
        'Remove the manually defined __le__, __gt__, __ge__.',
        'Add isinstance checks for safety.',
      ],
      concepts: ['functools.total_ordering', 'refactoring'],
    },
    {
      id: 'py-magic-20',
      title: 'Refactor to __format__',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the explicit formatting methods to use __format__ supporting "short" and "long" format specs.',
      skeleton: `class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    def short(self):
        return f"{self.month}/{self.day}/{self.year}"

    def long(self):
        return f"{self.year}-{self.month:02d}-{self.day:02d}"

d = Date(2026, 3, 15)
print(d.short())  # 3/15/2026
print(d.long())   # 2026-03-15`,
      solution: `class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    def __format__(self, spec):
        if spec == "short":
            return f"{self.month}/{self.day}/{self.year}"
        elif spec == "long":
            return f"{self.year}-{self.month:02d}-{self.day:02d}"
        return f"{self.year}-{self.month:02d}-{self.day:02d}"

d = Date(2026, 3, 15)
print(f"{d:short}")  # 3/15/2026
print(f"{d:long}")   # 2026-03-15`,
      hints: [
        '__format__(self, spec) is called by f"{obj:spec}".',
        'The spec string after the colon is passed as the argument.',
        'Use f"{d:short}" instead of d.short().',
      ],
      concepts: ['__format__', 'format spec', 'f-string'],
    },
  ],
};
