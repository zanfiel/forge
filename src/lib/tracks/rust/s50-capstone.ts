import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-capstone',
  title: '50. Capstone Project',
  explanation: `## Capstone Project

This final section combines concepts from across the entire Rust track. Each exercise tests your ability to integrate multiple Rust features into cohesive solutions.

### Skills Tested
- Ownership, borrowing, and lifetimes
- Traits, generics, and trait objects
- Error handling with Result and Option
- Collections and iterators
- Concurrency and async
- Smart pointers
- Pattern matching
- Closures and functional patterns
- Structs, enums, and methods
- Modules and visibility

### Real-World Patterns
These exercises mirror real-world Rust code patterns:
- Builder patterns with validation
- Iterator adapters and custom iterators
- State machines with enums
- Concurrent data processing
- Generic abstractions over collections
- Error handling with custom types`,
  exercises: [
    {
      id: 'rs-capstone-1',
      title: 'Generic Min/Max Container',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Complete a generic struct that tracks the minimum and maximum values seen.',
      skeleton: `struct MinMax<T: __BLANK__ + Copy> {
    min: Option<T>,
    max: Option<T>,
}

impl<T: PartialOrd + Copy> MinMax<T> {
    fn new() -> Self {
        MinMax { min: None, max: None }
    }

    fn observe(&mut self, value: T) {
        self.min = Some(match self.min {
            Some(m) if m < value => m,
            _ => value,
        });
        self.max = Some(match self.__BLANK__ {
            Some(m) if m > value => m,
            _ => value,
        });
    }
}`,
      solution: `struct MinMax<T: PartialOrd + Copy> {
    min: Option<T>,
    max: Option<T>,
}

impl<T: PartialOrd + Copy> MinMax<T> {
    fn new() -> Self {
        MinMax { min: None, max: None }
    }

    fn observe(&mut self, value: T) {
        self.min = Some(match self.min {
            Some(m) if m < value => m,
            _ => value,
        });
        self.max = Some(match self.max {
            Some(m) if m > value => m,
            _ => value,
        });
    }
}`,
      hints: [
        'The bound is PartialOrd for comparison.',
        'min keeps the smaller value, max keeps the larger.',
        'The max field mirrors the min logic but keeps larger values.'
      ],
      concepts: ['generics', 'partial-ord', 'option', 'pattern-matching']
    },
    {
      id: 'rs-capstone-2',
      title: 'Error Chain with Custom Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Complete a custom error enum that wraps different error sources.',
      skeleton: `use std::fmt;
use std::num::ParseIntError;

#[derive(Debug)]
enum AppError {
    Parse(ParseIntError),
    Validation(String),
    NotFound { id: u32 },
}

impl fmt::__BLANK__ for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppError::Parse(e) => write!(f, "parse error: {e}"),
            AppError::Validation(msg) => write!(f, "validation: {msg}"),
            AppError::NotFound { id } => write!(f, "not found: {id}"),
        }
    }
}

impl __BLANK__<ParseIntError> for AppError {
    fn from(e: ParseIntError) -> Self {
        AppError::Parse(e)
    }
}`,
      solution: `use std::fmt;
use std::num::ParseIntError;

#[derive(Debug)]
enum AppError {
    Parse(ParseIntError),
    Validation(String),
    NotFound { id: u32 },
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppError::Parse(e) => write!(f, "parse error: {e}"),
            AppError::Validation(msg) => write!(f, "validation: {msg}"),
            AppError::NotFound { id } => write!(f, "not found: {id}"),
        }
    }
}

impl From<ParseIntError> for AppError {
    fn from(e: ParseIntError) -> Self {
        AppError::Parse(e)
    }
}`,
      hints: [
        'Display trait is in std::fmt.',
        'From trait enables the ? operator for automatic conversion.',
        'From<ParseIntError> converts parse errors into AppError::Parse.'
      ],
      concepts: ['custom-error', 'display', 'from-trait', 'error-handling']
    },
    {
      id: 'rs-capstone-3',
      title: 'Iterator Chain',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Complete this iterator chain that filters, maps, and collects.',
      skeleton: `fn process_scores(scores: &[i32]) -> Vec<String> {
    scores.iter()
        .__BLANK__(|&&s| s >= 60)
        .__BLANK__(|&s| format!("Pass: {s}"))
        .collect()
}`,
      solution: `fn process_scores(scores: &[i32]) -> Vec<String> {
    scores.iter()
        .filter(|&&s| s >= 60)
        .map(|&s| format!("Pass: {s}"))
        .collect()
}`,
      hints: [
        'filter keeps elements matching the predicate.',
        'map transforms each element.',
        'filter comes first, then map transforms the survivors.'
      ],
      concepts: ['iterators', 'filter', 'map', 'collect']
    },
    {
      id: 'rs-capstone-4',
      title: 'Lifetime in Struct',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Add the correct lifetime annotations to this struct and method.',
      skeleton: `struct Excerpt<__BLANK__> {
    text: &'a str,
}

impl<'a> Excerpt<'a> {
    fn first_word(&self) -> &__BLANK__ str {
        self.text.split_whitespace().next().unwrap_or("")
    }
}`,
      solution: `struct Excerpt<'a> {
    text: &'a str,
}

impl<'a> Excerpt<'a> {
    fn first_word(&self) -> &'a str {
        self.text.split_whitespace().next().unwrap_or("")
    }
}`,
      hints: [
        'The struct needs a lifetime parameter for the borrowed text.',
        'The returned reference has the same lifetime as the text.',
        'Use \'a for both the struct and the return type.'
      ],
      concepts: ['lifetimes', 'struct-lifetime', 'borrowed-data']
    },
    {
      id: 'rs-capstone-5',
      title: 'Trait Object Collection',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Store different types implementing the same trait in a Vec using trait objects.',
      skeleton: `trait Describe {
    fn describe(&self) -> String;
}

struct Cat { name: String }
struct Dog { name: String }

impl Describe for Cat {
    fn describe(&self) -> String { format!("Cat: {}", self.name) }
}
impl Describe for Dog {
    fn describe(&self) -> String { format!("Dog: {}", self.name) }
}

fn all_descriptions(animals: &[Box<__BLANK__>]) -> Vec<String> {
    animals.iter().map(|a| a.describe()).collect()
}`,
      solution: `trait Describe {
    fn describe(&self) -> String;
}

struct Cat { name: String }
struct Dog { name: String }

impl Describe for Cat {
    fn describe(&self) -> String { format!("Cat: {}", self.name) }
}
impl Describe for Dog {
    fn describe(&self) -> String { format!("Dog: {}", self.name) }
}

fn all_descriptions(animals: &[Box<dyn Describe>]) -> Vec<String> {
    animals.iter().map(|a| a.describe()).collect()
}`,
      hints: [
        'Use dyn Describe for a trait object.',
        'Box<dyn Describe> allows storing different types in the same Vec.',
        'Dynamic dispatch happens at runtime via vtable.'
      ],
      concepts: ['trait-objects', 'dyn', 'box', 'dynamic-dispatch']
    },
    {
      id: 'rs-capstone-6',
      title: 'Closure as Parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Complete a function that takes a closure to transform values.',
      skeleton: `fn transform_all<F>(values: &[i32], f: F) -> Vec<i32>
where
    F: __BLANK__(i32) -> i32,
{
    values.iter().map(|&v| f(v)).collect()
}`,
      solution: `fn transform_all<F>(values: &[i32], f: F) -> Vec<i32>
where
    F: Fn(i32) -> i32,
{
    values.iter().map(|&v| f(v)).collect()
}`,
      hints: [
        'Fn is the trait for closures that borrow their captures.',
        'Fn(i32) -> i32 means it takes an i32 and returns an i32.',
        'Use Fn (not FnMut or FnOnce) since the closure is called multiple times.'
      ],
      concepts: ['closures', 'fn-trait', 'generics', 'where-clause']
    },
    {
      id: 'rs-capstone-7',
      title: 'Build a Task Runner',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a struct TaskRunner that stores a Vec of named tasks (name: String, action: Box<dyn Fn() -> String>). Implement new(), add_task(name, action), and run_all() -> Vec<(String, String)> that runs all tasks and returns (name, result) pairs.',
      skeleton: `// Write TaskRunner`,
      solution: `struct TaskRunner {
    tasks: Vec<(String, Box<dyn Fn() -> String>)>,
}

impl TaskRunner {
    fn new() -> Self {
        TaskRunner { tasks: Vec::new() }
    }

    fn add_task(&mut self, name: impl Into<String>, action: impl Fn() -> String + 'static) {
        self.tasks.push((name.into(), Box::new(action)));
    }

    fn run_all(&self) -> Vec<(String, String)> {
        self.tasks
            .iter()
            .map(|(name, action)| (name.clone(), action()))
            .collect()
    }
}`,
      hints: [
        'Store tasks as Vec<(String, Box<dyn Fn() -> String>)>.',
        'add_task takes a name and a closure, boxing the closure.',
        'run_all iterates, calls each action, and collects results.'
      ],
      concepts: ['trait-objects', 'closures', 'box', 'vec']
    },
    {
      id: 'rs-capstone-8',
      title: 'State Machine Enum',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Define an enum OrderState with variants Pending, Processing, Shipped { tracking: String }, and Delivered. Write a function `next_state` that transitions: Pending -> Processing, Processing -> Shipped (with tracking "TRK123"), Shipped -> Delivered, Delivered -> Delivered.',
      skeleton: `// Define OrderState and write next_state`,
      solution: `#[derive(Debug, Clone)]
enum OrderState {
    Pending,
    Processing,
    Shipped { tracking: String },
    Delivered,
}

fn next_state(state: OrderState) -> OrderState {
    match state {
        OrderState::Pending => OrderState::Processing,
        OrderState::Processing => OrderState::Shipped { tracking: "TRK123".to_string() },
        OrderState::Shipped { .. } => OrderState::Delivered,
        OrderState::Delivered => OrderState::Delivered,
    }
}`,
      hints: [
        'Use match on the current state to determine the next state.',
        'Shipped has a named field tracking.',
        'Delivered is a terminal state that transitions to itself.'
      ],
      concepts: ['state-machine', 'enum', 'pattern-matching', 'transitions']
    },
    {
      id: 'rs-capstone-9',
      title: 'Custom Iterator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Implement a Fibonacci iterator struct that yields the Fibonacci sequence. It should store two u64 values (a, b) starting at (0, 1). Implement Iterator with Item = u64.',
      skeleton: `// Write Fibonacci iterator`,
      solution: `struct Fibonacci {
    a: u64,
    b: u64,
}

impl Fibonacci {
    fn new() -> Self {
        Fibonacci { a: 0, b: 1 }
    }
}

impl Iterator for Fibonacci {
    type Item = u64;

    fn next(&mut self) -> Option<u64> {
        let result = self.a;
        let next = self.a + self.b;
        self.a = self.b;
        self.b = next;
        Some(result)
    }
}`,
      hints: [
        'Store two consecutive values and advance them each call.',
        'Return Some(current) and shift both values forward.',
        'The sequence is infinite, so always return Some.'
      ],
      concepts: ['custom-iterator', 'fibonacci', 'stateful-iteration']
    },
    {
      id: 'rs-capstone-10',
      title: 'Builder Pattern with Validation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Implement a ServerConfigBuilder with fields host: Option<String>, port: Option<u16>, max_connections: Option<u32>. Implement host(), port(), max_connections() setters that return &mut Self, and build() that returns Result<ServerConfig, String> validating all fields are set and port > 0.',
      skeleton: `// Write ServerConfig and ServerConfigBuilder`,
      solution: `struct ServerConfig {
    host: String,
    port: u16,
    max_connections: u32,
}

struct ServerConfigBuilder {
    host: Option<String>,
    port: Option<u16>,
    max_connections: Option<u32>,
}

impl ServerConfigBuilder {
    fn new() -> Self {
        ServerConfigBuilder {
            host: None,
            port: None,
            max_connections: None,
        }
    }

    fn host(&mut self, host: impl Into<String>) -> &mut Self {
        self.host = Some(host.into());
        self
    }

    fn port(&mut self, port: u16) -> &mut Self {
        self.port = Some(port);
        self
    }

    fn max_connections(&mut self, max: u32) -> &mut Self {
        self.max_connections = Some(max);
        self
    }

    fn build(&self) -> Result<ServerConfig, String> {
        let host = self.host.clone().ok_or("host is required")?;
        let port = self.port.ok_or("port is required")?;
        let max_connections = self.max_connections.ok_or("max_connections is required")?;

        if port == 0 {
            return Err("port must be greater than 0".to_string());
        }

        Ok(ServerConfig { host, port, max_connections })
    }
}`,
      hints: [
        'Each setter sets the Option field and returns &mut Self.',
        'build() validates all fields are Some and port > 0.',
        'Use ok_or to convert None to an error message.'
      ],
      concepts: ['builder-pattern', 'validation', 'option', 'result']
    },
    {
      id: 'rs-capstone-11',
      title: 'Generic Repository Trait',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Define a trait Repository<T> with methods: fn save(&mut self, item: T), fn find(&self, id: u32) -> Option<&T>, fn all(&self) -> &[T]. Implement it for InMemoryRepo<T> that stores items in a Vec<(u32, T)> with an auto-incrementing id.',
      skeleton: `// Define Repository trait and InMemoryRepo`,
      solution: `trait Repository<T> {
    fn save(&mut self, item: T) -> u32;
    fn find(&self, id: u32) -> Option<&T>;
    fn all(&self) -> Vec<&T>;
}

struct InMemoryRepo<T> {
    items: Vec<(u32, T)>,
    next_id: u32,
}

impl<T> InMemoryRepo<T> {
    fn new() -> Self {
        InMemoryRepo { items: Vec::new(), next_id: 1 }
    }
}

impl<T> Repository<T> for InMemoryRepo<T> {
    fn save(&mut self, item: T) -> u32 {
        let id = self.next_id;
        self.items.push((id, item));
        self.next_id += 1;
        id
    }

    fn find(&self, id: u32) -> Option<&T> {
        self.items.iter().find(|(i, _)| *i == id).map(|(_, t)| t)
    }

    fn all(&self) -> Vec<&T> {
        self.items.iter().map(|(_, t)| t).collect()
    }
}`,
      hints: [
        'Store items as Vec<(u32, T)> for id-value pairs.',
        'save assigns the next_id and increments it.',
        'find uses iter().find() to locate by id.'
      ],
      concepts: ['generic-trait', 'repository-pattern', 'auto-increment']
    },
    {
      id: 'rs-capstone-12',
      title: 'Concurrent Word Counter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a function `parallel_word_count` that takes a Vec<String> of text chunks, processes each chunk in a separate thread (counting words per chunk), and returns the total word count. Use std::thread and Arc<Mutex<usize>>.',
      skeleton: `use std::sync::{Arc, Mutex};
use std::thread;

// Write parallel_word_count`,
      solution: `use std::sync::{Arc, Mutex};
use std::thread;

fn parallel_word_count(chunks: Vec<String>) -> usize {
    let total = Arc::new(Mutex::new(0usize));
    let mut handles = vec![];

    for chunk in chunks {
        let total = Arc::clone(&total);
        handles.push(thread::spawn(move || {
            let count = chunk.split_whitespace().count();
            let mut total = total.lock().unwrap();
            *total += count;
        }));
    }

    for handle in handles {
        handle.join().unwrap();
    }

    let result = total.lock().unwrap();
    *result
}`,
      hints: [
        'Arc::clone shares the Mutex across threads.',
        'Each thread counts words in its chunk with split_whitespace().count().',
        'Lock the mutex to add each chunk count to the total.'
      ],
      concepts: ['threads', 'arc', 'mutex', 'concurrent-processing']
    },
    {
      id: 'rs-capstone-13',
      title: 'Fix: Lifetime Mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'The returned reference does not live long enough. Fix the lifetime annotations.',
      skeleton: `struct Config {
    values: Vec<String>,
}

impl Config {
    fn get(&self, index: usize) -> Option<&str> {
        // Bug: returning a reference that should be tied to self's lifetime
        self.values.get(index).map(|s| {
            let trimmed: String = s.trim().to_string();
            trimmed.as_str()
        })
    }
}`,
      solution: `struct Config {
    values: Vec<String>,
}

impl Config {
    fn get(&self, index: usize) -> Option<&str> {
        self.values.get(index).map(|s| s.trim())
    }
}`,
      hints: [
        'The bug creates a temporary String and returns a reference to it.',
        'trim() on a &str returns a &str - no allocation needed.',
        'Remove the intermediate String allocation entirely.'
      ],
      concepts: ['lifetimes', 'temporary-values', 'string-slices']
    },
    {
      id: 'rs-capstone-14',
      title: 'Fix: Move After Borrow',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the ownership error where a value is used after being moved.',
      skeleton: `fn process(data: Vec<String>) -> (usize, Vec<String>) {
    let len = data.len();
    let upper: Vec<String> = data.into_iter().map(|s| s.to_uppercase()).collect();
    // Bug: data was moved by into_iter()
    (data.len(), upper)
}`,
      solution: `fn process(data: Vec<String>) -> (usize, Vec<String>) {
    let len = data.len();
    let upper: Vec<String> = data.into_iter().map(|s| s.to_uppercase()).collect();
    (len, upper)
}`,
      hints: [
        'data.len() must be called before data is consumed by into_iter().',
        'Store the length in a variable before the move.',
        'Use the saved len variable in the return tuple.'
      ],
      concepts: ['ownership', 'move-semantics', 'use-after-move']
    },
    {
      id: 'rs-capstone-15',
      title: 'Fix: Deadlock in Mutex Usage',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'This code deadlocks because the mutex guard is held while trying to lock again. Fix it.',
      skeleton: `use std::sync::Mutex;

struct Counter {
    value: Mutex<i32>,
}

impl Counter {
    fn increment_and_get(&self) -> i32 {
        let mut val = self.value.lock().unwrap();
        *val += 1;
        // Bug: trying to lock again while first lock is still held
        let current = self.value.lock().unwrap();
        *current
    }
}`,
      solution: `use std::sync::Mutex;

struct Counter {
    value: Mutex<i32>,
}

impl Counter {
    fn increment_and_get(&self) -> i32 {
        let mut val = self.value.lock().unwrap();
        *val += 1;
        *val
    }
}`,
      hints: [
        'The first lock guard is still held when trying to lock again.',
        'Just use the existing guard to read the value.',
        'No need to lock a second time - the value is already accessible.'
      ],
      concepts: ['mutex', 'deadlock', 'lock-guard']
    },
    {
      id: 'rs-capstone-16',
      title: 'Predict: Iterator Chain Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let result: Vec<i32> = (1..=6)
        .filter(|x| x % 2 == 0)
        .map(|x| x * x)
        .collect();
    println!("{:?}", result);
}`,
      solution: `[4, 16, 36]`,
      hints: [
        'Filter keeps even numbers: 2, 4, 6.',
        'Map squares each: 4, 16, 36.',
        'collect gathers into a Vec.'
      ],
      concepts: ['iterators', 'filter', 'map', 'collect']
    },
    {
      id: 'rs-capstone-17',
      title: 'Predict: Pattern Match Enum',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value(coin: &Coin) -> u32 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}

fn main() {
    let coins = [Coin::Quarter, Coin::Dime, Coin::Penny];
    let total: u32 = coins.iter().map(value).sum();
    println!("{total}");
}`,
      solution: `36`,
      hints: [
        'Quarter = 25, Dime = 10, Penny = 1.',
        '25 + 10 + 1 = 36.',
        'sum() adds all mapped values.'
      ],
      concepts: ['enum', 'pattern-matching', 'iterator-sum']
    },
    {
      id: 'rs-capstone-18',
      title: 'Predict: Option Chaining',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let names = vec!["Alice", "Bob", "Charlie"];
    let result = names.get(1)
        .map(|s| s.to_uppercase())
        .unwrap_or_else(|| "UNKNOWN".to_string());
    println!("{result}");
}`,
      solution: `BOB`,
      hints: [
        'names.get(1) returns Some("Bob").',
        'map uppercases it to "BOB".',
        'unwrap_or_else extracts the value since it is Some.'
      ],
      concepts: ['option', 'map', 'unwrap-or-else']
    },
    {
      id: 'rs-capstone-19',
      title: 'Refactor: Nested Matches to Combinators',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor these nested match expressions into idiomatic Option/Result combinator chains.',
      skeleton: `fn get_first_even_squared(numbers: &[i32]) -> Option<i32> {
    match numbers.iter().find(|&&x| x % 2 == 0) {
        Some(&n) => {
            let squared = n * n;
            if squared > 100 {
                None
            } else {
                Some(squared)
            }
        }
        None => None,
    }
}`,
      solution: `fn get_first_even_squared(numbers: &[i32]) -> Option<i32> {
    numbers.iter()
        .find(|&&x| x % 2 == 0)
        .map(|&n| n * n)
        .filter(|&sq| sq <= 100)
}`,
      hints: [
        'Use .map() instead of matching on Some/None.',
        'Use .filter() instead of the if/else inside the match.',
        'Chaining combinators is more idiomatic than nested matches.'
      ],
      concepts: ['option-combinators', 'map', 'filter', 'idiomatic-rust']
    },
    {
      id: 'rs-capstone-20',
      title: 'Refactor: Imperative to Functional',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor this imperative loop-based code into a functional style using iterators.',
      skeleton: `use std::collections::HashMap;

fn group_by_length(words: &[&str]) -> HashMap<usize, Vec<String>> {
    let mut groups: HashMap<usize, Vec<String>> = HashMap::new();
    for word in words {
        let len = word.len();
        if !groups.contains_key(&len) {
            groups.insert(len, Vec::new());
        }
        groups.get_mut(&len).unwrap().push(word.to_string());
    }
    groups
}`,
      solution: `use std::collections::HashMap;

fn group_by_length(words: &[&str]) -> HashMap<usize, Vec<String>> {
    words.iter().fold(HashMap::new(), |mut groups, word| {
        groups.entry(word.len()).or_default().push(word.to_string());
        groups
    })
}`,
      hints: [
        'Use fold to accumulate into a HashMap.',
        'entry().or_default() replaces the contains_key/insert pattern.',
        'fold takes an initial value and a closure that accumulates.'
      ],
      concepts: ['fold', 'entry-api', 'functional-style', 'hashmap']
    }
  ]
};
