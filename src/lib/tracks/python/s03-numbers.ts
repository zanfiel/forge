import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-numbers',
  title: '3. Numbers & Arithmetic',
  explanation: `## Numbers & Arithmetic

Python has three built-in numeric types: \\\`int\\\`, \\\`float\\\`, and \\\`complex\\\`.

### Arithmetic Operators
- \\\`+\\\` add, \\\`-\\\` subtract, \\\`*\\\` multiply, \\\`/\\\` true division
- \\\`//\\\` floor division, \\\`%\\\` modulo, \\\`**\\\` power

### Useful Built-ins
- \\\`abs()\\\`, \\\`round()\\\`, \\\`divmod()\\\`, \\\`int()\\\`, \\\`float()\\\`
- \\\`bin()\\\`, \\\`hex()\\\`, \\\`oct()\\\` for base conversion

### The math Module
Provides \\\`math.sqrt\\\`, \\\`math.floor\\\`, \\\`math.ceil\\\`, \\\`math.pi\\\`, \\\`math.e\\\`, and more.

### Number Formatting
- Underscores for readability: \\\`1_000_000\\\`
- f-string formatting: \\\`f"{n:.2f}"\\\`, \\\`f"{n:,}"\\\`

### Special Values
- \\\`float('inf')\\\`, \\\`float('-inf')\\\`, \\\`float('nan')\\\`
`,
  exercises: [
    {
      id: 'py-num-1',
      title: 'Floor Division',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use floor division to get the integer result of 17 divided by 3.',
      skeleton: `result = 17 __BLANK__ 3
print(result)  # 5`,
      solution: `result = 17 // 3
print(result)  # 5`,
      hints: [
        'Floor division rounds down to the nearest integer.',
        'The operator uses two forward slashes.',
        'The answer is: //',
      ],
      concepts: ['floor division', 'arithmetic'],
    },
    {
      id: 'py-num-2',
      title: 'Modulo Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use the modulo operator to find the remainder of 17 divided by 5.',
      skeleton: `remainder = 17 __BLANK__ 5
print(remainder)  # 2`,
      solution: `remainder = 17 % 5
print(remainder)  # 2`,
      hints: [
        'The modulo operator gives the remainder after division.',
        'It uses the percent sign.',
        'The answer is: %',
      ],
      concepts: ['modulo', 'remainder'],
    },
    {
      id: 'py-num-3',
      title: 'Power Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Calculate 2 to the power of 10 using the power operator.',
      skeleton: `result = 2 __BLANK__ 10
print(result)  # 1024`,
      solution: `result = 2 ** 10
print(result)  # 1024`,
      hints: [
        'Python uses ** for exponentiation.',
        'It is two asterisks.',
        'The answer is: **',
      ],
      concepts: ['exponentiation', 'power operator'],
    },
    {
      id: 'py-num-4',
      title: 'Absolute Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Get the absolute value of -42.',
      skeleton: `result = __BLANK__(-42)
print(result)  # 42`,
      solution: `result = abs(-42)
print(result)  # 42`,
      hints: [
        'There is a built-in function for absolute value.',
        'It is a three-letter function.',
        'The answer is: abs',
      ],
      concepts: ['abs()', 'absolute value'],
    },
    {
      id: 'py-num-5',
      title: 'Round a Float',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Round 3.14159 to 2 decimal places.',
      skeleton: `result = round(3.14159, __BLANK__)
print(result)  # 3.14`,
      solution: `result = round(3.14159, 2)
print(result)  # 3.14`,
      hints: [
        'round() takes an optional second argument for decimal places.',
        'Pass the number of decimal places you want.',
        'The answer is: 2',
      ],
      concepts: ['round()', 'decimal places'],
    },
    {
      id: 'py-num-6',
      title: 'Integer to Float',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Convert the integer 42 to a float.',
      skeleton: `result = __BLANK__(42)
print(result)  # 42.0`,
      solution: `result = float(42)
print(result)  # 42.0`,
      hints: [
        'Use the float() constructor to convert.',
        'It turns an integer into a floating-point number.',
        'The answer is: float',
      ],
      concepts: ['type conversion', 'float()'],
    },
    {
      id: 'py-num-7',
      title: 'Write is_even Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function is_even(n) that returns True if n is even, False otherwise.',
      skeleton: `def is_even(n):
    # Check if n is even
    pass`,
      solution: `def is_even(n):
    return n % 2 == 0`,
      hints: [
        'An even number has a remainder of 0 when divided by 2.',
        'Use the modulo operator %.',
        'Return n % 2 == 0.',
      ],
      concepts: ['modulo', 'boolean', 'even/odd'],
    },
    {
      id: 'py-num-8',
      title: 'Write divmod_result Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function divmod_result(a, b) that returns the quotient and remainder using divmod().',
      skeleton: `def divmod_result(a, b):
    # Return (quotient, remainder)
    pass`,
      solution: `def divmod_result(a, b):
    return divmod(a, b)`,
      hints: [
        'divmod() returns a tuple of (quotient, remainder).',
        'divmod(a, b) is equivalent to (a // b, a % b).',
        'Just return divmod(a, b).',
      ],
      concepts: ['divmod()', 'tuple return'],
    },
    {
      id: 'py-num-9',
      title: 'Predict True Division',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `print(7 / 2)`,
      solution: `3.5`,
      hints: [
        'The / operator always returns a float in Python 3.',
        '7 divided by 2 is 3.5.',
        'Use // for integer division.',
      ],
      concepts: ['true division', 'float result'],
    },
    {
      id: 'py-num-10',
      title: 'Write clamp Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function clamp(value, low, high) that restricts value to the range [low, high].',
      skeleton: `def clamp(value, low, high):
    # Return value clamped between low and high
    pass`,
      solution: `def clamp(value, low, high):
    return max(low, min(value, high))`,
      hints: [
        'Use min() and max() to constrain the value.',
        'min(value, high) ensures it does not exceed high.',
        'max(low, ...) ensures it is at least low.',
      ],
      concepts: ['min()', 'max()', 'clamping'],
    },
    {
      id: 'py-num-11',
      title: 'Predict Floor Division with Negatives',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `print(-7 // 2)`,
      solution: `-4`,
      hints: [
        'Floor division rounds toward negative infinity.',
        '-7 / 2 = -3.5, and floor(-3.5) = -4.',
        'This is different from truncation toward zero.',
      ],
      concepts: ['floor division', 'negative numbers'],
    },
    {
      id: 'py-num-12',
      title: 'Write format_currency Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function format_currency(amount) that returns a string like "$1,234.56" with comma separators and 2 decimal places.',
      skeleton: `def format_currency(amount):
    # Format as currency string
    pass`,
      solution: `def format_currency(amount):
    return f"\${amount:,.2f}"`,
      hints: [
        'f-strings support format specifiers after a colon.',
        'Use , for thousands separator and .2f for 2 decimal places.',
        'f"${amount:,.2f}"',
      ],
      concepts: ['f-string formatting', 'number formatting'],
    },
    {
      id: 'py-num-13',
      title: 'Fix the Bug: Integer Division',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code so it returns the correct average as a float, not an integer.',
      skeleton: `def average(numbers):
    return sum(numbers) // len(numbers)

print(average([1, 2, 3, 4]))  # Should print 2.5`,
      solution: `def average(numbers):
    return sum(numbers) / len(numbers)

print(average([1, 2, 3, 4]))  # Should print 2.5`,
      hints: [
        'The // operator does floor division, losing the decimal.',
        'Use / for true division that preserves decimals.',
        'Change // to /.',
      ],
      concepts: ['true division', 'floor division', 'average'],
    },
    {
      id: 'py-num-14',
      title: 'Write to_binary Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function to_binary(n) that returns the binary string representation of integer n without the "0b" prefix.',
      skeleton: `def to_binary(n):
    # Return binary string without "0b"
    pass`,
      solution: `def to_binary(n):
    return bin(n)[2:]`,
      hints: [
        'bin() returns a string like "0b1010".',
        'Slice off the first two characters to remove "0b".',
        'Use bin(n)[2:].',
      ],
      concepts: ['bin()', 'binary', 'string slicing'],
    },
    {
      id: 'py-num-15',
      title: 'Fix the Bug: Float Comparison',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the equality check for floating-point numbers.',
      skeleton: `def is_close(a, b):
    return a == b

print(is_close(0.1 + 0.2, 0.3))  # Should print True`,
      solution: `import math

def is_close(a, b):
    return math.isclose(a, b)

print(is_close(0.1 + 0.2, 0.3))  # Should print True`,
      hints: [
        'Floating-point arithmetic has precision issues.',
        '0.1 + 0.2 is not exactly 0.3 in binary.',
        'Use math.isclose() for approximate comparison.',
      ],
      concepts: ['floating-point precision', 'math.isclose()'],
    },
    {
      id: 'py-num-16',
      title: 'Predict Underscore Numbers',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `x = 1_000_000
print(x + 1)`,
      solution: `1000001`,
      hints: [
        'Underscores in numeric literals are ignored by Python.',
        'They are purely for readability.',
        '1_000_000 is the same as 1000000.',
      ],
      concepts: ['underscore in numbers', 'readability'],
    },
    {
      id: 'py-num-17',
      title: 'Write digital_root Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function digital_root(n) that repeatedly sums the digits of n until a single digit remains (e.g., 493 -> 4+9+3=16 -> 1+6=7).',
      skeleton: `def digital_root(n):
    # Repeatedly sum digits until single digit
    pass`,
      solution: `def digital_root(n):
    while n >= 10:
        n = sum(int(d) for d in str(n))
    return n`,
      hints: [
        'Convert the number to a string to iterate over digits.',
        'Sum the digits and repeat until the result is a single digit.',
        'Use a while loop: while n >= 10.',
      ],
      concepts: ['digit sum', 'while loop', 'int/str conversion'],
    },
    {
      id: 'py-num-18',
      title: 'Fix the Bug: Complex Number',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the code to correctly create a complex number with real part 3 and imaginary part 4.',
      skeleton: `z = 3 + 4i
print(abs(z))  # Should print 5.0`,
      solution: `z = 3 + 4j
print(abs(z))  # Should print 5.0`,
      hints: [
        'Python uses j for the imaginary unit, not i.',
        'Complex literals look like 3 + 4j.',
        'abs() of a complex number returns its magnitude.',
      ],
      concepts: ['complex numbers', 'imaginary unit', 'abs()'],
    },
    {
      id: 'py-num-19',
      title: 'Refactor with divmod',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor this code to use divmod() instead of separate // and % operations.',
      skeleton: `def hours_minutes(total_minutes):
    hours = total_minutes // 60
    minutes = total_minutes % 60
    return hours, minutes`,
      solution: `def hours_minutes(total_minutes):
    return divmod(total_minutes, 60)`,
      hints: [
        'divmod(a, b) returns (a // b, a % b).',
        'It replaces both the floor division and modulo.',
        'Return divmod(total_minutes, 60) directly.',
      ],
      concepts: ['divmod()', 'refactoring'],
    },
    {
      id: 'py-num-20',
      title: 'Refactor Number Formatting',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the manual string formatting to use f-string format specifiers.',
      skeleton: `def format_percent(value):
    rounded = round(value * 100, 1)
    return str(rounded) + "%"

print(format_percent(0.8567))  # 85.7%`,
      solution: `def format_percent(value):
    return f"{value:.1%}"

print(format_percent(0.8567))  # 85.7%`,
      hints: [
        'f-strings support a % format specifier.',
        '{value:.1%} multiplies by 100 and adds %.',
        'The .1 specifies one decimal place.',
      ],
      concepts: ['f-string', 'percent formatting', 'refactoring'],
    },
  ],
};
