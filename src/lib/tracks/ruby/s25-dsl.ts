import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-dsl',
  title: '25. DSL',
  explanation: `## Domain-Specific Languages (DSLs) in Ruby

Ruby's flexible syntax and metaprogramming make it ideal for building internal DSLs -- mini-languages embedded within Ruby.

\`\`\`ruby
# instance_eval DSL
class ServerConfig
  attr_reader :host, :port

  def initialize(&block)
    @host = "localhost"
    @port = 80
    instance_eval(&block) if block
  end

  def host(val) = @host = val
  def port(val) = @port = val
end

config = ServerConfig.new do
  host "0.0.0.0"
  port 3000
end

# Builder pattern
class HtmlBuilder
  def initialize
    @html = ""
  end

  def div(&block)
    @html += "<div>"
    instance_eval(&block) if block
    @html += "</div>"
  end

  def text(content)
    @html += content
  end

  def to_s
    @html
  end
end

# Rake-style DSL (using method_missing)
task :build do
  puts "Building..."
end

# Block-based configuration
App.configure do |config|
  config.database = "postgres"
  config.port = 5432
end
\`\`\`

### Key Concepts

- **instance_eval** changes self inside the block, enabling bare method calls
- **Block-based config** passes a config object to the block
- **method_missing** enables natural-looking DSL syntax
- **Builder pattern** constructs complex objects step by step
- DSLs should read like natural language for their domain`,
  exercises: [
    {
      id: 'rb-dsl-1',
      title: 'Basic instance_eval DSL',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to evaluate the block in the context of the object.',
      skeleton: `class Config
  attr_reader :name, :version

  def initialize(&block)
    @name = ""
    @version = "0.0.0"
    ___(&block) if block
  end

  def name(val) = @name = val
  def version(val) = @version = val
end`,
      solution: `class Config
  attr_reader :name, :version

  def initialize(&block)
    @name = ""
    @version = "0.0.0"
    instance_eval(&block) if block
  end

  def name(val) = @name = val
  def version(val) = @version = val
end`,
      hints: [
        'instance_eval executes the block with self set to the Config object.',
        'This allows bare method calls like `name "MyApp"` in the block.',
        'Pass the block with &block.',
      ],
      concepts: ['instance_eval', 'DSL', 'configuration'],
    },
    {
      id: 'rb-dsl-2',
      title: 'Block-Based Configuration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to yield the config object to the block.',
      skeleton: `class App
  attr_accessor :debug, :log_level

  def self.configure
    config = new
    ___ config
    config
  end
end

app = App.configure do |c|
  c.debug = true
  c.log_level = :info
end`,
      solution: `class App
  attr_accessor :debug, :log_level

  def self.configure
    config = new
    yield config
    config
  end
end

app = App.configure do |c|
  c.debug = true
  c.log_level = :info
end`,
      hints: [
        'yield passes the config object to the block.',
        'The block parameter c receives the config object.',
        'This is the explicit config object pattern.',
      ],
      concepts: ['yield', 'block-configuration', 'attr_accessor'],
    },
    {
      id: 'rb-dsl-3',
      title: 'DSL Setter Methods',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to define DSL-style setter methods that can be used without "=".',
      skeleton: `class Route
  attr_reader :path, :verb, :handler

  def ___(val) = @path = val
  def ___(val) = @verb = val
  def ___(val) = @handler = val
end`,
      solution: `class Route
  attr_reader :path, :verb, :handler

  def path(val) = @path = val
  def verb(val) = @verb = val
  def handler(val) = @handler = val
end`,
      hints: [
        'DSL setters are regular methods that accept a value.',
        'They look like `name value` instead of `name = value`.',
        'The endless method syntax `def name(val) = @name = val` is concise.',
      ],
      concepts: ['DSL-setters', 'endless-methods', 'readability'],
    },
    {
      id: 'rb-dsl-4',
      title: 'Nested DSL Block',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to support nested DSL blocks.',
      skeleton: `class Menu
  attr_reader :items

  def initialize
    @items = []
  end

  def item(name, &block)
    entry = MenuItem.new(name)
    entry.___(&block) if block
    @items << entry
  end
end

class MenuItem
  attr_reader :name, :price

  def initialize(name)
    @name = name
    @price = 0
  end

  def price(val) = @price = val
end`,
      solution: `class Menu
  attr_reader :items

  def initialize
    @items = []
  end

  def item(name, &block)
    entry = MenuItem.new(name)
    entry.instance_eval(&block) if block
    @items << entry
  end
end

class MenuItem
  attr_reader :name, :price

  def initialize(name)
    @name = name
    @price = 0
  end

  def price(val) = @price = val
end`,
      hints: [
        'Use instance_eval on the MenuItem to evaluate the nested block.',
        'The block runs in the context of the menu item.',
        'This allows `price 9.99` inside the item block.',
      ],
      concepts: ['nested-DSL', 'instance_eval', 'builder'],
    },
    {
      id: 'rb-dsl-5',
      title: 'method_missing DSL',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to use method_missing for dynamic DSL attributes.',
      skeleton: `class Schema
  def initialize
    @fields = {}
  end

  def ___(name, *args)
    if args.length == 1
      @fields[name] = args[0]
    else
      @fields[name]
    end
  end

  def to_h
    @fields
  end
end`,
      solution: `class Schema
  def initialize
    @fields = {}
  end

  def method_missing(name, *args)
    if args.length == 1
      @fields[name] = args[0]
    else
      @fields[name]
    end
  end

  def to_h
    @fields
  end
end`,
      hints: [
        'method_missing catches undefined method calls.',
        'If one argument is passed, treat it as a setter.',
        'If no arguments, treat it as a getter.',
      ],
      concepts: ['method_missing', 'DSL', 'dynamic-attributes'],
    },
    {
      id: 'rb-dsl-6',
      title: 'Rake-Style Task DSL',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to define the task method at the top level.',
      skeleton: `@tasks = {}

def ___(name, &block)
  @tasks[name] = block
end

def run(name)
  @tasks[name]&.call
end

task :greet do
  puts "Hello!"
end

run(:greet)`,
      solution: `@tasks = {}

def task(name, &block)
  @tasks[name] = block
end

def run(name)
  @tasks[name]&.call
end

task :greet do
  puts "Hello!"
end

run(:greet)`,
      hints: [
        'Define task as a regular method that stores the block.',
        'The block is saved in a hash keyed by the task name.',
        'run retrieves and calls the stored block.',
      ],
      concepts: ['task-DSL', 'blocks', 'hash-storage'],
    },
    {
      id: 'rb-dsl-7',
      title: 'Write an HTML Builder DSL',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write an HtmlBuilder class with methods div, p, and span that accept text and optional blocks for nesting. Build HTML strings. Include a to_s method.',
      skeleton: `# Write your HtmlBuilder DSL`,
      solution: `class HtmlBuilder
  def initialize
    @html = ""
  end

  def div(text = nil, &block)
    tag("div", text, &block)
  end

  def p(text = nil, &block)
    tag("p", text, &block)
  end

  def span(text = nil, &block)
    tag("span", text, &block)
  end

  def to_s
    @html
  end

  private

  def tag(name, text = nil, &block)
    @html += "<\#{name}>"
    @html += text if text
    instance_eval(&block) if block
    @html += "</\#{name}>"
  end
end`,
      hints: [
        'Each tag method wraps content in HTML tags.',
        'Use instance_eval for nested blocks.',
        'Extract common logic into a private tag method.',
      ],
      concepts: ['builder-pattern', 'instance_eval', 'DSL'],
    },
    {
      id: 'rb-dsl-8',
      title: 'Write a Router DSL',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Router class with get(path, &handler) and post(path, &handler) methods. Store routes and add a match(verb, path) method that returns the handler block.',
      skeleton: `# Write your Router DSL`,
      solution: `class Router
  def initialize(&block)
    @routes = []
    instance_eval(&block) if block
  end

  def get(path, &handler)
    @routes << { verb: :get, path: path, handler: handler }
  end

  def post(path, &handler)
    @routes << { verb: :post, path: path, handler: handler }
  end

  def match(verb, path)
    route = @routes.find { |r| r[:verb] == verb && r[:path] == path }
    route[:handler] if route
  end
end`,
      hints: [
        'Store routes as hashes with verb, path, and handler.',
        'get and post are just helpers that set the verb.',
        'match finds the matching route and returns its handler.',
      ],
      concepts: ['DSL', 'routing', 'blocks'],
    },
    {
      id: 'rb-dsl-9',
      title: 'Write a Test DSL',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a simple test DSL with describe(name, &block) and it(name, &block) methods. The it block should return true/false. Run all tests and report results.',
      skeleton: `# Write your Test DSL`,
      solution: `class TestSuite
  def initialize
    @results = []
    @current_group = nil
  end

  def describe(name, &block)
    @current_group = name
    instance_eval(&block)
    @current_group = nil
  end

  def it(name, &block)
    result = block.call
    @results << {
      group: @current_group,
      name: name,
      passed: result
    }
  end

  def report
    @results.each do |r|
      status = r[:passed] ? "PASS" : "FAIL"
      puts "\#{status}: \#{r[:group]} - \#{r[:name]}"
    end
  end
end`,
      hints: [
        'describe sets the current group and evaluates the block.',
        'it stores the test result.',
        'Use instance_eval so describe and it can be called without a receiver.',
      ],
      concepts: ['test-DSL', 'instance_eval', 'reporting'],
    },
    {
      id: 'rb-dsl-10',
      title: 'Write a Form Builder DSL',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a FormBuilder with text_field(name), password_field(name), select_field(name, options), and submit(label) methods. Each should append HTML to an internal string. Add build(&block) class method.',
      skeleton: `# Write your FormBuilder DSL`,
      solution: `class FormBuilder
  def initialize
    @fields = []
  end

  def self.build(&block)
    builder = new
    builder.instance_eval(&block)
    builder.to_html
  end

  def text_field(name)
    @fields << "<input type=\\"text\\" name=\\"\#{name}\\" />"
  end

  def password_field(name)
    @fields << "<input type=\\"password\\" name=\\"\#{name}\\" />"
  end

  def select_field(name, options)
    opts = options.map { |o| "<option>\#{o}</option>" }.join
    @fields << "<select name=\\"\#{name}\\">\#{opts}</select>"
  end

  def submit(label)
    @fields << "<button type=\\"submit\\">\#{label}</button>"
  end

  def to_html
    "<form>\#{@fields.join}</form>"
  end
end`,
      hints: [
        'Each method appends an HTML string to @fields.',
        'to_html wraps everything in a form tag.',
        'self.build creates an instance and evaluates the block.',
      ],
      concepts: ['builder-DSL', 'HTML-generation', 'instance_eval'],
    },
    {
      id: 'rb-dsl-11',
      title: 'Write a Migration DSL',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Migration class with create_table(name, &block) and a Table class with column(name, type) and timestamps methods. The DSL should collect the schema definition.',
      skeleton: `# Write your Migration DSL`,
      solution: `class Table
  attr_reader :name, :columns

  def initialize(name)
    @name = name
    @columns = []
  end

  def column(name, type)
    @columns << { name: name, type: type }
  end

  def timestamps
    column(:created_at, :datetime)
    column(:updated_at, :datetime)
  end
end

class Migration
  attr_reader :tables

  def initialize
    @tables = []
  end

  def self.define(&block)
    m = new
    m.instance_eval(&block)
    m
  end

  def create_table(name, &block)
    table = Table.new(name)
    table.instance_eval(&block)
    @tables << table
  end
end`,
      hints: [
        'Migration holds tables, Table holds columns.',
        'create_table creates a Table and evaluates the block on it.',
        'timestamps is a convenience method adding two columns.',
      ],
      concepts: ['nested-DSL', 'schema-definition', 'builder'],
    },
    {
      id: 'rb-dsl-12',
      title: 'Write a State Machine DSL',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a StateMachine class with state(name), event(name, from:, to:) methods. Add a trigger(event_name) method that transitions the current state.',
      skeleton: `# Write your StateMachine DSL`,
      solution: `class StateMachine
  attr_reader :current_state

  def initialize(&block)
    @states = []
    @events = {}
    @current_state = nil
    instance_eval(&block) if block
  end

  def state(name, initial: false)
    @states << name
    @current_state = name if initial
  end

  def event(name, from:, to:)
    @events[name] = { from: Array(from), to: to }
  end

  def trigger(event_name)
    ev = @events[event_name]
    raise "Unknown event: \#{event_name}" unless ev
    raise "Cannot \#{event_name} from \#{@current_state}" unless ev[:from].include?(@current_state)
    @current_state = ev[:to]
  end
end`,
      hints: [
        'state registers valid states, event registers transitions.',
        'trigger checks the current state and transitions.',
        'Array(from) handles both single values and arrays.',
      ],
      concepts: ['state-machine', 'DSL', 'event-driven'],
    },
    {
      id: 'rb-dsl-13',
      title: 'Fix DSL Self Reference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the DSL so that calling `name` without arguments returns the stored value.',
      skeleton: `class Package
  def initialize(&block)
    @name = nil
    instance_eval(&block) if block
  end

  def name(val)
    @name = val
  end

  def to_s
    "Package: \#{@name}"
  end
end

pkg = Package.new do
  name "my-app"
end

puts pkg`,
      solution: `class Package
  def initialize(&block)
    @name = nil
    instance_eval(&block) if block
  end

  def name(val = nil)
    if val
      @name = val
    else
      @name
    end
  end

  def to_s
    "Package: \#{@name}"
  end
end

pkg = Package.new do
  name "my-app"
end

puts pkg`,
      hints: [
        'Make val an optional parameter with a default of nil.',
        'If val is provided, set the value (setter).',
        'If val is nil, return the stored value (getter).',
      ],
      concepts: ['getter-setter-DSL', 'optional-parameters', 'dual-purpose'],
    },
    {
      id: 'rb-dsl-14',
      title: 'Fix Builder Return Value',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the builder so methods can be chained.',
      skeleton: `class QueryBuilder
  def initialize
    @conditions = []
    @order = nil
  end

  def where(condition)
    @conditions << condition
  end

  def order_by(field)
    @order = field
  end

  def build
    sql = "SELECT * WHERE \#{@conditions.join(' AND ')}"
    sql += " ORDER BY \#{@order}" if @order
    sql
  end
end

q = QueryBuilder.new
q.where("age > 18").where("active = true").order_by("name")
puts q.build`,
      solution: `class QueryBuilder
  def initialize
    @conditions = []
    @order = nil
  end

  def where(condition)
    @conditions << condition
    self
  end

  def order_by(field)
    @order = field
    self
  end

  def build
    sql = "SELECT * WHERE \#{@conditions.join(' AND ')}"
    sql += " ORDER BY \#{@order}" if @order
    sql
  end
end

q = QueryBuilder.new
q.where("age > 18").where("active = true").order_by("name")
puts q.build`,
      hints: [
        'Chaining requires each method to return self.',
        'Without `self`, where returns the modified array.',
        'Add `self` as the return value of where and order_by.',
      ],
      concepts: ['method-chaining', 'return-self', 'builder-pattern'],
    },
    {
      id: 'rb-dsl-15',
      title: 'Fix instance_eval Variable Access',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the DSL so local variables from outside are accessible inside the block.',
      skeleton: `class Template
  def initialize(&block)
    @content = ""
    instance_eval(&block)
  end

  def text(val) = @content += val
  def to_s = @content
end

username = "Alice"
t = Template.new do
  text "Hello, "
  text username  # This might not work as expected
end
puts t`,
      solution: `class Template
  def initialize(&block)
    @content = ""
    instance_eval(&block)
  end

  def text(val) = @content += val.to_s
  def to_s = @content
end

username = "Alice"
t = Template.new do
  text "Hello, "
  text username  # Blocks are closures, they capture local variables
end
puts t`,
      hints: [
        'Blocks are closures and capture local variables from their defining scope.',
        'username is accessible inside the block even with instance_eval.',
        'Add .to_s to handle non-string values safely.',
      ],
      concepts: ['closure', 'instance_eval', 'variable-capture'],
    },
    {
      id: 'rb-dsl-16',
      title: 'Predict DSL Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `class Settings
  attr_reader :data

  def initialize(&block)
    @data = {}
    instance_eval(&block)
  end

  def set(key, value)
    @data[key] = value
  end
end

s = Settings.new do
  set :color, "blue"
  set :size, 42
end

puts s.data[:color]
puts s.data[:size]`,
      solution: `blue
42`,
      hints: [
        'instance_eval makes self the Settings object.',
        'set is called on the Settings instance.',
        '@data stores both key-value pairs.',
      ],
      concepts: ['instance_eval', 'DSL', 'hash-storage'],
    },
    {
      id: 'rb-dsl-17',
      title: 'Predict Builder Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `class ListBuilder
  def initialize
    @items = []
  end

  def add(item)
    @items << item
    self
  end

  def to_s
    @items.join(" -> ")
  end
end

result = ListBuilder.new.add("A").add("B").add("C")
puts result`,
      solution: `A -> B -> C`,
      hints: [
        'Each add returns self, enabling chaining.',
        'Three items are added: A, B, C.',
        'to_s joins them with " -> ".',
      ],
      concepts: ['method-chaining', 'builder-pattern', 'to_s'],
    },
    {
      id: 'rb-dsl-18',
      title: 'Predict Nested DSL Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `class Tree
  attr_reader :label, :children

  def initialize(label)
    @label = label
    @children = []
  end

  def node(label, &block)
    child = Tree.new(label)
    child.instance_eval(&block) if block
    @children << child
  end

  def depth
    return 1 if @children.empty?
    1 + @children.map(&:depth).max
  end
end

root = Tree.new("root")
root.instance_eval do
  node "a" do
    node "b"
  end
  node "c"
end

puts root.depth`,
      solution: `3`,
      hints: [
        'root has children: a and c.',
        'a has child: b.',
        'Depth: root(1) -> a(2) -> b(3). Max depth is 3.',
      ],
      concepts: ['nested-DSL', 'tree-structure', 'recursion'],
    },
    {
      id: 'rb-dsl-19',
      title: 'Refactor Explicit Config to DSL',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the explicit configuration to use a DSL with instance_eval.',
      skeleton: `class Database
  attr_accessor :host, :port, :name, :username

  def initialize
    @host = "localhost"
    @port = 5432
    @name = "mydb"
    @username = "admin"
  end
end

db = Database.new
db.host = "192.168.1.1"
db.port = 3306
db.name = "production"
db.username = "root"`,
      solution: `class Database
  attr_reader :host, :port, :name, :username

  def initialize(&block)
    @host = "localhost"
    @port = 5432
    @name = "mydb"
    @username = "admin"
    instance_eval(&block) if block
  end

  def host(val) = @host = val
  def port(val) = @port = val
  def name(val) = @name = val
  def username(val) = @username = val
end

db = Database.new do
  host "192.168.1.1"
  port 3306
  name "production"
  username "root"
end`,
      hints: [
        'Replace attr_accessor with attr_reader and DSL setter methods.',
        'Add &block to initialize and use instance_eval.',
        'The DSL reads more naturally than explicit assignments.',
      ],
      concepts: ['DSL', 'instance_eval', 'refactoring'],
    },
    {
      id: 'rb-dsl-20',
      title: 'Refactor Imperative Setup to Builder DSL',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the imperative pipeline setup to a chainable builder DSL.',
      skeleton: `class Pipeline
  def initialize
    @steps = []
  end

  def add_step(name, &action)
    @steps << { name: name, action: action }
  end

  def execute(input)
    @steps.reduce(input) { |data, step| step[:action].call(data) }
  end
end

p = Pipeline.new
p.add_step("upcase") { |d| d.upcase }
p.add_step("reverse") { |d| d.reverse }
p.add_step("squeeze") { |d| d.squeeze }
puts p.execute("hello  world")`,
      solution: `class Pipeline
  def initialize
    @steps = []
  end

  def step(name, &action)
    @steps << { name: name, action: action }
    self
  end

  def execute(input)
    @steps.reduce(input) { |data, s| s[:action].call(data) }
  end

  def self.build(&block)
    pipeline = new
    pipeline.instance_eval(&block)
    pipeline
  end
end

p = Pipeline.build do
  step("upcase") { |d| d.upcase }
  step("reverse") { |d| d.reverse }
  step("squeeze") { |d| d.squeeze }
end
puts p.execute("hello  world")`,
      hints: [
        'Add self.build that uses instance_eval.',
        'Rename add_step to step and return self for chaining.',
        'The DSL block reads more naturally.',
      ],
      concepts: ['builder-DSL', 'method-chaining', 'refactoring'],
    },
  ],
};
