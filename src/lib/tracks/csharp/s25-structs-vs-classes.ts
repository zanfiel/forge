import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-structs',
  title: '25. Structs vs Classes',
  explanation: `## Structs vs Classes

Structs are **value types** (stack-allocated, copied on assignment). Classes are **reference types** (heap-allocated, shared by reference).

\`\`\`csharp
// Struct (value type)
struct Point
{
    public double X;
    public double Y;
    public Point(double x, double y) => (X, Y) = (x, y);
}

// Readonly struct (all members immutable)
readonly struct Vector
{
    public double X { get; }
    public double Y { get; }
    public Vector(double x, double y) => (X, Y) = (x, y);
    public double Length => Math.Sqrt(X * X + Y * Y);
}

// ref struct (stack-only, cannot be boxed)
ref struct SpanWrapper
{
    public Span<byte> Data;
}
\`\`\`

**Choose struct when**: small (< 16 bytes), immutable, short-lived, no inheritance needed.
**Choose class when**: large, mutable, needs inheritance, needs null semantics.

Key differences: structs cannot inherit, have no finalizers, default to value equality, and are copied on assignment.`,
  exercises: [
    {
      id: 'cs-svsc-1',
      title: 'Struct Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a simple struct.',
      skeleton: `__BLANK__ Temperature
{
    public double Celsius { get; }
    public Temperature(double celsius) => Celsius = celsius;
}`,
      solution: `struct Temperature
{
    public double Celsius { get; }
    public Temperature(double celsius) => Celsius = celsius;
}`,
      hints: ['Structs use the struct keyword.', 'They are value types allocated on the stack.', 'The answer is: struct'],
      concepts: ['struct declaration', 'value type'],
    },
    {
      id: 'cs-svsc-2',
      title: 'Readonly Struct',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Declare an immutable struct.',
      skeleton: `__BLANK__ struct Fraction
{
    public int Numerator { get; }
    public int Denominator { get; }
}`,
      solution: `readonly struct Fraction
{
    public int Numerator { get; }
    public int Denominator { get; }
}`,
      hints: ['readonly ensures all members are immutable.', 'The compiler enforces that no fields are modified after construction.', 'The answer is: readonly'],
      concepts: ['readonly struct', 'immutability'],
    },
    {
      id: 'cs-svsc-3',
      title: 'Ref Struct',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Declare a stack-only struct that cannot be boxed.',
      skeleton: `__BLANK__ struct TokenReader
{
    public ReadOnlySpan<char> Remaining;
}`,
      solution: `ref struct TokenReader
{
    public ReadOnlySpan<char> Remaining;
}`,
      hints: ['ref struct can only live on the stack.', 'It can contain Span<T> fields which are also stack-only.', 'The answer is: ref'],
      concepts: ['ref struct', 'stack-only', 'Span containment'],
    },
    {
      id: 'cs-svsc-4',
      title: 'Value Type Copy Behavior',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Understand that struct assignment creates a copy.',
      skeleton: `struct Point { public int X; public int Y; }
var a = new Point { X = 1, Y = 2 };
var b = a;      // b is a __BLANK__ of a
b.X = 99;
Console.WriteLine(a.X);  // still 1`,
      solution: `struct Point { public int X; public int Y; }
var a = new Point { X = 1, Y = 2 };
var b = a;      // b is a copy of a
b.X = 99;
Console.WriteLine(a.X);  // still 1`,
      hints: ['Structs are value types -- assignment copies all fields.', 'Changing b does not affect a.', 'The answer is: copy'],
      concepts: ['value semantics', 'copy on assignment'],
    },
    {
      id: 'cs-svsc-5',
      title: 'Default Struct Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Get the default value of a struct.',
      skeleton: `struct Pair { public int A; public int B; }
var p = __BLANK__(Pair);
Console.WriteLine($"{p.A}, {p.B}");  // 0, 0`,
      solution: `struct Pair { public int A; public int B; }
var p = default(Pair);
Console.WriteLine($"{p.A}, {p.B}");  // 0, 0`,
      hints: ['default zeroes all fields of a struct.', 'int defaults to 0, bool to false, reference to null.', 'The answer is: default'],
      concepts: ['default value', 'struct zeroing'],
    },
    {
      id: 'cs-svsc-6',
      title: 'In Parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Pass a large struct by reference without allowing modification.',
      skeleton: `readonly struct Matrix4x4 { /* 64 bytes of data */ }

double Determinant(__BLANK__ Matrix4x4 m)
{
    // read-only access to m, no copy made
    return 0.0;
}`,
      solution: `readonly struct Matrix4x4 { /* 64 bytes of data */ }

double Determinant(in Matrix4x4 m)
{
    // read-only access to m, no copy made
    return 0.0;
}`,
      hints: ['in passes by readonly reference.', 'It avoids copying large structs.', 'The answer is: in'],
      concepts: ['in parameter', 'readonly reference', 'performance'],
    },
    {
      id: 'cs-svsc-7',
      title: 'Struct with IEquatable',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a struct that implements IEquatable to avoid boxing in equality checks.',
      skeleton: `// Write readonly struct Color : IEquatable<Color> with:
// - byte R, G, B properties
// - Equals(Color), Equals(object?), GetHashCode, operator ==, operator !=`,
      solution: `readonly struct Color : IEquatable<Color>
{
    public byte R { get; }
    public byte G { get; }
    public byte B { get; }

    public Color(byte r, byte g, byte b) => (R, G, B) = (r, g, b);

    public bool Equals(Color other)
        => R == other.R && G == other.G && B == other.B;

    public override bool Equals(object? obj)
        => obj is Color c && Equals(c);

    public override int GetHashCode() => HashCode.Combine(R, G, B);

    public static bool operator ==(Color left, Color right) => left.Equals(right);
    public static bool operator !=(Color left, Color right) => !left.Equals(right);
}`,
      hints: ['IEquatable<T> avoids boxing when comparing structs.', 'Override Equals(object) and GetHashCode too.', 'Implement == and != operators for consistency.'],
      concepts: ['IEquatable', 'struct equality', 'avoiding boxing'],
    },
    {
      id: 'cs-svsc-8',
      title: 'Struct vs Class Performance',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write equivalent struct and class types and explain the performance difference.',
      skeleton: `// Write struct PointS { double X, Y; } and class PointC { double X, Y; }
// Write void BenchmarkStruct() -- create 1M PointS in an array
// Write void BenchmarkClass() -- create 1M PointC in an array
// Explain: why is the struct version faster?`,
      solution: `struct PointS { public double X; public double Y; }
class PointC { public double X; public double Y; }

void BenchmarkStruct()
{
    var arr = new PointS[1_000_000];
    for (int i = 0; i < arr.Length; i++)
        arr[i] = new PointS { X = i, Y = i };
    // Struct: contiguous memory, no GC pressure, cache-friendly
}

void BenchmarkClass()
{
    var arr = new PointC[1_000_000];
    for (int i = 0; i < arr.Length; i++)
        arr[i] = new PointC { X = i, Y = i };
    // Class: 1M heap allocations, GC pressure, pointer indirection
}`,
      hints: ['Structs in arrays are stored contiguously (no heap allocs).', 'Classes require individual heap allocations and pointer indirection.', 'Structs are cache-friendly for sequential access.'],
      concepts: ['struct performance', 'heap vs stack', 'cache locality'],
    },
    {
      id: 'cs-svsc-9',
      title: 'Custom ToString and IFormattable',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a struct that implements IFormattable.',
      skeleton: `// Write readonly struct Distance : IFormattable with:
// - double Meters property
// - ToString(string? format, IFormatProvider? provider)
// - "m" format => meters, "km" format => kilometers, default => meters`,
      solution: `readonly struct Distance : IFormattable
{
    public double Meters { get; }
    public Distance(double meters) => Meters = meters;

    public string ToString(string? format, IFormatProvider? provider) => format switch
    {
        "km" => $"{Meters / 1000.0:F2} km",
        "m" or null or "" => $"{Meters:F2} m",
        _ => throw new FormatException($"Unknown format: {format}")
    };

    public override string ToString() => ToString(null, null);
}`,
      hints: ['IFormattable allows custom format strings.', 'Switch on the format parameter.', 'Always override ToString() to call the IFormattable version.'],
      concepts: ['IFormattable', 'custom formatting', 'struct methods'],
    },
    {
      id: 'cs-svsc-10',
      title: 'Ref Struct SpanParser',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a ref struct that parses a ReadOnlySpan<char> without allocations.',
      skeleton: `// Write ref struct LineReader with:
// - ReadOnlySpan<char> _remaining field
// - Constructor taking ReadOnlySpan<char>
// - bool TryReadLine(out ReadOnlySpan<char> line) -- reads up to \\n`,
      solution: `ref struct LineReader
{
    private ReadOnlySpan<char> _remaining;

    public LineReader(ReadOnlySpan<char> text) => _remaining = text;

    public bool TryReadLine(out ReadOnlySpan<char> line)
    {
        if (_remaining.IsEmpty)
        {
            line = default;
            return false;
        }

        int idx = _remaining.IndexOf('\\n');
        if (idx < 0)
        {
            line = _remaining;
            _remaining = default;
        }
        else
        {
            line = _remaining[..idx];
            _remaining = _remaining[(idx + 1)..];
        }
        return true;
    }
}`,
      hints: ['ref struct can hold Span/ReadOnlySpan fields.', 'Use IndexOf to find newlines.', 'Slice with range operators for zero-allocation parsing.'],
      concepts: ['ref struct', 'ReadOnlySpan', 'zero-allocation parsing'],
    },
    {
      id: 'cs-svsc-11',
      title: 'Struct with Explicit Layout',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a union-like struct using explicit layout.',
      skeleton: `// Write a struct IntOrFloat using StructLayout(LayoutKind.Explicit) that:
// - Overlays an int and a float at the same memory location
// - Has bool IsFloat to track which is active`,
      solution: `[System.Runtime.InteropServices.StructLayout(
    System.Runtime.InteropServices.LayoutKind.Explicit)]
struct IntOrFloat
{
    [System.Runtime.InteropServices.FieldOffset(0)]
    public int IntValue;

    [System.Runtime.InteropServices.FieldOffset(0)]
    public float FloatValue;

    [System.Runtime.InteropServices.FieldOffset(4)]
    public bool IsFloat;
}`,
      hints: ['LayoutKind.Explicit allows overlapping fields.', 'Fields at the same offset share memory (union).', 'Add a discriminator at a non-overlapping offset.'],
      concepts: ['explicit layout', 'union', 'FieldOffset'],
    },
    {
      id: 'cs-svsc-12',
      title: 'Struct Implementing Interface',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a generic method that works with structs implementing an interface without boxing.',
      skeleton: `// Write T Add<T>(T a, T b) where T : IAdditionOperators<T, T, T>
// Uses .NET 7 generic math to add without boxing`,
      solution: `T Add<T>(T a, T b) where T : System.Numerics.IAdditionOperators<T, T, T>
    => a + b;`,
      hints: ['Generic constraints with interfaces avoid boxing for structs.', 'IAdditionOperators enables the + operator generically.', 'This is .NET 7 generic math.'],
      concepts: ['generic math', 'boxing avoidance', 'IAdditionOperators'],
    },
    {
      id: 'cs-svsc-13',
      title: 'Bug: Struct Boxing',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the unintentional boxing of a struct.',
      skeleton: `struct Counter { public int Value; }

object box = new Counter { Value = 5 };  // boxed
((Counter)box).Value = 10;  // modifies a copy!
Console.WriteLine(((Counter)box).Value);  // still 5`,
      solution: `struct Counter { public int Value; }

var counter = new Counter { Value = 5 };
counter.Value = 10;
Console.WriteLine(counter.Value);  // 10`,
      hints: ['Assigning a struct to object boxes it (copies to heap).', 'Unboxing creates another copy; mutations are lost.', 'Keep structs as their value type to avoid boxing.'],
      concepts: ['boxing', 'value type copy', 'unboxing'],
    },
    {
      id: 'cs-svsc-14',
      title: 'Bug: Mutable Struct in Collection',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the issue with mutating a struct stored in a list.',
      skeleton: `struct Item { public string Name; public int Count; }
var list = new List<Item> { new Item { Name = "A", Count = 0 } };
list[0].Count++;  // Error: cannot modify return value of List indexer`,
      solution: `struct Item { public string Name; public int Count; }
var list = new List<Item> { new Item { Name = "A", Count = 0 } };
var item = list[0];
item.Count++;
list[0] = item;  // replace the whole struct`,
      hints: ['List<T> indexer returns a copy of the struct.', 'You cannot modify the copy in place.', 'Copy out, modify, and assign back.'],
      concepts: ['struct in collection', 'indexer copy', 'value type mutation'],
    },
    {
      id: 'cs-svsc-15',
      title: 'Bug: Large Struct Parameter',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the performance issue of passing a large struct by value.',
      skeleton: `struct BigData
{
    public double A, B, C, D, E, F, G, H; // 64 bytes
}

double ProcessData(BigData data)
{
    return data.A + data.B + data.C;
    // Bug: entire 64-byte struct is copied on each call
}`,
      solution: `struct BigData
{
    public double A, B, C, D, E, F, G, H;
}

double ProcessData(in BigData data)
{
    return data.A + data.B + data.C;
    // Fix: passed by readonly reference, no copy
}`,
      hints: ['Large structs should be passed by reference to avoid copying.', 'The in keyword passes by readonly reference.', 'This avoids the 64-byte copy on each call.'],
      concepts: ['in parameter', 'pass by reference', 'struct performance'],
    },
    {
      id: 'cs-svsc-16',
      title: 'Predict Copy Semantics',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output showing struct copy behavior.',
      skeleton: `struct Point { public int X; }
var a = new Point { X = 1 };
var b = a;
b.X = 2;
Console.WriteLine($"{a.X},{b.X}");`,
      solution: `1,2`,
      hints: ['b is a copy of a.', 'Changing b.X does not affect a.X.', 'Structs have value semantics.'],
      concepts: ['value semantics', 'copy on assignment'],
    },
    {
      id: 'cs-svsc-17',
      title: 'Predict Class Reference Semantics',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output showing class reference behavior.',
      skeleton: `class Point { public int X; }
var a = new Point { X = 1 };
var b = a;
b.X = 2;
Console.WriteLine($"{a.X},{b.X}");`,
      solution: `2,2`,
      hints: ['b references the same object as a.', 'Changing b.X changes a.X too.', 'Classes have reference semantics.'],
      concepts: ['reference semantics', 'shared state'],
    },
    {
      id: 'cs-svsc-18',
      title: 'Predict Default Struct',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the default values of a struct.',
      skeleton: `struct Config
{
    public int Port;
    public bool Enabled;
    public string? Name;
}
var c = default(Config);
Console.WriteLine($"{c.Port},{c.Enabled},{c.Name == null}");`,
      solution: `0,False,True`,
      hints: ['default zeros all struct fields.', 'int defaults to 0, bool to false (printed as False).', 'Reference types (string?) default to null.'],
      concepts: ['default struct', 'zero initialization'],
    },
    {
      id: 'cs-svsc-19',
      title: 'Refactor Class to Struct',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor a small immutable class to a readonly struct.',
      skeleton: `class Money
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
            throw new InvalidOperationException("Currency mismatch");
        return new Money(Amount + other.Amount, Currency);
    }
}`,
      solution: `readonly record struct Money(decimal Amount, string Currency)
{
    public Money Add(Money other)
    {
        if (Currency != other.Currency)
            throw new InvalidOperationException("Currency mismatch");
        return new Money(Amount + other.Amount, Currency);
    }
}`,
      hints: ['Small, immutable types are good candidates for structs.', 'readonly record struct gives value equality and immutability.', 'Stack allocation avoids GC pressure.'],
      concepts: ['class to struct', 'readonly record struct', 'value type'],
    },
    {
      id: 'cs-svsc-20',
      title: 'Refactor to In Parameter',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Optimize method signatures to avoid unnecessary struct copies.',
      skeleton: `readonly struct Matrix
{
    public readonly double M00, M01, M10, M11;
}

Matrix Multiply(Matrix a, Matrix b)
{
    return new Matrix();
}

bool AreEqual(Matrix a, Matrix b)
{
    return a.M00 == b.M00 && a.M01 == b.M01
        && a.M10 == b.M10 && a.M11 == b.M11;
}`,
      solution: `readonly struct Matrix
{
    public readonly double M00, M01, M10, M11;
}

Matrix Multiply(in Matrix a, in Matrix b)
{
    return new Matrix();
}

bool AreEqual(in Matrix a, in Matrix b)
{
    return a.M00 == b.M00 && a.M01 == b.M01
        && a.M10 == b.M10 && a.M11 == b.M11;
}`,
      hints: ['in passes structs by readonly reference.', 'Avoids copying 32 bytes for each Matrix parameter.', 'The readonly struct ensures no defensive copies are made.'],
      concepts: ['in parameter', 'readonly struct', 'defensive copy avoidance'],
    },
  ],
};
