import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-flow',
  title: '07. Control Flow',
  explanation: `## Control Flow in Ruby

Ruby has expressive control flow with several unique features.

### Conditionals

\`\`\`ruby
# if/elsif/else
if score >= 90
  "A"
elsif score >= 80
  "B"
else
  "C"
end

# unless (opposite of if)
unless logged_in?
  redirect_to login_path
end

# Ternary operator
status = age >= 18 ? "adult" : "minor"

# Inline / modifier form
puts "Hello" if greeting
puts "Warning" unless safe
\`\`\`

### case/when

\`\`\`ruby
case command
when "start"
  start_engine
when "stop"
  stop_engine
when /quit|exit/
  shutdown
else
  puts "Unknown command"
end
\`\`\`

### Loops

\`\`\`ruby
# while
while condition
  # ...
end

# until (opposite of while)
until done?
  # ...
end

# for..in
for i in 1..5
  puts i
end

# loop (infinite loop, use break to exit)
loop do
  break if finished?
end

# next skips to the next iteration
# break exits the loop
\`\`\``,
  exercises: [
    {
      id: 'rb-flow-1',
      title: 'Write an if/elsif/else',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Complete the elsif keyword to check the second condition.',
      skeleton: `score = 85
if score >= 90
  grade = "A"
___ score >= 80
  grade = "B"
else
  grade = "C"
end`,
      solution: `score = 85
if score >= 90
  grade = "A"
elsif score >= 80
  grade = "B"
else
  grade = "C"
end`,
      hints: [
        'Ruby uses elsif (not else if or elif).',
        'It is one word: elsif.',
        'Write elsif score >= 80.',
      ],
      concepts: ['if-elsif-else', 'conditionals'],
    },
    {
      id: 'rb-flow-2',
      title: 'Use unless',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use unless to print a message when the user is NOT logged in.',
      skeleton: `logged_in = false
___ logged_in
  puts "Please log in"
end`,
      solution: `logged_in = false
unless logged_in
  puts "Please log in"
end`,
      hints: [
        'unless is the opposite of if.',
        'It executes the block when the condition is false.',
        'Write unless logged_in.',
      ],
      concepts: ['unless', 'conditionals'],
    },
    {
      id: 'rb-flow-3',
      title: 'Ternary Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use the ternary operator to assign "even" or "odd" based on whether n is even.',
      skeleton: `n = 7
result = n.even? ___ "even" ___ "odd"`,
      solution: `n = 7
result = n.even? ? "even" : "odd"`,
      hints: [
        'The ternary operator is condition ? true_value : false_value.',
        'Use ? after the condition and : between the two values.',
        'Write n.even? ? "even" : "odd".',
      ],
      concepts: ['ternary-operator', 'conditionals'],
    },
    {
      id: 'rb-flow-4',
      title: 'Inline if Modifier',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Rewrite the conditional as an inline modifier form.',
      skeleton: `debug = true
puts "Debug mode" ___ debug`,
      solution: `debug = true
puts "Debug mode" if debug`,
      hints: [
        'Ruby allows putting if at the end of a statement.',
        'This is called the modifier form.',
        'Write puts "Debug mode" if debug.',
      ],
      concepts: ['modifier-if', 'inline-conditional'],
    },
    {
      id: 'rb-flow-5',
      title: 'case/when with Ranges',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Complete the case/when using a range to match scores from 80 to 89.',
      skeleton: `score = 85
grade = case score
when 90..100
  "A"
when ___
  "B"
when 70..79
  "C"
else
  "F"
end`,
      solution: `score = 85
grade = case score
when 90..100
  "A"
when 80..89
  "B"
when 70..79
  "C"
else
  "F"
end`,
      hints: [
        'case/when uses === for matching, which works with ranges.',
        'Use a range from 80 to 89 inclusive.',
        'Write 80..89.',
      ],
      concepts: ['case-when', 'ranges', 'pattern-matching'],
    },
    {
      id: 'rb-flow-6',
      title: 'Use next to Skip',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use next to skip odd numbers in the loop.',
      skeleton: `(1..10).each do |i|
  ___ if i.odd?
  puts i
end`,
      solution: `(1..10).each do |i|
  next if i.odd?
  puts i
end`,
      hints: [
        'next skips to the next iteration of the loop.',
        'It is like continue in other languages.',
        'Write next if i.odd?.',
      ],
      concepts: ['next', 'loop-control', 'modifier-if'],
    },
    {
      id: 'rb-flow-7',
      title: 'Write a FizzBuzz Method',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Write a method called fizzbuzz that takes a number and returns "FizzBuzz" if divisible by both 3 and 5, "Fizz" if divisible by 3, "Buzz" if divisible by 5, or the number as a string otherwise.',
      skeleton: `def fizzbuzz(n)
  # Return "FizzBuzz", "Fizz", "Buzz", or n.to_s
end`,
      solution: `def fizzbuzz(n)
  if n % 15 == 0
    "FizzBuzz"
  elsif n % 3 == 0
    "Fizz"
  elsif n % 5 == 0
    "Buzz"
  else
    n.to_s
  end
end`,
      hints: [
        'Check divisibility by 15 first (both 3 and 5).',
        'Use modulo (%) to check divisibility.',
        'Convert the number to a string with .to_s for the default case.',
      ],
      concepts: ['if-elsif-else', 'modulo', 'fizzbuzz'],
    },
    {
      id: 'rb-flow-8',
      title: 'Write a Grade Calculator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called letter_grade that takes a score (0-100) and returns the letter grade using case/when with ranges: A (90-100), B (80-89), C (70-79), D (60-69), F (below 60).',
      skeleton: `def letter_grade(score)
  # Return letter grade using case/when
end`,
      solution: `def letter_grade(score)
  case score
  when 90..100 then "A"
  when 80..89 then "B"
  when 70..79 then "C"
  when 60..69 then "D"
  else "F"
  end
end`,
      hints: [
        'Use case/when with ranges for clean grade boundaries.',
        'The then keyword allows one-line when clauses.',
        'Use else for the default (below 60).',
      ],
      concepts: ['case-when', 'ranges', 'then'],
    },
    {
      id: 'rb-flow-9',
      title: 'Write a Number Collector',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called collect_until that takes an array and a limit. It should iterate through the array, collecting elements until their running sum would exceed the limit. Return the collected elements.',
      skeleton: `def collect_until(arr, limit)
  # Collect elements until sum exceeds limit
end`,
      solution: `def collect_until(arr, limit)
  result = []
  total = 0
  arr.each do |n|
    break if total + n > limit
    total += n
    result << n
  end
  result
end`,
      hints: [
        'Use break to exit the loop when the limit would be exceeded.',
        'Track a running total and check before adding each element.',
        'Use << to append to the result array.',
      ],
      concepts: ['break', 'each', 'running-total'],
    },
    {
      id: 'rb-flow-10',
      title: 'Write a Loop with until',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called countdown that takes a number and returns an array counting down to 1 using an until loop. countdown(5) returns [5, 4, 3, 2, 1].',
      skeleton: `def countdown(n)
  # Use until loop to count down
end`,
      solution: `def countdown(n)
  result = []
  until n < 1
    result << n
    n -= 1
  end
  result
end`,
      hints: [
        'until executes while the condition is false.',
        'until n < 1 means "keep going while n >= 1".',
        'Decrement n each iteration.',
      ],
      concepts: ['until', 'loops', 'arrays'],
    },
    {
      id: 'rb-flow-11',
      title: 'Write a case/when with Regex',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called classify_input that takes a string and returns :number if it matches digits only, :email if it contains @, :url if it starts with "http", or :text otherwise. Use case/when with regex patterns.',
      skeleton: `def classify_input(input)
  # Classify using case/when with regex
end`,
      solution: `def classify_input(input)
  case input
  when /\\A\\d+\\z/
    :number
  when /@/
    :email
  when /\\Ahttp/
    :url
  else
    :text
  end
end`,
      hints: [
        'case/when uses === which for Regex means match.',
        'Use /\\A\\d+\\z/ to match strings of only digits.',
        'Order matters: check the most specific patterns first.',
      ],
      concepts: ['case-when', 'regex', 'pattern-matching'],
    },
    {
      id: 'rb-flow-12',
      title: 'Write a Retry Loop',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a method called attempt that takes a max_tries count and a block. It should call the block up to max_tries times. If the block raises an error, retry. If all attempts fail, return nil. If successful, return the block result.',
      skeleton: `def attempt(max_tries, &block)
  # Try the block up to max_tries times
end`,
      solution: `def attempt(max_tries, &block)
  tries = 0
  begin
    tries += 1
    block.call
  rescue
    retry if tries < max_tries
    nil
  end
end`,
      hints: [
        'Use begin/rescue for exception handling.',
        'The retry keyword re-executes the begin block.',
        'Track the number of tries to avoid infinite loops.',
      ],
      concepts: ['begin-rescue', 'retry', 'blocks', 'error-handling'],
    },
    {
      id: 'rb-flow-13',
      title: 'Fix the Missing end Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the syntax error by adding the missing end keyword.',
      skeleton: `def check_age(age)
  if age >= 18
    if age >= 65
      "senior"
    else
      "adult"
  else
    "minor"
  end
end`,
      solution: `def check_age(age)
  if age >= 18
    if age >= 65
      "senior"
    else
      "adult"
    end
  else
    "minor"
  end
end`,
      hints: [
        'Every if needs a matching end.',
        'The inner if is missing its end keyword.',
        'Add end after "adult" to close the inner if.',
      ],
      concepts: ['if-else', 'syntax', 'end-keyword'],
    },
    {
      id: 'rb-flow-14',
      title: 'Fix the Infinite Loop Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the infinite loop by adding the missing loop variable update.',
      skeleton: `i = 0
while i < 5
  puts i
end`,
      solution: `i = 0
while i < 5
  puts i
  i += 1
end`,
      hints: [
        'The loop variable i never changes, so the condition is always true.',
        'Increment i inside the loop.',
        'Add i += 1 after puts i.',
      ],
      concepts: ['while-loop', 'infinite-loop', 'increment'],
    },
    {
      id: 'rb-flow-15',
      title: 'Fix the unless with else Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the confusing unless/else into a clear if/else. Unless with else is considered bad style in Ruby.',
      skeleton: `unless user.nil?
  puts "No user found"
else
  puts "Welcome, \#{user}"
end`,
      solution: `if user.nil?
  puts "No user found"
else
  puts "Welcome, \#{user}"
end`,
      hints: [
        'unless/else is confusing because the logic is inverted.',
        'The messages are swapped because unless negates the condition.',
        'Convert to if/else for clarity.',
      ],
      concepts: ['unless', 'if-else', 'readability'],
    },
    {
      id: 'rb-flow-16',
      title: 'Predict if/unless Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict the output of these conditionals.',
      skeleton: `x = 0
puts "A" if x.zero?
puts "B" unless x.zero?
puts "C" if x`,
      solution: `A
C`,
      hints: [
        'x.zero? returns true, so "A" prints.',
        'unless x.zero? is false, so "B" does not print.',
        '0 is truthy in Ruby (only nil and false are falsy), so "C" prints.',
      ],
      concepts: ['modifier-if', 'unless', 'truthiness'],
    },
    {
      id: 'rb-flow-17',
      title: 'Predict case/when Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of this case/when statement.',
      skeleton: `value = 42
result = case value
when String then "string"
when 1..50 then "small number"
when Integer then "big number"
end
puts result`,
      solution: `small number`,
      hints: [
        'case/when checks conditions in order.',
        '42 is not a String, so the first when fails.',
        '42 is in the range 1..50, so "small number" matches.',
      ],
      concepts: ['case-when', 'ranges', 'order-of-evaluation'],
    },
    {
      id: 'rb-flow-18',
      title: 'Predict Loop with next/break Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of this loop with next and break.',
      skeleton: `(1..10).each do |i|
  next if i % 3 == 0
  break if i > 7
  puts i
end`,
      solution: `1
2
4
5
7`,
      hints: [
        'next skips multiples of 3 (3, 6, 9).',
        'break exits when i > 7.',
        'Numbers printed: 1, 2, (skip 3), 4, 5, (skip 6), 7, then break at 8.',
      ],
      concepts: ['next', 'break', 'loop-control'],
    },
    {
      id: 'rb-flow-19',
      title: 'Refactor if/else to Ternary',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Refactor the if/else into a single-line ternary expression.',
      skeleton: `def status(active)
  if active
    "online"
  else
    "offline"
  end
end`,
      solution: `def status(active)
  active ? "online" : "offline"
end`,
      hints: [
        'The ternary operator is condition ? true_value : false_value.',
        'It condenses simple if/else into one line.',
        'Write active ? "online" : "offline".',
      ],
      concepts: ['ternary-operator', 'refactoring'],
    },
    {
      id: 'rb-flow-20',
      title: 'Refactor for Loop to each',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the for..in loop to use the more idiomatic .each iterator.',
      skeleton: `result = []
for num in [1, 2, 3, 4, 5]
  result << num * 2 if num.odd?
end`,
      solution: `result = [1, 2, 3, 4, 5].select(&:odd?).map { |num| num * 2 }`,
      hints: [
        'for..in is rarely used in idiomatic Ruby.',
        'Prefer .each, .select, .map, etc.',
        'Chain .select(&:odd?).map { |num| num * 2 } for a functional style.',
      ],
      concepts: ['each', 'select', 'map', 'refactoring'],
    },
  ],
};
