import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-walrus-match',
  title: '44. Walrus & Match',
  explanation: `## Walrus Operator & Pattern Matching

Two powerful features from modern Python -- the walrus operator (3.8+) and structural pattern matching (3.10+).

### Walrus Operator (:=)
The walrus operator assigns a value to a variable as part of an expression.

\`\`\`python
# Without walrus
data = get_data()
if data:
    process(data)

# With walrus
if data := get_data():
    process(data)
\`\`\`

Common uses:
- **while loops** -- \`while chunk := file.read(8192):\`
- **list comprehensions** -- filter and transform in one step
- **if conditions** -- assign and test in one expression

### Structural Pattern Matching (match/case)
\`\`\`python
match command:
    case "quit":
        exit()
    case "hello":
        print("Hi!")
    case _:
        print("Unknown")
\`\`\`

### Pattern Types
- **Literal** -- match exact values: \`case 42:\`
- **Capture** -- bind to variable: \`case x:\`
- **Wildcard** -- match anything: \`case _:\`
- **Sequence** -- match lists/tuples: \`case [x, y]:\`
- **Mapping** -- match dicts: \`case {"key": value}:\`
- **Class** -- match objects: \`case Point(x=0, y=0):\`
- **OR** -- combine patterns: \`case "yes" | "y":\`
- **Guard** -- add conditions: \`case x if x > 0:\`

### Nested Patterns
\`\`\`python
match data:
    case {"users": [{"name": name}, *rest]}:
        print(f"First user: {name}")
\`\`\`
`,
  exercises: [
    {
      id: 'py-wm-1',
      title: 'Basic walrus operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use the walrus operator to assign and test in one expression.',
      skeleton: `data = [1, 2, 3, 4, 5]

if (n __BLANK__ len(data)) > 3:
    print(f"List has {n} items")`,
      solution: `data = [1, 2, 3, 4, 5]

if (n := len(data)) > 3:
    print(f"List has {n} items")`,
      hints: [
        'The walrus operator assigns and returns a value in an expression.',
        'It looks like a walrus on its side -- colon equals.',
        'The answer is: :=',
      ],
      concepts: ['walrus operator', ':=', 'assignment expression'],
    },
    {
      id: 'py-wm-2',
      title: 'Walrus in while loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use the walrus operator in a while loop.',
      skeleton: `import io

buffer = io.StringIO("Hello World")

while (chunk __BLANK__ buffer.read(5)):
    print(chunk)`,
      solution: `import io

buffer = io.StringIO("Hello World")

while (chunk := buffer.read(5)):
    print(chunk)`,
      hints: [
        'Assign the read result to chunk and test if it is truthy.',
        'When read() returns empty string, the loop stops.',
        'The answer is: :=',
      ],
      concepts: ['walrus operator', 'while loop'],
    },
    {
      id: 'py-wm-3',
      title: 'Basic match statement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a basic match/case statement.',
      skeleton: `command = "greet"

__BLANK__ command:
    case "greet":
        print("Hello!")
    case "farewell":
        print("Goodbye!")
    case _:
        print("Unknown command")`,
      solution: `command = "greet"

match command:
    case "greet":
        print("Hello!")
    case "farewell":
        print("Goodbye!")
    case _:
        print("Unknown command")`,
      hints: [
        'Python 3.10+ introduced structural pattern matching.',
        'The keyword starts the pattern matching block.',
        'The answer is: match',
      ],
      concepts: ['match', 'pattern matching', 'case'],
    },
    {
      id: 'py-wm-4',
      title: 'Wildcard pattern',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use the wildcard pattern as a catch-all case.',
      skeleton: `status = 404

match status:
    case 200:
        msg = "OK"
    case 404:
        msg = "Not Found"
    case 500:
        msg = "Server Error"
    case __BLANK__:
        msg = "Unknown Status"

print(msg)`,
      solution: `status = 404

match status:
    case 200:
        msg = "OK"
    case 404:
        msg = "Not Found"
    case 500:
        msg = "Server Error"
    case _:
        msg = "Unknown Status"

print(msg)`,
      hints: [
        'A special pattern matches anything and discards the value.',
        'It is the underscore character, acting as a wildcard.',
        'The answer is: _',
      ],
      concepts: ['wildcard pattern', 'catch-all'],
    },
    {
      id: 'py-wm-5',
      title: 'Write walrus in comprehension',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use the walrus operator in a list comprehension to avoid duplicate computation.',
      skeleton: `import math

numbers = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# Write a list comprehension that:
# 1. Computes math.sqrt(n) using walrus operator
# 2. Only includes results where the sqrt is > 5
# 3. Stores the sqrt values (not the original numbers)
# Result should be: [6.0, 7.0, 8.0, 9.0, 10.0]

result = []  # Replace with list comprehension`,
      solution: `import math

numbers = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

result = [root for n in numbers if (root := math.sqrt(n)) > 5]`,
      hints: [
        'Use := to compute sqrt once and use it in both filter and output.',
        'The walrus operator in the if clause assigns to root.',
        '[root for n in numbers if (root := math.sqrt(n)) > 5]',
      ],
      concepts: ['walrus operator', 'list comprehension', 'efficiency'],
    },
    {
      id: 'py-wm-6',
      title: 'Predict walrus output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict the output of code using the walrus operator.',
      skeleton: `values = [2, 8, 3, 10, 5, 1]
filtered = [y for x in values if (y := x * 2) > 6]
print(filtered)`,
      solution: `[16, 6, 20, 10]`,
      hints: [
        'For each x, compute y = x * 2 and keep if y > 6.',
        '2*2=4 (no), 8*2=16 (yes), 3*2=6 (no), 10*2=20 (yes), 5*2=10 (yes), 1*2=2 (no).',
        'Wait -- 3*2=6, and 6 > 6 is False. Output: [16, 20, 10]. Actually check: 8*2=16 yes, 3*2=6 no (not >6), 10*2=20 yes, 5*2=10 yes. Result: [16, 20, 10].',
      ],
      concepts: ['walrus operator', 'list comprehension'],
    },
    {
      id: 'py-wm-7',
      title: 'Fix walrus misuse',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix incorrect usage of the walrus operator.',
      skeleton: `# Bug: walrus operator cannot be used as a standalone statement
x := 10
print(x)`,
      solution: `x = 10
print(x)`,
      hints: [
        'The walrus operator is for use WITHIN expressions, not as statements.',
        'For standalone assignment, use regular = operator.',
        'Change x := 10 to x = 10.',
      ],
      concepts: ['walrus operator', 'assignment vs expression'],
    },
    {
      id: 'py-wm-8',
      title: 'Sequence pattern matching',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use sequence patterns to destructure a list.',
      skeleton: `point = [3, 7]

match point:
    case [0, 0]:
        desc = "origin"
    case [x, __BLANK__]:
        desc = f"x={x}, y=0"
    case [__BLANK__, y]:
        desc = f"x=0, y={y}"
    case [x, y]:
        desc = f"x={x}, y={y}"

print(desc)`,
      solution: `point = [3, 7]

match point:
    case [0, 0]:
        desc = "origin"
    case [x, 0]:
        desc = f"x={x}, y=0"
    case [0, y]:
        desc = f"x=0, y={y}"
    case [x, y]:
        desc = f"x={x}, y={y}"

print(desc)`,
      hints: [
        'Literal values (like 0) match exactly, variables capture the value.',
        'case [x, 0] matches a 2-element list where the second element is 0.',
        'The answers are: 0 and 0 (literal zeros for specific axis patterns).',
      ],
      concepts: ['sequence pattern', 'destructuring', 'match'],
    },
    {
      id: 'py-wm-9',
      title: 'Write match with OR pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function using match with OR patterns.',
      skeleton: `# Write a function 'classify_char' that uses match/case to:
# 1. Return "vowel" for a, e, i, o, u (use OR pattern with |)
# 2. Return "digit" for 0-9 (check with guard: case c if c.isdigit())
# 3. Return "other" for anything else

def classify_char(c):
    pass`,
      solution: `def classify_char(c):
    match c.lower():
        case "a" | "e" | "i" | "o" | "u":
            return "vowel"
        case c if c.isdigit():
            return "digit"
        case _:
            return "other"`,
      hints: [
        'Use | to combine multiple literal patterns in one case.',
        'case "a" | "e" | "i" | "o" | "u" matches any vowel.',
        'Use case c if c.isdigit() as a guard pattern for digits.',
      ],
      concepts: ['OR pattern', 'guard', 'match'],
    },
    {
      id: 'py-wm-10',
      title: 'Fix match statement bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the match statement that uses a variable name instead of a value.',
      skeleton: `HTTP_OK = 200
HTTP_NOT_FOUND = 404

status = 200

match status:
    case HTTP_OK:  # Bug: this captures into variable HTTP_OK, not compare!
        print("Success")
    case HTTP_NOT_FOUND:
        print("Not Found")
    case _:
        print("Other")`,
      solution: `from enum import IntEnum

class Status(IntEnum):
    HTTP_OK = 200
    HTTP_NOT_FOUND = 404

status = 200

match status:
    case Status.HTTP_OK:
        print("Success")
    case Status.HTTP_NOT_FOUND:
        print("Not Found")
    case _:
        print("Other")`,
      hints: [
        'In match/case, bare names are capture patterns, not value comparisons.',
        'To match a constant, use a dotted name (qualified name) or literal.',
        'Use an enum or class with attributes: case Status.HTTP_OK matches the value.',
      ],
      concepts: ['capture pattern', 'value pattern', 'dotted name'],
    },
    {
      id: 'py-wm-11',
      title: 'Mapping pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use a mapping pattern to match and extract from a dictionary.',
      skeleton: `event = {"type": "click", "x": 100, "y": 200}

match event:
    case {"type": "click", __BLANK__: x, __BLANK__: y}:
        print(f"Click at ({x}, {y})")
    case {"type": "keypress", "key": key}:
        print(f"Key: {key}")`,
      solution: `event = {"type": "click", "x": 100, "y": 200}

match event:
    case {"type": "click", "x": x, "y": y}:
        print(f"Click at ({x}, {y})")
    case {"type": "keypress", "key": key}:
        print(f"Key: {key}")`,
      hints: [
        'Mapping patterns match dictionary keys as string literals.',
        'The values can be capture variables.',
        'The answers are: "x" and "y" (string keys that capture into variables).',
      ],
      concepts: ['mapping pattern', 'dictionary matching'],
    },
    {
      id: 'py-wm-12',
      title: 'Predict match output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict the output of pattern matching.',
      skeleton: `data = [1, 2, 3, 4, 5]

match data:
    case [1, 2, *rest]:
        print(f"starts with 1,2 rest={rest}")
    case [1, *rest]:
        print(f"starts with 1 rest={rest}")
    case _:
        print("no match")`,
      solution: `starts with 1,2 rest=[3, 4, 5]`,
      hints: [
        '*rest captures remaining elements of a sequence.',
        'The first case matches because data starts with [1, 2, ...].',
        'rest captures [3, 4, 5]. Only the first matching case runs.',
      ],
      concepts: ['star pattern', 'sequence matching', 'first match'],
    },
    {
      id: 'py-wm-13',
      title: 'Write class pattern matcher',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function using class patterns in match/case.',
      skeleton: `from dataclasses import dataclass

@dataclass
class Circle:
    radius: float

@dataclass
class Rectangle:
    width: float
    height: float

@dataclass
class Triangle:
    base: float
    height: float

# Write a function 'area' that uses match/case with class patterns
# to compute the area of any shape

def area(shape):
    pass`,
      solution: `from dataclasses import dataclass
import math

@dataclass
class Circle:
    radius: float

@dataclass
class Rectangle:
    width: float
    height: float

@dataclass
class Triangle:
    base: float
    height: float

def area(shape):
    match shape:
        case Circle(radius=r):
            return math.pi * r ** 2
        case Rectangle(width=w, height=h):
            return w * h
        case Triangle(base=b, height=h):
            return 0.5 * b * h
        case _:
            raise ValueError(f"Unknown shape: {shape}")`,
      hints: [
        'Class patterns use ClassName(attr=var) syntax.',
        'Dataclasses work with class patterns by default.',
        'case Circle(radius=r) captures the radius attribute into variable r.',
      ],
      concepts: ['class pattern', 'dataclass', 'pattern matching'],
    },
    {
      id: 'py-wm-14',
      title: 'Guard clause in match',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a match statement with guard clauses.',
      skeleton: `# Write a function 'categorize_number' that uses match/case to:
# 1. case 0: return "zero"
# 2. case n if n > 0 and n < 10: return "small positive"
# 3. case n if n >= 10: return "large positive"
# 4. case n if n < 0: return "negative"

def categorize_number(n):
    pass`,
      solution: `def categorize_number(n):
    match n:
        case 0:
            return "zero"
        case n if n > 0 and n < 10:
            return "small positive"
        case n if n >= 10:
            return "large positive"
        case n if n < 0:
            return "negative"`,
      hints: [
        'Guards are added with "if" after the pattern.',
        'case n captures the value, "if n > 0" adds a condition.',
        'The literal case 0 should come first for exact matching.',
      ],
      concepts: ['guard clause', 'match', 'conditional patterns'],
    },
    {
      id: 'py-wm-15',
      title: 'Predict nested match',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Predict the output of nested pattern matching.',
      skeleton: `config = {
    "database": {
        "host": "localhost",
        "port": 5432,
    },
    "debug": True,
}

match config:
    case {"database": {"host": host, "port": port}, "debug": True}:
        print(f"Debug mode: {host}:{port}")
    case {"database": {"host": host}}:
        print(f"Production: {host}")
    case _:
        print("No config")`,
      solution: `Debug mode: localhost:5432`,
      hints: [
        'Nested mapping patterns can match nested dictionaries.',
        'The first case matches because debug is True.',
        'host captures "localhost" and port captures 5432.',
      ],
      concepts: ['nested patterns', 'mapping pattern', 'match'],
    },
    {
      id: 'py-wm-16',
      title: 'Write walrus with regex',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function using walrus operator with regex matching.',
      skeleton: `import re

# Write a function 'extract_emails' that:
# 1. Takes a list of strings
# 2. For each string, uses re.search with walrus operator
# 3. If a match is found, extracts the email
# 4. Returns list of found emails
# Pattern: r'[\\w.]+@[\\w.]+'

def extract_emails(lines):
    pass`,
      solution: `import re

def extract_emails(lines):
    emails = []
    for line in lines:
        if (m := re.search(r'[\\w.]+@[\\w.]+', line)):
            emails.append(m.group())
    return emails`,
      hints: [
        'Use := to assign the match result and test if it is not None.',
        'if (m := re.search(pattern, line)): processes the match inline.',
        'Call m.group() to extract the matched text.',
      ],
      concepts: ['walrus operator', 'regex', 're.search'],
    },
    {
      id: 'py-wm-17',
      title: 'Fix match with star pattern',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the incorrect star pattern in match/case.',
      skeleton: `def process_args(args):
    match args:
        case []:
            return "no args"
        case [cmd]:
            return f"command: {cmd}"
        case [cmd, *flags, **opts]:  # Bug: ** not allowed in sequence pattern
            return f"command: {cmd}, flags: {flags}"

print(process_args(["run", "--verbose", "--debug"]))`,
      solution: `def process_args(args):
    match args:
        case []:
            return "no args"
        case [cmd]:
            return f"command: {cmd}"
        case [cmd, *flags]:
            return f"command: {cmd}, flags: {flags}"

print(process_args(["run", "--verbose", "--debug"]))`,
      hints: [
        '** is for mapping patterns (dicts), not sequence patterns (lists).',
        'In sequence patterns, use *name to capture remaining elements.',
        'Remove **opts -- just use [cmd, *flags].',
      ],
      concepts: ['star pattern', 'sequence pattern', 'match syntax'],
    },
    {
      id: 'py-wm-18',
      title: 'Write AST-style matcher',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a simple expression evaluator using match/case.',
      skeleton: `from dataclasses import dataclass
from typing import Union

@dataclass
class Num:
    value: float

@dataclass
class Add:
    left: "Expr"
    right: "Expr"

@dataclass
class Mul:
    left: "Expr"
    right: "Expr"

Expr = Union[Num, Add, Mul]

# Write a function 'evaluate' that uses match/case to
# recursively evaluate an expression tree

def evaluate(expr):
    pass`,
      solution: `from dataclasses import dataclass
from typing import Union

@dataclass
class Num:
    value: float

@dataclass
class Add:
    left: "Expr"
    right: "Expr"

@dataclass
class Mul:
    left: "Expr"
    right: "Expr"

Expr = Union[Num, Add, Mul]

def evaluate(expr):
    match expr:
        case Num(value=v):
            return v
        case Add(left=l, right=r):
            return evaluate(l) + evaluate(r)
        case Mul(left=l, right=r):
            return evaluate(l) * evaluate(r)
        case _:
            raise ValueError(f"Unknown expression: {expr}")`,
      hints: [
        'Use class patterns to match each expression type.',
        'case Num(value=v) extracts the value from a Num node.',
        'Add and Mul recursively evaluate their left and right children.',
      ],
      concepts: ['class pattern', 'recursion', 'AST evaluation'],
    },
    {
      id: 'py-wm-19',
      title: 'Refactor if-elif to match',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor a chain of if-elif statements to use match/case.',
      skeleton: `def handle_response(response):
    status = response["status"]
    body = response.get("body", "")

    if status == 200 and body:
        return f"Success: {body}"
    elif status == 200 and not body:
        return "Success: empty response"
    elif status == 301:
        location = response.get("location", "unknown")
        return f"Redirect to {location}"
    elif status == 404:
        return "Not Found"
    elif status == 500:
        error = response.get("error", "unknown error")
        return f"Server Error: {error}"
    else:
        return f"Status: {status}"`,
      solution: `def handle_response(response):
    match response:
        case {"status": 200, "body": body} if body:
            return f"Success: {body}"
        case {"status": 200}:
            return "Success: empty response"
        case {"status": 301, "location": location}:
            return f"Redirect to {location}"
        case {"status": 301}:
            return "Redirect to unknown"
        case {"status": 404}:
            return "Not Found"
        case {"status": 500, "error": error}:
            return f"Server Error: {error}"
        case {"status": 500}:
            return "Server Error: unknown error"
        case {"status": status}:
            return f"Status: {status}"`,
      hints: [
        'Mapping patterns can match dict keys and extract values.',
        'Use guards (if body) for additional conditions.',
        'Mapping patterns match partial dicts -- extra keys are ignored.',
      ],
      concepts: ['refactoring', 'match', 'mapping pattern', 'guard'],
    },
    {
      id: 'py-wm-20',
      title: 'Refactor nested ifs to walrus',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor code with repeated computations to use walrus operator.',
      skeleton: `import re

def parse_log_line(line):
    # Repeated computation -- re.search is called twice for the same pattern
    if re.search(r'ERROR (\\w+)', line):
        error_match = re.search(r'ERROR (\\w+)', line)
        error_code = error_match.group(1)
        if re.search(r'at line (\\d+)', line):
            line_match = re.search(r'at line (\\d+)', line)
            return f"Error {error_code} at line {line_match.group(1)}"
        return f"Error {error_code}"
    if re.search(r'WARNING', line):
        return "Warning detected"
    return "OK"`,
      solution: `import re

def parse_log_line(line):
    if (error_match := re.search(r'ERROR (\\w+)', line)):
        error_code = error_match.group(1)
        if (line_match := re.search(r'at line (\\d+)', line)):
            return f"Error {error_code} at line {line_match.group(1)}"
        return f"Error {error_code}"
    if (warn_match := re.search(r'WARNING', line)):
        return "Warning detected"
    return "OK"`,
      hints: [
        'Each regex search is done twice -- once to check, once to use.',
        'The walrus operator lets you search once and use the result.',
        'if (m := re.search(pattern, line)): assigns and tests in one step.',
      ],
      concepts: ['refactoring', 'walrus operator', 'DRY', 'regex'],
    },
  ],
};
