/**
 * csharp.ts - C# learning track
 *
 * Modern, elegant, and powerful. Game dev with Unity, web APIs, and Windows applications.
 * Exercises emphasize C# features: LINQ, async/await, properties, nullable types, pattern matching.
 */

import type { Track } from '../../stores/app.svelte.ts';

export const track: Track = {
  id: 'csharp',
  name: 'C#',
  language: 'csharp',
  monacoLang: 'csharp',
  icon: '🟪',
  description: 'Modern, elegant, and powerful. Game dev with Unity, web APIs, and Windows applications.',
  sections: [
    // ─── 1. Variables & Types ────────────────────
    {
      id: 'cs-variables',
      title: '1. Variables & Types',
      explanation: `## Variables & Types

C# is statically typed with powerful type inference. Declare variables with explicit types or \`var\`:

\`\`\`csharp
string name = "Zan";
int age = 25;
double price = 9.99;
bool active = true;
char grade = 'A';

// var lets the compiler figure out the type
var servers = new List<string>();  // inferred as List<string>
\`\`\`

**Value types** live on the stack: \`int\`, \`double\`, \`bool\`, \`char\`, \`struct\`
**Reference types** live on the heap: \`string\`, \`class\`, arrays, \`List<T>\`

**String interpolation** (like f-strings):
\`\`\`csharp
string msg = $"Hello, {name}! You are {age} years old.";
\`\`\`

**Nullable types** make it explicit when something can be null:
\`\`\`csharp
int? maybeAge = null;    // nullable int
string? maybeName = null; // nullable string
int actual = maybeAge ?? 0;  // ?? = "if null, use this instead"
\`\`\``,
      exercises: [
        {
          id: 'cs-var-1',
          title: 'Declare Variables',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'csharp',
          goal: 'Declare variables with correct types for a game character.',
          skeleton: `using System;

class Program
{
    static void Main()
    {
        // Character name (text)
        __BLANK__ playerName = "Zan";

        // Health points (whole number)
        __BLANK__ health = 100;

        // Movement speed (decimal)
        __BLANK__ speed = 5.5;

        // Is the player alive?
        __BLANK__ isAlive = true;

        // Equipped weapon (might be nothing)
        __BLANK__ weapon = null;

        // Set a weapon
        weapon = "Iron Sword";

        Console.WriteLine($"{playerName}: HP={health}, Speed={speed}, " +
            $"Alive={isAlive}, Weapon={weapon ?? "bare fists"}");
    }
}`,
          solution: `using System;

class Program
{
    static void Main()
    {
        string playerName = "Zan";
        int health = 100;
        double speed = 5.5;
        bool isAlive = true;
        string? weapon = null;
        weapon = "Iron Sword";

        Console.WriteLine($"{playerName}: HP={health}, Speed={speed}, " +
            $"Alive={isAlive}, Weapon={weapon ?? "bare fists"}");
    }
}`,
          hints: [
            'Text is `string`, whole numbers are `int`, decimals are `double`, true/false is `bool`.',
            'A variable that can be null uses `?` after the type: `string?` means "string or null".',
            'Fill in: `string`, `int`, `double`, `bool`, `string?`.',
          ],
          concepts: ['string', 'int', 'double', 'bool', 'nullable types', 'string interpolation', '?? operator'],
        },
        {
          id: 'cs-var-2',
          title: 'String Interpolation & Methods',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'csharp',
          goal: 'Use string interpolation and built-in string methods to format API responses.',
          skeleton: `using System;

class Program
{
    static void Main()
    {
        string endpoint = "  /API/v2/Users  ";

        // Clean up the endpoint
        string trimmed = endpoint.__BLANK__();
        string lower = trimmed.__BLANK__();

        // Check if it's an API route
        bool isApi = lower.__BLANK__("/api");

        // Get the version number (characters at index 5-6)
        string version = lower.__BLANK__(5, 2);

        // Build a formatted log line
        string log = __BLANK__"[{DateTime.Now:HH:mm}] {lower} (v{version}, api={isApi})";

        Console.WriteLine(trimmed);   // "/API/v2/Users"
        Console.WriteLine(lower);     // "/api/v2/users"
        Console.WriteLine(isApi);     // True
        Console.WriteLine(version);   // "v2"
        Console.WriteLine(log);       // "[14:30] /api/v2/users (vv2, api=True)"
    }
}`,
          solution: `using System;

class Program
{
    static void Main()
    {
        string endpoint = "  /API/v2/Users  ";

        string trimmed = endpoint.Trim();
        string lower = trimmed.ToLower();
        bool isApi = lower.StartsWith("/api");
        string version = lower.Substring(5, 2);
        string log = $"[{DateTime.Now:HH:mm}] {lower} (v{version}, api={isApi})";

        Console.WriteLine(trimmed);
        Console.WriteLine(lower);
        Console.WriteLine(isApi);
        Console.WriteLine(version);
        Console.WriteLine(log);
    }
}`,
          hints: [
            '`.Trim()` removes whitespace. `.ToLower()` converts to lowercase. Note: C# methods use PascalCase.',
            '`.StartsWith()` checks the prefix. `.Substring(start, length)` extracts a portion.',
            'String interpolation starts with `$` before the quote: `$"text {expression}"`.',
          ],
          concepts: ['Trim', 'ToLower', 'StartsWith', 'Substring', 'string interpolation', 'DateTime'],
        },
        {
          id: 'cs-var-3',
          title: 'Null Safety',
          type: 'predict-output',
          difficulty: 'beginner',
          language: 'csharp',
          goal: 'Predict what each line prints. Focus on how C# handles nullable types and the null-coalescing operators.',
          skeleton: `using System;

class Program
{
    static void Main()
    {
        string? a = null;
        string b = a ?? "default";
        Console.WriteLine(b);                  // Line 1: ???

        int? score = null;
        int actual = score ?? -1;
        Console.WriteLine(actual);             // Line 2: ???

        string? name = "Zan";
        Console.WriteLine(name?.Length);        // Line 3: ???
        Console.WriteLine(name?.ToUpper());    // Line 4: ???

        string? empty = null;
        Console.WriteLine(empty?.Length);       // Line 5: ???
        Console.WriteLine(empty?.ToUpper() ?? "N/A"); // Line 6: ???
    }
}

// What does each line print?
// Line 1:
// Line 2:
// Line 3:
// Line 4:
// Line 5:
// Line 6:`,
          solution: `using System;

class Program
{
    static void Main()
    {
        string? a = null;
        string b = a ?? "default";
        Console.WriteLine(b);                  // Line 1: default

        int? score = null;
        int actual = score ?? -1;
        Console.WriteLine(actual);             // Line 2: -1

        string? name = "Zan";
        Console.WriteLine(name?.Length);        // Line 3: 3
        Console.WriteLine(name?.ToUpper());    // Line 4: ZAN

        string? empty = null;
        Console.WriteLine(empty?.Length);       // Line 5: (blank line)
        Console.WriteLine(empty?.ToUpper() ?? "N/A"); // Line 6: N/A
    }
}

// Line 1: default     (?? returns right side when left is null)
// Line 2: -1          (same for nullable int)
// Line 3: 3           (?. on non-null works normally)
// Line 4: ZAN         (?. on non-null calls the method)
// Line 5:             (?. on null returns null, prints blank)
// Line 6: N/A         (?. returns null, ?? catches it)`,
          hints: [
            '`??` (null-coalescing) returns the left side if non-null, otherwise the right side.',
            '`?.` (null-conditional) calls the method/property only if the object is not null. Returns null if it is.',
            'Chaining them: `x?.Method() ?? fallback` tries the method, falls back if x was null.',
          ],
          concepts: ['?? operator', '?. operator', 'nullable types', 'null safety', 'null propagation'],
        },
      ],
    },

    // ─── 2. Methods & Control Flow ───────────────
    {
      id: 'cs-methods',
      title: '2. Methods & Control Flow',
      explanation: `## Methods & Control Flow

C# methods belong to classes. Modern C# supports top-level statements, but most code lives in classes:

\`\`\`csharp
static int Add(int a, int b) => a + b;  // expression body

static string Greet(string name, string greeting = "Hello")
{
    return $"{greeting}, {name}!";
}

// Named arguments
Greet(greeting: "Hi", name: "Zan");
\`\`\`

**Pattern matching** (powerful switch expressions):
\`\`\`csharp
string Classify(int score) => score switch
{
    >= 90 => "A",
    >= 80 => "B",
    >= 70 => "C",
    _     => "F"
};
\`\`\`

**Loops:**
\`\`\`csharp
for (int i = 0; i < 10; i++) { ... }

foreach (var item in collection) { ... }

while (condition) { ... }
\`\`\`

**Ternary & null-coalescing:**
\`\`\`csharp
string label = count > 0 ? "items" : "empty";
string name = input ?? "Anonymous";
\`\`\``,
      exercises: [
        {
          id: 'cs-method-1',
          title: 'Switch Expressions',
          type: 'write-function',
          difficulty: 'beginner',
          language: 'csharp',
          goal: 'Write a method `GetFileIcon` that takes a filename string and returns an emoji based on the extension: .cs returns "📄", .json returns "📋", .png/.jpg returns "🖼️", .exe returns "⚙️". Return "📁" for anything else. Use a switch expression with pattern matching.',
          skeleton: `using System;

class Program
{
    // Write GetFileIcon here


    static void Main()
    {
        Console.WriteLine(GetFileIcon("Program.cs"));    // 📄
        Console.WriteLine(GetFileIcon("config.json"));   // 📋
        Console.WriteLine(GetFileIcon("hero.png"));      // 🖼️
        Console.WriteLine(GetFileIcon("app.exe"));       // ⚙️
        Console.WriteLine(GetFileIcon("readme.md"));     // 📁
    }
}`,
          solution: `using System;

class Program
{
    static string GetFileIcon(string filename)
    {
        string ext = System.IO.Path.GetExtension(filename).ToLower();
        return ext switch
        {
            ".cs"   => "📄",
            ".json" => "📋",
            ".png" or ".jpg" => "🖼️",
            ".exe"  => "⚙️",
            _       => "📁"
        };
    }

    static void Main()
    {
        Console.WriteLine(GetFileIcon("Program.cs"));
        Console.WriteLine(GetFileIcon("config.json"));
        Console.WriteLine(GetFileIcon("hero.png"));
        Console.WriteLine(GetFileIcon("app.exe"));
        Console.WriteLine(GetFileIcon("readme.md"));
    }
}`,
          hints: [
            'Extract the extension with `System.IO.Path.GetExtension(filename).ToLower()`.',
            'Switch expression syntax: `value switch { pattern => result, ... }`.',
            'Multiple patterns: use `or` keyword like `.png" or ".jpg" => "🖼️"`. The `_` is the default/catch-all.',
          ],
          concepts: ['switch expression', 'pattern matching', 'Path.GetExtension', 'or pattern'],
        },
        {
          id: 'cs-method-2',
          title: 'Expression-Bodied Methods',
          type: 'refactor',
          difficulty: 'intermediate',
          language: 'csharp',
          goal: 'Refactor these verbose methods into expression-bodied members (single-line arrow syntax).',
          skeleton: `using System;

class MathHelper
{
    // Refactor all of these to expression-bodied (=>) syntax

    static double CircleArea(double radius)
    {
        return Math.PI * radius * radius;
    }

    static bool IsEven(int n)
    {
        return n % 2 == 0;
    }

    static string Pluralize(string word, int count)
    {
        return count == 1 ? word : word + "s";
    }

    static int Clamp(int value, int min, int max)
    {
        return Math.Max(min, Math.Min(max, value));
    }

    static void Main()
    {
        Console.WriteLine(CircleArea(5));         // 78.54...
        Console.WriteLine(IsEven(42));            // True
        Console.WriteLine(Pluralize("server", 3)); // servers
        Console.WriteLine(Clamp(150, 0, 100));    // 100
    }
}`,
          solution: `using System;

class MathHelper
{
    static double CircleArea(double radius) => Math.PI * radius * radius;

    static bool IsEven(int n) => n % 2 == 0;

    static string Pluralize(string word, int count) => count == 1 ? word : word + "s";

    static int Clamp(int value, int min, int max) => Math.Max(min, Math.Min(max, value));

    static void Main()
    {
        Console.WriteLine(CircleArea(5));
        Console.WriteLine(IsEven(42));
        Console.WriteLine(Pluralize("server", 3));
        Console.WriteLine(Clamp(150, 0, 100));
    }
}`,
          hints: [
            'Expression-bodied syntax: `static ReturnType Name(params) => expression;` with no braces or `return`.',
            'If the method body is a single return statement, it can always be converted to `=>`.',
            'Replace `{ return X; }` with `=> X;` for each method.',
          ],
          concepts: ['expression-bodied members', '=>', 'Math.PI', 'Math.Max', 'Math.Min', 'ternary'],
        },
        {
          id: 'cs-method-3',
          title: 'Fix the Bug',
          type: 'fix-bug',
          difficulty: 'intermediate',
          language: 'csharp',
          goal: 'This health bar renderer has two bugs. It should display a bar like "[=====     ] 50%" but the output is wrong. Find and fix both issues.',
          skeleton: `using System;

class Program
{
    static string RenderHealthBar(int current, int max, int barWidth = 20)
    {
        double ratio = current / max;
        int filled = (int)(ratio * barWidth);
        int empty = barWidth - filled;

        string bar = new string('=', filled) + new string(' ', empty);
        int percent = (int)(ratio * 100);

        return $"[{bar}] {percent}";
    }

    static void Main()
    {
        Console.WriteLine(RenderHealthBar(75, 100));
        // Expected: "[===============     ] 75%"
        // Actual:   "[                    ] 0"

        Console.WriteLine(RenderHealthBar(100, 100));
        // Expected: "[====================] 100%"

        Console.WriteLine(RenderHealthBar(0, 100));
        // Expected: "[                    ] 0%"
    }
}`,
          solution: `using System;

class Program
{
    static string RenderHealthBar(int current, int max, int barWidth = 20)
    {
        double ratio = (double)current / max;
        int filled = (int)(ratio * barWidth);
        int empty = barWidth - filled;

        string bar = new string('=', filled) + new string(' ', empty);
        int percent = (int)(ratio * 100);

        return $"[{bar}] {percent}%";
    }

    static void Main()
    {
        Console.WriteLine(RenderHealthBar(75, 100));
        Console.WriteLine(RenderHealthBar(100, 100));
        Console.WriteLine(RenderHealthBar(0, 100));
    }
}`,
          hints: [
            'When you divide two ints in C#, you get integer division (truncated). 75 / 100 = 0, not 0.75.',
            'Cast one operand to double: `(double)current / max` to get decimal division.',
            'Bug 1: integer division (add `(double)` cast). Bug 2: the percent string is missing the `%` symbol.',
          ],
          concepts: ['integer division', 'type casting', 'string interpolation', 'default parameters'],
        },
      ],
    },

    // ─── 3. Classes & OOP ────────────────────────
    {
      id: 'cs-classes',
      title: '3. Classes & OOP',
      explanation: `## Classes & OOP

C# classes use **properties** instead of raw fields + getters/setters:

\`\`\`csharp
public class Player
{
    // Auto-property (compiler generates backing field)
    public string Name { get; set; }
    public int Health { get; private set; }  // public read, private write

    // Constructor
    public Player(string name, int health)
    {
        Name = name;
        Health = health;
    }

    public void TakeDamage(int amount)
    {
        Health = Math.Max(0, Health - amount);
    }

    public override string ToString() => $"{Name} (HP: {Health})";
}
\`\`\`

**Inheritance:**
\`\`\`csharp
public class Enemy : Player  // Enemy inherits from Player
{
    public int Damage { get; }
    public Enemy(string name, int hp, int damage) : base(name, hp)
    {
        Damage = damage;
    }
}
\`\`\`

**Records** (C# 9+) for immutable data:
\`\`\`csharp
public record Point(int X, int Y);  // immutable, value equality
var p = new Point(3, 4);
var moved = p with { X = 5 };  // creates copy with X changed
\`\`\``,
      exercises: [
        {
          id: 'cs-class-1',
          title: 'Properties & Constructors',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'csharp',
          goal: 'Complete the Inventory class using C# properties and constructor.',
          skeleton: `using System;
using System.Collections.Generic;

class Inventory
{
    // Auto-properties
    public string OwnerName { get; __BLANK__ set; }
    public int MaxSlots { get; }
    public List<string> Items { get; } = new();

    // Read-only computed property
    public int FreeSlots __BLANK__ MaxSlots - Items.Count;
    public bool IsFull __BLANK__ Items.Count >= MaxSlots;

    // Constructor
    public Inventory(__BLANK__ ownerName, int maxSlots)
    {
        OwnerName = ownerName;
        MaxSlots = maxSlots;
    }

    public bool AddItem(string item)
    {
        if (__BLANK__) return false;
        Items.Add(item);
        return true;
    }

    public override string __BLANK__()
        => $"{OwnerName}'s bag: {Items.Count}/{MaxSlots} slots used";
}

class Program
{
    static void Main()
    {
        var inv = new Inventory("Zan", 3);
        inv.AddItem("Iron Sword");
        inv.AddItem("Health Potion");
        Console.WriteLine(inv);            // "Zan's bag: 2/3 slots used"
        Console.WriteLine(inv.FreeSlots);  // 1
        inv.AddItem("Shield");
        Console.WriteLine(inv.AddItem("Extra")); // False (full!)
    }
}`,
          solution: `using System;
using System.Collections.Generic;

class Inventory
{
    public string OwnerName { get; private set; }
    public int MaxSlots { get; }
    public List<string> Items { get; } = new();

    public int FreeSlots => MaxSlots - Items.Count;
    public bool IsFull => Items.Count >= MaxSlots;

    public Inventory(string ownerName, int maxSlots)
    {
        OwnerName = ownerName;
        MaxSlots = maxSlots;
    }

    public bool AddItem(string item)
    {
        if (IsFull) return false;
        Items.Add(item);
        return true;
    }

    public override string ToString()
        => $"{OwnerName}'s bag: {Items.Count}/{MaxSlots} slots used";
}

class Program
{
    static void Main()
    {
        var inv = new Inventory("Zan", 3);
        inv.AddItem("Iron Sword");
        inv.AddItem("Health Potion");
        Console.WriteLine(inv);
        Console.WriteLine(inv.FreeSlots);
        inv.AddItem("Shield");
        Console.WriteLine(inv.AddItem("Extra"));
    }
}`,
          hints: [
            '`private set` means only code inside the class can change the property. `=>` makes a computed property.',
            'Expression-bodied properties: `public int X => expression;` recalculates each time.',
            'Fill in: `private`, `=>`, `=>`, `string`, `IsFull`, `ToString`.',
          ],
          concepts: ['auto-properties', 'private set', 'computed properties', 'expression-bodied', 'ToString'],
        },
        {
          id: 'cs-class-2',
          title: 'Interfaces & Dependency Injection',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'csharp',
          goal: 'Define an `ILogger` interface with a `void Log(string message)` method. Create two implementations: `ConsoleLogger` (prints to console) and `FileLogger` (appends to a list simulating file writes). Then write an `ApiService` class that accepts an ILogger in its constructor and uses it.',
          skeleton: `using System;
using System.Collections.Generic;

// Define ILogger interface here


// Define ConsoleLogger here


// Define FileLogger here (use a List<string> to simulate file)


// Define ApiService here (takes ILogger in constructor)


class Program
{
    static void Main()
    {
        // Works with ConsoleLogger
        var consoleService = new ApiService(new ConsoleLogger());
        consoleService.HandleRequest("/api/users");

        // Works with FileLogger
        var fileLogger = new FileLogger();
        var fileService = new ApiService(fileLogger);
        fileService.HandleRequest("/api/data");

        Console.WriteLine($"File log entries: {fileLogger.Entries.Count}");
    }
}`,
          solution: `using System;
using System.Collections.Generic;

interface ILogger
{
    void Log(string message);
}

class ConsoleLogger : ILogger
{
    public void Log(string message)
    {
        Console.WriteLine($"[CONSOLE] {message}");
    }
}

class FileLogger : ILogger
{
    public List<string> Entries { get; } = new();

    public void Log(string message)
    {
        Entries.Add($"[FILE] {message}");
    }
}

class ApiService
{
    private readonly ILogger _logger;

    public ApiService(ILogger logger)
    {
        _logger = logger;
    }

    public void HandleRequest(string path)
    {
        _logger.Log($"Handling request: {path}");
        _logger.Log($"Request complete: {path}");
    }
}

class Program
{
    static void Main()
    {
        var consoleService = new ApiService(new ConsoleLogger());
        consoleService.HandleRequest("/api/users");

        var fileLogger = new FileLogger();
        var fileService = new ApiService(fileLogger);
        fileService.HandleRequest("/api/data");

        Console.WriteLine($"File log entries: {fileLogger.Entries.Count}");
    }
}`,
          hints: [
            'Interface: `interface ILogger { void Log(string message); }`. Classes implement with `: ILogger`.',
            'ApiService stores the ILogger as a `private readonly` field, set in the constructor.',
            'This is dependency injection: ApiService does not care WHICH logger it gets, just that it has one.',
          ],
          concepts: ['interface', 'dependency injection', 'readonly', 'constructor injection', 'polymorphism'],
        },
        {
          id: 'cs-class-3',
          title: 'Records & With Expressions',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'csharp',
          goal: 'Define a `ServerConfig` record with properties: Host (string), Port (int), UseSsl (bool), MaxConnections (int). Write a method `WithDefaults` that takes a ServerConfig and returns a copy with any default-ish values corrected: port 0 becomes 8080, maxConnections 0 becomes 100, useSsl false becomes true if port is 443.',
          skeleton: `using System;

// Define the ServerConfig record here


class Program
{
    // Write WithDefaults here


    static void Main()
    {
        var config = new ServerConfig("api.example.com", 0, false, 0);
        var final_ = WithDefaults(config);

        Console.WriteLine(final_);
        // ServerConfig { Host = api.example.com, Port = 8080, UseSsl = False, MaxConnections = 100 }

        var sslConfig = new ServerConfig("secure.io", 443, false, 50);
        var finalSsl = WithDefaults(sslConfig);
        Console.WriteLine(finalSsl.UseSsl); // True
    }
}`,
          solution: `using System;

record ServerConfig(string Host, int Port, bool UseSsl, int MaxConnections);

class Program
{
    static ServerConfig WithDefaults(ServerConfig config)
    {
        int port = config.Port == 0 ? 8080 : config.Port;
        int maxConn = config.MaxConnections == 0 ? 100 : config.MaxConnections;
        bool ssl = config.UseSsl || port == 443;

        return config with
        {
            Port = port,
            UseSsl = ssl,
            MaxConnections = maxConn
        };
    }

    static void Main()
    {
        var config = new ServerConfig("api.example.com", 0, false, 0);
        var final_ = WithDefaults(config);
        Console.WriteLine(final_);

        var sslConfig = new ServerConfig("secure.io", 443, false, 50);
        var finalSsl = WithDefaults(sslConfig);
        Console.WriteLine(finalSsl.UseSsl);
    }
}`,
          hints: [
            'Record syntax: `record ServerConfig(string Host, int Port, bool UseSsl, int MaxConnections);`',
            'The `with` expression creates a copy with changed properties: `config with { Port = 8080 }`.',
            'Calculate the corrected values first, then use a single `with` expression to apply them all.',
          ],
          concepts: ['record', 'with expression', 'immutability', 'ternary operator', 'value equality'],
        },
      ],
    },

    // ─── 4. LINQ & Collections ───────────────────
    {
      id: 'cs-linq',
      title: '4. LINQ & Collections',
      explanation: `## LINQ & Collections

**LINQ** (Language Integrated Query) lets you query any collection with SQL-like syntax:

\`\`\`csharp
using System.Linq;

var numbers = new List<int> { 3, 1, 4, 1, 5, 9 };

// Method syntax (most common)
var evens = numbers.Where(n => n % 2 == 0).ToList();
var doubled = numbers.Select(n => n * 2).ToList();
var sum = numbers.Sum();
var max = numbers.Max();
var first = numbers.First(n => n > 4);  // 5

// Query syntax (SQL-like)
var result = from n in numbers
             where n > 3
             orderby n
             select n * 10;
\`\`\`

**Common LINQ methods:**
- \`.Where()\` = filter
- \`.Select()\` = transform (like map)
- \`.OrderBy()\` / \`.OrderByDescending()\` = sort
- \`.First()\` / \`.FirstOrDefault()\` = get first match
- \`.Any()\` / \`.All()\` = boolean checks
- \`.GroupBy()\` = group elements
- \`.ToDictionary()\` / \`.ToList()\` = materialize

**Dictionary:**
\`\`\`csharp
var scores = new Dictionary<string, int>
{
    ["Alice"] = 95,
    ["Bob"] = 87
};
scores.TryGetValue("Alice", out int score);  // true, score=95
\`\`\``,
      exercises: [
        {
          id: 'cs-linq-1',
          title: 'LINQ Basics',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'csharp',
          goal: 'Use LINQ to query a list of game sessions.',
          skeleton: `using System;
using System.Collections.Generic;
using System.Linq;

record GameSession(string Game, int MinutesPlayed, bool Completed);

class Program
{
    static void Main()
    {
        var sessions = new List<GameSession>
        {
            new("Elden Ring", 180, false),
            new("Hades", 45, true),
            new("Code Vein", 120, true),
            new("Yakuza", 90, false),
            new("Hades", 60, true),
        };

        // Total minutes played across all sessions
        int totalMinutes = sessions.__BLANK__(s => s.MinutesPlayed);

        // Games where you played more than an hour
        var longSessions = sessions.__BLANK__(s => s.MinutesPlayed __BLANK__ 60);

        // Just the game names, no duplicates, sorted
        var gameNames = sessions
            .__BLANK__(s => s.Game)
            .__BLANK__()
            .__BLANK__()
            .ToList();

        // Average minutes per session
        double avgMinutes = sessions.__BLANK__(s => s.MinutesPlayed);

        Console.WriteLine($"Total: {totalMinutes} min");
        Console.WriteLine($"Long sessions: {longSessions.Count()}");
        Console.WriteLine($"Games: {string.Join(", ", gameNames)}");
        Console.WriteLine($"Average: {avgMinutes:F1} min");
    }
}`,
          solution: `using System;
using System.Collections.Generic;
using System.Linq;

record GameSession(string Game, int MinutesPlayed, bool Completed);

class Program
{
    static void Main()
    {
        var sessions = new List<GameSession>
        {
            new("Elden Ring", 180, false),
            new("Hades", 45, true),
            new("Code Vein", 120, true),
            new("Yakuza", 90, false),
            new("Hades", 60, true),
        };

        int totalMinutes = sessions.Sum(s => s.MinutesPlayed);
        var longSessions = sessions.Where(s => s.MinutesPlayed > 60);

        var gameNames = sessions
            .Select(s => s.Game)
            .Distinct()
            .Order()
            .ToList();

        double avgMinutes = sessions.Average(s => s.MinutesPlayed);

        Console.WriteLine($"Total: {totalMinutes} min");
        Console.WriteLine($"Long sessions: {longSessions.Count()}");
        Console.WriteLine($"Games: {string.Join(", ", gameNames)}");
        Console.WriteLine($"Average: {avgMinutes:F1} min");
    }
}`,
          hints: [
            '`.Sum()` adds up values. `.Where()` filters. The comparison "more than" is `>`.',
            '`.Select()` extracts a property. `.Distinct()` removes duplicates. `.Order()` sorts.',
            '`.Average()` computes the mean. These all take a lambda: `s => s.PropertyName`.',
          ],
          concepts: ['Sum', 'Where', 'Select', 'Distinct', 'Order', 'Average', 'LINQ lambdas'],
        },
        {
          id: 'cs-linq-2',
          title: 'GroupBy & Transform',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'csharp',
          goal: 'Write a method `GetPlayerStats` that takes a list of Match records and returns a Dictionary<string, PlayerStats> where each player maps to their total kills, total deaths, and match count. Use LINQ GroupBy.',
          skeleton: `using System;
using System.Collections.Generic;
using System.Linq;

record Match(string Player, int Kills, int Deaths);
record PlayerStats(int TotalKills, int TotalDeaths, int MatchCount);

class Program
{
    // Write GetPlayerStats here


    static void Main()
    {
        var matches = new List<Match>
        {
            new("Zan", 12, 3),
            new("Alice", 8, 5),
            new("Zan", 15, 2),
            new("Bob", 6, 8),
            new("Alice", 10, 4),
        };

        var stats = GetPlayerStats(matches);
        foreach (var (player, s) in stats)
        {
            Console.WriteLine($"{player}: {s.TotalKills}K/{s.TotalDeaths}D over {s.MatchCount} matches");
        }
        // Zan: 27K/5D over 2 matches
        // Alice: 18K/9D over 2 matches
        // Bob: 6K/8D over 1 matches
    }
}`,
          solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Match(string Player, int Kills, int Deaths);
record PlayerStats(int TotalKills, int TotalDeaths, int MatchCount);

class Program
{
    static Dictionary<string, PlayerStats> GetPlayerStats(List<Match> matches)
    {
        return matches
            .GroupBy(m => m.Player)
            .ToDictionary(
                g => g.Key,
                g => new PlayerStats(
                    g.Sum(m => m.Kills),
                    g.Sum(m => m.Deaths),
                    g.Count()
                )
            );
    }

    static void Main()
    {
        var matches = new List<Match>
        {
            new("Zan", 12, 3),
            new("Alice", 8, 5),
            new("Zan", 15, 2),
            new("Bob", 6, 8),
            new("Alice", 10, 4),
        };

        var stats = GetPlayerStats(matches);
        foreach (var (player, s) in stats)
        {
            Console.WriteLine($"{player}: {s.TotalKills}K/{s.TotalDeaths}D over {s.MatchCount} matches");
        }
    }
}`,
          hints: [
            '`.GroupBy(m => m.Player)` groups all matches by player name. Each group has a `.Key` and the items.',
            '`.ToDictionary(keySelector, valueSelector)` converts groups into a Dictionary.',
            'Inside the value selector, use `g.Sum(m => m.Kills)`, `g.Sum(m => m.Deaths)`, and `g.Count()`.',
          ],
          concepts: ['GroupBy', 'ToDictionary', 'Sum', 'Count', 'record', 'LINQ aggregation'],
        },
        {
          id: 'cs-linq-3',
          title: 'Complex Query Pipeline',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'csharp',
          goal: 'Write a method `AnalyzeLogs` that takes a list of LogEntry records. Return the top 3 endpoints by error count (status >= 400), formatted as strings like "GET /api/users: 5 errors". Sort by error count descending.',
          skeleton: `using System;
using System.Collections.Generic;
using System.Linq;

record LogEntry(string Method, string Path, int Status, DateTime Timestamp);

class Program
{
    // Write AnalyzeLogs here


    static void Main()
    {
        var logs = new List<LogEntry>
        {
            new("GET", "/api/users", 200, DateTime.Now),
            new("GET", "/api/users", 500, DateTime.Now),
            new("POST", "/api/data", 400, DateTime.Now),
            new("GET", "/api/users", 404, DateTime.Now),
            new("GET", "/api/health", 200, DateTime.Now),
            new("POST", "/api/data", 400, DateTime.Now),
            new("POST", "/api/data", 400, DateTime.Now),
            new("DELETE", "/api/cache", 500, DateTime.Now),
            new("GET", "/api/users", 500, DateTime.Now),
        };

        foreach (var line in AnalyzeLogs(logs))
            Console.WriteLine(line);
        // POST /api/data: 3 errors
        // GET /api/users: 3 errors
        // DELETE /api/cache: 1 errors
    }
}`,
          solution: `using System;
using System.Collections.Generic;
using System.Linq;

record LogEntry(string Method, string Path, int Status, DateTime Timestamp);

class Program
{
    static List<string> AnalyzeLogs(List<LogEntry> logs)
    {
        return logs
            .Where(l => l.Status >= 400)
            .GroupBy(l => $"{l.Method} {l.Path}")
            .Select(g => new { Endpoint = g.Key, Errors = g.Count() })
            .OrderByDescending(x => x.Errors)
            .Take(3)
            .Select(x => $"{x.Endpoint}: {x.Errors} errors")
            .ToList();
    }

    static void Main()
    {
        var logs = new List<LogEntry>
        {
            new("GET", "/api/users", 200, DateTime.Now),
            new("GET", "/api/users", 500, DateTime.Now),
            new("POST", "/api/data", 400, DateTime.Now),
            new("GET", "/api/users", 404, DateTime.Now),
            new("GET", "/api/health", 200, DateTime.Now),
            new("POST", "/api/data", 400, DateTime.Now),
            new("POST", "/api/data", 400, DateTime.Now),
            new("DELETE", "/api/cache", 500, DateTime.Now),
            new("GET", "/api/users", 500, DateTime.Now),
        };

        foreach (var line in AnalyzeLogs(logs))
            Console.WriteLine(line);
    }
}`,
          hints: [
            'Start by filtering errors: `.Where(l => l.Status >= 400)`. Then group by method + path combined.',
            'Group key can be a formatted string: `.GroupBy(l => $"{l.Method} {l.Path}")`. Then `.Select()` to get count.',
            'Chain: Where, GroupBy, Select (to anonymous type), OrderByDescending, Take(3), Select (to string), ToList.',
          ],
          concepts: ['Where', 'GroupBy', 'anonymous types', 'OrderByDescending', 'Take', 'LINQ pipeline'],
        },
      ],
    },

    // ─── 5. Async/Await & Exceptions ─────────────
    {
      id: 'cs-async',
      title: '5. Async/Await & Exceptions',
      explanation: `## Async/Await & Exceptions

C# has first-class async support. Async methods return \`Task\` (void) or \`Task<T>\` (with a result):

\`\`\`csharp
async Task<string> FetchDataAsync(string url)
{
    using var client = new HttpClient();
    string response = await client.GetStringAsync(url);
    return response;
}

// Parallel execution
var task1 = FetchDataAsync("https://api.example.com/users");
var task2 = FetchDataAsync("https://api.example.com/posts");
await Task.WhenAll(task1, task2);  // both run at the same time
\`\`\`

**Exception handling:**
\`\`\`csharp
try
{
    var data = await FetchDataAsync(url);
}
catch (HttpRequestException ex)
{
    Console.Error.WriteLine($"Request failed: {ex.Message}");
}
catch (Exception ex)
{
    Console.Error.WriteLine($"Unexpected error: {ex}");
}
finally
{
    // Always runs (cleanup)
}
\`\`\`

**Custom exceptions:**
\`\`\`csharp
public class ApiException : Exception
{
    public int StatusCode { get; }
    public ApiException(string message, int statusCode)
        : base(message)
    {
        StatusCode = statusCode;
    }
}
\`\`\``,
      exercises: [
        {
          id: 'cs-async-1',
          title: 'Async with Retry',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'csharp',
          goal: 'Write an async method `RetryAsync<T>` that takes a `Func<Task<T>>` and a max retry count. It should attempt to execute the function, and if it throws, retry up to the specified number of times with a 1-second delay between attempts. Return the result on success, or throw the last exception if all retries fail.',
          skeleton: `using System;
using System.Threading.Tasks;

class Program
{
    // Write RetryAsync<T> here


    static int attempt = 0;

    static async Task<string> FlakyApiCall()
    {
        attempt++;
        if (attempt < 3)
            throw new Exception($"Attempt {attempt} failed");
        return "Success on attempt " + attempt;
    }

    static async Task Main()
    {
        try
        {
            string result = await RetryAsync(FlakyApiCall, 5);
            Console.WriteLine(result);  // "Success on attempt 3"
        }
        catch (Exception ex)
        {
            Console.WriteLine($"All retries failed: {ex.Message}");
        }
    }
}`,
          solution: `using System;
using System.Threading.Tasks;

class Program
{
    static async Task<T> RetryAsync<T>(Func<Task<T>> action, int maxRetries)
    {
        Exception? lastException = null;
        for (int i = 0; i < maxRetries; i++)
        {
            try
            {
                return await action();
            }
            catch (Exception ex)
            {
                lastException = ex;
                Console.WriteLine($"Retry {i + 1}/{maxRetries}: {ex.Message}");
                if (i < maxRetries - 1)
                    await Task.Delay(1000);
            }
        }
        throw lastException!;
    }

    static int attempt = 0;

    static async Task<string> FlakyApiCall()
    {
        attempt++;
        if (attempt < 3)
            throw new Exception($"Attempt {attempt} failed");
        return "Success on attempt " + attempt;
    }

    static async Task Main()
    {
        try
        {
            string result = await RetryAsync(FlakyApiCall, 5);
            Console.WriteLine(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"All retries failed: {ex.Message}");
        }
    }
}`,
          hints: [
            'The signature: `static async Task<T> RetryAsync<T>(Func<Task<T>> action, int maxRetries)`.',
            'Loop with for, try/catch inside. On catch, save the exception and `await Task.Delay(1000)` before retrying.',
            'After the loop, `throw lastException!` (the `!` tells C# you know it is not null at this point).',
          ],
          concepts: ['async', 'await', 'Task<T>', 'Func<Task<T>>', 'generics', 'Task.Delay', 'retry pattern'],
        },
        {
          id: 'cs-async-2',
          title: 'Parallel Tasks & WhenAll',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'csharp',
          goal: 'Write an async method `HealthCheckAll` that takes a list of server URLs, pings each one in parallel (simulated with the provided `PingServer` method), and returns a Dictionary<string, bool> mapping each URL to whether it responded successfully.',
          skeleton: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Program
{
    // Simulates pinging a server (don't modify)
    static async Task<bool> PingServer(string url)
    {
        await Task.Delay(100); // simulate network
        return !url.Contains("dead");
    }

    // Write HealthCheckAll here


    static async Task Main()
    {
        var servers = new List<string>
        {
            "https://api.live.com",
            "https://db.dead.com",
            "https://cache.live.com",
            "https://auth.dead.com",
        };

        var results = await HealthCheckAll(servers);
        foreach (var (url, alive) in results)
        {
            Console.WriteLine($"{url}: {(alive ? "UP" : "DOWN")}");
        }
        // api.live.com: UP
        // db.dead.com: DOWN
        // cache.live.com: UP
        // auth.dead.com: DOWN
    }
}`,
          solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Program
{
    static async Task<bool> PingServer(string url)
    {
        await Task.Delay(100);
        return !url.Contains("dead");
    }

    static async Task<Dictionary<string, bool>> HealthCheckAll(List<string> servers)
    {
        var tasks = servers.Select(async url =>
        {
            bool alive;
            try
            {
                alive = await PingServer(url);
            }
            catch
            {
                alive = false;
            }
            return (url, alive);
        });

        var results = await Task.WhenAll(tasks);
        return results.ToDictionary(r => r.url, r => r.alive);
    }

    static async Task Main()
    {
        var servers = new List<string>
        {
            "https://api.live.com",
            "https://db.dead.com",
            "https://cache.live.com",
            "https://auth.dead.com",
        };

        var results = await HealthCheckAll(servers);
        foreach (var (url, alive) in results)
        {
            Console.WriteLine($"{url}: {(alive ? "UP" : "DOWN")}");
        }
    }
}`,
          hints: [
            'Use `.Select()` with an async lambda to create a task for each server. This starts them all at once.',
            '`await Task.WhenAll(tasks)` waits for all of them to finish. Each task returns a tuple of (url, alive).',
            'Convert the results array to a Dictionary with `.ToDictionary(r => r.url, r => r.alive)`.',
          ],
          concepts: ['Task.WhenAll', 'async lambda', 'Select', 'ToDictionary', 'parallel async', 'tuple'],
        },
      ],
    },
  ],
};
