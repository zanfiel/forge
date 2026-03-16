import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-singleton',
  title: '42. Singleton',
  explanation: `## Singleton Pattern in Swift

The Singleton pattern ensures a class has only one instance and provides a global point of access.

### Swift Singleton

\`\`\`swift
class AppConfig {
    static let shared = AppConfig()
    private init() {}

    var apiKey: String = ""
    var debugMode: Bool = false
}

// Usage
AppConfig.shared.apiKey = "abc123"
\`\`\`

### Key Elements

- **static let shared**: The single instance, lazily created and thread-safe
- **private init()**: Prevents external instantiation
- Swift's \`static let\` is guaranteed thread-safe by the language

### When to Use

- Configuration/settings managers
- Logging services
- Network managers
- Caches

### When NOT to Use

- When you need testability (use dependency injection instead)
- When state should be scoped to a specific lifetime
- When multiple configurations are needed
`,
  exercises: [
    {
      id: 'swift-singleton-1',
      title: 'Basic Singleton',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Create the shared instance for a singleton.',
      skeleton: `class Logger {
    ___ ___ shared = Logger()
    private init() {}

    func log(_ message: String) {
        print("[LOG] \\(message)")
    }
}`,
      solution: `class Logger {
    static let shared = Logger()
    private init() {}

    func log(_ message: String) {
        print("[LOG] \\(message)")
    }
}`,
      hints: ['The shared instance is a static constant.', 'Use static let for thread-safe lazy initialization.', 'The answer is static let.'],
      concepts: ['singleton', 'static-let'],
    },
    {
      id: 'swift-singleton-2',
      title: 'Private Initializer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Prevent external instantiation of a singleton.',
      skeleton: `class Database {
    static let shared = Database()
    ___ init() {
        // setup
    }
}`,
      solution: `class Database {
    static let shared = Database()
    private init() {
        // setup
    }
}`,
      hints: ['No one should create instances except the class itself.', 'Use the most restrictive access control.', 'The answer is private.'],
      concepts: ['private-init', 'access-control'],
    },
    {
      id: 'swift-singleton-3',
      title: 'Singleton with Configuration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Create a singleton with configurable properties.',
      skeleton: `class Theme {
    static let ___ = Theme()
    private init() {}

    var primaryColor: String = "#007AFF"
    var fontSize: Double = 16.0
    var isDarkMode: Bool = false
}

Theme.___.isDarkMode = true`,
      solution: `class Theme {
    static let shared = Theme()
    private init() {}

    var primaryColor: String = "#007AFF"
    var fontSize: Double = 16.0
    var isDarkMode: Bool = false
}

Theme.shared.isDarkMode = true`,
      hints: ['The conventional name is shared.', 'Access it via Theme.shared.', 'The answer is shared for both blanks.'],
      concepts: ['singleton', 'configuration'],
    },
    {
      id: 'swift-singleton-4',
      title: 'Singleton Thread Safety',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add thread-safe property access to a singleton.',
      skeleton: `import Foundation

class Counter {
    static let shared = Counter()
    private init() {}

    private var _count = 0
    private let queue = DispatchQueue(label: "counter.queue")

    var count: Int {
        queue.___ { _count }
    }

    func increment() {
        queue.___ { _count += 1 }
    }
}`,
      solution: `import Foundation

class Counter {
    static let shared = Counter()
    private init() {}

    private var _count = 0
    private let queue = DispatchQueue(label: "counter.queue")

    var count: Int {
        queue.sync { _count }
    }

    func increment() {
        queue.sync { _count += 1 }
    }
}`,
      hints: ['Use sync for thread-safe access.', 'Both read and write need synchronization.', 'The answer is sync for both blanks.'],
      concepts: ['thread-safety', 'dispatch-queue'],
    },
    {
      id: 'swift-singleton-5',
      title: 'Singleton Protocol',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Make a singleton conform to a protocol for testability.',
      skeleton: `protocol NetworkServiceProtocol {
    func fetch(url: String) async throws -> Data
}

class NetworkService: ___ {
    static let shared = NetworkService()
    private init() {}

    func fetch(url: String) async throws -> Data {
        let (data, _) = try await URLSession.shared.data(from: URL(string: url)!)
        return data
    }
}`,
      solution: `protocol NetworkServiceProtocol {
    func fetch(url: String) async throws -> Data
}

class NetworkService: NetworkServiceProtocol {
    static let shared = NetworkService()
    private init() {}

    func fetch(url: String) async throws -> Data {
        let (data, _) = try await URLSession.shared.data(from: URL(string: url)!)
        return data
    }
}`,
      hints: ['Conforming to a protocol enables mocking.', 'List the protocol after the colon.', 'The answer is NetworkServiceProtocol.'],
      concepts: ['protocol-conformance', 'testable-singleton'],
    },
    {
      id: 'swift-singleton-6',
      title: 'Singleton Reset for Testing',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a reset method for testing purposes.',
      skeleton: `class Cache {
    static let shared = Cache()
    private init() {}

    private var store: [String: Any] = [:]

    func set(_ key: String, value: Any) { store[key] = value }
    func get(_ key: String) -> Any? { store[key] }

    #if ___
    func reset() { store.removeAll() }
    #endif
}`,
      solution: `class Cache {
    static let shared = Cache()
    private init() {}

    private var store: [String: Any] = [:]

    func set(_ key: String, value: Any) { store[key] = value }
    func get(_ key: String) -> Any? { store[key] }

    #if DEBUG
    func reset() { store.removeAll() }
    #endif
}`,
      hints: ['Reset should only be available in test/debug builds.', 'Use conditional compilation.', 'The answer is DEBUG.'],
      concepts: ['testability', 'conditional-compilation'],
    },
    {
      id: 'swift-singleton-7',
      title: 'Write a Settings Singleton',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a complete settings singleton with UserDefaults backing.',
      skeleton: `// Write a class AppSettings singleton with:
// - static let shared, private init
// - var username: String (backed by UserDefaults)
// - var notificationsEnabled: Bool (backed by UserDefaults)
// - func reset() to clear all settings
`,
      solution: `class AppSettings {
    static let shared = AppSettings()
    private init() {}

    private let defaults = UserDefaults.standard

    var username: String {
        get { defaults.string(forKey: "username") ?? "" }
        set { defaults.set(newValue, forKey: "username") }
    }

    var notificationsEnabled: Bool {
        get { defaults.bool(forKey: "notificationsEnabled") }
        set { defaults.set(newValue, forKey: "notificationsEnabled") }
    }

    func reset() {
        defaults.removeObject(forKey: "username")
        defaults.removeObject(forKey: "notificationsEnabled")
    }
}`,
      hints: ['Use computed properties backed by UserDefaults.', 'UserDefaults persists between app launches.', 'reset removes each key individually.'],
      concepts: ['singleton', 'UserDefaults', 'persistence'],
    },
    {
      id: 'swift-singleton-8',
      title: 'Write an Analytics Singleton',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a singleton for tracking analytics events.',
      skeleton: `// Write an AnalyticsService singleton with:
// - static let shared, private init
// - private var events: [(name: String, timestamp: Date)]
// - func track(_ event: String)
// - func getEvents() -> [(name: String, timestamp: Date)]
// - var eventCount: Int
`,
      solution: `class AnalyticsService {
    static let shared = AnalyticsService()
    private init() {}

    private var events: [(name: String, timestamp: Date)] = []

    func track(_ event: String) {
        events.append((name: event, timestamp: Date()))
    }

    func getEvents() -> [(name: String, timestamp: Date)] {
        return events
    }

    var eventCount: Int {
        return events.count
    }
}`,
      hints: ['Track events with name and timestamp.', 'Events are stored in an array of tuples.', 'eventCount is a computed property.'],
      concepts: ['singleton', 'analytics', 'event-tracking'],
    },
    {
      id: 'swift-singleton-9',
      title: 'Write a Testable Singleton Alternative',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a singleton with dependency injection for testability.',
      skeleton: `// Write a protocol-based singleton:
// - protocol StorageProtocol with save/load methods
// - class Storage: StorageProtocol (singleton)
// - class DataManager that accepts StorageProtocol in init
// This allows testing DataManager with a mock Storage
`,
      solution: `protocol StorageProtocol {
    func save(_ key: String, data: Data)
    func load(_ key: String) -> Data?
}

class Storage: StorageProtocol {
    static let shared = Storage()
    private init() {}

    private var store: [String: Data] = [:]

    func save(_ key: String, data: Data) {
        store[key] = data
    }

    func load(_ key: String) -> Data? {
        return store[key]
    }
}

class DataManager {
    let storage: StorageProtocol

    init(storage: StorageProtocol = Storage.shared) {
        self.storage = storage
    }

    func saveUser(name: String) {
        storage.save("user", data: name.data(using: .utf8)!)
    }
}`,
      hints: ['Default parameter uses the singleton for production.', 'Tests can pass a mock instead.', 'This combines singleton convenience with testability.'],
      concepts: ['dependency-injection', 'protocol', 'testable-design'],
    },
    {
      id: 'swift-singleton-10',
      title: 'Write a Thread-Safe Singleton Actor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a singleton using Swift actors for thread safety.',
      skeleton: `// Write an actor-based singleton for a connection pool:
// - actor ConnectionPool with a shared static property
// - private var connections: [String]
// - func acquire() -> String?
// - func release(_ connection: String)
// - var available: Int
`,
      solution: `actor ConnectionPool {
    static let shared = ConnectionPool()

    private var connections: [String] = ["conn1", "conn2", "conn3"]

    func acquire() -> String? {
        guard !connections.isEmpty else { return nil }
        return connections.removeFirst()
    }

    func release(_ connection: String) {
        connections.append(connection)
    }

    var available: Int {
        connections.count
    }
}`,
      hints: ['Actors are inherently thread-safe.', 'No need for manual locking.', 'Access requires await from outside.'],
      concepts: ['actor-singleton', 'thread-safety'],
    },
    {
      id: 'swift-singleton-11',
      title: 'Write a Notification Manager Singleton',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a singleton notification manager.',
      skeleton: `// Write a NotificationManager singleton with:
// - typealias Handler = (Any?) -> Void
// - func subscribe(_ name: String, handler: @escaping Handler)
// - func post(_ name: String, data: Any?)
// - func unsubscribeAll(_ name: String)
`,
      solution: `class NotificationManager {
    static let shared = NotificationManager()
    private init() {}

    typealias Handler = (Any?) -> Void
    private var subscribers: [String: [Handler]] = [:]

    func subscribe(_ name: String, handler: @escaping Handler) {
        subscribers[name, default: []].append(handler)
    }

    func post(_ name: String, data: Any? = nil) {
        subscribers[name]?.forEach { $0(data) }
    }

    func unsubscribeAll(_ name: String) {
        subscribers.removeValue(forKey: name)
    }
}`,
      hints: ['Store handlers in a dictionary keyed by event name.', 'post calls all handlers for that event.', 'unsubscribeAll removes all handlers for an event.'],
      concepts: ['singleton', 'observer-pattern', 'event-handling'],
    },
    {
      id: 'swift-singleton-12',
      title: 'Write a Feature Toggle Singleton',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a singleton for managing feature toggles.',
      skeleton: `// Write a FeatureToggle singleton with:
// - private var features: [String: Bool]
// - func enable(_ feature: String)
// - func disable(_ feature: String)
// - func isEnabled(_ feature: String) -> Bool
// - subscript access by feature name
`,
      solution: `class FeatureToggle {
    static let shared = FeatureToggle()
    private init() {}

    private var features: [String: Bool] = [:]

    func enable(_ feature: String) {
        features[feature] = true
    }

    func disable(_ feature: String) {
        features[feature] = false
    }

    func isEnabled(_ feature: String) -> Bool {
        return features[feature] ?? false
    }

    subscript(feature: String) -> Bool {
        get { isEnabled(feature) }
        set { features[feature] = newValue }
    }
}`,
      hints: ['Features default to disabled (false).', 'Subscript provides convenient access.', 'Both methods and subscript work.'],
      concepts: ['singleton', 'feature-flags', 'subscript'],
    },
    {
      id: 'swift-singleton-13',
      title: 'Fix Public Initializer',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the singleton that allows multiple instances.',
      skeleton: `class AuthManager {
    static let shared = AuthManager()

    var token: String?

    func login(token: String) {
        self.token = token
    }
}

// Bug: anyone can create additional instances
let another = AuthManager()`,
      solution: `class AuthManager {
    static let shared = AuthManager()
    private init() {}

    var token: String?

    func login(token: String) {
        self.token = token
    }
}`,
      hints: ['The init is not private, so anyone can create instances.', 'Add private init() to prevent this.', 'Only the static let should create an instance.'],
      concepts: ['private-init', 'singleton-enforcement'],
    },
    {
      id: 'swift-singleton-14',
      title: 'Fix Singleton State Leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the singleton that exposes its internal state.',
      skeleton: `class UserManager {
    static let shared = UserManager()
    private init() {}

    var users: [String] = []

    func addUser(_ name: String) {
        users.append(name)
    }
}

// Bug: external code can modify users directly
UserManager.shared.users.removeAll()`,
      solution: `class UserManager {
    static let shared = UserManager()
    private init() {}

    private(set) var users: [String] = []

    func addUser(_ name: String) {
        users.append(name)
    }

    func removeAll() {
        users.removeAll()
    }
}`,
      hints: ['The users array is publicly mutable.', 'Use private(set) to allow only internal mutation.', 'Provide explicit methods for modifications.'],
      concepts: ['encapsulation', 'private-set'],
    },
    {
      id: 'swift-singleton-15',
      title: 'Fix Struct Singleton Attempt',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the singleton implemented as a struct which does not work.',
      skeleton: `struct AppState {
    static var shared = AppState()
    private init() {}

    var count = 0

    mutating func increment() {
        count += 1
    }
}

AppState.shared.increment()
AppState.shared.increment()
print(AppState.shared.count) // Might not be 2!`,
      solution: `class AppState {
    static let shared = AppState()
    private init() {}

    var count = 0

    func increment() {
        count += 1
    }
}

AppState.shared.increment()
AppState.shared.increment()
print(AppState.shared.count)`,
      hints: ['Structs have value semantics - mutations create copies.', 'Singletons need reference semantics.', 'Change struct to class.'],
      concepts: ['reference-vs-value', 'class-singleton'],
    },
    {
      id: 'swift-singleton-16',
      title: 'Predict Singleton Identity',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict whether two references point to the same singleton.',
      skeleton: `class Config {
    static let shared = Config()
    private init() {}
    var value = 0
}

let a = Config.shared
let b = Config.shared
a.value = 42
print(b.value)
print(a === b)`,
      solution: `42
true`,
      hints: ['a and b reference the same instance.', 'Modifying a.value also changes b.value.', '=== checks reference identity.'],
      concepts: ['reference-identity', 'singleton'],
    },
    {
      id: 'swift-singleton-17',
      title: 'Predict Singleton Lazy Init',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict when a singleton is initialized.',
      skeleton: `class Service {
    static let shared = Service()
    private init() { print("init") }
    func doWork() { print("work") }
}

print("start")
let s = Service.shared
print("got ref")
s.doWork()`,
      solution: `start
init
got ref
work`,
      hints: ['static let is lazily initialized on first access.', 'init prints when Service.shared is first accessed.', 'It happens between start and got ref.'],
      concepts: ['lazy-initialization', 'static-let'],
    },
    {
      id: 'swift-singleton-18',
      title: 'Predict Singleton State',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the state of a singleton after multiple operations.',
      skeleton: `class Counter {
    static let shared = Counter()
    private init() {}
    var count = 0
}

func increment() {
    Counter.shared.count += 1
}

increment()
increment()
increment()
print(Counter.shared.count)`,
      solution: `3`,
      hints: ['All calls access the same instance.', 'Each increment adds 1.', 'After 3 increments, count is 3.'],
      concepts: ['shared-state', 'singleton'],
    },
    {
      id: 'swift-singleton-19',
      title: 'Refactor Global Variables to Singleton',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor global variables into a proper singleton.',
      skeleton: `var currentUser: String? = nil
var isLoggedIn: Bool = false
var authToken: String? = nil

func login(user: String, token: String) {
    currentUser = user
    isLoggedIn = true
    authToken = token
}

func logout() {
    currentUser = nil
    isLoggedIn = false
    authToken = nil
}`,
      solution: `class AuthState {
    static let shared = AuthState()
    private init() {}

    private(set) var currentUser: String?
    private(set) var isLoggedIn: Bool = false
    private(set) var authToken: String?

    func login(user: String, token: String) {
        currentUser = user
        isLoggedIn = true
        authToken = token
    }

    func logout() {
        currentUser = nil
        isLoggedIn = false
        authToken = nil
    }
}`,
      hints: ['Encapsulate related global state in a singleton.', 'Use private(set) to control mutation.', 'Methods handle state transitions.'],
      concepts: ['encapsulation', 'global-state-elimination'],
    },
    {
      id: 'swift-singleton-20',
      title: 'Refactor Singleton to Protocol',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Refactor a tightly-coupled singleton to use protocol injection.',
      skeleton: `class APIClient {
    static let shared = APIClient()
    private init() {}
    func get(_ path: String) -> String { "response from \\(path)" }
}

class ProfileService {
    func getProfile() -> String {
        return APIClient.shared.get("/profile")
    }
}`,
      solution: `protocol APIClientProtocol {
    func get(_ path: String) -> String
}

class APIClient: APIClientProtocol {
    static let shared = APIClient()
    private init() {}
    func get(_ path: String) -> String { "response from \\(path)" }
}

class ProfileService {
    let client: APIClientProtocol

    init(client: APIClientProtocol = APIClient.shared) {
        self.client = client
    }

    func getProfile() -> String {
        return client.get("/profile")
    }
}`,
      hints: ['Extract a protocol from the singleton.', 'Inject via init with the singleton as default.', 'Tests can inject a mock.'],
      concepts: ['protocol-extraction', 'dependency-injection', 'testability'],
    },
  ],
};
