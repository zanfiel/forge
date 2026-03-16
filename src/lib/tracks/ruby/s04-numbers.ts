import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-num',
  title: '04. Numbers',
  explanation: `## Numbers in Ruby

Ruby has several numeric types, all inheriting from \`Numeric\`.

### Integer and Float

\`\`\`ruby
42.class       # => Integer
3.14.class     # => Float
1_000_000      # underscores for readability => 1000000

# Integer division vs Float division
10 / 3         # => 3 (integer division)
10.0 / 3       # => 3.3333333333333335
10 / 3.0       # => 3.3333333333333335
\`\`\`

### Rational and Complex

\`\`\`ruby
(2/3r).class   # => Rational
Rational(2, 3) # => (2/3)
(1+2i).class   # => Complex
Complex(1, 2)  # => (1+2i)
\`\`\`

### Useful Numeric Methods

\`\`\`ruby
-5.abs         # => 5
3.14.round     # => 3
3.14.ceil      # => 4
3.14.floor     # => 3
10.even?       # => true
7.odd?         # => true
5.between?(1, 10)  # => true
3.times { |i| puts i }  # prints 0, 1, 2
1.upto(5) { |i| puts i }  # prints 1 through 5
\`\`\`

### The Math Module

\`\`\`ruby
Math::PI       # => 3.141592653589793
Math.sqrt(16)  # => 4.0
Math.log(1)    # => 0.0
Math.sin(0)    # => 0.0
\`\`\``,
  exercises: [
    {
      id: 'rb-num-1',
      title: 'Integer Division',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Make the division return a Float result instead of an Integer.',
      skeleton: `result = 10.___ / 3`,
      solution: `result = 10.to_f / 3`,
      hints: [
        'Integer / Integer gives Integer in Ruby.',
        'Convert one operand to Float to get a Float result.',
        'Use .to_f on one of the operands.',
      ],
      concepts: ['integer-division', 'to_f', 'type-conversion'],
    },
    {
      id: 'rb-num-2',
      title: 'Get Absolute Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Get the absolute value of -42.',
      skeleton: `result = -42.___`,
      solution: `result = -42.abs`,
      hints: [
        'The method for absolute value is named .abs.',
        'It returns the non-negative value.',
        'Write -42.abs.',
      ],
      concepts: ['abs', 'numeric-methods'],
    },
    {
      id: 'rb-num-3',
      title: 'Round a Float',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Round 3.14159 to 2 decimal places.',
      skeleton: `result = 3.14159.___(___) `,
      solution: `result = 3.14159.round(2) `,
      hints: [
        'The .round method takes an optional precision argument.',
        'Pass the number of decimal places as an integer.',
        'Write .round(2).',
      ],
      concepts: ['round', 'float-precision'],
    },
    {
      id: 'rb-num-4',
      title: 'Check if Even',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Check if the number 42 is even.',
      skeleton: `result = 42.___`,
      solution: `result = 42.even?`,
      hints: [
        'Predicate methods in Ruby end with ?.',
        'The method to check evenness is .even?.',
        'Write 42.even?.',
      ],
      concepts: ['even?', 'predicate-methods'],
    },
    {
      id: 'rb-num-5',
      title: 'Use the Math Module for Square Root',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Calculate the square root of 144 using the Math module.',
      skeleton: `result = ___.___(144)`,
      solution: `result = Math.sqrt(144)`,
      hints: [
        'The Math module contains mathematical functions.',
        'Square root is Math.sqrt.',
        'Write Math.sqrt(144).',
      ],
      concepts: ['math-module', 'sqrt'],
    },
    {
      id: 'rb-num-6',
      title: 'Access Math PI',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Access the value of PI from the Math module.',
      skeleton: `pi = ___::___`,
      solution: `pi = Math::PI`,
      hints: [
        'Constants are accessed with :: in Ruby.',
        'PI is a constant in the Math module.',
        'Write Math::PI.',
      ],
      concepts: ['math-module', 'constants', 'scope-operator'],
    },
    {
      id: 'rb-num-7',
      title: 'Write a Factorial Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called factorial that computes n! (factorial). factorial(5) should return 120. Use (1..n).reduce(:*) or a loop.',
      skeleton: `def factorial(n)
  # Return n!
end`,
      solution: `def factorial(n)
  return 1 if n <= 1
  (1..n).reduce(:*)
end`,
      hints: [
        'Factorial of 0 and 1 is 1.',
        '(1..n).reduce(:*) multiplies all numbers from 1 to n.',
        'Handle the base case where n <= 1.',
      ],
      concepts: ['reduce', 'ranges', 'recursion'],
    },
    {
      id: 'rb-num-8',
      title: 'Write a Temperature Converter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Write a method called celsius_to_fahrenheit that converts Celsius to Fahrenheit. The formula is F = C * 9/5 + 32. Return the result as a Float rounded to 1 decimal place.',
      skeleton: `def celsius_to_fahrenheit(celsius)
  # Convert and return rounded Float
end`,
      solution: `def celsius_to_fahrenheit(celsius)
  (celsius * 9.0 / 5 + 32).round(1)
end`,
      hints: [
        'Use 9.0 / 5 to ensure float division.',
        'Apply the formula: celsius * 9.0 / 5 + 32.',
        'Round the result with .round(1).',
      ],
      concepts: ['float-division', 'round', 'arithmetic'],
    },
    {
      id: 'rb-num-9',
      title: 'Write a Fibonacci Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called fibonacci that takes n and returns an array of the first n Fibonacci numbers. fibonacci(7) should return [0, 1, 1, 2, 3, 5, 8].',
      skeleton: `def fibonacci(n)
  # Return array of first n Fibonacci numbers
end`,
      solution: `def fibonacci(n)
  return [] if n <= 0
  return [0] if n == 1
  fib = [0, 1]
  (n - 2).times { fib << fib[-1] + fib[-2] }
  fib
end`,
      hints: [
        'Start with [0, 1] and keep adding the sum of the last two.',
        'Use .times to iterate the needed number of steps.',
        'Handle edge cases: n <= 0 returns [], n == 1 returns [0].',
      ],
      concepts: ['arrays', 'iteration', 'times'],
    },
    {
      id: 'rb-num-10',
      title: 'Write a Digit Sum Calculator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called digit_sum that takes an integer and returns the sum of its digits. digit_sum(1234) should return 10. Handle negative numbers by using their absolute value.',
      skeleton: `def digit_sum(n)
  # Return sum of digits
end`,
      solution: `def digit_sum(n)
  n.abs.digits.sum
end`,
      hints: [
        'Use .abs to handle negative numbers.',
        '.digits returns an array of digits (least significant first).',
        '.sum adds up all elements in the array.',
      ],
      concepts: ['digits', 'abs', 'sum', 'method-chaining'],
    },
    {
      id: 'rb-num-11',
      title: 'Write a Number Clamper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called clamp_value that takes a number, a minimum, and a maximum, and returns the number clamped to the range [min, max]. Use Ruby\'s built-in .clamp method.',
      skeleton: `def clamp_value(n, min, max)
  # Clamp n to [min, max]
end`,
      solution: `def clamp_value(n, min, max)
  n.clamp(min, max)
end`,
      hints: [
        'Ruby has a built-in .clamp method on Comparable.',
        'It takes a min and max argument.',
        'Write n.clamp(min, max).',
      ],
      concepts: ['clamp', 'comparable', 'numeric-methods'],
    },
    {
      id: 'rb-num-12',
      title: 'Fix the Integer Division Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the bug: the average calculation uses integer division and returns 2 instead of 2.5.',
      skeleton: `numbers = [1, 2, 3, 4]
average = numbers.sum / numbers.length
puts average`,
      solution: `numbers = [1, 2, 3, 4]
average = numbers.sum.to_f / numbers.length
puts average`,
      hints: [
        'Integer / Integer gives Integer in Ruby.',
        'Convert the sum to a Float before dividing.',
        'Use .to_f on the numerator.',
      ],
      concepts: ['integer-division', 'to_f', 'averages'],
    },
    {
      id: 'rb-num-13',
      title: 'Fix the Float Comparison Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the floating point comparison bug. Due to float precision, 0.1 + 0.2 != 0.3.',
      skeleton: `a = 0.1 + 0.2
b = 0.3

if a == b
  puts "equal"
else
  puts "not equal"
end`,
      solution: `a = 0.1 + 0.2
b = 0.3

if (a - b).abs < 1e-10
  puts "equal"
else
  puts "not equal"
end`,
      hints: [
        'Floating point arithmetic has precision issues.',
        'Compare using an epsilon: (a - b).abs < some_small_number.',
        'Use a small threshold like 1e-10 for comparison.',
      ],
      concepts: ['floating-point-precision', 'epsilon-comparison'],
    },
    {
      id: 'rb-num-14',
      title: 'Fix the Modulo Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the method so it correctly checks if a number is divisible by 3. The operator is wrong.',
      skeleton: `def divisible_by_three?(n)
  n / 3 == 0
end

puts divisible_by_three?(9)
puts divisible_by_three?(10)`,
      solution: `def divisible_by_three?(n)
  n % 3 == 0
end

puts divisible_by_three?(9)
puts divisible_by_three?(10)`,
      hints: [
        'Division (/) gives the quotient, not the remainder.',
        'Use modulo (%) to check for divisibility.',
        'n % 3 == 0 means n is divisible by 3.',
      ],
      concepts: ['modulo', 'divisibility', 'operators'],
    },
    {
      id: 'rb-num-15',
      title: 'Predict Integer Division Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict the output of these division operations.',
      skeleton: `puts 7 / 2
puts 7.0 / 2
puts 7 / 2.0`,
      solution: `3
3.5
3.5`,
      hints: [
        'Integer / Integer gives Integer (truncated).',
        'If either operand is Float, the result is Float.',
        '7 / 2 is 3, but 7.0 / 2 and 7 / 2.0 are both 3.5.',
      ],
      concepts: ['integer-division', 'float-division'],
    },
    {
      id: 'rb-num-16',
      title: 'Predict Numeric Methods Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of these numeric method calls.',
      skeleton: `puts 3.7.floor
puts 3.2.ceil
puts -3.7.abs
puts 10.remainder(3)`,
      solution: `3
4
3.7
1`,
      hints: [
        '.floor rounds down, .ceil rounds up.',
        '.abs returns the absolute value.',
        '.remainder returns the remainder of division.',
      ],
      concepts: ['floor', 'ceil', 'abs', 'remainder'],
    },
    {
      id: 'rb-num-17',
      title: 'Predict Power and Modulo Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of power and modulo operations.',
      skeleton: `puts 2 ** 10
puts 17 % 5
puts -7 % 3`,
      solution: `1024
2
2`,
      hints: [
        '** is the exponentiation operator.',
        '% is the modulo operator.',
        'Ruby modulo always returns a non-negative result when the divisor is positive.',
      ],
      concepts: ['exponentiation', 'modulo', 'operators'],
    },
    {
      id: 'rb-num-18',
      title: 'Refactor to Use Numeric Methods',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the manual range check to use the built-in .between? method.',
      skeleton: `def in_range?(n, min, max)
  n >= min && n <= max
end`,
      solution: `def in_range?(n, min, max)
  n.between?(min, max)
end`,
      hints: [
        'Ruby has a built-in .between? method on Comparable.',
        'It takes min and max arguments and returns a boolean.',
        'Replace the manual comparison with n.between?(min, max).',
      ],
      concepts: ['between?', 'comparable', 'refactoring'],
    },
    {
      id: 'rb-num-19',
      title: 'Refactor Loop to Use times/upto',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the while loop to use the idiomatic .times iterator.',
      skeleton: `i = 0
while i < 5
  puts i
  i += 1
end`,
      solution: `5.times { |i| puts i }`,
      hints: [
        'Ruby has an .times method on integers for counting loops.',
        'It yields the index starting from 0.',
        'Replace the while loop with 5.times { |i| puts i }.',
      ],
      concepts: ['times', 'iterators', 'refactoring'],
    },
    {
      id: 'rb-num-20',
      title: 'Write a Prime Checker',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a method called prime? that returns true if a number is prime. Do not use require "prime". Check divisibility from 2 up to the square root of n.',
      skeleton: `def prime?(n)
  # Return true if n is prime
end`,
      solution: `def prime?(n)
  return false if n < 2
  (2..Math.sqrt(n).to_i).none? { |i| n % i == 0 }
end`,
      hints: [
        'Numbers less than 2 are not prime.',
        'Check divisibility from 2 to sqrt(n).',
        'Use .none? with a block to check if no divisor exists.',
      ],
      concepts: ['math-module', 'sqrt', 'none?', 'ranges', 'prime-numbers'],
    },
  ],
};
