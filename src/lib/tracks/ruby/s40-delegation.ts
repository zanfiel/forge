import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-delegate',
  title: '40. Delegation',
  explanation: `## Delegation in Ruby

Delegation forwards method calls from one object to another. Ruby provides several built-in delegation mechanisms.

### Forwardable

\`\`\`ruby
require 'forwardable'

class Printer
  extend Forwardable

  def_delegators :@queue, :push, :pop, :size
  def_delegator :@queue, :first, :next_job

  def initialize
    @queue = []
  end
end
\`\`\`

### SimpleDelegator

\`\`\`ruby
require 'delegate'

class UserPresenter < SimpleDelegator
  def full_title
    "Mr/Ms \#{name}"  # name delegated to wrapped object
  end
end

user = OpenStruct.new(name: "Alice", email: "a@b.com")
presenter = UserPresenter.new(user)
puts presenter.name        # delegated
puts presenter.full_title  # custom
\`\`\`

### DelegateClass

\`\`\`ruby
require 'delegate'

class MyArray < DelegateClass(Array)
  def initialize
    super([])
  end

  def push_unique(val)
    push(val) unless include?(val)
  end
end
\`\`\`

### Manual Delegation

\`\`\`ruby
class Team
  def initialize
    @members = []
  end

  def method_missing(name, *args, &block)
    if @members.respond_to?(name)
      @members.send(name, *args, &block)
    else
      super
    end
  end
end
\`\`\``,
  exercises: [
    {
      id: 'rb-delegate-1',
      title: 'def_delegators',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use Forwardable to delegate methods.',
      skeleton: `require 'forwardable'

class TaskList
  ___ Forwardable

  ___ :@tasks, :push, :size, :each

  def initialize
    @tasks = []
  end
end`,
      solution: `require 'forwardable'

class TaskList
  extend Forwardable

  def_delegators :@tasks, :push, :size, :each

  def initialize
    @tasks = []
  end
end`,
      hints: ['extend Forwardable adds the delegation DSL', 'def_delegators delegates multiple methods to a target', 'First argument is the target, rest are method names'],
      concepts: ['forwardable', 'def_delegators'],
    },
    {
      id: 'rb-delegate-2',
      title: 'def_delegator with Alias',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Delegate with a different method name.',
      skeleton: `require 'forwardable'

class Stack
  extend Forwardable

  ___ :@data, :push, :add
  ___ :@data, :pop, :remove
  def_delegators :@data, :size, :empty?

  def initialize
    @data = []
  end
end`,
      solution: `require 'forwardable'

class Stack
  extend Forwardable

  def_delegator :@data, :push, :add
  def_delegator :@data, :pop, :remove
  def_delegators :@data, :size, :empty?

  def initialize
    @data = []
  end
end`,
      hints: ['def_delegator takes target, method, alias', 'def_delegator :@data, :push, :add means calling add calls @data.push', 'Singular form for renaming, plural for direct delegation'],
      concepts: ['def_delegator', 'alias_delegation'],
    },
    {
      id: 'rb-delegate-3',
      title: 'SimpleDelegator Basic',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Create a SimpleDelegator wrapper.',
      skeleton: `require 'delegate'

class LoudString < ___
  def shout
    upcase + "!!!"
  end
end

ls = LoudString.new("hello")
puts ls.length  # delegated to String
puts ls.shout   # custom method`,
      solution: `require 'delegate'

class LoudString < SimpleDelegator
  def shout
    upcase + "!!!"
  end
end

ls = LoudString.new("hello")
puts ls.length  # delegated to String
puts ls.shout   # custom method`,
      hints: ['SimpleDelegator forwards all methods to the wrapped object', 'Inherit from SimpleDelegator', 'The constructor takes the object to wrap'],
      concepts: ['simple_delegator'],
    },
    {
      id: 'rb-delegate-4',
      title: 'Access Wrapped Object',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Access the underlying object in a SimpleDelegator.',
      skeleton: `require 'delegate'

class UserPresenter < SimpleDelegator
  def display_name
    "\\\#{name} <\\\#{email}>"
  end

  def original_class
    ___.___.name
  end
end`,
      solution: `require 'delegate'

class UserPresenter < SimpleDelegator
  def display_name
    "\\\#{name} <\\\#{email}>"
  end

  def original_class
    __getobj__.class.name
  end
end`,
      hints: ['__getobj__ returns the wrapped object', 'It bypasses the delegation', 'Useful when you need to check the underlying type'],
      concepts: ['__getobj__'],
    },
    {
      id: 'rb-delegate-5',
      title: 'DelegateClass',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use DelegateClass to create a typed delegator.',
      skeleton: `require 'delegate'

class UniqueArray < ___(Array)
  def initialize
    super([])
  end

  def push(val)
    super unless include?(val)
    self
  end
end`,
      solution: `require 'delegate'

class UniqueArray < DelegateClass(Array)
  def initialize
    super([])
  end

  def push(val)
    super unless include?(val)
    self
  end
end`,
      hints: ['DelegateClass(ClassName) creates a delegator for that class', 'It generates delegation methods at class definition time', 'super calls the original Array#push'],
      concepts: ['delegate_class'],
    },
    {
      id: 'rb-delegate-6',
      title: 'Change Delegated Object',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Change the underlying object at runtime.',
      skeleton: `require 'delegate'

class Proxy < SimpleDelegator
end

proxy = Proxy.new("hello")
puts proxy.upcase

proxy.___(42)
puts proxy + 8`,
      solution: `require 'delegate'

class Proxy < SimpleDelegator
end

proxy = Proxy.new("hello")
puts proxy.upcase

proxy.__setobj__(42)
puts proxy + 8`,
      hints: ['__setobj__ changes the wrapped object', 'The proxy now delegates to a different object', 'This allows swapping implementations at runtime'],
      concepts: ['__setobj__'],
    },
    {
      id: 'rb-delegate-7',
      title: 'Write Presenter Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a presenter using SimpleDelegator.',
      skeleton: `require 'delegate'
require 'ostruct'

# Write a ProductPresenter that wraps a Product:
# - price_display returns formatted "$XX.XX"
# - on_sale? returns true if discount > 0
# - sale_price returns price * (1 - discount)
# - description_short returns first 50 chars of description + "..."
`,
      solution: `require 'delegate'
require 'ostruct'

class ProductPresenter < SimpleDelegator
  def price_display
    "$\\\#{format('%.2f', price)}"
  end

  def on_sale?
    discount > 0
  end

  def sale_price
    price * (1 - discount)
  end

  def description_short
    if description.length > 50
      description[0...50] + "..."
    else
      description
    end
  end
end

product = OpenStruct.new(
  name: "Widget",
  price: 29.99,
  discount: 0.15,
  description: "A fantastic widget that does amazing things and makes life easier"
)

presenter = ProductPresenter.new(product)
puts presenter.name
puts presenter.price_display
puts presenter.on_sale?
puts presenter.sale_price.round(2)
puts presenter.description_short`,
      hints: ['SimpleDelegator forwards all Product methods automatically', 'Override or add methods for presentation logic', 'name, price, etc. are delegated to the product'],
      concepts: ['presenter_pattern'],
    },
    {
      id: 'rb-delegate-8',
      title: 'Write Forwardable Collection',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a collection class using Forwardable.',
      skeleton: `require 'forwardable'

# Write a Playlist class that:
# - Has an internal @songs array
# - Delegates: push (as add), size (as count), each, map, select, empty?
# - Custom method: duration returns sum of all song durations
# - Custom method: by_artist(name) filters songs by artist
`,
      solution: `require 'forwardable'

class Playlist
  extend Forwardable
  include Enumerable

  def_delegator :@songs, :push, :add
  def_delegator :@songs, :size, :count
  def_delegators :@songs, :each, :empty?

  def initialize
    @songs = []
  end

  def duration
    @songs.sum { |s| s[:duration] }
  end

  def by_artist(name)
    @songs.select { |s| s[:artist] == name }
  end
end

pl = Playlist.new
pl.add({ title: "Song A", artist: "X", duration: 180 })
pl.add({ title: "Song B", artist: "Y", duration: 240 })
pl.add({ title: "Song C", artist: "X", duration: 200 })

puts "Count: \\\#{pl.count}"
puts "Duration: \\\#{pl.duration}s"
puts "By X: \\\#{pl.by_artist('X').map { |s| s[:title] }.inspect}"`,
      hints: ['Use def_delegator for renaming, def_delegators for direct delegation', 'Include Enumerable for free collection methods', 'Custom methods access @songs directly'],
      concepts: ['forwardable_collection'],
    },
    {
      id: 'rb-delegate-9',
      title: 'Write Lazy Delegator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a delegator that lazily initializes the wrapped object.',
      skeleton: `require 'delegate'

# Write a LazyProxy class that:
# - Takes a block in initialize (not an object)
# - Only creates the wrapped object when first accessed
# - Delegates all methods to the lazily-created object
`,
      solution: `require 'delegate'

class LazyProxy < SimpleDelegator
  def initialize(&block)
    @factory = block
    @initialized = false
    super(nil)
  end

  def __getobj__
    unless @initialized
      __setobj__(@factory.call)
      @initialized = true
    end
    super
  end

  def method_missing(name, *args, &block)
    __getobj__.send(name, *args, &block)
  end
end

expensive = LazyProxy.new do
  puts "Creating expensive object..."
  [1, 2, 3, 4, 5]
end

puts "Proxy created, object not yet initialized"
puts expensive.length  # triggers creation
puts expensive.sum     # already created`,
      hints: ['Store the factory block, do not call it yet', 'Override __getobj__ to initialize on first access', 'SimpleDelegator can start with nil and be set later'],
      concepts: ['lazy_initialization', 'proxy_pattern'],
    },
    {
      id: 'rb-delegate-10',
      title: 'Write Method Missing Delegator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write manual delegation using method_missing.',
      skeleton: `# Write a LoggingProxy class that:
# - Wraps any object
# - Delegates all method calls via method_missing
# - Logs each call with method name and arguments
# - Also implement respond_to_missing?
`,
      solution: `class LoggingProxy
  def initialize(target)
    @target = target
  end

  def method_missing(name, *args, &block)
    if @target.respond_to?(name)
      puts "[CALL] \\\#{name}(\\\#{args.map(&:inspect).join(', ')})"
      @target.send(name, *args, &block)
    else
      super
    end
  end

  def respond_to_missing?(name, include_private = false)
    @target.respond_to?(name, include_private) || super
  end
end

proxy = LoggingProxy.new([1, 2, 3])
proxy.push(4)
puts proxy.length
puts proxy.include?(2)`,
      hints: ['Check if target responds to the method', 'Log before forwarding the call', 'respond_to_missing? makes respond_to? work correctly'],
      concepts: ['method_missing_delegation', 'respond_to_missing'],
    },
    {
      id: 'rb-delegate-11',
      title: 'Write Multi-Target Delegator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a delegator that delegates to multiple objects.',
      skeleton: `# Write a MultiDelegator class that:
# - Takes multiple target objects
# - Delegates each method to the first target that responds
# - Raises NoMethodError if no target responds
`,
      solution: `class MultiDelegator
  def initialize(*targets)
    @targets = targets
  end

  def method_missing(name, *args, &block)
    target = @targets.find { |t| t.respond_to?(name) }
    if target
      target.send(name, *args, &block)
    else
      super
    end
  end

  def respond_to_missing?(name, include_private = false)
    @targets.any? { |t| t.respond_to?(name, include_private) } || super
  end
end

array_target = [1, 2, 3]
hash_target = { a: 1, b: 2 }
string_target = "hello"

md = MultiDelegator.new(array_target, hash_target, string_target)
puts md.length     # from array
puts md.keys       # from hash
puts md.upcase     # from string`,
      hints: ['Iterate targets to find one that responds', 'Use .find for first match', 'Handle respond_to_missing? for all targets'],
      concepts: ['multi_delegation'],
    },
    {
      id: 'rb-delegate-12',
      title: 'Write Decorator with Delegation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a decorator that adds caching via delegation.',
      skeleton: `require 'delegate'

# Write a CachedFetcher decorator:
# - Wraps a fetcher object that has a fetch(url) method
# - Caches results by URL
# - Returns cached result on repeated calls
# - Has a cache_clear method
`,
      solution: `require 'delegate'

class CachedFetcher < SimpleDelegator
  def initialize(fetcher)
    super
    @cache = {}
  end

  def fetch(url)
    @cache[url] ||= super
  end

  def cache_clear
    @cache.clear
  end

  def cached?(url)
    @cache.key?(url)
  end
end

fetcher = Object.new
def fetcher.fetch(url)
  puts "Fetching \\\#{url}..."
  "Content of \\\#{url}"
end

cached = CachedFetcher.new(fetcher)
puts cached.fetch("http://example.com")
puts cached.fetch("http://example.com")  # cached
puts cached.cached?("http://example.com")`,
      hints: ['super calls the wrapped fetcher.fetch', 'Store results in @cache hash', 'SimpleDelegator passes through all other methods'],
      concepts: ['decorator_pattern', 'caching'],
    },
    {
      id: 'rb-delegate-13',
      title: 'Fix Delegation Target Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the wrong delegation target.',
      skeleton: `require 'forwardable'

class Report
  extend Forwardable

  def_delegators :@data, :size, :each

  def initialize
    @data = []
    @title = "Report"
  end

  # Bug: delegates to @data instead of @title
  def_delegator :@data, :upcase, :title_upper
end`,
      solution: `require 'forwardable'

class Report
  extend Forwardable

  def_delegators :@data, :size, :each

  def initialize
    @data = []
    @title = "Report"
  end

  def_delegator :@title, :upcase, :title_upper
end`,
      hints: ['title_upper should delegate to @title, not @data', 'The first argument to def_delegator is the target', 'Change :@data to :@title'],
      concepts: ['delegation_target'],
    },
    {
      id: 'rb-delegate-14',
      title: 'Fix Missing respond_to_missing?',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the proxy that breaks respond_to? checks.',
      skeleton: `class Proxy
  def initialize(target)
    @target = target
  end

  def method_missing(name, *args, &block)
    @target.send(name, *args, &block)
  end
  # Bug: respond_to? returns false for delegated methods
end

p = Proxy.new([1, 2, 3])
puts p.respond_to?(:length)  # false! should be true`,
      solution: `class Proxy
  def initialize(target)
    @target = target
  end

  def method_missing(name, *args, &block)
    if @target.respond_to?(name)
      @target.send(name, *args, &block)
    else
      super
    end
  end

  def respond_to_missing?(name, include_private = false)
    @target.respond_to?(name, include_private) || super
  end
end

p = Proxy.new([1, 2, 3])
puts p.respond_to?(:length)  # true`,
      hints: ['Always pair method_missing with respond_to_missing?', 'respond_to_missing? makes respond_to? work correctly', 'Also add a guard in method_missing for unknown methods'],
      concepts: ['respond_to_missing'],
    },
    {
      id: 'rb-delegate-15',
      title: 'Fix SimpleDelegator Class Check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the class check that returns the wrong class.',
      skeleton: `require 'delegate'

class Enhanced < SimpleDelegator; end

obj = Enhanced.new("hello")
# Bug: class returns String, not Enhanced
puts obj.class  # String (delegated!)

# We want to check if it's an Enhanced instance
puts obj.is_a?(Enhanced)  # true
puts obj.class == Enhanced  # false!`,
      solution: `require 'delegate'

class Enhanced < SimpleDelegator
  def class
    Enhanced
  end
end

obj = Enhanced.new("hello")
puts obj.class == Enhanced  # true
puts obj.is_a?(Enhanced)    # true`,
      hints: ['SimpleDelegator delegates .class to the wrapped object', 'Override class to return the wrapper class', 'is_a? works correctly but class does not'],
      concepts: ['delegator_class'],
    },
    {
      id: 'rb-delegate-16',
      title: 'Predict Delegation Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict the output of delegated method calls.',
      skeleton: `require 'forwardable'

class Box
  extend Forwardable
  def_delegators :@items, :push, :size
  def_delegator :@items, :first, :peek

  def initialize
    @items = []
  end
end

b = Box.new
b.push("a")
b.push("b")
puts b.size
puts b.peek`,
      solution: `2
a`,
      hints: ['push delegates to @items (array)', 'size returns the count', 'peek is aliased from first'],
      concepts: ['delegation_output'],
    },
    {
      id: 'rb-delegate-17',
      title: 'Predict SimpleDelegator',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict SimpleDelegator behavior.',
      skeleton: `require 'delegate'

class Wrapper < SimpleDelegator
  def length
    super * 2
  end
end

w = Wrapper.new("hello")
puts w.length
puts w.upcase
puts w.is_a?(String)`,
      solution: `10
HELLO
true`,
      hints: ['length is overridden: super returns 5, doubled to 10', 'upcase is delegated directly to the string', 'is_a?(String) returns true (delegation)'],
      concepts: ['delegator_override'],
    },
    {
      id: 'rb-delegate-18',
      title: 'Predict __setobj__',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict behavior after changing the delegated object.',
      skeleton: `require 'delegate'

class Flex < SimpleDelegator; end

f = Flex.new("hello")
puts f.length

f.__setobj__([1, 2, 3])
puts f.length

f.__setobj__({ a: 1 })
puts f.length`,
      solution: `5
3
1`,
      hints: ['First: string "hello" length is 5', 'After swap: array [1,2,3] length is 3', 'After swap: hash {a:1} length is 1'],
      concepts: ['dynamic_delegation'],
    },
    {
      id: 'rb-delegate-19',
      title: 'Refactor Inheritance to Delegation',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor class inheritance to use delegation instead.',
      skeleton: `# Inheritance-based (tight coupling)
class EnhancedArray < Array
  def average
    sum.to_f / size
  end

  def median
    sorted = sort
    mid = size / 2
    size.odd? ? sorted[mid] : (sorted[mid-1] + sorted[mid]) / 2.0
  end
end

ea = EnhancedArray.new([1, 2, 3, 4, 5])
puts ea.average
puts ea.median`,
      solution: `require 'forwardable'

class Statistics
  extend Forwardable
  include Enumerable

  def_delegators :@data, :size, :sum, :sort, :each, :push, :[]

  def initialize(data = [])
    @data = data
  end

  def average
    sum.to_f / size
  end

  def median
    sorted = sort
    mid = size / 2
    size.odd? ? sorted[mid] : (sorted[mid-1] + sorted[mid]) / 2.0
  end
end

s = Statistics.new([1, 2, 3, 4, 5])
puts s.average
puts s.median`,
      hints: ['Favor composition over inheritance', 'Delegate only the Array methods you need', 'This avoids exposing all Array methods'],
      concepts: ['composition_over_inheritance'],
    },
    {
      id: 'rb-delegate-20',
      title: 'Refactor Wrapper to SimpleDelegator',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor manual method forwarding to use SimpleDelegator.',
      skeleton: `class UserDecorator
  def initialize(user)
    @user = user
  end

  def name
    @user.name
  end

  def email
    @user.email
  end

  def age
    @user.age
  end

  def display_name
    "\\\#{name} <\\\#{email}>"
  end

  def adult?
    age >= 18
  end
end`,
      solution: `require 'delegate'

class UserDecorator < SimpleDelegator
  def display_name
    "\\\#{name} <\\\#{email}>"
  end

  def adult?
    age >= 18
  end
end`,
      hints: ['SimpleDelegator auto-forwards all methods', 'Only define the custom methods', 'No need to manually forward name, email, age'],
      concepts: ['manual_to_simple_delegator'],
    },
  ],
};
