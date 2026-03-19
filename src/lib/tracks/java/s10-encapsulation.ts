import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-encapsulation',
  title: '10. Encapsulation',
  explanation: `## Encapsulation

Encapsulation bundles data with methods that operate on it, restricting direct access.

### Principles
- **Private fields**: hide internal state
- **Public methods**: controlled access via getters/setters
- **Validation**: enforce invariants in setters

### Getters and Setters
\`\`\`java
private String name;
public String getName() { return name; }
public void setName(String name) { this.name = name; }
\`\`\`

### Immutable Classes
Make all fields final and private, no setters, defensive copies:
\`\`\`java
public final class Money {
    private final int amount;
    private final String currency;
    // constructor and getters only
}
\`\`\`

### Records (Java 16+)
Compact syntax for immutable data carriers:
\`\`\`java
public record Point(int x, int y) {}
\`\`\`
Automatically generates constructor, getters, equals, hashCode, toString.

### Builder Pattern
For objects with many optional parameters.

### Defensive Copying
Copy mutable objects in constructors and getters to prevent external modification.
`,
  exercises: [
    {
      id: 'java-encap-1',
      title: 'Getter method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write the getter method for a private field.',
      skeleton: `private String name;

public String __BLANK__() {
    return name;
}`,
      solution: `private String name;

public String getName() {
    return name;
}`,
      hints: [
        'Java convention for getters is getFieldName().',
        'The method returns the private field.',
        'Use `getName`.',
      ],
      concepts: ['getter', 'naming convention', 'encapsulation'],
    },
    {
      id: 'java-encap-2',
      title: 'Setter with validation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the setter that validates the age is non-negative.',
      skeleton: `private int age;

public void setAge(int age) {
    if (age __BLANK__ 0) {
        throw new IllegalArgumentException("Age cannot be negative");
    }
    this.age = age;
}`,
      solution: `private int age;

public void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("Age cannot be negative");
    }
    this.age = age;
}`,
      hints: [
        'You want to reject negative ages.',
        'What operator checks if a value is less than zero?',
        'Use `<`.',
      ],
      concepts: ['setter', 'validation', 'IllegalArgumentException'],
    },
    {
      id: 'java-encap-3',
      title: 'Record declaration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Declare a record for a Point with x and y coordinates.',
      skeleton: `public __BLANK__ Point(int x, int y) {}`,
      solution: `public record Point(int x, int y) {}`,
      hints: [
        'Java 16+ has a special kind of class for immutable data.',
        'It auto-generates constructor, getters, equals, hashCode, toString.',
        'Use `record`.',
      ],
      concepts: ['record', 'immutable data', 'Java 16+'],
    },
    {
      id: 'java-encap-4',
      title: 'Final class for immutability',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Prevent the immutable class from being subclassed.',
      skeleton: `public __BLANK__ class ImmutableConfig {
    private final String key;
    private final String value;
    
    public ImmutableConfig(String key, String value) {
        this.key = key;
        this.value = value;
    }
}`,
      solution: `public final class ImmutableConfig {
    private final String key;
    private final String value;
    
    public ImmutableConfig(String key, String value) {
        this.key = key;
        this.value = value;
    }
}`,
      hints: [
        'Subclassing could break immutability guarantees.',
        'Use a keyword to prevent inheritance.',
        'Use `final`.',
      ],
      concepts: ['final class', 'immutability', 'preventing subclass'],
    },
    {
      id: 'java-encap-5',
      title: 'Defensive copy in getter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Return a defensive copy of the mutable Date field.',
      skeleton: `private final java.util.Date created;

public java.util.Date getCreated() {
    return new java.util.Date(created.__BLANK__());
}`,
      solution: `private final java.util.Date created;

public java.util.Date getCreated() {
    return new java.util.Date(created.getTime());
}`,
      hints: [
        'Date is mutable; returning the original allows external modification.',
        'Create a new Date with the same timestamp.',
        'Use `getTime` to get the millisecond value.',
      ],
      concepts: ['defensive copy', 'mutable objects', 'getTime'],
    },
    {
      id: 'java-encap-6',
      title: 'Boolean getter convention',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Use the correct naming convention for a boolean getter.',
      skeleton: `private boolean active;

public boolean __BLANK__() {
    return active;
}`,
      solution: `private boolean active;

public boolean isActive() {
    return active;
}`,
      hints: [
        'Boolean getters use a different prefix than regular getters.',
        'Instead of get, booleans use is.',
        'Use `isActive`.',
      ],
      concepts: ['boolean getter', 'isX convention', 'JavaBeans'],
    },
    {
      id: 'java-encap-7',
      title: 'Immutable money class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write an immutable Money class with amount (int cents) and currency (String). Include add(Money other) that returns a new Money.',
      skeleton: '',
      solution: `public final class Money {
    private final int cents;
    private final String currency;

    public Money(int cents, String currency) {
        this.cents = cents;
        this.currency = currency;
    }

    public Money add(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("Currency mismatch");
        }
        return new Money(this.cents + other.cents, this.currency);
    }

    public int getCents() { return cents; }
    public String getCurrency() { return currency; }
}`,
      hints: [
        'All fields should be final and private.',
        'The add method returns a new Money instead of modifying.',
        'Validate that currencies match before adding.',
      ],
      concepts: ['immutable class', 'value object', 'final fields'],
    },
    {
      id: 'java-encap-8',
      title: 'Builder pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a Pizza class with a static inner Builder that allows setting size, cheese, and pepperoni.',
      skeleton: '',
      solution: `public class Pizza {
    private final String size;
    private final boolean cheese;
    private final boolean pepperoni;

    private Pizza(Builder builder) {
        this.size = builder.size;
        this.cheese = builder.cheese;
        this.pepperoni = builder.pepperoni;
    }

    public static class Builder {
        private final String size;
        private boolean cheese = false;
        private boolean pepperoni = false;

        public Builder(String size) {
            this.size = size;
        }

        public Builder cheese(boolean cheese) {
            this.cheese = cheese;
            return this;
        }

        public Builder pepperoni(boolean pepperoni) {
            this.pepperoni = pepperoni;
            return this;
        }

        public Pizza build() {
            return new Pizza(this);
        }
    }
}`,
      hints: [
        'The builder holds the same fields as the target class.',
        'Each setter returns the builder for chaining.',
        'The build() method creates the final immutable object.',
      ],
      concepts: ['builder pattern', 'fluent API', 'immutable construction'],
    },
    {
      id: 'java-encap-9',
      title: 'Encapsulated list',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a Roster class that wraps a List<String> and provides add, remove, and getAll (returning unmodifiable list).',
      skeleton: '',
      solution: `public class Roster {
    private final java.util.List<String> names = new java.util.ArrayList<>();

    public void add(String name) {
        if (name != null && !name.isBlank()) {
            names.add(name);
        }
    }

    public boolean remove(String name) {
        return names.remove(name);
    }

    public java.util.List<String> getAll() {
        return java.util.Collections.unmodifiableList(names);
    }

    public int size() {
        return names.size();
    }
}`,
      hints: [
        'Never expose the internal list directly.',
        'Return an unmodifiable view to prevent external modification.',
        'Validate inputs in the add method.',
      ],
      concepts: ['encapsulated collection', 'unmodifiable list', 'defensive API'],
    },
    {
      id: 'java-encap-10',
      title: 'Record with compact constructor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a record Email(String address) with a compact constructor that validates the address contains @.',
      skeleton: '',
      solution: `public record Email(String address) {
    public Email {
        if (address == null || !address.contains("@")) {
            throw new IllegalArgumentException("Invalid email: " + address);
        }
    }
}`,
      hints: [
        'Records can have compact constructors without parameter list.',
        'Validation happens in the compact constructor.',
        'Fields are implicitly assigned after the compact constructor.',
      ],
      concepts: ['record', 'compact constructor', 'validation'],
    },
    {
      id: 'java-encap-11',
      title: 'Immutable class with collection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write an immutable Team class with name and List<String> members, using defensive copies.',
      skeleton: '',
      solution: `public final class Team {
    private final String name;
    private final java.util.List<String> members;

    public Team(String name, java.util.List<String> members) {
        this.name = name;
        this.members = java.util.List.copyOf(members);
    }

    public String getName() { return name; }

    public java.util.List<String> getMembers() {
        return members; // already unmodifiable
    }
}`,
      hints: [
        'List.copyOf creates an unmodifiable copy of the input list.',
        'This prevents both external mutation and internal mutation.',
        'The getter can return it directly since it is already unmodifiable.',
      ],
      concepts: ['defensive copy', 'List.copyOf', 'immutable collection'],
    },
    {
      id: 'java-encap-12',
      title: 'Fluent setter API',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a Config class with fluent setters (each returns this) for host, port, and timeout.',
      skeleton: '',
      solution: `public class Config {
    private String host = "localhost";
    private int port = 8080;
    private int timeout = 5000;

    public Config host(String host) {
        this.host = host;
        return this;
    }

    public Config port(int port) {
        this.port = port;
        return this;
    }

    public Config timeout(int timeout) {
        this.timeout = timeout;
        return this;
    }

    public String getHost() { return host; }
    public int getPort() { return port; }
    public int getTimeout() { return timeout; }
}`,
      hints: [
        'Fluent setters return this instead of void.',
        'This allows method chaining: config.host("x").port(80).',
        'Set reasonable defaults for each field.',
      ],
      concepts: ['fluent API', 'method chaining', 'builder-like'],
    },
    {
      id: 'java-encap-13',
      title: 'Mutable list leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the encapsulation leak where the internal list can be modified externally.',
      skeleton: `public class StudentRoster {
    private final java.util.List<String> students = new java.util.ArrayList<>();

    public void addStudent(String name) {
        students.add(name);
    }

    public java.util.List<String> getStudents() {
        return students;
    }
}`,
      solution: `public class StudentRoster {
    private final java.util.List<String> students = new java.util.ArrayList<>();

    public void addStudent(String name) {
        students.add(name);
    }

    public java.util.List<String> getStudents() {
        return java.util.Collections.unmodifiableList(students);
    }
}`,
      hints: [
        'Returning the internal list allows callers to add/remove directly.',
        'Wrap it in an unmodifiable view.',
        'Use Collections.unmodifiableList().',
      ],
      concepts: ['encapsulation leak', 'unmodifiable list', 'defensive getter'],
    },
    {
      id: 'java-encap-14',
      title: 'Missing defensive copy in constructor',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the constructor that stores a mutable list reference directly.',
      skeleton: `public final class Order {
    private final java.util.List<String> items;

    public Order(java.util.List<String> items) {
        this.items = items;
    }

    public java.util.List<String> getItems() {
        return java.util.Collections.unmodifiableList(items);
    }
}`,
      solution: `public final class Order {
    private final java.util.List<String> items;

    public Order(java.util.List<String> items) {
        this.items = new java.util.ArrayList<>(items);
    }

    public java.util.List<String> getItems() {
        return java.util.Collections.unmodifiableList(items);
    }
}`,
      hints: [
        'The caller can still modify their list after passing it.',
        'Copy the list in the constructor.',
        'Use new ArrayList<>(items) for a defensive copy.',
      ],
      concepts: ['defensive copy', 'constructor safety', 'immutability'],
    },
    {
      id: 'java-encap-15',
      title: 'Setter allows null',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the setter that allows null values to be set.',
      skeleton: `public class Profile {
    private String username;

    public void setUsername(String username) {
        this.username = username;
    }
}`,
      solution: `public class Profile {
    private String username;

    public void setUsername(String username) {
        if (username == null || username.isBlank()) {
            throw new IllegalArgumentException("Username cannot be null or blank");
        }
        this.username = username;
    }
}`,
      hints: [
        'A username should never be null or empty.',
        'Add validation at the start of the setter.',
        'Throw IllegalArgumentException for invalid input.',
      ],
      concepts: ['null validation', 'setter validation', 'defensive programming'],
    },
    {
      id: 'java-encap-16',
      title: 'Predict record behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of record equals comparison.',
      skeleton: `record Point(int x, int y) {}
var p1 = new Point(3, 4);
var p2 = new Point(3, 4);
System.out.println(p1.equals(p2));
System.out.println(p1 == p2);`,
      solution: `true
false`,
      hints: [
        'Records auto-generate equals based on all components.',
        'p1 and p2 have the same values, so equals is true.',
        '== compares references; they are different objects.',
      ],
      concepts: ['record', 'equals', 'reference vs value'],
    },
    {
      id: 'java-encap-17',
      title: 'Predict record accessor',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict how record getters work.',
      skeleton: `record Person(String name, int age) {}
var p = new Person("Zan", 30);
System.out.println(p.name());
System.out.println(p.age());`,
      solution: `Zan
30`,
      hints: [
        'Record accessors use the component name directly.',
        'Not getName() but name().',
        'p.name() returns "Zan", p.age() returns 30.',
      ],
      concepts: ['record accessors', 'component methods', 'naming'],
    },
    {
      id: 'java-encap-18',
      title: 'Predict unmodifiable exception',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict what happens when modifying an unmodifiable list.',
      skeleton: `var list = java.util.List.of("a", "b");
try {
    list.add("c");
    System.out.println("Added");
} catch (UnsupportedOperationException e) {
    System.out.println("Cannot modify");
}`,
      solution: `Cannot modify`,
      hints: [
        'List.of() creates an unmodifiable list.',
        'Calling add() throws UnsupportedOperationException.',
        'The catch block prints "Cannot modify".',
      ],
      concepts: ['unmodifiable list', 'UnsupportedOperationException', 'List.of'],
    },
    {
      id: 'java-encap-19',
      title: 'Refactor to record',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor the verbose class to a record.',
      skeleton: `public final class Coordinate {
    private final double lat;
    private final double lon;

    public Coordinate(double lat, double lon) {
        this.lat = lat;
        this.lon = lon;
    }

    public double getLat() { return lat; }
    public double getLon() { return lon; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Coordinate c)) return false;
        return Double.compare(c.lat, lat) == 0 && Double.compare(c.lon, lon) == 0;
    }

    @Override
    public int hashCode() {
        return java.util.Objects.hash(lat, lon);
    }

    @Override
    public String toString() {
        return "Coordinate[lat=" + lat + ", lon=" + lon + "]";
    }
}`,
      solution: `public record Coordinate(double lat, double lon) {}`,
      hints: [
        'Records auto-generate constructor, accessors, equals, hashCode, toString.',
        'All that boilerplate collapses to one line.',
        'Use the record keyword.',
      ],
      concepts: ['record', 'boilerplate reduction', 'refactoring'],
    },
    {
      id: 'java-encap-20',
      title: 'Refactor public fields to encapsulated',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Refactor the class with public mutable fields to proper encapsulation with validation.',
      skeleton: `public class Temperature {
    public double celsius;

    public double toFahrenheit() {
        return celsius * 9.0 / 5.0 + 32;
    }
}`,
      solution: `public class Temperature {
    private double celsius;

    public Temperature(double celsius) {
        setCelsius(celsius);
    }

    public double getCelsius() { return celsius; }

    public void setCelsius(double celsius) {
        if (celsius < -273.15) {
            throw new IllegalArgumentException("Below absolute zero");
        }
        this.celsius = celsius;
    }

    public double toFahrenheit() {
        return celsius * 9.0 / 5.0 + 32;
    }
}`,
      hints: [
        'Make the field private, add getter and validated setter.',
        'Temperature cannot go below absolute zero (-273.15).',
        'Add a constructor that uses the setter for validation.',
      ],
      concepts: ['encapsulation', 'validation', 'getter/setter', 'refactoring'],
    },
  ],
};
