import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-drop',
  title: '36. The Drop Trait',
  explanation: `## The Drop Trait

The \`Drop\` trait lets you customize what happens when a value goes out of scope - Rust's mechanism for RAII (Resource Acquisition Is Initialization).

### Basic Drop
\`\`\`rust
struct FileHandle {
    name: String,
}

impl Drop for FileHandle {
    fn drop(&mut self) {
        println!("Closing file: {}", self.name);
    }
}
\`\`\`

### Drop Order
Values are dropped in reverse order of declaration:
\`\`\`rust
let a = Resource::new("first");  // dropped last
let b = Resource::new("second"); // dropped first
\`\`\`

Struct fields are dropped in declaration order.

### Early Drop with std::mem::drop
\`\`\`rust
let lock = mutex.lock().unwrap();
// ... use lock ...
drop(lock); // release early
// ... do other work ...
\`\`\`

### Drop and Copy
A type cannot implement both \`Drop\` and \`Copy\` - if a type needs cleanup, bitwise copies are unsafe.

### ManuallyDrop
\`\`\`rust
use std::mem::ManuallyDrop;

let mut data = ManuallyDrop::new(String::from("hello"));
// data will NOT be dropped automatically
// Must manually drop: unsafe { ManuallyDrop::drop(&mut data); }
\`\`\`
`,
  exercises: [
    {
      id: 'rs-drop-1',
      title: 'Basic Drop Implementation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Complete the Drop trait implementation.',
      skeleton: `struct Logger {
    name: String,
}

impl __BLANK__ for Logger {
    fn drop(&mut self) {
        println!("{} logger dropped", self.name);
    }
}`,
      solution: `struct Logger {
    name: String,
}

impl Drop for Logger {
    fn drop(&mut self) {
        println!("{} logger dropped", self.name);
    }
}`,
      hints: [
        'The trait that runs cleanup code on drop is called Drop.',
        'impl Drop for Logger { ... }',
        'The Drop trait has a single method: fn drop(&mut self).'
      ],
      concepts: ['drop-trait', 'trait-implementation', 'destructor']
    },
    {
      id: 'rs-drop-2',
      title: 'Drop Method Signature',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fill in the correct method signature for Drop.',
      skeleton: `struct Connection {
    id: u32,
}

impl Drop for Connection {
    fn drop(__BLANK__) {
        println!("Connection {} closed", self.id);
    }
}`,
      solution: `struct Connection {
    id: u32,
}

impl Drop for Connection {
    fn drop(&mut self) {
        println!("Connection {} closed", self.id);
    }
}`,
      hints: [
        'The drop method takes a mutable reference to self.',
        'It does not consume self because fields need to be dropped after.',
        'fn drop(&mut self)'
      ],
      concepts: ['drop-signature', 'mutable-reference', 'self']
    },
    {
      id: 'rs-drop-3',
      title: 'Early Drop with std::mem::drop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use std::mem::drop to release a resource early.',
      skeleton: `struct Lock {
    name: String,
}

impl Drop for Lock {
    fn drop(&mut self) {
        println!("Released {}", self.name);
    }
}

fn main() {
    let lock = Lock { name: String::from("mutex") };
    println!("Using lock");
    __BLANK__(lock);
    println!("Lock released, doing other work");
}`,
      solution: `struct Lock {
    name: String,
}

impl Drop for Lock {
    fn drop(&mut self) {
        println!("Released {}", self.name);
    }
}

fn main() {
    let lock = Lock { name: String::from("mutex") };
    println!("Using lock");
    drop(lock);
    println!("Lock released, doing other work");
}`,
      hints: [
        'The function to explicitly drop a value early is drop().',
        'std::mem::drop is in the prelude, so just call drop(lock).',
        'After drop(lock), the lock variable can no longer be used.'
      ],
      concepts: ['early-drop', 'std-mem-drop', 'move-semantics']
    },
    {
      id: 'rs-drop-4',
      title: 'Predict Drop Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the order in which values are dropped.',
      skeleton: `struct D(i32);

impl Drop for D {
    fn drop(&mut self) {
        print!("{} ", self.0);
    }
}

fn main() {
    let _a = D(1);
    let _b = D(2);
    let _c = D(3);
    print!("end ");
}`,
      solution: 'end 3 2 1 ',
      hints: [
        'Values are dropped in reverse order of declaration.',
        '_c is dropped first, then _b, then _a.',
        'Print "end " first, then drops run: 3 2 1.'
      ],
      concepts: ['drop-order', 'reverse-declaration', 'scope']
    },
    {
      id: 'rs-drop-5',
      title: 'Predict Scope Drop',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict when values in inner scopes are dropped.',
      skeleton: `struct D(&'static str);

impl Drop for D {
    fn drop(&mut self) {
        print!("{} ", self.0);
    }
}

fn main() {
    let _a = D("a");
    {
        let _b = D("b");
        print!("inner ");
    }
    print!("outer ");
}`,
      solution: 'inner b outer a ',
      hints: [
        '_b is dropped when the inner scope ends.',
        '_a is dropped when main() ends.',
        'Order: "inner ", drop b, "outer ", drop a.'
      ],
      concepts: ['drop-order', 'scope', 'inner-scope']
    },
    {
      id: 'rs-drop-6',
      title: 'Implement Resource Cleanup',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Implement Drop for a TempFile struct that prints a cleanup message.',
      skeleton: `struct TempFile {
    path: String,
}

impl TempFile {
    fn new(path: &str) -> Self {
        println!("Created temp file: {path}");
        TempFile { path: path.to_string() }
    }
}

// todo: implement Drop for TempFile that prints "Deleted temp file: {path}"`,
      solution: `struct TempFile {
    path: String,
}

impl TempFile {
    fn new(path: &str) -> Self {
        println!("Created temp file: {path}");
        TempFile { path: path.to_string() }
    }
}

impl Drop for TempFile {
    fn drop(&mut self) {
        println!("Deleted temp file: {}", self.path);
    }
}`,
      hints: [
        'Implement the Drop trait with fn drop(&mut self).',
        'Print the cleanup message using self.path.',
        'println!("Deleted temp file: {}", self.path);'
      ],
      concepts: ['drop-trait', 'raii', 'resource-cleanup']
    },
    {
      id: 'rs-drop-7',
      title: 'Write Drop Counter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Implement a struct with Drop that decrements a shared counter when dropped.',
      skeleton: `use std::cell::Cell;

struct Tracked<'a> {
    counter: &'a Cell<i32>,
}

impl<'a> Tracked<'a> {
    fn new(counter: &'a Cell<i32>) -> Self {
        counter.set(counter.get() + 1);
        Tracked { counter }
    }
}

// todo: implement Drop for Tracked that decrements the counter`,
      solution: `use std::cell::Cell;

struct Tracked<'a> {
    counter: &'a Cell<i32>,
}

impl<'a> Tracked<'a> {
    fn new(counter: &'a Cell<i32>) -> Self {
        counter.set(counter.get() + 1);
        Tracked { counter }
    }
}

impl<'a> Drop for Tracked<'a> {
    fn drop(&mut self) {
        self.counter.set(self.counter.get() - 1);
    }
}`,
      hints: [
        'Access the counter through self.counter.',
        'Use Cell::get() and Cell::set() to modify the value.',
        'self.counter.set(self.counter.get() - 1);'
      ],
      concepts: ['drop-trait', 'cell', 'shared-state', 'counter']
    },
    {
      id: 'rs-drop-8',
      title: 'Fix Cannot Call Drop Directly',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the code that tries to call .drop() directly.',
      skeleton: `struct Resource {
    name: String,
}

impl Drop for Resource {
    fn drop(&mut self) {
        println!("Dropping {}", self.name);
    }
}

fn main() {
    let r = Resource { name: String::from("db") };
    println!("Using resource");
    r.drop();
    println!("Done");
}`,
      solution: `struct Resource {
    name: String,
}

impl Drop for Resource {
    fn drop(&mut self) {
        println!("Dropping {}", self.name);
    }
}

fn main() {
    let r = Resource { name: String::from("db") };
    println!("Using resource");
    drop(r);
    println!("Done");
}`,
      hints: [
        'Rust does not allow calling .drop() directly on a value.',
        'Use the std::mem::drop() function instead.',
        'Replace r.drop() with drop(r).'
      ],
      concepts: ['explicit-drop', 'std-mem-drop', 'double-free-prevention']
    },
    {
      id: 'rs-drop-9',
      title: 'Fix Drop and Copy Conflict',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the struct that tries to implement both Drop and Copy.',
      skeleton: `#[derive(Clone, Copy)]
struct Counter {
    value: i32,
}

impl Drop for Counter {
    fn drop(&mut self) {
        println!("Counter dropped: {}", self.value);
    }
}

fn main() {
    let c = Counter { value: 10 };
    let c2 = c;
    println!("{} {}", c.value, c2.value);
}`,
      solution: `#[derive(Clone)]
struct Counter {
    value: i32,
}

impl Drop for Counter {
    fn drop(&mut self) {
        println!("Counter dropped: {}", self.value);
    }
}

fn main() {
    let c = Counter { value: 10 };
    let c2 = c.clone();
    println!("{} {}", c.value, c2.value);
}`,
      hints: [
        'A type cannot implement both Drop and Copy.',
        'Remove Copy and use Clone instead.',
        'Change let c2 = c to let c2 = c.clone() since c is no longer Copy.'
      ],
      concepts: ['drop-copy-exclusion', 'clone', 'move-semantics']
    },
    {
      id: 'rs-drop-10',
      title: 'Predict Early Drop',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output when drop() is called early.',
      skeleton: `struct D(&'static str);

impl Drop for D {
    fn drop(&mut self) {
        print!("{} ", self.0);
    }
}

fn main() {
    let a = D("a");
    let b = D("b");
    print!("start ");
    drop(a);
    print!("mid ");
    drop(b);
    print!("end ");
}`,
      solution: 'start a mid b end ',
      hints: [
        'drop(a) triggers a\'s Drop immediately.',
        'drop(b) triggers b\'s Drop immediately after "mid".',
        'No automatic drops at end since both were already dropped.'
      ],
      concepts: ['early-drop', 'drop-order', 'explicit-drop']
    },
    {
      id: 'rs-drop-11',
      title: 'Drop Guard Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement a DropGuard that sets a flag to true when dropped, useful for ensuring cleanup.',
      skeleton: `use std::cell::Cell;

struct DropGuard<'a> {
    completed: &'a Cell<bool>,
}

impl<'a> DropGuard<'a> {
    fn new(flag: &'a Cell<bool>) -> Self {
        // todo: create guard with flag set to false
    }
}

// todo: implement Drop that sets completed to true`,
      solution: `use std::cell::Cell;

struct DropGuard<'a> {
    completed: &'a Cell<bool>,
}

impl<'a> DropGuard<'a> {
    fn new(flag: &'a Cell<bool>) -> Self {
        flag.set(false);
        DropGuard { completed: flag }
    }
}

impl<'a> Drop for DropGuard<'a> {
    fn drop(&mut self) {
        self.completed.set(true);
    }
}`,
      hints: [
        'In new(), set the flag to false and store the reference.',
        'In drop(), set self.completed to true.',
        'Use Cell::set() for interior mutability.'
      ],
      concepts: ['drop-guard', 'raii', 'cleanup-pattern', 'cell']
    },
    {
      id: 'rs-drop-12',
      title: 'Nested Struct Drop Order',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create structs that demonstrate field drop order (fields drop in declaration order).',
      skeleton: `struct Inner {
    name: &'static str,
}

impl Drop for Inner {
    fn drop(&mut self) {
        print!("{} ", self.name);
    }
}

struct Outer {
    // todo: add two Inner fields: first and second
}

// todo: implement Drop for Outer that prints "outer"`,
      solution: `struct Inner {
    name: &'static str,
}

impl Drop for Inner {
    fn drop(&mut self) {
        print!("{} ", self.name);
    }
}

struct Outer {
    first: Inner,
    second: Inner,
}

impl Drop for Outer {
    fn drop(&mut self) {
        print!("outer ");
    }
}`,
      hints: [
        'Struct fields are dropped in declaration order after the struct\'s own Drop.',
        'Add first: Inner and second: Inner fields.',
        'Outer::drop runs first, then first.drop(), then second.drop().'
      ],
      concepts: ['field-drop-order', 'nested-drop', 'struct-fields']
    },
    {
      id: 'rs-drop-13',
      title: 'ManuallyDrop Usage',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use ManuallyDrop to prevent automatic dropping.',
      skeleton: `use std::mem::ManuallyDrop;

fn main() {
    let mut data = __BLANK__(String::from("important"));
    println!("Data: {}", *data);
    // data will NOT be automatically dropped
}`,
      solution: `use std::mem::ManuallyDrop;

fn main() {
    let mut data = ManuallyDrop::new(String::from("important"));
    println!("Data: {}", *data);
    // data will NOT be automatically dropped
}`,
      hints: [
        'ManuallyDrop::new() wraps a value to prevent auto-drop.',
        'You can still access the inner value through Deref.',
        'ManuallyDrop::new(String::from("important"))'
      ],
      concepts: ['manually-drop', 'drop-prevention', 'unsafe']
    },
    {
      id: 'rs-drop-14',
      title: 'Fix Use After Drop',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix the code that tries to use a value after it has been dropped.',
      skeleton: `struct Data {
    value: String,
}

impl Drop for Data {
    fn drop(&mut self) {
        println!("Dropping: {}", self.value);
    }
}

fn main() {
    let d = Data { value: String::from("hello") };
    drop(d);
    println!("Value was: {}", d.value);
}`,
      solution: `struct Data {
    value: String,
}

impl Drop for Data {
    fn drop(&mut self) {
        println!("Dropping: {}", self.value);
    }
}

fn main() {
    let d = Data { value: String::from("hello") };
    println!("Value was: {}", d.value);
    drop(d);
}`,
      hints: [
        'After drop(d), d is moved and cannot be used.',
        'Move the println! before the drop() call.',
        'Use the value first, then drop it.'
      ],
      concepts: ['use-after-move', 'drop', 'ownership']
    },
    {
      id: 'rs-drop-15',
      title: 'Implement RAII File Handle',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Create a FileGuard that opens a file path on creation and closes it on drop, using RAII.',
      skeleton: `struct FileGuard {
    path: String,
    is_open: bool,
}

impl FileGuard {
    fn new(path: &str) -> Self {
        // todo: create and "open" the file
    }

    fn read(&self) -> &str {
        if self.is_open { &self.path } else { "closed" }
    }
}

// todo: implement Drop that "closes" the file`,
      solution: `struct FileGuard {
    path: String,
    is_open: bool,
}

impl FileGuard {
    fn new(path: &str) -> Self {
        println!("Opening: {path}");
        FileGuard {
            path: path.to_string(),
            is_open: true,
        }
    }

    fn read(&self) -> &str {
        if self.is_open { &self.path } else { "closed" }
    }
}

impl Drop for FileGuard {
    fn drop(&mut self) {
        self.is_open = false;
        println!("Closing: {}", self.path);
    }
}`,
      hints: [
        'In new(), set is_open to true and store the path.',
        'In drop(), set is_open to false and print a closing message.',
        'This demonstrates the RAII pattern: acquire in constructor, release in destructor.'
      ],
      concepts: ['raii', 'drop-trait', 'resource-management', 'file-handle']
    },
    {
      id: 'rs-drop-16',
      title: 'Write Connection Pool Drop',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Implement a ConnectionPool that drops all connections when it goes out of scope.',
      skeleton: `struct Connection {
    id: u32,
}

impl Drop for Connection {
    fn drop(&mut self) {
        println!("Closing connection {}", self.id);
    }
}

struct ConnectionPool {
    connections: Vec<Connection>,
}

impl ConnectionPool {
    fn new() -> Self {
        // todo: create empty pool
    }

    fn add(&mut self, id: u32) {
        // todo: add a connection
    }
}

// todo: implement Drop for ConnectionPool that prints how many connections are being cleaned up`,
      solution: `struct Connection {
    id: u32,
}

impl Drop for Connection {
    fn drop(&mut self) {
        println!("Closing connection {}", self.id);
    }
}

struct ConnectionPool {
    connections: Vec<Connection>,
}

impl ConnectionPool {
    fn new() -> Self {
        ConnectionPool { connections: Vec::new() }
    }

    fn add(&mut self, id: u32) {
        self.connections.push(Connection { id });
    }
}

impl Drop for ConnectionPool {
    fn drop(&mut self) {
        println!("Dropping pool with {} connections", self.connections.len());
    }
}`,
      hints: [
        'ConnectionPool::drop runs first, then each Connection is dropped.',
        'In the pool drop, print the count of connections.',
        'The Vec will drop each Connection automatically after the pool drop runs.'
      ],
      concepts: ['nested-drop', 'raii', 'collection-cleanup', 'drop-order']
    },
    {
      id: 'rs-drop-17',
      title: 'Predict Complex Drop Order',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Predict the drop order for nested structs and scopes.',
      skeleton: `struct D(&'static str);

impl Drop for D {
    fn drop(&mut self) {
        print!("{} ", self.0);
    }
}

fn main() {
    let _x = D("x");
    let _y = D("y");
    {
        let _z = D("z");
    }
    let _w = D("w");
}`,
      solution: 'z w y x ',
      hints: [
        '_z drops when the inner scope ends.',
        '_w, _y, _x drop at end of main in reverse declaration order.',
        'Order: z (scope end), then w y x (reverse order at main end).'
      ],
      concepts: ['drop-order', 'scope', 'reverse-declaration']
    },
    {
      id: 'rs-drop-18',
      title: 'Refactor to Use Drop Guard',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor manual cleanup code to use a RAII drop guard pattern.',
      skeleton: `fn process() {
    let mut cleanup_needed = true;
    println!("Starting process");

    // ... do work ...
    println!("Working...");

    // Manual cleanup at every exit point
    if cleanup_needed {
        println!("Cleanup done");
        cleanup_needed = false;
    }
}

fn main() {
    process();
}`,
      solution: `struct CleanupGuard;

impl Drop for CleanupGuard {
    fn drop(&mut self) {
        println!("Cleanup done");
    }
}

fn process() {
    let _guard = CleanupGuard;
    println!("Starting process");

    // ... do work ...
    println!("Working...");

    // Cleanup happens automatically when _guard is dropped
}

fn main() {
    process();
}`,
      hints: [
        'Create a struct that performs cleanup in its Drop impl.',
        'Assign it to a variable at the start of the function.',
        'The guard ensures cleanup runs no matter how the function exits.'
      ],
      concepts: ['raii', 'drop-guard', 'refactoring', 'cleanup-pattern']
    },
    {
      id: 'rs-drop-19',
      title: 'Refactor Manual Resource Management',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor code that manually tracks open/close state into a proper RAII wrapper.',
      skeleton: `fn run() {
    let name = String::from("database");
    let mut is_open = true;
    println!("Opened {name}");

    // work
    println!("Using {name}");

    // must remember to close
    is_open = false;
    println!("Closed {name}");
}

fn main() {
    run();
}`,
      solution: `struct ManagedResource {
    name: String,
}

impl ManagedResource {
    fn new(name: &str) -> Self {
        println!("Opened {name}");
        ManagedResource { name: name.to_string() }
    }

    fn use_resource(&self) {
        println!("Using {}", self.name);
    }
}

impl Drop for ManagedResource {
    fn drop(&mut self) {
        println!("Closed {}", self.name);
    }
}

fn run() {
    let res = ManagedResource::new("database");
    res.use_resource();
}

fn main() {
    run();
}`,
      hints: [
        'Wrap the resource in a struct with a constructor and Drop.',
        'The constructor prints "Opened" and Drop prints "Closed".',
        'No manual state tracking needed - Drop guarantees cleanup.'
      ],
      concepts: ['raii', 'resource-management', 'refactoring', 'drop-trait']
    },
    {
      id: 'rs-drop-20',
      title: 'Generic Drop with Bounds',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Implement a generic Scoped<T: Display> that prints the value when dropped.',
      skeleton: `use std::fmt::Display;

struct Scoped<T: Display> {
    label: &'static str,
    value: T,
}

impl<T: Display> Scoped<T> {
    fn new(label: &'static str, value: T) -> Self {
        // todo: create and print "Enter {label}: {value}"
    }
}

// todo: implement Drop that prints "Exit {label}: {value}"`,
      solution: `use std::fmt::Display;

struct Scoped<T: Display> {
    label: &'static str,
    value: T,
}

impl<T: Display> Scoped<T> {
    fn new(label: &'static str, value: T) -> Self {
        println!("Enter {label}: {value}");
        Scoped { label, value }
    }
}

impl<T: Display> Drop for Scoped<T> {
    fn drop(&mut self) {
        println!("Exit {}: {}", self.label, self.value);
    }
}`,
      hints: [
        'The T: Display bound is needed on the impl block too.',
        'In new(), print "Enter" and return the struct.',
        'In drop(), print "Exit" using self.label and self.value.'
      ],
      concepts: ['generic-drop', 'trait-bounds', 'display', 'scoped-pattern']
    }
  ]
};
