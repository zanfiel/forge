import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-data',
  title: '34. Data Class',
  explanation: `## Data Class in Ruby

Ruby 3.2 introduced Data.define for creating immutable value objects. They are simple, frozen, and support pattern matching.

### Defining a Data Class

\`\`\`ruby
Point = Data.define(:x, :y)
p = Point.new(x: 1, y: 2)
puts p.x  # => 1
puts p.y  # => 2
\`\`\`

### Immutability

\`\`\`ruby
p = Point.new(x: 1, y: 2)
p.x = 3  # NoMethodError - Data objects are frozen
p.frozen? # => true
\`\`\`

### Equality

\`\`\`ruby
a = Point.new(x: 1, y: 2)
b = Point.new(x: 1, y: 2)
a == b    # => true (value equality)
a.eql?(b) # => true
\`\`\`

### with() for Copying

\`\`\`ruby
p1 = Point.new(x: 1, y: 2)
p2 = p1.with(x: 10)
puts p2  # => #<data Point x=10, y=2>
\`\`\`

### Pattern Matching

\`\`\`ruby
case Point.new(x: 3, y: 4)
in { x: (0..), y: (0..) }
  puts "First quadrant"
end
\`\`\`

### Custom Initialization

\`\`\`ruby
Celsius = Data.define(:value) do
  def to_fahrenheit
    value * 9.0 / 5 + 32
  end
end
\`\`\``,
  exercises: [
    {
      id: 'rb-data-1',
      title: 'Define a Data Class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Define a Data class for a coordinate.',
      skeleton: `Coordinate = ___.___(:lat, :lon)
c = Coordinate.new(lat: 40.7, lon: -74.0)
puts c.lat`,
      solution: `Coordinate = Data.define(:lat, :lon)
c = Coordinate.new(lat: 40.7, lon: -74.0)
puts c.lat`,
      hints: ['Data.define creates a new Data class', 'Pass member names as symbols', 'Members become reader methods'],
      concepts: ['data_define'],
    },
    {
      id: 'rb-data-2',
      title: 'Data Equality',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Demonstrate value equality of Data objects.',
      skeleton: `Color = Data.define(:r, :g, :b)
a = Color.new(r: 255, g: 0, b: 0)
b = Color.new(r: 255, g: 0, b: 0)
puts a ___ b  # true`,
      solution: `Color = Data.define(:r, :g, :b)
a = Color.new(r: 255, g: 0, b: 0)
b = Color.new(r: 255, g: 0, b: 0)
puts a == b  # true`,
      hints: ['Data objects use value equality', '== compares the member values', 'Two Data objects with same values are equal'],
      concepts: ['value_equality'],
    },
    {
      id: 'rb-data-3',
      title: 'with() Copy',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use with() to create a modified copy.',
      skeleton: `Point = Data.define(:x, :y)
p1 = Point.new(x: 1, y: 2)
p2 = p1.___(y: 10)
puts p2.x  # 1
puts p2.y  # 10`,
      solution: `Point = Data.define(:x, :y)
p1 = Point.new(x: 1, y: 2)
p2 = p1.with(y: 10)
puts p2.x  # 1
puts p2.y  # 10`,
      hints: ['with() creates a new instance with updated values', 'Unchanged members keep their original values', 'The original object is not modified'],
      concepts: ['with'],
    },
    {
      id: 'rb-data-4',
      title: 'Data Frozen Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Verify that Data objects are frozen.',
      skeleton: `Item = Data.define(:name, :price)
item = Item.new(name: "Widget", price: 9.99)
puts item.___?  # true`,
      solution: `Item = Data.define(:name, :price)
item = Item.new(name: "Widget", price: 9.99)
puts item.frozen?  # true`,
      hints: ['Data objects are always frozen', '.frozen? checks immutability', 'You cannot modify a Data instance after creation'],
      concepts: ['frozen', 'immutability'],
    },
    {
      id: 'rb-data-5',
      title: 'Data with Pattern Match',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use pattern matching with a Data class.',
      skeleton: `Point = Data.define(:x, :y)
p = Point.new(x: 3, y: -2)

case p
___ { x: (0..), y: (0..) }
  puts "Q1"
___ { x: (0..), y: (..0) }
  puts "Q4"
end`,
      solution: `Point = Data.define(:x, :y)
p = Point.new(x: 3, y: -2)

case p
in { x: (0..), y: (0..) }
  puts "Q1"
in { x: (0..), y: (..0) }
  puts "Q4"
end`,
      hints: ['Data classes support deconstruct_keys automatically', 'Use in for pattern matching', 'Range patterns check inclusion'],
      concepts: ['pattern_matching_data'],
    },
    {
      id: 'rb-data-6',
      title: 'Data to_h',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Convert a Data object to a hash.',
      skeleton: `Person = Data.define(:name, :age)
person = Person.new(name: "Alice", age: 30)
h = person.___
puts h.inspect  # { name: "Alice", age: 30 }`,
      solution: `Person = Data.define(:name, :age)
person = Person.new(name: "Alice", age: 30)
h = person.to_h
puts h.inspect  # { name: "Alice", age: 30 }`,
      hints: ['to_h converts the Data object to a hash', 'Keys are the member names as symbols', 'Values are the member values'],
      concepts: ['to_h'],
    },
    {
      id: 'rb-data-7',
      title: 'Write Data Class with Methods',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Money Data class with custom methods.',
      skeleton: `# Write a Money Data class with :amount and :currency
# Add methods:
# - to_s returns "$10.00" or "EUR10.00" format
# - +(other) adds amounts (same currency only, raise otherwise)
# - >(other) compares amounts
`,
      solution: `Money = Data.define(:amount, :currency) do
  def to_s
    "\\\#{currency}\\\#{format('%.2f', amount)}"
  end

  def +(other)
    raise "Currency mismatch" unless currency == other.currency
    Money.new(amount: amount + other.amount, currency: currency)
  end

  def >(other)
    raise "Currency mismatch" unless currency == other.currency
    amount > other.amount
  end
end

a = Money.new(amount: 10.50, currency: "USD")
b = Money.new(amount: 5.25, currency: "USD")
puts a.to_s
puts (a + b).to_s
puts a > b`,
      hints: ['Pass a block to Data.define to add methods', 'Use amount and currency to access members', 'with() is already available for copying'],
      concepts: ['data_methods', 'value_object'],
    },
    {
      id: 'rb-data-8',
      title: 'Write Temperature Data',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write Temperature Data classes with conversion.',
      skeleton: `# Write Celsius and Fahrenheit Data classes (both with :degrees)
# Celsius has to_fahrenheit -> returns Fahrenheit object
# Fahrenheit has to_celsius -> returns Celsius object
# F = C * 9/5 + 32
# C = (F - 32) * 5/9
`,
      solution: `Celsius = Data.define(:degrees) do
  def to_fahrenheit
    Fahrenheit.new(degrees: degrees * 9.0 / 5 + 32)
  end

  def to_s
    "\\\#{degrees}C"
  end
end

Fahrenheit = Data.define(:degrees) do
  def to_celsius
    Celsius.new(degrees: (degrees - 32) * 5.0 / 9)
  end

  def to_s
    "\\\#{degrees}F"
  end
end

c = Celsius.new(degrees: 100)
puts c.to_fahrenheit
f = Fahrenheit.new(degrees: 32)
puts f.to_celsius`,
      hints: ['Each Data class has a :degrees member', 'Conversion methods return new instances of the other type', 'Data.define accepts a block for custom methods'],
      concepts: ['data_conversion', 'value_objects'],
    },
    {
      id: 'rb-data-9',
      title: 'Write Immutable Collection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write an ImmutableList Data class.',
      skeleton: `# Write an ImmutableList Data class with :items
# Methods:
# - push(item) returns new ImmutableList with item added
# - pop returns [last_item, new_list_without_last]
# - size returns count
# - each yields items
# - to_a returns array copy
`,
      solution: `ImmutableList = Data.define(:items) do
  def self.empty
    new(items: [].freeze)
  end

  def push(item)
    ImmutableList.new(items: [*items, item].freeze)
  end

  def pop
    return [nil, self] if items.empty?
    [items.last, ImmutableList.new(items: items[0...-1].freeze)]
  end

  def size
    items.size
  end

  def each(&block)
    items.each(&block)
  end

  def to_a
    items.dup
  end
end

list = ImmutableList.empty.push(1).push(2).push(3)
puts list.size
item, rest = list.pop
puts item
puts rest.size`,
      hints: ['Store items as a frozen array', 'push creates a new ImmutableList with the extra item', 'pop returns a pair: the removed item and the new list'],
      concepts: ['immutable_collection', 'functional_data'],
    },
    {
      id: 'rb-data-10',
      title: 'Write Data with Validation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Data class that validates on creation.',
      skeleton: `# Write an Email Data class with :address
# Override initialize to validate the email format
# Raise ArgumentError if address doesn't contain @
# Add a domain method that returns the part after @
`,
      solution: `Email = Data.define(:address) do
  def initialize(address:)
    raise ArgumentError, "Invalid email" unless address.include?("@")
    super
  end

  def domain
    address.split("@").last
  end

  def local
    address.split("@").first
  end
end

e = Email.new(address: "user@example.com")
puts e.domain
puts e.local

begin
  Email.new(address: "invalid")
rescue ArgumentError => err
  puts err.message
end`,
      hints: ['Override initialize with keyword args matching members', 'Call super after validation to complete initialization', 'Data classes use keyword arguments'],
      concepts: ['data_validation', 'initialize_override'],
    },
    {
      id: 'rb-data-11',
      title: 'Write Nested Data Classes',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write nested Data classes for an address book.',
      skeleton: `# Write:
# - Address Data class with :street, :city, :zip
# - Contact Data class with :name, :email, :address
# Create a contact and show pattern matching on the nested structure
`,
      solution: `Address = Data.define(:street, :city, :zip)
Contact = Data.define(:name, :email, :address)

addr = Address.new(street: "123 Main St", city: "Springfield", zip: "62701")
contact = Contact.new(name: "Alice", email: "alice@example.com", address: addr)

case contact
in { name: String => name, address: { city: "Springfield" } }
  puts "\\\#{name} lives in Springfield"
end

updated = contact.with(address: addr.with(city: "Shelbyville"))
puts updated.address.city`,
      hints: ['Data classes can be nested by composition', 'Pattern matching works through nested Data objects', 'with() on nested objects requires chaining'],
      concepts: ['nested_data', 'composition'],
    },
    {
      id: 'rb-data-12',
      title: 'Write Data Comparable',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a Data class that includes Comparable.',
      skeleton: `# Write a Version Data class with :major, :minor, :patch
# Include Comparable and implement <=>
# Comparison: major first, then minor, then patch
# Add a to_s method returning "major.minor.patch"
`,
      solution: `Version = Data.define(:major, :minor, :patch) do
  include Comparable

  def <=>(other)
    return nil unless other.is_a?(Version)
    [major, minor, patch] <=> [other.major, other.minor, other.patch]
  end

  def to_s
    "\\\#{major}.\\\#{minor}.\\\#{patch}"
  end
end

v1 = Version.new(major: 1, minor: 2, patch: 3)
v2 = Version.new(major: 1, minor: 3, patch: 0)
v3 = Version.new(major: 2, minor: 0, patch: 0)

puts [v3, v1, v2].sort.map(&:to_s).inspect`,
      hints: ['Include Comparable in the Data.define block', 'Array comparison [a, b, c] <=> [x, y, z] compares element-wise', 'Return nil for non-Version objects'],
      concepts: ['comparable', 'spaceship_operator'],
    },
    {
      id: 'rb-data-13',
      title: 'Fix Data Mutation Attempt',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the code that tries to mutate a Data object.',
      skeleton: `Point = Data.define(:x, :y)
p = Point.new(x: 1, y: 2)

# Bug: trying to mutate
p.x = 10
puts p.x`,
      solution: `Point = Data.define(:x, :y)
p = Point.new(x: 1, y: 2)

p = p.with(x: 10)
puts p.x`,
      hints: ['Data objects are frozen and immutable', 'Use with() to create a new instance with changed values', 'Reassign the variable to the new instance'],
      concepts: ['immutability', 'with'],
    },
    {
      id: 'rb-data-14',
      title: 'Fix Data Positional Args',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the Data class instantiation.',
      skeleton: `Point = Data.define(:x, :y)

# Bug: Data.define uses keyword arguments
p = Point.new(1, 2)
puts p.x`,
      solution: `Point = Data.define(:x, :y)

p = Point.new(x: 1, y: 2)
puts p.x`,
      hints: ['Data.define classes require keyword arguments', 'Use Point.new(x: 1, y: 2) not Point.new(1, 2)', 'This is different from Struct which accepts positional args'],
      concepts: ['keyword_arguments'],
    },
    {
      id: 'rb-data-15',
      title: 'Fix Missing super in Initialize',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the custom initialize that forgets to call super.',
      skeleton: `Positive = Data.define(:value) do
  def initialize(value:)
    raise ArgumentError if value < 0
    # Bug: forgot to call super
  end
end

p = Positive.new(value: 5)
puts p.value  # NoMethodError or nil`,
      solution: `Positive = Data.define(:value) do
  def initialize(value:)
    raise ArgumentError if value < 0
    super
  end
end

p = Positive.new(value: 5)
puts p.value`,
      hints: ['Custom initialize must call super to complete setup', 'super passes the keyword arguments to Data initialize', 'Without super, members are not set'],
      concepts: ['super', 'initialize_override'],
    },
    {
      id: 'rb-data-16',
      title: 'Predict Data Equality',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict equality comparisons for Data objects.',
      skeleton: `Point = Data.define(:x, :y)
a = Point.new(x: 1, y: 2)
b = Point.new(x: 1, y: 2)
c = Point.new(x: 2, y: 1)

puts a == b
puts a == c
puts a.equal?(b)`,
      solution: `true
false
false`,
      hints: ['== checks value equality (same members)', 'a and b have identical values', 'equal? checks object identity (same object in memory)'],
      concepts: ['value_vs_identity_equality'],
    },
    {
      id: 'rb-data-17',
      title: 'Predict with() Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the behavior of with().',
      skeleton: `Point = Data.define(:x, :y)
p1 = Point.new(x: 1, y: 2)
p2 = p1.with(x: 10)
p3 = p1.with(y: 20)

puts p1.x, p1.y
puts p2.x, p2.y
puts p3.x, p3.y`,
      solution: `1
2
10
2
1
20`,
      hints: ['with() creates a NEW object, does not modify original', 'p1 remains unchanged', 'Each with() only changes specified members'],
      concepts: ['with_immutability'],
    },
    {
      id: 'rb-data-18',
      title: 'Predict Data vs Struct',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the behavioral differences between Data and Struct.',
      skeleton: `D = Data.define(:x)
S = Struct.new(:x)

d = D.new(x: 1)
s = S.new(1)

puts d.frozen?
puts s.frozen?

begin
  d.instance_variable_set(:@x, 99)
rescue => e
  puts e.class
end`,
      solution: `true
false
FrozenError`,
      hints: ['Data objects are always frozen', 'Struct objects are mutable by default', 'You cannot set instance variables on frozen objects'],
      concepts: ['data_vs_struct', 'frozen'],
    },
    {
      id: 'rb-data-19',
      title: 'Refactor Hash to Data',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor plain hashes to Data classes.',
      skeleton: `# Using plain hashes - no type safety, mutable
def create_user(name, email, role)
  { name: name, email: email, role: role }
end

def greet(user)
  "Hello, \\\#{user[:name]} (\\\#{user[:role]})"
end

u = create_user("Alice", "alice@ex.com", "admin")
u[:role] = "hacker"  # mutation!
puts greet(u)`,
      solution: `User = Data.define(:name, :email, :role)

def greet(user)
  "Hello, \\\#{user.name} (\\\#{user.role})"
end

u = User.new(name: "Alice", email: "alice@ex.com", role: "admin")
# u.role = "hacker"  # Would raise - immutable!
puts greet(u)`,
      hints: ['Replace the hash factory with Data.define', 'Access members with dot notation instead of []', 'Data objects cannot be mutated after creation'],
      concepts: ['hash_to_data', 'type_safety'],
    },
    {
      id: 'rb-data-20',
      title: 'Refactor Class to Data',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor a verbose class to a Data class.',
      skeleton: `class Rectangle
  attr_reader :width, :height

  def initialize(width, height)
    @width = width.freeze
    @height = height.freeze
    freeze
  end

  def area
    width * height
  end

  def ==(other)
    other.is_a?(Rectangle) && width == other.width && height == other.height
  end

  def to_s
    "Rectangle(\\\#{width}x\\\#{height})"
  end
end`,
      solution: `Rectangle = Data.define(:width, :height) do
  def area
    width * height
  end

  def to_s
    "Rectangle(\\\#{width}x\\\#{height})"
  end
end

r = Rectangle.new(width: 5, height: 3)
puts r.area
puts r.to_s
puts r == Rectangle.new(width: 5, height: 3)`,
      hints: ['Data.define handles attr_reader, freeze, and == automatically', 'Only custom methods need to be defined', 'Data classes dramatically reduce boilerplate'],
      concepts: ['class_to_data', 'boilerplate_reduction'],
    },
  ],
};
