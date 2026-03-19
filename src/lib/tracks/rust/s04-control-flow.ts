import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-control-flow',
  title: '4. Control Flow',
  explanation: `## Control Flow

Rust has powerful control flow constructs, many of which are expressions.

### if / else
\`if\` is an expression -- it can return a value:
\`\`\`rust
let status = if score >= 60 { "pass" } else { "fail" };
\`\`\`

### if let
Destructure and match in one step:
\`\`\`rust
if let Some(val) = maybe_value {
    println!("{}", val);
}
\`\`\`

### Loops
- \`loop\` -- infinite loop, can return a value with \`break value\`
- \`while\` -- condition-checked loop
- \`while let\` -- loop while a pattern matches
- \`for\` -- iterate over ranges, iterators, collections

### match
Pattern matching with exhaustive checking:
\`\`\`rust
match value {
    1 => println!("one"),
    2 | 3 => println!("two or three"),
    _ => println!("other"),
}
\`\`\`

### Labeled Loops
\`\`\`rust
'outer: for i in 0..5 {
    for j in 0..5 {
        if i + j == 6 { break 'outer; }
    }
}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-ctrl-1',
      title: 'If Expression',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use if as an expression to assign a value.',
      skeleton: `let temp = 35;
let status = __BLANK__ temp > 30 { "hot" } else { "cool" };
println!("{}", status);`,
      solution: `let temp = 35;
let status = if temp > 30 { "hot" } else { "cool" };
println!("{}", status);`,
      hints: [
        'In Rust, if/else can produce a value.',
        'Assign the result directly to a variable.',
        'Use `if` as the keyword.',
      ],
      concepts: ['if expression', 'conditional assignment'],
    },
    {
      id: 'rs-ctrl-2',
      title: 'Loop with Break Value',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Return a value from a loop using break.',
      skeleton: `let mut counter = 0;
let result = loop {
    counter += 1;
    if counter == 10 {
        __BLANK__ counter * 2;
    }
};
println!("{}", result); // prints 20`,
      solution: `let mut counter = 0;
let result = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2;
    }
};
println!("{}", result); // prints 20`,
      hints: [
        'The `loop` keyword creates an infinite loop.',
        'You can exit and return a value from a loop.',
        'Use `break counter * 2;` to return the value.',
      ],
      concepts: ['loop', 'break with value', 'infinite loop'],
    },
    {
      id: 'rs-ctrl-3',
      title: 'For Range',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Iterate over numbers 1 through 5 (inclusive).',
      skeleton: `for i in __BLANK__ {
    println!("{}", i);
}`,
      solution: `for i in 1..=5 {
    println!("{}", i);
}`,
      hints: [
        'Rust has two range syntaxes: exclusive and inclusive.',
        'For inclusive end, use ..= instead of ..',
        'Use `1..=5` for 1, 2, 3, 4, 5.',
      ],
      concepts: ['for loop', 'range', 'inclusive range'],
    },
    {
      id: 'rs-ctrl-4',
      title: 'Match Wildcard',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Add a catch-all pattern to the match expression.',
      skeleton: `let code = 404;
let msg = match code {
    200 => "OK",
    404 => "Not Found",
    __BLANK__ => "Unknown",
};
println!("{}", msg);`,
      solution: `let code = 404;
let msg = match code {
    200 => "OK",
    404 => "Not Found",
    _ => "Unknown",
};
println!("{}", msg);`,
      hints: [
        'match must be exhaustive -- it needs to handle all possible values.',
        'A wildcard pattern matches anything not already matched.',
        'Use `_` as the catch-all pattern.',
      ],
      concepts: ['match', 'wildcard', 'exhaustive matching'],
    },
    {
      id: 'rs-ctrl-5',
      title: 'if let Syntax',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use if let to extract a value from an Option.',
      skeleton: `let maybe: Option<i32> = Some(42);
__BLANK__ Some(val) = maybe {
    println!("Got: {}", val);
}`,
      solution: `let maybe: Option<i32> = Some(42);
if let Some(val) = maybe {
    println!("Got: {}", val);
}`,
      hints: [
        'if let combines pattern matching with an if condition.',
        'It destructures the Option if it matches.',
        'Use `if let` before the pattern.',
      ],
      concepts: ['if let', 'Option', 'pattern matching'],
    },
    {
      id: 'rs-ctrl-6',
      title: 'Labeled Break',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Break out of the outer loop using a label.',
      skeleton: `let mut found = false;
__BLANK__: for i in 0..10 {
    for j in 0..10 {
        if i * j == 42 {
            found = true;
            break 'outer;
        }
    }
}
println!("Found: {}", found);`,
      solution: `let mut found = false;
'outer: for i in 0..10 {
    for j in 0..10 {
        if i * j == 42 {
            found = true;
            break 'outer;
        }
    }
}
println!("Found: {}", found);`,
      hints: [
        'Loop labels start with an apostrophe.',
        'They are placed before the loop keyword.',
        'Use `\'outer` as the label.',
      ],
      concepts: ['labeled loops', 'break', 'nested loops'],
    },
    {
      id: 'rs-ctrl-7',
      title: 'FizzBuzz',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write `fizzbuzz` that takes a u32 and returns "FizzBuzz" if divisible by 15, "Fizz" if by 3, "Buzz" if by 5, otherwise the number as a String.',
      skeleton: `// Write your function here`,
      solution: `fn fizzbuzz(n: u32) -> String {
    if n % 15 == 0 {
        String::from("FizzBuzz")
    } else if n % 3 == 0 {
        String::from("Fizz")
    } else if n % 5 == 0 {
        String::from("Buzz")
    } else {
        n.to_string()
    }
}`,
      hints: [
        'Check divisibility by 15 first (both 3 and 5).',
        'Use modulo (%) to check divisibility.',
        'Convert the number to String with .to_string().',
      ],
      concepts: ['if/else', 'modulo', 'String::from', 'to_string'],
    },
    {
      id: 'rs-ctrl-8',
      title: 'Collatz Steps',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `collatz_steps` that counts how many steps it takes to reach 1 from n. If even, divide by 2; if odd, multiply by 3 and add 1.',
      skeleton: `// Write your function here`,
      solution: `fn collatz_steps(mut n: u64) -> u32 {
    let mut steps = 0;
    while n != 1 {
        if n % 2 == 0 {
            n /= 2;
        } else {
            n = 3 * n + 1;
        }
        steps += 1;
    }
    steps
}`,
      hints: [
        'Use a while loop that continues until n == 1.',
        'Check if n is even with n % 2 == 0.',
        'Count each step with a mutable counter.',
      ],
      concepts: ['while loop', 'mut parameter', 'Collatz conjecture'],
    },
    {
      id: 'rs-ctrl-9',
      title: 'Match with Guards',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `classify_temp` using match with guards that returns "freezing" (<0), "cold" (0-15), "warm" (16-30), or "hot" (>30) for an i32.',
      skeleton: `// Write your function here`,
      solution: `fn classify_temp(temp: i32) -> &'static str {
    match temp {
        t if t < 0 => "freezing",
        t if t <= 15 => "cold",
        t if t <= 30 => "warm",
        _ => "hot",
    }
}`,
      hints: [
        'Match guards use `if` after the pattern: `t if t < 0 => ...`.',
        'Bind the value to a name to use in the guard.',
        'Order matters -- put more restrictive patterns first.',
      ],
      concepts: ['match guards', 'pattern binding', 'range matching'],
    },
    {
      id: 'rs-ctrl-10',
      title: 'while let Drain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `sum_stack` that takes a Vec<i32>, pops all elements with while let, and returns their sum.',
      skeleton: `// Write your function here`,
      solution: `fn sum_stack(mut stack: Vec<i32>) -> i32 {
    let mut sum = 0;
    while let Some(val) = stack.pop() {
        sum += val;
    }
    sum
}`,
      hints: [
        'Vec::pop() returns Option<i32>.',
        'while let continues as long as the pattern matches.',
        'Use `while let Some(val) = stack.pop()`.',
      ],
      concepts: ['while let', 'Vec::pop', 'Option', 'pattern matching'],
    },
    {
      id: 'rs-ctrl-11',
      title: 'Binary Search',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write `binary_search` that takes a sorted &[i32] and a target i32, returns Option<usize> with the index if found.',
      skeleton: `// Write your function here`,
      solution: `fn binary_search(arr: &[i32], target: i32) -> Option<usize> {
    let mut low: usize = 0;
    let mut high: usize = arr.len();
    while low < high {
        let mid = low + (high - low) / 2;
        match arr[mid].cmp(&target) {
            std::cmp::Ordering::Equal => return Some(mid),
            std::cmp::Ordering::Less => low = mid + 1,
            std::cmp::Ordering::Greater => high = mid,
        }
    }
    None
}`,
      hints: [
        'Use two pointers: low and high.',
        'Compare the middle element with the target.',
        'Use match on .cmp() for clean three-way comparison.',
      ],
      concepts: ['binary search', 'match', 'cmp', 'Option', 'algorithm'],
    },
    {
      id: 'rs-ctrl-12',
      title: 'Count Matches',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `count_in_range` that counts how many elements in a &[i32] fall within min..=max (inclusive).',
      skeleton: `// Write your function here`,
      solution: `fn count_in_range(slice: &[i32], min: i32, max: i32) -> usize {
    let mut count = 0;
    for &val in slice {
        if val >= min && val <= max {
            count += 1;
        }
    }
    count
}`,
      hints: [
        'Iterate over the slice with a for loop.',
        'Check if each element is within [min, max].',
        'Use a mutable counter.',
      ],
      concepts: ['for loop', 'slice iteration', 'counting'],
    },
    {
      id: 'rs-ctrl-13',
      title: 'Fix: Missing Else Branch',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This if expression is used as a value but has no else branch. Fix it.',
      skeleton: `fn main() {
    let x = 5;
    let label = if x > 0 { "positive" };
    println!("{}", label);
}`,
      solution: `fn main() {
    let x = 5;
    let label = if x > 0 { "positive" } else { "non-positive" };
    println!("{}", label);
}`,
      hints: [
        'When if is used as an expression, both branches must return the same type.',
        'Without else, the if returns () which mismatches &str.',
        'Add an else branch returning a &str.',
      ],
      concepts: ['if expression', 'else required', 'type mismatch'],
    },
    {
      id: 'rs-ctrl-14',
      title: 'Fix: Non-exhaustive Match',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This match is not exhaustive. Add the missing arm.',
      skeleton: `fn main() {
    let grade = 'B';
    let msg = match grade {
        'A' => "Excellent",
        'B' => "Good",
        'C' => "Average",
    };
    println!("{}", msg);
}`,
      solution: `fn main() {
    let grade = 'B';
    let msg = match grade {
        'A' => "Excellent",
        'B' => "Good",
        'C' => "Average",
        _ => "Unknown",
    };
    println!("{}", msg);
}`,
      hints: [
        'match on char must handle all possible char values.',
        'You are only matching A, B, C but char has many more values.',
        'Add a `_ => "Unknown"` catch-all arm.',
      ],
      concepts: ['exhaustive matching', 'wildcard', 'match'],
    },
    {
      id: 'rs-ctrl-15',
      title: 'Fix: Infinite Loop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'This while loop never terminates. Fix the logic.',
      skeleton: `fn main() {
    let mut n = 10;
    while n > 0 {
        println!("{}", n);
    }
    println!("Done!");
}`,
      solution: `fn main() {
    let mut n = 10;
    while n > 0 {
        println!("{}", n);
        n -= 1;
    }
    println!("Done!");
}`,
      hints: [
        'The loop condition checks n > 0 but n never changes.',
        'You need to decrement n inside the loop.',
        'Add `n -= 1;` inside the while body.',
      ],
      concepts: ['while loop', 'loop termination', 'decrement'],
    },
    {
      id: 'rs-ctrl-16',
      title: 'Predict: Match Expression',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let x = 3;
    let y = match x {
        1 => "one",
        2 | 3 => "two or three",
        4..=10 => "four to ten",
        _ => "other",
    };
    println!("{}", y);
}`,
      solution: `two or three`,
      hints: [
        'x is 3.',
        'The pattern `2 | 3` matches 2 or 3.',
        'x matches the second arm.',
      ],
      concepts: ['match', 'or pattern', 'range pattern'],
    },
    {
      id: 'rs-ctrl-17',
      title: 'Predict: Loop Break Value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let mut i = 1;
    let result = loop {
        if i > 5 {
            break i * 10;
        }
        i += 1;
    };
    println!("{}", result);
}`,
      solution: `60`,
      hints: [
        'i increments from 1: 2, 3, 4, 5, 6.',
        'When i becomes 6, the condition i > 5 is true.',
        'break returns 6 * 10 = 60.',
      ],
      concepts: ['loop', 'break with value', 'counter'],
    },
    {
      id: 'rs-ctrl-18',
      title: 'Predict: Continue Skipping',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let mut sum = 0;
    for i in 1..=5 {
        if i % 2 == 0 { continue; }
        sum += i;
    }
    println!("{}", sum);
}`,
      solution: `9`,
      hints: [
        'continue skips even numbers (2, 4).',
        'Only odd numbers are added: 1, 3, 5.',
        '1 + 3 + 5 = 9.',
      ],
      concepts: ['continue', 'for loop', 'skip pattern'],
    },
    {
      id: 'rs-ctrl-19',
      title: 'Refactor: Replace if Chain with match',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor the if/else chain into a match expression.',
      skeleton: `fn day_type(day: &str) -> &str {
    if day == "Saturday" || day == "Sunday" {
        "weekend"
    } else if day == "Monday" || day == "Friday" {
        "near weekend"
    } else {
        "weekday"
    }
}`,
      solution: `fn day_type(day: &str) -> &str {
    match day {
        "Saturday" | "Sunday" => "weekend",
        "Monday" | "Friday" => "near weekend",
        _ => "weekday",
    }
}`,
      hints: [
        'match can compare against multiple patterns with |.',
        'Each arm uses => to map pattern to result.',
        'Use _ for the default case.',
      ],
      concepts: ['match', 'or pattern', 'refactoring'],
    },
    {
      id: 'rs-ctrl-20',
      title: 'Refactor: Loop to Iterator',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor the manual loop into an iterator chain.',
      skeleton: `fn sum_of_squares(n: u32) -> u32 {
    let mut sum = 0;
    let mut i = 1;
    while i <= n {
        sum += i * i;
        i += 1;
    }
    sum
}`,
      solution: `fn sum_of_squares(n: u32) -> u32 {
    (1..=n).map(|i| i * i).sum()
}`,
      hints: [
        'Use a range 1..=n to generate the numbers.',
        'Use .map() to square each number.',
        'Use .sum() to add them all up.',
      ],
      concepts: ['iterators', 'map', 'sum', 'functional style'],
    },
  ],
};
