import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-async',
  title: '28. Async/Await',
  explanation: `## Async/Await

The async/await pattern allows writing asynchronous code that reads like synchronous code. The runtime manages thread-switching and continuations.

\`\`\`csharp
// Basic async method
async Task<string> FetchDataAsync(string url)
{
    using var client = new HttpClient();
    string data = await client.GetStringAsync(url);
    return data;
}

// Awaiting multiple tasks
async Task ProcessAllAsync()
{
    var task1 = FetchDataAsync("https://api.example.com/a");
    var task2 = FetchDataAsync("https://api.example.com/b");
    string[] results = await Task.WhenAll(task1, task2);
}

// ConfigureAwait
var data = await GetDataAsync().ConfigureAwait(false);

// Async streams (C# 8)
async IAsyncEnumerable<int> GenerateAsync()
{
    for (int i = 0; i < 10; i++)
    {
        await Task.Delay(100);
        yield return i;
    }
}
\`\`\`

**Rules**: Always return \`Task\` or \`Task<T>\` (never \`async void\` except event handlers). Use \`ConfigureAwait(false)\` in library code. Avoid \`.Result\` and \`.Wait()\` to prevent deadlocks.`,
  exercises: [
    {
      id: 'cs-asy-1',
      title: 'Basic Async Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare an async method.',
      skeleton: `__BLANK__ Task<int> ComputeAsync()
{
    await Task.Delay(100);
    return 42;
}`,
      solution: `async Task<int> ComputeAsync()
{
    await Task.Delay(100);
    return 42;
}`,
      hints: ['The async keyword enables await in the method body.', 'Async methods return Task or Task<T>.', 'The answer is: async'],
      concepts: ['async keyword', 'Task<T>'],
    },
    {
      id: 'cs-asy-2',
      title: 'Await a Task',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Await an asynchronous operation.',
      skeleton: `async Task Main()
{
    string data = __BLANK__ File.ReadAllTextAsync("data.txt");
    Console.WriteLine(data);
}`,
      solution: `async Task Main()
{
    string data = await File.ReadAllTextAsync("data.txt");
    Console.WriteLine(data);
}`,
      hints: ['await suspends until the task completes.', 'It unwraps Task<string> to string.', 'The answer is: await'],
      concepts: ['await keyword', 'task unwrapping'],
    },
    {
      id: 'cs-asy-3',
      title: 'Task.WhenAll',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Await multiple tasks concurrently.',
      skeleton: `var t1 = GetDataAsync("a");
var t2 = GetDataAsync("b");
var results = await Task.__BLANK__(t1, t2);`,
      solution: `var t1 = GetDataAsync("a");
var t2 = GetDataAsync("b");
var results = await Task.WhenAll(t1, t2);`,
      hints: ['WhenAll runs tasks concurrently and waits for all.', 'It returns an array of results.', 'The answer is: WhenAll'],
      concepts: ['Task.WhenAll', 'concurrent execution'],
    },
    {
      id: 'cs-asy-4',
      title: 'ConfigureAwait',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Avoid capturing the synchronization context.',
      skeleton: `// In library code:
var data = await GetDataAsync().__BLANK__(false);`,
      solution: `// In library code:
var data = await GetDataAsync().ConfigureAwait(false);`,
      hints: ['ConfigureAwait(false) avoids returning to the original context.', 'Use it in library code to prevent deadlocks.', 'The answer is: ConfigureAwait'],
      concepts: ['ConfigureAwait', 'synchronization context'],
    },
    {
      id: 'cs-asy-5',
      title: 'Async Void Warning',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Return Task instead of void for async methods.',
      skeleton: `// Bad: async void (fire and forget, swallows exceptions)
// Fix the return type:
async __BLANK__ SaveDataAsync(string data)
{
    await File.WriteAllTextAsync("output.txt", data);
}`,
      solution: `async Task SaveDataAsync(string data)
{
    await File.WriteAllTextAsync("output.txt", data);
}`,
      hints: ['async void should only be used for event handlers.', 'Always return Task for void async methods.', 'The answer is: Task'],
      concepts: ['async Task', 'avoid async void'],
    },
    {
      id: 'cs-asy-6',
      title: 'CancellationToken',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Pass a cancellation token to an async method.',
      skeleton: `async Task<string> FetchAsync(string url, __BLANK__ ct = default)
{
    using var client = new HttpClient();
    return await client.GetStringAsync(url, ct);
}`,
      solution: `async Task<string> FetchAsync(string url, CancellationToken ct = default)
{
    using var client = new HttpClient();
    return await client.GetStringAsync(url, ct);
}`,
      hints: ['CancellationToken allows cooperative cancellation.', 'Default value default means no cancellation.', 'The answer is: CancellationToken'],
      concepts: ['CancellationToken', 'cooperative cancellation'],
    },
    {
      id: 'cs-asy-7',
      title: 'Async File Processing',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write an async method that reads a file and counts lines.',
      skeleton: `// Write async Task<int> CountLinesAsync(string path)`,
      solution: `async Task<int> CountLinesAsync(string path)
{
    var lines = await File.ReadAllLinesAsync(path);
    return lines.Length;
}`,
      hints: ['File.ReadAllLinesAsync returns Task<string[]>.', 'Await it to get the string array.', 'Return the array length.'],
      concepts: ['async file I/O', 'ReadAllLinesAsync'],
    },
    {
      id: 'cs-asy-8',
      title: 'Parallel HTTP Requests',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fetch multiple URLs concurrently.',
      skeleton: `// Write async Task<string[]> FetchAllAsync(string[] urls)
// Use HttpClient and Task.WhenAll for concurrent requests`,
      solution: `async Task<string[]> FetchAllAsync(string[] urls)
{
    using var client = new HttpClient();
    var tasks = urls.Select(url => client.GetStringAsync(url));
    return await Task.WhenAll(tasks);
}`,
      hints: ['Create all tasks first without awaiting.', 'Pass them to Task.WhenAll for concurrent execution.', 'Select creates tasks lazily.'],
      concepts: ['concurrent requests', 'Task.WhenAll', 'HttpClient'],
    },
    {
      id: 'cs-asy-9',
      title: 'Async Stream',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write an async stream that yields numbers with delay.',
      skeleton: `// Write async IAsyncEnumerable<int> CountAsync(int from, int to, int delayMs)
// Yield each number from from to to with a delay between each`,
      solution: `async IAsyncEnumerable<int> CountAsync(int from, int to, int delayMs)
{
    for (int i = from; i <= to; i++)
    {
        await Task.Delay(delayMs);
        yield return i;
    }
}`,
      hints: ['IAsyncEnumerable<T> is the async equivalent of IEnumerable<T>.', 'Combine yield return with await.', 'Consumers use await foreach to iterate.'],
      concepts: ['IAsyncEnumerable', 'async stream', 'yield return'],
    },
    {
      id: 'cs-asy-10',
      title: 'Timeout with CancellationToken',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Implement a timeout for an async operation.',
      skeleton: `// Write async Task<T> WithTimeout<T>(Task<T> task, int timeoutMs)
// Throw TimeoutException if task doesn't complete in time`,
      solution: `async Task<T> WithTimeout<T>(Task<T> task, int timeoutMs)
{
    using var cts = new CancellationTokenSource();
    var delayTask = Task.Delay(timeoutMs, cts.Token);
    var completedTask = await Task.WhenAny(task, delayTask);
    if (completedTask == delayTask)
        throw new TimeoutException();
    cts.Cancel();  // cancel the delay
    return await task;
}`,
      hints: ['Task.WhenAny returns the first task to complete.', 'If the delay completes first, it is a timeout.', 'Cancel the delay if the real task completes first.'],
      concepts: ['Task.WhenAny', 'timeout pattern', 'CancellationTokenSource'],
    },
    {
      id: 'cs-asy-11',
      title: 'Semaphore Throttling',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a throttled parallel processor using SemaphoreSlim.',
      skeleton: `// Write async Task ProcessThrottledAsync<T>(
//   IEnumerable<T> items, Func<T, Task> process, int maxConcurrency)`,
      solution: `async Task ProcessThrottledAsync<T>(
    IEnumerable<T> items, Func<T, Task> process, int maxConcurrency)
{
    var semaphore = new SemaphoreSlim(maxConcurrency);
    var tasks = items.Select(async item =>
    {
        await semaphore.WaitAsync();
        try
        {
            await process(item);
        }
        finally
        {
            semaphore.Release();
        }
    });
    await Task.WhenAll(tasks);
}`,
      hints: ['SemaphoreSlim limits concurrent access.', 'WaitAsync blocks when at capacity.', 'Always Release in a finally block.'],
      concepts: ['SemaphoreSlim', 'throttling', 'concurrency control'],
    },
    {
      id: 'cs-asy-12',
      title: 'ValueTask Optimization',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Use ValueTask for a method that often completes synchronously.',
      skeleton: `// Write ValueTask<int> GetCachedValueAsync(string key)
// Check a cache first (sync path); fall back to async database call`,
      solution: `private readonly Dictionary<string, int> _cache = new();

ValueTask<int> GetCachedValueAsync(string key)
{
    if (_cache.TryGetValue(key, out var value))
        return ValueTask.FromResult(value);  // synchronous fast path

    return new ValueTask<int>(LoadFromDbAsync(key));
}

async Task<int> LoadFromDbAsync(string key)
{
    await Task.Delay(100); // simulated DB call
    var value = 42;
    _cache[key] = value;
    return value;
}`,
      hints: ['ValueTask avoids Task allocation for synchronous results.', 'Return ValueTask.FromResult for the cached (sync) path.', 'Wrap the async fallback in new ValueTask<T>.'],
      concepts: ['ValueTask', 'synchronous fast path', 'allocation avoidance'],
    },
    {
      id: 'cs-asy-13',
      title: 'Bug: Deadlock with .Result',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the deadlock caused by blocking on an async method.',
      skeleton: `// In an ASP.NET or UI context:
string data = GetDataAsync().Result;  // DEADLOCK!`,
      solution: `// Fix: use await instead of .Result
string data = await GetDataAsync();`,
      hints: ['.Result blocks the current thread while waiting.', 'If the async method needs the same thread to continue, it deadlocks.', 'Always use await instead of .Result or .Wait().'],
      concepts: ['deadlock', '.Result danger', 'await vs block'],
    },
    {
      id: 'cs-asy-14',
      title: 'Bug: Async Void Exception',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the async void method that crashes the application.',
      skeleton: `async void LoadData()
{
    var data = await FetchAsync("https://api.example.com");
    Process(data);
    // Bug: if FetchAsync throws, it crashes the app
}`,
      solution: `async Task LoadDataAsync()
{
    var data = await FetchAsync("https://api.example.com");
    Process(data);
    // Fix: exceptions can now be observed by the caller
}`,
      hints: ['async void exceptions are unobservable and crash the app.', 'Change return type to Task so callers can await and catch.', 'Only use async void for event handlers.'],
      concepts: ['async void danger', 'unobservable exceptions'],
    },
    {
      id: 'cs-asy-15',
      title: 'Bug: Missing Await',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the missing await that causes operations to run without waiting.',
      skeleton: `async Task ProcessAsync()
{
    SaveToFileAsync("data.txt", "content");  // warning: not awaited
    Console.WriteLine("Done!");  // runs before save completes
}`,
      solution: `async Task ProcessAsync()
{
    await SaveToFileAsync("data.txt", "content");
    Console.WriteLine("Done!");  // now runs after save completes
}`,
      hints: ['Without await, the task is fire-and-forget.', 'The method continues immediately without waiting.', 'Add await to ensure the operation completes before proceeding.'],
      concepts: ['missing await', 'task observation', 'sequential execution'],
    },
    {
      id: 'cs-asy-16',
      title: 'Predict Async Execution Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output order of async operations.',
      skeleton: `async Task RunAsync()
{
    Console.Write("A");
    await Task.Delay(1);
    Console.Write("B");
}

Console.Write("1");
var task = RunAsync();
Console.Write("2");
await task;
Console.Write("3");`,
      solution: `1A2B3`,
      hints: ['1 prints, then RunAsync starts: A prints.', 'await Task.Delay yields control: 2 prints.', 'When delay completes: B prints, then 3 prints.'],
      concepts: ['async execution order', 'yielding control'],
    },
    {
      id: 'cs-asy-17',
      title: 'Predict WhenAll vs Sequential',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Understand the difference between sequential and concurrent awaits.',
      skeleton: `async Task<int> DelayAndReturn(int ms, int val)
{
    await Task.Delay(ms);
    return val;
}

// Sequential: takes ~200ms
var a = await DelayAndReturn(100, 1);
var b = await DelayAndReturn(100, 2);
Console.Write($"{a}{b}");`,
      solution: `12`,
      hints: ['Sequential awaits run one after the other.', 'First returns 1, then second returns 2.', 'Output is 12, but it takes ~200ms total.'],
      concepts: ['sequential await', 'timing implications'],
    },
    {
      id: 'cs-asy-18',
      title: 'Predict Cancellation Behavior',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Predict what happens when a task is cancelled.',
      skeleton: `var cts = new CancellationTokenSource();
cts.CancelAfter(50);
try
{
    await Task.Delay(1000, cts.Token);
    Console.Write("A");
}
catch (OperationCanceledException)
{
    Console.Write("B");
}
Console.Write("C");`,
      solution: `BC`,
      hints: ['CancelAfter(50) cancels after 50ms.', 'Task.Delay(1000) is cancelled, throwing OperationCanceledException.', 'Catch prints B, then C prints after.'],
      concepts: ['cancellation', 'OperationCanceledException', 'CancelAfter'],
    },
    {
      id: 'cs-asy-19',
      title: 'Refactor Callbacks to Async',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Replace callback-based code with async/await.',
      skeleton: `void LoadData(string url, Action<string> onSuccess, Action<Exception> onError)
{
    var client = new HttpClient();
    client.GetStringAsync(url).ContinueWith(t =>
    {
        if (t.IsFaulted)
            onError(t.Exception!.InnerException!);
        else
            onSuccess(t.Result);
    });
}`,
      solution: `async Task<string> LoadDataAsync(string url)
{
    using var client = new HttpClient();
    return await client.GetStringAsync(url);
}`,
      hints: ['async/await replaces ContinueWith callbacks.', 'Exceptions propagate naturally through await.', 'The using statement ensures HttpClient disposal.'],
      concepts: ['callback to async', 'ContinueWith replacement'],
    },
    {
      id: 'cs-asy-20',
      title: 'Refactor Sequential to Parallel',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor sequential async calls to run concurrently.',
      skeleton: `async Task<(User, Order[], Review[])> LoadProfileAsync(int userId)
{
    var user = await GetUserAsync(userId);
    var orders = await GetOrdersAsync(userId);
    var reviews = await GetReviewsAsync(userId);
    return (user, orders, reviews);
}`,
      solution: `async Task<(User, Order[], Review[])> LoadProfileAsync(int userId)
{
    var userTask = GetUserAsync(userId);
    var ordersTask = GetOrdersAsync(userId);
    var reviewsTask = GetReviewsAsync(userId);

    await Task.WhenAll(userTask, ordersTask, reviewsTask);

    return (userTask.Result, ordersTask.Result, reviewsTask.Result);
}`,
      hints: ['Start all tasks before awaiting any.', 'Task.WhenAll waits for all to complete concurrently.', 'Access .Result after WhenAll is safe (tasks are completed).'],
      concepts: ['concurrent execution', 'Task.WhenAll', 'performance optimization'],
    },
  ],
};
