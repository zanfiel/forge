import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-strings',
  title: '2. Strings',
  explanation: `## Strings

Strings in Python are immutable sequences of characters. They can be created with single quotes, double quotes, or triple quotes for multiline strings.

### Indexing & Slicing
- \\\`s[0]\\\` accesses the first character; \\\`s[-1]\\\` the last.
- \\\`s[start:stop:step]\\\` extracts a substring.

### Common Methods
- \\\`upper()\\\`, \\\`lower()\\\`, \\\`strip()\\\`, \\\`split()\\\`, \\\`join()\\\`, \\\`replace()\\\`, \\\`find()\\\`
- \\\`startswith()\\\`, \\\`endswith()\\\`, \\\`isdigit()\\\`, \\\`isalpha()\\\`

### f-Strings
Formatted string literals: \\\`f"Hello, {name}!"\\\` embed expressions directly.

### Raw Strings
Prefix with \\\`r\\\` to treat backslashes as literal characters: \\\`r"\\n"\\\` is two characters.

### Useful Built-ins
- \\\`len(s)\\\` returns length.
- \\\`ord(c)\\\` returns Unicode code point; \\\`chr(n)\\\` returns the character.
`,
  exercises: [
    {
      id: 'py-str-1',
      title: 'Create a String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a string variable greeting with the value "Hello, World!".',
      skeleton: `greeting = __BLANK__
print(greeting)`,
      solution: `greeting = "Hello, World!"
print(greeting)`,
      hints: [
        'Strings are enclosed in quotes.',
        'Use double quotes for strings containing no double quotes.',
        'The answer is: "Hello, World!"',
      ],
      concepts: ['string creation', 'string literals'],
    },
    {
      id: 'py-str-2',
      title: 'String Indexing',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Get the first character of the string.',
      skeleton: `word = "Python"
first = word[__BLANK__]
print(first)  # P`,
      solution: `word = "Python"
first = word[0]
print(first)  # P`,
      hints: [
        'Indexing starts at 0 in Python.',
        'The first element is at index 0.',
        'The answer is: 0',
      ],
      concepts: ['string indexing', 'zero-based index'],
    },
    {
      id: 'py-str-3',
      title: 'String Slicing',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Extract "Py" from the string using slicing.',
      skeleton: `word = "Python"
result = word[__BLANK__]
print(result)  # Py`,
      solution: `word = "Python"
result = word[0:2]
print(result)  # Py`,
      hints: [
        'Slicing syntax is [start:stop].',
        'stop is exclusive -- it does not include that index.',
        'The answer is: 0:2',
      ],
      concepts: ['string slicing'],
    },
    {
      id: 'py-str-4',
      title: 'f-String Formatting',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use an f-string to print "My name is Alice".',
      skeleton: `name = "Alice"
print(__BLANK__)`,
      solution: `name = "Alice"
print(f"My name is {name}")`,
      hints: [
        'f-strings start with the letter f before the quote.',
        'Embed variables inside curly braces {}.',
        'The answer is: f"My name is {name}"',
      ],
      concepts: ['f-string', 'string interpolation'],
    },
    {
      id: 'py-str-5',
      title: 'String upper()',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Convert the string to uppercase.',
      skeleton: `text = "hello"
result = text.__BLANK__()
print(result)  # HELLO`,
      solution: `text = "hello"
result = text.upper()
print(result)  # HELLO`,
      hints: [
        'There is a method that converts all characters to uppercase.',
        'The method name is five letters long.',
        'The answer is: upper',
      ],
      concepts: ['string methods', 'upper()'],
    },
    {
      id: 'py-str-6',
      title: 'Split a String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Split the CSV string into a list using comma as delimiter.',
      skeleton: `csv = "apple,banana,cherry"
fruits = csv.__BLANK__(",")
print(fruits)`,
      solution: `csv = "apple,banana,cherry"
fruits = csv.split(",")
print(fruits)`,
      hints: [
        'split() divides a string into a list.',
        'Pass the delimiter as an argument.',
        'The answer is: split',
      ],
      concepts: ['split()', 'string methods'],
    },
    {
      id: 'py-str-7',
      title: 'Write join_words Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function join_words(words) that joins a list of words with a space separator.',
      skeleton: `def join_words(words):
    # Join the words list with spaces
    pass`,
      solution: `def join_words(words):
    return " ".join(words)`,
      hints: [
        'The join() method is called on the separator string.',
        '" ".join(list) joins with spaces.',
        'Return the joined string.',
      ],
      concepts: ['join()', 'string methods'],
    },
    {
      id: 'py-str-8',
      title: 'Write reverse_string Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function reverse_string(s) that returns the reversed string.',
      skeleton: `def reverse_string(s):
    # Return the string reversed
    pass`,
      solution: `def reverse_string(s):
    return s[::-1]`,
      hints: [
        'Slicing with a step of -1 reverses a sequence.',
        's[::-1] reverses the string.',
        'This is a common Python idiom.',
      ],
      concepts: ['string slicing', 'reverse'],
    },
    {
      id: 'py-str-9',
      title: 'Predict String Multiplication',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `print("ha" * 3)`,
      solution: `hahaha`,
      hints: [
        'The * operator repeats a string.',
        '"ha" * 3 concatenates "ha" three times.',
        'No spaces are added between repetitions.',
      ],
      concepts: ['string multiplication', 'string repetition'],
    },
    {
      id: 'py-str-10',
      title: 'Write count_vowels Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function count_vowels(s) that returns the number of vowels (a, e, i, o, u) in a string, case-insensitive.',
      skeleton: `def count_vowels(s):
    # Count vowels in the string
    pass`,
      solution: `def count_vowels(s):
    return sum(1 for c in s.lower() if c in "aeiou")`,
      hints: [
        'Convert to lowercase first for case-insensitive matching.',
        'Check membership with the in operator.',
        'Use sum() with a generator expression.',
      ],
      concepts: ['string iteration', 'in operator', 'generator expression'],
    },
    {
      id: 'py-str-11',
      title: 'Predict find() Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `text = "hello world"
print(text.find("xyz"))`,
      solution: `-1`,
      hints: [
        'find() returns the index of the first occurrence.',
        'If the substring is not found, find() returns -1.',
        'This is different from index() which raises ValueError.',
      ],
      concepts: ['find()', 'string search'],
    },
    {
      id: 'py-str-12',
      title: 'Fix the Bug: replace() Usage',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code so it properly replaces all spaces with hyphens.',
      skeleton: `text = "hello beautiful world"
text.replace(" ", "-")
print(text)  # Should print: hello-beautiful-world`,
      solution: `text = "hello beautiful world"
text = text.replace(" ", "-")
print(text)  # Should print: hello-beautiful-world`,
      hints: [
        'Strings are immutable in Python.',
        'replace() returns a new string; it does not modify in place.',
        'You need to reassign the result.',
      ],
      concepts: ['string immutability', 'replace()'],
    },
    {
      id: 'py-str-13',
      title: 'Write is_palindrome Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function is_palindrome(s) that returns True if the string reads the same forward and backward (case-insensitive, ignoring spaces).',
      skeleton: `def is_palindrome(s):
    # Check if s is a palindrome
    pass`,
      solution: `def is_palindrome(s):
    cleaned = s.lower().replace(" ", "")
    return cleaned == cleaned[::-1]`,
      hints: [
        'Normalize by converting to lowercase and removing spaces.',
        'Compare the cleaned string with its reverse.',
        'Use [::-1] to reverse.',
      ],
      concepts: ['string methods', 'palindrome', 'slicing'],
    },
    {
      id: 'py-str-14',
      title: 'Fix the Bug: Escape Character',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the string so it prints an actual tab character between the words.',
      skeleton: `print("Name" + "\\\\t" + "Age")  # Should print: Name\tAge (with actual tab)`,
      solution: `print("Name" + "\\t" + "Age")  # Should print: Name\tAge (with actual tab)`,
      hints: [
        'The double backslash escapes the backslash itself.',
        'Use a single backslash for escape sequences.',
        '"\\t" is a tab character.',
      ],
      concepts: ['escape characters', 'tab', 'backslash'],
    },
    {
      id: 'py-str-15',
      title: 'Write title_case Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function title_case(s) that capitalizes the first letter of each word.',
      skeleton: `def title_case(s):
    # Capitalize first letter of each word
    pass`,
      solution: `def title_case(s):
    return s.title()`,
      hints: [
        'Python strings have a built-in method for title casing.',
        'The method is called title().',
        'It capitalizes the first letter of every word.',
      ],
      concepts: ['title()', 'string methods'],
    },
    {
      id: 'py-str-16',
      title: 'Predict startswith/endswith',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `path = "image.png"
print(path.endswith((".jpg", ".png", ".gif")))`,
      solution: `True`,
      hints: [
        'endswith() can accept a tuple of suffixes.',
        'It returns True if the string ends with any of them.',
        '"image.png" ends with ".png".',
      ],
      concepts: ['endswith()', 'tuple argument'],
    },
    {
      id: 'py-str-17',
      title: 'Write encode_decode Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function encode_decode(s) that encodes the string to UTF-8 bytes, then decodes it back and returns the result.',
      skeleton: `def encode_decode(s):
    # Encode to bytes and decode back
    pass`,
      solution: `def encode_decode(s):
    encoded = s.encode("utf-8")
    return encoded.decode("utf-8")`,
      hints: [
        'str.encode() converts string to bytes.',
        'bytes.decode() converts bytes back to string.',
        'Specify "utf-8" as the encoding.',
      ],
      concepts: ['encode()', 'decode()', 'UTF-8'],
    },
    {
      id: 'py-str-18',
      title: 'Fix the Bug: strip() Misuse',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the code to remove only leading and trailing whitespace, not characters from the word.',
      skeleton: `text = "  hello  "
result = text.strip("helo ")
print(result)  # Should print: hello`,
      solution: `text = "  hello  "
result = text.strip()
print(result)  # Should print: hello`,
      hints: [
        'strip() with arguments removes those specific characters, not substrings.',
        'strip() with no arguments removes whitespace.',
        'Call strip() without arguments.',
      ],
      concepts: ['strip()', 'string methods'],
    },
    {
      id: 'py-str-19',
      title: 'Refactor String Concatenation',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the string concatenation loop to use join() for better performance.',
      skeleton: `def build_csv(items):
    result = ""
    for i, item in enumerate(items):
        if i > 0:
            result += ","
        result += item
    return result`,
      solution: `def build_csv(items):
    return ",".join(items)`,
      hints: [
        'String concatenation in a loop creates many temporary strings.',
        'join() is much more efficient.',
        'Use ",".join(items) for comma-separated values.',
      ],
      concepts: ['join()', 'refactoring', 'performance'],
    },
    {
      id: 'py-str-20',
      title: 'Refactor to f-String',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the format() call to use an f-string instead.',
      skeleton: `def greet(name, age):
    return "My name is {} and I am {} years old".format(name, age)`,
      solution: `def greet(name, age):
    return f"My name is {name} and I am {age} years old"`,
      hints: [
        'f-strings are more readable than .format().',
        'Prefix the string with f and use {variable} syntax.',
        'f"My name is {name} and I am {age} years old"',
      ],
      concepts: ['f-string', 'refactoring', 'format()'],
    },
  ],
};
