import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-capstone',
  title: '50. Capstone Exercises',
  explanation: `## Capstone Exercises

Congratulations on reaching the capstone section! These exercises combine concepts from across the entire C# learning track. Each exercise draws from multiple topic areas, testing your ability to synthesize what you have learned.

These challenges are designed to simulate real-world scenarios where multiple language features interact. You will combine generics with LINQ, async/await with error handling, pattern matching with records, design patterns with dependency injection, and much more.

### What to Expect

- Exercises that span multiple concept areas
- More complex problem statements
- Solutions that require thoughtful design choices
- Real-world patterns and idioms

### Tips

- Read the full problem before starting
- Identify which concepts are involved
- Plan your approach before writing code
- Consider edge cases and error handling
- Think about maintainability and readability

Good luck, and enjoy putting it all together!`,
  exercises: [
    {
      id: 'cs-capstone-1',
      title: 'Generic Result Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Complete a generic Result<T> type using records and pattern matching.',
      skeleton: `public abstract __BLANK__ Result<T>;
public record Success<T>(T Value) : Result<T>;
public record Failure<T>(string Error) : Result<T>;

// Usage with pattern matching:
Result<int> result = new Success<int>(42);
var message = result switch
{
    Success<int> s => $"Got: {s.Value}",
    Failure<int> f => $"Error: {f.Error}",
    _ => "Unknown"
};`,
      solution: `public abstract record Result<T>;
public record Success<T>(T Value) : Result<T>;
public record Failure<T>(string Error) : Result<T>;

// Usage with pattern matching:
Result<int> result = new Success<int>(42);
var message = result switch
{
    Success<int> s => $"Got: {s.Value}",
    Failure<int> f => $"Error: {f.Error}",
    _ => "Unknown"
};`,
      hints: ['Records can be abstract to serve as base types.', 'This combines generics, records, and pattern matching.', 'The answer is: record'],
      concepts: ['generics', 'records', 'pattern matching', 'discriminated unions'],
    },
    {
      id: 'cs-capstone-2',
      title: 'LINQ Pipeline with Records',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Complete a LINQ pipeline that transforms records.',
      skeleton: `public record Order(int Id, string Customer, List<OrderLine> Lines);
public record OrderLine(string Product, int Qty, decimal Price);
public record OrderSummary(string Customer, decimal Total, int ItemCount);

var summaries = orders
    .Select(o => new OrderSummary(
        o.Customer,
        o.Lines.__BLANK__(l => l.Qty * l.Price),
        o.Lines.Sum(l => l.Qty)))
    .OrderByDescending(s => s.Total)
    .ToList();`,
      solution: `public record Order(int Id, string Customer, List<OrderLine> Lines);
public record OrderLine(string Product, int Qty, decimal Price);
public record OrderSummary(string Customer, decimal Total, int ItemCount);

var summaries = orders
    .Select(o => new OrderSummary(
        o.Customer,
        o.Lines.Sum(l => l.Qty * l.Price),
        o.Lines.Sum(l => l.Qty)))
    .OrderByDescending(s => s.Total)
    .ToList();`,
      hints: ['This LINQ method aggregates values by a selector.', 'It calculates the total of Qty * Price.', 'The answer is: Sum'],
      concepts: ['LINQ', 'records', 'Sum', 'projection'],
    },
    {
      id: 'cs-capstone-3',
      title: 'Async with Pattern Matching',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Combine async/await with pattern matching for API response handling.',
      skeleton: `public async Task<string> FetchUserName(int id)
{
    var response = await _httpClient.GetAsync($"/users/{id}");

    return response.StatusCode __BLANK__
    {
        HttpStatusCode.OK => await response.Content.ReadAsStringAsync(),
        HttpStatusCode.NotFound => "Unknown User",
        HttpStatusCode.Unauthorized => throw new UnauthorizedAccessException(),
        _ => throw new HttpRequestException($"Status: {response.StatusCode}")
    };
}`,
      solution: `public async Task<string> FetchUserName(int id)
{
    var response = await _httpClient.GetAsync($"/users/{id}");

    return response.StatusCode switch
    {
        HttpStatusCode.OK => await response.Content.ReadAsStringAsync(),
        HttpStatusCode.NotFound => "Unknown User",
        HttpStatusCode.Unauthorized => throw new UnauthorizedAccessException(),
        _ => throw new HttpRequestException($"Status: {response.StatusCode}")
    };
}`,
      hints: ['This keyword enables pattern matching on the status code.', 'Each arm can contain await expressions.', 'The answer is: switch'],
      concepts: ['async/await', 'pattern matching', 'HTTP client', 'error handling'],
    },
    {
      id: 'cs-capstone-4',
      title: 'Generic Repository with LINQ',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Complete a generic repository method using LINQ expressions.',
      skeleton: `public class Repository<T> where T : class
{
    private readonly DbContext _db;

    public async Task<List<T>> FindAsync(__BLANK__<Func<T, bool>> predicate)
    {
        return await _db.Set<T>()
            .Where(predicate)
            .ToListAsync();
    }
}`,
      solution: `public class Repository<T> where T : class
{
    private readonly DbContext _db;

    public async Task<List<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        return await _db.Set<T>()
            .Where(predicate)
            .ToListAsync();
    }
}`,
      hints: ['EF Core needs expression trees, not raw delegates.', 'This type wraps a delegate as an analyzable tree.', 'The answer is: Expression'],
      concepts: ['generics', 'Expression<T>', 'EF Core', 'LINQ'],
    },
    {
      id: 'cs-capstone-5',
      title: 'Channel-Based Pipeline',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Complete a producer-consumer pipeline using channels and async.',
      skeleton: `var channel = Channel.CreateBounded<int>(100);

// Producer
_ = Task.Run(async () =>
{
    for (int i = 0; i < 1000; i++)
        await channel.Writer.__BLANK__(i);
    channel.Writer.Complete();
});

// Consumer
await foreach (var item in channel.Reader.ReadAllAsync())
{
    Console.WriteLine($"Processing: {item}");
}`,
      solution: `var channel = Channel.CreateBounded<int>(100);

// Producer
_ = Task.Run(async () =>
{
    for (int i = 0; i < 1000; i++)
        await channel.Writer.WriteAsync(i);
    channel.Writer.Complete();
});

// Consumer
await foreach (var item in channel.Reader.ReadAllAsync())
{
    Console.WriteLine($"Processing: {item}");
}`,
      hints: ['This async method writes a value to the channel.', 'It awaits if the channel is full (bounded).', 'The answer is: WriteAsync'],
      concepts: ['Channel<T>', 'async/await', 'producer-consumer', 'await foreach'],
    },
    {
      id: 'cs-capstone-6',
      title: 'Nullable + Pattern Matching Guard',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Combine nullable reference types with pattern matching for safe access.',
      skeleton: `public string DescribeUser(User? user) => user switch
{
    { Name: var name, Age: >= 18 } __BLANK__ !string.IsNullOrEmpty(name)
        => $"Adult: {name}",
    { Age: < 18 } => "Minor",
    null => "No user",
    _ => "Unknown"
};`,
      solution: `public string DescribeUser(User? user) => user switch
{
    { Name: var name, Age: >= 18 } when !string.IsNullOrEmpty(name)
        => $"Adult: {name}",
    { Age: < 18 } => "Minor",
    null => "No user",
    _ => "Unknown"
};`,
      hints: ['This keyword adds a condition to a pattern match arm.', 'It acts as a guard clause on the pattern.', 'The answer is: when'],
      concepts: ['nullable', 'pattern matching', 'when guard', 'property patterns'],
    },
    {
      id: 'cs-capstone-7',
      title: 'Event-Driven Service',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Build an event-driven order processing service combining events, async, and records.',
      skeleton: `// Create:
// record OrderPlaced(int OrderId, string Product, int Qty)
// class OrderEventBus with event and async publish
// class InventoryService that subscribes and tracks stock
// class NotificationService that subscribes and logs notifications`,
      solution: `public record OrderPlaced(int OrderId, string Product, int Qty);

public class OrderEventBus
{
    public event Func<OrderPlaced, Task>? OnOrderPlaced;

    public async Task PublishAsync(OrderPlaced order)
    {
        if (OnOrderPlaced is not null)
        {
            foreach (var handler in OnOrderPlaced.GetInvocationList().Cast<Func<OrderPlaced, Task>>())
            {
                await handler(order);
            }
        }
    }
}

public class InventoryService
{
    private readonly Dictionary<string, int> _stock = new();

    public InventoryService(OrderEventBus bus)
    {
        bus.OnOrderPlaced += HandleOrderAsync;
    }

    private Task HandleOrderAsync(OrderPlaced order)
    {
        _stock.TryGetValue(order.Product, out var current);
        _stock[order.Product] = current - order.Qty;
        Console.WriteLine($"Inventory updated: {order.Product} = {_stock[order.Product]}");
        return Task.CompletedTask;
    }

    public int GetStock(string product) =>
        _stock.TryGetValue(product, out var qty) ? qty : 0;
}

public class NotificationService
{
    private readonly List<string> _notifications = new();

    public NotificationService(OrderEventBus bus)
    {
        bus.OnOrderPlaced += HandleOrderAsync;
    }

    private Task HandleOrderAsync(OrderPlaced order)
    {
        var msg = $"Order #{order.OrderId}: {order.Qty}x {order.Product}";
        _notifications.Add(msg);
        Console.WriteLine($"Notification: {msg}");
        return Task.CompletedTask;
    }

    public IReadOnlyList<string> Notifications => _notifications;
}`,
      hints: ['Use Func<OrderPlaced, Task> for async event delegates.', 'Iterate GetInvocationList for sequential async execution.', 'Each service subscribes in its constructor.'],
      concepts: ['events', 'async', 'records', 'decoupled services'],
    },
    {
      id: 'cs-capstone-8',
      title: 'Generic Pipeline with LINQ',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Build a generic data processing pipeline that chains transformations using LINQ and generics.',
      skeleton: `// Create Pipeline<T> class that:
// - Stores a list of Func<IEnumerable<T>, IEnumerable<T>> steps
// - AddStep method to add transformations
// - Execute(IEnumerable<T> source) runs all steps in order
// Use it to filter, transform, and sort data`,
      solution: `public class Pipeline<T>
{
    private readonly List<Func<IEnumerable<T>, IEnumerable<T>>> _steps = new();

    public Pipeline<T> AddStep(Func<IEnumerable<T>, IEnumerable<T>> step)
    {
        _steps.Add(step);
        return this;
    }

    public Pipeline<T> Where(Func<T, bool> predicate) =>
        AddStep(data => data.Where(predicate));

    public Pipeline<T> OrderBy<TKey>(Func<T, TKey> keySelector) =>
        AddStep(data => data.OrderBy(keySelector));

    public Pipeline<T> Take(int count) =>
        AddStep(data => data.Take(count));

    public IEnumerable<T> Execute(IEnumerable<T> source)
    {
        return _steps.Aggregate(source,
            (current, step) => step(current));
    }
}

// Usage:
// var result = new Pipeline<int>()
//     .Where(x => x > 0)
//     .OrderBy(x => x)
//     .Take(10)
//     .Execute(numbers);`,
      hints: ['Store steps as Func<IEnumerable<T>, IEnumerable<T>>.', 'Use LINQ Aggregate to chain steps.', 'Return this for fluent API.'],
      concepts: ['generics', 'LINQ', 'Aggregate', 'fluent API', 'pipeline'],
    },
    {
      id: 'cs-capstone-9',
      title: 'Strategy + DI + Records',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Build a discount system using strategy pattern, DI, and records.',
      skeleton: `// record CartItem(string Name, decimal Price, int Qty)
// interface IDiscountStrategy with decimal Apply(List<CartItem> items)
// PercentageDiscount, BulkDiscount, NoDiscount implementations
// CartService that takes IDiscountStrategy via DI
// CalculateTotal returns the final total after discount`,
      solution: `public record CartItem(string Name, decimal Price, int Qty);

public interface IDiscountStrategy
{
    decimal Apply(List<CartItem> items);
}

public class NoDiscount : IDiscountStrategy
{
    public decimal Apply(List<CartItem> items) => 0m;
}

public class PercentageDiscount : IDiscountStrategy
{
    private readonly decimal _percent;
    public PercentageDiscount(decimal percent) => _percent = percent;

    public decimal Apply(List<CartItem> items)
    {
        var subtotal = items.Sum(i => i.Price * i.Qty);
        return subtotal * (_percent / 100m);
    }
}

public class BulkDiscount : IDiscountStrategy
{
    private readonly int _threshold;
    private readonly decimal _discountPerItem;

    public BulkDiscount(int threshold, decimal discountPerItem)
    {
        _threshold = threshold;
        _discountPerItem = discountPerItem;
    }

    public decimal Apply(List<CartItem> items)
    {
        return items
            .Where(i => i.Qty >= _threshold)
            .Sum(i => i.Qty * _discountPerItem);
    }
}

public class CartService
{
    private readonly IDiscountStrategy _discount;

    public CartService(IDiscountStrategy discount) => _discount = discount;

    public decimal CalculateTotal(List<CartItem> items)
    {
        var subtotal = items.Sum(i => i.Price * i.Qty);
        var discount = _discount.Apply(items);
        return subtotal - discount;
    }
}`,
      hints: ['Records hold the cart data immutably.', 'Each discount strategy calculates the discount amount.', 'CartService combines LINQ totaling with strategy pattern.'],
      concepts: ['strategy pattern', 'records', 'LINQ', 'dependency injection'],
    },
    {
      id: 'cs-capstone-10',
      title: 'Async Retry with Result<T>',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Build an async retry utility that returns a Result<T> instead of throwing exceptions.',
      skeleton: `// Create:
// abstract record Result<T> with Success<T> and Failure<T> subrecords
// static async Task<Result<T>> RetryAsync<T>(
//     Func<Task<T>> operation, int maxRetries, TimeSpan delay)
// Returns Success on first successful attempt
// Returns Failure with last error message after all retries exhausted`,
      solution: `public abstract record Result<T>;
public record Success<T>(T Value) : Result<T>;
public record Failure<T>(string Error) : Result<T>;

public static class Retry
{
    public static async Task<Result<T>> RetryAsync<T>(
        Func<Task<T>> operation,
        int maxRetries = 3,
        TimeSpan? delay = null)
    {
        var actualDelay = delay ?? TimeSpan.FromMilliseconds(100);
        Exception? lastException = null;

        for (int attempt = 0; attempt <= maxRetries; attempt++)
        {
            try
            {
                var result = await operation();
                return new Success<T>(result);
            }
            catch (Exception ex)
            {
                lastException = ex;
                if (attempt < maxRetries)
                    await Task.Delay(actualDelay);
            }
        }

        return new Failure<T>(lastException?.Message ?? "Unknown error");
    }
}

// Usage:
// var result = await Retry.RetryAsync(() => httpClient.GetStringAsync(url));
// if (result is Success<string> s) Console.WriteLine(s.Value);`,
      hints: ['Wrap try/catch in a retry loop.', 'Return Success<T> on success, Failure<T> after exhausting retries.', 'Use records for the discriminated union result type.'],
      concepts: ['async/await', 'retry pattern', 'records', 'generics', 'error handling'],
    },
    {
      id: 'cs-capstone-11',
      title: 'Decorator + Async + Generics',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Create a generic async caching decorator for any service interface.',
      skeleton: `// Create:
// interface IDataFetcher<T> with Task<T?> FetchAsync(string key)
// CachingFetcher<T> decorator that wraps IDataFetcher<T>
// Uses ConcurrentDictionary for thread-safe cache
// Cache entries expire after a configurable TimeSpan`,
      solution: `public interface IDataFetcher<T>
{
    Task<T?> FetchAsync(string key);
}

public class CachingFetcher<T> : IDataFetcher<T>
{
    private readonly IDataFetcher<T> _inner;
    private readonly TimeSpan _ttl;
    private readonly ConcurrentDictionary<string, (T? Value, DateTime Expiry)> _cache = new();

    public CachingFetcher(IDataFetcher<T> inner, TimeSpan ttl)
    {
        _inner = inner;
        _ttl = ttl;
    }

    public async Task<T?> FetchAsync(string key)
    {
        if (_cache.TryGetValue(key, out var entry) && entry.Expiry > DateTime.UtcNow)
        {
            return entry.Value;
        }

        var value = await _inner.FetchAsync(key);
        _cache[key] = (value, DateTime.UtcNow.Add(_ttl));
        return value;
    }
}

// Usage:
// IDataFetcher<User> fetcher = new CachingFetcher<User>(
//     new ApiFetcher<User>(), TimeSpan.FromMinutes(5));`,
      hints: ['Use ConcurrentDictionary for thread safety.', 'Store both the value and expiry time as a tuple.', 'Check expiry before returning cached value.'],
      concepts: ['decorator pattern', 'async/await', 'generics', 'ConcurrentDictionary', 'caching'],
    },
    {
      id: 'cs-capstone-12',
      title: 'Minimal API + EF Core + Validation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Build a complete minimal API endpoint with EF Core, validation, and error handling.',
      skeleton: `// Create a POST /api/products endpoint that:
// - Accepts a CreateProductRequest record
// - Validates: Name required, Price > 0
// - Saves to DB via EF Core
// - Returns 201 with the created product
// - Returns 400 with validation errors
// - Returns 500 on database errors`,
      solution: `public record CreateProductRequest(string Name, decimal Price, string? Description);

app.MapPost("/api/products", async (CreateProductRequest request, AppDbContext db) =>
{
    // Validation
    var errors = new List<string>();
    if (string.IsNullOrWhiteSpace(request.Name))
        errors.Add("Name is required");
    if (request.Price <= 0)
        errors.Add("Price must be greater than 0");

    if (errors.Count > 0)
        return Results.BadRequest(new { Errors = errors });

    try
    {
        var product = new Product
        {
            Name = request.Name,
            Price = request.Price,
            Description = request.Description ?? "",
            CreatedAt = DateTime.UtcNow
        };

        db.Products.Add(product);
        await db.SaveChangesAsync();

        return Results.Created($"/api/products/{product.Id}", product);
    }
    catch (Exception ex)
    {
        return Results.Problem(
            detail: ex.Message,
            statusCode: StatusCodes.Status500InternalServerError);
    }
})
.WithName("CreateProduct")
.Produces<Product>(StatusCodes.Status201Created)
.ProducesValidationProblem()
.Produces(StatusCodes.Status500InternalServerError);`,
      hints: ['Validate the request before database operations.', 'Use Results.BadRequest for validation failures.', 'Wrap EF Core calls in try/catch for database errors.'],
      concepts: ['minimal API', 'EF Core', 'validation', 'records', 'error handling'],
    },
    {
      id: 'cs-capstone-13',
      title: 'Broken Generic Constraint',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the generic method that fails because of a missing constraint.',
      skeleton: `public static T Max<T>(T a, T b)
{
    // Bug: Compile error - cannot use > operator on T
    return a > b ? a : b;
}`,
      solution: `public static T Max<T>(T a, T b) where T : IComparable<T>
{
    return a.CompareTo(b) > 0 ? a : b;
}`,
      hints: ['Unconstrained generics do not support operators.', 'Add a constraint requiring IComparable<T>.', 'Use CompareTo instead of > operator.'],
      concepts: ['generic constraints', 'IComparable<T>', 'CompareTo'],
    },
    {
      id: 'cs-capstone-14',
      title: 'Async Deadlock',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the async code that causes a deadlock by blocking on an async method.',
      skeleton: `public class DataService
{
    private readonly HttpClient _http;

    public string GetData()
    {
        // Bug: .Result causes deadlock in ASP.NET/UI contexts
        var data = _http.GetStringAsync("/api/data").Result;
        return data;
    }
}`,
      solution: `public class DataService
{
    private readonly HttpClient _http;

    public async Task<string> GetDataAsync()
    {
        var data = await _http.GetStringAsync("/api/data");
        return data;
    }
}`,
      hints: ['Never use .Result or .Wait() on async methods in synchronous contexts.', 'Make the method async and return Task<string>.', 'Use await instead of .Result.'],
      concepts: ['async/await', 'deadlock', '.Result anti-pattern', 'Task<T>'],
    },
    {
      id: 'cs-capstone-15',
      title: 'EF Core Lazy Loading Trap',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the serialization error caused by lazy loading circular references.',
      skeleton: `app.MapGet("/api/orders", async (AppDbContext db) =>
{
    // Bug: lazy loading causes circular reference during JSON serialization
    var orders = await db.Orders.ToListAsync();
    return Results.Ok(orders);
    // Throws: JsonException - A possible object cycle was detected
});`,
      solution: `app.MapGet("/api/orders", async (AppDbContext db) =>
{
    var orders = await db.Orders
        .AsNoTracking()
        .Select(o => new
        {
            o.Id,
            o.OrderDate,
            o.Total,
            Items = o.Items.Select(i => new
            {
                i.Id,
                i.ProductName,
                i.Quantity,
                i.UnitPrice
            })
        })
        .ToListAsync();
    return Results.Ok(orders);
});`,
      hints: ['Use projection (Select) to control what gets serialized.', 'AsNoTracking avoids unnecessary tracking overhead.', 'Anonymous types break the circular reference chain.'],
      concepts: ['EF Core', 'JSON serialization', 'projection', 'circular references'],
    },
    {
      id: 'cs-capstone-16',
      title: 'Predict Generic + LINQ',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of a generic method combined with LINQ.',
      skeleton: `public static IEnumerable<T> TakeWhilePositive<T>(IEnumerable<T> source)
    where T : IComparable<T>
{
    var zero = default(T)!;
    return source.TakeWhile(x => x.CompareTo(zero) > 0);
}

var nums = new[] { 5, 3, 0, 4, 2 };
var result = TakeWhilePositive(nums);
Console.Write(string.Join(",", result));`,
      solution: `5,3`,
      hints: ['TakeWhile stops at the first element that fails the predicate.', 'default(int) is 0; elements > 0 are taken.', '5 and 3 pass; 0 fails, stopping the sequence.'],
      concepts: ['generics', 'TakeWhile', 'IComparable<T>', 'LINQ'],
    },
    {
      id: 'cs-capstone-17',
      title: 'Predict Pattern + Records',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of pattern matching on a record hierarchy.',
      skeleton: `public abstract record Shape;
public record Circle(double Radius) : Shape;
public record Rect(double W, double H) : Shape;

Shape[] shapes = { new Circle(5), new Rect(3, 4), new Circle(0) };

foreach (var s in shapes)
{
    var desc = s switch
    {
        Circle { Radius: > 0 } c => $"C:{c.Radius}",
        Circle => "Empty",
        Rect r when r.W == r.H => "Square",
        Rect r => $"R:{r.W}x{r.H}",
    };
    Console.Write(desc + " ");
}`,
      solution: `C:5 R:3x4 Empty `,
      hints: ['Circle(5) matches first pattern: Radius > 0.', 'Rect(3,4) does not match Square (W != H), matches general Rect.', 'Circle(0) does not match Radius > 0, matches plain Circle.'],
      concepts: ['records', 'pattern matching', 'property patterns', 'when guard'],
    },
    {
      id: 'cs-capstone-18',
      title: 'Predict Async + Channel',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Predict the output of an async channel-based pipeline.',
      skeleton: `var ch = Channel.CreateUnbounded<int>();
var writer = ch.Writer;
var reader = ch.Reader;

await writer.WriteAsync(10);
await writer.WriteAsync(20);
writer.Complete();

var sum = 0;
await foreach (var item in reader.ReadAllAsync())
{
    sum += item;
}
Console.Write(sum);`,
      solution: `30`,
      hints: ['Two values are written: 10 and 20.', 'ReadAllAsync reads all values until the writer is completed.', 'sum = 10 + 20 = 30.'],
      concepts: ['Channel<T>', 'await foreach', 'async pipeline', 'ReadAllAsync'],
    },
    {
      id: 'cs-capstone-19',
      title: 'Refactor Monolith to Pipeline',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor a monolithic data processing method into a composable pipeline using generics, LINQ, and strategy pattern.',
      skeleton: `public List<Report> GenerateReports(List<RawData> data)
{
    // Filter invalid entries
    var valid = new List<RawData>();
    foreach (var d in data)
        if (d.Amount > 0 && !string.IsNullOrEmpty(d.Category))
            valid.Add(d);

    // Group by category
    var groups = new Dictionary<string, List<RawData>>();
    foreach (var d in valid)
    {
        if (!groups.ContainsKey(d.Category))
            groups[d.Category] = new List<RawData>();
        groups[d.Category].Add(d);
    }

    // Aggregate
    var reports = new List<Report>();
    foreach (var kvp in groups)
    {
        var total = 0m;
        foreach (var d in kvp.Value) total += d.Amount;
        reports.Add(new Report { Category = kvp.Key, Total = total, Count = kvp.Value.Count });
    }

    // Sort
    reports.Sort((a, b) => b.Total.CompareTo(a.Total));
    return reports;
}`,
      solution: `public record RawData(string Category, decimal Amount);
public record Report(string Category, decimal Total, int Count);

public List<Report> GenerateReports(List<RawData> data)
{
    return data
        .Where(d => d.Amount > 0 && !string.IsNullOrEmpty(d.Category))
        .GroupBy(d => d.Category)
        .Select(g => new Report(
            Category: g.Key,
            Total: g.Sum(d => d.Amount),
            Count: g.Count()))
        .OrderByDescending(r => r.Total)
        .ToList();
}`,
      hints: ['Replace manual loops with LINQ Where, GroupBy, Select.', 'Use records for immutable data types.', 'The entire pipeline becomes a single LINQ chain.'],
      concepts: ['LINQ', 'records', 'GroupBy', 'refactoring', 'functional style'],
    },
    {
      id: 'cs-capstone-20',
      title: 'Refactor to Clean Architecture',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor tightly-coupled code into clean architecture with interfaces, DI, records, and async.',
      skeleton: `public class UserController
{
    public string CreateUser(string name, string email)
    {
        // Direct database access
        using var conn = new SqlConnection("Server=localhost;Database=app");
        conn.Open();
        var cmd = new SqlCommand(
            $"INSERT INTO Users (Name, Email) VALUES ('{name}', '{email}')", conn);
        cmd.ExecuteNonQuery();

        // Direct email sending
        var smtp = new SmtpClient("smtp.example.com");
        smtp.Send("admin@app.com", email, "Welcome", $"Hi {name}!");

        return "User created";
    }
}`,
      solution: `// DTOs
public record CreateUserRequest(string Name, string Email);
public record CreateUserResponse(int Id, string Name, string Email);

// Interfaces
public interface IUserRepository
{
    Task<int> CreateAsync(CreateUserRequest request);
}

public interface IEmailService
{
    Task SendWelcomeAsync(string to, string name);
}

// Service
public class UserService
{
    private readonly IUserRepository _repo;
    private readonly IEmailService _email;

    public UserService(IUserRepository repo, IEmailService email)
    {
        _repo = repo;
        _email = email;
    }

    public async Task<CreateUserResponse> CreateAsync(CreateUserRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            throw new ArgumentException("Name is required");
        if (string.IsNullOrWhiteSpace(request.Email))
            throw new ArgumentException("Email is required");

        var id = await _repo.CreateAsync(request);
        await _email.SendWelcomeAsync(request.Email, request.Name);

        return new CreateUserResponse(id, request.Name, request.Email);
    }
}

// Endpoint (minimal API)
// app.MapPost("/users", async (CreateUserRequest req, UserService svc) =>
//     Results.Created($"/users/{(await svc.CreateAsync(req)).Id}", await svc.CreateAsync(req)));

// DI registration:
// services.AddScoped<IUserRepository, SqlUserRepository>();
// services.AddScoped<IEmailService, SmtpEmailService>();
// services.AddScoped<UserService>();`,
      hints: ['Extract interfaces for database and email dependencies.', 'Use records for request/response DTOs.', 'Make everything async and inject via DI.'],
      concepts: ['clean architecture', 'dependency injection', 'records', 'async/await', 'interfaces', 'SOLID'],
    },
  ],
};
