import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-operators',
  title: '39. Custom Operators',
  explanation: `## Custom Operators in Swift

Swift lets you define custom operators with their own precedence and associativity.

### Operator Types

- **prefix**: before operand (\`-x\`, \`!x\`)
- **infix**: between operands (\`a + b\`)
- **postfix**: after operand (\`x!\`)

### Declaring Custom Operators

\`\`\`swift
// Declare the operator
infix operator ** : MultiplicationPrecedence

// Implement it
func ** (base: Double, power: Double) -> Double {
    return pow(base, power)
}

let result = 2.0 ** 3.0  // 8.0
\`\`\`

### Precedence Groups

\`\`\`swift
precedencegroup ExponentiationPrecedence {
    higherThan: MultiplicationPrecedence
    associativity: right
}

infix operator ** : ExponentiationPrecedence
\`\`\`

### Overloading Existing Operators

\`\`\`swift
struct Vector2D {
    var x: Double
    var y: Double

    static func + (lhs: Vector2D, rhs: Vector2D) -> Vector2D {
        return Vector2D(x: lhs.x + rhs.x, y: lhs.y + rhs.y)
    }

    static prefix func - (v: Vector2D) -> Vector2D {
        return Vector2D(x: -v.x, y: -v.y)
    }
}
\`\`\`
`,
  exercises: [
    {
      id: 'swift-operators-1',
      title: 'Declare an Infix Operator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Declare a custom infix operator.',
      skeleton: `___ operator ** : MultiplicationPrecedence

func ** (base: Double, power: Double) -> Double {
    return pow(base, power)
}

print(2.0 ** 3.0)`,
      solution: `infix operator ** : MultiplicationPrecedence

func ** (base: Double, power: Double) -> Double {
    return pow(base, power)
}

print(2.0 ** 3.0)`,
      hints: [
        'An operator between two operands is infix.',
        'Specify the precedence group after the colon.',
        'The keyword is infix.',
      ],
      concepts: ['infix-operator', 'operator-declaration'],
    },
    {
      id: 'swift-operators-2',
      title: 'Declare a Prefix Operator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Declare a custom prefix operator.',
      skeleton: `___ operator +++

___ func +++ (value: Int) -> Int {
    return value * value
}

print(+++5)`,
      solution: `prefix operator +++

prefix func +++ (value: Int) -> Int {
    return value * value
}

print(+++5)`,
      hints: [
        'Prefix operators go before the operand.',
        'Both the declaration and function need the prefix keyword.',
        'The answer is prefix for both blanks.',
      ],
      concepts: ['prefix-operator'],
    },
    {
      id: 'swift-operators-3',
      title: 'Overload + for Custom Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Overload the + operator for a custom struct.',
      skeleton: `struct Money {
    let amount: Double
    let currency: String

    ___ func + (lhs: Money, rhs: Money) -> Money {
        return Money(amount: lhs.amount + rhs.amount, currency: lhs.currency)
    }
}

let total = Money(amount: 10, currency: "USD") + Money(amount: 5, currency: "USD")
print(total.amount)`,
      solution: `struct Money {
    let amount: Double
    let currency: String

    static func + (lhs: Money, rhs: Money) -> Money {
        return Money(amount: lhs.amount + rhs.amount, currency: lhs.currency)
    }
}

let total = Money(amount: 10, currency: "USD") + Money(amount: 5, currency: "USD")
print(total.amount)`,
      hints: [
        'Operator overloads are static methods.',
        'Use the static keyword before func.',
        'The answer is static.',
      ],
      concepts: ['operator-overloading', 'static-method'],
    },
    {
      id: 'swift-operators-4',
      title: 'Precedence Group Declaration',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Declare a custom precedence group.',
      skeleton: `___ ExponentiationPrecedence {
    higherThan: MultiplicationPrecedence
    associativity: right
}

infix operator ** : ExponentiationPrecedence`,
      solution: `precedencegroup ExponentiationPrecedence {
    higherThan: MultiplicationPrecedence
    associativity: right
}

infix operator ** : ExponentiationPrecedence`,
      hints: [
        'Precedence groups define operator priority.',
        'Use the precedencegroup keyword.',
        'The answer is precedencegroup.',
      ],
      concepts: ['precedence-group', 'associativity'],
    },
    {
      id: 'swift-operators-5',
      title: 'Compound Assignment Operator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Implement a compound assignment operator.',
      skeleton: `struct Vector {
    var x: Double
    var y: Double

    static func + (lhs: Vector, rhs: Vector) -> Vector {
        Vector(x: lhs.x + rhs.x, y: lhs.y + rhs.y)
    }

    static func += (lhs: ___ Vector, rhs: Vector) {
        lhs = lhs + rhs
    }
}`,
      solution: `struct Vector {
    var x: Double
    var y: Double

    static func + (lhs: Vector, rhs: Vector) -> Vector {
        Vector(x: lhs.x + rhs.x, y: lhs.y + rhs.y)
    }

    static func += (lhs: inout Vector, rhs: Vector) {
        lhs = lhs + rhs
    }
}`,
      hints: [
        'Compound assignment modifies the left operand.',
        'Use inout to allow mutation.',
        'The answer is inout.',
      ],
      concepts: ['compound-assignment', 'inout'],
    },
    {
      id: 'swift-operators-6',
      title: 'Equatable Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Implement the == operator for a custom type.',
      skeleton: `struct Color: Equatable {
    let r: Int, g: Int, b: Int

    static func ___ (lhs: Color, rhs: Color) -> Bool {
        return lhs.r == rhs.r && lhs.g == rhs.g && lhs.b == rhs.b
    }
}

print(Color(r: 255, g: 0, b: 0) == Color(r: 255, g: 0, b: 0))`,
      solution: `struct Color: Equatable {
    let r: Int, g: Int, b: Int

    static func == (lhs: Color, rhs: Color) -> Bool {
        return lhs.r == rhs.r && lhs.g == rhs.g && lhs.b == rhs.b
    }
}

print(Color(r: 255, g: 0, b: 0) == Color(r: 255, g: 0, b: 0))`,
      hints: [
        'Equatable requires the == operator.',
        'Compare all properties for equality.',
        'The operator is ==.',
      ],
      concepts: ['equatable', 'equality-operator'],
    },
    {
      id: 'swift-operators-7',
      title: 'Write a Vector Math Suite',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write operator overloads for a 2D vector type.',
      skeleton: `struct Vec2 {
    var x: Double, y: Double
}

// Implement: + (add), - (subtract), * (scalar multiply),
// prefix - (negate), == (equality)
`,
      solution: `struct Vec2: Equatable {
    var x: Double, y: Double

    static func + (lhs: Vec2, rhs: Vec2) -> Vec2 {
        Vec2(x: lhs.x + rhs.x, y: lhs.y + rhs.y)
    }

    static func - (lhs: Vec2, rhs: Vec2) -> Vec2 {
        Vec2(x: lhs.x - rhs.x, y: lhs.y - rhs.y)
    }

    static func * (lhs: Vec2, rhs: Double) -> Vec2 {
        Vec2(x: lhs.x * rhs, y: lhs.y * rhs)
    }

    static prefix func - (v: Vec2) -> Vec2 {
        Vec2(x: -v.x, y: -v.y)
    }
}`,
      hints: [
        'Each operator is a static func.',
        'Scalar multiply takes Vec2 and Double.',
        'prefix - negates both components.',
      ],
      concepts: ['operator-overloading', 'vector-math'],
    },
    {
      id: 'swift-operators-8',
      title: 'Write a Pipe Operator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a pipe-forward operator that passes a value to a function.',
      skeleton: `// Declare and implement a |> operator:
// let result = 5 |> double |> addTen
// where double and addTen are (Int) -> Int functions
`,
      solution: `infix operator |> : AdditionPrecedence

func |> <A, B>(value: A, f: (A) -> B) -> B {
    return f(value)
}

func double(_ x: Int) -> Int { x * 2 }
func addTen(_ x: Int) -> Int { x + 10 }

let result = 5 |> double |> addTen  // 20`,
      hints: [
        'The pipe operator passes the left value to the right function.',
        'Use generics A and B for input and output types.',
        'AdditionPrecedence gives left-to-right evaluation.',
      ],
      concepts: ['pipe-operator', 'functional-programming'],
    },
    {
      id: 'swift-operators-9',
      title: 'Write a Nil-Coalescing Throw Operator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write an operator that unwraps an optional or throws an error.',
      skeleton: `// Declare and implement a !! operator that:
// - takes an Optional<T> on the left
// - takes an Error on the right
// - returns T if non-nil, throws the error if nil
`,
      solution: `infix operator !! : NilCoalescingPrecedence

func !! <T>(optional: T?, error: @autoclosure () -> Error) throws -> T {
    guard let value = optional else { throw error() }
    return value
}`,
      hints: [
        'Similar to ?? but throws instead of providing a default.',
        'Use @autoclosure for the error to defer creation.',
        'NilCoalescingPrecedence matches ?? behavior.',
      ],
      concepts: ['custom-operator', 'error-handling', 'autoclosure'],
    },
    {
      id: 'swift-operators-10',
      title: 'Write a Matrix Multiply Operator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a custom operator for matrix multiplication.',
      skeleton: `struct Matrix2x2 {
    let values: [[Double]] // 2x2 array
}

// Declare and implement a ** operator for Matrix2x2 multiplication
// [[a,b],[c,d]] ** [[e,f],[g,h]] = [[ae+bg, af+bh],[ce+dg, cf+dh]]
`,
      solution: `infix operator ** : MultiplicationPrecedence

func ** (lhs: Matrix2x2, rhs: Matrix2x2) -> Matrix2x2 {
    let a = lhs.values, b = rhs.values
    return Matrix2x2(values: [
        [a[0][0]*b[0][0] + a[0][1]*b[1][0], a[0][0]*b[0][1] + a[0][1]*b[1][1]],
        [a[1][0]*b[0][0] + a[1][1]*b[1][0], a[1][0]*b[0][1] + a[1][1]*b[1][1]],
    ])
}`,
      hints: [
        'Standard 2x2 matrix multiplication formula.',
        'Each element is a dot product of row and column.',
        'Use MultiplicationPrecedence.',
      ],
      concepts: ['matrix-multiplication', 'custom-operator'],
    },
    {
      id: 'swift-operators-11',
      title: 'Write Comparable Operators',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Implement Comparable for a custom type.',
      skeleton: `struct Version {
    let major: Int
    let minor: Int
    let patch: Int
}

// Make Version conform to Comparable
// Compare major first, then minor, then patch
`,
      solution: `extension Version: Comparable {
    static func < (lhs: Version, rhs: Version) -> Bool {
        if lhs.major != rhs.major { return lhs.major < rhs.major }
        if lhs.minor != rhs.minor { return lhs.minor < rhs.minor }
        return lhs.patch < rhs.patch
    }

    static func == (lhs: Version, rhs: Version) -> Bool {
        return lhs.major == rhs.major && lhs.minor == rhs.minor && lhs.patch == rhs.patch
    }
}`,
      hints: [
        'Comparable requires < and ==.',
        'Compare most significant component first.',
        'Other operators (>, <=, >=) are derived automatically.',
      ],
      concepts: ['comparable', 'operator-overloading'],
    },
    {
      id: 'swift-operators-12',
      title: 'Write a Postfix Operator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a postfix operator for percentage conversion.',
      skeleton: `// Declare and implement a postfix % operator
// that converts an Int to a Double percentage
// 50% -> 0.5
`,
      solution: `postfix operator %

postfix func % (value: Int) -> Double {
    return Double(value) / 100.0
}

let half = 50%  // 0.5`,
      hints: [
        'Postfix operators come after the operand.',
        'Declare with postfix operator.',
        'Convert Int to Double and divide by 100.',
      ],
      concepts: ['postfix-operator', 'percentage'],
    },
    {
      id: 'swift-operators-13',
      title: 'Fix Operator Precedence',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix an operator that has wrong precedence causing incorrect evaluation.',
      skeleton: `infix operator ** : AdditionPrecedence

func ** (base: Double, power: Double) -> Double {
    return pow(base, power)
}

// 2 + 3 ** 2 should be 2 + 9 = 11
// But with AdditionPrecedence it evaluates as (2 + 3) ** 2 = 25
let result = 2.0 + 3.0 ** 2.0
print(result)`,
      solution: `precedencegroup ExponentiationPrecedence {
    higherThan: MultiplicationPrecedence
    associativity: right
}

infix operator ** : ExponentiationPrecedence

func ** (base: Double, power: Double) -> Double {
    return pow(base, power)
}

let result = 2.0 + 3.0 ** 2.0
print(result)`,
      hints: [
        'Exponentiation should have higher precedence than addition.',
        'Create a custom precedence group higher than MultiplicationPrecedence.',
        'Exponentiation is right-associative.',
      ],
      concepts: ['precedence-group', 'operator-precedence'],
    },
    {
      id: 'swift-operators-14',
      title: 'Fix Missing Static Keyword',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the operator overload that is missing static.',
      skeleton: `struct Point {
    var x: Double, y: Double

    func + (lhs: Point, rhs: Point) -> Point {
        Point(x: lhs.x + rhs.x, y: lhs.y + rhs.y)
    }
}

let p = Point(x: 1, y: 2) + Point(x: 3, y: 4)`,
      solution: `struct Point {
    var x: Double, y: Double

    static func + (lhs: Point, rhs: Point) -> Point {
        Point(x: lhs.x + rhs.x, y: lhs.y + rhs.y)
    }
}

let p = Point(x: 1, y: 2) + Point(x: 3, y: 4)`,
      hints: [
        'Operator overloads must be static methods.',
        'Add the static keyword before func.',
        'This is because operators are called on the type, not instances.',
      ],
      concepts: ['static-method', 'operator-overloading'],
    },
    {
      id: 'swift-operators-15',
      title: 'Fix Ambiguous Operator',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Fix ambiguous operator overload with different types.',
      skeleton: `struct Scalar {
    let value: Double
}

func * (lhs: Scalar, rhs: Double) -> Double {
    return lhs.value * rhs
}

func * (lhs: Double, rhs: Scalar) -> Double {
    return lhs * rhs.value
}

let s = Scalar(value: 3.0)
let result = s * 2.0 * s  // Ambiguous!`,
      solution: `struct Scalar {
    let value: Double
}

func * (lhs: Scalar, rhs: Double) -> Scalar {
    return Scalar(value: lhs.value * rhs)
}

func * (lhs: Double, rhs: Scalar) -> Scalar {
    return Scalar(value: lhs * rhs.value)
}

func * (lhs: Scalar, rhs: Scalar) -> Scalar {
    return Scalar(value: lhs.value * rhs.value)
}

let s = Scalar(value: 3.0)
let result = s * 2.0 * s`,
      hints: [
        'Return Scalar instead of Double for chaining.',
        'Add a Scalar * Scalar overload.',
        'This resolves the ambiguity in chained operations.',
      ],
      concepts: ['operator-ambiguity', 'type-consistency'],
    },
    {
      id: 'swift-operators-16',
      title: 'Predict Operator Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the output of custom operator usage.',
      skeleton: `struct Counter {
    var value: Int

    static func + (lhs: Counter, rhs: Counter) -> Counter {
        Counter(value: lhs.value + rhs.value)
    }

    static prefix func - (c: Counter) -> Counter {
        Counter(value: -c.value)
    }
}

let a = Counter(value: 5)
let b = Counter(value: 3)
let c = a + (-b)
print(c.value)`,
      solution: `2`,
      hints: [
        '-b negates 3 to -3.',
        'a + (-b) = 5 + (-3) = 2.',
        'The output is 2.',
      ],
      concepts: ['operator-overloading', 'prefix-operator'],
    },
    {
      id: 'swift-operators-17',
      title: 'Predict Precedence Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the evaluation order with different precedences.',
      skeleton: `infix operator ^^ : MultiplicationPrecedence

func ^^ (lhs: Int, rhs: Int) -> Int {
    var result = 1
    for _ in 0..<rhs { result *= lhs }
    return result
}

let result = 2 + 3 ^^ 2
print(result)`,
      solution: `11`,
      hints: [
        '^^ has MultiplicationPrecedence, higher than +.',
        '3 ^^ 2 = 9 is evaluated first.',
        '2 + 9 = 11.',
      ],
      concepts: ['operator-precedence', 'evaluation-order'],
    },
    {
      id: 'swift-operators-18',
      title: 'Predict Compound Assignment',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the output of compound assignment on a custom type.',
      skeleton: `struct Score {
    var points: Int

    static func += (lhs: inout Score, rhs: Int) {
        lhs.points += rhs
    }
}

var score = Score(points: 10)
score += 5
score += 3
print(score.points)`,
      solution: `18`,
      hints: [
        '+= adds to the left side in place.',
        '10 + 5 = 15, then 15 + 3 = 18.',
        'The output is 18.',
      ],
      concepts: ['compound-assignment', 'mutation'],
    },
    {
      id: 'swift-operators-19',
      title: 'Refactor Method Calls to Operators',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor verbose method calls to clean operator syntax.',
      skeleton: `struct Fraction {
    let num: Int
    let den: Int

    func add(_ other: Fraction) -> Fraction {
        Fraction(num: num * other.den + other.num * den, den: den * other.den)
    }

    func multiply(_ other: Fraction) -> Fraction {
        Fraction(num: num * other.num, den: den * other.den)
    }

    func isEqual(_ other: Fraction) -> Bool {
        num * other.den == other.num * den
    }
}

let a = Fraction(num: 1, den: 2)
let b = Fraction(num: 1, den: 3)
let sum = a.add(b)
let product = a.multiply(b)
let equal = a.isEqual(b)`,
      solution: `struct Fraction: Equatable {
    let num: Int
    let den: Int

    static func + (lhs: Fraction, rhs: Fraction) -> Fraction {
        Fraction(num: lhs.num * rhs.den + rhs.num * lhs.den, den: lhs.den * rhs.den)
    }

    static func * (lhs: Fraction, rhs: Fraction) -> Fraction {
        Fraction(num: lhs.num * rhs.num, den: lhs.den * rhs.den)
    }

    static func == (lhs: Fraction, rhs: Fraction) -> Bool {
        lhs.num * rhs.den == rhs.num * lhs.den
    }
}

let a = Fraction(num: 1, den: 2)
let b = Fraction(num: 1, den: 3)
let sum = a + b
let product = a * b
let equal = a == b`,
      hints: [
        'Replace add with +, multiply with *, isEqual with ==.',
        'Make them static func operator overloads.',
        'Conform to Equatable for ==.',
      ],
      concepts: ['operator-overloading', 'refactoring'],
    },
    {
      id: 'swift-operators-20',
      title: 'Refactor Builder Pattern to Operator',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Refactor a builder pattern to use a custom operator.',
      skeleton: `struct Query {
    var conditions: [String] = []

    func and(_ condition: String) -> Query {
        var q = self
        q.conditions.append(condition)
        return q
    }
}

let query = Query()
    .and("age > 18")
    .and("active = true")
    .and("role = 'admin'")`,
      solution: `struct Query {
    var conditions: [String] = []
}

func && (lhs: Query, rhs: String) -> Query {
    var q = lhs
    q.conditions.append(rhs)
    return q
}

let query = Query()
    && "age > 18"
    && "active = true"
    && "role = 'admin'"`,
      hints: [
        'The && operator naturally reads as AND for conditions.',
        'Overload && with Query on the left and String on the right.',
        'This gives a DSL-like syntax.',
      ],
      concepts: ['custom-operator', 'DSL', 'builder-pattern'],
    },
  ],
};
