import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-delegates',
  title: '18. Delegates',
  explanation: `## Delegates

A delegate is a type-safe function pointer. It defines a method signature that any matching method can be assigned to.

\`\`\`csharp
// Custom delegate
delegate int MathOp(int a, int b);

MathOp add = (a, b) => a + b;
Console.WriteLine(add(3, 4)); // 7

// Built-in delegates
Func<int, int, int> multiply = (a, b) => a * b;  // returns value
Action<string> print = msg => Console.WriteLine(msg);  // void
Predicate<int> isEven = n => n % 2 == 0;  // returns bool

// Multicast delegates
Action<string> log = Console.WriteLine;
log += msg => File.AppendAllText("log.txt", msg);
log("hello");  // calls both targets
\`\`\`

**Func<>** is for methods that return a value (last type parameter is the return type). **Action<>** is for void methods. **Predicate<T>** is shorthand for \`Func<T, bool>\`.`,
  exercises: [
    {
      id: 'cs-del-1',
      title: 'Declare a Delegate',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a delegate type for a string-to-int conversion.',
      skeleton: `__BLANK__ int Parser(string input);`,
      solution: `delegate int Parser(string input);`,
      hints: ['Delegates are declared with the delegate keyword.', 'The syntax is like a method signature with delegate prefix.', 'The answer is: delegate'],
      concepts: ['delegate declaration', 'type-safe function pointer'],
    },
    {
      id: 'cs-del-2',
      title: 'Func Delegate',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Use Func to declare a delegate that takes two ints and returns an int.',
      skeleton: `__BLANK__ add = (a, b) => a + b;
Console.WriteLine(add(3, 4));`,
      solution: `Func<int, int, int> add = (a, b) => a + b;
Console.WriteLine(add(3, 4));`,
      hints: ['Func<T1, T2, TResult> takes two inputs and returns a result.', 'The last type parameter is always the return type.', 'The answer is: Func<int, int, int>'],
      concepts: ['Func delegate', 'type parameters'],
    },
    {
      id: 'cs-del-3',
      title: 'Action Delegate',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Use Action for a void delegate.',
      skeleton: `__BLANK__ greet = name => Console.WriteLine($"Hello, {name}!");
greet("World");`,
      solution: `Action<string> greet = name => Console.WriteLine($"Hello, {name}!");
greet("World");`,
      hints: ['Action<T> is for void methods with parameters.', 'Action<string> takes one string parameter.', 'The answer is: Action<string>'],
      concepts: ['Action delegate', 'void delegate'],
    },
    {
      id: 'cs-del-4',
      title: 'Predicate Delegate',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Use Predicate for a bool-returning delegate.',
      skeleton: `__BLANK__ isPositive = n => n > 0;
Console.WriteLine(isPositive(5));`,
      solution: `Predicate<int> isPositive = n => n > 0;
Console.WriteLine(isPositive(5));`,
      hints: ['Predicate<T> is equivalent to Func<T, bool>.', 'It is commonly used with List.FindAll, List.Exists, etc.', 'The answer is: Predicate<int>'],
      concepts: ['Predicate delegate', 'bool function'],
    },
    {
      id: 'cs-del-5',
      title: 'Multicast Delegate',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Add a second target to a multicast delegate.',
      skeleton: `Action<string> log = msg => Console.WriteLine($"Console: {msg}");
log __BLANK__ msg => Console.WriteLine($"File: {msg}");
log("test");  // calls both`,
      solution: `Action<string> log = msg => Console.WriteLine($"Console: {msg}");
log += msg => Console.WriteLine($"File: {msg}");
log("test");  // calls both`,
      hints: ['The += operator adds another target to a delegate.', 'Multicast delegates invoke all targets in order.', 'The answer is: +='],
      concepts: ['multicast delegate', '+= operator'],
    },
    {
      id: 'cs-del-6',
      title: 'Method Group Conversion',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Assign a named method to a delegate using method group conversion.',
      skeleton: `static bool IsEven(int n) => n % 2 == 0;

Predicate<int> check = __BLANK__;`,
      solution: `static bool IsEven(int n) => n % 2 == 0;

Predicate<int> check = IsEven;`,
      hints: ['You can assign a method name directly without parentheses.', 'This is called method group conversion.', 'The answer is: IsEven'],
      concepts: ['method group', 'delegate assignment'],
    },
    {
      id: 'cs-del-7',
      title: 'Higher-Order Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method that takes a Func and applies it to each element.',
      skeleton: `// Write List<TOut> Map<TIn, TOut>(List<TIn> items, Func<TIn, TOut> transform)`,
      solution: `List<TOut> Map<TIn, TOut>(List<TIn> items, Func<TIn, TOut> transform)
{
    var result = new List<TOut>();
    foreach (var item in items)
        result.Add(transform(item));
    return result;
}`,
      hints: ['Iterate the list and call transform on each element.', 'Add each transformed result to a new list.', 'This is essentially what LINQ Select does.'],
      concepts: ['higher-order function', 'Func parameter', 'map'],
    },
    {
      id: 'cs-del-8',
      title: 'Delegate Composition',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method that composes two functions together.',
      skeleton: `// Write Func<T, TResult> Compose<T, TMiddle, TResult>(
//   Func<T, TMiddle> first, Func<TMiddle, TResult> second)
// So Compose(f, g)(x) == g(f(x))`,
      solution: `Func<T, TResult> Compose<T, TMiddle, TResult>(
    Func<T, TMiddle> first,
    Func<TMiddle, TResult> second)
{
    return x => second(first(x));
}`,
      hints: ['Compose chains: apply first, then second.', 'Return a new lambda that applies both.', 'g(f(x)) means first transforms, then second.'],
      concepts: ['function composition', 'higher-order functions', 'lambda'],
    },
    {
      id: 'cs-del-9',
      title: 'Callback Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method that performs work and calls back with the result.',
      skeleton: `// Write void ProcessAsync(int[] data, Action<int> onResult, Action<Exception> onError)
// Sum the data; if any element is negative, call onError; otherwise call onResult with the sum`,
      solution: `void ProcessAsync(int[] data, Action<int> onResult, Action<Exception> onError)
{
    try
    {
        foreach (var n in data)
        {
            if (n < 0)
                throw new ArgumentException($"Negative value: {n}");
        }
        onResult(data.Sum());
    }
    catch (Exception ex)
    {
        onError(ex);
    }
}`,
      hints: ['Use Action<int> for success and Action<Exception> for error.', 'Check for negatives and throw or call onError.', 'Call onResult with the sum on success.'],
      concepts: ['callback pattern', 'Action delegates', 'error handling'],
    },
    {
      id: 'cs-del-10',
      title: 'Predicate Chain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method that combines two predicates with logical AND.',
      skeleton: `// Write Func<T, bool> And<T>(Func<T, bool> left, Func<T, bool> right)`,
      solution: `Func<T, bool> And<T>(Func<T, bool> left, Func<T, bool> right)
    => x => left(x) && right(x);`,
      hints: ['Return a lambda that evaluates both predicates.', 'Use && for short-circuit AND.', 'Both must return true for the combined predicate to return true.'],
      concepts: ['predicate composition', 'logical AND', 'lambda'],
    },
    {
      id: 'cs-del-11',
      title: 'Retry with Delegate',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a retry helper that attempts an operation up to N times.',
      skeleton: `// Write T Retry<T>(Func<T> operation, int maxAttempts)
// Retries on exception, throws after maxAttempts failures`,
      solution: `T Retry<T>(Func<T> operation, int maxAttempts)
{
    for (int attempt = 1; attempt <= maxAttempts; attempt++)
    {
        try
        {
            return operation();
        }
        catch when (attempt < maxAttempts)
        {
            // retry
        }
    }
    return operation(); // final attempt, let exception propagate
}`,
      hints: ['Loop up to maxAttempts, catching exceptions.', 'On the last attempt, let the exception propagate.', 'Use a catch-when filter for cleaner control flow.'],
      concepts: ['retry pattern', 'Func delegate', 'exception handling'],
    },
    {
      id: 'cs-del-12',
      title: 'Memoize Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a memoization wrapper for a single-argument function.',
      skeleton: `// Write Func<TArg, TResult> Memoize<TArg, TResult>(Func<TArg, TResult> func)
// where TArg : notnull`,
      solution: `Func<TArg, TResult> Memoize<TArg, TResult>(Func<TArg, TResult> func) where TArg : notnull
{
    var cache = new Dictionary<TArg, TResult>();
    return arg =>
    {
        if (!cache.TryGetValue(arg, out var result))
        {
            result = func(arg);
            cache[arg] = result;
        }
        return result;
    };
}`,
      hints: ['Use a Dictionary to cache results.', 'Check the cache before calling the original function.', 'Return a new lambda that wraps the original.'],
      concepts: ['memoization', 'closure', 'caching'],
    },
    {
      id: 'cs-del-13',
      title: 'Bug: Delegate Null Invocation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the NullReferenceException when invoking a null delegate.',
      skeleton: `Action<string>? callback = null;
callback("hello");  // throws NullReferenceException`,
      solution: `Action<string>? callback = null;
callback?.Invoke("hello");  // safe: does nothing if null`,
      hints: ['A null delegate throws when invoked directly.', 'Use the null-conditional operator ?. with Invoke.', 'callback?.Invoke("hello") is the safe pattern.'],
      concepts: ['null delegate', 'null-conditional', 'Invoke'],
    },
    {
      id: 'cs-del-14',
      title: 'Bug: Multicast Return Value',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the bug where only the last delegate return value is captured.',
      skeleton: `Func<int, int> transform = x => x + 1;
transform += x => x * 2;
transform += x => x - 3;
// Bug: only gets the last result (x - 3), loses others
int result = transform(5);
Console.WriteLine(result);  // prints 2, wanted all results`,
      solution: `Func<int, int> transform = x => x + 1;
transform += x => x * 2;
transform += x => x - 3;

// Fix: invoke each delegate individually
var results = new List<int>();
foreach (var d in transform.GetInvocationList().Cast<Func<int, int>>())
{
    results.Add(d(5));
}
Console.WriteLine(string.Join(", ", results));  // 6, 10, 2`,
      hints: ['Multicast Func delegates only return the last result.', 'Use GetInvocationList() to invoke each delegate separately.', 'Collect results from each individual invocation.'],
      concepts: ['multicast delegate', 'GetInvocationList', 'return value'],
    },
    {
      id: 'cs-del-15',
      title: 'Bug: Wrong Delegate Signature',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the delegate assignment that does not match the signature.',
      skeleton: `Func<int, int> doubleIt = (int x, int y) => x * 2;
// Error: Func<int, int> expects one parameter and one return, not two params`,
      solution: `Func<int, int> doubleIt = (int x) => x * 2;`,
      hints: ['Func<int, int> takes one int and returns one int.', 'The lambda has two parameters but only one is expected.', 'Remove the second parameter.'],
      concepts: ['delegate signature', 'Func type parameters'],
    },
    {
      id: 'cs-del-16',
      title: 'Predict Delegate Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output of delegate invocation.',
      skeleton: `Func<int, int, int> op = (a, b) => a - b;
Console.WriteLine(op(10, 3));
op = (a, b) => a * b;
Console.WriteLine(op(10, 3));`,
      solution: `7
30`,
      hints: ['First op is subtraction: 10 - 3 = 7.', 'Then op is reassigned to multiplication: 10 * 3 = 30.', 'Delegates can be reassigned like any variable.'],
      concepts: ['delegate reassignment', 'Func invocation'],
    },
    {
      id: 'cs-del-17',
      title: 'Predict Multicast Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of a multicast Action delegate.',
      skeleton: `Action log = () => Console.Write("A");
log += () => Console.Write("B");
log += () => Console.Write("C");
log -= () => Console.Write("B");
log();`,
      solution: `ABC`,
      hints: ['Multicast delegates invoke targets in addition order.', 'The -= with a new lambda does NOT remove the original (different instance).', 'All three original targets still fire: A, B, C.'],
      concepts: ['multicast invocation order', 'delegate removal', 'lambda identity'],
    },
    {
      id: 'cs-del-18',
      title: 'Predict Closure Capture',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output when a delegate captures a variable.',
      skeleton: `int x = 10;
Func<int> getX = () => x;
x = 20;
Console.WriteLine(getX());`,
      solution: `20`,
      hints: ['Lambdas capture variables by reference, not by value.', 'When getX() is called, x has already been changed to 20.', 'The closure reads the current value of x.'],
      concepts: ['closure', 'variable capture', 'by-reference'],
    },
    {
      id: 'cs-del-19',
      title: 'Refactor Switch to Delegate Map',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Replace a switch statement with a dictionary of delegates.',
      skeleton: `double Calculate(string op, double a, double b)
{
    switch (op)
    {
        case "add": return a + b;
        case "sub": return a - b;
        case "mul": return a * b;
        case "div": return a / b;
        default: throw new ArgumentException($"Unknown op: {op}");
    }
}`,
      solution: `double Calculate(string op, double a, double b)
{
    var operations = new Dictionary<string, Func<double, double, double>>
    {
        ["add"] = (x, y) => x + y,
        ["sub"] = (x, y) => x - y,
        ["mul"] = (x, y) => x * y,
        ["div"] = (x, y) => x / y,
    };

    if (!operations.TryGetValue(op, out var func))
        throw new ArgumentException($"Unknown op: {op}");

    return func(a, b);
}`,
      hints: ['Map operation names to Func<double, double, double>.', 'Look up the delegate by key and invoke it.', 'This is the strategy pattern in miniature.'],
      concepts: ['delegate map', 'strategy pattern', 'Dictionary of Func'],
    },
    {
      id: 'cs-del-20',
      title: 'Refactor Repeated Logging to Delegate',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Extract repeated logging into a reusable Action delegate.',
      skeleton: `void ProcessOrders(Order[] orders)
{
    foreach (var order in orders)
    {
        Console.WriteLine($"[{DateTime.Now:HH:mm:ss}] Processing {order.Id}");
        // process...
        Console.WriteLine($"[{DateTime.Now:HH:mm:ss}] Completed {order.Id}");
    }
}`,
      solution: `void ProcessOrders(Order[] orders, Action<string>? log = null)
{
    log ??= msg => Console.WriteLine($"[{DateTime.Now:HH:mm:ss}] {msg}");
    foreach (var order in orders)
    {
        log($"Processing {order.Id}");
        // process...
        log($"Completed {order.Id}");
    }
}`,
      hints: ['Extract the logging format into an Action<string>.', 'Make it an optional parameter so callers can override it.', 'Use ??= to set a default if null.'],
      concepts: ['delegate parameter', 'injectable logging', 'separation of concerns'],
    },
  ],
};
