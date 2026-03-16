import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-lists',
  title: '5. Lists',
  explanation: `## Lists

Lists are mutable, ordered sequences. They can hold items of any type and are one of the most commonly used data structures in Python.

### Creation & Access
- \\\`[1, 2, 3]\\\` or \\\`list()\\\`
- Indexing: \\\`lst[0]\\\`, \\\`lst[-1]\\\`
- Slicing: \\\`lst[1:3]\\\`, \\\`lst[::2]\\\`

### Mutating Methods
- \\\`append()\\\`, \\\`extend()\\\`, \\\`insert()\\\` -- add items
- \\\`remove()\\\`, \\\`pop()\\\`, \\\`clear()\\\` -- remove items
- \\\`sort()\\\`, \\\`reverse()\\\` -- in-place reordering

### Non-Mutating Functions
- \\\`sorted()\\\`, \\\`reversed()\\\` -- return new sequences
- \\\`len()\\\`, \\\`min()\\\`, \\\`max()\\\`, \\\`sum()\\\`

### Copying
- \\\`lst.copy()\\\` or \\\`lst[:]\\\` -- shallow copy
- Assignment (\\\`b = a\\\`) creates an alias, NOT a copy

### Unpacking
- \\\`first, *rest = lst\\\` -- extended unpacking
`,
  exercises: [
    {
      id: 'py-list-1',
      title: 'Create a List',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a list with the numbers 1, 2, and 3.',
      skeleton: `numbers = __BLANK__
print(numbers)`,
      solution: `numbers = [1, 2, 3]
print(numbers)`,
      hints: [
        'Lists use square brackets.',
        'Separate elements with commas.',
        'The answer is: [1, 2, 3]',
      ],
      concepts: ['list creation', 'list literal'],
    },
    {
      id: 'py-list-2',
      title: 'Append to List',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Add the number 4 to the end of the list.',
      skeleton: `numbers = [1, 2, 3]
numbers.__BLANK__(4)
print(numbers)  # [1, 2, 3, 4]`,
      solution: `numbers = [1, 2, 3]
numbers.append(4)
print(numbers)  # [1, 2, 3, 4]`,
      hints: [
        'Which method adds a single element to the end?',
        'It is a six-letter method.',
        'The answer is: append',
      ],
      concepts: ['append()', 'list methods'],
    },
    {
      id: 'py-list-3',
      title: 'List Slicing',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Get the last two elements of the list using slicing.',
      skeleton: `items = [10, 20, 30, 40, 50]
last_two = items[__BLANK__]
print(last_two)  # [40, 50]`,
      solution: `items = [10, 20, 30, 40, 50]
last_two = items[-2:]
print(last_two)  # [40, 50]`,
      hints: [
        'Negative indices count from the end.',
        '-2 refers to the second-to-last element.',
        'The answer is: -2:',
      ],
      concepts: ['list slicing', 'negative index'],
    },
    {
      id: 'py-list-4',
      title: 'Sort a List',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Sort the list in ascending order in place.',
      skeleton: `nums = [3, 1, 4, 1, 5]
nums.__BLANK__()
print(nums)  # [1, 1, 3, 4, 5]`,
      solution: `nums = [3, 1, 4, 1, 5]
nums.sort()
print(nums)  # [1, 1, 3, 4, 5]`,
      hints: [
        'The in-place sort method modifies the list directly.',
        'It is a four-letter method.',
        'The answer is: sort',
      ],
      concepts: ['sort()', 'in-place sorting'],
    },
    {
      id: 'py-list-5',
      title: 'Pop an Element',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Remove and return the last element of the list.',
      skeleton: `stack = [1, 2, 3]
top = stack.__BLANK__()
print(top)    # 3
print(stack)  # [1, 2]`,
      solution: `stack = [1, 2, 3]
top = stack.pop()
print(top)    # 3
print(stack)  # [1, 2]`,
      hints: [
        'pop() removes and returns an element.',
        'With no argument, it removes the last element.',
        'The answer is: pop',
      ],
      concepts: ['pop()', 'stack operation'],
    },
    {
      id: 'py-list-6',
      title: 'Extend a List',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Add all elements from list b to the end of list a.',
      skeleton: `a = [1, 2]
b = [3, 4]
a.__BLANK__(b)
print(a)  # [1, 2, 3, 4]`,
      solution: `a = [1, 2]
b = [3, 4]
a.extend(b)
print(a)  # [1, 2, 3, 4]`,
      hints: [
        'extend() adds all items from another iterable.',
        'Unlike append(), it does not nest the list.',
        'The answer is: extend',
      ],
      concepts: ['extend()', 'list methods'],
    },
    {
      id: 'py-list-7',
      title: 'Write flatten Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function flatten(nested) that flattens a list of lists into a single list.',
      skeleton: `def flatten(nested):
    # Flatten one level of nesting
    pass`,
      solution: `def flatten(nested):
    result = []
    for sublist in nested:
        result.extend(sublist)
    return result`,
      hints: [
        'Iterate over each sublist and extend the result.',
        'Use extend() to add all items from each sublist.',
        'Start with an empty result list.',
      ],
      concepts: ['nested lists', 'extend()', 'flatten'],
    },
    {
      id: 'py-list-8',
      title: 'Write remove_duplicates Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function remove_duplicates(lst) that returns a new list with duplicates removed, preserving order.',
      skeleton: `def remove_duplicates(lst):
    # Remove duplicates, preserve order
    pass`,
      solution: `def remove_duplicates(lst):
    seen = set()
    result = []
    for item in lst:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result`,
      hints: [
        'Use a set to track which items you have already seen.',
        'Only append items that are not in the seen set.',
        'This preserves the original order.',
      ],
      concepts: ['deduplication', 'set', 'order preservation'],
    },
    {
      id: 'py-list-9',
      title: 'Predict List Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `a = [1, 2, 3]
b = a
b.append(4)
print(a)`,
      solution: `[1, 2, 3, 4]`,
      hints: [
        'b = a creates an alias, not a copy.',
        'Both a and b refer to the same list object.',
        'Modifying through b also affects a.',
      ],
      concepts: ['aliasing', 'mutable objects'],
    },
    {
      id: 'py-list-10',
      title: 'Write chunk Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function chunk(lst, size) that splits a list into sublists of the given size.',
      skeleton: `def chunk(lst, size):
    # Split list into chunks
    pass`,
      solution: `def chunk(lst, size):
    return [lst[i:i + size] for i in range(0, len(lst), size)]`,
      hints: [
        'Use a list comprehension with range().',
        'Step through the list in increments of size.',
        'lst[i:i+size] extracts each chunk.',
      ],
      concepts: ['list comprehension', 'slicing', 'range'],
    },
    {
      id: 'py-list-11',
      title: 'Predict enumerate',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `result = list(enumerate(["a", "b", "c"], start=1))
print(result)`,
      solution: `[(1, 'a'), (2, 'b'), (3, 'c')]`,
      hints: [
        'enumerate() pairs each item with its index.',
        'start=1 begins counting from 1 instead of 0.',
        'list() converts the enumerate object to a list of tuples.',
      ],
      concepts: ['enumerate()', 'start parameter'],
    },
    {
      id: 'py-list-12',
      title: 'Fix the Bug: extend vs append',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code so it adds individual elements, not a nested list.',
      skeleton: `result = [1, 2, 3]
result.append([4, 5, 6])
print(result)  # Should print [1, 2, 3, 4, 5, 6]`,
      solution: `result = [1, 2, 3]
result.extend([4, 5, 6])
print(result)  # Should print [1, 2, 3, 4, 5, 6]`,
      hints: [
        'append() adds the argument as a single element.',
        'extend() adds each element from the iterable.',
        'Change append to extend.',
      ],
      concepts: ['append vs extend', 'list methods'],
    },
    {
      id: 'py-list-13',
      title: 'Write rotate Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function rotate(lst, n) that rotates the list n positions to the right. rotate([1,2,3,4,5], 2) should return [4,5,1,2,3].',
      skeleton: `def rotate(lst, n):
    # Rotate list n positions to the right
    pass`,
      solution: `def rotate(lst, n):
    if not lst:
        return lst
    n = n % len(lst)
    return lst[-n:] + lst[:-n]`,
      hints: [
        'Slicing can split and rejoin the list.',
        'lst[-n:] gives the last n elements.',
        'lst[:-n] gives everything except the last n.',
      ],
      concepts: ['list slicing', 'rotation', 'modulo'],
    },
    {
      id: 'py-list-14',
      title: 'Fix the Bug: Shallow Copy',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code so modifying the copy does not affect the original nested list.',
      skeleton: `original = [[1, 2], [3, 4]]
copy = original.copy()
copy[0].append(99)
print(original)  # Should print [[1, 2], [3, 4]]`,
      solution: `import copy as cp

original = [[1, 2], [3, 4]]
deep = cp.deepcopy(original)
deep[0].append(99)
print(original)  # Should print [[1, 2], [3, 4]]`,
      hints: [
        '.copy() only creates a shallow copy.',
        'Nested lists still share references.',
        'Use copy.deepcopy() for a full independent copy.',
      ],
      concepts: ['shallow copy', 'deep copy', 'nested lists'],
    },
    {
      id: 'py-list-15',
      title: 'Write zip_lists Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function zip_lists(a, b) that returns a list of tuples pairing elements from both lists.',
      skeleton: `def zip_lists(a, b):
    # Zip two lists into a list of tuples
    pass`,
      solution: `def zip_lists(a, b):
    return list(zip(a, b))`,
      hints: [
        'zip() pairs elements from multiple iterables.',
        'It returns a zip object, so wrap it in list().',
        'return list(zip(a, b))',
      ],
      concepts: ['zip()', 'list of tuples'],
    },
    {
      id: 'py-list-16',
      title: 'Predict del with Slice',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `items = [0, 1, 2, 3, 4, 5]
del items[1::2]
print(items)`,
      solution: `[0, 2, 4]`,
      hints: [
        'del with a slice removes elements matching that slice.',
        'items[1::2] selects every other element starting at index 1.',
        'Elements at indices 1, 3, 5 are removed.',
      ],
      concepts: ['del', 'slice deletion', 'step slicing'],
    },
    {
      id: 'py-list-17',
      title: 'Write interleave Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function interleave(a, b) that interleaves two lists: interleave([1,3,5], [2,4,6]) returns [1,2,3,4,5,6].',
      skeleton: `def interleave(a, b):
    # Interleave two lists
    pass`,
      solution: `def interleave(a, b):
    result = []
    for x, y in zip(a, b):
        result.append(x)
        result.append(y)
    return result`,
      hints: [
        'Use zip() to pair elements from both lists.',
        'Append each pair of elements alternately.',
        'For equal-length lists, zip handles it perfectly.',
      ],
      concepts: ['zip()', 'interleaving', 'list building'],
    },
    {
      id: 'py-list-18',
      title: 'Fix the Bug: List Multiplication',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the code so each row is an independent list.',
      skeleton: `# Bug: all rows share the same inner list
grid = [[0] * 3] * 3
grid[0][0] = 1
print(grid)  # Should print [[1, 0, 0], [0, 0, 0], [0, 0, 0]]`,
      solution: `grid = [[0] * 3 for _ in range(3)]
grid[0][0] = 1
print(grid)  # Should print [[1, 0, 0], [0, 0, 0], [0, 0, 0]]`,
      hints: [
        '[[0]*3] * 3 creates three references to the SAME inner list.',
        'Use a list comprehension to create independent lists.',
        '[[0]*3 for _ in range(3)] creates three separate lists.',
      ],
      concepts: ['list multiplication trap', 'list comprehension', 'references'],
    },
    {
      id: 'py-list-19',
      title: 'Refactor Loop to sorted()',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor to use sorted() with a key function instead of manual sorting.',
      skeleton: `def sort_by_length(words):
    pairs = []
    for w in words:
        pairs.append((len(w), w))
    pairs.sort()
    result = []
    for length, word in pairs:
        result.append(word)
    return result`,
      solution: `def sort_by_length(words):
    return sorted(words, key=len)`,
      hints: [
        'sorted() accepts a key function.',
        'key=len sorts by the length of each element.',
        'This replaces the entire manual decoration pattern.',
      ],
      concepts: ['sorted()', 'key function', 'refactoring'],
    },
    {
      id: 'py-list-20',
      title: 'Refactor to Unpacking',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor to use unpacking in the loop instead of index access.',
      skeleton: `pairs = [(1, "a"), (2, "b"), (3, "c")]
for pair in pairs:
    num = pair[0]
    letter = pair[1]
    print(f"{num}: {letter}")`,
      solution: `pairs = [(1, "a"), (2, "b"), (3, "c")]
for num, letter in pairs:
    print(f"{num}: {letter}")`,
      hints: [
        'Python supports unpacking directly in for loops.',
        'for num, letter in pairs: unpacks each tuple.',
        'This eliminates the need for index access.',
      ],
      concepts: ['tuple unpacking', 'for loop', 'refactoring'],
    },
  ],
};
