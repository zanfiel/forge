import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-virtual-threads',
  title: '35. Virtual Threads',
  explanation: `## Virtual Threads (Java 21)

Virtual threads are lightweight threads managed by the JVM rather than the OS.

### Creating Virtual Threads
\`\`\`java
Thread vt = Thread.ofVirtual().start(() -> doWork());
Thread.startVirtualThread(() -> doWork());
\`\`\`

### Thread.Builder
\`\`\`java
Thread.Builder builder = Thread.ofVirtual().name("worker-", 0);
Thread t = builder.start(task);
\`\`\`

### Virtual Thread Executor
\`\`\`java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(task1);
    executor.submit(task2);
}
\`\`\`

### Key Properties
- Extremely lightweight (millions possible)
- Managed by JVM, scheduled on carrier threads
- Ideal for I/O-bound workloads
- DO NOT pool virtual threads
- Avoid pinning (synchronized blocks during I/O)

### Structured Concurrency (Preview)
\`\`\`java
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Subtask<String> user = scope.fork(() -> fetchUser());
    Subtask<Order> order = scope.fork(() -> fetchOrder());
    scope.join().throwIfFailed();
    return new Response(user.get(), order.get());
}
\`\`\`
`,
  exercises: [
    {
      id: 'java-vt-1',
      title: 'Start a virtual thread',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Start a virtual thread that prints a message.',
      skeleton: `Thread.startVirtualThread(() -> System.out.println("Hello from __BLANK__"));`,
      solution: `Thread.startVirtualThread(() -> System.out.println("Hello from virtual thread"));`,
      hints: ['startVirtualThread is a convenience method.', 'It creates and starts immediately.', 'Use `virtual thread`.'],
      concepts: ['startVirtualThread', 'virtual thread', 'lightweight'],
    },
    {
      id: 'java-vt-2',
      title: 'Virtual thread builder',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a virtual thread using the builder API.',
      skeleton: `Thread t = Thread.__BLANK__().name("worker").start(() -> doWork());`,
      solution: `Thread t = Thread.ofVirtual().name("worker").start(() -> doWork());`,
      hints: ['Thread has factory methods for virtual and platform.', 'Use the virtual thread factory.', 'Use `ofVirtual`.'],
      concepts: ['Thread.ofVirtual', 'builder API', 'named thread'],
    },
    {
      id: 'java-vt-3',
      title: 'Virtual thread executor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Create an executor that uses a new virtual thread per task.',
      skeleton: `ExecutorService exec = Executors.__BLANK__();`,
      solution: `ExecutorService exec = Executors.newVirtualThreadPerTaskExecutor();`,
      hints: ['This executor creates a virtual thread for every submitted task.', 'No pooling is needed for virtual threads.', 'Use `newVirtualThreadPerTaskExecutor`.'],
      concepts: ['newVirtualThreadPerTaskExecutor', 'virtual threads', 'executor'],
    },
    {
      id: 'java-vt-4',
      title: 'Check if virtual',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Check if the current thread is a virtual thread.',
      skeleton: `boolean isVirtual = Thread.currentThread().__BLANK__();`,
      solution: `boolean isVirtual = Thread.currentThread().isVirtual();`,
      hints: ['Thread has a method to check its type.', 'Returns true for virtual threads.', 'Use `isVirtual`.'],
      concepts: ['isVirtual', 'thread type', 'virtual thread'],
    },
    {
      id: 'java-vt-5',
      title: 'Virtual thread with join',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Start a virtual thread and wait for it to complete.',
      skeleton: `Thread vt = Thread.ofVirtual().start(() -> compute());
vt.__BLANK__();`,
      solution: `Thread vt = Thread.ofVirtual().start(() -> compute());
vt.join();`,
      hints: ['Virtual threads support the same join semantics.', 'join() blocks until the thread completes.', 'Use `join`.'],
      concepts: ['join', 'virtual thread', 'synchronization'],
    },
    {
      id: 'java-vt-6',
      title: 'Named virtual thread factory',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Create a factory for named virtual threads with sequential numbering.',
      skeleton: `ThreadFactory factory = Thread.ofVirtual().__BLANK__("handler-", 0).factory();`,
      solution: `ThreadFactory factory = Thread.ofVirtual().name("handler-", 0).factory();`,
      hints: ['The name method takes a prefix and a start number.', 'factory() returns a ThreadFactory.', 'Use `name`.'],
      concepts: ['ThreadFactory', 'named threads', 'virtual thread factory'],
    },
    {
      id: 'java-vt-7',
      title: 'Massive concurrent I/O',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that fetches 10000 URLs concurrently using virtual threads.',
      skeleton: '',
      solution: `static List<String> fetchAll(List<String> urls) throws Exception {
    try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
        List<Future<String>> futures = urls.stream()
            .map(url -> executor.submit(() -> fetch(url)))
            .toList();
        List<String> results = new ArrayList<>();
        for (Future<String> f : futures) {
            results.add(f.get());
        }
        return results;
    }
}`,
      hints: ['Use newVirtualThreadPerTaskExecutor for I/O-heavy tasks.', 'Submit all tasks and collect futures.', 'Each virtual thread handles one URL.'],
      concepts: ['virtual threads', 'massive concurrency', 'I/O bound'],
    },
    {
      id: 'java-vt-8',
      title: 'Parallel data processing',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that processes items in parallel using virtual threads and returns results in order.',
      skeleton: '',
      solution: `static <T, R> List<R> processParallel(List<T> items, java.util.function.Function<T, R> processor) throws Exception {
    try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
        List<Future<R>> futures = items.stream()
            .map(item -> executor.submit(() -> processor.apply(item)))
            .toList();
        List<R> results = new ArrayList<>();
        for (Future<R> f : futures) {
            results.add(f.get());
        }
        return results;
    }
}`,
      hints: ['Map each item to a submitted task.', 'Collect futures to preserve order.', 'Get results in submission order.'],
      concepts: ['virtual threads', 'parallel processing', 'order preservation'],
    },
    {
      id: 'java-vt-9',
      title: 'Scoped values with virtual threads',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write code demonstrating ScopedValue usage with virtual threads to pass context without ThreadLocal.',
      skeleton: '',
      solution: `static final ScopedValue<String> USER = ScopedValue.newInstance();

static void handleRequest(String userId) throws Exception {
    ScopedValue.runWhere(USER, userId, () -> {
        Thread.startVirtualThread(() -> {
            String currentUser = USER.get();
            System.out.println("Processing for: " + currentUser);
        }).join();
    });
}`,
      hints: ['ScopedValue replaces ThreadLocal for virtual threads.', 'Use ScopedValue.runWhere to bind a value.', 'The value is inherited by child virtual threads.'],
      concepts: ['ScopedValue', 'virtual threads', 'context propagation'],
    },
    {
      id: 'java-vt-10',
      title: 'Rate-limited virtual threads',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that uses a Semaphore to rate-limit virtual thread concurrency.',
      skeleton: '',
      solution: `static void rateLimitedFetch(List<String> urls, int maxConcurrent) throws Exception {
    Semaphore semaphore = new Semaphore(maxConcurrent);
    try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
        List<Future<?>> futures = new ArrayList<>();
        for (String url : urls) {
            futures.add(executor.submit(() -> {
                semaphore.acquire();
                try {
                    return fetch(url);
                } finally {
                    semaphore.release();
                }
            }));
        }
        for (Future<?> f : futures) f.get();
    }
}`,
      hints: ['Semaphore limits concurrent access.', 'Acquire before work, release in finally.', 'Virtual threads block efficiently on Semaphore.'],
      concepts: ['Semaphore', 'rate limiting', 'virtual threads'],
    },
    {
      id: 'java-vt-11',
      title: 'Virtual thread per connection server',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a simple server that handles each connection on a virtual thread.',
      skeleton: '',
      solution: `static void startServer(int port) throws Exception {
    try (var serverSocket = new java.net.ServerSocket(port);
         var executor = Executors.newVirtualThreadPerTaskExecutor()) {
        while (true) {
            var socket = serverSocket.accept();
            executor.submit(() -> {
                try (socket) {
                    handleConnection(socket);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return null;
            });
        }
    }
}`,
      hints: ['Accept connections in a loop.', 'Submit each connection to the virtual thread executor.', 'Each connection gets its own virtual thread.'],
      concepts: ['server socket', 'thread-per-request', 'virtual threads'],
    },
    {
      id: 'java-vt-12',
      title: 'Compare platform vs virtual threads',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write code that demonstrates creating 100,000 virtual threads (which would fail with platform threads).',
      skeleton: '',
      solution: `static void massiveVirtualThreads() throws Exception {
    long start = System.currentTimeMillis();
    List<Thread> threads = new ArrayList<>();
    for (int i = 0; i < 100_000; i++) {
        threads.add(Thread.startVirtualThread(() -> {
            try { Thread.sleep(1000); }
            catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        }));
    }
    for (Thread t : threads) t.join();
    long elapsed = System.currentTimeMillis() - start;
    System.out.println("100K virtual threads completed in " + elapsed + "ms");
}`,
      hints: ['Virtual threads are extremely lightweight.', '100K platform threads would exhaust OS resources.', 'Virtual threads sleep without consuming OS threads.'],
      concepts: ['scalability', 'virtual vs platform', 'lightweight threads'],
    },
    {
      id: 'java-vt-13',
      title: 'ThreadLocal with virtual threads',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the performance issue of using ThreadLocal with millions of virtual threads.',
      skeleton: `ThreadLocal<byte[]> buffer = ThreadLocal.withInitial(() -> new byte[1024 * 1024]);
// With 100K virtual threads, this allocates 100GB of memory!`,
      solution: `// Option 1: Use ScopedValue instead
static final ScopedValue<byte[]> BUFFER = ScopedValue.newInstance();

// Option 2: Use a shared pool of buffers
static final java.util.concurrent.ConcurrentLinkedQueue<byte[]> bufferPool = new java.util.concurrent.ConcurrentLinkedQueue<>();
static byte[] getBuffer() {
    byte[] buf = bufferPool.poll();
    return buf != null ? buf : new byte[1024 * 1024];
}
static void returnBuffer(byte[] buf) { bufferPool.offer(buf); }`,
      hints: ['ThreadLocal allocates per-thread, problematic with millions of virtual threads.', 'Use ScopedValue or a shared object pool instead.', 'Virtual threads should not hold large per-thread resources.'],
      concepts: ['ThreadLocal issue', 'ScopedValue', 'virtual thread best practices'],
    },
    {
      id: 'java-vt-14',
      title: 'Pinning from synchronized block',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Fix the virtual thread pinning caused by synchronized blocking I/O.',
      skeleton: `synchronized void readFromDb() throws Exception {
    // This pins the carrier thread, reducing scalability
    var result = dbConnection.query("SELECT ...");
    process(result);
}`,
      solution: `private final ReentrantLock lock = new ReentrantLock();

void readFromDb() throws Exception {
    lock.lock();
    try {
        var result = dbConnection.query("SELECT ...");
        process(result);
    } finally {
        lock.unlock();
    }
}`,
      hints: ['synchronized blocks pin virtual threads to carrier threads.', 'Use ReentrantLock instead; virtual threads can unmount during lock.lock().', 'This allows other virtual threads to use the carrier.'],
      concepts: ['pinning', 'ReentrantLock', 'carrier thread'],
    },
    {
      id: 'java-vt-15',
      title: 'Pooling virtual threads anti-pattern',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the anti-pattern of pooling virtual threads.',
      skeleton: `// Anti-pattern: pooling virtual threads defeats their purpose
ExecutorService pool = Executors.newFixedThreadPool(100,
    Thread.ofVirtual().factory());`,
      solution: `ExecutorService pool = Executors.newVirtualThreadPerTaskExecutor();`,
      hints: ['Virtual threads are cheap; pooling is unnecessary.', 'Use newVirtualThreadPerTaskExecutor instead.', 'Each task gets its own virtual thread.'],
      concepts: ['no pooling', 'virtual thread best practices', 'per-task executor'],
    },
    {
      id: 'java-vt-16',
      title: 'Predict virtual thread isVirtual',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output of isVirtual checks.',
      skeleton: `Thread vt = Thread.startVirtualThread(() -> {});
vt.join();
System.out.println(vt.isVirtual());
System.out.println(Thread.currentThread().isVirtual());`,
      solution: `true
false`,
      hints: ['vt is a virtual thread.', 'The main thread is a platform thread.', 'isVirtual differentiates them.'],
      concepts: ['isVirtual', 'platform vs virtual', 'thread type'],
    },
    {
      id: 'java-vt-17',
      title: 'Predict virtual thread name',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the name of a virtual thread created with a builder.',
      skeleton: `Thread t = Thread.ofVirtual().name("task-", 5).unstarted(() -> {});
System.out.println(t.getName());`,
      solution: `task-5`,
      hints: ['The name method takes a prefix and a start counter.', 'The first thread gets the start number.', 'Name is prefix + counter.'],
      concepts: ['thread naming', 'builder API', 'virtual thread'],
    },
    {
      id: 'java-vt-18',
      title: 'Predict executor behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict if virtual thread executor creates threads per task.',
      skeleton: `var threads = java.util.concurrent.ConcurrentHashMap.<Long>newKeySet();
try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 5; i++) {
        exec.submit(() -> threads.add(Thread.currentThread().threadId()));
    }
}
System.out.println(threads.size());`,
      solution: `5`,
      hints: ['newVirtualThreadPerTaskExecutor creates one thread per task.', 'Each task runs on a unique virtual thread.', '5 tasks = 5 unique thread IDs.'],
      concepts: ['per-task executor', 'unique threads', 'virtual thread'],
    },
    {
      id: 'java-vt-19',
      title: 'Refactor thread pool to virtual threads',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this fixed thread pool to use virtual threads.',
      skeleton: `ExecutorService pool = Executors.newFixedThreadPool(200);
try {
    for (Request req : requests) {
        pool.submit(() -> handleRequest(req));
    }
} finally {
    pool.shutdown();
    pool.awaitTermination(60, TimeUnit.SECONDS);
}`,
      solution: `try (var pool = Executors.newVirtualThreadPerTaskExecutor()) {
    for (Request req : requests) {
        pool.submit(() -> handleRequest(req));
    }
}`,
      hints: ['Replace newFixedThreadPool with newVirtualThreadPerTaskExecutor.', 'Use try-with-resources for automatic shutdown.', 'No need to guess pool size with virtual threads.'],
      concepts: ['virtual thread migration', 'executor refactoring', 'scalability'],
    },
    {
      id: 'java-vt-20',
      title: 'Refactor synchronized to ReentrantLock',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor synchronized methods to ReentrantLock to avoid virtual thread pinning.',
      skeleton: `class SharedResource {
    private final List<String> data = new ArrayList<>();

    synchronized void add(String item) {
        data.add(item);
    }

    synchronized List<String> getAll() {
        return new ArrayList<>(data);
    }
}`,
      solution: `class SharedResource {
    private final List<String> data = new ArrayList<>();
    private final ReentrantLock lock = new ReentrantLock();

    void add(String item) {
        lock.lock();
        try { data.add(item); }
        finally { lock.unlock(); }
    }

    List<String> getAll() {
        lock.lock();
        try { return new ArrayList<>(data); }
        finally { lock.unlock(); }
    }
}`,
      hints: ['synchronized pins virtual threads to carrier threads.', 'ReentrantLock allows virtual threads to unmount.', 'Replace synchronized with lock/try/finally/unlock.'],
      concepts: ['pinning prevention', 'ReentrantLock', 'virtual thread compatibility'],
    },
  ],
};
