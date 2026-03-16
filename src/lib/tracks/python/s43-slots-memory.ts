import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-slots',
  title: '43. Slots & Memory',
  explanation: `## Slots & Memory Optimization

Python provides several mechanisms for controlling memory usage and object layout.

### __slots__
\`\`\`python
class Point:
    __slots__ = ('x', 'y')

    def __init__(self, x, y):
        self.x = x
        self.y = y
\`\`\`

Benefits:
- **Less memory** -- no per-instance \`__dict__\`
- **Faster attribute access** -- direct offset instead of dict lookup
- **Prevents typos** -- cannot add arbitrary attributes

Limitations:
- Cannot add attributes not listed in __slots__
- No __dict__ unless you include it in __slots__
- Must redeclare __slots__ in subclasses

### Garbage Collection
\`\`\`python
import gc

gc.collect()          # Force collection
gc.get_count()        # (gen0, gen1, gen2) counts
gc.disable()          # Disable automatic GC
gc.enable()           # Re-enable
\`\`\`

Python uses **reference counting** plus a **cyclic garbage collector** for objects in reference cycles.

### sys.getsizeof
\`\`\`python
import sys
sys.getsizeof([1, 2, 3])  # Size in bytes
\`\`\`

### weakref -- Weak References
\`\`\`python
import weakref

class MyObj:
    pass

obj = MyObj()
ref = weakref.ref(obj)
print(ref())  # Returns obj
del obj
print(ref())  # Returns None -- object was collected
\`\`\`

Weak references do not prevent garbage collection. Useful for caches and observer patterns.

### Memory Tips
- Use generators instead of lists for large sequences
- Use __slots__ for classes with many instances
- Use weakref for caches to avoid memory leaks
- Profile with \`tracemalloc\` module
`,
  exercises: [
    {
      id: 'py-slots-1',
      title: 'Basic __slots__',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Define __slots__ to restrict attributes on a class.',
      skeleton: `class Color:
    __BLANK__ = ('r', 'g', 'b')

    def __init__(self, r, g, b):
        self.r = r
        self.g = g
        self.b = b

c = Color(255, 0, 128)
print(c.r, c.g, c.b)`,
      solution: `class Color:
    __slots__ = ('r', 'g', 'b')

    def __init__(self, r, g, b):
        self.r = r
        self.g = g
        self.b = b

c = Color(255, 0, 128)
print(c.r, c.g, c.b)`,
      hints: [
        'A class attribute restricts which instance attributes are allowed.',
        'It replaces __dict__ with a fixed set of attribute slots.',
        'The answer is: __slots__',
      ],
      concepts: ['__slots__', 'memory optimization'],
    },
    {
      id: 'py-slots-2',
      title: '__slots__ prevents new attributes',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Understand that __slots__ prevents adding arbitrary attributes.',
      skeleton: `class Point:
    __slots__ = ('x', 'y')

    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(1, 2)
try:
    p.z = 3
except __BLANK__ as e:
    print(f"Cannot add attribute: {e}")`,
      solution: `class Point:
    __slots__ = ('x', 'y')

    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(1, 2)
try:
    p.z = 3
except AttributeError as e:
    print(f"Cannot add attribute: {e}")`,
      hints: [
        'Setting an attribute not in __slots__ raises an error.',
        'It is the same error type as accessing a nonexistent attribute.',
        'The answer is: AttributeError',
      ],
      concepts: ['__slots__', 'AttributeError'],
    },
    {
      id: 'py-slots-3',
      title: 'sys.getsizeof comparison',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use sys.getsizeof to measure object memory.',
      skeleton: `import __BLANK__

class Regular:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class Slotted:
    __slots__ = ('x', 'y')
    def __init__(self, x, y):
        self.x = x
        self.y = y

r = Regular(1, 2)
s = Slotted(1, 2)
print(__BLANK__.getsizeof(r) > __BLANK__.getsizeof(s))`,
      solution: `import sys

class Regular:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class Slotted:
    __slots__ = ('x', 'y')
    def __init__(self, x, y):
        self.x = x
        self.y = y

r = Regular(1, 2)
s = Slotted(1, 2)
print(sys.getsizeof(r) > sys.getsizeof(s))`,
      hints: [
        'A standard library module provides a function to measure object size.',
        'The module is named after the Python runtime system.',
        'The answer is: sys',
      ],
      concepts: ['sys.getsizeof', 'memory measurement'],
    },
    {
      id: 'py-slots-4',
      title: 'Write slotted class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a class using __slots__ for a 3D vector.',
      skeleton: `# Write a class 'Vector3D' that:
# 1. Uses __slots__ for 'x', 'y', 'z'
# 2. Has __init__ accepting x, y, z
# 3. Has a 'magnitude' method returning (x**2 + y**2 + z**2) ** 0.5

class Vector3D:
    pass`,
      solution: `class Vector3D:
    __slots__ = ('x', 'y', 'z')

    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

    def magnitude(self):
        return (self.x ** 2 + self.y ** 2 + self.z ** 2) ** 0.5`,
      hints: [
        'Define __slots__ as a tuple of attribute names.',
        'Methods are not listed in __slots__ -- only data attributes.',
        '__slots__ = ("x", "y", "z") then normal __init__ and magnitude.',
      ],
      concepts: ['__slots__', 'class design'],
    },
    {
      id: 'py-slots-5',
      title: 'Predict __slots__ behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Predict the output of __slots__ restrictions.',
      skeleton: `class Pair:
    __slots__ = ('first', 'second')

    def __init__(self, a, b):
        self.first = a
        self.second = b

p = Pair(10, 20)
print(p.first)
print(hasattr(p, '__dict__'))
print(p.second)`,
      solution: `10
False
20`,
      hints: [
        'p.first is 10, p.second is 20 -- set in __init__.',
        '__slots__ removes __dict__ from instances.',
        'hasattr(p, "__dict__") is False because __slots__ replaces it.',
      ],
      concepts: ['__slots__', '__dict__', 'hasattr'],
    },
    {
      id: 'py-slots-6',
      title: 'Fix __slots__ inheritance',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix __slots__ not working correctly in a subclass.',
      skeleton: `class Base:
    __slots__ = ('x',)

    def __init__(self, x):
        self.x = x

class Child(Base):
    # Bug: inherits x from Base but doesn't declare its own slots
    def __init__(self, x, y):
        super().__init__(x)
        self.y = y  # This creates a __dict__ because Child has no __slots__

c = Child(1, 2)
print(hasattr(c, '__dict__'))  # True -- memory optimization is lost`,
      solution: `class Base:
    __slots__ = ('x',)

    def __init__(self, x):
        self.x = x

class Child(Base):
    __slots__ = ('y',)

    def __init__(self, x, y):
        super().__init__(x)
        self.y = y

c = Child(1, 2)
print(hasattr(c, '__dict__'))  # False -- properly slotted`,
      hints: [
        'Subclasses must declare their own __slots__ to maintain the optimization.',
        'Only include NEW attributes in the subclass __slots__ (not inherited ones).',
        'Add __slots__ = ("y",) to Child.',
      ],
      concepts: ['__slots__', 'inheritance', 'memory'],
    },
    {
      id: 'py-slots-7',
      title: 'Weak references basics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Create a weak reference to an object.',
      skeleton: `import __BLANK__

class Cache:
    def __init__(self, data):
        self.data = data

obj = Cache("important")
ref = __BLANK__.ref(obj)
print(ref().data)
del obj
print(ref())`,
      solution: `import weakref

class Cache:
    def __init__(self, data):
        self.data = data

obj = Cache("important")
ref = weakref.ref(obj)
print(ref().data)
del obj
print(ref())`,
      hints: [
        'A standard library module provides references that do not prevent GC.',
        'These references return None when the object is collected.',
        'The answer is: weakref',
      ],
      concepts: ['weakref', 'garbage collection'],
    },
    {
      id: 'py-slots-8',
      title: 'Write weakref cache',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a simple cache using weak references.',
      skeleton: `import weakref

# Write a class 'WeakCache' that:
# 1. Uses a WeakValueDictionary as internal storage
# 2. Has put(key, value) to store a value
# 3. Has get(key) that returns the value or None if collected

class WeakCache:
    pass`,
      solution: `import weakref

class WeakCache:
    def __init__(self):
        self._cache = weakref.WeakValueDictionary()

    def put(self, key, value):
        self._cache[key] = value

    def get(self, key):
        return self._cache.get(key)`,
      hints: [
        'weakref.WeakValueDictionary holds weak refs to values.',
        'When a value has no strong references, it is automatically removed.',
        'Use WeakValueDictionary and implement put/get with dict operations.',
      ],
      concepts: ['WeakValueDictionary', 'cache', 'weakref'],
    },
    {
      id: 'py-slots-9',
      title: 'gc module basics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use the gc module to inspect garbage collection.',
      skeleton: `import __BLANK__

# Get current collection counts
counts = __BLANK__.get_count()
print(f"Gen0: {counts[0]}, Gen1: {counts[1]}, Gen2: {counts[2]}")

# Force a collection
collected = __BLANK__.collect()
print(f"Collected {collected} objects")`,
      solution: `import gc

# Get current collection counts
counts = gc.get_count()
print(f"Gen0: {counts[0]}, Gen1: {counts[1]}, Gen2: {counts[2]}")

# Force a collection
collected = gc.collect()
print(f"Collected {collected} objects")`,
      hints: [
        'Python has a module for interacting with the garbage collector.',
        'It is a two-letter abbreviation.',
        'The answer is: gc',
      ],
      concepts: ['gc', 'garbage collection', 'generational GC'],
    },
    {
      id: 'py-slots-10',
      title: 'Fix reference cycle',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix a reference cycle that prevents garbage collection.',
      skeleton: `class Node:
    def __init__(self, value):
        self.value = value
        self.parent = None
        self.children = []

    def add_child(self, child):
        self.children.append(child)
        child.parent = self  # Creates reference cycle!

# Bug: parent <-> child creates a cycle
# Even after deleting root, objects may linger

root = Node("root")
child = Node("child")
root.add_child(child)`,
      solution: `import weakref

class Node:
    def __init__(self, value):
        self.value = value
        self._parent = None
        self.children = []

    @property
    def parent(self):
        if self._parent is not None:
            return self._parent()
        return None

    def add_child(self, child):
        self.children.append(child)
        child._parent = weakref.ref(self)

root = Node("root")
child = Node("child")
root.add_child(child)`,
      hints: [
        'Reference cycles occur when objects reference each other.',
        'Use weakref for the back-reference (child to parent).',
        'Store parent as weakref.ref(self) instead of self directly.',
      ],
      concepts: ['reference cycle', 'weakref', 'garbage collection'],
    },
    {
      id: 'py-slots-11',
      title: 'Predict weakref behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict what happens when a weakly-referenced object is deleted.',
      skeleton: `import weakref

class Item:
    def __init__(self, name):
        self.name = name

item = Item("widget")
ref = weakref.ref(item)
print(ref() is item)
print(ref().name)
del item
print(ref() is None)`,
      solution: `True
widget
True`,
      hints: [
        'ref() returns the object as long as it exists.',
        'ref() is item returns True -- same object.',
        'After del item, ref() returns None -- object was collected.',
      ],
      concepts: ['weakref', 'garbage collection', 'None'],
    },
    {
      id: 'py-slots-12',
      title: 'Write memory-efficient container',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a memory-efficient record class using __slots__.',
      skeleton: `# Write a class 'Record' that:
# 1. Uses __slots__ for 'fields' and '_data'
# 2. __init__ takes **kwargs and stores field names and values
# 3. __getattr__ returns the value for a field name
# 4. __repr__ shows all field=value pairs

class Record:
    pass`,
      solution: `class Record:
    __slots__ = ('_fields', '_data')

    def __init__(self, **kwargs):
        object.__setattr__(self, '_fields', tuple(kwargs.keys()))
        object.__setattr__(self, '_data', kwargs)

    def __getattr__(self, name):
        try:
            return self._data[name]
        except KeyError:
            raise AttributeError(f"No field '{name}'")

    def __repr__(self):
        pairs = ", ".join(f"{k}={v!r}" for k, v in self._data.items())
        return f"Record({pairs})"`,
      hints: [
        'Use __slots__ for internal storage attributes only.',
        'Store kwargs in a dict accessible via __getattr__.',
        'Use object.__setattr__ in __init__ to avoid recursion with __slots__.',
      ],
      concepts: ['__slots__', '__getattr__', 'memory efficiency'],
    },
    {
      id: 'py-slots-13',
      title: 'tracemalloc for profiling',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that uses tracemalloc to measure memory allocation.',
      skeleton: `import tracemalloc

# Write a function 'measure_memory' that:
# 1. Starts tracemalloc
# 2. Calls a given function fn()
# 3. Takes a snapshot
# 4. Stops tracemalloc
# 5. Returns the peak memory usage in bytes

def measure_memory(fn):
    pass`,
      solution: `import tracemalloc

def measure_memory(fn):
    tracemalloc.start()
    fn()
    current, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    return peak`,
      hints: [
        'tracemalloc.start() begins tracing, tracemalloc.stop() ends it.',
        'get_traced_memory() returns (current, peak) tuple.',
        'Call fn() between start and stop, return peak from get_traced_memory.',
      ],
      concepts: ['tracemalloc', 'memory profiling'],
    },
    {
      id: 'py-slots-14',
      title: 'Predict __slots__ + __dict__',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Predict behavior when __dict__ is included in __slots__.',
      skeleton: `class Flexible:
    __slots__ = ('x', '__dict__')

    def __init__(self, x):
        self.x = x

f = Flexible(10)
f.y = 20  # No error -- __dict__ is in slots!
print(f.x)
print(f.y)
print('x' in f.__dict__)
print('y' in f.__dict__)`,
      solution: `10
20
False
True`,
      hints: [
        'Including __dict__ in __slots__ allows dynamic attributes alongside slots.',
        'Slotted attributes (x) are NOT in __dict__.',
        'Dynamic attributes (y) ARE in __dict__. x=10, y=20, x not in dict, y in dict.',
      ],
      concepts: ['__slots__', '__dict__', 'hybrid approach'],
    },
    {
      id: 'py-slots-15',
      title: 'Fix __slots__ with default',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the class that tries to set a default value with __slots__.',
      skeleton: `class Config:
    __slots__ = ('host', 'port', 'debug')
    debug = True  # Bug: cannot have class variable with same name as slot

    def __init__(self, host, port):
        self.host = host
        self.port = port`,
      solution: `class Config:
    __slots__ = ('host', 'port', '_debug')

    def __init__(self, host, port, debug=True):
        self.host = host
        self.port = port
        self._debug = debug

    @property
    def debug(self):
        return self._debug`,
      hints: [
        'A class variable cannot have the same name as a slot.',
        'Use a different slot name and set the default in __init__.',
        'Rename the slot to _debug, use debug=True as __init__ default.',
      ],
      concepts: ['__slots__', 'default values', 'class variables'],
    },
    {
      id: 'py-slots-16',
      title: 'WeakSet usage',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write an observer registry using WeakSet.',
      skeleton: `import weakref

# Write a class 'EventBus' that:
# 1. Uses weakref.WeakSet to store listeners
# 2. Has subscribe(listener) to add a listener
# 3. Has notify(event) that calls listener.on_event(event) for each listener
# 4. Automatically removes listeners when they are garbage collected

class EventBus:
    pass`,
      solution: `import weakref

class EventBus:
    def __init__(self):
        self._listeners = weakref.WeakSet()

    def subscribe(self, listener):
        self._listeners.add(listener)

    def notify(self, event):
        for listener in list(self._listeners):
            listener.on_event(event)`,
      hints: [
        'WeakSet holds weak references to its elements.',
        'When an element is garbage collected, it is removed from the set.',
        'Use list(self._listeners) to iterate safely during notification.',
      ],
      concepts: ['WeakSet', 'observer pattern', 'weakref'],
    },
    {
      id: 'py-slots-17',
      title: 'Generator vs list memory',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Predict the relative memory usage of generators vs lists.',
      skeleton: `import sys

list_comp = [i * 2 for i in range(1000)]
gen_expr = (i * 2 for i in range(1000))

list_size = sys.getsizeof(list_comp)
gen_size = sys.getsizeof(gen_expr)

print(list_size > gen_size)
print(gen_size < 200)`,
      solution: `True
True`,
      hints: [
        'Lists store all elements in memory. Generators compute lazily.',
        'A list of 1000 ints takes several KB. A generator object is ~100 bytes.',
        'list_size > gen_size is True. gen_size < 200 is True.',
      ],
      concepts: ['generator', 'list', 'memory comparison'],
    },
    {
      id: 'py-slots-18',
      title: 'Write __sizeof__ override',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a class that reports its memory usage accurately.',
      skeleton: `import sys

# Write a class 'Buffer' that:
# 1. Has __slots__ = ('_data',)
# 2. __init__ takes a list of bytes
# 3. Implements __sizeof__ returning base size + data size
# 4. Uses sys.getsizeof on self._data for data size

class Buffer:
    pass`,
      solution: `import sys

class Buffer:
    __slots__ = ('_data',)

    def __init__(self, data):
        self._data = list(data)

    def __sizeof__(self):
        return object.__sizeof__(self) + sys.getsizeof(self._data)`,
      hints: [
        '__sizeof__ should return the total memory footprint.',
        'Include the base object size plus the size of contained data.',
        'object.__sizeof__(self) gives base size, add sys.getsizeof(self._data).',
      ],
      concepts: ['__sizeof__', 'memory reporting', '__slots__'],
    },
    {
      id: 'py-slots-19',
      title: 'Refactor to use __slots__',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor a regular class to use __slots__ for memory efficiency.',
      skeleton: `class Pixel:
    def __init__(self, x, y, r, g, b, a=255):
        self.x = x
        self.y = y
        self.r = r
        self.g = g
        self.b = b
        self.a = a

    def __repr__(self):
        return f"Pixel({self.x}, {self.y}, rgba=({self.r},{self.g},{self.b},{self.a}))"

    def is_transparent(self):
        return self.a == 0

# When creating millions of Pixel objects, memory usage is excessive`,
      solution: `class Pixel:
    __slots__ = ('x', 'y', 'r', 'g', 'b', 'a')

    def __init__(self, x, y, r, g, b, a=255):
        self.x = x
        self.y = y
        self.r = r
        self.g = g
        self.b = b
        self.a = a

    def __repr__(self):
        return f"Pixel({self.x}, {self.y}, rgba=({self.r},{self.g},{self.b},{self.a}))"

    def is_transparent(self):
        return self.a == 0`,
      hints: [
        'Add __slots__ listing all data attributes.',
        'Methods do not need to be in __slots__.',
        'Add __slots__ = ("x", "y", "r", "g", "b", "a") to the class.',
      ],
      concepts: ['refactoring', '__slots__', 'memory optimization'],
    },
    {
      id: 'py-slots-20',
      title: 'Refactor cache to weakref',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor a strong-reference cache to use weak references.',
      skeleton: `class ObjectCache:
    """Cache that holds strong references -- can cause memory leaks"""
    def __init__(self):
        self._cache = {}

    def store(self, key, obj):
        self._cache[key] = obj

    def retrieve(self, key):
        return self._cache.get(key)

    def size(self):
        return len(self._cache)

# Problem: objects in cache are never freed even when
# nothing else references them`,
      solution: `import weakref

class ObjectCache:
    """Cache that holds weak references -- allows GC to collect unused objects"""
    def __init__(self):
        self._cache = weakref.WeakValueDictionary()

    def store(self, key, obj):
        self._cache[key] = obj

    def retrieve(self, key):
        return self._cache.get(key)

    def size(self):
        return len(self._cache)`,
      hints: [
        'Replace the regular dict with weakref.WeakValueDictionary.',
        'WeakValueDictionary automatically removes entries when values are GCed.',
        'The API stays the same -- just change the dict type.',
      ],
      concepts: ['refactoring', 'weakref', 'WeakValueDictionary', 'memory leak'],
    },
  ],
};
