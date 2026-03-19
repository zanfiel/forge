import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-tokio',
  title: '45. Tokio Basics',
  explanation: `## Tokio Basics

Tokio is the most widely used async runtime for Rust. It provides the executor, I/O driver, timers, and task scheduling needed to run async code.

### The Runtime
\`\`\`rust
#[tokio::main]
async fn main() {
    println!("Hello from Tokio!");
}
\`\`\`

This macro sets up a multi-threaded runtime. For single-threaded:
\`\`\`rust
#[tokio::main(flavor = "current_thread")]
async fn main() { }
\`\`\`

### Spawning Tasks
\`\`\`rust
let handle = tokio::spawn(async {
    // runs concurrently
    42
});
let result = handle.await.unwrap(); // JoinHandle<i32>
\`\`\`

### Sleep and Timers
\`\`\`rust
use tokio::time::{sleep, Duration};
sleep(Duration::from_secs(1)).await;
\`\`\`

### Channels
\`\`\`rust
use tokio::sync::mpsc;
let (tx, mut rx) = mpsc::channel(32);
tx.send("hello").await.unwrap();
let msg = rx.recv().await.unwrap();
\`\`\`

### Select
\`\`\`rust
use tokio::select;
select! {
    val = future_a => println!("a: {}", val),
    val = future_b => println!("b: {}", val),
}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-tokio-1',
      title: 'Tokio Main Attribute',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use the tokio::main attribute to create an async entry point.',
      skeleton: `__BLANK__
async fn main() {
    println!("Hello, Tokio!");
}`,
      solution: `#[tokio::main]
async fn main() {
    println!("Hello, Tokio!");
}`,
      hints: [
        'Tokio provides a procedural macro to set up the runtime.',
        'The attribute goes above async fn main().',
        '#[tokio::main] sets up the multi-threaded runtime.',
      ],
      concepts: ['tokio-main', 'async-runtime', 'proc-macro'],
    },
    {
      id: 'rs-tokio-2',
      title: 'Spawn a Task',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Spawn an async task using tokio::spawn.',
      skeleton: `#[tokio::main]
async fn main() {
    let handle = __BLANK__(async {
        42
    });
    let result = handle.await.unwrap();
    println!("Got: {}", result);
}`,
      solution: `#[tokio::main]
async fn main() {
    let handle = tokio::spawn(async {
        42
    });
    let result = handle.await.unwrap();
    println!("Got: {}", result);
}`,
      hints: [
        'tokio::spawn creates a new asynchronous task.',
        'It returns a JoinHandle that you can .await.',
        'tokio::spawn(async { ... }) runs the block concurrently.',
      ],
      concepts: ['tokio-spawn', 'join-handle', 'task-concurrency'],
    },
    {
      id: 'rs-tokio-3',
      title: 'Tokio Sleep',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use tokio::time::sleep for async delay.',
      skeleton: `use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    println!("Before sleep");
    __BLANK__(Duration::from_millis(100)).await;
    println!("After sleep");
}`,
      solution: `use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    println!("Before sleep");
    sleep(Duration::from_millis(100)).await;
    println!("After sleep");
}`,
      hints: [
        'tokio::time::sleep creates an async delay.',
        'It takes a Duration argument.',
        'sleep(Duration::from_millis(100)).await pauses for 100ms.',
      ],
      concepts: ['tokio-sleep', 'duration', 'async-timers'],
    },
    {
      id: 'rs-tokio-4',
      title: 'MPSC Channel Send',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Send a message through a tokio mpsc channel.',
      skeleton: `use tokio::sync::mpsc;

#[tokio::main]
async fn main() {
    let (tx, mut rx) = mpsc::channel(32);

    tokio::spawn(async move {
        tx.__BLANK__("hello").await.unwrap();
    });

    let msg = rx.recv().await.unwrap();
    println!("Received: {}", msg);
}`,
      solution: `use tokio::sync::mpsc;

#[tokio::main]
async fn main() {
    let (tx, mut rx) = mpsc::channel(32);

    tokio::spawn(async move {
        tx.send("hello").await.unwrap();
    });

    let msg = rx.recv().await.unwrap();
    println!("Received: {}", msg);
}`,
      hints: [
        'The Sender has a send() method.',
        'send() is async and returns a Result.',
        'tx.send("hello").await.unwrap() sends the message.',
      ],
      concepts: ['mpsc-channel', 'async-send', 'tokio-channels'],
    },
    {
      id: 'rs-tokio-5',
      title: 'Tokio Select',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use tokio::select! to race two futures.',
      skeleton: `use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    __BLANK__ {
        _ = sleep(Duration::from_millis(100)) => {
            println!("timer elapsed");
        }
        _ = sleep(Duration::from_millis(200)) => {
            println!("slow timer");
        }
    }
}`,
      solution: `use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    tokio::select! {
        _ = sleep(Duration::from_millis(100)) => {
            println!("timer elapsed");
        }
        _ = sleep(Duration::from_millis(200)) => {
            println!("slow timer");
        }
    }
}`,
      hints: [
        'tokio::select! races multiple futures.',
        'The first future to complete wins.',
        'tokio::select! { ... } is the macro syntax.',
      ],
      concepts: ['tokio-select', 'future-racing', 'concurrency'],
    },
    {
      id: 'rs-tokio-6',
      title: 'Oneshot Channel',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use a tokio oneshot channel for single-value communication.',
      skeleton: `use tokio::sync::__BLANK__;

#[tokio::main]
async fn main() {
    let (tx, rx) = oneshot::channel();

    tokio::spawn(async move {
        tx.send(42).unwrap();
    });

    let val = rx.await.unwrap();
    println!("Got: {}", val);
}`,
      solution: `use tokio::sync::oneshot;

#[tokio::main]
async fn main() {
    let (tx, rx) = oneshot::channel();

    tokio::spawn(async move {
        tx.send(42).unwrap();
    });

    let val = rx.await.unwrap();
    println!("Got: {}", val);
}`,
      hints: [
        'tokio::sync has a oneshot module for single-use channels.',
        'oneshot::channel() creates a sender/receiver pair.',
        'Import oneshot from tokio::sync.',
      ],
      concepts: ['oneshot-channel', 'single-value-comm', 'tokio-sync'],
    },
    {
      id: 'rs-tokio-7',
      title: 'Spawn Multiple Tasks',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write an async function that spawns multiple tasks and collects results.',
      skeleton: `// Write an async function 'parallel_sum' that:
// 1. Spawns 5 tasks, each returning their index (0..5) as i32
// 2. Collects all results using JoinHandle::await
// 3. Returns the sum of all results (0+1+2+3+4 = 10)

async fn parallel_sum() -> i32 {
    todo!()
}`,
      solution: `async fn parallel_sum() -> i32 {
    let mut handles = vec![];

    for i in 0..5 {
        handles.push(tokio::spawn(async move { i as i32 }));
    }

    let mut sum = 0;
    for handle in handles {
        sum += handle.await.unwrap();
    }
    sum
}`,
      hints: [
        'Use a Vec to store JoinHandles.',
        'Spawn each task with tokio::spawn(async move { i }).',
        'Iterate over handles, await each, and sum the results.',
      ],
      concepts: ['tokio-spawn', 'join-handle', 'task-collection'],
    },
    {
      id: 'rs-tokio-8',
      title: 'Timeout a Future',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a function that wraps a future with a timeout.',
      skeleton: `use tokio::time::{timeout, Duration};
use std::future::Future;

// Write an async function 'with_timeout' that:
// Takes a future and a duration in milliseconds
// Returns Ok(result) if the future completes in time
// Returns Err("timeout") if it doesn't

async fn with_timeout<F: Future<Output = String> + Send>(
    fut: F,
    ms: u64,
) -> Result<String, &'static str> {
    todo!()
}`,
      solution: `use tokio::time::{timeout, Duration};
use std::future::Future;

async fn with_timeout<F: Future<Output = String> + Send>(
    fut: F,
    ms: u64,
) -> Result<String, &'static str> {
    match timeout(Duration::from_millis(ms), fut).await {
        Ok(result) => Ok(result),
        Err(_) => Err("timeout"),
    }
}`,
      hints: [
        'tokio::time::timeout wraps a future with a time limit.',
        'It returns Ok(value) on success, Err(Elapsed) on timeout.',
        'Match on the result and map Err(_) to Err("timeout").',
      ],
      concepts: ['tokio-timeout', 'error-handling', 'future-wrapping'],
    },
    {
      id: 'rs-tokio-9',
      title: 'Producer-Consumer with MPSC',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a producer-consumer pattern using tokio channels.',
      skeleton: `use tokio::sync::mpsc;

// Write an async function 'produce_consume' that:
// 1. Creates an mpsc channel with buffer size 10
// 2. Spawns a producer task that sends numbers 1..=5
// 3. Receives all values and returns their sum (15)

async fn produce_consume() -> i32 {
    todo!()
}`,
      solution: `use tokio::sync::mpsc;

async fn produce_consume() -> i32 {
    let (tx, mut rx) = mpsc::channel(10);

    tokio::spawn(async move {
        for i in 1..=5 {
            tx.send(i).await.unwrap();
        }
    });

    let mut sum = 0;
    while let Some(val) = rx.recv().await {
        sum += val;
    }
    sum
}`,
      hints: [
        'Create channel with mpsc::channel(10).',
        'Spawn a task that sends 1 through 5.',
        'Use while let Some(val) = rx.recv().await to receive all values.',
      ],
      concepts: ['mpsc-channel', 'producer-consumer', 'async-loop'],
    },
    {
      id: 'rs-tokio-10',
      title: 'Broadcast Channel',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a function using tokio broadcast channel for multi-consumer messaging.',
      skeleton: `use tokio::sync::broadcast;

// Write an async function 'broadcast_message' that:
// 1. Creates a broadcast channel with capacity 16
// 2. Creates two receivers (subscribers)
// 3. Sends the message "hello" on the sender
// 4. Both receivers receive and the function returns a Vec of the received messages

async fn broadcast_message() -> Vec<String> {
    todo!()
}`,
      solution: `use tokio::sync::broadcast;

async fn broadcast_message() -> Vec<String> {
    let (tx, mut rx1) = broadcast::channel(16);
    let mut rx2 = tx.subscribe();

    tx.send("hello".to_string()).unwrap();

    let msg1 = rx1.recv().await.unwrap();
    let msg2 = rx2.recv().await.unwrap();

    vec![msg1, msg2]
}`,
      hints: [
        'broadcast::channel returns (Sender, Receiver).',
        'Create additional receivers with tx.subscribe().',
        'Both receivers get a copy of the sent message.',
      ],
      concepts: ['broadcast-channel', 'multi-consumer', 'tokio-sync'],
    },
    {
      id: 'rs-tokio-11',
      title: 'Mutex Shared State',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a function that uses tokio::sync::Mutex for shared state across tasks.',
      skeleton: `use std::sync::Arc;
use tokio::sync::Mutex;

// Write an async function 'shared_counter' that:
// 1. Creates an Arc<Mutex<i32>> initialized to 0
// 2. Spawns 10 tasks, each incrementing the counter by 1
// 3. Waits for all tasks to complete
// 4. Returns the final counter value (10)

async fn shared_counter() -> i32 {
    todo!()
}`,
      solution: `use std::sync::Arc;
use tokio::sync::Mutex;

async fn shared_counter() -> i32 {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        handles.push(tokio::spawn(async move {
            let mut lock = counter.lock().await;
            *lock += 1;
        }));
    }

    for handle in handles {
        handle.await.unwrap();
    }

    *counter.lock().await
}`,
      hints: [
        'Arc<Mutex<i32>> allows shared mutable access across tasks.',
        'Clone the Arc for each task, lock with .lock().await.',
        'Await all handles, then read the final value.',
      ],
      concepts: ['tokio-mutex', 'arc', 'shared-state', 'task-synchronization'],
    },
    {
      id: 'rs-tokio-12',
      title: 'Semaphore Rate Limiting',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Use a tokio Semaphore to limit concurrent task execution.',
      skeleton: `use std::sync::Arc;
use tokio::sync::Semaphore;

// Write an async function 'limited_concurrency' that:
// 1. Creates a Semaphore with 3 permits
// 2. Spawns 10 tasks, each acquiring a permit before proceeding
// 3. Each task returns its index
// 4. Returns the sum of all indices (0+1+...+9 = 45)

async fn limited_concurrency() -> i32 {
    todo!()
}`,
      solution: `use std::sync::Arc;
use tokio::sync::Semaphore;

async fn limited_concurrency() -> i32 {
    let sem = Arc::new(Semaphore::new(3));
    let mut handles = vec![];

    for i in 0..10 {
        let sem = Arc::clone(&sem);
        handles.push(tokio::spawn(async move {
            let _permit = sem.acquire().await.unwrap();
            i as i32
        }));
    }

    let mut sum = 0;
    for handle in handles {
        sum += handle.await.unwrap();
    }
    sum
}`,
      hints: [
        'Semaphore::new(3) allows at most 3 concurrent permits.',
        'sem.acquire().await gets a permit; it is released when dropped.',
        'Collect all JoinHandles and sum the results.',
      ],
      concepts: ['semaphore', 'rate-limiting', 'concurrency-control'],
    },
    {
      id: 'rs-tokio-13',
      title: 'Bug: Blocking in Async',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix code that blocks the async runtime with std::thread::sleep.',
      skeleton: `use std::thread;
use std::time::Duration;

#[tokio::main]
async fn main() {
    println!("start");
    // BUG: This blocks the entire runtime thread!
    thread::sleep(Duration::from_secs(1));
    println!("done");
}`,
      solution: `use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    println!("start");
    sleep(Duration::from_secs(1)).await;
    println!("done");
}`,
      hints: [
        'std::thread::sleep blocks the OS thread, starving the async runtime.',
        'Use tokio::time::sleep instead for async-friendly delays.',
        'Replace thread::sleep with tokio::time::sleep().await.',
      ],
      concepts: ['blocking-in-async', 'tokio-sleep', 'runtime-starvation'],
    },
    {
      id: 'rs-tokio-14',
      title: 'Bug: Missing Move in Spawn',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix a spawn call that fails because the closure does not capture ownership.',
      skeleton: `#[tokio::main]
async fn main() {
    let data = String::from("hello");

    // BUG: data is borrowed but task may outlive current scope
    let handle = tokio::spawn(async {
        println!("{}", data);
    });

    handle.await.unwrap();
}`,
      solution: `#[tokio::main]
async fn main() {
    let data = String::from("hello");

    let handle = tokio::spawn(async move {
        println!("{}", data);
    });

    handle.await.unwrap();
}`,
      hints: [
        'tokio::spawn requires the future to be \'static.',
        'Use async move to transfer ownership into the task.',
        'Change async { to async move { to capture data by value.',
      ],
      concepts: ['async-move', 'tokio-spawn', 'ownership-transfer'],
    },
    {
      id: 'rs-tokio-15',
      title: 'Bug: Dropped Sender',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a channel that closes prematurely because the sender is dropped.',
      skeleton: `use tokio::sync::mpsc;

#[tokio::main]
async fn main() {
    let (tx, mut rx) = mpsc::channel(10);

    // BUG: tx is not moved into the task, so it's dropped immediately
    tokio::spawn(async {
        for i in 0..5 {
            tx.send(i).await.unwrap();
        }
    });

    while let Some(v) = rx.recv().await {
        println!("{}", v);
    }
}`,
      solution: `use tokio::sync::mpsc;

#[tokio::main]
async fn main() {
    let (tx, mut rx) = mpsc::channel(10);

    tokio::spawn(async move {
        for i in 0..5 {
            tx.send(i).await.unwrap();
        }
    });

    while let Some(v) = rx.recv().await {
        println!("{}", v);
    }
}`,
      hints: [
        'The sender must be moved into the spawned task.',
        'Without move, tx is borrowed and may be dropped in the outer scope.',
        'Change async { to async move { to transfer tx ownership.',
      ],
      concepts: ['channel-ownership', 'async-move', 'sender-lifetime'],
    },
    {
      id: 'rs-tokio-16',
      title: 'Predict: Spawn Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the output of a simple tokio::spawn program.',
      skeleton: `#[tokio::main]
async fn main() {
    let handle = tokio::spawn(async {
        3 + 4
    });
    let val = handle.await.unwrap();
    println!("Result: {}", val);
}`,
      solution: `Result: 7`,
      hints: [
        'The spawned task returns 3 + 4 = 7.',
        'handle.await.unwrap() extracts the result.',
        'It prints "Result: 7".',
      ],
      concepts: ['tokio-spawn', 'join-handle', 'task-result'],
    },
    {
      id: 'rs-tokio-17',
      title: 'Predict: Channel Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of an mpsc channel program.',
      skeleton: `use tokio::sync::mpsc;

#[tokio::main]
async fn main() {
    let (tx, mut rx) = mpsc::channel(10);

    tx.send(1).await.unwrap();
    tx.send(2).await.unwrap();
    tx.send(3).await.unwrap();
    drop(tx);

    while let Some(v) = rx.recv().await {
        print!("{} ", v);
    }
    println!();
}`,
      solution: `1 2 3 `,
      hints: [
        'Messages are received in FIFO order.',
        'After tx is dropped, rx.recv() returns None after all messages.',
        'Output: 1 2 3',
      ],
      concepts: ['mpsc-ordering', 'channel-fifo', 'sender-drop'],
    },
    {
      id: 'rs-tokio-18',
      title: 'Predict: Select Winner',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict which branch of select! completes first.',
      skeleton: `use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    tokio::select! {
        _ = sleep(Duration::from_millis(50)) => {
            println!("fast");
        }
        _ = sleep(Duration::from_millis(500)) => {
            println!("slow");
        }
    }
}`,
      solution: `fast`,
      hints: [
        'select! runs both futures concurrently.',
        'The 50ms sleep completes before the 500ms sleep.',
        'Only "fast" is printed.',
      ],
      concepts: ['tokio-select', 'future-racing', 'timer-resolution'],
    },
    {
      id: 'rs-tokio-19',
      title: 'Refactor: Sequential to Concurrent',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor sequential awaits into concurrent execution.',
      skeleton: `use tokio::time::{sleep, Duration};

async fn fetch_a() -> i32 {
    sleep(Duration::from_millis(100)).await;
    1
}

async fn fetch_b() -> i32 {
    sleep(Duration::from_millis(100)).await;
    2
}

// This runs sequentially (200ms total)
async fn get_both() -> (i32, i32) {
    let a = fetch_a().await;
    let b = fetch_b().await;
    (a, b)
}`,
      solution: `use tokio::time::{sleep, Duration};

async fn fetch_a() -> i32 {
    sleep(Duration::from_millis(100)).await;
    1
}

async fn fetch_b() -> i32 {
    sleep(Duration::from_millis(100)).await;
    2
}

// This runs concurrently (100ms total)
async fn get_both() -> (i32, i32) {
    let (a, b) = tokio::join!(fetch_a(), fetch_b());
    (a, b)
}`,
      hints: [
        'Sequential awaits waste time when futures are independent.',
        'tokio::join! runs multiple futures concurrently.',
        'Replace separate awaits with tokio::join!(fetch_a(), fetch_b()).',
      ],
      concepts: ['tokio-join', 'concurrent-execution', 'performance'],
    },
    {
      id: 'rs-tokio-20',
      title: 'Refactor: Spawn to JoinSet',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor manual JoinHandle collection into a JoinSet.',
      skeleton: `async fn process_items(items: Vec<i32>) -> Vec<i32> {
    let mut handles = vec![];

    for item in items {
        handles.push(tokio::spawn(async move {
            item * 2
        }));
    }

    let mut results = vec![];
    for handle in handles {
        results.push(handle.await.unwrap());
    }
    results
}`,
      solution: `use tokio::task::JoinSet;

async fn process_items(items: Vec<i32>) -> Vec<i32> {
    let mut set = JoinSet::new();

    for item in items {
        set.spawn(async move {
            item * 2
        });
    }

    let mut results = vec![];
    while let Some(result) = set.join_next().await {
        results.push(result.unwrap());
    }
    results
}`,
      hints: [
        'JoinSet manages a collection of spawned tasks.',
        'Use set.spawn() instead of tokio::spawn.',
        'Use set.join_next().await to collect results.',
      ],
      concepts: ['join-set', 'task-management', 'concurrent-collection'],
    },
  ],
};
