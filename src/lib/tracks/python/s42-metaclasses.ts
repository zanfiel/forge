import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-metaclasses',
  title: '42. Metaclasses',
  explanation: `## Metaclasses

In Python, classes are objects too -- and metaclasses are the classes that create classes.

### type() as Metaclass
\`\`\`python
# These are equivalent:
class Foo:
    x = 5

Foo = type('Foo', (), {'x': 5})
\`\`\`

Every class is an instance of \`type\`. When you write \`class Foo:\`, Python calls \`type('Foo', bases, namespace)\`.

### Custom Metaclass
\`\`\`python
class Meta(type):
    def __new__(mcs, name, bases, namespace):
        # Called when the class is created
        cls = super().__new__(mcs, name, bases, namespace)
        return cls

class MyClass(metaclass=Meta):
    pass
\`\`\`

### __new__ vs __init__ in Metaclasses
- **\`__new__(mcs, name, bases, namespace)\`** -- creates and returns the class object
- **\`__init__(cls, name, bases, namespace)\`** -- initializes the already-created class

### __init_subclass__ (Simpler Alternative)
\`\`\`python
class Base:
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        print(f"New subclass: {cls.__name__}")

class Child(Base):  # prints "New subclass: Child"
    pass
\`\`\`

### __class_getitem__
Allows a class to be subscriptable: \`MyClass[int]\`

### Common Use Cases
- **Registration** -- auto-register all subclasses
- **Validation** -- enforce class structure at definition time
- **Singleton** -- ensure only one instance
- **ORM-style** -- transform class attributes into database columns

### When NOT to Use Metaclasses
Most problems can be solved with decorators, __init_subclass__, or descriptors. Use metaclasses only when you need to control class creation itself.
`,
  exercises: [
    {
      id: 'py-meta-1',
      title: 'Inspect type of a class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use type() to inspect what creates a class.',
      skeleton: `class Foo:
    pass

print(__BLANK__(Foo))
print(__BLANK__(Foo) is type)`,
      solution: `class Foo:
    pass

print(type(Foo))
print(type(Foo) is type)`,
      hints: [
        'There is a built-in function that returns the type of any object.',
        'Classes are instances of type.',
        'The answer is: type',
      ],
      concepts: ['type()', 'metaclass'],
    },
    {
      id: 'py-meta-2',
      title: 'Create class with type()',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a class dynamically using the type() constructor.',
      skeleton: `# Create a class 'Dog' with an attribute 'species' = "Canis familiaris"
Dog = __BLANK__("Dog", (), {"species": "Canis familiaris"})

print(Dog.species)
print(Dog.__name__)`,
      solution: `# Create a class 'Dog' with an attribute 'species' = "Canis familiaris"
Dog = type("Dog", (), {"species": "Canis familiaris"})

print(Dog.species)
print(Dog.__name__)`,
      hints: [
        'type() with 3 arguments creates a new class.',
        'Arguments: name (str), bases (tuple), namespace (dict).',
        'The answer is: type',
      ],
      concepts: ['type()', 'dynamic class creation'],
    },
    {
      id: 'py-meta-3',
      title: 'type() with bases',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a class with inheritance using type().',
      skeleton: `class Animal:
    def speak(self):
        return "..."

Dog = type("Dog", (__BLANK__,), {"sound": "Woof"})

d = Dog()
print(d.speak())
print(d.sound)`,
      solution: `class Animal:
    def speak(self):
        return "..."

Dog = type("Dog", (Animal,), {"sound": "Woof"})

d = Dog()
print(d.speak())
print(d.sound)`,
      hints: [
        'The second argument to type() is a tuple of base classes.',
        'Dog should inherit from Animal.',
        'The answer is: Animal',
      ],
      concepts: ['type()', 'inheritance', 'base classes'],
    },
    {
      id: 'py-meta-4',
      title: 'Write a class using type()',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a class dynamically that has a method.',
      skeleton: `# Create a class 'Counter' using type() that:
# 1. Has an __init__ method setting self.count = 0
# 2. Has an 'increment' method that adds 1 to self.count
# 3. Has a 'get_count' method that returns self.count

# Hint: define the functions first, then pass them in the dict

Counter = None  # Replace with type() call`,
      solution: `def __init__(self):
    self.count = 0

def increment(self):
    self.count += 1

def get_count(self):
    return self.count

Counter = type("Counter", (), {
    "__init__": __init__,
    "increment": increment,
    "get_count": get_count,
})`,
      hints: [
        'Define regular functions first (with self parameter).',
        'Pass them in the namespace dict with their intended method names.',
        'type("Counter", (), {"__init__": init_fn, "increment": inc_fn, ...})',
      ],
      concepts: ['type()', 'dynamic methods'],
    },
    {
      id: 'py-meta-5',
      title: 'Predict type() results',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Predict the output of type() introspection.',
      skeleton: `class Meta(type):
    pass

class Base(metaclass=Meta):
    pass

class Child(Base):
    pass

print(type(Base).__name__)
print(type(Child).__name__)
print(isinstance(Base, type))`,
      solution: `Meta
Meta
True`,
      hints: [
        'Base uses metaclass=Meta, so type(Base) is Meta.',
        'Child inherits from Base, so it also uses Meta as metaclass.',
        'Meta inherits from type, so isinstance(Base, type) is True.',
      ],
      concepts: ['metaclass', 'type()', 'inheritance'],
    },
    {
      id: 'py-meta-6',
      title: 'Fix metaclass syntax',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the incorrect metaclass declaration.',
      skeleton: `class UpperMeta(type):
    def __new__(mcs, name, bases, namespace):
        uppercase_attrs = {}
        for key, val in namespace.items():
            if not key.startswith('__'):
                uppercase_attrs[key.upper()] = val
            else:
                uppercase_attrs[key] = val
        return super().__new__(mcs, name, bases, uppercase_attrs)

# Bug: wrong syntax for specifying metaclass
class MyClass(UpperMeta):
    x = 10
    y = 20

print(hasattr(MyClass, 'X'))`,
      solution: `class UpperMeta(type):
    def __new__(mcs, name, bases, namespace):
        uppercase_attrs = {}
        for key, val in namespace.items():
            if not key.startswith('__'):
                uppercase_attrs[key.upper()] = val
            else:
                uppercase_attrs[key] = val
        return super().__new__(mcs, name, bases, uppercase_attrs)

class MyClass(metaclass=UpperMeta):
    x = 10
    y = 20

print(hasattr(MyClass, 'X'))`,
      hints: [
        'Inheriting from a metaclass makes MyClass a metaclass too.',
        'To USE a metaclass, pass it as metaclass= keyword argument.',
        'Change class MyClass(UpperMeta) to class MyClass(metaclass=UpperMeta).',
      ],
      concepts: ['metaclass', 'metaclass keyword'],
    },
    {
      id: 'py-meta-7',
      title: 'Custom metaclass __new__',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a metaclass __new__ that adds an attribute to every class.',
      skeleton: `class TagMeta(type):
    def __BLANK__(mcs, name, bases, namespace):
        namespace['_tag'] = name.lower()
        return super().__BLANK__(mcs, name, bases, namespace)

class User(metaclass=TagMeta):
    pass

class Admin(metaclass=TagMeta):
    pass

print(User._tag)
print(Admin._tag)`,
      solution: `class TagMeta(type):
    def __new__(mcs, name, bases, namespace):
        namespace['_tag'] = name.lower()
        return super().__new__(mcs, name, bases, namespace)

class User(metaclass=TagMeta):
    pass

class Admin(metaclass=TagMeta):
    pass

print(User._tag)
print(Admin._tag)`,
      hints: [
        'The metaclass method that creates the class object is a dunder method.',
        'It is called before __init__ and is responsible for creating the object.',
        'The answer is: __new__',
      ],
      concepts: ['metaclass', '__new__', 'class creation'],
    },
    {
      id: 'py-meta-8',
      title: 'Write validating metaclass',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a metaclass that validates class definitions.',
      skeleton: `# Write a metaclass 'ValidatedMeta' that:
# 1. Inherits from type
# 2. In __new__, checks if the class has a 'required_fields' attribute
# 3. If required_fields exists, verify all fields are defined in namespace
# 4. Raise TypeError if any required field is missing

class ValidatedMeta(type):
    pass`,
      solution: `class ValidatedMeta(type):
    def __new__(mcs, name, bases, namespace):
        required = namespace.get('required_fields', [])
        for field in required:
            if field not in namespace:
                raise TypeError(f"Class {name} missing required field: {field}")
        return super().__new__(mcs, name, bases, namespace)`,
      hints: [
        'Override __new__ and check namespace for required_fields.',
        'Loop over required_fields and verify each is in namespace.',
        'Raise TypeError with a descriptive message for missing fields.',
      ],
      concepts: ['metaclass', 'validation', '__new__'],
    },
    {
      id: 'py-meta-9',
      title: '__init_subclass__ hook',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use __init_subclass__ to register subclasses automatically.',
      skeleton: `class Plugin:
    _plugins = []

    def __BLANK__(cls, **kwargs):
        super().__BLANK__(**kwargs)
        Plugin._plugins.append(cls)

class AuthPlugin(Plugin):
    pass

class CachePlugin(Plugin):
    pass

print(len(Plugin._plugins))
print(Plugin._plugins[0].__name__)`,
      solution: `class Plugin:
    _plugins = []

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        Plugin._plugins.append(cls)

class AuthPlugin(Plugin):
    pass

class CachePlugin(Plugin):
    pass

print(len(Plugin._plugins))
print(Plugin._plugins[0].__name__)`,
      hints: [
        'Python 3.6+ added a hook that runs when a class is subclassed.',
        'It is a classmethod (implicitly) on the parent class.',
        'The answer is: __init_subclass__',
      ],
      concepts: ['__init_subclass__', 'registration'],
    },
    {
      id: 'py-meta-10',
      title: 'Write __init_subclass__ validator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a base class that validates subclasses using __init_subclass__.',
      skeleton: `# Write a class 'Serializable' that:
# 1. Uses __init_subclass__ to check that every subclass
#    defines a 'serialize' method
# 2. Raises TypeError if the method is missing

class Serializable:
    pass`,
      solution: `class Serializable:
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        if 'serialize' not in cls.__dict__:
            raise TypeError(f"{cls.__name__} must define a serialize method")`,
      hints: [
        'Override __init_subclass__ to inspect the subclass.',
        'Check cls.__dict__ for the required method name.',
        'Raise TypeError if "serialize" is not in cls.__dict__.',
      ],
      concepts: ['__init_subclass__', 'validation', 'class creation'],
    },
    {
      id: 'py-meta-11',
      title: 'Predict metaclass execution order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict when metaclass __new__ and __init__ are called.',
      skeleton: `class Meta(type):
    def __new__(mcs, name, bases, namespace):
        print(f"__new__: {name}")
        return super().__new__(mcs, name, bases, namespace)

    def __init__(cls, name, bases, namespace):
        print(f"__init__: {name}")
        super().__init__(name, bases, namespace)

class A(metaclass=Meta):
    pass

class B(A):
    pass`,
      solution: `__new__: A
__init__: A
__new__: B
__init__: B`,
      hints: [
        'When a class is created, the metaclass __new__ is called first, then __init__.',
        'Each class definition triggers both methods.',
        '__new__ then __init__ for A, then __new__ then __init__ for B.',
      ],
      concepts: ['metaclass', '__new__', '__init__', 'execution order'],
    },
    {
      id: 'py-meta-12',
      title: 'Fix metaclass __new__ return',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the metaclass that forgets to return the class.',
      skeleton: `class LogMeta(type):
    def __new__(mcs, name, bases, namespace):
        print(f"Creating class: {name}")
        super().__new__(mcs, name, bases, namespace)
        # Bug: forgot to return the class

class MyClass(metaclass=LogMeta):
    x = 10

print(MyClass)`,
      solution: `class LogMeta(type):
    def __new__(mcs, name, bases, namespace):
        print(f"Creating class: {name}")
        return super().__new__(mcs, name, bases, namespace)

class MyClass(metaclass=LogMeta):
    x = 10

print(MyClass)`,
      hints: [
        '__new__ must return the newly created class object.',
        'super().__new__() creates and returns the class, but the result is not returned.',
        'Add "return" before super().__new__(...).',
      ],
      concepts: ['metaclass', '__new__', 'return value'],
    },
    {
      id: 'py-meta-13',
      title: 'Singleton metaclass',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a metaclass that enforces the singleton pattern.',
      skeleton: `# Write a metaclass 'SingletonMeta' that:
# 1. Stores instances in a dict (_instances)
# 2. Overrides __call__ to check if an instance exists
# 3. Returns existing instance or creates a new one

class SingletonMeta(type):
    pass`,
      solution: `class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]`,
      hints: [
        'Override __call__ on the metaclass -- this is called when you do MyClass().',
        'Check if cls is already in _instances dict.',
        'If not, create with super().__call__() and store it. Always return the stored instance.',
      ],
      concepts: ['singleton', 'metaclass', '__call__'],
    },
    {
      id: 'py-meta-14',
      title: 'Registry metaclass',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a metaclass that auto-registers all classes.',
      skeleton: `# Write a metaclass 'RegistryMeta' that:
# 1. Has a class-level dict 'registry'
# 2. In __new__, registers each class by name (excluding the base)
# 3. Has a classmethod 'get_class' that looks up by name

class RegistryMeta(type):
    pass`,
      solution: `class RegistryMeta(type):
    registry = {}

    def __new__(mcs, name, bases, namespace):
        cls = super().__new__(mcs, name, bases, namespace)
        if bases:  # Skip the base class itself
            mcs.registry[name] = cls
        return cls

    def get_class(cls, name):
        return cls.registry.get(name)`,
      hints: [
        'Override __new__ and add the class to registry dict by name.',
        'Skip registration when bases is empty (the root class).',
        'get_class looks up the name in the registry dict.',
      ],
      concepts: ['registry pattern', 'metaclass', '__new__'],
    },
    {
      id: 'py-meta-15',
      title: '__class_getitem__',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Make a class subscriptable using __class_getitem__.',
      skeleton: `class TypedBox:
    def __init__(self, value):
        self.value = value

    def __BLANK__(cls, item):
        return cls

box = TypedBox[int](42)
print(box.value)`,
      solution: `class TypedBox:
    def __init__(self, value):
        self.value = value

    def __class_getitem__(cls, item):
        return cls

box = TypedBox[int](42)
print(box.value)`,
      hints: [
        'A special dunder method allows using square brackets on a class.',
        'It enables syntax like MyClass[Type].',
        'The answer is: __class_getitem__',
      ],
      concepts: ['__class_getitem__', 'subscriptable class'],
    },
    {
      id: 'py-meta-16',
      title: 'Fix metaclass conflict',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the metaclass conflict when combining two classes with different metaclasses.',
      skeleton: `class MetaA(type):
    pass

class MetaB(type):
    pass

class A(metaclass=MetaA):
    pass

class B(metaclass=MetaB):
    pass

# Bug: TypeError -- metaclass conflict
class C(A, B):
    pass`,
      solution: `class MetaA(type):
    pass

class MetaB(type):
    pass

class MetaC(MetaA, MetaB):
    pass

class A(metaclass=MetaA):
    pass

class B(metaclass=MetaB):
    pass

class C(A, B, metaclass=MetaC):
    pass`,
      hints: [
        'Python requires the metaclass of a derived class to be a subclass of all base metaclasses.',
        'Create a new metaclass that inherits from both MetaA and MetaB.',
        'class MetaC(MetaA, MetaB): pass -- then use metaclass=MetaC for C.',
      ],
      concepts: ['metaclass conflict', 'multiple inheritance'],
    },
    {
      id: 'py-meta-17',
      title: 'Predict __init_subclass__ behavior',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Predict when __init_subclass__ is called and with what arguments.',
      skeleton: `class Base:
    def __init_subclass__(cls, label=None, **kwargs):
        super().__init_subclass__(**kwargs)
        cls._label = label
        print(f"Registered: {cls.__name__} as {label}")

class First(Base, label="primary"):
    pass

class Second(Base, label="secondary"):
    pass

print(First._label)
print(Second._label)`,
      solution: `Registered: First as primary
Registered: Second as secondary
primary
secondary`,
      hints: [
        '__init_subclass__ runs at class definition time, not at instantiation.',
        'Each subclass triggers it with the keyword argument passed after Base.',
        'First prints "Registered: First as primary", etc. Labels are stored on each class.',
      ],
      concepts: ['__init_subclass__', 'keyword arguments', 'class creation'],
    },
    {
      id: 'py-meta-18',
      title: 'Write interface-enforcing metaclass',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a metaclass that enforces method presence at class creation time.',
      skeleton: `# Write a metaclass 'InterfaceMeta' that:
# 1. Looks for a 'required_methods' attribute in namespace
# 2. Checks all bases' required_methods too (union of all)
# 3. Raises TypeError if any required method is missing from the class

class InterfaceMeta(type):
    pass`,
      solution: `class InterfaceMeta(type):
    def __new__(mcs, name, bases, namespace):
        cls = super().__new__(mcs, name, bases, namespace)
        required = set()
        for base in bases:
            required |= set(getattr(base, 'required_methods', []))
        required |= set(namespace.get('required_methods', []))
        for method in required:
            if not callable(getattr(cls, method, None)):
                raise TypeError(f"{name} must implement {method}")
        return cls`,
      hints: [
        'Collect required_methods from bases and the current class.',
        'Check if each required method exists and is callable.',
        'Use getattr(cls, method, None) to check inherited + defined methods.',
      ],
      concepts: ['metaclass', 'interface enforcement', 'validation'],
    },
    {
      id: 'py-meta-19',
      title: 'Refactor metaclass to __init_subclass__',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor a metaclass-based pattern to use __init_subclass__ instead.',
      skeleton: `class RegistryMeta(type):
    registry = {}

    def __new__(mcs, name, bases, namespace):
        cls = super().__new__(mcs, name, bases, namespace)
        if bases:
            RegistryMeta.registry[name] = cls
        return cls

class Handler(metaclass=RegistryMeta):
    pass

class LoginHandler(Handler):
    pass

class LogoutHandler(Handler):
    pass

print(list(RegistryMeta.registry.keys()))`,
      solution: `class Handler:
    registry = {}

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        Handler.registry[cls.__name__] = cls

class LoginHandler(Handler):
    pass

class LogoutHandler(Handler):
    pass

print(list(Handler.registry.keys()))`,
      hints: [
        '__init_subclass__ can replace simple metaclass patterns.',
        'Move the registry to the base class and register in __init_subclass__.',
        'No metaclass needed -- Handler uses __init_subclass__ to register subclasses.',
      ],
      concepts: ['refactoring', '__init_subclass__', 'metaclass'],
    },
    {
      id: 'py-meta-20',
      title: 'Refactor repetitive setup to metaclass',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor repetitive class boilerplate into a metaclass.',
      skeleton: `class UserModel:
    table_name = "user_model"
    def __repr__(self):
        return f"<UserModel>"

class ProductModel:
    table_name = "product_model"
    def __repr__(self):
        return f"<ProductModel>"

class OrderModel:
    table_name = "order_model"
    def __repr__(self):
        return f"<OrderModel>"

# Each model manually defines table_name and __repr__`,
      solution: `class ModelMeta(type):
    def __new__(mcs, name, bases, namespace):
        if bases:  # Skip the base Model class
            namespace.setdefault('table_name', name.lower())
        cls = super().__new__(mcs, name, bases, namespace)
        return cls

class Model(metaclass=ModelMeta):
    def __repr__(self):
        return f"<{self.__class__.__name__}>"

class UserModel(Model):
    pass

class ProductModel(Model):
    pass

class OrderModel(Model):
    pass`,
      hints: [
        'The metaclass can auto-generate table_name from the class name.',
        '__repr__ can use self.__class__.__name__ in a base class.',
        'ModelMeta sets table_name = name.lower() in __new__; Model provides __repr__.',
      ],
      concepts: ['refactoring', 'metaclass', 'DRY', 'code generation'],
    },
  ],
};
