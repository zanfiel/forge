import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-records',
  title: '24. Records',
  explanation: `## Records

Records are reference types (or value types with \`record struct\`) designed for immutable data. They provide value-based equality, \`ToString\`, \`Deconstruct\`, and \`with\` expressions.

\`\`\`csharp
// Record class (reference type, immutable by default)
record Person(string Name, int Age);

// Record struct (value type)
record struct Point(double X, double Y);

// Readonly record struct
readonly record struct Color(byte R, byte G, byte B);

// With expression (non-destructive mutation)
var alice = new Person("Alice", 30);
var older = alice with { Age = 31 };

// Value equality
var p1 = new Person("Alice", 30);
var p2 = new Person("Alice", 30);
Console.WriteLine(p1 == p2);  // True (value equality)

// Deconstruction
var (name, age) = alice;

// Inheritance
record Student(string Name, int Age, string School) : Person(Name, Age);
\`\`\`

Use records for DTOs, domain models, and anywhere you need immutable value objects.`,
  exercises: [
    {
      id: 'cs-rec-1',
      title: 'Declare a Record',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare a simple record with positional parameters.',
      skeleton: `__BLANK__ Product(string Name, decimal Price);`,
      solution: `record Product(string Name, decimal Price);`,
      hints: ['Records use the record keyword.', 'Positional parameters create init-only properties.', 'The answer is: record'],
      concepts: ['record declaration', 'positional parameters'],
    },
    {
      id: 'cs-rec-2',
      title: 'With Expression',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Create a modified copy of a record.',
      skeleton: `record Config(string Host, int Port);
var dev = new Config("localhost", 3000);
var prod = dev __BLANK__ { Host = "api.example.com", Port = 443 };`,
      solution: `record Config(string Host, int Port);
var dev = new Config("localhost", 3000);
var prod = dev with { Host = "api.example.com", Port = 443 };`,
      hints: ['The with keyword creates a shallow copy with modifications.', 'Only specified properties are changed.', 'The answer is: with'],
      concepts: ['with expression', 'non-destructive mutation'],
    },
    {
      id: 'cs-rec-3',
      title: 'Record Struct',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Declare a value-type record.',
      skeleton: `__BLANK__ Coordinate(double Lat, double Lon);`,
      solution: `record struct Coordinate(double Lat, double Lon);`,
      hints: ['record struct makes a value type record.', 'It has value equality like records but stack-allocated.', 'The answer is: record struct'],
      concepts: ['record struct', 'value type record'],
    },
    {
      id: 'cs-rec-4',
      title: 'Record Inheritance',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Inherit from a base record.',
      skeleton: `record Animal(string Name);
record Dog(string Name, string Breed) __BLANK__ Animal(Name);`,
      solution: `record Animal(string Name);
record Dog(string Name, string Breed) : Animal(Name);`,
      hints: ['Records support single inheritance with :.', 'Pass base parameters in parentheses.', 'The answer is: :'],
      concepts: ['record inheritance', 'base constructor'],
    },
    {
      id: 'cs-rec-5',
      title: 'Deconstruction',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Deconstruct a record into variables.',
      skeleton: `record Point(int X, int Y);
var p = new Point(3, 4);
var __BLANK__ = p;
Console.WriteLine($"{x}, {y}");`,
      solution: `record Point(int X, int Y);
var p = new Point(3, 4);
var (x, y) = p;
Console.WriteLine($"{x}, {y}");`,
      hints: ['Positional records auto-generate Deconstruct.', 'Use tuple syntax to extract values.', 'The answer is: (x, y)'],
      concepts: ['deconstruction', 'Deconstruct method'],
    },
    {
      id: 'cs-rec-6',
      title: 'Readonly Record Struct',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Declare a fully immutable record struct.',
      skeleton: `__BLANK__ record struct Money(decimal Amount, string Currency);`,
      solution: `readonly record struct Money(decimal Amount, string Currency);`,
      hints: ['readonly makes all fields immutable.', 'Combined with record struct for immutable value types.', 'The answer is: readonly'],
      concepts: ['readonly record struct', 'immutability'],
    },
    {
      id: 'cs-rec-7',
      title: 'Record with Validation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a record with constructor validation.',
      skeleton: `// Write record Email with:
// - string Address (positional parameter)
// - Validate that Address contains @ in the constructor
// - Throw ArgumentException if invalid`,
      solution: `record Email(string Address)
{
    public string Address { get; init; } = Address.Contains('@')
        ? Address
        : throw new ArgumentException("Invalid email address");
}`,
      hints: ['Override the positional property with validation.', 'Use a conditional expression with throw.', 'The property initializer runs the validation.'],
      concepts: ['record validation', 'init property', 'constructor validation'],
    },
    {
      id: 'cs-rec-8',
      title: 'Record as Dictionary Key',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Demonstrate records as dictionary keys thanks to value equality.',
      skeleton: `// Write a method that counts occurrences of (x, y) coordinate pairs
// Use record struct Coord(int X, int Y) as dictionary key
// Dictionary<Coord, int> CountPoints(Coord[] points)`,
      solution: `record struct Coord(int X, int Y);

Dictionary<Coord, int> CountPoints(Coord[] points)
{
    var counts = new Dictionary<Coord, int>();
    foreach (var p in points)
    {
        counts[p] = counts.GetValueOrDefault(p) + 1;
    }
    return counts;
}`,
      hints: ['Records have built-in value equality and GetHashCode.', 'They work correctly as dictionary keys without extra code.', 'GetValueOrDefault returns 0 for missing int keys.'],
      concepts: ['value equality', 'dictionary key', 'record struct'],
    },
    {
      id: 'cs-rec-9',
      title: 'Record with Computed Property',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a record with an additional computed property.',
      skeleton: `// Write record Rectangle(double Width, double Height) with:
// - double Area computed property
// - double Perimeter computed property`,
      solution: `record Rectangle(double Width, double Height)
{
    public double Area => Width * Height;
    public double Perimeter => 2 * (Width + Height);
}`,
      hints: ['Add computed properties in a record body.', 'Use expression-bodied properties.', 'Computed properties derive from positional parameters.'],
      concepts: ['computed property', 'record body', 'derived values'],
    },
    {
      id: 'cs-rec-10',
      title: 'Sealed Record ToString',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Override PrintMembers to customize record ToString output.',
      skeleton: `// Write record Temperature(double Value, string Unit) with:
// - Custom PrintMembers that outputs like "72.5 F"`,
      solution: `record Temperature(double Value, string Unit)
{
    protected virtual bool PrintMembers(System.Text.StringBuilder sb)
    {
        sb.Append($"{Value} {Unit}");
        return true;
    }
}`,
      hints: ['Records use PrintMembers for ToString output.', 'Override it to customize the format.', 'Return true to indicate content was printed.'],
      concepts: ['PrintMembers', 'ToString customization', 'record'],
    },
    {
      id: 'cs-rec-11',
      title: 'Generic Record',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a generic record for a paginated result.',
      skeleton: `// Write record PagedResult<T>(IReadOnlyList<T> Items, int Page, int PageSize, int TotalCount) with:
// - int TotalPages computed property
// - bool HasNext computed property`,
      solution: `record PagedResult<T>(IReadOnlyList<T> Items, int Page, int PageSize, int TotalCount)
{
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    public bool HasNext => Page < TotalPages;
}`,
      hints: ['Records can be generic like classes.', 'Compute TotalPages using ceiling division.', 'HasNext checks if current page is less than total pages.'],
      concepts: ['generic record', 'pagination', 'computed properties'],
    },
    {
      id: 'cs-rec-12',
      title: 'Record with Interface',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a record that implements IComparable for natural ordering.',
      skeleton: `// Write record Version(int Major, int Minor, int Patch) : IComparable<Version>
// Compare by Major, then Minor, then Patch`,
      solution: `record Version(int Major, int Minor, int Patch) : IComparable<Version>
{
    public int CompareTo(Version? other)
    {
        if (other is null) return 1;
        int cmp = Major.CompareTo(other.Major);
        if (cmp != 0) return cmp;
        cmp = Minor.CompareTo(other.Minor);
        if (cmp != 0) return cmp;
        return Patch.CompareTo(other.Patch);
    }
}`,
      hints: ['Implement IComparable<T> for natural ordering.', 'Compare each component in order of significance.', 'Return 0 for equal, negative for less, positive for greater.'],
      concepts: ['IComparable', 'record with interface', 'multi-field comparison'],
    },
    {
      id: 'cs-rec-13',
      title: 'Bug: Record Mutation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the attempt to mutate an immutable record property.',
      skeleton: `record Person(string Name, int Age);
var p = new Person("Alice", 30);
p.Age = 31;  // Error: init-only property`,
      solution: `record Person(string Name, int Age);
var p = new Person("Alice", 30);
var p2 = p with { Age = 31 };  // use with expression`,
      hints: ['Record positional properties are init-only.', 'Use a with expression for non-destructive mutation.', 'with creates a new instance with the changed value.'],
      concepts: ['init-only', 'with expression', 'immutability'],
    },
    {
      id: 'cs-rec-14',
      title: 'Bug: Record Reference Equality',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix code that incorrectly uses ReferenceEquals on records.',
      skeleton: `record Point(int X, int Y);
var a = new Point(1, 2);
var b = new Point(1, 2);
Console.WriteLine(ReferenceEquals(a, b));  // False
// Bug: developer expected True because values are equal`,
      solution: `record Point(int X, int Y);
var a = new Point(1, 2);
var b = new Point(1, 2);
Console.WriteLine(a == b);  // True (value equality)`,
      hints: ['Records use value equality for == but are still reference types.', 'ReferenceEquals checks if they are the same instance.', 'Use == for value comparison.'],
      concepts: ['value vs reference equality', 'record equality'],
    },
    {
      id: 'cs-rec-15',
      title: 'Bug: Record Struct Mutability',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the mutable record struct that causes unexpected behavior.',
      skeleton: `record struct Counter(int Value)
{
    public void Increment() => Value++;  // mutates!
}

// Bug: because it's a struct, mutations don't affect the caller
var c = new Counter(0);
c.Increment();  // this works, but passing to methods won't`,
      solution: `readonly record struct Counter(int Value)
{
    public Counter Increment() => this with { Value = Value + 1 };
}

var c = new Counter(0);
c = c.Increment();  // returns new instance`,
      hints: ['Mutable record structs cause copy-confusion when passed by value.', 'Use readonly record struct for immutability.', 'Return new instances instead of mutating.'],
      concepts: ['readonly record struct', 'struct copy semantics', 'immutable update'],
    },
    {
      id: 'cs-rec-16',
      title: 'Predict Record Equality',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the equality comparison result.',
      skeleton: `record Car(string Make, int Year);
var a = new Car("Toyota", 2020);
var b = new Car("Toyota", 2020);
var c = a with { Year = 2021 };
Console.WriteLine(a == b);
Console.WriteLine(a == c);`,
      solution: `True
False`,
      hints: ['Records use value equality.', 'a and b have the same values, so == is True.', 'c has a different Year, so == is False.'],
      concepts: ['value equality', 'with expression'],
    },
    {
      id: 'cs-rec-17',
      title: 'Predict Record ToString',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the ToString output of a record.',
      skeleton: `record Pet(string Name, string Species);
var p = new Pet("Luna", "Cat");
Console.WriteLine(p);`,
      solution: `Pet { Name = Luna, Species = Cat }`,
      hints: ['Records auto-generate a descriptive ToString.', 'Format is TypeName { Prop = Value, ... }.', 'String values are not quoted in the output.'],
      concepts: ['record ToString', 'auto-generated members'],
    },
    {
      id: 'cs-rec-18',
      title: 'Predict With Expression',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output after using with expressions.',
      skeleton: `record Score(string Player, int Points);
var s1 = new Score("Alice", 100);
var s2 = s1 with { Points = 150 };
var s3 = s2 with { Player = "Bob" };
Console.WriteLine(s1);
Console.WriteLine(s3);`,
      solution: `Score { Player = Alice, Points = 100 }
Score { Player = Bob, Points = 150 }`,
      hints: ['with creates copies; s1 is unchanged.', 's2 has Points=150, s3 changes Player to Bob.', 's3 inherits Points=150 from s2.'],
      concepts: ['with expression', 'immutability', 'record copy'],
    },
    {
      id: 'cs-rec-19',
      title: 'Refactor Class to Record',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Replace a verbose DTO class with a record.',
      skeleton: `class Address
{
    public string Street { get; init; }
    public string City { get; init; }
    public string Zip { get; init; }

    public Address(string street, string city, string zip)
    {
        Street = street;
        City = city;
        Zip = zip;
    }

    // Plus Equals, GetHashCode, ToString overrides...
}`,
      solution: `record Address(string Street, string City, string Zip);`,
      hints: ['Records auto-generate Equals, GetHashCode, ToString.', 'Positional parameters create init-only properties.', 'One line replaces the entire class.'],
      concepts: ['record vs class', 'boilerplate reduction', 'DTO'],
    },
    {
      id: 'cs-rec-20',
      title: 'Refactor Mutable to Immutable',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor mutable state updates to use with expressions.',
      skeleton: `class Player
{
    public string Name { get; set; }
    public int Score { get; set; }
    public int Level { get; set; }
}

var player = new Player { Name = "Alice", Score = 0, Level = 1 };
player.Score += 100;
if (player.Score >= 100) player.Level++;`,
      solution: `record Player(string Name, int Score, int Level);

var player = new Player("Alice", 0, 1);
var updated = player with { Score = player.Score + 100 };
var leveled = updated.Score >= 100
    ? updated with { Level = updated.Level + 1 }
    : updated;`,
      hints: ['Use record with positional parameters.', 'with expressions create new instances for each change.', 'Chain updates for multiple changes.'],
      concepts: ['immutable updates', 'with expression', 'record refactoring'],
    },
  ],
};
