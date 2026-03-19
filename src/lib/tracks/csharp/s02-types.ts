import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-types',
  title: '2. Data Types',
  explanation: `## Data Types

C# has two categories of types: **value types** (stored on the stack) and **reference types** (stored on the heap).

\`\`\`csharp
// Value types -- hold data directly
int i = 42;           // 32-bit integer
long l = 100_000L;    // 64-bit integer
float f = 3.14f;      // 32-bit floating point
double d = 3.14159;   // 64-bit floating point
decimal m = 99.99m;   // 128-bit precise decimal
char c = 'A';         // 16-bit Unicode character
bool b = true;        // true or false

// Reference types -- hold a reference to data on the heap
string s = "hello";
object o = 42;        // boxing: value type wrapped in object
int[] arr = { 1, 2 }; // arrays are reference types

// Nullable value types
int? maybe = null;    // Nullable<int>
int value = maybe ?? 0; // null-coalescing

// Default values
default(int)     // 0
default(bool)    // false
default(string)  // null
default(double)  // 0.0
\`\`\`

Use \`decimal\` for financial calculations (no floating-point rounding). Use \`double\` for scientific calculations. Use \`int\` for general counting.`,
  exercises: [
    {
      id: 'cs-types-1',
      title: 'Declare a Long',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a long variable bigNumber with value 5000000000.',
      skeleton: `__BLANK__ bigNumber = 5000000000L;
Console.WriteLine(bigNumber);`,
      solution: `long bigNumber = 5000000000L;
Console.WriteLine(bigNumber);`,
      hints: [
        'This value exceeds the int range (about 2.1 billion max).',
        'Use the 64-bit integer type.',
        'The answer is: long',
      ],
      concepts: ['long', 'integer types', 'L suffix'],
    },
    {
      id: 'cs-types-2',
      title: 'Decimal for Money',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a decimal variable price with value 19.99.',
      skeleton: `decimal price = __BLANK__;
Console.WriteLine(price);`,
      solution: `decimal price = 19.99m;
Console.WriteLine(price);`,
      hints: [
        'Decimal literals need a suffix to distinguish from double.',
        'The suffix for decimal is m.',
        'The answer is: 19.99m',
      ],
      concepts: ['decimal', 'm suffix', 'financial precision'],
    },
    {
      id: 'cs-types-3',
      title: 'Float Suffix',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a float variable temperature with value 98.6.',
      skeleton: `float temperature = __BLANK__;
Console.WriteLine(temperature);`,
      solution: `float temperature = 98.6f;
Console.WriteLine(temperature);`,
      hints: [
        'Without a suffix, 98.6 is treated as a double.',
        'Float literals require the f suffix.',
        'The answer is: 98.6f',
      ],
      concepts: ['float', 'f suffix', 'floating point'],
    },
    {
      id: 'cs-types-4',
      title: 'Nullable Value Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Declare a nullable int that starts as null, then assign 42.',
      skeleton: `__BLANK__ value = null;
value = 42;
Console.WriteLine(value.Value);`,
      solution: `int? value = null;
value = 42;
Console.WriteLine(value.Value);`,
      hints: [
        'Add ? after the value type to make it nullable.',
        'int? is shorthand for Nullable<int>.',
        'The answer is: int?',
      ],
      concepts: ['nullable value type', 'int?', 'Nullable<T>'],
    },
    {
      id: 'cs-types-5',
      title: 'Char Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a char variable letter with the value A.',
      skeleton: `__BLANK__ letter = 'A';
Console.WriteLine(letter);`,
      solution: `char letter = 'A';
Console.WriteLine(letter);`,
      hints: [
        'Characters use single quotes in C#.',
        'The type for a single Unicode character is char.',
        'The answer is: char',
      ],
      concepts: ['char', 'single quotes', 'Unicode character'],
    },
    {
      id: 'cs-types-6',
      title: 'Bool from Comparison',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fill in the blank to store the result of comparing 10 > 5.',
      skeleton: `bool isGreater = __BLANK__;
Console.WriteLine(isGreater); // True`,
      solution: `bool isGreater = 10 > 5;
Console.WriteLine(isGreater); // True`,
      hints: [
        'Comparison operators return bool values.',
        '10 > 5 evaluates to true.',
        'The answer is: 10 > 5',
      ],
      concepts: ['bool', 'comparison', 'boolean expression'],
    },
    {
      id: 'cs-types-7',
      title: 'Type Conversion Method',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a method SafeToInt that takes a string and returns the parsed int, or 0 if parsing fails.',
      skeleton: ``,
      solution: `static int SafeToInt(string input)
{
    if (int.TryParse(input, out int result))
    {
        return result;
    }
    return 0;
}`,
      hints: [
        'int.TryParse returns a bool indicating success and outputs the parsed value.',
        'Use the out parameter to capture the parsed result.',
        'Return 0 as the fallback when parsing fails.',
      ],
      concepts: ['TryParse', 'type conversion', 'out parameter', 'error handling'],
    },
    {
      id: 'cs-types-8',
      title: 'Check Value Type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method IsValueType that takes an object and returns true if the underlying type is a value type.',
      skeleton: ``,
      solution: `static bool IsValueType(object obj)
{
    return obj.GetType().IsValueType;
}`,
      hints: [
        'Every object has a GetType() method that returns Type information.',
        'The Type class has an IsValueType property.',
        'Note: the parameter is already boxed since it is typed as object.',
      ],
      concepts: ['GetType', 'IsValueType', 'reflection', 'boxing'],
    },
    {
      id: 'cs-types-9',
      title: 'Numeric Range Checker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method FitsInByte that takes an int and returns true if it fits in a byte (0-255).',
      skeleton: ``,
      solution: `static bool FitsInByte(int value)
{
    return value >= byte.MinValue && value <= byte.MaxValue;
}`,
      hints: [
        'byte.MinValue is 0 and byte.MaxValue is 255.',
        'Check if the value falls within these bounds.',
        'Use && for combining two conditions.',
      ],
      concepts: ['byte', 'MinValue', 'MaxValue', 'range checking'],
    },
    {
      id: 'cs-types-10',
      title: 'Convert All Numeric Types',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method that takes a double and returns a tuple (int, float, decimal) with the value converted to each type.',
      skeleton: ``,
      solution: `static (int, float, decimal) ConvertAll(double value)
{
    int i = (int)value;
    float f = (float)value;
    decimal m = (decimal)value;
    return (i, f, m);
}`,
      hints: [
        'Use explicit casts: (int), (float), (decimal).',
        'Return a ValueTuple with all three converted values.',
        'Note: casting double to int truncates (does not round).',
      ],
      concepts: ['explicit cast', 'type conversion', 'tuple return', 'truncation'],
    },
    {
      id: 'cs-types-11',
      title: 'Nullable Unwrap Utility',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method GetValueOrDefault that takes an int? and an int defaultValue, returning the value or the default.',
      skeleton: ``,
      solution: `static int GetValueOrDefault(int? nullable, int defaultValue)
{
    return nullable ?? defaultValue;
}`,
      hints: [
        'The null-coalescing operator ?? returns the left side if non-null.',
        'If nullable is null, return defaultValue.',
        'Alternatively, nullable.GetValueOrDefault(defaultValue) works too.',
      ],
      concepts: ['nullable', 'null-coalescing', '?? operator', 'default value'],
    },
    {
      id: 'cs-types-12',
      title: 'Boxing Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the invalid cast. You cannot unbox an int directly to a long.',
      skeleton: `static long GetLong()
{
    int x = 42;
    object boxed = x;         // boxing int
    long result = (long)boxed; // InvalidCastException!
    return result;
}`,
      solution: `static long GetLong()
{
    int x = 42;
    object boxed = x;
    long result = (int)boxed;  // unbox to int first, then implicit conversion to long
    return result;
}`,
      hints: [
        'When unboxing, you must cast to the exact type that was boxed.',
        'boxed contains an int, so you must unbox to int first.',
        'An int implicitly converts to long after unboxing.',
      ],
      concepts: ['boxing', 'unboxing', 'InvalidCastException', 'type conversion'],
    },
    {
      id: 'cs-types-13',
      title: 'Overflow Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the overflow. The result exceeds int range but the code silently wraps.',
      skeleton: `static long Multiply()
{
    int a = 1_000_000;
    int b = 1_000_000;
    int result = a * b; // overflows silently!
    return result;
}`,
      solution: `static long Multiply()
{
    int a = 1_000_000;
    int b = 1_000_000;
    long result = (long)a * b;
    return result;
}`,
      hints: [
        'int * int produces an int result, which can overflow.',
        'Cast one operand to long before multiplying.',
        'Change the result type to long and cast: (long)a * b.',
      ],
      concepts: ['integer overflow', 'long', 'explicit cast', 'numeric promotion'],
    },
    {
      id: 'cs-types-14',
      title: 'String to Number Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the code that crashes when parsing an invalid string.',
      skeleton: `static int ParseInput(string input)
{
    int result = int.Parse(input); // throws on "abc"
    return result;
}`,
      solution: `static int ParseInput(string input)
{
    if (int.TryParse(input, out int result))
    {
        return result;
    }
    return 0;
}`,
      hints: [
        'int.Parse throws FormatException on invalid input.',
        'Use int.TryParse instead, which returns false on failure.',
        'TryParse outputs the result via an out parameter.',
      ],
      concepts: ['TryParse', 'Parse', 'FormatException', 'safe parsing'],
    },
    {
      id: 'cs-types-15',
      title: 'Predict Decimal Precision',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `decimal a = 0.1m;
decimal b = 0.2m;
Console.WriteLine(a + b == 0.3m);`,
      solution: `True`,
      hints: [
        'Unlike double, decimal represents base-10 fractions exactly.',
        '0.1m + 0.2m = 0.3m with no floating-point error.',
        'The comparison returns True.',
      ],
      concepts: ['decimal', 'precision', 'floating point comparison'],
    },
    {
      id: 'cs-types-16',
      title: 'Predict Double Precision',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `double a = 0.1;
double b = 0.2;
Console.WriteLine(a + b == 0.3);`,
      solution: `False`,
      hints: [
        'Double uses binary floating point, which cannot represent 0.1 exactly.',
        '0.1 + 0.2 in double is 0.30000000000000004, not exactly 0.3.',
        'The comparison returns False.',
      ],
      concepts: ['double', 'floating point', 'IEEE 754', 'precision loss'],
    },
    {
      id: 'cs-types-17',
      title: 'Predict Nullable HasValue',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `int? a = null;
int? b = 5;
Console.WriteLine(a.HasValue);
Console.WriteLine(b.HasValue);
Console.WriteLine(a.GetValueOrDefault());`,
      solution: `False
True
0`,
      hints: [
        'HasValue returns false when the nullable is null.',
        'HasValue returns true when a value is present.',
        'GetValueOrDefault() returns 0 (the default for int) when null.',
      ],
      concepts: ['Nullable<T>', 'HasValue', 'GetValueOrDefault'],
    },
    {
      id: 'cs-types-18',
      title: 'Refactor Magic Numbers',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Refactor the magic numbers into well-named constants with appropriate types.',
      skeleton: `static double CalculateArea(double radius)
{
    return 3.14159 * radius * radius;
}

static decimal CalculateTax(decimal amount)
{
    return amount * 0.08m;
}`,
      solution: `const double Pi = 3.14159;
const decimal TaxRate = 0.08m;

static double CalculateArea(double radius)
{
    return Pi * radius * radius;
}

static decimal CalculateTax(decimal amount)
{
    return amount * TaxRate;
}`,
      hints: [
        'Extract literal values into named constants.',
        'Use const with the matching type for each constant.',
        'Pi is a double, TaxRate is a decimal.',
      ],
      concepts: ['const', 'magic numbers', 'naming', 'refactoring'],
    },
    {
      id: 'cs-types-19',
      title: 'Refactor Casts to Pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor the is/cast pattern to use the is pattern with a variable.',
      skeleton: `static string Describe(object obj)
{
    if (obj is int)
    {
        int n = (int)obj;
        return $"Integer: {n}";
    }
    if (obj is string)
    {
        string s = (string)obj;
        return $"String: {s}";
    }
    return "Unknown";
}`,
      solution: `static string Describe(object obj)
{
    if (obj is int n)
    {
        return $"Integer: {n}";
    }
    if (obj is string s)
    {
        return $"String: {s}";
    }
    return "Unknown";
}`,
      hints: [
        'C# pattern matching lets you combine type check and cast in one step.',
        'Use is Type variable to check and assign simultaneously.',
        'This eliminates the separate cast line.',
      ],
      concepts: ['pattern matching', 'is keyword', 'type pattern', 'refactoring'],
    },
    {
      id: 'cs-types-20',
      title: 'Type Hierarchy Reporter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method GetTypeChain that takes an object and returns a string showing its type hierarchy separated by " -> " (e.g., "Int32 -> ValueType -> Object").',
      skeleton: ``,
      solution: `static string GetTypeChain(object obj)
{
    var parts = new List<string>();
    Type? t = obj.GetType();
    while (t != null)
    {
        parts.Add(t.Name);
        t = t.BaseType;
    }
    return string.Join(" -> ", parts);
}`,
      hints: [
        'Use GetType() to get the starting type, then walk BaseType.',
        'BaseType is null for System.Object (the root).',
        'Collect names in a list and join with " -> ".',
      ],
      concepts: ['reflection', 'GetType', 'BaseType', 'type hierarchy'],
    },
  ],
};
