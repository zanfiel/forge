import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-chan',
  title: '26. Concurrency: Channels',
  explanation: `## Concurrency: Channels

Rust uses **message passing** for safe communication between threads via channels.

### mpsc Channel
\`\`\`rust
use std::sync::mpsc;

let (tx, rx) = mpsc::channel();
tx.send(42).unwrap();
let val = rx.recv().unwrap(); // 42
\`\`\`

### Multiple Producers
\`\`\`rust
let (tx, rx) = mpsc::channel();
let tx2 = tx.clone();
thread::spawn(move || tx.send("from 1").unwrap());
thread::spawn(move || tx2.send("from 2").unwrap());
for msg in rx { println!("{msg}"); }
\`\`\`

### Sync Channel (Bounded)
\`\`\`rust
let (tx, rx) = mpsc::sync_channel(2); // buffer of 2
tx.send(1).unwrap(); // non-blocking (buffer space)
tx.send(2).unwrap(); // non-blocking
tx.send(3).unwrap(); // BLOCKS until receiver reads
\`\`\`

### try_recv (Non-Blocking)
\`\`\`rust
match rx.try_recv() {
    Ok(val) => println!("Got {val}"),
    Err(mpsc::TryRecvError::Empty) => println!("Nothing yet"),
    Err(mpsc::TryRecvError::Disconnected) => println!("Channel closed"),
}
\`\`\`

### Iterating a Receiver
\`\`\`rust
drop(tx); // close the sending side
for val in rx {
    println!("{val}"); // iterates until channel is closed
}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-chan-1',
      title: 'Create a Channel',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create an mpsc channel and send a value.',
      skeleton: `use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::__BLANK__();
    tx.send(42).unwrap();
    println!("{}", rx.recv().unwrap());
}`,
      solution: `use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();
    tx.send(42).unwrap();
    println!("{}", rx.recv().unwrap());
}`,
      hints: [
        'mpsc::channel() creates a new asynchronous channel.',
        'It returns a (Sender, Receiver) tuple.',
        'The answer is channel.',
      ],
      concepts: ['mpsc', 'channel', 'send', 'recv'],
    },
    {
      id: 'rs-chan-2',
      title: 'Send a String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Send a String value through a channel.',
      skeleton: `use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();
    let msg = String::from("hello");
    tx.__BLANK__(msg).unwrap();
    println!("{}", rx.recv().unwrap());
}`,
      solution: `use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();
    let msg = String::from("hello");
    tx.send(msg).unwrap();
    println!("{}", rx.recv().unwrap());
}`,
      hints: [
        'The Sender has a send() method.',
        'send() takes ownership of the value.',
        'The answer is send.',
      ],
      concepts: ['mpsc', 'send', 'ownership-transfer'],
    },
    {
      id: 'rs-chan-3',
      title: 'Receive from Channel',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Receive a value from a channel using the blocking recv method.',
      skeleton: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    thread::spawn(move || {
        tx.send(99).unwrap();
    });
    let val = rx.__BLANK__().unwrap();
    println!("{val}");
}`,
      solution: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    thread::spawn(move || {
        tx.send(99).unwrap();
    });
    let val = rx.recv().unwrap();
    println!("{val}");
}`,
      hints: [
        'recv() blocks until a value is available.',
        'It returns Result<T, RecvError>.',
        'The answer is recv.',
      ],
      concepts: ['mpsc', 'recv', 'blocking'],
    },
    {
      id: 'rs-chan-4',
      title: 'Channel Between Threads',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Move the sender into a spawned thread with the move keyword.',
      skeleton: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    thread::spawn(__BLANK__ || {
        tx.send("from thread").unwrap();
    });
    println!("{}", rx.recv().unwrap());
}`,
      solution: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    thread::spawn(move || {
        tx.send("from thread").unwrap();
    });
    println!("{}", rx.recv().unwrap());
}`,
      hints: [
        'The closure needs ownership of tx.',
        'Use the move keyword before the closure.',
        'The answer is move.',
      ],
      concepts: ['mpsc', 'move-closure', 'thread'],
    },
    {
      id: 'rs-chan-5',
      title: 'Clone Sender',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Clone the sender to allow multiple producers.',
      skeleton: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    let tx2 = tx.__BLANK__();
    thread::spawn(move || { tx.send(1).unwrap(); });
    thread::spawn(move || { tx2.send(2).unwrap(); });
    for val in rx {
        println!("{val}");
    }
}`,
      solution: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    let tx2 = tx.clone();
    thread::spawn(move || { tx.send(1).unwrap(); });
    thread::spawn(move || { tx2.send(2).unwrap(); });
    for val in rx {
        println!("{val}");
    }
}`,
      hints: [
        'Sender implements Clone.',
        'Cloning a sender creates another producer for the same channel.',
        'The answer is clone.',
      ],
      concepts: ['mpsc', 'clone', 'multiple-producers'],
    },
    {
      id: 'rs-chan-6',
      title: 'Sync Channel',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a bounded synchronous channel with a buffer of 3.',
      skeleton: `use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::__BLANK__(3);
    tx.send(1).unwrap();
    tx.send(2).unwrap();
    tx.send(3).unwrap();
    println!("{}", rx.recv().unwrap());
}`,
      solution: `use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::sync_channel(3);
    tx.send(1).unwrap();
    tx.send(2).unwrap();
    tx.send(3).unwrap();
    println!("{}", rx.recv().unwrap());
}`,
      hints: [
        'sync_channel creates a bounded channel.',
        'The argument is the buffer capacity.',
        'The answer is sync_channel.',
      ],
      concepts: ['sync_channel', 'bounded-channel', 'backpressure'],
    },
    {
      id: 'rs-chan-7',
      title: 'Send Multiple Values',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a function that sends numbers 1 through 5 on a channel.',
      skeleton: `use std::sync::mpsc::Sender;

// Send numbers 1 through 5 on the given sender
fn send_numbers(tx: Sender<i32>) {
    // TODO: send 1, 2, 3, 4, 5
}`,
      solution: `use std::sync::mpsc::Sender;

fn send_numbers(tx: Sender<i32>) {
    for i in 1..=5 {
        tx.send(i).unwrap();
    }
}`,
      hints: [
        'Use a for loop with range 1..=5.',
        'Call tx.send(i) for each value.',
        'Unwrap the Result from send().',
      ],
      concepts: ['mpsc', 'Sender', 'loop', 'send'],
    },
    {
      id: 'rs-chan-8',
      title: 'Collect from Channel',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a function that spawns a thread to send values and collects them into a Vec.',
      skeleton: `use std::sync::mpsc;
use std::thread;

// Spawn a thread that sends 1..=n, collect results into Vec
fn collect_from_thread(n: i32) -> Vec<i32> {
    // TODO
}`,
      solution: `use std::sync::mpsc;
use std::thread;

fn collect_from_thread(n: i32) -> Vec<i32> {
    let (tx, rx) = mpsc::channel();
    thread::spawn(move || {
        for i in 1..=n {
            tx.send(i).unwrap();
        }
    });
    rx.into_iter().collect()
}`,
      hints: [
        'Create a channel, spawn a thread with the sender.',
        'The receiver implements IntoIterator.',
        'Use rx.into_iter().collect() to gather all values.',
      ],
      concepts: ['mpsc', 'thread::spawn', 'into_iter', 'collect'],
    },
    {
      id: 'rs-chan-9',
      title: 'try_recv Non-Blocking',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a function that drains all available messages using try_recv.',
      skeleton: `use std::sync::mpsc::Receiver;

// Drain all currently available messages without blocking
fn drain_available(rx: &Receiver<String>) -> Vec<String> {
    // TODO
}`,
      solution: `use std::sync::mpsc::Receiver;

fn drain_available(rx: &Receiver<String>) -> Vec<String> {
    let mut results = Vec::new();
    while let Ok(msg) = rx.try_recv() {
        results.push(msg);
    }
    results
}`,
      hints: [
        'try_recv returns immediately with Ok or Err.',
        'Use while let Ok(msg) = rx.try_recv() to drain.',
        'Collect into a Vec and return.',
      ],
      concepts: ['try_recv', 'non-blocking', 'while-let'],
    },
    {
      id: 'rs-chan-10',
      title: 'Multiple Producers Sum',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Spawn multiple threads that each send a partial sum, then sum the results.',
      skeleton: `use std::sync::mpsc;
use std::thread;

// Spawn n threads, each sends its index (0..n), return the sum
fn parallel_sum(n: usize) -> usize {
    // TODO
}`,
      solution: `use std::sync::mpsc;
use std::thread;

fn parallel_sum(n: usize) -> usize {
    let (tx, rx) = mpsc::channel();
    for i in 0..n {
        let tx = tx.clone();
        thread::spawn(move || {
            tx.send(i).unwrap();
        });
    }
    drop(tx);
    rx.into_iter().sum()
}`,
      hints: [
        'Clone the sender for each thread.',
        'Drop the original sender so the receiver iterator ends.',
        'Use rx.into_iter().sum() to add up all values.',
      ],
      concepts: ['mpsc', 'clone', 'drop', 'multiple-producers', 'sum'],
    },
    {
      id: 'rs-chan-11',
      title: 'Send Enum Messages',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Define a Message enum and send different variants through a channel.',
      skeleton: `use std::sync::mpsc;

enum Message {
    Text(String),
    Number(i32),
    Quit,
}

// Send a Text, a Number, then Quit through the channel
fn send_messages(tx: mpsc::Sender<Message>) {
    // TODO
}`,
      solution: `use std::sync::mpsc;

enum Message {
    Text(String),
    Number(i32),
    Quit,
}

fn send_messages(tx: mpsc::Sender<Message>) {
    tx.send(Message::Text("hello".to_string())).unwrap();
    tx.send(Message::Number(42)).unwrap();
    tx.send(Message::Quit).unwrap();
}`,
      hints: [
        'Use tx.send() with each enum variant.',
        'Construct Text with a String, Number with an i32.',
        'Send Quit last to signal termination.',
      ],
      concepts: ['mpsc', 'enum', 'message-passing', 'protocol'],
    },
    {
      id: 'rs-chan-12',
      title: 'Timeout Receive',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Receive from a channel with a timeout, returning None on timeout.',
      skeleton: `use std::sync::mpsc::Receiver;
use std::time::Duration;

// Try to receive with a 100ms timeout
fn recv_with_timeout(rx: &Receiver<i32>) -> Option<i32> {
    // TODO
}`,
      solution: `use std::sync::mpsc::Receiver;
use std::time::Duration;

fn recv_with_timeout(rx: &Receiver<i32>) -> Option<i32> {
    rx.recv_timeout(Duration::from_millis(100)).ok()
}`,
      hints: [
        'Receiver has a recv_timeout method.',
        'It takes a Duration argument.',
        'Convert the Result to Option with .ok().',
      ],
      concepts: ['recv_timeout', 'Duration', 'timeout'],
    },
    {
      id: 'rs-chan-13',
      title: 'Bug: Use After Send',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix the code that tries to use a value after sending it through a channel.',
      skeleton: `use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();
    let msg = String::from("hello");
    tx.send(msg).unwrap();
    println!("Sent: {msg}");
    println!("Received: {}", rx.recv().unwrap());
}`,
      solution: `use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();
    let msg = String::from("hello");
    println!("Sending: {msg}");
    tx.send(msg).unwrap();
    println!("Received: {}", rx.recv().unwrap());
}`,
      hints: [
        'send() takes ownership of the value.',
        'You cannot use msg after sending it.',
        'Print the message before sending it.',
      ],
      concepts: ['ownership', 'send', 'move-semantics'],
    },
    {
      id: 'rs-chan-14',
      title: 'Bug: Deadlock on Receiver',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the deadlock caused by not dropping the sender.',
      skeleton: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    let tx2 = tx.clone();
    thread::spawn(move || { tx2.send(1).unwrap(); });
    thread::spawn(move || { tx.send(2).unwrap(); });
    // This hangs forever!
    let results: Vec<i32> = rx.into_iter().collect();
    println!("{:?}", results);
}`,
      solution: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    let tx2 = tx.clone();
    thread::spawn(move || { tx2.send(1).unwrap(); });
    // Drop the original sender before iterating
    drop(tx);
    let results: Vec<i32> = rx.into_iter().collect();
    println!("{:?}", results);
}`,
      hints: [
        'rx.into_iter() blocks until all senders are dropped.',
        'There is still an un-moved sender (tx) in main.',
        'Drop tx before iterating. Note: we only need one thread since we dropped a sender.',
      ],
      concepts: ['deadlock', 'drop', 'into_iter', 'channel-closing'],
    },
    {
      id: 'rs-chan-15',
      title: 'Bug: Send on Closed Channel',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the code that panics because the receiver is dropped before sending.',
      skeleton: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    drop(rx);
    thread::spawn(move || {
        tx.send(42).unwrap(); // panics!
    }).join().unwrap();
}`,
      solution: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    thread::spawn(move || {
        tx.send(42).unwrap();
    });
    let val = rx.recv().unwrap();
    println!("{val}");
}`,
      hints: [
        'Dropping the receiver closes the channel.',
        'send() returns Err when the receiver is gone.',
        'Remove the drop(rx) and actually use the receiver.',
      ],
      concepts: ['channel-closed', 'SendError', 'drop'],
    },
    {
      id: 'rs-chan-16',
      title: 'Predict: Channel Iteration',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the output of iterating over a channel.',
      skeleton: `use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();
    tx.send(10).unwrap();
    tx.send(20).unwrap();
    tx.send(30).unwrap();
    drop(tx);
    let sum: i32 = rx.into_iter().sum();
    println!("{sum}");
}`,
      solution: `60`,
      hints: [
        'Three values are sent: 10, 20, 30.',
        'Dropping tx closes the channel, ending iteration.',
        'sum() adds them: 10 + 20 + 30.',
      ],
      concepts: ['into_iter', 'sum', 'drop', 'channel-closing'],
    },
    {
      id: 'rs-chan-17',
      title: 'Predict: Multiple Senders',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the count of messages received from multiple senders.',
      skeleton: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    for i in 0..3 {
        let tx = tx.clone();
        thread::spawn(move || {
            tx.send(i).unwrap();
        });
    }
    drop(tx);
    let count = rx.into_iter().count();
    println!("{count}");
}`,
      solution: `3`,
      hints: [
        'Three threads are spawned, each sends one value.',
        'The original tx is dropped so the iterator can end.',
        'count() returns the number of items: 3.',
      ],
      concepts: ['mpsc', 'clone', 'count', 'multiple-producers'],
    },
    {
      id: 'rs-chan-18',
      title: 'Predict: Sync Channel Capacity',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict what happens with a zero-capacity sync channel.',
      skeleton: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::sync_channel(0);
    thread::spawn(move || {
        tx.send("A").unwrap();
        tx.send("B").unwrap();
    });
    let a = rx.recv().unwrap();
    let b = rx.recv().unwrap();
    println!("{a}{b}");
}`,
      solution: `AB`,
      hints: [
        'A zero-capacity sync_channel is a rendezvous channel.',
        'Each send blocks until the receiver calls recv.',
        'Both sends complete in order: A then B.',
      ],
      concepts: ['sync_channel', 'rendezvous', 'zero-capacity'],
    },
    {
      id: 'rs-chan-19',
      title: 'Refactor: Replace Mutex with Channel',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor shared mutable state with a Mutex into message passing with a channel.',
      skeleton: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    for _ in 0..5 {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        }));
    }
    for h in handles { h.join().unwrap(); }
    println!("{}", *counter.lock().unwrap());
}`,
      solution: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    let mut handles = vec![];
    for _ in 0..5 {
        let tx = tx.clone();
        handles.push(thread::spawn(move || {
            tx.send(1).unwrap();
        }));
    }
    drop(tx);
    for h in handles { h.join().unwrap(); }
    let total: i32 = rx.into_iter().sum();
    println!("{total}");
}`,
      hints: [
        'Instead of locking a shared counter, send increments through a channel.',
        'Each thread sends 1, then sum all received values.',
        'Drop the original sender so the iterator terminates.',
      ],
      concepts: ['message-passing', 'refactor', 'mpsc', 'Arc', 'Mutex'],
    },
    {
      id: 'rs-chan-20',
      title: 'Refactor: Pipeline Pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor sequential processing into a channel-based pipeline with two stages.',
      skeleton: `fn main() {
    let data = vec![1, 2, 3, 4, 5];
    let doubled: Vec<i32> = data.iter().map(|x| x * 2).collect();
    let filtered: Vec<i32> = doubled.into_iter().filter(|x| *x > 4).collect();
    let sum: i32 = filtered.into_iter().sum();
    println!("{sum}");
}`,
      solution: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx1, rx1) = mpsc::channel();
    let (tx2, rx2) = mpsc::channel();

    // Stage 1: double
    thread::spawn(move || {
        for i in [1, 2, 3, 4, 5] {
            tx1.send(i * 2).unwrap();
        }
    });

    // Stage 2: filter > 4
    thread::spawn(move || {
        for val in rx1 {
            if val > 4 {
                tx2.send(val).unwrap();
            }
        }
    });

    let sum: i32 = rx2.into_iter().sum();
    println!("{sum}");
}`,
      hints: [
        'Create two channels: one between stage 1 and stage 2, one for output.',
        'Stage 1 doubles and sends; stage 2 filters and forwards.',
        'The final receiver collects and sums the output.',
      ],
      concepts: ['pipeline', 'channel-chaining', 'concurrent-processing'],
    },
  ],
};
