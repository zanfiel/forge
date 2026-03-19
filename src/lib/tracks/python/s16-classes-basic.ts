import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-classes',
  title: '16. Classes -- Basics',
  explanation: `## Classes -- Basics

Classes bundle **data** (attributes) and **behaviour** (methods) into reusable blueprints.

### Defining a Class
\\\`\\\`\\\`python
class Dog:
    species = "Canis familiaris"   # class attribute

    def __init__(self, name, age):
        self.name = name           # instance attribute
        self.age = age

    def speak(self):
        return f"{self.name} says woof!"
\\\`\\\`\\\`

### The \\\`self\\\` Parameter
Every instance method receives the instance as its first argument, conventionally called \\\`self\\\`.

### Class vs Instance Attributes
- **Class attributes** are shared by all instances.
- **Instance attributes** are unique to each object.
- Instance attributes shadow class attributes of the same name.

### \\\`__init__\\\`
The initialiser runs automatically when you create an object: \\\`d = Dog("Rex", 4)\\\`.

### \\\`__str__\\\` and \\\`__repr__\\\`
- \\\`__str__\\\` is for the end-user (\\\`print()\\\`, \\\`str()\\\`).
- \\\`__repr__\\\` is for the developer (\\\`repr()\\\`, REPL display).
`,
  exercises: [
    {
      id: 'py-classes-1',
      title: 'Define an Empty Class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Define an empty class called Placeholder.',
      skeleton: `__BLANK__ Placeholder:
    pass

p = Placeholder()
print(type(p).__name__)  # Placeholder`,
      solution: `class Placeholder:
    pass

p = Placeholder()
print(type(p).__name__)  # Placeholder`,
      hints: [
        'Use the class keyword to define a class.',
        'An empty class body uses the pass statement.',
        'The answer is: class',
      ],
      concepts: ['class keyword', 'pass'],
    },
    {
      id: 'py-classes-2',
      title: '__init__ with self',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete the initialiser so it stores the name attribute.',
      skeleton: `class Person:
    def __init__(self, name):
        __BLANK__ = name

p = Person("Alice")
print(p.name)  # Alice`,
      solution: `class Person:
    def __init__(self, name):
        self.name = name

p = Person("Alice")
print(p.name)  # Alice`,
      hints: [
        'Instance attributes are set on self.',
        'Use self.name to create the attribute.',
        'The answer is: self.name',
      ],
      concepts: ['__init__', 'self', 'instance attribute'],
    },
    {
      id: 'py-classes-3',
      title: 'Access Instance Attribute',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Print the dog\'s name using dot notation.',
      skeleton: `class Dog:
    def __init__(self, name):
        self.name = name

d = Dog("Rex")
print(__BLANK__)  # Rex`,
      solution: `class Dog:
    def __init__(self, name):
        self.name = name

d = Dog("Rex")
print(d.name)  # Rex`,
      hints: [
        'Access attributes with dot notation: object.attribute.',
        'The variable holding the instance is d.',
        'The answer is: d.name',
      ],
      concepts: ['dot notation', 'attribute access'],
    },
    {
      id: 'py-classes-4',
      title: 'Class Attribute',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Define a class attribute species shared by all instances.',
      skeleton: `class Cat:
    __BLANK__ = "Felis catus"

    def __init__(self, name):
        self.name = name

a = Cat("Whiskers")
b = Cat("Mittens")
print(a.species == b.species)  # True`,
      solution: `class Cat:
    species = "Felis catus"

    def __init__(self, name):
        self.name = name

a = Cat("Whiskers")
b = Cat("Mittens")
print(a.species == b.species)  # True`,
      hints: [
        'Class attributes are defined inside the class body but outside any method.',
        'They are shared across all instances.',
        'The answer is: species',
      ],
      concepts: ['class attribute'],
    },
    {
      id: 'py-classes-5',
      title: 'Call a Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Call the greet method on the person instance.',
      skeleton: `class Person:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hi, I'm {self.name}"

p = Person("Bob")
print(__BLANK__)  # Hi, I'm Bob`,
      solution: `class Person:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hi, I'm {self.name}"

p = Person("Bob")
print(p.greet())  # Hi, I'm Bob`,
      hints: [
        'Methods are called with parentheses.',
        'Use dot notation: instance.method().',
        'The answer is: p.greet()',
      ],
      concepts: ['method call', 'dot notation'],
    },
    {
      id: 'py-classes-6',
      title: '__str__ Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Define __str__ so print() shows a friendly string.',
      skeleton: `class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

    def __BLANK__(self):
        return f"{self.title} by {self.author}"

b = Book("Dune", "Frank Herbert")
print(b)  # Dune by Frank Herbert`,
      solution: `class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

    def __str__(self):
        return f"{self.title} by {self.author}"

b = Book("Dune", "Frank Herbert")
print(b)  # Dune by Frank Herbert`,
      hints: [
        'print() calls the __str__ method on the object.',
        'Define a method named __str__ that returns a string.',
        'The answer is: __str__',
      ],
      concepts: ['__str__', 'string representation'],
    },
    {
      id: 'py-classes-7',
      title: 'Write a Person Class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a Person class with __init__ storing name and age, and an introduce() method returning "I\'m {name}, age {age}".',
      skeleton: `class Person:
    # Store name and age, provide introduce() method
    pass`,
      solution: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        return f"I'm {self.name}, age {self.age}"`,
      hints: [
        'Define __init__(self, name, age) and store both on self.',
        'introduce() should return an f-string.',
        'Use self.name and self.age inside the f-string.',
      ],
      concepts: ['__init__', 'instance method', 'f-string'],
    },
    {
      id: 'py-classes-8',
      title: 'Write a Formatted Info Method',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a Product class with name and price, and an info() method returning "Product(name={name}, price=${price:.2f})".',
      skeleton: `class Product:
    # Store name and price, provide info() method
    pass`,
      solution: `class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def info(self):
        return f"Product(name={self.name}, price=\${self.price:.2f})"`,
      hints: [
        'Use :.2f in the f-string to format price to 2 decimal places.',
        'Store name and price in __init__.',
        'info() returns the formatted string, not prints it.',
      ],
      concepts: ['f-string formatting', 'instance method'],
    },
    {
      id: 'py-classes-9',
      title: 'Write a BankAccount Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a BankAccount class with an initial balance, deposit(amount), withdraw(amount) that raises ValueError if insufficient funds, and a balance property.',
      skeleton: `class BankAccount:
    # balance, deposit, withdraw (raise ValueError if insufficient)
    pass`,
      solution: `class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount`,
      hints: [
        'Use a default parameter balance=0 in __init__.',
        'deposit adds to self.balance, withdraw subtracts.',
        'Check if amount > self.balance before withdrawing.',
      ],
      concepts: ['class design', 'ValueError', 'default parameter'],
    },
    {
      id: 'py-classes-10',
      title: 'Predict: Class vs Instance Attribute',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `class Counter:
    count = 0

    def __init__(self):
        self.count = Counter.count
        Counter.count += 1

a = Counter()
b = Counter()
c = Counter()
print(a.count, b.count, c.count, Counter.count)`,
      solution: `0 1 2 3`,
      hints: [
        'Each instance stores the current class count, then the class count increments.',
        'a gets 0, b gets 1, c gets 2.',
        'After 3 instances, Counter.count is 3.',
      ],
      concepts: ['class attribute', 'instance attribute', 'shadowing'],
    },
    {
      id: 'py-classes-11',
      title: 'Predict: Method Chaining',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `class Builder:
    def __init__(self):
        self.parts = []

    def add(self, part):
        self.parts.append(part)
        return self

    def build(self):
        return "-".join(self.parts)

result = Builder().add("a").add("b").add("c").build()
print(result)`,
      solution: `a-b-c`,
      hints: [
        'Each add() returns self, enabling chaining.',
        'Three parts are added: "a", "b", "c".',
        'build() joins them with hyphens.',
      ],
      concepts: ['method chaining', 'return self', 'fluent interface'],
    },
    {
      id: 'py-classes-12',
      title: 'Write a Counter Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Counter class with increment(), decrement(), reset(), and a value attribute starting at 0.',
      skeleton: `class Counter:
    # value starts at 0
    # increment, decrement, reset
    pass`,
      solution: `class Counter:
    def __init__(self):
        self.value = 0

    def increment(self):
        self.value += 1

    def decrement(self):
        self.value -= 1

    def reset(self):
        self.value = 0`,
      hints: [
        'Initialize self.value = 0 in __init__.',
        'increment adds 1, decrement subtracts 1.',
        'reset sets value back to 0.',
      ],
      concepts: ['state management', 'instance method'],
    },
    {
      id: 'py-classes-13',
      title: 'Fix: Missing self Parameter',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the method so it works as an instance method.',
      skeleton: `class Greeter:
    def __init__(self, name):
        self.name = name

    def greet():
        return f"Hello, {self.name}!"

g = Greeter("Alice")
print(g.greet())  # Should print: Hello, Alice!`,
      solution: `class Greeter:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hello, {self.name}!"

g = Greeter("Alice")
print(g.greet())  # Should print: Hello, Alice!`,
      hints: [
        'Instance methods need self as the first parameter.',
        'Without self, Python cannot access instance attributes.',
        'Add self to the greet method signature.',
      ],
      concepts: ['self parameter', 'instance method'],
    },
    {
      id: 'py-classes-14',
      title: 'Fix: Mutable Class Attribute',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the class so each instance has its own items list.',
      skeleton: `class ShoppingCart:
    items = []

    def add(self, item):
        self.items.append(item)

a = ShoppingCart()
b = ShoppingCart()
a.add("apple")
b.add("banana")
print(b.items)  # Should print: ['banana'], not ['apple', 'banana']`,
      solution: `class ShoppingCart:
    def __init__(self):
        self.items = []

    def add(self, item):
        self.items.append(item)

a = ShoppingCart()
b = ShoppingCart()
a.add("apple")
b.add("banana")
print(b.items)  # ['banana']`,
      hints: [
        'Mutable class attributes are shared between all instances.',
        'Move the list creation into __init__ so each instance gets its own.',
        'Use self.items = [] inside __init__.',
      ],
      concepts: ['mutable class attribute', 'shared state bug'],
    },
    {
      id: 'py-classes-15',
      title: 'Write a Stack Class',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a Stack class with push(item), pop() (raises IndexError if empty), peek() (returns top without removing), and is_empty().',
      skeleton: `class Stack:
    # push, pop (raise IndexError if empty), peek, is_empty
    pass`,
      solution: `class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("peek at empty stack")
        return self._items[-1]

    def is_empty(self):
        return len(self._items) == 0`,
      hints: [
        'Use a private list _items as internal storage.',
        'pop() and peek() should raise IndexError when empty.',
        'peek() returns _items[-1] without removing it.',
      ],
      concepts: ['data structure', 'encapsulation', 'IndexError'],
    },
    {
      id: 'py-classes-16',
      title: 'Predict: isinstance and type',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `class Animal:
    pass

class Dog(Animal):
    pass

d = Dog()
print(isinstance(d, Animal))
print(type(d) == Animal)
print(type(d).__name__)`,
      solution: `True
False
Dog`,
      hints: [
        'isinstance checks the entire inheritance chain.',
        'type() == checks the exact type only.',
        'd is a Dog, which is a subclass of Animal.',
      ],
      concepts: ['isinstance()', 'type()', 'inheritance check'],
    },
    {
      id: 'py-classes-17',
      title: 'Fix: Missing Attribute Assignment',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the __init__ so both attributes are stored.',
      skeleton: `class Point:
    def __init__(self, x, y):
        self.x = x

    def distance_from_origin(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

p = Point(3, 4)
print(p.distance_from_origin())  # Should print 5.0`,
      solution: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def distance_from_origin(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

p = Point(3, 4)
print(p.distance_from_origin())  # 5.0`,
      hints: [
        'The __init__ only stores x but forgets y.',
        'Add self.y = y to __init__.',
        'Without it, accessing self.y raises AttributeError.',
      ],
      concepts: ['__init__', 'AttributeError'],
    },
    {
      id: 'py-classes-18',
      title: 'Write a Temperature Class',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a Temperature class that stores celsius and has to_fahrenheit() and a class method from_fahrenheit(f) that creates a Temperature from Fahrenheit.',
      skeleton: `class Temperature:
    # Store celsius
    # to_fahrenheit() -> float
    # from_fahrenheit(f) -> Temperature (classmethod)
    pass`,
      solution: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    def to_fahrenheit(self):
        return self.celsius * 9 / 5 + 32

    @classmethod
    def from_fahrenheit(cls, f):
        return cls((f - 32) * 5 / 9)`,
      hints: [
        'F = C * 9/5 + 32 and C = (F - 32) * 5/9.',
        'from_fahrenheit is a @classmethod that returns cls(...).',
        'Use cls instead of Temperature to support subclassing.',
      ],
      concepts: ['@classmethod', 'alternative constructor', 'conversion'],
    },
    {
      id: 'py-classes-19',
      title: 'Refactor Functions to Class',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor these standalone functions into a Rectangle class with width, height, area(), and perimeter().',
      skeleton: `def rect_area(width, height):
    return width * height

def rect_perimeter(width, height):
    return 2 * (width + height)

a = rect_area(5, 3)
p = rect_perimeter(5, 3)
print(a, p)`,
      solution: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

r = Rectangle(5, 3)
print(r.area(), r.perimeter())`,
      hints: [
        'Bundle width and height into __init__.',
        'area() and perimeter() become instance methods using self.',
        'Create a Rectangle instance instead of passing width/height each time.',
      ],
      concepts: ['refactoring', 'encapsulation', 'OOP'],
    },
    {
      id: 'py-classes-20',
      title: 'Refactor Dict to Class',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the dict-based user to a proper User class with a display() method.',
      skeleton: `user = {"name": "Alice", "email": "alice@example.com", "role": "admin"}

def display_user(u):
    return f"{u['name']} ({u['email']}) - {u['role']}"

print(display_user(user))`,
      solution: `class User:
    def __init__(self, name, email, role):
        self.name = name
        self.email = email
        self.role = role

    def display(self):
        return f"{self.name} ({self.email}) - {self.role}"

user = User("Alice", "alice@example.com", "admin")
print(user.display())`,
      hints: [
        'Create a User class with __init__ accepting name, email, role.',
        'Move the formatting logic into a display() method.',
        'Replace dict key access with self.attribute.',
      ],
      concepts: ['refactoring', 'data class', 'OOP'],
    },
  ],
};
