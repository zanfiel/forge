import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-source-generators',
  title: '41. Source Generators',
  explanation: `## Source Generators

Source generators are compiler plugins that generate C# source code during compilation. They enable metaprogramming without runtime reflection.

\`\`\`csharp
// Generator interface
[Generator]
public class MyGenerator : IIncrementalGenerator
{
    public void Initialize(IncrementalGeneratorInitializationContext context)
    {
        // Register syntax providers and output sources
    }
}
\`\`\`

### How They Work

1. The compiler invokes your generator during compilation
2. You inspect the syntax tree / semantic model
3. You emit new source files that become part of the compilation
4. The generated code is available to the rest of the project

### Common Uses

- JSON serialization (\`JsonSerializerContext\`)
- Regex compilation (\`GeneratedRegex\`)
- Logging (\`LoggerMessage\`)
- DI registration
- Mapping (e.g., Mapperly)
- Equality generation

\`\`\`csharp
// Example: Generated Regex (.NET 7+)
[GeneratedRegex(@"^\\d{3}-\\d{4}$")]
private static partial Regex PhonePattern();
\`\`\`

Source generators run at compile time, producing zero-overhead code that is fully AOT-compatible.`,
  exercises: [
    {
      id: 'cs-srcgen-1',
      title: 'GeneratedRegex',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Use a source-generated regex pattern.',
      skeleton: `[__BLANK__(@"^\\d+$")]
private static partial Regex NumberPattern();`,
      solution: `[GeneratedRegex(@"^\\d+$")]
private static partial Regex NumberPattern();`,
      hints: ['This .NET 7 attribute compiles regex at build time.', 'The method must be static partial.', 'The answer is: GeneratedRegex'],
      concepts: ['GeneratedRegex', 'compiled regex', '.NET 7'],
    },
    {
      id: 'cs-srcgen-2',
      title: 'JsonSerializable Context',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Declare a source-generated JSON serialization context.',
      skeleton: `[__BLANK__(typeof(Person))]
partial class AppJsonContext : JsonSerializerContext { }`,
      solution: `[JsonSerializable(typeof(Person))]
partial class AppJsonContext : JsonSerializerContext { }`,
      hints: ['This attribute tells the source generator which types to serialize.', 'The class extends JsonSerializerContext.', 'The answer is: JsonSerializable'],
      concepts: ['JsonSerializable', 'JsonSerializerContext', 'AOT serialization'],
    },
    {
      id: 'cs-srcgen-3',
      title: 'LoggerMessage',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use source-generated high-performance logging.',
      skeleton: `[__BLANK__(EventId = 1, Level = LogLevel.Information, Message = "Processing {ItemId}")]
static partial void LogProcessing(ILogger logger, int itemId);`,
      solution: `[LoggerMessage(EventId = 1, Level = LogLevel.Information, Message = "Processing {ItemId}")]
static partial void LogProcessing(ILogger logger, int itemId);`,
      hints: ['This attribute generates optimized logging code.', 'Avoids boxing and string allocations.', 'The answer is: LoggerMessage'],
      concepts: ['LoggerMessage', 'high-performance logging', 'source-generated'],
    },
    {
      id: 'cs-srcgen-4',
      title: 'Partial Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a partial method that a source generator will implement.',
      skeleton: `__BLANK__ class MyService
{
    __BLANK__ void Initialize();
}`,
      solution: `partial class MyService
{
    partial void Initialize();
}`,
      hints: ['Source generators implement partial methods.', 'The class and method must both be partial.', 'The answer is: partial'],
      concepts: ['partial', 'partial methods', 'generator contract'],
    },
    {
      id: 'cs-srcgen-5',
      title: 'Generator Attribute',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Mark a class as a source generator.',
      skeleton: `[__BLANK__]
public class MyGenerator : IIncrementalGenerator
{
    public void Initialize(IncrementalGeneratorInitializationContext context) { }
}`,
      solution: `[Generator]
public class MyGenerator : IIncrementalGenerator
{
    public void Initialize(IncrementalGeneratorInitializationContext context) { }
}`,
      hints: ['This attribute registers the class as a compiler plugin.', 'It is in Microsoft.CodeAnalysis.', 'The answer is: Generator'],
      concepts: ['Generator attribute', 'IIncrementalGenerator'],
    },
    {
      id: 'cs-srcgen-6',
      title: 'Register Source Output',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Register a source output in an incremental generator.',
      skeleton: `context.__BLANK__(source, (ctx, _) =>
{
    ctx.AddSource("Generated.g.cs", "// generated code");
});`,
      solution: `context.RegisterSourceOutput(source, (ctx, _) =>
{
    ctx.AddSource("Generated.g.cs", "// generated code");
});`,
      hints: ['This method connects a pipeline to source output.', 'It takes an IncrementalValueProvider and a callback.', 'The answer is: RegisterSourceOutput'],
      concepts: ['RegisterSourceOutput', 'AddSource', 'incremental pipeline'],
    },
    {
      id: 'cs-srcgen-7',
      title: 'Marker Attribute for Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create a marker attribute that a source generator would look for.',
      skeleton: `// Create an [AutoToString] attribute that targets classes
// A source generator would find classes with this attribute
// and generate ToString() overrides`,
      solution: `[AttributeUsage(AttributeTargets.Class, Inherited = false)]
public sealed class AutoToStringAttribute : Attribute { }

// Usage:
[AutoToString]
public partial class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}`,
      hints: ['Marker attributes have no members.', 'Make it sealed and target classes only.', 'The class must be partial so the generator can extend it.'],
      concepts: ['marker attribute', 'partial class', 'generator pattern'],
    },
    {
      id: 'cs-srcgen-8',
      title: 'Generate Enum Extensions',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write the output a source generator would produce for enum-to-string.',
      skeleton: `// Given this enum:
// enum Color { Red, Green, Blue }
// Write the static extension class a generator would produce
// with a fast ToStringFast() method using switch`,
      solution: `public static class ColorExtensions
{
    public static string ToStringFast(this Color value)
    {
        return value switch
        {
            Color.Red => nameof(Color.Red),
            Color.Green => nameof(Color.Green),
            Color.Blue => nameof(Color.Blue),
            _ => value.ToString()
        };
    }
}`,
      hints: ['Switch expressions are faster than enum.ToString().', 'Use nameof for compile-time string constants.', 'Fall back to ToString() for undefined values.'],
      concepts: ['generated extensions', 'enum optimization', 'nameof'],
    },
    {
      id: 'cs-srcgen-9',
      title: 'Syntax Provider Filter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a syntax provider predicate that finds classes with a specific attribute.',
      skeleton: `// In Initialize(), create a pipeline that finds all classes with [AutoMap]
void Initialize(IncrementalGeneratorInitializationContext context)
{
    // Use ForAttributeWithMetadataName to find decorated classes
}`,
      solution: `void Initialize(IncrementalGeneratorInitializationContext context)
{
    var pipeline = context.SyntaxProvider
        .ForAttributeWithMetadataName(
            "MyLib.AutoMapAttribute",
            predicate: (node, _) => node is ClassDeclarationSyntax,
            transform: (ctx, _) => ctx.TargetSymbol as INamedTypeSymbol)
        .Where(s => s is not null);

    context.RegisterSourceOutput(pipeline, (ctx, symbol) =>
    {
        // Generate mapping code for each decorated class
        ctx.AddSource($"{symbol!.Name}.g.cs", "// generated");
    });
}`,
      hints: ['ForAttributeWithMetadataName is the most efficient filter.', 'Use the full metadata name including namespace.', 'Transform extracts the semantic symbol.'],
      concepts: ['ForAttributeWithMetadataName', 'SyntaxProvider', 'INamedTypeSymbol'],
    },
    {
      id: 'cs-srcgen-10',
      title: 'Generate Interface Implementation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write what a generator would produce for an auto-implemented interface.',
      skeleton: `// Given:
// [AutoImpl]
// partial class UserRepo : IRepository<User> { }
// Where IRepository<T> has: Task<T?> GetById(int id); Task<List<T>> GetAll();
// Generate the implementation that delegates to a DbContext`,
      solution: `partial class UserRepo : IRepository<User>
{
    private readonly DbContext _db;
    public UserRepo(DbContext db) => _db = db;

    public async Task<User?> GetById(int id)
    {
        return await _db.Set<User>().FindAsync(id);
    }

    public async Task<List<User>> GetAll()
    {
        return await _db.Set<User>().ToListAsync();
    }
}`,
      hints: ['Generators emit partial class extensions.', 'Use DbContext.Set<T>() for generic data access.', 'FindAsync and ToListAsync are common EF Core methods.'],
      concepts: ['generated implementation', 'partial class extension', 'DbContext'],
    },
    {
      id: 'cs-srcgen-11',
      title: 'Build Source Text',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Build valid C# source text for a source generator output.',
      skeleton: `string GenerateClass(string namespaceName, string className, string[] properties)
{
    // Generate a class with public string properties and a ToString override
}`,
      solution: `string GenerateClass(string namespaceName, string className, string[] properties)
{
    var sb = new StringBuilder();
    sb.AppendLine($"namespace {namespaceName};");
    sb.AppendLine();
    sb.AppendLine($"partial class {className}");
    sb.AppendLine("{");
    sb.AppendLine($"    public override string ToString()");
    sb.AppendLine("    {");
    sb.Append("        return $\"");
    sb.Append(string.Join(", ", properties.Select(p => $"{p}={{{p}}}")));
    sb.AppendLine("\";");
    sb.AppendLine("    }");
    sb.AppendLine("}");
    return sb.ToString();
}`,
      hints: ['Use StringBuilder for efficient string building.', 'Generate valid C# syntax with proper indentation.', 'Interpolation in the generated code uses {{ and }}.'],
      concepts: ['source text generation', 'StringBuilder', 'code template'],
    },
    {
      id: 'cs-srcgen-12',
      title: 'Incremental Value Provider',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Combine two incremental providers for conditional generation.',
      skeleton: `void Initialize(IncrementalGeneratorInitializationContext context)
{
    // Get the assembly name and combine it with found classes
    // Only generate if the assembly name contains "Api"
}`,
      solution: `void Initialize(IncrementalGeneratorInitializationContext context)
{
    var assemblyName = context.CompilationProvider
        .Select((c, _) => c.AssemblyName);

    var classes = context.SyntaxProvider
        .ForAttributeWithMetadataName(
            "MyLib.AutoRouteAttribute",
            predicate: (n, _) => n is ClassDeclarationSyntax,
            transform: (ctx, _) => ctx.TargetSymbol.Name)
        .Collect();

    var combined = classes.Combine(assemblyName);

    context.RegisterSourceOutput(combined, (ctx, pair) =>
    {
        var (classNames, asmName) = pair;
        if (asmName?.Contains("Api") == true)
        {
            foreach (var name in classNames)
                ctx.AddSource($"{name}.Routes.g.cs", "// generated");
        }
    });
}`,
      hints: ['CompilationProvider gives access to assembly metadata.', 'Combine merges two providers into a tuple.', 'Collect gathers all items into an array.'],
      concepts: ['CompilationProvider', 'Combine', 'Collect', 'conditional generation'],
    },
    {
      id: 'cs-srcgen-13',
      title: 'Missing Partial Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the class that a source generator cannot extend.',
      skeleton: `// Bug: class is not partial, generator cannot add members
[AutoToString]
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}`,
      solution: `[AutoToString]
partial class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}`,
      hints: ['Source generators add code to partial classes.', 'Without partial, the generator creates a conflicting declaration.', 'Add the partial keyword to the class.'],
      concepts: ['partial requirement', 'source generator contract'],
    },
    {
      id: 'cs-srcgen-14',
      title: 'Generator Not Incremental Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix a generator that re-runs on every keystroke.',
      skeleton: `// Bug: using full compilation instead of incremental providers
[Generator]
public class SlowGenerator : IIncrementalGenerator
{
    public void Initialize(IncrementalGeneratorInitializationContext context)
    {
        // Bad: processes entire compilation every time
        context.RegisterSourceOutput(
            context.CompilationProvider,
            (ctx, compilation) =>
            {
                foreach (var tree in compilation.SyntaxTrees)
                {
                    // Process every file...
                }
            });
    }
}`,
      solution: `[Generator]
public class FastGenerator : IIncrementalGenerator
{
    public void Initialize(IncrementalGeneratorInitializationContext context)
    {
        var targets = context.SyntaxProvider
            .CreateSyntaxProvider(
                predicate: (node, _) => node is ClassDeclarationSyntax { AttributeLists.Count: > 0 },
                transform: (ctx, _) => ctx.Node as ClassDeclarationSyntax)
            .Where(c => c is not null);

        context.RegisterSourceOutput(targets, (ctx, classDecl) =>
        {
            // Process only relevant classes
        });
    }
}`,
      hints: ['CompilationProvider triggers on every change.', 'Use SyntaxProvider with predicates to filter incrementally.', 'Only process nodes that match your criteria.'],
      concepts: ['incremental generation', 'SyntaxProvider', 'performance'],
    },
    {
      id: 'cs-srcgen-15',
      title: 'Duplicate Source Name Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix source generator that fails with duplicate hint name.',
      skeleton: `// Bug: all generated files have the same hint name
context.RegisterSourceOutput(pipeline, (ctx, symbol) =>
{
    ctx.AddSource("Generated.g.cs", GenerateCode(symbol));
});`,
      solution: `context.RegisterSourceOutput(pipeline, (ctx, symbol) =>
{
    ctx.AddSource($"{symbol.Name}.g.cs", GenerateCode(symbol));
});`,
      hints: ['Each AddSource call must have a unique hint name.', 'Include the type name in the filename.', 'Duplicate names cause a compilation error.'],
      concepts: ['hint name uniqueness', 'AddSource', 'naming convention'],
    },
    {
      id: 'cs-srcgen-16',
      title: 'Predict GeneratedRegex',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict whether GeneratedRegex matches.',
      skeleton: `[GeneratedRegex(@"^\\d{3}-\\d{2}-\\d{4}$")]
private static partial Regex SsnPattern();

Console.WriteLine(SsnPattern().IsMatch("123-45-6789"));
Console.WriteLine(SsnPattern().IsMatch("12-345-6789"));`,
      solution: `True
False`,
      hints: ['The pattern expects 3 digits, dash, 2 digits, dash, 4 digits.', '123-45-6789 matches the pattern.', '12-345-6789 does not match (wrong grouping).'],
      concepts: ['GeneratedRegex', 'IsMatch', 'regex pattern'],
    },
    {
      id: 'cs-srcgen-17',
      title: 'Predict Source Generator Type',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict which interface modern generators implement.',
      skeleton: `// Which is the correct interface for .NET 6+ incremental generators?
// A) ISourceGenerator
// B) IIncrementalGenerator
// C) ICodeGenerator`,
      solution: `B) IIncrementalGenerator`,
      hints: ['ISourceGenerator is the older V1 API.', 'IIncrementalGenerator is the modern incremental API.', 'ICodeGenerator does not exist in Roslyn.'],
      concepts: ['IIncrementalGenerator', 'incremental API'],
    },
    {
      id: 'cs-srcgen-18',
      title: 'Predict JsonContext Usage',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict if source-generated JSON works at runtime.',
      skeleton: `[JsonSerializable(typeof(Point))]
partial class Ctx : JsonSerializerContext { }

record Point(int X, int Y);

var json = JsonSerializer.Serialize(new Point(1, 2), Ctx.Default.Point);
Console.WriteLine(json);`,
      solution: `{"X":1,"Y":2}`,
      hints: ['The source generator creates serialization code at compile time.', 'Ctx.Default.Point provides the generated type info.', 'The output is standard JSON.'],
      concepts: ['JsonSerializerContext', 'source-generated JSON'],
    },
    {
      id: 'cs-srcgen-19',
      title: 'Refactor Reflection to Generated',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor runtime Regex compilation to source-generated.',
      skeleton: `class Validator
{
    private static readonly Regex _email =
        new Regex(@"^[\\w.-]+@[\\w.-]+\\.\\w+$", RegexOptions.Compiled);

    public bool IsValidEmail(string input) => _email.IsMatch(input);
}`,
      solution: `partial class Validator
{
    [GeneratedRegex(@"^[\\w.-]+@[\\w.-]+\\.\\w+$")]
    private static partial Regex EmailPattern();

    public bool IsValidEmail(string input) => EmailPattern().IsMatch(input);
}`,
      hints: ['GeneratedRegex replaces new Regex with RegexOptions.Compiled.', 'The class must be partial.', 'The method must be static partial returning Regex.'],
      concepts: ['GeneratedRegex', 'regex migration', 'AOT-friendly'],
    },
    {
      id: 'cs-srcgen-20',
      title: 'Refactor to LoggerMessage',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor string-interpolation logging to source-generated LoggerMessage.',
      skeleton: `class OrderProcessor
{
    private readonly ILogger<OrderProcessor> _logger;

    public void Process(int orderId, string status)
    {
        _logger.LogInformation($"Processing order {orderId} with status {status}");
        _logger.LogWarning($"Order {orderId} took too long");
    }
}`,
      solution: `partial class OrderProcessor
{
    private readonly ILogger<OrderProcessor> _logger;

    [LoggerMessage(EventId = 1, Level = LogLevel.Information,
        Message = "Processing order {OrderId} with status {Status}")]
    static partial void LogProcessing(ILogger logger, int orderId, string status);

    [LoggerMessage(EventId = 2, Level = LogLevel.Warning,
        Message = "Order {OrderId} took too long")]
    static partial void LogSlow(ILogger logger, int orderId);

    public void Process(int orderId, string status)
    {
        LogProcessing(_logger, orderId, status);
        LogSlow(_logger, orderId);
    }
}`,
      hints: ['LoggerMessage generates zero-allocation logging methods.', 'Each log call becomes a static partial method.', 'Parameters are captured without boxing or interpolation.'],
      concepts: ['LoggerMessage', 'zero-allocation logging', 'source-generated'],
    },
  ],
};
