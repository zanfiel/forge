import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-pattern-matching',
  title: '10. Pattern Matching',
  explanation: `## Pattern Matching

Rust's pattern matching is powerful and pervasive.

### Destructuring
\`\`\`rust
let (x, y) = (1, 2);
let Point { x, y } = point;
\`\`\`

### Match Guards
\`\`\`rust
match num {
    n if n < 0 => "negative",
    0 => "zero",
    n if n > 100 => "large",
    _ => "normal",
}
\`\`\`

### Binding with @
\`\`\`rust
match age {
    n @ 0..=12 => println!("child: {}", n),
    n @ 13..=19 => println!("teen: {}", n),
    n => println!("adult: {}", n),
}
\`\`\`

### Nested Patterns
\`\`\`rust
match msg {
    Some(Message::Text(s)) if s.len() > 0 => println!("{}", s),
    _ => println!("nothing"),
}
\`\`\`

### if let / while let / let else
\`\`\`rust
let Some(val) = opt else { return; };
\`\`\`
`,
  exercises: [
    {
      id: 'rs-match-1',
      title: 'Tuple Destructuring',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Destructure a tuple in a let binding.',
      skeleton: `let (__BLANK__, __BLANK__) = (10, 20);
println!("{} {}", x, y);`,
      solution: `let (x, y) = (10, 20);
println!("{} {}", x, y);`,
      hints: [
        'Pattern matching works directly in let bindings.',
        'Match the tuple structure with variable names.',
        'Use `(x, y)`.',
      ],
      concepts: ['tuple destructuring', 'let pattern'],
    },
    {
      id: 'rs-match-2',
      title: 'Struct Destructuring',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Destructure a struct in a let binding.',
      skeleton: `struct Point { x: i32, y: i32 }

let p = Point { x: 5, y: 10 };
let Point { __BLANK__, __BLANK__ } = p;
println!("{} {}", x, y);`,
      solution: `struct Point { x: i32, y: i32 }

let p = Point { x: 5, y: 10 };
let Point { x, y } = p;
println!("{} {}", x, y);`,
      hints: [
        'Struct destructuring uses the field names.',
        'The variable names match the field names by default.',
        'Use `Point { x, y }`.',
      ],
      concepts: ['struct destructuring', 'field names'],
    },
    {
      id: 'rs-match-3',
      title: 'Or Pattern',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Match multiple values in one arm.',
      skeleton: `let n = 2;
let kind = match n {
    1 __BLANK__ 2 => "small",
    3 | 4 => "medium",
    _ => "large",
};`,
      solution: `let n = 2;
let kind = match n {
    1 | 2 => "small",
    3 | 4 => "medium",
    _ => "large",
};`,
      hints: [
        'Use a separator to match multiple values.',
        'The or-pattern uses the pipe character.',
        'Use `|` between values.',
      ],
      concepts: ['or pattern', '|', 'match'],
    },
    {
      id: 'rs-match-4',
      title: 'Range Pattern',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Match a range of values.',
      skeleton: `let grade = 85;
let letter = match grade {
    90__BLANK__100 => "A",
    80..=89 => "B",
    70..=79 => "C",
    _ => "F",
};`,
      solution: `let grade = 85;
let letter = match grade {
    90..=100 => "A",
    80..=89 => "B",
    70..=79 => "C",
    _ => "F",
};`,
      hints: [
        'Inclusive range patterns use ..= syntax.',
        'This matches values from 90 to 100 inclusive.',
        'Use `..=`.',
      ],
      concepts: ['range pattern', '..=', 'match'],
    },
    {
      id: 'rs-match-5',
      title: 'Match Guard',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Add a guard condition to the match arm.',
      skeleton: `let num = -5;
let desc = match num {
    n __BLANK__ n < 0 => "negative",
    0 => "zero",
    _ => "positive",
};`,
      solution: `let num = -5;
let desc = match num {
    n if n < 0 => "negative",
    0 => "zero",
    _ => "positive",
};`,
      hints: [
        'Match guards add conditions after the pattern.',
        'They use the `if` keyword.',
        'Use `if n < 0`.',
      ],
      concepts: ['match guard', 'if', 'conditional pattern'],
    },
    {
      id: 'rs-match-6',
      title: 'Binding with @',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Bind a matched range value to a variable using @.',
      skeleton: `let age = 15;
match age {
    n __BLANK__ 0..=12 => println!("child: {}", n),
    n @ 13..=19 => println!("teen: {}", n),
    n => println!("adult: {}", n),
}`,
      solution: `let age = 15;
match age {
    n @ 0..=12 => println!("child: {}", n),
    n @ 13..=19 => println!("teen: {}", n),
    n => println!("adult: {}", n),
}`,
      hints: [
        'The @ operator binds the matched value to a name.',
        'It allows both matching a range and capturing the value.',
        'Use `@` between the variable name and the pattern.',
      ],
      concepts: ['@ binding', 'range pattern', 'capture'],
    },
    {
      id: 'rs-match-7',
      title: 'Classify Number',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write `classify` that takes i32 and returns "zero", "positive even", "positive odd", "negative even", or "negative odd".',
      skeleton: `// Write your function here`,
      solution: `fn classify(n: i32) -> &'static str {
    match n {
        0 => "zero",
        n if n > 0 && n % 2 == 0 => "positive even",
        n if n > 0 => "positive odd",
        n if n % 2 == 0 => "negative even",
        _ => "negative odd",
    }
}`,
      hints: [
        'Handle 0 first, then positive/negative with even/odd.',
        'Use match guards for compound conditions.',
        'Check sign and parity with guards.',
      ],
      concepts: ['match guards', 'classification', 'compound conditions'],
    },
    {
      id: 'rs-match-8',
      title: 'Nested Option Match',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `unwrap_nested` that takes Option<Option<i32>> and returns the inner i32 or -1 if any layer is None.',
      skeleton: `// Write your function here`,
      solution: `fn unwrap_nested(val: Option<Option<i32>>) -> i32 {
    match val {
        Some(Some(n)) => n,
        _ => -1,
    }
}`,
      hints: [
        'Use nested patterns: Some(Some(n)).',
        'The wildcard _ catches all None cases.',
        'Nested pattern matching is powerful and concise.',
      ],
      concepts: ['nested pattern', 'Option', 'match'],
    },
    {
      id: 'rs-match-9',
      title: 'Parse Command',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `parse_command` that takes &str and returns a description. Match "quit"/"exit" -> "goodbye", "help" -> "showing help", anything starting with "say " -> the rest of the string, else "unknown".',
      skeleton: `// Write your function here`,
      solution: `fn parse_command(cmd: &str) -> String {
    match cmd {
        "quit" | "exit" => String::from("goodbye"),
        "help" => String::from("showing help"),
        s if s.starts_with("say ") => String::from(&s[4..]),
        _ => String::from("unknown"),
    }
}`,
      hints: [
        'Use or-pattern for quit/exit.',
        'Use a guard with starts_with for the "say " prefix.',
        'Slice the string to get the text after "say ".',
      ],
      concepts: ['or pattern', 'guard', 'string matching'],
    },
    {
      id: 'rs-match-10',
      title: 'Destructure Enum Variants',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Define enum Expr { Num(f64), Add(Box<Expr>, Box<Expr>), Neg(Box<Expr>) } and write an `eval` function.',
      skeleton: `// Write your enum and function here`,
      solution: `enum Expr {
    Num(f64),
    Add(Box<Expr>, Box<Expr>),
    Neg(Box<Expr>),
}

fn eval(expr: &Expr) -> f64 {
    match expr {
        Expr::Num(n) => *n,
        Expr::Add(a, b) => eval(a) + eval(b),
        Expr::Neg(e) => -eval(e),
    }
}`,
      hints: [
        'Match on each variant and destructure the data.',
        'Recursively evaluate nested expressions.',
        'Num is the base case.',
      ],
      concepts: ['recursive enum', 'destructuring', 'Box', 'evaluation'],
    },
    {
      id: 'rs-match-11',
      title: 'let else Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `parse_positive` that takes &str. Use let-else to parse it as i32; return None if parsing fails or if the value is not positive.',
      skeleton: `// Write your function here`,
      solution: `fn parse_positive(s: &str) -> Option<i32> {
    let Ok(n) = s.parse::<i32>() else { return None; };
    if n > 0 { Some(n) } else { None }
}`,
      hints: [
        'let-else: `let Ok(n) = expr else { diverge };`.',
        'The else block must diverge (return, break, panic, etc.).',
        'Then check if n > 0.',
      ],
      concepts: ['let else', 'early return', 'parse', 'Option'],
    },
    {
      id: 'rs-match-12',
      title: 'Match Reference Patterns',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write `find_first_positive` that takes &[i32] and returns Option<&i32> -- a reference to the first positive element using match in iteration.',
      skeleton: `// Write your function here`,
      solution: `fn find_first_positive(slice: &[i32]) -> Option<&i32> {
    for item in slice {
        match item {
            n if *n > 0 => return Some(n),
            _ => continue,
        }
    }
    None
}`,
      hints: [
        'Iterate over the slice (items are &i32).',
        'Match each item with a guard for positive.',
        'Return a reference to the first positive.',
      ],
      concepts: ['reference pattern', 'iteration', 'match guard'],
    },
    {
      id: 'rs-match-13',
      title: 'Fix: Overlapping Patterns',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'The first arm catches everything, making other arms unreachable. Fix the ordering.',
      skeleton: `fn describe(n: i32) -> &'static str {
    match n {
        _ => "other",
        0 => "zero",
        1..=10 => "small",
    }
}`,
      solution: `fn describe(n: i32) -> &'static str {
    match n {
        0 => "zero",
        1..=10 => "small",
        _ => "other",
    }
}`,
      hints: [
        'The wildcard _ matches everything.',
        'It should be the last arm, not the first.',
        'Reorder: specific patterns first, wildcard last.',
      ],
      concepts: ['pattern ordering', 'unreachable', 'wildcard'],
    },
    {
      id: 'rs-match-14',
      title: 'Fix: Missing Destructure',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'The match patterns don\'t destructure the tuple correctly. Fix them.',
      skeleton: `fn main() {
    let pair = (true, 42);
    match pair {
        (true) => println!("true"),
        (false) => println!("false"),
    }
}`,
      solution: `fn main() {
    let pair = (true, 42);
    match pair {
        (true, _) => println!("true"),
        (false, _) => println!("false"),
    }
}`,
      hints: [
        'The tuple has two elements, but the patterns only show one.',
        'Patterns must match the full structure.',
        'Add `_` for the second element: `(true, _)`.',
      ],
      concepts: ['tuple pattern', 'wildcard', 'full destructure'],
    },
    {
      id: 'rs-match-15',
      title: 'Fix: Moved Value in Pattern',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'The match moves the String out, preventing later use. Fix it.',
      skeleton: `fn main() {
    let data = Some(String::from("hello"));
    match data {
        Some(s) => println!("Got: {}", s),
        None => println!("Nothing"),
    }
    println!("{:?}", data);
}`,
      solution: `fn main() {
    let data = Some(String::from("hello"));
    match &data {
        Some(s) => println!("Got: {}", s),
        None => println!("Nothing"),
    }
    println!("{:?}", data);
}`,
      hints: [
        'Matching on data moves the String out.',
        'Match on a reference instead: match &data.',
        'The patterns then match references automatically.',
      ],
      concepts: ['match by reference', 'move in pattern', '&'],
    },
    {
      id: 'rs-match-16',
      title: 'Predict: @ Binding',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let x = 7;
    match x {
        n @ 1..=5 => println!("small: {}", n),
        n @ 6..=10 => println!("medium: {}", n),
        n => println!("large: {}", n),
    }
}`,
      solution: `medium: 7`,
      hints: [
        'x is 7, which falls in the range 6..=10.',
        'n is bound to 7 via the @ operator.',
        'Prints "medium: 7".',
      ],
      concepts: ['@ binding', 'range pattern'],
    },
    {
      id: 'rs-match-17',
      title: 'Predict: Nested Destructure',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let data = Some((3, 4));
    match data {
        Some((x, y)) => println!("{}", x + y),
        None => println!("none"),
    }
}`,
      solution: `7`,
      hints: [
        'data is Some((3, 4)).',
        'The pattern destructures both the Option and the tuple.',
        'x = 3, y = 4, sum = 7.',
      ],
      concepts: ['nested destructuring', 'Option', 'tuple'],
    },
    {
      id: 'rs-match-18',
      title: 'Predict: Match Guard Priority',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let pair = (2, -2);
    match pair {
        (x, y) if x == y => println!("equal"),
        (x, y) if x + y == 0 => println!("opposites"),
        _ => println!("other"),
    }
}`,
      solution: `opposites`,
      hints: [
        '(2, -2): x=2, y=-2.',
        'x == y? 2 != -2, false.',
        'x + y == 0? 2 + (-2) = 0, true. Prints "opposites".',
      ],
      concepts: ['match guard', 'tuple pattern', 'guard evaluation'],
    },
    {
      id: 'rs-match-19',
      title: 'Refactor: if Chain to match',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor the nested if-let chain into a single match expression.',
      skeleton: `fn process(val: Option<Result<i32, String>>) -> String {
    if let Some(inner) = val {
        if let Ok(n) = inner {
            format!("Got {}", n)
        } else {
            String::from("Error")
        }
    } else {
        String::from("Nothing")
    }
}`,
      solution: `fn process(val: Option<Result<i32, String>>) -> String {
    match val {
        Some(Ok(n)) => format!("Got {}", n),
        Some(Err(_)) => String::from("Error"),
        None => String::from("Nothing"),
    }
}`,
      hints: [
        'Nested patterns can handle multiple layers at once.',
        'Some(Ok(n)) matches the success case directly.',
        'match is often cleaner than nested if-let.',
      ],
      concepts: ['nested pattern', 'match vs if-let', 'refactoring'],
    },
    {
      id: 'rs-match-20',
      title: 'Refactor: Match to if-let',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This match only cares about one variant. Simplify to if-let.',
      skeleton: `fn maybe_print(val: Option<i32>) {
    match val {
        Some(n) => println!("Got: {}", n),
        None => {},
    }
}`,
      solution: `fn maybe_print(val: Option<i32>) {
    if let Some(n) = val {
        println!("Got: {}", n);
    }
}`,
      hints: [
        'When you only care about one variant, if-let is cleaner.',
        'The None => {} arm does nothing, so it can be omitted.',
        'Use `if let Some(n) = val { ... }`.',
      ],
      concepts: ['if let', 'simplification', 'one-armed match'],
    },
  ],
};
