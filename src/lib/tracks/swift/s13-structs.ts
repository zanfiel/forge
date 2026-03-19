import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-struct',
  title: '13. Structs',
  explanation: `## Structs in Swift

Structs are value types that support properties, methods, and initializers.

\`\`\`swift
struct Point {
    var x: Double
    var y: Double
}

let p = Point(x: 3, y: 4)  // Memberwise init
\`\`\`

### Mutating Methods
Value types require \`mutating\` to modify properties:
\`\`\`swift
struct Counter {
    var count = 0

    mutating func increment() {
        count += 1
    }
}
\`\`\`

### Value Semantics
\`\`\`swift
var a = Point(x: 1, y: 2)
var b = a       // b is a copy
b.x = 10       // a.x is still 1
\`\`\``,
  exercises: [
    {
      id: 'swift-struct-1',
      title: 'Declare a Struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a struct with two stored properties.',
      skeleton: `___ Size {
    var width: Double
    var height: Double
}`,
      solution: `struct Size {
    var width: Double
    var height: Double
}`,
      hints: [
        'Use the `struct` keyword.',
        'Properties are declared with var or let.',
        'Structs get a memberwise initializer automatically.',
      ],
      concepts: ['struct', 'stored-properties'],
    },
    {
      id: 'swift-struct-2',
      title: 'Memberwise Initializer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Create an instance using the memberwise initializer.',
      skeleton: `struct Color {
    var r: Int, g: Int, b: Int
}
let red = Color(___ : 255, ___: 0, ___: 0)`,
      solution: `struct Color {
    var r: Int, g: Int, b: Int
}
let red = Color(r: 255, g: 0, b: 0)`,
      hints: [
        'Memberwise init uses property names as labels.',
        'Pass values in the order of declaration.',
        'All properties must be provided.',
      ],
      concepts: ['memberwise-init'],
    },
    {
      id: 'swift-struct-3',
      title: 'Mutating Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Mark the method as mutating so it can modify a property.',
      skeleton: `struct Stack {
    var items: [Int] = []

    ___ func push(_ item: Int) {
        items.append(item)
    }
}`,
      solution: `struct Stack {
    var items: [Int] = []

    mutating func push(_ item: Int) {
        items.append(item)
    }
}`,
      hints: [
        'Value types need `mutating` to modify self.',
        'Place mutating before func.',
        'Without it, you cannot modify properties.',
      ],
      concepts: ['mutating'],
    },
    {
      id: 'swift-struct-4',
      title: 'Computed Property',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a computed property for the area.',
      skeleton: `struct Rectangle {
    var width: Double
    var height: Double

    var area: Double {
        ___ width * height
    }
}`,
      solution: `struct Rectangle {
    var width: Double
    var height: Double

    var area: Double {
        return width * height
    }
}`,
      hints: [
        'Computed properties calculate a value on access.',
        'Use return to provide the value.',
        'No stored backing is needed.',
      ],
      concepts: ['computed-properties'],
    },
    {
      id: 'swift-struct-5',
      title: 'Default Property Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Give the property a default value.',
      skeleton: `struct Settings {
    var volume: Int ___ 50
    var brightness: Int ___ 100
}`,
      solution: `struct Settings {
    var volume: Int = 50
    var brightness: Int = 100
}`,
      hints: [
        'Default values use = after the type.',
        'Properties with defaults are optional in the memberwise init.',
        'You can still override them at creation.',
      ],
      concepts: ['default-values'],
    },
    {
      id: 'swift-struct-6',
      title: 'Static Property',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Add a static property to the struct.',
      skeleton: `struct Math {
    ___ let pi = 3.14159
}
let val = Math.pi`,
      solution: `struct Math {
    static let pi = 3.14159
}
let val = Math.pi`,
      hints: [
        'Static properties belong to the type, not instances.',
        'Use the `static` keyword before let or var.',
        'Access with TypeName.property.',
      ],
      concepts: ['static', 'type-properties'],
    },
    {
      id: 'swift-struct-7',
      title: 'Write a Point Struct',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a Point struct with a distance method that calculates distance to another point.',
      skeleton: `struct Point {
    var x: Double
    var y: Double

    func distance(to other: Point) -> Double {
        // Calculate Euclidean distance
    }
}`,
      solution: `struct Point {
    var x: Double
    var y: Double

    func distance(to other: Point) -> Double {
        let dx = x - other.x
        let dy = y - other.y
        return (dx * dx + dy * dy).squareRoot()
    }
}`,
      hints: [
        'Euclidean distance: sqrt((x2-x1)^2 + (y2-y1)^2).',
        'Use .squareRoot() on Double.',
        'Calculate dx and dy differences first.',
      ],
      concepts: ['methods', 'math'],
    },
    {
      id: 'swift-struct-8',
      title: 'Custom Initializer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct with a custom initializer that creates a square from a side length.',
      skeleton: `struct Rectangle {
    var width: Double
    var height: Double

    init(side: Double) {
        // Initialize as a square
    }
}`,
      solution: `struct Rectangle {
    var width: Double
    var height: Double

    init(side: Double) {
        self.width = side
        self.height = side
    }
}`,
      hints: [
        'Assign side to both width and height.',
        'Use self.property to set values.',
        'Custom init replaces the memberwise init.',
      ],
      concepts: ['custom-init', 'self'],
    },
    {
      id: 'swift-struct-9',
      title: 'Mutating Toggle',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write a struct with a mutating method that toggles a Boolean property.',
      skeleton: `struct Switch {
    var isOn: Bool

    // Add a mutating toggle method
}`,
      solution: `struct Switch {
    var isOn: Bool

    mutating func toggle() {
        isOn.toggle()
    }
}`,
      hints: [
        'Use the mutating keyword.',
        'Bool has a built-in toggle() method.',
        'Or use isOn = !isOn.',
      ],
      concepts: ['mutating', 'toggle'],
    },
    {
      id: 'swift-struct-10',
      title: 'Struct with Protocol',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct that conforms to CustomStringConvertible.',
      skeleton: `struct Temperature: CustomStringConvertible {
    var celsius: Double

    var description: String {
        // Return "XX.X°C"
    }
}`,
      solution: `struct Temperature: CustomStringConvertible {
    var celsius: Double

    var description: String {
        return "\\(celsius)°C"
    }
}`,
      hints: [
        'CustomStringConvertible requires a description property.',
        'Return a formatted string.',
        'Use string interpolation.',
      ],
      concepts: ['CustomStringConvertible', 'protocols'],
    },
    {
      id: 'swift-struct-11',
      title: 'Value Type Behavior',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write code demonstrating that structs are copied on assignment.',
      skeleton: `struct Box {
    var value: Int
}
// Create box1 with value 10, copy to box2, change box2.value to 20
// Print both to show they are independent
`,
      solution: `struct Box {
    var value: Int
}
var box1 = Box(value: 10)
var box2 = box1
box2.value = 20
print(box1.value)
print(box2.value)`,
      hints: [
        'Assigning a struct creates a copy.',
        'Modifying the copy does not affect the original.',
        'box1.value stays 10, box2.value becomes 20.',
      ],
      concepts: ['value-semantics', 'copy-on-assign'],
    },
    {
      id: 'swift-struct-12',
      title: 'Struct with Static Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct with a static factory method.',
      skeleton: `struct Color {
    var r: Int, g: Int, b: Int

    // Add a static method 'white' that returns Color(r:255, g:255, b:255)
}`,
      solution: `struct Color {
    var r: Int, g: Int, b: Int

    static func white() -> Color {
        return Color(r: 255, g: 255, b: 255)
    }
}`,
      hints: [
        'Static methods belong to the type.',
        'They can create and return instances.',
        'Called as Color.white().',
      ],
      concepts: ['static', 'factory-method'],
    },
    {
      id: 'swift-struct-13',
      title: 'Fix Missing Mutating',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the method that tries to modify a property without mutating.',
      skeleton: `struct Timer {
    var seconds = 0

    func tick() {
        seconds += 1
    }
}`,
      solution: `struct Timer {
    var seconds = 0

    mutating func tick() {
        seconds += 1
    }
}`,
      hints: [
        'Modifying properties requires `mutating`.',
        'Without it, self is immutable.',
        'Add mutating before func.',
      ],
      concepts: ['mutating'],
    },
    {
      id: 'swift-struct-14',
      title: 'Fix Let Instance Mutation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code that tries to mutate a let struct instance.',
      skeleton: `struct Point { var x: Int, y: Int }
let p = Point(x: 0, y: 0)
p.x = 5`,
      solution: `struct Point { var x: Int, y: Int }
var p = Point(x: 0, y: 0)
p.x = 5`,
      hints: [
        'let struct instances are fully immutable.',
        'Change let to var to allow property mutation.',
        'Value type instances respect let/var.',
      ],
      concepts: ['let', 'var', 'value-semantics'],
    },
    {
      id: 'swift-struct-15',
      title: 'Fix Self Assignment in Init',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the initializer where the property is not being set correctly.',
      skeleton: `struct User {
    var name: String

    init(name: String) {
        name = name
    }
}`,
      solution: `struct User {
    var name: String

    init(name: String) {
        self.name = name
    }
}`,
      hints: [
        'Parameter name shadows the property name.',
        'Use self.name to refer to the property.',
        'self disambiguates property from parameter.',
      ],
      concepts: ['self', 'init', 'shadowing'],
    },
    {
      id: 'swift-struct-16',
      title: 'Predict Value Semantics',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `struct Pair { var a: Int, b: Int }
var x = Pair(a: 1, b: 2)
var y = x
y.a = 10
print(x.a)`,
      solution: `1`,
      hints: [
        'Structs are value types -- copied on assignment.',
        'y is a separate copy from x.',
        'Changing y.a does not affect x.a.',
      ],
      concepts: ['value-semantics'],
    },
    {
      id: 'swift-struct-17',
      title: 'Predict Computed Property',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `struct Square {
    var side: Double
    var area: Double { return side * side }
}
let s = Square(side: 5)
print(s.area)`,
      solution: `25.0`,
      hints: [
        'area is computed from side * side.',
        '5 * 5 = 25.',
        'Double output shows 25.0.',
      ],
      concepts: ['computed-properties'],
    },
    {
      id: 'swift-struct-18',
      title: 'Predict Mutating Method',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `struct Counter {
    var value = 0
    mutating func add(_ n: Int) { value += n }
}
var c = Counter()
c.add(5)
c.add(3)
print(c.value)`,
      solution: `8`,
      hints: [
        'add(5) sets value to 5.',
        'add(3) sets value to 8.',
        'Final value is 8.',
      ],
      concepts: ['mutating', 'methods'],
    },
    {
      id: 'swift-struct-19',
      title: 'Refactor Class to Struct',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor a simple class to a struct since no reference semantics are needed.',
      skeleton: `class Coordinate {
    var lat: Double
    var lon: Double

    init(lat: Double, lon: Double) {
        self.lat = lat
        self.lon = lon
    }
}`,
      solution: `struct Coordinate {
    var lat: Double
    var lon: Double
}`,
      hints: [
        'Simple data types are better as structs.',
        'Structs get a free memberwise init.',
        'No need for a custom initializer.',
      ],
      concepts: ['struct-vs-class', 'refactoring'],
    },
    {
      id: 'swift-struct-20',
      title: 'Refactor to Computed Property',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Refactor the method to a computed property.',
      skeleton: `struct Circle {
    var radius: Double

    func getArea() -> Double {
        return 3.14159 * radius * radius
    }
}`,
      solution: `struct Circle {
    var radius: Double

    var area: Double {
        return 3.14159 * radius * radius
    }
}`,
      hints: [
        'No-argument methods returning a value can be computed properties.',
        'Computed properties are more idiomatic in Swift.',
        'Access as circle.area instead of circle.getArea().',
      ],
      concepts: ['computed-properties', 'refactoring'],
    },
  ],
};
