import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-design-factory',
  title: '43. Factory Pattern',
  explanation: `## Factory Pattern

The Factory pattern provides an interface for creating objects without specifying their exact classes. C# supports several factory variations.

\`\`\`csharp
// Simple factory method
public static class ShapeFactory
{
    public static IShape Create(string type) => type switch
    {
        "circle" => new Circle(),
        "square" => new Square(),
        _ => throw new ArgumentException($"Unknown shape: {type}")
    };
}
\`\`\`

### Factory Method Pattern

Defines an abstract method in a base class, letting subclasses decide which class to instantiate:

\`\`\`csharp
public abstract class Document
{
    public abstract IPage CreatePage();
}

public class Resume : Document
{
    public override IPage CreatePage() => new ResumePage();
}
\`\`\`

### Abstract Factory

Creates families of related objects without specifying concrete classes:

\`\`\`csharp
public interface IUIFactory
{
    IButton CreateButton();
    ITextBox CreateTextBox();
}
\`\`\`

### Static Factory Methods

Named constructors that improve readability:

\`\`\`csharp
public class Temperature
{
    private Temperature(double value) => Value = value;
    public double Value { get; }

    public static Temperature FromCelsius(double c) => new(c);
    public static Temperature FromFahrenheit(double f) => new((f - 32) * 5.0 / 9.0);
}
\`\`\`

### DI Integration

Factories integrate cleanly with dependency injection via \`Func<T>\` or \`IServiceProvider\`:

\`\`\`csharp
services.AddTransient<IValidator, EmailValidator>();
services.AddSingleton<Func<IValidator>>(sp => () => sp.GetRequiredService<IValidator>());
\`\`\``,
  exercises: [
    {
      id: 'cs-factory-1',
      title: 'Switch Expression Factory',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Complete a simple factory using a switch expression.',
      skeleton: `public static IShape Create(string type) => type __BLANK__
{
    "circle" => new Circle(),
    "square" => new Square(),
    _ => throw new ArgumentException("Unknown")
};`,
      solution: `public static IShape Create(string type) => type switch
{
    "circle" => new Circle(),
    "square" => new Square(),
    _ => throw new ArgumentException("Unknown")
};`,
      hints: ['This keyword turns a value into a pattern-matching expression.', 'It follows the value being matched.', 'The answer is: switch'],
      concepts: ['switch expression', 'factory', 'pattern matching'],
    },
    {
      id: 'cs-factory-2',
      title: 'Abstract Factory Method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Declare an abstract factory method in a base class.',
      skeleton: `public abstract class Creator
{
    public __BLANK__ IProduct CreateProduct();

    public void DoWork()
    {
        var product = CreateProduct();
        product.Use();
    }
}`,
      solution: `public abstract class Creator
{
    public abstract IProduct CreateProduct();

    public void DoWork()
    {
        var product = CreateProduct();
        product.Use();
    }
}`,
      hints: ['The method has no body in the base class.', 'Subclasses must provide the implementation.', 'The answer is: abstract'],
      concepts: ['abstract method', 'factory method pattern', 'polymorphism'],
    },
    {
      id: 'cs-factory-3',
      title: 'Override Factory Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Override the factory method in a derived class.',
      skeleton: `public class ConcreteCreator : Creator
{
    public __BLANK__ IProduct CreateProduct() => new ConcreteProduct();
}`,
      solution: `public class ConcreteCreator : Creator
{
    public override IProduct CreateProduct() => new ConcreteProduct();
}`,
      hints: ['This keyword replaces a base class virtual/abstract method.', 'It must match the signature of the abstract method.', 'The answer is: override'],
      concepts: ['override', 'factory method', 'polymorphism'],
    },
    {
      id: 'cs-factory-4',
      title: 'Static Factory Constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Create a named static factory method.',
      skeleton: `public class Color
{
    public byte R { get; }
    public byte G { get; }
    public byte B { get; }

    private Color(byte r, byte g, byte b) { R = r; G = g; B = b; }

    public __BLANK__ Color FromRgb(byte r, byte g, byte b) => new(r, g, b);
    public static Color Red => new(255, 0, 0);
}`,
      solution: `public class Color
{
    public byte R { get; }
    public byte G { get; }
    public byte B { get; }

    private Color(byte r, byte g, byte b) { R = r; G = g; B = b; }

    public static Color FromRgb(byte r, byte g, byte b) => new(r, g, b);
    public static Color Red => new(255, 0, 0);
}`,
      hints: ['Named constructors are typically static methods.', 'They can be called without an instance.', 'The answer is: static'],
      concepts: ['static factory method', 'named constructor', 'encapsulation'],
    },
    {
      id: 'cs-factory-5',
      title: 'Func<T> Factory Registration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Register a factory delegate in the DI container.',
      skeleton: `services.AddSingleton<__BLANK__<IValidator>>(
    sp => () => sp.GetRequiredService<IValidator>()
);`,
      solution: `services.AddSingleton<Func<IValidator>>(
    sp => () => sp.GetRequiredService<IValidator>()
);`,
      hints: ['This delegate type represents a function that returns a value.', 'It takes no arguments and returns IValidator.', 'The answer is: Func'],
      concepts: ['Func<T>', 'factory delegate', 'dependency injection'],
    },
    {
      id: 'cs-factory-6',
      title: 'GetRequiredService',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Resolve a service from the DI container inside a factory.',
      skeleton: `services.AddTransient<INotifier>(sp =>
{
    var config = sp.__BLANK__<AppConfig>();
    return config.UseEmail
        ? new EmailNotifier()
        : new SmsNotifier();
});`,
      solution: `services.AddTransient<INotifier>(sp =>
{
    var config = sp.GetRequiredService<AppConfig>();
    return config.UseEmail
        ? new EmailNotifier()
        : new SmsNotifier();
});`,
      hints: ['This IServiceProvider method resolves a service or throws.', 'It is generic and takes the service type.', 'The answer is: GetRequiredService'],
      concepts: ['IServiceProvider', 'GetRequiredService', 'factory with DI'],
    },
    {
      id: 'cs-factory-7',
      title: 'Simple Shape Factory',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a static factory class that creates shapes based on a string name.',
      skeleton: `public interface IShape { double Area(); }
public class Circle : IShape { public double Radius { get; init; } public double Area() => Math.PI * Radius * Radius; }
public class Square : IShape { public double Side { get; init; } public double Area() => Side * Side; }

// Write ShapeFactory with:
// static IShape Create(string type, double size)
// "circle" -> Circle with Radius=size
// "square" -> Square with Side=size
// anything else -> throw ArgumentException`,
      solution: `public static class ShapeFactory
{
    public static IShape Create(string type, double size) => type switch
    {
        "circle" => new Circle { Radius = size },
        "square" => new Square { Side = size },
        _ => throw new ArgumentException($"Unknown shape: {type}")
    };
}`,
      hints: ['Use a switch expression on the type string.', 'Use init properties for Circle and Square.', 'Throw ArgumentException for unknown types.'],
      concepts: ['simple factory', 'switch expression', 'init properties'],
    },
    {
      id: 'cs-factory-8',
      title: 'Factory Method Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Implement the Factory Method pattern with an abstract Transport class and concrete Truck/Ship subclasses.',
      skeleton: `// ITransport interface with void Deliver()
// abstract class Logistics with abstract ITransport CreateTransport()
// and a PlanDelivery() method that calls CreateTransport().Deliver()
// RoadLogistics returns Truck
// SeaLogistics returns Ship`,
      solution: `public interface ITransport
{
    void Deliver();
}

public class Truck : ITransport
{
    public void Deliver() => Console.WriteLine("Delivering by road");
}

public class Ship : ITransport
{
    public void Deliver() => Console.WriteLine("Delivering by sea");
}

public abstract class Logistics
{
    public abstract ITransport CreateTransport();

    public void PlanDelivery()
    {
        var transport = CreateTransport();
        transport.Deliver();
    }
}

public class RoadLogistics : Logistics
{
    public override ITransport CreateTransport() => new Truck();
}

public class SeaLogistics : Logistics
{
    public override ITransport CreateTransport() => new Ship();
}`,
      hints: ['The base class defines the abstract factory method.', 'Each subclass overrides it to return a specific transport.', 'PlanDelivery calls the factory method polymorphically.'],
      concepts: ['factory method pattern', 'abstract class', 'polymorphism'],
    },
    {
      id: 'cs-factory-9',
      title: 'Abstract Factory',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Implement an Abstract Factory for creating UI components (Button, Checkbox) for Windows and Mac platforms.',
      skeleton: `// IButton with void Render()
// ICheckbox with void Toggle()
// IUIFactory with IButton CreateButton() and ICheckbox CreateCheckbox()
// WindowsFactory and MacFactory implementations`,
      solution: `public interface IButton { void Render(); }
public interface ICheckbox { void Toggle(); }

public interface IUIFactory
{
    IButton CreateButton();
    ICheckbox CreateCheckbox();
}

public class WindowsButton : IButton
{
    public void Render() => Console.WriteLine("Windows button");
}

public class WindowsCheckbox : ICheckbox
{
    public void Toggle() => Console.WriteLine("Windows checkbox toggled");
}

public class MacButton : IButton
{
    public void Render() => Console.WriteLine("Mac button");
}

public class MacCheckbox : ICheckbox
{
    public void Toggle() => Console.WriteLine("Mac checkbox toggled");
}

public class WindowsFactory : IUIFactory
{
    public IButton CreateButton() => new WindowsButton();
    public ICheckbox CreateCheckbox() => new WindowsCheckbox();
}

public class MacFactory : IUIFactory
{
    public IButton CreateButton() => new MacButton();
    public ICheckbox CreateCheckbox() => new MacCheckbox();
}`,
      hints: ['Define separate interfaces for each product type.', 'The abstract factory interface has a method for each product.', 'Each platform has its own factory and product implementations.'],
      concepts: ['abstract factory', 'product families', 'platform abstraction'],
    },
    {
      id: 'cs-factory-10',
      title: 'Static Factory Methods',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Create a Money class with static factory methods for different currencies.',
      skeleton: `// Create class Money with Amount (decimal) and Currency (string)
// Private constructor
// Static factory methods: FromUsd, FromEur, FromGbp
// Override ToString to show "$10.00", "EUR10.00", "GBP10.00"`,
      solution: `public class Money
{
    public decimal Amount { get; }
    public string Currency { get; }

    private Money(decimal amount, string currency)
    {
        Amount = amount;
        Currency = currency;
    }

    public static Money FromUsd(decimal amount) => new(amount, "USD");
    public static Money FromEur(decimal amount) => new(amount, "EUR");
    public static Money FromGbp(decimal amount) => new(amount, "GBP");

    public override string ToString() => Currency switch
    {
        "USD" => $"\${Amount:F2}",
        _ => $"{Currency}{Amount:F2}"
    };
}`,
      hints: ['Use a private constructor to force use of factory methods.', 'Each factory method passes the appropriate currency string.', 'ToString uses switch for USD special formatting.'],
      concepts: ['static factory method', 'private constructor', 'named constructors'],
    },
    {
      id: 'cs-factory-11',
      title: 'Factory with Dictionary Registry',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create a factory that uses a dictionary to map names to factory functions, supporting runtime registration.',
      skeleton: `// Create class AnimalFactory
// - private Dictionary<string, Func<IAnimal>> _registry
// - void Register(string name, Func<IAnimal> factory)
// - IAnimal Create(string name)
// - throws KeyNotFoundException for unknown names`,
      solution: `public interface IAnimal
{
    string Speak();
}

public class AnimalFactory
{
    private readonly Dictionary<string, Func<IAnimal>> _registry = new();

    public void Register(string name, Func<IAnimal> factory)
    {
        _registry[name] = factory;
    }

    public IAnimal Create(string name)
    {
        if (!_registry.TryGetValue(name, out var factory))
            throw new KeyNotFoundException($"No factory registered for: {name}");
        return factory();
    }
}`,
      hints: ['Store Func<IAnimal> delegates keyed by string.', 'Use TryGetValue for safe lookup.', 'Invoke the delegate with () to create the instance.'],
      concepts: ['factory registry', 'Func<T>', 'Dictionary', 'runtime registration'],
    },
    {
      id: 'cs-factory-12',
      title: 'Generic Factory',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Create a generic factory that can create instances of any type with a parameterless constructor.',
      skeleton: `// Create class Factory<T> where T : new()
// - T Create() method
// - T CreateAndInit(Action<T> initializer) method`,
      solution: `public class Factory<T> where T : new()
{
    public T Create() => new T();

    public T CreateAndInit(Action<T> initializer)
    {
        var instance = new T();
        initializer(instance);
        return instance;
    }
}`,
      hints: ['The new() constraint allows calling new T().', 'Action<T> is a delegate that takes T and returns void.', 'CreateAndInit creates, then applies the initializer.'],
      concepts: ['generic factory', 'new() constraint', 'Action<T>'],
    },
    {
      id: 'cs-factory-13',
      title: 'Missing Interface Return',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the factory that returns a concrete type instead of the interface.',
      skeleton: `public interface ILogger { void Log(string msg); }
public class FileLogger : ILogger { public void Log(string msg) => File.AppendAllText("log.txt", msg); }
public class ConsoleLogger : ILogger { public void Log(string msg) => Console.WriteLine(msg); }

public static class LoggerFactory
{
    // Bug: return type is too specific
    public static FileLogger Create(string type) => type switch
    {
        "file" => new FileLogger(),
        "console" => new ConsoleLogger(),
        _ => throw new ArgumentException("Unknown")
    };
}`,
      solution: `public static class LoggerFactory
{
    public static ILogger Create(string type) => type switch
    {
        "file" => new FileLogger(),
        "console" => new ConsoleLogger(),
        _ => throw new ArgumentException("Unknown")
    };
}`,
      hints: ['The return type should be the interface, not a concrete class.', 'ConsoleLogger cannot be assigned to FileLogger.', 'Change the return type to ILogger.'],
      concepts: ['interface return type', 'factory pattern', 'polymorphism'],
    },
    {
      id: 'cs-factory-14',
      title: 'Missing Default Case',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the factory switch expression that crashes on unknown input.',
      skeleton: `public static class VehicleFactory
{
    public static IVehicle Create(string type) => type switch
    {
        "car" => new Car(),
        "truck" => new Truck()
        // Bug: no default case - throws SwitchExpressionException
    };
}`,
      solution: `public static class VehicleFactory
{
    public static IVehicle Create(string type) => type switch
    {
        "car" => new Car(),
        "truck" => new Truck(),
        _ => throw new ArgumentException($"Unknown vehicle type: {type}")
    };
}`,
      hints: ['Switch expressions must be exhaustive.', 'Add a discard pattern _ for the default case.', 'Throw a descriptive ArgumentException.'],
      concepts: ['exhaustive switch', 'discard pattern', 'error handling'],
    },
    {
      id: 'cs-factory-15',
      title: 'Factory Resolving Wrong Service',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the factory delegate that captures the service provider incorrectly.',
      skeleton: `// Bug: resolves at registration time, not at call time
services.AddTransient<IProcessor, FastProcessor>();

var processor = services.BuildServiceProvider().GetRequiredService<IProcessor>();
services.AddSingleton<Func<IProcessor>>(() => processor);

// Later: replacing registration has no effect
services.AddTransient<IProcessor, SlowProcessor>();`,
      solution: `services.AddTransient<IProcessor, FastProcessor>();

services.AddSingleton<Func<IProcessor>>(sp =>
    () => sp.GetRequiredService<IProcessor>()
);`,
      hints: ['The factory should resolve from the provider at call time, not capture an instance.', 'Pass sp (IServiceProvider) and call GetRequiredService inside the inner lambda.', 'The outer lambda receives sp; the inner lambda calls it on demand.'],
      concepts: ['deferred resolution', 'factory delegate', 'service provider'],
    },
    {
      id: 'cs-factory-16',
      title: 'Predict Factory Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output of a simple factory.',
      skeleton: `public interface IAnimal { string Sound(); }
public class Dog : IAnimal { public string Sound() => "Woof"; }
public class Cat : IAnimal { public string Sound() => "Meow"; }

public static IAnimal Create(string name) => name switch
{
    "dog" => new Dog(),
    "cat" => new Cat(),
    _ => throw new ArgumentException("Unknown")
};

Console.Write(Create("cat").Sound());
Console.Write(" ");
Console.Write(Create("dog").Sound());`,
      solution: `Meow Woof`,
      hints: ['Create("cat") returns a new Cat instance.', 'Cat.Sound() returns "Meow".', 'Create("dog") returns Dog, whose Sound() returns "Woof".'],
      concepts: ['factory output', 'polymorphism', 'interface methods'],
    },
    {
      id: 'cs-factory-17',
      title: 'Predict Abstract Factory',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict which factory method gets called polymorphically.',
      skeleton: `public abstract class Bakery
{
    public abstract string Bake();
}

public class CakeBakery : Bakery
{
    public override string Bake() => "Cake";
}

public class BreadBakery : Bakery
{
    public override string Bake() => "Bread";
}

Bakery b = new CakeBakery();
Console.Write(b.Bake());
b = new BreadBakery();
Console.Write(" " + b.Bake());`,
      solution: `Cake Bread`,
      hints: ['The variable type is Bakery, but runtime type determines Bake().', 'First call: CakeBakery.Bake() returns "Cake".', 'Second call: BreadBakery.Bake() returns "Bread".'],
      concepts: ['polymorphism', 'virtual dispatch', 'factory method'],
    },
    {
      id: 'cs-factory-18',
      title: 'Predict Registry Factory',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output when a factory registry is used with overwritten entries.',
      skeleton: `var registry = new Dictionary<string, Func<string>>
{
    ["greet"] = () => "Hello",
    ["farewell"] = () => "Bye"
};

registry["greet"] = () => "Hi";

Console.Write(registry["greet"]());
Console.Write(" ");
Console.Write(registry["farewell"]());`,
      solution: `Hi Bye`,
      hints: ['The "greet" key is overwritten with a new factory.', 'Invoking registry["greet"]() calls the latest factory.', '"farewell" was never overwritten.'],
      concepts: ['dictionary overwrite', 'factory registry', 'Func<T>'],
    },
    {
      id: 'cs-factory-19',
      title: 'Refactor Conditional to Factory',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor a method with nested if/else into a clean factory pattern.',
      skeleton: `public INotifier GetNotifier(string channel)
{
    if (channel == "email")
    {
        return new EmailNotifier();
    }
    else if (channel == "sms")
    {
        return new SmsNotifier();
    }
    else if (channel == "push")
    {
        return new PushNotifier();
    }
    else
    {
        throw new ArgumentException("Unknown channel");
    }
}`,
      solution: `public INotifier GetNotifier(string channel) => channel switch
{
    "email" => new EmailNotifier(),
    "sms" => new SmsNotifier(),
    "push" => new PushNotifier(),
    _ => throw new ArgumentException($"Unknown channel: {channel}")
};`,
      hints: ['Replace the if/else chain with a switch expression.', 'Each branch maps directly to a case.', 'Use the discard _ for the default case.'],
      concepts: ['refactoring', 'switch expression', 'factory method'],
    },
    {
      id: 'cs-factory-20',
      title: 'Refactor to Abstract Factory',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor concrete class creation scattered through code into an abstract factory.',
      skeleton: `public class ReportGenerator
{
    public void Generate(string format)
    {
        if (format == "pdf")
        {
            var header = new PdfHeader();
            var body = new PdfBody();
            var footer = new PdfFooter();
            header.Render();
            body.Render();
            footer.Render();
        }
        else if (format == "html")
        {
            var header = new HtmlHeader();
            var body = new HtmlBody();
            var footer = new HtmlFooter();
            header.Render();
            body.Render();
            footer.Render();
        }
    }
}`,
      solution: `public interface IReportFactory
{
    IHeader CreateHeader();
    IBody CreateBody();
    IFooter CreateFooter();
}

public class PdfReportFactory : IReportFactory
{
    public IHeader CreateHeader() => new PdfHeader();
    public IBody CreateBody() => new PdfBody();
    public IFooter CreateFooter() => new PdfFooter();
}

public class HtmlReportFactory : IReportFactory
{
    public IHeader CreateHeader() => new HtmlHeader();
    public IBody CreateBody() => new HtmlBody();
    public IFooter CreateFooter() => new HtmlFooter();
}

public class ReportGenerator
{
    private readonly IReportFactory _factory;

    public ReportGenerator(IReportFactory factory) => _factory = factory;

    public void Generate()
    {
        _factory.CreateHeader().Render();
        _factory.CreateBody().Render();
        _factory.CreateFooter().Render();
    }
}`,
      hints: ['Extract an interface with factory methods for each report part.', 'Create concrete factories for PDF and HTML.', 'Inject the factory into ReportGenerator via constructor.'],
      concepts: ['abstract factory', 'dependency injection', 'open-closed principle'],
    },
  ],
};
