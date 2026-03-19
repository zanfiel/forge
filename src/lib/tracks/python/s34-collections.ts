import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-collections',
  title: '34. Collections',
  explanation: `## Collections

The \\\`collections\\\` module provides specialized container types beyond the built-in dict, list, set, and tuple.

### namedtuple
Lightweight, immutable named containers. Fields accessible by name or index.

### deque
Double-ended queue with O(1) append/pop from both ends. Supports \\\`maxlen\\\` for bounded buffers.

### Counter
Dict subclass for counting hashable objects. Supports arithmetic and \\\`most_common()\\\`.

### OrderedDict
Dict that remembers insertion order (mostly redundant since Python 3.7 dicts are ordered, but has unique features like \\\`move_to_end\\\`).

### defaultdict
Dict subclass with a factory function for missing keys. Eliminates key-existence checks.

### ChainMap
Groups multiple dicts into a single view. Useful for layered configuration.

### UserDict / UserList / UserString
Wrapper classes designed for subclassing. Easier to extend than built-in types.

### collections.abc
Abstract base classes like \\\`Mapping\\\`, \\\`Sequence\\\`, \\\`MutableMapping\\\`, etc., used for isinstance checks and Protocol-like interfaces.
`,
  exercises: [
    {
      id: 'py-col-1',
      title: 'namedtuple basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a namedtuple for a 2D point.',
      skeleton: `from collections import __BLANK__

Point = __BLANK__("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)`,
      solution: `from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)`,
      hints: [
        'namedtuple creates a lightweight class with named fields.',
        'First arg is the type name, second is the field names.',
        'The answer is: namedtuple',
      ],
      concepts: ['namedtuple', 'named fields'],
    },
    {
      id: 'py-col-2',
      title: 'Counter basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use Counter to count letter frequencies.',
      skeleton: `from collections import __BLANK__

counts = __BLANK__("abracadabra")
print(counts.most_common(3))`,
      solution: `from collections import Counter

counts = Counter("abracadabra")
print(counts.most_common(3))`,
      hints: [
        'Counter counts hashable elements from an iterable.',
        'It creates a dict-like object mapping elements to counts.',
        'The answer is: Counter',
      ],
      concepts: ['Counter', 'frequency counting'],
    },
    {
      id: 'py-col-3',
      title: 'defaultdict basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use defaultdict to group words by their first letter.',
      skeleton: `from collections import __BLANK__

groups = __BLANK__(list)
words = ["apple", "banana", "avocado", "cherry", "blueberry"]
for word in words:
    groups[word[0]].append(word)

print(dict(groups))`,
      solution: `from collections import defaultdict

groups = defaultdict(list)
words = ["apple", "banana", "avocado", "cherry", "blueberry"]
for word in words:
    groups[word[0]].append(word)

print(dict(groups))`,
      hints: [
        'defaultdict(list) creates an empty list for missing keys.',
        'No need to check if the key exists before appending.',
        'The answer is: defaultdict',
      ],
      concepts: ['defaultdict', 'auto-initialization'],
    },
    {
      id: 'py-col-4',
      title: 'deque basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use a deque to efficiently add and remove from both ends.',
      skeleton: `from collections import __BLANK__

d = __BLANK__([1, 2, 3])
d.appendleft(0)
d.append(4)
print(d)`,
      solution: `from collections import deque

d = deque([1, 2, 3])
d.appendleft(0)
d.append(4)
print(d)`,
      hints: [
        'deque supports O(1) append and pop from both ends.',
        'appendleft adds to the front, append adds to the back.',
        'The answer is: deque',
      ],
      concepts: ['deque', 'double-ended queue'],
    },
    {
      id: 'py-col-5',
      title: 'ChainMap basics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use ChainMap to layer default and user configuration.',
      skeleton: `from collections import __BLANK__

defaults = {"theme": "light", "lang": "en", "font": "mono"}
user = {"theme": "dark"}
config = __BLANK__(user, defaults)
print(config["theme"])  # dark (user overrides)
print(config["lang"])   # en (from defaults)`,
      solution: `from collections import ChainMap

defaults = {"theme": "light", "lang": "en", "font": "mono"}
user = {"theme": "dark"}
config = ChainMap(user, defaults)
print(config["theme"])  # dark (user overrides)
print(config["lang"])   # en (from defaults)`,
      hints: [
        'ChainMap groups multiple dicts, searching them in order.',
        'First dict has highest priority.',
        'The answer is: ChainMap',
      ],
      concepts: ['ChainMap', 'layered config'],
    },
    {
      id: 'py-col-6',
      title: 'deque maxlen',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Create a bounded deque that keeps only the last 3 items.',
      skeleton: `from collections import deque

recent = deque(__BLANK__=3)
for i in range(5):
    recent.append(i)
print(list(recent))`,
      solution: `from collections import deque

recent = deque(maxlen=3)
for i in range(5):
    recent.append(i)
print(list(recent))`,
      hints: [
        'deque(maxlen=n) automatically discards old items when full.',
        'It keeps only the most recent n items.',
        'The answer is: maxlen',
      ],
      concepts: ['deque maxlen', 'bounded buffer'],
    },
    {
      id: 'py-col-7',
      title: 'Predict Counter arithmetic',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does Counter subtraction produce?',
      skeleton: `from collections import Counter

a = Counter("aabbb")
b = Counter("abc")
result = a - b
print(result)`,
      solution: `Counter({'b': 2, 'a': 1})`,
      hints: [
        'Counter subtraction removes counts, dropping zero/negative.',
        'a has a:2, b:3. Subtracting b (a:1, b:1, c:1) gives a:1, b:2.',
        'Elements with zero or negative counts are excluded.',
      ],
      concepts: ['Counter arithmetic', 'subtraction'],
    },
    {
      id: 'py-col-8',
      title: 'Predict defaultdict behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does accessing a missing key in a defaultdict(int) return?',
      skeleton: `from collections import defaultdict

d = defaultdict(int)
d["existing"] = 5
print(d["missing"])
print(d["existing"])
print(len(d))`,
      solution: `0
5
2`,
      hints: [
        'defaultdict(int) creates int() = 0 for missing keys.',
        'Accessing a missing key creates it with the default value.',
        'After accessing "missing", the dict has 2 keys.',
      ],
      concepts: ['defaultdict(int)', 'missing key creation'],
    },
    {
      id: 'py-col-9',
      title: 'Predict namedtuple _replace',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does _replace return?',
      skeleton: `from collections import namedtuple

Color = namedtuple("Color", ["r", "g", "b"])
red = Color(255, 0, 0)
pink = red._replace(g=128, b=128)
print(pink)
print(red.g)`,
      solution: `Color(r=255, g=128, b=128)
0`,
      hints: [
        '_replace creates a new namedtuple with some fields changed.',
        'The original is not modified since namedtuples are immutable.',
        'pink is new, red stays unchanged.',
      ],
      concepts: ['_replace', 'immutability'],
    },
    {
      id: 'py-col-10',
      title: 'Fix defaultdict lambda',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Fix the defaultdict that uses the wrong factory function.',
      skeleton: `from collections import defaultdict

# Bug: defaultdict(0) should be defaultdict(int) or defaultdict(lambda: 0)
scores = defaultdict(0)
scores["Alice"] += 10
print(scores)`,
      solution: `from collections import defaultdict

# Fixed: factory must be callable, not a value
scores = defaultdict(int)
scores["Alice"] += 10
print(scores)`,
      hints: [
        'defaultdict requires a callable (function), not a value.',
        'defaultdict(0) raises TypeError because 0 is not callable.',
        'Use defaultdict(int) or defaultdict(lambda: 0).',
      ],
      concepts: ['defaultdict', 'callable factory'],
    },
    {
      id: 'py-col-11',
      title: 'Fix deque popleft',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code that uses list pop(0) inefficiently for a queue.',
      skeleton: `# Bug: list pop(0) is O(n), should use deque for O(1) queue
queue = [1, 2, 3, 4, 5]
while queue:
    item = queue.pop(0)  # O(n) operation!
    print(item, end=" ")`,
      solution: `from collections import deque

# Fixed: deque.popleft() is O(1)
queue = deque([1, 2, 3, 4, 5])
while queue:
    item = queue.popleft()  # O(1) operation
    print(item, end=" ")`,
      hints: [
        'list.pop(0) is O(n) because all elements must shift.',
        'deque.popleft() is O(1), designed for this use case.',
        'Convert the list to a deque and use popleft().',
      ],
      concepts: ['deque', 'O(1) popleft', 'performance'],
    },
    {
      id: 'py-col-12',
      title: 'Fix Counter update confusion',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the Counter that overwrites counts instead of adding to them.',
      skeleton: `from collections import Counter

c = Counter(a=3, b=2)
# Bug: using dict assignment instead of update to add counts
c["a"] = 1  # This overwrites, not adds!
print(c["a"])  # Should be 4, but is 1`,
      solution: `from collections import Counter

c = Counter(a=3, b=2)
# Fixed: use update() or += to add counts
c.update({"a": 1})
print(c["a"])  # Now correctly 4`,
      hints: [
        'Direct assignment c["a"] = 1 overwrites the count.',
        'c.update({"a": 1}) or c["a"] += 1 adds to the count.',
        'Use update() for adding counts from another mapping.',
      ],
      concepts: ['Counter', 'update vs assign'],
    },
    {
      id: 'py-col-13',
      title: 'Write a word frequency counter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function that returns the top N most common words in a text.',
      skeleton: `from collections import Counter

def top_words(text, n):
    # Return list of (word, count) tuples for top n words
    pass

text = "the cat sat on the mat the cat"
print(top_words(text, 2))  # [('the', 3), ('cat', 2)]`,
      solution: `from collections import Counter

def top_words(text, n):
    words = text.lower().split()
    return Counter(words).most_common(n)

text = "the cat sat on the mat the cat"
print(top_words(text, 2))  # [('the', 3), ('cat', 2)]`,
      hints: [
        'Split text into words and pass to Counter.',
        'Use most_common(n) to get the top n.',
        'Counter(words).most_common(n) does all the work.',
      ],
      concepts: ['Counter', 'most_common', 'word frequency'],
    },
    {
      id: 'py-col-14',
      title: 'Write a defaultdict tree',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a tree factory using defaultdict that auto-creates nested dicts.',
      skeleton: `from collections import defaultdict

def tree():
    # Return a defaultdict that creates more trees on missing keys
    pass

t = tree()
t["a"]["b"]["c"] = "value"
print(t["a"]["b"]["c"])  # "value"`,
      solution: `from collections import defaultdict

def tree():
    return defaultdict(tree)

t = tree()
t["a"]["b"]["c"] = "value"
print(t["a"]["b"]["c"])  # "value"`,
      hints: [
        'A recursive defaultdict creates nested dicts on demand.',
        'The factory function is tree itself (recursive).',
        'return defaultdict(tree) -- the factory creates more trees.',
      ],
      concepts: ['defaultdict', 'recursive structure', 'tree'],
    },
    {
      id: 'py-col-15',
      title: 'Write a deque-based history',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a History class that keeps the last N commands using deque.',
      skeleton: `from collections import deque

class History:
    def __init__(self, maxlen):
        pass

    def add(self, command):
        pass

    def get_recent(self, n):
        # Return last n commands as a list
        pass

h = History(5)
for i in range(10):
    h.add(f"cmd_{i}")
print(h.get_recent(3))  # ['cmd_7', 'cmd_8', 'cmd_9']`,
      solution: `from collections import deque

class History:
    def __init__(self, maxlen):
        self._commands = deque(maxlen=maxlen)

    def add(self, command):
        self._commands.append(command)

    def get_recent(self, n):
        items = list(self._commands)
        return items[-n:]

h = History(5)
for i in range(10):
    h.add(f"cmd_{i}")
print(h.get_recent(3))  # ['cmd_7', 'cmd_8', 'cmd_9']`,
      hints: [
        'Use deque(maxlen=maxlen) to automatically limit size.',
        'Old commands are discarded when the deque is full.',
        'get_recent returns the last n items from the deque.',
      ],
      concepts: ['deque', 'maxlen', 'history buffer'],
    },
    {
      id: 'py-col-16',
      title: 'Write a ChainMap config system',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a config system with env, user, and default layers using ChainMap.',
      skeleton: `from collections import ChainMap

class Config:
    def __init__(self):
        pass

    def get(self, key, default=None):
        pass

    def set_user(self, key, value):
        pass

# Usage
config = Config()
print(config.get("theme"))  # Should use defaults`,
      solution: `from collections import ChainMap

class Config:
    def __init__(self):
        self._env = {}
        self._user = {}
        self._defaults = {"theme": "light", "lang": "en", "debug": False}
        self._chain = ChainMap(self._env, self._user, self._defaults)

    def get(self, key, default=None):
        return self._chain.get(key, default)

    def set_user(self, key, value):
        self._user[key] = value

config = Config()
print(config.get("theme"))  # "light"
config.set_user("theme", "dark")
print(config.get("theme"))  # "dark"`,
      hints: [
        'ChainMap searches dicts in order: env > user > defaults.',
        'Modifying user dict automatically affects ChainMap lookups.',
        'Use ChainMap(env, user, defaults) for priority ordering.',
      ],
      concepts: ['ChainMap', 'layered configuration'],
    },
    {
      id: 'py-col-17',
      title: 'Write an OrderedDict LRU',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a simple LRU cache using OrderedDict with move_to_end.',
      skeleton: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        pass

    def get(self, key):
        pass

    def put(self, key, value):
        pass

cache = LRUCache(3)
cache.put("a", 1)
cache.put("b", 2)
cache.put("c", 3)
cache.get("a")     # moves "a" to end
cache.put("d", 4)  # evicts "b" (least recently used)
print("b" in cache._data)  # False`,
      solution: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self._data = OrderedDict()
        self._capacity = capacity

    def get(self, key):
        if key in self._data:
            self._data.move_to_end(key)
            return self._data[key]
        return None

    def put(self, key, value):
        if key in self._data:
            self._data.move_to_end(key)
        self._data[key] = value
        if len(self._data) > self._capacity:
            self._data.popitem(last=False)

cache = LRUCache(3)
cache.put("a", 1)
cache.put("b", 2)
cache.put("c", 3)
cache.get("a")
cache.put("d", 4)
print("b" in cache._data)  # False`,
      hints: [
        'OrderedDict.move_to_end(key) moves a key to the end.',
        'popitem(last=False) removes the first (oldest) item.',
        'On access, move the key to the end to mark it as recently used.',
      ],
      concepts: ['OrderedDict', 'move_to_end', 'LRU cache'],
    },
    {
      id: 'py-col-18',
      title: 'Write a namedtuple with defaults',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Create a namedtuple with default values for some fields.',
      skeleton: `from collections import namedtuple

# Create a Config namedtuple with defaults for port and debug

c1 = Config("localhost")        # port=8080, debug=False
c2 = Config("0.0.0.0", 9090)   # debug=False
print(c1)
print(c2)`,
      solution: `from collections import namedtuple

Config = namedtuple("Config", ["host", "port", "debug"])
Config.__new__.__defaults__ = (8080, False)

c1 = Config("localhost")
c2 = Config("0.0.0.0", 9090)
print(c1)
print(c2)`,
      hints: [
        'namedtuple supports defaults via __new__.__defaults__.',
        'Defaults apply to the rightmost fields.',
        'Set Config.__new__.__defaults__ = (8080, False).',
      ],
      concepts: ['namedtuple', 'default values', '__defaults__'],
    },
    {
      id: 'py-col-19',
      title: 'Refactor dict to Counter',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Refactor the manual counting loop to use Counter.',
      skeleton: `data = ["apple", "banana", "apple", "cherry", "banana", "apple"]

counts = {}
for item in data:
    if item in counts:
        counts[item] += 1
    else:
        counts[item] = 1

sorted_counts = sorted(counts.items(), key=lambda x: -x[1])
print(sorted_counts[:2])`,
      solution: `from collections import Counter

data = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = Counter(data)
print(counts.most_common(2))`,
      hints: [
        'Counter replaces the entire manual counting pattern.',
        'most_common(n) replaces the manual sorting.',
        'Two lines replace the entire manual implementation.',
      ],
      concepts: ['Counter', 'refactoring', 'most_common'],
    },
    {
      id: 'py-col-20',
      title: 'Refactor nested dicts to defaultdict',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the key-checking pattern to use defaultdict.',
      skeleton: `records = [
    ("Alice", "Math", 95),
    ("Bob", "Math", 87),
    ("Alice", "Science", 90),
    ("Bob", "Science", 82),
]

grades = {}
for name, subject, score in records:
    if name not in grades:
        grades[name] = {}
    grades[name][subject] = score

print(grades)`,
      solution: `from collections import defaultdict

records = [
    ("Alice", "Math", 95),
    ("Bob", "Math", 87),
    ("Alice", "Science", 90),
    ("Bob", "Science", 82),
]

grades = defaultdict(dict)
for name, subject, score in records:
    grades[name][subject] = score

print(dict(grades))`,
      hints: [
        'defaultdict(dict) creates empty dicts for missing keys.',
        'No need to check if the key exists before assigning.',
        'Replace the if check with defaultdict(dict).',
      ],
      concepts: ['defaultdict', 'nested dicts', 'refactoring'],
    },
  ],
};
