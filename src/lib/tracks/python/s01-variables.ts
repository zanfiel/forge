import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-variables',
  title: '1. Variables & Assignment',
  explanation: `## Variables & Assignment

Python variables are created the moment you first assign a value. There is no separate declaration step.

### Naming Rules
- Must start with a letter or underscore.
- Can contain letters, digits, and underscores.
- Case-sensitive (\\\`name\\\` and \\\`Name\\\` are different).
- Use snake_case by convention.

### Dynamic Typing
Python is dynamically typed -- a variable can be reassigned to a value of any type at any time.

### Multiple Assignment
You can assign multiple variables in a single line: \\\`a, b, c = 1, 2, 3\\\`.

### Special Values
- \\\`None\\\` represents the absence of a value.
- \\\`del\\\` removes a variable from the current scope.

### Introspection
- \\\`type(x)\\\` returns the type of \\\`x\\\`.
- \\\`id(x)\\\` returns the unique identity (memory address) of the object \\\`x\\\` refers to.
`,
  exercises: [
    {
      id: 'py-var-1',
      title: 'Simple Assignment',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Assign the integer 42 to a variable called answer.',
      skeleton: `__BLANK__ = 42
print(answer)`,
      solution: `answer = 42
print(answer)`,
      hints: [
        'In Python, you assign with the = operator.',
        'The variable name goes on the left side of =.',
        'The answer is: answer',
      ],
      concepts: ['variable assignment', 'integers'],
    },
    {
      id: 'py-var-2',
      title: 'String Variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Assign the string "hello" to a variable called greeting.',
      skeleton: `greeting = __BLANK__
print(greeting)`,
      solution: `greeting = "hello"
print(greeting)`,
      hints: [
        'Strings are enclosed in quotes.',
        'You can use single or double quotes.',
        'The answer is: "hello"',
      ],
      concepts: ['variable assignment', 'strings'],
    },
    {
      id: 'py-var-3',
      title: 'Check Variable Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use the built-in function to print the type of x.',
      skeleton: `x = 3.14
print(__BLANK__(x))`,
      solution: `x = 3.14
print(type(x))`,
      hints: [
        'Which built-in function returns the type of an object?',
        'It is a four-letter function.',
        'The answer is: type',
      ],
      concepts: ['type()', 'float'],
    },
    {
      id: 'py-var-4',
      title: 'Multiple Assignment',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Assign 1, 2, and 3 to variables a, b, and c in a single line.',
      skeleton: `a, b, c = __BLANK__
print(a, b, c)`,
      solution: `a, b, c = 1, 2, 3
print(a, b, c)`,
      hints: [
        'You can separate multiple values with commas on the right side.',
        'The number of values must match the number of variables.',
        'The answer is: 1, 2, 3',
      ],
      concepts: ['multiple assignment', 'tuple unpacking'],
    },
    {
      id: 'py-var-5',
      title: 'Variable Swap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Swap the values of x and y using Python\'s simultaneous assignment.',
      skeleton: `x = 10
y = 20
x, y = __BLANK__
print(x, y)  # 20 10`,
      solution: `x = 10
y = 20
x, y = y, x
print(x, y)  # 20 10`,
      hints: [
        'Python allows swapping without a temp variable.',
        'Put the values in reversed order on the right side.',
        'The answer is: y, x',
      ],
      concepts: ['swap', 'simultaneous assignment'],
    },
    {
      id: 'py-var-6',
      title: 'None Assignment',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Assign None to a variable called result.',
      skeleton: `result = __BLANK__
print(result)`,
      solution: `result = None
print(result)`,
      hints: [
        'Python has a special singleton representing "no value".',
        'It starts with a capital N.',
        'The answer is: None',
      ],
      concepts: ['None', 'variable assignment'],
    },
    {
      id: 'py-var-7',
      title: 'Write a Swap Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function swap(a, b) that returns the two values swapped as a tuple.',
      skeleton: `def swap(a, b):
    # Return b, a as a tuple
    pass`,
      solution: `def swap(a, b):
    return b, a`,
      hints: [
        'Python functions can return multiple values.',
        'Use the return keyword with two values separated by a comma.',
        'return b, a',
      ],
      concepts: ['functions', 'return', 'tuple'],
    },
    {
      id: 'py-var-8',
      title: 'Dynamic Typing',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `x = 5
x = "five"
print(type(x).__name__)`,
      solution: `str`,
      hints: [
        'Python allows reassigning a variable to a different type.',
        'The last assignment wins.',
        'type(x).__name__ gives the type name as a string.',
      ],
      concepts: ['dynamic typing', 'type()'],
    },
    {
      id: 'py-var-9',
      title: 'Variable Unpacking',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function first_and_last(items) that returns the first and last element of a list using unpacking.',
      skeleton: `def first_and_last(items):
    # Return the first and last elements
    pass`,
      solution: `def first_and_last(items):
    first, *_, last = items
    return first, last`,
      hints: [
        'You can use *_ to capture everything in the middle.',
        'Extended unpacking: first, *middle, last = items.',
        'Return both values as a tuple.',
      ],
      concepts: ['unpacking', 'starred expression', 'return tuple'],
    },
    {
      id: 'py-var-10',
      title: 'Predict id() Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `a = [1, 2, 3]
b = a
print(a is b)`,
      solution: `True`,
      hints: [
        'Assigning a list to another variable does not copy it.',
        'Both names point to the same object in memory.',
        'The "is" operator checks identity, not equality.',
      ],
      concepts: ['identity', 'is operator', 'aliasing'],
    },
    {
      id: 'py-var-11',
      title: 'Delete a Variable',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that creates a variable, deletes it, and returns True if accessing it raises a NameError.',
      skeleton: `def test_del():
    # Create x, delete it, check if NameError is raised
    pass`,
      solution: `def test_del():
    x = 42
    del x
    try:
        _ = x
        return False
    except NameError:
        return True`,
      hints: [
        'Use del to remove a variable.',
        'Use try/except to catch NameError.',
        'After del x, accessing x raises NameError.',
      ],
      concepts: ['del', 'NameError', 'try/except'],
    },
    {
      id: 'py-var-12',
      title: 'Fix the Bug: Same Value Assignment',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code so that all three variables get the value 0.',
      skeleton: `# Bug: each variable should be 0
x = y = z = [0]
print(x, y, z)`,
      solution: `x = y = z = 0
print(x, y, z)`,
      hints: [
        'The code assigns a list [0] instead of the integer 0.',
        'Chain assignment works for immutable values.',
        'Remove the list brackets.',
      ],
      concepts: ['chain assignment', 'mutable vs immutable'],
    },
    {
      id: 'py-var-13',
      title: 'Write type_name Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function type_name(value) that returns the type name as a string (e.g., "int", "str").',
      skeleton: `def type_name(value):
    # Return the name of the type as a string
    pass`,
      solution: `def type_name(value):
    return type(value).__name__`,
      hints: [
        'type(x) returns a type object.',
        'Type objects have a __name__ attribute.',
        'Return type(value).__name__.',
      ],
      concepts: ['type()', '__name__'],
    },
    {
      id: 'py-var-14',
      title: 'Fix the Bug: Swap Gone Wrong',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the swap so x becomes 20 and y becomes 10.',
      skeleton: `x = 10
y = 20
x = y
y = x
print(x, y)  # Should print: 20 10`,
      solution: `x = 10
y = 20
x, y = y, x
print(x, y)  # Should print: 20 10`,
      hints: [
        'The original code loses the value of x when it assigns y to x.',
        'Python supports simultaneous assignment.',
        'Use x, y = y, x for a clean swap.',
      ],
      concepts: ['swap', 'simultaneous assignment'],
    },
    {
      id: 'py-var-15',
      title: 'Extended Unpacking',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `first, *rest = [10, 20, 30, 40]
print(rest)`,
      solution: `[20, 30, 40]`,
      hints: [
        'The * operator collects remaining items into a list.',
        'first gets 10, rest gets everything else.',
        'rest will be a list, not a tuple.',
      ],
      concepts: ['extended unpacking', 'starred expression'],
    },
    {
      id: 'py-var-16',
      title: 'Write unpack_middle Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function unpack_middle(items) that returns only the middle elements (everything except first and last) as a list.',
      skeleton: `def unpack_middle(items):
    # Return the middle elements
    pass`,
      solution: `def unpack_middle(items):
    _, *middle, _ = items
    return middle`,
      hints: [
        'Use _ for values you want to discard.',
        'Use * to collect the middle portion.',
        '_, *middle, _ = items',
      ],
      concepts: ['extended unpacking', 'discard variable'],
    },
    {
      id: 'py-var-17',
      title: 'Write multi_assign Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function multi_assign(n, value) that returns a dictionary with keys "v0", "v1", ..., "v{n-1}" all set to value.',
      skeleton: `def multi_assign(n, value):
    # Return dict with n keys mapped to value
    pass`,
      solution: `def multi_assign(n, value):
    return {f"v{i}": value for i in range(n)}`,
      hints: [
        'Use a dictionary comprehension.',
        'Use f-strings for the key names.',
        'range(n) generates 0 to n-1.',
      ],
      concepts: ['dict comprehension', 'f-string', 'range'],
    },
    {
      id: 'py-var-18',
      title: 'Fix the Bug: Aliasing Trap',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the code so modifying b does not affect a.',
      skeleton: `a = [1, 2, 3]
b = a
b.append(4)
print(a)  # Should print [1, 2, 3]`,
      solution: `a = [1, 2, 3]
b = a.copy()
b.append(4)
print(a)  # Should print [1, 2, 3]`,
      hints: [
        'Assignment creates an alias, not a copy.',
        'Use .copy() or list() to create a shallow copy.',
        'b = a.copy() creates an independent list.',
      ],
      concepts: ['aliasing', 'shallow copy', 'list.copy()'],
    },
    {
      id: 'py-var-19',
      title: 'Refactor to Use Unpacking',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor this code to use tuple unpacking instead of index access.',
      skeleton: `point = (3, 7)
x = point[0]
y = point[1]
print(f"x={x}, y={y}")`,
      solution: `point = (3, 7)
x, y = point
print(f"x={x}, y={y}")`,
      hints: [
        'Tuple unpacking lets you extract values directly.',
        'x, y = point extracts both values at once.',
        'This is more Pythonic than indexing.',
      ],
      concepts: ['tuple unpacking', 'refactoring'],
    },
    {
      id: 'py-var-20',
      title: 'Refactor Repeated Assignments',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor these separate assignments into a single line using multiple assignment.',
      skeleton: `a = 0
b = 0
c = 0
d = 0
print(a, b, c, d)`,
      solution: `a = b = c = d = 0
print(a, b, c, d)`,
      hints: [
        'Python supports chain assignment for the same value.',
        'a = b = c = d = 0 sets all four to 0.',
        'This works safely because 0 is immutable.',
      ],
      concepts: ['chain assignment', 'refactoring'],
    },
  ],
};
