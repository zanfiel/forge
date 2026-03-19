import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-context',
  title: '22. Context Managers',
  explanation: `## Context Managers

Context managers handle **setup and teardown** automatically using the \\\`with\\\` statement.

### The Protocol
\\\`\\\`\\\`python
class MyContext:
    def __enter__(self):
        # setup
        return resource

    def __exit__(self, exc_type, exc_val, exc_tb):
        # teardown
        return False  # re-raise exceptions
\\\`\\\`\\\`

### Usage
\\\`\\\`\\\`python
with MyContext() as resource:
    use(resource)
\\\`\\\`\\\`

### contextlib Module
\\\`\\\`\\\`python
from contextlib import contextmanager

@contextmanager
def managed_resource():
    resource = acquire()
    try:
        yield resource
    finally:
        release(resource)
\\\`\\\`\\\`

### Key Points
- \\\`__exit__\\\` returning \\\`True\\\` suppresses exceptions.
- \\\`contextlib.suppress\\\` catches and ignores specific exceptions.
- \\\`contextlib.redirect_stdout\\\` redirects print output.
- Multiple context managers can be combined in a single \\\`with\\\`.
`,
  exercises: [
    {
      id: 'py-context-1',
      title: 'Basic with Statement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use a with statement to open and read a file.',
      skeleton: `__BLANK__ open("data.txt") as f:
    content = f.read()
print(content)`,
      solution: `with open("data.txt") as f:
    content = f.read()
print(content)`,
      hints: [
        'The with keyword manages the resource lifecycle.',
        'It calls __enter__ on entry and __exit__ on exit.',
        'The answer is: with',
      ],
      concepts: ['with statement', 'file handling'],
    },
    {
      id: 'py-context-2',
      title: '__enter__ Return Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete __enter__ to return self.',
      skeleton: `class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return __BLANK__

    def __exit__(self, *args):
        import time
        self.elapsed = time.time() - self.start
        return False

with Timer() as t:
    pass
print(f"Elapsed: {t.elapsed:.4f}s")`,
      solution: `class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return self

    def __exit__(self, *args):
        import time
        self.elapsed = time.time() - self.start
        return False

with Timer() as t:
    pass
print(f"Elapsed: {t.elapsed:.4f}s")`,
      hints: [
        '__enter__ returns the value bound by "as".',
        'Returning self lets you access the context manager later.',
        'The answer is: self',
      ],
      concepts: ['__enter__', 'return self'],
    },
    {
      id: 'py-context-3',
      title: '__exit__ Parameters',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete the __exit__ signature.',
      skeleton: `class Managed:
    def __enter__(self):
        print("enter")
        return self

    def __exit__(self, exc_type, exc_val, __BLANK__):
        print("exit")
        return False

with Managed():
    print("body")`,
      solution: `class Managed:
    def __enter__(self):
        print("enter")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("exit")
        return False

with Managed():
    print("body")`,
      hints: [
        '__exit__ receives three arguments about any exception.',
        'exc_type, exc_val, and the traceback.',
        'The answer is: exc_tb',
      ],
      concepts: ['__exit__', 'exception info'],
    },
    {
      id: 'py-context-4',
      title: '@contextmanager Decorator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Complete the contextmanager-based function.',
      skeleton: `from contextlib import contextmanager

@contextmanager
def tag(name):
    print(f"<{name}>")
    __BLANK__
    print(f"</{name}>")

with tag("div"):
    print("content")`,
      solution: `from contextlib import contextmanager

@contextmanager
def tag(name):
    print(f"<{name}>")
    yield
    print(f"</{name}>")

with tag("div"):
    print("content")`,
      hints: [
        'yield pauses the generator and runs the with body.',
        'Code after yield runs on exit.',
        'The answer is: yield',
      ],
      concepts: ['@contextmanager', 'yield'],
    },
    {
      id: 'py-context-5',
      title: 'Suppress Exceptions',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use contextlib.suppress to ignore FileNotFoundError.',
      skeleton: `from contextlib import suppress

with __BLANK__(FileNotFoundError):
    open("nonexistent.txt")

print("Continued safely")`,
      solution: `from contextlib import suppress

with suppress(FileNotFoundError):
    open("nonexistent.txt")

print("Continued safely")`,
      hints: [
        'suppress() catches and ignores the specified exceptions.',
        'It is a context manager from contextlib.',
        'The answer is: suppress',
      ],
      concepts: ['contextlib.suppress'],
    },
    {
      id: 'py-context-6',
      title: 'Multiple Context Managers',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Open two files in a single with statement.',
      skeleton: `with open("input.txt") as src__BLANK__ open("output.txt", "w") as dst:
    dst.write(src.read())`,
      solution: `with open("input.txt") as src, open("output.txt", "w") as dst:
    dst.write(src.read())`,
      hints: [
        'Multiple context managers are separated by commas.',
        'Both are entered and exited together.',
        'The answer is: ,',
      ],
      concepts: ['multiple context managers'],
    },
    {
      id: 'py-context-7',
      title: 'Write a Timer Context Manager',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a Timer class context manager that measures elapsed time and stores it in self.elapsed.',
      skeleton: `import time

class Timer:
    # __enter__, __exit__
    # Store elapsed time in self.elapsed
    pass`,
      solution: `import time

class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.perf_counter() - self.start
        return False`,
      hints: [
        'Record start time in __enter__.',
        'Calculate elapsed in __exit__.',
        'Use time.perf_counter() for precision.',
      ],
      concepts: ['context manager', 'timing'],
    },
    {
      id: 'py-context-8',
      title: 'Write @contextmanager Timer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write the same timer using @contextmanager. Yield a dict that gets elapsed added to it.',
      skeleton: `from contextlib import contextmanager
import time

@contextmanager
def timer():
    # yield a dict, then add "elapsed" to it
    pass`,
      solution: `from contextlib import contextmanager
import time

@contextmanager
def timer():
    result = {}
    start = time.perf_counter()
    try:
        yield result
    finally:
        result["elapsed"] = time.perf_counter() - start`,
      hints: [
        'Create a dict before yield.',
        'yield the dict so the caller can access it.',
        'In finally, add the elapsed time to the dict.',
      ],
      concepts: ['@contextmanager', 'yield', 'timing'],
    },
    {
      id: 'py-context-9',
      title: 'Write a TempDirectory Context Manager',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a context manager that creates a temporary directory, yields its path, and cleans it up on exit.',
      skeleton: `import tempfile
import shutil

class TempDirectory:
    # Creates temp dir on enter, removes on exit
    pass`,
      solution: `import tempfile
import shutil

class TempDirectory:
    def __enter__(self):
        self.path = tempfile.mkdtemp()
        return self.path

    def __exit__(self, exc_type, exc_val, exc_tb):
        shutil.rmtree(self.path)
        return False`,
      hints: [
        'tempfile.mkdtemp() creates a temporary directory.',
        'shutil.rmtree() removes a directory tree.',
        'Always clean up in __exit__.',
      ],
      concepts: ['tempfile', 'cleanup', 'context manager'],
    },
    {
      id: 'py-context-10',
      title: 'Predict: __exit__ Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `class CM:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        print(f"enter {self.name}")
        return self

    def __exit__(self, *args):
        print(f"exit {self.name}")
        return False

with CM("A") as a, CM("B") as b:
    print("body")`,
      solution: `enter A
enter B
body
exit B
exit A`,
      hints: [
        'Context managers enter in order: A first, then B.',
        'They exit in reverse order: B first, then A.',
        'Like a stack: LIFO for exit.',
      ],
      concepts: ['context manager order', 'LIFO'],
    },
    {
      id: 'py-context-11',
      title: 'Predict: Exception in with Body',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `class Safe:
    def __enter__(self):
        print("enter")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"exit: {exc_type.__name__ if exc_type else 'clean'}")
        return True  # suppress exception

with Safe():
    print("before")
    raise ValueError("boom")
    print("after")

print("continued")`,
      solution: `enter
before
exit: ValueError
continued`,
      hints: [
        '"after" never prints because the exception interrupts.',
        '__exit__ receives the ValueError info.',
        'Returning True suppresses the exception.',
      ],
      concepts: ['exception suppression', '__exit__', 'return True'],
    },
    {
      id: 'py-context-12',
      title: 'Write a DatabaseTransaction CM',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a Transaction context manager that calls db.begin() on enter and db.commit() on success or db.rollback() on exception.',
      skeleton: `class Transaction:
    # __init__(db), __enter__, __exit__
    # commit on success, rollback on exception
    pass`,
      solution: `class Transaction:
    def __init__(self, db):
        self.db = db

    def __enter__(self):
        self.db.begin()
        return self.db

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is None:
            self.db.commit()
        else:
            self.db.rollback()
        return False`,
      hints: [
        '__enter__ calls begin() and returns the db.',
        'Check exc_type in __exit__: None means success.',
        'Return False to let exceptions propagate.',
      ],
      concepts: ['transaction pattern', 'commit/rollback'],
    },
    {
      id: 'py-context-13',
      title: 'Fix: Missing try/finally in @contextmanager',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the contextmanager so cleanup happens even if an exception occurs.',
      skeleton: `from contextlib import contextmanager

@contextmanager
def open_resource(name):
    print(f"Opening {name}")
    yield name
    print(f"Closing {name}")  # Never runs if exception in body

with open_resource("db"):
    raise RuntimeError("fail")`,
      solution: `from contextlib import contextmanager

@contextmanager
def open_resource(name):
    print(f"Opening {name}")
    try:
        yield name
    finally:
        print(f"Closing {name}")

try:
    with open_resource("db"):
        raise RuntimeError("fail")
except RuntimeError:
    pass`,
      hints: [
        'Wrap yield in try/finally for guaranteed cleanup.',
        'Without try/finally, code after yield is skipped on exception.',
        'The finally block runs regardless of exceptions.',
      ],
      concepts: ['@contextmanager', 'try/finally', 'cleanup'],
    },
    {
      id: 'py-context-14',
      title: 'Fix: __exit__ Not Returning False',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix __exit__ so exceptions are not accidentally suppressed.',
      skeleton: `class Logger:
    def __enter__(self):
        print("start logging")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            print(f"Error: {exc_val}")
        print("stop logging")
        # Missing return -- defaults to None which is falsy (OK)
        # But what if someone adds "return True" by mistake?

# Actually the bug is: should explicitly return False for clarity
with Logger():
    raise ValueError("test")  # Should propagate`,
      solution: `class Logger:
    def __enter__(self):
        print("start logging")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            print(f"Error: {exc_val}")
        print("stop logging")
        return False  # explicitly do not suppress exceptions

try:
    with Logger():
        raise ValueError("test")
except ValueError:
    print("propagated")`,
      hints: [
        '__exit__ should explicitly return False to propagate exceptions.',
        'Returning True (or truthy) would suppress the exception.',
        'Be explicit about exception handling behavior.',
      ],
      concepts: ['__exit__', 'exception propagation', 'explicit return'],
    },
    {
      id: 'py-context-15',
      title: 'Write a Redirect stdout CM',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a capture_output context manager that captures everything printed to stdout and stores it in a .output attribute.',
      skeleton: `import sys
import io

class CaptureOutput:
    # Redirect sys.stdout, store captured text in .output
    pass`,
      solution: `import sys
import io

class CaptureOutput:
    def __enter__(self):
        self._buffer = io.StringIO()
        self._original = sys.stdout
        sys.stdout = self._buffer
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.output = self._buffer.getvalue()
        sys.stdout = self._original
        self._buffer.close()
        return False`,
      hints: [
        'Replace sys.stdout with a StringIO buffer.',
        'Restore the original stdout in __exit__.',
        'Store the captured text in self.output.',
      ],
      concepts: ['sys.stdout', 'io.StringIO', 'redirect'],
    },
    {
      id: 'py-context-16',
      title: 'Predict: Nested with Statements',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `from contextlib import contextmanager

@contextmanager
def level(n):
    print(f"enter {n}")
    try:
        yield n
    finally:
        print(f"exit {n}")

with level(1) as a:
    with level(2) as b:
        print(f"body: {a} {b}")`,
      solution: `enter 1
enter 2
body: 1 2
exit 2
exit 1`,
      hints: [
        'Nested context managers enter outer first.',
        'They exit inner first (LIFO).',
        'yield provides the value for "as".',
      ],
      concepts: ['nested context managers', '@contextmanager'],
    },
    {
      id: 'py-context-17',
      title: 'Fix: Generator-based CM Leaking Resource',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the contextmanager so the connection is always closed.',
      skeleton: `from contextlib import contextmanager

@contextmanager
def get_connection(url):
    conn = {"url": url, "open": True}
    yield conn
    conn["open"] = False  # Never runs on exception!`,
      solution: `from contextlib import contextmanager

@contextmanager
def get_connection(url):
    conn = {"url": url, "open": True}
    try:
        yield conn
    finally:
        conn["open"] = False`,
      hints: [
        'Code after yield does not run if an exception occurs.',
        'Wrap yield in try/finally.',
        'finally ensures cleanup always happens.',
      ],
      concepts: ['@contextmanager', 'resource leak', 'try/finally'],
    },
    {
      id: 'py-context-18',
      title: 'Write ExitStack Usage',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that opens a variable number of files using contextlib.ExitStack and returns their contents as a list.',
      skeleton: `from contextlib import ExitStack

def read_all(*filenames):
    # Open all files, read contents, return list of strings
    pass`,
      solution: `from contextlib import ExitStack

def read_all(*filenames):
    with ExitStack() as stack:
        files = [stack.enter_context(open(fn)) for fn in filenames]
        return [f.read() for f in files]`,
      hints: [
        'ExitStack manages a variable number of context managers.',
        'Use stack.enter_context() to register each file.',
        'All files are closed when the with block exits.',
      ],
      concepts: ['ExitStack', 'dynamic context management'],
    },
    {
      id: 'py-context-19',
      title: 'Refactor: try/finally to with',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the manual try/finally into a with statement.',
      skeleton: `import threading

lock = threading.Lock()

lock.acquire()
try:
    shared_data = "updated"
finally:
    lock.release()`,
      solution: `import threading

lock = threading.Lock()

with lock:
    shared_data = "updated"`,
      hints: [
        'threading.Lock is a context manager.',
        'with lock: acquires on enter, releases on exit.',
        'Much cleaner than manual acquire/release.',
      ],
      concepts: ['refactoring', 'threading.Lock', 'with statement'],
    },
    {
      id: 'py-context-20',
      title: 'Refactor: Class CM to @contextmanager',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the class-based context manager to use @contextmanager.',
      skeleton: `class IndentPrinter:
    def __init__(self, level=1):
        self.level = level
        self.prefix = "  " * level

    def __enter__(self):
        return self

    def __exit__(self, *args):
        return False

    def print(self, text):
        print(f"{self.prefix}{text}")`,
      solution: `from contextlib import contextmanager

@contextmanager
def indent_printer(level=1):
    prefix = "  " * level

    class Printer:
        def print(self, text):
            print(f"{prefix}{text}")

    try:
        yield Printer()
    finally:
        pass`,
      hints: [
        '@contextmanager uses yield instead of __enter__/__exit__.',
        'Yield the object the caller needs.',
        'Use try/finally if cleanup is needed.',
      ],
      concepts: ['@contextmanager', 'refactoring'],
    },
  ],
};
