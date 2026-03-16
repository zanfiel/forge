import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-functions',
  title: '3. Functions',
  explanation: `## Functions

Functions are declared with \`fn\`. They are the building blocks of Rust programs.

### Basics
\`\`\`rust
fn add(a: i32, b: i32) -> i32 {
    a + b  // no semicolon = implicit return
}
\`\`\`

### Expressions vs Statements
- **Expressions** produce a value: \`5 + 3\`, \`{ let x = 1; x + 2 }\`
- **Statements** perform an action but do not return a value: \`let x = 5;\`
- The last expression in a function body (without \`;\`) is the return value

### Unit Type
Functions that don't return a value implicitly return \`()\` (unit type):
\`\`\`rust
fn greet() {
    println!("Hello!"); // returns ()
}
\`\`\`

### Diverging Functions
Functions that never return use \`!\` (the never type):
\`\`\`rust
fn forever() -> ! {
    loop {}
}
\`\`\`

### Early Return
Use \`return\` to exit a function early:
\`\`\`rust
fn check(n: i32) -> &'static str {
    if n < 0 { return "negative"; }
    "non-negative"
}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-fn-1',
      title: 'Return Type Annotation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Add the correct return type annotation.',
      skeleton: `fn square(x: i32) -> __BLANK__ {
    x * x
}`,
      solution: `fn square(x: i32) -> i32 {
    x * x
}`,
      hints: [
        'The function multiplies two i32 values.',
        'The result of i32 * i32 is i32.',
        'The return type is `i32`.',
      ],
      concepts: ['return type', 'type annotation', 'fn'],
    },
    {
      id: 'rs-fn-2',
      title: 'Implicit Return',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Return the value without using the return keyword.',
      skeleton: `fn double(x: i32) -> i32 {
    __BLANK__
}`,
      solution: `fn double(x: i32) -> i32 {
    x * 2
}`,
      hints: [
        'The last expression without a semicolon is the return value.',
        'You need an expression that doubles x.',
        'Write `x * 2` without a semicolon.',
      ],
      concepts: ['implicit return', 'expression', 'no semicolon'],
    },
    {
      id: 'rs-fn-3',
      title: 'Unit Return Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Specify the unit return type explicitly.',
      skeleton: `fn log_message(msg: &str) -> __BLANK__ {
    println!("{}", msg);
}`,
      solution: `fn log_message(msg: &str) -> () {
    println!("{}", msg);
}`,
      hints: [
        'Functions that do not return a meaningful value return the unit type.',
        'The unit type is an empty tuple.',
        'Use `()` as the return type.',
      ],
      concepts: ['unit type', '()', 'void equivalent'],
    },
    {
      id: 'rs-fn-4',
      title: 'Early Return Keyword',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use early return to exit the function when n is negative.',
      skeleton: `fn abs_val(n: i32) -> i32 {
    if n < 0 {
        __BLANK__ -n;
    }
    n
}`,
      solution: `fn abs_val(n: i32) -> i32 {
    if n < 0 {
        return -n;
    }
    n
}`,
      hints: [
        'You need to exit the function early inside the if block.',
        'Rust has a keyword for explicit early return.',
        'Use `return -n;`.',
      ],
      concepts: ['return', 'early return', 'control flow'],
    },
    {
      id: 'rs-fn-5',
      title: 'Block Expression',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fill in the block expression that computes and returns a value.',
      skeleton: `fn main() {
    let result = __BLANK__;
    println!("{}", result); // prints 30
}`,
      solution: `fn main() {
    let result = {
        let a = 10;
        let b = 20;
        a + b
    };
    println!("{}", result); // prints 30
}`,
      hints: [
        'A block { } is an expression if the last line has no semicolon.',
        'Declare local variables inside the block.',
        'The block should evaluate to a + b where a=10, b=20.',
      ],
      concepts: ['block expression', 'expression', 'scope'],
    },
    {
      id: 'rs-fn-6',
      title: 'Function with Multiple Params',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Complete the parameter list with correct types.',
      skeleton: `fn describe(name: __BLANK__, age: __BLANK__) -> String {
    format!("{} is {} years old", name, age)
}`,
      solution: `fn describe(name: &str, age: u32) -> String {
    format!("{} is {} years old", name, age)
}`,
      hints: [
        'name should be a string slice (borrowed).',
        'age should be a positive integer.',
        'Use `&str` for name and `u32` for age.',
      ],
      concepts: ['parameters', '&str', 'u32', 'format!'],
    },
    {
      id: 'rs-fn-7',
      title: 'Factorial Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a recursive function `factorial` that computes n! for a u64 input.',
      skeleton: `// Write your function here`,
      solution: `fn factorial(n: u64) -> u64 {
    if n <= 1 {
        1
    } else {
        n * factorial(n - 1)
    }
}`,
      hints: [
        'Base case: factorial(0) = factorial(1) = 1.',
        'Recursive case: n * factorial(n - 1).',
        'Use if/else as an expression for the return value.',
      ],
      concepts: ['recursion', 'base case', 'u64', 'if expression'],
    },
    {
      id: 'rs-fn-8',
      title: 'Is Even',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a function `is_even` that returns true if an i32 is even.',
      skeleton: `// Write your function here`,
      solution: `fn is_even(n: i32) -> bool {
    n % 2 == 0
}`,
      hints: [
        'Use the modulo operator %.',
        'A number is even if n % 2 equals 0.',
        'The comparison expression returns a bool.',
      ],
      concepts: ['bool', 'modulo', 'expression return'],
    },
    {
      id: 'rs-fn-9',
      title: 'Max of Three',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write a function `max_of_three` that returns the largest of three i32 values.',
      skeleton: `// Write your function here`,
      solution: `fn max_of_three(a: i32, b: i32, c: i32) -> i32 {
    if a >= b && a >= c {
        a
    } else if b >= c {
        b
    } else {
        c
    }
}`,
      hints: [
        'Compare a with b and c first.',
        'Use if/else if/else chain.',
        'Each branch returns one of the three values.',
      ],
      concepts: ['comparison', 'if/else', 'multiple parameters'],
    },
    {
      id: 'rs-fn-10',
      title: 'Apply Twice',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write a function `apply_twice` that takes an i32 and a function fn(i32) -> i32, and applies the function twice.',
      skeleton: `// Write your function here`,
      solution: `fn apply_twice(x: i32, f: fn(i32) -> i32) -> i32 {
    f(f(x))
}`,
      hints: [
        'Function pointers have the type `fn(ParamType) -> ReturnType`.',
        'Call f on x, then call f again on the result.',
        'Return `f(f(x))`.',
      ],
      concepts: ['function pointer', 'higher-order function', 'fn type'],
    },
    {
      id: 'rs-fn-11',
      title: 'Fibonacci',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write an iterative `fibonacci` function that returns the nth Fibonacci number (0-indexed: fib(0)=0, fib(1)=1).',
      skeleton: `// Write your function here`,
      solution: `fn fibonacci(n: u32) -> u64 {
    if n == 0 { return 0; }
    let mut a: u64 = 0;
    let mut b: u64 = 1;
    for _ in 1..n {
        let temp = b;
        b = a + b;
        a = temp;
    }
    b
}`,
      hints: [
        'Use two variables to track consecutive Fibonacci numbers.',
        'Iterate n-1 times, updating both variables each step.',
        'Handle the base case n=0 separately.',
      ],
      concepts: ['iteration', 'mutable variables', 'for loop', 'early return'],
    },
    {
      id: 'rs-fn-12',
      title: 'Power Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `power` that computes base^exp (both u32) iteratively, returning u64.',
      skeleton: `// Write your function here`,
      solution: `fn power(base: u32, exp: u32) -> u64 {
    let mut result: u64 = 1;
    for _ in 0..exp {
        result *= base as u64;
    }
    result
}`,
      hints: [
        'Start with result = 1.',
        'Multiply by base exp number of times.',
        'Cast base to u64 to avoid overflow.',
      ],
      concepts: ['iteration', 'type casting', 'accumulator'],
    },
    {
      id: 'rs-fn-13',
      title: 'Fix: Missing Semicolon Confusion',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This function should return a value but has an accidental semicolon. Fix it.',
      skeleton: `fn add(a: i32, b: i32) -> i32 {
    a + b;
}`,
      solution: `fn add(a: i32, b: i32) -> i32 {
    a + b
}`,
      hints: [
        'A semicolon turns an expression into a statement.',
        'Statements return () (unit), not the computed value.',
        'Remove the semicolon after `a + b`.',
      ],
      concepts: ['semicolon', 'expression vs statement', 'implicit return'],
    },
    {
      id: 'rs-fn-14',
      title: 'Fix: Wrong Return Type',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'The return type does not match what the function actually returns. Fix it.',
      skeleton: `fn greeting() -> String {
    "Hello, world!"
}`,
      solution: `fn greeting() -> String {
    String::from("Hello, world!")
}`,
      hints: [
        'A string literal "..." has type &str, not String.',
        'The return type says String (owned).',
        'Wrap with String::from() or use .to_string().',
      ],
      concepts: ['String vs &str', 'String::from', 'type mismatch'],
    },
    {
      id: 'rs-fn-15',
      title: 'Fix: Unreachable Code',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'The default return is unreachable. Restructure so the function compiles cleanly.',
      skeleton: `fn sign(n: i32) -> &'static str {
    if n > 0 {
        return "positive";
    }
    if n < 0 {
        return "negative";
    }
    return "zero";
    "unreachable"
}`,
      solution: `fn sign(n: i32) -> &'static str {
    if n > 0 {
        "positive"
    } else if n < 0 {
        "negative"
    } else {
        "zero"
    }
}`,
      hints: [
        'The last line after the final return is dead code.',
        'Restructure using if/else if/else as a single expression.',
        'Remove all explicit return keywords and the dead code.',
      ],
      concepts: ['dead code', 'if/else expression', 'idiomatic Rust'],
    },
    {
      id: 'rs-fn-16',
      title: 'Predict: Expression Block',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let val = {
        let x = 3;
        x * x
    };
    println!("{}", val);
}`,
      solution: `9`,
      hints: [
        'The block evaluates to its last expression.',
        'x is 3, so x * x = 9.',
        'val is assigned the block result: 9.',
      ],
      concepts: ['block expression', 'scope'],
    },
    {
      id: 'rs-fn-17',
      title: 'Predict: Unit Return',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn compute() -> i32 {
    let x = 5;
    if x > 3 {
        return x * 2;
    }
    x + 1
}

fn main() {
    println!("{}", compute());
}`,
      solution: `10`,
      hints: [
        'x is 5, which is greater than 3.',
        'The if branch triggers an early return.',
        '5 * 2 = 10.',
      ],
      concepts: ['early return', 'control flow', 'if'],
    },
    {
      id: 'rs-fn-18',
      title: 'Predict: Nested Function Calls',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn add_one(x: i32) -> i32 { x + 1 }
fn double(x: i32) -> i32 { x * 2 }

fn main() {
    println!("{}", add_one(double(add_one(3))));
}`,
      solution: `9`,
      hints: [
        'Start from the innermost call: add_one(3) = 4.',
        'Then double(4) = 8.',
        'Then add_one(8) = 9.',
      ],
      concepts: ['function composition', 'nested calls'],
    },
    {
      id: 'rs-fn-19',
      title: 'Refactor: Explicit Returns to Expressions',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Refactor this function to use idiomatic Rust expressions instead of explicit return statements.',
      skeleton: `fn classify(n: i32) -> &'static str {
    if n > 0 {
        return "positive";
    } else if n < 0 {
        return "negative";
    } else {
        return "zero";
    }
}`,
      solution: `fn classify(n: i32) -> &'static str {
    if n > 0 {
        "positive"
    } else if n < 0 {
        "negative"
    } else {
        "zero"
    }
}`,
      hints: [
        'In Rust, if/else is an expression that returns a value.',
        'Remove all `return` keywords and trailing semicolons.',
        'The function body becomes a single if/else expression.',
      ],
      concepts: ['expression-oriented', 'idiomatic Rust', 'return removal'],
    },
    {
      id: 'rs-fn-20',
      title: 'Refactor: Extract Helper Function',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Extract the repeated logic into a helper function called `is_in_range`.',
      skeleton: `fn main() {
    let a = 15;
    let b = 25;
    let c = 5;
    let a_ok = a >= 10 && a <= 20;
    let b_ok = b >= 10 && b <= 20;
    let c_ok = c >= 10 && c <= 20;
    println!("{} {} {}", a_ok, b_ok, c_ok);
}`,
      solution: `fn is_in_range(val: i32, min: i32, max: i32) -> bool {
    val >= min && val <= max
}

fn main() {
    let a = 15;
    let b = 25;
    let c = 5;
    let a_ok = is_in_range(a, 10, 20);
    let b_ok = is_in_range(b, 10, 20);
    let c_ok = is_in_range(c, 10, 20);
    println!("{} {} {}", a_ok, b_ok, c_ok);
}`,
      hints: [
        'The pattern `val >= 10 && val <= 20` is repeated three times.',
        'Extract it into a function with val, min, max parameters.',
        'The function returns bool.',
      ],
      concepts: ['DRY principle', 'helper function', 'refactoring'],
    },
  ],
};
