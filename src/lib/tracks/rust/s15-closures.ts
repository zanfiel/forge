import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-closures',
  title: '15. Closures',
  explanation: `## Closures

Closures are anonymous functions that capture their environment.

### Syntax
\`\`\`rust
let add = |a, b| a + b;
let greet = |name: &str| -> String { format!("Hi, {}", name) };
\`\`\`

### Capture Modes
- **Fn** -- borrows immutably (can be called multiple times)
- **FnMut** -- borrows mutably (can be called multiple times)
- **FnOnce** -- takes ownership (can only be called once)

### move Closures
Force the closure to take ownership of captured variables:
\`\`\`rust
let name = String::from("Alice");
let greet = move || println!("Hi, {}", name);
// name is moved into the closure
\`\`\`

### Closures as Parameters
\`\`\`rust
fn apply<F: Fn(i32) -> i32>(f: F, val: i32) -> i32 { f(val) }
\`\`\`

### Returning Closures
\`\`\`rust
fn make_adder(x: i32) -> impl Fn(i32) -> i32 {
    move |y| x + y
}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-clos-1',
      title: 'Basic Closure',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a closure that doubles its input.',
      skeleton: `let double = __BLANK__;
println!("{}", double(5)); // 10`,
      solution: `let double = |x| x * 2;
println!("{}", double(5)); // 10`,
      hints: [
        'Closures use |params| body syntax.',
        'Type annotation is optional when inferable.',
        'Use `|x| x * 2`.',
      ],
      concepts: ['closure syntax', '|params| body'],
    },
    {
      id: 'rs-clos-2',
      title: 'Closure Capturing',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This closure captures a variable from its environment.',
      skeleton: `let offset = 10;
let add_offset = |x| x + __BLANK__;
println!("{}", add_offset(5)); // 15`,
      solution: `let offset = 10;
let add_offset = |x| x + offset;
println!("{}", add_offset(5)); // 15`,
      hints: [
        'Closures can access variables from the enclosing scope.',
        'The closure captures offset by reference.',
        'Use `offset` directly inside the closure.',
      ],
      concepts: ['capture', 'environment', 'closure'],
    },
    {
      id: 'rs-clos-3',
      title: 'Move Closure',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Force the closure to take ownership with the move keyword.',
      skeleton: `let name = String::from("Rust");
let greet = __BLANK__ || println!("Hello, {}", name);
greet();
// name is no longer valid here`,
      solution: `let name = String::from("Rust");
let greet = move || println!("Hello, {}", name);
greet();
// name is no longer valid here`,
      hints: [
        'By default, closures borrow. You need to force ownership.',
        'A keyword before the closure syntax forces a move.',
        'Use `move`.',
      ],
      concepts: ['move closure', 'ownership transfer', 'capture by value'],
    },
    {
      id: 'rs-clos-4',
      title: 'Fn Trait Bound',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Accept any closure that takes i32 and returns i32.',
      skeleton: `fn apply<F: __BLANK__>(f: F, val: i32) -> i32 {
    f(val)
}`,
      solution: `fn apply<F: Fn(i32) -> i32>(f: F, val: i32) -> i32 {
    f(val)
}`,
      hints: [
        'The closure trait for immutable calling is Fn.',
        'Specify the parameter and return types.',
        'Use `Fn(i32) -> i32`.',
      ],
      concepts: ['Fn trait', 'closure as parameter', 'trait bound'],
    },
    {
      id: 'rs-clos-5',
      title: 'FnMut Closure',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'This closure mutates a captured variable. What trait does it implement?',
      skeleton: `let mut count = 0;
let mut increment = || {
    count += 1; // mutates count
};
increment();
// The closure implements __BLANK__`,
      solution: `let mut count = 0;
let mut increment = || {
    count += 1; // mutates count
};
increment();
// The closure implements FnMut`,
      hints: [
        'Closures that mutate captured variables implement a specific trait.',
        'It is not Fn (immutable) or FnOnce (consumes).',
        'The trait is `FnMut`.',
      ],
      concepts: ['FnMut', 'mutable capture', 'closure traits'],
    },
    {
      id: 'rs-clos-6',
      title: 'Return a Closure',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Return a closure from a function.',
      skeleton: `fn make_multiplier(factor: i32) -> __BLANK__ {
    move |x| x * factor
}`,
      solution: `fn make_multiplier(factor: i32) -> impl Fn(i32) -> i32 {
    move |x| x * factor
}`,
      hints: [
        'Closures have anonymous types, so use impl Trait.',
        'The closure borrows factor, but move takes ownership.',
        'Use `impl Fn(i32) -> i32`.',
      ],
      concepts: ['returning closures', 'impl Fn', 'move'],
    },
    {
      id: 'rs-clos-7',
      title: 'Closure as Map Callback',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write `transform` that takes Vec<i32> and a closure Fn(i32) -> i32, returning the mapped Vec.',
      skeleton: `// Write your function here`,
      solution: `fn transform<F: Fn(i32) -> i32>(v: Vec<i32>, f: F) -> Vec<i32> {
    v.into_iter().map(f).collect()
}`,
      hints: [
        'Use a generic F with Fn(i32) -> i32 bound.',
        'Use into_iter().map(f).collect().',
        'The closure is passed directly to map.',
      ],
      concepts: ['closure parameter', 'map', 'generic Fn'],
    },
    {
      id: 'rs-clos-8',
      title: 'Closure Filter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `filter_with` that takes &[i32] and a predicate Fn(&i32) -> bool, returning a Vec<i32> of matching elements.',
      skeleton: `// Write your function here`,
      solution: `fn filter_with<F: Fn(&i32) -> bool>(data: &[i32], predicate: F) -> Vec<i32> {
    data.iter().filter(|x| predicate(x)).copied().collect()
}`,
      hints: [
        'Use .iter().filter().copied().collect().',
        'The predicate takes &i32 (filter gives references).',
        'Use .copied() to get owned values.',
      ],
      concepts: ['filter', 'predicate', 'Fn(&i32) -> bool'],
    },
    {
      id: 'rs-clos-9',
      title: 'Compose Two Closures',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write `compose` that takes two closures f: Fn(i32) -> i32 and g: Fn(i32) -> i32, returning a closure that computes f(g(x)).',
      skeleton: `// Write your function here`,
      solution: `fn compose<F, G>(f: F, g: G) -> impl Fn(i32) -> i32
where
    F: Fn(i32) -> i32,
    G: Fn(i32) -> i32,
{
    move |x| f(g(x))
}`,
      hints: [
        'Return impl Fn(i32) -> i32.',
        'Use move to capture f and g.',
        'The returned closure calls g first, then f.',
      ],
      concepts: ['composition', 'move closure', 'impl Fn return'],
    },
    {
      id: 'rs-clos-10',
      title: 'Memoize Closure',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a Cacher struct that stores a closure and lazily computes/caches the result. new(Fn(i32)->i32), value(&mut self, i32) -> i32.',
      skeleton: `// Write your struct and impl here`,
      solution: `struct Cacher<F: Fn(i32) -> i32> {
    calc: F,
    result: Option<i32>,
}

impl<F: Fn(i32) -> i32> Cacher<F> {
    fn new(calc: F) -> Self {
        Cacher { calc, result: None }
    }

    fn value(&mut self, arg: i32) -> i32 {
        match self.result {
            Some(v) => v,
            None => {
                let v = (self.calc)(arg);
                self.result = Some(v);
                v
            }
        }
    }
}`,
      hints: [
        'Store the closure and an Option<i32> for the cached result.',
        'On first call, compute and store. On subsequent calls, return cached.',
        'Use (self.calc)(arg) to call the stored closure.',
      ],
      concepts: ['caching', 'lazy evaluation', 'closure in struct'],
    },
    {
      id: 'rs-clos-11',
      title: 'FnOnce Consumer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `consume_and_print` that takes a String and a closure FnOnce(String) -> String, calls it, and prints the result.',
      skeleton: `// Write your function here`,
      solution: `fn consume_and_print<F: FnOnce(String) -> String>(s: String, f: F) {
    let result = f(s);
    println!("{}", result);
}`,
      hints: [
        'FnOnce can only be called once -- it consumes its captures.',
        'The closure takes ownership of the String.',
        'Use F: FnOnce(String) -> String.',
      ],
      concepts: ['FnOnce', 'consuming closure', 'ownership'],
    },
    {
      id: 'rs-clos-12',
      title: 'Iterator with Closure',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `sum_transformed` that takes &[i32] and a closure Fn(i32) -> i32, applies the closure to each element and returns the sum.',
      skeleton: `// Write your function here`,
      solution: `fn sum_transformed<F: Fn(i32) -> i32>(data: &[i32], f: F) -> i32 {
    data.iter().map(|&x| f(x)).sum()
}`,
      hints: [
        'Map each element through the closure.',
        'Sum the results.',
        'Use .iter().map(|&x| f(x)).sum().',
      ],
      concepts: ['closure with iterator', 'map', 'sum'],
    },
    {
      id: 'rs-clos-13',
      title: 'Fix: Closure Borrows Conflict',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'The closure borrows mutably, but the outer scope also tries to access the variable. Fix it.',
      skeleton: `fn main() {
    let mut data = vec![1, 2, 3];
    let mut add = || data.push(4);
    println!("{:?}", data);
    add();
}`,
      solution: `fn main() {
    let mut data = vec![1, 2, 3];
    let mut add = || data.push(4);
    add();
    println!("{:?}", data);
}`,
      hints: [
        'The closure borrows data mutably.',
        'println! also borrows data, conflicting with the closure.',
        'Move the println! after the last use of the closure.',
      ],
      concepts: ['borrow conflict', 'closure capture', 'ordering'],
    },
    {
      id: 'rs-clos-14',
      title: 'Fix: Wrong Closure Trait',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'The function requires Fn but the closure mutates a capture. Fix the bound.',
      skeleton: `fn call_twice<F: Fn()>(f: F) {
    f();
    f();
}

fn main() {
    let mut count = 0;
    call_twice(|| { count += 1; });
    println!("{}", count);
}`,
      solution: `fn call_twice<F: FnMut()>(mut f: F) {
    f();
    f();
}

fn main() {
    let mut count = 0;
    call_twice(|| { count += 1; });
    println!("{}", count);
}`,
      hints: [
        'The closure mutates count, so it implements FnMut, not Fn.',
        'Change the bound to FnMut.',
        'Also add `mut` before the parameter name.',
      ],
      concepts: ['FnMut vs Fn', 'closure trait', 'mutable capture'],
    },
    {
      id: 'rs-clos-15',
      title: 'Fix: Missing move',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'The closure is sent to another thread but borrows a local variable. Fix it.',
      skeleton: `use std::thread;

fn main() {
    let msg = String::from("hello");
    let handle = thread::spawn(|| {
        println!("{}", msg);
    });
    handle.join().unwrap();
}`,
      solution: `use std::thread;

fn main() {
    let msg = String::from("hello");
    let handle = thread::spawn(move || {
        println!("{}", msg);
    });
    handle.join().unwrap();
}`,
      hints: [
        'thread::spawn requires \'static lifetime -- no borrowed references.',
        'Use move to give the closure ownership of msg.',
        'Add `move` before `||`.',
      ],
      concepts: ['move closure', 'thread', '\'static requirement'],
    },
    {
      id: 'rs-clos-16',
      title: 'Predict: Closure Capture',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let x = 10;
    let add = |y| x + y;
    println!("{} {}", add(5), add(20));
}`,
      solution: `15 30`,
      hints: [
        'x is captured by reference (immutably).',
        'add(5) = 10 + 5 = 15.',
        'add(20) = 10 + 20 = 30.',
      ],
      concepts: ['closure capture', 'Fn', 'immutable borrow'],
    },
    {
      id: 'rs-clos-17',
      title: 'Predict: FnMut Counter',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let mut count = 0;
    let mut inc = || { count += 1; count };
    let a = inc();
    let b = inc();
    let c = inc();
    println!("{} {} {}", a, b, c);
}`,
      solution: `1 2 3`,
      hints: [
        'Each call increments count and returns it.',
        'First call: count becomes 1.',
        'Second: 2, Third: 3.',
      ],
      concepts: ['FnMut', 'stateful closure', 'counter'],
    },
    {
      id: 'rs-clos-18',
      title: 'Predict: Move Closure',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let v = vec![1, 2, 3];
    let owns_v = move || {
        println!("{:?}", v);
    };
    owns_v();
    owns_v();
}`,
      solution: `[1, 2, 3]
[1, 2, 3]`,
      hints: [
        'move transfers ownership of v into the closure.',
        'The closure owns v, so it can call it multiple times (Fn).',
        'It prints the vector twice.',
      ],
      concepts: ['move closure', 'Fn', 'ownership in closure'],
    },
    {
      id: 'rs-clos-19',
      title: 'Refactor: Named Function to Closure',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Replace the named function with an inline closure.',
      skeleton: `fn is_positive(x: &i32) -> bool {
    *x > 0
}

fn main() {
    let nums = vec![-1, 2, -3, 4, 5];
    let positives: Vec<&i32> = nums.iter().filter(|x| is_positive(x)).collect();
    println!("{:?}", positives);
}`,
      solution: `fn main() {
    let nums = vec![-1, 2, -3, 4, 5];
    let positives: Vec<&i32> = nums.iter().filter(|x| **x > 0).collect();
    println!("{:?}", positives);
}`,
      hints: [
        'Replace the function call with an inline closure.',
        'filter gives &&i32, so dereference twice.',
        'Use `|x| **x > 0`.',
      ],
      concepts: ['inline closure', 'filter', 'refactoring'],
    },
    {
      id: 'rs-clos-20',
      title: 'Refactor: For Loop to Iterator Chain',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Replace the for loop with closures and iterator methods.',
      skeleton: `fn sum_of_squares_of_odds(nums: &[i32]) -> i32 {
    let mut sum = 0;
    for &n in nums {
        if n % 2 != 0 {
            sum += n * n;
        }
    }
    sum
}`,
      solution: `fn sum_of_squares_of_odds(nums: &[i32]) -> i32 {
    nums.iter()
        .filter(|&&n| n % 2 != 0)
        .map(|&n| n * n)
        .sum()
}`,
      hints: [
        'Use .filter() for the odd check.',
        'Use .map() for squaring.',
        'Use .sum() for accumulation.',
      ],
      concepts: ['iterator chain', 'filter', 'map', 'sum'],
    },
  ],
};
