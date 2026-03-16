import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-ops',
  title: '3. Operators',
  explanation: `## Operators

C# provides a rich set of operators for arithmetic, comparison, logical operations, and null handling.

\`\`\`csharp
// Arithmetic: + - * / % (modulus)
int sum = 10 + 3;     // 13
int div = 10 / 3;     // 3 (integer division)
double divD = 10.0/3; // 3.333...

// Comparison: == != < > <= >=
bool eq = (5 == 5);   // true

// Logical: && || !
bool and = true && false; // false

// Null-coalescing: ?? ??=
string name = null ?? "default";  // "default"
string? s = null;
s ??= "assigned"; // assigns only if s is null

// Null-conditional: ?. ?[]
string? upper = name?.ToUpper();  // null if name is null
int? len = arr?[0]?.Length;

// Pattern operators: is, as
if (obj is string text) { } // type test + cast
var str = obj as string;     // cast or null

// nameof -- gets the name of a symbol as a string
string n = nameof(Console); // "Console"
\`\`\`

Integer division truncates. Use the \`checked\` keyword to enable overflow checking.`,
  exercises: [
    {
      id: 'cs-ops-1',
      title: 'Integer Division',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fill in the result of integer division.',
      skeleton: `int result = 17 / 5;
Console.WriteLine(result); // prints __BLANK__`,
      solution: `int result = 17 / 5;
Console.WriteLine(result); // prints 3`,
      hints: [
        'Integer division truncates the decimal part.',
        '17 / 5 = 3 remainder 2.',
        'The answer is: 3',
      ],
      concepts: ['integer division', 'truncation', 'arithmetic'],
    },
    {
      id: 'cs-ops-2',
      title: 'Null-Coalescing Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Use the null-coalescing operator to provide a default value.',
      skeleton: `string? input = null;
string result = input __BLANK__ "default";
Console.WriteLine(result); // "default"`,
      solution: `string? input = null;
string result = input ?? "default";
Console.WriteLine(result); // "default"`,
      hints: [
        'This operator returns the left side if non-null, otherwise the right side.',
        'It uses two question marks.',
        'The answer is: ??',
      ],
      concepts: ['null-coalescing', '?? operator', 'null handling'],
    },
    {
      id: 'cs-ops-3',
      title: 'Null-Conditional Access',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use the null-conditional operator to safely get string length.',
      skeleton: `string? name = null;
int? length = name__BLANK__Length;
Console.WriteLine(length); // prints nothing (null)`,
      solution: `string? name = null;
int? length = name?.Length;
Console.WriteLine(length); // prints nothing (null)`,
      hints: [
        'This operator short-circuits to null if the left side is null.',
        'It uses ?. to access members safely.',
        'The answer is: ?.',
      ],
      concepts: ['null-conditional', '?. operator', 'safe navigation'],
    },
    {
      id: 'cs-ops-4',
      title: 'Modulus Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Use the modulus operator to check if a number is even.',
      skeleton: `bool isEven = 42 __BLANK__ 2 == 0;
Console.WriteLine(isEven); // True`,
      solution: `bool isEven = 42 % 2 == 0;
Console.WriteLine(isEven); // True`,
      hints: [
        'The modulus operator returns the remainder of division.',
        'If the remainder when dividing by 2 is 0, the number is even.',
        'The answer is: %',
      ],
      concepts: ['modulus', 'remainder', 'even/odd check'],
    },
    {
      id: 'cs-ops-5',
      title: 'Null-Coalescing Assignment',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use the null-coalescing assignment operator to set a default value only if null.',
      skeleton: `string? name = null;
name __BLANK__ "Anonymous";
Console.WriteLine(name); // "Anonymous"`,
      solution: `string? name = null;
name ??= "Anonymous";
Console.WriteLine(name); // "Anonymous"`,
      hints: [
        'This operator assigns only when the left side is null.',
        'It combines ?? and = into one operator.',
        'The answer is: ??=',
      ],
      concepts: ['null-coalescing assignment', '??= operator'],
    },
    {
      id: 'cs-ops-6',
      title: 'nameof Operator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use nameof to get the string name of a variable for an error message.',
      skeleton: `static void Validate(string input)
{
    if (input == null)
        throw new ArgumentNullException(__BLANK__);
}`,
      solution: `static void Validate(string input)
{
    if (input == null)
        throw new ArgumentNullException(nameof(input));
}`,
      hints: [
        'nameof returns the compile-time name of a symbol as a string.',
        'It is refactoring-safe unlike hardcoded "input".',
        'The answer is: nameof(input)',
      ],
      concepts: ['nameof', 'ArgumentNullException', 'compile-time string'],
    },
    {
      id: 'cs-ops-7',
      title: 'Clamp with Math.Min/Max',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a method Clamp that takes value, min, max (all int) and returns the value clamped to [min, max].',
      skeleton: ``,
      solution: `static int Clamp(int value, int min, int max)
{
    return Math.Max(min, Math.Min(max, value));
}`,
      hints: [
        'Math.Min returns the smaller of two values.',
        'Math.Max returns the larger of two values.',
        'First clamp to max with Min, then clamp to min with Max.',
      ],
      concepts: ['Math.Min', 'Math.Max', 'clamping', 'arithmetic'],
    },
    {
      id: 'cs-ops-8',
      title: 'Safe Division',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a method SafeDivide that takes two doubles and returns the result, or null if divisor is 0.',
      skeleton: ``,
      solution: `static double? SafeDivide(double a, double b)
{
    if (b == 0) return null;
    return a / b;
}`,
      hints: [
        'Return double? (nullable) to represent the absence of a result.',
        'Check if the divisor is 0 before dividing.',
        'Return null for division by zero.',
      ],
      concepts: ['nullable return', 'division by zero', 'null safety'],
    },
    {
      id: 'cs-ops-9',
      title: 'Bitwise Flag Checker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method HasFlag that takes two ints (value, flag) and returns true if the flag bits are set in value using bitwise AND.',
      skeleton: ``,
      solution: `static bool HasFlag(int value, int flag)
{
    return (value & flag) == flag;
}`,
      hints: [
        'Bitwise AND (&) keeps only bits that are set in both operands.',
        'If (value & flag) equals flag, all flag bits are present.',
        'This is how flags enums work internally.',
      ],
      concepts: ['bitwise AND', 'flags', 'bit manipulation'],
    },
    {
      id: 'cs-ops-10',
      title: 'Ternary Chain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method Grade that takes a score (int) and returns "A" (>=90), "B" (>=80), "C" (>=70), "D" (>=60), or "F" using ternary operators.',
      skeleton: ``,
      solution: `static string Grade(int score)
{
    return score >= 90 ? "A"
         : score >= 80 ? "B"
         : score >= 70 ? "C"
         : score >= 60 ? "D"
         : "F";
}`,
      hints: [
        'Ternary operators can be chained: cond1 ? val1 : cond2 ? val2 : ...',
        'Check from highest to lowest grade.',
        'The final else case is "F".',
      ],
      concepts: ['ternary operator', 'conditional expression', 'chaining'],
    },
    {
      id: 'cs-ops-11',
      title: 'Type Check with is',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method Describe that takes an object and returns "Number: X" for int, "Text: X" for string, or "Unknown" otherwise.',
      skeleton: ``,
      solution: `static string Describe(object obj)
{
    if (obj is int n) return $"Number: {n}";
    if (obj is string s) return $"Text: {s}";
    return "Unknown";
}`,
      hints: [
        'The is keyword with a variable combines type checking and casting.',
        'Use pattern matching: obj is int n.',
        'String interpolation with $ makes formatting easy.',
      ],
      concepts: ['is operator', 'pattern matching', 'type checking'],
    },
    {
      id: 'cs-ops-12',
      title: 'Checked Overflow',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method SafeAdd that adds two ints using checked arithmetic, returning null if overflow occurs.',
      skeleton: ``,
      solution: `static int? SafeAdd(int a, int b)
{
    try
    {
        return checked(a + b);
    }
    catch (OverflowException)
    {
        return null;
    }
}`,
      hints: [
        'The checked keyword throws OverflowException on overflow.',
        'Wrap the addition in checked() and catch the exception.',
        'Return null to indicate overflow.',
      ],
      concepts: ['checked', 'OverflowException', 'integer overflow', 'null safety'],
    },
    {
      id: 'cs-ops-13',
      title: 'Wrong Equality Operator',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the code that uses assignment instead of comparison.',
      skeleton: `static bool IsZero(int x)
{
    if (x = 0)  // bug: assignment not comparison
    {
        return true;
    }
    return false;
}`,
      solution: `static bool IsZero(int x)
{
    if (x == 0)
    {
        return true;
    }
    return false;
}`,
      hints: [
        '= is assignment, == is comparison.',
        'C# catches this because int is not bool, but the intent is wrong.',
        'Change = to == for equality comparison.',
      ],
      concepts: ['equality operator', 'assignment vs comparison', 'common bug'],
    },
    {
      id: 'cs-ops-14',
      title: 'Short-Circuit Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the NullReferenceException by using null-conditional before accessing Length.',
      skeleton: `static bool IsLong(string? text)
{
    return text.Length > 10; // NullReferenceException when text is null
}`,
      solution: `static bool IsLong(string? text)
{
    return text?.Length > 10 ?? false;
}`,
      hints: [
        'text could be null, so accessing .Length directly throws.',
        'Use ?. to safely access Length (returns null if text is null).',
        'Use ?? false to convert null to false.',
      ],
      concepts: ['null-conditional', 'NullReferenceException', 'null safety'],
    },
    {
      id: 'cs-ops-15',
      title: 'Operator Precedence Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the operator precedence issue. The intent is (a + b) * c but it computes a + (b * c).',
      skeleton: `static int Compute(int a, int b, int c)
{
    return a + b * c; // Wrong: * has higher precedence than +
}`,
      solution: `static int Compute(int a, int b, int c)
{
    return (a + b) * c;
}`,
      hints: [
        'Multiplication has higher precedence than addition.',
        'Use parentheses to force the desired evaluation order.',
        'Wrap (a + b) in parentheses.',
      ],
      concepts: ['operator precedence', 'parentheses', 'arithmetic order'],
    },
    {
      id: 'cs-ops-16',
      title: 'Predict Logical Operators',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `bool a = true, b = false;
Console.WriteLine(a && b);
Console.WriteLine(a || b);
Console.WriteLine(!a);`,
      solution: `False
True
False`,
      hints: [
        'true && false = false (both must be true).',
        'true || false = true (at least one is true).',
        '!true = false (negation).',
      ],
      concepts: ['logical AND', 'logical OR', 'logical NOT'],
    },
    {
      id: 'cs-ops-17',
      title: 'Predict Null-Coalescing Chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `string? a = null;
string? b = null;
string c = "found";
Console.WriteLine(a ?? b ?? c);`,
      solution: `found`,
      hints: [
        '?? chains evaluate left to right.',
        'a is null, so it tries b. b is null, so it uses c.',
        'The first non-null value in the chain is "found".',
      ],
      concepts: ['null-coalescing chain', '??', 'null fallback'],
    },
    {
      id: 'cs-ops-18',
      title: 'Predict Increment Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `int x = 5;
int a = x++;
int b = ++x;
Console.WriteLine($"{a} {b} {x}");`,
      solution: `5 7 7`,
      hints: [
        'x++ returns the current value THEN increments (post-increment).',
        '++x increments THEN returns the new value (pre-increment).',
        'a=5 (x becomes 6), b=7 (x becomes 7), x=7.',
      ],
      concepts: ['post-increment', 'pre-increment', 'side effects'],
    },
    {
      id: 'cs-ops-19',
      title: 'Refactor Nested Null Checks',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor the nested null checks to use null-conditional and null-coalescing operators.',
      skeleton: `static string GetCity(Order order)
{
    if (order != null)
    {
        if (order.Customer != null)
        {
            if (order.Customer.Address != null)
            {
                return order.Customer.Address.City;
            }
        }
    }
    return "Unknown";
}`,
      solution: `static string GetCity(Order order)
{
    return order?.Customer?.Address?.City ?? "Unknown";
}`,
      hints: [
        'Chain ?. operators to safely navigate nested properties.',
        'Use ?? at the end to provide a default value.',
        'This replaces all three null checks in one line.',
      ],
      concepts: ['null-conditional', 'null-coalescing', 'refactoring', 'safe navigation'],
    },
    {
      id: 'cs-ops-20',
      title: 'Expression Evaluator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method Evaluate that takes two doubles and a char operator (+, -, *, /) and returns the result using a switch expression. Throw ArgumentException for unknown operators.',
      skeleton: ``,
      solution: `static double Evaluate(double a, double b, char op)
{
    return op switch
    {
        '+' => a + b,
        '-' => a - b,
        '*' => a * b,
        '/' => b != 0 ? a / b : throw new DivideByZeroException(),
        _ => throw new ArgumentException($"Unknown operator: {op}")
    };
}`,
      hints: [
        'Switch expressions use the pattern: value switch { pattern => result, ... }',
        'Use _ as the discard pattern for the default case.',
        'Handle division by zero for the / operator.',
      ],
      concepts: ['switch expression', 'pattern matching', 'arithmetic', 'exception throwing'],
    },
  ],
};
