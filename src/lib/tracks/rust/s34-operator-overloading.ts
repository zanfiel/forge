import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-ops',
  title: '34. Operator Overloading',
  explanation: `## Operator Overloading

Rust operators are syntactic sugar for trait method calls.

### std::ops Traits
| Operator | Trait | Method |
|----------|-------|--------|
| \`+\` | Add | add(self, rhs) |
| \`-\` | Sub | sub(self, rhs) |
| \`*\` | Mul | mul(self, rhs) |
| \`==\` | PartialEq | eq(&self, other) |
| \`<\` | PartialOrd | partial_cmp(&self, other) |
| \`[]\` | Index | index(&self, idx) |
| \`-x\` | Neg | neg(self) |

### Example: Add
\`\`\`rust
use std::ops::Add;

#[derive(Debug, Clone, Copy)]
struct Point { x: f64, y: f64 }

impl Add for Point {
    type Output = Point;
    fn add(self, rhs: Point) -> Point {
        Point { x: self.x + rhs.x, y: self.y + rhs.y }
    }
}
\`\`\`

### PartialEq and Eq
\`\`\`rust
impl PartialEq for Point {
    fn eq(&self, other: &Self) -> bool {
        self.x == other.x && self.y == other.y
    }
}
\`\`\`

### Index
\`\`\`rust
use std::ops::Index;

impl Index<usize> for MyVec {
    type Output = i32;
    fn index(&self, idx: usize) -> &i32 { &self.data[idx] }
}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-ops-1',
      title: 'Implement Add',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Implement the Add trait for a Vec2 struct.',
      skeleton: `use std::ops::Add;

#[derive(Debug)]
struct Vec2 { x: f64, y: f64 }

impl __BLANK__ for Vec2 {
    type Output = Vec2;
    fn add(self, rhs: Vec2) -> Vec2 {
        Vec2 { x: self.x + rhs.x, y: self.y + rhs.y }
    }
}

fn main() {
    let a = Vec2 { x: 1.0, y: 2.0 };
    let b = Vec2 { x: 3.0, y: 4.0 };
    let c = a + b;
    println!("{:?}", c);
}`,
      solution: `use std::ops::Add;

#[derive(Debug)]
struct Vec2 { x: f64, y: f64 }

impl Add for Vec2 {
    type Output = Vec2;
    fn add(self, rhs: Vec2) -> Vec2 {
        Vec2 { x: self.x + rhs.x, y: self.y + rhs.y }
    }
}

fn main() {
    let a = Vec2 { x: 1.0, y: 2.0 };
    let b = Vec2 { x: 3.0, y: 4.0 };
    let c = a + b;
    println!("{:?}", c);
}`,
      hints: [
        'The + operator uses the Add trait.',
        'impl Add for Vec2 allows Vec2 + Vec2.',
        'The answer is Add.',
      ],
      concepts: ['Add', 'operator-overloading', 'Output'],
    },
    {
      id: 'rs-ops-2',
      title: 'Implement Neg',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Implement unary negation for a number wrapper.',
      skeleton: `use std::ops::Neg;

struct Num(i32);

impl Neg for Num {
    type Output = Num;
    fn __BLANK__(self) -> Num {
        Num(-self.0)
    }
}

fn main() {
    let n = Num(5);
    let neg = -n;
    println!("{}", neg.0);
}`,
      solution: `use std::ops::Neg;

struct Num(i32);

impl Neg for Num {
    type Output = Num;
    fn neg(self) -> Num {
        Num(-self.0)
    }
}

fn main() {
    let n = Num(5);
    let neg = -n;
    println!("{}", neg.0);
}`,
      hints: [
        'The Neg trait has a neg(self) method.',
        'It corresponds to the unary - operator.',
        'The answer is neg.',
      ],
      concepts: ['Neg', 'unary-operator', 'negation'],
    },
    {
      id: 'rs-ops-3',
      title: 'PartialEq',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Implement PartialEq to compare two structs with ==.',
      skeleton: `struct Color { r: u8, g: u8, b: u8 }

impl PartialEq for Color {
    fn __BLANK__(&self, other: &Self) -> bool {
        self.r == other.r && self.g == other.g && self.b == other.b
    }
}

fn main() {
    let a = Color { r: 255, g: 0, b: 0 };
    let b = Color { r: 255, g: 0, b: 0 };
    println!("{}", a == b);
}`,
      solution: `struct Color { r: u8, g: u8, b: u8 }

impl PartialEq for Color {
    fn eq(&self, other: &Self) -> bool {
        self.r == other.r && self.g == other.g && self.b == other.b
    }
}

fn main() {
    let a = Color { r: 255, g: 0, b: 0 };
    let b = Color { r: 255, g: 0, b: 0 };
    println!("{}", a == b);
}`,
      hints: [
        'PartialEq requires the eq method.',
        'It takes &self and &Self (reference to same type).',
        'The answer is eq.',
      ],
      concepts: ['PartialEq', 'eq', 'equality'],
    },
    {
      id: 'rs-ops-4',
      title: 'Mul with Different Types',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement Mul to multiply a Vec2 by a scalar f64.',
      skeleton: `use std::ops::Mul;

#[derive(Debug)]
struct Vec2 { x: f64, y: f64 }

impl Mul<__BLANK__> for Vec2 {
    type Output = Vec2;
    fn mul(self, scalar: f64) -> Vec2 {
        Vec2 { x: self.x * scalar, y: self.y * scalar }
    }
}

fn main() {
    let v = Vec2 { x: 1.0, y: 2.0 } * 3.0;
    println!("{:?}", v);
}`,
      solution: `use std::ops::Mul;

#[derive(Debug)]
struct Vec2 { x: f64, y: f64 }

impl Mul<f64> for Vec2 {
    type Output = Vec2;
    fn mul(self, scalar: f64) -> Vec2 {
        Vec2 { x: self.x * scalar, y: self.y * scalar }
    }
}

fn main() {
    let v = Vec2 { x: 1.0, y: 2.0 } * 3.0;
    println!("{:?}", v);
}`,
      hints: [
        'Mul<Rhs> takes a type parameter for the right-hand side.',
        'Vec2 * f64 means Mul<f64> for Vec2.',
        'The answer is f64.',
      ],
      concepts: ['Mul', 'generic-rhs', 'scalar-multiplication'],
    },
    {
      id: 'rs-ops-5',
      title: 'Index Operator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement the Index trait for bracket operator access.',
      skeleton: `use std::ops::Index;

struct Matrix {
    data: Vec<Vec<f64>>,
}

impl Index<(usize, usize)> for Matrix {
    type __BLANK__ = f64;
    fn index(&self, idx: (usize, usize)) -> &f64 {
        &self.data[idx.0][idx.1]
    }
}

fn main() {
    let m = Matrix { data: vec![vec![1.0, 2.0], vec![3.0, 4.0]] };
    println!("{}", m[(1, 0)]);
}`,
      solution: `use std::ops::Index;

struct Matrix {
    data: Vec<Vec<f64>>,
}

impl Index<(usize, usize)> for Matrix {
    type Output = f64;
    fn index(&self, idx: (usize, usize)) -> &f64 {
        &self.data[idx.0][idx.1]
    }
}

fn main() {
    let m = Matrix { data: vec![vec![1.0, 2.0], vec![3.0, 4.0]] };
    println!("{}", m[(1, 0)]);
}`,
      hints: [
        'Index trait has an associated type called Output.',
        'It defines what type the [] operator returns a reference to.',
        'The answer is Output.',
      ],
      concepts: ['Index', 'Output', 'bracket-operator'],
    },
    {
      id: 'rs-ops-6',
      title: 'Display Formatting',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement Display for custom formatting with println!.',
      skeleton: `use std::fmt;

struct Point { x: f64, y: f64 }

impl fmt::__BLANK__ for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

fn main() {
    let p = Point { x: 1.5, y: 2.5 };
    println!("{p}");
}`,
      solution: `use std::fmt;

struct Point { x: f64, y: f64 }

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

fn main() {
    let p = Point { x: 1.5, y: 2.5 };
    println!("{p}");
}`,
      hints: [
        'Display trait enables {} formatting.',
        'It lives in std::fmt module.',
        'The answer is Display.',
      ],
      concepts: ['Display', 'fmt', 'formatting'],
    },
    {
      id: 'rs-ops-7',
      title: 'Add for Custom Type',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Implement Add for a Money struct that sums amounts.',
      skeleton: `use std::ops::Add;

#[derive(Debug, PartialEq)]
struct Money {
    cents: i64,
}

// TODO: implement Add for Money`,
      solution: `use std::ops::Add;

#[derive(Debug, PartialEq)]
struct Money {
    cents: i64,
}

impl Add for Money {
    type Output = Money;
    fn add(self, rhs: Money) -> Money {
        Money { cents: self.cents + rhs.cents }
    }
}`,
      hints: [
        'Implement Add with type Output = Money.',
        'The add method sums the cents fields.',
        'Money { cents: 100 } + Money { cents: 50 } = Money { cents: 150 }.',
      ],
      concepts: ['Add', 'custom-type', 'operator-overloading'],
    },
    {
      id: 'rs-ops-8',
      title: 'Comparison Operators',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement PartialOrd for a Temperature type that compares by degrees.',
      skeleton: `#[derive(Debug, PartialEq)]
struct Temperature {
    celsius: f64,
}

// TODO: implement PartialOrd for Temperature`,
      solution: `#[derive(Debug, PartialEq)]
struct Temperature {
    celsius: f64,
}

impl PartialOrd for Temperature {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        self.celsius.partial_cmp(&other.celsius)
    }
}`,
      hints: [
        'PartialOrd requires partial_cmp returning Option<Ordering>.',
        'Delegate to f64 partial_cmp on the celsius field.',
        'f64 uses PartialOrd (not Ord) because of NaN.',
      ],
      concepts: ['PartialOrd', 'partial_cmp', 'Ordering'],
    },
    {
      id: 'rs-ops-9',
      title: 'BitOr for Flags',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement BitOr for a flags type to combine permissions.',
      skeleton: `use std::ops::BitOr;

#[derive(Debug, Clone, Copy, PartialEq)]
struct Permissions(u8);

impl Permissions {
    const READ: Permissions = Permissions(0b001);
    const WRITE: Permissions = Permissions(0b010);
    const EXEC: Permissions = Permissions(0b100);
}

// TODO: implement BitOr for Permissions
// Also implement a contains method`,
      solution: `use std::ops::BitOr;

#[derive(Debug, Clone, Copy, PartialEq)]
struct Permissions(u8);

impl Permissions {
    const READ: Permissions = Permissions(0b001);
    const WRITE: Permissions = Permissions(0b010);
    const EXEC: Permissions = Permissions(0b100);

    fn contains(&self, other: Permissions) -> bool {
        self.0 & other.0 == other.0
    }
}

impl BitOr for Permissions {
    type Output = Permissions;
    fn bitor(self, rhs: Permissions) -> Permissions {
        Permissions(self.0 | rhs.0)
    }
}`,
      hints: [
        'BitOr uses the | operator for combining flags.',
        'Combine with bitwise OR on the inner u8.',
        'contains checks with bitwise AND.',
      ],
      concepts: ['BitOr', 'flags', 'bitwise', 'permissions'],
    },
    {
      id: 'rs-ops-10',
      title: 'AddAssign',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement AddAssign for a Point struct to support +=.',
      skeleton: `use std::ops::AddAssign;

#[derive(Debug)]
struct Point { x: f64, y: f64 }

// TODO: implement AddAssign for Point`,
      solution: `use std::ops::AddAssign;

#[derive(Debug)]
struct Point { x: f64, y: f64 }

impl AddAssign for Point {
    fn add_assign(&mut self, rhs: Point) {
        self.x += rhs.x;
        self.y += rhs.y;
    }
}`,
      hints: [
        'AddAssign enables the += operator.',
        'It takes &mut self and modifies in place.',
        'No Output type needed since it modifies self.',
      ],
      concepts: ['AddAssign', 'compound-assignment', 'mut-self'],
    },
    {
      id: 'rs-ops-11',
      title: 'Index and IndexMut',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Implement both Index and IndexMut for a custom collection.',
      skeleton: `use std::ops::{Index, IndexMut};

struct Grid {
    data: Vec<Vec<i32>>,
    rows: usize,
    cols: usize,
}

impl Grid {
    fn new(rows: usize, cols: usize) -> Self {
        Grid { data: vec![vec![0; cols]; rows], rows, cols }
    }
}

// TODO: implement Index<(usize, usize)> and IndexMut<(usize, usize)>`,
      solution: `use std::ops::{Index, IndexMut};

struct Grid {
    data: Vec<Vec<i32>>,
    rows: usize,
    cols: usize,
}

impl Grid {
    fn new(rows: usize, cols: usize) -> Self {
        Grid { data: vec![vec![0; cols]; rows], rows, cols }
    }
}

impl Index<(usize, usize)> for Grid {
    type Output = i32;
    fn index(&self, idx: (usize, usize)) -> &i32 {
        &self.data[idx.0][idx.1]
    }
}

impl IndexMut<(usize, usize)> for Grid {
    fn index_mut(&mut self, idx: (usize, usize)) -> &mut i32 {
        &mut self.data[idx.0][idx.1]
    }
}`,
      hints: [
        'Index returns &Output, IndexMut returns &mut Output.',
        'IndexMut enables grid[(r,c)] = value assignments.',
        'Both use the same (usize, usize) index type.',
      ],
      concepts: ['Index', 'IndexMut', 'custom-collection', 'Grid'],
    },
    {
      id: 'rs-ops-12',
      title: 'Deref for Smart Pointer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Implement Deref for a custom smart pointer.',
      skeleton: `use std::ops::Deref;

struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(val: T) -> Self { MyBox(val) }
}

// TODO: implement Deref for MyBox<T>`,
      solution: `use std::ops::Deref;

struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(val: T) -> Self { MyBox(val) }
}

impl<T> Deref for MyBox<T> {
    type Target = T;
    fn deref(&self) -> &T {
        &self.0
    }
}`,
      hints: [
        'Deref has an associated type Target.',
        'deref returns a reference to the inner value.',
        'This enables *my_box and auto-deref coercion.',
      ],
      concepts: ['Deref', 'Target', 'smart-pointer', 'auto-deref'],
    },
    {
      id: 'rs-ops-13',
      title: 'Bug: Wrong Output Type',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix an Add implementation that returns the wrong Output type.',
      skeleton: `use std::ops::Add;

struct Inches(f64);

impl Add for Inches {
    type Output = f64;
    fn add(self, rhs: Inches) -> Inches {
        Inches(self.0 + rhs.0)
    }
}`,
      solution: `use std::ops::Add;

struct Inches(f64);

impl Add for Inches {
    type Output = Inches;
    fn add(self, rhs: Inches) -> Inches {
        Inches(self.0 + rhs.0)
    }
}`,
      hints: [
        'Output type must match the actual return type.',
        'The function returns Inches, not f64.',
        'Change type Output = f64 to type Output = Inches.',
      ],
      concepts: ['Add', 'Output', 'type-mismatch'],
    },
    {
      id: 'rs-ops-14',
      title: 'Bug: PartialEq Asymmetry',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a PartialEq implementation that compares wrong fields.',
      skeleton: `#[derive(Debug)]
struct Rect { width: u32, height: u32 }

impl PartialEq for Rect {
    fn eq(&self, other: &Self) -> bool {
        self.width == other.height && self.height == other.width
    }
}

fn main() {
    let a = Rect { width: 3, height: 4 };
    let b = Rect { width: 3, height: 4 };
    println!("{}", a == b); // should be true but is false!
}`,
      solution: `#[derive(Debug)]
struct Rect { width: u32, height: u32 }

impl PartialEq for Rect {
    fn eq(&self, other: &Self) -> bool {
        self.width == other.width && self.height == other.height
    }
}

fn main() {
    let a = Rect { width: 3, height: 4 };
    let b = Rect { width: 3, height: 4 };
    println!("{}", a == b);
}`,
      hints: [
        'The comparison mixes up width and height.',
        'Compare width to width and height to height.',
        'Fix the field references in the comparison.',
      ],
      concepts: ['PartialEq', 'field-comparison', 'equality'],
    },
    {
      id: 'rs-ops-15',
      title: 'Bug: Missing Trait Import',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix code that uses operator overloading without importing the trait.',
      skeleton: `struct Vec2 { x: f64, y: f64 }

impl Add for Vec2 {
    type Output = Vec2;
    fn add(self, rhs: Vec2) -> Vec2 {
        Vec2 { x: self.x + rhs.x, y: self.y + rhs.y }
    }
}

fn main() {
    let r = Vec2 { x: 1.0, y: 2.0 } + Vec2 { x: 3.0, y: 4.0 };
}`,
      solution: `use std::ops::Add;

struct Vec2 { x: f64, y: f64 }

impl Add for Vec2 {
    type Output = Vec2;
    fn add(self, rhs: Vec2) -> Vec2 {
        Vec2 { x: self.x + rhs.x, y: self.y + rhs.y }
    }
}

fn main() {
    let r = Vec2 { x: 1.0, y: 2.0 } + Vec2 { x: 3.0, y: 4.0 };
}`,
      hints: [
        'The Add trait must be imported from std::ops.',
        'Add use std::ops::Add; at the top.',
        'Operator traits are not in the prelude.',
      ],
      concepts: ['use', 'import', 'std::ops', 'Add'],
    },
    {
      id: 'rs-ops-16',
      title: 'Predict: Add Result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the result of custom addition.',
      skeleton: `use std::ops::Add;

#[derive(Debug)]
struct Meters(f64);

impl Add for Meters {
    type Output = Meters;
    fn add(self, rhs: Meters) -> Meters { Meters(self.0 + rhs.0) }
}

fn main() {
    let d = Meters(1.5) + Meters(2.3);
    println!("{:.1}", d.0);
}`,
      solution: `3.8`,
      hints: [
        '1.5 + 2.3 = 3.8.',
        'The Add impl adds the inner f64 values.',
        'Formatted with {:.1} shows one decimal place.',
      ],
      concepts: ['Add', 'operator-result', 'formatting'],
    },
    {
      id: 'rs-ops-17',
      title: 'Predict: Neg Operator',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the output of negating a custom type.',
      skeleton: `use std::ops::Neg;

#[derive(Debug)]
struct Temp(f64);

impl Neg for Temp {
    type Output = Temp;
    fn neg(self) -> Temp { Temp(-self.0) }
}

fn main() {
    let t = -Temp(25.0);
    println!("{:.0}", t.0);
}`,
      solution: `-25`,
      hints: [
        '-Temp(25.0) negates the inner value.',
        '-25.0 formatted with {:.0} is -25.',
        'The Neg impl returns Temp(-self.0).',
      ],
      concepts: ['Neg', 'unary', 'negation'],
    },
    {
      id: 'rs-ops-18',
      title: 'Predict: Comparison Chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the result of comparison operators on a custom type.',
      skeleton: `#[derive(Debug, PartialEq, PartialOrd)]
struct Score(u32);

fn main() {
    let a = Score(85);
    let b = Score(90);
    let c = Score(85);
    println!("{}", a < b);
    println!("{}", a == c);
    println!("{}", b > c);
}`,
      solution: `true
true
true`,
      hints: [
        'Derived PartialOrd compares field by field.',
        '85 < 90 is true, 85 == 85 is true, 90 > 85 is true.',
        'All three comparisons are true.',
      ],
      concepts: ['PartialEq', 'PartialOrd', 'derive', 'comparison'],
    },
    {
      id: 'rs-ops-19',
      title: 'Refactor: Manual Eq to Derive',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Replace manual PartialEq and Debug implementations with derive.',
      skeleton: `struct Point { x: i32, y: i32 }

impl PartialEq for Point {
    fn eq(&self, other: &Self) -> bool {
        self.x == other.x && self.y == other.y
    }
}

impl std::fmt::Debug for Point {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("Point")
            .field("x", &self.x)
            .field("y", &self.y)
            .finish()
    }
}

fn main() {
    let a = Point { x: 1, y: 2 };
    let b = Point { x: 1, y: 2 };
    println!("{:?} == {:?}: {}", a, b, a == b);
}`,
      solution: `#[derive(Debug, PartialEq)]
struct Point { x: i32, y: i32 }

fn main() {
    let a = Point { x: 1, y: 2 };
    let b = Point { x: 1, y: 2 };
    println!("{:?} == {:?}: {}", a, b, a == b);
}`,
      hints: [
        'When the manual impl matches the default behavior, use derive.',
        '#[derive(Debug, PartialEq)] generates both automatically.',
        'This reduces boilerplate and potential bugs.',
      ],
      concepts: ['derive', 'PartialEq', 'Debug', 'refactor'],
    },
    {
      id: 'rs-ops-20',
      title: 'Refactor: Separate Types for Type Safety',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Use operator overloading with newtypes to prevent mixing units.',
      skeleton: `fn calculate_area(width: f64, height: f64) -> f64 {
    width * height
}

fn main() {
    let meters = 5.0;
    let feet = 10.0;
    // BUG: accidentally mixing units!
    let area = calculate_area(meters, feet);
    println!("{area}");
}`,
      solution: `use std::ops::Mul;

#[derive(Debug, Clone, Copy)]
struct Meters(f64);

#[derive(Debug)]
struct SquareMeters(f64);

impl Mul for Meters {
    type Output = SquareMeters;
    fn mul(self, rhs: Meters) -> SquareMeters {
        SquareMeters(self.0 * rhs.0)
    }
}

fn main() {
    let width = Meters(5.0);
    let height = Meters(10.0);
    let area = width * height;
    println!("{:.1}", area.0);
}`,
      hints: [
        'Wrap f64 in newtype structs for different units.',
        'Meters * Meters = SquareMeters via Mul.',
        'The compiler prevents mixing Meters with Feet.',
      ],
      concepts: ['newtype', 'type-safety', 'Mul', 'unit-types'],
    },
  ],
};
