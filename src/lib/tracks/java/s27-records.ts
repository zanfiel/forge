import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-records',
  title: '27. Records',
  explanation: `## Records

Records (Java 16+) are immutable data carriers that auto-generate constructors, accessors, equals, hashCode, and toString.

### Basic Record
\`\`\`java
record Point(int x, int y) {}
// Auto-generates: constructor, x(), y(), equals, hashCode, toString
\`\`\`

### Compact Constructor
\`\`\`java
record Email(String value) {
    Email { // compact constructor (no params)
        if (!value.contains("@")) throw new IllegalArgumentException();
        value = value.toLowerCase(); // reassign component
    }
}
\`\`\`

### Custom Methods
Records can have static methods, instance methods, and implement interfaces:
\`\`\`java
record Range(int lo, int hi) implements Comparable<Range> {
    int size() { return hi - lo; }
    public int compareTo(Range o) { return Integer.compare(size(), o.size()); }
}
\`\`\`

### Restrictions
- Cannot extend classes (implicitly extend Record)
- Fields are final (immutable)
- Cannot declare instance fields beyond components
- Can implement interfaces
`,
  exercises: [
    {
      id: 'java-rec-1',
      title: 'Declare a record',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a record for a 2D point.',
      skeleton: `__BLANK__ Point(double x, double y) {}`,
      solution: `record Point(double x, double y) {}`,
      hints: ['Records use a special keyword.', 'Components go in parentheses after the name.', 'Use `record`.'],
      concepts: ['record', 'declaration', 'components'],
    },
    {
      id: 'java-rec-2',
      title: 'Access record component',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Access the x component of a Point record.',
      skeleton: `Point p = new Point(3.0, 4.0);
double xVal = p.__BLANK__();`,
      solution: `Point p = new Point(3.0, 4.0);
double xVal = p.x();`,
      hints: ['Record accessors are named after the component.', 'No get prefix, just the name.', 'Use `x`.'],
      concepts: ['record accessor', 'component access', 'naming'],
    },
    {
      id: 'java-rec-3',
      title: 'Compact constructor validation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Add validation in a compact constructor.',
      skeleton: `record Age(int value) {
    __BLANK__ {
        if (value < 0) throw new IllegalArgumentException("Negative age");
    }
}`,
      solution: `record Age(int value) {
    Age {
        if (value < 0) throw new IllegalArgumentException("Negative age");
    }
}`,
      hints: ['Compact constructors use the record name without parameters.', 'They validate or normalize components.', 'Use `Age` (the record name).'],
      concepts: ['compact constructor', 'validation', 'record'],
    },
    {
      id: 'java-rec-4',
      title: 'Record implements interface',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Make a record implement Comparable.',
      skeleton: `record Temperature(double celsius) __BLANK__ Comparable<Temperature> {
    public int compareTo(Temperature other) {
        return Double.compare(this.celsius, other.celsius);
    }
}`,
      solution: `record Temperature(double celsius) implements Comparable<Temperature> {
    public int compareTo(Temperature other) {
        return Double.compare(this.celsius, other.celsius);
    }
}`,
      hints: ['Records can implement interfaces.', 'Use the same keyword as classes.', 'Use `implements`.'],
      concepts: ['record interface', 'Comparable', 'implements'],
    },
    {
      id: 'java-rec-5',
      title: 'Record with custom method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Add a custom instance method to a record.',
      skeleton: `record Rectangle(double width, double height) {
    double __BLANK__() {
        return width * height;
    }
}`,
      solution: `record Rectangle(double width, double height) {
    double area() {
        return width * height;
    }
}`,
      hints: ['Records can have custom methods.', 'This method calculates the area.', 'Use `area`.'],
      concepts: ['record method', 'computed property', 'instance method'],
    },
    {
      id: 'java-rec-6',
      title: 'Record static factory',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Add a static factory method to a record.',
      skeleton: `record Color(int r, int g, int b) {
    __BLANK__ Color fromHex(String hex) {
        int r = Integer.parseInt(hex.substring(1, 3), 16);
        int g = Integer.parseInt(hex.substring(3, 5), 16);
        int b = Integer.parseInt(hex.substring(5, 7), 16);
        return new Color(r, g, b);
    }
}`,
      solution: `record Color(int r, int g, int b) {
    static Color fromHex(String hex) {
        int r = Integer.parseInt(hex.substring(1, 3), 16);
        int g = Integer.parseInt(hex.substring(3, 5), 16);
        int b = Integer.parseInt(hex.substring(5, 7), 16);
        return new Color(r, g, b);
    }
}`,
      hints: ['Factory methods are static.', 'They return a new instance of the record.', 'Use `static`.'],
      concepts: ['static factory', 'record', 'factory method'],
    },
    {
      id: 'java-rec-7',
      title: 'Record with validation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a record Email with a compact constructor that validates the email contains @ and normalizes to lowercase.',
      skeleton: '',
      solution: `record Email(String value) {
    Email {
        if (value == null || !value.contains("@")) {
            throw new IllegalArgumentException("Invalid email: " + value);
        }
        value = value.toLowerCase();
    }
}`,
      hints: ['Use a compact constructor for validation.', 'Reassign the component to normalize.', 'Check for null and @ symbol.'],
      concepts: ['compact constructor', 'validation', 'normalization'],
    },
    {
      id: 'java-rec-8',
      title: 'Record with derived value',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a record FullName(String first, String last) with a method fullName() that returns "first last".',
      skeleton: '',
      solution: `record FullName(String first, String last) {
    String fullName() {
        return first + " " + last;
    }
}`,
      hints: ['Add a custom instance method.', 'Access components directly by name.', 'Concatenate with a space.'],
      concepts: ['record method', 'derived value', 'string concatenation'],
    },
    {
      id: 'java-rec-9',
      title: 'Record builder pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a record Config(String host, int port, boolean ssl) with a withPort method that returns a new Config with the port changed.',
      skeleton: '',
      solution: `record Config(String host, int port, boolean ssl) {
    Config withPort(int newPort) {
        return new Config(host, newPort, ssl);
    }

    Config withSsl(boolean newSsl) {
        return new Config(host, port, newSsl);
    }
}`,
      hints: ['Records are immutable, so return a new instance.', 'Copy all other fields, change only the target.', 'This is called a wither pattern.'],
      concepts: ['wither pattern', 'immutability', 'record copy'],
    },
    {
      id: 'java-rec-10',
      title: 'Sealed interface with records',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a sealed interface Shape with records Circle(double radius) and Rect(double w, double h) as permitted types, each with an area() method.',
      skeleton: '',
      solution: `sealed interface Shape permits Circle, Rect {
    double area();
}

record Circle(double radius) implements Shape {
    public double area() { return Math.PI * radius * radius; }
}

record Rect(double w, double h) implements Shape {
    public double area() { return w * h; }
}`,
      hints: ['Sealed interfaces restrict which types can implement them.', 'Records can implement sealed interfaces.', 'Each record provides its own area implementation.'],
      concepts: ['sealed interface', 'record', 'polymorphism'],
    },
    {
      id: 'java-rec-11',
      title: 'Record as map key',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write code demonstrating that records work correctly as HashMap keys due to auto-generated equals/hashCode.',
      skeleton: '',
      solution: `record Coord(int x, int y) {}

Map<Coord, String> map = new HashMap<>();
map.put(new Coord(1, 2), "A");
map.put(new Coord(3, 4), "B");
String val = map.get(new Coord(1, 2)); // "A" - works because equals/hashCode are generated`,
      hints: ['Records auto-generate equals and hashCode.', 'Two records with same components are equal.', 'This makes them safe as map keys.'],
      concepts: ['record equals', 'hashCode', 'value semantics'],
    },
    {
      id: 'java-rec-12',
      title: 'Generic record',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a generic record Pair<A, B> with components first and second.',
      skeleton: '',
      solution: `record Pair<A, B>(A first, B second) {
    static <A, B> Pair<A, B> of(A first, B second) {
        return new Pair<>(first, second);
    }
}`,
      hints: ['Records support type parameters.', 'Add a static factory method for convenience.', 'The components use the generic types.'],
      concepts: ['generic record', 'type parameters', 'factory method'],
    },
    {
      id: 'java-rec-13',
      title: 'Record with mutable component',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the record that allows mutation through a mutable component.',
      skeleton: `record Team(String name, List<String> members) {}

Team team = new Team("A", new ArrayList<>(List.of("Alice")));
team.members().add("Bob"); // Mutates the "immutable" record!`,
      solution: `record Team(String name, List<String> members) {
    Team {
        members = List.copyOf(members);
    }
}`,
      hints: ['Record fields are final but objects can still be mutable.', 'Make a defensive copy in the compact constructor.', 'List.copyOf creates an unmodifiable copy.'],
      concepts: ['defensive copy', 'immutability', 'mutable component'],
    },
    {
      id: 'java-rec-14',
      title: 'Record canonical constructor error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the record that incorrectly declares the canonical constructor.',
      skeleton: `record Point(int x, int y) {
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
        // Missing: must assign all components
        if (x < 0 || y < 0) throw new IllegalArgumentException();
    }
}`,
      solution: `record Point(int x, int y) {
    Point {
        if (x < 0 || y < 0) throw new IllegalArgumentException();
    }
}`,
      hints: ['Use the compact constructor instead of the canonical one.', 'The compact constructor auto-assigns all fields.', 'Remove the explicit parameter list and assignments.'],
      concepts: ['compact constructor', 'canonical constructor', 'record'],
    },
    {
      id: 'java-rec-15',
      title: 'Record inheritance attempt',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the record that tries to extend a class.',
      skeleton: `class Shape {}
record Circle(double radius) extends Shape {} // Records cannot extend classes`,
      solution: `interface Shape {
    double area();
}
record Circle(double radius) implements Shape {
    public double area() { return Math.PI * radius * radius; }
}`,
      hints: ['Records cannot extend classes; they implicitly extend Record.', 'Use an interface instead.', 'Records can implement interfaces.'],
      concepts: ['record restrictions', 'interface', 'extends vs implements'],
    },
    {
      id: 'java-rec-16',
      title: 'Predict record toString',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the toString output of a record.',
      skeleton: `record Person(String name, int age) {}
System.out.println(new Person("Alice", 30));`,
      solution: `Person[name=Alice, age=30]`,
      hints: ['Records auto-generate toString.', 'Format is RecordName[component=value, ...].', 'Components are listed in order.'],
      concepts: ['record toString', 'auto-generated', 'format'],
    },
    {
      id: 'java-rec-17',
      title: 'Predict record equals',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the equality comparison of records.',
      skeleton: `record Point(int x, int y) {}
Point a = new Point(1, 2);
Point b = new Point(1, 2);
System.out.println(a.equals(b));
System.out.println(a == b);`,
      solution: `true
false`,
      hints: ['Records auto-generate equals based on component values.', 'equals compares values, == compares references.', 'Same values but different objects.'],
      concepts: ['record equals', 'value equality', 'reference equality'],
    },
    {
      id: 'java-rec-18',
      title: 'Predict compact constructor',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output after compact constructor normalization.',
      skeleton: `record Name(String value) {
    Name { value = value.trim().toUpperCase(); }
}
Name n = new Name("  hello  ");
System.out.println(n.value());`,
      solution: `HELLO`,
      hints: ['The compact constructor normalizes the value.', 'trim removes whitespace, toUpperCase converts.', 'The stored value is "HELLO".'],
      concepts: ['compact constructor', 'normalization', 'component reassignment'],
    },
    {
      id: 'java-rec-19',
      title: 'Refactor class to record',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Refactor this POJO class to a record.',
      skeleton: `final class Money {
    private final double amount;
    private final String currency;

    public Money(double amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public double getAmount() { return amount; }
    public String getCurrency() { return currency; }

    @Override public boolean equals(Object o) {
        if (!(o instanceof Money m)) return false;
        return Double.compare(m.amount, amount) == 0 && currency.equals(m.currency);
    }
    @Override public int hashCode() { return Objects.hash(amount, currency); }
    @Override public String toString() { return "Money[amount=" + amount + ", currency=" + currency + "]"; }
}`,
      solution: `record Money(double amount, String currency) {}`,
      hints: ['Records auto-generate constructor, accessors, equals, hashCode, and toString.', 'All the boilerplate is eliminated.', 'Just declare the components.'],
      concepts: ['record', 'boilerplate elimination', 'refactoring'],
    },
    {
      id: 'java-rec-20',
      title: 'Refactor to record with validation',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this class with validation to a record with a compact constructor.',
      skeleton: `final class Percentage {
    private final double value;

    public Percentage(double value) {
        if (value < 0 || value > 100) {
            throw new IllegalArgumentException("Must be 0-100");
        }
        this.value = value;
    }

    public double getValue() { return value; }
    @Override public boolean equals(Object o) {
        return o instanceof Percentage p && Double.compare(p.value, value) == 0;
    }
    @Override public int hashCode() { return Double.hashCode(value); }
    @Override public String toString() { return value + "%"; }
}`,
      solution: `record Percentage(double value) {
    Percentage {
        if (value < 0 || value > 100) {
            throw new IllegalArgumentException("Must be 0-100");
        }
    }

    @Override
    public String toString() {
        return value + "%";
    }
}`,
      hints: ['Move validation to a compact constructor.', 'Override toString for custom format.', 'equals and hashCode are auto-generated.'],
      concepts: ['compact constructor', 'validation', 'toString override'],
    },
  ],
};
