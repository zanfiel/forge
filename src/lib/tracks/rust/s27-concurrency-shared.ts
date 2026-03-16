import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-shared',
  title: '27. Concurrency: Shared State',
  explanation: `## Concurrency: Shared State

Rust allows shared mutable state through synchronization primitives, with compile-time safety.

### Mutex<T>
\`\`\`rust
use std::sync::Mutex;

let m = Mutex::new(5);
{
    let mut num = m.lock().unwrap();
    *num = 6;
} // lock released when MutexGuard is dropped
\`\`\`

### Arc<Mutex<T>> for Threads
\`\`\`rust
use std::sync::{Arc, Mutex};
use std::thread;

let counter = Arc::new(Mutex::new(0));
let c = Arc::clone(&counter);
thread::spawn(move || {
    *c.lock().unwrap() += 1;
}).join().unwrap();
\`\`\`

### RwLock<T>
\`\`\`rust
use std::sync::RwLock;

let lock = RwLock::new(5);
{ let r = lock.read().unwrap(); }   // multiple readers OK
{ let mut w = lock.write().unwrap(); *w += 1; } // exclusive writer
\`\`\`

### Atomics
\`\`\`rust
use std::sync::atomic::{AtomicUsize, Ordering};

let counter = AtomicUsize::new(0);
counter.fetch_add(1, Ordering::SeqCst);
\`\`\`

### Barrier
\`\`\`rust
use std::sync::{Arc, Barrier};
let barrier = Arc::new(Barrier::new(3));
// All 3 threads must reach barrier.wait() before any proceed
\`\`\`
`,
  exercises: [
    {
      id: 'rs-shared-1',
      title: 'Create a Mutex',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a Mutex holding the value 0.',
      skeleton: `use std::sync::Mutex;

fn main() {
    let m = Mutex::__BLANK__(0);
    let mut num = m.lock().unwrap();
    *num += 1;
    println!("{num}");
}`,
      solution: `use std::sync::Mutex;

fn main() {
    let m = Mutex::new(0);
    let mut num = m.lock().unwrap();
    *num += 1;
    println!("{num}");
}`,
      hints: [
        'Mutex::new() creates a new Mutex wrapping a value.',
        'It takes the initial value as an argument.',
        'The answer is new.',
      ],
      concepts: ['Mutex', 'new', 'lock'],
    },
    {
      id: 'rs-shared-2',
      title: 'Lock a Mutex',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Acquire the lock on a Mutex to read its value.',
      skeleton: `use std::sync::Mutex;

fn main() {
    let m = Mutex::new(42);
    let val = m.__BLANK__().unwrap();
    println!("{val}");
}`,
      solution: `use std::sync::Mutex;

fn main() {
    let m = Mutex::new(42);
    let val = m.lock().unwrap();
    println!("{val}");
}`,
      hints: [
        'The lock() method acquires the mutex.',
        'It returns a MutexGuard wrapped in a Result.',
        'The answer is lock.',
      ],
      concepts: ['Mutex', 'lock', 'MutexGuard'],
    },
    {
      id: 'rs-shared-3',
      title: 'Arc for Sharing',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Clone an Arc to share a Mutex between threads.',
      skeleton: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let data = Arc::new(Mutex::new(0));
    let data2 = Arc::__BLANK__(&data);
    thread::spawn(move || {
        *data2.lock().unwrap() += 1;
    }).join().unwrap();
    println!("{}", *data.lock().unwrap());
}`,
      solution: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let data = Arc::new(Mutex::new(0));
    let data2 = Arc::clone(&data);
    thread::spawn(move || {
        *data2.lock().unwrap() += 1;
    }).join().unwrap();
    println!("{}", *data.lock().unwrap());
}`,
      hints: [
        'Arc::clone creates a new reference-counted pointer.',
        'It increments the reference count atomically.',
        'The answer is clone.',
      ],
      concepts: ['Arc', 'clone', 'thread-sharing'],
    },
    {
      id: 'rs-shared-4',
      title: 'RwLock Read',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Acquire a read lock on an RwLock.',
      skeleton: `use std::sync::RwLock;

fn main() {
    let lock = RwLock::new(vec![1, 2, 3]);
    let data = lock.__BLANK__().unwrap();
    println!("Length: {}", data.len());
}`,
      solution: `use std::sync::RwLock;

fn main() {
    let lock = RwLock::new(vec![1, 2, 3]);
    let data = lock.read().unwrap();
    println!("Length: {}", data.len());
}`,
      hints: [
        'RwLock allows multiple concurrent readers.',
        'Use read() for shared access.',
        'The answer is read.',
      ],
      concepts: ['RwLock', 'read', 'shared-access'],
    },
    {
      id: 'rs-shared-5',
      title: 'RwLock Write',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Acquire a write lock on an RwLock to mutate data.',
      skeleton: `use std::sync::RwLock;

fn main() {
    let lock = RwLock::new(vec![1, 2, 3]);
    {
        let mut data = lock.__BLANK__().unwrap();
        data.push(4);
    }
    let data = lock.read().unwrap();
    println!("{:?}", *data);
}`,
      solution: `use std::sync::RwLock;

fn main() {
    let lock = RwLock::new(vec![1, 2, 3]);
    {
        let mut data = lock.write().unwrap();
        data.push(4);
    }
    let data = lock.read().unwrap();
    println!("{:?}", *data);
}`,
      hints: [
        'write() acquires exclusive access.',
        'Only one writer at a time, no concurrent readers.',
        'The answer is write.',
      ],
      concepts: ['RwLock', 'write', 'exclusive-access'],
    },
    {
      id: 'rs-shared-6',
      title: 'Atomic Counter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use AtomicUsize to atomically increment a counter.',
      skeleton: `use std::sync::atomic::{AtomicUsize, Ordering};

fn main() {
    let counter = AtomicUsize::new(0);
    counter.__BLANK__(1, Ordering::SeqCst);
    counter.__BLANK__(1, Ordering::SeqCst);
    println!("{}", counter.load(Ordering::SeqCst));
}`,
      solution: `use std::sync::atomic::{AtomicUsize, Ordering};

fn main() {
    let counter = AtomicUsize::new(0);
    counter.fetch_add(1, Ordering::SeqCst);
    counter.fetch_add(1, Ordering::SeqCst);
    println!("{}", counter.load(Ordering::SeqCst));
}`,
      hints: [
        'fetch_add atomically adds to the value.',
        'It takes the increment and a memory ordering.',
        'The answer is fetch_add.',
      ],
      concepts: ['AtomicUsize', 'fetch_add', 'Ordering'],
    },
    {
      id: 'rs-shared-7',
      title: 'Thread-Safe Counter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a function that increments a shared counter from multiple threads.',
      skeleton: `use std::sync::{Arc, Mutex};
use std::thread;

// Spawn n threads, each increments counter by 1, return final count
fn threaded_count(n: u32) -> u32 {
    // TODO
}`,
      solution: `use std::sync::{Arc, Mutex};
use std::thread;

fn threaded_count(n: u32) -> u32 {
    let counter = Arc::new(Mutex::new(0u32));
    let mut handles = vec![];
    for _ in 0..n {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            *counter.lock().unwrap() += 1;
        }));
    }
    for h in handles {
        h.join().unwrap();
    }
    *counter.lock().unwrap()
}`,
      hints: [
        'Wrap the counter in Arc<Mutex<u32>>.',
        'Clone the Arc for each thread.',
        'Join all threads before reading the final value.',
      ],
      concepts: ['Arc', 'Mutex', 'thread::spawn', 'join'],
    },
    {
      id: 'rs-shared-8',
      title: 'Parallel Sum with Mutex',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Compute the sum of a slice by splitting work across threads using a shared accumulator.',
      skeleton: `use std::sync::{Arc, Mutex};
use std::thread;

// Sum the elements of data using num_threads threads
fn parallel_sum(data: &[i64], num_threads: usize) -> i64 {
    // TODO
}`,
      solution: `use std::sync::{Arc, Mutex};
use std::thread;

fn parallel_sum(data: &[i64], num_threads: usize) -> i64 {
    let sum = Arc::new(Mutex::new(0i64));
    let chunks: Vec<Vec<i64>> = data
        .chunks((data.len() + num_threads - 1) / num_threads)
        .map(|c| c.to_vec())
        .collect();
    let mut handles = vec![];
    for chunk in chunks {
        let sum = Arc::clone(&sum);
        handles.push(thread::spawn(move || {
            let partial: i64 = chunk.iter().sum();
            *sum.lock().unwrap() += partial;
        }));
    }
    for h in handles {
        h.join().unwrap();
    }
    *sum.lock().unwrap()
}`,
      hints: [
        'Split the data into chunks, one per thread.',
        'Each thread computes a partial sum and adds it to the shared total.',
        'Use Arc<Mutex<i64>> for the shared accumulator.',
      ],
      concepts: ['Arc', 'Mutex', 'chunks', 'parallel-sum'],
    },
    {
      id: 'rs-shared-9',
      title: 'RwLock Cache',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement a simple thread-safe cache using RwLock and HashMap.',
      skeleton: `use std::collections::HashMap;
use std::sync::RwLock;

struct Cache {
    data: RwLock<HashMap<String, String>>,
}

impl Cache {
    fn new() -> Self {
        // TODO
    }

    fn get(&self, key: &str) -> Option<String> {
        // TODO
    }

    fn set(&self, key: String, value: String) {
        // TODO
    }
}`,
      solution: `use std::collections::HashMap;
use std::sync::RwLock;

struct Cache {
    data: RwLock<HashMap<String, String>>,
}

impl Cache {
    fn new() -> Self {
        Cache {
            data: RwLock::new(HashMap::new()),
        }
    }

    fn get(&self, key: &str) -> Option<String> {
        let map = self.data.read().unwrap();
        map.get(key).cloned()
    }

    fn set(&self, key: String, value: String) {
        let mut map = self.data.write().unwrap();
        map.insert(key, value);
    }
}`,
      hints: [
        'Use read() for get (shared access) and write() for set (exclusive).',
        'Clone the value in get() since we return owned data.',
        'RwLock allows concurrent reads, exclusive writes.',
      ],
      concepts: ['RwLock', 'HashMap', 'cache', 'interior-mutability'],
    },
    {
      id: 'rs-shared-10',
      title: 'Atomic Flag',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use AtomicBool as a stop flag for a worker thread.',
      skeleton: `use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::thread;

// Spawn a thread that counts until stop flag is set, return the count
fn count_until_stopped(stop_after_ms: u64) -> u64 {
    // TODO
}`,
      solution: `use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::thread;
use std::time::Duration;

fn count_until_stopped(stop_after_ms: u64) -> u64 {
    let running = Arc::new(AtomicBool::new(true));
    let running2 = Arc::clone(&running);
    let handle = thread::spawn(move || {
        let mut count = 0u64;
        while running2.load(Ordering::Relaxed) {
            count += 1;
            thread::yield_now();
        }
        count
    });
    thread::sleep(Duration::from_millis(stop_after_ms));
    running.store(false, Ordering::Relaxed);
    handle.join().unwrap()
}`,
      hints: [
        'Create an AtomicBool wrapped in Arc, shared between threads.',
        'The worker loops while the flag is true.',
        'The main thread sleeps then sets the flag to false.',
      ],
      concepts: ['AtomicBool', 'Arc', 'stop-flag', 'Ordering'],
    },
    {
      id: 'rs-shared-11',
      title: 'Barrier Synchronization',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Use a Barrier to synchronize multiple threads at a checkpoint.',
      skeleton: `use std::sync::{Arc, Barrier, Mutex};
use std::thread;

// Spawn n threads, each writes its index to results, then waits at barrier,
// then writes index + 100. Return collected results.
fn barrier_demo(n: usize) -> Vec<usize> {
    // TODO
}`,
      solution: `use std::sync::{Arc, Barrier, Mutex};
use std::thread;

fn barrier_demo(n: usize) -> Vec<usize> {
    let barrier = Arc::new(Barrier::new(n));
    let results = Arc::new(Mutex::new(Vec::new()));
    let mut handles = vec![];
    for i in 0..n {
        let barrier = Arc::clone(&barrier);
        let results = Arc::clone(&results);
        handles.push(thread::spawn(move || {
            results.lock().unwrap().push(i);
            barrier.wait();
            results.lock().unwrap().push(i + 100);
        }));
    }
    for h in handles {
        h.join().unwrap();
    }
    let mut r = results.lock().unwrap().clone();
    r.sort();
    r
}`,
      hints: [
        'Create a Barrier with n participants.',
        'Each thread pushes its index, waits, then pushes index + 100.',
        'All threads must reach wait() before any proceed past it.',
      ],
      concepts: ['Barrier', 'synchronization', 'Arc', 'Mutex'],
    },
    {
      id: 'rs-shared-12',
      title: 'Once Initialization',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Use Once to ensure a global value is initialized exactly once.',
      skeleton: `use std::sync::Once;

static INIT: Once = Once::new();
static mut VALUE: usize = 0;

// Initialize VALUE to val exactly once, return current VALUE
fn get_or_init(val: usize) -> usize {
    // TODO (use unsafe for static mut)
}`,
      solution: `use std::sync::Once;

static INIT: Once = Once::new();
static mut VALUE: usize = 0;

fn get_or_init(val: usize) -> usize {
    INIT.call_once(|| {
        unsafe {
            VALUE = val;
        }
    });
    unsafe { VALUE }
}`,
      hints: [
        'Once::call_once runs the closure at most once.',
        'Accessing static mut requires unsafe.',
        'Subsequent calls to call_once are no-ops.',
      ],
      concepts: ['Once', 'call_once', 'static-mut', 'unsafe'],
    },
    {
      id: 'rs-shared-13',
      title: 'Bug: Missing Arc',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix the code that tries to share a Mutex between threads without Arc.',
      skeleton: `use std::sync::Mutex;
use std::thread;

fn main() {
    let counter = Mutex::new(0);
    let mut handles = vec![];
    for _ in 0..5 {
        let counter = counter.clone();
        handles.push(thread::spawn(move || {
            *counter.lock().unwrap() += 1;
        }));
    }
    for h in handles { h.join().unwrap(); }
    println!("{}", *counter.lock().unwrap());
}`,
      solution: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    for _ in 0..5 {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            *counter.lock().unwrap() += 1;
        }));
    }
    for h in handles { h.join().unwrap(); }
    println!("{}", *counter.lock().unwrap());
}`,
      hints: [
        'Mutex does not implement Clone.',
        'Wrap the Mutex in Arc for thread-safe sharing.',
        'Use Arc::clone instead of .clone() on the Mutex.',
      ],
      concepts: ['Arc', 'Mutex', 'thread-sharing', 'Clone'],
    },
    {
      id: 'rs-shared-14',
      title: 'Bug: Deadlock from Lock Order',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix a potential deadlock caused by inconsistent lock ordering.',
      skeleton: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let a = Arc::new(Mutex::new(1));
    let b = Arc::new(Mutex::new(2));
    let a2 = Arc::clone(&a);
    let b2 = Arc::clone(&b);

    let t1 = thread::spawn(move || {
        let _a = a2.lock().unwrap();
        thread::sleep(std::time::Duration::from_millis(10));
        let _b = b2.lock().unwrap();
        *_a + *_b
    });

    let t2 = thread::spawn(move || {
        let _b = b.lock().unwrap();
        thread::sleep(std::time::Duration::from_millis(10));
        let _a = a.lock().unwrap();
        *_a + *_b
    });

    println!("{}", t1.join().unwrap());
    println!("{}", t2.join().unwrap());
}`,
      solution: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let a = Arc::new(Mutex::new(1));
    let b = Arc::new(Mutex::new(2));
    let a2 = Arc::clone(&a);
    let b2 = Arc::clone(&b);

    let t1 = thread::spawn(move || {
        let _a = a2.lock().unwrap();
        let _b = b2.lock().unwrap();
        *_a + *_b
    });

    let t2 = thread::spawn(move || {
        let _a = a.lock().unwrap();
        let _b = b.lock().unwrap();
        *_a + *_b
    });

    println!("{}", t1.join().unwrap());
    println!("{}", t2.join().unwrap());
}`,
      hints: [
        'Deadlock occurs when two threads lock in opposite order.',
        'Always acquire locks in the same order (a then b).',
        'Remove the sleep and fix t2 to lock a before b.',
      ],
      concepts: ['deadlock', 'lock-ordering', 'Mutex'],
    },
    {
      id: 'rs-shared-15',
      title: 'Bug: Lock Held Across Await',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix code that holds a MutexGuard too long, blocking other threads.',
      skeleton: `use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;

fn main() {
    let data = Arc::new(Mutex::new(vec![1, 2, 3]));
    let d2 = Arc::clone(&data);
    let t = thread::spawn(move || {
        let guard = d2.lock().unwrap();
        thread::sleep(Duration::from_secs(2)); // holds lock for 2s!
        guard.len()
    });
    // This blocks for 2s waiting for lock
    let d = data.lock().unwrap();
    println!("len: {}", d.len());
    drop(d);
    println!("thread len: {}", t.join().unwrap());
}`,
      solution: `use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;

fn main() {
    let data = Arc::new(Mutex::new(vec![1, 2, 3]));
    let d2 = Arc::clone(&data);
    let t = thread::spawn(move || {
        let len = {
            let guard = d2.lock().unwrap();
            guard.len()
        }; // lock released here
        thread::sleep(Duration::from_secs(2));
        len
    });
    let d = data.lock().unwrap();
    println!("len: {}", d.len());
    drop(d);
    println!("thread len: {}", t.join().unwrap());
}`,
      hints: [
        'The lock is held while sleeping, blocking everyone.',
        'Copy the needed data out, then drop the guard before sleeping.',
        'Use a block scope to limit how long the guard lives.',
      ],
      concepts: ['MutexGuard', 'lock-duration', 'scope'],
    },
    {
      id: 'rs-shared-16',
      title: 'Predict: Mutex Value',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the final value of a Mutex after multiple operations.',
      skeleton: `use std::sync::Mutex;

fn main() {
    let m = Mutex::new(10);
    {
        let mut v = m.lock().unwrap();
        *v += 5;
    }
    {
        let mut v = m.lock().unwrap();
        *v *= 2;
    }
    println!("{}", *m.lock().unwrap());
}`,
      solution: `30`,
      hints: [
        'Start with 10.',
        'First block: 10 + 5 = 15.',
        'Second block: 15 * 2 = 30.',
      ],
      concepts: ['Mutex', 'lock', 'sequential-mutation'],
    },
    {
      id: 'rs-shared-17',
      title: 'Predict: Atomic Operations',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of atomic fetch operations.',
      skeleton: `use std::sync::atomic::{AtomicI32, Ordering};

fn main() {
    let a = AtomicI32::new(10);
    let old = a.fetch_add(5, Ordering::SeqCst);
    println!("{old}");
    let old = a.fetch_sub(3, Ordering::SeqCst);
    println!("{old}");
    println!("{}", a.load(Ordering::SeqCst));
}`,
      solution: `10
15
12`,
      hints: [
        'fetch_add returns the OLD value before adding.',
        'First: old=10, new=15. Second: old=15, new=12.',
        'Final load reads 12.',
      ],
      concepts: ['AtomicI32', 'fetch_add', 'fetch_sub', 'old-value'],
    },
    {
      id: 'rs-shared-18',
      title: 'Predict: RwLock Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output after read and write lock operations.',
      skeleton: `use std::sync::RwLock;

fn main() {
    let lock = RwLock::new(String::from("hello"));
    {
        let r1 = lock.read().unwrap();
        let r2 = lock.read().unwrap();
        println!("{} {}", r1.len(), r2.len());
    }
    {
        let mut w = lock.write().unwrap();
        w.push_str(" world");
    }
    let r = lock.read().unwrap();
    println!("{}", *r);
}`,
      solution: `5 5
hello world`,
      hints: [
        'Multiple read locks can be held simultaneously.',
        '"hello" has length 5.',
        'After write appends " world", the string is "hello world".',
      ],
      concepts: ['RwLock', 'read', 'write', 'concurrent-reads'],
    },
    {
      id: 'rs-shared-19',
      title: 'Refactor: Mutex to Atomic',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor a Mutex<usize> counter to use AtomicUsize for better performance.',
      skeleton: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0usize));
    let mut handles = vec![];
    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            *counter.lock().unwrap() += 1;
        }));
    }
    for h in handles { h.join().unwrap(); }
    println!("{}", *counter.lock().unwrap());
}`,
      solution: `use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;
use std::thread;

fn main() {
    let counter = Arc::new(AtomicUsize::new(0));
    let mut handles = vec![];
    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            counter.fetch_add(1, Ordering::Relaxed);
        }));
    }
    for h in handles { h.join().unwrap(); }
    println!("{}", counter.load(Ordering::SeqCst));
}`,
      hints: [
        'AtomicUsize avoids lock overhead for simple operations.',
        'Use fetch_add(1, Ordering::Relaxed) instead of lock + increment.',
        'Use load(Ordering::SeqCst) for the final read.',
      ],
      concepts: ['AtomicUsize', 'Mutex', 'refactor', 'performance'],
    },
    {
      id: 'rs-shared-20',
      title: 'Refactor: Fine-Grained Locking',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor a single Mutex over a HashMap into per-key locking with a sharded approach.',
      skeleton: `use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let map = Arc::new(Mutex::new(HashMap::new()));
    let mut handles = vec![];
    for i in 0..4 {
        let map = Arc::clone(&map);
        handles.push(thread::spawn(move || {
            let mut m = map.lock().unwrap();
            m.insert(i, i * 10);
        }));
    }
    for h in handles { h.join().unwrap(); }
    let m = map.lock().unwrap();
    let mut vals: Vec<_> = m.values().cloned().collect();
    vals.sort();
    println!("{:?}", vals);
}`,
      solution: `use std::collections::HashMap;
use std::sync::{Arc, RwLock};
use std::thread;

fn main() {
    let map = Arc::new(RwLock::new(HashMap::new()));
    let mut handles = vec![];
    for i in 0..4 {
        let map = Arc::clone(&map);
        handles.push(thread::spawn(move || {
            map.write().unwrap().insert(i, i * 10);
        }));
    }
    for h in handles { h.join().unwrap(); }
    let m = map.read().unwrap();
    let mut vals: Vec<_> = m.values().cloned().collect();
    vals.sort();
    println!("{:?}", vals);
}`,
      hints: [
        'A Mutex blocks all access. An RwLock allows concurrent reads.',
        'Use write() for inserts and read() for lookups.',
        'This allows multiple threads to read the map simultaneously.',
      ],
      concepts: ['RwLock', 'HashMap', 'fine-grained-locking', 'concurrent-reads'],
    },
  ],
};
