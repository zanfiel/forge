import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-constructors',
  title: '9. Constructors',
  explanation: `## Constructors

Constructors initialize new objects when they are created with \`new\`.

### Default Constructor
If you define no constructor, Java provides a no-arg default. Once you define any constructor, the default is gone.

### Parameterized Constructor
\`\`\`java
public class Person {
    private String name;
    public Person(String name) {
        this.name = name;
    }
}
\`\`\`

### Constructor Chaining with this()
\`\`\`java
public Person() {
    this("Unknown"); // calls the parameterized constructor
}
\`\`\`
- \`this()\` must be the first statement

### Copy Constructor
\`\`\`java
public Person(Person other) {
    this.name = other.name;
}
\`\`\`

### Initialization Blocks
- **Instance block**: \`{ }\` runs before every constructor
- **Static block**: \`static { }\` runs once when the class is loaded

### Order of Initialization
1. Static fields and blocks (once, in order)
2. Instance fields and blocks (per object, in order)
3. Constructor body
`,
  exercises: [
    {
      id: 'java-ctor-1',
      title: 'Default constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a default no-arg constructor that sets name to "Unknown".',
      skeleton: `public class User {
    private String name;
    
    public __BLANK__() {
        this.name = "Unknown";
    }
}`,
      solution: `public class User {
    private String name;
    
    public User() {
        this.name = "Unknown";
    }
}`,
      hints: [
        'Constructors have the same name as the class.',
        'They have no return type.',
        'Use `User`.',
      ],
      concepts: ['default constructor', 'constructor name', 'initialization'],
    },
    {
      id: 'java-ctor-2',
      title: 'Constructor chaining',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Chain to the parameterized constructor using this().',
      skeleton: `public class Point {
    private int x, y;
    
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
    
    public Point() {
        __BLANK__(0, 0);
    }
}`,
      solution: `public class Point {
    private int x, y;
    
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
    
    public Point() {
        this(0, 0);
    }
}`,
      hints: [
        'You can call another constructor from within a constructor.',
        'It must be the first statement.',
        'Use `this`.',
      ],
      concepts: ['constructor chaining', 'this()', 'delegation'],
    },
    {
      id: 'java-ctor-3',
      title: 'Copy constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Complete the copy constructor.',
      skeleton: `public class Color {
    private int r, g, b;
    
    public Color(int r, int g, int b) {
        this.r = r; this.g = g; this.b = b;
    }
    
    public Color(__BLANK__ other) {
        this.r = other.r;
        this.g = other.g;
        this.b = other.b;
    }
}`,
      solution: `public class Color {
    private int r, g, b;
    
    public Color(int r, int g, int b) {
        this.r = r; this.g = g; this.b = b;
    }
    
    public Color(Color other) {
        this.r = other.r;
        this.g = other.g;
        this.b = other.b;
    }
}`,
      hints: [
        'A copy constructor takes an instance of the same class.',
        'It copies all fields from the other object.',
        'Use `Color` as the parameter type.',
      ],
      concepts: ['copy constructor', 'object cloning', 'defensive copy'],
    },
    {
      id: 'java-ctor-4',
      title: 'Static initialization block',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Complete the static initialization block.',
      skeleton: `public class Config {
    private static final java.util.Map<String, String> DEFAULTS;
    
    __BLANK__ {
        DEFAULTS = new java.util.HashMap<>();
        DEFAULTS.put("host", "localhost");
        DEFAULTS.put("port", "8080");
    }
}`,
      solution: `public class Config {
    private static final java.util.Map<String, String> DEFAULTS;
    
    static {
        DEFAULTS = new java.util.HashMap<>();
        DEFAULTS.put("host", "localhost");
        DEFAULTS.put("port", "8080");
    }
}`,
      hints: [
        'Static fields can be initialized in a static block.',
        'This block runs once when the class is loaded.',
        'Use `static`.',
      ],
      concepts: ['static block', 'class loading', 'static initialization'],
    },
    {
      id: 'java-ctor-5',
      title: 'Validation in constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Add validation that throws an exception for invalid arguments.',
      skeleton: `public class Age {
    private final int value;
    
    public Age(int value) {
        if (value < 0 || value > 150) {
            __BLANK__ new IllegalArgumentException("Invalid age: " + value);
        }
        this.value = value;
    }
}`,
      solution: `public class Age {
    private final int value;
    
    public Age(int value) {
        if (value < 0 || value > 150) {
            throw new IllegalArgumentException("Invalid age: " + value);
        }
        this.value = value;
    }
}`,
      hints: [
        'To reject invalid arguments, you need to signal an error.',
        'Use the keyword that launches an exception.',
        'Use `throw`.',
      ],
      concepts: ['constructor validation', 'throw', 'IllegalArgumentException'],
    },
    {
      id: 'java-ctor-6',
      title: 'Instance initializer block',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Complete the instance initialization block that runs before the constructor.',
      skeleton: `public class Logger {
    private final long createdAt;
    
    __BLANK__
        createdAt = System.currentTimeMillis();
    }
    
    public Logger() {
        // createdAt is already set
    }
}`,
      solution: `public class Logger {
    private final long createdAt;
    
    {
        createdAt = System.currentTimeMillis();
    }
    
    public Logger() {
        // createdAt is already set
    }
}`,
      hints: [
        'Instance initialization blocks use bare curly braces.',
        'They run before the constructor body.',
        'Just use `{` to start the block.',
      ],
      concepts: ['instance initializer', 'initialization order', 'code block'],
    },
    {
      id: 'java-ctor-7',
      title: 'Builder-style constructor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write an Email class with to, subject, body fields and a constructor plus a static of() factory method.',
      skeleton: '',
      solution: `public class Email {
    private final String to;
    private final String subject;
    private final String body;

    public Email(String to, String subject, String body) {
        this.to = to;
        this.subject = subject;
        this.body = body;
    }

    public static Email of(String to, String subject, String body) {
        return new Email(to, subject, body);
    }

    public String getTo() { return to; }
    public String getSubject() { return subject; }
    public String getBody() { return body; }
}`,
      hints: [
        'Use final fields for immutability.',
        'The static factory method delegates to the constructor.',
        'Add getters for each field.',
      ],
      concepts: ['static factory', 'immutable class', 'constructor'],
    },
    {
      id: 'java-ctor-8',
      title: 'Telescoping constructors',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a Connection class with host, port, timeout fields and three chained constructors (host only, host+port, all three).',
      skeleton: '',
      solution: `public class Connection {
    private final String host;
    private final int port;
    private final int timeout;

    public Connection(String host, int port, int timeout) {
        this.host = host;
        this.port = port;
        this.timeout = timeout;
    }

    public Connection(String host, int port) {
        this(host, port, 5000);
    }

    public Connection(String host) {
        this(host, 80);
    }
}`,
      hints: [
        'Each simpler constructor calls the next one with defaults.',
        'Use this() for constructor chaining.',
        'The most complete constructor does the actual assignment.',
      ],
      concepts: ['constructor chaining', 'telescoping', 'default values'],
    },
    {
      id: 'java-ctor-9',
      title: 'Validated constructor with ranges',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write an RGB class whose constructor validates all three values are 0-255.',
      skeleton: '',
      solution: `public class RGB {
    private final int r, g, b;

    public RGB(int r, int g, int b) {
        this.r = validate(r, "red");
        this.g = validate(g, "green");
        this.b = validate(b, "blue");
    }

    private static int validate(int value, String channel) {
        if (value < 0 || value > 255) {
            throw new IllegalArgumentException(channel + " must be 0-255, got " + value);
        }
        return value;
    }

    public int getR() { return r; }
    public int getG() { return g; }
    public int getB() { return b; }
}`,
      hints: [
        'Extract validation into a helper method for DRY.',
        'Throw IllegalArgumentException for out-of-range values.',
        'The helper can be static since it does not use instance state.',
      ],
      concepts: ['constructor validation', 'helper method', 'IllegalArgumentException'],
    },
    {
      id: 'java-ctor-10',
      title: 'Deep copy constructor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a Matrix class with a 2D int array field and a deep copy constructor.',
      skeleton: '',
      solution: `public class Matrix {
    private final int[][] data;

    public Matrix(int[][] data) {
        this.data = new int[data.length][];
        for (int i = 0; i < data.length; i++) {
            this.data[i] = data[i].clone();
        }
    }

    public Matrix(Matrix other) {
        this(other.data);
    }

    public int get(int row, int col) {
        return data[row][col];
    }
}`,
      hints: [
        'A shallow copy would share the inner arrays.',
        'Clone each row array separately for a deep copy.',
        'The copy constructor can delegate to the array constructor.',
      ],
      concepts: ['deep copy', 'copy constructor', 'array cloning'],
    },
    {
      id: 'java-ctor-11',
      title: 'Constructor with varargs',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a NumberSet class with a varargs constructor that stores unique values.',
      skeleton: '',
      solution: `public class NumberSet {
    private final java.util.Set<Integer> values;

    public NumberSet(int... nums) {
        values = new java.util.LinkedHashSet<>();
        for (int n : nums) {
            values.add(n);
        }
    }

    public int size() {
        return values.size();
    }

    public boolean contains(int n) {
        return values.contains(n);
    }
}`,
      hints: [
        'Use varargs (int...) to accept any number of ints.',
        'Store in a Set to ensure uniqueness.',
        'LinkedHashSet preserves insertion order.',
      ],
      concepts: ['varargs constructor', 'Set', 'unique values'],
    },
    {
      id: 'java-ctor-12',
      title: 'Initialization order demo',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a class that logs initialization order: static block, instance block, constructor.',
      skeleton: '',
      solution: `public class InitOrder {
    private static final java.util.List<String> log = new java.util.ArrayList<>();

    static {
        log.add("static block");
    }

    {
        log.add("instance block");
    }

    public InitOrder() {
        log.add("constructor");
    }

    public static java.util.List<String> getLog() {
        return java.util.Collections.unmodifiableList(log);
    }
}`,
      hints: [
        'Static blocks run once at class loading.',
        'Instance blocks run before each constructor.',
        'The constructor runs last.',
      ],
      concepts: ['initialization order', 'static block', 'instance block'],
    },
    {
      id: 'java-ctor-13',
      title: 'this() not first statement',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the constructor where this() is not the first statement.',
      skeleton: `public class Range {
    private int min, max;
    
    public Range(int min, int max) {
        this.min = min;
        this.max = max;
    }
    
    public Range(int max) {
        System.out.println("Creating range");
        this(0, max);
    }
}`,
      solution: `public class Range {
    private int min, max;
    
    public Range(int min, int max) {
        this.min = min;
        this.max = max;
    }
    
    public Range(int max) {
        this(0, max);
    }
}`,
      hints: [
        'this() must be the very first statement in a constructor.',
        'No code can come before it.',
        'Remove the println or move it to the other constructor.',
      ],
      concepts: ['this()', 'constructor chaining', 'first statement rule'],
    },
    {
      id: 'java-ctor-14',
      title: 'Missing no-arg constructor',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the code that tries to create an object with no arguments when only a parameterized constructor exists.',
      skeleton: `public class Product {
    private String name;
    
    public Product(String name) {
        this.name = name;
    }
}
// Usage: Product p = new Product(); // Compile error`,
      solution: `public class Product {
    private String name;
    
    public Product() {
        this("Unnamed");
    }
    
    public Product(String name) {
        this.name = name;
    }
}`,
      hints: [
        'Once you define any constructor, the default no-arg constructor is gone.',
        'You must explicitly add a no-arg constructor.',
        'Chain it to the parameterized one with a default value.',
      ],
      concepts: ['default constructor', 'constructor overloading', 'chaining'],
    },
    {
      id: 'java-ctor-15',
      title: 'Constructor leaking this',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Fix the constructor that leaks an incomplete this reference to another thread.',
      skeleton: `public class Listener {
    private final int value;
    
    public Listener(int value, java.util.List<Listener> registry) {
        registry.add(this); // leaks this before fully constructed
        this.value = value;
    }
}`,
      solution: `public class Listener {
    private final int value;
    
    public Listener(int value) {
        this.value = value;
    }
    
    public static Listener createAndRegister(int value, java.util.List<Listener> registry) {
        Listener listener = new Listener(value);
        registry.add(listener);
        return listener;
    }
}`,
      hints: [
        'Publishing this in the constructor exposes an incomplete object.',
        'Other threads might see uninitialized fields.',
        'Use a static factory method to register after construction.',
      ],
      concepts: ['this escape', 'constructor safety', 'static factory'],
    },
    {
      id: 'java-ctor-16',
      title: 'Predict initialization order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the order of initialization.',
      skeleton: `class Demo {
    static { System.out.print("S "); }
    { System.out.print("I "); }
    Demo() { System.out.print("C "); }
}
new Demo();
new Demo();`,
      solution: `S I C I C `,
      hints: [
        'Static block runs once when class is first loaded.',
        'Instance block and constructor run for each new object.',
        'Order: S I C I C.',
      ],
      concepts: ['initialization order', 'static block', 'instance block'],
    },
    {
      id: 'java-ctor-17',
      title: 'Predict constructor chaining',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of constructor chaining.',
      skeleton: `class Chain {
    Chain() { this(10); System.out.print("A "); }
    Chain(int x) { this(x, 20); System.out.print("B "); }
    Chain(int x, int y) { System.out.print("C "); }
}
new Chain();`,
      solution: `C B A `,
      hints: [
        'this() calls happen first, before the rest of the body.',
        'Chain() calls Chain(10), which calls Chain(10,20).',
        'Bodies execute in reverse: C first, then B, then A.',
      ],
      concepts: ['constructor chaining', 'execution order', 'this()'],
    },
    {
      id: 'java-ctor-18',
      title: 'Predict final field',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict whether a final field can be set in the constructor.',
      skeleton: `class Immutable {
    final int value;
    Immutable(int v) { this.value = v; }
}
Immutable obj = new Immutable(42);
System.out.println(obj.value);`,
      solution: `42`,
      hints: [
        'Final fields can be assigned once in the constructor.',
        'After that, they cannot be changed.',
        'The value is set to 42.',
      ],
      concepts: ['final field', 'constructor initialization', 'immutability'],
    },
    {
      id: 'java-ctor-19',
      title: 'Refactor to telescoping constructors',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor duplicate initialization code into chained constructors.',
      skeleton: `public class Server {
    private String host;
    private int port;
    private boolean ssl;

    public Server(String host) {
        this.host = host;
        this.port = 80;
        this.ssl = false;
    }

    public Server(String host, int port) {
        this.host = host;
        this.port = port;
        this.ssl = false;
    }

    public Server(String host, int port, boolean ssl) {
        this.host = host;
        this.port = port;
        this.ssl = ssl;
    }
}`,
      solution: `public class Server {
    private final String host;
    private final int port;
    private final boolean ssl;

    public Server(String host, int port, boolean ssl) {
        this.host = host;
        this.port = port;
        this.ssl = ssl;
    }

    public Server(String host, int port) {
        this(host, port, false);
    }

    public Server(String host) {
        this(host, 80);
    }
}`,
      hints: [
        'The most complete constructor should do all assignments.',
        'Simpler constructors chain to it with defaults.',
        'Use this() to delegate.',
      ],
      concepts: ['constructor chaining', 'DRY', 'telescoping'],
    },
    {
      id: 'java-ctor-20',
      title: 'Refactor to static factory',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor the multiple constructors to descriptive static factory methods.',
      skeleton: `public class Duration {
    private final long millis;

    public Duration(long millis) {
        this.millis = millis;
    }

    public Duration(long seconds, boolean isSeconds) {
        this.millis = seconds * 1000;
    }

    public Duration(long minutes, int unused) {
        this.millis = minutes * 60000;
    }
}`,
      solution: `public class Duration {
    private final long millis;

    private Duration(long millis) {
        this.millis = millis;
    }

    public static Duration ofMillis(long millis) {
        return new Duration(millis);
    }

    public static Duration ofSeconds(long seconds) {
        return new Duration(seconds * 1000);
    }

    public static Duration ofMinutes(long minutes) {
        return new Duration(minutes * 60000);
    }

    public long toMillis() {
        return millis;
    }
}`,
      hints: [
        'Static factory methods have descriptive names unlike constructors.',
        'Make the constructor private.',
        'Name each factory to describe what it accepts.',
      ],
      concepts: ['static factory methods', 'named constructors', 'refactoring'],
    },
  ],
};
