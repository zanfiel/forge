import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-concurrency',
  title: '39. Concurrency',
  explanation: `## Concurrency

Python offers multiple approaches to concurrent execution -- threading, multiprocessing, and concurrent.futures.

### Threading
\`\`\`python
from threading import Thread

def worker(name):
    print(f"Worker {name}")

t = Thread(target=worker, args=("A",))
t.start()
t.join()
\`\`\`

### The GIL
The Global Interpreter Lock (GIL) prevents multiple threads from executing Python bytecode simultaneously. This means:
- Threading is great for I/O-bound work (network, disk)
- Threading is NOT great for CPU-bound work
- Use multiprocessing for CPU-bound parallelism

### Multiprocessing
\`\`\`python
from multiprocessing import Process

p = Process(target=worker, args=("A",))
p.start()
p.join()
\`\`\`

### concurrent.futures
A high-level interface for both threading and multiprocessing:
- **ThreadPoolExecutor** -- pool of threads
- **ProcessPoolExecutor** -- pool of processes
- **executor.submit(fn, *args)** -- returns a Future
- **executor.map(fn, iterable)** -- parallel map

### Thread Safety
- **Lock** -- mutual exclusion
- **RLock** -- reentrant lock (same thread can acquire multiple times)
- **Semaphore** -- limit concurrent access
- **Queue** -- thread-safe FIFO queue
`,
  exercises: [
    {
      id: 'py-conc-1',
      title: 'Create a Thread',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a thread with a target function.',
      skeleton: `from threading import __BLANK__

def greet():
    print("Hello from thread!")

t = __BLANK__(target=greet)
t.start()
t.join()`,
      solution: `from threading import Thread

def greet():
    print("Hello from thread!")

t = Thread(target=greet)
t.start()
t.join()`,
      hints: [
        'The threading module provides a class for creating threads.',
        'The class name matches what you are creating.',
        'The answer is: Thread',
      ],
      concepts: ['Thread', 'threading'],
    },
    {
      id: 'py-conc-2',
      title: 'Start and join a thread',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Start a thread and wait for it to finish.',
      skeleton: `from threading import Thread

def work():
    print("Working...")

t = Thread(target=work)
t.__BLANK__()
t.__BLANK__()
print("Done")`,
      solution: `from threading import Thread

def work():
    print("Working...")

t = Thread(target=work)
t.start()
t.join()
print("Done")`,
      hints: [
        'One method begins execution, another waits for completion.',
        'start() begins the thread, join() waits for it to finish.',
        'The answers are: start and join',
      ],
      concepts: ['start', 'join', 'thread lifecycle'],
    },
    {
      id: 'py-conc-3',
      title: 'Thread with arguments',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Pass arguments to a thread target function.',
      skeleton: `from threading import Thread

def greet(name, times):
    for _ in range(times):
        print(f"Hello, {name}!")

t = Thread(target=greet, __BLANK__=("Alice", 3))
t.start()
t.join()`,
      solution: `from threading import Thread

def greet(name, times):
    for _ in range(times):
        print(f"Hello, {name}!")

t = Thread(target=greet, args=("Alice", 3))
t.start()
t.join()`,
      hints: [
        'Thread accepts a keyword argument for positional arguments.',
        'It is a tuple of arguments passed to the target function.',
        'The answer is: args',
      ],
      concepts: ['Thread', 'args', 'thread arguments'],
    },
    {
      id: 'py-conc-4',
      title: 'Write a threaded function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a function that runs a task in a separate thread and waits for it.',
      skeleton: `from threading import Thread

# Write a function 'run_in_thread' that:
# 1. Takes a function 'fn' and any number of args
# 2. Creates a Thread with fn as target and args as arguments
# 3. Starts and joins the thread

def run_in_thread(fn, *args):
    pass`,
      solution: `from threading import Thread

def run_in_thread(fn, *args):
    t = Thread(target=fn, args=args)
    t.start()
    t.join()`,
      hints: [
        'Create a Thread with target=fn and args=args.',
        'Call start() then join() on the thread.',
        'Thread(target=fn, args=args) -- then t.start() and t.join().',
      ],
      concepts: ['Thread', 'start', 'join'],
    },
    {
      id: 'py-conc-5',
      title: 'Predict thread output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Predict the output of a simple threaded program.',
      skeleton: `from threading import Thread

results = []

def append_value(val):
    results.append(val)

threads = []
for i in range(3):
    t = Thread(target=append_value, args=(i,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print(sorted(results))`,
      solution: `[0, 1, 2]`,
      hints: [
        'Each thread appends its value to the shared list.',
        'The order of thread execution may vary, but sorted() ensures consistent output.',
        'The output is [0, 1, 2] after sorting.',
      ],
      concepts: ['threads', 'shared state', 'join'],
    },
    {
      id: 'py-conc-6',
      title: 'Fix thread not starting',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Fix the thread that never executes.',
      skeleton: `from threading import Thread

def worker():
    print("Working!")

t = Thread(target=worker)
t.join()
print("Done")`,
      solution: `from threading import Thread

def worker():
    print("Working!")

t = Thread(target=worker)
t.start()
t.join()
print("Done")`,
      hints: [
        'A thread must be started before it can be joined.',
        'The start() method is missing.',
        'Add t.start() before t.join().',
      ],
      concepts: ['Thread', 'start', 'join'],
    },
    {
      id: 'py-conc-7',
      title: 'ThreadPoolExecutor basics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use ThreadPoolExecutor to run a function in a thread pool.',
      skeleton: `from concurrent.futures import __BLANK__

def square(n):
    return n * n

with __BLANK__(max_workers=4) as executor:
    future = executor.submit(square, 5)
    print(future.result())`,
      solution: `from concurrent.futures import ThreadPoolExecutor

def square(n):
    return n * n

with ThreadPoolExecutor(max_workers=4) as executor:
    future = executor.submit(square, 5)
    print(future.result())`,
      hints: [
        'concurrent.futures provides a pool-based executor for threads.',
        'The class name describes what it is -- a pool that executes with threads.',
        'The answer is: ThreadPoolExecutor',
      ],
      concepts: ['ThreadPoolExecutor', 'concurrent.futures'],
    },
    {
      id: 'py-conc-8',
      title: 'ThreadPoolExecutor.map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that uses ThreadPoolExecutor.map for parallel processing.',
      skeleton: `from concurrent.futures import ThreadPoolExecutor

def process(item):
    return item ** 2

# Write a function 'parallel_map' that:
# 1. Takes a function 'fn' and a list 'items'
# 2. Uses ThreadPoolExecutor with max_workers=4
# 3. Uses executor.map to apply fn to all items
# 4. Returns the results as a list

def parallel_map(fn, items):
    pass`,
      solution: `from concurrent.futures import ThreadPoolExecutor

def process(item):
    return item ** 2

def parallel_map(fn, items):
    with ThreadPoolExecutor(max_workers=4) as executor:
        results = list(executor.map(fn, items))
    return results`,
      hints: [
        'Use ThreadPoolExecutor as a context manager.',
        'executor.map(fn, items) returns an iterator of results.',
        'Wrap executor.map() in list() to get a list of results.',
      ],
      concepts: ['ThreadPoolExecutor', 'map', 'parallel processing'],
    },
    {
      id: 'py-conc-9',
      title: 'Lock for thread safety',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use a Lock to protect shared state.',
      skeleton: `from threading import Thread, __BLANK__

counter = 0
lock = __BLANK__()

def increment():
    global counter
    with lock:
        counter += 1

threads = [Thread(target=increment) for _ in range(100)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(counter)`,
      solution: `from threading import Thread, Lock

counter = 0
lock = Lock()

def increment():
    global counter
    with lock:
        counter += 1

threads = [Thread(target=increment) for _ in range(100)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(counter)`,
      hints: [
        'The threading module provides a mutual exclusion primitive.',
        'It prevents multiple threads from accessing a resource simultaneously.',
        'The answer is: Lock',
      ],
      concepts: ['Lock', 'thread safety', 'mutual exclusion'],
    },
    {
      id: 'py-conc-10',
      title: 'Fix race condition',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the race condition by adding proper locking.',
      skeleton: `from threading import Thread, Lock

counter = 0

def increment(n):
    global counter
    for _ in range(n):
        counter += 1

threads = [Thread(target=increment, args=(10000,)) for _ in range(4)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(counter)  # Should be 40000 but may not be`,
      solution: `from threading import Thread, Lock

counter = 0
lock = Lock()

def increment(n):
    global counter
    for _ in range(n):
        with lock:
            counter += 1

threads = [Thread(target=increment, args=(10000,)) for _ in range(4)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(counter)  # Now reliably 40000`,
      hints: [
        'counter += 1 is not atomic -- it reads, adds, then writes.',
        'Multiple threads can interleave these steps, causing lost updates.',
        'Create a Lock and use "with lock:" around the counter update.',
      ],
      concepts: ['race condition', 'Lock', 'thread safety'],
    },
    {
      id: 'py-conc-11',
      title: 'Predict GIL behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict output related to GIL and threading.',
      skeleton: `from threading import Thread
import time

def cpu_work():
    total = sum(range(100))
    return total

results = []

def worker():
    results.append(cpu_work())

threads = [Thread(target=worker) for _ in range(3)]
for t in threads:
    t.start()
for t in threads:
    t.join()

print(len(results))
print(all(r == 4950 for r in results))`,
      solution: `3
True`,
      hints: [
        'Each thread calls cpu_work() which sums range(100) = 4950.',
        'Three threads each append one result.',
        'len(results) is 3, and all values are 4950.',
      ],
      concepts: ['GIL', 'threading', 'CPU-bound'],
    },
    {
      id: 'py-conc-12',
      title: 'Producer-consumer with Queue',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a thread-safe producer-consumer using Queue.',
      skeleton: `from threading import Thread
from queue import Queue

# Write two functions:
# 1. 'producer(q, items)' -- puts each item into the queue
# 2. 'consumer(q, count)' -- gets 'count' items from the queue
#    and returns them as a list

def producer(q, items):
    pass

def consumer(q, count):
    pass`,
      solution: `from threading import Thread
from queue import Queue

def producer(q, items):
    for item in items:
        q.put(item)

def consumer(q, count):
    results = []
    for _ in range(count):
        item = q.get()
        results.append(item)
    return results`,
      hints: [
        'Queue.put(item) adds an item, Queue.get() retrieves one.',
        'Producer loops over items and puts each one. Consumer gets count items.',
        'Consumer collects results in a list and returns it.',
      ],
      concepts: ['Queue', 'producer-consumer', 'thread safety'],
    },
    {
      id: 'py-conc-13',
      title: 'ProcessPoolExecutor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use ProcessPoolExecutor for CPU-bound parallel work.',
      skeleton: `from concurrent.futures import __BLANK__

def heavy_compute(n):
    return sum(range(n))

if __name__ == "__main__":
    with __BLANK__(max_workers=2) as executor:
        futures = [executor.submit(heavy_compute, 1000000) for _ in range(4)]
        results = [f.result() for f in futures]
    print(len(results))`,
      solution: `from concurrent.futures import ProcessPoolExecutor

def heavy_compute(n):
    return sum(range(n))

if __name__ == "__main__":
    with ProcessPoolExecutor(max_workers=2) as executor:
        futures = [executor.submit(heavy_compute, 1000000) for _ in range(4)]
        results = [f.result() for f in futures]
    print(len(results))`,
      hints: [
        'For CPU-bound work, you want separate processes to bypass the GIL.',
        'concurrent.futures provides a process-based executor.',
        'The answer is: ProcessPoolExecutor',
      ],
      concepts: ['ProcessPoolExecutor', 'multiprocessing'],
    },
    {
      id: 'py-conc-14',
      title: 'Write multiprocessing function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that processes items in parallel using ProcessPoolExecutor.',
      skeleton: `from concurrent.futures import ProcessPoolExecutor

def square(n):
    return n * n

# Write a function 'parallel_squares' that:
# 1. Takes a list of numbers
# 2. Uses ProcessPoolExecutor to compute squares in parallel
# 3. Returns the list of results in order

def parallel_squares(numbers):
    pass`,
      solution: `from concurrent.futures import ProcessPoolExecutor

def square(n):
    return n * n

def parallel_squares(numbers):
    with ProcessPoolExecutor() as executor:
        results = list(executor.map(square, numbers))
    return results`,
      hints: [
        'Use ProcessPoolExecutor as a context manager.',
        'executor.map preserves the input order.',
        'Wrap executor.map(square, numbers) in list() to materialize results.',
      ],
      concepts: ['ProcessPoolExecutor', 'map', 'parallel computation'],
    },
    {
      id: 'py-conc-15',
      title: 'Daemon threads',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that creates a daemon thread.',
      skeleton: `from threading import Thread
import time

# Write a function 'start_background_monitor' that:
# 1. Takes a function 'fn'
# 2. Creates a daemon thread with fn as target
# 3. Starts the thread
# 4. Returns the thread object
# Daemon threads are killed when the main program exits

def start_background_monitor(fn):
    pass`,
      solution: `from threading import Thread
import time

def start_background_monitor(fn):
    t = Thread(target=fn, daemon=True)
    t.start()
    return t`,
      hints: [
        'Thread accepts a daemon parameter.',
        'Set daemon=True to make the thread a daemon thread.',
        'Thread(target=fn, daemon=True) -- then start and return.',
      ],
      concepts: ['daemon thread', 'background processing'],
    },
    {
      id: 'py-conc-16',
      title: 'Fix deadlock',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the deadlock caused by incorrect lock ordering.',
      skeleton: `from threading import Thread, Lock

lock_a = Lock()
lock_b = Lock()

def worker1():
    with lock_a:
        with lock_b:
            print("Worker 1 done")

def worker2():
    with lock_b:
        with lock_a:
            print("Worker 2 done")

t1 = Thread(target=worker1)
t2 = Thread(target=worker2)
t1.start()
t2.start()
t1.join()
t2.join()`,
      solution: `from threading import Thread, Lock

lock_a = Lock()
lock_b = Lock()

def worker1():
    with lock_a:
        with lock_b:
            print("Worker 1 done")

def worker2():
    with lock_a:
        with lock_b:
            print("Worker 2 done")

t1 = Thread(target=worker1)
t2 = Thread(target=worker2)
t1.start()
t2.start()
t1.join()
t2.join()`,
      hints: [
        'Deadlock occurs when two threads acquire locks in opposite order.',
        'Worker1 takes lock_a then lock_b; Worker2 takes lock_b then lock_a.',
        'Fix by making both workers acquire locks in the same order (lock_a then lock_b).',
      ],
      concepts: ['deadlock', 'lock ordering', 'thread safety'],
    },
    {
      id: 'py-conc-17',
      title: 'Predict futures output',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Predict the behavior of Future objects.',
      skeleton: `from concurrent.futures import ThreadPoolExecutor

def double(n):
    return n * 2

with ThreadPoolExecutor(max_workers=2) as executor:
    f1 = executor.submit(double, 5)
    f2 = executor.submit(double, 10)
    print(f1.result())
    print(f2.result())
    print(f1.done())`,
      solution: `10
20
True`,
      hints: [
        'double(5) returns 10, double(10) returns 20.',
        'f1.result() blocks until the future completes and returns the value.',
        'After calling result(), the future is done, so f1.done() is True.',
      ],
      concepts: ['Future', 'result', 'done'],
    },
    {
      id: 'py-conc-18',
      title: 'as_completed iteration',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function using as_completed to process results as they finish.',
      skeleton: `from concurrent.futures import ThreadPoolExecutor, as_completed
import time

def task(n):
    time.sleep(n * 0.01)
    return n

# Write a function 'process_as_completed' that:
# 1. Takes a list of numbers
# 2. Submits task(n) for each number using ThreadPoolExecutor
# 3. Uses as_completed to collect results in completion order
# 4. Returns the list of results in completion order

def process_as_completed(numbers):
    pass`,
      solution: `from concurrent.futures import ThreadPoolExecutor, as_completed
import time

def task(n):
    time.sleep(n * 0.01)
    return n

def process_as_completed(numbers):
    results = []
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = {executor.submit(task, n): n for n in numbers}
        for future in as_completed(futures):
            results.append(future.result())
    return results`,
      hints: [
        'Submit all tasks and collect the futures.',
        'as_completed(futures) yields futures in the order they complete.',
        'Loop over as_completed and append each future.result() to results.',
      ],
      concepts: ['as_completed', 'Future', 'completion order'],
    },
    {
      id: 'py-conc-19',
      title: 'Refactor sequential to ThreadPool',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor sequential processing to use ThreadPoolExecutor.',
      skeleton: `import time

def download(url):
    time.sleep(0.1)  # Simulate network I/O
    return f"data from {url}"

urls = ["site1.com", "site2.com", "site3.com", "site4.com"]
results = []
for url in urls:
    results.append(download(url))
print(results)`,
      solution: `from concurrent.futures import ThreadPoolExecutor
import time

def download(url):
    time.sleep(0.1)  # Simulate network I/O
    return f"data from {url}"

urls = ["site1.com", "site2.com", "site3.com", "site4.com"]
with ThreadPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(download, urls))
print(results)`,
      hints: [
        'ThreadPoolExecutor is ideal for I/O-bound tasks.',
        'executor.map(fn, iterable) replaces the sequential loop.',
        'Use a context manager and list(executor.map(download, urls)).',
      ],
      concepts: ['refactoring', 'ThreadPoolExecutor', 'I/O-bound'],
    },
    {
      id: 'py-conc-20',
      title: 'Refactor threads to ProcessPool',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor manual thread management to ProcessPoolExecutor for CPU-bound work.',
      skeleton: `from threading import Thread

results = {}

def heavy_compute(n):
    total = sum(i * i for i in range(n))
    results[n] = total

threads = []
inputs = [100000, 200000, 300000, 400000]
for n in inputs:
    t = Thread(target=heavy_compute, args=(n,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

for n in inputs:
    print(f"{n}: {results[n]}")`,
      solution: `from concurrent.futures import ProcessPoolExecutor

def heavy_compute(n):
    return sum(i * i for i in range(n))

if __name__ == "__main__":
    inputs = [100000, 200000, 300000, 400000]
    with ProcessPoolExecutor(max_workers=4) as executor:
        results = dict(zip(inputs, executor.map(heavy_compute, inputs)))

    for n in inputs:
        print(f"{n}: {results[n]}")`,
      hints: [
        'CPU-bound work benefits from ProcessPoolExecutor (bypasses GIL).',
        'Return values instead of mutating shared state.',
        'Use executor.map and zip with inputs to build the results dict.',
      ],
      concepts: ['refactoring', 'ProcessPoolExecutor', 'CPU-bound'],
    },
  ],
};
