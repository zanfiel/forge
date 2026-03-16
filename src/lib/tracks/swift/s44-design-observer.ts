import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-observer',
  title: '44. Observer',
  explanation: `## Observer Pattern in Swift

The Observer pattern defines a one-to-many dependency where observers are notified of state changes.

### NotificationCenter

\`\`\`swift
// Post
NotificationCenter.default.post(name: .init("UserLoggedIn"), object: nil, userInfo: ["user": "Alice"])

// Observe
NotificationCenter.default.addObserver(forName: .init("UserLoggedIn"), object: nil, queue: .main) { notification in
    if let user = notification.userInfo?["user"] as? String {
        print("Welcome \\(user)")
    }
}
\`\`\`

### @Published and Combine

\`\`\`swift
import Combine

class ViewModel: ObservableObject {
    @Published var count = 0
}

let vm = ViewModel()
let cancellable = vm.$count.sink { value in
    print("Count changed to \\(value)")
}
vm.count = 5
\`\`\`

### KVO (Key-Value Observing)

\`\`\`swift
class Player: NSObject {
    @objc dynamic var score: Int = 0
}

let player = Player()
let observation = player.observe(\\.score) { player, change in
    print("Score: \\(player.score)")
}
\`\`\`

### Custom Observer Pattern

\`\`\`swift
protocol Observer: AnyObject {
    func update(_ event: String)
}

class EventEmitter {
    private var observers: [Observer] = []
    func subscribe(_ observer: Observer) { observers.append(observer) }
    func notify(_ event: String) {
        observers.forEach { $0.update(event) }
    }
}
\`\`\`
`,
  exercises: [
    {
      id: 'swift-observer-1',
      title: 'Post a Notification',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Post a notification using NotificationCenter.',
      skeleton: `import Foundation

NotificationCenter.___.post(name: Notification.Name("DataUpdated"), object: nil)`,
      solution: `import Foundation

NotificationCenter.default.post(name: Notification.Name("DataUpdated"), object: nil)`,
      hints: ['NotificationCenter has a singleton instance.', 'The shared instance is called default.', 'The answer is default.'],
      concepts: ['NotificationCenter', 'post'],
    },
    {
      id: 'swift-observer-2',
      title: 'Observe a Notification',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Register an observer for a notification.',
      skeleton: `import Foundation

let observer = NotificationCenter.default.___(forName: Notification.Name("DataUpdated"), object: nil, queue: .main) { notification in
    print("Data was updated!")
}`,
      solution: `import Foundation

let observer = NotificationCenter.default.addObserver(forName: Notification.Name("DataUpdated"), object: nil, queue: .main) { notification in
    print("Data was updated!")
}`,
      hints: ['Register a block-based observer.', 'The method adds an observer with a closure.', 'The answer is addObserver.'],
      concepts: ['NotificationCenter', 'addObserver'],
    },
    {
      id: 'swift-observer-3',
      title: '@Published Property',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use @Published to create an observable property.',
      skeleton: `import Combine

class Settings: ObservableObject {
    ___ var volume: Int = 50
    ___ var brightness: Double = 0.8
}`,
      solution: `import Combine

class Settings: ObservableObject {
    @Published var volume: Int = 50
    @Published var brightness: Double = 0.8
}`,
      hints: ['@Published makes properties observable.', 'Combine automatically notifies subscribers.', 'The answer is @Published for both.'],
      concepts: ['Published', 'ObservableObject'],
    },
    {
      id: 'swift-observer-4',
      title: 'Subscribe with sink',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Subscribe to a @Published property using sink.',
      skeleton: `import Combine

class Counter: ObservableObject {
    @Published var count = 0
}

let counter = Counter()
let cancellable = counter.$count.___ { value in
    print("Count: \\(value)")
}`,
      solution: `import Combine

class Counter: ObservableObject {
    @Published var count = 0
}

let counter = Counter()
let cancellable = counter.$count.sink { value in
    print("Count: \\(value)")
}`,
      hints: ['sink subscribes to a publisher and receives values.', 'It returns an AnyCancellable.', 'The answer is sink.'],
      concepts: ['sink', 'Combine', 'subscription'],
    },
    {
      id: 'swift-observer-5',
      title: 'Custom Observer Protocol',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Define a custom observer protocol.',
      skeleton: `protocol ___: AnyObject {
    func onTemperatureChanged(_ temp: Double)
}

class Thermostat {
    private var observers: [WeatherObserver] = []

    func subscribe(_ observer: WeatherObserver) {
        observers.append(observer)
    }

    func setTemperature(_ temp: Double) {
        observers.forEach { $0.onTemperatureChanged(temp) }
    }
}`,
      solution: `protocol WeatherObserver: AnyObject {
    func onTemperatureChanged(_ temp: Double)
}

class Thermostat {
    private var observers: [WeatherObserver] = []

    func subscribe(_ observer: WeatherObserver) {
        observers.append(observer)
    }

    func setTemperature(_ temp: Double) {
        observers.forEach { $0.onTemperatureChanged(temp) }
    }
}`,
      hints: ['Name the protocol to match its usage.', 'AnyObject constraint allows weak references.', 'The answer is WeatherObserver.'],
      concepts: ['observer-protocol', 'AnyObject'],
    },
    {
      id: 'swift-observer-6',
      title: 'Weak Observer Reference',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Store observers weakly to avoid retain cycles.',
      skeleton: `protocol Observer: AnyObject {
    func update(_ value: Int)
}

class Subject {
    private struct WeakRef {
        ___ var observer: Observer?
    }

    private var observers: [WeakRef] = []

    func subscribe(_ observer: Observer) {
        observers.append(WeakRef(observer: observer))
    }

    func notify(_ value: Int) {
        observers = observers.filter { $0.observer != nil }
        observers.forEach { $0.observer?.update(value) }
    }
}`,
      solution: `protocol Observer: AnyObject {
    func update(_ value: Int)
}

class Subject {
    private struct WeakRef {
        weak var observer: Observer?
    }

    private var observers: [WeakRef] = []

    func subscribe(_ observer: Observer) {
        observers.append(WeakRef(observer: observer))
    }

    func notify(_ value: Int) {
        observers = observers.filter { $0.observer != nil }
        observers.forEach { $0.observer?.update(value) }
    }
}`,
      hints: ['Weak references prevent retain cycles.', 'Use weak to avoid keeping observers alive.', 'The answer is weak.'],
      concepts: ['weak-reference', 'retain-cycle-prevention'],
    },
    {
      id: 'swift-observer-7',
      title: 'Write a Type-Safe Event System',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a generic event emitter with typed events.',
      skeleton: `// Write a class EventEmitter with:
// - func on<T>(_ event: String, handler: @escaping (T) -> Void)
// - func emit<T>(_ event: String, data: T)
// Store handlers as [String: [(Any) -> Void]]
`,
      solution: `class EventEmitter {
    private var handlers: [String: [(Any) -> Void]] = [:]

    func on<T>(_ event: String, handler: @escaping (T) -> Void) {
        let wrapper: (Any) -> Void = { data in
            if let typed = data as? T {
                handler(typed)
            }
        }
        handlers[event, default: []].append(wrapper)
    }

    func emit<T>(_ event: String, data: T) {
        handlers[event]?.forEach { $0(data) }
    }
}`,
      hints: ['Wrap typed handlers in an Any -> Void closure.', 'Cast back to T inside the wrapper.', 'Use dictionary with default values.'],
      concepts: ['type-safe-events', 'generic-observer'],
    },
    {
      id: 'swift-observer-8',
      title: 'Write a Combine Pipeline',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a Combine publisher pipeline with operators.',
      skeleton: `import Combine

// Write a class SearchViewModel with:
// - @Published var query: String = ""
// - @Published var results: [String] = []
// - private var cancellables: Set<AnyCancellable>
// - In init, set up a pipeline that:
//   debounces query changes by 0.3s
//   removes duplicates
//   maps to uppercase results array
`,
      solution: `import Combine

class SearchViewModel: ObservableObject {
    @Published var query: String = ""
    @Published var results: [String] = []
    private var cancellables = Set<AnyCancellable>()

    init() {
        $query
            .debounce(for: .seconds(0.3), scheduler: RunLoop.main)
            .removeDuplicates()
            .map { query in
                guard !query.isEmpty else { return [] }
                return [query.uppercased()]
            }
            .assign(to: &$results)
    }
}`,
      hints: ['Use $ prefix to access the publisher.', 'Chain operators: debounce, removeDuplicates, map.', 'assign(to:) connects the pipeline to a @Published.'],
      concepts: ['Combine', 'publisher-pipeline', 'debounce'],
    },
    {
      id: 'swift-observer-9',
      title: 'Write a Property Observer Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a property wrapper that notifies on changes.',
      skeleton: `// Write a @propertyWrapper struct Observable<T: Equatable> with:
// - wrappedValue that notifies onChange closure on set
// - var onChange: ((T, T) -> Void)? (old, new)
// - Only notifies when value actually changes
`,
      solution: `@propertyWrapper
struct Observable<T: Equatable> {
    private var value: T
    var onChange: ((T, T) -> Void)?

    var wrappedValue: T {
        get { value }
        set {
            let oldValue = value
            value = newValue
            if oldValue != newValue {
                onChange?(oldValue, newValue)
            }
        }
    }

    var projectedValue: Observable<T> {
        get { self }
        set { self = newValue }
    }

    init(wrappedValue: T) {
        self.value = wrappedValue
    }
}`,
      hints: ['Compare old and new values before notifying.', 'T must be Equatable for comparison.', 'projectedValue exposes the wrapper itself via $.'],
      concepts: ['property-wrapper', 'change-notification', 'Equatable'],
    },
    {
      id: 'swift-observer-10',
      title: 'Write a Disposable Observer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write an observer system with disposable subscriptions.',
      skeleton: `// Write:
// - class Disposable with a dispose() method
// - class Signal<T> with subscribe/emit
// - subscribe returns a Disposable that removes the handler when disposed
`,
      solution: `class Disposable {
    private let disposal: () -> Void
    init(_ disposal: @escaping () -> Void) { self.disposal = disposal }
    func dispose() { disposal() }
}

class Signal<T> {
    private var handlers: [UUID: (T) -> Void] = [:]

    func subscribe(_ handler: @escaping (T) -> Void) -> Disposable {
        let id = UUID()
        handlers[id] = handler
        return Disposable { [weak self] in
            self?.handlers.removeValue(forKey: id)
        }
    }

    func emit(_ value: T) {
        handlers.values.forEach { $0(value) }
    }
}`,
      hints: ['Use UUID to identify each subscription.', 'Disposable removes the handler when called.', 'Use weak self in the disposal closure.'],
      concepts: ['disposable', 'subscription-management', 'UUID'],
    },
    {
      id: 'swift-observer-11',
      title: 'Write a Multi-Property Observer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write an observer that watches multiple properties.',
      skeleton: `// Write a class FormValidator with:
// - @Published var email: String
// - @Published var password: String
// - @Published var isValid: Bool
// - isValid is true when email contains "@" and password.count >= 8
// Use Combine to automatically update isValid
`,
      solution: `import Combine

class FormValidator: ObservableObject {
    @Published var email: String = ""
    @Published var password: String = ""
    @Published var isValid: Bool = false

    private var cancellables = Set<AnyCancellable>()

    init() {
        Publishers.CombineLatest($email, $password)
            .map { email, password in
                email.contains("@") && password.count >= 8
            }
            .assign(to: &$isValid)
    }
}`,
      hints: ['CombineLatest merges two publishers.', 'It emits when either changes.', 'map transforms the combined values into a Bool.'],
      concepts: ['CombineLatest', 'form-validation', 'reactive'],
    },
    {
      id: 'swift-observer-12',
      title: 'Write a didSet Observer Chain',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write a struct that uses didSet for cascading updates.',
      skeleton: `// Write a struct Thermostat with:
// - var targetTemp: Double (didSet clamps 60-80 and updates status)
// - private(set) var status: String
// - status: "heating" if target > 72, "cooling" if < 68, "idle" otherwise
`,
      solution: `struct Thermostat {
    var targetTemp: Double = 72 {
        didSet {
            targetTemp = min(max(targetTemp, 60), 80)
            if targetTemp > 72 {
                status = "heating"
            } else if targetTemp < 68 {
                status = "cooling"
            } else {
                status = "idle"
            }
        }
    }

    private(set) var status: String = "idle"
}`,
      hints: ['didSet fires after the value changes.', 'Clamp the value first, then update status.', 'Use private(set) for read-only external access.'],
      concepts: ['didSet', 'property-observer', 'cascading-updates'],
    },
    {
      id: 'swift-observer-13',
      title: 'Fix Observer Memory Leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the observer that causes a memory leak.',
      skeleton: `class DataStore {
    var onUpdate: ((String) -> Void)?
}

class ViewController {
    let store = DataStore()

    init() {
        store.onUpdate = { data in
            self.display(data)
        }
    }

    func display(_ data: String) { print(data) }
    deinit { print("ViewController deallocated") }
}`,
      solution: `class DataStore {
    var onUpdate: ((String) -> Void)?
}

class ViewController {
    let store = DataStore()

    init() {
        store.onUpdate = { [weak self] data in
            self?.display(data)
        }
    }

    func display(_ data: String) { print(data) }
    deinit { print("ViewController deallocated") }
}`,
      hints: ['The closure captures self strongly.', 'store owns closure, self owns store -> retain cycle.', 'Use [weak self] in the capture list.'],
      concepts: ['retain-cycle', 'weak-capture', 'memory-leak'],
    },
    {
      id: 'swift-observer-14',
      title: 'Fix Missing Cancellable Storage',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the Combine subscription that is immediately cancelled.',
      skeleton: `import Combine

class Logger {
    @Published var messages: [String] = []

    func setup() {
        $messages.sink { msgs in
            print("Messages: \\(msgs.count)")
        }
        // Subscription immediately cancelled!
    }
}`,
      solution: `import Combine

class Logger {
    @Published var messages: [String] = []
    private var cancellables = Set<AnyCancellable>()

    func setup() {
        $messages.sink { msgs in
            print("Messages: \\(msgs.count)")
        }
        .store(in: &cancellables)
    }
}`,
      hints: ['sink returns an AnyCancellable.', 'If not stored, it is deallocated immediately.', 'Store it in a Set<AnyCancellable>.'],
      concepts: ['AnyCancellable', 'subscription-lifetime'],
    },
    {
      id: 'swift-observer-15',
      title: 'Fix Observer Not Removed',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the NotificationCenter observer that is never removed.',
      skeleton: `import Foundation

class ViewController {
    init() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleNotification),
            name: Notification.Name("Update"),
            object: nil
        )
    }

    @objc func handleNotification() {
        print("Updated")
    }
    // Observer never removed!
}`,
      solution: `import Foundation

class ViewController: NSObject {
    private var observer: NSObjectProtocol?

    override init() {
        super.init()
        observer = NotificationCenter.default.addObserver(
            forName: Notification.Name("Update"),
            object: nil,
            queue: .main
        ) { [weak self] _ in
            self?.handleNotification()
        }
    }

    func handleNotification() {
        print("Updated")
    }

    deinit {
        if let observer = observer {
            NotificationCenter.default.removeObserver(observer)
        }
    }
}`,
      hints: ['Store the observer token returned by addObserver.', 'Remove it in deinit.', 'Use the block-based API with weak self.'],
      concepts: ['removeObserver', 'deinit', 'cleanup'],
    },
    {
      id: 'swift-observer-16',
      title: 'Predict didSet Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the output of property observers.',
      skeleton: `struct Score {
    var value: Int = 0 {
        willSet { print("will: \\(newValue)") }
        didSet { print("did: \\(oldValue)->\\(value)") }
    }
}

var s = Score()
s.value = 10
s.value = 20`,
      solution: `will: 10
did: 0->10
will: 20
did: 10->20`,
      hints: ['willSet fires before the change with newValue.', 'didSet fires after with oldValue.', 'Each assignment triggers both.'],
      concepts: ['willSet', 'didSet', 'property-observers'],
    },
    {
      id: 'swift-observer-17',
      title: 'Predict Published Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict when @Published sends values.',
      skeleton: `import Combine

class Model: ObservableObject {
    @Published var x = 0
}

let m = Model()
var values: [Int] = []
let c = m.$x.sink { values.append($0) }
m.x = 1
m.x = 2
print(values)`,
      solution: `[0, 1, 2]`,
      hints: ['@Published sends the current value on subscribe.', 'Then sends each new value on change.', 'Initial 0, then 1, then 2.'],
      concepts: ['Published', 'sink', 'initial-value'],
    },
    {
      id: 'swift-observer-18',
      title: 'Predict Observer Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict how many times an observer is called.',
      skeleton: `class Subject {
    var observers: [() -> Void] = []
    func notify() { observers.forEach { $0() } }
}

let s = Subject()
var count = 0
s.observers.append { count += 1 }
s.observers.append { count += 1 }
s.notify()
s.notify()
s.notify()
print(count)`,
      solution: `6`,
      hints: ['2 observers, each called 3 times.', '2 * 3 = 6.', 'Each notify calls all observers.'],
      concepts: ['observer-notification', 'counting'],
    },
    {
      id: 'swift-observer-19',
      title: 'Refactor Callback to Combine',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor callback-based observation to Combine.',
      skeleton: `class UserService {
    var onNameChanged: ((String) -> Void)?
    var onAgeChanged: ((Int) -> Void)?

    private var name: String = "" {
        didSet { onNameChanged?(name) }
    }

    private var age: Int = 0 {
        didSet { onAgeChanged?(age) }
    }

    func update(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}`,
      solution: `import Combine

class UserService: ObservableObject {
    @Published var name: String = ""
    @Published var age: Int = 0

    func update(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}`,
      hints: ['@Published replaces manual callbacks.', 'Subscribers use $name.sink {} instead.', 'ObservableObject enables objectWillChange.'],
      concepts: ['Combine-migration', 'Published', 'refactoring'],
    },
    {
      id: 'swift-observer-20',
      title: 'Refactor Polling to Observation',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Refactor polling-based updates to push-based observation.',
      skeleton: `class StockPrice {
    private var price: Double = 100.0

    func getPrice() -> Double {
        return price
    }

    func setPrice(_ newPrice: Double) {
        price = newPrice
    }
}

// Client polls every second
class Dashboard {
    let stock = StockPrice()
    var displayedPrice: Double = 0

    func pollUpdate() {
        // Called on a timer
        let current = stock.getPrice()
        if current != displayedPrice {
            displayedPrice = current
            print("Price: \\(displayedPrice)")
        }
    }
}`,
      solution: `import Combine

class StockPrice: ObservableObject {
    @Published var price: Double = 100.0
}

class Dashboard {
    let stock = StockPrice()
    private var cancellables = Set<AnyCancellable>()

    init() {
        stock.$price
            .removeDuplicates()
            .sink { [weak self] price in
                self?.updateDisplay(price)
            }
            .store(in: &cancellables)
    }

    func updateDisplay(_ price: Double) {
        print("Price: \\(price)")
    }
}`,
      hints: ['Replace polling with @Published and Combine.', 'removeDuplicates avoids redundant updates.', 'Push-based is more efficient than polling.'],
      concepts: ['push-vs-pull', 'Combine', 'efficiency'],
    },
  ],
};
