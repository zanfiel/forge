import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-generics',
  title: '13. Generics',
  explanation: `## Generics

Generics let you write code that works with many types while maintaining type safety.

### Generic Functions
\`\`\`rust
fn first<T>(list: &[T]) -> &T {
    &list[0]
}
\`\`\`

### Generic Structs
\`\`\`rust
struct Pair<T> { first: T, second: T }
struct Mixed<T, U> { left: T, right: U }
\`\`\`

### Generic Enums
\`\`\`rust
enum Maybe<T> { Just(T), Nothing }
\`\`\`

### Generic Impl
\`\`\`rust
impl<T> Pair<T> {
    fn new(first: T, second: T) -> Self { Pair { first, second } }
}
\`\`\`

### Turbofish
Explicitly specify type parameters:
\`\`\`rust
let x = "42".parse::<i32>().unwrap();
\`\`\`

### Monomorphization
Rust generates specialized code for each concrete type used -- zero runtime cost.
`,
  exercises: [
    {
      id: 'rs-gen-1',
      title: 'Generic Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Add the generic type parameter.',
      skeleton: `fn identity__BLANK__(val: T) -> T {
    val
}`,
      solution: `fn identity<T>(val: T) -> T {
    val
}`,
      hints: [
        'Generic parameters go in angle brackets after the function name.',
        'Use a single letter T by convention.',
        'Use `<T>`.',
      ],
      concepts: ['generic function', '<T>', 'type parameter'],
    },
    {
      id: 'rs-gen-2',
      title: 'Generic Struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Define a generic wrapper struct.',
      skeleton: `struct Wrapper__BLANK__ {
    value: T,
}

let w = Wrapper { value: 42 };`,
      solution: `struct Wrapper<T> {
    value: T,
}

let w = Wrapper { value: 42 };`,
      hints: [
        'Add a generic parameter after the struct name.',
        'The field type uses the same parameter.',
        'Use `<T>`.',
      ],
      concepts: ['generic struct', 'type parameter'],
    },
    {
      id: 'rs-gen-3',
      title: 'Two Type Parameters',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Define a struct with two different generic types.',
      skeleton: `struct KeyValue__BLANK__ {
    key: K,
    value: V,
}

let kv = KeyValue { key: "name", value: 42 };`,
      solution: `struct KeyValue<K, V> {
    key: K,
    value: V,
}

let kv = KeyValue { key: "name", value: 42 };`,
      hints: [
        'Multiple type parameters are separated by commas.',
        'Use K for key type and V for value type.',
        'Use `<K, V>`.',
      ],
      concepts: ['multiple type parameters', 'generic struct'],
    },
    {
      id: 'rs-gen-4',
      title: 'Turbofish Syntax',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Specify the type parameter explicitly using turbofish.',
      skeleton: `let numbers: Vec<i32> = vec![1, 2, 3];
let doubled: Vec<i32> = numbers.iter().map(|x| x * 2).collect__BLANK__();`,
      solution: `let numbers: Vec<i32> = vec![1, 2, 3];
let doubled: Vec<i32> = numbers.iter().map(|x| x * 2).collect::<Vec<i32>>();`,
      hints: [
        'Turbofish specifies generic types on method calls.',
        'It uses :: before the angle brackets.',
        'Use `::<Vec<i32>>`.',
      ],
      concepts: ['turbofish', '::<>', 'collect'],
    },
    {
      id: 'rs-gen-5',
      title: 'Generic impl Block',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write the generic impl block header.',
      skeleton: `struct Pair<T> { a: T, b: T }

__BLANK__ Pair<T> {
    fn new(a: T, b: T) -> Self {
        Pair { a, b }
    }
}`,
      solution: `struct Pair<T> { a: T, b: T }

impl<T> Pair<T> {
    fn new(a: T, b: T) -> Self {
        Pair { a, b }
    }
}`,
      hints: [
        'The impl block also needs to declare the type parameter.',
        'Syntax: impl<T> StructName<T> { ... }.',
        'Use `impl<T>`.',
      ],
      concepts: ['generic impl', 'impl<T>', 'Self'],
    },
    {
      id: 'rs-gen-6',
      title: 'Bounded Generic',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Add a trait bound so the generic type can be compared.',
      skeleton: `fn max_of<T: __BLANK__>(a: T, b: T) -> T {
    if a >= b { a } else { b }
}`,
      solution: `fn max_of<T: PartialOrd>(a: T, b: T) -> T {
    if a >= b { a } else { b }
}`,
      hints: [
        'The >= operator requires a comparison trait.',
        'PartialOrd enables ordering comparisons.',
        'Use `PartialOrd`.',
      ],
      concepts: ['trait bound', 'PartialOrd', 'comparison'],
    },
    {
      id: 'rs-gen-7',
      title: 'Generic Stack',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement a generic Stack<T> with new(), push(&mut self, T), pop(&mut self) -> Option<T>, and peek(&self) -> Option<&T>.',
      skeleton: `// Write your struct and impl here`,
      solution: `struct Stack<T> {
    items: Vec<T>,
}

impl<T> Stack<T> {
    fn new() -> Self {
        Stack { items: Vec::new() }
    }

    fn push(&mut self, item: T) {
        self.items.push(item);
    }

    fn pop(&mut self) -> Option<T> {
        self.items.pop()
    }

    fn peek(&self) -> Option<&T> {
        self.items.last()
    }
}`,
      hints: [
        'Wrap a Vec<T> inside the struct.',
        'impl<T> Stack<T> to implement for all T.',
        'Delegate to Vec methods internally.',
      ],
      concepts: ['generic struct', 'impl<T>', 'Vec<T>'],
    },
    {
      id: 'rs-gen-8',
      title: 'Generic Pair Methods',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create Pair<T, U> and implement a method `swap` that returns Pair<U, T>.',
      skeleton: `// Write your struct and impl here`,
      solution: `struct Pair<T, U> {
    first: T,
    second: U,
}

impl<T, U> Pair<T, U> {
    fn new(first: T, second: U) -> Self {
        Pair { first, second }
    }

    fn swap(self) -> Pair<U, T> {
        Pair {
            first: self.second,
            second: self.first,
        }
    }
}`,
      hints: [
        'swap consumes self and returns a new Pair with types reversed.',
        'The return type is Pair<U, T> (swapped).',
        'Move the fields into the new struct.',
      ],
      concepts: ['generic methods', 'type parameter swapping'],
    },
    {
      id: 'rs-gen-9',
      title: 'Generic Map Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a generic `map_vec` function that takes Vec<T> and a function Fn(T) -> U, returning Vec<U>.',
      skeleton: `// Write your function here`,
      solution: `fn map_vec<T, U, F: Fn(T) -> U>(v: Vec<T>, f: F) -> Vec<U> {
    v.into_iter().map(f).collect()
}`,
      hints: [
        'Three type parameters: T (input), U (output), F (function).',
        'F must implement Fn(T) -> U.',
        'Use into_iter().map(f).collect().',
      ],
      concepts: ['generic function', 'Fn trait', 'map', 'collect'],
    },
    {
      id: 'rs-gen-10',
      title: 'Conditional Methods',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a Wrapper<T> that has a display() method only when T: Display, using a specialized impl block.',
      skeleton: `// Write your struct and specialized impl here`,
      solution: `use std::fmt::Display;

struct Wrapper<T> {
    value: T,
}

impl<T> Wrapper<T> {
    fn new(value: T) -> Self {
        Wrapper { value }
    }
}

impl<T: Display> Wrapper<T> {
    fn display(&self) {
        println!("{}", self.value);
    }
}`,
      hints: [
        'Use two impl blocks: one generic, one with Display bound.',
        'The display method only exists when T: Display.',
        'This is called conditional method implementation.',
      ],
      concepts: ['conditional impl', 'specialized methods', 'Display'],
    },
    {
      id: 'rs-gen-11',
      title: 'Generic Enum',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Define a generic Either<L, R> enum with Left(L) and Right(R) variants. Implement is_left() and is_right() methods.',
      skeleton: `// Write your enum and impl here`,
      solution: `enum Either<L, R> {
    Left(L),
    Right(R),
}

impl<L, R> Either<L, R> {
    fn is_left(&self) -> bool {
        matches!(self, Either::Left(_))
    }

    fn is_right(&self) -> bool {
        matches!(self, Either::Right(_))
    }
}`,
      hints: [
        'Either has two type parameters: L and R.',
        'Use matches! macro for concise pattern matching.',
        'Return bool from both methods.',
      ],
      concepts: ['generic enum', 'matches!', 'Either type'],
    },
    {
      id: 'rs-gen-12',
      title: 'Generic Reduce',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a generic `reduce` function: takes &[T], an initial U, and a function Fn(U, &T) -> U. Returns the accumulated U.',
      skeleton: `// Write your function here`,
      solution: `fn reduce<T, U, F>(slice: &[T], init: U, f: F) -> U
where
    F: Fn(U, &T) -> U,
{
    let mut acc = init;
    for item in slice {
        acc = f(acc, item);
    }
    acc
}`,
      hints: [
        'This is like fold/reduce from functional programming.',
        'Accumulate from init using the function f.',
        'Use a where clause for cleaner bounds.',
      ],
      concepts: ['fold/reduce', 'generic accumulator', 'where clause'],
    },
    {
      id: 'rs-gen-13',
      title: 'Fix: Missing Type Parameter in impl',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'The impl block is missing the type parameter declaration. Fix it.',
      skeleton: `struct Container<T> { item: T }

impl Container<T> {
    fn get(&self) -> &T {
        &self.item
    }
}`,
      solution: `struct Container<T> { item: T }

impl<T> Container<T> {
    fn get(&self) -> &T {
        &self.item
    }
}`,
      hints: [
        'When implementing for a generic struct, the impl block needs its own type parameter.',
        'Declare T on the impl: impl<T> Container<T>.',
        'Add `<T>` after `impl`.',
      ],
      concepts: ['impl<T>', 'generic impl', 'type parameter declaration'],
    },
    {
      id: 'rs-gen-14',
      title: 'Fix: Cannot Compare Generics',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'This generic function tries to compare values but lacks the necessary bound.',
      skeleton: `fn min_of<T>(a: T, b: T) -> T {
    if a < b { a } else { b }
}`,
      solution: `fn min_of<T: PartialOrd>(a: T, b: T) -> T {
    if a < b { a } else { b }
}`,
      hints: [
        'The < operator requires a trait bound.',
        'T needs to be comparable.',
        'Add `: PartialOrd` bound.',
      ],
      concepts: ['trait bound', 'PartialOrd', 'generic constraint'],
    },
    {
      id: 'rs-gen-15',
      title: 'Fix: Turbofish Needed',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'The compiler cannot infer the type for collect. Fix it.',
      skeleton: `fn main() {
    let nums = vec![1, 2, 3];
    let doubled = nums.iter().map(|x| x * 2).collect();
    println!("{:?}", doubled);
}`,
      solution: `fn main() {
    let nums = vec![1, 2, 3];
    let doubled: Vec<i32> = nums.iter().map(|x| x * 2).collect();
    println!("{:?}", doubled);
}`,
      hints: [
        'collect() does not know what collection type to produce.',
        'Add a type annotation or use turbofish.',
        'Either `let doubled: Vec<i32>` or `.collect::<Vec<i32>>()`.',
      ],
      concepts: ['type inference', 'collect', 'turbofish'],
    },
    {
      id: 'rs-gen-16',
      title: 'Predict: Monomorphization',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn add<T: std::ops::Add<Output = T>>(a: T, b: T) -> T {
    a + b
}

fn main() {
    println!("{} {}", add(1, 2), add(1.5, 2.5));
}`,
      solution: `3 4`,
      hints: [
        'add is monomorphized for both i32 and f64.',
        'add(1, 2) = 3 (i32).',
        'add(1.5, 2.5) = 4.0 which prints as 4.',
      ],
      concepts: ['monomorphization', 'Add trait', 'generic'],
    },
    {
      id: 'rs-gen-17',
      title: 'Predict: Generic Default',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn default_val<T: Default>() -> T {
    T::default()
}

fn main() {
    let n: i32 = default_val();
    let s: String = default_val();
    let b: bool = default_val();
    println!("{} \"{}\" {}", n, s, b);
}`,
      solution: `0 "" false`,
      hints: [
        'i32 default is 0.',
        'String default is empty string.',
        'bool default is false.',
      ],
      concepts: ['Default trait', 'generic', 'type inference'],
    },
    {
      id: 'rs-gen-18',
      title: 'Predict: Sized Types',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn size_of_val<T>(val: &T) -> usize {
    std::mem::size_of::<T>()
}

fn main() {
    println!("{} {} {}", size_of_val(&42i32), size_of_val(&true), size_of_val(&'a'));
}`,
      solution: `4 1 4`,
      hints: [
        'i32 is 4 bytes.',
        'bool is 1 byte.',
        'char is 4 bytes (Unicode scalar value).',
      ],
      concepts: ['size_of', 'generic', 'type sizes'],
    },
    {
      id: 'rs-gen-19',
      title: 'Refactor: Duplicate Functions to Generic',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'These two functions do the same thing for different types. Combine into one generic function.',
      skeleton: `fn sum_i32(list: &[i32]) -> i32 {
    let mut total = 0;
    for &item in list {
        total += item;
    }
    total
}

fn sum_f64(list: &[f64]) -> f64 {
    let mut total = 0.0;
    for &item in list {
        total += item;
    }
    total
}`,
      solution: `fn sum<T>(list: &[T]) -> T
where
    T: std::ops::Add<Output = T> + Copy + Default,
{
    let mut total = T::default();
    for &item in list {
        total = total + item;
    }
    total
}`,
      hints: [
        'Both functions have the same logic, just different types.',
        'Use a generic T with Add, Copy, and Default bounds.',
        'Default provides the initial zero value.',
      ],
      concepts: ['generic refactoring', 'trait bounds', 'DRY'],
    },
    {
      id: 'rs-gen-20',
      title: 'Refactor: Simplify Bounds with Where',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Move the inline bounds to a where clause for readability.',
      skeleton: `fn process<T: std::fmt::Display + Clone + PartialOrd, U: std::fmt::Debug + Default>(t: &T, u: &U) -> String {
    format!("{} {:?}", t, u)
}`,
      solution: `fn process<T, U>(t: &T, u: &U) -> String
where
    T: std::fmt::Display + Clone + PartialOrd,
    U: std::fmt::Debug + Default,
{
    format!("{} {:?}", t, u)
}`,
      hints: [
        'Long inline bounds hurt readability.',
        'Move them to a where clause after the return type.',
        'Each type gets its own line in the where clause.',
      ],
      concepts: ['where clause', 'readability', 'bounds'],
    },
  ],
};
