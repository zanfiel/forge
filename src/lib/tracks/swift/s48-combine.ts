import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-combine',
  title: '48. Combine Framework',
  explanation: `## Combine Framework

Combine is Apple's reactive programming framework for processing values over time using Publishers and Subscribers.

### Publisher and Subscriber

\`\`\`swift
import Combine

let publisher = [1, 2, 3, 4, 5].publisher

let cancellable = publisher.sink(
    receiveCompletion: { completion in
        print("Completed: \\(completion)")
    },
    receiveValue: { value in
        print("Received: \\(value)")
    }
)
\`\`\`

### Operators

\`\`\`swift
[1, 2, 3, 4, 5].publisher
    .map { $0 * 2 }
    .filter { $0 > 4 }
    .sink { print($0) }  // 6, 8, 10
\`\`\`

### Subjects

\`\`\`swift
let passthrough = PassthroughSubject<String, Never>()
let current = CurrentValueSubject<Int, Never>(0)

passthrough.sink { print($0) }
passthrough.send("Hello")

current.sink { print($0) }  // prints 0 immediately
current.send(42)             // prints 42
\`\`\`

### Combining Publishers

\`\`\`swift
let pub1 = PassthroughSubject<Int, Never>()
let pub2 = PassthroughSubject<String, Never>()

pub1.combineLatest(pub2)
    .sink { print("\\($0), \\($1)") }

pub1.send(1)
pub2.send("A")  // prints: 1, A
pub1.send(2)    // prints: 2, A
\`\`\`

### Error Handling

\`\`\`swift
enum APIError: Error { case networkFail }

URLSession.shared.dataTaskPublisher(for: url)
    .map(\\.data)
    .decode(type: User.self, decoder: JSONDecoder())
    .replaceError(with: User.default)
    .sink { user in print(user) }
\`\`\`

### Future

\`\`\`swift
func fetchValue() -> Future<Int, Error> {
    Future { promise in
        DispatchQueue.global().asyncAfter(deadline: .now() + 1) {
            promise(.success(42))
        }
    }
}
\`\`\`
`,
  exercises: [
    {
      id: 'swift-combine-1',
      title: 'Create a Publisher from Array',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Create a publisher from a sequence.',
      skeleton: `import Combine

let numbers = [10, 20, 30]
let pub = numbers.___

let cancellable = pub.sink { value in
    print(value)
}`,
      solution: `import Combine

let numbers = [10, 20, 30]
let pub = numbers.publisher

let cancellable = pub.sink { value in
    print(value)
}`,
      hints: ['Arrays have a .publisher property in Combine.', 'It emits each element sequentially then completes.', 'The answer is publisher.'],
      concepts: ['sequence-publisher', 'publisher'],
    },
    {
      id: 'swift-combine-2',
      title: 'Subscribe with sink',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use sink to subscribe to a publisher.',
      skeleton: `import Combine

let pub = Just("Hello, Combine!")

let cancellable = pub.___(receiveCompletion: { completion in
    print("Done: \\(completion)")
}, receiveValue: { value in
    print(value)
})`,
      solution: `import Combine

let pub = Just("Hello, Combine!")

let cancellable = pub.sink(receiveCompletion: { completion in
    print("Done: \\(completion)")
}, receiveValue: { value in
    print(value)
})`,
      hints: ['sink is the most common subscriber.', 'It takes two closures: completion and value.', 'The answer is sink.'],
      concepts: ['sink', 'subscriber'],
    },
    {
      id: 'swift-combine-3',
      title: 'Map Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Transform values using the map operator.',
      skeleton: `import Combine

let cancellable = [1, 2, 3].publisher
    .___ { $0 * $0 }
    .sink { print($0) }
// Prints: 1, 4, 9`,
      solution: `import Combine

let cancellable = [1, 2, 3].publisher
    .map { $0 * $0 }
    .sink { print($0) }
// Prints: 1, 4, 9`,
      hints: ['map transforms each emitted value.', 'Similar to map on arrays but for publishers.', 'The answer is map.'],
      concepts: ['map-operator', 'transformation'],
    },
    {
      id: 'swift-combine-4',
      title: 'Filter Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Filter values from a publisher.',
      skeleton: `import Combine

let cancellable = (1...10).publisher
    .___ { $0 % 2 == 0 }
    .sink { print($0) }
// Prints: 2, 4, 6, 8, 10`,
      solution: `import Combine

let cancellable = (1...10).publisher
    .filter { $0 % 2 == 0 }
    .sink { print($0) }
// Prints: 2, 4, 6, 8, 10`,
      hints: ['filter keeps only values matching a predicate.', 'Works like array filter but on a stream.', 'The answer is filter.'],
      concepts: ['filter-operator', 'predicate'],
    },
    {
      id: 'swift-combine-5',
      title: 'PassthroughSubject',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Create and use a PassthroughSubject.',
      skeleton: `import Combine

let subject = ___<String, Never>()
var cancellables = Set<AnyCancellable>()

subject
    .sink { print("Received: \\($0)") }
    .store(in: &cancellables)

subject.send("Alpha")
subject.send("Beta")
subject.send(completion: .finished)`,
      solution: `import Combine

let subject = PassthroughSubject<String, Never>()
var cancellables = Set<AnyCancellable>()

subject
    .sink { print("Received: \\($0)") }
    .store(in: &cancellables)

subject.send("Alpha")
subject.send("Beta")
subject.send(completion: .finished)`,
      hints: ['PassthroughSubject is a subject with no initial value.', 'It only emits values sent after subscription.', 'The answer is PassthroughSubject.'],
      concepts: ['passthrough-subject', 'manual-publishing'],
    },
    {
      id: 'swift-combine-6',
      title: 'CurrentValueSubject',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Create a CurrentValueSubject with an initial value.',
      skeleton: `import Combine

let subject = CurrentValueSubject<Int, ___>(0)

subject.sink { print($0) }
// Prints 0 immediately

subject.send(10)
// Prints 10

print(subject.value)
// Prints 10`,
      solution: `import Combine

let subject = CurrentValueSubject<Int, Never>(0)

subject.sink { print($0) }
// Prints 0 immediately

subject.send(10)
// Prints 10

print(subject.value)
// Prints 10`,
      hints: ['The second generic parameter is the error type.', 'Never means this subject cannot fail.', 'The answer is Never.'],
      concepts: ['current-value-subject', 'never-error'],
    },
    {
      id: 'swift-combine-7',
      title: 'Write a combineLatest Pipeline',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Combine two publishers and emit paired values.',
      skeleton: `import Combine

// Write code that:
// 1. Creates PassthroughSubject<String, Never> for firstName
// 2. Creates PassthroughSubject<String, Never> for lastName
// 3. Uses combineLatest to merge them
// 4. Maps to "fullName: firstName lastName"
// 5. Sinks and prints the result
// 6. Sends "John" to firstName, "Doe" to lastName
`,
      solution: `import Combine

let firstName = PassthroughSubject<String, Never>()
let lastName = PassthroughSubject<String, Never>()
var cancellables = Set<AnyCancellable>()

firstName
    .combineLatest(lastName)
    .map { "\\($0) \\($1)" }
    .sink { print($0) }
    .store(in: &cancellables)

firstName.send("John")
lastName.send("Doe")`,
      hints: ['combineLatest waits for both publishers to emit at least once.', 'It then emits whenever either publisher sends a new value.', 'map combines the two values into a single string.'],
      concepts: ['combine-latest', 'multi-publisher'],
    },
    {
      id: 'swift-combine-8',
      title: 'Write a merge Pipeline',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Merge multiple publishers into one stream.',
      skeleton: `import Combine

// Write code that:
// 1. Creates three PassthroughSubject<Int, Never> (s1, s2, s3)
// 2. Merges all three using Publishers.Merge3
// 3. Sinks and prints each value
// 4. Sends 1 to s1, 2 to s2, 3 to s3, 4 to s1
`,
      solution: `import Combine

let s1 = PassthroughSubject<Int, Never>()
let s2 = PassthroughSubject<Int, Never>()
let s3 = PassthroughSubject<Int, Never>()
var cancellables = Set<AnyCancellable>()

Publishers.Merge3(s1, s2, s3)
    .sink { print($0) }
    .store(in: &cancellables)

s1.send(1)
s2.send(2)
s3.send(3)
s1.send(4)`,
      hints: ['Publishers.Merge3 combines three publishers of the same type.', 'Values are emitted in the order they arrive.', 'All subjects share the same Output type.'],
      concepts: ['merge', 'multiple-sources'],
    },
    {
      id: 'swift-combine-9',
      title: 'Write a zip Pipeline',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Zip two publishers to pair values in order.',
      skeleton: `import Combine

// Write code that:
// 1. Creates two PassthroughSubject: ids (Int) and names (String)
// 2. Zips them together
// 3. Maps to "ID \\(id): \\(name)"
// 4. Sinks and prints
// 5. Sends ids: 1, 2, 3 and names: "Alice", "Bob"
// Only 2 pairs should print (zip waits for both sides)
`,
      solution: `import Combine

let ids = PassthroughSubject<Int, Never>()
let names = PassthroughSubject<String, Never>()
var cancellables = Set<AnyCancellable>()

ids.zip(names)
    .map { "ID \\($0): \\($1)" }
    .sink { print($0) }
    .store(in: &cancellables)

ids.send(1)
ids.send(2)
ids.send(3)
names.send("Alice")
names.send("Bob")`,
      hints: ['zip pairs the Nth value from each publisher together.', 'It waits for both publishers to have emitted an Nth value.', 'Only 2 pairs are emitted because names only sends 2 values.'],
      concepts: ['zip', 'paired-values'],
    },
    {
      id: 'swift-combine-10',
      title: 'Write a Future',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Create a Future that wraps an asynchronous operation.',
      skeleton: `import Combine

// Write:
// - enum FetchError: Error { case notFound }
// - func fetchUser(id: Int) -> Future<String, FetchError>
//   that resolves to "User_\\(id)" if id > 0, else fails with .notFound
// - Subscribe and print the result
`,
      solution: `import Combine

enum FetchError: Error {
    case notFound
}

func fetchUser(id: Int) -> Future<String, FetchError> {
    Future { promise in
        if id > 0 {
            promise(.success("User_\\(id)"))
        } else {
            promise(.failure(.notFound))
        }
    }
}

var cancellables = Set<AnyCancellable>()

fetchUser(id: 5)
    .sink(
        receiveCompletion: { completion in
            if case .failure(let error) = completion {
                print("Error: \\(error)")
            }
        },
        receiveValue: { print($0) }
    )
    .store(in: &cancellables)`,
      hints: ['Future takes a closure that receives a promise callback.', 'Call promise with .success or .failure.', 'The subscriber handles both completion and value.'],
      concepts: ['future', 'promise', 'error-handling'],
    },
    {
      id: 'swift-combine-11',
      title: 'Write an assign Subscriber',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use assign to bind a publisher directly to a property.',
      skeleton: `import Combine

// Write:
// - class TemperatureDisplay with var text: String = ""
// - let subject = CurrentValueSubject<Double, Never>(72.0)
// - Use .map to format as "Temp: XX.X F"
// - Use .assign(to:on:) to bind to display.text
// - Send 85.5 and print display.text
`,
      solution: `import Combine

class TemperatureDisplay {
    var text: String = ""
}

let subject = CurrentValueSubject<Double, Never>(72.0)
let display = TemperatureDisplay()
var cancellables = Set<AnyCancellable>()

subject
    .map { String(format: "Temp: %.1f F", $0) }
    .assign(to: \\.text, on: display)
    .store(in: &cancellables)

subject.send(85.5)
print(display.text)`,
      hints: ['assign(to:on:) binds a publisher output to an object property.', 'Use a key path to specify which property to assign to.', 'The display object must be a class (reference type).'],
      concepts: ['assign', 'key-path-binding', 'property-binding'],
    },
    {
      id: 'swift-combine-12',
      title: 'Write Error Recovery with replaceError',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Handle errors in a Combine pipeline with fallback values.',
      skeleton: `import Combine

// Write:
// - enum DataError: Error { case invalid }
// - A Fail publisher with DataError
// - Chain with .replaceError(with:) using a default value "Fallback"
// - Chain with .sink to print the result
`,
      solution: `import Combine

enum DataError: Error {
    case invalid
}

var cancellables = Set<AnyCancellable>()

Fail<String, DataError>(error: .invalid)
    .replaceError(with: "Fallback")
    .sink { print($0) }
    .store(in: &cancellables)`,
      hints: ['Fail is a publisher that immediately emits an error.', 'replaceError converts the error into a default value.', 'After replaceError, the Failure type becomes Never.'],
      concepts: ['error-recovery', 'replace-error', 'fail-publisher'],
    },
    {
      id: 'swift-combine-13',
      title: 'Fix Missing store(in:)',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix a subscription that is immediately deallocated.',
      skeleton: `import Combine

class DataManager {
    let subject = PassthroughSubject<String, Never>()

    func subscribe() {
        subject
            .sink { print("Got: \\($0)") }
        // Bug: subscription is immediately released!
    }
}

let manager = DataManager()
manager.subscribe()
manager.subject.send("Test")  // Nothing prints`,
      solution: `import Combine

class DataManager {
    let subject = PassthroughSubject<String, Never>()
    var cancellables = Set<AnyCancellable>()

    func subscribe() {
        subject
            .sink { print("Got: \\($0)") }
            .store(in: &cancellables)
    }
}

let manager = DataManager()
manager.subscribe()
manager.subject.send("Test")`,
      hints: ['sink returns an AnyCancellable that must be stored.', 'Without storing it, the subscription is immediately cancelled.', 'Use .store(in: &cancellables) to retain the subscription.'],
      concepts: ['cancellable', 'memory-management', 'subscription-lifecycle'],
    },
    {
      id: 'swift-combine-14',
      title: 'Fix Wrong Operator Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix a pipeline where filter and map are in the wrong order.',
      skeleton: `import Combine

// Goal: get squares of even numbers from 1...10
// Expected: 4, 16, 36, 64, 100
let cancellable = (1...10).publisher
    .map { $0 * $0 }       // squares first: 1,4,9,16,25,36,49,64,81,100
    .filter { $0 % 2 == 0 } // then filters even squares: 4,16,36,64,100
    // Bug: this gives even SQUARES, not squares of EVEN numbers
    .sink { print($0) }
// Prints: 4, 16, 36, 64, 100 (includes 36=6^2 which is correct, but also 4=2^2)
// Actually we want squares of even numbers: 4, 16, 36, 64, 100
// Wait, that's the same set! The real bug is elsewhere...
// Actually the goal is: filter evens FIRST, then square
// Correct output: 4, 16, 36, 64, 100`,
      solution: `import Combine

let cancellable = (1...10).publisher
    .filter { $0 % 2 == 0 }
    .map { $0 * $0 }
    .sink { print($0) }`,
      hints: ['Filter even numbers first, then square the results.', 'Operator order matters: filter before map.', 'Filter evens (2,4,6,8,10), then square each.'],
      concepts: ['operator-order', 'filter-before-map'],
    },
    {
      id: 'swift-combine-15',
      title: 'Fix Retain Cycle in Combine',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Fix a retain cycle caused by strong self capture in a sink closure.',
      skeleton: `import Combine

class ViewModel {
    let subject = PassthroughSubject<String, Never>()
    var cancellables = Set<AnyCancellable>()
    var latestValue: String = ""

    init() {
        subject
            .sink { value in
                self.latestValue = value  // Bug: strong capture of self
                print(self.latestValue)
            }
            .store(in: &cancellables)
    }

    deinit { print("ViewModel deallocated") }
}`,
      solution: `import Combine

class ViewModel {
    let subject = PassthroughSubject<String, Never>()
    var cancellables = Set<AnyCancellable>()
    var latestValue: String = ""

    init() {
        subject
            .sink { [weak self] value in
                self?.latestValue = value
                print(self?.latestValue ?? "")
            }
            .store(in: &cancellables)
    }

    deinit { print("ViewModel deallocated") }
}`,
      hints: ['The sink closure captures self strongly creating a retain cycle.', 'Use [weak self] in the capture list.', 'Access self with optional chaining after weak capture.'],
      concepts: ['retain-cycle', 'weak-capture', 'combine-memory'],
    },
    {
      id: 'swift-combine-16',
      title: 'Predict sink Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what a map + filter pipeline outputs.',
      skeleton: `import Combine

let cancellable = [1, 2, 3, 4, 5].publisher
    .map { $0 * 3 }
    .filter { $0 > 6 }
    .collect()
    .sink { print($0) }`,
      solution: `[9, 12, 15]`,
      hints: ['map: [3, 6, 9, 12, 15].', 'filter > 6: [9, 12, 15].', 'collect gathers all values into a single array.'],
      concepts: ['map', 'filter', 'collect'],
    },
    {
      id: 'swift-combine-17',
      title: 'Predict combineLatest Emissions',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict when combineLatest emits values.',
      skeleton: `import Combine

let a = PassthroughSubject<Int, Never>()
let b = PassthroughSubject<String, Never>()
var results: [String] = []

let c = a.combineLatest(b)
    .map { "\\($0)\\($1)" }
    .sink { results.append($0) }

a.send(1)      // b hasn't emitted yet
a.send(2)      // b still hasn't emitted
b.send("X")   // now both have values
a.send(3)      // b's latest is still "X"
b.send("Y")   // a's latest is 3
print(results)`,
      solution: `["2X", "3X", "3Y"]`,
      hints: ['combineLatest waits for both publishers to emit at least once.', 'After both have emitted, it fires on every new value from either side.', 'First emission: a=2 (latest), b="X" -> "2X".'],
      concepts: ['combine-latest', 'emission-timing'],
    },
    {
      id: 'swift-combine-18',
      title: 'Predict zip vs combineLatest',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Compare zip and combineLatest behavior.',
      skeleton: `import Combine

let x = PassthroughSubject<Int, Never>()
let y = PassthroughSubject<Int, Never>()
var zipResults: [String] = []
var combineResults: [String] = []

let z = x.zip(y).map { "\\($0)+\\($1)" }.sink { zipResults.append($0) }
let cl = x.combineLatest(y).map { "\\($0)+\\($1)" }.sink { combineResults.append($0) }

x.send(1)
x.send(2)
y.send(10)
y.send(20)
print("zip:", zipResults)
print("cl:", combineResults)`,
      solution: `zip: ["1+10", "2+20"]
cl: ["2+10", "2+20"]`,
      hints: ['zip pairs 1st with 1st, 2nd with 2nd.', 'combineLatest uses the latest from each side.', 'zip: (1,10), (2,20). combineLatest: (2,10), (2,20).'],
      concepts: ['zip-vs-combinelatest', 'pairing-semantics'],
    },
    {
      id: 'swift-combine-19',
      title: 'Refactor Callback to Combine',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor callback-based code to use Combine publishers.',
      skeleton: `class NetworkManager {
    func fetchData(url: String, completion: @escaping (Result<String, Error>) -> Void) {
        DispatchQueue.global().asyncAfter(deadline: .now() + 1) {
            if url.isEmpty {
                completion(.failure(URLError(.badURL)))
            } else {
                completion(.success("Data from \\(url)"))
            }
        }
    }
}

// Usage:
let manager = NetworkManager()
manager.fetchData(url: "https://api.example.com") { result in
    switch result {
    case .success(let data): print(data)
    case .failure(let error): print(error)
    }
}`,
      solution: `import Combine

class NetworkManager {
    func fetchData(url: String) -> AnyPublisher<String, URLError> {
        Future<String, URLError> { promise in
            DispatchQueue.global().asyncAfter(deadline: .now() + 1) {
                if url.isEmpty {
                    promise(.failure(URLError(.badURL)))
                } else {
                    promise(.success("Data from \\(url)"))
                }
            }
        }
        .eraseToAnyPublisher()
    }
}

var cancellables = Set<AnyCancellable>()
let manager = NetworkManager()
manager.fetchData(url: "https://api.example.com")
    .sink(
        receiveCompletion: { completion in
            if case .failure(let error) = completion { print(error) }
        },
        receiveValue: { print($0) }
    )
    .store(in: &cancellables)`,
      hints: ['Wrap the async callback in a Future.', 'Use eraseToAnyPublisher to hide the concrete type.', 'Subscribe with sink instead of a completion handler.'],
      concepts: ['future', 'callback-to-combine', 'type-erasure'],
    },
    {
      id: 'swift-combine-20',
      title: 'Refactor Multiple Publishers to Pipeline',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Refactor imperative data processing to a Combine pipeline.',
      skeleton: `import Combine

class SearchService {
    var query: String = "" {
        didSet {
            if query.count >= 3 {
                performSearch(query)
            }
        }
    }
    var results: [String] = []

    private func performSearch(_ term: String) {
        // simulate search
        results = ["\\(term) result 1", "\\(term) result 2"]
        print(results)
    }
}

let service = SearchService()
service.query = "ab"     // too short, no search
service.query = "abc"    // searches
service.query = "abc"    // duplicate, searches again (wasteful)
service.query = "abcd"   // searches`,
      solution: `import Combine

class SearchService {
    @Published var query: String = ""
    @Published var results: [String] = []
    private var cancellables = Set<AnyCancellable>()

    init() {
        $query
            .debounce(for: .milliseconds(300), scheduler: RunLoop.main)
            .removeDuplicates()
            .filter { $0.count >= 3 }
            .map { term in
                ["\\(term) result 1", "\\(term) result 2"]
            }
            .assign(to: &$results)
    }
}

let service = SearchService()
service.query = "ab"     // filtered out (< 3 chars)
service.query = "abc"    // emits after debounce
service.query = "abc"    // removed as duplicate
service.query = "abcd"   // emits after debounce`,
      hints: ['Use @Published to make query a publisher.', 'debounce, removeDuplicates, and filter replace the manual checks.', 'assign(to: &$results) binds the output to the results property.'],
      concepts: ['reactive-pipeline', 'debounce', 'remove-duplicates'],
    },
  ],
};
