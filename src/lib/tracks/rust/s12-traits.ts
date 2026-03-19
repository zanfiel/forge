import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-traits',
  title: '12. Traits',
  explanation: `## Traits

Traits define shared behavior -- similar to interfaces in other languages.

### Defining & Implementing
\`\`\`rust
trait Summary {
    fn summarize(&self) -> String;
}

impl Summary for Article {
    fn summarize(&self) -> String { format!("{}", self.title) }
}
\`\`\`

### Default Methods
\`\`\`rust
trait Greet {
    fn name(&self) -> &str;
    fn greet(&self) -> String {
        format!("Hello, {}!", self.name()) // default impl
    }
}
\`\`\`

### Trait Bounds
\`\`\`rust
fn notify(item: &impl Summary) { ... }
fn notify<T: Summary>(item: &T) { ... }
fn notify<T: Summary + Display>(item: &T) { ... }
\`\`\`

### Where Clause
\`\`\`rust
fn process<T, U>(t: &T, u: &U) -> String
where
    T: Display + Clone,
    U: Debug,
{ ... }
\`\`\`

### Supertraits
\`\`\`rust
trait PrettyPrint: Display {
    fn pretty(&self) -> String { format!("[{}]", self) }
}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-trait-1',
      title: 'Implement a Trait',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Implement the Describable trait for Dog.',
      skeleton: `trait Describable {
    fn describe(&self) -> String;
}

struct Dog { name: String }

__BLANK__ Describable for Dog {
    fn describe(&self) -> String {
        format!("Dog named {}", self.name)
    }
}`,
      solution: `trait Describable {
    fn describe(&self) -> String;
}

struct Dog { name: String }

impl Describable for Dog {
    fn describe(&self) -> String {
        format!("Dog named {}", self.name)
    }
}`,
      hints: [
        'Use the impl keyword to implement a trait.',
        'The syntax is `impl TraitName for TypeName`.',
        'Use `impl`.',
      ],
      concepts: ['impl Trait for Type', 'trait implementation'],
    },
    {
      id: 'rs-trait-2',
      title: 'Trait Bound',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Add a trait bound so the function accepts any type implementing Display.',
      skeleton: `use std::fmt::Display;

fn print_it<T: __BLANK__>(item: &T) {
    println!("{}", item);
}`,
      solution: `use std::fmt::Display;

fn print_it<T: Display>(item: &T) {
    println!("{}", item);
}`,
      hints: [
        'The function uses {} formatting which requires Display.',
        'Add the trait as a bound on the generic parameter.',
        'Use `Display` as the bound.',
      ],
      concepts: ['trait bound', 'Display', 'generic function'],
    },
    {
      id: 'rs-trait-3',
      title: 'Default Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Call the default method implementation.',
      skeleton: `trait Greetable {
    fn name(&self) -> &str;
    fn greet(&self) -> String {
        format!("Hello, {}!", self.name())
    }
}

struct User { name: String }
impl Greetable for User {
    fn name(&self) -> &str { &self.name }
}

let u = User { name: String::from("Alice") };
println!("{}", u.__BLANK__());`,
      solution: `trait Greetable {
    fn name(&self) -> &str;
    fn greet(&self) -> String {
        format!("Hello, {}!", self.name())
    }
}

struct User { name: String }
impl Greetable for User {
    fn name(&self) -> &str { &self.name }
}

let u = User { name: String::from("Alice") };
println!("{}", u.greet());`,
      hints: [
        'User only implements name(), but greet() has a default.',
        'Default methods are available without implementing them.',
        'Call `greet()`.',
      ],
      concepts: ['default method', 'trait'],
    },
    {
      id: 'rs-trait-4',
      title: 'Multiple Bounds',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Require both Display and Debug as trait bounds.',
      skeleton: `use std::fmt::{Display, Debug};

fn inspect<T: Display __BLANK__ Debug>(item: &T) {
    println!("Display: {}", item);
    println!("Debug: {:?}", item);
}`,
      solution: `use std::fmt::{Display, Debug};

fn inspect<T: Display + Debug>(item: &T) {
    println!("Display: {}", item);
    println!("Debug: {:?}", item);
}`,
      hints: [
        'Multiple trait bounds are combined with an operator.',
        'The syntax uses + between traits.',
        'Use `+`.',
      ],
      concepts: ['multiple bounds', '+', 'Display + Debug'],
    },
    {
      id: 'rs-trait-5',
      title: 'Where Clause',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Rewrite the bounds using a where clause.',
      skeleton: `use std::fmt::{Display, Debug};

fn process<T, U>(t: &T, u: &U)
__BLANK__
    T: Display + Clone,
    U: Debug,
{
    println!("{} {:?}", t, u);
}`,
      solution: `use std::fmt::{Display, Debug};

fn process<T, U>(t: &T, u: &U)
where
    T: Display + Clone,
    U: Debug,
{
    println!("{} {:?}", t, u);
}`,
      hints: [
        'When bounds get complex, move them after the parameters.',
        'The keyword introduces a bounds section.',
        'Use `where`.',
      ],
      concepts: ['where clause', 'complex bounds'],
    },
    {
      id: 'rs-trait-6',
      title: 'impl Trait Return',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use impl Trait as the return type.',
      skeleton: `fn make_adder(x: i32) -> __BLANK__ {
    move |y: i32| x + y
}`,
      solution: `fn make_adder(x: i32) -> impl Fn(i32) -> i32 {
    move |y: i32| x + y
}`,
      hints: [
        'The function returns a closure.',
        'Closures have anonymous types, so use impl Trait.',
        'Use `impl Fn(i32) -> i32`.',
      ],
      concepts: ['impl Trait', 'return type', 'closure'],
    },
    {
      id: 'rs-trait-7',
      title: 'Area Trait',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Define an Area trait with area(&self) -> f64. Implement it for Circle { radius: f64 } and Square { side: f64 }.',
      skeleton: `// Write your trait and implementations here`,
      solution: `trait Area {
    fn area(&self) -> f64;
}

struct Circle { radius: f64 }
struct Square { side: f64 }

impl Area for Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }
}

impl Area for Square {
    fn area(&self) -> f64 {
        self.side * self.side
    }
}`,
      hints: [
        'Define the trait with one method signature.',
        'Implement for each struct separately.',
        'Circle: PI * r^2, Square: side^2.',
      ],
      concepts: ['trait definition', 'multiple implementations'],
    },
    {
      id: 'rs-trait-8',
      title: 'Printable Trait',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Define a Printable trait with to_string(&self) -> String. Write a generic function `print_all` that takes &[&dyn Printable] and prints each.',
      skeleton: `// Write your trait and function here`,
      solution: `trait Printable {
    fn to_str(&self) -> String;
}

fn print_all(items: &[&dyn Printable]) {
    for item in items {
        println!("{}", item.to_str());
    }
}`,
      hints: [
        'Use &dyn Printable for trait objects in the slice.',
        'Iterate and call the trait method on each.',
        'Note: avoid naming it to_string to not conflict with ToString.',
      ],
      concepts: ['trait objects', '&dyn', 'polymorphism'],
    },
    {
      id: 'rs-trait-9',
      title: 'Supertrait',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Define a Named trait (fn name(&self) -> &str) and a Greeting trait that requires Named (supertrait) with a default greet() method.',
      skeleton: `// Write your traits here`,
      solution: `trait Named {
    fn name(&self) -> &str;
}

trait Greeting: Named {
    fn greet(&self) -> String {
        format!("Hello, {}!", self.name())
    }
}`,
      hints: [
        'Supertraits are specified with colon syntax: trait A: B.',
        'The supertrait allows calling B methods in A defaults.',
        'Greeting: Named means Named is required.',
      ],
      concepts: ['supertrait', 'trait inheritance', 'default method'],
    },
    {
      id: 'rs-trait-10',
      title: 'Generic with Multiple Bounds',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `largest` that takes &[T] where T: PartialOrd + Copy and returns the largest element.',
      skeleton: `// Write your function here`,
      solution: `fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut max = list[0];
    for &item in &list[1..] {
        if item > max {
            max = item;
        }
    }
    max
}`,
      hints: [
        'T needs PartialOrd for comparison and Copy for simple copying.',
        'Iterate over the slice comparing each element.',
        'Return the maximum value.',
      ],
      concepts: ['generic bounds', 'PartialOrd', 'Copy', 'largest'],
    },
    {
      id: 'rs-trait-11',
      title: 'Blanket Implementation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Define a Summary trait. Then write a blanket impl that implements Summary for any type that implements Display.',
      skeleton: `// Write your trait and blanket impl here`,
      solution: `use std::fmt::Display;

trait Summary {
    fn summary(&self) -> String;
}

impl<T: Display> Summary for T {
    fn summary(&self) -> String {
        format!("[Summary: {}]", self)
    }
}`,
      hints: [
        'A blanket impl uses a generic type parameter: impl<T: Bound> Trait for T.',
        'This implements Summary for ALL types that implement Display.',
        'Use format! with {} (requires Display).',
      ],
      concepts: ['blanket implementation', 'generic impl', 'Display'],
    },
    {
      id: 'rs-trait-12',
      title: 'Iterator-like Trait',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Define a Counter trait with next(&mut self) -> Option<u32> and count(&self) -> u32. Implement it for Range { current: u32, end: u32 }.',
      skeleton: `// Write your trait and implementation here`,
      solution: `trait Counter {
    fn next_val(&mut self) -> Option<u32>;
    fn count(&self) -> u32;
}

struct Range {
    current: u32,
    end: u32,
}

impl Counter for Range {
    fn next_val(&mut self) -> Option<u32> {
        if self.current < self.end {
            let val = self.current;
            self.current += 1;
            Some(val)
        } else {
            None
        }
    }

    fn count(&self) -> u32 {
        if self.end > self.current { self.end - self.current } else { 0 }
    }
}`,
      hints: [
        'Define two methods in the trait.',
        'next_val advances the counter and returns the current value.',
        'count returns remaining elements.',
      ],
      concepts: ['custom trait', 'stateful iteration', 'Option'],
    },
    {
      id: 'rs-trait-13',
      title: 'Fix: Missing Trait Bound',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'This function uses Display formatting but has no trait bound. Fix it.',
      skeleton: `fn stringify<T>(val: T) -> String {
    format!("{}", val)
}`,
      solution: `fn stringify<T: std::fmt::Display>(val: T) -> String {
    format!("{}", val)
}`,
      hints: [
        'format! with {} requires the Display trait.',
        'The generic T has no bounds, so Display is not guaranteed.',
        'Add `: std::fmt::Display` bound to T.',
      ],
      concepts: ['trait bound', 'Display', 'generic constraint'],
    },
    {
      id: 'rs-trait-14',
      title: 'Fix: Trait Method Not Visible',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'The trait method cannot be called because the trait is not in scope. Fix it.',
      skeleton: `mod shapes {
    pub trait Area {
        fn area(&self) -> f64;
    }

    pub struct Circle { pub radius: f64 }
    impl Area for Circle {
        fn area(&self) -> f64 { std::f64::consts::PI * self.radius * self.radius }
    }
}

fn main() {
    let c = shapes::Circle { radius: 5.0 };
    println!("{}", c.area());
}`,
      solution: `mod shapes {
    pub trait Area {
        fn area(&self) -> f64;
    }

    pub struct Circle { pub radius: f64 }
    impl Area for Circle {
        fn area(&self) -> f64 { std::f64::consts::PI * self.radius * self.radius }
    }
}

use shapes::Area;

fn main() {
    let c = shapes::Circle { radius: 5.0 };
    println!("{}", c.area());
}`,
      hints: [
        'Trait methods are only callable if the trait is in scope.',
        'You need to import the trait with `use`.',
        'Add `use shapes::Area;`.',
      ],
      concepts: ['trait import', 'use', 'scope'],
    },
    {
      id: 'rs-trait-15',
      title: 'Fix: Conflicting Implementations',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'This code has a conflicting blanket impl. Fix it by using a wrapper type.',
      skeleton: `trait Greet {
    fn greet(&self) -> String;
}

impl Greet for String {
    fn greet(&self) -> String {
        format!("Hello, {}!", self)
    }
}

impl Greet for String {
    fn greet(&self) -> String {
        format!("Hi, {}!", self)
    }
}`,
      solution: `trait Greet {
    fn greet(&self) -> String;
}

struct FormalGreet(String);
struct CasualGreet(String);

impl Greet for FormalGreet {
    fn greet(&self) -> String {
        format!("Hello, {}!", self.0)
    }
}

impl Greet for CasualGreet {
    fn greet(&self) -> String {
        format!("Hi, {}!", self.0)
    }
}`,
      hints: [
        'You cannot have two impl blocks for the same trait+type.',
        'Use wrapper types to differentiate behavior.',
        'Create FormalGreet and CasualGreet newtypes.',
      ],
      concepts: ['newtype pattern', 'conflicting impls', 'wrapper'],
    },
    {
      id: 'rs-trait-16',
      title: 'Predict: Default Method',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `trait Animal {
    fn sound(&self) -> &str;
    fn info(&self) -> String {
        format!("This animal says {}", self.sound())
    }
}

struct Cat;
impl Animal for Cat {
    fn sound(&self) -> &str { "meow" }
}

fn main() {
    let c = Cat;
    println!("{}", c.info());
}`,
      solution: `This animal says meow`,
      hints: [
        'Cat implements sound() returning "meow".',
        'info() uses the default implementation.',
        'The default calls self.sound().',
      ],
      concepts: ['default method', 'dynamic dispatch in default'],
    },
    {
      id: 'rs-trait-17',
      title: 'Predict: Trait Bound Filter',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn double_if_positive(val: i32) -> i32 {
    if val > 0 { val * 2 } else { val }
}

fn main() {
    let nums = vec![-1, 2, -3, 4];
    let result: Vec<i32> = nums.iter().map(|&x| double_if_positive(x)).collect();
    println!("{:?}", result);
}`,
      solution: `[-1, 4, -3, 8]`,
      hints: [
        '-1 stays -1 (not positive).',
        '2 becomes 4 (doubled).',
        '-3 stays -3, 4 becomes 8.',
      ],
      concepts: ['map', 'conditional', 'Vec'],
    },
    {
      id: 'rs-trait-18',
      title: 'Predict: impl Trait Syntax',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn make_pair(a: i32, b: i32) -> impl std::fmt::Debug {
    (a, b)
}

fn main() {
    let p = make_pair(1, 2);
    println!("{:?}", p);
}`,
      solution: `(1, 2)`,
      hints: [
        'The function returns impl Debug.',
        'The actual type is (i32, i32).',
        'Debug prints tuples as (a, b).',
      ],
      concepts: ['impl Trait', 'opaque return type', 'Debug'],
    },
    {
      id: 'rs-trait-19',
      title: 'Refactor: Concrete to Generic',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor this function to accept any type that implements Display.',
      skeleton: `fn print_label(label: &str, value: &str) {
    println!("{}: {}", label, value);
}`,
      solution: `fn print_label<T: std::fmt::Display>(label: &str, value: &T) {
    println!("{}: {}", label, value);
}`,
      hints: [
        'The value parameter is currently &str only.',
        'Make it generic with a Display bound.',
        'Change value to &T where T: Display.',
      ],
      concepts: ['generic', 'Display', 'refactoring'],
    },
    {
      id: 'rs-trait-20',
      title: 'Refactor: Repetitive Impls to Macro',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'The trait is implemented identically for multiple types. Refactor to use a macro for DRY.',
      skeleton: `trait AsNum {
    fn as_num(&self) -> f64;
}

impl AsNum for i32 {
    fn as_num(&self) -> f64 { *self as f64 }
}

impl AsNum for i64 {
    fn as_num(&self) -> f64 { *self as f64 }
}

impl AsNum for u32 {
    fn as_num(&self) -> f64 { *self as f64 }
}`,
      solution: `trait AsNum {
    fn as_num(&self) -> f64;
}

macro_rules! impl_as_num {
    ($($t:ty),*) => {
        $(
            impl AsNum for $t {
                fn as_num(&self) -> f64 { *self as f64 }
            }
        )*
    };
}

impl_as_num!(i32, i64, u32);`,
      hints: [
        'All three impls have identical bodies.',
        'Use macro_rules! to generate repeated impls.',
        'The macro takes a list of types and expands.',
      ],
      concepts: ['macro_rules!', 'DRY', 'trait implementation macro'],
    },
  ],
};
