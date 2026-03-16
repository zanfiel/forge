import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-iface',
  title: '12. Interfaces',
  explanation: `## Interfaces

Interfaces define contracts that classes must implement. C# interfaces can have default implementations, static abstract members, and generic type parameters.

\`\`\`csharp
// Basic interface
interface IShape
{
    double Area();
    double Perimeter();
}

// Default interface method (C# 8)
interface ILogger
{
    void Log(string msg);
    void LogError(string msg) => Log($"ERROR: {msg}");
}

// Static abstract (C# 11) -- for generic math
interface IAddable<T> where T : IAddable<T>
{
    static abstract T operator +(T left, T right);
}

// Explicit implementation
class Hybrid : ICar, IBoat
{
    void ICar.Start() => Console.WriteLine("Driving");
    void IBoat.Start() => Console.WriteLine("Sailing");
}

// IDisposable -- the most common interface
class Resource : IDisposable
{
    public void Dispose() { /* cleanup */ }
}
using var r = new Resource(); // auto-dispose
\`\`\`

A class can implement multiple interfaces but inherit from only one base class.`,
  exercises: [
    {
      id: 'cs-iface-1',
      title: 'Implement Interface',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Make the Circle class implement the IShape interface.',
      skeleton: `interface IShape { double Area(); }
class Circle __BLANK__
{
    public double Radius { get; }
    public Circle(double r) { Radius = r; }
    public double Area() => Math.PI * Radius * Radius;
}`,
      solution: `interface IShape { double Area(); }
class Circle : IShape
{
    public double Radius { get; }
    public Circle(double r) { Radius = r; }
    public double Area() => Math.PI * Radius * Radius;
}`,
      hints: [
        'Use : InterfaceName to implement an interface.',
        'The class must provide implementations for all interface members.',
        'The answer is: : IShape',
      ],
      concepts: ['interface implementation', 'contract', ': syntax'],
    },
    {
      id: 'cs-iface-2',
      title: 'Multiple Interfaces',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Implement both ISerializable and ICloneable interfaces.',
      skeleton: `class Data __BLANK__
{
    public string Serialize() => "{}";
    public object Clone() => new Data();
}`,
      solution: `class Data : ISerializable, ICloneable
{
    public string Serialize() => "{}";
    public object Clone() => new Data();
}`,
      hints: [
        'Separate multiple interfaces with commas.',
        'A class can implement any number of interfaces.',
        'The answer is: : ISerializable, ICloneable',
      ],
      concepts: ['multiple interfaces', 'comma separation', 'contract'],
    },
    {
      id: 'cs-iface-3',
      title: 'Interface Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare an interface method (no body, no access modifier).',
      skeleton: `interface IRepository
{
    __BLANK__
    void Delete(int id);
}`,
      solution: `interface IRepository
{
    void Save(object entity);
    void Delete(int id);
}`,
      hints: [
        'Interface methods have no body (just a signature).',
        'They are implicitly public.',
        'The answer is: void Save(object entity);',
      ],
      concepts: ['interface method', 'contract', 'implicitly public'],
    },
    {
      id: 'cs-iface-4',
      title: 'Default Interface Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Add a default implementation for the LogWarning method.',
      skeleton: `interface ILogger
{
    void Log(string msg);
    void LogWarning(string msg) __BLANK__
}`,
      solution: `interface ILogger
{
    void Log(string msg);
    void LogWarning(string msg) => Log($"WARNING: {msg}");
}`,
      hints: [
        'Default interface methods provide a body in the interface itself.',
        'Implementing classes can use or override this default.',
        'The answer is: => Log($"WARNING: {msg}")',
      ],
      concepts: ['default interface method', 'C# 8', 'optional implementation'],
    },
    {
      id: 'cs-iface-5',
      title: 'Generic Interface',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Declare a generic interface for a repository.',
      skeleton: `interface IRepository__BLANK__
{
    T GetById(int id);
    void Save(T entity);
    IEnumerable<T> GetAll();
}`,
      solution: `interface IRepository<T>
{
    T GetById(int id);
    void Save(T entity);
    IEnumerable<T> GetAll();
}`,
      hints: [
        'Generic interfaces use angle brackets after the name.',
        'T is the type parameter that gets filled in by implementers.',
        'The answer is: <T>',
      ],
      concepts: ['generic interface', 'type parameter', 'IRepository<T>'],
    },
    {
      id: 'cs-iface-6',
      title: 'Explicit Implementation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use explicit interface implementation when two interfaces have the same method name.',
      skeleton: `interface IPrinter { string Print(); }
interface ILogger { string Print(); }

class Device : IPrinter, ILogger
{
    string __BLANK__ => "Printing...";
    string __BLANK__ => "Logging...";
}`,
      solution: `interface IPrinter { string Print(); }
interface ILogger { string Print(); }

class Device : IPrinter, ILogger
{
    string IPrinter.Print() => "Printing...";
    string ILogger.Print() => "Logging...";
}`,
      hints: [
        'Prefix the method with the interface name to disambiguate.',
        'Explicit implementations cannot have access modifiers.',
        'The answer is: IPrinter.Print() and ILogger.Print()',
      ],
      concepts: ['explicit implementation', 'disambiguation', 'interface conflict'],
    },
    {
      id: 'cs-iface-7',
      title: 'IComparable Implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a class Temperature that implements IComparable<Temperature> based on the Celsius value.',
      skeleton: ``,
      solution: `class Temperature : IComparable<Temperature>
{
    public double Celsius { get; }

    public Temperature(double celsius) { Celsius = celsius; }

    public int CompareTo(Temperature? other)
    {
        if (other == null) return 1;
        return Celsius.CompareTo(other.Celsius);
    }

    public override string ToString() => $"{Celsius}C";
}`,
      hints: [
        'IComparable<T> requires a CompareTo(T) method.',
        'Return negative if less, 0 if equal, positive if greater.',
        'Delegate to double.CompareTo for the actual comparison.',
      ],
      concepts: ['IComparable<T>', 'CompareTo', 'sorting', 'comparison'],
    },
    {
      id: 'cs-iface-8',
      title: 'IEnumerable Implementation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a class NumberRange that implements IEnumerable<int> for a range [start, end].',
      skeleton: ``,
      solution: `class NumberRange : IEnumerable<int>
{
    private readonly int _start;
    private readonly int _end;

    public NumberRange(int start, int end)
    {
        _start = start;
        _end = end;
    }

    public IEnumerator<int> GetEnumerator()
    {
        for (int i = _start; i <= _end; i++)
        {
            yield return i;
        }
    }

    System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        => GetEnumerator();
}`,
      hints: [
        'IEnumerable<T> requires GetEnumerator() returning IEnumerator<T>.',
        'Use yield return to lazily produce values.',
        'Also implement the non-generic IEnumerable.GetEnumerator.',
      ],
      concepts: ['IEnumerable<T>', 'yield return', 'iterator', 'lazy evaluation'],
    },
    {
      id: 'cs-iface-9',
      title: 'Interface Segregation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Split a fat IWorker interface into IReadable, IWritable, and IDeletable. Write a ReadOnlyStore that only implements IReadable.',
      skeleton: ``,
      solution: `interface IReadable<T>
{
    T? Get(int id);
    IEnumerable<T> GetAll();
}

interface IWritable<T>
{
    void Save(T entity);
}

interface IDeletable
{
    void Delete(int id);
}

class ReadOnlyStore : IReadable<string>
{
    private readonly Dictionary<int, string> _data = new();

    public string? Get(int id) => _data.GetValueOrDefault(id);

    public IEnumerable<string> GetAll() => _data.Values;
}`,
      hints: [
        'Interface Segregation Principle: clients should not depend on unused methods.',
        'Split large interfaces into focused ones.',
        'A read-only store only needs IReadable, not write/delete.',
      ],
      concepts: ['ISP', 'interface segregation', 'SOLID', 'focused interfaces'],
    },
    {
      id: 'cs-iface-10',
      title: 'Decorator via Interface',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write an IMessageSender interface with Send(string). Implement EmailSender and LoggingDecorator that wraps any IMessageSender and logs before sending.',
      skeleton: ``,
      solution: `interface IMessageSender
{
    void Send(string message);
}

class EmailSender : IMessageSender
{
    public void Send(string message)
    {
        Console.WriteLine($"Email sent: {message}");
    }
}

class LoggingDecorator : IMessageSender
{
    private readonly IMessageSender _inner;

    public LoggingDecorator(IMessageSender inner)
    {
        _inner = inner;
    }

    public void Send(string message)
    {
        Console.WriteLine($"LOG: Sending '{message}'");
        _inner.Send(message);
    }
}`,
      hints: [
        'The decorator implements the same interface as the wrapped object.',
        'It delegates to the inner sender after adding its behavior.',
        'This allows stacking decorators: new LoggingDecorator(new EmailSender()).',
      ],
      concepts: ['decorator pattern', 'interface composition', 'delegation'],
    },
    {
      id: 'cs-iface-11',
      title: 'Static Abstract Interface',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a static abstract interface IParsable<T> with static abstract T Parse(string s). Implement it for a Percentage struct.',
      skeleton: ``,
      solution: `interface IParsable<T> where T : IParsable<T>
{
    static abstract T Parse(string s);
}

struct Percentage : IParsable<Percentage>
{
    public double Value { get; }

    public Percentage(double value) { Value = value; }

    public static Percentage Parse(string s)
    {
        string cleaned = s.TrimEnd('%');
        return new Percentage(double.Parse(cleaned));
    }

    public override string ToString() => $"{Value}%";
}`,
      hints: [
        'Static abstract members (C# 11) require static implementations.',
        'The constraint T : IParsable<T> is the curiously recurring pattern.',
        'This enables generic code to call T.Parse(string).',
      ],
      concepts: ['static abstract', 'C# 11', 'CRTP', 'generic math'],
    },
    {
      id: 'cs-iface-12',
      title: 'IDisposable with Using',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a class Timer that implements IDisposable. Start timing on construction, print elapsed time on Dispose.',
      skeleton: ``,
      solution: `class Timer : IDisposable
{
    private readonly System.Diagnostics.Stopwatch _sw;
    private readonly string _label;

    public Timer(string label)
    {
        _label = label;
        _sw = System.Diagnostics.Stopwatch.StartNew();
    }

    public void Dispose()
    {
        _sw.Stop();
        Console.WriteLine($"{_label}: {_sw.ElapsedMilliseconds}ms");
    }
}`,
      hints: [
        'IDisposable allows using with the using statement.',
        'Start the stopwatch in the constructor, stop in Dispose.',
        'Usage: using var t = new Timer("operation");',
      ],
      concepts: ['IDisposable', 'using statement', 'Stopwatch', 'resource management'],
    },
    {
      id: 'cs-iface-13',
      title: 'Missing Implementation Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the code. The class does not implement all interface members.',
      skeleton: `interface IAnimal
{
    string Name { get; }
    string Sound();
    int Legs();
}

class Snake : IAnimal
{
    public string Name => "Snake";
    public string Sound() => "Hiss";
    // missing Legs() implementation!
}`,
      solution: `interface IAnimal
{
    string Name { get; }
    string Sound();
    int Legs();
}

class Snake : IAnimal
{
    public string Name => "Snake";
    public string Sound() => "Hiss";
    public int Legs() => 0;
}`,
      hints: [
        'All interface members must be implemented.',
        'Snake is missing the Legs() method.',
        'Add: public int Legs() => 0;',
      ],
      concepts: ['interface contract', 'complete implementation', 'compile error'],
    },
    {
      id: 'cs-iface-14',
      title: 'Interface Cast Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the InvalidCastException when casting to the wrong interface.',
      skeleton: `interface IFlyer { void Fly(); }
interface ISwimmer { void Swim(); }

class Duck : IFlyer, ISwimmer
{
    public void Fly() => Console.WriteLine("Flying");
    public void Swim() => Console.WriteLine("Swimming");
}

IFlyer bird = new Duck();
ISwimmer swimmer = (ISwimmer)bird; // works but fragile
// What if bird was not a Duck?`,
      solution: `interface IFlyer { void Fly(); }
interface ISwimmer { void Swim(); }

class Duck : IFlyer, ISwimmer
{
    public void Fly() => Console.WriteLine("Flying");
    public void Swim() => Console.WriteLine("Swimming");
}

IFlyer bird = new Duck();
if (bird is ISwimmer swimmer)
{
    swimmer.Swim();
}`,
      hints: [
        'Direct casting throws if the object does not implement the interface.',
        'Use is pattern matching for safe casting.',
        'bird is ISwimmer swimmer checks and casts safely.',
      ],
      concepts: ['safe casting', 'is pattern', 'interface checking'],
    },
    {
      id: 'cs-iface-15',
      title: 'Explicit Interface Access Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the code. Explicit interface members are not accessible through the class type.',
      skeleton: `interface ISecret { string GetCode(); }

class Vault : ISecret
{
    string ISecret.GetCode() => "1234"; // explicit implementation
}

var v = new Vault();
Console.WriteLine(v.GetCode()); // error: not accessible`,
      solution: `interface ISecret { string GetCode(); }

class Vault : ISecret
{
    string ISecret.GetCode() => "1234";
}

ISecret v = new Vault();
Console.WriteLine(v.GetCode()); // works through interface reference`,
      hints: [
        'Explicit interface members can only be called through the interface type.',
        'Change the variable type from var (Vault) to ISecret.',
        'Or cast: ((ISecret)v).GetCode().',
      ],
      concepts: ['explicit interface', 'interface reference', 'accessibility'],
    },
    {
      id: 'cs-iface-16',
      title: 'Predict Interface Polymorphism',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `interface IGreeter { string Greet(); }
class Formal : IGreeter { public string Greet() => "Good day"; }
class Casual : IGreeter { public string Greet() => "Hey!"; }

IGreeter[] greeters = { new Formal(), new Casual(), new Formal() };
foreach (var g in greeters) Console.Write(g.Greet() + " ");`,
      solution: `Good day Hey! Good day `,
      hints: [
        'Interface polymorphism calls the correct implementation.',
        'Each element\'s Greet method is called based on actual type.',
        'Output: Good day Hey! Good day.',
      ],
      concepts: ['interface polymorphism', 'virtual dispatch', 'array of interfaces'],
    },
    {
      id: 'cs-iface-17',
      title: 'Predict Default Method',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `interface IGreeter
{
    string Greet(string name);
    string FormalGreet(string name) => $"Dear {name}";
}

class SimpleGreeter : IGreeter
{
    public string Greet(string name) => $"Hi {name}";
    // does NOT override FormalGreet
}

IGreeter g = new SimpleGreeter();
Console.WriteLine(g.Greet("Alice"));
Console.WriteLine(g.FormalGreet("Bob"));`,
      solution: `Hi Alice
Dear Bob`,
      hints: [
        'SimpleGreeter implements Greet but uses the default FormalGreet.',
        'Default interface methods are called when not overridden.',
        'FormalGreet uses the default: "Dear Bob".',
      ],
      concepts: ['default interface method', 'fallback implementation'],
    },
    {
      id: 'cs-iface-18',
      title: 'Predict Explicit vs Implicit',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `interface IAnimal { string Sound(); }

class Dog : IAnimal
{
    public string Sound() => "Woof";
    string IAnimal.Sound() => "Bark"; // explicit
}

Dog d = new Dog();
IAnimal a = d;
Console.WriteLine(d.Sound());
Console.WriteLine(a.Sound());`,
      solution: `Woof
Bark`,
      hints: [
        'When both implicit and explicit exist, the reference type matters.',
        'Through Dog reference: implicit "Woof" is called.',
        'Through IAnimal reference: explicit "Bark" is called.',
      ],
      concepts: ['explicit vs implicit', 'reference type dispatch'],
    },
    {
      id: 'cs-iface-19',
      title: 'Refactor to Interface',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Extract an interface from the concrete class for testability.',
      skeleton: `class UserService
{
    public User GetUser(int id) => new User { Id = id };
    public void SaveUser(User user) { /* save */ }
    public void DeleteUser(int id) { /* delete */ }
}

class UserController
{
    private readonly UserService _service;
    public UserController(UserService service) { _service = service; }
}`,
      solution: `interface IUserService
{
    User GetUser(int id);
    void SaveUser(User user);
    void DeleteUser(int id);
}

class UserService : IUserService
{
    public User GetUser(int id) => new User { Id = id };
    public void SaveUser(User user) { /* save */ }
    public void DeleteUser(int id) { /* delete */ }
}

class UserController
{
    private readonly IUserService _service;
    public UserController(IUserService service) { _service = service; }
}`,
      hints: [
        'Extract an interface with the public methods of the service.',
        'The controller depends on the interface, not the concrete class.',
        'This enables mocking in tests.',
      ],
      concepts: ['dependency inversion', 'interface extraction', 'testability'],
    },
    {
      id: 'cs-iface-20',
      title: 'Plugin System',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write an IPlugin interface with Name (string property) and Execute(string input) returning string. Write a PluginManager class that registers plugins and executes them by name.',
      skeleton: ``,
      solution: `interface IPlugin
{
    string Name { get; }
    string Execute(string input);
}

class UpperPlugin : IPlugin
{
    public string Name => "upper";
    public string Execute(string input) => input.ToUpper();
}

class ReversePlugin : IPlugin
{
    public string Name => "reverse";
    public string Execute(string input)
    {
        var chars = input.ToCharArray();
        Array.Reverse(chars);
        return new string(chars);
    }
}

class PluginManager
{
    private readonly Dictionary<string, IPlugin> _plugins = new();

    public void Register(IPlugin plugin) => _plugins[plugin.Name] = plugin;

    public string Execute(string pluginName, string input)
    {
        if (!_plugins.TryGetValue(pluginName, out var plugin))
            throw new KeyNotFoundException($"Plugin '{pluginName}' not found");
        return plugin.Execute(input);
    }
}`,
      hints: [
        'Use a Dictionary to map plugin names to instances.',
        'Register stores plugins, Execute looks them up and runs them.',
        'This is a simple plugin/strategy pattern using interfaces.',
      ],
      concepts: ['plugin pattern', 'strategy pattern', 'Dictionary lookup', 'extensibility'],
    },
  ],
};
