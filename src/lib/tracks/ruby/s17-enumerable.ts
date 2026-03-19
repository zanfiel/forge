import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-enumerable',
  title: '17. Enumerable',
  explanation: `## Enumerable in Ruby

The \`Enumerable\` module provides a rich set of collection methods. Any class that defines \`each\` can include Enumerable.

\`\`\`ruby
# min / max
[3, 1, 4, 1, 5].min       # => 1
[3, 1, 4, 1, 5].max       # => 5
[3, 1, 4, 1, 5].minmax    # => [1, 5]

# sort_by
["banana", "apple", "cherry"].sort_by { |s| s.length }
# => ["apple", "banana", "cherry"]

# group_by
(1..6).group_by { |n| n % 3 }
# => {1=>[1, 4], 2=>[2, 5], 0=>[3, 6]}

# chunk - groups consecutive elements
[1, 1, 2, 2, 3, 1, 1].chunk { |n| n }.to_a
# => [[1, [1, 1]], [2, [2, 2]], [3, [3]], [1, [1, 1]]]

# zip
[1, 2, 3].zip(["a", "b", "c"])
# => [[1, "a"], [2, "b"], [3, "c"]]

# flat_map
[[1, 2], [3, 4]].flat_map { |a| a }  # => [1, 2, 3, 4]

# tally (Ruby 2.7+)
["a", "b", "a", "c", "a"].tally  # => {"a"=>3, "b"=>1, "c"=>1}

# filter_map (Ruby 2.7+)
[1, 2, 3, nil, 5].filter_map { |n| n&.to_s }
# => ["1", "2", "3", "5"]
\`\`\``,
  exercises: [
    {
      id: 'rb-enumerable-1',
      title: 'Find min and max',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blanks to find the minimum and maximum values.',
      skeleton: `scores = [85, 92, 78, 95, 88]
puts scores.___
puts scores.___`,
      solution: `scores = [85, 92, 78, 95, 88]
puts scores.min
puts scores.max`,
      hints: [
        '`min` returns the smallest element.',
        '`max` returns the largest element.',
        'Both use <=> for comparison.',
      ],
      concepts: ['min', 'max', 'Enumerable'],
    },
    {
      id: 'rb-enumerable-2',
      title: 'sort_by',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to sort words by their length.',
      skeleton: `words = ["elephant", "cat", "mouse", "dog"]
sorted = words.___ { |w| w.___ }`,
      solution: `words = ["elephant", "cat", "mouse", "dog"]
sorted = words.sort_by { |w| w.length }`,
      hints: [
        '`sort_by` sorts using the block return value as the sort key.',
        '`.length` returns the number of characters.',
        'Shorter words come first by default.',
      ],
      concepts: ['sort_by', 'sorting', 'blocks'],
    },
    {
      id: 'rb-enumerable-3',
      title: 'group_by',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to group numbers by even/odd.',
      skeleton: `numbers = [1, 2, 3, 4, 5, 6]
grouped = numbers.___ { |n| n.even? ? :even : :odd }`,
      solution: `numbers = [1, 2, 3, 4, 5, 6]
grouped = numbers.group_by { |n| n.even? ? :even : :odd }`,
      hints: [
        '`group_by` returns a hash where keys are the block results.',
        'Elements with the same key are grouped into arrays.',
        'The ternary operator chooses :even or :odd.',
      ],
      concepts: ['group_by', 'hashing', 'categorization'],
    },
    {
      id: 'rb-enumerable-4',
      title: 'zip Arrays Together',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to zip names with ages.',
      skeleton: `names = ["Alice", "Bob", "Carol"]
ages = [25, 30, 28]
pairs = names.___(ages)`,
      solution: `names = ["Alice", "Bob", "Carol"]
ages = [25, 30, 28]
pairs = names.zip(ages)`,
      hints: [
        '`zip` combines corresponding elements from arrays.',
        'Result is [[\"Alice\", 25], [\"Bob\", 30], [\"Carol\", 28]].',
        'Elements are paired by position.',
      ],
      concepts: ['zip', 'array-combination', 'pairing'],
    },
    {
      id: 'rb-enumerable-5',
      title: 'flat_map',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to extract all tags from posts and flatten.',
      skeleton: `posts = [
  { title: "Ruby", tags: ["ruby", "code"] },
  { title: "Rails", tags: ["rails", "web"] }
]
all_tags = posts.___ { |p| p[:tags] }`,
      solution: `posts = [
  { title: "Ruby", tags: ["ruby", "code"] },
  { title: "Rails", tags: ["rails", "web"] }
]
all_tags = posts.flat_map { |p| p[:tags] }`,
      hints: [
        '`flat_map` maps then flattens one level.',
        'It combines map + flatten into one step.',
        'Result: ["ruby", "code", "rails", "web"].',
      ],
      concepts: ['flat_map', 'flattening', 'nested-data'],
    },
    {
      id: 'rb-enumerable-6',
      title: 'tally',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to count occurrences of each fruit.',
      skeleton: `fruits = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = fruits.___`,
      solution: `fruits = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = fruits.tally`,
      hints: [
        '`tally` counts occurrences and returns a hash.',
        'Result: {"apple"=>3, "banana"=>2, "cherry"=>1}.',
        'Available since Ruby 2.7.',
      ],
      concepts: ['tally', 'counting', 'hash'],
    },
    {
      id: 'rb-enumerable-7',
      title: 'Write a Custom min_by',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method my_min_by(arr) that takes an array and a block, returning the element for which the block returns the smallest value.',
      skeleton: `# Write your my_min_by method`,
      solution: `def my_min_by(arr)
  best = nil
  best_val = nil
  arr.each do |el|
    val = yield(el)
    if best_val.nil? || val < best_val
      best = el
      best_val = val
    end
  end
  best
end`,
      hints: [
        'Track the best element and its block value.',
        'Compare each element\'s block value with the current best.',
        'Return the element, not the block value.',
      ],
      concepts: ['min_by', 'custom-iterators', 'yield'],
    },
    {
      id: 'rb-enumerable-8',
      title: 'Write a group_by Implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method my_group_by(arr) that takes an array and a block, returning a hash where keys are block results and values are arrays of matching elements.',
      skeleton: `# Write your my_group_by method`,
      solution: `def my_group_by(arr)
  result = {}
  arr.each do |el|
    key = yield(el)
    result[key] ||= []
    result[key] << el
  end
  result
end`,
      hints: [
        'Create an empty hash for the result.',
        'Use the block result as the hash key.',
        'Initialize missing keys with empty arrays using ||=.',
      ],
      concepts: ['group_by', 'hash-building', 'yield'],
    },
    {
      id: 'rb-enumerable-9',
      title: 'Write filter_map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method my_filter_map(arr) that takes an array and a block, returning only the non-nil, non-false block results.',
      skeleton: `# Write your my_filter_map method`,
      solution: `def my_filter_map(arr)
  result = []
  arr.each do |el|
    val = yield(el)
    result << val if val
  end
  result
end`,
      hints: [
        'Execute the block for each element.',
        'Only include the result if it is truthy.',
        'This combines map + compact/select.',
      ],
      concepts: ['filter_map', 'truthy', 'custom-iterators'],
    },
    {
      id: 'rb-enumerable-10',
      title: 'Write a chunk Implementation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a method my_chunk(arr) that groups consecutive elements where the block returns the same value. Return an array of [key, elements] pairs.',
      skeleton: `# Write your my_chunk method`,
      solution: `def my_chunk(arr)
  return [] if arr.empty?
  result = []
  current_key = yield(arr[0])
  current_group = [arr[0]]

  arr[1..].each do |el|
    key = yield(el)
    if key == current_key
      current_group << el
    else
      result << [current_key, current_group]
      current_key = key
      current_group = [el]
    end
  end
  result << [current_key, current_group]
  result
end`,
      hints: [
        'Track the current key and group of elements.',
        'When the key changes, push the current group and start a new one.',
        'Don\'t forget to push the last group after the loop.',
      ],
      concepts: ['chunk', 'consecutive-grouping', 'custom-iterators'],
    },
    {
      id: 'rb-enumerable-11',
      title: 'Write zip with Block',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method zip_with(arr1, arr2) that takes two arrays and a block, yielding pairs and returning the block results. Example: zip_with([1,2],[3,4]) { |a,b| a+b } => [4,6].',
      skeleton: `# Write your zip_with method`,
      solution: `def zip_with(arr1, arr2)
  arr1.zip(arr2).map { |a, b| yield(a, b) }
end`,
      hints: [
        'Use zip to pair elements from both arrays.',
        'Use map to transform each pair with the block.',
        'yield(a, b) passes both elements to the block.',
      ],
      concepts: ['zip', 'map', 'yield'],
    },
    {
      id: 'rb-enumerable-12',
      title: 'Write a Frequency Sorter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method sort_by_frequency(arr) that returns elements sorted by frequency (most common first), then alphabetically for ties.',
      skeleton: `# Write your sort_by_frequency method`,
      solution: `def sort_by_frequency(arr)
  counts = arr.tally
  arr.uniq.sort_by { |el| [-counts[el], el] }
end`,
      hints: [
        'Use tally to count occurrences.',
        'sort_by with a negative count sorts descending.',
        'The second sort key handles alphabetical ties.',
      ],
      concepts: ['tally', 'sort_by', 'multi-key-sort'],
    },
    {
      id: 'rb-enumerable-13',
      title: 'Fix sort_by Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the code so it sorts people by age in descending order (oldest first).',
      skeleton: `people = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Carol", age: 35 }
]
sorted = people.sort_by { |p| p[:age] }
puts sorted.map { |p| p[:name] }.inspect`,
      solution: `people = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Carol", age: 35 }
]
sorted = people.sort_by { |p| -p[:age] }
puts sorted.map { |p| p[:name] }.inspect`,
      hints: [
        'sort_by sorts ascending by default.',
        'Negate the value to sort descending.',
        'Use `-p[:age]` for descending order.',
      ],
      concepts: ['sort_by', 'descending-sort', 'common-bugs'],
    },
    {
      id: 'rb-enumerable-14',
      title: 'Fix flat_map vs map Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so all_words is a flat array of individual words.',
      skeleton: `sentences = ["hello world", "foo bar", "ruby rocks"]
all_words = sentences.map { |s| s.split(" ") }
puts all_words.inspect`,
      solution: `sentences = ["hello world", "foo bar", "ruby rocks"]
all_words = sentences.flat_map { |s| s.split(" ") }
puts all_words.inspect`,
      hints: [
        'map returns nested arrays: [["hello","world"], ...].',
        'flat_map flattens one level after mapping.',
        'Change `map` to `flat_map`.',
      ],
      concepts: ['flat_map', 'map', 'flattening'],
    },
    {
      id: 'rb-enumerable-15',
      title: 'Fix min_by Nil Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code to handle nil values when finding the shortest word.',
      skeleton: `words = ["hello", nil, "hi", nil, "hey"]
shortest = words.min_by { |w| w.length }
puts shortest`,
      solution: `words = ["hello", nil, "hi", nil, "hey"]
shortest = words.compact.min_by { |w| w.length }
puts shortest`,
      hints: [
        'nil.length raises NoMethodError.',
        'Use `compact` to remove nil values before min_by.',
        'Alternatively use `filter_map` or safe navigation.',
      ],
      concepts: ['compact', 'nil-safety', 'min_by'],
    },
    {
      id: 'rb-enumerable-16',
      title: 'Predict group_by Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `result = (1..8).group_by { |n| n % 3 }
puts result[0].inspect`,
      solution: `[3, 6]`,
      hints: [
        'group_by creates a hash keyed by block result.',
        'n % 3 == 0 for multiples of 3.',
        'In range 1..8, multiples of 3 are 3 and 6.',
      ],
      concepts: ['group_by', 'modulo', 'hash-access'],
    },
    {
      id: 'rb-enumerable-17',
      title: 'Predict tally Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `letters = "banana".chars.tally
puts letters["a"]`,
      solution: `3`,
      hints: [
        'chars splits "banana" into ["b","a","n","a","n","a"].',
        'tally counts each character.',
        '"a" appears 3 times.',
      ],
      concepts: ['tally', 'chars', 'string-methods'],
    },
    {
      id: 'rb-enumerable-18',
      title: 'Predict zip Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `a = [1, 2, 3]
b = ["x", "y"]
puts a.zip(b).inspect`,
      solution: `[[1, "x"], [2, "y"], [3, nil]]`,
      hints: [
        'zip pairs elements by index.',
        'When arrays have different lengths, missing values are nil.',
        'Array a has 3 elements, b has 2, so the last pair has nil.',
      ],
      concepts: ['zip', 'nil-padding', 'array-combination'],
    },
    {
      id: 'rb-enumerable-19',
      title: 'Refactor Loop to Enumerable Methods',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor this imperative code to use Enumerable methods.',
      skeleton: `data = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Carol", score: 78 },
  { name: "Dave", score: 95 }
]

top_names = []
data.each do |d|
  if d[:score] >= 85
    top_names << d[:name]
  end
end
top_names.sort!
puts top_names.inspect`,
      solution: `data = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Carol", score: 78 },
  { name: "Dave", score: 95 }
]

top_names = data.select { |d| d[:score] >= 85 }.map { |d| d[:name] }.sort
puts top_names.inspect`,
      hints: [
        'Use select to filter by score >= 85.',
        'Chain map to extract names.',
        'Chain sort for alphabetical order.',
      ],
      concepts: ['select', 'map', 'sort', 'method-chaining'],
    },
    {
      id: 'rb-enumerable-20',
      title: 'Refactor to each_with_object',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor this reduce with merge into each_with_object.',
      skeleton: `pairs = [["name", "Alice"], ["age", "30"], ["city", "NYC"]]
hash = pairs.reduce({}) do |acc, pair|
  acc.merge(pair[0] => pair[1])
end
puts hash.inspect`,
      solution: `pairs = [["name", "Alice"], ["age", "30"], ["city", "NYC"]]
hash = pairs.each_with_object({}) do |(key, value), h|
  h[key] = value
end
puts hash.inspect`,
      hints: [
        'each_with_object passes the accumulator as a second parameter.',
        'Destructure the pair into (key, value) in the block params.',
        'Mutate the hash directly instead of creating new hashes with merge.',
      ],
      concepts: ['each_with_object', 'destructuring', 'hash-building'],
    },
  ],
};
