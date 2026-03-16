import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-hooks',
  title: '39. Hooks',
  explanation: `## Hooks & Callbacks in Ruby

Ruby provides numerous hook methods that are called automatically when certain events occur.

### Class and Module Hooks

\`\`\`ruby
class Base
  def self.inherited(subclass)
    puts "\#{subclass} inherits from \#{self}"
  end
end
class Child < Base; end  # prints: Child inherits from Base
\`\`\`

### Module Hooks

\`\`\`ruby
module Trackable
  def self.included(base)
    puts "\#{self} included in \#{base}"
  end

  def self.extended(base)
    puts "\#{self} extended by \#{base}"
  end

  def self.prepended(base)
    puts "\#{self} prepended to \#{base}"
  end
end
\`\`\`

### Method Hooks

\`\`\`ruby
class Watcher
  def self.method_added(name)
    puts "Method added: \#{name}"
  end

  def self.method_removed(name)
    puts "Method removed: \#{name}"
  end

  def hello; end  # triggers method_added
end
\`\`\`

### TracePoint

\`\`\`ruby
trace = TracePoint.new(:call) do |tp|
  puts "\#{tp.method_id} called at \#{tp.path}:\#{tp.lineno}"
end
trace.enable
# ... code to trace ...
trace.disable
\`\`\`

### const_missing

\`\`\`ruby
class AutoLoader
  def self.const_missing(name)
    puts "Loading \#{name}..."
    const_set(name, Class.new)
  end
end
\`\`\``,
  exercises: [
    {
      id: 'rb-hooks-1',
      title: 'Inherited Hook',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use the inherited hook to track subclasses.',
      skeleton: `class Base
  def self.___(subclass)
    puts "\\\#{subclass} inherits from \\\#{self}"
  end
end

class Child < Base; end`,
      solution: `class Base
  def self.inherited(subclass)
    puts "\\\#{subclass} inherits from \\\#{self}"
  end
end

class Child < Base; end`,
      hints: ['inherited is called when a class is subclassed', 'It receives the new subclass as argument', 'Define it as a class method with self.'],
      concepts: ['inherited'],
    },
    {
      id: 'rb-hooks-2',
      title: 'Included Hook',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use the included hook.',
      skeleton: `module Loggable
  def self.___(base)
    puts "\\\#{self} included in \\\#{base}"
  end

  def log(msg)
    puts "[LOG] \\\#{msg}"
  end
end

class App
  include Loggable
end`,
      solution: `module Loggable
  def self.included(base)
    puts "\\\#{self} included in \\\#{base}"
  end

  def log(msg)
    puts "[LOG] \\\#{msg}"
  end
end

class App
  include Loggable
end`,
      hints: ['included is called when a module is included', 'base is the class that includes the module', 'Common pattern for adding class methods on include'],
      concepts: ['included'],
    },
    {
      id: 'rb-hooks-3',
      title: 'Method Added Hook',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Track when methods are added to a class.',
      skeleton: `class Tracked
  def self.___(name)
    puts "Added: \\\#{name}" unless name == :method_added
  end
end

class Tracked
  def hello; end
  def world; end
end`,
      solution: `class Tracked
  def self.method_added(name)
    puts "Added: \\\#{name}" unless name == :method_added
  end
end

class Tracked
  def hello; end
  def world; end
end`,
      hints: ['method_added is called each time a method is defined', 'Guard against infinite recursion by checking the name', 'It receives the method name as a symbol'],
      concepts: ['method_added'],
    },
    {
      id: 'rb-hooks-4',
      title: 'Extended Hook',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use the extended hook to track object extensions.',
      skeleton: `module Features
  def self.___(obj)
    puts "\\\#{obj} extended with \\\#{self}"
  end

  def feature_a
    "Feature A"
  end
end

obj = Object.new
obj.extend(Features)
puts obj.feature_a`,
      solution: `module Features
  def self.extended(obj)
    puts "\\\#{obj} extended with \\\#{self}"
  end

  def feature_a
    "Feature A"
  end
end

obj = Object.new
obj.extend(Features)
puts obj.feature_a`,
      hints: ['extended is called when extend adds the module to an object', 'obj is the object being extended', 'extend adds module methods as singleton methods'],
      concepts: ['extended'],
    },
    {
      id: 'rb-hooks-5',
      title: 'Const Missing',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use const_missing for auto-loading.',
      skeleton: `module AutoLoad
  def self.___(name)
    puts "Auto-loading \\\#{name}"
    const_set(name, "loaded_\\\#{name.to_s.downcase}")
  end
end

puts AutoLoad::Widget
puts AutoLoad::Gadget`,
      solution: `module AutoLoad
  def self.const_missing(name)
    puts "Auto-loading \\\#{name}"
    const_set(name, "loaded_\\\#{name.to_s.downcase}")
  end
end

puts AutoLoad::Widget
puts AutoLoad::Gadget`,
      hints: ['const_missing is called when a constant is not found', 'const_set defines the constant for future access', 'name is a symbol'],
      concepts: ['const_missing'],
    },
    {
      id: 'rb-hooks-6',
      title: 'TracePoint Basic',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use TracePoint to trace method calls.',
      skeleton: `trace = ___.new(:call) do |tp|
  puts "Called: \\\#{tp.method_id}"
end

trace.___
def greet = "hello"
greet
trace.___`,
      solution: `trace = TracePoint.new(:call) do |tp|
  puts "Called: \\\#{tp.method_id}"
end

trace.enable
def greet = "hello"
greet
trace.disable`,
      hints: ['TracePoint.new(:event) creates a trace', 'enable starts tracing, disable stops it', 'tp.method_id gives the method name'],
      concepts: ['tracepoint'],
    },
    {
      id: 'rb-hooks-7',
      title: 'Write Subclass Registry',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a base class that automatically registers all subclasses.',
      skeleton: `# Write a Plugin base class that:
# - Has an inherited hook to track subclasses
# - Has a self.plugins class method returning all subclasses
# - Has a self.find(name) that finds a plugin by class name
`,
      solution: `class Plugin
  @plugins = []

  def self.inherited(subclass)
    @plugins << subclass
  end

  def self.plugins
    @plugins.dup
  end

  def self.find(name)
    @plugins.find { |p| p.name == name.to_s }
  end
end

class AudioPlugin < Plugin; end
class VideoPlugin < Plugin; end
class TextPlugin < Plugin; end

puts Plugin.plugins.map(&:name).inspect
puts Plugin.find(:AudioPlugin)`,
      hints: ['Use a class instance variable @plugins array', 'inherited hook appends the subclass', 'find searches by class name'],
      concepts: ['subclass_registry', 'inherited'],
    },
    {
      id: 'rb-hooks-8',
      title: 'Write Included with Class Methods',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a module that adds both instance and class methods on include.',
      skeleton: `# Write a Timestamps module that:
# - On included, extends the base with ClassMethods
# - ClassMethods has a timestamps method that adds created_at and updated_at accessors
# - Instance methods: touch (sets updated_at to Time.now)
`,
      solution: `module Timestamps
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def timestamps
      attr_accessor :created_at, :updated_at
    end
  end

  def touch
    @updated_at = Time.now
  end

  def initialize_timestamps
    @created_at = Time.now
    @updated_at = Time.now
  end
end

class Record
  include Timestamps
  timestamps

  def initialize
    initialize_timestamps
  end
end

r = Record.new
puts r.created_at
r.touch
puts r.updated_at`,
      hints: ['Use self.included to extend with ClassMethods', 'ClassMethods module holds the class-level DSL', 'This is the classic Ruby concern pattern'],
      concepts: ['included_pattern', 'class_methods'],
    },
    {
      id: 'rb-hooks-9',
      title: 'Write Method Tracer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a module that traces all method calls in a class.',
      skeleton: `# Write a MethodTracer module that:
# - When included, hooks into method_added
# - Wraps each new method to print "Entering method_name" and "Leaving method_name"
# - Does not trace the hooks themselves
`,
      solution: `module MethodTracer
  def self.included(base)
    base.instance_variable_set(:@tracing, false)

    base.define_singleton_method(:method_added) do |name|
      return if @tracing
      return if [:initialize].include?(name)

      @tracing = true
      original = instance_method(name)

      define_method(name) do |*args, &block|
        puts "Entering \\\#{name}"
        result = original.bind(self).call(*args, &block)
        puts "Leaving \\\#{name}"
        result
      end
      @tracing = false
    end
  end
end

class MyService
  include MethodTracer

  def process
    "done"
  end

  def validate
    "ok"
  end
end

MyService.new.process
MyService.new.validate`,
      hints: ['Use method_added to intercept new methods', 'Save the original with instance_method before redefining', 'Use a flag to prevent infinite recursion'],
      concepts: ['method_wrapping', 'method_added'],
    },
    {
      id: 'rb-hooks-10',
      title: 'Write Prepended Hook',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a module that uses prepend for method interception.',
      skeleton: `# Write a Cacheable module that:
# - When prepended, wraps methods listed in a cache_methods call
# - Cached methods store results in a @cache hash
# - Subsequent calls return cached results
`,
      solution: `module Cacheable
  def self.prepended(base)
    base.instance_variable_set(:@cached_methods, [])
    base.extend(ClassMethods)
  end

  module ClassMethods
    def cache_method(name)
      @cached_methods << name
      mod = Module.new do
        define_method(name) do |*args|
          @cache ||= {}
          key = [name, args]
          unless @cache.key?(key)
            @cache[key] = super(*args)
          end
          @cache[key]
        end
      end
      prepend mod
    end
  end
end

class Calculator
  prepend Cacheable

  def expensive(n)
    puts "Computing \\\#{n}..."
    n ** 2
  end

  cache_method :expensive
end

c = Calculator.new
puts c.expensive(5)
puts c.expensive(5)  # cached, no "Computing" printed`,
      hints: ['prepend inserts the module before the class in method lookup', 'super in the wrapper calls the original method', 'Use a hash for the cache with [method, args] keys'],
      concepts: ['prepended', 'caching'],
    },
    {
      id: 'rb-hooks-11',
      title: 'Write TracePoint Logger',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a TracePoint-based method call logger.',
      skeleton: `# Write a trace_calls method that:
# - Takes a class and a block
# - Traces all method calls on that class within the block
# - Returns an array of { method:, args: } hashes
`,
      solution: `def trace_calls(target_class, &block)
  calls = []

  trace = TracePoint.new(:call) do |tp|
    if tp.defined_class == target_class
      calls << { method: tp.method_id, lineno: tp.lineno }
    end
  end

  trace.enable(&block)
  calls
end

class MyApp
  def greet(name)
    "Hello, \\\#{name}"
  end

  def farewell(name)
    "Goodbye, \\\#{name}"
  end
end

app = MyApp.new
log = trace_calls(MyApp) do
  app.greet("Alice")
  app.farewell("Bob")
end

log.each { |entry| puts "Called: \\\#{entry[:method]}" }`,
      hints: ['TracePoint.new(:call) traces method calls', 'enable with a block limits the trace scope', 'tp.defined_class checks which class defined the method'],
      concepts: ['tracepoint', 'call_logging'],
    },
    {
      id: 'rb-hooks-12',
      title: 'Write Auto-Registration',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a hook-based auto-registration system.',
      skeleton: `# Write a Serializer base class that:
# - Auto-registers subclasses with inherited hook
# - Each subclass defines a handles class method returning a type symbol
# - Serializer.for(type) returns the right subclass
`,
      solution: `class Serializer
  @registry = {}

  def self.inherited(subclass)
    super
    # Defer registration to allow class body to define handles
    TracePoint.new(:end) do |tp|
      if tp.self == subclass
        type = subclass.handles rescue nil
        @registry[type] = subclass if type
        tp.disable
      end
    end.enable
  end

  def self.for(type)
    @registry[type]
  end

  def self.handles
    nil
  end
end

class JsonSerializer < Serializer
  def self.handles = :json
  def serialize(data) = data.to_s
end

class XmlSerializer < Serializer
  def self.handles = :xml
  def serialize(data) = "<data>\\\#{data}</data>"
end

puts Serializer.for(:json)
puts Serializer.for(:xml)`,
      hints: ['inherited registers the subclass', 'Use TracePoint(:end) to wait until class body is complete', 'The registry maps types to serializer classes'],
      concepts: ['auto_registration', 'tracepoint_end'],
    },
    {
      id: 'rb-hooks-13',
      title: 'Fix Infinite Recursion in method_added',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the infinite recursion caused by method_added.',
      skeleton: `class Watched
  def self.method_added(name)
    puts "Added: \\\#{name}"
    # Bug: defining a method inside method_added triggers method_added again
    define_method("logged_\\\#{name}") do |*args|
      puts "calling \\\#{name}"
      send(name, *args)
    end
  end

  def hello
    "hi"
  end
end`,
      solution: `class Watched
  @hooking = false

  def self.method_added(name)
    return if @hooking
    return if name.to_s.start_with?("logged_")

    @hooking = true
    puts "Added: \\\#{name}"
    define_method("logged_\\\#{name}") do |*args|
      puts "calling \\\#{name}"
      send(name, *args)
    end
    @hooking = false
  end

  def hello
    "hi"
  end
end`,
      hints: ['Use a flag to prevent reentrant calls', 'Set @hooking = true before defining new methods', 'Also skip methods with the logged_ prefix'],
      concepts: ['infinite_recursion', 'guard_flag'],
    },
    {
      id: 'rb-hooks-14',
      title: 'Fix Missing super in inherited',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the inherited hook that breaks the chain.',
      skeleton: `class Base
  def self.inherited(subclass)
    (@subs ||= []) << subclass
    # Bug: missing super, so Ruby's default inherited behavior is skipped
  end
end

class Middle < Base
  def self.inherited(subclass)
    (@subs ||= []) << subclass
  end
end

class Child < Middle; end

puts Base.instance_variable_get(:@subs).map(&:name).inspect
puts Middle.instance_variable_get(:@subs).map(&:name).inspect`,
      solution: `class Base
  def self.inherited(subclass)
    (@subs ||= []) << subclass
    super
  end
end

class Middle < Base
  def self.inherited(subclass)
    (@subs ||= []) << subclass
    super
  end
end

class Child < Middle; end

puts Base.instance_variable_get(:@subs).map(&:name).inspect
puts Middle.instance_variable_get(:@subs).map(&:name).inspect`,
      hints: ['Always call super in inherited hooks', 'Without super, parent classes miss the notification', 'The chain should propagate up the hierarchy'],
      concepts: ['inherited_super'],
    },
    {
      id: 'rb-hooks-15',
      title: 'Fix included Adding Wrong Methods',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Fix the included hook that does not properly add class methods.',
      skeleton: `module Findable
  def self.included(base)
    # Bug: these become instance methods of base, not class methods
    def base.find_by_name(name)
      puts "Finding by name: \\\#{name}"
    end
  end
end

class User
  include Findable
end

User.find_by_name("Alice")  # This works but is fragile
# Better pattern needed`,
      solution: `module Findable
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def find_by_name(name)
      puts "Finding by name: \\\#{name}"
    end
  end
end

class User
  include Findable
end

User.find_by_name("Alice")`,
      hints: ['Define class methods in a ClassMethods sub-module', 'Use base.extend(ClassMethods) in the included hook', 'This is the standard Rails-style pattern'],
      concepts: ['included_class_methods', 'extend'],
    },
    {
      id: 'rb-hooks-16',
      title: 'Predict inherited Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict the order of inherited callbacks.',
      skeleton: `class A
  def self.inherited(sub)
    puts "A sees \\\#{sub.name}"
  end
end

class B < A
  def self.inherited(sub)
    super
    puts "B sees \\\#{sub.name}"
  end
end

class C < B; end`,
      solution: `A sees B
A sees C
B sees C`,
      hints: ['Creating B triggers A.inherited(B)', 'Creating C triggers B.inherited(C) which calls super -> A.inherited(C)', 'super propagates up the chain'],
      concepts: ['inherited_chain'],
    },
    {
      id: 'rb-hooks-17',
      title: 'Predict included vs extended',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict which hook fires.',
      skeleton: `module M
  def self.included(base)
    puts "included in \\\#{base}"
  end

  def self.extended(base)
    puts "extended by \\\#{base}"
  end
end

class A
  include M
end

class B
  extend M
end`,
      solution: `included in A
extended by B`,
      hints: ['include triggers the included hook', 'extend triggers the extended hook', 'They are different operations with different hooks'],
      concepts: ['include_vs_extend'],
    },
    {
      id: 'rb-hooks-18',
      title: 'Predict method_added',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict method_added callback behavior.',
      skeleton: `class Demo
  def self.method_added(name)
    puts "added: \\\#{name}" unless name == :method_added
  end

  def alpha; end
  def beta; end
end

class Demo
  def gamma; end
end`,
      solution: `added: alpha
added: beta
added: gamma`,
      hints: ['method_added fires for each def in the class', 'Reopening the class and adding methods also triggers it', 'We skip method_added itself to prevent recursion'],
      concepts: ['method_added_timing'],
    },
    {
      id: 'rb-hooks-19',
      title: 'Refactor Manual Registration to Hook',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor manual plugin registration to use inherited hook.',
      skeleton: `class PluginManager
  @plugins = []

  def self.register(plugin_class)
    @plugins << plugin_class
  end

  def self.plugins
    @plugins
  end
end

class AudioPlugin; end
PluginManager.register(AudioPlugin)

class VideoPlugin; end
PluginManager.register(VideoPlugin)

puts PluginManager.plugins.map(&:name).inspect`,
      solution: `class PluginBase
  @plugins = []

  def self.inherited(subclass)
    @plugins << subclass
    super
  end

  def self.plugins
    @plugins
  end
end

class AudioPlugin < PluginBase; end
class VideoPlugin < PluginBase; end

puts PluginBase.plugins.map(&:name).inspect`,
      hints: ['Replace manual register calls with inherited hook', 'Subclassing auto-registers the plugin', 'No separate PluginManager needed'],
      concepts: ['auto_registration'],
    },
    {
      id: 'rb-hooks-20',
      title: 'Refactor Explicit Setup to included',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Refactor explicit class configuration to use included hook.',
      skeleton: `module Validatable
  def validate
    self.class.validators.each do |v|
      v.call(self)
    end
  end
end

class User
  include Validatable

  # Manual setup every time the module is included
  @validators = []

  def self.validators
    @validators
  end

  def self.validates(field, &block)
    @validators << block
  end
end`,
      solution: `module Validatable
  def self.included(base)
    base.instance_variable_set(:@validators, [])
    base.extend(ClassMethods)
  end

  module ClassMethods
    def validators
      @validators
    end

    def validates(field, &block)
      @validators << block
    end
  end

  def validate
    self.class.validators.each do |v|
      v.call(self)
    end
  end
end

class User
  include Validatable

  validates(:name) { |u| puts "valid!" }
end

User.new.validate`,
      hints: ['Move the @validators setup into self.included', 'Move class methods into a ClassMethods sub-module', 'included hook automates the setup'],
      concepts: ['included_setup', 'class_methods_pattern'],
    },
  ],
};
