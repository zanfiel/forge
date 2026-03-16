import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-open-class',
  title: '23. Open Classes',
  explanation: `## Open Classes in Ruby

Ruby classes are **open** — you can reopen and modify any class at any time, including core classes like String, Array, and Integer.

\`\`\`ruby
# Reopening a class
class String
  def shout
    upcase + "!!!"
  end
end

"hello".shout  # => "HELLO!!!"

# Monkey patching (adding/changing methods on existing classes)
class Integer
  def factorial
    return 1 if self <= 1
    self * (self - 1).factorial
  end
end

5.factorial  # => 120
\`\`\`

### Refinements (Safe Alternative)

\`\`\`ruby
module StringExtensions
  refine String do
    def shout
      upcase + "!!!"
    end
  end
end

# Only active where explicitly used
using StringExtensions
"hello".shout  # => "HELLO!!!"
\`\`\`

### Key Concepts

- Any class can be **reopened** and modified
- **Monkey patching** = modifying existing classes (use sparingly!)
- **Refinements** (\`refine\`/\`using\`) limit scope of changes
- Core extensions should use refinements for safety
- Rails' ActiveSupport is a famous example of (careful) monkey patching`,
  exercises: [
    {
      id: 'rb-open-class-1',
      title: 'Reopen a Class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to add a word_count method to String.',
      skeleton: `___ String
  def word_count
    split.length
  end
end

puts "hello beautiful world".word_count`,
      solution: `class String
  def word_count
    split.length
  end
end

puts "hello beautiful world".word_count`,
      hints: [
        'Use `class String` to reopen the String class.',
        'No inheritance syntax needed when reopening.',
        'The new method is available on all strings.',
      ],
      concepts: ['open-classes', 'monkey-patching', 'String'],
    },
    {
      id: 'rb-open-class-2',
      title: 'Add Method to Integer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to add an even_or_odd method to Integer.',
      skeleton: `class ___
  def even_or_odd
    even? ? "even" : "odd"
  end
end

puts 42.even_or_odd`,
      solution: `class Integer
  def even_or_odd
    even? ? "even" : "odd"
  end
end

puts 42.even_or_odd`,
      hints: [
        'Reopen the Integer class.',
        'Use the existing even? predicate method.',
        'Return a string based on the result.',
      ],
      concepts: ['open-classes', 'Integer', 'predicate-methods'],
    },
    {
      id: 'rb-open-class-3',
      title: 'Define a Refinement',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blanks to define and use a refinement.',
      skeleton: `module StringExtras
  ___ String do
    def palindrome?
      self == reverse
    end
  end
end

___ StringExtras
puts "racecar".palindrome?`,
      solution: `module StringExtras
  refine String do
    def palindrome?
      self == reverse
    end
  end
end

using StringExtras
puts "racecar".palindrome?`,
      hints: [
        '`refine ClassName do` defines a refinement.',
        '`using ModuleName` activates the refinement.',
        'Refinements are scoped to the file or class where `using` is called.',
      ],
      concepts: ['refine', 'using', 'refinements'],
    },
    {
      id: 'rb-open-class-4',
      title: 'Alias a Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to alias the old method before overriding.',
      skeleton: `class Array
  ___ :original_length, :length

  def length
    puts "Length called!"
    original_length
  end
end`,
      solution: `class Array
  alias_method :original_length, :length

  def length
    puts "Length called!"
    original_length
  end
end`,
      hints: [
        '`alias_method` saves a reference to the original method.',
        'First argument is the new name, second is the existing name.',
        'This lets you wrap or modify existing behavior safely.',
      ],
      concepts: ['alias_method', 'method-wrapping', 'open-classes'],
    },
    {
      id: 'rb-open-class-5',
      title: 'Reopen Your Own Class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to add a method to an existing class in a separate reopening.',
      skeleton: `class Dog
  def bark
    "Woof!"
  end
end

# Later in code...
___ Dog
  def sit
    "Sitting!"
  end
end

d = Dog.new
puts d.bark
puts d.sit`,
      solution: `class Dog
  def bark
    "Woof!"
  end
end

# Later in code...
class Dog
  def sit
    "Sitting!"
  end
end

d = Dog.new
puts d.bark
puts d.sit`,
      hints: [
        'Just use `class Dog` again to reopen.',
        'Existing methods are preserved.',
        'New methods are added to the class.',
      ],
      concepts: ['reopening', 'open-classes', 'additive'],
    },
    {
      id: 'rb-open-class-6',
      title: 'Refinement Scope',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to use a refinement only within a specific class.',
      skeleton: `module ArrayStats
  refine Array do
    def average
      sum.to_f / length
    end
  end
end

class Report
  ___ ArrayStats

  def mean(data)
    data.average
  end
end`,
      solution: `module ArrayStats
  refine Array do
    def average
      sum.to_f / length
    end
  end
end

class Report
  using ArrayStats

  def mean(data)
    data.average
  end
end`,
      hints: [
        '`using` can be placed inside a class definition.',
        'The refinement is only active within that class.',
        'Outside Report, .average is not available.',
      ],
      concepts: ['refinements', 'scoped-using', 'encapsulation'],
    },
    {
      id: 'rb-open-class-7',
      title: 'Write a String Extension',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Add a truncate(length, omission = "...") method to String that truncates to the given length and appends the omission if truncated.',
      skeleton: `# Write your String extension`,
      solution: `class String
  def truncate(length, omission = "...")
    if self.length > length
      self[0...(length - omission.length)] + omission
    else
      self
    end
  end
end`,
      hints: [
        'Check if the string length exceeds the limit.',
        'Slice to (length - omission.length) characters.',
        'Append the omission string.',
      ],
      concepts: ['open-classes', 'String', 'truncation'],
    },
    {
      id: 'rb-open-class-8',
      title: 'Write an Array Extension',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Add a second, third, and rest method to Array. second returns element at index 1, third at index 2, rest returns all but the first.',
      skeleton: `# Write your Array extensions`,
      solution: `class Array
  def second
    self[1]
  end

  def third
    self[2]
  end

  def rest
    self[1..]
  end
end`,
      hints: [
        'Reopen the Array class.',
        'Use self[index] to access elements.',
        'self[1..] returns from index 1 to the end.',
      ],
      concepts: ['open-classes', 'Array', 'convenience-methods'],
    },
    {
      id: 'rb-open-class-9',
      title: 'Write a Refinement Module',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a refinement module NumericFormatting that adds to_currency to Numeric, returning a string like "$1,234.56".',
      skeleton: `# Write your NumericFormatting refinement`,
      solution: `module NumericFormatting
  refine Numeric do
    def to_currency
      whole = to_i.to_s.reverse.scan(/.{1,3}/).join(",").reverse
      "$\#{whole}.\#{format('%02d', ((self * 100).to_i % 100).abs)}"
    end
  end
end`,
      hints: [
        'Use refine Numeric do ... end.',
        'Format with thousand separators and two decimal places.',
        'Prepend "$" to the result.',
      ],
      concepts: ['refinements', 'Numeric', 'formatting'],
    },
    {
      id: 'rb-open-class-10',
      title: 'Write a Hash Extension',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Add a slice(*keys) method to Hash that returns a new hash containing only the specified keys (like Rails\' Hash#slice for older Ruby).',
      skeleton: `# Write your Hash extension`,
      solution: `class Hash
  def slice(*keys)
    keys.each_with_object({}) do |k, h|
      h[k] = self[k] if key?(k)
    end
  end
end`,
      hints: [
        'Iterate over the requested keys.',
        'Include only keys that exist in the hash.',
        'Return a new hash, not a modified copy.',
      ],
      concepts: ['open-classes', 'Hash', 'filtering'],
    },
    {
      id: 'rb-open-class-11',
      title: 'Write a Safe Core Extension',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a module CoreExtensions with a refinement that adds blank? to String (true if nil, empty, or whitespace only) and present? (opposite of blank?).',
      skeleton: `# Write your CoreExtensions refinement module`,
      solution: `module CoreExtensions
  refine String do
    def blank?
      strip.empty?
    end

    def present?
      !blank?
    end
  end

  refine NilClass do
    def blank?
      true
    end

    def present?
      false
    end
  end
end`,
      hints: [
        'blank? checks if string is empty after stripping whitespace.',
        'present? is the opposite of blank?.',
        'Also refine NilClass so nil.blank? returns true.',
      ],
      concepts: ['refinements', 'blank?', 'present?'],
    },
    {
      id: 'rb-open-class-12',
      title: 'Write a Method Override with Alias',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write code that reopens String to add logging to the upcase method. Use alias_method to preserve the original, then override upcase to print "upcasing!" before calling the original.',
      skeleton: `# Write your upcase override with alias`,
      solution: `class String
  alias_method :original_upcase, :upcase

  def upcase
    puts "upcasing!"
    original_upcase
  end
end`,
      hints: [
        'alias_method creates a backup of the original.',
        'Override the method and call the alias inside.',
        'This is a common pattern for wrapping behavior.',
      ],
      concepts: ['alias_method', 'method-wrapping', 'open-classes'],
    },
    {
      id: 'rb-open-class-13',
      title: 'Fix Monkey Patch Override',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so the monkey patch adds to Array without breaking existing methods.',
      skeleton: `class Array
  def to_s
    "Custom: [" + join(", ") + "]"
  end
end

arr = [1, 2, 3]
puts arr.to_s
puts arr.inspect
# Problem: to_s is overridden globally`,
      solution: `module CustomArrayFormat
  refine Array do
    def to_formatted_s
      "Custom: [" + join(", ") + "]"
    end
  end
end

using CustomArrayFormat

arr = [1, 2, 3]
puts arr.to_formatted_s
puts arr.inspect`,
      hints: [
        'Overriding to_s globally can break other code.',
        'Use a refinement with a different method name.',
        'This keeps the change scoped and safe.',
      ],
      concepts: ['refinements', 'safe-patching', 'naming'],
    },
    {
      id: 'rb-open-class-14',
      title: 'Fix Refinement Scope Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so the refinement is active in the method.',
      skeleton: `module StringHelpers
  refine String do
    def shout
      upcase + "!!!"
    end
  end
end

def yell(text)
  text.shout
end

using StringHelpers
puts yell("hello")`,
      solution: `module StringHelpers
  refine String do
    def shout
      upcase + "!!!"
    end
  end
end

using StringHelpers

def yell(text)
  text.shout
end

puts yell("hello")`,
      hints: [
        '`using` must appear before the method definition.',
        'Refinements are lexically scoped.',
        'Move `using` before the method that uses the refinement.',
      ],
      concepts: ['refinement-scope', 'lexical-scoping', 'common-bugs'],
    },
    {
      id: 'rb-open-class-15',
      title: 'Fix Class Reopening Clobber',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the code so the second class definition does not remove the first method.',
      skeleton: `class Helper
  def greet
    "Hello!"
  end
end

class Helper < Object
  def farewell
    "Goodbye!"
  end
end

h = Helper.new
puts h.greet
puts h.farewell`,
      solution: `class Helper
  def greet
    "Hello!"
  end
end

class Helper
  def farewell
    "Goodbye!"
  end
end

h = Helper.new
puts h.greet
puts h.farewell`,
      hints: [
        'Specifying `< Object` in a reopening can cause a TypeError.',
        'When reopening, omit the inheritance declaration.',
        'Just use `class Helper` to add methods.',
      ],
      concepts: ['reopening', 'inheritance-declaration', 'TypeError'],
    },
    {
      id: 'rb-open-class-16',
      title: 'Predict Open Class Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `class Foo
  def hello
    "v1"
  end
end

class Foo
  def hello
    "v2"
  end
end

puts Foo.new.hello`,
      solution: `v2`,
      hints: [
        'Reopening a class and redefining a method replaces it.',
        'The second definition of hello overwrites the first.',
        'Only one version of the method exists.',
      ],
      concepts: ['open-classes', 'method-overwrite', 'reopening'],
    },
    {
      id: 'rb-open-class-17',
      title: 'Predict Refinement Scope',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `module Ext
  refine String do
    def excited
      self + "!"
    end
  end
end

class A
  using Ext

  def test
    "hello".excited
  end
end

puts A.new.test
begin
  puts "world".excited
rescue NoMethodError
  puts "no method"
end`,
      solution: `hello!
no method`,
      hints: [
        'Refinements used inside class A only apply there.',
        'Outside A, the refinement is not active.',
        '"world".excited raises NoMethodError.',
      ],
      concepts: ['refinement-scope', 'NoMethodError', 'lexical-scoping'],
    },
    {
      id: 'rb-open-class-18',
      title: 'Predict Monkey Patch Effect',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `class Integer
  def to_s
    "number"
  end
end

puts 42.to_s
puts 42.inspect`,
      solution: `number
42`,
      hints: [
        'to_s is overridden to always return "number".',
        'inspect is NOT overridden, so it still works normally.',
        'Monkey patching only affects the methods you change.',
      ],
      concepts: ['monkey-patching', 'to_s', 'inspect'],
    },
    {
      id: 'rb-open-class-19',
      title: 'Refactor Monkey Patch to Refinement',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the global monkey patch to use a refinement for safety.',
      skeleton: `class String
  def to_bool
    case downcase.strip
    when "true", "yes", "1"
      true
    else
      false
    end
  end
end

puts "true".to_bool
puts "no".to_bool`,
      solution: `module StringBoolean
  refine String do
    def to_bool
      case downcase.strip
      when "true", "yes", "1"
        true
      else
        false
      end
    end
  end
end

using StringBoolean

puts "true".to_bool
puts "no".to_bool`,
      hints: [
        'Wrap the method in a refinement module.',
        'Use `using` to activate it where needed.',
        'This prevents global pollution of the String class.',
      ],
      concepts: ['refinements', 'refactoring', 'safe-patching'],
    },
    {
      id: 'rb-open-class-20',
      title: 'Refactor Global Extension to Scoped',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor to limit the Array extension to only the DataProcessor class.',
      skeleton: `class Array
  def mean
    sum.to_f / length
  end

  def median
    sorted = sort
    mid = length / 2
    length.odd? ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2.0
  end
end

class DataProcessor
  def analyze(data)
    { mean: data.mean, median: data.median }
  end
end`,
      solution: `module StatsMethods
  refine Array do
    def mean
      sum.to_f / length
    end

    def median
      sorted = sort
      mid = length / 2
      length.odd? ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2.0
    end
  end
end

class DataProcessor
  using StatsMethods

  def analyze(data)
    { mean: data.mean, median: data.median }
  end
end`,
      hints: [
        'Move the Array methods into a refinement module.',
        'Use `using` inside DataProcessor only.',
        'Other code won\'t see mean/median on Array.',
      ],
      concepts: ['refinements', 'scoped-extension', 'refactoring'],
    },
  ],
};
