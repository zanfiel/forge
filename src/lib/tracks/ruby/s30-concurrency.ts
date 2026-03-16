import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-concurrency',
  title: '30. Concurrency',
  explanation: `## Concurrency in Ruby

Ruby supports threads, mutexes, and queues for concurrent programming. The GVL (Global VM Lock) means only one thread runs Ruby code at a time, but I/O operations release the lock.

### Threads

\`\`\`ruby
t = Thread.new do
  puts "Hello from thread"
end
t.join  # wait for thread to finish
\`\`\`

### Mutex (Mutual Exclusion)

\`\`\`ruby
mutex = Mutex.new
counter = 0

threads = 10.times.map do
  Thread.new do
    1000.times do
      mutex.synchronize { counter += 1 }
    end
  end
end
threads.each(&:join)
puts counter  # always 10000
\`\`\`

### ConditionVariable

\`\`\`ruby
mutex = Mutex.new
cv = ConditionVariable.new
ready = false

consumer = Thread.new do
  mutex.synchronize do
    cv.wait(mutex) until ready
    puts "Data is ready!"
  end
end

Thread.new do
  mutex.synchronize do
    ready = true
    cv.signal
  end
end

consumer.join
\`\`\`

### Queue (Thread-Safe)

\`\`\`ruby
queue = Queue.new

producer = Thread.new do
  5.times { |i| queue << i }
  queue << :done
end

consumer = Thread.new do
  loop do
    item = queue.pop
    break if item == :done
    puts item
  end
end

[producer, consumer].each(&:join)
\`\`\`

### GVL Note

The GVL prevents true parallel Ruby code execution but allows I/O concurrency. For CPU-bound parallelism, consider Ractors (Ruby 3+).`,
  exercises: [
    {
      id: 'rb-concurrency-1',
      title: 'Create a Thread',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Create and join a thread.',
      skeleton: `t = ___.new do
  puts "Running in thread"
end
t.___`,
      solution: `t = Thread.new do
  puts "Running in thread"
end
t.join`,
      hints: ['Thread.new creates a new thread', '.join waits for the thread to complete', 'Without join, the main thread might exit first'],
      concepts: ['thread', 'join'],
    },
    {
      id: 'rb-concurrency-2',
      title: 'Mutex Synchronize',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use a mutex to protect shared data.',
      skeleton: `mutex = Mutex.new
total = 0

threads = 5.times.map do
  Thread.new do
    100.times do
      mutex.___ { total += 1 }
    end
  end
end
threads.each(&:join)
puts total`,
      solution: `mutex = Mutex.new
total = 0

threads = 5.times.map do
  Thread.new do
    100.times do
      mutex.synchronize { total += 1 }
    end
  end
end
threads.each(&:join)
puts total`,
      hints: ['synchronize locks the mutex for the block', 'Only one thread can be inside synchronize at a time', 'This prevents race conditions on total'],
      concepts: ['mutex', 'synchronize'],
    },
    {
      id: 'rb-concurrency-3',
      title: 'Thread-Safe Queue',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use a Queue for thread communication.',
      skeleton: `q = ___.new

Thread.new { 3.times { |i| q << i } }

3.times { puts q.___ }`,
      solution: `q = Queue.new

Thread.new { 3.times { |i| q << i } }

3.times { puts q.pop }`,
      hints: ['Queue is a thread-safe FIFO queue', '<< pushes items, pop removes them', 'pop blocks until an item is available'],
      concepts: ['queue', 'pop'],
    },
    {
      id: 'rb-concurrency-4',
      title: 'Thread Return Value',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Get the return value from a thread.',
      skeleton: `t = Thread.new { 2 + 3 }
result = t.___
puts result  # => 5`,
      solution: `t = Thread.new { 2 + 3 }
result = t.value
puts result  # => 5`,
      hints: ['Thread#value joins the thread and returns its result', '.value blocks until the thread completes', 'The last expression in the block is the return value'],
      concepts: ['thread_value'],
    },
    {
      id: 'rb-concurrency-5',
      title: 'ConditionVariable Signal',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use a ConditionVariable to signal between threads.',
      skeleton: `mutex = Mutex.new
cv = ___.new
data = nil

consumer = Thread.new do
  mutex.synchronize do
    cv.___(mutex) while data.nil?
    puts data
  end
end

Thread.new do
  sleep 0.1
  mutex.synchronize do
    data = "ready"
    cv.___
  end
end

consumer.join`,
      solution: `mutex = Mutex.new
cv = ConditionVariable.new
data = nil

consumer = Thread.new do
  mutex.synchronize do
    cv.wait(mutex) while data.nil?
    puts data
  end
end

Thread.new do
  sleep 0.1
  mutex.synchronize do
    data = "ready"
    cv.signal
  end
end

consumer.join`,
      hints: ['ConditionVariable.new creates a condition variable', 'wait(mutex) releases the mutex and waits for signal', 'signal wakes up one waiting thread'],
      concepts: ['condition_variable', 'wait', 'signal'],
    },
    {
      id: 'rb-concurrency-6',
      title: 'Thread-Local Variables',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use thread-local variables.',
      skeleton: `threads = 3.times.map do |i|
  Thread.new do
    Thread.current[___] = "thread-\#{i}"
    sleep 0.01
    puts Thread.current[:name]
  end
end
threads.each(&:join)`,
      solution: `threads = 3.times.map do |i|
  Thread.new do
    Thread.current[:name] = "thread-\#{i}"
    sleep 0.01
    puts Thread.current[:name]
  end
end
threads.each(&:join)`,
      hints: ['Thread.current[:key] accesses thread-local storage', 'Each thread has its own copy of thread-local variables', 'Use symbols as keys'],
      concepts: ['thread_local'],
    },
    {
      id: 'rb-concurrency-7',
      title: 'Write Producer-Consumer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a producer-consumer pattern using Queue.',
      skeleton: `# Write producer-consumer:
# - Producer thread pushes numbers 1..10 into a Queue, then pushes :stop
# - Consumer thread pops from Queue, collects into array, stops on :stop
# - Return the collected array from consumer thread
`,
      solution: `queue = Queue.new

producer = Thread.new do
  (1..10).each { |i| queue << i }
  queue << :stop
end

consumer = Thread.new do
  results = []
  loop do
    item = queue.pop
    break if item == :stop
    results << item
  end
  results
end

producer.join
collected = consumer.value
puts collected.inspect`,
      hints: ['Queue.new creates a thread-safe queue', 'Use a sentinel value like :stop to signal completion', 'consumer.value gets the return value'],
      concepts: ['producer_consumer', 'queue'],
    },
    {
      id: 'rb-concurrency-8',
      title: 'Write Thread Pool',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a simple thread pool that processes work items.',
      skeleton: `# Write a simple thread pool:
# - Accept pool_size and a list of work items (numbers)
# - Create pool_size worker threads reading from a Queue
# - Each worker squares the number and stores in a thread-safe results array
# - Return sorted results
`,
      solution: `def thread_pool(pool_size, items)
  queue = Queue.new
  results = []
  mutex = Mutex.new

  items.each { |item| queue << item }
  pool_size.times { queue << :done }

  workers = pool_size.times.map do
    Thread.new do
      loop do
        item = queue.pop
        break if item == :done
        result = item ** 2
        mutex.synchronize { results << result }
      end
    end
  end

  workers.each(&:join)
  results.sort
end

puts thread_pool(3, [1, 2, 3, 4, 5]).inspect`,
      hints: ['Use a Queue to distribute work', 'Use a Mutex to protect the shared results array', 'Send one :done sentinel per worker thread'],
      concepts: ['thread_pool', 'mutex', 'queue'],
    },
    {
      id: 'rb-concurrency-9',
      title: 'Write a Concurrent Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a thread-safe counter class.',
      skeleton: `# Write a ThreadSafeCounter class with:
# - initialize(start = 0)
# - increment (adds 1, thread-safe)
# - decrement (subtracts 1, thread-safe)
# - value (returns current count)
`,
      solution: `class ThreadSafeCounter
  def initialize(start = 0)
    @count = start
    @mutex = Mutex.new
  end

  def increment
    @mutex.synchronize { @count += 1 }
  end

  def decrement
    @mutex.synchronize { @count -= 1 }
  end

  def value
    @mutex.synchronize { @count }
  end
end`,
      hints: ['Use a Mutex to protect @count', 'Every read and write must be synchronized', 'Initialize the mutex in the constructor'],
      concepts: ['thread_safe_class', 'mutex'],
    },
    {
      id: 'rb-concurrency-10',
      title: 'Write Parallel Map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a parallel_map method that maps over an array using threads.',
      skeleton: `# Write a parallel_map(array) that:
# - Creates one thread per element
# - Each thread applies the block to its element
# - Returns results in the original order
# Example: parallel_map([1,2,3]) { |x| x * 2 } => [2, 4, 6]
`,
      solution: `def parallel_map(array, &block)
  threads = array.map do |item|
    Thread.new { block.call(item) }
  end
  threads.map(&:value)
end

result = parallel_map([1, 2, 3, 4, 5]) { |x| x * 2 }
puts result.inspect`,
      hints: ['Create a thread for each element', 'Thread.new { block.call(item) }', '.value preserves order since we map over the original threads array'],
      concepts: ['parallel_map', 'thread_value'],
    },
    {
      id: 'rb-concurrency-11',
      title: 'Write a Read-Write Lock',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a simple read-write lock allowing multiple readers or one writer.',
      skeleton: `# Write a ReadWriteLock class with:
# - read_lock { } - multiple readers can hold simultaneously
# - write_lock { } - exclusive access, no readers or writers
# Use Mutex and ConditionVariable
`,
      solution: `class ReadWriteLock
  def initialize
    @mutex = Mutex.new
    @cv = ConditionVariable.new
    @readers = 0
    @writing = false
  end

  def read_lock
    @mutex.synchronize do
      @cv.wait(@mutex) while @writing
      @readers += 1
    end
    yield
  ensure
    @mutex.synchronize do
      @readers -= 1
      @cv.broadcast if @readers == 0
    end
  end

  def write_lock
    @mutex.synchronize do
      @cv.wait(@mutex) while @writing || @readers > 0
      @writing = true
    end
    yield
  ensure
    @mutex.synchronize do
      @writing = false
      @cv.broadcast
    end
  end
end`,
      hints: ['Track the number of active readers and whether a writer is active', 'Readers wait while writing is true', 'Writers wait while writing or readers > 0'],
      concepts: ['read_write_lock', 'condition_variable', 'broadcast'],
    },
    {
      id: 'rb-concurrency-12',
      title: 'Write Timeout Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method that runs a block with a timeout using threads.',
      skeleton: `# Write a with_timeout(seconds) method that:
# - Runs the block in a thread
# - If the block completes in time, returns its result
# - If it exceeds the timeout, kills the thread and raises "Timeout!"
`,
      solution: `def with_timeout(seconds)
  thread = Thread.new { yield }
  result = thread.join(seconds)
  if result
    thread.value
  else
    thread.kill
    raise "Timeout!"
  end
end

begin
  val = with_timeout(1) { sleep 0.1; 42 }
  puts val
rescue => e
  puts e.message
end`,
      hints: ['Thread#join(seconds) returns nil on timeout', 'Thread#kill terminates a thread', 'Thread#value gets the return value'],
      concepts: ['timeout', 'thread_join', 'thread_kill'],
    },
    {
      id: 'rb-concurrency-13',
      title: 'Fix Race Condition',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the race condition in the shared counter.',
      skeleton: `counter = 0

threads = 10.times.map do
  Thread.new do
    1000.times { counter += 1 }
  end
end
threads.each(&:join)
puts counter  # Not always 10000!`,
      solution: `counter = 0
mutex = Mutex.new

threads = 10.times.map do
  Thread.new do
    1000.times { mutex.synchronize { counter += 1 } }
  end
end
threads.each(&:join)
puts counter  # Always 10000`,
      hints: ['counter += 1 is not atomic (read-modify-write)', 'Add a Mutex and wrap the increment in synchronize', 'This ensures only one thread modifies counter at a time'],
      concepts: ['race_condition', 'mutex'],
    },
    {
      id: 'rb-concurrency-14',
      title: 'Fix Deadlock',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Fix the potential deadlock by using consistent lock ordering.',
      skeleton: `mutex_a = Mutex.new
mutex_b = Mutex.new

t1 = Thread.new do
  mutex_a.synchronize do
    sleep 0.01
    mutex_b.synchronize { puts "Thread 1" }
  end
end

t2 = Thread.new do
  mutex_b.synchronize do
    sleep 0.01
    mutex_a.synchronize { puts "Thread 2" }
  end
end

[t1, t2].each(&:join)`,
      solution: `mutex_a = Mutex.new
mutex_b = Mutex.new

t1 = Thread.new do
  mutex_a.synchronize do
    sleep 0.01
    mutex_b.synchronize { puts "Thread 1" }
  end
end

t2 = Thread.new do
  mutex_a.synchronize do
    sleep 0.01
    mutex_b.synchronize { puts "Thread 2" }
  end
end

[t1, t2].each(&:join)`,
      hints: ['Deadlock occurs when threads lock mutexes in different orders', 'Both threads should lock mutex_a first, then mutex_b', 'Consistent lock ordering prevents deadlocks'],
      concepts: ['deadlock', 'lock_ordering'],
    },
    {
      id: 'rb-concurrency-15',
      title: 'Fix Missing Join',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the program that exits before threads complete.',
      skeleton: `results = []

5.times do |i|
  Thread.new do
    sleep 0.01
    results << i * 2
  end
end

puts results.inspect  # Often prints [] or partial results`,
      solution: `results = []
mutex = Mutex.new

threads = 5.times.map do |i|
  Thread.new do
    sleep 0.01
    mutex.synchronize { results << i * 2 }
  end
end

threads.each(&:join)
puts results.sort.inspect`,
      hints: ['Threads are not joined, so main exits before they finish', 'Collect threads into an array and call .each(&:join)', 'Also protect the shared array with a mutex'],
      concepts: ['join', 'thread_lifecycle'],
    },
    {
      id: 'rb-concurrency-16',
      title: 'Predict Thread Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict the output of thread value.',
      skeleton: `t = Thread.new { 10 * 5 }
puts t.value
puts t.value`,
      solution: `50
50`,
      hints: ['Thread#value joins and returns the result', 'Calling value again returns the cached result', 'The thread only runs once'],
      concepts: ['thread_value'],
    },
    {
      id: 'rb-concurrency-17',
      title: 'Predict Queue Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of Queue operations.',
      skeleton: `q = Queue.new
q << "a"
q << "b"
q << "c"
puts q.size
puts q.pop
puts q.pop
puts q.size`,
      solution: `3
a
b
1`,
      hints: ['Queue is FIFO - first in, first out', 'size returns current number of items', 'After popping 2 of 3 items, size is 1'],
      concepts: ['queue_fifo'],
    },
    {
      id: 'rb-concurrency-18',
      title: 'Predict Mutex Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict what happens with nested mutex locks.',
      skeleton: `mutex = Mutex.new
result = []

mutex.synchronize do
  result << "outer"
  begin
    mutex.synchronize { result << "inner" }
  rescue ThreadError => e
    result << "error: \#{e.message}"
  end
end

puts result.join(", ")`,
      solution: `outer, error: deadlock; recursive locking`,
      hints: ['A Mutex cannot be locked recursively by the same thread', 'The inner synchronize raises ThreadError', 'The error message mentions recursive locking'],
      concepts: ['recursive_lock', 'thread_error'],
    },
    {
      id: 'rb-concurrency-19',
      title: 'Refactor to Thread Pool',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Refactor one-thread-per-item to a bounded thread pool.',
      skeleton: `# One thread per URL - could create too many threads
urls = (1..100).map { |i| "https://example.com/page/\#{i}" }

results = []
mutex = Mutex.new

threads = urls.map do |url|
  Thread.new do
    # simulate fetch
    data = "data from \#{url}"
    mutex.synchronize { results << data }
  end
end

threads.each(&:join)`,
      solution: `urls = (1..100).map { |i| "https://example.com/page/\#{i}" }

results = []
mutex = Mutex.new
queue = Queue.new
urls.each { |url| queue << url }
5.times { queue << :done }

workers = 5.times.map do
  Thread.new do
    loop do
      url = queue.pop
      break if url == :done
      data = "data from \#{url}"
      mutex.synchronize { results << data }
    end
  end
end

workers.each(&:join)`,
      hints: ['Use a Queue to distribute URLs to a fixed number of workers', 'Send :done sentinels equal to worker count', 'This limits concurrent connections to 5'],
      concepts: ['thread_pool', 'bounded_concurrency'],
    },
    {
      id: 'rb-concurrency-20',
      title: 'Refactor to Monitor',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Refactor Mutex + ConditionVariable to use Monitor.',
      skeleton: `require 'thread'

class BoundedBuffer
  def initialize(size)
    @buf = []
    @max = size
    @mutex = Mutex.new
    @not_full = ConditionVariable.new
    @not_empty = ConditionVariable.new
  end

  def put(item)
    @mutex.synchronize do
      @not_full.wait(@mutex) while @buf.size >= @max
      @buf << item
      @not_empty.signal
    end
  end

  def take
    @mutex.synchronize do
      @not_empty.wait(@mutex) while @buf.empty?
      item = @buf.shift
      @not_full.signal
      item
    end
  end
end`,
      solution: `require 'monitor'

class BoundedBuffer
  include MonitorMixin

  def initialize(size)
    super()
    @buf = []
    @max = size
    @not_full = new_cond
    @not_empty = new_cond
  end

  def put(item)
    synchronize do
      @not_full.wait_while { @buf.size >= @max }
      @buf << item
      @not_empty.signal
    end
  end

  def take
    synchronize do
      @not_empty.wait_while { @buf.empty? }
      item = @buf.shift
      @not_full.signal
      item
    end
  end
end`,
      hints: ['Monitor is a reentrant mutex with built-in condition variables', 'include MonitorMixin and call super() in initialize', 'new_cond creates condition variables, wait_while takes a block'],
      concepts: ['monitor', 'monitor_mixin', 'condition_variable'],
    },
  ],
};
