import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-symbols',
  title: '20. Symbols',
  explanation: `## Symbols in Ruby

Symbols are immutable, interned strings. They are lightweight identifiers used extensively in Ruby for hash keys, method names, and configuration.

\`\`\`ruby
# Symbol literals
:name
:age
:"complex symbol"

# Symbol vs String
:name.object_id == :name.object_id  # => true (same object)
"name".object_id == "name".object_id  # => false (different objects)

# Conversion
:hello.to_s    # => "hello"
"hello".to_sym  # => :hello

# As hash keys (preferred)
user = { name: "Alice", age: 30 }  # shorthand syntax
user = { :name => "Alice", :age => 30 }  # hashrocket syntax

# Symbol#to_proc
["hello", "world"].map(&:upcase)  # => ["HELLO", "WORLD"]
# Equivalent to:
["hello", "world"].map { |s| s.upcase }

# Frozen string literals
# frozen_string_literal: true
# Makes all string literals frozen (immutable) in the file
\`\`\`

### Key Concepts

- Symbols are **immutable** and **unique** — only one copy exists in memory
- Symbols are faster for comparison than strings
- Modern Ruby hash syntax \`key: value\` uses symbols automatically
- **\`Symbol#to_proc\`** converts a symbol to a block: \`&:method_name\`
- **Frozen strings** behave similarly to symbols for immutability`,
  exercises: [
    {
      id: 'rb-symbols-1',
      title: 'Symbol Literal',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to create a symbol.',
      skeleton: `status = ___active
puts status
puts status.class`,
      solution: `status = :active
puts status
puts status.class`,
      hints: [
        'Symbols start with a colon `:`.',
        'No quotes needed for simple symbols.',
        'status.class returns Symbol.',
      ],
      concepts: ['symbol-literal', 'syntax', 'class'],
    },
    {
      id: 'rb-symbols-2',
      title: 'Symbol as Hash Key',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to create a hash with symbol keys using modern syntax.',
      skeleton: `person = { ___: "Alice", ___: 30 }
puts person[:name]`,
      solution: `person = { name: "Alice", age: 30 }
puts person[:name]`,
      hints: [
        'Modern Ruby hash syntax: `key: value`.',
        'This automatically creates symbol keys.',
        'Access with `hash[:key]`.',
      ],
      concepts: ['hash-keys', 'modern-syntax', 'symbol'],
    },
    {
      id: 'rb-symbols-3',
      title: 'Convert String to Symbol',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to convert between string and symbol.',
      skeleton: `str = "hello"
sym = str.___
back = sym.___
puts sym.class
puts back.class`,
      solution: `str = "hello"
sym = str.to_sym
back = sym.to_s
puts sym.class
puts back.class`,
      hints: [
        '`to_sym` converts a string to a symbol.',
        '`to_s` converts a symbol to a string.',
        'These are inverse operations.',
      ],
      concepts: ['to_sym', 'to_s', 'conversion'],
    },
    {
      id: 'rb-symbols-4',
      title: 'Symbol#to_proc',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to use Symbol#to_proc shorthand.',
      skeleton: `words = ["hello", "world", "ruby"]
upcased = words.map(___:___)`,
      solution: `words = ["hello", "world", "ruby"]
upcased = words.map(&:upcase)`,
      hints: [
        '`&:method_name` is shorthand for `{ |x| x.method_name }`.',
        'The & converts the symbol to a proc.',
        'This is called Symbol#to_proc.',
      ],
      concepts: ['Symbol#to_proc', 'map', 'shorthand'],
    },
    {
      id: 'rb-symbols-5',
      title: 'Symbol Identity',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to check that two symbol references are the same object.',
      skeleton: `a = :test
b = :test
puts a.___ == b.___`,
      solution: `a = :test
b = :test
puts a.object_id == b.object_id`,
      hints: [
        'Symbols with the same name share the same object_id.',
        'This is what makes symbols memory-efficient.',
        'Strings with the same content have different object_ids.',
      ],
      concepts: ['object_id', 'identity', 'interning'],
    },
    {
      id: 'rb-symbols-6',
      title: 'Frozen String Literal',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the magic comment to make all string literals frozen.',
      skeleton: `# ___: true

str = "hello"
# str << " world"  # This would raise FrozenError`,
      solution: `# frozen_string_literal: true

str = "hello"
# str << " world"  # This would raise FrozenError`,
      hints: [
        'The magic comment is `# frozen_string_literal: true`.',
        'It must be the first line of the file.',
        'All string literals become frozen (immutable).',
      ],
      concepts: ['frozen_string_literal', 'magic-comment', 'immutability'],
    },
    {
      id: 'rb-symbols-7',
      title: 'Write a Symbol-Based Registry',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method symbolize_keys(hash) that converts all string keys in a hash to symbols.',
      skeleton: `# Write your symbolize_keys method`,
      solution: `def symbolize_keys(hash)
  hash.each_with_object({}) do |(key, value), result|
    result[key.to_sym] = value
  end
end`,
      hints: [
        'Iterate over each key-value pair.',
        'Convert each key with to_sym.',
        'Build a new hash with symbol keys.',
      ],
      concepts: ['to_sym', 'hash-transformation', 'each_with_object'],
    },
    {
      id: 'rb-symbols-8',
      title: 'Write a Method Dispatcher',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method apply_operations(value, operations) where operations is an array of symbols like [:upcase, :strip, :reverse]. Apply each operation to the value in sequence.',
      skeleton: `# Write your apply_operations method`,
      solution: `def apply_operations(value, operations)
  operations.reduce(value) { |v, op| v.send(op) }
end`,
      hints: [
        'Use `send` to call a method by its symbol name.',
        'reduce chains the operations together.',
        'Each operation transforms the value for the next.',
      ],
      concepts: ['send', 'Symbol', 'reduce', 'dynamic-dispatch'],
    },
    {
      id: 'rb-symbols-9',
      title: 'Write a Config Parser',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method parse_config(lines) that takes an array of "key=value" strings and returns a hash with symbol keys and string values. Ignore lines starting with #.',
      skeleton: `# Write your parse_config method`,
      solution: `def parse_config(lines)
  lines
    .reject { |line| line.start_with?("#") || line.strip.empty? }
    .each_with_object({}) do |line, config|
      key, value = line.split("=", 2).map(&:strip)
      config[key.to_sym] = value
    end
end`,
      hints: [
        'Filter out comments (lines starting with #).',
        'Split each line on "=" to get key and value.',
        'Convert key to symbol with to_sym.',
      ],
      concepts: ['to_sym', 'parsing', 'hash-building'],
    },
    {
      id: 'rb-symbols-10',
      title: 'Write Symbol#to_proc Alternatives',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method method_proc(method_name) that returns a Proc which calls the named method on its argument. This replicates what &:method_name does.',
      skeleton: `# Write your method_proc function`,
      solution: `def method_proc(method_name)
  Proc.new { |obj| obj.send(method_name) }
end`,
      hints: [
        'Create a Proc that takes one argument.',
        'Use send to call the method by name.',
        'This is what Symbol#to_proc does internally.',
      ],
      concepts: ['Proc', 'send', 'Symbol#to_proc'],
    },
    {
      id: 'rb-symbols-11',
      title: 'Write a String/Symbol Normalizer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method normalize_keys(data) that recursively converts all string keys to symbols in nested hashes and arrays of hashes.',
      skeleton: `# Write your normalize_keys method`,
      solution: `def normalize_keys(data)
  case data
  when Hash
    data.each_with_object({}) do |(k, v), h|
      h[k.is_a?(String) ? k.to_sym : k] = normalize_keys(v)
    end
  when Array
    data.map { |item| normalize_keys(item) }
  else
    data
  end
end`,
      hints: [
        'Use a case statement to handle Hash, Array, and other types.',
        'For Hash, convert string keys to symbols recursively.',
        'For Array, recursively process each element.',
      ],
      concepts: ['recursion', 'to_sym', 'nested-data'],
    },
    {
      id: 'rb-symbols-12',
      title: 'Write a Symbol Comparison',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Write a method status_message(status) that takes a symbol (:ok, :error, :pending) and returns an appropriate message string using a case statement.',
      skeleton: `# Write your status_message method`,
      solution: `def status_message(status)
  case status
  when :ok
    "Everything is fine"
  when :error
    "Something went wrong"
  when :pending
    "Still processing"
  else
    "Unknown status"
  end
end`,
      hints: [
        'Use case/when with symbol values.',
        'Symbols are compared with === in case statements.',
        'Include an else clause for unknown symbols.',
      ],
      concepts: ['case-when', 'symbols', 'pattern-matching'],
    },
    {
      id: 'rb-symbols-13',
      title: 'Fix Symbol vs String Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the code so the hash lookup works correctly.',
      skeleton: `config = { host: "localhost", port: 3000 }
puts config["host"]
puts config["port"]`,
      solution: `config = { host: "localhost", port: 3000 }
puts config[:host]
puts config[:port]`,
      hints: [
        'The hash uses symbol keys, not string keys.',
        'Use `:host` instead of `"host"` for lookup.',
        'Symbol keys and string keys are different in Ruby.',
      ],
      concepts: ['symbol-vs-string', 'hash-access', 'common-bugs'],
    },
    {
      id: 'rb-symbols-14',
      title: 'Fix to_proc Syntax Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so it correctly converts all strings to integers.',
      skeleton: `numbers = ["1", "2", "3", "4"]
result = numbers.map(:to_i)
puts result.inspect`,
      solution: `numbers = ["1", "2", "3", "4"]
result = numbers.map(&:to_i)
puts result.inspect`,
      hints: [
        'Symbol#to_proc requires the & prefix.',
        '& converts the symbol to a block/proc.',
        'Without &, you\'re passing a symbol as an argument.',
      ],
      concepts: ['Symbol#to_proc', '&-operator', 'common-bugs'],
    },
    {
      id: 'rb-symbols-15',
      title: 'Fix Frozen String Mutation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so it works with frozen strings by creating a new string instead of mutating.',
      skeleton: `name = "hello".freeze
name << " world"
puts name`,
      solution: `name = "hello".freeze
name = name + " world"
puts name`,
      hints: [
        'Frozen strings cannot be mutated in place.',
        '`<<` mutates the string, but `+` creates a new one.',
        'Reassign the variable with the new string.',
      ],
      concepts: ['freeze', 'immutability', 'string-concatenation'],
    },
    {
      id: 'rb-symbols-16',
      title: 'Predict Symbol Identity',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `puts :hello == :hello
puts :hello.equal?(:hello)
puts "hello" == "hello"
puts "hello".equal?("hello")`,
      solution: `true
true
true
false`,
      hints: [
        '== checks value equality.',
        'equal? checks object identity (same object in memory).',
        'Symbols with the same name are the same object; strings are not.',
      ],
      concepts: ['identity-vs-equality', 'equal?', 'object_id'],
    },
    {
      id: 'rb-symbols-17',
      title: 'Predict to_proc Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `result = [1, -2, 3, -4, 5].select(&:positive?).map(&:to_s)
puts result.inspect`,
      solution: `["1", "3", "5"]`,
      hints: [
        '&:positive? filters to positive numbers: [1, 3, 5].',
        '&:to_s converts each to a string.',
        'Symbol#to_proc works with any no-argument method.',
      ],
      concepts: ['Symbol#to_proc', 'method-chaining', 'select'],
    },
    {
      id: 'rb-symbols-18',
      title: 'Predict Symbol Conversion',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `arr = ["foo", "bar", "baz"]
symbols = arr.map(&:to_sym)
back = symbols.map(&:to_s)
puts symbols.inspect
puts (arr == back)`,
      solution: `[:foo, :bar, :baz]
true`,
      hints: [
        'map(&:to_sym) converts strings to symbols.',
        'map(&:to_s) converts them back to strings.',
        'Round-tripping through to_sym and to_s preserves values.',
      ],
      concepts: ['to_sym', 'to_s', 'round-trip'],
    },
    {
      id: 'rb-symbols-19',
      title: 'Refactor String Keys to Symbols',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Refactor to use symbol keys with modern hash syntax.',
      skeleton: `user = {
  "name" => "Alice",
  "email" => "alice@example.com",
  "age" => 30
}

puts user["name"]
puts user["email"]`,
      solution: `user = {
  name: "Alice",
  email: "alice@example.com",
  age: 30
}

puts user[:name]
puts user[:email]`,
      hints: [
        'Replace string keys with symbol keys using `key:` syntax.',
        'Update all hash access to use symbols.',
        'Symbol keys are more idiomatic and faster.',
      ],
      concepts: ['symbol-keys', 'modern-syntax', 'refactoring'],
    },
    {
      id: 'rb-symbols-20',
      title: 'Refactor to Symbol#to_proc',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the explicit blocks to use &:method shorthand.',
      skeleton: `names = ["  Alice  ", "  Bob  ", "  Carol  "]
cleaned = names
  .map { |n| n.strip }
  .map { |n| n.downcase }
  .select { |n| n.length > 3 }
puts cleaned.inspect`,
      solution: `names = ["  Alice  ", "  Bob  ", "  Carol  "]
cleaned = names
  .map(&:strip)
  .map(&:downcase)
  .select { |n| n.length > 3 }
puts cleaned.inspect`,
      hints: [
        'Single-method blocks can use &:method shorthand.',
        'strip and downcase take no arguments, perfect for to_proc.',
        'select with a condition cannot use the shorthand.',
      ],
      concepts: ['Symbol#to_proc', 'refactoring', 'method-chaining'],
    },
  ],
};
