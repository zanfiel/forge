import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-prop',
  title: '10. Properties',
  explanation: `## Properties

Properties provide controlled access to class data with get and set accessors.

\`\`\`csharp
// Auto-property
public string Name { get; set; }

// Get-only (read-only)
public int Id { get; }

// Init-only (C# 9)
public string Code { get; init; }

// Computed property (expression-bodied)
public double Area => Width * Height;

// Full property with backing field
private string _email;
public string Email
{
    get => _email;
    set
    {
        if (!value.Contains("@")) throw new ArgumentException();
        _email = value;
    }
}

// Required property (C# 11)
public required string Title { get; set; }

// Property with different access levels
public string Data { get; private set; }

// Property pattern matching
if (person is { Age: > 18, Name: "Alice" })
    Console.WriteLine("Match!");
\`\`\`

Properties are the C# way to implement getters/setters. They compile to methods but look like field access.`,
  exercises: [
    {
      id: 'cs-prop-1',
      title: 'Auto-Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare an auto-property for age.',
      skeleton: `class Person
{
    public int Age __BLANK__
}`,
      solution: `class Person
{
    public int Age { get; set; }
}`,
      hints: [
        'Auto-properties use { get; set; } syntax.',
        'The compiler generates the backing field automatically.',
        'The answer is: { get; set; }',
      ],
      concepts: ['auto-property', 'get', 'set'],
    },
    {
      id: 'cs-prop-2',
      title: 'Read-Only Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a read-only property that can only be set in the constructor.',
      skeleton: `class Token
{
    public string Value { __BLANK__ }

    public Token(string value) { Value = value; }
}`,
      solution: `class Token
{
    public string Value { get; }

    public Token(string value) { Value = value; }
}`,
      hints: [
        'Get-only properties have no set accessor.',
        'They can only be assigned in the constructor.',
        'The answer is: get;',
      ],
      concepts: ['get-only property', 'read-only', 'constructor assignment'],
    },
    {
      id: 'cs-prop-3',
      title: 'Computed Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Create a computed property that returns the full name.',
      skeleton: `class Person
{
    public string First { get; set; }
    public string Last { get; set; }
    public string FullName __BLANK__
}`,
      solution: `class Person
{
    public string First { get; set; }
    public string Last { get; set; }
    public string FullName => $"{First} {Last}";
}`,
      hints: [
        'Expression-bodied properties use => for a computed value.',
        'No backing field is needed; the value is calculated each time.',
        'The answer is: => $"{First} {Last}"',
      ],
      concepts: ['computed property', 'expression-bodied', 'no backing field'],
    },
    {
      id: 'cs-prop-4',
      title: 'Property with Validation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a property that validates the age is non-negative in the setter.',
      skeleton: `class Person
{
    private int _age;
    public int Age
    {
        get => _age;
        set
        {
            if (__BLANK__)
                throw new ArgumentException("Age cannot be negative");
            _age = value;
        }
    }
}`,
      solution: `class Person
{
    private int _age;
    public int Age
    {
        get => _age;
        set
        {
            if (value < 0)
                throw new ArgumentException("Age cannot be negative");
            _age = value;
        }
    }
}`,
      hints: [
        'In a setter, value is the keyword for the incoming value.',
        'Check if value is negative.',
        'The answer is: value < 0',
      ],
      concepts: ['property validation', 'value keyword', 'setter', 'backing field'],
    },
    {
      id: 'cs-prop-5',
      title: 'Init Accessor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use init to make the property settable only during initialization.',
      skeleton: `class Config
{
    public string Host { get; __BLANK__; }
    public int Port { get; __BLANK__; }
}

var c = new Config { Host = "localhost", Port = 8080 };
// c.Host = "other"; // compile error`,
      solution: `class Config
{
    public string Host { get; init; }
    public int Port { get; init; }
}

var c = new Config { Host = "localhost", Port = 8080 };
// c.Host = "other"; // compile error`,
      hints: [
        'init replaces set for initialization-only properties.',
        'The property can be set in constructor or object initializer.',
        'The answer is: init',
      ],
      concepts: ['init accessor', 'C# 9', 'immutability after construction'],
    },
    {
      id: 'cs-prop-6',
      title: 'Required Property',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Make the Name property required so it must be set during initialization.',
      skeleton: `class User
{
    public __BLANK__ string Name { get; init; }
    public int Age { get; init; }
}

// var u = new User { Name = "Alice", Age = 30 }; // OK
// var u2 = new User { Age = 30 }; // Error: required member Name not set`,
      solution: `class User
{
    public required string Name { get; init; }
    public int Age { get; init; }
}

// var u = new User { Name = "Alice", Age = 30 }; // OK
// var u2 = new User { Age = 30 }; // Error: required member Name not set`,
      hints: [
        'C# 11 introduced the required modifier for properties.',
        'Required properties must be set in the object initializer.',
        'The answer is: required',
      ],
      concepts: ['required', 'C# 11', 'compile-time enforcement'],
    },
    {
      id: 'cs-prop-7',
      title: 'Lazy Computed Property',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a class DataLoader with a lazy-loaded Items property. Only compute the list on first access.',
      skeleton: ``,
      solution: `class DataLoader
{
    private List<string>? _items;

    public List<string> Items
    {
        get
        {
            if (_items == null)
            {
                _items = LoadItems();
            }
            return _items;
        }
    }

    private List<string> LoadItems()
    {
        return new List<string> { "A", "B", "C" };
    }
}`,
      hints: [
        'Use a nullable backing field initialized to null.',
        'Check if the field is null in the getter and load if needed.',
        'This is the lazy initialization pattern.',
      ],
      concepts: ['lazy initialization', 'backing field', 'nullable', 'caching'],
    },
    {
      id: 'cs-prop-8',
      title: 'Indexer Property',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a class Matrix with a 2D double array and an indexer this[int row, int col] for element access.',
      skeleton: ``,
      solution: `class Matrix
{
    private readonly double[,] _data;

    public int Rows { get; }
    public int Cols { get; }

    public Matrix(int rows, int cols)
    {
        Rows = rows;
        Cols = cols;
        _data = new double[rows, cols];
    }

    public double this[int row, int col]
    {
        get => _data[row, col];
        set => _data[row, col] = value;
    }
}`,
      hints: [
        'Indexers use the this keyword with brackets.',
        'They support get and set accessors like properties.',
        'Multiple parameters allow multi-dimensional indexing.',
      ],
      concepts: ['indexer', 'this[]', 'multi-dimensional', 'property-like access'],
    },
    {
      id: 'cs-prop-9',
      title: 'Property Changed Notification',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a class ObservableProperty<T> with a Value property that invokes an Action<T> callback when changed.',
      skeleton: ``,
      solution: `class ObservableProperty<T>
{
    private T _value;
    public Action<T>? OnChanged;

    public T Value
    {
        get => _value;
        set
        {
            if (!EqualityComparer<T>.Default.Equals(_value, value))
            {
                _value = value;
                OnChanged?.Invoke(value);
            }
        }
    }

    public ObservableProperty(T initial)
    {
        _value = initial;
    }
}`,
      hints: [
        'Compare old and new values to avoid unnecessary notifications.',
        'Use EqualityComparer<T>.Default.Equals for generic comparison.',
        'Invoke the callback only when the value actually changes.',
      ],
      concepts: ['property change', 'observer', 'generic class', 'EqualityComparer'],
    },
    {
      id: 'cs-prop-10',
      title: 'Immutable Builder with Init',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write an immutable HttpRequest class with Url, Method, and Body init properties. Add a With method that returns a clone with one property changed.',
      skeleton: ``,
      solution: `class HttpRequest
{
    public string Url { get; init; } = "";
    public string Method { get; init; } = "GET";
    public string? Body { get; init; }

    public HttpRequest WithUrl(string url) =>
        new HttpRequest { Url = url, Method = Method, Body = Body };

    public HttpRequest WithMethod(string method) =>
        new HttpRequest { Url = Url, Method = method, Body = Body };

    public HttpRequest WithBody(string? body) =>
        new HttpRequest { Url = Url, Method = Method, Body = body };
}`,
      hints: [
        'Init properties create immutable-after-construction objects.',
        'With methods create a new instance copying all values except one.',
        'This pattern is similar to how records work with the with expression.',
      ],
      concepts: ['init property', 'With pattern', 'immutability', 'functional style'],
    },
    {
      id: 'cs-prop-11',
      title: 'Mixed Access Property',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a class BankAccount with a Balance property that is publicly readable but only privately settable. Include Deposit and Withdraw methods.',
      skeleton: ``,
      solution: `class BankAccount
{
    public decimal Balance { get; private set; }

    public BankAccount(decimal initial)
    {
        Balance = initial;
    }

    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentException("Amount must be positive");
        Balance += amount;
    }

    public void Withdraw(decimal amount)
    {
        if (amount <= 0) throw new ArgumentException("Amount must be positive");
        if (amount > Balance) throw new InvalidOperationException("Insufficient funds");
        Balance -= amount;
    }
}`,
      hints: [
        'Use { get; private set; } for public read, private write.',
        'Only methods inside the class can modify Balance.',
        'Validate amounts in Deposit and Withdraw.',
      ],
      concepts: ['mixed access', 'private set', 'encapsulation', 'validation'],
    },
    {
      id: 'cs-prop-12',
      title: 'Thread-Safe Property',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a class AtomicCounter with a thread-safe Count property using Interlocked.',
      skeleton: ``,
      solution: `class AtomicCounter
{
    private int _count;

    public int Count => Volatile.Read(ref _count);

    public int Increment() => Interlocked.Increment(ref _count);

    public int Decrement() => Interlocked.Decrement(ref _count);

    public void Reset() => Interlocked.Exchange(ref _count, 0);
}`,
      hints: [
        'Interlocked provides atomic operations on shared variables.',
        'Interlocked.Increment atomically increments and returns the new value.',
        'Use Volatile.Read for a guaranteed fresh read.',
      ],
      concepts: ['Interlocked', 'thread safety', 'atomic operations', 'Volatile'],
    },
    {
      id: 'cs-prop-13',
      title: 'Property Setter Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the infinite recursion. The property setter calls itself.',
      skeleton: `class Item
{
    private string _name;
    public string Name
    {
        get => _name;
        set => Name = value; // StackOverflowException!
    }
}`,
      solution: `class Item
{
    private string _name;
    public string Name
    {
        get => _name;
        set => _name = value;
    }
}`,
      hints: [
        'Name = value calls the setter again, creating infinite recursion.',
        'Use the backing field _name instead of the property Name.',
        'Change Name = value to _name = value.',
      ],
      concepts: ['infinite recursion', 'backing field', 'property setter bug'],
    },
    {
      id: 'cs-prop-14',
      title: 'Missing Set Accessor Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the code. A get-only property cannot be set outside the constructor.',
      skeleton: `class Settings
{
    public string Theme { get; }

    public void ChangeTheme(string theme)
    {
        Theme = theme; // error: property is read-only
    }
}`,
      solution: `class Settings
{
    public string Theme { get; private set; }

    public void ChangeTheme(string theme)
    {
        Theme = theme;
    }
}`,
      hints: [
        'Get-only properties can only be assigned in the constructor.',
        'Add private set to allow internal modification.',
        'Change { get; } to { get; private set; }.',
      ],
      concepts: ['get-only', 'private set', 'read-only vs settable'],
    },
    {
      id: 'cs-prop-15',
      title: 'Init Mutability Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the code. The list inside an init property can still be mutated.',
      skeleton: `class Config
{
    public List<string> AllowedHosts { get; init; } = new();
}

var c = new Config { AllowedHosts = new() { "localhost" } };
c.AllowedHosts.Add("hacker.com"); // not prevented!`,
      solution: `class Config
{
    private readonly List<string> _allowedHosts = new();
    public IReadOnlyList<string> AllowedHosts
    {
        get => _allowedHosts.AsReadOnly();
        init => _allowedHosts = new List<string>(value);
    }
}

var c = new Config { AllowedHosts = new[] { "localhost" } };
// c.AllowedHosts.Add("hacker.com"); // compile error: IReadOnlyList`,
      hints: [
        'init prevents reassignment but not mutation of the list contents.',
        'Return IReadOnlyList<string> to prevent external mutation.',
        'Store the data in a private backing field.',
      ],
      concepts: ['shallow immutability', 'IReadOnlyList', 'defensive copy'],
    },
    {
      id: 'cs-prop-16',
      title: 'Predict Property Access',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `class Box
{
    private int _size = 5;
    public int Size
    {
        get => _size;
        set => _size = value > 0 ? value : _size;
    }
}

var b = new Box();
b.Size = -1;
b.Size = 10;
Console.WriteLine(b.Size);`,
      solution: `10`,
      hints: [
        'Setting Size to -1: value (-1) is not > 0, so _size stays 5.',
        'Setting Size to 10: value (10) is > 0, so _size becomes 10.',
        'The final value is 10.',
      ],
      concepts: ['property validation', 'conditional setter', 'backing field'],
    },
    {
      id: 'cs-prop-17',
      title: 'Predict Computed Property',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `class Circle
{
    public double Radius { get; set; }
    public double Area => Math.PI * Radius * Radius;
}

var c = new Circle { Radius = 1 };
Console.WriteLine(Math.Round(c.Area, 2));
c.Radius = 2;
Console.WriteLine(Math.Round(c.Area, 2));`,
      solution: `3.14
12.57`,
      hints: [
        'Computed properties recalculate every time they are accessed.',
        'Area for Radius=1: PI * 1 * 1 = 3.14.',
        'Area for Radius=2: PI * 4 = 12.57.',
      ],
      concepts: ['computed property', 'recalculation', 'Math.Round'],
    },
    {
      id: 'cs-prop-18',
      title: 'Predict Property Pattern',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `class Point { public int X { get; init; } public int Y { get; init; } }

var p = new Point { X = 3, Y = 4 };
string result = p switch
{
    { X: 0, Y: 0 } => "origin",
    { X: 0 } => "y-axis",
    { Y: 0 } => "x-axis",
    { X: var x, Y: var y } when x == y => "diagonal",
    _ => "other"
};
Console.WriteLine(result);`,
      solution: `other`,
      hints: [
        'X=3, Y=4: not origin, not on axes, X != Y so not diagonal.',
        'Falls through to the default _ case.',
        'The result is "other".',
      ],
      concepts: ['property pattern', 'switch expression', 'when guard'],
    },
    {
      id: 'cs-prop-19',
      title: 'Refactor to Auto-Properties',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Refactor the manual backing fields to auto-properties.',
      skeleton: `class Product
{
    private string _name;
    private decimal _price;

    public string Name
    {
        get { return _name; }
        set { _name = value; }
    }

    public decimal Price
    {
        get { return _price; }
        set { _price = value; }
    }
}`,
      solution: `class Product
{
    public string Name { get; set; }
    public decimal Price { get; set; }
}`,
      hints: [
        'When get/set just read/write a backing field, use auto-properties.',
        'Remove the backing fields and use { get; set; } shorthand.',
        'The compiler generates the backing fields automatically.',
      ],
      concepts: ['auto-property', 'refactoring', 'backing field elimination'],
    },
    {
      id: 'cs-prop-20',
      title: 'Validated Settings Class',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a class AppSettings with Port (int, range 1-65535), Host (string, non-empty), and MaxRetries (int, 0-10) properties. Each setter validates and throws ArgumentOutOfRangeException. Include a static Default property.',
      skeleton: ``,
      solution: `class AppSettings
{
    private int _port = 8080;
    private string _host = "localhost";
    private int _maxRetries = 3;

    public int Port
    {
        get => _port;
        set
        {
            if (value < 1 || value > 65535)
                throw new ArgumentOutOfRangeException(nameof(Port), "Port must be 1-65535");
            _port = value;
        }
    }

    public string Host
    {
        get => _host;
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentOutOfRangeException(nameof(Host), "Host cannot be empty");
            _host = value;
        }
    }

    public int MaxRetries
    {
        get => _maxRetries;
        set
        {
            if (value < 0 || value > 10)
                throw new ArgumentOutOfRangeException(nameof(MaxRetries), "Must be 0-10");
            _maxRetries = value;
        }
    }

    public static AppSettings Default => new();
}`,
      hints: [
        'Each setter validates and throws ArgumentOutOfRangeException on bad input.',
        'Use nameof() for the parameter name in exceptions.',
        'Static Default returns a new instance with all defaults.',
      ],
      concepts: ['validation', 'ArgumentOutOfRangeException', 'static property', 'defaults'],
    },
  ],
};
