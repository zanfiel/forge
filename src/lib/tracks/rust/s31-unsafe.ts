import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-unsafe',
  title: '31. Unsafe Rust',
  explanation: `## Unsafe Rust

\`unsafe\` unlocks five superpowers that the compiler cannot verify:

1. **Dereference raw pointers**
2. **Call unsafe functions**
3. **Access mutable statics**
4. **Implement unsafe traits**
5. **Access union fields**

### Raw Pointers
\`\`\`rust
let x = 42;
let r = &x as *const i32;     // immutable raw pointer
let mr = &x as *const i32 as *mut i32; // mutable raw pointer
unsafe { println!("{}", *r); } // dereference requires unsafe
\`\`\`

### Unsafe Functions
\`\`\`rust
unsafe fn dangerous() { /* ... */ }
unsafe { dangerous(); }
\`\`\`

### Mutable Statics
\`\`\`rust
static mut COUNTER: u32 = 0;
unsafe { COUNTER += 1; }
\`\`\`

### Unsafe Traits
\`\`\`rust
unsafe trait Marker {}
unsafe impl Marker for i32 {}
\`\`\`

### Safe Abstraction over Unsafe
\`\`\`rust
fn split_at_mut(data: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = data.len();
    let ptr = data.as_mut_ptr();
    assert!(mid <= len);
    unsafe {
        (
            std::slice::from_raw_parts_mut(ptr, mid),
            std::slice::from_raw_parts_mut(ptr.add(mid), len - mid),
        )
    }
}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-unsafe-1',
      title: 'Dereference Raw Pointer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Dereference a raw pointer inside an unsafe block.',
      skeleton: `fn main() {
    let x = 42;
    let r = &x as *const i32;
    __BLANK__ {
        println!("{}", *r);
    }
}`,
      solution: `fn main() {
    let x = 42;
    let r = &x as *const i32;
    unsafe {
        println!("{}", *r);
    }
}`,
      hints: [
        'Dereferencing raw pointers requires an unsafe block.',
        'unsafe { ... } tells the compiler you guarantee safety.',
        'The answer is unsafe.',
      ],
      concepts: ['raw-pointer', 'unsafe', 'dereference'],
    },
    {
      id: 'rs-unsafe-2',
      title: 'Create Raw Pointers',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create an immutable raw pointer from a reference.',
      skeleton: `fn main() {
    let val = 100;
    let ptr = &val as __BLANK__ i32;
    unsafe {
        println!("{}", *ptr);
    }
}`,
      solution: `fn main() {
    let val = 100;
    let ptr = &val as *const i32;
    unsafe {
        println!("{}", *ptr);
    }
}`,
      hints: [
        'Immutable raw pointers use *const T.',
        'Mutable raw pointers use *mut T.',
        'The answer is *const.',
      ],
      concepts: ['*const', 'raw-pointer', 'cast'],
    },
    {
      id: 'rs-unsafe-3',
      title: 'Call Unsafe Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Call an unsafe function within an unsafe block.',
      skeleton: `unsafe fn secret() -> i32 { 42 }

fn main() {
    let val = __BLANK__ { secret() };
    println!("{val}");
}`,
      solution: `unsafe fn secret() -> i32 { 42 }

fn main() {
    let val = unsafe { secret() };
    println!("{val}");
}`,
      hints: [
        'Unsafe functions can only be called in unsafe contexts.',
        'Wrap the call in an unsafe block.',
        'The answer is unsafe.',
      ],
      concepts: ['unsafe-fn', 'unsafe-block', 'calling-convention'],
    },
    {
      id: 'rs-unsafe-4',
      title: 'Mutable Static',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Access and modify a mutable static variable.',
      skeleton: `static __BLANK__ COUNTER: u32 = 0;

fn increment() {
    unsafe {
        COUNTER += 1;
    }
}

fn main() {
    increment();
    increment();
    unsafe {
        println!("{COUNTER}");
    }
}`,
      solution: `static mut COUNTER: u32 = 0;

fn increment() {
    unsafe {
        COUNTER += 1;
    }
}

fn main() {
    increment();
    increment();
    unsafe {
        println!("{COUNTER}");
    }
}`,
      hints: [
        'Mutable statics require the mut keyword.',
        'All access to static mut requires unsafe.',
        'The answer is mut.',
      ],
      concepts: ['static-mut', 'unsafe', 'global-state'],
    },
    {
      id: 'rs-unsafe-5',
      title: 'Unsafe Trait',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement an unsafe trait.',
      skeleton: `unsafe trait ThreadSafe {}

__BLANK__ impl ThreadSafe for u32 {}

fn main() {
    println!("u32 is ThreadSafe");
}`,
      solution: `unsafe trait ThreadSafe {}

unsafe impl ThreadSafe for u32 {}

fn main() {
    println!("u32 is ThreadSafe");
}`,
      hints: [
        'Implementing an unsafe trait also requires the unsafe keyword.',
        'The implementor guarantees the invariants the trait requires.',
        'The answer is unsafe.',
      ],
      concepts: ['unsafe-trait', 'unsafe-impl', 'invariants'],
    },
    {
      id: 'rs-unsafe-6',
      title: 'from_raw_parts',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Reconstruct a slice from a raw pointer and length.',
      skeleton: `fn main() {
    let data = vec![10, 20, 30, 40, 50];
    let ptr = data.as_ptr();
    let len = data.len();
    let slice = unsafe {
        std::slice::__BLANK__(ptr, len)
    };
    println!("{:?}", slice);
}`,
      solution: `fn main() {
    let data = vec![10, 20, 30, 40, 50];
    let ptr = data.as_ptr();
    let len = data.len();
    let slice = unsafe {
        std::slice::from_raw_parts(ptr, len)
    };
    println!("{:?}", slice);
}`,
      hints: [
        'from_raw_parts creates a slice from a pointer and length.',
        'The caller must ensure the pointer is valid for len elements.',
        'The answer is from_raw_parts.',
      ],
      concepts: ['from_raw_parts', 'slice', 'raw-pointer'],
    },
    {
      id: 'rs-unsafe-7',
      title: 'Safe Wrapper for Pointer Offset',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a safe function that reads a value at an offset from a slice using raw pointers.',
      skeleton: `// Read the element at index from the slice using raw pointer arithmetic
fn read_at(data: &[i32], index: usize) -> Option<i32> {
    // TODO: bounds check, then use unsafe pointer offset
}`,
      solution: `fn read_at(data: &[i32], index: usize) -> Option<i32> {
    if index >= data.len() {
        return None;
    }
    let ptr = data.as_ptr();
    unsafe { Some(*ptr.add(index)) }
}`,
      hints: [
        'Check bounds first for safety.',
        'Use as_ptr() to get a raw pointer, then ptr.add(index).',
        'Dereference with *ptr.add(index) inside unsafe.',
      ],
      concepts: ['raw-pointer', 'add', 'bounds-check', 'safe-abstraction'],
    },
    {
      id: 'rs-unsafe-8',
      title: 'Split Slice at Mut',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement split_at_mut using unsafe code.',
      skeleton: `// Split a mutable slice into two non-overlapping mutable slices
fn my_split_at_mut(data: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    // TODO: use as_mut_ptr and from_raw_parts_mut
}`,
      solution: `fn my_split_at_mut(data: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = data.len();
    assert!(mid <= len);
    let ptr = data.as_mut_ptr();
    unsafe {
        (
            std::slice::from_raw_parts_mut(ptr, mid),
            std::slice::from_raw_parts_mut(ptr.add(mid), len - mid),
        )
    }
}`,
      hints: [
        'as_mut_ptr() gives a *mut i32.',
        'from_raw_parts_mut(ptr, len) creates a &mut [i32].',
        'The two slices are non-overlapping so this is safe.',
      ],
      concepts: ['as_mut_ptr', 'from_raw_parts_mut', 'split', 'safe-abstraction'],
    },
    {
      id: 'rs-unsafe-9',
      title: 'Inline Assembly',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Use std::arch::asm! for a simple inline assembly operation (conceptual).',
      skeleton: `// Use unsafe to call a C function via extern
extern "C" {
    fn abs(input: i32) -> i32;
}

// Wrap the unsafe extern call in a safe function
fn safe_abs(x: i32) -> i32 {
    // TODO
}`,
      solution: `extern "C" {
    fn abs(input: i32) -> i32;
}

fn safe_abs(x: i32) -> i32 {
    unsafe { abs(x) }
}`,
      hints: [
        'extern "C" functions are unsafe to call.',
        'Wrap in a safe function with an unsafe block.',
        'The caller of safe_abs does not need unsafe.',
      ],
      concepts: ['extern', 'C-ABI', 'safe-abstraction', 'FFI'],
    },
    {
      id: 'rs-unsafe-10',
      title: 'Union Access',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Access a union field using unsafe.',
      skeleton: `union IntOrFloat {
    i: i32,
    f: f32,
}

// Store an i32 in the union and read it back
fn round_trip_int(val: i32) -> i32 {
    // TODO
}`,
      solution: `union IntOrFloat {
    i: i32,
    f: f32,
}

fn round_trip_int(val: i32) -> i32 {
    let u = IntOrFloat { i: val };
    unsafe { u.i }
}`,
      hints: [
        'Creating a union value is safe.',
        'Reading a union field requires unsafe.',
        'Only the last written field is guaranteed valid.',
      ],
      concepts: ['union', 'unsafe', 'field-access'],
    },
    {
      id: 'rs-unsafe-11',
      title: 'Pointer Transmute',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Use std::mem::transmute to reinterpret bytes (with caution).',
      skeleton: `// Transmute a [u8; 4] into an i32 (little-endian)
fn bytes_to_i32(bytes: [u8; 4]) -> i32 {
    // TODO: use transmute
}`,
      solution: `fn bytes_to_i32(bytes: [u8; 4]) -> i32 {
    unsafe { std::mem::transmute(bytes) }
}`,
      hints: [
        'transmute reinterprets bits from one type to another.',
        'Both types must have the same size.',
        'This is platform-dependent (endianness matters).',
      ],
      concepts: ['transmute', 'reinterpret', 'unsafe', 'endianness'],
    },
    {
      id: 'rs-unsafe-12',
      title: 'Safe Linked List Node',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Build a simple unsafe singly-linked list push operation.',
      skeleton: `use std::ptr;

struct Node {
    value: i32,
    next: *mut Node,
}

struct List {
    head: *mut Node,
}

impl List {
    fn new() -> Self {
        List { head: ptr::null_mut() }
    }

    // Push a value to the front
    fn push(&mut self, val: i32) {
        // TODO: allocate a node and set it as head
    }

    // Get head value
    fn head_value(&self) -> Option<i32> {
        // TODO
    }
}`,
      solution: `use std::ptr;

struct Node {
    value: i32,
    next: *mut Node,
}

struct List {
    head: *mut Node,
}

impl List {
    fn new() -> Self {
        List { head: ptr::null_mut() }
    }

    fn push(&mut self, val: i32) {
        let node = Box::into_raw(Box::new(Node {
            value: val,
            next: self.head,
        }));
        self.head = node;
    }

    fn head_value(&self) -> Option<i32> {
        if self.head.is_null() {
            None
        } else {
            unsafe { Some((*self.head).value) }
        }
    }
}`,
      hints: [
        'Use Box::new to allocate, Box::into_raw to get a raw pointer.',
        'Set the new node next to current head, then update head.',
        'Dereference head with (*self.head) in unsafe.',
      ],
      concepts: ['raw-pointer', 'Box::into_raw', 'linked-list', 'unsafe'],
    },
    {
      id: 'rs-unsafe-13',
      title: 'Bug: Dangling Pointer',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix code that creates a dangling raw pointer.',
      skeleton: `fn dangling() -> *const i32 {
    let x = 42;
    &x as *const i32 // x is dropped, pointer dangles!
}

fn main() {
    let ptr = dangling();
    unsafe {
        println!("{}", *ptr);
    }
}`,
      solution: `fn not_dangling() -> *const i32 {
    let x = Box::new(42);
    Box::into_raw(x) // heap-allocated, caller must free
}

fn main() {
    let ptr = not_dangling();
    unsafe {
        println!("{}", *ptr);
        drop(Box::from_raw(ptr as *mut i32)); // clean up
    }
}`,
      hints: [
        'Local variables are dropped at end of function.',
        'Heap-allocate with Box to extend the lifetime.',
        'Use Box::into_raw and later Box::from_raw to manage memory.',
      ],
      concepts: ['dangling-pointer', 'Box', 'heap-allocation', 'memory-management'],
    },
    {
      id: 'rs-unsafe-14',
      title: 'Bug: Data Race with Static Mut',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix a data race caused by concurrent access to a mutable static.',
      skeleton: `use std::thread;

static mut COUNTER: u64 = 0;

fn main() {
    let mut handles = vec![];
    for _ in 0..10 {
        handles.push(thread::spawn(|| {
            for _ in 0..1000 {
                unsafe { COUNTER += 1; } // data race!
            }
        }));
    }
    for h in handles { h.join().unwrap(); }
    unsafe { println!("{COUNTER}"); }
}`,
      solution: `use std::sync::atomic::{AtomicU64, Ordering};
use std::thread;

static COUNTER: AtomicU64 = AtomicU64::new(0);

fn main() {
    let mut handles = vec![];
    for _ in 0..10 {
        handles.push(thread::spawn(|| {
            for _ in 0..1000 {
                COUNTER.fetch_add(1, Ordering::Relaxed);
            }
        }));
    }
    for h in handles { h.join().unwrap(); }
    println!("{}", COUNTER.load(Ordering::SeqCst));
}`,
      hints: [
        'static mut with concurrent writes is undefined behavior.',
        'Replace with AtomicU64 for safe concurrent access.',
        'Atomics do not require unsafe blocks.',
      ],
      concepts: ['data-race', 'static-mut', 'AtomicU64', 'Ordering'],
    },
    {
      id: 'rs-unsafe-15',
      title: 'Bug: Aliasing Mutable References',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix code that unsoundly creates two mutable references to the same data.',
      skeleton: `fn main() {
    let mut data = vec![1, 2, 3, 4];
    let ptr = data.as_mut_ptr();
    let slice1 = unsafe { std::slice::from_raw_parts_mut(ptr, 4) };
    let slice2 = unsafe { std::slice::from_raw_parts_mut(ptr, 4) };
    // Two &mut to same memory = UB!
    slice1[0] = 10;
    slice2[0] = 20;
    println!("{:?}", data);
}`,
      solution: `fn main() {
    let mut data = vec![1, 2, 3, 4];
    let ptr = data.as_mut_ptr();
    // Split into non-overlapping slices
    let slice1 = unsafe { std::slice::from_raw_parts_mut(ptr, 2) };
    let slice2 = unsafe { std::slice::from_raw_parts_mut(ptr.add(2), 2) };
    slice1[0] = 10;
    slice2[0] = 30;
    println!("{:?}", data);
}`,
      hints: [
        'Two &mut references to the same memory is undefined behavior.',
        'Split into non-overlapping regions.',
        'Use ptr.add(offset) to create disjoint slices.',
      ],
      concepts: ['aliasing', 'mutable-references', 'UB', 'non-overlapping'],
    },
    {
      id: 'rs-unsafe-16',
      title: 'Predict: Raw Pointer Null Check',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the output of a null pointer check.',
      skeleton: `fn main() {
    let ptr: *const i32 = std::ptr::null();
    if ptr.is_null() {
        println!("null");
    } else {
        println!("not null");
    }
}`,
      solution: `null`,
      hints: [
        'std::ptr::null() creates a null pointer.',
        'is_null() checks if a raw pointer is null.',
        'The pointer is null, so "null" is printed.',
      ],
      concepts: ['null-pointer', 'is_null', 'raw-pointer'],
    },
    {
      id: 'rs-unsafe-17',
      title: 'Predict: Pointer Arithmetic',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of pointer offset operations.',
      skeleton: `fn main() {
    let arr = [10, 20, 30, 40, 50];
    let ptr = arr.as_ptr();
    unsafe {
        println!("{}", *ptr.add(2));
        println!("{}", *ptr.add(4));
    }
}`,
      solution: `30
50`,
      hints: [
        'ptr.add(n) advances by n elements (not bytes).',
        'add(2) points to index 2: value 30.',
        'add(4) points to index 4: value 50.',
      ],
      concepts: ['pointer-arithmetic', 'add', 'element-offset'],
    },
    {
      id: 'rs-unsafe-18',
      title: 'Predict: Transmute Size',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict what happens when transmuting between same-sized types.',
      skeleton: `fn main() {
    let bytes: [u8; 4] = [1, 0, 0, 0];
    let val: u32 = unsafe { std::mem::transmute(bytes) };
    println!("{val}");
}`,
      solution: `1`,
      hints: [
        'On little-endian systems, [1, 0, 0, 0] is 1 as u32.',
        'transmute reinterprets the raw bytes.',
        'The least significant byte comes first in little-endian.',
      ],
      concepts: ['transmute', 'little-endian', 'byte-representation'],
    },
    {
      id: 'rs-unsafe-19',
      title: 'Refactor: Unsafe to Safe API',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Wrap unsafe operations in a safe public API.',
      skeleton: `static mut CONFIG: Option<String> = None;

pub fn set_config(s: &str) {
    unsafe { CONFIG = Some(s.to_string()); }
}

pub fn get_config() -> String {
    unsafe { CONFIG.clone().unwrap_or_default() }
}

fn main() {
    set_config("production");
    println!("{}", get_config());
}`,
      solution: `use std::sync::OnceLock;

static CONFIG: OnceLock<String> = OnceLock::new();

pub fn set_config(s: &str) {
    CONFIG.set(s.to_string()).ok();
}

pub fn get_config() -> String {
    CONFIG.get().cloned().unwrap_or_default()
}

fn main() {
    set_config("production");
    println!("{}", get_config());
}`,
      hints: [
        'static mut is unsafe and prone to data races.',
        'Use OnceLock for thread-safe one-time initialization.',
        'OnceLock::set and OnceLock::get are safe operations.',
      ],
      concepts: ['OnceLock', 'static-mut', 'safe-abstraction', 'refactor'],
    },
    {
      id: 'rs-unsafe-20',
      title: 'Refactor: Manual Memory to Box',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Replace manual heap allocation with safe Box operations.',
      skeleton: `use std::alloc::{alloc, dealloc, Layout};

fn main() {
    let layout = Layout::new::<i32>();
    unsafe {
        let ptr = alloc(layout) as *mut i32;
        *ptr = 42;
        println!("{}", *ptr);
        dealloc(ptr as *mut u8, layout);
    }
}`,
      solution: `fn main() {
    let val = Box::new(42);
    println!("{}", *val);
    // Box automatically deallocates when dropped
}`,
      hints: [
        'Box::new allocates on the heap safely.',
        'It automatically deallocates when dropped.',
        'No need for manual alloc/dealloc.',
      ],
      concepts: ['Box', 'alloc', 'dealloc', 'safe-abstraction'],
    },
  ],
};
