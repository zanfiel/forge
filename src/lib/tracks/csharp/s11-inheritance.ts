import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-inherit',
  title: '11. Inheritance',
  explanation: `## Inheritance

Inheritance allows a class to reuse, extend, and modify behavior defined in a base class.

\`\`\`csharp
class Animal
{
    public string Name { get; }
    public Animal(string name) { Name = name; }
    public virtual string Speak() => "...";
}

class Dog : Animal
{
    public Dog(string name) : base(name) { }
    public override string Speak() => "Woof!";
}

// sealed prevents further inheritance
sealed class GoldenRetriever : Dog
{
    public GoldenRetriever(string name) : base(name) { }
}

// new keyword hides a base member (not recommended)
class Cat : Animal
{
    public Cat(string name) : base(name) { }
    public new string Speak() => "Meow!"; // hides, does not override
}

// base keyword calls the parent implementation
class Puppy : Dog
{
    public Puppy(string name) : base(name) { }
    public override string Speak() => base.Speak() + " Yip!";
}
\`\`\`

Use \`virtual\`/\`override\` for polymorphic behavior. Use \`sealed\` to prevent unwanted subclassing.`,
  exercises: [
    {
      id: 'cs-inherit-1',
      title: 'Base Class Inheritance',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Make the Dog class inherit from Animal.',
      skeleton: `class Animal { public string Name { get; set; } }
class Dog __BLANK__
{
    public string Breed { get; set; }
}`,
      solution: `class Animal { public string Name { get; set; } }
class Dog : Animal
{
    public string Breed { get; set; }
}`,
      hints: [
        'C# uses : to denote inheritance.',
        'Place the base class name after the colon.',
        'The answer is: : Animal',
      ],
      concepts: ['inheritance', 'base class', 'derived class'],
    },
    {
      id: 'cs-inherit-2',
      title: 'Virtual Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Mark the method as virtual so derived classes can override it.',
      skeleton: `class Shape
{
    public __BLANK__ double Area() => 0;
}`,
      solution: `class Shape
{
    public virtual double Area() => 0;
}`,
      hints: [
        'The virtual keyword allows a method to be overridden.',
        'Without virtual, derived classes cannot override the method.',
        'The answer is: virtual',
      ],
      concepts: ['virtual', 'polymorphism', 'overridable method'],
    },
    {
      id: 'cs-inherit-3',
      title: 'Override Method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Override the base class Speak method.',
      skeleton: `class Animal { public virtual string Speak() => "..."; }
class Cat : Animal
{
    public __BLANK__ string Speak() => "Meow!";
}`,
      solution: `class Animal { public virtual string Speak() => "..."; }
class Cat : Animal
{
    public override string Speak() => "Meow!";
}`,
      hints: [
        'Use the override keyword to replace a virtual method.',
        'The method signature must match the base class.',
        'The answer is: override',
      ],
      concepts: ['override', 'virtual method', 'polymorphism'],
    },
    {
      id: 'cs-inherit-4',
      title: 'Base Constructor Call',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Call the base class constructor.',
      skeleton: `class Vehicle
{
    public string Make { get; }
    public Vehicle(string make) { Make = make; }
}

class Car : Vehicle
{
    public int Year { get; }
    public Car(string make, int year) __BLANK__
    {
        Year = year;
    }
}`,
      solution: `class Vehicle
{
    public string Make { get; }
    public Vehicle(string make) { Make = make; }
}

class Car : Vehicle
{
    public int Year { get; }
    public Car(string make, int year) : base(make)
    {
        Year = year;
    }
}`,
      hints: [
        'Use : base(...) to call the parent constructor.',
        'Pass the required arguments to the base constructor.',
        'The answer is: : base(make)',
      ],
      concepts: ['base constructor', 'constructor chaining', 'base keyword'],
    },
    {
      id: 'cs-inherit-5',
      title: 'Sealed Class',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Prevent the class from being inherited.',
      skeleton: `__BLANK__ class FinalAnswer
{
    public int Value { get; init; }
}`,
      solution: `sealed class FinalAnswer
{
    public int Value { get; init; }
}`,
      hints: [
        'The sealed keyword prevents inheritance.',
        'Attempting to derive from a sealed class causes a compile error.',
        'The answer is: sealed',
      ],
      concepts: ['sealed', 'prevent inheritance', 'final class'],
    },
    {
      id: 'cs-inherit-6',
      title: 'New Keyword Hiding',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use the new keyword to intentionally hide a base class method.',
      skeleton: `class Base { public string Info() => "Base"; }
class Derived : Base
{
    public __BLANK__ string Info() => "Derived";
}`,
      solution: `class Base { public string Info() => "Base"; }
class Derived : Base
{
    public new string Info() => "Derived";
}`,
      hints: [
        'new hides the base method instead of overriding it.',
        'This breaks polymorphism -- the base version is called through base references.',
        'The answer is: new',
      ],
      concepts: ['new keyword', 'method hiding', 'non-polymorphic'],
    },
    {
      id: 'cs-inherit-7',
      title: 'Shape Hierarchy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a Shape base class with virtual Area() and Circle/Rectangle derived classes that override it.',
      skeleton: ``,
      solution: `class Shape
{
    public virtual double Area() => 0;
}

class Circle : Shape
{
    public double Radius { get; }
    public Circle(double radius) { Radius = radius; }
    public override double Area() => Math.PI * Radius * Radius;
}

class Rectangle : Shape
{
    public double Width { get; }
    public double Height { get; }
    public Rectangle(double w, double h) { Width = w; Height = h; }
    public override double Area() => Width * Height;
}`,
      hints: [
        'The base Shape has a virtual Area method returning 0.',
        'Each derived class overrides Area with its specific formula.',
        'Circle: PI * r^2, Rectangle: w * h.',
      ],
      concepts: ['inheritance hierarchy', 'virtual', 'override', 'polymorphism'],
    },
    {
      id: 'cs-inherit-8',
      title: 'Base Method Call',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a Logger base class with virtual Log(string). Write a TimestampLogger that overrides Log to prepend a timestamp and call base.Log.',
      skeleton: ``,
      solution: `class Logger
{
    public virtual void Log(string message)
    {
        Console.WriteLine(message);
    }
}

class TimestampLogger : Logger
{
    public override void Log(string message)
    {
        base.Log($"[{DateTime.Now:HH:mm:ss}] {message}");
    }
}`,
      hints: [
        'Use base.Log() to call the parent implementation.',
        'Prepend the timestamp before calling base.',
        'The derived class adds behavior without replacing it.',
      ],
      concepts: ['base keyword', 'decorator pattern', 'extending behavior'],
    },
    {
      id: 'cs-inherit-9',
      title: 'Protected Members',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a class Account with a protected decimal _balance field and public Balance property. Write SavingsAccount that adds an Interest() method accessing _balance.',
      skeleton: ``,
      solution: `class Account
{
    protected decimal _balance;

    public decimal Balance => _balance;

    public Account(decimal initial) { _balance = initial; }

    public virtual void Deposit(decimal amount) { _balance += amount; }
}

class SavingsAccount : Account
{
    public decimal Rate { get; }

    public SavingsAccount(decimal initial, decimal rate) : base(initial)
    {
        Rate = rate;
    }

    public void ApplyInterest()
    {
        _balance += _balance * Rate;
    }
}`,
      hints: [
        'Protected members are accessible in derived classes but not externally.',
        'SavingsAccount inherits from Account and accesses _balance.',
        'Call base(initial) in the SavingsAccount constructor.',
      ],
      concepts: ['protected', 'access modifier', 'inheritance', 'encapsulation'],
    },
    {
      id: 'cs-inherit-10',
      title: 'Polymorphic Collection',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method TotalArea that takes a List<Shape> and returns the sum of all areas using polymorphism.',
      skeleton: ``,
      solution: `static double TotalArea(List<Shape> shapes)
{
    double total = 0;
    foreach (var shape in shapes)
    {
        total += shape.Area();
    }
    return total;
}`,
      hints: [
        'Polymorphism calls the correct Area() override for each shape.',
        'Iterate through the list and sum the areas.',
        'No type checking needed -- virtual dispatch handles it.',
      ],
      concepts: ['polymorphism', 'virtual dispatch', 'Liskov Substitution'],
    },
    {
      id: 'cs-inherit-11',
      title: 'Template Method Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write an abstract class DataProcessor with a Process() template method that calls abstract methods Read(), Transform(), and Write().',
      skeleton: ``,
      solution: `abstract class DataProcessor
{
    public void Process()
    {
        var data = Read();
        var transformed = Transform(data);
        Write(transformed);
    }

    protected abstract string Read();
    protected abstract string Transform(string data);
    protected abstract void Write(string data);
}

class UpperCaseProcessor : DataProcessor
{
    private readonly string _input;
    public string? Output { get; private set; }

    public UpperCaseProcessor(string input) { _input = input; }

    protected override string Read() => _input;
    protected override string Transform(string data) => data.ToUpper();
    protected override void Write(string data) => Output = data;
}`,
      hints: [
        'The template method defines the algorithm skeleton.',
        'Abstract methods are the extension points for subclasses.',
        'The base class controls the flow; derived classes fill in details.',
      ],
      concepts: ['template method pattern', 'abstract', 'algorithm skeleton'],
    },
    {
      id: 'cs-inherit-12',
      title: 'Sealed Override',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a hierarchy: Animal (virtual Speak) -> Dog (sealed override Speak) -> Puppy (cannot override Speak).',
      skeleton: ``,
      solution: `class Animal
{
    public virtual string Speak() => "...";
}

class Dog : Animal
{
    public sealed override string Speak() => "Woof!";
}

class Puppy : Dog
{
    // Cannot override Speak -- it is sealed in Dog
    public string PuppySound() => "Yip!";
}`,
      hints: [
        'sealed override prevents further overriding in subclasses.',
        'Dog seals the Speak method so Puppy cannot override it.',
        'Puppy can add new methods but not re-override Speak.',
      ],
      concepts: ['sealed override', 'prevent re-override', 'inheritance control'],
    },
    {
      id: 'cs-inherit-13',
      title: 'Missing Override Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the method that hides instead of overriding. Add the correct keyword.',
      skeleton: `class Animal { public virtual string Sound() => "..."; }
class Dog : Animal
{
    public string Sound() => "Woof!"; // warning: hides base method
}

Animal a = new Dog();
Console.WriteLine(a.Sound()); // prints "..." instead of "Woof!"`,
      solution: `class Animal { public virtual string Sound() => "..."; }
class Dog : Animal
{
    public override string Sound() => "Woof!";
}

Animal a = new Dog();
Console.WriteLine(a.Sound()); // prints "Woof!"`,
      hints: [
        'Without override, the method hides the base method.',
        'Through a base-type reference, the base version is called.',
        'Add the override keyword.',
      ],
      concepts: ['override vs hiding', 'polymorphism', 'virtual dispatch'],
    },
    {
      id: 'cs-inherit-14',
      title: 'Missing Base Constructor Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the compile error. The base class has no parameterless constructor.',
      skeleton: `class Entity
{
    public int Id { get; }
    public Entity(int id) { Id = id; }
}

class User : Entity
{
    public string Name { get; }
    public User(string name) // error: no base() call
    {
        Name = name;
    }
}`,
      solution: `class Entity
{
    public int Id { get; }
    public Entity(int id) { Id = id; }
}

class User : Entity
{
    public string Name { get; }
    public User(int id, string name) : base(id)
    {
        Name = name;
    }
}`,
      hints: [
        'The base class requires an id parameter in its constructor.',
        'Add : base(id) and add id as a parameter to User constructor.',
        'Derived constructors must satisfy base constructor requirements.',
      ],
      concepts: ['base constructor', 'constructor requirement', 'compile error'],
    },
    {
      id: 'cs-inherit-15',
      title: 'Fragile Base Class Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the double-counting bug. AddRange calls Add internally, causing each item to be counted twice.',
      skeleton: `class CountingList<T> : List<T>
{
    public int AddCount { get; private set; }

    public new void Add(T item)
    {
        AddCount++;
        base.Add(item);
    }

    public new void AddRange(IEnumerable<T> items)
    {
        AddCount += items.Count();
        base.AddRange(items); // base.AddRange calls Add internally!
    }
}`,
      solution: `class CountingList<T>
{
    private readonly List<T> _inner = new();
    public int AddCount { get; private set; }

    public void Add(T item)
    {
        AddCount++;
        _inner.Add(item);
    }

    public void AddRange(IEnumerable<T> items)
    {
        foreach (var item in items)
        {
            Add(item);
        }
    }

    public int Count => _inner.Count;
}`,
      hints: [
        'Inheriting from concrete classes can cause fragile base class problems.',
        'Prefer composition over inheritance: wrap a List<T> instead.',
        'AddRange should delegate to Add to keep counting consistent.',
      ],
      concepts: ['composition over inheritance', 'fragile base class', 'delegation'],
    },
    {
      id: 'cs-inherit-16',
      title: 'Predict Virtual Dispatch',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `class A { public virtual string Who() => "A"; }
class B : A { public override string Who() => "B"; }
class C : B { public override string Who() => "C"; }

A obj = new C();
Console.WriteLine(obj.Who());`,
      solution: `C`,
      hints: [
        'Virtual dispatch calls the most derived override.',
        'Even though the variable is typed as A, the object is C.',
        'C.Who() is called, returning "C".',
      ],
      concepts: ['virtual dispatch', 'runtime polymorphism', 'most derived override'],
    },
    {
      id: 'cs-inherit-17',
      title: 'Predict Hiding vs Override',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `class Base { public virtual string Get() => "Base"; }
class Mid : Base { public new string Get() => "Mid"; }
class Top : Mid { public new string Get() => "Top"; }

Base b = new Top();
Mid m = new Top();
Top t = new Top();
Console.WriteLine($"{b.Get()} {m.Get()} {t.Get()}");`,
      solution: `Base Mid Top`,
      hints: [
        'new hides the method -- the version called depends on the reference type.',
        'Base reference calls Base.Get(), Mid reference calls Mid.Get().',
        'No virtual dispatch occurs with new-hidden methods.',
      ],
      concepts: ['method hiding', 'new keyword', 'reference type matters'],
    },
    {
      id: 'cs-inherit-18',
      title: 'Predict Constructor Chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `class A
{
    public A() { Console.Write("A "); }
}
class B : A
{
    public B() { Console.Write("B "); }
}
class C : B
{
    public C() { Console.Write("C "); }
}

new C();`,
      solution: `A B C `,
      hints: [
        'Constructors execute from base to derived.',
        'C() calls B() which calls A() first.',
        'Output order: A B C.',
      ],
      concepts: ['constructor chain', 'base-first execution', 'inheritance'],
    },
    {
      id: 'cs-inherit-19',
      title: 'Refactor to Polymorphism',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor the type-checking code to use polymorphism.',
      skeleton: `static double GetArea(object shape)
{
    if (shape is Circle c)
        return Math.PI * c.Radius * c.Radius;
    if (shape is Rectangle r)
        return r.Width * r.Height;
    return 0;
}`,
      solution: `abstract class Shape
{
    public abstract double GetArea();
}

class Circle : Shape
{
    public double Radius { get; }
    public Circle(double r) { Radius = r; }
    public override double GetArea() => Math.PI * Radius * Radius;
}

class Rectangle : Shape
{
    public double Width { get; }
    public double Height { get; }
    public Rectangle(double w, double h) { Width = w; Height = h; }
    public override double GetArea() => Width * Height;
}`,
      hints: [
        'Replace type-checking with virtual methods.',
        'Each shape knows how to compute its own area.',
        'This follows the Open-Closed Principle.',
      ],
      concepts: ['polymorphism', 'Open-Closed Principle', 'refactoring'],
    },
    {
      id: 'cs-inherit-20',
      title: 'Composite Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a Component base class with virtual GetSize(). Write File (returns its size) and Folder (returns sum of children sizes) derived classes.',
      skeleton: ``,
      solution: `abstract class Component
{
    public string Name { get; }
    protected Component(string name) { Name = name; }
    public abstract long GetSize();
}

class File : Component
{
    public long Size { get; }
    public File(string name, long size) : base(name) { Size = size; }
    public override long GetSize() => Size;
}

class Folder : Component
{
    private readonly List<Component> _children = new();
    public Folder(string name) : base(name) { }
    public void Add(Component child) => _children.Add(child);
    public override long GetSize()
    {
        long total = 0;
        foreach (var child in _children)
            total += child.GetSize();
        return total;
    }
}`,
      hints: [
        'The composite pattern treats individual items and groups uniformly.',
        'Both File and Folder implement GetSize() but differently.',
        'Folder recursively sums its children\'s sizes.',
      ],
      concepts: ['composite pattern', 'recursion', 'uniform interface', 'tree structure'],
    },
  ],
};
