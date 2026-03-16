import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-ostruct',
  title: '37. OpenStruct',
  explanation: `## OpenStruct in Ruby

OpenStruct creates objects with arbitrary attributes set at runtime, using method_missing under the hood.

### Basic Usage

\`\`\`ruby
require 'ostruct'

person = OpenStruct.new(name: "Alice", age: 30)
puts person.name   # => "Alice"
person.email = "alice@ex.com"  # dynamic attribute
puts person.email  # => "alice@ex.com"
\`\`\`

### Dynamic Attributes

\`\`\`ruby
os = OpenStruct.new
os.anything = "works"
os.respond_to?(:anything)  # => true
os.respond_to?(:missing)   # => false
\`\`\`

### Hash Conversion

\`\`\`ruby
os = OpenStruct.new(a: 1, b: 2)
os.to_h  # => {a: 1, b: 2}

# From hash
h = { name: "Bob", role: "dev" }
os = OpenStruct.new(h)
\`\`\`

### Under the Hood

OpenStruct uses \`method_missing\` and \`define_singleton_method\` to create accessors on the fly. This makes it flexible but slower than Struct or Data.

### When to Use

- Quick prototyping and scripts
- Configuration objects from hashes
- Test doubles and fixtures
- NOT recommended for production hot paths (performance)

\`\`\`ruby
# Performance comparison
require 'benchmark'
S = Struct.new(:x)
Benchmark.bm do |b|
  b.report("Struct") { 100000.times { S.new(1).x } }
  b.report("OStruct") { 100000.times { OpenStruct.new(x: 1).x } }
end
# Struct is significantly faster
\`\`\``,
  exercises: [
    {
      id: 'rb-ostruct-1',
      title: 'Create OpenStruct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Create an OpenStruct with initial attributes.',
      skeleton: `require 'ostruct'

config = ___.new(host: "localhost", port: 3000)
puts config.host
puts config.port`,
      solution: `require 'ostruct'

config = OpenStruct.new(host: "localhost", port: 3000)
puts config.host
puts config.port`,
      hints: ['OpenStruct.new accepts a hash of attributes', 'require ostruct first', 'Attributes become methods automatically'],
      concepts: ['open_struct_new'],
    },
    {
      id: 'rb-ostruct-2',
      title: 'Dynamic Attributes',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Add attributes dynamically to an OpenStruct.',
      skeleton: `require 'ostruct'

person = OpenStruct.new(name: "Alice")
person.___ = "alice@example.com"
person.___ = 30
puts person.email
puts person.age`,
      solution: `require 'ostruct'

person = OpenStruct.new(name: "Alice")
person.email = "alice@example.com"
person.age = 30
puts person.email
puts person.age`,
      hints: ['OpenStruct allows setting any attribute at any time', 'Just assign with dot notation', 'New methods are created on the fly'],
      concepts: ['dynamic_attributes'],
    },
    {
      id: 'rb-ostruct-3',
      title: 'Respond To Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Check if an OpenStruct responds to a method.',
      skeleton: `require 'ostruct'

os = OpenStruct.new(name: "test")
puts os.___?(:name)     # true
puts os.___?(:missing)  # false`,
      solution: `require 'ostruct'

os = OpenStruct.new(name: "test")
puts os.respond_to?(:name)     # true
puts os.respond_to?(:missing)  # false`,
      hints: ['respond_to? checks if the object has a method', 'Defined attributes respond true', 'Undefined attributes respond false'],
      concepts: ['respond_to'],
    },
    {
      id: 'rb-ostruct-4',
      title: 'Convert to Hash',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Convert an OpenStruct to a hash.',
      skeleton: `require 'ostruct'

os = OpenStruct.new(x: 1, y: 2, z: 3)
h = os.___
puts h.inspect`,
      solution: `require 'ostruct'

os = OpenStruct.new(x: 1, y: 2, z: 3)
h = os.to_h
puts h.inspect`,
      hints: ['to_h converts OpenStruct to a hash', 'Keys are symbols', 'Values are the attribute values'],
      concepts: ['to_h'],
    },
    {
      id: 'rb-ostruct-5',
      title: 'Delete Attribute',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Delete an attribute from an OpenStruct.',
      skeleton: `require 'ostruct'

os = OpenStruct.new(a: 1, b: 2, c: 3)
os.___(:b)
puts os.respond_to?(:b)  # false
puts os.to_h.inspect`,
      solution: `require 'ostruct'

os = OpenStruct.new(a: 1, b: 2, c: 3)
os.delete_field(:b)
puts os.respond_to?(:b)  # false
puts os.to_h.inspect`,
      hints: ['delete_field removes an attribute', 'The method is no longer available after deletion', 'Pass the attribute name as a symbol'],
      concepts: ['delete_field'],
    },
    {
      id: 'rb-ostruct-6',
      title: 'Freeze OpenStruct',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Freeze an OpenStruct to prevent modifications.',
      skeleton: `require 'ostruct'

config = OpenStruct.new(debug: false, env: "production")
config.___

begin
  config.debug = true
rescue => e
  puts e.class
end`,
      solution: `require 'ostruct'

config = OpenStruct.new(debug: false, env: "production")
config.freeze

begin
  config.debug = true
rescue => e
  puts e.class
end`,
      hints: ['freeze prevents any modifications', 'Attempting to modify raises FrozenError', 'Useful for configuration objects'],
      concepts: ['freeze'],
    },
    {
      id: 'rb-ostruct-7',
      title: 'Write Config Builder with OpenStruct',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a configuration builder that returns a frozen OpenStruct.',
      skeleton: `require 'ostruct'

# Write a configure method that:
# - Takes a block
# - Yields an OpenStruct for setting values
# - Returns a frozen OpenStruct
# Usage: config = configure { |c| c.host = "localhost"; c.port = 3000 }
`,
      solution: `require 'ostruct'

def configure
  config = OpenStruct.new
  yield config
  config.freeze
end

config = configure do |c|
  c.host = "localhost"
  c.port = 3000
  c.debug = false
end

puts config.host
puts config.port
puts config.frozen?`,
      hints: ['Yield an OpenStruct to the block', 'Freeze before returning', 'The block sets attributes dynamically'],
      concepts: ['config_builder', 'yield_pattern'],
    },
    {
      id: 'rb-ostruct-8',
      title: 'Write JSON to OpenStruct',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method that converts nested JSON to OpenStructs.',
      skeleton: `require 'ostruct'
require 'json'

# Write json_to_ostruct(json_string) that:
# - Parses JSON string
# - Converts to OpenStruct (including nested hashes)
# - Arrays of hashes should also be converted
`,
      solution: `require 'ostruct'
require 'json'

def json_to_ostruct(json_string)
  data = JSON.parse(json_string, symbolize_names: true)
  hash_to_ostruct(data)
end

def hash_to_ostruct(obj)
  case obj
  when Hash
    OpenStruct.new(obj.transform_values { |v| hash_to_ostruct(v) })
  when Array
    obj.map { |item| hash_to_ostruct(item) }
  else
    obj
  end
end

json = '{"name": "Alice", "address": {"city": "NYC", "zip": "10001"}, "tags": ["ruby", "dev"]}'
result = json_to_ostruct(json)
puts result.name
puts result.address.city
puts result.tags.inspect`,
      hints: ['Parse JSON then recursively convert hashes', 'Handle Hash, Array, and primitive cases', 'transform_values converts all hash values'],
      concepts: ['json_to_ostruct', 'recursive_conversion'],
    },
    {
      id: 'rb-ostruct-9',
      title: 'Write OpenStruct DSL',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a DSL builder that creates OpenStructs from a block DSL.',
      skeleton: `require 'ostruct'

# Write a build_object method that accepts a block
# Inside the block, method calls become attributes
# Example:
# result = build_object do
#   name "Alice"
#   age 30
#   role "developer"
# end
# result.name => "Alice"
`,
      solution: `require 'ostruct'

class ObjectBuilder
  def initialize
    @data = {}
  end

  def method_missing(name, *args)
    if args.length == 1
      @data[name] = args.first
    else
      super
    end
  end

  def respond_to_missing?(name, include_private = false)
    true
  end

  def to_ostruct
    OpenStruct.new(@data)
  end
end

def build_object(&block)
  builder = ObjectBuilder.new
  builder.instance_eval(&block)
  builder.to_ostruct
end

result = build_object do
  name "Alice"
  age 30
  role "developer"
end

puts result.name
puts result.age
puts result.role`,
      hints: ['Use method_missing to capture DSL calls', 'instance_eval runs the block in the builder context', 'Convert the collected data to OpenStruct at the end'],
      concepts: ['dsl_builder', 'method_missing', 'instance_eval'],
    },
    {
      id: 'rb-ostruct-10',
      title: 'Write OpenStruct Merge',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method that merges two OpenStructs.',
      skeleton: `require 'ostruct'

# Write merge_ostruct(base, override) that:
# - Creates a new OpenStruct
# - Contains all attributes from base
# - Override attributes replace base attributes
# - New attributes from override are added
`,
      solution: `require 'ostruct'

def merge_ostruct(base, override)
  merged = base.to_h.merge(override.to_h)
  OpenStruct.new(merged)
end

base = OpenStruct.new(host: "localhost", port: 3000, debug: false)
override = OpenStruct.new(port: 8080, debug: true, ssl: true)

result = merge_ostruct(base, override)
puts result.host    # localhost (from base)
puts result.port    # 8080 (overridden)
puts result.debug   # true (overridden)
puts result.ssl     # true (from override)`,
      hints: ['Convert both to hashes with to_h', 'Use Hash#merge to combine', 'Create a new OpenStruct from the merged hash'],
      concepts: ['merge', 'to_h'],
    },
    {
      id: 'rb-ostruct-11',
      title: 'Write OpenStruct with Defaults',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write an OpenStruct subclass with default values.',
      skeleton: `require 'ostruct'

# Write a DefaultStruct class that:
# - Inherits from OpenStruct
# - Accepts a defaults hash and an overrides hash
# - Missing attributes return the default instead of nil
`,
      solution: `require 'ostruct'

class DefaultStruct < OpenStruct
  def initialize(defaults = {}, overrides = {})
    @defaults = defaults
    super(defaults.merge(overrides))
  end

  def method_missing(name, *args)
    if name.to_s.end_with?('=')
      super
    else
      result = super
      result.nil? ? @defaults[name] : result
    end
  end
end

config = DefaultStruct.new(
  { timeout: 30, retries: 3, verbose: false },
  { timeout: 60 }
)

puts config.timeout   # 60 (overridden)
puts config.retries   # 3 (default)
puts config.verbose   # false (default)`,
      hints: ['Merge defaults with overrides in super call', 'Store defaults for fallback', 'Override method_missing for nil fallback'],
      concepts: ['default_values', 'inheritance'],
    },
    {
      id: 'rb-ostruct-12',
      title: 'Write Comparison Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method that compares two OpenStructs and returns differences.',
      skeleton: `require 'ostruct'

# Write diff_ostruct(a, b) that returns a hash of differences:
# { added: [...], removed: [...], changed: { key: [old, new] } }
`,
      solution: `require 'ostruct'

def diff_ostruct(a, b)
  ha = a.to_h
  hb = b.to_h

  added = (hb.keys - ha.keys)
  removed = (ha.keys - hb.keys)
  changed = {}

  (ha.keys & hb.keys).each do |key|
    changed[key] = [ha[key], hb[key]] if ha[key] != hb[key]
  end

  { added: added, removed: removed, changed: changed }
end

a = OpenStruct.new(x: 1, y: 2, z: 3)
b = OpenStruct.new(x: 1, y: 5, w: 4)

result = diff_ostruct(a, b)
puts "Added: \\\#{result[:added].inspect}"
puts "Removed: \\\#{result[:removed].inspect}"
puts "Changed: \\\#{result[:changed].inspect}"`,
      hints: ['Convert to hashes for comparison', 'Set operations find added/removed keys', 'Intersected keys check for value changes'],
      concepts: ['diff', 'set_operations'],
    },
    {
      id: 'rb-ostruct-13',
      title: 'Fix OpenStruct Boolean Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the bug where false attributes appear missing.',
      skeleton: `require 'ostruct'

config = OpenStruct.new(debug: false, verbose: false)

# Bug: using || for defaults treats false as missing
debug = config.debug || true
verbose = config.verbose || true

puts debug    # true (wrong! should be false)
puts verbose  # true (wrong! should be false)`,
      solution: `require 'ostruct'

config = OpenStruct.new(debug: false, verbose: false)

debug = config.respond_to?(:debug) ? config.debug : true
verbose = config.respond_to?(:verbose) ? config.verbose : true

puts debug    # false
puts verbose  # false`,
      hints: ['false || true evaluates to true', 'Use respond_to? or nil? check instead of ||', 'nil and false are both falsy in Ruby'],
      concepts: ['falsy_values', 'nil_vs_false'],
    },
    {
      id: 'rb-ostruct-14',
      title: 'Fix Missing require',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the NameError from missing require.',
      skeleton: `# Bug: NameError - uninitialized constant OpenStruct
person = OpenStruct.new(name: "Alice")
puts person.name`,
      solution: `require 'ostruct'

person = OpenStruct.new(name: "Alice")
puts person.name`,
      hints: ['OpenStruct is not loaded by default', 'Add require "ostruct" at the top', 'Unlike Struct, OpenStruct needs an explicit require'],
      concepts: ['require'],
    },
    {
      id: 'rb-ostruct-15',
      title: 'Fix Method Conflict',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Fix the attribute that conflicts with an existing method.',
      skeleton: `require 'ostruct'

record = OpenStruct.new(class: "Widget", type: "physical")
# Bug: class returns the Ruby class, not our attribute
puts record.class  # OpenStruct instead of "Widget"`,
      solution: `require 'ostruct'

record = OpenStruct.new
record[:class] = "Widget"
record[:type] = "physical"

puts record[:class]  # "Widget"
puts record[:type]   # "physical"`,
      hints: ['Some method names conflict with Ruby builtins (class, type, etc.)', 'Use bracket notation for conflicting names', 'record[:key] bypasses method dispatch'],
      concepts: ['method_conflicts', 'bracket_access'],
    },
    {
      id: 'rb-ostruct-16',
      title: 'Predict OpenStruct Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict OpenStruct attribute behavior.',
      skeleton: `require 'ostruct'

os = OpenStruct.new(a: 1)
os.b = 2
os.c = nil

puts os.a
puts os.b
puts os.c.inspect
puts os.d.inspect`,
      solution: `1
2
nil
nil`,
      hints: ['Defined attributes return their values', 'os.c is explicitly nil', 'os.d is undefined, also returns nil'],
      concepts: ['nil_undefined'],
    },
    {
      id: 'rb-ostruct-17',
      title: 'Predict respond_to?',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict respond_to? results for OpenStruct.',
      skeleton: `require 'ostruct'

os = OpenStruct.new(x: 1)
os.y = nil

puts os.respond_to?(:x)
puts os.respond_to?(:y)
puts os.respond_to?(:z)
puts os.respond_to?(:to_h)`,
      solution: `true
true
false
true`,
      hints: ['x was set in constructor', 'y was set explicitly (even to nil)', 'z was never set', 'to_h is a built-in OpenStruct method'],
      concepts: ['respond_to_semantics'],
    },
    {
      id: 'rb-ostruct-18',
      title: 'Predict Equality',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict OpenStruct equality.',
      skeleton: `require 'ostruct'

a = OpenStruct.new(x: 1, y: 2)
b = OpenStruct.new(x: 1, y: 2)
c = OpenStruct.new(y: 2, x: 1)
d = OpenStruct.new(x: 1, y: 2, z: 3)

puts a == b
puts a == c
puts a == d`,
      solution: `true
true
false`,
      hints: ['OpenStruct == compares all attributes', 'Order of keys does not matter', 'd has an extra attribute so it differs'],
      concepts: ['ostruct_equality'],
    },
    {
      id: 'rb-ostruct-19',
      title: 'Refactor Hash Access to OpenStruct',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Refactor bracket-access hash code to use OpenStruct.',
      skeleton: `config = { host: "localhost", port: 3000, debug: false }

def start_server(config)
  puts "Starting \\\#{config[:host]}:\\\#{config[:port]}"
  puts "Debug: \\\#{config[:debug]}"
end

start_server(config)`,
      solution: `require 'ostruct'

config = OpenStruct.new(host: "localhost", port: 3000, debug: false)

def start_server(config)
  puts "Starting \\\#{config.host}:\\\#{config.port}"
  puts "Debug: \\\#{config.debug}"
end

start_server(config)`,
      hints: ['Replace hash with OpenStruct.new(hash)', 'Replace [:key] access with .key', 'Dot notation is more readable'],
      concepts: ['hash_to_ostruct'],
    },
    {
      id: 'rb-ostruct-20',
      title: 'Refactor OpenStruct to Struct',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor an OpenStruct to a Struct for better performance.',
      skeleton: `require 'ostruct'

# Used in a hot loop - performance matters
def process_records(data)
  data.map do |row|
    record = OpenStruct.new(row)
    { name: record.name.upcase, score: record.score * 2 }
  end
end

data = 1000.times.map { |i| { name: "user\\\#{i}", score: i } }
result = process_records(data)
puts result.first.inspect`,
      solution: `Record = Struct.new(:name, :score, keyword_init: true)

def process_records(data)
  data.map do |row|
    record = Record.new(**row)
    { name: record.name.upcase, score: record.score * 2 }
  end
end

data = 1000.times.map { |i| { name: "user\\\#{i}", score: i } }
result = process_records(data)
puts result.first.inspect`,
      hints: ['Struct is significantly faster than OpenStruct', 'Define the Struct once with known fields', 'Use keyword_init for hash-based construction'],
      concepts: ['ostruct_to_struct', 'performance'],
    },
  ],
};
