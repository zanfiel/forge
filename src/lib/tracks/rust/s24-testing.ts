import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-test',
  title: '24. Testing',
  explanation: `## Testing in Rust

Rust has built-in testing support with \`cargo test\`.

### Basic Tests
\`\`\`rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
\`\`\`

### Assertions
\`\`\`rust
assert!(condition);                      // bool check
assert_eq!(left, right);                 // equality
assert_ne!(left, right);                 // inequality
assert!(val > 0, "must be positive: {}", val); // with message
\`\`\`

### Expected Panics
\`\`\`rust
#[test]
#[should_panic]
fn panics() {
    panic!("oh no");
}

#[test]
#[should_panic(expected = "oh no")]
fn panics_with_message() {
    panic!("oh no");
}
\`\`\`

### Result-Based Tests
\`\`\`rust
#[test]
fn it_works() -> Result<(), String> {
    if 2 + 2 == 4 {
        Ok(())
    } else {
        Err(String::from("math is broken"))
    }
}
\`\`\`

### Test Organization
- **Unit tests**: in the same file, under \`#[cfg(test)]\`
- **Integration tests**: in \`tests/\` directory
- **Doc tests**: in \`///\` doc comments

### Running Tests
\`\`\`
cargo test                    # all tests
cargo test test_name          # specific test
cargo test -- --nocapture     # show println output
cargo test -- --ignored       # run ignored tests
\`\`\`
`,
  exercises: [
    {
      id: 'rs-test-1',
      title: 'Basic assert_eq',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a basic test with assert_eq.',
      skeleton: `fn add(a: i32, b: i32) -> i32 { a + b }

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        __BLANK__!(add(2, 3), 5);
    }
}`,
      solution: `fn add(a: i32, b: i32) -> i32 { a + b }

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }
}`,
      hints: [
        'assert_eq! checks that two values are equal.',
        'It panics with a helpful message if they differ.',
        'The answer is assert_eq.',
      ],
      concepts: ['assert_eq', '#[test]', 'unit test'],
    },
    {
      id: 'rs-test-2',
      title: 'should_panic',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Test that a function panics as expected.',
      skeleton: `fn divide(a: i32, b: i32) -> i32 {
    if b == 0 { panic!("division by zero"); }
    a / b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[__BLANK__]
    fn test_divide_by_zero() {
        divide(10, 0);
    }
}`,
      solution: `fn divide(a: i32, b: i32) -> i32 {
    if b == 0 { panic!("division by zero"); }
    a / b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic]
    fn test_divide_by_zero() {
        divide(10, 0);
    }
}`,
      hints: [
        'should_panic expects the test function to panic.',
        'The test passes if the function panics.',
        'The answer is should_panic.',
      ],
      concepts: ['should_panic', 'panic testing', 'test attribute'],
    },
    {
      id: 'rs-test-3',
      title: 'Test with Result',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Return Result from a test function.',
      skeleton: `#[cfg(test)]
mod tests {
    #[test]
    fn test_parse() -> __BLANK__<(), Box<dyn std::error::Error>> {
        let val: i32 = "42".parse()?;
        assert_eq!(val, 42);
        Ok(())
    }
}`,
      solution: `#[cfg(test)]
mod tests {
    #[test]
    fn test_parse() -> Result<(), Box<dyn std::error::Error>> {
        let val: i32 = "42".parse()?;
        assert_eq!(val, 42);
        Ok(())
    }
}`,
      hints: [
        'Tests can return Result for cleaner error handling.',
        'The test fails if Err is returned.',
        'The answer is Result.',
      ],
      concepts: ['Result in tests', '? operator', 'test function'],
    },
    {
      id: 'rs-test-4',
      title: 'assert_ne',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Assert that two values are NOT equal.',
      skeleton: `fn generate_id() -> u32 { 42 }

#[test]
fn test_id_not_zero() {
    __BLANK__!(generate_id(), 0);
}`,
      solution: `fn generate_id() -> u32 { 42 }

#[test]
fn test_id_not_zero() {
    assert_ne!(generate_id(), 0);
}`,
      hints: [
        'assert_ne! verifies two values are different.',
        'It fails if the values are equal.',
        'The answer is assert_ne.',
      ],
      concepts: ['assert_ne', 'inequality check', 'test'],
    },
    {
      id: 'rs-test-5',
      title: 'ignore Attribute',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Mark a slow test as ignored by default.',
      skeleton: `#[test]
#[__BLANK__]
fn expensive_test() {
    // This test takes a long time
    std::thread::sleep(std::time::Duration::from_secs(10));
    assert!(true);
}`,
      solution: `#[test]
#[ignore]
fn expensive_test() {
    std::thread::sleep(std::time::Duration::from_secs(10));
    assert!(true);
}`,
      hints: [
        'Ignored tests are skipped by default.',
        'Run them with: cargo test -- --ignored.',
        'The answer is ignore.',
      ],
      concepts: ['ignore', 'slow tests', 'test filtering'],
    },
    {
      id: 'rs-test-6',
      title: 'Custom Panic Message',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Add a custom message to an assertion.',
      skeleton: `fn is_positive(n: i32) -> bool { n > 0 }

#[test]
fn test_positive() {
    let val = 5;
    assert!(is_positive(val), "Expected {} to be __BLANK__", val);
}`,
      solution: `fn is_positive(n: i32) -> bool { n > 0 }

#[test]
fn test_positive() {
    let val = 5;
    assert!(is_positive(val), "Expected {} to be positive", val);
}`,
      hints: [
        'assert! can take a format string after the condition.',
        'The message is shown when the assertion fails.',
        'The answer is positive.',
      ],
      concepts: ['assert message', 'custom error', 'debugging tests'],
    },
    {
      id: 'rs-test-7',
      title: 'Test Module Setup',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a complete test module for a function.',
      skeleton: `fn factorial(n: u64) -> u64 {
    match n {
        0 | 1 => 1,
        _ => n * factorial(n - 1),
    }
}

// Write a test module with at least 3 tests:
// - test_factorial_zero
// - test_factorial_one
// - test_factorial_five`,
      solution: `fn factorial(n: u64) -> u64 {
    match n {
        0 | 1 => 1,
        _ => n * factorial(n - 1),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_factorial_zero() {
        assert_eq!(factorial(0), 1);
    }

    #[test]
    fn test_factorial_one() {
        assert_eq!(factorial(1), 1);
    }

    #[test]
    fn test_factorial_five() {
        assert_eq!(factorial(5), 120);
    }
}`,
      hints: [
        'Use #[cfg(test)] on the module to exclude from production builds.',
        'use super::* imports everything from the parent module.',
        'Each test function gets #[test] attribute.',
      ],
      concepts: ['#[cfg(test)]', 'test module', 'use super'],
    },
    {
      id: 'rs-test-8',
      title: 'Test with Setup',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create test helper functions for common setup.',
      skeleton: `#[derive(Debug, PartialEq)]
struct User {
    name: String,
    age: u32,
    active: bool,
}

impl User {
    fn new(name: &str, age: u32) -> Self {
        User { name: name.to_string(), age, active: true }
    }
    fn deactivate(&mut self) { self.active = false; }
    fn is_adult(&self) -> bool { self.age >= 18 }
}

// Write tests with a helper function that creates test users`,
      solution: `#[derive(Debug, PartialEq)]
struct User {
    name: String,
    age: u32,
    active: bool,
}

impl User {
    fn new(name: &str, age: u32) -> Self {
        User { name: name.to_string(), age, active: true }
    }
    fn deactivate(&mut self) { self.active = false; }
    fn is_adult(&self) -> bool { self.age >= 18 }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn make_user(name: &str, age: u32) -> User {
        User::new(name, age)
    }

    #[test]
    fn test_new_user_is_active() {
        let user = make_user("Alice", 25);
        assert!(user.active);
    }

    #[test]
    fn test_deactivate() {
        let mut user = make_user("Bob", 30);
        user.deactivate();
        assert!(!user.active);
    }

    #[test]
    fn test_is_adult() {
        assert!(make_user("Adult", 18).is_adult());
        assert!(!make_user("Child", 17).is_adult());
    }
}`,
      hints: [
        'Helper functions in the test module avoid code duplication.',
        'They do not need the #[test] attribute.',
        'Call the helper in each test to create consistent test data.',
      ],
      concepts: ['test helpers', 'setup', 'test organization'],
    },
    {
      id: 'rs-test-9',
      title: 'Parameterized-style Tests',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Test multiple cases using a loop within a test.',
      skeleton: `fn is_even(n: i32) -> bool { n % 2 == 0 }

// Write a single test that checks multiple cases:
// (0, true), (1, false), (2, true), (-1, false), (100, true)`,
      solution: `fn is_even(n: i32) -> bool { n % 2 == 0 }

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_even_cases() {
        let cases = vec![
            (0, true),
            (1, false),
            (2, true),
            (-1, false),
            (100, true),
        ];
        for (input, expected) in cases {
            assert_eq!(
                is_even(input),
                expected,
                "is_even({}) should be {}",
                input,
                expected,
            );
        }
    }
}`,
      hints: [
        'Store test cases as a vector of (input, expected) tuples.',
        'Loop through and assert each case.',
        'Include the input in the error message for debugging.',
      ],
      concepts: ['parameterized testing', 'test cases', 'loop testing'],
    },
    {
      id: 'rs-test-10',
      title: 'should_panic with Expected',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Test that a panic contains a specific message.',
      skeleton: `fn connect(url: &str) -> Result<(), String> {
    if url.is_empty() {
        panic!("Connection URL cannot be empty");
    }
    if !url.starts_with("http") {
        panic!("Invalid protocol in URL: {}", url);
    }
    Ok(())
}

// Write two tests:
// 1. Test empty URL panic with expected message
// 2. Test invalid protocol panic with expected message`,
      solution: `fn connect(url: &str) -> Result<(), String> {
    if url.is_empty() {
        panic!("Connection URL cannot be empty");
    }
    if !url.starts_with("http") {
        panic!("Invalid protocol in URL: {}", url);
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic(expected = "cannot be empty")]
    fn test_empty_url() {
        connect("");
    }

    #[test]
    #[should_panic(expected = "Invalid protocol")]
    fn test_invalid_protocol() {
        connect("ftp://example.com");
    }
}`,
      hints: [
        'should_panic(expected = "...") checks the panic message contains the string.',
        'You do not need to match the entire panic message.',
        'This is more precise than bare should_panic.',
      ],
      concepts: ['should_panic', 'expected', 'panic message'],
    },
    {
      id: 'rs-test-11',
      title: 'Integration Test Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write an integration test that tests the public API.',
      skeleton: `// lib.rs
pub struct Calculator {
    history: Vec<f64>,
}

impl Calculator {
    pub fn new() -> Self { Calculator { history: Vec::new() } }
    pub fn add(&mut self, a: f64, b: f64) -> f64 {
        let result = a + b;
        self.history.push(result);
        result
    }
    pub fn last_result(&self) -> Option<f64> {
        self.history.last().copied()
    }
}

// Write integration-style tests that use only the public API`,
      solution: `pub struct Calculator {
    history: Vec<f64>,
}

impl Calculator {
    pub fn new() -> Self { Calculator { history: Vec::new() } }
    pub fn add(&mut self, a: f64, b: f64) -> f64 {
        let result = a + b;
        self.history.push(result);
        result
    }
    pub fn last_result(&self) -> Option<f64> {
        self.history.last().copied()
    }
}

#[cfg(test)]
mod tests {
    use super::Calculator;

    #[test]
    fn test_new_calculator_no_history() {
        let calc = Calculator::new();
        assert_eq!(calc.last_result(), None);
    }

    #[test]
    fn test_add_returns_sum() {
        let mut calc = Calculator::new();
        assert_eq!(calc.add(2.0, 3.0), 5.0);
    }

    #[test]
    fn test_last_result_tracks_history() {
        let mut calc = Calculator::new();
        calc.add(1.0, 2.0);
        calc.add(3.0, 4.0);
        assert_eq!(calc.last_result(), Some(7.0));
    }

    #[test]
    fn test_multiple_operations() {
        let mut calc = Calculator::new();
        let r1 = calc.add(10.0, 20.0);
        let r2 = calc.add(r1, 5.0);
        assert_eq!(r2, 35.0);
        assert_eq!(calc.last_result(), Some(35.0));
    }
}`,
      hints: [
        'Integration tests only use the public API (pub methods).',
        'They do not access private fields directly.',
        'Test behavior, not implementation details.',
      ],
      concepts: ['integration testing', 'public API', 'black box testing'],
    },
    {
      id: 'rs-test-12',
      title: 'Test with Temp Data',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a test that uses temporary data and cleans up.',
      skeleton: `use std::collections::HashMap;

struct Database {
    data: HashMap<String, String>,
}

impl Database {
    fn new() -> Self { Database { data: HashMap::new() } }
    fn insert(&mut self, key: &str, val: &str) { self.data.insert(key.into(), val.into()); }
    fn get(&self, key: &str) -> Option<&String> { self.data.get(key) }
    fn delete(&mut self, key: &str) -> bool { self.data.remove(key).is_some() }
    fn count(&self) -> usize { self.data.len() }
}

// Write comprehensive tests for the Database struct`,
      solution: `use std::collections::HashMap;

struct Database {
    data: HashMap<String, String>,
}

impl Database {
    fn new() -> Self { Database { data: HashMap::new() } }
    fn insert(&mut self, key: &str, val: &str) { self.data.insert(key.into(), val.into()); }
    fn get(&self, key: &str) -> Option<&String> { self.data.get(key) }
    fn delete(&mut self, key: &str) -> bool { self.data.remove(key).is_some() }
    fn count(&self) -> usize { self.data.len() }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn setup() -> Database {
        let mut db = Database::new();
        db.insert("key1", "value1");
        db.insert("key2", "value2");
        db
    }

    #[test]
    fn test_new_is_empty() {
        let db = Database::new();
        assert_eq!(db.count(), 0);
    }

    #[test]
    fn test_insert_and_get() {
        let db = setup();
        assert_eq!(db.get("key1").map(|s| s.as_str()), Some("value1"));
    }

    #[test]
    fn test_get_missing_key() {
        let db = setup();
        assert_eq!(db.get("missing"), None);
    }

    #[test]
    fn test_delete_existing() {
        let mut db = setup();
        assert!(db.delete("key1"));
        assert_eq!(db.count(), 1);
        assert_eq!(db.get("key1"), None);
    }

    #[test]
    fn test_delete_missing() {
        let mut db = setup();
        assert!(!db.delete("missing"));
        assert_eq!(db.count(), 2);
    }
}`,
      hints: [
        'Use a setup() helper to create consistent test state.',
        'Test both success and failure paths.',
        'Each test creates its own Database instance -- no shared state.',
      ],
      concepts: ['test setup', 'cleanup', 'isolated tests'],
    },
    {
      id: 'rs-test-13',
      title: 'Missing test Attribute',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix a test that is not being run.',
      skeleton: `fn double(x: i32) -> i32 { x * 2 }

#[cfg(test)]
mod tests {
    use super::*;

    fn test_double() { // missing attribute!
        assert_eq!(double(5), 10);
    }
}`,
      solution: `fn double(x: i32) -> i32 { x * 2 }

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_double() {
        assert_eq!(double(5), 10);
    }
}`,
      hints: [
        'Test functions need the #[test] attribute.',
        'Without it, the function exists but is never run by cargo test.',
        'Add #[test] above the function.',
      ],
      concepts: ['#[test]', 'test attribute', 'test discovery'],
    },
    {
      id: 'rs-test-14',
      title: 'Wrong Assertion Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a test where assert_eq arguments are swapped.',
      skeleton: `fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[test]
fn test_greet() {
    // Convention: assert_eq!(actual, expected)
    // But the order is wrong here, causing confusing error messages
    assert_eq!("Hello, World!", greet("World"));
    // When it fails, "expected" and "actual" labels are swapped
}`,
      solution: `fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[test]
fn test_greet() {
    assert_eq!(greet("World"), "Hello, World!");
}`,
      hints: [
        'Convention: assert_eq!(actual, expected).',
        'Left side is the value being tested, right side is expected.',
        'Swap the arguments for clearer error messages.',
      ],
      concepts: ['assert_eq convention', 'error messages', 'testing'],
    },
    {
      id: 'rs-test-15',
      title: 'Test Leaking State',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix tests that share state through a static variable.',
      skeleton: `static mut COUNTER: i32 = 0;

fn increment() -> i32 {
    unsafe {
        COUNTER += 1;
        COUNTER
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_first_increment() {
        let val = increment();
        assert_eq!(val, 1); // may fail if other test runs first!
    }

    #[test]
    fn test_second_increment() {
        let val = increment();
        assert_eq!(val, 1); // may fail due to shared state!
    }
}`,
      solution: `use std::sync::atomic::{AtomicI32, Ordering};

struct Counter {
    value: AtomicI32,
}

impl Counter {
    fn new() -> Self {
        Counter { value: AtomicI32::new(0) }
    }

    fn increment(&self) -> i32 {
        self.value.fetch_add(1, Ordering::SeqCst) + 1
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_first_increment() {
        let counter = Counter::new();
        assert_eq!(counter.increment(), 1);
    }

    #[test]
    fn test_second_increment() {
        let counter = Counter::new();
        assert_eq!(counter.increment(), 1);
        assert_eq!(counter.increment(), 2);
    }
}`,
      hints: [
        'Static mutable state causes test order dependency.',
        'Each test should create its own instance.',
        'Use a struct with AtomicI32 instead of static mut.',
      ],
      concepts: ['test isolation', 'shared state', 'static mut'],
    },
    {
      id: 'rs-test-16',
      title: 'Predict Test Outcome',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict whether each test passes or fails.',
      skeleton: `fn abs(x: i32) -> i32 { if x < 0 { -x } else { x } }

// Which tests pass?
// A: assert_eq!(abs(-5), 5)
// B: assert_eq!(abs(0), 0)
// C: assert_ne!(abs(3), 3)
// D: assert!(abs(-1) > 0)`,
      solution: `A: pass
B: pass
C: fail (abs(3) == 3, but assert_ne expects them to differ)
D: pass`,
      hints: [
        'abs(-5) = 5, matches expected 5. Pass.',
        'abs(0) = 0, matches. Pass.',
        'abs(3) = 3, but assert_ne expects different values. Fail.',
      ],
      concepts: ['assert_eq', 'assert_ne', 'assert', 'test outcomes'],
    },
    {
      id: 'rs-test-17',
      title: 'Predict should_panic',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict which should_panic tests pass.',
      skeleton: `fn divide(a: i32, b: i32) -> i32 {
    if b == 0 { panic!("cannot divide by zero"); }
    a / b
}

// A: #[should_panic] fn t1() { divide(10, 0); }
// B: #[should_panic] fn t2() { divide(10, 2); }
// C: #[should_panic(expected = "zero")] fn t3() { divide(10, 0); }
// D: #[should_panic(expected = "overflow")] fn t4() { divide(10, 0); }`,
      solution: `A: pass (panics as expected)
B: fail (does not panic)
C: pass (panic message contains "zero")
D: fail (panic message does not contain "overflow")`,
      hints: [
        'A: divide(10,0) panics, test expects panic. Pass.',
        'B: divide(10,2) = 5, no panic, but test expects panic. Fail.',
        'D: panic message is "cannot divide by zero", does not contain "overflow". Fail.',
      ],
      concepts: ['should_panic', 'expected message', 'test pass/fail'],
    },
    {
      id: 'rs-test-18',
      title: 'Predict Test Module Scope',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict what the test module can access.',
      skeleton: `struct Foo {
    pub public_val: i32,
    private_val: i32,
}

impl Foo {
    fn new() -> Self { Foo { public_val: 1, private_val: 2 } }
    fn secret(&self) -> i32 { self.private_val }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn can_access() {
        let f = Foo::new();
        // Can we access: public_val? private_val? secret()?
        println!("{} {} {}", f.public_val, f.private_val, f.secret());
    }
}`,
      solution: `All three are accessible: 1 2 2
Tests in the same crate can access private items via use super::*`,
      hints: [
        'Tests within the same crate can access private items.',
        'use super::* brings all items including private ones.',
        'This is different from integration tests in tests/ directory.',
      ],
      concepts: ['test module access', 'privacy', 'use super'],
    },
    {
      id: 'rs-test-19',
      title: 'Refactor Repeated Tests',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor duplicate test code into a helper.',
      skeleton: `fn validate_email(email: &str) -> bool {
    email.contains('@') && email.contains('.')
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_valid_1() {
        let email = "user@example.com";
        let result = validate_email(email);
        assert!(result, "{} should be valid", email);
    }

    #[test]
    fn test_valid_2() {
        let email = "test@test.org";
        let result = validate_email(email);
        assert!(result, "{} should be valid", email);
    }

    #[test]
    fn test_invalid_1() {
        let email = "invalid";
        let result = validate_email(email);
        assert!(!result, "{} should be invalid", email);
    }

    #[test]
    fn test_invalid_2() {
        let email = "no-at-sign.com";
        let result = validate_email(email);
        assert!(!result, "{} should be invalid", email);
    }
}`,
      solution: `fn validate_email(email: &str) -> bool {
    email.contains('@') && email.contains('.')
}

#[cfg(test)]
mod tests {
    use super::*;

    fn assert_valid(email: &str) {
        assert!(validate_email(email), "{} should be valid", email);
    }

    fn assert_invalid(email: &str) {
        assert!(!validate_email(email), "{} should be invalid", email);
    }

    #[test]
    fn test_valid_emails() {
        assert_valid("user@example.com");
        assert_valid("test@test.org");
    }

    #[test]
    fn test_invalid_emails() {
        assert_invalid("invalid");
        assert_invalid("no-at-sign.com");
    }
}`,
      hints: [
        'Extract common assertion logic into helper functions.',
        'Group related tests into fewer test functions.',
        'Include the input in error messages for debugging.',
      ],
      concepts: ['test helpers', 'DRY tests', 'refactoring'],
    },
    {
      id: 'rs-test-20',
      title: 'Refactor to Property Test',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor specific test cases into property-based assertions.',
      skeleton: `fn sort_vec(mut v: Vec<i32>) -> Vec<i32> {
    v.sort();
    v
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sort_1() { assert_eq!(sort_vec(vec![3, 1, 2]), vec![1, 2, 3]); }
    #[test]
    fn test_sort_2() { assert_eq!(sort_vec(vec![5, 4, 3, 2, 1]), vec![1, 2, 3, 4, 5]); }
    #[test]
    fn test_sort_3() { assert_eq!(sort_vec(vec![1]), vec![1]); }
    #[test]
    fn test_sort_4() { assert_eq!(sort_vec(vec![]), vec![]); }
}`,
      solution: `fn sort_vec(mut v: Vec<i32>) -> Vec<i32> {
    v.sort();
    v
}

#[cfg(test)]
mod tests {
    use super::*;

    fn is_sorted(v: &[i32]) -> bool {
        v.windows(2).all(|w| w[0] <= w[1])
    }

    #[test]
    fn test_sort_preserves_length() {
        let inputs = vec![vec![3, 1, 2], vec![5, 4, 3, 2, 1], vec![1], vec![]];
        for input in inputs {
            let len = input.len();
            let sorted = sort_vec(input);
            assert_eq!(sorted.len(), len, "Sort should preserve length");
        }
    }

    #[test]
    fn test_sort_produces_sorted_output() {
        let inputs = vec![vec![3, 1, 2], vec![5, 4, 3, 2, 1], vec![1], vec![]];
        for input in inputs {
            let sorted = sort_vec(input);
            assert!(is_sorted(&sorted), "{:?} is not sorted", sorted);
        }
    }

    #[test]
    fn test_sort_preserves_elements() {
        let input = vec![3, 1, 2, 1, 3];
        let mut expected = input.clone();
        expected.sort();
        assert_eq!(sort_vec(input), expected);
    }
}`,
      hints: [
        'Test properties: output is sorted, same length, same elements.',
        'Properties hold for any input, not just specific examples.',
        'Create a helper function to check the sorted property.',
      ],
      concepts: ['property testing', 'invariants', 'test design'],
    },
  ],
};
