import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-method-missing',
  title: '22. Method Missing',
  explanation: `## method_missing in Ruby

When Ruby cannot find a method on an object, it calls \`method_missing\` as a last resort. This enables powerful dynamic behavior.

\`\`\`ruby
class DynamicHash
  def initialize
    @data = {}
  end

  def method_missing(name, *args)
    if name.to_s.end_with?("=")
      @data[name.to_s.chomp("=")] = args[0]
    else
      @data[name.to_s]
    end
  end

  def respond_to_missing?(name, include_private = false)
    true
  end
end

dh = DynamicHash.new
dh.name = "Alice"     # calls method_missing(:name=, "Alice")
puts dh.name          # calls method_missing(:name)
\`\`\`

### Key Concepts

- **\`method_missing(name, *args, &block)\`** is called when no method is found
- **Always implement \`respond_to_missing?\`** alongside method_missing
- **\`send\`** calls methods by name (including private)
- **\`public_send\`** calls only public methods by name
- **Ghost methods** are methods that exist only through method_missing
- **\`BasicObject\`** has almost no methods, making it ideal for proxy objects
- Be careful with performance — method_missing is slower than defined methods`,
  exercises: [
    {
      id: 'rb-method-missing-1',
      title: 'Basic method_missing',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to define method_missing that returns a message.',
      skeleton: `class Ghost
  def ___(name, *args)
    "You called \#{name} with \#{args.inspect}"
  end
end

g = Ghost.new
puts g.anything(1, 2, 3)`,
      solution: `class Ghost
  def method_missing(name, *args)
    "You called \#{name} with \#{args.inspect}"
  end
end

g = Ghost.new
puts g.anything(1, 2, 3)`,
      hints: [
        'method_missing receives the method name and arguments.',
        'name is a symbol, args is an array.',
        'This catches ALL undefined method calls.',
      ],
      concepts: ['method_missing', 'dynamic-dispatch', 'ghost-methods'],
    },
    {
      id: 'rb-method-missing-2',
      title: 'respond_to_missing?',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to implement respond_to_missing? alongside method_missing.',
      skeleton: `class FlexiHash
  def initialize(data = {})
    @data = data
  end

  def method_missing(name, *args)
    @data[name]
  end

  def ___(name, include_private = false)
    @data.key?(name) || super
  end
end`,
      solution: `class FlexiHash
  def initialize(data = {})
    @data = data
  end

  def method_missing(name, *args)
    @data[name]
  end

  def respond_to_missing?(name, include_private = false)
    @data.key?(name) || super
  end
end`,
      hints: [
        'respond_to_missing? makes respond_to? work correctly.',
        'Return true if you would handle the method in method_missing.',
        'Call super for methods you don\'t handle.',
      ],
      concepts: ['respond_to_missing?', 'method_missing', 'protocol'],
    },
    {
      id: 'rb-method-missing-3',
      title: 'Dynamic Dispatch with send',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to call a method dynamically using send.',
      skeleton: `class Calculator
  def add(a, b) = a + b
  def subtract(a, b) = a - b
  def multiply(a, b) = a * b
end

calc = Calculator.new
operation = :multiply
puts calc.___(operation, 6, 7)`,
      solution: `class Calculator
  def add(a, b) = a + b
  def subtract(a, b) = a - b
  def multiply(a, b) = a * b
end

calc = Calculator.new
operation = :multiply
puts calc.send(operation, 6, 7)`,
      hints: [
        '`send` calls a method by its symbol name.',
        'It passes the remaining arguments to the method.',
        'send can call private methods too (use public_send for safety).',
      ],
      concepts: ['send', 'dynamic-dispatch', 'symbol'],
    },
    {
      id: 'rb-method-missing-4',
      title: 'Setter Detection in method_missing',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to detect setter methods (ending with =) in method_missing.',
      skeleton: `class OpenStruct
  def initialize
    @attrs = {}
  end

  def method_missing(name, *args)
    if name.to_s.___(\"=\")
      @attrs[name.to_s.___("=")] = args[0]
    else
      @attrs[name.to_s]
    end
  end
end`,
      solution: `class OpenStruct
  def initialize
    @attrs = {}
  end

  def method_missing(name, *args)
    if name.to_s.end_with?("=")
      @attrs[name.to_s.chomp("=")] = args[0]
    else
      @attrs[name.to_s]
    end
  end
end`,
      hints: [
        'Setter methods end with "=" like name=.',
        'Use end_with? to check for the = suffix.',
        'Use chomp("=") to remove the = for the key name.',
      ],
      concepts: ['setter-detection', 'end_with?', 'chomp'],
    },
    {
      id: 'rb-method-missing-5',
      title: 'Call super in method_missing',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to call super for unhandled methods.',
      skeleton: `class Prefixed
  def method_missing(name, *args)
    if name.to_s.start_with?("say_")
      word = name.to_s.sub("say_", "")
      word.upcase
    else
      ___
    end
  end
end`,
      solution: `class Prefixed
  def method_missing(name, *args)
    if name.to_s.start_with?("say_")
      word = name.to_s.sub("say_", "")
      word.upcase
    else
      super
    end
  end
end`,
      hints: [
        'Always call super for methods you don\'t handle.',
        'Without super, all method calls would be silently swallowed.',
        'super raises NoMethodError for truly missing methods.',
      ],
      concepts: ['super', 'method_missing', 'NoMethodError'],
    },
    {
      id: 'rb-method-missing-6',
      title: 'public_send vs send',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to safely call only public methods.',
      skeleton: `class User
  def name
    "Alice"
  end

  private

  def secret
    "password123"
  end
end

u = User.new
puts u.___(___) # should call name safely`,
      solution: `class User
  def name
    "Alice"
  end

  private

  def secret
    "password123"
  end
end

u = User.new
puts u.public_send(:name) # should call name safely`,
      hints: [
        '`public_send` only calls public methods.',
        'It raises NoMethodError for private/protected methods.',
        'Use public_send instead of send for safety.',
      ],
      concepts: ['public_send', 'send', 'access-control'],
    },
    {
      id: 'rb-method-missing-7',
      title: 'Write a Proxy Object',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a LoggingProxy class that wraps any object and logs all method calls (printing "Calling: method_name") before delegating to the wrapped object.',
      skeleton: `# Write your LoggingProxy class`,
      solution: `class LoggingProxy
  def initialize(target)
    @target = target
  end

  def method_missing(name, *args, &block)
    puts "Calling: \#{name}"
    @target.send(name, *args, &block)
  end

  def respond_to_missing?(name, include_private = false)
    @target.respond_to?(name, include_private) || super
  end
end`,
      hints: [
        'Store the target object in an instance variable.',
        'In method_missing, log the method name then delegate.',
        'Forward all arguments and blocks to the target.',
      ],
      concepts: ['proxy-pattern', 'method_missing', 'delegation'],
    },
    {
      id: 'rb-method-missing-8',
      title: 'Write Dynamic Finders',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a UserStore class with @users array of hashes. Implement method_missing to handle find_by_X(value) where X is any key, returning matching users.',
      skeleton: `# Write your UserStore class`,
      solution: `class UserStore
  def initialize(users)
    @users = users
  end

  def method_missing(name, *args)
    if name.to_s.start_with?("find_by_")
      key = name.to_s.sub("find_by_", "").to_sym
      @users.select { |u| u[key] == args[0] }
    else
      super
    end
  end

  def respond_to_missing?(name, include_private = false)
    name.to_s.start_with?("find_by_") || super
  end
end`,
      hints: [
        'Check if the method name starts with "find_by_".',
        'Extract the key name from after the prefix.',
        'Filter @users where the key matches the argument.',
      ],
      concepts: ['dynamic-finders', 'method_missing', 'pattern-matching'],
    },
    {
      id: 'rb-method-missing-9',
      title: 'Write a BasicObject Proxy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a BlankSlate class inheriting from BasicObject that proxies all method calls to a target, counting how many times each method is called.',
      skeleton: `# Write your BlankSlate proxy class`,
      solution: `class BlankSlate < BasicObject
  def initialize(target)
    @target = target
    @counts = {}
  end

  def method_missing(name, *args, &block)
    @counts[name] = (@counts[name] || 0) + 1
    @target.__send__(name, *args, &block)
  end

  def call_counts
    @counts
  end
end`,
      hints: [
        'BasicObject has almost no methods, reducing conflicts.',
        'Use __send__ instead of send (BasicObject doesn\'t have send).',
        'Track call counts in a hash.',
      ],
      concepts: ['BasicObject', '__send__', 'method-counting'],
    },
    {
      id: 'rb-method-missing-10',
      title: 'Write a Lazy Attribute Loader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a LazyRecord class where method_missing checks if a matching loader method exists (load_X), calls it, caches the result as an instance variable, and returns it on subsequent calls.',
      skeleton: `# Write your LazyRecord class`,
      solution: `class LazyRecord
  def method_missing(name, *args)
    loader = "load_\#{name}"
    if respond_to?(loader, true)
      value = send(loader)
      instance_variable_set("@\#{name}", value)
      self.class.define_method(name) { instance_variable_get("@\#{name}") }
      value
    else
      super
    end
  end

  def respond_to_missing?(name, include_private = false)
    respond_to?("load_\#{name}", true) || super
  end
end`,
      hints: [
        'Check for a load_X method using respond_to?.',
        'Cache the result as an instance variable.',
        'Define the method dynamically for future calls.',
      ],
      concepts: ['lazy-loading', 'define_method', 'caching'],
    },
    {
      id: 'rb-method-missing-11',
      title: 'Write a Chainable Query Builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a Query class where calling any method name stores it as a condition (where_X(val) sets {X: val}). Return self for chaining. Add a conditions method to return all stored conditions.',
      skeleton: `# Write your Query class`,
      solution: `class Query
  def initialize
    @conditions = {}
  end

  def method_missing(name, *args)
    if name.to_s.start_with?("where_")
      key = name.to_s.sub("where_", "").to_sym
      @conditions[key] = args[0]
      self
    else
      super
    end
  end

  def respond_to_missing?(name, include_private = false)
    name.to_s.start_with?("where_") || super
  end

  def conditions
    @conditions
  end
end`,
      hints: [
        'Return self from each where_ method for chaining.',
        'Store conditions in a hash.',
        'Extract the field name from after "where_".',
      ],
      concepts: ['method-chaining', 'method_missing', 'builder-pattern'],
    },
    {
      id: 'rb-method-missing-12',
      title: 'Write Method Object Extraction',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method get_methods(obj, pattern) that returns an array of Method objects for all public methods matching the regex pattern.',
      skeleton: `# Write your get_methods function`,
      solution: `def get_methods(obj, pattern)
  obj.public_methods(false)
    .select { |name| name.to_s.match?(pattern) }
    .map { |name| obj.method(name) }
end`,
      hints: [
        'public_methods(false) returns only the object\'s own public methods.',
        'Filter method names by the regex pattern.',
        'obj.method(:name) returns a Method object.',
      ],
      concepts: ['method-objects', 'public_methods', 'introspection'],
    },
    {
      id: 'rb-method-missing-13',
      title: 'Fix Missing respond_to_missing?',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so that respond_to? returns true for dynamic methods.',
      skeleton: `class DynAttr
  def initialize(data = {})
    @data = data
  end

  def method_missing(name, *args)
    @data[name]
  end
end

d = DynAttr.new(name: "Alice")
puts d.name
puts d.respond_to?(:name)`,
      solution: `class DynAttr
  def initialize(data = {})
    @data = data
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
end

d = DynAttr.new(name: "Alice")
puts d.name
puts d.respond_to?(:name)`,
      hints: [
        'Without respond_to_missing?, respond_to? returns false.',
        'Always pair method_missing with respond_to_missing?.',
        'Also add super in method_missing for unhandled cases.',
      ],
      concepts: ['respond_to_missing?', 'protocol', 'common-bugs'],
    },
    {
      id: 'rb-method-missing-14',
      title: 'Fix Infinite Loop Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code to avoid infinite recursion in method_missing.',
      skeleton: `class Debug
  def method_missing(name, *args)
    puts "Method \#{name} called"
    self.handle(name, args)
  end
end

d = Debug.new
d.test`,
      solution: `class Debug
  def method_missing(name, *args)
    if name == :handle
      super
    else
      puts "Method \#{name} called"
    end
  end
end

d = Debug.new
d.test`,
      hints: [
        'Calling self.handle triggers method_missing again (infinite loop).',
        'Don\'t call undefined methods inside method_missing.',
        'Either define handle as a real method or remove the call.',
      ],
      concepts: ['infinite-recursion', 'method_missing', 'common-bugs'],
    },
    {
      id: 'rb-method-missing-15',
      title: 'Fix send Security Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code to prevent calling private methods from user input.',
      skeleton: `class Account
  def balance
    1000
  end

  private

  def secret_key
    "abc123"
  end
end

acc = Account.new
method_name = "secret_key"  # could come from user input
puts acc.send(method_name)`,
      solution: `class Account
  def balance
    1000
  end

  private

  def secret_key
    "abc123"
  end
end

acc = Account.new
method_name = "secret_key"  # could come from user input
puts acc.public_send(method_name)`,
      hints: [
        '`send` can call private methods, which is a security risk.',
        'Use `public_send` to only allow public method calls.',
        'This will raise NoMethodError for private methods.',
      ],
      concepts: ['public_send', 'security', 'access-control'],
    },
    {
      id: 'rb-method-missing-16',
      title: 'Predict method_missing Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `class Echo
  def method_missing(name, *args)
    name.to_s.upcase
  end
end

e = Echo.new
puts e.hello
puts e.world`,
      solution: `HELLO
WORLD`,
      hints: [
        'method_missing receives the method name as a symbol.',
        'to_s converts the symbol to a string.',
        'upcase returns the uppercased version.',
      ],
      concepts: ['method_missing', 'to_s', 'upcase'],
    },
    {
      id: 'rb-method-missing-17',
      title: 'Predict send Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `class Math
  def add(a, b) = a + b
end

m = Math.new
methods = [:add, :add, :add]
args = [[1, 2], [3, 4], [5, 6]]
results = methods.zip(args).map { |meth, a| m.send(meth, *a) }
puts results.inspect`,
      solution: `[3, 7, 11]`,
      hints: [
        'zip pairs methods with arguments.',
        'send calls each method with the paired arguments.',
        '1+2=3, 3+4=7, 5+6=11.',
      ],
      concepts: ['send', 'zip', 'dynamic-dispatch'],
    },
    {
      id: 'rb-method-missing-18',
      title: 'Predict respond_to? Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `class Magic
  def method_missing(name, *args)
    "magic"
  end
end

m = Magic.new
puts m.anything
puts m.respond_to?(:anything)`,
      solution: `magic
false`,
      hints: [
        'method_missing handles the call and returns "magic".',
        'Without respond_to_missing?, respond_to? returns false.',
        'This is why you should always implement respond_to_missing?.',
      ],
      concepts: ['respond_to?', 'respond_to_missing?', 'protocol'],
    },
    {
      id: 'rb-method-missing-19',
      title: 'Refactor method_missing to define_method',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor this method_missing approach to use define_method for better performance.',
      skeleton: `class Accessor
  def initialize(data)
    @data = data
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
end`,
      solution: `class Accessor
  def initialize(data)
    @data = data
    @data.each_key do |key|
      self.class.define_method(key) { @data[key] }
    end
  end
end`,
      hints: [
        'define_method creates real methods that are faster.',
        'Iterate over data keys and define a method for each.',
        'This eliminates the overhead of method_missing.',
      ],
      concepts: ['define_method', 'performance', 'refactoring'],
    },
    {
      id: 'rb-method-missing-20',
      title: 'Refactor Ghost Methods to Explicit',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor to replace method_missing with explicitly defined methods for known operations.',
      skeleton: `class Converter
  def method_missing(name, *args)
    case name
    when :to_upper
      args[0].upcase
    when :to_lower
      args[0].downcase
    when :to_title
      args[0].split.map(&:capitalize).join(" ")
    else
      super
    end
  end
end`,
      solution: `class Converter
  def to_upper(str)
    str.upcase
  end

  def to_lower(str)
    str.downcase
  end

  def to_title(str)
    str.split.map(&:capitalize).join(" ")
  end
end`,
      hints: [
        'When methods are known ahead of time, define them explicitly.',
        'Explicit methods are faster and easier to debug.',
        'method_missing should be reserved for truly dynamic cases.',
      ],
      concepts: ['explicit-methods', 'refactoring', 'performance'],
    },
  ],
};
