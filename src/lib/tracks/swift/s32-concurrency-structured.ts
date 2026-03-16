import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-structured',
  title: '32. Structured Concurrency',
  explanation: `## Structured Concurrency in Swift

Structured concurrency ensures that child tasks are scoped to their parent, automatically managing lifetimes and cancellation.

### Task Groups

\`withTaskGroup\` runs multiple child tasks concurrently and collects results:

\`\`\`swift
func fetchAll(ids: [Int]) async -> [String] {
    await withTaskGroup(of: String.self) { group in
        for id in ids {
            group.addTask {
                await fetchItem(id: id)
            }
        }
        var results: [String] = []
        for await result in group {
            results.append(result)
        }
        return results
    }
}
\`\`\`

### Throwing Task Groups

\`\`\`swift
try await withThrowingTaskGroup(of: Data.self) { group in
    group.addTask { try await download(url1) }
    group.addTask { try await download(url2) }
    for try await data in group {
        process(data)
    }
}
\`\`\`

### Task Cancellation

\`\`\`swift
let task = Task {
    while !Task.isCancelled {
        await doWork()
    }
}
task.cancel()
\`\`\`

### Task Priority

\`\`\`swift
Task(priority: .high) {
    await importantWork()
}

Task(priority: .background) {
    await cleanup()
}
\`\`\`
`,
  exercises: [
    {
      id: 'swift-structured-1',
      title: 'Basic Task Group',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Create a task group to process items concurrently.',
      skeleton: `func processAll(_ items: [Int]) async -> [Int] {
    await ___(of: Int.self) { group in
        for item in items {
            group.addTask { item * 2 }
        }
        var results: [Int] = []
        for await result in group {
            results.append(result)
        }
        return results
    }
}`,
      solution: `func processAll(_ items: [Int]) async -> [Int] {
    await withTaskGroup(of: Int.self) { group in
        for item in items {
            group.addTask { item * 2 }
        }
        var results: [Int] = []
        for await result in group {
            results.append(result)
        }
        return results
    }
}`,
      hints: [
        'The function that creates a task group for non-throwing tasks.',
        'It takes the child task result type as a parameter.',
        'The answer is withTaskGroup.',
      ],
      concepts: ['task-group', 'withTaskGroup'],
    },
    {
      id: 'swift-structured-2',
      title: 'Throwing Task Group',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Create a throwing task group for fallible tasks.',
      skeleton: `func downloadAll(_ urls: [URL]) async throws -> [Data] {
    try await ___(of: Data.self) { group in
        for url in urls {
            group.addTask {
                let (data, _) = try await URLSession.shared.data(from: url)
                return data
            }
        }
        var results: [Data] = []
        for try await data in group {
            results.append(data)
        }
        return results
    }
}`,
      solution: `func downloadAll(_ urls: [URL]) async throws -> [Data] {
    try await withThrowingTaskGroup(of: Data.self) { group in
        for url in urls {
            group.addTask {
                let (data, _) = try await URLSession.shared.data(from: url)
                return data
            }
        }
        var results: [Data] = []
        for try await data in group {
            results.append(data)
        }
        return results
    }
}`,
      hints: [
        'Throwing task groups allow child tasks to throw errors.',
        'Use the throwing variant of withTaskGroup.',
        'The answer is withThrowingTaskGroup.',
      ],
      concepts: ['throwing-task-group', 'error-handling'],
    },
    {
      id: 'swift-structured-3',
      title: 'Check Task Cancellation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Check if the current task has been cancelled.',
      skeleton: `func longRunningWork() async {
    for i in 0..<1000 {
        if ___.isCancelled {
            print("Cancelled at iteration \\(i)")
            return
        }
        // do work
    }
}`,
      solution: `func longRunningWork() async {
    for i in 0..<1000 {
        if Task.isCancelled {
            print("Cancelled at iteration \\(i)")
            return
        }
        // do work
    }
}`,
      hints: [
        'Task provides a static property to check cancellation.',
        'Use Task.isCancelled.',
        'This is a cooperative cancellation check.',
      ],
      concepts: ['task-cancellation', 'cooperative-cancellation'],
    },
    {
      id: 'swift-structured-4',
      title: 'Task Priority',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Create a task with a specific priority.',
      skeleton: `Task(priority: ___) {
    await performImportantWork()
}

Task(priority: ___) {
    await performBackgroundCleanup()
}`,
      solution: `Task(priority: .high) {
    await performImportantWork()
}

Task(priority: .background) {
    await performBackgroundCleanup()
}`,
      hints: [
        'Important work should run at high priority.',
        'Cleanup tasks can run at background priority.',
        'Use .high and .background.',
      ],
      concepts: ['task-priority', 'scheduling'],
    },
    {
      id: 'swift-structured-5',
      title: 'Cancel a Task',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Store a task handle and cancel it.',
      skeleton: `let task = Task {
    while !Task.isCancelled {
        try await Task.sleep(nanoseconds: 1_000_000_000)
        print("tick")
    }
}

// After some time, cancel the task
try await Task.sleep(nanoseconds: 3_000_000_000)
task.___()`,
      solution: `let task = Task {
    while !Task.isCancelled {
        try await Task.sleep(nanoseconds: 1_000_000_000)
        print("tick")
    }
}

// After some time, cancel the task
try await Task.sleep(nanoseconds: 3_000_000_000)
task.cancel()`,
      hints: [
        'Task handles have a method to request cancellation.',
        'The method sets isCancelled to true.',
        'The method is cancel().',
      ],
      concepts: ['task-handle', 'cancel'],
    },
    {
      id: 'swift-structured-6',
      title: 'Throw on Cancellation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Throw an error when the task is cancelled.',
      skeleton: `func processData() async throws -> String {
    for i in 0..<100 {
        try Task.___
        // process chunk i
    }
    return "done"
}`,
      solution: `func processData() async throws -> String {
    for i in 0..<100 {
        try Task.checkCancellation()
        // process chunk i
    }
    return "done"
}`,
      hints: [
        'Task has a static method that throws CancellationError.',
        'It is a throwing check, not a boolean check.',
        'The method is checkCancellation().',
      ],
      concepts: ['check-cancellation', 'cancellation-error'],
    },
    {
      id: 'swift-structured-7',
      title: 'Write a Parallel Map Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that maps over an array in parallel using a task group.',
      skeleton: `// Write a function parallelMap that takes:
// - items: [T]
// - transform: @Sendable (T) async -> U
// Returns [U] with results in the same order as input
// Hint: use enumerated() to track indices
`,
      solution: `func parallelMap<T: Sendable, U: Sendable>(_ items: [T], transform: @escaping @Sendable (T) async -> U) async -> [U] {
    await withTaskGroup(of: (Int, U).self) { group in
        for (index, item) in items.enumerated() {
            group.addTask {
                let result = await transform(item)
                return (index, result)
            }
        }
        var results = Array<U?>(repeating: nil, count: items.count)
        for await (index, value) in group {
            results[index] = value
        }
        return results.compactMap { $0 }
    }
}`,
      hints: [
        'Task group results may arrive out of order.',
        'Track the original index with each result.',
        'Use a pre-allocated array and fill by index.',
      ],
      concepts: ['task-group', 'parallel-map', 'order-preservation'],
    },
    {
      id: 'swift-structured-8',
      title: 'Write a First Result Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a function that returns the first successful result from multiple tasks.',
      skeleton: `// Write a function race that takes an array of async closures
// Each returns T. Returns the result of whichever finishes first.
// Cancel remaining tasks after getting first result.
`,
      solution: `func race<T: Sendable>(_ operations: [@Sendable () async -> T]) async -> T {
    await withTaskGroup(of: T.self) { group in
        for operation in operations {
            group.addTask {
                await operation()
            }
        }
        let first = await group.next()!
        group.cancelAll()
        return first
    }
}`,
      hints: [
        'Use group.next() to get the first result.',
        'Call group.cancelAll() to cancel remaining tasks.',
        'Return the first result.',
      ],
      concepts: ['task-group', 'race-pattern', 'cancelAll'],
    },
    {
      id: 'swift-structured-9',
      title: 'Write a Batch Processor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that processes items in batches with limited concurrency.',
      skeleton: `// Write a function batchProcess that takes:
// - items: [Int], batchSize: Int
// - process: @Sendable (Int) async -> String
// Processes items in batches of batchSize concurrently
// Returns all results in order
`,
      solution: `func batchProcess(items: [Int], batchSize: Int, process: @escaping @Sendable (Int) async -> String) async -> [String] {
    var allResults: [String] = []
    for batchStart in stride(from: 0, to: items.count, by: batchSize) {
        let batchEnd = min(batchStart + batchSize, items.count)
        let batch = Array(items[batchStart..<batchEnd])
        let batchResults = await withTaskGroup(of: (Int, String).self) { group in
            for (offset, item) in batch.enumerated() {
                group.addTask {
                    let result = await process(item)
                    return (offset, result)
                }
            }
            var results = Array<String?>(repeating: nil, count: batch.count)
            for await (offset, value) in group {
                results[offset] = value
            }
            return results.compactMap { $0 }
        }
        allResults.append(contentsOf: batchResults)
    }
    return allResults
}`,
      hints: [
        'Use stride to create batches of items.',
        'Process each batch with a task group.',
        'Collect results from each batch in order.',
      ],
      concepts: ['task-group', 'batching', 'concurrency-control'],
    },
    {
      id: 'swift-structured-10',
      title: 'Write a Cancellable Worker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write an async function that properly handles cancellation.',
      skeleton: `// Write a function processItems that takes [Int]
// For each item: check cancellation, sleep 100ms, add item*2 to results
// Return partial results if cancelled
`,
      solution: `func processItems(_ items: [Int]) async -> [Int] {
    var results: [Int] = []
    for item in items {
        if Task.isCancelled {
            return results
        }
        try? await Task.sleep(nanoseconds: 100_000_000)
        results.append(item * 2)
    }
    return results
}`,
      hints: [
        'Check Task.isCancelled at the start of each iteration.',
        'Return partial results on cancellation instead of throwing.',
        'Use try? with Task.sleep for graceful handling.',
      ],
      concepts: ['cooperative-cancellation', 'partial-results'],
    },
    {
      id: 'swift-structured-11',
      title: 'Write a Task Group Reducer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a function that reduces task group results into a single value.',
      skeleton: `// Write a function parallelReduce that:
// - takes items: [Int]
// - maps each to Double asynchronously (item * 1.5)
// - reduces all results by summing them
// Uses a task group
`,
      solution: `func parallelReduce(_ items: [Int]) async -> Double {
    await withTaskGroup(of: Double.self) { group in
        for item in items {
            group.addTask {
                return Double(item) * 1.5
            }
        }
        var total: Double = 0
        for await value in group {
            total += value
        }
        return total
    }
}`,
      hints: [
        'Each task returns a Double.',
        'Accumulate results with for await.',
        'Sum all values into a total.',
      ],
      concepts: ['task-group', 'reduce-pattern', 'accumulation'],
    },
    {
      id: 'swift-structured-12',
      title: 'Write a Detached Task Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that uses a detached task for independent work.',
      skeleton: `// Write a function logInBackground that takes a String message
// Creates a detached task with .background priority
// That prints the message with a timestamp
`,
      solution: `func logInBackground(_ message: String) {
    Task.detached(priority: .background) {
        let timestamp = Date()
        print("[\\(timestamp)] \\(message)")
    }
}`,
      hints: [
        'Detached tasks do not inherit the parent context.',
        'Use Task.detached for independent work.',
        'Set priority to .background for logging.',
      ],
      concepts: ['detached-task', 'task-priority', 'background-work'],
    },
    {
      id: 'swift-structured-13',
      title: 'Fix Task Group Type Mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the task group that has mismatched child task types.',
      skeleton: `func fetchData() async -> [String] {
    await withTaskGroup(of: String.self) { group in
        group.addTask { return "hello" }
        group.addTask { return 42 }  // Bug: wrong type

        var results: [String] = []
        for await result in group {
            results.append(result)
        }
        return results
    }
}`,
      solution: `func fetchData() async -> [String] {
    await withTaskGroup(of: String.self) { group in
        group.addTask { return "hello" }
        group.addTask { return String(42) }

        var results: [String] = []
        for await result in group {
            results.append(result)
        }
        return results
    }
}`,
      hints: [
        'All child tasks must return the same type as declared in of:.',
        'The group expects String, but one task returns Int.',
        'Convert 42 to String.',
      ],
      concepts: ['task-group', 'type-consistency'],
    },
    {
      id: 'swift-structured-14',
      title: 'Fix Missing Cancellation Check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the long-running task that does not respect cancellation.',
      skeleton: `func compute() async -> Int {
    var sum = 0
    for i in 0..<1_000_000 {
        sum += i
    }
    return sum
}

let task = Task { await compute() }
task.cancel()
// compute() will run to completion ignoring cancellation`,
      solution: `func compute() async throws -> Int {
    var sum = 0
    for i in 0..<1_000_000 {
        if i % 1000 == 0 {
            try Task.checkCancellation()
        }
        sum += i
    }
    return sum
}

let task = Task { try await compute() }
task.cancel()`,
      hints: [
        'Add periodic cancellation checks inside the loop.',
        'Check every N iterations to avoid overhead.',
        'Use try Task.checkCancellation().',
      ],
      concepts: ['cooperative-cancellation', 'checkCancellation'],
    },
    {
      id: 'swift-structured-15',
      title: 'Fix Task Group Result Collection',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the task group that returns results before all tasks complete.',
      skeleton: `func processAll(_ items: [Int]) async -> [Int] {
    var results: [Int] = []
    await withTaskGroup(of: Int.self) { group in
        for item in items {
            group.addTask { return item * 2 }
        }
        // Bug: not collecting results from the group
    }
    return results
}`,
      solution: `func processAll(_ items: [Int]) async -> [Int] {
    await withTaskGroup(of: Int.self) { group in
        for item in items {
            group.addTask { return item * 2 }
        }
        var results: [Int] = []
        for await result in group {
            results.append(result)
        }
        return results
    }
}`,
      hints: [
        'Results must be collected inside the task group closure.',
        'Use for await to iterate over completed tasks.',
        'Return results from inside the withTaskGroup closure.',
      ],
      concepts: ['task-group', 'result-collection'],
    },
    {
      id: 'swift-structured-16',
      title: 'Predict Task Group Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the number of results from a task group.',
      skeleton: `func count() async -> Int {
    await withTaskGroup(of: Int.self) { group in
        for i in 1...5 {
            group.addTask { return i }
        }
        var count = 0
        for await _ in group {
            count += 1
        }
        return count
    }
}

// What does count() return?`,
      solution: `5`,
      hints: [
        '5 tasks are added to the group.',
        'Each produces one result.',
        'for await iterates 5 times.',
      ],
      concepts: ['task-group', 'counting'],
    },
    {
      id: 'swift-structured-17',
      title: 'Predict Cancellation Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what happens when a task group cancels remaining tasks.',
      skeleton: `func firstResult() async -> Int {
    await withTaskGroup(of: Int.self) { group in
        group.addTask { return 1 }
        group.addTask { return 2 }
        group.addTask { return 3 }
        let first = await group.next()!
        group.cancelAll()
        return first
    }
}

// What is the MINIMUM possible return value?`,
      solution: `1`,
      hints: [
        'group.next() returns the first completed task.',
        'Task execution order is not guaranteed.',
        'The minimum is 1 (if that task completes first).',
      ],
      concepts: ['task-group', 'cancelAll', 'non-determinism'],
    },
    {
      id: 'swift-structured-18',
      title: 'Predict Task Sleep Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what Task.sleep does when the task is cancelled.',
      skeleton: `// If a task is cancelled, what does Task.sleep throw?
// A: Nothing (it completes normally)
// B: CancellationError
// C: It depends on timing`,
      solution: `B`,
      hints: [
        'Task.sleep is cancellation-aware.',
        'It throws CancellationError if the task is cancelled.',
        'This is part of cooperative cancellation.',
      ],
      concepts: ['task-sleep', 'cancellation-error'],
    },
    {
      id: 'swift-structured-19',
      title: 'Refactor Serial to Concurrent',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor serial processing to use a task group for concurrency.',
      skeleton: `func processItems(_ items: [Int]) async -> [String] {
    var results: [String] = []
    for item in items {
        let result = await transform(item)
        results.append(result)
    }
    return results
}

func transform(_ item: Int) async -> String {
    return "item_\\(item)"
}`,
      solution: `func processItems(_ items: [Int]) async -> [String] {
    await withTaskGroup(of: (Int, String).self) { group in
        for (index, item) in items.enumerated() {
            group.addTask {
                let result = await transform(item)
                return (index, result)
            }
        }
        var results = Array<String?>(repeating: nil, count: items.count)
        for await (index, value) in group {
            results[index] = value
        }
        return results.compactMap { $0 }
    }
}

func transform(_ item: Int) async -> String {
    return "item_\\(item)"
}`,
      hints: [
        'Use withTaskGroup to run transforms concurrently.',
        'Track indices to preserve order.',
        'Collect results into a pre-sized array.',
      ],
      concepts: ['task-group', 'serial-to-concurrent', 'refactoring'],
    },
    {
      id: 'swift-structured-20',
      title: 'Refactor Nested Async to Task Group',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Refactor multiple async let bindings to a scalable task group.',
      skeleton: `func fetchAll() async -> [String] {
    async let a = fetch(1)
    async let b = fetch(2)
    async let c = fetch(3)
    async let d = fetch(4)
    async let e = fetch(5)
    return await [a, b, c, d, e]
}

func fetch(_ id: Int) async -> String {
    return "result_\\(id)"
}`,
      solution: `func fetchAll() async -> [String] {
    let ids = [1, 2, 3, 4, 5]
    return await withTaskGroup(of: (Int, String).self) { group in
        for (index, id) in ids.enumerated() {
            group.addTask {
                let result = await fetch(id)
                return (index, result)
            }
        }
        var results = Array<String?>(repeating: nil, count: ids.count)
        for await (index, value) in group {
            results[index] = value
        }
        return results.compactMap { $0 }
    }
}

func fetch(_ id: Int) async -> String {
    return "result_\\(id)"
}`,
      hints: [
        'async let does not scale for dynamic numbers of items.',
        'Task groups handle any number of concurrent tasks.',
        'Track indices for ordered results.',
      ],
      concepts: ['task-group', 'scalability', 'refactoring'],
    },
  ],
};
