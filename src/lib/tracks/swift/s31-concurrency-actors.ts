import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-actors',
  title: '31. Actors',
  explanation: `## Actors in Swift

Actors protect mutable state from data races by ensuring only one task accesses their state at a time.

### Actor Declaration

\`\`\`swift
actor BankAccount {
    var balance: Double

    init(balance: Double) {
        self.balance = balance
    }

    func deposit(_ amount: Double) {
        balance += amount
    }

    func withdraw(_ amount: Double) -> Bool {
        guard balance >= amount else { return false }
        balance -= amount
        return true
    }
}
\`\`\`

### Isolated Access

Actor properties and methods are **isolated** by default. External access requires \`await\`:

\`\`\`swift
let account = BankAccount(balance: 100)
await account.deposit(50)
print(await account.balance)  // 150
\`\`\`

### Nonisolated Methods

Methods that don't access mutable state can be \`nonisolated\`:

\`\`\`swift
actor Config {
    let appName: String = "MyApp"  // immutable, safe

    nonisolated func getAppName() -> String {
        return appName
    }
}
\`\`\`

### MainActor

\`@MainActor\` ensures code runs on the main thread:

\`\`\`swift
@MainActor
class ViewModel {
    var title: String = ""
    func updateUI() { /* safe to update UI */ }
}
\`\`\`

### Sendable

\`Sendable\` marks types safe to pass across concurrency boundaries:

\`\`\`swift
struct Point: Sendable {
    let x: Double
    let y: Double
}
\`\`\`
`,
  exercises: [
    {
      id: 'swift-actors-1',
      title: 'Declare an Actor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare an actor type.',
      skeleton: `___ Counter {
    var count: Int = 0

    func increment() {
        count += 1
    }
}`,
      solution: `actor Counter {
    var count: Int = 0

    func increment() {
        count += 1
    }
}`,
      hints: [
        'Actors are declared like classes but with a different keyword.',
        'The keyword protects state from data races.',
        'The answer is actor.',
      ],
      concepts: ['actor-declaration'],
    },
    {
      id: 'swift-actors-2',
      title: 'Await Actor Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Access an actor property from outside using await.',
      skeleton: `actor Temperature {
    var current: Double = 72.0

    func update(to temp: Double) {
        current = temp
    }
}

let sensor = Temperature()
Task {
    ___ sensor.update(to: 75.0)
    print(___ sensor.current)
}`,
      solution: `actor Temperature {
    var current: Double = 72.0

    func update(to temp: Double) {
        current = temp
    }
}

let sensor = Temperature()
Task {
    await sensor.update(to: 75.0)
    print(await sensor.current)
}`,
      hints: [
        'Actor properties and methods require await from outside.',
        'This ensures safe access across concurrency boundaries.',
        'Use await for both the method call and property access.',
      ],
      concepts: ['actor-isolation', 'await'],
    },
    {
      id: 'swift-actors-3',
      title: 'Nonisolated Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Mark a method as nonisolated to allow synchronous access.',
      skeleton: `actor Logger {
    let prefix: String
    var entries: [String] = []

    init(prefix: String) {
        self.prefix = prefix
    }

    ___ func getPrefix() -> String {
        return prefix
    }

    func log(_ message: String) {
        entries.append("\\(prefix): \\(message)")
    }
}`,
      solution: `actor Logger {
    let prefix: String
    var entries: [String] = []

    init(prefix: String) {
        self.prefix = prefix
    }

    nonisolated func getPrefix() -> String {
        return prefix
    }

    func log(_ message: String) {
        entries.append("\\(prefix): \\(message)")
    }
}`,
      hints: [
        'prefix is a let constant, so it is safe to read without isolation.',
        'Use the nonisolated keyword.',
        'Nonisolated methods can be called without await.',
      ],
      concepts: ['nonisolated', 'immutable-state'],
    },
    {
      id: 'swift-actors-4',
      title: 'MainActor Class',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use @MainActor to ensure a class runs on the main thread.',
      skeleton: `___
class ViewModel {
    var items: [String] = []

    func addItem(_ item: String) {
        items.append(item)
    }

    func clearItems() {
        items.removeAll()
    }
}`,
      solution: `@MainActor
class ViewModel {
    var items: [String] = []

    func addItem(_ item: String) {
        items.append(item)
    }

    func clearItems() {
        items.removeAll()
    }
}`,
      hints: [
        '@MainActor ensures all access happens on the main thread.',
        'This is essential for UI-related classes.',
        'Place the attribute before the class declaration.',
      ],
      concepts: ['main-actor', 'ui-thread-safety'],
    },
    {
      id: 'swift-actors-5',
      title: 'Sendable Struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Conform a struct to Sendable.',
      skeleton: `struct Message: ___ {
    let id: Int
    let text: String
    let timestamp: Date
}`,
      solution: `struct Message: Sendable {
    let id: Int
    let text: String
    let timestamp: Date
}`,
      hints: [
        'Sendable types are safe to pass across concurrency boundaries.',
        'Structs with only Sendable properties can conform.',
        'The answer is Sendable.',
      ],
      concepts: ['sendable', 'concurrency-safety'],
    },
    {
      id: 'swift-actors-6',
      title: 'MainActor Function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Annotate a single function to run on the main actor.',
      skeleton: `class DataManager {
    var data: [String] = []

    func fetchData() async -> [String] {
        return ["A", "B", "C"]
    }

    ___ func updateUI(with items: [String]) {
        data = items
        print("UI updated with \\(items.count) items")
    }
}`,
      solution: `class DataManager {
    var data: [String] = []

    func fetchData() async -> [String] {
        return ["A", "B", "C"]
    }

    @MainActor func updateUI(with items: [String]) {
        data = items
        print("UI updated with \\(items.count) items")
    }
}`,
      hints: [
        'Only the UI update needs main thread protection.',
        'Apply @MainActor to just that function.',
        'The attribute is @MainActor.',
      ],
      concepts: ['main-actor', 'selective-isolation'],
    },
    {
      id: 'swift-actors-7',
      title: 'Write a Thread-Safe Cache Actor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write an actor that provides a thread-safe cache.',
      skeleton: `// Write an actor Cache<Key: Hashable, Value> with:
// - private var storage: [Key: Value]
// - func get(_ key: Key) -> Value?
// - func set(_ key: Key, value: Value)
// - func remove(_ key: Key)
// - var count: Int (computed)
`,
      solution: `actor Cache<Key: Hashable, Value> {
    private var storage: [Key: Value] = [:]

    func get(_ key: Key) -> Value? {
        return storage[key]
    }

    func set(_ key: Key, value: Value) {
        storage[key] = value
    }

    func remove(_ key: Key) {
        storage.removeValue(forKey: key)
    }

    var count: Int {
        storage.count
    }
}`,
      hints: [
        'Actors automatically protect their mutable state.',
        'All methods are isolated by default.',
        'External callers will need await to access.',
      ],
      concepts: ['actor', 'generic-actor', 'thread-safety'],
    },
    {
      id: 'swift-actors-8',
      title: 'Write a Rate Limiter Actor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write an actor that limits the rate of operations.',
      skeleton: `// Write an actor RateLimiter with:
// - let maxRequests: Int
// - let interval: TimeInterval (Double)
// - private var timestamps: [Date]
// - func shouldAllow() -> Bool that returns true if under limit
//   (removes timestamps older than interval, checks count < maxRequests, adds new timestamp)
`,
      solution: `actor RateLimiter {
    let maxRequests: Int
    let interval: TimeInterval
    private var timestamps: [Date] = []

    init(maxRequests: Int, interval: TimeInterval) {
        self.maxRequests = maxRequests
        self.interval = interval
    }

    func shouldAllow() -> Bool {
        let now = Date()
        let cutoff = now.addingTimeInterval(-interval)
        timestamps = timestamps.filter { $0 > cutoff }
        guard timestamps.count < maxRequests else { return false }
        timestamps.append(now)
        return true
    }
}`,
      hints: [
        'Filter out timestamps older than the interval.',
        'Check if the remaining count is below the limit.',
        'Add the current timestamp if allowed.',
      ],
      concepts: ['actor', 'rate-limiting', 'time-based-logic'],
    },
    {
      id: 'swift-actors-9',
      title: 'Write an Event Bus Actor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write an actor that manages event subscriptions and dispatching.',
      skeleton: `// Write an actor EventBus with:
// - typealias Handler = @Sendable (String) -> Void
// - private var handlers: [String: [Handler]]
// - func subscribe(event: String, handler: @escaping Handler)
// - func emit(event: String, data: String) that calls all handlers for that event
`,
      solution: `actor EventBus {
    typealias Handler = @Sendable (String) -> Void
    private var handlers: [String: [Handler]] = [:]

    func subscribe(event: String, handler: @escaping Handler) {
        handlers[event, default: []].append(handler)
    }

    func emit(event: String, data: String) {
        guard let eventHandlers = handlers[event] else { return }
        for handler in eventHandlers {
            handler(data)
        }
    }
}`,
      hints: [
        'Handlers must be @Sendable for actor safety.',
        'Use dictionary with default value for subscriptions.',
        'Emit iterates through handlers and calls each one.',
      ],
      concepts: ['actor', 'event-bus', 'sendable-closure'],
    },
    {
      id: 'swift-actors-10',
      title: 'Write a Task Coordinator Actor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write an actor that coordinates multiple async tasks.',
      skeleton: `// Write an actor TaskCoordinator with:
// - private var activeTasks: Int = 0
// - let maxConcurrent: Int
// - func acquire() async -> Bool (waits until slot available, increments, returns true)
// - func release() (decrements activeTasks)
// - var available: Int (computed: maxConcurrent - activeTasks)
`,
      solution: `actor TaskCoordinator {
    private var activeTasks: Int = 0
    let maxConcurrent: Int

    init(maxConcurrent: Int) {
        self.maxConcurrent = maxConcurrent
    }

    func acquire() -> Bool {
        guard activeTasks < maxConcurrent else { return false }
        activeTasks += 1
        return true
    }

    func release() {
        if activeTasks > 0 {
            activeTasks -= 1
        }
    }

    var available: Int {
        maxConcurrent - activeTasks
    }
}`,
      hints: [
        'Check if activeTasks is below the limit.',
        'Increment on acquire, decrement on release.',
        'available is a computed property.',
      ],
      concepts: ['actor', 'semaphore-pattern', 'concurrency-control'],
    },
    {
      id: 'swift-actors-11',
      title: 'Write a Sendable Class',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a class that conforms to Sendable safely.',
      skeleton: `// Write a final class ImmutableConfig: Sendable with:
// - let apiKey: String
// - let baseURL: String
// - let timeout: Double
// - init(apiKey:baseURL:timeout:)
// Explain why it must be final and use let properties
`,
      solution: `final class ImmutableConfig: Sendable {
    let apiKey: String
    let baseURL: String
    let timeout: Double

    init(apiKey: String, baseURL: String, timeout: Double) {
        self.apiKey = apiKey
        self.baseURL = baseURL
        self.timeout = timeout
    }
}`,
      hints: [
        'Classes must be final to conform to Sendable.',
        'All stored properties must be immutable (let).',
        'This ensures no mutation after initialization.',
      ],
      concepts: ['sendable', 'final-class', 'immutability'],
    },
    {
      id: 'swift-actors-12',
      title: 'Write an Actor Extension',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write an extension on an actor that adds computed functionality.',
      skeleton: `actor Statistics {
    private var values: [Double] = []

    func add(_ value: Double) {
        values.append(value)
    }
}

// Write an extension on Statistics with:
// - var average: Double (returns mean, or 0 if empty)
// - var max: Double? (returns maximum value)
// - func reset() (clears all values)
`,
      solution: `extension Statistics {
    var average: Double {
        guard !values.isEmpty else { return 0 }
        return values.reduce(0, +) / Double(values.count)
    }

    var max: Double? {
        return values.max()
    }

    func reset() {
        values = []
    }
}`,
      hints: [
        'Extensions on actors can access private state.',
        'Computed properties in actors are isolated by default.',
        'reset() can modify values because it is isolated.',
      ],
      concepts: ['actor-extension', 'computed-properties'],
    },
    {
      id: 'swift-actors-13',
      title: 'Fix Missing Await on Actor',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code that accesses actor state without await.',
      skeleton: `actor Store {
    var items: [String] = []

    func add(_ item: String) {
        items.append(item)
    }
}

let store = Store()
Task {
    store.add("Hello")
    print(store.items)
}`,
      solution: `actor Store {
    var items: [String] = []

    func add(_ item: String) {
        items.append(item)
    }
}

let store = Store()
Task {
    await store.add("Hello")
    print(await store.items)
}`,
      hints: [
        'Actor methods and properties require await from outside.',
        'Add await before store.add and store.items.',
        'This ensures safe cross-actor access.',
      ],
      concepts: ['actor-isolation', 'await-required'],
    },
    {
      id: 'swift-actors-14',
      title: 'Fix Non-Sendable Capture',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Fix a closure that captures a non-Sendable type across actor boundaries.',
      skeleton: `class MutableData {
    var value: Int = 0
}

actor Processor {
    func process(_ data: MutableData) {
        data.value += 1
    }
}

let processor = Processor()
let data = MutableData()
Task {
    await processor.process(data)
}`,
      solution: `struct ImmutableData: Sendable {
    let value: Int
}

actor Processor {
    func process(_ data: ImmutableData) -> ImmutableData {
        return ImmutableData(value: data.value + 1)
    }
}

let processor = Processor()
let data = ImmutableData(value: 0)
Task {
    let result = await processor.process(data)
    print(result.value)
}`,
      hints: [
        'MutableData is a class with var properties, not Sendable.',
        'Convert to an immutable struct conforming to Sendable.',
        'Return new values instead of mutating.',
      ],
      concepts: ['sendable', 'value-semantics', 'data-race-safety'],
    },
    {
      id: 'swift-actors-15',
      title: 'Fix Actor Reentrancy Issue',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Fix an actor method that assumes state has not changed across an await.',
      skeleton: `actor Wallet {
    var balance: Double = 100

    func purchase(price: Double) async -> Bool {
        guard balance >= price else { return false }
        // Simulate payment processing
        try? await Task.sleep(nanoseconds: 1_000_000)
        balance -= price  // Bug: balance may have changed!
        return true
    }
}`,
      solution: `actor Wallet {
    var balance: Double = 100

    func purchase(price: Double) async -> Bool {
        guard balance >= price else { return false }
        // Deduct immediately before suspending
        balance -= price
        // Simulate payment processing
        try? await Task.sleep(nanoseconds: 1_000_000)
        return true
    }
}`,
      hints: [
        'After an await, another task may have modified balance.',
        'This is the actor reentrancy problem.',
        'Deduct the balance before the suspension point.',
      ],
      concepts: ['actor-reentrancy', 'suspension-point', 'state-consistency'],
    },
    {
      id: 'swift-actors-16',
      title: 'Predict Actor Access Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the output of sequential actor operations.',
      skeleton: `actor Counter {
    var value: Int = 0
    func increment() { value += 1 }
    func get() -> Int { return value }
}

let c = Counter()

// Running sequentially:
Task {
    await c.increment()
    await c.increment()
    await c.increment()
    print(await c.get())
}`,
      solution: `3`,
      hints: [
        'Each increment is awaited sequentially.',
        'No concurrent access issues.',
        'After 3 increments, value is 3.',
      ],
      concepts: ['actor-sequential-access'],
    },
    {
      id: 'swift-actors-17',
      title: 'Predict Nonisolated Access',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict which accesses require await and which do not.',
      skeleton: `actor Config {
    let name: String = "App"
    var version: Int = 1

    nonisolated func getName() -> String { name }
    func getVersion() -> Int { version }
}

let config = Config()
// Which requires await?
// A: config.getName()
// B: config.getVersion()
// Print "A", "B", or "both"`,
      solution: `B`,
      hints: [
        'nonisolated methods can be called without await.',
        'getName() is nonisolated so it does not need await.',
        'getVersion() accesses mutable state, needs await.',
      ],
      concepts: ['nonisolated', 'actor-isolation'],
    },
    {
      id: 'swift-actors-18',
      title: 'Predict Sendable Conformance',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict which types can conform to Sendable.',
      skeleton: `// Which of these can be Sendable?
struct A { let x: Int }           // 1
class B { var y: String = "" }    // 2
struct C { var z: [Int] }         // 3
final class D { let w: Bool }    // 4

// Print the valid numbers separated by commas`,
      solution: `1,3,4`,
      hints: [
        'Structs with Sendable properties are Sendable.',
        'Non-final classes or classes with var cannot be Sendable.',
        'Final classes with only let properties can be Sendable.',
      ],
      concepts: ['sendable', 'type-safety'],
    },
    {
      id: 'swift-actors-19',
      title: 'Refactor Class to Actor',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor a class with manual locking to an actor.',
      skeleton: `import Foundation

class ThreadSafeArray {
    private var array: [Int] = []
    private let lock = NSLock()

    func append(_ value: Int) {
        lock.lock()
        array.append(value)
        lock.unlock()
    }

    func getAll() -> [Int] {
        lock.lock()
        defer { lock.unlock() }
        return array
    }

    var count: Int {
        lock.lock()
        defer { lock.unlock() }
        return array.count
    }
}`,
      solution: `actor ThreadSafeArray {
    private var array: [Int] = []

    func append(_ value: Int) {
        array.append(value)
    }

    func getAll() -> [Int] {
        return array
    }

    var count: Int {
        array.count
    }
}`,
      hints: [
        'Actors provide built-in thread safety.',
        'Remove the NSLock and all lock/unlock calls.',
        'Change class to actor.',
      ],
      concepts: ['actor', 'lock-elimination', 'refactoring'],
    },
    {
      id: 'swift-actors-20',
      title: 'Refactor Global State to Actor',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor global mutable state into a proper actor.',
      skeleton: `var globalUsers: [String] = []
var globalCount: Int = 0

func addUser(_ name: String) {
    globalUsers.append(name)
    globalCount += 1
}

func removeUser(_ name: String) {
    if let index = globalUsers.firstIndex(of: name) {
        globalUsers.remove(at: index)
        globalCount -= 1
    }
}

func getAllUsers() -> [String] {
    return globalUsers
}`,
      solution: `actor UserStore {
    private var users: [String] = []

    func addUser(_ name: String) {
        users.append(name)
    }

    func removeUser(_ name: String) {
        if let index = users.firstIndex(of: name) {
            users.remove(at: index)
        }
    }

    func getAllUsers() -> [String] {
        return users
    }

    var count: Int {
        users.count
    }
}`,
      hints: [
        'Encapsulate global state in an actor.',
        'globalCount is redundant; use users.count.',
        'All methods become actor-isolated.',
      ],
      concepts: ['actor', 'encapsulation', 'global-state-elimination'],
    },
  ],
};
