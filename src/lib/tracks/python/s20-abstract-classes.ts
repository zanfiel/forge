import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-abstract',
  title: '20. Abstract Classes',
  explanation: `## Abstract Classes

Abstract classes define **interfaces** that subclasses must implement. Python provides them via the \\\`abc\\\` module.

### Basic Pattern
\\\`\\\`\\\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    def describe(self):          # concrete method
        return f"Area: {self.area()}"
\\\`\\\`\\\`

### Key Rules
- Cannot instantiate an ABC directly (\\\`TypeError\\\`).
- Subclasses **must** implement all abstract methods or they remain abstract too.
- ABCs can contain concrete methods that call abstract methods (Template Method pattern).

### Abstract Properties
\\\`\\\`\\\`python
class Configurable(ABC):
    @property
    @abstractmethod
    def config_key(self):
        pass
\\\`\\\`\\\`

### Virtual Subclasses
\\\`\\\`\\\`python
Shape.register(Triangle)
isinstance(Triangle(), Shape)  # True
\\\`\\\`\\\`
Registers a class as a virtual subclass without inheritance.

### ABCMeta
\\\`ABC\\\` is shorthand for \\\`metaclass=ABCMeta\\\`. You can also use \\\`class Shape(metaclass=ABCMeta)\\\` directly.
`,
  exercises: [
    {
      id: 'py-abstract-1',
      title: 'Import ABC and abstractmethod',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Import ABC and abstractmethod from the abc module.',
      skeleton: `from abc import __BLANK__

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass`,
      solution: `from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass`,
      hints: [
        'You need both ABC and abstractmethod from the abc module.',
        'Separate them with a comma.',
        'The answer is: ABC, abstractmethod',
      ],
      concepts: ['abc module', 'ABC', 'abstractmethod'],
    },
    {
      id: 'py-abstract-2',
      title: 'Define Abstract Class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Make Vehicle an abstract class.',
      skeleton: `from abc import ABC, abstractmethod

class Vehicle(__BLANK__):
    @abstractmethod
    def start(self):
        pass`,
      solution: `from abc import ABC, abstractmethod

class Vehicle(ABC):
    @abstractmethod
    def start(self):
        pass`,
      hints: [
        'Abstract classes inherit from ABC.',
        'ABC is the abstract base class helper.',
        'The answer is: ABC',
      ],
      concepts: ['ABC', 'abstract class'],
    },
    {
      id: 'py-abstract-3',
      title: '@abstractmethod Decorator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Mark the process method as abstract.',
      skeleton: `from abc import ABC, abstractmethod

class Processor(ABC):
    __BLANK__
    def process(self, data):
        pass`,
      solution: `from abc import ABC, abstractmethod

class Processor(ABC):
    @abstractmethod
    def process(self, data):
        pass`,
      hints: [
        'Use the @abstractmethod decorator.',
        'Place it directly above the method definition.',
        'The answer is: @abstractmethod',
      ],
      concepts: ['@abstractmethod'],
    },
    {
      id: 'py-abstract-4',
      title: 'Concrete Method in ABC',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Add a concrete method that uses the abstract method.',
      skeleton: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    def describe(self):
        return f"This shape has area {__BLANK__}"

class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        import math
        return math.pi * self.r ** 2

c = Circle(5)
print(c.describe())`,
      solution: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    def describe(self):
        return f"This shape has area {self.area()}"

class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        import math
        return math.pi * self.r ** 2

c = Circle(5)
print(c.describe())`,
      hints: [
        'Concrete methods in ABCs can call abstract methods.',
        'Call the abstract method on self.',
        'The answer is: self.area()',
      ],
      concepts: ['concrete method', 'template method pattern'],
    },
    {
      id: 'py-abstract-5',
      title: 'Abstract Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Define an abstract property called name.',
      skeleton: `from abc import ABC, abstractmethod

class Plugin(ABC):
    @property
    __BLANK__
    def name(self):
        pass

class MyPlugin(Plugin):
    @property
    def name(self):
        return "my-plugin"

p = MyPlugin()
print(p.name)  # my-plugin`,
      solution: `from abc import ABC, abstractmethod

class Plugin(ABC):
    @property
    @abstractmethod
    def name(self):
        pass

class MyPlugin(Plugin):
    @property
    def name(self):
        return "my-plugin"

p = MyPlugin()
print(p.name)  # my-plugin`,
      hints: [
        'Stack @property and @abstractmethod together.',
        '@property goes first (outermost), @abstractmethod second.',
        'The answer is: @abstractmethod',
      ],
      concepts: ['abstract property', '@property', '@abstractmethod'],
    },
    {
      id: 'py-abstract-6',
      title: 'Implement Abstract Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Implement the required abstract method in the subclass.',
      skeleton: `from abc import ABC, abstractmethod

class Serializer(ABC):
    @abstractmethod
    def serialize(self, data):
        pass

class JsonSerializer(Serializer):
    def __BLANK__(self, data):
        import json
        return json.dumps(data)

s = JsonSerializer()
print(s.serialize({"a": 1}))  # {"a": 1}`,
      solution: `from abc import ABC, abstractmethod

class Serializer(ABC):
    @abstractmethod
    def serialize(self, data):
        pass

class JsonSerializer(Serializer):
    def serialize(self, data):
        import json
        return json.dumps(data)

s = JsonSerializer()
print(s.serialize({"a": 1}))  # {"a": 1}`,
      hints: [
        'The subclass must implement the method with the same name.',
        'The abstract method is called serialize.',
        'The answer is: serialize',
      ],
      concepts: ['abstract method implementation'],
    },
    {
      id: 'py-abstract-7',
      title: 'Write Shape ABC',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a Shape ABC with abstract area() and perimeter(). Then implement Circle(radius) and Rectangle(w, h).',
      skeleton: `from abc import ABC, abstractmethod
import math

class Shape(ABC):
    # abstract: area(), perimeter()
    pass

class Circle(Shape):
    # radius
    pass

class Rectangle(Shape):
    # w, h
    pass`,
      solution: `from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

    def perimeter(self):
        return 2 * math.pi * self.radius

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

    def perimeter(self):
        return 2 * (self.w + self.h)`,
      hints: [
        'Shape defines two @abstractmethod methods.',
        'Circle and Rectangle each implement both area() and perimeter().',
        'Use math.pi for circle calculations.',
      ],
      concepts: ['ABC', '@abstractmethod', 'polymorphism'],
    },
    {
      id: 'py-abstract-8',
      title: 'Write Database ABC',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Database ABC with abstract connect(), disconnect(), and query(sql). Implement a FakeDB that stores connection state and returns a fake result.',
      skeleton: `from abc import ABC, abstractmethod

class Database(ABC):
    # abstract: connect(), disconnect(), query(sql)
    pass

class FakeDB(Database):
    # Implement all methods
    pass`,
      solution: `from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def disconnect(self):
        pass

    @abstractmethod
    def query(self, sql):
        pass

class FakeDB(Database):
    def __init__(self):
        self.connected = False

    def connect(self):
        self.connected = True

    def disconnect(self):
        self.connected = False

    def query(self, sql):
        if not self.connected:
            raise RuntimeError("Not connected")
        return f"Result for: {sql}"`,
      hints: [
        'Database has three abstract methods.',
        'FakeDB tracks connection state with a boolean.',
        'query() should check connection state before executing.',
      ],
      concepts: ['ABC', 'interface', 'state management'],
    },
    {
      id: 'py-abstract-9',
      title: 'Write Serializer ABC',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Serializer ABC with abstract serialize(data) and deserialize(text). Implement JsonSerializer and CsvSerializer (for list of dicts).',
      skeleton: `from abc import ABC, abstractmethod
import json
import csv
import io

class Serializer(ABC):
    # abstract: serialize(data), deserialize(text)
    pass

class JsonSerializer(Serializer):
    pass

class CsvSerializer(Serializer):
    # Works with list of dicts
    pass`,
      solution: `from abc import ABC, abstractmethod
import json
import csv
import io

class Serializer(ABC):
    @abstractmethod
    def serialize(self, data):
        pass

    @abstractmethod
    def deserialize(self, text):
        pass

class JsonSerializer(Serializer):
    def serialize(self, data):
        return json.dumps(data)

    def deserialize(self, text):
        return json.loads(text)

class CsvSerializer(Serializer):
    def serialize(self, data):
        if not data:
            return ""
        output = io.StringIO()
        writer = csv.DictWriter(output, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)
        return output.getvalue()

    def deserialize(self, text):
        reader = csv.DictReader(io.StringIO(text))
        return list(reader)`,
      hints: [
        'JsonSerializer uses json.dumps/json.loads.',
        'CsvSerializer uses csv.DictWriter/DictReader with io.StringIO.',
        'Both must implement serialize and deserialize.',
      ],
      concepts: ['ABC', 'serialization', 'json', 'csv'],
    },
    {
      id: 'py-abstract-10',
      title: 'Predict: TypeError on Instantiation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass

try:
    a = Animal()
    print("Created")
except TypeError as e:
    print("TypeError")`,
      solution: `TypeError`,
      hints: [
        'You cannot instantiate an abstract class directly.',
        'Python raises TypeError.',
        'All abstract methods must be implemented first.',
      ],
      concepts: ['ABC', 'TypeError', 'instantiation'],
    },
    {
      id: 'py-abstract-11',
      title: 'Predict: isinstance with ABC',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `from abc import ABC, abstractmethod

class Printable(ABC):
    @abstractmethod
    def to_string(self):
        pass

class Document(Printable):
    def to_string(self):
        return "doc"

d = Document()
print(isinstance(d, Printable))
print(isinstance(d, Document))
print(issubclass(Document, Printable))`,
      solution: `True
True
True`,
      hints: [
        'Document inherits from Printable.',
        'isinstance checks the full inheritance chain.',
        'issubclass checks class relationships.',
      ],
      concepts: ['isinstance', 'issubclass', 'ABC'],
    },
    {
      id: 'py-abstract-12',
      title: 'Write PaymentProcessor ABC',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a PaymentProcessor ABC with abstract process(amount) and refund(amount). Add a concrete log(msg) method. Implement StripeProcessor.',
      skeleton: `from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    # abstract: process(amount), refund(amount)
    # concrete: log(msg) prints the message
    pass

class StripeProcessor(PaymentProcessor):
    pass`,
      solution: `from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    @abstractmethod
    def process(self, amount):
        pass

    @abstractmethod
    def refund(self, amount):
        pass

    def log(self, msg):
        print(f"[Payment] {msg}")

class StripeProcessor(PaymentProcessor):
    def process(self, amount):
        self.log(f"Processing \${amount} via Stripe")
        return True

    def refund(self, amount):
        self.log(f"Refunding \${amount} via Stripe")
        return True`,
      hints: [
        'PaymentProcessor has two abstract methods and one concrete.',
        'The concrete log() method can be used by all subclasses.',
        'StripeProcessor implements both abstract methods.',
      ],
      concepts: ['ABC', 'concrete method', 'interface'],
    },
    {
      id: 'py-abstract-13',
      title: 'Fix: Missing @abstractmethod',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the ABC so it actually enforces implementation of the execute method.',
      skeleton: `from abc import ABC, abstractmethod

class Command(ABC):
    def execute(self):
        pass

class PrintCommand(Command):
    pass

# This should raise TypeError but does not:
c = PrintCommand()
print(c.execute())  # None -- should not be possible without implementing execute`,
      solution: `from abc import ABC, abstractmethod

class Command(ABC):
    @abstractmethod
    def execute(self):
        pass

class PrintCommand(Command):
    def execute(self):
        print("Executing print command")

c = PrintCommand()
c.execute()`,
      hints: [
        'Without @abstractmethod, the method is just a regular method.',
        'Add @abstractmethod to enforce implementation.',
        'PrintCommand must then implement execute().',
      ],
      concepts: ['@abstractmethod', 'enforcement'],
    },
    {
      id: 'py-abstract-14',
      title: 'Fix: Missing ABC Inheritance',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the class so @abstractmethod actually prevents direct instantiation.',
      skeleton: `from abc import abstractmethod

class Handler:
    @abstractmethod
    def handle(self, request):
        pass

# This should fail but does not:
h = Handler()
print(h.handle("test"))  # None -- should raise TypeError`,
      solution: `from abc import ABC, abstractmethod

class Handler(ABC):
    @abstractmethod
    def handle(self, request):
        pass

# Now this raises TypeError:
# h = Handler()`,
      hints: [
        '@abstractmethod alone is not enough.',
        'The class must inherit from ABC (or use metaclass=ABCMeta).',
        'Add ABC as the base class.',
      ],
      concepts: ['ABC', '@abstractmethod', 'metaclass'],
    },
    {
      id: 'py-abstract-15',
      title: 'Write Plugin ABC with Hooks',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a Plugin ABC with abstract name property, abstract execute(), and concrete before_execute()/after_execute() hook methods. Add a run() template method.',
      skeleton: `from abc import ABC, abstractmethod

class Plugin(ABC):
    # abstract: name (property), execute()
    # concrete: before_execute(), after_execute()
    # template: run() calls before -> execute -> after
    pass`,
      solution: `from abc import ABC, abstractmethod

class Plugin(ABC):
    @property
    @abstractmethod
    def name(self):
        pass

    @abstractmethod
    def execute(self):
        pass

    def before_execute(self):
        print(f"[{self.name}] Starting...")

    def after_execute(self):
        print(f"[{self.name}] Done.")

    def run(self):
        self.before_execute()
        result = self.execute()
        self.after_execute()
        return result`,
      hints: [
        'name is an abstract property (stack @property and @abstractmethod).',
        'run() is the template method calling hooks and execute().',
        'before/after hooks are concrete with default implementations.',
      ],
      concepts: ['ABC', 'template method', 'hooks', 'abstract property'],
    },
    {
      id: 'py-abstract-16',
      title: 'Predict: register() Virtual Subclass',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `from abc import ABC, abstractmethod

class Drawable(ABC):
    @abstractmethod
    def draw(self):
        pass

class Line:
    def draw(self):
        return "---"

Drawable.register(Line)

line = Line()
print(isinstance(line, Drawable))
print(issubclass(Line, Drawable))`,
      solution: `True
True`,
      hints: [
        'register() makes a class a virtual subclass.',
        'isinstance and issubclass return True after registration.',
        'Line does not actually inherit from Drawable, but is registered.',
      ],
      concepts: ['register()', 'virtual subclass'],
    },
    {
      id: 'py-abstract-17',
      title: 'Fix: Incomplete Implementation',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the subclass so all abstract methods are implemented.',
      skeleton: `from abc import ABC, abstractmethod

class Storage(ABC):
    @abstractmethod
    def save(self, key, value):
        pass

    @abstractmethod
    def load(self, key):
        pass

    @abstractmethod
    def delete(self, key):
        pass

class MemoryStorage(Storage):
    def __init__(self):
        self._data = {}

    def save(self, key, value):
        self._data[key] = value

    def load(self, key):
        return self._data.get(key)

# TypeError: Can't instantiate abstract class MemoryStorage
s = MemoryStorage()`,
      solution: `from abc import ABC, abstractmethod

class Storage(ABC):
    @abstractmethod
    def save(self, key, value):
        pass

    @abstractmethod
    def load(self, key):
        pass

    @abstractmethod
    def delete(self, key):
        pass

class MemoryStorage(Storage):
    def __init__(self):
        self._data = {}

    def save(self, key, value):
        self._data[key] = value

    def load(self, key):
        return self._data.get(key)

    def delete(self, key):
        self._data.pop(key, None)

s = MemoryStorage()`,
      hints: [
        'MemoryStorage is missing the delete() implementation.',
        'All three abstract methods must be implemented.',
        'Add delete() using self._data.pop(key, None).',
      ],
      concepts: ['@abstractmethod', 'incomplete implementation'],
    },
    {
      id: 'py-abstract-18',
      title: 'Write Validator with Template Method',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a Validator ABC with abstract get_rules() returning a list of (name, check_func) tuples. Add a concrete validate(data) that runs all rules and returns errors.',
      skeleton: `from abc import ABC, abstractmethod

class Validator(ABC):
    # abstract: get_rules() -> list of (name, check_func)
    # concrete: validate(data) -> list of error strings
    pass

class UserValidator(Validator):
    # rules: name must be non-empty, age must be positive
    pass`,
      solution: `from abc import ABC, abstractmethod

class Validator(ABC):
    @abstractmethod
    def get_rules(self):
        pass

    def validate(self, data):
        errors = []
        for name, check in self.get_rules():
            if not check(data):
                errors.append(f"Failed: {name}")
        return errors

class UserValidator(Validator):
    def get_rules(self):
        return [
            ("name must be non-empty", lambda d: bool(d.get("name", "").strip())),
            ("age must be positive", lambda d: d.get("age", 0) > 0),
        ]`,
      hints: [
        'get_rules() returns a list of (name, callable) tuples.',
        'validate() iterates rules and collects failures.',
        'Each check function receives the data and returns True/False.',
      ],
      concepts: ['template method', 'ABC', 'validation'],
    },
    {
      id: 'py-abstract-19',
      title: 'Refactor: Duck Typing to ABC',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the duck-typed code to use an explicit ABC, ensuring all renderers implement render().',
      skeleton: `class HtmlRenderer:
    def render(self, content):
        return f"<p>{content}</p>"

class MarkdownRenderer:
    def render(self, content):
        return f"**{content}**"

def render_page(renderer, content):
    return renderer.render(content)`,
      solution: `from abc import ABC, abstractmethod

class Renderer(ABC):
    @abstractmethod
    def render(self, content):
        pass

class HtmlRenderer(Renderer):
    def render(self, content):
        return f"<p>{content}</p>"

class MarkdownRenderer(Renderer):
    def render(self, content):
        return f"**{content}**"

def render_page(renderer: Renderer, content):
    return renderer.render(content)`,
      hints: [
        'Create a Renderer ABC with abstract render().',
        'Make HtmlRenderer and MarkdownRenderer inherit from it.',
        'Add a type hint to render_page for clarity.',
      ],
      concepts: ['ABC', 'refactoring', 'interface'],
    },
    {
      id: 'py-abstract-20',
      title: 'Refactor: Concrete to Abstract Base',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the concrete base class to an ABC that enforces subclass contracts.',
      skeleton: `class Cache:
    def get(self, key):
        raise NotImplementedError

    def set(self, key, value):
        raise NotImplementedError

    def clear(self):
        raise NotImplementedError

class MemoryCache(Cache):
    def __init__(self):
        self._store = {}

    def get(self, key):
        return self._store.get(key)

    def set(self, key, value):
        self._store[key] = value

    def clear(self):
        self._store.clear()`,
      solution: `from abc import ABC, abstractmethod

class Cache(ABC):
    @abstractmethod
    def get(self, key):
        pass

    @abstractmethod
    def set(self, key, value):
        pass

    @abstractmethod
    def clear(self):
        pass

class MemoryCache(Cache):
    def __init__(self):
        self._store = {}

    def get(self, key):
        return self._store.get(key)

    def set(self, key, value):
        self._store[key] = value

    def clear(self):
        self._store.clear()`,
      hints: [
        'Replace NotImplementedError with @abstractmethod.',
        'Inherit from ABC instead of plain class.',
        'This gives compile-time enforcement instead of runtime errors.',
      ],
      concepts: ['ABC', 'refactoring', '@abstractmethod'],
    },
  ],
};
