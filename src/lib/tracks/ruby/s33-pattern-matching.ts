import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-pattern',
  title: '33. Pattern Matching',
  explanation: `## Pattern Matching in Ruby

Ruby 2.7+ introduced pattern matching with case/in, providing powerful destructuring and matching capabilities.

### Basic Pattern Matching

\`\`\`ruby
case [1, 2, 3]
in [Integer => a, Integer => b, Integer => c]
  puts a + b + c  # => 6
end

case { name: "Alice", age: 30 }
in { name: String => name, age: (18..) => age }
  puts "\#{name} is \#{age}"
end
\`\`\`

### Find Pattern

\`\`\`ruby
case [1, 2, 3, "hello", 4]
in [*, String => s, *]
  puts s  # => "hello"
end
\`\`\`

### Pin Operator

\`\`\`ruby
expected = 42
case { value: 42 }
in { value: ^expected }
  puts "matched!"
end
\`\`\`

### Guard Clauses

\`\`\`ruby
case { score: 85 }
in { score: Integer => s } if s >= 90
  "A"
in { score: Integer => s } if s >= 80
  "B"
end
\`\`\`

### Custom Deconstruct

\`\`\`ruby
class Point
  attr_reader :x, :y
  def initialize(x, y) = (@x, @y = x, y)

  def deconstruct
    [@x, @y]
  end

  def deconstruct_keys(keys)
    { x: @x, y: @y }.slice(*keys)
  end
end

case Point.new(1, 2)
in [x, y]         # uses deconstruct
in { x:, y: }     # uses deconstruct_keys
end
\`\`\``,
  exercises: [
    {
      id: 'rb-pattern-1',
      title: 'Basic Array Pattern',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Match and destructure an array.',
      skeleton: `result = case [1, 2, 3]
  ___ [a, b, c]
    a + b + c
  end
puts result`,
      solution: `result = case [1, 2, 3]
  in [a, b, c]
    a + b + c
  end
puts result`,
      hints: ['Pattern matching uses in instead of when', 'case/in is the pattern matching syntax', '[a, b, c] destructures the array'],
      concepts: ['case_in', 'array_pattern'],
    },
    {
      id: 'rb-pattern-2',
      title: 'Hash Pattern',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Match and destructure a hash.',
      skeleton: `user = { name: "Alice", age: 30, role: "admin" }

case user
___ { name: String => name, role: "admin" }
  puts "\\\#{name} is an admin"
end`,
      solution: `user = { name: "Alice", age: 30, role: "admin" }

case user
in { name: String => name, role: "admin" }
  puts "\\\#{name} is an admin"
end`,
      hints: ['Use in for pattern matching branches', 'String => name binds the matched value to name', 'Hash patterns match on keys and value patterns'],
      concepts: ['hash_pattern', 'value_binding'],
    },
    {
      id: 'rb-pattern-3',
      title: 'Pin Operator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use the pin operator to match against a variable.',
      skeleton: `expected_id = 42

case { id: 42, name: "Widget" }
in { id: ___expected_id, name: String => name }
  puts "Found: \\\#{name}"
end`,
      solution: `expected_id = 42

case { id: 42, name: "Widget" }
in { id: ^expected_id, name: String => name }
  puts "Found: \\\#{name}"
end`,
      hints: ['^variable pins the variable value for matching', 'Without ^, the variable would be a new binding', 'Pin means "match this exact value"'],
      concepts: ['pin_operator'],
    },
    {
      id: 'rb-pattern-4',
      title: 'Find Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use the find pattern to locate an element.',
      skeleton: `data = [1, "hello", 3, "world", 5]

case data
in [___, String => found, ___]
  puts found
end`,
      solution: `data = [1, "hello", 3, "world", 5]

case data
in [*, String => found, *]
  puts found
end`,
      hints: ['* matches zero or more elements', 'The find pattern searches for the first match', '[*, pattern, *] finds an element matching pattern'],
      concepts: ['find_pattern', 'splat'],
    },
    {
      id: 'rb-pattern-5',
      title: 'Guard Clause',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Add a guard clause to a pattern match.',
      skeleton: `score = 85

grade = case { score: score }
  in { score: Integer => s } ___ s >= 90
    "A"
  in { score: Integer => s } ___ s >= 80
    "B"
  in { score: Integer => s }
    "C"
  end
puts grade`,
      solution: `score = 85

grade = case { score: score }
  in { score: Integer => s } if s >= 90
    "A"
  in { score: Integer => s } if s >= 80
    "B"
  in { score: Integer => s }
    "C"
  end
puts grade`,
      hints: ['Guard clauses use if after the pattern', 'They add extra conditions beyond the structural match', 'The guard is evaluated after the pattern matches'],
      concepts: ['guard_clause'],
    },
    {
      id: 'rb-pattern-6',
      title: 'Nested Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Match a nested data structure.',
      skeleton: `data = { users: [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }] }

case data
in { users: [{ name: ___ => first }, *] }
  puts "First user: \\\#{first}"
end`,
      solution: `data = { users: [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }] }

case data
in { users: [{ name: String => first }, *] }
  puts "First user: \\\#{first}"
end`,
      hints: ['Patterns can be nested arbitrarily deep', 'String => first matches any String and binds it', '* matches the rest of the array'],
      concepts: ['nested_pattern'],
    },
    {
      id: 'rb-pattern-7',
      title: 'Write Pattern-Based Classifier',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method that classifies data using pattern matching.',
      skeleton: `# Write a classify(data) method that returns:
# - "point" for [Numeric, Numeric]
# - "named_point" for { x: Numeric, y: Numeric, label: String }
# - "color" for { r: 0..255, g: 0..255, b: 0..255 }
# - "unknown" for anything else
`,
      solution: `def classify(data)
  case data
  in [Numeric, Numeric]
    "point"
  in { x: Numeric, y: Numeric, label: String }
    "named_point"
  in { r: (0..255), g: (0..255), b: (0..255) }
    "color"
  else
    "unknown"
  end
end

puts classify([1, 2])
puts classify({ x: 3, y: 4, label: "A" })
puts classify({ r: 255, g: 128, b: 0 })
puts classify("hello")`,
      hints: ['Use case/in with different patterns', 'Range patterns like (0..255) check inclusion', 'else handles unmatched cases'],
      concepts: ['pattern_classifier', 'range_pattern'],
    },
    {
      id: 'rb-pattern-8',
      title: 'Write JSON Parser with Patterns',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a method that processes API responses using pattern matching.',
      skeleton: `# Write process_response(response) that handles:
# - { status: 200, body: { data: Array => items } } -> "Got N items"
# - { status: 200, body: { data: Hash => item } } -> "Got item: <first key>"
# - { status: (400..499), error: String => msg } -> "Client error: msg"
# - { status: (500..599) } -> "Server error"
# - anything else -> "Unknown response"
`,
      solution: `def process_response(response)
  case response
  in { status: 200, body: { data: Array => items } }
    "Got \\\#{items.length} items"
  in { status: 200, body: { data: Hash => item } }
    "Got item: \\\#{item.keys.first}"
  in { status: (400..499), error: String => msg }
    "Client error: \\\#{msg}"
  in { status: (500..599) }
    "Server error"
  else
    "Unknown response"
  end
end

puts process_response({ status: 200, body: { data: [1, 2, 3] } })
puts process_response({ status: 200, body: { data: { id: 1 } } })
puts process_response({ status: 404, error: "Not found" })
puts process_response({ status: 500 })`,
      hints: ['Match specific status codes with ranges', 'Array and Hash type checks with binding', 'Order matters: more specific patterns first'],
      concepts: ['api_pattern_matching', 'nested_destructuring'],
    },
    {
      id: 'rb-pattern-9',
      title: 'Write Custom Deconstruct',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a class with deconstruct and deconstruct_keys.',
      skeleton: `# Write a Color class:
# - initialize(r, g, b) with attr_reader
# - deconstruct returns [r, g, b]
# - deconstruct_keys(keys) returns requested keys from {r:, g:, b:}
# Show pattern matching with both array and hash patterns
`,
      solution: `class Color
  attr_reader :r, :g, :b

  def initialize(r, g, b)
    @r = r
    @g = g
    @b = b
  end

  def deconstruct
    [@r, @g, @b]
  end

  def deconstruct_keys(keys)
    h = { r: @r, g: @g, b: @b }
    keys ? h.slice(*keys) : h
  end
end

color = Color.new(255, 128, 0)

case color
in [r, g, b]
  puts "RGB: \\\#{r}, \\\#{g}, \\\#{b}"
end

case color
in { r: (200..255) => r, g: }
  puts "High red (\\\#{r}), green: \\\#{g}"
end`,
      hints: ['deconstruct is called for array patterns [a, b, c]', 'deconstruct_keys(keys) is called for hash patterns {r:, g:}', 'keys is nil when ** is used, handle that case'],
      concepts: ['deconstruct', 'deconstruct_keys'],
    },
    {
      id: 'rb-pattern-10',
      title: 'Write Expression Evaluator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write an expression evaluator using pattern matching.',
      skeleton: `# Write an evaluate(expr) method using pattern matching:
# - [:num, n] -> returns n
# - [:add, left, right] -> evaluates both and adds
# - [:mul, left, right] -> evaluates both and multiplies
# - [:neg, inner] -> evaluates and negates
# Example: evaluate([:add, [:num, 3], [:mul, [:num, 2], [:num, 4]]]) => 11
`,
      solution: `def evaluate(expr)
  case expr
  in [:num, Integer => n]
    n
  in [:add, left, right]
    evaluate(left) + evaluate(right)
  in [:mul, left, right]
    evaluate(left) * evaluate(right)
  in [:neg, inner]
    -evaluate(inner)
  end
end

expr = [:add, [:num, 3], [:mul, [:num, 2], [:num, 4]]]
puts evaluate(expr)

expr2 = [:neg, [:add, [:num, 5], [:num, 3]]]
puts evaluate(expr2)`,
      hints: ['Use recursive pattern matching', 'Each pattern matches a different expression type', 'The first element of the array identifies the type'],
      concepts: ['recursive_pattern', 'AST_evaluation'],
    },
    {
      id: 'rb-pattern-11',
      title: 'Write In-Line Pattern Match',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use the in operator for inline pattern matching.',
      skeleton: `# Write a method valid_user?(data) that uses inline pattern matching:
# Returns true if data matches { name: String, age: (18..), email: /.*@.*/ }
# Use the "in" operator for single-line pattern check
`,
      solution: `def valid_user?(data)
  data in { name: String, age: (18..), email: /@/ }
end

puts valid_user?({ name: "Alice", age: 25, email: "alice@example.com" })
puts valid_user?({ name: "Bob", age: 15, email: "bob@example.com" })
puts valid_user?({ name: 123, age: 30, email: "x@y.com" })`,
      hints: ['data in pattern returns true/false (Ruby 3.0+)', 'No case keyword needed for inline matching', 'The in operator checks if the pattern matches'],
      concepts: ['inline_pattern', 'pattern_predicate'],
    },
    {
      id: 'rb-pattern-12',
      title: 'Write Pattern with Or',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use the | operator for alternative patterns.',
      skeleton: `# Write a describe_value(val) method using pattern matching:
# - 0 | "" | [] | {} | nil -> "empty"
# - Integer | Float -> "number"
# - String -> "text"
# - Array -> "list"
# - Hash -> "map"
# - anything else -> "other"
`,
      solution: `def describe_value(val)
  case val
  in 0 | "" | [] | {} | nil
    "empty"
  in Integer | Float
    "number"
  in String
    "text"
  in Array
    "list"
  in Hash
    "map"
  else
    "other"
  end
end

puts describe_value(0)
puts describe_value(42)
puts describe_value("hi")
puts describe_value([1, 2])
puts describe_value(:sym)`,
      hints: ['| combines alternative patterns', 'Order matters: check specific values before types', 'The first matching pattern wins'],
      concepts: ['or_pattern', 'alternatives'],
    },
    {
      id: 'rb-pattern-13',
      title: 'Fix Missing Pattern Variable',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the pattern match that does not bind a variable.',
      skeleton: `data = { name: "Alice", scores: [90, 85, 95] }

case data
in { name: String, scores: [Integer, Integer, Integer] }
  puts "Student: \\\#{name}"
end
# Error: undefined variable name`,
      solution: `data = { name: "Alice", scores: [90, 85, 95] }

case data
in { name: String => name, scores: [Integer, Integer, Integer] }
  puts "Student: \\\#{name}"
end`,
      hints: ['String alone matches but does not bind', 'Use String => name to match AND bind', '=> variable captures the matched value'],
      concepts: ['variable_binding'],
    },
    {
      id: 'rb-pattern-14',
      title: 'Fix Pin Operator Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the pattern that should match a specific value but creates a new binding instead.',
      skeleton: `target = "admin"

case { role: "admin", name: "Alice" }
in { role: target, name: String => name }
  puts "\\\#{name} is \\\#{target}"
end
# Bug: target is rebound to "admin" instead of checking equality`,
      solution: `target = "admin"

case { role: "admin", name: "Alice" }
in { role: ^target, name: String => name }
  puts "\\\#{name} is \\\#{target}"
end`,
      hints: ['Without ^, target becomes a new variable binding', '^target pins the value and checks equality', 'Pin operator prevents rebinding'],
      concepts: ['pin_operator'],
    },
    {
      id: 'rb-pattern-15',
      title: 'Fix NoMatchingPatternError',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the pattern match that raises when no pattern matches.',
      skeleton: `def categorize(val)
  case val
  in Integer => n if n > 0
    "positive"
  in Integer => n if n < 0
    "negative"
  end
end

puts categorize(5)
puts categorize(-3)
puts categorize(0)    # NoMatchingPatternError!`,
      solution: `def categorize(val)
  case val
  in Integer => n if n > 0
    "positive"
  in Integer => n if n < 0
    "negative"
  else
    "zero"
  end
end

puts categorize(5)
puts categorize(-3)
puts categorize(0)`,
      hints: ['case/in raises NoMatchingPatternError if nothing matches', 'Always include an else clause for safety', '0 is neither > 0 nor < 0'],
      concepts: ['no_matching_pattern', 'else_clause'],
    },
    {
      id: 'rb-pattern-16',
      title: 'Predict Pattern Match Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict which pattern matches.',
      skeleton: `case [1, "two", 3]
in [Integer => a, String, Integer]
  puts "A: \\\#{a}"
in [Integer, String => b, Integer]
  puts "B: \\\#{b}"
end`,
      solution: `A: 1`,
      hints: ['Both patterns could match, but the first one wins', 'Pattern matching checks top to bottom', 'The first in block matches [Integer, String, Integer]'],
      concepts: ['pattern_priority'],
    },
    {
      id: 'rb-pattern-17',
      title: 'Predict Find Pattern',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the find pattern result.',
      skeleton: `case [10, 20, "target", 30, 40]
in [*pre, String => s, *post]
  puts s
  puts pre.inspect
  puts post.inspect
end`,
      solution: `target
[10, 20]
[30, 40]`,
      hints: ['*pre captures everything before the match', 'String => s matches the string element', '*post captures everything after'],
      concepts: ['find_pattern_capture'],
    },
    {
      id: 'rb-pattern-18',
      title: 'Predict Guard Clause',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict pattern matching with guard clauses.',
      skeleton: `val = { x: 5, y: -3 }

result = case val
  in { x: Integer => x, y: Integer => y } if x > 0 && y > 0
    "Q1"
  in { x: Integer => x, y: Integer => y } if x > 0 && y < 0
    "Q4"
  in { x: Integer, y: Integer }
    "other"
  end

puts result`,
      solution: `Q4`,
      hints: ['x=5 (positive), y=-3 (negative)', 'First guard: x>0 && y>0 is false', 'Second guard: x>0 && y<0 is true'],
      concepts: ['guard_evaluation'],
    },
    {
      id: 'rb-pattern-19',
      title: 'Refactor Case/When to Case/In',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor a case/when to use pattern matching.',
      skeleton: `def process(input)
  case input
  when Array
    if input.length == 2 && input.all? { |e| e.is_a?(Numeric) }
      "point(\\\#{input[0]}, \\\#{input[1]})"
    else
      "array of \\\#{input.length}"
    end
  when Hash
    if input.key?(:name) && input.key?(:age)
      "person: \\\#{input[:name]}, age \\\#{input[:age]}"
    else
      "hash with \\\#{input.keys.length} keys"
    end
  else
    "unknown"
  end
end`,
      solution: `def process(input)
  case input
  in [Numeric => x, Numeric => y]
    "point(\\\#{x}, \\\#{y})"
  in Array => arr
    "array of \\\#{arr.length}"
  in { name: String => name, age: Integer => age }
    "person: \\\#{name}, age \\\#{age}"
  in Hash => h
    "hash with \\\#{h.keys.length} keys"
  else
    "unknown"
  end
end`,
      hints: ['Replace type checks and conditions with patterns', 'Specific patterns go before general ones', 'Pattern matching handles destructuring automatically'],
      concepts: ['case_when_to_case_in'],
    },
    {
      id: 'rb-pattern-20',
      title: 'Refactor If Chain to Patterns',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Refactor an if/elsif chain to pattern matching.',
      skeleton: `def handle_event(event)
  if event.is_a?(Hash)
    if event[:type] == "click" && event[:target].is_a?(String)
      "Clicked on \\\#{event[:target]}"
    elsif event[:type] == "keypress" && event[:key].is_a?(String) && event[:key].length == 1
      "Key: \\\#{event[:key]}"
    elsif event[:type] == "scroll" && event[:delta].is_a?(Numeric)
      if event[:delta] > 0
        "Scroll down"
      else
        "Scroll up"
      end
    else
      "Unknown event: \\\#{event[:type]}"
    end
  else
    "Invalid event"
  end
end`,
      solution: `def handle_event(event)
  case event
  in { type: "click", target: String => target }
    "Clicked on \\\#{target}"
  in { type: "keypress", key: /\\A.\\z/ => key }
    "Key: \\\#{key}"
  in { type: "scroll", delta: (1..) }
    "Scroll down"
  in { type: "scroll", delta: (..0) }
    "Scroll up"
  in { type: String => type }
    "Unknown event: \\\#{type}"
  else
    "Invalid event"
  end
end`,
      hints: ['Each if branch becomes an in pattern', 'Use regex /\\A.\\z/ for single-char strings', 'Split scroll into two patterns based on delta range'],
      concepts: ['if_to_pattern', 'regex_pattern'],
    },
  ],
};
