import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-design-singleton',
  title: '42. Singleton Pattern',
  explanation: `## Singleton Pattern

The Singleton pattern ensures a class has only one instance and provides a global point of access to it. In C#, there are several ways to implement it safely.

\`\`\`csharp
// Lazy<T> singleton (recommended)
public sealed class AppConfig
{
    private static readonly Lazy<AppConfig> _instance =
        new(() => new AppConfig());

    public static AppConfig Instance => _instance.Value;

    private AppConfig() { /* load config */ }

    public string ConnectionString { get; set; } = "";
}
\`\`\`

### Implementation Strategies

1. **Eager initialization** - instance created at class load time via a static field
2. **Lazy<T>** - thread-safe, deferred creation (preferred approach)
3. **Double-check locking** - manual lock with volatile field
4. **Static constructor** - exploits CLR guarantee that static constructors run once

### Thread Safety

The CLR guarantees static field initialization is thread-safe, but instance-level state still needs synchronization. \`Lazy<T>\` with \`LazyThreadSafetyMode.ExecutionAndPublication\` (the default) handles this cleanly.

\`\`\`csharp
// Double-check locking (manual approach)
public sealed class Registry
{
    private static volatile Registry? _instance;
    private static readonly object _lock = new();

    public static Registry Instance
    {
        get
        {
            if (_instance is null)
            {
                lock (_lock)
                {
                    _instance ??= new Registry();
                }
            }
            return _instance;
        }
    }

    private Registry() { }
}
\`\`\`

### Testing Considerations

Singletons can make unit testing difficult because they carry global state. Prefer injecting an interface via DI instead of accessing the singleton directly. This allows mocking in tests while retaining singleton lifetime via the DI container.`,
  exercises: [
    {
      id: 'cs-singleton-1',
      title: 'Lazy Singleton Field',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a Lazy<T> field for a singleton instance.',
      skeleton: `public sealed class Logger
{
    private static readonly __BLANK__<Logger> _instance =
        new(() => new Logger());

    public static Logger Instance => _instance.Value;
    private Logger() { }
}`,
      solution: `public sealed class Logger
{
    private static readonly Lazy<Logger> _instance =
        new(() => new Logger());

    public static Logger Instance => _instance.Value;
    private Logger() { }
}`,
      hints: ['The wrapper type defers creation until first access.', 'It lives in the System namespace.', 'The answer is: Lazy'],
      concepts: ['Lazy<T>', 'singleton', 'thread safety'],
    },
    {
      id: 'cs-singleton-2',
      title: 'Sealed Singleton',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Prevent inheritance of a singleton class.',
      skeleton: `public __BLANK__ class DatabaseConnection
{
    private static readonly DatabaseConnection _instance = new();
    public static DatabaseConnection Instance => _instance;
    private DatabaseConnection() { }
}`,
      solution: `public sealed class DatabaseConnection
{
    private static readonly DatabaseConnection _instance = new();
    public static DatabaseConnection Instance => _instance;
    private DatabaseConnection() { }
}`,
      hints: ['This keyword prevents other classes from inheriting.', 'Singletons should not be subclassed.', 'The answer is: sealed'],
      concepts: ['sealed', 'singleton', 'inheritance prevention'],
    },
    {
      id: 'cs-singleton-3',
      title: 'Private Constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Restrict construction of a singleton to the class itself.',
      skeleton: `public sealed class Cache
{
    private static readonly Cache _instance = new();
    public static Cache Instance => _instance;

    __BLANK__ Cache() { }
}`,
      solution: `public sealed class Cache
{
    private static readonly Cache _instance = new();
    public static Cache Instance => _instance;

    private Cache() { }
}`,
      hints: ['The constructor must not be callable from outside the class.', 'This is the most restrictive access modifier.', 'The answer is: private'],
      concepts: ['private constructor', 'singleton', 'encapsulation'],
    },
    {
      id: 'cs-singleton-4',
      title: 'Accessing Lazy Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Access the singleton instance from a Lazy wrapper.',
      skeleton: `public sealed class Settings
{
    private static readonly Lazy<Settings> _lazy = new(() => new Settings());
    public static Settings Instance => _lazy.__BLANK__;
    private Settings() { }
}`,
      solution: `public sealed class Settings
{
    private static readonly Lazy<Settings> _lazy = new(() => new Settings());
    public static Settings Instance => _lazy.Value;
    private Settings() { }
}`,
      hints: ['Lazy<T> exposes the created instance through a property.', 'It triggers creation on first access.', 'The answer is: Value'],
      concepts: ['Lazy<T>.Value', 'deferred initialization', 'singleton'],
    },
    {
      id: 'cs-singleton-5',
      title: 'Volatile Field',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Mark a field as volatile for double-check locking.',
      skeleton: `public sealed class Registry
{
    private static __BLANK__ Registry? _instance;
    private static readonly object _lock = new();

    public static Registry Instance
    {
        get
        {
            if (_instance is null)
            {
                lock (_lock)
                {
                    _instance ??= new Registry();
                }
            }
            return _instance;
        }
    }
    private Registry() { }
}`,
      solution: `public sealed class Registry
{
    private static volatile Registry? _instance;
    private static readonly object _lock = new();

    public static Registry Instance
    {
        get
        {
            if (_instance is null)
            {
                lock (_lock)
                {
                    _instance ??= new Registry();
                }
            }
            return _instance;
        }
    }
    private Registry() { }
}`,
      hints: ['This keyword prevents CPU instruction reordering for a field.', 'It ensures visibility across threads without a full lock.', 'The answer is: volatile'],
      concepts: ['volatile', 'double-check locking', 'memory barrier'],
    },
    {
      id: 'cs-singleton-6',
      title: 'Lock Object',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use a lock to ensure thread-safe singleton creation.',
      skeleton: `public sealed class Pool
{
    private static Pool? _instance;
    private static readonly object _sync = new();

    public static Pool Instance
    {
        get
        {
            __BLANK__ (_sync)
            {
                _instance ??= new Pool();
            }
            return _instance;
        }
    }
    private Pool() { }
}`,
      solution: `public sealed class Pool
{
    private static Pool? _instance;
    private static readonly object _sync = new();

    public static Pool Instance
    {
        get
        {
            lock (_sync)
            {
                _instance ??= new Pool();
            }
            return _instance;
        }
    }
    private Pool() { }
}`,
      hints: ['This keyword acquires an exclusive lock on an object.', 'Only one thread can enter the block at a time.', 'The answer is: lock'],
      concepts: ['lock', 'mutual exclusion', 'thread safety'],
    },
    {
      id: 'cs-singleton-7',
      title: 'Basic Eager Singleton',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Implement an eager-initialized singleton class called Counter with a Count property and Increment method.',
      skeleton: `// Create a sealed singleton class Counter
// - private static readonly instance created eagerly
// - public static Instance property
// - private constructor
// - public int Count property (get only)
// - public void Increment() method`,
      solution: `public sealed class Counter
{
    private static readonly Counter _instance = new();
    public static Counter Instance => _instance;

    private Counter() { }

    public int Count { get; private set; }

    public void Increment() => Count++;
}`,
      hints: ['Use a static readonly field initialized inline.', 'The constructor must be private.', 'Count should have a private setter.'],
      concepts: ['eager initialization', 'singleton', 'encapsulation'],
    },
    {
      id: 'cs-singleton-8',
      title: 'Lazy Singleton with Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Implement a singleton AppConfig using Lazy<T> that loads a default connection string on creation.',
      skeleton: `// Create a sealed singleton class AppConfig using Lazy<T>
// - ConnectionString property initialized to "Server=localhost;Database=app"
// - public static Instance property using Lazy<T>
// - private constructor`,
      solution: `public sealed class AppConfig
{
    private static readonly Lazy<AppConfig> _instance =
        new(() => new AppConfig());

    public static AppConfig Instance => _instance.Value;

    public string ConnectionString { get; set; }

    private AppConfig()
    {
        ConnectionString = "Server=localhost;Database=app";
    }
}`,
      hints: ['Wrap the instance in Lazy<T> with a factory lambda.', 'Access via the .Value property.', 'Initialize ConnectionString in the private constructor.'],
      concepts: ['Lazy<T>', 'factory lambda', 'singleton initialization'],
    },
    {
      id: 'cs-singleton-9',
      title: 'Thread-Safe Double-Check',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Implement a singleton using the double-check locking pattern with a volatile field.',
      skeleton: `// Create sealed class ServiceLocator with double-check locking
// - private static volatile field
// - private static readonly lock object
// - public static Instance property with double-check locking
// - private constructor
// - public Dictionary<string, object> Services property`,
      solution: `public sealed class ServiceLocator
{
    private static volatile ServiceLocator? _instance;
    private static readonly object _lock = new();

    public static ServiceLocator Instance
    {
        get
        {
            if (_instance is null)
            {
                lock (_lock)
                {
                    _instance ??= new ServiceLocator();
                }
            }
            return _instance;
        }
    }

    private ServiceLocator()
    {
        Services = new Dictionary<string, object>();
    }

    public Dictionary<string, object> Services { get; }
}`,
      hints: ['Check for null before and inside the lock.', 'The field must be volatile to prevent reordering.', 'Use ??= inside the lock for concise null-check-and-assign.'],
      concepts: ['double-check locking', 'volatile', 'thread safety'],
    },
    {
      id: 'cs-singleton-10',
      title: 'Generic Singleton Base',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Create a generic singleton base class that any class with a parameterless constructor can inherit from.',
      skeleton: `// Create abstract class Singleton<T> where T : class, new()
// - private static readonly Lazy<T> _instance
// - public static T Instance property
// - protected constructor`,
      solution: `public abstract class Singleton<T> where T : class, new()
{
    private static readonly Lazy<T> _instance = new(() => new T());

    public static T Instance => _instance.Value;

    protected Singleton() { }
}`,
      hints: ['Use a generic constraint requiring a parameterless constructor: new().', 'Lazy<T> handles thread-safe creation.', 'The constructor should be protected so derived classes can call it.'],
      concepts: ['generic singleton', 'constraints', 'Lazy<T>', 'abstract class'],
    },
    {
      id: 'cs-singleton-11',
      title: 'Singleton with Interface',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Implement a singleton that implements an interface for testability.',
      skeleton: `// Define ILogger with void Log(string message)
// Create sealed class ConsoleLogger : ILogger as a Lazy singleton
// - private List<string> Messages
// - Log adds to Messages and writes to console`,
      solution: `public interface ILogger
{
    void Log(string message);
}

public sealed class ConsoleLogger : ILogger
{
    private static readonly Lazy<ConsoleLogger> _instance =
        new(() => new ConsoleLogger());

    public static ConsoleLogger Instance => _instance.Value;

    private readonly List<string> _messages = new();

    private ConsoleLogger() { }

    public void Log(string message)
    {
        _messages.Add(message);
        Console.WriteLine(message);
    }

    public IReadOnlyList<string> Messages => _messages;
}`,
      hints: ['The interface allows mocking in tests.', 'Store messages in a private list and expose as IReadOnlyList.', 'The singleton still uses Lazy<T> internally.'],
      concepts: ['interface', 'singleton', 'testability', 'IReadOnlyList'],
    },
    {
      id: 'cs-singleton-12',
      title: 'Singleton via DI Container',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Register a service as singleton lifetime in the DI container instead of using the classic singleton pattern.',
      skeleton: `// Given interface ICache and class MemoryCache : ICache
// Register MemoryCache as a singleton in the DI container
// Then resolve and use it`,
      solution: `public interface ICache
{
    void Set(string key, object value);
    object? Get(string key);
}

public class MemoryCache : ICache
{
    private readonly Dictionary<string, object> _store = new();

    public void Set(string key, object value) => _store[key] = value;
    public object? Get(string key) =>
        _store.TryGetValue(key, out var val) ? val : null;
}

// Registration:
// services.AddSingleton<ICache, MemoryCache>();`,
      hints: ['Use AddSingleton<TService, TImplementation>() on IServiceCollection.', 'The DI container ensures only one instance exists.', 'This is the modern alternative to classic singletons.'],
      concepts: ['dependency injection', 'AddSingleton', 'IServiceCollection'],
    },
    {
      id: 'cs-singleton-13',
      title: 'Missing Private Constructor',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the singleton that allows external instantiation.',
      skeleton: `public sealed class Printer
{
    private static readonly Lazy<Printer> _instance =
        new(() => new Printer());

    public static Printer Instance => _instance.Value;

    // Bug: constructor is public
    public Printer() { }

    public void Print(string msg) => Console.WriteLine(msg);
}

// Problem: new Printer() works outside the class`,
      solution: `public sealed class Printer
{
    private static readonly Lazy<Printer> _instance =
        new(() => new Printer());

    public static Printer Instance => _instance.Value;

    private Printer() { }

    public void Print(string msg) => Console.WriteLine(msg);
}`,
      hints: ['Singletons must prevent external construction.', 'Change the constructor access modifier.', 'Make the constructor private.'],
      concepts: ['private constructor', 'singleton enforcement', 'encapsulation'],
    },
    {
      id: 'cs-singleton-14',
      title: 'Broken Double-Check Lock',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the thread-unsafe singleton that has a race condition.',
      skeleton: `public sealed class EventBus
{
    private static EventBus? _instance;

    public static EventBus Instance
    {
        get
        {
            // Bug: no synchronization at all
            if (_instance is null)
            {
                _instance = new EventBus();
            }
            return _instance;
        }
    }

    private EventBus() { }
}`,
      solution: `public sealed class EventBus
{
    private static volatile EventBus? _instance;
    private static readonly object _lock = new();

    public static EventBus Instance
    {
        get
        {
            if (_instance is null)
            {
                lock (_lock)
                {
                    _instance ??= new EventBus();
                }
            }
            return _instance;
        }
    }

    private EventBus() { }
}`,
      hints: ['Multiple threads could enter the null check simultaneously.', 'Add a lock object and double-check inside the lock.', 'Mark the field as volatile to prevent CPU reordering.'],
      concepts: ['race condition', 'double-check locking', 'volatile', 'thread safety'],
    },
    {
      id: 'cs-singleton-15',
      title: 'Unsealed Singleton',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the singleton that can be subclassed, breaking the single-instance guarantee.',
      skeleton: `public class GlobalState
{
    private static readonly Lazy<GlobalState> _instance =
        new(() => new GlobalState());

    public static GlobalState Instance => _instance.Value;

    // Bug: protected allows subclass construction
    protected GlobalState() { }

    public Dictionary<string, string> State { get; } = new();
}

// Problem: class MyState : GlobalState { } creates a second instance`,
      solution: `public sealed class GlobalState
{
    private static readonly Lazy<GlobalState> _instance =
        new(() => new GlobalState());

    public static GlobalState Instance => _instance.Value;

    private GlobalState() { }

    public Dictionary<string, string> State { get; } = new();
}`,
      hints: ['The class must not be inheritable.', 'Mark the class as sealed and the constructor as private.', 'sealed prevents subclassing; private prevents external construction.'],
      concepts: ['sealed', 'private constructor', 'singleton integrity'],
    },
    {
      id: 'cs-singleton-16',
      title: 'Predict Eager Init Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output when accessing an eager singleton.',
      skeleton: `public sealed class Greeter
{
    private static readonly Greeter _instance = new();
    public static Greeter Instance => _instance;
    public string Message { get; }

    private Greeter()
    {
        Message = "Hello";
        Console.Write("Created ");
    }
}

// What does this print?
Console.Write("Before ");
var g = Greeter.Instance;
Console.Write(g.Message);`,
      solution: `Before Created Hello`,
      hints: ['Static fields are initialized when the type is first accessed.', 'The constructor runs before Instance returns.', 'Console.Write does not add newlines.'],
      concepts: ['static initialization', 'eager singleton', 'execution order'],
    },
    {
      id: 'cs-singleton-17',
      title: 'Predict Lazy Creation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict when the Lazy singleton instance is created.',
      skeleton: `public sealed class Tracker
{
    private static readonly Lazy<Tracker> _instance =
        new(() => { Console.Write("Init "); return new Tracker(); });

    public static Tracker Instance => _instance.Value;
    private Tracker() { }
    public void Track() => Console.Write("Tracked ");
}

// What does this print?
Console.Write("Start ");
Console.Write("Ready ");
var t = Tracker.Instance;
t.Track();
var t2 = Tracker.Instance;
t2.Track();`,
      solution: `Start Ready Init Tracked Tracked`,
      hints: ['Lazy<T> creates the instance on first .Value access.', 'Subsequent accesses return the cached instance without re-running the factory.', 'Init only prints once.'],
      concepts: ['Lazy<T>', 'deferred initialization', 'single creation'],
    },
    {
      id: 'cs-singleton-18',
      title: 'Predict Same Instance',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the reference equality check result for a singleton.',
      skeleton: `public sealed class IdGen
{
    private static readonly IdGen _instance = new();
    public static IdGen Instance => _instance;
    private IdGen() { }
    public int Next() => Random.Shared.Next(1, 100);
}

var a = IdGen.Instance;
var b = IdGen.Instance;
Console.Write(ReferenceEquals(a, b));`,
      solution: `True`,
      hints: ['Both variables reference the same static field.', 'ReferenceEquals checks if two variables point to the same object.', 'A singleton always returns the same instance.'],
      concepts: ['ReferenceEquals', 'singleton identity', 'reference equality'],
    },
    {
      id: 'cs-singleton-19',
      title: 'Refactor to Lazy<T>',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor a manual double-check locking singleton to use Lazy<T>.',
      skeleton: `public sealed class TokenStore
{
    private static volatile TokenStore? _instance;
    private static readonly object _lock = new();

    public static TokenStore Instance
    {
        get
        {
            if (_instance is null)
            {
                lock (_lock)
                {
                    _instance ??= new TokenStore();
                }
            }
            return _instance;
        }
    }

    private TokenStore() { }
    public string? Token { get; set; }
}`,
      solution: `public sealed class TokenStore
{
    private static readonly Lazy<TokenStore> _instance =
        new(() => new TokenStore());

    public static TokenStore Instance => _instance.Value;

    private TokenStore() { }
    public string? Token { get; set; }
}`,
      hints: ['Lazy<T> handles thread safety internally.', 'Replace the volatile field, lock, and double-check with a single Lazy<T>.', 'Access via .Value property.'],
      concepts: ['refactoring', 'Lazy<T>', 'simplification'],
    },
    {
      id: 'cs-singleton-20',
      title: 'Refactor to DI Singleton',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor a classic singleton to be DI-friendly by extracting an interface and using container-managed lifetime.',
      skeleton: `public sealed class NotificationService
{
    private static readonly Lazy<NotificationService> _instance =
        new(() => new NotificationService());
    public static NotificationService Instance => _instance.Value;

    private readonly List<string> _sent = new();
    private NotificationService() { }

    public void Send(string message)
    {
        _sent.Add(message);
        Console.WriteLine($"Sent: {message}");
    }

    public IReadOnlyList<string> SentMessages => _sent;
}

// Usage: NotificationService.Instance.Send("hi");`,
      solution: `public interface INotificationService
{
    void Send(string message);
    IReadOnlyList<string> SentMessages { get; }
}

public class NotificationService : INotificationService
{
    private readonly List<string> _sent = new();

    public void Send(string message)
    {
        _sent.Add(message);
        Console.WriteLine($"Sent: {message}");
    }

    public IReadOnlyList<string> SentMessages => _sent;
}

// Registration: services.AddSingleton<INotificationService, NotificationService>();
// Usage: constructor injection of INotificationService`,
      hints: ['Extract an interface for the service.', 'Remove the static Instance, Lazy, and private constructor.', 'Register as AddSingleton in the DI container.'],
      concepts: ['dependency injection', 'interface extraction', 'testability', 'refactoring'],
    },
  ],
};
