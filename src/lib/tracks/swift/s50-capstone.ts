import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-capstone',
  title: '50. Swift Capstone',
  explanation: `## Swift Capstone

This section brings together all major Swift concepts into a mini project: a task management system. You will use protocols, generics, error handling, async/await, actors, Codable, design patterns, testing, and property wrappers.

### Project Overview

\`\`\`swift
// Models
struct Task: Codable, Identifiable {
    let id: UUID
    var title: String
    var isCompleted: Bool
    var priority: Priority

    enum Priority: Int, Codable, Comparable {
        case low = 0, medium = 1, high = 2
        static func < (lhs: Priority, rhs: Priority) -> Bool {
            lhs.rawValue < rhs.rawValue
        }
    }
}
\`\`\`

### Architecture

\`\`\`swift
// Protocol-driven service layer
protocol TaskRepository {
    func fetchAll() async throws -> [Task]
    func save(_ task: Task) async throws
    func delete(id: UUID) async throws
}

// Actor for thread-safe state
actor TaskStore {
    private var tasks: [Task] = []

    func add(_ task: Task) { tasks.append(task) }
    func getAll() -> [Task] { tasks }
}
\`\`\`

### Key Concepts Used

- **Protocols & Generics**: Service abstractions
- **Error Handling**: Custom error types with recovery
- **Async/Await**: Asynchronous data operations
- **Actors**: Thread-safe shared state
- **Codable**: JSON serialization
- **Property Wrappers**: Input validation
- **Design Patterns**: Repository, Observer, Strategy
- **Testing**: Mock services and assertions
`,
  exercises: [
    {
      id: 'swift-capstone-1',
      title: 'Define the Task Model',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Define a Codable and Identifiable task model.',
      skeleton: `struct TodoItem: ___, Identifiable {
    let id: UUID
    var title: String
    var isCompleted: Bool
    var dueDate: Date?

    enum CodingKeys: String, CodingKey {
        case id, title, isCompleted, dueDate
    }
}`,
      solution: `struct TodoItem: Codable, Identifiable {
    let id: UUID
    var title: String
    var isCompleted: Bool
    var dueDate: Date?

    enum CodingKeys: String, CodingKey {
        case id, title, isCompleted, dueDate
    }
}`,
      hints: ['The model needs to be encodable and decodable for JSON.', 'Codable is a typealias for Encodable & Decodable.', 'The answer is Codable.'],
      concepts: ['codable', 'identifiable', 'model'],
    },
    {
      id: 'swift-capstone-2',
      title: 'Define a Custom Error Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Create a custom error enum for the task system.',
      skeleton: `enum TaskError: ___ {
    case notFound(id: UUID)
    case invalidTitle
    case saveFailed(underlying: Error)
    case networkUnavailable
}`,
      solution: `enum TaskError: Error {
    case notFound(id: UUID)
    case invalidTitle
    case saveFailed(underlying: Error)
    case networkUnavailable
}`,
      hints: ['Custom errors conform to the Error protocol.', 'Each case represents a different failure mode.', 'The answer is Error.'],
      concepts: ['custom-error', 'error-protocol'],
    },
    {
      id: 'swift-capstone-3',
      title: 'Define a Repository Protocol',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Define an async repository protocol for CRUD operations.',
      skeleton: `protocol TaskRepository {
    func fetchAll() ___ throws -> [TodoItem]
    func save(_ item: TodoItem) async throws
    func delete(id: UUID) async throws
    func find(id: UUID) async throws -> TodoItem
}`,
      solution: `protocol TaskRepository {
    func fetchAll() async throws -> [TodoItem]
    func save(_ item: TodoItem) async throws
    func delete(id: UUID) async throws
    func find(id: UUID) async throws -> TodoItem
}`,
      hints: ['Repository methods are asynchronous.', 'The async keyword marks a function as asynchronous.', 'The answer is async.'],
      concepts: ['async-protocol', 'repository-pattern'],
    },
    {
      id: 'swift-capstone-4',
      title: 'Create a Thread-Safe Actor Store',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use an actor for thread-safe task storage.',
      skeleton: `___ TaskStore {
    private var items: [UUID: TodoItem] = [:]

    func add(_ item: TodoItem) {
        items[item.id] = item
    }

    func remove(id: UUID) {
        items.removeValue(forKey: id)
    }

    func getAll() -> [TodoItem] {
        Array(items.values)
    }

    func find(id: UUID) -> TodoItem? {
        items[id]
    }
}`,
      solution: `actor TaskStore {
    private var items: [UUID: TodoItem] = [:]

    func add(_ item: TodoItem) {
        items[item.id] = item
    }

    func remove(id: UUID) {
        items.removeValue(forKey: id)
    }

    func getAll() -> [TodoItem] {
        Array(items.values)
    }

    func find(id: UUID) -> TodoItem? {
        items[id]
    }
}`,
      hints: ['Actors provide built-in data race protection.', 'All access to actor properties is serialized.', 'The answer is actor.'],
      concepts: ['actor', 'thread-safety', 'concurrency'],
    },
    {
      id: 'swift-capstone-5',
      title: 'Property Wrapper for Validation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Create a property wrapper that validates a non-empty trimmed string.',
      skeleton: `@___
struct NonEmpty {
    var wrappedValue: String {
        didSet {
            wrappedValue = wrappedValue.trimmingCharacters(in: .whitespacesAndNewlines)
            if wrappedValue.isEmpty {
                wrappedValue = oldValue
            }
        }
    }

    init(wrappedValue: String) {
        self.wrappedValue = wrappedValue.trimmingCharacters(in: .whitespacesAndNewlines)
    }
}`,
      solution: `@propertyWrapper
struct NonEmpty {
    var wrappedValue: String {
        didSet {
            wrappedValue = wrappedValue.trimmingCharacters(in: .whitespacesAndNewlines)
            if wrappedValue.isEmpty {
                wrappedValue = oldValue
            }
        }
    }

    init(wrappedValue: String) {
        self.wrappedValue = wrappedValue.trimmingCharacters(in: .whitespacesAndNewlines)
    }
}`,
      hints: ['Property wrappers are defined with a specific attribute.', 'The attribute is @propertyWrapper.', 'The answer is propertyWrapper.'],
      concepts: ['property-wrapper', 'validation'],
    },
    {
      id: 'swift-capstone-6',
      title: 'Encode a Model to JSON',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Encode a Codable struct to JSON data.',
      skeleton: `let item = TodoItem(
    id: UUID(),
    title: "Learn Swift",
    isCompleted: false,
    dueDate: nil
)

let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted
let data = try encoder.___(item)
print(String(data: data, encoding: .utf8)!)`,
      solution: `let item = TodoItem(
    id: UUID(),
    title: "Learn Swift",
    isCompleted: false,
    dueDate: nil
)

let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted
let data = try encoder.encode(item)
print(String(data: data, encoding: .utf8)!)`,
      hints: ['JSONEncoder converts Codable values to Data.', 'The method name matches the protocol name.', 'The answer is encode.'],
      concepts: ['json-encoding', 'codable'],
    },
    {
      id: 'swift-capstone-7',
      title: 'Write an In-Memory Repository',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Implement a TaskRepository backed by an actor store.',
      skeleton: `// Given TaskStore actor and TaskRepository protocol from above.
// Write InMemoryRepository: TaskRepository that:
// - Has a private let store = TaskStore()
// - fetchAll() returns all items from store
// - save() adds item to store
// - delete() removes from store
// - find() gets from store, throws TaskError.notFound if nil
`,
      solution: `class InMemoryRepository: TaskRepository {
    private let store = TaskStore()

    func fetchAll() async throws -> [TodoItem] {
        await store.getAll()
    }

    func save(_ item: TodoItem) async throws {
        await store.add(item)
    }

    func delete(id: UUID) async throws {
        guard await store.find(id: id) != nil else {
            throw TaskError.notFound(id: id)
        }
        await store.remove(id: id)
    }

    func find(id: UUID) async throws -> TodoItem {
        guard let item = await store.find(id: id) else {
            throw TaskError.notFound(id: id)
        }
        return item
    }
}`,
      hints: ['Actor methods must be called with await.', 'Use guard let to unwrap optional results and throw if nil.', 'The class bridges the protocol to the actor.'],
      concepts: ['repository-implementation', 'actor-integration', 'guard-let'],
    },
    {
      id: 'swift-capstone-8',
      title: 'Write a Generic Sort Strategy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a generic sort strategy for the task list.',
      skeleton: `// Write:
// - protocol SortStrategy with associatedtype Item
//   and func sort(_ items: [Item]) -> [Item]
// - struct PrioritySortStrategy: SortStrategy for TodoItem
//   (sorts by priority descending, then title ascending)
// - struct DateSortStrategy: SortStrategy for TodoItem
//   (sorts by dueDate, nil dates last)
`,
      solution: `protocol SortStrategy {
    associatedtype Item
    func sort(_ items: [Item]) -> [Item]
}

struct PrioritySortStrategy: SortStrategy {
    func sort(_ items: [TodoItem]) -> [TodoItem] {
        items.sorted {
            if $0.priority != $1.priority {
                return $0.priority > $1.priority
            }
            return $0.title < $1.title
        }
    }
}

struct DateSortStrategy: SortStrategy {
    func sort(_ items: [TodoItem]) -> [TodoItem] {
        items.sorted {
            switch ($0.dueDate, $1.dueDate) {
            case (let a?, let b?): return a < b
            case (nil, _): return false
            case (_, nil): return true
            }
        }
    }
}`,
      hints: ['PrioritySortStrategy compares priority first, then title as tiebreaker.', 'DateSortStrategy handles nil dates by placing them last.', 'Use tuple pattern matching for optional date comparison.'],
      concepts: ['strategy-pattern', 'associated-type', 'sorting'],
    },
    {
      id: 'swift-capstone-9',
      title: 'Write a ViewModel with Async Loading',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a ViewModel that loads tasks asynchronously and handles errors.',
      skeleton: `// Write TaskListViewModel: ObservableObject with:
// - @Published var tasks: [TodoItem] = []
// - @Published var errorMessage: String?
// - @Published var isLoading: Bool = false
// - private let repository: TaskRepository
// - init(repository:)
// - @MainActor func loadTasks() async
// - @MainActor func addTask(title: String) async
// - @MainActor func toggleComplete(_ item: TodoItem) async
`,
      solution: `import Combine

class TaskListViewModel: ObservableObject {
    @Published var tasks: [TodoItem] = []
    @Published var errorMessage: String? = nil
    @Published var isLoading: Bool = false
    private let repository: any TaskRepository

    init(repository: any TaskRepository) {
        self.repository = repository
    }

    @MainActor
    func loadTasks() async {
        isLoading = true
        errorMessage = nil
        do {
            tasks = try await repository.fetchAll()
        } catch {
            errorMessage = "Failed to load: \\(error.localizedDescription)"
        }
        isLoading = false
    }

    @MainActor
    func addTask(title: String) async {
        let item = TodoItem(id: UUID(), title: title, isCompleted: false, dueDate: nil)
        do {
            try await repository.save(item)
            tasks.append(item)
        } catch {
            errorMessage = "Failed to save: \\(error.localizedDescription)"
        }
    }

    @MainActor
    func toggleComplete(_ item: TodoItem) async {
        var updated = item
        updated.isCompleted.toggle()
        do {
            try await repository.save(updated)
            if let index = tasks.firstIndex(where: { $0.id == item.id }) {
                tasks[index] = updated
            }
        } catch {
            errorMessage = "Failed to update: \\(error.localizedDescription)"
        }
    }
}`,
      hints: ['Use @MainActor to ensure UI updates happen on the main thread.', 'Wrap repository calls in do-catch for error handling.', 'Use any TaskRepository for the existential protocol type.'],
      concepts: ['mvvm', 'async-await', 'main-actor', 'error-handling'],
    },
    {
      id: 'swift-capstone-10',
      title: 'Write a Mock Repository for Testing',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a mock repository and test the ViewModel.',
      skeleton: `// Write MockTaskRepository: TaskRepository with:
// - var mockItems: [TodoItem] = []
// - var shouldThrow: Bool = false
// - fetchAll returns mockItems or throws
// - save appends to mockItems
// - delete removes from mockItems
// - find searches mockItems
// Then write a test function that verifies loadTasks works
`,
      solution: `class MockTaskRepository: TaskRepository {
    var mockItems: [TodoItem] = []
    var shouldThrow: Bool = false

    func fetchAll() async throws -> [TodoItem] {
        if shouldThrow { throw TaskError.networkUnavailable }
        return mockItems
    }

    func save(_ item: TodoItem) async throws {
        if shouldThrow { throw TaskError.saveFailed(underlying: TaskError.networkUnavailable) }
        if let index = mockItems.firstIndex(where: { $0.id == item.id }) {
            mockItems[index] = item
        } else {
            mockItems.append(item)
        }
    }

    func delete(id: UUID) async throws {
        guard let index = mockItems.firstIndex(where: { $0.id == id }) else {
            throw TaskError.notFound(id: id)
        }
        mockItems.remove(at: index)
    }

    func find(id: UUID) async throws -> TodoItem {
        guard let item = mockItems.first(where: { $0.id == id }) else {
            throw TaskError.notFound(id: id)
        }
        return item
    }
}

func testLoadTasks() async {
    let mock = MockTaskRepository()
    mock.mockItems = [
        TodoItem(id: UUID(), title: "Test 1", isCompleted: false, dueDate: nil),
        TodoItem(id: UUID(), title: "Test 2", isCompleted: true, dueDate: nil)
    ]
    let vm = TaskListViewModel(repository: mock)
    await vm.loadTasks()
    assert(vm.tasks.count == 2)
    assert(vm.errorMessage == nil)
}`,
      hints: ['The mock stores items in memory and can simulate failures.', 'save should upsert (update existing or insert new).', 'The test creates the mock, configures it, and asserts ViewModel state.'],
      concepts: ['mock', 'testing', 'dependency-injection'],
    },
    {
      id: 'swift-capstone-11',
      title: 'Write a JSON Persistence Layer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a repository that persists tasks as JSON to a file.',
      skeleton: `// Write JSONFileRepository: TaskRepository with:
// - let fileURL: URL
// - init(filename: String) sets fileURL in documents directory
// - private func loadFromDisk() throws -> [TodoItem]
// - private func saveToDisk(_ items: [TodoItem]) throws
// - Implement all TaskRepository methods using disk persistence
`,
      solution: `class JSONFileRepository: TaskRepository {
    let fileURL: URL

    init(filename: String) {
        let docs = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
        self.fileURL = docs.appendingPathComponent(filename)
    }

    private func loadFromDisk() throws -> [TodoItem] {
        guard FileManager.default.fileExists(atPath: fileURL.path) else {
            return []
        }
        let data = try Data(contentsOf: fileURL)
        return try JSONDecoder().decode([TodoItem].self, from: data)
    }

    private func saveToDisk(_ items: [TodoItem]) throws {
        let data = try JSONEncoder().encode(items)
        try data.write(to: fileURL, options: .atomic)
    }

    func fetchAll() async throws -> [TodoItem] {
        try loadFromDisk()
    }

    func save(_ item: TodoItem) async throws {
        var items = try loadFromDisk()
        if let index = items.firstIndex(where: { $0.id == item.id }) {
            items[index] = item
        } else {
            items.append(item)
        }
        try saveToDisk(items)
    }

    func delete(id: UUID) async throws {
        var items = try loadFromDisk()
        guard let index = items.firstIndex(where: { $0.id == id }) else {
            throw TaskError.notFound(id: id)
        }
        items.remove(at: index)
        try saveToDisk(items)
    }

    func find(id: UUID) async throws -> TodoItem {
        let items = try loadFromDisk()
        guard let item = items.first(where: { $0.id == id }) else {
            throw TaskError.notFound(id: id)
        }
        return item
    }
}`,
      hints: ['Use JSONEncoder/JSONDecoder for serialization.', 'Write atomically to prevent corruption.', 'Check if file exists before reading.'],
      concepts: ['file-persistence', 'json-codable', 'repository-pattern'],
    },
    {
      id: 'swift-capstone-12',
      title: 'Write an Observer Pattern Notification',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write an observer system that notifies listeners of task changes.',
      skeleton: `// Write:
// - enum TaskEvent { case added(TodoItem), removed(UUID), updated(TodoItem) }
// - class TaskEventBus with:
//   - typealias Handler = (TaskEvent) -> Void
//   - private var listeners: [UUID: Handler]
//   - func subscribe(handler:) -> UUID (returns subscription ID)
//   - func unsubscribe(id: UUID)
//   - func emit(_ event: TaskEvent)
`,
      solution: `enum TaskEvent {
    case added(TodoItem)
    case removed(UUID)
    case updated(TodoItem)
}

class TaskEventBus {
    typealias Handler = (TaskEvent) -> Void
    private var listeners: [UUID: Handler] = [:]

    func subscribe(handler: @escaping Handler) -> UUID {
        let id = UUID()
        listeners[id] = handler
        return id
    }

    func unsubscribe(id: UUID) {
        listeners.removeValue(forKey: id)
    }

    func emit(_ event: TaskEvent) {
        for handler in listeners.values {
            handler(event)
        }
    }
}

let bus = TaskEventBus()
let subId = bus.subscribe { event in
    switch event {
    case .added(let item): print("Added: \\(item.title)")
    case .removed(let id): print("Removed: \\(id)")
    case .updated(let item): print("Updated: \\(item.title)")
    }
}
bus.emit(.added(TodoItem(id: UUID(), title: "Test", isCompleted: false, dueDate: nil)))
bus.unsubscribe(id: subId)`,
      hints: ['Store handlers in a dictionary keyed by UUID for easy removal.', 'subscribe returns the UUID so the caller can unsubscribe later.', 'emit iterates all listeners and calls each handler.'],
      concepts: ['observer-pattern', 'event-bus', 'closure-storage'],
    },
    {
      id: 'swift-capstone-13',
      title: 'Fix Actor Isolation Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix code that accesses an actor property without await.',
      skeleton: `actor Counter {
    var count: Int = 0

    func increment() {
        count += 1
    }
}

func useCounter() {
    let counter = Counter()
    counter.increment()  // Bug: missing await
    print(counter.count) // Bug: missing await
}`,
      solution: `actor Counter {
    var count: Int = 0

    func increment() {
        count += 1
    }
}

func useCounter() async {
    let counter = Counter()
    await counter.increment()
    print(await counter.count)
}`,
      hints: ['Actor methods and properties must be accessed with await from outside.', 'The calling function must also be marked async.', 'Add await before each actor access.'],
      concepts: ['actor-isolation', 'await', 'async-function'],
    },
    {
      id: 'swift-capstone-14',
      title: 'Fix Codable Date Decoding',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix JSON decoding that fails on ISO 8601 dates.',
      skeleton: `struct Event: Codable {
    let name: String
    let date: Date
}

let json = """
{"name": "Launch", "date": "2026-01-15T10:30:00Z"}
""".data(using: .utf8)!

let decoder = JSONDecoder()
// Bug: default decoder can't parse ISO 8601 strings
let event = try decoder.decode(Event.self, from: json)
print(event.name)`,
      solution: `struct Event: Codable {
    let name: String
    let date: Date
}

let json = """
{"name": "Launch", "date": "2026-01-15T10:30:00Z"}
""".data(using: .utf8)!

let decoder = JSONDecoder()
decoder.dateDecodingStrategy = .iso8601
let event = try decoder.decode(Event.self, from: json)
print(event.name)`,
      hints: ['JSONDecoder defaults to decoding dates as Double timestamps.', 'Set dateDecodingStrategy to handle ISO 8601 format.', 'Add decoder.dateDecodingStrategy = .iso8601.'],
      concepts: ['date-decoding', 'json-decoder', 'iso8601'],
    },
    {
      id: 'swift-capstone-15',
      title: 'Fix Generic Constraint Error',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Fix a generic function that is missing a necessary constraint.',
      skeleton: `func findDuplicates<T>(in items: [T]) -> [T] {
    var seen = Set<T>()     // Error: T doesn't conform to Hashable
    var duplicates: [T] = []
    for item in items {
        if seen.contains(item) {
            duplicates.append(item)
        } else {
            seen.insert(item)
        }
    }
    return duplicates
}`,
      solution: `func findDuplicates<T: Hashable>(in items: [T]) -> [T] {
    var seen = Set<T>()
    var duplicates: [T] = []
    for item in items {
        if seen.contains(item) {
            duplicates.append(item)
        } else {
            seen.insert(item)
        }
    }
    return duplicates
}`,
      hints: ['Set requires its elements to be Hashable.', 'Add a Hashable constraint to the generic parameter T.', 'Change <T> to <T: Hashable>.'],
      concepts: ['generic-constraints', 'hashable', 'set'],
    },
    {
      id: 'swift-capstone-16',
      title: 'Predict Protocol Extension Dispatch',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the output when protocol extension methods are overridden.',
      skeleton: `protocol Greeter {
    func greet() -> String
}

extension Greeter {
    func greet() -> String { "Hello!" }
    func farewell() -> String { "Bye!" }
}

struct FriendlyGreeter: Greeter {
    func greet() -> String { "Hey there!" }
    func farewell() -> String { "See ya!" }
}

let a: Greeter = FriendlyGreeter()
let b = FriendlyGreeter()
print(a.greet())
print(a.farewell())
print(b.greet())
print(b.farewell())`,
      solution: `Hey there!
Bye!
Hey there!
See ya!`,
      hints: ['greet() is a protocol requirement, so dynamic dispatch is used.', 'farewell() is NOT a protocol requirement, only an extension method.', 'When typed as Greeter, farewell uses static dispatch to the extension.'],
      concepts: ['protocol-dispatch', 'static-vs-dynamic', 'extension-method'],
    },
    {
      id: 'swift-capstone-17',
      title: 'Predict Async Actor Ordering',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Predict the final state after concurrent actor operations.',
      skeleton: `actor Bank {
    var balance: Int = 100

    func deposit(_ amount: Int) { balance += amount }
    func withdraw(_ amount: Int) -> Bool {
        guard balance >= amount else { return false }
        balance -= amount
        return true
    }
}

// Sequential calls:
let bank = Bank()
await bank.deposit(50)       // 150
let ok1 = await bank.withdraw(80)  // 70, true
let ok2 = await bank.withdraw(80)  // can't, false
await bank.deposit(10)       // 80
print(await bank.balance)
print(ok1)
print(ok2)`,
      solution: `80
true
false`,
      hints: ['Actors serialize access, so operations execute in order.', '100 + 50 = 150, - 80 = 70, - 80 fails (70 < 80), + 10 = 80.', 'First withdraw succeeds, second fails.'],
      concepts: ['actor-serialization', 'sequential-access'],
    },
    {
      id: 'swift-capstone-18',
      title: 'Predict Codable Round-Trip',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the result of encoding and decoding a value.',
      skeleton: `struct Point: Codable {
    var x: Int
    var y: Int
}

let original = Point(x: 10, y: 20)
let data = try JSONEncoder().encode(original)
let decoded = try JSONDecoder().decode(Point.self, from: data)
print(decoded.x + decoded.y)
print(original.x == decoded.x && original.y == decoded.y)`,
      solution: `30
true`,
      hints: ['Encoding then decoding produces an identical value.', 'x=10 + y=20 = 30.', 'Round-trip preserves all values.'],
      concepts: ['codable-round-trip', 'encoding-decoding'],
    },
    {
      id: 'swift-capstone-19',
      title: 'Refactor Massive Function to Protocols',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Refactor a god function into protocol-based components.',
      skeleton: `func processTask(_ task: TodoItem, action: String) -> String {
    var result = ""

    // Validation
    if task.title.isEmpty {
        return "Error: empty title"
    }
    if task.title.count > 100 {
        return "Error: title too long"
    }

    // Formatting
    if action == "html" {
        result = "<li>\\(task.title)</li>"
    } else if action == "markdown" {
        result = "- [\\(task.isCompleted ? "x" : " ")] \\(task.title)"
    } else {
        result = task.title
    }

    // Logging
    print("[LOG] Processed: \\(task.title) as \\(action)")

    return result
}`,
      solution: `protocol TaskValidator {
    func validate(_ task: TodoItem) -> String?
}

struct DefaultValidator: TaskValidator {
    func validate(_ task: TodoItem) -> String? {
        if task.title.isEmpty { return "Error: empty title" }
        if task.title.count > 100 { return "Error: title too long" }
        return nil
    }
}

protocol TaskFormatter {
    func format(_ task: TodoItem) -> String
}

struct HTMLFormatter: TaskFormatter {
    func format(_ task: TodoItem) -> String {
        "<li>\\(task.title)</li>"
    }
}

struct MarkdownFormatter: TaskFormatter {
    func format(_ task: TodoItem) -> String {
        "- [\\(task.isCompleted ? "x" : " ")] \\(task.title)"
    }
}

struct PlainFormatter: TaskFormatter {
    func format(_ task: TodoItem) -> String {
        task.title
    }
}

protocol TaskLogger {
    func log(_ message: String)
}

struct ConsoleLogger: TaskLogger {
    func log(_ message: String) { print("[LOG] \\(message)") }
}

func processTask(
    _ task: TodoItem,
    validator: any TaskValidator = DefaultValidator(),
    formatter: any TaskFormatter,
    logger: any TaskLogger = ConsoleLogger()
) -> String {
    if let error = validator.validate(task) {
        return error
    }
    let result = formatter.format(task)
    logger.log("Processed: \\(task.title)")
    return result
}`,
      hints: ['Extract validation, formatting, and logging into separate protocols.', 'Each concern gets its own protocol and concrete implementations.', 'Inject dependencies via function parameters with defaults.'],
      concepts: ['single-responsibility', 'protocol-extraction', 'dependency-injection'],
    },
    {
      id: 'swift-capstone-20',
      title: 'Refactor to Full Async Pipeline',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Refactor callback-based code into a clean async/await pipeline.',
      skeleton: `class TaskManager {
    let repo: any TaskRepository

    init(repo: any TaskRepository) { self.repo = repo }

    func loadAndFilter(
        priority: TodoItem.Priority,
        completion: @escaping (Result<[TodoItem], Error>) -> Void
    ) {
        Task {
            do {
                let all = try await repo.fetchAll()
                let filtered = all.filter { $0.priority == priority }
                let sorted = filtered.sorted { $0.title < $1.title }
                completion(.success(sorted))
            } catch {
                completion(.failure(error))
            }
        }
    }

    func saveMultiple(
        _ items: [TodoItem],
        completion: @escaping (Result<Int, Error>) -> Void
    ) {
        Task {
            var saved = 0
            for item in items {
                do {
                    try await repo.save(item)
                    saved += 1
                } catch {
                    completion(.failure(error))
                    return
                }
            }
            completion(.success(saved))
        }
    }
}`,
      solution: `class TaskManager {
    let repo: any TaskRepository

    init(repo: any TaskRepository) { self.repo = repo }

    func loadAndFilter(priority: TodoItem.Priority) async throws -> [TodoItem] {
        let all = try await repo.fetchAll()
        return all
            .filter { $0.priority == priority }
            .sorted { $0.title < $1.title }
    }

    func saveMultiple(_ items: [TodoItem]) async throws -> Int {
        var saved = 0
        for item in items {
            try await repo.save(item)
            saved += 1
        }
        return saved
    }
}`,
      hints: ['Replace completion handlers with async throws return values.', 'Remove the inner Task blocks since the methods are now async.', 'Callers use try await instead of handling Result in a closure.'],
      concepts: ['async-await', 'callback-elimination', 'clean-api'],
    },
  ],
};
