import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-trobj',
  title: '32. Trait Objects',
  explanation: `## Trait Objects

Trait objects enable **dynamic dispatch** -- choosing the method implementation at runtime.

### dyn Trait
\`\`\`rust
fn print_it(item: &dyn std::fmt::Display) {
    println!("{item}");
}
\`\`\`

### Box<dyn Trait>
\`\`\`rust
fn make_greeter(loud: bool) -> Box<dyn Fn()> {
    if loud {
        Box::new(|| println!("HELLO!"))
    } else {
        Box::new(|| println!("hello"))
    }
}
\`\`\`

### Object Safety
A trait is object-safe if:
- No methods return Self
- No methods have generic type parameters
- All methods have a receiver (self, &self, etc.)

### Static vs Dynamic Dispatch
\`\`\`rust
fn static_dispatch(x: &impl Display) { }  // monomorphized
fn dynamic_dispatch(x: &dyn Display) { }   // vtable lookup
\`\`\`

### Trait Object Lifetimes
\`\`\`rust
fn longest<'a>(items: &'a [Box<dyn Display + 'a>]) -> &'a dyn Display {
    &*items[0]
}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-trobj-1',
      title: 'Basic Trait Object',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use a trait object reference as a function parameter.',
      skeleton: `use std::fmt::Display;

fn show(item: &__BLANK__ Display) {
    println!("{item}");
}

fn main() {
    show(&42);
    show(&"hello");
}`,
      solution: `use std::fmt::Display;

fn show(item: &dyn Display) {
    println!("{item}");
}

fn main() {
    show(&42);
    show(&"hello");
}`,
      hints: [
        'Trait object references use the dyn keyword.',
        '&dyn Trait is a fat pointer (data + vtable).',
        'The answer is dyn.',
      ],
      concepts: ['dyn', 'trait-object', 'dynamic-dispatch'],
    },
    {
      id: 'rs-trobj-2',
      title: 'Box<dyn Trait>',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Return a trait object from a function using Box.',
      skeleton: `trait Animal {
    fn speak(&self) -> &str;
}

struct Dog;
impl Animal for Dog { fn speak(&self) -> &str { "Woof" } }

struct Cat;
impl Animal for Cat { fn speak(&self) -> &str { "Meow" } }

fn get_pet(dog: bool) -> __BLANK__<dyn Animal> {
    if dog { Box::new(Dog) } else { Box::new(Cat) }
}

fn main() {
    println!("{}", get_pet(true).speak());
}`,
      solution: `trait Animal {
    fn speak(&self) -> &str;
}

struct Dog;
impl Animal for Dog { fn speak(&self) -> &str { "Woof" } }

struct Cat;
impl Animal for Cat { fn speak(&self) -> &str { "Meow" } }

fn get_pet(dog: bool) -> Box<dyn Animal> {
    if dog { Box::new(Dog) } else { Box::new(Cat) }
}

fn main() {
    println!("{}", get_pet(true).speak());
}`,
      hints: [
        'Box<dyn Trait> is a heap-allocated trait object.',
        'It allows returning different concrete types.',
        'The answer is Box.',
      ],
      concepts: ['Box', 'dyn', 'trait-object', 'heap'],
    },
    {
      id: 'rs-trobj-3',
      title: 'Vec of Trait Objects',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Store different types in a Vec using trait objects.',
      skeleton: `use std::fmt::Display;

fn main() {
    let items: Vec<Box<__BLANK__ Display>> = vec![
        Box::new(42),
        Box::new("hello"),
        Box::new(3.14),
    ];
    for item in &items {
        println!("{item}");
    }
}`,
      solution: `use std::fmt::Display;

fn main() {
    let items: Vec<Box<dyn Display>> = vec![
        Box::new(42),
        Box::new("hello"),
        Box::new(3.14),
    ];
    for item in &items {
        println!("{item}");
    }
}`,
      hints: [
        'A Vec can hold trait objects of mixed concrete types.',
        'Each element is Box<dyn Trait>.',
        'The answer is dyn.',
      ],
      concepts: ['Vec', 'Box', 'dyn', 'heterogeneous-collection'],
    },
    {
      id: 'rs-trobj-4',
      title: 'Trait Object with Lifetime',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Add a lifetime annotation to a trait object.',
      skeleton: `use std::fmt::Display;

fn first_display<'a>(items: &'a [&'a dyn Display]) -> &__BLANK__ dyn Display {
    items[0]
}

fn main() {
    let a = 42;
    let b = "hi";
    let items: Vec<&dyn Display> = vec![&a, &b];
    println!("{}", first_display(&items));
}`,
      solution: `use std::fmt::Display;

fn first_display<'a>(items: &'a [&'a dyn Display]) -> &'a dyn Display {
    items[0]
}

fn main() {
    let a = 42;
    let b = "hi";
    let items: Vec<&dyn Display> = vec![&a, &b];
    println!("{}", first_display(&items));
}`,
      hints: [
        'The returned reference must have a lifetime.',
        'It borrows from the input slice.',
        'The answer is \'a.',
      ],
      concepts: ['lifetime', 'trait-object', 'reference'],
    },
    {
      id: 'rs-trobj-5',
      title: 'Multiple Trait Bounds',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a trait object that implements multiple traits.',
      skeleton: `use std::fmt::{Debug, Display};

fn show_debug(item: &(dyn Display __BLANK__ Debug)) {
    println!("Display: {item}");
    println!("Debug: {item:?}");
}

fn main() {
    show_debug(&42);
}`,
      solution: `use std::fmt::{Debug, Display};

fn show_debug(item: &(dyn Display + Debug)) {
    println!("Display: {item}");
    println!("Debug: {item:?}");
}

fn main() {
    show_debug(&42);
}`,
      hints: [
        'Multiple trait bounds on a trait object use the + syntax.',
        'dyn TraitA + TraitB requires both traits.',
        'The answer is +.',
      ],
      concepts: ['multiple-bounds', 'dyn', 'Display', 'Debug'],
    },
    {
      id: 'rs-trobj-6',
      title: 'Downcast with Any',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Downcast a trait object to a concrete type using Any.',
      skeleton: `use std::any::Any;

fn check_type(val: &dyn Any) {
    if let Some(n) = val.__BLANK__::<i32>() {
        println!("It's an i32: {n}");
    } else {
        println!("Not an i32");
    }
}

fn main() {
    check_type(&42i32);
    check_type(&"hello");
}`,
      solution: `use std::any::Any;

fn check_type(val: &dyn Any) {
    if let Some(n) = val.downcast_ref::<i32>() {
        println!("It's an i32: {n}");
    } else {
        println!("Not an i32");
    }
}

fn main() {
    check_type(&42i32);
    check_type(&"hello");
}`,
      hints: [
        'Any trait provides runtime type checking.',
        'downcast_ref::<T>() tries to get a &T from &dyn Any.',
        'The answer is downcast_ref.',
      ],
      concepts: ['Any', 'downcast_ref', 'runtime-type-check'],
    },
    {
      id: 'rs-trobj-7',
      title: 'Trait Object Factory',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a function that returns different trait objects based on input.',
      skeleton: `trait Shape {
    fn area(&self) -> f64;
}

struct Circle { radius: f64 }
impl Shape for Circle {
    fn area(&self) -> f64 { std::f64::consts::PI * self.radius * self.radius }
}

struct Square { side: f64 }
impl Shape for Square {
    fn area(&self) -> f64 { self.side * self.side }
}

// Return a Circle if radius > 0, otherwise a Square with side = -radius
fn make_shape(radius: f64) -> Box<dyn Shape> {
    // TODO
}`,
      solution: `trait Shape {
    fn area(&self) -> f64;
}

struct Circle { radius: f64 }
impl Shape for Circle {
    fn area(&self) -> f64 { std::f64::consts::PI * self.radius * self.radius }
}

struct Square { side: f64 }
impl Shape for Square {
    fn area(&self) -> f64 { self.side * self.side }
}

fn make_shape(radius: f64) -> Box<dyn Shape> {
    if radius > 0.0 {
        Box::new(Circle { radius })
    } else {
        Box::new(Square { side: -radius })
    }
}`,
      hints: [
        'Return Box::new(Circle{...}) or Box::new(Square{...}).',
        'Both branches must return Box<dyn Shape>.',
        'Box::new wraps the concrete type in a trait object.',
      ],
      concepts: ['Box', 'dyn', 'factory-pattern', 'trait-object'],
    },
    {
      id: 'rs-trobj-8',
      title: 'Iterator of Trait Objects',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Process a slice of trait objects and return aggregated results.',
      skeleton: `trait Describable {
    fn describe(&self) -> String;
}

struct Person { name: String }
impl Describable for Person {
    fn describe(&self) -> String { format!("Person({})", self.name) }
}

struct Robot { id: u32 }
impl Describable for Robot {
    fn describe(&self) -> String { format!("Robot(#{})", self.id) }
}

// Describe all items, joined by ", "
fn describe_all(items: &[Box<dyn Describable>]) -> String {
    // TODO
}`,
      solution: `trait Describable {
    fn describe(&self) -> String;
}

struct Person { name: String }
impl Describable for Person {
    fn describe(&self) -> String { format!("Person({})", self.name) }
}

struct Robot { id: u32 }
impl Describable for Robot {
    fn describe(&self) -> String { format!("Robot(#{})", self.id) }
}

fn describe_all(items: &[Box<dyn Describable>]) -> String {
    items.iter().map(|i| i.describe()).collect::<Vec<_>>().join(", ")
}`,
      hints: [
        'Iterate over the slice, calling describe() on each.',
        'Collect into a Vec<String> and join with ", ".',
        'Trait methods are called through the vtable.',
      ],
      concepts: ['trait-object', 'iterator', 'dynamic-dispatch', 'vtable'],
    },
    {
      id: 'rs-trobj-9',
      title: 'Closure Trait Objects',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Store different closures as trait objects and invoke them.',
      skeleton: `// Store a list of operations as Box<dyn Fn(i32) -> i32>
// Apply each operation in sequence to an initial value
fn chain_operations(initial: i32, ops: &[Box<dyn Fn(i32) -> i32>]) -> i32 {
    // TODO
}`,
      solution: `fn chain_operations(initial: i32, ops: &[Box<dyn Fn(i32) -> i32>]) -> i32 {
    ops.iter().fold(initial, |acc, op| op(acc))
}`,
      hints: [
        'Use fold to apply each operation in sequence.',
        'Each op is called as op(acc).',
        'The Fn trait makes closures callable through trait objects.',
      ],
      concepts: ['Fn', 'closure', 'trait-object', 'fold'],
    },
    {
      id: 'rs-trobj-10',
      title: 'Object-Safe Trait Design',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Design an object-safe trait and implement it for two types.',
      skeleton: `// Design a Drawable trait that is object-safe
// It should have a draw(&self) -> String method
// Implement for Circle { radius: f64 } and Rect { w: f64, h: f64 }
// Then write fn draw_all(items: &[&dyn Drawable]) -> Vec<String>

// TODO: define trait, structs, impls, and function`,
      solution: `trait Drawable {
    fn draw(&self) -> String;
}

struct Circle { radius: f64 }
impl Drawable for Circle {
    fn draw(&self) -> String { format!("Circle(r={})", self.radius) }
}

struct Rect { w: f64, h: f64 }
impl Drawable for Rect {
    fn draw(&self) -> String { format!("Rect({}x{})", self.w, self.h) }
}

fn draw_all(items: &[&dyn Drawable]) -> Vec<String> {
    items.iter().map(|item| item.draw()).collect()
}`,
      hints: [
        'Object-safe traits cannot return Self or use generics in methods.',
        '&self receiver is fine for object safety.',
        'draw_all takes a slice of &dyn Drawable references.',
      ],
      concepts: ['object-safety', 'trait-design', 'dyn', 'slice'],
    },
    {
      id: 'rs-trobj-11',
      title: 'Enum vs Trait Object',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement the same behavior using both enum dispatch and trait objects.',
      skeleton: `// Implement area() for Shape using trait objects
trait ShapeTrait {
    fn area(&self) -> f64;
}

struct Circle { r: f64 }
struct Rectangle { w: f64, h: f64 }

// TODO: implement ShapeTrait for Circle and Rectangle
// TODO: fn total_area(shapes: &[Box<dyn ShapeTrait>]) -> f64`,
      solution: `trait ShapeTrait {
    fn area(&self) -> f64;
}

struct Circle { r: f64 }
impl ShapeTrait for Circle {
    fn area(&self) -> f64 { std::f64::consts::PI * self.r * self.r }
}

struct Rectangle { w: f64, h: f64 }
impl ShapeTrait for Rectangle {
    fn area(&self) -> f64 { self.w * self.h }
}

fn total_area(shapes: &[Box<dyn ShapeTrait>]) -> f64 {
    shapes.iter().map(|s| s.area()).sum()
}`,
      hints: [
        'Implement ShapeTrait for each concrete type.',
        'total_area iterates and sums all areas.',
        'Dynamic dispatch resolves the correct area() at runtime.',
      ],
      concepts: ['trait-object', 'dynamic-dispatch', 'polymorphism'],
    },
    {
      id: 'rs-trobj-12',
      title: 'Trait Object Conversion',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Convert between concrete types and trait objects.',
      skeleton: `use std::any::Any;

trait Plugin: Any {
    fn name(&self) -> &str;
    fn as_any(&self) -> &dyn Any;
}

struct Logger;
impl Plugin for Logger {
    fn name(&self) -> &str { "Logger" }
    fn as_any(&self) -> &dyn Any { self }
}

// Downcast a &dyn Plugin to &Logger if possible
fn get_logger(plugin: &dyn Plugin) -> Option<&Logger> {
    // TODO
}`,
      solution: `use std::any::Any;

trait Plugin: Any {
    fn name(&self) -> &str;
    fn as_any(&self) -> &dyn Any;
}

struct Logger;
impl Plugin for Logger {
    fn name(&self) -> &str { "Logger" }
    fn as_any(&self) -> &dyn Any { self }
}

fn get_logger(plugin: &dyn Plugin) -> Option<&Logger> {
    plugin.as_any().downcast_ref::<Logger>()
}`,
      hints: [
        'Use the as_any() method to get a &dyn Any.',
        'Then call downcast_ref::<Logger>() to try the conversion.',
        'Returns Some(&Logger) if the type matches, None otherwise.',
      ],
      concepts: ['Any', 'downcast_ref', 'as_any', 'type-erasure'],
    },
    {
      id: 'rs-trobj-13',
      title: 'Bug: Not Object Safe',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a trait that is not object-safe because a method returns Self.',
      skeleton: `trait Cloneable {
    fn clone_self(&self) -> Self;
}

struct Data { value: i32 }
impl Cloneable for Data {
    fn clone_self(&self) -> Self { Data { value: self.value } }
}

fn duplicate(item: &dyn Cloneable) -> Box<dyn Cloneable> {
    Box::new(item.clone_self())
}`,
      solution: `trait Cloneable {
    fn clone_box(&self) -> Box<dyn Cloneable>;
}

struct Data { value: i32 }
impl Cloneable for Data {
    fn clone_box(&self) -> Box<dyn Cloneable> {
        Box::new(Data { value: self.value })
    }
}

fn duplicate(item: &dyn Cloneable) -> Box<dyn Cloneable> {
    item.clone_box()
}`,
      hints: [
        'Methods returning Self make a trait not object-safe.',
        'Replace Self with Box<dyn Trait> for object safety.',
        'The concrete type is erased behind the trait object.',
      ],
      concepts: ['object-safety', 'Self', 'Box', 'clone'],
    },
    {
      id: 'rs-trobj-14',
      title: 'Bug: Generic Method',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a trait with a generic method that prevents it from being object-safe.',
      skeleton: `trait Converter {
    fn convert<T: From<i32>>(&self) -> T;
}

struct Num { value: i32 }
impl Converter for Num {
    fn convert<T: From<i32>>(&self) -> T { T::from(self.value) }
}

fn use_converter(c: &dyn Converter) {
    let val: i64 = c.convert();
    println!("{val}");
}`,
      solution: `trait Converter {
    fn convert_to_i64(&self) -> i64;
}

struct Num { value: i32 }
impl Converter for Num {
    fn convert_to_i64(&self) -> i64 { self.value as i64 }
}

fn use_converter(c: &dyn Converter) {
    let val: i64 = c.convert_to_i64();
    println!("{val}");
}`,
      hints: [
        'Generic methods make a trait not object-safe.',
        'The vtable cannot represent generic methods.',
        'Replace with concrete method(s) for the needed types.',
      ],
      concepts: ['object-safety', 'generic-method', 'vtable'],
    },
    {
      id: 'rs-trobj-15',
      title: 'Bug: Missing dyn Keyword',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix code that uses bare trait names instead of dyn.',
      skeleton: `use std::fmt::Display;

fn print_item(item: &Display) {
    println!("{item}");
}

fn main() {
    print_item(&42);
}`,
      solution: `use std::fmt::Display;

fn print_item(item: &dyn Display) {
    println!("{item}");
}

fn main() {
    print_item(&42);
}`,
      hints: [
        'Since Rust 2021, bare trait objects require the dyn keyword.',
        'Change &Display to &dyn Display.',
        'dyn makes it explicit that dynamic dispatch is used.',
      ],
      concepts: ['dyn', 'trait-object', 'edition-2021'],
    },
    {
      id: 'rs-trobj-16',
      title: 'Predict: Dynamic Dispatch',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict which method implementation is called at runtime.',
      skeleton: `trait Greet {
    fn greet(&self) -> &str;
}

struct English;
impl Greet for English { fn greet(&self) -> &str { "Hello" } }

struct Spanish;
impl Greet for Spanish { fn greet(&self) -> &str { "Hola" } }

fn say(g: &dyn Greet) { println!("{}", g.greet()); }

fn main() {
    say(&English);
    say(&Spanish);
}`,
      solution: `Hello
Hola`,
      hints: [
        'Dynamic dispatch calls the correct implementation.',
        'English::greet returns "Hello".',
        'Spanish::greet returns "Hola".',
      ],
      concepts: ['dynamic-dispatch', 'vtable', 'polymorphism'],
    },
    {
      id: 'rs-trobj-17',
      title: 'Predict: Trait Object Size',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the size of references vs trait object references.',
      skeleton: `use std::mem::size_of;

fn main() {
    println!("{}", size_of::<&i32>());
    println!("{}", size_of::<&dyn std::fmt::Display>());
}`,
      solution: `8
16`,
      hints: [
        'A regular reference is one pointer (8 bytes on 64-bit).',
        'A trait object reference is a fat pointer: data + vtable.',
        'Two pointers = 16 bytes on 64-bit.',
      ],
      concepts: ['fat-pointer', 'vtable', 'size_of', 'trait-object'],
    },
    {
      id: 'rs-trobj-18',
      title: 'Predict: Any Downcast',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the result of downcasting with Any.',
      skeleton: `use std::any::Any;

fn check(val: &dyn Any) {
    if val.downcast_ref::<String>().is_some() {
        println!("String");
    } else if val.downcast_ref::<i32>().is_some() {
        println!("i32");
    } else {
        println!("unknown");
    }
}

fn main() {
    check(&String::from("hi"));
    check(&42i32);
    check(&3.14f64);
}`,
      solution: `String
i32
unknown`,
      hints: [
        'downcast_ref checks the runtime type.',
        '"hi" is a String, 42 is i32, 3.14 is f64.',
        'f64 matches neither String nor i32, so "unknown".',
      ],
      concepts: ['Any', 'downcast_ref', 'runtime-type'],
    },
    {
      id: 'rs-trobj-19',
      title: 'Refactor: Enum to Trait Object',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor an enum-based dispatch to use trait objects for extensibility.',
      skeleton: `enum Shape {
    Circle(f64),
    Rect(f64, f64),
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle(r) => std::f64::consts::PI * r * r,
            Shape::Rect(w, h) => w * h,
        }
    }
}

fn total(shapes: &[Shape]) -> f64 {
    shapes.iter().map(|s| s.area()).sum()
}

fn main() {
    let shapes = vec![Shape::Circle(1.0), Shape::Rect(2.0, 3.0)];
    println!("{:.2}", total(&shapes));
}`,
      solution: `trait Shape {
    fn area(&self) -> f64;
}

struct Circle(f64);
impl Shape for Circle {
    fn area(&self) -> f64 { std::f64::consts::PI * self.0 * self.0 }
}

struct Rect(f64, f64);
impl Shape for Rect {
    fn area(&self) -> f64 { self.0 * self.1 }
}

fn total(shapes: &[Box<dyn Shape>]) -> f64 {
    shapes.iter().map(|s| s.area()).sum()
}

fn main() {
    let shapes: Vec<Box<dyn Shape>> = vec![Box::new(Circle(1.0)), Box::new(Rect(2.0, 3.0))];
    println!("{:.2}", total(&shapes));
}`,
      hints: [
        'Convert the enum into a trait with area() method.',
        'Each variant becomes its own struct implementing the trait.',
        'Use Vec<Box<dyn Shape>> for the collection.',
      ],
      concepts: ['refactor', 'enum-to-trait', 'extensibility', 'open-closed'],
    },
    {
      id: 'rs-trobj-20',
      title: 'Refactor: Static to Dynamic Dispatch',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor generic functions to use trait objects to reduce binary bloat.',
      skeleton: `use std::fmt::Display;

fn print_twice<T: Display>(val: &T) {
    println!("{val}");
    println!("{val}");
}

fn print_thrice<T: Display>(val: &T) {
    println!("{val}");
    println!("{val}");
    println!("{val}");
}

fn main() {
    print_twice(&42);
    print_twice(&"hello");
    print_thrice(&42);
    print_thrice(&"hello");
}`,
      solution: `use std::fmt::Display;

fn print_twice(val: &dyn Display) {
    println!("{val}");
    println!("{val}");
}

fn print_thrice(val: &dyn Display) {
    println!("{val}");
    println!("{val}");
    println!("{val}");
}

fn main() {
    print_twice(&42);
    print_twice(&"hello");
    print_thrice(&42);
    print_thrice(&"hello");
}`,
      hints: [
        'Generic functions are monomorphized, creating copies per type.',
        'Using &dyn Display creates one function for all types.',
        'Trade-off: less binary size, slight runtime cost for vtable lookup.',
      ],
      concepts: ['monomorphization', 'dynamic-dispatch', 'binary-size', 'refactor'],
    },
  ],
};
