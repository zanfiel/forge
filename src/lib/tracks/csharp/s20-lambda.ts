import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-lambda',
  title: '20. Lambda Expressions',
  explanation: `## Lambda Expressions

Lambdas are concise anonymous functions used extensively with LINQ, events, and delegate-based APIs.

\`\`\`csharp
// Expression lambda
Func<int, int> square = x => x * x;

// Statement lambda
Func<int, bool> isEvenPositive = x =>
{
    if (x <= 0) return false;
    return x % 2 == 0;
};

// Closures -- capturing outer variables
int factor = 3;
Func<int, int> multiply = x => x * factor;
Console.WriteLine(multiply(5)); // 15

// Static lambda (C# 9) -- cannot capture
Func<int, int> doubleIt = static x => x * 2;

// Lambda with discard
button.Clicked += (_, _) => Console.WriteLine("clicked");

// Natural type (C# 10)
var parse = (string s) => int.Parse(s);  // inferred as Func<string, int>
\`\`\`

Lambdas compile to delegate instances. Expression lambdas produce a single expression; statement lambdas use braces and can contain multiple statements.`,
  exercises: [
    {
      id: 'cs-lam-1',
      title: 'Expression Lambda',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write an expression lambda that doubles a number.',
      skeleton: `Func<int, int> doubleIt = x __BLANK__ x * 2;`,
      solution: `Func<int, int> doubleIt = x => x * 2;`,
      hints: ['The => arrow separates parameters from the body.', 'Expression lambdas have no braces or return statement.', 'The answer is: =>'],
      concepts: ['expression lambda', 'arrow operator'],
    },
    {
      id: 'cs-lam-2',
      title: 'Multi-Parameter Lambda',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a lambda that takes two parameters.',
      skeleton: `Func<int, int, int> add = __BLANK__ => a + b;`,
      solution: `Func<int, int, int> add = (a, b) => a + b;`,
      hints: ['Multiple parameters must be wrapped in parentheses.', 'The syntax is (param1, param2) => expression.', 'The answer is: (a, b)'],
      concepts: ['multi-parameter lambda', 'parentheses'],
    },
    {
      id: 'cs-lam-3',
      title: 'Statement Lambda',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Complete a statement lambda with multiple lines.',
      skeleton: `Func<string, string> shout = msg __BLANK__
{
    var upper = msg.ToUpper();
    return upper + "!";
};`,
      solution: `Func<string, string> shout = msg =>
{
    var upper = msg.ToUpper();
    return upper + "!";
};`,
      hints: ['Statement lambdas use => followed by a block.', 'They require explicit return statements.', 'The answer is: =>'],
      concepts: ['statement lambda', 'block body'],
    },
    {
      id: 'cs-lam-4',
      title: 'Closure Capture',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create a closure that captures an outer variable.',
      skeleton: `int threshold = 10;
Predicate<int> aboveThreshold = n => n > __BLANK__;`,
      solution: `int threshold = 10;
Predicate<int> aboveThreshold = n => n > threshold;`,
      hints: ['Lambdas can reference variables from the enclosing scope.', 'This is called a closure.', 'The answer is: threshold'],
      concepts: ['closure', 'captured variable'],
    },
    {
      id: 'cs-lam-5',
      title: 'Static Lambda',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Declare a static lambda that cannot capture variables.',
      skeleton: `Func<int, int> triple = __BLANK__ x => x * 3;`,
      solution: `Func<int, int> triple = static x => x * 3;`,
      hints: ['static lambdas cannot access enclosing scope variables.', 'They are slightly more efficient (no closure allocation).', 'The answer is: static'],
      concepts: ['static lambda', 'C# 9', 'no capture'],
    },
    {
      id: 'cs-lam-6',
      title: 'Lambda with Discard',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use discards for unused lambda parameters.',
      skeleton: `button.Clicked += (__BLANK__, __BLANK__) => Console.WriteLine("clicked");`,
      solution: `button.Clicked += (_, _) => Console.WriteLine("clicked");`,
      hints: ['Underscore _ is a discard for unused parameters.', 'Both sender and EventArgs are unused here.', 'The answer is: _, _'],
      concepts: ['discard parameter', 'underscore', 'event handler'],
    },
    {
      id: 'cs-lam-7',
      title: 'Counter Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a function that returns a counter lambda using closure.',
      skeleton: `// Write Func<int> CreateCounter()
// Each call to the returned function increments and returns the count`,
      solution: `Func<int> CreateCounter()
{
    int count = 0;
    return () => ++count;
}`,
      hints: ['The lambda captures the local count variable.', 'Each invocation increments and returns the count.', 'This demonstrates closure over a mutable variable.'],
      concepts: ['closure factory', 'mutable capture', 'counter'],
    },
    {
      id: 'cs-lam-8',
      title: 'Pipeline Builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method that chains multiple transformations into a single lambda.',
      skeleton: `// Write Func<T, T> Pipeline<T>(params Func<T, T>[] steps)
// Applies each step in order`,
      solution: `Func<T, T> Pipeline<T>(params Func<T, T>[] steps)
{
    return input =>
    {
        T result = input;
        foreach (var step in steps)
            result = step(result);
        return result;
    };
}`,
      hints: ['Return a lambda that applies each step sequentially.', 'Start with the input and fold through each function.', 'The closure captures the steps array.'],
      concepts: ['pipeline pattern', 'function chaining', 'closure'],
    },
    {
      id: 'cs-lam-9',
      title: 'Lazy Initializer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a function that wraps a factory lambda for lazy evaluation.',
      skeleton: `// Write Func<T> Lazy<T>(Func<T> factory)
// The factory should only be called once; cache the result`,
      solution: `Func<T> Lazy<T>(Func<T> factory)
{
    T? cached = default;
    bool initialized = false;
    return () =>
    {
        if (!initialized)
        {
            cached = factory();
            initialized = true;
        }
        return cached!;
    };
}`,
      hints: ['Use a bool flag to track initialization.', 'Cache the result and return it on subsequent calls.', 'The closure captures both cached and initialized.'],
      concepts: ['lazy evaluation', 'closure', 'caching'],
    },
    {
      id: 'cs-lam-10',
      title: 'Currying',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a Curry function that transforms a two-argument function into a chain of single-argument functions.',
      skeleton: `// Write Func<T1, Func<T2, TResult>> Curry<T1, T2, TResult>(Func<T1, T2, TResult> func)`,
      solution: `Func<T1, Func<T2, TResult>> Curry<T1, T2, TResult>(Func<T1, T2, TResult> func)
    => a => b => func(a, b);`,
      hints: ['Currying converts f(a, b) into f(a)(b).', 'Return a function that returns another function.', 'a => b => func(a, b) is the curried form.'],
      concepts: ['currying', 'partial application', 'higher-order functions'],
    },
    {
      id: 'cs-lam-11',
      title: 'Debounce',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a debounce function that delays execution until a quiet period.',
      skeleton: `// Write Action Debounce(Action action, int delayMs)
// Only executes after delayMs without another call`,
      solution: `Action Debounce(Action action, int delayMs)
{
    CancellationTokenSource? cts = null;
    return () =>
    {
        cts?.Cancel();
        cts = new CancellationTokenSource();
        var token = cts.Token;
        Task.Delay(delayMs, token).ContinueWith(t =>
        {
            if (!t.IsCanceled) action();
        });
    };
}`,
      hints: ['Cancel the previous timer on each new call.', 'Use CancellationTokenSource to cancel pending executions.', 'Task.Delay provides the timeout.'],
      concepts: ['debounce', 'CancellationToken', 'closure'],
    },
    {
      id: 'cs-lam-12',
      title: 'Expression Tree Basics',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Create an expression tree from a lambda and compile it.',
      skeleton: `// Write Func<int, int> CompileSquare()
// Build Expression<Func<int, int>> for x => x * x, then Compile()`,
      solution: `Func<int, int> CompileSquare()
{
    Expression<Func<int, int>> expr = x => x * x;
    return expr.Compile();
}`,
      hints: ['Expression<Func<...>> captures the lambda as a data structure.', 'Compile() converts the expression tree to an executable delegate.', 'Expression trees are used by ORMs like Entity Framework.'],
      concepts: ['expression tree', 'Expression<T>', 'Compile'],
    },
    {
      id: 'cs-lam-13',
      title: 'Bug: Static Lambda Capturing',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the static lambda that incorrectly tries to capture a variable.',
      skeleton: `int multiplier = 5;
Func<int, int> scale = static x => x * multiplier;  // Error: cannot capture`,
      solution: `int multiplier = 5;
Func<int, int> scale = x => x * multiplier;  // remove static`,
      hints: ['static lambdas cannot capture enclosing variables.', 'Remove the static keyword to allow capture.', 'Or pass the value as a parameter instead.'],
      concepts: ['static lambda restriction', 'closure requirement'],
    },
    {
      id: 'cs-lam-14',
      title: 'Bug: Modified Closure in Loop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix lambdas in a loop that all capture the same variable.',
      skeleton: `var actions = new List<Action>();
for (int i = 0; i < 3; i++)
    actions.Add(() => Console.Write(i));
foreach (var a in actions) a();  // prints "333" not "012"`,
      solution: `var actions = new List<Action>();
for (int i = 0; i < 3; i++)
{
    int local = i;
    actions.Add(() => Console.Write(local));
}
foreach (var a in actions) a();  // prints "012"`,
      hints: ['The lambda captures the variable i, not its value.', 'After the loop, i is 3 for all lambdas.', 'Copy i to a local variable inside the loop.'],
      concepts: ['loop closure bug', 'variable capture', 'local copy'],
    },
    {
      id: 'cs-lam-15',
      title: 'Bug: Async Void Lambda',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the async void lambda that swallows exceptions.',
      skeleton: `// Bug: async void lambda - exceptions are unobserved
Action process = async () =>
{
    await Task.Delay(100);
    throw new Exception("oops");
};
process();`,
      solution: `// Fix: use Func<Task> instead of Action for async lambdas
Func<Task> process = async () =>
{
    await Task.Delay(100);
    throw new Exception("oops");
};
await process();  // exception is now observable`,
      hints: ['async void methods fire-and-forget; exceptions crash the process.', 'Use Func<Task> for async lambdas so callers can await.', 'Only use async void for event handlers.'],
      concepts: ['async void danger', 'Func<Task>', 'async lambda'],
    },
    {
      id: 'cs-lam-16',
      title: 'Predict Lambda Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output of a simple lambda.',
      skeleton: `Func<string, string> transform = s => s.ToUpper() + "!";
Console.WriteLine(transform("hello"));`,
      solution: `HELLO!`,
      hints: ['ToUpper converts to uppercase.', '+ "!" appends an exclamation mark.', '"hello" becomes "HELLO!".'],
      concepts: ['lambda invocation', 'string transformation'],
    },
    {
      id: 'cs-lam-17',
      title: 'Predict Closure Mutation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output when a closure mutates a captured variable.',
      skeleton: `int count = 0;
var inc = () => ++count;
inc();
inc();
inc();
Console.WriteLine(count);`,
      solution: `3`,
      hints: ['The lambda captures count by reference.', 'Each call increments the original count variable.', 'After three calls, count is 3.'],
      concepts: ['closure mutation', 'by-reference capture'],
    },
    {
      id: 'cs-lam-18',
      title: 'Predict Chained Lambdas',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of chained lambda calls.',
      skeleton: `Func<int, Func<int, int>> adder = a => b => a + b;
var add5 = adder(5);
Console.WriteLine(add5(3));
Console.WriteLine(add5(10));`,
      solution: `8
15`,
      hints: ['adder(5) returns a function that adds 5 to its argument.', 'add5(3) = 5 + 3 = 8.', 'add5(10) = 5 + 10 = 15.'],
      concepts: ['curried function', 'partial application', 'closure'],
    },
    {
      id: 'cs-lam-19',
      title: 'Refactor Anonymous Delegate to Lambda',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Convert an anonymous delegate to a lambda expression.',
      skeleton: `Func<int, int, int> add = delegate(int a, int b)
{
    return a + b;
};`,
      solution: `Func<int, int, int> add = (a, b) => a + b;`,
      hints: ['Lambda syntax is shorter than anonymous delegate syntax.', 'Remove the delegate keyword and parameter types.', 'Use => instead of a block with return.'],
      concepts: ['anonymous delegate', 'lambda conversion', 'syntax sugar'],
    },
    {
      id: 'cs-lam-20',
      title: 'Refactor to Method Group',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Replace a lambda that just calls a method with a method group.',
      skeleton: `var numbers = new List<int> { 1, 2, 3, 4, 5 };
numbers.ForEach(n => Console.WriteLine(n));

var strings = new[] { "1", "2", "3" };
var parsed = strings.Select(s => int.Parse(s)).ToList();`,
      solution: `var numbers = new List<int> { 1, 2, 3, 4, 5 };
numbers.ForEach(Console.WriteLine);

var strings = new[] { "1", "2", "3" };
var parsed = strings.Select(int.Parse).ToList();`,
      hints: ['When a lambda just passes its argument to a method, use the method group.', 'n => Console.WriteLine(n) becomes Console.WriteLine.', 's => int.Parse(s) becomes int.Parse.'],
      concepts: ['method group', 'delegate inference', 'conciseness'],
    },
  ],
};
