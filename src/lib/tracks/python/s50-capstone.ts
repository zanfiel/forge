import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-capstone',
  title: '50. Capstone Projects',
  explanation: `## Capstone Projects

This final section brings together everything you have learned throughout the Python track. Each exercise represents a real-world mini-project that combines multiple concepts -- classes, decorators, generators, error handling, typing, design patterns, and more.

### What to Expect
These exercises simulate building production components:
\`\`\`python
# CLI tool with argument parsing
class CLI:
    def __init__(self):
        self._commands = {}

    def command(self, name):
        def decorator(func):
            self._commands[name] = func
            return func
        return decorator

    def run(self, args):
        cmd, *params = args
        if cmd in self._commands:
            return self._commands[cmd](*params)
        raise ValueError(f"Unknown command: {cmd}")
\`\`\`

### Patterns You Will Use
- **Builder / Registry**: CLI tools, plugin systems, DI containers
- **Pipeline / Chain**: Data pipelines, middleware, validators
- **State Machine**: Finite automata, workflow engines
- **Pub/Sub**: Event buses, schedulers, task queues
- **Decorator**: Rate limiters, retry logic, circuit breakers
- **Serialization**: Config managers, migration tools

### Tips
- Read the full skeleton and goal before writing
- Identify which patterns from previous sections apply
- Keep solutions minimal -- focus on correct structure over cleverness
`,
  exercises: [
    {
      id: 'py-capstone-1',
      title: 'Build a CLI tool',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete a decorator-based CLI framework that registers and dispatches commands.',
      skeleton: `class CLI:
    def __init__(self):
        self._commands = {}

    def command(self, name):
        def decorator(func):
            self._commands[__BLANK__] = func
            return func
        return __BLANK__

    def run(self, args):
        cmd, *params = args
        if cmd not in self._commands:
            raise __BLANK__(f"Unknown command: {cmd}")
        return self._commands[cmd](*params)

app = CLI()

@app.command("greet")
def greet(name):
    return f"Hello, {name}!"

print(app.run(["greet", "World"]))  # Hello, World!`,
      solution: `class CLI:
    def __init__(self):
        self._commands = {}

    def command(self, name):
        def decorator(func):
            self._commands[name] = func
            return func
        return decorator

    def run(self, args):
        cmd, *params = args
        if cmd not in self._commands:
            raise ValueError(f"Unknown command: {cmd}")
        return self._commands[cmd](*params)

app = CLI()

@app.command("greet")
def greet(name):
    return f"Hello, {name}!"

print(app.run(["greet", "World"]))  # Hello, World!`,
      hints: [
        'The decorator stores the function under the given name key.',
        'The command method returns the decorator function itself.',
        'Use ValueError for unknown commands.',
      ],
      concepts: ['decorator registry', 'CLI dispatch', 'closures'],
    },
    {
      id: 'py-capstone-2',
      title: 'Build a web scraper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Scraper class that fetches pages, extracts data via user-defined rules, and collects results.',
      skeleton: `# Write a class 'Scraper' that:
# 1. __init__() initializes an empty rules dict and results list
# 2. add_rule(name, extract_fn) registers a named extraction function
#    extract_fn(text) -> extracted value
# 3. scrape(text) applies all rules to the text and appends
#    a dict of {rule_name: extracted_value} to results
# 4. get_results() returns the list of result dicts
#
# Example usage:
#   s = Scraper()
#   s.add_rule("title", lambda t: t.split("<title>")[1].split("</title>")[0])
#   s.scrape("<title>Hello</title>")
#   print(s.get_results())  # [{"title": "Hello"}]

class Scraper:
    pass`,
      solution: `class Scraper:
    def __init__(self):
        self._rules = {}
        self._results = []

    def add_rule(self, name, extract_fn):
        self._rules[name] = extract_fn

    def scrape(self, text):
        row = {}
        for name, fn in self._rules.items():
            try:
                row[name] = fn(text)
            except Exception:
                row[name] = None
        self._results.append(row)

    def get_results(self):
        return list(self._results)`,
      hints: [
        'Store rules as a dict mapping name to callable.',
        'In scrape, iterate all rules and build a result dict.',
        'Wrap extraction in try/except so one bad rule does not crash the scraper.',
      ],
      concepts: ['extraction pipeline', 'error handling', 'registry pattern'],
    },
    {
      id: 'py-capstone-3',
      title: 'Build a data pipeline',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete a pipeline class that chains transformation steps and runs data through them.',
      skeleton: `class Pipeline:
    def __init__(self):
        self._steps = __BLANK__

    def add_step(self, fn):
        self._steps.__BLANK__(fn)
        return self

    def run(self, data):
        result = data
        for step in self.__BLANK__:
            result = step(result)
        return result

p = Pipeline()
p.add_step(lambda x: x * 2).add_step(lambda x: x + 10)
print(p.run(5))  # 20`,
      solution: `class Pipeline:
    def __init__(self):
        self._steps = []

    def add_step(self, fn):
        self._steps.append(fn)
        return self

    def run(self, data):
        result = data
        for step in self._steps:
            result = step(result)
        return result

p = Pipeline()
p.add_step(lambda x: x * 2).add_step(lambda x: x + 10)
print(p.run(5))  # 20`,
      hints: [
        '_steps is an empty list to hold transformation functions.',
        'Use append to add each step, and return self for chaining.',
        'run iterates self._steps, feeding each result to the next step.',
      ],
      concepts: ['pipeline pattern', 'method chaining', 'functional composition'],
    },
    {
      id: 'py-capstone-4',
      title: 'Build an API client',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write an APIClient class with base URL, default headers, and request methods that build endpoint URLs.',
      skeleton: `# Write a class 'APIClient' that:
# 1. __init__(base_url, headers=None) stores the base URL and default headers
# 2. _build_url(endpoint) joins base_url and endpoint with '/'
#    (strips trailing slash from base and leading slash from endpoint)
# 3. request(method, endpoint, params=None, data=None) returns a dict:
#    {"method": method, "url": full_url, "headers": headers, "params": params, "data": data}
# 4. get(endpoint, params=None) calls request with "GET"
# 5. post(endpoint, data=None) calls request with "POST"
#
# Example:
#   client = APIClient("https://api.example.com", {"Authorization": "Bearer tok"})
#   client.get("/users", params={"page": 1})

class APIClient:
    pass`,
      solution: `class APIClient:
    def __init__(self, base_url, headers=None):
        self._base_url = base_url.rstrip('/')
        self._headers = headers or {}

    def _build_url(self, endpoint):
        return f"{self._base_url}/{endpoint.lstrip('/')}"

    def request(self, method, endpoint, params=None, data=None):
        return {
            "method": method,
            "url": self._build_url(endpoint),
            "headers": dict(self._headers),
            "params": params,
            "data": data,
        }

    def get(self, endpoint, params=None):
        return self.request("GET", endpoint, params=params)

    def post(self, endpoint, data=None):
        return self.request("POST", endpoint, data=data)`,
      hints: [
        'Strip trailing slash from base_url and leading slash from endpoint before joining.',
        'request builds and returns the full request representation as a dict.',
        'get and post delegate to request with the appropriate HTTP method.',
      ],
      concepts: ['API client', 'URL building', 'method delegation'],
    },
    {
      id: 'py-capstone-5',
      title: 'Build a caching system',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete an LRU cache class using OrderedDict.',
      skeleton: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self._capacity = capacity
        self._cache = __BLANK__

    def get(self, key):
        if key not in self._cache:
            return -1
        self._cache.__BLANK__(key)
        return self._cache[key]

    def put(self, key, value):
        if key in self._cache:
            self._cache.move_to_end(key)
        self._cache[key] = value
        if len(self._cache) > self.__BLANK__:
            self._cache.popitem(last=False)

cache = LRUCache(2)
cache.put("a", 1)
cache.put("b", 2)
print(cache.get("a"))  # 1
cache.put("c", 3)
print(cache.get("b"))  # -1 (evicted)`,
      solution: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self._capacity = capacity
        self._cache = OrderedDict()

    def get(self, key):
        if key not in self._cache:
            return -1
        self._cache.move_to_end(key)
        return self._cache[key]

    def put(self, key, value):
        if key in self._cache:
            self._cache.move_to_end(key)
        self._cache[key] = value
        if len(self._cache) > self._capacity:
            self._cache.popitem(last=False)

cache = LRUCache(2)
cache.put("a", 1)
cache.put("b", 2)
print(cache.get("a"))  # 1
cache.put("c", 3)
print(cache.get("b"))  # -1 (evicted)`,
      hints: [
        'Use OrderedDict() to track insertion/access order.',
        'move_to_end(key) marks a key as recently used.',
        'When over capacity, evict the least recently used with popitem(last=False).',
      ],
      concepts: ['LRU cache', 'OrderedDict', 'eviction policy'],
    },
    {
      id: 'py-capstone-6',
      title: 'Build a task queue',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Refactor a flat script that runs tasks sequentially into a priority task queue class with error handling.',
      skeleton: `tasks = []

def add(name, fn, priority=0):
    tasks.append((name, fn, priority))

def run_all():
    results = []
    for name, fn, _ in tasks:
        result = fn()
        results.append(f"{name}: {result}")
    return results

add("backup", lambda: "backed up", priority=2)
add("email", lambda: "sent", priority=1)
add("cleanup", lambda: "cleaned", priority=3)
print(run_all())
# Problem: ignores priority, no error handling, global state`,
      solution: `class TaskQueue:
    def __init__(self):
        self._tasks = []
        self._results = []

    def add_task(self, name, fn, priority=0):
        self._tasks.append((priority, name, fn))

    def process(self):
        self._results = []
        sorted_tasks = sorted(self._tasks, key=lambda t: t[0], reverse=True)
        for _, name, fn in sorted_tasks:
            try:
                result = fn()
                self._results.append({"task": name, "result": result})
            except Exception as e:
                self._results.append({"task": name, "error": str(e)})
        self._tasks.clear()

    def get_results(self):
        return list(self._results)

q = TaskQueue()
q.add_task("backup", lambda: "backed up", priority=2)
q.add_task("email", lambda: "sent", priority=1)
q.add_task("cleanup", lambda: "cleaned", priority=3)
q.process()
print(q.get_results())
# [{'task': 'cleanup', 'result': 'cleaned'}, {'task': 'backup', ...}, {'task': 'email', ...}]`,
      hints: [
        'Encapsulate global state into a TaskQueue class.',
        'Sort tasks by priority descending before processing.',
        'Wrap each task call in try/except to capture errors without crashing.',
      ],
      concepts: ['refactoring', 'priority queue', 'encapsulation', 'error handling'],
    },
    {
      id: 'py-capstone-7',
      title: 'Build a plugin system',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Complete a plugin manager that registers plugins and runs hook methods by name.',
      skeleton: `class PluginManager:
    def __init__(self):
        self._plugins = __BLANK__

    def register(self, name, plugin):
        self._plugins[name] = __BLANK__

    def get(self, name):
        if name not in self._plugins:
            raise KeyError(f"Plugin not found: {name}")
        return self._plugins[name]

    def run_hook(self, hook_name, *args):
        results = {}
        for name, plugin in self._plugins.items():
            method = __BLANK__(plugin, hook_name, None)
            if callable(method):
                results[name] = method(*args)
        return results

    def list_plugins(self):
        return list(self._plugins.__BLANK__())

class Greeter:
    def on_start(self):
        return "hello"

pm = PluginManager()
pm.register("greeter", Greeter())
print(pm.run_hook("on_start"))  # {"greeter": "hello"}`,
      solution: `class PluginManager:
    def __init__(self):
        self._plugins = {}

    def register(self, name, plugin):
        self._plugins[name] = plugin

    def get(self, name):
        if name not in self._plugins:
            raise KeyError(f"Plugin not found: {name}")
        return self._plugins[name]

    def run_hook(self, hook_name, *args):
        results = {}
        for name, plugin in self._plugins.items():
            method = getattr(plugin, hook_name, None)
            if callable(method):
                results[name] = method(*args)
        return results

    def list_plugins(self):
        return list(self._plugins.keys())

class Greeter:
    def on_start(self):
        return "hello"

pm = PluginManager()
pm.register("greeter", Greeter())
print(pm.run_hook("on_start"))  # {"greeter": "hello"}`,
      hints: [
        '_plugins is an empty dict mapping plugin names to instances.',
        'Use getattr(plugin, hook_name, None) to look up the hook method.',
        'list_plugins returns the dict keys as a list.',
      ],
      concepts: ['plugin architecture', 'getattr', 'duck typing', 'hook system'],
    },
    {
      id: 'py-capstone-8',
      title: 'Build a config manager',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete a config manager that supports nested dot-notation access, defaults, and layered overrides.',
      skeleton: `class Config:
    def __init__(self, data=None):
        self._data = data or {}

    def get(self, key, default=None):
        parts = key.__BLANK__(".")
        current = self._data
        for part in parts:
            if isinstance(current, dict) and part in current:
                current = current[__BLANK__]
            else:
                return default
        return __BLANK__

    def set(self, key, value):
        parts = key.split(".")
        current = self._data
        for part in parts[:-1]:
            current = current.setdefault(part, {})
        current[parts[-1]] = value

    def merge(self, other_data):
        def _merge(base, override):
            for k, v in override.items():
                if k in base and isinstance(base[k], dict) and isinstance(v, dict):
                    _merge(base[k], v)
                else:
                    base[k] = v
        _merge(self._data, other_data)

cfg = Config({"db": {"host": "localhost", "port": 5432}})
print(cfg.get("db.host"))  # localhost
print(cfg.get("db.name", "mydb"))  # mydb`,
      solution: `class Config:
    def __init__(self, data=None):
        self._data = data or {}

    def get(self, key, default=None):
        parts = key.split(".")
        current = self._data
        for part in parts:
            if isinstance(current, dict) and part in current:
                current = current[part]
            else:
                return default
        return current

    def set(self, key, value):
        parts = key.split(".")
        current = self._data
        for part in parts[:-1]:
            current = current.setdefault(part, {})
        current[parts[-1]] = value

    def merge(self, other_data):
        def _merge(base, override):
            for k, v in override.items():
                if k in base and isinstance(base[k], dict) and isinstance(v, dict):
                    _merge(base[k], v)
                else:
                    base[k] = v
        _merge(self._data, other_data)

cfg = Config({"db": {"host": "localhost", "port": 5432}})
print(cfg.get("db.host"))  # localhost
print(cfg.get("db.name", "mydb"))  # mydb`,
      hints: [
        'Split the dotted key with split(".") to get path parts.',
        'Walk each part by indexing into the current dict level.',
        'Return the final current value after traversing all parts.',
      ],
      concepts: ['dot notation', 'nested dict traversal', 'config layering'],
    },
    {
      id: 'py-capstone-9',
      title: 'Build a logger',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete a structured logger with severity levels, formatting, and multiple handlers.',
      skeleton: `from datetime import datetime

class Logger:
    LEVELS = {"DEBUG": 0, "INFO": 1, "WARNING": 2, "ERROR": 3}

    def __init__(self, min_level="DEBUG"):
        self._min_level = self.LEVELS[min_level]
        self._handlers = __BLANK__

    def add_handler(self, handler):
        self._handlers.__BLANK__(handler)

    def log(self, level, message):
        if self.LEVELS.get(level, 0) >= self.__BLANK__:
            entry = f"[{datetime.now().isoformat()}] {level}: {message}"
            for handler in self._handlers:
                handler(entry)

    def debug(self, msg): self.log("DEBUG", msg)
    def info(self, msg): self.log("INFO", msg)
    def warning(self, msg): self.log("WARNING", msg)
    def error(self, msg): self.log("ERROR", msg)

log = Logger("INFO")
entries = []
log.add_handler(lambda e: entries.append(e))
log.debug("skip this")
log.info("keep this")
print(len(entries))  # 1`,
      solution: `from datetime import datetime

class Logger:
    LEVELS = {"DEBUG": 0, "INFO": 1, "WARNING": 2, "ERROR": 3}

    def __init__(self, min_level="DEBUG"):
        self._min_level = self.LEVELS[min_level]
        self._handlers = []

    def add_handler(self, handler):
        self._handlers.append(handler)

    def log(self, level, message):
        if self.LEVELS.get(level, 0) >= self._min_level:
            entry = f"[{datetime.now().isoformat()}] {level}: {message}"
            for handler in self._handlers:
                handler(entry)

    def debug(self, msg): self.log("DEBUG", msg)
    def info(self, msg): self.log("INFO", msg)
    def warning(self, msg): self.log("WARNING", msg)
    def error(self, msg): self.log("ERROR", msg)

log = Logger("INFO")
entries = []
log.add_handler(lambda e: entries.append(e))
log.debug("skip this")
log.info("keep this")
print(len(entries))  # 1`,
      hints: [
        '_handlers starts as an empty list of callable handlers.',
        'Use append to register each handler.',
        'Compare against self._min_level to filter by severity.',
      ],
      concepts: ['logging', 'severity levels', 'handler pattern'],
    },
    {
      id: 'py-capstone-10',
      title: 'Build a rate limiter',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict the output of a rate limiter that tracks call counts within a window.',
      skeleton: `class RateLimiter:
    def __init__(self, max_calls):
        self._max_calls = max_calls
        self._count = 0

    def allow(self):
        if self._count < self._max_calls:
            self._count += 1
            return True
        return False

    def reset(self):
        self._count = 0

limiter = RateLimiter(3)
results = []
for i in range(5):
    results.append(limiter.allow())
limiter.reset()
results.append(limiter.allow())
print(results)
print(limiter._count)`,
      solution: `[True, True, True, False, False, True]
1`,
      hints: [
        'The limiter allows 3 calls, then blocks. The loop runs 5 times.',
        'After reset, the counter goes back to 0, so the next allow() succeeds.',
        'After the final allow(), _count is 1.',
      ],
      concepts: ['rate limiting', 'counter-based throttle', 'predict output'],
    },
    {
      id: 'py-capstone-11',
      title: 'Build a circuit breaker',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a circuit breaker that opens after N failures and resets after a cooldown.',
      skeleton: `# Write a class 'CircuitBreaker' that:
# 1. __init__(failure_threshold, cooldown_seconds) configures the breaker
# 2. Tracks state: "closed" (normal), "open" (blocking), "half-open" (testing)
# 3. call(fn, *args, **kwargs):
#    - If "open": check if cooldown has passed -> switch to "half-open"
#      If still in cooldown, raise RuntimeError("Circuit is open")
#    - If "closed" or "half-open": try calling fn
#      On success: reset failures to 0, set state to "closed", return result
#      On exception: increment failures. If failures >= threshold, set "open"
#        and record the open timestamp. Re-raise the exception.
# 4. state property returns current state string
#
# import time

import time

class CircuitBreaker:
    pass`,
      solution: `import time

class CircuitBreaker:
    def __init__(self, failure_threshold, cooldown_seconds):
        self._threshold = failure_threshold
        self._cooldown = cooldown_seconds
        self._failures = 0
        self._state = "closed"
        self._opened_at = None

    @property
    def state(self):
        return self._state

    def call(self, fn, *args, **kwargs):
        if self._state == "open":
            if time.monotonic() - self._opened_at >= self._cooldown:
                self._state = "half-open"
            else:
                raise RuntimeError("Circuit is open")

        try:
            result = fn(*args, **kwargs)
            self._failures = 0
            self._state = "closed"
            return result
        except Exception:
            self._failures += 1
            if self._failures >= self._threshold:
                self._state = "open"
                self._opened_at = time.monotonic()
            raise`,
      hints: [
        'Track failures, state, and the timestamp when the circuit opened.',
        'In open state, check if cooldown elapsed before transitioning to half-open.',
        'On success, always reset to closed. On failure, check the threshold.',
      ],
      concepts: ['circuit breaker', 'fault tolerance', 'state transitions'],
    },
    {
      id: 'py-capstone-12',
      title: 'Build a retry system',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix a retry decorator that has incorrect backoff, exception handling, and attempt counting.',
      skeleton: `import time
from functools import wraps

def retry(max_attempts=3, backoff=1.0, exceptions=(Exception,)):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            attempt = 0
            while attempt < max_attempts:
                try:
                    return fn(*args, **kwargs)
                except Exception as e:  # Bug 1: catches all exceptions, not just specified ones
                    attempt += 1
                    if attempt < max_attempts:
                        time.sleep(backoff)  # Bug 2: no exponential backoff
                    # Bug 3: silently swallows the final exception
            return None
        return wrapper
    return decorator

call_count = 0

@retry(max_attempts=3, backoff=0.01, exceptions=(ValueError,))
def flaky():
    global call_count
    call_count += 1
    if call_count < 3:
        raise ValueError("not yet")
    return "ok"

print(flaky())  # Should print "ok" after 3 attempts`,
      solution: `import time
from functools import wraps

def retry(max_attempts=3, backoff=1.0, exceptions=(Exception,)):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(max_attempts):
                try:
                    return fn(*args, **kwargs)
                except exceptions as e:
                    last_exception = e
                    if attempt < max_attempts - 1:
                        time.sleep(backoff * (2 ** attempt))
            raise last_exception
        return wrapper
    return decorator

call_count = 0

@retry(max_attempts=3, backoff=0.01, exceptions=(ValueError,))
def flaky():
    global call_count
    call_count += 1
    if call_count < 3:
        raise ValueError("not yet")
    return "ok"

print(flaky())  # Should print "ok" after 3 attempts`,
      hints: [
        'Bug 1: except should catch only the specified exceptions tuple, not bare Exception.',
        'Bug 2: multiply backoff by 2**attempt for exponential backoff.',
        'Bug 3: after all retries fail, raise the last exception instead of returning None.',
      ],
      concepts: ['retry pattern', 'exponential backoff', 'exception filtering'],
    },
    {
      id: 'py-capstone-13',
      title: 'Build a validator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a composable schema validator that chains rules and collects all errors.',
      skeleton: `# Write a class 'Schema' that:
# 1. __init__() stores a dict of field_name -> list of (rule_fn, error_msg)
# 2. field(name) returns a FieldBuilder for that field
# 3. validate(data) checks all rules against data, returns
#    {"valid": bool, "errors": {field_name: [error_messages]}}
#
# Write a class 'FieldBuilder' that:
# 1. __init__(schema, name) links back to the schema
# 2. required(msg="Required") adds a rule checking the key exists and is truthy
# 3. min_length(n, msg=None) adds a rule checking len(value) >= n
# 4. matches(pattern, msg=None) adds a regex match rule
# 5. Each method returns self for chaining
#
# Example:
#   s = Schema()
#   s.field("email").required().min_length(5)
#   result = s.validate({"email": "ab"})
#   # {"valid": False, "errors": {"email": ["Minimum length is 5"]}}

import re

class Schema:
    pass

class FieldBuilder:
    pass`,
      solution: `import re

class Schema:
    def __init__(self):
        self._rules = {}

    def field(self, name):
        if name not in self._rules:
            self._rules[name] = []
        return FieldBuilder(self, name)

    def validate(self, data):
        errors = {}
        for field_name, rules in self._rules.items():
            field_errors = []
            value = data.get(field_name)
            for rule_fn, msg in rules:
                if not rule_fn(value):
                    field_errors.append(msg)
            if field_errors:
                errors[field_name] = field_errors
        return {"valid": len(errors) == 0, "errors": errors}

class FieldBuilder:
    def __init__(self, schema, name):
        self._schema = schema
        self._name = name

    def required(self, msg="Required"):
        self._schema._rules[self._name].append((lambda v: bool(v), msg))
        return self

    def min_length(self, n, msg=None):
        msg = msg or f"Minimum length is {n}"
        self._schema._rules[self._name].append(
            (lambda v, _n=n: v is not None and len(v) >= _n, msg)
        )
        return self

    def matches(self, pattern, msg=None):
        msg = msg or f"Must match {pattern}"
        self._schema._rules[self._name].append(
            (lambda v, _p=pattern: v is not None and bool(re.search(_p, v)), msg)
        )
        return self`,
      hints: [
        'Schema stores rules per field. FieldBuilder appends rules to the schema.',
        'Each rule is a (callable, message) tuple. The callable takes the value, returns bool.',
        'validate collects all failing messages per field into an errors dict.',
      ],
      concepts: ['schema validation', 'builder pattern', 'rule composition'],
    },
    {
      id: 'py-capstone-14',
      title: 'Build a serializer',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict the output of a custom serialization/deserialization round-trip.',
      skeleton: `class Serializer:
    def __init__(self):
        self._encoders = {}
        self._decoders = {}

    def register(self, type_name, encoder, decoder):
        self._encoders[type_name] = encoder
        self._decoders[type_name] = decoder

    def encode(self, type_name, obj):
        return {"_type": type_name, "data": self._encoders[type_name](obj)}

    def decode(self, payload):
        return self._decoders[payload["_type"]](payload["data"])

s = Serializer()
s.register(
    "point",
    lambda p: {"x": p[0], "y": p[1]},
    lambda d: (d["x"], d["y"])
)
encoded = s.encode("point", (3, 7))
decoded = s.decode(encoded)
print(encoded)
print(decoded)
print(decoded == (3, 7))`,
      solution: `{'_type': 'point', 'data': {'x': 3, 'y': 7}}
(3, 7)
True`,
      hints: [
        'encode wraps the result with _type and data keys.',
        'The encoder turns (3, 7) into {"x": 3, "y": 7}.',
        'decode uses the _type to find the decoder and reconstruct the tuple.',
      ],
      concepts: ['serialization', 'type registry', 'encode/decode round-trip'],
    },
    {
      id: 'py-capstone-15',
      title: 'Build a state machine',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a finite state machine with defined transitions, guards, and callbacks.',
      skeleton: `# Write a class 'StateMachine' that:
# 1. __init__(initial_state) sets the current state
# 2. add_transition(from_state, event, to_state, guard=None, action=None)
#    Registers a transition. guard is an optional callable returning bool.
#    action is an optional callable invoked on transition.
# 3. trigger(event) finds a matching transition for current state + event
#    If guard exists and returns False, raise ValueError("Guard rejected")
#    If no transition found, raise ValueError("No transition")
#    Calls action (if any), changes state, returns new state
# 4. state property returns current state
#
# Example:
#   sm = StateMachine("idle")
#   sm.add_transition("idle", "start", "running")
#   sm.add_transition("running", "stop", "idle")
#   sm.trigger("start")  # -> "running"

class StateMachine:
    pass`,
      solution: `class StateMachine:
    def __init__(self, initial_state):
        self._state = initial_state
        self._transitions = {}

    @property
    def state(self):
        return self._state

    def add_transition(self, from_state, event, to_state, guard=None, action=None):
        key = (from_state, event)
        self._transitions[key] = (to_state, guard, action)

    def trigger(self, event):
        key = (self._state, event)
        if key not in self._transitions:
            raise ValueError(f"No transition for state={self._state}, event={event}")
        to_state, guard, action = self._transitions[key]
        if guard is not None and not guard():
            raise ValueError("Guard rejected")
        if action is not None:
            action()
        self._state = to_state
        return self._state`,
      hints: [
        'Key transitions by (from_state, event) tuple.',
        'Store to_state, guard, and action together as the transition value.',
        'On trigger, look up the key, check the guard, run the action, update state.',
      ],
      concepts: ['finite state machine', 'guard conditions', 'transition actions'],
    },
    {
      id: 'py-capstone-16',
      title: 'Build an event bus',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix an event bus that has bugs in wildcard matching, handler priority, and event history.',
      skeleton: `class EventBus:
    def __init__(self):
        self._handlers = {}
        self._history = []

    def on(self, event, handler, priority=0):
        self._handlers.setdefault(event, []).append((handler, priority))

    def emit(self, event, data=None):
        self._history.append(event)
        handlers = self._handlers.get(event, [])
        # Bug 1: wildcard "*" handlers should fire on every event
        # but they are never included
        for handler, _ in handlers:  # Bug 2: handlers are not sorted by priority
            handler(data)

    def get_history(self):
        return self._history  # Bug 3: returns mutable reference

bus = EventBus()
results = []
bus.on("*", lambda d: results.append(f"wild:{d}"), priority=10)
bus.on("click", lambda d: results.append(f"click:{d}"), priority=1)
bus.on("click", lambda d: results.append(f"track:{d}"), priority=5)
bus.emit("click", "btn")
print(results)
# Expected: ['wild:btn', 'track:btn', 'click:btn']  (sorted by priority desc)`,
      solution: `class EventBus:
    def __init__(self):
        self._handlers = {}
        self._history = []

    def on(self, event, handler, priority=0):
        self._handlers.setdefault(event, []).append((handler, priority))

    def emit(self, event, data=None):
        self._history.append(event)
        handlers = list(self._handlers.get(event, []))
        if event != "*":
            handlers.extend(self._handlers.get("*", []))
        handlers.sort(key=lambda h: h[1], reverse=True)
        for handler, _ in handlers:
            handler(data)

    def get_history(self):
        return list(self._history)

bus = EventBus()
results = []
bus.on("*", lambda d: results.append(f"wild:{d}"), priority=10)
bus.on("click", lambda d: results.append(f"click:{d}"), priority=1)
bus.on("click", lambda d: results.append(f"track:{d}"), priority=5)
bus.emit("click", "btn")
print(results)
# ['wild:btn', 'track:btn', 'click:btn']`,
      hints: [
        'Bug 1: merge wildcard "*" handlers into the handler list for every event.',
        'Bug 2: sort the combined handler list by priority descending before calling.',
        'Bug 3: return a copy of history with list() to prevent external mutation.',
      ],
      concepts: ['event bus', 'wildcard events', 'priority dispatch'],
    },
    {
      id: 'py-capstone-17',
      title: 'Build a dependency injector',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a dependency injection container that supports singletons and factory functions.',
      skeleton: `# Write a class 'Container' that:
# 1. __init__() initializes registries for factories and singletons
# 2. register(name, factory, singleton=False)
#    Stores a factory callable. If singleton, the result is cached after first call.
# 3. resolve(name) calls the factory (or returns cached singleton),
#    raises KeyError if not registered
# 4. Factories can accept the container itself to resolve dependencies:
#    container.register("db", lambda c: Database(c.resolve("config")))
#
# Example:
#   c = Container()
#   c.register("config", lambda c: {"host": "localhost"}, singleton=True)
#   c.register("db", lambda c: {"conn": c.resolve("config")["host"]})
#   print(c.resolve("db"))  # {"conn": "localhost"}

class Container:
    pass`,
      solution: `class Container:
    def __init__(self):
        self._factories = {}
        self._singletons = {}
        self._is_singleton = {}

    def register(self, name, factory, singleton=False):
        self._factories[name] = factory
        self._is_singleton[name] = singleton

    def resolve(self, name):
        if name not in self._factories:
            raise KeyError(f"Not registered: {name}")
        if self._is_singleton.get(name) and name in self._singletons:
            return self._singletons[name]
        instance = self._factories[name](self)
        if self._is_singleton.get(name):
            self._singletons[name] = instance
        return instance`,
      hints: [
        'Track which names are singletons separately from the cache.',
        'On resolve, check the singleton cache first before calling the factory.',
        'Pass self (the container) to the factory so it can resolve dependencies.',
      ],
      concepts: ['dependency injection', 'singleton', 'factory pattern', 'IoC container'],
    },
    {
      id: 'py-capstone-18',
      title: 'Build a scheduler',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict the execution order of a priority-based scheduler.',
      skeleton: `import heapq

class Scheduler:
    def __init__(self):
        self._queue = []
        self._counter = 0

    def schedule(self, priority, task_name):
        heapq.heappush(self._queue, (priority, self._counter, task_name))
        self._counter += 1

    def run_all(self):
        results = []
        while self._queue:
            priority, _, name = heapq.heappop(self._queue)
            results.append(name)
        return results

s = Scheduler()
s.schedule(3, "low")
s.schedule(1, "high")
s.schedule(2, "medium")
s.schedule(1, "also-high")
print(s.run_all())`,
      solution: `['high', 'also-high', 'medium', 'low']`,
      hints: [
        'heapq is a min-heap: lowest priority number comes out first.',
        'Equal priorities are broken by the counter (insertion order).',
        'Priority 1 items come first, then 2, then 3.',
      ],
      concepts: ['heap queue', 'priority scheduling', 'FIFO tie-breaking'],
    },
    {
      id: 'py-capstone-19',
      title: 'Build a migration tool',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix a schema migration tool with bugs in version tracking, rollback order, and error recovery.',
      skeleton: `class Migrator:
    def __init__(self):
        self._migrations = []
        self._applied = []

    def add(self, version, up_fn, down_fn):
        self._migrations.append({"version": version, "up": up_fn, "down": down_fn})

    def migrate(self, target_version):
        # Bug 1: migrations are not sorted by version before applying
        pending = [m for m in self._migrations
                   if m["version"] not in self._applied
                   and m["version"] <= target_version]
        for m in pending:
            m["up"]()
            self._applied.append(m["version"])

    def rollback(self, target_version):
        # Bug 2: rollback should apply in reverse order
        to_rollback = [m for m in self._migrations
                       if m["version"] in self._applied
                       and m["version"] > target_version]
        for m in to_rollback:
            m["down"]()
            self._applied.remove(m["version"])  # Bug 3: if down() raises, version is never removed

log = []
m = Migrator()
m.add(2, lambda: log.append("up-2"), lambda: log.append("down-2"))
m.add(1, lambda: log.append("up-1"), lambda: log.append("down-1"))
m.add(3, lambda: log.append("up-3"), lambda: log.append("down-3"))
m.migrate(3)
m.rollback(1)
print(log)
# Expected: ['up-1', 'up-2', 'up-3', 'down-3', 'down-2']`,
      solution: `class Migrator:
    def __init__(self):
        self._migrations = []
        self._applied = []

    def add(self, version, up_fn, down_fn):
        self._migrations.append({"version": version, "up": up_fn, "down": down_fn})

    def migrate(self, target_version):
        pending = [m for m in self._migrations
                   if m["version"] not in self._applied
                   and m["version"] <= target_version]
        pending.sort(key=lambda m: m["version"])
        for m in pending:
            m["up"]()
            self._applied.append(m["version"])

    def rollback(self, target_version):
        to_rollback = [m for m in self._migrations
                       if m["version"] in self._applied
                       and m["version"] > target_version]
        to_rollback.sort(key=lambda m: m["version"], reverse=True)
        for m in to_rollback:
            try:
                m["down"]()
            finally:
                self._applied.remove(m["version"])

log = []
m = Migrator()
m.add(2, lambda: log.append("up-2"), lambda: log.append("down-2"))
m.add(1, lambda: log.append("up-1"), lambda: log.append("down-1"))
m.add(3, lambda: log.append("up-3"), lambda: log.append("down-3"))
m.migrate(3)
m.rollback(1)
print(log)
# ['up-1', 'up-2', 'up-3', 'down-3', 'down-2']`,
      hints: [
        'Bug 1: sort pending migrations by version ascending before applying.',
        'Bug 2: sort rollback migrations by version descending (reverse order).',
        'Bug 3: use try/finally so the version is removed from _applied even if down() raises.',
      ],
      concepts: ['schema migration', 'version ordering', 'safe rollback'],
    },
    {
      id: 'py-capstone-20',
      title: 'Grand finale: combine patterns',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor a monolithic application class into a modular system using plugins, events, pipeline, and DI.',
      skeleton: `class MonolithApp:
    def __init__(self):
        self.config = {"db_host": "localhost", "cache_ttl": 60}
        self.cache = {}
        self.log_entries = []

    def process_request(self, request):
        # Log
        self.log_entries.append(f"Processing: {request['path']}")

        # Auth
        if not request.get("token"):
            return {"status": 401, "body": "Unauthorized"}

        # Cache check
        cache_key = request["path"]
        if cache_key in self.cache:
            self.log_entries.append(f"Cache hit: {cache_key}")
            return {"status": 200, "body": self.cache[cache_key]}

        # Business logic
        result = f"Response for {request['path']} from {self.config['db_host']}"

        # Cache store
        self.cache[cache_key] = result
        self.log_entries.append(f"Cached: {cache_key}")

        return {"status": 200, "body": result}

app = MonolithApp()
print(app.process_request({"path": "/users", "token": "abc"}))
print(app.process_request({"path": "/users", "token": "abc"}))
print(app.log_entries)`,
      solution: `class EventBus:
    def __init__(self):
        self._handlers = {}

    def on(self, event, handler):
        self._handlers.setdefault(event, []).append(handler)

    def emit(self, event, data=None):
        for h in self._handlers.get(event, []):
            h(data)

class Container:
    def __init__(self):
        self._registry = {}
        self._cache = {}

    def singleton(self, name, factory):
        self._registry[name] = factory

    def resolve(self, name):
        if name not in self._cache:
            self._cache[name] = self._registry[name](self)
        return self._cache[name]

class Pipeline:
    def __init__(self):
        self._steps = []

    def add(self, step):
        self._steps.append(step)
        return self

    def run(self, context):
        for step in self._steps:
            result = step(context)
            if result is not None:
                return result
        return context

class App:
    def __init__(self):
        self.container = Container()
        self.events = EventBus()
        self.pipeline = Pipeline()

        self.container.singleton("config", lambda c: {"db_host": "localhost", "cache_ttl": 60})
        self.container.singleton("cache", lambda c: {})
        self.container.singleton("logger", lambda c: [])

        self.pipeline.add(self._log_step)
        self.pipeline.add(self._auth_step)
        self.pipeline.add(self._cache_step)
        self.pipeline.add(self._handle_step)

    def _log_step(self, ctx):
        logger = self.container.resolve("logger")
        logger.append(f"Processing: {ctx['request']['path']}")
        self.events.emit("request:logged", ctx)
        return None

    def _auth_step(self, ctx):
        if not ctx["request"].get("token"):
            return {"status": 401, "body": "Unauthorized"}
        return None

    def _cache_step(self, ctx):
        cache = self.container.resolve("cache")
        key = ctx["request"]["path"]
        if key in cache:
            logger = self.container.resolve("logger")
            logger.append(f"Cache hit: {key}")
            return {"status": 200, "body": cache[key]}
        return None

    def _handle_step(self, ctx):
        config = self.container.resolve("config")
        cache = self.container.resolve("cache")
        logger = self.container.resolve("logger")
        path = ctx["request"]["path"]
        result = f"Response for {path} from {config['db_host']}"
        cache[path] = result
        logger.append(f"Cached: {path}")
        self.events.emit("request:handled", ctx)
        return {"status": 200, "body": result}

    def process_request(self, request):
        return self.pipeline.run({"request": request})

app = App()
print(app.process_request({"path": "/users", "token": "abc"}))
print(app.process_request({"path": "/users", "token": "abc"}))
print(app.container.resolve("logger"))`,
      hints: [
        'Extract config, cache, and logger into a DI container as singletons.',
        'Replace the monolithic method with a pipeline of discrete steps.',
        'Add an event bus for cross-cutting concerns like logging and monitoring.',
      ],
      concepts: ['dependency injection', 'pipeline', 'event bus', 'plugin architecture', 'separation of concerns'],
    },
  ],
};
