import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-thread',
  title: '25. Concurrency: Threads',
  explanation: `## Concurrency: Threads

Rust's ownership system guarantees thread safety at compile time -- no data races.

### Spawning Threads
\`\`\`rust
use std::thread;

let handle = thread::spawn(|| {
    println!("Hello from a thread!");
});
handle.join().unwrap(); // wait for thread to finish
\`\`\`

### Move Closures
\`\`\`rust
let data = vec![1, 2, 3];
let handle = thread::spawn(move || {
    println!("{:?}", data); // data moved into thread
});
\`\`\`

### Scoped Threads (Rust 1.63+)
\`\`\`rust
let data = vec![1, 2, 3];
thread::scope(|s| {
    s.spawn(|| {
        println!("{:?}", data); // can borrow from parent scope
    });
}); // all scoped threads join here
\`\`\`

### JoinHandle
\`\`\`rust
let handle = thread::spawn(|| 42);
let result = handle.join().unwrap(); // 42
\`\`\`

### Thread Builder
\`\`\`rust
thread::Builder::new()
    .name("worker".into())
    .stack_size(1024 * 1024)
    .spawn(|| { /* work */ })
    .unwrap();
\`\`\`
`,
  exercises: [
    {
      id: 'rs-thread-1',
      title: 'Spawn a Thread',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Spawn a thread and wait for it to finish.',
      skeleton: `use std::thread;

fn main() {
    let handle = thread::__BLANK__(|| {
        println!("Hello from thread!");
    });
    handle.join().unwrap();
}`,
      solution: `use std::thread;

fn main() {
    let handle = thread::spawn(|| {
        println!("Hello from thread!");
    });
    handle.join().unwrap();
}`,
      hints: [
        'thread::spawn creates a new OS thread.',
        'It takes a closure as the thread body.',
        'The answer is spawn.',
      ],
      concepts: ['thread::spawn', 'JoinHandle', 'concurrency'],
    },
    {
      id: 'rs-thread-2',
      title: 'Move Closure',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Move ownership of data into a thread.',
      skeleton: `use std::thread;

fn main() {
    let name = String::from("Rust");
    let handle = thread::spawn(__BLANK__ || {
        println!("Hello, {}!", name);
    });
    handle.join().unwrap();
}`,
      solution: `use std::thread;

fn main() {
    let name = String::from("Rust");
    let handle = thread::spawn(move || {
        println!("Hello, {}!", name);
    });
    handle.join().unwrap();
}`,
      hints: [
        'Threads may outlive the scope that created them.',
        'move forces the closure to take ownership of captured variables.',
        'The answer is move.',
      ],
      concepts: ['move closure', 'ownership transfer', 'thread safety'],
    },
    {
      id: 'rs-thread-3',
      title: 'Join Handle Result',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Get a return value from a thread.',
      skeleton: `use std::thread;

fn main() {
    let handle = thread::spawn(|| {
        42
    });
    let result = handle.__BLANK__().unwrap();
    println!("Thread returned: {}", result);
}`,
      solution: `use std::thread;

fn main() {
    let handle = thread::spawn(|| {
        42
    });
    let result = handle.join().unwrap();
    println!("Thread returned: {}", result);
}`,
      hints: [
        'join() waits for the thread to complete and returns its result.',
        'It returns Result<T, Box<dyn Any>>.',
        'The answer is join.',
      ],
      concepts: ['join', 'JoinHandle', 'thread return value'],
    },
    {
      id: 'rs-thread-4',
      title: 'Scoped Thread',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use scoped threads to borrow from the parent scope.',
      skeleton: `use std::thread;

fn main() {
    let data = vec![1, 2, 3, 4, 5];
    thread::__BLANK__(|s| {
        s.spawn(|| {
            println!("Sum: {}", data.iter().sum::<i32>());
        });
    });
    println!("Data still available: {:?}", data);
}`,
      solution: `use std::thread;

fn main() {
    let data = vec![1, 2, 3, 4, 5];
    thread::scope(|s| {
        s.spawn(|| {
            println!("Sum: {}", data.iter().sum::<i32>());
        });
    });
    println!("Data still available: {:?}", data);
}`,
      hints: [
        'Scoped threads guarantee all threads finish before the scope ends.',
        'This allows borrowing from the parent scope safely.',
        'The answer is scope.',
      ],
      concepts: ['thread::scope', 'scoped threads', 'borrowing'],
    },
    {
      id: 'rs-thread-5',
      title: 'Thread Sleep',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Pause a thread for a specified duration.',
      skeleton: `use std::thread;
use std::time::Duration;

fn main() {
    println!("Starting...");
    thread::__BLANK__(Duration::from_millis(100));
    println!("Done!");
}`,
      solution: `use std::thread;
use std::time::Duration;

fn main() {
    println!("Starting...");
    thread::sleep(Duration::from_millis(100));
    println!("Done!");
}`,
      hints: [
        'thread::sleep pauses the current thread.',
        'It takes a Duration parameter.',
        'The answer is sleep.',
      ],
      concepts: ['thread::sleep', 'Duration', 'blocking'],
    },
    {
      id: 'rs-thread-6',
      title: 'Thread Builder',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a named thread using the Builder API.',
      skeleton: `use std::thread;

fn main() {
    let builder = thread::Builder::new()
        .__BLANK__("worker-1".to_string());
    let handle = builder.spawn(|| {
        let name = thread::current().name().unwrap_or("unnamed").to_string();
        println!("Running in thread: {}", name);
    }).unwrap();
    handle.join().unwrap();
}`,
      solution: `use std::thread;

fn main() {
    let builder = thread::Builder::new()
        .name("worker-1".to_string());
    let handle = builder.spawn(|| {
        let name = thread::current().name().unwrap_or("unnamed").to_string();
        println!("Running in thread: {}", name);
    }).unwrap();
    handle.join().unwrap();
}`,
      hints: [
        'Builder::name sets the thread name.',
        'thread::current().name() retrieves it.',
        'The answer is name.',
      ],
      concepts: ['Builder', 'named thread', 'thread::current'],
    },
    {
      id: 'rs-thread-7',
      title: 'Parallel Sum',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Split work across multiple threads and combine results.',
      skeleton: `use std::thread;

fn parallel_sum(data: Vec<i32>, num_threads: usize) -> i32 {
    // Split data into chunks
    // Spawn a thread for each chunk
    // Sum results from all threads
    todo!()
}

fn main() {
    let data = (1..=100).collect();
    println!("Sum: {}", parallel_sum(data, 4));
}`,
      solution: `use std::thread;

fn parallel_sum(data: Vec<i32>, num_threads: usize) -> i32 {
    let chunk_size = (data.len() + num_threads - 1) / num_threads;
    let chunks: Vec<Vec<i32>> = data.chunks(chunk_size)
        .map(|c| c.to_vec())
        .collect();

    let handles: Vec<_> = chunks.into_iter()
        .map(|chunk| {
            thread::spawn(move || chunk.iter().sum::<i32>())
        })
        .collect();

    handles.into_iter()
        .map(|h| h.join().unwrap())
        .sum()
}

fn main() {
    let data = (1..=100).collect();
    println!("Sum: {}", parallel_sum(data, 4));
}`,
      hints: [
        'Use chunks() to divide the data evenly.',
        'Each chunk needs to be owned (to_vec) for the move closure.',
        'Collect join handles and sum the results.',
      ],
      concepts: ['parallel computation', 'chunks', 'thread spawn', 'join'],
    },
    {
      id: 'rs-thread-8',
      title: 'Scoped Parallel Map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use scoped threads to process items in parallel.',
      skeleton: `use std::thread;

fn parallel_map(data: &[i32], f: fn(i32) -> i32) -> Vec<i32> {
    // Use scoped threads to apply f to each element in parallel
    // Return results in order
    todo!()
}

fn main() {
    let data = vec![1, 2, 3, 4, 5];
    let result = parallel_map(&data, |x| x * x);
    println!("{:?}", result);
}`,
      solution: `use std::thread;
use std::sync::Mutex;

fn parallel_map(data: &[i32], f: fn(i32) -> i32) -> Vec<i32> {
    let results = Mutex::new(vec![0i32; data.len()]);
    thread::scope(|s| {
        for (i, &val) in data.iter().enumerate() {
            let results = &results;
            s.spawn(move || {
                let computed = f(val);
                results.lock().unwrap()[i] = computed;
            });
        }
    });
    results.into_inner().unwrap()
}

fn main() {
    let data = vec![1, 2, 3, 4, 5];
    let result = parallel_map(&data, |x| x * x);
    println!("{:?}", result);
}`,
      hints: [
        'Scoped threads can borrow from the parent scope.',
        'Use a Mutex<Vec> to collect results at each index.',
        'Each thread writes to its own index so there is no contention.',
      ],
      concepts: ['scoped threads', 'parallel map', 'Mutex'],
    },
    {
      id: 'rs-thread-9',
      title: 'Thread Pool Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Implement a simple thread pool that executes tasks.',
      skeleton: `use std::thread;
use std::sync::{mpsc, Arc, Mutex};

struct ThreadPool {
    workers: Vec<thread::JoinHandle<()>>,
    sender: mpsc::Sender<Box<dyn FnOnce() + Send>>,
}

impl ThreadPool {
    fn new(size: usize) -> Self {
        // Create a channel
        // Spawn 'size' threads that receive and execute tasks
        todo!()
    }

    fn execute<F: FnOnce() + Send + 'static>(&self, f: F) {
        todo!()
    }
}

fn main() {
    let pool = ThreadPool::new(4);
    for i in 0..8 {
        pool.execute(move || {
            println!("Task {} running", i);
        });
    }
    thread::sleep(std::time::Duration::from_millis(100));
}`,
      solution: `use std::thread;
use std::sync::{mpsc, Arc, Mutex};

struct ThreadPool {
    workers: Vec<thread::JoinHandle<()>>,
    sender: mpsc::Sender<Box<dyn FnOnce() + Send>>,
}

impl ThreadPool {
    fn new(size: usize) -> Self {
        let (sender, receiver) = mpsc::channel::<Box<dyn FnOnce() + Send>>();
        let receiver = Arc::new(Mutex::new(receiver));
        let mut workers = Vec::with_capacity(size);

        for _ in 0..size {
            let rx = Arc::clone(&receiver);
            workers.push(thread::spawn(move || {
                loop {
                    let task = rx.lock().unwrap().recv();
                    match task {
                        Ok(f) => f(),
                        Err(_) => break,
                    }
                }
            }));
        }

        ThreadPool { workers, sender }
    }

    fn execute<F: FnOnce() + Send + 'static>(&self, f: F) {
        self.sender.send(Box::new(f)).unwrap();
    }
}

fn main() {
    let pool = ThreadPool::new(4);
    for i in 0..8 {
        pool.execute(move || {
            println!("Task {} running", i);
        });
    }
    thread::sleep(std::time::Duration::from_millis(100));
}`,
      hints: [
        'Share the receiver with Arc<Mutex<Receiver>>.',
        'Each worker loops, locking the receiver to get tasks.',
        'Tasks are Box<dyn FnOnce() + Send>.',
      ],
      concepts: ['thread pool', 'mpsc', 'Arc', 'Mutex', 'task queue'],
    },
    {
      id: 'rs-thread-10',
      title: 'Thread-safe Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a thread-safe counter using Arc and Mutex.',
      skeleton: `use std::sync::{Arc, Mutex};
use std::thread;

fn concurrent_count(n: usize) -> i32 {
    // Create a shared counter
    // Spawn n threads, each incrementing the counter 100 times
    // Return the final count
    todo!()
}

fn main() {
    println!("Count: {}", concurrent_count(10)); // 1000
}`,
      solution: `use std::sync::{Arc, Mutex};
use std::thread;

fn concurrent_count(n: usize) -> i32 {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..n {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            for _ in 0..100 {
                let mut num = counter.lock().unwrap();
                *num += 1;
            }
        }));
    }

    for handle in handles {
        handle.join().unwrap();
    }

    *counter.lock().unwrap()
}

fn main() {
    println!("Count: {}", concurrent_count(10));
}`,
      hints: [
        'Arc allows shared ownership across threads.',
        'Mutex provides interior mutability with locking.',
        'Clone the Arc for each thread, lock to access the value.',
      ],
      concepts: ['Arc', 'Mutex', 'shared state', 'thread-safe'],
    },
    {
      id: 'rs-thread-11',
      title: 'Producer-Consumer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Implement a producer-consumer pattern with threads.',
      skeleton: `use std::sync::mpsc;
use std::thread;

fn producer_consumer() -> Vec<i32> {
    // Producer thread sends numbers 1-10
    // Consumer collects them into a Vec
    // Return the collected Vec
    todo!()
}

fn main() {
    let results = producer_consumer();
    println!("{:?}", results);
}`,
      solution: `use std::sync::mpsc;
use std::thread;

fn producer_consumer() -> Vec<i32> {
    let (tx, rx) = mpsc::channel();

    let producer = thread::spawn(move || {
        for i in 1..=10 {
            tx.send(i).unwrap();
        }
    });

    let consumer = thread::spawn(move || {
        let mut results = Vec::new();
        while let Ok(val) = rx.recv() {
            results.push(val);
        }
        results
    });

    producer.join().unwrap();
    consumer.join().unwrap()
}

fn main() {
    let results = producer_consumer();
    println!("{:?}", results);
}`,
      hints: [
        'Use mpsc::channel for communication.',
        'The producer sends values, consumer receives.',
        'recv() blocks until a value arrives or the sender is dropped.',
      ],
      concepts: ['mpsc', 'producer-consumer', 'channel'],
    },
    {
      id: 'rs-thread-12',
      title: 'Thread Panic Handling',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Handle panics from spawned threads gracefully.',
      skeleton: `use std::thread;

fn safe_spawn<F, T>(f: F) -> Result<T, String>
where
    F: FnOnce() -> T + Send + 'static,
    T: Send + 'static,
{
    // Spawn a thread and handle potential panics
    // Return Ok(result) on success, Err(message) on panic
    todo!()
}

fn main() {
    let ok = safe_spawn(|| 42);
    println!("Ok: {:?}", ok);

    let err = safe_spawn(|| -> i32 { panic!("oops") });
    println!("Err: {:?}", err);
}`,
      solution: `use std::thread;

fn safe_spawn<F, T>(f: F) -> Result<T, String>
where
    F: FnOnce() -> T + Send + 'static,
    T: Send + 'static,
{
    let handle = thread::spawn(f);
    handle.join().map_err(|e| {
        if let Some(s) = e.downcast_ref::<&str>() {
            s.to_string()
        } else if let Some(s) = e.downcast_ref::<String>() {
            s.clone()
        } else {
            "Unknown panic".to_string()
        }
    })
}

fn main() {
    let ok = safe_spawn(|| 42);
    println!("Ok: {:?}", ok);

    let err = safe_spawn(|| -> i32 { panic!("oops") });
    println!("Err: {:?}", err);
}`,
      hints: [
        'join() returns Result<T, Box<dyn Any + Send>>.',
        'On panic, the Err contains the panic payload.',
        'Use downcast_ref to try extracting a string message.',
      ],
      concepts: ['panic handling', 'join', 'downcast', 'error recovery'],
    },
    {
      id: 'rs-thread-13',
      title: 'Missing move',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix the closure that fails to capture by move.',
      skeleton: `use std::thread;

fn main() {
    let msg = String::from("hello");
    let handle = thread::spawn(|| {
        println!("{}", msg); // error: closure may outlive borrowed value
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
        'Thread closures must own their data (threads may outlive the caller).',
        'Add the move keyword to transfer ownership.',
        'After move, msg is no longer available in main.',
      ],
      concepts: ['move', 'ownership', 'thread closure'],
    },
    {
      id: 'rs-thread-14',
      title: 'Forgotten Join',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a program that exits before threads complete.',
      skeleton: `use std::thread;

fn main() {
    for i in 0..5 {
        thread::spawn(move || {
            println!("Thread {} done", i);
        });
    }
    // Program may exit before threads finish!
    println!("Main done");
}`,
      solution: `use std::thread;

fn main() {
    let handles: Vec<_> = (0..5).map(|i| {
        thread::spawn(move || {
            println!("Thread {} done", i);
        })
    }).collect();

    for handle in handles {
        handle.join().unwrap();
    }
    println!("Main done");
}`,
      hints: [
        'Collect JoinHandles so you can wait for all threads.',
        'Call join() on each handle before exiting.',
        'Without join, main may exit before threads complete.',
      ],
      concepts: ['join', 'JoinHandle', 'thread lifecycle'],
    },
    {
      id: 'rs-thread-15',
      title: 'Shared Vec Without Sync',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix an attempt to share a Vec across threads without proper synchronization.',
      skeleton: `use std::thread;

fn main() {
    let mut results = vec![];
    let mut handles = vec![];
    for i in 0..5 {
        handles.push(thread::spawn(move || {
            results.push(i * i); // error: can't move results into multiple threads
        }));
    }
    for h in handles { h.join().unwrap(); }
    println!("{:?}", results);
}`,
      solution: `use std::thread;
use std::sync::{Arc, Mutex};

fn main() {
    let results = Arc::new(Mutex::new(vec![]));
    let mut handles = vec![];
    for i in 0..5 {
        let results = Arc::clone(&results);
        handles.push(thread::spawn(move || {
            results.lock().unwrap().push(i * i);
        }));
    }
    for h in handles { h.join().unwrap(); }
    println!("{:?}", results.lock().unwrap());
}`,
      hints: [
        'A Vec cannot be moved into multiple threads.',
        'Wrap in Arc<Mutex<Vec>> for shared, synchronized access.',
        'Clone the Arc for each thread.',
      ],
      concepts: ['Arc', 'Mutex', 'shared mutable state', 'thread safety'],
    },
    {
      id: 'rs-thread-16',
      title: 'Predict Thread Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the guaranteed output of a threaded program.',
      skeleton: `use std::thread;

fn main() {
    let handle = thread::spawn(|| {
        "hello from thread"
    });
    let result = handle.join().unwrap();
    println!("{}", result);
}`,
      solution: `hello from thread`,
      hints: [
        'join() blocks until the thread completes.',
        'The thread returns a &str.',
        'The output is deterministic because we join before printing.',
      ],
      concepts: ['join', 'thread return', 'deterministic output'],
    },
    {
      id: 'rs-thread-17',
      title: 'Predict Move Semantics',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict what happens with move closures and threads.',
      skeleton: `use std::thread;

fn main() {
    let v = vec![1, 2, 3];
    let handle = thread::spawn(move || {
        v.iter().sum::<i32>()
    });
    // Can we still use v here?
    // println!("{:?}", v); // would this compile?
    let sum = handle.join().unwrap();
    println!("sum = {}", sum);
}`,
      solution: `sum = 6`,
      hints: [
        'move transfers ownership of v to the thread.',
        'v is no longer available in main after the move.',
        'The thread computes 1+2+3 = 6.',
      ],
      concepts: ['move', 'ownership transfer', 'thread'],
    },
    {
      id: 'rs-thread-18',
      title: 'Predict Scoped Thread',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of scoped threads with shared borrows.',
      skeleton: `use std::thread;

fn main() {
    let mut data = vec![1, 2, 3];
    thread::scope(|s| {
        s.spawn(|| {
            println!("a: {:?}", &data);
        });
        s.spawn(|| {
            println!("b: {:?}", &data);
        });
    });
    data.push(4);
    println!("c: {:?}", data);
}`,
      solution: `a: [1, 2, 3]
b: [1, 2, 3]
c: [1, 2, 3, 4]`,
      hints: [
        'Both scoped threads borrow data immutably.',
        'Thread output order (a vs b) may vary, but both see [1,2,3].',
        'After scope, data is available again and push adds 4.',
      ],
      concepts: ['scoped threads', 'shared borrow', 'thread ordering'],
    },
    {
      id: 'rs-thread-19',
      title: 'Refactor Sequential to Parallel',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor sequential computation to use parallel threads.',
      skeleton: `fn heavy_compute(x: i32) -> i32 {
    // simulate heavy work
    x * x + x
}

fn process_all(data: &[i32]) -> Vec<i32> {
    let mut results = Vec::new();
    for &item in data {
        results.push(heavy_compute(item));
    }
    results
}

fn main() {
    let data = vec![1, 2, 3, 4, 5, 6, 7, 8];
    println!("{:?}", process_all(&data));
}`,
      solution: `use std::thread;

fn heavy_compute(x: i32) -> i32 {
    x * x + x
}

fn process_all(data: &[i32]) -> Vec<i32> {
    thread::scope(|s| {
        let handles: Vec<_> = data.iter()
            .map(|&item| s.spawn(move || heavy_compute(item)))
            .collect();
        handles.into_iter()
            .map(|h| h.join().unwrap())
            .collect()
    })
}

fn main() {
    let data = vec![1, 2, 3, 4, 5, 6, 7, 8];
    println!("{:?}", process_all(&data));
}`,
      hints: [
        'Use thread::scope for safe parallel processing.',
        'Spawn a thread for each item.',
        'Collect handles and join to get ordered results.',
      ],
      concepts: ['parallelism', 'scoped threads', 'refactoring'],
    },
    {
      id: 'rs-thread-20',
      title: 'Refactor Global State',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor unsafe global state to thread-safe shared state.',
      skeleton: `static mut LOGS: Vec<String> = Vec::new();

fn log(msg: &str) {
    unsafe {
        LOGS.push(msg.to_string());
    }
}

fn get_logs() -> Vec<String> {
    unsafe {
        LOGS.clone()
    }
}

fn main() {
    log("start");
    log("processing");
    log("done");
    println!("{:?}", get_logs());
}`,
      solution: `use std::sync::Mutex;

static LOGS: Mutex<Vec<String>> = Mutex::new(Vec::new());

fn log(msg: &str) {
    LOGS.lock().unwrap().push(msg.to_string());
}

fn get_logs() -> Vec<String> {
    LOGS.lock().unwrap().clone()
}

fn main() {
    log("start");
    log("processing");
    log("done");
    println!("{:?}", get_logs());
}`,
      hints: [
        'Replace static mut with a Mutex for thread safety.',
        'Mutex<Vec<String>> can be a static since Mutex is Sync.',
        'Lock before each access.',
      ],
      concepts: ['Mutex', 'static', 'thread safety', 'global state'],
    },
  ],
};
