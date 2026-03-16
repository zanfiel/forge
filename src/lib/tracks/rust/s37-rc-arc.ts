import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-rcarc',
  title: '37. Rc and Arc',
  explanation: `## Rc and Arc

\`Rc<T>\` (Reference Counted) enables shared ownership in single-threaded code. \`Arc<T>\` (Atomically Reference Counted) does the same across threads.

### Rc Basics
\`\`\`rust
use std::rc::Rc;

let a = Rc::new(String::from("shared"));
let b = Rc::clone(&a); // increment reference count
println!("count: {}", Rc::strong_count(&a)); // 2
\`\`\`

### Weak References
\`\`\`rust
use std::rc::{Rc, Weak};

let strong = Rc::new(5);
let weak: Weak<i32> = Rc::downgrade(&strong);

// weak.upgrade() returns Option<Rc<i32>>
if let Some(val) = weak.upgrade() {
    println!("{val}");
}
\`\`\`

### Arc for Thread Safety
\`\`\`rust
use std::sync::Arc;
use std::thread;

let data = Arc::new(vec![1, 2, 3]);
let data_clone = Arc::clone(&data);

thread::spawn(move || {
    println!("{:?}", data_clone);
});
\`\`\`

### Key Differences
| Feature | Rc | Arc |
|---------|-----|------|
| Thread-safe | No | Yes |
| Overhead | Lower | Higher (atomic ops) |
| Send/Sync | Neither | Both |
| Use case | Single-thread sharing | Multi-thread sharing |

### Preventing Cycles
Use \`Weak<T>\` for back-references in tree/graph structures to prevent reference cycles that leak memory.
`,
  exercises: [
    {
      id: 'rs-rcarc-1',
      title: 'Create an Rc',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a reference-counted value using Rc.',
      skeleton: `use std::rc::Rc;

fn main() {
    let data = __BLANK__(String::from("shared data"));
    println!("{data}");
}`,
      solution: `use std::rc::Rc;

fn main() {
    let data = Rc::new(String::from("shared data"));
    println!("{data}");
}`,
      hints: [
        'Rc::new() wraps a value in a reference-counted pointer.',
        'The syntax is Rc::new(value).',
        'Rc::new(String::from("shared data"))'
      ],
      concepts: ['rc', 'shared-ownership', 'reference-counting']
    },
    {
      id: 'rs-rcarc-2',
      title: 'Clone an Rc',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Clone an Rc to share ownership.',
      skeleton: `use std::rc::Rc;

fn main() {
    let a = Rc::new(42);
    let b = __BLANK__(&a);
    println!("a={a}, b={b}");
}`,
      solution: `use std::rc::Rc;

fn main() {
    let a = Rc::new(42);
    let b = Rc::clone(&a);
    println!("a={a}, b={b}");
}`,
      hints: [
        'Rc::clone increments the reference count without deep-copying.',
        'Use Rc::clone(&a) to create another owner.',
        'This is a cheap operation - just bumps the count.'
      ],
      concepts: ['rc-clone', 'reference-count', 'shared-ownership']
    },
    {
      id: 'rs-rcarc-3',
      title: 'Check Strong Count',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Get the number of strong references to an Rc.',
      skeleton: `use std::rc::Rc;

fn main() {
    let a = Rc::new("hello");
    let _b = Rc::clone(&a);
    let _c = Rc::clone(&a);
    println!("count: {}", __BLANK__(&a));
}`,
      solution: `use std::rc::Rc;

fn main() {
    let a = Rc::new("hello");
    let _b = Rc::clone(&a);
    let _c = Rc::clone(&a);
    println!("count: {}", Rc::strong_count(&a));
}`,
      hints: [
        'Rc::strong_count returns the number of strong references.',
        'The original plus two clones means count is 3.',
        'Rc::strong_count(&a)'
      ],
      concepts: ['strong-count', 'rc', 'reference-counting']
    },
    {
      id: 'rs-rcarc-4',
      title: 'Predict Rc Count',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the strong count at various points.',
      skeleton: `use std::rc::Rc;

fn main() {
    let a = Rc::new(0);
    print!("{} ", Rc::strong_count(&a));
    {
        let _b = Rc::clone(&a);
        let _c = Rc::clone(&a);
        print!("{} ", Rc::strong_count(&a));
    }
    print!("{}", Rc::strong_count(&a));
}`,
      solution: '1 3 1',
      hints: [
        'Initially only a exists, so count is 1.',
        'After cloning to _b and _c, count is 3.',
        'When _b and _c go out of scope, count returns to 1.'
      ],
      concepts: ['strong-count', 'scope', 'rc-lifecycle']
    },
    {
      id: 'rs-rcarc-5',
      title: 'Create a Weak Reference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a weak reference from an Rc.',
      skeleton: `use std::rc::Rc;

fn main() {
    let strong = Rc::new(String::from("data"));
    let weak = __BLANK__(&strong);
    println!("strong={}, weak={}", Rc::strong_count(&strong), Rc::weak_count(&strong));
}`,
      solution: `use std::rc::Rc;

fn main() {
    let strong = Rc::new(String::from("data"));
    let weak = Rc::downgrade(&strong);
    println!("strong={}, weak={}", Rc::strong_count(&strong), Rc::weak_count(&strong));
}`,
      hints: [
        'Rc::downgrade creates a Weak reference from an Rc.',
        'Weak references do not prevent the value from being dropped.',
        'Rc::downgrade(&strong)'
      ],
      concepts: ['weak-reference', 'rc-downgrade', 'reference-counting']
    },
    {
      id: 'rs-rcarc-6',
      title: 'Upgrade a Weak Reference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Upgrade a Weak reference back to an Rc.',
      skeleton: `use std::rc::Rc;

fn main() {
    let strong = Rc::new(42);
    let weak = Rc::downgrade(&strong);

    if let Some(val) = weak.__BLANK__() {
        println!("Value: {val}");
    }
}`,
      solution: `use std::rc::Rc;

fn main() {
    let strong = Rc::new(42);
    let weak = Rc::downgrade(&strong);

    if let Some(val) = weak.upgrade() {
        println!("Value: {val}");
    }
}`,
      hints: [
        'Weak::upgrade() returns Option<Rc<T>>.',
        'It returns None if all strong references have been dropped.',
        'weak.upgrade()'
      ],
      concepts: ['weak-upgrade', 'option', 'weak-reference']
    },
    {
      id: 'rs-rcarc-7',
      title: 'Shared List with Rc',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a function that returns two lists sharing a common tail via Rc.',
      skeleton: `use std::rc::Rc;

#[derive(Debug)]
enum List {
    Cons(i32, Rc<List>),
    Nil,
}

fn shared_lists() -> (Rc<List>, Rc<List>) {
    // todo: create a shared tail [4, Nil], then two lists:
    // list_a = [1, shared_tail]
    // list_b = [2, shared_tail]
    // return (list_a, list_b)
}`,
      solution: `use std::rc::Rc;

#[derive(Debug)]
enum List {
    Cons(i32, Rc<List>),
    Nil,
}

fn shared_lists() -> (Rc<List>, Rc<List>) {
    let shared_tail = Rc::new(List::Cons(4, Rc::new(List::Nil)));
    let list_a = Rc::new(List::Cons(1, Rc::clone(&shared_tail)));
    let list_b = Rc::new(List::Cons(2, Rc::clone(&shared_tail)));
    (list_a, list_b)
}`,
      hints: [
        'Create the shared tail as Rc<List> first.',
        'Use Rc::clone to share the tail between both lists.',
        'Wrap each list in Rc::new(List::Cons(value, Rc::clone(&shared_tail))).'
      ],
      concepts: ['rc', 'shared-data-structure', 'cons-list']
    },
    {
      id: 'rs-rcarc-8',
      title: 'Arc for Thread Sharing',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use Arc to share data across multiple threads.',
      skeleton: `use std::sync::Arc;
use std::thread;

fn parallel_read() -> Vec<usize> {
    let data = Arc::new(vec![10, 20, 30, 40, 50]);
    let mut handles = vec![];

    for i in 0..3 {
        // todo: clone Arc, spawn thread that returns data[i]
    }

    // todo: collect results from all threads
    vec![]
}`,
      solution: `use std::sync::Arc;
use std::thread;

fn parallel_read() -> Vec<usize> {
    let data = Arc::new(vec![10, 20, 30, 40, 50]);
    let mut handles = vec![];

    for i in 0..3 {
        let data_clone = Arc::clone(&data);
        handles.push(thread::spawn(move || {
            data_clone[i]
        }));
    }

    handles.into_iter().map(|h| h.join().unwrap()).collect()
}`,
      hints: [
        'Clone the Arc before moving it into each thread.',
        'Use Arc::clone(&data) to get a thread-safe reference.',
        'Collect results by joining all thread handles.'
      ],
      concepts: ['arc', 'thread-safety', 'shared-state', 'spawn']
    },
    {
      id: 'rs-rcarc-9',
      title: 'Fix Rc Across Threads',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the code that incorrectly uses Rc in a multi-threaded context.',
      skeleton: `use std::rc::Rc;
use std::thread;

fn main() {
    let data = Rc::new(vec![1, 2, 3]);
    let data_clone = Rc::clone(&data);

    let handle = thread::spawn(move || {
        println!("{:?}", data_clone);
    });

    handle.join().unwrap();
    println!("{:?}", data);
}`,
      solution: `use std::sync::Arc;
use std::thread;

fn main() {
    let data = Arc::new(vec![1, 2, 3]);
    let data_clone = Arc::clone(&data);

    let handle = thread::spawn(move || {
        println!("{:?}", data_clone);
    });

    handle.join().unwrap();
    println!("{:?}", data);
}`,
      hints: [
        'Rc is not Send - it cannot be sent across threads.',
        'Replace Rc with Arc for thread-safe reference counting.',
        'Change use std::rc::Rc to use std::sync::Arc.'
      ],
      concepts: ['rc-vs-arc', 'send-trait', 'thread-safety']
    },
    {
      id: 'rs-rcarc-10',
      title: 'Predict Weak Upgrade After Drop',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict what happens when upgrading a Weak after the strong reference is dropped.',
      skeleton: `use std::rc::Rc;

fn main() {
    let weak;
    {
        let strong = Rc::new(42);
        weak = Rc::downgrade(&strong);
        print!("{} ", weak.upgrade().is_some());
    }
    print!("{}", weak.upgrade().is_some());
}`,
      solution: 'true false',
      hints: [
        'Inside the scope, strong is alive so upgrade succeeds.',
        'After the scope, strong is dropped so upgrade returns None.',
        'is_some() returns true then false.'
      ],
      concepts: ['weak-upgrade', 'scope', 'dangling-weak']
    },
    {
      id: 'rs-rcarc-11',
      title: 'Arc with Mutex',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a function that uses Arc<Mutex<i32>> to increment a counter from multiple threads.',
      skeleton: `use std::sync::{Arc, Mutex};
use std::thread;

fn parallel_increment(num_threads: u32) -> i32 {
    // todo: create Arc<Mutex<i32>> starting at 0
    // spawn num_threads threads, each incrementing by 1
    // return final value
}`,
      solution: `use std::sync::{Arc, Mutex};
use std::thread;

fn parallel_increment(num_threads: u32) -> i32 {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..num_threads {
        let counter_clone = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut num = counter_clone.lock().unwrap();
            *num += 1;
        }));
    }

    for handle in handles {
        handle.join().unwrap();
    }

    *counter.lock().unwrap()
}`,
      hints: [
        'Wrap the counter in Arc::new(Mutex::new(0)).',
        'Clone the Arc for each thread, lock the mutex inside.',
        'After joining all threads, lock and read the final value.'
      ],
      concepts: ['arc-mutex', 'shared-mutable-state', 'thread-safety']
    },
    {
      id: 'rs-rcarc-12',
      title: 'Fix Rc Mutation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the code that tries to mutate data inside an Rc.',
      skeleton: `use std::rc::Rc;

fn main() {
    let data = Rc::new(vec![1, 2, 3]);
    let data2 = Rc::clone(&data);
    data.push(4);
    println!("{:?}", data2);
}`,
      solution: `use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    let data = Rc::new(RefCell::new(vec![1, 2, 3]));
    let data2 = Rc::clone(&data);
    data.borrow_mut().push(4);
    println!("{:?}", data2.borrow());
}`,
      hints: [
        'Rc provides shared ownership but not mutability.',
        'Wrap the inner value in RefCell for interior mutability.',
        'Use Rc::new(RefCell::new(...)) and borrow_mut() to mutate.'
      ],
      concepts: ['rc-refcell', 'interior-mutability', 'shared-mutation']
    },
    {
      id: 'rs-rcarc-13',
      title: 'Predict Reference Counts',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict strong and weak counts through various operations.',
      skeleton: `use std::rc::Rc;

fn main() {
    let a = Rc::new(0);
    let w = Rc::downgrade(&a);
    let b = Rc::clone(&a);
    print!("{}:{} ", Rc::strong_count(&a), Rc::weak_count(&a));
    drop(b);
    print!("{}:{}", Rc::strong_count(&a), Rc::weak_count(&a));
}`,
      solution: '2:1 1:1',
      hints: [
        'After clone and downgrade: strong=2, weak=1.',
        'After dropping b: strong=1, weak=1.',
        'Weak count does not change when a strong ref is dropped.'
      ],
      concepts: ['strong-count', 'weak-count', 'drop', 'rc-lifecycle']
    },
    {
      id: 'rs-rcarc-14',
      title: 'Tree with Parent Weak Ref',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Create a tree node with strong children and weak parent references to avoid cycles.',
      skeleton: `use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

impl Node {
    fn new(value: i32) -> Rc<Node> {
        // todo: create a new node wrapped in Rc
    }

    fn add_child(parent: &Rc<Node>, child: &Rc<Node>) {
        // todo: add child to parent's children and set child's parent
    }
}`,
      solution: `use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

impl Node {
    fn new(value: i32) -> Rc<Node> {
        Rc::new(Node {
            value,
            parent: RefCell::new(Weak::new()),
            children: RefCell::new(vec![]),
        })
    }

    fn add_child(parent: &Rc<Node>, child: &Rc<Node>) {
        parent.children.borrow_mut().push(Rc::clone(child));
        *child.parent.borrow_mut() = Rc::downgrade(parent);
    }
}`,
      hints: [
        'Initialize parent as Weak::new() (empty weak reference).',
        'Use Rc::clone to add child to parent.children.',
        'Use Rc::downgrade(parent) to set child.parent as a Weak.'
      ],
      concepts: ['weak-reference', 'tree-structure', 'cycle-prevention', 'rc-refcell']
    },
    {
      id: 'rs-rcarc-15',
      title: 'Observer Pattern with Weak',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Implement an event emitter that holds weak references to observers.',
      skeleton: `use std::rc::{Rc, Weak};
use std::cell::RefCell;

trait Observer {
    fn notify(&self, event: &str);
}

struct Emitter {
    observers: RefCell<Vec<Weak<dyn Observer>>>,
}

impl Emitter {
    fn new() -> Self {
        // todo
    }

    fn subscribe(&self, observer: &Rc<dyn Observer>) {
        // todo: store a weak reference
    }

    fn emit(&self, event: &str) {
        // todo: notify all alive observers, clean up dead ones
    }
}`,
      solution: `use std::rc::{Rc, Weak};
use std::cell::RefCell;

trait Observer {
    fn notify(&self, event: &str);
}

struct Emitter {
    observers: RefCell<Vec<Weak<dyn Observer>>>,
}

impl Emitter {
    fn new() -> Self {
        Emitter { observers: RefCell::new(vec![]) }
    }

    fn subscribe(&self, observer: &Rc<dyn Observer>) {
        self.observers.borrow_mut().push(Rc::downgrade(observer));
    }

    fn emit(&self, event: &str) {
        let mut observers = self.observers.borrow_mut();
        observers.retain(|weak| {
            if let Some(obs) = weak.upgrade() {
                obs.notify(event);
                true
            } else {
                false
            }
        });
    }
}`,
      hints: [
        'Store Weak references with Rc::downgrade in subscribe.',
        'In emit, try upgrade() on each Weak reference.',
        'Use retain to remove dead observers where upgrade returns None.'
      ],
      concepts: ['observer-pattern', 'weak-reference', 'trait-objects', 'cleanup']
    },
    {
      id: 'rs-rcarc-16',
      title: 'Fix Reference Cycle',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix a reference cycle that causes a memory leak.',
      skeleton: `use std::rc::Rc;
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    next: RefCell<Option<Rc<Node>>>,
    value: i32,
}

fn main() {
    let a = Rc::new(Node { next: RefCell::new(None), value: 1 });
    let b = Rc::new(Node { next: RefCell::new(None), value: 2 });

    *a.next.borrow_mut() = Some(Rc::clone(&b));
    *b.next.borrow_mut() = Some(Rc::clone(&a)); // cycle!

    println!("a count: {}", Rc::strong_count(&a));
    println!("b count: {}", Rc::strong_count(&b));
}`,
      solution: `use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    next: RefCell<Option<Weak<Node>>>,
    value: i32,
}

fn main() {
    let a = Rc::new(Node { next: RefCell::new(None), value: 1 });
    let b = Rc::new(Node { next: RefCell::new(None), value: 2 });

    *a.next.borrow_mut() = Some(Rc::downgrade(&b));
    *b.next.borrow_mut() = Some(Rc::downgrade(&a));

    println!("a count: {}", Rc::strong_count(&a));
    println!("b count: {}", Rc::strong_count(&b));
}`,
      hints: [
        'Reference cycles with Rc cause memory leaks.',
        'Change the next field to hold Weak<Node> instead of Rc<Node>.',
        'Use Rc::downgrade() instead of Rc::clone() for back-references.'
      ],
      concepts: ['reference-cycle', 'weak-reference', 'memory-leak', 'cycle-prevention']
    },
    {
      id: 'rs-rcarc-17',
      title: 'Refactor to Shared Ownership',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor code that clones data for multiple owners to use Rc instead.',
      skeleton: `fn main() {
    let config = String::from("debug=true,verbose=true");

    let logger_config = config.clone();
    let parser_config = config.clone();
    let validator_config = config.clone();

    println!("Logger: {logger_config}");
    println!("Parser: {parser_config}");
    println!("Validator: {validator_config}");
    println!("Original: {config}");
}`,
      solution: `use std::rc::Rc;

fn main() {
    let config = Rc::new(String::from("debug=true,verbose=true"));

    let logger_config = Rc::clone(&config);
    let parser_config = Rc::clone(&config);
    let validator_config = Rc::clone(&config);

    println!("Logger: {logger_config}");
    println!("Parser: {parser_config}");
    println!("Validator: {validator_config}");
    println!("Original: {config}");
}`,
      hints: [
        'Rc::clone is cheaper than String::clone - it just bumps a counter.',
        'Wrap the original in Rc::new() and use Rc::clone for sharing.',
        'All variables will point to the same underlying String.'
      ],
      concepts: ['rc', 'shared-ownership', 'refactoring', 'performance']
    },
    {
      id: 'rs-rcarc-18',
      title: 'Refactor Arc Mutex Pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor sequential code with mutable state into a thread-safe Arc<Mutex<T>> version.',
      skeleton: `fn process_items(items: &[i32]) -> i32 {
    let mut total = 0;
    for &item in items {
        total += item * 2;
    }
    total
}

fn main() {
    let items = vec![1, 2, 3, 4, 5, 6, 7, 8];
    let result = process_items(&items);
    println!("Total: {result}");
}`,
      solution: `use std::sync::{Arc, Mutex};
use std::thread;

fn process_items(items: &[i32]) -> i32 {
    let total = Arc::new(Mutex::new(0));
    let chunks: Vec<&[i32]> = items.chunks(4).collect();
    let mut handles = vec![];

    for chunk in chunks {
        let total = Arc::clone(&total);
        let chunk = chunk.to_vec();
        handles.push(thread::spawn(move || {
            let partial: i32 = chunk.iter().map(|x| x * 2).sum();
            *total.lock().unwrap() += partial;
        }));
    }

    for handle in handles {
        handle.join().unwrap();
    }

    *total.lock().unwrap()
}

fn main() {
    let items = vec![1, 2, 3, 4, 5, 6, 7, 8];
    let result = process_items(&items);
    println!("Total: {result}");
}`,
      hints: [
        'Split items into chunks and process in parallel.',
        'Use Arc<Mutex<i32>> for the shared total.',
        'Each thread computes a partial sum, then locks to add to total.'
      ],
      concepts: ['arc-mutex', 'parallelism', 'refactoring', 'chunks']
    },
    {
      id: 'rs-rcarc-19',
      title: 'Write Shared Cache',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Create a shared cache using Rc<RefCell<HashMap>> that multiple components can read and write to.',
      skeleton: `use std::rc::Rc;
use std::cell::RefCell;
use std::collections::HashMap;

type SharedCache = Rc<RefCell<HashMap<String, String>>>;

fn create_cache() -> SharedCache {
    // todo
}

fn cache_set(cache: &SharedCache, key: &str, value: &str) {
    // todo
}

fn cache_get(cache: &SharedCache, key: &str) -> Option<String> {
    // todo
}`,
      solution: `use std::rc::Rc;
use std::cell::RefCell;
use std::collections::HashMap;

type SharedCache = Rc<RefCell<HashMap<String, String>>>;

fn create_cache() -> SharedCache {
    Rc::new(RefCell::new(HashMap::new()))
}

fn cache_set(cache: &SharedCache, key: &str, value: &str) {
    cache.borrow_mut().insert(key.to_string(), value.to_string());
}

fn cache_get(cache: &SharedCache, key: &str) -> Option<String> {
    cache.borrow().get(key).cloned()
}`,
      hints: [
        'Wrap HashMap in RefCell for mutability, then Rc for sharing.',
        'Use borrow_mut() for inserts and borrow() for reads.',
        'clone the value out of the borrow to avoid lifetime issues.'
      ],
      concepts: ['rc-refcell', 'hashmap', 'shared-cache', 'interior-mutability']
    },
    {
      id: 'rs-rcarc-20',
      title: 'Write Thread-Safe Counter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Create a SharedCounter backed by Arc that supports increment, decrement, and get from any clone.',
      skeleton: `use std::sync::{Arc, Mutex};

#[derive(Clone)]
struct SharedCounter {
    // todo: add field
}

impl SharedCounter {
    fn new() -> Self {
        // todo
    }

    fn increment(&self) {
        // todo
    }

    fn decrement(&self) {
        // todo
    }

    fn get(&self) -> i32 {
        // todo
    }
}`,
      solution: `use std::sync::{Arc, Mutex};

#[derive(Clone)]
struct SharedCounter {
    count: Arc<Mutex<i32>>,
}

impl SharedCounter {
    fn new() -> Self {
        SharedCounter { count: Arc::new(Mutex::new(0)) }
    }

    fn increment(&self) {
        *self.count.lock().unwrap() += 1;
    }

    fn decrement(&self) {
        *self.count.lock().unwrap() -= 1;
    }

    fn get(&self) -> i32 {
        *self.count.lock().unwrap()
    }
}`,
      hints: [
        'Use Arc<Mutex<i32>> as the backing field.',
        'Lock the mutex for each operation.',
        'Clone the struct to share the counter - Arc handles the sharing.'
      ],
      concepts: ['arc-mutex', 'shared-counter', 'thread-safety', 'clone']
    }
  ]
};
