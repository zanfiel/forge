import type { Track } from '../../stores/app.svelte.ts';

export const track: Track = {
  id: 'rust',
  name: 'Rust',
  language: 'rust',
  monacoLang: 'rust',
  icon: '🦀',
  description: 'Memory-safe systems programming. Fast as C, safe as TypeScript. Powers Tauri, Servo, and the future.',
  sections: [
    // ─── Section 1: Variables & Ownership ────────
    {
      id: 'rs-basics',
      title: '1. Variables & Ownership',
      explanation: `## Variables & Ownership

Rust is strict about who "owns" data. This prevents bugs at compile time.

\`\`\`rust
let name = "Zan";           // immutable by default!
let mut age = 25;            // mut = mutable (can change)
age = 26;                    // ok because it's mut

let x = String::from("hello");
let y = x;                   // x is MOVED to y
// println!("{x}");          // ERROR! x is no longer valid
println!("{y}");             // ok, y owns it now
\`\`\`

**Types:**
\`\`\`rust
let n: i32 = 42;            // 32-bit integer
let f: f64 = 3.14;          // 64-bit float
let b: bool = true;
let s: String = String::from("hello");
let s2: &str = "hello";     // string slice (borrowed reference)
\`\`\`

**Ownership rules:**
1. Each value has exactly one owner
2. When the owner goes out of scope, the value is dropped
3. You can *borrow* a reference with \`&\` without taking ownership`,
      exercises: [
        {
          id: 'rs-basics-1',
          title: 'Let, Mut & Types',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'rust',
          goal: 'Declare variables with correct mutability and types.',
          skeleton: `fn main() {
    // Immutable string
    __BLANK__ name: &str = "Zan";

    // Mutable integer (will be changed later)
    __BLANK__ __BLANK__ count: i32 = 0;

    // Increment count
    count __BLANK__ 1;
    count += 1;

    // A String (heap-allocated, owned)
    let greeting = __BLANK__::from("Hello");

    println!("{name} — count: {count} — {greeting}");
}`,
          solution: `fn main() {
    let name: &str = "Zan";
    let mut count: i32 = 0;
    count += 1;
    count += 1;
    let greeting = String::from("Hello");
    println!("{name} — count: {count} — {greeting}");
}`,
          hints: [
            '`let` declares a variable. Add `mut` after `let` to make it mutable.',
            '`+=` adds and assigns. `String::from()` creates an owned String from a literal.',
            '`let`, `let mut`, `+=`, `String`.',
          ],
          concepts: ['let', 'mut', 'i32', '&str', 'String', 'println!'],
        },
        {
          id: 'rs-basics-2',
          title: 'Ownership & Moves',
          type: 'fix-bug',
          difficulty: 'beginner',
          language: 'rust',
          goal: 'Fix the ownership errors so the code compiles. The program should print both server names and the config.',
          skeleton: `fn main() {
    let server1 = String::from("rocky");
    let server2 = server1;

    // BUG: server1 was moved to server2, so this fails
    println!("Primary: {server1}");
    println!("Backup:  {server2}");

    let config = String::from("port=4200");
    print_config(config);

    // BUG: config was moved into the function
    println!("Config is: {config}");
}

fn print_config(c: String) {
    println!("Loaded config: {c}");
}`,
          solution: `fn main() {
    let server1 = String::from("rocky");
    let server2 = server1.clone();

    println!("Primary: {server1}");
    println!("Backup:  {server2}");

    let config = String::from("port=4200");
    print_config(&config);

    println!("Config is: {config}");
}

fn print_config(c: &str) {
    println!("Loaded config: {c}");
}`,
          hints: [
            'When you assign a `String` to another variable, the original is moved. To keep both, you can `.clone()` it.',
            'Instead of moving `config` into the function, pass a *reference* with `&config`. The function then borrows it.',
            'Change `print_config(config)` to `print_config(&config)` and the parameter from `String` to `&str`.',
          ],
          concepts: ['ownership', 'move', 'clone', 'borrowing', '&str vs String'],
        },
        {
          id: 'rs-basics-3',
          title: 'References & Borrowing',
          type: 'predict-output',
          difficulty: 'beginner',
          language: 'rust',
          goal: 'Read the code and predict what it prints. Think about how references and ownership interact.',
          skeleton: `fn main() {
    let mut name = String::from("rocky");
    let len = calculate_length(&name);
    println!("{name} is {len} chars");

    add_suffix(&mut name);
    println!("{name}");
}

fn calculate_length(s: &String) -> usize {
    s.len()
}

fn add_suffix(s: &mut String) {
    s.push_str("-server");
}

// What does this program print?
// Line 1: ???
// Line 2: ???`,
          solution: `fn main() {
    let mut name = String::from("rocky");
    let len = calculate_length(&name);
    println!("{name} is {len} chars");

    add_suffix(&mut name);
    println!("{name}");
}

fn calculate_length(s: &String) -> usize {
    s.len()
}

fn add_suffix(s: &mut String) {
    s.push_str("-server");
}

// Line 1: rocky is 5 chars
// Line 2: rocky-server`,
          hints: [
            '`&name` borrows without moving. `calculate_length` just reads it and returns the length.',
            '`&mut name` is a mutable borrow. `push_str` appends to the original string in place.',
            'Line 1: "rocky is 5 chars". Line 2: "rocky-server" (suffix was appended via mutable reference).',
          ],
          concepts: ['immutable reference', 'mutable reference', '&', '&mut', 'push_str', 'len'],
        },
      ],
    },

    // ─── Section 2: Functions & Control Flow ─────
    {
      id: 'rs-functions',
      title: '2. Functions & Control Flow',
      explanation: `## Functions & Control Flow

Functions in Rust have typed parameters and return values. The last expression (no semicolon) is the return value:

\`\`\`rust
fn add(a: i32, b: i32) -> i32 {
    a + b    // no semicolon = this is the return value
}

fn greet(name: &str) -> String {
    format!("Hello, {name}!")
}
\`\`\`

**Control flow** works like most languages, but \`if\` is an expression (it returns a value):

\`\`\`rust
let status = if online { "up" } else { "down" };

for i in 0..5 {
    println!("{i}");    // 0, 1, 2, 3, 4
}

let mut n = 3;
while n > 0 {
    println!("{n}");
    n -= 1;
}
\`\`\`

**\`match\`** is Rust's powerful pattern matching (like switch on steroids):
\`\`\`rust
match status_code {
    200 => println!("OK"),
    404 => println!("Not found"),
    500..=599 => println!("Server error"),
    _ => println!("Unknown"),  // _ catches everything else
}
\`\`\``,
      exercises: [
        {
          id: 'rs-fn-1',
          title: 'Functions & Expressions',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'rust',
          goal: 'Complete the functions using Rust\'s expression-based return style.',
          skeleton: `// Returns the larger of two numbers
fn max_of(a: i32, b: i32) -> __BLANK__ {
    if a > b { __BLANK__ } else { __BLANK__ }
}

// Returns "even" or "odd" as a &str
fn parity(n: i32) -> __BLANK__ {
    if n % 2 == 0 __BLANK__ "even" __BLANK__ __BLANK__ "odd" __BLANK__
}

fn main() {
    println!("{}", max_of(10, 20));  // 20
    println!("{}", parity(7));       // odd
    println!("{}", parity(42));      // even
}`,
          solution: `fn max_of(a: i32, b: i32) -> i32 {
    if a > b { a } else { b }
}

fn parity(n: i32) -> &'static str {
    if n % 2 == 0 { "even" } else { "odd" }
}

fn main() {
    println!("{}", max_of(10, 20));
    println!("{}", parity(7));
    println!("{}", parity(42));
}`,
          hints: [
            'Both branches of an `if` expression must return the same type. `max_of` returns `i32`.',
            'String literals like "even" have type `&\'static str`. The `if` expression needs curly braces around each branch.',
            'Fill in: `i32`, `a`, `b`, `&\'static str`, `{`, `}`, `else`, `{`, `}`.',
          ],
          concepts: ['function return', 'expression-based return', 'if expression', '&\'static str'],
        },
        {
          id: 'rs-fn-2',
          title: 'Match Expressions',
          type: 'write-function',
          difficulty: 'beginner',
          language: 'rust',
          goal: 'Write a function `http_status` that takes a u16 status code and returns a description. Handle: 200 = "OK", 301 = "Moved", 404 = "Not Found", 500 = "Internal Error", anything in 400..=499 = "Client Error", anything else = "Unknown".',
          skeleton: `// Write the http_status function here


fn main() {
    println!("{}", http_status(200));  // OK
    println!("{}", http_status(404));  // Not Found
    println!("{}", http_status(418));  // Client Error
    println!("{}", http_status(500));  // Internal Error
    println!("{}", http_status(302));  // Unknown
}`,
          solution: `fn http_status(code: u16) -> &'static str {
    match code {
        200 => "OK",
        301 => "Moved",
        404 => "Not Found",
        500 => "Internal Error",
        400..=499 => "Client Error",
        _ => "Unknown",
    }
}

fn main() {
    println!("{}", http_status(200));
    println!("{}", http_status(404));
    println!("{}", http_status(418));
    println!("{}", http_status(500));
    println!("{}", http_status(302));
}`,
          hints: [
            'Use `match code { ... }` with arms for each case. Specific values like `200 =>` go before ranges.',
            'Ranges in match use `..=` syntax: `400..=499 => "Client Error"`. The catch-all is `_ =>`.',
            'Put specific codes (200, 301, 404, 500) first, then the range (400..=499), then `_` last.',
          ],
          concepts: ['match', 'pattern matching', 'ranges', 'wildcard pattern'],
        },
        {
          id: 'rs-fn-3',
          title: 'FizzBuzz with Tuples',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'rust',
          goal: 'Write a function `fizzbuzz` that takes a u32 and returns a String. For multiples of 3: "Fizz". For multiples of 5: "Buzz". For multiples of both: "FizzBuzz". Otherwise: the number as a string.',
          skeleton: `// Write the fizzbuzz function here


fn main() {
    for i in 1..=20 {
        println!("{}", fizzbuzz(i));
    }
    // Should print: 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz,
    // 11, Fizz, 13, 14, FizzBuzz, 16, 17, Fizz, 19, Buzz
}`,
          solution: `fn fizzbuzz(n: u32) -> String {
    match (n % 3, n % 5) {
        (0, 0) => String::from("FizzBuzz"),
        (0, _) => String::from("Fizz"),
        (_, 0) => String::from("Buzz"),
        _ => n.to_string(),
    }
}

fn main() {
    for i in 1..=20 {
        println!("{}", fizzbuzz(i));
    }
}`,
          hints: [
            'You can match on tuples: `match (n % 3, n % 5)` gives you two values to check at once.',
            '`(0, 0)` means divisible by both. `(0, _)` means divisible by 3 only. `_` ignores a value.',
            '`n.to_string()` converts a number to a String. Check the "both" case first so it takes priority.',
          ],
          concepts: ['match on tuples', 'String::from', 'to_string', 'for range', 'modulo'],
        },
      ],
    },

    // ─── Section 3: Structs & Enums ──────────────
    {
      id: 'rs-structs',
      title: '3. Structs & Enums',
      explanation: `## Structs & Enums

**Structs** group data together (like interfaces in TypeScript, but they own their data):

\`\`\`rust
struct Server {
    name: String,
    ip: String,
    port: u16,
    online: bool,
}

let srv = Server {
    name: String::from("rocky"),
    ip: String::from("192.168.8.133"),
    port: 22,
    online: true,
};
\`\`\`

**Enums** define a type that can be one of several variants. Rust enums are way more powerful than most languages because each variant can hold data:

\`\`\`rust
enum Command {
    Ping,                           // no data
    Echo(String),                   // holds a String
    Move { x: i32, y: i32 },       // holds named fields
}

let cmd = Command::Echo(String::from("hello"));
\`\`\`

**impl** blocks add methods to structs and enums:
\`\`\`rust
impl Server {
    fn address(&self) -> String {
        format!("{}:{}", self.ip, self.port)
    }
}

println!("{}", srv.address());  // "192.168.8.133:22"
\`\`\`

\`&self\` means the method borrows the struct. \`&mut self\` lets it modify the struct.`,
      exercises: [
        {
          id: 'rs-struct-1',
          title: 'Define a Struct',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'rust',
          goal: 'Define a Config struct and implement a method on it.',
          skeleton: `__BLANK__ Config {
    host: __BLANK__,
    port: __BLANK__,
    debug: __BLANK__,
}

__BLANK__ Config {
    fn address(&__BLANK__) -> String {
        __BLANK__("{}:{}", self.host, self.port)
    }

    fn display(&self) -> String {
        let mode = if self.debug { "DEBUG" } else { "PROD" };
        format!("{} [{}]", self.__BLANK__(), mode)
    }
}

fn main() {
    let cfg = Config {
        host: String::from("0.0.0.0"),
        port: 4200,
        debug: true,
    };
    println!("{}", cfg.display());  // 0.0.0.0:4200 [DEBUG]
}`,
          solution: `struct Config {
    host: String,
    port: u16,
    debug: bool,
}

impl Config {
    fn address(&self) -> String {
        format!("{}:{}", self.host, self.port)
    }

    fn display(&self) -> String {
        let mode = if self.debug { "DEBUG" } else { "PROD" };
        format!("{} [{}]", self.address(), mode)
    }
}

fn main() {
    let cfg = Config {
        host: String::from("0.0.0.0"),
        port: 4200,
        debug: true,
    };
    println!("{}", cfg.display());
}`,
          hints: [
            'Structs start with `struct Name {`. Fields use `String` for owned strings, `u16` for port numbers, `bool` for flags.',
            '`impl Config` adds methods. Methods take `&self` as the first parameter to borrow the struct.',
            '`format!` creates a formatted String. Call other methods with `self.method_name()`.',
          ],
          concepts: ['struct', 'impl', '&self', 'format!', 'method calls'],
        },
        {
          id: 'rs-struct-2',
          title: 'Enums with Data',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'rust',
          goal: 'Define an enum `Shape` with three variants: `Circle` (holds radius as f64), `Rectangle` (holds width and height as f64), and `Triangle` (holds base and height as f64). Then implement an `area` method that returns the correct area for each shape.',
          skeleton: `use std::f64::consts::PI;

// Define the Shape enum here


// Implement the area method here


fn main() {
    let shapes: Vec<Shape> = vec![
        Shape::Circle(5.0),
        Shape::Rectangle(4.0, 6.0),
        Shape::Triangle(3.0, 8.0),
    ];

    for shape in &shapes {
        println!("Area: {:.2}", shape.area());
    }
    // Circle: 78.54
    // Rectangle: 24.00
    // Triangle: 12.00
}`,
          solution: `use std::f64::consts::PI;

enum Shape {
    Circle(f64),
    Rectangle(f64, f64),
    Triangle(f64, f64),
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle(r) => PI * r * r,
            Shape::Rectangle(w, h) => w * h,
            Shape::Triangle(b, h) => 0.5 * b * h,
        }
    }
}

fn main() {
    let shapes: Vec<Shape> = vec![
        Shape::Circle(5.0),
        Shape::Rectangle(4.0, 6.0),
        Shape::Triangle(3.0, 8.0),
    ];

    for shape in &shapes {
        println!("Area: {:.2}", shape.area());
    }
}`,
          hints: [
            'Enum variants with unnamed data use parentheses: `Circle(f64)`, `Rectangle(f64, f64)`.',
            'In `match self`, destructure each variant: `Shape::Circle(r) =>` pulls out the radius into `r`.',
            'Circle area: PI * r * r. Rectangle: width * height. Triangle: 0.5 * base * height.',
          ],
          concepts: ['enum variants', 'match on enum', 'destructuring', 'impl for enum', 'f64'],
        },
        {
          id: 'rs-struct-3',
          title: 'Builder Pattern',
          type: 'refactor',
          difficulty: 'intermediate',
          language: 'rust',
          goal: 'This code creates a Server struct with a long, hard-to-read constructor call. Refactor it to use a builder pattern with a `new` method that takes just the name, and setter methods that return `self` for chaining.',
          skeleton: `struct Server {
    name: String,
    ip: String,
    port: u16,
    max_connections: u32,
    timeout_secs: u64,
}

fn main() {
    // This is hard to read. Refactor Server to use a builder pattern:
    // Server::new("rocky").ip("192.168.8.133").port(4200).max_connections(100).timeout_secs(30)
    let srv = Server {
        name: String::from("rocky"),
        ip: String::from("0.0.0.0"),
        port: 8080,
        max_connections: 50,
        timeout_secs: 60,
    };

    // After refactoring, this should work:
    // let srv = Server::new("rocky")
    //     .ip("192.168.8.133")
    //     .port(4200)
    //     .max_connections(100)
    //     .timeout_secs(30);

    println!("{}:{}", srv.name, srv.port);
}`,
          solution: `struct Server {
    name: String,
    ip: String,
    port: u16,
    max_connections: u32,
    timeout_secs: u64,
}

impl Server {
    fn new(name: &str) -> Self {
        Server {
            name: String::from(name),
            ip: String::from("0.0.0.0"),
            port: 8080,
            max_connections: 50,
            timeout_secs: 60,
        }
    }

    fn ip(mut self, ip: &str) -> Self {
        self.ip = String::from(ip);
        self
    }

    fn port(mut self, port: u16) -> Self {
        self.port = port;
        self
    }

    fn max_connections(mut self, n: u32) -> Self {
        self.max_connections = n;
        self
    }

    fn timeout_secs(mut self, secs: u64) -> Self {
        self.timeout_secs = secs;
        self
    }
}

fn main() {
    let srv = Server::new("rocky")
        .ip("192.168.8.133")
        .port(4200)
        .max_connections(100)
        .timeout_secs(30);

    println!("{}:{}", srv.name, srv.port);
}`,
          hints: [
            '`Self` is an alias for the struct type. `fn new(name: &str) -> Self` is the convention for constructors.',
            'Each setter takes `mut self` (ownership, not a reference), modifies one field, and returns `self`. This enables chaining.',
            'The pattern: `fn port(mut self, port: u16) -> Self { self.port = port; self }`. Repeat for each field.',
          ],
          concepts: ['builder pattern', 'Self', 'method chaining', 'mut self', 'associated functions'],
        },
      ],
    },

    // ─── Section 4: Error Handling & Option/Result ──
    {
      id: 'rs-errors',
      title: '4. Error Handling & Option/Result',
      explanation: `## Error Handling with Option and Result

Rust has no null and no exceptions. Instead, it uses two enums from the standard library:

**\`Option<T>\`** represents a value that might not exist:
\`\`\`rust
enum Option<T> {
    Some(T),   // there's a value
    None,      // there's nothing
}

let port: Option<u16> = Some(4200);
let missing: Option<u16> = None;
\`\`\`

**\`Result<T, E>\`** represents an operation that might fail:
\`\`\`rust
enum Result<T, E> {
    Ok(T),     // success, here's the value
    Err(E),    // failure, here's the error
}

fn read_port(s: &str) -> Result<u16, String> {
    s.parse::<u16>().map_err(|e| e.to_string())
}
\`\`\`

**The \`?\` operator** is the magic shortcut. It unwraps \`Ok\`/\`Some\` or returns early with the error:
\`\`\`rust
fn load_config(path: &str) -> Result<String, std::io::Error> {
    let content = std::fs::read_to_string(path)?;  // returns Err early if it fails
    Ok(content)
}
\`\`\`

**Handling Options and Results:**
\`\`\`rust
// match (explicit)
match port {
    Some(p) => println!("Port: {p}"),
    None => println!("No port set"),
}

// unwrap_or (default value)
let p = port.unwrap_or(8080);

// if let (when you only care about one case)
if let Some(p) = port {
    println!("Port: {p}");
}
\`\`\``,
      exercises: [
        {
          id: 'rs-err-1',
          title: 'Option Basics',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'rust',
          goal: 'Work with Option types to handle values that might not exist.',
          skeleton: `fn find_server(name: &str) -> __BLANK__<String> {
    match name {
        "rocky" => __BLANK__(String::from("192.168.8.133")),
        "pangolin" => Some(String::from("46.225.188.154")),
        __BLANK__ => None,
    }
}

fn main() {
    let ip = find_server("rocky");

    // Use match to handle the Option
    match ip {
        __BLANK__(addr) => println!("Found: {addr}"),
        __BLANK__ => println!("Server not found"),
    }

    // Use unwrap_or for a default
    let backup = find_server("unknown").__BLANK__("0.0.0.0".to_string());
    println!("Backup: {backup}");
}`,
          solution: `fn find_server(name: &str) -> Option<String> {
    match name {
        "rocky" => Some(String::from("192.168.8.133")),
        "pangolin" => Some(String::from("46.225.188.154")),
        _ => None,
    }
}

fn main() {
    let ip = find_server("rocky");

    match ip {
        Some(addr) => println!("Found: {addr}"),
        None => println!("Server not found"),
    }

    let backup = find_server("unknown").unwrap_or("0.0.0.0".to_string());
    println!("Backup: {backup}");
}`,
          hints: [
            '`Option<String>` is the return type. `Some(value)` wraps a present value, `None` means absent.',
            'The wildcard pattern `_` catches all other cases in a match. Use `Some(addr)` and `None` in the output match.',
            '`.unwrap_or(default)` returns the inner value if Some, or the default if None.',
          ],
          concepts: ['Option', 'Some', 'None', 'match', 'unwrap_or', 'wildcard pattern'],
        },
        {
          id: 'rs-err-2',
          title: 'Result and Error Handling',
          type: 'fix-bug',
          difficulty: 'intermediate',
          language: 'rust',
          goal: 'Fix this config parser so it properly handles errors using Result instead of panicking with direct indexing.',
          skeleton: `use std::collections::HashMap;

fn parse_config(input: &str) -> Result<HashMap<String, String>, String> {
    let mut map = HashMap::new();

    for line in input.lines() {
        if line.trim().is_empty() || line.starts_with('#') {
            continue;
        }

        // BUG: direct indexing panics on lines without '='
        let parts: Vec<&str> = line.splitn(2, '=').collect();
        let key = parts[0].trim().to_string();
        let value = parts[1].trim().to_string();  // panics if no '='

        map.insert(key, value);
    }

    Ok(map)
}

fn main() {
    let input = "host=0.0.0.0\\nport=4200\\nbad line here\\ndebug=true";
    match parse_config(input) {
        Ok(config) => {
            for (k, v) in &config {
                println!("{k} = {v}");
            }
        }
        Err(e) => println!("Config error: {e}"),
    }
}`,
          solution: `use std::collections::HashMap;

fn parse_config(input: &str) -> Result<HashMap<String, String>, String> {
    let mut map = HashMap::new();

    for line in input.lines() {
        if line.trim().is_empty() || line.starts_with('#') {
            continue;
        }

        let parts: Vec<&str> = line.splitn(2, '=').collect();
        if parts.len() != 2 {
            return Err(format!("Invalid config line: {line}"));
        }
        let key = parts[0].trim().to_string();
        let value = parts[1].trim().to_string();

        map.insert(key, value);
    }

    Ok(map)
}

fn main() {
    let input = "host=0.0.0.0\\nport=4200\\nbad line here\\ndebug=true";
    match parse_config(input) {
        Ok(config) => {
            for (k, v) in &config {
                println!("{k} = {v}");
            }
        }
        Err(e) => println!("Config error: {e}"),
    }
}`,
          hints: [
            'Instead of blindly accessing `parts[1]`, check if the split actually produced two parts.',
            '`if parts.len() != 2 { return Err(...) }` will return early with a helpful error message.',
            'Use `format!("Invalid config line: {line}")` to build the error string. `return Err(...)` exits the function.',
          ],
          concepts: ['Result', 'Err', 'early return', 'error messages', 'format!', 'HashMap'],
        },
        {
          id: 'rs-err-3',
          title: 'Parsing with map_err and ?',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'rust',
          goal: 'Write a function `parse_endpoint` that takes a string like "192.168.8.133:4200" and returns a Result containing a tuple of (String, u16). Return an error if the format is invalid or the port is not a number.',
          skeleton: `// Write parse_endpoint here
// Input: "192.168.8.133:4200"
// Output: Ok(("192.168.8.133".to_string(), 4200))
// Errors: "Missing ':' separator" or "Invalid port: {value}"


fn main() {
    match parse_endpoint("192.168.8.133:4200") {
        Ok((ip, port)) => println!("{ip}:{port}"),
        Err(e) => println!("Error: {e}"),
    }

    match parse_endpoint("bad-input") {
        Ok((ip, port)) => println!("{ip}:{port}"),
        Err(e) => println!("Error: {e}"),
    }

    match parse_endpoint("localhost:abc") {
        Ok((ip, port)) => println!("{ip}:{port}"),
        Err(e) => println!("Error: {e}"),
    }
}`,
          solution: `fn parse_endpoint(s: &str) -> Result<(String, u16), String> {
    let parts: Vec<&str> = s.splitn(2, ':').collect();
    if parts.len() != 2 {
        return Err(String::from("Missing ':' separator"));
    }
    let ip = parts[0].to_string();
    let port: u16 = parts[1]
        .parse()
        .map_err(|_| format!("Invalid port: {}", parts[1]))?;
    Ok((ip, port))
}

fn main() {
    match parse_endpoint("192.168.8.133:4200") {
        Ok((ip, port)) => println!("{ip}:{port}"),
        Err(e) => println!("Error: {e}"),
    }

    match parse_endpoint("bad-input") {
        Ok((ip, port)) => println!("{ip}:{port}"),
        Err(e) => println!("Error: {e}"),
    }

    match parse_endpoint("localhost:abc") {
        Ok((ip, port)) => println!("{ip}:{port}"),
        Err(e) => println!("Error: {e}"),
    }
}`,
          hints: [
            'Split on \':\' and check you got two parts. The IP is the first part, the port string is the second.',
            '`.parse::<u16>()` returns a Result. Use `.map_err(|_| ...)` to convert the parse error to your custom string.',
            'The `?` operator after `.map_err(...)` will return the Err early if parsing fails. Wrap success in `Ok((ip, port))`.',
          ],
          concepts: ['Result', '? operator', 'map_err', 'parse', 'tuple return', 'splitn'],
        },
      ],
    },

    // ─── Section 5: Iterators & Collections ──────
    {
      id: 'rs-iterators',
      title: '5. Iterators & Collections',
      explanation: `## Iterators & Collections

Rust iterators are lazy and composable. They compile down to the same speed as hand-written loops.

**Creating iterators:**
\`\`\`rust
let nums = vec![1, 2, 3, 4, 5];
let iter = nums.iter();         // borrows each element
let iter = nums.into_iter();    // takes ownership of each element
\`\`\`

**Chaining operations (like array methods in JS):**
\`\`\`rust
let result: Vec<i32> = nums.iter()
    .filter(|&&n| n > 2)       // keep only > 2
    .map(|&n| n * 10)          // multiply by 10
    .collect();                 // gather into a Vec
// [30, 40, 50]
\`\`\`

**Common adapters:** \`.map()\`, \`.filter()\`, \`.enumerate()\`, \`.zip()\`, \`.take()\`, \`.skip()\`, \`.chain()\`

**Common consumers:** \`.collect()\`, \`.sum()\`, \`.count()\`, \`.any()\`, \`.all()\`, \`.find()\`, \`.fold()\`

**Key collections:**
\`\`\`rust
use std::collections::HashMap;

let mut scores: HashMap<String, i32> = HashMap::new();
scores.insert(String::from("rocky"), 95);
scores.insert(String::from("pangolin"), 87);

// Iterate a HashMap
for (name, score) in &scores {
    println!("{name}: {score}");
}
\`\`\`

**\`Vec\`** is the go-to growable array. \`HashMap\` is your key-value store.`,
      exercises: [
        {
          id: 'rs-iter-1',
          title: 'Iterator Chains',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'rust',
          goal: 'Use iterator chains to process server log data. Fill in the missing iterator methods.',
          skeleton: `fn main() {
    let logs = vec![
        "INFO: server started on port 4200",
        "ERROR: connection refused",
        "INFO: client connected from 192.168.8.1",
        "WARN: high memory usage (89%)",
        "ERROR: disk full",
        "INFO: request processed in 23ms",
        "ERROR: timeout after 30s",
    ];

    // Count error lines
    let error_count = logs.iter()
        .__BLANK__(|line| line.starts_with("ERROR"))
        .__BLANK__();

    println!("Errors: {error_count}");  // 3

    // Extract just the messages from ERROR lines (strip the "ERROR: " prefix)
    let error_messages: Vec<&str> = logs.iter()
        .filter(|line| line.starts_with("ERROR"))
        .__BLANK__(|line| &line[7..])
        .__BLANK__();

    println!("{:?}", error_messages);
    // ["connection refused", "disk full", "timeout after 30s"]

    // Get the first INFO message, or a default
    let first_info = logs.iter()
        .__BLANK__(|line| line.starts_with("INFO"))
        .next()
        .__BLANK__(&"No info logs");

    println!("First: {first_info}");
}`,
          solution: `fn main() {
    let logs = vec![
        "INFO: server started on port 4200",
        "ERROR: connection refused",
        "INFO: client connected from 192.168.8.1",
        "WARN: high memory usage (89%)",
        "ERROR: disk full",
        "INFO: request processed in 23ms",
        "ERROR: timeout after 30s",
    ];

    let error_count = logs.iter()
        .filter(|line| line.starts_with("ERROR"))
        .count();

    println!("Errors: {error_count}");

    let error_messages: Vec<&str> = logs.iter()
        .filter(|line| line.starts_with("ERROR"))
        .map(|line| &line[7..])
        .collect();

    println!("{:?}", error_messages);

    let first_info = logs.iter()
        .filter(|line| line.starts_with("INFO"))
        .next()
        .unwrap_or(&"No info logs");

    println!("First: {first_info}");
}`,
          hints: [
            '`.filter()` keeps items matching a condition. `.count()` consumes the iterator and returns how many.',
            '`.map()` transforms each element. `.collect()` gathers results into a collection like Vec.',
            '`.next()` grabs the first item as an Option. `.unwrap_or()` provides a fallback if None.',
          ],
          concepts: ['filter', 'count', 'map', 'collect', 'next', 'unwrap_or', 'iterator chain'],
        },
        {
          id: 'rs-iter-2',
          title: 'Word Frequency Counter',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'rust',
          goal: 'Write a function `word_frequency` that takes a string slice and returns a HashMap mapping each lowercase word to how many times it appears. Strip punctuation (periods, commas, exclamation marks, question marks) from words before counting.',
          skeleton: `use std::collections::HashMap;

// Write word_frequency here


fn main() {
    let text = "the quick brown fox jumps over the lazy dog. The dog barked, the fox ran!";
    let freq = word_frequency(text);

    // Print sorted by frequency (highest first)
    let mut pairs: Vec<_> = freq.iter().collect();
    pairs.sort_by(|a, b| b.1.cmp(a.1));

    for (word, count) in pairs {
        println!("{word}: {count}");
    }
    // the: 4, fox: 2, dog: 2, ... (rest are 1)
}`,
          solution: `use std::collections::HashMap;

fn word_frequency(text: &str) -> HashMap<String, u32> {
    let mut counts: HashMap<String, u32> = HashMap::new();
    for word in text.split_whitespace() {
        let cleaned: String = word
            .to_lowercase()
            .chars()
            .filter(|c| c.is_alphanumeric())
            .collect();
        if !cleaned.is_empty() {
            *counts.entry(cleaned).or_insert(0) += 1;
        }
    }
    counts
}

fn main() {
    let text = "the quick brown fox jumps over the lazy dog. The dog barked, the fox ran!";
    let freq = word_frequency(text);

    let mut pairs: Vec<_> = freq.iter().collect();
    pairs.sort_by(|a, b| b.1.cmp(a.1));

    for (word, count) in pairs {
        println!("{word}: {count}");
    }
}`,
          hints: [
            '`text.split_whitespace()` gives you an iterator of words. `.to_lowercase()` normalizes case.',
            'To strip punctuation, use `.chars().filter(|c| c.is_alphanumeric()).collect::<String>()`.',
            '`counts.entry(word).or_insert(0)` returns a mutable reference to the count. Dereference with `*` and add 1.',
          ],
          concepts: ['HashMap', 'entry API', 'or_insert', 'split_whitespace', 'chars', 'filter', 'collect'],
        },
      ],
    },
  ],
};
