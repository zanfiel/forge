import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-meth',
  title: '7. Methods',
  explanation: `## Methods

Methods are the building blocks of C# programs. They can be static (belong to the class) or instance (belong to an object).

\`\`\`csharp
// Static method
static int Add(int a, int b) => a + b;

// Instance method
class Calculator {
    public int Multiply(int a, int b) => a * b;
}

// ref parameter -- pass by reference, must be initialized
static void Increment(ref int x) { x++; }

// out parameter -- must be assigned inside the method
static bool TryParse(string s, out int result) { ... }

// in parameter -- read-only reference (no copy for large structs)
static double Length(in Vector3 v) { ... }

// Optional parameters with defaults
static string Greet(string name, string prefix = "Hello") => $"{prefix}, {name}!";

// Named arguments
Greet(prefix: "Hi", name: "Alice");

// Expression-bodied methods (single expression)
static int Square(int x) => x * x;

// Local functions
static void Outer()
{
    int result = Inner(5);
    static int Inner(int x) => x * 2; // static local: no capture
}

// params keyword -- variable number of arguments
static int Sum(params int[] numbers) => numbers.Sum();
\`\`\``,
  exercises: [
    {
      id: 'cs-meth-1',
      title: 'Expression-Bodied Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write an expression-bodied method that returns the cube of a number.',
      skeleton: `static int Cube(int x) __BLANK__;`,
      solution: `static int Cube(int x) => x * x * x;`,
      hints: [
        'Expression-bodied methods use => instead of a block.',
        'The expression after => is the return value.',
        'The answer is: => x * x * x',
      ],
      concepts: ['expression-bodied method', '=>', 'concise syntax'],
    },
    {
      id: 'cs-meth-2',
      title: 'Optional Parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Add an optional parameter with default value "World".',
      skeleton: `static string Greet(string name __BLANK__)
{
    return $"Hello, {name}!";
}
// Greet() returns "Hello, World!"`,
      solution: `static string Greet(string name = "World")
{
    return $"Hello, {name}!";
}
// Greet() returns "Hello, World!"`,
      hints: [
        'Optional parameters have a default value specified with =.',
        'They must come after required parameters.',
        'The answer is: = "World"',
      ],
      concepts: ['optional parameter', 'default value', 'method overloading'],
    },
    {
      id: 'cs-meth-3',
      title: 'Out Parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use the out keyword to return two values from a method.',
      skeleton: `static void Divide(int a, int b, __BLANK__ int quotient, __BLANK__ int remainder)
{
    quotient = a / b;
    remainder = a % b;
}`,
      solution: `static void Divide(int a, int b, out int quotient, out int remainder)
{
    quotient = a / b;
    remainder = a % b;
}`,
      hints: [
        'The out keyword passes a variable by reference that must be assigned in the method.',
        'Both parameters must be assigned before the method returns.',
        'The answer is: out',
      ],
      concepts: ['out parameter', 'multiple return values', 'by reference'],
    },
    {
      id: 'cs-meth-4',
      title: 'Ref Parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use ref to modify the caller\'s variable.',
      skeleton: `static void Double(__BLANK__ int x)
{
    x *= 2;
}

// Usage: int n = 5; Double(ref n); // n is now 10`,
      solution: `static void Double(ref int x)
{
    x *= 2;
}

// Usage: int n = 5; Double(ref n); // n is now 10`,
      hints: [
        'ref passes a variable by reference so the method can modify it.',
        'Both the parameter declaration and the call site need the ref keyword.',
        'The answer is: ref',
      ],
      concepts: ['ref parameter', 'pass by reference', 'mutation'],
    },
    {
      id: 'cs-meth-5',
      title: 'Params Keyword',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use params to accept a variable number of arguments.',
      skeleton: `static int Sum(__BLANK__ int[] numbers)
{
    int total = 0;
    foreach (var n in numbers) total += n;
    return total;
}
// Sum(1, 2, 3, 4, 5) returns 15`,
      solution: `static int Sum(params int[] numbers)
{
    int total = 0;
    foreach (var n in numbers) total += n;
    return total;
}
// Sum(1, 2, 3, 4, 5) returns 15`,
      hints: [
        'The params keyword allows passing individual values as an array.',
        'It must be the last parameter in the method signature.',
        'The answer is: params',
      ],
      concepts: ['params', 'variable arguments', 'array parameter'],
    },
    {
      id: 'cs-meth-6',
      title: 'Named Arguments',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Call the method using named arguments in reverse order.',
      skeleton: `static string Format(string first, string last, int age)
    => $"{first} {last}, age {age}";

string result = Format(__BLANK__);
// result: "Alice Smith, age 30"`,
      solution: `static string Format(string first, string last, int age)
    => $"{first} {last}, age {age}";

string result = Format(age: 30, last: "Smith", first: "Alice");
// result: "Alice Smith, age 30"`,
      hints: [
        'Named arguments use the syntax: paramName: value.',
        'With named arguments, you can pass them in any order.',
        'The answer is: age: 30, last: "Smith", first: "Alice"',
      ],
      concepts: ['named arguments', 'parameter names', 'call syntax'],
    },
    {
      id: 'cs-meth-7',
      title: 'Recursive Factorial',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a recursive method Factorial that returns n! (0! = 1).',
      skeleton: ``,
      solution: `static long Factorial(int n)
{
    if (n <= 1) return 1;
    return n * Factorial(n - 1);
}`,
      hints: [
        'The base case: 0! = 1 and 1! = 1.',
        'The recursive case: n! = n * (n-1)!',
        'Use long to handle larger factorials.',
      ],
      concepts: ['recursion', 'base case', 'factorial', 'long'],
    },
    {
      id: 'cs-meth-8',
      title: 'Method with Local Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method IsPrime that uses a local function to check divisibility.',
      skeleton: ``,
      solution: `static bool IsPrime(int n)
{
    if (n < 2) return false;

    bool IsDivisible(int divisor) => n % divisor == 0;

    for (int i = 2; i * i <= n; i++)
    {
        if (IsDivisible(i)) return false;
    }
    return true;
}`,
      hints: [
        'Local functions are declared inside another method.',
        'They can capture variables from the enclosing scope.',
        'Check divisibility only up to sqrt(n) for efficiency.',
      ],
      concepts: ['local function', 'closure', 'prime check', 'optimization'],
    },
    {
      id: 'cs-meth-9',
      title: 'Generic Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a generic method Swap<T> that swaps two values using ref parameters.',
      skeleton: ``,
      solution: `static void Swap<T>(ref T a, ref T b)
{
    T temp = a;
    a = b;
    b = temp;
}`,
      hints: [
        'Use a type parameter <T> after the method name.',
        'ref passes the variables by reference so changes affect the caller.',
        'You need a temp variable of type T for the swap.',
      ],
      concepts: ['generic method', 'type parameter', 'ref', 'swap'],
    },
    {
      id: 'cs-meth-10',
      title: 'Extension Method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write an extension method IsEven on int that returns true if the number is even.',
      skeleton: ``,
      solution: `static class IntExtensions
{
    public static bool IsEven(this int n)
    {
        return n % 2 == 0;
    }
}`,
      hints: [
        'Extension methods must be in a static class.',
        'The first parameter uses the this keyword.',
        'this int n means the method extends the int type.',
      ],
      concepts: ['extension method', 'this keyword', 'static class'],
    },
    {
      id: 'cs-meth-11',
      title: 'Method Overloading',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write three overloaded Area methods: Area(double radius) for circle, Area(double w, double h) for rectangle, Area(double a, double b, double c) for triangle using Heron\'s formula.',
      skeleton: ``,
      solution: `static double Area(double radius)
{
    return Math.PI * radius * radius;
}

static double Area(double w, double h)
{
    return w * h;
}

static double Area(double a, double b, double c)
{
    double s = (a + b + c) / 2;
    return Math.Sqrt(s * (s - a) * (s - b) * (s - c));
}`,
      hints: [
        'Overloaded methods have the same name but different parameter lists.',
        'The compiler selects the correct overload based on argument count.',
        'Heron\'s formula: sqrt(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2.',
      ],
      concepts: ['method overloading', 'Math.PI', 'Heron\'s formula'],
    },
    {
      id: 'cs-meth-12',
      title: 'Tuple Return',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method MinMax that takes an int[] and returns a named tuple (Min, Max).',
      skeleton: ``,
      solution: `static (int Min, int Max) MinMax(int[] arr)
{
    int min = arr[0], max = arr[0];
    foreach (int n in arr)
    {
        if (n < min) min = n;
        if (n > max) max = n;
    }
    return (min, max);
}`,
      hints: [
        'Named tuples use (Type Name, Type Name) as the return type.',
        'Track both min and max in a single pass.',
        'Return a tuple literal: (min, max).',
      ],
      concepts: ['named tuple', 'multiple return values', 'single pass'],
    },
    {
      id: 'cs-meth-13',
      title: 'Missing Return Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the method that does not return a value on all paths.',
      skeleton: `static string Classify(int n)
{
    if (n > 0)
        return "positive";
    else if (n < 0)
        return "negative";
    // CS0161: not all code paths return a value
}`,
      solution: `static string Classify(int n)
{
    if (n > 0)
        return "positive";
    else if (n < 0)
        return "negative";
    else
        return "zero";
}`,
      hints: [
        'The compiler requires a return statement for every possible execution path.',
        'When n is 0, neither condition is true and nothing is returned.',
        'Add an else clause for the zero case.',
      ],
      concepts: ['all paths return', 'CS0161', 'exhaustive branching'],
    },
    {
      id: 'cs-meth-14',
      title: 'Out Not Assigned Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the method where the out parameter is not assigned on all paths.',
      skeleton: `static bool TryGet(Dictionary<string, int> dict, string key, out int value)
{
    if (dict.ContainsKey(key))
    {
        value = dict[key];
        return true;
    }
    return false; // CS0177: value not assigned
}`,
      solution: `static bool TryGet(Dictionary<string, int> dict, string key, out int value)
{
    if (dict.ContainsKey(key))
    {
        value = dict[key];
        return true;
    }
    value = 0;
    return false;
}`,
      hints: [
        'Out parameters must be assigned before the method returns.',
        'The false path does not assign value.',
        'Add value = 0 (or default) before return false.',
      ],
      concepts: ['out parameter', 'definite assignment', 'CS0177'],
    },
    {
      id: 'cs-meth-15',
      title: 'Params Placement Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the compile error. The params parameter must be last.',
      skeleton: `static string Join(params string[] parts, string separator)
{
    return string.Join(separator, parts);
}`,
      solution: `static string Join(string separator, params string[] parts)
{
    return string.Join(separator, parts);
}`,
      hints: [
        'The params parameter must be the last parameter in the list.',
        'Move separator before the params parameter.',
        'Required parameters always come before optional/params ones.',
      ],
      concepts: ['params', 'parameter order', 'compile error'],
    },
    {
      id: 'cs-meth-16',
      title: 'Predict Method Resolution',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `static string Test(int x) => "int";
static string Test(double x) => "double";
static string Test(object x) => "object";

Console.WriteLine(Test(42));
Console.WriteLine(Test(3.14));
Console.WriteLine(Test("hi"));`,
      solution: `int
double
object`,
      hints: [
        'C# uses the most specific overload that matches.',
        '42 is an int literal, so Test(int) is chosen.',
        '"hi" is a string, which only matches object.',
      ],
      concepts: ['overload resolution', 'most specific match', 'method dispatch'],
    },
    {
      id: 'cs-meth-17',
      title: 'Predict Ref vs Value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `static void AddOne(int x) { x++; }
static void AddOneRef(ref int x) { x++; }

int a = 10, b = 10;
AddOne(a);
AddOneRef(ref b);
Console.WriteLine($"{a} {b}");`,
      solution: `10 11`,
      hints: [
        'Without ref, the method gets a copy of the value.',
        'With ref, the method modifies the original variable.',
        'a stays 10 (copy), b becomes 11 (reference).',
      ],
      concepts: ['pass by value', 'pass by reference', 'ref keyword'],
    },
    {
      id: 'cs-meth-18',
      title: 'Predict Optional Args',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `static string Tag(string text, string open = "<b>", string close = "</b>")
    => $"{open}{text}{close}";

Console.WriteLine(Tag("hi"));
Console.WriteLine(Tag("hi", "<i>", "</i>"));`,
      solution: `<b>hi</b>
<i>hi</i>`,
      hints: [
        'First call uses default values for open and close.',
        'Second call overrides both optional parameters.',
        'Optional parameters fill in from left to right.',
      ],
      concepts: ['optional parameters', 'default values', 'method call'],
    },
    {
      id: 'cs-meth-19',
      title: 'Refactor to Expression Body',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Refactor the methods to use expression-bodied syntax.',
      skeleton: `static int Add(int a, int b)
{
    return a + b;
}

static bool IsPositive(int n)
{
    return n > 0;
}

static string Greet(string name)
{
    return $"Hello, {name}!";
}`,
      solution: `static int Add(int a, int b) => a + b;

static bool IsPositive(int n) => n > 0;

static string Greet(string name) => $"Hello, {name}!";`,
      hints: [
        'Expression-bodied methods replace { return expr; } with => expr.',
        'Works for methods that have a single expression.',
        'Remove the braces and return keyword, add =>.',
      ],
      concepts: ['expression-bodied method', 'refactoring', 'concise syntax'],
    },
    {
      id: 'cs-meth-20',
      title: 'Memoized Fibonacci',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method Fibonacci that computes the nth Fibonacci number using memoization with a Dictionary and a local function.',
      skeleton: ``,
      solution: `static long Fibonacci(int n)
{
    var memo = new Dictionary<int, long>();

    long Fib(int k)
    {
        if (k <= 1) return k;
        if (memo.TryGetValue(k, out long cached)) return cached;
        long result = Fib(k - 1) + Fib(k - 2);
        memo[k] = result;
        return result;
    }

    return Fib(n);
}`,
      hints: [
        'Memoization stores previously computed results to avoid redundant work.',
        'Use a Dictionary<int, long> to cache results.',
        'The local function captures the memo dictionary from the enclosing scope.',
      ],
      concepts: ['memoization', 'local function', 'Dictionary', 'recursion', 'Fibonacci'],
    },
  ],
};
