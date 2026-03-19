import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-factory',
  title: '47. Factory Pattern',
  explanation: `## Factory Pattern

The Factory pattern provides an interface for creating objects without specifying their exact class.

### Simple Factory
\`\`\`python
class Dog:
    def speak(self): return "Woof"

class Cat:
    def speak(self): return "Meow"

def animal_factory(kind):
    if kind == "dog":
        return Dog()
    elif kind == "cat":
        return Cat()
    raise ValueError(f"Unknown animal: {kind}")
\`\`\`

### Factory Method
A base class defines the interface; subclasses decide which class to instantiate.
\`\`\`python
from abc import ABC, abstractmethod

class Creator(ABC):
    @abstractmethod
    def create_product(self):
        pass

    def operation(self):
        product = self.create_product()
        return product.use()
\`\`\`

### Abstract Factory
Creates families of related objects without specifying concrete classes.

### Registry Pattern
\`\`\`python
class Registry:
    _classes = {}

    @classmethod
    def register(cls, name):
        def decorator(klass):
            cls._classes[name] = klass
            return klass
        return decorator

    @classmethod
    def create(cls, name, **kwargs):
        return cls._classes[name](**kwargs)
\`\`\`

### When to Use
- Object creation logic is complex
- You want to decouple creation from usage
- You need to create families of related objects
- You want a centralized place to manage object creation
`,
  exercises: [
    {
      id: 'py-factory-1',
      title: 'Simple factory function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a simple factory function.',
      skeleton: `class Circle:
    def area(self, r):
        return 3.14159 * r ** 2

class Square:
    def area(self, s):
        return s ** 2

def shape_factory(kind):
    if kind == "circle":
        __BLANK__ Circle()
    elif kind == "square":
        __BLANK__ Square()
    raise ValueError(f"Unknown shape: {kind}")

shape = shape_factory("circle")
print(type(shape).__name__)`,
      solution: `class Circle:
    def area(self, r):
        return 3.14159 * r ** 2

class Square:
    def area(self, s):
        return s ** 2

def shape_factory(kind):
    if kind == "circle":
        return Circle()
    elif kind == "square":
        return Square()
    raise ValueError(f"Unknown shape: {kind}")

shape = shape_factory("circle")
print(type(shape).__name__)`,
      hints: [
        'A factory function creates and gives back an object.',
        'The keyword to send a value back from a function.',
        'The answer is: return',
      ],
      concepts: ['factory function', 'return', 'object creation'],
    },
    {
      id: 'py-factory-2',
      title: 'Factory with dict mapping',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use a dictionary to map names to classes.',
      skeleton: `class CSV:
    def parse(self, data): return data.split(",")

class JSON:
    def parse(self, data): return {"raw": data}

__BLANK__ = {
    "csv": CSV,
    "json": JSON,
}

def parser_factory(fmt):
    cls = __BLANK__.get(fmt)
    if cls is None:
        raise ValueError(f"Unknown format: {fmt}")
    return cls()

p = parser_factory("csv")
print(p.parse("a,b,c"))`,
      solution: `class CSV:
    def parse(self, data): return data.split(",")

class JSON:
    def parse(self, data): return {"raw": data}

PARSERS = {
    "csv": CSV,
    "json": JSON,
}

def parser_factory(fmt):
    cls = PARSERS.get(fmt)
    if cls is None:
        raise ValueError(f"Unknown format: {fmt}")
    return cls()

p = parser_factory("csv")
print(p.parse("a,b,c"))`,
      hints: [
        'A dictionary maps string names to class objects.',
        'Use a descriptive name for the mapping dict.',
        'The answer is: PARSERS',
      ],
      concepts: ['dict mapping', 'factory', 'class objects'],
    },
    {
      id: 'py-factory-3',
      title: 'Factory with constructor args',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Pass arguments through the factory to constructors.',
      skeleton: `class Logger:
    def __init__(self, level):
        self.level = level

class FileLogger(Logger):
    def __init__(self, level, filename):
        super().__init__(level)
        self.filename = filename

def create_logger(kind, __BLANK__, **kwargs):
    if kind == "console":
        return Logger(__BLANK__, **kwargs)
    elif kind == "file":
        return FileLogger(__BLANK__, **kwargs)

log = create_logger("file", "DEBUG", filename="app.log")
print(log.level, log.filename)`,
      solution: `class Logger:
    def __init__(self, level):
        self.level = level

class FileLogger(Logger):
    def __init__(self, level, filename):
        super().__init__(level)
        self.filename = filename

def create_logger(kind, level, **kwargs):
    if kind == "console":
        return Logger(level, **kwargs)
    elif kind == "file":
        return FileLogger(level, **kwargs)

log = create_logger("file", "DEBUG", filename="app.log")
print(log.level, log.filename)`,
      hints: [
        'The factory needs to accept and forward constructor arguments.',
        'A positional parameter name for the log level.',
        'The answer is: level',
      ],
      concepts: ['factory', 'constructor arguments', '**kwargs'],
    },
    {
      id: 'py-factory-4',
      title: 'Write a vehicle factory',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a factory function for creating vehicles.',
      skeleton: `class Car:
    def __init__(self, brand):
        self.brand = brand
    def describe(self):
        return f"Car: {self.brand}"

class Truck:
    def __init__(self, brand):
        self.brand = brand
    def describe(self):
        return f"Truck: {self.brand}"

class Motorcycle:
    def __init__(self, brand):
        self.brand = brand
    def describe(self):
        return f"Motorcycle: {self.brand}"

# Write a function 'create_vehicle' that:
# 1. Takes vehicle_type (str) and brand (str)
# 2. Returns the appropriate vehicle instance
# 3. Raises ValueError for unknown types

def create_vehicle(vehicle_type, brand):
    pass`,
      solution: `class Car:
    def __init__(self, brand):
        self.brand = brand
    def describe(self):
        return f"Car: {self.brand}"

class Truck:
    def __init__(self, brand):
        self.brand = brand
    def describe(self):
        return f"Truck: {self.brand}"

class Motorcycle:
    def __init__(self, brand):
        self.brand = brand
    def describe(self):
        return f"Motorcycle: {self.brand}"

def create_vehicle(vehicle_type, brand):
    vehicles = {
        "car": Car,
        "truck": Truck,
        "motorcycle": Motorcycle,
    }
    cls = vehicles.get(vehicle_type)
    if cls is None:
        raise ValueError(f"Unknown vehicle type: {vehicle_type}")
    return cls(brand)`,
      hints: [
        'Map type strings to classes in a dictionary.',
        'Look up the class, instantiate with brand, or raise ValueError.',
        'vehicles = {"car": Car, ...} then vehicles[type](brand).',
      ],
      concepts: ['factory function', 'dict mapping'],
    },
    {
      id: 'py-factory-5',
      title: 'Predict factory output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Predict what the factory creates.',
      skeleton: `class A:
    name = "Alpha"

class B:
    name = "Beta"

class C:
    name = "Gamma"

registry = {"a": A, "b": B, "c": C}

objects = [registry[k]() for k in ["c", "a", "b"]]
print([obj.name for obj in objects])`,
      solution: `['Gamma', 'Alpha', 'Beta']`,
      hints: [
        'The list comprehension creates objects in order: c, a, b.',
        'registry["c"]() creates C(), registry["a"]() creates A(), etc.',
        'Output: ["Gamma", "Alpha", "Beta"].',
      ],
      concepts: ['factory', 'registry', 'list comprehension'],
    },
    {
      id: 'py-factory-6',
      title: 'Fix factory returning class',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the factory that returns a class instead of an instance.',
      skeleton: `class Email:
    def send(self, msg):
        return f"Email: {msg}"

class SMS:
    def send(self, msg):
        return f"SMS: {msg}"

def notifier_factory(channel):
    channels = {"email": Email, "sms": SMS}
    return channels[channel]  # Bug: returns class, not instance

n = notifier_factory("email")
print(n.send("Hello"))  # AttributeError: send needs self`,
      solution: `class Email:
    def send(self, msg):
        return f"Email: {msg}"

class SMS:
    def send(self, msg):
        return f"SMS: {msg}"

def notifier_factory(channel):
    channels = {"email": Email, "sms": SMS}
    return channels[channel]()

n = notifier_factory("email")
print(n.send("Hello"))`,
      hints: [
        'The factory returns the class object, not an instance.',
        'You need to call the class to create an instance.',
        'Add () after channels[channel] to instantiate it.',
      ],
      concepts: ['factory', 'class vs instance', 'instantiation'],
    },
    {
      id: 'py-factory-7',
      title: 'Factory Method pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Implement the Factory Method pattern with abstract base class.',
      skeleton: `from abc import ABC, abstractmethod

class Document(ABC):
    @__BLANK__
    def create_page(self):
        pass

    def add_pages(self, count):
        return [self.create_page() for _ in range(count)]

class PDFDocument(Document):
    def create_page(self):
        return "PDF Page"

class HTMLDocument(Document):
    def create_page(self):
        return "HTML Page"

doc = PDFDocument()
print(doc.add_pages(2))`,
      solution: `from abc import ABC, abstractmethod

class Document(ABC):
    @abstractmethod
    def create_page(self):
        pass

    def add_pages(self, count):
        return [self.create_page() for _ in range(count)]

class PDFDocument(Document):
    def create_page(self):
        return "PDF Page"

class HTMLDocument(Document):
    def create_page(self):
        return "HTML Page"

doc = PDFDocument()
print(doc.add_pages(2))`,
      hints: [
        'The decorator marks a method that subclasses must implement.',
        'It comes from the abc module.',
        'The answer is: abstractmethod',
      ],
      concepts: ['Factory Method', 'abstractmethod', 'ABC'],
    },
    {
      id: 'py-factory-8',
      title: 'Write Factory Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Implement the Factory Method pattern for a notification system.',
      skeleton: `from abc import ABC, abstractmethod

class Notification(ABC):
    @abstractmethod
    def send(self, message): pass

class EmailNotification(Notification):
    def send(self, message):
        return f"Email: {message}"

class PushNotification(Notification):
    def send(self, message):
        return f"Push: {message}"

# Write an abstract class 'NotificationService' with:
# 1. Abstract method 'create_notification' (factory method)
# 2. Method 'notify' that creates a notification and sends the message
# Then write EmailService and PushService that implement the factory method

class NotificationService(ABC):
    pass`,
      solution: `from abc import ABC, abstractmethod

class Notification(ABC):
    @abstractmethod
    def send(self, message): pass

class EmailNotification(Notification):
    def send(self, message):
        return f"Email: {message}"

class PushNotification(Notification):
    def send(self, message):
        return f"Push: {message}"

class NotificationService(ABC):
    @abstractmethod
    def create_notification(self) -> Notification:
        pass

    def notify(self, message):
        notification = self.create_notification()
        return notification.send(message)

class EmailService(NotificationService):
    def create_notification(self):
        return EmailNotification()

class PushService(NotificationService):
    def create_notification(self):
        return PushNotification()`,
      hints: [
        'The base class has an abstract factory method and a concrete notify method.',
        'notify() calls create_notification() then sends the message.',
        'Each service subclass implements create_notification to return its type.',
      ],
      concepts: ['Factory Method', 'abstract class', 'polymorphism'],
    },
    {
      id: 'py-factory-9',
      title: 'Registry decorator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use a decorator to auto-register classes in a factory.',
      skeleton: `_registry = {}

def register(name):
    def decorator(cls):
        __BLANK__[name] = cls
        return cls
    return decorator

def create(name, **kwargs):
    return _registry[name](**kwargs)

@register("postgres")
class PostgresDB:
    def __init__(self, host="localhost"):
        self.host = host

@register("sqlite")
class SQLiteDB:
    def __init__(self, path=":memory:"):
        self.path = path

db = create("postgres", host="db.example.com")
print(db.host)`,
      solution: `_registry = {}

def register(name):
    def decorator(cls):
        _registry[name] = cls
        return cls
    return decorator

def create(name, **kwargs):
    return _registry[name](**kwargs)

@register("postgres")
class PostgresDB:
    def __init__(self, host="localhost"):
        self.host = host

@register("sqlite")
class SQLiteDB:
    def __init__(self, path=":memory:"):
        self.path = path

db = create("postgres", host="db.example.com")
print(db.host)`,
      hints: [
        'The decorator needs to store the class in the registry dict.',
        'The registry is the module-level dict.',
        'The answer is: _registry',
      ],
      concepts: ['registry pattern', 'decorator', 'factory'],
    },
    {
      id: 'py-factory-10',
      title: 'Predict registry behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict the registry state after class definitions.',
      skeleton: `registry = {}

def register(cls):
    registry[cls.__name__] = cls
    return cls

@register
class Alpha:
    pass

@register
class Beta:
    pass

@register
class Gamma:
    pass

print(sorted(registry.keys()))
print(isinstance(registry["Beta"](), Beta))`,
      solution: `['Alpha', 'Beta', 'Gamma']
True`,
      hints: [
        'Each @register adds the class to registry using its __name__.',
        'Three classes are registered: Alpha, Beta, Gamma.',
        'registry["Beta"] is the Beta class, so instantiating it gives a Beta instance.',
      ],
      concepts: ['registry', 'decorator', '__name__'],
    },
    {
      id: 'py-factory-11',
      title: 'Fix abstract factory',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the abstract factory that can be instantiated directly.',
      skeleton: `class UIFactory:
    def create_button(self):
        raise NotImplementedError

    def create_input(self):
        raise NotImplementedError

class DarkThemeFactory(UIFactory):
    def create_button(self):
        return "Dark Button"
    def create_input(self):
        return "Dark Input"

# Bug: UIFactory can be instantiated directly
f = UIFactory()
f.create_button()  # Raises NotImplementedError at runtime instead of preventing instantiation`,
      solution: `from abc import ABC, abstractmethod

class UIFactory(ABC):
    @abstractmethod
    def create_button(self):
        pass

    @abstractmethod
    def create_input(self):
        pass

class DarkThemeFactory(UIFactory):
    def create_button(self):
        return "Dark Button"
    def create_input(self):
        return "Dark Input"

# Now UIFactory() raises TypeError -- cannot instantiate abstract class`,
      hints: [
        'Using NotImplementedError only catches errors at runtime.',
        'ABC with @abstractmethod prevents instantiation at class level.',
        'Change UIFactory to inherit from ABC and use @abstractmethod.',
      ],
      concepts: ['ABC', 'abstractmethod', 'Abstract Factory'],
    },
    {
      id: 'py-factory-12',
      title: 'Write Abstract Factory',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Implement the Abstract Factory pattern.',
      skeleton: `from abc import ABC, abstractmethod

# Write an abstract factory for UI themes:
# 1. Abstract GUIFactory with: create_button(), create_checkbox()
# 2. WindowsFactory creating "Windows Button" / "Windows Checkbox"
# 3. MacFactory creating "Mac Button" / "Mac Checkbox"
# 4. A function 'create_ui(factory)' that creates and returns both

class GUIFactory(ABC):
    pass`,
      solution: `from abc import ABC, abstractmethod

class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> str:
        pass

    @abstractmethod
    def create_checkbox(self) -> str:
        pass

class WindowsFactory(GUIFactory):
    def create_button(self):
        return "Windows Button"

    def create_checkbox(self):
        return "Windows Checkbox"

class MacFactory(GUIFactory):
    def create_button(self):
        return "Mac Button"

    def create_checkbox(self):
        return "Mac Checkbox"

def create_ui(factory: GUIFactory):
    button = factory.create_button()
    checkbox = factory.create_checkbox()
    return button, checkbox`,
      hints: [
        'GUIFactory defines abstract methods for each UI element.',
        'Each concrete factory returns its themed elements.',
        'create_ui calls both factory methods and returns the results.',
      ],
      concepts: ['Abstract Factory', 'ABC', 'product families'],
    },
    {
      id: 'py-factory-13',
      title: 'Write plugin registry',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a plugin registry system using factory pattern.',
      skeleton: `# Write a class 'PluginRegistry' with:
# 1. Class-level dict '_plugins'
# 2. @classmethod register(cls, name) decorator factory
# 3. @classmethod create(cls, name, *args, **kwargs) to instantiate
# 4. @classmethod list_plugins(cls) returns list of registered names

class PluginRegistry:
    pass`,
      solution: `class PluginRegistry:
    _plugins = {}

    @classmethod
    def register(cls, name):
        def decorator(plugin_cls):
            cls._plugins[name] = plugin_cls
            return plugin_cls
        return decorator

    @classmethod
    def create(cls, name, *args, **kwargs):
        if name not in cls._plugins:
            raise KeyError(f"Plugin not found: {name}")
        return cls._plugins[name](*args, **kwargs)

    @classmethod
    def list_plugins(cls):
        return list(cls._plugins.keys())`,
      hints: [
        'register returns a decorator that adds the class to _plugins.',
        'create looks up the name and instantiates with args/kwargs.',
        'list_plugins returns the keys of _plugins as a list.',
      ],
      concepts: ['plugin registry', 'decorator factory', 'classmethod'],
    },
    {
      id: 'py-factory-14',
      title: 'Factory with __init_subclass__',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Use __init_subclass__ for automatic factory registration.',
      skeleton: `# Write a class 'Serializer' that:
# 1. Has class-level dict '_formats'
# 2. Uses __init_subclass__ with keyword arg 'format' to auto-register
# 3. Has classmethod 'for_format(cls, fmt)' that returns an instance

class Serializer:
    pass`,
      solution: `class Serializer:
    _formats = {}

    def __init_subclass__(cls, format=None, **kwargs):
        super().__init_subclass__(**kwargs)
        if format is not None:
            Serializer._formats[format] = cls

    @classmethod
    def for_format(cls, fmt):
        if fmt not in cls._formats:
            raise ValueError(f"Unknown format: {fmt}")
        return cls._formats[fmt]()`,
      hints: [
        '__init_subclass__ receives keyword args from the class definition.',
        'class JSONSerializer(Serializer, format="json"): passes format="json".',
        'Store the class in _formats dict keyed by format string.',
      ],
      concepts: ['__init_subclass__', 'auto-registration', 'factory'],
    },
    {
      id: 'py-factory-15',
      title: 'Predict factory method dispatch',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Predict which factory method is called.',
      skeleton: `from abc import ABC, abstractmethod

class Transport(ABC):
    @abstractmethod
    def deliver(self): pass

class Truck(Transport):
    def deliver(self):
        return "by road"

class Ship(Transport):
    def deliver(self):
        return "by sea"

class Logistics(ABC):
    @abstractmethod
    def create_transport(self) -> Transport: pass

    def plan_delivery(self):
        t = self.create_transport()
        return f"Delivering {t.deliver()}"

class RoadLogistics(Logistics):
    def create_transport(self):
        return Truck()

class SeaLogistics(Logistics):
    def create_transport(self):
        return Ship()

print(RoadLogistics().plan_delivery())
print(SeaLogistics().plan_delivery())`,
      solution: `Delivering by road
Delivering by sea`,
      hints: [
        'RoadLogistics.create_transport returns Truck, SeaLogistics returns Ship.',
        'plan_delivery calls create_transport (factory method) then deliver.',
        'Truck.deliver returns "by road", Ship.deliver returns "by sea".',
      ],
      concepts: ['Factory Method', 'polymorphism', 'dispatch'],
    },
    {
      id: 'py-factory-16',
      title: 'Fix duplicate registration',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the registry that silently overwrites existing entries.',
      skeleton: `_registry = {}

def register(name):
    def decorator(cls):
        _registry[name] = cls  # Bug: silently overwrites if name exists
        return cls
    return decorator

@register("json")
class JSONParser:
    pass

@register("json")  # Oops: overwrites JSONParser
class JSONFormatter:
    pass

print(_registry["json"].__name__)  # JSONFormatter, not JSONParser!`,
      solution: `_registry = {}

def register(name):
    def decorator(cls):
        if name in _registry:
            raise ValueError(
                f"Name '{name}' already registered to {_registry[name].__name__}"
            )
        _registry[name] = cls
        return cls
    return decorator

@register("json")
class JSONParser:
    pass

# @register("json")  # Would now raise ValueError
# class JSONFormatter:
#     pass

print(_registry["json"].__name__)`,
      hints: [
        'Check if the name already exists before registering.',
        'Raise an error to alert developers of naming conflicts.',
        'Add "if name in _registry: raise ValueError(...)" before assignment.',
      ],
      concepts: ['registry', 'error handling', 'duplicate detection'],
    },
    {
      id: 'py-factory-17',
      title: 'Write config-driven factory',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a factory that creates objects from configuration dictionaries.',
      skeleton: `# Write a function 'from_config' that:
# 1. Takes a config dict with 'type' key and other kwargs
# 2. Looks up the type in a registry
# 3. Creates an instance with remaining config as kwargs
# Example: from_config({"type": "circle", "radius": 5})

_registry = {}

def register(name):
    def decorator(cls):
        _registry[name] = cls
        return cls
    return decorator

def from_config(config):
    pass`,
      solution: `_registry = {}

def register(name):
    def decorator(cls):
        _registry[name] = cls
        return cls
    return decorator

def from_config(config):
    config = dict(config)
    type_name = config.pop("type")
    if type_name not in _registry:
        raise ValueError(f"Unknown type: {type_name}")
    return _registry[type_name](**config)`,
      hints: [
        'Extract "type" from config, use remaining entries as kwargs.',
        'Use dict.pop("type") to remove the type key.',
        'Pass **config as keyword arguments to the constructor.',
      ],
      concepts: ['config-driven factory', 'dict unpacking', '**kwargs'],
    },
    {
      id: 'py-factory-18',
      title: 'Write lazy factory',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a factory that lazily creates and caches instances.',
      skeleton: `# Write a class 'LazyFactory' that:
# 1. Takes a dict of {name: class} in __init__
# 2. get(name) creates an instance on first call, caches it
# 3. Subsequent get(name) calls return the cached instance
# 4. reset(name) clears the cache for that name

class LazyFactory:
    pass`,
      solution: `class LazyFactory:
    def __init__(self, classes):
        self._classes = classes
        self._cache = {}

    def get(self, name):
        if name not in self._cache:
            if name not in self._classes:
                raise KeyError(f"Unknown: {name}")
            self._cache[name] = self._classes[name]()
        return self._cache[name]

    def reset(self, name):
        self._cache.pop(name, None)`,
      hints: [
        'Store classes dict and a separate cache dict.',
        'On get(), check cache first, create and cache if missing.',
        'reset() removes the entry from cache with pop(name, None).',
      ],
      concepts: ['lazy initialization', 'caching', 'factory'],
    },
    {
      id: 'py-factory-19',
      title: 'Refactor if-elif to factory',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor a long if-elif chain into a factory pattern.',
      skeleton: `def create_handler(event_type, data):
    if event_type == "click":
        handler = ClickHandler()
        handler.x = data.get("x", 0)
        handler.y = data.get("y", 0)
        return handler
    elif event_type == "keypress":
        handler = KeypressHandler()
        handler.key = data.get("key", "")
        return handler
    elif event_type == "scroll":
        handler = ScrollHandler()
        handler.delta = data.get("delta", 0)
        return handler
    elif event_type == "resize":
        handler = ResizeHandler()
        handler.width = data.get("width", 0)
        handler.height = data.get("height", 0)
        return handler
    else:
        raise ValueError(f"Unknown event: {event_type}")

class ClickHandler:
    x = 0
    y = 0

class KeypressHandler:
    key = ""

class ScrollHandler:
    delta = 0

class ResizeHandler:
    width = 0
    height = 0`,
      solution: `class ClickHandler:
    def __init__(self, **kwargs):
        self.x = kwargs.get("x", 0)
        self.y = kwargs.get("y", 0)

class KeypressHandler:
    def __init__(self, **kwargs):
        self.key = kwargs.get("key", "")

class ScrollHandler:
    def __init__(self, **kwargs):
        self.delta = kwargs.get("delta", 0)

class ResizeHandler:
    def __init__(self, **kwargs):
        self.width = kwargs.get("width", 0)
        self.height = kwargs.get("height", 0)

_handlers = {
    "click": ClickHandler,
    "keypress": KeypressHandler,
    "scroll": ScrollHandler,
    "resize": ResizeHandler,
}

def create_handler(event_type, data):
    cls = _handlers.get(event_type)
    if cls is None:
        raise ValueError(f"Unknown event: {event_type}")
    return cls(**data)`,
      hints: [
        'Move initialization logic into each class __init__.',
        'Map event types to classes in a dictionary.',
        'The factory becomes a simple lookup and instantiation.',
      ],
      concepts: ['refactoring', 'factory pattern', 'dict dispatch'],
    },
    {
      id: 'py-factory-20',
      title: 'Refactor to plugin system',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor hardcoded factory to an extensible plugin system.',
      skeleton: `class ImageProcessor:
    def process(self, image, fmt):
        if fmt == "png":
            return self._to_png(image)
        elif fmt == "jpg":
            return self._to_jpg(image)
        elif fmt == "webp":
            return self._to_webp(image)
        else:
            raise ValueError(f"Unsupported: {fmt}")

    def _to_png(self, image):
        return f"PNG({image})"

    def _to_jpg(self, image):
        return f"JPG({image})"

    def _to_webp(self, image):
        return f"WEBP({image})"

# Adding new formats requires modifying ImageProcessor`,
      solution: `class FormatConverter:
    _converters = {}

    @classmethod
    def register(cls, fmt):
        def decorator(converter_cls):
            cls._converters[fmt] = converter_cls
            return converter_cls
        return decorator

    @classmethod
    def convert(cls, image, fmt):
        if fmt not in cls._converters:
            raise ValueError(f"Unsupported: {fmt}")
        return cls._converters[fmt]().process(image)

@FormatConverter.register("png")
class PNGConverter:
    def process(self, image):
        return f"PNG({image})"

@FormatConverter.register("jpg")
class JPGConverter:
    def process(self, image):
        return f"JPG({image})"

@FormatConverter.register("webp")
class WebPConverter:
    def process(self, image):
        return f"WEBP({image})"`,
      hints: [
        'Extract each format into its own class with a process method.',
        'Use a registry with @register decorator for extensibility.',
        'New formats can be added without modifying existing code.',
      ],
      concepts: ['refactoring', 'plugin system', 'open-closed principle'],
    },
  ],
};
