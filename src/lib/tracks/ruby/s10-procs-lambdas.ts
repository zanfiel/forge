import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-procs',
  title: '10. Procs & Lambdas',
  explanation: `## Procs & Lambdas in Ruby

Procs and lambdas are callable objects -- blocks that have been turned into first-class objects.

### Creating Procs

\`\`\`ruby
# Proc.new
square = Proc.new { |x| x * x }
square.call(5)  # => 25

# proc shorthand
double = proc { |x| x * 2 }
\`\`\`

### Creating Lambdas

\`\`\`ruby
# lambda keyword
greet = lambda { |name| "Hello, \#{name}!" }

# Stabby lambda (preferred)
greet = ->(name) { "Hello, \#{name}!" }
greet.call("Alice")  # => "Hello, Alice!"
greet.("Alice")      # shorthand
greet["Alice"]       # also works
\`\`\`

### Proc vs Lambda Differences

1. **Argument checking**: Lambdas enforce arity (argument count), Procs do not.

\`\`\`ruby
p = Proc.new { |a, b| [a, b] }
p.call(1)        # => [1, nil] -- no error

l = ->(a, b) { [a, b] }
l.call(1)        # => ArgumentError!
\`\`\`

2. **Return behavior**: \`return\` in a Proc returns from the enclosing method. \`return\` in a lambda returns from the lambda only.

\`\`\`ruby
def test_proc
  p = Proc.new { return "from proc" }
  p.call
  "after proc"  # never reached
end

def test_lambda
  l = -> { return "from lambda" }
  l.call
  "after lambda"  # this IS reached
end
\`\`\`

### Closures

Both Procs and lambdas are closures -- they capture the binding in which they were created:

\`\`\`ruby
def make_counter
  count = 0
  incrementer = -> { count += 1; count }
  incrementer
end

counter = make_counter
counter.call  # => 1
counter.call  # => 2
\`\`\``,
  exercises: [
    {
      id: 'rb-procs-1',
      title: 'Create a Proc',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Create a Proc that doubles a number.',
      skeleton: `double = ___.new { |x| x * 2 }
puts double.call(5)`,
      solution: `double = Proc.new { |x| x * 2 }
puts double.call(5)`,
      hints: [
        'Procs are created with Proc.new.',
        'The block defines the Proc behavior.',
        'Write Proc.new.',
      ],
      concepts: ['proc', 'Proc.new'],
    },
    {
      id: 'rb-procs-2',
      title: 'Create a Stabby Lambda',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Create a lambda using the stabby syntax that squares a number.',
      skeleton: `square = ___(x) { x * x }
puts square.call(4)`,
      solution: `square = ->(x) { x * x }
puts square.call(4)`,
      hints: [
        'The stabby lambda syntax is -> (params) { body }.',
        'Parameters go in parentheses after ->.',
        'Write ->(x).',
      ],
      concepts: ['lambda', 'stabby-lambda'],
    },
    {
      id: 'rb-procs-3',
      title: 'Call a Lambda',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Call the lambda with the argument "World".',
      skeleton: `greet = ->(name) { "Hello, \#{name}!" }
puts greet.___(___) `,
      solution: `greet = ->(name) { "Hello, \#{name}!" }
puts greet.call("World") `,
      hints: [
        'Use .call() to invoke a Proc or lambda.',
        'Pass the argument inside the parentheses.',
        'Write greet.call("World").',
      ],
      concepts: ['call', 'lambda-invocation'],
    },
    {
      id: 'rb-procs-4',
      title: 'Check Lambda Arity',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Get the arity (number of required parameters) of the lambda.',
      skeleton: `add = ->(a, b) { a + b }
puts add.___`,
      solution: `add = ->(a, b) { a + b }
puts add.arity`,
      hints: [
        '.arity returns the number of required parameters.',
        'For a lambda with 2 params, arity returns 2.',
        'Write add.arity.',
      ],
      concepts: ['arity', 'lambda'],
    },
    {
      id: 'rb-procs-5',
      title: 'Check if Lambda',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Check if the callable object is a lambda.',
      skeleton: `l = -> { "hello" }
p = Proc.new { "hello" }
puts l.___
puts p.___`,
      solution: `l = -> { "hello" }
p = Proc.new { "hello" }
puts l.lambda?
puts p.lambda?`,
      hints: [
        'The .lambda? method returns true for lambdas, false for procs.',
        'Both are instances of Proc class.',
        'Write .lambda?.',
      ],
      concepts: ['lambda?', 'proc-vs-lambda'],
    },
    {
      id: 'rb-procs-6',
      title: 'Pass Proc to Method with &',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Pass the proc as a block to map using the & operator.',
      skeleton: `doubler = Proc.new { |x| x * 2 }
result = [1, 2, 3].map(___doubler)
puts result.inspect`,
      solution: `doubler = Proc.new { |x| x * 2 }
result = [1, 2, 3].map(&doubler)
puts result.inspect`,
      hints: [
        '& converts a Proc back into a block for a method.',
        'Place & before the proc variable.',
        'Write &doubler.',
      ],
      concepts: ['&-operator', 'proc-to-block'],
    },
    {
      id: 'rb-procs-7',
      title: 'Write a Lambda Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called make_multiplier that takes a factor and returns a lambda that multiplies its argument by that factor.',
      skeleton: `def make_multiplier(factor)
  # Return a lambda that multiplies by factor
end`,
      solution: `def make_multiplier(factor)
  ->(x) { x * factor }
end`,
      hints: [
        'Return a lambda that captures the factor from the closure.',
        'Use the stabby lambda syntax: ->(x) { x * factor }.',
        'The lambda closes over the factor variable.',
      ],
      concepts: ['closures', 'lambda', 'factory-methods'],
    },
    {
      id: 'rb-procs-8',
      title: 'Write a Counter Closure',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called make_counter that returns a hash with two lambdas: :increment and :value. The increment lambda adds 1 to an internal count, and value returns the current count.',
      skeleton: `def make_counter
  # Return hash with :increment and :value lambdas
end`,
      solution: `def make_counter
  count = 0
  {
    increment: -> { count += 1 },
    value: -> { count }
  }
end`,
      hints: [
        'Both lambdas close over the same count variable.',
        'Use a local variable count = 0.',
        'Return a hash with two lambda values.',
      ],
      concepts: ['closures', 'shared-state', 'lambda'],
    },
    {
      id: 'rb-procs-9',
      title: 'Write a Compose Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a method called compose that takes two lambdas (f and g) and returns a new lambda that applies g first, then f. So compose(f, g).call(x) equals f.call(g.call(x)).',
      skeleton: `def compose(f, g)
  # Return lambda that computes f(g(x))
end`,
      solution: `def compose(f, g)
  ->(x) { f.call(g.call(x)) }
end`,
      hints: [
        'Return a lambda that chains the two callables.',
        'Apply g first, then pass the result to f.',
        'Write ->(x) { f.call(g.call(x)) }.',
      ],
      concepts: ['composition', 'lambda', 'higher-order-functions'],
    },
    {
      id: 'rb-procs-10',
      title: 'Write a Memoize Wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a method called memoize that takes a lambda and returns a new lambda that caches results. If the same argument is passed again, return the cached result.',
      skeleton: `def memoize(fn)
  # Return a memoized version of fn
end`,
      solution: `def memoize(fn)
  cache = {}
  ->(x) { cache[x] ||= fn.call(x) }
end`,
      hints: [
        'Use a hash to cache results keyed by the argument.',
        '||= assigns only if the key is not yet set.',
        'The cache hash is captured in the closure.',
      ],
      concepts: ['memoization', 'closures', 'lambda', 'caching'],
    },
    {
      id: 'rb-procs-11',
      title: 'Write a Pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a method called pipeline that takes any number of lambdas and returns a new lambda that applies them in sequence (left to right). pipeline(f, g, h).call(x) equals h.call(g.call(f.call(x))).',
      skeleton: `def pipeline(*fns)
  # Return lambda that applies all fns in sequence
end`,
      solution: `def pipeline(*fns)
  ->(x) { fns.reduce(x) { |result, fn| fn.call(result) } }
end`,
      hints: [
        'Use reduce to chain the lambdas in sequence.',
        'Start with x as the initial value.',
        'Each step applies the next function to the accumulated result.',
      ],
      concepts: ['reduce', 'pipeline', 'splat-operator', 'lambda'],
    },
    {
      id: 'rb-procs-12',
      title: 'Write a Curried Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a method called make_adder using curry. Create a lambda that takes two arguments and adds them, then curry it to create a single-argument adder. Return the curried lambda with the first argument pre-applied.',
      skeleton: `def make_adder(n)
  # Use curry to create a partially applied adder
end`,
      solution: `def make_adder(n)
  ->(a, b) { a + b }.curry.call(n)
end`,
      hints: [
        '.curry transforms a multi-argument lambda into a chain of single-argument ones.',
        'Calling with one argument returns a new lambda waiting for the rest.',
        'Use .curry.call(n) to pre-apply the first argument.',
      ],
      concepts: ['curry', 'partial-application', 'lambda'],
    },
    {
      id: 'rb-procs-13',
      title: 'Fix the Proc Arity Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the bug: the code uses a Proc where a lambda should be used. The Proc silently ignores the missing argument, producing nil.',
      skeleton: `validator = Proc.new { |value, min, max| value.between?(min, max) }
# This should raise an error when called with wrong arity
puts validator.call(5)
# NoMethodError: nil doesn't have between?`,
      solution: `validator = ->(value, min, max) { value.between?(min, max) }
# This should raise an error when called with wrong arity
puts validator.call(5, 1, 10)
# NoMethodError: nil doesn't have between?`,
      hints: [
        'Procs do not enforce argument count -- missing args become nil.',
        'Lambdas raise ArgumentError for wrong arity.',
        'Change Proc.new to -> and provide all required arguments.',
      ],
      concepts: ['proc-vs-lambda', 'arity', 'argument-checking'],
    },
    {
      id: 'rb-procs-14',
      title: 'Fix the Return in Proc Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the unexpected LocalJumpError. The return inside a Proc tries to return from the enclosing method, but there is none.',
      skeleton: `my_proc = Proc.new { return "done" }
result = my_proc.call
puts result`,
      solution: `my_proc = -> { return "done" }
result = my_proc.call
puts result`,
      hints: [
        'return inside a Proc returns from the enclosing method.',
        'At the top level, there is no enclosing method, causing LocalJumpError.',
        'Use a lambda instead -- return in a lambda only returns from the lambda.',
      ],
      concepts: ['proc-return', 'lambda-return', 'LocalJumpError'],
    },
    {
      id: 'rb-procs-15',
      title: 'Fix the Closure Capture Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Fix the bug: all lambdas in the array capture the same variable i, so they all return 3.',
      skeleton: `lambdas = []
i = 0
while i < 3
  lambdas << -> { i }
  i += 1
end
puts lambdas.map(&:call).inspect
# Expected: [0, 1, 2], Actual: [3, 3, 3]`,
      solution: `lambdas = []
3.times do |i|
  lambdas << -> { i }
end
puts lambdas.map(&:call).inspect
# Expected: [0, 1, 2], Actual: [3, 3, 3]`,
      hints: [
        'All lambdas close over the SAME variable i.',
        'Use .times with a block parameter to create a new i for each iteration.',
        'Block parameters create a new binding each iteration.',
      ],
      concepts: ['closures', 'variable-capture', 'binding'],
    },
    {
      id: 'rb-procs-16',
      title: 'Predict Proc vs Lambda Arity',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output. Procs are lenient with arguments, lambdas are strict.',
      skeleton: `p = Proc.new { |a, b| "\#{a.inspect}, \#{b.inspect}" }
puts p.call(1)
puts p.call(1, 2, 3)`,
      solution: `1, nil
1, 2`,
      hints: [
        'Procs do not enforce argument count.',
        'Missing arguments become nil, extra arguments are ignored.',
        'p.call(1) gives a=1, b=nil. p.call(1,2,3) gives a=1, b=2.',
      ],
      concepts: ['proc-arity', 'lenient-arguments'],
    },
    {
      id: 'rb-procs-17',
      title: 'Predict Lambda Return Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output. Remember lambda return only exits the lambda.',
      skeleton: `def test
  l = -> { return 10 }
  result = l.call
  result + 5
end

puts test`,
      solution: `15`,
      hints: [
        'return in a lambda only returns from the lambda, not the method.',
        'l.call returns 10, then result + 5 = 15.',
        'The method continues executing after the lambda returns.',
      ],
      concepts: ['lambda-return', 'control-flow'],
    },
    {
      id: 'rb-procs-18',
      title: 'Predict Closure Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output. Closures capture by reference, not by value.',
      skeleton: `x = 10
inc = -> { x += 1 }
inc.call
inc.call
puts x`,
      solution: `12`,
      hints: [
        'The lambda closes over x by reference.',
        'Each call modifies the same x variable.',
        'After two calls: 10 + 1 + 1 = 12.',
      ],
      concepts: ['closures', 'capture-by-reference'],
    },
    {
      id: 'rb-procs-19',
      title: 'Refactor Block to Lambda',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the repeated block into a reusable lambda variable, then pass it with &.',
      skeleton: `evens = [1, 2, 3, 4, 5, 6].select { |x| x.even? }
more_evens = [10, 11, 12, 13].select { |x| x.even? }
all_evens = [20, 21, 22].select { |x| x.even? }`,
      solution: `is_even = ->(x) { x.even? }
evens = [1, 2, 3, 4, 5, 6].select(&is_even)
more_evens = [10, 11, 12, 13].select(&is_even)
all_evens = [20, 21, 22].select(&is_even)`,
      hints: [
        'Extract the repeated block into a lambda variable.',
        'Use & to convert the lambda back to a block.',
        'This follows DRY (Don\'t Repeat Yourself).',
      ],
      concepts: ['lambda', '&-operator', 'DRY', 'refactoring'],
    },
    {
      id: 'rb-procs-20',
      title: 'Refactor Conditionals to Lambda Map',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Refactor the if/elsif chain into a hash of lambdas, dispatching by key.',
      skeleton: `def format_value(type, value)
  if type == :upcase
    value.to_s.upcase
  elsif type == :reverse
    value.to_s.reverse
  elsif type == :length
    value.to_s.length.to_s
  else
    value.to_s
  end
end`,
      solution: `FORMATTERS = {
  upcase:  ->(v) { v.to_s.upcase },
  reverse: ->(v) { v.to_s.reverse },
  length:  ->(v) { v.to_s.length.to_s },
}.freeze

def format_value(type, value)
  formatter = FORMATTERS.fetch(type, ->(v) { v.to_s })
  formatter.call(value)
end`,
      hints: [
        'Store lambdas in a hash keyed by the type symbol.',
        'Use .fetch with a default lambda for unknown types.',
        'Call the retrieved lambda with the value.',
      ],
      concepts: ['lambda', 'hash-dispatch', 'strategy-pattern', 'refactoring'],
    },
  ],
};
