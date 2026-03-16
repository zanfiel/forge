import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-slices',
  title: '7. Slices',
  explanation: `## Slices

Slices let you reference a contiguous sequence of elements without owning them.

### String Slices (\`&str\`)
\`\`\`rust
let s = String::from("hello world");
let hello: &str = &s[0..5];
let world: &str = &s[6..11];
\`\`\`

### Array/Vec Slices (\`&[T]\`)
\`\`\`rust
let arr = [1, 2, 3, 4, 5];
let slice: &[i32] = &arr[1..4]; // [2, 3, 4]
\`\`\`

### Slice Methods
- \`.len()\`, \`.is_empty()\`
- \`.first()\`, \`.last()\`
- \`.contains()\`
- \`.iter()\`, \`.windows()\`, \`.chunks()\`
- \`.split_at()\`, \`.split()\`

### Mutable Slices (\`&mut [T]\`)
\`\`\`rust
let mut arr = [1, 2, 3];
let slice = &mut arr[..];
slice[0] = 10;
\`\`\`

### Slice Patterns (since Rust 1.42)
\`\`\`rust
match slice {
    [first, .., last] => println!("{} {}", first, last),
    [single] => println!("{}", single),
    [] => println!("empty"),
}
\`\`\`
`,
  exercises: [
    {
      id: 'rs-slice-1',
      title: 'String Slice',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a string slice of the first 5 characters.',
      skeleton: `let s = String::from("hello world");
let hello: &str = __BLANK__;
println!("{}", hello);`,
      solution: `let s = String::from("hello world");
let hello: &str = &s[0..5];
println!("{}", hello);`,
      hints: [
        'Use range syntax to slice a String.',
        'The range is start..end (exclusive end).',
        'Use `&s[0..5]`.',
      ],
      concepts: ['string slice', 'range', '&str'],
    },
    {
      id: 'rs-slice-2',
      title: 'Array Slice',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a slice from the array containing elements at indices 1, 2, 3.',
      skeleton: `let arr = [10, 20, 30, 40, 50];
let middle: &[i32] = __BLANK__;
println!("{:?}", middle); // [20, 30, 40]`,
      solution: `let arr = [10, 20, 30, 40, 50];
let middle: &[i32] = &arr[1..4];
println!("{:?}", middle); // [20, 30, 40]`,
      hints: [
        'Slice syntax uses & and a range.',
        'Index 1 through 3 means range 1..4 (exclusive end).',
        'Use `&arr[1..4]`.',
      ],
      concepts: ['array slice', '&[i32]', 'range'],
    },
    {
      id: 'rs-slice-3',
      title: 'Full Slice',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a slice of the entire vector.',
      skeleton: `let v = vec![1, 2, 3, 4];
let full: &[i32] = __BLANK__;
println!("{:?}", full);`,
      solution: `let v = vec![1, 2, 3, 4];
let full: &[i32] = &v[..];
println!("{:?}", full);`,
      hints: [
        'To slice the entire collection, omit both start and end.',
        'Use the full-range syntax with just ..',
        'Use `&v[..]` or simply `&v`.',
      ],
      concepts: ['full range', '&v[..]', 'Vec to slice'],
    },
    {
      id: 'rs-slice-4',
      title: 'Slice Length',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Get the length of a slice.',
      skeleton: `let data = [1, 2, 3, 4, 5];
let slice = &data[1..4];
let length = slice.__BLANK__();
println!("{}", length); // 3`,
      solution: `let data = [1, 2, 3, 4, 5];
let slice = &data[1..4];
let length = slice.len();
println!("{}", length); // 3`,
      hints: [
        'Slices have a method that returns their element count.',
        'It is the same method used on Vec and String.',
        'Use `.len()`.',
      ],
      concepts: ['len', 'slice methods'],
    },
    {
      id: 'rs-slice-5',
      title: 'Mutable Slice',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a mutable slice and modify an element.',
      skeleton: `let mut arr = [1, 2, 3, 4, 5];
let slice = __BLANK__ arr[..];
slice[0] = 99;
println!("{:?}", arr); // [99, 2, 3, 4, 5]`,
      solution: `let mut arr = [1, 2, 3, 4, 5];
let slice = &mut arr[..];
slice[0] = 99;
println!("{:?}", arr); // [99, 2, 3, 4, 5]`,
      hints: [
        'To modify through a slice, you need a mutable reference.',
        'Use &mut to create a mutable slice.',
        'Use `&mut arr[..]`.',
      ],
      concepts: ['mutable slice', '&mut [T]'],
    },
    {
      id: 'rs-slice-6',
      title: 'Subslice from Slice',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Create a subslice from an existing slice.',
      skeleton: `let arr = [10, 20, 30, 40, 50, 60];
let outer = &arr[1..5]; // [20, 30, 40, 50]
let inner = __BLANK__; // [30, 40]
println!("{:?}", inner);`,
      solution: `let arr = [10, 20, 30, 40, 50, 60];
let outer = &arr[1..5]; // [20, 30, 40, 50]
let inner = &outer[1..3]; // [30, 40]
println!("{:?}", inner);`,
      hints: [
        'You can slice a slice just like you slice an array.',
        'Indices are relative to the slice, not the original array.',
        'Use `&outer[1..3]`.',
      ],
      concepts: ['subslicing', 'relative indexing'],
    },
    {
      id: 'rs-slice-7',
      title: 'Sum of Slice',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write `sum_slice` that takes &[i32] and returns the sum of all elements.',
      skeleton: `// Write your function here`,
      solution: `fn sum_slice(slice: &[i32]) -> i32 {
    slice.iter().sum()
}`,
      hints: [
        'Accept a slice &[i32] as the parameter.',
        'Use .iter().sum() for a concise solution.',
        'Alternatively, use a for loop with an accumulator.',
      ],
      concepts: ['&[i32]', 'iter', 'sum'],
    },
    {
      id: 'rs-slice-8',
      title: 'First and Last',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Write `first_last` that takes &[i32] and returns Option<(i32, i32)> with the first and last elements.',
      skeleton: `// Write your function here`,
      solution: `fn first_last(slice: &[i32]) -> Option<(i32, i32)> {
    Some((*slice.first()?, *slice.last()?))
}`,
      hints: [
        'Use .first() and .last() which return Option<&i32>.',
        'Dereference with * to get i32 values.',
        'Use the ? operator to propagate None.',
      ],
      concepts: ['first', 'last', 'Option', 'dereference'],
    },
    {
      id: 'rs-slice-9',
      title: 'Contains All',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `contains_all` that checks if all elements of `needles: &[i32]` are in `haystack: &[i32]`.',
      skeleton: `// Write your function here`,
      solution: `fn contains_all(haystack: &[i32], needles: &[i32]) -> bool {
    needles.iter().all(|n| haystack.contains(n))
}`,
      hints: [
        'Iterate over needles and check each against haystack.',
        'Use .contains() on the haystack slice.',
        'Use .all() to ensure every needle is found.',
      ],
      concepts: ['contains', 'all', 'iter', 'slice methods'],
    },
    {
      id: 'rs-slice-10',
      title: 'Window Sums',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `window_sums` that takes &[i32] and window size usize, returning a Vec<i32> of the sum of each window.',
      skeleton: `// Write your function here`,
      solution: `fn window_sums(slice: &[i32], size: usize) -> Vec<i32> {
    slice.windows(size).map(|w| w.iter().sum()).collect()
}`,
      hints: [
        'Use .windows(size) to get overlapping windows.',
        'Map each window to its sum.',
        'Collect into a Vec<i32>.',
      ],
      concepts: ['windows', 'map', 'collect', 'sliding window'],
    },
    {
      id: 'rs-slice-11',
      title: 'Split at Predicate',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `split_at_zero` that takes &[i32] and returns (&[i32], &[i32]) split at the first zero element.',
      skeleton: `// Write your function here`,
      solution: `fn split_at_zero(slice: &[i32]) -> (&[i32], &[i32]) {
    match slice.iter().position(|&x| x == 0) {
        Some(idx) => slice.split_at(idx),
        None => (slice, &[]),
    }
}`,
      hints: [
        'Find the index of the first zero with .position().',
        'Use .split_at(idx) to split the slice.',
        'If no zero, return the whole slice and an empty slice.',
      ],
      concepts: ['split_at', 'position', 'slice splitting'],
    },
    {
      id: 'rs-slice-12',
      title: 'Reverse In Place',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `reverse_slice` that takes &mut [i32] and reverses it in place without using .reverse().',
      skeleton: `// Write your function here`,
      solution: `fn reverse_slice(slice: &mut [i32]) {
    let len = slice.len();
    for i in 0..len / 2 {
        slice.swap(i, len - 1 - i);
    }
}`,
      hints: [
        'Swap elements from both ends toward the middle.',
        'Use .swap(i, j) on the mutable slice.',
        'Loop from 0 to len/2.',
      ],
      concepts: ['mutable slice', 'swap', 'in-place algorithm'],
    },
    {
      id: 'rs-slice-13',
      title: 'Fix: Out of Bounds Slice',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This slice range goes past the end of the array. Fix it.',
      skeleton: `fn main() {
    let arr = [1, 2, 3, 4, 5];
    let slice = &arr[2..7];
    println!("{:?}", slice);
}`,
      solution: `fn main() {
    let arr = [1, 2, 3, 4, 5];
    let slice = &arr[2..5];
    println!("{:?}", slice);
}`,
      hints: [
        'The array has 5 elements (indices 0-4).',
        'The range end (7) exceeds the array length.',
        'Change to `&arr[2..5]` to get [3, 4, 5].',
      ],
      concepts: ['bounds checking', 'panic', 'slice range'],
    },
    {
      id: 'rs-slice-14',
      title: 'Fix: Non-UTF8 String Slice',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'This code slices in the middle of a multi-byte character. Fix it.',
      skeleton: `fn main() {
    let s = String::from("hello cafe\\u{0301}");
    let slice = &s[0..11];
    println!("{}", slice);
}`,
      solution: `fn main() {
    let s = String::from("hello cafe\\u{0301}");
    let slice = &s[0..10];
    println!("{}", slice);
}`,
      hints: [
        'String slicing panics if it splits a multi-byte char.',
        'The combining accent \\u{0301} is 2 bytes (at positions 10-11).',
        'Slice to 10 to end before the accent, or to 12 to include it.',
      ],
      concepts: ['UTF-8', 'string slicing', 'byte boundaries'],
    },
    {
      id: 'rs-slice-15',
      title: 'Fix: Slice Type Mismatch',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'The function expects &[i32] but receives a Vec. Fix the call.',
      skeleton: `fn sum(data: &[i32]) -> i32 {
    data.iter().sum()
}

fn main() {
    let v = vec![1, 2, 3];
    let total = sum(v);
    println!("{}", total);
}`,
      solution: `fn sum(data: &[i32]) -> i32 {
    data.iter().sum()
}

fn main() {
    let v = vec![1, 2, 3];
    let total = sum(&v);
    println!("{}", total);
}`,
      hints: [
        'The function takes a slice &[i32], not a Vec.',
        'Vec<i32> can deref-coerce to &[i32].',
        'Pass `&v` instead of `v`.',
      ],
      concepts: ['deref coercion', 'Vec to slice', '&v'],
    },
    {
      id: 'rs-slice-16',
      title: 'Predict: Slice Length',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let arr = [10, 20, 30, 40, 50];
    let s1 = &arr[1..3];
    let s2 = &arr[..2];
    let s3 = &arr[3..];
    println!("{} {} {}", s1.len(), s2.len(), s3.len());
}`,
      solution: `2 2 2`,
      hints: [
        's1 = [20, 30] has 2 elements.',
        's2 = [10, 20] has 2 elements.',
        's3 = [40, 50] has 2 elements.',
      ],
      concepts: ['slice length', 'range syntax'],
    },
    {
      id: 'rs-slice-17',
      title: 'Predict: Chunks',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let v = vec![1, 2, 3, 4, 5];
    let chunks: Vec<&[i32]> = v.chunks(2).collect();
    println!("{}", chunks.len());
}`,
      solution: `3`,
      hints: [
        'chunks(2) splits [1,2,3,4,5] into groups of 2.',
        'The chunks are: [1,2], [3,4], [5].',
        'There are 3 chunks (the last one is shorter).',
      ],
      concepts: ['chunks', 'collect', 'partial chunk'],
    },
    {
      id: 'rs-slice-18',
      title: 'Predict: Slice Pattern Match',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let v = vec![10, 20, 30];
    match v.as_slice() {
        [a, b, c] => println!("{}", a + b + c),
        [a, b] => println!("{}", a + b),
        _ => println!("other"),
    }
}`,
      solution: `60`,
      hints: [
        'v has exactly 3 elements.',
        'It matches the first pattern [a, b, c].',
        '10 + 20 + 30 = 60.',
      ],
      concepts: ['slice pattern', 'match', 'destructuring'],
    },
    {
      id: 'rs-slice-19',
      title: 'Refactor: Index Loop to Iter',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor the index-based loop to use slice iteration.',
      skeleton: `fn max_value(data: &[i32]) -> i32 {
    let mut max = data[0];
    let mut i = 1;
    while i < data.len() {
        if data[i] > max {
            max = data[i];
        }
        i += 1;
    }
    max
}`,
      solution: `fn max_value(data: &[i32]) -> i32 {
    *data.iter().max().unwrap()
}`,
      hints: [
        'Use .iter().max() to find the maximum.',
        'max() returns Option<&i32>, unwrap and dereference.',
        'This is more idiomatic and less error-prone.',
      ],
      concepts: ['iter', 'max', 'idiomatic Rust'],
    },
    {
      id: 'rs-slice-20',
      title: 'Refactor: Vec to Slice Parameter',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor the function to accept a slice instead of a Vec reference for greater flexibility.',
      skeleton: `fn average(data: &Vec<f64>) -> f64 {
    let sum: f64 = data.iter().sum();
    sum / data.len() as f64
}`,
      solution: `fn average(data: &[f64]) -> f64 {
    let sum: f64 = data.iter().sum();
    sum / data.len() as f64
}`,
      hints: [
        '&Vec<f64> only accepts Vec references.',
        '&[f64] accepts both Vec slices and array slices.',
        'Change `&Vec<f64>` to `&[f64]`.',
      ],
      concepts: ['&[T] vs &Vec<T>', 'API design', 'flexibility'],
    },
  ],
};
