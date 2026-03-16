import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-basic-types',
  title: '2. Basic Types',
  explanation: `## Basic Types

Rust is statically typed with a rich set of primitive types.

### Integer Types
| Signed | Unsigned | Size |
|--------|----------|------|
| i8     | u8       | 8-bit |
| i16    | u16      | 16-bit |
| i32    | u32      | 32-bit |
| i64    | u64      | 64-bit |
| i128   | u128     | 128-bit |
| isize  | usize    | pointer-sized |

### Floating Point
- \`f32\` -- 32-bit float
- \`f64\` -- 64-bit float (default)

### Other Primitives
- \`bool\` -- \`true\` or \`false\`
- \`char\` -- 4 bytes, Unicode scalar value
- \`&str\` -- string slice (borrowed)
- \`String\` -- owned, heap-allocated string

### Type Casting
Use \`as\` for numeric conversions:
\`\`\`rust
let x: i32 = 42;
let y: f64 = x as f64;
\`\`\`
`,
  exercises: [
    {
      id: 'rs-types-1',
      title: 'Unsigned 8-bit',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Declare a variable of type u8 with value 255.',
      skeleton: `let max_byte: __BLANK__ = 255;
println!("{}", max_byte);`,
      solution: `let max_byte: u8 = 255;
println!("{}", max_byte);`,
      hints: [
        'u8 can hold values from 0 to 255.',
        'It is an unsigned 8-bit integer.',
        'The type is `u8`.',
      ],
      concepts: ['u8', 'integer types', 'type annotation'],
    },
    {
      id: 'rs-types-2',
      title: 'Float Literal',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Declare a 64-bit floating point variable.',
      skeleton: `let pi: __BLANK__ = 3.14159;
println!("{}", pi);`,
      solution: `let pi: f64 = 3.14159;
println!("{}", pi);`,
      hints: [
        'Rust has two float types: f32 and f64.',
        'f64 is the default and has double precision.',
        'The type is `f64`.',
      ],
      concepts: ['f64', 'floating point', 'type annotation'],
    },
    {
      id: 'rs-types-3',
      title: 'Boolean Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fill in the boolean value.',
      skeleton: `let is_active: bool = __BLANK__;
println!("{}", is_active);`,
      solution: `let is_active: bool = true;
println!("{}", is_active);`,
      hints: [
        'Booleans have only two possible values.',
        'They are lowercase in Rust.',
        'Use `true` or `false`.',
      ],
      concepts: ['bool', 'boolean literal'],
    },
    {
      id: 'rs-types-4',
      title: 'Character Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Declare a char with a Unicode emoji.',
      skeleton: `let emoji: __BLANK__ = '🦀';
println!("{}", emoji);`,
      solution: `let emoji: char = '🦀';
println!("{}", emoji);`,
      hints: [
        'Rust chars are 4 bytes and represent Unicode scalar values.',
        'They use single quotes.',
        'The type is `char`.',
      ],
      concepts: ['char', 'unicode', 'type annotation'],
    },
    {
      id: 'rs-types-5',
      title: 'Type Cast i32 to f64',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Cast an integer to a float using the `as` keyword.',
      skeleton: `let x: i32 = 42;
let y: f64 = x __BLANK__ f64;
println!("{}", y);`,
      solution: `let x: i32 = 42;
let y: f64 = x as f64;
println!("{}", y);`,
      hints: [
        'Rust does not implicitly convert between numeric types.',
        'You need a keyword to perform the cast.',
        'Use `as` to cast between numeric types.',
      ],
      concepts: ['as', 'type casting', 'numeric conversion'],
    },
    {
      id: 'rs-types-6',
      title: 'usize for Indexing',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use the correct pointer-sized unsigned type for array indexing.',
      skeleton: `let arr = [10, 20, 30];
let idx: __BLANK__ = 1;
println!("{}", arr[idx]);`,
      solution: `let arr = [10, 20, 30];
let idx: usize = 1;
println!("{}", arr[idx]);`,
      hints: [
        'Array indices must be a specific unsigned integer type.',
        'It matches the pointer size of the platform.',
        'The type is `usize`.',
      ],
      concepts: ['usize', 'array indexing', 'pointer-sized type'],
    },
    {
      id: 'rs-types-7',
      title: 'Celsius to Fahrenheit',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a function `celsius_to_fahrenheit` that converts f64 Celsius to Fahrenheit (F = C * 9/5 + 32).',
      skeleton: `// Write your function here`,
      solution: `fn celsius_to_fahrenheit(c: f64) -> f64 {
    c * 9.0 / 5.0 + 32.0
}`,
      hints: [
        'The parameter and return type should both be f64.',
        'Use floating-point literals: 9.0, 5.0, 32.0.',
        'Formula: c * 9.0 / 5.0 + 32.0.',
      ],
      concepts: ['f64', 'arithmetic', 'function'],
    },
    {
      id: 'rs-types-8',
      title: 'Safe u8 Addition',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `safe_add_u8` that takes two u8 values and returns an Option<u8>. Return None if the addition would overflow.',
      skeleton: `// Write your function here`,
      solution: `fn safe_add_u8(a: u8, b: u8) -> Option<u8> {
    a.checked_add(b)
}`,
      hints: [
        'u8 can overflow if the sum exceeds 255.',
        'Rust has a method on integers for safe arithmetic.',
        'Use `a.checked_add(b)` which returns Option<u8>.',
      ],
      concepts: ['u8', 'checked_add', 'Option', 'overflow'],
    },
    {
      id: 'rs-types-9',
      title: 'Type Sizes',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a function `type_sizes` that returns a tuple of (usize, usize, usize) containing the sizes of i32, f64, and char using std::mem::size_of.',
      skeleton: `// Write your function here`,
      solution: `fn type_sizes() -> (usize, usize, usize) {
    (
        std::mem::size_of::<i32>(),
        std::mem::size_of::<f64>(),
        std::mem::size_of::<char>(),
    )
}`,
      hints: [
        'Use std::mem::size_of::<T>() to get the size of a type.',
        'The turbofish syntax ::<T> specifies the type parameter.',
        'i32 is 4 bytes, f64 is 8 bytes, char is 4 bytes.',
      ],
      concepts: ['size_of', 'turbofish', 'memory layout'],
    },
    {
      id: 'rs-types-10',
      title: 'Numeric String Parsing',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `parse_or_zero` that takes &str and returns the parsed i32 or 0 if parsing fails.',
      skeleton: `// Write your function here`,
      solution: `fn parse_or_zero(s: &str) -> i32 {
    s.parse::<i32>().unwrap_or(0)
}`,
      hints: [
        'Use the .parse() method on &str.',
        'parse() returns a Result that might be Err.',
        'Use .unwrap_or(0) to provide a default value.',
      ],
      concepts: ['parse', 'Result', 'unwrap_or', 'turbofish'],
    },
    {
      id: 'rs-types-11',
      title: 'Digit Sum',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `digit_sum` that takes a u32 and returns the sum of its digits as u32.',
      skeleton: `// Write your function here`,
      solution: `fn digit_sum(mut n: u32) -> u32 {
    let mut sum = 0;
    while n > 0 {
        sum += n % 10;
        n /= 10;
    }
    sum
}`,
      hints: [
        'Use modulo (%) to get the last digit.',
        'Use integer division (/) to remove the last digit.',
        'Loop until n reaches 0.',
      ],
      concepts: ['u32', 'modulo', 'integer division', 'while loop'],
    },
    {
      id: 'rs-types-12',
      title: 'Clamp Value',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write `clamp_i32` that takes value, min, and max (all i32) and returns the value clamped to [min, max].',
      skeleton: `// Write your function here`,
      solution: `fn clamp_i32(value: i32, min: i32, max: i32) -> i32 {
    if value < min {
        min
    } else if value > max {
        max
    } else {
        value
    }
}`,
      hints: [
        'If value is below min, return min.',
        'If value is above max, return max.',
        'Otherwise return value unchanged.',
      ],
      concepts: ['i32', 'if/else', 'clamping'],
    },
    {
      id: 'rs-types-13',
      title: 'Fix: Integer Overflow',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'This code tries to store 256 in a u8, which overflows. Fix the type.',
      skeleton: `fn main() {
    let val: u8 = 256;
    println!("{}", val);
}`,
      solution: `fn main() {
    let val: u16 = 256;
    println!("{}", val);
}`,
      hints: [
        'u8 can only hold values 0 through 255.',
        '256 needs a larger unsigned integer type.',
        'Change u8 to u16 (0 to 65535).',
      ],
      concepts: ['u8', 'u16', 'overflow', 'integer range'],
    },
    {
      id: 'rs-types-14',
      title: 'Fix: Mismatched Types',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This code tries to add an i32 and an f64 without casting. Fix it.',
      skeleton: `fn main() {
    let a: i32 = 10;
    let b: f64 = 3.5;
    let sum = a + b;
    println!("{}", sum);
}`,
      solution: `fn main() {
    let a: i32 = 10;
    let b: f64 = 3.5;
    let sum = a as f64 + b;
    println!("{}", sum);
}`,
      hints: [
        'Rust does not allow adding different numeric types directly.',
        'You need to convert one of them.',
        'Cast `a` to f64: `a as f64 + b`.',
      ],
      concepts: ['type casting', 'as', 'mismatched types'],
    },
    {
      id: 'rs-types-15',
      title: 'Fix: Negative Unsigned',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This code tries to store a negative value in an unsigned type. Fix it.',
      skeleton: `fn main() {
    let temp: u32 = -5;
    println!("{}", temp);
}`,
      solution: `fn main() {
    let temp: i32 = -5;
    println!("{}", temp);
}`,
      hints: [
        'Unsigned types cannot hold negative values.',
        'You need a signed integer type.',
        'Change u32 to i32.',
      ],
      concepts: ['signed vs unsigned', 'i32', 'u32'],
    },
    {
      id: 'rs-types-16',
      title: 'Predict: as Truncation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let x: i32 = 300;
    let y: u8 = x as u8;
    println!("{}", y);
}`,
      solution: `44`,
      hints: [
        'Casting i32 to u8 truncates to the lowest 8 bits.',
        '300 in binary is 100101100.',
        'The lowest 8 bits: 00101100 = 44.',
      ],
      concepts: ['as', 'truncation', 'bit representation'],
    },
    {
      id: 'rs-types-17',
      title: 'Predict: Float Precision',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let x: f32 = 0.1 + 0.2;
    let close = (x - 0.3).abs() < 0.001;
    println!("{}", close);
}`,
      solution: `true`,
      hints: [
        'Floating point arithmetic has precision limitations.',
        'The difference between 0.1+0.2 and 0.3 is very small.',
        'It is less than 0.001, so close is true.',
      ],
      concepts: ['f32', 'floating point precision', 'abs'],
    },
    {
      id: 'rs-types-18',
      title: 'Predict: char Size',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    println!("{}", std::mem::size_of::<char>());
}`,
      solution: `4`,
      hints: [
        'A Rust char represents a Unicode scalar value.',
        'It needs enough space for any Unicode code point.',
        'A char is 4 bytes.',
      ],
      concepts: ['char', 'size_of', 'unicode'],
    },
    {
      id: 'rs-types-19',
      title: 'Refactor: Use Numeric Separators',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Refactor these large number literals to use underscores as visual separators for readability.',
      skeleton: `fn main() {
    let population: u64 = 7900000000;
    let pi_approx: f64 = 3.14159265;
    let hex_color: u32 = 0xFF00AA;
    println!("{} {} {}", population, pi_approx, hex_color);
}`,
      solution: `fn main() {
    let population: u64 = 7_900_000_000;
    let pi_approx: f64 = 3.141_592_65;
    let hex_color: u32 = 0xFF_00_AA;
    println!("{} {} {}", population, pi_approx, hex_color);
}`,
      hints: [
        'Rust allows underscores in numeric literals for readability.',
        'They do not change the value, just make it easier to read.',
        'Group by thousands for integers: 7_900_000_000.',
      ],
      concepts: ['numeric separators', 'readability', 'literals'],
    },
    {
      id: 'rs-types-20',
      title: 'Refactor: Explicit Types to Inference',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Remove unnecessary type annotations where the compiler can infer the type.',
      skeleton: `fn main() {
    let name: &str = "Rust";
    let version: i32 = 2021;
    let is_great: bool = true;
    let scores: Vec<i32> = vec![90, 85, 92];
    println!("{} {} {} {:?}", name, version, is_great, scores);
}`,
      solution: `fn main() {
    let name = "Rust";
    let version = 2021;
    let is_great = true;
    let scores = vec![90, 85, 92];
    println!("{} {} {} {:?}", name, version, is_great, scores);
}`,
      hints: [
        'Rust has excellent type inference.',
        'When the type is obvious from the value, annotations are optional.',
        'Remove all the `: Type` annotations -- the compiler will infer them.',
      ],
      concepts: ['type inference', 'clean code', 'idiomatic Rust'],
    },
  ],
};
