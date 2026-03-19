import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-methods',
  title: '08. Methods',
  explanation: `## Methods in Ruby

Methods are defined with \`def\` and implicitly return the last expression.

### Defining Methods

\`\`\`ruby
def greet(name)
  "Hello, \#{name}!"
end

# Explicit return
def absolute(n)
  return -n if n < 0
  n
end
\`\`\`

### Default Parameters

\`\`\`ruby
def greet(name, greeting = "Hello")
  "\#{greeting}, \#{name}!"
end
greet("Alice")           # => "Hello, Alice!"
greet("Alice", "Hi")     # => "Hi, Alice!"
\`\`\`

### Splat and Double Splat

\`\`\`ruby
# Splat: variable number of arguments
def sum(*numbers)
  numbers.reduce(0, :+)
end
sum(1, 2, 3)  # => 6

# Double splat: keyword arguments as hash
def configure(**options)
  options
end
configure(host: "localhost", port: 3000)
\`\`\`

### Keyword Arguments

\`\`\`ruby
def create_user(name:, email:, role: "member")
  { name: name, email: email, role: role }
end
create_user(name: "Alice", email: "a@b.c")
\`\`\`

### Bang and Question Methods

\`\`\`ruby
# ? methods return boolean
[1, 2, 3].include?(2)  # => true
"".empty?               # => true

# ! methods modify in place (dangerous)
arr = [3, 1, 2]
arr.sort!  # arr is now [1, 2, 3]
\`\`\``,
  exercises: [
    {
      id: 'rb-methods-1',
      title: 'Define a Simple Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Define a method called square that takes a number and returns its square.',
      skeleton: `___ square(n)
  n * n
___`,
      solution: `def square(n)
  n * n
end`,
      hints: [
        'Methods are defined with the def keyword.',
        'They end with the end keyword.',
        'Write def and end.',
      ],
      concepts: ['def', 'method-definition'],
    },
    {
      id: 'rb-methods-2',
      title: 'Default Parameter Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Add a default value of "World" for the name parameter.',
      skeleton: `def greet(name ___ "World")
  "Hello, \#{name}!"
end`,
      solution: `def greet(name = "World")
  "Hello, \#{name}!"
end`,
      hints: [
        'Default values use the = sign after the parameter name.',
        'Write name = "World".',
        'The default is used when no argument is passed.',
      ],
      concepts: ['default-parameters', 'method-definition'],
    },
    {
      id: 'rb-methods-3',
      title: 'Use Splat for Variable Arguments',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use the splat operator to accept any number of arguments.',
      skeleton: `def sum(___numbers)
  numbers.reduce(0, :+)
end`,
      solution: `def sum(*numbers)
  numbers.reduce(0, :+)
end`,
      hints: [
        'The splat operator * collects arguments into an array.',
        'Place * before the parameter name.',
        'Write *numbers.',
      ],
      concepts: ['splat-operator', 'variable-arguments'],
    },
    {
      id: 'rb-methods-4',
      title: 'Keyword Arguments',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Define a method using keyword arguments for name and age.',
      skeleton: `def describe_person(___:, ___:)
  "\#{name} is \#{age} years old"
end`,
      solution: `def describe_person(name:, age:)
  "\#{name} is \#{age} years old"
end`,
      hints: [
        'Keyword arguments have a colon after the name.',
        'Required keywords have just the colon: name:, age:.',
        'They must be passed by name when calling.',
      ],
      concepts: ['keyword-arguments', 'named-parameters'],
    },
    {
      id: 'rb-methods-5',
      title: 'Early Return',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use an early return to handle the nil case.',
      skeleton: `def process(value)
  ___ "nothing" if value.nil?
  value.to_s.upcase
end`,
      solution: `def process(value)
  return "nothing" if value.nil?
  value.to_s.upcase
end`,
      hints: [
        'The return keyword exits the method immediately.',
        'Combine with modifier if for a guard clause.',
        'Write return "nothing" if value.nil?.',
      ],
      concepts: ['return', 'guard-clause', 'early-return'],
    },
    {
      id: 'rb-methods-6',
      title: 'Question Mark Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Define a predicate method called positive? that returns true if n > 0.',
      skeleton: `def ___
  n > 0
end`,
      solution: `def positive?(n)
  n > 0
end`,
      hints: [
        'Predicate methods in Ruby end with ?.',
        'They conventionally return true or false.',
        'Write positive?(n).',
      ],
      concepts: ['predicate-methods', 'naming-conventions'],
    },
    {
      id: 'rb-methods-7',
      title: 'Write a Flexible Greeter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called greet that takes a required name keyword and an optional greeting keyword (default "Hello"). Return the formatted greeting string.',
      skeleton: `def greet(...)
  # Return "GREETING, NAME!"
end`,
      solution: `def greet(name:, greeting: "Hello")
  "\#{greeting}, \#{name}!"
end`,
      hints: [
        'Use keyword arguments with name: and greeting: "Hello".',
        'Required keywords have no default, optional ones do.',
        'Return the interpolated string.',
      ],
      concepts: ['keyword-arguments', 'default-parameters'],
    },
    {
      id: 'rb-methods-8',
      title: 'Write a Method with Splat and Keywords',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called log_message that takes a level keyword (default :info) and any number of message parts. Join the parts with spaces and return "[LEVEL] message". For example, log_message("Server", "started", level: :warn) returns "[WARN] Server started".',
      skeleton: `def log_message(...)
  # Return "[LEVEL] message parts joined"
end`,
      solution: `def log_message(*parts, level: :info)
  "[\#{level.to_s.upcase}] \#{parts.join(" ")}"
end`,
      hints: [
        'Splat (*parts) can come before keyword arguments.',
        'Use .to_s.upcase to format the level symbol.',
        'Join parts with .join(" ").',
      ],
      concepts: ['splat-operator', 'keyword-arguments', 'string-interpolation'],
    },
    {
      id: 'rb-methods-9',
      title: 'Write a Method Dispatcher',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called calculate that takes an operation symbol (:add, :subtract, :multiply, :divide) and two numbers. Return the result of the operation. Raise ArgumentError for unknown operations.',
      skeleton: `def calculate(operation, a, b)
  # Perform the operation
end`,
      solution: `def calculate(operation, a, b)
  case operation
  when :add then a + b
  when :subtract then a - b
  when :multiply then a * b
  when :divide then a.to_f / b
  else raise ArgumentError, "Unknown operation: \#{operation}"
  end
end`,
      hints: [
        'Use case/when to dispatch based on the operation symbol.',
        'For divide, convert to float to avoid integer division.',
        'Use raise to throw an error for unknown operations.',
      ],
      concepts: ['case-when', 'symbols', 'raise', 'dispatch'],
    },
    {
      id: 'rb-methods-10',
      title: 'Write a Memoized Method',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a method called expensive_compute that takes n. Use the ||= operator with an instance variable hash to cache results. Return n * n (simulating an expensive computation).',
      skeleton: `class Calculator
  def initialize
    @cache = {}
  end

  def expensive_compute(n)
    # Cache and return n * n
  end
end`,
      solution: `class Calculator
  def initialize
    @cache = {}
  end

  def expensive_compute(n)
    @cache[n] ||= n * n
  end
end`,
      hints: [
        '||= assigns only if the value is nil or false.',
        'Use @cache[n] ||= to memoize the result.',
        'The first call computes, subsequent calls return cached value.',
      ],
      concepts: ['memoization', 'or-equals', 'instance-variables'],
    },
    {
      id: 'rb-methods-11',
      title: 'Write a Method with Double Splat',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called build_url that takes a base_url string and any number of keyword arguments as query parameters. Return the URL with query string. For example, build_url("https://api.com", page: 1, limit: 10) returns "https://api.com?page=1&limit=10".',
      skeleton: `def build_url(base_url, **params)
  # Build URL with query string
end`,
      solution: `def build_url(base_url, **params)
  return base_url if params.empty?
  query = params.map { |k, v| "\#{k}=\#{v}" }.join("&")
  "\#{base_url}?\#{query}"
end`,
      hints: [
        '** collects keyword arguments into a hash.',
        'Map over the hash to create "key=value" pairs.',
        'Join with "&" and append to the base URL.',
      ],
      concepts: ['double-splat', 'hash-iteration', 'string-building'],
    },
    {
      id: 'rb-methods-12',
      title: 'Write a Bang Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a class called TextBuffer with an instance variable @text (string). Add a method capitalize_words! that modifies @text in place, capitalizing each word. Also add a text reader method.',
      skeleton: `class TextBuffer
  attr_reader :text

  def initialize(text)
    @text = text
  end

  def capitalize_words!
    # Modify @text in place
  end
end`,
      solution: `class TextBuffer
  attr_reader :text

  def initialize(text)
    @text = text
  end

  def capitalize_words!
    @text = @text.split.map(&:capitalize).join(" ")
    self
  end
end`,
      hints: [
        'Bang methods conventionally modify the object in place.',
        'Reassign @text with the capitalized version.',
        'Return self to allow method chaining.',
      ],
      concepts: ['bang-methods', 'in-place-modification', 'self'],
    },
    {
      id: 'rb-methods-13',
      title: 'Fix the Missing Return Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the method so it returns the computed value instead of printing it.',
      skeleton: `def add(a, b)
  puts a + b
end

result = add(3, 4)
puts "Result: \#{result}"
# Prints "7" then "Result: " (result is nil)`,
      solution: `def add(a, b)
  a + b
end

result = add(3, 4)
puts "Result: \#{result}"
# Prints "7" then "Result: " (result is nil)`,
      hints: [
        'puts prints to the console but returns nil.',
        'Remove puts to let the method return the value.',
        'Ruby returns the last expression implicitly.',
      ],
      concepts: ['implicit-return', 'puts-vs-return'],
    },
    {
      id: 'rb-methods-14',
      title: 'Fix the Keyword Argument Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the method call to use keyword arguments correctly.',
      skeleton: `def create_user(name:, email:, role: "member")
  { name: name, email: email, role: role }
end

user = create_user("Alice", "alice@example.com")`,
      solution: `def create_user(name:, email:, role: "member")
  { name: name, email: email, role: role }
end

user = create_user(name: "Alice", email: "alice@example.com")`,
      hints: [
        'Keyword arguments must be passed by name.',
        'Use name: "Alice", email: "alice@example.com".',
        'Positional arguments do not work with keyword parameters.',
      ],
      concepts: ['keyword-arguments', 'method-calling'],
    },
    {
      id: 'rb-methods-15',
      title: 'Fix the Splat Argument Order Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the parameter order. Required parameters must come before the splat.',
      skeleton: `def tag(*classes, name)
  "<\#{name} class='\#{classes.join(" ")}'>"
end

tag("btn", "primary", "button")
# Should produce: <button class='btn primary'>`,
      solution: `def tag(name, *classes)
  "<\#{name} class='\#{classes.join(" ")}'>"
end

tag("button", "btn", "primary")
# Should produce: <button class='btn primary'>`,
      hints: [
        'The splat parameter gobbles up all remaining positional arguments.',
        'Put required parameters before the splat.',
        'Swap the parameter order: name first, then *classes.',
      ],
      concepts: ['splat-operator', 'parameter-order'],
    },
    {
      id: 'rb-methods-16',
      title: 'Predict Implicit Return Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict the return value of this method.',
      skeleton: `def mystery(x)
  if x > 0
    "positive"
  elsif x < 0
    "negative"
  else
    "zero"
  end
end

puts mystery(0)
puts mystery(-5)`,
      solution: `zero
negative`,
      hints: [
        'Ruby returns the last evaluated expression.',
        'The if/elsif/else block is the last (and only) expression.',
        'mystery(0) returns "zero", mystery(-5) returns "negative".',
      ],
      concepts: ['implicit-return', 'if-elsif-else'],
    },
    {
      id: 'rb-methods-17',
      title: 'Predict Splat Behavior Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of this splat method.',
      skeleton: `def first_and_rest(first, *rest)
  puts first
  puts rest.inspect
end

first_and_rest("a", "b", "c", "d")`,
      solution: `a
["b", "c", "d"]`,
      hints: [
        'The first argument goes to first, the rest to *rest.',
        'rest is an array of the remaining arguments.',
        'first is "a", rest is ["b", "c", "d"].',
      ],
      concepts: ['splat-operator', 'parameter-binding'],
    },
    {
      id: 'rb-methods-18',
      title: 'Predict Default Parameter Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output when calling with and without defaults.',
      skeleton: `def power(base, exp = 2)
  base ** exp
end

puts power(3)
puts power(2, 10)`,
      solution: `9
1024`,
      hints: [
        'power(3) uses the default exp=2, so 3**2 = 9.',
        'power(2, 10) overrides the default, so 2**10 = 1024.',
        'Default values are used only when the argument is not provided.',
      ],
      concepts: ['default-parameters', 'exponentiation'],
    },
    {
      id: 'rb-methods-19',
      title: 'Refactor to Keyword Arguments',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the positional parameters to keyword arguments for better readability.',
      skeleton: `def create_rect(x, y, width, height, color = "black")
  { x: x, y: y, width: width, height: height, color: color }
end

rect = create_rect(10, 20, 100, 50, "red")`,
      solution: `def create_rect(x:, y:, width:, height:, color: "black")
  { x: x, y: y, width: width, height: height, color: color }
end

rect = create_rect(x: 10, y: 20, width: 100, height: 50, color: "red")`,
      hints: [
        'Keyword arguments make the call site self-documenting.',
        'Add colons after each parameter name.',
        'Update the call to use name: value syntax.',
      ],
      concepts: ['keyword-arguments', 'readability', 'refactoring'],
    },
    {
      id: 'rb-methods-20',
      title: 'Refactor Guard Clauses',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the deeply nested conditionals into guard clauses with early returns.',
      skeleton: `def process_order(order)
  if order
    if order[:items] && order[:items].length > 0
      if order[:payment]
        "Order processed"
      else
        "No payment"
      end
    else
      "No items"
    end
  else
    "No order"
  end
end`,
      solution: `def process_order(order)
  return "No order" unless order
  return "No items" unless order[:items]&.length&.> 0
  return "No payment" unless order[:payment]
  "Order processed"
end`,
      hints: [
        'Guard clauses flatten nested conditionals.',
        'Check error conditions first and return early.',
        'The happy path becomes the last line.',
      ],
      concepts: ['guard-clauses', 'early-return', 'refactoring'],
    },
  ],
};
