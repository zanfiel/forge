import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-design-decorator',
  title: '46. Decorator Pattern',
  explanation: `## Decorator Pattern

The Decorator pattern attaches additional responsibilities to an object dynamically. It provides a flexible alternative to subclassing for extending functionality.

\`\`\`csharp
public interface INotifier
{
    void Send(string message);
}

public class EmailNotifier : INotifier
{
    public void Send(string message) => Console.WriteLine($"Email: {message}");
}

public class SmsDecorator : INotifier
{
    private readonly INotifier _inner;
    public SmsDecorator(INotifier inner) => _inner = inner;

    public void Send(string message)
    {
        _inner.Send(message);
        Console.WriteLine($"SMS: {message}");
    }
}
\`\`\`

### How It Works

1. Define a common interface
2. Create a base (concrete) implementation
3. Create decorator classes that wrap the interface and add behavior
4. Decorators delegate to the wrapped object, adding behavior before or after

### Stacking Decorators

Decorators can be chained:

\`\`\`csharp
INotifier notifier = new EmailNotifier();
notifier = new SmsDecorator(notifier);
notifier = new LoggingDecorator(notifier);
notifier.Send("Alert!"); // logs, then sends SMS, then sends email
\`\`\`

### Middleware as Decorator

ASP.NET Core middleware follows the decorator pattern:

\`\`\`csharp
app.Use(async (context, next) =>
{
    // Before
    await next(context);
    // After
});
\`\`\`

### Stream Decorators in .NET

The \`System.IO.Stream\` class hierarchy is a classic decorator example:

\`\`\`csharp
var file = File.OpenRead("data.bin");
var buffered = new BufferedStream(file);
var gzip = new GZipStream(buffered, CompressionMode.Decompress);
\`\`\`

### DI Integration with Scrutor

The Scrutor library adds decoration support to Microsoft DI:

\`\`\`csharp
services.AddTransient<INotifier, EmailNotifier>();
services.Decorate<INotifier, LoggingDecorator>();
\`\`\``,
  exercises: [
    {
      id: 'cs-decorator-1',
      title: 'Basic Decorator Structure',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Store the wrapped object in a decorator.',
      skeleton: `public class LoggingDecorator : IRepository
{
    private readonly IRepository __BLANK__;

    public LoggingDecorator(IRepository inner) => _inner = inner;

    public void Save(string data)
    {
        Console.WriteLine("Saving...");
        _inner.Save(data);
        Console.WriteLine("Saved.");
    }
}`,
      solution: `public class LoggingDecorator : IRepository
{
    private readonly IRepository _inner;

    public LoggingDecorator(IRepository inner) => _inner = inner;

    public void Save(string data)
    {
        Console.WriteLine("Saving...");
        _inner.Save(data);
        Console.WriteLine("Saved.");
    }
}`,
      hints: ['The field stores the wrapped instance.', 'It follows C# private field naming conventions.', 'The answer is: _inner'],
      concepts: ['decorator field', 'wrapping', 'delegation'],
    },
    {
      id: 'cs-decorator-2',
      title: 'Delegate to Inner',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Delegate a call to the wrapped object inside a decorator.',
      skeleton: `public class CachingDecorator : IDataService
{
    private readonly IDataService _inner;
    private readonly Dictionary<string, string> _cache = new();

    public CachingDecorator(IDataService inner) => _inner = inner;

    public string GetData(string key)
    {
        if (_cache.TryGetValue(key, out var cached))
            return cached;

        var result = __BLANK__.GetData(key);
        _cache[key] = result;
        return result;
    }
}`,
      solution: `public class CachingDecorator : IDataService
{
    private readonly IDataService _inner;
    private readonly Dictionary<string, string> _cache = new();

    public CachingDecorator(IDataService inner) => _inner = inner;

    public string GetData(string key)
    {
        if (_cache.TryGetValue(key, out var cached))
            return cached;

        var result = _inner.GetData(key);
        _cache[key] = result;
        return result;
    }
}`,
      hints: ['The decorator delegates to the wrapped object on cache miss.', 'The wrapped object is stored in a private field.', 'The answer is: _inner'],
      concepts: ['delegation', 'caching decorator', 'dictionary cache'],
    },
    {
      id: 'cs-decorator-3',
      title: 'Implement Same Interface',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'A decorator must implement the same interface as what it wraps.',
      skeleton: `public class TimingDecorator : __BLANK__
{
    private readonly IProcessor _inner;
    public TimingDecorator(IProcessor inner) => _inner = inner;

    public void Process()
    {
        var sw = Stopwatch.StartNew();
        _inner.Process();
        sw.Stop();
        Console.WriteLine($"Took {sw.ElapsedMilliseconds}ms");
    }
}`,
      solution: `public class TimingDecorator : IProcessor
{
    private readonly IProcessor _inner;
    public TimingDecorator(IProcessor inner) => _inner = inner;

    public void Process()
    {
        var sw = Stopwatch.StartNew();
        _inner.Process();
        sw.Stop();
        Console.WriteLine($"Took {sw.ElapsedMilliseconds}ms");
    }
}`,
      hints: ['The decorator must implement the same contract as the wrapped object.', 'This allows transparent substitution.', 'The answer is: IProcessor'],
      concepts: ['interface implementation', 'decorator contract', 'substitutability'],
    },
    {
      id: 'cs-decorator-4',
      title: 'Async Decorator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create an async decorator that adds retry behavior.',
      skeleton: `public class RetryDecorator : IHttpClient
{
    private readonly IHttpClient _inner;
    private readonly int _maxRetries;

    public RetryDecorator(IHttpClient inner, int maxRetries)
    {
        _inner = inner;
        _maxRetries = maxRetries;
    }

    public async Task<string> GetAsync(string url)
    {
        for (int i = 0; i <= _maxRetries; i++)
        {
            try { return __BLANK__ _inner.GetAsync(url); }
            catch when (i < _maxRetries) { await Task.Delay(100 * (i + 1)); }
        }
        throw new InvalidOperationException("Unreachable");
    }
}`,
      solution: `public class RetryDecorator : IHttpClient
{
    private readonly IHttpClient _inner;
    private readonly int _maxRetries;

    public RetryDecorator(IHttpClient inner, int maxRetries)
    {
        _inner = inner;
        _maxRetries = maxRetries;
    }

    public async Task<string> GetAsync(string url)
    {
        for (int i = 0; i <= _maxRetries; i++)
        {
            try { return await _inner.GetAsync(url); }
            catch when (i < _maxRetries) { await Task.Delay(100 * (i + 1)); }
        }
        throw new InvalidOperationException("Unreachable");
    }
}`,
      hints: ['The inner call returns a Task that must be awaited.', 'This keyword pauses until the Task completes.', 'The answer is: await'],
      concepts: ['async decorator', 'await', 'retry pattern'],
    },
    {
      id: 'cs-decorator-5',
      title: 'BufferedStream Decorator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Wrap a file stream with a buffered stream decorator.',
      skeleton: `using var fileStream = File.OpenRead("data.bin");
using var buffered = new __BLANK__(fileStream);
var reader = new StreamReader(buffered);
var content = reader.ReadToEnd();`,
      solution: `using var fileStream = File.OpenRead("data.bin");
using var buffered = new BufferedStream(fileStream);
var reader = new StreamReader(buffered);
var content = reader.ReadToEnd();`,
      hints: ['This Stream decorator adds buffering to reduce I/O calls.', 'It wraps another Stream.', 'The answer is: BufferedStream'],
      concepts: ['BufferedStream', 'stream decorator', 'I/O buffering'],
    },
    {
      id: 'cs-decorator-6',
      title: 'Scrutor Decorate',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Use Scrutor to register a decorator in the DI container.',
      skeleton: `services.AddTransient<INotifier, EmailNotifier>();
services.__BLANK__<INotifier, LoggingNotifierDecorator>();`,
      solution: `services.AddTransient<INotifier, EmailNotifier>();
services.Decorate<INotifier, LoggingNotifierDecorator>();`,
      hints: ['Scrutor adds this extension method to IServiceCollection.', 'It wraps the existing registration with a decorator.', 'The answer is: Decorate'],
      concepts: ['Scrutor', 'DI decoration', 'service wrapping'],
    },
    {
      id: 'cs-decorator-7',
      title: 'Logging Decorator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Implement a logging decorator for an ICalculator interface.',
      skeleton: `public interface ICalculator { int Add(int a, int b); }
public class Calculator : ICalculator { public int Add(int a, int b) => a + b; }

// Create LoggingCalculator decorator that:
// - Implements ICalculator
// - Logs "Adding {a} + {b}" before delegating
// - Logs "Result: {result}" after
// - Returns the result`,
      solution: `public class LoggingCalculator : ICalculator
{
    private readonly ICalculator _inner;

    public LoggingCalculator(ICalculator inner) => _inner = inner;

    public int Add(int a, int b)
    {
        Console.WriteLine($"Adding {a} + {b}");
        var result = _inner.Add(a, b);
        Console.WriteLine($"Result: {result}");
        return result;
    }
}`,
      hints: ['Implement the same interface as the wrapped object.', 'Add logging before and after the delegated call.', 'Store the result in a variable so you can log it and return it.'],
      concepts: ['logging decorator', 'cross-cutting concern', 'delegation'],
    },
    {
      id: 'cs-decorator-8',
      title: 'Caching Decorator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Implement a caching decorator for an IWeatherService.',
      skeleton: `public interface IWeatherService { string GetForecast(string city); }

// Create CachingWeatherService decorator that:
// - Caches results in a Dictionary<string, string>
// - Returns cached result on subsequent calls for the same city
// - Delegates to inner service on cache miss`,
      solution: `public class CachingWeatherService : IWeatherService
{
    private readonly IWeatherService _inner;
    private readonly Dictionary<string, string> _cache = new();

    public CachingWeatherService(IWeatherService inner) => _inner = inner;

    public string GetForecast(string city)
    {
        if (_cache.TryGetValue(city, out var cached))
            return cached;

        var forecast = _inner.GetForecast(city);
        _cache[city] = forecast;
        return forecast;
    }
}`,
      hints: ['Check the dictionary before calling the inner service.', 'Use TryGetValue for efficient lookup.', 'Store the result before returning it.'],
      concepts: ['caching decorator', 'Dictionary<K,V>', 'memoization'],
    },
    {
      id: 'cs-decorator-9',
      title: 'Validation Decorator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Implement a validation decorator that checks inputs before delegating.',
      skeleton: `public interface IUserRepository
{
    void Save(User user);
    User? GetById(int id);
}

// Create ValidatingUserRepository decorator that:
// - Throws ArgumentException if user.Name is null or empty on Save
// - Throws ArgumentException if id <= 0 on GetById
// - Otherwise delegates to inner`,
      solution: `public class ValidatingUserRepository : IUserRepository
{
    private readonly IUserRepository _inner;

    public ValidatingUserRepository(IUserRepository inner) => _inner = inner;

    public void Save(User user)
    {
        if (string.IsNullOrWhiteSpace(user.Name))
            throw new ArgumentException("User name is required", nameof(user));
        _inner.Save(user);
    }

    public User? GetById(int id)
    {
        if (id <= 0)
            throw new ArgumentException("Id must be positive", nameof(id));
        return _inner.GetById(id);
    }
}`,
      hints: ['Validate inputs before delegating to the inner service.', 'Use string.IsNullOrWhiteSpace for name validation.', 'Throw ArgumentException with descriptive messages.'],
      concepts: ['validation decorator', 'guard clauses', 'ArgumentException'],
    },
    {
      id: 'cs-decorator-10',
      title: 'Stacked Decorators',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create and stack multiple decorators on a single service.',
      skeleton: `public interface IMessageSender { void Send(string msg); }
public class ConsoleSender : IMessageSender { public void Send(string msg) => Console.WriteLine(msg); }

// Create UpperCaseDecorator that upper-cases the message before sending
// Create TimestampDecorator that prepends "[HH:mm:ss] " before sending
// Stack them: timestamp wraps uppercase wraps console`,
      solution: `public class UpperCaseDecorator : IMessageSender
{
    private readonly IMessageSender _inner;
    public UpperCaseDecorator(IMessageSender inner) => _inner = inner;

    public void Send(string msg) => _inner.Send(msg.ToUpper());
}

public class TimestampDecorator : IMessageSender
{
    private readonly IMessageSender _inner;
    public TimestampDecorator(IMessageSender inner) => _inner = inner;

    public void Send(string msg) =>
        _inner.Send($"[{DateTime.Now:HH:mm:ss}] {msg}");
}

// Stacking:
// IMessageSender sender = new ConsoleSender();
// sender = new UpperCaseDecorator(sender);
// sender = new TimestampDecorator(sender);
// sender.Send("hello"); // prints "[14:30:00] HELLO"`,
      hints: ['Each decorator wraps the previous one.', 'The outermost decorator is called first.', 'Timestamp prepends, then uppercase transforms, then console prints.'],
      concepts: ['stacked decorators', 'decoration order', 'composition'],
    },
    {
      id: 'cs-decorator-11',
      title: 'Async Retry Decorator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Implement an async retry decorator with exponential backoff.',
      skeleton: `public interface IApiClient { Task<string> FetchAsync(string url); }

// Create RetryDecorator : IApiClient
// - Takes IApiClient inner and int maxRetries
// - Retries failed requests with exponential backoff (100ms, 200ms, 400ms...)
// - Throws the last exception if all retries fail`,
      solution: `public class RetryDecorator : IApiClient
{
    private readonly IApiClient _inner;
    private readonly int _maxRetries;

    public RetryDecorator(IApiClient inner, int maxRetries)
    {
        _inner = inner;
        _maxRetries = maxRetries;
    }

    public async Task<string> FetchAsync(string url)
    {
        Exception? lastException = null;

        for (int attempt = 0; attempt <= _maxRetries; attempt++)
        {
            try
            {
                return await _inner.FetchAsync(url);
            }
            catch (Exception ex)
            {
                lastException = ex;
                if (attempt < _maxRetries)
                {
                    var delay = (int)Math.Pow(2, attempt) * 100;
                    await Task.Delay(delay);
                }
            }
        }

        throw lastException!;
    }
}`,
      hints: ['Loop from 0 to maxRetries inclusive.', 'Calculate delay as 2^attempt * 100 for exponential backoff.', 'Store the last exception and throw it if all retries fail.'],
      concepts: ['async decorator', 'retry pattern', 'exponential backoff'],
    },
    {
      id: 'cs-decorator-12',
      title: 'Middleware-Style Decorator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Create a generic decorator pipeline using middleware-style composition.',
      skeleton: `// Create a Pipeline<T> class that chains decorators using Func
// - Takes a base Func<T, T> processor
// - Use(Func<T, Func<T, T>, T> middleware) adds middleware
// - Execute(T input) runs the pipeline
// Middleware signature: (input, next) => next(modified_input)`,
      solution: `public class Pipeline<T>
{
    private Func<T, T> _pipeline;

    public Pipeline(Func<T, T> baseProcessor)
    {
        _pipeline = baseProcessor;
    }

    public Pipeline<T> Use(Func<T, Func<T, T>, T> middleware)
    {
        var previous = _pipeline;
        _pipeline = input => middleware(input, previous);
        return this;
    }

    public T Execute(T input) => _pipeline(input);
}

// Usage:
// var pipeline = new Pipeline<string>(s => s)
//     .Use((s, next) => next(s.Trim()))
//     .Use((s, next) => next(s.ToUpper()));
// pipeline.Execute("  hello  "); // "HELLO"`,
      hints: ['Each middleware wraps the previous pipeline.', 'The middleware receives the input and a next function.', 'Capture the current pipeline in a closure before replacing it.'],
      concepts: ['middleware pattern', 'functional decorator', 'pipeline composition'],
    },
    {
      id: 'cs-decorator-13',
      title: 'Missing Delegation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the decorator that adds behavior but never calls the inner object.',
      skeleton: `public class AuthDecorator : IService
{
    private readonly IService _inner;
    private readonly IAuthProvider _auth;

    public AuthDecorator(IService inner, IAuthProvider auth)
    {
        _inner = inner;
        _auth = auth;
    }

    public string Execute(string request)
    {
        if (!_auth.IsAuthenticated())
            throw new UnauthorizedAccessException();

        // Bug: never calls _inner.Execute
        return "OK";
    }
}`,
      solution: `public class AuthDecorator : IService
{
    private readonly IService _inner;
    private readonly IAuthProvider _auth;

    public AuthDecorator(IService inner, IAuthProvider auth)
    {
        _inner = inner;
        _auth = auth;
    }

    public string Execute(string request)
    {
        if (!_auth.IsAuthenticated())
            throw new UnauthorizedAccessException();

        return _inner.Execute(request);
    }
}`,
      hints: ['Decorators must delegate to the wrapped object after their own logic.', 'The inner service does the actual work.', 'Replace return "OK" with return _inner.Execute(request).'],
      concepts: ['decorator delegation', 'missing call', 'wrapping'],
    },
    {
      id: 'cs-decorator-14',
      title: 'Wrong Decoration Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the decorator that logs after the call but should log before and after.',
      skeleton: `public class AuditDecorator : IOrderService
{
    private readonly IOrderService _inner;
    private readonly ILogger _logger;

    public AuditDecorator(IOrderService inner, ILogger logger)
    {
        _inner = inner;
        _logger = logger;
    }

    public void PlaceOrder(Order order)
    {
        // Bug: only logs after, should log before AND after
        _inner.PlaceOrder(order);
        _logger.Log($"Order {order.Id} placed");
    }
}`,
      solution: `public class AuditDecorator : IOrderService
{
    private readonly IOrderService _inner;
    private readonly ILogger _logger;

    public AuditDecorator(IOrderService inner, ILogger logger)
    {
        _inner = inner;
        _logger = logger;
    }

    public void PlaceOrder(Order order)
    {
        _logger.Log($"Placing order {order.Id}");
        _inner.PlaceOrder(order);
        _logger.Log($"Order {order.Id} placed");
    }
}`,
      hints: ['Audit logging should record when an operation starts and ends.', 'Add a log call before the inner delegation.', 'Both before and after logging provides complete audit trail.'],
      concepts: ['audit logging', 'before/after pattern', 'cross-cutting concern'],
    },
    {
      id: 'cs-decorator-15',
      title: 'Exception Swallowed',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the decorator that swallows exceptions instead of propagating them.',
      skeleton: `public class ErrorHandlingDecorator : IProcessor
{
    private readonly IProcessor _inner;

    public ErrorHandlingDecorator(IProcessor inner) => _inner = inner;

    public void Process()
    {
        try
        {
            _inner.Process();
        }
        catch (Exception ex)
        {
            // Bug: logs but swallows the exception
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}`,
      solution: `public class ErrorHandlingDecorator : IProcessor
{
    private readonly IProcessor _inner;

    public ErrorHandlingDecorator(IProcessor inner) => _inner = inner;

    public void Process()
    {
        try
        {
            _inner.Process();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            throw;
        }
    }
}`,
      hints: ['Logging decorators should not swallow exceptions.', 'After logging, re-throw the exception.', 'Use throw; (without the exception variable) to preserve the stack trace.'],
      concepts: ['exception propagation', 'throw vs throw ex', 'logging decorator'],
    },
    {
      id: 'cs-decorator-16',
      title: 'Predict Decorator Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output order when decorators are stacked.',
      skeleton: `public interface IGreeter { void Greet(string name); }
public class Greeter : IGreeter { public void Greet(string name) => Console.Write($"Hi {name}"); }
public class LoudGreeter : IGreeter
{
    private readonly IGreeter _inner;
    public LoudGreeter(IGreeter inner) => _inner = inner;
    public void Greet(string name)
    {
        Console.Write("!");
        _inner.Greet(name.ToUpper());
        Console.Write("!");
    }
}

IGreeter g = new Greeter();
g = new LoudGreeter(g);
g.Greet("alice");`,
      solution: `!Hi ALICE!`,
      hints: ['LoudGreeter prints "!" first.', 'Then delegates to Greeter with uppercased name.', 'Then prints "!" after.'],
      concepts: ['decorator execution order', 'before/after', 'string transformation'],
    },
    {
      id: 'cs-decorator-17',
      title: 'Predict Stacked Decorators',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of multiply-stacked decorators.',
      skeleton: `public interface IFormatter { string Format(string s); }
public class Identity : IFormatter { public string Format(string s) => s; }
public class Brackets : IFormatter
{
    private readonly IFormatter _inner;
    public Brackets(IFormatter inner) => _inner = inner;
    public string Format(string s) => $"[{_inner.Format(s)}]";
}
public class Stars : IFormatter
{
    private readonly IFormatter _inner;
    public Stars(IFormatter inner) => _inner = inner;
    public string Format(string s) => $"*{_inner.Format(s)}*";
}

IFormatter f = new Identity();
f = new Brackets(f);
f = new Stars(f);
Console.Write(f.Format("hi"));`,
      solution: `*[hi]*`,
      hints: ['Stars is the outermost decorator, called first.', 'Stars wraps Brackets which wraps Identity.', 'Stars adds *, Brackets adds [], Identity returns as-is.'],
      concepts: ['nested decoration', 'execution order', 'string wrapping'],
    },
    {
      id: 'cs-decorator-18',
      title: 'Predict Cache Hit',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of a caching decorator.',
      skeleton: `public interface IStore { string Get(string key); }
public class SlowStore : IStore
{
    public string Get(string key)
    {
        Console.Write("FETCH ");
        return $"val-{key}";
    }
}
public class CacheStore : IStore
{
    private readonly IStore _inner;
    private readonly Dictionary<string, string> _cache = new();
    public CacheStore(IStore inner) => _inner = inner;
    public string Get(string key)
    {
        if (!_cache.TryGetValue(key, out var val))
        {
            val = _inner.Get(key);
            _cache[key] = val;
        }
        return val;
    }
}

IStore store = new CacheStore(new SlowStore());
Console.Write(store.Get("a") + " ");
Console.Write(store.Get("a") + " ");
Console.Write(store.Get("b"));`,
      solution: `FETCH val-a val-a FETCH val-b`,
      hints: ['First Get("a") is a cache miss: prints FETCH, returns val-a.', 'Second Get("a") is a cache hit: no FETCH, returns val-a.', 'Get("b") is a new cache miss: prints FETCH, returns val-b.'],
      concepts: ['caching', 'cache hit/miss', 'decorator state'],
    },
    {
      id: 'cs-decorator-19',
      title: 'Refactor Inheritance to Decorator',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor a class hierarchy using inheritance into the decorator pattern.',
      skeleton: `public class FileLogger
{
    public virtual void Log(string msg) => File.AppendAllText("log.txt", msg + "\\n");
}

public class TimestampedFileLogger : FileLogger
{
    public override void Log(string msg) =>
        base.Log($"[{DateTime.Now:s}] {msg}");
}

public class EncryptedFileLogger : TimestampedFileLogger
{
    public override void Log(string msg) =>
        base.Log(Convert.ToBase64String(Encoding.UTF8.GetBytes(msg)));
}`,
      solution: `public interface ILogger
{
    void Log(string msg);
}

public class FileLogger : ILogger
{
    public void Log(string msg) => File.AppendAllText("log.txt", msg + "\\n");
}

public class TimestampDecorator : ILogger
{
    private readonly ILogger _inner;
    public TimestampDecorator(ILogger inner) => _inner = inner;
    public void Log(string msg) => _inner.Log($"[{DateTime.Now:s}] {msg}");
}

public class EncryptionDecorator : ILogger
{
    private readonly ILogger _inner;
    public EncryptionDecorator(ILogger inner) => _inner = inner;
    public void Log(string msg) =>
        _inner.Log(Convert.ToBase64String(Encoding.UTF8.GetBytes(msg)));
}

// Usage: ILogger logger = new EncryptionDecorator(new TimestampDecorator(new FileLogger()));`,
      hints: ['Extract an ILogger interface.', 'Each behavior becomes a separate decorator wrapping ILogger.', 'Decorators can be combined in any order, unlike inheritance.'],
      concepts: ['refactoring', 'composition over inheritance', 'decorator flexibility'],
    },
    {
      id: 'cs-decorator-20',
      title: 'Refactor to Generic Decorator',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor multiple similar decorators into a generic decorator class.',
      skeleton: `public class LoggingUserRepo : IUserRepository
{
    private readonly IUserRepository _inner;
    private readonly ILogger _logger;
    public LoggingUserRepo(IUserRepository inner, ILogger logger) { _inner = inner; _logger = logger; }
    public User Get(int id) { _logger.Log($"Get user {id}"); return _inner.Get(id); }
    public void Save(User u) { _logger.Log($"Save user {u.Id}"); _inner.Save(u); }
}

public class LoggingOrderRepo : IOrderRepository
{
    private readonly IOrderRepository _inner;
    private readonly ILogger _logger;
    public LoggingOrderRepo(IOrderRepository inner, ILogger logger) { _inner = inner; _logger = logger; }
    public Order Get(int id) { _logger.Log($"Get order {id}"); return _inner.Get(id); }
    public void Save(Order o) { _logger.Log($"Save order {o.Id}"); _inner.Save(o); }
}`,
      solution: `public interface IRepository<T> where T : IEntity
{
    T Get(int id);
    void Save(T entity);
}

public class LoggingRepository<T> : IRepository<T> where T : IEntity
{
    private readonly IRepository<T> _inner;
    private readonly ILogger _logger;
    private readonly string _typeName = typeof(T).Name;

    public LoggingRepository(IRepository<T> inner, ILogger logger)
    {
        _inner = inner;
        _logger = logger;
    }

    public T Get(int id)
    {
        _logger.Log($"Get {_typeName} {id}");
        return _inner.Get(id);
    }

    public void Save(T entity)
    {
        _logger.Log($"Save {_typeName} {entity.Id}");
        _inner.Save(entity);
    }
}

// Usage:
// services.Decorate<IRepository<User>, LoggingRepository<User>>();
// services.Decorate<IRepository<Order>, LoggingRepository<Order>>();`,
      hints: ['Extract a generic IRepository<T> interface.', 'Use typeof(T).Name for type-specific logging.', 'A single generic decorator replaces all the specific ones.'],
      concepts: ['generic decorator', 'DRY principle', 'generic constraints'],
    },
  ],
};
