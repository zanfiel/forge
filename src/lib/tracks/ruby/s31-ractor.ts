import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-ractor',
  title: '31. Ractor',
  explanation: `## Ractors in Ruby

Ractors (Ruby 3.0+) enable true parallel execution by isolating state between actors. Each Ractor has its own GVL.

### Creating Ractors

\`\`\`ruby
r = Ractor.new do
  puts "Hello from Ractor!"
end
r.take  # wait for completion
\`\`\`

### Sending and Receiving Messages

\`\`\`ruby
# Sending to a Ractor
r = Ractor.new do
  msg = Ractor.receive
  puts "Got: \#{msg}"
end
r.send("Hello")
r.take

# Taking from a Ractor (return value)
r = Ractor.new { 2 + 3 }
puts r.take  # => 5
\`\`\`

### Shareable Objects

\`\`\`ruby
# Frozen objects are shareable
frozen_str = "hello".freeze
r = Ractor.new(frozen_str) { |s| s.upcase }
puts r.take  # => "HELLO"

# Make objects shareable
obj = Ractor.make_shareable([1, 2, 3].freeze)
\`\`\`

### Parallel Execution

\`\`\`ruby
ractors = 4.times.map do |i|
  Ractor.new(i) do |n|
    # CPU-bound work runs in parallel
    (1..100000).sum * n
  end
end

results = ractors.map(&:take)
\`\`\`

### Message Passing Patterns

\`\`\`ruby
# Pipeline
r1 = Ractor.new { Ractor.yield(10) }
r2 = Ractor.new(r1) { |src| Ractor.yield(src.take * 2) }
puts r2.take  # => 20
\`\`\``,
  exercises: [
    {
      id: 'rb-ractor-1',
      title: 'Create a Ractor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Create a Ractor and take its result.',
      skeleton: `r = ___.new do
  42
end
puts r.___`,
      solution: `r = Ractor.new do
  42
end
puts r.take`,
      hints: ['Ractor.new creates a new Ractor', '.take retrieves the Ractor result', 'The last expression is the return value'],
      concepts: ['ractor_new', 'take'],
    },
    {
      id: 'rb-ractor-2',
      title: 'Send Message to Ractor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Send a message to a Ractor and receive it.',
      skeleton: `r = Ractor.new do
  msg = Ractor.___
  msg.upcase
end
r.___("hello")
puts r.take`,
      solution: `r = Ractor.new do
  msg = Ractor.receive
  msg.upcase
end
r.send("hello")
puts r.take`,
      hints: ['Ractor.receive waits for an incoming message', '.send(value) sends a message to the Ractor', 'Strings are moved by default (not shared)'],
      concepts: ['send', 'receive'],
    },
    {
      id: 'rb-ractor-3',
      title: 'Pass Argument to Ractor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Pass an argument to a Ractor at creation time.',
      skeleton: `r = Ractor.new(10) do |___| 
  n * n
end
puts r.take  # => 100`,
      solution: `r = Ractor.new(10) do |n|
  n * n
end
puts r.take  # => 100`,
      hints: ['Arguments passed to Ractor.new are yielded to the block', 'The block parameter receives the argument', 'Values are copied or moved into the Ractor'],
      concepts: ['ractor_arguments'],
    },
    {
      id: 'rb-ractor-4',
      title: 'Ractor.yield',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use Ractor.yield to produce intermediate values.',
      skeleton: `r = Ractor.new do
  Ractor.___(1)
  Ractor.___(2)
  3
end
puts r.take  # => 1
puts r.take  # => 2
puts r.take  # => 3`,
      solution: `r = Ractor.new do
  Ractor.yield(1)
  Ractor.yield(2)
  3
end
puts r.take  # => 1
puts r.take  # => 2
puts r.take  # => 3`,
      hints: ['Ractor.yield sends a value to the outer Ractor', 'take retrieves yielded values in order', 'The final value is the block return value'],
      concepts: ['ractor_yield'],
    },
    {
      id: 'rb-ractor-5',
      title: 'Frozen Shareable Object',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Pass a frozen object to a Ractor.',
      skeleton: `data = [1, 2, 3].___
r = Ractor.new(data) do |arr|
  arr.sum
end
puts r.take  # => 6`,
      solution: `data = [1, 2, 3].freeze
r = Ractor.new(data) do |arr|
  arr.sum
end
puts r.take  # => 6`,
      hints: ['Frozen objects can be shared between Ractors', '.freeze makes an object immutable', 'Non-frozen mutable objects are moved, not shared'],
      concepts: ['freeze', 'shareable'],
    },
    {
      id: 'rb-ractor-6',
      title: 'Ractor.select',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Use Ractor.select to wait for the first result.',
      skeleton: `r1 = Ractor.new { sleep 0.1; "slow" }
r2 = Ractor.new { "fast" }

ractor, result = Ractor.___(r1, r2)
puts result`,
      solution: `r1 = Ractor.new { sleep 0.1; "slow" }
r2 = Ractor.new { "fast" }

ractor, result = Ractor.select(r1, r2)
puts result`,
      hints: ['Ractor.select waits for any of the given Ractors', 'Returns [ractor, value] pair', 'The fastest Ractor to yield/return wins'],
      concepts: ['ractor_select'],
    },
    {
      id: 'rb-ractor-7',
      title: 'Write Parallel Computation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write parallel sum computation using Ractors.',
      skeleton: `# Write a parallel_sum method that:
# - Takes an array and splits it into n chunks
# - Creates one Ractor per chunk to compute the partial sum
# - Collects and returns the total sum
# Example: parallel_sum([1,2,3,4,5,6,7,8], 2) => 36
`,
      solution: `def parallel_sum(array, n)
  chunk_size = (array.size.to_f / n).ceil
  chunks = array.each_slice(chunk_size).to_a

  ractors = chunks.map do |chunk|
    Ractor.new(chunk) { |c| c.sum }
  end

  ractors.map(&:take).sum
end

puts parallel_sum([1, 2, 3, 4, 5, 6, 7, 8], 2)`,
      hints: ['Use each_slice to divide the array into chunks', 'Pass each chunk to a Ractor as an argument', 'Collect all results with map(&:take) and sum them'],
      concepts: ['parallel_computation', 'data_partitioning'],
    },
    {
      id: 'rb-ractor-8',
      title: 'Write Ractor Pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a pipeline of Ractors that process data in stages.',
      skeleton: `# Write a 3-stage Ractor pipeline:
# Stage 1: receives a number, doubles it, yields result
# Stage 2: takes from stage 1, adds 10, yields result
# Stage 3: takes from stage 2, converts to string "Result: N"
# Send 5 to stage 1, get final result from stage 3
`,
      solution: `stage1 = Ractor.new do
  n = Ractor.receive
  Ractor.yield(n * 2)
end

stage2 = Ractor.new(stage1) do |src|
  n = src.take
  Ractor.yield(n + 10)
end

stage3 = Ractor.new(stage2) do |src|
  n = src.take
  "Result: \#{n}"
end

stage1.send(5)
puts stage3.take`,
      hints: ['Each stage takes from the previous stage', 'Pass the previous Ractor as an argument to the next', 'stage1 receives, stage2/3 take from upstream'],
      concepts: ['pipeline', 'ractor_chain'],
    },
    {
      id: 'rb-ractor-9',
      title: 'Write Worker Pool with Ractors',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a Ractor-based worker pool.',
      skeleton: `# Write a worker pool:
# - Create 3 worker Ractors
# - Each worker loops: receives a number, yields its square
# - Main sends numbers 1..6 to workers (round-robin)
# - Main collects all results
# - Workers receive :stop to terminate
`,
      solution: `workers = 3.times.map do
  Ractor.new do
    loop do
      msg = Ractor.receive
      break if msg == :stop
      Ractor.yield(msg ** 2)
    end
  end
end

results = []
(1..6).each_with_index do |n, i|
  workers[i % 3].send(n)
  _, result = Ractor.select(*workers)
  results << result
end

workers.each { |w| w.send(:stop) }
puts results.sort.inspect`,
      hints: ['Workers loop receiving messages and yielding results', 'Use Ractor.select to collect from any ready worker', 'Send :stop to terminate each worker'],
      concepts: ['worker_pool', 'ractor_select'],
    },
    {
      id: 'rb-ractor-10',
      title: 'Write a Ractor-Safe Cache',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a cache server Ractor that handles get/set messages.',
      skeleton: `# Write a cache Ractor:
# - Receives messages: [:set, key, value] or [:get, key, reply_ractor]
# - For :set, stores key-value pair
# - For :get, sends result back to reply_ractor
# - :stop terminates
`,
      solution: `cache = Ractor.new do
  store = {}
  loop do
    msg = Ractor.receive
    case msg[0]
    when :set
      store[msg[1]] = msg[2]
    when :get
      key, reply = msg[1], msg[2]
      reply.send(store[key])
    when :stop
      break
    end
  end
end

cache.send([:set, :name, "Alice"])
cache.send([:set, :age, 30])

reply = Ractor.new { Ractor.receive }
cache.send([:get, :name, reply])
puts reply.take

cache.send([:stop])`,
      hints: ['The cache Ractor loops receiving messages', 'Use an array as a message protocol: [command, args...]', 'For :get, send the result to the reply Ractor'],
      concepts: ['actor_pattern', 'message_protocol'],
    },
    {
      id: 'rb-ractor-11',
      title: 'Write make_shareable Usage',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use Ractor.make_shareable to share complex data.',
      skeleton: `# Create a configuration hash with nested data:
# { host: "localhost", ports: [3000, 3001], options: { ssl: true } }
# Make it shareable and pass to 2 Ractors that each read different fields
`,
      solution: `config = Ractor.make_shareable({
  host: "localhost",
  ports: [3000, 3001],
  options: { ssl: true }
})

r1 = Ractor.new(config) do |cfg|
  "Host: \#{cfg[:host]}"
end

r2 = Ractor.new(config) do |cfg|
  "Ports: \#{cfg[:ports].join(', ')}"
end

puts r1.take
puts r2.take`,
      hints: ['Ractor.make_shareable deep-freezes the object', 'Shareable objects can be passed to multiple Ractors', 'All nested objects are also frozen'],
      concepts: ['make_shareable', 'deep_freeze'],
    },
    {
      id: 'rb-ractor-12',
      title: 'Write Ractor with Multiple Receives',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Ractor that accumulates multiple messages.',
      skeleton: `# Write a Ractor that:
# - Receives numbers until it gets :done
# - Returns the sum of all received numbers
# Send it 10, 20, 30, :done and take the result
`,
      solution: `r = Ractor.new do
  total = 0
  loop do
    msg = Ractor.receive
    break if msg == :done
    total += msg
  end
  total
end

r.send(10)
r.send(20)
r.send(30)
r.send(:done)
puts r.take`,
      hints: ['Loop calling Ractor.receive until sentinel', 'Accumulate into a local variable', 'The block return value is what take returns'],
      concepts: ['receive_loop', 'accumulator'],
    },
    {
      id: 'rb-ractor-13',
      title: 'Fix Non-Shareable Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the Ractor isolation violation.',
      skeleton: `greeting = "Hello"

r = Ractor.new do
  # Error: can't access non-shareable greeting from main
  puts greeting
end
r.take`,
      solution: `greeting = "Hello".freeze

r = Ractor.new(greeting) do |msg|
  puts msg
end
r.take`,
      hints: ['Ractors cannot access outer scope variables', 'Pass data as arguments to Ractor.new', 'Freeze strings to make them shareable'],
      concepts: ['ractor_isolation', 'shareable'],
    },
    {
      id: 'rb-ractor-14',
      title: 'Fix Moved Object Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the error when accessing a moved object.',
      skeleton: `data = [1, 2, 3]

r1 = Ractor.new(data) { |d| d.sum }
r2 = Ractor.new(data) { |d| d.max }
# Error: data was moved to r1, can't send to r2

puts r1.take
puts r2.take`,
      solution: `data = [1, 2, 3].freeze

r1 = Ractor.new(data) { |d| d.sum }
r2 = Ractor.new(data) { |d| d.max }

puts r1.take
puts r2.take`,
      hints: ['Mutable objects are moved, not copied', 'After moving to r1, data is no longer accessible', 'Freeze the array to make it shareable instead of moved'],
      concepts: ['move_semantics', 'freeze'],
    },
    {
      id: 'rb-ractor-15',
      title: 'Fix Ractor Constant Access',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Fix Ractor accessing a mutable constant.',
      skeleton: `CONFIG = { timeout: 30 }

r = Ractor.new do
  # Error: can't access non-shareable constant CONFIG
  puts CONFIG[:timeout]
end
r.take`,
      solution: `CONFIG = { timeout: 30 }.freeze

r = Ractor.new do
  puts CONFIG[:timeout]
end
r.take`,
      hints: ['Constants must be shareable (frozen) for Ractor access', 'Freeze the hash to make it shareable', 'Frozen constants can be accessed from any Ractor'],
      concepts: ['ractor_constants', 'shareable'],
    },
    {
      id: 'rb-ractor-16',
      title: 'Predict Ractor Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict the output of basic Ractor operations.',
      skeleton: `r = Ractor.new do
  a = Ractor.receive
  b = Ractor.receive
  a + b
end

r.send(10)
r.send(20)
puts r.take`,
      solution: `30`,
      hints: ['The Ractor receives two messages: 10 and 20', 'It adds them together', 'take returns the final result'],
      concepts: ['ractor_receive'],
    },
    {
      id: 'rb-ractor-17',
      title: 'Predict Ractor.yield Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of Ractor.yield.',
      skeleton: `r = Ractor.new do
  Ractor.yield("first")
  Ractor.yield("second")
  "final"
end

puts r.take
puts r.take
puts r.take`,
      solution: `first
second
final`,
      hints: ['Each Ractor.yield pauses until the value is taken', 'take retrieves yielded values in order', 'The block return value is the last take'],
      concepts: ['ractor_yield_order'],
    },
    {
      id: 'rb-ractor-18',
      title: 'Predict Move Semantics',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict what happens when an object is moved to a Ractor.',
      skeleton: `arr = [1, 2, 3]
r = Ractor.new(arr) { |a| a.length }

begin
  puts arr.length
rescue => e
  puts e.class
end
puts r.take`,
      solution: `Ractor::MovedError
3`,
      hints: ['Mutable objects are moved into the Ractor', 'The original reference becomes invalid', 'Accessing a moved object raises Ractor::MovedError'],
      concepts: ['moved_error', 'move_semantics'],
    },
    {
      id: 'rb-ractor-19',
      title: 'Refactor Threads to Ractors',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Refactor a thread-based parallel map to use Ractors.',
      skeleton: `# Thread-based (limited by GVL for CPU work)
def parallel_squares(numbers)
  mutex = Mutex.new
  results = []
  threads = numbers.map do |n|
    Thread.new do
      result = n ** 2
      mutex.synchronize { results << [n, result] }
    end
  end
  threads.each(&:join)
  results.sort_by(&:first).map(&:last)
end

puts parallel_squares([1, 2, 3, 4]).inspect`,
      solution: `def parallel_squares(numbers)
  ractors = numbers.map do |n|
    Ractor.new(n) { |num| [num, num ** 2] }
  end
  ractors.map(&:take).sort_by(&:first).map(&:last)
end

puts parallel_squares([1, 2, 3, 4]).inspect`,
      hints: ['Each Ractor computes one result independently', 'No mutex needed since Ractors are isolated', 'Ractors achieve true parallelism for CPU-bound work'],
      concepts: ['threads_to_ractors', 'true_parallelism'],
    },
    {
      id: 'rb-ractor-20',
      title: 'Refactor Global State to Actor',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Refactor shared mutable state to a Ractor-based actor.',
      skeleton: `# Thread-unsafe global counter
$counter = 0
$mutex = Mutex.new

def increment
  $mutex.synchronize { $counter += 1 }
end

def get_count
  $mutex.synchronize { $counter }
end

threads = 10.times.map { Thread.new { 100.times { increment } } }
threads.each(&:join)
puts get_count`,
      solution: `counter = Ractor.new do
  count = 0
  loop do
    msg = Ractor.receive
    case msg
    when :increment
      count += 1
    when :get
      Ractor.yield(count)
    when :stop
      break count
    end
  end
end

ractors = 10.times.map do
  Ractor.new(counter) do |c|
    100.times { c.send(:increment) }
  end
end
ractors.each(&:take)

counter.send(:get)
puts counter.take
counter.send(:stop)`,
      hints: ['Encapsulate mutable state inside a single Ractor', 'Use message passing instead of shared state', 'The counter Ractor is the single source of truth'],
      concepts: ['actor_model', 'encapsulated_state'],
    },
  ],
};
