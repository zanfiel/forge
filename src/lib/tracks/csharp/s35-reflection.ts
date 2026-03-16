import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-reflection',
  title: '35. Reflection',
  explanation: `## Reflection

Reflection allows inspecting and invoking types, methods, and properties at runtime via \`System.Reflection\`.

\`\`\`csharp
Type type = typeof(Person);
Console.WriteLine(type.Name);            // "Person"
Console.WriteLine(type.Namespace);       // "MyApp.Models"

PropertyInfo[] props = type.GetProperties();
MethodInfo? method = type.GetMethod("ToString");
\`\`\`

### Creating Instances

\`\`\`csharp
object? instance = Activator.CreateInstance(typeof(Person));
// or with arguments
object? obj = Activator.CreateInstance(typeof(Person), "Alice", 30);
\`\`\`

### Invoking Methods

\`\`\`csharp
MethodInfo? greet = typeof(Person).GetMethod("Greet");
object? result = greet?.Invoke(instance, new object[] { "Hello" });
\`\`\`

### Loading Assemblies

\`\`\`csharp
Assembly asm = Assembly.LoadFrom("Plugin.dll");
Type[] types = asm.GetExportedTypes();
\`\`\`

Reflection is powerful but has performance costs. Prefer source generators or compiled expressions for hot paths.`,
  exercises: [
    {
      id: 'cs-refl-1',
      title: 'Get Type Name',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Get the name of a type using typeof.',
      skeleton: `string name = __BLANK__(string).Name; // "String"`,
      solution: `string name = typeof(string).Name; // "String"`,
      hints: ['The typeof operator returns a Type object.', 'Type.Name returns the simple name without namespace.', 'The answer is: typeof'],
      concepts: ['typeof', 'Type.Name'],
    },
    {
      id: 'cs-refl-2',
      title: 'GetType at Runtime',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Get the runtime type of an object.',
      skeleton: `object obj = "hello";
Type t = obj.__BLANK__(); // typeof(string)`,
      solution: `object obj = "hello";
Type t = obj.GetType(); // typeof(string)`,
      hints: ['Every object has this method from System.Object.', 'It returns the actual runtime type.', 'The answer is: GetType'],
      concepts: ['GetType', 'runtime type'],
    },
    {
      id: 'cs-refl-3',
      title: 'GetProperties',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Get all public properties of a type.',
      skeleton: `PropertyInfo[] props = typeof(Person).__BLANK__();`,
      solution: `PropertyInfo[] props = typeof(Person).GetProperties();`,
      hints: ['This returns all public instance and static properties.', 'Each PropertyInfo describes one property.', 'The answer is: GetProperties'],
      concepts: ['GetProperties', 'PropertyInfo'],
    },
    {
      id: 'cs-refl-4',
      title: 'Activator.CreateInstance',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create an instance of a type dynamically.',
      skeleton: `Type type = typeof(StringBuilder);
object? instance = Activator.__BLANK__(type);`,
      solution: `Type type = typeof(StringBuilder);
object? instance = Activator.CreateInstance(type);`,
      hints: ['Activator is in the System namespace.', 'It calls the parameterless constructor by default.', 'The answer is: CreateInstance'],
      concepts: ['Activator.CreateInstance', 'dynamic instantiation'],
    },
    {
      id: 'cs-refl-5',
      title: 'Invoke Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Invoke a method via reflection.',
      skeleton: `MethodInfo? method = typeof(string).GetMethod("ToUpper", Type.EmptyTypes);
object? result = method?.__BLANK__("hello", null);`,
      solution: `MethodInfo? method = typeof(string).GetMethod("ToUpper", Type.EmptyTypes);
object? result = method?.Invoke("hello", null);`,
      hints: ['The first argument is the target instance.', 'The second argument is the parameters array (null for no params).', 'The answer is: Invoke'],
      concepts: ['MethodInfo.Invoke', 'method invocation'],
    },
    {
      id: 'cs-refl-6',
      title: 'Get Property Value',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Read a property value via reflection.',
      skeleton: `var person = new Person { Name = "Alice" };
PropertyInfo? prop = typeof(Person).GetProperty("Name");
string? name = (string?)prop?.__BLANK__(person);`,
      solution: `var person = new Person { Name = "Alice" };
PropertyInfo? prop = typeof(Person).GetProperty("Name");
string? name = (string?)prop?.GetValue(person);`,
      hints: ['PropertyInfo has GetValue and SetValue methods.', 'Pass the target instance as the argument.', 'The answer is: GetValue'],
      concepts: ['PropertyInfo.GetValue', 'property reading'],
    },
    {
      id: 'cs-refl-7',
      title: 'Object Cloner',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create a shallow clone by copying all public properties.',
      skeleton: `T ShallowClone<T>(T source) where T : new()
{
    // Create a new T and copy all public property values from source
}`,
      solution: `T ShallowClone<T>(T source) where T : new()
{
    var clone = new T();
    foreach (var prop in typeof(T).GetProperties())
    {
        if (prop.CanRead && prop.CanWrite)
            prop.SetValue(clone, prop.GetValue(source));
    }
    return clone;
}`,
      hints: ['Create a new instance with the new() constraint.', 'Iterate GetProperties and copy values.', 'Check CanRead and CanWrite before accessing.'],
      concepts: ['shallow clone', 'GetProperties', 'GetValue', 'SetValue'],
    },
    {
      id: 'cs-refl-8',
      title: 'Dynamic Method Caller',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Call a named method on an object by string name.',
      skeleton: `object? CallMethod(object target, string methodName, params object[] args)
{
    // Find and invoke the named method
}`,
      solution: `object? CallMethod(object target, string methodName, params object[] args)
{
    Type type = target.GetType();
    MethodInfo? method = type.GetMethod(methodName);
    return method?.Invoke(target, args);
}`,
      hints: ['Use GetType() to get the runtime type.', 'GetMethod finds the method by name.', 'Invoke executes it with the given arguments.'],
      concepts: ['dynamic invocation', 'GetMethod', 'Invoke'],
    },
    {
      id: 'cs-refl-9',
      title: 'Find Interfaces',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Return all interface names implemented by a type.',
      skeleton: `List<string> GetInterfaceNames(Type type)
{
    // Return names of all interfaces the type implements
}`,
      solution: `List<string> GetInterfaceNames(Type type)
{
    return type.GetInterfaces()
        .Select(i => i.Name)
        .ToList();
}`,
      hints: ['Type.GetInterfaces() returns all implemented interfaces.', 'Each element is a Type representing the interface.', 'Use LINQ Select to extract names.'],
      concepts: ['GetInterfaces', 'interface discovery'],
    },
    {
      id: 'cs-refl-10',
      title: 'Assembly Type Scanner',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Find all types in the current assembly that implement a given interface.',
      skeleton: `List<Type> FindImplementations<TInterface>()
{
    // Search the calling assembly for types implementing TInterface
}`,
      solution: `List<Type> FindImplementations<TInterface>()
{
    return Assembly.GetCallingAssembly()
        .GetTypes()
        .Where(t => typeof(TInterface).IsAssignableFrom(t) && t.IsClass && !t.IsAbstract)
        .ToList();
}`,
      hints: ['Assembly.GetCallingAssembly() gets the current assembly.', 'Use IsAssignableFrom to check interface implementation.', 'Filter out abstract classes and non-classes.'],
      concepts: ['Assembly', 'GetTypes', 'IsAssignableFrom', 'type scanning'],
    },
    {
      id: 'cs-refl-11',
      title: 'Generic Type Inspection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Check if a type is a generic collection and return its element type.',
      skeleton: `Type? GetCollectionElementType(Type type)
{
    // If type implements IEnumerable<T>, return T; otherwise null
}`,
      solution: `Type? GetCollectionElementType(Type type)
{
    var enumerable = type.GetInterfaces()
        .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IEnumerable<>));
    return enumerable?.GetGenericArguments().FirstOrDefault();
}`,
      hints: ['Check interfaces for IEnumerable<> generic definition.', 'IsGenericType and GetGenericTypeDefinition identify generic types.', 'GetGenericArguments returns the type parameters.'],
      concepts: ['IsGenericType', 'GetGenericTypeDefinition', 'GetGenericArguments'],
    },
    {
      id: 'cs-refl-12',
      title: 'Object to Dictionary',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Convert any object to a dictionary of property name/value pairs.',
      skeleton: `Dictionary<string, object?> ToDictionary(object obj)
{
    // Return all public properties as key-value pairs
}`,
      solution: `Dictionary<string, object?> ToDictionary(object obj)
{
    return obj.GetType()
        .GetProperties()
        .Where(p => p.CanRead)
        .ToDictionary(p => p.Name, p => p.GetValue(obj));
}`,
      hints: ['Use GetProperties to enumerate properties.', 'Filter by CanRead to skip write-only properties.', 'Use LINQ ToDictionary with Name as key and GetValue as value.'],
      concepts: ['ToDictionary', 'property enumeration', 'dynamic serialization'],
    },
    {
      id: 'cs-refl-13',
      title: 'Wrong BindingFlags Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix reflection that misses private fields.',
      skeleton: `class Secret
{
    private string _key = "abc123";
}

// Bug: returns null because private fields need BindingFlags
var field = typeof(Secret).GetField("_key");
var value = field?.GetValue(new Secret());`,
      solution: `class Secret
{
    private string _key = "abc123";
}

var field = typeof(Secret).GetField("_key",
    BindingFlags.NonPublic | BindingFlags.Instance);
var value = field?.GetValue(new Secret());`,
      hints: ['GetField with no BindingFlags only finds public fields.', 'Private fields need BindingFlags.NonPublic | BindingFlags.Instance.', 'Both flags must be specified together.'],
      concepts: ['BindingFlags', 'NonPublic', 'private field access'],
    },
    {
      id: 'cs-refl-14',
      title: 'Missing Instance Flag Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix GetMethod that returns null for an instance method.',
      skeleton: `class Calculator
{
    public int Add(int a, int b) => a + b;
}

// Bug: returns null
var method = typeof(Calculator).GetMethod("Add", BindingFlags.Public);`,
      solution: `class Calculator
{
    public int Add(int a, int b) => a + b;
}

var method = typeof(Calculator).GetMethod("Add",
    BindingFlags.Public | BindingFlags.Instance);`,
      hints: ['BindingFlags.Public alone is not sufficient.', 'Instance methods need BindingFlags.Instance.', 'Static methods need BindingFlags.Static.'],
      concepts: ['BindingFlags.Instance', 'BindingFlags.Public', 'method resolution'],
    },
    {
      id: 'cs-refl-15',
      title: 'Invoke on Wrong Instance Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the TargetException when invoking a method.',
      skeleton: `class Greeter
{
    public string Hello(string name) => $"Hello, {name}!";
}

var method = typeof(Greeter).GetMethod("Hello");
// Bug: passing null as target for an instance method
string result = (string)method!.Invoke(null, new object[] { "World" });`,
      solution: `class Greeter
{
    public string Hello(string name) => $"Hello, {name}!";
}

var method = typeof(Greeter).GetMethod("Hello");
var instance = new Greeter();
string result = (string)method!.Invoke(instance, new object[] { "World" });`,
      hints: ['Instance methods require a target object.', 'Passing null as the target is only valid for static methods.', 'Create an instance and pass it to Invoke.'],
      concepts: ['TargetException', 'instance vs static invocation'],
    },
    {
      id: 'cs-refl-16',
      title: 'Predict GetType',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict what GetType returns for different objects.',
      skeleton: `object a = 42;
object b = "hello";
object c = new List<int>();
Console.WriteLine(a.GetType().Name);
Console.WriteLine(b.GetType().Name);
Console.WriteLine(c.GetType().Name);`,
      solution: `Int32
String
List\`1`,
      hints: ['GetType returns the runtime type, not the declared type.', '42 is boxed as Int32.', 'Generic types show the arity with backtick notation.'],
      concepts: ['GetType', 'runtime type', 'generic type names'],
    },
    {
      id: 'cs-refl-17',
      title: 'Predict Property Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict how many properties reflection finds.',
      skeleton: `class Base { public int A { get; set; } }
class Derived : Base { public int B { get; set; } }

Console.WriteLine(typeof(Derived).GetProperties().Length);`,
      solution: `2`,
      hints: ['GetProperties returns inherited properties too.', 'Derived has B, and inherits A from Base.', 'Total is 2 properties.'],
      concepts: ['property inheritance', 'GetProperties', 'inherited members'],
    },
    {
      id: 'cs-refl-18',
      title: 'Predict IsAssignableFrom',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the results of type compatibility checks.',
      skeleton: `Console.WriteLine(typeof(object).IsAssignableFrom(typeof(string)));
Console.WriteLine(typeof(string).IsAssignableFrom(typeof(object)));
Console.WriteLine(typeof(IEnumerable<int>).IsAssignableFrom(typeof(List<int>)));`,
      solution: `True
False
True`,
      hints: ['IsAssignableFrom checks if a type can be assigned to a variable of this type.', 'object is assignable from string (string IS-A object).', 'List<int> implements IEnumerable<int>.'],
      concepts: ['IsAssignableFrom', 'type compatibility', 'inheritance check'],
    },
    {
      id: 'cs-refl-19',
      title: 'Refactor Switch to Reflection',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor a type switch to use reflection-based factory.',
      skeleton: `IShape Create(string shapeName)
{
    return shapeName switch
    {
        "Circle" => new Circle(),
        "Square" => new Square(),
        "Triangle" => new Triangle(),
        _ => throw new ArgumentException($"Unknown shape: {shapeName}")
    };
}`,
      solution: `IShape Create(string shapeName)
{
    var type = Assembly.GetExecutingAssembly()
        .GetTypes()
        .FirstOrDefault(t => t.Name == shapeName
            && typeof(IShape).IsAssignableFrom(t)
            && !t.IsAbstract);

    if (type == null)
        throw new ArgumentException($"Unknown shape: {shapeName}");

    return (IShape)Activator.CreateInstance(type)!;
}`,
      hints: ['Scan the assembly for types matching the name.', 'Verify the type implements IShape.', 'Use Activator.CreateInstance to instantiate.'],
      concepts: ['reflection-based factory', 'type scanning', 'Activator'],
    },
    {
      id: 'cs-refl-20',
      title: 'Refactor to Compiled Expression',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor slow Activator.CreateInstance to a compiled factory.',
      skeleton: `// Slow: called thousands of times
T Create<T>() where T : new()
{
    return (T)Activator.CreateInstance(typeof(T))!;
}`,
      solution: `static class Factory<T> where T : new()
{
    private static readonly Func<T> _create =
        Expression.Lambda<Func<T>>(Expression.New(typeof(T))).Compile();

    public static T Create() => _create();
}`,
      hints: ['Activator.CreateInstance uses reflection every call.', 'Expression.New creates a compiled constructor call.', 'Cache the compiled delegate in a static field.'],
      concepts: ['Expression.Lambda', 'compiled expressions', 'performance optimization'],
    },
  ],
};
