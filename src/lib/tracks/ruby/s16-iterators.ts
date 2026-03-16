import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-iterators',
  title: '16. Iterators',
  explanation: `## Iterators in Ruby

Ruby's iterator methods are the primary way to traverse collections. They use blocks — closures passed to methods.

\`\`\`ruby
# each - the fundamental iterator
[1, 2, 3].each { |n| puts n }

# map - transform each element
[1, 2, 3].map { |n| n * 2 }  # => [2, 4, 6]

# select / reject - filter elements
[1, 2, 3, 4].select { |n| n.even? }  # => [2, 4]
[1, 2, 3, 4].reject { |n| n.even? }  # => [1, 3]

# reduce - accumulate a value
[1, 2, 3].reduce(0) { |sum, n| sum + n }  # => 6

# each_with_index
%w[a b c].each_with_index do |val, idx|
  puts "\#{idx}: \#{val}"
end

# each_with_object
[1, 2, 3].each_with_object([]) do |n, arr|
  arr << n * 2
end  # => [2, 4, 6]

# lazy enumerators
(1..Float::INFINITY).lazy.select(&:odd?).first(5)
# => [1, 3, 5, 7, 9]
\`\`\`

### Key Concepts

- **\`each\`** iterates without transforming
- **\`map\`** (alias \`collect\`) returns a new array of transformed values
- **\`select\`** (alias \`filter\`) keeps elements where block returns true
- **\`reject\`** removes elements where block returns true
- **\`reduce\`** (alias \`inject\`) accumulates into a single value
- **\`each_with_object\`** passes an accumulator object through each iteration
- **\`lazy\`** creates a lazy enumerator for infinite or large sequences`,
  exercises: [
    {
      id: 'rb-iterators-1',
      title: 'Basic each',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to iterate over the array and print each fruit.',
      skeleton: `fruits = ["apple", "banana", "cherry"]
fruits.___ { |fruit| puts fruit }`,
      solution: `fruits = ["apple", "banana", "cherry"]
fruits.each { |fruit| puts fruit }`,
      hints: [
        '`each` is the most basic iterator in Ruby.',
        'It passes each element to the block.',
        'each returns the original array.',
      ],
      concepts: ['each', 'blocks', 'iteration'],
    },
    {
      id: 'rb-iterators-2',
      title: 'Map to Transform',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to double each number.',
      skeleton: `numbers = [1, 2, 3, 4]
doubled = numbers.___ { |n| n * 2 }`,
      solution: `numbers = [1, 2, 3, 4]
doubled = numbers.map { |n| n * 2 }`,
      hints: [
        '`map` transforms each element and returns a new array.',
        'The block return value becomes the new element.',
        'Also known as `collect`.',
      ],
      concepts: ['map', 'transformation', 'blocks'],
    },
    {
      id: 'rb-iterators-3',
      title: 'Select to Filter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to keep only even numbers.',
      skeleton: `numbers = [1, 2, 3, 4, 5, 6]
evens = numbers.___ { |n| n.___ }`,
      solution: `numbers = [1, 2, 3, 4, 5, 6]
evens = numbers.select { |n| n.even? }`,
      hints: [
        '`select` keeps elements where the block returns true.',
        '`.even?` returns true for even numbers.',
        'Also known as `filter`.',
      ],
      concepts: ['select', 'filter', 'predicate-methods'],
    },
    {
      id: 'rb-iterators-4',
      title: 'Reduce to Accumulate',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to sum all numbers starting from 0.',
      skeleton: `numbers = [10, 20, 30]
total = numbers.___(___) { |sum, n| sum + n }`,
      solution: `numbers = [10, 20, 30]
total = numbers.reduce(0) { |sum, n| sum + n }`,
      hints: [
        '`reduce` accumulates elements into a single value.',
        'The first argument (0) is the initial accumulator value.',
        'The block receives the accumulator and current element.',
      ],
      concepts: ['reduce', 'accumulator', 'aggregation'],
    },
    {
      id: 'rb-iterators-5',
      title: 'each_with_index',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to print each element with its index.',
      skeleton: `colors = ["red", "green", "blue"]
colors.___ do |color, index|
  puts "\#{index}: \#{color}"
end`,
      solution: `colors = ["red", "green", "blue"]
colors.each_with_index do |color, index|
  puts "\#{index}: \#{color}"
end`,
      hints: [
        '`each_with_index` passes both the element and its index.',
        'The block receives two parameters: element, then index.',
        'Indices start at 0.',
      ],
      concepts: ['each_with_index', 'index', 'iteration'],
    },
    {
      id: 'rb-iterators-6',
      title: 'each_with_object',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to build a hash from an array of pairs.',
      skeleton: `pairs = [[:name, "Alice"], [:age, 30]]
hash = pairs.___(___) do |pair, h|
  h[pair[0]] = pair[1]
end`,
      solution: `pairs = [[:name, "Alice"], [:age, 30]]
hash = pairs.each_with_object({}) do |pair, h|
  h[pair[0]] = pair[1]
end`,
      hints: [
        '`each_with_object` passes an accumulator to each iteration.',
        'The initial object ({}) is passed as the second block parameter.',
        'Unlike reduce, the accumulator is always the same object.',
      ],
      concepts: ['each_with_object', 'hash-building', 'accumulator'],
    },
    {
      id: 'rb-iterators-7',
      title: 'Write a Custom each Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method my_each(arr) that takes an array and a block, yielding each element. Return the original array.',
      skeleton: `# Write your my_each method`,
      solution: `def my_each(arr)
  i = 0
  while i < arr.length
    yield arr[i]
    i += 1
  end
  arr
end`,
      hints: [
        'Use a while loop to iterate through indices.',
        'Use `yield` to pass each element to the block.',
        'Return the original array at the end.',
      ],
      concepts: ['yield', 'custom-iterators', 'blocks'],
    },
    {
      id: 'rb-iterators-8',
      title: 'Write a Custom map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method my_map(arr) that takes an array and a block, returning a new array with transformed elements.',
      skeleton: `# Write your my_map method`,
      solution: `def my_map(arr)
  result = []
  arr.each { |el| result << yield(el) }
  result
end`,
      hints: [
        'Create an empty result array.',
        'Use yield to transform each element.',
        'Push the yielded value into the result array.',
      ],
      concepts: ['yield', 'map', 'custom-iterators'],
    },
    {
      id: 'rb-iterators-9',
      title: 'Write a Custom select',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method my_select(arr) that takes an array and a block, returning elements where the block returns true.',
      skeleton: `# Write your my_select method`,
      solution: `def my_select(arr)
  result = []
  arr.each { |el| result << el if yield(el) }
  result
end`,
      hints: [
        'Create an empty result array.',
        'Only add elements where yield returns truthy.',
        'Use `if yield(el)` to conditionally include.',
      ],
      concepts: ['yield', 'select', 'custom-iterators'],
    },
    {
      id: 'rb-iterators-10',
      title: 'Write reject and partition',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method my_partition(arr) that takes an array and a block, returning two arrays: [truthy_elements, falsy_elements].',
      skeleton: `# Write your my_partition method`,
      solution: `def my_partition(arr)
  truthy = []
  falsy = []
  arr.each do |el|
    if yield(el)
      truthy << el
    else
      falsy << el
    end
  end
  [truthy, falsy]
end`,
      hints: [
        'Maintain two arrays: one for true, one for false.',
        'Check the block result for each element.',
        'Return both arrays as a pair.',
      ],
      concepts: ['partition', 'blocks', 'custom-iterators'],
    },
    {
      id: 'rb-iterators-11',
      title: 'Write a Lazy Range Filter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method first_n_primes(n) that uses a lazy enumerator on (2..Float::INFINITY) to find the first n prime numbers. Use the simple trial division primality check.',
      skeleton: `# Write your first_n_primes method`,
      solution: `def prime?(num)
  return false if num < 2
  (2..Math.sqrt(num).to_i).none? { |i| num % i == 0 }
end

def first_n_primes(n)
  (2..Float::INFINITY).lazy.select { |num| prime?(num) }.first(n)
end`,
      hints: [
        'Use `.lazy` to create a lazy enumerator.',
        'Chain `.select` to filter primes.',
        'Use `.first(n)` to take only n elements.',
      ],
      concepts: ['lazy', 'infinite-sequences', 'prime-numbers'],
    },
    {
      id: 'rb-iterators-12',
      title: 'Write Chained Iterators',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method process_scores(scores) that takes an array of integers, rejects scores below 60, maps remaining to letter grades (90+="A", 80+="B", 70+="C", else "D"), and returns the result.',
      skeleton: `# Write your process_scores method`,
      solution: `def process_scores(scores)
  scores
    .reject { |s| s < 60 }
    .map do |s|
      if s >= 90
        "A"
      elsif s >= 80
        "B"
      elsif s >= 70
        "C"
      else
        "D"
      end
    end
end`,
      hints: [
        'Chain reject then map.',
        'reject removes scores below 60.',
        'map converts remaining scores to letter grades.',
      ],
      concepts: ['method-chaining', 'reject', 'map'],
    },
    {
      id: 'rb-iterators-13',
      title: 'Fix map vs each Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the code so that doubled contains [2, 4, 6].',
      skeleton: `numbers = [1, 2, 3]
doubled = numbers.each { |n| n * 2 }
puts doubled.inspect`,
      solution: `numbers = [1, 2, 3]
doubled = numbers.map { |n| n * 2 }
puts doubled.inspect`,
      hints: [
        '`each` returns the original array, not transformed values.',
        '`map` returns a new array with the block results.',
        'Change `each` to `map`.',
      ],
      concepts: ['each-vs-map', 'return-values', 'common-bugs'],
    },
    {
      id: 'rb-iterators-14',
      title: 'Fix Reduce Initial Value Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so it correctly computes the product of all numbers.',
      skeleton: `numbers = [2, 3, 4]
product = numbers.reduce(0) { |acc, n| acc * n }
puts product`,
      solution: `numbers = [2, 3, 4]
product = numbers.reduce(1) { |acc, n| acc * n }
puts product`,
      hints: [
        'The initial value of 0 means 0 * anything = 0.',
        'For multiplication, the initial value should be 1.',
        'The identity element for multiplication is 1.',
      ],
      concepts: ['reduce', 'initial-value', 'identity-element'],
    },
    {
      id: 'rb-iterators-15',
      title: 'Fix Mutating During Iteration Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so it safely removes all even numbers.',
      skeleton: `numbers = [1, 2, 3, 4, 5, 6]
numbers.each { |n| numbers.delete(n) if n.even? }
puts numbers.inspect`,
      solution: `numbers = [1, 2, 3, 4, 5, 6]
numbers = numbers.reject { |n| n.even? }
puts numbers.inspect`,
      hints: [
        'Mutating an array while iterating can skip elements.',
        'Use `reject` to create a new filtered array.',
        'Or use `delete_if` which is safe for in-place modification.',
      ],
      concepts: ['mutation-during-iteration', 'reject', 'common-bugs'],
    },
    {
      id: 'rb-iterators-16',
      title: 'Predict map Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `result = [1, 2, 3].map { |n| n ** 2 }
puts result.inspect`,
      solution: `[1, 4, 9]`,
      hints: [
        '`**` is the exponentiation operator.',
        'map returns a new array with each element squared.',
        '1**2=1, 2**2=4, 3**2=9.',
      ],
      concepts: ['map', 'exponentiation', 'transformation'],
    },
    {
      id: 'rb-iterators-17',
      title: 'Predict Chained Iterator Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `result = (1..10).select { |n| n.odd? }.map { |n| n * 10 }.reject { |n| n > 50 }
puts result.inspect`,
      solution: `[10, 30, 50]`,
      hints: [
        'select keeps odd numbers: [1,3,5,7,9].',
        'map multiplies by 10: [10,30,50,70,90].',
        'reject removes > 50: [10,30,50].',
      ],
      concepts: ['method-chaining', 'select', 'map', 'reject'],
    },
    {
      id: 'rb-iterators-18',
      title: 'Predict reduce Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `result = ["hello", "world", "ruby"].reduce("") do |acc, word|
  acc + word[0].upcase
end
puts result`,
      solution: `HWR`,
      hints: [
        'Start with empty string "".',
        'For each word, take the first character and upcase it.',
        '"h"[0].upcase = "H", "w"[0].upcase = "W", etc.',
      ],
      concepts: ['reduce', 'string-operations', 'accumulation'],
    },
    {
      id: 'rb-iterators-19',
      title: 'Refactor Loop to Iterator',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Refactor the while loop into idiomatic Ruby using iterators.',
      skeleton: `numbers = [1, 2, 3, 4, 5]
result = []
i = 0
while i < numbers.length
  if numbers[i] > 2
    result << numbers[i] * 10
  end
  i += 1
end
puts result.inspect`,
      solution: `numbers = [1, 2, 3, 4, 5]
result = numbers.select { |n| n > 2 }.map { |n| n * 10 }
puts result.inspect`,
      hints: [
        'Use `select` to filter elements > 2.',
        'Chain `map` to multiply by 10.',
        'This replaces the entire while loop.',
      ],
      concepts: ['select', 'map', 'refactoring', 'idiomatic-ruby'],
    },
    {
      id: 'rb-iterators-20',
      title: 'Refactor Imperative to Reduce',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor this imperative code into a single reduce call.',
      skeleton: `words = ["hello", "world", "foo", "bar"]
longest = ""
words.each do |word|
  if word.length > longest.length
    longest = word
  end
end
puts longest`,
      solution: `words = ["hello", "world", "foo", "bar"]
longest = words.reduce("") { |best, word| word.length > best.length ? word : best }
puts longest`,
      hints: [
        'reduce can find the longest by comparing lengths.',
        'The accumulator holds the longest word found so far.',
        'Use the ternary operator for concise comparison.',
      ],
      concepts: ['reduce', 'refactoring', 'ternary-operator'],
    },
  ],
};
