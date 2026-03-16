import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-frozen',
  title: '21. Frozen Objects',
  explanation: `## Frozen Objects in Ruby

Ruby's \`freeze\` method makes an object immutable. Once frozen, any attempt to modify the object raises a \`FrozenError\`.

\`\`\`ruby
str = "hello"
str.freeze
str << " world"  # => FrozenError: can't modify frozen String

# Check if frozen
str.frozen?  # => true

# dup vs clone
original = "hello".freeze
duped = original.dup      # NOT frozen
cloned = original.clone   # IS frozen (preserves frozen state)

duped.frozen?   # => false
cloned.frozen?  # => true

# Frozen string literal pragma
# frozen_string_literal: true
# All string literals in this file are automatically frozen

# Numbers and symbols are always frozen
42.frozen?     # => true
:hello.frozen? # => true
true.frozen?   # => true

# Immutable patterns
DEFAULTS = {
  host: "localhost",
  port: 3000
}.freeze
\`\`\`

### Key Concepts

- **\`freeze\`** makes any object immutable
- **\`frozen?\`** checks if an object is frozen
- **\`dup\`** creates a shallow copy that is NOT frozen
- **\`clone\`** creates a shallow copy that preserves frozen state
- **Freezing is shallow** — nested objects are NOT frozen
- The \`# frozen_string_literal: true\` pragma freezes all string literals
- Integers, symbols, \`true\`, \`false\`, and \`nil\` are always frozen`,
  exercises: [
    {
      id: 'rb-frozen-1',
      title: 'Freeze an Object',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to freeze the array.',
      skeleton: `colors = ["red", "green", "blue"]
colors.___
# colors << "yellow"  # Would raise FrozenError`,
      solution: `colors = ["red", "green", "blue"]
colors.freeze
# colors << "yellow"  # Would raise FrozenError`,
      hints: [
        '`freeze` makes an object immutable.',
        'Once frozen, you cannot add, remove, or modify elements.',
        'Attempting to modify raises FrozenError.',
      ],
      concepts: ['freeze', 'immutability', 'FrozenError'],
    },
    {
      id: 'rb-frozen-2',
      title: 'Check Frozen State',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to check if the object is frozen.',
      skeleton: `str = "hello".freeze
puts str.___`,
      solution: `str = "hello".freeze
puts str.frozen?`,
      hints: [
        '`frozen?` returns true if the object is frozen.',
        'It is a predicate method (ends with ?).',
        'Returns false for unfrozen objects.',
      ],
      concepts: ['frozen?', 'predicate-methods', 'checking'],
    },
    {
      id: 'rb-frozen-3',
      title: 'dup vs clone',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to create an unfrozen copy of the frozen string.',
      skeleton: `original = "hello".freeze
copy = original.___
copy << " world"
puts copy`,
      solution: `original = "hello".freeze
copy = original.dup
copy << " world"
puts copy`,
      hints: [
        '`dup` creates a copy that is NOT frozen.',
        '`clone` would preserve the frozen state.',
        'dup is the safe way to get a mutable copy.',
      ],
      concepts: ['dup', 'clone', 'unfrozen-copy'],
    },
    {
      id: 'rb-frozen-4',
      title: 'Freeze a Hash',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to create a frozen constant hash.',
      skeleton: `CONFIG = {
  host: "localhost",
  port: 3000
}.___`,
      solution: `CONFIG = {
  host: "localhost",
  port: 3000
}.freeze`,
      hints: [
        'Chain .freeze after the hash literal.',
        'This prevents adding or removing keys.',
        'Constants should often be frozen for safety.',
      ],
      concepts: ['freeze', 'constants', 'hash'],
    },
    {
      id: 'rb-frozen-5',
      title: 'Deep Freeze Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blanks to freeze both the array and its string elements.',
      skeleton: `tags = ["ruby", "rails", "web"]
tags.each { |t| t.___ }
tags.___`,
      solution: `tags = ["ruby", "rails", "web"]
tags.each { |t| t.freeze }
tags.freeze`,
      hints: [
        'freeze is shallow by default.',
        'You must freeze each element individually.',
        'Then freeze the container itself.',
      ],
      concepts: ['deep-freeze', 'shallow-freeze', 'immutability'],
    },
    {
      id: 'rb-frozen-6',
      title: 'Frozen Literal Check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to check that integers are always frozen.',
      skeleton: `num = 42
puts num.___
puts num.class`,
      solution: `num = 42
puts num.frozen?
puts num.class`,
      hints: [
        'Integers, symbols, true, false, and nil are always frozen.',
        'You cannot unfreeze them.',
        'This is because they are immediate values.',
      ],
      concepts: ['frozen?', 'immediate-values', 'always-frozen'],
    },
    {
      id: 'rb-frozen-7',
      title: 'Write a Safe Defaults Module',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a module Defaults with a constant SETTINGS hash (frozen) and a method get(key) that returns the value or "unknown". Also write set(key, val) that returns a NEW hash with the change (not mutating the original).',
      skeleton: `# Write your Defaults module`,
      solution: `module Defaults
  SETTINGS = {
    theme: "dark",
    language: "en",
    timeout: 30
  }.freeze

  def self.get(key)
    SETTINGS[key] || "unknown"
  end

  def self.set(key, val)
    SETTINGS.merge(key => val)
  end
end`,
      hints: [
        'Freeze the SETTINGS hash to prevent mutation.',
        'get returns the value or a default.',
        'set uses merge to return a NEW hash without mutating.',
      ],
      concepts: ['freeze', 'constants', 'merge'],
    },
    {
      id: 'rb-frozen-8',
      title: 'Write a Deep Freeze Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method deep_freeze(obj) that recursively freezes an object and all nested arrays and hashes.',
      skeleton: `# Write your deep_freeze method`,
      solution: `def deep_freeze(obj)
  case obj
  when Hash
    obj.each_value { |v| deep_freeze(v) }
  when Array
    obj.each { |el| deep_freeze(el) }
  end
  obj.freeze
end`,
      hints: [
        'Handle Hash, Array, and other types.',
        'Recursively freeze nested structures.',
        'Freeze the object itself at the end.',
      ],
      concepts: ['deep-freeze', 'recursion', 'case-when'],
    },
    {
      id: 'rb-frozen-9',
      title: 'Write a Frozen Value Object',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Point class that freezes itself in initialize. It should have x and y readers and a move(dx, dy) method that returns a NEW frozen Point.',
      skeleton: `# Write your frozen Point class`,
      solution: `class Point
  attr_reader :x, :y

  def initialize(x, y)
    @x = x
    @y = y
    freeze
  end

  def move(dx, dy)
    Point.new(@x + dx, @y + dy)
  end

  def to_s
    "(\#{@x}, \#{@y})"
  end
end`,
      hints: [
        'Call freeze at the end of initialize.',
        'move creates a new Point instead of modifying.',
        'This is the immutable value object pattern.',
      ],
      concepts: ['value-object', 'freeze', 'immutable-pattern'],
    },
    {
      id: 'rb-frozen-10',
      title: 'Write a Frozen String Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method build_string that takes a block, provides a mutable string to the block, then freezes and returns the result.',
      skeleton: `# Write your build_string method`,
      solution: `def build_string
  str = +""
  yield str
  str.freeze
end`,
      hints: [
        'Use +\"\" to create an unfrozen mutable string.',
        'Yield the string to the block for building.',
        'Freeze it before returning.',
      ],
      concepts: ['unary-plus', 'yield', 'freeze'],
    },
    {
      id: 'rb-frozen-11',
      title: 'Write Immutable Config Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Config class that takes a hash in initialize, freezes itself, and provides method_missing to access keys. The with(overrides) method should return a new Config with merged values.',
      skeleton: `# Write your immutable Config class`,
      solution: `class Config
  def initialize(data = {})
    @data = data.freeze
    freeze
  end

  def method_missing(name, *args)
    if @data.key?(name)
      @data[name]
    else
      super
    end
  end

  def respond_to_missing?(name, include_private = false)
    @data.key?(name) || super
  end

  def with(overrides)
    Config.new(@data.merge(overrides))
  end
end`,
      hints: [
        'Freeze both @data and self in initialize.',
        'method_missing allows hash access via method calls.',
        'with returns a new Config, preserving immutability.',
      ],
      concepts: ['freeze', 'method_missing', 'immutable-pattern'],
    },
    {
      id: 'rb-frozen-12',
      title: 'Write a Safe Array Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a class ImmutableList that wraps an array, freezes it, and provides each, map (returning new ImmutableList), length, and to_a methods.',
      skeleton: `# Write your ImmutableList class`,
      solution: `class ImmutableList
  include Enumerable

  def initialize(items)
    @items = items.dup.freeze
    freeze
  end

  def each(&block)
    @items.each(&block)
  end

  def map(&block)
    ImmutableList.new(@items.map(&block))
  end

  def length
    @items.length
  end

  def to_a
    @items.dup
  end
end`,
      hints: [
        'dup the input array before freezing to avoid side effects.',
        'map should return a new ImmutableList.',
        'to_a returns a dup so the internal array stays safe.',
      ],
      concepts: ['freeze', 'Enumerable', 'defensive-copy'],
    },
    {
      id: 'rb-frozen-13',
      title: 'Fix Shallow Freeze Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so nested arrays cannot be modified.',
      skeleton: `matrix = [[1, 2], [3, 4]].freeze
matrix[0] << 5
puts matrix.inspect`,
      solution: `matrix = [[1, 2].freeze, [3, 4].freeze].freeze
matrix[0] << 5  # Now raises FrozenError
puts matrix.inspect`,
      hints: [
        'freeze is shallow - it only freezes the outer array.',
        'Inner arrays are still mutable.',
        'Freeze each inner array before freezing the outer one.',
      ],
      concepts: ['shallow-freeze', 'nested-mutation', 'deep-freeze'],
    },
    {
      id: 'rb-frozen-14',
      title: 'Fix dup vs clone Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so the copy can be modified.',
      skeleton: `original = "immutable".freeze
copy = original.clone
copy << " modified"
puts copy`,
      solution: `original = "immutable".freeze
copy = original.dup
copy << " modified"
puts copy`,
      hints: [
        'clone preserves the frozen state.',
        'dup creates an unfrozen copy.',
        'Use dup when you need a mutable copy.',
      ],
      concepts: ['dup-vs-clone', 'frozen-state', 'common-bugs'],
    },
    {
      id: 'rb-frozen-15',
      title: 'Fix Frozen Constant Assignment',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code to safely add to a frozen array constant.',
      skeleton: `COLORS = ["red", "green", "blue"].freeze
COLORS << "yellow"
puts COLORS.inspect`,
      solution: `COLORS = ["red", "green", "blue"].freeze
new_colors = COLORS + ["yellow"]
puts new_colors.inspect`,
      hints: [
        'Frozen arrays cannot be modified with <<.',
        'Use + to create a new array with the addition.',
        'Assign to a new variable instead of mutating the constant.',
      ],
      concepts: ['freeze', 'array-concatenation', 'immutability'],
    },
    {
      id: 'rb-frozen-16',
      title: 'Predict Freeze Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `a = [1, 2, 3]
b = a.freeze
puts a.frozen?
puts a.equal?(b)`,
      solution: `true
true`,
      hints: [
        'freeze returns the same object, not a copy.',
        'a and b reference the same array.',
        'equal? checks object identity.',
      ],
      concepts: ['freeze', 'object-identity', 'equal?'],
    },
    {
      id: 'rb-frozen-17',
      title: 'Predict dup Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `original = "hello".freeze
copy = original.dup
copy << " world"
puts original
puts copy
puts original.frozen?
puts copy.frozen?`,
      solution: `hello
hello world
true
false`,
      hints: [
        'dup creates a new, unfrozen copy.',
        'Modifying copy does not affect original.',
        'original stays frozen, copy is not frozen.',
      ],
      concepts: ['dup', 'freeze', 'independent-copies'],
    },
    {
      id: 'rb-frozen-18',
      title: 'Predict Always-Frozen Types',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `puts 42.frozen?
puts :hello.frozen?
puts true.frozen?
puts nil.frozen?`,
      solution: `true
true
true
true`,
      hints: [
        'Integers, symbols, booleans, and nil are always frozen.',
        'These are immediate values in Ruby.',
        'You cannot call freeze or unfreeze on them (freeze is a no-op).',
      ],
      concepts: ['immediate-values', 'always-frozen', 'frozen?'],
    },
    {
      id: 'rb-frozen-19',
      title: 'Refactor to Frozen Constants',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Refactor to properly freeze all constants.',
      skeleton: `DIRECTIONS = ["north", "south", "east", "west"]
MAX_SPEED = 100
DEFAULT_NAME = "Player"

# Someone could do: DIRECTIONS << "up"
# Or: DEFAULT_NAME << " 1"`,
      solution: `DIRECTIONS = ["north", "south", "east", "west"].freeze
MAX_SPEED = 100
DEFAULT_NAME = "Player".freeze

# DIRECTIONS << "up"    # => FrozenError
# DEFAULT_NAME << " 1"  # => FrozenError`,
      hints: [
        'Freeze mutable constants (arrays, strings, hashes).',
        'Numbers are already frozen, no need to freeze MAX_SPEED.',
        'This prevents accidental modification.',
      ],
      concepts: ['freeze', 'constants', 'defensive-programming'],
    },
    {
      id: 'rb-frozen-20',
      title: 'Refactor Mutation to New Objects',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor this mutating code to work with frozen objects by creating new objects instead.',
      skeleton: `class Settings
  attr_accessor :theme, :font_size

  def initialize(theme, font_size)
    @theme = theme
    @font_size = font_size
  end

  def update_theme(new_theme)
    @theme = new_theme
  end

  def increase_font
    @font_size += 1
  end
end`,
      solution: `class Settings
  attr_reader :theme, :font_size

  def initialize(theme, font_size)
    @theme = theme
    @font_size = font_size
    freeze
  end

  def update_theme(new_theme)
    Settings.new(new_theme, @font_size)
  end

  def increase_font
    Settings.new(@theme, @font_size + 1)
  end
end`,
      hints: [
        'Change attr_accessor to attr_reader.',
        'Freeze self in initialize.',
        'Return new Settings objects instead of mutating.',
      ],
      concepts: ['immutable-pattern', 'freeze', 'value-objects'],
    },
  ],
};
