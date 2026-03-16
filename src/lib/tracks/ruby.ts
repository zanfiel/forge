/**
 * ruby.ts - Complete Ruby learning track
 *
 * 5 sections, 14 exercises. Progresses from variables through iterators and functional style.
 * Exercises showcase Ruby idioms: everything is an object, implicit returns, blocks, duck typing.
 */

import type { Track } from '../../stores/app.svelte.ts';

export const track: Track = {
  id: 'ruby',
  name: 'Ruby',
  language: 'ruby',
  monacoLang: 'ruby',
  icon: '\u{1F48E}',
  description: 'Elegant and expressive. Rails, scripting, and developer happiness.',
  sections: [
    {
      id: 'rb-variables',
      title: '1. Variables & Types',
      explanation: `## Variables & Types

Ruby is dynamically typed. Everything is an object -- even numbers and \`nil\`:

\`\`\`ruby
name = "Zan"          # String
age = 25              # Integer
pi = 3.14             # Float
online = true         # TrueClass (booleans)
nothing = nil         # NilClass (like null)

# Everything is an object
42.even?       # true
"hello".class  # String
nil.nil?       # true
\`\`\`

**Symbols** are lightweight, immutable identifiers (like interned strings):
\`\`\`ruby
status = :running    # Symbol -- starts with a colon
role = :admin

# Symbols are fast for comparisons and commonly used as hash keys
status == :running   # true
\`\`\`

**String interpolation** uses \`#{ }\` inside double-quoted strings:
\`\`\`ruby
name = "rocky"
port = 22
puts "Connecting to #{name} on port #{port}"
# Single-quoted strings do NOT interpolate:
puts 'No #{interpolation} here'  # literal text
\`\`\`

**Naming conventions:**
\`\`\`ruby
local_var = "snake_case"       # local variables & methods
CONSTANT = "SCREAMING_SNAKE"   # constants
ClassName = "PascalCase"       # classes/modules
@instance_var = "at sign"      # instance variables
@@class_var = "double at"      # class variables (rare)
\`\`\``,
      exercises: [
        {
          id: 'rb-var-1',
          title: 'Variables & Interpolation',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'ruby',
          goal: 'Declare variables of different types and use string interpolation to build output.',
          skeleton: `# Declare variables
server_name = __BLANK__
cpu_cores = __BLANK__
ram_gb = __BLANK__
online = __BLANK__

# Create a symbol for the server role
role = __BLANK__

# Print a formatted status line using string interpolation
status_icon = online ? "ON" : "OFF"
puts __BLANK__"#{server_name} (#{role}): #{cpu_cores} cores, #{ram_gb}GB RAM [#{status_icon}]"`,
          solution: `server_name = "rocky"
cpu_cores = 8
ram_gb = 32.0
online = true

role = :primary

status_icon = online ? "ON" : "OFF"
puts "#{server_name} (#{role}): #{cpu_cores} cores, #{ram_gb}GB RAM [#{status_icon}]"`,
          hints: [
            'Strings go in double quotes. Numbers don\'t need quotes. Booleans are lowercase `true`/`false`.',
            'Symbols start with a colon: `:primary`, `:admin`, `:backup`.',
            'String interpolation only works in double-quoted strings: `"text #{variable} more"`. No prefix letter needed.',
          ],
          concepts: ['variables', 'string interpolation', 'symbols', 'ternary operator', 'types'],
        },
        {
          id: 'rb-var-2',
          title: 'Object Methods on Primitives',
          type: 'predict-output',
          difficulty: 'beginner',
          language: 'ruby',
          goal: 'Predict the output. In Ruby, everything is an object -- even numbers and nil have methods.',
          skeleton: `puts 42.even?
puts 42.odd?
puts -7.abs
puts 3.14.round
puts "hello world".capitalize
puts "hello world".upcase
puts "hello world".length
puts nil.nil?
puts 0.nil?
puts "forge".reverse`,
          solution: `true
false
7
3
Hello world
HELLO WORLD
11
true
false
egrof`,
          hints: [
            '`.even?` returns true if the number is even. `.odd?` is the opposite. Methods ending in `?` return booleans.',
            '`.abs` returns absolute value. `.round` rounds to nearest integer. `.capitalize` uppercases only the first letter.',
            '`nil.nil?` is true, but `0.nil?` is false -- zero is NOT nil in Ruby. Only `nil` and `false` are falsy.',
          ],
          concepts: ['everything is an object', 'predicate methods', 'nil vs false', 'string methods', 'numeric methods'],
        },
        {
          id: 'rb-var-3',
          title: 'Fix the String Bug',
          type: 'fix-bug',
          difficulty: 'beginner',
          language: 'ruby',
          goal: 'Fix the bugs in this code. There are 3 issues related to string quoting and interpolation.',
          skeleton: `name = "Zan"
port = 4200

# Bug 1: Wrong quotes for interpolation
greeting = 'Hello, #{name}!'

# Bug 2: Missing interpolation syntax
connection = "Connecting to port " + port

# Bug 3: Wrong method name
message = greeting.toUpperCase

puts message
puts connection`,
          solution: `name = "Zan"
port = 4200

# Fix 1: Use double quotes for interpolation
greeting = "Hello, #{name}!"

# Fix 2: Convert integer to string, or use interpolation
connection = "Connecting to port #{port}"

# Fix 3: Ruby method is .upcase, not .toUpperCase
message = greeting.upcase

puts message
puts connection`,
          hints: [
            'String interpolation with `#{}` only works inside double-quoted strings, not single-quoted.',
            'You can\'t concatenate a string and integer with `+` in Ruby. Use interpolation or call `.to_s` on the number.',
            'Ruby uses `.upcase`, not `.toUpperCase` (that\'s JavaScript). Ruby methods are snake_case.',
          ],
          concepts: ['string interpolation', 'single vs double quotes', 'type coercion', 'string methods'],
        },
      ],
    },
    {
      id: 'rb-methods',
      title: '2. Methods & Blocks',
      explanation: `## Methods & Blocks

Ruby methods are defined with \`def\`. The last expression is the **implicit return**:

\`\`\`ruby
def greet(name)
  "Hello, #{name}!"   # no explicit return needed
end

puts greet("Zan")  # "Hello, Zan!"
\`\`\`

**Default parameters:**
\`\`\`ruby
def connect(host, port = 22)
  "ssh #{host} -p #{port}"
end

connect("rocky")        # "ssh rocky -p 22"
connect("ovh", 4822)   # "ssh ovh -p 4822"
\`\`\`

**Blocks** are chunks of code you pass to methods. They're everywhere in Ruby:
\`\`\`ruby
# With do...end (multi-line)
3.times do |i|
  puts "Iteration #{i}"
end

# With braces (single-line)
3.times { |i| puts "Iteration #{i}" }
\`\`\`

**yield** calls the block passed to a method:
\`\`\`ruby
def with_logging
  puts "[START]"
  yield            # runs the block
  puts "[END]"
end

with_logging { puts "Doing work..." }
# [START]
# Doing work...
# [END]
\`\`\`

**Procs & Lambdas** are blocks saved as objects:
\`\`\`ruby
square = ->(x) { x * x }     # lambda (strict arg checking)
square.call(5)                 # 25

double = Proc.new { |x| x * 2 }
double.call(5)                 # 10
\`\`\``,
      exercises: [
        {
          id: 'rb-meth-1',
          title: 'Implicit Returns',
          type: 'write-function',
          difficulty: 'beginner',
          language: 'ruby',
          goal: 'Write a method `disk_usage` that takes `used_gb` and `total_gb` (both floats), and returns a formatted string like "45.2 / 100.0 GB (45.20%)". Use Ruby\'s implicit return -- no `return` keyword needed.',
          skeleton: `# Write the disk_usage method here


# Tests
puts disk_usage(45.2, 100.0)   # "45.2 / 100.0 GB (45.20%)"
puts disk_usage(7.3, 7.3)      # "7.3 / 7.3 GB (100.00%)"
puts disk_usage(0, 500.0)      # "0 / 500.0 GB (0.00%)"`,
          solution: `def disk_usage(used_gb, total_gb)
  percent = total_gb > 0 ? (used_gb / total_gb * 100) : 0
  "#{used_gb} / #{total_gb} GB (#{'%.2f' % percent}%)"
end`,
          hints: [
            'Define with `def disk_usage(used_gb, total_gb)`. The last expression is automatically returned.',
            'Calculate percentage: `used_gb / total_gb * 100`. Guard against zero division with a ternary.',
            'Format to 2 decimal places: `\'%.2f\' % value` or `format("%.2f", value)` or `value.round(2)`.',
          ],
          concepts: ['def', 'implicit return', 'string interpolation', 'string formatting', 'ternary'],
        },
        {
          id: 'rb-meth-2',
          title: 'Blocks & yield',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'ruby',
          goal: 'Complete a method that uses `yield` to run code within a timed context, and then call it with a block.',
          skeleton: `def with_timing(label)
  start = Time.now
  __BLANK__              # Execute the block passed to this method
  elapsed = Time.now - start
  puts "#{__BLANK__} took #{elapsed.round(4)}s"
end

# Use the method with a block
with_timing("computation") __BLANK__
  sum = 0
  1_000_000.times { |i| sum += i }
  puts "Sum: #{sum}"
__BLANK__

# Single-line version with braces
with_timing("sleep") __BLANK__ sleep(0.1) __BLANK__`,
          solution: `def with_timing(label)
  start = Time.now
  yield
  elapsed = Time.now - start
  puts "#{label} took #{elapsed.round(4)}s"
end

with_timing("computation") do
  sum = 0
  1_000_000.times { |i| sum += i }
  puts "Sum: #{sum}"
end

with_timing("sleep") { sleep(0.1) }`,
          hints: [
            '`yield` inside a method executes whatever block the caller passes in.',
            'Multi-line blocks use `do...end`. The label variable is just `label`, the method parameter.',
            'Single-line blocks use `{ }`. Fill in: `yield`, `label`, `do`, `end`, `{`, `}`.',
          ],
          concepts: ['yield', 'blocks', 'do...end', 'braces syntax', 'Time.now', 'closures'],
        },
        {
          id: 'rb-meth-3',
          title: 'Lambdas & Procs',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'ruby',
          goal: 'Write a method `make_multiplier` that takes a number `factor` and returns a lambda that multiplies its argument by that factor. Then use it to create `double` and `triple` lambdas.',
          skeleton: `# Write make_multiplier here


# Tests
double = make_multiplier(2)
triple = make_multiplier(3)

puts double.call(5)    # 10
puts triple.call(5)    # 15
puts double.call(0)    # 0
puts triple.call(-3)   # -9

# Lambdas are also callable with []
puts double[7]         # 14`,
          solution: `def make_multiplier(factor)
  ->(x) { x * factor }
end`,
          hints: [
            'The lambda syntax is `->(...) { ... }`. It captures variables from the surrounding scope (closure).',
            'The method should return a lambda, and Ruby\'s implicit return means just having the lambda as the last expression.',
            '`->(x) { x * factor }` creates a lambda that takes `x` and multiplies by the captured `factor`.',
          ],
          concepts: ['lambda', 'closure', 'higher-order functions', 'implicit return', 'Proc'],
        },
      ],
    },
    {
      id: 'rb-collections',
      title: '3. Collections',
      explanation: `## Collections

**Arrays** are ordered, indexable, and packed with useful methods:
\`\`\`ruby
servers = ["rocky", "pangolin", "ovh-vps"]

servers[0]          # "rocky"
servers[-1]         # "ovh-vps" (last element)
servers.length      # 3
servers << "forge"  # append (shovel operator)
servers.include?("rocky")  # true
\`\`\`

**Hashes** are key-value stores. Modern Ruby uses symbol keys:
\`\`\`ruby
# Symbol keys (preferred style)
server = {
  name: "rocky",
  ip: "192.168.8.133",
  port: 22,
  online: true
}

server[:name]       # "rocky"
server[:tags]       # nil (missing key)
server.fetch(:name) # "rocky" (raises error if missing)
server.fetch(:tags, [])  # [] (default)
\`\`\`

**Enumerable** -- the magic module. Arrays, Hashes, Ranges all include it:
\`\`\`ruby
nums = [3, 1, 4, 1, 5, 9, 2, 6]

nums.sort           # [1, 1, 2, 3, 4, 5, 6, 9]
nums.uniq           # [3, 1, 4, 5, 9, 2, 6]
nums.min            # 1
nums.max            # 9
nums.sum            # 31
nums.count          # 8
nums.first(3)       # [3, 1, 4]
nums.last(2)        # [2, 6]
nums.sample         # random element
\`\`\`

**Ranges:**
\`\`\`ruby
(1..5).to_a    # [1, 2, 3, 4, 5]  (inclusive)
(1...5).to_a   # [1, 2, 3, 4]     (exclusive end)
('a'..'f').to_a # ["a", "b", "c", "d", "e", "f"]
\`\`\``,
      exercises: [
        {
          id: 'rb-col-1',
          title: 'Array & Hash Basics',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'ruby',
          goal: 'Work with arrays and hashes: create them, access values, and use common methods.',
          skeleton: `# Create an array of server names
servers = __BLANK__"rocky", "pangolin", "ovh-vps", "forge-box"__BLANK__

# Append a new server using the shovel operator
servers __BLANK__ "bav-apps"

# Create a hash with symbol keys
config = {
  host: "192.168.8.133",
  port: __BLANK__,
  user: __BLANK__
}

# Access hash values with symbol keys
puts config[__BLANK__]            # "192.168.8.133"
puts config.__BLANK__(:timeout, 30)  # 30 (key doesn't exist, use default)

# Check array membership
puts servers.__BLANK__("rocky")   # true
puts servers.length               # 5`,
          solution: `servers = ["rocky", "pangolin", "ovh-vps", "forge-box"]

servers << "bav-apps"

config = {
  host: "192.168.8.133",
  port: 22,
  user: "zan"
}

puts config[:host]
puts config.fetch(:timeout, 30)

puts servers.include?("rocky")
puts servers.length`,
          hints: [
            'Arrays use square brackets: `["item1", "item2"]`. The shovel operator is `<<`.',
            'Hash symbol keys: `port: 22` is shorthand for `:port => 22`. Access with `config[:host]`.',
            '`.fetch(:key, default)` returns the default if the key is missing. `.include?` checks membership.',
          ],
          concepts: ['arrays', 'hashes', 'symbol keys', 'shovel operator', 'fetch', 'include?'],
        },
        {
          id: 'rb-col-2',
          title: 'Hash Manipulation',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'ruby',
          goal: 'Write a method `merge_configs` that takes an array of config hashes (each with a `:name` key) and merges them into a single hash keyed by name. If a name appears more than once, later values override earlier ones.',
          skeleton: `# Write merge_configs here


# Tests
configs = [
  { name: "rocky", port: 22, user: "zan" },
  { name: "ovh-vps", port: 4822, user: "zan" },
  { name: "rocky", port: 4200, role: "engram" },
]

merged = merge_configs(configs)
p merged
# {
#   "rocky" => { name: "rocky", port: 4200, user: "zan", role: "engram" },
#   "ovh-vps" => { name: "ovh-vps", port: 4822, user: "zan" }
# }`,
          solution: `def merge_configs(configs)
  result = {}
  configs.each do |cfg|
    name = cfg[:name]
    if result.key?(name)
      result[name].merge!(cfg)
    else
      result[name] = cfg.dup
    end
  end
  result
end`,
          hints: [
            'Loop through each config with `.each`. Extract the name with `cfg[:name]`.',
            'Use `.key?(name)` to check if the name already exists. Use `.merge!(cfg)` to update in-place.',
            'Use `.dup` when first adding a config so you don\'t mutate the original hash.',
          ],
          concepts: ['hash', 'merge!', 'key?', 'dup', 'each', 'grouping by key'],
        },
        {
          id: 'rb-col-3',
          title: 'Enumerable Power',
          type: 'fix-bug',
          difficulty: 'intermediate',
          language: 'ruby',
          goal: 'Fix the 3 bugs in this code that uses Enumerable methods on arrays and hashes.',
          skeleton: `services = [
  { name: "engram", port: 4200, status: :running },
  { name: "synapse", port: 8080, status: :stopped },
  { name: "forge", port: 1420, status: :running },
  { name: "nginx", port: 80, status: :running },
]

# Bug 1: Get names of running services (should be ["engram", "forge", "nginx"])
running = services.select { |s| s[:status] == "running" }.map { |s| s[:name] }

# Bug 2: Find the service on port 8080 (should be the synapse hash)
found = services.find { |s| s.port == 8080 }

# Bug 3: Get a comma-separated string of all service names
names = services.map { |s| s[:name] }.concat(", ")

puts running.inspect
puts found.inspect
puts names`,
          solution: `services = [
  { name: "engram", port: 4200, status: :running },
  { name: "synapse", port: 8080, status: :stopped },
  { name: "forge", port: 1420, status: :running },
  { name: "nginx", port: 80, status: :running },
]

# Fix 1: Compare with symbol :running, not string "running"
running = services.select { |s| s[:status] == :running }.map { |s| s[:name] }

# Fix 2: Use hash access s[:port], not dot notation s.port
found = services.find { |s| s[:port] == 8080 }

# Fix 3: Use .join(", ") not .concat(", ") to join array into string
names = services.map { |s| s[:name] }.join(", ")

puts running.inspect
puts found.inspect
puts names`,
          hints: [
            'Status values are symbols (`:running`), not strings (`"running"`). Symbols and strings are never equal in Ruby.',
            'Hashes use bracket access `s[:port]`, not dot notation `s.port`. Dot notation is for methods, not hash keys.',
            '`.concat` appends to an array. To join array elements into a string, use `.join(separator)`.',
          ],
          concepts: ['select', 'map', 'find', 'join', 'symbol vs string', 'hash access'],
        },
      ],
    },
    {
      id: 'rb-classes',
      title: '4. Classes & Modules',
      explanation: `## Classes & Modules

Ruby classes use \`attr_accessor\` to auto-generate getters and setters:

\`\`\`ruby
class Server
  attr_accessor :name, :ip, :online

  def initialize(name, ip)
    @name = name       # @ marks instance variables
    @ip = ip
    @online = false
  end

  def connect
    @online = true
    "Connected to #{@name} at #{@ip}"
  end

  def to_s
    status = @online ? "online" : "offline"
    "Server(#{@name}, #{status})"
  end
end

srv = Server.new("rocky", "192.168.8.133")
puts srv.connect   # Connected to rocky at 192.168.8.133
puts srv           # Server(rocky, online)
puts srv.name      # rocky (getter from attr_accessor)
\`\`\`

**attr variants:**
- \`attr_accessor\` -- read + write
- \`attr_reader\` -- read only
- \`attr_writer\` -- write only

**Modules** are mixins -- share behavior without inheritance:
\`\`\`ruby
module Loggable
  def log(message)
    puts "[#{self.class.name}] #{message}"
  end
end

class Worker
  include Loggable    # mixin

  def run
    log("Starting work...")
  end
end

Worker.new.run  # [Worker] Starting work...
\`\`\`

**Inheritance** uses \`<\`:
\`\`\`ruby
class DatabaseServer < Server
  def initialize(name, ip, db_port = 5432)
    super(name, ip)
    @db_port = db_port
  end
end
\`\`\``,
      exercises: [
        {
          id: 'rb-cls-1',
          title: 'Build a Class',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'ruby',
          goal: 'Complete the `Service` class with instance variables, attr_reader, and a `to_s` method.',
          skeleton: `class Service
  __BLANK__ :name, :port
  attr_accessor :running

  def __BLANK__(name, port)
    __BLANK__ = name
    __BLANK__ = port
    @running = false
    @request_count = 0
  end

  def start
    @running = __BLANK__
    "#{@name} started on port #{@port}"
  end

  def handle_request(path)
    return "#{@name} is not running!" unless @running
    __BLANK__ += 1
    "#{@name} handled #{path} (total: #{@request_count})"
  end

  def __BLANK__
    status = @running ? "running" : "stopped"
    "Service(#{@name}, #{status}, #{@request_count} requests)"
  end
end

api = Service.__BLANK__("engram-api", 4200)
puts api.start
puts api.handle_request("/search")
puts api.handle_request("/store")
puts api`,
          solution: `class Service
  attr_reader :name, :port
  attr_accessor :running

  def initialize(name, port)
    @name = name
    @port = port
    @running = false
    @request_count = 0
  end

  def start
    @running = true
    "#{@name} started on port #{@port}"
  end

  def handle_request(path)
    return "#{@name} is not running!" unless @running
    @request_count += 1
    "#{@name} handled #{path} (total: #{@request_count})"
  end

  def to_s
    status = @running ? "running" : "stopped"
    "Service(#{@name}, #{status}, #{@request_count} requests)"
  end
end

api = Service.new("engram-api", 4200)
puts api.start
puts api.handle_request("/search")
puts api.handle_request("/store")
puts api`,
          hints: [
            '`attr_reader` generates getter methods. `initialize` is Ruby\'s constructor (like `__init__` in Python).',
            'Instance variables start with `@`. Set `@running = true` in start. Increment with `@request_count += 1`.',
            '`to_s` is Ruby\'s string representation method (like `__repr__`). Create instances with `ClassName.new(...)`.',
          ],
          concepts: ['class', 'initialize', 'attr_reader', 'attr_accessor', 'instance variables', 'to_s', 'new'],
        },
        {
          id: 'rb-cls-2',
          title: 'Modules & Mixins',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'ruby',
          goal: 'Create a `Serializable` module with a `to_h` method that converts an object\'s instance variables into a hash, and a `to_json_string` method that formats it as a JSON-like string. Then include it in a `Container` class.',
          skeleton: `# Write the Serializable module here


# Write the Container class here (include Serializable)


# Tests
c = Container.new("engram", "engram:latest", 4200)
puts c.to_h.inspect
# { name: "engram", image: "engram:latest", port: 4200, running: false }
puts c.to_json_string
# {"name":"engram","image":"engram:latest","port":4200,"running":false}
c.start
puts c.to_h[:running]   # true`,
          solution: `module Serializable
  def to_h
    hash = {}
    instance_variables.each do |var|
      key = var.to_s.delete("@").to_sym
      hash[key] = instance_variable_get(var)
    end
    hash
  end

  def to_json_string
    pairs = to_h.map do |k, v|
      value = v.is_a?(String) ? "\"#{v}\"" : v.to_s
      "\"#{k}\":#{value}"
    end
    "{#{pairs.join(",")}}"
  end
end

class Container
  include Serializable

  attr_reader :name, :image, :port
  attr_accessor :running

  def initialize(name, image, port)
    @name = name
    @image = image
    @port = port
    @running = false
  end

  def start
    @running = true
    "Started #{@name} (#{@image}) on port #{@port}"
  end
end`,
          hints: [
            '`instance_variables` returns an array of instance variable names like `[:@name, :@port]`. Use `instance_variable_get` to read values.',
            'Strip the `@` prefix with `.to_s.delete("@").to_sym` to get clean symbol keys.',
            'For `to_json_string`, wrap string values in escaped quotes. Map key-value pairs and join with commas.',
          ],
          concepts: ['modules', 'include', 'mixins', 'instance_variables', 'instance_variable_get', 'metaprogramming'],
        },
        {
          id: 'rb-cls-3',
          title: 'Inheritance & Super',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'ruby',
          goal: 'Create a `RateLimitedService` class that inherits from `Service`. It accepts an extra `max_rpm` parameter (max requests per minute). Override `handle_request` to reject requests when the limit is reached.',
          skeleton: `class Service
  attr_reader :name, :port, :request_count
  attr_accessor :running

  def initialize(name, port)
    @name = name
    @port = port
    @running = false
    @request_count = 0
  end

  def start
    @running = true
    "#{@name} started on port #{@port}"
  end

  def handle_request(path)
    return "#{@name} is not running!" unless @running
    @request_count += 1
    "#{@name} handled #{path} (total: #{@request_count})"
  end
end

# Write RateLimitedService here (inherits from Service)


# Tests
api = RateLimitedService.new("engram-api", 4200, 3)
api.start
puts api.handle_request("/search")    # engram-api handled /search (total: 1)
puts api.handle_request("/store")     # engram-api handled /store (total: 2)
puts api.handle_request("/context")   # engram-api handled /context (total: 3)
puts api.handle_request("/list")      # Rate limited! engram-api: 3/3 requests used`,
          solution: `class RateLimitedService < Service
  attr_reader :max_rpm

  def initialize(name, port, max_rpm = 60)
    super(name, port)
    @max_rpm = max_rpm
  end

  def handle_request(path)
    if @request_count >= @max_rpm
      "Rate limited! #{@name}: #{@request_count}/#{@max_rpm} requests used"
    else
      super(path)
    end
  end
end`,
          hints: [
            'Inherit with `class RateLimitedService < Service`. Call `super(name, port)` in `initialize`.',
            'Check the rate limit BEFORE calling `super(path)`, since super increments `@request_count`.',
            'Use `@request_count >= @max_rpm` as the guard. `super(path)` delegates to the parent `handle_request`.',
          ],
          concepts: ['inheritance', 'super', 'method override', '<', 'rate limiting', 'attr_reader'],
        },
      ],
    },
    {
      id: 'rb-iterators',
      title: '5. Iterators & Functional',
      explanation: `## Iterators & Functional Style

Ruby's Enumerable module gives arrays, hashes, and ranges a rich set of functional-style iterators. These are the heart of idiomatic Ruby.

**map** -- transform each element:
\`\`\`ruby
names = ["rocky", "pangolin", "forge"]
upper = names.map { |n| n.upcase }
# ["ROCKY", "PANGOLIN", "FORGE"]

# Shorthand with &:method_name (Symbol#to_proc)
upper = names.map(&:upcase)
\`\`\`

**select & reject** -- filter elements:
\`\`\`ruby
nums = [1, 2, 3, 4, 5, 6]
evens = nums.select { |n| n.even? }     # [2, 4, 6]
odds = nums.reject { |n| n.even? }      # [1, 3, 5]
# Also: .select(&:even?) and .reject(&:even?)
\`\`\`

**reduce** (aka inject) -- accumulate a result:
\`\`\`ruby
nums = [1, 2, 3, 4, 5]
total = nums.reduce(0) { |sum, n| sum + n }  # 15
product = nums.reduce(1) { |acc, n| acc * n } # 120

# Shorthand
total = nums.reduce(:+)   # 15
\`\`\`

**Chaining** -- combine operations fluidly:
\`\`\`ruby
result = (1..20)
  .select(&:odd?)
  .map { |n| n ** 2 }
  .reject { |n| n > 100 }
  .reduce(:+)
# 165  (1+9+25+49+81)
\`\`\`

**each_with_object** -- build a result while iterating:
\`\`\`ruby
words = ["hello", "world", "hello", "ruby"]
counts = words.each_with_object(Hash.new(0)) { |w, h| h[w] += 1 }
# {"hello"=>2, "world"=>1, "ruby"=>1}
\`\`\``,
      exercises: [
        {
          id: 'rb-iter-1',
          title: 'Map, Select, Reduce',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'ruby',
          goal: 'Use map, select, and reduce to process server data.',
          skeleton: `servers = [
  { name: "rocky", cpu: 23.5, online: true },
  { name: "pangolin", cpu: 45.1, online: true },
  { name: "ovh-vps", cpu: 2.3, online: false },
  { name: "forge-box", cpu: 12.8, online: true },
  { name: "bav-apps", cpu: 67.2, online: true },
]

# Get names of online servers (use select then map)
online_names = servers
  .__BLANK__ { |s| s[:online] }
  .__BLANK__ { |s| s[__BLANK__] }

# Calculate average CPU of online servers (use select, map, then reduce)
online_cpus = servers
  .select { |s| s[:online] }
  .map { |s| s[:cpu] }

avg_cpu = online_cpus.__BLANK__(__BLANK__) { |sum, c| sum + c } / online_cpus.__BLANK__.to_f

# Get the name of the server with highest CPU (use max_by)
busiest = servers.__BLANK__ { |s| s[:cpu] }[:name]

puts online_names.inspect  # ["rocky", "pangolin", "forge-box", "bav-apps"]
puts avg_cpu.round(2)      # 37.15
puts busiest               # bav-apps`,
          solution: `online_names = servers
  .select { |s| s[:online] }
  .map { |s| s[:name] }

online_cpus = servers
  .select { |s| s[:online] }
  .map { |s| s[:cpu] }

avg_cpu = online_cpus.reduce(0) { |sum, c| sum + c } / online_cpus.length.to_f

busiest = servers.max_by { |s| s[:cpu] }[:name]`,
          hints: [
            '`.select` filters, `.map` transforms. Chain them: `.select { ... }.map { ... }`.',
            '`.reduce(0)` starts with 0 and accumulates. Divide by `.length.to_f` to get a float average.',
            '`.max_by { |s| s[:cpu] }` returns the element with the highest value for the block expression.',
          ],
          concepts: ['select', 'map', 'reduce', 'max_by', 'chaining', 'to_f'],
        },
        {
          id: 'rb-iter-2',
          title: 'Chained Pipeline',
          type: 'refactor',
          difficulty: 'advanced',
          language: 'ruby',
          goal: 'Refactor this verbose, loop-based code into a single chained pipeline using Ruby\'s Enumerable methods (select, map, sort_by, first, join). No intermediate variables or manual loops.',
          skeleton: `# Refactor this into a single chained expression assigned to `result`
log_lines = [
  "[ERROR] 2024-01-15 Disk full on /dev/sda1",
  "[INFO] 2024-01-15 Server started",
  "[ERROR] 2024-01-14 Connection timeout to DB",
  "[WARN] 2024-01-15 High memory usage",
  "[ERROR] 2024-01-13 SSL certificate expired",
  "[INFO] 2024-01-14 Backup completed",
  "[ERROR] 2024-01-15 Out of memory",
]

# Current code: find ERROR lines, extract the message after the date,
# sort by date (newest first), take top 3, and join with newlines
errors = []
log_lines.each do |line|
  if line.start_with?("[ERROR]")
    errors << line
  end
end

sorted = errors.sort_by { |line| line[8..17] }.reverse

top3 = sorted.first(3)

messages = []
top3.each do |line|
  messages << line[19..]
end

result = messages.join("\\n")

puts result
# Disk full on /dev/sda1
# Out of memory
# Connection timeout to DB`,
          solution: `log_lines = [
  "[ERROR] 2024-01-15 Disk full on /dev/sda1",
  "[INFO] 2024-01-15 Server started",
  "[ERROR] 2024-01-14 Connection timeout to DB",
  "[WARN] 2024-01-15 High memory usage",
  "[ERROR] 2024-01-13 SSL certificate expired",
  "[INFO] 2024-01-14 Backup completed",
  "[ERROR] 2024-01-15 Out of memory",
]

result = log_lines
  .select { |line| line.start_with?("[ERROR]") }
  .sort_by { |line| line[8..17] }
  .reverse
  .first(3)
  .map { |line| line[19..] }
  .join("\\n")

puts result`,
          hints: [
            'Start with `.select` to filter ERROR lines. Chain `.sort_by` with the date substring, then `.reverse` for newest first.',
            '`.first(3)` takes the top 3. Then `.map` to extract the message portion (everything after index 19).',
            'Finally `.join("\\n")` to combine into a single string. The whole thing is one expression, no intermediate variables.',
          ],
          concepts: ['method chaining', 'select', 'sort_by', 'reverse', 'first', 'map', 'join', 'refactoring'],
        },
      ],
    },
  ],
};
