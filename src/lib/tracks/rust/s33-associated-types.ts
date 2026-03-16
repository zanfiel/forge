import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-assoc',
  title: '33. Associated Types',
  explanation: `## Associated Types

Associated types are type placeholders in traits that implementors specify.

### Basic Associated Type
\`\`\`rust
trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;
}
\`\`\`

### vs Generics
\`\`\`rust
// With generics: can implement for multiple types
trait ConvertTo<T> { fn convert(&self) -> T; }

// With associated type: one implementation per type
trait Graph {
    type Node;
    type Edge;
    fn edges(&self, node: &Self::Node) -> Vec<Self::Edge>;
}
\`\`\`

### Default Associated Types
\`\`\`rust
trait Add<Rhs = Self> {
    type Output;
    fn add(self, rhs: Rhs) -> Self::Output;
}
\`\`\`

### Associated Type Bounds
\`\`\`rust
fn sum_iter<I>(iter: I) -> i32
where
    I: Iterator<Item = i32>,
{
    iter.sum()
}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-assoc-1',
      title: 'Define Associated Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Define a trait with an associated type.',
      skeleton: `trait Container {
    __BLANK__ Item;
    fn first(&self) -> Option<&Self::Item>;
}`,
      solution: `trait Container {
    type Item;
    fn first(&self) -> Option<&Self::Item>;
}`,
      hints: [
        'Associated types use the type keyword inside traits.',
        'They are referenced as Self::TypeName.',
        'The answer is type.',
      ],
      concepts: ['associated-type', 'trait', 'type-keyword'],
    },
    {
      id: 'rs-assoc-2',
      title: 'Implement Associated Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Specify the concrete type for an associated type in an impl.',
      skeleton: `trait Container {
    type Item;
    fn first(&self) -> Option<&Self::Item>;
}

struct NumberList(Vec<i32>);

impl Container for NumberList {
    type Item = __BLANK__;
    fn first(&self) -> Option<&i32> {
        self.0.first()
    }
}`,
      solution: `trait Container {
    type Item;
    fn first(&self) -> Option<&Self::Item>;
}

struct NumberList(Vec<i32>);

impl Container for NumberList {
    type Item = i32;
    fn first(&self) -> Option<&i32> {
        self.0.first()
    }
}`,
      hints: [
        'In the impl, specify what Item concretely is.',
        'NumberList contains i32 values.',
        'The answer is i32.',
      ],
      concepts: ['associated-type', 'impl', 'concrete-type'],
    },
    {
      id: 'rs-assoc-3',
      title: 'Use Self::Item',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Reference the associated type in a method signature.',
      skeleton: `trait Producer {
    type Output;
    fn produce(&self) -> __BLANK__::Output;
}

struct Factory;
impl Producer for Factory {
    type Output = String;
    fn produce(&self) -> String {
        "product".to_string()
    }
}`,
      solution: `trait Producer {
    type Output;
    fn produce(&self) -> Self::Output;
}

struct Factory;
impl Producer for Factory {
    type Output = String;
    fn produce(&self) -> String {
        "product".to_string()
    }
}`,
      hints: [
        'Within the trait, refer to the associated type as Self::Output.',
        'Self refers to the implementing type.',
        'The answer is Self.',
      ],
      concepts: ['Self', 'associated-type', 'method-signature'],
    },
    {
      id: 'rs-assoc-4',
      title: 'Associated Type Bound',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Constrain an associated type in a where clause.',
      skeleton: `use std::fmt::Display;

trait Source {
    type Data;
    fn get(&self) -> Self::Data;
}

fn print_source<S: Source>(s: &S)
where
    S::Data: __BLANK__,
{
    println!("{}", s.get());
}`,
      solution: `use std::fmt::Display;

trait Source {
    type Data;
    fn get(&self) -> Self::Data;
}

fn print_source<S: Source>(s: &S)
where
    S::Data: Display,
{
    println!("{}", s.get());
}`,
      hints: [
        'We need S::Data to be printable.',
        'Display is the trait for {} formatting.',
        'The answer is Display.',
      ],
      concepts: ['associated-type-bound', 'where-clause', 'Display'],
    },
    {
      id: 'rs-assoc-5',
      title: 'Iterator Item Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Constrain an Iterator by its associated Item type.',
      skeleton: `fn sum_strings<I>(iter: I) -> String
where
    I: Iterator<__BLANK__ = String>,
{
    iter.collect::<Vec<_>>().join(", ")
}`,
      solution: `fn sum_strings<I>(iter: I) -> String
where
    I: Iterator<Item = String>,
{
    iter.collect::<Vec<_>>().join(", ")
}`,
      hints: [
        'Iterator has an associated type called Item.',
        'Constrain it with Iterator<Item = Type>.',
        'The answer is Item.',
      ],
      concepts: ['Iterator', 'Item', 'associated-type-constraint'],
    },
    {
      id: 'rs-assoc-6',
      title: 'Multiple Associated Types',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Define a trait with multiple associated types.',
      skeleton: `trait KeyValue {
    type Key;
    type __BLANK__;
    fn get(&self, key: &Self::Key) -> Option<&Self::Value>;
}`,
      solution: `trait KeyValue {
    type Key;
    type Value;
    fn get(&self, key: &Self::Key) -> Option<&Self::Value>;
}`,
      hints: [
        'A trait can have multiple associated types.',
        'Each is declared with the type keyword.',
        'The answer is Value.',
      ],
      concepts: ['associated-type', 'multiple-types', 'Key-Value'],
    },
    {
      id: 'rs-assoc-7',
      title: 'Custom Iterator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Implement Iterator with an associated Item type for a counter.',
      skeleton: `struct Counter {
    count: u32,
    max: u32,
}

impl Counter {
    fn new(max: u32) -> Self {
        Counter { count: 0, max }
    }
}

// Implement Iterator for Counter
// Item = u32, yields count from 1 to max
// TODO`,
      solution: `struct Counter {
    count: u32,
    max: u32,
}

impl Counter {
    fn new(max: u32) -> Self {
        Counter { count: 0, max }
    }
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        if self.count < self.max {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}`,
      hints: [
        'Set type Item = u32 in the impl.',
        'Increment count and return Some(count) while under max.',
        'Return None when count reaches max.',
      ],
      concepts: ['Iterator', 'associated-type', 'next', 'custom-iterator'],
    },
    {
      id: 'rs-assoc-8',
      title: 'Graph Trait',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Define and implement a Graph trait with Node and Edge associated types.',
      skeleton: `// Define a Graph trait with Node and Edge associated types
// Implement for SimpleGraph that uses usize as Node and (usize, usize) as Edge
// TODO`,
      solution: `trait Graph {
    type Node;
    type Edge;
    fn nodes(&self) -> Vec<Self::Node>;
    fn edges(&self) -> Vec<Self::Edge>;
}

struct SimpleGraph {
    node_count: usize,
    edge_list: Vec<(usize, usize)>,
}

impl Graph for SimpleGraph {
    type Node = usize;
    type Edge = (usize, usize);

    fn nodes(&self) -> Vec<usize> {
        (0..self.node_count).collect()
    }

    fn edges(&self) -> Vec<(usize, usize)> {
        self.edge_list.clone()
    }
}`,
      hints: [
        'Define associated types Node and Edge in the trait.',
        'SimpleGraph uses usize for nodes and (usize, usize) for edges.',
        'Implement both methods returning the concrete types.',
      ],
      concepts: ['associated-type', 'Graph', 'Node', 'Edge'],
    },
    {
      id: 'rs-assoc-9',
      title: 'Converter Trait',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Build a trait that converts Self into an associated Output type.',
      skeleton: `// Define trait Transformer with associated type Output
// Method: fn transform(self) -> Self::Output
// Impl 1: String -> Vec<char>
// Impl 2: Vec<i32> -> i32 (sum)
// TODO`,
      solution: `trait Transformer {
    type Output;
    fn transform(self) -> Self::Output;
}

impl Transformer for String {
    type Output = Vec<char>;
    fn transform(self) -> Vec<char> {
        self.chars().collect()
    }
}

impl Transformer for Vec<i32> {
    type Output = i32;
    fn transform(self) -> i32 {
        self.iter().sum()
    }
}`,
      hints: [
        'The trait takes self by value.',
        'String transforms to Vec<char>, Vec<i32> transforms to i32.',
        'Each impl specifies its own Output type.',
      ],
      concepts: ['associated-type', 'Transformer', 'type-conversion'],
    },
    {
      id: 'rs-assoc-10',
      title: 'Associated Type with Bounds',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Define a trait where the associated type must implement Display.',
      skeleton: `use std::fmt::Display;

// Define trait Labeled where type Label: Display
// Method: fn label(&self) -> Self::Label
// Implement for Product { name: String }
// TODO`,
      solution: `use std::fmt::Display;

trait Labeled {
    type Label: Display;
    fn label(&self) -> Self::Label;
}

struct Product {
    name: String,
}

impl Labeled for Product {
    type Label = String;
    fn label(&self) -> String {
        self.name.clone()
    }
}`,
      hints: [
        'Add a bound after the associated type: type Label: Display.',
        'This ensures any Label can be displayed.',
        'String implements Display, so it satisfies the bound.',
      ],
      concepts: ['associated-type-bound', 'Display', 'trait-definition'],
    },
    {
      id: 'rs-assoc-11',
      title: 'Associated Type in Return Position',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a generic function that uses an associated type in its return.',
      skeleton: `trait Parser {
    type Output;
    fn parse(&self, input: &str) -> Result<Self::Output, String>;
}

struct IntParser;
// TODO: implement Parser for IntParser, Output = i32

struct BoolParser;
// TODO: implement Parser for BoolParser, Output = bool

// Generic function that parses and prints the result
fn parse_and_print<P: Parser>(parser: &P, input: &str)
where
    P::Output: std::fmt::Debug,
{
    // TODO
}`,
      solution: `trait Parser {
    type Output;
    fn parse(&self, input: &str) -> Result<Self::Output, String>;
}

struct IntParser;
impl Parser for IntParser {
    type Output = i32;
    fn parse(&self, input: &str) -> Result<i32, String> {
        input.trim().parse::<i32>().map_err(|e| e.to_string())
    }
}

struct BoolParser;
impl Parser for BoolParser {
    type Output = bool;
    fn parse(&self, input: &str) -> Result<bool, String> {
        match input.trim() {
            "true" => Ok(true),
            "false" => Ok(false),
            _ => Err("invalid bool".to_string()),
        }
    }
}

fn parse_and_print<P: Parser>(parser: &P, input: &str)
where
    P::Output: std::fmt::Debug,
{
    match parser.parse(input) {
        Ok(val) => println!("{:?}", val),
        Err(e) => println!("Error: {e}"),
    }
}`,
      hints: [
        'IntParser::Output = i32, BoolParser::Output = bool.',
        'Use P::Output: Debug bound to print the result.',
        'parse_and_print works with any Parser implementation.',
      ],
      concepts: ['associated-type', 'Parser', 'generic-function', 'where-clause'],
    },
    {
      id: 'rs-assoc-12',
      title: 'GAT-Like Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Simulate generic associated types using a workaround.',
      skeleton: `// A collection trait that can lend references to items
trait Collection {
    type Item;
    fn get(&self, index: usize) -> Option<&Self::Item>;
    fn len(&self) -> usize;
}

// TODO: implement for Vec<T> and [T; N]`,
      solution: `trait Collection {
    type Item;
    fn get(&self, index: usize) -> Option<&Self::Item>;
    fn len(&self) -> usize;
}

impl<T> Collection for Vec<T> {
    type Item = T;
    fn get(&self, index: usize) -> Option<&T> {
        self.as_slice().get(index)
    }
    fn len(&self) -> usize {
        Vec::len(self)
    }
}

impl<T, const N: usize> Collection for [T; N] {
    type Item = T;
    fn get(&self, index: usize) -> Option<&T> {
        self.as_slice().get(index)
    }
    fn len(&self) -> usize {
        N
    }
}`,
      hints: [
        'Implement Collection for Vec<T> with type Item = T.',
        'For arrays, use const generics: [T; N].',
        'Both delegate to slice methods.',
      ],
      concepts: ['associated-type', 'const-generics', 'Collection', 'impl'],
    },
    {
      id: 'rs-assoc-13',
      title: 'Bug: Wrong Associated Type',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix an impl that specifies the wrong associated type.',
      skeleton: `trait Converter {
    type Output;
    fn convert(&self) -> Self::Output;
}

struct Celsius(f64);

impl Converter for Celsius {
    type Output = String; // wrong! should be f64
    fn convert(&self) -> f64 {
        self.0 * 9.0 / 5.0 + 32.0
    }
}`,
      solution: `trait Converter {
    type Output;
    fn convert(&self) -> Self::Output;
}

struct Celsius(f64);

impl Converter for Celsius {
    type Output = f64;
    fn convert(&self) -> f64 {
        self.0 * 9.0 / 5.0 + 32.0
    }
}`,
      hints: [
        'The method returns f64 but Output is declared as String.',
        'The associated type must match the method return type.',
        'Change type Output = String to type Output = f64.',
      ],
      concepts: ['associated-type', 'type-mismatch', 'impl'],
    },
    {
      id: 'rs-assoc-14',
      title: 'Bug: Missing Type Bound',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a function that uses an associated type without the necessary trait bound.',
      skeleton: `trait Processor {
    type Result;
    fn process(&self) -> Self::Result;
}

fn process_and_debug<P: Processor>(p: &P) {
    let result = p.process();
    println!("{:?}", result); // Error: Result doesn't implement Debug
}`,
      solution: `trait Processor {
    type Result;
    fn process(&self) -> Self::Result;
}

fn process_and_debug<P: Processor>(p: &P)
where
    P::Result: std::fmt::Debug,
{
    let result = p.process();
    println!("{:?}", result);
}`,
      hints: [
        'The function uses {:?} which requires Debug.',
        'Add a where clause: P::Result: Debug.',
        'This ensures the associated type is printable.',
      ],
      concepts: ['associated-type-bound', 'where-clause', 'Debug'],
    },
    {
      id: 'rs-assoc-15',
      title: 'Bug: Conflicting Associated Types',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix ambiguous associated type reference when implementing multiple traits.',
      skeleton: `trait A { type Item; fn get_a(&self) -> Self::Item; }
trait B { type Item; fn get_b(&self) -> Self::Item; }

struct Both;
impl A for Both { type Item = i32; fn get_a(&self) -> i32 { 1 } }
impl B for Both { type Item = String; fn get_b(&self) -> String { "b".into() } }

fn use_both(x: &Both) {
    let a: i32 = x.get_a();
    let b: String = x.get_b();
    // Need fully qualified syntax for disambiguation
    let _a: i32 = <Both as A>::Item::default(); // this doesn't work
}`,
      solution: `trait A { type Item; fn get_a(&self) -> Self::Item; }
trait B { type Item; fn get_b(&self) -> Self::Item; }

struct Both;
impl A for Both { type Item = i32; fn get_a(&self) -> i32 { 1 } }
impl B for Both { type Item = String; fn get_b(&self) -> String { "b".into() } }

fn use_both(x: &Both) {
    let a: i32 = <Both as A>::get_a(x);
    let b: String = <Both as B>::get_b(x);
    println!("{a} {b}");
}`,
      hints: [
        'When two traits have the same associated type name, use fully qualified syntax.',
        '<Type as Trait>::method(self) disambiguates.',
        'Use <Both as A>::get_a(x) and <Both as B>::get_b(x).',
      ],
      concepts: ['fully-qualified-syntax', 'disambiguation', 'associated-type'],
    },
    {
      id: 'rs-assoc-16',
      title: 'Predict: Associated Type',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the output when using an associated type.',
      skeleton: `trait Double {
    type Output;
    fn double(&self) -> Self::Output;
}

impl Double for i32 {
    type Output = i64;
    fn double(&self) -> i64 { (*self as i64) * 2 }
}

fn main() {
    let x: i32 = 21;
    println!("{}", x.double());
}`,
      solution: `42`,
      hints: [
        'x is 21i32, double converts to i64 and multiplies by 2.',
        '21 * 2 = 42.',
        'The Output type is i64 but the value is 42.',
      ],
      concepts: ['associated-type', 'Double', 'type-conversion'],
    },
    {
      id: 'rs-assoc-17',
      title: 'Predict: Iterator Chaining Types',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of chained iterator operations with associated types.',
      skeleton: `fn main() {
    let v = vec![1, 2, 3, 4, 5];
    let result: Vec<String> = v.iter()
        .filter(|&&x| x > 2)
        .map(|x| x.to_string())
        .collect();
    println!("{}", result.join(","));
}`,
      solution: `3,4,5`,
      hints: [
        'filter keeps elements > 2: [3, 4, 5].',
        'map converts to strings: ["3", "4", "5"].',
        'join(",") produces "3,4,5".',
      ],
      concepts: ['Iterator', 'filter', 'map', 'collect', 'associated-type'],
    },
    {
      id: 'rs-assoc-18',
      title: 'Predict: Add Trait Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output when Add trait has a custom Output type.',
      skeleton: `use std::ops::Add;

struct Meters(f64);
struct Centimeters(f64);

impl Add<Centimeters> for Meters {
    type Output = Meters;
    fn add(self, rhs: Centimeters) -> Meters {
        Meters(self.0 + rhs.0 / 100.0)
    }
}

fn main() {
    let result = Meters(1.0) + Centimeters(50.0);
    println!("{:.1}", result.0);
}`,
      solution: `1.5`,
      hints: [
        '1.0 meters + 50.0 centimeters.',
        '50.0 / 100.0 = 0.5 meters.',
        '1.0 + 0.5 = 1.5.',
      ],
      concepts: ['Add', 'Output', 'operator-overloading', 'associated-type'],
    },
    {
      id: 'rs-assoc-19',
      title: 'Refactor: Generic to Associated',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor a generic trait parameter to an associated type for clarity.',
      skeleton: `trait Encoder<T> {
    fn encode(&self, item: &T) -> Vec<u8>;
}

struct JsonEncoder;

impl Encoder<String> for JsonEncoder {
    fn encode(&self, item: &String) -> Vec<u8> {
        format!("\"{}\"", item).into_bytes()
    }
}

fn encode_item<E: Encoder<String>>(encoder: &E, item: &String) -> Vec<u8> {
    encoder.encode(item)
}`,
      solution: `trait Encoder {
    type Item;
    fn encode(&self, item: &Self::Item) -> Vec<u8>;
}

struct JsonEncoder;

impl Encoder for JsonEncoder {
    type Item = String;
    fn encode(&self, item: &String) -> Vec<u8> {
        format!("\"{}\"", item).into_bytes()
    }
}

fn encode_item<E: Encoder>(encoder: &E, item: &E::Item) -> Vec<u8> {
    encoder.encode(item)
}`,
      hints: [
        'When each Encoder has exactly one input type, use associated type.',
        'Replace the generic parameter with type Item.',
        'Callers use E::Item instead of specifying the type parameter.',
      ],
      concepts: ['associated-type', 'generic-to-associated', 'refactor'],
    },
    {
      id: 'rs-assoc-20',
      title: 'Refactor: Simplify Bounds',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Simplify complex generic bounds using associated types.',
      skeleton: `use std::fmt::{Debug, Display};

trait Store<K, V> {
    fn put(&mut self, key: K, value: V);
    fn get(&self, key: &K) -> Option<&V>;
}

fn use_store<K: Debug + Clone + Eq + std::hash::Hash, V: Display + Debug, S: Store<K, V>>(
    store: &S,
    key: &K,
) {
    if let Some(v) = store.get(key) {
        println!("{v}");
    }
}`,
      solution: `use std::fmt::{Debug, Display};
use std::hash::Hash;

trait Store {
    type Key: Debug + Clone + Eq + Hash;
    type Value: Display + Debug;
    fn put(&mut self, key: Self::Key, value: Self::Value);
    fn get(&self, key: &Self::Key) -> Option<&Self::Value>;
}

fn use_store<S: Store>(store: &S, key: &S::Key) {
    if let Some(v) = store.get(key) {
        println!("{v}");
    }
}`,
      hints: [
        'Move the bounds into associated type declarations.',
        'type Key: Debug + Clone + Eq + Hash puts bounds on the trait.',
        'Callers just need S: Store without repeating all bounds.',
      ],
      concepts: ['associated-type', 'bound-simplification', 'refactor'],
    },
  ],
};
