import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-arr',
  title: '05. Arrays',
  explanation: `## Arrays in Ruby

Arrays are ordered, integer-indexed collections that can hold any type of object.

### Creating Arrays

\`\`\`ruby
arr = [1, 2, 3]
arr = Array.new(3, 0)    # => [0, 0, 0]
arr = Array.new(3) { |i| i * 2 }  # => [0, 2, 4]
words = %w[apple banana cherry]    # => ["apple", "banana", "cherry"]
\`\`\`

### Adding and Removing Elements

\`\`\`ruby
arr = [1, 2, 3]
arr.push(4)       # => [1, 2, 3, 4]   (add to end)
arr << 5          # => [1, 2, 3, 4, 5] (shovel operator)
arr.pop           # => 5, arr is [1, 2, 3, 4]
arr.unshift(0)    # => [0, 1, 2, 3, 4] (add to front)
arr.shift         # => 0, arr is [1, 2, 3, 4]
\`\`\`

### Iteration and Transformation

\`\`\`ruby
[1, 2, 3].each { |x| puts x }
[1, 2, 3].map { |x| x * 2 }         # => [2, 4, 6]
[1, 2, 3, 4].select { |x| x.even? }  # => [2, 4]
[1, 2, 3, 4].reject { |x| x.even? }  # => [1, 3]
[1, 2, 3].reduce(0) { |sum, x| sum + x }  # => 6
\`\`\`

### Slicing and Sorting

\`\`\`ruby
arr = [5, 3, 1, 4, 2]
arr[1..3]          # => [3, 1, 4]
arr.sort           # => [1, 2, 3, 4, 5]
arr.sort { |a, b| b <=> a }  # => [5, 4, 3, 2, 1]
arr.flatten        # flattens nested arrays
arr.uniq           # removes duplicates
arr.compact        # removes nil values
\`\`\``,
  exercises: [
    {
      id: 'rb-arr-1',
      title: 'Create Array with %w',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Create an array of strings using the %w shorthand.',
      skeleton: `fruits = ___[apple banana cherry]`,
      solution: `fruits = %w[apple banana cherry]`,
      hints: [
        '%w creates an array of strings without quotes.',
        'Words are separated by spaces.',
        'Write %w[apple banana cherry].',
      ],
      concepts: ['%w-literal', 'array-creation'],
    },
    {
      id: 'rb-arr-2',
      title: 'Push an Element',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Add the number 4 to the end of the array using the shovel operator.',
      skeleton: `arr = [1, 2, 3]
arr ___ 4`,
      solution: `arr = [1, 2, 3]
arr << 4`,
      hints: [
        'The shovel operator appends an element to the array.',
        'It looks like two less-than signs.',
        'Write arr << 4.',
      ],
      concepts: ['shovel-operator', 'push'],
    },
    {
      id: 'rb-arr-3',
      title: 'Map Array Elements',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use map to double every element in the array.',
      skeleton: `doubled = [1, 2, 3].___ { |x| x * 2 }`,
      solution: `doubled = [1, 2, 3].map { |x| x * 2 }`,
      hints: [
        '.map transforms each element using the block.',
        'It returns a new array with the transformed values.',
        'Write .map { |x| x * 2 }.',
      ],
      concepts: ['map', 'blocks', 'transformation'],
    },
    {
      id: 'rb-arr-4',
      title: 'Select Even Numbers',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use select to keep only even numbers.',
      skeleton: `evens = [1, 2, 3, 4, 5, 6].___ { |x| x.even? }`,
      solution: `evens = [1, 2, 3, 4, 5, 6].select { |x| x.even? }`,
      hints: [
        '.select keeps elements for which the block returns true.',
        'It is like filter in other languages.',
        'Write .select { |x| x.even? }.',
      ],
      concepts: ['select', 'filtering', 'even?'],
    },
    {
      id: 'rb-arr-5',
      title: 'Flatten a Nested Array',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Flatten the nested array into a single-level array.',
      skeleton: `flat = [[1, 2], [3, [4, 5]]].___`,
      solution: `flat = [[1, 2], [3, [4, 5]]].flatten`,
      hints: [
        '.flatten recursively unnests all sub-arrays.',
        'It returns a new single-level array.',
        'Write .flatten.',
      ],
      concepts: ['flatten', 'nested-arrays'],
    },
    {
      id: 'rb-arr-6',
      title: 'Sort in Descending Order',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Sort the array in descending order using sort with a block.',
      skeleton: `desc = [3, 1, 4, 1, 5].sort { |a, b| ___ }`,
      solution: `desc = [3, 1, 4, 1, 5].sort { |a, b| b <=> a }`,
      hints: [
        'The spaceship operator <=> returns -1, 0, or 1.',
        'Reverse the order of a and b for descending sort.',
        'Write b <=> a inside the block.',
      ],
      concepts: ['sort', 'spaceship-operator', 'descending'],
    },
    {
      id: 'rb-arr-7',
      title: 'Write a Sum Method',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Write a method called sum_array that takes an array of numbers and returns their sum using .reduce.',
      skeleton: `def sum_array(arr)
  # Return the sum using reduce
end`,
      solution: `def sum_array(arr)
  arr.reduce(0, :+)
end`,
      hints: [
        '.reduce combines all elements using an operation.',
        'Pass 0 as the initial value and :+ as the operator.',
        'You can also write arr.reduce(0) { |sum, x| sum + x }.',
      ],
      concepts: ['reduce', 'sum', 'symbols-as-methods'],
    },
    {
      id: 'rb-arr-8',
      title: 'Write a Unique Sorter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Write a method called unique_sorted that takes an array, removes duplicates, and returns a sorted array.',
      skeleton: `def unique_sorted(arr)
  # Remove duplicates and sort
end`,
      solution: `def unique_sorted(arr)
  arr.uniq.sort
end`,
      hints: [
        '.uniq removes duplicate elements.',
        '.sort returns a sorted array.',
        'Chain them: arr.uniq.sort.',
      ],
      concepts: ['uniq', 'sort', 'method-chaining'],
    },
    {
      id: 'rb-arr-9',
      title: 'Write a Chunk Splitter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called chunk_array that splits an array into sub-arrays of a given size. For example, chunk_array([1,2,3,4,5], 2) returns [[1,2],[3,4],[5]].',
      skeleton: `def chunk_array(arr, size)
  # Split arr into chunks of the given size
end`,
      solution: `def chunk_array(arr, size)
  arr.each_slice(size).to_a
end`,
      hints: [
        'Ruby has .each_slice that yields consecutive slices.',
        'Call .to_a to convert the enumerator to an array.',
        'Write arr.each_slice(size).to_a.',
      ],
      concepts: ['each_slice', 'enumerator', 'to_a'],
    },
    {
      id: 'rb-arr-10',
      title: 'Write an Intersection Finder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called common_elements that takes two arrays and returns an array of elements present in both, without duplicates.',
      skeleton: `def common_elements(arr1, arr2)
  # Return elements in both arrays
end`,
      solution: `def common_elements(arr1, arr2)
  arr1 & arr2
end`,
      hints: [
        'Ruby has the & operator for array intersection.',
        'It returns a new array with elements common to both.',
        'The result automatically has no duplicates.',
      ],
      concepts: ['array-intersection', 'set-operations'],
    },
    {
      id: 'rb-arr-11',
      title: 'Write a Compact Map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called compact_map that takes an array and a block, maps over it, and removes nil results. Use filter_map if available, otherwise chain map and compact.',
      skeleton: `def compact_map(arr, &block)
  # Map and remove nils
end`,
      solution: `def compact_map(arr, &block)
  arr.filter_map(&block)
end`,
      hints: [
        '.filter_map combines map and compact in one step.',
        'It maps each element and excludes nil/false results.',
        'Pass the block through with &block.',
      ],
      concepts: ['filter_map', 'compact', 'blocks'],
    },
    {
      id: 'rb-arr-12',
      title: 'Write a Rotate Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called rotate_array that rotates an array by n positions to the left. rotate_array([1,2,3,4,5], 2) returns [3,4,5,1,2].',
      skeleton: `def rotate_array(arr, n)
  # Rotate array left by n positions
end`,
      solution: `def rotate_array(arr, n)
  arr.rotate(n)
end`,
      hints: [
        'Ruby arrays have a built-in .rotate method.',
        'Positive n rotates left, negative n rotates right.',
        'Write arr.rotate(n).',
      ],
      concepts: ['rotate', 'array-methods'],
    },
    {
      id: 'rb-arr-13',
      title: 'Fix the Off-by-One Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the bug: the loop tries to access an index beyond the array bounds.',
      skeleton: `arr = [10, 20, 30]
for i in 0..arr.length
  puts arr[i]
end`,
      solution: `arr = [10, 20, 30]
for i in 0...arr.length
  puts arr[i]
end`,
      hints: [
        '.. is inclusive of the end, ... is exclusive.',
        'arr.length is 3, but the last valid index is 2.',
        'Change 0..arr.length to 0...arr.length.',
      ],
      concepts: ['ranges', 'off-by-one', 'exclusive-range'],
    },
    {
      id: 'rb-arr-14',
      title: 'Fix the Sort Mutation Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so the original array is not modified when creating a sorted copy.',
      skeleton: `original = [3, 1, 2]
sorted = original.sort!
puts original.inspect
# Should print [3, 1, 2] but prints [1, 2, 3]`,
      solution: `original = [3, 1, 2]
sorted = original.sort
puts original.inspect
# Should print [3, 1, 2] but prints [1, 2, 3]`,
      hints: [
        'sort! modifies the array in place.',
        'sort (without bang) returns a new sorted array.',
        'Remove the ! to avoid mutating the original.',
      ],
      concepts: ['bang-methods', 'mutation', 'sort'],
    },
    {
      id: 'rb-arr-15',
      title: 'Fix the Shared Reference Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the bug: all inner arrays share the same reference, so modifying one changes all.',
      skeleton: `grid = Array.new(3, [0, 0, 0])
grid[0][0] = 1
puts grid.inspect
# Expected: [[1, 0, 0], [0, 0, 0], [0, 0, 0]]
# Actual:   [[1, 0, 0], [1, 0, 0], [1, 0, 0]]`,
      solution: `grid = Array.new(3) { [0, 0, 0] }
grid[0][0] = 1
puts grid.inspect
# Expected: [[1, 0, 0], [0, 0, 0], [0, 0, 0]]
# Actual:   [[1, 0, 0], [0, 0, 0], [0, 0, 0]]`,
      hints: [
        'Array.new(3, obj) uses the SAME object for all elements.',
        'Use a block to create a new array for each element.',
        'Write Array.new(3) { [0, 0, 0] } to create independent arrays.',
      ],
      concepts: ['object-references', 'array-new', 'blocks'],
    },
    {
      id: 'rb-arr-16',
      title: 'Predict map vs each Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict the output. Understand the difference between map and each.',
      skeleton: `result = [1, 2, 3].map { |x| x * 10 }
puts result.inspect`,
      solution: `[10, 20, 30]`,
      hints: [
        '.map returns a new array with transformed values.',
        'Each element is multiplied by 10.',
        'The result is [10, 20, 30].',
      ],
      concepts: ['map', 'transformation'],
    },
    {
      id: 'rb-arr-17',
      title: 'Predict Array Operations Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of these array set operations.',
      skeleton: `a = [1, 2, 3, 4]
b = [3, 4, 5, 6]
puts (a & b).inspect
puts (a | b).inspect
puts (a - b).inspect`,
      solution: `[3, 4]
[1, 2, 3, 4, 5, 6]
[1, 2]`,
      hints: [
        '& is intersection (common elements).',
        '| is union (all unique elements from both).',
        '- is difference (elements in a but not in b).',
      ],
      concepts: ['array-intersection', 'array-union', 'array-difference'],
    },
    {
      id: 'rb-arr-18',
      title: 'Predict Compact and Flatten Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of compact and flatten.',
      skeleton: `arr = [1, nil, [2, nil, [3]], nil, 4]
puts arr.flatten.compact.inspect`,
      solution: `[1, 2, 3, 4]`,
      hints: [
        '.flatten turns nested arrays into a flat array.',
        '.compact removes all nil values.',
        'After flatten: [1, nil, 2, nil, 3, nil, 4]. After compact: [1, 2, 3, 4].',
      ],
      concepts: ['flatten', 'compact', 'method-chaining'],
    },
    {
      id: 'rb-arr-19',
      title: 'Refactor Loop to each_with_object',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the manual accumulation loop into each_with_object.',
      skeleton: `numbers = [1, 2, 3, 4, 5]
result = {}
numbers.each do |n|
  result[n] = n * n
end`,
      solution: `numbers = [1, 2, 3, 4, 5]
result = numbers.each_with_object({}) do |n, hash|
  hash[n] = n * n
end`,
      hints: [
        'each_with_object passes an accumulator to each iteration.',
        'The accumulator (hash) is passed as the second block parameter.',
        'It returns the accumulator when done.',
      ],
      concepts: ['each_with_object', 'hashes', 'refactoring'],
    },
    {
      id: 'rb-arr-20',
      title: 'Refactor to Use Tally',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the manual counting into a single .tally call.',
      skeleton: `words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = {}
words.each do |word|
  counts[word] = (counts[word] || 0) + 1
end`,
      solution: `words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = words.tally`,
      hints: [
        '.tally counts occurrences of each element.',
        'It returns a hash of element => count.',
        'Replace the entire loop with words.tally.',
      ],
      concepts: ['tally', 'counting', 'refactoring'],
    },
  ],
};
