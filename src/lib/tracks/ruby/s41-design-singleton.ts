import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-singleton',
  title: '41. Singleton',
  explanation: `## Singleton Pattern in Ruby

The Singleton pattern ensures a class has only one instance. Ruby provides multiple approaches.

### Singleton Module

\`\`\`ruby
require 'singleton'

class AppConfig
  include Singleton

  attr_accessor :debug, :log_level

  def initialize
    @debug = false
    @log_level = :info
  end
end

config = AppConfig.instance
config.debug = true
# AppConfig.new  # raises NoMethodError
\`\`\`

### Module Approach

\`\`\`ruby
module Config
  @settings = {}

  def self.set(key, value)
    @settings[key] = value
  end

  def self.get(key)
    @settings[key]
  end
end
\`\`\`

### Class-Level Instance

\`\`\`ruby
class Logger
  @instance = nil
  @mutex = Mutex.new

  def self.instance
    @mutex.synchronize do
      @instance ||= new
    end
  end

  private_class_method :new
end
\`\`\`

### Thread Safety

The built-in \`Singleton\` module is thread-safe. Manual implementations need explicit synchronization.`,
  exercises: [
    {
      id: 'rb-singleton-1',
      title: 'Include Singleton',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use the Singleton module.',
      skeleton: `require 'singleton'

class Database
  ___ Singleton

  attr_reader :connection

  def initialize
    @connection = "connected"
  end
end

db = Database.___
puts db.connection`,
      solution: `require 'singleton'

class Database
  include Singleton

  attr_reader :connection

  def initialize
    @connection = "connected"
  end
end

db = Database.instance
puts db.connection`,
      hints: ['include Singleton restricts to one instance', '.instance returns the single instance', '.new is made private'],
      concepts: ['singleton_module'],
    },
    {
      id: 'rb-singleton-2',
      title: 'Singleton Identity',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Verify singleton identity.',
      skeleton: `require 'singleton'

class Registry
  include Singleton
end

a = Registry.instance
b = Registry.instance
puts a.___(b)  # true - same object`,
      solution: `require 'singleton'

class Registry
  include Singleton
end

a = Registry.instance
b = Registry.instance
puts a.equal?(b)  # true - same object`,
      hints: ['equal? checks object identity', 'Both references point to the same object', 'Singleton guarantees a single instance'],
      concepts: ['object_identity'],
    },
    {
      id: 'rb-singleton-3',
      title: 'Module as Singleton',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use a module as a singleton.',
      skeleton: `___ AppState
  @data = {}

  def self.set(key, value)
    @data[key] = value
  end

  def self.get(key)
    @data[key]
  end

  def self.all
    @data.dup
  end
end

AppState.set(:env, "production")
puts AppState.get(:env)`,
      solution: `module AppState
  @data = {}

  def self.set(key, value)
    @data[key] = value
  end

  def self.get(key)
    @data[key]
  end

  def self.all
    @data.dup
  end
end

AppState.set(:env, "production")
puts AppState.get(:env)`,
      hints: ['Modules cannot be instantiated', 'Module-level methods act as singleton methods', 'State is stored in module instance variables'],
      concepts: ['module_singleton'],
    },
    {
      id: 'rb-singleton-4',
      title: 'Private Constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Make the constructor private for a manual singleton.',
      skeleton: `class Logger
  @instance = nil

  def self.instance
    @instance ||= new
  end

  ___  :new

  def log(msg)
    puts "[LOG] \\\#{msg}"
  end
end

Logger.instance.log("hello")`,
      solution: `class Logger
  @instance = nil

  def self.instance
    @instance ||= new
  end

  private_class_method :new

  def log(msg)
    puts "[LOG] \\\#{msg}"
  end
end

Logger.instance.log("hello")`,
      hints: ['private_class_method :new prevents external instantiation', 'Only the class itself can call new', 'instance is the only way to get the object'],
      concepts: ['private_class_method'],
    },
    {
      id: 'rb-singleton-5',
      title: 'Thread-Safe Singleton',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Make a thread-safe singleton without the Singleton module.',
      skeleton: `class Cache
  @instance = nil
  @___ = Mutex.new

  def self.instance
    @mutex.___ do
      @instance ||= new
    end
  end

  private_class_method :new

  def initialize
    @store = {}
  end
end`,
      solution: `class Cache
  @instance = nil
  @mutex = Mutex.new

  def self.instance
    @mutex.synchronize do
      @instance ||= new
    end
  end

  private_class_method :new

  def initialize
    @store = {}
  end
end`,
      hints: ['Use a Mutex to prevent race conditions', 'synchronize ensures only one thread creates the instance', 'Without this, multiple threads could create multiple instances'],
      concepts: ['thread_safe_singleton', 'mutex'],
    },
    {
      id: 'rb-singleton-6',
      title: 'Singleton with Configuration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Create a configurable singleton.',
      skeleton: `require 'singleton'

class Settings
  include Singleton

  attr_accessor :host, :port, :debug

  def initialize
    @host = "localhost"
    @port = 3000
    @debug = false
  end

  def self.___(& block)
    block.call(instance)
  end
end

Settings.configure do |s|
  s.host = "0.0.0.0"
  s.debug = true
end`,
      solution: `require 'singleton'

class Settings
  include Singleton

  attr_accessor :host, :port, :debug

  def initialize
    @host = "localhost"
    @port = 3000
    @debug = false
  end

  def self.configure(&block)
    block.call(instance)
  end
end

Settings.configure do |s|
  s.host = "0.0.0.0"
  s.debug = true
end`,
      hints: ['configure yields the singleton instance to a block', 'This is a common Ruby pattern for configuration', 'The block receives the instance to set values on'],
      concepts: ['configure_pattern'],
    },
    {
      id: 'rb-singleton-7',
      title: 'Write Singleton Logger',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a singleton logger with multiple log levels.',
      skeleton: `require 'singleton'

# Write a Logger singleton with:
# - Levels: :debug, :info, :warn, :error (ascending severity)
# - level accessor (default :info)
# - log(level, msg) that only outputs if level >= current level
# - debug(msg), info(msg), warn(msg), error(msg) convenience methods
`,
      solution: `require 'singleton'

class Logger
  include Singleton

  LEVELS = { debug: 0, info: 1, warn: 2, error: 3 }

  attr_accessor :level

  def initialize
    @level = :info
  end

  def log(msg_level, msg)
    if LEVELS[msg_level] >= LEVELS[@level]
      puts "[\\\#{msg_level.upcase}] \\\#{msg}"
    end
  end

  def debug(msg) = log(:debug, msg)
  def info(msg)  = log(:info, msg)
  def warn(msg)  = log(:warn, msg)
  def error(msg) = log(:error, msg)
end

logger = Logger.instance
logger.level = :warn
logger.debug("hidden")
logger.info("hidden")
logger.warn("visible")
logger.error("visible")`,
      hints: ['Use a hash to map level symbols to numeric severity', 'Compare numeric values for filtering', 'Each convenience method delegates to log'],
      concepts: ['singleton_logger'],
    },
    {
      id: 'rb-singleton-8',
      title: 'Write Singleton Event Bus',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a singleton event bus for pub/sub.',
      skeleton: `require 'singleton'

# Write an EventBus singleton with:
# - subscribe(event, &handler) registers a handler
# - publish(event, *args) calls all handlers for that event
# - unsubscribe(event) removes all handlers for an event
# - clear removes all handlers
`,
      solution: `require 'singleton'

class EventBus
  include Singleton

  def initialize
    @handlers = Hash.new { |h, k| h[k] = [] }
  end

  def subscribe(event, &handler)
    @handlers[event] << handler
  end

  def publish(event, *args)
    @handlers[event].each { |h| h.call(*args) }
  end

  def unsubscribe(event)
    @handlers.delete(event)
  end

  def clear
    @handlers.clear
  end
end

bus = EventBus.instance
bus.subscribe(:user_created) { |name| puts "Welcome, \\\#{name}!" }
bus.subscribe(:user_created) { |name| puts "Sending email to \\\#{name}" }

bus.publish(:user_created, "Alice")`,
      hints: ['Use a hash of arrays for handlers', 'Hash.new with block creates default empty arrays', 'publish iterates and calls each handler'],
      concepts: ['event_bus', 'pub_sub'],
    },
    {
      id: 'rb-singleton-9',
      title: 'Write Singleton with Reset',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a singleton that can be reset (useful for testing).',
      skeleton: `# Write a Counter singleton (manual, not using Singleton module) with:
# - increment, decrement, value methods
# - self.reset! that creates a fresh instance (for testing)
# - Thread-safe
`,
      solution: `class Counter
  @instance = nil
  @mutex = Mutex.new

  def self.instance
    @mutex.synchronize { @instance ||= new }
  end

  def self.reset!
    @mutex.synchronize { @instance = nil }
  end

  private_class_method :new

  def initialize
    @count = 0
    @lock = Mutex.new
  end

  def increment
    @lock.synchronize { @count += 1 }
  end

  def decrement
    @lock.synchronize { @count -= 1 }
  end

  def value
    @lock.synchronize { @count }
  end
end

Counter.instance.increment
Counter.instance.increment
puts Counter.instance.value

Counter.reset!
puts Counter.instance.value`,
      hints: ['reset! sets @instance to nil so a new one is created', 'Use a separate mutex for the counter operations', 'This pattern is essential for testing singletons'],
      concepts: ['resettable_singleton'],
    },
    {
      id: 'rb-singleton-10',
      title: 'Write Singleton Registry',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a singleton service registry.',
      skeleton: `require 'singleton'

# Write a ServiceRegistry singleton with:
# - register(name, instance) stores a service
# - resolve(name) retrieves a service
# - registered?(name) checks existence
# - services returns all registered names
`,
      solution: `require 'singleton'

class ServiceRegistry
  include Singleton

  def initialize
    @services = {}
  end

  def register(name, instance)
    @services[name] = instance
    self
  end

  def resolve(name)
    @services.fetch(name) { raise "Service '\\\#{name}' not found" }
  end

  def registered?(name)
    @services.key?(name)
  end

  def services
    @services.keys
  end
end

reg = ServiceRegistry.instance
reg.register(:database, "PostgreSQL connection")
reg.register(:cache, "Redis connection")

puts reg.resolve(:database)
puts reg.services.inspect
puts reg.registered?(:cache)`,
      hints: ['Use a hash to map names to service instances', 'fetch with a block raises on missing services', 'This is a basic dependency injection container'],
      concepts: ['service_registry', 'dependency_injection'],
    },
    {
      id: 'rb-singleton-11',
      title: 'Write Module Singleton with State',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a module-based singleton with encapsulated state.',
      skeleton: `# Write an AppMetrics module with:
# - record(name, value) stores metrics
# - get(name) returns all recorded values for a metric
# - average(name) returns the average
# - reset! clears all metrics
`,
      solution: `module AppMetrics
  @data = Hash.new { |h, k| h[k] = [] }

  def self.record(name, value)
    @data[name] << value
  end

  def self.get(name)
    @data[name].dup
  end

  def self.average(name)
    values = @data[name]
    return 0 if values.empty?
    values.sum.to_f / values.size
  end

  def self.reset!
    @data.clear
  end
end

AppMetrics.record(:response_time, 100)
AppMetrics.record(:response_time, 150)
AppMetrics.record(:response_time, 120)

puts AppMetrics.get(:response_time).inspect
puts AppMetrics.average(:response_time)`,
      hints: ['Module instance variables hold the state', 'Hash.new with block provides default empty arrays', 'Module methods provide the singleton interface'],
      concepts: ['module_state'],
    },
    {
      id: 'rb-singleton-12',
      title: 'Write Enum-like Singleton',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a Direction enum using singleton instances.',
      skeleton: `# Write a Direction class with four singleton instances:
# - Direction::NORTH, Direction::SOUTH, Direction::EAST, Direction::WEST
# - Each has name and opposite methods
# - Cannot be instantiated externally
`,
      solution: `class Direction
  attr_reader :name

  def initialize(name, opposite_name)
    @name = name
    @opposite_name = opposite_name
  end

  def opposite
    Direction.const_get(@opposite_name)
  end

  def to_s
    @name.to_s
  end

  private_class_method :new

  NORTH = new(:north, :SOUTH)
  SOUTH = new(:south, :NORTH)
  EAST  = new(:east, :WEST)
  WEST  = new(:west, :EAST)
end

puts Direction::NORTH
puts Direction::NORTH.opposite
puts Direction::EAST.opposite`,
      hints: ['Create instances as frozen constants', 'private_class_method :new prevents external creation', 'Store the opposite as a symbol, look up with const_get'],
      concepts: ['enum_pattern', 'frozen_singletons'],
    },
    {
      id: 'rb-singleton-13',
      title: 'Fix Singleton New Error',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the code that tries to call new on a Singleton class.',
      skeleton: `require 'singleton'

class Config
  include Singleton
  attr_accessor :name
end

# Bug: can't call new on a Singleton
c = Config.new
c.name = "test"
puts c.name`,
      solution: `require 'singleton'

class Config
  include Singleton
  attr_accessor :name
end

c = Config.instance
c.name = "test"
puts c.name`,
      hints: ['Singleton makes new private', 'Use .instance instead of .new', '.instance always returns the same object'],
      concepts: ['singleton_instance'],
    },
    {
      id: 'rb-singleton-14',
      title: 'Fix Non-Thread-Safe Singleton',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Fix the race condition in a manual singleton.',
      skeleton: `class Pool
  @instance = nil

  def self.instance
    # Bug: race condition - two threads could both see nil
    @instance ||= new
  end

  private_class_method :new

  def initialize
    @connections = []
  end
end`,
      solution: `class Pool
  @instance = nil
  @mutex = Mutex.new

  def self.instance
    @mutex.synchronize do
      @instance ||= new
    end
  end

  private_class_method :new

  def initialize
    @connections = []
  end
end`,
      hints: ['||= is not atomic - two threads can enter simultaneously', 'Wrap in Mutex#synchronize', 'Or use the Singleton module which handles this'],
      concepts: ['race_condition', 'mutex'],
    },
    {
      id: 'rb-singleton-15',
      title: 'Fix Singleton Inheritance',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the singleton that shares state across subclasses.',
      skeleton: `class Base
  @instance = nil

  def self.instance
    @instance ||= new
  end

  private_class_method :new
end

class ChildA < Base; end
class ChildB < Base; end

# Bug: ChildA and ChildB share the same @instance from Base
puts ChildA.instance.equal?(ChildB.instance)  # true! should be false`,
      solution: `class Base
  def self.instance
    @instance ||= new
  end

  private_class_method :new
end

class ChildA < Base
  private_class_method :new
end

class ChildB < Base
  private_class_method :new
end

puts ChildA.instance.equal?(ChildB.instance)  # false`,
      hints: ['Class instance variables are per-class, not inherited', 'Remove the @instance = nil from Base (it only sets it on Base)', 'Each class gets its own @instance via ||='],
      concepts: ['class_instance_variables'],
    },
    {
      id: 'rb-singleton-16',
      title: 'Predict Singleton Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict singleton instance identity.',
      skeleton: `require 'singleton'

class S
  include Singleton
  attr_accessor :value
end

a = S.instance
a.value = 42
b = S.instance
puts b.value
puts a.equal?(b)`,
      solution: `42
true`,
      hints: ['a and b are the same object', 'Setting value on a is visible through b', 'Singleton ensures single instance'],
      concepts: ['singleton_identity'],
    },
    {
      id: 'rb-singleton-17',
      title: 'Predict Module State',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict module singleton state.',
      skeleton: `module Counter
  @count = 0
  def self.increment = @count += 1
  def self.count = @count
end

Counter.increment
Counter.increment
Counter.increment

# Another reference
C = Counter
C.increment

puts Counter.count`,
      solution: `4`,
      hints: ['C = Counter creates an alias, not a copy', 'Both Counter and C refer to the same module', 'All increments affect the same @count'],
      concepts: ['module_aliasing'],
    },
    {
      id: 'rb-singleton-18',
      title: 'Predict Singleton Clone',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict what happens when cloning a singleton.',
      skeleton: `require 'singleton'

class Unique
  include Singleton
end

begin
  Unique.instance.clone
rescue TypeError => e
  puts e.message
end

begin
  Unique.instance.dup
rescue TypeError => e
  puts e.message
end`,
      solution: `can't clone instance of singleton Unique
can't dup instance of singleton Unique`,
      hints: ['Singleton prevents both clone and dup', 'This ensures only one instance exists', 'Both raise TypeError'],
      concepts: ['singleton_clone'],
    },
    {
      id: 'rb-singleton-19',
      title: 'Refactor Global Variable to Singleton',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor global variable state to a singleton.',
      skeleton: `$app_config = {
  debug: false,
  log_level: :info,
  max_retries: 3
}

def configure(key, value)
  $app_config[key] = value
end

def config(key)
  $app_config[key]
end

configure(:debug, true)
puts config(:debug)`,
      solution: `require 'singleton'

class AppConfig
  include Singleton

  attr_accessor :debug, :log_level, :max_retries

  def initialize
    @debug = false
    @log_level = :info
    @max_retries = 3
  end
end

AppConfig.instance.debug = true
puts AppConfig.instance.debug`,
      hints: ['Replace global variable with a Singleton class', 'Use attr_accessor for each config key', 'This provides type safety and encapsulation'],
      concepts: ['global_to_singleton'],
    },
    {
      id: 'rb-singleton-20',
      title: 'Refactor Singleton Module to Class',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor a module singleton to use the Singleton module for testability.',
      skeleton: `module Cache
  @store = {}

  def self.set(key, value)
    @store[key] = value
  end

  def self.get(key)
    @store[key]
  end

  def self.clear
    @store.clear
  end

  def self.size
    @store.size
  end
end

# Problem: can't easily mock or replace in tests`,
      solution: `require 'singleton'

class Cache
  include Singleton

  def initialize
    @store = {}
  end

  def set(key, value)
    @store[key] = value
  end

  def get(key)
    @store[key]
  end

  def clear
    @store.clear
  end

  def size
    @store.size
  end
end

Cache.instance.set(:name, "Alice")
puts Cache.instance.get(:name)
puts Cache.instance.size`,
      hints: ['Convert module methods to instance methods', 'Use include Singleton', 'Now the cache can be dependency-injected for testing'],
      concepts: ['module_to_class_singleton', 'testability'],
    },
  ],
};
