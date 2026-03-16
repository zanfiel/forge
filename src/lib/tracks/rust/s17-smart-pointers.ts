import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-smart',
  title: '17. Smart Pointers',
  explanation: `## Smart Pointers

Smart pointers are data structures that act like pointers but also have additional metadata and capabilities.

### Box<T> -- Heap Allocation
\`\`\`rust
let b = Box::new(5);
println!("{}", b); // Deref coercion
\`\`\`
Use Box when you need:
- A type whose size can't be known at compile time
- Large data you want to transfer ownership without copying
- A trait object (dyn Trait)

### Deref and DerefMut
\`\`\`rust
use std::ops::Deref;
struct MyBox<T>(T);
impl<T> Deref for MyBox<T> {
    type Target = T;
    fn deref(&self) -> &T { &self.0 }
}
\`\`\`

### Drop Trait
\`\`\`rust
impl Drop for MyStruct {
    fn drop(&mut self) {
        println!("Dropping!");
    }
}
\`\`\`

### Rc<T> -- Reference Counting
\`\`\`rust
use std::rc::Rc;
let a = Rc::new(5);
let b = Rc::clone(&a);
println!("count = {}", Rc::strong_count(&a)); // 2
\`\`\`

### Arc<T> -- Atomic Reference Counting
Thread-safe version of Rc.

### RefCell<T> -- Interior Mutability
\`\`\`rust
use std::cell::RefCell;
let data = RefCell::new(5);
*data.borrow_mut() += 1;
\`\`\`

### Weak<T>
Prevents reference cycles by holding a non-owning reference.
`,
  exercises: [
    {
      id: 'rs-smart-1',
      title: 'Box Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Allocate a value on the heap using Box.',
      skeleton: `let b = __BLANK__::new(42);
println!("Value: {}", b);`,
      solution: `let b = Box::new(42);
println!("Value: {}", b);`,
      hints: [
        'Box is the simplest smart pointer for heap allocation.',
        'Use Box::new() to create a boxed value.',
        'The answer is Box.',
      ],
      concepts: ['Box', 'heap allocation', 'smart pointer'],
    },
    {
      id: 'rs-smart-2',
      title: 'Box with Recursive Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use Box to create a recursive enum.',
      skeleton: `enum List {
    Cons(i32, __BLANK__<List>),
    Nil,
}
let list = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));`,
      solution: `enum List {
    Cons(i32, Box<List>),
    Nil,
}
let list = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));`,
      hints: [
        'Recursive types need indirection to have a known size.',
        'Box provides heap allocation with a known pointer size.',
        'The answer is Box.',
      ],
      concepts: ['Box', 'recursive type', 'cons list'],
    },
    {
      id: 'rs-smart-3',
      title: 'Deref Coercion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Demonstrate Deref coercion from Box<String> to &str.',
      skeleton: `fn greet(name: &str) {
    println!("Hello, {}!", name);
}
let name = Box::new(String::from("Rust"));
greet(__BLANK__);`,
      solution: `fn greet(name: &str) {
    println!("Hello, {}!", name);
}
let name = Box::new(String::from("Rust"));
greet(&name);`,
      hints: [
        'Deref coercion automatically converts references.',
        'Box<String> -> &String -> &str through deref chain.',
        'Just pass a reference to the Box.',
      ],
      concepts: ['Deref', 'coercion', 'Box'],
    },
    {
      id: 'rs-smart-4',
      title: 'Rc Clone',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Clone an Rc to share ownership.',
      skeleton: `use std::rc::Rc;
let a = Rc::new(vec![1, 2, 3]);
let b = Rc::__BLANK__(&a);
println!("a: {:?}, b: {:?}", a, b);
println!("count: {}", Rc::strong_count(&a));`,
      solution: `use std::rc::Rc;
let a = Rc::new(vec![1, 2, 3]);
let b = Rc::clone(&a);
println!("a: {:?}, b: {:?}", a, b);
println!("count: {}", Rc::strong_count(&a));`,
      hints: [
        'Rc::clone increments the reference count.',
        'It does not deep-clone the data.',
        'Use Rc::clone() for clarity.',
      ],
      concepts: ['Rc', 'reference counting', 'clone'],
    },
    {
      id: 'rs-smart-5',
      title: 'RefCell Borrow Mut',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Mutate data inside a RefCell.',
      skeleton: `use std::cell::RefCell;
let data = RefCell::new(vec![1, 2, 3]);
data.__BLANK__().push(4);
println!("{:?}", data.borrow());`,
      solution: `use std::cell::RefCell;
let data = RefCell::new(vec![1, 2, 3]);
data.borrow_mut().push(4);
println!("{:?}", data.borrow());`,
      hints: [
        'RefCell enforces borrowing rules at runtime.',
        'Use borrow_mut() to get a mutable reference.',
        'The answer is borrow_mut().',
      ],
      concepts: ['RefCell', 'interior mutability', 'borrow_mut'],
    },
    {
      id: 'rs-smart-6',
      title: 'Rc Strong Count',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Check the strong reference count of an Rc.',
      skeleton: `use std::rc::Rc;
let a = Rc::new(10);
let b = Rc::clone(&a);
let c = Rc::clone(&a);
println!("count = {}", Rc::__BLANK__(&a));`,
      solution: `use std::rc::Rc;
let a = Rc::new(10);
let b = Rc::clone(&a);
let c = Rc::clone(&a);
println!("count = {}", Rc::strong_count(&a));`,
      hints: [
        'Rc tracks how many owners exist.',
        'The method returns the number of strong references.',
        'Use Rc::strong_count().',
      ],
      concepts: ['Rc', 'strong_count', 'reference counting'],
    },
    {
      id: 'rs-smart-7',
      title: 'Custom Smart Pointer with Drop',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Implement the Drop trait for a custom struct that prints a message.',
      skeleton: `struct Resource {
    name: String,
}

// Implement Drop for Resource
// It should print "Dropping: {name}"

fn main() {
    let r = Resource { name: String::from("file.txt") };
    println!("Created: {}", r.name);
}`,
      solution: `struct Resource {
    name: String,
}

impl Drop for Resource {
    fn drop(&mut self) {
        println!("Dropping: {}", self.name);
    }
}

fn main() {
    let r = Resource { name: String::from("file.txt") };
    println!("Created: {}", r.name);
}`,
      hints: [
        'Implement the Drop trait with a drop(&mut self) method.',
        'The drop method is called automatically when the value goes out of scope.',
        'Use println! with self.name inside drop.',
      ],
      concepts: ['Drop', 'RAII', 'destructor'],
    },
    {
      id: 'rs-smart-8',
      title: 'Implement Deref',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement Deref for a custom wrapper type.',
      skeleton: `use std::ops::Deref;

struct Wrapper<T> {
    value: T,
}

impl<T> Wrapper<T> {
    fn new(value: T) -> Self {
        Wrapper { value }
    }
}

// Implement Deref for Wrapper<T>

fn main() {
    let w = Wrapper::new(String::from("hello"));
    // This should work via deref coercion:
    assert_eq!(w.len(), 5);
}`,
      solution: `use std::ops::Deref;

struct Wrapper<T> {
    value: T,
}

impl<T> Wrapper<T> {
    fn new(value: T) -> Self {
        Wrapper { value }
    }
}

impl<T> Deref for Wrapper<T> {
    type Target = T;
    fn deref(&self) -> &T {
        &self.value
    }
}

fn main() {
    let w = Wrapper::new(String::from("hello"));
    assert_eq!(w.len(), 5);
}`,
      hints: [
        'Deref requires specifying an associated type Target.',
        'The deref method returns a reference to the inner value.',
        'Return &self.value from the deref method.',
      ],
      concepts: ['Deref', 'associated type', 'coercion'],
    },
    {
      id: 'rs-smart-9',
      title: 'Rc with RefCell',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a shared mutable list using Rc<RefCell<Vec<i32>>>.',
      skeleton: `use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    // Create a shared mutable vector
    // Clone it to two owners
    // Each owner pushes a value
    // Print the final vector

    todo!()
}`,
      solution: `use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    let shared = Rc::new(RefCell::new(vec![1, 2, 3]));
    let owner1 = Rc::clone(&shared);
    let owner2 = Rc::clone(&shared);

    owner1.borrow_mut().push(4);
    owner2.borrow_mut().push(5);

    println!("{:?}", shared.borrow());
}`,
      hints: [
        'Combine Rc for shared ownership with RefCell for interior mutability.',
        'Use Rc::clone to create additional owners.',
        'Use borrow_mut() on the Rc<RefCell<...>> to modify the inner data.',
      ],
      concepts: ['Rc', 'RefCell', 'interior mutability', 'shared ownership'],
    },
    {
      id: 'rs-smart-10',
      title: 'Weak Reference',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a Weak reference and upgrade it.',
      skeleton: `use std::rc::{Rc, Weak};

fn main() {
    // Create an Rc<String>
    // Downgrade to Weak
    // Upgrade Weak back and print
    // Drop the Rc
    // Try upgrading again (should be None)

    todo!()
}`,
      solution: `use std::rc::{Rc, Weak};

fn main() {
    let strong = Rc::new(String::from("data"));
    let weak: Weak<String> = Rc::downgrade(&strong);

    if let Some(val) = weak.upgrade() {
        println!("Upgraded: {}", val);
    }

    drop(strong);

    assert!(weak.upgrade().is_none());
    println!("After drop: upgrade is None");
}`,
      hints: [
        'Use Rc::downgrade() to create a Weak reference.',
        'Use weak.upgrade() to get an Option<Rc<T>>.',
        'After all strong references are dropped, upgrade returns None.',
      ],
      concepts: ['Weak', 'Rc', 'reference cycle prevention'],
    },
    {
      id: 'rs-smart-11',
      title: 'Tree with Weak Parent',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Build a tree node with Rc children and Weak parent to avoid cycles.',
      skeleton: `use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

fn main() {
    // Create a parent node with value 1
    // Create a child node with value 2
    // Add child to parent's children
    // Set child's parent to a weak ref of parent
    // Print the tree

    todo!()
}`,
      solution: `use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

fn main() {
    let parent = Rc::new(Node {
        value: 1,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    let child = Rc::new(Node {
        value: 2,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    parent.children.borrow_mut().push(Rc::clone(&child));
    *child.parent.borrow_mut() = Rc::downgrade(&parent);

    println!("parent strong = {}", Rc::strong_count(&parent));
    println!("child parent = {:?}", child.parent.borrow().upgrade().map(|p| p.value));
}`,
      hints: [
        'Parent holds Rc<Node> children. Child holds Weak<Node> parent.',
        'Use Rc::downgrade to create the weak parent reference.',
        'This prevents reference cycles that would leak memory.',
      ],
      concepts: ['Weak', 'Rc', 'RefCell', 'tree structure', 'cycle prevention'],
    },
    {
      id: 'rs-smart-12',
      title: 'Box dyn Trait',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use Box<dyn Trait> to store different types in a collection.',
      skeleton: `trait Describe {
    fn describe(&self) -> String;
}

struct Cat { name: String }
struct Dog { name: String }

// Implement Describe for Cat and Dog
// Write a function that returns a Vec<Box<dyn Describe>>

fn main() {
    todo!()
}`,
      solution: `trait Describe {
    fn describe(&self) -> String;
}

struct Cat { name: String }
struct Dog { name: String }

impl Describe for Cat {
    fn describe(&self) -> String {
        format!("Cat named {}", self.name)
    }
}

impl Describe for Dog {
    fn describe(&self) -> String {
        format!("Dog named {}", self.name)
    }
}

fn animals() -> Vec<Box<dyn Describe>> {
    vec![
        Box::new(Cat { name: String::from("Whiskers") }),
        Box::new(Dog { name: String::from("Rex") }),
    ]
}

fn main() {
    for animal in animals() {
        println!("{}", animal.describe());
    }
}`,
      hints: [
        'Box<dyn Trait> enables dynamic dispatch with heap allocation.',
        'Each concrete type must implement the trait.',
        'Use Box::new() to wrap each concrete value.',
      ],
      concepts: ['Box', 'dyn Trait', 'dynamic dispatch', 'trait objects'],
    },
    {
      id: 'rs-smart-13',
      title: 'Double Borrow Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the runtime panic caused by simultaneous borrows of RefCell.',
      skeleton: `use std::cell::RefCell;

fn main() {
    let data = RefCell::new(vec![1, 2, 3]);
    let borrowed = data.borrow();
    data.borrow_mut().push(4); // panic!
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
        'RefCell panics if you have an active borrow and try to borrow_mut.',
        'Drop the immutable borrow before taking a mutable one.',
        'Use a block scope to limit the lifetime of the immutable borrow.',
      ],
      concepts: ['RefCell', 'borrow rules', 'runtime panic'],
    },
    {
      id: 'rs-smart-14',
      title: 'Missing Rc::clone',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix the code that moves an Rc instead of cloning it.',
      skeleton: `use std::rc::Rc;

fn main() {
    let a = Rc::new(String::from("shared"));
    let b = a;
    println!("a: {}", a); // error: use of moved value
    println!("b: {}", b);
}`,
      solution: `use std::rc::Rc;

fn main() {
    let a = Rc::new(String::from("shared"));
    let b = Rc::clone(&a);
    println!("a: {}", a);
    println!("b: {}", b);
}`,
      hints: [
        'Rc implements Clone to increment the reference count.',
        'Assignment moves the Rc; use Rc::clone to share ownership.',
        'Replace `let b = a;` with `let b = Rc::clone(&a);`.',
      ],
      concepts: ['Rc', 'clone', 'move semantics'],
    },
    {
      id: 'rs-smart-15',
      title: 'Drop Order Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix early drop of Rc causing Weak upgrade to fail.',
      skeleton: `use std::rc::{Rc, Weak};

fn main() {
    let weak: Weak<i32>;
    {
        let strong = Rc::new(42);
        weak = Rc::downgrade(&strong);
    } // strong dropped here
    // This will always be None:
    let val = weak.upgrade().unwrap(); // panic!
    println!("{}", val);
}`,
      solution: `use std::rc::{Rc, Weak};

fn main() {
    let strong = Rc::new(42);
    let weak: Weak<i32> = Rc::downgrade(&strong);
    let val = weak.upgrade().unwrap();
    println!("{}", val);
}`,
      hints: [
        'Weak::upgrade returns None when all strong references are dropped.',
        'Keep the Rc alive as long as you need to upgrade the Weak.',
        'Move the Rc declaration outside the inner block.',
      ],
      concepts: ['Weak', 'Rc', 'drop order', 'lifetime'],
    },
    {
      id: 'rs-smart-16',
      title: 'Predict Box Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the output of Box deref and comparison.',
      skeleton: `fn main() {
    let a = Box::new(5);
    let b = Box::new(5);
    println!("{}", *a + *b);
    println!("{}", a == b);
}`,
      solution: `10
true`,
      hints: [
        'Dereferencing a Box gives the inner value.',
        '*a + *b adds the inner i32 values.',
        'Box implements PartialEq by comparing inner values.',
      ],
      concepts: ['Box', 'Deref', 'PartialEq'],
    },
    {
      id: 'rs-smart-17',
      title: 'Predict Rc Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the strong count at each point.',
      skeleton: `use std::rc::Rc;

fn main() {
    let a = Rc::new(0);
    println!("{}", Rc::strong_count(&a));
    let b = Rc::clone(&a);
    println!("{}", Rc::strong_count(&a));
    {
        let c = Rc::clone(&a);
        println!("{}", Rc::strong_count(&a));
    }
    println!("{}", Rc::strong_count(&a));
}`,
      solution: `1
2
3
2`,
      hints: [
        'Each Rc::clone increments the count by 1.',
        'When c goes out of scope, the count decreases.',
        'Track: 1 -> clone(b) -> 2 -> clone(c) -> 3 -> drop(c) -> 2.',
      ],
      concepts: ['Rc', 'strong_count', 'drop'],
    },
    {
      id: 'rs-smart-18',
      title: 'Predict RefCell Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of RefCell mutations.',
      skeleton: `use std::cell::RefCell;

fn main() {
    let cell = RefCell::new(10);
    {
        let mut r = cell.borrow_mut();
        *r += 5;
    }
    {
        let mut r = cell.borrow_mut();
        *r *= 2;
    }
    println!("{}", cell.borrow());
}`,
      solution: `30`,
      hints: [
        'Start with 10, add 5 to get 15.',
        'Then multiply by 2 to get 30.',
        'Each borrow_mut is dropped before the next one.',
      ],
      concepts: ['RefCell', 'borrow_mut', 'interior mutability'],
    },
    {
      id: 'rs-smart-19',
      title: 'Refactor to Smart Pointer',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor raw heap management into using Box.',
      skeleton: `// This code uses verbose manual ownership tracking.
// Refactor to use Box for cleaner code.

fn process(data: Vec<i32>) -> Vec<i32> {
    let mut result = Vec::new();
    for item in data.iter() {
        result.push(item * 2);
    }
    result
}

fn main() {
    let data = vec![1, 2, 3, 4, 5];
    let result = process(data);
    println!("{:?}", result);
}`,
      solution: `fn process(data: Box<[i32]>) -> Box<[i32]> {
    data.iter().map(|x| x * 2).collect::<Vec<_>>().into_boxed_slice()
}

fn main() {
    let data: Box<[i32]> = vec![1, 2, 3, 4, 5].into_boxed_slice();
    let result = process(data);
    println!("{:?}", result);
}`,
      hints: [
        'Box<[T]> is a heap-allocated slice with known size.',
        'Use into_boxed_slice() to convert a Vec into a boxed slice.',
        'This is useful when the size is fixed after creation.',
      ],
      concepts: ['Box', 'boxed slice', 'refactoring'],
    },
    {
      id: 'rs-smart-20',
      title: 'Refactor Shared State',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor cloned data into shared ownership with Rc<RefCell<T>>.',
      skeleton: `// This code clones the config for each component.
// Refactor to share it using Rc<RefCell<Config>>.

#[derive(Clone, Debug)]
struct Config {
    debug: bool,
    max_retries: u32,
}

struct Logger { config: Config }
struct Network { config: Config }

impl Logger {
    fn log(&self, msg: &str) {
        if self.config.debug {
            println!("[DEBUG] {}", msg);
        }
    }
}

impl Network {
    fn retry_count(&self) -> u32 {
        self.config.max_retries
    }
}

fn main() {
    let config = Config { debug: true, max_retries: 3 };
    let logger = Logger { config: config.clone() };
    let network = Network { config: config.clone() };
    logger.log("starting");
    println!("retries: {}", network.retry_count());
}`,
      solution: `use std::rc::Rc;
use std::cell::RefCell;

#[derive(Debug)]
struct Config {
    debug: bool,
    max_retries: u32,
}

struct Logger { config: Rc<RefCell<Config>> }
struct Network { config: Rc<RefCell<Config>> }

impl Logger {
    fn log(&self, msg: &str) {
        if self.config.borrow().debug {
            println!("[DEBUG] {}", msg);
        }
    }
}

impl Network {
    fn retry_count(&self) -> u32 {
        self.config.borrow().max_retries
    }
}

fn main() {
    let config = Rc::new(RefCell::new(Config { debug: true, max_retries: 3 }));
    let logger = Logger { config: Rc::clone(&config) };
    let network = Network { config: Rc::clone(&config) };
    logger.log("starting");
    println!("retries: {}", network.retry_count());
    // Now changes to config are visible to all:
    config.borrow_mut().max_retries = 5;
    println!("updated retries: {}", network.retry_count());
}`,
      hints: [
        'Replace Config with Rc<RefCell<Config>> in each struct.',
        'Use Rc::clone to share ownership instead of cloning data.',
        'Use borrow() to read and borrow_mut() to write.',
      ],
      concepts: ['Rc', 'RefCell', 'shared ownership', 'refactoring'],
    },
  ],
};
