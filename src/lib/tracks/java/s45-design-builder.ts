import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-builder',
  title: '45. Builder Pattern',
  explanation: `## Builder Pattern in Java

The **Builder Pattern** separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

### Why Use Builders?

When a class has many parameters (especially optional ones), constructors become unwieldy:

\`\`\`java
// Telescoping constructor anti-pattern
Pizza p = new Pizza("large", true, false, true, false, "thin", "tomato");
\`\`\`

A builder provides a fluent, readable API:

\`\`\`java
Pizza p = new Pizza.Builder("large")
    .cheese(true)
    .pepperoni(true)
    .crust("thin")
    .sauce("tomato")
    .build();
\`\`\`

### Classic Builder (GoF)

\`\`\`java
public class Pizza {
    private final String size;
    private final boolean cheese;
    private final boolean pepperoni;

    private Pizza(Builder builder) {
        this.size = builder.size;
        this.cheese = builder.cheese;
        this.pepperoni = builder.pepperoni;
    }

    public static class Builder {
        private final String size; // required
        private boolean cheese = false;
        private boolean pepperoni = false;

        public Builder(String size) {
            this.size = size;
        }

        public Builder cheese(boolean val) {
            this.cheese = val;
            return this;
        }

        public Builder pepperoni(boolean val) {
            this.pepperoni = val;
            return this;
        }

        public Pizza build() {
            return new Pizza(this);
        }
    }
}
\`\`\`

### Immutable Objects via Builders

Builders naturally produce immutable objects by making all fields \`final\` and providing no setters. The outer class constructor is private, forcing use of the builder.

### Generic Builders

You can create generic builders using recursive generics:

\`\`\`java
public abstract class Builder<T, B extends Builder<T, B>> {
    protected abstract B self();
    public abstract T build();
}
\`\`\`

### Director Pattern

A Director encapsulates common build sequences:

\`\`\`java
public class PizzaDirector {
    public Pizza makeMargherita(Pizza.Builder builder) {
        return builder.cheese(true).sauce("tomato").build();
    }
}
\`\`\`

### Record Builders (Java 16+)

Records can benefit from builders since they lack setter methods:

\`\`\`java
public record User(String name, int age, String email) {
    public static class Builder {
        private String name;
        private int age;
        private String email;

        public Builder name(String name) { this.name = name; return this; }
        public Builder age(int age) { this.age = age; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public User build() { return new User(name, age, email); }
    }
}
\`\`\``,
  exercises: [
    {
      id: 'java-builder-1',
      title: 'Simple Builder Skeleton',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the inner Builder class so it returns itself for fluent chaining.',
      skeleton: `public class Car {
    private final String make;
    private final String model;

    private Car(Builder builder) {
        this.make = builder.make;
        this.model = builder.model;
    }

    public static class Builder {
        private String make;
        private String model;

        public Builder make(String make) {
            this.make = make;
            __BLANK__;
        }

        public Builder model(String model) {
            this.model = model;
            __BLANK__;
        }

        public Car build() {
            return __BLANK__;
        }
    }
}`,
      solution: `public class Car {
    private final String make;
    private final String model;

    private Car(Builder builder) {
        this.make = builder.make;
        this.model = builder.model;
    }

    public static class Builder {
        private String make;
        private String model;

        public Builder make(String make) {
            this.make = make;
            return this;
        }

        public Builder model(String model) {
            this.model = model;
            return this;
        }

        public Car build() {
            return new Car(this);
        }
    }
}`,
      hints: [
        'Each setter method must return the builder itself for chaining.',
        'Use "return this" to enable fluent method calls.',
        'The build() method constructs the outer class passing "this" builder.',
      ],
      concepts: ['builder-pattern', 'fluent-interface', 'return-this'],
    },
    {
      id: 'java-builder-2',
      title: 'Using a Builder',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Use a fluent builder to construct a Car object with make "Toyota" and model "Camry".',
      skeleton: `Car car = __BLANK__
    .make("Toyota")
    __BLANK__("Camry")
    __BLANK__;`,
      solution: `Car car = new Car.Builder()
    .make("Toyota")
    .model("Camry")
    .build();`,
      hints: [
        'You need to create a new instance of the inner Builder class.',
        'Chain .model("Camry") after .make("Toyota").',
        'End the chain with .build() to get the Car.',
      ],
      concepts: ['builder-pattern', 'fluent-api', 'method-chaining'],
    },
    {
      id: 'java-builder-3',
      title: 'Required Parameters in Builder',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Make "name" a required parameter by enforcing it through the Builder constructor.',
      skeleton: `public class User {
    private final String name;
    private int age;

    private User(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
    }

    public static class Builder {
        private final __BLANK__;
        private int age = 0;

        public Builder(__BLANK__) {
            this.name = name;
        }

        public Builder age(int age) {
            this.age = age;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }
}`,
      solution: `public class User {
    private final String name;
    private int age;

    private User(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
    }

    public static class Builder {
        private final String name;
        private int age = 0;

        public Builder(String name) {
            this.name = name;
        }

        public Builder age(int age) {
            this.age = age;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }
}`,
      hints: [
        'Required parameters are declared as final fields in the Builder.',
        'The Builder constructor takes required parameters as arguments.',
        'String name is required, so the constructor is Builder(String name).',
      ],
      concepts: ['builder-pattern', 'required-parameters', 'final-fields'],
    },
    {
      id: 'java-builder-4',
      title: 'Builder with Validation',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a build() method that validates the email field is not null before constructing the object. Throw IllegalStateException if email is null.',
      skeleton: `public static class Builder {
    private String name;
    private String email;

    public Builder name(String name) { this.name = name; return this; }
    public Builder email(String email) { this.email = email; return this; }

    // Write the build() method with validation
}`,
      solution: `public static class Builder {
    private String name;
    private String email;

    public Builder name(String name) { this.name = name; return this; }
    public Builder email(String email) { this.email = email; return this; }

    public Contact build() {
        if (email == null) {
            throw new IllegalStateException("Email is required");
        }
        return new Contact(this);
    }
}`,
      hints: [
        'Check if email is null before constructing the object.',
        'Throw an IllegalStateException with a descriptive message.',
        'After validation, return new Contact(this).',
      ],
      concepts: ['builder-pattern', 'validation', 'illegal-state-exception'],
    },
    {
      id: 'java-builder-5',
      title: 'Builder with Collection Field',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write addIngredient() and build() methods for a Sandwich builder that accumulates ingredients into a list.',
      skeleton: `public class Sandwich {
    private final String bread;
    private final List<String> ingredients;

    private Sandwich(Builder builder) {
        this.bread = builder.bread;
        this.ingredients = List.copyOf(builder.ingredients);
    }

    public static class Builder {
        private String bread;
        private List<String> ingredients = new ArrayList<>();

        public Builder bread(String bread) {
            this.bread = bread;
            return this;
        }

        // Write addIngredient(String ingredient) method

        // Write build() method
    }
}`,
      solution: `public class Sandwich {
    private final String bread;
    private final List<String> ingredients;

    private Sandwich(Builder builder) {
        this.bread = builder.bread;
        this.ingredients = List.copyOf(builder.ingredients);
    }

    public static class Builder {
        private String bread;
        private List<String> ingredients = new ArrayList<>();

        public Builder bread(String bread) {
            this.bread = bread;
            return this;
        }

        public Builder addIngredient(String ingredient) {
            this.ingredients.add(ingredient);
            return this;
        }

        public Sandwich build() {
            return new Sandwich(this);
        }
    }
}`,
      hints: [
        'addIngredient should add to the list and return this.',
        'The pattern is the same: mutate state, return this.',
        'build() simply returns new Sandwich(this).',
      ],
      concepts: ['builder-pattern', 'collections', 'defensive-copy'],
    },
    {
      id: 'java-builder-6',
      title: 'Fix the Broken Builder',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the builder so it actually sets the fields on the built object and allows chaining.',
      skeleton: `public class Config {
    private final int timeout;
    private final String host;

    private Config(Builder builder) {
        this.timeout = builder.timeout;
        this.host = builder.host;
    }

    public static class Builder {
        private int timeout;
        private String host;

        public void timeout(int timeout) {
            timeout = timeout;
        }

        public void host(String host) {
            host = host;
        }

        public Config build() {
            return new Config(this);
        }
    }
}`,
      solution: `public class Config {
    private final int timeout;
    private final String host;

    private Config(Builder builder) {
        this.timeout = builder.timeout;
        this.host = builder.host;
    }

    public static class Builder {
        private int timeout;
        private String host;

        public Builder timeout(int timeout) {
            this.timeout = timeout;
            return this;
        }

        public Builder host(String host) {
            this.host = host;
            return this;
        }

        public Config build() {
            return new Config(this);
        }
    }
}`,
      hints: [
        'Look at the assignment statements -- are they assigning to the field or the parameter?',
        'Use this.timeout = timeout to assign to the field, not the parameter shadow.',
        'Methods should return Builder (not void) and "return this" for chaining.',
      ],
      concepts: ['builder-pattern', 'shadowing', 'this-keyword'],
    },
    {
      id: 'java-builder-7',
      title: 'Predict Builder Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output of this builder usage.',
      skeleton: `public class Message {
    private final String from;
    private final String to;
    private final String body;

    private Message(Builder b) {
        this.from = b.from; this.to = b.to; this.body = b.body;
    }
    public String toString() {
        return from + " -> " + to + ": " + body;
    }

    public static class Builder {
        private String from = "anon";
        private String to = "all";
        private String body = "";
        public Builder from(String f) { this.from = f; return this; }
        public Builder to(String t) { this.to = t; return this; }
        public Builder body(String b) { this.body = b; return this; }
        public Message build() { return new Message(this); }
    }
}
// What does this print?
Message m = new Message.Builder().to("Bob").body("Hi").build();
System.out.println(m);`,
      solution: `anon -> Bob: Hi`,
      hints: [
        'from is not set, so it uses its default value.',
        'Default for from is "anon".',
        'The toString format is: from + " -> " + to + ": " + body.',
      ],
      concepts: ['builder-pattern', 'default-values', 'toString'],
    },
    {
      id: 'java-builder-8',
      title: 'Immutable Builder Product',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Make the built product fully immutable by using defensive copies for the list field.',
      skeleton: `public class Order {
    private final String customer;
    private final __BLANK__ items;

    private Order(Builder builder) {
        this.customer = builder.customer;
        this.items = __BLANK__;
    }

    public List<String> getItems() {
        return __BLANK__;
    }

    public static class Builder {
        private String customer;
        private List<String> items = new ArrayList<>();

        public Builder customer(String c) { this.customer = c; return this; }
        public Builder addItem(String item) { this.items.add(item); return this; }

        public Order build() { return new Order(this); }
    }
}`,
      solution: `public class Order {
    private final String customer;
    private final List<String> items;

    private Order(Builder builder) {
        this.customer = builder.customer;
        this.items = List.copyOf(builder.items);
    }

    public List<String> getItems() {
        return Collections.unmodifiableList(items);
    }

    public static class Builder {
        private String customer;
        private List<String> items = new ArrayList<>();

        public Builder customer(String c) { this.customer = c; return this; }
        public Builder addItem(String item) { this.items.add(item); return this; }

        public Order build() { return new Order(this); }
    }
}`,
      hints: [
        'The field type is List<String>.',
        'Use List.copyOf() to create an immutable copy in the constructor.',
        'The getter should return an unmodifiable view with Collections.unmodifiableList().',
      ],
      concepts: ['immutability', 'defensive-copy', 'unmodifiable-collections'],
    },
    {
      id: 'java-builder-9',
      title: 'Step Builder Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Implement a Step Builder using interfaces that forces the caller to set name, then email, then optionally age, then build. Each step returns the next interface.',
      skeleton: `public class Person {
    private final String name;
    private final String email;
    private final int age;

    private Person(String name, String email, int age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }

    // Define the step interfaces and the Steps inner class
    // NameStep -> EmailStep -> FinalStep (with age() and build())
}`,
      solution: `public class Person {
    private final String name;
    private final String email;
    private final int age;

    private Person(String name, String email, int age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }

    public interface NameStep {
        EmailStep name(String name);
    }

    public interface EmailStep {
        FinalStep email(String email);
    }

    public interface FinalStep {
        FinalStep age(int age);
        Person build();
    }

    public static NameStep builder() {
        return new Steps();
    }

    private static class Steps implements NameStep, EmailStep, FinalStep {
        private String name;
        private String email;
        private int age = 0;

        public EmailStep name(String name) { this.name = name; return this; }
        public FinalStep email(String email) { this.email = email; return this; }
        public FinalStep age(int age) { this.age = age; return this; }
        public Person build() { return new Person(name, email, age); }
    }
}`,
      hints: [
        'Each step is an interface with a method returning the next step interface.',
        'A single inner class implements all step interfaces.',
        'The static builder() method returns the first step interface type.',
      ],
      concepts: ['step-builder', 'interface-chaining', 'compile-time-safety'],
    },
    {
      id: 'java-builder-10',
      title: 'Director Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a HouseDirector class with methods makeWoodenHouse() and makeBrickHouse() that use a HouseBuilder to construct pre-configured houses.',
      skeleton: `// Given:
public class House {
    private final String walls;
    private final String roof;
    private final int rooms;
    // constructor, getters omitted

    public static class Builder {
        private String walls; private String roof; private int rooms;
        public Builder walls(String w) { this.walls = w; return this; }
        public Builder roof(String r) { this.roof = r; return this; }
        public Builder rooms(int r) { this.rooms = r; return this; }
        public House build() { return new House(this); }
    }
}

// Write the HouseDirector class with makeWoodenHouse() and makeBrickHouse()`,
      solution: `public class HouseDirector {
    public House makeWoodenHouse() {
        return new House.Builder()
            .walls("wood")
            .roof("thatch")
            .rooms(3)
            .build();
    }

    public House makeBrickHouse() {
        return new House.Builder()
            .walls("brick")
            .roof("tile")
            .rooms(5)
            .build();
    }
}`,
      hints: [
        'The Director encapsulates specific build sequences.',
        'Each method creates a new Builder, sets predefined values, and calls build().',
        'makeWoodenHouse uses wood/thatch/3, makeBrickHouse uses brick/tile/5.',
      ],
      concepts: ['director-pattern', 'builder-pattern', 'encapsulation'],
    },
    {
      id: 'java-builder-11',
      title: 'Fix the Mutable Builder Product',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'The built object is supposed to be immutable, but the list can be modified after construction. Fix it.',
      skeleton: `public class Playlist {
    private final String name;
    private final List<String> songs;

    private Playlist(Builder builder) {
        this.name = builder.name;
        this.songs = builder.songs;
    }

    public List<String> getSongs() {
        return songs;
    }

    public static class Builder {
        private String name;
        private List<String> songs = new ArrayList<>();

        public Builder name(String n) { this.name = n; return this; }
        public Builder addSong(String s) { songs.add(s); return this; }
        public Playlist build() { return new Playlist(this); }
    }
}`,
      solution: `public class Playlist {
    private final String name;
    private final List<String> songs;

    private Playlist(Builder builder) {
        this.name = builder.name;
        this.songs = List.copyOf(builder.songs);
    }

    public List<String> getSongs() {
        return songs;
    }

    public static class Builder {
        private String name;
        private List<String> songs = new ArrayList<>();

        public Builder name(String n) { this.name = n; return this; }
        public Builder addSong(String s) { songs.add(s); return this; }
        public Playlist build() { return new Playlist(this); }
    }
}`,
      hints: [
        'The constructor stores a direct reference to the builder list.',
        'Modifying the builder list after build() would change the Playlist.',
        'Use List.copyOf() to create an unmodifiable copy of the list.',
      ],
      concepts: ['immutability', 'defensive-copy', 'builder-pattern'],
    },
    {
      id: 'java-builder-12',
      title: 'Predict Step Builder Compile Error',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Determine whether this Step Builder usage compiles or causes a compile error, and explain why.',
      skeleton: `// Given the Step Builder from exercise 9:
// NameStep -> EmailStep -> FinalStep (with age() and build())

Person p = Person.builder()
    .email("a@b.com")
    .name("Alice")
    .build();

// Does this compile? What happens?`,
      solution: `Compile error: NameStep interface does not have an email() method. The builder() method returns NameStep, which only has name(). You must call name() first, then email().`,
      hints: [
        'builder() returns a NameStep, which only has a name() method.',
        'email() is on EmailStep, not NameStep.',
        'The step builder enforces the order: name -> email -> optional age -> build.',
      ],
      concepts: ['step-builder', 'compile-time-safety', 'interface-types'],
    },
    {
      id: 'java-builder-13',
      title: 'Generic Builder Base Class',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Complete the generic builder base class using recursive generics so subclass builders return the correct type.',
      skeleton: `public abstract class BaseBuilder<T, B extends __BLANK__> {
    protected abstract __BLANK__ self();
    public abstract T build();
}

public class EmailBuilder extends BaseBuilder<Email, EmailBuilder> {
    private String to;
    private String subject;

    @Override
    protected __BLANK__ self() {
        return this;
    }

    public EmailBuilder to(String to) {
        this.to = to;
        return __BLANK__;
    }

    public EmailBuilder subject(String subject) {
        this.subject = subject;
        return self();
    }

    @Override
    public Email build() {
        return new Email(to, subject);
    }
}`,
      solution: `public abstract class BaseBuilder<T, B extends BaseBuilder<T, B>> {
    protected abstract B self();
    public abstract T build();
}

public class EmailBuilder extends BaseBuilder<Email, EmailBuilder> {
    private String to;
    private String subject;

    @Override
    protected EmailBuilder self() {
        return this;
    }

    public EmailBuilder to(String to) {
        this.to = to;
        return self();
    }

    public EmailBuilder subject(String subject) {
        this.subject = subject;
        return self();
    }

    @Override
    public Email build() {
        return new Email(to, subject);
    }
}`,
      hints: [
        'The recursive generic bound is B extends BaseBuilder<T, B>.',
        'self() returns type B, which is the concrete builder type.',
        'In EmailBuilder, self() returns EmailBuilder and "return this".',
      ],
      concepts: ['generic-builder', 'recursive-generics', 'self-type'],
    },
    {
      id: 'java-builder-14',
      title: 'Record Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a Builder for the given Java record, since records have no setters and all-args constructor only.',
      skeleton: `public record Product(String name, double price, String category) {

    // Write a static Builder class for this record
    // with name(), price(), category() methods and build()
}`,
      solution: `public record Product(String name, double price, String category) {

    public static class Builder {
        private String name;
        private double price;
        private String category = "general";

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder price(double price) {
            this.price = price;
            return this;
        }

        public Builder category(String category) {
            this.category = category;
            return this;
        }

        public Product build() {
            return new Product(name, price, category);
        }
    }
}`,
      hints: [
        'Records have an implicit all-args canonical constructor.',
        'The builder accumulates fields and calls new Product(name, price, category).',
        'You can provide a default for category ("general") to make it optional.',
      ],
      concepts: ['record-builder', 'java-records', 'builder-pattern'],
    },
    {
      id: 'java-builder-15',
      title: 'Builder with Copy Constructor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Add a static toBuilder() method on the immutable class that returns a pre-populated Builder from an existing instance, enabling modifications of immutable objects.',
      skeleton: `public class Settings {
    private final String theme;
    private final int fontSize;
    private final boolean darkMode;

    private Settings(Builder builder) {
        this.theme = builder.theme;
        this.fontSize = builder.fontSize;
        this.darkMode = builder.darkMode;
    }

    // Write toBuilder() instance method that returns a pre-populated Builder

    public static class Builder {
        private String theme;
        private int fontSize;
        private boolean darkMode;

        public Builder() {}

        // Write a constructor Builder(Settings s) that copies fields

        public Builder theme(String t) { this.theme = t; return this; }
        public Builder fontSize(int f) { this.fontSize = f; return this; }
        public Builder darkMode(boolean d) { this.darkMode = d; return this; }
        public Settings build() { return new Settings(this); }
    }
}`,
      solution: `public class Settings {
    private final String theme;
    private final int fontSize;
    private final boolean darkMode;

    private Settings(Builder builder) {
        this.theme = builder.theme;
        this.fontSize = builder.fontSize;
        this.darkMode = builder.darkMode;
    }

    public Builder toBuilder() {
        return new Builder(this);
    }

    public static class Builder {
        private String theme;
        private int fontSize;
        private boolean darkMode;

        public Builder() {}

        public Builder(Settings s) {
            this.theme = s.theme;
            this.fontSize = s.fontSize;
            this.darkMode = s.darkMode;
        }

        public Builder theme(String t) { this.theme = t; return this; }
        public Builder fontSize(int f) { this.fontSize = f; return this; }
        public Builder darkMode(boolean d) { this.darkMode = d; return this; }
        public Settings build() { return new Settings(this); }
    }
}`,
      hints: [
        'toBuilder() creates a new Builder pre-populated with this objects fields.',
        'The Builder needs a copy constructor that takes a Settings instance.',
        'The copy constructor reads from the Settings object private fields (accessible within the enclosing class).',
      ],
      concepts: ['copy-builder', 'immutability', 'with-pattern'],
    },
    {
      id: 'java-builder-16',
      title: 'Predict Reused Builder Output',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Predict what happens when a builder is reused to create two objects.',
      skeleton: `Car.Builder b = new Car.Builder();
b.make("Honda").model("Civic");
Car c1 = b.build();

b.model("Accord");
Car c2 = b.build();

System.out.println(c1.getMake() + " " + c1.getModel());
System.out.println(c2.getMake() + " " + c2.getModel());

// Assume Car stores copies of builder fields (immutable product).`,
      solution: `Honda Civic
Honda Accord`,
      hints: [
        'The builder is mutable; calling model("Accord") changes the builder state.',
        'Each build() creates a new Car from the builder current state.',
        'c1 was built before the model was changed, so it keeps "Civic".',
      ],
      concepts: ['builder-reuse', 'mutable-builder', 'immutable-product'],
    },
    {
      id: 'java-builder-17',
      title: 'Builder with Type-Safe Enum Fields',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a complete HttpRequest builder with enum-based method field, String url, Map<String,String> headers, and optional String body. Include validation in build().',
      skeleton: `public class HttpRequest {
    public enum Method { GET, POST, PUT, DELETE }

    private final Method method;
    private final String url;
    private final Map<String, String> headers;
    private final String body;

    private HttpRequest(Builder builder) {
        this.method = builder.method;
        this.url = builder.url;
        this.headers = Map.copyOf(builder.headers);
        this.body = builder.body;
    }

    // Write the complete Builder class
    // - method and url are required (constructor params)
    // - header(key, val) adds a header
    // - body(String) sets body
    // - build() validates: GET/DELETE must not have body
}`,
      solution: `public class HttpRequest {
    public enum Method { GET, POST, PUT, DELETE }

    private final Method method;
    private final String url;
    private final Map<String, String> headers;
    private final String body;

    private HttpRequest(Builder builder) {
        this.method = builder.method;
        this.url = builder.url;
        this.headers = Map.copyOf(builder.headers);
        this.body = builder.body;
    }

    public static class Builder {
        private final Method method;
        private final String url;
        private final Map<String, String> headers = new LinkedHashMap<>();
        private String body;

        public Builder(Method method, String url) {
            this.method = method;
            this.url = url;
        }

        public Builder header(String key, String value) {
            this.headers.put(key, value);
            return this;
        }

        public Builder body(String body) {
            this.body = body;
            return this;
        }

        public HttpRequest build() {
            if (body != null && (method == Method.GET || method == Method.DELETE)) {
                throw new IllegalStateException(method + " requests must not have a body");
            }
            return new HttpRequest(this);
        }
    }
}`,
      hints: [
        'Required fields (method, url) go in the Builder constructor.',
        'header() adds to a map; body() sets a string.',
        'build() should check that GET/DELETE do not have a body set.',
      ],
      concepts: ['builder-validation', 'enum', 'map-builder'],
    },
    {
      id: 'java-builder-18',
      title: 'Refactor Telescoping Constructor to Builder',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this class with telescoping constructors into the Builder pattern.',
      skeleton: `public class Connection {
    private String host;
    private int port;
    private String protocol;
    private int timeout;
    private boolean ssl;

    public Connection(String host) {
        this(host, 80);
    }
    public Connection(String host, int port) {
        this(host, port, "http");
    }
    public Connection(String host, int port, String protocol) {
        this(host, port, protocol, 30000);
    }
    public Connection(String host, int port, String protocol, int timeout) {
        this(host, port, protocol, timeout, false);
    }
    public Connection(String host, int port, String protocol, int timeout, boolean ssl) {
        this.host = host;
        this.port = port;
        this.protocol = protocol;
        this.timeout = timeout;
        this.ssl = ssl;
    }
}`,
      solution: `public class Connection {
    private final String host;
    private final int port;
    private final String protocol;
    private final int timeout;
    private final boolean ssl;

    private Connection(Builder builder) {
        this.host = builder.host;
        this.port = builder.port;
        this.protocol = builder.protocol;
        this.timeout = builder.timeout;
        this.ssl = builder.ssl;
    }

    public static class Builder {
        private final String host;
        private int port = 80;
        private String protocol = "http";
        private int timeout = 30000;
        private boolean ssl = false;

        public Builder(String host) {
            this.host = host;
        }

        public Builder port(int port) { this.port = port; return this; }
        public Builder protocol(String protocol) { this.protocol = protocol; return this; }
        public Builder timeout(int timeout) { this.timeout = timeout; return this; }
        public Builder ssl(boolean ssl) { this.ssl = ssl; return this; }

        public Connection build() {
            return new Connection(this);
        }
    }
}`,
      hints: [
        'Identify which parameter is required (host) and which are optional with defaults.',
        'Move defaults from the telescoping chain into the Builder fields.',
        'Make all fields in Connection final, and the constructor private taking a Builder.',
      ],
      concepts: ['refactoring', 'telescoping-constructor', 'builder-pattern'],
    },
    {
      id: 'java-builder-19',
      title: 'Refactor to Fluent Builder with Nested Objects',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this class to use nested builders for the Address sub-object. The outer builder should have an address() method returning an AddressBuilder that returns back to the outer builder.',
      skeleton: `public class Employee {
    private String name;
    private String street;
    private String city;
    private String zip;

    public Employee(String name, String street, String city, String zip) {
        this.name = name;
        this.street = street;
        this.city = city;
        this.zip = zip;
    }
}`,
      solution: `public class Employee {
    private final String name;
    private final Address address;

    public record Address(String street, String city, String zip) {}

    private Employee(Builder builder) {
        this.name = builder.name;
        this.address = new Address(builder.street, builder.city, builder.zip);
    }

    public static class Builder {
        private String name;
        private String street;
        private String city;
        private String zip;

        public Builder name(String name) { this.name = name; return this; }

        public AddressBuilder address() {
            return new AddressBuilder(this);
        }

        public Employee build() {
            return new Employee(this);
        }
    }

    public static class AddressBuilder {
        private final Builder parent;

        AddressBuilder(Builder parent) {
            this.parent = parent;
        }

        public AddressBuilder street(String street) { parent.street = street; return this; }
        public AddressBuilder city(String city) { parent.city = city; return this; }
        public AddressBuilder zip(String zip) { parent.zip = zip; return this; }

        public Builder done() {
            return parent;
        }
    }
}`,
      hints: [
        'Create an AddressBuilder that holds a reference to the parent Builder.',
        'AddressBuilder sets fields on the parent and returns itself for chaining.',
        'AddressBuilder has a done() method that returns the parent Builder.',
      ],
      concepts: ['nested-builder', 'fluent-interface', 'composition'],
    },
    {
      id: 'java-builder-20',
      title: 'Generic Configurable Builder Factory',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a generic BuilderFactory that can create typed builders using a supplier and apply a sequence of configuration steps. Implement the configure() method that chains Consumer<B> steps and returns the built product.',
      skeleton: `import java.util.function.Consumer;
import java.util.function.Supplier;
import java.util.function.Function;

public class BuilderFactory {

    // Write a static method:
    // <T, B> T create(Supplier<B> builderSupplier,
    //                  Function<B, T> buildFn,
    //                  Consumer<B>... steps)
    // that creates a builder, applies all steps, and returns built object.
    // Use @SafeVarargs.
}`,
      solution: `import java.util.function.Consumer;
import java.util.function.Supplier;
import java.util.function.Function;

public class BuilderFactory {

    @SafeVarargs
    public static <T, B> T create(Supplier<B> builderSupplier,
                                   Function<B, T> buildFn,
                                   Consumer<B>... steps) {
        B builder = builderSupplier.get();
        for (Consumer<B> step : steps) {
            step.accept(builder);
        }
        return buildFn.apply(builder);
    }
}`,
      hints: [
        'Use @SafeVarargs to suppress heap pollution warnings for generic varargs.',
        'Create the builder from the supplier, then iterate over each Consumer step.',
        'Apply each Consumer to the builder, then use the Function to build and return the product.',
      ],
      concepts: ['generic-builder', 'functional-interfaces', 'varargs', 'factory-method'],
    },
  ],
};
