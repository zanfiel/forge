import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-props',
  title: '19. Properties & Descriptors',
  explanation: `## Properties & Descriptors

Properties let you define **managed attributes** that run code on get, set, or delete.

### @property Getter
\\\`\\\`\\\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius
\\\`\\\`\\\`

### @name.setter
\\\`\\\`\\\`python
    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius must be non-negative")
        self._radius = value
\\\`\\\`\\\`

### @name.deleter
\\\`\\\`\\\`python
    @radius.deleter
    def radius(self):
        del self._radius
\\\`\\\`\\\`

### property() Built-in
You can also use \\\`property(fget, fset, fdel, doc)\\\` directly.

### Descriptor Protocol
Descriptors are classes that define \\\`__get__\\\`, \\\`__set__\\\`, and/or \\\`__delete__\\\`. They power properties, methods, \\\`classmethod\\\`, and \\\`staticmethod\\\` under the hood.

- **Data descriptor**: defines \\\`__set__\\\` or \\\`__delete__\\\` (takes precedence over instance dict)
- **Non-data descriptor**: only \\\`__get__\\\` (instance dict takes precedence)
`,
  exercises: [
    {
      id: 'py-props-1',
      title: 'Basic @property Getter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Make name a read-only property.',
      skeleton: `class User:
    def __init__(self, name):
        self._name = name

    __BLANK__
    def name(self):
        return self._name

u = User("Alice")
print(u.name)  # Alice`,
      solution: `class User:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

u = User("Alice")
print(u.name)  # Alice`,
      hints: [
        '@property turns a method into a getter.',
        'Access it like an attribute, not a method call.',
        'The answer is: @property',
      ],
      concepts: ['@property', 'getter'],
    },
    {
      id: 'py-props-2',
      title: '@property Setter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Add a setter for the name property.',
      skeleton: `class User:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

    __BLANK__
    def name(self, value):
        self._name = value

u = User("Alice")
u.name = "Bob"
print(u.name)  # Bob`,
      solution: `class User:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        self._name = value

u = User("Alice")
u.name = "Bob"
print(u.name)  # Bob`,
      hints: [
        'The setter decorator is @property_name.setter.',
        'It matches the property name.',
        'The answer is: @name.setter',
      ],
      concepts: ['@property', 'setter'],
    },
    {
      id: 'py-props-3',
      title: 'Computed Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Make area a computed property from width and height.',
      skeleton: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    @property
    def area(self):
        return __BLANK__

r = Rectangle(5, 3)
print(r.area)  # 15`,
      solution: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    @property
    def area(self):
        return self.width * self.height

r = Rectangle(5, 3)
print(r.area)  # 15`,
      hints: [
        'area is computed from the existing attributes.',
        'Multiply width by height.',
        'The answer is: self.width * self.height',
      ],
      concepts: ['@property', 'computed property'],
    },
    {
      id: 'py-props-4',
      title: 'property() Built-in',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a property using the property() built-in.',
      skeleton: `class Config:
    def __init__(self, value):
        self._value = value

    def get_value(self):
        return self._value

    def set_value(self, v):
        self._value = v

    value = __BLANK__(get_value, set_value)

c = Config(42)
print(c.value)  # 42
c.value = 99
print(c.value)  # 99`,
      solution: `class Config:
    def __init__(self, value):
        self._value = value

    def get_value(self):
        return self._value

    def set_value(self, v):
        self._value = v

    value = property(get_value, set_value)

c = Config(42)
print(c.value)  # 42
c.value = 99
print(c.value)  # 99`,
      hints: [
        'property(fget, fset) creates a property object.',
        'Pass the getter and setter functions.',
        'The answer is: property',
      ],
      concepts: ['property()', 'getter', 'setter'],
    },
    {
      id: 'py-props-5',
      title: 'Read-only Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Make created_at a read-only property that raises AttributeError on assignment.',
      skeleton: `import time

class Document:
    def __init__(self):
        self.__BLANK__ = time.time()

    @property
    def created_at(self):
        return self._created_at

d = Document()
print(type(d.created_at))  # <class 'float'>
# d.created_at = 0  # Would raise AttributeError`,
      solution: `import time

class Document:
    def __init__(self):
        self._created_at = time.time()

    @property
    def created_at(self):
        return self._created_at

d = Document()
print(type(d.created_at))  # <class 'float'>
# d.created_at = 0  # Would raise AttributeError`,
      hints: [
        'Store the value in a private attribute prefixed with _.',
        'Define only a getter with @property, no setter.',
        'The answer is: _created_at',
      ],
      concepts: ['read-only property', 'encapsulation'],
    },
    {
      id: 'py-props-6',
      title: 'Property with Validation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Add validation in the setter to reject negative ages.',
      skeleton: `class Person:
    def __init__(self, age):
        self.age = age

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if value __BLANK__ 0:
            raise ValueError("Age must be non-negative")
        self._age = value

p = Person(25)
print(p.age)  # 25`,
      solution: `class Person:
    def __init__(self, age):
        self.age = age

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("Age must be non-negative")
        self._age = value

p = Person(25)
print(p.age)  # 25`,
      hints: [
        'Reject values that are less than zero.',
        'Use a comparison operator.',
        'The answer is: <',
      ],
      concepts: ['@property', 'validation', 'setter'],
    },
    {
      id: 'py-props-7',
      title: 'Write Person with Validated Properties',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a Person class with name (non-empty string) and age (0-150) as validated properties.',
      skeleton: `class Person:
    # name: non-empty string
    # age: integer 0-150
    # Both validated via @property
    pass`,
      solution: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if not isinstance(value, str) or not value.strip():
            raise ValueError("Name must be a non-empty string")
        self._name = value

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if not isinstance(value, int) or not 0 <= value <= 150:
            raise ValueError("Age must be an integer between 0 and 150")
        self._age = value`,
      hints: [
        'Define both name and age as @property with setters.',
        'Validate type and range in each setter.',
        '__init__ uses self.name and self.age to trigger validation.',
      ],
      concepts: ['@property', 'validation', 'setter'],
    },
    {
      id: 'py-props-8',
      title: 'Write Circle with Linked Properties',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Circle class with a radius property. Add computed read-only properties area and circumference.',
      skeleton: `import math

class Circle:
    # radius (validated >= 0)
    # area (read-only computed)
    # circumference (read-only computed)
    pass`,
      solution: `import math

class Circle:
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

    @property
    def area(self):
        return math.pi * self._radius ** 2

    @property
    def circumference(self):
        return 2 * math.pi * self._radius`,
      hints: [
        'radius has a getter and setter with validation.',
        'area and circumference are getter-only properties.',
        'They compute from self._radius each time they are accessed.',
      ],
      concepts: ['@property', 'computed property', 'validation'],
    },
    {
      id: 'py-props-9',
      title: 'Write Linked Temperature Properties',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Temperature class where setting celsius auto-updates fahrenheit and vice versa. Store internally as celsius.',
      skeleton: `class Temperature:
    # Store internally as _celsius
    # celsius and fahrenheit are linked properties
    pass`,
      solution: `class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9 / 5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self._celsius = (value - 32) * 5 / 9`,
      hints: [
        'Store only _celsius internally.',
        'fahrenheit getter converts from celsius.',
        'fahrenheit setter converts back to celsius.',
      ],
      concepts: ['linked properties', 'unit conversion'],
    },
    {
      id: 'py-props-10',
      title: 'Predict: Property vs Direct Attribute',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `class Box:
    def __init__(self, size):
        self._size = size

    @property
    def size(self):
        print("getting")
        return self._size

    @size.setter
    def size(self, value):
        print("setting")
        self._size = value

b = Box(5)
b.size = 10
x = b.size`,
      solution: `setting
getting`,
      hints: [
        '__init__ sets self._size directly, not through the property.',
        'b.size = 10 triggers the setter, printing "setting".',
        'x = b.size triggers the getter, printing "getting".',
      ],
      concepts: ['@property', 'getter', 'setter', 'side effects'],
    },
    {
      id: 'py-props-11',
      title: 'Predict: Setter Validation Error',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `class Score:
    def __init__(self, value):
        self.value = value

    @property
    def value(self):
        return self._value

    @value.setter
    def value(self, v):
        if not 0 <= v <= 100:
            raise ValueError("Out of range")
        self._value = v

try:
    s = Score(50)
    print(s.value)
    s.value = 200
except ValueError as e:
    print(e)`,
      solution: `50
Out of range`,
      hints: [
        'Score(50) succeeds because 50 is in range.',
        'print(s.value) prints 50.',
        's.value = 200 raises ValueError because 200 > 100.',
      ],
      concepts: ['@property', 'validation', 'ValueError'],
    },
    {
      id: 'py-props-12',
      title: 'Write a Clamped Percentage',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Percentage class where setting the value clamps it between 0 and 100 (no error, just clamp).',
      skeleton: `class Percentage:
    # value property clamped to 0-100
    pass`,
      solution: `class Percentage:
    def __init__(self, value=0):
        self.value = value

    @property
    def value(self):
        return self._value

    @value.setter
    def value(self, v):
        self._value = max(0, min(100, v))`,
      hints: [
        'Use max(0, min(100, v)) to clamp.',
        'No error raised, just silently constrain the value.',
        'The setter stores the clamped result.',
      ],
      concepts: ['@property', 'clamping', 'setter'],
    },
    {
      id: 'py-props-13',
      title: 'Fix: Setter Not Storing Value',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the setter so it actually stores the validated value.',
      skeleton: `class Product:
    def __init__(self, price):
        self.price = price

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("Price must be non-negative")

p = Product(10)
print(p.price)  # Should print 10, not AttributeError`,
      solution: `class Product:
    def __init__(self, price):
        self.price = price

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("Price must be non-negative")
        self._price = value

p = Product(10)
print(p.price)  # 10`,
      hints: [
        'The setter validates but never stores the value.',
        'Add self._price = value after validation.',
        'Without it, _price is never set.',
      ],
      concepts: ['@property', 'setter bug'],
    },
    {
      id: 'py-props-14',
      title: 'Fix: Infinite Recursion in Property',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the infinite recursion caused by the property setter calling itself.',
      skeleton: `class Account:
    def __init__(self, balance):
        self.balance = balance

    @property
    def balance(self):
        return self.balance

    @balance.setter
    def balance(self, value):
        self.balance = value

a = Account(100)  # RecursionError!`,
      solution: `class Account:
    def __init__(self, balance):
        self.balance = balance

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        self._balance = value

a = Account(100)
print(a.balance)  # 100`,
      hints: [
        'self.balance in the getter/setter triggers the property again.',
        'Store the value in self._balance (with underscore).',
        'The property should access self._balance, not self.balance.',
      ],
      concepts: ['infinite recursion', '@property', 'private attribute'],
    },
    {
      id: 'py-props-15',
      title: 'Write a Validated Descriptor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a Positive descriptor class that only allows positive numbers. Use it in a Product class for price.',
      skeleton: `class Positive:
    # Descriptor: __set_name__, __get__, __set__
    # Only allows positive numbers
    pass

class Product:
    price = Positive()

    def __init__(self, price):
        self.price = price`,
      solution: `class Positive:
    def __set_name__(self, owner, name):
        self.name = name
        self.private_name = f"_{name}"

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private_name)

    def __set__(self, obj, value):
        if not isinstance(value, (int, float)) or value <= 0:
            raise ValueError(f"{self.name} must be a positive number")
        setattr(obj, self.private_name, value)

class Product:
    price = Positive()

    def __init__(self, price):
        self.price = price`,
      hints: [
        '__set_name__ receives the attribute name from the class.',
        'Store the value on the instance using a private name.',
        'Use getattr/setattr to avoid infinite recursion.',
      ],
      concepts: ['descriptor protocol', '__set_name__', '__get__', '__set__'],
    },
    {
      id: 'py-props-16',
      title: 'Predict: Descriptor __get__',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `class Verbose:
    def __set_name__(self, owner, name):
        self.name = name
        self.private = f"_{name}"

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        val = getattr(obj, self.private, "unset")
        print(f"Getting {self.name}: {val}")
        return val

    def __set__(self, obj, value):
        print(f"Setting {self.name}: {value}")
        setattr(obj, self.private, value)

class Config:
    debug = Verbose()

c = Config()
c.debug = True
x = c.debug`,
      solution: `Setting debug: True
Getting debug: True`,
      hints: [
        'c.debug = True triggers __set__, printing "Setting debug: True".',
        'x = c.debug triggers __get__, printing "Getting debug: True".',
        'The descriptor intercepts both get and set.',
      ],
      concepts: ['descriptor protocol', '__get__', '__set__'],
    },
    {
      id: 'py-props-17',
      title: 'Fix: Descriptor Storing on Class',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the descriptor so it stores values on each instance, not on the descriptor itself.',
      skeleton: `class Typed:
    def __init__(self, expected_type):
        self.expected_type = expected_type
        self.value = None

    def __get__(self, obj, objtype=None):
        return self.value

    def __set__(self, obj, value):
        if not isinstance(value, self.expected_type):
            raise TypeError(f"Expected {self.expected_type}")
        self.value = value

class Point:
    x = Typed(int)
    y = Typed(int)

a = Point()
a.x = 1
a.y = 2
b = Point()
b.x = 10
print(a.x)  # Should print 1, not 10`,
      solution: `class Typed:
    def __init__(self, expected_type):
        self.expected_type = expected_type

    def __set_name__(self, owner, name):
        self.private_name = f"_{name}"

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private_name)

    def __set__(self, obj, value):
        if not isinstance(value, self.expected_type):
            raise TypeError(f"Expected {self.expected_type}")
        setattr(obj, self.private_name, value)

class Point:
    x = Typed(int)
    y = Typed(int)

a = Point()
a.x = 1
a.y = 2
b = Point()
b.x = 10
print(a.x)  # 1`,
      hints: [
        'Storing self.value on the descriptor is shared across all instances.',
        'Use __set_name__ to get the attribute name.',
        'Store on obj (the instance) via setattr/getattr.',
      ],
      concepts: ['descriptor', 'instance storage', '__set_name__'],
    },
    {
      id: 'py-props-18',
      title: 'Write a cached_property Descriptor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a cached_property descriptor that computes the value once and caches it on the instance.',
      skeleton: `class cached_property:
    # Descriptor that caches the result on first access
    pass`,
      solution: `class cached_property:
    def __init__(self, func):
        self.func = func
        self.attrname = None

    def __set_name__(self, owner, name):
        self.attrname = name

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        value = self.func(obj)
        setattr(obj, self.attrname, value)
        return value`,
      hints: [
        '__init__ receives the decorated function.',
        '__get__ computes the value and stores it on the instance dict.',
        'Subsequent access finds the value in the instance dict, bypassing the descriptor.',
      ],
      concepts: ['non-data descriptor', 'caching', 'lazy evaluation'],
    },
    {
      id: 'py-props-19',
      title: 'Refactor: Methods to @property',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the getter/setter methods to use @property.',
      skeleton: `class Employee:
    def __init__(self, salary):
        self._salary = salary

    def get_salary(self):
        return self._salary

    def set_salary(self, value):
        if value < 0:
            raise ValueError("Salary cannot be negative")
        self._salary = value

e = Employee(50000)
print(e.get_salary())
e.set_salary(60000)`,
      solution: `class Employee:
    def __init__(self, salary):
        self.salary = salary

    @property
    def salary(self):
        return self._salary

    @salary.setter
    def salary(self, value):
        if value < 0:
            raise ValueError("Salary cannot be negative")
        self._salary = value

e = Employee(50000)
print(e.salary)
e.salary = 60000`,
      hints: [
        'Replace get_salary with @property getter.',
        'Replace set_salary with @salary.setter.',
        'Access as e.salary instead of e.get_salary().',
      ],
      concepts: ['@property', 'refactoring'],
    },
    {
      id: 'py-props-20',
      title: 'Refactor: Repeated Validation to Descriptor',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the repeated range validation into a reusable RangeChecked descriptor.',
      skeleton: `class GameCharacter:
    def __init__(self, health, mana):
        self._health = health
        self._mana = mana

    @property
    def health(self):
        return self._health

    @health.setter
    def health(self, value):
        if not 0 <= value <= 100:
            raise ValueError("Health must be 0-100")
        self._health = value

    @property
    def mana(self):
        return self._mana

    @mana.setter
    def mana(self, value):
        if not 0 <= value <= 100:
            raise ValueError("Mana must be 0-100")
        self._mana = value`,
      solution: `class RangeChecked:
    def __init__(self, min_val, max_val):
        self.min_val = min_val
        self.max_val = max_val

    def __set_name__(self, owner, name):
        self.private_name = f"_{name}"
        self.name = name

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private_name)

    def __set__(self, obj, value):
        if not self.min_val <= value <= self.max_val:
            raise ValueError(f"{self.name} must be {self.min_val}-{self.max_val}")
        setattr(obj, self.private_name, value)

class GameCharacter:
    health = RangeChecked(0, 100)
    mana = RangeChecked(0, 100)

    def __init__(self, health, mana):
        self.health = health
        self.mana = mana`,
      hints: [
        'Extract the range check into a descriptor class.',
        'RangeChecked takes min and max in __init__.',
        'Use __set_name__ to store the attribute name.',
      ],
      concepts: ['descriptor', 'refactoring', 'DRY'],
    },
  ],
};
