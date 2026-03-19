import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-class',
  title: '11. Classes',
  explanation: `## Classes in Ruby

Ruby is a purely object-oriented language - everything is an object. Classes are blueprints for creating objects.

\`\`\`ruby
class Dog
  attr_accessor :name, :breed

  def initialize(name, breed)
    @name = name
    @breed = breed
  end

  def bark
    "Woof! I'm \#{@name}!"
  end

  def self.species
    "Canis familiaris"
  end
end

rex = Dog.new("Rex", "Shepherd")
puts rex.bark        # => "Woof! I'm Rex!"
puts Dog.species     # => "Canis familiaris"
\`\`\`

### Key Concepts

- **\`initialize\`** is the constructor, called by \`ClassName.new\`
- **Instance variables** start with \`@\` and belong to a specific object
- **\`attr_accessor\`** creates getter and setter methods
- **\`attr_reader\`** creates only a getter
- **\`attr_writer\`** creates only a setter
- **\`self\`** inside an instance method refers to the current object
- **\`self.method_name\`** defines a class method
- **Class variables** start with \`@@\` and are shared across all instances`,
  exercises: [
    {
      id: 'rb-class-1',
      title: 'Define a Simple Class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to define a class named Cat.',
      skeleton: `___ Cat
end`,
      solution: `class Cat
end`,
      hints: [
        'Ruby uses the `class` keyword to define a class.',
        'Class names are CamelCase by convention.',
        'The definition ends with `end`.',
      ],
      concepts: ['class-definition', 'syntax'],
    },
    {
      id: 'rb-class-2',
      title: 'The initialize Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to define the constructor that sets @name.',
      skeleton: `class Person
  def ___(___)
    @name = name
  end
end`,
      solution: `class Person
  def initialize(name)
    @name = name
  end
end`,
      hints: [
        'The constructor method in Ruby is called `initialize`.',
        'It receives parameters just like any other method.',
        'Instance variables start with @.',
      ],
      concepts: ['initialize', 'constructor', 'instance-variables'],
    },
    {
      id: 'rb-class-3',
      title: 'Using attr_accessor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to create getter and setter for :title and :author.',
      skeleton: `class Book
  ___ :title, :author

  def initialize(title, author)
    @title = title
    @author = author
  end
end`,
      solution: `class Book
  attr_accessor :title, :author

  def initialize(title, author)
    @title = title
    @author = author
  end
end`,
      hints: [
        '`attr_accessor` creates both getter and setter methods.',
        'Pass symbols representing the attribute names.',
        'This replaces writing separate getter and setter methods.',
      ],
      concepts: ['attr_accessor', 'getter', 'setter'],
    },
    {
      id: 'rb-class-4',
      title: 'attr_reader vs attr_writer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use attr_reader for :name (read-only) and attr_writer for :password (write-only).',
      skeleton: `class User
  ___ :name
  ___ :password

  def initialize(name, password)
    @name = name
    @password = password
  end
end`,
      solution: `class User
  attr_reader :name
  attr_writer :password

  def initialize(name, password)
    @name = name
    @password = password
  end
end`,
      hints: [
        '`attr_reader` creates only a getter method.',
        '`attr_writer` creates only a setter method.',
        'Read-only means you can get but not set externally.',
      ],
      concepts: ['attr_reader', 'attr_writer', 'encapsulation'],
    },
    {
      id: 'rb-class-5',
      title: 'Define a Class Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to define a class method called create.',
      skeleton: `class Widget
  def ___.create(name)
    new(name)
  end

  def initialize(name)
    @name = name
  end
end`,
      solution: `class Widget
  def self.create(name)
    new(name)
  end

  def initialize(name)
    @name = name
  end
end`,
      hints: [
        'Class methods are defined with `self.method_name`.',
        '`self` at the class level refers to the class itself.',
        'Inside a class method, `new` calls the constructor.',
      ],
      concepts: ['class-methods', 'self', 'factory-method'],
    },
    {
      id: 'rb-class-6',
      title: 'Using self in Instance Methods',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to use self to call the setter method inside the class.',
      skeleton: `class Temperature
  attr_accessor :celsius

  def initialize(celsius)
    @celsius = celsius
  end

  def reset
    ___.celsius = 0
  end
end`,
      solution: `class Temperature
  attr_accessor :celsius

  def initialize(celsius)
    @celsius = celsius
  end

  def reset
    self.celsius = 0
  end
end`,
      hints: [
        'When calling a setter inside the class, you must use `self.`.',
        'Without `self`, Ruby would create a local variable instead.',
        '`self` refers to the current object instance.',
      ],
      concepts: ['self', 'setter-disambiguation', 'instance-methods'],
    },
    {
      id: 'rb-class-7',
      title: 'Write a Complete Class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Write a Rectangle class with width and height attributes, an initialize method, and an area method that returns width * height.',
      skeleton: `# Write your Rectangle class here`,
      solution: `class Rectangle
  attr_reader :width, :height

  def initialize(width, height)
    @width = width
    @height = height
  end

  def area
    @width * @height
  end
end`,
      hints: [
        'Define the class with `class Rectangle`.',
        'Use `initialize` to set @width and @height.',
        'The `area` method multiplies width by height.',
      ],
      concepts: ['class-definition', 'initialize', 'instance-methods'],
    },
    {
      id: 'rb-class-8',
      title: 'Write a BankAccount Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a BankAccount class with a read-only :balance, initialize(balance), deposit(amount), and withdraw(amount) that prevents overdraft by returning "Insufficient funds" string.',
      skeleton: `# Write your BankAccount class here`,
      solution: `class BankAccount
  attr_reader :balance

  def initialize(balance)
    @balance = balance
  end

  def deposit(amount)
    @balance += amount
  end

  def withdraw(amount)
    if amount > @balance
      "Insufficient funds"
    else
      @balance -= amount
    end
  end
end`,
      hints: [
        'Use `attr_reader :balance` so balance is read-only from outside.',
        'deposit adds to @balance, withdraw subtracts.',
        'Check if amount > @balance before withdrawing.',
      ],
      concepts: ['encapsulation', 'attr_reader', 'instance-methods'],
    },
    {
      id: 'rb-class-9',
      title: 'Write a Counter with Class Variable',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Counter class that uses a class variable @@count to track how many instances have been created. Provide a class method self.count that returns the total.',
      skeleton: `# Write your Counter class here`,
      solution: `class Counter
  @@count = 0

  def initialize
    @@count += 1
  end

  def self.count
    @@count
  end
end`,
      hints: [
        'Class variables start with @@ and are shared across all instances.',
        'Increment @@count inside initialize.',
        'Define self.count to return @@count.',
      ],
      concepts: ['class-variables', 'class-methods', 'initialize'],
    },
    {
      id: 'rb-class-10',
      title: 'Write a to_s Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Car class with :make and :year attributes, and a to_s method that returns "YEAR MAKE" (e.g., "2024 Toyota").',
      skeleton: `# Write your Car class here`,
      solution: `class Car
  attr_reader :make, :year

  def initialize(make, year)
    @make = make
    @year = year
  end

  def to_s
    "\#{@year} \#{@make}"
  end
end`,
      hints: [
        'Override `to_s` to customize string representation.',
        'Use string interpolation with #{}.',
        '`to_s` is called automatically by `puts` and string interpolation.',
      ],
      concepts: ['to_s', 'string-interpolation', 'instance-methods'],
    },
    {
      id: 'rb-class-11',
      title: 'Write a Comparable Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Student class with :name and :gpa. Add a class method self.honor_roll(students) that returns students with gpa >= 3.5.',
      skeleton: `# Write your Student class here`,
      solution: `class Student
  attr_reader :name, :gpa

  def initialize(name, gpa)
    @name = name
    @gpa = gpa
  end

  def self.honor_roll(students)
    students.select { |s| s.gpa >= 3.5 }
  end
end`,
      hints: [
        'Use `attr_reader` for :name and :gpa.',
        'The class method receives an array of Student objects.',
        'Use `select` to filter students by gpa.',
      ],
      concepts: ['class-methods', 'filtering', 'attr_reader'],
    },
    {
      id: 'rb-class-12',
      title: 'Write a Private Helper Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Password class with initialize(plain) that stores the hashed version. Add a private method hash_password that reverses and upcases the string. Add a valid?(attempt) method that compares.',
      skeleton: `# Write your Password class here`,
      solution: `class Password
  def initialize(plain)
    @hashed = hash_password(plain)
  end

  def valid?(attempt)
    hash_password(attempt) == @hashed
  end

  private

  def hash_password(text)
    text.reverse.upcase
  end
end`,
      hints: [
        'Use the `private` keyword before defining private methods.',
        'Private methods cannot be called from outside the class.',
        'Both initialize and valid? can call the private method internally.',
      ],
      concepts: ['private-methods', 'encapsulation', 'access-control'],
    },
    {
      id: 'rb-class-13',
      title: 'Fix the Missing Initialization',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the bug so that creating a Greeting and calling greet returns "Hello, Alice!".',
      skeleton: `class Greeting
  def initialize(name)
    name = name
  end

  def greet
    "Hello, \#{@name}!"
  end
end

g = Greeting.new("Alice")
puts g.greet`,
      solution: `class Greeting
  def initialize(name)
    @name = name
  end

  def greet
    "Hello, \#{@name}!"
  end
end

g = Greeting.new("Alice")
puts g.greet`,
      hints: [
        'The initialize method assigns to a local variable, not an instance variable.',
        'Instance variables must start with @.',
        'Change `name = name` to `@name = name`.',
      ],
      concepts: ['instance-variables', 'initialize', 'common-bugs'],
    },
    {
      id: 'rb-class-14',
      title: 'Fix the Class Method Call',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the bug so that Circle.pi returns 3.14159.',
      skeleton: `class Circle
  def pi
    3.14159
  end
end

puts Circle.pi`,
      solution: `class Circle
  def self.pi
    3.14159
  end
end

puts Circle.pi`,
      hints: [
        'The method is called on the class, not an instance.',
        'Class methods must be defined with `self.`.',
        'Change `def pi` to `def self.pi`.',
      ],
      concepts: ['class-methods', 'self', 'common-bugs'],
    },
    {
      id: 'rb-class-15',
      title: 'Fix the Setter Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the bug so that calling update_name("Bob") actually changes the name.',
      skeleton: `class Person
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def update_name(new_name)
    name = new_name
  end
end

p = Person.new("Alice")
p.update_name("Bob")
puts p.name`,
      solution: `class Person
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def update_name(new_name)
    self.name = new_name
  end
end

p = Person.new("Alice")
p.update_name("Bob")
puts p.name`,
      hints: [
        'Inside a method, `name = new_name` creates a local variable.',
        'To call the setter, you must use `self.name =`.',
        'Without `self`, Ruby thinks you are assigning a local variable.',
      ],
      concepts: ['self', 'setter-disambiguation', 'common-bugs'],
    },
    {
      id: 'rb-class-16',
      title: 'Predict Class Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `class Animal
  attr_reader :sound

  def initialize(sound)
    @sound = sound
  end
end

cat = Animal.new("Meow")
dog = Animal.new("Woof")
puts cat.sound
puts dog.sound`,
      solution: `Meow
Woof`,
      hints: [
        'Each instance has its own @sound.',
        'attr_reader creates a getter method.',
        'puts calls to_s on each value.',
      ],
      concepts: ['instance-variables', 'attr_reader', 'object-creation'],
    },
    {
      id: 'rb-class-17',
      title: 'Predict Class Variable Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `class Tracker
  @@total = 0

  def initialize
    @@total += 1
  end

  def self.total
    @@total
  end
end

Tracker.new
Tracker.new
Tracker.new
puts Tracker.total`,
      solution: `3`,
      hints: [
        'Class variables (@@) are shared across all instances.',
        'Each `new` call triggers initialize, incrementing @@total.',
        'Three instances are created, so @@total is 3.',
      ],
      concepts: ['class-variables', 'class-methods', 'shared-state'],
    },
    {
      id: 'rb-class-18',
      title: 'Predict Method Visibility',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code output? (If an error occurs, write the error type.)',
      skeleton: `class Secret
  def public_msg
    "Public: \#{private_msg}"
  end

  private

  def private_msg
    "hidden"
  end
end

s = Secret.new
puts s.public_msg`,
      solution: `Public: hidden`,
      hints: [
        'Private methods can be called from within other methods of the same class.',
        'public_msg calls private_msg internally, which is allowed.',
        'It would only fail if you called s.private_msg directly.',
      ],
      concepts: ['private-methods', 'access-control', 'encapsulation'],
    },
    {
      id: 'rb-class-19',
      title: 'Refactor to Use attr_accessor',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Refactor this class to use attr_accessor instead of manually defined getter and setter methods.',
      skeleton: `class Product
  def initialize(name, price)
    @name = name
    @price = price
  end

  def name
    @name
  end

  def name=(value)
    @name = value
  end

  def price
    @price
  end

  def price=(value)
    @price = value
  end
end`,
      solution: `class Product
  attr_accessor :name, :price

  def initialize(name, price)
    @name = name
    @price = price
  end
end`,
      hints: [
        '`attr_accessor` generates both getter and setter methods.',
        'Remove the manual getter and setter definitions.',
        'One line replaces four method definitions.',
      ],
      concepts: ['attr_accessor', 'refactoring', 'DRY'],
    },
    {
      id: 'rb-class-20',
      title: 'Refactor to Extract a Class Method',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor so the formatting logic is a class method self.format(temp, scale) that to_s calls.',
      skeleton: `class Temperature
  attr_reader :value, :scale

  def initialize(value, scale)
    @value = value
    @scale = scale
  end

  def to_s
    if scale == :celsius
      "\#{value}°C"
    else
      "\#{value}°F"
    end
  end
end`,
      solution: `class Temperature
  attr_reader :value, :scale

  def initialize(value, scale)
    @value = value
    @scale = scale
  end

  def self.format(temp, scale)
    if scale == :celsius
      "\#{temp}°C"
    else
      "\#{temp}°F"
    end
  end

  def to_s
    self.class.format(value, scale)
  end
end`,
      hints: [
        'Extract the formatting into `self.format(temp, scale)`.',
        'Call the class method from to_s using `self.class.format`.',
        'This makes the format logic reusable without an instance.',
      ],
      concepts: ['class-methods', 'refactoring', 'self.class'],
    },
  ],
};
