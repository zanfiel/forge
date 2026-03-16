import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-borrowing',
  title: '6. Borrowing & References',
  explanation: `## Borrowing & References

Instead of transferring ownership, you can **borrow** a value with references.

### Immutable References (\`&T\`)
Multiple immutable references are allowed simultaneously:
\`\`\`rust
let s = String::from("hello");
let r1 = &s;
let r2 = &s; // fine -- both are read-only
\`\`\`

### Mutable References (\`&mut T\`)
Only ONE mutable reference is allowed at a time, and no immutable references can coexist:
\`\`\`rust
let mut s = String::from("hello");
let r = &mut s;
r.push_str(" world");
\`\`\`

### Borrowing Rules
1. At any time, you can have **either** one mutable reference **or** any number of immutable references
2. References must always be valid (no dangling references)

### Non-Lexical Lifetimes (NLL)
Rust's borrow checker knows when a reference is last used, not just when it goes out of scope:
\`\`\`rust
let mut s = String::from("hi");
let r1 = &s;
println!("{}", r1); // r1's last use
let r2 = &mut s;    // OK -- r1 is no longer used
\`\`\`
`,
  exercises: [
    {
      id: 'rs-borrow-1',
      title: 'Immutable Reference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create an immutable reference to the String.',
      skeleton: `let s = String::from("hello");
let r = __BLANK__s;
println!("{}", r);
println!("{}", s); // s is still valid`,
      solution: `let s = String::from("hello");
let r = &s;
println!("{}", r);
println!("{}", s); // s is still valid`,
      hints: [
        'You want to borrow s without taking ownership.',
        'An immutable reference is created with an ampersand.',
        'Use `&s`.',
      ],
      concepts: ['immutable reference', '&', 'borrowing'],
    },
    {
      id: 'rs-borrow-2',
      title: 'Mutable Reference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a mutable reference to modify the String.',
      skeleton: `let mut s = String::from("hello");
let r = __BLANK__ s;
r.push_str(" world");
println!("{}", s);`,
      solution: `let mut s = String::from("hello");
let r = &mut s;
r.push_str(" world");
println!("{}", s);`,
      hints: [
        'You need a reference that allows modification.',
        'Combine & with the mut keyword.',
        'Use `&mut s`.',
      ],
      concepts: ['mutable reference', '&mut', 'push_str'],
    },
    {
      id: 'rs-borrow-3',
      title: 'Function Borrowing',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Pass a reference to the function so ownership is not transferred.',
      skeleton: `fn calculate_length(s: __BLANK__) -> usize {
    s.len()
}

fn main() {
    let s = String::from("hello");
    let len = calculate_length(&s);
    println!("{} has length {}", s, len);
}`,
      solution: `fn calculate_length(s: &String) -> usize {
    s.len()
}

fn main() {
    let s = String::from("hello");
    let len = calculate_length(&s);
    println!("{} has length {}", s, len);
}`,
      hints: [
        'The function should borrow, not own, the String.',
        'The parameter type needs to be a reference.',
        'Use `&String` as the parameter type.',
      ],
      concepts: ['&String', 'borrowing in functions', 'reference parameter'],
    },
    {
      id: 'rs-borrow-4',
      title: 'Mutable Reference Parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Accept a mutable reference to modify the vector in place.',
      skeleton: `fn add_element(v: __BLANK__, elem: i32) {
    v.push(elem);
}

fn main() {
    let mut nums = vec![1, 2, 3];
    add_element(&mut nums, 4);
    println!("{:?}", nums);
}`,
      solution: `fn add_element(v: &mut Vec<i32>, elem: i32) {
    v.push(elem);
}

fn main() {
    let mut nums = vec![1, 2, 3];
    add_element(&mut nums, 4);
    println!("{:?}", nums);
}`,
      hints: [
        'The function modifies the Vec, so it needs a mutable reference.',
        'The type is a mutable reference to Vec<i32>.',
        'Use `&mut Vec<i32>`.',
      ],
      concepts: ['&mut', 'Vec', 'mutable reference parameter'],
    },
    {
      id: 'rs-borrow-5',
      title: 'NLL in Action',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fill in the reference type that is allowed because the immutable ref is no longer used.',
      skeleton: `let mut data = String::from("hello");
let r1 = &data;
println!("{}", r1); // last use of r1
let r2 = __BLANK__ data; // this is OK due to NLL
r2.push_str("!");
println!("{}", data);`,
      solution: `let mut data = String::from("hello");
let r1 = &data;
println!("{}", r1); // last use of r1
let r2 = &mut data; // this is OK due to NLL
r2.push_str("!");
println!("{}", data);`,
      hints: [
        'After println using r1, the immutable reference is no longer active.',
        'NLL allows a mutable reference after the last use of immutable ones.',
        'Use `&mut` to create a mutable reference.',
      ],
      concepts: ['NLL', 'non-lexical lifetimes', '&mut'],
    },
    {
      id: 'rs-borrow-6',
      title: 'Reborrowing',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Pass a reborrow of a mutable reference to a helper function.',
      skeleton: `fn helper(s: &mut String) {
    s.push_str("!");
}

fn main() {
    let mut s = String::from("hello");
    let r = &mut s;
    helper(__BLANK__);
    r.push_str("?");
    println!("{}", r);
}`,
      solution: `fn helper(s: &mut String) {
    s.push_str("!");
}

fn main() {
    let mut s = String::from("hello");
    let r = &mut s;
    helper(&mut *r);
    r.push_str("?");
    println!("{}", r);
}`,
      hints: [
        'You cannot pass r directly as it would be moved.',
        'You can reborrow through the mutable reference.',
        'Use `&mut *r` to create a reborrow.',
      ],
      concepts: ['reborrowing', '&mut *r', 'mutable reference'],
    },
    {
      id: 'rs-borrow-7',
      title: 'String Length via Borrow',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write `string_info` that borrows a String and returns a tuple of (length, is_empty).',
      skeleton: `// Write your function here`,
      solution: `fn string_info(s: &String) -> (usize, bool) {
    (s.len(), s.is_empty())
}`,
      hints: [
        'Borrow the String with &String.',
        'Use .len() and .is_empty() methods.',
        'Return a tuple (usize, bool).',
      ],
      concepts: ['&String', 'tuple return', 'len', 'is_empty'],
    },
    {
      id: 'rs-borrow-8',
      title: 'Uppercase In Place',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `make_uppercase` that takes &mut String and converts it to uppercase in place.',
      skeleton: `// Write your function here`,
      solution: `fn make_uppercase(s: &mut String) {
    *s = s.to_uppercase();
}`,
      hints: [
        'Take a mutable reference: &mut String.',
        'to_uppercase() returns a new String.',
        'Assign back with `*s = s.to_uppercase();`.',
      ],
      concepts: ['&mut String', 'dereference assignment', 'to_uppercase'],
    },
    {
      id: 'rs-borrow-9',
      title: 'Count Character',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write `count_char` that borrows a &str and counts occurrences of a given char.',
      skeleton: `// Write your function here`,
      solution: `fn count_char(s: &str, target: char) -> usize {
    s.chars().filter(|&c| c == target).count()
}`,
      hints: [
        'Use &str for the parameter (more general than &String).',
        'Iterate with .chars() and filter for the target.',
        'Use .count() to get the total.',
      ],
      concepts: ['&str', 'chars', 'filter', 'count'],
    },
    {
      id: 'rs-borrow-10',
      title: 'Append Items to Vec',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `extend_vec` that takes &mut Vec<i32> and a &[i32] slice, appending all slice elements to the vec.',
      skeleton: `// Write your function here`,
      solution: `fn extend_vec(v: &mut Vec<i32>, items: &[i32]) {
    for &item in items {
        v.push(item);
    }
}`,
      hints: [
        'The Vec is borrowed mutably to allow modification.',
        'The slice is borrowed immutably (read-only).',
        'Iterate over the slice and push each element.',
      ],
      concepts: ['&mut Vec', '&[i32]', 'slice', 'push'],
    },
    {
      id: 'rs-borrow-11',
      title: 'Find Max',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `find_max` that borrows a &[i32] and returns Option<&i32> -- a reference to the maximum element.',
      skeleton: `// Write your function here`,
      solution: `fn find_max(slice: &[i32]) -> Option<&i32> {
    slice.iter().max()
}`,
      hints: [
        'Borrow the slice and return a reference to its element.',
        'Use .iter().max() which returns Option<&i32>.',
        'The reference is valid as long as the slice is.',
      ],
      concepts: ['&[i32]', 'Option<&i32>', 'iter', 'max'],
    },
    {
      id: 'rs-borrow-12',
      title: 'Swap Two Elements',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `swap_elements` that takes &mut Vec<i32> and two indices, swapping those elements.',
      skeleton: `// Write your function here`,
      solution: `fn swap_elements(v: &mut Vec<i32>, i: usize, j: usize) {
    v.swap(i, j);
}`,
      hints: [
        'Vec has a built-in swap method.',
        'You need &mut to modify the Vec.',
        'Use `v.swap(i, j)`.',
      ],
      concepts: ['&mut Vec', 'swap', 'indexing'],
    },
    {
      id: 'rs-borrow-13',
      title: 'Fix: Simultaneous Mutable Borrows',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'This code creates two mutable references at the same time. Fix it.',
      skeleton: `fn main() {
    let mut s = String::from("hello");
    let r1 = &mut s;
    let r2 = &mut s;
    r1.push_str(" world");
    r2.push_str("!");
    println!("{}", s);
}`,
      solution: `fn main() {
    let mut s = String::from("hello");
    {
        let r1 = &mut s;
        r1.push_str(" world");
    }
    {
        let r2 = &mut s;
        r2.push_str("!");
    }
    println!("{}", s);
}`,
      hints: [
        'You cannot have two mutable references to the same data at once.',
        'Use scoping blocks to limit each mutable reference.',
        'Put each mutable borrow in its own block.',
      ],
      concepts: ['borrow rules', 'mutable aliasing', 'scoping'],
    },
    {
      id: 'rs-borrow-14',
      title: 'Fix: Immutable and Mutable Conflict',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'An immutable reference is still in use when a mutable reference is created. Fix it.',
      skeleton: `fn main() {
    let mut v = vec![1, 2, 3];
    let first = &v[0];
    v.push(4);
    println!("First: {}", first);
}`,
      solution: `fn main() {
    let mut v = vec![1, 2, 3];
    let first = v[0]; // copy the value instead of borrowing
    v.push(4);
    println!("First: {}", first);
}`,
      hints: [
        'push() needs &mut v, but first holds &v[0].',
        'i32 implements Copy, so you can copy the value instead of borrowing.',
        'Remove the & to copy: `let first = v[0];`.',
      ],
      concepts: ['borrow conflict', 'Copy', 'Vec invalidation'],
    },
    {
      id: 'rs-borrow-15',
      title: 'Fix: Dangling Reference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'This function returns a reference to a local value. Fix it.',
      skeleton: `fn make_greeting() -> &String {
    let s = String::from("hello");
    &s
}`,
      solution: `fn make_greeting() -> String {
    let s = String::from("hello");
    s
}`,
      hints: [
        's is dropped at the end of the function.',
        'A reference to s would be dangling.',
        'Return the owned String instead of a reference.',
      ],
      concepts: ['dangling reference', 'return ownership', 'lifetime'],
    },
    {
      id: 'rs-borrow-16',
      title: 'Predict: Borrow and Print',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn first_char(s: &str) -> char {
    s.chars().next().unwrap()
}

fn main() {
    let word = String::from("Rust");
    let c = first_char(&word);
    println!("{} starts with {}", word, c);
}`,
      solution: `Rust starts with R`,
      hints: [
        'first_char borrows word, so word is still valid.',
        'The first character of "Rust" is R.',
        'Both word and c are available for printing.',
      ],
      concepts: ['borrowing', 'chars', 'first character'],
    },
    {
      id: 'rs-borrow-17',
      title: 'Predict: Multiple Immutable Refs',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let s = String::from("hello");
    let r1 = &s;
    let r2 = &s;
    let r3 = &s;
    println!("{} {} {}", r1, r2, r3);
}`,
      solution: `hello hello hello`,
      hints: [
        'Multiple immutable references are allowed simultaneously.',
        'All three references point to the same String.',
        'Each prints "hello".',
      ],
      concepts: ['multiple immutable references', 'read-only'],
    },
    {
      id: 'rs-borrow-18',
      title: 'Predict: Mutable Ref Modification',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn add_bang(s: &mut String) {
    s.push('!');
}

fn main() {
    let mut greeting = String::from("Hi");
    add_bang(&mut greeting);
    add_bang(&mut greeting);
    println!("{}", greeting);
}`,
      solution: `Hi!!`,
      hints: [
        'Each call to add_bang appends ! to the String.',
        'After first call: "Hi!".',
        'After second call: "Hi!!".',
      ],
      concepts: ['&mut String', 'push', 'in-place modification'],
    },
    {
      id: 'rs-borrow-19',
      title: 'Refactor: &String to &str',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor these functions to accept &str instead of &String for greater flexibility.',
      skeleton: `fn is_palindrome(s: &String) -> bool {
    let reversed: String = s.chars().rev().collect();
    s == &reversed
}

fn word_count(s: &String) -> usize {
    s.split_whitespace().count()
}`,
      solution: `fn is_palindrome(s: &str) -> bool {
    let reversed: String = s.chars().rev().collect();
    s == reversed
}

fn word_count(s: &str) -> usize {
    s.split_whitespace().count()
}`,
      hints: [
        '&str is more general than &String -- it accepts both.',
        'String auto-derefs to &str.',
        'Change &String to &str in both function signatures.',
      ],
      concepts: ['&str vs &String', 'deref coercion', 'API design'],
    },
    {
      id: 'rs-borrow-20',
      title: 'Refactor: Minimize Borrow Scope',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Restructure this code so the immutable borrow ends before the mutable borrow begins.',
      skeleton: `fn main() {
    let mut data = vec![3, 1, 4, 1, 5];
    let max = data.iter().max().copied().unwrap();
    data.push(max + 1);
    println!("{:?}", data);
}`,
      solution: `fn main() {
    let mut data = vec![3, 1, 4, 1, 5];
    let max = data.iter().max().copied().unwrap();
    data.push(max + 1);
    println!("{:?}", data);
}`,
      hints: [
        'Actually this code already compiles due to NLL!',
        '.copied() produces an owned i32, ending the borrow.',
        'The immutable borrow from .iter() ends before .push().',
      ],
      concepts: ['NLL', 'borrow scope', 'copied'],
    },
  ],
};
