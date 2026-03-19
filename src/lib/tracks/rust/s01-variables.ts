import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-variables',
  title: '1. Variables & Bindings',
  explanation: `## Variables & Bindings

Rust uses \`let\` to create variable bindings. By default, variables are **immutable**.

### Mutability
\`\`\`rust
let x = 5;       // immutable
let mut y = 10;  // mutable -- can be reassigned
y = 20;
\`\`\`

### Shadowing
You can re-declare a variable with the same name. The new binding **shadows** the old one:
\`\`\`rust
let x = 5;
let x = x + 1; // x is now 6, different binding
let x = "hello"; // can even change type
\`\`\`

### Constants & Statics
- \`const\` -- always immutable, must have a type annotation, evaluated at compile time
- \`static\` -- has a fixed memory address, lives for the entire program

\`\`\`rust
const MAX_POINTS: u32 = 100_000;
static GREETING: &str = "Hello";
\`\`\`

### Type Inference
Rust infers types from context. You can add explicit annotations when needed:
\`\`\`rust
let guess: u32 = "42".parse().expect("Not a number");
\`\`\`

### Unused Variables
Prefix with \`_\` to suppress unused-variable warnings: \`let _unused = 42;\`
`,
  exercises: [
    {
      id: 'rs-var-1',
      title: 'Immutable Binding',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Declare an immutable variable x with value 5.',
      skeleton: `__BLANK__ x = 5;
println!("{}", x);`,
      solution: `let x = 5;
println!("{}", x);`,
      hints: [
        'Rust uses a keyword to create variable bindings.',
        'The keyword is not var or const for local bindings.',
        'Use `let` to declare a variable.',
      ],
      concepts: ['let', 'immutable binding'],
    },
    {
      id: 'rs-var-2',
      title: 'Mutable Binding',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Declare a mutable variable and reassign it.',
      skeleton: `let __BLANK__ count = 0;
count = 10;
println!("{}", count);`,
      solution: `let mut count = 0;
count = 10;
println!("{}", count);`,
      hints: [
        'By default, Rust variables cannot be reassigned.',
        'You need a keyword after `let` to make the binding mutable.',
        'Add `mut` after `let`.',
      ],
      concepts: ['mut', 'mutable binding', 'reassignment'],
    },
    {
      id: 'rs-var-3',
      title: 'Shadowing a Variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Shadow the variable x with a new value.',
      skeleton: `let x = 5;
__BLANK__ x = x + 1;
println!("{}", x); // prints 6`,
      solution: `let x = 5;
let x = x + 1;
println!("{}", x); // prints 6`,
      hints: [
        'Shadowing creates a brand-new binding with the same name.',
        'You do not use `mut` for shadowing.',
        'Use `let x = x + 1;` to shadow.',
      ],
      concepts: ['shadowing', 'let'],
    },
    {
      id: 'rs-var-4',
      title: 'Constant Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Declare a compile-time constant.',
      skeleton: `__BLANK__ MAX_SIZE: u32 = 1024;
println!("{}", MAX_SIZE);`,
      solution: `const MAX_SIZE: u32 = 1024;
println!("{}", MAX_SIZE);`,
      hints: [
        'Constants must have a type annotation.',
        'They are always immutable and evaluated at compile time.',
        'Use `const`.',
      ],
      concepts: ['const', 'type annotation', 'compile-time evaluation'],
    },
    {
      id: 'rs-var-5',
      title: 'Static Variable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Declare a static string slice that lives for the entire program.',
      skeleton: `__BLANK__ GREETING: &str = "Hello, Rust!";
println!("{}", GREETING);`,
      solution: `static GREETING: &str = "Hello, Rust!";
println!("{}", GREETING);`,
      hints: [
        'Static variables have a fixed memory address.',
        'They live for the entire duration of the program.',
        'Use `static`.',
      ],
      concepts: ['static', 'lifetime', 'string slice'],
    },
    {
      id: 'rs-var-6',
      title: 'Type Annotation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Add a type annotation so the parse method knows what type to produce.',
      skeleton: `let guess__BLANK__ = "42".parse().expect("Not a number");
println!("{}", guess);`,
      solution: `let guess: u32 = "42".parse().expect("Not a number");
println!("{}", guess);`,
      hints: [
        'The parse() method needs to know the target type.',
        'You can annotate the variable with a colon and type.',
        'Use `: u32` after the variable name.',
      ],
      concepts: ['type annotation', 'parse', 'type inference'],
    },
    {
      id: 'rs-var-7',
      title: 'Create a Greeting Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a function `greet` that takes a name (&str) and returns a String greeting like "Hello, Alice!".',
      skeleton: `// Write your function here`,
      solution: `fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}`,
      hints: [
        'Use `fn` to declare the function with a `&str` parameter.',
        'Use `format!` macro to build the String.',
        'Return type is `String`, and `format!` returns a String.',
      ],
      concepts: ['fn', 'String', 'format!', 'return type'],
    },
    {
      id: 'rs-var-8',
      title: 'Swap Two Variables',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a function `swap` that takes two i32 values and returns them as a tuple in swapped order.',
      skeleton: `// Write your function here`,
      solution: `fn swap(a: i32, b: i32) -> (i32, i32) {
    (b, a)
}`,
      hints: [
        'The return type should be a tuple: (i32, i32).',
        'Just return (b, a).',
        'No need for a temporary variable when returning a new tuple.',
      ],
      concepts: ['tuple', 'return', 'function parameters'],
    },
    {
      id: 'rs-var-9',
      title: 'Double or Nothing',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a function `double_positive` that takes an i32. If positive, return double the value; otherwise return 0.',
      skeleton: `// Write your function here`,
      solution: `fn double_positive(n: i32) -> i32 {
    if n > 0 { n * 2 } else { 0 }
}`,
      hints: [
        'Use an if/else expression.',
        'Remember that if/else in Rust is an expression that returns a value.',
        'Return `n * 2` for positive, `0` otherwise.',
      ],
      concepts: ['if expression', 'return value', 'conditionals'],
    },
    {
      id: 'rs-var-10',
      title: 'Shadowing with Type Change',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a function `shadow_demo` that creates a variable `val` as the string "100", shadows it by parsing to u32, then returns the u32.',
      skeleton: `// Write your function here`,
      solution: `fn shadow_demo() -> u32 {
    let val = "100";
    let val: u32 = val.parse().unwrap();
    val
}`,
      hints: [
        'First `let val = "100";` creates a &str.',
        'Then shadow with `let val: u32 = val.parse().unwrap();`.',
        'Shadowing allows changing the type of a binding.',
      ],
      concepts: ['shadowing', 'type change', 'parse', 'unwrap'],
    },
    {
      id: 'rs-var-11',
      title: 'Sum a Range',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a function `sum_range` that takes two i32 values (start inclusive, end exclusive) and returns their sum.',
      skeleton: `// Write your function here`,
      solution: `fn sum_range(start: i32, end: i32) -> i32 {
    let mut total = 0;
    let mut i = start;
    while i < end {
        total += i;
        i += 1;
    }
    total
}`,
      hints: [
        'You need a mutable accumulator variable.',
        'Use a while loop or a for loop with a range.',
        'Remember to return the total (no semicolon on last expression).',
      ],
      concepts: ['mut', 'while loop', 'accumulator', 'implicit return'],
    },
    {
      id: 'rs-var-12',
      title: 'Count Vowels',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a function `count_vowels` that takes a &str and returns the number of vowels (a, e, i, o, u, case-insensitive).',
      skeleton: `// Write your function here`,
      solution: `fn count_vowels(s: &str) -> usize {
    s.chars()
        .filter(|c| "aeiouAEIOU".contains(*c))
        .count()
}`,
      hints: [
        'Use .chars() to iterate over characters.',
        'Filter for vowels and count the matches.',
        'You can check membership with .contains() on a string of vowels.',
      ],
      concepts: ['chars', 'filter', 'count', 'iterators'],
    },
    {
      id: 'rs-var-13',
      title: 'Fix the Immutability Error',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This code tries to reassign an immutable variable. Fix it so it compiles and prints 20.',
      skeleton: `fn main() {
    let x = 10;
    x = 20;
    println!("{}", x);
}`,
      solution: `fn main() {
    let mut x = 10;
    x = 20;
    println!("{}", x);
}`,
      hints: [
        'The variable x is immutable by default.',
        'You need to allow reassignment.',
        'Add `mut` after `let`.',
      ],
      concepts: ['mut', 'immutability', 'compiler error'],
    },
    {
      id: 'rs-var-14',
      title: 'Fix the Const Error',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This const declaration is missing something required. Fix it.',
      skeleton: `const MAX = 100;
fn main() {
    println!("{}", MAX);
}`,
      solution: `const MAX: i32 = 100;
fn main() {
    println!("{}", MAX);
}`,
      hints: [
        'Constants require something that `let` bindings do not.',
        'The compiler needs to know the exact type.',
        'Add a type annotation: `const MAX: i32 = 100;`.',
      ],
      concepts: ['const', 'type annotation', 'compiler error'],
    },
    {
      id: 'rs-var-15',
      title: 'Fix the Unused Variable Warning',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Suppress the unused-variable warning without removing the variable.',
      skeleton: `fn main() {
    let temporary = 42;
    println!("done");
}`,
      solution: `fn main() {
    let _temporary = 42;
    println!("done");
}`,
      hints: [
        'Rust warns about variables that are never used.',
        'There is a naming convention to suppress this.',
        'Prefix the name with an underscore: `_temporary`.',
      ],
      concepts: ['unused variable', 'underscore prefix', 'warnings'],
    },
    {
      id: 'rs-var-16',
      title: 'Predict: Shadowing Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let x = 5;
    let x = x + 1;
    let x = x * 2;
    println!("{}", x);
}`,
      solution: `12`,
      hints: [
        'x starts at 5.',
        'Then x is shadowed to 5 + 1 = 6.',
        'Then x is shadowed to 6 * 2 = 12.',
      ],
      concepts: ['shadowing', 'expression evaluation'],
    },
    {
      id: 'rs-var-17',
      title: 'Predict: Scope Shadowing',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let x = 10;
    {
        let x = 20;
        println!("{}", x);
    }
    println!("{}", x);
}`,
      solution: `20
10`,
      hints: [
        'The inner block creates a new scope.',
        'The inner `let x = 20` shadows only within that block.',
        'After the block, the outer x (10) is visible again.',
      ],
      concepts: ['shadowing', 'block scope', 'inner scope'],
    },
    {
      id: 'rs-var-18',
      title: 'Predict: Mut Reassignment',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let mut y = 1;
    y += 2;
    y *= 3;
    println!("{}", y);
}`,
      solution: `9`,
      hints: [
        'y starts at 1.',
        'y += 2 makes it 3.',
        'y *= 3 makes it 9.',
      ],
      concepts: ['mut', 'compound assignment', 'arithmetic'],
    },
    {
      id: 'rs-var-19',
      title: 'Refactor: Remove Unnecessary Mutability',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This code declares mut variables that are never reassigned. Remove unnecessary `mut` keywords.',
      skeleton: `fn main() {
    let mut name = "Rust";
    let mut version = 2021;
    let mut mutable_one = 0;
    // mutable_one is used later:
    // mutable_one += 1;
    println!("{} {}", name, version);
}`,
      solution: `fn main() {
    let name = "Rust";
    let version = 2021;
    let mutable_one = 0;
    // mutable_one is used later:
    // mutable_one += 1;
    println!("{} {}", name, version);
}`,
      hints: [
        'Check which variables are actually reassigned.',
        'name and version are never changed after initialization.',
        'Remove `mut` from all three since none are reassigned.',
      ],
      concepts: ['mut', 'unnecessary mutability', 'clean code'],
    },
    {
      id: 'rs-var-20',
      title: 'Refactor: Use Shadowing Instead of Mut',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor this code to use shadowing instead of a mutable variable for the transformation chain.',
      skeleton: `fn main() {
    let mut val = "  hello  ";
    let mut val2 = val.trim();
    let mut val3 = val2.to_uppercase();
    println!("{}", val3);
}`,
      solution: `fn main() {
    let val = "  hello  ";
    let val = val.trim();
    let val = val.to_uppercase();
    println!("{}", val);
}`,
      hints: [
        'Shadowing lets you reuse the same variable name without mut.',
        'Each `let val = ...` creates a new immutable binding.',
        'Replace val, val2, val3 with repeated shadowing of `val`.',
      ],
      concepts: ['shadowing', 'refactoring', 'immutability', 'method chaining'],
    },
  ],
};
