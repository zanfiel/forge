import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-abstract',
  title: '13. Abstract Classes',
  explanation: `## Abstract Classes

Abstract classes cannot be instantiated directly. They serve as base classes that define shared behavior and require derived classes to implement specific methods.

\`\`\`csharp
abstract class Shape
{
    public string Color { get; set; }

    // Abstract method -- no body, must be overridden
    public abstract double Area();

    // Abstract property
    public abstract string Name { get; }

    // Concrete method -- shared behavior
    public string Describe() => $"{Color} {Name}: area={Area():F2}";
}

class Circle : Shape
{
    public double Radius { get; }
    public Circle(double r) { Radius = r; }
    public override double Area() => Math.PI * Radius * Radius;
    public override string Name => "Circle";
}
\`\`\`

**Abstract vs Interface**: Abstract classes can have state (fields), constructors, and concrete methods. Interfaces define only contracts (though C# 8+ allows defaults). Use abstract classes when sharing implementation; use interfaces when defining a capability.`,
  exercises: [
    {
      id: 'cs-abstract-1',
      title: 'Abstract Class Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare an abstract class.',
      skeleton: `__BLANK__ class Vehicle
{
    public abstract void Start();
}`,
      solution: `abstract class Vehicle
{
    public abstract void Start();
}`,
      hints: ['The abstract keyword prevents direct instantiation.', 'Abstract classes can contain abstract (bodyless) members.', 'The answer is: abstract'],
      concepts: ['abstract class', 'cannot instantiate'],
    },
    {
      id: 'cs-abstract-2',
      title: 'Abstract Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare an abstract method that derived classes must implement.',
      skeleton: `abstract class Animal
{
    public __BLANK__ string Sound();
}`,
      solution: `abstract class Animal
{
    public abstract string Sound();
}`,
      hints: ['Abstract methods have no body -- just a semicolon.', 'They force derived classes to provide an implementation.', 'The answer is: abstract'],
      concepts: ['abstract method', 'forced override'],
    },
    {
      id: 'cs-abstract-3',
      title: 'Abstract Property',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Declare an abstract property.',
      skeleton: `abstract class Shape
{
    public __BLANK__ string Name { get; }
}`,
      solution: `abstract class Shape
{
    public abstract string Name { get; }
}`,
      hints: ['Abstract properties define the accessor pattern but no implementation.', 'Derived classes must override with a concrete getter.', 'The answer is: abstract'],
      concepts: ['abstract property', 'property contract'],
    },
    {
      id: 'cs-abstract-4',
      title: 'Override Abstract Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Override the abstract method in the derived class.',
      skeleton: `abstract class Weapon { public abstract int Damage(); }
class Sword : Weapon
{
    public __BLANK__ int Damage() => 25;
}`,
      solution: `abstract class Weapon { public abstract int Damage(); }
class Sword : Weapon
{
    public override int Damage() => 25;
}`,
      hints: ['Use override to implement an abstract method.', 'The signature must match exactly.', 'The answer is: override'],
      concepts: ['override', 'abstract implementation'],
    },
    {
      id: 'cs-abstract-5',
      title: 'Concrete Method in Abstract Class',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Add a concrete (non-abstract) method to an abstract class.',
      skeleton: `abstract class Formatter
{
    public abstract string Format(string data);
    public string FormatAll(string[] items)
    {
        return string.Join(", ", items.Select(i => __BLANK__));
    }
}`,
      solution: `abstract class Formatter
{
    public abstract string Format(string data);
    public string FormatAll(string[] items)
    {
        return string.Join(", ", items.Select(i => Format(i)));
    }
}`,
      hints: ['Concrete methods in abstract classes can call abstract methods.', 'The abstract method is resolved at runtime via polymorphism.', 'The answer is: Format(i)'],
      concepts: ['concrete method', 'template method', 'abstract call'],
    },
    {
      id: 'cs-abstract-6',
      title: 'Abstract vs Interface Choice',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Choose abstract class because this type needs a constructor and shared state.',
      skeleton: `__BLANK__ class DbConnection
{
    protected string _connectionString;

    public DbConnection(string connStr)
    {
        _connectionString = connStr;
    }

    public abstract void Open();
    public abstract void Close();
    public bool IsOpen { get; protected set; }
}`,
      solution: `abstract class DbConnection
{
    protected string _connectionString;

    public DbConnection(string connStr)
    {
        _connectionString = connStr;
    }

    public abstract void Open();
    public abstract void Close();
    public bool IsOpen { get; protected set; }
}`,
      hints: ['This type has a constructor and state (fields/properties).', 'Interfaces cannot have constructors or instance fields.', 'The answer is: abstract'],
      concepts: ['abstract vs interface', 'constructor', 'shared state'],
    },
    {
      id: 'cs-abstract-7',
      title: 'Animal Hierarchy',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write an abstract Animal class with Name property and abstract Sound(). Implement Dog and Cat.',
      skeleton: ``,
      solution: `abstract class Animal
{
    public string Name { get; }
    protected Animal(string name) { Name = name; }
    public abstract string Sound();
    public string Describe() => $"{Name} says {Sound()}";
}

class Dog : Animal
{
    public Dog(string name) : base(name) { }
    public override string Sound() => "Woof";
}

class Cat : Animal
{
    public Cat(string name) : base(name) { }
    public override string Sound() => "Meow";
}`,
      hints: ['The abstract class provides shared Name and Describe.', 'Each animal overrides Sound with its specific noise.', 'Use protected constructor since abstract classes cannot be instantiated directly.'],
      concepts: ['abstract class', 'override', 'shared behavior'],
    },
    {
      id: 'cs-abstract-8',
      title: 'Template Method Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write an abstract GameCharacter with a concrete Attack() that calls abstract CalculateDamage() and abstract GetWeaponName().',
      skeleton: ``,
      solution: `abstract class GameCharacter
{
    public string Name { get; }
    protected GameCharacter(string name) { Name = name; }

    public string Attack()
    {
        int damage = CalculateDamage();
        return $"{Name} attacks with {GetWeaponName()} for {damage} damage!";
    }

    protected abstract int CalculateDamage();
    protected abstract string GetWeaponName();
}

class Warrior : GameCharacter
{
    public Warrior(string name) : base(name) { }
    protected override int CalculateDamage() => 30;
    protected override string GetWeaponName() => "Sword";
}

class Mage : GameCharacter
{
    public Mage(string name) : base(name) { }
    protected override int CalculateDamage() => 45;
    protected override string GetWeaponName() => "Staff";
}`,
      hints: ['Template method defines the skeleton; subclasses fill in details.', 'Attack() is concrete and calls abstract CalculateDamage and GetWeaponName.', 'Protected abstract methods are the extension points.'],
      concepts: ['template method', 'abstract methods', 'extension points'],
    },
    {
      id: 'cs-abstract-9',
      title: 'Serializer Framework',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write an abstract Serializer<T> with abstract Serialize(T) and Deserialize(string). Add a concrete RoundTrip(T) that serializes then deserializes.',
      skeleton: ``,
      solution: `abstract class Serializer<T>
{
    public abstract string Serialize(T obj);
    public abstract T Deserialize(string data);

    public T RoundTrip(T obj)
    {
        string serialized = Serialize(obj);
        return Deserialize(serialized);
    }
}

class IntSerializer : Serializer<int>
{
    public override string Serialize(int obj) => obj.ToString();
    public override int Deserialize(string data) => int.Parse(data);
}`,
      hints: ['The generic abstract class defines the contract for any type T.', 'RoundTrip demonstrates calling abstract methods from concrete code.', 'IntSerializer provides the concrete serialization logic for int.'],
      concepts: ['generic abstract class', 'template method', 'serialization'],
    },
    {
      id: 'cs-abstract-10',
      title: 'Validation Framework',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write abstract Validator<T> with abstract Validate(T) returning List<string> errors. Add IsValid(T) that returns true if no errors.',
      skeleton: ``,
      solution: `abstract class Validator<T>
{
    public abstract List<string> Validate(T item);

    public bool IsValid(T item) => Validate(item).Count == 0;

    public void ValidateAndThrow(T item)
    {
        var errors = Validate(item);
        if (errors.Count > 0)
            throw new InvalidOperationException(string.Join("; ", errors));
    }
}

class AgeValidator : Validator<int>
{
    public override List<string> Validate(int age)
    {
        var errors = new List<string>();
        if (age < 0) errors.Add("Age cannot be negative");
        if (age > 150) errors.Add("Age seems unrealistic");
        return errors;
    }
}`,
      hints: ['The abstract class provides shared validation logic.', 'IsValid and ValidateAndThrow are concrete methods using abstract Validate.', 'Derived classes implement the specific validation rules.'],
      concepts: ['abstract class', 'validation', 'generic', 'shared logic'],
    },
    {
      id: 'cs-abstract-11',
      title: 'Abstract Event Source',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write abstract EventSource with abstract GetEvents() and concrete Replay(Action<string> handler) that calls handler for each event.',
      skeleton: ``,
      solution: `abstract class EventSource
{
    public abstract IEnumerable<string> GetEvents();

    public void Replay(Action<string> handler)
    {
        foreach (var evt in GetEvents())
        {
            handler(evt);
        }
    }

    public int EventCount => GetEvents().Count();
}

class MemoryEventSource : EventSource
{
    private readonly List<string> _events = new();

    public void Add(string evt) => _events.Add(evt);

    public override IEnumerable<string> GetEvents() => _events;
}`,
      hints: ['GetEvents is abstract -- each source provides events differently.', 'Replay is a concrete method iterating the abstract source.', 'This separates event storage from event processing.'],
      concepts: ['abstract', 'event sourcing', 'IEnumerable', 'separation of concerns'],
    },
    {
      id: 'cs-abstract-12',
      title: 'Pipeline Stage',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write abstract PipelineStage<TIn, TOut> with abstract Process(TIn). Write a Pipeline class that chains stages.',
      skeleton: ``,
      solution: `abstract class PipelineStage<TIn, TOut>
{
    public abstract TOut Process(TIn input);
}

class ToUpper : PipelineStage<string, string>
{
    public override string Process(string input) => input.ToUpper();
}

class GetLength : PipelineStage<string, int>
{
    public override int Process(string input) => input.Length;
}

class Pipeline
{
    public static TOut Run<TIn, TMid, TOut>(
        TIn input,
        PipelineStage<TIn, TMid> stage1,
        PipelineStage<TMid, TOut> stage2)
    {
        var mid = stage1.Process(input);
        return stage2.Process(mid);
    }
}`,
      hints: ['Each stage transforms input to output with different types.', 'The Pipeline chains stages together by matching output to input types.', 'This is a type-safe processing pipeline.'],
      concepts: ['pipeline pattern', 'generic abstract', 'type chaining'],
    },
    {
      id: 'cs-abstract-13',
      title: 'Cannot Instantiate Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the code that tries to instantiate an abstract class.',
      skeleton: `abstract class Shape
{
    public abstract double Area();
}

var s = new Shape(); // error: cannot create instance of abstract class`,
      solution: `abstract class Shape
{
    public abstract double Area();
}

class Square : Shape
{
    public double Side { get; }
    public Square(double side) { Side = side; }
    public override double Area() => Side * Side;
}

var s = new Square(5);`,
      hints: ['Abstract classes cannot be instantiated directly.', 'Create a concrete derived class instead.', 'Implement all abstract members in the derived class.'],
      concepts: ['abstract instantiation', 'concrete class required'],
    },
    {
      id: 'cs-abstract-14',
      title: 'Missing Override Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the compile error. The derived class must implement all abstract members.',
      skeleton: `abstract class Notifier
{
    public abstract void Send(string message);
    public abstract string Channel { get; }
}

class EmailNotifier : Notifier
{
    public override void Send(string message)
    {
        Console.WriteLine($"Email: {message}");
    }
    // error: does not implement Channel
}`,
      solution: `abstract class Notifier
{
    public abstract void Send(string message);
    public abstract string Channel { get; }
}

class EmailNotifier : Notifier
{
    public override void Send(string message)
    {
        Console.WriteLine($"Email: {message}");
    }
    public override string Channel => "Email";
}`,
      hints: ['All abstract members must be overridden.', 'Channel is an abstract property that needs implementation.', 'Add: public override string Channel => "Email";'],
      concepts: ['missing implementation', 'abstract property', 'override required'],
    },
    {
      id: 'cs-abstract-15',
      title: 'Abstract in Non-Abstract Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the error: abstract members can only exist in abstract classes.',
      skeleton: `class Service
{
    public abstract void Execute(); // error: class is not abstract
}`,
      solution: `abstract class Service
{
    public abstract void Execute();
}`,
      hints: ['Abstract members require the class to also be abstract.', 'Add the abstract keyword to the class declaration.', 'Alternatively, make the method virtual with a default body.'],
      concepts: ['abstract member', 'abstract class requirement'],
    },
    {
      id: 'cs-abstract-16',
      title: 'Predict Abstract Polymorphism',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `abstract class Greeter { public abstract string Greet(); }
class English : Greeter { public override string Greet() => "Hello"; }
class Spanish : Greeter { public override string Greet() => "Hola"; }

Greeter[] g = { new English(), new Spanish(), new English() };
foreach (var x in g) Console.Write(x.Greet() + " ");`,
      solution: `Hello Hola Hello `,
      hints: ['Polymorphism calls the correct override at runtime.', 'The array holds abstract references but concrete objects.', 'Output: Hello Hola Hello.'],
      concepts: ['polymorphism', 'abstract reference', 'runtime dispatch'],
    },
    {
      id: 'cs-abstract-17',
      title: 'Predict Template Method',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `abstract class Processor
{
    public string Run(string input)
    {
        var cleaned = Clean(input);
        return Transform(cleaned);
    }
    protected virtual string Clean(string s) => s.Trim();
    protected abstract string Transform(string s);
}

class Upper : Processor
{
    protected override string Transform(string s) => s.ToUpper();
}

Console.WriteLine(new Upper().Run("  hi  "));`,
      solution: `HI`,
      hints: ['Run calls Clean (trims spaces) then Transform (uppercases).', '"  hi  " -> "hi" -> "HI".', 'Clean is virtual with a default; Transform is abstract.'],
      concepts: ['template method', 'virtual default', 'abstract override'],
    },
    {
      id: 'cs-abstract-18',
      title: 'Predict Abstract Property',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `abstract class Unit
{
    public abstract int Health { get; }
    public bool IsAlive => Health > 0;
}

class Soldier : Unit { public override int Health => 100; }
class Ghost : Unit { public override int Health => 0; }

Console.WriteLine(new Soldier().IsAlive);
Console.WriteLine(new Ghost().IsAlive);`,
      solution: `True
False`,
      hints: ['IsAlive depends on the abstract Health property.', 'Soldier.Health is 100, so IsAlive is True.', 'Ghost.Health is 0, so IsAlive is False.'],
      concepts: ['abstract property', 'computed from abstract', 'polymorphism'],
    },
    {
      id: 'cs-abstract-19',
      title: 'Refactor to Abstract',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor the repeated code into an abstract base class.',
      skeleton: `class JsonExporter
{
    public string Export(object data)
    {
        Console.WriteLine("Starting export...");
        string result = System.Text.Json.JsonSerializer.Serialize(data);
        Console.WriteLine("Export complete.");
        return result;
    }
}

class CsvExporter
{
    public string Export(object data)
    {
        Console.WriteLine("Starting export...");
        string result = data.ToString() ?? "";
        Console.WriteLine("Export complete.");
        return result;
    }
}`,
      solution: `abstract class Exporter
{
    public string Export(object data)
    {
        Console.WriteLine("Starting export...");
        string result = DoExport(data);
        Console.WriteLine("Export complete.");
        return result;
    }
    protected abstract string DoExport(object data);
}

class JsonExporter : Exporter
{
    protected override string DoExport(object data)
        => System.Text.Json.JsonSerializer.Serialize(data);
}

class CsvExporter : Exporter
{
    protected override string DoExport(object data)
        => data.ToString() ?? "";
}`,
      hints: ['The logging before/after export is duplicated.', 'Extract it into an abstract base with a template method.', 'Each exporter only implements the actual export logic.'],
      concepts: ['refactoring', 'DRY', 'template method', 'abstract base'],
    },
    {
      id: 'cs-abstract-20',
      title: 'Rule Engine',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write abstract Rule<T> with abstract bool IsValid(T) and abstract string ErrorMessage. Write a RuleEngine<T> that evaluates all rules and returns errors.',
      skeleton: ``,
      solution: `abstract class Rule<T>
{
    public abstract bool IsValid(T item);
    public abstract string ErrorMessage { get; }
}

class NotEmpty : Rule<string>
{
    public override bool IsValid(string item) => !string.IsNullOrEmpty(item);
    public override string ErrorMessage => "String must not be empty";
}

class MinLength : Rule<string>
{
    private readonly int _min;
    public MinLength(int min) { _min = min; }
    public override bool IsValid(string item) => item.Length >= _min;
    public override string ErrorMessage => $"String must be at least {_min} characters";
}

class RuleEngine<T>
{
    private readonly List<Rule<T>> _rules = new();

    public void AddRule(Rule<T> rule) => _rules.Add(rule);

    public List<string> Validate(T item)
    {
        var errors = new List<string>();
        foreach (var rule in _rules)
        {
            if (!rule.IsValid(item))
                errors.Add(rule.ErrorMessage);
        }
        return errors;
    }
}`,
      hints: ['Each Rule<T> defines a single validation check.', 'RuleEngine collects rules and runs them all, gathering errors.', 'This is the specification pattern using abstract classes.'],
      concepts: ['rule engine', 'specification pattern', 'abstract class', 'composition'],
    },
  ],
};
