import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-compare',
  title: '35. Comparable & Enumerable',
  explanation: `## Comparable & Enumerable in Ruby

These two modules provide powerful behavior when you implement their required methods.

### Comparable

Include Comparable and define \`<=>\` to get <, <=, >, >=, ==, between?, and clamp for free.

\`\`\`ruby
class Weight
  include Comparable
  attr_reader :grams

  def initialize(grams)
    @grams = grams
  end

  def <=>(other)
    @grams <=> other.grams
  end
end

a = Weight.new(100)
b = Weight.new(200)
puts a < b   # => true
puts a.between?(Weight.new(50), Weight.new(150)) # => true
\`\`\`

### Enumerable

Include Enumerable and define \`each\` to get map, select, reject, sort, min, max, reduce, and 50+ methods.

\`\`\`ruby
class NumberSet
  include Enumerable

  def initialize(*numbers)
    @numbers = numbers
  end

  def each(&block)
    @numbers.each(&block)
  end
end

s = NumberSet.new(3, 1, 4, 1, 5)
puts s.sort.inspect     # => [1, 1, 3, 4, 5]
puts s.select(&:odd?)   # => [3, 1, 1, 5]
puts s.max              # => 5
puts s.reduce(:+)       # => 14
\`\`\`

### Combining Both

\`\`\`ruby
class Student
  include Comparable
  attr_reader :name, :gpa

  def initialize(name, gpa)
    @name = name
    @gpa = gpa
  end

  def <=>(other)
    @gpa <=> other.gpa
  end
end

students = [Student.new("A", 3.5), Student.new("B", 3.9)]
puts students.max.name  # => "B"
puts students.sort.map(&:name).inspect
\`\`\``,
  exercises: [
    {
      id: 'rb-compare-1',
      title: 'Include Comparable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Include Comparable and implement <=>.',
      skeleton: `class Temperature
  ___ Comparable
  attr_reader :degrees

  def initialize(degrees)
    @degrees = degrees
  end

  def ___(other)
    @degrees <=> other.degrees
  end
end`,
      solution: `class Temperature
  include Comparable
  attr_reader :degrees

  def initialize(degrees)
    @degrees = degrees
  end

  def <=>(other)
    @degrees <=> other.degrees
  end
end`,
      hints: ['include Comparable mixes in the module', 'You must define the <=> (spaceship) operator', '<=> returns -1, 0, or 1'],
      concepts: ['comparable', 'spaceship'],
    },
    {
      id: 'rb-compare-2',
      title: 'Spaceship Operator Return',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Understand the return values of <=>.',
      skeleton: `# Fill in the return values
puts (1 <=> 2)   # ___
puts (2 <=> 2)   # ___
puts (3 <=> 2)   # ___`,
      solution: `# Fill in the return values
puts (1 <=> 2)   # -1
puts (2 <=> 2)   # 0
puts (3 <=> 2)   # 1`,
      hints: ['<=> returns -1 when left < right', '0 when left == right', '1 when left > right'],
      concepts: ['spaceship_values'],
    },
    {
      id: 'rb-compare-3',
      title: 'Include Enumerable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Include Enumerable and implement each.',
      skeleton: `class WordList
  ___ Enumerable

  def initialize(*words)
    @words = words
  end

  def ___(& block)
    @words.each(&block)
  end
end`,
      solution: `class WordList
  include Enumerable

  def initialize(*words)
    @words = words
  end

  def each(&block)
    @words.each(&block)
  end
end`,
      hints: ['include Enumerable enables all enumeration methods', 'You must define each to yield items', 'Delegate to the internal collection each'],
      concepts: ['enumerable', 'each'],
    },
    {
      id: 'rb-compare-4',
      title: 'Comparable between?',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use the between? method from Comparable.',
      skeleton: `class Score
  include Comparable
  attr_reader :value
  def initialize(v) = @value = v
  def <=>(other) = @value <=> other.value
end

s = Score.new(75)
puts s.___?(Score.new(60), Score.new(90))  # true`,
      solution: `class Score
  include Comparable
  attr_reader :value
  def initialize(v) = @value = v
  def <=>(other) = @value <=> other.value
end

s = Score.new(75)
puts s.between?(Score.new(60), Score.new(90))  # true`,
      hints: ['between? is provided by Comparable', 'between?(min, max) checks if min <= self <= max', 'It uses <=> internally'],
      concepts: ['between'],
    },
    {
      id: 'rb-compare-5',
      title: 'Enumerable reduce',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use reduce on an Enumerable class.',
      skeleton: `class Basket
  include Enumerable
  def initialize(items) = @items = items
  def each(&b) = @items.each(&b)
end

prices = Basket.new([10.5, 20.0, 5.75])
total = prices.___(0) { |sum, p| sum + p }
puts total`,
      solution: `class Basket
  include Enumerable
  def initialize(items) = @items = items
  def each(&b) = @items.each(&b)
end

prices = Basket.new([10.5, 20.0, 5.75])
total = prices.reduce(0) { |sum, p| sum + p }
puts total`,
      hints: ['reduce accumulates a value over each element', 'The argument is the initial value', 'The block receives accumulator and current element'],
      concepts: ['reduce'],
    },
    {
      id: 'rb-compare-6',
      title: 'Comparable clamp',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use the clamp method from Comparable.',
      skeleton: `class Percent
  include Comparable
  attr_reader :value
  def initialize(v) = @value = v
  def <=>(other) = @value <=> other.value
  def to_s = "\\\#{value}%"
end

p = Percent.new(150)
clamped = p.___(Percent.new(0), Percent.new(100))
puts clamped`,
      solution: `class Percent
  include Comparable
  attr_reader :value
  def initialize(v) = @value = v
  def <=>(other) = @value <=> other.value
  def to_s = "\\\#{value}%"
end

p = Percent.new(150)
clamped = p.clamp(Percent.new(0), Percent.new(100))
puts clamped`,
      hints: ['clamp(min, max) restricts a value to a range', 'Returns min if self < min, max if self > max', 'Provided automatically by Comparable'],
      concepts: ['clamp'],
    },
    {
      id: 'rb-compare-7',
      title: 'Write Comparable Card',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Card class with Comparable for ranking.',
      skeleton: `# Write a Card class with :rank and :suit
# Include Comparable
# Rank order: 2..10, J=11, Q=12, K=13, A=14
# Compare by rank only
# Add a to_s method
`,
      solution: `class Card
  include Comparable

  RANKS = { 'J' => 11, 'Q' => 12, 'K' => 13, 'A' => 14 }

  attr_reader :rank, :suit

  def initialize(rank, suit)
    @rank = rank
    @suit = suit
  end

  def rank_value
    RANKS.fetch(rank.to_s, rank.to_i)
  end

  def <=>(other)
    rank_value <=> other.rank_value
  end

  def to_s
    "\\\#{rank} of \\\#{suit}"
  end
end

cards = [Card.new(10, :hearts), Card.new('A', :spades), Card.new(3, :clubs)]
puts cards.sort.map(&:to_s).inspect`,
      hints: ['Map face cards to numeric values', 'Compare using the numeric rank value', 'Comparable gives you sort, min, max for free'],
      concepts: ['comparable_custom', 'card_ranking'],
    },
    {
      id: 'rb-compare-8',
      title: 'Write Enumerable Collection',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a custom collection that includes Enumerable.',
      skeleton: `# Write a Registry class:
# - include Enumerable
# - add(name, value) stores items
# - each yields [name, value] pairs
# - find_by_name(name) returns the value
# Demonstrate using map, select, any?
`,
      solution: `class Registry
  include Enumerable

  def initialize
    @entries = {}
  end

  def add(name, value)
    @entries[name] = value
    self
  end

  def each(&block)
    @entries.each_pair(&block)
  end

  def find_by_name(name)
    @entries[name]
  end
end

reg = Registry.new
reg.add(:ruby, 3.2).add(:python, 3.12).add(:node, 20)

puts reg.map { |name, ver| "\\\#{name}: \\\#{ver}" }.inspect
puts reg.select { |_, ver| ver.is_a?(Float) }.inspect
puts reg.any? { |name, _| name == :ruby }`,
      hints: ['include Enumerable requires defining each', 'each should yield the key-value pairs', 'All Enumerable methods work on what each yields'],
      concepts: ['enumerable_collection', 'each_pair'],
    },
    {
      id: 'rb-compare-9',
      title: 'Write SortedArray',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a SortedArray that maintains sorted order using Comparable.',
      skeleton: `# Write a SortedArray class:
# - include Enumerable
# - insert(item) adds maintaining sorted order (items must be Comparable)
# - each yields items in order
# - to_a returns sorted array
# - median returns the middle element
`,
      solution: `class SortedArray
  include Enumerable

  def initialize
    @data = []
  end

  def insert(item)
    index = @data.bsearch_index { |x| x >= item } || @data.size
    @data.insert(index, item)
    self
  end

  def each(&block)
    @data.each(&block)
  end

  def to_a
    @data.dup
  end

  def median
    return nil if @data.empty?
    @data[@data.size / 2]
  end

  def size
    @data.size
  end
end

sa = SortedArray.new
[5, 2, 8, 1, 9, 3].each { |n| sa.insert(n) }
puts sa.to_a.inspect
puts sa.min
puts sa.max
puts sa.median`,
      hints: ['Use bsearch_index to find insertion point efficiently', 'Array#insert(index, value) inserts at position', 'Enumerable methods like min/max come for free'],
      concepts: ['sorted_collection', 'binary_search'],
    },
    {
      id: 'rb-compare-10',
      title: 'Write Multi-Field Comparable',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a class that compares on multiple fields.',
      skeleton: `# Write an Employee class with :name, :department, :salary
# Include Comparable
# Sort by department (ascending), then salary (descending)
`,
      solution: `class Employee
  include Comparable
  attr_reader :name, :department, :salary

  def initialize(name, department, salary)
    @name = name
    @department = department
    @salary = salary
  end

  def <=>(other)
    result = department <=> other.department
    return result unless result == 0
    other.salary <=> salary  # descending salary
  end

  def to_s
    "\\\#{name} (\\\#{department}, $\\\#{salary})"
  end
end

emps = [
  Employee.new("Alice", "Engineering", 120000),
  Employee.new("Bob", "Engineering", 100000),
  Employee.new("Carol", "Design", 90000),
]
puts emps.sort.map(&:to_s).inspect`,
      hints: ['Compare department first, then salary if departments are equal', 'For descending order, swap the comparison order', 'Return the first non-zero comparison result'],
      concepts: ['multi_field_compare', 'descending_sort'],
    },
    {
      id: 'rb-compare-11',
      title: 'Write Enumerable with Lazy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write an Enumerable class that supports lazy evaluation.',
      skeleton: `# Write an InfiniteSequence class:
# - include Enumerable
# - initialize takes a start value and a step block
# - each yields infinite values
# - Use .lazy to take finite subsets
# Example: InfiniteSequence.new(1) { |n| n + 2 } yields 1, 3, 5, 7...
`,
      solution: `class InfiniteSequence
  include Enumerable

  def initialize(start, &step)
    @start = start
    @step = step
  end

  def each
    current = @start
    loop do
      yield current
      current = @step.call(current)
    end
  end
end

odds = InfiniteSequence.new(1) { |n| n + 2 }
puts odds.lazy.first(10).inspect

powers = InfiniteSequence.new(1) { |n| n * 2 }
puts powers.lazy.select { |n| n > 100 }.first(5).inspect`,
      hints: ['each with an infinite loop works because of lazy evaluation', '.lazy returns a lazy enumerator', 'Callers use .first(n) or .take(n) to limit'],
      concepts: ['lazy_enumerable', 'infinite_sequence'],
    },
    {
      id: 'rb-compare-12',
      title: 'Write Enumerable Statistics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a DataSet class with statistical methods using Enumerable.',
      skeleton: `# Write a DataSet class:
# - include Enumerable
# - initialize with array of numbers
# - each delegates to array
# - mean returns average
# - variance returns statistical variance
# - std_dev returns standard deviation
`,
      solution: `class DataSet
  include Enumerable

  def initialize(values)
    @values = values
  end

  def each(&block)
    @values.each(&block)
  end

  def mean
    sum.to_f / count
  end

  def variance
    m = mean
    map { |v| (v - m) ** 2 }.sum / count
  end

  def std_dev
    Math.sqrt(variance)
  end
end

ds = DataSet.new([4, 8, 15, 16, 23, 42])
puts "Mean: \\\#{ds.mean}"
puts "Variance: \\\#{ds.variance}"
puts "Std Dev: \\\#{ds.std_dev.round(2)}"
puts "Min: \\\#{ds.min}, Max: \\\#{ds.max}"`,
      hints: ['Enumerable gives you sum, count, map, min, max for free', 'mean = sum / count', 'variance = average of squared deviations from mean'],
      concepts: ['enumerable_statistics'],
    },
    {
      id: 'rb-compare-13',
      title: 'Fix Missing <=> Return',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the <=> that does not handle incompatible types.',
      skeleton: `class Length
  include Comparable
  attr_reader :cm
  def initialize(cm) = @cm = cm
  def <=>(other)
    @cm <=> other.cm  # crashes if other is not Length
  end
end

puts Length.new(10) > Length.new(5)
puts Length.new(10) == "not a length"  # NoMethodError`,
      solution: `class Length
  include Comparable
  attr_reader :cm
  def initialize(cm) = @cm = cm
  def <=>(other)
    return nil unless other.is_a?(Length)
    @cm <=> other.cm
  end
end

puts Length.new(10) > Length.new(5)
puts Length.new(10) == "not a length"`,
      hints: ['<=> should return nil for incompatible types', 'Check is_a? before comparing', 'Returning nil means "not comparable"'],
      concepts: ['spaceship_nil', 'type_check'],
    },
    {
      id: 'rb-compare-14',
      title: 'Fix Missing each',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the Enumerable class that forgot to define each.',
      skeleton: `class NumberBag
  include Enumerable

  def initialize(*nums)
    @nums = nums
  end

  # Forgot to define each!
end

bag = NumberBag.new(1, 2, 3)
puts bag.map { |n| n * 2 }.inspect  # NoMethodError`,
      solution: `class NumberBag
  include Enumerable

  def initialize(*nums)
    @nums = nums
  end

  def each(&block)
    @nums.each(&block)
  end
end

bag = NumberBag.new(1, 2, 3)
puts bag.map { |n| n * 2 }.inspect`,
      hints: ['Enumerable requires you to define each', 'Without each, all Enumerable methods fail', 'Delegate to the internal array each'],
      concepts: ['enumerable_contract'],
    },
    {
      id: 'rb-compare-15',
      title: 'Fix Sort with Nil Comparison',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the sort that breaks when comparing with nil values.',
      skeleton: `class OptionalScore
  include Comparable
  attr_reader :value

  def initialize(value)
    @value = value  # can be nil
  end

  def <=>(other)
    @value <=> other.value  # fails when either is nil
  end
end

scores = [OptionalScore.new(90), OptionalScore.new(nil), OptionalScore.new(80)]
puts scores.sort.map { |s| s.value || "N/A" }.inspect`,
      solution: `class OptionalScore
  include Comparable
  attr_reader :value

  def initialize(value)
    @value = value
  end

  def <=>(other)
    return 0 if value.nil? && other.value.nil?
    return 1 if value.nil?
    return -1 if other.value.nil?
    value <=> other.value
  end
end

scores = [OptionalScore.new(90), OptionalScore.new(nil), OptionalScore.new(80)]
puts scores.sort.map { |s| s.value || "N/A" }.inspect`,
      hints: ['Handle nil cases explicitly in <=>', 'Decide where nils should sort (beginning or end)', 'Check both sides for nil before comparing'],
      concepts: ['nil_comparison', 'robust_spaceship'],
    },
    {
      id: 'rb-compare-16',
      title: 'Predict Comparable Methods',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict the output of Comparable methods.',
      skeleton: `class Box
  include Comparable
  attr_reader :size
  def initialize(s) = @size = s
  def <=>(other) = size <=> other.size
end

a, b, c = Box.new(3), Box.new(5), Box.new(3)
puts a < b
puts a == c
puts b.between?(a, Box.new(7))
puts a.clamp(Box.new(4), Box.new(6)).size`,
      solution: `true
true
true
4`,
      hints: ['a(3) < b(5) is true', 'a(3) == c(3) is true (same size)', 'clamp(4,6) on 3 returns 4 (the min)'],
      concepts: ['comparable_methods'],
    },
    {
      id: 'rb-compare-17',
      title: 'Predict Enumerable Chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of chained Enumerable methods.',
      skeleton: `class Nums
  include Enumerable
  def initialize(arr) = @arr = arr
  def each(&b) = @arr.each(&b)
end

n = Nums.new([5, 12, 3, 8, 15, 1])
puts n.select(&:odd?).inspect
puts n.min_by { |x| (x - 10).abs }
puts n.flat_map { |x| [x, x * 2] }.first(4).inspect`,
      solution: `[5, 3, 15, 1]
12
[5, 10, 12, 24]`,
      hints: ['select(&:odd?) keeps odd numbers', 'min_by { |x| (x-10).abs } finds closest to 10', 'flat_map creates [5,10,12,24,3,6,8,16,15,30,1,2], first(4)'],
      concepts: ['enumerable_chain'],
    },
    {
      id: 'rb-compare-18',
      title: 'Predict sort_by Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict sorting behavior.',
      skeleton: `class Item
  include Comparable
  attr_reader :name, :price
  def initialize(n, p) = (@name, @price = n, p)
  def <=>(other) = name <=> other.name
end

items = [Item.new("C", 30), Item.new("A", 10), Item.new("B", 20)]
puts items.sort.map(&:name).inspect
puts items.sort_by(&:price).map(&:name).inspect`,
      solution: `["A", "B", "C"]
["A", "B", "C"]`,
      hints: ['sort uses <=> which compares by name', 'sort_by(&:price) sorts by price: 10, 20, 30', 'Both happen to give the same alphabetical order here'],
      concepts: ['sort_vs_sort_by'],
    },
    {
      id: 'rb-compare-19',
      title: 'Refactor Manual Iteration to Enumerable',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor manual iteration methods to use Enumerable.',
      skeleton: `class Playlist
  def initialize
    @songs = []
  end

  def add(song)
    @songs << song
  end

  def find_long(min_length)
    result = []
    @songs.each { |s| result << s if s[:length] > min_length }
    result
  end

  def total_length
    sum = 0
    @songs.each { |s| sum += s[:length] }
    sum
  end

  def longest
    max = nil
    @songs.each { |s| max = s if max.nil? || s[:length] > max[:length] }
    max
  end
end`,
      solution: `class Playlist
  include Enumerable

  def initialize
    @songs = []
  end

  def add(song)
    @songs << song
    self
  end

  def each(&block)
    @songs.each(&block)
  end

  def find_long(min_length)
    select { |s| s[:length] > min_length }
  end

  def total_length
    sum { |s| s[:length] }
  end

  def longest
    max_by { |s| s[:length] }
  end
end`,
      hints: ['include Enumerable and define each', 'Replace manual loops with select, sum, max_by', 'Enumerable methods are more expressive and concise'],
      concepts: ['manual_to_enumerable'],
    },
    {
      id: 'rb-compare-20',
      title: 'Refactor Conditional to Comparable',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor manual comparison logic to use Comparable.',
      skeleton: `class Priority
  attr_reader :level

  LEVELS = { low: 1, medium: 2, high: 3, critical: 4 }

  def initialize(level)
    @level = level
  end

  def higher_than?(other)
    LEVELS[@level] > LEVELS[other.level]
  end

  def lower_than?(other)
    LEVELS[@level] < LEVELS[other.level]
  end

  def same_as?(other)
    LEVELS[@level] == LEVELS[other.level]
  end
end`,
      solution: `class Priority
  include Comparable
  attr_reader :level

  LEVELS = { low: 1, medium: 2, high: 3, critical: 4 }

  def initialize(level)
    @level = level
  end

  def <=>(other)
    return nil unless other.is_a?(Priority)
    LEVELS[@level] <=> LEVELS[other.level]
  end
end

a = Priority.new(:low)
b = Priority.new(:high)
puts a < b
puts b > a
puts a == Priority.new(:low)
puts b.between?(Priority.new(:medium), Priority.new(:critical))`,
      hints: ['Replace higher_than?, lower_than?, same_as? with <=>', 'Comparable provides >, <, ==, between?, clamp', 'One method replaces three'],
      concepts: ['comparable_refactor'],
    },
  ],
};
