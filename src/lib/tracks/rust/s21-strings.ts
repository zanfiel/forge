import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-str',
  title: '21. Strings',
  explanation: `## Strings in Rust

Rust has two main string types:

### String vs &str
- \`String\` -- owned, heap-allocated, growable, UTF-8
- \`&str\` -- borrowed string slice, usually a view into a String or literal

### Creating Strings
\`\`\`rust
let s1 = String::from("hello");
let s2 = "hello".to_string();
let s3 = String::new();
let s4 = format!("{} {}", "hello", "world");
\`\`\`

### Appending
\`\`\`rust
let mut s = String::from("hello");
s.push(' ');           // single char
s.push_str("world");   // string slice
\`\`\`

### Concatenation
\`\`\`rust
let s1 = String::from("hello ");
let s2 = String::from("world");
let s3 = s1 + &s2;  // s1 is moved
let s4 = format!("{}{}", "hello ", "world"); // no moves
\`\`\`

### Indexing -- NOT Allowed
\`\`\`rust
let s = String::from("hello");
// s[0] -- ERROR! Rust strings are UTF-8, not char arrays
s.chars().nth(0); // Some('h')
\`\`\`

### Useful Methods
\`chars()\`, \`bytes()\`, \`len()\`, \`is_empty()\`, \`contains()\`, \`starts_with()\`,
\`ends_with()\`, \`find()\`, \`replace()\`, \`trim()\`, \`split()\`, \`to_uppercase()\`, \`to_lowercase()\`
`,
  exercises: [
    {
      id: 'rs-str-1',
      title: 'String::from',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create an owned String from a string literal.',
      skeleton: `let s = String::__BLANK__("hello");
println!("{}", s);`,
      solution: `let s = String::from("hello");
println!("{}", s);`,
      hints: [
        'String::from creates an owned String from a &str.',
        'This allocates on the heap.',
        'The answer is from.',
      ],
      concepts: ['String::from', 'owned string', 'heap allocation'],
    },
    {
      id: 'rs-str-2',
      title: 'push_str',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Append a string slice to a String.',
      skeleton: `let mut greeting = String::from("Hello, ");
greeting.__BLANK__("world!");
println!("{}", greeting);`,
      solution: `let mut greeting = String::from("Hello, ");
greeting.push_str("world!");
println!("{}", greeting);`,
      hints: [
        'push_str appends a &str to a String.',
        'The String must be mutable.',
        'Use .push_str().',
      ],
      concepts: ['push_str', 'String mutation', 'append'],
    },
    {
      id: 'rs-str-3',
      title: 'format! Macro',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use format! to create a formatted String.',
      skeleton: `let name = "Rust";
let version = 2024;
let info = __BLANK__("{} edition {}", name, version);
println!("{}", info);`,
      solution: `let name = "Rust";
let version = 2024;
let info = format!("{} edition {}", name, version);
println!("{}", info);`,
      hints: [
        'format! works like println! but returns a String.',
        'It does not move its arguments.',
        'The answer is format!.',
      ],
      concepts: ['format!', 'string formatting', 'String creation'],
    },
    {
      id: 'rs-str-4',
      title: 'chars Iterator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Iterate over characters of a string.',
      skeleton: `let s = String::from("hello");
let count = s.__BLANK__().count();
println!("chars: {}", count);`,
      solution: `let s = String::from("hello");
let count = s.chars().count();
println!("chars: {}", count);`,
      hints: [
        'chars() returns an iterator over Unicode scalar values.',
        'count() consumes the iterator and counts elements.',
        'Use .chars().',
      ],
      concepts: ['chars', 'iterator', 'Unicode'],
    },
    {
      id: 'rs-str-5',
      title: 'trim and split',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Trim whitespace and split a string.',
      skeleton: `let csv = "  Alice, Bob, Charlie  ";
let names: Vec<&str> = csv.__BLANK__().split(", ").collect();
println!("{:?}", names);`,
      solution: `let csv = "  Alice, Bob, Charlie  ";
let names: Vec<&str> = csv.trim().split(", ").collect();
println!("{:?}", names);`,
      hints: [
        'trim removes leading and trailing whitespace.',
        'split divides the string at the delimiter.',
        'Use .trim().',
      ],
      concepts: ['trim', 'split', 'string processing'],
    },
    {
      id: 'rs-str-6',
      title: 'contains and replace',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Check for substring and replace it.',
      skeleton: `let s = String::from("Hello, World!");
if s.__BLANK__("World") {
    let new_s = s.replace("World", "Rust");
    println!("{}", new_s);
}`,
      solution: `let s = String::from("Hello, World!");
if s.contains("World") {
    let new_s = s.replace("World", "Rust");
    println!("{}", new_s);
}`,
      hints: [
        'contains checks if a substring exists.',
        'replace returns a new String with substitutions.',
        'Use .contains().',
      ],
      concepts: ['contains', 'replace', 'substring'],
    },
    {
      id: 'rs-str-7',
      title: 'String Reversal',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Reverse a string character by character.',
      skeleton: `fn reverse(s: &str) -> String {
    // Reverse the characters of the string
    todo!()
}

fn main() {
    println!("{}", reverse("hello"));   // "olleh"
    println!("{}", reverse("Rust!"));   // "!tsuR"
}`,
      solution: `fn reverse(s: &str) -> String {
    s.chars().rev().collect()
}

fn main() {
    println!("{}", reverse("hello"));
    println!("{}", reverse("Rust!"));
}`,
      hints: [
        'Use .chars() to get an iterator of characters.',
        'Use .rev() to reverse the iterator.',
        'Collect into a String.',
      ],
      concepts: ['chars', 'rev', 'collect', 'String'],
    },
    {
      id: 'rs-str-8',
      title: 'Capitalize Words',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Capitalize the first letter of each word.',
      skeleton: `fn title_case(s: &str) -> String {
    // Capitalize first letter of each word
    todo!()
}

fn main() {
    println!("{}", title_case("hello world")); // "Hello World"
    println!("{}", title_case("rust is great")); // "Rust Is Great"
}`,
      solution: `fn title_case(s: &str) -> String {
    s.split_whitespace()
        .map(|word| {
            let mut chars = word.chars();
            match chars.next() {
                None => String::new(),
                Some(c) => {
                    let upper: String = c.to_uppercase().collect();
                    upper + chars.as_str()
                }
            }
        })
        .collect::<Vec<_>>()
        .join(" ")
}

fn main() {
    println!("{}", title_case("hello world"));
    println!("{}", title_case("rust is great"));
}`,
      hints: [
        'Split on whitespace, process each word.',
        'Take the first char, uppercase it, append the rest.',
        'Join words back with spaces.',
      ],
      concepts: ['split_whitespace', 'to_uppercase', 'string manipulation'],
    },
    {
      id: 'rs-str-9',
      title: 'Count Vowels',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Count the number of vowels in a string.',
      skeleton: `fn count_vowels(s: &str) -> usize {
    // Count a, e, i, o, u (case insensitive)
    todo!()
}

fn main() {
    println!("{}", count_vowels("Hello World"));   // 3
    println!("{}", count_vowels("AEIOU aeiou"));   // 10
}`,
      solution: `fn count_vowels(s: &str) -> usize {
    s.chars()
        .filter(|c| "aeiouAEIOU".contains(*c))
        .count()
}

fn main() {
    println!("{}", count_vowels("Hello World"));
    println!("{}", count_vowels("AEIOU aeiou"));
}`,
      hints: [
        'Iterate over chars and filter for vowels.',
        'Check membership in "aeiouAEIOU".',
        'Use .count() to get the total.',
      ],
      concepts: ['chars', 'filter', 'contains', 'counting'],
    },
    {
      id: 'rs-str-10',
      title: 'Palindrome Check',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Check if a string is a palindrome (ignoring case and spaces).',
      skeleton: `fn is_palindrome(s: &str) -> bool {
    // Check if s reads the same forwards and backwards
    // Ignore case and non-alphanumeric characters
    todo!()
}

fn main() {
    println!("{}", is_palindrome("racecar"));        // true
    println!("{}", is_palindrome("A man a plan a canal Panama")); // true
    println!("{}", is_palindrome("hello"));           // false
}`,
      solution: `fn is_palindrome(s: &str) -> bool {
    let cleaned: String = s.chars()
        .filter(|c| c.is_alphanumeric())
        .map(|c| c.to_lowercase().next().unwrap())
        .collect();
    let reversed: String = cleaned.chars().rev().collect();
    cleaned == reversed
}

fn main() {
    println!("{}", is_palindrome("racecar"));
    println!("{}", is_palindrome("A man a plan a canal Panama"));
    println!("{}", is_palindrome("hello"));
}`,
      hints: [
        'Filter to keep only alphanumeric characters.',
        'Convert to lowercase for case-insensitive comparison.',
        'Compare the cleaned string with its reverse.',
      ],
      concepts: ['palindrome', 'filter', 'to_lowercase', 'rev'],
    },
    {
      id: 'rs-str-11',
      title: 'Truncate with Ellipsis',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Truncate a string at a max length, adding "..." if truncated.',
      skeleton: `fn truncate(s: &str, max_len: usize) -> String {
    // If s is longer than max_len, truncate and add "..."
    // Otherwise return the string unchanged
    todo!()
}

fn main() {
    println!("{}", truncate("Hello, World!", 5));   // "Hello..."
    println!("{}", truncate("Hi", 10));              // "Hi"
}`,
      solution: `fn truncate(s: &str, max_len: usize) -> String {
    if s.chars().count() <= max_len {
        s.to_string()
    } else {
        let truncated: String = s.chars().take(max_len).collect();
        format!("{}...", truncated)
    }
}

fn main() {
    println!("{}", truncate("Hello, World!", 5));
    println!("{}", truncate("Hi", 10));
}`,
      hints: [
        'Use chars().count() for character length (not byte length).',
        'Use chars().take(n) to get the first n characters.',
        'Append "..." with format! or push_str.',
      ],
      concepts: ['chars', 'take', 'UTF-8 safety', 'truncation'],
    },
    {
      id: 'rs-str-12',
      title: 'Extract Domain',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Extract the domain from a URL string.',
      skeleton: `fn extract_domain(url: &str) -> Option<&str> {
    // Extract domain from "https://example.com/path"
    // Return None for invalid URLs
    todo!()
}

fn main() {
    println!("{:?}", extract_domain("https://example.com/path")); // Some("example.com")
    println!("{:?}", extract_domain("http://rust-lang.org"));     // Some("rust-lang.org")
    println!("{:?}", extract_domain("not a url"));                // None
}`,
      solution: `fn extract_domain(url: &str) -> Option<&str> {
    let after_protocol = url.strip_prefix("https://")
        .or_else(|| url.strip_prefix("http://"))?;
    let domain = after_protocol.split('/').next()?;
    if domain.contains('.') {
        Some(domain)
    } else {
        None
    }
}

fn main() {
    println!("{:?}", extract_domain("https://example.com/path"));
    println!("{:?}", extract_domain("http://rust-lang.org"));
    println!("{:?}", extract_domain("not a url"));
}`,
      hints: [
        'Use strip_prefix to remove the protocol.',
        'Split on / and take the first part for the domain.',
        'Return None if no protocol prefix or no dot in domain.',
      ],
      concepts: ['strip_prefix', 'split', 'Option', 'string parsing'],
    },
    {
      id: 'rs-str-13',
      title: 'Direct Indexing Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix the attempt to index a String directly.',
      skeleton: `fn main() {
    let s = String::from("hello");
    let first = s[0]; // error: String cannot be indexed by integer
    println!("First char: {}", first);
}`,
      solution: `fn main() {
    let s = String::from("hello");
    let first = s.chars().next().unwrap();
    println!("First char: {}", first);
}`,
      hints: [
        'Rust strings are UTF-8 and cannot be indexed by byte position.',
        'Use .chars().next() to get the first character.',
        'Or use .as_bytes()[0] if you specifically want the byte.',
      ],
      concepts: ['UTF-8', 'indexing', 'chars', 'String'],
    },
    {
      id: 'rs-str-14',
      title: 'Concatenation Ownership',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix the ownership error when concatenating strings.',
      skeleton: `fn main() {
    let s1 = String::from("hello ");
    let s2 = String::from("world");
    let s3 = s1 + &s2;
    println!("{}", s1); // error: s1 was moved
    println!("{}", s3);
}`,
      solution: `fn main() {
    let s1 = String::from("hello ");
    let s2 = String::from("world");
    let s3 = format!("{}{}", s1, s2);
    println!("{}", s1);
    println!("{}", s3);
}`,
      hints: [
        'The + operator moves the left operand.',
        'Use format! to concatenate without moving.',
        'format! borrows its arguments.',
      ],
      concepts: ['String concatenation', 'format!', 'ownership'],
    },
    {
      id: 'rs-str-15',
      title: 'UTF-8 Slice Panic',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix a panic from slicing in the middle of a multi-byte character.',
      skeleton: `fn main() {
    let s = String::from("cafe\\u{0301}"); // "cafe" + combining accent
    let slice = &s[0..5]; // may panic on non-ASCII
    println!("{}", slice);
}`,
      solution: `fn main() {
    let s = String::from("cafe\\u{0301}");
    let slice: String = s.chars().take(4).collect();
    println!("{}", slice);
}`,
      hints: [
        'String slicing by byte index panics if not on a char boundary.',
        'Use .chars().take(n) for safe character-level slicing.',
        'Multi-byte characters span more than one byte.',
      ],
      concepts: ['UTF-8', 'char boundary', 'safe slicing'],
    },
    {
      id: 'rs-str-16',
      title: 'Predict String Length',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the difference between len() and chars().count().',
      skeleton: `fn main() {
    let ascii = "hello";
    let emoji = "hi \\u{1F600}";
    println!("{} {}", ascii.len(), ascii.chars().count());
    println!("{} {}", emoji.len(), emoji.chars().count());
}`,
      solution: `5 5
7 4`,
      hints: [
        'len() returns byte length, chars().count() returns character count.',
        '"hello" is 5 bytes and 5 chars.',
        'The emoji is 4 bytes, so "hi " (3 bytes) + emoji (4 bytes) = 7 bytes, 4 chars.',
      ],
      concepts: ['len', 'chars', 'UTF-8', 'byte vs char'],
    },
    {
      id: 'rs-str-17',
      title: 'Predict Trim Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict what trim variants return.',
      skeleton: `fn main() {
    let s = "  hello  ";
    println!("[{}]", s.trim());
    println!("[{}]", s.trim_start());
    println!("[{}]", s.trim_end());
}`,
      solution: `[hello]
[hello  ]
[  hello]`,
      hints: [
        'trim removes whitespace from both ends.',
        'trim_start only removes from the beginning.',
        'trim_end only removes from the end.',
      ],
      concepts: ['trim', 'trim_start', 'trim_end'],
    },
    {
      id: 'rs-str-18',
      title: 'Predict Replace',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the output of replace and replacen.',
      skeleton: `fn main() {
    let s = "aabbaabb";
    println!("{}", s.replace("aa", "X"));
    println!("{}", s.replacen("bb", "Y", 1));
}`,
      solution: `XbbXbb
aaYaabb`,
      hints: [
        'replace replaces ALL occurrences.',
        'replacen replaces only the first n occurrences.',
        '"aabbaabb" with replace("aa","X") -> "XbbXbb".',
      ],
      concepts: ['replace', 'replacen', 'string substitution'],
    },
    {
      id: 'rs-str-19',
      title: 'Refactor String Building',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor manual string building to use iterators and join.',
      skeleton: `fn csv_line(values: &[&str]) -> String {
    let mut result = String::new();
    for (i, val) in values.iter().enumerate() {
        if i > 0 {
            result.push(',');
        }
        result.push_str(val);
    }
    result
}`,
      solution: `fn csv_line(values: &[&str]) -> String {
    values.join(",")
}`,
      hints: [
        'The join method concatenates slices with a separator.',
        'It handles the separator placement automatically.',
        'This replaces the entire manual loop.',
      ],
      concepts: ['join', 'string building', 'refactoring'],
    },
    {
      id: 'rs-str-20',
      title: 'Refactor Repeated Allocation',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor code to minimize string allocations.',
      skeleton: `fn repeat_pattern(pattern: &str, n: usize) -> String {
    let mut result = String::new();
    for _ in 0..n {
        result = result + pattern; // creates a new String each time
    }
    result
}`,
      solution: `fn repeat_pattern(pattern: &str, n: usize) -> String {
    pattern.repeat(n)
}`,
      hints: [
        'The + operator creates a new String allocation each iteration.',
        'str::repeat does this efficiently in one allocation.',
        'Or pre-allocate with String::with_capacity.',
      ],
      concepts: ['repeat', 'allocation', 'performance', 'String'],
    },
  ],
};
