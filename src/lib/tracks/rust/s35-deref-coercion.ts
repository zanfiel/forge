import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-deref',
  title: '35. Deref Coercion',
  explanation: `## Deref Coercion

Rust automatically converts references through the \`Deref\` trait, allowing seamless use of smart pointers and wrapper types.

### The Deref Trait
\`\`\`rust
use std::ops::Deref;

struct MyBox<T>(T);

impl<T> Deref for MyBox<T> {
    type Target = T;
    fn deref(&self) -> &T {
        &self.0
    }
}
\`\`\`

### Automatic Coercions
Rust performs deref coercion when a reference to a type that implements \`Deref\` is passed where a different reference type is expected:

| From | To |
|------|-----|
| \`&String\` | \`&str\` |
| \`&Vec<T>\` | \`&[T]\` |
| \`&Box<T>\` | \`&T\` |

\`\`\`rust
fn greet(name: &str) {
    println!("Hello, {name}!");
}

let s = String::from("world");
greet(&s); // &String -> &str automatically
\`\`\`

### DerefMut
\`\`\`rust
use std::ops::DerefMut;

impl<T> DerefMut for MyBox<T> {
    fn deref_mut(&mut self) -> &mut T {
        &mut self.0
    }
}
\`\`\`

### Coercion Rules
- \`&T\` to \`&U\` when \`T: Deref<Target = U>\`
- \`&mut T\` to \`&mut U\` when \`T: DerefMut<Target = U>\`
- \`&mut T\` to \`&U\` when \`T: Deref<Target = U>\`

### Dot Operator Auto-Deref
The dot operator automatically dereferences as many times as needed:
\`\`\`rust
let boxed: Box<Vec<String>> = Box::new(vec![String::from("hi")]);
let len = boxed[0].len(); // Box -> Vec -> String -> str
\`\`\`
`,
  exercises: [
    {
      id: 'rs-deref-1',
      title: 'Basic Deref Target',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Complete the Deref implementation by specifying the Target type.',
      skeleton: `use std::ops::Deref;

struct Wrapper(String);

impl Deref for Wrapper {
    type Target = __BLANK__;
    fn deref(&self) -> &String {
        &self.0
    }
}`,
      solution: `use std::ops::Deref;

struct Wrapper(String);

impl Deref for Wrapper {
    type Target = String;
    fn deref(&self) -> &String {
        &self.0
    }
}`,
      hints: [
        'The Target type must match what deref() returns a reference to.',
        'deref() returns &String, so Target should be String.',
        'type Target = String;'
      ],
      concepts: ['deref', 'associated-types', 'target-type']
    },
    {
      id: 'rs-deref-2',
      title: 'String to str Coercion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use deref coercion to pass a String where &str is expected.',
      skeleton: `fn print_len(s: &str) -> usize {
    s.len()
}

fn main() {
    let owned = String::from("hello");
    let length = print_len(__BLANK__);
    println!("{length}");
}`,
      solution: `fn print_len(s: &str) -> usize {
    s.len()
}

fn main() {
    let owned = String::from("hello");
    let length = print_len(&owned);
    println!("{length}");
}`,
      hints: [
        '&String automatically coerces to &str via Deref.',
        'You just need to take a reference to owned.',
        'Use &owned - Rust handles the rest.'
      ],
      concepts: ['deref-coercion', 'string-to-str', 'auto-coercion']
    },
    {
      id: 'rs-deref-3',
      title: 'Vec to Slice Coercion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Pass a Vec where a slice is expected using deref coercion.',
      skeleton: `fn sum(numbers: &[i32]) -> i32 {
    numbers.iter().sum()
}

fn main() {
    let v = vec![1, 2, 3, 4, 5];
    let total = sum(__BLANK__);
    println!("{total}");
}`,
      solution: `fn sum(numbers: &[i32]) -> i32 {
    numbers.iter().sum()
}

fn main() {
    let v = vec![1, 2, 3, 4, 5];
    let total = sum(&v);
    println!("{total}");
}`,
      hints: [
        '&Vec<T> automatically coerces to &[T] via Deref.',
        'Just pass a reference to the Vec.',
        'Use &v to trigger deref coercion.'
      ],
      concepts: ['deref-coercion', 'vec-to-slice', 'auto-coercion']
    },
    {
      id: 'rs-deref-4',
      title: 'Box Deref',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Access the inner value of a Box through deref coercion.',
      skeleton: `fn double(n: &i32) -> i32 {
    n * 2
}

fn main() {
    let boxed = Box::new(21);
    let result = double(__BLANK__);
    println!("{result}");
}`,
      solution: `fn double(n: &i32) -> i32 {
    n * 2
}

fn main() {
    let boxed = Box::new(21);
    let result = double(&boxed);
    println!("{result}");
}`,
      hints: [
        '&Box<T> coerces to &T through Deref.',
        'Pass a reference to the Box.',
        'Use &boxed - the Box dereferences to &i32 automatically.'
      ],
      concepts: ['deref-coercion', 'box', 'smart-pointers']
    },
    {
      id: 'rs-deref-5',
      title: 'Implement Deref for Newtype',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Complete the Deref implementation to return a reference to the inner value.',
      skeleton: `use std::ops::Deref;

struct Email(String);

impl Deref for Email {
    type Target = String;
    fn deref(&self) -> __BLANK__ {
        &self.0
    }
}`,
      solution: `use std::ops::Deref;

struct Email(String);

impl Deref for Email {
    type Target = String;
    fn deref(&self) -> &String {
        &self.0
    }
}`,
      hints: [
        'deref() must return a reference to the Target type.',
        'Target is String, so the return type is &String.',
        'fn deref(&self) -> &String'
      ],
      concepts: ['deref', 'newtype', 'return-type']
    },
    {
      id: 'rs-deref-6',
      title: 'DerefMut Fill',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Complete the DerefMut implementation.',
      skeleton: `use std::ops::{Deref, DerefMut};

struct MutWrapper<T>(T);

impl<T> Deref for MutWrapper<T> {
    type Target = T;
    fn deref(&self) -> &T { &self.0 }
}

impl<T> DerefMut for MutWrapper<T> {
    fn deref_mut(&mut self) -> __BLANK__ {
        &mut self.0
    }
}`,
      solution: `use std::ops::{Deref, DerefMut};

struct MutWrapper<T>(T);

impl<T> Deref for MutWrapper<T> {
    type Target = T;
    fn deref(&self) -> &T { &self.0 }
}

impl<T> DerefMut for MutWrapper<T> {
    fn deref_mut(&mut self) -> &mut T {
        &mut self.0
    }
}`,
      hints: [
        'DerefMut returns a mutable reference to the Target.',
        'The Target type is T from the Deref impl.',
        'Return type is &mut T.'
      ],
      concepts: ['deref-mut', 'mutable-reference', 'generic-deref']
    },
    {
      id: 'rs-deref-7',
      title: 'Predict String Coercion',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the output when deref coercion converts &String to &str.',
      skeleton: `fn first_char(s: &str) -> char {
    s.chars().next().unwrap()
}

fn main() {
    let s = String::from("Rust");
    let c = first_char(&s);
    println!("{c}");
}`,
      solution: 'R',
      hints: [
        '&String coerces to &str, so first_char receives "Rust".',
        'chars().next() returns the first character.',
        'The first character of "Rust" is R.'
      ],
      concepts: ['deref-coercion', 'string-to-str', 'chars']
    },
    {
      id: 'rs-deref-8',
      title: 'Custom Smart Pointer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement a SmartPtr<T> type with Deref that wraps a value and provides access to it.',
      skeleton: `use std::ops::Deref;

struct SmartPtr<T> {
    value: T,
}

impl<T> SmartPtr<T> {
    fn new(value: T) -> Self {
        // todo: implement constructor
    }
}

// todo: implement Deref for SmartPtr<T>`,
      solution: `use std::ops::Deref;

struct SmartPtr<T> {
    value: T,
}

impl<T> SmartPtr<T> {
    fn new(value: T) -> Self {
        SmartPtr { value }
    }
}

impl<T> Deref for SmartPtr<T> {
    type Target = T;
    fn deref(&self) -> &T {
        &self.value
    }
}`,
      hints: [
        'The constructor should wrap the value in a SmartPtr struct.',
        'Deref needs type Target = T and a deref method returning &T.',
        'Return &self.value in deref().'
      ],
      concepts: ['deref', 'smart-pointer', 'generics', 'custom-type']
    },
    {
      id: 'rs-deref-9',
      title: 'Fix Missing Deref',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the code so that the custom wrapper can be used where &str is expected.',
      skeleton: `use std::ops::Deref;

struct Name(String);

impl Deref for Name {
    type Target = str;
    fn deref(&self) -> &String {
        &self.0
    }
}

fn greet(name: &str) {
    println!("Hello, {name}!");
}

fn main() {
    let n = Name(String::from("Alice"));
    greet(&n);
}`,
      solution: `use std::ops::Deref;

struct Name(String);

impl Deref for Name {
    type Target = str;
    fn deref(&self) -> &str {
        &self.0
    }
}

fn greet(name: &str) {
    println!("Hello, {name}!");
}

fn main() {
    let n = Name(String::from("Alice"));
    greet(&n);
}`,
      hints: [
        'The return type of deref() must match &Target.',
        'Target is str, so deref must return &str, not &String.',
        '&String coerces to &str, but the return type annotation must be &str to match Target.'
      ],
      concepts: ['deref', 'target-type', 'return-type-mismatch']
    },
    {
      id: 'rs-deref-10',
      title: 'Deref Chain Prediction',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output when multiple deref coercions occur.',
      skeleton: `fn count_bytes(s: &str) -> usize {
    s.len()
}

fn main() {
    let boxed_string: Box<String> = Box::new(String::from("hello"));
    let n = count_bytes(&boxed_string);
    println!("{n}");
}`,
      solution: '5',
      hints: [
        '&Box<String> -> &String -> &str through chained deref.',
        'count_bytes receives "hello" as &str.',
        '"hello" has 5 bytes.'
      ],
      concepts: ['deref-chain', 'box', 'string', 'coercion']
    },
    {
      id: 'rs-deref-11',
      title: 'Write DerefMut Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement both Deref and DerefMut for a Logged<T> wrapper that holds a value.',
      skeleton: `use std::ops::{Deref, DerefMut};

struct Logged<T> {
    inner: T,
}

impl<T> Logged<T> {
    fn new(value: T) -> Self {
        Logged { inner: value }
    }
}

// todo: implement Deref for Logged<T>

// todo: implement DerefMut for Logged<T>`,
      solution: `use std::ops::{Deref, DerefMut};

struct Logged<T> {
    inner: T,
}

impl<T> Logged<T> {
    fn new(value: T) -> Self {
        Logged { inner: value }
    }
}

impl<T> Deref for Logged<T> {
    type Target = T;
    fn deref(&self) -> &T {
        &self.inner
    }
}

impl<T> DerefMut for Logged<T> {
    fn deref_mut(&mut self) -> &mut T {
        &mut self.inner
    }
}`,
      hints: [
        'Deref requires type Target = T and fn deref(&self) -> &T.',
        'DerefMut requires fn deref_mut(&mut self) -> &mut T.',
        'DerefMut requires Deref to be implemented first.'
      ],
      concepts: ['deref', 'deref-mut', 'generics', 'wrapper-type']
    },
    {
      id: 'rs-deref-12',
      title: 'Fix DerefMut Coercion',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the code so the mutable deref coercion works correctly.',
      skeleton: `use std::ops::{Deref, DerefMut};

struct Buffer(Vec<u8>);

impl Deref for Buffer {
    type Target = Vec<u8>;
    fn deref(&self) -> &Vec<u8> { &self.0 }
}

fn fill(data: &mut Vec<u8>) {
    data.push(1);
    data.push(2);
    data.push(3);
}

fn main() {
    let mut buf = Buffer(Vec::new());
    fill(&mut buf);
    println!("{:?}", buf.0);
}`,
      solution: `use std::ops::{Deref, DerefMut};

struct Buffer(Vec<u8>);

impl Deref for Buffer {
    type Target = Vec<u8>;
    fn deref(&self) -> &Vec<u8> { &self.0 }
}

impl DerefMut for Buffer {
    fn deref_mut(&mut self) -> &mut Vec<u8> { &mut self.0 }
}

fn fill(data: &mut Vec<u8>) {
    data.push(1);
    data.push(2);
    data.push(3);
}

fn main() {
    let mut buf = Buffer(Vec::new());
    fill(&mut buf);
    println!("{:?}", buf.0);
}`,
      hints: [
        'Mutable deref coercion requires DerefMut, not just Deref.',
        'Add a DerefMut implementation for Buffer.',
        'DerefMut::deref_mut returns &mut Vec<u8> via &mut self.0.'
      ],
      concepts: ['deref-mut', 'mutable-coercion', 'missing-trait']
    },
    {
      id: 'rs-deref-13',
      title: 'Dot Operator Auto-Deref',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a function that takes a Box<Vec<String>> and returns the total length of all strings using auto-deref.',
      skeleton: `fn total_len(data: &Box<Vec<String>>) -> usize {
    // todo: use iter and map with auto-deref to sum string lengths
}`,
      solution: `fn total_len(data: &Box<Vec<String>>) -> usize {
    data.iter().map(|s| s.len()).sum()
}`,
      hints: [
        'The dot operator auto-derefs Box to Vec, so you can call .iter() directly.',
        'Each String also auto-derefs for .len().',
        'Use .iter().map(|s| s.len()).sum() to get total length.'
      ],
      concepts: ['auto-deref', 'dot-operator', 'method-resolution']
    },
    {
      id: 'rs-deref-14',
      title: 'Deref vs AsRef',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a generic function that accepts anything that can be referenced as a str (using AsRef<str>).',
      skeleton: `// todo: write a function word_count that accepts any T: AsRef<str>
// and returns the number of whitespace-separated words`,
      solution: `fn word_count<T: AsRef<str>>(text: T) -> usize {
    text.as_ref().split_whitespace().count()
}`,
      hints: [
        'Use a generic parameter T: AsRef<str>.',
        'Call .as_ref() to get a &str from the input.',
        'Use split_whitespace().count() to count words.'
      ],
      concepts: ['asref', 'deref-vs-asref', 'generics', 'trait-bounds']
    },
    {
      id: 'rs-deref-15',
      title: 'Predict Multi-Level Deref',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Predict the output with nested Box dereferences.',
      skeleton: `fn main() {
    let nested: Box<Box<i32>> = Box::new(Box::new(42));
    let val: &i32 = &nested;
    println!("{val}");
}`,
      solution: '42',
      hints: [
        'Box<Box<i32>> derefs to Box<i32>, which derefs to i32.',
        'Rust applies deref coercion repeatedly until types match.',
        '&Box<Box<i32>> -> &Box<i32> -> &i32, giving 42.'
      ],
      concepts: ['multi-level-deref', 'box', 'coercion-chain']
    },
    {
      id: 'rs-deref-16',
      title: 'Fix Conflicting Deref',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix the issue where deref returns the wrong type for the intended use.',
      skeleton: `use std::ops::Deref;

struct Path(String);

impl Deref for Path {
    type Target = String;
    fn deref(&self) -> &String {
        &self.0
    }
}

fn process(p: &std::path::Path) {
    println!("Processing: {:?}", p);
}

fn main() {
    let p = Path(String::from("/home/user"));
    process(&p);
}`,
      solution: `use std::ops::Deref;

struct MyPath(String);

impl Deref for MyPath {
    type Target = str;
    fn deref(&self) -> &str {
        &self.0
    }
}

fn process(p: &std::path::Path) {
    println!("Processing: {:?}", p);
}

fn main() {
    let p = MyPath(String::from("/home/user"));
    process(std::path::Path::new(&*p));
}`,
      hints: [
        'The custom Path name conflicts with std::path::Path.',
        'Deref to String does not auto-coerce to std::path::Path.',
        'Rename the struct and explicitly construct a std::path::Path from the &str.'
      ],
      concepts: ['deref', 'name-conflict', 'explicit-conversion', 'path']
    },
    {
      id: 'rs-deref-17',
      title: 'Refactor Explicit Derefs',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor the code to rely on deref coercion instead of explicit dereferences.',
      skeleton: `fn main() {
    let s = String::from("hello world");
    let boxed: Box<String> = Box::new(String::from("boxed"));
    let v = vec![1, 2, 3];

    let s_ref: &str = &*s;
    let b_ref: &str = &*(*boxed);
    let v_ref: &[i32] = &*v;

    println!("{s_ref} {b_ref} {:?}", v_ref);
}`,
      solution: `fn main() {
    let s = String::from("hello world");
    let boxed: Box<String> = Box::new(String::from("boxed"));
    let v = vec![1, 2, 3];

    let s_ref: &str = &s;
    let b_ref: &str = &boxed;
    let v_ref: &[i32] = &v;

    println!("{s_ref} {b_ref} {:?}", v_ref);
}`,
      hints: [
        'Rust applies deref coercion automatically - no need for explicit *.',
        '&String coerces to &str, &Box<String> coerces to &str, &Vec<T> coerces to &[T].',
        'Replace &*s with &s, &*(*boxed) with &boxed, &*v with &v.'
      ],
      concepts: ['deref-coercion', 'refactoring', 'idiomatic-rust']
    },
    {
      id: 'rs-deref-18',
      title: 'Smart Pointer with Methods',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Create a Cached<T: Clone> smart pointer that implements Deref and caches the last accessed clone.',
      skeleton: `use std::ops::Deref;
use std::cell::Cell;

struct Cached<T: Clone> {
    value: T,
}

impl<T: Clone> Cached<T> {
    fn new(value: T) -> Self {
        // todo: implement constructor
    }
}

// todo: implement Deref for Cached<T>`,
      solution: `use std::ops::Deref;
use std::cell::Cell;

struct Cached<T: Clone> {
    value: T,
}

impl<T: Clone> Cached<T> {
    fn new(value: T) -> Self {
        Cached { value }
    }
}

impl<T: Clone> Deref for Cached<T> {
    type Target = T;
    fn deref(&self) -> &T {
        &self.value
    }
}`,
      hints: [
        'The constructor wraps value in the struct.',
        'Deref::Target is T, deref returns &self.value.',
        'The Clone bound enables future caching but Deref itself just returns &T.'
      ],
      concepts: ['deref', 'smart-pointer', 'clone-bound', 'custom-wrapper']
    },
    {
      id: 'rs-deref-19',
      title: 'Write Recursive Deref',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a function that demonstrates deref coercion across multiple layers: take a &Box<&String> parameter and return its length by relying on auto-deref.',
      skeleton: `fn nested_len(data: &Box<&String>) -> usize {
    // todo: get the length using auto-deref
}`,
      solution: `fn nested_len(data: &Box<&String>) -> usize {
    data.len()
}`,
      hints: [
        'The dot operator auto-derefs through Box, then through &String to str.',
        'You can call .len() directly on data thanks to auto-deref.',
        'Rust resolves: Box -> &String -> String -> str, finding len() on str.'
      ],
      concepts: ['auto-deref', 'method-resolution', 'multi-level', 'dot-operator']
    },
    {
      id: 'rs-deref-20',
      title: 'Refactor to Idiomatic Deref',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor the function signatures and calls to use deref coercion instead of manual conversions.',
      skeleton: `fn process_name(name: &str) -> String {
    format!("Hello, {name}!")
}

fn process_ids(ids: &[i32]) -> i32 {
    ids.iter().sum()
}

fn main() {
    let name = String::from("Alice");
    let ids = vec![1, 2, 3];
    let boxed_name = Box::new(String::from("Bob"));

    let g1 = process_name(name.as_str());
    let g2 = process_name((*boxed_name).as_str());
    let total = process_ids(ids.as_slice());

    println!("{g1} {g2} {total}");
}`,
      solution: `fn process_name(name: &str) -> String {
    format!("Hello, {name}!")
}

fn process_ids(ids: &[i32]) -> i32 {
    ids.iter().sum()
}

fn main() {
    let name = String::from("Alice");
    let ids = vec![1, 2, 3];
    let boxed_name = Box::new(String::from("Bob"));

    let g1 = process_name(&name);
    let g2 = process_name(&boxed_name);
    let total = process_ids(&ids);

    println!("{g1} {g2} {total}");
}`,
      hints: [
        'Replace .as_str() with & and let deref coercion handle it.',
        '&String -> &str, &Box<String> -> &str, &Vec<T> -> &[T] all happen automatically.',
        'Replace name.as_str() with &name, (*boxed_name).as_str() with &boxed_name, ids.as_slice() with &ids.'
      ],
      concepts: ['deref-coercion', 'idiomatic-rust', 'refactoring', 'clean-code']
    }
  ]
};
