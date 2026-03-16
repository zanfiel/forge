import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-async',
  title: '30. Async/Await',
  explanation: `## Async/Await in Swift

Swift's concurrency model uses \`async\` and \`await\` for writing asynchronous code that reads like synchronous code.

### Async Functions

Mark functions with \`async\` when they perform asynchronous work:

\`\`\`swift
func fetchUser(id: Int) async -> User {
    let data = await networkRequest("/users/\\(id)")
    return User(data: data)
}
\`\`\`

### Await

Use \`await\` to suspend execution until an async function completes:

\`\`\`swift
let user = await fetchUser(id: 42)
print(user.name)
\`\`\`

### Async Throwing Functions

Combine \`async\` with \`throws\`:

\`\`\`swift
func loadData() async throws -> Data {
    let url = URL(string: "https://api.example.com")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return data
}
\`\`\`

### Task

\`Task\` bridges synchronous and asynchronous code:

\`\`\`swift
Task {
    let result = await fetchUser(id: 1)
    print(result)
}
\`\`\`

### async let

Run multiple async operations concurrently:

\`\`\`swift
async let userA = fetchUser(id: 1)
async let userB = fetchUser(id: 2)
let users = await [userA, userB]
\`\`\`
`,
  exercises: [
    {
      id: 'swift-async-1',
      title: 'Declare an Async Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Mark a function as async.',
      skeleton: `func fetchData() ___ -> Data {
    // ... performs async work
    return Data()
}`,
      solution: `func fetchData() async -> Data {
    // ... performs async work
    return Data()
}`,
      hints: [
        'Async functions are marked with a keyword after the parameter list.',
        'Place it before the return arrow.',
        'The keyword is async.',
      ],
      concepts: ['async-function'],
    },
    {
      id: 'swift-async-2',
      title: 'Calling an Async Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use await to call an async function.',
      skeleton: `func greet() async -> String {
    return "Hello"
}

func run() async {
    let message = ___ greet()
    print(message)
}`,
      solution: `func greet() async -> String {
    return "Hello"
}

func run() async {
    let message = await greet()
    print(message)
}`,
      hints: [
        'You must suspend at the call site of an async function.',
        'Use the await keyword.',
        'Place await before the function call.',
      ],
      concepts: ['await', 'suspension-point'],
    },
    {
      id: 'swift-async-3',
      title: 'Async Throws Function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Declare a function that is both async and throwing.',
      skeleton: `enum NetworkError: Error {
    case badURL
}

func loadJSON(from urlString: String) ___ ___ -> [String: Any] {
    guard let url = URL(string: urlString) else { throw NetworkError.badURL }
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONSerialization.jsonObject(with: data) as! [String: Any]
}`,
      solution: `enum NetworkError: Error {
    case badURL
}

func loadJSON(from urlString: String) async throws -> [String: Any] {
    guard let url = URL(string: urlString) else { throw NetworkError.badURL }
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONSerialization.jsonObject(with: data) as! [String: Any]
}`,
      hints: [
        'The order matters: async comes before throws.',
        'The function can both suspend and throw.',
        'async throws.',
      ],
      concepts: ['async-throws', 'error-handling'],
    },
    {
      id: 'swift-async-4',
      title: 'Creating a Task',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Bridge synchronous code to async using Task.',
      skeleton: `func fetchUser() async -> String {
    return "Alice"
}

// From synchronous context:
___ {
    let user = await fetchUser()
    print(user)
}`,
      solution: `func fetchUser() async -> String {
    return "Alice"
}

// From synchronous context:
Task {
    let user = await fetchUser()
    print(user)
}`,
      hints: [
        'Task creates an async context from synchronous code.',
        'Use Task { } to start an async block.',
        'The keyword is Task.',
      ],
      concepts: ['task', 'async-bridge'],
    },
    {
      id: 'swift-async-5',
      title: 'Async Let Binding',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use async let for concurrent execution.',
      skeleton: `func fetchName() async -> String { "Alice" }
func fetchAge() async -> Int { 30 }

func loadProfile() async {
    ___ ___ name = fetchName()
    ___ ___ age = fetchAge()
    print("\\(await name), \\(await age)")
}`,
      solution: `func fetchName() async -> String { "Alice" }
func fetchAge() async -> Int { 30 }

func loadProfile() async {
    async let name = fetchName()
    async let age = fetchAge()
    print("\\(await name), \\(await age)")
}`,
      hints: [
        'async let starts the task immediately without awaiting.',
        'Both fetches run concurrently.',
        'Use async let for each binding.',
      ],
      concepts: ['async-let', 'concurrent-binding'],
    },
    {
      id: 'swift-async-6',
      title: 'Try Await Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use try await to call a throwing async function.',
      skeleton: `func fetchData() async throws -> String {
    return "data"
}

func process() async {
    do {
        let data = ___ ___ fetchData()
        print(data)
    } catch {
        print("Error: \\(error)")
    }
}`,
      solution: `func fetchData() async throws -> String {
    return "data"
}

func process() async {
    do {
        let data = try await fetchData()
        print(data)
    } catch {
        print("Error: \\(error)")
    }
}`,
      hints: [
        'When calling async throws functions, use both try and await.',
        'try comes before await.',
        'The pattern is try await.',
      ],
      concepts: ['try-await', 'error-handling'],
    },
    {
      id: 'swift-async-7',
      title: 'Write an Async Retry Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write an async function that retries a throwing async operation.',
      skeleton: `// Write a function asyncRetry that:
// - takes maxAttempts: Int and operation: () async throws -> T
// - retries the operation up to maxAttempts times
// - returns the result on success, throws last error on failure
`,
      solution: `func asyncRetry<T>(maxAttempts: Int, operation: () async throws -> T) async throws -> T {
    var lastError: Error?
    for _ in 0..<maxAttempts {
        do {
            return try await operation()
        } catch {
            lastError = error
        }
    }
    throw lastError!
}`,
      hints: [
        'Loop up to maxAttempts, calling try await operation().',
        'Catch errors and store the last one.',
        'After the loop, throw the last error.',
      ],
      concepts: ['async-throws', 'retry-pattern', 'generics'],
    },
    {
      id: 'swift-async-8',
      title: 'Write an Async Map Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that maps over an array with an async transform.',
      skeleton: `// Write a function asyncMap that takes:
// - an array [T] and a transform (T) async -> U
// - returns [U] with each element transformed asynchronously
`,
      solution: `func asyncMap<T, U>(_ items: [T], transform: (T) async -> U) async -> [U] {
    var results: [U] = []
    for item in items {
        let result = await transform(item)
        results.append(result)
    }
    return results
}`,
      hints: [
        'Loop over items and await each transform.',
        'Collect results into an array.',
        'This processes items sequentially.',
      ],
      concepts: ['async-map', 'sequential-async'],
    },
    {
      id: 'swift-async-9',
      title: 'Write an Async Timeout Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a function that cancels an async operation after a timeout.',
      skeleton: `// Write a function withTimeout that:
// - takes seconds: UInt64 and operation: () async throws -> T
// - runs operation with a timeout
// - throws CancellationError if timeout expires
`,
      solution: `func withTimeout<T>(seconds: UInt64, operation: @escaping () async throws -> T) async throws -> T {
    return try await withThrowingTaskGroup(of: T.self) { group in
        group.addTask {
            return try await operation()
        }
        group.addTask {
            try await Task.sleep(nanoseconds: seconds * 1_000_000_000)
            throw CancellationError()
        }
        let result = try await group.next()!
        group.cancelAll()
        return result
    }
}`,
      hints: [
        'Use a task group with two tasks: the operation and a sleep.',
        'Whichever finishes first wins.',
        'Cancel the remaining task after getting the first result.',
      ],
      concepts: ['task-group', 'timeout', 'cancellation'],
    },
    {
      id: 'swift-async-10',
      title: 'Write Concurrent Fetch',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that fetches multiple items concurrently using async let.',
      skeleton: `struct Item {
    let id: Int
    let name: String
}

func fetchItem(id: Int) async -> Item {
    return Item(id: id, name: "Item \\(id)")
}

// Write a function fetchThreeItems that uses async let to fetch
// items with ids 1, 2, 3 concurrently and returns them as an array
`,
      solution: `func fetchThreeItems() async -> [Item] {
    async let item1 = fetchItem(id: 1)
    async let item2 = fetchItem(id: 2)
    async let item3 = fetchItem(id: 3)
    return await [item1, item2, item3]
}`,
      hints: [
        'Use async let for each fetch to run them concurrently.',
        'All three start immediately.',
        'Await all of them when collecting results.',
      ],
      concepts: ['async-let', 'concurrent-execution'],
    },
    {
      id: 'swift-async-11',
      title: 'Write an Async Sequence Consumer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a function that collects values from an AsyncSequence.',
      skeleton: `// Write a function collectAll that takes an AsyncSequence
// and returns an array of all its elements
`,
      solution: `func collectAll<S: AsyncSequence>(_ sequence: S) async rethrows -> [S.Element] {
    var results: [S.Element] = []
    for try await element in sequence {
        results.append(element)
    }
    return results
}`,
      hints: [
        'Use for try await to iterate an AsyncSequence.',
        'Collect elements into an array.',
        'Use rethrows since the sequence may throw.',
      ],
      concepts: ['async-sequence', 'for-await', 'rethrows'],
    },
    {
      id: 'swift-async-12',
      title: 'Write a Continuation Bridge',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a function that bridges a callback-based API to async/await.',
      skeleton: `// Given this callback-based function:
func fetchLegacy(id: Int, completion: @escaping (String) -> Void) {
    completion("Result \\(id)")
}

// Write an async wrapper fetchAsync(id:) -> String
// using withCheckedContinuation
`,
      solution: `func fetchAsync(id: Int) async -> String {
    return await withCheckedContinuation { continuation in
        fetchLegacy(id: id) { result in
            continuation.resume(returning: result)
        }
    }
}`,
      hints: [
        'Use withCheckedContinuation to bridge callback to async.',
        'Call continuation.resume(returning:) in the callback.',
        'The continuation must be resumed exactly once.',
      ],
      concepts: ['continuation', 'callback-bridge', 'async-migration'],
    },
    {
      id: 'swift-async-13',
      title: 'Fix Missing Await',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code that calls an async function without await.',
      skeleton: `func fetchName() async -> String {
    return "Alice"
}

func greet() async {
    let name = fetchName()
    print("Hello, \\(name)")
}`,
      solution: `func fetchName() async -> String {
    return "Alice"
}

func greet() async {
    let name = await fetchName()
    print("Hello, \\(name)")
}`,
      hints: [
        'Async functions must be called with await.',
        'Add await before fetchName().',
        'This marks the suspension point.',
      ],
      concepts: ['await', 'suspension-point'],
    },
    {
      id: 'swift-async-14',
      title: 'Fix Wrong Try Await Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the incorrect ordering of try and await.',
      skeleton: `func loadData() async throws -> String {
    return "data"
}

func process() async throws {
    let data = await try loadData()
    print(data)
}`,
      solution: `func loadData() async throws -> String {
    return "data"
}

func process() async throws {
    let data = try await loadData()
    print(data)
}`,
      hints: [
        'The correct order is try before await.',
        'try await, not await try.',
        'This matches the declaration order: async throws.',
      ],
      concepts: ['try-await', 'keyword-order'],
    },
    {
      id: 'swift-async-15',
      title: 'Fix Task Cancellation Handling',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Fix the async function that ignores cancellation.',
      skeleton: `func processItems(_ items: [Int]) async -> [Int] {
    var results: [Int] = []
    for item in items {
        try? await Task.sleep(nanoseconds: 100_000_000)
        results.append(item * 2)
    }
    return results
}`,
      solution: `func processItems(_ items: [Int]) async -> [Int] {
    var results: [Int] = []
    for item in items {
        if Task.isCancelled { break }
        try? await Task.sleep(nanoseconds: 100_000_000)
        results.append(item * 2)
    }
    return results
}`,
      hints: [
        'Long-running async functions should check for cancellation.',
        'Use Task.isCancelled to check before each iteration.',
        'Break out of the loop if cancelled.',
      ],
      concepts: ['task-cancellation', 'cooperative-cancellation'],
    },
    {
      id: 'swift-async-16',
      title: 'Predict Async Let Concurrency',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the output of concurrent async let operations.',
      skeleton: `func double(_ n: Int) async -> Int {
    return n * 2
}

func compute() async {
    async let a = double(5)
    async let b = double(10)
    let sum = await a + await b
    print(sum)
}

// What does compute() print?`,
      solution: `30`,
      hints: [
        'double(5) returns 10, double(10) returns 20.',
        'Both run concurrently via async let.',
        '10 + 20 = 30.',
      ],
      concepts: ['async-let', 'concurrent-execution'],
    },
    {
      id: 'swift-async-17',
      title: 'Predict Task Value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the value returned by a Task.',
      skeleton: `func getValue() async -> Int {
    let task = Task { () -> Int in
        return 42
    }
    return await task.value
}

// What does getValue() return?`,
      solution: `42`,
      hints: [
        'Task { } creates a new task that returns 42.',
        'task.value awaits the result.',
        'The function returns 42.',
      ],
      concepts: ['task-value', 'async-result'],
    },
    {
      id: 'swift-async-18',
      title: 'Predict Sequential vs Concurrent',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the difference between sequential and concurrent async calls.',
      skeleton: `func add(_ n: Int) async -> Int { return n + 1 }

func sequential() async -> Int {
    let a = await add(1)
    let b = await add(a)
    return b
}

// What does sequential() return?`,
      solution: `3`,
      hints: [
        'add(1) returns 2.',
        'add(2) returns 3.',
        'They run sequentially because b depends on a.',
      ],
      concepts: ['sequential-async', 'data-dependency'],
    },
    {
      id: 'swift-async-19',
      title: 'Refactor Callbacks to Async/Await',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor callback-based code to use async/await.',
      skeleton: `func fetchUser(completion: @escaping (String) -> Void) {
    DispatchQueue.global().async {
        completion("Alice")
    }
}

func fetchPosts(user: String, completion: @escaping ([String]) -> Void) {
    DispatchQueue.global().async {
        completion(["Post 1", "Post 2"])
    }
}

func loadProfile(completion: @escaping (String, [String]) -> Void) {
    fetchUser { user in
        fetchPosts(user: user) { posts in
            completion(user, posts)
        }
    }
}`,
      solution: `func fetchUser() async -> String {
    return "Alice"
}

func fetchPosts(user: String) async -> [String] {
    return ["Post 1", "Post 2"]
}

func loadProfile() async -> (String, [String]) {
    let user = await fetchUser()
    let posts = await fetchPosts(user: user)
    return (user, posts)
}`,
      hints: [
        'Remove completion handlers and make functions async.',
        'Replace callback nesting with sequential await calls.',
        'Return values directly instead of calling completion.',
      ],
      concepts: ['async-migration', 'callback-elimination'],
    },
    {
      id: 'swift-async-20',
      title: 'Refactor Sequential to Concurrent',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor sequential async calls to run concurrently where possible.',
      skeleton: `func fetchTitle() async -> String { "My App" }
func fetchCount() async -> Int { 42 }
func fetchVersion() async -> String { "1.0" }

func loadInfo() async -> String {
    let title = await fetchTitle()
    let count = await fetchCount()
    let version = await fetchVersion()
    return "\\(title) v\\(version) (\\(count) items)"
}`,
      solution: `func fetchTitle() async -> String { "My App" }
func fetchCount() async -> Int { 42 }
func fetchVersion() async -> String { "1.0" }

func loadInfo() async -> String {
    async let title = fetchTitle()
    async let count = fetchCount()
    async let version = fetchVersion()
    return await "\\(title) v\\(version) (\\(count) items)"
}`,
      hints: [
        'These three fetches are independent of each other.',
        'Use async let to run them concurrently.',
        'Await all results at the return statement.',
      ],
      concepts: ['async-let', 'concurrent-refactoring'],
    },
  ],
};
