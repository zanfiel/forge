import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-intmut',
  title: '38. Interior Mutability',
  explanation: `## Interior Mutability

Interior mutability allows mutation through an immutable reference, checked at runtime instead of compile time.

### Cell<T>
For \`Copy\` types - get and set values without borrowing:
\`\`\`rust
use std::cell::Cell;

let c = Cell::new(5);
c.set(10);
println!("{}", c.get()); // 10
\`\`\`

### RefCell<T>
For any type - runtime-checked borrowing:
\`\`\`rust
use std::cell::RefCell;

let data = RefCell::new(vec![1, 2, 3]);
data.borrow_mut().push(4);       // mutable borrow
println!("{:?}", data.borrow()); // immutable borrow
\`\`\`

### Borrow Rules (Runtime)
- Multiple immutable borrows: OK
- One mutable borrow: OK
- Mutable + immutable: **panic!**

\`\`\`rust
let r = RefCell::new(5);
let a = r.borrow();     // immutable
let b = r.borrow_mut(); // PANIC: already borrowed
\`\`\`

### Common Patterns
| Pattern | Use Case |
|---------|----------|
| \`Rc<RefCell<T>>\` | Shared mutable data (single-threaded) |
| \`Arc<Mutex<T>>\` | Shared mutable data (multi-threaded) |
| \`Cell<T>\` | Simple Copy values in shared context |

### UnsafeCell
All interior mutability primitives are built on \`UnsafeCell<T>\`, the only legal way to obtain \`&mut T\` from \`&T\`.
`,
  exercises: [
    {
      id: 'rs-intmut-1',
      title: 'Create a Cell',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a Cell and modify its value.',
      skeleton: `use std::cell::Cell;

fn main() {
    let counter = __BLANK__(0);
    counter.set(counter.get() + 1);
    println!("{}", counter.get());
}`,
      solution: `use std::cell::Cell;

fn main() {
    let counter = Cell::new(0);
    counter.set(counter.get() + 1);
    println!("{}", counter.get());
}`,
      hints: [
        'Cell::new() creates a new Cell wrapping a value.',
        'Cell works with Copy types like i32.',
        'Cell::new(0)'
      ],
      concepts: ['cell', 'interior-mutability', 'copy-types']
    },
    {
      id: 'rs-intmut-2',
      title: 'RefCell Mutable Borrow',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use borrow_mut to modify data inside a RefCell.',
      skeleton: `use std::cell::RefCell;

fn main() {
    let data = RefCell::new(vec![1, 2, 3]);
    data.__BLANK__().push(4);
    println!("{:?}", data.borrow());
}`,
      solution: `use std::cell::RefCell;

fn main() {
    let data = RefCell::new(vec![1, 2, 3]);
    data.borrow_mut().push(4);
    println!("{:?}", data.borrow());
}`,
      hints: [
        'To get a mutable reference from RefCell, use borrow_mut().',
        'borrow_mut() returns a RefMut smart pointer.',
        'data.borrow_mut().push(4)'
      ],
      concepts: ['refcell', 'borrow-mut', 'runtime-borrow-checking']
    },
    {
      id: 'rs-intmut-3',
      title: 'Cell Get and Set',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use Cell methods to read and write a value.',
      skeleton: `use std::cell::Cell;

fn main() {
    let flag = Cell::new(false);
    println!("Before: {}", flag.__BLANK__());
    flag.__BLANK__(true);
    println!("After: {}", flag.get());
}`,
      solution: `use std::cell::Cell;

fn main() {
    let flag = Cell::new(false);
    println!("Before: {}", flag.get());
    flag.set(true);
    println!("After: {}", flag.get());
}`,
      hints: [
        'Cell::get() copies the value out.',
        'Cell::set() replaces the stored value.',
        'get() to read, set(true) to write.'
      ],
      concepts: ['cell', 'get', 'set']
    },
    {
      id: 'rs-intmut-4',
      title: 'Predict RefCell Borrow',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the output of multiple immutable borrows from RefCell.',
      skeleton: `use std::cell::RefCell;

fn main() {
    let data = RefCell::new(42);
    let a = data.borrow();
    let b = data.borrow();
    println!("{} {}", *a, *b);
}`,
      solution: '42 42',
      hints: [
        'Multiple immutable borrows are allowed in RefCell.',
        'Both a and b borrow the same value 42.',
        'Output is 42 42.'
      ],
      concepts: ['refcell', 'multiple-borrows', 'immutable-borrow']
    },
    {
      id: 'rs-intmut-5',
      title: 'RefCell Immutable Borrow',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Read from a RefCell using an immutable borrow.',
      skeleton: `use std::cell::RefCell;

fn main() {
    let name = RefCell::new(String::from("Alice"));
    let borrowed = name.__BLANK__();
    println!("Name: {borrowed}");
}`,
      solution: `use std::cell::RefCell;

fn main() {
    let name = RefCell::new(String::from("Alice"));
    let borrowed = name.borrow();
    println!("Name: {borrowed}");
}`,
      hints: [
        'borrow() returns a Ref<T> for immutable access.',
        'Unlike borrow_mut(), multiple borrow() calls can coexist.',
        'name.borrow()'
      ],
      concepts: ['refcell', 'borrow', 'immutable-access']
    },
    {
      id: 'rs-intmut-6',
      title: 'Cell Replace',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use Cell::replace to swap the value and get the old one.',
      skeleton: `use std::cell::Cell;

fn main() {
    let c = Cell::new(10);
    let old = c.__BLANK__(20);
    println!("old={old}, new={}", c.get());
}`,
      solution: `use std::cell::Cell;

fn main() {
    let c = Cell::new(10);
    let old = c.replace(20);
    println!("old={old}, new={}", c.get());
}`,
      hints: [
        'Cell::replace sets a new value and returns the old one.',
        'Similar to std::mem::replace but for Cell.',
        'c.replace(20) sets 20 and returns 10.'
      ],
      concepts: ['cell', 'replace', 'swap']
    },
    {
      id: 'rs-intmut-7',
      title: 'Implement Counter with Cell',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Implement a Counter struct using Cell for interior mutability.',
      skeleton: `use std::cell::Cell;

struct Counter {
    count: Cell<u32>,
}

impl Counter {
    fn new() -> Self {
        // todo
    }

    fn increment(&self) {
        // todo: increment without &mut self
    }

    fn get(&self) -> u32 {
        // todo
    }
}`,
      solution: `use std::cell::Cell;

struct Counter {
    count: Cell<u32>,
}

impl Counter {
    fn new() -> Self {
        Counter { count: Cell::new(0) }
    }

    fn increment(&self) {
        self.count.set(self.count.get() + 1);
    }

    fn get(&self) -> u32 {
        self.count.get()
    }
}`,
      hints: [
        'Cell allows mutation through &self, no &mut self needed.',
        'Use self.count.set(self.count.get() + 1) to increment.',
        'Cell::get() returns a copy of the inner value.'
      ],
      concepts: ['cell', 'interior-mutability', 'immutable-self']
    },
    {
      id: 'rs-intmut-8',
      title: 'Fix Borrow Conflict',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the RefCell code that panics due to conflicting borrows.',
      skeleton: `use std::cell::RefCell;

fn main() {
    let data = RefCell::new(vec![1, 2, 3]);
    let borrowed = data.borrow();
    data.borrow_mut().push(4);
    println!("{:?}", borrowed);
}`,
      solution: `use std::cell::RefCell;

fn main() {
    let data = RefCell::new(vec![1, 2, 3]);
    {
        let borrowed = data.borrow();
        println!("{:?}", borrowed);
    }
    data.borrow_mut().push(4);
    println!("{:?}", data.borrow());
}`,
      hints: [
        'Cannot have both immutable and mutable borrows active at once.',
        'Drop the immutable borrow before taking a mutable one.',
        'Use a scope block to limit the lifetime of borrowed.'
      ],
      concepts: ['refcell', 'borrow-conflict', 'runtime-panic']
    },
    {
      id: 'rs-intmut-9',
      title: 'Rc<RefCell<T>> Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a shared mutable list using Rc<RefCell<Vec<i32>>>.',
      skeleton: `use std::rc::Rc;
use std::cell::RefCell;

fn shared_list() -> (Rc<RefCell<Vec<i32>>>, Rc<RefCell<Vec<i32>>>) {
    // todo: create shared vec, clone Rc, push via first handle,
    // return both handles (they see the same data)
}`,
      solution: `use std::rc::Rc;
use std::cell::RefCell;

fn shared_list() -> (Rc<RefCell<Vec<i32>>>, Rc<RefCell<Vec<i32>>>) {
    let list = Rc::new(RefCell::new(vec![1, 2, 3]));
    let list2 = Rc::clone(&list);
    list.borrow_mut().push(4);
    (list, list2)
}`,
      hints: [
        'Wrap the Vec in RefCell::new, then in Rc::new.',
        'Use Rc::clone to create a second handle.',
        'borrow_mut() on either handle mutates the shared data.'
      ],
      concepts: ['rc-refcell', 'shared-mutable-data', 'interior-mutability']
    },
    {
      id: 'rs-intmut-10',
      title: 'Fix Double Mutable Borrow',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the code that holds two mutable borrows at once.',
      skeleton: `use std::cell::RefCell;

fn main() {
    let data = RefCell::new(String::from("hello"));
    let mut r1 = data.borrow_mut();
    let mut r2 = data.borrow_mut();
    r1.push_str(" world");
    r2.push_str("!");
    println!("{}", data.borrow());
}`,
      solution: `use std::cell::RefCell;

fn main() {
    let data = RefCell::new(String::from("hello"));
    {
        let mut r1 = data.borrow_mut();
        r1.push_str(" world");
    }
    {
        let mut r2 = data.borrow_mut();
        r2.push_str("!");
    }
    println!("{}", data.borrow());
}`,
      hints: [
        'Only one mutable borrow can exist at a time with RefCell.',
        'Scope each mutable borrow so the first is dropped before the second.',
        'Use blocks {} to limit borrow lifetimes.'
      ],
      concepts: ['refcell', 'double-borrow', 'borrow-scoping']
    },
    {
      id: 'rs-intmut-11',
      title: 'Predict Cell Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of Cell operations.',
      skeleton: `use std::cell::Cell;

fn main() {
    let x = Cell::new(1);
    let old = x.replace(2);
    x.set(x.get() + old);
    println!("{}", x.get());
}`,
      solution: '3',
      hints: [
        'replace(2) sets x to 2 and returns old value 1.',
        'x.get() is 2, old is 1, so set(2 + 1) = set(3).',
        'Final value is 3.'
      ],
      concepts: ['cell', 'replace', 'get-set']
    },
    {
      id: 'rs-intmut-12',
      title: 'Mock Object with RefCell',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a mock messenger that records messages using RefCell for testing.',
      skeleton: `use std::cell::RefCell;

trait Messenger {
    fn send(&self, msg: &str);
}

struct MockMessenger {
    messages: RefCell<Vec<String>>,
}

impl MockMessenger {
    fn new() -> Self {
        // todo
    }

    fn sent_messages(&self) -> Vec<String> {
        // todo: return a clone of the messages
    }
}

// todo: implement Messenger for MockMessenger`,
      solution: `use std::cell::RefCell;

trait Messenger {
    fn send(&self, msg: &str);
}

struct MockMessenger {
    messages: RefCell<Vec<String>>,
}

impl MockMessenger {
    fn new() -> Self {
        MockMessenger { messages: RefCell::new(vec![]) }
    }

    fn sent_messages(&self) -> Vec<String> {
        self.messages.borrow().clone()
    }
}

impl Messenger for MockMessenger {
    fn send(&self, msg: &str) {
        self.messages.borrow_mut().push(msg.to_string());
    }
}`,
      hints: [
        'Messenger::send takes &self, so you need interior mutability.',
        'Use borrow_mut() in send to push to the Vec.',
        'Clone the messages in sent_messages to return owned data.'
      ],
      concepts: ['refcell', 'mock-object', 'testing', 'interior-mutability']
    },
    {
      id: 'rs-intmut-13',
      title: 'Write Caching Computed Value',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement a Cached struct that lazily computes and caches a value using Cell<Option<T>>.',
      skeleton: `use std::cell::Cell;

struct Cached {
    value: Cell<Option<i32>>,
    input: i32,
}

impl Cached {
    fn new(input: i32) -> Self {
        // todo
    }

    fn get(&self) -> i32 {
        // todo: return cached value, or compute input*input and cache it
    }
}`,
      solution: `use std::cell::Cell;

struct Cached {
    value: Cell<Option<i32>>,
    input: i32,
}

impl Cached {
    fn new(input: i32) -> Self {
        Cached { value: Cell::new(None), input }
    }

    fn get(&self) -> i32 {
        match self.value.get() {
            Some(v) => v,
            None => {
                let computed = self.input * self.input;
                self.value.set(Some(computed));
                computed
            }
        }
    }
}`,
      hints: [
        'Initialize value as Cell::new(None).',
        'In get(), check if value is Some - return it if so.',
        'If None, compute, cache with set(Some(computed)), and return.'
      ],
      concepts: ['cell', 'lazy-evaluation', 'caching', 'option']
    },
    {
      id: 'rs-intmut-14',
      title: 'Predict RefCell Panic',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Predict whether this code panics or succeeds.',
      skeleton: `use std::cell::RefCell;

fn main() {
    let data = RefCell::new(10);
    let r1 = data.borrow();
    let r2 = data.borrow();
    println!("{} {}", *r1, *r2);
    drop(r1);
    drop(r2);
    *data.borrow_mut() = 20;
    println!("{}", data.borrow());
}`,
      solution: '10 10\n20',
      hints: [
        'Multiple immutable borrows are fine - no panic.',
        'After dropping both borrows, borrow_mut succeeds.',
        'Output: 10 10 on first line, 20 on second.'
      ],
      concepts: ['refcell', 'borrow-rules', 'drop-borrows']
    },
    {
      id: 'rs-intmut-15',
      title: 'Fix try_borrow Usage',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix the code to handle potential borrow failures gracefully.',
      skeleton: `use std::cell::RefCell;

fn main() {
    let data = RefCell::new(vec![1, 2, 3]);
    let _mut_ref = data.borrow_mut();

    // This will panic!
    let imm_ref = data.borrow();
    println!("{:?}", imm_ref);
}`,
      solution: `use std::cell::RefCell;

fn main() {
    let data = RefCell::new(vec![1, 2, 3]);
    let _mut_ref = data.borrow_mut();

    match data.try_borrow() {
        Ok(imm_ref) => println!("{:?}", imm_ref),
        Err(_) => println!("Cannot borrow: already mutably borrowed"),
    }
}`,
      hints: [
        'Use try_borrow() instead of borrow() to avoid panics.',
        'try_borrow() returns Result<Ref<T>, BorrowError>.',
        'Handle both Ok and Err cases with match.'
      ],
      concepts: ['try-borrow', 'error-handling', 'refcell', 'graceful-failure']
    },
    {
      id: 'rs-intmut-16',
      title: 'Write Graph with RefCell',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Create a simple graph node with mutable neighbors using Rc<RefCell<T>>.',
      skeleton: `use std::rc::Rc;
use std::cell::RefCell;

struct GraphNode {
    id: u32,
    neighbors: RefCell<Vec<Rc<GraphNode>>>,
}

impl GraphNode {
    fn new(id: u32) -> Rc<GraphNode> {
        // todo
    }

    fn add_neighbor(node: &Rc<GraphNode>, neighbor: &Rc<GraphNode>) {
        // todo
    }

    fn neighbor_count(&self) -> usize {
        // todo
    }
}`,
      solution: `use std::rc::Rc;
use std::cell::RefCell;

struct GraphNode {
    id: u32,
    neighbors: RefCell<Vec<Rc<GraphNode>>>,
}

impl GraphNode {
    fn new(id: u32) -> Rc<GraphNode> {
        Rc::new(GraphNode {
            id,
            neighbors: RefCell::new(vec![]),
        })
    }

    fn add_neighbor(node: &Rc<GraphNode>, neighbor: &Rc<GraphNode>) {
        node.neighbors.borrow_mut().push(Rc::clone(neighbor));
    }

    fn neighbor_count(&self) -> usize {
        self.neighbors.borrow().len()
    }
}`,
      hints: [
        'Wrap the node in Rc::new with neighbors as RefCell::new(vec![]).',
        'Use borrow_mut() to push neighbors.',
        'Use borrow().len() to count neighbors.'
      ],
      concepts: ['rc-refcell', 'graph', 'interior-mutability', 'shared-ownership']
    },
    {
      id: 'rs-intmut-17',
      title: 'Implement OnceCell-like Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Implement a SetOnce<T> that can only be set once, using RefCell.',
      skeleton: `use std::cell::RefCell;

struct SetOnce<T> {
    value: RefCell<Option<T>>,
}

impl<T> SetOnce<T> {
    fn new() -> Self {
        // todo
    }

    fn set(&self, val: T) -> Result<(), &'static str> {
        // todo: set if empty, error if already set
    }

    fn get(&self) -> Option<std::cell::Ref<'_, T>> {
        // todo: return reference to inner value if set
    }
}`,
      solution: `use std::cell::RefCell;

struct SetOnce<T> {
    value: RefCell<Option<T>>,
}

impl<T> SetOnce<T> {
    fn new() -> Self {
        SetOnce { value: RefCell::new(None) }
    }

    fn set(&self, val: T) -> Result<(), &'static str> {
        let mut inner = self.value.borrow_mut();
        if inner.is_some() {
            Err("already set")
        } else {
            *inner = Some(val);
            Ok(())
        }
    }

    fn get(&self) -> Option<std::cell::Ref<'_, T>> {
        let r = self.value.borrow();
        if r.is_some() {
            Some(std::cell::Ref::map(r, |opt| opt.as_ref().unwrap()))
        } else {
            None
        }
    }
}`,
      hints: [
        'Start with RefCell::new(None).',
        'In set, check if already Some and return Err if so.',
        'In get, use Ref::map to transform the borrow into a reference to the inner T.'
      ],
      concepts: ['refcell', 'once-cell', 'ref-map', 'interior-mutability']
    },
    {
      id: 'rs-intmut-18',
      title: 'Refactor Mutable Ref to Cell',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor code that requires &mut self to use Cell so it works with &self.',
      skeleton: `struct Stats {
    total: i32,
    count: i32,
}

impl Stats {
    fn new() -> Self {
        Stats { total: 0, count: 0 }
    }

    fn record(&mut self, value: i32) {
        self.total += value;
        self.count += 1;
    }

    fn average(&self) -> f64 {
        self.total as f64 / self.count as f64
    }
}`,
      solution: `use std::cell::Cell;

struct Stats {
    total: Cell<i32>,
    count: Cell<i32>,
}

impl Stats {
    fn new() -> Self {
        Stats { total: Cell::new(0), count: Cell::new(0) }
    }

    fn record(&self, value: i32) {
        self.total.set(self.total.get() + value);
        self.count.set(self.count.get() + 1);
    }

    fn average(&self) -> f64 {
        self.total.get() as f64 / self.count.get() as f64
    }
}`,
      hints: [
        'Wrap each field in Cell to allow mutation through &self.',
        'Change &mut self to &self in record.',
        'Use .get() and .set() instead of direct field access.'
      ],
      concepts: ['cell', 'refactoring', 'interior-mutability', 'immutable-api']
    },
    {
      id: 'rs-intmut-19',
      title: 'Refactor to RefCell Map',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor a mutable HashMap into a shared structure using Rc<RefCell<HashMap>>.',
      skeleton: `use std::collections::HashMap;

fn build_index(words: &[&str]) -> HashMap<char, Vec<String>> {
    let mut index = HashMap::new();
    for word in words {
        let first = word.chars().next().unwrap();
        index.entry(first).or_insert_with(Vec::new).push(word.to_string());
    }
    index
}

fn main() {
    let words = vec!["apple", "banana", "avocado", "blueberry"];
    let idx = build_index(&words);
    println!("{:?}", idx);
}`,
      solution: `use std::collections::HashMap;
use std::rc::Rc;
use std::cell::RefCell;

type SharedIndex = Rc<RefCell<HashMap<char, Vec<String>>>>;

fn build_index(words: &[&str]) -> SharedIndex {
    let index: SharedIndex = Rc::new(RefCell::new(HashMap::new()));
    for word in words {
        let first = word.chars().next().unwrap();
        index.borrow_mut().entry(first).or_insert_with(Vec::new).push(word.to_string());
    }
    index
}

fn main() {
    let words = vec!["apple", "banana", "avocado", "blueberry"];
    let idx = build_index(&words);
    println!("{:?}", idx.borrow());
}`,
      hints: [
        'Wrap the HashMap in RefCell then Rc for shared mutability.',
        'Use borrow_mut() to insert entries.',
        'Use borrow() for read access when printing.'
      ],
      concepts: ['rc-refcell', 'hashmap', 'refactoring', 'shared-index']
    },
    {
      id: 'rs-intmut-20',
      title: 'Write Event Logger with RefCell',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Create an EventLogger that can be shared and logs events to an internal Vec using RefCell.',
      skeleton: `use std::cell::RefCell;
use std::rc::Rc;

struct EventLogger {
    events: RefCell<Vec<String>>,
}

impl EventLogger {
    fn new() -> Rc<Self> {
        // todo
    }

    fn log(&self, event: &str) {
        // todo: add timestamped event
    }

    fn drain(&self) -> Vec<String> {
        // todo: take all events, leaving the logger empty
    }
}`,
      solution: `use std::cell::RefCell;
use std::rc::Rc;

struct EventLogger {
    events: RefCell<Vec<String>>,
}

impl EventLogger {
    fn new() -> Rc<Self> {
        Rc::new(EventLogger { events: RefCell::new(vec![]) })
    }

    fn log(&self, event: &str) {
        self.events.borrow_mut().push(event.to_string());
    }

    fn drain(&self) -> Vec<String> {
        self.events.borrow_mut().drain(..).collect()
    }
}`,
      hints: [
        'Return Rc::new(EventLogger { events: RefCell::new(vec![]) }).',
        'Use borrow_mut().push() to log events.',
        'Use borrow_mut().drain(..).collect() to take all events.'
      ],
      concepts: ['refcell', 'rc', 'event-logging', 'drain']
    }
  ]
};
