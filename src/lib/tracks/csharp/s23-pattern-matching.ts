import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-patterns',
  title: '23. Pattern Matching',
  explanation: `## Pattern Matching

C# pattern matching has evolved from simple \`is\` checks into a powerful system for deconstructing and testing values.

\`\`\`csharp
// Type pattern
if (obj is string s) Console.WriteLine(s.Length);

// Switch expression
string Classify(int n) => n switch
{
    < 0 => "negative",
    0   => "zero",
    > 0 and < 100 => "small positive",
    _ => "large"
};

// Property pattern
if (person is { Age: > 18, Name: string name })
    Console.WriteLine($"{name} is adult");

// Positional pattern (with Deconstruct)
var result = point switch
{
    (0, 0) => "origin",
    (var x, 0) => $"x-axis at {x}",
    (0, var y) => $"y-axis at {y}",
    (var x, var y) => $"({x},{y})"
};

// List patterns (C# 11)
int[] arr = { 1, 2, 3 };
if (arr is [1, _, 3]) Console.WriteLine("matches!");
if (arr is [var first, .. var rest]) { }
\`\`\`

Patterns compose: combine relational, logical (\`and\`, \`or\`, \`not\`), property, and positional patterns freely.`,
  exercises: [
    {
      id: 'cs-pat-1',
      title: 'Type Pattern',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Use a type pattern to check and cast.',
      skeleton: `object value = "hello";
if (value __BLANK__ string s)
    Console.WriteLine(s.ToUpper());`,
      solution: `object value = "hello";
if (value is string s)
    Console.WriteLine(s.ToUpper());`,
      hints: ['The is keyword tests type and declares a variable.', 's is only in scope when the pattern matches.', 'The answer is: is'],
      concepts: ['type pattern', 'is keyword', 'pattern variable'],
    },
    {
      id: 'cs-pat-2',
      title: 'Switch Expression',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Complete a switch expression.',
      skeleton: `string GetDay(int n) => n __BLANK__
{
    1 => "Monday",
    2 => "Tuesday",
    _ => "Other"
};`,
      solution: `string GetDay(int n) => n switch
{
    1 => "Monday",
    2 => "Tuesday",
    _ => "Other"
};`,
      hints: ['Switch expressions use the switch keyword after the value.', 'Each arm uses => instead of case/break.', 'The answer is: switch'],
      concepts: ['switch expression', 'pattern arms'],
    },
    {
      id: 'cs-pat-3',
      title: 'Relational Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use relational patterns in a switch.',
      skeleton: `string Grade(int score) => score switch
{
    __BLANK__ 60 => "F",
    >= 60 and < 80 => "C",
    >= 80 and < 90 => "B",
    >= 90 => "A",
    _ => "Invalid"
};`,
      solution: `string Grade(int score) => score switch
{
    < 60 => "F",
    >= 60 and < 80 => "C",
    >= 80 and < 90 => "B",
    >= 90 => "A",
    _ => "Invalid"
};`,
      hints: ['Relational patterns use <, >, <=, >= directly.', 'No variable name needed for simple comparisons.', 'The answer is: <'],
      concepts: ['relational pattern', 'comparison operators'],
    },
    {
      id: 'cs-pat-4',
      title: 'Property Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Match an object by its properties.',
      skeleton: `bool IsAdult(Person p) => p is __BLANK__;`,
      solution: `bool IsAdult(Person p) => p is { Age: >= 18 };`,
      hints: ['Property patterns use curly braces with property: pattern.', 'You can nest relational patterns inside.', 'The answer is: { Age: >= 18 }'],
      concepts: ['property pattern', 'nested patterns'],
    },
    {
      id: 'cs-pat-5',
      title: 'Logical Patterns',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Combine patterns with logical operators.',
      skeleton: `bool IsLetterOrDigit(char c) => c is (>= 'a' __BLANK__ <= 'z') or (>= '0' and <= '9');`,
      solution: `bool IsLetterOrDigit(char c) => c is (>= 'a' and <= 'z') or (>= '0' and <= '9');`,
      hints: ['and combines two patterns that must both match.', 'or matches if either side matches.', 'The answer is: and'],
      concepts: ['logical patterns', 'and', 'or'],
    },
    {
      id: 'cs-pat-6',
      title: 'List Pattern',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Use a list pattern to match array structure.',
      skeleton: `int[] nums = { 1, 2, 3, 4, 5 };
if (nums is [1, __BLANK__, 5])
    Console.WriteLine("Starts with 1, ends with 5");`,
      solution: `int[] nums = { 1, 2, 3, 4, 5 };
if (nums is [1, .., 5])
    Console.WriteLine("Starts with 1, ends with 5");`,
      hints: ['.. is the slice pattern that matches zero or more elements.', 'It works like a wildcard for the middle of a list.', 'The answer is: ..'],
      concepts: ['list pattern', 'slice pattern', 'C# 11'],
    },
    {
      id: 'cs-pat-7',
      title: 'Pattern-Based Calculator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a calculator using switch expression with tuple patterns.',
      skeleton: `// Write double Calculate(double a, string op, double b)
// Supported ops: "+", "-", "*", "/"
// Throw ArgumentException for unknown ops and divide by zero`,
      solution: `double Calculate(double a, string op, double b) => (op, b) switch
{
    ("+", _) => a + b,
    ("-", _) => a - b,
    ("*", _) => a * b,
    ("/", 0) => throw new ArgumentException("Division by zero"),
    ("/", _) => a / b,
    _ => throw new ArgumentException($"Unknown operator: {op}")
};`,
      hints: ['Use a tuple pattern to match op and b together.', 'Check for division by zero with ("/", 0).', 'The discard _ matches any value.'],
      concepts: ['tuple pattern', 'switch expression', 'throw expression'],
    },
    {
      id: 'cs-pat-8',
      title: 'Shape Area with Positional Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Calculate area using positional patterns on a shape hierarchy.',
      skeleton: `// Given:
// abstract record Shape;
// record Circle(double Radius) : Shape;
// record Rectangle(double Width, double Height) : Shape;
// record Triangle(double Base, double Height) : Shape;
// Write: double Area(Shape shape)`,
      solution: `double Area(Shape shape) => shape switch
{
    Circle(var r) => Math.PI * r * r,
    Rectangle(var w, var h) => w * h,
    Triangle(var b, var h) => 0.5 * b * h,
    _ => throw new ArgumentException($"Unknown shape: {shape}")
};`,
      hints: ['Records auto-generate Deconstruct, enabling positional patterns.', 'Extract values directly in the pattern.', 'Each arm handles a specific shape type.'],
      concepts: ['positional pattern', 'record deconstruct', 'polymorphic dispatch'],
    },
    {
      id: 'cs-pat-9',
      title: 'JSON-like Matcher',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method that describes a value using nested patterns.',
      skeleton: `// Write string Describe(object? value)
// null => "null"
// string with length 0 => "empty string"
// string => "string({length})"
// int > 0 => "positive int"
// int <= 0 => "non-positive int"
// IEnumerable<object> => "collection"
// anything else => "unknown"`,
      solution: `string Describe(object? value) => value switch
{
    null => "null",
    string { Length: 0 } => "empty string",
    string s => $"string({s.Length})",
    int and > 0 => "positive int",
    int => "non-positive int",
    IEnumerable<object> => "collection",
    _ => "unknown"
};`,
      hints: ['Combine type patterns with property patterns.', 'Order matters: more specific patterns first.', 'string { Length: 0 } checks both type and property.'],
      concepts: ['nested patterns', 'property pattern', 'pattern ordering'],
    },
    {
      id: 'cs-pat-10',
      title: 'List Pattern Decomposition',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method that processes a command parsed as a string array.',
      skeleton: `// Write string ProcessCommand(string[] args)
// [] => "no command"
// ["help"] => "showing help"
// ["add", var item] => "adding {item}"
// ["remove", var item] => "removing {item}"
// [var cmd, ..] => "unknown command: {cmd}"`,
      solution: `string ProcessCommand(string[] args) => args switch
{
    [] => "no command",
    ["help"] => "showing help",
    ["add", var item] => $"adding {item}",
    ["remove", var item] => $"removing {item}",
    [var cmd, ..] => $"unknown command: {cmd}"
};`,
      hints: ['List patterns match array structure.', '[] matches an empty array.', '[var cmd, ..] captures the first element and discards the rest.'],
      concepts: ['list pattern', 'command parsing', 'slice pattern'],
    },
    {
      id: 'cs-pat-11',
      title: 'State Machine with Patterns',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a state machine transition function using tuple patterns.',
      skeleton: `// enum State { Locked, Unlocked }
// enum Event { Coin, Push }
// Write (State, string) Transition(State state, Event evt)`,
      solution: `(State, string) Transition(State state, Event evt) => (state, evt) switch
{
    (State.Locked, Event.Coin) => (State.Unlocked, "Unlocked"),
    (State.Unlocked, Event.Push) => (State.Locked, "Locked after push"),
    (State.Unlocked, Event.Coin) => (State.Unlocked, "Already unlocked"),
    (State.Locked, Event.Push) => (State.Locked, "Still locked"),
    _ => throw new ArgumentException("Invalid transition")
};`,
      hints: ['Tuple patterns match (state, event) pairs.', 'Each arm returns the new state and a message.', 'This is a classic turnstile state machine.'],
      concepts: ['state machine', 'tuple pattern', 'enum matching'],
    },
    {
      id: 'cs-pat-12',
      title: 'Recursive Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method that evaluates a simple expression tree using patterns.',
      skeleton: `// Given:
// abstract record Expr;
// record Num(double Value) : Expr;
// record Add(Expr Left, Expr Right) : Expr;
// record Mul(Expr Left, Expr Right) : Expr;
// Write: double Eval(Expr expr)`,
      solution: `double Eval(Expr expr) => expr switch
{
    Num(var v) => v,
    Add(var l, var r) => Eval(l) + Eval(r),
    Mul(var l, var r) => Eval(l) * Eval(r),
    _ => throw new ArgumentException($"Unknown expression: {expr}")
};`,
      hints: ['Positional patterns deconstruct record properties.', 'Recursively call Eval for nested expressions.', 'Records provide built-in Deconstruct.'],
      concepts: ['recursive pattern', 'expression tree', 'deconstruction'],
    },
    {
      id: 'cs-pat-13',
      title: 'Bug: Missing Default in Switch Expression',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the switch expression that throws at runtime for unmatched values.',
      skeleton: `string Describe(int n) => n switch
{
    1 => "one",
    2 => "two",
    3 => "three"
    // Bug: MatchFailureException for any other number
};`,
      solution: `string Describe(int n) => n switch
{
    1 => "one",
    2 => "two",
    3 => "three",
    _ => $"other ({n})"
};`,
      hints: ['Switch expressions must be exhaustive.', 'Add a default arm with _ to handle all other cases.', 'Without it, unmatched values throw at runtime.'],
      concepts: ['exhaustive switch', 'default arm', 'discard pattern'],
    },
    {
      id: 'cs-pat-14',
      title: 'Bug: Pattern Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the pattern order so specific patterns match before general ones.',
      skeleton: `string Classify(object value) => value switch
{
    object => "object",          // catches everything!
    string s => $"string: {s}",  // unreachable
    int n => $"int: {n}",        // unreachable
};`,
      solution: `string Classify(object value) => value switch
{
    string s => $"string: {s}",
    int n => $"int: {n}",
    _ => "object",
};`,
      hints: ['More specific patterns must come before general ones.', 'object matches everything; string and int are more specific.', 'Use _ for the catch-all case.'],
      concepts: ['pattern ordering', 'unreachable code', 'specificity'],
    },
    {
      id: 'cs-pat-15',
      title: 'Bug: Negated Pattern',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the incorrect negated null check.',
      skeleton: `// Bug: != null can be overridden by operator overloads
if (value != null)
{
    Process(value);  // may still get warning
}`,
      solution: `// Fix: is not null uses pattern matching, cannot be overridden
if (value is not null)
{
    Process(value);
}`,
      hints: ['!= null calls the operator which can be overloaded.', 'is not null uses pattern matching and is reliable.', 'The compiler trusts is not null for flow analysis.'],
      concepts: ['not pattern', 'is not null', 'operator overload safety'],
    },
    {
      id: 'cs-pat-16',
      title: 'Predict Switch Expression Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output of a switch expression.',
      skeleton: `int x = 42;
string result = x switch
{
    < 0 => "negative",
    0 => "zero",
    > 0 and <= 50 => "small",
    _ => "large"
};
Console.WriteLine(result);`,
      solution: `small`,
      hints: ['42 is > 0 and <= 50.', 'The "small" arm matches.', 'Pattern matching evaluates top to bottom.'],
      concepts: ['relational pattern', 'logical and'],
    },
    {
      id: 'cs-pat-17',
      title: 'Predict Property Pattern',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of property pattern matching.',
      skeleton: `var point = new { X = 0, Y = 5 };
string result = point switch
{
    { X: 0, Y: 0 } => "origin",
    { X: 0 } => "y-axis",
    { Y: 0 } => "x-axis",
    _ => "other"
};
Console.WriteLine(result);`,
      solution: `y-axis`,
      hints: ['X is 0 and Y is 5.', '{ X: 0, Y: 0 } does not match (Y is 5).', '{ X: 0 } matches because X is 0 (Y is not checked).'],
      concepts: ['property pattern', 'partial match'],
    },
    {
      id: 'cs-pat-18',
      title: 'Predict List Pattern',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Predict the output of list pattern matching.',
      skeleton: `int[] arr = { 1, 2, 3, 4, 5 };
string result = arr switch
{
    [1, 2, 3] => "exact 1-2-3",
    [1, .., 5] => "1 to 5",
    [_, _, ..] => "at least two",
    _ => "other"
};
Console.WriteLine(result);`,
      solution: `1 to 5`,
      hints: ['[1, 2, 3] needs exactly 3 elements, but arr has 5.', '[1, .., 5] matches: starts with 1, ends with 5.', '.. matches the middle elements 2, 3, 4.'],
      concepts: ['list pattern', 'slice pattern', 'exact vs partial match'],
    },
    {
      id: 'cs-pat-19',
      title: 'Refactor If-Else Chain to Switch Expression',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Replace an if-else chain with a switch expression.',
      skeleton: `string DescribeTemp(double temp)
{
    if (temp < 0)
        return "freezing";
    else if (temp < 15)
        return "cold";
    else if (temp < 25)
        return "comfortable";
    else if (temp < 35)
        return "warm";
    else
        return "hot";
}`,
      solution: `string DescribeTemp(double temp) => temp switch
{
    < 0 => "freezing",
    < 15 => "cold",
    < 25 => "comfortable",
    < 35 => "warm",
    _ => "hot"
};`,
      hints: ['Switch expressions with relational patterns replace if-else chains.', 'Each arm implicitly handles values not caught by previous arms.', '_ is the catch-all default.'],
      concepts: ['switch expression', 'relational patterns', 'if-else replacement'],
    },
    {
      id: 'cs-pat-20',
      title: 'Refactor Type Check Cascade',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Replace cascaded type checks with pattern-based switch.',
      skeleton: `double GetArea(object shape)
{
    if (shape is Circle)
    {
        var c = (Circle)shape;
        return Math.PI * c.Radius * c.Radius;
    }
    else if (shape is Rectangle)
    {
        var r = (Rectangle)shape;
        return r.Width * r.Height;
    }
    throw new ArgumentException("Unknown shape");
}`,
      solution: `double GetArea(object shape) => shape switch
{
    Circle c => Math.PI * c.Radius * c.Radius,
    Rectangle r => r.Width * r.Height,
    _ => throw new ArgumentException("Unknown shape")
};`,
      hints: ['Type patterns declare and cast in one step.', 'Switch expressions are more concise than if-else type checks.', 'Each arm extracts the typed variable directly.'],
      concepts: ['type pattern', 'switch expression', 'eliminating casts'],
    },
  ],
};
