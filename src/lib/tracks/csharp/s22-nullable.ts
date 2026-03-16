import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-nullable',
  title: '22. Nullable Types',
  explanation: `## Nullable Types

C# has two nullability systems: **nullable value types** (\`int?\`) and **nullable reference types** (NRT, enabled with \`#nullable enable\`).

\`\`\`csharp
// Nullable value types (always existed)
int? age = null;
int actual = age ?? 0;              // null-coalescing
int value = age.GetValueOrDefault(); // 0 if null
bool hasValue = age.HasValue;

// Nullable reference types (C# 8+)
#nullable enable
string? name = null;      // explicitly nullable
string title = "Hello";   // non-nullable (compiler warns if assigned null)

// Null-conditional operators
int? length = name?.Length;       // null if name is null
var upper = name?.ToUpper() ?? "DEFAULT";

// Null-forgiving operator
string s = name!;  // suppress warning (you promise it's not null)

// Pattern matching with null
if (name is not null) { /* safe to use */ }
if (name is string n) { /* n is non-null */ }
\`\`\`

Enable NRT project-wide via \`<Nullable>enable</Nullable>\` in your .csproj.`,
  exercises: [
    {
      id: 'cs-null-1',
      title: 'Nullable Value Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a nullable int.',
      skeleton: `__BLANK__ score = null;
if (score.HasValue)
    Console.WriteLine(score.Value);`,
      solution: `int? score = null;
if (score.HasValue)
    Console.WriteLine(score.Value);`,
      hints: ['Append ? to a value type to make it nullable.', 'int? is shorthand for Nullable<int>.', 'The answer is: int?'],
      concepts: ['nullable value type', 'int?', 'HasValue'],
    },
    {
      id: 'cs-null-2',
      title: 'Null-Coalescing Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Provide a default value when null.',
      skeleton: `string? name = null;
string displayName = name __BLANK__ "Anonymous";`,
      solution: `string? name = null;
string displayName = name ?? "Anonymous";`,
      hints: ['?? returns the left side if non-null, otherwise the right.', 'This is the null-coalescing operator.', 'The answer is: ??'],
      concepts: ['null-coalescing', '?? operator'],
    },
    {
      id: 'cs-null-3',
      title: 'Null-Coalescing Assignment',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Assign a default only if the variable is null.',
      skeleton: `List<string>? items = null;
items __BLANK__ new List<string>();
items.Add("first");`,
      solution: `List<string>? items = null;
items ??= new List<string>();
items.Add("first");`,
      hints: ['??= assigns only when the left side is null.', 'It is the null-coalescing assignment operator.', 'The answer is: ??='],
      concepts: ['null-coalescing assignment', '??= operator'],
    },
    {
      id: 'cs-null-4',
      title: 'Null-Conditional Chaining',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Safely access a nested property that may be null.',
      skeleton: `string? city = user__BLANK__Address__BLANK__City;`,
      solution: `string? city = user?.Address?.City;`,
      hints: ['?. short-circuits to null if the left side is null.', 'Chain ?. for each potentially null reference.', 'The answer is: ?. and ?.'],
      concepts: ['null-conditional', '?. operator', 'chaining'],
    },
    {
      id: 'cs-null-5',
      title: 'Null-Forgiving Operator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Suppress a nullable warning when you know the value is non-null.',
      skeleton: `string? input = GetInput();
// We validated input is not null above
string confirmed = input__BLANK__;`,
      solution: `string? input = GetInput();
// We validated input is not null above
string confirmed = input!;`,
      hints: ['The ! operator suppresses nullable warnings.', 'Use it when you know the value is not null.', 'The answer is: !'],
      concepts: ['null-forgiving', '! operator', 'warning suppression'],
    },
    {
      id: 'cs-null-6',
      title: 'Pattern Match Null Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Use pattern matching to check for non-null.',
      skeleton: `string? name = GetName();
if (name __BLANK__ null)
{
    Console.WriteLine($"Hello, {name}");
}`,
      solution: `string? name = GetName();
if (name is not null)
{
    Console.WriteLine($"Hello, {name}");
}`,
      hints: ['is not null is the recommended null check pattern.', 'It cannot be overridden by operator== overloads.', 'The answer is: is not'],
      concepts: ['pattern matching', 'is not null', 'null check'],
    },
    {
      id: 'cs-null-7',
      title: 'Safe Nullable Chain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method that safely extracts a value from a nested nullable chain.',
      skeleton: `// Given:
// record Company(Address? HeadOffice);
// record Address(string? PostalCode);
// Write: string GetPostalCode(Company? company) -- returns "N/A" if any part is null`,
      solution: `string GetPostalCode(Company? company)
    => company?.HeadOffice?.PostalCode ?? "N/A";`,
      hints: ['Chain ?. for each nullable navigation.', 'Use ?? at the end for the default value.', 'One-liner with null-conditional and null-coalescing.'],
      concepts: ['null-conditional chain', 'safe navigation', 'default value'],
    },
    {
      id: 'cs-null-8',
      title: 'Nullable Guard Clause',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a method with ArgumentNullException.ThrowIfNull guard.',
      skeleton: `// Write void Process(string? name, int? age)
// Throw ArgumentNullException if either is null
// Print "name is age years old" if both valid`,
      solution: `void Process(string? name, int? age)
{
    ArgumentNullException.ThrowIfNull(name);
    ArgumentNullException.ThrowIfNull(age);
    Console.WriteLine($"{name} is {age} years old");
}`,
      hints: ['ArgumentNullException.ThrowIfNull is a .NET 6+ convenience.', 'After ThrowIfNull, the compiler knows the value is not null.', 'It accepts the value and auto-detects the parameter name.'],
      concepts: ['ThrowIfNull', 'guard clause', 'null validation'],
    },
    {
      id: 'cs-null-9',
      title: 'Required Members',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a class using the required modifier to prevent null properties.',
      skeleton: `// Write class UserProfile with:
// - required string Name
// - required string Email
// - string? Bio (optional)`,
      solution: `class UserProfile
{
    public required string Name { get; init; }
    public required string Email { get; init; }
    public string? Bio { get; init; }
}`,
      hints: ['The required modifier (C# 11) forces initialization.', 'Pair required with init for immutable required properties.', 'Nullable properties (string?) remain optional.'],
      concepts: ['required modifier', 'init-only', 'C# 11'],
    },
    {
      id: 'cs-null-10',
      title: 'Nullable Value Type Extensions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write an extension method for nullable types.',
      skeleton: `// Write static T OrDefault<T>(this T? value, T fallback) where T : struct
// Returns the value if present, or the fallback`,
      solution: `static T OrDefault<T>(this T? value, T fallback) where T : struct
    => value ?? fallback;`,
      hints: ['T? where T : struct is a nullable value type.', 'The ?? operator returns fallback when value is null.', 'This wraps GetValueOrDefault with a custom default.'],
      concepts: ['extension method', 'nullable struct', 'GetValueOrDefault'],
    },
    {
      id: 'cs-null-11',
      title: 'Maybe Monad',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a simple Maybe<T> type that chains nullable operations.',
      skeleton: `// Write record struct Maybe<T>(T? Value) where T : class with:
// - bool HasValue property
// - Maybe<TResult> Map<TResult>(Func<T, TResult?> func) where TResult : class
// - T OrElse(T fallback)`,
      solution: `record struct Maybe<T>(T? Value) where T : class
{
    public bool HasValue => Value is not null;

    public Maybe<TResult> Map<TResult>(Func<T, TResult?> func) where TResult : class
        => Value is not null ? new Maybe<TResult>(func(Value)) : new Maybe<TResult>(null);

    public T OrElse(T fallback) => Value ?? fallback;
}`,
      hints: ['Use pattern matching to check for null safely.', 'Map applies the function only if Value is present.', 'OrElse returns the fallback when Value is null.'],
      concepts: ['Maybe monad', 'functional null handling', 'Map/OrElse'],
    },
    {
      id: 'cs-null-12',
      title: 'Null Object Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Implement the Null Object pattern to eliminate null checks.',
      skeleton: `// Given interface ILogger { void Log(string msg); }
// Write a NullLogger that does nothing
// Write a ConsoleLogger that prints
// Write ILogger CreateLogger(bool enabled)`,
      solution: `interface ILogger
{
    void Log(string msg);
}

class ConsoleLogger : ILogger
{
    public void Log(string msg) => Console.WriteLine(msg);
}

class NullLogger : ILogger
{
    public void Log(string msg) { }  // intentionally empty
}

ILogger CreateLogger(bool enabled)
    => enabled ? new ConsoleLogger() : new NullLogger();`,
      hints: ['The Null Object pattern replaces null with a do-nothing implementation.', 'NullLogger implements ILogger but ignores all calls.', 'Callers never need to check for null.'],
      concepts: ['null object pattern', 'design pattern', 'eliminating null checks'],
    },
    {
      id: 'cs-null-13',
      title: 'Bug: NullReferenceException',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the NullReferenceException on a potentially null object.',
      skeleton: `string? input = Console.ReadLine();
int length = input.Length;  // NullReferenceException if input is null`,
      solution: `string? input = Console.ReadLine();
int length = input?.Length ?? 0;`,
      hints: ['Console.ReadLine() can return null.', 'Use ?. to safely access Length.', 'Use ?? to provide a default value.'],
      concepts: ['NullReferenceException', 'null-conditional', 'safe access'],
    },
    {
      id: 'cs-null-14',
      title: 'Bug: Nullable Value Type Comparison',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the incorrect null comparison for a nullable int.',
      skeleton: `int? count = GetCount();
if (count == null)
    count = 0;
// Bug: count is still int? after this, causing compiler warnings downstream
int total = count + 10;  // warning: cannot convert int? to int`,
      solution: `int? count = GetCount();
int total = (count ?? 0) + 10;`,
      hints: ['Assigning 0 to count does not change its type from int?.', 'Use ?? to coalesce to a non-nullable int in the expression.', 'Or use count.GetValueOrDefault() + 10.'],
      concepts: ['nullable arithmetic', 'type coercion', 'null-coalescing'],
    },
    {
      id: 'cs-null-15',
      title: 'Bug: Misusing Null-Forgiving Operator',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix misuse of ! that causes a runtime NullReferenceException.',
      skeleton: `Dictionary<string, string> config = new();
string value = config.GetValueOrDefault("key")!;  // suppresses warning
Console.WriteLine(value.ToUpper());  // NullReferenceException at runtime!`,
      solution: `Dictionary<string, string> config = new();
string value = config.GetValueOrDefault("key") ?? "";
Console.WriteLine(value.ToUpper());  // safe: empty string if missing`,
      hints: ['! only suppresses the compile-time warning, not the runtime null.', 'GetValueOrDefault can still return null for reference types.', 'Use ?? to provide an actual default instead.'],
      concepts: ['null-forgiving misuse', 'runtime null', 'false safety'],
    },
    {
      id: 'cs-null-16',
      title: 'Predict Null-Coalescing Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output of null-coalescing chains.',
      skeleton: `string? a = null;
string? b = null;
string? c = "hello";
Console.WriteLine(a ?? b ?? c ?? "default");`,
      solution: `hello`,
      hints: ['?? chains evaluate left to right.', 'a is null, b is null, c is "hello".', 'The first non-null value is returned.'],
      concepts: ['null-coalescing chain', 'first non-null'],
    },
    {
      id: 'cs-null-17',
      title: 'Predict Null-Conditional Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of null-conditional access.',
      skeleton: `string? name = "Alice";
int? len1 = name?.Length;
name = null;
int? len2 = name?.Length;
Console.WriteLine($"{len1},{len2?.ToString() ?? "null"}");`,
      solution: `5,null`,
      hints: ['name?.Length returns 5 when name is "Alice".', 'After name = null, name?.Length returns null.', 'len2?.ToString() is null, so ?? "null" applies.'],
      concepts: ['null-conditional', 'null propagation'],
    },
    {
      id: 'cs-null-18',
      title: 'Predict HasValue Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output of nullable value type operations.',
      skeleton: `int? x = 5;
int? y = null;
Console.WriteLine(x.HasValue);
Console.WriteLine(y.HasValue);
Console.WriteLine(x + y);`,
      solution: `True
False
`,
      hints: ['x has a value, so HasValue is True.', 'y is null, so HasValue is False.', 'Any arithmetic with null yields null; Console.WriteLine(null) prints empty line.'],
      concepts: ['HasValue', 'nullable arithmetic', 'lifted operators'],
    },
    {
      id: 'cs-null-19',
      title: 'Refactor Null Checks to Null-Conditional',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Replace verbose null checks with null-conditional operators.',
      skeleton: `string? GetCity(User? user)
{
    if (user != null)
    {
        if (user.Address != null)
        {
            if (user.Address.City != null)
            {
                return user.Address.City;
            }
        }
    }
    return "Unknown";
}`,
      solution: `string GetCity(User? user)
    => user?.Address?.City ?? "Unknown";`,
      hints: ['Chain ?. to navigate through nullable properties.', 'Use ?? for the final default value.', 'This replaces the entire nested if structure.'],
      concepts: ['null-conditional refactoring', 'conciseness'],
    },
    {
      id: 'cs-null-20',
      title: 'Refactor to Pattern Matching',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor null handling using pattern matching.',
      skeleton: `string Describe(object? value)
{
    if (value == null)
        return "null";
    else if (value is string)
        return $"string: {((string)value).Length} chars";
    else if (value is int)
        return $"int: {(int)value}";
    else
        return $"other: {value}";
}`,
      solution: `string Describe(object? value) => value switch
{
    null => "null",
    string s => $"string: {s.Length} chars",
    int n => $"int: {n}",
    _ => $"other: {value}"
};`,
      hints: ['Switch expressions can match null directly.', 'Pattern variables (s, n) are automatically typed.', 'The discard _ handles the default case.'],
      concepts: ['switch expression', 'pattern matching', 'null pattern'],
    },
  ],
};
