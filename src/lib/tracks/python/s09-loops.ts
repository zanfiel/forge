import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-loops',
  title: '9. Loops',
  explanation: `## Loops

Python has two primary loop constructs: \\\`for\\\` and \\\`while\\\`.

### for Loop
Iterates over any iterable (list, tuple, string, range, etc.):
\\\`for item in iterable:\\\`

### while Loop
Repeats while a condition is true:
\\\`while condition:\\\`

### range()
Generates sequences of integers: \\\`range(stop)\\\`, \\\`range(start, stop)\\\`, \\\`range(start, stop, step)\\\`.

### Control Flow
- \\\`break\\\` -- exit the loop immediately
- \\\`continue\\\` -- skip to the next iteration
- \\\`else\\\` on loops -- runs if the loop completed without \\\`break\\\`

### Useful Patterns
- \\\`enumerate()\\\` for index + value
- \\\`zip()\\\` for parallel iteration
- \\\`reversed()\\\` for backward iteration
- Unpacking in loops: \\\`for k, v in dict.items()\\\`
`,
  exercises: [
    {
      id: 'py-loop-1',
      title: 'Basic for Loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Print each fruit in the list.',
      skeleton: `fruits = ["apple", "banana", "cherry"]
__BLANK__ fruit in fruits:
    print(fruit)`,
      solution: `fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)`,
      hints: [
        'The for keyword iterates over collections.',
        'Syntax: for variable in iterable:',
        'The answer is: for',
      ],
      concepts: ['for loop', 'iteration'],
    },
    {
      id: 'py-loop-2',
      title: 'range() Loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Print numbers 0 through 4 using range().',
      skeleton: `for i in __BLANK__:
    print(i)`,
      solution: `for i in range(5):
    print(i)`,
      hints: [
        'range(n) generates 0 to n-1.',
        'range(5) gives 0, 1, 2, 3, 4.',
        'The answer is: range(5)',
      ],
      concepts: ['range()', 'for loop'],
    },
    {
      id: 'py-loop-3',
      title: 'while Loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete the while loop to count down from 5 to 1.',
      skeleton: `n = 5
__BLANK__ n > 0:
    print(n)
    n -= 1`,
      solution: `n = 5
while n > 0:
    print(n)
    n -= 1`,
      hints: [
        'while loops repeat as long as the condition is true.',
        'The keyword is while.',
        'The answer is: while',
      ],
      concepts: ['while loop', 'countdown'],
    },
    {
      id: 'py-loop-4',
      title: 'Break Statement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Exit the loop when you find the number 3.',
      skeleton: `for i in range(10):
    if i == 3:
        __BLANK__
    print(i)`,
      solution: `for i in range(10):
    if i == 3:
        break
    print(i)`,
      hints: [
        'break exits the loop immediately.',
        'The loop will print 0, 1, 2 then stop.',
        'The answer is: break',
      ],
      concepts: ['break', 'loop control'],
    },
    {
      id: 'py-loop-5',
      title: 'Continue Statement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Skip odd numbers and print only even numbers.',
      skeleton: `for i in range(6):
    if i % 2 != 0:
        __BLANK__
    print(i)`,
      solution: `for i in range(6):
    if i % 2 != 0:
        continue
    print(i)`,
      hints: [
        'continue skips to the next iteration.',
        'The print will be skipped for odd numbers.',
        'The answer is: continue',
      ],
      concepts: ['continue', 'loop control'],
    },
    {
      id: 'py-loop-6',
      title: 'enumerate() Loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Print the index and value of each element.',
      skeleton: `colors = ["red", "green", "blue"]
for i, color in __BLANK__(colors):
    print(f"{i}: {color}")`,
      solution: `colors = ["red", "green", "blue"]
for i, color in enumerate(colors):
    print(f"{i}: {color}")`,
      hints: [
        'enumerate() pairs each element with its index.',
        'It returns (index, value) tuples.',
        'The answer is: enumerate',
      ],
      concepts: ['enumerate()', 'index-value pairs'],
    },
    {
      id: 'py-loop-7',
      title: 'Write sum_list Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function sum_list(numbers) that returns the sum using a for loop (not the built-in sum).',
      skeleton: `def sum_list(numbers):
    # Sum using a for loop
    pass`,
      solution: `def sum_list(numbers):
    total = 0
    for n in numbers:
        total += n
    return total`,
      hints: [
        'Initialize an accumulator to 0.',
        'Add each number to the accumulator.',
        'Return the total after the loop.',
      ],
      concepts: ['accumulator pattern', 'for loop'],
    },
    {
      id: 'py-loop-8',
      title: 'Write find_index Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function find_index(lst, target) that returns the index of the first occurrence of target, or -1 if not found.',
      skeleton: `def find_index(lst, target):
    # Find index of target
    pass`,
      solution: `def find_index(lst, target):
    for i, item in enumerate(lst):
        if item == target:
            return i
    return -1`,
      hints: [
        'Use enumerate() to get both index and value.',
        'Return the index as soon as you find a match.',
        'Return -1 after the loop if nothing was found.',
      ],
      concepts: ['search pattern', 'enumerate()', 'early return'],
    },
    {
      id: 'py-loop-9',
      title: 'Predict Loop Else',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `for i in range(3):
    print(i)
else:
    print("done")`,
      solution: `0
1
2
done`,
      hints: [
        'The else clause runs when the loop completes normally.',
        'It does NOT run if the loop exits via break.',
        'Since there is no break, "done" is printed.',
      ],
      concepts: ['loop else clause'],
    },
    {
      id: 'py-loop-10',
      title: 'Write zip_sum Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function zip_sum(a, b) that returns a list of element-wise sums of two lists.',
      skeleton: `def zip_sum(a, b):
    # Return element-wise sums
    pass`,
      solution: `def zip_sum(a, b):
    return [x + y for x, y in zip(a, b)]`,
      hints: [
        'Use zip() to iterate over both lists in parallel.',
        'Unpack each pair with for x, y in zip(a, b).',
        'Return a list comprehension of the sums.',
      ],
      concepts: ['zip()', 'list comprehension', 'parallel iteration'],
    },
    {
      id: 'py-loop-11',
      title: 'Predict Break with Else',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `for i in range(5):
    if i == 3:
        break
else:
    print("completed")
print("end")`,
      solution: `end`,
      hints: [
        'break prevents the else clause from executing.',
        'Only "end" is printed because the loop broke at i=3.',
        'The else clause is skipped.',
      ],
      concepts: ['break', 'loop else clause'],
    },
    {
      id: 'py-loop-12',
      title: 'Fix the Bug: Off-by-One',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the loop so it prints numbers 1 through 5 (inclusive).',
      skeleton: `for i in range(5):
    print(i)
# Should print 1, 2, 3, 4, 5`,
      solution: `for i in range(1, 6):
    print(i)
# Should print 1, 2, 3, 4, 5`,
      hints: [
        'range(5) produces 0-4.',
        'Use range(1, 6) to get 1-5.',
        'Remember: stop is exclusive.',
      ],
      concepts: ['range()', 'off-by-one'],
    },
    {
      id: 'py-loop-13',
      title: 'Write flatten_loop Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function flatten_loop(matrix) that flattens a 2D list into a 1D list using nested loops.',
      skeleton: `def flatten_loop(matrix):
    # Flatten 2D list to 1D
    pass`,
      solution: `def flatten_loop(matrix):
    result = []
    for row in matrix:
        for item in row:
            result.append(item)
    return result`,
      hints: [
        'Use nested for loops to iterate rows then elements.',
        'Append each element to the result list.',
        'The outer loop iterates rows, inner loop iterates elements.',
      ],
      concepts: ['nested loops', 'flatten'],
    },
    {
      id: 'py-loop-14',
      title: 'Fix the Bug: Infinite Loop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the infinite loop so it properly counts down to 0.',
      skeleton: `n = 5
while n >= 0:
    print(n)
    n + 1  # Decrease n to 0`,
      solution: `n = 5
while n >= 0:
    print(n)
    n -= 1`,
      hints: [
        'n + 1 does not modify n; it just computes a value.',
        'You need n -= 1 to actually decrement.',
        'The expression should subtract, not add.',
      ],
      concepts: ['augmented assignment', 'infinite loop'],
    },
    {
      id: 'py-loop-15',
      title: 'Write collatz_steps Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function collatz_steps(n) that returns the number of steps to reach 1 in the Collatz sequence (if even: n//2, if odd: 3n+1).',
      skeleton: `def collatz_steps(n):
    # Count steps to reach 1
    pass`,
      solution: `def collatz_steps(n):
    steps = 0
    while n != 1:
        if n % 2 == 0:
            n = n // 2
        else:
            n = 3 * n + 1
        steps += 1
    return steps`,
      hints: [
        'Use a while loop until n reaches 1.',
        'If even: divide by 2. If odd: multiply by 3 and add 1.',
        'Count each step.',
      ],
      concepts: ['while loop', 'Collatz conjecture'],
    },
    {
      id: 'py-loop-16',
      title: 'Predict Reversed Range',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `result = list(range(10, 0, -3))
print(result)`,
      solution: `[10, 7, 4, 1]`,
      hints: [
        'range(10, 0, -3) counts down from 10 by -3.',
        'It stops before reaching 0 (exclusive).',
        '10, 7, 4, 1 -- next would be -2 which is < 0.',
      ],
      concepts: ['range() with step', 'negative step'],
    },
    {
      id: 'py-loop-17',
      title: 'Write matrix_multiply Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function transpose(matrix) that returns the transpose of a 2D matrix using nested loops.',
      skeleton: `def transpose(matrix):
    # Return the transpose
    pass`,
      solution: `def transpose(matrix):
    if not matrix:
        return []
    rows = len(matrix)
    cols = len(matrix[0])
    result = []
    for c in range(cols):
        row = []
        for r in range(rows):
            row.append(matrix[r][c])
        result.append(row)
    return result`,
      hints: [
        'The transpose swaps rows and columns.',
        'Iterate columns in the outer loop, rows in the inner.',
        'result[c][r] = matrix[r][c]',
      ],
      concepts: ['nested loops', 'matrix transpose'],
    },
    {
      id: 'py-loop-18',
      title: 'Fix the Bug: Loop Variable Capture',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the code so each function returns its own number, not all returning 4.',
      skeleton: `functions = []
for i in range(5):
    functions.append(lambda: i)

print([f() for f in functions])  # Should print [0, 1, 2, 3, 4]`,
      solution: `functions = []
for i in range(5):
    functions.append(lambda i=i: i)

print([f() for f in functions])  # Should print [0, 1, 2, 3, 4]`,
      hints: [
        'Lambda captures the variable i by reference, not by value.',
        'All lambdas see the final value of i (which is 4).',
        'Use a default argument i=i to capture the current value.',
      ],
      concepts: ['closure', 'late binding', 'default argument'],
    },
    {
      id: 'py-loop-19',
      title: 'Refactor to enumerate',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the manual index tracking to use enumerate().',
      skeleton: `def print_numbered(items):
    i = 0
    for item in items:
        print(f"{i + 1}. {item}")
        i += 1`,
      solution: `def print_numbered(items):
    for i, item in enumerate(items, start=1):
        print(f"{i}. {item}")`,
      hints: [
        'enumerate() handles index tracking automatically.',
        'Use start=1 to begin numbering from 1.',
        'No need for a manual counter variable.',
      ],
      concepts: ['enumerate()', 'refactoring'],
    },
    {
      id: 'py-loop-20',
      title: 'Refactor Nested Loops to zip',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the index-based parallel iteration to use zip().',
      skeleton: `def add_vectors(a, b):
    result = []
    for i in range(len(a)):
        result.append(a[i] + b[i])
    return result`,
      solution: `def add_vectors(a, b):
    return [x + y for x, y in zip(a, b)]`,
      hints: [
        'zip() iterates both lists in parallel.',
        'No need for range(len(...)) pattern.',
        'Use a list comprehension for conciseness.',
      ],
      concepts: ['zip()', 'refactoring', 'list comprehension'],
    },
  ],
};
