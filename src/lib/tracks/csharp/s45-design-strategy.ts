import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-design-strategy',
  title: '45. Strategy Pattern',
  explanation: `## Strategy Pattern

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. The algorithm varies independently from the clients that use it.

\`\`\`csharp
// Interface-based strategy
public interface ISortStrategy<T>
{
    void Sort(List<T> data);
}

public class BubbleSort<T> : ISortStrategy<T> where T : IComparable<T>
{
    public void Sort(List<T> data) { /* bubble sort logic */ }
}

public class QuickSort<T> : ISortStrategy<T> where T : IComparable<T>
{
    public void Sort(List<T> data) { /* quicksort logic */ }
}
\`\`\`

### Delegate-Based Strategies

In C#, strategies can be expressed as delegates for lighter-weight scenarios:

\`\`\`csharp
public class Processor
{
    private readonly Func<int, int> _transform;

    public Processor(Func<int, int> transform) => _transform = transform;

    public int Process(int value) => _transform(value);
}

// Usage:
var doubler = new Processor(x => x * 2);
var squarer = new Processor(x => x * x);
\`\`\`

### DI Integration

Strategies integrate naturally with dependency injection:

\`\`\`csharp
services.AddTransient<ISortStrategy<int>, QuickSort<int>>();
\`\`\`

### Runtime Switching

The context object can switch strategies at runtime:

\`\`\`csharp
public class ShippingCalculator
{
    public IShippingStrategy Strategy { get; set; }

    public decimal Calculate(Order order) => Strategy.Calculate(order);
}
\`\`\`

### When to Use

- Multiple algorithms for the same task
- Need to switch behavior at runtime
- Want to eliminate large conditional blocks
- Need to isolate algorithm-specific data and behavior`,
  exercises: [
    {
      id: 'cs-strategy-1',
      title: 'Strategy Interface',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Define a strategy interface with a single method.',
      skeleton: `public __BLANK__ ICompression
{
    byte[] Compress(byte[] data);
    byte[] Decompress(byte[] data);
}`,
      solution: `public interface ICompression
{
    byte[] Compress(byte[] data);
    byte[] Decompress(byte[] data);
}`,
      hints: ['Strategies are defined as a contract with method signatures.', 'This keyword defines a contract without implementation.', 'The answer is: interface'],
      concepts: ['interface', 'strategy contract', 'abstraction'],
    },
    {
      id: 'cs-strategy-2',
      title: 'Injecting a Strategy',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Inject a strategy via constructor injection.',
      skeleton: `public class PaymentProcessor
{
    private readonly IPaymentStrategy __BLANK__;

    public PaymentProcessor(IPaymentStrategy strategy)
    {
        _strategy = strategy;
    }

    public void Pay(decimal amount) => _strategy.Process(amount);
}`,
      solution: `public class PaymentProcessor
{
    private readonly IPaymentStrategy _strategy;

    public PaymentProcessor(IPaymentStrategy strategy)
    {
        _strategy = strategy;
    }

    public void Pay(decimal amount) => _strategy.Process(amount);
}`,
      hints: ['The field stores the injected strategy.', 'Follow C# naming convention for private fields.', 'The answer is: _strategy'],
      concepts: ['constructor injection', 'strategy pattern', 'field naming'],
    },
    {
      id: 'cs-strategy-3',
      title: 'Func Strategy',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use a Func delegate as a lightweight strategy.',
      skeleton: `public class Validator
{
    private readonly __BLANK__<string, bool> _rule;

    public Validator(Func<string, bool> rule) => _rule = rule;

    public bool IsValid(string input) => _rule(input);
}`,
      solution: `public class Validator
{
    private readonly Func<string, bool> _rule;

    public Validator(Func<string, bool> rule) => _rule = rule;

    public bool IsValid(string input) => _rule(input);
}`,
      hints: ['This delegate takes an input and returns a result.', 'The last type parameter is the return type.', 'The answer is: Func'],
      concepts: ['Func<T,TResult>', 'delegate strategy', 'lightweight pattern'],
    },
    {
      id: 'cs-strategy-4',
      title: 'Strategy Selection',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Select a strategy based on runtime configuration.',
      skeleton: `public IShippingStrategy GetStrategy(string method) => method __BLANK__
{
    "ground" => new GroundShipping(),
    "air" => new AirShipping(),
    "express" => new ExpressShipping(),
    _ => throw new ArgumentException($"Unknown method: {method}")
};`,
      solution: `public IShippingStrategy GetStrategy(string method) => method switch
{
    "ground" => new GroundShipping(),
    "air" => new AirShipping(),
    "express" => new ExpressShipping(),
    _ => throw new ArgumentException($"Unknown method: {method}")
};`,
      hints: ['Use pattern matching to select the strategy.', 'This keyword follows the value being matched.', 'The answer is: switch'],
      concepts: ['switch expression', 'strategy selection', 'runtime dispatch'],
    },
    {
      id: 'cs-strategy-5',
      title: 'DI Strategy Registration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Register a strategy implementation in the DI container.',
      skeleton: `services.__BLANK__<IEncryptionStrategy, AesEncryption>();`,
      solution: `services.AddTransient<IEncryptionStrategy, AesEncryption>();`,
      hints: ['Register the implementation for the interface.', 'Transient creates a new instance each time.', 'The answer is: AddTransient'],
      concepts: ['AddTransient', 'DI registration', 'strategy with DI'],
    },
    {
      id: 'cs-strategy-6',
      title: 'Strategy Property Setter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Allow runtime strategy switching via a property.',
      skeleton: `public class TextFormatter
{
    public IFormatStrategy Strategy { get; __BLANK__; }

    public string Format(string text) => Strategy.Apply(text);
}`,
      solution: `public class TextFormatter
{
    public IFormatStrategy Strategy { get; set; }

    public string Format(string text) => Strategy.Apply(text);
}`,
      hints: ['The property needs to be changeable at runtime.', 'Both get and set accessors are needed.', 'The answer is: set'],
      concepts: ['property setter', 'runtime switching', 'strategy pattern'],
    },
    {
      id: 'cs-strategy-7',
      title: 'Interface-Based Sort Strategy',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Implement an ISortStrategy interface and two concrete strategies: AscendingSort and DescendingSort for List<int>.',
      skeleton: `// Define ISortStrategy with List<int> Sort(List<int> data)
// Implement AscendingSort and DescendingSort
// Each returns a new sorted list (do not mutate the input)`,
      solution: `public interface ISortStrategy
{
    List<int> Sort(List<int> data);
}

public class AscendingSort : ISortStrategy
{
    public List<int> Sort(List<int> data) =>
        data.OrderBy(x => x).ToList();
}

public class DescendingSort : ISortStrategy
{
    public List<int> Sort(List<int> data) =>
        data.OrderByDescending(x => x).ToList();
}`,
      hints: ['Use LINQ OrderBy and OrderByDescending.', 'Call ToList() to materialize the result.', 'Do not modify the input list.'],
      concepts: ['strategy interface', 'LINQ sorting', 'immutability'],
    },
    {
      id: 'cs-strategy-8',
      title: 'Context Class with Strategy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create a Sorter context class that accepts an ISortStrategy and delegates sorting to it.',
      skeleton: `// Create class Sorter
// - constructor takes ISortStrategy
// - List<int> Execute(List<int> data) delegates to the strategy
// - void ChangeStrategy(ISortStrategy newStrategy) for runtime switching`,
      solution: `public class Sorter
{
    private ISortStrategy _strategy;

    public Sorter(ISortStrategy strategy)
    {
        _strategy = strategy ?? throw new ArgumentNullException(nameof(strategy));
    }

    public List<int> Execute(List<int> data) => _strategy.Sort(data);

    public void ChangeStrategy(ISortStrategy newStrategy)
    {
        _strategy = newStrategy ?? throw new ArgumentNullException(nameof(newStrategy));
    }
}`,
      hints: ['Store the strategy in a private field.', 'Execute delegates to the strategy method.', 'ChangeStrategy replaces the current strategy at runtime.'],
      concepts: ['context class', 'strategy pattern', 'runtime switching'],
    },
    {
      id: 'cs-strategy-9',
      title: 'Delegate-Based Pricing',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create a PricingEngine that uses Func<decimal, decimal> as a discount strategy.',
      skeleton: `// Create class PricingEngine
// - constructor takes Func<decimal, decimal> discountStrategy
// - decimal CalculatePrice(decimal basePrice) applies the strategy
// Create static methods: NoDiscount, TenPercentOff, BuyOneGetHalf`,
      solution: `public class PricingEngine
{
    private readonly Func<decimal, decimal> _discount;

    public PricingEngine(Func<decimal, decimal> discountStrategy)
    {
        _discount = discountStrategy;
    }

    public decimal CalculatePrice(decimal basePrice) => _discount(basePrice);

    public static decimal NoDiscount(decimal price) => price;
    public static decimal TenPercentOff(decimal price) => price * 0.9m;
    public static decimal BuyOneGetHalf(decimal price) => price * 0.75m;
}`,
      hints: ['Func<decimal, decimal> takes a price and returns the discounted price.', 'Static methods can serve as named strategy implementations.', 'Use the m suffix for decimal literals.'],
      concepts: ['Func delegate', 'delegate strategy', 'static methods as strategies'],
    },
    {
      id: 'cs-strategy-10',
      title: 'Strategy with Generics',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Create a generic FilterEngine<T> that accepts an IFilterStrategy<T> to filter collections.',
      skeleton: `// IFilterStrategy<T> with IEnumerable<T> Filter(IEnumerable<T> source)
// FilterEngine<T> with constructor injection and Apply method
// Create EvenNumberFilter : IFilterStrategy<int> (keeps even numbers)
// Create NonEmptyStringFilter : IFilterStrategy<string> (keeps non-empty strings)`,
      solution: `public interface IFilterStrategy<T>
{
    IEnumerable<T> Filter(IEnumerable<T> source);
}

public class FilterEngine<T>
{
    private readonly IFilterStrategy<T> _strategy;

    public FilterEngine(IFilterStrategy<T> strategy) => _strategy = strategy;

    public IEnumerable<T> Apply(IEnumerable<T> source) => _strategy.Filter(source);
}

public class EvenNumberFilter : IFilterStrategy<int>
{
    public IEnumerable<int> Filter(IEnumerable<int> source) =>
        source.Where(x => x % 2 == 0);
}

public class NonEmptyStringFilter : IFilterStrategy<string>
{
    public IEnumerable<string> Filter(IEnumerable<string> source) =>
        source.Where(s => !string.IsNullOrEmpty(s));
}`,
      hints: ['Make both the interface and engine generic on T.', 'Use LINQ Where for the filter implementations.', 'The engine delegates to the strategy.'],
      concepts: ['generic strategy', 'IEnumerable<T>', 'LINQ Where'],
    },
    {
      id: 'cs-strategy-11',
      title: 'Strategy Factory with DI',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Create a strategy factory that resolves named strategies from the DI container.',
      skeleton: `// Create INotificationStrategy with void Send(string message)
// Create EmailStrategy, SmsStrategy, PushStrategy implementations
// Create NotificationStrategyFactory that takes IServiceProvider
// and resolves strategy by name string`,
      solution: `public interface INotificationStrategy
{
    void Send(string message);
}

public class EmailStrategy : INotificationStrategy
{
    public void Send(string message) => Console.WriteLine($"Email: {message}");
}

public class SmsStrategy : INotificationStrategy
{
    public void Send(string message) => Console.WriteLine($"SMS: {message}");
}

public class PushStrategy : INotificationStrategy
{
    public void Send(string message) => Console.WriteLine($"Push: {message}");
}

public class NotificationStrategyFactory
{
    private readonly Dictionary<string, Func<INotificationStrategy>> _factories;

    public NotificationStrategyFactory(IServiceProvider sp)
    {
        _factories = new Dictionary<string, Func<INotificationStrategy>>
        {
            ["email"] = () => sp.GetRequiredService<EmailStrategy>(),
            ["sms"] = () => sp.GetRequiredService<SmsStrategy>(),
            ["push"] = () => sp.GetRequiredService<PushStrategy>(),
        };
    }

    public INotificationStrategy Create(string name) =>
        _factories.TryGetValue(name, out var factory)
            ? factory()
            : throw new ArgumentException($"Unknown strategy: {name}");
}`,
      hints: ['Map strategy names to factory delegates that resolve from IServiceProvider.', 'Use GetRequiredService for each concrete type.', 'The factory returns the appropriate strategy based on the name.'],
      concepts: ['strategy factory', 'IServiceProvider', 'named resolution'],
    },
    {
      id: 'cs-strategy-12',
      title: 'Composable Strategies',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Create a CompositeValidator that combines multiple IValidationStrategy instances.',
      skeleton: `// IValidationStrategy with (bool IsValid, string Error) Validate(string input)
// CompositeValidator that takes multiple strategies and runs all
// Returns first failure or success`,
      solution: `public interface IValidationStrategy
{
    (bool IsValid, string Error) Validate(string input);
}

public class MinLengthStrategy : IValidationStrategy
{
    private readonly int _min;
    public MinLengthStrategy(int min) => _min = min;
    public (bool IsValid, string Error) Validate(string input) =>
        input.Length >= _min ? (true, "") : (false, $"Minimum length is {_min}");
}

public class NoWhitespaceStrategy : IValidationStrategy
{
    public (bool IsValid, string Error) Validate(string input) =>
        !input.Contains(' ') ? (true, "") : (false, "Must not contain spaces");
}

public class CompositeValidator
{
    private readonly IEnumerable<IValidationStrategy> _strategies;

    public CompositeValidator(IEnumerable<IValidationStrategy> strategies)
    {
        _strategies = strategies;
    }

    public (bool IsValid, string Error) Validate(string input)
    {
        foreach (var strategy in _strategies)
        {
            var result = strategy.Validate(input);
            if (!result.IsValid) return result;
        }
        return (true, "");
    }
}`,
      hints: ['The composite holds a collection of strategies.', 'Iterate through strategies, returning on first failure.', 'Use value tuples for the result.'],
      concepts: ['composite pattern', 'strategy composition', 'value tuples'],
    },
    {
      id: 'cs-strategy-13',
      title: 'Wrong Strategy Field Type',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the context that stores a concrete type instead of the strategy interface.',
      skeleton: `public class Encryptor
{
    // Bug: using concrete type instead of interface
    private readonly AesEncryption _strategy;

    public Encryptor(IEncryptionStrategy strategy)
    {
        _strategy = strategy; // Compile error: cannot convert
    }

    public byte[] Encrypt(byte[] data) => _strategy.Encrypt(data);
}`,
      solution: `public class Encryptor
{
    private readonly IEncryptionStrategy _strategy;

    public Encryptor(IEncryptionStrategy strategy)
    {
        _strategy = strategy;
    }

    public byte[] Encrypt(byte[] data) => _strategy.Encrypt(data);
}`,
      hints: ['The field type must match the parameter type.', 'Store the interface, not the concrete class.', 'Change the field type to IEncryptionStrategy.'],
      concepts: ['interface typing', 'strategy pattern', 'polymorphism'],
    },
    {
      id: 'cs-strategy-14',
      title: 'Null Strategy',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the code that crashes when no strategy is set.',
      skeleton: `public class Formatter
{
    public IFormatStrategy? Strategy { get; set; }

    public string Format(string text)
    {
        // Bug: NullReferenceException when Strategy is null
        return Strategy.Apply(text);
    }
}`,
      solution: `public class Formatter
{
    public IFormatStrategy? Strategy { get; set; }

    public string Format(string text)
    {
        return Strategy?.Apply(text) ?? text;
    }
}`,
      hints: ['Strategy could be null if not set.', 'Use null-conditional and null-coalescing operators.', 'Return the original text as fallback when no strategy is set.'],
      concepts: ['null safety', 'null-conditional', 'null-coalescing'],
    },
    {
      id: 'cs-strategy-15',
      title: 'Mutating Input Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the sort strategy that mutates the input list.',
      skeleton: `public class InPlaceSort : ISortStrategy
{
    public List<int> Sort(List<int> data)
    {
        // Bug: mutates the original list
        data.Sort();
        return data;
    }
}`,
      solution: `public class InPlaceSort : ISortStrategy
{
    public List<int> Sort(List<int> data)
    {
        var copy = new List<int>(data);
        copy.Sort();
        return copy;
    }
}`,
      hints: ['The strategy should not modify the input list.', 'Create a copy before sorting.', 'Use new List<int>(data) to clone.'],
      concepts: ['immutability', 'defensive copy', 'side effects'],
    },
    {
      id: 'cs-strategy-16',
      title: 'Predict Strategy Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output when different strategies are applied.',
      skeleton: `Func<int, int> doubler = x => x * 2;
Func<int, int> incrementer = x => x + 1;

var processor = new Processor(doubler);
Console.Write(processor.Process(5));
Console.Write(" ");
processor = new Processor(incrementer);
Console.Write(processor.Process(5));`,
      solution: `10 6`,
      hints: ['First processor uses doubler: 5 * 2 = 10.', 'Second processor uses incrementer: 5 + 1 = 6.', 'Each Processor instance uses its injected strategy.'],
      concepts: ['delegate strategy', 'Func<T,TResult>', 'strategy switching'],
    },
    {
      id: 'cs-strategy-17',
      title: 'Predict Strategy Chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output when strategies are composed.',
      skeleton: `var strategies = new List<Func<string, string>>
{
    s => s.ToUpper(),
    s => s.Trim(),
    s => s.Replace(" ", "-")
};

var input = "  hello world  ";
foreach (var strategy in strategies)
    input = strategy(input);

Console.Write(input);`,
      solution: `  HELLO WORLD  `,
      hints: ['ToUpper first: "  HELLO WORLD  "', 'Trim second: "HELLO WORLD"', 'Wait - the Replace is third. After Trim: "HELLO WORLD". After Replace: "HELLO-WORLD". But order matters: ToUpper("  hello world  ") = "  HELLO WORLD  ", Trim = "HELLO WORLD", Replace = "HELLO-WORLD"'],
      concepts: ['strategy composition', 'execution order', 'string operations'],
    },
    {
      id: 'cs-strategy-18',
      title: 'Predict Delegate Strategy',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict output from a delegate-based discount strategy.',
      skeleton: `Func<decimal, decimal> noDiscount = p => p;
Func<decimal, decimal> halfOff = p => p * 0.5m;

var prices = new[] { 100m, 200m };
var strategy = noDiscount;

Console.Write(strategy(prices[0]));
strategy = halfOff;
Console.Write(" " + strategy(prices[1]));`,
      solution: `100 100`,
      hints: ['noDiscount returns the price unchanged: 100.', 'halfOff returns half: 200 * 0.5 = 100.', 'Both happen to produce 100 with these inputs.'],
      concepts: ['delegate invocation', 'strategy switching', 'decimal arithmetic'],
    },
    {
      id: 'cs-strategy-19',
      title: 'Refactor If-Else to Strategy',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor conditional logic into the strategy pattern.',
      skeleton: `public class TaxCalculator
{
    public decimal Calculate(string country, decimal amount)
    {
        if (country == "US")
            return amount * 0.07m;
        else if (country == "UK")
            return amount * 0.20m;
        else if (country == "JP")
            return amount * 0.10m;
        else
            return 0m;
    }
}`,
      solution: `public interface ITaxStrategy
{
    decimal Calculate(decimal amount);
}

public class UsTax : ITaxStrategy
{
    public decimal Calculate(decimal amount) => amount * 0.07m;
}

public class UkTax : ITaxStrategy
{
    public decimal Calculate(decimal amount) => amount * 0.20m;
}

public class JpTax : ITaxStrategy
{
    public decimal Calculate(decimal amount) => amount * 0.10m;
}

public class TaxCalculator
{
    private readonly ITaxStrategy _strategy;

    public TaxCalculator(ITaxStrategy strategy) => _strategy = strategy;

    public decimal Calculate(decimal amount) => _strategy.Calculate(amount);
}`,
      hints: ['Extract each branch into a separate strategy class.', 'Define an ITaxStrategy interface.', 'Inject the strategy into the calculator.'],
      concepts: ['refactoring', 'strategy extraction', 'open-closed principle'],
    },
    {
      id: 'cs-strategy-20',
      title: 'Refactor Interface to Delegate',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Simplify a single-method strategy interface to a Func delegate.',
      skeleton: `public interface IHashStrategy
{
    string Hash(string input);
}

public class Md5Hash : IHashStrategy
{
    public string Hash(string input)
    {
        using var md5 = System.Security.Cryptography.MD5.Create();
        var bytes = md5.ComputeHash(System.Text.Encoding.UTF8.GetBytes(input));
        return Convert.ToHexString(bytes);
    }
}

public class Sha256Hash : IHashStrategy
{
    public string Hash(string input)
    {
        using var sha = System.Security.Cryptography.SHA256.Create();
        var bytes = sha.ComputeHash(System.Text.Encoding.UTF8.GetBytes(input));
        return Convert.ToHexString(bytes);
    }
}

public class FileIntegrity
{
    private readonly IHashStrategy _strategy;
    public FileIntegrity(IHashStrategy strategy) => _strategy = strategy;
    public string ComputeHash(string content) => _strategy.Hash(content);
}`,
      solution: `public class FileIntegrity
{
    private readonly Func<string, string> _hashFunc;

    public FileIntegrity(Func<string, string> hashFunc) => _hashFunc = hashFunc;

    public string ComputeHash(string content) => _hashFunc(content);
}

public static class HashStrategies
{
    public static string Md5(string input)
    {
        using var md5 = System.Security.Cryptography.MD5.Create();
        var bytes = md5.ComputeHash(System.Text.Encoding.UTF8.GetBytes(input));
        return Convert.ToHexString(bytes);
    }

    public static string Sha256(string input)
    {
        using var sha = System.Security.Cryptography.SHA256.Create();
        var bytes = sha.ComputeHash(System.Text.Encoding.UTF8.GetBytes(input));
        return Convert.ToHexString(bytes);
    }
}

// Usage: new FileIntegrity(HashStrategies.Md5)`,
      hints: ['Replace the interface with Func<string, string>.', 'Convert classes to static methods.', 'Pass method groups as delegates.'],
      concepts: ['delegate simplification', 'Func<T,TResult>', 'method group conversion'],
    },
  ],
};
