import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-wrappers',
  title: '35. Property Wrappers',
  explanation: `## Property Wrappers in Swift

Property wrappers add a layer of separation between code that manages how a property is stored and code that defines a property.

### Basic Property Wrapper

\`\`\`swift
@propertyWrapper
struct Clamped {
    var wrappedValue: Int {
        didSet { wrappedValue = min(max(wrappedValue, range.lowerBound), range.upperBound) }
    }
    let range: ClosedRange<Int>

    init(wrappedValue: Int, _ range: ClosedRange<Int>) {
        self.range = range
        self.wrappedValue = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }
}

struct Player {
    @Clamped(0...100) var health: Int = 100
}
\`\`\`

### Projected Value

Property wrappers can expose additional API through a projected value accessed with \`$\`:

\`\`\`swift
@propertyWrapper
struct Validated {
    var wrappedValue: String {
        didSet { isValid = !wrappedValue.isEmpty }
    }
    var projectedValue: Bool { isValid }
    private var isValid: Bool

    init(wrappedValue: String) {
        self.wrappedValue = wrappedValue
        self.isValid = !wrappedValue.isEmpty
    }
}

struct Form {
    @Validated var name: String = ""
    // $name gives the Bool validation state
}
\`\`\`

### Common Use Cases

- **@State**, **@Binding**, **@Published** in SwiftUI/Combine
- Clamping values to ranges
- Lazy initialization
- Thread-safe access
- Logging/debugging
`,
  exercises: [
    {
      id: 'swift-wrappers-1',
      title: 'Declare a Property Wrapper',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a basic property wrapper.',
      skeleton: `___
struct Trimmed {
    var wrappedValue: String {
        didSet { wrappedValue = wrappedValue.trimmingCharacters(in: .whitespaces) }
    }

    init(wrappedValue: String) {
        self.wrappedValue = wrappedValue.trimmingCharacters(in: .whitespaces)
    }
}`,
      solution: `@propertyWrapper
struct Trimmed {
    var wrappedValue: String {
        didSet { wrappedValue = wrappedValue.trimmingCharacters(in: .whitespaces) }
    }

    init(wrappedValue: String) {
        self.wrappedValue = wrappedValue.trimmingCharacters(in: .whitespaces)
    }
}`,
      hints: [
        'Property wrappers require a specific attribute.',
        'Place it before the struct declaration.',
        'The attribute is @propertyWrapper.',
      ],
      concepts: ['property-wrapper', 'attribute'],
    },
    {
      id: 'swift-wrappers-2',
      title: 'Use a Property Wrapper',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Apply a property wrapper to a stored property.',
      skeleton: `@propertyWrapper
struct Uppercase {
    var wrappedValue: String {
        didSet { wrappedValue = wrappedValue.uppercased() }
    }
    init(wrappedValue: String) {
        self.wrappedValue = wrappedValue.uppercased()
    }
}

struct User {
    ___ var username: String
}

var user = User(username: "alice")
print(user.username)`,
      solution: `@propertyWrapper
struct Uppercase {
    var wrappedValue: String {
        didSet { wrappedValue = wrappedValue.uppercased() }
    }
    init(wrappedValue: String) {
        self.wrappedValue = wrappedValue.uppercased()
    }
}

struct User {
    @Uppercase var username: String
}

var user = User(username: "alice")
print(user.username)`,
      hints: [
        'Apply the wrapper using @ followed by its name.',
        'Place it before the property declaration.',
        'The answer is @Uppercase.',
      ],
      concepts: ['property-wrapper', 'applying-wrapper'],
    },
    {
      id: 'swift-wrappers-3',
      title: 'Wrapped Value Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Implement the required wrappedValue property.',
      skeleton: `@propertyWrapper
struct NonNegative {
    private var value: Int = 0

    var ___: Int {
        get { value }
        set { value = max(0, newValue) }
    }

    init(wrappedValue: Int) {
        self.value = max(0, wrappedValue)
    }
}`,
      solution: `@propertyWrapper
struct NonNegative {
    private var value: Int = 0

    var wrappedValue: Int {
        get { value }
        set { value = max(0, newValue) }
    }

    init(wrappedValue: Int) {
        self.value = max(0, wrappedValue)
    }
}`,
      hints: [
        'Every property wrapper must have a wrappedValue property.',
        'It is the value that the property represents.',
        'The answer is wrappedValue.',
      ],
      concepts: ['wrappedValue', 'property-wrapper'],
    },
    {
      id: 'swift-wrappers-4',
      title: 'Projected Value',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a projected value to a property wrapper.',
      skeleton: `@propertyWrapper
struct Logged {
    var wrappedValue: Int {
        didSet { history.append(wrappedValue) }
    }

    var ___: [Int] { history }
    private var history: [Int]

    init(wrappedValue: Int) {
        self.wrappedValue = wrappedValue
        self.history = [wrappedValue]
    }
}

struct Counter {
    @Logged var count: Int = 0
}

var c = Counter()
c.count = 5
c.count = 10
// c.$count gives [0, 5, 10]`,
      solution: `@propertyWrapper
struct Logged {
    var wrappedValue: Int {
        didSet { history.append(wrappedValue) }
    }

    var projectedValue: [Int] { history }
    private var history: [Int]

    init(wrappedValue: Int) {
        self.wrappedValue = wrappedValue
        self.history = [wrappedValue]
    }
}

struct Counter {
    @Logged var count: Int = 0
}

var c = Counter()
c.count = 5
c.count = 10
// c.$count gives [0, 5, 10]`,
      hints: [
        'Projected values are accessed with the $ prefix.',
        'Define a property named projectedValue.',
        'The answer is projectedValue.',
      ],
      concepts: ['projectedValue', 'dollar-prefix'],
    },
    {
      id: 'swift-wrappers-5',
      title: 'Wrapper with Parameters',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Create a property wrapper that accepts configuration parameters.',
      skeleton: `@propertyWrapper
struct Clamped {
    var wrappedValue: Int {
        didSet { wrappedValue = min(max(wrappedValue, range.lowerBound), range.upperBound) }
    }
    let range: ClosedRange<Int>

    init(wrappedValue: Int, ___ range: ClosedRange<Int>) {
        self.range = range
        self.wrappedValue = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }
}

struct Settings {
    @Clamped(0...100) var volume: Int = 50
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
}

struct Settings {
    @Clamped(0...100) var volume: Int = 50
}`,
      hints: [
        'The init takes wrappedValue and additional parameters.',
        'The range parameter uses an underscore for external name.',
        'The answer is _ (underscore).',
      ],
      concepts: ['wrapper-parameters', 'custom-init'],
    },
    {
      id: 'swift-wrappers-6',
      title: 'Generic Property Wrapper',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Make a property wrapper generic.',
      skeleton: `@propertyWrapper
struct DefaultValue<___> {
    var wrappedValue: T
    let defaultValue: T

    init(wrappedValue: T, default defaultValue: T) {
        self.wrappedValue = wrappedValue
        self.defaultValue = defaultValue
    }

    mutating func reset() {
        wrappedValue = defaultValue
    }
}`,
      solution: `@propertyWrapper
struct DefaultValue<T> {
    var wrappedValue: T
    let defaultValue: T

    init(wrappedValue: T, default defaultValue: T) {
        self.wrappedValue = wrappedValue
        self.defaultValue = defaultValue
    }

    mutating func reset() {
        wrappedValue = defaultValue
    }
}`,
      hints: [
        'Use a generic type parameter for the value type.',
        'The common convention is T.',
        'The answer is T.',
      ],
      concepts: ['generic-wrapper', 'generics'],
    },
    {
      id: 'swift-wrappers-7',
      title: 'Write a UserDefault Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a property wrapper that reads/writes to UserDefaults.',
      skeleton: `// Write a @propertyWrapper struct UserDefault<T> with:
// - let key: String
// - let defaultValue: T
// - wrappedValue that reads/writes UserDefaults.standard
// - init(key:default:)
`,
      solution: `@propertyWrapper
struct UserDefault<T> {
    let key: String
    let defaultValue: T

    var wrappedValue: T {
        get { UserDefaults.standard.object(forKey: key) as? T ?? defaultValue }
        set { UserDefaults.standard.set(newValue, forKey: key) }
    }

    init(key: String, default defaultValue: T) {
        self.key = key
        self.defaultValue = defaultValue
    }
}`,
      hints: [
        'Read from UserDefaults with object(forKey:).',
        'Cast to T? and use ?? for the default.',
        'Write with set(_:forKey:).',
      ],
      concepts: ['property-wrapper', 'UserDefaults', 'persistence'],
    },
    {
      id: 'swift-wrappers-8',
      title: 'Write a Lazy Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a property wrapper that lazily initializes its value.',
      skeleton: `// Write a @propertyWrapper struct LazyInit<T> with:
// - a private var storage: T? starting as nil
// - a let initializer: () -> T
// - wrappedValue that initializes on first access
`,
      solution: `@propertyWrapper
struct LazyInit<T> {
    private var storage: T?
    private let initializer: () -> T

    var wrappedValue: T {
        mutating get {
            if let value = storage {
                return value
            }
            let value = initializer()
            storage = value
            return value
        }
        set {
            storage = newValue
        }
    }

    init(_ initializer: @escaping () -> T) {
        self.initializer = initializer
    }
}`,
      hints: [
        'Store nil initially and create on first get.',
        'The getter must be mutating to update storage.',
        'Cache the result for subsequent accesses.',
      ],
      concepts: ['lazy-initialization', 'property-wrapper', 'mutating-get'],
    },
    {
      id: 'swift-wrappers-9',
      title: 'Write a Validated Email Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a property wrapper that validates email format.',
      skeleton: `// Write a @propertyWrapper struct Email with:
// - wrappedValue: String
// - projectedValue: Bool (true if valid email format)
// - Validation: contains "@" and "." after "@"
`,
      solution: `@propertyWrapper
struct Email {
    var wrappedValue: String {
        didSet { updateValidation() }
    }

    var projectedValue: Bool

    init(wrappedValue: String) {
        self.wrappedValue = wrappedValue
        self.projectedValue = false
        updateValidation()
    }

    private mutating func updateValidation() {
        let parts = wrappedValue.split(separator: "@")
        projectedValue = parts.count == 2 && parts[1].contains(".")
    }
}`,
      hints: [
        'Validate on init and on every set.',
        'projectedValue exposes validation state via $.',
        'Split by @ and check for . in the domain part.',
      ],
      concepts: ['projectedValue', 'validation', 'property-wrapper'],
    },
    {
      id: 'swift-wrappers-10',
      title: 'Write a Thread-Safe Wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a property wrapper that provides thread-safe access.',
      skeleton: `// Write a @propertyWrapper struct Atomic<T> with:
// - Uses NSLock for synchronization
// - Thread-safe get and set for wrappedValue
`,
      solution: `import Foundation

@propertyWrapper
struct Atomic<T> {
    private var value: T
    private let lock = NSLock()

    var wrappedValue: T {
        get {
            lock.lock()
            defer { lock.unlock() }
            return value
        }
        set {
            lock.lock()
            defer { lock.unlock() }
            value = newValue
        }
    }

    init(wrappedValue: T) {
        self.value = wrappedValue
    }
}`,
      hints: [
        'Use NSLock to protect both get and set.',
        'defer ensures unlock even if an error occurs.',
        'Lock before access, unlock after.',
      ],
      concepts: ['thread-safety', 'NSLock', 'property-wrapper'],
    },
    {
      id: 'swift-wrappers-11',
      title: 'Write a Capped Collection Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a property wrapper that caps the size of an array.',
      skeleton: `// Write a @propertyWrapper struct MaxCount<T> with:
// - let maxCount: Int
// - wrappedValue: [T] that truncates to maxCount on set
// - projectedValue: Bool (true if at capacity)
`,
      solution: `@propertyWrapper
struct MaxCount<T> {
    let maxCount: Int
    private var storage: [T] = []

    var wrappedValue: [T] {
        get { storage }
        set { storage = Array(newValue.prefix(maxCount)) }
    }

    var projectedValue: Bool {
        storage.count >= maxCount
    }

    init(wrappedValue: [T], _ maxCount: Int) {
        self.maxCount = maxCount
        self.storage = Array(wrappedValue.prefix(maxCount))
    }
}`,
      hints: [
        'Use prefix(maxCount) to truncate on set.',
        'projectedValue returns true when at capacity.',
        'Initialize storage with the truncated initial value.',
      ],
      concepts: ['property-wrapper', 'collection-capping', 'projectedValue'],
    },
    {
      id: 'swift-wrappers-12',
      title: 'Write a Debounced Wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a property wrapper that debounces value changes.',
      skeleton: `// Write a @propertyWrapper struct Debounced with:
// - wrappedValue: String
// - projectedValue: String (the debounced/committed value)
// - func commit() that saves wrappedValue to projectedValue
// (simplified debounce without timer for exercise purposes)
`,
      solution: `@propertyWrapper
struct Debounced {
    var wrappedValue: String
    var projectedValue: String

    init(wrappedValue: String) {
        self.wrappedValue = wrappedValue
        self.projectedValue = wrappedValue
    }

    mutating func commit() {
        projectedValue = wrappedValue
    }
}`,
      hints: [
        'wrappedValue is the current/pending value.',
        'projectedValue is the committed/debounced value.',
        'commit() copies wrappedValue to projectedValue.',
      ],
      concepts: ['property-wrapper', 'debounce', 'projectedValue'],
    },
    {
      id: 'swift-wrappers-13',
      title: 'Fix Missing wrappedValue Init',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the property wrapper that cannot be used with default values.',
      skeleton: `@propertyWrapper
struct Lowered {
    var wrappedValue: String {
        didSet { wrappedValue = wrappedValue.lowercased() }
    }
}

struct Tag {
    @Lowered var name: String = "SWIFT"
}`,
      solution: `@propertyWrapper
struct Lowered {
    var wrappedValue: String {
        didSet { wrappedValue = wrappedValue.lowercased() }
    }

    init(wrappedValue: String) {
        self.wrappedValue = wrappedValue.lowercased()
    }
}

struct Tag {
    @Lowered var name: String = "SWIFT"
}`,
      hints: [
        'Property wrappers need init(wrappedValue:) to support default values.',
        'The init should also apply the transformation.',
        'Add init(wrappedValue:) that lowercases.',
      ],
      concepts: ['wrappedValue-init', 'property-wrapper'],
    },
    {
      id: 'swift-wrappers-14',
      title: 'Fix Wrapper didSet Not Firing',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the property wrapper where initial value skips didSet.',
      skeleton: `@propertyWrapper
struct Positive {
    var wrappedValue: Int {
        didSet {
            if wrappedValue < 0 { wrappedValue = 0 }
        }
    }

    init(wrappedValue: Int) {
        self.wrappedValue = wrappedValue
    }
}

struct Account {
    @Positive var balance: Int = -50
}

let acc = Account()
print(acc.balance) // Prints -50, should print 0`,
      solution: `@propertyWrapper
struct Positive {
    var wrappedValue: Int {
        didSet {
            if wrappedValue < 0 { wrappedValue = 0 }
        }
    }

    init(wrappedValue: Int) {
        self.wrappedValue = max(0, wrappedValue)
    }
}

struct Account {
    @Positive var balance: Int = -50
}

let acc = Account()
print(acc.balance)`,
      hints: [
        'didSet is not called during init.',
        'Apply the constraint in the initializer as well.',
        'Use max(0, wrappedValue) in init.',
      ],
      concepts: ['didSet-init', 'property-wrapper', 'initialization'],
    },
    {
      id: 'swift-wrappers-15',
      title: 'Fix Projected Value Type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the projected value that returns the wrong type.',
      skeleton: `@propertyWrapper
struct Sanitized {
    var wrappedValue: String {
        didSet { _isModified = true }
    }
    var projectedValue: String { wrappedValue }
    private var _isModified = false

    init(wrappedValue: String) {
        self.wrappedValue = wrappedValue
    }
}

struct Input {
    @Sanitized var text: String = ""
}

var input = Input()
input.text = "hello"
// input.$text should tell us if the value was modified
let wasModified: Bool = input.$text  // Type error!`,
      solution: `@propertyWrapper
struct Sanitized {
    var wrappedValue: String {
        didSet { _isModified = true }
    }
    var projectedValue: Bool { _isModified }
    private var _isModified = false

    init(wrappedValue: String) {
        self.wrappedValue = wrappedValue
    }
}

struct Input {
    @Sanitized var text: String = ""
}

var input = Input()
input.text = "hello"
let wasModified: Bool = input.$text`,
      hints: [
        'projectedValue should return the modification state, not the value.',
        'Change the return type to Bool.',
        'Return _isModified instead of wrappedValue.',
      ],
      concepts: ['projectedValue', 'type-mismatch'],
    },
    {
      id: 'swift-wrappers-16',
      title: 'Predict Wrapper Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the output of a clamping property wrapper.',
      skeleton: `@propertyWrapper
struct Clamped {
    var wrappedValue: Int {
        didSet { wrappedValue = min(max(wrappedValue, 0), 100) }
    }
    init(wrappedValue: Int) {
        self.wrappedValue = min(max(wrappedValue, 0), 100)
    }
}

struct Volume {
    @Clamped var level: Int = 50
}

var v = Volume()
v.level = 150
print(v.level)
v.level = -20
print(v.level)`,
      solution: `100
0`,
      hints: [
        '150 is clamped to max 100.',
        '-20 is clamped to min 0.',
        'The wrapper enforces 0...100 range.',
      ],
      concepts: ['clamping', 'property-wrapper'],
    },
    {
      id: 'swift-wrappers-17',
      title: 'Predict Projected Value Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the projected value after mutations.',
      skeleton: `@propertyWrapper
struct Tracked {
    var wrappedValue: String {
        didSet { changeCount += 1 }
    }
    var projectedValue: Int { changeCount }
    private var changeCount = 0

    init(wrappedValue: String) {
        self.wrappedValue = wrappedValue
    }
}

struct Doc {
    @Tracked var title: String = "Untitled"
}

var doc = Doc()
doc.title = "A"
doc.title = "B"
doc.title = "C"
print(doc.$title)`,
      solution: `3`,
      hints: [
        'Each assignment triggers didSet which increments changeCount.',
        'Three assignments: "A", "B", "C".',
        '$title returns the changeCount which is 3.',
      ],
      concepts: ['projectedValue', 'tracking-changes'],
    },
    {
      id: 'swift-wrappers-18',
      title: 'Predict Wrapper Init Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict whether didSet fires during initialization.',
      skeleton: `@propertyWrapper
struct Logged {
    var wrappedValue: Int {
        didSet { print("changed to \\(wrappedValue)") }
    }
    init(wrappedValue: Int) {
        print("init with \\(wrappedValue)")
        self.wrappedValue = wrappedValue
    }
}

struct Box {
    @Logged var value: Int = 10
}

let _ = Box()`,
      solution: `init with 10`,
      hints: [
        'didSet does not fire during init.',
        'Only the init prints.',
        'The output is just the init message.',
      ],
      concepts: ['didSet-init-behavior', 'property-wrapper'],
    },
    {
      id: 'swift-wrappers-19',
      title: 'Refactor Manual Validation to Wrapper',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor manual validation logic into a property wrapper.',
      skeleton: `struct RegistrationForm {
    private var _username: String = ""
    var isUsernameValid: Bool = false

    var username: String {
        get { _username }
        set {
            _username = newValue
            isUsernameValid = newValue.count >= 3 && newValue.count <= 20
        }
    }

    private var _email: String = ""
    var isEmailValid: Bool = false

    var email: String {
        get { _email }
        set {
            _email = newValue
            isEmailValid = newValue.contains("@")
        }
    }
}`,
      solution: `@propertyWrapper
struct Validated {
    var wrappedValue: String {
        didSet { projectedValue = validator(wrappedValue) }
    }
    var projectedValue: Bool
    private let validator: (String) -> Bool

    init(wrappedValue: String, _ validator: @escaping (String) -> Bool) {
        self.validator = validator
        self.wrappedValue = wrappedValue
        self.projectedValue = validator(wrappedValue)
    }
}

struct RegistrationForm {
    @Validated({ $0.count >= 3 && $0.count <= 20 })
    var username: String = ""

    @Validated({ $0.contains("@") })
    var email: String = ""

    // $username and $email give Bool validation states
}`,
      hints: [
        'Extract the validation pattern into a property wrapper.',
        'Use a closure parameter for the validation rule.',
        'projectedValue exposes the validation state.',
      ],
      concepts: ['property-wrapper', 'validation', 'refactoring'],
    },
    {
      id: 'swift-wrappers-20',
      title: 'Refactor Repeated Clamping to Wrapper',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Refactor repeated clamping logic into a property wrapper.',
      skeleton: `struct ColorComponent {
    private var _red: Double = 0
    var red: Double {
        get { _red }
        set { _red = min(max(newValue, 0), 1) }
    }

    private var _green: Double = 0
    var green: Double {
        get { _green }
        set { _green = min(max(newValue, 0), 1) }
    }

    private var _blue: Double = 0
    var blue: Double {
        get { _blue }
        set { _blue = min(max(newValue, 0), 1) }
    }
}`,
      solution: `@propertyWrapper
struct UnitClamped {
    var wrappedValue: Double {
        didSet { wrappedValue = min(max(wrappedValue, 0), 1) }
    }
    init(wrappedValue: Double) {
        self.wrappedValue = min(max(wrappedValue, 0), 1)
    }
}

struct ColorComponent {
    @UnitClamped var red: Double = 0
    @UnitClamped var green: Double = 0
    @UnitClamped var blue: Double = 0
}`,
      hints: [
        'All three properties use the same clamping logic.',
        'Extract it into a UnitClamped wrapper.',
        'Apply the wrapper to each property.',
      ],
      concepts: ['property-wrapper', 'DRY', 'refactoring'],
    },
  ],
};
