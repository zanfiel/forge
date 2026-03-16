import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-booleans',
  title: '4. Booleans & Conditions',
  explanation: `## Booleans & Conditions

Python has two boolean values: \\\`True\\\` and \\\`False\\\` (capitalized).

### Truthy & Falsy
These are falsy: \\\`False\\\`, \\\`0\\\`, \\\`0.0\\\`, \\\`""\\\`, \\\`[]\\\`, \\\`()\\\`, \\\`{}\\\`, \\\`set()\\\`, \\\`None\\\`. Everything else is truthy.

### Comparison Operators
\\\`==\\\`, \\\`!=\\\`, \\\`<\\\`, \\\`>\\\`, \\\`<=\\\`, \\\`>=\\\`. Python supports chaining: \\\`1 < x < 10\\\`.

### Logical Operators
\\\`and\\\`, \\\`or\\\`, \\\`not\\\`. They short-circuit: \\\`and\\\` stops at the first falsy value, \\\`or\\\` stops at the first truthy value.

### Identity & Membership
- \\\`is\\\` / \\\`is not\\\` check object identity (same object in memory).
- \\\`in\\\` / \\\`not in\\\` check membership in a collection.

### Conditionals
\\\`if\\\`/\\\`elif\\\`/\\\`else\\\` for branching. Ternary: \\\`x if condition else y\\\`.

### match/case (Python 3.10+)
Structural pattern matching for more complex branching.
`,
  exercises: [
    {
      id: 'py-bool-1',
      title: 'Boolean Literal',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Assign the boolean True to the variable is_active.',
      skeleton: `is_active = __BLANK__
print(is_active)`,
      solution: `is_active = True
print(is_active)`,
      hints: [
        'Python booleans are capitalized.',
        'True and False are the two boolean literals.',
        'The answer is: True',
      ],
      concepts: ['boolean', 'True'],
    },
    {
      id: 'py-bool-2',
      title: 'Comparison Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Check if x is greater than or equal to 10.',
      skeleton: `x = 15
result = x __BLANK__ 10
print(result)  # True`,
      solution: `x = 15
result = x >= 10
print(result)  # True`,
      hints: [
        'Greater than or equal uses two characters.',
        'Combine > and = into one operator.',
        'The answer is: >=',
      ],
      concepts: ['comparison operators', '>='],
    },
    {
      id: 'py-bool-3',
      title: 'Logical AND',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Check if both conditions are true using a logical operator.',
      skeleton: `age = 25
has_license = True
can_drive = age >= 16 __BLANK__ has_license
print(can_drive)  # True`,
      solution: `age = 25
has_license = True
can_drive = age >= 16 and has_license
print(can_drive)  # True`,
      hints: [
        'Python uses English words for logical operators.',
        'The operator for logical conjunction is "and".',
        'The answer is: and',
      ],
      concepts: ['logical operators', 'and'],
    },
    {
      id: 'py-bool-4',
      title: 'if/elif/else',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete the elif branch.',
      skeleton: `score = 75
if score >= 90:
    grade = "A"
__BLANK__ score >= 80:
    grade = "B"
else:
    grade = "C"
print(grade)  # C`,
      solution: `score = 75
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C"
print(grade)  # C`,
      hints: [
        'The keyword for "else if" in Python is elif.',
        'It is a combination of else and if.',
        'The answer is: elif',
      ],
      concepts: ['if/elif/else', 'conditionals'],
    },
    {
      id: 'py-bool-5',
      title: 'Ternary Expression',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use a ternary expression to assign "even" or "odd".',
      skeleton: `n = 7
label = "even" __BLANK__ "odd"
print(label)  # odd`,
      solution: `n = 7
label = "even" if n % 2 == 0 else "odd"
print(label)  # odd`,
      hints: [
        'Python ternary: value_if_true if condition else value_if_false.',
        'The condition goes between the two values.',
        'The answer is: if n % 2 == 0 else',
      ],
      concepts: ['ternary expression', 'conditional expression'],
    },
    {
      id: 'py-bool-6',
      title: 'Membership Test',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Check if "banana" is in the fruits list.',
      skeleton: `fruits = ["apple", "banana", "cherry"]
result = "banana" __BLANK__ fruits
print(result)  # True`,
      solution: `fruits = ["apple", "banana", "cherry"]
result = "banana" in fruits
print(result)  # True`,
      hints: [
        'The membership operator checks if a value exists in a collection.',
        'It is a two-letter keyword.',
        'The answer is: in',
      ],
      concepts: ['in operator', 'membership test'],
    },
    {
      id: 'py-bool-7',
      title: 'Write classify_age Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function classify_age(age) that returns "child" (< 13), "teen" (13-17), or "adult" (18+).',
      skeleton: `def classify_age(age):
    # Return "child", "teen", or "adult"
    pass`,
      solution: `def classify_age(age):
    if age < 13:
        return "child"
    elif age < 18:
        return "teen"
    else:
        return "adult"`,
      hints: [
        'Use if/elif/else to check the ranges.',
        'Check < 13 first, then < 18.',
        'Return the appropriate string for each range.',
      ],
      concepts: ['if/elif/else', 'comparison'],
    },
    {
      id: 'py-bool-8',
      title: 'Write all_positive Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function all_positive(numbers) that returns True if all numbers are positive.',
      skeleton: `def all_positive(numbers):
    # Check if all numbers are positive
    pass`,
      solution: `def all_positive(numbers):
    return all(n > 0 for n in numbers)`,
      hints: [
        'The built-in all() returns True if all elements are truthy.',
        'Use a generator expression inside all().',
        'all(n > 0 for n in numbers)',
      ],
      concepts: ['all()', 'generator expression'],
    },
    {
      id: 'py-bool-9',
      title: 'Predict Short-Circuit',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `x = 0
result = x or "default"
print(result)`,
      solution: `default`,
      hints: [
        'The or operator returns the first truthy value.',
        '0 is falsy, so Python evaluates the second operand.',
        '"default" is truthy and gets returned.',
      ],
      concepts: ['short-circuit evaluation', 'or operator'],
    },
    {
      id: 'py-bool-10',
      title: 'Predict Chained Comparison',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `x = 5
print(1 < x < 10)`,
      solution: `True`,
      hints: [
        'Python supports chained comparisons.',
        '1 < x < 10 means 1 < x and x < 10.',
        'x is 5, which is between 1 and 10.',
      ],
      concepts: ['chained comparison'],
    },
    {
      id: 'py-bool-11',
      title: 'Write any_negative Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function any_negative(numbers) that returns True if any number is negative.',
      skeleton: `def any_negative(numbers):
    # Check if any number is negative
    pass`,
      solution: `def any_negative(numbers):
    return any(n < 0 for n in numbers)`,
      hints: [
        'The built-in any() returns True if any element is truthy.',
        'Use a generator expression inside any().',
        'any(n < 0 for n in numbers)',
      ],
      concepts: ['any()', 'generator expression'],
    },
    {
      id: 'py-bool-12',
      title: 'Fix the Bug: None Check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the None check to use the correct operator.',
      skeleton: `def process(value):
    if value == None:
        return "no value"
    return str(value)

print(process(None))`,
      solution: `def process(value):
    if value is None:
        return "no value"
    return str(value)

print(process(None))`,
      hints: [
        'Comparing to None should use "is", not "==".',
        'None is a singleton, so identity check is preferred.',
        'Use "value is None" instead of "value == None".',
      ],
      concepts: ['is operator', 'None check', 'PEP 8'],
    },
    {
      id: 'py-bool-13',
      title: 'Write safe_divide Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function safe_divide(a, b) that returns a/b, or None if b is 0.',
      skeleton: `def safe_divide(a, b):
    # Divide safely, return None on division by zero
    pass`,
      solution: `def safe_divide(a, b):
    if b == 0:
        return None
    return a / b`,
      hints: [
        'Check if b is 0 before dividing.',
        'Return None for the error case.',
        'Use an if statement as a guard clause.',
      ],
      concepts: ['guard clause', 'None', 'division'],
    },
    {
      id: 'py-bool-14',
      title: 'Fix the Bug: Boolean Evaluation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the function so it correctly checks if a list is not empty.',
      skeleton: `def has_items(lst):
    if lst == True:
        return True
    return False

print(has_items([1, 2, 3]))  # Should print True`,
      solution: `def has_items(lst):
    if lst:
        return True
    return False

print(has_items([1, 2, 3]))  # Should print True`,
      hints: [
        'A non-empty list is truthy; an empty list is falsy.',
        'Do not compare a list to True with ==.',
        'Just use "if lst:" to check truthiness.',
      ],
      concepts: ['truthy/falsy', 'list truthiness'],
    },
    {
      id: 'py-bool-15',
      title: 'Predict Truthy Evaluation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `print(bool(""), bool("0"), bool([]), bool([0]))`,
      solution: `False True False True`,
      hints: [
        'Empty string is falsy, but "0" is a non-empty string (truthy).',
        'Empty list is falsy, but [0] has one element (truthy).',
        'Only empty collections and zero-like values are falsy.',
      ],
      concepts: ['bool()', 'truthy/falsy'],
    },
    {
      id: 'py-bool-16',
      title: 'Write validate_password Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function validate_password(pw) that returns True if the password is at least 8 chars, has at least one digit, and at least one uppercase letter.',
      skeleton: `def validate_password(pw):
    # Validate password requirements
    pass`,
      solution: `def validate_password(pw):
    return (
        len(pw) >= 8
        and any(c.isdigit() for c in pw)
        and any(c.isupper() for c in pw)
    )`,
      hints: [
        'Check length with len().',
        'Use any() with isdigit() to check for digits.',
        'Use any() with isupper() to check for uppercase.',
      ],
      concepts: ['any()', 'string methods', 'validation'],
    },
    {
      id: 'py-bool-17',
      title: 'Walrus Operator in Condition',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function first_long_word(words, min_length) that returns the first word longer than min_length, or None.',
      skeleton: `def first_long_word(words, min_length):
    # Use walrus operator to find first long word
    pass`,
      solution: `def first_long_word(words, min_length):
    for word in words:
        if (n := len(word)) > min_length:
            return word
    return None`,
      hints: [
        'The walrus operator := assigns and returns a value.',
        'Use it in a condition: if (n := len(word)) > min_length.',
        'Return None if no word qualifies.',
      ],
      concepts: ['walrus operator', ':=', 'assignment expression'],
    },
    {
      id: 'py-bool-18',
      title: 'Fix the Bug: Short-Circuit Side Effect',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the code so both validation functions are always called and their results collected.',
      skeleton: `def check_name(name):
    return len(name) > 0

def check_age(age):
    return age >= 0

def validate(name, age):
    # Bug: if check_name fails, check_age is never called
    return check_name(name) and check_age(age)

# We need both results for error reporting
errors = []
name_ok = check_name("")
age_ok = check_age(-1)
if not name_ok:
    errors.append("bad name")
if not age_ok:
    errors.append("bad age")
print(errors)  # Should print ['bad name', 'bad age']`,
      solution: `def check_name(name):
    return len(name) > 0

def check_age(age):
    return age >= 0

def validate(name, age):
    name_ok = check_name(name)
    age_ok = check_age(age)
    return name_ok and age_ok

errors = []
name_ok = check_name("")
age_ok = check_age(-1)
if not name_ok:
    errors.append("bad name")
if not age_ok:
    errors.append("bad age")
print(errors)  # Should print ['bad name', 'bad age']`,
      hints: [
        'Short-circuit evaluation skips the second operand if the first determines the result.',
        'Store each result in a variable first, then combine.',
        'This ensures both checks run regardless of the first result.',
      ],
      concepts: ['short-circuit evaluation', 'validation'],
    },
    {
      id: 'py-bool-19',
      title: 'Refactor Nested Conditions',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the deeply nested conditions into guard clauses.',
      skeleton: `def process_order(order):
    if order is not None:
        if order.get("items"):
            if order.get("payment"):
                return "processed"
            else:
                return "no payment"
        else:
            return "no items"
    else:
        return "no order"`,
      solution: `def process_order(order):
    if order is None:
        return "no order"
    if not order.get("items"):
        return "no items"
    if not order.get("payment"):
        return "no payment"
    return "processed"`,
      hints: [
        'Guard clauses return early for error cases.',
        'Invert the conditions and return early.',
        'This flattens the nesting and improves readability.',
      ],
      concepts: ['guard clauses', 'refactoring', 'early return'],
    },
    {
      id: 'py-bool-20',
      title: 'Refactor with all()',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the loop-based check to use all().',
      skeleton: `def all_even(numbers):
    for n in numbers:
        if n % 2 != 0:
            return False
    return True`,
      solution: `def all_even(numbers):
    return all(n % 2 == 0 for n in numbers)`,
      hints: [
        'all() returns True if all elements of an iterable are truthy.',
        'Use a generator expression inside all().',
        'all(n % 2 == 0 for n in numbers)',
      ],
      concepts: ['all()', 'refactoring', 'generator expression'],
    },
  ],
};
