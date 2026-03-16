import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-enums',
  title: '26. Enums',
  explanation: `## Enums

Enums define a set of named constants backed by an integral type (default: \`int\`).

\`\`\`csharp
// Basic enum
enum Direction { North, South, East, West }

// Explicit values
enum HttpStatus
{
    Ok = 200,
    NotFound = 404,
    InternalError = 500
}

// Flags enum (bitwise combinations)
[Flags]
enum Permission
{
    None = 0,
    Read = 1,
    Write = 2,
    Execute = 4,
    All = Read | Write | Execute
}

// Usage
var perms = Permission.Read | Permission.Write;
bool canWrite = perms.HasFlag(Permission.Write); // true

// Parsing
var dir = Enum.Parse<Direction>("North");
bool ok = Enum.TryParse<Direction>("East", out var d);

// Getting all values
var allDirs = Enum.GetValues<Direction>();
\`\`\`

Enums cannot have methods, but extension methods can add behavior.`,
  exercises: [
    {
      id: 'cs-enum-1',
      title: 'Declare an Enum',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a basic enum.',
      skeleton: `__BLANK__ Season { Spring, Summer, Autumn, Winter }`,
      solution: `enum Season { Spring, Summer, Autumn, Winter }`,
      hints: ['Enums use the enum keyword.', 'Values start at 0 by default.', 'The answer is: enum'],
      concepts: ['enum declaration', 'named constants'],
    },
    {
      id: 'cs-enum-2',
      title: 'Explicit Values',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Assign explicit numeric values to enum members.',
      skeleton: `enum Priority
{
    Low = __BLANK__,
    Medium = 5,
    High = 10
}`,
      solution: `enum Priority
{
    Low = 1,
    Medium = 5,
    High = 10
}`,
      hints: ['Enum values can be any integral constant.', 'Without explicit values, they increment from 0.', 'The answer is: 1'],
      concepts: ['explicit enum values', 'integral backing'],
    },
    {
      id: 'cs-enum-3',
      title: 'Flags Attribute',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Mark an enum as a flags enum for bitwise combinations.',
      skeleton: `__BLANK__
enum FileAccess
{
    None = 0,
    Read = 1,
    Write = 2,
    ReadWrite = Read | Write
}`,
      solution: `[Flags]
enum FileAccess
{
    None = 0,
    Read = 1,
    Write = 2,
    ReadWrite = Read | Write
}`,
      hints: ['[Flags] enables bitwise operations and proper ToString.', 'Values should be powers of 2.', 'The answer is: [Flags]'],
      concepts: ['Flags attribute', 'bitwise enum'],
    },
    {
      id: 'cs-enum-4',
      title: 'HasFlag Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Check if a flag is set.',
      skeleton: `var perms = Permission.Read | Permission.Execute;
bool canRead = perms.__BLANK__(Permission.Read);`,
      solution: `var perms = Permission.Read | Permission.Execute;
bool canRead = perms.HasFlag(Permission.Read);`,
      hints: ['HasFlag checks if a specific flag is set.', 'It works with [Flags] enums.', 'The answer is: HasFlag'],
      concepts: ['HasFlag', 'flag checking'],
    },
    {
      id: 'cs-enum-5',
      title: 'Enum.Parse',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Parse a string into an enum value.',
      skeleton: `string input = "North";
Direction dir = Enum.__BLANK__<Direction>(input);`,
      solution: `string input = "North";
Direction dir = Enum.Parse<Direction>(input);`,
      hints: ['Enum.Parse converts a string to an enum value.', 'It throws if the string is invalid.', 'The answer is: Parse'],
      concepts: ['Enum.Parse', 'string to enum'],
    },
    {
      id: 'cs-enum-6',
      title: 'Underlying Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Declare an enum with a byte underlying type.',
      skeleton: `enum Color : __BLANK__
{
    Red = 0,
    Green = 1,
    Blue = 2
}`,
      solution: `enum Color : byte
{
    Red = 0,
    Green = 1,
    Blue = 2
}`,
      hints: ['Enums can specify an underlying integral type after :.', 'Valid types: byte, sbyte, short, ushort, int, uint, long, ulong.', 'The answer is: byte'],
      concepts: ['underlying type', 'enum : byte'],
    },
    {
      id: 'cs-enum-7',
      title: 'Enum Extension Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write extension methods to add behavior to an enum.',
      skeleton: `// Given: enum Direction { North, South, East, West }
// Write: static Direction Opposite(this Direction dir)
// Write: static bool IsHorizontal(this Direction dir)`,
      solution: `static class DirectionExtensions
{
    public static Direction Opposite(this Direction dir) => dir switch
    {
        Direction.North => Direction.South,
        Direction.South => Direction.North,
        Direction.East => Direction.West,
        Direction.West => Direction.East,
        _ => throw new ArgumentOutOfRangeException(nameof(dir))
    };

    public static bool IsHorizontal(this Direction dir)
        => dir is Direction.East or Direction.West;
}`,
      hints: ['Extension methods add behavior to enums.', 'Use switch expressions for mapping.', 'Put them in a static class.'],
      concepts: ['extension method', 'enum behavior', 'switch expression'],
    },
    {
      id: 'cs-enum-8',
      title: 'Flags Toggle',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write methods to add, remove, and toggle flags.',
      skeleton: `// [Flags] enum Permission { None=0, Read=1, Write=2, Execute=4 }
// Write: Permission AddFlag(Permission perms, Permission flag)
// Write: Permission RemoveFlag(Permission perms, Permission flag)
// Write: Permission ToggleFlag(Permission perms, Permission flag)`,
      solution: `Permission AddFlag(Permission perms, Permission flag)
    => perms | flag;

Permission RemoveFlag(Permission perms, Permission flag)
    => perms & ~flag;

Permission ToggleFlag(Permission perms, Permission flag)
    => perms ^ flag;`,
      hints: ['| adds a flag, & ~ removes, ^ toggles.', 'These are standard bitwise operations.', '~ inverts the flag bits for removal.'],
      concepts: ['bitwise operations', 'flag manipulation', 'OR AND XOR NOT'],
    },
    {
      id: 'cs-enum-9',
      title: 'Enum to String Mapping',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method that maps enum values to display strings.',
      skeleton: `// enum Status { Active, Inactive, Pending, Suspended }
// Write: string ToDisplayString(this Status status)
// Active => "Active", Inactive => "Not Active", Pending => "Awaiting Review", Suspended => "Account Suspended"`,
      solution: `static string ToDisplayString(this Status status) => status switch
{
    Status.Active => "Active",
    Status.Inactive => "Not Active",
    Status.Pending => "Awaiting Review",
    Status.Suspended => "Account Suspended",
    _ => status.ToString()
};`,
      hints: ['Use a switch expression for clean mapping.', 'The default case falls back to ToString().', 'This avoids Description attributes for simple cases.'],
      concepts: ['display string', 'enum mapping', 'switch expression'],
    },
    {
      id: 'cs-enum-10',
      title: 'Safe Enum Parse',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a safe parse method that returns a default on failure.',
      skeleton: `// Write T SafeParse<T>(string value, T defaultValue) where T : struct, Enum`,
      solution: `T SafeParse<T>(string value, T defaultValue) where T : struct, Enum
    => Enum.TryParse<T>(value, ignoreCase: true, out var result) ? result : defaultValue;`,
      hints: ['Enum.TryParse returns false instead of throwing.', 'Use the Enum constraint for type safety.', 'ignoreCase: true handles different casing.'],
      concepts: ['TryParse', 'Enum constraint', 'safe parsing'],
    },
    {
      id: 'cs-enum-11',
      title: 'Enum Iterator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a method that iterates all enum values.',
      skeleton: `// Write List<string> GetAllNames<T>() where T : struct, Enum`,
      solution: `List<string> GetAllNames<T>() where T : struct, Enum
    => Enum.GetValues<T>().Select(v => v.ToString()).ToList();`,
      hints: ['Enum.GetValues<T>() returns all defined values.', 'Use LINQ Select to convert to strings.', 'The Enum constraint ensures T is an enum.'],
      concepts: ['Enum.GetValues', 'generic enum', 'iteration'],
    },
    {
      id: 'cs-enum-12',
      title: 'Flags Decomposition',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method that decomposes a flags enum into individual flags.',
      skeleton: `// Write IEnumerable<T> DecomposeFlags<T>(T flags) where T : struct, Enum
// Return each individual set flag (exclude 0 and composite values)`,
      solution: `IEnumerable<T> DecomposeFlags<T>(T flags) where T : struct, Enum
{
    var intVal = Convert.ToInt64(flags);
    foreach (var value in Enum.GetValues<T>())
    {
        var v = Convert.ToInt64(value);
        if (v != 0 && (v & (v - 1)) == 0 && (intVal & v) == v)
            yield return value;
    }
}`,
      hints: ['Check if each value is a power of 2 (single flag).', 'v & (v-1) == 0 tests for power of 2.', 'Check if the flag is set with bitwise AND.'],
      concepts: ['flags decomposition', 'power of 2', 'bitwise AND'],
    },
    {
      id: 'cs-enum-13',
      title: 'Bug: Invalid Enum Cast',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the bug where an invalid integer is cast to an enum.',
      skeleton: `enum Color { Red, Green, Blue }
Color c = (Color)999;  // no error at compile time!
Console.WriteLine(c);  // prints "999" -- not a valid Color`,
      solution: `enum Color { Red, Green, Blue }
int value = 999;
if (Enum.IsDefined(typeof(Color), value))
{
    Color c = (Color)value;
    Console.WriteLine(c);
}
else
{
    Console.WriteLine("Invalid color value");
}`,
      hints: ['C# allows any integer to be cast to an enum.', 'Use Enum.IsDefined to validate before casting.', 'This prevents invalid enum values.'],
      concepts: ['Enum.IsDefined', 'validation', 'invalid cast'],
    },
    {
      id: 'cs-enum-14',
      title: 'Bug: Flags Without Powers of 2',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the flags enum that uses sequential values instead of powers of 2.',
      skeleton: `[Flags]
enum Options
{
    None = 0,
    Bold = 1,
    Italic = 2,
    Underline = 3,  // Bug: 3 = Bold | Italic, not a unique flag!
    Strikethrough = 4
}`,
      solution: `[Flags]
enum Options
{
    None = 0,
    Bold = 1,
    Italic = 2,
    Underline = 4,
    Strikethrough = 8
}`,
      hints: ['Flags values must be powers of 2 for correct bitwise behavior.', '3 is 1|2, which overlaps with Bold and Italic.', 'Use 1, 2, 4, 8, 16, etc.'],
      concepts: ['flags values', 'powers of 2', 'bitwise correctness'],
    },
    {
      id: 'cs-enum-15',
      title: 'Bug: Switch Missing Enum Value',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the switch that does not handle all enum values.',
      skeleton: `enum Day { Mon, Tue, Wed, Thu, Fri, Sat, Sun }
string Type(Day d) => d switch
{
    Day.Sat => "weekend",
    Day.Sun => "weekend",
    Day.Mon => "weekday",
    Day.Tue => "weekday",
    Day.Wed => "weekday",
    // Bug: missing Thu and Fri!
};`,
      solution: `enum Day { Mon, Tue, Wed, Thu, Fri, Sat, Sun }
string Type(Day d) => d switch
{
    Day.Sat or Day.Sun => "weekend",
    _ => "weekday"
};`,
      hints: ['The switch does not handle all enum members.', 'Use a default arm _ or combine patterns with or.', 'Weekend is the specific case; weekday is the default.'],
      concepts: ['exhaustive switch', 'or pattern', 'default arm'],
    },
    {
      id: 'cs-enum-16',
      title: 'Predict Enum Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the numeric value of enum members.',
      skeleton: `enum Fruit { Apple, Banana, Cherry }
Console.WriteLine((int)Fruit.Apple);
Console.WriteLine((int)Fruit.Cherry);`,
      solution: `0
2`,
      hints: ['Enum values start at 0 by default.', 'Apple=0, Banana=1, Cherry=2.', 'Cast to int to get the numeric value.'],
      concepts: ['enum to int', 'default values'],
    },
    {
      id: 'cs-enum-17',
      title: 'Predict Flags ToString',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the ToString output of a flags enum.',
      skeleton: `[Flags]
enum Perm { None=0, Read=1, Write=2, Exec=4, All=7 }
var p = Perm.Read | Perm.Write;
Console.WriteLine(p);`,
      solution: `Read, Write`,
      hints: ['[Flags] makes ToString show individual flag names.', 'Read | Write = 3, which is Read + Write.', 'ToString shows "Read, Write" for combined flags.'],
      concepts: ['Flags ToString', 'bitwise OR'],
    },
    {
      id: 'cs-enum-18',
      title: 'Predict Enum Comparison',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of enum comparisons.',
      skeleton: `enum Priority { Low = 1, Medium = 5, High = 10 }
Console.WriteLine(Priority.High > Priority.Low);
Console.WriteLine((int)Priority.Medium);`,
      solution: `True
5`,
      hints: ['Enums support comparison operators based on their numeric values.', 'High (10) > Low (1) is True.', 'Medium cast to int is 5.'],
      concepts: ['enum comparison', 'numeric ordering'],
    },
    {
      id: 'cs-enum-19',
      title: 'Refactor Magic Numbers to Enum',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Replace magic numbers with a meaningful enum.',
      skeleton: `string GetStatus(int code)
{
    if (code == 0) return "Success";
    if (code == 1) return "Warning";
    if (code == 2) return "Error";
    if (code == 3) return "Fatal";
    return "Unknown";
}`,
      solution: `enum StatusCode { Success, Warning, Error, Fatal }

string GetStatus(StatusCode code) => code switch
{
    StatusCode.Success => "Success",
    StatusCode.Warning => "Warning",
    StatusCode.Error => "Error",
    StatusCode.Fatal => "Fatal",
    _ => "Unknown"
};`,
      hints: ['Replace integer codes with named enum values.', 'Enums are self-documenting and type-safe.', 'The compiler catches missing cases.'],
      concepts: ['magic numbers', 'enum refactoring', 'type safety'],
    },
    {
      id: 'cs-enum-20',
      title: 'Refactor String Constants to Enum',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Replace string-based state tracking with an enum.',
      skeleton: `class Order
{
    public string Status { get; set; } = "pending";

    public void Ship()
    {
        if (Status == "pending")
            Status = "shipped";
    }

    public void Deliver()
    {
        if (Status == "shipped")
            Status = "delivered";
    }
}`,
      solution: `enum OrderStatus { Pending, Shipped, Delivered }

class Order
{
    public OrderStatus Status { get; private set; } = OrderStatus.Pending;

    public void Ship()
    {
        if (Status == OrderStatus.Pending)
            Status = OrderStatus.Shipped;
    }

    public void Deliver()
    {
        if (Status == OrderStatus.Shipped)
            Status = OrderStatus.Delivered;
    }
}`,
      hints: ['String comparisons are error-prone (typos, casing).', 'Enums provide compile-time safety.', 'Intellisense shows all valid values.'],
      concepts: ['string to enum', 'state management', 'type safety'],
    },
  ],
};
