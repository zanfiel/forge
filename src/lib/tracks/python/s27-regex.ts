import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-regex',
  title: '27. Regular Expressions',
  explanation: `## Regular Expressions

Python's \\\`re\\\` module provides regular expression support for pattern matching in strings.

### Core Functions
- **\\\`re.match()\\\`** -- matches at the start of the string
- **\\\`re.search()\\\`** -- finds the first match anywhere
- **\\\`re.findall()\\\`** -- returns all non-overlapping matches
- **\\\`re.finditer()\\\`** -- returns an iterator of match objects
- **\\\`re.sub()\\\`** -- replaces matches with a string or function result
- **\\\`re.split()\\\`** -- splits string by pattern

### Compiling Patterns
\\\`re.compile(pattern)\\\` pre-compiles a regex for reuse, improving performance in loops.

### Character Classes & Quantifiers
- \\\`\\\\d\\\`, \\\`\\\\w\\\`, \\\`\\\\s\\\` -- digit, word char, whitespace
- \\\`*\\\`, \\\`+\\\`, \\\`?\\\` -- zero+, one+, zero or one
- \\\`{n}\\\`, \\\`{n,m}\\\` -- exactly n, between n and m

### Groups & Backreferences
Parentheses \\\`()\\\` capture groups. Named groups use \\\`(?P<name>...)\\\`. Backreferences use \\\`\\\\1\\\` or \\\`(?P=name)\\\`.

### Lookahead & Lookbehind
- \\\`(?=...)\\\` positive lookahead
- \\\`(?!...)\\\` negative lookahead
- \\\`(?<=...)\\\` positive lookbehind
- \\\`(?<!...)\\\` negative lookbehind

### Greedy vs Lazy
By default quantifiers are greedy. Append \\\`?\\\` to make them lazy: \\\`*?\\\`, \\\`+?\\\`, \\\`??\\\`.

### Flags
\\\`re.IGNORECASE\\\`, \\\`re.MULTILINE\\\`, \\\`re.DOTALL\\\`, \\\`re.VERBOSE\\\` modify matching behavior.

### Raw Strings
Always use raw strings \\\`r"..."\\\` for regex patterns to avoid backslash escaping issues.
`,
  exercises: [
    {
      id: 'py-rgx-1',
      title: 'Basic match',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use re.search to find a digit in the string.',
      skeleton: `import re
result = re.__BLANK__(r"\\d", "abc3def")
print(result.group())`,
      solution: `import re
result = re.search(r"\\d", "abc3def")
print(result.group())`,
      hints: [
        'Which re function finds the first match anywhere in the string?',
        're.search() scans through the string for a match.',
        'The answer is: search',
      ],
      concepts: ['re.search', 'digit pattern'],
    },
    {
      id: 'py-rgx-2',
      title: 'Find all matches',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use re.findall to extract all words from the string.',
      skeleton: `import re
words = re.__BLANK__(r"\\w+", "Hello, World! 123")
print(words)`,
      solution: `import re
words = re.findall(r"\\w+", "Hello, World! 123")
print(words)`,
      hints: [
        'Which re function returns a list of all non-overlapping matches?',
        're.findall() returns all matches as a list.',
        'The answer is: findall',
      ],
      concepts: ['re.findall', 'word pattern'],
    },
    {
      id: 'py-rgx-3',
      title: 'Compile a pattern',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Compile a pattern that matches email-like strings, then use it.',
      skeleton: `import re
pattern = re.__BLANK__(r"\\w+@\\w+\\.\\w+")
result = pattern.search("Contact: alice@example.com")
print(result.group())`,
      solution: `import re
pattern = re.compile(r"\\w+@\\w+\\.\\w+")
result = pattern.search("Contact: alice@example.com")
print(result.group())`,
      hints: [
        'Which function pre-compiles a regex pattern?',
        're.compile() returns a compiled pattern object.',
        'The answer is: compile',
      ],
      concepts: ['re.compile', 'pattern reuse'],
    },
    {
      id: 'py-rgx-4',
      title: 'Named groups',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use a named group to capture the year from a date string.',
      skeleton: `import re
m = re.search(r"(?P<__BLANK__>\\d{4})-\\d{2}-\\d{2}", "Date: 2025-03-15")
print(m.group("year"))`,
      solution: `import re
m = re.search(r"(?P<year>\\d{4})-\\d{2}-\\d{2}", "Date: 2025-03-15")
print(m.group("year"))`,
      hints: [
        'Named groups use the syntax (?P<name>...).',
        'The group name should match what is used in m.group().',
        'The answer is: year',
      ],
      concepts: ['named groups', '(?P<name>...)'],
    },
    {
      id: 'py-rgx-5',
      title: 're.sub replacement',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use re.sub to replace all digits with "#".',
      skeleton: `import re
result = re.__BLANK__(r"\\d", "#", "Phone: 555-1234")
print(result)`,
      solution: `import re
result = re.sub(r"\\d", "#", "Phone: 555-1234")
print(result)`,
      hints: [
        'Which re function replaces pattern matches?',
        're.sub(pattern, replacement, string) does substitution.',
        'The answer is: sub',
      ],
      concepts: ['re.sub', 'replacement'],
    },
    {
      id: 'py-rgx-6',
      title: 're.split',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use re.split to split a string by one or more whitespace or comma characters.',
      skeleton: `import re
parts = re.split(r"__BLANK__", "one, two   three,four")
print(parts)`,
      solution: `import re
parts = re.split(r"[\\s,]+", "one, two   three,four")
print(parts)`,
      hints: [
        'Use a character class to match whitespace or commas.',
        '[\\s,]+ matches one or more whitespace or comma characters.',
        'The answer is: [\\s,]+',
      ],
      concepts: ['re.split', 'character classes', 'quantifiers'],
    },
    {
      id: 'py-rgx-7',
      title: 'Predict findall output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does re.findall return here?',
      skeleton: `import re
print(re.findall(r"\\d+", "I have 3 cats and 12 dogs"))`,
      solution: `['3', '12']`,
      hints: [
        '\\d+ matches one or more digits.',
        'findall returns all matches as strings.',
        'The output is: [\'3\', \'12\']',
      ],
      concepts: ['re.findall', 'quantifiers'],
    },
    {
      id: 'py-rgx-8',
      title: 'Predict group output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this grouped pattern extract?',
      skeleton: `import re
m = re.search(r"(\\w+)@(\\w+)\\.(\\w+)", "user@example.com")
print(m.groups())`,
      solution: `('user', 'example', 'com')`,
      hints: [
        'Each set of parentheses captures a group.',
        'There are three groups: before @, between @ and ., after the dot.',
        'The output is: (\'user\', \'example\', \'com\')',
      ],
      concepts: ['groups', 'capturing groups', 'groups()'],
    },
    {
      id: 'py-rgx-9',
      title: 'Predict greedy vs lazy',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What is the difference between greedy and lazy matching here?',
      skeleton: `import re
text = "<b>bold</b> and <i>italic</i>"
greedy = re.findall(r"<.*>", text)
lazy = re.findall(r"<.*?>", text)
print(lazy)`,
      solution: `['<b>', '</b>', '<i>', '</i>']`,
      hints: [
        'Greedy .* matches as much as possible, lazy .*? as little as possible.',
        'The lazy pattern stops at the first > it finds.',
        'The output is: [\'<b>\', \'</b>\', \'<i>\', \'</i>\']',
      ],
      concepts: ['greedy vs lazy', 'quantifiers'],
    },
    {
      id: 'py-rgx-10',
      title: 'Fix missing raw string',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Fix the regex that fails because it uses a regular string instead of a raw string.',
      skeleton: `import re
# Bug: \\b is interpreted as backspace, not word boundary
result = re.findall("\\bcat\\b", "the cat sat on a caterpillar")
print(result)`,
      solution: `import re
# Fixed: use raw string for regex
result = re.findall(r"\\bcat\\b", "the cat sat on a caterpillar")
print(result)`,
      hints: [
        'In regular strings, \\b means backspace character.',
        'Raw strings (r"...") treat backslashes literally.',
        'Add the r prefix to the pattern string.',
      ],
      concepts: ['raw strings', 'word boundary', 'backslash escaping'],
    },
    {
      id: 'py-rgx-11',
      title: 'Fix regex for multiline',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the pattern so ^ matches the start of each line, not just the string.',
      skeleton: `import re
text = "apple\\nbanana\\ncherry"
# Bug: ^ only matches start of string without MULTILINE
result = re.findall("^[a-z]+", text)
print(result)  # Should find: ['apple', 'banana', 'cherry']`,
      solution: `import re
text = "apple\\nbanana\\ncherry"
# Fixed: use MULTILINE flag
result = re.findall("^[a-z]+", text, re.MULTILINE)
print(result)  # Should find: ['apple', 'banana', 'cherry']`,
      hints: [
        'By default, ^ only matches the very start of the string.',
        'The re.MULTILINE flag makes ^ match start of each line.',
        'Add re.MULTILINE as the third argument to findall.',
      ],
      concepts: ['re.MULTILINE', 'anchors', 'flags'],
    },
    {
      id: 'py-rgx-12',
      title: 'Fix backslash in character class',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the regex that tries to match a literal dot but matches any character instead.',
      skeleton: `import re
# Bug: . in pattern matches any character, not a literal dot
ips = re.findall(r"\\d+.\\d+.\\d+.\\d+", "IP: 192.168.1.1 and score 9x8x7x6")
print(ips)  # Should only match IP addresses`,
      solution: `import re
# Fixed: escape the dots to match literal dots
ips = re.findall(r"\\d+\\.\\d+\\.\\d+\\.\\d+", "IP: 192.168.1.1 and score 9x8x7x6")
print(ips)  # Should only match IP addresses`,
      hints: [
        'An unescaped . in regex matches any character.',
        'To match a literal dot, escape it with a backslash.',
        'Change each . to \\. in the pattern.',
      ],
      concepts: ['escaping', 'character classes', 'literal matching'],
    },
    {
      id: 'py-rgx-13',
      title: 'Write a word extractor',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function that extracts all capitalized words from a string.',
      skeleton: `import re

def find_capitalized(text):
    # Return list of words that start with an uppercase letter
    pass

print(find_capitalized("Alice met Bob in New York"))`,
      solution: `import re

def find_capitalized(text):
    return re.findall(r"\\b[A-Z][a-z]*\\b", text)

print(find_capitalized("Alice met Bob in New York"))`,
      hints: [
        'Use \\b for word boundaries and [A-Z] for uppercase start.',
        'The pattern \\b[A-Z][a-z]*\\b matches capitalized words.',
        'Return re.findall(r"\\b[A-Z][a-z]*\\b", text)',
      ],
      concepts: ['word boundary', 'character ranges', 'findall'],
    },
    {
      id: 'py-rgx-14',
      title: 'Write a sub with function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that doubles every number found in a string using re.sub with a replacement function.',
      skeleton: `import re

def double_numbers(text):
    # Replace every number with its doubled value
    pass

print(double_numbers("I have 3 cats and 12 dogs"))
# "I have 6 cats and 24 dogs"`,
      solution: `import re

def double_numbers(text):
    return re.sub(r"\\d+", lambda m: str(int(m.group()) * 2), text)

print(double_numbers("I have 3 cats and 12 dogs"))
# "I have 6 cats and 24 dogs"`,
      hints: [
        're.sub can take a function as the replacement argument.',
        'The function receives a match object and should return a string.',
        'Use lambda m: str(int(m.group()) * 2) as the replacement function.',
      ],
      concepts: ['re.sub', 'replacement function', 'lambda'],
    },
    {
      id: 'py-rgx-15',
      title: 'Write a password validator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that validates a password has at least 8 chars, one uppercase, one lowercase, and one digit.',
      skeleton: `import re

def validate_password(pwd):
    # Return True if password meets all criteria
    pass

print(validate_password("Abc12345"))   # True
print(validate_password("abc12345"))   # False (no uppercase)
print(validate_password("Short1"))     # False (too short)`,
      solution: `import re

def validate_password(pwd):
    if len(pwd) < 8:
        return False
    if not re.search(r"[A-Z]", pwd):
        return False
    if not re.search(r"[a-z]", pwd):
        return False
    if not re.search(r"\\d", pwd):
        return False
    return True

print(validate_password("Abc12345"))   # True
print(validate_password("abc12345"))   # False (no uppercase)
print(validate_password("Short1"))     # False (too short)`,
      hints: [
        'Check each criterion separately with re.search.',
        'Use [A-Z] for uppercase, [a-z] for lowercase, \\d for digits.',
        'Return False as soon as any check fails, True if all pass.',
      ],
      concepts: ['validation', 're.search', 'character classes'],
    },
    {
      id: 'py-rgx-16',
      title: 'Write a lookahead pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that finds all words that are followed by a comma using lookahead.',
      skeleton: `import re

def words_before_comma(text):
    # Return list of words immediately followed by a comma
    pass

print(words_before_comma("apples, oranges, and bananas"))
# ['apples', 'oranges']`,
      solution: `import re

def words_before_comma(text):
    return re.findall(r"\\w+(?=,)", text)

print(words_before_comma("apples, oranges, and bananas"))
# ['apples', 'oranges']`,
      hints: [
        'Lookahead (?=...) matches a position without consuming characters.',
        '\\w+(?=,) matches word characters followed by a comma.',
        'Return re.findall(r"\\w+(?=,)", text)',
      ],
      concepts: ['lookahead', '(?=...)', 'findall'],
    },
    {
      id: 'py-rgx-17',
      title: 'Write a verbose regex',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that parses a date string using a verbose regex with named groups.',
      skeleton: `import re

def parse_date(text):
    # Parse "YYYY-MM-DD" and return dict with year, month, day
    pass

print(parse_date("2025-03-15"))
# {'year': '2025', 'month': '03', 'day': '15'}`,
      solution: `import re

def parse_date(text):
    pattern = re.compile(r"""
        (?P<year>\\d{4})    # Year: 4 digits
        -                   # Separator
        (?P<month>\\d{2})   # Month: 2 digits
        -                   # Separator
        (?P<day>\\d{2})     # Day: 2 digits
    """, re.VERBOSE)
    m = pattern.search(text)
    if m:
        return m.groupdict()
    return None

print(parse_date("2025-03-15"))
# {'year': '2025', 'month': '03', 'day': '15'}`,
      hints: [
        're.VERBOSE allows whitespace and comments in patterns.',
        'Named groups with (?P<name>...) can be extracted with groupdict().',
        'Use re.compile with VERBOSE flag and triple-quoted string.',
      ],
      concepts: ['re.VERBOSE', 'named groups', 'groupdict'],
    },
    {
      id: 'py-rgx-18',
      title: 'Write a lookbehind pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that extracts dollar amounts (digits after $) using lookbehind.',
      skeleton: `import re

def find_prices(text):
    # Return list of numbers that follow a $ sign
    pass

print(find_prices("Items cost $10 and $25.50"))
# ['10', '25.50']`,
      solution: `import re

def find_prices(text):
    return re.findall(r"(?<=\\$)[\\d.]+", text)

print(find_prices("Items cost $10 and $25.50"))
# ['10', '25.50']`,
      hints: [
        'Lookbehind (?<=...) asserts what precedes the match.',
        '(?<=\\$) checks for a $ sign before the digits.',
        'Return re.findall(r"(?<=\\$)[\\d.]+", text)',
      ],
      concepts: ['lookbehind', '(?<=...)', 'escaping $'],
    },
    {
      id: 'py-rgx-19',
      title: 'Refactor string methods to regex',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the chain of string methods into a single regex substitution.',
      skeleton: `def clean_text(text):
    result = text.replace("  ", " ")
    result = result.replace("\\t", " ")
    result = result.replace("\\n", " ")
    while "  " in result:
        result = result.replace("  ", " ")
    return result.strip()

print(clean_text("  hello   world\\t\\tand\\n\\nmore  "))`,
      solution: `import re

def clean_text(text):
    return re.sub(r"\\s+", " ", text).strip()

print(clean_text("  hello   world\\t\\tand\\n\\nmore  "))`,
      hints: [
        'The original code is replacing multiple whitespace types.',
        '\\s+ matches one or more whitespace characters of any type.',
        'A single re.sub(r"\\s+", " ", text).strip() replaces the entire chain.',
      ],
      concepts: ['refactoring', 're.sub', 'whitespace normalization'],
    },
    {
      id: 'py-rgx-20',
      title: 'Refactor repeated searches to compiled pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the code to compile the regex pattern once instead of recompiling on each call.',
      skeleton: `import re

def find_emails(texts):
    results = []
    for text in texts:
        found = re.findall(r"[\\w.+-]+@[\\w-]+\\.[\\w.-]+", text)
        results.extend(found)
    return results

texts = ["Email alice@example.com", "Contact bob@test.org", "None here"]
print(find_emails(texts))`,
      solution: `import re

EMAIL_PATTERN = re.compile(r"[\\w.+-]+@[\\w-]+\\.[\\w.-]+")

def find_emails(texts):
    results = []
    for text in texts:
        found = EMAIL_PATTERN.findall(text)
        results.extend(found)
    return results

texts = ["Email alice@example.com", "Contact bob@test.org", "None here"]
print(find_emails(texts))`,
      hints: [
        'Compiling the pattern once avoids recompilation on each iteration.',
        'Use re.compile() at module level and call .findall() on the compiled object.',
        'Move the pattern to a module-level constant using re.compile().',
      ],
      concepts: ['refactoring', 're.compile', 'performance'],
    },
  ],
};
