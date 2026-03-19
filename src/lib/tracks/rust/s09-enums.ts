import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-enums',
  title: '9. Enums',
  explanation: `## Enums

Rust enums are algebraic data types -- variants can hold data.

### Basic Enums
\`\`\`rust
enum Direction { North, South, East, West }
\`\`\`

### Enums with Data
\`\`\`rust
enum Shape {
    Circle(f64),
    Rectangle(f64, f64),
    Triangle { base: f64, height: f64 },
}
\`\`\`

### Option<T>
Rust has no null. Instead use \`Option<T>\`:
\`\`\`rust
enum Option<T> { Some(T), None }
\`\`\`

### Result<T, E>
For operations that can fail:
\`\`\`rust
enum Result<T, E> { Ok(T), Err(E) }
\`\`\`

### Enum Methods
\`\`\`rust
impl Shape {
    fn area(&self) -> f64 { /* ... */ }
}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-enum-1',
      title: 'Basic Enum',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create an instance of the Direction enum.',
      skeleton: `enum Direction { North, South, East, West }

let dir = Direction::__BLANK__;`,
      solution: `enum Direction { North, South, East, West }

let dir = Direction::North;`,
      hints: [
        'Access enum variants with :: syntax.',
        'Choose any valid direction variant.',
        'Use `Direction::North`.',
      ],
      concepts: ['enum', 'variant', ':: syntax'],
    },
    {
      id: 'rs-enum-2',
      title: 'Enum with Data',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a Circle variant holding a radius.',
      skeleton: `enum Shape {
    Circle(f64),
    Rectangle(f64, f64),
}

let s = Shape::__BLANK__;`,
      solution: `enum Shape {
    Circle(f64),
    Rectangle(f64, f64),
}

let s = Shape::Circle(5.0);`,
      hints: [
        'Circle takes one f64 parameter (radius).',
        'Use the variant like a function call.',
        'Use `Shape::Circle(5.0)`.',
      ],
      concepts: ['enum with data', 'variant constructor'],
    },
    {
      id: 'rs-enum-3',
      title: 'Option Some',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Wrap a value in Some.',
      skeleton: `let maybe: Option<i32> = __BLANK__(42);
println!("{:?}", maybe);`,
      solution: `let maybe: Option<i32> = Some(42);
println!("{:?}", maybe);`,
      hints: [
        'Option has two variants: Some and None.',
        'To wrap a value, use the Some variant.',
        'Use `Some(42)`.',
      ],
      concepts: ['Option', 'Some', 'wrapping values'],
    },
    {
      id: 'rs-enum-4',
      title: 'Result Ok/Err',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Return the appropriate Result variant.',
      skeleton: `fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        __BLANK__(String::from("Division by zero"))
    } else {
        __BLANK__(a / b)
    }
}`,
      solution: `fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Division by zero"))
    } else {
        Ok(a / b)
    }
}`,
      hints: [
        'Result has two variants: Ok for success, Err for failure.',
        'The error case should use Err.',
        'The success case should use Ok.',
      ],
      concepts: ['Result', 'Ok', 'Err'],
    },
    {
      id: 'rs-enum-5',
      title: 'Match on Option',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Match on the Option to extract or provide a default.',
      skeleton: `let val: Option<i32> = Some(10);
let result = match val {
    __BLANK__(x) => x * 2,
    __BLANK__ => 0,
};
println!("{}", result);`,
      solution: `let val: Option<i32> = Some(10);
let result = match val {
    Some(x) => x * 2,
    None => 0,
};
println!("{}", result);`,
      hints: [
        'Option has Some(value) and None variants.',
        'Match destructures Some to extract the inner value.',
        'Use `Some(x)` and `None`.',
      ],
      concepts: ['match', 'Option', 'destructuring'],
    },
    {
      id: 'rs-enum-6',
      title: 'Unwrap with Default',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use the method that unwraps an Option or returns a default value.',
      skeleton: `let maybe: Option<i32> = None;
let val = maybe.__BLANK__(0);
println!("{}", val); // prints 0`,
      solution: `let maybe: Option<i32> = None;
let val = maybe.unwrap_or(0);
println!("{}", val); // prints 0`,
      hints: [
        'You need a method that provides a fallback value.',
        'It should return the inner value or the given default.',
        'Use `.unwrap_or(0)`.',
      ],
      concepts: ['unwrap_or', 'Option', 'default value'],
    },
    {
      id: 'rs-enum-7',
      title: 'Shape Area',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Define Shape enum (Circle(f64), Rectangle(f64, f64)) and implement an `area` method using match.',
      skeleton: `// Write your enum and impl here`,
      solution: `enum Shape {
    Circle(f64),
    Rectangle(f64, f64),
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle(r) => std::f64::consts::PI * r * r,
            Shape::Rectangle(w, h) => w * h,
        }
    }
}`,
      hints: [
        'Use match self to handle each variant.',
        'Destructure to extract the data from each variant.',
        'Circle area = PI * r^2, Rectangle area = w * h.',
      ],
      concepts: ['enum methods', 'match', 'impl', 'destructuring'],
    },
    {
      id: 'rs-enum-8',
      title: 'Safe Division',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write `safe_div` that takes two i32 values and returns Option<i32>. Return None for division by zero.',
      skeleton: `// Write your function here`,
      solution: `fn safe_div(a: i32, b: i32) -> Option<i32> {
    if b == 0 { None } else { Some(a / b) }
}`,
      hints: [
        'Check if the divisor is zero.',
        'Return None for the zero case.',
        'Return Some(a / b) otherwise.',
      ],
      concepts: ['Option', 'safe division', 'None'],
    },
    {
      id: 'rs-enum-9',
      title: 'Traffic Light Duration',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Define a TrafficLight enum (Red, Yellow, Green) and write a `duration` method returning seconds (Red: 60, Yellow: 5, Green: 45).',
      skeleton: `// Write your enum and impl here`,
      solution: `enum TrafficLight {
    Red,
    Yellow,
    Green,
}

impl TrafficLight {
    fn duration(&self) -> u32 {
        match self {
            TrafficLight::Red => 60,
            TrafficLight::Yellow => 5,
            TrafficLight::Green => 45,
        }
    }
}`,
      hints: [
        'Define three simple variants without data.',
        'Match on self to return the appropriate duration.',
        'Each arm returns a u32 literal.',
      ],
      concepts: ['enum', 'match', 'method', 'simple variants'],
    },
    {
      id: 'rs-enum-10',
      title: 'Linked List',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Define a recursive List enum: Cons(i32, Box<List>) or Nil. Write a `sum` method.',
      skeleton: `// Write your enum and impl here`,
      solution: `enum List {
    Cons(i32, Box<List>),
    Nil,
}

impl List {
    fn sum(&self) -> i32 {
        match self {
            List::Cons(val, rest) => val + rest.sum(),
            List::Nil => 0,
        }
    }
}`,
      hints: [
        'Use Box<List> for the recursive reference (fixed size).',
        'Nil is the base case returning 0.',
        'Cons adds the value to the sum of the rest.',
      ],
      concepts: ['recursive enum', 'Box', 'linked list', 'recursion'],
    },
    {
      id: 'rs-enum-11',
      title: 'Option Chaining',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `double_first` that takes a Vec<&str>, parses the first element as i32, doubles it, returning Option<i32>.',
      skeleton: `// Write your function here`,
      solution: `fn double_first(v: Vec<&str>) -> Option<i32> {
    v.first()
        .and_then(|s| s.parse::<i32>().ok())
        .map(|n| n * 2)
}`,
      hints: [
        'v.first() returns Option<&&str>.',
        'Use .and_then() to chain Option-returning operations.',
        'Use .map() to transform the inner value.',
      ],
      concepts: ['Option chaining', 'and_then', 'map', 'parse'],
    },
    {
      id: 'rs-enum-12',
      title: 'Enum as Constructor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use enum variants as function pointers. Write code that maps a Vec<i32> into Vec<Option<i32>> using Some as the mapping function.',
      skeleton: `// Write your function here`,
      solution: `fn wrap_all(nums: Vec<i32>) -> Vec<Option<i32>> {
    nums.into_iter().map(Some).collect()
}`,
      hints: [
        'Enum variants with data act like functions.',
        'Some is a function i32 -> Option<i32>.',
        'Pass Some directly to .map().',
      ],
      concepts: ['variant as constructor', 'map', 'function pointer'],
    },
    {
      id: 'rs-enum-13',
      title: 'Fix: Non-exhaustive Enum Match',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This match does not handle all variants. Fix it.',
      skeleton: `enum Coin { Penny, Nickel, Dime, Quarter }

fn value(coin: Coin) -> u32 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
    }
}`,
      solution: `enum Coin { Penny, Nickel, Dime, Quarter }

fn value(coin: Coin) -> u32 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}`,
      hints: [
        'match must handle all enum variants.',
        'The Quarter variant is not matched.',
        'Add `Coin::Quarter => 25`.',
      ],
      concepts: ['exhaustive matching', 'enum variants'],
    },
    {
      id: 'rs-enum-14',
      title: 'Fix: Unwrap on None',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'This code panics because unwrap is called on None. Fix it to handle the None case.',
      skeleton: `fn find_first_even(nums: &[i32]) -> i32 {
    nums.iter().find(|&&x| x % 2 == 0).unwrap()
}`,
      solution: `fn find_first_even(nums: &[i32]) -> Option<i32> {
    nums.iter().find(|&&x| x % 2 == 0).copied()
}`,
      hints: [
        'unwrap() panics if the Option is None.',
        'Change the return type to Option<i32>.',
        'Remove unwrap() and use .copied() to convert &i32 to i32.',
      ],
      concepts: ['unwrap', 'panic', 'Option', 'safe handling'],
    },
    {
      id: 'rs-enum-15',
      title: 'Fix: Wrong Variant Pattern',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'The match pattern does not destructure the enum data correctly. Fix it.',
      skeleton: `enum Message {
    Text(String),
    Number(i32),
}

fn describe(msg: &Message) -> String {
    match msg {
        Message::Text => format!("text message"),
        Message::Number => format!("number message"),
    }
}`,
      solution: `enum Message {
    Text(String),
    Number(i32),
}

fn describe(msg: &Message) -> String {
    match msg {
        Message::Text(_) => format!("text message"),
        Message::Number(_) => format!("number message"),
    }
}`,
      hints: [
        'Variants with data must be destructured in the pattern.',
        'Use _ to ignore the data if not needed.',
        'Use `Message::Text(_)` and `Message::Number(_)`.',
      ],
      concepts: ['destructuring', 'pattern matching', 'enum data'],
    },
    {
      id: 'rs-enum-16',
      title: 'Predict: Option Map',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let x: Option<i32> = Some(5);
    let y = x.map(|v| v * 3);
    println!("{:?}", y);
}`,
      solution: `Some(15)`,
      hints: [
        'map applies the closure to the inner value of Some.',
        '5 * 3 = 15.',
        'The result is Some(15).',
      ],
      concepts: ['Option::map', 'closure', 'transform'],
    },
    {
      id: 'rs-enum-17',
      title: 'Predict: Enum Size',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Which is larger: the enum or its largest variant?',
      skeleton: `enum Data {
    Small(u8),
    Large([u8; 100]),
}

fn main() {
    println!("{}", std::mem::size_of::<Data>());
}`,
      solution: `104`,
      hints: [
        'An enum is sized to fit its largest variant plus a discriminant.',
        'The largest variant is Large([u8; 100]) = 100 bytes.',
        'Plus alignment/discriminant overhead = 104 bytes total.',
      ],
      concepts: ['enum size', 'discriminant', 'memory layout'],
    },
    {
      id: 'rs-enum-18',
      title: 'Predict: Chained unwrap_or',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let a: Option<i32> = None;
    let b = a.unwrap_or(10);
    let c = Some(20).unwrap_or(10);
    println!("{} {}", b, c);
}`,
      solution: `10 20`,
      hints: [
        'a is None, so unwrap_or returns the default: 10.',
        'Some(20) has a value, so unwrap_or returns 20.',
        'Output: 10 20.',
      ],
      concepts: ['unwrap_or', 'None', 'Some'],
    },
    {
      id: 'rs-enum-19',
      title: 'Refactor: Replace Booleans with Enum',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Replace the boolean flags with a more descriptive enum.',
      skeleton: `fn process(data: &str, is_compressed: bool, is_encrypted: bool) -> String {
    if is_compressed && is_encrypted {
        format!("compressed+encrypted: {}", data)
    } else if is_compressed {
        format!("compressed: {}", data)
    } else if is_encrypted {
        format!("encrypted: {}", data)
    } else {
        format!("raw: {}", data)
    }
}`,
      solution: `enum DataFormat {
    Raw,
    Compressed,
    Encrypted,
    CompressedEncrypted,
}

fn process(data: &str, format: DataFormat) -> String {
    match format {
        DataFormat::Raw => format!("raw: {}", data),
        DataFormat::Compressed => format!("compressed: {}", data),
        DataFormat::Encrypted => format!("encrypted: {}", data),
        DataFormat::CompressedEncrypted => format!("compressed+encrypted: {}", data),
    }
}`,
      hints: [
        'Boolean flags are error-prone and unclear.',
        'An enum makes the valid states explicit.',
        'Define variants for each valid combination.',
      ],
      concepts: ['enum vs booleans', 'state modeling', 'type safety'],
    },
    {
      id: 'rs-enum-20',
      title: 'Refactor: unwrap to match',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Replace the panicking unwrap() calls with safe match/if-let handling.',
      skeleton: `fn get_config_value(key: &str) -> String {
    let map = std::collections::HashMap::from([
        ("host", "localhost"),
        ("port", "8080"),
    ]);
    map.get(key).unwrap().to_string()
}`,
      solution: `fn get_config_value(key: &str) -> Option<String> {
    let map = std::collections::HashMap::from([
        ("host", "localhost"),
        ("port", "8080"),
    ]);
    map.get(key).map(|v| v.to_string())
}`,
      hints: [
        'unwrap() panics if the key is not found.',
        'Change the return type to Option<String>.',
        'Use .map() to transform the value if present.',
      ],
      concepts: ['Option', 'map', 'safe error handling', 'no panic'],
    },
  ],
};
