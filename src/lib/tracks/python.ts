/**
 * python.ts - Complete Python learning track
 *
 * 5 sections, 13 exercises. Progresses from variables through OOP and file I/O.
 * Exercises use real-world examples: servers, data processing, config files, logs.
 */

import type { Track } from '../../stores/app.svelte.ts';

export const track: Track = {
  id: 'python',
  name: 'Python',
  language: 'python',
  monacoLang: 'python',
  icon: '\u{1F40D}',
  description: 'Clean, readable, powerful. Scripts, automation, web backends, data -- Python does it all.',
  sections: [
    {
      id: 'py-basics',
      title: '1. Variables & Functions',
      explanation: `## Variables & Functions

Python is dynamically typed -- no type declarations needed (but you can add hints):

\`\`\`python
name = "Zan"              # string
age = 25                   # int
pi = 3.14                  # float
active = True              # bool (capital T/F!)

# With type hints (optional but good practice)
name: str = "Zan"
servers: list[str] = ["rocky", "ovh", "pangolin"]
\`\`\`

**Functions:**
\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}!"

# f-strings -- put variables inside strings with {braces}
print(greet("Zan"))  # "Hello, Zan!"
\`\`\`

**Default parameters:**
\`\`\`python
def connect(host: str, port: int = 22) -> str:
    return f"{host}:{port}"

connect("rocky")         # "rocky:22"
connect("rocky", 4200)   # "rocky:4200"
\`\`\``,
      exercises: [
        {
          id: 'py-basics-1',
          title: 'Variables & f-strings',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'python',
          goal: 'Declare variables and use f-strings to format output.',
          skeleton: `# Declare variables
server_name = __BLANK__
cpu_cores = __BLANK__
ram_gb = __BLANK__
online = __BLANK__

# Print a formatted status line using an f-string
print(f"Server {__BLANK__}: {__BLANK__} cores, {__BLANK__}GB RAM \u2014 {'\u{1F7E2}' if __BLANK__ else '\u{1F534}'}")`,
          solution: `server_name = "rocky"
cpu_cores = 8
ram_gb = 30
online = True

print(f"Server {server_name}: {cpu_cores} cores, {ram_gb}GB RAM \u2014 {'\u{1F7E2}' if online else '\u{1F534}'}")`,
          hints: [
            'String values go in quotes. Numbers don\'t. Booleans are `True`/`False` (capital!).',
            'Inside an f-string, `{variable_name}` inserts the value.',
            'The ternary: `\'\u{1F7E2}\' if online else \'\u{1F534}\'` returns first value if true, second if false.',
          ],
          concepts: ['variables', 'f-strings', 'ternary expression', 'bool'],
        },
        {
          id: 'py-basics-2',
          title: 'Write a Function',
          type: 'write-function',
          difficulty: 'beginner',
          language: 'python',
          goal: 'Write a function called `disk_usage` that takes `used_gb` (float) and `total_gb` (float), and returns a formatted string like "45.2 / 100.0 GB (45.2%)".',
          skeleton: `# Write the disk_usage function here


# Tests
print(disk_usage(45.2, 100.0))   # "45.2 / 100.0 GB (45.2%)"
print(disk_usage(7.3, 7.3))      # "7.3 / 7.3 GB (100.0%)"
print(disk_usage(0, 500.0))      # "0 / 500.0 GB (0.0%)"`,
          solution: `def disk_usage(used_gb: float, total_gb: float) -> str:
    percent = (used_gb / total_gb * 100) if total_gb > 0 else 0
    return f"{used_gb} / {total_gb} GB ({percent:.1f}%)"`,
          hints: [
            'Start with `def disk_usage(used_gb: float, total_gb: float) -> str:`',
            'Calculate percentage: `used_gb / total_gb * 100`. Watch out for division by zero!',
            'f-string formatting: `{value:.1f}` formats a float to 1 decimal place.',
          ],
          concepts: ['def', 'type hints', 'f-string formatting', 'division', 'return'],
        },
        {
          id: 'py-basics-3',
          title: 'Default Parameters',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'python',
          goal: 'Complete a function that builds SSH connection strings, using default parameters for port and user.',
          skeleton: `def ssh_command(host: str, user: __BLANK__ = "zan", port: __BLANK__ = 22) -> str:
    """Build an SSH command string."""
    if port != 22:
        return __BLANK__"ssh -i ~/.ssh/ZanSSH -p {port} {user}@{host}"
    return __BLANK__"ssh -i ~/.ssh/ZanSSH {user}@{host}"

# Tests
print(ssh_command("192.168.8.133"))                  # ssh -i ~/.ssh/ZanSSH zan@192.168.8.133
print(ssh_command("40.160.252.134", port=4822))      # ssh -i ~/.ssh/ZanSSH -p 4822 zan@40.160.252.134
print(ssh_command("94.156.152.50", user="zanfiel"))  # ssh -i ~/.ssh/ZanSSH zanfiel@94.156.152.50`,
          solution: `def ssh_command(host: str, user: str = "zan", port: int = 22) -> str:
    """Build an SSH command string."""
    if port != 22:
        return f"ssh -i ~/.ssh/ZanSSH -p {port} {user}@{host}"
    return f"ssh -i ~/.ssh/ZanSSH {user}@{host}"

print(ssh_command("192.168.8.133"))
print(ssh_command("40.160.252.134", port=4822))
print(ssh_command("94.156.152.50", user="zanfiel"))`,
          hints: [
            'Default parameter types: `user` is a string, `port` is an integer.',
            'f-strings start with `f` before the quote: `f"text {variable} more text"`.',
            'Fill in: `str`, `int`, `f`, `f`.',
          ],
          concepts: ['default parameters', 'f-strings', 'type hints', 'keyword arguments'],
        },
      ],
    },
    {
      id: 'py-lists',
      title: '2. Lists & Comprehensions',
      explanation: `## Lists & Comprehensions

Lists are Python's arrays. **List comprehensions** are the killer feature:

\`\`\`python
# Regular loop
squares = []
for n in range(5):
    squares.append(n ** 2)

# Same thing as a comprehension (one line!)
squares = [n ** 2 for n in range(5)]  # [0, 1, 4, 9, 16]

# With a filter
evens = [n for n in range(10) if n % 2 == 0]  # [0, 2, 4, 6, 8]
\`\`\`

**Common operations:**
\`\`\`python
items = [3, 1, 4, 1, 5]
len(items)        # 5
sorted(items)     # [1, 1, 3, 4, 5] (new list)
sum(items)        # 14
max(items)        # 5
items.append(9)   # adds to end
items[0]          # first element: 3
items[-1]         # last element: 5
\`\`\`

**Slicing:**
\`\`\`python
items[1:3]    # [1, 4]   index 1 up to (not including) 3
items[:2]     # [3, 1]   first 2
items[-2:]    # [1, 5]   last 2
\`\`\``,
      exercises: [
        {
          id: 'py-list-1',
          title: 'List Comprehensions',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'python',
          goal: 'Use list comprehensions to transform data.',
          skeleton: `servers = ["rocky", "pangolin", "ovh-vps", "bav-apps", "forge-box"]

# Get server names in UPPERCASE
upper = [__BLANK__ for s in servers]

# Get only servers that contain a hyphen
hyphenated = [s for s in servers if __BLANK__]

# Get the length of each name
lengths = [__BLANK__ for __BLANK__ in __BLANK__]

print(upper)       # ['ROCKY', 'PANGOLIN', ...]
print(hyphenated)  # ['ovh-vps', 'bav-apps', 'forge-box']
print(lengths)     # [5, 8, 7, 8, 9]`,
          solution: `upper = [s.upper() for s in servers]
hyphenated = [s for s in servers if "-" in s]
lengths = [len(s) for s in servers]`,
          hints: [
            '`.upper()` converts a string to uppercase. `"-" in s` checks if a string contains a hyphen.',
            'Comprehension pattern: `[expression for variable in list]` or `[expr for var in list if condition]`.',
            '`len(s)` gives the length of a string.',
          ],
          concepts: ['list comprehension', 'str.upper', 'in operator', 'len'],
        },
        {
          id: 'py-list-2',
          title: 'Sorting & Slicing',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'python',
          goal: 'Write a function `top_processes` that takes a list of `(name, cpu_percent)` tuples and an integer `n`, then returns the names of the top N processes by CPU usage, sorted highest first.',
          skeleton: `# Write top_processes here


# Tests
procs = [
    ("python3", 23.5),
    ("node", 45.1),
    ("nginx", 2.3),
    ("postgres", 12.8),
    ("redis", 5.1),
]

print(top_processes(procs, 3))   # ['node', 'python3', 'postgres']
print(top_processes(procs, 1))   # ['node']`,
          solution: `def top_processes(procs: list[tuple[str, float]], n: int) -> list[str]:
    sorted_procs = sorted(procs, key=lambda p: p[1], reverse=True)
    return [p[0] for p in sorted_procs[:n]]`,
          hints: [
            '`sorted()` takes a `key` parameter. Each item is a tuple, and CPU usage is at index 1.',
            'Use `reverse=True` to sort highest first. Then slice with `[:n]` to grab the top N.',
            'Final step: use a list comprehension to extract just the names (`p[0]`) from the sorted, sliced list.',
          ],
          concepts: ['sorted', 'lambda', 'key function', 'slicing', 'tuples', 'list comprehension'],
        },
        {
          id: 'py-list-3',
          title: 'Nested Comprehension',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'python',
          goal: 'Use a nested list comprehension to flatten a list of lists, then use `enumerate` to number the results.',
          skeleton: `# A list of log batches (each batch is a list of log lines)
batches = [
    ["INFO: server started", "INFO: listening on :8080"],
    ["WARN: high memory", "ERROR: disk full"],
    ["INFO: request from 10.0.0.1"],
]

# Flatten into a single list of all log lines
all_logs = [__BLANK__ for batch in __BLANK__ for line in __BLANK__]

# Number each line: ["1: INFO: server started", "2: INFO: listening on :8080", ...]
numbered = [f"{__BLANK__}: {__BLANK__}" for __BLANK__, __BLANK__ in enumerate(all_logs, start=__BLANK__)]

for line in numbered:
    print(line)`,
          solution: `all_logs = [line for batch in batches for line in batch]
numbered = [f"{i}: {line}" for i, line in enumerate(all_logs, start=1)]

for line in numbered:
    print(line)`,
          hints: [
            'Nested comprehension reads left to right: outer loop first (`for batch in batches`), then inner (`for line in batch`).',
            '`enumerate(iterable, start=1)` gives you `(index, item)` pairs, starting the count at 1.',
            'Fill the blanks: `line`, `batches`, `batch` for flattening. Then `i`, `line`, `i`, `line`, `1` for numbering.',
          ],
          concepts: ['nested comprehension', 'enumerate', 'flatten', 'f-strings'],
        },
      ],
    },
    {
      id: 'py-dicts',
      title: '3. Dictionaries & Iteration',
      explanation: `## Dictionaries & Iteration

Dictionaries are key-value stores. Think of them as JSON objects:

\`\`\`python
server = {
    "name": "rocky",
    "ip": "192.168.8.133",
    "port": 22,
    "online": True,
}

server["name"]         # "rocky"
server.get("tags", []) # [] (default if key missing)
server["tags"] = ["local", "dev"]  # add a new key
\`\`\`

**Iterating:**
\`\`\`python
for key in server:                     # just keys
for key, value in server.items():      # key + value pairs
for value in server.values():          # just values
\`\`\`

**Dict comprehensions:**
\`\`\`python
# {key: value for item in iterable}
name_lengths = {name: len(name) for name in ["rocky", "pangolin"]}
# {"rocky": 5, "pangolin": 8}
\`\`\`

**Merging dicts (Python 3.9+):**
\`\`\`python
defaults = {"port": 22, "timeout": 30}
overrides = {"port": 4822}
config = defaults | overrides   # {"port": 4822, "timeout": 30}
\`\`\``,
      exercises: [
        {
          id: 'py-dict-1',
          title: 'Dict Basics',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'python',
          goal: 'Work with dictionaries: access values, use `.get()` with defaults, and iterate over key-value pairs.',
          skeleton: `services = {
    "engram": {"port": 4200, "status": "running"},
    "synapse": {"port": 8080, "status": "running"},
    "forge": {"port": 1420, "status": "stopped"},
}

# Get the port for engram
engram_port = services["engram"][__BLANK__]

# Safely get a service that might not exist (default to empty dict)
unknown = services.__BLANK__("grafana", __BLANK__)

# Print status of each service
for __BLANK__, __BLANK__ in services.__BLANK__():
    status = info["status"]
    port = info["port"]
    print(f"{name}: {status} on port {port}")`,
          solution: `engram_port = services["engram"]["port"]
unknown = services.get("grafana", {})

for name, info in services.items():
    status = info["status"]
    port = info["port"]
    print(f"{name}: {status} on port {port}")`,
          hints: [
            'Nested dicts use chained brackets: `dict["outer"]["inner"]`.',
            '`.get(key, default)` returns the default if the key is missing. An empty dict is `{}`.',
            '`.items()` gives you `(key, value)` pairs to unpack in the for loop.',
          ],
          concepts: ['dict access', 'dict.get', 'dict.items', 'nested dicts', 'for loop unpacking'],
        },
        {
          id: 'py-dict-2',
          title: 'Word Counter',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'python',
          goal: 'Write a function `count_words` that takes a string and returns a dict mapping each word (lowercased) to how many times it appears.',
          skeleton: `# Write count_words here


# Tests
result = count_words("the cat sat on the mat the cat")
print(result)  # {'the': 3, 'cat': 2, 'sat': 1, 'on': 1, 'mat': 1}

result2 = count_words("GO go Go")
print(result2)  # {'go': 3}`,
          solution: `def count_words(text: str) -> dict[str, int]:
    counts: dict[str, int] = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts`,
          hints: [
            '`.lower()` makes the string lowercase. `.split()` breaks it into a list of words.',
            'Use `.get(word, 0)` to get the current count (defaulting to 0), then add 1.',
            'Loop through each word, building up the counts dict. Or for a one-liner: look into `collections.Counter`.',
          ],
          concepts: ['dict building', 'str.split', 'str.lower', 'dict.get', 'word counting'],
        },
        {
          id: 'py-dict-3',
          title: 'Config Merger',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'python',
          goal: 'Write a function `merge_configs` that takes a list of config dicts (each with a "name" key and various settings) and merges them into a single dict keyed by name. If a name appears more than once, later values override earlier ones.',
          skeleton: `# Write merge_configs here


# Tests
configs = [
    {"name": "rocky", "port": 22, "user": "zan"},
    {"name": "ovh-vps", "port": 4822, "user": "zan"},
    {"name": "rocky", "port": 4200, "role": "engram"},
]

merged = merge_configs(configs)
print(merged)
# {
#   'rocky': {'name': 'rocky', 'port': 4200, 'user': 'zan', 'role': 'engram'},
#   'ovh-vps': {'name': 'ovh-vps', 'port': 4822, 'user': 'zan'}
# }`,
          solution: `def merge_configs(configs: list[dict]) -> dict[str, dict]:
    merged: dict[str, dict] = {}
    for cfg in configs:
        name = cfg["name"]
        if name in merged:
            merged[name].update(cfg)
        else:
            merged[name] = dict(cfg)
    return merged`,
          hints: [
            'You need a result dict keyed by name. Loop through each config, pull out its "name" field.',
            'If the name already exists in results, use `.update()` to merge the new keys in. Otherwise, add a copy.',
            'Use `dict(cfg)` to make a shallow copy so you don\'t modify the original.',
          ],
          concepts: ['dict.update', 'dict copy', 'merging', 'conditional logic', 'grouping by key'],
        },
      ],
    },
    {
      id: 'py-classes',
      title: '4. Classes & OOP',
      explanation: `## Classes & OOP

Classes bundle data and behavior together. Python classes are straightforward:

\`\`\`python
class Server:
    def __init__(self, name: str, ip: str, port: int = 22):
        self.name = name
        self.ip = ip
        self.port = port
        self.online = False

    def connect(self) -> str:
        self.online = True
        return f"Connected to {self.name} at {self.ip}:{self.port}"

    def __repr__(self) -> str:
        status = "online" if self.online else "offline"
        return f"Server({self.name}, {status})"

srv = Server("rocky", "192.168.8.133")
print(srv.connect())   # Connected to rocky at 192.168.8.133:22
print(srv)             # Server(rocky, online)
\`\`\`

**Key concepts:**
- \`__init__\` is the constructor (runs when you create an instance)
- \`self\` is the instance (like \`this\` in JS/TS)
- \`__repr__\` controls what \`print()\` shows
- All methods take \`self\` as their first parameter

**Inheritance:**
\`\`\`python
class DatabaseServer(Server):
    def __init__(self, name: str, ip: str, db_port: int = 5432):
        super().__init__(name, ip)  # call parent constructor
        self.db_port = db_port
\`\`\`

**Dataclasses** (Python 3.7+) auto-generate boilerplate:
\`\`\`python
from dataclasses import dataclass

@dataclass
class Container:
    name: str
    image: str
    port: int
    running: bool = False
\`\`\``,
      exercises: [
        {
          id: 'py-class-1',
          title: 'Build a Class',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'python',
          goal: 'Complete the `Service` class that tracks a running service with name, port, and request count.',
          skeleton: `class Service:
    __BLANK__ __init__(self, name: str, port: int):
        __BLANK__.name = name
        __BLANK__.port = port
        self.running = False
        self.request_count = 0

    def start(self) __BLANK__ str:
        self.running = __BLANK__
        return f"{self.name} started on port {self.port}"

    def handle_request(self, path: str) -> str:
        if not self.running:
            return f"{self.name} is not running!"
        __BLANK__.request_count += 1
        return f"{self.name} handled {path} (total: {self.request_count})"

    def __BLANK__(self) -> str:
        status = "running" if self.running else "stopped"
        return f"Service({self.name}, {status}, {self.request_count} requests)"

# Tests
api = Service("engram-api", 4200)
print(api.start())                          # engram-api started on port 4200
print(api.handle_request("/search"))        # engram-api handled /search (total: 1)
print(api.handle_request("/store"))         # engram-api handled /store (total: 2)
print(api)                                  # Service(engram-api, running, 2 requests)`,
          solution: `class Service:
    def __init__(self, name: str, port: int):
        self.name = name
        self.port = port
        self.running = False
        self.request_count = 0

    def start(self) -> str:
        self.running = True
        return f"{self.name} started on port {self.port}"

    def handle_request(self, path: str) -> str:
        if not self.running:
            return f"{self.name} is not running!"
        self.request_count += 1
        return f"{self.name} handled {path} (total: {self.request_count})"

    def __repr__(self) -> str:
        status = "running" if self.running else "stopped"
        return f"Service({self.name}, {status}, {self.request_count} requests)"

api = Service("engram-api", 4200)
print(api.start())
print(api.handle_request("/search"))
print(api.handle_request("/store"))
print(api)`,
          hints: [
            '`__init__` is defined with `def`. `self` refers to the current instance, like `this` in other languages.',
            'Return type annotation uses `->`. Booleans are `True` and `False` (capitalized).',
            'Fill in: `def`, `self` (x3), `->`, `True`, `self`, `__repr__`.',
          ],
          concepts: ['class', '__init__', 'self', '__repr__', 'instance variables', 'methods'],
        },
        {
          id: 'py-class-2',
          title: 'Inheritance & Super',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'python',
          goal: 'Create a `RateLimitedService` class that extends `Service`. It should accept an extra parameter `max_rpm` (max requests per minute). Override `handle_request` to reject requests when `request_count >= max_rpm`.',
          skeleton: `class Service:
    def __init__(self, name: str, port: int):
        self.name = name
        self.port = port
        self.running = False
        self.request_count = 0

    def start(self) -> str:
        self.running = True
        return f"{self.name} started on port {self.port}"

    def handle_request(self, path: str) -> str:
        if not self.running:
            return f"{self.name} is not running!"
        self.request_count += 1
        return f"{self.name} handled {path} (total: {self.request_count})"


# Write RateLimitedService here (inherits from Service)


# Tests
api = RateLimitedService("engram-api", 4200, max_rpm=3)
api.start()
print(api.handle_request("/search"))    # engram-api handled /search (total: 1)
print(api.handle_request("/store"))     # engram-api handled /store (total: 2)
print(api.handle_request("/context"))   # engram-api handled /context (total: 3)
print(api.handle_request("/list"))      # Rate limited! engram-api: 3/3 requests used`,
          solution: `class RateLimitedService(Service):
    def __init__(self, name: str, port: int, max_rpm: int = 60):
        super().__init__(name, port)
        self.max_rpm = max_rpm

    def handle_request(self, path: str) -> str:
        if self.request_count >= self.max_rpm:
            return f"Rate limited! {self.name}: {self.request_count}/{self.max_rpm} requests used"
        return super().handle_request(path)`,
          hints: [
            'Inherit with `class RateLimitedService(Service):`. Call `super().__init__(name, port)` in the constructor.',
            'Override `handle_request`: check the limit first, then call `super().handle_request(path)` for the normal behavior.',
            'Check `self.request_count >= self.max_rpm` BEFORE calling super, since super increments the count.',
          ],
          concepts: ['inheritance', 'super()', 'method override', 'rate limiting'],
        },
        {
          id: 'py-class-3',
          title: 'Dataclass Refactor',
          type: 'refactor',
          difficulty: 'advanced',
          language: 'python',
          goal: 'Refactor this verbose class into a Python dataclass. Dataclasses auto-generate `__init__`, `__repr__`, and more from field declarations.',
          skeleton: `# Refactor this class to use @dataclass
# Hint: from dataclasses import dataclass, field

class Container:
    def __init__(self, name: str, image: str, port: int, env: dict | None = None):
        self.name = name
        self.image = image
        self.port = port
        self.env = env if env is not None else {}
        self.running = False

    def __repr__(self) -> str:
        return f"Container(name='{self.name}', image='{self.image}', port={self.port}, running={self.running})"

    def start(self) -> str:
        self.running = True
        return f"Started {self.name} ({self.image}) on port {self.port}"


# Tests (should still work after refactor)
c = Container("engram", "engram:latest", 4200, env={"LOG_LEVEL": "debug"})
print(c)             # Container(name='engram', image='engram:latest', port=4200, running=False)
print(c.start())     # Started engram (engram:latest) on port 4200
print(c.env)         # {'LOG_LEVEL': 'debug'}`,
          solution: `from dataclasses import dataclass, field

@dataclass
class Container:
    name: str
    image: str
    port: int
    env: dict = field(default_factory=dict)
    running: bool = False

    def start(self) -> str:
        self.running = True
        return f"Started {self.name} ({self.image}) on port {self.port}"

c = Container("engram", "engram:latest", 4200, env={"LOG_LEVEL": "debug"})
print(c)
print(c.start())
print(c.env)`,
          hints: [
            'Import `dataclass` and `field` from the `dataclasses` module. Decorate the class with `@dataclass`.',
            'Replace `__init__` with class-level field declarations: `name: str`, `image: str`, etc. The dataclass generates `__init__` and `__repr__` for you.',
            'For mutable defaults (like a dict), use `field(default_factory=dict)` instead of `= {}`. Regular defaults like `running: bool = False` work normally.',
          ],
          concepts: ['dataclass', 'field', 'default_factory', 'refactoring', 'decorator'],
        },
      ],
    },
    {
      id: 'py-files',
      title: '5. File I/O & Error Handling',
      explanation: `## File I/O & Error Handling

Python makes reading and writing files simple with the \`with\` statement:

\`\`\`python
# Reading a file
with open("config.json", "r") as f:
    content = f.read()       # entire file as string

# Reading line by line (memory efficient)
with open("server.log", "r") as f:
    for line in f:
        print(line.strip())  # .strip() removes trailing newline

# Writing a file
with open("output.txt", "w") as f:
    f.write("Hello, world!\\n")
\`\`\`

The \`with\` block automatically closes the file when done, even if an error occurs.

**JSON is built in:**
\`\`\`python
import json

data = {"name": "rocky", "port": 22}
json_str = json.dumps(data, indent=2)   # dict -> string
parsed = json.loads(json_str)            # string -> dict

# Read/write JSON files directly
with open("config.json") as f:
    config = json.load(f)               # file -> dict
with open("config.json", "w") as f:
    json.dump(config, f, indent=2)      # dict -> file
\`\`\`

**Error handling:**
\`\`\`python
try:
    result = risky_operation()
except FileNotFoundError:
    print("File not found")
except json.JSONDecodeError as e:
    print(f"Bad JSON: {e}")
except Exception as e:
    print(f"Unexpected: {e}")
finally:
    cleanup()  # always runs
\`\`\``,
      exercises: [
        {
          id: 'py-file-1',
          title: 'Parse a Log File',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'python',
          goal: 'Write a function `parse_log` that takes a multi-line log string (not a file, for easy testing) and returns a dict with counts of each log level: `{"INFO": n, "WARN": n, "ERROR": n}`. Each log line starts with the level followed by a colon, like "INFO: server started".',
          skeleton: `# Write parse_log here


# Tests
log_data = """INFO: server started
INFO: listening on :4200
WARN: high memory usage
ERROR: disk full on /dev/sda1
INFO: request from 10.0.0.1
ERROR: connection timeout
INFO: request from 10.0.0.2
WARN: slow query detected"""

result = parse_log(log_data)
print(result)  # {'INFO': 4, 'WARN': 2, 'ERROR': 2}`,
          solution: `def parse_log(text: str) -> dict[str, int]:
    counts: dict[str, int] = {"INFO": 0, "WARN": 0, "ERROR": 0}
    for line in text.strip().splitlines():
        level = line.split(":")[0].strip()
        if level in counts:
            counts[level] += 1
    return counts`,
          hints: [
            '`.splitlines()` breaks a multi-line string into a list of lines. Each line starts with the level before the colon.',
            'Use `.split(":")` on each line and grab the first element to get the level. Then increment the count.',
            'Initialize counts for all three levels at 0. Check `if level in counts` to avoid counting unknown levels.',
          ],
          concepts: ['str.splitlines', 'str.split', 'dict counting', 'string parsing'],
        },
        {
          id: 'py-file-2',
          title: 'Safe JSON Config Loader',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'python',
          goal: 'Write a function `load_config` that takes a file path and a dict of defaults. It should read and parse the JSON file, then merge it with defaults (file values override defaults). Handle errors gracefully: if the file is missing, return defaults. If the JSON is invalid, print a warning and return defaults.',
          skeleton: `import json

# Write load_config here


# Tests
defaults = {"port": 8080, "debug": False, "host": "0.0.0.0"}

# This will use the FileNotFoundError path since the file doesn't exist
result = load_config("nonexistent.json", defaults)
print(result)  # {"port": 8080, "debug": False, "host": "0.0.0.0"}

# In production with a real config file containing {"port": 4200, "debug": true}:
# result would be {"port": 4200, "debug": True, "host": "0.0.0.0"}`,
          solution: `import json

def load_config(path: str, defaults: dict) -> dict:
    try:
        with open(path, "r") as f:
            file_config = json.load(f)
        return {**defaults, **file_config}
    except FileNotFoundError:
        print(f"Config not found at {path}, using defaults")
        return dict(defaults)
    except json.JSONDecodeError as e:
        print(f"Invalid JSON in {path}: {e}, using defaults")
        return dict(defaults)`,
          hints: [
            'Use `try/except` to catch `FileNotFoundError` and `json.JSONDecodeError` separately.',
            'Merge dicts with `{**defaults, **file_config}`. The second dict overrides matching keys from the first.',
            'Return `dict(defaults)` (a copy) in error cases so the caller can\'t accidentally modify the original defaults dict.',
          ],
          concepts: ['json.load', 'try/except', 'FileNotFoundError', 'JSONDecodeError', 'dict merge', 'with statement'],
        },
      ],
    },
  ],
};
