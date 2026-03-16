import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-vec',
  title: '19. Collections: Vec',
  explanation: `## Collections: Vec<T>

\`Vec<T>\` is Rust's growable array type, the most commonly used collection.

### Creating Vectors
\`\`\`rust
let v1: Vec<i32> = Vec::new();
let v2 = vec![1, 2, 3];
let v3 = vec![0; 5]; // [0, 0, 0, 0, 0]
\`\`\`

### Basic Operations
\`\`\`rust
let mut v = vec![1, 2, 3];
v.push(4);           // append
v.pop();             // remove last -> Option<T>
v.insert(1, 10);     // insert at index
v.remove(0);         // remove at index
v.len();             // length
v.is_empty();        // check empty
\`\`\`

### Accessing Elements
\`\`\`rust
let third = &v[2];           // panics if out of bounds
let third = v.get(2);        // returns Option<&T>
\`\`\`

### Iteration
\`\`\`rust
for val in &v { }            // immutable
for val in &mut v { }        // mutable
for val in v { }             // consuming
\`\`\`

### Useful Methods
\`\`\`rust
v.retain(|x| *x > 2);       // keep matching
v.dedup();                   // remove consecutive duplicates
v.sort();                    // sort in place
v.sort_by(|a, b| b.cmp(a)); // custom sort
v.drain(1..3);               // remove range, return iterator
v.split_off(2);              // split into two vecs
v.extend([4, 5, 6]);         // append from iterator
\`\`\`

### Capacity
\`\`\`rust
let mut v = Vec::with_capacity(10);
v.capacity(); // 10
v.shrink_to_fit();
\`\`\`
`,
  exercises: [
    {
      id: 'rs-vec-1',
      title: 'Create Vec with Macro',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a vector using the vec! macro.',
      skeleton: `let nums = __BLANK__[1, 2, 3, 4, 5];
println!("{:?}", nums);`,
      solution: `let nums = vec![1, 2, 3, 4, 5];
println!("{:?}", nums);`,
      hints: [
        'The vec! macro creates a new Vec from literal values.',
        'Syntax: vec![elem1, elem2, ...]',
        'The answer is vec!',
      ],
      concepts: ['vec!', 'Vec creation', 'macro'],
    },
    {
      id: 'rs-vec-2',
      title: 'Push and Pop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Add and remove elements from a Vec.',
      skeleton: `let mut v = vec![1, 2, 3];
v.__BLANK__(4);
let last = v.pop();
println!("{:?}, last={:?}", v, last);`,
      solution: `let mut v = vec![1, 2, 3];
v.push(4);
let last = v.pop();
println!("{:?}, last={:?}", v, last);`,
      hints: [
        'push adds an element to the end.',
        'pop removes and returns the last element as Option<T>.',
        'The answer is push.',
      ],
      concepts: ['push', 'pop', 'Vec mutation'],
    },
    {
      id: 'rs-vec-3',
      title: 'Safe Access with get',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Access a Vec element safely using get.',
      skeleton: `let v = vec![10, 20, 30];
match v.__BLANK__(1) {
    Some(val) => println!("Found: {}", val),
    None => println!("Not found"),
}`,
      solution: `let v = vec![10, 20, 30];
match v.get(1) {
    Some(val) => println!("Found: {}", val),
    None => println!("Not found"),
}`,
      hints: [
        'get returns Option<&T> instead of panicking.',
        'It returns None for out-of-bounds indices.',
        'Use .get(index).',
      ],
      concepts: ['get', 'safe access', 'Option'],
    },
    {
      id: 'rs-vec-4',
      title: 'Vec of Repeated Values',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a Vec with repeated values.',
      skeleton: `let zeros = vec![0; __BLANK__];
assert_eq!(zeros.len(), 5);
println!("{:?}", zeros);`,
      solution: `let zeros = vec![0; 5];
assert_eq!(zeros.len(), 5);
println!("{:?}", zeros);`,
      hints: [
        'vec![value; count] creates count copies of value.',
        'We need 5 zeros.',
        'The answer is 5.',
      ],
      concepts: ['vec! repeat', 'initialization', 'Vec creation'],
    },
    {
      id: 'rs-vec-5',
      title: 'Retain Elements',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Keep only elements matching a predicate.',
      skeleton: `let mut v = vec![1, 2, 3, 4, 5, 6, 7, 8];
v.__BLANK__(|x| *x % 2 == 0);
println!("{:?}", v); // [2, 4, 6, 8]`,
      solution: `let mut v = vec![1, 2, 3, 4, 5, 6, 7, 8];
v.retain(|x| *x % 2 == 0);
println!("{:?}", v); // [2, 4, 6, 8]`,
      hints: [
        'retain keeps elements where the predicate returns true.',
        'It modifies the Vec in place.',
        'Use .retain().',
      ],
      concepts: ['retain', 'filter in-place', 'predicate'],
    },
    {
      id: 'rs-vec-6',
      title: 'Sort with Custom Comparator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Sort a Vec in descending order.',
      skeleton: `let mut v = vec![3, 1, 4, 1, 5, 9, 2, 6];
v.sort_by(|a, b| b.__BLANK__(a));
println!("{:?}", v);`,
      solution: `let mut v = vec![3, 1, 4, 1, 5, 9, 2, 6];
v.sort_by(|a, b| b.cmp(a));
println!("{:?}", v);`,
      hints: [
        'sort_by takes a comparator closure.',
        'Reverse the order of comparison for descending sort.',
        'Use b.cmp(a) instead of a.cmp(b).',
      ],
      concepts: ['sort_by', 'Ord', 'descending sort'],
    },
    {
      id: 'rs-vec-7',
      title: 'Vec from Iterator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create a Vec by collecting from an iterator.',
      skeleton: `// Create a Vec of squares from 1 to 10
// Use a range and map

fn squares() -> Vec<i32> {
    todo!()
}

fn main() {
    println!("{:?}", squares());
}`,
      solution: `fn squares() -> Vec<i32> {
    (1..=10).map(|x| x * x).collect()
}

fn main() {
    println!("{:?}", squares());
}`,
      hints: [
        'Use a range 1..=10 for inclusive range.',
        'Use .map() to square each element.',
        'Use .collect() to gather into a Vec.',
      ],
      concepts: ['collect', 'range', 'map', 'iterator to Vec'],
    },
    {
      id: 'rs-vec-8',
      title: 'Drain and Collect',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use drain to remove a range of elements and collect them.',
      skeleton: `fn split_at_drain(v: &mut Vec<i32>, start: usize, end: usize) -> Vec<i32> {
    // Remove elements from start..end and return them
    // The original Vec should have those elements removed
    todo!()
}

fn main() {
    let mut v = vec![1, 2, 3, 4, 5, 6];
    let removed = split_at_drain(&mut v, 1, 4);
    println!("remaining: {:?}", v);  // [1, 5, 6]
    println!("removed: {:?}", removed); // [2, 3, 4]
}`,
      solution: `fn split_at_drain(v: &mut Vec<i32>, start: usize, end: usize) -> Vec<i32> {
    v.drain(start..end).collect()
}

fn main() {
    let mut v = vec![1, 2, 3, 4, 5, 6];
    let removed = split_at_drain(&mut v, 1, 4);
    println!("remaining: {:?}", v);
    println!("removed: {:?}", removed);
}`,
      hints: [
        'drain removes a range and returns an iterator over removed elements.',
        'Use .drain(start..end) on the Vec.',
        'Collect the drain iterator into a new Vec.',
      ],
      concepts: ['drain', 'range', 'collect'],
    },
    {
      id: 'rs-vec-9',
      title: 'Dedup Sorted',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Remove all duplicate values from a Vec.',
      skeleton: `fn unique(mut v: Vec<i32>) -> Vec<i32> {
    // Sort and deduplicate the vector
    // Return the result
    todo!()
}

fn main() {
    println!("{:?}", unique(vec![3, 1, 2, 3, 1, 4, 2]));
    // Expected: [1, 2, 3, 4]
}`,
      solution: `fn unique(mut v: Vec<i32>) -> Vec<i32> {
    v.sort();
    v.dedup();
    v
}

fn main() {
    println!("{:?}", unique(vec![3, 1, 2, 3, 1, 4, 2]));
}`,
      hints: [
        'dedup only removes consecutive duplicates.',
        'Sort first so duplicates become consecutive.',
        'Call sort() then dedup() on the Vec.',
      ],
      concepts: ['sort', 'dedup', 'unique values'],
    },
    {
      id: 'rs-vec-10',
      title: 'Split Off',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Split a Vec into two at a given index.',
      skeleton: `fn halve(mut v: Vec<i32>) -> (Vec<i32>, Vec<i32>) {
    // Split the vector in half
    // If odd length, first half gets the extra element
    todo!()
}

fn main() {
    let (a, b) = halve(vec![1, 2, 3, 4, 5]);
    println!("first: {:?}", a);  // [1, 2, 3]
    println!("second: {:?}", b); // [4, 5]
}`,
      solution: `fn halve(mut v: Vec<i32>) -> (Vec<i32>, Vec<i32>) {
    let mid = (v.len() + 1) / 2;
    let second = v.split_off(mid);
    (v, second)
}

fn main() {
    let (a, b) = halve(vec![1, 2, 3, 4, 5]);
    println!("first: {:?}", a);
    println!("second: {:?}", b);
}`,
      hints: [
        'split_off(index) splits the Vec at the given index.',
        'It returns a new Vec with elements from index onward.',
        'The original Vec retains elements before the index.',
      ],
      concepts: ['split_off', 'Vec splitting', 'midpoint'],
    },
    {
      id: 'rs-vec-11',
      title: 'Windows Iterator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use windows to find consecutive pairs that sum to a target.',
      skeleton: `fn find_pair_sum(nums: &[i32], target: i32) -> Option<(i32, i32)> {
    // Find the first pair of consecutive elements that sum to target
    todo!()
}

fn main() {
    println!("{:?}", find_pair_sum(&[1, 3, 5, 2, 8], 7));  // Some((5, 2))
    println!("{:?}", find_pair_sum(&[1, 2, 3], 10));         // None
}`,
      solution: `fn find_pair_sum(nums: &[i32], target: i32) -> Option<(i32, i32)> {
    nums.windows(2)
        .find(|w| w[0] + w[1] == target)
        .map(|w| (w[0], w[1]))
}

fn main() {
    println!("{:?}", find_pair_sum(&[1, 3, 5, 2, 8], 7));
    println!("{:?}", find_pair_sum(&[1, 2, 3], 10));
}`,
      hints: [
        'windows(n) returns overlapping slices of size n.',
        'Use .find() to locate the first matching window.',
        'Map the found slice to a tuple.',
      ],
      concepts: ['windows', 'slice iteration', 'find'],
    },
    {
      id: 'rs-vec-12',
      title: 'Vec of Enums',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Store different types in a Vec using an enum.',
      skeleton: `// Define an enum Value that can hold i32, f64, or String
// Write a function that sums all numeric values in a Vec<Value>

fn sum_numeric(values: &[Value]) -> f64 {
    todo!()
}

fn main() {
    let data = vec![
        Value::Int(10),
        Value::Float(3.14),
        Value::Text(String::from("hello")),
        Value::Int(20),
    ];
    println!("Sum: {}", sum_numeric(&data));
}`,
      solution: `enum Value {
    Int(i32),
    Float(f64),
    Text(String),
}

fn sum_numeric(values: &[Value]) -> f64 {
    values.iter().fold(0.0, |acc, v| match v {
        Value::Int(n) => acc + *n as f64,
        Value::Float(f) => acc + f,
        Value::Text(_) => acc,
    })
}

fn main() {
    let data = vec![
        Value::Int(10),
        Value::Float(3.14),
        Value::Text(String::from("hello")),
        Value::Int(20),
    ];
    println!("Sum: {}", sum_numeric(&data));
}`,
      hints: [
        'An enum can hold different types in each variant.',
        'Use fold to accumulate the sum, matching on each variant.',
        'Skip Text variants, convert Int to f64.',
      ],
      concepts: ['enum', 'Vec of enums', 'fold', 'heterogeneous collection'],
    },
    {
      id: 'rs-vec-13',
      title: 'Index Out of Bounds',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix a panic from indexing beyond Vec length.',
      skeleton: `fn main() {
    let v = vec![1, 2, 3];
    let val = v[3]; // panics: index out of bounds
    println!("{}", val);
}`,
      solution: `fn main() {
    let v = vec![1, 2, 3];
    let val = v.get(3).copied().unwrap_or(0);
    println!("{}", val);
}`,
      hints: [
        'Direct indexing panics on out-of-bounds access.',
        'Use .get() for safe access returning Option.',
        'Provide a default with unwrap_or.',
      ],
      concepts: ['get', 'bounds checking', 'safe access'],
    },
    {
      id: 'rs-vec-14',
      title: 'Borrow While Mutating',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix simultaneous borrow and mutation of a Vec.',
      skeleton: `fn main() {
    let mut v = vec![1, 2, 3, 4, 5];
    let first = &v[0];
    v.push(6); // error: mutable borrow while immutable borrow is active
    println!("first: {}", first);
}`,
      solution: `fn main() {
    let mut v = vec![1, 2, 3, 4, 5];
    let first = v[0]; // copy the value instead of borrowing
    v.push(6);
    println!("first: {}", first);
}`,
      hints: [
        'push may reallocate, invalidating existing references.',
        'Copy the value instead of holding a reference.',
        'Remove the & to copy the i32 value.',
      ],
      concepts: ['borrow checker', 'Vec reallocation', 'copy vs reference'],
    },
    {
      id: 'rs-vec-15',
      title: 'Extend Lifetime Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Fix a bug where drain iterator outlives the Vec mutation.',
      skeleton: `fn main() {
    let mut v = vec![1, 2, 3, 4, 5];
    let drained: Vec<i32> = v.drain(0..3).collect();
    v.extend(drained.iter().map(|x| x * 10));
    // But we also want the original drained values:
    let total: i32 = drained.iter().chain(v.iter()).sum();
    println!("total: {}", total);
}`,
      solution: `fn main() {
    let mut v = vec![1, 2, 3, 4, 5];
    let drained: Vec<i32> = v.drain(0..3).collect();
    v.extend(drained.iter().map(|x| x * 10));
    let total: i32 = drained.iter().chain(v.iter()).sum();
    println!("total: {}", total);
}`,
      hints: [
        'This code actually compiles -- the bug is logical.',
        'drain(0..3) removes [1,2,3], leaving [4,5].',
        'Then extend adds [10,20,30]. Total: 1+2+3+4+5+10+20+30 = 75.',
      ],
      concepts: ['drain', 'extend', 'iterator chain'],
    },
    {
      id: 'rs-vec-16',
      title: 'Predict Vec Operations',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the output of basic Vec operations.',
      skeleton: `fn main() {
    let mut v = vec![1, 2, 3];
    v.push(4);
    v.insert(0, 0);
    v.remove(2);
    println!("{:?}", v);
}`,
      solution: `[0, 1, 3, 4]`,
      hints: [
        'Start: [1,2,3]. Push 4: [1,2,3,4].',
        'Insert 0 at index 0: [0,1,2,3,4].',
        'Remove at index 2 (which is 2): [0,1,3,4].',
      ],
      concepts: ['push', 'insert', 'remove', 'Vec'],
    },
    {
      id: 'rs-vec-17',
      title: 'Predict Capacity',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict Vec length and capacity behavior.',
      skeleton: `fn main() {
    let mut v = Vec::with_capacity(4);
    v.push(1);
    v.push(2);
    println!("{} {}", v.len(), v.capacity());
    v.push(3);
    v.push(4);
    v.push(5);
    println!("{} {}", v.len(), v.capacity() >= 5);
}`,
      solution: `2 4
5 true`,
      hints: [
        'with_capacity(4) allocates space for 4 but len is 0.',
        'After 2 pushes: len=2, capacity=4.',
        'After 5 pushes: len=5, capacity is at least 5 (likely 8).',
      ],
      concepts: ['capacity', 'len', 'Vec growth'],
    },
    {
      id: 'rs-vec-18',
      title: 'Predict Retain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict the result of retain and dedup.',
      skeleton: `fn main() {
    let mut v = vec![1, 1, 2, 3, 3, 3, 4, 5, 5];
    v.dedup();
    println!("{:?}", v);
    v.retain(|x| x % 2 != 0);
    println!("{:?}", v);
}`,
      solution: `[1, 2, 3, 4, 5]
[1, 3, 5]`,
      hints: [
        'dedup removes consecutive duplicates: [1,2,3,4,5].',
        'retain keeps odd numbers: [1,3,5].',
        'dedup requires the Vec to be sorted for full dedup.',
      ],
      concepts: ['dedup', 'retain', 'Vec'],
    },
    {
      id: 'rs-vec-19',
      title: 'Refactor Loops to Iterators',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor imperative Vec operations to use iterator methods.',
      skeleton: `fn process(data: Vec<i32>) -> Vec<String> {
    let mut result = Vec::new();
    for item in &data {
        if *item > 0 {
            let doubled = item * 2;
            result.push(format!("val={}", doubled));
        }
    }
    result
}`,
      solution: `fn process(data: Vec<i32>) -> Vec<String> {
    data.iter()
        .filter(|&&x| x > 0)
        .map(|x| format!("val={}", x * 2))
        .collect()
}`,
      hints: [
        'Replace the for loop with an iterator chain.',
        'Use filter for the condition, map for the transformation.',
        'Collect into Vec<String>.',
      ],
      concepts: ['iterator', 'filter', 'map', 'collect', 'refactoring'],
    },
    {
      id: 'rs-vec-20',
      title: 'Refactor Index Access',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor index-based iteration to idiomatic Rust.',
      skeleton: `fn matrix_sum(matrix: &Vec<Vec<i32>>) -> i32 {
    let mut sum = 0;
    let mut i = 0;
    while i < matrix.len() {
        let mut j = 0;
        while j < matrix[i].len() {
            sum += matrix[i][j];
            j += 1;
        }
        i += 1;
    }
    sum
}`,
      solution: `fn matrix_sum(matrix: &[Vec<i32>]) -> i32 {
    matrix.iter().flat_map(|row| row.iter()).sum()
}`,
      hints: [
        'Use &[Vec<i32>] instead of &Vec<Vec<i32>> (clippy lint).',
        'flat_map flattens nested iterators.',
        'Use .sum() to add all elements.',
      ],
      concepts: ['flat_map', 'sum', 'slice parameter', 'idiomatic Rust'],
    },
  ],
};
