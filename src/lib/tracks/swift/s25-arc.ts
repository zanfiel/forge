import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-arc',
  title: '25. ARC',
  explanation: `## Automatic Reference Counting in Swift

ARC automatically manages memory by tracking strong references to class instances.

\`\`\`swift
class Dog { var name: String; init(name: String) { self.name = name } }
var a: Dog? = Dog(name: "Rex")  // refcount = 1
var b = a                        // refcount = 2
a = nil                          // refcount = 1
b = nil                          // refcount = 0, deallocated
\`\`\`

### Reference Types
- **strong** (default): Increments reference count
- **weak**: Does not increment; becomes nil on dealloc
- **unowned**: Does not increment; crashes if accessed after dealloc

### Capture Lists in Closures
\`\`\`swift
class VC {
    var handler: (() -> Void)?
    func setup() {
        handler = { [weak self] in
            self?.doWork()
        }
    }
}
\`\`\``,
  exercises: [
    {
      id: 'swift-arc-1',
      title: 'Strong Reference Count',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Understand when ARC deallocates an instance.',
      skeleton: `class Obj { deinit { print("deallocated") } }
var a: Obj? = Obj()  // refcount = 1
var b = ___          // refcount = 2
a = nil              // refcount = 1
b = ___              // refcount = 0, prints "deallocated"`,
      solution: `class Obj { deinit { print("deallocated") } }
var a: Obj? = Obj()  // refcount = 1
var b = a            // refcount = 2
a = nil              // refcount = 1
b = nil              // refcount = 0, prints "deallocated"`,
      hints: ['Assigning to b creates another strong reference.', 'Setting both to nil brings refcount to 0.', 'ARC deallocates when refcount hits 0.'],
      concepts: ['strong-reference', 'ARC'],
    },
    {
      id: 'swift-arc-2',
      title: 'Weak Reference',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Declare a weak reference that does not prevent deallocation.',
      skeleton: `class Obj { deinit { print("freed") } }
var strong: Obj? = Obj()
___ var ref = strong
strong = nil  // Object is deallocated
print(ref == nil) // true`,
      solution: `class Obj { deinit { print("freed") } }
var strong: Obj? = Obj()
weak var ref = strong
strong = nil  // Object is deallocated
print(ref == nil) // true`,
      hints: ['weak does not keep the object alive.', 'When strong goes nil, the object is freed.', 'ref automatically becomes nil.'],
      concepts: ['weak'],
    },
    {
      id: 'swift-arc-3',
      title: 'Unowned Reference',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use unowned for a reference that is always valid during its lifetime.',
      skeleton: `class Country {
    var capital: City!
    init() { capital = City(country: self) }
}
class City {
    ___ let country: Country
    init(country: Country) { self.country = country }
}`,
      solution: `class Country {
    var capital: City!
    init() { capital = City(country: self) }
}
class City {
    unowned let country: Country
    init(country: Country) { self.country = country }
}`,
      hints: ['A city always has a country.', 'unowned avoids a retain cycle.', 'The city never outlives its country.'],
      concepts: ['unowned'],
    },
    {
      id: 'swift-arc-4',
      title: 'Capture List [weak self]',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use a capture list to prevent a closure retain cycle.',
      skeleton: `class VC {
    var task: (() -> Void)?
    func start() {
        task = { [___ ___] in
            self?.update()
        }
    }
    func update() {}
}`,
      solution: `class VC {
    var task: (() -> Void)?
    func start() {
        task = { [weak self] in
            self?.update()
        }
    }
    func update() {}
}`,
      hints: ['task stores the closure, closure captures self.', '[weak self] breaks the cycle.', 'self becomes optional inside.'],
      concepts: ['weak-self', 'capture-list'],
    },
    {
      id: 'swift-arc-5',
      title: 'Capture List [unowned self]',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use [unowned self] when the closure cannot outlive self.',
      skeleton: `class Formatter {
    var prefix: String
    lazy var format: (String) -> String = { [___ ___] text in
        return "\\(self.prefix): \\(text)"
    }
    init(prefix: String) { self.prefix = prefix }
}`,
      solution: `class Formatter {
    var prefix: String
    lazy var format: (String) -> String = { [unowned self] text in
        return "\\(self.prefix): \\(text)"
    }
    init(prefix: String) { self.prefix = prefix }
}`,
      hints: ['lazy properties are accessed while self exists.', 'unowned is safe here.', 'No optional unwrapping needed.'],
      concepts: ['unowned-self', 'lazy'],
    },
    {
      id: 'swift-arc-6',
      title: 'Multiple Capture Values',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Capture multiple values in a closure capture list.',
      skeleton: `class Logger {
    var tag: String
    var level: Int
    var handler: (() -> String)?

    init(tag: String, level: Int) {
        self.tag = tag
        self.level = level
    }

    func setup() {
        handler = { [___ self, ___ tag = self.tag] in
            return "\\(tag): level"
        }
    }
}`,
      solution: `class Logger {
    var tag: String
    var level: Int
    var handler: (() -> String)?

    init(tag: String, level: Int) {
        self.tag = tag
        self.level = level
    }

    func setup() {
        handler = { [weak self, tag = self.tag] in
            return "\\(tag): level"
        }
    }
}`,
      hints: ['Multiple captures are comma-separated.', 'tag captures the value at setup time.', 'self is captured weakly.'],
      concepts: ['capture-list', 'value-capture'],
    },
    {
      id: 'swift-arc-7',
      title: 'Demonstrate ARC Deallocation',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write code that shows an object being allocated and deallocated via ARC.',
      skeleton: `class Tracker {
    var id: Int
    // init prints "created id"
    // deinit prints "destroyed id"
}
// Create and destroy a Tracker
`,
      solution: `class Tracker {
    var id: Int
    init(id: Int) {
        self.id = id
        print("created \\(id)")
    }
    deinit {
        print("destroyed \\(id)")
    }
}
var t: Tracker? = Tracker(id: 1)
t = nil`,
      hints: ['Create with var so we can set to nil.', 'Setting to nil removes the last strong ref.', 'ARC calls deinit.'],
      concepts: ['ARC', 'deinit'],
    },
    {
      id: 'swift-arc-8',
      title: 'Detect a Retain Cycle',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write code that intentionally creates a retain cycle and show it by checking deinit.',
      skeleton: `// Create two classes that reference each other strongly
// Show that setting both to nil does NOT trigger deinit
`,
      solution: `class A {
    var b: B?
    deinit { print("A freed") }
}
class B {
    var a: A?
    deinit { print("B freed") }
}
var a: A? = A()
var b: B? = B()
a!.b = b
b!.a = a
a = nil
b = nil
print("Neither deinit was called")`,
      hints: ['Both hold strong references to each other.', 'Setting vars to nil does not free them.', 'The cycle keeps both alive.'],
      concepts: ['retain-cycle', 'ARC'],
    },
    {
      id: 'swift-arc-9',
      title: 'Fix Cycle with Weak',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Take the retain cycle from the previous exercise and fix it with weak.',
      skeleton: `// Fix the retain cycle using weak
`,
      solution: `class A {
    var b: B?
    deinit { print("A freed") }
}
class B {
    weak var a: A?
    deinit { print("B freed") }
}
var a: A? = A()
var b: B? = B()
a!.b = b
b!.a = a
a = nil
b = nil`,
      hints: ['Make one reference weak.', 'The weak side does not retain.', 'Both will now be deallocated.'],
      concepts: ['weak', 'retain-cycle'],
    },
    {
      id: 'swift-arc-10',
      title: 'Strong Reference in Array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Show that arrays hold strong references to their elements.',
      skeleton: `class Item {
    let name: String
    init(name: String) { self.name = name }
    deinit { print("\\(name) freed") }
}
// Create an item, add to array, remove from array, show lifecycle
`,
      solution: `class Item {
    let name: String
    init(name: String) { self.name = name }
    deinit { print("\\(name) freed") }
}
var items: [Item] = []
var item: Item? = Item(name: "Widget")
items.append(item!)
item = nil
print("item var is nil but object lives in array")
items.removeAll()
print("Now it's freed")`,
      hints: ['Arrays hold strong refs to elements.', 'Setting item to nil does not free it.', 'removeAll removes the last strong ref.'],
      concepts: ['strong-reference', 'collections'],
    },
    {
      id: 'swift-arc-11',
      title: 'Weak Reference in Collection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Create a collection of weak references using a wrapper.',
      skeleton: `// Create a Weak<T> wrapper and use it in an array
`,
      solution: `class WeakRef<T: AnyObject> {
    weak var value: T?
    init(_ value: T) { self.value = value }
}

class Obj {
    let id: Int
    init(id: Int) { self.id = id }
    deinit { print("Obj \\(id) freed") }
}

var refs: [WeakRef<Obj>] = []
var obj: Obj? = Obj(id: 1)
refs.append(WeakRef(obj!))
obj = nil
print(refs[0].value == nil)`,
      hints: ['Swift arrays hold strong refs.', 'Wrap in a class with a weak property.', 'The wrapped object can be freed independently.'],
      concepts: ['weak', 'generic-wrapper'],
    },
    {
      id: 'swift-arc-12',
      title: 'withExtendedLifetime',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Use withExtendedLifetime to ensure an object lives long enough.',
      skeleton: `class Resource {
    func use() { print("using") }
    deinit { print("freed") }
}

func process() {
    let r = Resource()
    // Ensure r lives until after use() completes
}`,
      solution: `class Resource {
    func use() { print("using") }
    deinit { print("freed") }
}

func process() {
    let r = Resource()
    withExtendedLifetime(r) {
        r.use()
    }
}`,
      hints: ['withExtendedLifetime guarantees the object stays alive.', 'Prevents premature optimization by the compiler.', 'Useful for Unsafe code or interop.'],
      concepts: ['withExtendedLifetime', 'ARC'],
    },
    {
      id: 'swift-arc-13',
      title: 'Fix Closure Retain Cycle',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the closure that creates a retain cycle.',
      skeleton: `class Timer {
    var tick: (() -> Void)?
    var count = 0
    func start() {
        tick = {
            self.count += 1
            print(self.count)
        }
    }
    deinit { print("Timer freed") }
}`,
      solution: `class Timer {
    var tick: (() -> Void)?
    var count = 0
    func start() {
        tick = { [weak self] in
            guard let self = self else { return }
            self.count += 1
            print(self.count)
        }
    }
    deinit { print("Timer freed") }
}`,
      hints: ['tick closure captures self strongly.', 'self.tick -> closure -> self is a cycle.', 'Use [weak self].'],
      concepts: ['weak-self', 'retain-cycle'],
    },
    {
      id: 'swift-arc-14',
      title: 'Fix Unowned After Dealloc',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Fix the code that accesses an unowned ref after deallocation.',
      skeleton: `class Parent { var name = "P" }
class Child {
    unowned var parent: Parent
    init(parent: Parent) { self.parent = parent }
}
var p: Parent? = Parent()
let c = Child(parent: p!)
p = nil
print(c.parent.name) // Crash!`,
      solution: `class Parent { var name = "P" }
class Child {
    weak var parent: Parent?
    init(parent: Parent) { self.parent = parent }
}
var p: Parent? = Parent()
let c = Child(parent: p!)
p = nil
print(c.parent?.name ?? "none")`,
      hints: ['unowned crashes when the referenced object is gone.', 'Switch to weak for safety.', 'Use optional chaining.'],
      concepts: ['weak', 'unowned'],
    },
    {
      id: 'swift-arc-15',
      title: 'Fix Strong Delegate',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the strong delegate that prevents deallocation.',
      skeleton: `protocol Delegate: AnyObject { func notify() }
class Service {
    var delegate: Delegate?
    deinit { print("Service freed") }
}
class Controller: Delegate {
    var service = Service()
    init() { service.delegate = self }
    func notify() {}
    deinit { print("Controller freed") }
}`,
      solution: `protocol Delegate: AnyObject { func notify() }
class Service {
    weak var delegate: Delegate?
    deinit { print("Service freed") }
}
class Controller: Delegate {
    var service = Service()
    init() { service.delegate = self }
    func notify() {}
    deinit { print("Controller freed") }
}`,
      hints: ['Controller -> Service -> delegate -> Controller is a cycle.', 'Make delegate weak.', 'AnyObject constraint enables weak.'],
      concepts: ['weak', 'delegate'],
    },
    {
      id: 'swift-arc-16',
      title: 'Predict ARC Deallocation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class X {
    deinit { print("X gone") }
}
var a: X? = X()
var b = a
var c = a
a = nil
b = nil
c = nil`,
      solution: `X gone`,
      hints: ['Three strong refs: a, b, c.', 'Only after all three are nil is refcount 0.', '"X gone" prints once at the end.'],
      concepts: ['ARC', 'reference-counting'],
    },
    {
      id: 'swift-arc-17',
      title: 'Predict Weak Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class Obj { deinit { print("deinit") } }
var s: Obj? = Obj()
weak var w = s
print(w != nil)
s = nil
print(w != nil)`,
      solution: `true
deinit
false`,
      hints: ['Initially w points to the object (true).', 'Setting s to nil frees it (deinit).', 'w becomes nil (false).'],
      concepts: ['weak', 'ARC'],
    },
    {
      id: 'swift-arc-18',
      title: 'Predict Capture List',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class Box {
    var value = 1
    deinit { print("Box freed") }
}
var box: Box? = Box()
let closure = { [weak box] in
    print(box?.value ?? -1)
}
box = nil
closure()`,
      solution: `Box freed
-1`,
      hints: ['box is captured weakly.', 'Setting box to nil frees the object.', 'The closure sees nil.'],
      concepts: ['weak', 'capture-list'],
    },
    {
      id: 'swift-arc-19',
      title: 'Refactor to Weak Capture',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add proper capture lists to prevent retain cycles.',
      skeleton: `class DataManager {
    var data: [String] = []
    var onChange: (() -> Void)?

    func observe() {
        onChange = {
            print("Data count: \\(self.data.count)")
        }
    }
}`,
      solution: `class DataManager {
    var data: [String] = []
    var onChange: (() -> Void)?

    func observe() {
        onChange = { [weak self] in
            guard let self = self else { return }
            print("Data count: \\(self.data.count)")
        }
    }

    deinit { print("DataManager freed") }
}`,
      hints: ['onChange closure captures self.', 'self.onChange -> closure -> self.', 'Use [weak self] and guard let.'],
      concepts: ['weak-self', 'refactoring'],
    },
    {
      id: 'swift-arc-20',
      title: 'Refactor Nested Closures',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Fix retain cycles in nested closures.',
      skeleton: `class Downloader {
    var onProgress: ((Double) -> Void)?
    var onComplete: ((String) -> Void)?
    var url: String

    init(url: String) { self.url = url }

    func start() {
        onProgress = { percent in
            print("\\(self.url): \\(percent)%")
        }
        onComplete = { data in
            print("\\(self.url) done: \\(data)")
        }
    }
}`,
      solution: `class Downloader {
    var onProgress: ((Double) -> Void)?
    var onComplete: ((String) -> Void)?
    var url: String

    init(url: String) { self.url = url }

    func start() {
        onProgress = { [weak self] percent in
            guard let self = self else { return }
            print("\\(self.url): \\(percent)%")
        }
        onComplete = { [weak self] data in
            guard let self = self else { return }
            print("\\(self.url) done: \\(data)")
        }
    }

    deinit { print("Downloader freed") }
}`,
      hints: ['Both closures capture self strongly.', 'Add [weak self] to each.', 'Each closure is stored on self, creating two cycles.'],
      concepts: ['weak-self', 'capture-list', 'refactoring'],
    },
  ],
};
