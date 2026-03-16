import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-concurrency-executors',
  title: '31. Concurrency: Executors',
  explanation: `## Concurrency: Executors

The Executor framework provides higher-level thread management than raw Thread objects.

### ExecutorService
\`\`\`java
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -> doWork());
pool.shutdown();
\`\`\`

### Thread Pool Types
- \`newFixedThreadPool(n)\` - fixed number of threads
- \`newCachedThreadPool()\` - grows/shrinks as needed
- \`newSingleThreadExecutor()\` - single thread, ordered tasks
- \`newScheduledThreadPool(n)\` - scheduled/periodic tasks

### Future
\`\`\`java
Future<String> future = pool.submit(() -> compute());
String result = future.get(); // blocks until complete
String result = future.get(5, TimeUnit.SECONDS); // with timeout
\`\`\`

### invokeAll & invokeAny
\`\`\`java
List<Future<T>> results = pool.invokeAll(callables);
T fastest = pool.invokeAny(callables); // returns first to complete
\`\`\`

### Shutdown
\`\`\`java
pool.shutdown();              // no new tasks, finish pending
pool.shutdownNow();           // cancel running tasks
pool.awaitTermination(10, TimeUnit.SECONDS);
\`\`\`
`,
  exercises: [
    {
      id: 'java-exec-1',
      title: 'Create a fixed thread pool',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a fixed thread pool with 4 threads.',
      skeleton: `ExecutorService pool = Executors.__BLANK__(4);`,
      solution: `ExecutorService pool = Executors.newFixedThreadPool(4);`,
      hints: ['Executors has factory methods for thread pools.', 'Fixed pools have a set number of threads.', 'Use `newFixedThreadPool`.'],
      concepts: ['newFixedThreadPool', 'ExecutorService', 'thread pool'],
    },
    {
      id: 'java-exec-2',
      title: 'Submit a task',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Submit a Callable that returns a result.',
      skeleton: `Future<String> future = pool.__BLANK__(() -> "Hello");`,
      solution: `Future<String> future = pool.submit(() -> "Hello");`,
      hints: ['Submit sends a task to the pool.', 'It returns a Future for the result.', 'Use `submit`.'],
      concepts: ['submit', 'Future', 'Callable'],
    },
    {
      id: 'java-exec-3',
      title: 'Get Future result',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Block and get the result from a Future.',
      skeleton: `String result = future.__BLANK__();`,
      solution: `String result = future.get();`,
      hints: ['This method blocks until the result is available.', 'It may throw ExecutionException.', 'Use `get`.'],
      concepts: ['Future.get', 'blocking', 'result retrieval'],
    },
    {
      id: 'java-exec-4',
      title: 'Get with timeout',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Get a Future result with a 5-second timeout.',
      skeleton: `String result = future.get(5, __BLANK__.SECONDS);`,
      solution: `String result = future.get(5, TimeUnit.SECONDS);`,
      hints: ['Timeouts use a TimeUnit enum.', 'It prevents blocking forever.', 'Use `TimeUnit`.'],
      concepts: ['timeout', 'TimeUnit', 'Future.get'],
    },
    {
      id: 'java-exec-5',
      title: 'Shutdown executor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Gracefully shut down an ExecutorService.',
      skeleton: `pool.__BLANK__();`,
      solution: `pool.shutdown();`,
      hints: ['This prevents new tasks and lets pending finish.', 'Does not cancel running tasks.', 'Use `shutdown`.'],
      concepts: ['shutdown', 'graceful termination', 'ExecutorService'],
    },
    {
      id: 'java-exec-6',
      title: 'Scheduled executor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Schedule a task to run after a 2-second delay.',
      skeleton: `ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
scheduler.__BLANK__(task, 2, TimeUnit.SECONDS);`,
      solution: `ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
scheduler.schedule(task, 2, TimeUnit.SECONDS);`,
      hints: ['ScheduledExecutorService has delay methods.', 'Specify the delay and time unit.', 'Use `schedule`.'],
      concepts: ['schedule', 'delay', 'ScheduledExecutorService'],
    },
    {
      id: 'java-exec-7',
      title: 'Parallel task execution',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that executes a list of Callables in parallel and returns all results.',
      skeleton: '',
      solution: `static <T> List<T> executeAll(List<Callable<T>> tasks) throws Exception {
    ExecutorService pool = Executors.newFixedThreadPool(tasks.size());
    try {
        List<Future<T>> futures = pool.invokeAll(tasks);
        List<T> results = new ArrayList<>();
        for (Future<T> f : futures) {
            results.add(f.get());
        }
        return results;
    } finally {
        pool.shutdown();
    }
}`,
      hints: ['Use invokeAll to submit all tasks at once.', 'Iterate over futures to collect results.', 'Always shutdown the pool in a finally block.'],
      concepts: ['invokeAll', 'parallel execution', 'Future'],
    },
    {
      id: 'java-exec-8',
      title: 'Timeout with fallback',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that runs a Callable with a timeout, returning a default value if it times out.',
      skeleton: '',
      solution: `static <T> T withTimeout(Callable<T> task, long timeoutMs, T defaultValue) {
    ExecutorService pool = Executors.newSingleThreadExecutor();
    try {
        Future<T> future = pool.submit(task);
        return future.get(timeoutMs, TimeUnit.MILLISECONDS);
    } catch (TimeoutException e) {
        return defaultValue;
    } catch (Exception e) {
        throw new RuntimeException(e);
    } finally {
        pool.shutdownNow();
    }
}`,
      hints: ['Submit the task and call get with a timeout.', 'Catch TimeoutException for the fallback.', 'Use shutdownNow to cancel on timeout.'],
      concepts: ['timeout', 'fallback', 'TimeoutException'],
    },
    {
      id: 'java-exec-9',
      title: 'Periodic task scheduling',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that runs a task every 5 seconds using ScheduledExecutorService.',
      skeleton: '',
      solution: `static ScheduledFuture<?> runPeriodically(Runnable task) {
    ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    return scheduler.scheduleAtFixedRate(task, 0, 5, TimeUnit.SECONDS);
}`,
      hints: ['Use scheduleAtFixedRate for periodic execution.', 'First arg is initial delay, second is period.', 'Returns a ScheduledFuture for cancellation.'],
      concepts: ['scheduleAtFixedRate', 'periodic task', 'ScheduledExecutorService'],
    },
    {
      id: 'java-exec-10',
      title: 'Race first result',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that submits multiple Callables and returns the first result using invokeAny.',
      skeleton: '',
      solution: `static <T> T raceForFirst(List<Callable<T>> tasks) throws Exception {
    ExecutorService pool = Executors.newFixedThreadPool(tasks.size());
    try {
        return pool.invokeAny(tasks);
    } finally {
        pool.shutdown();
    }
}`,
      hints: ['invokeAny returns the result of the first task to complete.', 'Other tasks are cancelled.', 'Always shutdown the pool.'],
      concepts: ['invokeAny', 'race condition', 'first result'],
    },
    {
      id: 'java-exec-11',
      title: 'Proper shutdown pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that properly shuts down an ExecutorService with a timeout fallback.',
      skeleton: '',
      solution: `static void shutdownGracefully(ExecutorService pool, long timeoutSeconds) {
    pool.shutdown();
    try {
        if (!pool.awaitTermination(timeoutSeconds, TimeUnit.SECONDS)) {
            pool.shutdownNow();
            if (!pool.awaitTermination(timeoutSeconds, TimeUnit.SECONDS)) {
                System.err.println("Pool did not terminate");
            }
        }
    } catch (InterruptedException e) {
        pool.shutdownNow();
        Thread.currentThread().interrupt();
    }
}`,
      hints: ['Call shutdown first, then awaitTermination.', 'If timeout expires, escalate to shutdownNow.', 'Handle InterruptedException by re-interrupting.'],
      concepts: ['graceful shutdown', 'awaitTermination', 'shutdownNow'],
    },
    {
      id: 'java-exec-12',
      title: 'Batch processing with pool',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that processes items in parallel batches using a fixed thread pool.',
      skeleton: '',
      solution: `static <T, R> List<R> processBatch(List<T> items, java.util.function.Function<T, R> processor, int threads) throws Exception {
    ExecutorService pool = Executors.newFixedThreadPool(threads);
    try {
        List<Callable<R>> tasks = items.stream()
            .map(item -> (Callable<R>) () -> processor.apply(item))
            .toList();
        List<Future<R>> futures = pool.invokeAll(tasks);
        List<R> results = new ArrayList<>();
        for (Future<R> f : futures) {
            results.add(f.get());
        }
        return results;
    } finally {
        pool.shutdown();
    }
}`,
      hints: ['Convert each item to a Callable.', 'Use invokeAll to process all tasks.', 'Collect results from futures in order.'],
      concepts: ['batch processing', 'Callable', 'invokeAll'],
    },
    {
      id: 'java-exec-13',
      title: 'Executor not shut down',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the resource leak where the executor is never shut down.',
      skeleton: `void process() throws Exception {
    ExecutorService pool = Executors.newFixedThreadPool(4);
    Future<String> result = pool.submit(() -> compute());
    System.out.println(result.get());
    // JVM hangs because pool is never shut down
}`,
      solution: `void process() throws Exception {
    ExecutorService pool = Executors.newFixedThreadPool(4);
    try {
        Future<String> result = pool.submit(() -> compute());
        System.out.println(result.get());
    } finally {
        pool.shutdown();
    }
}`,
      hints: ['ExecutorService threads keep the JVM alive.', 'Always shut down in a finally block.', 'Use try-finally to ensure shutdown.'],
      concepts: ['resource leak', 'shutdown', 'finally'],
    },
    {
      id: 'java-exec-14',
      title: 'ExecutionException unwrap',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the error handling that catches the wrong exception type.',
      skeleton: `try {
    String result = future.get();
} catch (RuntimeException e) {
    // This never catches task exceptions!
    handleError(e);
}`,
      solution: `try {
    String result = future.get();
} catch (ExecutionException e) {
    handleError(e.getCause());
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
}`,
      hints: ['Future.get wraps exceptions in ExecutionException.', 'The actual exception is the cause.', 'Also handle InterruptedException.'],
      concepts: ['ExecutionException', 'getCause', 'exception unwrapping'],
    },
    {
      id: 'java-exec-15',
      title: 'CachedThreadPool unbounded growth',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Fix the unbounded thread creation that causes resource exhaustion.',
      skeleton: `ExecutorService pool = Executors.newCachedThreadPool();
for (int i = 0; i < 10000; i++) {
    pool.submit(longRunningTask); // Creates 10000 threads!
}`,
      solution: `ExecutorService pool = Executors.newFixedThreadPool(
    Runtime.getRuntime().availableProcessors()
);
for (int i = 0; i < 10000; i++) {
    pool.submit(longRunningTask);
}
pool.shutdown();`,
      hints: ['CachedThreadPool creates threads without limit.', 'Use a fixed pool to bound thread count.', 'Size based on available processors.'],
      concepts: ['thread pool sizing', 'resource exhaustion', 'newFixedThreadPool'],
    },
    {
      id: 'java-exec-16',
      title: 'Predict Future.get blocking',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the order of prints with Future.get.',
      skeleton: `ExecutorService pool = Executors.newSingleThreadExecutor();
Future<String> f = pool.submit(() -> {
    Thread.sleep(100);
    return "done";
});
System.out.println("submitted");
System.out.println(f.get());
System.out.println("after");
pool.shutdown();`,
      solution: `submitted
done
after`,
      hints: ['"submitted" prints immediately.', 'f.get() blocks until the task completes.', '"after" prints last.'],
      concepts: ['Future.get', 'blocking', 'execution order'],
    },
    {
      id: 'java-exec-17',
      title: 'Predict isDone behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the isDone status before and after get.',
      skeleton: `ExecutorService pool = Executors.newSingleThreadExecutor();
Future<Integer> f = pool.submit(() -> 42);
f.get(); // wait for completion
System.out.println(f.isDone());
System.out.println(f.isCancelled());
pool.shutdown();`,
      solution: `true
false`,
      hints: ['After get() returns, the task is done.', 'isDone returns true when complete.', 'isCancelled is false because it was not cancelled.'],
      concepts: ['isDone', 'isCancelled', 'Future state'],
    },
    {
      id: 'java-exec-18',
      title: 'Predict invokeAll ordering',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict whether invokeAll preserves task order in results.',
      skeleton: `ExecutorService pool = Executors.newFixedThreadPool(3);
List<Callable<Integer>> tasks = List.of(
    () -> { Thread.sleep(300); return 3; },
    () -> { Thread.sleep(100); return 1; },
    () -> { Thread.sleep(200); return 2; }
);
List<Future<Integer>> results = pool.invokeAll(tasks);
for (Future<Integer> f : results) System.out.println(f.get());
pool.shutdown();`,
      solution: `3
1
2`,
      hints: ['invokeAll preserves the order of the input list.', 'Results are in task submission order, not completion order.', 'Even though task 2 finishes first, result 1 comes first.'],
      concepts: ['invokeAll ordering', 'Future list', 'submission order'],
    },
    {
      id: 'java-exec-19',
      title: 'Refactor raw threads to executor',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this raw thread management to use ExecutorService.',
      skeleton: `List<Thread> threads = new ArrayList<>();
for (int i = 0; i < 10; i++) {
    Thread t = new Thread(task);
    threads.add(t);
    t.start();
}
for (Thread t : threads) {
    t.join();
}`,
      solution: `ExecutorService pool = Executors.newFixedThreadPool(10);
for (int i = 0; i < 10; i++) {
    pool.submit(task);
}
pool.shutdown();
pool.awaitTermination(Long.MAX_VALUE, TimeUnit.NANOSECONDS);`,
      hints: ['ExecutorService manages thread lifecycle.', 'submit replaces manual start.', 'awaitTermination replaces join loops.'],
      concepts: ['ExecutorService', 'thread pool', 'refactoring'],
    },
    {
      id: 'java-exec-20',
      title: 'Refactor to try-with-resources executor',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this executor usage to use try-with-resources (Java 19+).',
      skeleton: `ExecutorService pool = Executors.newFixedThreadPool(4);
try {
    List<Future<String>> futures = new ArrayList<>();
    for (String item : items) {
        futures.add(pool.submit(() -> process(item)));
    }
    for (Future<String> f : futures) {
        results.add(f.get());
    }
} finally {
    pool.shutdown();
}`,
      solution: `try (var pool = Executors.newFixedThreadPool(4)) {
    List<Future<String>> futures = new ArrayList<>();
    for (String item : items) {
        futures.add(pool.submit(() -> process(item)));
    }
    for (Future<String> f : futures) {
        results.add(f.get());
    }
}`,
      hints: ['Java 19+ ExecutorService implements AutoCloseable.', 'close() calls shutdown and awaitTermination.', 'Use try-with-resources for automatic cleanup.'],
      concepts: ['AutoCloseable executor', 'try-with-resources', 'Java 19+'],
    },
  ],
};
