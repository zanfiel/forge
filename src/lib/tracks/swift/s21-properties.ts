import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-props',
  title: '21. Properties',
  explanation: `## Properties in Swift

Swift supports stored properties, computed properties, property observers, lazy properties, and type properties.

### Stored & Computed
\`\`\`swift
struct Circle {
    var radius: Double              // stored
    var area: Double {              // computed
        return 3.14159 * radius * radius
    }
}
\`\`\`

### Property Observers
\`\`\`swift
var score: Int = 0 {
    willSet { print("About to change to \\(newValue)") }
    didSet { print("Changed from \\(oldValue)") }
}
\`\`\`

### Lazy Properties
\`\`\`swift
lazy var data = loadExpensiveData()  // computed on first access
\`\`\`

### Type Properties
\`\`\`swift
struct Config {
    static let maxRetries = 3
    static var currentEnv = "dev"
}
\`\`\``,
  exercises: [
    {
      id: 'swift-props-1',
      title: 'Stored Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a stored property with a default value.',
      skeleton: `struct Settings {
    var volume: Int ___ 50
}`,
      solution: `struct Settings {
    var volume: Int = 50
}`,
      hints: ['Use = to assign a default value.', 'Default values are used when not provided at init.', 'The memberwise init will use 50 as the default.'],
      concepts: ['stored-properties', 'default-values'],
    },
    {
      id: 'swift-props-2',
      title: 'Computed Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Add a computed property that returns the perimeter.',
      skeleton: `struct Square {
    var side: Double
    var perimeter: Double {
        ___ side * 4
    }
}`,
      solution: `struct Square {
    var side: Double
    var perimeter: Double {
        return side * 4
    }
}`,
      hints: ['Computed properties calculate a value.', 'Use return to provide the value.', 'No storage is allocated.'],
      concepts: ['computed-properties'],
    },
    {
      id: 'swift-props-3',
      title: 'Property Observer willSet',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a willSet observer that prints the new value.',
      skeleton: `class Player {
    var score: Int = 0 {
        ___ {
            print("Score changing to \\(newValue)")
        }
    }
}`,
      solution: `class Player {
    var score: Int = 0 {
        willSet {
            print("Score changing to \\(newValue)")
        }
    }
}`,
      hints: ['willSet is called before the value changes.', 'newValue is the incoming value.', 'Place willSet inside the property braces.'],
      concepts: ['willSet'],
    },
    {
      id: 'swift-props-4',
      title: 'Property Observer didSet',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a didSet observer that clamps the value.',
      skeleton: `class Volume {
    var level: Int = 50 {
        ___ {
            if level > 100 { level = 100 }
            if level < 0 { level = 0 }
        }
    }
}`,
      solution: `class Volume {
    var level: Int = 50 {
        didSet {
            if level > 100 { level = 100 }
            if level < 0 { level = 0 }
        }
    }
}`,
      hints: ['didSet is called after the value changes.', 'You can modify the property inside didSet.', 'oldValue holds the previous value.'],
      concepts: ['didSet'],
    },
    {
      id: 'swift-props-5',
      title: 'Lazy Property',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Declare a lazy property.',
      skeleton: `class DataLoader {
    ___ var data = [1, 2, 3, 4, 5].map { $0 * $0 }
}`,
      solution: `class DataLoader {
    lazy var data = [1, 2, 3, 4, 5].map { $0 * $0 }
}`,
      hints: ['lazy defers initialization until first access.', 'Must be var, not let.', 'Useful for expensive computations.'],
      concepts: ['lazy'],
    },
    {
      id: 'swift-props-6',
      title: 'Type Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a static type property.',
      skeleton: `struct App {
    ___ let version = "1.0.0"
}`,
      solution: `struct App {
    static let version = "1.0.0"
}`,
      hints: ['Use `static` for type-level properties.', 'Accessed as App.version.', 'Shared across all instances.'],
      concepts: ['static', 'type-properties'],
    },
    {
      id: 'swift-props-7',
      title: 'Read-Write Computed Property',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a computed property with both getter and setter.',
      skeleton: `struct Temperature {
    var celsius: Double

    var fahrenheit: Double {
        // get: convert celsius to fahrenheit
        // set: convert newValue from fahrenheit to celsius
    }
}`,
      solution: `struct Temperature {
    var celsius: Double

    var fahrenheit: Double {
        get { return celsius * 9.0 / 5.0 + 32.0 }
        set { celsius = (newValue - 32.0) * 5.0 / 9.0 }
    }
}`,
      hints: ['F = C * 9/5 + 32.', 'C = (F - 32) * 5/9.', 'newValue is the assigned value in the setter.'],
      concepts: ['computed-properties', 'getter-setter'],
    },
    {
      id: 'swift-props-8',
      title: 'Observer with Validation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a class with a didSet that keeps a property non-negative.',
      skeleton: `class BankAccount {
    var balance: Double = 0 {
        // Add didSet to prevent negative balance
    }
}`,
      solution: `class BankAccount {
    var balance: Double = 0 {
        didSet {
            if balance < 0 { balance = oldValue }
        }
    }
}`,
      hints: ['didSet can revert changes.', 'oldValue holds the previous value.', 'Reset to oldValue if validation fails.'],
      concepts: ['didSet', 'validation'],
    },
    {
      id: 'swift-props-9',
      title: 'Lazy with Closure',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a lazy property initialized by a closure.',
      skeleton: `class Config {
    // lazy var settings computed from a complex closure
    // that returns a dictionary
}`,
      solution: `class Config {
    lazy var settings: [String: String] = {
        var dict: [String: String] = [:]
        dict["theme"] = "dark"
        dict["lang"] = "en"
        return dict
    }()
}`,
      hints: ['Use a closure followed by ().', 'The closure executes on first access.', 'The () immediately invokes the closure.'],
      concepts: ['lazy', 'closure-initialization'],
    },
    {
      id: 'swift-props-10',
      title: 'Type Method with Property',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct with a static counter that tracks instances.',
      skeleton: `struct Widget {
    static var count = 0
    let id: Int

    // init that increments count and assigns id
}`,
      solution: `struct Widget {
    static var count = 0
    let id: Int

    init() {
        Widget.count += 1
        id = Widget.count
    }
}`,
      hints: ['Increment the static counter in init.', 'Access static properties via TypeName.property.', 'Each instance gets a unique id.'],
      concepts: ['static', 'type-properties'],
    },
    {
      id: 'swift-props-11',
      title: 'Computed Property Chain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct with multiple computed properties that depend on each other.',
      skeleton: `struct BMI {
    var weightKg: Double
    var heightM: Double

    // computed: bmi = weight / height^2
    // computed: category based on bmi
}`,
      solution: `struct BMI {
    var weightKg: Double
    var heightM: Double

    var bmi: Double {
        return weightKg / (heightM * heightM)
    }

    var category: String {
        switch bmi {
        case ..<18.5: return "Underweight"
        case 18.5..<25: return "Normal"
        case 25..<30: return "Overweight"
        default: return "Obese"
        }
    }
}`,
      hints: ['BMI = weight / height^2.', 'category depends on the bmi computed property.', 'Use switch with ranges.'],
      concepts: ['computed-properties', 'property-chain'],
    },
    {
      id: 'swift-props-12',
      title: 'Property Wrapper Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a simple property wrapper that clamps values to a range.',
      skeleton: `@propertyWrapper
struct Clamped {
    var wrappedValue: Int {
        didSet { wrappedValue = min(max(wrappedValue, range.lowerBound), range.upperBound) }
    }
    let range: ClosedRange<Int>

    init(wrappedValue: Int, _ range: ClosedRange<Int>) {
        self.range = range
        self.wrappedValue = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }
}`,
      solution: `@propertyWrapper
struct Clamped {
    var wrappedValue: Int {
        didSet { wrappedValue = min(max(wrappedValue, range.lowerBound), range.upperBound) }
    }
    let range: ClosedRange<Int>

    init(wrappedValue: Int, _ range: ClosedRange<Int>) {
        self.range = range
        self.wrappedValue = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }
}`,
      hints: ['@propertyWrapper requires a wrappedValue.', 'Clamp in both init and didSet.', 'Usage: @Clamped(0...100) var vol = 50.'],
      concepts: ['property-wrapper'],
    },
    {
      id: 'swift-props-13',
      title: 'Fix Lazy let',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the lazy property that is declared as let.',
      skeleton: `class Cache {
    lazy let data: [Int] = [1, 2, 3]
}`,
      solution: `class Cache {
    lazy var data: [Int] = [1, 2, 3]
}`,
      hints: ['lazy must be var, not let.', 'The property is mutated on first access.', 'Change let to var.'],
      concepts: ['lazy'],
    },
    {
      id: 'swift-props-14',
      title: 'Fix Observer on Computed',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the code that adds an observer to a computed property.',
      skeleton: `struct Circle {
    var radius: Double
    var area: Double {
        return 3.14 * radius * radius
        didSet { print("Area changed") }
    }
}`,
      solution: `struct Circle {
    var radius: Double {
        didSet { print("Radius changed, area is now \\(area)") }
    }
    var area: Double {
        return 3.14 * radius * radius
    }
}`,
      hints: ['Computed properties cannot have observers.', 'Move the observer to the stored property.', 'Observe radius instead of area.'],
      concepts: ['computed-properties', 'didSet'],
    },
    {
      id: 'swift-props-15',
      title: 'Fix Static Access',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the incorrect access to a static property.',
      skeleton: `struct Config {
    static let maxItems = 100
}
let c = Config()
print(c.maxItems)`,
      solution: `struct Config {
    static let maxItems = 100
}
print(Config.maxItems)`,
      hints: ['Static properties are accessed on the type, not instances.', 'Use Config.maxItems.', 'Remove the instance creation.'],
      concepts: ['static', 'type-properties'],
    },
    {
      id: 'swift-props-16',
      title: 'Predict didSet Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class Box {
    var value: Int = 0 {
        didSet { print("\\(oldValue) -> \\(value)") }
    }
}
let b = Box()
b.value = 5
b.value = 10`,
      solution: `0 -> 5
5 -> 10`,
      hints: ['didSet fires on each assignment.', 'First: old=0, new=5.', 'Second: old=5, new=10.'],
      concepts: ['didSet', 'oldValue'],
    },
    {
      id: 'swift-props-17',
      title: 'Predict willSet Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class Counter {
    var n: Int = 0 {
        willSet { print("will: \\(newValue)") }
        didSet { print("did: \\(n)") }
    }
}
let c = Counter()
c.n = 3`,
      solution: `will: 3
did: 3`,
      hints: ['willSet fires before the change.', 'didSet fires after.', 'Both see the value 3.'],
      concepts: ['willSet', 'didSet'],
    },
    {
      id: 'swift-props-18',
      title: 'Predict Lazy Evaluation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `class Loader {
    lazy var data: String = {
        print("Loading")
        return "Data"
    }()
}
let l = Loader()
print("Created")
print(l.data)`,
      solution: `Created
Loading
Data`,
      hints: ['lazy delays computation until first access.', '"Created" prints first.', '"Loading" prints when data is accessed.'],
      concepts: ['lazy'],
    },
    {
      id: 'swift-props-19',
      title: 'Refactor Method to Computed Property',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Refactor getter methods to computed properties.',
      skeleton: `struct Rect {
    var width: Double, height: Double

    func getArea() -> Double { return width * height }
    func getPerimeter() -> Double { return 2 * (width + height) }
}`,
      solution: `struct Rect {
    var width: Double, height: Double

    var area: Double { return width * height }
    var perimeter: Double { return 2 * (width + height) }
}`,
      hints: ['No-argument getters should be computed properties.', 'Access as rect.area instead of rect.getArea().', 'More idiomatic Swift.'],
      concepts: ['computed-properties', 'refactoring'],
    },
    {
      id: 'swift-props-20',
      title: 'Refactor Manual Observer',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor manual validation into a didSet observer.',
      skeleton: `class Player {
    var health: Int = 100

    func setHealth(_ value: Int) {
        health = max(0, min(100, value))
    }
}
let p = Player()
p.setHealth(150)`,
      solution: `class Player {
    var health: Int = 100 {
        didSet {
            health = max(0, min(100, health))
        }
    }
}
let p = Player()
p.health = 150`,
      hints: ['didSet can clamp the value automatically.', 'No separate setter method needed.', 'Assign directly and the observer validates.'],
      concepts: ['didSet', 'refactoring'],
    },
  ],
};
