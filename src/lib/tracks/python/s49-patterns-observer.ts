import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-observer',
  title: '49. Observer Pattern',
  explanation: `## Observer Pattern

The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

### Basic Observer
\`\`\`python
class EventEmitter:
    def __init__(self):
        self._listeners = {}

    def on(self, event, callback):
        self._listeners.setdefault(event, []).append(callback)

    def emit(self, event, *args, **kwargs):
        for callback in self._listeners.get(event, []):
            callback(*args, **kwargs)
\`\`\`

### Class-Based Observer
\`\`\`python
from abc import ABC, abstractmethod

class Observer(ABC):
    @abstractmethod
    def update(self, event, data):
        pass

class Subject:
    def __init__(self):
        self._observers = []

    def attach(self, observer: Observer):
        self._observers.append(observer)

    def detach(self, observer: Observer):
        self._observers.remove(observer)

    def notify(self, event, data=None):
        for observer in self._observers:
            observer.update(event, data)
\`\`\`

### Using Weak References
Prevent memory leaks by holding weak references to observers:
\`\`\`python
import weakref

class WeakEventEmitter:
    def __init__(self):
        self._listeners = {}

    def on(self, event, callback):
        ref = weakref.ref(callback.__self__) if hasattr(callback, '__self__') else None
        self._listeners.setdefault(event, []).append((ref, callback.__func__ if ref else callback))

    def emit(self, event, *args):
        alive = []
        for ref, func in self._listeners.get(event, []):
            if ref is None:
                func(*args)
                alive.append((ref, func))
            elif ref() is not None:
                func(ref(), *args)
                alive.append((ref, func))
        self._listeners[event] = alive
\`\`\`

### Property Observer
\`\`\`python
class Observable:
    def __init__(self):
        self._watchers = {}

    def watch(self, attr, callback):
        self._watchers.setdefault(attr, []).append(callback)

    def __setattr__(self, name, value):
        if name != '_watchers' and hasattr(self, '_watchers'):
            old = getattr(self, name, None)
            super().__setattr__(name, value)
            for cb in self._watchers.get(name, []):
                cb(name, old, value)
        else:
            super().__setattr__(name, value)
\`\`\`

### When to Use
- One object's state change must trigger updates in other objects
- You want loose coupling between publisher and subscribers
- You need event-driven or reactive programming patterns
- You want to build plugin or hook systems
`,
  exercises: [
    {
      id: 'py-observer-1',
      title: 'Basic event emitter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a basic event emitter with on and emit methods.',
      skeleton: `class EventEmitter:
    def __init__(self):
        self._listeners = __BLANK__

    def on(self, event, callback):
        self._listeners.__BLANK__(event, []).append(callback)

    def emit(self, event, *args):
        for cb in self._listeners.__BLANK__(event, []):
            cb(*args)`,
      solution: `class EventEmitter:
    def __init__(self):
        self._listeners = {}

    def on(self, event, callback):
        self._listeners.setdefault(event, []).append(callback)

    def emit(self, event, *args):
        for cb in self._listeners.get(event, []):
            cb(*args)`,
      hints: [
        '_listeners is an empty dict to map event names to callback lists.',
        'setdefault creates the key with a default if missing, then appends.',
        'get returns the list of callbacks or an empty list if no listeners.',
      ],
      concepts: ['event emitter', 'dict.setdefault', 'dict.get'],
    },
    {
      id: 'py-observer-2',
      title: 'Subscribe and notify',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Subscribe observers and notify them on state change.',
      skeleton: `class Subject:
    def __init__(self):
        self.__BLANK__ = []

    def subscribe(self, observer):
        self._observers.__BLANK__(observer)

    def notify(self, message):
        for obs in self.__BLANK__:
            obs(message)

log = []
subject = Subject()
subject.subscribe(lambda msg: log.append(msg))
subject.notify("hello")
print(log)  # ['hello']`,
      solution: `class Subject:
    def __init__(self):
        self._observers = []

    def subscribe(self, observer):
        self._observers.append(observer)

    def notify(self, message):
        for obs in self._observers:
            obs(message)

log = []
subject = Subject()
subject.subscribe(lambda msg: log.append(msg))
subject.notify("hello")
print(log)  # ['hello']`,
      hints: [
        'Store observers in a list called _observers.',
        'subscribe adds an observer with append.',
        'notify iterates _observers and calls each one.',
      ],
      concepts: ['subject', 'subscribe', 'notify'],
    },
    {
      id: 'py-observer-3',
      title: 'Unsubscribe an observer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Implement unsubscribe to remove an observer.',
      skeleton: `class EventBus:
    def __init__(self):
        self._handlers = {}

    def subscribe(self, event, handler):
        self._handlers.setdefault(event, []).append(handler)

    def unsubscribe(self, event, handler):
        if event in self._handlers:
            self._handlers[event].__BLANK__(handler)

    def publish(self, event, data=None):
        for h in self._handlers.__BLANK__(event, []):
            h(__BLANK__)`,
      solution: `class EventBus:
    def __init__(self):
        self._handlers = {}

    def subscribe(self, event, handler):
        self._handlers.setdefault(event, []).append(handler)

    def unsubscribe(self, event, handler):
        if event in self._handlers:
            self._handlers[event].remove(handler)

    def publish(self, event, data=None):
        for h in self._handlers.get(event, []):
            h(data)`,
      hints: [
        'Use list.remove(handler) to unsubscribe.',
        'Use dict.get(event, []) to safely get the handler list.',
        'publish passes data to each handler.',
      ],
      concepts: ['unsubscribe', 'list.remove', 'event bus'],
    },
    {
      id: 'py-observer-4',
      title: 'Observer ABC',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Define an observer interface using ABC.',
      skeleton: `from abc import ABC, __BLANK__

class Observer(ABC):
    @__BLANK__
    def update(self, event, data):
        pass

class Logger(Observer):
    def __BLANK__(self, event, data):
        print(f"[LOG] {event}: {data}")`,
      solution: `from abc import ABC, abstractmethod

class Observer(ABC):
    @abstractmethod
    def update(self, event, data):
        pass

class Logger(Observer):
    def update(self, event, data):
        print(f"[LOG] {event}: {data}")`,
      hints: [
        'Import abstractmethod from abc.',
        'Decorate the update method with @abstractmethod.',
        'Logger must implement the update method to satisfy the ABC.',
      ],
      concepts: ['ABC', 'abstractmethod', 'observer interface'],
    },
    {
      id: 'py-observer-5',
      title: 'Predict observer notifications',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Predict the order of observer notifications.',
      skeleton: `class Emitter:
    def __init__(self):
        self._cbs = []

    def on(self, cb):
        self._cbs.append(cb)

    def fire(self, value):
        for cb in self._cbs:
            cb(value)

e = Emitter()
results = []
e.on(lambda v: results.append(v * 2))
e.on(lambda v: results.append(v + 10))
e.on(lambda v: results.append(v))
e.fire(5)
print(results)`,
      solution: `[10, 15, 5]`,
      hints: [
        'Observers fire in the order they were registered.',
        'First: 5 * 2 = 10, Second: 5 + 10 = 15, Third: 5.',
        'results gets [10, 15, 5].',
      ],
      concepts: ['notification order', 'observer', 'predict output'],
    },
    {
      id: 'py-observer-6',
      title: 'Write event emitter with off',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a complete event emitter with on, off, and emit.',
      skeleton: `# Write a class 'EventEmitter' that:
# 1. on(event, callback) registers a callback for an event
# 2. off(event, callback) removes a specific callback
# 3. emit(event, *args) calls all callbacks for that event with *args
# 4. If no callbacks exist for an event, emit does nothing

class EventEmitter:
    pass`,
      solution: `class EventEmitter:
    def __init__(self):
        self._listeners = {}

    def on(self, event, callback):
        self._listeners.setdefault(event, []).append(callback)

    def off(self, event, callback):
        if event in self._listeners:
            self._listeners[event].remove(callback)

    def emit(self, event, *args):
        for cb in self._listeners.get(event, []):
            cb(*args)`,
      hints: [
        'Use a dict mapping event names to lists of callbacks.',
        'setdefault creates the list if the key does not exist.',
        'off uses remove; emit uses get with default empty list.',
      ],
      concepts: ['event emitter', 'on/off/emit', 'pub/sub'],
    },
    {
      id: 'py-observer-7',
      title: 'Once listener',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Implement a once method that fires a callback only once.',
      skeleton: `# Extend EventEmitter with a 'once' method:
# 1. once(event, callback) registers a callback that fires only once
# 2. After first emit, the callback is automatically removed
# Hint: wrap the callback so it removes itself after firing

class EventEmitter:
    def __init__(self):
        self._listeners = {}

    def on(self, event, callback):
        self._listeners.setdefault(event, []).append(callback)

    def off(self, event, callback):
        if event in self._listeners:
            self._listeners[event].remove(callback)

    def emit(self, event, *args):
        for cb in list(self._listeners.get(event, [])):
            cb(*args)

    def once(self, event, callback):
        pass`,
      solution: `class EventEmitter:
    def __init__(self):
        self._listeners = {}

    def on(self, event, callback):
        self._listeners.setdefault(event, []).append(callback)

    def off(self, event, callback):
        if event in self._listeners:
            self._listeners[event].remove(callback)

    def emit(self, event, *args):
        for cb in list(self._listeners.get(event, [])):
            cb(*args)

    def once(self, event, callback):
        def wrapper(*args):
            self.off(event, wrapper)
            callback(*args)
        self.on(event, wrapper)`,
      hints: [
        'Create a wrapper function that calls off then the original callback.',
        'Register the wrapper with on(), not the original callback.',
        'The wrapper removes itself by calling self.off(event, wrapper).',
      ],
      concepts: ['once listener', 'wrapper function', 'auto-unsubscribe'],
    },
    {
      id: 'py-observer-8',
      title: 'Property change observer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a class that notifies observers when a property changes.',
      skeleton: `# Write a class 'ObservableProperty' that:
# 1. __init__(value) sets initial value
# 2. get() returns current value
# 3. set(new_value) updates value and notifies if changed
# 4. on_change(callback) registers a callback(old, new)
# 5. Callbacks only fire if new_value != old_value

class ObservableProperty:
    pass`,
      solution: `class ObservableProperty:
    def __init__(self, value):
        self._value = value
        self._callbacks = []

    def get(self):
        return self._value

    def set(self, new_value):
        old = self._value
        if old != new_value:
            self._value = new_value
            for cb in self._callbacks:
                cb(old, new_value)

    def on_change(self, callback):
        self._callbacks.append(callback)`,
      hints: [
        'Store value and a list of callbacks.',
        'In set, compare old and new before notifying.',
        'Call each callback with (old_value, new_value).',
      ],
      concepts: ['observable property', 'change detection', 'observer'],
    },
    {
      id: 'py-observer-9',
      title: 'Fix observer memory leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix an observer pattern that never cleans up deleted observers.',
      skeleton: `class Publisher:
    def __init__(self):
        self._subscribers = []

    def subscribe(self, sub):
        self._subscribers.append(sub)

    def publish(self, data):
        for sub in self._subscribers:
            sub.notify(data)

class Subscriber:
    def __init__(self, name):
        self.name = name

    def notify(self, data):
        print(f"{self.name}: {data}")

pub = Publisher()
s1 = Subscriber("A")
s2 = Subscriber("B")
pub.subscribe(s1)
pub.subscribe(s2)

# Bug: after del s1, publisher still holds reference
# and s1 is never garbage collected
del s1
pub.publish("test")  # Still tries to notify deleted subscriber`,
      solution: `import weakref

class Publisher:
    def __init__(self):
        self._subscribers = []

    def subscribe(self, sub):
        self._subscribers.append(weakref.ref(sub))

    def publish(self, data):
        alive = []
        for ref in self._subscribers:
            sub = ref()
            if sub is not None:
                sub.notify(data)
                alive.append(ref)
        self._subscribers = alive

class Subscriber:
    def __init__(self, name):
        self.name = name

    def notify(self, data):
        print(f"{self.name}: {data}")

pub = Publisher()
s1 = Subscriber("A")
s2 = Subscriber("B")
pub.subscribe(s1)
pub.subscribe(s2)

del s1
pub.publish("test")  # Only notifies B`,
      hints: [
        'Use weakref.ref to hold weak references to subscribers.',
        'Before calling notify, check if the weak reference is still alive.',
        'Clean up dead references during publish.',
      ],
      concepts: ['weakref', 'memory leak', 'garbage collection'],
    },
    {
      id: 'py-observer-10',
      title: 'Fix emit during iteration',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the bug where removing a listener during emit causes errors.',
      skeleton: `class Emitter:
    def __init__(self):
        self._listeners = {}

    def on(self, event, cb):
        self._listeners.setdefault(event, []).append(cb)

    def off(self, event, cb):
        self._listeners[event].remove(cb)

    def emit(self, event, *args):
        # Bug: if a callback calls off(), list changes during iteration
        for cb in self._listeners.get(event, []):
            cb(*args)

e = Emitter()

def handler(val):
    print(val)
    e.off("data", handler)  # Removes self during iteration -- crash!

e.on("data", handler)
e.on("data", lambda v: print(f"also: {v}"))
e.emit("data", 42)`,
      solution: `class Emitter:
    def __init__(self):
        self._listeners = {}

    def on(self, event, cb):
        self._listeners.setdefault(event, []).append(cb)

    def off(self, event, cb):
        self._listeners[event].remove(cb)

    def emit(self, event, *args):
        # Fix: iterate over a copy of the list
        for cb in list(self._listeners.get(event, [])):
            cb(*args)

e = Emitter()

def handler(val):
    print(val)
    e.off("data", handler)

e.on("data", handler)
e.on("data", lambda v: print(f"also: {v}"))
e.emit("data", 42)`,
      hints: [
        'The issue is modifying a list while iterating over it.',
        'Use list() to create a copy of the listeners before iterating.',
        'Change: for cb in list(self._listeners.get(event, [])):',
      ],
      concepts: ['iteration mutation', 'list copy', 'defensive programming'],
    },
    {
      id: 'py-observer-11',
      title: 'Typed event system',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write an event system where events are typed dataclass instances.',
      skeleton: `# Write a class 'TypedEventBus' that:
# 1. subscribe(event_type, handler) registers handler for an event class
# 2. publish(event) calls all handlers registered for type(event)
# 3. Handlers receive the event instance
# Events are dataclass instances identified by their class

from dataclasses import dataclass

@dataclass
class UserCreated:
    username: str

@dataclass
class UserDeleted:
    username: str

class TypedEventBus:
    pass`,
      solution: `from dataclasses import dataclass

@dataclass
class UserCreated:
    username: str

@dataclass
class UserDeleted:
    username: str

class TypedEventBus:
    def __init__(self):
        self._handlers = {}

    def subscribe(self, event_type, handler):
        self._handlers.setdefault(event_type, []).append(handler)

    def publish(self, event):
        event_type = type(event)
        for handler in self._handlers.get(event_type, []):
            handler(event)`,
      hints: [
        'Use the event class itself as the dict key.',
        'In publish, use type(event) to look up handlers.',
        'setdefault ensures each event type has a handler list.',
      ],
      concepts: ['typed events', 'dataclass', 'type-based dispatch'],
    },
    {
      id: 'py-observer-12',
      title: 'Predict pub/sub order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict the output of a publisher/subscriber system.',
      skeleton: `class PubSub:
    def __init__(self):
        self._subs = {}

    def sub(self, topic, fn):
        self._subs.setdefault(topic, []).append(fn)

    def pub(self, topic, msg):
        for fn in self._subs.get(topic, []):
            fn(msg)

ps = PubSub()
out = []
ps.sub("a", lambda m: out.append(f"1:{m}"))
ps.sub("b", lambda m: out.append(f"2:{m}"))
ps.sub("a", lambda m: out.append(f"3:{m}"))
ps.pub("a", "x")
ps.pub("b", "y")
ps.pub("c", "z")
print(out)`,
      solution: `['1:x', '3:x', '2:y']`,
      hints: [
        'Topic "a" has two subscribers (1 and 3), "b" has one (2).',
        'pub("a", "x") fires subs 1 and 3 -> "1:x", "3:x".',
        'pub("c", "z") has no subscribers, nothing happens.',
      ],
      concepts: ['pub/sub', 'topic routing', 'predict output'],
    },
    {
      id: 'py-observer-13',
      title: 'Event with filtering',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write an event emitter that supports filtered subscriptions.',
      skeleton: `# Write a class 'FilteredEmitter' that:
# 1. on(event, callback, predicate=None) registers with optional filter
# 2. emit(event, data) only calls callbacks whose predicate returns True
# 3. If predicate is None, always call the callback
# Example: emitter.on("sale", handler, predicate=lambda d: d["amount"] > 100)

class FilteredEmitter:
    pass`,
      solution: `class FilteredEmitter:
    def __init__(self):
        self._listeners = {}

    def on(self, event, callback, predicate=None):
        self._listeners.setdefault(event, []).append((callback, predicate))

    def emit(self, event, data):
        for callback, predicate in self._listeners.get(event, []):
            if predicate is None or predicate(data):
                callback(data)`,
      hints: [
        'Store tuples of (callback, predicate) in the listener list.',
        'On emit, check if predicate is None or returns True.',
        'Only call the callback if the predicate passes.',
      ],
      concepts: ['filtered events', 'predicate', 'conditional dispatch'],
    },
    {
      id: 'py-observer-14',
      title: 'Middleware chain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write an event system with middleware that can modify or block events.',
      skeleton: `# Write a class 'MiddlewareEmitter' that:
# 1. use(middleware) adds a middleware function
# 2. Middleware signature: middleware(event, data, next_fn)
#    - Call next_fn(event, data) to continue the chain
#    - Can modify data or skip calling next_fn to block the event
# 3. emit(event, data) runs the middleware chain, then notifies listeners
# 4. on(event, callback) registers a listener

class MiddlewareEmitter:
    pass`,
      solution: `class MiddlewareEmitter:
    def __init__(self):
        self._middleware = []
        self._listeners = {}

    def use(self, middleware):
        self._middleware.append(middleware)

    def on(self, event, callback):
        self._listeners.setdefault(event, []).append(callback)

    def emit(self, event, data):
        def dispatch(index, evt, d):
            if index < len(self._middleware):
                self._middleware[index](evt, d, lambda e, dd: dispatch(index + 1, e, dd))
            else:
                for cb in self._listeners.get(evt, []):
                    cb(d)
        dispatch(0, event, data)`,
      hints: [
        'Build a recursive dispatch function that steps through middleware.',
        'Each middleware receives a next_fn that calls the next middleware.',
        'When all middleware is done, notify the actual listeners.',
      ],
      concepts: ['middleware', 'chain of responsibility', 'recursive dispatch'],
    },
    {
      id: 'py-observer-15',
      title: 'Predict once behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict output of a once listener that auto-removes.',
      skeleton: `class Emitter:
    def __init__(self):
        self._cbs = {}

    def on(self, evt, cb):
        self._cbs.setdefault(evt, []).append(cb)

    def once(self, evt, cb):
        def wrapper(*args):
            self._cbs[evt].remove(wrapper)
            cb(*args)
        self.on(evt, wrapper)

    def emit(self, evt, *args):
        for cb in list(self._cbs.get(evt, [])):
            cb(*args)

e = Emitter()
out = []
e.on("x", lambda v: out.append(f"A:{v}"))
e.once("x", lambda v: out.append(f"B:{v}"))
e.on("x", lambda v: out.append(f"C:{v}"))
e.emit("x", 1)
e.emit("x", 2)
print(out)`,
      solution: `['A:1', 'B:1', 'C:1', 'A:2', 'C:2']`,
      hints: [
        'First emit: all three fire -- A:1, B:1, C:1.',
        'The once listener B removes itself after first emit.',
        'Second emit: only A and C fire -- A:2, C:2.',
      ],
      concepts: ['once', 'auto-remove', 'predict output'],
    },
    {
      id: 'py-observer-16',
      title: 'Observable model',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a model base class that emits change events for any attribute.',
      skeleton: `# Write a class 'ObservableModel' that:
# 1. on_change(attr, callback) watches a specific attribute
# 2. Overrides __setattr__ to detect changes
# 3. Callbacks receive (attr_name, old_value, new_value)
# 4. Only fires if the value actually changed
# 5. Works for any attribute name

class ObservableModel:
    pass`,
      solution: `class ObservableModel:
    def __init__(self):
        super().__setattr__('_watchers', {})

    def on_change(self, attr, callback):
        self._watchers.setdefault(attr, []).append(callback)

    def __setattr__(self, name, value):
        if name == '_watchers':
            super().__setattr__(name, value)
            return
        old = getattr(self, name, None)
        super().__setattr__(name, value)
        if old != value:
            for cb in self._watchers.get(name, []):
                cb(name, old, value)`,
      hints: [
        'Use super().__setattr__ to avoid infinite recursion.',
        'Initialize _watchers via super().__setattr__ in __init__.',
        'Compare old and new values before notifying watchers.',
      ],
      concepts: ['__setattr__', 'observable model', 'change tracking'],
    },
    {
      id: 'py-observer-17',
      title: 'Write async event emitter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write an async event emitter that supports coroutine callbacks.',
      skeleton: `# Write a class 'AsyncEmitter' that:
# 1. on(event, callback) registers an async callback
# 2. async emit(event, *args) awaits each callback
# 3. async emit_concurrent(event, *args) runs all callbacks concurrently
# Use asyncio.gather for concurrent emit

import asyncio

class AsyncEmitter:
    pass`,
      solution: `import asyncio

class AsyncEmitter:
    def __init__(self):
        self._listeners = {}

    def on(self, event, callback):
        self._listeners.setdefault(event, []).append(callback)

    async def emit(self, event, *args):
        for cb in self._listeners.get(event, []):
            await cb(*args)

    async def emit_concurrent(self, event, *args):
        cbs = self._listeners.get(event, [])
        if cbs:
            await asyncio.gather(*(cb(*args) for cb in cbs))`,
      hints: [
        'emit awaits each callback sequentially in a loop.',
        'emit_concurrent uses asyncio.gather to run all at once.',
        'Both methods are async -- use async def.',
      ],
      concepts: ['async/await', 'asyncio.gather', 'async observer'],
    },
    {
      id: 'py-observer-18',
      title: 'Write decorator-based hooks',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a hook system where methods can be decorated to subscribe to events.',
      skeleton: `# Write a class 'HookSystem' that:
# 1. Has a class method 'hook(event_name)' decorator
#    that marks a method as a hook handler
# 2. register(instance) scans the instance for hooked methods
#    and subscribes them
# 3. emit(event, *args) fires all registered hooks
# Store hook metadata on the function itself

class HookSystem:
    pass`,
      solution: `class HookSystem:
    def __init__(self):
        self._handlers = {}

    @staticmethod
    def hook(event_name):
        def decorator(func):
            func._hook_event = event_name
            return func
        return decorator

    def register(self, instance):
        for name in dir(instance):
            method = getattr(instance, name, None)
            if callable(method) and hasattr(method, '_hook_event'):
                event = method._hook_event
                self._handlers.setdefault(event, []).append(method)

    def emit(self, event, *args):
        for handler in self._handlers.get(event, []):
            handler(*args)`,
      hints: [
        'The hook decorator stores event_name on the function as _hook_event.',
        'register scans all attributes with dir() and checks for _hook_event.',
        'emit looks up handlers by event name and calls them.',
      ],
      concepts: ['decorator', 'function metadata', 'hook system'],
    },
    {
      id: 'py-observer-19',
      title: 'Refactor callback spaghetti',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor deeply nested callback code into an observer pattern.',
      skeleton: `def process_order(order):
    # Validate
    if order["total"] > 0:
        print(f"Validated order {order['id']}")
        # Charge payment
        if order["payment"] == "card":
            print(f"Charged card for {order['total']}")
            # Send email
            print(f"Email sent to {order['email']}")
            # Update inventory
            for item in order["items"]:
                print(f"Updated stock for {item}")
            # Log
            print(f"Order {order['id']} completed")
        else:
            print("Payment failed")
    else:
        print("Invalid order")

order = {
    "id": 1, "total": 50, "payment": "card",
    "email": "a@b.com", "items": ["widget"]
}
process_order(order)`,
      solution: `class OrderProcessor:
    def __init__(self):
        self._hooks = {}

    def on(self, event, handler):
        self._hooks.setdefault(event, []).append(handler)

    def _emit(self, event, order):
        for handler in self._hooks.get(event, []):
            handler(order)

    def process(self, order):
        if order["total"] <= 0:
            self._emit("invalid", order)
            return
        self._emit("validated", order)

        if order["payment"] != "card":
            self._emit("payment_failed", order)
            return
        self._emit("charged", order)
        self._emit("completed", order)

processor = OrderProcessor()
processor.on("validated", lambda o: print(f"Validated order {o['id']}"))
processor.on("charged", lambda o: print(f"Charged card for {o['total']}"))
processor.on("charged", lambda o: print(f"Email sent to {o['email']}"))
processor.on("charged", lambda o: [print(f"Updated stock for {i}") for i in o["items"]])
processor.on("completed", lambda o: print(f"Order {o['id']} completed"))
processor.on("invalid", lambda o: print("Invalid order"))
processor.on("payment_failed", lambda o: print("Payment failed"))

order = {
    "id": 1, "total": 50, "payment": "card",
    "email": "a@b.com", "items": ["widget"]
}
processor.process(order)`,
      hints: [
        'Extract each action into a separate event handler.',
        'Use an event emitter to decouple the processing stages.',
        'Process fires events; handlers react independently.',
      ],
      concepts: ['refactoring', 'observer pattern', 'decoupling'],
    },
    {
      id: 'py-observer-20',
      title: 'Refactor to reactive property system',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor manual update calls into automatic reactive properties.',
      skeleton: `class Dashboard:
    def __init__(self):
        self.temperature = 0
        self.humidity = 0
        self.display_text = ""

    def set_temperature(self, value):
        self.temperature = value
        self._update_display()

    def set_humidity(self, value):
        self.humidity = value
        self._update_display()

    def _update_display(self):
        self.display_text = f"Temp: {self.temperature}F, Humidity: {self.humidity}%"

    def add_alert(self, value):
        # Can't easily add alerts without modifying set_temperature
        pass

d = Dashboard()
d.set_temperature(72)
d.set_humidity(45)
print(d.display_text)`,
      solution: `class ReactiveProperty:
    def __init__(self, value=None):
        self._value = value
        self._callbacks = []

    def get(self):
        return self._value

    def set(self, value):
        if self._value != value:
            old = self._value
            self._value = value
            for cb in self._callbacks:
                cb(old, value)

    def on_change(self, callback):
        self._callbacks.append(callback)

class Dashboard:
    def __init__(self):
        self.temperature = ReactiveProperty(0)
        self.humidity = ReactiveProperty(0)
        self.display_text = ""

        self.temperature.on_change(lambda o, n: self._update_display())
        self.humidity.on_change(lambda o, n: self._update_display())

    def _update_display(self):
        self.display_text = f"Temp: {self.temperature.get()}F, Humidity: {self.humidity.get()}%"

    def add_alert(self, threshold, callback):
        self.temperature.on_change(
            lambda old, new: callback(new) if new > threshold else None
        )

d = Dashboard()
d.temperature.set(72)
d.humidity.set(45)
print(d.display_text)`,
      hints: [
        'Create a ReactiveProperty class that notifies on value changes.',
        'Replace primitive attributes with ReactiveProperty instances.',
        'Subscribe _update_display to both property changes.',
      ],
      concepts: ['reactive programming', 'observable property', 'refactoring'],
    },
  ],
};
