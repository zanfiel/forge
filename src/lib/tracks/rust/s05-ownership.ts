import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-ownership',
  title: '5. Ownership',
  explanation: `## Ownership

Rust's ownership system is its most unique feature. It enables memory safety without a garbage collector.

### Three Rules
1. Each value has exactly one **owner**
2. When the owner goes out of scope, the value is **dropped**
3. There can only be one owner at a time

### Move Semantics
Assigning a heap-allocated value to another variable **moves** ownership:
\`\`\`rust
let s1 = String::from("hello");
let s2 = s1; // s1 is moved, can no longer be used
\`\`\`

### Copy Trait
Simple types that live entirely on the stack implement \`Copy\`:
\`\`\`rust
let x = 5;
let y = x; // x is copied, both are valid
\`\`\`

### Clone Trait
Explicitly deep-copy heap data:
\`\`\`rust
let s1 = String::from("hello");
let s2 = s1.clone(); // both are valid
\`\`\`

### Stack vs Heap
- Stack: fixed-size data (integers, bools, tuples of Copy types)
- Heap: dynamic-size data (String, Vec, Box)

### Ownership Transfer in Functions
Passing a value to a function moves ownership (unless the type is Copy):
\`\`\`rust
fn take(s: String) { /* s is owned here */ }
let s = String::from("hi");
take(s); // s is moved into the function
\`\`\`
`,
  exercises: [
    {
      id: 'rs-own-1',
      title: 'Move Semantics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Clone the String so both variables are valid.',
      skeleton: `let s1 = String::from("hello");
let s2 = s1.__BLANK__();
println!("{} {}", s1, s2);`,
      solution: `let s1 = String::from("hello");
let s2 = s1.clone();
println!("{} {}", s1, s2);`,
      hints: [
        'After `let s2 = s1;` the original s1 would be moved.',
        'You need to create a deep copy.',
        'Use `.clone()` to explicitly duplicate the String.',
      ],
      concepts: ['clone', 'move semantics', 'String'],
    },
    {
      id: 'rs-own-2',
      title: 'Ownership Transfer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Return ownership from the function so the caller can use the String.',
      skeleton: `fn create_greeting() -> __BLANK__ {
    String::from("Hello, world!")
}

fn main() {
    let msg = create_greeting();
    println!("{}", msg);
}`,
      solution: `fn create_greeting() -> String {
    String::from("Hello, world!")
}

fn main() {
    let msg = create_greeting();
    println!("{}", msg);
}`,
      hints: [
        'The function creates a String and needs to give ownership to the caller.',
        'The return type must be the owned String type.',
        'Use `String` as the return type.',
      ],
      concepts: ['ownership transfer', 'return ownership', 'String'],
    },
    {
      id: 'rs-own-3',
      title: 'String from &str',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create an owned String from a string literal.',
      skeleton: `let owned: String = __BLANK__("Rust");
println!("{}", owned);`,
      solution: `let owned: String = String::from("Rust");
println!("{}", owned);`,
      hints: [
        'String literals are &str, but you need an owned String.',
        'There is an associated function on String that converts.',
        'Use `String::from("Rust")`.',
      ],
      concepts: ['String::from', '&str to String', 'ownership'],
    },
    {
      id: 'rs-own-4',
      title: 'Copy vs Move',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'This works because i32 implements Copy. Fill in what trait makes this possible.',
      skeleton: `// i32 implements the __BLANK__ trait, so x is still valid after assignment
let x: i32 = 42;
let y = x;
println!("{} {}", x, y);`,
      solution: `// i32 implements the Copy trait, so x is still valid after assignment
let x: i32 = 42;
let y = x;
println!("{} {}", x, y);`,
      hints: [
        'Some types are duplicated automatically on assignment.',
        'This trait makes stack-only types cheap to copy.',
        'The trait is `Copy`.',
      ],
      concepts: ['Copy trait', 'stack types', 'implicit copy'],
    },
    {
      id: 'rs-own-5',
      title: 'Drop Scope',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fill in what happens to `inner` at the end of the block.',
      skeleton: `fn main() {
    let outer = String::from("outer");
    {
        let inner = String::from("inner");
        println!("{}", inner);
    } // inner is __BLANK__ here
    println!("{}", outer);
}`,
      solution: `fn main() {
    let outer = String::from("outer");
    {
        let inner = String::from("inner");
        println!("{}", inner);
    } // inner is dropped here
    println!("{}", outer);
}`,
      hints: [
        'When a variable goes out of scope, Rust automatically cleans it up.',
        'The memory is freed and the value is destroyed.',
        'The value is `dropped`.',
      ],
      concepts: ['drop', 'scope', 'automatic cleanup'],
    },
    {
      id: 'rs-own-6',
      title: 'Ownership in Function Params',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the function signature to take ownership of the String.',
      skeleton: `fn consume(s: __BLANK__) {
    println!("Consumed: {}", s);
}

fn main() {
    let name = String::from("Alice");
    consume(name);
    // name is no longer valid here
}`,
      solution: `fn consume(s: String) {
    println!("Consumed: {}", s);
}

fn main() {
    let name = String::from("Alice");
    consume(name);
    // name is no longer valid here
}`,
      hints: [
        'The function takes ownership (moves the value in).',
        'The parameter type must be the owned type.',
        'Use `String` (not &String or &str).',
      ],
      concepts: ['ownership transfer', 'move into function', 'String'],
    },
    {
      id: 'rs-own-7',
      title: 'Give and Take Back',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write `append_exclaim` that takes a String, appends "!" to it, and returns it back.',
      skeleton: `// Write your function here`,
      solution: `fn append_exclaim(mut s: String) -> String {
    s.push('!');
    s
}`,
      hints: [
        'Take ownership of the String by value.',
        'Use .push() to append a character.',
        'Return the modified String to give ownership back.',
      ],
      concepts: ['ownership', 'mut parameter', 'push', 'return ownership'],
    },
    {
      id: 'rs-own-8',
      title: 'First Word Length',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `first_word_len` that takes a &String and returns the length of the first word (space-delimited).',
      skeleton: `// Write your function here`,
      solution: `fn first_word_len(s: &String) -> usize {
    match s.find(' ') {
        Some(idx) => idx,
        None => s.len(),
    }
}`,
      hints: [
        'Borrow the String with & to avoid taking ownership.',
        'Find the first space to determine where the first word ends.',
        'If no space, the whole string is one word.',
      ],
      concepts: ['borrowing', '&String', 'find', 'Option'],
    },
    {
      id: 'rs-own-9',
      title: 'Move Vector Elements',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `drain_to_new` that takes a Vec<String> by value and returns a new Vec<String> with all elements reversed.',
      skeleton: `// Write your function here`,
      solution: `fn drain_to_new(v: Vec<String>) -> Vec<String> {
    v.into_iter().rev().collect()
}`,
      hints: [
        'Take ownership of the Vec.',
        'Use .into_iter() to consume the Vec into an iterator.',
        'Use .rev().collect() to reverse and collect.',
      ],
      concepts: ['into_iter', 'ownership', 'Vec', 'collect'],
    },
    {
      id: 'rs-own-10',
      title: 'Longest of Two Owned',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `keep_longest` that takes two String values and returns the longer one (first if equal).',
      skeleton: `// Write your function here`,
      solution: `fn keep_longest(a: String, b: String) -> String {
    if a.len() >= b.len() { a } else { b }
}`,
      hints: [
        'Both Strings are moved into the function.',
        'Compare their lengths.',
        'Return the longer one; the other is dropped.',
      ],
      concepts: ['ownership', 'move semantics', 'drop'],
    },
    {
      id: 'rs-own-11',
      title: 'Clone vs Move Benchmark',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `transfer_and_extend` that takes a Vec<i32> by value, appends 0 to it, and returns the new Vec.',
      skeleton: `// Write your function here`,
      solution: `fn transfer_and_extend(mut v: Vec<i32>) -> Vec<i32> {
    v.push(0);
    v
}`,
      hints: [
        'Take ownership with a by-value parameter.',
        'Mark the parameter as `mut` to modify it.',
        'Push the value and return the Vec.',
      ],
      concepts: ['move semantics', 'Vec', 'mut parameter'],
    },
    {
      id: 'rs-own-12',
      title: 'Tuple Ownership',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `split_pair` that takes a (String, String) tuple and returns the two Strings in opposite order.',
      skeleton: `// Write your function here`,
      solution: `fn split_pair(pair: (String, String)) -> (String, String) {
    (pair.1, pair.0)
}`,
      hints: [
        'Destructure the tuple or access with .0 and .1.',
        'Return a new tuple with the elements swapped.',
        'The Strings are moved, not copied.',
      ],
      concepts: ['tuple', 'ownership', 'destructuring'],
    },
    {
      id: 'rs-own-13',
      title: 'Fix: Use After Move',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This code uses a String after it has been moved. Fix it.',
      skeleton: `fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
    println!("{}", s1);
}`,
      solution: `fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();
    println!("{}", s1);
}`,
      hints: [
        's1 is moved to s2, so s1 is no longer valid.',
        'You need to keep s1 valid while also creating s2.',
        'Use .clone() to make a deep copy.',
      ],
      concepts: ['move', 'clone', 'use after move'],
    },
    {
      id: 'rs-own-14',
      title: 'Fix: Double Move',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'This code passes a String to two functions, but the second call fails because ownership was already moved. Fix it.',
      skeleton: `fn print_len(s: String) {
    println!("Length: {}", s.len());
}

fn main() {
    let msg = String::from("hello");
    print_len(msg);
    print_len(msg);
}`,
      solution: `fn print_len(s: &String) {
    println!("Length: {}", s.len());
}

fn main() {
    let msg = String::from("hello");
    print_len(&msg);
    print_len(&msg);
}`,
      hints: [
        'The first call moves msg, so the second call fails.',
        'Change the function to borrow instead of taking ownership.',
        'Use `&String` parameter and pass `&msg`.',
      ],
      concepts: ['borrowing', 'move', 'reference'],
    },
    {
      id: 'rs-own-15',
      title: 'Fix: Moving Out of Vec',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'This code tries to move a String out of a Vec by indexing. Fix it.',
      skeleton: `fn main() {
    let names = vec![String::from("Alice"), String::from("Bob")];
    let first = names[0];
    println!("{}", first);
}`,
      solution: `fn main() {
    let names = vec![String::from("Alice"), String::from("Bob")];
    let first = &names[0];
    println!("{}", first);
}`,
      hints: [
        'You cannot move out of a Vec by indexing.',
        'The Vec still needs to own its elements.',
        'Borrow instead: `let first = &names[0];`.',
      ],
      concepts: ['borrowing', 'Vec indexing', 'cannot move out'],
    },
    {
      id: 'rs-own-16',
      title: 'Predict: Move and Drop',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn take_string(s: String) {
    println!("Got: {}", s);
}

fn main() {
    let s = String::from("hello");
    take_string(s);
    println!("Done");
}`,
      solution: `Got: hello
Done`,
      hints: [
        's is moved into take_string.',
        'take_string prints "Got: hello".',
        'After the function returns, s is dropped, and "Done" is printed.',
      ],
      concepts: ['move', 'function ownership', 'drop'],
    },
    {
      id: 'rs-own-17',
      title: 'Predict: Copy Types',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let a = 10;
    let b = a;
    let c = a + b;
    println!("{}", c);
}`,
      solution: `20`,
      hints: [
        'i32 implements Copy, so a is not moved.',
        'b gets a copy of a (10).',
        'c = 10 + 10 = 20.',
      ],
      concepts: ['Copy trait', 'i32', 'no move'],
    },
    {
      id: 'rs-own-18',
      title: 'Predict: Scope Drop Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print? (Assume a custom type that prints on drop.)',
      skeleton: `struct Noisy(i32);
impl Drop for Noisy {
    fn drop(&mut self) {
        println!("Dropping {}", self.0);
    }
}

fn main() {
    let _a = Noisy(1);
    let _b = Noisy(2);
    let _c = Noisy(3);
    println!("End of main");
}`,
      solution: `End of main
Dropping 3
Dropping 2
Dropping 1`,
      hints: [
        'Variables are dropped in reverse order of declaration.',
        '"End of main" prints first, before any drops.',
        'Then _c(3), _b(2), _a(1) are dropped in reverse order.',
      ],
      concepts: ['drop order', 'LIFO', 'scope'],
    },
    {
      id: 'rs-own-19',
      title: 'Refactor: Avoid Unnecessary Clone',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'This code clones a String unnecessarily. Refactor to use borrowing instead.',
      skeleton: `fn print_upper(s: String) {
    println!("{}", s.to_uppercase());
}

fn main() {
    let name = String::from("rust");
    print_upper(name.clone());
    println!("Original: {}", name);
}`,
      solution: `fn print_upper(s: &str) {
    println!("{}", s.to_uppercase());
}

fn main() {
    let name = String::from("rust");
    print_upper(&name);
    println!("Original: {}", name);
}`,
      hints: [
        'The function only reads the string, it does not need ownership.',
        'Change the parameter to a borrow: &str.',
        'Pass &name instead of name.clone().',
      ],
      concepts: ['borrowing vs cloning', '&str', 'performance'],
    },
    {
      id: 'rs-own-20',
      title: 'Refactor: Return Ownership Pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'This code uses the awkward "take and return" pattern. Refactor to use a mutable reference instead.',
      skeleton: `fn add_suffix(s: String) -> String {
    let mut result = s;
    result.push_str("_v2");
    result
}

fn main() {
    let mut name = String::from("project");
    name = add_suffix(name);
    println!("{}", name);
}`,
      solution: `fn add_suffix(s: &mut String) {
    s.push_str("_v2");
}

fn main() {
    let mut name = String::from("project");
    add_suffix(&mut name);
    println!("{}", name);
}`,
      hints: [
        'Taking and returning ownership is verbose when you just need to mutate.',
        'Use a mutable reference &mut String instead.',
        'The function does not need to return anything.',
      ],
      concepts: ['mutable reference', 'refactoring', 'borrow instead of move'],
    },
  ],
};
