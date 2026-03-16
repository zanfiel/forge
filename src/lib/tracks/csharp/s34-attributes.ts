import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-attributes',
  title: '34. Attributes',
  explanation: `## Attributes

Attributes add declarative metadata to code elements. They are accessed at runtime via reflection.

\`\`\`csharp
[Obsolete("Use NewMethod instead")]
void OldMethod() { }

[Serializable]
class Data { }

[Conditional("DEBUG")]
void DebugLog(string msg) => Console.WriteLine(msg);
\`\`\`

### Custom Attributes

\`\`\`csharp
[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
class MaxLengthAttribute : Attribute
{
    public int Length { get; }
    public MaxLengthAttribute(int length) => Length = length;
}

class User
{
    [MaxLength(50)]
    public string Name { get; set; }
}
\`\`\`

### Reading Attributes

\`\`\`csharp
var prop = typeof(User).GetProperty("Name");
var attr = prop?.GetCustomAttribute<MaxLengthAttribute>();
Console.WriteLine(attr?.Length); // 50
\`\`\`

Attributes are used extensively by frameworks (ASP.NET, EF Core, xUnit) for routing, validation, mapping, and test discovery.`,
  exercises: [
    {
      id: 'cs-attr-1',
      title: 'Obsolete Attribute',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Mark a method as obsolete with a message.',
      skeleton: `[__BLANK__("Use ProcessV2 instead")]
void Process() { }`,
      solution: `[Obsolete("Use ProcessV2 instead")]
void Process() { }`,
      hints: ['This attribute generates a compiler warning.', 'It accepts an optional message string.', 'The answer is: Obsolete'],
      concepts: ['Obsolete', 'compiler warnings'],
    },
    {
      id: 'cs-attr-2',
      title: 'AttributeUsage',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Restrict a custom attribute to only apply to methods.',
      skeleton: `[AttributeUsage(AttributeTargets.__BLANK__)]
class LogCallAttribute : Attribute { }`,
      solution: `[AttributeUsage(AttributeTargets.Method)]
class LogCallAttribute : Attribute { }`,
      hints: ['AttributeTargets is a flags enum.', 'Common values: Class, Method, Property, Field.', 'The answer is: Method'],
      concepts: ['AttributeUsage', 'AttributeTargets', 'attribute restrictions'],
    },
    {
      id: 'cs-attr-3',
      title: 'AllowMultiple',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Allow an attribute to be applied multiple times.',
      skeleton: `[AttributeUsage(AttributeTargets.Class, __BLANK__ = true)]
class TagAttribute : Attribute
{
    public string Name { get; }
    public TagAttribute(string name) => Name = name;
}`,
      solution: `[AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
class TagAttribute : Attribute
{
    public string Name { get; }
    public TagAttribute(string name) => Name = name;
}`,
      hints: ['By default, an attribute can only appear once.', 'This property allows multiple instances on the same target.', 'The answer is: AllowMultiple'],
      concepts: ['AllowMultiple', 'multiple attributes'],
    },
    {
      id: 'cs-attr-4',
      title: 'Conditional Attribute',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Make a method call conditional on a preprocessor symbol.',
      skeleton: `[__BLANK__("DEBUG")]
void DebugLog(string message)
{
    Console.WriteLine($"DEBUG: {message}");
}`,
      solution: `[Conditional("DEBUG")]
void DebugLog(string message)
{
    Console.WriteLine($"DEBUG: {message}");
}`,
      hints: ['This attribute removes calls at compile time if the symbol is not defined.', 'The method must return void.', 'The answer is: Conditional'],
      concepts: ['Conditional', 'preprocessor symbols', 'conditional compilation'],
    },
    {
      id: 'cs-attr-5',
      title: 'CallerMemberName',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Automatically capture the calling method name.',
      skeleton: `void Log(string message, [__BLANK__] string caller = "")
{
    Console.WriteLine($"[{caller}] {message}");
}`,
      solution: `void Log(string message, [CallerMemberName] string caller = "")
{
    Console.WriteLine($"[{caller}] {message}");
}`,
      hints: ['This caller info attribute injects the member name.', 'It is in System.Runtime.CompilerServices.', 'The answer is: CallerMemberName'],
      concepts: ['CallerMemberName', 'caller info attributes'],
    },
    {
      id: 'cs-attr-6',
      title: 'Flags Enum Attribute',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Mark an enum as a bitwise flags enumeration.',
      skeleton: `[__BLANK__]
enum Permissions
{
    None = 0,
    Read = 1,
    Write = 2,
    Execute = 4
}`,
      solution: `[Flags]
enum Permissions
{
    None = 0,
    Read = 1,
    Write = 2,
    Execute = 4
}`,
      hints: ['This attribute affects ToString() for combined values.', 'It indicates the enum supports bitwise operations.', 'The answer is: Flags'],
      concepts: ['Flags', 'bitwise enums'],
    },
    {
      id: 'cs-attr-7',
      title: 'Custom Validation Attribute',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create a custom attribute that validates string length.',
      skeleton: `// Create a MaxLengthAttribute that stores a maximum length
// It should target properties and not allow multiple

class MaxLengthAttribute : Attribute
{
    // Implement constructor and Length property
}`,
      solution: `[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
class MaxLengthAttribute : Attribute
{
    public int Length { get; }
    public MaxLengthAttribute(int length) => Length = length;
}`,
      hints: ['Inherit from Attribute.', 'Store the length in a read-only property.', 'Apply AttributeUsage to restrict targets.'],
      concepts: ['custom attribute', 'Attribute base class', 'AttributeUsage'],
    },
    {
      id: 'cs-attr-8',
      title: 'Read Attribute via Reflection',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Read a custom attribute from a property using reflection.',
      skeleton: `int? GetMaxLength<T>(string propertyName)
{
    // Return the MaxLength value from the property, or null if not present
}`,
      solution: `int? GetMaxLength<T>(string propertyName)
{
    var prop = typeof(T).GetProperty(propertyName);
    var attr = prop?.GetCustomAttribute<MaxLengthAttribute>();
    return attr?.Length;
}`,
      hints: ['Use typeof(T).GetProperty to get the PropertyInfo.', 'GetCustomAttribute<T> retrieves the attribute.', 'Return null if the property or attribute is not found.'],
      concepts: ['GetProperty', 'GetCustomAttribute', 'reflection'],
    },
    {
      id: 'cs-attr-9',
      title: 'Get All Attributes',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Get all Tag attributes applied to a class.',
      skeleton: `// Assume [Tag("feature")], [Tag("v2")] on a class
List<string> GetTags(Type type)
{
    // Return all Tag name values applied to the type
}`,
      solution: `List<string> GetTags(Type type)
{
    return type.GetCustomAttributes<TagAttribute>()
        .Select(t => t.Name)
        .ToList();
}`,
      hints: ['GetCustomAttributes (plural) returns all instances.', 'The attribute must have AllowMultiple = true.', 'Use LINQ Select to extract the Name property.'],
      concepts: ['GetCustomAttributes', 'AllowMultiple', 'LINQ'],
    },
    {
      id: 'cs-attr-10',
      title: 'Attribute-Based Validator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Validate an object by checking MaxLength attributes on its properties.',
      skeleton: `List<string> Validate(object obj)
{
    // Check each property for MaxLengthAttribute
    // Return error messages for violations
}`,
      solution: `List<string> Validate(object obj)
{
    var errors = new List<string>();
    foreach (var prop in obj.GetType().GetProperties())
    {
        var attr = prop.GetCustomAttribute<MaxLengthAttribute>();
        if (attr != null && prop.GetValue(obj) is string s && s.Length > attr.Length)
            errors.Add($"{prop.Name} exceeds max length of {attr.Length}");
    }
    return errors;
}`,
      hints: ['Iterate over GetProperties() on the object type.', 'Check each property for MaxLengthAttribute.', 'Compare the string value length against the attribute Length.'],
      concepts: ['reflection-based validation', 'GetProperties', 'GetValue'],
    },
    {
      id: 'cs-attr-11',
      title: 'Discover Attributed Methods',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Find all methods in a type that have a specific attribute.',
      skeleton: `List<MethodInfo> FindMethods<TAttr>(Type type) where TAttr : Attribute
{
    // Return all methods decorated with TAttr
}`,
      solution: `List<MethodInfo> FindMethods<TAttr>(Type type) where TAttr : Attribute
{
    return type.GetMethods()
        .Where(m => m.GetCustomAttribute<TAttr>() != null)
        .ToList();
}`,
      hints: ['Use GetMethods() to enumerate all methods.', 'Check GetCustomAttribute<TAttr> for each method.', 'Filter with LINQ Where.'],
      concepts: ['method discovery', 'GetMethods', 'attribute filtering'],
    },
    {
      id: 'cs-attr-12',
      title: 'Description Attribute',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create and read a Description attribute from enum values.',
      skeleton: `// Given: [Description("Active user")] Active = 1
string? GetDescription(Enum value)
{
    // Return the Description text for an enum value
}`,
      solution: `string? GetDescription(Enum value)
{
    var field = value.GetType().GetField(value.ToString());
    var attr = field?.GetCustomAttribute<DescriptionAttribute>();
    return attr?.Description;
}`,
      hints: ['Enum values are accessed via GetField on the enum type.', 'GetCustomAttribute retrieves the Description.', 'DescriptionAttribute is in System.ComponentModel.'],
      concepts: ['DescriptionAttribute', 'enum reflection', 'GetField'],
    },
    {
      id: 'cs-attr-13',
      title: 'Missing Attribute Inheritance Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix an attribute that is not inherited by derived classes.',
      skeleton: `// Bug: DerivedClass does not inherit the attribute
[AttributeUsage(AttributeTargets.Class, Inherited = false)]
class CacheableAttribute : Attribute { }

[Cacheable]
class BaseService { }
class DerivedService : BaseService { }

// typeof(DerivedService).GetCustomAttribute<CacheableAttribute>() returns null!`,
      solution: `[AttributeUsage(AttributeTargets.Class, Inherited = true)]
class CacheableAttribute : Attribute { }

[Cacheable]
class BaseService { }
class DerivedService : BaseService { }`,
      hints: ['Inherited = false prevents attribute inheritance.', 'Set Inherited = true to allow derived classes to inherit it.', 'GetCustomAttribute checks the inheritance chain when Inherited is true.'],
      concepts: ['Inherited', 'attribute inheritance', 'derived classes'],
    },
    {
      id: 'cs-attr-14',
      title: 'Wrong AttributeTargets Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix an attribute applied to the wrong target.',
      skeleton: `// Bug: attribute targets Class, but we apply it to a method
[AttributeUsage(AttributeTargets.Class)]
class TimedAttribute : Attribute { }

class Service
{
    [Timed]  // Compile error!
    void Process() { }
}`,
      solution: `[AttributeUsage(AttributeTargets.Method)]
class TimedAttribute : Attribute { }

class Service
{
    [Timed]
    void Process() { }
}`,
      hints: ['The attribute is restricted to Class targets.', 'Change the target to Method.', 'Or use AttributeTargets.All for any target.'],
      concepts: ['AttributeTargets', 'compile-time validation'],
    },
    {
      id: 'cs-attr-15',
      title: 'Named vs Positional Parameters Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the attribute that confuses named and positional parameters.',
      skeleton: `class RangeAttribute : Attribute
{
    public int Min { get; set; }
    public int Max { get; set; }
    // Bug: no constructor, so positional syntax fails
}

class Config
{
    [Range(0, 100)]  // Compile error!
    public int Value { get; set; }
}`,
      solution: `class RangeAttribute : Attribute
{
    public int Min { get; }
    public int Max { get; }
    public RangeAttribute(int min, int max)
    {
        Min = min;
        Max = max;
    }
}

class Config
{
    [Range(0, 100)]
    public int Value { get; set; }
}`,
      hints: ['Positional attribute arguments map to constructor parameters.', 'Add a constructor with min and max parameters.', 'Named parameters use public properties or fields.'],
      concepts: ['positional parameters', 'constructor parameters', 'attribute arguments'],
    },
    {
      id: 'cs-attr-16',
      title: 'Predict Obsolete Warning',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict whether code compiles with Obsolete(error: true).',
      skeleton: `[Obsolete("Removed", true)]
void OldMethod() { }

// What happens when you call OldMethod()?
// A) Compiler warning
// B) Compiler error
// C) Runtime exception`,
      solution: `B) Compiler error`,
      hints: ['The second parameter of Obsolete controls error vs warning.', 'true means it is a compiler error.', 'false (or omitted) means it is a warning.'],
      concepts: ['Obsolete', 'error parameter', 'compiler error'],
    },
    {
      id: 'cs-attr-17',
      title: 'Predict GetCustomAttributes Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict how many attributes are returned.',
      skeleton: `[AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
class LabelAttribute : Attribute
{
    public string Value { get; }
    public LabelAttribute(string v) => Value = v;
}

[Label("A")]
[Label("B")]
[Label("C")]
class MyClass { }

Console.WriteLine(typeof(MyClass).GetCustomAttributes<LabelAttribute>().Count());`,
      solution: `3`,
      hints: ['AllowMultiple = true permits multiple instances.', 'Three [Label] attributes are applied.', 'GetCustomAttributes returns all three.'],
      concepts: ['AllowMultiple', 'GetCustomAttributes', 'count'],
    },
    {
      id: 'cs-attr-18',
      title: 'Predict CallerMemberName',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict what CallerMemberName captures.',
      skeleton: `void Log(string msg, [CallerMemberName] string caller = "")
{
    Console.WriteLine($"{caller}: {msg}");
}

void DoWork()
{
    Log("starting");
}

// Calling DoWork()`,
      solution: `DoWork: starting`,
      hints: ['CallerMemberName captures the calling method name.', 'DoWork calls Log, so caller = "DoWork".', 'The output format is "caller: msg".'],
      concepts: ['CallerMemberName', 'caller info'],
    },
    {
      id: 'cs-attr-19',
      title: 'Refactor Magic Strings to Attribute',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor hardcoded table names to a custom attribute.',
      skeleton: `class UserRepository
{
    string GetTableName() => "users";
    void Save(User u) => Execute($"INSERT INTO {GetTableName()} ...");
}

class OrderRepository
{
    string GetTableName() => "orders";
    void Save(Order o) => Execute($"INSERT INTO {GetTableName()} ...");
}`,
      solution: `[AttributeUsage(AttributeTargets.Class)]
class TableAttribute : Attribute
{
    public string Name { get; }
    public TableAttribute(string name) => Name = name;
}

[Table("users")]
class UserRepository
{
    void Save(User u) =>
        Execute($"INSERT INTO {GetType().GetCustomAttribute<TableAttribute>()!.Name} ...");
}

[Table("orders")]
class OrderRepository
{
    void Save(Order o) =>
        Execute($"INSERT INTO {GetType().GetCustomAttribute<TableAttribute>()!.Name} ...");
}`,
      hints: ['Create a TableAttribute to store the table name.', 'Apply it to each repository class.', 'Read the attribute via reflection instead of hardcoding.'],
      concepts: ['custom attribute', 'metadata-driven design', 'reflection'],
    },
    {
      id: 'cs-attr-20',
      title: 'Refactor to CallerInfo',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor manual caller tracking to use caller info attributes.',
      skeleton: `void LogError(string message, string callerFile, int callerLine, string callerMethod)
{
    Console.WriteLine($"[{callerFile}:{callerLine} {callerMethod}] {message}");
}

// Usage: LogError("failed", "Program.cs", 42, "Main");`,
      solution: `void LogError(string message,
    [CallerFilePath] string callerFile = "",
    [CallerLineNumber] int callerLine = 0,
    [CallerMemberName] string callerMethod = "")
{
    Console.WriteLine($"[{callerFile}:{callerLine} {callerMethod}] {message}");
}

// Usage: LogError("failed");  // caller info injected automatically`,
      hints: ['CallerFilePath, CallerLineNumber, CallerMemberName auto-fill at compile time.', 'Make the parameters optional with default values.', 'The compiler injects the correct values at the call site.'],
      concepts: ['CallerFilePath', 'CallerLineNumber', 'CallerMemberName', 'compiler services'],
    },
  ],
};
