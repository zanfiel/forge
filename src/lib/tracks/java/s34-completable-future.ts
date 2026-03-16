import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-completable-future',
  title: '34. CompletableFuture',
  explanation: `## CompletableFuture

CompletableFuture provides a powerful API for asynchronous programming with composition.

### Creating
\`\`\`java
CompletableFuture.supplyAsync(() -> computeValue())
CompletableFuture.runAsync(() -> doWork())
CompletableFuture.completedFuture(value)
\`\`\`

### Chaining (non-blocking)
\`\`\`java
future
    .thenApply(v -> transform(v))     // map
    .thenAccept(v -> consume(v))      // forEach
    .thenRun(() -> cleanup())         // side effect
    .thenCompose(v -> asyncOp(v))     // flatMap
\`\`\`

### Combining
\`\`\`java
future1.thenCombine(future2, (a, b) -> a + b)
CompletableFuture.allOf(f1, f2, f3)
CompletableFuture.anyOf(f1, f2, f3)
\`\`\`

### Error Handling
\`\`\`java
future.exceptionally(ex -> fallback)
future.handle((result, ex) -> { ... })
future.whenComplete((result, ex) -> { ... })
\`\`\`

### Timeouts (Java 9+)
\`\`\`java
future.orTimeout(5, TimeUnit.SECONDS)
future.completeOnTimeout(defaultVal, 5, TimeUnit.SECONDS)
\`\`\`
`,
  exercises: [
    {
      id: 'java-cf-1',
      title: 'Create async computation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create an async computation that returns a value.',
      skeleton: `CompletableFuture<String> future = CompletableFuture.__BLANK__(() -> fetchData());`,
      solution: `CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> fetchData());`,
      hints: ['This factory method takes a Supplier.', 'It runs asynchronously on the common pool.', 'Use `supplyAsync`.'],
      concepts: ['supplyAsync', 'Supplier', 'async computation'],
    },
    {
      id: 'java-cf-2',
      title: 'Transform result',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Transform the result of a CompletableFuture.',
      skeleton: `CompletableFuture<Integer> lengths = future.__BLANK__(String::length);`,
      solution: `CompletableFuture<Integer> lengths = future.thenApply(String::length);`,
      hints: ['Like map for Optional/Stream.', 'Transforms the value when ready.', 'Use `thenApply`.'],
      concepts: ['thenApply', 'transformation', 'chaining'],
    },
    {
      id: 'java-cf-3',
      title: 'Consume result',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Consume the result without returning a new value.',
      skeleton: `future.__BLANK__(result -> System.out.println(result));`,
      solution: `future.thenAccept(result -> System.out.println(result));`,
      hints: ['Like forEach for streams.', 'Takes a Consumer, returns CompletableFuture<Void>.', 'Use `thenAccept`.'],
      concepts: ['thenAccept', 'Consumer', 'side effect'],
    },
    {
      id: 'java-cf-4',
      title: 'Chain async operations',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Chain an async operation that returns another CompletableFuture.',
      skeleton: `CompletableFuture<Order> order = userId
    .__BLANK__(id -> fetchOrderAsync(id));`,
      solution: `CompletableFuture<Order> order = userId
    .thenCompose(id -> fetchOrderAsync(id));`,
      hints: ['Like flatMap for Optional/Stream.', 'The function returns a CompletableFuture.', 'Use `thenCompose`.'],
      concepts: ['thenCompose', 'flatMap', 'async chaining'],
    },
    {
      id: 'java-cf-5',
      title: 'Handle errors',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Provide a fallback value on error.',
      skeleton: `CompletableFuture<String> safe = future.__BLANK__(ex -> "default");`,
      solution: `CompletableFuture<String> safe = future.exceptionally(ex -> "default");`,
      hints: ['This method catches exceptions.', 'It takes a function from Throwable to the result type.', 'Use `exceptionally`.'],
      concepts: ['exceptionally', 'error handling', 'fallback'],
    },
    {
      id: 'java-cf-6',
      title: 'Combine two futures',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Combine results of two independent futures.',
      skeleton: `CompletableFuture<String> combined = nameF.__BLANK__(ageF, (name, age) -> name + " is " + age);`,
      solution: `CompletableFuture<String> combined = nameF.thenCombine(ageF, (name, age) -> name + " is " + age);`,
      hints: ['This method takes another future and a BiFunction.', 'Both futures run in parallel.', 'Use `thenCombine`.'],
      concepts: ['thenCombine', 'parallel futures', 'BiFunction'],
    },
    {
      id: 'java-cf-7',
      title: 'Async HTTP-style pipeline',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write an async pipeline: fetch user -> fetch orders -> calculate total.',
      skeleton: '',
      solution: `static CompletableFuture<Double> getUserOrderTotal(long userId) {
    return CompletableFuture.supplyAsync(() -> fetchUser(userId))
        .thenCompose(user -> CompletableFuture.supplyAsync(() -> fetchOrders(user)))
        .thenApply(orders -> orders.stream()
            .mapToDouble(Order::getAmount)
            .sum())
        .exceptionally(ex -> {
            System.err.println("Error: " + ex.getMessage());
            return 0.0;
        });
}`,
      hints: ['Chain supplyAsync with thenCompose for dependent async ops.', 'thenApply for synchronous transformation.', 'exceptionally for error handling.'],
      concepts: ['async pipeline', 'thenCompose', 'error handling'],
    },
    {
      id: 'java-cf-8',
      title: 'Wait for all futures',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that runs multiple async tasks and waits for all to complete, collecting results.',
      skeleton: '',
      solution: `static <T> CompletableFuture<List<T>> allOf(List<CompletableFuture<T>> futures) {
    CompletableFuture<Void> allDone = CompletableFuture.allOf(
        futures.toArray(new CompletableFuture[0])
    );
    return allDone.thenApply(v ->
        futures.stream()
            .map(CompletableFuture::join)
            .toList()
    );
}`,
      hints: ['CompletableFuture.allOf waits for all but returns Void.', 'After allOf completes, use join() on each future to get results.', 'join() won\'t block since all futures are already complete.'],
      concepts: ['allOf', 'join', 'collecting results'],
    },
    {
      id: 'java-cf-9',
      title: 'First to complete wins',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that returns the first CompletableFuture to complete successfully.',
      skeleton: '',
      solution: `@SuppressWarnings("unchecked")
static <T> CompletableFuture<T> firstSuccess(List<CompletableFuture<T>> futures) {
    CompletableFuture<T> result = new CompletableFuture<>();
    for (CompletableFuture<T> f : futures) {
        f.thenAccept(result::complete);
    }
    CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
        .exceptionally(ex -> { result.completeExceptionally(ex); return null; });
    return result;
}`,
      hints: ['Create a new CompletableFuture and complete it from the first to finish.', 'result.complete only succeeds on the first call.', 'Handle the case where all fail.'],
      concepts: ['race', 'complete', 'first success'],
    },
    {
      id: 'java-cf-10',
      title: 'Timeout with default',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that returns a default value if a CompletableFuture does not complete within a timeout.',
      skeleton: '',
      solution: `static <T> CompletableFuture<T> withTimeout(CompletableFuture<T> future, T defaultValue, long timeoutMs) {
    return future.completeOnTimeout(defaultValue, timeoutMs, TimeUnit.MILLISECONDS);
}`,
      hints: ['Java 9 added completeOnTimeout.', 'It completes with the default if not done in time.', 'Returns the same CompletableFuture.'],
      concepts: ['completeOnTimeout', 'timeout', 'default value'],
    },
    {
      id: 'java-cf-11',
      title: 'Retry async operation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that retries an async Supplier up to maxRetries times on failure.',
      skeleton: '',
      solution: `static <T> CompletableFuture<T> retry(Supplier<CompletableFuture<T>> supplier, int maxRetries) {
    CompletableFuture<T> future = supplier.get();
    for (int i = 0; i < maxRetries; i++) {
        future = future.exceptionallyCompose(ex -> supplier.get());
    }
    return future;
}`,
      hints: ['exceptionallyCompose chains a new async operation on failure.', 'Loop to chain multiple retry attempts.', 'Each failure triggers a new attempt.'],
      concepts: ['exceptionallyCompose', 'retry pattern', 'error recovery'],
    },
    {
      id: 'java-cf-12',
      title: 'Handle with result and error',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that converts a CompletableFuture into a Result type containing either the value or the error.',
      skeleton: '',
      solution: `record Result<T>(T value, Throwable error) {
    boolean isSuccess() { return error == null; }
}

static <T> CompletableFuture<Result<T>> toResult(CompletableFuture<T> future) {
    return future.handle((value, error) -> new Result<>(value, error));
}`,
      hints: ['handle() receives both the result and exception.', 'Exactly one of them is non-null.', 'Wrap both in a Result object.'],
      concepts: ['handle', 'Result type', 'error handling'],
    },
    {
      id: 'java-cf-13',
      title: 'Missing exceptionally handler',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the CompletableFuture chain that silently drops exceptions.',
      skeleton: `CompletableFuture.supplyAsync(() -> {
    throw new RuntimeException("boom");
}).thenApply(v -> v.toString());
// Exception is silently swallowed`,
      solution: `CompletableFuture.supplyAsync(() -> {
    if (true) throw new RuntimeException("boom");
    return "";
}).thenApply(v -> v.toString())
.exceptionally(ex -> {
    System.err.println("Error: " + ex.getMessage());
    return "fallback";
});`,
      hints: ['Exceptions in async chains are not thrown unless observed.', 'Add exceptionally to handle errors.', 'Always have error handling at the end of the chain.'],
      concepts: ['exceptionally', 'error propagation', 'silent failures'],
    },
    {
      id: 'java-cf-14',
      title: 'Blocking the common pool',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Fix the blocking I/O that starves the common ForkJoinPool.',
      skeleton: `CompletableFuture.supplyAsync(() -> {
    return blockingHttpCall(); // blocks a common pool thread
});`,
      solution: `ExecutorService ioPool = Executors.newCachedThreadPool();
CompletableFuture.supplyAsync(() -> {
    return blockingHttpCall();
}, ioPool);`,
      hints: ['supplyAsync uses the common ForkJoinPool by default.', 'Blocking I/O can starve the pool.', 'Provide a dedicated executor for I/O tasks.'],
      concepts: ['custom executor', 'ForkJoinPool starvation', 'I/O threads'],
    },
    {
      id: 'java-cf-15',
      title: 'thenApply vs thenCompose confusion',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the nested CompletableFuture caused by using thenApply instead of thenCompose.',
      skeleton: `// Returns CompletableFuture<CompletableFuture<Order>> instead of CompletableFuture<Order>
CompletableFuture<CompletableFuture<Order>> nested = userFuture
    .thenApply(user -> fetchOrderAsync(user));`,
      solution: `CompletableFuture<Order> flat = userFuture
    .thenCompose(user -> fetchOrderAsync(user));`,
      hints: ['thenApply wraps the result, thenCompose flattens it.', 'When the function returns a CompletableFuture, use thenCompose.', 'This is like flatMap vs map.'],
      concepts: ['thenCompose vs thenApply', 'flatMap', 'nesting'],
    },
    {
      id: 'java-cf-16',
      title: 'Predict thenApply chain',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output of a simple chain.',
      skeleton: `String result = CompletableFuture.completedFuture("hello")
    .thenApply(String::toUpperCase)
    .thenApply(s -> s + "!")
    .join();
System.out.println(result);`,
      solution: `HELLO!`,
      hints: ['completedFuture starts with "hello".', 'toUpperCase produces "HELLO".', 'Concatenation produces "HELLO!".'],
      concepts: ['thenApply', 'completedFuture', 'chaining'],
    },
    {
      id: 'java-cf-17',
      title: 'Predict exceptionally',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output when an exception is handled.',
      skeleton: `String result = CompletableFuture.supplyAsync(() -> {
    if (true) throw new RuntimeException("oops");
    return "ok";
}).exceptionally(ex -> "recovered").join();
System.out.println(result);`,
      solution: `recovered`,
      hints: ['The supplier throws an exception.', 'exceptionally catches it and provides a fallback.', 'The chain continues with "recovered".'],
      concepts: ['exceptionally', 'error recovery', 'fallback'],
    },
    {
      id: 'java-cf-18',
      title: 'Predict thenCombine',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the result of combining two futures.',
      skeleton: `CompletableFuture<String> f1 = CompletableFuture.completedFuture("Hello");
CompletableFuture<String> f2 = CompletableFuture.completedFuture("World");
String result = f1.thenCombine(f2, (a, b) -> a + " " + b).join();
System.out.println(result);`,
      solution: `Hello World`,
      hints: ['thenCombine waits for both futures.', 'The BiFunction combines "Hello" and "World".', 'Result is "Hello World".'],
      concepts: ['thenCombine', 'parallel combination', 'BiFunction'],
    },
    {
      id: 'java-cf-19',
      title: 'Refactor callback to CompletableFuture',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this nested callback pattern to CompletableFuture chain.',
      skeleton: `fetchUser(id, user -> {
    fetchOrders(user, orders -> {
        calculateTotal(orders, total -> {
            System.out.println("Total: " + total);
        });
    });
});`,
      solution: `CompletableFuture.supplyAsync(() -> fetchUserSync(id))
    .thenCompose(user -> CompletableFuture.supplyAsync(() -> fetchOrdersSync(user)))
    .thenApply(orders -> calculateTotalSync(orders))
    .thenAccept(total -> System.out.println("Total: " + total));`,
      hints: ['Replace nested callbacks with a flat chain.', 'Each level becomes a thenCompose or thenApply.', 'The final action uses thenAccept.'],
      concepts: ['callback hell', 'async chain', 'refactoring'],
    },
    {
      id: 'java-cf-20',
      title: 'Refactor blocking to async',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this blocking sequential code to non-blocking parallel execution.',
      skeleton: `String userName = fetchUser(id);         // blocks 200ms
List<Order> orders = fetchOrders(id);    // blocks 300ms (independent)
int loyalty = fetchLoyalty(id);          // blocks 100ms (independent)
// Total: 600ms sequential`,
      solution: `CompletableFuture<String> userF = CompletableFuture.supplyAsync(() -> fetchUser(id));
CompletableFuture<List<Order>> ordersF = CompletableFuture.supplyAsync(() -> fetchOrders(id));
CompletableFuture<Integer> loyaltyF = CompletableFuture.supplyAsync(() -> fetchLoyalty(id));

CompletableFuture.allOf(userF, ordersF, loyaltyF).join();
String userName = userF.join();
List<Order> orders = ordersF.join();
int loyalty = loyaltyF.join();
// Total: ~300ms parallel`,
      hints: ['Independent operations can run in parallel.', 'Launch all with supplyAsync.', 'Wait for all with allOf, then extract results.'],
      concepts: ['parallel execution', 'allOf', 'non-blocking'],
    },
  ],
};
