import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-async',
  title: '28. Async / Await',
  explanation: `## Async / Await

Rust's async system is zero-cost and based on **polling futures**.

### async fn
\`\`\`rust
async fn fetch_data() -> String {
    "data".to_string()
}
\`\`\`

### .await
\`\`\`rust
async fn process() {
    let data = fetch_data().await;
    println!("{data}");
}
\`\`\`

### The Future Trait
\`\`\`rust
pub trait Future {
    type Output;
    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;
}
\`\`\`

### Runtime (tokio)
\`\`\`rust
#[tokio::main]
async fn main() {
    let result = fetch_data().await;
    println!("{result}");
}
\`\`\`

### Spawning Tasks
\`\`\`rust
let handle = tokio::spawn(async {
    42
});
let result = handle.await.unwrap(); // 42
\`\`\`

### join! and select!
\`\`\`rust
let (a, b) = tokio::join!(task_a(), task_b()); // run concurrently
\`\`\`
`,
  exercises: [
    {
      id: 'rs-async-1',
      title: 'Basic async fn',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Declare an async function that returns a number.',
      skeleton: `__BLANK__ fn get_number() -> i32 {
    42
}

#[tokio::main]
async fn main() {
    let n = get_number().await;
    println!("{n}");
}`,
      solution: `async fn get_number() -> i32 {
    42
}

#[tokio::main]
async fn main() {
    let n = get_number().await;
    println!("{n}");
}`,
      hints: [
        'Prefix the function with the async keyword.',
        'async fn returns an impl Future<Output = T>.',
        'The answer is async.',
      ],
      concepts: ['async-fn', 'Future', 'await'],
    },
    {
      id: 'rs-async-2',
      title: 'Await a Future',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use .await to get the result of an async function.',
      skeleton: `async fn greet() -> String {
    "Hello, async!".to_string()
}

#[tokio::main]
async fn main() {
    let msg = greet().__BLANK__;
    println!("{msg}");
}`,
      solution: `async fn greet() -> String {
    "Hello, async!".to_string()
}

#[tokio::main]
async fn main() {
    let msg = greet().await;
    println!("{msg}");
}`,
      hints: [
        '.await suspends until the future completes.',
        'It can only be used inside async contexts.',
        'The answer is await.',
      ],
      concepts: ['await', 'async-fn', 'suspension'],
    },
    {
      id: 'rs-async-3',
      title: 'tokio::main Attribute',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Apply the tokio::main attribute to make main async.',
      skeleton: `#[__BLANK__]
async fn main() {
    println!("Running async!");
}`,
      solution: `#[tokio::main]
async fn main() {
    println!("Running async!");
}`,
      hints: [
        'tokio::main sets up the async runtime.',
        'It transforms async fn main into a synchronous entry point.',
        'The answer is tokio::main.',
      ],
      concepts: ['tokio', 'runtime', 'main-attribute'],
    },
    {
      id: 'rs-async-4',
      title: 'Spawn a Task',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Spawn an async task using tokio::spawn.',
      skeleton: `#[tokio::main]
async fn main() {
    let handle = tokio::__BLANK__(async {
        42
    });
    let result = handle.await.unwrap();
    println!("{result}");
}`,
      solution: `#[tokio::main]
async fn main() {
    let handle = tokio::spawn(async {
        42
    });
    let result = handle.await.unwrap();
    println!("{result}");
}`,
      hints: [
        'tokio::spawn creates a new async task.',
        'It returns a JoinHandle.',
        'The answer is spawn.',
      ],
      concepts: ['tokio::spawn', 'JoinHandle', 'task'],
    },
    {
      id: 'rs-async-5',
      title: 'Async Block',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create an async block that computes a value.',
      skeleton: `#[tokio::main]
async fn main() {
    let future = __BLANK__ {
        let x = 10;
        let y = 20;
        x + y
    };
    let result = future.await;
    println!("{result}");
}`,
      solution: `#[tokio::main]
async fn main() {
    let future = async {
        let x = 10;
        let y = 20;
        x + y
    };
    let result = future.await;
    println!("{result}");
}`,
      hints: [
        'An async block creates an anonymous future.',
        'It captures variables from the surrounding scope.',
        'The answer is async.',
      ],
      concepts: ['async-block', 'anonymous-future', 'capture'],
    },
    {
      id: 'rs-async-6',
      title: 'join! Macro',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Run two async tasks concurrently with tokio::join!.',
      skeleton: `async fn task_a() -> i32 { 1 }
async fn task_b() -> i32 { 2 }

#[tokio::main]
async fn main() {
    let (a, b) = tokio::__BLANK__!(task_a(), task_b());
    println!("{}", a + b);
}`,
      solution: `async fn task_a() -> i32 { 1 }
async fn task_b() -> i32 { 2 }

#[tokio::main]
async fn main() {
    let (a, b) = tokio::join!(task_a(), task_b());
    println!("{}", a + b);
}`,
      hints: [
        'join! runs multiple futures concurrently.',
        'It returns a tuple of results.',
        'The answer is join.',
      ],
      concepts: ['join', 'concurrent-futures', 'tokio'],
    },
    {
      id: 'rs-async-7',
      title: 'Simple Async Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write an async function that doubles a number.',
      skeleton: `// Write an async function that returns n * 2
// async fn double(n: i32) -> i32`,
      solution: `async fn double(n: i32) -> i32 {
    n * 2
}`,
      hints: [
        'Prefix the function with async.',
        'The body is just n * 2.',
        'async fn automatically wraps the return in a Future.',
      ],
      concepts: ['async-fn', 'Future', 'return-type'],
    },
    {
      id: 'rs-async-8',
      title: 'Sequential Async Calls',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write an async function that calls two async functions sequentially and returns their sum.',
      skeleton: `async fn fetch_a() -> i32 { 10 }
async fn fetch_b() -> i32 { 20 }

// Call fetch_a and fetch_b sequentially, return their sum
async fn sum_sequential() -> i32 {
    // TODO
}`,
      solution: `async fn fetch_a() -> i32 { 10 }
async fn fetch_b() -> i32 { 20 }

async fn sum_sequential() -> i32 {
    let a = fetch_a().await;
    let b = fetch_b().await;
    a + b
}`,
      hints: [
        'Await each function one after the other.',
        'Store results in variables, then sum them.',
        'Sequential means: complete a, then start b.',
      ],
      concepts: ['await', 'sequential', 'async-fn'],
    },
    {
      id: 'rs-async-9',
      title: 'Concurrent Tasks',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Spawn multiple async tasks and collect their results.',
      skeleton: `// Spawn n tasks where task i returns i * 10, collect results into sorted Vec
async fn spawn_and_collect(n: usize) -> Vec<usize> {
    // TODO: use tokio::spawn
}`,
      solution: `async fn spawn_and_collect(n: usize) -> Vec<usize> {
    let mut handles = vec![];
    for i in 0..n {
        handles.push(tokio::spawn(async move { i * 10 }));
    }
    let mut results = vec![];
    for h in handles {
        results.push(h.await.unwrap());
    }
    results.sort();
    results
}`,
      hints: [
        'Use tokio::spawn with async move to capture i.',
        'Collect JoinHandles, then await each one.',
        'Sort the results since task completion order is non-deterministic.',
      ],
      concepts: ['tokio::spawn', 'async-move', 'JoinHandle', 'collect'],
    },
    {
      id: 'rs-async-10',
      title: 'Async with Result',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write an async function that uses the ? operator for error handling.',
      skeleton: `use std::num::ParseIntError;

// Parse a string to i32 asynchronously, return Result
async fn async_parse(s: &str) -> Result<i32, ParseIntError> {
    // TODO
}`,
      solution: `use std::num::ParseIntError;

async fn async_parse(s: &str) -> Result<i32, ParseIntError> {
    let n: i32 = s.trim().parse()?;
    Ok(n)
}`,
      hints: [
        'async functions can return Result.',
        'Use ? operator just like in sync functions.',
        'Parse the string and wrap in Ok.',
      ],
      concepts: ['async-fn', 'Result', 'question-mark-operator'],
    },
    {
      id: 'rs-async-11',
      title: 'Sleep and Timeout',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write an async function that returns a value after sleeping, with a timeout.',
      skeleton: `use std::time::Duration;
use tokio::time;

// Sleep for the given duration then return "done",
// but timeout after max_ms milliseconds returning "timeout"
async fn timed_work(sleep_ms: u64, max_ms: u64) -> &'static str {
    // TODO
}`,
      solution: `use std::time::Duration;
use tokio::time;

async fn timed_work(sleep_ms: u64, max_ms: u64) -> &'static str {
    let work = async {
        time::sleep(Duration::from_millis(sleep_ms)).await;
        "done"
    };
    match time::timeout(Duration::from_millis(max_ms), work).await {
        Ok(result) => result,
        Err(_) => "timeout",
    }
}`,
      hints: [
        'Use tokio::time::timeout to wrap the work future.',
        'timeout returns Ok(result) on success, Err on timeout.',
        'Use tokio::time::sleep for the async sleep.',
      ],
      concepts: ['tokio::time', 'timeout', 'sleep', 'Duration'],
    },
    {
      id: 'rs-async-12',
      title: 'Async Move Closure',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use async move to capture owned data in a spawned task.',
      skeleton: `// Take ownership of a String in a spawned task, return its length
async fn string_length_task(s: String) -> usize {
    // TODO: spawn a task that takes ownership of s and returns s.len()
}`,
      solution: `async fn string_length_task(s: String) -> usize {
    let handle = tokio::spawn(async move {
        s.len()
    });
    handle.await.unwrap()
}`,
      hints: [
        'Use async move to transfer ownership of s into the block.',
        'tokio::spawn requires the future to be Send + \'static.',
        'async move captures all referenced variables by value.',
      ],
      concepts: ['async-move', 'tokio::spawn', 'ownership', 'Send'],
    },
    {
      id: 'rs-async-13',
      title: 'Bug: Blocking in Async',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix code that blocks the async runtime with std::thread::sleep.',
      skeleton: `use std::time::Duration;

#[tokio::main]
async fn main() {
    let h1 = tokio::spawn(async {
        std::thread::sleep(Duration::from_secs(1)); // blocks the executor!
        "task 1"
    });
    let h2 = tokio::spawn(async {
        "task 2"
    });
    let (r1, r2) = tokio::join!(h1, h2);
    println!("{} {}", r1.unwrap(), r2.unwrap());
}`,
      solution: `use std::time::Duration;

#[tokio::main]
async fn main() {
    let h1 = tokio::spawn(async {
        tokio::time::sleep(Duration::from_secs(1)).await;
        "task 1"
    });
    let h2 = tokio::spawn(async {
        "task 2"
    });
    let (r1, r2) = tokio::join!(h1, h2);
    println!("{} {}", r1.unwrap(), r2.unwrap());
}`,
      hints: [
        'std::thread::sleep blocks the entire OS thread.',
        'In async code, use tokio::time::sleep instead.',
        'Remember to .await the tokio sleep.',
      ],
      concepts: ['blocking', 'tokio::time::sleep', 'async-runtime'],
    },
    {
      id: 'rs-async-14',
      title: 'Bug: Missing .await',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix code that forgets to await an async function call.',
      skeleton: `async fn compute() -> i32 {
    42
}

#[tokio::main]
async fn main() {
    let result = compute();
    println!("Result: {result}");
}`,
      solution: `async fn compute() -> i32 {
    42
}

#[tokio::main]
async fn main() {
    let result = compute().await;
    println!("Result: {result}");
}`,
      hints: [
        'Calling an async fn returns a Future, not the value.',
        'You must .await the future to drive it to completion.',
        'Add .await after compute().',
      ],
      concepts: ['await', 'Future', 'lazy-evaluation'],
    },
    {
      id: 'rs-async-15',
      title: 'Bug: Non-Send Type in Spawn',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix code that tries to spawn a task holding a non-Send type across an await point.',
      skeleton: `use std::rc::Rc;

#[tokio::main]
async fn main() {
    let data = Rc::new(42);
    let handle = tokio::spawn(async move {
        println!("{}", *data);
    });
    handle.await.unwrap();
}`,
      solution: `use std::sync::Arc;

#[tokio::main]
async fn main() {
    let data = Arc::new(42);
    let handle = tokio::spawn(async move {
        println!("{}", *data);
    });
    handle.await.unwrap();
}`,
      hints: [
        'Rc is not Send, so it cannot cross thread boundaries.',
        'tokio::spawn requires the future to be Send.',
        'Replace Rc with Arc (atomic reference counting).',
      ],
      concepts: ['Send', 'Rc', 'Arc', 'tokio::spawn'],
    },
    {
      id: 'rs-async-16',
      title: 'Predict: Async Execution Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the output of sequential async calls.',
      skeleton: `async fn step(n: i32) -> i32 {
    println!("step {n}");
    n
}

#[tokio::main]
async fn main() {
    let a = step(1).await;
    let b = step(2).await;
    println!("{}", a + b);
}`,
      solution: `step 1
step 2
3`,
      hints: [
        'Sequential awaits execute one after the other.',
        'step(1) prints "step 1", step(2) prints "step 2".',
        '1 + 2 = 3.',
      ],
      concepts: ['sequential-await', 'execution-order'],
    },
    {
      id: 'rs-async-17',
      title: 'Predict: Lazy Futures',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict what happens when a future is created but not awaited.',
      skeleton: `async fn side_effect() -> i32 {
    println!("running");
    42
}

#[tokio::main]
async fn main() {
    let _f = side_effect(); // not awaited
    println!("done");
}`,
      solution: `done`,
      hints: [
        'Futures in Rust are lazy -- they do nothing until polled.',
        'Creating a future does not execute it.',
        'Only "done" is printed because side_effect is never awaited.',
      ],
      concepts: ['lazy-futures', 'polling', 'await'],
    },
    {
      id: 'rs-async-18',
      title: 'Predict: join! Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of concurrent tasks using join!.',
      skeleton: `async fn double(n: i32) -> i32 { n * 2 }
async fn triple(n: i32) -> i32 { n * 3 }

#[tokio::main]
async fn main() {
    let (a, b) = tokio::join!(double(5), triple(5));
    println!("{a} {b}");
}`,
      solution: `10 15`,
      hints: [
        'join! runs both futures concurrently.',
        'double(5) = 10, triple(5) = 15.',
        'Both complete and results are returned as a tuple.',
      ],
      concepts: ['join', 'concurrent', 'tuple-result'],
    },
    {
      id: 'rs-async-19',
      title: 'Refactor: Sequential to Concurrent',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor sequential async calls into concurrent execution with join!.',
      skeleton: `use tokio::time::{sleep, Duration};

async fn fetch_users() -> Vec<String> {
    sleep(Duration::from_millis(100)).await;
    vec!["Alice".into(), "Bob".into()]
}

async fn fetch_posts() -> Vec<String> {
    sleep(Duration::from_millis(100)).await;
    vec!["Post1".into(), "Post2".into()]
}

#[tokio::main]
async fn main() {
    let users = fetch_users().await;
    let posts = fetch_posts().await;
    println!("{} users, {} posts", users.len(), posts.len());
}`,
      solution: `use tokio::time::{sleep, Duration};

async fn fetch_users() -> Vec<String> {
    sleep(Duration::from_millis(100)).await;
    vec!["Alice".into(), "Bob".into()]
}

async fn fetch_posts() -> Vec<String> {
    sleep(Duration::from_millis(100)).await;
    vec!["Post1".into(), "Post2".into()]
}

#[tokio::main]
async fn main() {
    let (users, posts) = tokio::join!(fetch_users(), fetch_posts());
    println!("{} users, {} posts", users.len(), posts.len());
}`,
      hints: [
        'Sequential awaits take 200ms total; concurrent takes 100ms.',
        'Use tokio::join! to run both fetches simultaneously.',
        'Destructure the tuple result into (users, posts).',
      ],
      concepts: ['join', 'concurrency', 'refactor', 'performance'],
    },
    {
      id: 'rs-async-20',
      title: 'Refactor: Callbacks to Async',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor callback-style chaining into clean async/await.',
      skeleton: `use std::sync::mpsc;
use std::thread;

fn fetch_data(callback: Box<dyn FnOnce(String) + Send>) {
    thread::spawn(move || {
        callback("data".to_string());
    });
}

fn process_data(data: String, callback: Box<dyn FnOnce(String) + Send>) {
    thread::spawn(move || {
        callback(format!("processed: {data}"));
    });
}

fn main() {
    let (tx, rx) = mpsc::channel();
    fetch_data(Box::new(move |data| {
        process_data(data, Box::new(move |result| {
            tx.send(result).unwrap();
        }));
    }));
    println!("{}", rx.recv().unwrap());
}`,
      solution: `async fn fetch_data() -> String {
    "data".to_string()
}

async fn process_data(data: String) -> String {
    format!("processed: {data}")
}

#[tokio::main]
async fn main() {
    let data = fetch_data().await;
    let result = process_data(data).await;
    println!("{result}");
}`,
      hints: [
        'Replace callbacks with async functions that return values.',
        'Chain with .await instead of nesting callbacks.',
        'The logic becomes linear and readable.',
      ],
      concepts: ['async-await', 'callback-hell', 'refactor'],
    },
  ],
};
