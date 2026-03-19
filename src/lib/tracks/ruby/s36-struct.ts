import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-struct',
  title: '36. Struct',
  explanation: `## Struct in Ruby

Struct is a compact way to create classes that hold data. Unlike Data, Structs are mutable by default.

### Basic Struct

\`\`\`ruby
Point = Struct.new(:x, :y)
p = Point.new(1, 2)
puts p.x  # => 1
p.x = 10  # mutable!
\`\`\`

### Keyword Init

\`\`\`ruby
Person = Struct.new(:name, :age, keyword_init: true)
p = Person.new(name: "Alice", age: 30)
\`\`\`

### Custom Methods

\`\`\`ruby
Point = Struct.new(:x, :y) do
  def distance_to(other)
    Math.sqrt((x - other.x)**2 + (y - other.y)**2)
  end
end
\`\`\`

### Members and Equality

\`\`\`ruby
p = Point.new(1, 2)
p.members    # => [:x, :y]
p.to_a       # => [1, 2]
p.to_h       # => {x: 1, y: 2}
p == Point.new(1, 2)  # => true (value equality)
\`\`\`

### Struct vs Class vs Data

| Feature     | Class  | Struct  | Data      |
|-------------|--------|---------|-----------|
| Mutable     | Yes    | Yes     | No        |
| Equality    | Manual | Value   | Value     |
| Boilerplate | High   | Low     | Lowest    |
| Keyword init| Manual | Option  | Required  |
\`\`\``,
  exercises: [
    {
      id: 'rb-struct-1',
      title: 'Define a Struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Define a Struct for a coordinate point.',
      skeleton: `Point = ___.___(:x, :y)
p = Point.new(3, 4)
puts p.x
puts p.y`,
      solution: `Point = Struct.new(:x, :y)
p = Point.new(3, 4)
puts p.x
puts p.y`,
      hints: ['Struct.new creates a new class', 'Pass member names as symbols', 'Members become accessor methods'],
      concepts: ['struct_new'],
    },
    {
      id: 'rb-struct-2',
      title: 'Keyword Init',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Create a Struct with keyword initialization.',
      skeleton: `User = Struct.new(:name, :email, ___: true)
u = User.new(name: "Alice", email: "alice@ex.com")
puts u.name`,
      solution: `User = Struct.new(:name, :email, keyword_init: true)
u = User.new(name: "Alice", email: "alice@ex.com")
puts u.name`,
      hints: ['keyword_init: true enables keyword arguments', 'Without it, arguments are positional', 'This makes construction more explicit'],
      concepts: ['keyword_init'],
    },
    {
      id: 'rb-struct-3',
      title: 'Struct Members',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Access Struct member metadata.',
      skeleton: `Color = Struct.new(:r, :g, :b)
c = Color.new(255, 128, 0)
puts c.___.inspect  # [:r, :g, :b]
puts c.___.inspect  # [255, 128, 0]
puts c.___.inspect  # {r: 255, g: 128, b: 0}`,
      solution: `Color = Struct.new(:r, :g, :b)
c = Color.new(255, 128, 0)
puts c.members.inspect  # [:r, :g, :b]
puts c.to_a.inspect  # [255, 128, 0]
puts c.to_h.inspect  # {r: 255, g: 128, b: 0}`,
      hints: ['members returns the list of field names', 'to_a returns values as array', 'to_h returns as hash'],
      concepts: ['members', 'to_a', 'to_h'],
    },
    {
      id: 'rb-struct-4',
      title: 'Struct Mutation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Modify a Struct member.',
      skeleton: `Point = Struct.new(:x, :y)
p = Point.new(1, 2)
p.___ = 10
puts p.x  # 10`,
      solution: `Point = Struct.new(:x, :y)
p = Point.new(1, 2)
p.x = 10
puts p.x  # 10`,
      hints: ['Structs have writer methods by default', 'p.x = value sets the member', 'Unlike Data, Structs are mutable'],
      concepts: ['mutable_struct'],
    },
    {
      id: 'rb-struct-5',
      title: 'Struct Custom Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Add a custom method to a Struct.',
      skeleton: `Rectangle = Struct.new(:width, :height) ___
  def area
    width * height
  end
end

r = Rectangle.new(5, 3)
puts r.area`,
      solution: `Rectangle = Struct.new(:width, :height) do
  def area
    width * height
  end
end

r = Rectangle.new(5, 3)
puts r.area`,
      hints: ['Pass a block to Struct.new to add methods', 'Methods can access members directly', 'do...end block after the Struct.new call'],
      concepts: ['struct_methods'],
    },
    {
      id: 'rb-struct-6',
      title: 'Struct Bracket Access',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use bracket access on a Struct.',
      skeleton: `Item = Struct.new(:name, :price)
item = Item.new("Widget", 9.99)
puts item___:name]     # "Widget"
puts item[___]         # 9.99`,
      solution: `Item = Struct.new(:name, :price)
item = Item.new("Widget", 9.99)
puts item[:name]     # "Widget"
puts item[1]         # 9.99`,
      hints: ['Structs support [] with symbol or integer index', 'item[:name] accesses by member name', 'item[1] accesses by position'],
      concepts: ['bracket_access'],
    },
    {
      id: 'rb-struct-7',
      title: 'Write Struct with Validation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Struct with validation in initialize.',
      skeleton: `# Write an Age Struct with :value
# Override initialize to validate value is 0..150
# Raise ArgumentError for invalid values
# Add a category method: child (0-12), teen (13-17), adult (18+)
`,
      solution: `Age = Struct.new(:value) do
  def initialize(value)
    raise ArgumentError, "Age must be 0-150" unless (0..150).include?(value)
    super
  end

  def category
    case value
    when 0..12 then "child"
    when 13..17 then "teen"
    else "adult"
    end
  end
end

puts Age.new(25).category
puts Age.new(10).category

begin
  Age.new(-5)
rescue ArgumentError => e
  puts e.message
end`,
      hints: ['Override initialize and call super', 'Validate before calling super', 'case/when with ranges for categories'],
      concepts: ['struct_validation', 'initialize'],
    },
    {
      id: 'rb-struct-8',
      title: 'Write Struct Collection',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Struct and use it in a collection.',
      skeleton: `# Write a Student Struct with :name, :grade, :gpa
# Create an array of 5 students
# Use Enumerable methods to:
# - Find the student with highest GPA
# - Get all students in grade 12
# - Calculate average GPA
`,
      solution: `Student = Struct.new(:name, :grade, :gpa)

students = [
  Student.new("Alice", 12, 3.8),
  Student.new("Bob", 11, 3.5),
  Student.new("Carol", 12, 3.9),
  Student.new("Dave", 10, 3.2),
  Student.new("Eve", 11, 3.7),
]

top = students.max_by(&:gpa)
puts "Top student: \\\#{top.name} (\\\#{top.gpa})"

seniors = students.select { |s| s.grade == 12 }
puts "Seniors: \\\#{seniors.map(&:name).join(', ')}"

avg = students.sum(&:gpa) / students.size
puts "Average GPA: \\\#{avg.round(2)}"`,
      hints: ['Struct instances work well with Enumerable methods', 'max_by, select, sum work on arrays of Structs', 'Access members with dot notation'],
      concepts: ['struct_collections'],
    },
    {
      id: 'rb-struct-9',
      title: 'Write Nested Structs',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write nested Structs for an order system.',
      skeleton: `# Write:
# - LineItem Struct: :product, :quantity, :unit_price with a total method
# - Order Struct: :id, :items (array), :customer with:
#   - subtotal (sum of all item totals)
#   - item_count (total quantity)
`,
      solution: `LineItem = Struct.new(:product, :quantity, :unit_price) do
  def total
    quantity * unit_price
  end
end

Order = Struct.new(:id, :items, :customer) do
  def subtotal
    items.sum(&:total)
  end

  def item_count
    items.sum(&:quantity)
  end
end

order = Order.new(
  1,
  [
    LineItem.new("Widget", 3, 9.99),
    LineItem.new("Gadget", 1, 24.99),
  ],
  "Alice"
)

puts "Subtotal: $\\\#{order.subtotal.round(2)}"
puts "Items: \\\#{order.item_count}"`,
      hints: ['Structs can contain other Structs', 'Define LineItem first since Order depends on it', 'Use sum with a block or &:method on the items array'],
      concepts: ['nested_structs', 'composition'],
    },
    {
      id: 'rb-struct-10',
      title: 'Write Struct with Comparable',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Struct that includes Comparable.',
      skeleton: `# Write a Duration Struct with :hours, :minutes
# Include Comparable
# Compare by total minutes
# Add a to_s method ("HH:MM")
# Add a + method for adding durations
`,
      solution: `Duration = Struct.new(:hours, :minutes) do
  include Comparable

  def total_minutes
    hours * 60 + minutes
  end

  def <=>(other)
    total_minutes <=> other.total_minutes
  end

  def +(other)
    total = total_minutes + other.total_minutes
    Duration.new(total / 60, total % 60)
  end

  def to_s
    format("%02d:%02d", hours, minutes)
  end
end

a = Duration.new(1, 30)
b = Duration.new(2, 15)
puts a < b
puts (a + b).to_s
puts [b, a, Duration.new(0, 45)].sort.map(&:to_s).inspect`,
      hints: ['Total minutes makes comparison simple', 'For addition, convert to total minutes then back', 'format or sprintf for zero-padded output'],
      concepts: ['struct_comparable'],
    },
    {
      id: 'rb-struct-11',
      title: 'Write Struct as Record',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write an immutable Struct by freezing after creation.',
      skeleton: `# Write an ImmutablePoint Struct with :x, :y
# Override initialize to freeze after creation
# Add distance_to and midpoint methods
# midpoint returns a new ImmutablePoint
`,
      solution: `ImmutablePoint = Struct.new(:x, :y) do
  def initialize(*)
    super
    freeze
  end

  def distance_to(other)
    Math.sqrt((x - other.x)**2 + (y - other.y)**2)
  end

  def midpoint(other)
    ImmutablePoint.new((x + other.x) / 2.0, (y + other.y) / 2.0)
  end
end

a = ImmutablePoint.new(0, 0)
b = ImmutablePoint.new(4, 3)
puts a.distance_to(b)
puts a.midpoint(b).inspect
puts a.frozen?`,
      hints: ['Call freeze in initialize after super', 'def initialize(*) captures all args', 'New instances from methods are also frozen'],
      concepts: ['frozen_struct', 'immutable_pattern'],
    },
    {
      id: 'rb-struct-12',
      title: 'Write Struct Inheritance',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Demonstrate Struct inheritance.',
      skeleton: `# Write:
# - Shape Struct with :color
# - Circle class inheriting from Shape, adding :radius and area method
# - Square class inheriting from Shape, adding :side and area method
# Demonstrate polymorphic area calls
`,
      solution: `Shape = Struct.new(:color)

class Circle < Shape
  attr_reader :radius

  def initialize(color, radius)
    super(color)
    @radius = radius
  end

  def area
    Math::PI * radius**2
  end
end

class Square < Shape
  attr_reader :side

  def initialize(color, side)
    super(color)
    @side = side
  end

  def area
    side**2
  end
end

shapes = [Circle.new("red", 5), Square.new("blue", 4)]
shapes.each { |s| puts "\\\#{s.color} \\\#{s.class}: area = \\\#{s.area.round(2)}" }`,
      hints: ['Classes can inherit from Structs', 'Call super with the Struct members', 'Add additional attributes with attr_reader'],
      concepts: ['struct_inheritance'],
    },
    {
      id: 'rb-struct-13',
      title: 'Fix Struct Positional vs Keyword',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the wrong initialization style.',
      skeleton: `Config = Struct.new(:host, :port, keyword_init: true)

# Bug: using positional args with keyword_init
c = Config.new("localhost", 3000)
puts c.host`,
      solution: `Config = Struct.new(:host, :port, keyword_init: true)

c = Config.new(host: "localhost", port: 3000)
puts c.host`,
      hints: ['keyword_init: true requires keyword arguments', 'Use Config.new(host: ..., port: ...)', 'Positional args do not work with keyword_init'],
      concepts: ['keyword_init_usage'],
    },
    {
      id: 'rb-struct-14',
      title: 'Fix Struct Equality Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the equality check that fails unexpectedly.',
      skeleton: `Point = Struct.new(:x, :y)
a = Point.new(1.0, 2.0)
b = Point.new(1, 2)

# Bug: these should be considered equal for our purposes
puts a == b  # false because 1.0 != 1 in strict Struct equality`,
      solution: `Point = Struct.new(:x, :y) do
  def ==(other)
    return false unless other.is_a?(Point)
    x.to_f == other.x.to_f && y.to_f == other.y.to_f
  end
end

a = Point.new(1.0, 2.0)
b = Point.new(1, 2)
puts a == b  # true`,
      hints: ['Struct == compares values strictly', 'Override == for custom comparison', 'Convert to float for numeric comparison'],
      concepts: ['struct_equality', 'override_equality'],
    },
    {
      id: 'rb-struct-15',
      title: 'Fix Struct Default Values',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the Struct to have default values.',
      skeleton: `Options = Struct.new(:verbose, :color, :timeout)

# Bug: all values are nil without defaults
o = Options.new
puts o.verbose  # nil, should be false
puts o.color    # nil, should be true
puts o.timeout  # nil, should be 30`,
      solution: `Options = Struct.new(:verbose, :color, :timeout) do
  def initialize(verbose: false, color: true, timeout: 30)
    super(verbose, color, timeout)
  end
end

o = Options.new
puts o.verbose  # false
puts o.color    # true
puts o.timeout  # 30`,
      hints: ['Override initialize with keyword arguments and defaults', 'Call super with positional args matching Struct order', 'Structs do not support defaults natively'],
      concepts: ['struct_defaults'],
    },
    {
      id: 'rb-struct-16',
      title: 'Predict Struct Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict basic Struct behavior.',
      skeleton: `Pair = Struct.new(:first, :second)
a = Pair.new("x", "y")
b = Pair.new("x", "y")
c = a

a.first = "z"
puts a == b
puts a.equal?(c)
puts c.first`,
      solution: `false
true
z`,
      hints: ['a was mutated: first is now "z"', 'a != b because values differ', 'c points to the same object as a, so c.first is also "z"'],
      concepts: ['struct_mutation', 'reference'],
    },
    {
      id: 'rb-struct-17',
      title: 'Predict Struct to_a',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict to_a and array-like behavior.',
      skeleton: `RGB = Struct.new(:r, :g, :b)
c = RGB.new(255, 128, 0)
puts c.to_a.inspect
puts c.values_at(0, 2).inspect
puts c.size`,
      solution: `[255, 128, 0]
[255, 0]
3`,
      hints: ['to_a returns member values as array', 'values_at selects by index', 'size returns number of members'],
      concepts: ['struct_array_methods'],
    },
    {
      id: 'rb-struct-18',
      title: 'Predict Struct Dig',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict Struct dig behavior.',
      skeleton: `Address = Struct.new(:city, :zip)
Person = Struct.new(:name, :address)

p = Person.new("Alice", Address.new("Springfield", "62701"))
puts p.dig(:name)
puts p.dig(:address, :city)
puts p.dig(:address, :state).inspect`,
      solution: `Alice
Springfield
nil`,
      hints: ['dig navigates through nested Structs', 'Missing keys return nil', 'dig is safe for nested access'],
      concepts: ['struct_dig'],
    },
    {
      id: 'rb-struct-19',
      title: 'Refactor Class to Struct',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor a verbose class to a Struct.',
      skeleton: `class Book
  attr_accessor :title, :author, :year

  def initialize(title, author, year)
    @title = title
    @author = author
    @year = year
  end

  def ==(other)
    other.is_a?(Book) && title == other.title &&
      author == other.author && year == other.year
  end

  def to_s
    "\\\#{title} by \\\#{author} (\\\#{year})"
  end
end`,
      solution: `Book = Struct.new(:title, :author, :year) do
  def to_s
    "\\\#{title} by \\\#{author} (\\\#{year})"
  end
end

b = Book.new("Ruby", "Matz", 1995)
puts b.to_s
puts b == Book.new("Ruby", "Matz", 1995)`,
      hints: ['Struct provides attr_accessor, initialize, and == automatically', 'Only custom methods need to be defined in the block', 'Significant boilerplate reduction'],
      concepts: ['class_to_struct'],
    },
    {
      id: 'rb-struct-20',
      title: 'Refactor Struct to Data',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor a Struct to a Data class when immutability is desired.',
      skeleton: `Config = Struct.new(:host, :port, :ssl, keyword_init: true) do
  def initialize(**)
    super
    freeze  # manually freezing
  end

  def url
    scheme = ssl ? "https" : "http"
    "\\\#{scheme}://\\\#{host}:\\\#{port}"
  end
end

c = Config.new(host: "localhost", port: 443, ssl: true)
puts c.url`,
      solution: `Config = Data.define(:host, :port, :ssl) do
  def url
    scheme = ssl ? "https" : "http"
    "\\\#{scheme}://\\\#{host}:\\\#{port}"
  end
end

c = Config.new(host: "localhost", port: 443, ssl: true)
puts c.url
puts c.frozen?`,
      hints: ['Data.define is immutable by default', 'No need to manually freeze', 'Data already uses keyword_init style'],
      concepts: ['struct_to_data', 'immutability'],
    },
  ],
};
