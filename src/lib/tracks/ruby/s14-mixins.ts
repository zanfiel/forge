import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-mixins',
  title: '14. Mixins',
  explanation: `## Mixins in Ruby

Since Ruby only supports single inheritance, **mixins** via modules provide a way to share behavior across unrelated classes.

\`\`\`ruby
module Comparable
  # Ruby's built-in Comparable requires <=> to be defined
end

class Temperature
  include Comparable

  attr_reader :degrees

  def initialize(degrees)
    @degrees = degrees
  end

  def <=>(other)
    @degrees <=> other.degrees
  end
end

temps = [Temperature.new(100), Temperature.new(50), Temperature.new(75)]
temps.sort  # Works because of Comparable mixin
\`\`\`

### include vs extend vs prepend

- **\`include\`** — adds methods as instance methods; inserted after the class in MRO
- **\`extend\`** — adds methods as class methods (singleton methods)
- **\`prepend\`** — adds methods as instance methods; inserted *before* the class in MRO (can override class methods)

### Hook Methods

\`\`\`ruby
module Trackable
  def self.included(base)
    puts "\#{base} included Trackable"
    base.extend(ClassMethods)
  end

  module ClassMethods
    def track
      "tracking"
    end
  end
end
\`\`\`

- **\`self.included(base)\`** — called when the module is included
- **\`self.extended(base)\`** — called when the module is extended
- **\`self.prepended(base)\`** — called when the module is prepended`,
  exercises: [
    {
      id: 'rb-mixins-1',
      title: 'Include a Mixin',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to include Walkable in the Person class.',
      skeleton: `module Walkable
  def walk
    "Walking..."
  end
end

class Person
  ___ Walkable
end`,
      solution: `module Walkable
  def walk
    "Walking..."
  end
end

class Person
  include Walkable
end`,
      hints: [
        '`include` adds module methods as instance methods.',
        'Person.new.walk will return "Walking...".',
        'Place `include` inside the class body.',
      ],
      concepts: ['include', 'mixins', 'instance-methods'],
    },
    {
      id: 'rb-mixins-2',
      title: 'Prepend a Module',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to prepend the Logging module so it wraps the greet method.',
      skeleton: `module Logging
  def greet
    puts "Before greet"
    result = super
    puts "After greet"
    result
  end
end

class Greeter
  ___ Logging

  def greet
    "Hello!"
  end
end`,
      solution: `module Logging
  def greet
    puts "Before greet"
    result = super
    puts "After greet"
    result
  end
end

class Greeter
  prepend Logging

  def greet
    "Hello!"
  end
end`,
      hints: [
        '`prepend` inserts the module before the class in the MRO.',
        'This means the module method is called first.',
        '`super` in the module calls the class method.',
      ],
      concepts: ['prepend', 'method-resolution-order', 'super'],
    },
    {
      id: 'rb-mixins-3',
      title: 'Implement <=> for Comparable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to implement the spaceship operator for Comparable mixin.',
      skeleton: `class Box
  include Comparable

  attr_reader :volume

  def initialize(volume)
    @volume = volume
  end

  def ___(other)
    @volume <=> other.volume
  end
end`,
      solution: `class Box
  include Comparable

  attr_reader :volume

  def initialize(volume)
    @volume = volume
  end

  def <=>(other)
    @volume <=> other.volume
  end
end`,
      hints: [
        'Comparable requires the `<=>` (spaceship) operator.',
        'It returns -1, 0, or 1 for less, equal, greater.',
        'This gives you <, <=, ==, >=, >, and between? for free.',
      ],
      concepts: ['Comparable', 'spaceship-operator', 'mixins'],
    },
    {
      id: 'rb-mixins-4',
      title: 'Use the included Hook',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to define the included hook that extends ClassMethods.',
      skeleton: `module Searchable
  def ___.___(___)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def search(query)
      "Searching for \#{query}"
    end
  end
end`,
      solution: `module Searchable
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def search(query)
      "Searching for \#{query}"
    end
  end
end`,
      hints: [
        'The hook method is `self.included(base)`.',
        '`base` is the class that includes the module.',
        'Use `base.extend` to add class methods.',
      ],
      concepts: ['self.included', 'hook-methods', 'extend'],
    },
    {
      id: 'rb-mixins-5',
      title: 'Extend with Module',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to add Factory methods as class methods on Product.',
      skeleton: `module Factory
  def create(attrs)
    obj = new
    attrs.each { |k, v| obj.instance_variable_set("@\#{k}", v) }
    obj
  end
end

class Product
  ___ Factory
end`,
      solution: `module Factory
  def create(attrs)
    obj = new
    attrs.each { |k, v| obj.instance_variable_set("@\#{k}", v) }
    obj
  end
end

class Product
  extend Factory
end`,
      hints: [
        '`extend` adds module methods as class methods.',
        'After extending, call Product.create(...).',
        'This is different from `include` which adds instance methods.',
      ],
      concepts: ['extend', 'class-methods', 'factory-pattern'],
    },
    {
      id: 'rb-mixins-6',
      title: 'Check if Module is Included',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to check whether Enumerable is included in Array.',
      skeleton: `puts Array.___.include?(___)`,
      solution: `puts Array.ancestors.include?(Enumerable)`,
      hints: [
        'Use `ancestors` to get the MRO chain.',
        'Check if Enumerable is in the ancestors array.',
        '`include?` on an array checks for membership.',
      ],
      concepts: ['ancestors', 'introspection', 'Enumerable'],
    },
    {
      id: 'rb-mixins-7',
      title: 'Write a Printable Mixin',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Write a Printable module with a method print_info that returns all instance variables formatted as "@name=value" joined by ", ". Include it in a User class with name and email.',
      skeleton: `# Write your Printable mixin and User class`,
      solution: `module Printable
  def print_info
    instance_variables.map { |iv|
      "\#{iv}=\#{instance_variable_get(iv)}"
    }.join(", ")
  end
end

class User
  include Printable

  def initialize(name, email)
    @name = name
    @email = email
  end
end`,
      hints: [
        'Use `instance_variables` to get all @vars.',
        'Use `instance_variable_get` to read each value.',
        'Join with ", " to format the output.',
      ],
      concepts: ['mixins', 'introspection', 'instance_variables'],
    },
    {
      id: 'rb-mixins-8',
      title: 'Write an Enumerable Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a NumberList class that includes Enumerable. It should have initialize(numbers) and an each method that yields each number. This gives you map, select, etc. for free.',
      skeleton: `# Write your NumberList class with Enumerable`,
      solution: `class NumberList
  include Enumerable

  def initialize(numbers)
    @numbers = numbers
  end

  def each(&block)
    @numbers.each(&block)
  end
end`,
      hints: [
        'Include Enumerable in the class.',
        'Enumerable requires you to define an `each` method.',
        'Delegate to @numbers.each and pass the block.',
      ],
      concepts: ['Enumerable', 'each', 'block-delegation'],
    },
    {
      id: 'rb-mixins-9',
      title: 'Write a Mixin with Hook',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Timestamps module that uses self.included to extend ClassMethods. ClassMethods should have a create method. The module should have a created_at method returning "2024-01-01".',
      skeleton: `# Write your Timestamps mixin with hook`,
      solution: `module Timestamps
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def create
      obj = new
      obj
    end
  end

  def created_at
    "2024-01-01"
  end
end`,
      hints: [
        'self.included(base) is called when the module is included.',
        'base.extend(ClassMethods) adds the nested module as class methods.',
        'Instance methods in the outer module become instance methods.',
      ],
      concepts: ['self.included', 'hook-methods', 'ClassMethods-pattern'],
    },
    {
      id: 'rb-mixins-10',
      title: 'Write Prepend for Method Wrapping',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Measurable module with a compute method that records start time, calls super, and returns a hash with result and elapsed keys. Prepend it into Calculator class that has a compute method returning 42.',
      skeleton: `# Write your Measurable mixin using prepend`,
      solution: `module Measurable
  def compute
    start = Time.now
    result = super
    elapsed = Time.now - start
    { result: result, elapsed: elapsed }
  end
end

class Calculator
  prepend Measurable

  def compute
    42
  end
end`,
      hints: [
        'Use `prepend` so the module method runs before the class method.',
        '`super` in the prepended module calls the class method.',
        'Return a hash with :result and :elapsed keys.',
      ],
      concepts: ['prepend', 'method-wrapping', 'super'],
    },
    {
      id: 'rb-mixins-11',
      title: 'Write Multiple Mixins',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write modules Runnable (with run returning "running"), Swimmable (with swim returning "swimming"), and Flyable (with fly returning "flying"). Write a Triathlete class that includes all three.',
      skeleton: `# Write your three modules and Triathlete class`,
      solution: `module Runnable
  def run
    "running"
  end
end

module Swimmable
  def swim
    "swimming"
  end
end

module Flyable
  def fly
    "flying"
  end
end

class Triathlete
  include Runnable
  include Swimmable
  include Flyable
end`,
      hints: [
        'Define each module with its specific method.',
        'A class can include multiple modules.',
        'Each include adds the module to the ancestor chain.',
      ],
      concepts: ['multiple-mixins', 'include', 'composition'],
    },
    {
      id: 'rb-mixins-12',
      title: 'Write Comparable Mixin Usage',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Student class with name and gpa that includes Comparable. Implement <=> comparing by gpa. Demonstrate that sort works on an array of students.',
      skeleton: `# Write your Student class with Comparable`,
      solution: `class Student
  include Comparable

  attr_reader :name, :gpa

  def initialize(name, gpa)
    @name = name
    @gpa = gpa
  end

  def <=>(other)
    @gpa <=> other.gpa
  end

  def to_s
    "\#{@name}: \#{@gpa}"
  end
end`,
      hints: [
        'Include Comparable and define <=>.',
        'Compare by gpa using the <=> operator.',
        'This gives you sort, min, max, between? for free.',
      ],
      concepts: ['Comparable', 'spaceship-operator', 'sorting'],
    },
    {
      id: 'rb-mixins-13',
      title: 'Fix Mixin Method Conflict',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so that greet returns "Hello and Welcome!" by using both modules correctly.',
      skeleton: `module Hello
  def greet
    "Hello"
  end
end

module Welcome
  def greet
    "Welcome!"
  end
end

class Host
  include Hello
  include Welcome

  def greet
    # Should combine both greetings
    "Hello and Welcome!"
  end
end

h = Host.new
puts h.greet`,
      solution: `module Hello
  def hello
    "Hello"
  end
end

module Welcome
  def welcome
    "Welcome!"
  end
end

class Host
  include Hello
  include Welcome

  def greet
    "\#{hello} and \#{welcome}"
  end
end

h = Host.new
puts h.greet`,
      hints: [
        'When two modules define the same method, the last included wins.',
        'Rename the module methods to avoid collision.',
        'Combine them in the class greet method.',
      ],
      concepts: ['method-conflict', 'mixins', 'composition'],
    },
    {
      id: 'rb-mixins-14',
      title: 'Fix include vs extend Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the code so that User.find(1) works as a class method.',
      skeleton: `module Findable
  def find(id)
    "Found record \#{id}"
  end
end

class User
  include Findable
end

puts User.find(1)`,
      solution: `module Findable
  def find(id)
    "Found record \#{id}"
  end
end

class User
  extend Findable
end

puts User.find(1)`,
      hints: [
        '`include` adds instance methods, not class methods.',
        'Use `extend` to add methods as class methods.',
        'User.find is a class-level call.',
      ],
      concepts: ['include-vs-extend', 'class-methods', 'common-bugs'],
    },
    {
      id: 'rb-mixins-15',
      title: 'Fix Prepend Order Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so the Validator module actually validates before save runs.',
      skeleton: `module Validator
  def save
    raise "Invalid!" unless valid?
    super
  end

  def valid?
    true
  end
end

class Record
  include Validator

  def save
    "Saved!"
  end
end

puts Record.new.save`,
      solution: `module Validator
  def save
    raise "Invalid!" unless valid?
    super
  end

  def valid?
    true
  end
end

class Record
  prepend Validator

  def save
    "Saved!"
  end
end

puts Record.new.save`,
      hints: [
        'With `include`, the class method is found first in MRO.',
        '`prepend` puts the module before the class in MRO.',
        'This ensures Validator#save runs before Record#save.',
      ],
      concepts: ['prepend', 'method-resolution-order', 'validation'],
    },
    {
      id: 'rb-mixins-16',
      title: 'Predict Mixin MRO Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `module A
  def who
    "A"
  end
end

module B
  def who
    "B"
  end
end

class C
  include A
  include B
end

puts C.new.who`,
      solution: `B`,
      hints: [
        'When including multiple modules, the last one included takes priority.',
        'B is included after A, so B is checked first in MRO.',
        'C.ancestors would show [C, B, A, Object, ...].',
      ],
      concepts: ['method-resolution-order', 'include-order', 'mixins'],
    },
    {
      id: 'rb-mixins-17',
      title: 'Predict Prepend vs Include',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `module M
  def hello
    "M:" + super
  end
end

class Base
  def hello
    "Base"
  end
end

class Child < Base
  prepend M

  def hello
    "Child:" + super
  end
end

puts Child.new.hello`,
      solution: `M:Child:Base`,
      hints: [
        'prepend puts M before Child in the MRO.',
        'M#hello calls super -> Child#hello.',
        'Child#hello calls super -> Base#hello.',
      ],
      concepts: ['prepend', 'super-chain', 'method-resolution-order'],
    },
    {
      id: 'rb-mixins-18',
      title: 'Predict Ancestors Chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print? (Just the first 4 elements)',
      skeleton: `module X; end
module Y; end

class Parent
  include X
end

class Child < Parent
  include Y
end

puts Child.ancestors[0..3].inspect`,
      solution: `[Child, Y, Parent, X]`,
      hints: [
        'ancestors returns [class, included_modules, parent, parent_modules, ...].',
        'Child includes Y, Parent includes X.',
        'The order is Child, Y, Parent, X.',
      ],
      concepts: ['ancestors', 'method-resolution-order', 'include'],
    },
    {
      id: 'rb-mixins-19',
      title: 'Refactor Class Methods to Mixin',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the duplicated class methods into a Findable module using the included hook pattern.',
      skeleton: `class User
  def self.find(id)
    "Found User \#{id}"
  end

  def self.all
    "All Users"
  end
end

class Post
  def self.find(id)
    "Found Post \#{id}"
  end

  def self.all
    "All Posts"
  end
end`,
      solution: `module Findable
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def find(id)
      "Found \#{name} \#{id}"
    end

    def all
      "All \#{name}s"
    end
  end
end

class User
  include Findable
end

class Post
  include Findable
end`,
      hints: [
        'Use the included hook to extend ClassMethods.',
        'Use `name` inside ClassMethods to get the class name dynamically.',
        'Both classes include the same module.',
      ],
      concepts: ['self.included', 'ClassMethods-pattern', 'DRY'],
    },
    {
      id: 'rb-mixins-20',
      title: 'Refactor to Composition with Mixins',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Refactor this deep inheritance into mixins. Extract swimming into Swimmable and flying into Flyable modules.',
      skeleton: `class Animal
  def breathe
    "breathing"
  end
end

class SwimmingAnimal < Animal
  def swim
    "swimming"
  end
end

class FlyingSwimmingAnimal < SwimmingAnimal
  def fly
    "flying"
  end
end

duck = FlyingSwimmingAnimal.new`,
      solution: `module Swimmable
  def swim
    "swimming"
  end
end

module Flyable
  def fly
    "flying"
  end
end

class Animal
  def breathe
    "breathing"
  end
end

class Duck < Animal
  include Swimmable
  include Flyable
end

duck = Duck.new`,
      hints: [
        'Extract behaviors into modules instead of deep hierarchies.',
        'Mixins allow combining behaviors without deep inheritance.',
        'A Duck can include both Swimmable and Flyable.',
      ],
      concepts: ['composition-over-inheritance', 'mixins', 'refactoring'],
    },
  ],
};
