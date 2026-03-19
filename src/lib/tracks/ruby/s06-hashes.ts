import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-hash',
  title: '06. Hashes',
  explanation: `## Hashes in Ruby

Hashes are key-value collections, similar to dictionaries in Python or objects in JavaScript.

### Creating Hashes

\`\`\`ruby
# Rocket syntax (any object as key)
person = { "name" => "Alice", "age" => 30 }

# Symbol keys (preferred for Ruby hashes)
person = { name: "Alice", age: 30 }

# Hash.new with default value
counts = Hash.new(0)
counts[:missing]  # => 0 (instead of nil)
\`\`\`

### Accessing and Modifying

\`\`\`ruby
person = { name: "Alice", age: 30 }
person[:name]            # => "Alice"
person[:email] = "a@b.c" # add new key
person.fetch(:name)      # => "Alice"
person.fetch(:phone, "N/A")  # => "N/A" (default)
person.dig(:address, :city)  # safe nested access
\`\`\`

### Iteration and Transformation

\`\`\`ruby
hash = { a: 1, b: 2, c: 3 }
hash.each { |k, v| puts "\#{k}: \#{v}" }
hash.map { |k, v| [k, v * 2] }.to_h    # => { a: 2, b: 4, c: 6 }
hash.select { |k, v| v > 1 }           # => { b: 2, c: 3 }
hash.reject { |k, v| v > 1 }           # => { a: 1 }
hash.transform_values { |v| v * 10 }   # => { a: 10, b: 20, c: 30 }
hash.transform_keys(&:to_s)            # => { "a" => 1, "b" => 2, "c" => 3 }
\`\`\`

### Merging

\`\`\`ruby
a = { x: 1, y: 2 }
b = { y: 3, z: 4 }
a.merge(b)  # => { x: 1, y: 3, z: 4 } (b wins on conflict)
a.merge(b) { |key, old, new_val| old + new_val }  # custom conflict resolution
\`\`\``,
  exercises: [
    {
      id: 'rb-hash-1',
      title: 'Create a Hash with Symbol Keys',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Create a hash with symbol keys for name ("Alice") and age (30).',
      skeleton: `person = { ___: "Alice", ___: 30 }`,
      solution: `person = { name: "Alice", age: 30 }`,
      hints: [
        'Symbol keys use the shorthand key: value syntax.',
        'No need for => when using this syntax.',
        'Write name: "Alice", age: 30.',
      ],
      concepts: ['symbol-keys', 'hash-creation'],
    },
    {
      id: 'rb-hash-2',
      title: 'Access a Hash Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Access the value associated with the :name key.',
      skeleton: `person = { name: "Alice", age: 30 }
name = person[___]`,
      solution: `person = { name: "Alice", age: 30 }
name = person[:name]`,
      hints: [
        'Use square brackets with the key to access values.',
        'Symbol keys are accessed with :key_name.',
        'Write person[:name].',
      ],
      concepts: ['hash-access', 'symbols'],
    },
    {
      id: 'rb-hash-3',
      title: 'Set a Default Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Create a hash with a default value of 0 for missing keys.',
      skeleton: `counts = Hash.___(0)`,
      solution: `counts = Hash.new(0)`,
      hints: [
        'Hash.new takes an optional default value.',
        'Missing keys will return this default instead of nil.',
        'Write Hash.new(0).',
      ],
      concepts: ['hash-default', 'hash-new'],
    },
    {
      id: 'rb-hash-4',
      title: 'Fetch with Default',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use fetch to get the :email key with a default of "N/A" if it does not exist.',
      skeleton: `person = { name: "Alice" }
email = person.___(:email, ___)`,
      solution: `person = { name: "Alice" }
email = person.fetch(:email, "N/A")`,
      hints: [
        '.fetch retrieves a value and accepts a default as a second argument.',
        'If the key is missing, the default is returned.',
        'Write person.fetch(:email, "N/A").',
      ],
      concepts: ['fetch', 'default-values'],
    },
    {
      id: 'rb-hash-5',
      title: 'Merge Two Hashes',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Merge hash b into hash a.',
      skeleton: `a = { x: 1 }
b = { y: 2 }
combined = a.___(b)`,
      solution: `a = { x: 1 }
b = { y: 2 }
combined = a.merge(b)`,
      hints: [
        '.merge combines two hashes into a new one.',
        'Keys from the argument hash override existing keys.',
        'Write a.merge(b).',
      ],
      concepts: ['merge', 'hash-combination'],
    },
    {
      id: 'rb-hash-6',
      title: 'Transform Values',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Double all values in the hash using transform_values.',
      skeleton: `prices = { apple: 1, banana: 2, cherry: 3 }
doubled = prices.___ { |v| v * 2 }`,
      solution: `prices = { apple: 1, banana: 2, cherry: 3 }
doubled = prices.transform_values { |v| v * 2 }`,
      hints: [
        '.transform_values applies a block to each value.',
        'It returns a new hash with the same keys and transformed values.',
        'Write .transform_values { |v| v * 2 }.',
      ],
      concepts: ['transform_values', 'hash-transformation'],
    },
    {
      id: 'rb-hash-7',
      title: 'Write a Word Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called word_count that takes a string and returns a hash of word frequencies. Downcase all words. For example, "the cat and the dog" returns {"the"=>2, "cat"=>1, "and"=>1, "dog"=>1}.',
      skeleton: `def word_count(str)
  # Return hash of word frequencies
end`,
      solution: `def word_count(str)
  str.downcase.split.tally
end`,
      hints: [
        'Split the string into words with .split.',
        'Downcase first to normalize.',
        'Use .tally to count occurrences.',
      ],
      concepts: ['split', 'tally', 'downcase'],
    },
    {
      id: 'rb-hash-8',
      title: 'Write a Hash Inverter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called invert_hash that swaps keys and values. For example, {a: 1, b: 2} becomes {1 => :a, 2 => :b}.',
      skeleton: `def invert_hash(hash)
  # Swap keys and values
end`,
      solution: `def invert_hash(hash)
  hash.invert
end`,
      hints: [
        'Ruby hashes have a built-in .invert method.',
        'It swaps each key-value pair.',
        'Write hash.invert.',
      ],
      concepts: ['invert', 'hash-methods'],
    },
    {
      id: 'rb-hash-9',
      title: 'Write a Hash Slicer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called slice_hash that takes a hash and an array of keys, returning a new hash with only those keys. For example, slice_hash({a: 1, b: 2, c: 3}, [:a, :c]) returns {a: 1, c: 3}.',
      skeleton: `def slice_hash(hash, keys)
  # Return hash with only the specified keys
end`,
      solution: `def slice_hash(hash, keys)
  hash.slice(*keys)
end`,
      hints: [
        'Ruby 2.5+ has a built-in .slice method on Hash.',
        'Use the splat operator to expand the keys array.',
        'Write hash.slice(*keys).',
      ],
      concepts: ['slice', 'splat-operator', 'hash-methods'],
    },
    {
      id: 'rb-hash-10',
      title: 'Write a Deep Merge',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a method called deep_merge that recursively merges two hashes. If both values for a key are hashes, merge them recursively. Otherwise, the second hash wins.',
      skeleton: `def deep_merge(h1, h2)
  # Recursively merge h2 into h1
end`,
      solution: `def deep_merge(h1, h2)
  h1.merge(h2) do |key, old_val, new_val|
    if old_val.is_a?(Hash) && new_val.is_a?(Hash)
      deep_merge(old_val, new_val)
    else
      new_val
    end
  end
end`,
      hints: [
        '.merge accepts a block for handling key conflicts.',
        'The block receives the key, old value, and new value.',
        'Recursively merge when both values are hashes.',
      ],
      concepts: ['merge', 'recursion', 'deep-merge'],
    },
    {
      id: 'rb-hash-11',
      title: 'Write a Group By Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called group_by_length that takes an array of strings and returns a hash grouped by string length. For example, ["hi", "hey", "yo", "sup"] returns {2=>["hi", "yo"], 3=>["hey", "sup"]}.',
      skeleton: `def group_by_length(words)
  # Group words by their length
end`,
      solution: `def group_by_length(words)
  words.group_by(&:length)
end`,
      hints: [
        '.group_by groups elements by the block return value.',
        'Use &:length as a shorthand for { |w| w.length }.',
        'Write words.group_by(&:length).',
      ],
      concepts: ['group_by', 'symbol-to-proc'],
    },
    {
      id: 'rb-hash-12',
      title: 'Write a Hash Diff',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a method called hash_diff that returns keys where two hashes differ. Include keys present in one but not the other, and keys with different values. Return as an array of symbols.',
      skeleton: `def hash_diff(h1, h2)
  # Return array of keys that differ
end`,
      solution: `def hash_diff(h1, h2)
  all_keys = (h1.keys + h2.keys).uniq
  all_keys.select { |k| h1[k] != h2[k] }
end`,
      hints: [
        'Combine all keys from both hashes.',
        'Select keys where the values differ.',
        'Missing keys return nil, which will differ from present values.',
      ],
      concepts: ['hash-comparison', 'select', 'keys'],
    },
    {
      id: 'rb-hash-13',
      title: 'Fix the String vs Symbol Key Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the bug: the hash uses symbol keys but the lookup uses a string key.',
      skeleton: `config = { host: "localhost", port: 3000 }
puts config["host"]`,
      solution: `config = { host: "localhost", port: 3000 }
puts config[:host]`,
      hints: [
        'Symbol keys and string keys are different in Ruby.',
        ':host and "host" are not the same key.',
        'Change "host" to :host.',
      ],
      concepts: ['symbols', 'strings', 'hash-access'],
    },
    {
      id: 'rb-hash-14',
      title: 'Fix the Shared Default Object Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the bug: all keys share the same default array, so appending to one affects all.',
      skeleton: `groups = Hash.new([])
groups[:a] << 1
groups[:b] << 2
puts groups[:a].inspect
# Expected: [1], Actual: [1, 2]`,
      solution: `groups = Hash.new { |h, k| h[k] = [] }
groups[:a] << 1
groups[:b] << 2
puts groups[:a].inspect
# Expected: [1], Actual: [1, 2]`,
      hints: [
        'Hash.new([]) shares ONE array across all missing keys.',
        'Use a block to create a NEW array for each missing key.',
        'Write Hash.new { |h, k| h[k] = [] }.',
      ],
      concepts: ['hash-default', 'block-default', 'object-references'],
    },
    {
      id: 'rb-hash-15',
      title: 'Fix the Merge Conflict Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the merge so that when keys conflict, values are added together instead of the second hash winning.',
      skeleton: `a = { apples: 3, bananas: 2 }
b = { bananas: 5, cherries: 1 }
total = a.merge(b)
# Expected: { apples: 3, bananas: 7, cherries: 1 }
# Actual:   { apples: 3, bananas: 5, cherries: 1 }`,
      solution: `a = { apples: 3, bananas: 2 }
b = { bananas: 5, cherries: 1 }
total = a.merge(b) { |key, v1, v2| v1 + v2 }
# Expected: { apples: 3, bananas: 7, cherries: 1 }
# Actual:   { apples: 3, bananas: 5, cherries: 1 }`,
      hints: [
        '.merge accepts a block to handle key conflicts.',
        'The block receives the key, old value, and new value.',
        'Add the values together in the block.',
      ],
      concepts: ['merge', 'conflict-resolution', 'blocks'],
    },
    {
      id: 'rb-hash-16',
      title: 'Predict Hash Access Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict the output of these hash access operations.',
      skeleton: `h = { a: 1, b: 2, c: 3 }
puts h[:a]
puts h[:d].inspect
puts h.fetch(:b)`,
      solution: `1
nil
2`,
      hints: [
        'Accessing a missing key with [] returns nil.',
        '.inspect on nil outputs the string "nil".',
        '.fetch raises an error for missing keys unless a default is given.',
      ],
      concepts: ['hash-access', 'nil', 'fetch'],
    },
    {
      id: 'rb-hash-17',
      title: 'Predict transform_keys Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of transform_keys.',
      skeleton: `h = { name: "Alice", age: 30 }
result = h.transform_keys(&:to_s)
puts result.inspect`,
      solution: `{"name"=>"Alice", "age"=>30}`,
      hints: [
        '.transform_keys applies a block to each key.',
        '&:to_s converts each symbol key to a string.',
        'The output uses rocket syntax because keys are now strings.',
      ],
      concepts: ['transform_keys', 'symbol-to-proc', 'to_s'],
    },
    {
      id: 'rb-hash-18',
      title: 'Predict Select on Hash Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of select on a hash.',
      skeleton: `scores = { alice: 85, bob: 92, carol: 78, dave: 95 }
result = scores.select { |k, v| v >= 90 }
puts result.inspect`,
      solution: `{bob: 92, dave: 95}`,
      hints: [
        '.select on a hash returns a new hash with matching pairs.',
        'The block receives both key and value.',
        'Only bob (92) and dave (95) have scores >= 90.',
      ],
      concepts: ['select', 'hash-filtering'],
    },
    {
      id: 'rb-hash-19',
      title: 'Refactor to Symbol Keys',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Refactor the hash from rocket syntax with string keys to the modern symbol key syntax.',
      skeleton: `person = { "name" => "Alice", "age" => 30, "city" => "NYC" }`,
      solution: `person = { name: "Alice", age: 30, city: "NYC" }`,
      hints: [
        'Symbol keys are more idiomatic in Ruby.',
        'Use key: value instead of "key" => value.',
        'Change each string key to a symbol with colon syntax.',
      ],
      concepts: ['symbol-keys', 'hash-syntax', 'refactoring'],
    },
    {
      id: 'rb-hash-20',
      title: 'Refactor Manual Iteration to transform_values',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the manual hash building loop to use transform_values.',
      skeleton: `prices = { apple: 1.0, banana: 0.5, cherry: 2.0 }
discounted = {}
prices.each do |item, price|
  discounted[item] = (price * 0.9).round(2)
end`,
      solution: `prices = { apple: 1.0, banana: 0.5, cherry: 2.0 }
discounted = prices.transform_values { |price| (price * 0.9).round(2) }`,
      hints: [
        '.transform_values replaces manual iteration over values.',
        'It keeps the keys the same and applies the block to values.',
        'Write prices.transform_values { |price| (price * 0.9).round(2) }.',
      ],
      concepts: ['transform_values', 'refactoring', 'hash-methods'],
    },
  ],
};
