import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-modules',
  title: '12. Modules',
  explanation: `## Modules in Ruby

Modules serve two purposes: **namespacing** and **mixins**. They cannot be instantiated.

\`\`\`ruby
# Namespacing
module Payments
  class Invoice
    def total
      100
    end
  end
end

inv = Payments::Invoice.new

# Mixin
module Greetable
  def greet
    "Hello, I'm \#{name}"
  end
end

class User
  include Greetable
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

User.new("Alice").greet  # => "Hello, I'm Alice"
\`\`\`

### Key Concepts

- **\`module\`** defines a module — a collection of methods and constants
- **\`include\`** adds module methods as instance methods
- **\`extend\`** adds module methods as class methods
- **\`module_function\`** makes methods callable on the module directly
- **Namespacing** prevents name collisions with \`Module::Class\`
- The **Kernel** module is included in Object, providing methods like \`puts\` and \`print\``,
  exercises: [
    {
      id: 'rb-modules-1',
      title: 'Define a Module',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to define a module named Helpers.',
      skeleton: `___ Helpers
  def format_name(name)
    name.strip.capitalize
  end
end`,
      solution: `module Helpers
  def format_name(name)
    name.strip.capitalize
  end
end`,
      hints: [
        'Use the `module` keyword to define a module.',
        'Module names follow CamelCase convention.',
        'Modules cannot be instantiated with `.new`.',
      ],
      concepts: ['module-definition', 'syntax'],
    },
    {
      id: 'rb-modules-2',
      title: 'Include a Module',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to include the Printable module in the Report class.',
      skeleton: `module Printable
  def print_out
    "Printing..."
  end
end

class Report
  ___ Printable
end`,
      solution: `module Printable
  def print_out
    "Printing..."
  end
end

class Report
  include Printable
end`,
      hints: [
        '`include` adds module methods as instance methods.',
        'Place the include statement inside the class body.',
        'After including, Report instances can call print_out.',
      ],
      concepts: ['include', 'mixins', 'instance-methods'],
    },
    {
      id: 'rb-modules-3',
      title: 'Extend a Module',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to add Configuration methods as class methods.',
      skeleton: `module Configuration
  def default_settings
    { theme: "dark" }
  end
end

class App
  ___ Configuration
end`,
      solution: `module Configuration
  def default_settings
    { theme: "dark" }
  end
end

class App
  extend Configuration
end`,
      hints: [
        '`extend` adds module methods as class methods.',
        'After extending, call App.default_settings (not on instances).',
        'Compare: include for instance methods, extend for class methods.',
      ],
      concepts: ['extend', 'class-methods', 'mixins'],
    },
    {
      id: 'rb-modules-4',
      title: 'Module Namespacing',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to create an instance of the namespaced class.',
      skeleton: `module Geometry
  class Circle
    def initialize(radius)
      @radius = radius
    end
  end
end

c = ___::___.new(5)`,
      solution: `module Geometry
  class Circle
    def initialize(radius)
      @radius = radius
    end
  end
end

c = Geometry::Circle.new(5)`,
      hints: [
        'Use the `::` operator to access classes inside modules.',
        'The full path is ModuleName::ClassName.',
        'This prevents naming collisions with other Circle classes.',
      ],
      concepts: ['namespacing', 'scope-resolution', 'modules'],
    },
    {
      id: 'rb-modules-5',
      title: 'module_function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to make the helper method callable directly on the module.',
      skeleton: `module MathUtils
  ___

  def square(n)
    n * n
  end
end

puts MathUtils.square(4)`,
      solution: `module MathUtils
  module_function

  def square(n)
    n * n
  end
end

puts MathUtils.square(4)`,
      hints: [
        '`module_function` makes subsequent methods callable on the module itself.',
        'It also makes the methods private when included in a class.',
        'Place it before the method definitions.',
      ],
      concepts: ['module_function', 'module-methods', 'dual-purpose'],
    },
    {
      id: 'rb-modules-6',
      title: 'Access a Module Constant',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to access the VERSION constant from the API module.',
      skeleton: `module API
  VERSION = "2.1.0"
end

puts ___`,
      solution: `module API
  VERSION = "2.1.0"
end

puts API::VERSION`,
      hints: [
        'Constants inside modules are accessed with `::`.',
        'The syntax is ModuleName::CONSTANT_NAME.',
        'Constants start with an uppercase letter in Ruby.',
      ],
      concepts: ['constants', 'namespacing', 'scope-resolution'],
    },
    {
      id: 'rb-modules-7',
      title: 'Write a Loggable Module',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Write a module Loggable with a method log(message) that returns "[LOG] message". Then include it in a Server class that has a start method calling log("Server started").',
      skeleton: `# Write your Loggable module and Server class here`,
      solution: `module Loggable
  def log(message)
    "[LOG] \#{message}"
  end
end

class Server
  include Loggable

  def start
    log("Server started")
  end
end`,
      hints: [
        'Define the module with a `log` method using string interpolation.',
        'Include the module inside the Server class.',
        'The start method calls log which is mixed in from Loggable.',
      ],
      concepts: ['modules', 'include', 'mixins'],
    },
    {
      id: 'rb-modules-8',
      title: 'Write a Namespace Module',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a module Animals containing classes Dog and Cat. Each should have a speak method returning "Woof!" and "Meow!" respectively.',
      skeleton: `# Write your Animals module with Dog and Cat classes`,
      solution: `module Animals
  class Dog
    def speak
      "Woof!"
    end
  end

  class Cat
    def speak
      "Meow!"
    end
  end
end`,
      hints: [
        'Define both classes inside the module body.',
        'Access them as Animals::Dog and Animals::Cat.',
        'Each class has its own speak method.',
      ],
      concepts: ['namespacing', 'module-definition', 'class-definition'],
    },
    {
      id: 'rb-modules-9',
      title: 'Write a Module with Both Include and Extend',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a module Serializable with an instance method to_json returning a Hash of instance variables as a string, and a method from_data(data) meant to be used as a class method. Use self.included hook to extend the ClassMethods.',
      skeleton: `# Write your Serializable module here`,
      solution: `module Serializable
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def from_data(data)
      obj = new
      data.each { |k, v| obj.instance_variable_set("@\#{k}", v) }
      obj
    end
  end

  def to_json
    vars = {}
    instance_variables.each do |iv|
      vars[iv.to_s.delete("@")] = instance_variable_get(iv)
    end
    vars.to_s
  end
end`,
      hints: [
        'Use `self.included(base)` hook to extend ClassMethods automatically.',
        'Define a nested module ClassMethods for class-level methods.',
        'to_json iterates over instance_variables.',
      ],
      concepts: ['self.included', 'extend', 'hook-methods'],
    },
    {
      id: 'rb-modules-10',
      title: 'Write module_function Utilities',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a module StringUtils with module_function methods: shout(str) returns str upcased with "!", and whisper(str) returns str downcased with "...".',
      skeleton: `# Write your StringUtils module here`,
      solution: `module StringUtils
  module_function

  def shout(str)
    "\#{str.upcase}!"
  end

  def whisper(str)
    "\#{str.downcase}..."
  end
end`,
      hints: [
        'Place `module_function` before the method definitions.',
        'Methods will be callable as StringUtils.shout("hi").',
        'Use upcase and downcase string methods.',
      ],
      concepts: ['module_function', 'string-methods', 'utility-module'],
    },
    {
      id: 'rb-modules-11',
      title: 'Write a Kernel-like Module',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a module Debug with a module_function method debug_inspect that returns the class name and object_id of self formatted as "ClassName#ID".',
      skeleton: `# Write your Debug module here`,
      solution: `module Debug
  def debug_inspect
    "\#{self.class.name}#\#{object_id}"
  end
end`,
      hints: [
        'self.class.name returns the class name as a string.',
        'object_id returns a unique integer for each object.',
        'Use string interpolation to combine them.',
      ],
      concepts: ['self', 'introspection', 'object_id'],
    },
    {
      id: 'rb-modules-12',
      title: 'Write Nested Module Constants',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a module Config with a nested module Database containing constants HOST = "localhost", PORT = 5432, and a method self.connection_string returning "HOST:PORT".',
      skeleton: `# Write your Config module here`,
      solution: `module Config
  module Database
    HOST = "localhost"
    PORT = 5432

    def self.connection_string
      "\#{HOST}:\#{PORT}"
    end
  end
end`,
      hints: [
        'Nest the Database module inside Config.',
        'Constants are just uppercase names assigned values.',
        'Access as Config::Database::HOST or Config::Database.connection_string.',
      ],
      concepts: ['nested-modules', 'constants', 'namespacing'],
    },
    {
      id: 'rb-modules-13',
      title: 'Fix Module Include Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the bug so that the Swimmer module methods work on Fish instances.',
      skeleton: `module Swimmer
  def swim
    "Swimming!"
  end
end

class Fish
  extend Swimmer
end

nemo = Fish.new
puts nemo.swim`,
      solution: `module Swimmer
  def swim
    "Swimming!"
  end
end

class Fish
  include Swimmer
end

nemo = Fish.new
puts nemo.swim`,
      hints: [
        '`extend` adds methods as class methods, not instance methods.',
        'To add instance methods, use `include` instead.',
        'nemo.swim needs swim to be an instance method.',
      ],
      concepts: ['include-vs-extend', 'instance-methods', 'common-bugs'],
    },
    {
      id: 'rb-modules-14',
      title: 'Fix Module Method Access',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so MathHelper.double(5) works.',
      skeleton: `module MathHelper
  def double(n)
    n * 2
  end
end

puts MathHelper.double(5)`,
      solution: `module MathHelper
  module_function

  def double(n)
    n * 2
  end
end

puts MathHelper.double(5)`,
      hints: [
        'Module methods need `module_function` to be called on the module directly.',
        'Alternatively, define it as `def self.double(n)`.',
        'Without module_function, the method is only available when included.',
      ],
      concepts: ['module_function', 'module-methods', 'common-bugs'],
    },
    {
      id: 'rb-modules-15',
      title: 'Fix Namespace Resolution',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so it correctly creates an instance of the namespaced Parser class.',
      skeleton: `module Formats
  class Parser
    def parse(data)
      data.split(",")
    end
  end
end

p = Parser.new
puts p.parse("a,b,c").inspect`,
      solution: `module Formats
  class Parser
    def parse(data)
      data.split(",")
    end
  end
end

p = Formats::Parser.new
puts p.parse("a,b,c").inspect`,
      hints: [
        'Parser is nested inside Formats module.',
        'You must use the full path: Formats::Parser.',
        'Without the namespace, Ruby looks for a top-level Parser class.',
      ],
      concepts: ['namespacing', 'scope-resolution', 'common-bugs'],
    },
    {
      id: 'rb-modules-16',
      title: 'Predict Include Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `module Describable
  def describe
    "I am a \#{self.class.name}"
  end
end

class Car
  include Describable
end

class Bike
  include Describable
end

puts Car.new.describe
puts Bike.new.describe`,
      solution: `I am a Car
I am a Bike`,
      hints: [
        'self.class.name returns the actual class name of the instance.',
        'The same module method behaves differently based on which class includes it.',
        'Car.new.describe uses self = Car instance.',
      ],
      concepts: ['self', 'include', 'polymorphism'],
    },
    {
      id: 'rb-modules-17',
      title: 'Predict module_function Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `module Utils
  module_function

  def greeting
    "Hello!"
  end
end

puts Utils.greeting

class App
  include Utils
end

a = App.new
begin
  puts a.greeting
rescue NoMethodError
  puts "Error: private method"
end`,
      solution: `Hello!
Error: private method`,
      hints: [
        'module_function makes methods callable on the module directly.',
        'When included, module_function methods become private.',
        'Calling a private method externally raises NoMethodError.',
      ],
      concepts: ['module_function', 'private-methods', 'NoMethodError'],
    },
    {
      id: 'rb-modules-18',
      title: 'Predict Extend Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `module Findable
  def find(id)
    "Found \#{name} with id \#{id}"
  end
end

class User
  extend Findable

  def self.name
    "User"
  end
end

puts User.find(42)`,
      solution: `Found User with id 42`,
      hints: [
        'extend adds module methods as class methods.',
        'Inside the class method, self is the class itself.',
        'self.name (or just name) returns "User".',
      ],
      concepts: ['extend', 'class-methods', 'self'],
    },
    {
      id: 'rb-modules-19',
      title: 'Refactor Duplicated Methods to Module',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Extract the duplicated timestamp method into a Timestamped module and include it in both classes.',
      skeleton: `class Post
  def timestamp
    Time.now.strftime("%Y-%m-%d")
  end

  def title
    "My Post"
  end
end

class Comment
  def timestamp
    Time.now.strftime("%Y-%m-%d")
  end

  def body
    "Nice post!"
  end
end`,
      solution: `module Timestamped
  def timestamp
    Time.now.strftime("%Y-%m-%d")
  end
end

class Post
  include Timestamped

  def title
    "My Post"
  end
end

class Comment
  include Timestamped

  def body
    "Nice post!"
  end
end`,
      hints: [
        'Extract the shared method into a module.',
        'Include the module in both classes.',
        'This follows the DRY (Don\'t Repeat Yourself) principle.',
      ],
      concepts: ['modules', 'DRY', 'refactoring', 'include'],
    },
    {
      id: 'rb-modules-20',
      title: 'Refactor to Use Namespacing',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor to wrap both classes inside a Shapes module namespace to avoid potential naming conflicts.',
      skeleton: `class Circle
  def initialize(radius)
    @radius = radius
  end

  def area
    Math::PI * @radius ** 2
  end
end

class Square
  def initialize(side)
    @side = side
  end

  def area
    @side ** 2
  end
end`,
      solution: `module Shapes
  class Circle
    def initialize(radius)
      @radius = radius
    end

    def area
      Math::PI * @radius ** 2
    end
  end

  class Square
    def initialize(side)
      @side = side
    end

    def area
      @side ** 2
    end
  end
end`,
      hints: [
        'Wrap both classes inside a `module Shapes` block.',
        'Access them as Shapes::Circle and Shapes::Square.',
        'Namespacing prevents collisions with other libraries.',
      ],
      concepts: ['namespacing', 'refactoring', 'modules'],
    },
  ],
};
