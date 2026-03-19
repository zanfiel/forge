import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-iterators',
  title: '16. Iterators',
  explanation: `## Iterators

Iterators are central to idiomatic Rust. The \`Iterator\` trait requires one method: \`next()\`.

### The Iterator Trait
\`\`\`rust
trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;
}
\`\`\`

### Three Ways to Iterate
- \`.iter()\` -- borrows: yields \`&T\`
- \`.iter_mut()\` -- mutable borrows: yields \`&mut T\`
- \`.into_iter()\` -- consumes: yields \`T\`

### Common Adaptors
\`map\`, \`filter\`, \`enumerate\`, \`zip\`, \`chain\`, \`take\`, \`skip\`, \`peekable\`, \`flat_map\`, \`inspect\`

### Consumers
\`collect\`, \`sum\`, \`product\`, \`count\`, \`any\`, \`all\`, \`find\`, \`position\`, \`fold\`, \`for_each\`

Iterators are **lazy** -- adaptors do nothing until consumed.
`,
  exercises: [
    {
      id: 'rs-iter-1',
      title: 'Map Transform',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use map to transform each element.',
      skeleton: `let nums = vec![1, 2, 3];
let doubled: Vec<i32> = nums.iter().__BLANK__(|x| x * 2).collect();
println!("{:?}", doubled);`,
      solution: `let nums = vec![1, 2, 3];
let doubled: Vec<i32> = nums.iter().map(|x| x * 2).collect();
println!("{:?}", doubled);`,
      hints: [
        'This adaptor applies a function to each element.',
        'It transforms each element without filtering.',
        'Use `.map()`.',
      ],
      concepts: ['map', 'iterator adaptor', 'transform'],
    },
    {
      id: 'rs-iter-2',
      title: 'Filter Elements',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Keep only even numbers.',
      skeleton: `let nums = vec![1, 2, 3, 4, 5, 6];
let evens: Vec<&i32> = nums.iter().__BLANK__(|x| *x % 2 == 0).collect();
println!("{:?}", evens);`,
      solution: `let nums = vec![1, 2, 3, 4, 5, 6];
let evens: Vec<&i32> = nums.iter().filter(|x| *x % 2 == 0).collect();
println!("{:?}", evens);`,
      hints: [
        'This adaptor keeps elements where the predicate is true.',
        'It removes elements that do not match.',
        'Use `.filter()`.',
      ],
      concepts: ['filter', 'predicate', 'iterator'],
    },
    {
      id: 'rs-iter-3',
      title: 'Fold/Reduce',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use fold to sum all elements.',
      skeleton: `let nums = vec![1, 2, 3, 4, 5];
let total = nums.iter().__BLANK__(0, |acc, &x| acc + x);
println!("{}", total);`,
      solution: `let nums = vec![1, 2, 3, 4, 5];
let total = nums.iter().fold(0, |acc, &x| acc + x);
println!("{}", total);`,
      hints: [
        'fold takes an initial value and an accumulator function.',
        'It processes each element, building up a result.',
        'Use `.fold()`.',
      ],
      concepts: ['fold', 'accumulator', 'reduce'],
    },
    {
      id: 'rs-iter-4',
      title: 'Enumerate',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Get both the index and value during iteration.',
      skeleton: `let fruits = vec!["apple", "banana", "cherry"];
for (i, fruit) in fruits.iter().__BLANK__() {
    println!("{}: {}", i, fruit);
}`,
      solution: `let fruits = vec!["apple", "banana", "cherry"];
for (i, fruit) in fruits.iter().enumerate() {
    println!("{}: {}", i, fruit);
}`,
      hints: [
        'This adaptor pairs each element with its index.',
        'It yields (usize, &T) tuples.',
        'Use `.enumerate()`.',
      ],
      concepts: ['enumerate', 'index', 'iteration'],
    },
    {
      id: 'rs-iter-5',
      title: 'Chain Two Iterators',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Combine two iterators into one.',
      skeleton: `let a = vec![1, 2];
let b = vec![3, 4];
let combined: Vec<&i32> = a.iter().__BLANK__(b.iter()).collect();
println!("{:?}", combined);`,
      solution: `let a = vec![1, 2];
let b = vec![3, 4];
let combined: Vec<&i32> = a.iter().chain(b.iter()).collect();
println!("{:?}", combined);`,
      hints: [
        'This adaptor appends one iterator after another.',
        'The result iterates through both sequentially.',
        'Use `.chain()`.',
      ],
      concepts: ['chain', 'concatenate iterators'],
    },
    {
      id: 'rs-iter-6',
      title: 'Zip Two Iterators',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Pair elements from two iterators.',
      skeleton: `let names = vec!["Alice", "Bob"];
let ages = vec![30, 25];
let pairs: Vec<(&&str, &i32)> = names.iter().__BLANK__(ages.iter()).collect();
println!("{:?}", pairs);`,
      solution: `let names = vec!["Alice", "Bob"];
let ages = vec![30, 25];
let pairs: Vec<(&&str, &i32)> = names.iter().zip(ages.iter()).collect();
println!("{:?}", pairs);`,
      hints: [
        'This adaptor pairs elements from two iterators.',
        'It stops when either iterator is exhausted.',
        'Use `.zip()`.',
      ],
      concepts: ['zip', 'pair elements', 'parallel iteration'],
    },
    {
      id: 'rs-iter-7',
      title: 'Custom Iterator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement Iterator for a Counter struct that counts from 1 to a max value.',
      skeleton: `// Write your struct and Iterator impl here`,
      solution: `struct Counter {
    current: u32,
    max: u32,
}

impl Counter {
    fn new(max: u32) -> Self {
        Counter { current: 0, max }
    }
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<u32> {
        if self.current < self.max {
            self.current += 1;
            Some(self.current)
        } else {
            None
        }
    }
}`,
      hints: [
        'Implement the Iterator trait with type Item = u32.',
        'next() returns Some(value) or None when done.',
        'Track current position in the struct.',
      ],
      concepts: ['Iterator trait', 'custom iterator', 'next()'],
    },
    {
      id: 'rs-iter-8',
      title: 'Flat Map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `flatten_words` that takes a Vec<String> of sentences and returns a Vec<String> of individual words.',
      skeleton: `// Write your function here`,
      solution: `fn flatten_words(sentences: Vec<String>) -> Vec<String> {
    sentences.iter()
        .flat_map(|s| s.split_whitespace())
        .map(String::from)
        .collect()
}`,
      hints: [
        'Use .flat_map() to split each sentence into words.',
        'flat_map flattens the nested iterators.',
        'Convert &str to String with .map(String::from).',
      ],
      concepts: ['flat_map', 'split_whitespace', 'flatten'],
    },
    {
      id: 'rs-iter-9',
      title: 'Take While',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `take_positives` that takes &[i32] and returns a Vec<i32> of elements from the start while they are positive.',
      skeleton: `// Write your function here`,
      solution: `fn take_positives(data: &[i32]) -> Vec<i32> {
    data.iter().take_while(|&&x| x > 0).copied().collect()
}`,
      hints: [
        'Use .take_while() to stop at the first non-positive.',
        'The predicate checks if the element is positive.',
        'Use .copied() to convert &i32 to i32.',
      ],
      concepts: ['take_while', 'early termination', 'copied'],
    },
    {
      id: 'rs-iter-10',
      title: 'Group By Count',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Write `frequency` that takes &[i32] and returns a HashMap<i32, usize> counting occurrences of each value.',
      skeleton: `use std::collections::HashMap;

// Write your function here`,
      solution: `use std::collections::HashMap;

fn frequency(data: &[i32]) -> HashMap<i32, usize> {
    let mut map = HashMap::new();
    for &val in data {
        *map.entry(val).or_insert(0) += 1;
    }
    map
}`,
      hints: [
        'Use a HashMap to count occurrences.',
        'The entry API is perfect for this: entry().or_insert(0).',
        'Dereference and increment the count.',
      ],
      concepts: ['HashMap', 'entry API', 'counting', 'iteration'],
    },
    {
      id: 'rs-iter-11',
      title: 'Peekable Iterator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write `sum_until_negative` that takes &[i32] and sums elements, stopping before the first negative (using peekable).',
      skeleton: `// Write your function here`,
      solution: `fn sum_until_negative(data: &[i32]) -> i32 {
    let mut iter = data.iter().peekable();
    let mut sum = 0;
    while let Some(&&val) = iter.peek() {
        if val < 0 { break; }
        sum += val;
        iter.next();
    }
    sum
}`,
      hints: [
        'Use .peekable() to look ahead without consuming.',
        'peek() returns Option<&&i32>.',
        'Break when the next value would be negative.',
      ],
      concepts: ['peekable', 'peek', 'lookahead', 'early break'],
    },
    {
      id: 'rs-iter-12',
      title: 'Scan State',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Write `running_sum` that takes &[i32] and returns a Vec<i32> of cumulative sums using .scan().',
      skeleton: `// Write your function here`,
      solution: `fn running_sum(data: &[i32]) -> Vec<i32> {
    data.iter().scan(0, |state, &x| {
        *state += x;
        Some(*state)
    }).collect()
}`,
      hints: [
        'scan is like fold but yields intermediate results.',
        'The state accumulates the running total.',
        'Return Some(*state) to yield each cumulative sum.',
      ],
      concepts: ['scan', 'running total', 'stateful iteration'],
    },
    {
      id: 'rs-iter-13',
      title: 'Fix: Lazy Iterator Not Consumed',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'This code creates an iterator chain but never consumes it. Fix it.',
      skeleton: `fn main() {
    let nums = vec![1, 2, 3, 4, 5];
    nums.iter().map(|x| x * 2);
    // Expected: print doubled values
}`,
      solution: `fn main() {
    let nums = vec![1, 2, 3, 4, 5];
    let doubled: Vec<i32> = nums.iter().map(|x| x * 2).collect();
    println!("{:?}", doubled);
}`,
      hints: [
        'Iterators are lazy -- adaptors do nothing until consumed.',
        'You need a consumer like .collect() or .for_each().',
        'Add .collect() and store the result.',
      ],
      concepts: ['lazy evaluation', 'collect', 'consumer'],
    },
    {
      id: 'rs-iter-14',
      title: 'Fix: Double Reference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'The filter closure has a double reference issue. Fix it.',
      skeleton: `fn main() {
    let nums = vec![1, 2, 3, 4, 5];
    let big: Vec<i32> = nums.iter().filter(|x| x > 3).collect();
    println!("{:?}", big);
}`,
      solution: `fn main() {
    let nums = vec![1, 2, 3, 4, 5];
    let big: Vec<i32> = nums.iter().filter(|&&x| x > 3).copied().collect();
    println!("{:?}", big);
}`,
      hints: [
        'iter() yields &i32, filter gives &&i32.',
        'You need to dereference in the closure: |&&x|.',
        'Also add .copied() before .collect() for Vec<i32>.',
      ],
      concepts: ['double reference', 'filter', 'copied'],
    },
    {
      id: 'rs-iter-15',
      title: 'Fix: into_iter After Use',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'into_iter consumes the vector, but it is used afterward. Fix it.',
      skeleton: `fn main() {
    let names = vec!["Alice", "Bob", "Charlie"];
    let upper: Vec<String> = names.into_iter().map(|s| s.to_uppercase()).collect();
    println!("Original: {:?}", names);
    println!("Upper: {:?}", upper);
}`,
      solution: `fn main() {
    let names = vec!["Alice", "Bob", "Charlie"];
    let upper: Vec<String> = names.iter().map(|s| s.to_uppercase()).collect();
    println!("Original: {:?}", names);
    println!("Upper: {:?}", upper);
}`,
      hints: [
        'into_iter() consumes the vector -- names is moved.',
        'Use .iter() instead to borrow.',
        'Change `into_iter()` to `iter()`.',
      ],
      concepts: ['iter vs into_iter', 'move', 'borrowing iteration'],
    },
    {
      id: 'rs-iter-16',
      title: 'Predict: Map and Collect',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let v: Vec<i32> = (1..=4).map(|x| x * x).collect();
    println!("{:?}", v);
}`,
      solution: `[1, 4, 9, 16]`,
      hints: [
        '1..=4 generates 1, 2, 3, 4.',
        'map squares each: 1, 4, 9, 16.',
        'collect gathers into a Vec.',
      ],
      concepts: ['range', 'map', 'collect'],
    },
    {
      id: 'rs-iter-17',
      title: 'Predict: Filter Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let count = (1..=20).filter(|x| x % 3 == 0).count();
    println!("{}", count);
}`,
      solution: `6`,
      hints: [
        'Multiples of 3 from 1 to 20: 3, 6, 9, 12, 15, 18.',
        'That is 6 numbers.',
        'count() returns the number of matching elements.',
      ],
      concepts: ['filter', 'count', 'range'],
    },
    {
      id: 'rs-iter-18',
      title: 'Predict: Zip and Sum',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'What does this program print?',
      skeleton: `fn main() {
    let a = vec![1, 2, 3];
    let b = vec![10, 20, 30];
    let sum: i32 = a.iter().zip(b.iter()).map(|(x, y)| x + y).sum();
    println!("{}", sum);
}`,
      solution: `66`,
      hints: [
        'Zip pairs: (1,10), (2,20), (3,30).',
        'Map sums: 11, 22, 33.',
        'Total sum: 11 + 22 + 33 = 66.',
      ],
      concepts: ['zip', 'map', 'sum'],
    },
    {
      id: 'rs-iter-19',
      title: 'Refactor: Index Loop to Iterator',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Replace the index-based loop with iterator methods.',
      skeleton: `fn find_first_even(data: &[i32]) -> Option<i32> {
    let mut i = 0;
    while i < data.len() {
        if data[i] % 2 == 0 {
            return Some(data[i]);
        }
        i += 1;
    }
    None
}`,
      solution: `fn find_first_even(data: &[i32]) -> Option<i32> {
    data.iter().find(|&&x| x % 2 == 0).copied()
}`,
      hints: [
        'Use .find() to locate the first matching element.',
        'find returns Option<&&i32>, use .copied() for Option<i32>.',
        'One line replaces the entire loop.',
      ],
      concepts: ['find', 'copied', 'iterator refactoring'],
    },
    {
      id: 'rs-iter-20',
      title: 'Refactor: Multiple Loops to Chain',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Combine these separate operations into a single iterator chain.',
      skeleton: `fn process(data: &[i32]) -> Vec<String> {
    let mut filtered = Vec::new();
    for &x in data {
        if x > 0 {
            filtered.push(x);
        }
    }
    let mut doubled = Vec::new();
    for x in &filtered {
        doubled.push(x * 2);
    }
    let mut result = Vec::new();
    for x in &doubled {
        result.push(format!("val:{}", x));
    }
    result
}`,
      solution: `fn process(data: &[i32]) -> Vec<String> {
    data.iter()
        .filter(|&&x| x > 0)
        .map(|&x| x * 2)
        .map(|x| format!("val:{}", x))
        .collect()
}`,
      hints: [
        'Chain filter, map, map, collect in one pipeline.',
        'No intermediate vectors needed.',
        'Iterators are lazy and compose efficiently.',
      ],
      concepts: ['iterator chain', 'lazy evaluation', 'no allocation'],
    },
  ],
};
