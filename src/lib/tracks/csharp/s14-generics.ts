import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-generics',
  title: '14. Generics',
  explanation: `## Generics

Generics let you write type-safe code that works with any data type, eliminating the need for casts and boxing.

\`\`\`csharp
// Generic class
class Box<T>
{
    public T Value { get; set; }
    public Box(T value) => Value = value;
}

// Generic method
T Max<T>(T a, T b) where T : IComparable<T>
    => a.CompareTo(b) >= 0 ? a : b;

// Constraints
class Repository<T> where T : class, new()
{
    public T Create() => new T();
}

// Covariance (out) and Contravariance (in)
IEnumerable<object> items = new List<string>(); // covariant
Action<string> act = (object o) => { };         // contravariant
\`\`\`

**Constraints** restrict which types may be used: \`where T : struct\`, \`where T : class\`, \`where T : new()\`, \`where T : BaseClass\`, \`where T : IInterface\`, and \`where T : notnull\`.`,
  exercises: [
    {
      id: 'cs-gen-1',
      title: 'Generic Class Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a generic class that holds a value of type T.',
      skeleton: `class Wrapper__BLANK__
{
    public T Value { get; set; }
}`,
      solution: `class Wrapper<T>
{
    public T Value { get; set; }
}`,
      hints: ['Generic type parameters go in angle brackets.', 'The syntax is ClassName<T>.', 'The answer is: <T>'],
      concepts: ['generic class', 'type parameter'],
    },
    {
      id: 'cs-gen-2',
      title: 'Generic Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Complete the generic method signature.',
      skeleton: `public __BLANK__ Identity<T>(T value)
{
    return value;
}`,
      solution: `public T Identity<T>(T value)
{
    return value;
}`,
      hints: ['The return type matches the generic parameter.', 'The method returns the same type it receives.', 'The answer is: T'],
      concepts: ['generic method', 'return type'],
    },
    {
      id: 'cs-gen-3',
      title: 'Struct Constraint',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Add a constraint so T must be a value type.',
      skeleton: `public T? TryParse<T>(string input) __BLANK__
{
    // parsing logic
    return default;
}`,
      solution: `public T? TryParse<T>(string input) where T : struct
{
    // parsing logic
    return default;
}`,
      hints: ['Value type constraint uses the struct keyword.', 'Constraints start with the where keyword.', 'The answer is: where T : struct'],
      concepts: ['generic constraint', 'value type', 'struct'],
    },
    {
      id: 'cs-gen-4',
      title: 'New Constraint',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Constrain T so it has a parameterless constructor.',
      skeleton: `public T CreateInstance<T>() where T : __BLANK__
{
    return new T();
}`,
      solution: `public T CreateInstance<T>() where T : new()
{
    return new T();
}`,
      hints: ['The new() constraint ensures a parameterless constructor.', 'It allows using new T() inside the method.', 'The answer is: new()'],
      concepts: ['new constraint', 'parameterless constructor'],
    },
    {
      id: 'cs-gen-5',
      title: 'Multiple Constraints',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Add multiple constraints requiring a reference type that implements IDisposable and has a parameterless constructor.',
      skeleton: `public void Process<T>(T item) __BLANK__
{
    using (item) { }
}`,
      solution: `public void Process<T>(T item) where T : class, IDisposable, new()
{
    using (item) { }
}`,
      hints: ['Constraints are comma-separated after where T :.', 'class must come first, new() must come last.', 'The answer is: where T : class, IDisposable, new()'],
      concepts: ['multiple constraints', 'class constraint', 'interface constraint'],
    },
    {
      id: 'cs-gen-6',
      title: 'Generic Interface',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Implement the generic IRepository interface.',
      skeleton: `interface IRepository<T>
{
    T GetById(int id);
    void Add(T entity);
}

class UserRepo : __BLANK__
{
    public User GetById(int id) => new User();
    public void Add(User entity) { }
}`,
      solution: `interface IRepository<T>
{
    T GetById(int id);
    void Add(T entity);
}

class UserRepo : IRepository<User>
{
    public User GetById(int id) => new User();
    public void Add(User entity) { }
}`,
      hints: ['Specify the concrete type in angle brackets.', 'The class implements IRepository with a specific type.', 'The answer is: IRepository<User>'],
      concepts: ['generic interface', 'implementation'],
    },
    {
      id: 'cs-gen-7',
      title: 'Build a Generic Stack',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a generic Stack<T> class with Push, Pop, and Count.',
      skeleton: `// Write a generic Stack<T> with:
// - void Push(T item)
// - T Pop()  (throw InvalidOperationException if empty)
// - int Count property`,
      solution: `class Stack<T>
{
    private readonly List<T> _items = new();

    public int Count => _items.Count;

    public void Push(T item) => _items.Add(item);

    public T Pop()
    {
        if (_items.Count == 0)
            throw new InvalidOperationException("Stack is empty.");
        var item = _items[_items.Count - 1];
        _items.RemoveAt(_items.Count - 1);
        return item;
    }
}`,
      hints: ['Use a List<T> as the backing store.', 'Pop should remove and return the last element.', 'Throw InvalidOperationException when popping an empty stack.'],
      concepts: ['generic class', 'collection', 'exception'],
    },
    {
      id: 'cs-gen-8',
      title: 'Generic Swap Method',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a generic method that swaps two values by reference.',
      skeleton: `// Write a generic method Swap<T> that swaps two values passed by ref`,
      solution: `void Swap<T>(ref T a, ref T b)
{
    T temp = a;
    a = b;
    b = temp;
}`,
      hints: ['Use the ref keyword for both parameters.', 'You need a temporary variable to hold one value.', 'The method does not need to return anything.'],
      concepts: ['generic method', 'ref parameter', 'swap'],
    },
    {
      id: 'cs-gen-9',
      title: 'Generic Min with IComparable',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a generic method that returns the minimum of two comparable values.',
      skeleton: `// Write Min<T> that returns the smaller of two values
// Constrain T to IComparable<T>`,
      solution: `T Min<T>(T a, T b) where T : IComparable<T>
    => a.CompareTo(b) <= 0 ? a : b;`,
      hints: ['Use the where T : IComparable<T> constraint.', 'CompareTo returns negative if the caller is less.', 'A conditional expression works well here.'],
      concepts: ['generic constraint', 'IComparable', 'comparison'],
    },
    {
      id: 'cs-gen-10',
      title: 'Generic Pair Class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a generic Pair<TFirst, TSecond> class with two typed properties.',
      skeleton: `// Write a Pair<TFirst, TSecond> class
// Properties: First (TFirst), Second (TSecond)
// Constructor that sets both`,
      solution: `class Pair<TFirst, TSecond>
{
    public TFirst First { get; }
    public TSecond Second { get; }

    public Pair(TFirst first, TSecond second)
    {
        First = first;
        Second = second;
    }
}`,
      hints: ['Use two type parameters in the angle brackets.', 'Properties should be read-only with a constructor.', 'The constructor takes both TFirst and TSecond.'],
      concepts: ['multiple type parameters', 'generic class', 'constructor'],
    },
    {
      id: 'cs-gen-11',
      title: 'Generic Filter Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a generic Filter method that returns elements matching a predicate.',
      skeleton: `// Write List<T> Filter<T>(IEnumerable<T> source, Func<T, bool> predicate)`,
      solution: `List<T> Filter<T>(IEnumerable<T> source, Func<T, bool> predicate)
{
    var result = new List<T>();
    foreach (var item in source)
    {
        if (predicate(item))
            result.Add(item);
    }
    return result;
}`,
      hints: ['Iterate through source and test each item with the predicate.', 'Add matching items to a new List<T>.', 'Func<T, bool> is a delegate that takes T and returns bool.'],
      concepts: ['generic method', 'Func delegate', 'predicate'],
    },
    {
      id: 'cs-gen-12',
      title: 'Generic Default Value',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a generic method that returns the default value of any type.',
      skeleton: `// Write T GetDefault<T>() that returns default(T)`,
      solution: `T GetDefault<T>() => default(T)!;`,
      hints: ['The default keyword returns the default value for any type.', 'For reference types default is null, for value types it is 0/false.', 'Use default(T) or just default.'],
      concepts: ['default keyword', 'generic method', 'default values'],
    },
    {
      id: 'cs-gen-13',
      title: 'Bug in Generic Constraint',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the constraint so the generic method compiles.',
      skeleton: `// Bug: won't compile
public T Add<T>(T a, T b) where T : class
{
    return a + b;  // operator + not defined for class constraint
}`,
      solution: `// Fixed: use INumber<T> from .NET 7+ for arithmetic
public T Add<T>(T a, T b) where T : System.Numerics.INumber<T>
{
    return a + b;
}`,
      hints: ['The class constraint does not enable arithmetic operators.', '.NET 7 introduced generic math via INumber<T>.', 'Replace where T : class with where T : INumber<T>.'],
      concepts: ['generic math', 'INumber', 'constraint mismatch'],
    },
    {
      id: 'cs-gen-14',
      title: 'Bug in Generic Return Type',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the mismatched return type in the generic method.',
      skeleton: `public string GetFirst<T>(List<T> items)
{
    return items[0];
}`,
      solution: `public T GetFirst<T>(List<T> items)
{
    return items[0];
}`,
      hints: ['The return type should match the generic parameter.', 'items[0] is of type T, not string.', 'Change the return type from string to T.'],
      concepts: ['generic return type', 'type mismatch'],
    },
    {
      id: 'cs-gen-15',
      title: 'Bug in Covariance',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the interface so it supports covariance.',
      skeleton: `interface IProducer<T>
{
    T Produce();
}

// Error: Cannot convert IProducer<string> to IProducer<object>
IProducer<object> producer = new StringProducer();`,
      solution: `interface IProducer<out T>
{
    T Produce();
}

// Now works: IProducer<string> is assignable to IProducer<object>
IProducer<object> producer = new StringProducer();`,
      hints: ['Covariance requires the out keyword on the type parameter.', 'out means T is only used in output positions.', 'Add out before T in the interface declaration.'],
      concepts: ['covariance', 'out keyword', 'generic variance'],
    },
    {
      id: 'cs-gen-16',
      title: 'Predict Generic Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output of this generic code.',
      skeleton: `var box = new Box<int> { Value = 42 };
Console.WriteLine(box.Value.GetType().Name);
Console.WriteLine(box.Value);`,
      solution: `Int32
42`,
      hints: ['int is an alias for System.Int32.', 'GetType().Name returns the runtime type name.', 'The value stored is 42.'],
      concepts: ['generic instantiation', 'runtime type', 'GetType'],
    },
    {
      id: 'cs-gen-17',
      title: 'Predict Default Values',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the default values for different types.',
      skeleton: `Console.WriteLine(default(int));
Console.WriteLine(default(bool));
Console.WriteLine(default(string) == null);`,
      solution: `0
False
True`,
      hints: ['default(int) is 0.', 'default(bool) is false, printed as False.', 'default for reference types is null.'],
      concepts: ['default keyword', 'value types', 'reference types'],
    },
    {
      id: 'cs-gen-18',
      title: 'Predict Generic Constraint Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of a constrained generic method.',
      skeleton: `T Max<T>(T a, T b) where T : IComparable<T>
    => a.CompareTo(b) >= 0 ? a : b;

Console.WriteLine(Max(3, 7));
Console.WriteLine(Max("apple", "banana"));`,
      solution: `7
banana`,
      hints: ['Max returns the larger value.', '7 > 3, so Max(3,7) returns 7.', 'String comparison is lexicographic: "banana" > "apple".'],
      concepts: ['IComparable', 'string comparison', 'generic method'],
    },
    {
      id: 'cs-gen-19',
      title: 'Refactor to Generic',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor these duplicate methods into a single generic method.',
      skeleton: `int MaxInt(int a, int b) => a >= b ? a : b;
double MaxDouble(double a, double b) => a >= b ? a : b;
string MaxString(string a, string b)
    => a.CompareTo(b) >= 0 ? a : b;`,
      solution: `T Max<T>(T a, T b) where T : IComparable<T>
    => a.CompareTo(b) >= 0 ? a : b;`,
      hints: ['All three methods do the same thing for different types.', 'Use IComparable<T> constraint to enable comparison.', 'Replace all three with one generic method.'],
      concepts: ['generic refactoring', 'DRY principle', 'IComparable'],
    },
    {
      id: 'cs-gen-20',
      title: 'Refactor Object to Generic',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor this object-based cache to use generics for type safety.',
      skeleton: `class Cache
{
    private Dictionary<string, object> _store = new();

    public void Set(string key, object value) => _store[key] = value;

    public object Get(string key) => _store[key];
}

// Usage requires casting:
// var name = (string)cache.Get("name");`,
      solution: `class Cache<TValue>
{
    private Dictionary<string, TValue> _store = new();

    public void Set(string key, TValue value) => _store[key] = value;

    public TValue Get(string key) => _store[key];
}

// Usage is now type-safe:
// var cache = new Cache<string>();
// var name = cache.Get("name");`,
      hints: ['Replace object with a type parameter TValue.', 'Make the class generic: Cache<TValue>.', 'No casting needed when the class is generic.'],
      concepts: ['type safety', 'generic refactoring', 'eliminating casts'],
    },
  ],
};
