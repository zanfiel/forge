import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-inherit',
  title: '17. Inheritance',
  explanation: `## Inheritance

Inheritance lets a class **reuse and extend** another class's behaviour.

### Single Inheritance
\\\`\\\`\\\`python
class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "Woof!"
\\\`\\\`\\\`

### super()
Call the parent implementation with \\\`super()\\\`:
\\\`\\\`\\\`python
class Dog(Animal):
    def __init__(self, name):
        super().__init__()
        self.name = name
\\\`\\\`\\\`

### Method Resolution Order (MRO)
Python uses C3 linearisation to determine the order in which base classes are searched. Inspect with \\\`ClassName.__mro__\\\` or \\\`ClassName.mro()\\\`.

### Multiple Inheritance
\\\`\\\`\\\`python
class FlyingFish(Flyer, Fish):
    pass
\\\`\\\`\\\`
The MRO resolves the diamond problem by visiting each class only once.

### isinstance / issubclass
- \\\`isinstance(obj, cls)\\\` checks the full chain.
- \\\`issubclass(ChildCls, ParentCls)\\\` checks class relationships.
`,
  exercises: [
    {
      id: 'py-inherit-1',
      title: 'Basic Inheritance Syntax',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Make Dog inherit from Animal.',
      skeleton: `class Animal:
    def speak(self):
        return "..."

class Dog(__BLANK__):
    def speak(self):
        return "Woof!"

d = Dog()
print(isinstance(d, Animal))  # True`,
      solution: `class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "Woof!"

d = Dog()
print(isinstance(d, Animal))  # True`,
      hints: [
        'Put the parent class name in parentheses after the class name.',
        'Dog should inherit from Animal.',
        'The answer is: Animal',
      ],
      concepts: ['inheritance', 'class syntax'],
    },
    {
      id: 'py-inherit-2',
      title: 'Call Parent __init__',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Call the parent initialiser using super().',
      skeleton: `class Animal:
    def __init__(self, species):
        self.species = species

class Dog(Animal):
    def __init__(self, name):
        __BLANK__.__init__("Canis familiaris")
        self.name = name

d = Dog("Rex")
print(d.species)  # Canis familiaris`,
      solution: `class Animal:
    def __init__(self, species):
        self.species = species

class Dog(Animal):
    def __init__(self, name):
        super().__init__("Canis familiaris")
        self.name = name

d = Dog("Rex")
print(d.species)  # Canis familiaris`,
      hints: [
        'super() returns a proxy to the parent class.',
        'Call super().__init__(...) to run the parent initialiser.',
        'The answer is: super()',
      ],
      concepts: ['super()', '__init__'],
    },
    {
      id: 'py-inherit-3',
      title: 'Override a Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Override the area method in Square to use side * side.',
      skeleton: `class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

class Square(Rectangle):
    def __init__(self, side):
        super().__init__(side, side)

    def __BLANK__(self):
        return self.w * self.w

s = Square(5)
print(s.area())  # 25`,
      solution: `class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

class Square(Rectangle):
    def __init__(self, side):
        super().__init__(side, side)

    def area(self):
        return self.w * self.w

s = Square(5)
print(s.area())  # 25`,
      hints: [
        'To override, define a method with the same name.',
        'The method being overridden is area.',
        'The answer is: area',
      ],
      concepts: ['method overriding'],
    },
    {
      id: 'py-inherit-4',
      title: 'Extend Parent Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use super() to extend the parent describe method.',
      skeleton: `class Animal:
    def __init__(self, name):
        self.name = name

    def describe(self):
        return f"Animal: {self.name}"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

    def describe(self):
        base = __BLANK__.describe()
        return f"{base}, Breed: {self.breed}"

d = Dog("Rex", "Labrador")
print(d.describe())  # Animal: Rex, Breed: Labrador`,
      solution: `class Animal:
    def __init__(self, name):
        self.name = name

    def describe(self):
        return f"Animal: {self.name}"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

    def describe(self):
        base = super().describe()
        return f"{base}, Breed: {self.breed}"

d = Dog("Rex", "Labrador")
print(d.describe())  # Animal: Rex, Breed: Labrador`,
      hints: [
        'super() lets you call the parent version of a method.',
        'Call super().describe() to get the parent string.',
        'The answer is: super()',
      ],
      concepts: ['super()', 'method extension'],
    },
    {
      id: 'py-inherit-5',
      title: 'isinstance Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Check if d is an instance of Animal.',
      skeleton: `class Animal:
    pass

class Dog(Animal):
    pass

d = Dog()
print(__BLANK__(d, Animal))  # True`,
      solution: `class Animal:
    pass

class Dog(Animal):
    pass

d = Dog()
print(isinstance(d, Animal))  # True`,
      hints: [
        'isinstance() checks if an object is an instance of a class or its subclasses.',
        'It takes (object, class) as arguments.',
        'The answer is: isinstance',
      ],
      concepts: ['isinstance()'],
    },
    {
      id: 'py-inherit-6',
      title: 'issubclass Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Check if Dog is a subclass of Animal.',
      skeleton: `class Animal:
    pass

class Dog(Animal):
    pass

print(__BLANK__(Dog, Animal))  # True`,
      solution: `class Animal:
    pass

class Dog(Animal):
    pass

print(issubclass(Dog, Animal))  # True`,
      hints: [
        'issubclass() checks class relationships.',
        'It takes (child_class, parent_class) as arguments.',
        'The answer is: issubclass',
      ],
      concepts: ['issubclass()'],
    },
    {
      id: 'py-inherit-7',
      title: 'Write Animal Hierarchy',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write an Animal base class with name, and Dog/Cat subclasses that override speak() to return "Woof!" and "Meow!" respectively.',
      skeleton: `class Animal:
    # __init__(name), speak() returns "..."
    pass

class Dog(Animal):
    # speak() returns "Woof!"
    pass

class Cat(Animal):
    # speak() returns "Meow!"
    pass`,
      solution: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"`,
      hints: [
        'Animal.__init__ stores self.name.',
        'Dog and Cat inherit from Animal and override speak().',
        'Each subclass returns its own sound string.',
      ],
      concepts: ['inheritance', 'method overriding', 'polymorphism'],
    },
    {
      id: 'py-inherit-8',
      title: 'Write Shape Hierarchy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Shape base class, Circle(radius) with area = pi*r^2, and Rectangle(w,h) with area = w*h. Import math for pi.',
      skeleton: `import math

class Shape:
    # base with area() raising NotImplementedError
    pass

class Circle(Shape):
    # radius, area = pi * r ** 2
    pass

class Rectangle(Shape):
    # w, h, area = w * h
    pass`,
      solution: `import math

class Shape:
    def area(self):
        raise NotImplementedError

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h`,
      hints: [
        'Shape.area() should raise NotImplementedError.',
        'Circle stores radius, Rectangle stores w and h.',
        'Use math.pi for the circle area formula.',
      ],
      concepts: ['inheritance', 'NotImplementedError', 'polymorphism'],
    },
    {
      id: 'py-inherit-9',
      title: 'Write Employee/Manager',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write Employee(name, salary) with pay() returning salary, and Manager that adds a bonus parameter and overrides pay() to return salary + bonus.',
      skeleton: `class Employee:
    # name, salary, pay()
    pass

class Manager(Employee):
    # adds bonus, pay() returns salary + bonus
    pass`,
      solution: `class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def pay(self):
        return self.salary

class Manager(Employee):
    def __init__(self, name, salary, bonus):
        super().__init__(name, salary)
        self.bonus = bonus

    def pay(self):
        return self.salary + self.bonus`,
      hints: [
        'Manager.__init__ calls super().__init__(name, salary) then stores bonus.',
        'Manager.pay() returns self.salary + self.bonus.',
        'Employee.pay() simply returns self.salary.',
      ],
      concepts: ['super()', 'method overriding', 'extending __init__'],
    },
    {
      id: 'py-inherit-10',
      title: 'Predict: Method Resolution',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `class A:
    def greet(self):
        return "A"

class B(A):
    pass

class C(B):
    def greet(self):
        return "C"

print(C().greet())
print(B().greet())`,
      solution: `C
A`,
      hints: [
        'C overrides greet(), so C().greet() returns "C".',
        'B does not override greet(), so it inherits from A.',
        'B().greet() returns "A".',
      ],
      concepts: ['method resolution', 'inheritance chain'],
    },
    {
      id: 'py-inherit-11',
      title: 'Predict: super().__init__ Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `class Base:
    def __init__(self):
        print("Base")

class Child(Base):
    def __init__(self):
        print("Child start")
        super().__init__()
        print("Child end")

Child()`,
      solution: `Child start
Base
Child end`,
      hints: [
        'Child.__init__ prints "Child start" first.',
        'super().__init__() calls Base.__init__ which prints "Base".',
        'Then "Child end" prints.',
      ],
      concepts: ['super()', 'initialisation order'],
    },
    {
      id: 'py-inherit-12',
      title: 'Write Vehicle Hierarchy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write Vehicle(make, model), Car(make, model, doors) and ElectricCar(make, model, doors, battery_kwh). Each has a describe() that adds its own info.',
      skeleton: `class Vehicle:
    # make, model, describe()
    pass

class Car(Vehicle):
    # adds doors, extends describe()
    pass

class ElectricCar(Car):
    # adds battery_kwh, extends describe()
    pass`,
      solution: `class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        return f"{self.make} {self.model}"

class Car(Vehicle):
    def __init__(self, make, model, doors):
        super().__init__(make, model)
        self.doors = doors

    def describe(self):
        return f"{super().describe()}, {self.doors} doors"

class ElectricCar(Car):
    def __init__(self, make, model, doors, battery_kwh):
        super().__init__(make, model, doors)
        self.battery_kwh = battery_kwh

    def describe(self):
        return f"{super().describe()}, {self.battery_kwh}kWh battery"`,
      hints: [
        'Each level calls super().__init__() to pass data up.',
        'describe() at each level calls super().describe() and appends info.',
        'ElectricCar -> Car -> Vehicle chain.',
      ],
      concepts: ['multi-level inheritance', 'super()', 'method extension'],
    },
    {
      id: 'py-inherit-13',
      title: 'Fix: Forgetting super().__init__',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the child class so parent attributes are initialised.',
      skeleton: `class Animal:
    def __init__(self, species):
        self.species = species

class Dog(Animal):
    def __init__(self, name):
        self.name = name

d = Dog("Rex")
print(d.name)     # Rex
print(d.species)  # Should not raise AttributeError`,
      solution: `class Animal:
    def __init__(self, species):
        self.species = species

class Dog(Animal):
    def __init__(self, name):
        super().__init__("Canis familiaris")
        self.name = name

d = Dog("Rex")
print(d.name)     # Rex
print(d.species)  # Canis familiaris`,
      hints: [
        'Dog.__init__ never calls the parent __init__.',
        'Add super().__init__("Canis familiaris") before self.name = name.',
        'Without it, self.species is never set.',
      ],
      concepts: ['super()', '__init__', 'AttributeError'],
    },
    {
      id: 'py-inherit-14',
      title: 'Fix: Wrong super() in Multiple Inheritance',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code so both mixins initialise correctly.',
      skeleton: `class Logger:
    def __init__(self):
        self.log = []

class Validator:
    def __init__(self):
        self.errors = []

class Service(Logger, Validator):
    def __init__(self):
        Logger.__init__(self)
        Validator.__init__(self)

s = Service()
print(hasattr(s, 'log'), hasattr(s, 'errors'))  # True True`,
      solution: `class Logger:
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.log = []

class Validator:
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.errors = []

class Service(Logger, Validator):
    def __init__(self):
        super().__init__()

s = Service()
print(hasattr(s, 'log'), hasattr(s, 'errors'))  # True True`,
      hints: [
        'With multiple inheritance, use cooperative super() calls.',
        'Each class should call super().__init__(**kwargs).',
        'This ensures all classes in the MRO get initialised.',
      ],
      concepts: ['cooperative inheritance', 'super()', 'MRO', '**kwargs'],
    },
    {
      id: 'py-inherit-15',
      title: 'Write a Mixin Class',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a JsonMixin with a to_json() method that serialises __dict__ to JSON, and use it with a User class.',
      skeleton: `import json

class JsonMixin:
    # to_json() returns JSON string of __dict__
    pass

class User(JsonMixin):
    # __init__(name, email)
    pass`,
      solution: `import json

class JsonMixin:
    def to_json(self):
        return json.dumps(self.__dict__)

class User(JsonMixin):
    def __init__(self, name, email):
        self.name = name
        self.email = email`,
      hints: [
        'json.dumps() serialises a dict to a JSON string.',
        'self.__dict__ holds all instance attributes.',
        'User inherits to_json() from JsonMixin.',
      ],
      concepts: ['mixin', 'json.dumps', '__dict__'],
    },
    {
      id: 'py-inherit-16',
      title: 'Predict: MRO Diamond',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `class A:
    def who(self):
        return "A"

class B(A):
    def who(self):
        return "B"

class C(A):
    def who(self):
        return "C"

class D(B, C):
    pass

print(D().who())
print([cls.__name__ for cls in D.__mro__])`,
      solution: `B
['D', 'B', 'C', 'A', 'object']`,
      hints: [
        'D inherits from B first, then C.',
        'MRO is D -> B -> C -> A -> object.',
        'D().who() finds who() in B first.',
      ],
      concepts: ['MRO', 'diamond problem', 'C3 linearisation'],
    },
    {
      id: 'py-inherit-17',
      title: 'Fix: Incorrect Override Signature',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the method override so it accepts and uses the extra parameter.',
      skeleton: `class Formatter:
    def format(self, data):
        return str(data)

class JsonFormatter(Formatter):
    def format(self):
        import json
        return json.dumps(self.data)

f = JsonFormatter()
print(f.format({"key": "value"}))  # Should print JSON string`,
      solution: `class Formatter:
    def format(self, data):
        return str(data)

class JsonFormatter(Formatter):
    def format(self, data):
        import json
        return json.dumps(data)

f = JsonFormatter()
print(f.format({"key": "value"}))  # {"key": "value"}`,
      hints: [
        'The overriding method must accept the same parameters.',
        'format(self) should be format(self, data).',
        'Use the data parameter directly, not self.data.',
      ],
      concepts: ['method override', 'Liskov substitution'],
    },
    {
      id: 'py-inherit-18',
      title: 'Write a Plugin System',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a Plugin base with name property and execute() method, then GreetPlugin that returns "Hello from {name}".',
      skeleton: `class Plugin:
    # name property, execute() raises NotImplementedError
    pass

class GreetPlugin(Plugin):
    # name = "greeter", execute() returns greeting
    pass`,
      solution: `class Plugin:
    @property
    def name(self):
        raise NotImplementedError

    def execute(self):
        raise NotImplementedError

class GreetPlugin(Plugin):
    @property
    def name(self):
        return "greeter"

    def execute(self):
        return f"Hello from {self.name}"`,
      hints: [
        'Plugin defines name as a property and execute() as a method, both raising NotImplementedError.',
        'GreetPlugin overrides both with concrete implementations.',
        'Use @property for name in both classes.',
      ],
      concepts: ['plugin pattern', '@property', 'NotImplementedError'],
    },
    {
      id: 'py-inherit-19',
      title: 'Refactor: Extract Base Class',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the duplicated code in Dog and Cat into a shared Animal base class.',
      skeleton: `class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def info(self):
        return f"{self.name}, age {self.age}"

    def speak(self):
        return "Woof!"

class Cat:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def info(self):
        return f"{self.name}, age {self.age}"

    def speak(self):
        return "Meow!"`,
      solution: `class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def info(self):
        return f"{self.name}, age {self.age}"

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"`,
      hints: [
        'Move shared __init__ and info() into an Animal base class.',
        'Dog and Cat inherit from Animal and only define speak().',
        'This eliminates code duplication.',
      ],
      concepts: ['refactoring', 'DRY', 'base class extraction'],
    },
    {
      id: 'py-inherit-20',
      title: 'Refactor: isinstance Chain to Polymorphism',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the isinstance chain into polymorphic method calls.',
      skeleton: `class Circle:
    def __init__(self, r):
        self.r = r

class Square:
    def __init__(self, side):
        self.side = side

def get_area(shape):
    if isinstance(shape, Circle):
        import math
        return math.pi * shape.r ** 2
    elif isinstance(shape, Square):
        return shape.side ** 2
    raise ValueError("Unknown shape")

import math
print(get_area(Circle(5)))
print(get_area(Square(4)))`,
      solution: `import math

class Shape:
    def area(self):
        raise NotImplementedError

class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        return math.pi * self.r ** 2

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

print(Circle(5).area())
print(Square(4).area())`,
      hints: [
        'Add a Shape base class with an area() method.',
        'Move area logic into each subclass.',
        'Call shape.area() instead of checking isinstance.',
      ],
      concepts: ['polymorphism', 'refactoring', 'open/closed principle'],
    },
  ],
};
