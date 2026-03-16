import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-lifetimes',
  title: '14. Lifetimes',
  explanation: `## Lifetimes

Lifetimes ensure references are valid for as long as they are used.

### Lifetime Annotations
\`\`\`rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
\`\`\`

### Elision Rules
The compiler infers lifetimes in common cases:
1. Each reference parameter gets its own lifetime
2. If there is exactly one input lifetime, it is assigned to all outputs
3. If \`&self\` or \`&mut self\`, the self lifetime is assigned to all outputs

### Struct Lifetimes
\`\`\`rust
struct Excerpt<'a> {
    part: &'a str,
}
\`\`\`

### 'static Lifetime
References that live for the entire program:
\`\`\`rust
let s: &'static str = "I live forever";
\`\`\`

### Lifetime Bounds
\`\`\`rust
fn print_ref<'a, T: Display + 'a>(t: &'a T) { ... }
\`\`\`
`,
  exercises: [
    {
      id: 'rs-life-1',
      title: 'Lifetime Annotation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Add lifetime annotations to the function.',
      skeleton: `fn longest<__BLANK__>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}`,
      solution: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}`,
      hints: [
        'Lifetime parameters go in angle brackets like generics.',
        'They start with an apostrophe.',
        'Use `\'a`.',
      ],
      concepts: ['lifetime annotation', '\'a', 'generic lifetime'],
    },
    {
      id: 'rs-life-2',
      title: 'Struct Lifetime',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Add a lifetime parameter to the struct.',
      skeleton: `struct Excerpt__BLANK__ {
    text: &'a str,
}`,
      solution: `struct Excerpt<'a> {
    text: &'a str,
}`,
      hints: [
        'Structs holding references need lifetime parameters.',
        'Declare the lifetime in angle brackets.',
        'Use `<\'a>`.',
      ],
      concepts: ['struct lifetime', 'reference in struct'],
    },
    {
      id: 'rs-life-3',
      title: 'Static Lifetime',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use the static lifetime for a string literal.',
      skeleton: `let msg: &__BLANK__ str = "I live forever";
println!("{}", msg);`,
      solution: `let msg: &'static str = "I live forever";
println!("{}", msg);`,
      hints: [
        'String literals are embedded in the binary.',
        'They have a special lifetime that lasts the whole program.',
        'Use `\'static`.',
      ],
      concepts: ['\'static', 'string literal', 'program lifetime'],
    },
    {
      id: 'rs-life-4',
      title: 'Lifetime in Return',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'The return reference must have a lifetime tied to the input.',
      skeleton: `fn first_word__BLANK__(s: &'a str) -> &'a str {
    match s.find(' ') {
        Some(i) => &s[..i],
        None => s,
    }
}`,
      solution: `fn first_word<'a>(s: &'a str) -> &'a str {
    match s.find(' ') {
        Some(i) => &s[..i],
        None => s,
    }
}`,
      hints: [
        'The return type borrows from the input.',
        'Both must share the same lifetime.',
        'Add `<\'a>` after the function name.',
      ],
      concepts: ['lifetime on return', 'borrow from input'],
    },
    {
      id: 'rs-life-5',
      title: 'Multiple Lifetimes',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'This function only returns from x, so only x\'s lifetime matters for the return.',
      skeleton: `fn pick_first<'a, __BLANK__>(x: &'a str, _y: &'b str) -> &'a str {
    x
}`,
      solution: `fn pick_first<'a, 'b>(x: &'a str, _y: &'b str) -> &'a str {
    x
}`,
      hints: [
        'Two inputs can have different lifetimes.',
        'The return only depends on x, so it gets \'a.',
        'Add `\'b` as the second lifetime parameter.',
      ],
      concepts: ['multiple lifetimes', 'independent lifetimes'],
    },
    {
      id: 'rs-life-6',
      title: 'Lifetime Bound',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Add a lifetime bound: \'b must outlive \'a.',
      skeleton: `fn longer_life<'a, 'b__BLANK__>(x: &'a str, y: &'b str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}`,
      solution: `fn longer_life<'a, 'b: 'a>(x: &'a str, y: &'b str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}`,
      hints: [
        'The return has lifetime \'a, but y has lifetime \'b.',
        'For y to be returned as \'a, \'b must outlive \'a.',
        'Use `\'b: \'a` (\'b outlives \'a).',
      ],
      concepts: ['lifetime bound', 'outlives', '\'b: \'a'],
    },
    {
      id: 'rs-life-7',
      title: 'Struct with Lifetime Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Define Context<\'a> holding &\'a str, with a method word_count(&self) -> usize.',
      skeleton: `// Write your struct and impl here`,
      solution: `struct Context<'a> {
    text: &'a str,
}

impl<'a> Context<'a> {
    fn new(text: &'a str) -> Self {
        Context { text }
    }

    fn word_count(&self) -> usize {
        self.text.split_whitespace().count()
    }
}`,
      hints: [
        'The struct needs a lifetime parameter for the reference.',
        'The impl block must also declare the lifetime: impl<\'a> Context<\'a>.',
        'word_count borrows self immutably.',
      ],
      concepts: ['struct lifetime', 'impl with lifetime', 'method'],
    },
    {
      id: 'rs-life-8',
      title: 'Longest with Owned Fallback',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `longest_or_default` that returns the longer of two &str slices, or "default" if both are empty.',
      skeleton: `// Write your function here`,
      solution: `fn longest_or_default<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.is_empty() && y.is_empty() {
        "default"
    } else if x.len() >= y.len() {
        x
    } else {
        y
    }
}`,
      hints: [
        'String literals have \'static lifetime, which satisfies any \'a.',
        'Return the longer of the two, or the literal "default".',
        'All returns have lifetime \'a (\'static coerces).',
      ],
      concepts: ['lifetime coercion', '\'static to \'a', 'fallback'],
    },
    {
      id: 'rs-life-9',
      title: 'Split and Return First',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `split_first_line` that takes &str and returns the first line (up to \\n or the whole string).',
      skeleton: `// Write your function here`,
      solution: `fn split_first_line(s: &str) -> &str {
    match s.find('\\n') {
        Some(i) => &s[..i],
        None => s,
    }
}`,
      hints: [
        'Lifetime elision handles this -- one input, one output.',
        'Find the newline character and slice.',
        'If no newline, return the whole string.',
      ],
      concepts: ['lifetime elision', 'string slicing', 'find'],
    },
    {
      id: 'rs-life-10',
      title: 'Tokenizer with Lifetime',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Define Tokenizer<\'a> { input: &\'a str, pos: usize } with next_token(&mut self) -> Option<&\'a str> that returns whitespace-delimited tokens.',
      skeleton: `// Write your struct and impl here`,
      solution: `struct Tokenizer<'a> {
    input: &'a str,
    pos: usize,
}

impl<'a> Tokenizer<'a> {
    fn new(input: &'a str) -> Self {
        Tokenizer { input, pos: 0 }
    }

    fn next_token(&mut self) -> Option<&'a str> {
        let remaining = &self.input[self.pos..];
        let trimmed = remaining.trim_start();
        if trimmed.is_empty() {
            return None;
        }
        let start = self.input.len() - remaining.len() + (remaining.len() - trimmed.len());
        let end = match trimmed.find(char::is_whitespace) {
            Some(i) => start + i,
            None => self.input.len(),
        };
        self.pos = end;
        Some(&self.input[start..end])
    }
}`,
      hints: [
        'The returned token borrows from the original input string.',
        'Track position with a usize field.',
        'The return lifetime is \'a, not tied to &mut self.',
      ],
      concepts: ['struct lifetime', 'iterator-like', 'borrowing from field'],
    },
    {
      id: 'rs-life-11',
      title: 'Nested Struct Lifetimes',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Define Sentence<\'a> { words: Vec<&\'a str> } with a from_text constructor that splits on whitespace.',
      skeleton: `// Write your struct and impl here`,
      solution: `struct Sentence<'a> {
    words: Vec<&'a str>,
}

impl<'a> Sentence<'a> {
    fn from_text(text: &'a str) -> Self {
        Sentence {
            words: text.split_whitespace().collect(),
        }
    }

    fn word_at(&self, idx: usize) -> Option<&'a str> {
        self.words.get(idx).copied()
    }
}`,
      hints: [
        'The Vec stores string slices borrowing from the input text.',
        'All slices share the lifetime \'a of the input.',
        'split_whitespace returns &str slices from the original.',
      ],
      concepts: ['Vec of references', 'struct lifetime', 'split_whitespace'],
    },
    {
      id: 'rs-life-12',
      title: 'Lifetime in Trait Implementation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Implement Display for Excerpt<\'a> { text: &\'a str } to print the first 20 chars followed by "...".',
      skeleton: `use std::fmt;

struct Excerpt<'a> { text: &'a str }

// Implement Display here`,
      solution: `use std::fmt;

struct Excerpt<'a> { text: &'a str }

impl<'a> fmt::Display for Excerpt<'a> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if self.text.len() > 20 {
            write!(f, "{}...", &self.text[..20])
        } else {
            write!(f, "{}", self.text)
        }
    }
}`,
      hints: [
        'impl<\'a> Display for Excerpt<\'a>.',
        'Check text length and truncate if over 20.',
        'Use write! macro for formatting.',
      ],
      concepts: ['Display', 'lifetime in trait impl', 'write!'],
    },
    {
      id: 'rs-life-13',
      title: 'Fix: Dangling Reference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'The returned reference outlives the data. Fix it.',
      skeleton: `fn longest_word() -> &str {
    let s = String::from("hello world");
    let words: Vec<&str> = s.split_whitespace().collect();
    words[0]
}`,
      solution: `fn longest_word() -> String {
    let s = String::from("hello world");
    let words: Vec<&str> = s.split_whitespace().collect();
    String::from(words[0])
}`,
      hints: [
        'The String s is dropped at the end of the function.',
        'Any reference into s would be dangling.',
        'Return an owned String instead.',
      ],
      concepts: ['dangling reference', 'return owned', 'lifetime'],
    },
    {
      id: 'rs-life-14',
      title: 'Fix: Missing Lifetime on Struct',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'The struct holds a reference but has no lifetime parameter.',
      skeleton: `struct Config {
    name: &str,
}

fn main() {
    let n = String::from("app");
    let c = Config { name: &n };
    println!("{}", c.name);
}`,
      solution: `struct Config<'a> {
    name: &'a str,
}

fn main() {
    let n = String::from("app");
    let c = Config { name: &n };
    println!("{}", c.name);
}`,
      hints: [
        'Structs with references must have lifetime parameters.',
        'Add <\'a> to the struct definition.',
        'The reference field gets the lifetime annotation.',
      ],
      concepts: ['struct lifetime', 'reference field', 'missing lifetime'],
    },
    {
      id: 'rs-life-15',
      title: 'Fix: Conflicting Lifetimes',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'This function returns a reference with the wrong lifetime. Fix the annotations.',
      skeleton: `fn first_or_second<'a, 'b>(x: &'a str, y: &'b str) -> &'a str {
    if !x.is_empty() {
        x
    } else {
        y  // lifetime mismatch!
    }
}`,
      solution: `fn first_or_second<'a>(x: &'a str, y: &'a str) -> &'a str {
    if !x.is_empty() {
        x
    } else {
        y
    }
}`,
      hints: [
        'Both x and y might be returned, so they need the same lifetime.',
        'Use the same lifetime for both parameters.',
        'Change to a single lifetime \'a for both.',
      ],
      concepts: ['lifetime unification', 'same lifetime', 'return'],
    },
    {
      id: 'rs-life-16',
      title: 'Predict: Lifetime Elision',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print? (The function uses lifetime elision.)',
      skeleton: `fn trim_prefix(s: &str) -> &str {
    s.trim_start_matches(">>")
}

fn main() {
    let input = ">>hello";
    let result = trim_prefix(input);
    println!("{}", result);
}`,
      solution: `hello`,
      hints: [
        'trim_start_matches removes the prefix ">>".',
        'The result borrows from the input string.',
        'Lifetime elision handles this automatically.',
      ],
      concepts: ['lifetime elision', 'trim', 'string slice'],
    },
    {
      id: 'rs-life-17',
      title: 'Predict: Struct Lifetime Scope',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `struct Ref<'a>(&'a i32);

fn main() {
    let x = 42;
    let r = Ref(&x);
    println!("{}", r.0);
}`,
      solution: `42`,
      hints: [
        'Ref borrows x which lives for the entire main scope.',
        'r.0 is a reference to x, which is 42.',
        'No lifetime issues here.',
      ],
      concepts: ['struct lifetime', 'scope', 'reference'],
    },
    {
      id: 'rs-life-18',
      title: 'Predict: Static vs Local',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn get_message(use_static: bool) -> &'static str {
    if use_static {
        "static message"
    } else {
        "another static"
    }
}

fn main() {
    println!("{}", get_message(true));
    println!("{}", get_message(false));
}`,
      solution: `static message
another static`,
      hints: [
        'Both return values are string literals (\'static).',
        'String literals always have \'static lifetime.',
        'get_message(true) returns "static message".',
      ],
      concepts: ['\'static', 'string literals', 'lifetime'],
    },
    {
      id: 'rs-life-19',
      title: 'Refactor: Add Explicit Lifetimes',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Add explicit lifetime annotations to make the relationships clear (even though elision would handle it).',
      skeleton: `fn first_word(s: &str) -> &str {
    match s.find(' ') {
        Some(i) => &s[..i],
        None => s,
    }
}`,
      solution: `fn first_word<'a>(s: &'a str) -> &'a str {
    match s.find(' ') {
        Some(i) => &s[..i],
        None => s,
    }
}`,
      hints: [
        'Add a lifetime parameter <\'a> to the function.',
        'Annotate both the input and output with \'a.',
        'This makes the borrow relationship explicit.',
      ],
      concepts: ['explicit lifetimes', 'documentation', 'clarity'],
    },
    {
      id: 'rs-life-20',
      title: 'Refactor: Owned to Borrowed',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'This struct clones strings unnecessarily. Refactor to use borrowed references with lifetimes.',
      skeleton: `struct LogEntry {
    level: String,
    message: String,
}

impl LogEntry {
    fn new(level: &str, message: &str) -> Self {
        LogEntry {
            level: level.to_string(),
            message: message.to_string(),
        }
    }
}`,
      solution: `struct LogEntry<'a> {
    level: &'a str,
    message: &'a str,
}

impl<'a> LogEntry<'a> {
    fn new(level: &'a str, message: &'a str) -> Self {
        LogEntry { level, message }
    }
}`,
      hints: [
        'If the struct does not need to own the data, use references.',
        'Add a lifetime parameter to the struct.',
        'This avoids unnecessary allocations.',
      ],
      concepts: ['borrowed vs owned', 'zero-copy', 'lifetime struct'],
    },
  ],
};
