import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-blocks',
  title: '09. Blocks',
  explanation: `## Blocks in Ruby

Blocks are anonymous chunks of code that can be passed to methods. They are one of Ruby's most powerful features.

### Block Syntax

\`\`\`ruby
# Curly braces (single line)
[1, 2, 3].each { |x| puts x }

# do..end (multi-line)
[1, 2, 3].each do |x|
  puts x
end
\`\`\`

### yield

Methods can execute a block using \`yield\`:

\`\`\`ruby
def greet(name)
  puts "Before"
  yield(name) if block_given?
  puts "After"
end

greet("Alice") { |n| puts "Hello, \#{n}!" }
# Before
# Hello, Alice!
# After
\`\`\`

### block_given?

Check if a block was passed:

\`\`\`ruby
def maybe_yield
  if block_given?
    yield
  else
    "No block given"
  end
end
\`\`\`

### &block Parameter

Capture a block as a Proc:

\`\`\`ruby
def capture(&block)
  block.call(42)  # same as yield(42)
end

capture { |n| puts n }
\`\`\`

### Block Scope

Blocks can access variables from the enclosing scope:

\`\`\`ruby
multiplier = 3
[1, 2, 3].map { |x| x * multiplier }  # => [3, 6, 9]
\`\`\`

Block-local variables (declared after a semicolon) are scoped to the block:

\`\`\`ruby
[1, 2, 3].each { |x; temp| temp = x * 2 }
# temp is not accessible outside the block
\`\`\``,
  exercises: [
    {
      id: 'rb-blocks-1',
      title: 'Pass a Block to each',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Pass a block to each that prints each element.',
      skeleton: `[1, 2, 3].each ___ |x| puts x ___`,
      solution: `[1, 2, 3].each { |x| puts x }`,
      hints: [
        'Blocks use curly braces {} for single-line syntax.',
        'Block parameters go between pipe characters |x|.',
        'Write { |x| puts x }.',
      ],
      concepts: ['blocks', 'each', 'block-syntax'],
    },
    {
      id: 'rb-blocks-2',
      title: 'Use yield in a Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use yield to execute the block inside the method.',
      skeleton: `def wrapper
  puts "before"
  ___
  puts "after"
end`,
      solution: `def wrapper
  puts "before"
  yield
  puts "after"
end`,
      hints: [
        'yield calls the block that was passed to the method.',
        'It is a keyword, not a method.',
        'Write yield on its own line.',
      ],
      concepts: ['yield', 'blocks'],
    },
    {
      id: 'rb-blocks-3',
      title: 'Check if Block Given',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use block_given? to check if a block was passed before yielding.',
      skeleton: `def safe_yield
  if ___
    yield
  else
    "no block"
  end
end`,
      solution: `def safe_yield
  if block_given?
    yield
  else
    "no block"
  end
end`,
      hints: [
        'block_given? returns true if a block was passed.',
        'Always check before yield to avoid LocalJumpError.',
        'Write block_given?.',
      ],
      concepts: ['block_given?', 'yield'],
    },
    {
      id: 'rb-blocks-4',
      title: 'Yield with Arguments',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Yield the value 42 to the block.',
      skeleton: `def answer
  ___(42)
end

answer { |n| puts "The answer is \#{n}" }`,
      solution: `def answer
  yield(42)
end

answer { |n| puts "The answer is \#{n}" }`,
      hints: [
        'yield can pass arguments to the block.',
        'Arguments go in parentheses after yield.',
        'Write yield(42).',
      ],
      concepts: ['yield', 'block-parameters'],
    },
    {
      id: 'rb-blocks-5',
      title: 'Capture Block as Proc',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Capture the block as a Proc using the & parameter.',
      skeleton: `def capture(___block)
  block.call("hello")
end`,
      solution: `def capture(&block)
  block.call("hello")
end`,
      hints: [
        'The & prefix converts a block to a Proc.',
        'Place & before the parameter name.',
        'Write &block.',
      ],
      concepts: ['&block', 'proc', 'block-capture'],
    },
    {
      id: 'rb-blocks-6',
      title: 'Symbol to Proc',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use the &:method_name shorthand to convert all strings to uppercase.',
      skeleton: `result = ["hello", "world"].map(___) `,
      solution: `result = ["hello", "world"].map(&:upcase) `,
      hints: [
        '&:method_name is shorthand for { |x| x.method_name }.',
        'It converts the symbol to a Proc.',
        'Write &:upcase.',
      ],
      concepts: ['symbol-to-proc', 'map'],
    },
    {
      id: 'rb-blocks-7',
      title: 'Write a Custom each Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called my_each that takes an array and yields each element to a block. Return the original array.',
      skeleton: `def my_each(arr)
  # Yield each element to the block
end`,
      solution: `def my_each(arr)
  i = 0
  while i < arr.length
    yield arr[i]
    i += 1
  end
  arr
end`,
      hints: [
        'Use a loop to iterate over each element.',
        'yield the current element to the block.',
        'Return the original array at the end.',
      ],
      concepts: ['yield', 'iteration', 'custom-iterators'],
    },
    {
      id: 'rb-blocks-8',
      title: 'Write a Custom map Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called my_map that takes an array and yields each element to a block, collecting the results into a new array.',
      skeleton: `def my_map(arr)
  # Yield each element, collect results
end`,
      solution: `def my_map(arr)
  result = []
  arr.each { |x| result << yield(x) }
  result
end`,
      hints: [
        'Create an empty result array.',
        'Yield each element and push the return value to result.',
        'yield returns the value that the block evaluates to.',
      ],
      concepts: ['yield', 'map', 'custom-iterators'],
    },
    {
      id: 'rb-blocks-9',
      title: 'Write a Custom select Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called my_select that takes an array and yields each element to a block. If the block returns true, include the element in the result.',
      skeleton: `def my_select(arr)
  # Yield each element, keep if block returns true
end`,
      solution: `def my_select(arr)
  result = []
  arr.each { |x| result << x if yield(x) }
  result
end`,
      hints: [
        'yield returns the block result, which should be truthy or falsy.',
        'Only add the element if yield returns true.',
        'Use the modifier if: result << x if yield(x).',
      ],
      concepts: ['yield', 'select', 'custom-iterators'],
    },
    {
      id: 'rb-blocks-10',
      title: 'Write a Timing Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called time_it that yields to a block and returns the elapsed time in seconds. Use Process.clock_gettime(Process::CLOCK_MONOTONIC) for timing.',
      skeleton: `def time_it
  # Time the block execution
end`,
      solution: `def time_it
  start = Process.clock_gettime(Process::CLOCK_MONOTONIC)
  yield
  Process.clock_gettime(Process::CLOCK_MONOTONIC) - start
end`,
      hints: [
        'Record the start time before yield.',
        'Record the end time after yield.',
        'Return the difference.',
      ],
      concepts: ['yield', 'timing', 'benchmarking'],
    },
    {
      id: 'rb-blocks-11',
      title: 'Write a Block-Based Resource Manager',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a method called with_resource that takes a resource name, yields the name to a block, and ensures cleanup happens by printing "Closing NAME" after the block (even if it raises). Return the block result.',
      skeleton: `def with_resource(name)
  # Yield name and ensure cleanup
end`,
      solution: `def with_resource(name)
  result = yield(name)
  result
ensure
  puts "Closing \#{name}"
end`,
      hints: [
        'Use ensure to guarantee cleanup runs.',
        'ensure runs after the method body, even on exceptions.',
        'yield the name to the block.',
      ],
      concepts: ['ensure', 'yield', 'resource-management'],
    },
    {
      id: 'rb-blocks-12',
      title: 'Write a Retry with Block',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a method called with_retry that takes a count and yields to a block. If the block raises, retry up to count times. Return the block result on success or re-raise on final failure.',
      skeleton: `def with_retry(count)
  # Retry the block up to count times
end`,
      solution: `def with_retry(count)
  attempts = 0
  begin
    attempts += 1
    yield
  rescue => e
    raise e if attempts >= count
    retry
  end
end`,
      hints: [
        'Use begin/rescue/retry for exception handling.',
        'Track the number of attempts to avoid infinite loops.',
        'Re-raise the exception when attempts are exhausted.',
      ],
      concepts: ['retry', 'begin-rescue', 'yield', 'error-handling'],
    },
    {
      id: 'rb-blocks-13',
      title: 'Fix the Missing yield Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the method so it actually executes the block.',
      skeleton: `def double_it(n)
  n * 2
end

result = double_it(5) { |x| x + 10 }
# Expected: 20 (5 * 2, then block adds 10)
# Actually: just returns 10, block is ignored`,
      solution: `def double_it(n)
  result = n * 2
  yield(result) if block_given?
end

result = double_it(5) { |x| x + 10 }
# Expected: 20 (5 * 2, then block adds 10)
# Actually: just returns 10, block is ignored`,
      hints: [
        'The method never calls yield, so the block is silently ignored.',
        'Add yield to pass the computed value to the block.',
        'Use block_given? to make the block optional.',
      ],
      concepts: ['yield', 'block_given?', 'block-execution'],
    },
    {
      id: 'rb-blocks-14',
      title: 'Fix the LocalJumpError Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the error that occurs when the method is called without a block.',
      skeleton: `def transform(value)
  yield(value)
end

puts transform(5)
# Raises LocalJumpError: no block given`,
      solution: `def transform(value)
  return value unless block_given?
  yield(value)
end

puts transform(5)
# Raises LocalJumpError: no block given`,
      hints: [
        'yield without a block raises LocalJumpError.',
        'Check block_given? before calling yield.',
        'Return a default value when no block is given.',
      ],
      concepts: ['block_given?', 'LocalJumpError', 'guard-clause'],
    },
    {
      id: 'rb-blocks-15',
      title: 'Fix the Block Scope Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the bug where the block accidentally overwrites the outer variable.',
      skeleton: `total = 0
x = 100

[1, 2, 3].each do |x|
  total += x
end

puts x
# Expected: 100, Actual: 100 (actually fine in modern Ruby)
# But the intent was to use a block-local variable
puts total`,
      solution: `total = 0
x = 100

[1, 2, 3].each do |val; x|
  x = val
  total += val
end

puts x
# Expected: 100, Actual: 100 (actually fine in modern Ruby)
# But the intent was to use a block-local variable
puts total`,
      hints: [
        'Block parameters with the same name as outer variables shadow them in modern Ruby.',
        'Use a semicolon in block parameters to declare block-local variables.',
        'Syntax: |param; local_var| explicitly scopes local_var to the block.',
      ],
      concepts: ['block-scope', 'block-local-variables', 'shadowing'],
    },
    {
      id: 'rb-blocks-16',
      title: 'Predict yield Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict the output of this method with yield.',
      skeleton: `def sandwich
  puts "bread"
  yield
  puts "bread"
end

sandwich { puts "ham" }`,
      solution: `bread
ham
bread`,
      hints: [
        'The method prints "bread", then yields to the block, then prints "bread".',
        'The block prints "ham".',
        'Output: bread, ham, bread.',
      ],
      concepts: ['yield', 'block-execution'],
    },
    {
      id: 'rb-blocks-17',
      title: 'Predict Block Return Value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output. Remember that yield returns the block result.',
      skeleton: `def double_yield(n)
  result = yield(n)
  yield(result)
end

puts double_yield(3) { |x| x * 2 }`,
      solution: `12`,
      hints: [
        'First yield(3) passes 3 to the block, which returns 3*2 = 6.',
        'result is 6. Second yield(6) returns 6*2 = 12.',
        'The method returns the last expression: 12.',
      ],
      concepts: ['yield', 'return-values', 'block-chaining'],
    },
    {
      id: 'rb-blocks-18',
      title: 'Predict Closure Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output. Blocks capture the enclosing scope.',
      skeleton: `counter = 0
3.times { counter += 1 }
puts counter`,
      solution: `3`,
      hints: [
        'Blocks are closures that capture variables from the enclosing scope.',
        'counter is modified inside the block.',
        'After 3 iterations, counter is 3.',
      ],
      concepts: ['closures', 'block-scope', 'mutation'],
    },
    {
      id: 'rb-blocks-19',
      title: 'Refactor to Use Block',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the repeated logging pattern into a method that takes a block.',
      skeleton: `puts "[LOG] Starting task A"
result_a = 1 + 2
puts "[LOG] Finished task A"

puts "[LOG] Starting task B"
result_b = 3 * 4
puts "[LOG] Finished task B"`,
      solution: `def with_logging(task_name)
  puts "[LOG] Starting \#{task_name}"
  result = yield
  puts "[LOG] Finished \#{task_name}"
  result
end

result_a = with_logging("task A") { 1 + 2 }
result_b = with_logging("task B") { 3 * 4 }`,
      hints: [
        'Extract the repeated pattern into a method.',
        'The variable part (the work) goes into the block.',
        'yield executes the block and returns its result.',
      ],
      concepts: ['yield', 'blocks', 'DRY', 'refactoring'],
    },
    {
      id: 'rb-blocks-20',
      title: 'Refactor Callback to &block',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the method to capture the block and store it, instead of using yield directly. This allows the block to be called later.',
      skeleton: `class EventHandler
  def on_event
    @callback = nil
    yield if block_given?
  end

  def trigger
    # Cannot trigger because block is gone
  end
end`,
      solution: `class EventHandler
  def on_event(&block)
    @callback = block
  end

  def trigger
    @callback&.call
  end
end`,
      hints: [
        'Use &block to capture the block as a Proc.',
        'Store it in an instance variable for later use.',
        'Call it with .call when triggering.',
      ],
      concepts: ['&block', 'proc', 'callbacks', 'refactoring'],
    },
  ],
};
