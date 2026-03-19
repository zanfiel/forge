import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-dicts',
  title: '7. Dictionaries',
  explanation: `## Dictionaries

Dictionaries are mutable, unordered (insertion-ordered since 3.7) mappings from keys to values.

### Creation & Access
- \\\`{"a": 1, "b": 2}\\\` or \\\`dict(a=1, b=2)\\\`
- \\\`d[key]\\\` raises KeyError if missing; \\\`d.get(key, default)\\\` is safer.

### Common Methods
- \\\`keys()\\\`, \\\`values()\\\`, \\\`items()\\\` -- view objects
- \\\`update()\\\`, \\\`pop()\\\`, \\\`popitem()\\\`, \\\`setdefault()\\\`
- \\\`del d[key]\\\` removes a key

### Merging (3.9+)
- \\\`d1 | d2\\\` creates a new merged dict
- \\\`d1 |= d2\\\` updates in place

### Dict Comprehension
\\\`{k: v for k, v in items}\\\` for building dicts from iterables.

### Special Dicts
- \\\`defaultdict\\\` -- auto-creates missing keys with a factory
- \\\`OrderedDict\\\` -- preserves insertion order (less needed since 3.7)
- \\\`ChainMap\\\` -- groups multiple dicts as one
`,
  exercises: [
    {
      id: 'py-dict-1',
      title: 'Create a Dict',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a dictionary mapping "name" to "Alice" and "age" to 30.',
      skeleton: `person = __BLANK__
print(person)`,
      solution: `person = {"name": "Alice", "age": 30}
print(person)`,
      hints: [
        'Dictionaries use curly braces with key: value pairs.',
        'Separate pairs with commas.',
        'The answer is: {"name": "Alice", "age": 30}',
      ],
      concepts: ['dict creation', 'dict literal'],
    },
    {
      id: 'py-dict-2',
      title: 'Safe Access with get()',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use get() to access the "email" key with a default of "N/A".',
      skeleton: `person = {"name": "Alice"}
email = person.__BLANK__("email", "N/A")
print(email)  # N/A`,
      solution: `person = {"name": "Alice"}
email = person.get("email", "N/A")
print(email)  # N/A`,
      hints: [
        'get() returns a default value if the key is missing.',
        'The first argument is the key, the second is the default.',
        'The answer is: get',
      ],
      concepts: ['dict.get()', 'default value'],
    },
    {
      id: 'py-dict-3',
      title: 'Iterate Dict Items',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Iterate over key-value pairs of the dictionary.',
      skeleton: `d = {"a": 1, "b": 2}
for key, value in d.__BLANK__():
    print(f"{key}: {value}")`,
      solution: `d = {"a": 1, "b": 2}
for key, value in d.items():
    print(f"{key}: {value}")`,
      hints: [
        'items() returns key-value pairs as tuples.',
        'You can unpack them directly in the for loop.',
        'The answer is: items',
      ],
      concepts: ['dict.items()', 'dict iteration'],
    },
    {
      id: 'py-dict-4',
      title: 'Delete a Key',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Remove the key "age" from the dictionary.',
      skeleton: `person = {"name": "Alice", "age": 30}
__BLANK__ person["age"]
print(person)  # {"name": "Alice"}`,
      solution: `person = {"name": "Alice", "age": 30}
del person["age"]
print(person)  # {"name": "Alice"}`,
      hints: [
        'The del statement removes a key from a dictionary.',
        'del dict[key] removes the specified key.',
        'The answer is: del',
      ],
      concepts: ['del', 'dict key removal'],
    },
    {
      id: 'py-dict-5',
      title: 'Check Key Existence',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Check if "name" is a key in the dictionary.',
      skeleton: `person = {"name": "Alice", "age": 30}
result = "name" __BLANK__ person
print(result)  # True`,
      solution: `person = {"name": "Alice", "age": 30}
result = "name" in person
print(result)  # True`,
      hints: [
        'The in operator checks for key membership in dicts.',
        'It checks keys, not values.',
        'The answer is: in',
      ],
      concepts: ['in operator', 'dict key check'],
    },
    {
      id: 'py-dict-6',
      title: 'Dict Comprehension',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a dict mapping numbers 1-5 to their squares using a dict comprehension.',
      skeleton: `squares = {__BLANK__ for n in range(1, 6)}
print(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}`,
      solution: `squares = {n: n**2 for n in range(1, 6)}
print(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}`,
      hints: [
        'Dict comprehensions use key: value syntax.',
        'n is the key, n**2 is the value.',
        'The answer is: n: n**2',
      ],
      concepts: ['dict comprehension'],
    },
    {
      id: 'py-dict-7',
      title: 'Write invert_dict Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function invert_dict(d) that swaps keys and values.',
      skeleton: `def invert_dict(d):
    # Swap keys and values
    pass`,
      solution: `def invert_dict(d):
    return {v: k for k, v in d.items()}`,
      hints: [
        'Iterate with items() to get key-value pairs.',
        'Use a dict comprehension with swapped positions.',
        '{v: k for k, v in d.items()}',
      ],
      concepts: ['dict comprehension', 'dict inversion'],
    },
    {
      id: 'py-dict-8',
      title: 'Write word_count Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function word_count(text) that returns a dict mapping each word to its count.',
      skeleton: `def word_count(text):
    # Count occurrences of each word
    pass`,
      solution: `def word_count(text):
    counts = {}
    for word in text.split():
        counts[word] = counts.get(word, 0) + 1
    return counts`,
      hints: [
        'Split the text into words with split().',
        'Use get() with a default of 0 to handle missing keys.',
        'Increment the count for each word.',
      ],
      concepts: ['dict.get()', 'word counting', 'split()'],
    },
    {
      id: 'py-dict-9',
      title: 'Predict Dict Update',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `d = {"a": 1, "b": 2}
d.update({"b": 99, "c": 3})
print(d)`,
      solution: `{'a': 1, 'b': 99, 'c': 3}`,
      hints: [
        'update() merges another dict into the current one.',
        'Existing keys are overwritten.',
        '"b" gets updated to 99, "c" is added.',
      ],
      concepts: ['dict.update()', 'merging'],
    },
    {
      id: 'py-dict-10',
      title: 'Write merge_dicts Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function merge_dicts(d1, d2) that merges two dicts, with d2 values taking precedence.',
      skeleton: `def merge_dicts(d1, d2):
    # Merge d1 and d2, d2 takes precedence
    pass`,
      solution: `def merge_dicts(d1, d2):
    return {**d1, **d2}`,
      hints: [
        'Dict unpacking with ** merges dictionaries.',
        'Later values override earlier ones.',
        '{**d1, **d2} creates a new merged dict.',
      ],
      concepts: ['dict unpacking', '** operator', 'merging'],
    },
    {
      id: 'py-dict-11',
      title: 'Predict setdefault Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `d = {"a": 1}
result = d.setdefault("b", 42)
print(result, d)`,
      solution: `42 {'a': 1, 'b': 42}`,
      hints: [
        'setdefault() returns the value if the key exists.',
        'If the key is missing, it sets the default and returns it.',
        '"b" does not exist, so it is set to 42.',
      ],
      concepts: ['dict.setdefault()'],
    },
    {
      id: 'py-dict-12',
      title: 'Fix the Bug: KeyError',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code so it does not crash when the key is missing.',
      skeleton: `config = {"host": "localhost"}
port = config["port"]
print(port)  # Should print 8080 as default`,
      solution: `config = {"host": "localhost"}
port = config.get("port", 8080)
print(port)  # Should print 8080 as default`,
      hints: [
        'Direct bracket access raises KeyError for missing keys.',
        'Use get() with a default value.',
        'config.get("port", 8080)',
      ],
      concepts: ['dict.get()', 'KeyError', 'default value'],
    },
    {
      id: 'py-dict-13',
      title: 'Write group_by Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function group_by(items, key_fn) that groups items by the result of key_fn.',
      skeleton: `def group_by(items, key_fn):
    # Group items into {key: [items]} by key_fn
    pass`,
      solution: `def group_by(items, key_fn):
    groups = {}
    for item in items:
        key = key_fn(item)
        groups.setdefault(key, []).append(item)
    return groups`,
      hints: [
        'Call key_fn(item) to determine the grouping key.',
        'Use setdefault() to initialize lists for new keys.',
        'Append each item to its group.',
      ],
      concepts: ['grouping', 'setdefault()', 'higher-order function'],
    },
    {
      id: 'py-dict-14',
      title: 'Fix the Bug: Dict Iteration Mutation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code so it safely removes keys with value 0.',
      skeleton: `d = {"a": 1, "b": 0, "c": 3, "d": 0}
for key in d:
    if d[key] == 0:
        del d[key]
print(d)  # Should print: {'a': 1, 'c': 3}`,
      solution: `d = {"a": 1, "b": 0, "c": 3, "d": 0}
d = {k: v for k, v in d.items() if v != 0}
print(d)  # Should print: {'a': 1, 'c': 3}`,
      hints: [
        'You cannot modify a dict while iterating over it.',
        'Use a dict comprehension to create a filtered copy.',
        'Or iterate over list(d.keys()) to avoid the error.',
      ],
      concepts: ['dict iteration', 'RuntimeError', 'dict comprehension'],
    },
    {
      id: 'py-dict-15',
      title: 'Write nested_get Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function nested_get(d, keys, default=None) that safely accesses nested dict keys. nested_get({"a": {"b": 42}}, ["a", "b"]) returns 42.',
      skeleton: `def nested_get(d, keys, default=None):
    # Navigate nested dicts safely
    pass`,
      solution: `def nested_get(d, keys, default=None):
    current = d
    for key in keys:
        if isinstance(current, dict):
            current = current.get(key, default)
        else:
            return default
    return current`,
      hints: [
        'Traverse the dict one key at a time.',
        'Use get() at each level for safe access.',
        'Return the default if any level is not a dict.',
      ],
      concepts: ['nested dicts', 'safe access', 'get()'],
    },
    {
      id: 'py-dict-16',
      title: 'Predict Merge Operator',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `a = {"x": 1, "y": 2}
b = {"y": 99, "z": 3}
print(a | b)`,
      solution: `{'x': 1, 'y': 99, 'z': 3}`,
      hints: [
        'The | operator merges dicts (Python 3.9+).',
        'Right-side values take precedence on conflicts.',
        '"y" is 99 from dict b.',
      ],
      concepts: ['merge operator |', 'dict merging'],
    },
    {
      id: 'py-dict-17',
      title: 'Write defaultdict Counter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function char_count(s) using defaultdict to count character occurrences.',
      skeleton: `from collections import defaultdict

def char_count(s):
    # Count chars using defaultdict
    pass`,
      solution: `from collections import defaultdict

def char_count(s):
    counts = defaultdict(int)
    for c in s:
        counts[c] += 1
    return dict(counts)`,
      hints: [
        'defaultdict(int) creates a dict with default value 0.',
        'Accessing a missing key auto-creates it.',
        'Convert back to a regular dict before returning.',
      ],
      concepts: ['defaultdict', 'collections', 'counting'],
    },
    {
      id: 'py-dict-18',
      title: 'Fix the Bug: fromkeys Trap',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the code so each key gets its own independent list.',
      skeleton: `keys = ["a", "b", "c"]
d = dict.fromkeys(keys, [])
d["a"].append(1)
print(d)  # Should print: {'a': [1], 'b': [], 'c': []}`,
      solution: `keys = ["a", "b", "c"]
d = {k: [] for k in keys}
d["a"].append(1)
print(d)  # Should print: {'a': [1], 'b': [], 'c': []}`,
      hints: [
        'fromkeys() shares the same default object across all keys.',
        'Use a dict comprehension to create independent lists.',
        '{k: [] for k in keys} creates a new list for each key.',
      ],
      concepts: ['dict.fromkeys()', 'shared reference', 'dict comprehension'],
    },
    {
      id: 'py-dict-19',
      title: 'Refactor to Dict Comprehension',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the loop to a dict comprehension.',
      skeleton: `def filter_dict(d, threshold):
    result = {}
    for key, value in d.items():
        if value >= threshold:
            result[key] = value
    return result`,
      solution: `def filter_dict(d, threshold):
    return {k: v for k, v in d.items() if v >= threshold}`,
      hints: [
        'Dict comprehensions support filtering with if.',
        '{k: v for k, v in d.items() if condition}',
        'This is more concise and Pythonic.',
      ],
      concepts: ['dict comprehension', 'filtering', 'refactoring'],
    },
    {
      id: 'py-dict-20',
      title: 'Refactor to setdefault',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the if-check-then-initialize pattern to use setdefault().',
      skeleton: `def add_tag(registry, item, tag):
    if item not in registry:
        registry[item] = []
    registry[item].append(tag)
    return registry`,
      solution: `def add_tag(registry, item, tag):
    registry.setdefault(item, []).append(tag)
    return registry`,
      hints: [
        'setdefault() does the check-and-initialize in one call.',
        'It returns the existing value or the new default.',
        'registry.setdefault(item, []).append(tag)',
      ],
      concepts: ['setdefault()', 'refactoring'],
    },
  ],
};
