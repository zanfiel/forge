import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-dmacro',
  title: '29. Declarative Macros',
  explanation: `## Declarative Macros

\`macro_rules!\` lets you write pattern-matching code generators.

### Basic Macro
\`\`\`rust
macro_rules! say_hello {
    () => { println!("Hello!") };
}
say_hello!(); // prints "Hello!"
\`\`\`

### With Arguments
\`\`\`rust
macro_rules! greet {
    ($name:expr) => { println!("Hello, {}!", $name) };
}
greet!("Rust"); // Hello, Rust!
\`\`\`

### Fragment Specifiers
- \`expr\` -- expression: \`1 + 2\`, \`foo()\`
- \`ident\` -- identifier: \`x\`, \`my_func\`
- \`ty\` -- type: \`i32\`, \`Vec<u8>\`
- \`tt\` -- token tree: any single token or \`(...)\`/\`[...]\`/\`{...}\`
- \`block\` -- block expression: \`{ ... }\`
- \`stmt\` -- statement
- \`pat\` -- pattern
- \`literal\` -- literal value

### Repetition
\`\`\`rust
macro_rules! vec_of {
    ( $( $x:expr ),* ) => {
        {
            let mut v = Vec::new();
            $( v.push($x); )*
            v
        }
    };
}
let v = vec_of![1, 2, 3]; // Vec [1, 2, 3]
\`\`\`

### Multiple Arms
\`\`\`rust
macro_rules! calc {
    (add $a:expr, $b:expr) => { $a + $b };
    (mul $a:expr, $b:expr) => { $a * $b };
}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-dmacro-1',
      title: 'Basic Macro',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Define a simple macro that prints a greeting.',
      skeleton: `__BLANK__! say_hi {
    () => {
        println!("Hi!");
    };
}

fn main() {
    say_hi!();
}`,
      solution: `macro_rules! say_hi {
    () => {
        println!("Hi!");
    };
}

fn main() {
    say_hi!();
}`,
      hints: [
        'Declarative macros are defined with macro_rules!.',
        'The syntax is macro_rules! name { patterns }.',
        'The answer is macro_rules.',
      ],
      concepts: ['macro_rules', 'declarative-macro'],
    },
    {
      id: 'rs-dmacro-2',
      title: 'Expression Argument',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Define a macro that takes an expression argument.',
      skeleton: `macro_rules! double {
    ($val:__BLANK__) => {
        $val * 2
    };
}

fn main() {
    println!("{}", double!(5));
}`,
      solution: `macro_rules! double {
    ($val:expr) => {
        $val * 2
    };
}

fn main() {
    println!("{}", double!(5));
}`,
      hints: [
        'Fragment specifiers tell the macro what kind of syntax to expect.',
        'expr matches any Rust expression.',
        'The answer is expr.',
      ],
      concepts: ['fragment-specifier', 'expr', 'macro-argument'],
    },
    {
      id: 'rs-dmacro-3',
      title: 'Identifier Specifier',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use the ident specifier to generate a function with a given name.',
      skeleton: `macro_rules! make_fn {
    ($name:__BLANK__) => {
        fn $name() -> &'static str {
            stringify!($name)
        }
    };
}

make_fn!(hello);

fn main() {
    println!("{}", hello());
}`,
      solution: `macro_rules! make_fn {
    ($name:ident) => {
        fn $name() -> &'static str {
            stringify!($name)
        }
    };
}

make_fn!(hello);

fn main() {
    println!("{}", hello());
}`,
      hints: [
        'ident matches an identifier (variable/function name).',
        'The macro uses $name as a function name.',
        'The answer is ident.',
      ],
      concepts: ['ident', 'code-generation', 'stringify'],
    },
    {
      id: 'rs-dmacro-4',
      title: 'Repetition Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use repetition to accept multiple arguments.',
      skeleton: `macro_rules! sum {
    ( $( $x:expr ),* ) => {
        {
            let mut total = 0;
            __BLANK__( total += $x; )*
            total
        }
    };
}

fn main() {
    println!("{}", sum!(1, 2, 3, 4));
}`,
      solution: `macro_rules! sum {
    ( $( $x:expr ),* ) => {
        {
            let mut total = 0;
            $( total += $x; )*
            total
        }
    };
}

fn main() {
    println!("{}", sum!(1, 2, 3, 4));
}`,
      hints: [
        'In the expansion, $(...) * repeats for each matched item.',
        'The repetition syntax mirrors the pattern.',
        'The answer is $.',
      ],
      concepts: ['repetition', 'variadic-macro', 'expansion'],
    },
    {
      id: 'rs-dmacro-5',
      title: 'Multiple Arms',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Add a second arm to a macro for multiplication.',
      skeleton: `macro_rules! calc {
    (add $a:expr, $b:expr) => { $a + $b };
    (__BLANK__ $a:expr, $b:expr) => { $a * $b };
}

fn main() {
    println!("{}", calc!(add 2, 3));
    println!("{}", calc!(mul 2, 3));
}`,
      solution: `macro_rules! calc {
    (add $a:expr, $b:expr) => { $a + $b };
    (mul $a:expr, $b:expr) => { $a * $b };
}

fn main() {
    println!("{}", calc!(add 2, 3));
    println!("{}", calc!(mul 2, 3));
}`,
      hints: [
        'Macros can have multiple pattern arms separated by ;.',
        'Each arm starts with a different keyword to distinguish.',
        'The answer is mul.',
      ],
      concepts: ['multiple-arms', 'pattern-matching', 'macro-dispatch'],
    },
    {
      id: 'rs-dmacro-6',
      title: 'Type Specifier',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use the ty specifier to generate a struct with a given field type.',
      skeleton: `macro_rules! make_wrapper {
    ($name:ident, $t:__BLANK__) => {
        struct $name {
            value: $t,
        }
    };
}

make_wrapper!(IntBox, i32);

fn main() {
    let b = IntBox { value: 42 };
    println!("{}", b.value);
}`,
      solution: `macro_rules! make_wrapper {
    ($name:ident, $t:ty) => {
        struct $name {
            value: $t,
        }
    };
}

make_wrapper!(IntBox, i32);

fn main() {
    let b = IntBox { value: 42 };
    println!("{}", b.value);
}`,
      hints: [
        'ty matches a Rust type (i32, Vec<u8>, etc.).',
        'It is used when the macro needs to accept a type parameter.',
        'The answer is ty.',
      ],
      concepts: ['ty', 'type-specifier', 'code-generation'],
    },
    {
      id: 'rs-dmacro-7',
      title: 'Custom vec! Macro',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Implement a my_vec! macro that works like the standard vec! macro.',
      skeleton: `// Implement my_vec! that creates a Vec from comma-separated values
// my_vec![1, 2, 3] should produce vec![1, 2, 3]
// TODO: define macro_rules! my_vec`,
      solution: `macro_rules! my_vec {
    ( $( $x:expr ),* ) => {
        {
            let mut v = Vec::new();
            $( v.push($x); )*
            v
        }
    };
}`,
      hints: [
        'Use $( $x:expr ),* to match comma-separated expressions.',
        'In the expansion, push each element.',
        'Wrap in a block to return the Vec.',
      ],
      concepts: ['macro_rules', 'repetition', 'vec'],
    },
    {
      id: 'rs-dmacro-8',
      title: 'HashMap Macro',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a hashmap! macro for concise HashMap creation.',
      skeleton: `use std::collections::HashMap;

// Implement hashmap! macro:
// hashmap!{ "a" => 1, "b" => 2 } creates a HashMap
// TODO: define macro_rules! hashmap`,
      solution: `use std::collections::HashMap;

macro_rules! hashmap {
    ( $( $key:expr => $val:expr ),* $(,)? ) => {
        {
            let mut map = HashMap::new();
            $( map.insert($key, $val); )*
            map
        }
    };
}`,
      hints: [
        'Match key => value pairs with repetition.',
        'Use $key:expr => $val:expr as the pattern.',
        'Add $(,)? to optionally allow a trailing comma.',
      ],
      concepts: ['macro_rules', 'HashMap', 'repetition', 'trailing-comma'],
    },
    {
      id: 'rs-dmacro-9',
      title: 'Macro with Separator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a macro that joins string expressions with a separator.',
      skeleton: `// join!("a", "b", "c") should return "a-b-c"
// TODO: define macro_rules! join`,
      solution: `macro_rules! join {
    ( $first:expr $(, $rest:expr )* ) => {
        {
            let mut s = String::from($first);
            $( s.push('-'); s.push_str($rest); )*
            s
        }
    };
}`,
      hints: [
        'Match the first element separately, then repeat for the rest.',
        'Push a separator before each additional element.',
        'Return the accumulated String.',
      ],
      concepts: ['macro_rules', 'repetition', 'string-joining'],
    },
    {
      id: 'rs-dmacro-10',
      title: 'Recursive Macro',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a recursive macro that counts the number of arguments.',
      skeleton: `// count!(a, b, c) should expand to 3usize
// TODO: define macro_rules! count`,
      solution: `macro_rules! count {
    () => { 0usize };
    ($x:tt) => { 1usize };
    ($x:tt, $($rest:tt),*) => { 1usize + count!($($rest),*) };
}`,
      hints: [
        'Use tt (token tree) as the most flexible specifier.',
        'Base case: empty input returns 0.',
        'Recursive case: 1 + count of the rest.',
      ],
      concepts: ['recursive-macro', 'tt', 'counting'],
    },
    {
      id: 'rs-dmacro-11',
      title: 'Enum Dispatch Macro',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a macro that generates an enum and a Display impl from variant names.',
      skeleton: `// make_enum!(Color: Red, Green, Blue) generates:
// enum Color { Red, Green, Blue }
// impl Display for Color printing the variant name
// TODO: define macro_rules! make_enum`,
      solution: `macro_rules! make_enum {
    ($name:ident : $( $variant:ident ),* $(,)?) => {
        #[derive(Debug)]
        enum $name {
            $( $variant, )*
        }

        impl std::fmt::Display for $name {
            fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
                match self {
                    $( $name::$variant => write!(f, stringify!($variant)), )*
                }
            }
        }
    };
}`,
      hints: [
        'Match the enum name as ident, variants as repeated idents.',
        'Generate the enum definition and a Display impl.',
        'Use stringify! to convert variant idents to strings.',
      ],
      concepts: ['macro_rules', 'enum-generation', 'Display', 'stringify'],
    },
    {
      id: 'rs-dmacro-12',
      title: 'Builder Macro',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write a macro that generates setter methods for struct fields.',
      skeleton: `// Given struct Config { port: u16, host: String }
// generate set_port and set_host methods
// TODO: define the macro and struct`,
      solution: `macro_rules! builder_methods {
    ($struct_name:ident { $( $field:ident : $ty:ty ),* $(,)? }) => {
        struct $struct_name {
            $( $field: $ty, )*
        }

        impl $struct_name {
            $(
                fn $field(mut self, val: $ty) -> Self {
                    self.$field = val;
                    self
                }
            )*
        }
    };
}

builder_methods!(Config {
    port: u16,
    host: String,
});`,
      hints: [
        'Match field name and type pairs in the pattern.',
        'Generate a method for each field that takes self and returns Self.',
        'Each method sets the field and returns self for chaining.',
      ],
      concepts: ['macro_rules', 'builder-pattern', 'code-generation'],
    },
    {
      id: 'rs-dmacro-13',
      title: 'Bug: Missing Semicolon in Arms',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix the macro that has a missing semicolon between arms.',
      skeleton: `macro_rules! pick {
    (first $a:expr, $b:expr) => { $a }
    (second $a:expr, $b:expr) => { $b };
}

fn main() {
    println!("{}", pick!(first 10, 20));
}`,
      solution: `macro_rules! pick {
    (first $a:expr, $b:expr) => { $a };
    (second $a:expr, $b:expr) => { $b };
}

fn main() {
    println!("{}", pick!(first 10, 20));
}`,
      hints: [
        'Each macro arm must end with a semicolon.',
        'The first arm is missing its semicolon.',
        'Add ; after { $a } in the first arm.',
      ],
      concepts: ['macro-syntax', 'semicolons', 'arms'],
    },
    {
      id: 'rs-dmacro-14',
      title: 'Bug: Wrong Fragment Specifier',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the macro that uses the wrong fragment specifier for a function name.',
      skeleton: `macro_rules! make_getter {
    ($name:expr, $val:expr) => {
        fn $name() -> i32 {
            $val
        }
    };
}

make_getter!(get_value, 42);

fn main() {
    println!("{}", get_value());
}`,
      solution: `macro_rules! make_getter {
    ($name:ident, $val:expr) => {
        fn $name() -> i32 {
            $val
        }
    };
}

make_getter!(get_value, 42);

fn main() {
    println!("{}", get_value());
}`,
      hints: [
        'Function names are identifiers, not expressions.',
        'Use ident for things that will be used as names.',
        'Change $name:expr to $name:ident.',
      ],
      concepts: ['fragment-specifier', 'ident', 'expr'],
    },
    {
      id: 'rs-dmacro-15',
      title: 'Bug: Missing Repetition in Expansion',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the macro expansion that forgets to repeat the matched elements.',
      skeleton: `macro_rules! print_all {
    ( $( $x:expr ),* ) => {
        println!("{}", $x);
    };
}

fn main() {
    print_all!(1, 2, 3);
}`,
      solution: `macro_rules! print_all {
    ( $( $x:expr ),* ) => {
        $( println!("{}", $x); )*
    };
}

fn main() {
    print_all!(1, 2, 3);
}`,
      hints: [
        'When you match with $(...),* you must expand with $(...)*.',
        'Wrap the println! in $( ... )* to repeat it.',
        'Each matched $x needs to be expanded in a repetition block.',
      ],
      concepts: ['repetition', 'expansion', 'macro-rules'],
    },
    {
      id: 'rs-dmacro-16',
      title: 'Predict: Simple Macro Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the output of a simple macro expansion.',
      skeleton: `macro_rules! triple {
    ($x:expr) => { $x * 3 };
}

fn main() {
    let val = triple!(4 + 1);
    println!("{val}");
}`,
      solution: `7`,
      hints: [
        'Macros do textual substitution: 4 + 1 * 3.',
        'Due to operator precedence, this is 4 + (1 * 3) = 4 + 3.',
        'The result is 7, not 15.',
      ],
      concepts: ['macro-hygiene', 'operator-precedence', 'substitution'],
    },
    {
      id: 'rs-dmacro-17',
      title: 'Predict: Repetition Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of a macro with repetition.',
      skeleton: `macro_rules! count_args {
    () => { 0 };
    ($x:tt) => { 1 };
    ($x:tt, $($rest:tt),+) => { 1 + count_args!($($rest),+) };
}

fn main() {
    println!("{}", count_args!(a, b, c, d));
}`,
      solution: `4`,
      hints: [
        'The macro recursively counts token trees.',
        'a,b,c,d: 1 + count(b,c,d) = 1 + 1 + count(c,d) = ...',
        'Total: 4.',
      ],
      concepts: ['recursive-macro', 'counting', 'tt'],
    },
    {
      id: 'rs-dmacro-18',
      title: 'Predict: Macro Hygiene',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Predict behavior related to macro hygiene.',
      skeleton: `macro_rules! make_x {
    ($val:expr) => {
        let x = $val;
    };
}

fn main() {
    make_x!(42);
    // x is visible due to macro expansion in same scope
    println!("{x}");
}`,
      solution: `42`,
      hints: [
        'macro_rules! in Rust has partial hygiene.',
        'Local variables created by the macro are visible at the call site.',
        'x is bound to 42 and can be printed.',
      ],
      concepts: ['macro-hygiene', 'let-binding', 'scope'],
    },
    {
      id: 'rs-dmacro-19',
      title: 'Refactor: Repetitive Impls',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Replace repetitive trait implementations with a macro.',
      skeleton: `trait AsStr {
    fn as_str(&self) -> &'static str;
}

struct Red;
struct Green;
struct Blue;

impl AsStr for Red {
    fn as_str(&self) -> &'static str { "Red" }
}
impl AsStr for Green {
    fn as_str(&self) -> &'static str { "Green" }
}
impl AsStr for Blue {
    fn as_str(&self) -> &'static str { "Blue" }
}

fn main() {
    println!("{} {} {}", Red.as_str(), Green.as_str(), Blue.as_str());
}`,
      solution: `trait AsStr {
    fn as_str(&self) -> &'static str;
}

macro_rules! impl_as_str {
    ( $( $t:ident ),* ) => {
        $(
            struct $t;
            impl AsStr for $t {
                fn as_str(&self) -> &'static str { stringify!($t) }
            }
        )*
    };
}

impl_as_str!(Red, Green, Blue);

fn main() {
    println!("{} {} {}", Red.as_str(), Green.as_str(), Blue.as_str());
}`,
      hints: [
        'Define a macro that takes a list of identifiers.',
        'For each ident, generate the struct and impl.',
        'Use stringify! to get the name as a string.',
      ],
      concepts: ['macro_rules', 'refactor', 'DRY', 'repetitive-impls'],
    },
    {
      id: 'rs-dmacro-20',
      title: 'Refactor: Match to Macro',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Replace a repetitive match expression with a macro-generated implementation.',
      skeleton: `enum Op { Add, Sub, Mul, Div }

fn apply(op: Op, a: f64, b: f64) -> f64 {
    match op {
        Op::Add => a + b,
        Op::Sub => a - b,
        Op::Mul => a * b,
        Op::Div => a / b,
    }
}

fn main() {
    println!("{}", apply(Op::Add, 10.0, 3.0));
    println!("{}", apply(Op::Mul, 10.0, 3.0));
}`,
      solution: `macro_rules! define_ops {
    ( $( $variant:ident => $op:tt ),* $(,)? ) => {
        enum Op { $( $variant, )* }

        fn apply(op: Op, a: f64, b: f64) -> f64 {
            match op {
                $( Op::$variant => a $op b, )*
            }
        }
    };
}

define_ops! {
    Add => +,
    Sub => -,
    Mul => *,
    Div => /,
}

fn main() {
    println!("{}", apply(Op::Add, 10.0, 3.0));
    println!("{}", apply(Op::Mul, 10.0, 3.0));
}`,
      hints: [
        'Use tt to match operators (+, -, *, /).',
        'Generate both the enum and the match arms from the same data.',
        'Each entry maps a variant name to an operator token.',
      ],
      concepts: ['macro_rules', 'tt', 'operator-tokens', 'refactor'],
    },
  ],
};
