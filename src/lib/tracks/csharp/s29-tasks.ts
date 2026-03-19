import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-tasks',
  title: '29. Tasks & Parallelism',
  explanation: `## Tasks & Parallelism

\`Task\` represents an asynchronous operation. The TPL (Task Parallel Library) provides higher-level constructs for parallelism.

\`\`\`csharp
// Task.Run -- offload CPU work to thread pool
var result = await Task.Run(() => ComputeExpensiveThing());

// Task.WhenAny -- first to finish
var winner = await Task.WhenAny(task1, task2, task3);

// CancellationToken
var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
await DoWorkAsync(cts.Token);

// Parallel.ForEachAsync (.NET 6+)
await Parallel.ForEachAsync(items, new ParallelOptions { MaxDegreeOfParallelism = 4 },
    async (item, ct) => await ProcessAsync(item, ct));

// Task continuations
var task = GetDataAsync()
    .ContinueWith(t => Transform(t.Result))
    .ContinueWith(t => Save(t.Result));
\`\`\`

**Task.Run** is for CPU-bound work. **async/await** is for I/O-bound work. **Parallel.ForEachAsync** combines both with concurrency control.`,
  exercises: [
    {
      id: 'cs-task-1',
      title: 'Task.Run',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Offload CPU-bound work to the thread pool.',
      skeleton: `int result = await Task.__BLANK__(() =>
{
    // expensive computation
    return Fibonacci(40);
});`,
      solution: `int result = await Task.Run(() =>
{
    // expensive computation
    return Fibonacci(40);
});`,
      hints: ['Task.Run queues work to the thread pool.', 'It returns a Task<T> that can be awaited.', 'The answer is: Run'],
      concepts: ['Task.Run', 'thread pool', 'CPU-bound work'],
    },
    {
      id: 'cs-task-2',
      title: 'Task.WhenAny',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Get the first task to complete.',
      skeleton: `var fast = FetchFromCacheAsync();
var slow = FetchFromDbAsync();
var winner = await Task.__BLANK__(fast, slow);
var result = await winner;`,
      solution: `var fast = FetchFromCacheAsync();
var slow = FetchFromDbAsync();
var winner = await Task.WhenAny(fast, slow);
var result = await winner;`,
      hints: ['WhenAny returns the first completed task.', 'You still need to await the winner to get the result.', 'The answer is: WhenAny'],
      concepts: ['Task.WhenAny', 'first-to-complete'],
    },
    {
      id: 'cs-task-3',
      title: 'CancellationTokenSource',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create a cancellation token with a timeout.',
      skeleton: `using var cts = new __BLANK__(TimeSpan.FromSeconds(10));
await LongRunningAsync(cts.Token);`,
      solution: `using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(10));
await LongRunningAsync(cts.Token);`,
      hints: ['CancellationTokenSource creates tokens and can trigger cancellation.', 'The constructor overload accepts a timeout.', 'The answer is: CancellationTokenSource'],
      concepts: ['CancellationTokenSource', 'timeout cancellation'],
    },
    {
      id: 'cs-task-4',
      title: 'Task.FromResult',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Create a completed task with a known result.',
      skeleton: `Task<int> GetCachedAsync(string key)
{
    if (_cache.TryGetValue(key, out var value))
        return Task.__BLANK__(value);
    return LoadFromDbAsync(key);
}`,
      solution: `Task<int> GetCachedAsync(string key)
{
    if (_cache.TryGetValue(key, out var value))
        return Task.FromResult(value);
    return LoadFromDbAsync(key);
}`,
      hints: ['FromResult wraps a synchronous value in a completed Task.', 'No async/await needed for the synchronous path.', 'The answer is: FromResult'],
      concepts: ['Task.FromResult', 'completed task', 'synchronous fast path'],
    },
    {
      id: 'cs-task-5',
      title: 'Token.ThrowIfCancellationRequested',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Check for cancellation in a loop.',
      skeleton: `async Task ProcessItemsAsync(int[] items, CancellationToken ct)
{
    foreach (var item in items)
    {
        ct.__BLANK__();
        await ProcessAsync(item);
    }
}`,
      solution: `async Task ProcessItemsAsync(int[] items, CancellationToken ct)
{
    foreach (var item in items)
    {
        ct.ThrowIfCancellationRequested();
        await ProcessAsync(item);
    }
}`,
      hints: ['ThrowIfCancellationRequested throws OperationCanceledException if cancelled.', 'Check at the start of each iteration.', 'The answer is: ThrowIfCancellationRequested'],
      concepts: ['cooperative cancellation', 'ThrowIfCancellationRequested'],
    },
    {
      id: 'cs-task-6',
      title: 'Linked CancellationToken',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Link multiple cancellation tokens together.',
      skeleton: `using var linked = CancellationTokenSource.__BLANK__(
    externalToken, timeoutToken);
await DoWorkAsync(linked.Token);`,
      solution: `using var linked = CancellationTokenSource.CreateLinkedTokenSource(
    externalToken, timeoutToken);
await DoWorkAsync(linked.Token);`,
      hints: ['CreateLinkedTokenSource links multiple tokens.', 'Cancelling any source cancels the linked token.', 'The answer is: CreateLinkedTokenSource'],
      concepts: ['linked cancellation', 'CreateLinkedTokenSource'],
    },
    {
      id: 'cs-task-7',
      title: 'Parallel.ForEachAsync',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Process items in parallel with a max concurrency limit.',
      skeleton: `// Write async Task ProcessAllAsync(string[] urls, int maxParallel)
// Download each URL concurrently, limit parallelism`,
      solution: `async Task ProcessAllAsync(string[] urls, int maxParallel)
{
    using var client = new HttpClient();
    await Parallel.ForEachAsync(urls,
        new ParallelOptions { MaxDegreeOfParallelism = maxParallel },
        async (url, ct) =>
        {
            var data = await client.GetStringAsync(url, ct);
            Console.WriteLine($"Downloaded {url}: {data.Length} chars");
        });
}`,
      hints: ['Parallel.ForEachAsync handles concurrency control.', 'MaxDegreeOfParallelism limits simultaneous operations.', 'The lambda receives a CancellationToken.'],
      concepts: ['Parallel.ForEachAsync', 'concurrency limit', '.NET 6'],
    },
    {
      id: 'cs-task-8',
      title: 'Task.WhenAll with Error Handling',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Run multiple tasks and handle individual failures.',
      skeleton: `// Write async Task<(T[] Successes, Exception[] Errors)> WhenAllSettled<T>(Task<T>[] tasks)
// Return both successful results and exceptions`,
      solution: `async Task<(T[] Successes, Exception[] Errors)> WhenAllSettled<T>(Task<T>[] tasks)
{
    try { await Task.WhenAll(tasks); } catch { }

    var successes = tasks.Where(t => t.IsCompletedSuccessfully)
                        .Select(t => t.Result).ToArray();
    var errors = tasks.Where(t => t.IsFaulted)
                      .Select(t => t.Exception!.InnerException!).ToArray();
    return (successes, errors);
}`,
      hints: ['Catch the AggregateException from WhenAll to continue.', 'Check IsCompletedSuccessfully and IsFaulted on each task.', 'Separate successes and errors.'],
      concepts: ['error handling', 'WhenAll', 'settled pattern'],
    },
    {
      id: 'cs-task-9',
      title: 'Progress Reporting',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Report progress during an async operation.',
      skeleton: `// Write async Task ProcessWithProgressAsync(
//   int[] items, IProgress<int> progress, CancellationToken ct)
// Report percentage complete after each item`,
      solution: `async Task ProcessWithProgressAsync(
    int[] items, IProgress<int> progress, CancellationToken ct)
{
    for (int i = 0; i < items.Length; i++)
    {
        ct.ThrowIfCancellationRequested();
        await Task.Run(() => ProcessItem(items[i]), ct);
        int percent = (int)((i + 1) * 100.0 / items.Length);
        progress.Report(percent);
    }
}`,
      hints: ['IProgress<T> is the standard pattern for progress reporting.', 'Report is thread-safe and marshals to the correct context.', 'Calculate percentage after each item.'],
      concepts: ['IProgress<T>', 'progress reporting', 'thread-safe'],
    },
    {
      id: 'cs-task-10',
      title: 'Task Completion Source',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Wrap a callback-based API with TaskCompletionSource.',
      skeleton: `// Given: void FetchLegacy(string url, Action<string> onSuccess, Action<Exception> onError)
// Write: Task<string> FetchAsync(string url)`,
      solution: `Task<string> FetchAsync(string url)
{
    var tcs = new TaskCompletionSource<string>();
    FetchLegacy(url,
        result => tcs.SetResult(result),
        error => tcs.SetException(error));
    return tcs.Task;
}`,
      hints: ['TaskCompletionSource<T> creates a manually completed task.', 'SetResult completes successfully; SetException completes with error.', 'Return tcs.Task to the caller.'],
      concepts: ['TaskCompletionSource', 'callback wrapping', 'legacy interop'],
    },
    {
      id: 'cs-task-11',
      title: 'Async Lock Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Implement an async-safe lock using SemaphoreSlim.',
      skeleton: `// Write class AsyncLock with:
// - Task<IDisposable> LockAsync()
// - The returned IDisposable releases the lock on Dispose`,
      solution: `class AsyncLock
{
    private readonly SemaphoreSlim _semaphore = new(1, 1);

    public async Task<IDisposable> LockAsync()
    {
        await _semaphore.WaitAsync();
        return new Releaser(_semaphore);
    }

    private class Releaser : IDisposable
    {
        private readonly SemaphoreSlim _sem;
        public Releaser(SemaphoreSlim sem) => _sem = sem;
        public void Dispose() => _sem.Release();
    }
}`,
      hints: ['SemaphoreSlim(1,1) acts as a mutex.', 'Return an IDisposable that releases the semaphore.', 'Usage: using (await asyncLock.LockAsync()) { ... }'],
      concepts: ['async lock', 'SemaphoreSlim', 'IDisposable pattern'],
    },
    {
      id: 'cs-task-12',
      title: 'Periodic Background Task',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a periodic task that runs on an interval until cancelled.',
      skeleton: `// Write async Task RunPeriodicAsync(
//   Func<CancellationToken, Task> action, TimeSpan interval, CancellationToken ct)`,
      solution: `async Task RunPeriodicAsync(
    Func<CancellationToken, Task> action, TimeSpan interval, CancellationToken ct)
{
    using var timer = new PeriodicTimer(interval);
    while (await timer.WaitForNextTickAsync(ct))
    {
        await action(ct);
    }
}`,
      hints: ['PeriodicTimer (.NET 6) is designed for periodic async work.', 'WaitForNextTickAsync returns false on cancellation.', 'The loop runs until the token is cancelled.'],
      concepts: ['PeriodicTimer', 'background task', 'cancellation loop'],
    },
    {
      id: 'cs-task-13',
      title: 'Bug: Lost Task Exception',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the fire-and-forget task that loses its exception.',
      skeleton: `void StartWork()
{
    Task.Run(async () =>
    {
        await Task.Delay(100);
        throw new Exception("Background error");
    });
    // Bug: exception is never observed, silently lost
}`,
      solution: `async Task StartWorkAsync()
{
    await Task.Run(async () =>
    {
        await Task.Delay(100);
        throw new Exception("Background error");
    });
    // Fix: exception propagates to caller
}`,
      hints: ['Non-awaited tasks lose their exceptions.', 'Always await tasks or observe them.', 'Return Task so callers can await and see errors.'],
      concepts: ['unobserved exception', 'task observation'],
    },
    {
      id: 'cs-task-14',
      title: 'Bug: Disposed CancellationTokenSource',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the CancellationTokenSource that is disposed too early.',
      skeleton: `async Task RunAsync()
{
    CancellationToken ct;
    using (var cts = new CancellationTokenSource())
    {
        ct = cts.Token;
    }  // cts disposed here!

    await DoWorkAsync(ct);  // Bug: using disposed token
}`,
      solution: `async Task RunAsync()
{
    using var cts = new CancellationTokenSource();
    await DoWorkAsync(cts.Token);
    // cts lives until end of method
}`,
      hints: ['CancellationTokenSource must outlive the operations using its token.', 'Using declaration (without braces) extends lifetime to end of scope.', 'Pass cts.Token directly without storing separately.'],
      concepts: ['CancellationTokenSource lifetime', 'using declaration'],
    },
    {
      id: 'cs-task-15',
      title: 'Bug: Task.Run in ASP.NET',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the unnecessary Task.Run wrapping I/O-bound work in ASP.NET.',
      skeleton: `// In an ASP.NET controller:
public async Task<IActionResult> GetData()
{
    var data = await Task.Run(async () =>
    {
        return await _dbContext.Users.ToListAsync();
    });
    return Ok(data);
}`,
      solution: `// In an ASP.NET controller:
public async Task<IActionResult> GetData()
{
    var data = await _dbContext.Users.ToListAsync();
    return Ok(data);
}`,
      hints: ['Task.Run wraps work on the thread pool -- unnecessary for I/O.', 'EF Core already returns a Task from ToListAsync.', 'Task.Run wastes a thread pool thread in ASP.NET.'],
      concepts: ['Task.Run misuse', 'I/O-bound vs CPU-bound', 'ASP.NET thread pool'],
    },
    {
      id: 'cs-task-16',
      title: 'Predict Task.WhenAny Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict which task completes first.',
      skeleton: `var t1 = Task.Delay(200).ContinueWith(_ => "slow");
var t2 = Task.Delay(50).ContinueWith(_ => "fast");
var winner = await Task.WhenAny(t1, t2);
Console.WriteLine(await winner);`,
      solution: `fast`,
      hints: ['t2 has a 50ms delay, t1 has 200ms.', 'WhenAny returns the first to complete.', 'The 50ms task ("fast") completes first.'],
      concepts: ['Task.WhenAny', 'race condition'],
    },
    {
      id: 'cs-task-17',
      title: 'Predict Cancellation Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict what happens when cancellation is requested.',
      skeleton: `var cts = new CancellationTokenSource();
var task = Task.Run(async () =>
{
    for (int i = 0; i < 5; i++)
    {
        Console.Write(i);
        await Task.Delay(50);
        cts.Token.ThrowIfCancellationRequested();
    }
}, cts.Token);

await Task.Delay(130);
cts.Cancel();
try { await task; } catch (OperationCanceledException) { Console.Write("X"); }`,
      solution: `012X`,
      hints: ['Each iteration: print, delay 50ms, check cancellation.', 'After ~130ms: iterations 0,1,2 complete (0ms, 50ms, 100ms).', 'During iteration 3 delay (150ms), cancel fires. Next check throws.'],
      concepts: ['cancellation timing', 'cooperative cancellation'],
    },
    {
      id: 'cs-task-18',
      title: 'Predict Task Status',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Predict the status of a faulted task.',
      skeleton: `var task = Task.Run(() => { throw new Exception("oops"); });
try { await task; } catch { }
Console.Write(task.Status);
Console.Write(task.IsFaulted);`,
      solution: `FaultedTrue`,
      hints: ['A task that throws has Status = Faulted.', 'IsFaulted is true for faulted tasks.', 'The catch block handles the exception.'],
      concepts: ['task status', 'Faulted', 'IsFaulted'],
    },
    {
      id: 'cs-task-19',
      title: 'Refactor Thread to Task',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Replace manual Thread usage with Task.Run.',
      skeleton: `void StartBackground()
{
    var thread = new Thread(() =>
    {
        var result = ExpensiveComputation();
        Console.WriteLine(result);
    });
    thread.IsBackground = true;
    thread.Start();
    thread.Join();
}`,
      solution: `async Task StartBackgroundAsync()
{
    var result = await Task.Run(() => ExpensiveComputation());
    Console.WriteLine(result);
}`,
      hints: ['Task.Run uses the thread pool instead of creating threads.', 'Await replaces thread.Join().', 'Results are returned naturally through Task<T>.'],
      concepts: ['Thread to Task', 'thread pool', 'modernization'],
    },
    {
      id: 'cs-task-20',
      title: 'Refactor Sequential to WhenAll',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Replace sequential awaits with concurrent execution.',
      skeleton: `async Task<int> GetTotalAsync(int[] userIds)
{
    int total = 0;
    foreach (var id in userIds)
    {
        var score = await GetScoreAsync(id);
        total += score;
    }
    return total;
}`,
      solution: `async Task<int> GetTotalAsync(int[] userIds)
{
    var tasks = userIds.Select(id => GetScoreAsync(id));
    var scores = await Task.WhenAll(tasks);
    return scores.Sum();
}`,
      hints: ['Select creates all tasks without awaiting.', 'WhenAll runs them concurrently.', 'Sum the results after all complete.'],
      concepts: ['sequential to parallel', 'Task.WhenAll', 'LINQ Select'],
    },
  ],
};
