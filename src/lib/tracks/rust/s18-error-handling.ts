import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-err',
  title: '18. Error Handling',
  explanation: `## Error Handling

Rust has no exceptions. Instead, it uses \`Result<T, E>\` for recoverable errors and \`panic!\` for unrecoverable ones.

### Result<T, E>
\`\`\`rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
\`\`\`

### The ? Operator
\`\`\`rust
fn read_file(path: &str) -> Result<String, std::io::Error> {
    let content = std::fs::read_to_string(path)?;
    Ok(content)
}
\`\`\`
The \`?\` operator returns early with the error if the Result is Err.

### Option Combinators
\`\`\`rust
let val: Option<i32> = Some(5);
val.map(|x| x * 2);        // Some(10)
val.and_then(|x| Some(x)); // Some(5)
val.unwrap_or(0);           // 5
val.unwrap_or_else(|| 0);   // 5
\`\`\`

### Custom Error Types
\`\`\`rust
#[derive(Debug)]
enum AppError {
    Io(std::io::Error),
    Parse(std::num::ParseIntError),
}

impl std::fmt::Display for AppError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            AppError::Io(e) => write!(f, "IO error: {}", e),
            AppError::Parse(e) => write!(f, "Parse error: {}", e),
        }
    }
}

impl std::error::Error for AppError {}
\`\`\`

### From Trait for Error Conversion
\`\`\`rust
impl From<std::io::Error> for AppError {
    fn from(e: std::io::Error) -> Self {
        AppError::Io(e)
    }
}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-err-1',
      title: 'Basic Result',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Return an Ok value from a function.',
      skeleton: `fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("division by zero"))
    } else {
        __BLANK__(a / b)
    }
}`,
      solution: `fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("division by zero"))
    } else {
        Ok(a / b)
    }
}`,
      hints: [
        'Result has two variants: Ok and Err.',
        'Wrap successful values in Ok().',
        'The answer is Ok.',
      ],
      concepts: ['Result', 'Ok', 'Err'],
    },
    {
      id: 'rs-err-2',
      title: 'Question Mark Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use the ? operator for early error return.',
      skeleton: `use std::num::ParseIntError;

fn parse_and_double(s: &str) -> Result<i32, ParseIntError> {
    let n = s.parse::<i32>()__BLANK__;
    Ok(n * 2)
}`,
      solution: `use std::num::ParseIntError;

fn parse_and_double(s: &str) -> Result<i32, ParseIntError> {
    let n = s.parse::<i32>()?;
    Ok(n * 2)
}`,
      hints: [
        'The ? operator unwraps Ok or returns Err early.',
        'It replaces verbose match expressions.',
        'The answer is ?',
      ],
      concepts: ['? operator', 'error propagation', 'Result'],
    },
    {
      id: 'rs-err-3',
      title: 'unwrap_or',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Provide a default value when Option is None.',
      skeleton: `fn get_port(config: Option<u16>) -> u16 {
    config.__BLANK__(8080)
}`,
      solution: `fn get_port(config: Option<u16>) -> u16 {
    config.unwrap_or(8080)
}`,
      hints: [
        'This method returns the inner value or a default.',
        'It does not panic on None.',
        'Use unwrap_or().',
      ],
      concepts: ['Option', 'unwrap_or', 'default value'],
    },
    {
      id: 'rs-err-4',
      title: 'map on Option',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Transform the value inside an Option.',
      skeleton: `let name: Option<String> = Some(String::from("rust"));
let upper = name.__BLANK__(|s| s.to_uppercase());
println!("{:?}", upper);`,
      solution: `let name: Option<String> = Some(String::from("rust"));
let upper = name.map(|s| s.to_uppercase());
println!("{:?}", upper);`,
      hints: [
        'map transforms the inner value if Some.',
        'If None, map returns None.',
        'Use .map().',
      ],
      concepts: ['Option', 'map', 'combinator'],
    },
    {
      id: 'rs-err-5',
      title: 'and_then Chaining',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Chain fallible operations with and_then.',
      skeleton: `fn parse_positive(s: &str) -> Option<u32> {
    s.parse::<i32>().ok().__BLANK__(|n| {
        if n > 0 { Some(n as u32) } else { None }
    })
}`,
      solution: `fn parse_positive(s: &str) -> Option<u32> {
    s.parse::<i32>().ok().and_then(|n| {
        if n > 0 { Some(n as u32) } else { None }
    })
}`,
      hints: [
        'and_then is like map but the closure returns an Option.',
        'It flattens Option<Option<T>> to Option<T>.',
        'Use .and_then().',
      ],
      concepts: ['Option', 'and_then', 'chaining'],
    },
    {
      id: 'rs-err-6',
      title: 'map_err',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Convert the error type using map_err.',
      skeleton: `fn parse_num(s: &str) -> Result<i32, String> {
    s.parse::<i32>().__BLANK__(|e| e.to_string())
}`,
      solution: `fn parse_num(s: &str) -> Result<i32, String> {
    s.parse::<i32>().map_err(|e| e.to_string())
}`,
      hints: [
        'map_err transforms the Err variant.',
        'The Ok variant passes through unchanged.',
        'Use .map_err().',
      ],
      concepts: ['Result', 'map_err', 'error conversion'],
    },
    {
      id: 'rs-err-7',
      title: 'Custom Error Type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a custom error enum with Display and Error implementations.',
      skeleton: `use std::fmt;

// Define an AppError enum with variants:
// - NotFound(String)
// - InvalidInput(String)
// Implement Display and std::error::Error

fn find_user(id: u32) -> Result<String, AppError> {
    if id == 0 {
        Err(AppError::InvalidInput("ID cannot be zero".into()))
    } else if id > 100 {
        Err(AppError::NotFound(format!("User {} not found", id)))
    } else {
        Ok(format!("User_{}", id))
    }
}

fn main() {
    match find_user(0) {
        Ok(u) => println!("{}", u),
        Err(e) => println!("Error: {}", e),
    }
}`,
      solution: `use std::fmt;

#[derive(Debug)]
enum AppError {
    NotFound(String),
    InvalidInput(String),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppError::NotFound(msg) => write!(f, "Not found: {}", msg),
            AppError::InvalidInput(msg) => write!(f, "Invalid input: {}", msg),
        }
    }
}

impl std::error::Error for AppError {}

fn find_user(id: u32) -> Result<String, AppError> {
    if id == 0 {
        Err(AppError::InvalidInput("ID cannot be zero".into()))
    } else if id > 100 {
        Err(AppError::NotFound(format!("User {} not found", id)))
    } else {
        Ok(format!("User_{}", id))
    }
}

fn main() {
    match find_user(0) {
        Ok(u) => println!("{}", u),
        Err(e) => println!("Error: {}", e),
    }
}`,
      hints: [
        'Define an enum with Debug derive.',
        'Implement Display with a match on each variant.',
        'Implement std::error::Error with an empty impl block.',
      ],
      concepts: ['custom error', 'Display', 'Error trait'],
    },
    {
      id: 'rs-err-8',
      title: 'From Trait for Errors',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement From conversions so ? works with your custom error.',
      skeleton: `use std::fmt;
use std::num::ParseIntError;
use std::io;

#[derive(Debug)]
enum MyError {
    Io(io::Error),
    Parse(ParseIntError),
}

impl fmt::Display for MyError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            MyError::Io(e) => write!(f, "IO: {}", e),
            MyError::Parse(e) => write!(f, "Parse: {}", e),
        }
    }
}

impl std::error::Error for MyError {}

// Implement From<io::Error> for MyError
// Implement From<ParseIntError> for MyError

fn read_and_parse(path: &str) -> Result<i32, MyError> {
    let content = std::fs::read_to_string(path)?;
    let num = content.trim().parse::<i32>()?;
    Ok(num)
}`,
      solution: `use std::fmt;
use std::num::ParseIntError;
use std::io;

#[derive(Debug)]
enum MyError {
    Io(io::Error),
    Parse(ParseIntError),
}

impl fmt::Display for MyError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            MyError::Io(e) => write!(f, "IO: {}", e),
            MyError::Parse(e) => write!(f, "Parse: {}", e),
        }
    }
}

impl std::error::Error for MyError {}

impl From<io::Error> for MyError {
    fn from(e: io::Error) -> Self {
        MyError::Io(e)
    }
}

impl From<ParseIntError> for MyError {
    fn from(e: ParseIntError) -> Self {
        MyError::Parse(e)
    }
}

fn read_and_parse(path: &str) -> Result<i32, MyError> {
    let content = std::fs::read_to_string(path)?;
    let num = content.trim().parse::<i32>()?;
    Ok(num)
}`,
      hints: [
        'The From trait enables automatic error conversion with ?.',
        'Implement From<io::Error> by wrapping in MyError::Io.',
        'Implement From<ParseIntError> by wrapping in MyError::Parse.',
      ],
      concepts: ['From', 'error conversion', '? operator'],
    },
    {
      id: 'rs-err-9',
      title: 'Error Chain with Box<dyn Error>',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a function using Box<dyn Error> as the error type.',
      skeleton: `use std::error::Error;

// Write a function that:
// 1. Parses a string as i32
// 2. Checks if it's positive
// 3. Returns the value or an appropriate error
// Use Box<dyn Error> as the error type

fn parse_positive(s: &str) -> Result<i32, Box<dyn Error>> {
    todo!()
}

fn main() {
    println!("{:?}", parse_positive("42"));
    println!("{:?}", parse_positive("-5"));
    println!("{:?}", parse_positive("abc"));
}`,
      solution: `use std::error::Error;

fn parse_positive(s: &str) -> Result<i32, Box<dyn Error>> {
    let n: i32 = s.parse()?;
    if n <= 0 {
        Err(format!("{} is not positive", n).into())
    } else {
        Ok(n)
    }
}

fn main() {
    println!("{:?}", parse_positive("42"));
    println!("{:?}", parse_positive("-5"));
    println!("{:?}", parse_positive("abc"));
}`,
      hints: [
        'Box<dyn Error> can hold any error type.',
        'String and &str implement Into<Box<dyn Error>>.',
        'Use ? for parse and .into() for custom error strings.',
      ],
      concepts: ['Box<dyn Error>', 'error erasure', 'dynamic error'],
    },
    {
      id: 'rs-err-10',
      title: 'unwrap_or_else',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use unwrap_or_else with a closure for lazy default computation.',
      skeleton: `// Write a function that tries to get a config value
// If None, compute a default lazily
fn get_config_value(key: &str) -> String {
    let store: Vec<(&str, &str)> = vec![("host", "localhost"), ("port", "8080")];

    todo!()
}

fn main() {
    println!("{}", get_config_value("host"));
    println!("{}", get_config_value("missing"));
}`,
      solution: `fn get_config_value(key: &str) -> String {
    let store: Vec<(&str, &str)> = vec![("host", "localhost"), ("port", "8080")];

    store
        .iter()
        .find(|(k, _)| *k == key)
        .map(|(_, v)| v.to_string())
        .unwrap_or_else(|| format!("default_{}", key))
}

fn main() {
    println!("{}", get_config_value("host"));
    println!("{}", get_config_value("missing"));
}`,
      hints: [
        'unwrap_or_else takes a closure that computes the default.',
        'The closure is only called if the Option is None.',
        'Use find on the store, map to extract the value, then unwrap_or_else.',
      ],
      concepts: ['unwrap_or_else', 'Option', 'lazy evaluation'],
    },
    {
      id: 'rs-err-11',
      title: 'Multiple ? Operations',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Chain multiple fallible operations using ? operator.',
      skeleton: `use std::num::ParseIntError;

#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

// Parse a string like "3,4" into a Point
// Return appropriate errors for invalid input
fn parse_point(s: &str) -> Result<Point, String> {
    todo!()
}

fn main() {
    println!("{:?}", parse_point("3,4"));
    println!("{:?}", parse_point("abc,4"));
    println!("{:?}", parse_point("invalid"));
}`,
      solution: `use std::num::ParseIntError;

#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

fn parse_point(s: &str) -> Result<Point, String> {
    let parts: Vec<&str> = s.split(',').collect();
    if parts.len() != 2 {
        return Err(format!("Expected 'x,y', got '{}'", s));
    }
    let x = parts[0].trim().parse::<i32>().map_err(|e| e.to_string())?;
    let y = parts[1].trim().parse::<i32>().map_err(|e| e.to_string())?;
    Ok(Point { x, y })
}

fn main() {
    println!("{:?}", parse_point("3,4"));
    println!("{:?}", parse_point("abc,4"));
    println!("{:?}", parse_point("invalid"));
}`,
      hints: [
        'Split the string on comma first.',
        'Use map_err to convert ParseIntError to String.',
        'Use ? after each parse to propagate errors.',
      ],
      concepts: ['? operator', 'map_err', 'error propagation'],
    },
    {
      id: 'rs-err-12',
      title: 'ok_or Conversion',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Convert an Option to a Result using ok_or.',
      skeleton: `fn first_even(nums: &[i32]) -> Result<i32, String> {
    // Find the first even number
    // If none found, return Err("no even number found")
    todo!()
}

fn main() {
    println!("{:?}", first_even(&[1, 3, 4, 6]));
    println!("{:?}", first_even(&[1, 3, 5]));
}`,
      solution: `fn first_even(nums: &[i32]) -> Result<i32, String> {
    nums.iter()
        .find(|&&x| x % 2 == 0)
        .copied()
        .ok_or(String::from("no even number found"))
}

fn main() {
    println!("{:?}", first_even(&[1, 3, 4, 6]));
    println!("{:?}", first_even(&[1, 3, 5]));
}`,
      hints: [
        'Use iter().find() to locate the first even number.',
        'ok_or converts Option to Result with a given error.',
        'Use .copied() to convert &i32 to i32.',
      ],
      concepts: ['ok_or', 'Option to Result', 'find'],
    },
    {
      id: 'rs-err-13',
      title: 'Wrong unwrap',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix the panic caused by unwrapping a None value.',
      skeleton: `fn find_name(id: u32) -> Option<String> {
    let users = vec![(1, "Alice"), (2, "Bob")];
    users.iter()
        .find(|(uid, _)| *uid == id)
        .map(|(_, name)| name.to_string())
}

fn main() {
    let name = find_name(99).unwrap(); // panics!
    println!("Found: {}", name);
}`,
      solution: `fn find_name(id: u32) -> Option<String> {
    let users = vec![(1, "Alice"), (2, "Bob")];
    users.iter()
        .find(|(uid, _)| *uid == id)
        .map(|(_, name)| name.to_string())
}

fn main() {
    let name = find_name(99).unwrap_or_else(|| String::from("Unknown"));
    println!("Found: {}", name);
}`,
      hints: [
        'unwrap panics on None -- use a safe alternative.',
        'unwrap_or_else provides a default via a closure.',
        'Replace .unwrap() with .unwrap_or_else(|| ...).',
      ],
      concepts: ['unwrap', 'unwrap_or_else', 'Option safety'],
    },
    {
      id: 'rs-err-14',
      title: 'Missing ? Return Type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a function that uses ? but has the wrong return type.',
      skeleton: `fn read_number(s: &str) -> i32 {
    let n = s.parse::<i32>()?;
    n * 2
}

fn main() {
    println!("{}", read_number("5"));
}`,
      solution: `fn read_number(s: &str) -> Result<i32, std::num::ParseIntError> {
    let n = s.parse::<i32>()?;
    Ok(n * 2)
}

fn main() {
    match read_number("5") {
        Ok(val) => println!("{}", val),
        Err(e) => println!("Error: {}", e),
    }
}`,
      hints: [
        'The ? operator requires the function to return Result or Option.',
        'Change the return type to Result<i32, ParseIntError>.',
        'Wrap the final value in Ok().',
      ],
      concepts: ['? operator', 'return type', 'Result'],
    },
    {
      id: 'rs-err-15',
      title: 'Mismatched Error Types',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix ? operator with incompatible error types.',
      skeleton: `use std::fs;
use std::num::ParseIntError;

fn read_config_value(path: &str) -> Result<i32, ParseIntError> {
    let content = fs::read_to_string(path)?; // io::Error != ParseIntError
    let val = content.trim().parse::<i32>()?;
    Ok(val)
}`,
      solution: `use std::fs;
use std::num::ParseIntError;

#[derive(Debug)]
enum ConfigError {
    Io(std::io::Error),
    Parse(ParseIntError),
}

impl From<std::io::Error> for ConfigError {
    fn from(e: std::io::Error) -> Self { ConfigError::Io(e) }
}

impl From<ParseIntError> for ConfigError {
    fn from(e: ParseIntError) -> Self { ConfigError::Parse(e) }
}

impl std::fmt::Display for ConfigError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            ConfigError::Io(e) => write!(f, "IO: {}", e),
            ConfigError::Parse(e) => write!(f, "Parse: {}", e),
        }
    }
}

fn read_config_value(path: &str) -> Result<i32, ConfigError> {
    let content = fs::read_to_string(path)?;
    let val = content.trim().parse::<i32>()?;
    Ok(val)
}`,
      hints: [
        'The ? operator needs From<SourceError> for TargetError.',
        'Create a unified error enum that wraps both error types.',
        'Implement From for each source error type.',
      ],
      concepts: ['From', 'error unification', 'custom error'],
    },
    {
      id: 'rs-err-16',
      title: 'Predict Result Chain',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the output of chained Result operations.',
      skeleton: `fn main() {
    let result: Result<i32, String> = Ok(10);
    let doubled = result.map(|x| x * 2);
    let stringed = doubled.map(|x| format!("val={}", x));
    println!("{:?}", stringed);
}`,
      solution: `Ok("val=20")`,
      hints: [
        'map on Ok transforms the inner value.',
        '10 * 2 = 20, then formatted as "val=20".',
        'The Result remains Ok throughout.',
      ],
      concepts: ['Result', 'map', 'chaining'],
    },
    {
      id: 'rs-err-17',
      title: 'Predict Error Propagation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict what happens when ? encounters an error.',
      skeleton: `fn step1() -> Result<i32, String> { Ok(5) }
fn step2(x: i32) -> Result<i32, String> { Err(String::from("step2 failed")) }
fn step3(x: i32) -> Result<i32, String> { Ok(x * 10) }

fn pipeline() -> Result<i32, String> {
    let a = step1()?;
    let b = step2(a)?;
    let c = step3(b)?;
    Ok(c)
}

fn main() {
    println!("{:?}", pipeline());
}`,
      solution: `Err("step2 failed")`,
      hints: [
        'step1 returns Ok(5), so a = 5.',
        'step2 returns Err, so ? returns early.',
        'step3 is never called.',
      ],
      concepts: ['? operator', 'early return', 'error propagation'],
    },
    {
      id: 'rs-err-18',
      title: 'Predict unwrap_or Chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of Option combinator chain.',
      skeleton: `fn main() {
    let a: Option<i32> = None;
    let b = a.or(Some(5)).map(|x| x + 10).filter(|x| *x > 20);
    println!("{:?}", b);

    let c: Option<i32> = Some(3);
    let d = c.or(Some(5)).map(|x| x + 10).filter(|x| *x > 20);
    println!("{:?}", d);
}`,
      solution: `None
None`,
      hints: [
        'a is None, .or(Some(5)) gives Some(5), map gives Some(15).',
        'filter(|x| *x > 20): 15 > 20 is false, so None.',
        'c is Some(3), .or is skipped, map gives Some(13), 13 > 20 is false, None.',
      ],
      concepts: ['Option', 'or', 'map', 'filter'],
    },
    {
      id: 'rs-err-19',
      title: 'Refactor Match to Combinators',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Replace verbose match expressions with Option/Result combinators.',
      skeleton: `fn get_username(id: u32) -> Option<String> {
    let users = vec![(1, "alice"), (2, "bob")];
    match users.iter().find(|(uid, _)| *uid == id) {
        Some((_, name)) => {
            let upper = name.to_uppercase();
            if upper.len() > 3 {
                Some(upper)
            } else {
                None
            }
        }
        None => None,
    }
}`,
      solution: `fn get_username(id: u32) -> Option<String> {
    let users = vec![(1, "alice"), (2, "bob")];
    users
        .iter()
        .find(|(uid, _)| *uid == id)
        .map(|(_, name)| name.to_uppercase())
        .filter(|name| name.len() > 3)
}`,
      hints: [
        'Replace match-on-Option with .map() and .filter().',
        'map transforms the Some value; filter removes based on predicate.',
        'Chain: find -> map -> filter.',
      ],
      concepts: ['Option combinators', 'map', 'filter', 'refactoring'],
    },
    {
      id: 'rs-err-20',
      title: 'Refactor Nested Results',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor deeply nested match on Results into flat ? chains.',
      skeleton: `use std::num::ParseIntError;

fn process(a: &str, b: &str) -> Result<i32, String> {
    match a.parse::<i32>() {
        Ok(x) => {
            match b.parse::<i32>() {
                Ok(y) => {
                    if y == 0 {
                        Err(String::from("division by zero"))
                    } else {
                        Ok(x / y)
                    }
                }
                Err(e) => Err(e.to_string()),
            }
        }
        Err(e) => Err(e.to_string()),
    }
}`,
      solution: `fn process(a: &str, b: &str) -> Result<i32, String> {
    let x: i32 = a.parse().map_err(|e: std::num::ParseIntError| e.to_string())?;
    let y: i32 = b.parse().map_err(|e: std::num::ParseIntError| e.to_string())?;
    if y == 0 {
        return Err(String::from("division by zero"));
    }
    Ok(x / y)
}`,
      hints: [
        'Use ? with map_err to flatten the nested matches.',
        'Each parse().map_err(...)? replaces a full match block.',
        'The division-by-zero check remains as a simple if.',
      ],
      concepts: ['? operator', 'map_err', 'refactoring', 'flat error handling'],
    },
  ],
};
