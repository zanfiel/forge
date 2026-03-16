import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-var',
  title: '1. Variables & Declarations',
  explanation: `## Variables & Declarations

C# is a statically-typed language, but you can use \`var\` for type inference when the compiler can determine the type from the right-hand side.

\`\`\`csharp
// Explicit typing
int count = 10;
string name = "Alice";

// Type inference with var
var price = 9.99;   // inferred as double
var items = new List<string>(); // inferred as List<string>

// Constants -- compile-time values that never change
const double Pi = 3.14159;

// readonly -- set once at runtime (in constructor or initializer)
readonly DateTime created = DateTime.Now;

// Naming conventions
// camelCase for local variables and parameters
// PascalCase for properties, methods, classes
// _camelCase for private fields (common convention)

// Scope -- variables are block-scoped in C#
if (true)
{
    int temp = 42; // only visible inside this block
}
// temp is NOT accessible here

// Multiple declarations
int a = 1, b = 2, c = 3;
\`\`\`

C# requires variables to be definitely assigned before use. The compiler tracks assignment and will error if you read an uninitialized variable.`,
  exercises: [
    {
      id: 'cs-var-1',
      title: 'Declare with var',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Use var to declare a variable message initialized to "Hello, World!".',
      skeleton: `__BLANK__ message = "Hello, World!";
Console.WriteLine(message);`,
      solution: `var message = "Hello, World!";
Console.WriteLine(message);`,
      hints: [
        'C# can infer the type from the right-hand side.',
        'The var keyword tells the compiler to figure out the type.',
        'The answer is: var',
      ],
      concepts: ['var', 'type inference', 'variable declaration'],
    },
    {
      id: 'cs-var-2',
      title: 'Explicit int Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare an integer variable count with value 42 using explicit typing.',
      skeleton: `__BLANK__ count = 42;
Console.WriteLine(count);`,
      solution: `int count = 42;
Console.WriteLine(count);`,
      hints: [
        'What is the C# keyword for a 32-bit integer?',
        'It is a three-letter keyword.',
        'The answer is: int',
      ],
      concepts: ['int', 'explicit typing', 'variable declaration'],
    },
    {
      id: 'cs-var-3',
      title: 'Constant Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a constant double named Pi with value 3.14159.',
      skeleton: `__BLANK__ double Pi = 3.14159;
Console.WriteLine(Pi);`,
      solution: `const double Pi = 3.14159;
Console.WriteLine(Pi);`,
      hints: [
        'Constants use a keyword that means the value can never change.',
        'The const keyword makes a compile-time constant.',
        'The answer is: const',
      ],
      concepts: ['const', 'constant', 'double'],
    },
    {
      id: 'cs-var-4',
      title: 'String Interpolation Variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fill in the blank to use string interpolation with the name variable.',
      skeleton: `string name = "Alice";
string greeting = __BLANK__;
Console.WriteLine(greeting); // Hello, Alice!`,
      solution: `string name = "Alice";
string greeting = $"Hello, {name}!";
Console.WriteLine(greeting); // Hello, Alice!`,
      hints: [
        'String interpolation starts with a $ before the quote.',
        'Variables are embedded with curly braces: {variableName}.',
        'The answer is: $"Hello, {name}!"',
      ],
      concepts: ['string interpolation', 'string', 'variable reference'],
    },
    {
      id: 'cs-var-5',
      title: 'Multiple Variable Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare three int variables x, y, z on one line with values 1, 2, 3.',
      skeleton: `__BLANK__;
Console.WriteLine(x + y + z); // 6`,
      solution: `int x = 1, y = 2, z = 3;
Console.WriteLine(x + y + z); // 6`,
      hints: [
        'You can declare multiple variables of the same type separated by commas.',
        'Use the syntax: type var1 = val1, var2 = val2, var3 = val3;',
        'The answer is: int x = 1, y = 2, z = 3',
      ],
      concepts: ['multiple declaration', 'int', 'variable initialization'],
    },
    {
      id: 'cs-var-6',
      title: 'Readonly Field',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Declare a readonly string field that is set in the constructor.',
      skeleton: `class Person
{
    __BLANK__ string _name;

    public Person(string name)
    {
        _name = name;
    }
}`,
      solution: `class Person
{
    readonly string _name;

    public Person(string name)
    {
        _name = name;
    }
}`,
      hints: [
        'The keyword prevents reassignment after construction.',
        'readonly fields can be set in the declaration or constructor only.',
        'The answer is: readonly',
      ],
      concepts: ['readonly', 'fields', 'constructor initialization'],
    },
    {
      id: 'cs-var-7',
      title: 'Swap Two Variables',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a method Swap that takes two ref int parameters and swaps their values.',
      skeleton: ``,
      solution: `static void Swap(ref int a, ref int b)
{
    int temp = a;
    a = b;
    b = temp;
}`,
      hints: [
        'Use the ref keyword to pass variables by reference.',
        'You need a temporary variable to hold one value during the swap.',
        'Store a in temp, set a = b, then set b = temp.',
      ],
      concepts: ['ref parameter', 'swap', 'method', 'temporary variable'],
    },
    {
      id: 'cs-var-8',
      title: 'Variable Scope Check',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a method GetMax that declares two local variables a=10 and b=20, and returns the larger one.',
      skeleton: ``,
      solution: `static int GetMax()
{
    int a = 10;
    int b = 20;
    return a > b ? a : b;
}`,
      hints: [
        'Declare two int variables inside the method body.',
        'Use a comparison to decide which is larger.',
        'The ternary operator a > b ? a : b returns the max.',
      ],
      concepts: ['local variables', 'scope', 'ternary operator', 'method return'],
    },
    {
      id: 'cs-var-9',
      title: 'Type Inference with Collections',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method CreateList that uses var to create a List<int> with values 1-5 and returns it.',
      skeleton: ``,
      solution: `static List<int> CreateList()
{
    var list = new List<int> { 1, 2, 3, 4, 5 };
    return list;
}`,
      hints: [
        'var infers the type from the right side of the assignment.',
        'Use collection initializer syntax with curly braces.',
        'new List<int> { 1, 2, 3, 4, 5 } creates and populates the list.',
      ],
      concepts: ['var', 'type inference', 'List<T>', 'collection initializer'],
    },
    {
      id: 'cs-var-10',
      title: 'Const vs Readonly',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a class Config with a const string Version = "1.0" and a readonly DateTime StartTime set to DateTime.Now in the constructor.',
      skeleton: ``,
      solution: `class Config
{
    public const string Version = "1.0";
    public readonly DateTime StartTime;

    public Config()
    {
        StartTime = DateTime.Now;
    }
}`,
      hints: [
        'const must have a compile-time value; readonly can be set at runtime.',
        'const is implicitly static; readonly is per-instance.',
        'DateTime.Now is a runtime value, so it cannot be const.',
      ],
      concepts: ['const', 'readonly', 'compile-time', 'runtime initialization'],
    },
    {
      id: 'cs-var-11',
      title: 'Discard Variable',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method that calls int.TryParse("42", out var result) and uses _ as a discard for a second TryParse that you do not need.',
      skeleton: ``,
      solution: `static int ParseFirst()
{
    int.TryParse("42", out var result);
    int.TryParse("ignore", out _);
    return result;
}`,
      hints: [
        'The discard _ tells the compiler you intentionally ignore the out value.',
        'out var declares the variable inline.',
        'Use out _ when you do not need the parsed result.',
      ],
      concepts: ['discard', 'out var', 'TryParse', 'underscore'],
    },
    {
      id: 'cs-var-12',
      title: 'Uninitialized Variable Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the code so it compiles. The variable result must be assigned before use.',
      skeleton: `static int Calculate(bool flag)
{
    int result;
    if (flag)
    {
        result = 10;
    }
    return result; // CS0165: Use of unassigned local variable
}`,
      solution: `static int Calculate(bool flag)
{
    int result = 0;
    if (flag)
    {
        result = 10;
    }
    return result;
}`,
      hints: [
        'C# requires definite assignment before a variable is read.',
        'The compiler sees a path where result is never assigned (when flag is false).',
        'Initialize result to a default value like 0.',
      ],
      concepts: ['definite assignment', 'compiler error', 'initialization'],
    },
    {
      id: 'cs-var-13',
      title: 'Scope Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the code so the variable total is accessible after the loop.',
      skeleton: `static int SumToTen()
{
    for (int i = 1; i <= 10; i++)
    {
        int total = 0;
        total += i;
    }
    return total; // error: total does not exist here
}`,
      solution: `static int SumToTen()
{
    int total = 0;
    for (int i = 1; i <= 10; i++)
    {
        total += i;
    }
    return total;
}`,
      hints: [
        'Variables declared inside a block are not visible outside it.',
        'Move the declaration of total before the for loop.',
        'Also move the initialization (= 0) outside so it is not reset each iteration.',
      ],
      concepts: ['scope', 'block scope', 'variable lifetime'],
    },
    {
      id: 'cs-var-14',
      title: 'Const Modification Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the code. A const cannot be reassigned.',
      skeleton: `static void Run()
{
    const int max = 100;
    max = 200; // error
    Console.WriteLine(max);
}`,
      solution: `static void Run()
{
    int max = 100;
    max = 200;
    Console.WriteLine(max);
}`,
      hints: [
        'const declares a value that cannot be changed after initialization.',
        'If you need to reassign, use a regular variable or let.',
        'Change const int to just int.',
      ],
      concepts: ['const', 'immutability', 'reassignment error'],
    },
    {
      id: 'cs-var-15',
      title: 'Predict var Type',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `var x = 10;
var y = 3.14;
Console.WriteLine(x.GetType().Name);
Console.WriteLine(y.GetType().Name);`,
      solution: `Int32
Double`,
      hints: [
        'var infers the type from the literal value.',
        '10 is an int (Int32), 3.14 is a double (Double).',
        'GetType().Name returns the CLR type name.',
      ],
      concepts: ['var', 'type inference', 'GetType', 'Int32', 'Double'],
    },
    {
      id: 'cs-var-16',
      title: 'Predict Scope Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `int x = 1;
{
    int x2 = 2;
    Console.Write(x + " ");
    Console.Write(x2 + " ");
}
Console.Write(x);`,
      solution: `1 2 1`,
      hints: [
        'x is declared in the outer scope and visible inside the block.',
        'x2 is declared in the inner block only.',
        'After the block, only x is accessible.',
      ],
      concepts: ['block scope', 'variable visibility', 'nested blocks'],
    },
    {
      id: 'cs-var-17',
      title: 'Predict Default Values',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print? (Fields have default values, locals do not.)',
      skeleton: `class Demo
{
    static int _count;
    static string _name;
    static bool _flag;

    static void Main()
    {
        Console.WriteLine(_count);
        Console.WriteLine(_name == null);
        Console.WriteLine(_flag);
    }
}`,
      solution: `0
True
False`,
      hints: [
        'Static fields are automatically initialized to their default values.',
        'Default for int is 0, for string (reference type) is null, for bool is false.',
        '_name == null evaluates to True.',
      ],
      concepts: ['default values', 'static fields', 'null', 'zero initialization'],
    },
    {
      id: 'cs-var-18',
      title: 'Refactor Explicit to var',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Refactor the code to use var where the type is obvious from the right-hand side.',
      skeleton: `Dictionary<string, List<int>> map = new Dictionary<string, List<int>>();
StringBuilder sb = new StringBuilder();
string greeting = "Hello";`,
      solution: `var map = new Dictionary<string, List<int>>();
var sb = new StringBuilder();
var greeting = "Hello";`,
      hints: [
        'When the type is clear from the new expression, var reduces repetition.',
        'Replace the explicit type with var on each line.',
        'The compiler infers the type from the right side.',
      ],
      concepts: ['var', 'type inference', 'code readability', 'refactoring'],
    },
    {
      id: 'cs-var-19',
      title: 'Refactor to Target-Typed New',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor to use target-typed new expressions (C# 9+) instead of repeating the type.',
      skeleton: `List<string> names = new List<string>();
Dictionary<int, string> lookup = new Dictionary<int, string>();
StringBuilder builder = new StringBuilder("init");`,
      solution: `List<string> names = new();
Dictionary<int, string> lookup = new();
StringBuilder builder = new("init");`,
      hints: [
        'C# 9 allows new() when the type is known from the left side.',
        'Replace new TypeName(...) with new(...) keeping any constructor arguments.',
        'This is the opposite approach of var -- the type is on the left.',
      ],
      concepts: ['target-typed new', 'C# 9', 'type inference', 'refactoring'],
    },
    {
      id: 'cs-var-20',
      title: 'Build a Variable Registry',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a class VariableRegistry with a Dictionary<string, object> that supports Set(name, value) and Get<T>(name) methods.',
      skeleton: ``,
      solution: `class VariableRegistry
{
    private readonly Dictionary<string, object> _vars = new();

    public void Set(string name, object value)
    {
        _vars[name] = value;
    }

    public T Get<T>(string name)
    {
        return (T)_vars[name];
    }
}`,
      hints: [
        'Store values as object in the dictionary.',
        'The Get method needs a generic type parameter T and casts from object.',
        'Use (T)_vars[name] to cast the stored object back to the requested type.',
      ],
      concepts: ['generics', 'Dictionary', 'casting', 'object', 'readonly field'],
    },
  ],
};
