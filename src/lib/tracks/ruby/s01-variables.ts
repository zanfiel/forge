import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-var',
  title: '01. Variables',
  explanation: `## Variables in Ruby

Ruby has several types of variables, each with different scopes and naming conventions:

\`\`\`ruby
# Local variables - start with lowercase or underscore
name = "Alice"
_temp = 42

# Instance variables - start with @
@name = "Alice"

# Class variables - start with @@
@@count = 0

# Global variables - start with $
$debug = true

# Constants - start with uppercase
MAX_SIZE = 100
PI = 3.14159
\`\`\`

### Parallel Assignment

Ruby supports assigning multiple variables at once:

\`\`\`ruby
a, b, c = 1, 2, 3
x, y = y, x  # swap values

# Splat in parallel assignment
first, *rest = [1, 2, 3, 4]
# first => 1, rest => [2, 3, 4]
\`\`\`

### Naming Conventions

- Local variables and methods: \`snake_case\`
- Classes and modules: \`CamelCase\`
- Constants: \`SCREAMING_SNAKE_CASE\`
- Predicate methods end with \`?\`: \`empty?\`, \`nil?\`
- Dangerous methods end with \`!\`: \`sort!\`, \`gsub!\``,
  exercises: [
    {
      id: 'rb-var-1',
      title: 'Assign a Local Variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Assign the string "Ruby" to a local variable called language.',
      skeleton: `___ = "Ruby"
puts language`,
      solution: `language = "Ruby"
puts language`,
      hints: [
        'Local variables in Ruby start with a lowercase letter.',
        'Simply use the variable name on the left side of =.',
        'The variable name is "language".',
      ],
      concepts: ['local-variables', 'assignment'],
    },
    {
      id: 'rb-var-2',
      title: 'Assign an Instance Variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Assign the value 25 to an instance variable called age inside the initialize method.',
      skeleton: `class Person
  def initialize
    ___ = 25
  end
end`,
      solution: `class Person
  def initialize
    @age = 25
  end
end`,
      hints: [
        'Instance variables start with a special prefix character.',
        'The prefix for instance variables is @.',
        'Write @age = 25.',
      ],
      concepts: ['instance-variables', 'classes'],
    },
    {
      id: 'rb-var-3',
      title: 'Declare a Constant',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Declare a constant MAX_RETRIES with the value 3.',
      skeleton: `___ = 3
puts MAX_RETRIES`,
      solution: `MAX_RETRIES = 3
puts MAX_RETRIES`,
      hints: [
        'Constants in Ruby start with an uppercase letter.',
        'By convention, constants use SCREAMING_SNAKE_CASE.',
        'Write MAX_RETRIES = 3.',
      ],
      concepts: ['constants', 'naming-conventions'],
    },
    {
      id: 'rb-var-4',
      title: 'Parallel Assignment',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use parallel assignment to assign 1 to x, 2 to y, and 3 to z in one line.',
      skeleton: `___ = 1, 2, 3
puts x
puts y
puts z`,
      solution: `x, y, z = 1, 2, 3
puts x
puts y
puts z`,
      hints: [
        'List multiple variable names separated by commas on the left side.',
        'The pattern is: var1, var2, var3 = val1, val2, val3.',
        'Write x, y, z on the left side of =.',
      ],
      concepts: ['parallel-assignment', 'local-variables'],
    },
    {
      id: 'rb-var-5',
      title: 'Global Variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Assign true to a global variable called $verbose.',
      skeleton: `___ = true
puts $verbose`,
      solution: `$verbose = true
puts $verbose`,
      hints: [
        'Global variables start with a special prefix.',
        'The prefix for global variables is $.',
        'Write $verbose = true.',
      ],
      concepts: ['global-variables', 'assignment'],
    },
    {
      id: 'rb-var-6',
      title: 'Class Variable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Declare a class variable @@count initialized to 0 inside the class body.',
      skeleton: `class Counter
  ___ = 0

  def self.count
    @@count
  end
end`,
      solution: `class Counter
  @@count = 0

  def self.count
    @@count
  end
end`,
      hints: [
        'Class variables start with a double prefix.',
        'The prefix for class variables is @@.',
        'Write @@count = 0.',
      ],
      concepts: ['class-variables', 'classes'],
    },
    {
      id: 'rb-var-7',
      title: 'Swap Two Variables',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Write code that swaps the values of variables a and b using parallel assignment. After the swap, a should be 20 and b should be 10.',
      skeleton: `a = 10
b = 20
# Swap a and b here

puts a  # => 20
puts b  # => 10`,
      solution: `a = 10
b = 20
a, b = b, a

puts a  # => 20
puts b  # => 10`,
      hints: [
        'Ruby supports swapping via parallel assignment.',
        'Put the variables in reverse order on the right side.',
        'a, b = b, a performs the swap in one line.',
      ],
      concepts: ['parallel-assignment', 'swap'],
    },
    {
      id: 'rb-var-8',
      title: 'Splat in Parallel Assignment',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use the splat operator in parallel assignment to capture the first element in "head" and the remaining elements in "tail" from the array [10, 20, 30, 40].',
      skeleton: `# Assign from the array [10, 20, 30, 40]
# head should be 10, tail should be [20, 30, 40]

puts head      # => 10
puts tail.inspect  # => [20, 30, 40]`,
      solution: `head, *tail = [10, 20, 30, 40]

puts head      # => 10
puts tail.inspect  # => [20, 30, 40]`,
      hints: [
        'The splat operator (*) collects remaining values into an array.',
        'Place * before the variable that should capture the rest.',
        'head, *tail = [10, 20, 30, 40] does the job.',
      ],
      concepts: ['splat-operator', 'parallel-assignment'],
    },
    {
      id: 'rb-var-9',
      title: 'Variable Scope Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a class Dog with an initialize method that takes a name parameter and stores it in an instance variable @name. Add a method called speak that returns "Woof! I am <name>" using the instance variable.',
      skeleton: `class Dog
  # Write initialize and speak methods
end

dog = Dog.new("Rex")
puts dog.speak  # => "Woof! I am Rex"`,
      solution: `class Dog
  def initialize(name)
    @name = name
  end

  def speak
    "Woof! I am \#{@name}"
  end
end

dog = Dog.new("Rex")
puts dog.speak  # => "Woof! I am Rex"`,
      hints: [
        'Use @name to store the name as an instance variable.',
        'Instance variables are accessible across methods in the same object.',
        'Use string interpolation with #{@name} to build the return string.',
      ],
      concepts: ['instance-variables', 'classes', 'methods'],
    },
    {
      id: 'rb-var-10',
      title: 'Attr Accessor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a class Book that uses attr_accessor to create getter and setter for :title and :author. Add an initialize method that accepts both.',
      skeleton: `class Book
  # Use attr_accessor and write initialize
end

book = Book.new("Dune", "Frank Herbert")
puts book.title   # => "Dune"
puts book.author  # => "Frank Herbert"
book.title = "1984"
puts book.title   # => "1984"`,
      solution: `class Book
  attr_accessor :title, :author

  def initialize(title, author)
    @title = title
    @author = author
  end
end

book = Book.new("Dune", "Frank Herbert")
puts book.title   # => "Dune"
puts book.author  # => "Frank Herbert"
book.title = "1984"
puts book.title   # => "1984"`,
      hints: [
        'attr_accessor creates both getter and setter methods.',
        'Place attr_accessor at the top of the class body.',
        'In initialize, assign parameters to @title and @author.',
      ],
      concepts: ['attr-accessor', 'instance-variables', 'classes'],
    },
    {
      id: 'rb-var-11',
      title: 'Class Variable Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a class Tracker with a class variable @@instances that counts how many objects have been created. Add a class method self.count that returns the count.',
      skeleton: `class Tracker
  # Write class with @@instances counter
end

a = Tracker.new
b = Tracker.new
c = Tracker.new
puts Tracker.count  # => 3`,
      solution: `class Tracker
  @@instances = 0

  def initialize
    @@instances += 1
  end

  def self.count
    @@instances
  end
end

a = Tracker.new
b = Tracker.new
c = Tracker.new
puts Tracker.count  # => 3`,
      hints: [
        'Initialize @@instances to 0 at the class level.',
        'Increment @@instances in the initialize method.',
        'Use def self.count to define a class method.',
      ],
      concepts: ['class-variables', 'class-methods', 'initialize'],
    },
    {
      id: 'rb-var-12',
      title: 'Multiple Return Values',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called min_max that takes an array and returns both the minimum and maximum values. Use parallel assignment to capture both.',
      skeleton: `def min_max(arr)
  # Return both min and max
end

low, high = min_max([3, 7, 1, 9, 4])
puts low   # => 1
puts high  # => 9`,
      solution: `def min_max(arr)
  [arr.min, arr.max]
end

low, high = min_max([3, 7, 1, 9, 4])
puts low   # => 1
puts high  # => 9`,
      hints: [
        'Return an array with two elements to enable parallel assignment.',
        'Use arr.min and arr.max to find the values.',
        'Return [arr.min, arr.max].',
      ],
      concepts: ['parallel-assignment', 'methods', 'return-values'],
    },
    {
      id: 'rb-var-13',
      title: 'Fix the Variable Scope Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the bug: the method tries to access a local variable defined outside its scope.',
      skeleton: `greeting = "Hello"

def say_hi(name)
  puts greeting + ", " + name
end

say_hi("Alice")`,
      solution: `def say_hi(name, greeting)
  puts greeting + ", " + name
end

say_hi("Alice", "Hello")`,
      hints: [
        'Local variables are not accessible inside method definitions.',
        'Methods create their own scope in Ruby.',
        'Pass greeting as a parameter to the method instead.',
      ],
      concepts: ['variable-scope', 'local-variables', 'methods'],
    },
    {
      id: 'rb-var-14',
      title: 'Fix the Constant Reassignment',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the code so it does not reassign a constant. Use a regular variable instead.',
      skeleton: `PI = 3.14
PI = 3.14159  # warning: already initialized constant PI
puts PI`,
      solution: `pi_value = 3.14
pi_value = 3.14159
puts pi_value`,
      hints: [
        'Constants should not be reassigned in Ruby.',
        'If a value needs to change, use a local variable instead.',
        'Rename PI to a lowercase variable name like pi_value.',
      ],
      concepts: ['constants', 'naming-conventions'],
    },
    {
      id: 'rb-var-15',
      title: 'Fix the Instance Variable Typo',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the bug where the getter method returns nil because of an instance variable name mismatch.',
      skeleton: `class Car
  def initialize(make)
    @make = make
  end

  def make
    @mke
  end
end

car = Car.new("Toyota")
puts car.make  # => nil (should be "Toyota")`,
      solution: `class Car
  def initialize(make)
    @make = make
  end

  def make
    @make
  end
end

car = Car.new("Toyota")
puts car.make  # => "Toyota"`,
      hints: [
        'Compare the instance variable names carefully.',
        'In initialize it is @make, but in the getter it is @mke.',
        'Fix the typo in the getter: change @mke to @make.',
      ],
      concepts: ['instance-variables', 'typo-bugs', 'getter-methods'],
    },
    {
      id: 'rb-var-16',
      title: 'Predict: Parallel Assignment',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict the output of this parallel assignment code.',
      skeleton: `a, b, c = 1, 2
puts a
puts b
puts c.inspect`,
      solution: `1
2
nil`,
      hints: [
        'When there are fewer values than variables, extras get nil.',
        'a gets 1, b gets 2, c gets... nothing.',
        'Unassigned variables in parallel assignment become nil.',
      ],
      concepts: ['parallel-assignment', 'nil'],
    },
    {
      id: 'rb-var-17',
      title: 'Predict: Splat Assignment',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of this splat assignment code.',
      skeleton: `a, *b, c = [1, 2, 3, 4, 5]
puts a
puts b.inspect
puts c`,
      solution: `1
[2, 3, 4]
5`,
      hints: [
        'The splat operator grabs the middle elements.',
        'a gets the first element, c gets the last.',
        '*b captures everything between a and c.',
      ],
      concepts: ['splat-operator', 'parallel-assignment'],
    },
    {
      id: 'rb-var-18',
      title: 'Predict: Variable Shadowing',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output. Does the block modify the outer variable?',
      skeleton: `x = 10
[1, 2, 3].each do |x|
  # x is a block parameter, shadows outer x
end
puts x`,
      solution: `10`,
      hints: [
        'Block parameters shadow outer local variables of the same name.',
        'The outer x is not modified by the block parameter x.',
        'After the block, x is still 10.',
      ],
      concepts: ['variable-shadowing', 'block-scope'],
    },
    {
      id: 'rb-var-19',
      title: 'Refactor: Replace Magic Numbers with Constants',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Refactor the code to replace magic numbers with named constants.',
      skeleton: `def calculate_shipping(weight)
  if weight > 50
    weight * 2.5
  else
    weight * 1.5
  end
end`,
      solution: `MAX_STANDARD_WEIGHT = 50
HEAVY_RATE = 2.5
STANDARD_RATE = 1.5

def calculate_shipping(weight)
  if weight > MAX_STANDARD_WEIGHT
    weight * HEAVY_RATE
  else
    weight * STANDARD_RATE
  end
end`,
      hints: [
        'Extract 50, 2.5, and 1.5 into named constants.',
        'Use SCREAMING_SNAKE_CASE for constant names.',
        'Define constants before the method definition.',
      ],
      concepts: ['constants', 'refactoring', 'magic-numbers'],
    },
    {
      id: 'rb-var-20',
      title: 'Refactor: Use attr_reader Instead of Manual Getter',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the class to use attr_reader instead of manually written getter methods.',
      skeleton: `class User
  def initialize(name, email)
    @name = name
    @email = email
  end

  def name
    @name
  end

  def email
    @email
  end
end`,
      solution: `class User
  attr_reader :name, :email

  def initialize(name, email)
    @name = name
    @email = email
  end
end`,
      hints: [
        'attr_reader automatically creates getter methods.',
        'It takes symbols corresponding to instance variable names.',
        'Replace both getter methods with a single attr_reader line.',
      ],
      concepts: ['attr-reader', 'refactoring', 'dry'],
    },
  ],
};
