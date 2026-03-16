import type { Track } from '../../stores/app.svelte.ts';

export const track: Track = {
  id: 'swift',
  name: 'Swift',
  language: 'swift',
  monacoLang: 'swift',
  icon: '🐦',
  description: 'Safe, fast, and expressive. iOS, macOS, and server-side development.',
  sections: [
    // ─── Section 1: Variables & Types ─────────────
    {
      id: 'sw-variables',
      title: '1. Variables & Types',
      explanation: `## Variables & Types

Swift is a type-safe language with powerful type inference. There are two ways to declare variables:

\`\`\`swift
let name = "Zan"           // constant (immutable) - prefer this!
var score = 0              // variable (mutable) - only when needed
score += 10                // ok, score is var
// name = "Bob"            // ERROR: let is immutable
\`\`\`

**Type annotations are optional** when Swift can infer the type:
\`\`\`swift
let age: Int = 25          // explicit type
let pi: Double = 3.14159
let isOnline: Bool = true
let label: String = "server"
\`\`\`

**Optionals** handle the absence of a value (Swift has no null):
\`\`\`swift
var nickname: String? = nil    // Optional String, currently empty
nickname = "Z"

// Unwrap safely with if let
if let name = nickname {
    print("Hi, \\(name)")      // only runs if nickname has a value
}

// Nil-coalescing operator
let display = nickname ?? "Anonymous"
\`\`\`

**String interpolation** uses \\(...):
\`\`\`swift
let host = "rocky"
let port = 4200
print("Connecting to \\(host):\\(port)")
\`\`\``,
      exercises: [
        {
          id: 'sw-var-1',
          title: 'Let, Var & Types',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'swift',
          goal: 'Declare constants and variables with correct keywords and types.',
          skeleton: `// Constant string (cannot change)
__BLANK__ serverName: String = "rocky"

// Mutable integer (will change)
__BLANK__ connectionCount: __BLANK__ = 0

// Increment the count
connectionCount __BLANK__ 1

// Type inference - Swift figures out the type
__BLANK__ isOnline = true

// String interpolation
let status = "\\(__BLANK__) has \\(connectionCount) connections"
print(status)`,
          solution: `let serverName: String = "rocky"

var connectionCount: Int = 0

connectionCount += 1

let isOnline = true

let status = "\\(serverName) has \\(connectionCount) connections"
print(status)`,
          hints: [
            '`let` declares an immutable constant. `var` declares a mutable variable that can be reassigned.',
            'Integer type in Swift is `Int`. The `+=` operator adds and assigns.',
            '`let`, `var`, `Int`, `+=`, `let`, `serverName`.',
          ],
          concepts: ['let', 'var', 'Int', 'String', 'Bool', 'type inference', 'string interpolation'],
        },
        {
          id: 'sw-var-2',
          title: 'Optionals & Unwrapping',
          type: 'fix-bug',
          difficulty: 'beginner',
          language: 'swift',
          goal: 'Fix the code so it safely handles optional values instead of force-unwrapping, which crashes on nil.',
          skeleton: `func findServer(name: String) -> String? {
    let servers = ["rocky": "192.168.8.133", "pangolin": "46.225.188.154"]
    return servers[name]
}

let ip1 = findServer(name: "rocky")
// BUG: Force unwrap crashes if the value is nil
print("Server IP: \\(ip1!)")

let ip2 = findServer(name: "unknown")
// BUG: This will crash! ip2 is nil
print("Server IP: \\(ip2!)")

// BUG: Should provide a default instead of crashing
let displayIP = ip2!
print("Display: \\(displayIP)")`,
          solution: `func findServer(name: String) -> String? {
    let servers = ["rocky": "192.168.8.133", "pangolin": "46.225.188.154"]
    return servers[name]
}

let ip1 = findServer(name: "rocky")
if let addr = ip1 {
    print("Server IP: \\(addr)")
}

let ip2 = findServer(name: "unknown")
if let addr = ip2 {
    print("Server IP: \\(addr)")
} else {
    print("Server not found")
}

let displayIP = ip2 ?? "0.0.0.0"
print("Display: \\(displayIP)")`,
          hints: [
            'Never use `!` to force-unwrap unless you are 100% certain the value exists. Use `if let` for safe unwrapping.',
            '`if let addr = ip1 { ... }` only enters the block if `ip1` has a value, binding it to `addr`.',
            'The nil-coalescing operator `??` provides a default: `ip2 ?? "0.0.0.0"` returns the left side if non-nil, otherwise the right.',
          ],
          concepts: ['Optional', 'if let', 'nil', 'force unwrap', 'nil-coalescing ??', 'safe unwrapping'],
        },
        {
          id: 'sw-var-3',
          title: 'Type Safety in Action',
          type: 'predict-output',
          difficulty: 'beginner',
          language: 'swift',
          goal: 'Read the code and predict what it prints. Pay attention to how Swift handles type conversions and optionals.',
          skeleton: `let width: Int = 10
let height: Double = 3.5
let area = Double(width) * height
print("Area: \\(area)")

let input: String? = "42"
let parsed = Int(input!) ?? 0
let doubled = parsed * 2
print("Doubled: \\(doubled)")

var names: [String] = ["rocky", "pangolin"]
names.append("forge")
print("Count: \\(names.count)")
print("First: \\(names.first ?? "none")")

// What does this program print?
// Line 1: ???
// Line 2: ???
// Line 3: ???
// Line 4: ???`,
          solution: `let width: Int = 10
let height: Double = 3.5
let area = Double(width) * height
print("Area: \\(area)")

let input: String? = "42"
let parsed = Int(input!) ?? 0
let doubled = parsed * 2
print("Doubled: \\(doubled)")

var names: [String] = ["rocky", "pangolin"]
names.append("forge")
print("Count: \\(names.count)")
print("First: \\(names.first ?? "none")")

// Line 1: Area: 35.0
// Line 2: Doubled: 84
// Line 3: Count: 3
// Line 4: First: rocky`,
          hints: [
            '`Double(width)` converts Int to Double. 10.0 * 3.5 = 35.0. Swift requires explicit numeric conversion.',
            '`Int("42")` returns Optional(42). `?? 0` unwraps it. 42 * 2 = 84.',
            'After appending "forge", the array has 3 elements. `.first` returns an Optional, so `?? "none"` is the fallback.',
          ],
          concepts: ['type conversion', 'Double()', 'Int()', 'Optional chaining', 'Array.count', 'Array.first'],
        },
      ],
    },

    // ─── Section 2: Functions & Closures ──────────
    {
      id: 'sw-functions',
      title: '2. Functions & Closures',
      explanation: `## Functions & Closures

Swift functions use argument labels for readability at the call site:

\`\`\`swift
func greet(person name: String, from city: String) -> String {
    return "Hello \\(name) from \\(city)!"
}
greet(person: "Zan", from: "Home")   // reads like English
\`\`\`

**Default values and omitting labels:**
\`\`\`swift
func connect(to host: String, port: Int = 8080) -> String {
    return "\\(host):\\(port)"
}
connect(to: "rocky")            // uses default port
connect(to: "rocky", port: 4200)

func add(_ a: Int, _ b: Int) -> Int {  // _ omits the label
    return a + b
}
add(3, 5)                       // no labels needed
\`\`\`

**Closures** are anonymous functions (like arrow functions in JS):
\`\`\`swift
let double = { (n: Int) -> Int in
    return n * 2
}
double(5)    // 10

// Shorthand with $0, $1 for params:
let nums = [3, 1, 4, 1, 5]
let sorted = nums.sorted { $0 < $1 }    // [1, 1, 3, 4, 5]
\`\`\`

**Trailing closure syntax** -- when the last parameter is a closure, you can write it after the parentheses:
\`\`\`swift
let evens = nums.filter { $0 % 2 == 0 }
let doubled = nums.map { $0 * 2 }
\`\`\``,
      exercises: [
        {
          id: 'sw-fn-1',
          title: 'Functions & Argument Labels',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'swift',
          goal: 'Complete the function declarations using Swift argument labels and default parameters.',
          skeleton: `// Function with argument labels: external "from" / internal "source"
func fetchData(__BLANK__ source: String, timeout: __BLANK__ = 30) -> String {
    return "Fetching \\(source) with \\(timeout)s timeout"
}

// Call with argument labels
let result1 = fetchData(__BLANK__: "rocky", timeout: 10)
let result2 = fetchData(from: "pangolin")  // uses default timeout

// Function with no external label (underscore)
func square(__BLANK__ n: Int) -> Int {
    __BLANK__ n * n
}

let val = square(__BLANK__)

print(result1)
print(result2)
print("9 squared = \\(val)")`,
          solution: `func fetchData(from source: String, timeout: Int = 30) -> String {
    return "Fetching \\(source) with \\(timeout)s timeout"
}

let result1 = fetchData(from: "rocky", timeout: 10)
let result2 = fetchData(from: "pangolin")

func square(_ n: Int) -> Int {
    return n * n
}

let val = square(9)

print(result1)
print(result2)
print("9 squared = \\(val)")`,
          hints: [
            '`from` is the argument label used at the call site. `source` is the internal name used inside the function body.',
            'The `_` before a parameter name omits the label, so callers write `square(9)` instead of `square(n: 9)`.',
            '`from`, `Int`, `from`, `_`, `return`, `9`.',
          ],
          concepts: ['argument labels', 'default parameters', 'underscore label', 'return', 'func'],
        },
        {
          id: 'sw-fn-2',
          title: 'Closures & Higher-Order Functions',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'swift',
          goal: 'Write a function `processServers` that takes an array of server name strings and a closure that transforms each name. Return the transformed array. Then use it with trailing closure syntax to uppercase all names and add a "-prod" suffix.',
          skeleton: `// Write the processServers function here
// It takes [String] and a closure (String) -> String, returns [String]


// Use it here:
let servers = ["rocky", "pangolin", "forge"]

// Call processServers with trailing closure syntax
// Transform: uppercase + "-prod" suffix
// e.g. "rocky" -> "ROCKY-prod"
let production = /* your call here */

for name in production {
    print(name)
}
// Should print:
// ROCKY-prod
// PANGOLIN-prod
// FORGE-prod`,
          solution: `func processServers(_ servers: [String], transform: (String) -> String) -> [String] {
    var result: [String] = []
    for server in servers {
        result.append(transform(server))
    }
    return result
}

let servers = ["rocky", "pangolin", "forge"]

let production = processServers(servers) { name in
    return name.uppercased() + "-prod"
}

for name in production {
    print(name)
}`,
          hints: [
            'The function signature: `func processServers(_ servers: [String], transform: (String) -> String) -> [String]`.',
            'Inside the function, loop through servers, call `transform(server)` on each, and collect results.',
            'Trailing closure syntax: `processServers(servers) { name in name.uppercased() + "-prod" }`.',
          ],
          concepts: ['closures', 'higher-order functions', 'trailing closure syntax', 'uppercased()', '(String) -> String'],
        },
        {
          id: 'sw-fn-3',
          title: 'Closure Shorthand & Chaining',
          type: 'refactor',
          difficulty: 'intermediate',
          language: 'swift',
          goal: 'This code uses verbose loops to filter and transform data. Refactor it to use map, filter, and reduce with trailing closure syntax and shorthand argument names ($0).',
          skeleton: `let ports = [80, 443, 4200, 8080, 3000, 22, 8443, 9090]

// Verbose: filter ports > 1000, double them, then sum
var highPorts: [Int] = []
for port in ports {
    if port > 1000 {
        highPorts.append(port)
    }
}

var doubled: [Int] = []
for port in highPorts {
    doubled.append(port * 2)
}

var total = 0
for port in doubled {
    total += port
}

print("High ports doubled sum: \\(total)")

// Verbose: build a comma-separated string of server names
let names = ["rocky", "pangolin", "forge", "bav"]
var csv = ""
for (index, name) in names.enumerated() {
    if index > 0 {
        csv += ", "
    }
    csv += name.uppercased()
}

print("Servers: \\(csv)")`,
          solution: `let ports = [80, 443, 4200, 8080, 3000, 22, 8443, 9090]

let total = ports
    .filter { $0 > 1000 }
    .map { $0 * 2 }
    .reduce(0) { $0 + $1 }

print("High ports doubled sum: \\(total)")

let names = ["rocky", "pangolin", "forge", "bav"]

let csv = names
    .map { $0.uppercased() }
    .joined(separator: ", ")

print("Servers: \\(csv)")`,
          hints: [
            'Chain `.filter { $0 > 1000 }` to keep ports above 1000, then `.map { $0 * 2 }` to double them.',
            '`.reduce(0) { $0 + $1 }` starts at 0 and adds each element. `$0` is the accumulator, `$1` is the current value.',
            'For the CSV, use `.map { $0.uppercased() }.joined(separator: ", ")` to combine strings with a delimiter.',
          ],
          concepts: ['filter', 'map', 'reduce', 'joined(separator:)', '$0 shorthand', 'method chaining'],
        },
      ],
    },

    // ─── Section 3: Collections ──────────────────
    {
      id: 'sw-collections',
      title: '3. Collections',
      explanation: `## Collections

Swift has three primary collection types, all generic and type-safe:

**Array** -- ordered, indexed, allows duplicates:
\`\`\`swift
var servers: [String] = ["rocky", "pangolin"]
servers.append("forge")
servers.insert("bav", at: 1)
let first = servers[0]             // "rocky"
let count = servers.count          // 4
let hasRocky = servers.contains("rocky")  // true
\`\`\`

**Dictionary** -- key-value pairs, unordered:
\`\`\`swift
var ports: [String: Int] = [
    "rocky": 4200,
    "pangolin": 443,
]
ports["forge"] = 8080              // add entry
let p = ports["rocky"]             // Optional(4200)
let p2 = ports["unknown"] ?? 80   // 80 (default)

for (server, port) in ports {
    print("\\(server): \\(port)")
}
\`\`\`

**Set** -- unordered, unique values only:
\`\`\`swift
var tags: Set<String> = ["web", "api", "db"]
tags.insert("cache")
tags.remove("db")
let hasWeb = tags.contains("web")  // true

// Set operations
let frontend: Set = ["html", "css", "js"]
let backend: Set = ["js", "python", "go"]
let shared = frontend.intersection(backend)  // {"js"}
let all = frontend.union(backend)
\`\`\`

**Higher-order functions** work on all collections:
\`\`\`swift
let doubled = [1, 2, 3].map { $0 * 2 }        // [2, 4, 6]
let evens = [1, 2, 3, 4].filter { $0 % 2 == 0 }  // [2, 4]
let sum = [1, 2, 3].reduce(0, +)              // 6
let sorted = ["c", "a", "b"].sorted()         // ["a", "b", "c"]
\`\`\``,
      exercises: [
        {
          id: 'sw-col-1',
          title: 'Array & Dictionary Basics',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'swift',
          goal: 'Work with Arrays and Dictionaries using Swift\'s collection APIs.',
          skeleton: `// Create a mutable array of server names
__BLANK__ servers: [String] = ["rocky", "pangolin"]

// Add a new server
servers.__BLANK__("forge")

// Create a dictionary mapping server names to ports
var ports: [__BLANK__: __BLANK__] = [
    "rocky": 4200,
    "pangolin": 443,
]

// Add a new entry
ports[__BLANK__] = 8080

// Safe dictionary access with default
let rockyPort = ports["rocky"] __BLANK__ 0

// Iterate and print
for server in servers {
    let port = ports[server] ?? 80
    print("\\(server): \\(port)")
}

print("Total servers: \\(servers.__BLANK__)")`,
          solution: `var servers: [String] = ["rocky", "pangolin"]

servers.append("forge")

var ports: [String: Int] = [
    "rocky": 4200,
    "pangolin": 443,
]

ports["forge"] = 8080

let rockyPort = ports["rocky"] ?? 0

for server in servers {
    let port = ports[server] ?? 80
    print("\\(server): \\(port)")
}

print("Total servers: \\(servers.count)")`,
          hints: [
            '`var` makes the array mutable. `.append()` adds to the end of an array.',
            'Dictionary type is `[String: Int]`. Access and assign with subscript: `ports["forge"] = 8080`.',
            '`??` is nil-coalescing for safe dictionary access. `.count` returns the number of elements.',
          ],
          concepts: ['Array', 'Dictionary', 'append', 'subscript', 'nil-coalescing', 'count', 'for-in'],
        },
        {
          id: 'sw-col-2',
          title: 'Set Operations',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'swift',
          goal: 'Write a function `analyzeServices` that takes two Sets of service names (running services and required services) and returns a tuple with three Sets: (missing: services required but not running, extra: services running but not required, healthy: services both running and required).',
          skeleton: `// Write the analyzeServices function here
// Input: running: Set<String>, required: Set<String>
// Output: (missing: Set<String>, extra: Set<String>, healthy: Set<String>)


let running: Set<String> = ["nginx", "postgres", "redis", "synapse"]
let required: Set<String> = ["nginx", "postgres", "engram", "synapse"]

let result = analyzeServices(running: running, required: required)

print("Missing: \\(result.missing.sorted())")
print("Extra: \\(result.extra.sorted())")
print("Healthy: \\(result.healthy.sorted())")
// Missing: ["engram"]
// Extra: ["redis"]
// Healthy: ["nginx", "postgres", "synapse"]`,
          solution: `func analyzeServices(running: Set<String>, required: Set<String>) -> (missing: Set<String>, extra: Set<String>, healthy: Set<String>) {
    let missing = required.subtracting(running)
    let extra = running.subtracting(required)
    let healthy = running.intersection(required)
    return (missing: missing, extra: extra, healthy: healthy)
}

let running: Set<String> = ["nginx", "postgres", "redis", "synapse"]
let required: Set<String> = ["nginx", "postgres", "engram", "synapse"]

let result = analyzeServices(running: running, required: required)

print("Missing: \\(result.missing.sorted())")
print("Extra: \\(result.extra.sorted())")
print("Healthy: \\(result.healthy.sorted())")`,
          hints: [
            'Named tuple return type: `(missing: Set<String>, extra: Set<String>, healthy: Set<String>)`.',
            '`.subtracting()` returns elements in one set but not the other. `.intersection()` returns elements in both.',
            'Missing = required.subtracting(running). Extra = running.subtracting(required). Healthy = running.intersection(required).',
          ],
          concepts: ['Set', 'subtracting', 'intersection', 'named tuples', 'sorted()', 'Set<String>'],
        },
        {
          id: 'sw-col-3',
          title: 'Collection Pipelines',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'swift',
          goal: 'Write a function `serverReport` that takes an array of tuples (name: String, uptime: Double) where uptime is a percentage 0-100. Return a formatted string report: list only servers with uptime below 99.9%, sorted by uptime ascending, formatted as "name: uptime%". Join lines with newline characters.',
          skeleton: `// Write the serverReport function here


let servers: [(name: String, uptime: Double)] = [
    (name: "rocky", uptime: 99.95),
    (name: "pangolin", uptime: 98.5),
    (name: "forge", uptime: 100.0),
    (name: "bav-apps", uptime: 97.2),
    (name: "bav-edge", uptime: 99.99),
    (name: "mindset", uptime: 95.8),
]

print(serverReport(servers))
// Should print (sorted by uptime ascending):
// mindset: 95.8%
// bav-apps: 97.2%
// pangolin: 98.5%`,
          solution: `func serverReport(_ servers: [(name: String, uptime: Double)]) -> String {
    return servers
        .filter { $0.uptime < 99.9 }
        .sorted { $0.uptime < $1.uptime }
        .map { "\\($0.name): \\($0.uptime)%" }
        .joined(separator: "\\n")
}

let servers: [(name: String, uptime: Double)] = [
    (name: "rocky", uptime: 99.95),
    (name: "pangolin", uptime: 98.5),
    (name: "forge", uptime: 100.0),
    (name: "bav-apps", uptime: 97.2),
    (name: "bav-edge", uptime: 99.99),
    (name: "mindset", uptime: 95.8),
]

print(serverReport(servers))`,
          hints: [
            'Chain `.filter { $0.uptime < 99.9 }` to keep only servers below the threshold.',
            '`.sorted { $0.uptime < $1.uptime }` sorts ascending. `.map { ... }` formats each entry as a string.',
            '`.joined(separator: "\\n")` combines the string array into a single multi-line string.',
          ],
          concepts: ['filter', 'sorted', 'map', 'joined', 'named tuples', 'method chaining', 'String interpolation'],
        },
      ],
    },

    // ─── Section 4: Structs & Enums ──────────────
    {
      id: 'sw-structs',
      title: '4. Structs & Enums',
      explanation: `## Structs & Enums

**Structs** are value types (copied on assignment). This is the default choice for modeling data in Swift:

\`\`\`swift
struct Server {
    let name: String
    var port: Int
    var isOnline: Bool

    // Computed property
    var address: String {
        return "\\(name):\\(port)"
    }

    // Mutating method (can modify self)
    mutating func takeOffline() {
        isOnline = false
    }
}

var srv = Server(name: "rocky", port: 4200, isOnline: true)
print(srv.address)     // "rocky:4200"
srv.takeOffline()      // modifies the struct
\`\`\`

Structs get a free **memberwise initializer**. Classes don't.

**Structs vs Classes:**
- Structs are **value types** (copied). Classes are **reference types** (shared).
- Prefer structs unless you need inheritance or shared mutable state.

**Enums** can carry associated values (like Rust enums):
\`\`\`swift
enum NetworkError {
    case timeout(seconds: Int)
    case notFound(url: String)
    case serverError(code: Int, message: String)
    case offline
}

let err = NetworkError.timeout(seconds: 30)

switch err {
case .timeout(let secs):
    print("Timed out after \\(secs)s")
case .notFound(let url):
    print("Not found: \\(url)")
case .serverError(let code, let msg):
    print("\\(code): \\(msg)")
case .offline:
    print("No network connection")
}
\`\`\`

Enums can also have **raw values** and **methods**:
\`\`\`swift
enum Priority: Int {
    case low = 1
    case medium = 2
    case high = 3
}
let p = Priority.high
print(p.rawValue)    // 3
\`\`\``,
      exercises: [
        {
          id: 'sw-struct-1',
          title: 'Define a Struct',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'swift',
          goal: 'Define a Config struct with properties, a computed property, and a mutating method.',
          skeleton: `__BLANK__ Config {
    let host: String
    __BLANK__ port: Int
    var debug: __BLANK__

    // Computed property: returns "host:port"
    var address: __BLANK__ {
        return "\\(host):\\(port)"
    }

    // Method that formats a display string
    func display() -> String {
        let mode = debug ? "DEBUG" : "PROD"
        return "\\(address) [\\(mode)]"
    }

    // Mutating method: toggle debug mode
    __BLANK__ func toggleDebug() {
        debug = __BLANK__
    }
}

var cfg = Config(host: "0.0.0.0", port: 4200, debug: true)
print(cfg.display())     // 0.0.0.0:4200 [DEBUG]
cfg.__BLANK__()
print(cfg.display())     // 0.0.0.0:4200 [PROD]`,
          solution: `struct Config {
    let host: String
    var port: Int
    var debug: Bool

    var address: String {
        return "\\(host):\\(port)"
    }

    func display() -> String {
        let mode = debug ? "DEBUG" : "PROD"
        return "\\(address) [\\(mode)]"
    }

    mutating func toggleDebug() {
        debug = !debug
    }
}

var cfg = Config(host: "0.0.0.0", port: 4200, debug: true)
print(cfg.display())
cfg.toggleDebug()
print(cfg.display())`,
          hints: [
            '`struct` keyword defines a value type. Use `var` for mutable properties, `let` for immutable ones.',
            'Computed properties use `var name: Type { return ... }`. Methods that modify `self` must be marked `mutating`.',
            '`struct`, `var`, `Bool`, `String`, `mutating`, `!debug`, `toggleDebug`.',
          ],
          concepts: ['struct', 'computed property', 'mutating', 'memberwise initializer', 'Bool', 'ternary operator'],
        },
        {
          id: 'sw-struct-2',
          title: 'Enums with Associated Values',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'swift',
          goal: 'Define an enum `TaskStatus` with cases: pending (no data), running (with progress as Double, 0.0-1.0), completed (with result as String), and failed (with error as String). Then write a function `describe` that takes a TaskStatus and returns a human-readable description.',
          skeleton: `// Define the TaskStatus enum here


// Write the describe function here


// Test it:
let tasks: [TaskStatus] = [
    .pending,
    .running(progress: 0.75),
    .completed(result: "Built successfully"),
    .failed(error: "Disk full"),
]

for task in tasks {
    print(describe(task))
}
// Should print:
// Pending: waiting to start
// Running: 75.0% complete
// Completed: Built successfully
// Failed: Disk full`,
          solution: `enum TaskStatus {
    case pending
    case running(progress: Double)
    case completed(result: String)
    case failed(error: String)
}

func describe(_ status: TaskStatus) -> String {
    switch status {
    case .pending:
        return "Pending: waiting to start"
    case .running(let progress):
        return "Running: \\(progress * 100.0)% complete"
    case .completed(let result):
        return "Completed: \\(result)"
    case .failed(let error):
        return "Failed: \\(error)"
    }
}

let tasks: [TaskStatus] = [
    .pending,
    .running(progress: 0.75),
    .completed(result: "Built successfully"),
    .failed(error: "Disk full"),
]

for task in tasks {
    print(describe(task))
}`,
          hints: [
            'Enum cases with data: `case running(progress: Double)`. Cases without data: `case pending`.',
            'Use `switch status { case .pending: ... case .running(let progress): ... }` to match and extract values.',
            'Multiply progress by 100.0 for the percentage. Use string interpolation for the output.',
          ],
          concepts: ['enum', 'associated values', 'switch', 'pattern matching', 'case let', 'String interpolation'],
        },
        {
          id: 'sw-struct-3',
          title: 'Struct Methods & Value Semantics',
          type: 'predict-output',
          difficulty: 'intermediate',
          language: 'swift',
          goal: 'Read the code carefully and predict the output. Pay close attention to value semantics -- structs are copied on assignment.',
          skeleton: `struct Counter {
    var value: Int = 0

    mutating func increment(by amount: Int = 1) {
        value += amount
    }

    func doubled() -> Counter {
        return Counter(value: value * 2)
    }
}

var a = Counter()
a.increment()
a.increment(by: 5)
print("a: \\(a.value)")

var b = a              // copy!
b.increment(by: 10)
print("b: \\(b.value)")
print("a: \\(a.value)")

let c = a.doubled()
print("c: \\(c.value)")

// What does this print?
// Line 1: a: ???
// Line 2: b: ???
// Line 3: a: ???
// Line 4: c: ???`,
          solution: `struct Counter {
    var value: Int = 0

    mutating func increment(by amount: Int = 1) {
        value += amount
    }

    func doubled() -> Counter {
        return Counter(value: value * 2)
    }
}

var a = Counter()
a.increment()
a.increment(by: 5)
print("a: \\(a.value)")

var b = a
b.increment(by: 10)
print("b: \\(b.value)")
print("a: \\(a.value)")

let c = a.doubled()
print("c: \\(c.value)")

// Line 1: a: 6
// Line 2: b: 16
// Line 3: a: 6
// Line 4: c: 12`,
          hints: [
            '`a` starts at 0, increments by 1 (now 1), then by 5 (now 6). First print: a = 6.',
            '`var b = a` copies the struct. b starts at 6, increments by 10 = 16. But a is still 6 (value semantics!).',
            '`a.doubled()` returns a new Counter with value 6 * 2 = 12. Structs are independent copies.',
          ],
          concepts: ['value semantics', 'struct copy', 'mutating method', 'default parameter', 'let vs var struct'],
        },
      ],
    },

    // ─── Section 5: Protocols & Extensions ───────
    {
      id: 'sw-protocols',
      title: '5. Protocols & Extensions',
      explanation: `## Protocols & Extensions

**Protocols** define a blueprint of methods and properties (like interfaces in TypeScript):

\`\`\`swift
protocol Describable {
    var description: String { get }
    func summary() -> String
}
\`\`\`

Types **conform** to protocols by implementing the requirements:
\`\`\`swift
struct Server: Describable {
    let name: String
    let port: Int

    var description: String {
        return "\\(name):\\(port)"
    }

    func summary() -> String {
        return "Server \\(name) on port \\(port)"
    }
}
\`\`\`

**Extensions** add new functionality to existing types -- even types you don't own:
\`\`\`swift
extension String {
    var isBlank: Bool {
        return trimingCharacters(in: .whitespaces).isEmpty
    }

    func repeated(_ times: Int) -> String {
        return String(repeating: self, count: times)
    }
}

"   ".isBlank      // true
"ha".repeated(3)   // "hahaha"
\`\`\`

**Protocol extensions** provide default implementations (protocol-oriented programming):
\`\`\`swift
protocol Loggable {
    var logPrefix: String { get }
}

extension Loggable {
    func log(_ message: String) {
        print("[\\(logPrefix)] \\(message)")
    }
}

// Any type conforming to Loggable gets log() for free!
struct AppLogger: Loggable {
    var logPrefix: String { return "APP" }
}
AppLogger().log("Started")  // [APP] Started
\`\`\`

This is **protocol-oriented programming**: define behavior in protocols, provide defaults via extensions, compose capabilities.`,
      exercises: [
        {
          id: 'sw-proto-1',
          title: 'Protocols & Conformance',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'swift',
          goal: 'Define a protocol `Configurable` with a `var name: String { get }`, a `var isValid: Bool { get }`, and a `func configString() -> String` method. Then create two structs that conform to it: `DatabaseConfig` (with host, port, dbName) and `CacheConfig` (with host, port, maxMemoryMB). A DatabaseConfig is valid if port > 0 and dbName is not empty. A CacheConfig is valid if maxMemoryMB > 0. configString should return a key=value format.',
          skeleton: `// Define the Configurable protocol here


// Define DatabaseConfig struct conforming to Configurable


// Define CacheConfig struct conforming to Configurable


// This function works with ANY Configurable
func printConfig(_ config: Configurable) {
    let status = config.isValid ? "VALID" : "INVALID"
    print("[\\(status)] \\(config.name)")
    print(config.configString())
    print("")
}

let db = DatabaseConfig(host: "192.168.8.133", port: 5432, dbName: "forge")
let cache = CacheConfig(host: "localhost", port: 6379, maxMemoryMB: 256)
let badCache = CacheConfig(host: "localhost", port: 6379, maxMemoryMB: 0)

printConfig(db)
printConfig(cache)
printConfig(badCache)
// [VALID] DatabaseConfig
// host=192.168.8.133 port=5432 db=forge
//
// [VALID] CacheConfig
// host=localhost port=6379 maxMemory=256MB
//
// [INVALID] CacheConfig
// host=localhost port=6379 maxMemory=0MB`,
          solution: `protocol Configurable {
    var name: String { get }
    var isValid: Bool { get }
    func configString() -> String
}

struct DatabaseConfig: Configurable {
    let host: String
    let port: Int
    let dbName: String

    var name: String { return "DatabaseConfig" }

    var isValid: Bool {
        return port > 0 && !dbName.isEmpty
    }

    func configString() -> String {
        return "host=\\(host) port=\\(port) db=\\(dbName)"
    }
}

struct CacheConfig: Configurable {
    let host: String
    let port: Int
    let maxMemoryMB: Int

    var name: String { return "CacheConfig" }

    var isValid: Bool {
        return maxMemoryMB > 0
    }

    func configString() -> String {
        return "host=\\(host) port=\\(port) maxMemory=\\(maxMemoryMB)MB"
    }
}

func printConfig(_ config: Configurable) {
    let status = config.isValid ? "VALID" : "INVALID"
    print("[\\(status)] \\(config.name)")
    print(config.configString())
    print("")
}

let db = DatabaseConfig(host: "192.168.8.133", port: 5432, dbName: "forge")
let cache = CacheConfig(host: "localhost", port: 6379, maxMemoryMB: 256)
let badCache = CacheConfig(host: "localhost", port: 6379, maxMemoryMB: 0)

printConfig(db)
printConfig(cache)
printConfig(badCache)`,
          hints: [
            'Protocol syntax: `protocol Configurable { var name: String { get } ... }`. Computed properties use `{ get }` in the protocol.',
            'Struct conformance: `struct DatabaseConfig: Configurable { ... }`. Implement all required properties and methods.',
            'Use computed properties for `name` and `isValid`. `!dbName.isEmpty` checks a string is not empty.',
          ],
          concepts: ['protocol', 'conformance', 'computed properties', '{ get }', 'protocol as type', 'polymorphism'],
        },
        {
          id: 'sw-proto-2',
          title: 'Extensions & Protocol Defaults',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'swift',
          goal: 'Create a protocol `Measurable` with a `var bytes: Int { get }` property. Add a protocol extension that provides default computed properties: `kilobytes` (Double), `megabytes` (Double), and a `formatted()` method that returns the most appropriate unit (B, KB, or MB). Then extend the built-in Int type to conform to Measurable (treating the int value as bytes). Finally, write a function `totalSize` that takes an array of any Measurable and returns the sum formatted.',
          skeleton: `// Define the Measurable protocol


// Protocol extension with default implementations
// kilobytes = bytes / 1024.0
// megabytes = bytes / (1024.0 * 1024.0)
// formatted(): < 1024 -> "X B", < 1048576 -> "X.XX KB", else "X.XX MB"


// Extend Int to conform to Measurable (self is the byte count)


// Write totalSize function: takes [Measurable], returns formatted total


// Test it:
let fileSizes: [Int] = [512, 2048, 1_048_576, 3_145_728, 256]
print("Individual:")
for size in fileSizes {
    print("  \\(size.formatted())")
}
print("Total: \\(totalSize(fileSizes))")
// Individual:
//   512 B
//   2.00 KB
//   1.00 MB
//   3.00 MB
//   256 B
// Total: 4.00 MB`,
          solution: `protocol Measurable {
    var bytes: Int { get }
}

extension Measurable {
    var kilobytes: Double {
        return Double(bytes) / 1024.0
    }

    var megabytes: Double {
        return Double(bytes) / (1024.0 * 1024.0)
    }

    func formatted() -> String {
        if bytes < 1024 {
            return "\\(bytes) B"
        } else if bytes < 1024 * 1024 {
            return String(format: "%.2f KB", kilobytes)
        } else {
            return String(format: "%.2f MB", megabytes)
        }
    }
}

extension Int: Measurable {
    var bytes: Int { return self }
}

func totalSize(_ items: [any Measurable]) -> String {
    let total = items.reduce(0) { $0 + $1.bytes }
    return total.formatted()
}

let fileSizes: [Int] = [512, 2048, 1_048_576, 3_145_728, 256]
print("Individual:")
for size in fileSizes {
    print("  \\(size.formatted())")
}
print("Total: \\(totalSize(fileSizes))")`,
          hints: [
            'Define the protocol with just `var bytes: Int { get }`. Put kilobytes, megabytes, and formatted() in `extension Measurable { ... }`.',
            '`extension Int: Measurable { var bytes: Int { return self } }` makes every Int measurable as a byte count.',
            '`String(format: "%.2f KB", kilobytes)` formats to 2 decimal places. The totalSize function uses reduce to sum bytes.',
          ],
          concepts: ['protocol extension', 'default implementation', 'extending built-in types', 'any keyword', 'String(format:)', 'protocol-oriented programming'],
        },
      ],
    },
  ],
};
