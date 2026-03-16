import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-meta',
  title: '24. Metaprogramming',
  explanation: `## Metaprogramming in Ruby

Metaprogramming is writing code that writes code. Ruby excels at this due to its dynamic nature.

\`\`\`ruby
# define_method - create methods dynamically
class User
  [:name, :email, :age].each do |attr|
    define_method(attr) { instance_variable_get("@\#{attr}") }
    define_method("\#{attr}=") { |val| instance_variable_set("@\#{attr}", val) }
  end
end

# class_eval - evaluate code in the context of a class
String.class_eval do
  def shout
    upcase + "!"
  end
end

# instance_eval - evaluate code in the context of an object
obj = Object.new
obj.instance_eval do
  @secret = 42
  def reveal
    @secret
  end
end

# send - call methods by name
"hello".send(:upcase)  # => "HELLO"

# method objects
m = "hello".method(:upcase)
m.call  # => "HELLO"

# eval (use sparingly!)
eval('2 + 2')  # => 4
\`\`\`

### Key Concepts

- **\`define_method\`** creates methods dynamically at runtime
- **\`class_eval\`** / \`module_eval\` evaluates code in a class context
- **\`instance_eval\`** evaluates code in an object's context
- **\`send\`** / \`public_send\` calls methods by symbol name
- **Method objects** reify methods into callable objects
- **\`eval\`** executes a string as Ruby code (avoid when possible)`,
  exercises: [
    {
      id: 'rb-meta-1',
      title: 'define_method Basics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to dynamically define a greeting method.',
      skeleton: `class Greeter
  ___(___) do |name|
    "Hello, \#{name}!"
  end
end

puts Greeter.new.greet("Alice")`,
      solution: `class Greeter
  define_method(:greet) do |name|
    "Hello, \#{name}!"
  end
end

puts Greeter.new.greet("Alice")`,
      hints: [
        '`define_method` takes a symbol (method name) and a block.',
        'Block parameters become method parameters.',
        'The block body becomes the method body.',
      ],
      concepts: ['define_method', 'dynamic-methods', 'blocks'],
    },
    {
      id: 'rb-meta-2',
      title: 'class_eval',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to add a method to String using class_eval.',
      skeleton: `String.___ do
  def excited
    self + "!!!"
  end
end

puts "hello".excited`,
      solution: `String.class_eval do
  def excited
    self + "!!!"
  end
end

puts "hello".excited`,
      hints: [
        '`class_eval` opens the class for modification.',
        'Methods defined inside become instance methods.',
        'Similar to reopening the class.',
      ],
      concepts: ['class_eval', 'metaprogramming', 'String'],
    },
    {
      id: 'rb-meta-3',
      title: 'instance_eval',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to set an instance variable on an object using instance_eval.',
      skeleton: `class Box; end

b = Box.new
b.___ do
  @contents = "treasure"
end

puts b.instance_variable_get(:@contents)`,
      solution: `class Box; end

b = Box.new
b.instance_eval do
  @contents = "treasure"
end

puts b.instance_variable_get(:@contents)`,
      hints: [
        '`instance_eval` executes the block in the context of the object.',
        'self inside the block refers to the object.',
        'You can access and set instance variables directly.',
      ],
      concepts: ['instance_eval', 'context', 'instance-variables'],
    },
    {
      id: 'rb-meta-4',
      title: 'Method Objects',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to get a method object and call it.',
      skeleton: `str = "hello world"
m = str.___(___) 
puts m.call`,
      solution: `str = "hello world"
m = str.method(:upcase) 
puts m.call`,
      hints: [
        '`.method(:name)` returns a Method object.',
        'Method objects can be called with `.call`.',
        'They retain the receiver (str) and method.',
      ],
      concepts: ['method-objects', 'call', 'reification'],
    },
    {
      id: 'rb-meta-5',
      title: 'Dynamic Attribute Generator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blanks to generate getter/setter methods dynamically.',
      skeleton: `class Model
  def self.attribute(name)
    ___(name) do
      instance_variable_get("@\#{name}")
    end
    ___("\#{name}=") do |val|
      instance_variable_set("@\#{name}", val)
    end
  end

  attribute :title
  attribute :author
end`,
      solution: `class Model
  def self.attribute(name)
    define_method(name) do
      instance_variable_get("@\#{name}")
    end
    define_method("\#{name}=") do |val|
      instance_variable_set("@\#{name}", val)
    end
  end

  attribute :title
  attribute :author
end`,
      hints: [
        'Use define_method to create the getter.',
        'Use define_method with "name=" for the setter.',
        'instance_variable_get/set access @variables dynamically.',
      ],
      concepts: ['define_method', 'instance_variable_get', 'instance_variable_set'],
    },
    {
      id: 'rb-meta-6',
      title: 'send with Arguments',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to call the method dynamically.',
      skeleton: `arr = [3, 1, 4, 1, 5]
operation = :sort
puts arr.___(operation).inspect`,
      solution: `arr = [3, 1, 4, 1, 5]
operation = :sort
puts arr.send(operation).inspect`,
      hints: [
        '`send` calls the method named by the symbol.',
        'Additional arguments after the method name are passed through.',
        'send works with any method, including private ones.',
      ],
      concepts: ['send', 'dynamic-dispatch', 'symbol'],
    },
    {
      id: 'rb-meta-7',
      title: 'Write a Custom attr_accessor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a class method my_attr_accessor(*names) that mimics attr_accessor using define_method, instance_variable_get, and instance_variable_set.',
      skeleton: `# Write your my_attr_accessor implementation`,
      solution: `class Module
  def my_attr_accessor(*names)
    names.each do |name|
      define_method(name) do
        instance_variable_get("@\#{name}")
      end
      define_method("\#{name}=") do |val|
        instance_variable_set("@\#{name}", val)
      end
    end
  end
end`,
      hints: [
        'Define it on Module so all classes can use it.',
        'Iterate over names and define getter/setter pairs.',
        'Use instance_variable_get/set with dynamic variable names.',
      ],
      concepts: ['define_method', 'Module', 'attr_accessor'],
    },
    {
      id: 'rb-meta-8',
      title: 'Write a Validation Macro',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a class method validates_presence_of(*attrs) that adds a valid? method checking that none of the specified attributes are nil or empty.',
      skeleton: `# Write your validates_presence_of macro`,
      solution: `module Validatable
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def validates_presence_of(*attrs)
      define_method(:valid?) do
        attrs.all? do |attr|
          val = send(attr)
          val != nil && val != ""
        end
      end
    end
  end
end`,
      hints: [
        'Use a module with included hook for the class method.',
        'define_method creates the valid? method dynamically.',
        'Check each attribute using send to call the getter.',
      ],
      concepts: ['define_method', 'macro', 'validation'],
    },
    {
      id: 'rb-meta-9',
      title: 'Write class_eval Method Injection',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method add_greeting(klass, greeting) that uses class_eval to add a greet method to the given class that returns the greeting string.',
      skeleton: `# Write your add_greeting method`,
      solution: `def add_greeting(klass, greeting)
  klass.class_eval do
    define_method(:greet) do
      greeting
    end
  end
end`,
      hints: [
        'class_eval opens the class for modification.',
        'define_method inside class_eval creates an instance method.',
        'The greeting variable is captured by the closure.',
      ],
      concepts: ['class_eval', 'define_method', 'closure'],
    },
    {
      id: 'rb-meta-10',
      title: 'Write a Hook-Based Registry',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Plugin module with self.included that registers the including class in a @@plugins array. Add a self.plugins method to list all registered classes.',
      skeleton: `# Write your Plugin registry module`,
      solution: `module Plugin
  @@plugins = []

  def self.included(base)
    @@plugins << base
  end

  def self.plugins
    @@plugins
  end
end`,
      hints: [
        'Use a class variable @@plugins to store registered classes.',
        'self.included is called when a class includes the module.',
        'base is the class that includes the module.',
      ],
      concepts: ['self.included', 'registry-pattern', 'class-variables'],
    },
    {
      id: 'rb-meta-11',
      title: 'Write a Method Tracer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a module Traceable with a class method trace(*method_names) that wraps each named method to print "Calling method_name" before and "Done method_name" after execution.',
      skeleton: `# Write your Traceable module`,
      solution: `module Traceable
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def trace(*method_names)
      method_names.each do |name|
        original = instance_method(name)
        define_method(name) do |*args, &block|
          puts "Calling \#{name}"
          result = original.bind(self).call(*args, &block)
          puts "Done \#{name}"
          result
        end
      end
    end
  end
end`,
      hints: [
        'Save the original method with instance_method.',
        'Redefine the method with define_method.',
        'Bind and call the original inside the wrapper.',
      ],
      concepts: ['instance_method', 'bind', 'method-wrapping'],
    },
    {
      id: 'rb-meta-12',
      title: 'Write instance_eval Configuration',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Config class with a self.setup(&block) class method that creates a new Config, evaluates the block with instance_eval, and returns it. Config should store key-value pairs via method_missing.',
      skeleton: `# Write your Config class`,
      solution: `class Config
  def initialize
    @data = {}
  end

  def self.setup(&block)
    config = new
    config.instance_eval(&block)
    config
  end

  def method_missing(name, *args)
    if name.to_s.end_with?("=")
      @data[name.to_s.chomp("=").to_sym] = args[0]
    elsif args.length == 1
      @data[name] = args[0]
    else
      @data[name]
    end
  end

  def to_h
    @data
  end
end`,
      hints: [
        'instance_eval changes self to the Config object.',
        'method_missing handles dynamic key setting.',
        'The block can use bare method calls to set values.',
      ],
      concepts: ['instance_eval', 'method_missing', 'configuration'],
    },
    {
      id: 'rb-meta-13',
      title: 'Fix define_method Scope Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so each method returns its own color name.',
      skeleton: `class Palette
  colors = [:red, :green, :blue]
  colors.each do |color|
    define_method(color) do
      colors.last.to_s
    end
  end
end

p = Palette.new
puts p.red
puts p.green
puts p.blue`,
      solution: `class Palette
  colors = [:red, :green, :blue]
  colors.each do |color|
    define_method(color) do
      color.to_s
    end
  end
end

p = Palette.new
puts p.red
puts p.green
puts p.blue`,
      hints: [
        'The block captures the `color` variable from each iteration.',
        'Use `color` (the block variable) not `colors.last`.',
        'Each iteration has its own `color` value.',
      ],
      concepts: ['closure', 'define_method', 'variable-capture'],
    },
    {
      id: 'rb-meta-14',
      title: 'Fix class_eval vs instance_eval Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so the method is defined as an instance method, not a singleton method.',
      skeleton: `class MyClass; end

MyClass.instance_eval do
  def hello
    "Hello!"
  end
end

puts MyClass.new.hello`,
      solution: `class MyClass; end

MyClass.class_eval do
  def hello
    "Hello!"
  end
end

puts MyClass.new.hello`,
      hints: [
        'instance_eval on a class defines singleton (class) methods.',
        'class_eval on a class defines instance methods.',
        'Change instance_eval to class_eval.',
      ],
      concepts: ['class_eval-vs-instance_eval', 'instance-methods', 'common-bugs'],
    },
    {
      id: 'rb-meta-15',
      title: 'Fix eval Security Issue',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code to avoid using eval with user input.',
      skeleton: `def calculate(expression)
  eval(expression)
end

# User could pass: "system('rm -rf /')"
puts calculate("2 + 3")`,
      solution: `def calculate(expression)
  allowed = /\\A[\\d\\s+\\-*/().]+\\z/
  raise "Invalid expression" unless expression.match?(allowed)
  eval(expression)
end

puts calculate("2 + 3")`,
      hints: [
        'eval with user input is a security vulnerability.',
        'Validate the input against a whitelist pattern.',
        'Only allow digits and arithmetic operators.',
      ],
      concepts: ['eval-safety', 'input-validation', 'security'],
    },
    {
      id: 'rb-meta-16',
      title: 'Predict define_method Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `class Counter
  [:increment, :decrement].each_with_index do |name, i|
    define_method(name) do
      i == 0 ? 1 : -1
    end
  end
end

c = Counter.new
puts c.increment
puts c.decrement`,
      solution: `1
-1`,
      hints: [
        'each_with_index gives index 0 for :increment and 1 for :decrement.',
        'The block captures the `i` value from each iteration.',
        'increment returns 1, decrement returns -1.',
      ],
      concepts: ['define_method', 'closure', 'each_with_index'],
    },
    {
      id: 'rb-meta-17',
      title: 'Predict send Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `class Box
  def open = "opened"
  def close = "closed"
end

b = Box.new
[:open, :close, :open].each do |action|
  puts b.send(action)
end`,
      solution: `opened
closed
opened`,
      hints: [
        'send calls each method by its symbol name.',
        'The array determines the order: open, close, open.',
        'Each send returns the method\'s return value.',
      ],
      concepts: ['send', 'dynamic-dispatch', 'iteration'],
    },
    {
      id: 'rb-meta-18',
      title: 'Predict instance_eval Context',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `class Foo
  def initialize
    @x = 10
  end
end

f = Foo.new
result = f.instance_eval { @x + 5 }
puts result`,
      solution: `15`,
      hints: [
        'instance_eval changes self to the object f.',
        '@x inside the block refers to f\'s @x.',
        '10 + 5 = 15.',
      ],
      concepts: ['instance_eval', 'context', 'instance-variables'],
    },
    {
      id: 'rb-meta-19',
      title: 'Refactor Repetitive Methods to define_method',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor these repetitive status methods to use define_method.',
      skeleton: `class Order
  attr_reader :status

  def initialize(status)
    @status = status
  end

  def pending?
    @status == :pending
  end

  def shipped?
    @status == :shipped
  end

  def delivered?
    @status == :delivered
  end

  def cancelled?
    @status == :cancelled
  end
end`,
      solution: `class Order
  attr_reader :status

  def initialize(status)
    @status = status
  end

  [:pending, :shipped, :delivered, :cancelled].each do |s|
    define_method("\#{s}?") do
      @status == s
    end
  end
end`,
      hints: [
        'All status methods follow the same pattern.',
        'Use define_method with string interpolation for the method name.',
        'The block captures each status symbol.',
      ],
      concepts: ['define_method', 'DRY', 'refactoring'],
    },
    {
      id: 'rb-meta-20',
      title: 'Refactor eval to define_method',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the dangerous eval-based approach to use define_method.',
      skeleton: `class MathHelper
  ["double", "triple", "quadruple"].each_with_index do |name, i|
    multiplier = i + 2
    eval <<-RUBY
      def \#{name}(n)
        n * \#{multiplier}
      end
    RUBY
  end
end`,
      solution: `class MathHelper
  { double: 2, triple: 3, quadruple: 4 }.each do |name, multiplier|
    define_method(name) do |n|
      n * multiplier
    end
  end
end`,
      hints: [
        'Replace eval with define_method.',
        'Use a hash for clearer name-to-multiplier mapping.',
        'define_method is safer and more readable than eval.',
      ],
      concepts: ['define_method', 'eval-replacement', 'refactoring'],
    },
  ],
};
