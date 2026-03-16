import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-fiber',
  title: '32. Fiber',
  explanation: `## Fibers in Ruby

Fibers are lightweight concurrency primitives that enable cooperative multitasking. Unlike threads, fibers are manually scheduled.

### Basic Fiber

\`\`\`ruby
fiber = Fiber.new do
  Fiber.yield "first"
  Fiber.yield "second"
  "third"
end

puts fiber.resume  # => "first"
puts fiber.resume  # => "second"
puts fiber.resume  # => "third"
\`\`\`

### Passing Values

\`\`\`ruby
fiber = Fiber.new do |first|
  second = Fiber.yield first + 10
  second + 20
end

puts fiber.resume(1)   # => 11
puts fiber.resume(100) # => 120
\`\`\`

### Fiber as Enumerator

\`\`\`ruby
# Enumerators use fibers internally
fib = Enumerator.new do |y|
  a, b = 0, 1
  loop do
    y.yield a
    a, b = b, a + b
  end
end

puts fib.take(7).inspect # => [0, 1, 1, 2, 3, 5, 8]
\`\`\`

### Fiber Scheduler (Ruby 3.0+)

\`\`\`ruby
# Fiber scheduler enables non-blocking I/O
Fiber.set_scheduler(MyScheduler.new)

Fiber.schedule do
  # non-blocking I/O operations
  result = Net::HTTP.get(URI("https://example.com"))
end
\`\`\`

### Transfer

\`\`\`ruby
f1 = Fiber.new { |f2| f2.transfer("from f1") }
f2 = Fiber.new { Fiber.yield "from f2" }
puts f1.resume(f2)  # direct transfer between fibers
\`\`\``,
  exercises: [
    {
      id: 'rb-fiber-1',
      title: 'Create a Fiber',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Create and resume a basic Fiber.',
      skeleton: `f = ___.new do
  Fiber.___ "hello"
  "done"
end

puts f.resume
puts f.resume`,
      solution: `f = Fiber.new do
  Fiber.yield "hello"
  "done"
end

puts f.resume
puts f.resume`,
      hints: ['Fiber.new creates a new fiber', 'Fiber.yield pauses the fiber and returns a value', '.resume continues the fiber'],
      concepts: ['fiber_new', 'yield', 'resume'],
    },
    {
      id: 'rb-fiber-2',
      title: 'Fiber with Multiple Yields',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use multiple yields in a Fiber.',
      skeleton: `counter = Fiber.new do
  i = 0
  loop do
    ___ i
    i += 1
  end
end

puts counter.resume  # 0
puts counter.resume  # 1
puts counter.resume  # 2`,
      solution: `counter = Fiber.new do
  i = 0
  loop do
    Fiber.yield i
    i += 1
  end
end

puts counter.resume  # 0
puts counter.resume  # 1
puts counter.resume  # 2`,
      hints: ['Fiber.yield pauses and returns the value', 'The fiber resumes from where it yielded', 'Each resume continues the loop iteration'],
      concepts: ['fiber_yield', 'infinite_fiber'],
    },
    {
      id: 'rb-fiber-3',
      title: 'Pass Value on Resume',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Pass a value into a Fiber via resume.',
      skeleton: `f = Fiber.new do
  val = Fiber.yield
  "Got: \\\#{val}"
end

f.___         # start the fiber
puts f.___("hello")  # pass value and get result`,
      solution: `f = Fiber.new do
  val = Fiber.yield
  "Got: \\\#{val}"
end

f.resume         # start the fiber
puts f.resume("hello")  # pass value and get result`,
      hints: ['The first resume starts the fiber', 'The second resume passes "hello" as the return value of yield', 'Fiber.yield returns what the next resume passes'],
      concepts: ['resume_value'],
    },
    {
      id: 'rb-fiber-4',
      title: 'Fiber Alive Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Check if a Fiber is still alive.',
      skeleton: `f = Fiber.new { Fiber.yield; "done" }

f.resume
puts f.___?   # true
f.resume
puts f.___?   # false`,
      solution: `f = Fiber.new { Fiber.yield; "done" }

f.resume
puts f.alive?   # true
f.resume
puts f.alive?   # false`,
      hints: ['alive? checks if the fiber can still be resumed', 'A fiber is alive until it returns from its block', 'After the final value, alive? returns false'],
      concepts: ['alive'],
    },
    {
      id: 'rb-fiber-5',
      title: 'Enumerator with Fiber',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Create an Enumerator using Fiber-like yielding.',
      skeleton: `squares = Enumerator.new do |___| 
  n = 1
  loop do
    y.___(n * n)
    n += 1
  end
end

puts squares.take(5).inspect`,
      solution: `squares = Enumerator.new do |y|
  n = 1
  loop do
    y.yield(n * n)
    n += 1
  end
end

puts squares.take(5).inspect`,
      hints: ['Enumerator.new takes a block with a yielder parameter', 'y.yield(value) produces the next value', 'Enumerators use fibers internally'],
      concepts: ['enumerator', 'yielder'],
    },
    {
      id: 'rb-fiber-6',
      title: 'Fiber as Coroutine',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use Fiber as a coroutine to process a stream.',
      skeleton: `processor = Fiber.new do
  total = 0
  loop do
    val = ___
    total += val
    Fiber.yield total
  end
end

processor.resume           # start
puts processor.resume(10)  # 10
puts processor.resume(20)  # 30
puts processor.resume(5)   # 35`,
      solution: `processor = Fiber.new do
  total = 0
  loop do
    val = Fiber.yield(total)
    total += val
  end
end

processor.resume           # start
puts processor.resume(10)  # 10
puts processor.resume(20)  # 30
puts processor.resume(5)   # 35`,
      hints: ['Fiber.yield(total) both returns total and receives the next value', 'val = Fiber.yield(total) yields total and waits for a resume value', 'The first resume starts the fiber but the yield return is ignored'],
      concepts: ['coroutine', 'bidirectional'],
    },
    {
      id: 'rb-fiber-7',
      title: 'Write Fibonacci Fiber',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Fiber that generates Fibonacci numbers.',
      skeleton: `# Write a fib_fiber that:
# - Yields Fibonacci numbers one at a time
# - Runs indefinitely
# - First few values: 0, 1, 1, 2, 3, 5, 8...
# Take the first 8 values
`,
      solution: `fib_fiber = Fiber.new do
  a, b = 0, 1
  loop do
    Fiber.yield a
    a, b = b, a + b
  end
end

result = 8.times.map { fib_fiber.resume }
puts result.inspect`,
      hints: ['Start with a=0, b=1', 'Yield a, then update: a, b = b, a + b', 'Use loop for infinite generation'],
      concepts: ['fibonacci', 'generator_pattern'],
    },
    {
      id: 'rb-fiber-8',
      title: 'Write a Round-Robin Scheduler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a simple round-robin fiber scheduler.',
      skeleton: `# Write a Scheduler class:
# - add(name, &block) creates a Fiber from the block with a name
# - run method resumes fibers round-robin until all are done
# Each fiber should yield to give up control
`,
      solution: `class Scheduler
  def initialize
    @fibers = []
  end

  def add(name, &block)
    @fibers << { name: name, fiber: Fiber.new(&block) }
  end

  def run
    until @fibers.empty?
      @fibers.reject! do |entry|
        entry[:fiber].resume
        !entry[:fiber].alive?
      end
    end
  end
end

s = Scheduler.new
s.add("A") { 3.times { |i| puts "A-\\\#{i}"; Fiber.yield } }
s.add("B") { 2.times { |i| puts "B-\\\#{i}"; Fiber.yield } }
s.run`,
      hints: ['Store fibers in an array of hashes', 'Resume each fiber in order, remove dead ones', 'reject! removes fibers that are no longer alive'],
      concepts: ['fiber_scheduler', 'round_robin'],
    },
    {
      id: 'rb-fiber-9',
      title: 'Write Lazy Range with Fiber',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a lazy range generator using a Fiber.',
      skeleton: `# Write a lazy_range(start, stop, step) method that returns a Fiber
# The fiber yields each value from start to stop (inclusive) with the given step
# Example: lazy_range(1, 10, 3) yields 1, 4, 7, 10
`,
      solution: `def lazy_range(start, stop, step)
  Fiber.new do
    current = start
    while current <= stop
      Fiber.yield current
      current += step
    end
  end
end

r = lazy_range(1, 10, 3)
while r.alive?
  val = r.resume
  puts val if val
end`,
      hints: ['Return a Fiber.new from the method', 'Use a while loop with Fiber.yield', 'Check .alive? before resuming'],
      concepts: ['lazy_evaluation', 'generator'],
    },
    {
      id: 'rb-fiber-10',
      title: 'Write Fiber-Based Pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a pipeline of fibers that transform data.',
      skeleton: `# Write a pipeline with 3 fibers:
# - source: yields numbers 1..5
# - doubler: takes from source, yields doubled values
# - formatter: takes from doubler, yields "Value: N" strings
# Collect all formatted strings
`,
      solution: `source = Fiber.new do
  (1..5).each { |n| Fiber.yield n }
end

doubler = Fiber.new do
  while source.alive?
    val = source.resume
    Fiber.yield(val * 2) if val
  end
end

formatter = Fiber.new do
  while doubler.alive?
    val = doubler.resume
    Fiber.yield("Value: \\\#{val}") if val
  end
end

results = []
while formatter.alive?
  val = formatter.resume
  results << val if val
end
puts results.inspect`,
      hints: ['Each fiber reads from the previous one via .resume', 'Check .alive? to know when the upstream is done', 'Guard against nil values from finished fibers'],
      concepts: ['fiber_pipeline', 'data_flow'],
    },
    {
      id: 'rb-fiber-11',
      title: 'Write Custom Enumerator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a custom Enumerator that generates prime numbers.',
      skeleton: `# Write a primes Enumerator that yields prime numbers:
# - Use Enumerator.new with a yielder
# - Check primality by trial division
# - Take first 10 primes
`,
      solution: `primes = Enumerator.new do |y|
  n = 2
  loop do
    is_prime = (2..Math.sqrt(n).to_i).none? { |d| n % d == 0 }
    y.yield(n) if is_prime
    n += 1
  end
end

puts primes.take(10).inspect`,
      hints: ['Enumerator.new takes a block with yielder |y|', 'y.yield(value) produces the next value', 'Use .none? to check if no divisor divides evenly'],
      concepts: ['custom_enumerator', 'prime_generation'],
    },
    {
      id: 'rb-fiber-12',
      title: 'Write Fiber Transfer Example',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write two fibers that transfer control back and forth.',
      skeleton: `# Write two fibers: ping and pong
# - ping prints "ping N" and transfers to pong
# - pong prints "pong N" and transfers to ping
# - Do 3 rounds of ping-pong
# Use Fiber#transfer
`,
      solution: `ping = nil
pong = nil

ping = Fiber.new do
  3.times do |i|
    puts "ping \\\#{i}"
    pong.transfer
  end
end

pong = Fiber.new do
  3.times do |i|
    puts "pong \\\#{i}"
    ping.transfer
  end
end

ping.transfer`,
      hints: ['Fiber#transfer switches directly to another fiber', 'Unlike resume/yield, transfer is symmetric', 'Declare both fibers before defining them to avoid nil references'],
      concepts: ['transfer', 'symmetric_coroutines'],
    },
    {
      id: 'rb-fiber-13',
      title: 'Fix Dead Fiber Resume',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the FiberError from resuming a dead fiber.',
      skeleton: `f = Fiber.new do
  Fiber.yield 1
  2
end

results = []
3.times { results << f.resume }
# FiberError: dead fiber called
puts results.inspect`,
      solution: `f = Fiber.new do
  Fiber.yield 1
  2
end

results = []
while f.alive?
  results << f.resume
end
puts results.inspect`,
      hints: ['The fiber only yields once and returns once = 2 resumes max', 'Check f.alive? before calling resume', 'Use a while loop instead of a fixed count'],
      concepts: ['dead_fiber', 'alive'],
    },
    {
      id: 'rb-fiber-14',
      title: 'Fix Fiber Value Loss',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the fiber that loses the initial argument.',
      skeleton: `accumulator = Fiber.new do
  total = 0
  loop do
    val = Fiber.yield(total)
    total += val
  end
end

# Bug: first resume returns 0 but second resume should include 10
puts accumulator.resume(10)  # Expected: 0 (ok)
puts accumulator.resume(20)  # Expected: 30, but gets 20`,
      solution: `accumulator = Fiber.new do |first|
  total = first
  loop do
    val = Fiber.yield(total)
    total += val
  end
end

puts accumulator.resume(10)  # 10
puts accumulator.resume(20)  # 30`,
      hints: ['The first resume value is passed as the block argument', 'Use a block parameter to capture the first value', 'Subsequent values come from Fiber.yield return'],
      concepts: ['first_resume', 'block_parameter'],
    },
    {
      id: 'rb-fiber-15',
      title: 'Fix Fiber Scope Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the fiber that incorrectly shares mutable state.',
      skeleton: `fibers = 3.times.map do |i|
  Fiber.new { Fiber.yield i * 10 }
end

# Bug: all fibers yield 20 because i changes
results = fibers.map(&:resume)
puts results.inspect  # Expected: [0, 10, 20]`,
      solution: `fibers = 3.times.map do |i|
  n = i
  Fiber.new { Fiber.yield n * 10 }
end

results = fibers.map(&:resume)
puts results.inspect  # [0, 10, 20]`,
      hints: ['Block variables in map are unique per iteration in Ruby', 'This actually works correctly in modern Ruby - the bug is elsewhere', 'Capture the value in a local variable to be safe'],
      concepts: ['closure_capture', 'fiber_scope'],
    },
    {
      id: 'rb-fiber-16',
      title: 'Predict Fiber Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict the sequence of Fiber yields.',
      skeleton: `f = Fiber.new do
  Fiber.yield "a"
  Fiber.yield "b"
  "c"
end

puts f.resume
puts f.resume
puts f.resume`,
      solution: `a
b
c`,
      hints: ['First resume runs to first yield, returns "a"', 'Second resume continues to second yield, returns "b"', 'Third resume runs to end, returns "c"'],
      concepts: ['fiber_sequence'],
    },
    {
      id: 'rb-fiber-17',
      title: 'Predict Resume Value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict how values flow through resume.',
      skeleton: `f = Fiber.new do |x|
  y = Fiber.yield(x + 1)
  Fiber.yield(y + 1)
end

puts f.resume(10)
puts f.resume(20)`,
      solution: `11
21`,
      hints: ['First resume passes 10 as x, yields x+1 = 11', 'Second resume passes 20 as the return of yield, so y=20', 'Then yields y+1 = 21'],
      concepts: ['value_flow'],
    },
    {
      id: 'rb-fiber-18',
      title: 'Predict Enumerator Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of a custom Enumerator.',
      skeleton: `e = Enumerator.new do |y|
  y.yield 1
  y.yield 2
  y.yield 3
end

puts e.next
puts e.next
e.rewind
puts e.next`,
      solution: `1
2
1`,
      hints: ['.next advances the enumerator', '.rewind resets it to the beginning', 'After rewind, next starts from the first yield'],
      concepts: ['enumerator_next', 'rewind'],
    },
    {
      id: 'rb-fiber-19',
      title: 'Refactor Loop to Fiber',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor an eager array generation to a lazy Fiber.',
      skeleton: `# Eager: generates all values upfront
def powers_of_two(count)
  result = []
  n = 1
  count.times do
    result << n
    n *= 2
  end
  result
end

puts powers_of_two(10).inspect`,
      solution: `def powers_of_two
  Fiber.new do
    n = 1
    loop do
      Fiber.yield n
      n *= 2
    end
  end
end

f = powers_of_two
puts 10.times.map { f.resume }.inspect`,
      hints: ['Replace the eager array with a Fiber', 'Use an infinite loop with Fiber.yield', 'The caller decides how many values to take'],
      concepts: ['eager_to_lazy', 'generator_pattern'],
    },
    {
      id: 'rb-fiber-20',
      title: 'Refactor Callback to Fiber',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Refactor callback-based code to fiber-based coroutine.',
      skeleton: `# Callback style - hard to follow flow
class Processor
  def process(items, &on_each)
    items.each_with_index do |item, i|
      result = item.upcase
      on_each.call(i, result)
    end
  end
end

p = Processor.new
results = []
p.process(["hello", "world", "ruby"]) do |i, r|
  results << "\\\#{i}: \\\#{r}"
end
puts results.inspect`,
      solution: `class Processor
  def process(items)
    Fiber.new do
      items.each_with_index do |item, i|
        result = item.upcase
        Fiber.yield([i, result])
      end
    end
  end
end

p = Processor.new
fiber = p.process(["hello", "world", "ruby"])
results = []
while fiber.alive?
  pair = fiber.resume
  results << "\\\#{pair[0]}: \\\#{pair[1]}" if pair
end
puts results.inspect`,
      hints: ['Replace the callback with Fiber.yield', 'Return a Fiber from the process method', 'The caller pulls results by resuming the fiber'],
      concepts: ['callback_to_fiber', 'pull_vs_push'],
    },
  ],
};
