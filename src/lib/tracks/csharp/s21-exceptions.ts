import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-exceptions',
  title: '21. Exception Handling',
  explanation: `## Exception Handling

C# uses structured exception handling with try/catch/finally. Exceptions are objects derived from \`System.Exception\`.

\`\`\`csharp
try
{
    int result = int.Parse("not a number");
}
catch (FormatException ex)
{
    Console.WriteLine($"Bad format: {ex.Message}");
}
catch (Exception ex) when (ex is not OutOfMemoryException)
{
    Console.WriteLine($"Other error: {ex.Message}");
}
finally
{
    Console.WriteLine("Always runs");
}

// Custom exception
class InsufficientFundsException : Exception
{
    public decimal Amount { get; }
    public InsufficientFundsException(decimal amount)
        : base($"Insufficient funds: {amount:C}")
    {
        Amount = amount;
    }
}

// Throw and rethrow
throw new ArgumentNullException(nameof(param));
catch (Exception) { throw; }  // rethrow preserving stack trace
\`\`\`

**Exception filters** (\`catch ... when\`) let you conditionally catch without unwinding the stack.`,
  exercises: [
    {
      id: 'cs-exc-1',
      title: 'Basic Try-Catch',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Catch a specific exception type.',
      skeleton: `try
{
    int n = int.Parse("abc");
}
__BLANK__ (FormatException ex)
{
    Console.WriteLine(ex.Message);
}`,
      solution: `try
{
    int n = int.Parse("abc");
}
catch (FormatException ex)
{
    Console.WriteLine(ex.Message);
}`,
      hints: ['The catch keyword follows a try block.', 'Specify the exception type in parentheses.', 'The answer is: catch'],
      concepts: ['try-catch', 'FormatException'],
    },
    {
      id: 'cs-exc-2',
      title: 'Finally Block',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Add a finally block that always executes.',
      skeleton: `try
{
    File.ReadAllText("data.txt");
}
catch (FileNotFoundException)
{
    Console.WriteLine("Not found");
}
__BLANK__
{
    Console.WriteLine("Cleanup done");
}`,
      solution: `try
{
    File.ReadAllText("data.txt");
}
catch (FileNotFoundException)
{
    Console.WriteLine("Not found");
}
finally
{
    Console.WriteLine("Cleanup done");
}`,
      hints: ['finally runs whether or not an exception occurs.', 'It is commonly used for cleanup.', 'The answer is: finally'],
      concepts: ['finally block', 'cleanup'],
    },
    {
      id: 'cs-exc-3',
      title: 'Exception Filter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use an exception filter to conditionally catch.',
      skeleton: `try
{
    SendRequest();
}
catch (HttpRequestException ex) __BLANK__ (ex.StatusCode == HttpStatusCode.NotFound)
{
    Console.WriteLine("Resource not found");
}`,
      solution: `try
{
    SendRequest();
}
catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
{
    Console.WriteLine("Resource not found");
}`,
      hints: ['Exception filters use the when keyword.', 'The filter runs before the stack is unwound.', 'The answer is: when'],
      concepts: ['exception filter', 'when keyword'],
    },
    {
      id: 'cs-exc-4',
      title: 'Throw Expression',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Throw an ArgumentNullException for a null parameter.',
      skeleton: `public void Process(string data)
{
    _ = data ?? __BLANK__ new ArgumentNullException(nameof(data));
}`,
      solution: `public void Process(string data)
{
    _ = data ?? throw new ArgumentNullException(nameof(data));
}`,
      hints: ['throw can be used as an expression with ??.', 'This is a concise null guard pattern.', 'The answer is: throw'],
      concepts: ['throw expression', 'null guard', 'ArgumentNullException'],
    },
    {
      id: 'cs-exc-5',
      title: 'Rethrow Preserving Stack',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Rethrow an exception while preserving the original stack trace.',
      skeleton: `try
{
    DoWork();
}
catch (Exception)
{
    LogError();
    __BLANK__;  // rethrow preserving stack trace
}`,
      solution: `try
{
    DoWork();
}
catch (Exception)
{
    LogError();
    throw;  // rethrow preserving stack trace
}`,
      hints: ['throw without an argument rethrows the current exception.', 'throw ex would reset the stack trace.', 'The answer is: throw'],
      concepts: ['rethrow', 'stack trace preservation'],
    },
    {
      id: 'cs-exc-6',
      title: 'Multiple Catch Blocks',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Order catch blocks from most specific to least specific.',
      skeleton: `try { DoWork(); }
catch (__BLANK__) { Console.WriteLine("Null arg"); }
catch (ArgumentException) { Console.WriteLine("Bad arg"); }
catch (Exception) { Console.WriteLine("General error"); }`,
      solution: `try { DoWork(); }
catch (ArgumentNullException) { Console.WriteLine("Null arg"); }
catch (ArgumentException) { Console.WriteLine("Bad arg"); }
catch (Exception) { Console.WriteLine("General error"); }`,
      hints: ['ArgumentNullException derives from ArgumentException.', 'More specific exceptions must come first.', 'The answer is: ArgumentNullException'],
      concepts: ['catch ordering', 'exception hierarchy'],
    },
    {
      id: 'cs-exc-7',
      title: 'Custom Exception Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a custom exception with an error code property.',
      skeleton: `// Write class AppException : Exception with:
// - int ErrorCode property
// - Constructor taking (int errorCode, string message)
// - Constructor taking (int errorCode, string message, Exception inner)`,
      solution: `class AppException : Exception
{
    public int ErrorCode { get; }

    public AppException(int errorCode, string message)
        : base(message)
    {
        ErrorCode = errorCode;
    }

    public AppException(int errorCode, string message, Exception inner)
        : base(message, inner)
    {
        ErrorCode = errorCode;
    }
}`,
      hints: ['Derive from Exception and call base constructors.', 'Add a custom property for the error code.', 'Provide an overload accepting an inner exception for chaining.'],
      concepts: ['custom exception', 'inner exception', 'exception design'],
    },
    {
      id: 'cs-exc-8',
      title: 'TryParse Pattern',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a safe parse method using the Try pattern instead of exceptions.',
      skeleton: `// Write bool TryParsePositiveInt(string input, out int result)
// Returns true if input is a valid positive integer, false otherwise`,
      solution: `bool TryParsePositiveInt(string input, out int result)
{
    result = 0;
    if (!int.TryParse(input, out result))
        return false;
    if (result <= 0)
    {
        result = 0;
        return false;
    }
    return true;
}`,
      hints: ['Use int.TryParse to avoid FormatException.', 'Return false for non-positive values.', 'Always initialize the out parameter.'],
      concepts: ['TryParse pattern', 'avoiding exceptions', 'out parameter'],
    },
    {
      id: 'cs-exc-9',
      title: 'Exception-Safe Resource Handling',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method that safely handles a disposable resource with exception handling.',
      skeleton: `// Write string SafeReadFile(string path)
// Returns file contents or "ERROR: {message}" on any exception
// Ensure the stream is always disposed`,
      solution: `string SafeReadFile(string path)
{
    try
    {
        using var reader = new StreamReader(path);
        return reader.ReadToEnd();
    }
    catch (Exception ex)
    {
        return $"ERROR: {ex.Message}";
    }
}`,
      hints: ['using ensures disposal even if an exception occurs.', 'Catch Exception and return a formatted error message.', 'using with declaration form (no braces) disposes at end of scope.'],
      concepts: ['using statement', 'IDisposable', 'exception safety'],
    },
    {
      id: 'cs-exc-10',
      title: 'Aggregate Exception Handling',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method that runs multiple actions and collects all exceptions.',
      skeleton: `// Write void RunAll(Action[] actions)
// Run every action; collect exceptions; throw AggregateException if any failed`,
      solution: `void RunAll(Action[] actions)
{
    var exceptions = new List<Exception>();
    foreach (var action in actions)
    {
        try
        {
            action();
        }
        catch (Exception ex)
        {
            exceptions.Add(ex);
        }
    }
    if (exceptions.Count > 0)
        throw new AggregateException(exceptions);
}`,
      hints: ['Catch exceptions individually and collect them.', 'AggregateException wraps multiple exceptions.', 'Continue executing remaining actions after each failure.'],
      concepts: ['AggregateException', 'exception collection', 'fault tolerance'],
    },
    {
      id: 'cs-exc-11',
      title: 'Retry with Exponential Backoff',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a retry method with exponential backoff for transient exceptions.',
      skeleton: `// Write async Task<T> RetryAsync<T>(Func<Task<T>> operation, int maxRetries)
// Delay doubles each attempt: 100ms, 200ms, 400ms...`,
      solution: `async Task<T> RetryAsync<T>(Func<Task<T>> operation, int maxRetries)
{
    int delay = 100;
    for (int attempt = 0; attempt <= maxRetries; attempt++)
    {
        try
        {
            return await operation();
        }
        catch when (attempt < maxRetries)
        {
            await Task.Delay(delay);
            delay *= 2;
        }
    }
    return await operation(); // unreachable, but satisfies compiler
}`,
      hints: ['Double the delay on each retry.', 'Use catch-when to only retry on non-final attempts.', 'The last attempt lets the exception propagate.'],
      concepts: ['retry pattern', 'exponential backoff', 'exception filter'],
    },
    {
      id: 'cs-exc-12',
      title: 'ExceptionDispatchInfo',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Capture and rethrow an exception preserving the original stack trace using ExceptionDispatchInfo.',
      skeleton: `// Write void CaptureAndRethrow(Action action)
// Capture any exception, do some processing, then rethrow with original stack`,
      solution: `void CaptureAndRethrow(Action action)
{
    ExceptionDispatchInfo? edi = null;
    try
    {
        action();
    }
    catch (Exception ex)
    {
        edi = ExceptionDispatchInfo.Capture(ex);
    }

    // Do some processing...

    edi?.Throw();  // rethrows with original stack trace
}`,
      hints: ['ExceptionDispatchInfo.Capture preserves the stack trace.', 'Calling Throw() rethrows with the original context.', 'This is useful when you need to rethrow outside the catch block.'],
      concepts: ['ExceptionDispatchInfo', 'stack trace preservation', 'deferred rethrow'],
    },
    {
      id: 'cs-exc-13',
      title: 'Bug: Swallowing Exceptions',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the empty catch block that silently swallows errors.',
      skeleton: `try
{
    SaveToDatabase(data);
}
catch (Exception)
{
    // Bug: exception swallowed silently
}`,
      solution: `try
{
    SaveToDatabase(data);
}
catch (Exception ex)
{
    Logger.Error($"Failed to save: {ex.Message}", ex);
    throw;  // or handle appropriately
}`,
      hints: ['Empty catch blocks hide bugs.', 'At minimum, log the exception.', 'Consider rethrowing if you cannot handle it.'],
      concepts: ['exception swallowing', 'logging', 'proper error handling'],
    },
    {
      id: 'cs-exc-14',
      title: 'Bug: Throw ex vs Throw',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the rethrow that loses the original stack trace.',
      skeleton: `try
{
    ProcessData();
}
catch (Exception ex)
{
    Log(ex);
    throw ex;  // Bug: resets the stack trace!
}`,
      solution: `try
{
    ProcessData();
}
catch (Exception ex)
{
    Log(ex);
    throw;  // preserves the original stack trace
}`,
      hints: ['throw ex creates a new stack trace from this point.', 'throw (without ex) preserves the original stack trace.', 'Always use bare throw when rethrowing.'],
      concepts: ['throw vs throw ex', 'stack trace', 'rethrow'],
    },
    {
      id: 'cs-exc-15',
      title: 'Bug: Catching Too Broad',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix overly broad exception catching that masks real errors.',
      skeleton: `try
{
    var config = LoadConfig();
    ValidateConfig(config);
    StartService(config);
}
catch (Exception)
{
    Console.WriteLine("Config file not found");
    // Bug: catches ALL exceptions including NullRef, StackOverflow, etc.
}`,
      solution: `try
{
    var config = LoadConfig();
    ValidateConfig(config);
    StartService(config);
}
catch (FileNotFoundException)
{
    Console.WriteLine("Config file not found");
}
catch (InvalidDataException ex)
{
    Console.WriteLine($"Invalid config: {ex.Message}");
}`,
      hints: ['Catch specific exceptions you can handle.', 'Let unexpected exceptions propagate.', 'Catching Exception hides programming errors.'],
      concepts: ['specific catch', 'exception hierarchy', 'error masking'],
    },
    {
      id: 'cs-exc-16',
      title: 'Predict Exception Flow',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output of try/catch/finally.',
      skeleton: `try
{
    Console.Write("A");
    throw new Exception();
}
catch
{
    Console.Write("B");
}
finally
{
    Console.Write("C");
}
Console.Write("D");`,
      solution: `ABCD`,
      hints: ['A prints, then exception is thrown.', 'B prints in the catch block.', 'C prints in finally, then D prints after.'],
      concepts: ['exception flow', 'try-catch-finally order'],
    },
    {
      id: 'cs-exc-17',
      title: 'Predict Exception Filter',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict which catch block handles the exception.',
      skeleton: `try
{
    throw new ArgumentException("bad");
}
catch (ArgumentException) when (false)
{
    Console.Write("A");
}
catch (ArgumentException)
{
    Console.Write("B");
}
catch (Exception)
{
    Console.Write("C");
}`,
      solution: `B`,
      hints: ['The first catch matches the type but the filter is false.', 'The second catch matches ArgumentException without a filter.', 'Exception filters are evaluated before selecting a handler.'],
      concepts: ['exception filter evaluation', 'catch ordering'],
    },
    {
      id: 'cs-exc-18',
      title: 'Predict Finally Execution',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict whether finally runs when returning from try.',
      skeleton: `int GetValue()
{
    try
    {
        Console.Write("A");
        return 42;
    }
    finally
    {
        Console.Write("B");
    }
}
Console.Write(GetValue());`,
      solution: `AB42`,
      hints: ['finally runs even when the try block has a return.', 'A prints, then finally runs (B), then the method returns 42.', 'The caller prints the returned value.'],
      concepts: ['finally with return', 'execution order'],
    },
    {
      id: 'cs-exc-19',
      title: 'Refactor Exception to Result Type',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Replace exception-based error handling with a Result type.',
      skeleton: `int Divide(int a, int b)
{
    if (b == 0)
        throw new DivideByZeroException();
    return a / b;
}

try
{
    var result = Divide(10, 0);
    Console.WriteLine(result);
}
catch (DivideByZeroException)
{
    Console.WriteLine("Cannot divide by zero");
}`,
      solution: `(bool Success, int Value, string? Error) Divide(int a, int b)
{
    if (b == 0)
        return (false, 0, "Cannot divide by zero");
    return (true, a / b, null);
}

var result = Divide(10, 0);
if (result.Success)
    Console.WriteLine(result.Value);
else
    Console.WriteLine(result.Error);`,
      hints: ['Return a tuple or Result type instead of throwing.', 'Include success flag, value, and error message.', 'Callers check Success instead of using try/catch.'],
      concepts: ['Result pattern', 'avoiding exceptions', 'error as value'],
    },
    {
      id: 'cs-exc-20',
      title: 'Refactor Nested Try-Catch',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Flatten deeply nested try-catch blocks.',
      skeleton: `void Process()
{
    try
    {
        var data = ReadFile();
        try
        {
            var parsed = Parse(data);
            try
            {
                Save(parsed);
            }
            catch (IOException ex) { Log(ex); }
        }
        catch (FormatException ex) { Log(ex); }
    }
    catch (FileNotFoundException ex) { Log(ex); }
}`,
      solution: `void Process()
{
    try
    {
        var data = ReadFile();
        var parsed = Parse(data);
        Save(parsed);
    }
    catch (FileNotFoundException ex) { Log(ex); }
    catch (FormatException ex) { Log(ex); }
    catch (IOException ex) { Log(ex); }
}`,
      hints: ['Multiple catch blocks can follow a single try.', 'Order from most specific to least specific.', 'No need to nest try blocks for different exception types.'],
      concepts: ['flattening try-catch', 'multiple catch blocks', 'readability'],
    },
  ],
};
