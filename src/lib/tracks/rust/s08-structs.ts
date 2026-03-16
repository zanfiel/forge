import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-structs',
  title: '8. Structs',
  explanation: `## Structs

Structs let you create custom types with named fields.

### Named-Field Structs
\`\`\`rust
struct User {
    name: String,
    age: u32,
    active: bool,
}
\`\`\`

### Tuple Structs
\`\`\`rust
struct Point(f64, f64);
struct Color(u8, u8, u8);
\`\`\`

### Unit Structs
\`\`\`rust
struct Marker; // no data, useful for traits
\`\`\`

### Field Init Shorthand
\`\`\`rust
let name = String::from("Alice");
let user = User { name, age: 30, active: true };
\`\`\`

### Struct Update Syntax
\`\`\`rust
let user2 = User { age: 25, ..user1 };
\`\`\`

### Derived Traits
\`\`\`rust
#[derive(Debug, Clone, PartialEq)]
struct Point { x: f64, y: f64 }
\`\`\`
`,
  exercises: [
    {
      id: 'rs-struct-1',
      title: 'Define a Struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Complete the struct definition with the missing field type.',
      skeleton: `struct Rectangle {
    width: f64,
    height: __BLANK__,
}`,
      solution: `struct Rectangle {
    width: f64,
    height: f64,
}`,
      hints: [
        'The height field should have the same type as width.',
        'It represents a dimension, so a float makes sense.',
        'Use `f64`.',
      ],
      concepts: ['struct definition', 'fields', 'f64'],
    },
    {
      id: 'rs-struct-2',
      title: 'Instantiate a Struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create an instance of the struct.',
      skeleton: `struct Point { x: f64, y: f64 }

let p = __BLANK__ { x: 3.0, y: 4.0 };
println!("{}, {}", p.x, p.y);`,
      solution: `struct Point { x: f64, y: f64 }

let p = Point { x: 3.0, y: 4.0 };
println!("{}, {}", p.x, p.y);`,
      hints: [
        'Use the struct name to create an instance.',
        'Provide values for all fields.',
        'Use `Point { x: 3.0, y: 4.0 }`.',
      ],
      concepts: ['struct instantiation', 'field access'],
    },
    {
      id: 'rs-struct-3',
      title: 'Field Init Shorthand',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use field init shorthand when variable names match field names.',
      skeleton: `struct Config { debug: bool, verbose: bool }

let debug = true;
let verbose = false;
let cfg = Config { __BLANK__ };`,
      solution: `struct Config { debug: bool, verbose: bool }

let debug = true;
let verbose = false;
let cfg = Config { debug, verbose };`,
      hints: [
        'When variable name matches field name, you can skip the colon.',
        'Instead of `debug: debug`, just write `debug`.',
        'Use `debug, verbose`.',
      ],
      concepts: ['field init shorthand', 'struct'],
    },
    {
      id: 'rs-struct-4',
      title: 'Struct Update Syntax',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a new struct copying most fields from an existing one.',
      skeleton: `#[derive(Debug)]
struct Settings { volume: u8, brightness: u8, muted: bool }

let s1 = Settings { volume: 80, brightness: 50, muted: false };
let s2 = Settings { volume: 100, __BLANK__ };
println!("{:?}", s2);`,
      solution: `#[derive(Debug)]
struct Settings { volume: u8, brightness: u8, muted: bool }

let s1 = Settings { volume: 80, brightness: 50, muted: false };
let s2 = Settings { volume: 100, ..s1 };
println!("{:?}", s2);`,
      hints: [
        'Struct update syntax copies remaining fields from another instance.',
        'Use .. followed by the source struct.',
        'Use `..s1` to copy brightness and muted from s1.',
      ],
      concepts: ['struct update', '..', 'copy fields'],
    },
    {
      id: 'rs-struct-5',
      title: 'Derive Debug',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Add the derive attribute to enable debug printing.',
      skeleton: `__BLANK__
struct Color { r: u8, g: u8, b: u8 }

fn main() {
    let c = Color { r: 255, g: 128, b: 0 };
    println!("{:?}", c);
}`,
      solution: `#[derive(Debug)]
struct Color { r: u8, g: u8, b: u8 }

fn main() {
    let c = Color { r: 255, g: 128, b: 0 };
    println!("{:?}", c);
}`,
      hints: [
        'To use {:?} formatting, the type must implement Debug.',
        'The easiest way is to derive it automatically.',
        'Add `#[derive(Debug)]` above the struct.',
      ],
      concepts: ['derive', 'Debug', 'attribute'],
    },
    {
      id: 'rs-struct-6',
      title: 'Tuple Struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Define a tuple struct and access its fields.',
      skeleton: `struct Pair(i32, i32);

let p = Pair(10, 20);
println!("{} {}", p.__BLANK__, p.__BLANK__);`,
      solution: `struct Pair(i32, i32);

let p = Pair(10, 20);
println!("{} {}", p.0, p.1);`,
      hints: [
        'Tuple struct fields are accessed by index, not by name.',
        'Use .0 for the first field, .1 for the second.',
        'Use `p.0` and `p.1`.',
      ],
      concepts: ['tuple struct', 'field access', 'index'],
    },
    {
      id: 'rs-struct-7',
      title: 'Rectangle Area',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Define a Rectangle struct with width and height (f64), and write a function `area` that takes &Rectangle and returns the area.',
      skeleton: `// Write your struct and function here`,
      solution: `struct Rectangle {
    width: f64,
    height: f64,
}

fn area(rect: &Rectangle) -> f64 {
    rect.width * rect.height
}`,
      hints: [
        'Define the struct with two f64 fields.',
        'The function borrows the struct with &Rectangle.',
        'Multiply width by height.',
      ],
      concepts: ['struct', 'borrowing struct', 'function'],
    },
    {
      id: 'rs-struct-8',
      title: 'Display Implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement std::fmt::Display for a Point struct so it prints as "(x, y)".',
      skeleton: `use std::fmt;

struct Point { x: f64, y: f64 }

// Implement Display for Point`,
      solution: `use std::fmt;

struct Point { x: f64, y: f64 }

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}`,
      hints: [
        'Implement the fmt::Display trait.',
        'The method signature is fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result.',
        'Use the write! macro to format output.',
      ],
      concepts: ['Display', 'impl', 'trait implementation', 'write!'],
    },
    {
      id: 'rs-struct-9',
      title: 'Builder-Style Struct',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a Config struct with host (String) and port (u16). Write a `new` function that returns a default Config ("localhost", 8080).',
      skeleton: `// Write your struct and function here`,
      solution: `struct Config {
    host: String,
    port: u16,
}

impl Config {
    fn new() -> Config {
        Config {
            host: String::from("localhost"),
            port: 8080,
        }
    }
}`,
      hints: [
        'Define the struct with host: String and port: u16.',
        'Use an impl block for the associated function.',
        'new() is a convention for constructors in Rust.',
      ],
      concepts: ['associated function', 'new', 'impl block', 'constructor'],
    },
    {
      id: 'rs-struct-10',
      title: 'Struct with Validation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a Temperature struct holding f64. Write `from_celsius` that takes f64 and returns Result<Temperature, String>, rejecting values below -273.15.',
      skeleton: `// Write your struct and function here`,
      solution: `struct Temperature(f64);

impl Temperature {
    fn from_celsius(c: f64) -> Result<Temperature, String> {
        if c < -273.15 {
            Err(String::from("Below absolute zero"))
        } else {
            Ok(Temperature(c))
        }
    }
}`,
      hints: [
        'Use a tuple struct Temperature(f64).',
        'Validate in the constructor -- reject below absolute zero.',
        'Return Result<Temperature, String>.',
      ],
      concepts: ['validation', 'Result', 'constructor', 'tuple struct'],
    },
    {
      id: 'rs-struct-11',
      title: 'Struct Distance',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Given a Point { x: f64, y: f64 } struct, write `distance` that takes two &Point references and returns the Euclidean distance.',
      skeleton: `struct Point { x: f64, y: f64 }

// Write your function here`,
      solution: `struct Point { x: f64, y: f64 }

fn distance(a: &Point, b: &Point) -> f64 {
    ((b.x - a.x).powi(2) + (b.y - a.y).powi(2)).sqrt()
}`,
      hints: [
        'Euclidean distance: sqrt((x2-x1)^2 + (y2-y1)^2).',
        'Use .powi(2) to square and .sqrt() for square root.',
        'Both points should be borrowed.',
      ],
      concepts: ['struct reference', 'math', 'powi', 'sqrt'],
    },
    {
      id: 'rs-struct-12',
      title: 'Nested Structs',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Define Address { street: String, city: String } and Person { name: String, address: Address }. Write `full_location` that takes &Person and returns "name lives in city".',
      skeleton: `// Write your structs and function here`,
      solution: `struct Address {
    street: String,
    city: String,
}

struct Person {
    name: String,
    address: Address,
}

fn full_location(p: &Person) -> String {
    format!("{} lives in {}", p.name, p.address.city)
}`,
      hints: [
        'Define two structs, with Person containing Address.',
        'Access nested fields with dot notation: p.address.city.',
        'Use format! to build the result String.',
      ],
      concepts: ['nested struct', 'composition', 'format!'],
    },
    {
      id: 'rs-struct-13',
      title: 'Fix: Missing Field',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This struct instantiation is missing a required field. Fix it.',
      skeleton: `struct User {
    name: String,
    age: u32,
    active: bool,
}

fn main() {
    let u = User {
        name: String::from("Alice"),
        active: true,
    };
    println!("{}", u.name);
}`,
      solution: `struct User {
    name: String,
    age: u32,
    active: bool,
}

fn main() {
    let u = User {
        name: String::from("Alice"),
        age: 0,
        active: true,
    };
    println!("{}", u.name);
}`,
      hints: [
        'All fields must be initialized when creating a struct.',
        'The age field is missing.',
        'Add `age: 0,` (or any u32 value).',
      ],
      concepts: ['struct initialization', 'all fields required'],
    },
    {
      id: 'rs-struct-14',
      title: 'Fix: Mutate Immutable Struct',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This code tries to change a field on an immutable struct. Fix it.',
      skeleton: `struct Counter { value: i32 }

fn main() {
    let c = Counter { value: 0 };
    c.value += 1;
    println!("{}", c.value);
}`,
      solution: `struct Counter { value: i32 }

fn main() {
    let mut c = Counter { value: 0 };
    c.value += 1;
    println!("{}", c.value);
}`,
      hints: [
        'The struct binding is immutable -- you cannot modify its fields.',
        'In Rust, mutability is on the binding, not individual fields.',
        'Add `mut` to the let binding.',
      ],
      concepts: ['mut', 'struct mutability', 'field mutation'],
    },
    {
      id: 'rs-struct-15',
      title: 'Fix: Moved Struct Field',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'The struct update syntax moves non-Copy fields. Fix so both structs are usable.',
      skeleton: `#[derive(Debug)]
struct Item {
    name: String,
    count: u32,
}

fn main() {
    let a = Item { name: String::from("Widget"), count: 5 };
    let b = Item { count: 10, ..a };
    println!("{:?}", a);
    println!("{:?}", b);
}`,
      solution: `#[derive(Debug)]
struct Item {
    name: String,
    count: u32,
}

fn main() {
    let a = Item { name: String::from("Widget"), count: 5 };
    let b = Item { name: a.name.clone(), count: 10 };
    println!("{:?}", a);
    println!("{:?}", b);
}`,
      hints: [
        'The ..a syntax moves the name field from a.',
        'After ..a, the name field of a is moved.',
        'Clone the name field explicitly instead.',
      ],
      concepts: ['struct update', 'move', 'clone'],
    },
    {
      id: 'rs-struct-16',
      title: 'Predict: Struct Update',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `#[derive(Debug)]
struct Pos { x: i32, y: i32 }

fn main() {
    let a = Pos { x: 1, y: 2 };
    let b = Pos { x: 10, ..a };
    println!("{} {}", b.x, b.y);
}`,
      solution: `10 2`,
      hints: [
        'b.x is explicitly set to 10.',
        'b.y comes from ..a, so it is a.y = 2.',
        'i32 implements Copy, so a is still valid.',
      ],
      concepts: ['struct update', 'Copy', 'field override'],
    },
    {
      id: 'rs-struct-17',
      title: 'Predict: Debug Format',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `#[derive(Debug)]
struct Pair(i32, i32);

fn main() {
    let p = Pair(42, 99);
    println!("{:?}", p);
}`,
      solution: `Pair(42, 99)`,
      hints: [
        'Debug formatting shows the struct name and fields.',
        'Tuple structs show as StructName(fields).',
        'Output: Pair(42, 99).',
      ],
      concepts: ['Debug', 'tuple struct', 'formatting'],
    },
    {
      id: 'rs-struct-18',
      title: 'Predict: Unit Struct',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `struct Marker;

fn main() {
    let _m = Marker;
    println!("{}", std::mem::size_of::<Marker>());
}`,
      solution: `0`,
      hints: [
        'Unit structs have no fields.',
        'They occupy zero bytes in memory.',
        'size_of::<Marker>() returns 0.',
      ],
      concepts: ['unit struct', 'zero-size type', 'size_of'],
    },
    {
      id: 'rs-struct-19',
      title: 'Refactor: Tuple to Named Struct',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Refactor the tuple returns to use a named struct for clarity.',
      skeleton: `fn create_user() -> (String, u32, bool) {
    (String::from("Alice"), 30, true)
}

fn main() {
    let (name, age, active) = create_user();
    println!("{} {} {}", name, age, active);
}`,
      solution: `struct User {
    name: String,
    age: u32,
    active: bool,
}

fn create_user() -> User {
    User {
        name: String::from("Alice"),
        age: 30,
        active: true,
    }
}

fn main() {
    let user = create_user();
    println!("{} {} {}", user.name, user.age, user.active);
}`,
      hints: [
        'Tuples are fine for small returns but named fields are clearer.',
        'Define a User struct with the three fields.',
        'Return and access fields by name.',
      ],
      concepts: ['struct vs tuple', 'named fields', 'readability'],
    },
    {
      id: 'rs-struct-20',
      title: 'Refactor: Add Derive Traits',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Add appropriate derive traits so this struct can be cloned, compared, and debug-printed.',
      skeleton: `struct Point {
    x: f64,
    y: f64,
}

fn main() {
    let a = Point { x: 1.0, y: 2.0 };
    let b = a.clone();
    println!("{:?}", a);
    println!("{}", a == b);
}`,
      solution: `#[derive(Debug, Clone, PartialEq)]
struct Point {
    x: f64,
    y: f64,
}

fn main() {
    let a = Point { x: 1.0, y: 2.0 };
    let b = a.clone();
    println!("{:?}", a);
    println!("{}", a == b);
}`,
      hints: [
        'clone() requires the Clone trait.',
        '{:?} requires the Debug trait.',
        '== requires the PartialEq trait.',
      ],
      concepts: ['derive', 'Debug', 'Clone', 'PartialEq'],
    },
  ],
};
