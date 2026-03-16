import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-tuples',
  title: '27. Tuples',
  explanation: `## Tuples

Value tuples provide lightweight grouping of multiple values without defining a class or struct.

\`\`\`csharp
// Named tuple
(string Name, int Age) person = ("Alice", 30);
Console.WriteLine(person.Name); // Alice

// Tuple return type
(int Min, int Max) FindRange(int[] nums)
    => (nums.Min(), nums.Max());

var range = FindRange(new[] { 3, 1, 4, 1, 5 });
Console.WriteLine($"{range.Min} to {range.Max}");

// Deconstruction
var (min, max) = FindRange(new[] { 3, 1, 4 });
(int x, int y) = (10, 20);

// Tuple equality (C# 7.3+)
(int, int) a = (1, 2);
(int, int) b = (1, 2);
Console.WriteLine(a == b); // True

// Discards
var (name, _) = ("Alice", 30); // discard age
\`\`\`

Tuples are \`System.ValueTuple\` structs. Use them for local data grouping, multiple returns, and simple data transfer. For public APIs, prefer records or named types.`,
  exercises: [
    {
      id: 'cs-tup-1',
      title: 'Named Tuple',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Create a named tuple.',
      skeleton: `(__BLANK__ X, __BLANK__ Y) point = (3.0, 4.0);
Console.WriteLine(point.X);`,
      solution: `(double X, double Y) point = (3.0, 4.0);
Console.WriteLine(point.X);`,
      hints: ['Tuple elements can have names for readability.', 'Specify types and names in parentheses.', 'The answer is: double, double'],
      concepts: ['named tuple', 'element names'],
    },
    {
      id: 'cs-tup-2',
      title: 'Tuple Return Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Return a tuple from a method.',
      skeleton: `__BLANK__ Split(string full)
{
    var parts = full.Split(' ');
    return (parts[0], parts[1]);
}`,
      solution: `(string First, string Last) Split(string full)
{
    var parts = full.Split(' ');
    return (parts[0], parts[1]);
}`,
      hints: ['The return type is a tuple with named elements.', 'Use (Type Name, Type Name) syntax.', 'The answer is: (string First, string Last)'],
      concepts: ['tuple return', 'multiple return values'],
    },
    {
      id: 'cs-tup-3',
      title: 'Tuple Deconstruction',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Deconstruct a tuple into separate variables.',
      skeleton: `var pair = (Name: "Alice", Age: 30);
var __BLANK__ = pair;
Console.WriteLine($"{name} is {age}");`,
      solution: `var pair = (Name: "Alice", Age: 30);
var (name, age) = pair;
Console.WriteLine($"{name} is {age}");`,
      hints: ['Deconstruction uses parenthesized variables on the left.', 'Variable names do not need to match tuple element names.', 'The answer is: (name, age)'],
      concepts: ['deconstruction', 'variable extraction'],
    },
    {
      id: 'cs-tup-4',
      title: 'Discard Tuple Element',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Discard an unneeded tuple element.',
      skeleton: `var (value, __BLANK__) = (42, "unused");`,
      solution: `var (value, _) = (42, "unused");`,
      hints: ['Underscore _ is a discard for unused values.', 'It avoids creating an unnecessary variable.', 'The answer is: _'],
      concepts: ['discard', 'underscore'],
    },
    {
      id: 'cs-tup-5',
      title: 'Tuple Equality',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Compare two tuples for equality.',
      skeleton: `(int, int) a = (1, 2);
(int, int) b = (1, 2);
bool same = a __BLANK__ b;  // True`,
      solution: `(int, int) a = (1, 2);
(int, int) b = (1, 2);
bool same = a == b;  // True`,
      hints: ['Tuples support == and != operators.', 'Equality is element-wise.', 'The answer is: =='],
      concepts: ['tuple equality', 'element-wise comparison'],
    },
    {
      id: 'cs-tup-6',
      title: 'Nested Tuple',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create a nested tuple.',
      skeleton: `var data = ("Alice", __BLANK__);
Console.WriteLine(data.Item2.Grade);`,
      solution: `var data = ("Alice", (Score: 95, Grade: "A"));
Console.WriteLine(data.Item2.Grade);`,
      hints: ['Tuples can be nested inside other tuples.', 'Inner tuple has its own named elements.', 'The answer is: (Score: 95, Grade: "A")'],
      concepts: ['nested tuple', 'tuple composition'],
    },
    {
      id: 'cs-tup-7',
      title: 'Multiple Return Values',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a method that returns min, max, and average of an array.',
      skeleton: `// Write (int Min, int Max, double Average) Stats(int[] nums)`,
      solution: `(int Min, int Max, double Average) Stats(int[] nums)
    => (nums.Min(), nums.Max(), nums.Average());`,
      hints: ['Use LINQ Min(), Max(), Average() methods.', 'Return a named tuple with all three values.', 'Average returns double.'],
      concepts: ['tuple return', 'aggregate functions'],
    },
    {
      id: 'cs-tup-8',
      title: 'Swap with Tuples',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a swap function using tuple deconstruction.',
      skeleton: `// Write void Swap<T>(ref T a, ref T b) using tuple swap`,
      solution: `void Swap<T>(ref T a, ref T b)
{
    (a, b) = (b, a);
}`,
      hints: ['Tuple deconstruction can swap in one line.', '(a, b) = (b, a) swaps without a temp variable.', 'Use ref parameters for the swap to be visible to the caller.'],
      concepts: ['tuple swap', 'deconstruction assignment'],
    },
    {
      id: 'cs-tup-9',
      title: 'Dictionary with Tuple Keys',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use tuples as dictionary keys for coordinate-based lookup.',
      skeleton: `// Write class Grid<T> with:
// - void Set(int row, int col, T value)
// - T? Get(int row, int col)
// Use Dictionary<(int, int), T> internally`,
      solution: `class Grid<T>
{
    private readonly Dictionary<(int Row, int Col), T> _cells = new();

    public void Set(int row, int col, T value)
        => _cells[(row, col)] = value;

    public T? Get(int row, int col)
        => _cells.TryGetValue((row, col), out var val) ? val : default;
}`,
      hints: ['ValueTuples have built-in equality and hashing.', 'They work correctly as dictionary keys.', 'Use TryGetValue for safe lookup.'],
      concepts: ['tuple as key', 'Dictionary', 'value equality'],
    },
    {
      id: 'cs-tup-10',
      title: 'Custom Deconstruct',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Add a Deconstruct method to an existing class.',
      skeleton: `// Given: class Range { public int Start; public int End; }
// Write a Deconstruct extension method so Range can be deconstructed:
// var (start, end) = range;`,
      solution: `static class RangeExtensions
{
    public static void Deconstruct(this Range range, out int start, out int end)
    {
        start = range.Start;
        end = range.End;
    }
}`,
      hints: ['Deconstruct uses out parameters for each component.', 'Extension methods can add Deconstruct to existing types.', 'The method name must be exactly Deconstruct.'],
      concepts: ['Deconstruct method', 'extension method', 'deconstruction'],
    },
    {
      id: 'cs-tup-11',
      title: 'Tuple LINQ Grouping',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use tuples in LINQ to group and summarize data.',
      skeleton: `// Given: (string Product, string Category, decimal Price)[] sales
// Write: IEnumerable<(string Category, decimal Total)> SumByCategory(...)`,
      solution: `IEnumerable<(string Category, decimal Total)> SumByCategory(
    (string Product, string Category, decimal Price)[] sales)
{
    return sales.GroupBy(s => s.Category)
                .Select(g => (Category: g.Key, Total: g.Sum(s => s.Price)));
}`,
      hints: ['GroupBy on Category, then Sum the Price.', 'Select into a named tuple.', 'Tuples work seamlessly with LINQ.'],
      concepts: ['tuple with LINQ', 'GroupBy', 'aggregation'],
    },
    {
      id: 'cs-tup-12',
      title: 'Tuple Pattern Matching',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Use tuple patterns in a switch expression for rock-paper-scissors.',
      skeleton: `// Write string RPS(string p1, string p2) where values are "rock", "paper", "scissors"
// Return "p1 wins", "p2 wins", or "draw"`,
      solution: `string RPS(string p1, string p2) => (p1, p2) switch
{
    ("rock", "scissors") or ("paper", "rock") or ("scissors", "paper") => "p1 wins",
    ("scissors", "rock") or ("rock", "paper") or ("paper", "scissors") => "p2 wins",
    _ => "draw"
};`,
      hints: ['Create a tuple from both players and match patterns.', 'Use or to combine winning combinations.', 'The default case handles ties and invalid input.'],
      concepts: ['tuple pattern', 'switch expression', 'or pattern'],
    },
    {
      id: 'cs-tup-13',
      title: 'Bug: Tuple Name Mismatch',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the code that accesses wrong tuple element names.',
      skeleton: `(string Name, int Age) GetPerson() => ("Alice", 30);

var person = GetPerson();
Console.WriteLine(person.Item1);  // works but loses readability
Console.WriteLine(person.Item2);  // hard to understand`,
      solution: `(string Name, int Age) GetPerson() => ("Alice", 30);

var person = GetPerson();
Console.WriteLine(person.Name);  // clear and readable
Console.WriteLine(person.Age);   // self-documenting`,
      hints: ['Named tuples have meaningful element names.', 'Item1/Item2 work but are less readable.', 'Use the declared names (Name, Age) for clarity.'],
      concepts: ['tuple naming', 'readability', 'Item1 vs names'],
    },
    {
      id: 'cs-tup-14',
      title: 'Bug: Tuple Assignment Mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the deconstructed variable order mismatch.',
      skeleton: `(string Name, int Age) GetPerson() => ("Alice", 30);
var (age, name) = GetPerson();
Console.WriteLine($"{name} is {age}");  // Bug: "30 is Alice"`,
      solution: `(string Name, int Age) GetPerson() => ("Alice", 30);
var (name, age) = GetPerson();
Console.WriteLine($"{name} is {age}");  // "Alice is 30"`,
      hints: ['Deconstruction assigns by position, not by name.', 'First element goes to first variable.', 'Variable order must match tuple element order.'],
      concepts: ['positional deconstruction', 'variable order'],
    },
    {
      id: 'cs-tup-15',
      title: 'Bug: ValueTuple in Async',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the issue with unnamed tuple elements in async methods.',
      skeleton: `// Names are lost when returning tuples from Task
async Task<(string, int)> GetDataAsync()
{
    await Task.Delay(10);
    return ("Alice", 30);
}
// Bug: caller sees Item1, Item2 -- names not preserved
var result = await GetDataAsync();
Console.WriteLine(result.Item1);`,
      solution: `async Task<(string Name, int Age)> GetDataAsync()
{
    await Task.Delay(10);
    return ("Alice", 30);
}

var result = await GetDataAsync();
Console.WriteLine(result.Name);  // names preserved`,
      hints: ['Name tuple elements in the return type declaration.', 'Task<(string, int)> loses element names.', 'Task<(string Name, int Age)> preserves them.'],
      concepts: ['async tuple return', 'element naming', 'Task<T>'],
    },
    {
      id: 'cs-tup-16',
      title: 'Predict Tuple Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output of tuple operations.',
      skeleton: `var t = (A: 1, B: 2, C: 3);
Console.WriteLine(t.B);
t.B = 99;
Console.WriteLine(t.B);`,
      solution: `2
99`,
      hints: ['Tuples are mutable structs when stored in a local variable.', 't.B starts at 2, then is set to 99.', 'Named elements are accessed by their names.'],
      concepts: ['tuple mutability', 'element access'],
    },
    {
      id: 'cs-tup-17',
      title: 'Predict Tuple Equality',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict tuple equality comparison results.',
      skeleton: `(int, string) a = (1, "hi");
(int, string) b = (1, "hi");
(int, string) c = (2, "hi");
Console.WriteLine(a == b);
Console.WriteLine(a == c);`,
      solution: `True
False`,
      hints: ['Tuple equality is element-wise.', 'a and b have the same elements: True.', 'a and c differ in the first element: False.'],
      concepts: ['tuple equality', 'element-wise comparison'],
    },
    {
      id: 'cs-tup-18',
      title: 'Predict Deconstruction Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of tuple deconstruction and swap.',
      skeleton: `int a = 1, b = 2;
(a, b) = (b, a);
(a, b) = (a + b, a - b);
Console.WriteLine($"{a},{b}");`,
      solution: `3,1`,
      hints: ['First swap: a=2, b=1.', 'Then: a = 2+1 = 3, b = 2-1 = 1 (using pre-assignment values).', 'Right side is evaluated before left side is assigned.'],
      concepts: ['tuple swap', 'simultaneous assignment'],
    },
    {
      id: 'cs-tup-19',
      title: 'Refactor Out Parameters to Tuple',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Replace out parameters with a tuple return.',
      skeleton: `bool TryDivide(int a, int b, out int quotient, out int remainder)
{
    if (b == 0) { quotient = 0; remainder = 0; return false; }
    quotient = a / b;
    remainder = a % b;
    return true;
}`,
      solution: `(bool Success, int Quotient, int Remainder) TryDivide(int a, int b)
{
    if (b == 0) return (false, 0, 0);
    return (true, a / b, a % b);
}`,
      hints: ['Tuples eliminate the need for out parameters.', 'Return all values in a single named tuple.', 'Callers use deconstruction or dot access.'],
      concepts: ['out to tuple', 'multiple returns', 'API simplification'],
    },
    {
      id: 'cs-tup-20',
      title: 'Refactor Anonymous Type to Tuple',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Replace anonymous types with tuples in LINQ.',
      skeleton: `var results = people
    .Select(p => new { p.Name, NameLength = p.Name.Length })
    .Where(x => x.NameLength > 3)
    .OrderBy(x => x.Name)
    .ToList();
// Anonymous types cannot be returned from methods`,
      solution: `var results = people
    .Select(p => (p.Name, NameLength: p.Name.Length))
    .Where(x => x.NameLength > 3)
    .OrderBy(x => x.Name)
    .ToList();
// Tuples can be returned from methods as List<(string Name, int NameLength)>`,
      hints: ['Tuples can replace anonymous types in most LINQ scenarios.', 'Unlike anonymous types, tuples can be used as return types.', 'Named tuple elements maintain readability.'],
      concepts: ['anonymous type to tuple', 'LINQ tuples', 'return type'],
    },
  ],
};
