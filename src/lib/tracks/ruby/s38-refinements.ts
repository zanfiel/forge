import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-refine',
  title: '38. Refinements',
  explanation: `## Refinements in Ruby

Refinements provide a way to safely extend classes with limited scope, avoiding the global effects of monkey patching.

### Basic Refinement

\`\`\`ruby
module StringExtras
  refine String do
    def shout
      upcase + "!!!"
    end
  end
end

# Without using the refinement
"hello".shout rescue puts "NoMethodError"

# With the refinement
using StringExtras
puts "hello".shout  # => "HELLO!!!"
\`\`\`

### Lexical Scope

\`\`\`ruby
module MyRefine
  refine Integer do
    def positive?
      self > 0
    end
  end
end

class Calculator
  using MyRefine  # only active in this class

  def check(n)
    n.positive?   # works here
  end
end

# 5.positive? would NOT work outside Calculator
\`\`\`

### Refining with Module

\`\`\`ruby
module Logging
  refine Object do
    def log(msg)
      puts "[LOG] \#{msg}"
    end
  end
end
\`\`\`

### Important Restrictions

- Refinements are lexically scoped (active only in the file/class where \`using\` is called)
- They do NOT propagate to subclasses or mixed-in modules
- Cannot be discovered via \`respond_to?\` from outside the scope
- \`using\` must be at the top level or inside a class/module body`,
  exercises: [
    {
      id: 'rb-refine-1',
      title: 'Basic Refinement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Define a basic refinement.',
      skeleton: `module StringColors
  ___ String do
    def red
      "\\e[31m\\\#{self}\\e[0m"
    end
  end
end

___ StringColors
puts "error".red`,
      solution: `module StringColors
  refine String do
    def red
      "\\e[31m\\\#{self}\\e[0m"
    end
  end
end

using StringColors
puts "error".red`,
      hints: ['refine ClassName do...end defines a refinement', 'using ModuleName activates it', 'The refinement only applies after using is called'],
      concepts: ['refine', 'using'],
    },
    {
      id: 'rb-refine-2',
      title: 'Refine Integer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Refine Integer with a new method.',
      skeleton: `module IntegerExtras
  refine ___ do
    def factorial
      return 1 if self <= 1
      self * (self - 1).factorial
    end
  end
end

using IntegerExtras
puts 5.___`,
      solution: `module IntegerExtras
  refine Integer do
    def factorial
      return 1 if self <= 1
      self * (self - 1).factorial
    end
  end
end

using IntegerExtras
puts 5.factorial`,
      hints: ['Refine the Integer class', 'self refers to the integer value', 'Recursive factorial calls work within the refinement'],
      concepts: ['refine_integer'],
    },
    {
      id: 'rb-refine-3',
      title: 'Lexical Scope',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Demonstrate lexical scoping of refinements.',
      skeleton: `module Shoutable
  refine String do
    def shout
      upcase + "!"
    end
  end
end

class Greeter
  ___ Shoutable

  def greet(name)
    "hello \\\#{name}".shout
  end
end

puts Greeter.new.greet("world")`,
      solution: `module Shoutable
  refine String do
    def shout
      upcase + "!"
    end
  end
end

class Greeter
  using Shoutable

  def greet(name)
    "hello \\\#{name}".shout
  end
end

puts Greeter.new.greet("world")`,
      hints: ['using inside a class limits the refinement to that class', 'Methods outside the class cannot use shout', 'This is the key advantage over monkey patching'],
      concepts: ['lexical_scope'],
    },
    {
      id: 'rb-refine-4',
      title: 'Refine Array',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Add a method to Array via refinement.',
      skeleton: `module ArrayStats
  refine Array do
    def ___
      return 0.0 if empty?
      sum.to_f / size
    end
  end
end

using ArrayStats
puts [10, 20, 30].average`,
      solution: `module ArrayStats
  refine Array do
    def average
      return 0.0 if empty?
      sum.to_f / size
    end
  end
end

using ArrayStats
puts [10, 20, 30].average`,
      hints: ['Define the method name in the refine block', 'self is the array instance', 'sum and size are existing Array methods'],
      concepts: ['refine_array'],
    },
    {
      id: 'rb-refine-5',
      title: 'Multiple Refinements',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Define refinements for multiple classes in one module.',
      skeleton: `module Extras
  refine String do
    def palindrome?
      self == ___.___
    end
  end

  refine Array do
    def second
      self[1]
    end
  end
end

using Extras
puts "racecar".palindrome?
puts [1, 2, 3].second`,
      solution: `module Extras
  refine String do
    def palindrome?
      self == self.reverse
    end
  end

  refine Array do
    def second
      self[1]
    end
  end
end

using Extras
puts "racecar".palindrome?
puts [1, 2, 3].second`,
      hints: ['One module can contain multiple refine blocks', 'Each refine block extends a different class', 'using activates all refinements in the module'],
      concepts: ['multiple_refinements'],
    },
    {
      id: 'rb-refine-6',
      title: 'Override Existing Method',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Override an existing method safely via refinement.',
      skeleton: `module SafeDiv
  ___ Integer do
    def /(other)
      return 0 if other == 0
      super
    end
  end
end

using SafeDiv
puts 10 / 0   # 0 instead of ZeroDivisionError
puts 10 / 3   # 3 (normal behavior)`,
      solution: `module SafeDiv
  refine Integer do
    def /(other)
      return 0 if other == 0
      super
    end
  end
end

using SafeDiv
puts 10 / 0   # 0 instead of ZeroDivisionError
puts 10 / 3   # 3 (normal behavior)`,
      hints: ['Refinements can override existing methods', 'super calls the original method', 'This only affects code using the refinement'],
      concepts: ['override_method', 'super_in_refinement'],
    },
    {
      id: 'rb-refine-7',
      title: 'Write JSON Refinement',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a refinement that adds JSON conversion methods.',
      skeleton: `require 'json'

# Write a JsonMethods module with refinements:
# - refine Hash: add to_json_pretty (JSON.pretty_generate)
# - refine String: add parse_json (JSON.parse)
# Use both in a class
`,
      solution: `require 'json'

module JsonMethods
  refine Hash do
    def to_json_pretty
      JSON.pretty_generate(self)
    end
  end

  refine String do
    def parse_json
      JSON.parse(self, symbolize_names: true)
    end
  end
end

class DataProcessor
  using JsonMethods

  def process(json_str)
    data = json_str.parse_json
    data[:processed] = true
    data.to_json_pretty
  end
end

result = DataProcessor.new.process('{"name": "Alice", "age": 30}')
puts result`,
      hints: ['Refine Hash and String in the same module', 'Delegate to JSON methods', 'Only the class using the refinement has access'],
      concepts: ['json_refinement'],
    },
    {
      id: 'rb-refine-8',
      title: 'Write Logging Refinement',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a refinement that adds logging to any object.',
      skeleton: `# Write a Loggable module that refines Object:
# - debug(msg) prints "[DEBUG] ClassName: msg"
# - info(msg) prints "[INFO] ClassName: msg"
# - warn(msg) prints "[WARN] ClassName: msg"
# Use it in a service class
`,
      solution: `module Loggable
  refine Object do
    def debug(msg)
      puts "[DEBUG] \\\#{self.class}: \\\#{msg}"
    end

    def info(msg)
      puts "[INFO] \\\#{self.class}: \\\#{msg}"
    end

    def warn(msg)
      puts "[WARN] \\\#{self.class}: \\\#{msg}"
    end
  end
end

class OrderService
  using Loggable

  def process(order_id)
    debug "Processing order \\\#{order_id}"
    info "Order \\\#{order_id} completed"
  end
end

OrderService.new.process(42)`,
      hints: ['Refining Object makes methods available everywhere within scope', 'self.class gives the name of the calling class', 'This is a safe alternative to monkey-patching Object'],
      concepts: ['refine_object', 'logging'],
    },
    {
      id: 'rb-refine-9',
      title: 'Write Numeric Formatting Refinement',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a refinement for formatting numbers.',
      skeleton: `# Write a NumericFormat module with:
# - refine Integer: to_currency("$") returns "$1,234"
# - refine Float: to_percent returns "85.50%"
# - refine Integer: to_ordinal returns "1st", "2nd", "3rd", "4th", etc.
`,
      solution: `module NumericFormat
  refine Integer do
    def to_currency(symbol = "$")
      "\\\#{symbol}\\\#{self.to_s.reverse.gsub(/(\\d{3})(?=\\d)/, '\\\\1,').reverse}"
    end

    def to_ordinal
      suffix = case self % 100
               when 11, 12, 13 then "th"
               else
                 case self % 10
                 when 1 then "st"
                 when 2 then "nd"
                 when 3 then "rd"
                 else "th"
                 end
               end
      "\\\#{self}\\\#{suffix}"
    end
  end

  refine Float do
    def to_percent
      "\\\#{format('%.2f', self)}%"
    end
  end
end

using NumericFormat
puts 1234567.to_currency
puts 85.5.to_percent
puts 1.to_ordinal
puts 2.to_ordinal
puts 13.to_ordinal`,
      hints: ['Handle comma insertion with gsub on reversed string', 'Ordinals have special cases for 11th, 12th, 13th', 'format("%.2f") gives 2 decimal places'],
      concepts: ['numeric_formatting', 'refinement'],
    },
    {
      id: 'rb-refine-10',
      title: 'Write Chainable Refinement',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a refinement that adds method chaining to Hash.',
      skeleton: `# Write a HashChain module that refines Hash:
# - except(*keys) returns hash without those keys
# - only(*keys) returns hash with only those keys
# - transform_keys_to_strings converts symbol keys to strings
# - rename_key(old, new) renames a key
`,
      solution: `module HashChain
  refine Hash do
    def except(*keys)
      reject { |k, _| keys.include?(k) }
    end

    def only(*keys)
      select { |k, _| keys.include?(k) }
    end

    def transform_keys_to_strings
      transform_keys(&:to_s)
    end

    def rename_key(old_key, new_key)
      return self unless key?(old_key)
      h = dup
      h[new_key] = h.delete(old_key)
      h
    end
  end
end

using HashChain
data = { name: "Alice", age: 30, email: "a@b.com", role: "admin" }
puts data.only(:name, :email).inspect
puts data.except(:role).inspect
puts data.rename_key(:name, :full_name).inspect`,
      hints: ['Each method returns a new or modified hash', 'reject/select with key inclusion check', 'delete returns the removed value'],
      concepts: ['hash_refinement', 'chainable_methods'],
    },
    {
      id: 'rb-refine-11',
      title: 'Write Testing Refinement',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a refinement for quick assertion-like methods.',
      skeleton: `# Write an Assertable module that refines Object:
# - must_equal(expected) raises unless self == expected
# - must_be_kind_of(klass) raises unless self.is_a?(klass)
# - must_respond_to(method) raises unless self.respond_to?(method)
# Each raises RuntimeError with a descriptive message
`,
      solution: `module Assertable
  refine Object do
    def must_equal(expected)
      unless self == expected
        raise "Expected \\\#{expected.inspect}, got \\\#{self.inspect}"
      end
      self
    end

    def must_be_kind_of(klass)
      unless is_a?(klass)
        raise "Expected kind of \\\#{klass}, got \\\#{self.class}"
      end
      self
    end

    def must_respond_to(method)
      unless respond_to?(method)
        raise "\\\#{self.class} does not respond to \\\#{method}"
      end
      self
    end
  end
end

using Assertable

"hello".must_be_kind_of(String).must_respond_to(:upcase)
5.must_equal(5)

begin
  10.must_equal(20)
rescue RuntimeError => e
  puts e.message
end`,
      hints: ['Return self from each method to enable chaining', 'Raise RuntimeError with a descriptive message', 'These are like minitest expectations via refinement'],
      concepts: ['assertion_refinement', 'method_chaining'],
    },
    {
      id: 'rb-refine-12',
      title: 'Write Import Refinement Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a module with selectable refinements.',
      skeleton: `# Write a TextProcessing module with two sub-modules:
# - Sanitize: refines String with strip_html and strip_whitespace
# - Transform: refines String with snake_case and camel_case
# Users can choose which refinement set to use
`,
      solution: `module TextProcessing
  module Sanitize
    refine String do
      def strip_html
        gsub(/<[^>]*>/, "")
      end

      def strip_whitespace
        gsub(/\\s+/, " ").strip
      end
    end
  end

  module Transform
    refine String do
      def snake_case
        gsub(/([A-Z])/, '_\\1').downcase.sub(/^_/, "")
      end

      def camel_case
        split("_").map(&:capitalize).join
      end
    end
  end
end

class Cleaner
  using TextProcessing::Sanitize
  def clean(text)
    text.strip_html.strip_whitespace
  end
end

class Converter
  using TextProcessing::Transform
  def convert(text)
    text.snake_case
  end
end

puts Cleaner.new.clean("<b>Hello</b>   World")
puts Converter.new.convert("HelloWorld")`,
      hints: ['Nest refinement modules inside a parent module', 'Each sub-module has its own refine block', 'Users select which refinements they need with using'],
      concepts: ['selective_refinements', 'module_organization'],
    },
    {
      id: 'rb-refine-13',
      title: 'Fix Refinement Scope',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the refinement that is not active where expected.',
      skeleton: `module Titleize
  refine String do
    def titleize
      split(" ").map(&:capitalize).join(" ")
    end
  end
end

def format_name(name)
  name.titleize  # NoMethodError!
end

using Titleize
puts format_name("john doe")`,
      solution: `module Titleize
  refine String do
    def titleize
      split(" ").map(&:capitalize).join(" ")
    end
  end
end

using Titleize

def format_name(name)
  name.titleize
end

puts format_name("john doe")`,
      hints: ['using must be called BEFORE the method that uses the refinement', 'Refinements are lexically scoped', 'Move using before the method definition'],
      concepts: ['refinement_scope_order'],
    },
    {
      id: 'rb-refine-14',
      title: 'Fix Indirect Refinement Call',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Fix the refinement that does not work through indirection.',
      skeleton: `module StringExt
  refine String do
    def excited
      self + "!!!"
    end
  end
end

using StringExt

# Bug: send bypasses refinement dispatch
puts "hello".send(:excited)  # NoMethodError`,
      solution: `module StringExt
  refine String do
    def excited
      self + "!!!"
    end
  end
end

using StringExt

# Call directly instead of through send
puts "hello".excited`,
      hints: ['Refinements are not visible through send or method dispatch', 'Dynamic dispatch like send, respond_to? bypass refinements', 'Call the method directly for refinements to work'],
      concepts: ['refinement_limitations', 'dynamic_dispatch'],
    },
    {
      id: 'rb-refine-15',
      title: 'Fix Refinement in Block',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Fix the refinement that does not work in a block.',
      skeleton: `module Pluralize
  refine String do
    def pluralize
      self + "s"
    end
  end
end

class Formatter
  using Pluralize

  def format_list(words)
    words.map { |w| w.pluralize }
  end
end

# This works because the block is defined within the class scope
puts Formatter.new.format_list(["cat", "dog"]).inspect

# But this does not work outside
mapper = Proc.new { |w| w.pluralize }
# puts ["cat", "dog"].map(&mapper)  # NoMethodError`,
      solution: `module Pluralize
  refine String do
    def pluralize
      self + "s"
    end
  end
end

using Pluralize

mapper = Proc.new { |w| w.pluralize }
puts ["cat", "dog"].map(&mapper).inspect`,
      hints: ['The Proc must be defined within the refinement scope', 'using Pluralize must be active where the Proc is created', 'Move using to the file scope before the Proc'],
      concepts: ['refinement_in_blocks'],
    },
    {
      id: 'rb-refine-16',
      title: 'Predict Refinement Scope',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict where the refinement is active.',
      skeleton: `module Ext
  refine String do
    def greet
      "Hi, \\\#{self}!"
    end
  end
end

class A
  using Ext
  def call
    "world".greet
  end
end

class B
  def call
    "world".greet
  end
end

puts A.new.call
begin
  B.new.call
rescue NoMethodError
  puts "NoMethodError in B"
end`,
      solution: `Hi, world!
NoMethodError in B`,
      hints: ['Class A uses the refinement, Class B does not', 'Refinements are lexically scoped to where using is called', 'B has no using statement so greet is undefined'],
      concepts: ['lexical_scoping'],
    },
    {
      id: 'rb-refine-17',
      title: 'Predict Refinement vs Monkey Patch',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the interaction between refinement and monkey patch.',
      skeleton: `class String
  def shout
    upcase + "!!"
  end
end

module BetterShout
  refine String do
    def shout
      upcase + "!!!"
    end
  end
end

puts "hello".shout

class Test
  using BetterShout
  puts "hello".shout
end

puts "hello".shout`,
      solution: `HELLO!!
HELLO!!!
HELLO!!`,
      hints: ['The monkey patch adds shout globally with "!!"', 'The refinement overrides it to "!!!" only within Test', 'Outside Test, the monkey patch version is used'],
      concepts: ['refinement_priority'],
    },
    {
      id: 'rb-refine-18',
      title: 'Predict respond_to with Refinement',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Predict respond_to? behavior with refinements.',
      skeleton: `module Ext
  refine String do
    def custom_method
      "custom"
    end
  end
end

using Ext

puts "test".custom_method
puts "test".respond_to?(:custom_method)`,
      solution: `custom
false`,
      hints: ['The method works when called directly', 'respond_to? does NOT see refinement methods', 'This is a known limitation of refinements'],
      concepts: ['respond_to_limitation'],
    },
    {
      id: 'rb-refine-19',
      title: 'Refactor Monkey Patch to Refinement',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor a monkey patch to use refinements.',
      skeleton: `# Monkey patch - affects ALL code globally
class Array
  def mean
    sum.to_f / size
  end

  def median
    sorted = sort
    mid = size / 2
    size.odd? ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2.0
  end
end

puts [1, 2, 3, 4, 5].mean
puts [1, 2, 3, 4, 5].median`,
      solution: `module ArrayStatistics
  refine Array do
    def mean
      sum.to_f / size
    end

    def median
      sorted = sort
      mid = size / 2
      size.odd? ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2.0
    end
  end
end

using ArrayStatistics
puts [1, 2, 3, 4, 5].mean
puts [1, 2, 3, 4, 5].median`,
      hints: ['Move the methods into a refine block inside a module', 'Add using to activate where needed', 'The behavior is identical but scoped'],
      concepts: ['monkey_patch_to_refinement'],
    },
    {
      id: 'rb-refine-20',
      title: 'Refactor Global Extension to Scoped',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Refactor a globally-extended class to use scoped refinements.',
      skeleton: `# Global - every Hash in the app gets these methods
class Hash
  def stringify_keys
    transform_keys(&:to_s)
  end

  def symbolize_keys
    transform_keys(&:to_sym)
  end

  def deep_merge(other)
    merge(other) do |_key, old_val, new_val|
      if old_val.is_a?(Hash) && new_val.is_a?(Hash)
        old_val.deep_merge(new_val)
      else
        new_val
      end
    end
  end
end

puts({ a: 1, b: 2 }.stringify_keys.inspect)`,
      solution: `module HashUtils
  refine Hash do
    def stringify_keys
      transform_keys(&:to_s)
    end

    def symbolize_keys
      transform_keys(&:to_sym)
    end

    def deep_merge(other)
      merge(other) do |_key, old_val, new_val|
        if old_val.is_a?(Hash) && new_val.is_a?(Hash)
          old_val.deep_merge(new_val)
        else
          new_val
        end
      end
    end
  end
end

using HashUtils
puts({ a: 1, b: 2 }.stringify_keys.inspect)`,
      hints: ['Wrap all methods in a refine Hash block', 'The module name should describe the functionality', 'deep_merge calls itself recursively - this works within refinement scope'],
      concepts: ['global_to_scoped', 'safe_extension'],
    },
  ],
};
