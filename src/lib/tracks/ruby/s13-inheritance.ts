import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-inherit',
  title: '13. Inheritance',
  explanation: `## Inheritance in Ruby

Ruby supports **single inheritance** — each class can inherit from exactly one parent class. All classes ultimately inherit from \`Object\`, which inherits from \`BasicObject\`.

\`\`\`ruby
class Animal
  def initialize(name)
    @name = name
  end

  def speak
    "..."
  end
end

class Dog < Animal
  def speak
    "Woof! I'm \#{@name}"
  end
end

class Puppy < Dog
  def speak
    super + " (tiny woof)"
  end
end

puts Puppy.new("Rex").speak
# => "Woof! I'm Rex (tiny woof)"
\`\`\`

### Key Concepts

- **\`<\`** denotes inheritance: \`class Child < Parent\`
- **\`super\`** calls the parent's version of the current method
- **\`super\`** without arguments forwards all arguments automatically
- **\`super()\`** with empty parens calls parent with no arguments
- **Method Resolution Order (MRO)**: Ruby searches the class, then included modules, then the parent class, up the chain
- **\`ancestors\`** method shows the full MRO chain
- \`BasicObject\` → \`Kernel\` (module) → \`Object\` is the root hierarchy`,
  exercises: [
    {
      id: 'rb-inherit-1',
      title: 'Basic Inheritance Syntax',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to make Car inherit from Vehicle.',
      skeleton: `class Vehicle
  def start
    "Vroom!"
  end
end

class Car ___ Vehicle
end`,
      solution: `class Vehicle
  def start
    "Vroom!"
  end
end

class Car < Vehicle
end`,
      hints: [
        'Ruby uses `<` to denote inheritance.',
        'The child class goes on the left, parent on the right.',
        'Car will inherit all methods from Vehicle.',
      ],
      concepts: ['inheritance', 'syntax', 'subclass'],
    },
    {
      id: 'rb-inherit-2',
      title: 'Call super',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to call the parent class initialize method.',
      skeleton: `class Animal
  def initialize(name)
    @name = name
  end
end

class Dog < Animal
  def initialize(name, breed)
    ___
    @breed = breed
  end
end`,
      solution: `class Animal
  def initialize(name)
    @name = name
  end
end

class Dog < Animal
  def initialize(name, breed)
    super(name)
    @breed = breed
  end
end`,
      hints: [
        '`super` calls the parent method of the same name.',
        'Pass only the arguments the parent method expects.',
        '`super(name)` passes name to Animal#initialize.',
      ],
      concepts: ['super', 'initialize', 'inheritance'],
    },
    {
      id: 'rb-inherit-3',
      title: 'Override a Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to override the describe method in ElectricCar.',
      skeleton: `class Car
  def describe
    "I am a car"
  end
end

class ElectricCar < Car
  def ___
    "I am an electric car"
  end
end`,
      solution: `class Car
  def describe
    "I am a car"
  end
end

class ElectricCar < Car
  def describe
    "I am an electric car"
  end
end`,
      hints: [
        'To override a method, define a method with the same name in the child class.',
        'The child version completely replaces the parent version.',
        'Use `super` if you want to also call the parent version.',
      ],
      concepts: ['method-overriding', 'polymorphism', 'inheritance'],
    },
    {
      id: 'rb-inherit-4',
      title: 'Check Ancestry',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to check if an object is an instance of Animal or its subclasses.',
      skeleton: `class Animal; end
class Dog < Animal; end

rex = Dog.new
puts rex.___(___)`,
      solution: `class Animal; end
class Dog < Animal; end

rex = Dog.new
puts rex.is_a?(Animal)`,
      hints: [
        '`is_a?` checks if an object is an instance of a class or its ancestors.',
        'Also aliased as `kind_of?`.',
        'Returns true for Dog and Animal since Dog inherits from Animal.',
      ],
      concepts: ['is_a?', 'type-checking', 'ancestry'],
    },
    {
      id: 'rb-inherit-5',
      title: 'super Without Arguments',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to call super forwarding all arguments automatically.',
      skeleton: `class Logger
  def log(message, level)
    "[\#{level}] \#{message}"
  end
end

class TimestampLogger < Logger
  def log(message, level)
    "[TIME] " + ___
  end
end`,
      solution: `class Logger
  def log(message, level)
    "[\#{level}] \#{message}"
  end
end

class TimestampLogger < Logger
  def log(message, level)
    "[TIME] " + super
  end
end`,
      hints: [
        '`super` without parentheses forwards all arguments to the parent method.',
        'This is different from `super()` which passes no arguments.',
        'Both message and level are forwarded automatically.',
      ],
      concepts: ['super', 'argument-forwarding', 'inheritance'],
    },
    {
      id: 'rb-inherit-6',
      title: 'View Ancestors Chain',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to print the method resolution order of Dog.',
      skeleton: `class Animal; end
class Dog < Animal; end

puts Dog.___.inspect`,
      solution: `class Animal; end
class Dog < Animal; end

puts Dog.ancestors.inspect`,
      hints: [
        'The `ancestors` method returns the MRO as an array.',
        'It shows the class, included modules, and parent classes.',
        'Call it on the class itself, not an instance.',
      ],
      concepts: ['ancestors', 'method-resolution-order', 'introspection'],
    },
    {
      id: 'rb-inherit-7',
      title: 'Write an Inheritance Hierarchy',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Write a Shape base class with a describe method returning "I am a shape", then Circle and Square classes that override describe to return "I am a circle" and "I am a square".',
      skeleton: `# Write your Shape hierarchy here`,
      solution: `class Shape
  def describe
    "I am a shape"
  end
end

class Circle < Shape
  def describe
    "I am a circle"
  end
end

class Square < Shape
  def describe
    "I am a square"
  end
end`,
      hints: [
        'Define Shape with a describe method.',
        'Circle and Square inherit from Shape with `<`.',
        'Override describe in each subclass.',
      ],
      concepts: ['inheritance', 'method-overriding', 'polymorphism'],
    },
    {
      id: 'rb-inherit-8',
      title: 'Write a Class Using super in initialize',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Person class with name, and Employee < Person that adds company. Both should use initialize and Employee should call super.',
      skeleton: `# Write your Person and Employee classes`,
      solution: `class Person
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

class Employee < Person
  attr_reader :company

  def initialize(name, company)
    super(name)
    @company = company
  end
end`,
      hints: [
        'Person takes name in initialize.',
        'Employee takes name and company.',
        'Use super(name) to call Person#initialize.',
      ],
      concepts: ['super', 'initialize', 'inheritance'],
    },
    {
      id: 'rb-inherit-9',
      title: 'Write a Template Method Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Report class with a generate method that returns header + "\\n" + body. Define header returning "=== Report ===" and body returning "No content". Write SalesReport that overrides body to return "Sales: $1000".',
      skeleton: `# Write your Report template method pattern`,
      solution: `class Report
  def generate
    header + "\\n" + body
  end

  def header
    "=== Report ==="
  end

  def body
    "No content"
  end
end

class SalesReport < Report
  def body
    "Sales: $1000"
  end
end`,
      hints: [
        'The template method (generate) calls other methods.',
        'Subclasses override specific steps (body) without changing the template.',
        'SalesReport only overrides body, inheriting header and generate.',
      ],
      concepts: ['template-method', 'inheritance', 'method-overriding'],
    },
    {
      id: 'rb-inherit-10',
      title: 'Write a Protected Method Hierarchy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write an Account class with a protected method balance returning @balance, and a public method >(other) that compares balances. Write SavingsAccount < Account that passes to super.',
      skeleton: `# Write your Account hierarchy with protected methods`,
      solution: `class Account
  def initialize(balance)
    @balance = balance
  end

  def >(other)
    balance > other.balance
  end

  protected

  def balance
    @balance
  end
end

class SavingsAccount < Account
  def initialize(balance)
    super(balance)
  end
end`,
      hints: [
        'Protected methods can be called by other instances of the same class.',
        'This allows comparing internal state between objects.',
        'Use `protected` keyword before the method definition.',
      ],
      concepts: ['protected', 'access-control', 'inheritance'],
    },
    {
      id: 'rb-inherit-11',
      title: 'Write a Class with superclass Check',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write classes A, B < A, C < B. Write a method ancestry_chain(klass) that builds an array of class names by walking .superclass until nil.',
      skeleton: `# Write your ancestry chain code`,
      solution: `class A; end
class B < A; end
class C < B; end

def ancestry_chain(klass)
  chain = []
  current = klass
  while current
    chain << current.name
    current = current.superclass
  end
  chain
end`,
      hints: [
        'Use `.superclass` to get the parent class.',
        'Loop until superclass returns nil (BasicObject.superclass is nil).',
        'Use `.name` to get the class name as a string.',
      ],
      concepts: ['superclass', 'introspection', 'inheritance-chain'],
    },
    {
      id: 'rb-inherit-12',
      title: 'Write Method That Extends super',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Logger class with format(msg) returning msg, and PrefixLogger < Logger where format(msg) prepends "[INFO] " to what super returns.',
      skeleton: `# Write your Logger hierarchy`,
      solution: `class Logger
  def format(msg)
    msg
  end
end

class PrefixLogger < Logger
  def format(msg)
    "[INFO] " + super
  end
end`,
      hints: [
        'super calls the parent version and returns its result.',
        'You can use the return value of super in an expression.',
        'Prepend the prefix string to whatever super returns.',
      ],
      concepts: ['super', 'method-extension', 'inheritance'],
    },
    {
      id: 'rb-inherit-13',
      title: 'Fix super Arguments Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the bug so that creating a Cat does not cause an ArgumentError.',
      skeleton: `class Animal
  def initialize(name)
    @name = name
  end
end

class Cat < Animal
  def initialize(name, color)
    super
    @color = color
  end
end

Cat.new("Whiskers", "orange")`,
      solution: `class Animal
  def initialize(name)
    @name = name
  end
end

class Cat < Animal
  def initialize(name, color)
    super(name)
    @color = color
  end
end

Cat.new("Whiskers", "orange")`,
      hints: [
        '`super` without parens forwards ALL arguments (name AND color).',
        'Animal#initialize only accepts one argument.',
        'Use `super(name)` to pass only the name argument.',
      ],
      concepts: ['super', 'ArgumentError', 'common-bugs'],
    },
    {
      id: 'rb-inherit-14',
      title: 'Fix Method Resolution Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so that AdminUser correctly inherits from User and adds admin behavior.',
      skeleton: `class User
  def role
    "user"
  end

  def permissions
    ["read"]
  end
end

class AdminUser < User
  def role
    "admin"
  end

  def permissions
    ["read", "write", "delete"]
  end
end

a = AdminUser.new
puts a.role
puts a.permissions.inspect`,
      solution: `class User
  def role
    "user"
  end

  def permissions
    ["read"]
  end
end

class AdminUser < User
  def role
    "admin"
  end

  def permissions
    super + ["write", "delete"]
  end
end

a = AdminUser.new
puts a.role
puts a.permissions.inspect`,
      hints: [
        'AdminUser should build upon parent permissions, not replace them.',
        'Use `super` to get the parent permissions array.',
        'Concatenate with `+` to add new permissions.',
      ],
      concepts: ['super', 'method-overriding', 'array-concatenation'],
    },
    {
      id: 'rb-inherit-15',
      title: 'Fix Missing Inheritance',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the code so that Truck inherits the start method from Vehicle.',
      skeleton: `class Vehicle
  def start
    "Engine started"
  end
end

class Truck
  def honk
    "HONK!"
  end
end

t = Truck.new
puts t.start`,
      solution: `class Vehicle
  def start
    "Engine started"
  end
end

class Truck < Vehicle
  def honk
    "HONK!"
  end
end

t = Truck.new
puts t.start`,
      hints: [
        'Truck does not inherit from Vehicle.',
        'Add `< Vehicle` to the class definition.',
        'Without inheritance, Truck has no start method.',
      ],
      concepts: ['inheritance', 'syntax', 'NoMethodError'],
    },
    {
      id: 'rb-inherit-16',
      title: 'Predict Inheritance Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `class Base
  def greet
    "Hello from Base"
  end
end

class Child < Base
  def greet
    "Hello from Child"
  end
end

puts Child.new.greet
puts Base.new.greet`,
      solution: `Hello from Child
Hello from Base`,
      hints: [
        'Child overrides greet, so Child instances use the Child version.',
        'Base instances still use the original greet method.',
        'Overriding does not modify the parent class.',
      ],
      concepts: ['method-overriding', 'polymorphism', 'inheritance'],
    },
    {
      id: 'rb-inherit-17',
      title: 'Predict super Chain Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `class A
  def who
    "A"
  end
end

class B < A
  def who
    super + "B"
  end
end

class C < B
  def who
    super + "C"
  end
end

puts C.new.who`,
      solution: `ABC`,
      hints: [
        'C#who calls super which calls B#who.',
        'B#who calls super which calls A#who returning "A".',
        'The results concatenate: "A" + "B" + "C" = "ABC".',
      ],
      concepts: ['super', 'method-resolution-order', 'chaining'],
    },
    {
      id: 'rb-inherit-18',
      title: 'Predict is_a? Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `class Animal; end
class Dog < Animal; end

d = Dog.new
puts d.is_a?(Dog)
puts d.is_a?(Animal)
puts d.is_a?(Object)
puts d.instance_of?(Animal)`,
      solution: `true
true
true
false`,
      hints: [
        'is_a? returns true for the class and all ancestors.',
        'instance_of? returns true only for the exact class.',
        'd is an instance of Dog, not Animal directly.',
      ],
      concepts: ['is_a?', 'instance_of?', 'type-checking'],
    },
    {
      id: 'rb-inherit-19',
      title: 'Refactor to Use Inheritance',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor to extract shared code into a base class.',
      skeleton: `class Car
  def initialize(name)
    @name = name
  end

  def start
    "Starting \#{@name}"
  end

  def stop
    "Stopping \#{@name}"
  end

  def honk
    "Beep!"
  end
end

class Truck
  def initialize(name)
    @name = name
  end

  def start
    "Starting \#{@name}"
  end

  def stop
    "Stopping \#{@name}"
  end

  def haul
    "Hauling cargo"
  end
end`,
      solution: `class Vehicle
  def initialize(name)
    @name = name
  end

  def start
    "Starting \#{@name}"
  end

  def stop
    "Stopping \#{@name}"
  end
end

class Car < Vehicle
  def honk
    "Beep!"
  end
end

class Truck < Vehicle
  def haul
    "Hauling cargo"
  end
end`,
      hints: [
        'Extract shared methods (initialize, start, stop) into a Vehicle base class.',
        'Car and Truck inherit from Vehicle.',
        'Each keeps only its unique methods.',
      ],
      concepts: ['inheritance', 'DRY', 'refactoring'],
    },
    {
      id: 'rb-inherit-20',
      title: 'Refactor super into initialize',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor AdminUser to use super in initialize instead of duplicating @name assignment.',
      skeleton: `class User
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

class AdminUser < User
  attr_reader :level

  def initialize(name, level)
    @name = name
    @level = level
  end
end`,
      solution: `class User
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

class AdminUser < User
  attr_reader :level

  def initialize(name, level)
    super(name)
    @level = level
  end
end`,
      hints: [
        'Replace `@name = name` with `super(name)` in AdminUser.',
        'super delegates to the parent initialize.',
        'This avoids duplicating the name assignment logic.',
      ],
      concepts: ['super', 'DRY', 'refactoring'],
    },
  ],
};
