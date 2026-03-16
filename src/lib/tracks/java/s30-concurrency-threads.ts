import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-concurrency-threads',
  title: '30. Concurrency: Threads',
  explanation: `## Concurrency: Threads

Java has built-in support for concurrent programming via threads.

### Creating Threads
\`\`\`java
// Option 1: extend Thread
class MyThread extends Thread {
    public void run() { System.out.println("Running"); }
}
new MyThread().start();

// Option 2: implement Runnable (preferred)
new Thread(() -> System.out.println("Running")).start();
\`\`\`

### Thread Lifecycle
\`NEW -> RUNNABLE -> RUNNING -> (BLOCKED|WAITING|TIMED_WAITING) -> TERMINATED\`

### Key Methods
- \`start()\` - begin execution
- \`join()\` - wait for thread to finish
- \`sleep(ms)\` - pause current thread
- \`interrupt()\` - signal interruption

### Synchronization
\`\`\`java
synchronized void increment() { count++; }
synchronized (lock) { /* critical section */ }
\`\`\`

### volatile Keyword
Ensures visibility of changes across threads:
\`\`\`java
volatile boolean running = true;
\`\`\`

### Thread Safety
Race conditions occur when multiple threads access shared mutable state without synchronization.
`,
  exercises: [
    {
      id: 'java-thr-1',
      title: 'Create a thread with Runnable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create and start a thread using a lambda Runnable.',
      skeleton: `Thread t = new Thread(() -> System.out.println("Hello"));
t.__BLANK__();`,
      solution: `Thread t = new Thread(() -> System.out.println("Hello"));
t.start();`,
      hints: ['The method begins thread execution.', 'Do not call run() directly.', 'Use `start`.'],
      concepts: ['Thread.start', 'Runnable', 'thread creation'],
    },
    {
      id: 'java-thr-2',
      title: 'Wait for thread completion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Wait for a thread to finish execution.',
      skeleton: `Thread t = new Thread(task);
t.start();
t.__BLANK__(); // blocks until t finishes`,
      solution: `Thread t = new Thread(task);
t.start();
t.join();`,
      hints: ['This method blocks the current thread.', 'It waits until the target thread terminates.', 'Use `join`.'],
      concepts: ['Thread.join', 'blocking', 'thread coordination'],
    },
    {
      id: 'java-thr-3',
      title: 'Synchronized method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Make a method thread-safe with synchronization.',
      skeleton: `__BLANK__ void increment() {
    count++;
}`,
      solution: `synchronized void increment() {
    count++;
}`,
      hints: ['This keyword provides mutual exclusion.', 'Only one thread can execute it at a time.', 'Use `synchronized`.'],
      concepts: ['synchronized', 'thread safety', 'mutual exclusion'],
    },
    {
      id: 'java-thr-4',
      title: 'Volatile field',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Ensure a flag is visible across threads.',
      skeleton: `__BLANK__ boolean running = true;`,
      solution: `volatile boolean running = true;`,
      hints: ['This keyword ensures visibility across threads.', 'Without it, threads may cache stale values.', 'Use `volatile`.'],
      concepts: ['volatile', 'memory visibility', 'thread safety'],
    },
    {
      id: 'java-thr-5',
      title: 'Synchronized block',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Use a synchronized block with a specific lock object.',
      skeleton: `private final Object lock = new Object();

void addItem(String item) {
    __BLANK__ (lock) {
        list.add(item);
    }
}`,
      solution: `private final Object lock = new Object();

void addItem(String item) {
    synchronized (lock) {
        list.add(item);
    }
}`,
      hints: ['Synchronized blocks use a lock object.', 'The lock is specified in parentheses.', 'Use `synchronized`.'],
      concepts: ['synchronized block', 'lock object', 'critical section'],
    },
    {
      id: 'java-thr-6',
      title: 'Thread sleep',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Pause the current thread for 1 second.',
      skeleton: `Thread.__BLANK__(1000);`,
      solution: `Thread.sleep(1000);`,
      hints: ['This static method pauses the current thread.', 'Time is in milliseconds.', 'Use `sleep`.'],
      concepts: ['Thread.sleep', 'pause', 'milliseconds'],
    },
    {
      id: 'java-thr-7',
      title: 'Thread-safe counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a thread-safe Counter class with synchronized increment, decrement, and getValue methods.',
      skeleton: '',
      solution: `class Counter {
    private int value = 0;

    public synchronized void increment() {
        value++;
    }

    public synchronized void decrement() {
        value--;
    }

    public synchronized int getValue() {
        return value;
    }
}`,
      hints: ['Synchronize all methods that access shared state.', 'Mark methods with synchronized keyword.', 'Both reads and writes must be synchronized.'],
      concepts: ['synchronized methods', 'thread-safe class', 'shared state'],
    },
    {
      id: 'java-thr-8',
      title: 'Producer-consumer with wait/notify',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a simple bounded buffer with put and take methods using wait/notify.',
      skeleton: '',
      solution: `class BoundedBuffer<T> {
    private final Object[] buffer;
    private int count, putIdx, takeIdx;

    public BoundedBuffer(int capacity) {
        buffer = new Object[capacity];
    }

    public synchronized void put(T item) throws InterruptedException {
        while (count == buffer.length) wait();
        buffer[putIdx] = item;
        putIdx = (putIdx + 1) % buffer.length;
        count++;
        notifyAll();
    }

    @SuppressWarnings("unchecked")
    public synchronized T take() throws InterruptedException {
        while (count == 0) wait();
        T item = (T) buffer[takeIdx];
        takeIdx = (takeIdx + 1) % buffer.length;
        count--;
        notifyAll();
        return item;
    }
}`,
      hints: ['Use wait() when buffer is full (put) or empty (take).', 'Always use while loops for wait conditions.', 'Call notifyAll() after changing state.'],
      concepts: ['wait/notify', 'producer-consumer', 'bounded buffer'],
    },
    {
      id: 'java-thr-9',
      title: 'Run tasks in parallel',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that runs multiple Runnable tasks in parallel and waits for all to complete.',
      skeleton: '',
      solution: `static void runParallel(List<Runnable> tasks) throws InterruptedException {
    List<Thread> threads = new ArrayList<>();
    for (Runnable task : tasks) {
        Thread t = new Thread(task);
        threads.add(t);
        t.start();
    }
    for (Thread t : threads) {
        t.join();
    }
}`,
      hints: ['Create and start a thread for each task.', 'Store all threads in a list.', 'Join all threads to wait for completion.'],
      concepts: ['parallel execution', 'Thread.join', 'task management'],
    },
    {
      id: 'java-thr-10',
      title: 'AtomicInteger counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a thread-safe counter using AtomicInteger instead of synchronized.',
      skeleton: '',
      solution: `class AtomicCounter {
    private final java.util.concurrent.atomic.AtomicInteger value = new java.util.concurrent.atomic.AtomicInteger(0);

    public void increment() {
        value.incrementAndGet();
    }

    public void decrement() {
        value.decrementAndGet();
    }

    public int getValue() {
        return value.get();
    }
}`,
      hints: ['AtomicInteger provides lock-free thread-safe operations.', 'Use incrementAndGet and decrementAndGet.', 'No synchronized keyword needed.'],
      concepts: ['AtomicInteger', 'lock-free', 'compare-and-swap'],
    },
    {
      id: 'java-thr-11',
      title: 'Thread interrupt handling',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a Runnable that loops until interrupted, checking the interrupt flag properly.',
      skeleton: '',
      solution: `Runnable worker = () -> {
    while (!Thread.currentThread().isInterrupted()) {
        try {
            doWork();
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            break;
        }
    }
    System.out.println("Worker stopped");
};`,
      hints: ['Check isInterrupted() in the loop condition.', 'InterruptedException clears the interrupt flag.', 'Re-set the flag with Thread.currentThread().interrupt().'],
      concepts: ['interrupt', 'InterruptedException', 'graceful shutdown'],
    },
    {
      id: 'java-thr-12',
      title: 'Thread-safe singleton',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a thread-safe lazy singleton using double-checked locking.',
      skeleton: '',
      solution: `class Singleton {
    private static volatile Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}`,
      hints: ['Use volatile to prevent reordering.', 'Check null twice: once without lock, once with lock.', 'Synchronized block uses the class object as lock.'],
      concepts: ['double-checked locking', 'volatile', 'singleton pattern'],
    },
    {
      id: 'java-thr-13',
      title: 'Race condition in increment',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the race condition in the counter.',
      skeleton: `class Counter {
    private int count = 0;
    public void increment() { count++; } // not thread-safe
    public int getCount() { return count; }
}`,
      solution: `class Counter {
    private final java.util.concurrent.atomic.AtomicInteger count = new java.util.concurrent.atomic.AtomicInteger(0);
    public void increment() { count.incrementAndGet(); }
    public int getCount() { return count.get(); }
}`,
      hints: ['count++ is not atomic; it reads, increments, and writes.', 'Multiple threads can interleave these steps.', 'Use AtomicInteger for lock-free thread safety.'],
      concepts: ['race condition', 'AtomicInteger', 'atomicity'],
    },
    {
      id: 'java-thr-14',
      title: 'Calling run instead of start',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the thread that runs on the caller thread instead of a new thread.',
      skeleton: `Thread t = new Thread(() -> {
    System.out.println("Thread: " + Thread.currentThread().getName());
});
t.run(); // Bug: runs on main thread`,
      solution: `Thread t = new Thread(() -> {
    System.out.println("Thread: " + Thread.currentThread().getName());
});
t.start();`,
      hints: ['run() executes on the current thread.', 'start() creates a new thread and calls run() on it.', 'Always use start() to run on a new thread.'],
      concepts: ['start vs run', 'thread creation', 'common mistake'],
    },
    {
      id: 'java-thr-15',
      title: 'Deadlock scenario',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Fix the potential deadlock by using consistent lock ordering.',
      skeleton: `Object lockA = new Object();
Object lockB = new Object();

void method1() {
    synchronized (lockA) {
        synchronized (lockB) { /* work */ }
    }
}
void method2() {
    synchronized (lockB) {  // opposite order!
        synchronized (lockA) { /* work */ }
    }
}`,
      solution: `Object lockA = new Object();
Object lockB = new Object();

void method1() {
    synchronized (lockA) {
        synchronized (lockB) { /* work */ }
    }
}
void method2() {
    synchronized (lockA) {
        synchronized (lockB) { /* work */ }
    }
}`,
      hints: ['Deadlock occurs when two threads lock in opposite order.', 'Always acquire locks in the same order.', 'Both methods should lock A first, then B.'],
      concepts: ['deadlock', 'lock ordering', 'prevention'],
    },
    {
      id: 'java-thr-16',
      title: 'Predict thread interleaving',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict what is guaranteed about the output.',
      skeleton: `Thread t = new Thread(() -> System.out.println("A"));
t.start();
t.join();
System.out.println("B");`,
      solution: `A
B`,
      hints: ['join() blocks until thread t finishes.', '"A" is printed by thread t.', '"B" is guaranteed to print after "A" due to join().'],
      concepts: ['Thread.join', 'happens-before', 'ordering'],
    },
    {
      id: 'java-thr-17',
      title: 'Predict synchronized behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the final count after synchronized increments.',
      skeleton: `Counter c = new Counter(); // synchronized increment()
Thread t1 = new Thread(() -> { for (int i = 0; i < 1000; i++) c.increment(); });
Thread t2 = new Thread(() -> { for (int i = 0; i < 1000; i++) c.increment(); });
t1.start(); t2.start();
t1.join(); t2.join();
System.out.println(c.getCount());`,
      solution: `2000`,
      hints: ['synchronized ensures atomicity.', 'No increments are lost.', 'Both threads contribute 1000 each.'],
      concepts: ['synchronized', 'atomicity', 'correct count'],
    },
    {
      id: 'java-thr-18',
      title: 'Predict volatile visibility',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict whether a non-volatile flag change is visible.',
      skeleton: `// Without volatile, the change may never be seen
// boolean running = true; // not volatile
// Thread: while (running) { /* spin */ }
// Main: running = false;
// Question: Will the thread always stop?
System.out.println("Not guaranteed without volatile");`,
      solution: `Not guaranteed without volatile`,
      hints: ['Without volatile, the thread may cache the value.', 'The JIT compiler may optimize the loop.', 'volatile ensures cross-thread visibility.'],
      concepts: ['volatile', 'visibility', 'caching'],
    },
    {
      id: 'java-thr-19',
      title: 'Refactor to Runnable lambda',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Refactor this Thread subclass to use a Runnable lambda.',
      skeleton: `class PrintTask extends Thread {
    private final String message;
    PrintTask(String message) { this.message = message; }
    @Override
    public void run() { System.out.println(message); }
}
new PrintTask("Hello").start();`,
      solution: `String message = "Hello";
new Thread(() -> System.out.println(message)).start();`,
      hints: ['Prefer Runnable over extending Thread.', 'Lambdas make simple Runnables concise.', 'No need for a separate class.'],
      concepts: ['Runnable lambda', 'composition over inheritance', 'refactoring'],
    },
    {
      id: 'java-thr-20',
      title: 'Refactor synchronized to AtomicInteger',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this synchronized counter to use AtomicInteger.',
      skeleton: `class Counter {
    private int count = 0;
    public synchronized void increment() { count++; }
    public synchronized void decrement() { count--; }
    public synchronized int get() { return count; }
}`,
      solution: `class Counter {
    private final java.util.concurrent.atomic.AtomicInteger count = new java.util.concurrent.atomic.AtomicInteger(0);
    public void increment() { count.incrementAndGet(); }
    public void decrement() { count.decrementAndGet(); }
    public int get() { return count.get(); }
}`,
      hints: ['AtomicInteger is lock-free and often faster.', 'Remove synchronized keywords.', 'Use incrementAndGet and decrementAndGet.'],
      concepts: ['AtomicInteger', 'lock-free', 'refactoring'],
    },
  ],
};
