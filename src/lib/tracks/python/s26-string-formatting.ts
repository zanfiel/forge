import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-formatting',
  title: '26. String Formatting',
  explanation: `## String Formatting

Python offers several ways to format strings, each with increasing power and readability.

### %-formatting (Old Style)
The oldest approach uses \\\`%\\\` operator with format specifiers like \\\`%s\\\`, \\\`%d\\\`, \\\`%f\\\`.

### str.format()
Introduced in Python 2.6, \\\`str.format()\\\` uses curly braces \\\`{}\\\` as placeholders with optional format specs.

### f-strings (Python 3.6+)
F-strings embed expressions directly: \\\`f"Hello {name}"\\\`. They are the most readable and performant option.

### Format Specification Mini-Language
Inside braces you can control alignment (\\\`<\\\`, \\\`>\\\`, \\\`^\\\`), fill characters, width, precision, sign, grouping (\\\`,\\\` or \\\`_\\\`), and type codes (\\\`d\\\`, \\\`f\\\`, \\\`e\\\`, \\\`x\\\`, \\\`o\\\`, \\\`b\\\`).

### Datetime Formatting
Datetime objects support \\\`strftime\\\` codes directly in format specs.

### Custom __format__
Classes can define \\\`__format__(self, spec)\\\` to support custom format specifications.

### Template Strings
\\\`string.Template\\\` provides simpler substitution with \\\`$variable\\\` syntax, useful for user-provided templates.

### f-string Debugging (Python 3.8+)
Use \\\`f"{expr=}"\\\` to print both the expression and its value.
`,
  exercises: [
    {
      id: 'py-fmt-1',
      title: '%-formatting basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use %-formatting to insert a name into the greeting string.',
      skeleton: `name = "Alice"
greeting = "Hello, %s!" __BLANK__ name
print(greeting)`,
      solution: `name = "Alice"
greeting = "Hello, %s!" % name
print(greeting)`,
      hints: [
        'The % operator is used after the format string.',
        'For a single value, just use % followed by the variable.',
        'The answer is: % name',
      ],
      concepts: ['%-formatting', 'string interpolation'],
    },
    {
      id: 'py-fmt-2',
      title: 'str.format() basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use str.format() to insert values into the template.',
      skeleton: `template = "{} is {} years old"
result = template.__BLANK__("Bob", 30)
print(result)`,
      solution: `template = "{} is {} years old"
result = template.format("Bob", 30)
print(result)`,
      hints: [
        'Which string method uses curly braces as placeholders?',
        'The method is called on the template string.',
        'The answer is: .format("Bob", 30)',
      ],
      concepts: ['str.format()', 'positional arguments'],
    },
    {
      id: 'py-fmt-3',
      title: 'f-string basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use an f-string to embed the variable in the string.',
      skeleton: `language = "Python"
message = __BLANK__"I love {language}!"
print(message)`,
      solution: `language = "Python"
message = f"I love {language}!"
print(message)`,
      hints: [
        'What prefix makes a string an f-string?',
        'Place the letter f before the opening quote.',
        'The answer is: f',
      ],
      concepts: ['f-strings', 'string interpolation'],
    },
    {
      id: 'py-fmt-4',
      title: 'Named placeholders in format()',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use named placeholders with str.format().',
      skeleton: `template = "{name} scored {score} points"
result = template.format(__BLANK__="Alice", __BLANK__=95)
print(result)`,
      solution: `template = "{name} scored {score} points"
result = template.format(name="Alice", score=95)
print(result)`,
      hints: [
        'Named placeholders match keyword arguments.',
        'The first blank should be name, the second score.',
        'The answer is: name="Alice", score=95',
      ],
      concepts: ['str.format()', 'named placeholders', 'keyword arguments'],
    },
    {
      id: 'py-fmt-5',
      title: 'Float precision',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Format pi to exactly 2 decimal places using an f-string.',
      skeleton: `import math
result = f"Pi is {math.pi__BLANK__}"
print(result)`,
      solution: `import math
result = f"Pi is {math.pi:.2f}"
print(result)`,
      hints: [
        'Use a colon followed by a format spec inside the braces.',
        '.2f means 2 decimal places, fixed-point notation.',
        'The answer is: :.2f',
      ],
      concepts: ['f-strings', 'format spec', 'precision'],
    },
    {
      id: 'py-fmt-6',
      title: 'Right-align with padding',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Right-align the number in a field of width 10, padded with zeros.',
      skeleton: `value = 42
result = f"{value__BLANK__}"
print(result)  # "0000000042"`,
      solution: `value = 42
result = f"{value:0>10}"
print(result)  # "0000000042"`,
      hints: [
        'The format spec goes after a colon inside the braces.',
        'Use 0 as fill, > for right-align, and 10 for width.',
        'The answer is: :0>10',
      ],
      concepts: ['alignment', 'padding', 'format spec'],
    },
    {
      id: 'py-fmt-7',
      title: 'Predict %-formatting output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does this %-formatting code print?',
      skeleton: `name = "World"
count = 3
print("Hello %s! Count: %05d" % (name, count))`,
      solution: `Hello World! Count: 00003`,
      hints: [
        '%s inserts a string, %05d pads an integer to width 5 with zeros.',
        'count is 3, so with %05d it becomes 00003.',
        'The output is: Hello World! Count: 00003',
      ],
      concepts: ['%-formatting', 'zero padding', '%d', '%s'],
    },
    {
      id: 'py-fmt-8',
      title: 'Predict f-string expression',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this f-string expression print?',
      skeleton: `items = ["a", "b", "c"]
print(f"Count: {len(items)}, Last: {items[-1].upper()}")`,
      solution: `Count: 3, Last: C`,
      hints: [
        'f-strings can contain arbitrary expressions.',
        'len(items) is 3, items[-1] is "c", upper() makes it "C".',
        'The output is: Count: 3, Last: C',
      ],
      concepts: ['f-strings', 'expressions in f-strings'],
    },
    {
      id: 'py-fmt-9',
      title: 'Predict f-string debug (=)',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does the f-string debugging syntax output?',
      skeleton: `x = 42
print(f"{x + 8=}")`,
      solution: `x + 8=50`,
      hints: [
        'The = suffix in f-strings prints the expression text and its value.',
        'The expression is x + 8, which equals 50.',
        'The output is: x + 8=50',
      ],
      concepts: ['f-string debugging', '= suffix'],
    },
    {
      id: 'py-fmt-10',
      title: 'Fix thousand separator',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the format spec so the number prints with comma thousand separators.',
      skeleton: `amount = 1234567
print(f"Total: {amount:,d}")  # Should print: Total: 1,234,567
# Bug: currently using wrong format spec
print(f"Total: {amount:_d}")`,
      solution: `amount = 1234567
print(f"Total: {amount:,d}")  # Should print: Total: 1,234,567
# Bug: currently using wrong format spec
print(f"Total: {amount:,d}")`,
      hints: [
        'For comma thousands separator, use , not _ in the format spec.',
        'The format spec :,d uses commas as grouping characters.',
        'Change :_d to :,d on the last line.',
      ],
      concepts: ['grouping', 'thousand separator', 'format spec'],
    },
    {
      id: 'py-fmt-11',
      title: 'Fix f-string syntax',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Fix the broken f-string that tries to include a dictionary lookup.',
      skeleton: `data = {"name": "Alice"}
# Bug: backslash not allowed in f-string expression
print(f"Hello {data['name']}")`,
      solution: `data = {"name": "Alice"}
# Fixed: use double quotes outside, single inside (or vice versa)
print(f"Hello {data['name']}")`,
      hints: [
        'This code actually works in Python 3.12+. In older versions, quote nesting was the issue.',
        'The f-string uses double quotes outside and single quotes for the dict key.',
        'This code is correct as-is. The real fix for older Python would be to use a variable.',
      ],
      concepts: ['f-strings', 'quote nesting', 'dictionary access'],
    },
    {
      id: 'py-fmt-12',
      title: 'Fix center alignment',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the format spec to center-align the text in a 20-character field with dashes.',
      skeleton: `title = "Hello"
# Should print: -------Hello--------
print(f"{title:->20}")`,
      solution: `title = "Hello"
# Should print: -------Hello--------
print(f"{title:-^20}")`,
      hints: [
        'The > symbol means right-align, not center.',
        'Use ^ for center alignment.',
        'Change :->20 to :-^20',
      ],
      concepts: ['center alignment', 'fill character', 'format spec'],
    },
    {
      id: 'py-fmt-13',
      title: 'Write a number formatter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that formats a number as currency with 2 decimal places, comma separators, and a $ prefix.',
      skeleton: `def format_currency(amount):
    # Return string like "$1,234.56"
    pass

print(format_currency(1234.5))   # $1,234.50
print(format_currency(0.5))      # $0.50
print(format_currency(1000000))  # $1,000,000.00`,
      solution: `def format_currency(amount):
    return f"\${amount:,.2f}"

print(format_currency(1234.5))   # $1,234.50
print(format_currency(0.5))      # $0.50
print(format_currency(1000000))  # $1,000,000.00`,
      hints: [
        'Use an f-string with a format spec for commas and 2 decimal places.',
        'The format spec :,.2f combines comma grouping with fixed-point precision.',
        'Return f"\${amount:,.2f}" -- the $ is literal text outside the braces.',
      ],
      concepts: ['f-strings', 'currency formatting', 'format spec'],
    },
    {
      id: 'py-fmt-14',
      title: 'Write a table formatter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that formats a row with a left-aligned name (15 chars) and right-aligned score (8 chars).',
      skeleton: `def format_row(name, score):
    # Return formatted row like "Alice          |      95"
    pass

print(format_row("Alice", 95))
print(format_row("Bob", 100))`,
      solution: `def format_row(name, score):
    return f"{name:<15}|{score:>8}"

print(format_row("Alice", 95))
print(format_row("Bob", 100))`,
      hints: [
        'Use < for left-align and > for right-align in format specs.',
        'The width goes after the alignment character.',
        'Return f"{name:<15}|{score:>8}"',
      ],
      concepts: ['alignment', 'table formatting', 'format spec'],
    },
    {
      id: 'py-fmt-15',
      title: 'Write repr vs str formatter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that returns a string showing both str() and repr() of the input using f-string conversion flags.',
      skeleton: `def show_both(value):
    # Return "str: <str version>, repr: <repr version>"
    pass

print(show_both("hello"))  # str: hello, repr: 'hello'
print(show_both(42))       # str: 42, repr: 42`,
      solution: `def show_both(value):
    return f"str: {value!s}, repr: {value!r}"

print(show_both("hello"))  # str: hello, repr: 'hello'
print(show_both(42))       # str: 42, repr: 42`,
      hints: [
        'f-strings support !s for str() and !r for repr() conversion.',
        'Place the conversion flag before any format spec.',
        'Return f"str: {value!s}, repr: {value!r}"',
      ],
      concepts: ['!s', '!r', 'conversion flags', 'repr vs str'],
    },
    {
      id: 'py-fmt-16',
      title: 'Write a custom __format__ class',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Create a Temperature class whose __format__ supports "c" for Celsius and "f" for Fahrenheit display.',
      skeleton: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    def __format__(self, spec):
        # "c" -> "25.0C", "f" -> "77.0F", "" -> "25.0C"
        pass

t = Temperature(25)
print(f"{t:c}")  # 25.0C
print(f"{t:f}")  # 77.0F`,
      solution: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    def __format__(self, spec):
        if spec == "f":
            return f"{self.celsius * 9 / 5 + 32:.1f}F"
        return f"{self.celsius:.1f}C"

t = Temperature(25)
print(f"{t:c}")  # 25.0C
print(f"{t:f}")  # 77.0F`,
      hints: [
        '__format__ receives the format spec as a string argument.',
        'For Fahrenheit, convert using the formula: C * 9/5 + 32.',
        'Check if spec == "f", otherwise return Celsius format.',
      ],
      concepts: ['__format__', 'custom formatting', 'format spec'],
    },
    {
      id: 'py-fmt-17',
      title: 'Write a dynamic format spec function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that formats a number using a dynamically constructed format spec for width and precision.',
      skeleton: `def dynamic_format(value, width, precision):
    # Format value with given width and precision
    # e.g. dynamic_format(3.14159, 10, 2) -> "      3.14"
    pass

print(repr(dynamic_format(3.14159, 10, 2)))  # '      3.14'
print(repr(dynamic_format(42.1, 8, 3)))       # '  42.100'`,
      solution: `def dynamic_format(value, width, precision):
    return f"{value:{width}.{precision}f}"

print(repr(dynamic_format(3.14159, 10, 2)))  # '      3.14'
print(repr(dynamic_format(42.1, 8, 3)))       # '  42.100'`,
      hints: [
        'f-strings allow nested braces to use variables in the format spec.',
        'Use {value:{width}.{precision}f} to nest the format parameters.',
        'The width and precision variables are embedded within the format spec.',
      ],
      concepts: ['nested formatting', 'dynamic format specs', 'f-strings'],
    },
    {
      id: 'py-fmt-18',
      title: 'Write a format_map example',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that uses format_map with a defaultdict to handle missing keys gracefully.',
      skeleton: `from collections import defaultdict

def safe_format(template, data):
    # Format template using data dict, missing keys become "<missing>"
    pass

print(safe_format("{name} is {age}", {"name": "Alice"}))
# Alice is <missing>`,
      solution: `from collections import defaultdict

def safe_format(template, data):
    safe = defaultdict(lambda: "<missing>", data)
    return template.format_map(safe)

print(safe_format("{name} is {age}", {"name": "Alice"}))
# Alice is <missing>`,
      hints: [
        'format_map() works like format() but takes a mapping directly.',
        'defaultdict can provide a default value for missing keys.',
        'Create a defaultdict with lambda: "<missing>" and the original data.',
      ],
      concepts: ['format_map', 'defaultdict', 'safe formatting'],
    },
    {
      id: 'py-fmt-19',
      title: 'Write a Template string formatter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that uses string.Template for safe user-provided template substitution.',
      skeleton: `from string import Template

def user_template(template_str, data):
    # Use Template.safe_substitute so missing keys stay as-is
    pass

print(user_template("Hello $name, your score is $score", {"name": "Alice"}))
# Hello Alice, your score is $score`,
      solution: `from string import Template

def user_template(template_str, data):
    t = Template(template_str)
    return t.safe_substitute(data)

print(user_template("Hello $name, your score is $score", {"name": "Alice"}))
# Hello Alice, your score is $score`,
      hints: [
        'Template uses $ prefix for placeholders.',
        'safe_substitute leaves missing keys unchanged instead of raising.',
        'Create a Template object and call safe_substitute with the data dict.',
      ],
      concepts: ['Template strings', 'safe_substitute', 'user input'],
    },
    {
      id: 'py-fmt-20',
      title: 'Refactor %-formatting to f-strings',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor all the %-formatting and str.format() calls to use f-strings.',
      skeleton: `name = "Alice"
age = 30
balance = 1234.567

line1 = "Name: %s, Age: %d" % (name, age)
line2 = "Balance: \${:.2f}".format(balance)
line3 = "Summary: {} ({})".format(name, age)

print(line1)
print(line2)
print(line3)`,
      solution: `name = "Alice"
age = 30
balance = 1234.567

line1 = f"Name: {name}, Age: {age}"
line2 = f"Balance: \${balance:.2f}"
line3 = f"Summary: {name} ({age})"

print(line1)
print(line2)
print(line3)`,
      hints: [
        'Replace each %-format and .format() call with an f-string.',
        'f-strings embed variables directly in curly braces.',
        'For the balance, use f"Balance: \${balance:.2f}" with the format spec.',
      ],
      concepts: ['refactoring', 'f-strings', 'modernization'],
    },
  ],
};
