import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-sets',
  title: '8. Sets',
  explanation: `## Sets

Sets are unordered collections of unique elements. They support mathematical set operations.

### Creation
- \\\`{1, 2, 3}\\\` or \\\`set([1, 2, 3])\\\`
- Empty set: \\\`set()\\\` (NOT \\\`{}\\\`, which creates an empty dict)

### Mutating Methods
- \\\`add()\\\`, \\\`remove()\\\` (raises KeyError), \\\`discard()\\\` (no error), \\\`pop()\\\`, \\\`clear()\\\`

### Set Operations
- Union: \\\`a | b\\\` or \\\`a.union(b)\\\`
- Intersection: \\\`a & b\\\` or \\\`a.intersection(b)\\\`
- Difference: \\\`a - b\\\` or \\\`a.difference(b)\\\`
- Symmetric difference: \\\`a ^ b\\\`

### Comparisons
- \\\`issubset()\\\`, \\\`issuperset()\\\`, \\\`isdisjoint()\\\`

### Frozenset
An immutable set that can be used as a dict key or set element.

### Performance
Set membership testing (\\\`in\\\`) is O(1) on average, compared to O(n) for lists.
`,
  exercises: [
    {
      id: 'py-set-1',
      title: 'Create a Set',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a set containing the numbers 1, 2, and 3.',
      skeleton: `s = __BLANK__
print(type(s).__name__)  # set`,
      solution: `s = {1, 2, 3}
print(type(s).__name__)  # set`,
      hints: [
        'Sets use curly braces like dicts, but without key: value pairs.',
        'Just list the elements separated by commas.',
        'The answer is: {1, 2, 3}',
      ],
      concepts: ['set creation', 'set literal'],
    },
    {
      id: 'py-set-2',
      title: 'Add to Set',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Add the number 4 to the set.',
      skeleton: `s = {1, 2, 3}
s.__BLANK__(4)
print(4 in s)  # True`,
      solution: `s = {1, 2, 3}
s.add(4)
print(4 in s)  # True`,
      hints: [
        'Sets use add() for single elements.',
        'Unlike lists, there is no append() for sets.',
        'The answer is: add',
      ],
      concepts: ['set.add()'],
    },
    {
      id: 'py-set-3',
      title: 'Set Union',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Combine both sets using the union operator.',
      skeleton: `a = {1, 2, 3}
b = {3, 4, 5}
result = a __BLANK__ b
print(result)  # {1, 2, 3, 4, 5}`,
      solution: `a = {1, 2, 3}
b = {3, 4, 5}
result = a | b
print(result)  # {1, 2, 3, 4, 5}`,
      hints: [
        'The union operator combines all unique elements.',
        'It uses the pipe character.',
        'The answer is: |',
      ],
      concepts: ['set union', '| operator'],
    },
    {
      id: 'py-set-4',
      title: 'Set Intersection',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Find elements common to both sets.',
      skeleton: `a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
common = a __BLANK__ b
print(common)  # {3, 4}`,
      solution: `a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
common = a & b
print(common)  # {3, 4}`,
      hints: [
        'Intersection finds elements present in both sets.',
        'It uses the ampersand character.',
        'The answer is: &',
      ],
      concepts: ['set intersection', '& operator'],
    },
    {
      id: 'py-set-5',
      title: 'Set Difference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Find elements in a that are not in b.',
      skeleton: `a = {1, 2, 3, 4}
b = {3, 4, 5}
diff = a __BLANK__ b
print(diff)  # {1, 2}`,
      solution: `a = {1, 2, 3, 4}
b = {3, 4, 5}
diff = a - b
print(diff)  # {1, 2}`,
      hints: [
        'Set difference uses the minus operator.',
        'a - b gives elements in a but not in b.',
        'The answer is: -',
      ],
      concepts: ['set difference', '- operator'],
    },
    {
      id: 'py-set-6',
      title: 'Deduplicate a List',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Remove duplicates from the list by converting to a set and back.',
      skeleton: `numbers = [1, 2, 2, 3, 3, 3]
unique = list(__BLANK__(numbers))
print(sorted(unique))  # [1, 2, 3]`,
      solution: `numbers = [1, 2, 2, 3, 3, 3]
unique = list(set(numbers))
print(sorted(unique))  # [1, 2, 3]`,
      hints: [
        'set() automatically removes duplicates.',
        'Convert back to list with list().',
        'The answer is: set',
      ],
      concepts: ['deduplication', 'set()'],
    },
    {
      id: 'py-set-7',
      title: 'Write symmetric_diff Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function symmetric_diff(a, b) that returns elements in either set but not both.',
      skeleton: `def symmetric_diff(a, b):
    # Elements in a or b but not both
    pass`,
      solution: `def symmetric_diff(a, b):
    return a ^ b`,
      hints: [
        'Symmetric difference uses the ^ operator.',
        'It returns elements unique to each set.',
        'return a ^ b',
      ],
      concepts: ['symmetric difference', '^ operator'],
    },
    {
      id: 'py-set-8',
      title: 'Write has_duplicates Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function has_duplicates(lst) that returns True if the list contains any duplicate elements.',
      skeleton: `def has_duplicates(lst):
    # Check for duplicates
    pass`,
      solution: `def has_duplicates(lst):
    return len(lst) != len(set(lst))`,
      hints: [
        'A set removes duplicates.',
        'If the set is shorter than the list, there were duplicates.',
        'Compare len(lst) with len(set(lst)).',
      ],
      concepts: ['set deduplication', 'len()'],
    },
    {
      id: 'py-set-9',
      title: 'Predict Set Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `s = {1, 2, 3}
s.add(2)
print(len(s))`,
      solution: `3`,
      hints: [
        'Sets contain unique elements only.',
        'Adding a duplicate has no effect.',
        'The set still has 3 elements.',
      ],
      concepts: ['set uniqueness', 'add()'],
    },
    {
      id: 'py-set-10',
      title: 'Write is_subset Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function is_subset(a, b) that returns True if a is a subset of b.',
      skeleton: `def is_subset(a, b):
    # Check if a is a subset of b
    pass`,
      solution: `def is_subset(a, b):
    return a <= b`,
      hints: [
        'The <= operator checks if a is a subset of b.',
        'Alternatively, use a.issubset(b).',
        'return a <= b',
      ],
      concepts: ['issubset()', '<= operator'],
    },
    {
      id: 'py-set-11',
      title: 'Predict discard vs remove',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code output? Write "Error" if it raises an exception.',
      skeleton: `s = {1, 2, 3}
s.discard(99)
print(len(s))`,
      solution: `3`,
      hints: [
        'discard() does nothing if the element is not found.',
        'remove() would raise a KeyError.',
        'The set is unchanged, length remains 3.',
      ],
      concepts: ['discard()', 'remove()'],
    },
    {
      id: 'py-set-12',
      title: 'Fix the Bug: Empty Set',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code to create an empty set, not an empty dict.',
      skeleton: `empty = {}
empty.add(1)
print(empty)  # Should print {1}`,
      solution: `empty = set()
empty.add(1)
print(empty)  # Should print {1}`,
      hints: [
        '{} creates an empty dict, not a set.',
        'Use set() to create an empty set.',
        'This is a common Python gotcha.',
      ],
      concepts: ['empty set', 'set()'],
    },
    {
      id: 'py-set-13',
      title: 'Write find_common_elements Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function find_common_elements(*lists) that finds elements common to all input lists.',
      skeleton: `def find_common_elements(*lists):
    # Find elements common to all lists
    pass`,
      solution: `def find_common_elements(*lists):
    if not lists:
        return set()
    result = set(lists[0])
    for lst in lists[1:]:
        result &= set(lst)
    return result`,
      hints: [
        'Convert each list to a set.',
        'Intersect all sets together using &=.',
        'Start with the first list as a set.',
      ],
      concepts: ['set intersection', '*args', 'multiple sets'],
    },
    {
      id: 'py-set-14',
      title: 'Fix the Bug: Unhashable Type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code so the items can be added to the set.',
      skeleton: `items = set()
items.add([1, 2, 3])
print(items)  # Should work without error`,
      solution: `items = set()
items.add((1, 2, 3))
print(items)  # Should work without error`,
      hints: [
        'Lists are unhashable and cannot be added to sets.',
        'Tuples are immutable and hashable.',
        'Convert the list to a tuple.',
      ],
      concepts: ['hashable', 'TypeError', 'tuple vs list'],
    },
    {
      id: 'py-set-15',
      title: 'Set Comprehension',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function unique_lengths(words) that returns a set of the unique word lengths.',
      skeleton: `def unique_lengths(words):
    # Return set of unique word lengths
    pass`,
      solution: `def unique_lengths(words):
    return {len(w) for w in words}`,
      hints: [
        'Set comprehensions use curly braces like dict comprehensions.',
        'But without key: value pairs -- just single values.',
        '{len(w) for w in words}',
      ],
      concepts: ['set comprehension', 'len()'],
    },
    {
      id: 'py-set-16',
      title: 'Predict Frozen Set',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code output? Write "Error" if it raises an exception.',
      skeleton: `fs = frozenset([1, 2, 3])
fs.add(4)
print(fs)`,
      solution: `Error`,
      hints: [
        'frozenset is immutable.',
        'It does not have add() or any mutating methods.',
        'This raises an AttributeError.',
      ],
      concepts: ['frozenset', 'immutability'],
    },
    {
      id: 'py-set-17',
      title: 'Write jaccard_similarity Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function jaccard_similarity(a, b) that computes the Jaccard similarity (intersection size / union size) of two sets. Return 0.0 if both sets are empty.',
      skeleton: `def jaccard_similarity(a, b):
    # Compute Jaccard similarity
    pass`,
      solution: `def jaccard_similarity(a, b):
    if not a and not b:
        return 0.0
    return len(a & b) / len(a | b)`,
      hints: [
        'Jaccard similarity = |A intersection B| / |A union B|.',
        'Handle the empty case to avoid division by zero.',
        'Use & for intersection, | for union.',
      ],
      concepts: ['Jaccard similarity', 'set operations'],
    },
    {
      id: 'py-set-18',
      title: 'Fix the Bug: update vs add',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the code so it adds all elements from the list to the set.',
      skeleton: `s = {1, 2, 3}
s.add([4, 5, 6])
print(s)  # Should print {1, 2, 3, 4, 5, 6}`,
      solution: `s = {1, 2, 3}
s.update([4, 5, 6])
print(s)  # Should print {1, 2, 3, 4, 5, 6}`,
      hints: [
        'add() adds a single element (and lists are unhashable).',
        'update() adds all elements from an iterable.',
        'Change add to update.',
      ],
      concepts: ['set.update()', 'add vs update'],
    },
    {
      id: 'py-set-19',
      title: 'Refactor to Set Operations',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the loop-based approach to use set operations.',
      skeleton: `def find_new_users(current, previous):
    new_users = []
    for user in current:
        if user not in previous:
            new_users.append(user)
    return new_users`,
      solution: `def find_new_users(current, previous):
    return list(set(current) - set(previous))`,
      hints: [
        'Set difference gives elements in one set but not the other.',
        'Convert both to sets and subtract.',
        'set(current) - set(previous)',
      ],
      concepts: ['set difference', 'refactoring'],
    },
    {
      id: 'py-set-20',
      title: 'Refactor Deduplication',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor to use dict.fromkeys() to deduplicate while preserving order.',
      skeleton: `def unique_ordered(items):
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result`,
      solution: `def unique_ordered(items):
    return list(dict.fromkeys(items))`,
      hints: [
        'dict.fromkeys() preserves insertion order.',
        'Duplicate keys are ignored.',
        'list(dict.fromkeys(items)) deduplicates with order.',
      ],
      concepts: ['dict.fromkeys()', 'order-preserving dedup'],
    },
  ],
};
