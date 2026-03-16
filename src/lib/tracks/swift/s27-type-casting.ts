import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-cast',
  title: '27. Type Casting',
  explanation: `## Type Casting in Swift

Type casting lets you check and convert between types at runtime. Swift provides the \`is\`, \`as\`, \`as?\`, and \`as!\` operators.

### Type Check Operator (is)

Use \`is\` to check if an instance is of a certain type:

\`\`\`swift
let items: [Any] = [42, "hello", 3.14]
for item in items {
    if item is String {
        print("Found a string")
    }
}
\`\`\`

### Downcasting (as? and as!)

\`as?\` returns an optional and \`as!\` force-unwraps:

\`\`\`swift
class Animal {}
class Dog: Animal { func bark() { print("Woof") } }

let pet: Animal = Dog()
if let dog = pet as? Dog {
    dog.bark()
}
\`\`\`

### Any and AnyObject

\`Any\` represents any type (including functions), \`AnyObject\` represents any class instance:

\`\`\`swift
var things: [Any] = [0, "str", { print("hi") }]
var objects: [AnyObject] = [Dog(), NSString("test")]
\`\`\`

### Type Casting Patterns in Switch

\`\`\`swift
for item in items {
    switch item {
    case let n as Int:
        print("Int: \\(n)")
    case let s as String:
        print("String: \\(s)")
    default:
        print("Other")
    }
}
\`\`\`
`,
  exercises: [
    {
      id: 'swift-cast-1',
      title: 'Type Check with is',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use the is operator to check if a value is a String.',
      skeleton: `let value: Any = "Hello"
if value ___ String {
    print("It's a string")
}`,
      solution: `let value: Any = "Hello"
if value is String {
    print("It's a string")
}`,
      hints: [
        'The type check operator tests if a value is a given type.',
        'It returns true or false.',
        'The keyword is is.',
      ],
      concepts: ['type-checking', 'is-operator'],
    },
    {
      id: 'swift-cast-2',
      title: 'Conditional Downcast',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use as? to safely downcast an Animal to a Cat.',
      skeleton: `class Animal { var name: String = "" }
class Cat: Animal { func meow() { print("Meow") } }

let pet: Animal = Cat()
if let cat = pet ___ Cat {
    cat.meow()
}`,
      solution: `class Animal { var name: String = "" }
class Cat: Animal { func meow() { print("Meow") } }

let pet: Animal = Cat()
if let cat = pet as? Cat {
    cat.meow()
}`,
      hints: [
        'Conditional downcasting returns an optional.',
        'Use as? for safe downcasting.',
        'The result is Cat? which is unwrapped by if let.',
      ],
      concepts: ['downcasting', 'optional-binding'],
    },
    {
      id: 'swift-cast-3',
      title: 'Force Downcast',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use as! to force downcast when you are certain of the type.',
      skeleton: `class Shape {}
class Circle: Shape { let radius = 5.0 }

let shape: Shape = Circle()
let circle = shape ___ Circle
print(circle.radius)`,
      solution: `class Shape {}
class Circle: Shape { let radius = 5.0 }

let shape: Shape = Circle()
let circle = shape as! Circle
print(circle.radius)`,
      hints: [
        'Force downcasting crashes if the cast fails.',
        'Use as! when you are certain the cast will succeed.',
        'The syntax is as! TargetType.',
      ],
      concepts: ['force-downcast', 'as-bang'],
    },
    {
      id: 'swift-cast-4',
      title: 'Switch Type Casting Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use a type casting pattern in a switch statement.',
      skeleton: `let items: [Any] = [42, "hello", 3.14]

for item in items {
    switch item {
    case let n ___ Int:
        print("Int: \\(n)")
    case let s as String:
        print("String: \\(s)")
    default:
        print("Other: \\(item)")
    }
}`,
      solution: `let items: [Any] = [42, "hello", 3.14]

for item in items {
    switch item {
    case let n as Int:
        print("Int: \\(n)")
    case let s as String:
        print("String: \\(s)")
    default:
        print("Other: \\(item)")
    }
}`,
      hints: [
        'In switch, use the as pattern to match and bind.',
        'case let n as Int matches integers.',
        'The keyword is as (not as? in switch patterns).',
      ],
      concepts: ['switch-patterns', 'type-casting-pattern'],
    },
    {
      id: 'swift-cast-5',
      title: 'Any Array Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare an array that can hold any type.',
      skeleton: `var things: [___] = [42, "hello", true, 3.14]
print(things.count)`,
      solution: `var things: [Any] = [42, "hello", true, 3.14]
print(things.count)`,
      hints: [
        'Any can represent an instance of any type at all.',
        'Use Any as the array element type.',
        'AnyObject is only for class instances.',
      ],
      concepts: ['any-type', 'heterogeneous-arrays'],
    },
    {
      id: 'swift-cast-6',
      title: 'AnyObject Array',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Declare an array that can hold only class instances.',
      skeleton: `class Dog { let name = "Rex" }
class Cat { let name = "Whiskers" }

let pets: [___] = [Dog(), Cat()]
print(pets.count)`,
      solution: `class Dog { let name = "Rex" }
class Cat { let name = "Whiskers" }

let pets: [AnyObject] = [Dog(), Cat()]
print(pets.count)`,
      hints: [
        'AnyObject can represent an instance of any class type.',
        'It only works with reference types (classes).',
        'Structs and enums cannot be stored as AnyObject.',
      ],
      concepts: ['anyobject', 'class-types'],
    },
    {
      id: 'swift-cast-7',
      title: 'Write a Type Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that counts how many items of each type are in an [Any] array.',
      skeleton: `// Write a function countTypes that takes [Any] and returns
// a dictionary [String: Int] with keys "Int", "String", "Double", "Other"
`,
      solution: `func countTypes(_ items: [Any]) -> [String: Int] {
    var counts: [String: Int] = ["Int": 0, "String": 0, "Double": 0, "Other": 0]
    for item in items {
        switch item {
        case is Int:
            counts["Int", default: 0] += 1
        case is String:
            counts["String", default: 0] += 1
        case is Double:
            counts["Double", default: 0] += 1
        default:
            counts["Other", default: 0] += 1
        }
    }
    return counts
}`,
      hints: [
        'Use a switch statement with is patterns.',
        'case is Int checks the type without binding.',
        'Increment the corresponding count for each type.',
      ],
      concepts: ['type-checking', 'switch-patterns', 'dictionary'],
    },
    {
      id: 'swift-cast-8',
      title: 'Write a Safe Cast Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a generic function that safely casts a value or returns a default.',
      skeleton: `// Write a function safeCast<T> that takes a value: Any and default: T
// Returns the value cast to T, or the default if casting fails
`,
      solution: `func safeCast<T>(_ value: Any, default defaultValue: T) -> T {
    return (value as? T) ?? defaultValue
}`,
      hints: [
        'Use as? for conditional casting.',
        'Use the nil-coalescing operator ?? for the default.',
        'The return type is T.',
      ],
      concepts: ['generics', 'conditional-cast', 'nil-coalescing'],
    },
    {
      id: 'swift-cast-9',
      title: 'Write a Type Filter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that filters an [Any] array to only elements of a specific type.',
      skeleton: `// Write a function filterType<T> that takes [Any]
// and returns [T] with only elements matching type T
`,
      solution: `func filterType<T>(_ items: [Any]) -> [T] {
    return items.compactMap { $0 as? T }
}`,
      hints: [
        'Use compactMap to filter and cast simultaneously.',
        'as? returns nil for non-matching types.',
        'compactMap removes nils automatically.',
      ],
      concepts: ['generics', 'compactMap', 'conditional-cast'],
    },
    {
      id: 'swift-cast-10',
      title: 'Write a Type Description Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write a function that returns the runtime type name of any value.',
      skeleton: `// Write a function typeName that takes an Any parameter
// and returns a String describing its runtime type
`,
      solution: `func typeName(_ value: Any) -> String {
    return String(describing: type(of: value))
}`,
      hints: [
        'Use type(of:) to get the runtime type.',
        'Convert the type to a String using String(describing:).',
        'This works with any type.',
      ],
      concepts: ['type-of', 'runtime-type', 'metatype'],
    },
    {
      id: 'swift-cast-11',
      title: 'Write a Heterogeneous Processor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that processes an [Any] array and returns formatted strings.',
      skeleton: `// Write a function process that takes [Any] and returns [String]
// Int -> "int:VALUE", String -> "str:VALUE", Double -> "dbl:VALUE", else -> "unknown"
`,
      solution: `func process(_ items: [Any]) -> [String] {
    return items.map { item in
        switch item {
        case let n as Int:
            return "int:\\(n)"
        case let s as String:
            return "str:\\(s)"
        case let d as Double:
            return "dbl:\\(d)"
        default:
            return "unknown"
        }
    }
}`,
      hints: [
        'Use map to transform each element.',
        'Use switch with as patterns for type matching.',
        'Return the formatted string for each case.',
      ],
      concepts: ['switch-patterns', 'type-casting', 'map'],
    },
    {
      id: 'swift-cast-12',
      title: 'Write a Class Hierarchy Checker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that checks the depth of a class hierarchy.',
      skeleton: `class Vehicle {}
class Car: Vehicle {}
class SportsCar: Car {}

// Write a function classifyVehicle that takes a Vehicle
// and returns "sports" for SportsCar, "car" for Car, "vehicle" otherwise
`,
      solution: `func classifyVehicle(_ v: Vehicle) -> String {
    if v is SportsCar {
        return "sports"
    } else if v is Car {
        return "car"
    } else {
        return "vehicle"
    }
}`,
      hints: [
        'Check the most specific type first.',
        'SportsCar is also a Car, so order matters.',
        'Use is to check without casting.',
      ],
      concepts: ['type-checking', 'class-hierarchy', 'is-operator'],
    },
    {
      id: 'swift-cast-13',
      title: 'Fix Force Cast Crash',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the force cast that crashes at runtime.',
      skeleton: `let values: [Any] = [1, "two", 3]

for value in values {
    let number = value as! Int
    print(number * 2)
}`,
      solution: `let values: [Any] = [1, "two", 3]

for value in values {
    if let number = value as? Int {
        print(number * 2)
    }
}`,
      hints: [
        'as! crashes when the cast fails.',
        '"two" cannot be cast to Int.',
        'Use as? with optional binding for safe casting.',
      ],
      concepts: ['force-cast', 'safe-cast', 'runtime-crash'],
    },
    {
      id: 'swift-cast-14',
      title: 'Fix Wrong Cast Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the switch statement where a subclass case is never reached.',
      skeleton: `class Base {}
class Derived: Base { var extra = 42 }

func describe(_ obj: Base) -> String {
    switch obj {
    case is Base:
        return "base"
    case is Derived:
        return "derived"
    default:
        return "unknown"
    }
}

print(describe(Derived()))`,
      solution: `class Base {}
class Derived: Base { var extra = 42 }

func describe(_ obj: Base) -> String {
    switch obj {
    case is Derived:
        return "derived"
    case is Base:
        return "base"
    default:
        return "unknown"
    }
}

print(describe(Derived()))`,
      hints: [
        'Switch cases are checked in order.',
        'Derived is also a Base, so the Base case catches everything.',
        'Put the more specific type first.',
      ],
      concepts: ['switch-order', 'type-hierarchy', 'pattern-matching'],
    },
    {
      id: 'swift-cast-15',
      title: 'Fix Missing Protocol Cast',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the code that fails to cast a protocol type correctly.',
      skeleton: `protocol Printable {
    func display() -> String
}

struct Item: Printable {
    let name: String
    func display() -> String { return name }
}

let things: [Any] = [Item(name: "A"), "B", Item(name: "C")]
let printables = things.compactMap { $0 as? Item }
for p in printables {
    print(p.display())
}
// Should find ALL Printable items, not just Items`,
      solution: `protocol Printable {
    func display() -> String
}

struct Item: Printable {
    let name: String
    func display() -> String { return name }
}

let things: [Any] = [Item(name: "A"), "B", Item(name: "C")]
let printables = things.compactMap { $0 as? Printable }
for p in printables {
    print(p.display())
}`,
      hints: [
        'Casting to Item only finds Item instances.',
        'Cast to the protocol type Printable instead.',
        'Change as? Item to as? Printable.',
      ],
      concepts: ['protocol-casting', 'compactMap', 'type-erasure'],
    },
    {
      id: 'swift-cast-16',
      title: 'Predict Conditional Cast Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the output of conditional casting.',
      skeleton: `let value: Any = 42
let asString = value as? String
let asInt = value as? Int
print(asString ?? "nil")
print(asInt ?? "nil")`,
      solution: `nil
42`,
      hints: [
        '42 is an Int, not a String.',
        'as? String returns nil for an Int value.',
        'as? Int succeeds and returns 42.',
      ],
      concepts: ['conditional-cast', 'nil-coalescing'],
    },
    {
      id: 'swift-cast-17',
      title: 'Predict is Operator Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the type checking results for a class hierarchy.',
      skeleton: `class A {}
class B: A {}
class C: B {}

let obj: A = C()
print(obj is A)
print(obj is B)
print(obj is C)`,
      solution: `true
true
true`,
      hints: [
        'C inherits from B which inherits from A.',
        'An instance of C is also an instance of B and A.',
        'All three checks return true.',
      ],
      concepts: ['type-checking', 'class-hierarchy', 'is-operator'],
    },
    {
      id: 'swift-cast-18',
      title: 'Predict Switch Cast Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the output of a switch with type casting patterns.',
      skeleton: `let items: [Any] = [3, "hi", 2.5, true]
var result = ""
for item in items {
    switch item {
    case let x as Int:
        result += "I\\(x)"
    case let s as String:
        result += "S\\(s)"
    default:
        result += "?"
    }
}
print(result)`,
      solution: `I3ShiI1?`,
      hints: [
        '3 is Int -> I3, "hi" is String -> Shi.',
        '2.5 is Double, not matched -> ?.',
        'true is Bool which matches Int as 1 in some contexts -- actually Bool matches as Int with value 1 in Swift.',
      ],
      concepts: ['switch-patterns', 'type-casting', 'bool-as-int'],
    },
    {
      id: 'swift-cast-19',
      title: 'Refactor Force Casts to Safe Casts',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor force casts to safe conditional casts.',
      skeleton: `func parseConfig(_ data: [String: Any]) {
    let name = data["name"] as! String
    let age = data["age"] as! Int
    let scores = data["scores"] as! [Double]
    print("\\(name), \\(age), \\(scores)")
}`,
      solution: `func parseConfig(_ data: [String: Any]) {
    guard let name = data["name"] as? String,
          let age = data["age"] as? Int,
          let scores = data["scores"] as? [Double] else {
        print("Invalid config")
        return
    }
    print("\\(name), \\(age), \\(scores)")
}`,
      hints: [
        'Replace as! with as? for safe casting.',
        'Use guard let to unwrap all values.',
        'Provide an else clause for the failure case.',
      ],
      concepts: ['safe-casting', 'guard-let', 'error-handling'],
    },
    {
      id: 'swift-cast-20',
      title: 'Refactor Type Checks to Protocol',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Refactor type-checking switch to use a protocol instead.',
      skeleton: `class Dog { func speak() -> String { return "Woof" } }
class Cat { func speak() -> String { return "Meow" } }
class Bird { func speak() -> String { return "Tweet" } }

func getSound(_ animal: Any) -> String {
    switch animal {
    case let d as Dog: return d.speak()
    case let c as Cat: return c.speak()
    case let b as Bird: return b.speak()
    default: return "..."
    }
}`,
      solution: `protocol Speaker {
    func speak() -> String
}

class Dog: Speaker { func speak() -> String { return "Woof" } }
class Cat: Speaker { func speak() -> String { return "Meow" } }
class Bird: Speaker { func speak() -> String { return "Tweet" } }

func getSound(_ animal: Speaker) -> String {
    return animal.speak()
}`,
      hints: [
        'All types share a speak() method -- use a protocol.',
        'Define a Speaker protocol with speak() -> String.',
        'The function can simply call animal.speak().',
      ],
      concepts: ['protocol-oriented', 'refactoring', 'polymorphism'],
    },
  ],
};
