import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-deinit',
  title: '24. Deinitialization',
  explanation: `## Deinitialization in Swift

Deinitializers are called when a class instance is deallocated. Only classes have deinit.

\`\`\`swift
class FileHandle {
    var name: String
    init(name: String) {
        self.name = name
        print("Opened \\(name)")
    }
    deinit {
        print("Closed \\(name)")
    }
}
\`\`\`

### Reference Cycles
Strong reference cycles prevent deallocation:
\`\`\`swift
class A { var b: B? }
class B { var a: A? }  // cycle!
\`\`\`

### Breaking Cycles
\`\`\`swift
class B { weak var a: A? }     // weak: optional ref
class B { unowned var a: A }   // unowned: non-optional ref
\`\`\``,
  exercises: [
    {
      id: 'swift-deinit-1',
      title: 'Basic Deinit',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Add a deinitializer to the class.',
      skeleton: `class Connection {
    var id: Int
    init(id: Int) { self.id = id; print("Open \\(id)") }
    ___ { print("Close \\(id)") }
}`,
      solution: `class Connection {
    var id: Int
    init(id: Int) { self.id = id; print("Open \\(id)") }
    deinit { print("Close \\(id)") }
}`,
      hints: ['Use the `deinit` keyword.', 'No func keyword or parentheses.', 'Called automatically on deallocation.'],
      concepts: ['deinit'],
    },
    {
      id: 'swift-deinit-2',
      title: 'Weak Reference',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Break a reference cycle using weak.',
      skeleton: `class Person {
    var name: String
    var apartment: Apartment?
    init(name: String) { self.name = name }
    deinit { print("\\(name) deinitialized") }
}
class Apartment {
    var unit: String
    ___ var tenant: Person?
    init(unit: String) { self.unit = unit }
    deinit { print("Apartment \\(unit) deinitialized") }
}`,
      solution: `class Person {
    var name: String
    var apartment: Apartment?
    init(name: String) { self.name = name }
    deinit { print("\\(name) deinitialized") }
}
class Apartment {
    var unit: String
    weak var tenant: Person?
    init(unit: String) { self.unit = unit }
    deinit { print("Apartment \\(unit) deinitialized") }
}`,
      hints: ['weak prevents a strong reference cycle.', 'Weak references become nil when the object is deallocated.', 'Must be var and Optional.'],
      concepts: ['weak'],
    },
    {
      id: 'swift-deinit-3',
      title: 'Unowned Reference',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use unowned to break a cycle where the reference is always valid.',
      skeleton: `class Customer {
    var card: CreditCard?
    init() {}
    deinit { print("Customer deinitialized") }
}
class CreditCard {
    ___ let owner: Customer
    init(owner: Customer) { self.owner = owner }
    deinit { print("Card deinitialized") }
}`,
      solution: `class Customer {
    var card: CreditCard?
    init() {}
    deinit { print("Customer deinitialized") }
}
class CreditCard {
    unowned let owner: Customer
    init(owner: Customer) { self.owner = owner }
    deinit { print("Card deinitialized") }
}`,
      hints: ['unowned is for non-optional references.', 'The card always has an owner.', 'unowned does not keep the object alive.'],
      concepts: ['unowned'],
    },
    {
      id: 'swift-deinit-4',
      title: 'Weak Delegate',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Declare a weak delegate property.',
      skeleton: `protocol Delegate: AnyObject {
    func didUpdate()
}
class Manager {
    ___ var delegate: Delegate?
}`,
      solution: `protocol Delegate: AnyObject {
    func didUpdate()
}
class Manager {
    weak var delegate: Delegate?
}`,
      hints: ['Delegates should be weak to avoid retain cycles.', 'Protocol must be AnyObject (class-only).', 'weak var is the standard pattern.'],
      concepts: ['weak', 'delegate'],
    },
    {
      id: 'swift-deinit-5',
      title: 'Closure Capture List [weak self]',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use [weak self] to prevent a closure retain cycle.',
      skeleton: `class Timer {
    var callback: (() -> Void)?
    var count = 0

    func start() {
        callback = { [___ ___] in
            guard let self = self else { return }
            self.count += 1
        }
    }
    deinit { print("Timer deallocated") }
}`,
      solution: `class Timer {
    var callback: (() -> Void)?
    var count = 0

    func start() {
        callback = { [weak self] in
            guard let self = self else { return }
            self.count += 1
        }
    }
    deinit { print("Timer deallocated") }
}`,
      hints: ['[weak self] prevents the closure from retaining self.', 'self becomes Optional inside the closure.', 'Guard let unwraps safely.'],
      concepts: ['weak-self', 'capture-list'],
    },
    {
      id: 'swift-deinit-6',
      title: 'Closure Capture [unowned self]',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Use [unowned self] when the closure cannot outlive self.',
      skeleton: `class Formatter {
    var format: String
    lazy var formatClosure: () -> String = { [___ ___] in
        return self.format.uppercased()
    }
    init(format: String) { self.format = format }
}`,
      solution: `class Formatter {
    var format: String
    lazy var formatClosure: () -> String = { [unowned self] in
        return self.format.uppercased()
    }
    init(format: String) { self.format = format }
}`,
      hints: ['unowned is safe when the closure won\'t outlive self.', 'lazy properties won\'t be accessed after dealloc.', 'No need for optional unwrapping.'],
      concepts: ['unowned-self', 'capture-list'],
    },
    {
      id: 'swift-deinit-7',
      title: 'Resource Cleanup',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a class that cleans up a resource in deinit.',
      skeleton: `class TempFile {
    let path: String

    init(path: String) {
        self.path = path
        // Simulate file creation
        print("Created \\(path)")
    }

    // Add deinit to clean up
}`,
      solution: `class TempFile {
    let path: String

    init(path: String) {
        self.path = path
        print("Created \\(path)")
    }

    deinit {
        print("Deleted \\(path)")
    }
}`,
      hints: ['deinit runs when the object is deallocated.', 'Use it to release external resources.', 'File handles, connections, etc.'],
      concepts: ['deinit', 'resource-cleanup'],
    },
    {
      id: 'swift-deinit-8',
      title: 'Break Cycle with Weak',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write two classes that reference each other without creating a retain cycle.',
      skeleton: `// Write Parent and Child classes
// Parent has a strong ref to Child
// Child has a weak ref back to Parent
// Both have deinit prints
`,
      solution: `class Parent {
    var child: Child?
    deinit { print("Parent deallocated") }
}

class Child {
    weak var parent: Parent?
    deinit { print("Child deallocated") }
}`,
      hints: ['Parent owns Child (strong).', 'Child references Parent weakly.', 'weak prevents the cycle.'],
      concepts: ['weak', 'reference-cycle'],
    },
    {
      id: 'swift-deinit-9',
      title: 'Closure Retain Cycle Fix',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a class with a closure property that does not create a retain cycle.',
      skeleton: `class NetworkManager {
    var onComplete: ((String) -> Void)?
    var data = "response"

    func fetch() {
        // Simulate async, call onComplete with data
        // Must not create retain cycle
    }
    deinit { print("Manager deallocated") }
}`,
      solution: `class NetworkManager {
    var onComplete: ((String) -> Void)?
    var data = "response"

    func fetch() {
        onComplete = { [weak self] _ in
            guard let self = self else { return }
            self.onComplete?(self.data)
        }
    }
    deinit { print("Manager deallocated") }
}`,
      hints: ['Use [weak self] in the closure.', 'The closure is stored on self, creating a cycle.', 'Weak breaks the cycle.'],
      concepts: ['weak-self', 'retain-cycle'],
    },
    {
      id: 'swift-deinit-10',
      title: 'Observer Cleanup',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a class that registers and unregisters from a notification center.',
      skeleton: `class Listener {
    let name: String

    init(name: String) {
        self.name = name
        print("\\(name) registered")
    }

    // Deinit that prints unregistered
}`,
      solution: `class Listener {
    let name: String

    init(name: String) {
        self.name = name
        print("\\(name) registered")
    }

    deinit {
        print("\\(name) unregistered")
    }
}`,
      hints: ['Register in init, unregister in deinit.', 'This is a common pattern for observers.', 'Ensures cleanup when the object is freed.'],
      concepts: ['deinit', 'observer-pattern'],
    },
    {
      id: 'swift-deinit-11',
      title: 'Ref Count Tracker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a class with a static counter tracking live instances.',
      skeleton: `class Tracked {
    static var liveCount = 0

    init() {
        // Increment
    }

    deinit {
        // Decrement
    }
}`,
      solution: `class Tracked {
    static var liveCount = 0

    init() {
        Tracked.liveCount += 1
    }

    deinit {
        Tracked.liveCount -= 1
    }
}`,
      hints: ['Increment in init, decrement in deinit.', 'Static property tracks all instances.', 'liveCount reflects current count.'],
      concepts: ['deinit', 'static', 'tracking'],
    },
    {
      id: 'swift-deinit-12',
      title: 'Unowned Capture in Closure',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write code demonstrating [unowned self] in a non-escaping context.',
      skeleton: `class Printer {
    var text: String

    init(text: String) { self.text = text }

    lazy var printAction: () -> Void = {
        // Use unowned self to print text
    }
    deinit { print("Printer deallocated") }
}`,
      solution: `class Printer {
    var text: String

    init(text: String) { self.text = text }

    lazy var printAction: () -> Void = { [unowned self] in
        print(self.text)
    }
    deinit { print("Printer deallocated") }
}`,
      hints: ['lazy closures can use [unowned self].', 'The closure is always used while self is alive.', 'unowned avoids the retain cycle without optionality.'],
      concepts: ['unowned-self', 'lazy'],
    },
    {
      id: 'swift-deinit-13',
      title: 'Fix Retain Cycle',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the retain cycle between two classes.',
      skeleton: `class A {
    var b: B?
    deinit { print("A deinit") }
}
class B {
    var a: A?
    deinit { print("B deinit") }
}
var a: A? = A()
var b: B? = B()
a!.b = b
b!.a = a
a = nil // Neither deinits
b = nil`,
      solution: `class A {
    var b: B?
    deinit { print("A deinit") }
}
class B {
    weak var a: A?
    deinit { print("B deinit") }
}
var a: A? = A()
var b: B? = B()
a!.b = b
b!.a = a
a = nil
b = nil`,
      hints: ['A and B have a strong reference cycle.', 'Make one reference weak.', 'B\'s reference to A should be weak.'],
      concepts: ['weak', 'retain-cycle'],
    },
    {
      id: 'swift-deinit-14',
      title: 'Fix Closure Retain Cycle',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the closure that retains self.',
      skeleton: `class ViewModel {
    var handler: (() -> Void)?
    var data = "test"

    func setup() {
        handler = {
            print(self.data)
        }
    }
    deinit { print("ViewModel freed") }
}`,
      solution: `class ViewModel {
    var handler: (() -> Void)?
    var data = "test"

    func setup() {
        handler = { [weak self] in
            print(self?.data ?? "")
        }
    }
    deinit { print("ViewModel freed") }
}`,
      hints: ['self is captured strongly by the closure.', 'handler is stored on self, creating a cycle.', 'Use [weak self] to break it.'],
      concepts: ['weak-self', 'retain-cycle'],
    },
    {
      id: 'swift-deinit-15',
      title: 'Fix Unowned Crash',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Fix the unowned reference that crashes when accessed after deallocation.',
      skeleton: `class Owner {
    var name: String
    init(name: String) { self.name = name }
}
class Dependent {
    unowned var owner: Owner
    init(owner: Owner) { self.owner = owner }
}
var o: Owner? = Owner(name: "A")
let d = Dependent(owner: o!)
o = nil
print(d.owner.name)  // Crash!`,
      solution: `class Owner {
    var name: String
    init(name: String) { self.name = name }
}
class Dependent {
    weak var owner: Owner?
    init(owner: Owner) { self.owner = owner }
}
var o: Owner? = Owner(name: "A")
let d = Dependent(owner: o!)
o = nil
print(d.owner?.name ?? "gone")`,
      hints: ['unowned crashes if the referenced object is deallocated.', 'Use weak when the object may be deallocated first.', 'weak references become nil safely.'],
      concepts: ['unowned', 'weak'],
    },
    {
      id: 'swift-deinit-16',
      title: 'Predict Deinit Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class Box {
    var label: String
    init(_ l: String) { label = l; print("init \\(l)") }
    deinit { print("deinit \\(label)") }
}
var b: Box? = Box("A")
b = Box("B")`,
      solution: `init A
init B
deinit A`,
      hints: ['Box A is created first.', 'Box B replaces it, causing A to deallocate.', 'A\'s deinit runs after B is assigned.'],
      concepts: ['deinit', 'reference-counting'],
    },
    {
      id: 'swift-deinit-17',
      title: 'Predict Weak Nil',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class Obj { deinit { print("deinit") } }
var strong: Obj? = Obj()
weak var w = strong
strong = nil
print(w == nil)`,
      solution: `deinit
true`,
      hints: ['strong is set to nil, deallocating the object.', 'deinit runs.', 'w (weak) becomes nil.'],
      concepts: ['weak', 'deinit'],
    },
    {
      id: 'swift-deinit-18',
      title: 'Predict Scope Deinit',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class Logger {
    deinit { print("freed") }
}
func test() {
    let _ = Logger()
    print("end")
}
test()`,
      solution: `end
freed`,
      hints: ['The Logger is created inside test().', 'It is deallocated when test() returns.', '"end" prints before the deinit.'],
      concepts: ['deinit', 'scope'],
    },
    {
      id: 'swift-deinit-19',
      title: 'Refactor Strong to Weak Delegate',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor a strong delegate to weak to prevent a retain cycle.',
      skeleton: `protocol Handler: AnyObject {
    func handle()
}
class Controller: Handler {
    var service = Service()
    init() { service.handler = self }
    func handle() { print("Handled") }
}
class Service {
    var handler: Handler?
}`,
      solution: `protocol Handler: AnyObject {
    func handle()
}
class Controller: Handler {
    var service = Service()
    init() { service.handler = self }
    func handle() { print("Handled") }
    deinit { print("Controller freed") }
}
class Service {
    weak var handler: Handler?
    deinit { print("Service freed") }
}`,
      hints: ['Controller owns Service, Service references Controller.', 'Make Service\'s handler weak.', 'Protocol must be AnyObject for weak.'],
      concepts: ['weak', 'delegate', 'refactoring'],
    },
    {
      id: 'swift-deinit-20',
      title: 'Refactor to Capture List',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add capture lists to fix potential retain cycles.',
      skeleton: `class Downloader {
    var completion: ((String) -> Void)?
    var url: String

    init(url: String) { self.url = url }

    func start() {
        completion = { data in
            print("Downloaded \\(self.url): \\(data)")
        }
    }
}`,
      solution: `class Downloader {
    var completion: ((String) -> Void)?
    var url: String

    init(url: String) { self.url = url }

    func start() {
        completion = { [weak self] data in
            guard let self = self else { return }
            print("Downloaded \\(self.url): \\(data)")
        }
    }

    deinit { print("Downloader freed") }
}`,
      hints: ['completion captures self strongly.', 'self.completion -> closure -> self is a cycle.', 'Use [weak self] to break it.'],
      concepts: ['weak-self', 'capture-list', 'refactoring'],
    },
  ],
};
