import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-dependency-injection',
  title: '36. Dependency Injection',
  explanation: `## Dependency Injection

.NET has a built-in DI container via \`Microsoft.Extensions.DependencyInjection\`.

\`\`\`csharp
var services = new ServiceCollection();
services.AddTransient<IEmailService, SmtpEmailService>();
services.AddScoped<IOrderService, OrderService>();
services.AddSingleton<ICache, MemoryCache>();

var provider = services.BuildServiceProvider();
var emailService = provider.GetRequiredService<IEmailService>();
\`\`\`

### Lifetimes

| Lifetime   | Description                                    |
|-----------|------------------------------------------------|
| Transient  | New instance every request                     |
| Scoped     | One instance per scope (e.g., HTTP request)    |
| Singleton  | One instance for the application lifetime      |

### Constructor Injection

\`\`\`csharp
class OrderService : IOrderService
{
    private readonly IEmailService _email;
    private readonly ICache _cache;

    public OrderService(IEmailService email, ICache cache)
    {
        _email = email;
        _cache = cache;
    }
}
\`\`\`

### Keyed Services (.NET 8+)

\`\`\`csharp
services.AddKeyedSingleton<ICache>("redis", new RedisCache());
services.AddKeyedSingleton<ICache>("memory", new MemoryCache());

// Resolve by key
var redis = provider.GetRequiredKeyedService<ICache>("redis");
\`\`\`

DI promotes loose coupling and testability. Always program to interfaces, not implementations.`,
  exercises: [
    {
      id: 'cs-di-1',
      title: 'Register Transient',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Register a transient service.',
      skeleton: `var services = new ServiceCollection();
services.__BLANK__<ILogger, ConsoleLogger>();`,
      solution: `var services = new ServiceCollection();
services.AddTransient<ILogger, ConsoleLogger>();`,
      hints: ['Transient creates a new instance each time.', 'The first generic is the interface, second is the implementation.', 'The answer is: AddTransient'],
      concepts: ['AddTransient', 'service registration'],
    },
    {
      id: 'cs-di-2',
      title: 'Register Singleton',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Register a singleton service.',
      skeleton: `services.__BLANK__<ICache, MemoryCache>();`,
      solution: `services.AddSingleton<ICache, MemoryCache>();`,
      hints: ['Singleton creates one instance for the app lifetime.', 'All requests share the same instance.', 'The answer is: AddSingleton'],
      concepts: ['AddSingleton', 'singleton lifetime'],
    },
    {
      id: 'cs-di-3',
      title: 'Register Scoped',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Register a scoped service.',
      skeleton: `services.__BLANK__<IDbContext, AppDbContext>();`,
      solution: `services.AddScoped<IDbContext, AppDbContext>();`,
      hints: ['Scoped creates one instance per scope.', 'In ASP.NET, each HTTP request is a scope.', 'The answer is: AddScoped'],
      concepts: ['AddScoped', 'scoped lifetime'],
    },
    {
      id: 'cs-di-4',
      title: 'Resolve Service',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Resolve a required service from the provider.',
      skeleton: `var provider = services.BuildServiceProvider();
var logger = provider.__BLANK__<ILogger>();`,
      solution: `var provider = services.BuildServiceProvider();
var logger = provider.GetRequiredService<ILogger>();`,
      hints: ['GetRequiredService throws if not registered.', 'GetService returns null instead.', 'The answer is: GetRequiredService'],
      concepts: ['GetRequiredService', 'service resolution'],
    },
    {
      id: 'cs-di-5',
      title: 'Create Scope',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create a service scope for scoped services.',
      skeleton: `using var scope = provider.__BLANK__();
var db = scope.ServiceProvider.GetRequiredService<IDbContext>();`,
      solution: `using var scope = provider.CreateScope();
var db = scope.ServiceProvider.GetRequiredService<IDbContext>();`,
      hints: ['Scoped services need a scope to resolve.', 'CreateScope returns an IServiceScope.', 'The answer is: CreateScope'],
      concepts: ['CreateScope', 'IServiceScope', 'scoped resolution'],
    },
    {
      id: 'cs-di-6',
      title: 'Factory Registration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Register a service using a factory delegate.',
      skeleton: `services.AddTransient<IHttpClient>(sp =>
    new HttpClientWrapper(sp.__BLANK__<ILogger>()));`,
      solution: `services.AddTransient<IHttpClient>(sp =>
    new HttpClientWrapper(sp.GetRequiredService<ILogger>()));`,
      hints: ['The factory receives the service provider as parameter.', 'Use it to resolve dependencies manually.', 'The answer is: GetRequiredService'],
      concepts: ['factory registration', 'manual resolution'],
    },
    {
      id: 'cs-di-7',
      title: 'Constructor Injection Class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Create a class that receives dependencies via constructor injection.',
      skeleton: `class NotificationService : INotificationService
{
    // Inject IEmailSender and ILogger via constructor
    // Store in private readonly fields
    // Implement Notify(string message)

    public void Notify(string message)
    {
        // Log and send email
    }
}`,
      solution: `class NotificationService : INotificationService
{
    private readonly IEmailSender _sender;
    private readonly ILogger _logger;

    public NotificationService(IEmailSender sender, ILogger logger)
    {
        _sender = sender;
        _logger = logger;
    }

    public void Notify(string message)
    {
        _logger.Log($"Sending: {message}");
        _sender.Send(message);
    }
}`,
      hints: ['Declare private readonly fields for each dependency.', 'Accept them as constructor parameters.', 'The DI container automatically resolves them.'],
      concepts: ['constructor injection', 'readonly fields', 'DI pattern'],
    },
    {
      id: 'cs-di-8',
      title: 'Register Multiple Implementations',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Register and resolve all implementations of an interface.',
      skeleton: `void RegisterAndResolve(IServiceCollection services)
{
    // Register ConsoleLogger, FileLogger, and DebugLogger as ILogger
    // Resolve all ILogger implementations as IEnumerable<ILogger>
}`,
      solution: `void RegisterAndResolve(IServiceCollection services)
{
    services.AddTransient<ILogger, ConsoleLogger>();
    services.AddTransient<ILogger, FileLogger>();
    services.AddTransient<ILogger, DebugLogger>();

    var provider = services.BuildServiceProvider();
    var loggers = provider.GetServices<ILogger>();
    foreach (var logger in loggers)
        logger.Log("Hello");
}`,
      hints: ['Register multiple implementations of the same interface.', 'GetServices<T> (plural) returns all registrations.', 'IEnumerable<ILogger> can also be injected directly.'],
      concepts: ['multiple implementations', 'GetServices', 'IEnumerable injection'],
    },
    {
      id: 'cs-di-9',
      title: 'Options Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Configure a service using the Options pattern.',
      skeleton: `class SmtpSettings
{
    public string Host { get; set; } = "";
    public int Port { get; set; }
}

void ConfigureServices(IServiceCollection services)
{
    // Register SmtpSettings with host "smtp.example.com" and port 587
    // Use the Options pattern
}`,
      solution: `class SmtpSettings
{
    public string Host { get; set; } = "";
    public int Port { get; set; }
}

void ConfigureServices(IServiceCollection services)
{
    services.Configure<SmtpSettings>(opts =>
    {
        opts.Host = "smtp.example.com";
        opts.Port = 587;
    });
}`,
      hints: ['services.Configure<T> registers options.', 'The delegate configures the options instance.', 'Inject IOptions<SmtpSettings> to consume them.'],
      concepts: ['Options pattern', 'Configure', 'IOptions'],
    },
    {
      id: 'cs-di-10',
      title: 'Decorator Registration',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Register a decorator that wraps an existing service.',
      skeleton: `class LoggingDecorator : IRepository
{
    private readonly IRepository _inner;
    private readonly ILogger _logger;

    public LoggingDecorator(IRepository inner, ILogger logger)
    {
        _inner = inner;
        _logger = logger;
    }

    public void Save(object item)
    {
        _logger.Log("Saving...");
        _inner.Save(item);
    }
}

void Register(IServiceCollection services)
{
    // Register SqlRepository as IRepository, then wrap with LoggingDecorator
}`,
      solution: `void Register(IServiceCollection services)
{
    services.AddScoped<SqlRepository>();
    services.AddScoped<IRepository>(sp =>
    {
        var inner = sp.GetRequiredService<SqlRepository>();
        var logger = sp.GetRequiredService<ILogger>();
        return new LoggingDecorator(inner, logger);
    });
}`,
      hints: ['Register the concrete type separately.', 'Use a factory to wrap it with the decorator.', 'The factory resolves both the inner service and the logger.'],
      concepts: ['decorator pattern', 'factory registration', 'service wrapping'],
    },
    {
      id: 'cs-di-11',
      title: 'Hosted Service',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Create a background service that runs periodically.',
      skeleton: `class CleanupService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public CleanupService(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Run cleanup every 60 seconds using a scoped IDbContext
    }
}`,
      solution: `class CleanupService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public CleanupService(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _scopeFactory.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<IDbContext>();
            await db.CleanupOldRecordsAsync();
            await Task.Delay(TimeSpan.FromSeconds(60), stoppingToken);
        }
    }
}`,
      hints: ['BackgroundService runs in the background.', 'Use IServiceScopeFactory to create scopes for scoped services.', 'Check stoppingToken.IsCancellationRequested in the loop.'],
      concepts: ['BackgroundService', 'IServiceScopeFactory', 'scoped in background'],
    },
    {
      id: 'cs-di-12',
      title: 'Keyed Service',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Register and resolve keyed services (.NET 8+).',
      skeleton: `void Setup(IServiceCollection services)
{
    // Register RedisCache as "redis" and MemoryCache as "memory"
    // Both implement ICache
}`,
      solution: `void Setup(IServiceCollection services)
{
    services.AddKeyedSingleton<ICache, RedisCache>("redis");
    services.AddKeyedSingleton<ICache, MemoryCache>("memory");
}`,
      hints: ['AddKeyedSingleton registers with a string key.', 'Resolve with GetRequiredKeyedService.', 'Or inject with [FromKeyedServices("key")] attribute.'],
      concepts: ['keyed services', 'AddKeyedSingleton', '.NET 8'],
    },
    {
      id: 'cs-di-13',
      title: 'Captive Dependency Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the captive dependency (scoped in singleton) bug.',
      skeleton: `// Bug: Singleton holds a Scoped service -- captive dependency!
services.AddScoped<IDbContext, AppDbContext>();
services.AddSingleton<IUserService, UserService>();

class UserService : IUserService
{
    private readonly IDbContext _db;  // Scoped captured by singleton!
    public UserService(IDbContext db) => _db = db;
}`,
      solution: `services.AddScoped<IDbContext, AppDbContext>();
services.AddScoped<IUserService, UserService>();

class UserService : IUserService
{
    private readonly IDbContext _db;
    public UserService(IDbContext db) => _db = db;
}`,
      hints: ['A singleton lives forever, but scoped services should be short-lived.', 'The scoped DbContext gets captured and reused forever.', 'Change the singleton to scoped, or inject IServiceScopeFactory.'],
      concepts: ['captive dependency', 'lifetime mismatch', 'scoped in singleton'],
    },
    {
      id: 'cs-di-14',
      title: 'Missing Registration Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the InvalidOperationException from a missing registration.',
      skeleton: `var services = new ServiceCollection();
services.AddTransient<IOrderService, OrderService>();
// Bug: OrderService depends on IEmailService which is not registered

var provider = services.BuildServiceProvider();
var order = provider.GetRequiredService<IOrderService>(); // throws!`,
      solution: `var services = new ServiceCollection();
services.AddTransient<IEmailService, SmtpEmailService>();
services.AddTransient<IOrderService, OrderService>();

var provider = services.BuildServiceProvider();
var order = provider.GetRequiredService<IOrderService>();`,
      hints: ['The DI container cannot resolve unregistered dependencies.', 'Register IEmailService before resolving IOrderService.', 'Check all constructor parameters are registered.'],
      concepts: ['missing registration', 'InvalidOperationException', 'dependency chain'],
    },
    {
      id: 'cs-di-15',
      title: 'Service Locator Anti-Pattern Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the service locator anti-pattern.',
      skeleton: `class OrderService
{
    private readonly IServiceProvider _sp;
    public OrderService(IServiceProvider sp) => _sp = sp;

    public void Process()
    {
        // Anti-pattern: resolving inside methods
        var email = _sp.GetRequiredService<IEmailService>();
        var logger = _sp.GetRequiredService<ILogger>();
        logger.Log("Processing");
        email.Send("done");
    }
}`,
      solution: `class OrderService
{
    private readonly IEmailService _email;
    private readonly ILogger _logger;

    public OrderService(IEmailService email, ILogger logger)
    {
        _email = email;
        _logger = logger;
    }

    public void Process()
    {
        _logger.Log("Processing");
        _email.Send("done");
    }
}`,
      hints: ['Service locator hides dependencies and makes testing harder.', 'Inject dependencies directly through the constructor.', 'This makes dependencies explicit and testable.'],
      concepts: ['service locator anti-pattern', 'constructor injection', 'explicit dependencies'],
    },
    {
      id: 'cs-di-16',
      title: 'Predict Transient Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict whether transient services are the same instance.',
      skeleton: `services.AddTransient<IService, MyService>();
var provider = services.BuildServiceProvider();
var a = provider.GetRequiredService<IService>();
var b = provider.GetRequiredService<IService>();
Console.WriteLine(ReferenceEquals(a, b));`,
      solution: `False`,
      hints: ['Transient creates a new instance each time.', 'Two resolutions give two different objects.', 'ReferenceEquals checks if they are the same instance.'],
      concepts: ['transient lifetime', 'ReferenceEquals', 'instance identity'],
    },
    {
      id: 'cs-di-17',
      title: 'Predict Singleton Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict whether singleton services are the same instance.',
      skeleton: `services.AddSingleton<IService, MyService>();
var provider = services.BuildServiceProvider();
var a = provider.GetRequiredService<IService>();
var b = provider.GetRequiredService<IService>();
Console.WriteLine(ReferenceEquals(a, b));`,
      solution: `True`,
      hints: ['Singleton creates exactly one instance.', 'All resolutions return the same object.', 'ReferenceEquals returns true for the same reference.'],
      concepts: ['singleton lifetime', 'single instance'],
    },
    {
      id: 'cs-di-18',
      title: 'Predict Scoped Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict scoped service identity across scopes.',
      skeleton: `services.AddScoped<IService, MyService>();
var provider = services.BuildServiceProvider();
using var scope1 = provider.CreateScope();
var a = scope1.ServiceProvider.GetRequiredService<IService>();
var b = scope1.ServiceProvider.GetRequiredService<IService>();
using var scope2 = provider.CreateScope();
var c = scope2.ServiceProvider.GetRequiredService<IService>();
Console.WriteLine(ReferenceEquals(a, b));
Console.WriteLine(ReferenceEquals(a, c));`,
      solution: `True
False`,
      hints: ['Within the same scope, the instance is reused.', 'Different scopes get different instances.', 'a and b are same scope, a and c are different scopes.'],
      concepts: ['scoped lifetime', 'scope identity', 'per-scope instances'],
    },
    {
      id: 'cs-di-19',
      title: 'Refactor Static Dependencies',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor static method calls to use injected services.',
      skeleton: `class ReportGenerator
{
    public string Generate(int userId)
    {
        var user = Database.GetUser(userId);    // static call
        var template = FileHelper.ReadTemplate("report.html"); // static call
        Logger.Log("Generating report");        // static call
        return template.Replace("{name}", user.Name);
    }
}`,
      solution: `class ReportGenerator
{
    private readonly IDatabase _db;
    private readonly IFileHelper _files;
    private readonly ILogger _logger;

    public ReportGenerator(IDatabase db, IFileHelper files, ILogger logger)
    {
        _db = db;
        _files = files;
        _logger = logger;
    }

    public string Generate(int userId)
    {
        var user = _db.GetUser(userId);
        var template = _files.ReadTemplate("report.html");
        _logger.Log("Generating report");
        return template.Replace("{name}", user.Name);
    }
}`,
      hints: ['Static calls create hidden coupling.', 'Define interfaces for each dependency.', 'Inject them via constructor parameters.'],
      concepts: ['dependency inversion', 'testability', 'interface abstraction'],
    },
    {
      id: 'cs-di-20',
      title: 'Refactor to Generic Registration',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor repeated repository registrations to use open generics.',
      skeleton: `services.AddScoped<IRepository<User>, Repository<User>>();
services.AddScoped<IRepository<Order>, Repository<Order>>();
services.AddScoped<IRepository<Product>, Repository<Product>>();
services.AddScoped<IRepository<Category>, Repository<Category>>();`,
      solution: `services.AddScoped(typeof(IRepository<>), typeof(Repository<>));`,
      hints: ['Open generic registration handles all closed generics.', 'Use typeof with <> for open generic types.', 'One registration covers User, Order, Product, Category, etc.'],
      concepts: ['open generic registration', 'typeof', 'generic repository'],
    },
  ],
};
