import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-keypath',
  title: '37. Key Paths',
  explanation: `## Key Paths in Swift

Key paths are a way to refer to properties of a type without actually accessing them. They enable powerful functional patterns.

### Key Path Syntax

\`\`\`swift
struct Person {
    let name: String
    let age: Int
}

let namePath = \\Person.name
let agePath = \\Person.age

let alice = Person(name: "Alice", age: 30)
print(alice[keyPath: namePath])  // "Alice"
\`\`\`

### Key Path Types

- \`KeyPath<Root, Value>\` - read-only
- \`WritableKeyPath<Root, Value>\` - read/write on value types
- \`ReferenceWritableKeyPath<Root, Value>\` - read/write on reference types

### Key Paths in Functions

\`\`\`swift
let people = [Person(name: "Alice", age: 30), Person(name: "Bob", age: 25)]
let names = people.map(\\.name)  // ["Alice", "Bob"]
let sorted = people.sorted(by: { $0[keyPath: \\Person.age] < $1[keyPath: \\Person.age] })
\`\`\`

### Composing Key Paths

\`\`\`swift
struct Address { let city: String }
struct User { let address: Address }

let cityPath = \\User.address.city
\`\`\`
`,
  exercises: [
    {
      id: 'swift-keypath-1',
      title: 'Create a Key Path',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Create a key path to a struct property.',
      skeleton: `struct Dog {
    let name: String
    let breed: String
}

let namePath = ___Dog.name
let dog = Dog(name: "Rex", breed: "Labrador")
print(dog[keyPath: namePath])`,
      solution: `struct Dog {
    let name: String
    let breed: String
}

let namePath = \\Dog.name
let dog = Dog(name: "Rex", breed: "Labrador")
print(dog[keyPath: namePath])`,
      hints: [
        'Key paths start with a backslash.',
        'Followed by the type and property name.',
        'The syntax is \\\\Type.property.',
      ],
      concepts: ['keypath-syntax', 'backslash-notation'],
    },
    {
      id: 'swift-keypath-2',
      title: 'Use Key Path with Subscript',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Access a property using the keyPath subscript.',
      skeleton: `struct Point { let x: Double; let y: Double }

let p = Point(x: 3.0, y: 4.0)
let path = \\Point.x
let value = p[___: path]
print(value)`,
      solution: `struct Point { let x: Double; let y: Double }

let p = Point(x: 3.0, y: 4.0)
let path = \\Point.x
let value = p[keyPath: path]
print(value)`,
      hints: [
        'Use the special keyPath subscript.',
        'The syntax is instance[keyPath: path].',
        'The answer is keyPath.',
      ],
      concepts: ['keypath-subscript', 'property-access'],
    },
    {
      id: 'swift-keypath-3',
      title: 'Key Path in map',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use a key path shorthand in map.',
      skeleton: `struct User { let name: String; let age: Int }

let users = [User(name: "Alice", age: 30), User(name: "Bob", age: 25)]
let names = users.map(___)
print(names)`,
      solution: `struct User { let name: String; let age: Int }

let users = [User(name: "Alice", age: 30), User(name: "Bob", age: 25)]
let names = users.map(\\.name)
print(names)`,
      hints: [
        'Swift allows key path expressions in closures.',
        'Use \\\\.property as shorthand.',
        'The answer is \\\\.name.',
      ],
      concepts: ['keypath-as-function', 'map'],
    },
    {
      id: 'swift-keypath-4',
      title: 'Writable Key Path',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use a writable key path to modify a struct property.',
      skeleton: `struct Settings {
    var volume: Int
    var brightness: Int
}

var settings = Settings(volume: 50, brightness: 80)
let path = \\Settings.volume
settings[___: path] = 75
print(settings.volume)`,
      solution: `struct Settings {
    var volume: Int
    var brightness: Int
}

var settings = Settings(volume: 50, brightness: 80)
let path = \\Settings.volume
settings[keyPath: path] = 75
print(settings.volume)`,
      hints: [
        'WritableKeyPath allows setting values too.',
        'Use the same keyPath subscript syntax.',
        'The answer is keyPath.',
      ],
      concepts: ['writable-keypath', 'mutation'],
    },
    {
      id: 'swift-keypath-5',
      title: 'Composed Key Path',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Create a composed key path through nested properties.',
      skeleton: `struct Address { let city: String; let zip: String }
struct Person { let name: String; let address: Address }

let cityPath = \\Person.___.___
let person = Person(name: "Alice", address: Address(city: "NYC", zip: "10001"))
print(person[keyPath: cityPath])`,
      solution: `struct Address { let city: String; let zip: String }
struct Person { let name: String; let address: Address }

let cityPath = \\Person.address.city
let person = Person(name: "Alice", address: Address(city: "NYC", zip: "10001"))
print(person[keyPath: cityPath])`,
      hints: [
        'Key paths can chain through nested properties.',
        'Navigate from Person through address to city.',
        'The answer is address.city.',
      ],
      concepts: ['composed-keypath', 'nested-access'],
    },
    {
      id: 'swift-keypath-6',
      title: 'Key Path in sorted',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Sort an array using a key path.',
      skeleton: `struct Student { let name: String; let grade: Double }

let students = [
    Student(name: "Alice", grade: 92),
    Student(name: "Bob", grade: 88),
    Student(name: "Carol", grade: 95),
]

let sorted = students.sorted { $0[keyPath: ___] < $1[keyPath: ___] }
print(sorted.map(\\.name))`,
      solution: `struct Student { let name: String; let grade: Double }

let students = [
    Student(name: "Alice", grade: 92),
    Student(name: "Bob", grade: 88),
    Student(name: "Carol", grade: 95),
]

let sorted = students.sorted { $0[keyPath: \\Student.grade] < $1[keyPath: \\Student.grade] }
print(sorted.map(\\.name))`,
      hints: [
        'Use \\\\Student.grade as the key path.',
        'Compare both elements using the same key path.',
        'The answer is \\\\Student.grade for both blanks.',
      ],
      concepts: ['keypath-sorting', 'comparison'],
    },
    {
      id: 'swift-keypath-7',
      title: 'Write a Generic Getter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that extracts values using a key path.',
      skeleton: `// Write a function pluck<Root, Value> that takes:
// - an array of Root
// - a KeyPath<Root, Value>
// Returns [Value] extracted from each element
`,
      solution: `func pluck<Root, Value>(_ array: [Root], _ keyPath: KeyPath<Root, Value>) -> [Value] {
    return array.map { $0[keyPath: keyPath] }
}`,
      hints: [
        'Use map with the keyPath subscript.',
        'The function is generic over Root and Value.',
        'Access each element with $0[keyPath: keyPath].',
      ],
      concepts: ['keypath-generics', 'extraction'],
    },
    {
      id: 'swift-keypath-8',
      title: 'Write a Key Path Setter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that sets a property on all elements using a writable key path.',
      skeleton: `// Write a function setAll<Root, Value> that takes:
// - inout array of Root
// - a WritableKeyPath<Root, Value>
// - a Value to set
// Sets the property on all elements
`,
      solution: `func setAll<Root, Value>(_ array: inout [Root], _ keyPath: WritableKeyPath<Root, Value>, to value: Value) {
    for index in array.indices {
        array[index][keyPath: keyPath] = value
    }
}`,
      hints: [
        'Use inout to modify the array in place.',
        'Iterate by index to allow mutation.',
        'Use the keyPath subscript for assignment.',
      ],
      concepts: ['writable-keypath', 'inout', 'bulk-update'],
    },
    {
      id: 'swift-keypath-9',
      title: 'Write a Key Path Comparator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that creates a comparator from a key path.',
      skeleton: `// Write a function ascending<Root, Value: Comparable> that takes:
// - a KeyPath<Root, Value>
// Returns a (Root, Root) -> Bool comparator for sorting
`,
      solution: `func ascending<Root, Value: Comparable>(_ keyPath: KeyPath<Root, Value>) -> (Root, Root) -> Bool {
    return { $0[keyPath: keyPath] < $1[keyPath: keyPath] }
}`,
      hints: [
        'Return a closure that compares two Root values.',
        'Use the key path to extract the comparable value.',
        'Value must be Comparable for < to work.',
      ],
      concepts: ['keypath-comparator', 'higher-order-function'],
    },
    {
      id: 'swift-keypath-10',
      title: 'Write a Key Path Filter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that filters based on a key path value.',
      skeleton: `// Write a function where<Root, Value: Equatable> that takes:
// - array of Root
// - a KeyPath<Root, Value>
// - equals value: Value
// Returns elements where the key path value equals the given value
`,
      solution: `func \`where\`<Root, Value: Equatable>(_ array: [Root], _ keyPath: KeyPath<Root, Value>, equals value: Value) -> [Root] {
    return array.filter { $0[keyPath: keyPath] == value }
}`,
      hints: [
        'Use filter with a key path comparison.',
        'Extract the value with keyPath subscript.',
        'Compare with == since Value is Equatable.',
      ],
      concepts: ['keypath-filtering', 'equatable'],
    },
    {
      id: 'swift-keypath-11',
      title: 'Write a Key Path Sum',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write a function that sums a numeric property across an array.',
      skeleton: `// Write a function sum<Root> that takes:
// - array of Root
// - a KeyPath<Root, Double>
// Returns the sum of that property across all elements
`,
      solution: `func sum<Root>(_ array: [Root], _ keyPath: KeyPath<Root, Double>) -> Double {
    return array.reduce(0) { $0 + $1[keyPath: keyPath] }
}`,
      hints: [
        'Use reduce with an initial value of 0.',
        'Extract the Double value with keyPath subscript.',
        'Add each extracted value to the accumulator.',
      ],
      concepts: ['keypath-aggregation', 'reduce'],
    },
    {
      id: 'swift-keypath-12',
      title: 'Write a Key Path Group By',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a function that groups elements by a key path value.',
      skeleton: `// Write a function groupBy<Root, Key: Hashable> that takes:
// - array of Root
// - a KeyPath<Root, Key>
// Returns [Key: [Root]] dictionary grouped by the key path value
`,
      solution: `func groupBy<Root, Key: Hashable>(_ array: [Root], _ keyPath: KeyPath<Root, Key>) -> [Key: [Root]] {
    return Dictionary(grouping: array) { $0[keyPath: keyPath] }
}`,
      hints: [
        'Use Dictionary(grouping:by:).',
        'The grouping closure extracts the key via key path.',
        'Key must be Hashable for dictionary keys.',
      ],
      concepts: ['keypath-grouping', 'dictionary-grouping'],
    },
    {
      id: 'swift-keypath-13',
      title: 'Fix Missing Key Path Backslash',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the missing backslash in a key path expression.',
      skeleton: `struct Item { let name: String; let price: Double }

let items = [Item(name: "A", price: 10), Item(name: "B", price: 20)]
let prices = items.map(.price)
print(prices)`,
      solution: `struct Item { let name: String; let price: Double }

let items = [Item(name: "A", price: 10), Item(name: "B", price: 20)]
let prices = items.map(\\.price)
print(prices)`,
      hints: [
        'Key path expressions start with a backslash.',
        '.price is a member access, not a key path.',
        'Change .price to \\\\.price.',
      ],
      concepts: ['keypath-syntax', 'backslash'],
    },
    {
      id: 'swift-keypath-14',
      title: 'Fix Immutable Key Path Write',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix attempting to write through a read-only key path.',
      skeleton: `struct Config {
    let maxRetries: Int
    var timeout: Double
}

var config = Config(maxRetries: 3, timeout: 30.0)
let path = \\Config.maxRetries
config[keyPath: path] = 5`,
      solution: `struct Config {
    var maxRetries: Int
    var timeout: Double
}

var config = Config(maxRetries: 3, timeout: 30.0)
let path = \\Config.maxRetries
config[keyPath: path] = 5`,
      hints: [
        'maxRetries is declared with let, making the key path read-only.',
        'Change let to var to make it writable.',
        'WritableKeyPath requires var properties.',
      ],
      concepts: ['writable-keypath', 'let-vs-var'],
    },
    {
      id: 'swift-keypath-15',
      title: 'Fix Key Path Type Mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix a function that takes the wrong key path type.',
      skeleton: `struct Employee {
    var name: String
    var salary: Double
}

func raise(_ employees: inout [Employee], by percent: Double, for path: KeyPath<Employee, Double>) {
    for i in employees.indices {
        employees[i][keyPath: path] *= (1 + percent / 100)
    }
}`,
      solution: `struct Employee {
    var name: String
    var salary: Double
}

func raise(_ employees: inout [Employee], by percent: Double, for path: WritableKeyPath<Employee, Double>) {
    for i in employees.indices {
        employees[i][keyPath: path] *= (1 + percent / 100)
    }
}`,
      hints: [
        'KeyPath is read-only; you cannot assign through it.',
        'Use WritableKeyPath for mutable access.',
        'Change KeyPath to WritableKeyPath.',
      ],
      concepts: ['writable-keypath', 'keypath-types'],
    },
    {
      id: 'swift-keypath-16',
      title: 'Predict Key Path Map Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the output of map with a key path.',
      skeleton: `struct Fruit { let name: String; let color: String }

let fruits = [
    Fruit(name: "Apple", color: "Red"),
    Fruit(name: "Banana", color: "Yellow"),
    Fruit(name: "Grape", color: "Purple"),
]
let colors = fruits.map(\\.color)
print(colors.joined(separator: ", "))`,
      solution: `Red, Yellow, Purple`,
      hints: [
        'map(\\\\.color) extracts the color from each fruit.',
        'joined(separator:) combines them with commas.',
        'The output is Red, Yellow, Purple.',
      ],
      concepts: ['keypath-map', 'string-joining'],
    },
    {
      id: 'swift-keypath-17',
      title: 'Predict Nested Key Path Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the output of a composed key path.',
      skeleton: `struct Inner { let value: Int }
struct Outer { let inner: Inner; let label: String }

let obj = Outer(inner: Inner(value: 42), label: "test")
let path = \\Outer.inner.value
print(obj[keyPath: path])`,
      solution: `42`,
      hints: [
        'The key path navigates through inner to value.',
        'inner.value is 42.',
        'The output is 42.',
      ],
      concepts: ['composed-keypath', 'nested-access'],
    },
    {
      id: 'swift-keypath-18',
      title: 'Predict Key Path Identity',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict behavior of the identity key path.',
      skeleton: `let path = \\Int.self
let value = 42
print(value[keyPath: path])
print(type(of: path))`,
      solution: `42
WritableKeyPath<Int, Int>`,
      hints: [
        '\\\\Int.self is the identity key path.',
        'It returns the value itself.',
        'Its type is WritableKeyPath<Int, Int>.',
      ],
      concepts: ['identity-keypath', 'self-keypath'],
    },
    {
      id: 'swift-keypath-19',
      title: 'Refactor Closure to Key Path',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Refactor closure-based map/filter calls to use key paths.',
      skeleton: `struct Task {
    let title: String
    let isComplete: Bool
    let priority: Int
}

let tasks: [Task] = [
    Task(title: "A", isComplete: true, priority: 1),
    Task(title: "B", isComplete: false, priority: 3),
    Task(title: "C", isComplete: true, priority: 2),
]

let titles = tasks.map { $0.title }
let priorities = tasks.map { $0.priority }
let completedTasks = tasks.filter { $0.isComplete }`,
      solution: `struct Task {
    let title: String
    let isComplete: Bool
    let priority: Int
}

let tasks: [Task] = [
    Task(title: "A", isComplete: true, priority: 1),
    Task(title: "B", isComplete: false, priority: 3),
    Task(title: "C", isComplete: true, priority: 2),
]

let titles = tasks.map(\\.title)
let priorities = tasks.map(\\.priority)
let completedTasks = tasks.filter(\\.isComplete)`,
      hints: [
        'Single-property access closures can be replaced with key paths.',
        'map { $0.title } becomes map(\\\\.title).',
        'filter { $0.isComplete } becomes filter(\\\\.isComplete).',
      ],
      concepts: ['keypath-as-function', 'refactoring'],
    },
    {
      id: 'swift-keypath-20',
      title: 'Refactor Dynamic Property Access to Key Path',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor repetitive property access into a generic key path function.',
      skeleton: `struct Stats {
    var attack: Int
    var defense: Int
    var speed: Int
}

func boostAttack(_ stats: inout Stats, by amount: Int) {
    stats.attack += amount
}

func boostDefense(_ stats: inout Stats, by amount: Int) {
    stats.defense += amount
}

func boostSpeed(_ stats: inout Stats, by amount: Int) {
    stats.speed += amount
}`,
      solution: `struct Stats {
    var attack: Int
    var defense: Int
    var speed: Int
}

func boost(_ stats: inout Stats, _ stat: WritableKeyPath<Stats, Int>, by amount: Int) {
    stats[keyPath: stat] += amount
}

// Usage:
// boost(&stats, \\.attack, by: 10)
// boost(&stats, \\.defense, by: 5)
// boost(&stats, \\.speed, by: 3)`,
      hints: [
        'All three functions do the same thing to different properties.',
        'Use a WritableKeyPath parameter to select which property.',
        'One function replaces all three.',
      ],
      concepts: ['writable-keypath', 'DRY', 'refactoring'],
    },
  ],
};
