import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-ctor',
  title: '9. Constructors',
  explanation: `## Constructors

Constructors initialize objects. C# supports multiple constructor patterns including primary constructors (C# 12).

\`\`\`csharp
// Default constructor (parameterless)
class Foo { public Foo() { } }

// Parameterized constructor
class Person
{
    public string Name { get; }
    public Person(string name) { Name = name; }
}

// Constructor chaining with this()
class Point
{
    public double X { get; }
    public double Y { get; }
    public Point() : this(0, 0) { }
    public Point(double x, double y) { X = x; Y = y; }
}

// Static constructor -- runs once per type
class Config
{
    public static readonly string Setting;
    static Config() { Setting = "loaded"; }
}

// Primary constructor (C# 12)
class User(string name, int age)
{
    public string Name => name;
    public int Age => age;
}

// Required members (C# 11)
class Order
{
    public required string Id { get; init; }
    public required string Product { get; init; }
}

// init-only setter
class Item { public string Name { get; init; } }
\`\`\``,
  exercises: [
    {
      id: 'cs-ctor-1',
      title: 'Default Constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Add a default constructor that sets Count to 0.',
      skeleton: `class Counter
{
    public int Count { get; set; }

    public __BLANK__()
    {
        Count = 0;
    }
}`,
      solution: `class Counter
{
    public int Count { get; set; }

    public Counter()
    {
        Count = 0;
    }
}`,
      hints: [
        'The constructor name must match the class name.',
        'Constructors have no return type.',
        'The answer is: Counter',
      ],
      concepts: ['default constructor', 'parameterless constructor', 'initialization'],
    },
    {
      id: 'cs-ctor-2',
      title: 'Constructor Chaining',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Chain the parameterless constructor to the parameterized one.',
      skeleton: `class Rectangle
{
    public double Width { get; }
    public double Height { get; }

    public Rectangle() __BLANK__ { }

    public Rectangle(double w, double h)
    {
        Width = w;
        Height = h;
    }
}`,
      solution: `class Rectangle
{
    public double Width { get; }
    public double Height { get; }

    public Rectangle() : this(1, 1) { }

    public Rectangle(double w, double h)
    {
        Width = w;
        Height = h;
    }
}`,
      hints: [
        'Use : this(...) to call another constructor in the same class.',
        'This avoids duplicating initialization logic.',
        'The answer is: : this(1, 1)',
      ],
      concepts: ['constructor chaining', 'this()', 'DRY principle'],
    },
    {
      id: 'cs-ctor-3',
      title: 'Static Constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a static constructor to initialize a static field.',
      skeleton: `class AppConfig
{
    public static string Version { get; }

    __BLANK__ AppConfig()
    {
        Version = "1.0.0";
    }
}`,
      solution: `class AppConfig
{
    public static string Version { get; }

    static AppConfig()
    {
        Version = "1.0.0";
    }
}`,
      hints: [
        'Static constructors run once before the first use of the type.',
        'They have no access modifier and no parameters.',
        'The answer is: static',
      ],
      concepts: ['static constructor', 'type initialization', 'runs once'],
    },
    {
      id: 'cs-ctor-4',
      title: 'Primary Constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use C# 12 primary constructor syntax to declare a class with name and age parameters.',
      skeleton: `class Person__BLANK__
{
    public string Name => name;
    public int Age => age;
}`,
      solution: `class Person(string name, int age)
{
    public string Name => name;
    public int Age => age;
}`,
      hints: [
        'Primary constructors place parameters directly after the class name.',
        'Parameters are accessible throughout the class body.',
        'The answer is: (string name, int age)',
      ],
      concepts: ['primary constructor', 'C# 12', 'concise syntax'],
    },
    {
      id: 'cs-ctor-5',
      title: 'Required Members',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Mark the properties as required so they must be set during initialization.',
      skeleton: `class Order
{
    public __BLANK__ string Id { get; init; }
    public __BLANK__ string Product { get; init; }
}
// var o = new Order { Id = "1", Product = "Widget" }; // OK
// var o2 = new Order { Id = "1" }; // Compile error: Product required`,
      solution: `class Order
{
    public required string Id { get; init; }
    public required string Product { get; init; }
}
// var o = new Order { Id = "1", Product = "Widget" }; // OK
// var o2 = new Order { Id = "1" }; // Compile error: Product required`,
      hints: [
        'The required keyword (C# 11) enforces that properties are set.',
        'Required properties must be initialized in the object initializer.',
        'The answer is: required',
      ],
      concepts: ['required', 'C# 11', 'init-only', 'object initializer'],
    },
    {
      id: 'cs-ctor-6',
      title: 'Init-Only Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Make the property settable only during initialization.',
      skeleton: `class Config
{
    public string ConnectionString { get; __BLANK__; }
}`,
      solution: `class Config
{
    public string ConnectionString { get; init; }
}`,
      hints: [
        'init allows setting the property only during object construction.',
        'After construction, the property becomes read-only.',
        'The answer is: init',
      ],
      concepts: ['init accessor', 'immutability', 'initialization-only'],
    },
    {
      id: 'cs-ctor-7',
      title: 'Builder with Constructor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a class EmailMessage with a constructor taking (to, subject, body) and a static factory method Create that returns a new instance.',
      skeleton: ``,
      solution: `class EmailMessage
{
    public string To { get; }
    public string Subject { get; }
    public string Body { get; }

    public EmailMessage(string to, string subject, string body)
    {
        To = to;
        Subject = subject;
        Body = body;
    }

    public static EmailMessage Create(string to, string subject, string body)
    {
        return new EmailMessage(to, subject, body);
    }
}`,
      hints: [
        'The constructor stores parameters in read-only properties.',
        'The static factory method calls the constructor and returns the result.',
        'Factory methods provide a more descriptive creation API.',
      ],
      concepts: ['factory method', 'static method', 'constructor', 'encapsulation'],
    },
    {
      id: 'cs-ctor-8',
      title: 'Copy Constructor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a class Settings with Name and Value properties and a copy constructor that creates a clone from another Settings instance.',
      skeleton: ``,
      solution: `class Settings
{
    public string Name { get; set; }
    public string Value { get; set; }

    public Settings(string name, string value)
    {
        Name = name;
        Value = value;
    }

    public Settings(Settings other)
    {
        Name = other.Name;
        Value = other.Value;
    }
}`,
      hints: [
        'A copy constructor takes another instance of the same class as a parameter.',
        'Copy each property from the source to the new instance.',
        'This creates an independent copy (shallow clone).',
      ],
      concepts: ['copy constructor', 'cloning', 'shallow copy'],
    },
    {
      id: 'cs-ctor-9',
      title: 'Validation in Constructor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a class PositiveNumber with an int Value property. The constructor should throw ArgumentException if the value is not positive.',
      skeleton: ``,
      solution: `class PositiveNumber
{
    public int Value { get; }

    public PositiveNumber(int value)
    {
        if (value <= 0)
            throw new ArgumentException("Value must be positive", nameof(value));
        Value = value;
    }
}`,
      hints: [
        'Validate parameters at the start of the constructor.',
        'Throw ArgumentException with a descriptive message.',
        'Use nameof(value) for the parameter name argument.',
      ],
      concepts: ['constructor validation', 'ArgumentException', 'guard clause'],
    },
    {
      id: 'cs-ctor-10',
      title: 'Multiple Constructor Overloads',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a class Connection with Host, Port, and UseSsl properties. Provide three constructors: (host), (host, port), (host, port, useSsl). Chain them using this().',
      skeleton: ``,
      solution: `class Connection
{
    public string Host { get; }
    public int Port { get; }
    public bool UseSsl { get; }

    public Connection(string host) : this(host, 80) { }

    public Connection(string host, int port) : this(host, port, false) { }

    public Connection(string host, int port, bool useSsl)
    {
        Host = host;
        Port = port;
        UseSsl = useSsl;
    }
}`,
      hints: [
        'Chain constructors with : this(...) to avoid duplication.',
        'The most parameterized constructor does the actual work.',
        'Simpler constructors provide default values and delegate.',
      ],
      concepts: ['constructor overloading', 'constructor chaining', 'default values'],
    },
    {
      id: 'cs-ctor-11',
      title: 'Singleton with Private Constructor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a class Logger with a private constructor and a static Instance property (lazy singleton using Lazy<T>).',
      skeleton: ``,
      solution: `class Logger
{
    private static readonly Lazy<Logger> _instance = new(() => new Logger());

    public static Logger Instance => _instance.Value;

    private Logger() { }

    public void Log(string message) => Console.WriteLine($"[LOG] {message}");
}`,
      hints: [
        'A private constructor prevents external instantiation.',
        'Lazy<T> ensures thread-safe lazy initialization.',
        'Access the singleton via a static property.',
      ],
      concepts: ['singleton', 'private constructor', 'Lazy<T>', 'thread safety'],
    },
    {
      id: 'cs-ctor-12',
      title: 'Immutable Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a fully immutable class Money with Amount (decimal) and Currency (string). All properties should be read-only, set only via the constructor.',
      skeleton: ``,
      solution: `class Money
{
    public decimal Amount { get; }
    public string Currency { get; }

    public Money(decimal amount, string currency)
    {
        Amount = amount;
        Currency = currency;
    }

    public Money Add(Money other)
    {
        if (Currency != other.Currency)
            throw new InvalidOperationException("Cannot add different currencies");
        return new Money(Amount + other.Amount, Currency);
    }

    public override string ToString() => $"{Amount} {Currency}";
}`,
      hints: [
        'Get-only properties (no set/init) can only be set in the constructor.',
        'Operations return new instances instead of modifying existing ones.',
        'This is the immutable object pattern.',
      ],
      concepts: ['immutability', 'get-only property', 'value semantics'],
    },
    {
      id: 'cs-ctor-13',
      title: 'Missing Constructor Chain Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the duplicate initialization. The default constructor should chain to the parameterized one.',
      skeleton: `class Circle
{
    public double Radius { get; }
    public double Area { get; }

    public Circle()
    {
        Radius = 1;
        Area = Math.PI; // duplicated logic
    }

    public Circle(double radius)
    {
        Radius = radius;
        Area = Math.PI * radius * radius;
    }
}`,
      solution: `class Circle
{
    public double Radius { get; }
    public double Area { get; }

    public Circle() : this(1) { }

    public Circle(double radius)
    {
        Radius = radius;
        Area = Math.PI * radius * radius;
    }
}`,
      hints: [
        'The default constructor duplicates the area calculation.',
        'Use : this(1) to delegate to the parameterized constructor.',
        'This keeps the calculation logic in one place.',
      ],
      concepts: ['constructor chaining', 'DRY', 'this()'],
    },
    {
      id: 'cs-ctor-14',
      title: 'Init After Construction Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the code. Init-only properties cannot be set after construction.',
      skeleton: `class Config
{
    public string Name { get; init; }
}

var c = new Config { Name = "test" };
c.Name = "changed"; // error: init-only property`,
      solution: `class Config
{
    public string Name { get; init; }
}

var c = new Config { Name = "test" };
var c2 = new Config { Name = "changed" };`,
      hints: [
        'Init-only properties can only be set during object initialization.',
        'You cannot reassign them after the object is created.',
        'Create a new instance instead of modifying the existing one.',
      ],
      concepts: ['init-only', 'immutability', 'object initializer'],
    },
    {
      id: 'cs-ctor-15',
      title: 'Static Constructor Side Effect Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the static constructor that throws and poisons the type forever (TypeInitializationException on every subsequent use).',
      skeleton: `class Database
{
    public static string ConnectionString { get; private set; }

    static Database()
    {
        // If this throws, the type is permanently broken
        ConnectionString = File.ReadAllText("config.txt");
    }
}`,
      solution: `class Database
{
    private static string? _connectionString;

    public static string ConnectionString
    {
        get
        {
            if (_connectionString == null)
            {
                try
                {
                    _connectionString = File.ReadAllText("config.txt");
                }
                catch
                {
                    _connectionString = "default-connection";
                }
            }
            return _connectionString;
        }
    }
}`,
      hints: [
        'Static constructor exceptions cause TypeInitializationException on every use.',
        'Move the initialization to a lazy pattern with error handling.',
        'Provide a fallback value if the file read fails.',
      ],
      concepts: ['static constructor', 'TypeInitializationException', 'lazy initialization'],
    },
    {
      id: 'cs-ctor-16',
      title: 'Predict Constructor Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `class Base
{
    public Base() { Console.Write("Base "); }
}

class Derived : Base
{
    public Derived() { Console.Write("Derived "); }
}

new Derived();`,
      solution: `Base Derived `,
      hints: [
        'Base class constructors execute before derived class constructors.',
        'new Derived() first calls Base(), then Derived().',
        'Output: "Base Derived ".',
      ],
      concepts: ['constructor order', 'inheritance', 'base constructor'],
    },
    {
      id: 'cs-ctor-17',
      title: 'Predict Static Constructor',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `class Init
{
    public static int Count = 0;
    static Init() { Count = 10; Console.Write("static "); }
    public Init() { Count++; Console.Write("instance "); }
}

Console.Write(Init.Count + " ");
var a = new Init();
Console.Write(Init.Count + " ");`,
      solution: `static 10 instance 11 `,
      hints: [
        'Static constructor runs once before first access.',
        'Accessing Init.Count triggers the static constructor first.',
        'Then new Init() calls the instance constructor.',
      ],
      concepts: ['static constructor', 'initialization order', 'static vs instance'],
    },
    {
      id: 'cs-ctor-18',
      title: 'Predict Chained Constructors',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `class Item
{
    public string Name { get; }
    public int Qty { get; }

    public Item() : this("default", 1) { Console.Write("A "); }
    public Item(string name) : this(name, 1) { Console.Write("B "); }
    public Item(string name, int qty) { Name = name; Qty = qty; Console.Write("C "); }
}

new Item();`,
      solution: `C A `,
      hints: [
        'Constructor chaining calls the target constructor first.',
        'Item() chains to Item("default", 1) which runs C first.',
        'Then Item() body runs A.',
      ],
      concepts: ['constructor chaining', 'execution order', 'this()'],
    },
    {
      id: 'cs-ctor-19',
      title: 'Refactor to Primary Constructor',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor to use C# 12 primary constructor syntax.',
      skeleton: `class User
{
    private readonly string _name;
    private readonly int _age;

    public User(string name, int age)
    {
        _name = name;
        _age = age;
    }

    public string Name => _name;
    public int Age => _age;
    public string Greeting => $"Hi, I'm {_name}, {_age} years old";
}`,
      solution: `class User(string name, int age)
{
    public string Name => name;
    public int Age => age;
    public string Greeting => $"Hi, I'm {name}, {age} years old";
}`,
      hints: [
        'Primary constructors place parameters after the class name.',
        'Parameters are accessible throughout the class body.',
        'No need for private fields or explicit property backing.',
      ],
      concepts: ['primary constructor', 'C# 12', 'refactoring', 'concise'],
    },
    {
      id: 'cs-ctor-20',
      title: 'Self-Validating Entity',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write an Email value object class with a single string Address property. The constructor validates the email contains exactly one @ and at least one . after the @. Throw FormatException on invalid input.',
      skeleton: ``,
      solution: `class Email
{
    public string Address { get; }

    public Email(string address)
    {
        if (string.IsNullOrWhiteSpace(address))
            throw new FormatException("Email cannot be empty");

        int atIndex = address.IndexOf('@');
        if (atIndex <= 0 || atIndex != address.LastIndexOf('@'))
            throw new FormatException("Email must contain exactly one @");

        string domain = address[(atIndex + 1)..];
        if (!domain.Contains('.'))
            throw new FormatException("Email domain must contain a dot");

        Address = address;
    }

    public override string ToString() => Address;

    public override bool Equals(object? obj) => obj is Email e && Address == e.Address;

    public override int GetHashCode() => Address.GetHashCode();
}`,
      hints: [
        'Validate in the constructor to prevent invalid objects from existing.',
        'Check for exactly one @ using IndexOf and LastIndexOf.',
        'Verify the domain part (after @) contains at least one dot.',
      ],
      concepts: ['value object', 'constructor validation', 'FormatException', 'encapsulation'],
    },
  ],
};
