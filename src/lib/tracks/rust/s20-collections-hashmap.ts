import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rs-hmap',
  title: '20. Collections: HashMap',
  explanation: `## Collections: HashMap<K, V>

\`HashMap<K, V>\` stores key-value pairs with O(1) average lookup.

### Creating
\`\`\`rust
use std::collections::HashMap;
let mut map = HashMap::new();
map.insert("key", "value");
\`\`\`

### Access
\`\`\`rust
map.get("key");          // Option<&V>
map["key"];              // panics if missing
map.contains_key("key"); // bool
\`\`\`

### Entry API
\`\`\`rust
map.entry("key").or_insert("default");
map.entry("key").or_insert_with(|| expensive_default());
map.entry("key").and_modify(|v| *v += 1).or_insert(0);
\`\`\`

### Iteration
\`\`\`rust
for (key, value) in &map { }
for (key, value) in &mut map { }
map.keys();    // iterator over keys
map.values();  // iterator over values
\`\`\`

### HashSet<T>
A set of unique values (HashMap<T, ()> under the hood).
\`\`\`rust
use std::collections::HashSet;
let mut set = HashSet::new();
set.insert(1);
set.contains(&1); // true
\`\`\`

### BTreeMap / BTreeSet
Sorted alternatives using B-trees instead of hashing. Ordered iteration.
`,
  exercises: [
    {
      id: 'rs-hmap-1',
      title: 'Create HashMap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Create and insert into a HashMap.',
      skeleton: `use std::collections::HashMap;
let mut scores = HashMap::__BLANK__();
scores.insert("Alice", 100);
scores.insert("Bob", 85);
println!("{:?}", scores);`,
      solution: `use std::collections::HashMap;
let mut scores = HashMap::new();
scores.insert("Alice", 100);
scores.insert("Bob", 85);
println!("{:?}", scores);`,
      hints: [
        'HashMap::new() creates an empty HashMap.',
        'insert adds a key-value pair.',
        'The answer is new.',
      ],
      concepts: ['HashMap', 'new', 'insert'],
    },
    {
      id: 'rs-hmap-2',
      title: 'Get Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Retrieve a value from a HashMap safely.',
      skeleton: `use std::collections::HashMap;
let mut map = HashMap::new();
map.insert("name", "Rust");
if let Some(val) = map.__BLANK__("name") {
    println!("Found: {}", val);
}`,
      solution: `use std::collections::HashMap;
let mut map = HashMap::new();
map.insert("name", "Rust");
if let Some(val) = map.get("name") {
    println!("Found: {}", val);
}`,
      hints: [
        'get returns Option<&V> for safe access.',
        'It does not panic on missing keys.',
        'Use .get().',
      ],
      concepts: ['get', 'Option', 'safe access'],
    },
    {
      id: 'rs-hmap-3',
      title: 'Entry or_insert',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Use the entry API to insert a default value.',
      skeleton: `use std::collections::HashMap;
let mut map = HashMap::new();
map.entry("counter").__BLANK__(0);
*map.entry("counter").or_insert(0) += 1;
println!("{:?}", map);`,
      solution: `use std::collections::HashMap;
let mut map = HashMap::new();
map.entry("counter").or_insert(0);
*map.entry("counter").or_insert(0) += 1;
println!("{:?}", map);`,
      hints: [
        'entry returns an Entry enum for the key.',
        'or_insert provides a default if the key is absent.',
        'Use .or_insert().',
      ],
      concepts: ['entry', 'or_insert', 'HashMap'],
    },
    {
      id: 'rs-hmap-4',
      title: 'HashSet Insert',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Add values to a HashSet and check membership.',
      skeleton: `use std::collections::HashSet;
let mut set = HashSet::new();
set.insert(1);
set.insert(2);
set.insert(2); // duplicate
println!("len={}, has 2={}", set.len(), set.__BLANK__(&2));`,
      solution: `use std::collections::HashSet;
let mut set = HashSet::new();
set.insert(1);
set.insert(2);
set.insert(2);
println!("len={}, has 2={}", set.len(), set.contains(&2));`,
      hints: [
        'HashSet ignores duplicate inserts.',
        'contains checks if a value is in the set.',
        'Use .contains().',
      ],
      concepts: ['HashSet', 'contains', 'uniqueness'],
    },
    {
      id: 'rs-hmap-5',
      title: 'and_modify',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use and_modify with the entry API.',
      skeleton: `use std::collections::HashMap;
let mut map = HashMap::new();
let words = vec!["hello", "world", "hello", "rust", "hello"];
for word in words {
    map.entry(word).__BLANK__(|count| *count += 1).or_insert(1);
}
println!("{:?}", map);`,
      solution: `use std::collections::HashMap;
let mut map = HashMap::new();
let words = vec!["hello", "world", "hello", "rust", "hello"];
for word in words {
    map.entry(word).and_modify(|count| *count += 1).or_insert(1);
}
println!("{:?}", map);`,
      hints: [
        'and_modify runs a closure if the entry already exists.',
        'or_insert is the fallback for new entries.',
        'Use .and_modify().',
      ],
      concepts: ['entry', 'and_modify', 'word counting'],
    },
    {
      id: 'rs-hmap-6',
      title: 'BTreeMap Ordered',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Use BTreeMap for sorted key iteration.',
      skeleton: `use std::collections::__BLANK__;
let mut map = BTreeMap::new();
map.insert(3, "three");
map.insert(1, "one");
map.insert(2, "two");
for (k, v) in &map {
    println!("{}: {}", k, v); // prints in key order
}`,
      solution: `use std::collections::BTreeMap;
let mut map = BTreeMap::new();
map.insert(3, "three");
map.insert(1, "one");
map.insert(2, "two");
for (k, v) in &map {
    println!("{}: {}", k, v);
}`,
      hints: [
        'BTreeMap keeps keys sorted.',
        'It implements Ord-based ordering.',
        'The answer is BTreeMap.',
      ],
      concepts: ['BTreeMap', 'sorted keys', 'ordered collection'],
    },
    {
      id: 'rs-hmap-7',
      title: 'Word Frequency Counter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Count word frequencies in a string.',
      skeleton: `use std::collections::HashMap;

fn word_count(text: &str) -> HashMap<&str, usize> {
    // Split text on whitespace and count occurrences
    todo!()
}

fn main() {
    let counts = word_count("the cat sat on the mat the cat");
    println!("{:?}", counts);
}`,
      solution: `use std::collections::HashMap;

fn word_count(text: &str) -> HashMap<&str, usize> {
    let mut map = HashMap::new();
    for word in text.split_whitespace() {
        *map.entry(word).or_insert(0) += 1;
    }
    map
}

fn main() {
    let counts = word_count("the cat sat on the mat the cat");
    println!("{:?}", counts);
}`,
      hints: [
        'Use split_whitespace to get words.',
        'Use entry().or_insert(0) for default count.',
        'Increment the count for each word.',
      ],
      concepts: ['word count', 'entry API', 'split_whitespace'],
    },
    {
      id: 'rs-hmap-8',
      title: 'Group By',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Group items by a key function.',
      skeleton: `use std::collections::HashMap;

fn group_by_length(words: &[&str]) -> HashMap<usize, Vec<&str>> {
    // Group words by their length
    todo!()
}

fn main() {
    let words = vec!["hi", "hey", "hello", "go", "rust", "run"];
    let groups = group_by_length(&words);
    println!("{:?}", groups);
}`,
      solution: `use std::collections::HashMap;

fn group_by_length(words: &[&str]) -> HashMap<usize, Vec<&str>> {
    let mut map: HashMap<usize, Vec<&str>> = HashMap::new();
    for word in words {
        map.entry(word.len()).or_insert_with(Vec::new).push(word);
    }
    map
}

fn main() {
    let words = vec!["hi", "hey", "hello", "go", "rust", "run"];
    let groups = group_by_length(&words);
    println!("{:?}", groups);
}`,
      hints: [
        'Use word.len() as the grouping key.',
        'Use entry().or_insert_with(Vec::new) for the default group.',
        'Push each word into its length group.',
      ],
      concepts: ['group by', 'entry', 'or_insert_with'],
    },
    {
      id: 'rs-hmap-9',
      title: 'HashSet Operations',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Implement set intersection and union.',
      skeleton: `use std::collections::HashSet;

fn set_operations(a: &[i32], b: &[i32]) {
    // Create HashSets from the slices
    // Print the intersection and union
    todo!()
}

fn main() {
    set_operations(&[1, 2, 3, 4], &[3, 4, 5, 6]);
}`,
      solution: `use std::collections::HashSet;

fn set_operations(a: &[i32], b: &[i32]) {
    let set_a: HashSet<&i32> = a.iter().collect();
    let set_b: HashSet<&i32> = b.iter().collect();

    let intersection: Vec<&&i32> = set_a.intersection(&set_b).collect();
    let union: Vec<&&i32> = set_a.union(&set_b).collect();

    println!("Intersection: {:?}", intersection);
    println!("Union: {:?}", union);
}

fn main() {
    set_operations(&[1, 2, 3, 4], &[3, 4, 5, 6]);
}`,
      hints: [
        'Collect slices into HashSets.',
        'Use .intersection() and .union() methods.',
        'These return iterators that you can collect.',
      ],
      concepts: ['HashSet', 'intersection', 'union', 'set operations'],
    },
    {
      id: 'rs-hmap-10',
      title: 'Invert a Map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Swap keys and values of a HashMap.',
      skeleton: `use std::collections::HashMap;

fn invert(map: &HashMap<String, String>) -> HashMap<String, String> {
    // Create a new map with keys and values swapped
    todo!()
}

fn main() {
    let mut map = HashMap::new();
    map.insert("a".into(), "1".into());
    map.insert("b".into(), "2".into());
    println!("{:?}", invert(&map));
}`,
      solution: `use std::collections::HashMap;

fn invert(map: &HashMap<String, String>) -> HashMap<String, String> {
    map.iter()
        .map(|(k, v)| (v.clone(), k.clone()))
        .collect()
}

fn main() {
    let mut map = HashMap::new();
    map.insert("a".into(), "1".into());
    map.insert("b".into(), "2".into());
    println!("{:?}", invert(&map));
}`,
      hints: [
        'Iterate over the map and swap each (k, v) pair.',
        'Clone the strings since we need ownership.',
        'Collect into a new HashMap.',
      ],
      concepts: ['HashMap', 'iterator', 'collect', 'invert'],
    },
    {
      id: 'rs-hmap-11',
      title: 'Two-Sum with HashMap',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Solve the two-sum problem using a HashMap.',
      skeleton: `use std::collections::HashMap;

fn two_sum(nums: &[i32], target: i32) -> Option<(usize, usize)> {
    // Find two indices whose values sum to target
    // Use a HashMap for O(n) solution
    todo!()
}

fn main() {
    println!("{:?}", two_sum(&[2, 7, 11, 15], 9));  // Some((0, 1))
    println!("{:?}", two_sum(&[1, 2, 3], 10));       // None
}`,
      solution: `use std::collections::HashMap;

fn two_sum(nums: &[i32], target: i32) -> Option<(usize, usize)> {
    let mut seen: HashMap<i32, usize> = HashMap::new();
    for (i, &num) in nums.iter().enumerate() {
        let complement = target - num;
        if let Some(&j) = seen.get(&complement) {
            return Some((j, i));
        }
        seen.insert(num, i);
    }
    None
}

fn main() {
    println!("{:?}", two_sum(&[2, 7, 11, 15], 9));
    println!("{:?}", two_sum(&[1, 2, 3], 10));
}`,
      hints: [
        'Store each number and its index in a HashMap.',
        'For each number, check if target - number exists in the map.',
        'Return the pair of indices when found.',
      ],
      concepts: ['HashMap', 'two-sum', 'complement lookup'],
    },
    {
      id: 'rs-hmap-12',
      title: 'Custom Key Type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Use a custom struct as a HashMap key.',
      skeleton: `use std::collections::HashMap;

// Define a Point struct that can be used as a HashMap key
// Implement necessary traits

fn main() {
    let mut distances: HashMap<Point, f64> = HashMap::new();
    distances.insert(Point { x: 0, y: 0 }, 0.0);
    distances.insert(Point { x: 3, y: 4 }, 5.0);
    println!("{:?}", distances.get(&Point { x: 3, y: 4 }));
}`,
      solution: `use std::collections::HashMap;

#[derive(Debug, Hash, Eq, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let mut distances: HashMap<Point, f64> = HashMap::new();
    distances.insert(Point { x: 0, y: 0 }, 0.0);
    distances.insert(Point { x: 3, y: 4 }, 5.0);
    println!("{:?}", distances.get(&Point { x: 3, y: 4 }));
}`,
      hints: [
        'HashMap keys must implement Hash and Eq.',
        'Derive Hash, Eq, and PartialEq on the struct.',
        'Only types with a consistent hash can be map keys.',
      ],
      concepts: ['Hash', 'Eq', 'custom key', 'HashMap'],
    },
    {
      id: 'rs-hmap-13',
      title: 'Missing use Import',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Fix the missing import for HashMap.',
      skeleton: `fn main() {
    let mut map = HashMap::new(); // error: not found in scope
    map.insert("key", "value");
    println!("{:?}", map);
}`,
      solution: `use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert("key", "value");
    println!("{:?}", map);
}`,
      hints: [
        'HashMap is not in the prelude.',
        'You need to import it from std::collections.',
        'Add use std::collections::HashMap; at the top.',
      ],
      concepts: ['use', 'import', 'std::collections'],
    },
    {
      id: 'rs-hmap-14',
      title: 'Overwritten Entry',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a bug where insert overwrites an existing value instead of updating.',
      skeleton: `use std::collections::HashMap;

fn count_chars(s: &str) -> HashMap<char, usize> {
    let mut map = HashMap::new();
    for c in s.chars() {
        map.insert(c, 1); // bug: always sets to 1
    }
    map
}

fn main() {
    println!("{:?}", count_chars("hello"));
    // Expected: h=1, e=1, l=2, o=1
}`,
      solution: `use std::collections::HashMap;

fn count_chars(s: &str) -> HashMap<char, usize> {
    let mut map = HashMap::new();
    for c in s.chars() {
        *map.entry(c).or_insert(0) += 1;
    }
    map
}

fn main() {
    println!("{:?}", count_chars("hello"));
}`,
      hints: [
        'insert always overwrites the existing value.',
        'Use the entry API to update existing values.',
        'entry().or_insert(0) gives a mutable reference to increment.',
      ],
      concepts: ['entry API', 'insert vs entry', 'counting'],
    },
    {
      id: 'rs-hmap-15',
      title: 'Moved Key',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Fix a use-after-move when inserting owned keys.',
      skeleton: `use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    let key = String::from("name");
    map.insert(key, "Alice");
    println!("key was: {}", key); // error: value used after move
}`,
      solution: `use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    let key = String::from("name");
    map.insert(key.clone(), "Alice");
    println!("key was: {}", key);
}`,
      hints: [
        'insert takes ownership of the key.',
        'Clone the key before inserting to keep a copy.',
        'Or use &str keys instead of String.',
      ],
      concepts: ['ownership', 'clone', 'HashMap insert'],
    },
    {
      id: 'rs-hmap-16',
      title: 'Predict Entry Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'rust',
      goal: 'Predict the output of entry API operations.',
      skeleton: `use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert("a", 1);
    map.entry("a").or_insert(99);
    map.entry("b").or_insert(99);
    println!("{} {}", map["a"], map["b"]);
}`,
      solution: `1 99`,
      hints: [
        'entry("a").or_insert(99): "a" exists with 1, so no change.',
        'entry("b").or_insert(99): "b" is missing, so inserts 99.',
        'Final: a=1, b=99.',
      ],
      concepts: ['entry', 'or_insert', 'existing vs new'],
    },
    {
      id: 'rs-hmap-17',
      title: 'Predict Iteration Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Compare HashMap and BTreeMap iteration order.',
      skeleton: `use std::collections::BTreeMap;

fn main() {
    let mut map = BTreeMap::new();
    map.insert(3, "c");
    map.insert(1, "a");
    map.insert(2, "b");
    let keys: Vec<&i32> = map.keys().collect();
    println!("{:?}", keys);
}`,
      solution: `[1, 2, 3]`,
      hints: [
        'BTreeMap always iterates in sorted key order.',
        'Unlike HashMap which has arbitrary order.',
        'Keys 3, 1, 2 are sorted to 1, 2, 3.',
      ],
      concepts: ['BTreeMap', 'sorted iteration', 'keys'],
    },
    {
      id: 'rs-hmap-18',
      title: 'Predict and_modify',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Predict entry API chaining behavior.',
      skeleton: `use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    for word in "a b a c a b".split_whitespace() {
        map.entry(word)
            .and_modify(|c| *c += 1)
            .or_insert(1);
    }
    let mut pairs: Vec<(&&str, &i32)> = map.iter().collect();
    pairs.sort_by_key(|(k, _)| **k);
    for (k, v) in pairs {
        print!("{}={} ", k, v);
    }
    println!();
}`,
      solution: `a=3 b=2 c=1 `,
      hints: [
        'Count occurrences: a appears 3 times, b twice, c once.',
        'and_modify increments existing, or_insert sets to 1.',
        'Sorted alphabetically: a=3, b=2, c=1.',
      ],
      concepts: ['and_modify', 'or_insert', 'word counting'],
    },
    {
      id: 'rs-hmap-19',
      title: 'Refactor to Entry API',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'rust',
      goal: 'Refactor contains_key + insert pattern to use the entry API.',
      skeleton: `use std::collections::HashMap;

fn categorize(words: &[&str]) -> HashMap<char, Vec<&str>> {
    let mut map: HashMap<char, Vec<&str>> = HashMap::new();
    for word in words {
        let first = word.chars().next().unwrap();
        if map.contains_key(&first) {
            map.get_mut(&first).unwrap().push(word);
        } else {
            map.insert(first, vec![word]);
        }
    }
    map
}`,
      solution: `use std::collections::HashMap;

fn categorize(words: &[&str]) -> HashMap<char, Vec<&str>> {
    let mut map: HashMap<char, Vec<&str>> = HashMap::new();
    for word in words {
        let first = word.chars().next().unwrap();
        map.entry(first).or_insert_with(Vec::new).push(word);
    }
    map
}`,
      hints: [
        'The contains_key + get_mut + insert pattern is verbose.',
        'entry().or_insert_with(Vec::new) replaces all three operations.',
        'The returned mutable reference allows direct push.',
      ],
      concepts: ['entry API', 'or_insert_with', 'refactoring'],
    },
    {
      id: 'rs-hmap-20',
      title: 'Refactor to Collect',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'rust',
      goal: 'Refactor manual HashMap building to use collect from iterator.',
      skeleton: `use std::collections::HashMap;

fn build_index(items: &[(u32, &str)]) -> HashMap<u32, String> {
    let mut map = HashMap::new();
    for (id, name) in items {
        map.insert(*id, name.to_uppercase());
    }
    map
}`,
      solution: `use std::collections::HashMap;

fn build_index(items: &[(u32, &str)]) -> HashMap<u32, String> {
    items.iter()
        .map(|(id, name)| (*id, name.to_uppercase()))
        .collect()
}`,
      hints: [
        'Iterator of (K, V) tuples can be collected into HashMap.',
        'Use map to transform each tuple.',
        'collect infers the target type from the return type.',
      ],
      concepts: ['collect', 'HashMap from iterator', 'refactoring'],
    },
  ],
};
