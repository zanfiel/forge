/**
 * java.ts - Java learning track
 *
 * Enterprise-grade and everywhere. From Android to massive-scale backends.
 * Exercises emphasize Java idioms: interfaces, streams, Optional, strong typing.
 */

import type { Track } from '../../stores/app.svelte.ts';

export const track: Track = {
  id: 'java',
  name: 'Java',
  language: 'java',
  monacoLang: 'java',
  icon: '☕',
  description: 'Enterprise-grade and everywhere. Android, web backends, and massive-scale systems.',
  sections: [
    // ─── 1. Variables & Types ────────────────────
    {
      id: 'java-variables',
      title: '1. Variables & Types',
      explanation: `## Variables & Types

Java is **statically typed** - every variable needs a type, and the compiler enforces it.

\`\`\`java
String name = "Zan";          // text
int age = 25;                  // whole number
double price = 9.99;           // decimal number
boolean active = true;         // true or false
char grade = 'A';              // single character

// final = can't be reassigned (like const)
final int MAX_RETRIES = 3;
\`\`\`

**Primitives vs Objects:**
- Primitives: \`int\`, \`double\`, \`boolean\`, \`char\`, \`long\`, \`float\`, \`byte\`, \`short\`
- Object wrappers: \`Integer\`, \`Double\`, \`Boolean\` (used with generics)

**Strings** are objects with useful methods:
\`\`\`java
String s = "hello world";
s.length();            // 11
s.toUpperCase();       // "HELLO WORLD"
s.contains("world");   // true
s.substring(0, 5);     // "hello"
\`\`\`

**\`var\`** (Java 10+) lets the compiler infer the type:
\`\`\`java
var servers = new ArrayList<String>();  // inferred as ArrayList<String>
\`\`\``,
      exercises: [
        {
          id: 'java-var-1',
          title: 'Declare Variables',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'java',
          goal: 'Declare variables with the correct types for a server configuration.',
          skeleton: `public class ServerConfig {
    public static void main(String[] args) {
        // Server hostname (text)
        __BLANK__ hostname = "rocky";

        // Number of CPU cores (whole number)
        __BLANK__ cpuCores = 8;

        // Memory in GB (decimal number)
        __BLANK__ memoryGb = 31.5;

        // Whether the server is online
        __BLANK__ online = true;

        // Max connections (constant, can't change)
        __BLANK__ __BLANK__ MAX_CONNECTIONS = 1000;

        System.out.println(hostname + ": " + cpuCores + " cores, "
            + memoryGb + "GB RAM, online=" + online);
    }
}`,
          solution: `public class ServerConfig {
    public static void main(String[] args) {
        String hostname = "rocky";
        int cpuCores = 8;
        double memoryGb = 31.5;
        boolean online = true;
        final int MAX_CONNECTIONS = 1000;

        System.out.println(hostname + ": " + cpuCores + " cores, "
            + memoryGb + "GB RAM, online=" + online);
    }
}`,
          hints: [
            'Text uses `String` (capital S). Whole numbers use `int`. Decimals use `double`.',
            'True/false values are `boolean`. Constants use the `final` keyword before the type.',
            'Fill in: `String`, `int`, `double`, `boolean`, `final`, `int`.',
          ],
          concepts: ['String', 'int', 'double', 'boolean', 'final', 'System.out.println'],
        },
        {
          id: 'java-var-2',
          title: 'String Methods & Formatting',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'java',
          goal: 'Use String methods and String.format() to manipulate text.',
          skeleton: `public class StringOps {
    public static void main(String[] args) {
        String endpoint = "  /api/v2/users  ";

        // Remove leading/trailing whitespace
        String trimmed = endpoint.__BLANK__();

        // Check if it starts with "/api"
        boolean isApi = trimmed.__BLANK__("/api");

        // Get everything after "/api/v2"
        String resource = trimmed.__BLANK__(7);

        // Build a formatted log line
        String log = String.__BLANK__(
            "[%s] %s (isApi: %b)", "GET", trimmed, isApi
        );

        System.out.println(trimmed);    // "/api/v2/users"
        System.out.println(isApi);      // true
        System.out.println(resource);   // "/users"
        System.out.println(log);        // "[GET] /api/v2/users (isApi: true)"
    }
}`,
          solution: `public class StringOps {
    public static void main(String[] args) {
        String endpoint = "  /api/v2/users  ";

        String trimmed = endpoint.trim();
        boolean isApi = trimmed.startsWith("/api");
        String resource = trimmed.substring(7);

        String log = String.format(
            "[%s] %s (isApi: %b)", "GET", trimmed, isApi
        );

        System.out.println(trimmed);
        System.out.println(isApi);
        System.out.println(resource);
        System.out.println(log);
    }
}`,
          hints: [
            '`.trim()` removes whitespace from both ends of a string.',
            '`.startsWith()` checks the prefix. `.substring(index)` gives you everything from that index onward.',
            '`String.format()` works like printf: `%s` for strings, `%b` for booleans, `%d` for ints.',
          ],
          concepts: ['trim', 'startsWith', 'substring', 'String.format', 'format specifiers'],
        },
        {
          id: 'java-var-3',
          title: 'Type Conversion & var',
          type: 'predict-output',
          difficulty: 'beginner',
          language: 'java',
          goal: 'Predict what each line prints. Understand type conversion and integer division.',
          skeleton: `public class TypeQuiz {
    public static void main(String[] args) {
        int a = 7;
        int b = 2;
        System.out.println(a / b);          // Line 1: ???

        double c = 7;
        System.out.println(c / b);          // Line 2: ???

        String num = "42";
        int parsed = Integer.parseInt(num);
        System.out.println(parsed + 8);     // Line 3: ???

        System.out.println(num + 8);        // Line 4: ???
    }
}

// What does each line print?
// Line 1:
// Line 2:
// Line 3:
// Line 4:`,
          solution: `public class TypeQuiz {
    public static void main(String[] args) {
        int a = 7;
        int b = 2;
        System.out.println(a / b);          // Line 1: 3

        double c = 7;
        System.out.println(c / b);          // Line 2: 3.5

        String num = "42";
        int parsed = Integer.parseInt(num);
        System.out.println(parsed + 8);     // Line 3: 50

        System.out.println(num + 8);        // Line 4: 428
    }
}

// Line 1: 3       (int / int = int, truncates decimal)
// Line 2: 3.5     (double / int = double, keeps decimal)
// Line 3: 50      (parsed int + int = addition)
// Line 4: 428     (String + int = string concatenation!)`,
          hints: [
            'When you divide two ints in Java, the result is an int (decimal part is dropped, not rounded).',
            'If either operand is a double, Java promotes the other to double automatically.',
            'The `+` operator with a String always does concatenation, not math. "42" + 8 becomes "428".',
          ],
          concepts: ['integer division', 'type promotion', 'Integer.parseInt', 'string concatenation'],
        },
      ],
    },

    // ─── 2. Methods & Control Flow ───────────────
    {
      id: 'java-methods',
      title: '2. Methods & Control Flow',
      explanation: `## Methods & Control Flow

Methods are functions that belong to a class. Every Java method has a return type:

\`\`\`java
public static int add(int a, int b) {
    return a + b;
}

// void = returns nothing
public static void log(String msg) {
    System.out.println("[LOG] " + msg);
}
\`\`\`

**If/else:**
\`\`\`java
if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else {
    grade = "C";
}
\`\`\`

**Switch (enhanced, Java 14+):**
\`\`\`java
String label = switch (status) {
    case 200 -> "OK";
    case 404 -> "Not Found";
    case 500 -> "Server Error";
    default  -> "Unknown";
};
\`\`\`

**For loops & for-each:**
\`\`\`java
for (int i = 0; i < 10; i++) { ... }

for (String name : names) {
    System.out.println(name);
}
\`\`\``,
      exercises: [
        {
          id: 'java-method-1',
          title: 'Write a Scoring Method',
          type: 'write-function',
          difficulty: 'beginner',
          language: 'java',
          goal: 'Write a method called `httpStatus` that takes an int status code and returns a String description. Handle 200 ("OK"), 201 ("Created"), 400 ("Bad Request"), 404 ("Not Found"), 500 ("Internal Server Error"). Return "Unknown" for anything else.',
          skeleton: `public class HttpHelper {
    // Write the httpStatus method here


    public static void main(String[] args) {
        System.out.println(httpStatus(200));  // "OK"
        System.out.println(httpStatus(404));  // "Not Found"
        System.out.println(httpStatus(500));  // "Internal Server Error"
        System.out.println(httpStatus(418));  // "Unknown"
    }
}`,
          solution: `public class HttpHelper {
    public static String httpStatus(int code) {
        return switch (code) {
            case 200 -> "OK";
            case 201 -> "Created";
            case 400 -> "Bad Request";
            case 404 -> "Not Found";
            case 500 -> "Internal Server Error";
            default  -> "Unknown";
        };
    }

    public static void main(String[] args) {
        System.out.println(httpStatus(200));
        System.out.println(httpStatus(404));
        System.out.println(httpStatus(500));
        System.out.println(httpStatus(418));
    }
}`,
          hints: [
            'The method signature: `public static String httpStatus(int code)`. Use switch or if/else.',
            'Enhanced switch (Java 14+): `case 200 -> "OK";` with an arrow instead of colon + break.',
            'Don\'t forget the `default` case for unknown codes. The whole switch can be returned directly.',
          ],
          concepts: ['static methods', 'switch expressions', 'return types', 'String'],
        },
        {
          id: 'java-method-2',
          title: 'Loop & Accumulate',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'java',
          goal: 'Write a method `summarizeScores` that takes an int array and returns a String like "5 scores, avg 82.4, max 95, min 67". Use a loop to find the values.',
          skeleton: `public class ScoreBoard {
    // Write summarizeScores here


    public static void main(String[] args) {
        int[] scores = {95, 87, 67, 73, 90};
        System.out.println(summarizeScores(scores));
        // "5 scores, avg 82.4, max 95, min 67"
    }
}`,
          solution: `public class ScoreBoard {
    public static String summarizeScores(int[] scores) {
        int sum = 0;
        int max = scores[0];
        int min = scores[0];
        for (int s : scores) {
            sum += s;
            if (s > max) max = s;
            if (s < min) min = s;
        }
        double avg = (double) sum / scores.length;
        return String.format("%d scores, avg %.1f, max %d, min %d",
            scores.length, avg, max, min);
    }

    public static void main(String[] args) {
        int[] scores = {95, 87, 67, 73, 90};
        System.out.println(summarizeScores(scores));
    }
}`,
          hints: [
            'Initialize sum to 0, max and min to the first element. Then loop through with a for-each.',
            'Cast to double before dividing to get a decimal average: `(double) sum / scores.length`.',
            'Use `String.format()` with `%d` for ints and `%.1f` for a float with 1 decimal place.',
          ],
          concepts: ['for-each loop', 'array traversal', 'type casting', 'String.format', 'min/max'],
        },
        {
          id: 'java-method-3',
          title: 'Fix the Bug',
          type: 'fix-bug',
          difficulty: 'intermediate',
          language: 'java',
          goal: 'This method should check if a password is strong (8+ chars, has uppercase, has digit). It compiles but always returns false. Find and fix the bugs.',
          skeleton: `public class Validator {
    public static boolean isStrongPassword(String password) {
        boolean hasLength = password.length() > 8;
        boolean hasUpper = false;
        boolean hasDigit = false;

        for (int i = 0; i < password.length(); i++) {
            char c = password.charAt(i);
            if (Character.isUpperCase(c)) {
                hasUpper = true;
            }
            if (Character.isDigit(c)) {
                hasDigit = true;
            }
        }
        return hasLength && hasUpper || hasDigit;
    }

    public static void main(String[] args) {
        System.out.println(isStrongPassword("Secret99"));  // should be true
        System.out.println(isStrongPassword("weak"));       // should be false
        System.out.println(isStrongPassword("ALLCAPS!!"));  // should be false
    }
}`,
          solution: `public class Validator {
    public static boolean isStrongPassword(String password) {
        boolean hasLength = password.length() >= 8;
        boolean hasUpper = false;
        boolean hasDigit = false;

        for (int i = 0; i < password.length(); i++) {
            char c = password.charAt(i);
            if (Character.isUpperCase(c)) {
                hasUpper = true;
            }
            if (Character.isDigit(c)) {
                hasDigit = true;
            }
        }
        return hasLength && hasUpper && hasDigit;
    }

    public static void main(String[] args) {
        System.out.println(isStrongPassword("Secret99"));
        System.out.println(isStrongPassword("weak"));
        System.out.println(isStrongPassword("ALLCAPS!!"));
    }
}`,
          hints: [
            '"8+ chars" means 8 or more. Look at the comparison operator on the length check.',
            'The return statement has an operator precedence issue. `&&` binds tighter than `||`.',
            'Bug 1: `> 8` should be `>= 8`. Bug 2: the final `||` should be `&&` (need ALL conditions true).',
          ],
          concepts: ['boolean logic', 'operator precedence', 'off-by-one errors', 'Character methods'],
        },
      ],
    },

    // ─── 3. Classes & Objects ────────────────────
    {
      id: 'java-classes',
      title: '3. Classes & Objects',
      explanation: `## Classes & Objects

Everything in Java lives inside a class. Classes bundle **data** (fields) and **behavior** (methods):

\`\`\`java
public class Player {
    // Fields (instance variables)
    private String name;
    private int health;

    // Constructor
    public Player(String name, int health) {
        this.name = name;
        this.health = health;
    }

    // Method
    public void takeDamage(int amount) {
        this.health = Math.max(0, this.health - amount);
    }

    // Getter
    public String getName() { return name; }
    public int getHealth() { return health; }

    @Override
    public String toString() {
        return name + " (HP: " + health + ")";
    }
}
\`\`\`

**Interfaces** define a contract:
\`\`\`java
public interface Serializable {
    String toJson();
}
\`\`\`

**Records** (Java 16+) for simple data objects:
\`\`\`java
public record Point(int x, int y) {}
// Auto-generates constructor, getters, equals, hashCode, toString
\`\`\``,
      exercises: [
        {
          id: 'java-class-1',
          title: 'Build a Class',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'java',
          goal: 'Complete the BankAccount class with proper encapsulation.',
          skeleton: `public class BankAccount {
    private String owner;
    private __BLANK__ balance;

    // Constructor
    public BankAccount(__BLANK__ owner, double initialBalance) {
        __BLANK__.owner = owner;
        __BLANK__.balance = initialBalance;
    }

    public void deposit(double amount) {
        if (amount <= 0) __BLANK__ new IllegalArgumentException("Amount must be positive");
        balance __BLANK__ amount;
    }

    public boolean withdraw(double amount) {
        if (amount > balance) return __BLANK__;
        balance -= amount;
        return __BLANK__;
    }

    public double getBalance() { return balance; }

    @Override
    public String __BLANK__() {
        return owner + ": $" + String.format("%.2f", balance);
    }

    public static void main(String[] args) {
        var account = new BankAccount("Zan", 100.0);
        account.deposit(50.0);
        System.out.println(account.withdraw(200.0));  // false
        System.out.println(account.withdraw(30.0));   // true
        System.out.println(account);  // "Zan: $120.00"
    }
}`,
          solution: `public class BankAccount {
    private String owner;
    private double balance;

    public BankAccount(String owner, double initialBalance) {
        this.owner = owner;
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        balance += amount;
    }

    public boolean withdraw(double amount) {
        if (amount > balance) return false;
        balance -= amount;
        return true;
    }

    public double getBalance() { return balance; }

    @Override
    public String toString() {
        return owner + ": $" + String.format("%.2f", balance);
    }

    public static void main(String[] args) {
        var account = new BankAccount("Zan", 100.0);
        account.deposit(50.0);
        System.out.println(account.withdraw(200.0));
        System.out.println(account.withdraw(30.0));
        System.out.println(account);
    }
}`,
          hints: [
            'Balance holds money, so use `double`. `this` refers to the current object\'s fields.',
            '`throw` raises an exception. `+=` adds to the existing balance.',
            'Fill in: `double`, `String`, `this`, `this`, `throw`, `+=`, `false`, `true`, `toString`.',
          ],
          concepts: ['class', 'constructor', 'this', 'encapsulation', 'throw', 'toString'],
        },
        {
          id: 'java-class-2',
          title: 'Interfaces & Polymorphism',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'java',
          goal: 'Define an interface `Shape` with a method `double area()`. Then create two classes: `Circle` (takes radius) and `Rectangle` (takes width, height) that implement it. Write a static method `totalArea` that takes a Shape array and returns the sum of all areas.',
          skeleton: `// Define the Shape interface here


// Define Circle class here


// Define Rectangle class here


public class Geometry {
    // Write totalArea here


    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle(5.0),
            new Rectangle(4.0, 6.0),
            new Circle(3.0),
        };
        System.out.printf("Total area: %.2f%n", totalArea(shapes));
        // Total area: 130.75 (approx: 78.54 + 24.0 + 28.27)
    }
}`,
          solution: `interface Shape {
    double area();
}

class Circle implements Shape {
    private final double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

class Rectangle implements Shape {
    private final double width;
    private final double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() {
        return width * height;
    }
}

public class Geometry {
    public static double totalArea(Shape[] shapes) {
        double total = 0;
        for (Shape s : shapes) {
            total += s.area();
        }
        return total;
    }

    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle(5.0),
            new Rectangle(4.0, 6.0),
            new Circle(3.0),
        };
        System.out.printf("Total area: %.2f%n", totalArea(shapes));
    }
}`,
          hints: [
            'Interface syntax: `interface Shape { double area(); }`. Classes use `implements Shape`.',
            'Circle area is `Math.PI * radius * radius`. Rectangle area is `width * height`.',
            '`totalArea` loops through the Shape array, calling `.area()` on each. Polymorphism means it just works, no matter which Shape subtype.',
          ],
          concepts: ['interface', 'implements', 'polymorphism', 'Math.PI', 'for-each', '@Override'],
        },
        {
          id: 'java-class-3',
          title: 'Records & Immutability',
          type: 'refactor',
          difficulty: 'intermediate',
          language: 'java',
          goal: 'Refactor this verbose class into a Java record. Records auto-generate the constructor, getters, equals, hashCode, and toString.',
          skeleton: `// Refactor this into a record
public class Endpoint {
    private final String method;
    private final String path;
    private final int statusCode;

    public Endpoint(String method, String path, int statusCode) {
        this.method = method;
        this.path = path;
        this.statusCode = statusCode;
    }

    public String method() { return method; }
    public String path() { return path; }
    public int statusCode() { return statusCode; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Endpoint e)) return false;
        return statusCode == e.statusCode
            && method.equals(e.method) && path.equals(e.path);
    }

    @Override
    public int hashCode() {
        return java.util.Objects.hash(method, path, statusCode);
    }

    @Override
    public String toString() {
        return "Endpoint[method=" + method + ", path=" + path
            + ", statusCode=" + statusCode + "]";
    }

    public static void main(String[] args) {
        var e = new Endpoint("GET", "/api/users", 200);
        System.out.println(e);
        System.out.println(e.method() + " " + e.path());
    }
}`,
          solution: `public record Endpoint(String method, String path, int statusCode) {
    public static void main(String[] args) {
        var e = new Endpoint("GET", "/api/users", 200);
        System.out.println(e);
        System.out.println(e.method() + " " + e.path());
    }
}`,
          hints: [
            'A record declaration looks like: `public record Name(Type field1, Type field2) {}`',
            'Records give you the constructor, accessor methods, equals, hashCode, and toString for free.',
            'Just one line replaces the entire class: `public record Endpoint(String method, String path, int statusCode) {}`',
          ],
          concepts: ['record', 'immutability', 'refactoring', 'boilerplate reduction'],
        },
      ],
    },

    // ─── 4. Collections & Generics ───────────────
    {
      id: 'java-collections',
      title: '4. Collections & Generics',
      explanation: `## Collections & Generics

Java's Collections framework gives you type-safe data structures:

\`\`\`java
// List (ordered, allows duplicates)
List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.get(0);  // "Alice"

// Map (key-value pairs)
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.get("Alice");  // 95

// Set (unique elements, no duplicates)
Set<String> tags = new HashSet<>();
tags.add("java");
tags.add("java");  // ignored, already exists
tags.size();       // 1
\`\`\`

**Streams** (Java 8+) let you process collections functionally:
\`\`\`java
List<String> results = names.stream()
    .filter(n -> n.length() > 3)
    .map(String::toUpperCase)
    .toList();
\`\`\`

**Optional** handles nullable values safely:
\`\`\`java
Optional<String> found = names.stream()
    .filter(n -> n.startsWith("A"))
    .findFirst();
found.ifPresent(System.out::println);  // "Alice"
String value = found.orElse("nobody");
\`\`\``,
      exercises: [
        {
          id: 'java-col-1',
          title: 'Lists & Maps',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'java',
          goal: 'Build a word frequency counter using a Map.',
          skeleton: `import java.util.*;

public class WordCounter {
    public static Map<String, Integer> countWords(String text) {
        Map<String, Integer> freq = new __BLANK__<>();
        String[] words = text.toLowerCase().split("\\\\s+");

        for (String word : words) {
            freq.__BLANK__(word, freq.__BLANK__(word, 0) + 1);
        }
        return freq;
    }

    public static void main(String[] args) {
        String text = "the server hit the cache and the cache returned fast";
        Map<String, Integer> counts = countWords(text);

        // Print words that appear more than once
        for (var __BLANK__ : counts.__BLANK__()) {
            if (entry.getValue() > 1) {
                System.out.println(entry.getKey() + ": " + entry.getValue());
            }
        }
    }
}`,
          solution: `import java.util.*;

public class WordCounter {
    public static Map<String, Integer> countWords(String text) {
        Map<String, Integer> freq = new HashMap<>();
        String[] words = text.toLowerCase().split("\\\\s+");

        for (String word : words) {
            freq.put(word, freq.getOrDefault(word, 0) + 1);
        }
        return freq;
    }

    public static void main(String[] args) {
        String text = "the server hit the cache and the cache returned fast";
        Map<String, Integer> counts = countWords(text);

        for (var entry : counts.entrySet()) {
            if (entry.getValue() > 1) {
                System.out.println(entry.getKey() + ": " + entry.getValue());
            }
        }
    }
}`,
          hints: [
            '`HashMap` is the standard Map implementation. `put` sets a key-value pair.',
            '`getOrDefault(key, default)` returns the value for a key, or the default if absent. Perfect for counting.',
            'To iterate a Map: `counts.entrySet()` gives you Map.Entry objects with `.getKey()` and `.getValue()`.',
          ],
          concepts: ['HashMap', 'put', 'getOrDefault', 'entrySet', 'Map.Entry'],
        },
        {
          id: 'java-col-2',
          title: 'Streams Pipeline',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'java',
          goal: 'Write a method `getActiveEndpoints` that takes a List of Endpoint records and returns a sorted list of paths (strings) for endpoints that have a 200 status code. Use streams, not loops.',
          skeleton: `import java.util.*;
import java.util.stream.*;

record Endpoint(String method, String path, int status) {}

public class ApiRouter {
    // Write getActiveEndpoints here (use streams)


    public static void main(String[] args) {
        var endpoints = List.of(
            new Endpoint("GET", "/api/users", 200),
            new Endpoint("POST", "/api/users", 201),
            new Endpoint("GET", "/api/health", 200),
            new Endpoint("GET", "/api/old", 404),
            new Endpoint("DELETE", "/api/cache", 200)
        );

        System.out.println(getActiveEndpoints(endpoints));
        // [/api/cache, /api/health, /api/users]
    }
}`,
          solution: `import java.util.*;
import java.util.stream.*;

record Endpoint(String method, String path, int status) {}

public class ApiRouter {
    public static List<String> getActiveEndpoints(List<Endpoint> endpoints) {
        return endpoints.stream()
            .filter(e -> e.status() == 200)
            .map(Endpoint::path)
            .sorted()
            .toList();
    }

    public static void main(String[] args) {
        var endpoints = List.of(
            new Endpoint("GET", "/api/users", 200),
            new Endpoint("POST", "/api/users", 201),
            new Endpoint("GET", "/api/health", 200),
            new Endpoint("GET", "/api/old", 404),
            new Endpoint("DELETE", "/api/cache", 200)
        );

        System.out.println(getActiveEndpoints(endpoints));
    }
}`,
          hints: [
            'Start with `.stream()`, then chain `.filter()`, `.map()`, `.sorted()`, and `.toList()`.',
            '`.filter(e -> e.status() == 200)` keeps only 200s. `.map(Endpoint::path)` extracts the path string.',
            '`.sorted()` sorts strings alphabetically by default. `.toList()` collects back into a List.',
          ],
          concepts: ['Stream', 'filter', 'map', 'sorted', 'method reference', 'toList'],
        },
        {
          id: 'java-col-3',
          title: 'Optional Handling',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'java',
          goal: 'Write a method `findUser` that searches a list of User records by email and returns an Optional<User>. Then write `getUserDisplayName` that uses the Optional to return the user\'s name, or "Anonymous" if not found.',
          skeleton: `import java.util.*;

record User(String name, String email, boolean active) {}

public class UserService {
    // Write findUser: returns Optional<User>


    // Write getUserDisplayName: uses findUser, returns String


    public static void main(String[] args) {
        var users = List.of(
            new User("Zan", "zan@zanverse.lol", true),
            new User("Alice", "alice@example.com", true),
            new User("Ghost", "ghost@void.net", false)
        );

        System.out.println(getUserDisplayName(users, "zan@zanverse.lol")); // "Zan"
        System.out.println(getUserDisplayName(users, "nobody@x.com"));     // "Anonymous"
    }
}`,
          solution: `import java.util.*;

record User(String name, String email, boolean active) {}

public class UserService {
    public static Optional<User> findUser(List<User> users, String email) {
        return users.stream()
            .filter(u -> u.email().equals(email))
            .findFirst();
    }

    public static String getUserDisplayName(List<User> users, String email) {
        return findUser(users, email)
            .map(User::name)
            .orElse("Anonymous");
    }

    public static void main(String[] args) {
        var users = List.of(
            new User("Zan", "zan@zanverse.lol", true),
            new User("Alice", "alice@example.com", true),
            new User("Ghost", "ghost@void.net", false)
        );

        System.out.println(getUserDisplayName(users, "zan@zanverse.lol"));
        System.out.println(getUserDisplayName(users, "nobody@x.com"));
    }
}`,
          hints: [
            'Use `.stream().filter(...).findFirst()` which naturally returns an `Optional<User>`.',
            'Optional has `.map()` to transform the value inside (if present) and `.orElse()` for a fallback.',
            '`findUser(...).map(User::name).orElse("Anonymous")` chains it all together cleanly.',
          ],
          concepts: ['Optional', 'findFirst', 'Optional.map', 'orElse', 'method reference'],
        },
      ],
    },

    // ─── 5. Exceptions & I/O ─────────────────────
    {
      id: 'java-exceptions',
      title: '5. Exceptions & I/O',
      explanation: `## Exceptions & I/O

Java has **checked exceptions** (must handle or declare) and **unchecked exceptions** (runtime errors):

\`\`\`java
// Checked: compiler forces you to handle it
try {
    String content = Files.readString(Path.of("config.json"));
} catch (IOException e) {
    System.err.println("Failed to read file: " + e.getMessage());
}

// Try-with-resources: auto-closes resources
try (var reader = new BufferedReader(new FileReader("data.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}
\`\`\`

**Custom exceptions:**
\`\`\`java
public class ApiException extends RuntimeException {
    private final int statusCode;

    public ApiException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    public int getStatusCode() { return statusCode; }
}
\`\`\`

**Modern file I/O with \`java.nio\`:**
\`\`\`java
// Read entire file
String content = Files.readString(Path.of("file.txt"));

// Read all lines
List<String> lines = Files.readAllLines(Path.of("file.txt"));

// Write to file
Files.writeString(Path.of("out.txt"), "hello world");
\`\`\``,
      exercises: [
        {
          id: 'java-exc-1',
          title: 'Custom Exception & Handling',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'java',
          goal: 'Create a custom `ConfigException` that extends RuntimeException and stores a config key. Then write a `getRequired` method that looks up a key in a Map<String,String> and throws ConfigException if the key is missing.',
          skeleton: `import java.util.*;

// Define ConfigException here


public class ConfigLoader {
    // Write getRequired here


    public static void main(String[] args) {
        Map<String, String> config = Map.of(
            "db.host", "localhost",
            "db.port", "5432"
        );

        System.out.println(getRequired(config, "db.host"));  // "localhost"

        try {
            getRequired(config, "db.password");
        } catch (ConfigException e) {
            System.out.println("Missing key: " + e.getKey());
        }
    }
}`,
          solution: `import java.util.*;

class ConfigException extends RuntimeException {
    private final String key;

    public ConfigException(String key) {
        super("Missing required config key: " + key);
        this.key = key;
    }

    public String getKey() { return key; }
}

public class ConfigLoader {
    public static String getRequired(Map<String, String> config, String key) {
        String value = config.get(key);
        if (value == null) {
            throw new ConfigException(key);
        }
        return value;
    }

    public static void main(String[] args) {
        Map<String, String> config = Map.of(
            "db.host", "localhost",
            "db.port", "5432"
        );

        System.out.println(getRequired(config, "db.host"));

        try {
            getRequired(config, "db.password");
        } catch (ConfigException e) {
            System.out.println("Missing key: " + e.getKey());
        }
    }
}`,
          hints: [
            'Extend RuntimeException so it\'s unchecked. Store the key as a field with a getter.',
            'Call `super(message)` in the constructor to set the exception message.',
            '`config.get(key)` returns null if missing. Check for null and `throw new ConfigException(key)`.',
          ],
          concepts: ['custom exceptions', 'RuntimeException', 'throw', 'try-catch', 'Map.get'],
        },
        {
          id: 'java-exc-2',
          title: 'File Processing Pipeline',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'java',
          goal: 'Write a method `processLogFile` that reads a log file (one entry per line), filters lines containing "ERROR", extracts the message after "ERROR: ", and returns them as a List<String>. Use try-with-resources and streams. If the file doesn\'t exist, return an empty list.',
          skeleton: `import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.stream.*;

public class LogProcessor {
    // Write processLogFile here


    public static void main(String[] args) {
        // Assume errors.log contains:
        // 2024-01-15 INFO: Server started
        // 2024-01-15 ERROR: Connection refused to db-primary
        // 2024-01-15 INFO: Retrying...
        // 2024-01-15 ERROR: Timeout after 30s

        List<String> errors = processLogFile("errors.log");
        errors.forEach(System.out::println);
        // "Connection refused to db-primary"
        // "Timeout after 30s"
    }
}`,
          solution: `import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.stream.*;

public class LogProcessor {
    public static List<String> processLogFile(String filename) {
        try (Stream<String> lines = Files.lines(Path.of(filename))) {
            return lines
                .filter(line -> line.contains("ERROR"))
                .map(line -> line.substring(line.indexOf("ERROR: ") + 7))
                .toList();
        } catch (IOException e) {
            System.err.println("Could not read file: " + e.getMessage());
            return List.of();
        }
    }

    public static void main(String[] args) {
        List<String> errors = processLogFile("errors.log");
        errors.forEach(System.out::println);
    }
}`,
          hints: [
            '`Files.lines(Path.of(filename))` returns a Stream<String> and must be used inside try-with-resources.',
            'Chain `.filter(line -> line.contains("ERROR"))` then `.map()` to extract the message portion.',
            '`line.indexOf("ERROR: ") + 7` gives you the position right after "ERROR: ". Use `.substring()` from there.',
          ],
          concepts: ['Files.lines', 'try-with-resources', 'Stream', 'Path', 'IOException', 'List.of'],
        },
      ],
    },
  ],
};
