import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-methods',
  title: '11. Methods & impl Blocks',
  explanation: `## Methods & impl Blocks

Methods are functions attached to a type via \`impl\` blocks.

### Self Receivers
- \`&self\` -- immutable borrow (most common)
- \`&mut self\` -- mutable borrow
- \`self\` -- takes ownership (consumes)

### Associated Functions
Functions without \`self\` are called with \`::\` syntax:
\`\`\`rust
impl Circle {
    fn new(radius: f64) -> Circle { Circle { radius } }
    fn area(&self) -> f64 { std::f64::consts::PI * self.radius * self.radius }
}
let c = Circle::new(5.0);
\`\`\`

### Method Chaining
Methods that return \`Self\` (or \`&mut Self\`) enable chaining:
\`\`\`rust
builder.name("test").port(8080).build()
\`\`\`

### Multiple impl Blocks
A type can have multiple impl blocks (useful for conditional compilation or trait impls).
`,
  exercises: [
    {
      id: 'rs-method-1',
      title: 'Immutable Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Complete the method signature with the correct self receiver.',
      skeleton: `struct Circle { radius: f64 }

impl Circle {
    fn area(__BLANK__) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }
}`,
      solution: `struct Circle { radius: f64 }

impl Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }
}`,
      hints: [
        'The method reads self but does not modify it.',
        'Use an immutable borrow of self.',
        'Use `&self`.',
      ],
      concepts: ['&self', 'method', 'impl block'],
    },
    {
      id: 'rs-method-2',
      title: 'Mutable Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use the correct self receiver for a mutating method.',
      skeleton: `struct Counter { value: i32 }

impl Counter {
    fn increment(__BLANK__) {
        self.value += 1;
    }
}`,
      solution: `struct Counter { value: i32 }

impl Counter {
    fn increment(&mut self) {
        self.value += 1;
    }
}`,
      hints: [
        'The method modifies self.value.',
        'It needs a mutable borrow of self.',
        'Use `&mut self`.',
      ],
      concepts: ['&mut self', 'mutable method'],
    },
    {
      id: 'rs-method-3',
      title: 'Associated Function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Define an associated function (no self) as a constructor.',
      skeleton: `struct Point { x: f64, y: f64 }

impl Point {
    fn origin() -> __BLANK__ {
        Point { x: 0.0, y: 0.0 }
    }
}

let p = Point::origin();`,
      solution: `struct Point { x: f64, y: f64 }

impl Point {
    fn origin() -> Point {
        Point { x: 0.0, y: 0.0 }
    }
}

let p = Point::origin();`,
      hints: [
        'Associated functions do not take self.',
        'They return an instance of the type.',
        'Return type is `Point`.',
      ],
      concepts: ['associated function', 'constructor', '::'],
    },
    {
      id: 'rs-method-4',
      title: 'Consuming Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a method that consumes self (takes ownership).',
      skeleton: `struct Wrapper(String);

impl Wrapper {
    fn into_inner(__BLANK__) -> String {
        self.0
    }
}`,
      solution: `struct Wrapper(String);

impl Wrapper {
    fn into_inner(self) -> String {
        self.0
    }
}`,
      hints: [
        'The method needs to take ownership to return the inner value.',
        'Use self by value (not &self or &mut self).',
        'Use `self` as the receiver.',
      ],
      concepts: ['self', 'consuming method', 'into_inner'],
    },
    {
      id: 'rs-method-5',
      title: 'Method Chaining Return',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Return &mut Self to enable method chaining.',
      skeleton: `struct Builder { name: String, port: u16 }

impl Builder {
    fn new() -> Self { Builder { name: String::new(), port: 0 } }

    fn name(&mut self, n: &str) -> __BLANK__ {
        self.name = String::from(n);
        self
    }
}`,
      solution: `struct Builder { name: String, port: u16 }

impl Builder {
    fn new() -> Self { Builder { name: String::new(), port: 0 } }

    fn name(&mut self, n: &str) -> &mut Self {
        self.name = String::from(n);
        self
    }
}`,
      hints: [
        'To chain methods, return a reference to self.',
        'Since the method takes &mut self, return &mut Self.',
        'Use `&mut Self`.',
      ],
      concepts: ['method chaining', '&mut Self', 'builder pattern'],
    },
    {
      id: 'rs-method-6',
      title: 'Self Type Alias',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use Self as a type alias in the impl block.',
      skeleton: `struct Meter(f64);

impl Meter {
    fn double(&self) -> __BLANK__ {
        Meter(self.0 * 2.0)
    }
}`,
      solution: `struct Meter(f64);

impl Meter {
    fn double(&self) -> Self {
        Meter(self.0 * 2.0)
    }
}`,
      hints: [
        'Inside an impl block, Self refers to the implementing type.',
        'It is equivalent to Meter here.',
        'Use `Self`.',
      ],
      concepts: ['Self', 'type alias', 'impl'],
    },
    {
      id: 'rs-method-7',
      title: 'Stack with Methods',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a Stack<i32> struct wrapping Vec<i32> with new(), push(&mut self, i32), pop(&mut self) -> Option<i32>, and is_empty(&self) -> bool.',
      skeleton: `// Write your struct and impl here`,
      solution: `struct Stack {
    items: Vec<i32>,
}

impl Stack {
    fn new() -> Self {
        Stack { items: Vec::new() }
    }

    fn push(&mut self, val: i32) {
        self.items.push(val);
    }

    fn pop(&mut self) -> Option<i32> {
        self.items.pop()
    }

    fn is_empty(&self) -> bool {
        self.items.is_empty()
    }
}`,
      hints: [
        'Wrap a Vec<i32> in a struct.',
        'Delegate to Vec methods internally.',
        'Use &mut self for push/pop, &self for is_empty.',
      ],
      concepts: ['wrapper type', 'delegation', 'methods'],
    },
    {
      id: 'rs-method-8',
      title: 'Rectangle Methods',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Implement area(&self) -> f64, perimeter(&self) -> f64, and is_square(&self) -> bool for Rectangle { width: f64, height: f64 }.',
      skeleton: `struct Rectangle { width: f64, height: f64 }

// Write your impl here`,
      solution: `struct Rectangle { width: f64, height: f64 }

impl Rectangle {
    fn area(&self) -> f64 {
        self.width * self.height
    }

    fn perimeter(&self) -> f64 {
        2.0 * (self.width + self.height)
    }

    fn is_square(&self) -> bool {
        (self.width - self.height).abs() < f64::EPSILON
    }
}`,
      hints: [
        'Area = width * height.',
        'Perimeter = 2 * (width + height).',
        'A square has equal width and height (compare with f64::EPSILON).',
      ],
      concepts: ['methods', '&self', 'f64 comparison'],
    },
    {
      id: 'rs-method-9',
      title: 'Chainable Vec Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a VecBuilder that has add(self, i32) -> Self consuming builder pattern, and build(self) -> Vec<i32>.',
      skeleton: `// Write your struct and impl here`,
      solution: `struct VecBuilder {
    items: Vec<i32>,
}

impl VecBuilder {
    fn new() -> Self {
        VecBuilder { items: Vec::new() }
    }

    fn add(mut self, val: i32) -> Self {
        self.items.push(val);
        self
    }

    fn build(self) -> Vec<i32> {
        self.items
    }
}`,
      hints: [
        'The consuming builder takes self by value and returns Self.',
        'add moves self in, modifies it, and returns it.',
        'build consumes self and returns the inner Vec.',
      ],
      concepts: ['consuming builder', 'self by value', 'method chaining'],
    },
    {
      id: 'rs-method-10',
      title: 'BankAccount',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create BankAccount { balance: f64 } with new(balance), deposit(&mut self, f64), withdraw(&mut self, f64) -> Result<(), String>, and balance(&self) -> f64.',
      skeleton: `// Write your struct and impl here`,
      solution: `struct BankAccount {
    balance: f64,
}

impl BankAccount {
    fn new(balance: f64) -> Self {
        BankAccount { balance }
    }

    fn deposit(&mut self, amount: f64) {
        self.balance += amount;
    }

    fn withdraw(&mut self, amount: f64) -> Result<(), String> {
        if amount > self.balance {
            Err(String::from("Insufficient funds"))
        } else {
            self.balance -= amount;
            Ok(())
        }
    }

    fn balance(&self) -> f64 {
        self.balance
    }
}`,
      hints: [
        'deposit adds to balance, withdraw subtracts if sufficient.',
        'withdraw returns Result to indicate success or failure.',
        'balance() is a getter with &self.',
      ],
      concepts: ['methods', 'Result', 'encapsulation'],
    },
    {
      id: 'rs-method-11',
      title: 'Matrix Transpose',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Create Matrix([[f64; 2]; 2]) and implement transpose(&self) -> Self that returns the transposed 2x2 matrix.',
      skeleton: `// Write your struct and impl here`,
      solution: `struct Matrix([[f64; 2]; 2]);

impl Matrix {
    fn transpose(&self) -> Self {
        Matrix([
            [self.0[0][0], self.0[1][0]],
            [self.0[0][1], self.0[1][1]],
        ])
    }
}`,
      hints: [
        'A 2x2 transpose swaps rows and columns.',
        'Element [i][j] becomes [j][i].',
        'Return a new Matrix with swapped positions.',
      ],
      concepts: ['matrix', 'transpose', 'array', 'method'],
    },
    {
      id: 'rs-method-12',
      title: 'String Statistics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create TextStats { text: String } with word_count(&self) -> usize, char_count(&self) -> usize, and line_count(&self) -> usize.',
      skeleton: `// Write your struct and impl here`,
      solution: `struct TextStats {
    text: String,
}

impl TextStats {
    fn new(text: &str) -> Self {
        TextStats { text: String::from(text) }
    }

    fn word_count(&self) -> usize {
        self.text.split_whitespace().count()
    }

    fn char_count(&self) -> usize {
        self.text.chars().count()
    }

    fn line_count(&self) -> usize {
        self.text.lines().count()
    }
}`,
      hints: [
        'Use split_whitespace().count() for words.',
        'Use chars().count() for characters.',
        'Use lines().count() for lines.',
      ],
      concepts: ['string methods', 'split_whitespace', 'lines', 'chars'],
    },
    {
      id: 'rs-method-13',
      title: 'Fix: Wrong Self Receiver',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This method tries to modify self but uses an immutable receiver. Fix it.',
      skeleton: `struct Score { value: u32 }

impl Score {
    fn add_points(&self, points: u32) {
        self.value += points;
    }
}`,
      solution: `struct Score { value: u32 }

impl Score {
    fn add_points(&mut self, points: u32) {
        self.value += points;
    }
}`,
      hints: [
        '&self is immutable -- you cannot modify fields.',
        'To modify self.value, you need a mutable borrow.',
        'Change `&self` to `&mut self`.',
      ],
      concepts: ['&self vs &mut self', 'immutable receiver'],
    },
    {
      id: 'rs-method-14',
      title: 'Fix: Use After Consuming',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'The consuming method moves self, but the caller still uses the original. Fix it.',
      skeleton: `struct Wrapper(String);

impl Wrapper {
    fn get_inner(self) -> String {
        self.0
    }
}

fn main() {
    let w = Wrapper(String::from("hello"));
    let inner = w.get_inner();
    println!("{:?}", w);
}`,
      solution: `struct Wrapper(String);

impl Wrapper {
    fn get_inner(&self) -> &str {
        &self.0
    }
}

fn main() {
    let w = Wrapper(String::from("hello"));
    let inner = w.get_inner();
    println!("{}", inner);
}`,
      hints: [
        'get_inner(self) consumes w, making it unusable after.',
        'Change to &self and return &str instead.',
        'Borrow rather than consume.',
      ],
      concepts: ['consuming vs borrowing', '&self', 'lifetime'],
    },
    {
      id: 'rs-method-15',
      title: 'Fix: Missing Self in Associated Fn',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This function is called with dot syntax but has no self parameter. Fix it.',
      skeleton: `struct Greeter;

impl Greeter {
    fn hello() -> String {
        String::from("Hello!")
    }
}

fn main() {
    let g = Greeter;
    println!("{}", g.hello());
}`,
      solution: `struct Greeter;

impl Greeter {
    fn hello() -> String {
        String::from("Hello!")
    }
}

fn main() {
    println!("{}", Greeter::hello());
}`,
      hints: [
        'Functions without self are associated functions, not methods.',
        'They are called with :: syntax, not dot syntax.',
        'Use `Greeter::hello()` instead of `g.hello()`.',
      ],
      concepts: ['associated function', ':: vs .', 'method vs function'],
    },
    {
      id: 'rs-method-16',
      title: 'Predict: Method Call Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `struct Val(i32);

impl Val {
    fn add(self, n: i32) -> Self { Val(self.0 + n) }
    fn mul(self, n: i32) -> Self { Val(self.0 * n) }
    fn get(self) -> i32 { self.0 }
}

fn main() {
    println!("{}", Val(2).add(3).mul(4).get());
}`,
      solution: `20`,
      hints: [
        'Val(2).add(3) = Val(5).',
        'Val(5).mul(4) = Val(20).',
        '.get() returns 20.',
      ],
      concepts: ['method chaining', 'consuming self'],
    },
    {
      id: 'rs-method-17',
      title: 'Predict: Multiple impl Blocks',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `struct Num(i32);

impl Num {
    fn double(&self) -> i32 { self.0 * 2 }
}

impl Num {
    fn triple(&self) -> i32 { self.0 * 3 }
}

fn main() {
    let n = Num(5);
    println!("{} {}", n.double(), n.triple());
}`,
      solution: `10 15`,
      hints: [
        'Multiple impl blocks for the same type are valid.',
        'double: 5 * 2 = 10.',
        'triple: 5 * 3 = 15.',
      ],
      concepts: ['multiple impl blocks', 'methods'],
    },
    {
      id: 'rs-method-18',
      title: 'Predict: Self Type',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `struct Pair(i32, i32);

impl Pair {
    fn sum(&self) -> i32 { self.0 + self.1 }
    fn swap(self) -> Self { Pair(self.1, self.0) }
}

fn main() {
    let p = Pair(3, 7);
    let q = p.swap();
    println!("{}", q.sum());
}`,
      solution: `10`,
      hints: [
        'p.swap() creates Pair(7, 3).',
        'q.sum() = 7 + 3 = 10.',
        'swap consumed p, so q owns the new Pair.',
      ],
      concepts: ['swap', 'consuming method', 'sum'],
    },
    {
      id: 'rs-method-19',
      title: 'Refactor: Functions to Methods',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Convert these standalone functions into methods on the struct.',
      skeleton: `struct Circle { radius: f64 }

fn circle_area(c: &Circle) -> f64 {
    std::f64::consts::PI * c.radius * c.radius
}

fn circle_circumference(c: &Circle) -> f64 {
    2.0 * std::f64::consts::PI * c.radius
}`,
      solution: `struct Circle { radius: f64 }

impl Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }

    fn circumference(&self) -> f64 {
        2.0 * std::f64::consts::PI * self.radius
    }
}`,
      hints: [
        'Move functions into an impl block.',
        'Replace the parameter with &self.',
        'Replace c.radius with self.radius.',
      ],
      concepts: ['methods vs functions', 'impl', 'refactoring'],
    },
    {
      id: 'rs-method-20',
      title: 'Refactor: Getter/Setter Pattern',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Add getter and setter methods to encapsulate the struct fields, making them private.',
      skeleton: `pub struct Config {
    pub host: String,
    pub port: u16,
}

fn main() {
    let mut c = Config { host: String::from("localhost"), port: 8080 };
    c.port = 3000;
    println!("{}:{}", c.host, c.port);
}`,
      solution: `pub struct Config {
    host: String,
    port: u16,
}

impl Config {
    pub fn new(host: String, port: u16) -> Self {
        Config { host, port }
    }

    pub fn host(&self) -> &str {
        &self.host
    }

    pub fn port(&self) -> u16 {
        self.port
    }

    pub fn set_port(&mut self, port: u16) {
        self.port = port;
    }
}

fn main() {
    let mut c = Config::new(String::from("localhost"), 8080);
    c.set_port(3000);
    println!("{}:{}", c.host(), c.port());
}`,
      hints: [
        'Make fields private (remove pub from fields).',
        'Add getter methods returning borrowed or copied values.',
        'Add setter methods with &mut self.',
      ],
      concepts: ['encapsulation', 'getters/setters', 'private fields'],
    },
  ],
};
