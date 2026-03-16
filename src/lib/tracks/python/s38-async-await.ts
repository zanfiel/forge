import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-async',
  title: '38. Async & Await',
  explanation: `## Async & Await

Python's \`asyncio\` module enables asynchronous programming -- writing concurrent code with a single thread.

### Core Concepts
- **\`async def\`** -- declares a coroutine function
- **\`await\`** -- suspends execution until the awaited coroutine completes
- **Coroutine** -- the object returned by calling an async function

### Entry Point
\`\`\`python
import asyncio

async def main():
    print("Hello")
    await asyncio.sleep(1)
    print("World")

asyncio.run(main())
\`\`\`

### Concurrent Execution
- **\`asyncio.gather(*coros)\`** -- run coroutines concurrently, return results in order
- **\`asyncio.create_task(coro)\`** -- schedule a coroutine as a background task
- **\`asyncio.wait(tasks)\`** -- wait for tasks with optional timeout

### Async Iteration & Context Managers
- **\`async for\`** -- iterate over an async iterator
- **\`async with\`** -- use an async context manager
- Implement \`__aiter__\`/\`__anext__\` for async iterators
- Implement \`__aenter__\`/\`__aexit__\` for async context managers

### Important Rules
- Never call \`time.sleep()\` inside async code -- use \`asyncio.sleep()\`
- Coroutines must be awaited or scheduled as tasks
- \`asyncio.run()\` creates a new event loop and runs the given coroutine
- Only one coroutine runs at a time per event loop (cooperative multitasking)
`,
  exercises: [
    {
      id: 'py-async-1',
      title: 'Declare an async function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Declare a coroutine function using the async keyword.',
      skeleton: `import asyncio

__BLANK__ def greet():
    print("Hello, async world!")

asyncio.run(greet())`,
      solution: `import asyncio

async def greet():
    print("Hello, async world!")

asyncio.run(greet())`,
      hints: [
        'Coroutine functions are declared with a special keyword before def.',
        'The keyword is "async".',
        'The answer is: async',
      ],
      concepts: ['async def', 'coroutine'],
    },
    {
      id: 'py-async-2',
      title: 'Await a coroutine',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use await to call a coroutine from another coroutine.',
      skeleton: `import asyncio

async def fetch_data():
    return {"key": "value"}

async def main():
    data = __BLANK__ fetch_data()
    print(data)

asyncio.run(main())`,
      solution: `import asyncio

async def fetch_data():
    return {"key": "value"}

async def main():
    data = await fetch_data()
    print(data)

asyncio.run(main())`,
      hints: [
        'To get the result of a coroutine, you must suspend execution.',
        'The keyword that suspends until the coroutine completes is "await".',
        'The answer is: await',
      ],
      concepts: ['await', 'coroutine'],
    },
    {
      id: 'py-async-3',
      title: 'asyncio.run entry point',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use asyncio.run() to execute a coroutine from synchronous code.',
      skeleton: `import asyncio

async def main():
    print("Running!")

asyncio.__BLANK__(main())`,
      solution: `import asyncio

async def main():
    print("Running!")

asyncio.run(main())`,
      hints: [
        'asyncio provides a function to run a coroutine from sync code.',
        'It creates a new event loop and runs the coroutine to completion.',
        'The answer is: run',
      ],
      concepts: ['asyncio.run', 'event loop'],
    },
    {
      id: 'py-async-4',
      title: 'Async sleep',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use asyncio.sleep() to pause a coroutine without blocking the event loop.',
      skeleton: `import asyncio

async def delayed_hello():
    await asyncio.__BLANK__(1)
    print("Hello after 1 second")

asyncio.run(delayed_hello())`,
      solution: `import asyncio

async def delayed_hello():
    await asyncio.sleep(1)
    print("Hello after 1 second")

asyncio.run(delayed_hello())`,
      hints: [
        'asyncio has a non-blocking sleep function.',
        'Unlike time.sleep(), this one yields control to the event loop.',
        'The answer is: sleep',
      ],
      concepts: ['asyncio.sleep', 'non-blocking'],
    },
    {
      id: 'py-async-5',
      title: 'Write a simple async function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write an async function that returns the sum of two numbers after a brief delay.',
      skeleton: `import asyncio

# Write an async function called 'delayed_add' that:
# 1. Takes two numbers a and b
# 2. Awaits asyncio.sleep(0.1)
# 3. Returns their sum

async def delayed_add(a, b):
    pass`,
      solution: `import asyncio

async def delayed_add(a, b):
    await asyncio.sleep(0.1)
    return a + b`,
      hints: [
        'Use async def to declare the function.',
        'Call await asyncio.sleep(0.1) before returning.',
        'Return a + b after the sleep.',
      ],
      concepts: ['async def', 'await', 'asyncio.sleep'],
    },
    {
      id: 'py-async-6',
      title: 'Predict sequential awaits',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Predict the output of sequential await calls.',
      skeleton: `import asyncio

async def step(name):
    print(f"start {name}")
    await asyncio.sleep(0)
    print(f"end {name}")

async def main():
    await step("A")
    await step("B")

asyncio.run(main())`,
      solution: `start A
end A
start B
end B`,
      hints: [
        'Sequential awaits run one after the other.',
        'step("A") completes fully before step("B") starts.',
        'Output: start A, end A, start B, end B -- each on its own line.',
      ],
      concepts: ['sequential execution', 'await'],
    },
    {
      id: 'py-async-7',
      title: 'Fix missing await',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code that forgets to await a coroutine.',
      skeleton: `import asyncio

async def get_value():
    return 42

async def main():
    result = get_value()
    print(f"The answer is {result}")

asyncio.run(main())`,
      solution: `import asyncio

async def get_value():
    return 42

async def main():
    result = await get_value()
    print(f"The answer is {result}")

asyncio.run(main())`,
      hints: [
        'Calling an async function without await returns a coroutine object, not the value.',
        'You need to await the coroutine to get its return value.',
        'Add "await" before get_value().',
      ],
      concepts: ['await', 'coroutine object'],
    },
    {
      id: 'py-async-8',
      title: 'asyncio.gather',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use asyncio.gather to run multiple coroutines concurrently.',
      skeleton: `import asyncio

async def fetch(url):
    await asyncio.sleep(0.1)
    return f"data from {url}"

async def main():
    results = await asyncio.__BLANK__(
        fetch("url1"),
        fetch("url2"),
        fetch("url3"),
    )
    print(results)

asyncio.run(main())`,
      solution: `import asyncio

async def fetch(url):
    await asyncio.sleep(0.1)
    return f"data from {url}"

async def main():
    results = await asyncio.gather(
        fetch("url1"),
        fetch("url2"),
        fetch("url3"),
    )
    print(results)

asyncio.run(main())`,
      hints: [
        'asyncio has a function that runs multiple coroutines concurrently.',
        'It returns results in the same order as the arguments.',
        'The answer is: gather',
      ],
      concepts: ['asyncio.gather', 'concurrent execution'],
    },
    {
      id: 'py-async-9',
      title: 'Write gather-based fetcher',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write an async function that fetches multiple URLs concurrently using gather.',
      skeleton: `import asyncio

async def fetch_one(url):
    await asyncio.sleep(0.1)
    return f"response from {url}"

# Write an async function 'fetch_all' that:
# 1. Takes a list of URLs
# 2. Uses asyncio.gather to fetch them all concurrently
# 3. Returns the list of results

async def fetch_all(urls):
    pass`,
      solution: `import asyncio

async def fetch_one(url):
    await asyncio.sleep(0.1)
    return f"response from {url}"

async def fetch_all(urls):
    results = await asyncio.gather(*[fetch_one(url) for url in urls])
    return list(results)`,
      hints: [
        'Use a list comprehension to create coroutines for each URL.',
        'Unpack the list with * when passing to asyncio.gather.',
        'await asyncio.gather(*[fetch_one(u) for u in urls])',
      ],
      concepts: ['asyncio.gather', 'list comprehension', 'unpacking'],
    },
    {
      id: 'py-async-10',
      title: 'Fix gather bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the incorrect use of asyncio.gather.',
      skeleton: `import asyncio

async def task(n):
    await asyncio.sleep(0.1)
    return n * 2

async def main():
    coros = [task(1), task(2), task(3)]
    results = await asyncio.gather(coros)
    print(results)

asyncio.run(main())`,
      solution: `import asyncio

async def task(n):
    await asyncio.sleep(0.1)
    return n * 2

async def main():
    coros = [task(1), task(2), task(3)]
    results = await asyncio.gather(*coros)
    print(results)

asyncio.run(main())`,
      hints: [
        'asyncio.gather takes individual coroutines, not a list.',
        'You need to unpack the list into separate arguments.',
        'Change gather(coros) to gather(*coros).',
      ],
      concepts: ['asyncio.gather', 'argument unpacking'],
    },
    {
      id: 'py-async-11',
      title: 'Async for loop',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use async for to iterate over an async iterator.',
      skeleton: `import asyncio

class AsyncCounter:
    def __init__(self, stop):
        self.stop = stop
        self.current = 0

    def __aiter__(self):
        return self

    async def __anext__(self):
        if self.current >= self.stop:
            raise StopAsyncIteration
        self.current += 1
        await asyncio.sleep(0)
        return self.current

async def main():
    __BLANK__ num in AsyncCounter(3):
        print(num)

asyncio.run(main())`,
      solution: `import asyncio

class AsyncCounter:
    def __init__(self, stop):
        self.stop = stop
        self.current = 0

    def __aiter__(self):
        return self

    async def __anext__(self):
        if self.current >= self.stop:
            raise StopAsyncIteration
        self.current += 1
        await asyncio.sleep(0)
        return self.current

async def main():
    async for num in AsyncCounter(3):
        print(num)

asyncio.run(main())`,
      hints: [
        'Async iterators require a special form of for loop.',
        'Prefix the for loop with a keyword to handle async iteration.',
        'The answer is: async for',
      ],
      concepts: ['async for', '__aiter__', '__anext__'],
    },
    {
      id: 'py-async-12',
      title: 'Write async context manager',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a class that works as an async context manager.',
      skeleton: `import asyncio

# Write a class 'AsyncTimer' that:
# 1. Implements __aenter__ -- prints "Timer started" and returns self
# 2. Implements __aexit__ -- prints "Timer stopped"
# Both methods should be async

class AsyncTimer:
    pass`,
      solution: `import asyncio

class AsyncTimer:
    async def __aenter__(self):
        print("Timer started")
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        print("Timer stopped")
        return False`,
      hints: [
        'Async context managers use __aenter__ and __aexit__ (both async def).',
        '__aenter__ should return self and __aexit__ takes exception args.',
        '__aexit__ receives (exc_type, exc_val, exc_tb) and returns False to not suppress exceptions.',
      ],
      concepts: ['async with', '__aenter__', '__aexit__'],
    },
    {
      id: 'py-async-13',
      title: 'Predict gather ordering',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict the output order when using asyncio.gather.',
      skeleton: `import asyncio

async def task(name, delay):
    print(f"{name} start")
    await asyncio.sleep(delay)
    print(f"{name} done")
    return name

async def main():
    results = await asyncio.gather(
        task("C", 0.3),
        task("A", 0.1),
        task("B", 0.2),
    )
    print(results)

asyncio.run(main())`,
      solution: `C start
A start
B start
A done
B done
C done
['C', 'A', 'B']`,
      hints: [
        'gather starts all coroutines immediately in order.',
        'They complete based on their sleep duration (shortest first).',
        'The results list preserves the original argument order, not completion order.',
      ],
      concepts: ['asyncio.gather', 'concurrency order'],
    },
    {
      id: 'py-async-14',
      title: 'Create background task',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that creates a background task with asyncio.create_task.',
      skeleton: `import asyncio

async def background_work():
    await asyncio.sleep(0.1)
    print("Background done")

# Write an async function 'run_with_background' that:
# 1. Creates a task from background_work() using asyncio.create_task
# 2. Prints "Main work"
# 3. Awaits the background task

async def run_with_background():
    pass`,
      solution: `import asyncio

async def background_work():
    await asyncio.sleep(0.1)
    print("Background done")

async def run_with_background():
    task = asyncio.create_task(background_work())
    print("Main work")
    await task`,
      hints: [
        'asyncio.create_task() schedules a coroutine to run in the background.',
        'The task starts running as soon as you create it.',
        'You must await the task to ensure it completes before the function returns.',
      ],
      concepts: ['asyncio.create_task', 'background task'],
    },
    {
      id: 'py-async-15',
      title: 'Fix async with error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the incorrect async context manager usage.',
      skeleton: `import asyncio

class AsyncResource:
    async def __aenter__(self):
        print("Acquired")
        return self

    async def __aexit__(self, *args):
        print("Released")

async def main():
    with AsyncResource() as resource:
        print("Using resource")

asyncio.run(main())`,
      solution: `import asyncio

class AsyncResource:
    async def __aenter__(self):
        print("Acquired")
        return self

    async def __aexit__(self, *args):
        print("Released")

async def main():
    async with AsyncResource() as resource:
        print("Using resource")

asyncio.run(main())`,
      hints: [
        'Async context managers cannot be used with regular "with".',
        'You need a special keyword before "with" for async context managers.',
        'Change "with" to "async with".',
      ],
      concepts: ['async with', 'async context manager'],
    },
    {
      id: 'py-async-16',
      title: 'Async producer-consumer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write an async producer-consumer using asyncio.Queue.',
      skeleton: `import asyncio

# Write two async functions:
# 1. 'producer(queue, items)' -- puts each item into the queue with await queue.put(item)
# 2. 'consumer(queue, count)' -- gets 'count' items from queue with await queue.get()
#    and appends each to a results list, then returns the list

async def producer(queue, items):
    pass

async def consumer(queue, count):
    pass`,
      solution: `import asyncio

async def producer(queue, items):
    for item in items:
        await queue.put(item)

async def consumer(queue, count):
    results = []
    for _ in range(count):
        item = await queue.get()
        results.append(item)
    return results`,
      hints: [
        'Use await queue.put(item) to add items and await queue.get() to retrieve them.',
        'The producer loops through items and puts each one. The consumer loops count times.',
        'Consumer should collect results in a list and return it.',
      ],
      concepts: ['asyncio.Queue', 'producer-consumer', 'async coordination'],
    },
    {
      id: 'py-async-17',
      title: 'asyncio.wait with timeout',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that uses asyncio.wait with a timeout.',
      skeleton: `import asyncio

async def slow_task(n):
    await asyncio.sleep(n)
    return f"task-{n}"

# Write an async function 'run_with_timeout' that:
# 1. Creates tasks for slow_task(0.1), slow_task(0.5), slow_task(2.0)
# 2. Uses asyncio.wait with timeout=0.3
# 3. Returns a tuple (completed_count, pending_count)

async def run_with_timeout():
    pass`,
      solution: `import asyncio

async def slow_task(n):
    await asyncio.sleep(n)
    return f"task-{n}"

async def run_with_timeout():
    tasks = [
        asyncio.create_task(slow_task(0.1)),
        asyncio.create_task(slow_task(0.5)),
        asyncio.create_task(slow_task(2.0)),
    ]
    done, pending = await asyncio.wait(tasks, timeout=0.3)
    for t in pending:
        t.cancel()
    return (len(done), len(pending))`,
      hints: [
        'asyncio.wait returns two sets: done and pending.',
        'Pass timeout=0.3 to asyncio.wait. Tasks finishing within 0.3s go to done.',
        'Cancel pending tasks and return (len(done), len(pending)).',
      ],
      concepts: ['asyncio.wait', 'timeout', 'task cancellation'],
    },
    {
      id: 'py-async-18',
      title: 'Predict task cancellation',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Predict what happens when a task is cancelled.',
      skeleton: `import asyncio

async def worker():
    try:
        print("working")
        await asyncio.sleep(10)
        print("done")
    except asyncio.CancelledError:
        print("cancelled")

async def main():
    task = asyncio.create_task(worker())
    await asyncio.sleep(0)
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("task was cancelled")

asyncio.run(main())`,
      solution: `working
cancelled
task was cancelled`,
      hints: [
        'The worker starts and prints "working", then sleeps.',
        'cancel() raises CancelledError inside the sleeping coroutine.',
        'The except block in worker prints "cancelled", then awaiting the task raises CancelledError in main.',
      ],
      concepts: ['task cancellation', 'CancelledError'],
    },
    {
      id: 'py-async-19',
      title: 'Refactor sync to async',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor synchronous sequential code to use async/await.',
      skeleton: `import time

def fetch_page(url):
    time.sleep(0.1)
    return f"content of {url}"

def fetch_all(urls):
    results = []
    for url in urls:
        results.append(fetch_page(url))
    return results

result = fetch_all(["a.com", "b.com", "c.com"])
print(result)`,
      solution: `import asyncio

async def fetch_page(url):
    await asyncio.sleep(0.1)
    return f"content of {url}"

async def fetch_all(urls):
    results = await asyncio.gather(*[fetch_page(url) for url in urls])
    return list(results)

result = asyncio.run(fetch_all(["a.com", "b.com", "c.com"]))
print(result)`,
      hints: [
        'Replace time.sleep with asyncio.sleep and make functions async.',
        'Use asyncio.gather instead of a sequential loop for concurrency.',
        'Use asyncio.run() to call the top-level async function.',
      ],
      concepts: ['refactoring', 'sync to async', 'asyncio.gather'],
    },
    {
      id: 'py-async-20',
      title: 'Refactor callbacks to async',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor callback-based code to use async/await.',
      skeleton: `import asyncio

def fetch_data(callback):
    # Simulates async callback pattern
    result = "fetched data"
    callback(result)

def process_data(data, callback):
    result = data.upper()
    callback(result)

def save_data(data, callback):
    callback(f"saved: {data}")

def run():
    fetch_data(lambda data:
        process_data(data, lambda processed:
            save_data(processed, lambda saved:
                print(saved))))

run()`,
      solution: `import asyncio

async def fetch_data():
    await asyncio.sleep(0)
    return "fetched data"

async def process_data(data):
    await asyncio.sleep(0)
    return data.upper()

async def save_data(data):
    await asyncio.sleep(0)
    return f"saved: {data}"

async def run():
    data = await fetch_data()
    processed = await process_data(data)
    saved = await save_data(processed)
    print(saved)

asyncio.run(run())`,
      hints: [
        'Each callback function becomes an async function that returns its result.',
        'Replace nested callbacks with sequential await calls.',
        'Each function returns its value instead of passing it to a callback.',
      ],
      concepts: ['refactoring', 'callback to async', 'async/await'],
    },
  ],
};
