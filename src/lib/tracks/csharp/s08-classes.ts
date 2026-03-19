import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-class',
  title: '8. Classes',
  explanation: `## Classes

Classes are the fundamental building block of object-oriented programming in C#.

\`\`\`csharp
// Basic class
class Person
{
    // Fields
    private string _name;
    private int _age;

    // Auto-property
    public string Email { get; set; }

    // Constructor
    public Person(string name, int age)
    {
        _name = name;
        _age = age;
    }

    // Method
    public string Introduce() => $"I'm {_name}, {_age} years old.";
}

// Object initializer
var p = new Person("Alice", 30) { Email = "alice@example.com" };

// Static class -- cannot be instantiated
static class MathHelper
{
    public static double CircleArea(double r) => Math.PI * r * r;
}

// Partial class -- split across files
partial class Order { public int Id { get; set; } }
partial class Order { public string Name { get; set; } }

// Nested class
class Outer { class Inner { } }
\`\`\``,
  exercises: [
    {
      id: 'cs-class-1',
      title: 'Class Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a public class named Dog.',
      skeleton: `__BLANK__ class Dog
{
    public string Name { get; set; }
}`,
      solution: `public class Dog
{
    public string Name { get; set; }
}`,
      hints: [
        'Classes need an access modifier before the class keyword.',
        'public makes the class accessible from anywhere.',
        'The answer is: public',
      ],
      concepts: ['class declaration', 'access modifier', 'public'],
    },
    {
      id: 'cs-class-2',
      title: 'Auto-Property',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare an auto-property for Name with get and set.',
      skeleton: `class Person
{
    public string Name __BLANK__
}`,
      solution: `class Person
{
    public string Name { get; set; }
}`,
      hints: [
        'Auto-properties use { get; set; } shorthand.',
        'The compiler generates the backing field automatically.',
        'The answer is: { get; set; }',
      ],
      concepts: ['auto-property', 'get', 'set', 'backing field'],
    },
    {
      id: 'cs-class-3',
      title: 'Constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a constructor that sets the Name property.',
      skeleton: `class Animal
{
    public string Name { get; set; }

    public __BLANK__(string name)
    {
        Name = name;
    }
}`,
      solution: `class Animal
{
    public string Name { get; set; }

    public Animal(string name)
    {
        Name = name;
    }
}`,
      hints: [
        'Constructors have the same name as the class.',
        'They do not have a return type.',
        'The answer is: Animal',
      ],
      concepts: ['constructor', 'class name', 'initialization'],
    },
    {
      id: 'cs-class-4',
      title: 'Object Initializer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Create a Person using object initializer syntax.',
      skeleton: `class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}

var p = __BLANK__;
// p.Name = "Alice", p.Age = 30`,
      solution: `class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}

var p = new Person { Name = "Alice", Age = 30 };
// p.Name = "Alice", p.Age = 30`,
      hints: [
        'Object initializers use curly braces after the constructor call.',
        'Set properties with Name = value syntax inside the braces.',
        'The answer is: new Person { Name = "Alice", Age = 30 }',
      ],
      concepts: ['object initializer', 'property assignment', 'new'],
    },
    {
      id: 'cs-class-5',
      title: 'Static Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a static method that belongs to the class, not instances.',
      skeleton: `class MathHelper
{
    public __BLANK__ double Square(double x) => x * x;
}
// MathHelper.Square(5) returns 25`,
      solution: `class MathHelper
{
    public static double Square(double x) => x * x;
}
// MathHelper.Square(5) returns 25`,
      hints: [
        'Static methods are called on the class, not on instances.',
        'Use the static keyword before the return type.',
        'The answer is: static',
      ],
      concepts: ['static method', 'class-level method', 'no instance needed'],
    },
    {
      id: 'cs-class-6',
      title: 'Private Field Convention',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Declare a private field with the conventional underscore prefix naming.',
      skeleton: `class Account
{
    __BLANK__ decimal _balance;

    public decimal Balance => _balance;
}`,
      solution: `class Account
{
    private decimal _balance;

    public decimal Balance => _balance;
}`,
      hints: [
        'Private fields are only accessible within the class.',
        'The conventional prefix for private fields is underscore.',
        'The answer is: private',
      ],
      concepts: ['private field', 'encapsulation', '_prefix convention'],
    },
    {
      id: 'cs-class-7',
      title: 'Build a Stack Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a simple IntStack class with Push, Pop, and Peek methods using a List<int> internally.',
      skeleton: ``,
      solution: `class IntStack
{
    private readonly List<int> _items = new();

    public void Push(int item) => _items.Add(item);

    public int Pop()
    {
        int last = _items[_items.Count - 1];
        _items.RemoveAt(_items.Count - 1);
        return last;
    }

    public int Peek() => _items[_items.Count - 1];

    public int Count => _items.Count;
}`,
      hints: [
        'A stack is LIFO: last in, first out.',
        'Use Add for push, access and remove the last element for pop.',
        '_items.Count - 1 gives the index of the top element.',
      ],
      concepts: ['stack', 'LIFO', 'encapsulation', 'List<int>'],
    },
    {
      id: 'cs-class-8',
      title: 'ToString Override',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a class Point with X, Y properties and override ToString to return "(X, Y)".',
      skeleton: ``,
      solution: `class Point
{
    public double X { get; }
    public double Y { get; }

    public Point(double x, double y)
    {
        X = x;
        Y = y;
    }

    public override string ToString() => $"({X}, {Y})";
}`,
      hints: [
        'Override the ToString method from System.Object.',
        'Use the override keyword before string ToString().',
        'Return a formatted string with string interpolation.',
      ],
      concepts: ['ToString', 'override', 'object methods'],
    },
    {
      id: 'cs-class-9',
      title: 'Equality Override',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a class Color with R, G, B byte properties. Override Equals and GetHashCode for value equality.',
      skeleton: ``,
      solution: `class Color
{
    public byte R { get; }
    public byte G { get; }
    public byte B { get; }

    public Color(byte r, byte g, byte b)
    {
        R = r; G = g; B = b;
    }

    public override bool Equals(object? obj)
    {
        return obj is Color c && R == c.R && G == c.G && B == c.B;
    }

    public override int GetHashCode() => HashCode.Combine(R, G, B);
}`,
      hints: [
        'Override Equals to compare property values instead of references.',
        'Use is pattern to check type and cast: obj is Color c.',
        'Always override GetHashCode when overriding Equals.',
      ],
      concepts: ['Equals', 'GetHashCode', 'value equality', 'HashCode.Combine'],
    },
    {
      id: 'cs-class-10',
      title: 'Fluent Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a QueryBuilder class with Where(string), OrderBy(string), and Build() methods. Where and OrderBy return this for chaining.',
      skeleton: ``,
      solution: `class QueryBuilder
{
    private string _where = "";
    private string _orderBy = "";

    public QueryBuilder Where(string condition)
    {
        _where = condition;
        return this;
    }

    public QueryBuilder OrderBy(string field)
    {
        _orderBy = field;
        return this;
    }

    public string Build()
    {
        var query = "SELECT * FROM data";
        if (!string.IsNullOrEmpty(_where)) query += $" WHERE {_where}";
        if (!string.IsNullOrEmpty(_orderBy)) query += $" ORDER BY {_orderBy}";
        return query;
    }
}`,
      hints: [
        'Fluent APIs return this to enable method chaining.',
        'Each method sets internal state and returns the builder.',
        'Build() constructs the final result from accumulated state.',
      ],
      concepts: ['fluent API', 'method chaining', 'builder pattern', 'return this'],
    },
    {
      id: 'cs-class-11',
      title: 'IDisposable Implementation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a class TempFile that implements IDisposable, creates a temp file in the constructor and deletes it in Dispose.',
      skeleton: ``,
      solution: `class TempFile : IDisposable
{
    public string Path { get; }
    private bool _disposed;

    public TempFile()
    {
        Path = System.IO.Path.GetTempFileName();
    }

    public void Dispose()
    {
        if (!_disposed)
        {
            if (File.Exists(Path)) File.Delete(Path);
            _disposed = true;
        }
    }
}`,
      hints: [
        'Implement the IDisposable interface with a Dispose method.',
        'Track whether Dispose has already been called with a bool flag.',
        'Use Path.GetTempFileName() to create a temp file.',
      ],
      concepts: ['IDisposable', 'Dispose pattern', 'resource cleanup', 'using statement'],
    },
    {
      id: 'cs-class-12',
      title: 'Static Class Helper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a static class StringHelper with methods IsNullOrWhiteSpace(string), Truncate(string, int maxLength), and ToSlug(string).',
      skeleton: ``,
      solution: `static class StringHelper
{
    public static bool IsBlank(string? s) => string.IsNullOrWhiteSpace(s);

    public static string Truncate(string s, int maxLength)
    {
        if (s.Length <= maxLength) return s;
        return s[..maxLength] + "...";
    }

    public static string ToSlug(string s)
    {
        return s.ToLower().Replace(" ", "-");
    }
}`,
      hints: [
        'Static classes cannot be instantiated and contain only static members.',
        'Use the static keyword on both the class and all methods.',
        'Truncate should check length before slicing.',
      ],
      concepts: ['static class', 'utility methods', 'string manipulation'],
    },
    {
      id: 'cs-class-13',
      title: 'Wrong Access Modifier Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the accessibility. The Name property cannot be accessed from outside the class.',
      skeleton: `class User
{
    private string Name { get; set; }
}

var u = new User();
u.Name = "Alice"; // error: inaccessible due to protection level`,
      solution: `class User
{
    public string Name { get; set; }
}

var u = new User();
u.Name = "Alice";`,
      hints: [
        'Private members are only accessible within the declaring class.',
        'To allow external access, use public.',
        'Change private to public.',
      ],
      concepts: ['access modifier', 'private', 'public', 'encapsulation'],
    },
    {
      id: 'cs-class-14',
      title: 'Static vs Instance Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the code. You cannot access instance members from a static method.',
      skeleton: `class Counter
{
    private int _count;

    public static void Increment()
    {
        _count++; // error: cannot access instance field from static method
    }
}`,
      solution: `class Counter
{
    private int _count;

    public void Increment()
    {
        _count++;
    }
}`,
      hints: [
        'Static methods do not have access to instance fields.',
        'Remove the static keyword to make it an instance method.',
        'Alternatively, make _count static if it should be shared.',
      ],
      concepts: ['static vs instance', 'instance field', 'static method error'],
    },
    {
      id: 'cs-class-15',
      title: 'Constructor Not Called Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the NullReferenceException. The list is never initialized.',
      skeleton: `class TodoList
{
    private List<string> _items;

    public void Add(string item)
    {
        _items.Add(item); // NullReferenceException
    }
}`,
      solution: `class TodoList
{
    private List<string> _items = new();

    public void Add(string item)
    {
        _items.Add(item);
    }
}`,
      hints: [
        'Reference-type fields default to null if not initialized.',
        'Initialize the list with a field initializer: = new().',
        'Alternatively, initialize it in the constructor.',
      ],
      concepts: ['field initialization', 'NullReferenceException', 'default null'],
    },
    {
      id: 'cs-class-16',
      title: 'Predict Object Identity',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `class Box { public int Value { get; set; } }

var a = new Box { Value = 1 };
var b = a;
b.Value = 2;
Console.WriteLine(a.Value);`,
      solution: `2`,
      hints: [
        'Classes are reference types.',
        'b = a copies the reference, not the object.',
        'Both a and b point to the same Box, so changing b.Value changes a.Value.',
      ],
      concepts: ['reference type', 'shared reference', 'object identity'],
    },
    {
      id: 'cs-class-17',
      title: 'Predict Static Field',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `class Counter
{
    public static int Count;
    public Counter() { Count++; }
}

new Counter();
new Counter();
new Counter();
Console.WriteLine(Counter.Count);`,
      solution: `3`,
      hints: [
        'Static fields are shared across all instances.',
        'Each constructor call increments the same Count.',
        'Three instances created = Count is 3.',
      ],
      concepts: ['static field', 'shared state', 'constructor'],
    },
    {
      id: 'cs-class-18',
      title: 'Predict Default Constructor',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `class Config
{
    public int Timeout { get; set; } = 30;
    public string Host { get; set; } = "localhost";
}

var c = new Config();
Console.WriteLine($"{c.Host}:{c.Timeout}");`,
      solution: `localhost:30`,
      hints: [
        'Auto-properties can have default values (= value after the declaration).',
        'The default constructor uses these initializer values.',
        'No explicit constructor is needed when defaults suffice.',
      ],
      concepts: ['default values', 'property initializer', 'default constructor'],
    },
    {
      id: 'cs-class-19',
      title: 'Refactor Fields to Properties',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Refactor the public fields to auto-properties for better encapsulation.',
      skeleton: `class Product
{
    public string Name;
    public decimal Price;
    public int Quantity;
}`,
      solution: `class Product
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}`,
      hints: [
        'Public fields expose the internal data directly.',
        'Auto-properties { get; set; } provide encapsulation.',
        'Add { get; set; } after each field declaration and remove the semicolon.',
      ],
      concepts: ['auto-property', 'encapsulation', 'refactoring', 'fields vs properties'],
    },
    {
      id: 'cs-class-20',
      title: 'Observable Collection Class',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a class ObservableList<T> that wraps a List<T> and raises an Action<T> event when items are added.',
      skeleton: ``,
      solution: `class ObservableList<T>
{
    private readonly List<T> _items = new();
    public Action<T>? OnItemAdded;

    public void Add(T item)
    {
        _items.Add(item);
        OnItemAdded?.Invoke(item);
    }

    public int Count => _items.Count;

    public T this[int index] => _items[index];
}`,
      hints: [
        'Use an Action<T> delegate to notify listeners when an item is added.',
        'Call OnItemAdded?.Invoke(item) after adding to the list.',
        'Use the indexer syntax T this[int index] for element access.',
      ],
      concepts: ['generic class', 'Action<T>', 'observer pattern', 'indexer'],
    },
  ],
};
